import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — Segurança & Governança: o controle continua seu',
  description:
    'Isolamento multi-tenant, sua própria chave (BYOK), mascaramento de dados sensíveis e trilha de auditoria à prova de adulteração. Governança na fundação, verificável por evidência.',
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
      <div className="note">
        Protótipo da página de segurança & governança. Conteúdo demonstrativo; o status de cada
        item é o real.
      </div>

      <SiteHeader cta={{ label: 'Falar com o time', href: PLATFORM_CONTACT }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Segurança &amp; Governança
            </div>
            <h1>
              Coloque a IA pra trabalhar nos seus dados — <span className="g">sem abrir mão do controle.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '60ch' }}>
              O medo é sempre o mesmo: dado sensível vazando pro modelo, um cliente enxergando o de
              outro, perder o controle da chave. Na Fluxomind isso não é um add-on que você liga
              depois — vem na fundação, e cada garantia é <strong>verificável por evidência</strong>.
            </p>
            <div className="herocta" style={{ justifyContent: 'center', marginTop: 26 }}>
              <a className="btn btn-primary" href="#garantias">
                Ver as garantias
              </a>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT}>
                Falar com o time
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* AS 4 GARANTIAS — bloco escuro, "cofre" */}
      <section className="sec" id="garantias">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              As quatro garantias
            </div>
            <h2 style={{ color: '#fff' }}>O que protege seus dados, e como provar</h2>
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

      {/* GOVERNANÇA DE FÁBRICA */}
      <section id="governanca">
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Governança de fábrica</div>
            <h2>A IA executa de verdade — dentro das suas regras</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch' }}>
              A diferença entre uma IA que ajuda e uma que assusta é quem decide. Aqui a governança
              não é um painel separado: ela está no caminho de cada ação que um agente toma.
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

      {/* HONESTIDADE / COMPLIANCE */}
      <section id="compliance" style={{ background: 'var(--panel)' }}>
        <div className="wrap">
          <div className="secthead">
            <div className="kick">Compliance, com honestidade</div>
            <h2>O que já está pronto — e o que ainda não está</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '64ch' }}>
              A plataforma escaneia controles SOC2 (CC6/CC7/CC8) e GDPR (Art. 17/20/30/32)
              continuamente — verificação automática a cada mudança, não checklist manual.{' '}
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
                <td>Mapeamento SOC2/GDPR escaneado continuamente</td>
                <td>
                  <span className="badge b-parc">
                    <span className="d" /> Parcial
                  </span>
                </td>
                <td className="next">Certificação SOC2 Type II (auditoria externa)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA ENTERPRISE */}
      <section className="offer" id="avaliar">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Avaliação a fundo
          </div>
          <h2>Vai abrir o capô da segurança?</h2>
          <p className="lead">
            Para quem precisa avaliar a fundo, damos um ambiente de avaliação isolado e uma sessão de
            arquitetura com engenharia — onde cada garantia acima é demonstrada, não afirmada.
          </p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_CONTACT}>
              Falar com o time
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
