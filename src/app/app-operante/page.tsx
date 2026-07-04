import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PROMISE, NEGATION, FACES, TRUST_RULES, PHASE, PURPOSE_LINE, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'O que é um app operante? — a categoria explicada',
  description:
    'App operante é um app que se constrói a partir do seu problema, opera o dia a dia do processo — e escala para um humano quando o caso exige. Entenda a categoria: as 6 perguntas, as 5 regras da confiança e a diferença para chatbots e builders.',
};

// Página da categoria — o ativo GEO central: a definição canônica de
// "app operante", termo que a Fluxomind cunha. Formato: definição na
// primeira frase, seções autocontidas, FAQ + FAQPage e DefinedTerm JSON-LD.
// Toda a copy vem de src/lib/messages.ts (redação canônica do message
// house) — esta página não inventa claim.

const DEFINICAO =
  'Um app operante é um app que se constrói a partir do seu problema, opera o dia a dia do processo — e escala para um humano quando o caso exige. É a terceira categoria de software, entre o sistema rígido que obriga a empresa a se adaptar e a consultoria humana que não escala: o software que se molda à empresa e trabalha por ela.';

const FAQ = [
  {
    q: 'O que é um app operante?',
    a: DEFINICAO,
  },
  {
    q: 'É um chatbot?',
    a: 'Não é um chatbot que responde. O app operante entende o pedido e resolve — executa o processo, registra e mostra a prova. A conversa é o meio; o processo resolvido é o fim.',
  },
  {
    q: 'Qual a diferença para um builder de código ou no-code genérico?',
    a: 'Construir ficou fácil — qualquer IA te entrega um protótipo. O builder para aí: você recebe código ou telas para manter e operar sozinho. O app operante entrega o processo rodando: opera o dia a dia, evolui por conversa e chama um humano nos casos sensíveis.',
  },
  {
    q: 'Preciso saber programar?',
    a: 'Não. Você descreve o problema em português; o app se constrói e, para mudar, você conversa. Sem dev no caminho.',
  },
  {
    q: 'O que significa "se opera sozinho"?',
    a: 'O dia a dia do processo — acompanhar, preparar, executar o rotineiro — roda sem depender de alguém lembrar. Nada crítico sai sem o seu OK, e cada conclusão chega com a prova do que foi feito.',
  },
  {
    q: 'Isso já existe ou é visão?',
    a: 'A plataforma já existe — 39 engines que materializam e operam apps de verdade, multi-tenant, governada. Estamos em beta: a adoção acontece acompanhada de perto pelo nosso time, em semanas, não num projeto de meses.',
  },
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const TERM_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'app operante',
  description: DEFINICAO,
  url: 'https://www.fluxomind.com/app-operante',
};

export default function AppOperante() {
  return (
    <div className="page-ent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERM_JSONLD) }}
      />
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} />

      {/* HERO — definição na primeira frase (GEO) */}
      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">app operante · a categoria</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE}</div>
          <h1 style={{ maxWidth: '22ch' }}>O que é um app operante?</h1>
          <p className="hsub">{DEFINICAO}</p>
          <div className="herocta">
            <Link className="btn btn-primary" href="/demo" data-track="app-operante-demo-cta">
              {CTA.demo}
            </Link>
            <Link className="btn btn-ghost" href="/casos-de-uso">
              Ver casos de uso
            </Link>
          </div>
        </div>
      </header>

      {/* POR QUE A CATEGORIA EXISTE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Por que essa categoria existe</div>
            <h2 style={{ maxWidth: '30ch', margin: '0 auto' }}>{PURPOSE_LINE}</h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: '62ch', marginLeft: 'auto', marginRight: 'auto' }}>
              {PROMISE} Construir ficou fácil — qualquer IA te entrega um protótipo.{' '}
              <strong>Operar é o que falta</strong>, e é exatamente o que um app operante entrega.
            </p>
          </div>
        </div>
      </section>

      {/* NEGAÇÃO TRIPLA */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              O que ele não é
            </div>
            <ul
              style={{ listStyle: 'none', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {NEGATION.nots.map((n) => (
                <li
                  key={n}
                  style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#A9AEB8', fontSize: 16 }}
                >
                  <span aria-hidden="true" style={{ color: '#e07a5f', fontWeight: 700 }}>✕</span>
                  {n}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 22, fontSize: 19, color: '#fff', fontWeight: 600, maxWidth: '58ch', lineHeight: 1.55 }}>
              {NEGATION.is}
            </p>
          </div>
        </div>
      </section>

      {/* AS 6 PERGUNTAS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">A anatomia</div>
            <h2>As 6 perguntas que todo app operante responde</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Um app operante não é um monte de telas: é a resposta, em software vivo, a seis
              perguntas sobre o seu negócio.
            </p>
          </div>
          <div className="ways">
            {FACES.map((f) => (
              <div className="way" key={f.key}>
                <div className="tagm">{f.label}</div>
                <h3 style={{ marginTop: 8 }}>{f.q}</h3>
                <p style={{ marginTop: 6 }}>{f.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AS 5 REGRAS DA CONFIANÇA */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">A confiança</div>
            <h2>As 5 regras que tornam a operação confiável</h2>
          </div>
          <div className="ways">
            {TRUST_RULES.map((r) => (
              <div className="way" key={r.title}>
                <h3>{r.title}</h3>
                <p style={{ marginTop: 6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Dúvidas comuns</div>
            <h2>O que costumam perguntar sobre a categoria</h2>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <div className="qa" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARÊNCIA DE FASE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <b>Transparência.</b> {PHASE.exists.title}: {PHASE.exists.desc}{' '}
            {PHASE.next.title}: {PHASE.next.desc} {PHASE.vision.title}: {PHASE.vision.desc}
          </div>
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13.5, color: 'var(--slate)' }}>
            Atualizado em julho de 2026 ·{' '}
            <Link href="/casos-de-uso">casos de uso</Link> ·{' '}
            <Link href="/o-que-tem">o que o app responde</Link>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Veja a categoria ao vivo
            </div>
            <h2>A melhor definição é ver um nascer</h2>
            <p className="lead">
              Na demonstração interativa, um app operante se constrói na sua frente — da
              planilha ao processo rodando, com você aprovando o que vê.
            </p>
            <div className="ctab">
              <Link className="btn btn-primary" href="/demo" data-track="app-operante-demo-cta">
                {CTA.demo}
              </Link>
              <Link className="btn btn-ghost" href="/#comecar" data-track="app-operante-beta-cta">
                {CTA.beta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
