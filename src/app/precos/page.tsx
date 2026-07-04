import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Preços',
  description:
    'Durante o beta, o acesso é acompanhado e sem cartão — você entra pela lista do beta. Depois, assinatura + uso com os modelos de fronteira inclusos: uma fatura, em reais, sem gerir contas e chaves de IA.',
  alternates: {
    canonical: '/precos',
    languages: { 'pt-BR': '/precos', en: '/en/pricing' },
  },
};

export default function Precos() {
  return (
    <div className="page-pricing">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/pricing" />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Preços
            </div>
            <h1>
              No beta, sem cartão. <span className="g">Depois, assinatura + uso.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '56ch' }}>
              Durante o beta, o acesso é acompanhado — o time entra junto, sem cartão e sem
              cobrança. Depois, o desenho é simples: uma assinatura mais o uso, com os modelos de
              fronteira já inclusos numa única fatura em reais.
            </p>
          </div>
        </div>
      </header>

      {/* PLANS */}
      <section>
        <div className="wrap">
          <div className="plans">
            {/* BETA */}
            <div className="plan">
              <div className="ptag">Hoje · beta</div>
              <h3>Beta acompanhado</h3>
              <div className="price">
                <b>Sem cartão</b>
                sem custo durante o beta
              </div>
              <p className="desc">
                Você não entra sozinho: o time acompanha e monta com você o primeiro app operante.
              </p>
              <ul>
                <li>
                  <span className="ck">✓</span> Acesso pela lista do beta, acompanhado pelo time
                </li>
                <li>
                  <span className="ck">✓</span> Sem cartão e sem cobrança enquanto durar o beta
                </li>
                <li>
                  <span className="ck">✓</span> Um app operante de verdade, no seu processo
                </li>
                <li>
                  <span className="ck">✓</span> Seus dados isolados desde o primeiro dia
                </li>
              </ul>
              <Link className="btn btn-primary" href="/#comecar" data-track="precos-beta-cta">
                {CTA.beta}
              </Link>
            </div>

            {/* ASSINATURA + USO */}
            <div className="plan featured">
              <div className="ribbon">Depois do beta</div>
              <div className="ptag">Assinatura + uso</div>
              <h3>Uma fatura, em reais</h3>
              <div className="price">
                <b>Assinatura + uso</b>
                com os modelos de IA inclusos
              </div>
              <p className="desc">
                O desenho do produto para depois do beta: previsível na base, proporcional ao que
                roda.
              </p>
              <ul>
                <li>
                  <span className="ck">✓</span> Modelos de fronteira embutidos — sem contratar
                  provedor de IA por fora
                </li>
                <li>
                  <span className="ck">✓</span> Uma única fatura, em reais — nada de conta de IA em
                  dólar
                </li>
                <li>
                  <span className="ck">✓</span> Sem gerir contas, chaves e limites de provedores
                </li>
                <li>
                  <span className="ck">✓</span> Consumo visível na conta; para ampliar, fale com o
                  time
                </li>
              </ul>
              <Link className="btn btn-primary" href="/#comecar" data-track="precos-beta-cta">
                {CTA.beta}
              </Link>
            </div>

            {/* ESCALA */}
            <div className="plan">
              <div className="ptag">Escala</div>
              <h3>Adoção em escala</h3>
              <div className="price">
                <b>Com o time</b>
                condições sob medida para escala
              </div>
              <p className="desc">
                Para adotar em mais processos e mais áreas — com o que o seu procurement exige.
              </p>
              <ul>
                <li>
                  <span className="ck">✓</span> Isolamento dedicado e BYOK (sua chave)
                </li>
                <li>
                  <span className="ck">✓</span> Governança e trilha de auditoria verificável
                </li>
                <li>
                  <span className="ck">✓</span> Onboarding guiado, lado a lado com o time
                </li>
                <li>
                  <span className="ck">✓</span> Nos casos sensíveis, uma pessoa decide
                </li>
              </ul>
              <a className="btn btn-ghost-d" href={PLATFORM_CONTACT}>
                {CTA.contact}
              </a>
            </div>
          </div>

          <div className="honest" style={{ maxWidth: 760, margin: '34px auto 0' }}>
            <b>Transparência:</b> as faixas finais de preço estão sendo definidas com os primeiros
            clientes do beta — por isso não publicamos números que ainda podem mudar. O que já está
            definido é o desenho: <strong>assinatura + uso</strong>, com os modelos de fronteira
            inclusos e uma única fatura em reais.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            <div className="qa">
              <h4>Preciso de cartão para começar?</h4>
              <p>
                Não. Durante o beta não existe cobrança nem cartão. Você pede acesso pela lista do
                beta e entra acompanhado — o time monta com você o primeiro app operante.
              </p>
            </div>
            <div className="qa">
              <h4>Quanto vai custar depois do beta?</h4>
              <p>
                As faixas finais estão sendo definidas com os primeiros clientes — preferimos não
                publicar um número que ainda pode mudar. O desenho, esse já está definido:
                assinatura + uso, com os modelos de fronteira inclusos e uma única fatura em reais.
              </p>
            </div>
            <div className="qa">
              <h4>Preciso contratar um provedor de IA por fora?</h4>
              <p>
                Não. Os modelos de fronteira vêm embutidos na plataforma: ela cuida das contas, das
                chaves e dos limites — você recebe uma fatura só, em reais.
              </p>
            </div>
            <div className="qa">
              <h4>Como eu controlo o quanto vou gastar?</h4>
              <p>
                Você acompanha o consumo na sua conta, e nada muda de faixa sozinho: para ampliar a
                capacidade, você fala com o time.
              </p>
            </div>
            <div className="qa">
              <h4>Posso cancelar quando quiser?</h4>
              <p>
                Sim. O beta não tem custo nem compromisso. E depois o modelo é assinatura — você não
                fica preso a um projeto de meses.
              </p>
            </div>
            <div className="qa">
              <h4>Sou uma empresa maior — como funciona a adoção?</h4>
              <p>
                Com o time do seu lado: isolamento dedicado, governança e onboarding guiado. Veja
                como funciona em <Link href="/acelere">Acelere</Link> ou{' '}
                <a href={PLATFORM_CONTACT}>fale com o time</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="offer" style={{ borderRadius: 0 }}>
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Comece agora
          </div>
          <h2>Entre pela lista do beta</h2>
          <p className="lead">
            Sem cartão, acompanhado pelo time — do problema descrito ao app operante rodando.
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/#comecar" data-track="precos-beta-cta">
              {CTA.beta}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT}>
              {CTA.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline="No beta, sem cartão. Depois, assinatura + uso — uma fatura em reais." />
    </div>
  );
}
