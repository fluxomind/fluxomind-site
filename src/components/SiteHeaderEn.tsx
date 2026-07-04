import Link from 'next/link';

// Chrome EN — espelho mínimo do SiteHeader pt (ADR-0006: árvores paralelas).
// O nav cresce conforme as páginas EN entram (ordem do roadmap do ADR).
const NAV_EN = [
  { href: '/en/self-operating-app', label: 'What it is' },
  { href: '/en/pricing', label: 'Pricing' },
] as const;

export default function SiteHeaderEn({ ptHref }: { ptHref: string }) {
  return (
    <header className="bg-white" style={{ borderBottom: '1px solid var(--line)' }}>
      <div
        className="wrap"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px' }}
      >
        <Link href="/en" aria-label="Fluxomind — English home">
          <img src="/logoSVG/logo-light.svg" alt="Fluxomind" style={{ height: 30 }} />
        </Link>
        <nav style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 14.5 }}>
          {NAV_EN.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href={ptHref} lang="pt-BR">
            Português →
          </Link>
        </nav>
      </div>
    </header>
  );
}
