import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_SIGNUP } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — O que tem: a potência por trás do simples',
  description:
    'Apps montados conversando, telas que se geram e evoluem, workflows, agentes próprios, ontologia, gestão de arquivos, WhatsApp e voz, API e MCP. Veja do que a plataforma é capaz.',
};

const FEATURES = [
  {
    icon: '🧱',
    title: 'Apps sob medida, montados conversando',
    desc: 'Descreva sua operação e a plataforma cria os objetos, os dados, as telas e os painéis. Sem template engessado, sem começar do zero — e sem escrever código.',
    tag: 'Criação de apps',
  },
  {
    icon: '🖥️',
    title: 'Telas que se geram — e evoluem',
    desc: 'Lista, formulário, ficha e busca aparecem prontos pra cada cadastro. Precisa mudar um campo, uma regra ou um layout? É só pedir, e a tela se ajusta na hora.',
    tag: 'Telas automáticas',
  },
  {
    icon: '🔀',
    title: 'Automação com workflows',
    desc: 'Aprovações em níveis, gatilhos e rotinas que rodam sozinhas — com você no circuito nas decisões que importam. O processo trabalha; você só decide o que precisa.',
    tag: 'Workflows',
  },
  {
    icon: '🤖',
    title: 'Seus próprios agentes',
    desc: 'Crie agentes que executam de verdade: cobram, respondem, organizam e dão o próximo passo. Não é chatbot que só conversa — é trabalho feito, sob suas regras.',
    tag: 'Agentes',
  },
  {
    icon: '🧠',
    title: 'Ontologia: ela entende o seu negócio',
    desc: 'Um cérebro semântico reconhece suas entidades, conecta os dados e enriquece o que você cadastra. Quanto mais você usa, mais inteligente a sua operação fica.',
    tag: 'Ontologia',
  },
  {
    icon: '📎',
    title: 'Gestão de arquivos',
    desc: 'Suba documentos e contratos; a plataforma organiza, extrai a informação e conecta tudo ao resto da sua operação — nada mais perdido em pastas e e-mails.',
    tag: 'Arquivos',
  },
  {
    icon: '💬',
    title: 'WhatsApp e voz',
    desc: 'A mesma operação no computador, no WhatsApp e por voz. Seu time opera de onde já está, no canal que já usa — sem aprender ferramenta nova.',
    tag: 'Canais',
  },
  {
    icon: '🔌',
    title: 'Conecta no que você já usa',
    desc: 'Por API e MCP, a Fluxomind vira uma capacidade dentro da sua stack e puxa dados de onde você precisa. Integra com o que existe, não substitui na marra.',
    tag: 'API & integrações',
  },
];

export default function OQueTem() {
  return (
    <div className="page-feats">
      <div className="note">
        Protótipo da vitrine de capacidades. Conteúdo demonstrativo.
      </div>

      <SiteHeader cta={{ label: 'Criar meu sistema grátis', href: PLATFORM_SIGNUP }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              O que tem
            </div>
            <h1>
              A potência <span className="g">por trás do simples.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '54ch' }}>
              Por fora, você só conversa. Por baixo, uma plataforma completa monta, automatiza e
              opera a sua operação inteira. Veja do que ela é capaz.
            </p>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section>
        <div className="wrap">
          <div className="feats">
            {FEATURES.map((f) => (
              <div className="featx" key={f.title}>
                <div className="fx">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="tag">{f.tag}</span>
              </div>
            ))}
          </div>

          <div className="center" style={{ marginTop: 46 }}>
            <p className="lead" style={{ marginBottom: 18 }}>
              É muita coisa — mas você só precisa conversar. A plataforma cuida do resto.
            </p>
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Criar meu sistema grátis
            </a>
            <div style={{ marginTop: 16 }}>
              <Link href="/plataforma" style={{ color: 'var(--blue)', fontWeight: 600 }}>
                Quer ver como tudo isso é construído e provado? Veja a plataforma por dentro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="A potência por trás do simples." />
    </div>
  );
}
