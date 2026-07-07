import Link from 'next/link';
import type { Metadata } from 'next';
import {
  SIGNATURE_EN,
  PURPOSE_LINE_EN,
  NEGATION_EN,
  FACES_EN,
  TRUST_RULES_EN,
  PHASE_EN,
  CTA_EN,
} from '@/lib/messages-en';
import { DEFINITION_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';

export const metadata: Metadata = {
  title: 'What is a self-operating app? — the category, explained',
  description:
    'A self-operating app builds itself from your business problem, runs the process day-to-day — and escalates to a human when a case calls for it. The definition, the 6 questions, the 5 trust rules, and how it differs from chatbots and builders.',
  alternates: {
    canonical: '/en/self-operating-app',
    languages: { 'pt-BR': '/app-operante', en: '/en/self-operating-app' },
  },
};

// English category page — mirror of /app-operante under message-house-en.md
// (PROPOSTA). Same GEO format: definition-first, FAQPage + DefinedTerm JSON-LD.

const FAQ_EN = [
  { q: 'What is a self-operating app?', a: DEFINITION_EN },
  {
    q: 'Is it a chatbot?',
    a: 'Not a chatbot that just replies. A self-operating app understands the request and resolves it — it runs the process, records it and shows the proof. The conversation is the means; the resolved process is the end.',
  },
  {
    q: 'How is it different from a code builder or generic no-code?',
    a: 'Building got easy — any AI hands you a prototype. Builders stop there: you get code or screens to maintain and operate on your own. A self-operating app delivers the process running: it operates the day-to-day, evolves through conversation, and hands the sensitive calls to a human.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. You describe the problem in plain language; the app builds itself — and to change it, you just talk.',
  },
  {
    q: 'What does "runs itself" mean?',
    a: 'The process day-to-day — tracking, preparing, running the routine — happens without anyone having to remember it. Nothing critical goes out without your OK, and every conclusion arrives with the proof of what was done.',
  },
  {
    q: 'Is this real today, or a vision?',
    a: 'The platform is real — 39 engines that materialize and operate real apps, multi-tenant, governed. We are in private beta, with the open launch coming soon: we guide adoption closely — live in weeks, not a months-long project.',
  },
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_EN.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const TERM_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'self-operating app',
  description: DEFINITION_EN,
  url: 'https://www.fluxomind.com/en/self-operating-app',
};

export default function SelfOperatingApp() {
  return (
    <div className="page-ent" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERM_JSONLD) }}
      />

      <SiteHeaderEn ptHref="/app-operante" />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">self-operating app · the category</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '22ch' }}>What is a self-operating app?</h1>
          <p className="hsub">{DEFINITION_EN}</p>
          <div className="herocta">
            <Link className="btn btn-primary" href="/en/demo" data-track="en-soa-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-soa-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--slate)' }}>
            {CTA_EN.demoNote}
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Why the category exists</div>
            <h2 style={{ maxWidth: '30ch', margin: '0 auto' }}>{PURPOSE_LINE_EN}</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Building got easy — any AI hands you a prototype. <strong>Operating is what&apos;s
              missing</strong>, and it is exactly what a self-operating app delivers.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              What it is not
            </div>
            <ul style={{ listStyle: 'none', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NEGATION_EN.nots.map((n) => (
                <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#A9AEB8', fontSize: 16 }}>
                  <span aria-hidden="true" style={{ color: '#e07a5f', fontWeight: 700 }}>✕</span>
                  {n}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 22, fontSize: 19, color: '#fff', fontWeight: 600, maxWidth: '58ch', lineHeight: 1.55 }}>
              {NEGATION_EN.is}
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">The anatomy</div>
            <h2>The 6 questions every self-operating app answers</h2>
          </div>
          <div className="ways">
            {FACES_EN.map((f) => (
              <div className="way" key={f.label}>
                <div className="tagm">{f.label}</div>
                <h3 style={{ marginTop: 8 }}>{f.q}</h3>
                <p style={{ marginTop: 6 }}>{f.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Trust, by design</div>
            <h2>The 5 rules that make the operation trustworthy</h2>
          </div>
          <div className="ways">
            {TRUST_RULES_EN.map((r) => (
              <div className="way" key={r.title}>
                <h3>{r.title}</h3>
                <p style={{ marginTop: 6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Common questions</div>
            <h2>What people ask about the category</h2>
          </div>
          <div className="faq">
            {FAQ_EN.map((f) => (
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
            <b>Transparency.</b> {PHASE_EN.exists} {PHASE_EN.next} {PHASE_EN.vision}
          </div>
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13.5, color: 'var(--slate)' }}>
            Updated July 2026 · <Link href="/en">Fluxomind in English</Link> ·{' '}
            <Link href="/app-operante" lang="pt-BR">versão em português</Link>
          </p>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
