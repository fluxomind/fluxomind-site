import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import { SIGNATURE_EN, PHASE_EN, CTA_EN } from '@/lib/messages-en';

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Proof of execution: a built multi-tenant platform — 39 engines in 10 layers, governed and verifiable by evidence. Architecture, performance, quality, governance and security, with the real status of each.',
  alternates: {
    canonical: '/en/platform',
    languages: { 'pt-BR': '/plataforma', en: '/en/platform' },
  },
};

// Espelho EN de /plataforma (ADR-0006). Página fact-checked (PR #26): a
// tradução preserva cada claim técnico e cada badge de maturidade — nada
// promove "Parcial" a "Implementado".
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const ICON_PERF = (
  <svg {...ICON_PROPS}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);
const ICON_QUAL = (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);
const ICON_GOV = (
  <svg {...ICON_PROPS}>
    <path d="M12 3.5v16M6 19.5h12M5 7h14M12 4.2a1.4 1.4 0 1 0 0 .01M5 7l-2.5 5h5L5 7zM19 7l-2.5 5h5L19 7z" />
  </svg>
);
const ICON_SEC = (
  <svg {...ICON_PROPS}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function PlatformEn() {
  return (
    <div className="page-tech" lang="en">
      <SiteHeaderEn ptHref="/plataforma" />

      <header className="hero">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            {SIGNATURE_EN}
          </div>
          <div>
            <span className="pill">For technical teams · CTO, Head of Platform, Security</span>
          </div>
          <h1>
            What the home page demonstrates, <span className="g">engineering sustains.</span>
          </h1>
          <p className="hsub">
            Proof of execution, not promise: the multi-tenant platform is built — 39 engines in
            10 layers, governed and <strong>verifiable by evidence</strong>, not by slide. This
            page is for those who will pop the hood: architecture, performance, quality,
            governance and security, with the real status of each.
          </p>
          <p className="hsub" style={{ marginTop: 14, fontSize: '16px' }}>
            <strong>The honest frontier:</strong> {PHASE_EN.next}
          </p>
          <div className="herocta">
            <a className="btn btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-platform-contact-cta">
              {CTA_EN.contact}
            </a>
            <a className="btn btn-ghost" href="#maturity">
              See what is ready
            </a>
          </div>
          <div className="qnav">
            <a href="#aifirst">① AI-first</a>
            <a href="#architecture">② Architecture</a>
            <a href="#performance">③ Performance &amp; scale</a>
            <a href="#quality">④ Quality &amp; correctness</a>
            <a href="#governance">⑤ Governance</a>
            <a href="#security">⑥ Security</a>
            <a href="#maturity">⑦ Maturity &amp; compliance</a>
          </div>
        </div>
      </header>

      <section id="aifirst">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">① AI-first</div>
            <h2>AI is the execution flow — not a chatbot bolted on</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              In traditional systems, code calls the LLM when it needs to. Here, the inverse: an
              orchestrator decides what to do, consults memory and knowledge, plans and invokes
              tools — all governed by policy and visible as a state graph, auditable step by step.
            </p>
          </div>
          <div className="inv">
            <div className="invcard trad">
              <h4>Traditional software</h4>
              <div className="flow">
                <div className="fbox">Code defines the fixed path</div>
                <div className="farr">↓</div>
                <div className="fbox">Calls the LLM as an “accessory”</div>
                <div className="farr">↓</div>
                <div className="fbox">Response returns to the code</div>
              </div>
            </div>
            <div className="invcard fm">
              <h4>Fluxomind — AI-first</h4>
              <div className="flow">
                <div className="fbox">
                  <b>Orchestrator</b> receives the intent
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Consults <b>memory + knowledge</b>, plans
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Invokes <b>tools</b> under policy, in a state graph
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Every step <b>governed and auditable</b>
                </div>
              </div>
            </div>
          </div>
          <div className="aifeats">
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Multi-provider, no lock-in</h4>
                <p>
                  Routing by cost/quality profile, automatic fallback across providers and cost
                  measured per call.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Declarative composition</h4>
                <p>
                  The agent composes existing primitives — it does not generate loose code.
                  Execution is visible and reproducible.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Governed self-building</h4>
                <p>
                  Extends the tenant&apos;s model via governed tools (create-only), with the
                  system&apos;s base tables locked — dogfooding, not self-modification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flywheel">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">◆ Flywheel + Atlas</div>
            <h2>Gets smarter the more it is used</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              The platform doesn&apos;t deliver value once — it spins. Two coupled loops over{' '}
              <strong>a single semantic brain</strong>: intent becomes app, the app generates
              operation, the operation returns the next action, and each turn starts from a
              higher point.
            </p>
          </div>
          <div className="aifeats">
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Self-building loop</h4>
                <p>
                  You describe the intent; the platform creates object, fields and screens — with
                  no engineering cycle in the way.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Insight loop</h4>
                <p>
                  Operating generates real data; the platform reads the operation and returns the
                  next action — more precise than the last. <em>Maturity: the full turn is proven
                  with the dogfood — next chapter.</em>
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Atlas — the semantic brain</h4>
                <p>
                  Classifies business entities automatically (embedding + LLM, aligned to
                  Schema.org) — no manual ontology project.{' '}
                  <em>Maturity: under construction (Partial).</em>
                </p>
              </div>
            </div>
          </div>
          <p className="lead" style={{ marginTop: 18, opacity: 0.85 }}>
            The thesis: the more you use it, the more Atlas knows — and the cheaper it gets to
            deliver the next thing. That is what separates a flywheel product from a tool: the
            tool delivers the same on the thousandth run; the flywheel delivers more, for less.
            The full turn is what the dogfood will prove.
          </p>
        </div>
      </section>

      <section id="architecture">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">② Architecture</div>
            <h2>Modular engines, with machine-enforced boundaries</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              39 engines organized in 10 layers (verifiable in{' '}
              <span className="mono">src/engine/</span>) — below, the layers with representative
              engines of each. Every engine is an isolated module with strict boundaries — an
              improper import between internals <strong>is blocked by the boundary
              verifier</strong>, which runs in the deploy pipeline. Evolution by layer, without
              rupture.
            </p>
          </div>
          <div className="layers">
            <div className="lchip">
              <b>Core AI</b> ·{' '}
              <span className="mono">agentStudio · model · prompt · memory · rag</span>
            </div>
            <div className="lchip">
              <b>Tooling</b> · <span className="mono">tool · mcp</span>
            </div>
            <div className="lchip">
              <b>Experience</b> · <span className="mono">app · appStore · dataView · speech</span>
            </div>
            <div className="lchip">
              <b>Automation</b> · <span className="mono">workflow · code</span>
            </div>
            <div className="lchip">
              <b>Governance</b> · <span className="mono">security · policy · quota · auditTrail</span>
            </div>
            <div className="lchip">
              <b>Data</b> · <span className="mono">atlas · data · metadata · cache · queue · file</span>
            </div>
            <div className="lchip">
              <b>Monitoring</b> · <span className="mono">monitoring</span>
            </div>
            <div className="lchip">
              <b>CI/CD AIOps</b> · <span className="mono">deployment · operations · validation</span>
            </div>
            <div className="lchip">
              <b>Ecosystem</b> · <span className="mono">api · plugin</span>
            </div>
            <div className="lchip">
              <b>Learning</b> · <span className="mono">feedback · fineTune · eval · evolution</span>
            </div>
          </div>
        </div>
      </section>

      <section id="performance">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_PERF}</div>
              <div className="kick">③ Performance &amp; scale</div>
              <h3>Designed for scale — observable and resilient</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                The scale capabilities are in the architecture. Production numbers arrive with
                the pilots.
              </p>
              <span className="badge b-parc" style={{ marginTop: 14 }}>
                <span className="d" /> Partial — design capability
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Observability and SLOs</h4>
                  <p>
                    Prometheus metrics, SLOs per tier, anomaly detection (z-score/IQR) and cost
                    trace per execution.
                  </p>
                  <div className="src">
                    trail: <code>monitoringEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Asynchronous and resilient</h4>
                  <p>
                    Distributed queue with retries, backoff and DLQ; layered cache; connection
                    pools and slow-query detection.
                  </p>
                  <div className="src">
                    trail: <code>queueEngine</code> · <code>cacheEngine</code> ·{' '}
                    <code>dataEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Continuity</h4>
                  <p>
                    Multi-region DR, auto-scaling and self-healing (designed), tier-based backup
                    with RPO/RTO, distributed tracing (OpenTelemetry).
                  </p>
                  <div className="src">
                    trail: <code>operationsEngine</code>
                  </div>
                </div>
              </div>
              <div className="honest">
                <b>Honesty:</b> “self-healing” and DR are design capabilities — still{' '}
                <strong>without measured scale numbers</strong>, because production is a new
                platform. Load benchmarks come with the first pilots.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quality">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_QUAL}</div>
              <div className="kick">④ Quality &amp; correctness</div>
              <h3>Correctness verified by machine, not by trust</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                The principle is “trust earned by evidence”: the platform verifies itself by
                code — suites that prove isolation, integrity and contracts, not a checklist.
              </p>
              <span className="badge b-impl" style={{ marginTop: 14 }}>
                <span className="d" /> Implemented
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Quality invariants, machine-verified</h4>
                  <p>
                    Isolation (cross-tenant probes + RLS via pgTAP), integrity, contracts,
                    resilience, compliance and evolvability. Boundaries, tests and the eval gate
                    run on demand and in the deploy pipeline; the isolation suite, in a dedicated
                    workflow.
                  </p>
                  <div className="src">
                    trail: <code>validationEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>AI quality as a gate</h4>
                  <p>
                    LLM-as-Judge and property-based tests block regressions before a flow is
                    promoted.
                  </p>
                  <div className="src">
                    trail: <code>evalEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Contracts and tests</h4>
                  <p>
                    API contracts (OpenAPI) and event contracts (AsyncAPI) verified; tests
                    co-located with the code.
                  </p>
                  <div className="src">
                    trail: <code>validationEngine</code> · co-located tests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="governance">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_GOV}</div>
              <div className="kick">⑤ Governance</div>
              <h3>Limits in the architecture — not in each app&apos;s code</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                Declarative policy the runtime enforces across the platform, with a person in
                the loop when it matters.
              </p>
              <span className="badge b-parc" style={{ marginTop: 14 }}>
                <span className="d" /> Partial — core implemented; self-service on the roadmap
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Declarative policies + HITL</h4>
                  <p>
                    Versioned guardrails (checksum), evaluated with cache and explain; human
                    approval (human-in-the-loop) on sensitive actions.
                  </p>
                  <div className="src">
                    trail: <code>policyEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Quotas and entitlements</h4>
                  <p>
                    Rate limiting, usage tracking and enforcement per tenant; atomic reservation
                    and approved overrides.
                  </p>
                  <div className="src">
                    trail: <code>quotaEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Consent and audit</h4>
                  <p>
                    GDPR/LGPD consent lifecycle and an immutable hash-chain audit trail (see
                    Security).
                  </p>
                  <div className="src">
                    trail: <code>securityEngine</code> · <code>auditTrailEngine</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="security">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_SEC}</div>
              <div className="kick">⑥ Security</div>
              <h3>Security and privacy in the foundation</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                Strong multi-tenancy, encryption and masking — from day one, with nothing for
                the customer to configure.
              </p>
              <span className="badge b-impl" style={{ marginTop: 14 }}>
                <span className="d" /> Implemented
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>BYOK — the customer&apos;s key</h4>
                  <p>
                    Bring your own KMS key (AWS/GCP/Azure). Crypto-shredding: revoke the key and
                    the data becomes unreadable immediately — independently of the platform.
                  </p>
                  <div className="src">
                    trail: <code>securityEngine · spec-byok</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Multi-tenant isolation</h4>
                  <p>
                    Dedicated schema per customer + RLS as backstop. The{' '}
                    <span className="mono">tenantId</span> never comes from the payload — it
                    derives from the request context.
                  </p>
                  <div className="src">
                    trail: <code>securityEngine</code> · <code>dataEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>PII masking and content safety</h4>
                  <p>
                    Sensitive data masked (4 strategies) before reaching the LLM; guards against
                    prompt-injection/jailbreak.
                  </p>
                  <div className="src">
                    trail: <code>securityEngine · spec-content-safety</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Auth + hash-chain audit</h4>
                  <p>
                    Dual token + RBAC; SHA-256 append-only trail — tampering is cryptographically
                    detectable and verifiable per tenant.
                  </p>
                  <div className="src">
                    trail: <code>securityEngine</code> · <code>auditTrailEngine · spec-hash-chain</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="maturity">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">⑦ Maturity &amp; compliance</div>
            <h2>What is ready, honestly</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              The platform has automated scanners for SOC2 controls (CC6/CC7/CC8) and GDPR
              (Art. 17/20/30/32) — verification by code, not a manual checklist. Today they run
              on demand; scheduled continuous execution is on the roadmap.
            </p>
          </div>
          <table>
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
                <td><b>Security</b></td>
                <td>BYOK, PII masking, RBAC, hash-chain audit</td>
                <td><span className="badge b-impl"><span className="d" />Implemented</span></td>
                <td className="next">Broad fail-closed + external pen-test</td>
              </tr>
              <tr>
                <td><b>Quality</b></td>
                <td>Quality invariants, LLM-as-Judge, contracts</td>
                <td><span className="badge b-impl"><span className="d" />Implemented</span></td>
                <td className="next">Load coverage at scale</td>
              </tr>
              <tr>
                <td><b>AI-first</b></td>
                <td>Governed multi-agent orchestration; multi-provider with fallback and measured cost</td>
                <td><span className="badge b-parc"><span className="d" />Partial</span></td>
                <td className="next">Multi-worker journey in hardening; more autonomy patterns</td>
              </tr>
              <tr>
                <td><b>Governance</b></td>
                <td>Policies+HITL, quotas/entitlements, consent</td>
                <td><span className="badge b-parc"><span className="d" />Partial</span></td>
                <td className="next">Billing/payment + self-service governance panel</td>
              </tr>
              <tr>
                <td><b>Performance</b></td>
                <td>SLOs, cost trace, multi-region DR, self-healing (design)</td>
                <td><span className="badge b-parc"><span className="d" />Partial</span></td>
                <td className="next">Production scale numbers (post-pilot)</td>
              </tr>
              <tr>
                <td><b>Compliance</b></td>
                <td>Automated SOC2/GDPR scanners (on demand)</td>
                <td><span className="badge b-parc"><span className="d" />Partial</span></td>
                <td className="next">Continuous execution + SOC2 Type II certification (external audit)</td>
              </tr>
            </tbody>
          </table>
          <div className="honest">
            <b>Transparency:</b> the controls are already scanned by the platform, but the{' '}
            <strong>formal SOC2 certification</strong> (third-party audit) and the{' '}
            <strong>scale numbers</strong> are on the roadmap — we are a new platform. We prefer
            proving to promising; this transparency is part of the evaluation.
          </div>
        </div>
      </section>

      <section className="cta" id="evaluate">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Technical evaluation
          </div>
          <h2>Pop the hood with us</h2>
          <p className="lead">
            We provide access to the technical data room (arch docs, specs, evidence), an
            architecture session with engineering and an isolated evaluation environment.
          </p>
          <div className="ctab">
            <a className="btn btn-primary" href={PLATFORM_CONTACT_EN} data-track="en-platform-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
