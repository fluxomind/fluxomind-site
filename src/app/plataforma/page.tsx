import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_CONTACT } from '@/lib/platform';
import { CTA, PHASE, SIGNATURE } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Plataforma',
  description:
    'A plataforma que fica invisível atrás do trabalho: multi-tenant, 39 engines em 10 camadas, governada e verificável por evidência — com o status honesto de cada capacidade (em produção, em construção, visão).',
  alternates: {
    canonical: '/plataforma',
    languages: { 'pt-BR': '/plataforma', en: '/en/platform' },
  },
};

// Ícones de traço — mesma família do resto do site (sem emoji colorido).
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

// Camadas da plataforma (verificável em src/engine/). Papel em linguagem
// de dono; nomes de engine no mono. Nada aqui é número inventado.
const LAYERS = [
  { name: 'Core AI', role: 'o raciocínio do app', engines: 'agentStudio · model · prompt · memory · rag' },
  { name: 'Tooling', role: 'as mãos que agem no mundo', engines: 'tool · mcp' },
  { name: 'Experience', role: 'as telas e o catálogo', engines: 'app · appStore · dataView · speech' },
  { name: 'Automation', role: 'o que roda sem você', engines: 'workflow · code' },
  { name: 'Governance', role: 'os limites e a alçada', engines: 'security · policy · quota · auditTrail' },
  { name: 'Data', role: 'a memória do negócio', engines: 'atlas · data · metadata · cache · queue · file' },
  { name: 'Monitoring', role: 'os olhos sobre a operação', engines: 'monitoring' },
  { name: 'CI/CD AIOps', role: 'o deploy governado', engines: 'deployment · operations · validation' },
  { name: 'Ecosystem', role: 'as conexões para fora', engines: 'api · plugin' },
  { name: 'Learning', role: 'a evolução ao longo do tempo', engines: 'feedback · fineTune · eval · evolution' },
];

export default function Plataforma() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/platform" />

      {/* 01 — HERO: a plataforma invisível */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <span className="fx-pill">
            <span className="fx-lz" /> Beta privado · prova de execução
          </span>
          <p className="fx-eyebrow">A plataforma</p>
          <h1 className="fx-serif fx-h1">
            A boa plataforma <span className="fx-em">some</span>. Fica o trabalho.
          </h1>
          <p className="fx-lead">
            Por baixo do app que atende no seu WhatsApp existe uma plataforma multi-tenant
            construída — <strong>39 engines em 10 camadas</strong>, governada e verificável por
            evidência. O que a home demonstra, a engenharia sustenta. Esta é a página que abre o
            capô: a substância, com o status honesto de cada coisa.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/#comecar" data-track="plataforma-beta">
              Entrar no beta
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/demo" data-track="plataforma-demo">
              Ver operando →
            </Link>
          </div>
          <div className="fx-reassure">
            <span>Prova por evidência, não por slide</span>
            <span>Status real de cada capacidade</span>
            <span>Governança já em produção</span>
          </div>
        </div>
      </header>

      {/* 02 — HONESTIDADE DE ESTÁGIO: a chave dos selos */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Honestidade de estágio</p>
          <h2 className="fx-serif fx-h2">
            A gente prova o que existe — e diz o que <span className="fx-em">ainda não</span>.
          </h2>
          <p className="fx-body">
            Toda afirmação nesta página carrega um selo. É assim que você separa fato de aposta sem
            depender da nossa boa vontade — prova, não promessa.
          </p>
          <div style={{ display: 'flex', gap: '10px 14px', flexWrap: 'wrap', margin: '20px 0 4px' }}>
            <span className="fx-badge b-impl"><span className="fx-d" /> Já em produção</span>
            <span className="fx-badge b-parc"><span className="fx-d" /> Em construção</span>
            <span className="fx-badge b-road"><span className="fx-d" /> Visão</span>
          </div>
          <p className="fx-body fx-mt">
            A fronteira honesta de agora: {PHASE.next.desc}
          </p>
        </div>
      </section>

      {/* 03 — AI-FIRST: a IA é o fluxo de execução */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">AI-first</p>
            <h2 className="fx-serif fx-h2">
              A IA é o fluxo de execução — não um chatbot pendurado.
            </h2>
            <p className="fx-body">
              No software tradicional, o código chama o LLM quando precisa. Aqui é o inverso: um
              orquestrador recebe a intenção, consulta memória e conhecimento, planeja e aciona
              ferramentas — tudo governado por política e visível como um grafo de estado,
              auditável passo a passo.
            </p>
            <span className="fx-badge b-parc">
              <span className="fx-d" /> Parcial — jornada multi-worker em hardening
            </span>
          </div>

          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>Software tradicional</h4>
              <ul>
                <li>O código define um caminho fixo</li>
                <li>Chama o LLM como um “acessório”</li>
                <li>A resposta volta para o código</li>
              </ul>
            </div>
            <div className="fx-ftarrow">→</div>
            <div className="fx-ft to">
              <h4>Fluxomind — AI-first</h4>
              <ul>
                <li>O orquestrador recebe a intenção</li>
                <li>Consulta memória + conhecimento e planeja</li>
                <li>Aciona ferramentas sob política, em grafo de estado</li>
                <li>Cada passo governado e auditável</li>
              </ul>
            </div>
          </div>

          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Multi-provider, sem lock-in</h4>
                <p>
                  Roteamento por perfil de custo/qualidade, fallback automático entre provedores e
                  custo medido por chamada.
                </p>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Composição declarativa</h4>
                <p>
                  O agente compõe primitivas existentes — não gera código solto. Execução visível e
                  reproduzível.
                </p>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Self-building governado</h4>
                <p>
                  Estende o modelo do tenant por ferramentas governadas (create-only), com as
                  tabelas-base do sistema bloqueadas — dogfooding, não auto-modificação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — ARQUITETURA: 39 engines em 10 camadas */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Arquitetura</p>
            <h2 className="fx-serif fx-h2">
              39 engines, com fronteiras garantidas por máquina.
            </h2>
            <p className="fx-body">
              Tudo organizado em 10 camadas, verificável em{' '}
              <span className="fx-mono">src/engine/</span>. Cada engine é um módulo isolado com
              boundaries estritos — import indevido entre internals{' '}
              <strong>é bloqueado pelo verificador de boundaries</strong>, que roda sob demanda e no
              pipeline de deploy. Evolução por camada, sem ruptura.
            </p>
            <span className="fx-badge b-impl">
              <span className="fx-d" /> Verificado por máquina, no pipeline de deploy
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

      {/* 05 — FLYWHEEL + ATLAS: fica mais inteligente quanto mais roda */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Flywheel + Atlas</p>
            <h2 className="fx-serif fx-h2">Fica mais inteligente quanto mais é usada.</h2>
            <p className="fx-body">
              A plataforma não entrega valor uma vez — ela gira. Dois loops acoplados sobre{' '}
              <strong>um único cérebro semântico</strong>: a intenção vira app, o app gera operação,
              a operação devolve a próxima ação — e cada volta parte de um ponto mais alto.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            <div className="fx-card">
              <span className="fx-ico">{ICON_BUILD}</span>
              <span className="fx-label">Self-building loop</span>
              <h3>Intenção vira app</h3>
              <p>
                Você descreve a intenção; a plataforma cria objeto, campos e telas — sem um ciclo de
                engenharia no caminho.
              </p>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_LOOP}</span>
              <span className="fx-label">Insight loop</span>
              <h3>Operar devolve a próxima ação</h3>
              <p>
                Operar gera dado real; a plataforma lê a operação e sugere o próximo passo — mais
                preciso que o anterior. A volta completa se prova com o dogfood.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Em construção
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_ATLAS}</span>
              <span className="fx-label">Atlas</span>
              <h3>O cérebro semântico</h3>
              <p>
                Classifica as entidades do negócio (embedding + LLM, alinhado a Schema.org) — sem
                projeto manual de ontologia.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Em construção
              </span>
            </div>
          </div>
          <p className="fx-fineprint fx-narrow fx-mt">
            A tese: quanto mais você usa, mais o Atlas sabe — e mais barato fica entregar a próxima
            coisa. É o que separa um produto-flywheel de uma ferramenta. A volta completa é o que o
            dogfood vai provar.
          </p>
        </div>
      </section>

      {/* 06 — PERFORMANCE & ESCALA */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Performance &amp; escala</p>
            <h2 className="fx-serif fx-h2">Pensada para escala — observável e resiliente.</h2>
            <p className="fx-body">
              As capacidades de escala estão na arquitetura. Os números de produção chegam com os
              pilotos.
            </p>
            <span className="fx-badge b-parc">
              <span className="fx-d" /> Parcial — capacidade de design
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Observabilidade e SLO</h4>
                <p>
                  Métricas Prometheus, SLO por tier, detecção de anomalia (z-score/IQR) e cost trace
                  por execução.
                </p>
                <div className="fx-src">trilha: <code>monitoringEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Assíncrono e resiliente</h4>
                <p>
                  Fila distribuída com retries, backoff e DLQ; cache em camadas; pools de conexão e
                  detecção de query lenta.
                </p>
                <div className="fx-src">
                  trilha: <code>queueEngine</code> · <code>cacheEngine</code> · <code>dataEngine</code>
                </div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Continuidade</h4>
                <p>
                  DR multi-region, auto-scaling e self-healing (desenhado), backup tier-based com
                  RPO/RTO e tracing distribuído (OpenTelemetry).
                </p>
                <div className="fx-src">trilha: <code>operationsEngine</code></div>
              </div>
            </div>
          </div>
          <div className="fx-note fx-narrow fx-mt-s">
            <strong>Honestidade:</strong> “self-healing” e DR são capacidades de design — ainda sem
            números de escala medidos, porque a produção é uma plataforma nova. Os benchmarks de
            carga vêm com os primeiros pilotos.
          </div>
        </div>
      </section>


      {/* 07 — FUNDAÇÃO VERIFICADA: governança, segurança e correção num só lugar; detalhe em /seguranca */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Governança, segurança &amp; correção</p>
            <h2 className="fx-serif fx-h2">Governança não é feature — é o produto.</h2>
            <p className="fx-body">
              Os limites vivem na arquitetura, não no código de cada app: a plataforma se verifica
              por máquina, governa por política e protege na fundação — desde o primeiro dia, sem o
              cliente configurar. É o que deixa um não-técnico delegar sem medo.
            </p>
            <span className="fx-badge b-impl">
              <span className="fx-d" /> Núcleo já em produção
            </span>
          </div>
          <div className="fx-narrow fx-mt">
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Correção verificada por máquina</h4>
                <p>
                  Suítes que provam isolamento (cross-tenant + RLS via pgTAP), integridade e
                  contratos; qualidade de IA como gate (LLM-as-Judge) barra regressão antes de
                  promover um fluxo.
                </p>
                <div className="fx-src">trilha: <code>validationEngine</code> · <code>evalEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Governança por arquitetura</h4>
                <p>
                  Política declarativa que o runtime aplica em toda a plataforma, com pessoa no
                  circuito (HITL) nas ações sensíveis; cotas e entitlements por tenant.
                </p>
                <div className="fx-src">trilha: <code>policyEngine</code> · <code>quotaEngine</code></div>
              </div>
            </div>
            <div className="fx-feat">
              <span className="fx-ck">{ICON_CK}</span>
              <div>
                <h4>Segurança na fundação</h4>
                <p>
                  Isolamento multi-tenant (schema dedicado + RLS), BYOK com crypto-shredding,
                  masking de PII antes do LLM e trilha de auditoria SHA-256 à prova de adulteração.
                </p>
                <div className="fx-src">trilha: <code>securityEngine</code> · <code>auditTrailEngine</code></div>
              </div>
            </div>
          </div>
          <p className="fx-body fx-narrow fx-mt">
            O detalhe completo — as <strong>5 regras da confiança</strong> e o status honesto de
            compliance (SOC2, pen-test externo) — vive em{' '}
            <Link href="/seguranca">Segurança &amp; Governança →</Link>
          </p>
        </div>
      </section>

      {/* 08 — DISTRIBUIÇÃO & CONEXÕES */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Distribuição &amp; conexões</p>
            <h2 className="fx-serif fx-h2">Opera onde o negócio já vive — e distribui o método.</h2>
            <p className="fx-body">
              A plataforma se conecta ao que você já usa e opera pelo canal onde a PME brasileira já
              vive. A engine de App Store existe na camada Experience — o motor pronto para o
              catálogo de apps operantes que a visão descreve.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            <div className="fx-card">
              <span className="fx-ico">{ICON_CHAT}</span>
              <span className="fx-label">Canais</span>
              <h3>WhatsApp de primeira classe</h3>
              <p>
                Operação pelo WhatsApp em nível de plataforma — canal governado, não um número
                pessoal amarrado a um app. Voz e texto pela mesma trilha.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Em construção
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_PLUG}</span>
              <span className="fx-label">Conectores</span>
              <h3>Integra o que você já tem</h3>
              <p>
                E-mail, API, MCP e plugins — o app absorve planilhas e sistemas e devolve uma
                operação só, governada, sem largar o seu jeito de trabalhar.
              </p>
              <span className="fx-badge b-parc" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Em construção
              </span>
            </div>
            <div className="fx-card">
              <span className="fx-ico">{ICON_STORE}</span>
              <span className="fx-label">App Store engine</span>
              <h3>Do método ao catálogo</h3>
              <p>
                Quem domina um problema empacota o método; sua empresa instala e adota operado. A
                engine já existe; o catálogo público é a visão.
              </p>
              <span className="fx-badge b-road" style={{ marginTop: 14 }}>
                <span className="fx-d" /> Visão
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — MATURIDADE & COMPLIANCE */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Maturidade &amp; compliance</p>
            <h2 className="fx-serif fx-h2">O que está pronto, com honestidade.</h2>
            <p className="fx-body">
              A plataforma tem scanners automatizados de controles SOC2 (CC6/CC7/CC8) e GDPR
              (Art. 17/20/30/32) — verificação por código, não checklist manual. Hoje rodam sob
              demanda; a execução contínua agendada está no roadmap.
            </p>
          </div>
          <div className="fx-tablewrap">
            <table className="fx-table">
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
                  <td><strong>Segurança</strong></td>
                  <td>BYOK, masking de PII, RBAC, audit hash-chain</td>
                  <td>
                    <span className="fx-badge b-impl"><span className="fx-d" /> Implementado</span>
                  </td>
                  <td>Fail-closed amplo + pen-test externo</td>
                </tr>
                <tr>
                  <td><strong>Qualidade</strong></td>
                  <td>Invariantes de qualidade, LLM-as-Judge, contratos</td>
                  <td>
                    <span className="fx-badge b-impl"><span className="fx-d" /> Implementado</span>
                  </td>
                  <td>Cobertura de carga em escala</td>
                </tr>
                <tr>
                  <td><strong>AI-first</strong></td>
                  <td>Orquestração multi-agente governada; multi-provider com fallback e custo medido</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Parcial</span>
                  </td>
                  <td>Jornada multi-worker em hardening; mais padrões de autonomia</td>
                </tr>
                <tr>
                  <td><strong>Governança</strong></td>
                  <td>Políticas + HITL, cotas/entitlements, consentimento</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Parcial</span>
                  </td>
                  <td>Billing/payment + painel self-service de governança</td>
                </tr>
                <tr>
                  <td><strong>Performance</strong></td>
                  <td>SLO, cost trace, DR multi-region, self-healing (design)</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Parcial</span>
                  </td>
                  <td>Números de escala em produção (pós-piloto)</td>
                </tr>
                <tr>
                  <td><strong>Compliance</strong></td>
                  <td>Scanners SOC2/GDPR automatizados (sob demanda)</td>
                  <td>
                    <span className="fx-badge b-parc"><span className="fx-d" /> Parcial</span>
                  </td>
                  <td>Execução contínua + certificação SOC2 Type II (auditoria externa)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fx-note fx-mt-s">
            <strong>Transparência:</strong> os controles já são escaneados pela plataforma, mas a
            certificação SOC2 formal (auditoria de terceiro) e os números de escala estão no
            roadmap — somos uma plataforma nova. Preferimos provar a prometer.
          </div>
        </div>
      </section>

      {/* 12 — CTA: para o beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow">O próximo passo</p>
          <h2 className="fx-serif fx-h2">Abra o capô com a gente.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '56ch' }}>
            A plataforma está em beta privado. Entre na lista para operar com o time acompanhando de
            perto — e, se você é técnico, peça o data room (arch docs, specs, evidências) e uma
            sessão de arquitetura.
          </p>
          <div className="fx-cta-row fx-mt">
            <Link className="fx-btn fx-btn-primary" href="/#comecar" data-track="plataforma-beta-cta">
              Entrar no beta
            </Link>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT} data-track="plataforma-contact-cta">
              {CTA.contact}
            </a>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão para começar · prova, não promessa</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
