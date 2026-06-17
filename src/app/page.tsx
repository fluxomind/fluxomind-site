import Link from 'next/link';
import DemoBuilder from '@/components/DemoBuilder';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TrackSelector from '@/components/TrackSelector';
import Solucoes from '@/components/Solucoes';
import { PLATFORM_CONTACT, PLATFORM_SIGNUP } from '@/lib/platform';

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
              <span className="lz" /> Plataforma operacional AI-first · beta por convite
            </span>
            <h1>
              Delegue a tarefa. <span className="g">Receba a conclusão com a prova.</span>
            </h1>
            <p className="hsub">
              A Fluxomind se constrói a partir do que você pede, opera sobre os seus dados e
              devolve a tarefa pronta — com a prova na tela. E fica mais inteligente quanto mais
              você usa.
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
                <b>✓</b> Sem compromisso
              </span>
              <span>
                <b>✓</b> A prova na tela, a cada passo
              </span>
              <span>
                <b>✓</b> Seus dados isolados e seguros
              </span>
            </div>
          </div>

          <DemoBuilder />
        </div>
      </header>

      {/* TRACK SELECTOR — 3 trilhas por tamanho (Message House §4) */}
      <TrackSelector />

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

      {/* SOLUÇÕES — as 6 perguntas de cliente (Message House §3) */}
      <section id="solucoes" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Soluções</div>
            <h2>Seis perguntas que todo negócio faz — uma plataforma que responde</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Não importa a sua operação: ela cabe em seis perguntas. A Fluxomind responde as seis,
              a partir do que você pede.
            </p>
          </div>
          <div style={{ marginTop: 38 }}>
            <Solucoes />
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT — moat (Atlas + flywheel + negação tripla) */}
      <section className="why">
        <div className="wrap">
          <div className="center">
            <div className="kick">O que não dá pra copiar</div>
            <h2>Quanto mais você usa, mais inteligente ela fica</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Não é um chatbot, não é um builder low-code, não é um wrapper de LLM — é a operação
              que se monta, opera e aprende com você.
            </p>
          </div>
          <div className="whyg">
            <div className="wcard">
              <div className="wi">🧠</div>
              <div>
                <h4>Entende o seu negócio</h4>
                <p>
                  Um cérebro semântico reconhece suas entidades e conecta seus dados. Ela trata a
                  sua operação como conhecimento — não como planilha solta.
                </p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">🔁</div>
              <div>
                <h4>Fica mais inteligente quanto mais usa</h4>
                <p>
                  Cada operação ensina a próxima. Com o tempo, ela passa a sugerir o próximo passo
                  sozinha — antes de você pedir.
                </p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">🧩</div>
              <div>
                <h4>Se constrói a partir do seu pedido</h4>
                <p>
                  Você descreve, e ela cria os objetos, as telas e os fluxos. Sem ciclo de TI no
                  caminho — você muda conversando.
                </p>
              </div>
            </div>
            <div className="wcard">
              <div className="wi">✅</div>
              <div>
                <h4>Entrega com prova, não com promessa</h4>
                <p>
                  Não é “a IA respondeu”. É “a tarefa foi feita — e aqui está a prova”, na tela, a
                  cada passo.
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
              Governança arquitetural desde o primeiro dia, sem você precisar configurar nada.
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
              <p>Trilha de auditoria encadeada por hash que detecta qualquer adulteração — verificável.</p>
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
                Liberado o seu acesso ao beta, o primeiro sistema sai já na primeira conversa —
                você viu acontecer aqui em cima.
              </p>
            </div>
            <div className="qa">
              <h4>Quanto custa?</h4>
              <p>
                Estamos em beta por convite: quem entra começa sem custo, com um limite de uso
                claro. Conforme o produto abre, os planos crescem com o uso — cartão só pra ampliar
                o limite, sem surpresa na fatura.
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
          <h2>Delegue a sua primeira tarefa hoje</h2>
          <p className="lead">
            Descreva o que precisa e veja a tarefa pronta, com a prova na tela. Beta por convite —
            entre na lista.
          </p>
          <div className="offerbtns">
            <a className="btn btn-primary btn-lg" href={PLATFORM_SIGNUP}>
              Criar meu sistema grátis
            </a>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT}>
              Falar com a gente
            </a>
          </div>
          <div className="scar">⏳ Beta por convite — estamos abrindo poucas vagas por mês</div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter tagline="Delegue a tarefa. Receba a conclusão com a prova." />
    </div>
  );
}
