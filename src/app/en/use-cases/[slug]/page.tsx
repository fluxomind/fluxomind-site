import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { PHASE_EN, CTA_EN } from '@/lib/messages-en';
import { CASOS_EN, getCasoEn } from '@/lib/casos-en';

// Página de caso EN — espelho de /casos-de-uso/[slug] na identidade dark
// "editorial-tech" (fx.css). Formato GEO: h1-pergunta, definição na 1ª frase,
// "The request, in plain words", FAQ + FAQPage JSON-LD, data de atualização
// visível. CTA da demo leva ao cenário com deep-link (/en/demo?cenario=X).

export function generateStaticParams() {
  return CASOS_EN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const caso = getCasoEn((await params).slug);
  if (!caso) {return {};}
  return {
    title: caso.titleSeO,
    description: caso.descriptionSeO,
    alternates: {
      canonical: `/en/use-cases/${caso.slug}`,
      languages: {
        'pt-BR': `/casos-de-uso/${caso.ptSlug}`,
        en: `/en/use-cases/${caso.slug}`,
      },
    },
  };
}

export default async function UseCasePageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const caso = getCasoEn((await params).slug);
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
    <div className="fx" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeaderEn ptHref={`/casos-de-uso/${caso.ptSlug}`} />

      {/* HERO — h1 as a question (GEO) */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <span className="fx-pill">Use case &middot; {caso.area}</span>
          <h1 className="fx-serif fx-h1" style={{ maxWidth: '26ch' }}>{caso.h1}</h1>
          {/* First mention of the term links the canonical definition
              (/en/self-operating-app), matching the standard prefix in casos-en */}
          <p className="fx-lead">
            {caso.definicao.startsWith('A self-operating') ? (
              <>
                A <Link href="/en/self-operating-app">self-operating</Link>
                {caso.definicao.slice('A self-operating'.length)}
              </>
            ) : (
              caso.definicao
            )}
          </p>
          <div className="fx-cta-row">
            <Link
              className="fx-btn fx-btn-primary"
              href={`/en/demo?cenario=${caso.cenario}`}
              data-track={`en-case-${caso.slug}-demo-cta`}
            >
              See this case live &mdash; {CTA_EN.demo.toLowerCase()}
            </Link>
            <a className="fx-btn fx-btn-ghost" href="#how">
              How it works
            </a>
          </div>
        </div>
      </header>

      {/* TODAY — the pain, named */}
      <section id="today" className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The problem</p>
          <h2 className="fx-serif fx-h2">{caso.hoje.titulo}</h2>
          <div className="fx-faq" style={{ marginTop: 22 }}>
            {caso.hoje.itens.map((item) => (
              <div
                className="fx-qa"
                key={item}
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <span aria-hidden="true" style={{ color: 'var(--fx-red)', fontWeight: 700, lineHeight: 1.55 }}>
                  &times;
                </span>
                <p style={{ margin: 0, color: 'var(--fx-soft)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE REQUEST, IN PLAIN WORDS — the authoring prompt, shown as a quote:
          the visitor reads someone like them asking for the app */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The request, in plain words</p>
          <h2 className="fx-serif fx-h2">This is how the app is born: someone describes the problem</h2>
          <p className="fx-body">
            A real request, the way a business owner writes it &mdash; no menus, no code:
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
              href={`/en/demo?cenario=${caso.cenario}`}
              data-track={`en-case-${caso.slug}-request-demo-cta`}
            >
              Watch a request like this become an app, in front of you &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* WITH A SELF-OPERATING APP — what runs on its own */}
      <section id="how" className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">With a self-operating app</p>
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

      {/* WHERE A HUMAN TAKES OVER */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Where a human takes over</p>
          <h2 className="fx-serif fx-h2" style={{ maxWidth: '26ch' }}>
            The app runs the day-to-day. In sensitive cases, a person decides.
          </h2>
          <p className="fx-body">{caso.humano}</p>
        </div>
      </section>

      {/* FAQ — visible + JSON-LD */}
      <section id="faq" className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Common questions</p>
          <h2 className="fx-serif fx-h2">What people ask about this case</h2>
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

      {/* PHASE TRANSPARENCY */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <div className="fx-note">
            <strong>Transparency.</strong> The demo of this case uses sample data &mdash; the real
            app is born inside the platform, with your data. {PHASE_EN.exists} In the beta, we guide
            adoption closely, in weeks &mdash; not a months-long project.
          </div>
          <p className="fx-fineprint" style={{ textAlign: 'center', marginTop: 14 }}>
            Updated {caso.atualizado} ·{' '}
            <Link href="/en/use-cases">all use cases</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">Try this case live now</p>
          <h2 className="fx-serif fx-h2">Watch the app be born from a spreadsheet &mdash; and operate it yourself</h2>
          <p className="fx-body" style={{ margin: '0 auto 22px' }}>
            The interactive demo opens right on this case: the app builds itself in front of you,
            you operate the process and approve what you see. {CTA_EN.demoNote}.
          </p>
          <div className="fx-cta-row">
            <Link
              className="fx-btn fx-btn-primary"
              href={`/en/demo?cenario=${caso.cenario}`}
              data-track={`en-case-${caso.slug}-demo-cta`}
            >
              {CTA_EN.demo}
            </Link>
            <Link
              className="fx-btn fx-btn-ghost"
              href="/en#start"
              data-track={`en-case-${caso.slug}-beta-cta`}
            >
              {CTA_EN.beta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
