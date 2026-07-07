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
  if (!caso) return {};
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
  if (!caso) notFound();

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
    <div className="page-ent">
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

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">
              Caso de uso · {caso.area}
            </span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE}</div>
          <h1 style={{ maxWidth: '26ch' }}>{caso.h1}</h1>
          {/* 1ª menção do termo linka a definição canônica (/app-operante) —
              acoplado ao prefixo padrão das definições em casos.ts */}
          <p className="hsub">
            {caso.definicao.startsWith('Um app operante') ? (
              <>
                Um{' '}
                <Link href="/app-operante" style={{ textDecoration: 'underline' }}>
                  app operante
                </Link>
                {caso.definicao.slice('Um app operante'.length)}
              </>
            ) : (
              caso.definicao
            )}
          </p>
          <div className="herocta">
            <Link
              className="btn btn-primary"
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`caso-${caso.slug}-demo-cta`}
            >
              Veja este caso ao vivo — {CTA.demo.toLowerCase()}
            </Link>
            <a className="btn btn-ghost" href="#como">
              Como funciona
            </a>
          </div>
        </div>
      </header>

      {/* HOJE — a dor, nomeada */}
      <section id="hoje" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">O problema</div>
            <h2>{caso.hoje.titulo}</h2>
          </div>
          <div className="faq" style={{ marginTop: 26 }}>
            {caso.hoje.itens.map((item) => (
              <div className="qa" key={item} style={{ display: 'flex', gap: 10, padding: '14px 0' }}>
                <span aria-hidden="true" style={{ color: '#e07a5f', fontWeight: 700 }}>✕</span>
                <p style={{ marginTop: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O PEDIDO, EM PORTUGUÊS — o prompt de autoria do UC (§2 do package),
          exibido como citação: o visitante lê alguém como ele pedindo o app */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">O pedido, em português</div>
            <h2>É assim que esse app nasce: alguém descreve o problema</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Um pedido real, do jeito que um dono de negócio escreve — sem menu, sem código:
            </p>
          </div>
          <blockquote
            style={{
              maxWidth: 760,
              margin: '28px auto 0',
              padding: '24px 28px',
              borderLeft: '3px solid var(--blue)',
              border: '1px solid var(--line)',
              borderLeftWidth: 3,
              borderLeftColor: 'var(--blue)',
              borderRadius: 14,
              color: 'var(--slate)',
              fontSize: 15.5,
              lineHeight: 1.65,
            }}
          >
            {caso.pedido.split('\n\n').map((par) => (
              <p key={par.slice(0, 40)} style={{ marginTop: 10 }}>
                {par}
              </p>
            ))}
          </blockquote>
          <p style={{ textAlign: 'center', marginTop: 18 }}>
            <Link
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`caso-${caso.slug}-pedido-demo-cta`}
              style={{ textDecoration: 'underline' }}
            >
              Veja um pedido assim virar app, na sua frente →
            </Link>
          </p>
        </div>
      </section>

      {/* COM UM APP OPERANTE — o que roda sozinho */}
      <section id="como" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Com um app operante</div>
            <h2>{caso.comApp.titulo}</h2>
          </div>
          <div className="ways">
            {caso.comApp.itens.map((item) => (
              <div className="way" key={item.face}>
                <div className="tagm">{item.face}</div>
                <p style={{ marginTop: 10 }}>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONDE UM HUMANO ASSUME */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Onde um humano assume
            </div>
            <h2 style={{ color: '#fff', maxWidth: '26ch' }}>
              O app opera o dia a dia. Nos casos sensíveis, uma pessoa decide.
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, color: '#A9AEB8', maxWidth: '62ch', lineHeight: 1.6 }}>
              {caso.humano}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — visível + JSON-LD */}
      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Dúvidas comuns</div>
            <h2>O que costumam perguntar sobre este caso</h2>
          </div>
          <div className="faq">
            {caso.faq.map((f) => (
              <div className="qa" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARÊNCIA DE FASE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <b>Transparência.</b> A demonstração deste caso usa dados de exemplo — o app real
            nasce dentro da plataforma, com os seus dados. {PHASE.exists.title}:{' '}
            {PHASE.exists.desc} No beta, a adoção acontece acompanhada de perto pelo
            nosso time, em semanas — não num projeto de meses.
          </div>
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13.5, color: 'var(--slate)' }}>
            Atualizado em {caso.atualizado} ·{' '}
            <Link href="/casos-de-uso">todos os casos de uso</Link>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Viva este caso agora
            </div>
            <h2>Veja o app nascer da planilha — e opere você</h2>
            <p className="lead">
              A demonstração interativa abre já neste caso: o app se constrói na sua frente,
              você opera o processo e aprova o que vê.
            </p>
            <div className="ctab">
              <Link
                className="btn btn-primary"
                href={`/demo?cenario=${caso.cenario}`}
                data-track={`caso-${caso.slug}-demo-cta`}
              >
                {CTA.demo}
              </Link>
              <Link
                className="btn btn-ghost"
                href="/#comecar"
                data-track={`caso-${caso.slug}-beta-cta`}
              >
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
