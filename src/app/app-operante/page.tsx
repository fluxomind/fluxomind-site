import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, NEGATION, FACES, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'O que é um app operante? — a categoria explicada',
  description:
    'App operante é um app que se constrói a partir do seu problema, opera o dia a dia do processo — e escala para um humano quando o caso exige. Entenda a categoria: as 6 perguntas, a negação tripla e a diferença para chatbots e builders.',
  alternates: {
    canonical: '/app-operante',
    languages: { 'pt-BR': '/app-operante', en: '/en/self-operating-app' },
  },
};

// Página da categoria — o ativo GEO central: a definição canônica de
// "app operante", termo que a Fluxomind cunha. Formato editorial-tech (fx):
// definição na primeira dobra, negação tripla, as 6 perguntas, FAQ.
// Preserva DefinedTerm + FAQPage JSON-LD. Toda a copy vem da redação
// canônica (src/lib/messages.ts + a DEFINICAO local) — não inventa claim.

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
    q: 'O que significa “se opera sozinho”?',
    a: 'O dia a dia do processo — acompanhar, preparar, executar o rotineiro — roda sem depender de alguém lembrar. Nada crítico sai sem o seu OK, e cada conclusão chega com a prova do que foi feito.',
  },
  {
    q: 'Isso já existe ou é visão?',
    a: 'A plataforma já existe — 39 engines que materializam e operam apps de verdade, multi-tenant, governada. Estamos em beta privado, com o lançamento aberto em breve: a adoção acontece acompanhada de perto pelo nosso time, em semanas, não num projeto de meses.',
  },
];

// FAQPage JSON-LD — espelha a seção de FAQ renderizada abaixo (mesma fonte).
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// DefinedTerm JSON-LD — o ativo a ser citado quando IAs definirem o termo.
const TERM_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'app operante',
  description: DEFINICAO,
  url: 'https://www.fluxomind.com/app-operante',
};

export default function AppOperante() {
  return (
    <div className="fx">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERM_JSONLD) }}
      />
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/self-operating-app" />

      {/* HERO — a definição canônica em destaque (GEO) */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap fx-narrow">
          <span className="fx-pill">Termo cunhado pela Fluxomind</span>
          <p className="fx-eyebrow">app operante · a categoria</p>
          <h1 className="fx-serif fx-h1">
            O que é um <span className="fx-em">app operante</span>?
          </h1>
          <p className="fx-lead">{DEFINICAO}</p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/demo" data-track="app-operante-demo-cta">
              {CTA.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/casos-de-uso">
              Ver casos de uso
            </Link>
          </div>
        </div>
      </header>

      {/* NEGAÇÃO TRIPLA — o que ele não é, e o que ele é */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O que ele não é</p>
          <h2 className="fx-serif fx-h2">
            Três coisas que ele não é — e uma que ele <span className="fx-em">é</span>.
          </h2>
          <ul className="fx-list">
            {NEGATION.nots.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="fx-quote fx-mt">{NEGATION.is}</p>
        </div>
      </section>

      {/* AS 6 PERGUNTAS — a anatomia da categoria */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">A anatomia</p>
            <h2 className="fx-serif fx-h2">As 6 perguntas que todo app operante responde</h2>
            <p className="fx-body">
              Um app operante não é um monte de telas: é a resposta, em software vivo, a seis
              perguntas sobre o seu negócio.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {FACES.map((f) => (
              <div className="fx-card" key={f.key}>
                <span className="fx-label">{f.label}</span>
                <h3>{f.q}</h3>
                <p>{f.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — espelha o FAQPage JSON-LD */}
      <section className="fx-sec fx-sec-alt" id="faq">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Dúvidas comuns</p>
          <h2 className="fx-serif fx-h2">O que costumam perguntar sobre a categoria</h2>
          <div className="fx-faq">
            {FAQ.map((f) => (
              <div className="fx-qa" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="fx-fineprint fx-mt">
            Atualizado em julho de 2026 · <Link href="/casos-de-uso">casos de uso</Link> ·{' '}
            <Link href="/o-que-tem">o que o app responde</Link>
          </p>
        </div>
      </section>

      {/* CTA — ver a categoria ao vivo e entrar no beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-center fx-tc">
          <p className="fx-eyebrow">O próximo passo</p>
          <h2 className="fx-serif fx-h2">A melhor definição é ver um nascer.</h2>
          <p className="fx-lead fx-center">
            Na demonstração, um app operante se constrói na sua frente — da planilha ao processo
            rodando, com você aprovando o que vê. Gostou? Entre no beta privado.
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/demo" data-track="app-operante-demo-cta">
              {CTA.demo}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/#comecar" data-track="app-operante-beta-cta">
              {CTA.beta}
            </Link>
          </div>
          <div className="fx-scar">Beta privado · sem cartão para começar · em semanas, não meses</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
