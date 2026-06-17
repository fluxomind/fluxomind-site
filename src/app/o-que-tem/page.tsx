import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_WAITLIST } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — O que tem: um app, seis faces da sua operação',
  description:
    'Todo app da Fluxomind responde seis perguntas do seu negócio: domínio, experiência, inteligência, processo, conexões e confiança. Você descreve, e ela esculpe.',
};

// As 6 perguntas de cliente (App 360) — eixo comercial canônico do _product2.
// (No técnico isso se chama "dimensões"; aqui, NUNCA — é linguagem de cliente.)
const FACES = [
  {
    icon: '🗄️',
    area: 'Domínio',
    q: 'O que meu negócio guarda?',
    desc: 'Seus clientes, contratos, pedidos, tickets — os objetos do seu negócio, com campos e relações. Você descreve em português; ela cria o modelo de dados, sem você desenhar tabela.',
    tag: 'Objetos · campos · relações',
  },
  {
    icon: '🖥️',
    area: 'Experiência',
    q: 'O que as pessoas veem e fazem?',
    desc: 'Listas, formulários, fichas e painéis — gerados pra cada cadastro e ajustados conversando. A mesma operação vira tela no computador e conversa no WhatsApp e na voz.',
    tag: 'Telas · painéis · WhatsApp · voz',
  },
  {
    icon: '🧠',
    area: 'Inteligência',
    q: 'O que ele pensa e me ajuda a fazer?',
    desc: 'Agentes que executam de verdade — cobram, respondem, organizam — apoiados por um cérebro que entende o seu negócio e busca no seu conhecimento. Não é chatbot: é trabalho feito.',
    tag: 'Agentes · copilots · conhecimento (RAG)',
  },
  {
    icon: '🔀',
    area: 'Processo',
    q: 'O que acontece sozinho?',
    desc: 'Automações, fluxos e regras que rodam por evento, dado ou gatilho — com aprovações em níveis e você no circuito nas decisões que importam.',
    tag: 'Automações · fluxos · aprovações',
  },
  {
    icon: '🔌',
    area: 'Conexões',
    q: 'Com o que ele conversa?',
    desc: 'Conectores, APIs e MCP: a Fluxomind puxa dados do que você já usa e ainda vira uma ferramenta dentro de outros sistemas. Integra, não substitui na marra.',
    tag: 'Conectores · API · MCP',
  },
  {
    icon: '🛡️',
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

      <SiteHeader cta={{ label: 'Pedir acesso', href: PLATFORM_WAITLIST }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              O que tem
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
            <a className="btn btn-primary btn-lg" href={PLATFORM_WAITLIST}>
              Pedir acesso ao beta
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
