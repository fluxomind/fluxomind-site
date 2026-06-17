import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_SIGNUP } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — Preços: comece grátis, cresça pagando pelo uso',
  description:
    'Crie sua conta grátis, sem cartão, com um limite de uso claro. Quando precisar de mais, adicione um cartão e amplie — pague só pelo que usar, sem surpresa.',
};

export default function Precos() {
  return (
    <div className="page-pricing">
      <div className="note">
        Protótipo da página de preços. As faixas finais estão sendo definidas com os primeiros
        clientes — conteúdo demonstrativo.
      </div>

      <SiteHeader cta={{ label: 'Criar meu sistema grátis', href: PLATFORM_SIGNUP }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Preços
            </div>
            <h1>
              Comece grátis. <span className="g">Cresça pagando só pelo que usa.</span>
            </h1>
            <p className="hsub" style={{ margin: '18px auto 0', maxWidth: '52ch' }}>
              Crie sua conta sem cartão, com um limite de uso claro pra montar e testar de verdade.
              Quando o valor aparecer, adicione um cartão e amplie — você no controle, sem surpresa
              na fatura.
            </p>
          </div>
        </div>
      </header>

      {/* PLANS */}
      <section>
        <div className="wrap">
          <div className="plans">
            {/* GRÁTIS */}
            <div className="plan">
              <div className="ptag">Grátis</div>
              <h3>Comece sem cartão</h3>
              <div className="price">
                <b>R$ 0</b>
                pra começar — sem cartão de crédito
              </div>
              <p className="desc">Pra provar valor e montar seus primeiros sistemas.</p>
              <ul>
                <li>
                  <span className="ck">✓</span> Monte sistemas conversando, em minutos
                </li>
                <li>
                  <span className="ck">✓</span> Um limite de uso claro pra testar de verdade
                </li>
                <li>
                  <span className="ck">✓</span> Use no computador e no WhatsApp
                </li>
                <li>
                  <span className="ck">✓</span> Seus dados isolados e seguros
                </li>
              </ul>
              <a className="btn btn-primary" href={PLATFORM_SIGNUP}>
                Criar meu sistema grátis
              </a>
            </div>

            {/* USO */}
            <div className="plan featured">
              <div className="ribbon">Mais usado</div>
              <div className="ptag">Uso</div>
              <h3>Amplie com cartão</h3>
              <div className="price">
                <b>Pague pelo uso</b>
                adicione um cartão e amplie o limite
              </div>
              <p className="desc">Pra crescer sem trava, pagando só pelo que consumir.</p>
              <ul>
                <li>
                  <span className="ck">✓</span> Tudo do grátis, sem o teto
                </li>
                <li>
                  <span className="ck">✓</span> Medidor de uso e limites que você controla
                </li>
                <li>
                  <span className="ck">✓</span> Paga só pelo que usar — sem fatura surpresa
                </li>
                <li>
                  <span className="ck">✓</span> Mais capacidade, automações e canais
                </li>
              </ul>
              <a className="btn btn-primary" href={PLATFORM_SIGNUP}>
                Começar grátis e ampliar quando quiser
              </a>
            </div>

            {/* ENTERPRISE */}
            <div className="plan">
              <div className="ptag">Escala</div>
              <h3>Pra escala e procurement</h3>
              <div className="price">
                <b>Sob medida</b>
                isolamento, governança e suporte dedicado
              </div>
              <p className="desc">Pra adotar em escala, com o que o seu procurement exige.</p>
              <ul>
                <li>
                  <span className="ck">✓</span> Isolamento dedicado e BYOK (sua chave)
                </li>
                <li>
                  <span className="ck">✓</span> Governança, residência de dados e auditoria
                </li>
                <li>
                  <span className="ck">✓</span> Onboarding guiado e suporte dedicado
                </li>
                <li>
                  <span className="ck">✓</span> Programa de design partners
                </li>
              </ul>
              <Link className="btn btn-ghost-d" href="/acelere">
                Falar com o time
              </Link>
            </div>
          </div>

          <div className="honest" style={{ maxWidth: 760, margin: '34px auto 0' }}>
            <b>Transparência:</b> estamos definindo as faixas finais com os primeiros clientes. Você
            sempre vê seu <strong>limite e seu consumo</strong> na conta — sem cobrança escondida,
            sem surpresa, e cancela quando quiser.
          </div>
        </div>
      </section>

      {/* FAQ rápido */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            <div className="qa">
              <h4>Preciso de cartão pra começar?</h4>
              <p>
                Não. Você cria a conta grátis, sem cartão, e já monta seu primeiro sistema. O cartão
                só entra quando você quiser ampliar o limite.
              </p>
            </div>
            <div className="qa">
              <h4>Como eu controlo o quanto vou gastar?</h4>
              <p>
                Você vê seu uso e seu limite na conta o tempo todo. Nada é cobrado além do que você
                escolher — sem fatura surpresa.
              </p>
            </div>
            <div className="qa">
              <h4>Posso cancelar quando quiser?</h4>
              <p>Sim. Sem fidelidade e sem multa — você fica no controle.</p>
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
          <h2>Monte seu primeiro sistema hoje</h2>
          <p className="lead">Grátis, sem cartão. Em minutos você vê funcionando.</p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Criar meu sistema grátis
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Comece grátis, cresça pagando só pelo que usa." />
    </div>
  );
}
