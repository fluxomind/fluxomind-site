import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { SIGNATURE_EN, PHASE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import { CASOS_EN, getCasoEn } from '@/lib/casos-en';

// Página de caso EN — espelho de /casos-de-uso/[slug] (formato GEO:
// h1-pergunta, definição na 1ª frase, "The request, in plain words",
// FAQ + FAQPage JSON-LD). CTA da demo leva ao cenário pt com moldura.

export function generateStaticParams() {
  return CASOS_EN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const caso = getCasoEn((await params).slug);
  if (!caso) return {};
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
    <div className="page-ent" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeaderEn ptHref={`/casos-de-uso/${caso.ptSlug}`} />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Use case · {caso.area}</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '26ch' }}>{caso.h1}</h1>
          <p className="hsub">
            {caso.definicao.startsWith('A self-operating') ? (
              <>
                A{' '}
                <Link href="/en/self-operating-app" style={{ textDecoration: 'underline' }}>
                  self-operating
                </Link>
                {caso.definicao.slice('A self-operating'.length)}
              </>
            ) : (
              caso.definicao
            )}
          </p>
          <div className="herocta">
            <Link
              className="btn btn-primary"
              href={`/demo?cenario=${caso.cenario}`}
              data-track={`en-case-${caso.slug}-demo-cta`}
            >
              See this case live — {CTA_EN.demo.toLowerCase()}
            </Link>
            <a className="btn btn-ghost" href="#how">
              How it works
            </a>
          </div>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--slate)' }}>{CTA_EN.demoNote}</p>
        </div>
      </header>

      <section id="today" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">The problem</div>
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

      {/* THE REQUEST, IN PLAIN WORDS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">The request, in plain words</div>
            <h2>This is how the app is born: someone describes the problem</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              A real request, the way a business owner writes it — no menus, no code:
            </p>
          </div>
          <blockquote
            style={{
              maxWidth: 760,
              margin: '28px auto 0',
              padding: '24px 28px',
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
              data-track={`en-case-${caso.slug}-request-demo-cta`}
              style={{ textDecoration: 'underline' }}
            >
              Watch a request like this become an app, in front of you →
            </Link>
          </p>
        </div>
      </section>

      <section id="how" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">With a self-operating app</div>
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

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Where a human takes over
            </div>
            <h2 style={{ color: '#fff', maxWidth: '26ch' }}>
              The app runs the day-to-day. In the sensitive cases, a person decides.
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, color: '#A9AEB8', maxWidth: '62ch', lineHeight: 1.6 }}>
              {caso.humano}
            </p>
          </div>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Common questions</div>
            <h2>What people ask about this case</h2>
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

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <b>Transparency.</b> The demo of this case uses sample data and runs in Portuguese —
            the real app is born inside the platform, with your data. {PHASE_EN.exists} We are
            in beta: adoption happens closely accompanied by our team, in weeks — not a
            months-long project.
          </div>
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13.5, color: 'var(--slate)' }}>
            Updated {caso.atualizado} · <Link href="/en/use-cases">all use cases</Link>
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Live this case now
            </div>
            <h2>Watch the app be born from a spreadsheet — and operate it yourself</h2>
            <p className="lead">
              The interactive demo opens right on this case: the app builds itself in front of
              you, you operate the process and approve what you see. {CTA_EN.demoNote}.
            </p>
            <div className="ctab">
              <Link
                className="btn btn-primary"
                href={`/demo?cenario=${caso.cenario}`}
                data-track={`en-case-${caso.slug}-demo-cta`}
              >
                {CTA_EN.demo}
              </Link>
              <a
                className="btn btn-ghost"
                href={PLATFORM_CONTACT_EN}
                data-track={`en-case-${caso.slug}-contact-cta`}
              >
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
