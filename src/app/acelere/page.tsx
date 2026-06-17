import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_CONTACT } from '@/lib/platform';

const SIGNATURE = 'Delegue a tarefa. Receba a conclusão com a prova.';

export const metadata: Metadata = {
  title: 'Fluxomind — para empresas: acelere suas implementações',
  description:
    'Adote a Fluxomind como acelerador das suas implementações, com a governança e a segurança que o seu procurement exige.',
};

export default function Enterprise() {
  return (
    <div className="page-ent">
      <div className="note">
        Protótipo da trilha enterprise (adoção em escala / acelerador). Conteúdo demonstrativo.
      </div>

      {/* NAV */}
      <SiteHeader cta={{ label: 'Falar com o time', href: PLATFORM_CONTACT }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Para empresas · programa enterprise &amp; design partners</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE}</div>
          <h1>
            Acelere suas implementações <span className="g">com a Fluxomind como motor.</span>
          </h1>
          <p className="hsub">
            A maioria dos pilotos de IA morre antes da produção — trava na integração, na governança
            e na fila da TI, não no modelo. A Fluxomind acelera <strong>por dentro do que você já
            tem</strong>, sem trocar o que funciona: não é um chat que responde nem um copilot que
            sugere — seus times montam sistemas que <strong>executam de verdade</strong>, em dias,
            com a governança e a segurança que o seu procurement exige.
          </p>
          <div className="herocta">
            <a className="btn btn-primary" href="#contato">
              Falar com o time
            </a>
            <a className="btn btn-ghost" href="#modelo">
              Ver o programa de adoção
            </a>
          </div>
          <div className="stat">
            <div className="s">
              <b>Desenhada para entregar em dias</b>
              <span>do pedido ao sistema interno, sem fila de dev</span>
            </div>
            <div className="s">
              <b>Sem fila de dev</b>
              <span>times de negócio entregam sozinhos</span>
            </div>
            <div className="s">
              <b>No seu ambiente</b>
              <span>isolamento, BYOK e residência de dados</span>
            </div>
          </div>
        </div>
      </header>

      {/* COMO ADOTAR */}
      <section id="usos">
        <div className="wrap">
          <div className="center">
            <div className="kick">Como as empresas adotam</div>
            <h2>Quatro formas de usar a Fluxomind como acelerador</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Do uso interno ao produto que você entrega ao seu cliente.
            </p>
          </div>
          <div className="ways">
            <div className="way">
              <div className="wi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="9" width="7" height="11" rx="1" /><rect x="13.5" y="4" width="7" height="16" rx="1" /><path d="M6.5 12.5h1M6.5 15.5h1M16.5 7.5h1M16.5 11h1M16.5 14.5h1" /></svg></div>
              <h3>Acelere implementações internas</h3>
              <div className="tagm">Para áreas de operação, CS, RevOps, BackOffice</div>
              <p>
                Seus times de negócio montam sistemas internos (cobrança, atendimento, aprovações,
                painéis) em dias — sem abrir ticket pra TI. Reduz a fila de demandas do time de
                engenharia.
              </p>
            </div>
            <div className="way">
              <div className="wi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v4.5M15 2v4.5" /><path d="M6.5 6.5h11V10a5.5 5.5 0 0 1-11 0V6.5z" /><path d="M12 15.5V21" /></svg></div>
              <h3>Embuta na sua stack</h3>
              <div className="tagm">Via API e MCP server</div>
              <p>
                Exponha a Fluxomind como capacidade dentro do que você já tem — seus agentes e
                sistemas chamam a plataforma como ferramenta. Integra, não substitui.
              </p>
            </div>
            <div className="way">
              <div className="wi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 12.8V4.8a1.3 1.3 0 0 1 1.3-1.3h8L20.8 11a1.3 1.3 0 0 1 0 1.9l-7.9 7.9a1.3 1.3 0 0 1-1.9 0L3.5 12.8z" /><circle cx="7.5" cy="7.5" r="1.3" /></svg></div>
              <h3>Ofereça aos seus clientes</h3>
              <div className="tagm">White-label / OEM</div>
              <p>
                Empacote operação assistida por IA dentro do seu produto ou serviço, com sua marca —
                sem construir a plataforma do zero.
              </p>
            </div>
            <div className="way">
              <div className="wi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="9" r="2.6" /><circle cx="16" cy="9" r="2.6" /><path d="M3.6 18.6c.5-2.6 2.3-4 4.4-4s3.9 1.4 4.4 4" /><path d="M14 14.8c1.8.2 3.3 1.5 3.8 3.8" /></svg></div>
              <h3>Co-construa com nosso time</h3>
              <div className="tagm">Professional services</div>
              <p>
                Nossa engenharia trabalha junto com a sua para acelerar a primeira implementação e
                capacitar seu time a seguir sozinho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FIT / GOVERNANÇA */}
      <section id="fit" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Cabe no seu ambiente
            </div>
            <h2 style={{ color: '#fff', maxWidth: '20ch' }}>
              Feita para passar pelo seu time de segurança e compliance
            </h2>
            <div className="fitg">
              <div className="fc">
                <div className="fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="4.2" /><path d="M11 11l8.5 8.5M16.5 16.5l2-2M18.5 18.5l2-2" /></svg></div>
                <h4>Seus dados, sua chave</h4>
                <p>Isolamento por cliente, BYOK (sua KMS) e opções de residência de dados por região.</p>
              </div>
              <div className="fc">
                <div className="fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg></div>
                <h4>Governança aplicada pelo runtime</h4>
                <p>
                  Políticas, cotas, consentimento (GDPR/LGPD) e human-in-the-loop em ações
                  sensíveis.
                </p>
              </div>
              <div className="fc">
                <div className="fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" /><path d="M13.5 3.5V8H18" /><path d="M9 12.5h6M9 16h6" /></svg></div>
                <h4>Auditável por evidência</h4>
                <p>Trilha imutável por hash-chain e controles SOC2/GDPR escaneados continuamente.</p>
              </div>
            </div>
            <div className="fitlink">
              <Link href="/plataforma">
                Ver a avaliação técnica completa (arquitetura, performance, qualidade, governança,
                segurança) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODELO DE ADOÇÃO */}
      <section id="modelo">
        <div className="wrap">
          <div className="center">
            <div className="kick">Modelo de adoção</div>
            <h2>Comece pequeno, com acompanhamento. Expanda quando provar valor.</h2>
          </div>
          <div className="timeline">
            <div className="tl">
              <div className="num">1</div>
              <h4>Piloto guiado</h4>
              <p>
                Escolhemos juntos 1 processo de alto valor. Nosso time acompanha do desenho ao
                primeiro resultado real, em poucas semanas.
              </p>
            </div>
            <div className="tl">
              <div className="num">2</div>
              <h4>Expansão</h4>
              <p>
                Provado o valor, mais áreas e processos entram. Seu time já opera com autonomia; o
                nosso fica de retaguarda.
              </p>
            </div>
            <div className="tl">
              <div className="num">3</div>
              <h4>Embutido em escala</h4>
              <p>
                A Fluxomind vira parte da sua operação — integrada à stack, com governança central e
                suporte dedicado.
              </p>
            </div>
          </div>
          <div className="proc">
            <div className="pchip">Pronto para procurement:</div>
            <div className="pchip">Security whitepaper</div>
            <div className="pchip">Data room técnico</div>
            <div className="pchip">DPA / tratamento de dados</div>
            <div className="pchip">Roadmap de certificação</div>
          </div>
        </div>
      </section>

      {/* SUPORTE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Parceria, não só licença</div>
            <h2>Suporte e acompanhamento de verdade</h2>
          </div>
          <div className="support">
            <div className="sup">
              <div className="si" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg></div>
              <div>
                <h4>Time dedicado</h4>
                <p>Um ponto de contato técnico e de produto que conhece a sua implementação.</p>
              </div>
            </div>
            <div className="sup">
              <div className="si" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.2A1.2 1.2 0 0 1 5.2 4H11v15.5H5.2A1.2 1.2 0 0 0 4 20.7V5.2z" /><path d="M20 5.2A1.2 1.2 0 0 0 18.8 4H13v15.5h5.8a1.2 1.2 0 0 1 1.2 1.2V5.2z" /></svg></div>
              <div>
                <h4>Capacitação</h4>
                <p>Habilitamos seus times de negócio e de TI para construir e operar sozinhos.</p>
              </div>
            </div>
            <div className="sup">
              <div className="si" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a3.6 3.6 0 0 0-4.8 4.3l-5.7 5.7 2.2 2.2 5.7-5.7a3.6 3.6 0 0 0 4.3-4.8l-2.3 2.3-1.9-1.9 2.5-2.4z" /></svg></div>
              <div>
                <h4>Professional services</h4>
                <p>Nossa engenharia acelera as primeiras entregas e os casos mais complexos.</p>
              </div>
            </div>
            <div className="sup">
              <div className="si" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16h16" /><path d="M7 14l3-3 3 3 5-6" /><path d="M18 8h-2.5M18 8v2.5" /></svg></div>
              <div>
                <h4>Roadmap conjunto</h4>
                <p>Como design partner, sua operação influencia a prioridade do produto.</p>
              </div>
            </div>
          </div>
          <div className="honest">
            <b>Transparência:</b> estamos em pré-lançamento. Hoje a adoção enterprise acontece via{' '}
            <strong>programa de design partners com acompanhamento próximo</strong> — SLA formal,
            certificação SOC2 e self-serve em escala estão no roadmap. Você entra cedo, com
            influência no produto e condições de fundador.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card" id="contato">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Vamos conversar
            </div>
            <h2>Traga um processo. Devolvemos um acelerador.</h2>
            <p className="lead">
              Conte qual implementação ou operação você quer acelerar — desenhamos um piloto guiado
              com o seu time.
            </p>
            <div className="ctab">
              <a className="btn btn-primary" href={PLATFORM_CONTACT}>
                Falar com o time
              </a>
              <Link className="btn btn-ghost" href="/plataforma">
                Ver avaliação técnica
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Seu acelerador de operações e implementações." />
    </div>
  );
}
