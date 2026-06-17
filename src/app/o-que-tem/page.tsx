import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import HexAgono360 from '@/components/HexAgono360';
import { PLATFORM_SIGNUP } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — O que faz: um app, seis faces da sua operação',
  description:
    'Todo app da Fluxomind responde seis perguntas do seu negócio: domínio, experiência, inteligência, processo, conexões e confiança. Você descreve, e ela esculpe.',
};

// As 6 perguntas de cliente (App 360) — eixo comercial canônico do _product2.
// (No técnico isso se chama "dimensões"; aqui, NUNCA — é linguagem de cliente.)
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const FACES = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
      </svg>
    ),
    area: 'Domínio',
    q: 'O que meu negócio guarda?',
    desc: 'Seus clientes, contratos, pedidos, tickets — os objetos do seu negócio, com campos e relações. Você descreve em português; ela cria o modelo de dados, sem você desenhar tabela.',
    tag: 'Objetos · campos · relações',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M3 9h18M8.5 21h7M12 17v4" />
      </svg>
    ),
    area: 'Experiência',
    q: 'O que as pessoas veem e fazem?',
    desc: 'Listas, formulários, fichas e painéis — gerados pra cada cadastro e ajustados conversando. A mesma operação vira tela no computador e conversa no WhatsApp e na voz.',
    tag: 'Telas · painéis · WhatsApp · voz',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
        <circle cx="18" cy="17.5" r="2" />
      </svg>
    ),
    area: 'Inteligência',
    q: 'O que ele pensa e me ajuda a fazer?',
    desc: 'Agentes que executam de verdade — cobram, respondem, organizam — apoiados por um cérebro que entende o seu negócio e busca no seu conhecimento. Não é chatbot: é trabalho feito.',
    tag: 'Agentes · copilots · conhecimento (RAG)',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="15" width="6" height="5" rx="1" />
        <path d="M6 9v4a3 3 0 0 0 3 3h6" />
      </svg>
    ),
    area: 'Processo',
    q: 'O que acontece sozinho?',
    desc: 'Automações, fluxos e regras que rodam por evento, dado ou gatilho — com aprovações em níveis e você no circuito nas decisões que importam.',
    tag: 'Automações · fluxos · aprovações',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8.7 15.3l-2 2a3.5 3.5 0 0 1-5-5l2-2M15.3 8.7l2-2a3.5 3.5 0 0 1 5 5l-2 2M9 15l6-6" />
      </svg>
    ),
    area: 'Conexões',
    q: 'Com o que ele conversa?',
    desc: 'Conectores, APIs e MCP: a Fluxomind puxa dados do que você já usa e ainda vira uma ferramenta dentro de outros sistemas. Integra, não substitui na marra.',
    tag: 'Conectores · API · MCP',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    area: 'Confiança',
    q: 'Quem usa, e o que cada um pode?',
    desc: 'Papéis e permissões, compartilhamento governado, mascaramento de dados sensíveis e trilha de auditoria. Governança não é add-on — vem de fábrica.',
    tag: 'Permissões · sharing · auditoria',
  },
];

export default function OQueTem() {
  return (
    <div className="page-feats">
      <div className="note">
        Protótipo da vitrine de capacidades. Conteúdo demonstrativo.
      </div>

      <SiteHeader cta={{ label: 'Criar meu sistema', href: PLATFORM_SIGNUP }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              O que faz
            </div>
            <h1>
              Um app, <span className="g">seis faces da sua operação.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '56ch' }}>
              Todo app da Fluxomind responde seis perguntas do seu negócio. Você não monta as faces
              uma a uma: descreve o que precisa, e ela esculpe — composição viva, não ilhas de
              código.
            </p>
          </div>
        </div>
      </header>

      {/* HEXÁGONO 360 — a visão viva das 6 faces */}
      <section style={{ paddingTop: 8 }}>
        <div className="wrap">
          <HexAgono360 />
        </div>
      </section>

      {/* APP VS PROJETO GERADO — o que torna isso diferente */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="kick">Por que isso é diferente</div>
            <h2>
              Não é um projeto de código. <span className="g">É um app que vive na plataforma.</span>
            </h2>
            <p className="lead" style={{ margin: '14px auto 0', maxWidth: '60ch' }}>
              Ferramentas de gerar código entregam um projeto que <em>nasce do zero</em> — e a partir
              daí é seu pra manter. A Fluxomind não gera as seis faces como código solto: ela as{' '}
              <strong>monta sobre uma plataforma que já está de pé</strong>, com dados, telas,
              governança e conexões prontos. Você muda conversando; nada apodrece em código órfão.
            </p>
          </div>

          <div className="appvs">
            <div className="col bad">
              <h4>Projeto gerado (Lovable, v0, Bolt)</h4>
              <ul>
                <li>Nasce do zero: código que vira sua responsabilidade pra sempre.</li>
                <li>Multi-tenant, papéis e permissões? Você implementa — ou fica sem.</li>
                <li>Cada pedido novo é mais código colado; o drift é questão de tempo.</li>
                <li>Uma superfície só: o que virou web não vira WhatsApp nem voz sozinho.</li>
                <li>Integrações e auditoria por sua conta, fora do que foi gerado.</li>
              </ul>
            </div>
            <div className="col good">
              <h4>App Fluxomind</h4>
              <ul>
                <li>Montado sobre uma plataforma que já está de pé: zero código pra você manter.</li>
                <li>Multi-tenancy, papéis e permissões herdados de fábrica, em todo app.</li>
                <li>Muda conversando — a mesma fonte da verdade, sem drift acumulado.</li>
                <li>A mesma operação vira tela, WhatsApp, voz e ferramenta via MCP.</li>
                <li>Conexões, mascaramento e trilha de auditoria já vêm no chão.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AS 6 FACES */}
      <section>
        <div className="wrap">
          <div className="feats">
            {FACES.map((f) => (
              <div className="featx" key={f.area}>
                <div className="fx">{f.icon}</div>
                <div className="area">{f.area}</div>
                <h3>{f.q}</h3>
                <p>{f.desc}</p>
                <span className="tag">{f.tag}</span>
              </div>
            ))}
          </div>

          <div className="center" style={{ marginTop: 46 }}>
            <p className="lead" style={{ marginBottom: 18 }}>
              Seis faces, um app — e você só precisa conversar. A plataforma cuida do resto.
            </p>
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Criar meu sistema
            </a>
            <div style={{ marginTop: 16 }}>
              <Link href="/plataforma" style={{ color: 'var(--blue)', fontWeight: 600 }}>
                Quer ver como tudo isso é construído e provado? Veja a plataforma por dentro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Delegue a tarefa. Receba a conclusão com a prova." />
    </div>
  );
}
