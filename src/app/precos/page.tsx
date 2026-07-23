import Link from 'next/link';
import type { Metadata } from 'next';
import BetaForm from '@/components/BetaForm';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Acesso ao beta',
  description:
    'A Fluxomind está em beta privado — o lançamento aberto vem em breve. O acesso é acompanhado e começa sem cartão: você entra pela lista, o time monta com você o primeiro app operante. O preço público chega no lançamento.',
  alternates: {
    canonical: '/precos',
    languages: { 'pt-BR': '/precos', en: '/en/pricing' },
  },
};

// FAQPage JSON-LD — espelha a seção de FAQ abaixo. Sem publicar preço.
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Preciso de cartão para começar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Durante o beta não existe cobrança nem cartão. Você entra pela lista de lançamento e o acesso é acompanhado — o time monta com você o primeiro app operante.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto vai custar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O preço público chega no lançamento. As faixas estão sendo definidas com os primeiros clientes do beta; preferimos não publicar um número que ainda pode mudar. Prova, não promessa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona depois do beta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O desenho é simples: uma fatura só, em reais, com os modelos de IA já inclusos — sem você gerir contas, chaves e limites de provedor. Os valores a gente publica no lançamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sou uma empresa maior — como é a adoção?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com o time do seu lado: isolamento dedicado, governança e onboarding guiado. Veja como funciona em Acelere ou fale com o time.',
      },
    },
  ],
};

const STEPS = [
  {
    label: '01 · Você entra pela lista',
    title: 'Beta privado, por convite',
    desc: 'Você descreve a operação que quer tirar das costas e entra pela lista de lançamento — os primeiros da fila entram já. Sem cartão para começar.',
  },
  {
    label: '02 · O time monta com você',
    title: 'Acesso acompanhado',
    desc: 'O primeiro app operante a gente monta lado a lado, no seu processo. Você não configura nada sozinho num painel — o time entra junto.',
  },
  {
    label: '03 · Ele passa a operar',
    title: 'Trabalho feito, prestando contas',
    desc: 'O app assume o dia a dia e te mostra o que fez, em reais. Você aprova o que é sensível; o resto roda sozinho.',
  },
];

export default function Precos() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/pricing" />

      {/* HERO */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in fx-narrow">
          <span className="fx-pill">
            <span className="fx-lz" /> Beta privado · lançamento aberto em breve
          </span>
          <p className="fx-eyebrow">Acesso ao beta</p>
          <h1 className="fx-serif fx-h1">
            O acesso começa <span className="fx-em">acompanhado</span> — e sem cartão.
          </h1>
          <p className="fx-lead">
            A Fluxomind está em beta privado. Aqui você não compra um software para dirigir: entra
            pela lista, o time monta com você o primeiro app operante e ele passa a rodar no seu
            processo. O preço público chega no lançamento.
          </p>
          <div className="fx-cta-row">
            <a className="fx-btn fx-btn-primary" href="#comecar" data-track="precos-beta">
              Entrar no beta
            </a>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT} data-track="precos-contact">
              {CTA.contact}
            </a>
          </div>
          <div className="fx-reassure">
            <span>Sem cartão para começar</span>
            <span>Acesso acompanhado pelo time</span>
            <span>Você aprova o que é sensível</span>
          </div>
        </div>
      </header>

      {/* COMO FUNCIONA O ACESSO */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Como funciona</p>
            <h2 className="fx-serif fx-h2">Três passos, com o time do seu lado.</h2>
            <p className="fx-body">
              O acesso ao beta não é um botão de assinar. É uma entrada guiada: do problema descrito
              ao app operante rodando.
            </p>
          </div>
          <div className="fx-grid3 fx-mt">
            {STEPS.map((s) => (
              <div className="fx-card" key={s.label}>
                <span className="fx-label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE O BETA INCLUI */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O que o beta inclui</p>
          <h2 className="fx-serif fx-h2">Você entra acompanhado — não largado num painel.</h2>
          <ul className="fx-list fx-check">
            <li>
              <strong>Acesso acompanhado</strong> — o time entra junto, do primeiro dia à operação
              rodando.
            </li>
            <li>
              <strong>O primeiro app operante montado com você</strong>, no seu processo, com o que
              você já usa.
            </li>
            <li>
              <strong>Sem cartão e sem cobrança</strong> enquanto durar o beta.
            </li>
            <li>
              <strong>Seus dados isolados desde o primeiro dia</strong> — governança de nível
              enterprise, já em produção.
            </li>
          </ul>
          <div className="fx-note fx-mt">
            <strong>O preço público vem no lançamento.</strong> As faixas estão sendo definidas com
            os primeiros clientes do beta — por isso ainda não publicamos números que podem mudar.
            O desenho, esse já está claro: quando chegar, será uma fatura só, em reais, com os
            modelos de IA inclusos — sem você gerir contas e chaves de provedor.
          </div>
        </div>
      </section>

      {/* ONDE O VALOR SE ANCORA */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Onde o valor se ancora</p>
            <h2 className="fx-serif fx-h2">
              Mais que uma ferramenta. <span className="fx-gold">Muito menos</span> que contratar
              gente.
            </h2>
            <p className="fx-body">
              O valor não mora numa tabela de planos — mora no trabalho que sai das suas costas.
              Ele se ancora entre dois mundos que você já conhece:
            </p>
          </div>
          <div className="fx-grid2 fx-mt">
            <div className="fx-card">
              <span className="fx-label">Mais que um software</span>
              <h3>Você não dirige mais um sistema</h3>
              <p>
                Uma ferramenta você compra e opera. Aqui o app opera sozinho e te presta contas —
                vale mais do que um software que depende de você o dia inteiro para funcionar.
              </p>
            </div>
            <div className="fx-card">
              <span className="fx-label">Menos que um funcionário</span>
              <h3>Sem a folha de um contratado</h3>
              <p>
                Um funcionário custa salário, encargos e gestão. O app assume a operação por uma
                fração disso — sem processo seletivo, sem meses de rampa, sem sair de férias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Dúvidas comuns</p>
          <h2 className="fx-serif fx-h2">O que costumam perguntar</h2>
          <div className="fx-faq">
            <div className="fx-qa">
              <h4>Preciso de cartão para começar?</h4>
              <p>
                Não. Durante o beta não existe cobrança nem cartão. Você entra pela lista de
                lançamento e o acesso é acompanhado — o time monta com você o primeiro app operante.
              </p>
            </div>
            <div className="fx-qa">
              <h4>Quanto vai custar?</h4>
              <p>
                O preço público chega no lançamento. As faixas estão sendo definidas com os
                primeiros clientes do beta; preferimos não publicar um número que ainda pode mudar.
                Prova, não promessa.
              </p>
            </div>
            <div className="fx-qa">
              <h4>Como funciona depois do beta?</h4>
              <p>
                O desenho é simples: uma fatura só, em reais, com os modelos de IA já inclusos — sem
                você gerir contas, chaves e limites de provedor. Os valores a gente publica no
                lançamento.
              </p>
            </div>
            <div className="fx-qa">
              <h4>Sou uma empresa maior — como é a adoção?</h4>
              <p>
                Com o time do seu lado: isolamento dedicado, governança e onboarding guiado. Veja
                como funciona em <Link href="/acelere">Acelere</Link> ou{' '}
                <a href={PLATFORM_CONTACT}>fale com o time</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — captura primária */}
      <section className="fx-sec fx-offer" id="comecar">
        <div className="fx-wrap fx-narrow" style={{ textAlign: 'center' }}>
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            O próximo passo
          </p>
          <h2 className="fx-serif fx-h2">Entre para o beta privado.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '54ch' }}>
            Conte a operação que você quer tirar das costas — os primeiros da fila entram já no beta,
            com o time montando o primeiro app com você.
          </p>
          <BetaForm />
          <div className="fx-offerbtns">
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT} data-track="precos-contact">
              Prefere conversar antes? {CTA.contact}
            </a>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão · o preço público vem no lançamento</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
