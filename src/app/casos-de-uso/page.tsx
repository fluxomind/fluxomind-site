import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CatalogoUcs from '@/components/CatalogoUcs';
import { SIGNATURE, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Casos de uso — 67 processos que um app operante resolve',
  description:
    'O catálogo completo do que a Fluxomind cobre: 67 casos de uso, de cobrança e funil de vendas ao fechamento do mês — três você vive agora na demonstração interativa. Cada caso com a dor, o pedido em português e o que roda sozinho.',
  alternates: {
    canonical: '/casos-de-uso',
    languages: { 'pt-BR': '/casos-de-uso', en: '/en/use-cases' },
  },
};

// Catálogo inspiracional completo (decisão do fundador 2026-07-06, emenda ao
// ADR-0005): página única com os 67 UCs navegáveis por hash — as páginas GEO
// estáticas continuam nascendo por lotes (matrix). O grid é SSR (conteúdo no
// HTML); as lâminas carregam sob demanda de /catalogo-laminas.json.
export default function CasosDeUso() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/use-cases" />

      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Catálogo · 67 casos por processo e setor</p>
          <h1 className="fx-serif fx-h1">
            Qual processo você quer <span className="fx-em">tirar das suas costas?</span>
          </h1>
          <p className="fx-lead">
            Um{' '}
            <Link href="/app-operante">app operante</Link> se constrói a partir do seu problema
            e passa a operar o dia a dia daquele processo. Este é o mapa completo do que a
            plataforma cobre — <strong>três casos você vive agora na demonstração</strong>; os
            outros mostram até onde dá para ir. Clique em qualquer card para abrir o caso inteiro.
          </p>
        </div>
      </header>

      <section className="fx-sec">
        <div className="fx-wrap">
          <CatalogoUcs />
        </div>
      </section>

      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">Comece por uma dor</p>
          <h2 className="fx-serif fx-h2">Achou o seu caso — ou tem um que não está aqui?</h2>
          <p className="fx-body" style={{ margin: '0 auto 22px' }}>
            No beta, o primeiro app operante nasce do <em>seu</em> problema, acompanhado pelo
            nosso time — esteja ele no catálogo ou não.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/demo" data-track="catalogo-demo-cta">
              {CTA.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/#comecar" data-track="catalogo-beta-cta">
              {CTA.beta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
