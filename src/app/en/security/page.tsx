import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { TRUST_RULES_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Security & Governance',
  description:
    'Why you can delegate without fear: the 5 trust rules — framing, coherence, fix + undo, human in the loop and isolated data — what backs each one in the platform today, and honesty about what is not ready yet.',
  alternates: {
    canonical: '/en/security',
    languages: { 'pt-BR': '/seguranca', en: '/en/security' },
  },
};

// Espelho EN de /seguranca (ADR-0006). Os fatos técnicos (GUARANTEES,
// compliance) são os mesmos do fact-check pt (PR #26) — tradução preserva
// os claims exatos, sem overclaim.
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const GUARANTEES = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="4" y="4" width="7" height="7" rx="1.4" />
        <rect x="13" y="13" width="7" height="7" rx="1.4" />
        <path d="M7.5 11v3.5a2 2 0 0 0 2 2H13" />
      </svg>
    ),
    area: 'Isolation',
    title: 'Your data stays yours only',
    desc: 'Each company has a dedicated space. No customer ever sees another’s data — not by accident, not on purpose.',
    how: 'Dedicated schema per customer + RLS as backstop. The tenantId derives from the request context, never from the payload.',
    trail: 'securityEngine · dataEngine',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="8" r="4" />
        <path d="M11 11l8 8M16 16l2-2M14 18l2-2" />
      </svg>
    ),
    area: 'BYOK',
    title: 'The key is yours — and so is the lock',
    desc: 'Customers who require it can bring their own encryption key. Revoke it and the data becomes unreadable immediately — with or without us in the loop.',
    how: 'BYOK with KMS (AWS/GCP/Azure) and crypto-shredding: revocation cuts access to the data, independently of the platform.',
    trail: 'securityEngine · spec-byok',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M4 4l16 16" />
      </svg>
    ),
    area: 'Privacy',
    title: 'What is sensitive never reaches the model in raw form',
    desc: 'Personal data is masked before any AI processes it — and there are guards against attempts to manipulate the model.',
    how: 'PII masking (4 strategies) before the LLM + content safety against prompt-injection and jailbreak.',
    trail: 'securityEngine · spec-content-safety',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    area: 'Audit',
    title: 'Every action recorded, tamper-evident',
    desc: 'Who did what, when — in a trail that cannot be edited without leaving a mark. Verifiable by you, not just on our word.',
    how: 'Dual-token authentication + RBAC; SHA-256 append-only trail — tampering is cryptographically detectable and verifiable per tenant.',
    trail: 'securityEngine · auditTrailEngine · spec-hash-chain',
  },
];

const GOVERNANCE = [
  {
    title: 'Human in the loop (HITL)',
    desc: 'Tiered approvals: nothing critical executes without the OK of whoever is in charge. The AI proposes; the decision that matters stays with you.',
  },
  {
    title: 'Policies and roles',
    desc: 'RBAC and policies decide who can do what — enforced by the platform at every step, not trusted to each app’s code.',
  },
  {
    title: 'Quotas and usage limits',
    desc: 'Usage metered and gated per tenant, with atomic reservation. No silent overruns, no consumption surprises.',
  },
  {
    title: 'Consent and privacy',
    desc: 'GDPR/LGPD consent lifecycle with a trail — legal basis recorded, not presumed.',
  },
];

export default function SecurityEn() {
  return (
    <div className="page-feats" lang="en">
      <SiteHeaderEn ptHref="/seguranca" />

      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Security &amp; Governance
            </div>
            <h1>
              Trust to delegate — <span className="g">even what is sensitive.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '62ch' }}>
              Finance, health, legal: the processes most worth delegating are the scariest ones.
              That is why security here is not a compliance afterthought — it is{' '}
              <strong>five rules in the path of every action</strong> your app executes. This
              page shows what backs each one, and is honest about what is not ready yet.
            </p>
            <div className="herocta" style={{ justifyContent: 'center', marginTop: 26 }}>
              <a className="btn btn-primary" href="#rules">
                See the five rules
              </a>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-security-contact-cta">
                {CTA_EN.contact}
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="sec" id="rules">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              The trust rules
            </div>
            <h2 style={{ color: '#fff' }}>What makes the operation trustworthy — in five rules</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Not audit jargon. These are the conditions for a non-technical person to delegate a
              real operation — and every product decision in the platform answers to them.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 34 }}>
            {TRUST_RULES_EN.map((r, i) => (
              <div className="secc" key={r.title} style={{ flex: '1 1 176px' }}>
                <div className="mono" style={{ color: 'var(--sky)', fontWeight: 700 }}>
                  0{i + 1}
                </div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 30 }}>
            <span className="scar">
              This is what opens the most sensitive domains — finance, health, legal.
            </span>
            <p style={{ color: '#7e8590', fontSize: 14, marginTop: 18, maxWidth: '58ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Below, what backs each rule: the way apps are built (rules 1 and 2), governance in
              the path of every action (3 and 4), and the isolation-and-proof engineering (5).
            </p>
          </div>
        </div>
      </section>

      <section id="building">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Rules 1 and 2 · Framing and coherence</div>
            <h2>You watch the app being born — and check before you trust</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch' }}>
              Your app doesn&apos;t arrive in a black box. It builds itself from your problem, in
              front of you — and every conclusion arrives with proof. Wrong framing shows up
              on the first screen, not months into a project.
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div className="feat">
              <span className="ck">✓</span>
              <div>
                <h4>Solves the right problem</h4>
                <p>
                  Building starts from the description of your problem, and you follow every
                  step on screen. What doesn&apos;t make sense for your business, you adjust by
                  talking — no tickets, no waiting for a sprint.
                </p>
              </div>
            </div>
            <div className="feat">
              <span className="ck">✓</span>
              <div>
                <h4>Makes sense, end to end</h4>
                <p>
                  Not a slice that pushes the rest off to later: the solution is born whole and
                  coherent, and the conclusion of each stage comes with the evidence for you to
                  check.
                </p>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/demo" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 15 }}>
              {CTA_EN.demo} → <span style={{ color: 'var(--slate)', fontWeight: 400 }}>({CTA_EN.demoNote})</span>
            </Link>
          </p>
        </div>
      </section>

      <section id="governance" style={{ background: 'var(--panel)' }}>
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Rules 3 and 4 · Mistakes don&apos;t hurt, a human takes over</div>
            <h2>The AI truly executes — inside your rules</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch' }}>
              The difference between an AI that helps and one that scares is who decides. Here,
              governance is not a separate dashboard: it sits in the path of every action your
              app executes — so that mistakes don&apos;t hurt and, in sensitive cases, a
              person decides.
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            {GOVERNANCE.map((it) => (
              <div className="feat" key={it.title}>
                <span className="ck">✓</span>
                <div>
                  <h4>{it.title}</h4>
                  <p>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <span className="badge b-parc">
              <span className="d" /> Partial — advanced governance maturing
            </span>
          </div>
        </div>
      </section>

      <section className="sec" id="guarantees">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Rule 5 · Your data, yours only
            </div>
            <h2 style={{ color: '#fff' }}>What protects your data — and how to prove it</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Four foundational protections, active from day one — each with the engineering trail
              that backs it.
            </p>
          </div>
          <div className="secg">
            {GUARANTEES.map((g) => (
              <div className="secc" key={g.area}>
                <div className="si">{g.icon}</div>
                <div
                  style={{
                    color: 'var(--sky)',
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '.04em',
                    textTransform: 'uppercase',
                    marginTop: 12,
                  }}
                >
                  {g.area}
                </div>
                <h4>{g.title}</h4>
                <p>{g.desc}</p>
                <p style={{ color: '#7e8590', marginTop: 9 }}>{g.how}</p>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6b7280',
                    marginTop: 9,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  trail: {g.trail}
                </div>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 30 }}>
            <span className="badge b-impl">
              <span className="d" /> Implemented — verifiable in the architecture today
            </span>
          </div>
        </div>
      </section>

      <section id="compliance">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Compliance, honestly</div>
            <h2>What is ready — and what is not yet</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '64ch' }}>
              The platform has automated scanners for SOC2 controls (CC6/CC7/CC8) and GDPR
              (Art. 17/20/30/32) — verification by code, not a manual checklist; today they run
              on demand, and scheduled continuous execution is on the roadmap.{' '}
              <strong>
                We do not yet have a formal third-party SOC2 certification or a completed external pen-test
              </strong>{' '}
              — they are the next step, not a promise fulfilled. What we claim above is what can
              be verified in the architecture today.
            </p>
          </div>
          <table style={{ marginTop: 24 }}>
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
                <td><b>Data protection</b></td>
                <td>Multi-tenant isolation, BYOK, PII masking, hash-chain audit</td>
                <td>
                  <span className="badge b-impl"><span className="d" /> Implemented</span>
                </td>
                <td className="next">External pen-test</td>
              </tr>
              <tr>
                <td><b>Governance</b></td>
                <td>HITL, policies/RBAC, quotas/entitlements, consent</td>
                <td>
                  <span className="badge b-parc"><span className="d" /> Partial</span>
                </td>
                <td className="next">Broad fail-closed + more autonomy patterns</td>
              </tr>
              <tr>
                <td><b>Compliance</b></td>
                <td>Automated SOC2/GDPR scanners (on demand)</td>
                <td>
                  <span className="badge b-parc"><span className="d" /> Partial</span>
                </td>
                <td className="next">Continuous execution + SOC2 Type II certification (external audit)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="offer" id="evaluate">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Deep evaluation
          </div>
          <h2>Going to pop the hood on security?</h2>
          <p className="lead">
            For those who need to evaluate in depth, we provide an isolated evaluation
            environment and an architecture session with engineering — where every guarantee
            above is demonstrated, not asserted.
          </p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_CONTACT_EN} data-track="en-security-contact-cta">
              {CTA_EN.contact}
            </a>
            <Link className="btn btn-ghost btn-lg" href="/en/what-it-does">
              What your app answers →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
