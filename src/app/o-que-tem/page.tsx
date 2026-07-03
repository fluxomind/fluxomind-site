import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import HexAgono360 from '@/components/HexAgono360';
import { CTA, FACES, SIGNATURE, type FaceKey } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'O que faz',
  description:
    'Todo app da Fluxomind responde seis perguntas do seu negócio — dados, telas, decisões, o dia a dia, integrações e permissões — e passa a operar assim que existe. Em semanas, não meses.',
};

// As 6 perguntas do seu app: redação canônica em src/lib/messages.ts (FACES).
// Aqui vive só o que é desta página: ícone e descrição de vitrine por face.
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const FACE_DETAILS: Record<FaceKey, { icon: ReactNode; desc: string }> = {
  dominio: {
    icon: (
      <svg {...ICON_PROPS}>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
      </svg>
    ),
    desc: 'Clientes, contratos, pedidos, tickets — os objetos do seu negócio, com campos e relações. Você descreve em português; a Fluxomind cria o modelo de dados, sem você desenhar uma tabela.',
  },
  experiencia: {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M3 9h18M8.5 21h7M12 17v4" />
      </svg>
    ),
    desc: 'Listas, formulários, fichas e painéis — gerados para cada cadastro e ajustados conversando. A mesma operação vira tela no computador, conversa no WhatsApp e voz.',
  },
  inteligencia: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
        <circle cx="18" cy="17.5" r="2" />
      </svg>
    ),
    desc: 'Agentes que executam de verdade — cobram, respondem, organizam — apoiados por um cérebro que entende o seu negócio e busca no seu conhecimento. Não é um chatbot que responde: é trabalho concluído.',
  },
  processo: {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="15" width="6" height="5" rx="1" />
        <path d="M6 9v4a3 3 0 0 0 3 3h6" />
      </svg>
    ),
    desc: 'O coração do app operante: automações e regras que rodam por evento, dado ou gatilho. O dia a dia acontece sem você — com aprovações nos pontos que importam.',
  },
  conexoes: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8.7 15.3l-2 2a3.5 3.5 0 0 1-5-5l2-2M15.3 8.7l2-2a3.5 3.5 0 0 1 5 5l-2 2M9 15l6-6" />
      </svg>
    ),
    desc: 'Conectores, API e MCP: o seu app puxa dados do que você já usa e ainda vira uma ferramenta dentro de outros sistemas. Integra — não substitui na marra.',
  },
  confianca: {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    desc: 'Papéis e permissões, isolamento de dados, mascaramento do que é sensível e trilha de auditoria — de fábrica, em todo app. E nos casos sensíveis, uma pessoa decide: o app escala para um humano.',
  },
};

const CARDS = FACES.map((f) => ({ ...f, ...FACE_DETAILS[f.key] }));

export default function OQueTem() {
  return (
    <div className="page-feats">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              O que faz
            </div>
            <h1>
              Um app, <span className="g">seis perguntas do seu negócio.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '58ch' }}>
              Todo app da Fluxomind nasce respondendo seis perguntas da sua operação. Você não monta
              módulo a módulo: descreve o problema, e ela esculpe o app inteiro — que não fica
              parado: <strong>passa a operar o dia a dia</strong>.
            </p>
            <div className="herocta" style={{ justifyContent: 'center', marginTop: 26 }}>
              <Link className="btn btn-primary" href="/demo">
                {CTA.demo}
              </Link>
              <a className="btn btn-ghost" href="#perguntas">
                Ver as seis perguntas
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HEXÁGONO 360 — a âncora visual das seis perguntas */}
      <section style={{ paddingTop: 8 }}>
        <div className="wrap">
          <HexAgono360 />
        </div>
      </section>

      {/* AS 6 PERGUNTAS */}
      <section id="perguntas">
        <div className="wrap">
          <div className="center">
            <div className="kick">As seis perguntas</div>
            <h2>O que o seu app responde</h2>
            <p className="lead" style={{ margin: '14px auto 0', maxWidth: '58ch' }}>
              Seis respostas, um app só — dados, telas, decisões, o dia a dia, integrações e
              permissões nascem juntos, da mesma conversa.
            </p>
          </div>

          <div className="feats" style={{ marginTop: 40 }}>
            {CARDS.map((f) => (
              <div className="featx" key={f.key}>
                <div className="fx">{f.icon}</div>
                <div className="area">{f.label}</div>
                <h3>{f.q}</h3>
                <p>{f.desc}</p>
                <span className="tag">{f.gloss}</span>
              </div>
            ))}
          </div>

          {/* OPERAR — o que separa existir de trabalhar */}
          <div className="center" style={{ marginTop: 46 }}>
            <p className="lead" style={{ maxWidth: '62ch', margin: '0 auto' }}>
              Duas dessas perguntas guardam o segredo: <strong>Processo</strong> faz o dia a dia
              rodar sem você, e <strong>Confiança</strong> garante que, no caso sensível, quem
              decide é uma pessoa. O seu app não só existe — <strong>ele opera</strong>. É a
              diferença entre um app que você usa e um app que trabalha para você.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link href="/seguranca" style={{ color: 'var(--blue)', fontWeight: 600 }}>
                Como a confiança é garantida →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* APP OPERANTE VS PROJETO GERADO */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="kick">Por que isso é diferente</div>
            <h2>Construir ficou fácil. Operar é o que falta.</h2>
            <p className="lead" style={{ margin: '14px auto 0', maxWidth: '60ch' }}>
              Qualquer IA hoje te entrega um protótipo — e, a partir daí, o código é seu para
              manter. A Fluxomind monta as seis respostas{' '}
              <strong>sobre uma plataforma que já está de pé</strong>, com dados, telas, governança
              e conexões prontos. O resultado é um app operante — <strong>em semanas, não meses</strong>.
            </p>
          </div>

          <div className="appvs">
            <div className="col bad">
              <h4>Projeto gerado por builder de código</h4>
              <ul>
                <li>Nasce do zero: código que vira sua responsabilidade para sempre.</li>
                <li>Multi-tenant, papéis e permissões? Você implementa — ou fica sem.</li>
                <li>Cada pedido novo é mais código colado; o drift é questão de tempo.</li>
                <li>Uma superfície só: o que virou web não vira WhatsApp nem voz sozinho.</li>
                <li>Construído, não operante: rodar o dia a dia continua sendo problema seu.</li>
              </ul>
            </div>
            <div className="col good">
              <h4>App operante Fluxomind</h4>
              <ul>
                <li>Montado sobre uma plataforma que já está de pé: zero código para você manter.</li>
                <li>Multi-tenancy, papéis e permissões herdados de fábrica, em todo app.</li>
                <li>Muda conversando — a mesma fonte da verdade, sem drift acumulado.</li>
                <li>A mesma operação vira tela, WhatsApp, voz e ferramenta via MCP.</li>
                <li>Opera o dia a dia e escala para um humano nos casos sensíveis.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="offer">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            O próximo passo
          </div>
          <h2>Quer isso respondendo pelo seu negócio?</h2>
          <p className="lead" style={{ maxWidth: '56ch', margin: '14px auto 0' }}>
            Entre na lista do beta e conte qual processo você quer delegar — o time monta o app com
            você. Ou fale direto com a gente.
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/#comecar" data-track="oquetem-beta-cta">
              {CTA.beta}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT}>
              {CTA.contact}
            </a>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link href="/plataforma" style={{ color: 'var(--sky)', fontWeight: 600 }}>
              Quer ver como tudo isso é construído e provado? Veja a plataforma por dentro →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
