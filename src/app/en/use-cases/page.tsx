import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import CatalogoUcs from '@/components/CatalogoUcs';
import { SIGNATURE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Use cases — 67 processes a self-operating app resolves',
  description:
    'The full catalog of what Fluxomind covers: 67 use cases, from collections and the sales funnel to month-end close — three you can experience right now in the interactive demo. Each case with the pain, the plain-words request and what runs on its own.',
  alternates: {
    canonical: '/en/use-cases',
    languages: { 'pt-BR': '/casos-de-uso', en: '/en/use-cases' },
  },
};

// Catálogo EN completo — espelho de /casos-de-uso (ADR-0005 emendado; copy EN
// via títulos curados + lâminas traduzidas). As 3 páginas GEO EN permanecem.
export default function UseCasesEn() {
  return (
    <div className="page-ent" lang="en">
      <SiteHeaderEn ptHref="/casos-de-uso" />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Catalog · 67 use cases by process and industry</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '24ch' }}>
            Which process do you want <span className="g">off your back?</span>
          </h1>
          <p className="hsub">
            A <Link href="/en/self-operating-app" style={{ textDecoration: 'underline' }}>self-operating app</Link>{' '}
            builds itself from your problem and starts running that process day to day.
            This is the full map of what the platform covers — <strong>three cases you can
            experience right now in the demo</strong>; the rest show how far it goes. Click
            any card to open the full case.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CatalogoUcs lang="en" />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Start with a pain
            </div>
            <h2>Found your case — or have one that is not here?</h2>
            <p className="lead">
              In the beta, the first self-operating app is born from <em>your</em> problem,
              guided by our team — whether it is in the catalog or not.
            </p>
            <div className="ctab">
              <Link className="btn btn-primary" href="/en/demo" data-track="catalogo-demo-cta">
                {CTA_EN.demo}
              </Link>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT_EN} data-track="catalogo-beta-cta">
                {CTA_EN.contact}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
