import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PHASE, CTA } from '@/lib/messages';
import { CASOS, getCaso } from '@/lib/casos';
import { CASO_EN_SLUG_BY_PT } from '@/lib/casos-en';

// Página de caso de uso — formato GEO: h1 como pergunta, primeira frase
// definicional, seções autocontidas, FAQ visível espelhado em FAQPage
// JSON-LD, data de atualização visível. O CTA primário leva à demo já no
// cenário do caso (/demo?cenario=X — deep-link do PR #31).

export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const caso = getCaso((await params).slug);
  if (!caso) {return {};}
  const enSlug = CASO_EN_SLUG_BY_PT[caso.slug];
  return {
    title: caso.titleSeO,
    description: caso.descriptionSeO,
    alternates: {
      canonical: `/casos-de-uso/${caso.slug}`,
      languages: {
        'pt-BR': `/casos-de-uso/${caso.slug}`,
        ...(enSlug ? { en: `/en/use-cases/${enSlug}` } : {}),
      },
    },
  };
}

export default async function CasoDeUsoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const caso = getCaso((await params).slug);
  if (!caso) {notFound();}

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: caso.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="fx">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader
        cta={{ label: CTA.demo, href: `/demo?cenario=${caso.cenario}` }}
        enHref={
          CASO_EN_SLUG_BY_PT[caso.slug]
            ? `/en/use-cases/${CASO_EN_SLUG_BY_PT[caso.slug]}`
            : '/en/use-cases'
        }
      />

      {/* HERO — h1 como pergunta (GEO) */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <span className="fx-pill">Caso de uso · {caso.area}</span>
          <h1 className="fx-serif fx-h1" style={{ maxWidth: '26ch' }}>{caso.h1}</h1>
          {/* 1ª menção do termo linka a definição canônica (/app-operante) —
              acoplado ao prefixo padrão das definições em casos.ts */}
          <p className="fx-lead">
            {caso.definicao.startsWith('Um app operante') ? (
              <>
                Um <Link href="/app-operante">app operante</Link>
                {caso.definicao.slice('Um app operante'.length)}
              </>
            ) : (
              caso.definicao
            )}
          </p>
          <div className="fx-cta-row">
            <Link
              className="fx-btn fx-btn-primary"
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`caso-${caso.slug}-demo-cta`}
            >
              Veja este caso ao vivo — {CTA.demo.toLowerCase()}
            </Link>
            <a className="fx-btn fx-btn-ghost" href="#como">
              Como funciona
            </a>
          </div>
        </div>
      </header>

      {/* HOJE — a dor, nomeada */}
      <section id="hoje" className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O problema</p>
          <h2 className="fx-serif fx-h2">{caso.hoje.titulo}</h2>
          <div className="fx-faq" style={{ marginTop: 22 }}>
            {caso.hoje.itens.map((item) => (
              <div
                className="fx-qa"
                key={item}
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <span aria-hidden="true" style={{ color: 'var(--fx-red)', fontWeight: 700, lineHeight: 1.55 }}>
                  ✕
                </span>
                <p style={{ margin: 0, color: 'var(--fx-soft)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O PEDIDO, EM PORTUGUÊS — o prompt de autoria do UC (§2 do package),
          exibido como citação: o visitante lê alguém como ele pedindo o app */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O pedido, em português</p>
          <h2 className="fx-serif fx-h2">É assim que esse app nasce: alguém descreve o problema</h2>
          <p className="fx-body">
            Um pedido real, do jeito que um dono de negócio escreve — sem menu, sem código:
          </p>
          <div
            className="fx-card"
            style={{ borderLeft: '2px solid var(--fx-blue)', whiteSpace: 'pre-line' }}
          >
            {caso.pedido.split('\n\n').map((par) => (
              <p key={par.slice(0, 40)} style={{ margin: '0 0 10px', color: 'var(--fx-soft)', fontSize: 15.5, lineHeight: 1.65 }}>
                {par}
              </p>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`caso-${caso.slug}-pedido-demo-cta`}
            >
              Veja um pedido assim virar app, na sua frente →
            </Link>
          </p>
        </div>
      </section>

      {/* COM UM APP OPERANTE — o que roda sozinho */}
      <section id="como" className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Com um app operante</p>
            <h2 className="fx-serif fx-h2">{caso.comApp.titulo}</h2>
          </div>
          <div className="fx-grid3" style={{ marginTop: 30 }}>
            {caso.comApp.itens.map((item) => (
              <div className="fx-card" key={item.face}>
                <span className="fx-label">{item.face}</span>
                <p>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONDE UM HUMANO ASSUME */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Onde um humano assume</p>
          <h2 className="fx-serif fx-h2" style={{ maxWidth: '26ch' }}>
            O app opera o dia a dia. Nos casos sensíveis, uma pessoa decide.
          </h2>
          <p className="fx-body">{caso.humano}</p>
        </div>
      </section>

      {/* FAQ — visível + JSON-LD */}
      <section id="faq" className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Dúvidas comuns</p>
          <h2 className="fx-serif fx-h2">O que costumam perguntar sobre este caso</h2>
          <div className="fx-faq">
            {caso.faq.map((f) => (
              <div className="fx-qa" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARÊNCIA DE FASE */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <div className="fx-note">
            <strong>Transparência.</strong> A demonstração deste caso usa dados de exemplo — o
            app real nasce dentro da plataforma, com os seus dados. {PHASE.exists.title}:{' '}
            {PHASE.exists.desc} No beta, a adoção acontece acompanhada de perto pelo nosso time,
            em semanas — não num projeto de meses.
          </div>
          <p className="fx-fineprint" style={{ textAlign: 'center', marginTop: 14 }}>
            Atualizado em {caso.atualizado} ·{' '}
            <Link href="/casos-de-uso">todos os casos de uso</Link>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">Viva este caso agora</p>
          <h2 className="fx-serif fx-h2">Veja o app nascer da planilha — e opere você</h2>
          <p className="fx-body" style={{ margin: '0 auto 22px' }}>
            A demonstração interativa abre já neste caso: o app se constrói na sua frente, você
            opera o processo e aprova o que vê.
          </p>
          <div className="fx-cta-row">
            <Link
              className="fx-btn fx-btn-primary"
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`caso-${caso.slug}-demo-cta`}
            >
              {CTA.demo}
            </Link>
            <Link
              className="fx-btn fx-btn-ghost"
              href="/#comecar"
              data-track={`caso-${caso.slug}-beta-cta`}
            >
              {CTA.beta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
