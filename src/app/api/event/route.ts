import { NextResponse } from 'next/server';
import { clientIp, rateLimited } from '@/lib/ratelimit';

// Coletor de eventos do site (src/lib/analytics.ts). Fire-and-forget:
// loga sempre (backup nos logs do host) e repassa a EVENTS_WEBHOOK_URL
// quando configurada. Sem cookies, sem PII — ver docs/leads-analytics.md.

export const runtime = 'nodejs';

const MAX_BODY = 4_096;

export async function POST(req: Request) {
  // rejeita corpo grande antes de ler
  const len = Number(req.headers.get('content-length'));
  if (!len || len > MAX_BODY) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  // flood barato: protege volume de log e cota do webhook (Apps Script etc.)
  if (rateLimited('event', clientIp(req), 120, 60 * 1000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!raw || raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = typeof body.event === 'string' ? body.event.slice(0, 64) : '';
  if (!event) {return NextResponse.json({ ok: false }, { status: 400 });}

  const entry = {
    event,
    props: typeof body.props === 'object' && body.props !== null ? body.props : {},
    path: typeof body.path === 'string' ? body.path.slice(0, 200) : '',
    sid: typeof body.sid === 'string' ? body.sid.slice(0, 32) : '',
    ts: typeof body.ts === 'number' ? body.ts : Date.now(),
    ua: (req.headers.get('user-agent') ?? '').slice(0, 160),
  };

  console.info('[fm-event]', JSON.stringify(entry));

  const webhook = process.env.EVENTS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(entry),
        signal: AbortSignal.timeout(4_000),
      });
    } catch {
      // evento já está no log; nunca falha para o cliente
    }
  }

  return NextResponse.json({ ok: true });
}
