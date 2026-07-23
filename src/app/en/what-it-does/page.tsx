import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { CTA_EN, FACES_EN, NEGATION_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'What it does',
  description:
    'Every Fluxomind app answers six questions about your business — data, screens, decisions, the day-to-day, integrations and permissions — and starts operating the moment it exists. In weeks, not months.',
  alternates: {
    canonical: '/en/what-it-does',
    languages: { 'pt-BR': '/o-que-tem', en: '/en/what-it-does' },
  },
};

// Espelho EN de /o-que-tem na identidade dark "editorial-tech" (fx.css).
// As 6 perguntas: redação canônica em messages-en (FACES_EN). Aqui vive só a
// glosa em voz de capacidade — o que a face FAZ, não o botão que você aperta.
const FACE_DOES: Record<string, string> = {
  Domain:
    'Your business data and concepts — customers, orders, contracts — modeled from what you describe, without drawing a single table.',
  Experience:
    'The screens and the interaction: the same operation becomes a record on desktop, a conversation on WhatsApp, and voice — and it adjusts by talking.',
  Intelligence:
    'Decisions and next steps: agents that truly execute — they chase payments, reply, organize — backed by a brain that understands your business.',
  Process:
    'The day-to-day that runs without you: automations and rules that fire on events — with approvals at the points that matter.',
  Connections:
    'WhatsApp, email, API, your systems: it pulls in what you already use and even becomes a tool inside others. It integrates — it doesn’t force a replacement.',
  Trust:
    'Permissions, isolation and proof: roles, genuinely isolated data and an audit trail — and, in the sensitive case, a person decides.',
};

const CARDS = FACES_EN.map((f) => ({ ...f, does: FACE_DOES[f.label] }));

export default function WhatItDoesEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/o-que-tem" />

      {/* 01 — HERO: what it DOES, not the buttons you press */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">What it does</p>
            <h1 className="fx-serif fx-h1">
              What your app <span className="fx-em">does</span> &mdash; not the buttons you press.
            </h1>
            <p className="fx-lead">
              Real AI-powered software isn&rsquo;t sold by its list of buttons &mdash; it&rsquo;s sold by
              the work it does on its own. You delegate the task; the app{' '}
              <strong>answers, chases payments and organizes</strong> on your WhatsApp, 24/7, and acts
              within the authority you set.
            </p>
            <div className="fx-cta-row">
              <Link className="fx-btn fx-btn-primary" href="/en/demo" data-track="en-wid-hero-demo">
                {CTA_EN.demo}
              </Link>
              <a className="fx-btn fx-btn-ghost" href="#anatomy">
                See the anatomy &rarr;
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 02 — AUTONOMY, NOT FEATURES: the triple negation */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Autonomy, not features</p>
          <h2 className="fx-serif fx-h2">
            Not one more tool for you to operate. It&rsquo;s the <span className="fx-em">work, done</span>.
          </h2>
          <p className="fx-body">
            Old software hands you a dashboard and a new job title: operator. Your app does the
            opposite &mdash; it takes the task and reports back. That&rsquo;s why the right question is
            never what it has, but what it does without you.
          </p>
          <ul className="fx-list fx-mt-s">
            {NEGATION_EN.nots.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="fx-quote fx-mt">{NEGATION_EN.is}</p>
        </div>
      </section>

      {/* 03 — THE ANATOMY: the six questions that make it a whole system */}
      <section className="fx-sec fx-sec-alt" id="anatomy">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">The anatomy</p>
            <h2 className="fx-serif fx-h2">
              Six questions about your business &mdash; answered{' '}
              <span className="fx-em">all at once</span>.
            </h2>
            <p className="fx-body">
              You don&rsquo;t assemble it module by module. You describe the problem, and Fluxomind
              sculpts the six answers together, from the same conversation. That&rsquo;s what makes it a
              whole system &mdash; not a prototype you still have to finish.
            </p>
          </div>

          <div className="fx-grid3 fx-mt">
            {CARDS.map((f) => (
              <div className="fx-card" key={f.label}>
                <span className="fx-label">{f.label}</span>
                <h3>{f.q}</h3>
                <p>{f.does}</p>
              </div>
            ))}
          </div>

          <div className="fx-narrow fx-mt">
            <p className="fx-body">
              Two of those questions hold the secret: <strong>Process</strong> makes the day-to-day
              run without you, and <strong>Trust</strong> guarantees that, in the sensitive case, a
              person decides. Your app doesn&rsquo;t just exist &mdash; <strong>it operates</strong>.
            </p>
            <p>
              <Link href="/en/security" data-track="en-wid-security">
                How trust is guaranteed &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 04 — SELF-OPERATING APP VS A CODE PROJECT YOU MAINTAIN */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">App vs code project</p>
            <h2 className="fx-serif fx-h2">
              Building got easy. What&rsquo;s missing is <span className="fx-em">operating</span>.
            </h2>
            <p className="fx-body">
              Any AI today hands you a prototype &mdash; and from there, the code is yours to maintain.
              Fluxomind assembles the six answers on top of a platform that&rsquo;s already in place, with
              data, screens, governance and connections ready. The result is a self-operating app &mdash;
              in <span className="fx-em">weeks, not months</span>.
            </p>
          </div>

          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>a code project you maintain</h4>
              <ul>
                <li>Born from scratch &mdash; the code becomes your responsibility forever.</li>
                <li>Multi-tenant, roles, permissions? You implement them, or go without.</li>
                <li>Every new request is more glued-on code; drift is a matter of time.</li>
                <li>One surface only &mdash; a web page doesn&rsquo;t become WhatsApp or voice on its own.</li>
                <li>Built, not operating: running the day-to-day is still on you.</li>
              </ul>
            </div>
            <div className="fx-ftarrow">&rarr;</div>
            <div className="fx-ft to">
              <h4>a self-operating app that works</h4>
              <ul>
                <li>Assembled on a platform that&rsquo;s already in place &mdash; zero code for you to maintain.</li>
                <li>Multi-tenancy, roles and permissions inherited out of the box.</li>
                <li>Changes by talking, over one source of truth &mdash; no drift.</li>
                <li>The same operation becomes screen, WhatsApp, voice and a tool via MCP.</li>
                <li>Runs the day-to-day and hands off to a human in the sensitive case.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CTA: join the beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-center fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            The next step
          </p>
          <h2 className="fx-serif fx-h2">Want this answering for your business?</h2>
          <p className="fx-body" style={{ margin: '0 auto' }}>
            Join the private beta and tell us the process you want to delegate &mdash; the team builds
            the first app with you. Or talk to us directly.
          </p>
          <div className="fx-cta-row fx-mt-s">
            <Link className="fx-btn fx-btn-primary" href="/en#start" data-track="en-wid-beta-cta">
              {CTA_EN.beta}
            </Link>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-wid-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-mt-s">
            <Link href="/en/platform" data-track="en-wid-platform">
              Want to see how all of this is built and proven? Look inside the platform &rarr;
            </Link>
          </div>
          <div className="fx-scar">Guided beta &middot; no credit card &middot; in weeks, not months</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
