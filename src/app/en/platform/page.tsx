import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import { PHASE_EN, CTA_EN } from '@/lib/messages-en';

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Proof of execution: a built multi-tenant platform — 39 engines in 10 layers, governed and verifiable by evidence. Architecture, performance, quality, governance and security, with the real status of each.',
  alternates: {
    canonical: '/en/platform',
    languages: { 'pt-BR': '/plataforma', en: '/en/platform' },
  },
};

// Espelho EN de /plataforma (ADR-0006) na identidade dark editorial-tech.
// Mesmo arco, mesmas seções e classes fx da página PT — cada claim técnico
// e cada badge de maturidade preservados; nada promove "Partial" a
// "Implemented".
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const ICON_CK = (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5l5 5 11-12" />
  </svg>
);
const ICON_BUILD = (
  <svg {...ICON_PROPS}>
    <path d="M12 2l9 5v10l-9 5-9-5V7z" />
    <path d="M12 2v20M3 7l9 5 9-5" />
  </svg>
);
const ICON_LOOP = (
  <svg {...ICON_PROPS}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
    <path d="M20 3.5V8h-4.5" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
    <path d="M4 20.5V16h4.5" />
  </svg>
);
const ICON_ATLAS = (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M12 7v3M12 10l-5.3 6M12 10l5.3 6" />
  </svg>
);
const ICON_STORE = (
  <svg {...ICON_PROPS}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const ICON_CHAT = (
  <svg {...ICON_PROPS}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
  </svg>
);
const ICON_PLUG = (
  <svg {...ICON_PROPS}>
    <path d="M9 2v5M15 2v5M7 7h10v3a5 5 0 0 1-10 0V7zM12 15v7" />
  </svg>
);

// Platform layers (verifiable in src/engine/). Role in owner language;
// engine names in mono. Nothing here is an invented number.
const LAYERS = [
  { name: 'Core AI', role: 'the reasoning of the app', engines: 'agentStudio · model · prompt · memory · rag' },
  { name: 'Tooling', role: 'the hands that act in the world', engines: 'tool · mcp' },
  { name: 'Experience', role: 'the screens and the catalog', engines: 'app · appStore · dataView · speech' },
  { name: 'Automation', role: 'what runs without you', engines: 'workflow · code' },
  { name: 'Governance', role: 'the limits and the authority', engines: 'security · policy · quota · auditTrail' },
  { name: 'Data', role: 'the memory of the business', engines: 'atlas · data · metadata · cache · queue · file' },
  { name: 'Monitoring', role: 'the eyes on the operation', engines: 'monitoring' },
  { name: 'CI/CD AIOps', role: 'the governed deploy', engines: 'deployment · operations · validation' },
  { name: 'Ecosystem', role: 'the connections outward', engines: 'api · plugin' },
  { name: 'Learning', role: 'the evolution over time', engines: 'feedback · fineTune · eval · evolution' },
];

export default function PlatformEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/plataforma" />

      {/* 01 — HERO: the invisible platform */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <span className="fx-pill">
            <span className="fx-lz" /> Private beta · proof of execution
          </span>
          <p className="fx-eyebrow">The platform</p>
          <h1 className="fx-serif fx-h1">
            A good platform <span className="fx-em">disappears</span>. The work stays.
          </h1>
          <p className="fx-lead">
            Underneath the app that answers on your WhatsApp runs a built multi-tenant platform —{' '}
            <strong>39 engines across 10 layers</strong>, governed and verifiable by evidence. What
            the home page demonstrates, engineering delivers. This is the page that pops the hood:
            the substance, with the honest status of each part.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/en#start" data-track="en-platform-beta">
              Enter the beta
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/en/demo" data-track="en-platform-demo">
              See it operating →
            </Link>
          </div>
          <div className="fx-reassure">
            <span>Proof by evidence, not by slides</span>
            <span>Real status of every capability</span>
            <span>Governance already in production</span>
          </div>
        </div>
      </header>

      {/* 02 — STAGE HONESTY: the key to the badges */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Stage honesty</p>
          <h2 className="fx-serif fx-h2">
            We prove what exists — and say what <span className="fx-em">doesn&rsquo;t yet</span>.
          </h2>
          <p className="fx-body">
            Every claim on this page carries a badge. That&rsquo;s how you separate fact from bet
            without relying on our goodwill — proof, not promise.
          </p>
          <div style={{ display: 'flex', gap: '10px 14px', flexWrap: 'wrap', margin: '20px 0 4px' }}>
            <span className="fx-badge b-impl"><span className="fx-d" /> Already in production</span>
            <span className="fx-badge b-parc"><span className="fx-d" /> Under construction</span>
            <span className="fx-badge b-road"><span className="fx-d" /> Vision</span>
          </div>
          <p className="fx-body fx-mt">
            Where we honestly stand right now: {PHASE_EN.next}
          </p>
        </div>
      </section>

      {/* 03 — AI-FIRST: AI is the execution flow */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">AI-first</p>
            <h2 className="fx-serif fx-h2">
              AI is the execution flow — not a chatbot bolted on.
            </h2>
            <p className="fx-body">
              In traditional software, code calls the LLM when it needs to. Here it&rsquo;s the
              inverse: an orchestrator receives the intent, consults memory and knowledge, plans and
              invokes tools — all governed by policy and visible as a state graph, auditable step by
              step.
            </p>
            <span className="fx-badge b-parc">
              <span className="fx-d" /> Partial — multi-worker journey in hardening
            </span>
          </div>

          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>Traditional software</h4>
              <ul>
                <li>Code defines a fixed path</li>
                <li>Calls the LLM as an add-on</li>
                <li>The response returns to the code</li>
              </ul>
            </div>
            <div className="fx-ftarrow">→</div>
            <div className="fx-ft to">
              <h4>Fluxomind — AI-first</h4>
              <ul>
                <li>The orchestrator receives the intent</li>
                <li>Consults memory + knowledge and plans</li>
                <li>Invokes tools under policy, in a state graph</li>
                <li>Every step governed and auditable</li>
              </ul>
            </div>
          </div>

          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Multi-provider, no lock-in</h4>
                <p>
                  Routing by cost/quality profile, automatic fallback across providers and cost
                  measured per call.
                </p>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Declarative composition</h4>
                <p>
                  The agent composes existing primitives — it does not generate loose code.
                  Execution is visible and reproducible.
                </p>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Governed self-building</h4>
                <p>
                  Extends the tenant&rsquo;s model via governed tools (create-only), with the
                  system&rsquo;s base tables locked — dogfooding, not self-modification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — ARCHITECTURE: 39 engines in 10 layers */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Architecture</p>
            <h2 className="fx-serif fx-h2">
              39 engines, with machine-enforced boundaries.
            </h2>
            <p className="fx-body">
              All organized into 10 layers, verifiable in{' '}
              <span className="fx-mono">src/engine/</span>. Every engine is an isolated module with
              strict boundaries — an improper import between internals{' '}
              <strong>is blocked by the boundary verifier</strong>, which runs on demand and in the
              deploy pipeline. Evolution by layer, no breaking changes.
            </p>
            <span className="fx-badge b-impl">
              <span className="fx-d" /> Machine-verified, in the deploy pipeline
            </span>
          </div>
          <div className="fx-grid2 fx-mt">
            {LAYERS.map((l) => (
              <div className="fx-card" key={l.name}>
                <span className="fx-label">{l.name}</span>
                <h3>{l.role}</h3>
                <code className="fx-code">{l.engines}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — FLYWHEEL + ATLAS: smarter the more it runs */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Flywheel + Atlas</p>
            <h2 className="fx-serif fx-h2">Gets smarter the more it is used.</h2>
            <p className="fx-body">
              The platform doesn&rsquo;t deliver value once — it spins. Two coupled loops over{' '}
              <strong>a single semantic brain</strong>: intent becomes an app, the app generates
              activity, the activity returns the next action — and each turn starts from a higher
              point.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            <div className="fx-card">
              <span className="fx-ico">{ICON_BUILD}</span>
              <span className="fx-label">Self-building loop</span>
              <h3>Intent becomes an app</h3>
              <p>
                You describe the intent; the platform creates object, fields and screens — with no
                engineering cycle in the way.
              </p>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_LOOP}</span>
              <span className="fx-label">Insight loop</span>
              <h3>Operating returns the next action</h3>
              <p>
                Operating generates real data; the platform reads the activity and suggests the next
                step — more precise than the last. The full turn is what dogfooding proves.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Under construction
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_ATLAS}</span>
              <span className="fx-label">Atlas</span>
              <h3>The semantic brain</h3>
              <p>
                Classifies the business entities (embedding + LLM, aligned to Schema.org) — no
                manual ontology project.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Under construction
              </span>
            </div>
          </div>
          <p className="fx-fineprint fx-narrow fx-mt">
            The thesis: the more you use it, the more Atlas knows — and the cheaper it gets to
            deliver the next thing. That&rsquo;s what separates a flywheel product from a tool. The
            full turn is what dogfooding will prove.
          </p>
        </div>
      </section>

      {/* 06 — PERFORMANCE & SCALE */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Performance &amp; scale</p>
            <h2 className="fx-serif fx-h2">Designed for scale — observable and resilient.</h2>
            <p className="fx-body">
              The scale capabilities are in the architecture. Production numbers arrive with the
              pilots.
            </p>
            <span className="fx-badge b-parc">
              <span className="fx-d" /> Partial — design capability
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Observability and SLOs</h4>
                <p>
                  Prometheus metrics, SLOs per tier, anomaly detection (z-score/IQR) and cost trace
                  per execution.
                </p>
                <div className="fx-src">trail: <code>monitoringEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Asynchronous and resilient</h4>
                <p>
                  Distributed queue with retries, backoff and DLQ; layered cache; connection pools
                  and slow-query detection.
                </p>
                <div className="fx-src">
                  trail: <code>queueEngine</code> · <code>cacheEngine</code> · <code>dataEngine</code>
                </div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Continuity</h4>
                <p>
                  Multi-region DR, auto-scaling and self-healing (designed), tier-based backup with
                  RPO/RTO and distributed tracing (OpenTelemetry).
                </p>
                <div className="fx-src">trail: <code>operationsEngine</code></div>
              </div>
            </div>
          </div>
          <div className="fx-note fx-narrow fx-mt-s">
            <strong>Honesty:</strong> &ldquo;self-healing&rdquo; and DR are design capabilities —
            still without measured scale numbers, because production is a brand-new platform. Load
            benchmarks come with the first pilots.
          </div>
        </div>
      </section>

      {/* 07 — QUALITY & CORRECTNESS */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Quality &amp; correctness</p>
            <h2 className="fx-serif fx-h2">Correctness verified by machine, not by trust.</h2>
            <p className="fx-body">
              The principle is trust earned by evidence: the platform verifies itself by code —
              suites that prove isolation, integrity and contracts, not a checklist.
            </p>
            <span className="fx-badge b-impl">
              <span className="fx-d" /> Implemented
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Quality invariants, machine-verified</h4>
                <p>
                  Isolation (cross-tenant probes + RLS via pgTAP), integrity, contracts, resilience,
                  compliance and evolvability. Boundaries, tests and the eval gate run on demand and
                  in the deploy pipeline; the isolation suite in a dedicated workflow.
                </p>
                <div className="fx-src">trail: <code>validationEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>AI quality as a gate</h4>
                <p>
                  LLM-as-Judge and property-based tests block regressions before a flow is promoted.
                </p>
                <div className="fx-src">trail: <code>evalEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Contracts and tests</h4>
                <p>
                  API contracts (OpenAPI) and event contracts (AsyncAPI) verified; tests co-located
                  with the code.
                </p>
                <div className="fx-src">trail: <code>validationEngine</code> · co-located tests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — GOVERNANCE */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Governance</p>
            <h2 className="fx-serif fx-h2">
              Governance isn&rsquo;t a feature — it&rsquo;s the product.
            </h2>
            <p className="fx-body">
              Limits in the architecture, not in each app&rsquo;s code: declarative policy the
              runtime enforces across the platform, with a person in the loop when it matters.
            </p>
            <span className="fx-badge b-parc">
              <span className="fx-d" /> Partial — core implemented; self-service on the roadmap
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Declarative policies + HITL</h4>
                <p>
                  Versioned guardrails (checksum), evaluated with cache and explain; human approval
                  (human-in-the-loop) on sensitive actions.
                </p>
                <div className="fx-src">trail: <code>policyEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Quotas and entitlements</h4>
                <p>
                  Rate limiting, usage tracking and enforcement per tenant; atomic reservation and
                  approved overrides.
                </p>
                <div className="fx-src">trail: <code>quotaEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Consent and audit</h4>
                <p>
                  GDPR/LGPD consent lifecycle and an immutable hash-chain audit trail (see
                  Security).
                </p>
                <div className="fx-src">
                  trail: <code>securityEngine</code> · <code>auditTrailEngine</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — SECURITY */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Security</p>
            <h2 className="fx-serif fx-h2">Security and privacy in the foundation.</h2>
            <p className="fx-body">
              Strong multi-tenancy, encryption and masking — from day one, with nothing for the
              customer to configure. Enterprise-grade capability, delivered to people who aren&rsquo;t
              technical.
            </p>
            <span className="fx-badge b-impl">
              <span className="fx-d" /> Implemented
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>BYOK — the key is the customer&rsquo;s</h4>
                <p>
                  Bring your own KMS key (AWS/GCP/Azure). Crypto-shredding: revoke the key and the
                  data becomes unreadable immediately — independently of the platform.
                </p>
                <div className="fx-src">trail: <code>securityEngine · spec-byok</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Multi-tenant isolation</h4>
                <p>
                  Dedicated schema per customer + RLS as backstop. The{' '}
                  <span className="fx-mono">tenantId</span> never comes from the payload — it derives
                  from the request context.
                </p>
                <div className="fx-src">
                  trail: <code>securityEngine</code> · <code>dataEngine</code>
                </div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>PII masking and content safety</h4>
                <p>
                  Sensitive data masked (4 strategies) before reaching the LLM; guards against
                  prompt-injection and jailbreak.
                </p>
                <div className="fx-src">trail: <code>securityEngine · spec-content-safety</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Auth + hash-chain audit</h4>
                <p>
                  Dual token + RBAC; SHA-256 append-only trail — tampering is cryptographically
                  detectable and verifiable per tenant.
                </p>
                <div className="fx-src">
                  trail: <code>securityEngine</code> · <code>auditTrailEngine · spec-hash-chain</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — DISTRIBUTION & CONNECTIONS */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Distribution &amp; connections</p>
            <h2 className="fx-serif fx-h2">Operates where the business already lives — and distributes the method.</h2>
            <p className="fx-body">
              The platform connects to what you already use and operates through the channel where
              the business already lives. The App Store engine exists in the Experience layer — the
              motor ready for the catalog of self-operating apps the vision describes.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            <div className="fx-card">
              <span className="fx-ico">{ICON_CHAT}</span>
              <span className="fx-label">Channels</span>
              <h3>First-class WhatsApp</h3>
              <p>
                Operation over WhatsApp at the platform level — a governed channel, not a personal
                number tied to one app. Voice and text on the same trail.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Under construction
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_PLUG}</span>
              <span className="fx-label">Connectors</span>
              <h3>Integrates what you already have</h3>
              <p>
                Email, API, MCP and plugins — the app absorbs spreadsheets and systems and hands
                back a single, governed operation, without dropping your way of working.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Under construction
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_STORE}</span>
              <span className="fx-label">App Store engine</span>
              <h3>From method to catalog</h3>
              <p>
                Whoever masters a problem packages the method; your company installs it and adopts
                it already running. The engine exists; the public catalog is the vision.
              </p>
              <span className="fx-badge b-road" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Vision
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — MATURITY & COMPLIANCE */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Maturity &amp; compliance</p>
            <h2 className="fx-serif fx-h2">What is ready, honestly.</h2>
            <p className="fx-body">
              The platform has automated scanners for SOC2 controls (CC6/CC7/CC8) and GDPR
              (Art. 17/20/30/32) — verification by code, not a manual checklist. Today they run on
              demand; scheduled continuous execution is on the roadmap.
            </p>
          </div>
          <div className="fx-tablewrap">
            <table className="fx-table">
              <thead>
                <tr>
                  <th>Pillar</th>
                  <th>What we already deliver</th>
                  <th>Status</th>
                  <th>Next step</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Security</strong></td>
                  <td>BYOK, PII masking, RBAC, hash-chain audit</td>
                  <td>
                    <span className="fx-badge b-impl"><span className="fx-d" /> Implemented</span>
                  </td>
                  <td>Broad fail-closed + external pen-test</td>
                </tr>
                <tr>
                  <td><strong>Quality</strong></td>
                  <td>Quality invariants, LLM-as-Judge, contracts</td>
                  <td>
                    <span className="fx-badge b-impl"><span className="fx-d" /> Implemented</span>
                  </td>
                  <td>Load coverage at scale</td>
                </tr>
                <tr>
                  <td><strong>AI-first</strong></td>
                  <td>Governed multi-agent orchestration; multi-provider with fallback and measured cost</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Partial</span>
                  </td>
                  <td>Multi-worker journey in hardening; more autonomy patterns</td>
                </tr>
                <tr>
                  <td><strong>Governance</strong></td>
                  <td>Policies + HITL, quotas/entitlements, consent</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Partial</span>
                  </td>
                  <td>Billing/payment + self-service governance panel</td>
                </tr>
                <tr>
                  <td><strong>Performance</strong></td>
                  <td>SLOs, cost trace, multi-region DR, self-healing (design)</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Partial</span>
                  </td>
                  <td>Production scale numbers (post-pilot)</td>
                </tr>
                <tr>
                  <td><strong>Compliance</strong></td>
                  <td>Automated SOC2/GDPR scanners (on demand)</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Partial</span>
                  </td>
                  <td>Continuous execution + SOC2 Type II certification (external audit)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fx-note fx-mt-s">
            <strong>Transparency:</strong> the controls are already scanned by the platform, but the
            formal SOC2 certification (third-party audit) and the scale numbers are on the roadmap —
            we are a new platform. We prefer proving to promising.
          </div>
        </div>
      </section>

      {/* 12 — CTA: into the beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">The next step</p>
          <h2 className="fx-serif fx-h2">Pop the hood with us.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '56ch' }}>
            The platform is in private beta. Join the list to operate with the team right alongside
            you — and, if you&rsquo;re technical, ask for the data room (arch docs, specs, evidence)
            and an architecture session.
          </p>
          <div className="fx-cta-row fx-mt">
            <Link className="fx-btn fx-btn-primary" href="/en#start" data-track="en-platform-beta-cta">
              Enter the beta
            </Link>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-platform-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-scar">Team alongside you · no card to start · proof, not promise</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
