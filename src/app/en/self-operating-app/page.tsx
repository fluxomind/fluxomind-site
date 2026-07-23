import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { DEFINITION_EN, NEGATION_EN, FACES_EN, CTA_EN } from '@/lib/messages-en';

export const metadata: Metadata = {
  title: 'What is a self-operating app? — the category, explained',
  description:
    'A self-operating app builds itself from your business problem, runs the process day-to-day — and escalates to a human when a case calls for it. The category, explained: the 6 questions, the triple negation, and how it differs from chatbots and builders.',
  alternates: {
    canonical: '/en/self-operating-app',
    languages: { 'pt-BR': '/app-operante', en: '/en/self-operating-app' },
  },
};

// English category page — mirror of /app-operante in the editorial-tech (fx)
// identity. The central GEO asset: the canonical definition of
// "self-operating app", the term Fluxomind coins. Editorial format:
// definition in the first fold, triple negation, the 6 questions, FAQ.
// Preserves DefinedTerm + FAQPage JSON-LD. All copy comes from the EN
// message house (src/lib/messages-en.ts + the local FAQ) — no invented claim.

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
    a: 'No. You describe the problem in plain language; the app builds itself — and to change it, you just talk. No developer in the loop.',
  },
  {
    q: 'What does “runs itself” mean?',
    a: 'The process day-to-day — tracking, preparing, running the routine — happens without anyone having to remember it. Nothing critical goes out without your OK, and every conclusion arrives with the proof of what was done.',
  },
  {
    q: 'Is this real today, or a vision?',
    a: 'The platform is built and it is real software — 39 engines across 10 layers, multi-tenant and governed. In private beta today, with the open launch coming soon: adoption happens closely guided by our team, in weeks, not a months-long project.',
  },
];

// FAQPage JSON-LD — mirrors the FAQ section rendered below (same source).
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_EN.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// DefinedTerm JSON-LD — the asset to be cited when AIs define the term.
const TERM_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'self-operating app',
  description: DEFINITION_EN,
  url: 'https://www.fluxomind.com/en/self-operating-app',
};

export default function SelfOperatingApp() {
  return (
    <div className="fx" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERM_JSONLD) }}
      />
      <SiteHeaderEn ptHref="/app-operante" />

      {/* HERO — the canonical definition up front (GEO) */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap fx-narrow">
          <span className="fx-pill">A term coined by Fluxomind</span>
          <p className="fx-eyebrow">self-operating app · the category</p>
          <h1 className="fx-serif fx-h1">
            What is a <span className="fx-em">self-operating app</span>?
          </h1>
          <p className="fx-lead">{DEFINITION_EN}</p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/en/demo" data-track="en-soa-demo-cta">
              {CTA_EN.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/en/use-cases">
              See use cases
            </Link>
          </div>
        </div>
      </header>

      {/* TRIPLE NEGATION — what it is not, and the one thing it is */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">What it is not</p>
          <h2 className="fx-serif fx-h2">
            Three things it is not — and one thing it <span className="fx-em">is</span>.
          </h2>
          <ul className="fx-list">
            {NEGATION_EN.nots.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="fx-quote fx-mt">{NEGATION_EN.is}</p>
        </div>
      </section>

      {/* THE 6 QUESTIONS — the anatomy of the category */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">The anatomy</p>
            <h2 className="fx-serif fx-h2">The 6 questions every self-operating app answers</h2>
            <p className="fx-body">
              A self-operating app isn&rsquo;t a pile of screens: it&rsquo;s the answer, in living
              software, to six questions about your business.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {FACES_EN.map((f) => (
              <div className="fx-card" key={f.label}>
                <span className="fx-label">{f.label}</span>
                <h3>{f.q}</h3>
                <p>{f.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — mirrors the FAQPage JSON-LD */}
      <section className="fx-sec fx-sec-alt" id="faq">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Common questions</p>
          <h2 className="fx-serif fx-h2">What people ask about the category</h2>
          <div className="fx-faq">
            {FAQ_EN.map((f) => (
              <div className="fx-qa" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="fx-fineprint fx-mt">
            Updated July 2026 · <Link href="/en/use-cases">use cases</Link> ·{' '}
            <Link href="/en/what-it-does">what the app answers</Link>
          </p>
        </div>
      </section>

      {/* CTA — see the category live and join the beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-center fx-tc">
          <p className="fx-eyebrow">The next step</p>
          <h2 className="fx-serif fx-h2">The best definition is watching one come to life.</h2>
          <p className="fx-lead fx-center">
            In the demo, a self-operating app builds itself in front of you — from spreadsheet to a
            running process, with you approving what you see. Like what you see? Join the private
            beta.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/en/demo" data-track="en-soa-demo-cta">
              {CTA_EN.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/en#start" data-track="en-soa-beta-cta">
              {CTA_EN.beta}
            </Link>
          </div>
          <div className="fx-scar">Private beta · no card to start · in weeks, not months</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
