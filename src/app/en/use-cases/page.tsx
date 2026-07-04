import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { SIGNATURE_EN, PHASE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import { CASOS_EN } from '@/lib/casos-en';

export const metadata: Metadata = {
  title: 'Use cases — what a self-operating app resolves in your business',
  description:
    'Fluxomind use cases by business process: lead management, collections and accounts receivable, WhatsApp support. Each case shows what runs on its own, where a human decides — and you can experience the case in the interactive demo.',
  alternates: {
    canonical: '/en/use-cases',
    languages: { 'pt-BR': '/casos-de-uso', en: '/en/use-cases' },
  },
};

// Hub EN de casos de uso — espelho de /casos-de-uso (ADR-0005/0006).
export default function UseCasesEn() {
  return (
    <div className="page-ent" lang="en">
      <SiteHeaderEn ptHref="/casos-de-uso" />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Use cases · by business process</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '24ch' }}>
            Which process do you want <span className="g">off your back?</span>
          </h1>
          <p className="hsub">
            A <Link href="/en/self-operating-app" style={{ textDecoration: 'underline' }}>self-operating app</Link>{' '}
            builds itself from your problem — your spreadsheet imports as-is — and starts running that process day to day, handing off to a person in the cases that
            require a decision. These are the cases you can{' '}
            <strong>experience right now in the demo</strong>, with sample data:
          </p>
        </div>
      </header>

      <section id="cases" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prob">
            {CASOS_EN.map((c) => (
              <Link
                key={c.slug}
                href={`/en/use-cases/${c.slug}`}
                className="pcard"
                data-track={`en-cases-hub-${c.slug}`}
                style={{ display: 'block' }}
              >
                <div className="pi" aria-hidden="true" style={{ fontSize: 26, lineHeight: 1 }}>
                  {c.emoji}
                </div>
                <div className="tagm" style={{ marginTop: 10 }}>{c.area}</div>
                <h3 style={{ marginTop: 8 }}>{c.h1}</h3>
                <p>“{c.dorHook}” The full case — and the live demo — here →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <b>Transparency.</b> The three cases above are the ones the interactive demo covers
            today, with sample data — the demo runs in Portuguese. {PHASE_EN.exists} Your
            process is not on the list? Tell us which one — in the beta, the first
            self-operating app is born from <em>your</em> problem, guided by our team.
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Start with a pain
            </div>
            <h2>Pick a case — or bring your own</h2>
            <p className="lead">
              Every case above ends in the interactive demo: you watch the app be born from a
              spreadsheet, operate the process and approve what you see. {CTA_EN.demoNote}.
            </p>
            <div className="ctab">
              <Link className="btn btn-primary" href="/demo" data-track="en-cases-hub-demo-cta">
                {CTA_EN.demo}
              </Link>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-cases-hub-contact-cta">
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
