import Link from 'next/link';
import DemoBuilder from '@/components/DemoBuilder';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { PLATFORM_SIGNUP } from '@/lib/platform';

export default function Home() {
  return (
    <div className="page-home">
      <div className="note">
        Protótipo conceitual da nova home (linguagem de venda). Conteúdo demonstrativo.
      </div>

      {/* NAV */}
      <SiteHeader cta={{ label: 'Começar grátis', href: PLATFORM_SIGNUP }} />

      {/* HERO */}
      <header className="hero hero--split">
        <div className="wrap">
          <div>
            <span className="pill">
              <span className="lz" /> Operação assistida por IA · comece grátis
            </span>
            <h1>
              Monte o sistema da sua operação <span className="g">só conversando.</span>
            </h1>
            <p className="hsub">
              Cadastros, painéis, automações e cobranças prontos em minutos — sem programar
              e sem esperar a TI. Você descreve o que precisa; a Fluxomind monta e opera com você.
            </p>
            <div className="herocta">
              <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
                Criar meu sistema grátis
              </a>
              <a className="btn btn-ghost btn-lg" href="#demo">
                Ver funcionando ↓
              </a>
            </div>
            <div className="reassure">
              <span>
                <b>✓</b> Sem cartão de crédito
              </span>
              <span>
                <b>✓</b> Pronto em minutos
              </span>
              <span>
                <b>✓</b> Seus dados isolados e seguros
              </span>
            </div>
          </div>

          <DemoBuilder />
        </div>
      </header>

      {/* AUDIENCE SELECTOR */}
      <section style={{ padding: '54px 0 0' }}>
        <div className="center" style={{ marginBottom: 30 }}>
          <div className="kick">Por onde você quer começar?</div>
          <h2 style={{ fontSize: 'clamp(24px,3vw,32px)' }}>Cada perfil, um caminho</h2>
        </div>
        <div className="wrap">
          <div className="aud">
            <a href="#demo" className="audcard">
              <div className="ai">🚀</div>
              <h3>Quero resolver agora</h3>
              <div className="role">Gestor / time de operação</div>
              <p>Monte seu sistema em minutos, conversando. Comece grátis, sem TI.</p>
              <span className="go">Montar agora →</span>
            </a>
            <Link href="/plataforma" className="audcard">
              <div className="ai">🔍</div>
              <h3>Quero avaliar a fundo</h3>
              <div className="role">Time técnico / segurança</div>
              <p>
                AI-first, performance, qualidade, governança e segurança — com evidência e
                status honesto.
              </p>
              <span className="go">Ver a plataforma por dentro →</span>
            </Link>
            <Link href="/enterprise" className="audcard">
              <div className="ai">🏢</div>
              <h3>Quero adotar em escala</h3>
              <div className="role">Empresa / programa enterprise</div>
              <p>
                Use a Fluxomind como acelerador das suas implementações, com governança de
                procurement.
              </p>
              <span className="go">Ver programa enterprise →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="kick">Soa familiar?</div>
            <h2>Sua operação roda no improviso — e isso custa caro</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Planilha que ninguém entende, retrabalho, e tudo dependendo de uma pessoa ou da
              fila da TI.
            </p>
          </div>
          <div className="prob">
            <div className="pcard">
              <div className="pi">🗂️</div>
              <h3>Tudo espalhado</h3>
              <p>
                Informação em planilhas, e-mails e na cabeça das pessoas. Ninguém tem a visão
                completa.
              </p>
            </div>
            <div className="pcard">
              <div className="pi">⏳</div>
              <h3>Sempre esperando</h3>
              <p>Toda mudança vira pedido pra TI ou um dev caro — e leva semanas pra sair.</p>
            </div>
            <div className="pcard">
              <div className="pi">🔁</div>
              <h3>Trabalho repetitivo</h3>
              <p>
                Horas todo mês fazendo cobrança, atualizando relatório e copiando dado de um
                lugar pro outro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">A virada</div>
            <h2>Do improviso ao sistema que trabalha por você</h2>
          </div>
          <div className="fromto">
            <div className="ft from">
              <h4>Hoje</h4>
              <ul>
                <li>
                  <span className="x">✕</span> Planilhas que quebram e se perdem
                </li>
                <li>
                  <span className="x">✕</span> Semanas esperando a TI
                </li>
                <li>
                  <span className="x">✕</span> Cobrança e relatório na mão, todo mês
                </li>
                <li>
                  <span className="x">✕</span> Cada ferramenta de um jeito, nada conversa
                </li>
              </ul>
            </div>
            <div className="ftarrow">→</div>
            <div className="ft to">
              <h4>Com a Fluxomind</h4>
              <ul>
                <li>
                  <span className="c">✓</span> Um sistema sob medida, montado em minutos
                </li>
                <li>
                  <span className="c">✓</span> Você mesmo muda, conversando
                </li>
                <li>
                  <span className="c">✓</span> Cobranças e relatórios no automático
                </li>
                <li>
                  <span className="c">✓</span> Tudo num lugar só, que aprende com o uso
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como" className="why">
        <div className="wrap">
          <div className="center">
            <div className="kick">Como funciona</div>
            <h2>Do pedido ao sistema pronto, em 3 passos</h2>
          </div>
          <div className="steps3">
            <div className="s3">
              <div className="n">1</div>
              <h4>Você descreve</h4>
              <p>Escreva em português o que precisa organizar ou automatizar. Sem menus, sem código.</p>
            </div>
            <div className="s3">
              <div className="n">2</div>
              <h4>A Fluxomind monta</h4>
              <p>
                Ela cria os cadastros, as telas, os relatórios e as automações — e te mostra cada
                passo na tela.
              </p>
            </div>
            <div className="s3">
              <div className="n">3</div>
              <h4>Você opera e melhora</h4>
              <p>Use no dia a dia, no computador ou no WhatsApp. Quer mudar algo? É só pedir.</p>
            </div>
          </div>
          <div className="center" style={{ marginTop: 44 }}>
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Montar meu primeiro sistema grátis
            </a>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="usos">
        <div className="wrap">
          <div className="center">
            <div className="kick">O que dá pra fazer</div>
            <h2>Um sistema para cada parte da sua operação</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Comece por uma dor — e vá expandindo conforme cresce.
            </p>
          </div>
          <div className="uc">
            <div className="ucc">
              <div className="ui">💸</div>
              <h4>Cobrança e inadimplência</h4>
              <p>Veja quem está em atraso, quanto, e dispare lembretes — só com seu OK.</p>
            </div>
            <div className="ucc">
              <div className="ui">📈</div>
              <h4>Funil de vendas</h4>
              <p>Acompanhe oportunidades, próximos passos e follow-ups automáticos.</p>
            </div>
            <div className="ucc">
              <div className="ui">🤝</div>
              <h4>Onboarding de clientes</h4>
              <p>Checklists, prazos e avisos para nenhum cliente novo cair no esquecimento.</p>
            </div>
            <div className="ucc">
              <div className="ui">✅</div>
              <h4>Aprovações e contratos</h4>
              <p>Fluxos de aprovação em níveis, com histórico e nada perdido no e-mail.</p>
            </div>
            <div className="ucc">
              <div className="ui">💬</div>
              <h4>Atendimento no WhatsApp</h4>
              <p>Um assistente que responde e executa de verdade — não só conversa.</p>
            </div>
            <div className="ucc">
              <div className="ui">📊</div>
              <h4>Painéis e relatórios</h4>
              <p>Números atualizados ao vivo, sem ninguém montar planilha no fim do mês.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="why">
        <div className="wrap">
          <div className="center">
            <div className="kick">Por que é diferente</div>
            <h2>Não é mais uma ferramenta — é um sistema vivo</h2>
          </div>
          <div className="whyg">
            <div className="wcard">
              <div className="wi">🧠</div>
              <div>
                <h4>Entende o seu negócio</h4>
                <p>
                  Quanto mais você usa, mais ela entende a sua operação e melhora sozinha. Uma
                  planilha nunca faz isso.
                </p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">⚡</div>
              <div>
                <h4>Pronto hoje, não em meses</h4>
                <p>
                  O primeiro sistema sai na primeira conversa. Mudanças saem na hora, não viram
                  projeto.
                </p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">📱</div>
              <div>
                <h4>Funciona onde você está</h4>
                <p>No computador, no WhatsApp e na voz. O mesmo sistema, em qualquer canal.</p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">🌱</div>
              <div>
                <h4>Cresce com você</h4>
                <p>
                  Do primeiro cadastro à operação inteira da empresa — sem trocar de ferramenta no
                  meio do caminho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="sec" id="seguranca">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Seguro de verdade
            </div>
            <h2 style={{ color: '#fff' }}>Seus dados são seus — isolados e protegidos</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Segurança de nível empresarial desde o primeiro dia, sem você precisar configurar
              nada.
            </p>
          </div>
          <div className="secg">
            <div className="secc">
              <div className="si">🔒</div>
              <h4>Dados isolados</h4>
              <p>Cada empresa tem seu espaço próprio. Ninguém vê o que é seu.</p>
            </div>
            <div className="secc">
              <div className="si">🔑</div>
              <h4>Você controla a chave</h4>
              <p>
                Empresas maiores podem usar a própria chave de criptografia e revogar o acesso
                quando quiserem.
              </p>
            </div>
            <div className="secc">
              <div className="si">🛡️</div>
              <h4>Privacidade por padrão</h4>
              <p>Dados sensíveis são protegidos automaticamente antes de qualquer processamento.</p>
            </div>
            <div className="secc">
              <div className="si">🧾</div>
              <h4>Histórico à prova</h4>
              <p>Trilha de auditoria que registra tudo e não pode ser adulterada.</p>
            </div>
          </div>
          <div className="center" style={{ marginTop: 30 }}>
            <Link
              className="btn btn-ghost"
              href="/plataforma"
              style={{ color: 'var(--sky)', borderColor: 'rgba(77,171,247,.4)' }}
            >
              É técnico e quer avaliar a fundo? Veja a plataforma por dentro →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="center">
            <div className="kick">Dúvidas comuns</div>
            <h2>O que costumam perguntar</h2>
          </div>
          <div className="faq">
            <div className="qa">
              <h4>Preciso saber programar?</h4>
              <p>
                Não. Você conversa em português e a plataforma monta tudo. Se um dia precisar de
                algo muito específico, dá pra ir além — mas a maioria nunca precisa.
              </p>
            </div>
            <div className="qa">
              <h4>Meus dados ficam seguros?</h4>
              <p>
                Sim. Cada empresa fica isolada, os dados são criptografados, e empresas maiores
                podem usar a própria chave. Você manda nos seus dados.
              </p>
            </div>
            <div className="qa">
              <h4>Vou ter que jogar fora minha planilha ou meu CRM?</h4>
              <p>
                Não precisa. Comece centralizando o que está espalhado, do seu jeito, e expanda no
                seu ritmo.
              </p>
            </div>
            <div className="qa">
              <h4>Quanto tempo até começar a usar?</h4>
              <p>
                Minutos. Seu primeiro sistema sai já na primeira conversa — você viu acontecer aqui
                em cima.
              </p>
            </div>
            <div className="qa">
              <h4>Quanto custa?</h4>
              <p>
                Você cria sua conta grátis, sem cartão, com um limite de uso claro — dá pra testar
                de verdade. Quando precisar de mais, adiciona um cartão e amplia o limite. Você no
                controle, sem surpresa na fatura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="offer" id="comecar">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Comece agora
          </div>
          <h2>Monte seu primeiro sistema hoje</h2>
          <p className="lead">
            Escreva o que sua operação precisa e veja pronto em minutos. Sem cartão, sem
            compromisso.
          </p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Criar meu sistema grátis
            </a>
            <a className="btn btn-ghost btn-lg" href="#">
              Falar com a gente
            </a>
          </div>
          <div className="scar">✓ Comece grátis, sem cartão — cartão só pra ampliar o limite</div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter tagline="Monte o sistema da sua operação só conversando." />
    </div>
  );
}
