import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PHASE, CTA } from '@/lib/messages';
import { CASOS } from '@/lib/casos';

export const metadata: Metadata = {
  title: 'Casos de uso — o que um app operante resolve no seu negócio',
  description:
    'Casos de uso da Fluxomind por processo de negócio: gestão de leads, cobrança e contas a receber, atendimento no WhatsApp. Cada caso mostra o que roda sozinho, onde um humano decide — e você pode viver o caso na demonstração interativa.',
};

// Hub dos casos de uso. Formato GEO: abertura definicional, cards por dor,
// cada card leva à página do caso (SEO) e a página leva à demo daquele
// cenário (/demo?cenario=X). Crescimento: novo caso = entrada em
// src/lib/casos.ts + cenário correspondente na demo — nunca só a página.
export default function CasosDeUso() {
  return (
    <div className="page-ent">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Casos de uso · por processo de negócio</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE}</div>
          <h1 style={{ maxWidth: '24ch' }}>
            Qual processo você quer <span className="g">tirar das suas costas?</span>
          </h1>
          <p className="hsub">
            Um <Link href="/app-operante" style={{ textDecoration: 'underline' }}>app operante</Link>{' '}
            se constrói a partir do seu problema — a sua planilha entra de verdade — e passa a
            operar o dia a dia daquele processo, escalando para uma pessoa nos casos que exigem
            decisão. Estes são os casos que você pode{' '}
            <strong>viver agora na demonstração</strong>, com dados de exemplo:
          </p>
        </div>
      </header>

      <section id="casos" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prob">
            {CASOS.map((c) => (
              <Link
                key={c.slug}
                href={`/casos-de-uso/${c.slug}`}
                className="pcard"
                data-track={`casos-hub-${c.slug}`}
                style={{ display: 'block' }}
              >
                <div className="pi" aria-hidden="true" style={{ fontSize: 26, lineHeight: 1 }}>
                  {c.emoji}
                </div>
                <div className="tagm" style={{ marginTop: 10 }}>{c.area}</div>
                <h3 style={{ marginTop: 8 }}>{c.h1}</h3>
                <p>{c.hoje.itens[0]} O caso completo — e a demonstração ao vivo — aqui →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <b>Transparência.</b> Os três casos acima são os que a demonstração interativa cobre
            hoje, com dados de exemplo. {PHASE.exists.title}: {PHASE.exists.desc} O seu processo
            não está na lista? Conte qual é — no beta, o primeiro app operante nasce do{' '}
            <em>seu</em> problema, acompanhado pelo nosso time.
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Comece por uma dor
            </div>
            <h2>Escolha um caso — ou traga o seu</h2>
            <p className="lead">
              Cada caso acima termina na demonstração interativa: você vê o app nascer da
              planilha, opera o processo e aprova o que vê.
            </p>
            <div className="ctab">
              <Link className="btn btn-primary" href="/demo" data-track="casos-hub-demo-cta">
                {CTA.demo}
              </Link>
              <Link className="btn btn-ghost" href="/#comecar" data-track="casos-hub-beta-cta">
                {CTA.beta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
