import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Accelerate — from pilot to production',
  description:
    'For the company that already tried AI and watched pilots die: 62% already experiment with AI agents, only 23% actually operate them (McKinsey, 2025). Fluxomind delivers the process operated — the agent runs the day-to-day, a human decides the sensitive cases, integrated with what you already have.',
  alternates: {
    canonical: '/en/accelerate',
    languages: { 'pt-BR': '/acelere', en: '/en/accelerate' },
  },
};

// Espelho EN de /acelere. Ângulo: capacidade de gente grande, simplicidade de
// WhatsApp. Gap canônico 62%/23% (McKinsey, 2025) — mesma fonte da PT.
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Ícone de check para as feature rows (fx-feat).
const CHECK = (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Big-company capability — governance already in production (badge b-impl).
const GOVERNANCE = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
    title: 'Per-company isolation',
    desc: 'Each company is truly isolated and its data is encrypted. What belongs to one never touches another.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9.5 14l1.8 1.8L15 12" />
      </svg>
    ),
    title: 'Tamper-evident trail',
    desc: 'Every action — what it proposed, what you decided and what happened in the world — is recorded and verifiable. Real audit, not scattered logs.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="15" r="4" />
        <path d="M10.8 12.2L20 3M17 6l2 2M14 9l2 2" />
      </svg>
    ),
    title: 'Roles, permissions and data protection',
    desc: 'Role-based access control, masking of what’s sensitive and compliant data handling — built in, across every app.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 18a8 8 0 1 1 16 0" />
        <path d="M12 18l4.5-4.5" />
        <circle cx="12" cy="18" r="1.2" />
      </svg>
    ),
    title: 'Cost control',
    desc: 'Usage limits per process and visibility into AI spend — no surprises on the invoice, no inference burned for nothing.',
  },
];

// Delivered operated — what “running” means in practice.
const OPERATED = [
  {
    title: 'The agent runs the day-to-day',
    desc: 'Collections that chase the overdue invoice, follow-ups that never forget, approvals that keep moving. The process happens without depending on someone remembering it.',
  },
  {
    title: 'A human decides the sensitive cases',
    desc: 'An out-of-policy discount, a high-value deal, a delicate customer: the app escalates to a person on your team. The AI proposes; whoever is in charge decides.',
  },
  {
    title: 'It wraps around what you already have',
    desc: 'The ERP, the CRM and the WhatsApp your company already uses stay where they are. The app integrates via API, e-mail and WhatsApp — no replacement project.',
  },
];

export default function AccelerateEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/acelere" />

      {/* HERO — big-company capability, delivered simple */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap">
          <span className="fx-pill">
            <span className="fx-lz" /> Private beta · larger companies, by inbound
          </span>
          <p className="fx-eyebrow">Adoption at scale</p>
          <h1 className="fx-serif fx-h1" style={{ maxWidth: '20ch' }}>
            Big-company capability. The simplicity of <span className="fx-em">WhatsApp</span>.
          </h1>
          <p className="fx-lead">
            <em>Enterprise-grade by design, SMB-first by choice.</em> Corporate-grade governance —
            per-company isolation, a tamper-evident audit trail, data protection — already in
            production, delivered to the people who delegate over WhatsApp. A larger company that
            comes to us on its own gets the same product: <strong>no RFP, no months-long
            project</strong>.
          </p>
          <div className="fx-cta-row">
            <a className="fx-btn fx-btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-accelerate-contact-cta">
              {CTA_EN.contact}
            </a>
            <Link className="fx-btn fx-btn-ghost" href="/en#start" data-track="en-accelerate-beta">
              Join the beta
            </Link>
          </div>
          <div className="fx-reassure">
            <span>Same product at every size</span>
            <span>Governance already in production</span>
            <span>No months-long project</span>
          </div>
        </div>
      </header>

      {/* 01 — THE TENSION: the expensive path a larger company usually takes */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The tension</p>
          <h2 className="fx-serif fx-h2">
            Larger companies usually pay dearly to get here.
          </h2>
          <div className="fx-gap">
            <div className="fx-gapn">
              <b className="fx-serif">62%</b>
              <span>already experiment with AI agents (McKinsey, 2025)</span>
            </div>
            <div className="fx-gaparrow">→</div>
            <div className="fx-gapn">
              <b className="fx-serif">23%</b>
              <span>actually get them operating (McKinsey, 2025)</span>
            </div>
          </div>
          <p className="fx-body">
            The usual path is long: an RFP, a committee, a months-long project and an integration
            that rips out what already works — all before the first result. And, often enough, a
            pilot that dazzled in the demo and never reached production. The bottleneck was never
            building. It&rsquo;s <strong>operating, governing and integrating</strong> every day —
            and that is exactly the part Fluxomind delivers ready.
          </p>
        </div>
      </section>

      {/* 02 — THE CAPABILITY: corporate governance, already in production */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">The capability</p>
            <h2 className="fx-serif fx-h2">
              Corporate-grade governance — <span className="fx-em">already in production</span>.
            </h2>
            <p className="fx-body">
              This isn&rsquo;t an enterprise-roadmap promise. Per-company isolation, a
              tamper-evident audit trail and cost control already run today — the same bar a
              corporation demands, delivered to the people who operate over WhatsApp.
            </p>
          </div>
          <div className="fx-grid2 fx-mt">
            {GOVERNANCE.map((g) => (
              <div className="fx-card" key={g.title}>
                <span className="fx-ico">{g.icon}</span>
                <div style={{ marginBottom: 10 }}>
                  <span className="fx-badge b-impl">
                    <span className="fx-d" /> In production
                  </span>
                </div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="fx-note fx-mt-s">
            <strong>Phase honesty.</strong> This is in production, today, in the private beta —
            guided closely by our team. Formal SLAs and certifications are on the roadmap: we
            don&rsquo;t promise what we don&rsquo;t yet deliver.
          </div>
        </div>
      </section>

      {/* 03 — DELIVERED OPERATED: the work done, not software */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Delivered operated</p>
          <h2 className="fx-serif fx-h2">
            You don&rsquo;t get a tool. You get the <span className="fx-em">work done</span>.
          </h2>
          <p className="fx-body">
            The work done — not one more piece of software for the team to learn to drive. What
            arrives at your company arrives already running:
          </p>
          <div className="fx-mt">
            {OPERATED.map((o) => (
              <div className="fx-feat" key={o.title}>
                <span className="fx-ck" aria-hidden="true">
                  {CHECK}
                </span>
                <div>
                  <h4>{o.title}</h4>
                  <p>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fx-mt-s">
            <Link href="/en/security">How governance and security work, in detail →</Link>
          </p>
        </div>
      </section>

      {/* 04 — ADOPTION BY INBOUND: same product, without the enterprise ritual */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">How you adopt</p>
            <h2 className="fx-serif fx-h2">By inbound. Not by proposal.</h2>
            <p className="fx-body">
              A larger company that comes on its own is served selectively — the same product,
              without the enterprise sales ritual. It starts with one process that hurts and grows
              from the proof, area by area.
            </p>
          </div>
          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>The usual path</h4>
              <ul>
                <li>An RFP and a committee before you see any value</li>
                <li>A months-long project, with a long rollout</li>
                <li>Ripping out the systems that already work</li>
                <li>A pilot that dazzles in the demo and dies before production</li>
              </ul>
            </div>
            <div className="fx-ftarrow">→</div>
            <div className="fx-ft to">
              <h4>With Fluxomind</h4>
              <ul>
                <li>You reach out; we take you on selectively</li>
                <li>One process first — in weeks, not months</li>
                <li>It wraps around what you already have</li>
                <li>It actually operates, with proof of every action</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — FINAL CTA */}
      <section className="fx-sec fx-cta-band" id="contact">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            The next step
          </p>
          <h2 className="fx-serif fx-h2">
            Bring the operation that today demands a project. Leave with a process running.
          </h2>
          <p className="fx-body" style={{ margin: '0 auto', maxWidth: '58ch' }}>
            Tell us which process you want to delegate. We take on companies that come to us on
            their own — same product, no RFP — and design your company&rsquo;s first self-operating
            app with your team.
          </p>
          <div className="fx-cta-row fx-mt-s">
            <a className="fx-btn fx-btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-accelerate-contact-cta">
              {CTA_EN.contact}
            </a>
            <Link className="fx-btn fx-btn-ghost" href="/en#start" data-track="en-accelerate-beta">
              Join the beta
            </Link>
          </div>
          <p className="fx-mt-s">
            <Link href="/en/platform">Prefer to go deep first? See the technical evaluation →</Link>
          </p>
          <div className="fx-scar">Guided beta · governance in production · in weeks, not months</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
