import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CTA, TRUST_RULES } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Segurança & Governança',
  description:
    'Por que delegar sem medo: as 5 regras da confiança — enquadramento, coerência, correção, humano no circuito e dados isolados — e o que sustenta cada uma na plataforma hoje, com honestidade sobre o que falta.',
};

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// As 4 garantias — fatos canônicos espelhados de /plataforma#seguranca (pilar ⑥).
// Promessa de negócio no h4; "como funciona" + trilha de engine no corpo. Sem overclaim.
const GUARANTEES = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="4" y="4" width="7" height="7" rx="1.4" />
        <rect x="13" y="13" width="7" height="7" rx="1.4" />
        <path d="M7.5 11v3.5a2 2 0 0 0 2 2H13" />
      </svg>
    ),
    area: 'Isolamento',
    title: 'Seus dados ficam só seus',
    desc: 'Cada empresa tem um espaço dedicado. Um cliente nunca alcança o dado de outro — nem por engano, nem de propósito.',
    how: 'Schema dedicado por cliente + RLS como backstop. O tenantId deriva do contexto da requisição, nunca do payload.',
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
    title: 'A chave é sua — e a tranca também',
    desc: 'Quem exige pode trazer a própria chave de criptografia. Revogou? Os dados ficam ilegíveis na hora — com ou sem a gente no meio.',
    how: 'BYOK com KMS (AWS/GCP/Azure) e crypto-shredding: a revogação corta o acesso ao dado, independente da plataforma.',
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
    area: 'Privacidade',
    title: 'O que é sensível não chega cru ao modelo',
    desc: 'Dados pessoais são mascarados antes de qualquer IA processar — e há guardas contra tentativas de manipular o modelo.',
    how: 'Masking de PII (4 estratégias) antes do LLM + content safety contra prompt-injection e jailbreak.',
    trail: 'securityEngine · spec-content-safety',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    area: 'Auditoria',
    title: 'Toda ação registrada, à prova de adulteração',
    desc: 'Quem fez o quê, quando — numa trilha que não dá pra editar sem deixar rastro. Verificável por você, não na nossa palavra.',
    how: 'Autenticação dual-token + RBAC; trilha SHA-256 append-only — adulteração é criptograficamente detectável e verificável por tenant.',
    trail: 'securityEngine · auditTrailEngine · spec-hash-chain',
  },
];

const GOVERNANCE = [
  {
    title: 'Humano no circuito (HITL)',
    desc: 'Aprovações em níveis: nada crítico executa sem o OK de quem manda. A IA propõe; a decisão que importa fica com você.',
  },
  {
    title: 'Políticas e papéis',
    desc: 'RBAC e políticas decidem quem pode o quê — aplicadas pela plataforma a cada passo, não confiadas ao código de cada app.',
  },
  {
    title: 'Cotas e limites de uso',
    desc: 'Uso medido e barrado por tenant, com reserva atômica. Sem estouro silencioso, sem surpresa de consumo.',
  },
  {
    title: 'Consentimento e privacidade',
    desc: 'Ciclo de consentimento GDPR/LGPD com trilha — base legal registrada, não presumida.',
  },
];

export default function Seguranca() {
  return (
    <div className="page-feats">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} />

      {/* HERO — governança como recurso, não compliance */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Segurança &amp; Governança
            </div>
            <h1>
              Confiança para delegar — <span className="g">até o que é sensível.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '62ch' }}>
              Financeiro, saúde, jurídico: os processos que mais valem a pena delegar são os que
              mais assustam. Por isso a segurança aqui não é um anexo de compliance — são{' '}
              <strong>cinco regras no caminho de cada ação</strong> que o seu app executa. Esta
              página mostra o que sustenta cada uma, e é honesta sobre o que ainda não está pronto.
            </p>
            <div className="herocta" style={{ justifyContent: 'center', marginTop: 26 }}>
              <a className="btn btn-primary" href="#regras">
                Ver as cinco regras
              </a>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT} data-track="seguranca-contact-cta">
                {CTA.contact}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* AS 5 REGRAS DA CONFIANÇA — o frame da página */}
      <section className="sec" id="regras">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              As regras da confiança
            </div>
            <h2 style={{ color: '#fff' }}>O que torna a operação confiável — em cinco regras</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Não é jargão de auditoria. São as condições para alguém que não é técnico delegar uma
              operação de verdade — e cada decisão de produto da plataforma responde a elas.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 34 }}>
            {TRUST_RULES.map((r, i) => (
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
              É o que abre os domínios mais sensíveis — financeiro, saúde, jurídico.
            </span>
            <p style={{ color: '#7e8590', fontSize: 14, marginTop: 18, maxWidth: '58ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Abaixo, o que sustenta cada regra: o jeito de construir (regras 1 e 2), a governança
              no caminho de cada ação (3 e 4) e a engenharia de isolamento e prova (5).
            </p>
          </div>
        </div>
      </section>

      {/* REGRAS 1 e 2 — enquadramento e coerência */}
      <section id="construcao">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Regras 1 e 2 · Enquadramento e coerência</div>
            <h2>Você vê o app nascer — e confere antes de confiar</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch' }}>
              O seu app não chega numa caixa preta. Ele se constrói a partir do seu problema,
              diante de você — e cada conclusão chega com a prova. Enquadramento errado aparece na
              primeira tela, não meses depois de um projeto.
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div className="feat">
              <span className="ck">✓</span>
              <div>
                <h4>Resolve o problema certo</h4>
                <p>
                  A construção parte da descrição do seu problema, e você acompanha cada passo na
                  tela. O que não faz sentido para o seu negócio, você ajusta conversando — sem
                  abrir chamado, sem esperar sprint.
                </p>
              </div>
            </div>
            <div className="feat">
              <span className="ck">✓</span>
              <div>
                <h4>Faz sentido, ponta a ponta</h4>
                <p>
                  Não é um recorte que empurra o resto para depois: a solução nasce inteira e
                  coerente, e a conclusão de cada etapa vem com a evidência para você conferir.
                </p>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/demo" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 15 }}>
              {CTA.demo} →
            </Link>
          </p>
        </div>
      </section>

      {/* REGRAS 3 e 4 — governança no caminho de cada ação */}
      <section id="governanca" style={{ background: 'var(--panel)' }}>
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Regras 3 e 4 · Errar não machuca, humano assume</div>
            <h2>A IA executa de verdade — dentro das suas regras</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch' }}>
              A diferença entre uma IA que ajuda e uma que assusta é quem decide. Aqui a governança
              não é um painel separado: ela está no caminho de cada ação que o seu app executa —
              para que errar não machuque e, nos casos sensíveis, uma pessoa decida.
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
              <span className="d" /> Parcial — governança avançada em amadurecimento
            </span>
          </div>
        </div>
      </section>

      {/* REGRA 5 — as 4 garantias de engenharia, bloco escuro "cofre" */}
      <section className="sec" id="garantias">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Regra 5 · Seus dados, só seus
            </div>
            <h2 style={{ color: '#fff' }}>O que protege seus dados — e como provar</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Quatro proteções de fundação, ativas desde o primeiro dia — cada uma com a trilha de
              engenharia que a sustenta.
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
                  trilha: {g.trail}
                </div>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 30 }}>
            <span className="badge b-impl">
              <span className="d" /> Implementado — verificável na arquitetura hoje
            </span>
          </div>
        </div>
      </section>

      {/* HONESTIDADE / COMPLIANCE */}
      <section id="compliance">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Compliance, com honestidade</div>
            <h2>O que já está pronto — e o que ainda não está</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '64ch' }}>
              A plataforma tem scanners automatizados de controles SOC2 (CC6/CC7/CC8) e GDPR
              (Art. 17/20/30/32) — verificação por código, não checklist manual; hoje rodam sob
              demanda, e a execução contínua agendada está no roadmap.{' '}
              <strong>
                Ainda não temos certificação SOC2 formal de terceiro nem pen-test externo concluído
              </strong>{' '}
              — são o próximo passo, não promessa cumprida. O que afirmamos acima é o que dá pra
              verificar na arquitetura hoje.
            </p>
          </div>
          <table style={{ marginTop: 24 }}>
            <thead>
              <tr>
                <th>Frente</th>
                <th>O que já entregamos</th>
                <th>Status</th>
                <th>Próximo passo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Proteção de dados</b>
                </td>
                <td>Isolamento multi-tenant, BYOK, masking de PII, audit hash-chain</td>
                <td>
                  <span className="badge b-impl">
                    <span className="d" /> Implementado
                  </span>
                </td>
                <td className="next">Pen-test externo</td>
              </tr>
              <tr>
                <td>
                  <b>Governança</b>
                </td>
                <td>HITL, políticas/RBAC, cotas/entitlements, consentimento</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" /> Parcial
                  </span>
                </td>
                <td className="next">Fail-closed amplo + mais padrões de autonomia</td>
              </tr>
              <tr>
                <td>
                  <b>Compliance</b>
                </td>
                <td>Scanners SOC2/GDPR automatizados (sob demanda)</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" /> Parcial
                  </span>
                </td>
                <td className="next">Execução contínua + certificação SOC2 Type II (auditoria externa)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="offer" id="avaliar">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Avaliação a fundo
          </div>
          <h2>Vai abrir o capô da segurança?</h2>
          <p className="lead">
            Para quem precisa avaliar a fundo, damos um ambiente de avaliação isolado e uma sessão
            de arquitetura com engenharia — onde cada garantia acima é demonstrada, não afirmada.
          </p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_CONTACT} data-track="seguranca-contact-cta">
              {CTA.contact}
            </a>
            <Link className="btn btn-ghost btn-lg" href="/plataforma#seguranca">
              Ver a arquitetura por dentro →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Confiança conquistada por evidência." />
    </div>
  );
}
