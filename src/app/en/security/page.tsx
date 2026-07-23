import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { TRUST_RULES_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Security & Governance',
  description:
    'Governance isn’t a feature — it’s the product: the 5 trust rules and the enterprise-grade engineering (isolation, BYOK, PII masking, tamper-evident audit trail) that let a non-technical person delegate without fear. Honest about what is not ready yet.',
  alternates: {
    canonical: '/en/security',
    languages: { 'pt-BR': '/seguranca', en: '/en/security' },
  },
};

// Espelho EN de /seguranca (ADR-0006). Os fatos técnicos (GUARANTEES,
// governança, compliance) são os mesmos do fact-check pt (PR #26) — a
// tradução preserva os claims exatos, sem overclaim.
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Honesty badge — b-impl (verifiable in production) · b-parc (maturing).
function Badge({ kind }: { kind: 'b-impl' | 'b-parc' | 'b-road' }) {
  const label = kind === 'b-impl' ? 'Implemented' : kind === 'b-parc' ? 'Partial' : 'Roadmap';
  return (
    <span className={`fx-badge ${kind}`}>
      <span className="fx-d" /> {label}
    </span>
  );
}

const HEAD_ROW: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flexWrap: 'wrap',
};

const CHECK = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// The five trust rules — canonical titles and gloss (messages-en.TRUST_RULES_EN).
// Only what belongs to this page lives here: each rule's icon and its expansion.
const RULE_DETAIL: { icon: ReactNode; more: string }[] = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
      </svg>
    ),
    more: 'The app builds itself from your problem, in front of you. Wrong framing shows up on the first screen — not months later, in a project delivered off-target.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16.5l8 4 8-4" />
      </svg>
    ),
    more: 'It is born whole, not a slice that pushes the rest off to later. Each stage closes with the evidence for you to check before you trust it.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 13l-4-4 4-4" />
        <path d="M5 9h8.5a5.5 5.5 0 0 1 0 11H8" />
      </svg>
    ),
    more: 'Every action is reversible and recorded. You correct it by talking, no ticket to open — the cost of a mistake is undoing it, not living with it.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
    more: 'Nothing critical runs without the OK of whoever is in charge. The AI proposes and prepares; the call that carries weight stays with a person.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15" r="1.2" />
      </svg>
    ),
    more: 'Each company in a dedicated space, with the key and the trail on your side. Verifiable — not on our word.',
  },
];

const RULES = TRUST_RULES_EN.map((r, i) => ({ ...r, ...RULE_DETAIL[i] }));

// Data protection — verifiable facts in the architecture today (rule 5).
// Promise in the title; "how it works" + engine trail in the mono footer. No overclaim.
const GUARANTEES = [
  {
    area: 'Isolation',
    title: 'Your data stays yours only',
    desc: 'Each company has a dedicated space. No customer ever reaches another’s data — not by accident, not on purpose.',
    how: 'Dedicated schema per customer + RLS as backstop. The tenantId derives from the request context, never from the payload.',
    trail: 'securityEngine · dataEngine',
  },
  {
    area: 'BYOK',
    title: 'The key is yours — and so is the lock',
    desc: 'Customers who require it can bring their own encryption key. Revoke it and the data becomes unreadable immediately — with or without us in the loop.',
    how: 'BYOK with KMS (AWS/GCP/Azure) and crypto-shredding: revocation cuts access to the data, independently of the platform.',
    trail: 'securityEngine · spec-byok',
  },
  {
    area: 'Privacy',
    title: 'What is sensitive never reaches the model raw',
    desc: 'Personal data is masked before any AI processes it — and there are guards against attempts to manipulate the model.',
    how: 'PII masking (4 strategies) before the LLM + content safety against prompt-injection and jailbreak.',
    trail: 'securityEngine · spec-content-safety',
  },
  {
    area: 'Audit',
    title: 'Every action recorded, tamper-evident',
    desc: 'Who did what, when — in a trail you cannot edit without leaving a mark. Verifiable by you, not just on our word.',
    how: 'Dual-token authentication + RBAC; SHA-256 append-only trail — tampering is cryptographically detectable and verifiable per tenant.',
    trail: 'securityEngine · auditTrailEngine · spec-hash-chain',
  },
];

// Governance in the path of every action (rules 3 and 4). Honest status per item.
const GOVERNANCE: { title: string; desc: string; badge: 'b-impl' | 'b-parc' }[] = [
  {
    title: 'Human in the loop (HITL)',
    desc: 'Tiered approvals: nothing critical executes without the OK of whoever is in charge. The AI proposes; the decision that matters stays with you.',
    badge: 'b-impl',
  },
  {
    title: 'Policies and roles',
    desc: 'RBAC and policies decide who can do what — enforced by the platform at every step, not trusted to each app’s code.',
    badge: 'b-impl',
  },
  {
    title: 'Quotas and usage limits',
    desc: 'Usage metered and gated per tenant, with atomic reservation. No silent overruns, no consumption surprises.',
    badge: 'b-impl',
  },
  {
    title: 'Consent and privacy',
    desc: 'LGPD/GDPR consent lifecycle with a trail — legal basis recorded, not presumed.',
    badge: 'b-parc',
  },
];

export default function SecurityEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/seguranca" />

      {/* HERO — governance as the product, not footer compliance */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Trust &amp; Governance</p>
          <h1 className="fx-serif fx-h1">
            Governance isn&rsquo;t a feature. It&rsquo;s the <span className="fx-em">product</span>.
          </h1>
          <p className="fx-lead">
            The processes most worth delegating — billing, support, finance — are the ones that
            scare you most. What lets you hand them over without fear isn&rsquo;t a security
            promise in the footer: it&rsquo;s <strong>five rules in the path of every action</strong>{' '}
            and engineering you can verify. This page shows what backs each one — and is honest
            about what is still missing.
          </p>
          <div className="fx-cta-row" style={{ marginTop: 26 }}>
            <a className="fx-btn fx-btn-primary" href="#rules" data-track="en-security-rules">
              See the five rules
            </a>
            <a
              className="fx-btn fx-btn-ghost"
              href={PLATFORM_CONTACT_EN}
              data-track="en-security-contact-cta"
            >
              {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-reassure">
            <span>Built in, in every app</span>
            <span>Verifiable, not on our word</span>
            <span>Honest about what&rsquo;s missing</span>
          </div>
        </div>
      </header>

      {/* THE THESIS — why governance is the product */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The thesis</p>
          <h2 className="fx-serif fx-h2">
            Real delegation takes more than a <span className="fx-em">smart</span> AI.
          </h2>
          <p className="fx-body">
            A non-technical person only hands over an entire operation — the money, the customer,
            the paperwork — when they trust that a mistake won&rsquo;t hurt and that they stay in
            control. That is why, here, governance is not a compliance annex or a screen nobody
            opens: <strong>it sits in the path of every action</strong> your app executes.
          </p>
          <p className="fx-body">
            Taking governance out of the footer and putting it at the center is what turns
            &ldquo;I tried an AI&rdquo; into &ldquo;I delegate and it operates.&rdquo; It is what
            opens the most sensitive domains — finance, health, legal — to people without an IT
            team.
          </p>
          <p className="fx-quote fx-mt-s">
            Governance isn&rsquo;t the footer of the product — it&rsquo;s what lets you delegate.
            That is why it is the product.
          </p>
        </div>
      </section>

      {/* THE FIVE TRUST RULES — the frame of the page */}
      <section className="fx-sec fx-sec-alt" id="rules">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">The five trust rules</p>
            <h2 className="fx-serif fx-h2">
              What makes an operation trustworthy — in five rules
            </h2>
            <p className="fx-lead">
              Not audit jargon. These are the conditions for someone who isn&rsquo;t technical to
              truly delegate — and every product decision in the platform answers to them.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {RULES.map((r, i) => (
              <div className="fx-card" key={r.title}>
                <span className="fx-ico">{r.icon}</span>
                <span className="fx-label">Rule 0{i + 1}</span>
                <h3>{r.title}</h3>
                <p>
                  <strong>{r.desc}.</strong> {r.more}
                </p>
              </div>
            ))}
          </div>
          <div className="fx-note fx-mt">
            The five aren&rsquo;t a module you switch on. They come{' '}
            <strong>built into every Fluxomind app</strong>, from day one — the way apps are built
            (rules 1 and 2), governance in the path of every action (3 and 4), and the
            isolation-and-proof engineering (5).
          </div>
        </div>
      </section>

      {/* RULE 5 — data protection: the 4 verifiable guarantees */}
      <section className="fx-sec" id="guarantees">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Enterprise-grade · data protection</p>
            <h2 className="fx-serif fx-h2">What protects your data — and how to prove it</h2>
            <p className="fx-lead">
              Four foundational protections, active from day one. Each with the engineering trail
              that backs it — for you to verify, not to believe.
            </p>
          </div>
          <div className="fx-mt">
            {GUARANTEES.map((g) => (
              <div className="fx-feat" key={g.area}>
                <span className="fx-ck">{CHECK}</span>
                <div>
                  <div style={HEAD_ROW}>
                    <h4>{g.title}</h4>
                    <Badge kind="b-impl" />
                  </div>
                  <p>{g.desc}</p>
                  <div className="fx-src">
                    {g.how} · <code>{g.trail}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES 3 and 4 — governance in the path of every action */}
      <section className="fx-sec fx-sec-alt" id="governance">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Enterprise-grade · governance</p>
            <h2 className="fx-serif fx-h2">The AI truly executes — inside your rules</h2>
            <p className="fx-lead">
              The difference between an AI that helps and one that scares is who decides.
              Governance isn&rsquo;t a separate dashboard: it sits in the path of every action — so
              that mistakes don&rsquo;t hurt and, in sensitive cases, a person decides.
            </p>
          </div>
          <div className="fx-mt">
            {GOVERNANCE.map((it) => (
              <div className="fx-feat" key={it.title}>
                <span className="fx-ck">{CHECK}</span>
                <div>
                  <div style={HEAD_ROW}>
                    <h4>{it.title}</h4>
                    <Badge kind={it.badge} />
                  </div>
                  <p>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="fx-note fx-mt">
            <strong>We mark it partial on purpose:</strong> advanced governance — broad fail-closed
            and more autonomy patterns — is still maturing. We&rsquo;d rather tell you the fact,
            the gap and the bet without blurring the three.
          </div>
        </div>
      </section>

      {/* COMPLIANCE, HONESTLY */}
      <section className="fx-sec" id="compliance">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Compliance, honestly</p>
            <h2 className="fx-serif fx-h2">What is ready — and what is not yet</h2>
          </div>
          <div className="fx-note fx-mt" style={{ maxWidth: '68ch' }}>
            The platform has automated scanners for SOC2 controls (CC6/CC7/CC8) and LGPD/GDPR
            (Art. 17/20/30/32) — verification by code, not a manual checklist; today they run on
            demand, with scheduled continuous execution on the roadmap.{' '}
            <strong>
              We do not yet have a formal third-party SOC2 certification or a completed external
              pen-test
            </strong>{' '}
            — they are the next step, not a promise fulfilled. What we claim above is what can be
            verified in the architecture today.
          </div>
          <div className="fx-tablewrap">
            <table className="fx-table">
              <thead>
                <tr>
                  <th>Front</th>
                  <th>What we already deliver</th>
                  <th>Status</th>
                  <th>Next step</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Data protection</strong>
                  </td>
                  <td>Multi-tenant isolation, BYOK, PII masking, hash-chain audit</td>
                  <td>
                    <Badge kind="b-impl" />
                  </td>
                  <td>External pen-test</td>
                </tr>
                <tr>
                  <td>
                    <strong>Governance</strong>
                  </td>
                  <td>HITL, policies/RBAC, quotas/entitlements, consent</td>
                  <td>
                    <Badge kind="b-parc" />
                  </td>
                  <td>Broad fail-closed + more autonomy patterns</td>
                </tr>
                <tr>
                  <td>
                    <strong>Compliance</strong>
                  </td>
                  <td>Automated SOC2/LGPD scanners (on demand)</td>
                  <td>
                    <Badge kind="b-parc" />
                  </td>
                  <td>Continuous execution + SOC2 Type II certification (external audit)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CTA — to the beta */}
      <section className="fx-sec fx-offer" id="evaluate">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            The next step
          </p>
          <h2 className="fx-serif fx-h2">Delegate what matters most — with control on your side.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0' }}>
            Join the private beta and tell us the operation you want off your plate. For those who
            need to evaluate in depth, we provide an isolated environment and an architecture
            session with engineering — where every guarantee above is demonstrated, not asserted.
          </p>
          <div className="fx-cta-row" style={{ marginTop: 26 }}>
            <Link className="fx-btn fx-btn-primary" href="/en#start" data-track="en-security-beta">
              Join the beta
            </Link>
            <a
              className="fx-btn fx-btn-ghost"
              href={PLATFORM_CONTACT_EN}
              data-track="en-security-contact-cta"
            >
              {CTA_EN.contact}
            </a>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/en/platform#security">See the architecture inside &rarr;</Link>
          </div>
          <div className="fx-scar">Guided beta · no card · deep evaluation on demand</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
