import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'During the beta, access is accompanied and card-free — you join through the beta list. Afterwards, subscription + usage with frontier AI models included: one invoice, no AI provider accounts or keys to manage.',
  alternates: {
    canonical: '/en/pricing',
    languages: { 'pt-BR': '/precos', en: '/en/pricing' },
  },
};

// Espelho EN de /precos (ADR-0006). Adaptação registrada no message house EN:
// a dor "fatura em reais, não em dólar" é brasileira — em EN vira o mecanismo
// ("one invoice, models included").
export default function PricingEn() {
  return (
    <div className="page-pricing" lang="en">
      <SiteHeaderEn ptHref="/precos" />

      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Pricing
            </div>
            <h1>
              In beta: no card. <span className="g">After: subscription + usage.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '56ch' }}>
              During the beta, access is accompanied — our team joins you, with no card and no
              charges. Afterwards, the design is simple: a subscription plus usage, with frontier
              AI models already included in a single invoice.
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="plans">
            <div className="plan">
              <div className="ptag">Today · beta</div>
              <h3>Accompanied beta</h3>
              <div className="price">
                <b>No card</b>
                no cost during the beta
              </div>
              <p className="desc">
                You don&apos;t go in alone: the team accompanies you and builds your first
                self-operating app with you.
              </p>
              <ul>
                <li><span className="ck">✓</span> Access through the beta list, accompanied by the team</li>
                <li><span className="ck">✓</span> No card and no charges for the duration of the beta</li>
                <li><span className="ck">✓</span> A real self-operating app, on your process</li>
                <li><span className="ck">✓</span> Your data isolated from day one</li>
              </ul>
              <a className="btn btn-primary" href={PLATFORM_CONTACT} data-track="en-pricing-contact-cta">
                {CTA_EN.contact}
              </a>
            </div>

            <div className="plan featured">
              <div className="ribbon">After the beta</div>
              <div className="ptag">Subscription + usage</div>
              <h3>One invoice</h3>
              <div className="price">
                <b>Subscription + usage</b>
                with the AI models included
              </div>
              <p className="desc">
                The product design for after the beta: predictable at the base, proportional to
                what runs.
              </p>
              <ul>
                <li><span className="ck">✓</span> Frontier models built in — no separate AI provider to hire</li>
                <li><span className="ck">✓</span> A single invoice — no surprise AI bills on the side</li>
                <li><span className="ck">✓</span> No provider accounts, keys or limits to manage</li>
                <li><span className="ck">✓</span> Usage visible in your account; to expand, talk to the team</li>
              </ul>
              <a className="btn btn-primary" href={PLATFORM_CONTACT} data-track="en-pricing-contact-cta">
                {CTA_EN.contact}
              </a>
            </div>

            <div className="plan">
              <div className="ptag">Scale</div>
              <h3>Adoption at scale</h3>
              <div className="price">
                <b>With the team</b>
                tailored terms for scale
              </div>
              <p className="desc">
                To adopt across more processes and more areas — with what your procurement
                requires.
              </p>
              <ul>
                <li><span className="ck">✓</span> Dedicated isolation and BYOK (your key)</li>
                <li><span className="ck">✓</span> Governance and a verifiable audit trail</li>
                <li><span className="ck">✓</span> Guided onboarding, side by side with the team</li>
                <li><span className="ck">✓</span> A person decides the sensitive cases</li>
              </ul>
              <a className="btn btn-ghost-d" href={PLATFORM_CONTACT}>
                {CTA_EN.contact}
              </a>
            </div>
          </div>

          <div className="honest" style={{ maxWidth: 760, margin: '34px auto 0' }}>
            <b>Transparency:</b> final price ranges are being defined with the first beta
            customers — which is why we don&apos;t publish numbers that may still change. What is
            already defined is the design: <strong>subscription + usage</strong>, with frontier
            models included in a single invoice.
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            <div className="qa">
              <h4>Do I need a card to start?</h4>
              <p>
                No. During the beta there are no charges and no card. You request access and go
                in accompanied — the team builds your first self-operating app with you.
              </p>
            </div>
            <div className="qa">
              <h4>How much will it cost after the beta?</h4>
              <p>
                Final ranges are being defined with the first customers — we prefer not to
                publish a number that may still change. The design is settled: subscription +
                usage, with frontier models included in a single invoice.
              </p>
            </div>
            <div className="qa">
              <h4>Do I need to hire an AI provider separately?</h4>
              <p>
                No. Frontier models come built into the platform: it handles the accounts, the
                keys and the limits — you get one invoice.
              </p>
            </div>
            <div className="qa">
              <h4>How do I control how much I spend?</h4>
              <p>
                You track usage in your account, and nothing changes tier on its own: to expand
                capacity, you talk to the team.
              </p>
            </div>
            <div className="qa">
              <h4>Can I cancel anytime?</h4>
              <p>
                Yes. The beta has no cost and no commitment. Afterwards the model is a
                subscription — you are not locked into a months-long project.
              </p>
            </div>
            <div className="qa">
              <h4>We are a larger company — how does adoption work?</h4>
              <p>
                With the team at your side: dedicated isolation, governance and guided
                onboarding. <a href={PLATFORM_CONTACT}>Talk to the team</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="offer" style={{ borderRadius: 0 }}>
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Start now
          </div>
          <h2>See a self-operating app being born</h2>
          <p className="lead">
            From a described problem to a running app — in the interactive demo, you operate it
            yourself. {CTA_EN.demoNote}.
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/demo" data-track="en-pricing-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT}>
              {CTA_EN.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
