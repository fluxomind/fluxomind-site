import Link from 'next/link';
import type { Metadata } from 'next';
import BetaFormEn from '@/components/BetaFormEn';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Beta access',
  description:
    'Fluxomind is in private beta — open launch coming soon. Access is hands-on and starts with no card: you join the launch list and the team builds your first self-operating app with you. Public pricing comes at launch.',
  alternates: {
    canonical: '/en/pricing',
    languages: { 'pt-BR': '/precos', en: '/en/pricing' },
  },
};

// FAQPage JSON-LD — mirrors the FAQ section below. No pricing published.
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a card to start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. During the beta there are no charges and no card. You join the launch list and access is hands-on — the team builds your first self-operating app with you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much will it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Public pricing comes at launch. The ranges are being set with the first beta customers, so we would rather not publish a number that could still change. Proof, not a promise.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does it work after the beta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The design is simple: a single invoice with the AI models already built in — no provider accounts, keys or limits for you to manage. We publish the figures at launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'We are a larger company — how does adoption work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With the team at your side: dedicated isolation, governance and guided onboarding. See how it works in Accelerate, or talk to the team.',
      },
    },
  ],
};

const STEPS = [
  {
    label: '01 · You join the list',
    title: 'Private beta, by invitation',
    desc: 'You describe the operation you want off your plate and join the launch list — those at the front go in right away. No card to start.',
  },
  {
    label: '02 · The team builds it with you',
    title: 'Hands-on access',
    desc: 'We build your first self-operating app side by side, inside your process. You don’t set anything up alone in a dashboard — the team is right there with you.',
  },
  {
    label: '03 · It starts operating',
    title: 'Work done, and accounted for',
    desc: 'The app takes over the day-to-day and shows you exactly what it did. You approve what’s sensitive; the rest runs on its own.',
  },
];

export default function PricingEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/precos" />

      {/* HERO */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in fx-narrow">
          <span className="fx-pill">
            <span className="fx-lz" /> Private beta · open launch coming soon
          </span>
          <p className="fx-eyebrow">Beta access</p>
          <h1 className="fx-serif fx-h1">
            Access starts <span className="fx-em">hands-on</span> — and with no card.
          </h1>
          <p className="fx-lead">
            Fluxomind is in private beta. You&rsquo;re not buying a piece of software to drive: you
            join the list, the team builds your first self-operating app with you, and it starts
            running inside your process. Public pricing comes at launch.
          </p>
          <div className="fx-cta-row">
            <a className="fx-btn fx-btn-primary" href="#start" data-track="en-pricing-beta">
              Join the beta
            </a>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-pricing-contact">
              {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-reassure">
            <span>No card to start</span>
            <span>Hands-on access with the team</span>
            <span>You approve what&rsquo;s sensitive</span>
          </div>
        </div>
      </header>

      {/* HOW ACCESS WORKS */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">How it works</p>
            <h2 className="fx-serif fx-h2">Three steps, with the team at your side.</h2>
            <p className="fx-body">
              Beta access isn&rsquo;t a subscribe button. It&rsquo;s a guided way in: from the
              problem you describe to a self-operating app up and running.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {STEPS.map((s) => (
              <div className="fx-card" key={s.label}>
                <span className="fx-label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THE BETA INCLUDES */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">What the beta includes</p>
          <h2 className="fx-serif fx-h2">You come in with support — not dropped into a dashboard.</h2>
          <ul className="fx-list fx-check">
            <li>
              <strong>Hands-on access</strong> — the team is with you from day one to a running
              operation.
            </li>
            <li>
              <strong>Your first self-operating app built with you</strong>, inside your process,
              with what you already use.
            </li>
            <li>
              <strong>No card and no charges</strong> for as long as the beta runs.
            </li>
            <li>
              <strong>Your data isolated from day one</strong> — enterprise-grade governance,
              already in production.
            </li>
          </ul>
          <div className="fx-note fx-mt">
            <strong>Public pricing comes at launch.</strong> The ranges are being set with the first
            beta customers — which is why we&rsquo;re not publishing numbers that could still move.
            The design is already clear, though: when it arrives, it&rsquo;ll be a single invoice
            with the AI models included — no provider accounts or keys for you to manage.
          </div>
        </div>
      </section>

      {/* WHERE THE VALUE SITS */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Where the value sits</p>
            <h2 className="fx-serif fx-h2">
              More than a tool. <span className="fx-gold">Far less</span> than hiring someone.
            </h2>
            <p className="fx-body">
              The value doesn&rsquo;t live in a pricing table — it lives in the work that comes off
              your plate. It sits between two worlds you already know:
            </p>
          </div>
          <div className="fx-grid2 fx-mt">
            <div className="fx-card">
              <span className="fx-label">More than software</span>
              <h3>You&rsquo;re not driving a system anymore</h3>
              <p>
                A tool is something you buy and operate. Here the app operates on its own and
                reports back to you — worth more than software that needs you all day just to work.
              </p>
            </div>
            <div className="fx-card">
              <span className="fx-label">Less than an employee</span>
              <h3>Without a hire&rsquo;s payroll</h3>
              <p>
                An employee means salary, benefits and management. The app takes on the operation
                for a fraction of that — no hiring process, no months of ramp-up, no time off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Common questions</p>
          <h2 className="fx-serif fx-h2">What people usually ask</h2>
          <div className="fx-faq">
            <div className="fx-qa">
              <h4>Do I need a card to start?</h4>
              <p>
                No. During the beta there are no charges and no card. You join the launch list and
                access is hands-on — the team builds your first self-operating app with you.
              </p>
            </div>
            <div className="fx-qa">
              <h4>How much will it cost?</h4>
              <p>
                Public pricing comes at launch. The ranges are being set with the first beta
                customers, so we&rsquo;d rather not publish a number that could still change. Proof,
                not a promise.
              </p>
            </div>
            <div className="fx-qa">
              <h4>How does it work after the beta?</h4>
              <p>
                The design is simple: a single invoice with the AI models already built in — no
                provider accounts, keys or limits for you to manage. We publish the figures at
                launch.
              </p>
            </div>
            <div className="fx-qa">
              <h4>We&rsquo;re a larger company — how does adoption work?</h4>
              <p>
                With the team at your side: dedicated isolation, governance and guided onboarding.
                See how it works in <Link href="/en/accelerate">Accelerate</Link>, or{' '}
                <a href={PLATFORM_CONTACT_EN}>talk to the team</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — primary capture */}
      <section className="fx-sec fx-offer" id="start">
        <div className="fx-wrap fx-narrow" style={{ textAlign: 'center' }}>
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            The next step
          </p>
          <h2 className="fx-serif fx-h2">Join the private beta.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '54ch' }}>
            Tell us the operation you want off your plate — those at the front of the line go into
            the beta right away, with the team building the first app with you.
          </p>
          <BetaFormEn />
          <div className="fx-offerbtns">
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-pricing-contact">
              Rather talk first? {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-scar">Hands-on beta · no card · public pricing comes at launch</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
