import Link from 'next/link';

// Rodapé EN — espelho mínimo do SiteFooter pt (ADR-0006). Legais seguem em
// pt até a fase 5 do roadmap de tradução.
export default function SiteFooterEn() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '28px 0', marginTop: 20 }}>
      <div
        className="wrap"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ color: 'var(--slate)', fontSize: 14 }}>
          © 2026 Fluxomind · FLUXOMIND LTDA — CNPJ: 60.162.547/0001-15 · São Paulo, Brazil
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          <Link href="/en">English home</Link>
          <Link href="/en/self-operating-app">Self-operating app</Link>
          <Link href="/en/what-it-does">What it does</Link>
          <Link href="/en/security">Security</Link>
          <Link href="/en/accelerate">Accelerate</Link>
          <Link href="/en/pricing">Pricing</Link>
          <Link href="/terms" lang="pt-BR">Termos de Uso</Link>
          <Link href="/privacidade" lang="pt-BR">Privacidade</Link>
          <Link href="/" lang="pt-BR">Português</Link>
        </div>
      </div>
    </footer>
  );
}
