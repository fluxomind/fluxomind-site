import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PURPOSE_LINE, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Por quê',
  description: `${PURPOSE_LINE} Na palavra de quem fundou.`,
  alternates: {
    canonical: '/por-que',
    languages: { 'pt-BR': '/por-que', en: '/en/why' },
  },
};

// A carta do fundador (message house §1.5): 3 atos, assinada, com data.
// Reposicionada no design system fx (editorial-tech, dark): hero + eyebrow
// por movimento, corpo em fx-prose, citações de impacto em fx-quote.
// Nunca rotular "Manifesto"; a visão entra como aposta, não como fato.
export default function PorQue() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/why" />

      {/* ABERTURA */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A carta do fundador</p>
          <h1 className="fx-serif fx-h1">
            Por 30 anos, as empresas se{' '}
            <span className="fx-em">adaptaram ao software.</span>
          </h1>
          <p className="fx-lead">
            Está na hora de o software se moldar a elas — e trabalhar por elas. É para isso
            que a Fluxomind existe.
          </p>
        </div>
      </header>

      {/* ATO 1 — O JEITO ANTIGO */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">O jeito antigo</p>
          <h2 className="fx-serif fx-h2">
            Quem nunca dobrou um processo para caber num sistema?
          </h2>
          <div className="fx-prose">
            <p>
              Sempre houve dois caminhos. Você compra um sistema pronto e passa a trabalhar do
              jeito dele — os campos que ele tem, as telas que ele quis, o relatório que ele dá.
              Ou paga um projeto para dobrá-lo ao seu processo: meses de implantação, orçamento
              de consultoria — e, a cada mudança do negócio, tudo de novo.
            </p>
            <p>
              Nos dois caminhos, o resultado é o mesmo: <strong>o software fica parado</strong>.
              Quem corre atrás — digita, cruza planilha, cobra, confere, lembra — é você e o seu
              time. A ferramenta guarda os dados; o trabalho continua sendo seu.
            </p>
          </div>
          <blockquote className="fx-quote fx-mt-s">
            Tecnologia sob medida sempre existiu. Mas era privilégio: projeto, integrador,
            time de TI. Quem não podia pagar se virava com planilha.
          </blockquote>
        </div>
      </section>

      {/* ATO 2 — A INVERSÃO */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A inversão</p>
          <h2 className="fx-serif fx-h2">
            Pela primeira vez, o software pode se moldar ao negócio — e trabalhar por ele.
          </h2>
          <div className="fx-prose">
            <p>
              A IA cruzou dois limiares que mudam essa história. Ela passou a{' '}
              <strong>entender o contexto</strong> — o que antes exigia um projeto para adaptar,
              agora acontece a partir do que você descreve. E passou a{' '}
              <strong>executar</strong> — o que antes era sempre uma pessoa correndo atrás,
              agora um agente faz, mostra a prova e chama você no que é sensível.
            </p>
            <p>
              Isso cria uma categoria nova. Não é um sistema que você opera: é um app que se
              constrói a partir do seu problema e <strong>opera o dia a dia</strong> — integrado
              ao que você já tem, governado, em semanas.
            </p>
          </div>

          <div className="fx-mt">
            <p className="fx-eyebrow">O nosso porquê</p>
            <blockquote className="fx-quote">
              Existimos para entregar a qualquer negócio o que era privilégio de quem podia
              pagar: sistema sob medida, operado e governado — sem projeto de meses, sem time
              de TI, sem dobrar o seu processo para caber na ferramenta.
            </blockquote>
          </div>

          <div className="fx-prose fx-mt">
            <p>
              É por isso que a nossa home é uma demonstração, e não uma promessa. Delegar uma
              operação exige confiança — e confiança, por aqui, se conquista com prova na tela.
            </p>
          </div>
        </div>
      </section>

      {/* ATO 3 — A APOSTA */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A aposta</p>
          <h2 className="fx-serif fx-h2">Para onde acreditamos que isso vai</h2>
          <div className="fx-prose">
            <p>
              O conhecimento de resolver um problema — o método que um especialista levou anos
              para apurar — hoje fica preso à agenda de uma pessoa. Atende um cliente por vez, e
              não chega a quem precisa dele.
            </p>
            <p>
              A nossa aposta, declarada como aposta: esse conhecimento vai virar{' '}
              <strong>negócio de software vivo</strong> — criado por quem domina o problema,
              adotado já operado por quem precisa da solução. A próxima geração de sistemas não
              vai ser comprada pronta nem custar um projeto: vai nascer de quem entende do
              assunto, e trabalhar dentro do negócio de quem a adotar.
            </p>
            <p>
              Ainda não estamos lá — e preferimos te contar assim mesmo. O que já existe, o que
              vem agora e o que é visão estão sempre separados, aqui e em{' '}
              <Link href="/#para-onde">todo o site</Link>.
            </p>
          </div>

          <div
            className="fx-mt"
            style={{ borderTop: '1px solid var(--fx-line)', paddingTop: 22, maxWidth: 680 }}
          >
            <div className="fx-serif" style={{ fontSize: 19, fontWeight: 600, color: 'var(--fx-ink)' }}>
              Ralfo Nunes
            </div>
            <div className="fx-fineprint" style={{ marginTop: 3 }}>
              fundador · julho de 2026
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL — beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc fx-center">
          <p className="fx-eyebrow">O próximo passo</p>
          <h2 className="fx-serif fx-h2">A prova está na tela. Vamos construir a sua.</h2>
          <p className="fx-lead fx-center" style={{ margin: '0 auto 22px' }}>
            {PURPOSE_LINE}
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/#comecar" data-track="porque-beta-cta">
              {CTA.beta}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/demo">
              {CTA.demo}
            </Link>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão · em semanas, não meses</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
