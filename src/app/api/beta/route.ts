import { NextResponse } from 'next/server';
import { clientIp, rateLimited } from '@/lib/ratelimit';

// Captura de leads do form da lista do beta (src/components/BetaForm.tsx).
// O lead é SEMPRE logado (backup nos logs do host — atenção à retenção curta
// na Vercel; ver docs/leads-analytics.md § Deploy) e repassado a
// LEAD_WEBHOOK_URL quando configurada (Sheets via Apps Script, CRM, Slack…).

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY = 10_000;

export async function POST(req: Request) {
  // rejeita corpo grande antes de ler
  const len = Number(req.headers.get('content-length'));
  if (!len || len > MAX_BODY) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot: campo "site" é invisível para humanos; preenchido = bot.
  // Logado mesmo assim: autofill pode pegar humano real — falso positivo
  // vira recuperável e a taxa de honeypot fica observável.
  if (typeof body.site === 'string' && body.site.trim() !== '') {
    console.log(
      '[fm-lead-hp]',
      JSON.stringify({ email: body.email, processo: body.processo, ts: new Date().toISOString() }),
    );
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const processo = typeof body.processo === 'string' ? body.processo.trim().slice(0, 2000) : '';
  const empresa = typeof body.empresa === 'string' ? body.empresa.trim().slice(0, 200) : '';
  const nome = typeof body.nome === 'string' ? body.nome.trim().slice(0, 120) : '';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'email' }, { status: 400 });
  }
  if (processo.length < 3) {
    return NextResponse.json({ ok: false, error: 'processo' }, { status: 400 });
  }

  if (rateLimited('lead', clientIp(req), 5, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'rate' }, { status: 429 });
  }

  const lead = {
    nome,
    email,
    empresa,
    processo,
    ts: new Date().toISOString(),
    source: 'site-beta-form',
  };

  // Backup incondicional nos logs do host.
  console.log('[fm-lead]', JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(6_000),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error('[fm-lead] entrega ao webhook falhou:', err);
      // 502 → o form mostra o fallback por e-mail; o lead já está no log.
      return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
