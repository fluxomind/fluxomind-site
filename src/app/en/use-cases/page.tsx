import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import CatalogoUcs from '@/components/CatalogoUcs';
import { CTA_EN } from '@/lib/messages-en';

export const metadata: Metadata = {
  title: 'Use cases — 67 processes a self-operating app resolves',
  description:
    'The full catalog of what Fluxomind covers: 67 use cases, from collections and the sales funnel to month-end close — three you can experience right now in the interactive demo. Each case with the pain, the plain-words request and what runs on its own.',
  alternates: {
    canonical: '/en/use-cases',
    languages: { 'pt-BR': '/casos-de-uso', en: '/en/use-cases' },
  },
};

// Catálogo EN completo — espelho de /casos-de-uso na identidade fx (ADR-0005
// emendado; copy EN via títulos curados + lâminas traduzidas). O grid é SSR;
// as lâminas carregam sob demanda de /catalogo-laminas.json. GEO EN permanece.
export default function UseCasesEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/casos-de-uso" />

      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Catalog · 67 use cases by process and industry</p>
          <h1 className="fx-serif fx-h1">
            Which process do you want <span className="fx-em">off your plate?</span>
          </h1>
          <p className="fx-lead">
            A{' '}
            <Link href="/en/self-operating-app">self-operating app</Link> builds itself from
            your problem and starts running that process day to day. This is the full map of
            what the platform covers — <strong>three cases you can experience right now in the
            demo</strong>; the rest show how far it goes. Click any card to open the full case.
          </p>
        </div>
      </header>

      <section className="fx-sec">
        <div className="fx-wrap">
          <CatalogoUcs lang="en" />
        </div>
      </section>

      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">Start with a pain</p>
          <h2 className="fx-serif fx-h2">Found your case &mdash; or have one that&rsquo;s not here?</h2>
          <p className="fx-body" style={{ margin: '0 auto 22px' }}>
            In the beta, the first self-operating app is born from <em>your</em> problem,
            guided by our team — whether it&rsquo;s in the catalog or not.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/en/demo" data-track="catalogo-demo-cta">
              {CTA_EN.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/en#start" data-track="catalogo-beta-cta">
              {CTA_EN.beta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
