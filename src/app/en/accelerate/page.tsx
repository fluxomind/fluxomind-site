import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { SIGNATURE_EN, NEGATION_EN, PHASE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Accelerate — from pilot to production',
  description:
    'For the company that already tried AI and watched pilots die: 79% adopted agents (PwC, 2025), only 11% have them deployed (KPMG, 2025). Fluxomind delivers the process operated — the agent runs the day-to-day, a human decides the sensitive cases, integrated with what you already have.',
  alternates: {
    canonical: '/en/accelerate',
    languages: { 'pt-BR': '/acelere', en: '/en/accelerate' },
  },
};

// Espelho EN de /acelere (ADR-0006). Estatísticas com fonte (PwC/KPMG)
// traduzem direto — as fontes são internacionais.
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const WALLS = [
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <path d="M7 9h10v3a5 5 0 0 1-10 0V9z" />
        <path d="M9.5 9V5M14.5 9V5M12 17v4" />
      </svg>
    ),
    title: 'The prototype lives alone',
    desc: 'Your operation lives in the ERP, the CRM, e-mail and WhatsApp. A pilot that doesn’t talk to them never enters anyone’s routine — no matter how good the demo was.',
  },
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M12 8.5v4M12 15.5h.01" />
      </svg>
    ),
    title: 'Security blocks what is not governed',
    desc: 'Without permissions, limits and an audit trail, the pilot doesn’t make it past the committee. Rightly so: nobody hands a real process to something that doesn’t account for itself.',
  },
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    ),
    title: 'Nobody owns Monday morning',
    desc: 'The model answers well — but who runs the process every week, handles the exceptions and never drops the ball? Without an owner of the operation, the pilot becomes one more open tab.',
  },
];

const OPERATED = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M20 12a8 8 0 1 1-2.3-5.7" />
        <path d="M20 3v4h-4" />
      </svg>
    ),
    tag: 'Process',
    title: 'The agent runs the day-to-day',
    desc: 'Collections that track the delay, follow-ups that never forget, approvals that keep moving. The process happens without depending on someone remembering it.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.6-3 2.7-4.6 5.5-4.6 1.2 0 2.3.3 3.2.9" />
        <path d="M14.5 17.5l2 2 4-4" />
      </svg>
    ),
    tag: 'Handoff',
    title: 'A human decides the sensitive cases',
    desc: 'When the case demands it — a discount beyond the limit, a delicate customer, a high amount — the app escalates to a person on your team. The AI proposes; whoever is in charge decides.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    tag: 'Governance',
    title: 'Governed, with proof of every action',
    desc: 'Permissions, usage limits and a tamper-evident audit trail at every step. Every conclusion arrives with the evidence of what was done.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="4.5" cy="6" r="1.8" />
        <circle cx="19.5" cy="6" r="1.8" />
        <circle cx="4.5" cy="18" r="1.8" />
        <circle cx="19.5" cy="18" r="1.8" />
        <path d="M10 10.2L6 7.4M14 10.2L18 7.4M10 13.8L6 16.6M14 13.8L18 16.6" />
      </svg>
    ),
    tag: 'Integration',
    title: 'Sits around what you already have',
    desc: 'SAP, Salesforce and TOTVS stay exactly where they are — the app operates around them, integrating via API, e-mail and WhatsApp, with no replacement project.',
  },
];

export default function AccelerateEn() {
  return (
    <div className="page-ent" lang="en">
      <SiteHeaderEn ptHref="/acelere" />

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">For companies · AI adoption at scale</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '22ch' }}>
            The AI pilot impressed in the demo — <span className="g">and died before production.</span>
          </h1>
          <p className="hsub">
            If that story happened in your company, the model wasn&apos;t the problem — building
            was never the bottleneck. What kills the pilot is what comes after: integrating,
            governing and operating every day. <strong>That is exactly the part Fluxomind
            delivers.</strong>
          </p>
          <div className="herocta">
            <a className="btn btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-accelerate-contact-cta">
              {CTA_EN.contact}
            </a>
            <a className="btn btn-ghost" href="#operated">
              See what changes
            </a>
          </div>
          <div className="stat">
            <div className="s">
              <b>79%</b>
              <span>of companies have already adopted AI agents (PwC, May 2025)</span>
            </div>
            <div className="s">
              <b>11%</b>
              <span>actually have them deployed (KPMG, 2025)</span>
            </div>
            <div className="s">
              <b>building ≠ operating</b>
              <span>the gap where pilots die</span>
            </div>
          </div>
        </div>
      </header>

      <section id="why-pilots-die">
        <div className="wrap">
          <div className="center">
            <div className="kick">Why pilots die</div>
            <h2>The pilot proves the AI works. It doesn&apos;t prove it operates.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Between the demo and production, three walls appear — and none of them is the model.
            </p>
          </div>
          <div className="prob">
            {WALLS.map((w) => (
              <div className="pcard" key={w.title}>
                <div className="pi" aria-hidden="true" style={{ color: 'var(--blue)', lineHeight: 0 }}>
                  {w.icon}
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              The difference
            </div>
            <h2 style={{ color: '#fff', maxWidth: '24ch' }}>
              Not one more pilot to test. The process delivered running.
            </h2>
            <ul
              style={{ listStyle: 'none', marginTop: 26, display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {NEGATION_EN.nots.map((n) => (
                <li
                  key={n}
                  style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#A9AEB8', fontSize: 16 }}
                >
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

      <section id="operated" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Delivered operated</div>
            <h2>What arrives at your company arrives running</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              You don&apos;t receive a tool for the team to learn. You receive the process in
              operation — and this is how it runs.
            </p>
          </div>
          <div className="ways">
            {OPERATED.map((o) => (
              <div className="way" key={o.title}>
                <div className="wi" aria-hidden="true">{o.icon}</div>
                <h3>{o.title}</h3>
                <div className="tagm">{o.tag}</div>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="fitlink" style={{ textAlign: 'center' }}>
            <Link href="/en/security">
              How governance and security work, in detail →
            </Link>
          </div>
        </div>
      </section>

      <section id="model" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Adoption model</div>
            <h2>Start with one process. In weeks — not a months-long project.</h2>
          </div>
          <div className="timeline">
            <div className="tl">
              <div className="num">1</div>
              <h4>One process, accompanied</h4>
              <p>
                Together we pick a process that hurts — collections, support, approvals. Our team
                accompanies you from design to the first real conclusion.
              </p>
            </div>
            <div className="tl">
              <div className="num">2</div>
              <h4>Proof in the day-to-day</h4>
              <p>
                The app operates and your team sees every conclusion with the proof — in the real
                process, not on a slide. It is the evidence the pilot never had.
              </p>
            </div>
            <div className="tl">
              <div className="num">3</div>
              <h4>Expansion, area by area</h4>
              <p>
                Value proven, other processes come in. Governance stays central; each area gets
                its own self-operating app.
              </p>
            </div>
          </div>
          <div className="honest">
            <b>Transparency.</b> {PHASE_EN.exists} We are in beta — adoption happens closely
            accompanied by our team; formal SLAs and certifications are on the roadmap.{' '}
            {PHASE_EN.vision}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card" id="contact">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Let&apos;s talk
            </div>
            <h2>Bring the pilot that died. Leave with a process operating.</h2>
            <p className="lead">
              Tell us which process you want to delegate. We design your company&apos;s first
              self-operating app with your team — and you follow every conclusion, with the proof.
            </p>
            <div className="ctab">
              <a className="btn btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-accelerate-contact-cta">
                {CTA_EN.contact}
              </a>
              <Link className="btn btn-ghost" href="/en/security">
                See the security in depth
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
