import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_CONTACT } from '@/lib/platform';
import { CTA, PHASE, SIGNATURE } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Plataforma',
  description:
    'A prova de execução: plataforma multi-tenant construída — 39 engines em 10 camadas, governada e verificável por evidência. Arquitetura, performance, qualidade, governança e segurança, com o status real de cada coisa.',
};

// Ícones SVG de traço dos pilares — alinhados ao resto do site (sem emoji colorido).
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

export default function Plataforma() {
  return (
    <div className="page-tech">
      {/* NAV */}
      <SiteHeader cta={{ label: CTA.demo, href: '/#demo' }} />

      {/* HERO — prova de execução */}
      <header className="hero">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            {SIGNATURE}
          </div>
          <div>
            <span className="pill">Para times técnicos · CTO, Head of Platform, Segurança</span>
          </div>
          <h1>
            O que a home demonstra, <span className="g">a engenharia sustenta.</span>
          </h1>
          <p className="hsub">
            Prova de execução, não promessa: a plataforma multi-tenant está construída — 39 engines
            em 10 camadas, governada e <strong>verificável por evidência</strong>, não por slide.
            Esta página é para quem vai abrir o capô: arquitetura, performance, qualidade,
            governança e segurança, com o status real de cada coisa.
          </p>
          <p className="hsub" style={{ marginTop: 14, fontSize: '16px' }}>
            <strong>A fronteira honesta:</strong> {PHASE.next.desc}
          </p>
          <div className="herocta">
            <a className="btn btn-primary" href={PLATFORM_CONTACT} data-track="plataforma-contact-cta">
              {CTA.contact}
            </a>
            <a className="btn btn-ghost" href="#maturidade">
              Ver o que está pronto
            </a>
          </div>
          <div className="qnav">
            <a href="#aifirst">① AI-first</a>
            <a href="#arquitetura">② Arquitetura</a>
            <a href="#performance">③ Performance &amp; escala</a>
            <a href="#qualidade">④ Qualidade &amp; correção</a>
            <a href="#governanca">⑤ Governança</a>
            <a href="#seguranca">⑥ Segurança</a>
            <a href="#maturidade">⑦ Maturidade &amp; compliance</a>
          </div>
        </div>
      </header>

      {/* AI FIRST */}
      <section id="aifirst">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">① AI-first</div>
            <h2>A IA é o fluxo de execução — não um chatbot pendurado</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Em sistemas tradicionais, o código chama o LLM quando precisa. Aqui, o inverso: um
              orquestrador decide o que fazer, consulta memória e conhecimento, planeja e aciona
              ferramentas — tudo governado por política e visível como um grafo de estado,
              auditável passo a passo.
            </p>
          </div>
          <div className="inv">
            <div className="invcard trad">
              <h4>Software tradicional</h4>
              <div className="flow">
                <div className="fbox">Código define o caminho fixo</div>
                <div className="farr">↓</div>
                <div className="fbox">Chama o LLM como um “acessório”</div>
                <div className="farr">↓</div>
                <div className="fbox">Resposta volta para o código</div>
              </div>
            </div>
            <div className="invcard fm">
              <h4>Fluxomind — AI-first</h4>
              <div className="flow">
                <div className="fbox">
                  <b>Orquestrador</b> recebe a intenção
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Consulta <b>memória + conhecimento</b>, planeja
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Aciona <b>ferramentas</b> sob política, em grafo de estado
                </div>
                <div className="farr">↓</div>
                <div className="fbox">
                  Cada passo <b>governado e auditável</b>
                </div>
              </div>
            </div>
          </div>
          <div className="aifeats">
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Multi-provider, sem lock-in</h4>
                <p>
                  Roteamento por perfil de custo/qualidade, fallback automático entre provedores e
                  custo medido por chamada.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Composição declarativa</h4>
                <p>
                  O agente compõe primitivas existentes — não gera código solto. Execução visível e
                  reproduzível.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Self-building governado</h4>
                <p>
                  Estende o modelo do tenant via ferramentas governadas (create-only), com as
                  tabelas-base do sistema bloqueadas — dogfooding, não auto-modificação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLYWHEEL + ATLAS */}
      <section id="flywheel">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">◆ Flywheel + Atlas</div>
            <h2>Fica mais inteligente quanto mais é usada</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              A plataforma não entrega valor uma vez — ela gira. Dois loops acoplados sobre{' '}
              <strong>um único cérebro semântico</strong>: a intenção vira app, o app gera operação,
              a operação devolve a próxima ação, e cada volta parte de um ponto mais alto.
            </p>
          </div>
          <div className="aifeats">
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Self-building loop</h4>
                <p>
                  Você descreve a intenção; a plataforma cria objeto, campos e telas — sem ciclo de
                  engenharia no caminho.
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Insight loop</h4>
                <p>
                  Operar gera dado real; a plataforma lê a operação e devolve a próxima ação — mais
                  precisa que a anterior. <em>Maturidade: a volta completa se prova com o dogfood —
                  próximo capítulo.</em>
                </p>
              </div>
            </div>
            <div className="feat nb">
              <span className="ck">→</span>
              <div>
                <h4>Atlas — o cérebro semântico</h4>
                <p>
                  Classifica as entidades do negócio automaticamente (embedding + LLM, alinhado a
                  Schema.org) — sem projeto manual de ontologia.{' '}
                  <em>Maturidade: em construção (Parcial).</em>
                </p>
              </div>
            </div>
          </div>
          <p className="lead" style={{ marginTop: 18, opacity: 0.85 }}>
            A tese: quanto mais você usa, mais o Atlas sabe — e mais barato fica entregar a próxima
            coisa. É o que separa um produto-flywheel de uma ferramenta: a ferramenta entrega o
            mesmo na milésima vez; o flywheel entrega mais, por menos. A volta completa é o que o
            dogfood vai provar.
          </p>
        </div>
      </section>

      {/* ARQUITETURA */}
      <section id="arquitetura">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">② Arquitetura</div>
            <h2>Engines modulares, com fronteiras garantidas por máquina</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              39 engines organizadas em 10 camadas (verificável em{' '}
              <span className="mono">src/engine/</span>) — abaixo, as camadas com engines
              representativas de cada uma. Cada engine é um módulo isolado com boundaries estritos —
              import indevido entre internals <strong>não passa no CI</strong>. Evolução por camada,
              sem ruptura.
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
              <b>Experience</b> · <span className="mono">app · dataView · speech</span>
            </div>
            <div className="lchip">
              <b>Automation</b> · <span className="mono">process · code</span>
            </div>
            <div className="lchip">
              <b>Governance</b> · <span className="mono">security · policy · quota · auditTrail</span>
            </div>
            <div className="lchip">
              <b>Data</b> · <span className="mono">data · metadata · cache · queue · file</span>
            </div>
            <div className="lchip">
              <b>Monitoring</b> · <span className="mono">monitoring</span>
            </div>
            <div className="lchip">
              <b>CI/CD AIOps</b> · <span className="mono">deployment · operations · validation</span>
            </div>
            <div className="lchip">
              <b>Ecosystem</b> · <span className="mono">api · plugin · appStore</span>
            </div>
            <div className="lchip">
              <b>Learning</b> · <span className="mono">feedback · fineTune · eval · evolution</span>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_PERF}</div>
              <div className="kick">③ Performance &amp; escala</div>
              <h3>Pensada para escala — observável e resiliente</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                As capacidades de escala estão na arquitetura. Os números de produção chegam com os
                pilotos.
              </p>
              <span className="badge b-parc" style={{ marginTop: 14 }}>
                <span className="d" /> Parcial — capacidade de design
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Observabilidade e SLO</h4>
                  <p>
                    Métricas Prometheus, SLO por tier, detecção de anomalia (z-score/IQR) e cost
                    trace por execução.
                  </p>
                  <div className="src">
                    trilha: <code>monitoringEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Assíncrono e resiliente</h4>
                  <p>
                    Fila distribuída com retries, backoff e DLQ; cache em camadas; pools de conexão
                    e detecção de query lenta.
                  </p>
                  <div className="src">
                    trilha: <code>queueEngine</code> · <code>cacheEngine</code> ·{' '}
                    <code>dataEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Continuidade</h4>
                  <p>
                    DR multi-region, auto-scaling e self-healing (desenhado), backup tier-based com
                    RPO/RTO, tracing distribuído (OpenTelemetry).
                  </p>
                  <div className="src">
                    trilha: <code>operationsEngine</code>
                  </div>
                </div>
              </div>
              <div className="honest">
                <b>Honestidade:</b> “self-healing” e DR são capacidades de design — ainda{' '}
                <strong>sem números de escala medidos</strong>, porque a produção é uma plataforma
                nova. Os benchmarks de carga vêm com os primeiros pilotos.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALIDADE */}
      <section id="qualidade">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_QUAL}</div>
              <div className="kick">④ Qualidade &amp; correção</div>
              <h3>Correção verificada por máquina, não por confiança</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                O princípio é “confiança conquistada por evidência”: a plataforma se autoverifica a
                cada mudança.
              </p>
              <span className="badge b-impl" style={{ marginTop: 14 }}>
                <span className="d" /> Implementado
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Invariantes de qualidade, verificados no CI</h4>
                  <p>
                    Isolamento (probes cross-tenant + RLS via pgTAP), integridade, contratos,
                    resiliência, compliance e evolvability — rodando como gate no CI.
                  </p>
                  <div className="src">
                    trilha: <code>validationEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Qualidade de IA como gate</h4>
                  <p>
                    LLM-as-Judge e testes baseados em propriedade barram regressão antes de promover
                    um fluxo.
                  </p>
                  <div className="src">
                    trilha: <code>evalEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Contratos e testes</h4>
                  <p>
                    Contratos de API (OpenAPI) e de eventos (AsyncAPI) verificados; testes
                    co-localizados ao código.
                  </p>
                  <div className="src">
                    trilha: <code>validationEngine</code> · co-located tests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCA */}
      <section id="governanca">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_GOV}</div>
              <div className="kick">⑤ Governança</div>
              <h3>Limites na arquitetura — não no código de cada app</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                Política declarativa que o runtime aplica em toda a plataforma, com pessoa no
                circuito quando importa.
              </p>
              <span className="badge b-parc" style={{ marginTop: 14 }}>
                <span className="d" /> Parcial — núcleo implementado; self-service no roadmap
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Políticas declarativas + HITL</h4>
                  <p>
                    Guardrails versionados (checksum), avaliados com cache e explain; aprovação
                    humana (human-in-the-loop) em ações sensíveis.
                  </p>
                  <div className="src">
                    trilha: <code>policyEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Cotas e entitlements</h4>
                  <p>
                    Rate limiting, usage tracking e enforcement por tenant; reserva atômica e
                    overrides aprovados.
                  </p>
                  <div className="src">
                    trilha: <code>quotaEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Consentimento e auditoria</h4>
                  <p>
                    Ciclo de consentimento GDPR/LGPD e trilha de auditoria imutável por hash-chain
                    (ver Segurança).
                  </p>
                  <div className="src">
                    trilha: <code>securityEngine</code> · <code>auditTrailEngine</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURANCA */}
      <section id="seguranca">
        <div className="wrap">
          <div className="pillar">
            <div className="pl">
              <div className="ico">{ICON_SEC}</div>
              <div className="kick">⑥ Segurança</div>
              <h3>Segurança e privacidade na fundação</h3>
              <p style={{ color: 'var(--slate)', fontSize: '14.5px', marginTop: 10 }}>
                Multi-tenancy forte, criptografia e masking — desde o primeiro dia, sem o cliente
                configurar.
              </p>
              <span className="badge b-impl" style={{ marginTop: 14 }}>
                <span className="d" /> Implementado
              </span>
            </div>
            <div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>BYOK — chave do cliente</h4>
                  <p>
                    Traga a própria chave KMS (AWS/GCP/Azure). Crypto-shredding: revogou a chave, os
                    dados ficam ilegíveis na hora — independente da plataforma.
                  </p>
                  <div className="src">
                    trilha: <code>securityEngine · spec-byok</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Isolamento multi-tenant</h4>
                  <p>
                    Schema dedicado por cliente + RLS como backstop. O <span className="mono">tenantId</span>{' '}
                    nunca vem do payload — deriva do contexto da requisição.
                  </p>
                  <div className="src">
                    trilha: <code>securityEngine</code> · <code>dataEngine</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Masking de PII e content safety</h4>
                  <p>
                    Dados sensíveis mascarados (4 estratégias) antes de chegar ao LLM; guardas
                    contra prompt-injection/jailbreak.
                  </p>
                  <div className="src">
                    trilha: <code>securityEngine · spec-content-safety</code>
                  </div>
                </div>
              </div>
              <div className="feat">
                <span className="ck">✓</span>
                <div>
                  <h4>Auth + audit hash-chain</h4>
                  <p>
                    Dual token + RBAC; trilha SHA-256 append-only — adulteração é criptograficamente
                    detectável e verificável por tenant.
                  </p>
                  <div className="src">
                    trilha: <code>securityEngine</code> · <code>auditTrailEngine · spec-hash-chain</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATURIDADE */}
      <section id="maturidade">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">⑦ Maturidade &amp; compliance</div>
            <h2>O que está pronto, com honestidade</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              A plataforma escaneia controles SOC2 (CC6/CC7/CC8) e GDPR (Art. 17/20/30/32)
              continuamente — verificação automática a cada mudança, não checklist manual.
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Pilar</th>
                <th>O que já entregamos</th>
                <th>Status</th>
                <th>Próximo passo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Segurança</b>
                </td>
                <td>BYOK, masking de PII, RBAC, audit hash-chain</td>
                <td>
                  <span className="badge b-impl">
                    <span className="d" />
                    Implementado
                  </span>
                </td>
                <td className="next">Fail-closed amplo + pen-test externo</td>
              </tr>
              <tr>
                <td>
                  <b>Qualidade</b>
                </td>
                <td>Invariantes de qualidade, LLM-as-Judge, contratos</td>
                <td>
                  <span className="badge b-impl">
                    <span className="d" />
                    Implementado
                  </span>
                </td>
                <td className="next">Cobertura de carga em escala</td>
              </tr>
              <tr>
                <td>
                  <b>AI-first</b>
                </td>
                <td>Orquestração multi-agente governada; multi-provider com fallback e custo medido</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" />
                    Parcial
                  </span>
                </td>
                <td className="next">Jornada multi-worker em hardening; mais padrões de autonomia</td>
              </tr>
              <tr>
                <td>
                  <b>Governança</b>
                </td>
                <td>Políticas+HITL, cotas/entitlements, consentimento</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" />
                    Parcial
                  </span>
                </td>
                <td className="next">Billing/payment + painel self-service de governança</td>
              </tr>
              <tr>
                <td>
                  <b>Performance</b>
                </td>
                <td>SLO, cost trace, DR multi-region, self-healing (design)</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" />
                    Parcial
                  </span>
                </td>
                <td className="next">Números de escala em produção (pós-piloto)</td>
              </tr>
              <tr>
                <td>
                  <b>Compliance</b>
                </td>
                <td>Scanners SOC2/GDPR contínuos</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" />
                    Parcial
                  </span>
                </td>
                <td className="next">Certificação SOC2 Type II (auditoria externa)</td>
              </tr>
            </tbody>
          </table>
          <div className="honest">
            <b>Transparência:</b> os controles já são escaneados pela plataforma, mas a{' '}
            <strong>certificação SOC2 formal</strong> (auditoria de terceiro) e os{' '}
            <strong>números de escala</strong> estão no roadmap — somos uma plataforma nova.
            Preferimos provar a prometer; esta transparência é parte da avaliação.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="avaliar">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Avaliação técnica
          </div>
          <h2>Abra o capô com a gente</h2>
          <p className="lead">
            Damos acesso ao data room técnico (arch docs, specs, evidências), uma sessão de
            arquitetura com engenharia e um ambiente de avaliação isolado.
          </p>
          <div className="ctab">
            <a className="btn btn-primary" href={PLATFORM_CONTACT} data-track="plataforma-contact-cta">
              {CTA.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Confiança conquistada por evidência." />
    </div>
  );
}
