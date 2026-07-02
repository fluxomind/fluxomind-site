import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, NEGATION, PHASE, CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Acelere — do piloto à produção',
  description:
    'Para a empresa que já tentou IA e viu pilotos morrerem: 79% adotaram agentes (PwC, 2025), só 11% os têm implantados (KPMG, 2025). A Fluxomind entrega o processo operado — o agente roda o dia a dia, um humano decide nos casos sensíveis, integrado ao que você já tem.',
};

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Por que os pilotos morrem — as três paredes entre a demo e a produção.
const WALLS = [
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <path d="M7 9h10v3a5 5 0 0 1-10 0V9z" />
        <path d="M9.5 9V5M14.5 9V5M12 17v4" />
      </svg>
    ),
    title: 'O protótipo vive sozinho',
    desc: 'A sua operação vive no ERP, no CRM, no e-mail e no WhatsApp. Um piloto que não conversa com eles não entra na rotina de ninguém — por melhor que tenha sido a demo.',
  },
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M12 8.5v4M12 15.5h.01" />
      </svg>
    ),
    title: 'Segurança barra o que não é governado',
    desc: 'Sem permissões, limites e trilha de auditoria, o piloto não passa do comitê. E com razão: ninguém entrega um processo real ao que não presta contas.',
  },
  {
    icon: (
      <svg {...ICON_PROPS} width={26} height={26}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    ),
    title: 'Ninguém assume a segunda-feira',
    desc: 'O modelo responde bem — mas quem roda o processo toda semana, trata as exceções e não deixa a bola cair? Sem um dono da operação, o piloto vira mais uma aba aberta.',
  },
];

// Entregue operado — o que "rodando" significa na prática.
const OPERATED = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M20 12a8 8 0 1 1-2.3-5.7" />
        <path d="M20 3v4h-4" />
      </svg>
    ),
    tag: 'Processo',
    title: 'O agente roda o dia a dia',
    desc: 'Cobrança que acompanha o atraso, follow-up que não esquece, aprovação que anda. O processo acontece sem depender de alguém lembrar dele.',
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
    title: 'Um humano decide nos casos sensíveis',
    desc: 'Quando o caso exige — desconto fora da alçada, cliente delicado, valor alto — o app escala para uma pessoa do seu time. A IA propõe; quem manda decide.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    tag: 'Governança',
    title: 'Governado, com prova de cada ação',
    desc: 'Permissões, limites de uso e trilha de auditoria à prova de adulteração em cada passo. Cada conclusão chega com a evidência do que foi feito.',
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
    tag: 'Integração',
    title: 'Senta ao redor do que você já tem',
    desc: 'SAP, Salesforce e TOTVS ficam exatamente onde estão — o app opera ao redor deles, integrando por API, e-mail e WhatsApp, sem projeto de substituição.',
  },
];

export default function Acelere() {
  return (
    <div className="page-ent">
      {/* NAV */}
      <SiteHeader cta={{ label: CTA.demo, href: '/#demo' }} />

      {/* HERO — dor primeiro */}
      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Para empresas · adoção de IA em escala</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE}</div>
          <h1 style={{ maxWidth: '22ch' }}>
            O piloto de IA impressionou na demo — <span className="g">e morreu antes da produção.</span>
          </h1>
          <p className="hsub">
            Se essa história aconteceu na sua empresa, o problema não foi o modelo — construir
            nunca foi o gargalo. O que mata o piloto é o que vem depois:
            integrar, governar e operar todo dia. <strong>É exatamente a parte que a Fluxomind
            entrega.</strong>
          </p>
          <div className="herocta">
            <a className="btn btn-primary" href={PLATFORM_CONTACT}>
              {CTA.contact}
            </a>
            <a className="btn btn-ghost" href="#operado">
              Ver o que muda
            </a>
          </div>
          <div className="stat">
            <div className="s">
              <b>79%</b>
              <span>das empresas já adotaram agentes de IA (PwC, mai/2025)</span>
            </div>
            <div className="s">
              <b>11%</b>
              <span>os têm de fato implantados (KPMG, 2025)</span>
            </div>
            <div className="s">
              <b>construir ≠ operar</b>
              <span>o gap onde os pilotos morrem</span>
            </div>
          </div>
        </div>
      </header>

      {/* POR QUE OS PILOTOS MORREM */}
      <section id="por-que">
        <div className="wrap">
          <div className="center">
            <div className="kick">Por que os pilotos morrem</div>
            <h2>O piloto prova que a IA funciona. Não prova que ela opera.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Entre a demo e a produção aparecem três paredes — e nenhuma delas é o modelo.
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

      {/* NEGAÇÃO — a diferença de categoria */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              A diferença
            </div>
            <h2 style={{ color: '#fff', maxWidth: '24ch' }}>
              Não é mais um piloto para testar. É o processo entregue rodando.
            </h2>
            <ul
              style={{
                listStyle: 'none',
                marginTop: 26,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {NEGATION.nots.map((n) => (
                <li
                  key={n}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    color: '#A9AEB8',
                    fontSize: 16,
                  }}
                >
                  <span aria-hidden="true" style={{ color: '#e07a5f', fontWeight: 700 }}>
                    ✕
                  </span>
                  {n}
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: 22,
                fontSize: 19,
                color: '#fff',
                fontWeight: 600,
                maxWidth: '58ch',
                lineHeight: 1.55,
              }}
            >
              {NEGATION.is}
            </p>
          </div>
        </div>
      </section>

      {/* ENTREGUE OPERADO */}
      <section id="operado" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Entregue operado</div>
            <h2>O que chega na sua empresa já chega rodando</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Você não recebe uma ferramenta para o time aprender a usar. Recebe o processo em
              operação — e é assim que ele roda.
            </p>
          </div>
          <div className="ways">
            {OPERATED.map((o) => (
              <div className="way" key={o.title}>
                <div className="wi" aria-hidden="true">
                  {o.icon}
                </div>
                <h3>{o.title}</h3>
                <div className="tagm">{o.tag}</div>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="fitlink" style={{ textAlign: 'center' }}>
            <Link href="/seguranca">
              Como a governança e a segurança funcionam, em detalhe →
            </Link>
          </div>
        </div>
      </section>

      {/* MODELO DE ADOÇÃO */}
      <section id="modelo" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Modelo de adoção</div>
            <h2>Comece por um processo. Em semanas — não num projeto de meses.</h2>
          </div>
          <div className="timeline">
            <div className="tl">
              <div className="num">1</div>
              <h4>Um processo, acompanhado</h4>
              <p>
                Escolhemos juntos um processo que dói — cobrança, atendimento, aprovações. Nosso
                time acompanha do desenho à primeira conclusão real.
              </p>
            </div>
            <div className="tl">
              <div className="num">2</div>
              <h4>Prova no dia a dia</h4>
              <p>
                O app opera e a sua equipe vê cada conclusão com a prova — no processo de verdade,
                não em slide. É a evidência que o piloto nunca teve.
              </p>
            </div>
            <div className="tl">
              <div className="num">3</div>
              <h4>Expansão área a área</h4>
              <p>
                Provado o valor, outros processos entram. A governança segue central; cada área
                ganha o seu app operante.
              </p>
            </div>
          </div>
          <div className="honest">
            <b>Transparência.</b> {PHASE.exists.title}: {PHASE.exists.desc} Estamos em beta — a
            adoção acontece acompanhada de perto pelo nosso time; SLA formal e certificações estão
            no roadmap. {PHASE.vision.title}: {PHASE.vision.desc}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card" id="contato">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Vamos conversar
            </div>
            <h2>Traga o piloto que morreu. Saia com um processo operando.</h2>
            <p className="lead">
              Conte qual processo você quer delegar. Desenhamos com o seu time o primeiro app
              operante da sua empresa — e você acompanha cada conclusão, com a prova.
            </p>
            <div className="ctab">
              <a className="btn btn-primary" href={PLATFORM_CONTACT}>
                {CTA.contact}
              </a>
              <Link className="btn btn-ghost" href="/plataforma">
                Ver a avaliação técnica
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="O software se molda à empresa — e opera o processo." />
    </div>
  );
}
