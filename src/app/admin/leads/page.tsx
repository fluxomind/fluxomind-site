import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readLeads } from '@/lib/leadstore';

// Visão interna dos leads capturados pelo form do beta (arquivo NDJSON local).
// Acesso: em dev, direto; em produção, exige ?token=<ADMIN_TOKEN>.
// Sem ADMIN_TOKEN configurado em produção, a página não existe (404).

export const metadata: Metadata = {
  title: 'Leads (interno)',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLeads({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const required = process.env.ADMIN_TOKEN;
  const authorized = required
    ? token === required
    : process.env.NODE_ENV !== 'production';
  if (!authorized) notFound();

  const leads = (await readLeads()).reverse();
  const reais = leads.filter((l) => !l.hp);
  const suspeitos = leads.filter((l) => l.hp);

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <h1 style={S.h1}>Leads do beta</h1>
        <p style={S.sub}>
          {reais.length} lead{reais.length === 1 ? '' : 's'}
          {suspeitos.length > 0 && <> · {suspeitos.length} no honeypot (provável bot)</>}
          {' · '}fonte: arquivo local <code style={S.code}>data/leads.ndjson</code>
        </p>

        {leads.length === 0 ? (
          <p style={{ ...S.sub, marginTop: 24 }}>
            Nenhum lead ainda. Envie o form em <code style={S.code}>/#comecar</code> para testar.
          </p>
        ) : (
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>
                  {['Quando', 'Nome', 'E-mail', 'Empresa', 'Processo', ''].map((h) => (
                    <th key={h} style={S.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} style={l.hp ? S.trHp : undefined}>
                    <td style={S.td}>
                      {new Date(l.ts).toLocaleString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={S.td}>{l.nome || '—'}</td>
                    <td style={S.td}>
                      {l.email ? <a href={`mailto:${l.email}`} style={S.link}>{l.email}</a> : '—'}
                    </td>
                    <td style={S.td}>{l.empresa || '—'}</td>
                    <td style={{ ...S.td, maxWidth: 420 }}>{l.processo || '—'}</td>
                    <td style={S.td}>{l.hp ? <span style={S.hpBadge}>honeypot</span> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ ...S.sub, marginTop: 28, fontSize: 12.5 }}>
          Página interna — não linkada, noindex. Em produção exige{' '}
          <code style={S.code}>?token=ADMIN_TOKEN</code> e filesystem persistente; na Vercel,
          use o webhook (docs/leads-analytics.md).
        </p>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#e6edf3',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    padding: '40px 20px',
  },
  wrap: { maxWidth: 1080, margin: '0 auto' },
  h1: { fontSize: 26, fontWeight: 750 },
  sub: { marginTop: 8, color: '#8b949e', fontSize: 14 },
  code: {
    background: 'rgba(255,255,255,.08)',
    padding: '1px 6px',
    borderRadius: 5,
    fontSize: 12.5,
  },
  tableWrap: {
    marginTop: 24,
    overflowX: 'auto',
    border: '1px solid #21262d',
    borderRadius: 10,
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#161b22',
    borderBottom: '1px solid #21262d',
    color: '#8b949e',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '10px 14px',
    borderBottom: '1px solid #21262d',
    verticalAlign: 'top',
  },
  trHp: { opacity: 0.55 },
  hpBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 999,
    background: 'rgba(210,153,34,.15)',
    border: '1px solid rgba(210,153,34,.45)',
    color: '#e3b341',
    whiteSpace: 'nowrap',
  },
  link: { color: '#58a6ff', textDecoration: 'none' },
};
