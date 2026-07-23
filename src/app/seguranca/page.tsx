import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CTA, TRUST_RULES, SIGNATURE } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Segurança & Governança',
  description:
    'Governança não é uma feature — é o produto: as 5 regras da confiança e a engenharia de nível enterprise (isolamento, BYOK, masking de PII, trilha à prova de adulteração) que deixam um não-técnico delegar sem medo. Com honestidade sobre o que ainda falta.',
  alternates: {
    canonical: '/seguranca',
    languages: { 'pt-BR': '/seguranca', en: '/en/security' },
  },
};

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Badge de honestidade — b-impl (produção verificável) · b-parc (amadurecendo).
function Badge({ kind }: { kind: 'b-impl' | 'b-parc' | 'b-road' }) {
  const label = kind === 'b-impl' ? 'Implementado' : kind === 'b-parc' ? 'Parcial' : 'Roadmap';
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

// As 5 regras da confiança — títulos e glosa canônicos (messages.TRUST_RULES).
// Aqui vive só o que é desta página: ícone e a expansão de cada regra.
const RULE_DETAIL: { icon: ReactNode; more: string }[] = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
      </svg>
    ),
    more: 'O app se constrói a partir do seu problema, diante de você. Enquadramento errado aparece na primeira tela — não meses depois, num projeto entregue torto.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16.5l8 4 8-4" />
      </svg>
    ),
    more: 'Nasce inteira, não um recorte que empurra o resto para depois. Cada etapa conclui com a evidência para você conferir antes de confiar.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 13l-4-4 4-4" />
        <path d="M5 9h8.5a5.5 5.5 0 0 1 0 11H8" />
      </svg>
    ),
    more: 'Ação reversível e registrada. Você corrige conversando, sem abrir chamado — o custo de um erro é desfazê-lo, não conviver com ele.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
    more: 'Nada crítico executa sem o OK de quem manda. A IA propõe e prepara; a decisão que pesa fica com uma pessoa.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15" r="1.2" />
      </svg>
    ),
    more: 'Cada empresa num espaço dedicado, com a chave e a trilha do seu lado. Verificável — não na nossa palavra.',
  },
];

const RULES = TRUST_RULES.map((r, i) => ({ ...r, ...RULE_DETAIL[i] }));

// Proteção de dados — fatos verificáveis na arquitetura hoje (regra 5).
// Promessa no title; "como funciona" + trilha de engine no rodapé mono. Sem overclaim.
const GUARANTEES = [
  {
    area: 'Isolamento',
    title: 'Seus dados ficam só seus',
    desc: 'Cada empresa tem um espaço dedicado. Um cliente nunca alcança o dado de outro — nem por engano, nem de propósito.',
    how: 'Schema dedicado por cliente + RLS como backstop. O tenantId deriva do contexto da requisição, nunca do payload.',
    trail: 'securityEngine · dataEngine',
  },
  {
    area: 'BYOK',
    title: 'A chave é sua — e a tranca também',
    desc: 'Quem exige pode trazer a própria chave de criptografia. Revogou? Os dados ficam ilegíveis na hora — com ou sem a gente no meio.',
    how: 'BYOK com KMS (AWS/GCP/Azure) e crypto-shredding: a revogação corta o acesso ao dado, independente da plataforma.',
    trail: 'securityEngine · spec-byok',
  },
  {
    area: 'Privacidade',
    title: 'O que é sensível não chega cru ao modelo',
    desc: 'Dados pessoais são mascarados antes de qualquer IA processar — e há guardas contra tentativas de manipular o modelo.',
    how: 'Masking de PII (4 estratégias) antes do LLM + content safety contra prompt-injection e jailbreak.',
    trail: 'securityEngine · spec-content-safety',
  },
  {
    area: 'Auditoria',
    title: 'Toda ação registrada, à prova de adulteração',
    desc: 'Quem fez o quê, quando — numa trilha que não dá pra editar sem deixar rastro. Verificável por você, não na nossa palavra.',
    how: 'Autenticação dual-token + RBAC; trilha SHA-256 append-only — adulteração é criptograficamente detectável e verificável por tenant.',
    trail: 'securityEngine · auditTrailEngine · spec-hash-chain',
  },
];

// Governança no caminho de cada ação (regras 3 e 4). Status honesto por item.
const GOVERNANCE: { title: string; desc: string; badge: 'b-impl' | 'b-parc' }[] = [
  {
    title: 'Humano no circuito (HITL)',
    desc: 'Aprovações em níveis: nada crítico executa sem o OK de quem manda. A IA propõe; a decisão que importa fica com você.',
    badge: 'b-impl',
  },
  {
    title: 'Políticas e papéis',
    desc: 'RBAC e políticas decidem quem pode o quê — aplicadas pela plataforma a cada passo, não confiadas ao código de cada app.',
    badge: 'b-impl',
  },
  {
    title: 'Cotas e limites de uso',
    desc: 'Uso medido e barrado por tenant, com reserva atômica. Sem estouro silencioso, sem surpresa de consumo.',
    badge: 'b-impl',
  },
  {
    title: 'Consentimento e privacidade',
    desc: 'Ciclo de consentimento LGPD/GDPR com trilha — base legal registrada, não presumida.',
    badge: 'b-parc',
  },
];

export default function Seguranca() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/security" />

      {/* HERO — governança como o produto, não compliance de rodapé */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Confiança &amp; Governança</p>
          <h1 className="fx-serif fx-h1">
            Governança não é uma feature. É o <span className="fx-em">produto</span>.
          </h1>
          <p className="fx-lead">
            Os processos que mais valem a pena delegar — cobrança, atendimento, financeiro — são os
            que mais assustam. O que te deixa entregar sem medo não é uma promessa de segurança no
            rodapé: são <strong>cinco regras no caminho de cada ação</strong> e uma engenharia que
            você pode verificar. Esta página mostra o que sustenta cada uma — e é honesta sobre o
            que ainda falta.
          </p>
          <div className="fx-cta-row" style={{ marginTop: 26 }}>
            <a className="fx-btn fx-btn-primary" href="#regras" data-track="seguranca-regras">
              Ver as cinco regras
            </a>
            <a
              className="fx-btn fx-btn-ghost"
              href={PLATFORM_CONTACT}
              data-track="seguranca-contact-cta"
            >
              {CTA.contact}
            </a>
          </div>
          <div className="fx-reassure">
            <span>De fábrica, em todo app</span>
            <span>Verificável, não na nossa palavra</span>
            <span>Honesto sobre o que falta</span>
          </div>
        </div>
      </header>

      {/* A TESE — por que a governança é o produto */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A tese</p>
          <h2 className="fx-serif fx-h2">
            Delegar de verdade exige mais do que uma IA <span className="fx-em">esperta</span>.
          </h2>
          <p className="fx-body">
            Um não-técnico só entrega uma operação inteira — o dinheiro, o cliente, a papelada —
            quando confia que errar não vai machucar e que ele continua no controle. Por isso, aqui,
            a governança não é um anexo de compliance nem uma tela que ninguém abre:{' '}
            <strong>ela está no caminho de cada ação</strong> que o seu app executa.
          </p>
          <p className="fx-body">
            Tirar a governança do rodapé e colocá-la no centro é o que transforma “testei uma IA” em
            “delego e ela opera”. É o que abre os domínios mais sensíveis — financeiro, saúde,
            jurídico — para quem não tem time de TI.
          </p>
          <p className="fx-quote fx-mt-s">
            A governança não é o rodapé do produto — é o que permite delegar. Por isso ela é o
            produto.
          </p>
        </div>
      </section>

      {/* AS 5 REGRAS DA CONFIANÇA — o frame da página */}
      <section className="fx-sec fx-sec-alt" id="regras">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">As cinco regras da confiança</p>
            <h2 className="fx-serif fx-h2">
              O que torna uma operação confiável — em cinco regras
            </h2>
            <p className="fx-lead">
              Não é jargão de auditoria. São as condições para alguém que não é técnico delegar de
              verdade — e cada decisão de produto da plataforma responde a elas.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {RULES.map((r, i) => (
              <div className="fx-card" key={r.title}>
                <span className="fx-ico">{r.icon}</span>
                <span className="fx-label">Regra 0{i + 1}</span>
                <h3>{r.title}</h3>
                <p>
                  <strong>{r.desc}.</strong> {r.more}
                </p>
              </div>
            ))}
          </div>
          <div className="fx-note fx-mt">
            As cinco não são um módulo que você ativa. Vêm <strong>de fábrica em todo app</strong> da
            Fluxomind, desde o primeiro dia — o jeito de construir (regras 1 e 2), a governança no
            caminho de cada ação (3 e 4) e a engenharia de isolamento e prova (5).
          </div>
        </div>
      </section>

      {/* REGRA 5 — proteção de dados: as 4 garantias verificáveis */}
      <section className="fx-sec" id="garantias">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Nível enterprise · proteção de dados</p>
            <h2 className="fx-serif fx-h2">O que protege seus dados — e como provar</h2>
            <p className="fx-lead">
              Quatro proteções de fundação, ativas desde o primeiro dia. Cada uma com a trilha de
              engenharia que a sustenta — para você verificar, não acreditar.
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

      {/* REGRAS 3 e 4 — governança no caminho de cada ação */}
      <section className="fx-sec fx-sec-alt" id="governanca">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Nível enterprise · governança</p>
            <h2 className="fx-serif fx-h2">A IA executa de verdade — dentro das suas regras</h2>
            <p className="fx-lead">
              A diferença entre uma IA que ajuda e uma que assusta é quem decide. A governança não é
              um painel separado: está no caminho de cada ação — para que errar não machuque e, nos
              casos sensíveis, uma pessoa decida.
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
            <strong>Marcamos como parcial de propósito:</strong> a governança avançada — fail-closed
            amplo e mais padrões de autonomia — ainda está amadurecendo. Preferimos te contar o fato,
            a lacuna e a aposta sem confundir os três.
          </div>
        </div>
      </section>

      {/* COMPLIANCE, COM HONESTIDADE */}
      <section className="fx-sec" id="compliance">
        <div className="fx-wrap">
          <div className="fx-sec-head">
            <p className="fx-eyebrow">Compliance, com honestidade</p>
            <h2 className="fx-serif fx-h2">O que já está pronto — e o que ainda não está</h2>
          </div>
          <div className="fx-note fx-mt" style={{ maxWidth: '68ch' }}>
            A plataforma tem scanners automatizados de controles SOC2 (CC6/CC7/CC8) e LGPD/GDPR
            (Art. 17/20/30/32) — verificação por código, não checklist manual; hoje rodam sob
            demanda, com execução contínua agendada no roadmap.{' '}
            <strong>
              Ainda não temos certificação SOC2 formal de terceiro nem pen-test externo concluído
            </strong>{' '}
            — são o próximo passo, não promessa cumprida. O que afirmamos acima é o que dá para
            verificar na arquitetura hoje.
          </div>
          <div className="fx-tablewrap">
            <table className="fx-table">
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
                    <strong>Proteção de dados</strong>
                  </td>
                  <td>Isolamento multi-tenant, BYOK, masking de PII, audit hash-chain</td>
                  <td>
                    <Badge kind="b-impl" />
                  </td>
                  <td>Pen-test externo</td>
                </tr>
                <tr>
                  <td>
                    <strong>Governança</strong>
                  </td>
                  <td>HITL, políticas/RBAC, cotas/entitlements, consentimento</td>
                  <td>
                    <Badge kind="b-parc" />
                  </td>
                  <td>Fail-closed amplo + mais padrões de autonomia</td>
                </tr>
                <tr>
                  <td>
                    <strong>Compliance</strong>
                  </td>
                  <td>Scanners SOC2/LGPD automatizados (sob demanda)</td>
                  <td>
                    <Badge kind="b-parc" />
                  </td>
                  <td>Execução contínua + certificação SOC2 Type II (auditoria externa)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA FINAL — para o beta */}
      <section className="fx-sec fx-offer" id="avaliar">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            O próximo passo
          </p>
          <h2 className="fx-serif fx-h2">Delegue o que mais importa — com o controle do seu lado.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0' }}>
            Entre no beta privado e conte a operação que você quer tirar das costas. Para quem
            precisa avaliar a fundo, damos um ambiente isolado e uma sessão de arquitetura com
            engenharia — onde cada garantia acima é demonstrada, não afirmada.
          </p>
          <div className="fx-cta-row" style={{ marginTop: 26 }}>
            <Link className="fx-btn fx-btn-primary" href="/#comecar" data-track="seguranca-beta">
              Entrar no beta
            </Link>
            <a
              className="fx-btn fx-btn-ghost"
              href={PLATFORM_CONTACT}
              data-track="seguranca-contact-cta"
            >
              {CTA.contact}
            </a>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/plataforma#seguranca">Ver a arquitetura por dentro →</Link>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão · avaliação a fundo sob demanda</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
