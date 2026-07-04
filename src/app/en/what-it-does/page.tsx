import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { FACES_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'What it does',
  description:
    'Every Fluxomind app answers six questions about your business — data, screens, decisions, the day-to-day, integrations and permissions — and starts operating the moment it exists. In weeks, not months.',
  alternates: {
    canonical: '/en/what-it-does',
    languages: { 'pt-BR': '/o-que-tem', en: '/en/what-it-does' },
  },
};

// Espelho EN de /o-que-tem (ADR-0006). O HexAgono360 fica de fora do v1 EN
// (copy pt embutida no client component — parametrizar é melhoria futura).
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const FACE_DETAILS: Record<string, { icon: ReactNode; desc: string }> = {
  Domain: {
    icon: (
      <svg {...ICON_PROPS}>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
      </svg>
    ),
    desc: 'Customers, contracts, orders, tickets — the objects of your business, with fields and relations. You describe them in plain language; Fluxomind creates the data model, without you designing a single table.',
  },
  Experience: {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M3 9h18M8.5 21h7M12 17v4" />
      </svg>
    ),
    desc: 'Lists, forms, records and dashboards — generated for every object and adjusted by talking. The same operation becomes a screen on desktop, a conversation on WhatsApp, and voice.',
  },
  Intelligence: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
        <circle cx="18" cy="17.5" r="2" />
      </svg>
    ),
    desc: 'Agents that truly execute — collect, reply, organize — backed by a brain that understands your business and searches your knowledge. Not a chatbot that just replies: it is work concluded.',
  },
  Process: {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="15" width="6" height="5" rx="1" />
        <path d="M6 9v4a3 3 0 0 0 3 3h6" />
      </svg>
    ),
    desc: 'The heart of the self-operating app: automations and rules that run on events, data or triggers. The day-to-day happens without you — with approvals at the points that matter.',
  },
  Connections: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8.7 15.3l-2 2a3.5 3.5 0 0 1-5-5l2-2M15.3 8.7l2-2a3.5 3.5 0 0 1 5 5l-2 2M9 15l6-6" />
      </svg>
    ),
    desc: 'Connectors, API and MCP: your app pulls data from what you already use and even becomes a tool inside other systems. It integrates — it does not force a replacement.',
  },
  Trust: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    desc: 'Roles and permissions, data isolation, masking of what is sensitive and an audit trail — built in, in every app. And in the sensitive cases, a person decides: the app hands off to a human.',
  },
};

const CARDS = FACES_EN.map((f) => ({ ...f, ...FACE_DETAILS[f.label] }));

export default function WhatItDoesEn() {
  return (
    <div className="page-feats" lang="en">
      <SiteHeaderEn ptHref="/o-que-tem" />

      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              What it does
            </div>
            <h1>
              One app, <span className="g">six questions about your business.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '58ch' }}>
              Every Fluxomind app is born answering six questions about your operation. You
              don&apos;t assemble it module by module: you describe the problem and it sculpts the
              whole app — which doesn&apos;t sit still: <strong>it starts running the day-to-day</strong>.
            </p>
            <div className="herocta" style={{ justifyContent: 'center', marginTop: 26 }}>
              <Link className="btn btn-primary" href="/demo" data-track="en-wid-demo-cta">
                {CTA_EN.demo}
              </Link>
              <a className="btn btn-ghost" href="#questions">
                See the six questions
              </a>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--slate)' }}>{CTA_EN.demoNote}</p>
          </div>
        </div>
      </header>

      <section id="questions">
        <div className="wrap">
          <div className="center">
            <div className="kick">The six questions</div>
            <h2>What your app answers</h2>
            <p className="lead" style={{ margin: '14px auto 0', maxWidth: '58ch' }}>
              Six answers, one single app — data, screens, decisions, the day-to-day,
              integrations and permissions are born together, from the same conversation.
            </p>
          </div>

          <div className="feats" style={{ marginTop: 40 }}>
            {CARDS.map((f) => (
              <div className="featx" key={f.label}>
                <div className="fx">{f.icon}</div>
                <div className="area">{f.label}</div>
                <h3>{f.q}</h3>
                <p>{f.desc}</p>
                <span className="tag">{f.gloss}</span>
              </div>
            ))}
          </div>

          <div className="center" style={{ marginTop: 46 }}>
            <p className="lead" style={{ maxWidth: '62ch', margin: '0 auto' }}>
              Two of those questions hold the secret: <strong>Process</strong> makes the
              day-to-day run without you, and <strong>Trust</strong> guarantees that, in the
              sensitive case, a person decides. Your app doesn&apos;t just exist —{' '}
              <strong>it operates</strong>. That is the difference between an app you use and an
              app that works for you.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link href="/en/security" style={{ color: 'var(--blue)', fontWeight: 600 }}>
                How trust is guaranteed →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="center">
            <div className="kick">Why this is different</div>
            <h2>Building got easy. Operating is what&apos;s missing.</h2>
            <p className="lead" style={{ margin: '14px auto 0', maxWidth: '60ch' }}>
              Any AI today hands you a prototype — and from there, the code is yours to
              maintain. Fluxomind assembles the six answers{' '}
              <strong>on top of a platform that is already standing</strong>, with data, screens,
              governance and connections ready. The result is a self-operating app —{' '}
              <strong>in weeks, not months</strong>.
            </p>
          </div>

          <div className="appvs">
            <div className="col bad">
              <h4>Project generated by a code builder</h4>
              <ul>
                <li>Born from zero: code that becomes your responsibility forever.</li>
                <li>Multi-tenant, roles and permissions? You implement them — or go without.</li>
                <li>Every new request is more glued-on code; drift is a matter of time.</li>
                <li>One surface only: what became web doesn&apos;t become WhatsApp or voice on its own.</li>
                <li>Built, not operating: running the day-to-day is still your problem.</li>
              </ul>
            </div>
            <div className="col good">
              <h4>Fluxomind self-operating app</h4>
              <ul>
                <li>Assembled on a platform that is already standing: zero code for you to maintain.</li>
                <li>Multi-tenancy, roles and permissions inherited out of the box, in every app.</li>
                <li>Changes by talking — one source of truth, no accumulated drift.</li>
                <li>The same operation becomes screen, WhatsApp, voice and a tool via MCP.</li>
                <li>Runs the day-to-day and hands off to a human in the sensitive cases.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="offer">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            The next step
          </div>
          <h2>Want this answering for your business?</h2>
          <p className="lead" style={{ maxWidth: '56ch', margin: '14px auto 0' }}>
            See a self-operating app being born in the interactive demo — or talk directly to
            the team.
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/demo" data-track="en-wid-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT} data-track="en-wid-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
