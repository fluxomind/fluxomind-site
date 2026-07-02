import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, PURPOSE_LINE, CTA } from '@/lib/messages';
import { PLATFORM_BETA } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Por quê',
  description: `${PURPOSE_LINE} Na palavra de quem fundou.`,
};

// Ensaio de propósito (message house §1.5): 3 atos, assinado pelo fundador,
// com data. Nunca rotular "Manifesto". A visão entra como aposta, não fato.
export default function PorQue() {
  return (
    <div className="page-porque">
      <style>{PQ_CSS}</style>

      <SiteHeader cta={{ label: CTA.demo, href: '/#demo' }} />

      {/* ABERTURA */}
      <header className="hero">
        <div className="wrap pq-hero">
          <span className="pill">Por que existimos · na palavra de quem fundou</span>
          <h1>
            Por 30 anos, as empresas se{' '}
            <span className="g">adaptaram ao software.</span>
          </h1>
          <p className="hsub">
            Está na hora de o software se moldar a elas — e trabalhar por elas. É para isso
            que a Fluxomind existe.
          </p>
        </div>
      </header>

      {/* ATO 1 — O JEITO ANTIGO */}
      <section className="pq-act">
        <div className="wrap pq-prose">
          <div className="kick">Ato 1 · O jeito antigo</div>
          <h2>Quem nunca dobrou um processo para caber num sistema?</h2>
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
          <blockquote className="pq-pull">
            Tecnologia sob medida sempre existiu. Mas era privilégio: projeto, integrador,
            time de TI. Quem não podia pagar se virava com planilha.
          </blockquote>
        </div>
      </section>

      {/* ATO 2 — A INVERSÃO */}
      <section className="pq-act pq-dark">
        <div className="wrap pq-prose">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Ato 2 · A inversão
          </div>
          <h2 style={{ color: '#fff' }}>
            Pela primeira vez, o software pode se moldar ao negócio — e trabalhar por ele.
          </h2>
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
          <div className="pq-purpose">
            <div className="pq-purpose-label">O nosso porquê</div>
            <p>
              Existimos para entregar a qualquer negócio o que era privilégio de quem podia
              pagar: <strong>sistema sob medida, operado e governado</strong> — sem projeto de
              meses, sem time de TI, sem dobrar o seu processo para caber na ferramenta.
            </p>
          </div>
          <p>
            É por isso que a nossa home é uma demonstração, e não uma promessa. Delegar uma
            operação exige confiança — e confiança, por aqui, se conquista com prova na tela.
          </p>
        </div>
      </section>

      {/* ATO 3 — A APOSTA */}
      <section className="pq-act">
        <div className="wrap pq-prose">
          <div className="kick">Ato 3 · A aposta</div>
          <h2>Para onde acreditamos que isso vai</h2>
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
            <Link href="/#para-onde" className="pq-link">
              todo o site
            </Link>
            .
          </p>

          <div className="pq-sign">
            <div className="pq-sign-name">Ralfo Nunes</div>
            <div className="pq-sign-role">fundador · julho de 2026</div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="offer">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            O próximo passo
          </div>
          <h2>A melhor forma de entender é ver funcionando</h2>
          <p className="lead" style={{ maxWidth: '56ch', margin: '14px auto 0' }}>
            {PURPOSE_LINE}
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/#demo">
              {CTA.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_BETA}>
              {CTA.beta}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}

const PQ_CSS = `
.page-porque .pq-hero { text-align: center; padding-bottom: 40px; }
.page-porque .pq-hero h1 { max-width: 22ch; margin: 0 auto; }
.page-porque .pq-hero .hsub { max-width: 58ch; margin: 18px auto 0; }
.pq-act { padding: 72px 0; }
.pq-act.pq-dark {
  background:
    radial-gradient(900px 420px at 50% 0%, rgba(43, 102, 221, 0.22), transparent 60%),
    var(--ink);
  color: #cdd3dc;
}
.pq-prose { max-width: 680px; margin: 0 auto; }
.pq-prose h2 { margin-top: 14px; }
.pq-prose p { margin-top: 18px; font-size: 17px; line-height: 1.75; }
.pq-dark .pq-prose p { color: #b6bdc9; }
.pq-dark .pq-prose strong { color: #fff; }
.pq-pull {
  margin: 30px 0 6px;
  padding: 4px 0 4px 22px;
  border-left: 3px solid var(--blue);
  font-size: 19px;
  line-height: 1.6;
  font-weight: 550;
  color: var(--slate);
}
.pq-purpose {
  margin: 30px 0 6px;
  padding: 24px 26px;
  border: 1px solid rgba(77, 171, 247, 0.35);
  border-radius: 14px;
  background: rgba(43, 102, 221, 0.10);
}
.pq-purpose .pq-purpose-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--sky);
}
.pq-purpose p { margin-top: 10px; font-size: 17.5px; color: #e8ecf3; }
.pq-link { color: var(--blue); font-weight: 600; }
.pq-dark .pq-link { color: var(--sky); }
.pq-sign { margin-top: 44px; padding-top: 22px; border-top: 1px solid var(--line); }
.pq-sign-name { font-size: 18px; font-weight: 700; }
.pq-sign-role { margin-top: 2px; font-size: 14px; color: var(--mute); }
`;
