import Link from 'next/link';
import type { Metadata } from 'next';
import BetaForm from '@/components/BetaForm';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PHASE, CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: { absolute: 'Fluxomind — app que trabalha para o seu negócio, não o contrário' },
  description:
    'O negócio que se opera sozinho. Uma IA que atende, cobra e organiza no seu WhatsApp — 24/7 — e te prova o trabalho em reais. Você delega a tarefa, não dirige mais um software. Beta privado.',
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/', en: '/en' },
  },
};

// Assinatura canônica (messages.ts), com destaque na segunda frase.
const SIG_BREAK = SIGNATURE.indexOf(' — ');
const SIG_HEAD = SIGNATURE.slice(0, SIG_BREAK); // "App que trabalha para o seu negócio"
const SIG_TAIL = SIGNATURE.slice(SIG_BREAK + 3).replace(/\.$/, ''); // "não o contrário"

const PHASE_CARDS = [
  { badge: 'b-impl', ...PHASE.exists },
  { badge: 'b-parc', ...PHASE.next },
  { badge: 'b-road', ...PHASE.vision },
];

// FAQPage JSON-LD — espelha a seção de FAQ abaixo (sem publicar preço).
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Preciso saber programar ou dirigir um sistema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Você delega a tarefa em português, no WhatsApp. O app opera sozinho e, para mudar algo, você conversa. Sem menus, sem projeto, sem dev.',
      },
    },
    {
      '@type': 'Question',
      name: 'A IA vai agir sozinha com os meus clientes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Só até onde você deixar. A autonomia se conquista: ela observa, sugere, depois age dentro da alçada que você define — e, num incidente, volta sozinha a pedir aprovação. Como um bom funcionário, ninguém dá o talão de cheques no primeiro dia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vou ter que largar minha planilha ou meu WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O app absorve o que você já usa — planilhas, WhatsApp, seus sistemas — e devolve uma operação só, governada. Continue trabalhando do seu jeito; agora o seu jeito trabalha sozinho.',
      },
    },
    {
      '@type': 'Question',
      name: 'Meus dados ficam seguros?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada empresa fica isolada de verdade, os dados são criptografados e toda ação fica numa trilha à prova de adulteração — governança de nível enterprise, já em produção.',
      },
    },
    {
      '@type': 'Question',
      name: 'Em quanto tempo estou rodando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A plataforma está em beta privado. Os primeiros da lista entram com o time acompanhando de perto — o primeiro app a gente monta com você, sem cartão para começar.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en" />

      {/* 01 — HERO: a promessa, operando ao vivo */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-grid">
          <div className="fx-hero-copy">
            <span className="fx-pill">
              <span className="fx-lz" /> Beta privado · primeiras vagas neste trimestre
            </span>
            <p className="fx-eyebrow">O negócio que se opera sozinho</p>
            <h1 className="fx-serif fx-h1">
              {SIG_HEAD} — <span className="fx-em">{SIG_TAIL}</span>.
            </h1>
            <p className="fx-sub">
              Você delega a tarefa; a IA <strong>atende, cobra e organiza</strong> no seu
              WhatsApp — 24/7 — e te presta contas em reais. Sem virar operador de mais um
              software.
            </p>
            <div className="fx-cta-row">
              <a className="fx-btn fx-btn-primary" href="#comecar" data-track="hero-beta">
                Entrar no beta
              </a>
              <Link className="fx-btn fx-btn-ghost" href="/demo" data-track="hero-demo">
                Ver operando →
              </Link>
            </div>
            <div className="fx-reassure">
              <span>Sem cartão para começar</span>
              <span>A prova na tela, em reais</span>
              <span>Você aprova o que é sensível</span>
            </div>
          </div>

          {/* Feed de resultados — o produto é a demo (ilustração animada) */}
          <div className="fx-feedwrap" aria-hidden="true">
            <div className="fx-phone">
              <div className="fx-phone-top">
                <span className="fx-av" />
                <span className="fx-who">
                  <b>Loja da Ana</b>
                  <span><i /> Fluxomind operando · agora</span>
                </span>
                <span className="fx-exlabel">exemplo</span>
              </div>
              <div className="fx-thread">
                <div className="fx-bub fx-in">Oi! Ainda tem o vestido azul no tam M? 👗</div>
                <div className="fx-bub fx-out">
                  Tenho sim, Camila! Fica R$ 189 com frete grátis hoje. Reservo e te mando o Pix?
                </div>
                <div className="fx-bub fx-in">Quero! 🙌</div>
              </div>
              <div className="fx-run">
                <div className="fx-r"><span className="fx-st done">Feito</span> Respondeu a cliente <time>23:47</time></div>
                <div className="fx-r"><span className="fx-st done">Feito</span> Pedido registrado <time>23:48</time></div>
                <div className="fx-r"><span className="fx-st pay">Pago</span> Pix confirmado · R$ 189 <time>23:52</time></div>
              </div>
              <div className="fx-receipt">
                <div className="fx-rh">Briefing da semana</div>
                <div className="fx-rbig fx-serif">R$ 12.480 <span>recuperados</span></div>
                <div className="fx-rsub">custo do app: R$ 594 · retorno: <b>21×</b> · 0 clientes sem resposta</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 02 — O JOGO ANTIGO: a dor com nome */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O problema</p>
          <h2 className="fx-serif fx-h2">
            O mundo todo testou IA. Quase ninguém conseguiu fazer ela <span className="fx-em">trabalhar</span>.
          </h2>
          <div className="fx-gap">
            <div className="fx-gapn">
              <b className="fx-serif">62%</b>
              <span>das empresas já experimentam agentes de IA</span>
            </div>
            <div className="fx-gaparrow">→</div>
            <div className="fx-gapn">
              <b className="fx-serif">23%</b>
              <span>conseguem colocá-los para operar de verdade</span>
            </div>
          </div>
          <p className="fx-body">
            O resto virou piloto abandonado — mais uma ferramenta que alguém precisa dirigir.
            Porque o problema nunca foi construir. É <strong>operar</strong>. Você comprou
            software e virou o operador dele: a planilha, o WhatsApp, o ChatGPT colado — cada um
            com a sua versão da verdade, e nada rodando sozinho.
          </p>
        </div>
      </section>

      {/* 03 — O JOGO NOVO: conhecimento operante (a tríade) */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">A virada</p>
            <h2 className="fx-serif fx-h2">
              A gente não te dá outra ferramenta. Entrega o <span className="fx-em">trabalho feito</span>.
            </h2>
            <p className="fx-body">
              Três coisas que nenhum software cumpre — e que fazem você delegar sem medo:
            </p>
          </div>
          <div className="fx-tri">
            <div className="fx-tricard">
              <span className="fx-trilabel">Delego, não configuro</span>
              <h3 className="fx-serif">A vida inteira cabe em 3 mensagens</h3>
              <p>Briefing, aprovação, exceção — no WhatsApp. Não existe um 4º tipo de interação. Sua atenção é finita, e o sistema respeita isso.</p>
              <code className="fx-code">briefing · aprovação · exceção</code>
            </div>
            <div className="fx-tricard">
              <span className="fx-trilabel">Autonomia se conquista</span>
              <h3 className="fx-serif">Como um bom funcionário</h3>
              <p>Observa, sugere, age dentro da sua alçada, ganha autonomia. Em linguagem de dono — “desconto até 5% sem me perguntar” — e volta a pedir OK num incidente.</p>
              <code className="fx-code">observa → sugere → age → autopilot</code>
            </div>
            <div className="fx-tricard">
              <span className="fx-trilabel">Prova em reais</span>
              <h3 className="fx-serif">Me mostra que fez</h3>
              <p>Cada ação registrada em três camadas: o que propôs, o que você decidiu e o que aconteceu no mundo. Sem a terceira, mede-se obediência, não trabalho.</p>
              <code className="fx-code">propôs · você decidiu · aconteceu</code>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — A PROVA: o dogfood + a fatura com o múltiplo */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A prova</p>
          <h2 className="fx-serif fx-h2">
            A prova mora na <span className="fx-gold">fatura</span> — não no slide.
          </h2>
          <p className="fx-body">
            Todo mês, um briefing no seu WhatsApp: o que foi feito e o retorno em reais —
            <strong> R$ gerado ÷ custo do app</strong>. Nenhum funcionário te manda o relatório
            do próprio custo-benefício. Nenhum software mede o que você deixou de ganhar.
            Funcionalidade se copia; fatura não.
          </p>
          <p className="fx-body">
            E começamos por nós. A Fluxomind opera o próprio comercial dentro do produto — somos
            o <strong>cliente nº 0</strong>. A gente opera o nosso negócio com isso antes de
            pedir que você opere o seu.
          </p>
        </div>
      </section>

      {/* 05 — POR QUE AGORA */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Por que agora</p>
            <h2 className="fx-serif fx-h2">A janela é agora — e é estreita.</h2>
          </div>
          <div className="fx-stats">
            <div className="fx-stat">
              <b className="fx-serif">~10×<span>/ano</span></b>
              <span>a queda no custo da IA que move tudo</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">82%</b>
              <span>das pequenas empresas já vivem no WhatsApp</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">9 mi</b>
              <span>de CNPJs no vermelho — a dor de receber em recorde</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">9–18<span> meses</span></b>
              <span>a janela da categoria antes de alguém fechá-la</span>
            </div>
          </div>
          <p className="fx-body fx-narrow">
            A tecnologia destravou, a demanda se provou e o seu cliente já está no WhatsApp — a
            maré está subindo. Quem transformar “testar IA” em “IA operando” ganha a categoria.
          </p>
        </div>
      </section>

      {/* 06 — POR QUE A GENTE */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Por que a gente</p>
            <h2 className="fx-serif fx-h2">Capacidade de gente grande. Simplicidade de WhatsApp.</h2>
            <p className="fx-body">
              <em>Enterprise-grade by design, SMB-first by choice.</em> Isolamento por empresa,
              trilha à prova de adulteração e controle de custo já em produção — a governança de
              uma corporação, entregue ao dono de PME que não é técnico. Construída por um time
              enxuto de 6 + um harness de IA, por quem já fundou, escalou e vendeu uma empresa de
              tecnologia.
            </p>
          </div>
          <div className="fx-phase">
            {PHASE_CARDS.map((c) => (
              <div className="fx-pcard" key={c.title}>
                <span className={`fx-badge ${c.badge}`}>
                  <span className="fx-d" /> {c.title}
                </span>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="fx-fineprint fx-narrow">
            Fato, lacuna e aposta — sem confundir os três. É assim que preferimos te contar.
          </p>
        </div>
      </section>

      {/* 07 — MANIFESTO */}
      <section className="fx-sec fx-manifesto">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Manifesto</p>
          <p className="fx-serif fx-manifesto-line">
            Software de verdade não é o que você <span className="fx-strike">compra e ainda tem que operar</span>.
            É o que <span className="fx-em">trabalha por você</span> — e te presta contas.
          </p>
          <p className="fx-body">
            Somos contra o painel que ninguém abre. Contra o projeto de meses. Contra a IA que
            responde mas não resolve. Todo negócio merece uma operação de primeira — não só as
            grandes, com time e sistema caro.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Dúvidas comuns</p>
          <h2 className="fx-serif fx-h2">O que costumam perguntar</h2>
          <div className="fx-faq">
            <div className="fx-qa">
              <h4>Preciso saber programar ou dirigir um sistema?</h4>
              <p>Não. Você delega a tarefa em português, no WhatsApp. O app opera sozinho e, para mudar algo, você conversa. Sem menus, sem projeto, sem dev.</p>
            </div>
            <div className="fx-qa">
              <h4>A IA vai agir sozinha com os meus clientes?</h4>
              <p>Só até onde você deixar. A autonomia se conquista: ela observa, sugere, depois age dentro da alçada que você define — e, num incidente, volta sozinha a pedir aprovação.</p>
            </div>
            <div className="fx-qa">
              <h4>Vou ter que largar minha planilha ou meu WhatsApp?</h4>
              <p>Não. O app absorve o que você já usa e devolve uma operação só, governada. Continue trabalhando do seu jeito; agora o seu jeito trabalha sozinho.</p>
            </div>
            <div className="fx-qa">
              <h4>Meus dados ficam seguros?</h4>
              <p>Cada empresa fica isolada de verdade, os dados são criptografados e toda ação fica numa trilha à prova de adulteração — governança de nível enterprise, já em produção.</p>
            </div>
            <div className="fx-qa">
              <h4>Em quanto tempo estou rodando?</h4>
              <p>A plataforma está em beta privado. Os primeiros da lista entram com o time acompanhando — o primeiro app a gente monta com você, sem cartão para começar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CTA: clube de fundadores (captura primária) */}
      <section className="fx-sec fx-offer" id="comecar">
        <div className="fx-wrap fx-narrow" style={{ textAlign: 'center' }}>
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>O próximo passo</p>
          <h2 className="fx-serif fx-h2">Entre para o beta privado.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '54ch' }}>
            Primeiras vagas neste trimestre. Conte a operação que você quer tirar das costas — os
            primeiros da fila entram já no beta, com o time montando o primeiro app com você.
          </p>
          <BetaForm />
          <div className="fx-offerbtns">
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT} data-track="home-contact">
              Prefere conversar antes? {CTA.contact}
            </a>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão · em semanas, não meses</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
