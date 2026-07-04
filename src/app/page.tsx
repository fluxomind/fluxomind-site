import Link from 'next/link';
import type { Metadata } from 'next';
import DemoBuilder from '@/components/DemoBuilder';
import BetaForm from '@/components/BetaForm';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import HexAgono360 from '@/components/HexAgono360';
import {
  SIGNATURE,
  PROMISE,
  NEGATION,
  FACES,
  TRUST_RULES,
  PHASE,
  PURPOSE_LINE,
  CTA,
} from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: { absolute: 'Fluxomind — delegue a tarefa, receba a conclusão com a prova' },
  description:
    'Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas. Veja a demonstração: o app se constrói na sua frente e opera o dia a dia, com humano nos casos sensíveis.',
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/', en: '/en' },
  },
};

// Assinatura canônica (messages.ts), com destaque visual na segunda frase.
const SIG_BREAK = SIGNATURE.indexOf('. ') + 1;
const SIG_HEAD = SIGNATURE.slice(0, SIG_BREAK); // "Delegue a tarefa."
const SIG_TAIL = SIGNATURE.slice(SIG_BREAK).trim(); // "Receba a conclusão com a prova."

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Ícones das 5 regras da confiança (mesma ordem de TRUST_RULES).
const TRUST_ICONS = [
  // Enquadramento — alvo
  <svg key="enquadramento" {...ICON_PROPS}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
  </svg>,
  // Coerência — pontas conectadas
  <svg key="coerencia" {...ICON_PROPS}>
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
    <path d="M7.2 12h9.6" />
    <path d="M12 9.8V7M12 14.2V17" />
  </svg>,
  // Correção + desfazer — seta de undo
  <svg key="correcao" {...ICON_PROPS}>
    <path d="M9 14l-4-4 4-4" />
    <path d="M5 10h9a5 5 0 0 1 0 10h-3" />
  </svg>,
  // Humano assume — pessoa
  <svg key="humano" {...ICON_PROPS}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20c1-3.8 3.6-5.6 6.5-5.6s5.5 1.8 6.5 5.6" />
  </svg>,
  // Seus dados, só seus — cadeado
  <svg key="dados" {...ICON_PROPS}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>,
];

const PHASE_CARDS = [
  { badge: 'b-impl', ...PHASE.exists },
  { badge: 'b-parc', ...PHASE.next },
  { badge: 'b-road', ...PHASE.vision },
];

// JSON-LD (schema.org) da seção de FAQ — espelha as perguntas e respostas
// renderizadas abaixo; ao mudar a copy da seção, atualize aqui também.
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Preciso saber programar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Você descreve o problema em português; o app se constrói e, para mudar, você conversa. Sem dev no caminho.',
      },
    },
    {
      '@type': 'Question',
      name: 'Meus dados ficam seguros?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada empresa fica isolada de verdade, os dados são criptografados e toda ação fica numa trilha à prova de adulteração. Quem exige pode trazer a própria chave. Os detalhes estão na página de Segurança.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vou ter que largar minha planilha ou meu CRM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O app nasce integrado ao que você já tem — WhatsApp, e-mail, API, seus sistemas — e você migra no seu ritmo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Em quanto tempo estou rodando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em semanas, não num projeto de meses. No beta, o time acompanha de perto: o primeiro caso a gente monta com você.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Durante o beta, ninguém pede cartão: o acesso é acompanhado e sem custo para começar. Os planos estão na página de Preços.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="page-home">
      <style>{HOME_CSS}</style>

      {/* NAV — CTA primário leva à demonstração (a conversão é viver a demo) */}
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} />

      {/* HERO */}
      <header className="hero">
        <div className="wrap" style={{ textAlign: 'center', paddingBottom: 48 }}>
          <span className="pill">
            <span className="lz" /> Plataforma em beta · a demonstração está logo abaixo
          </span>
          <h1 style={{ maxWidth: '24ch', margin: '0 auto' }}>
            {SIG_HEAD} <span className="g">{SIG_TAIL}</span>
          </h1>
          <p className="hsub" style={{ maxWidth: '62ch', margin: '18px auto 0' }}>
            {PROMISE} Se constrói a partir do que você pede — e fica mais inteligente quanto
            mais você usa.
          </p>
          <div className="herocta" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary btn-lg" href="/demo">
              {CTA.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href="#demo">
              Prévia em 1 minuto ↓
            </a>
          </div>
          <div className="reassure" style={{ justifyContent: 'center' }}>
            <span>
              <b>✓</b> Assista sem cadastro
            </span>
            <span>
              <b>✓</b> A prova na tela, a cada passo
            </span>
            <span>
              <b>✓</b> Humano assume nos casos sensíveis
            </span>
          </div>
        </div>
      </header>

      {/* A DEMO — o coração da página: construir e, depois, OPERAR */}
      <section
        id="demo"
        style={{
          background:
            'radial-gradient(900px 420px at 50% 0%, rgba(43,102,221,.28), transparent 60%), var(--ink)',
          color: '#fff',
        }}
      >
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              A demonstração
            </div>
            <h2 style={{ color: '#fff' }}>O app se constrói na sua frente. E depois, opera.</h2>
            <p className="lead" style={{ color: '#CdD3Dc', marginTop: 14 }}>
              Construir ficou fácil — qualquer IA te entrega um protótipo.{' '}
              <strong style={{ color: '#fff' }}>Operar é o que falta.</strong> Descreva um
              problema real e assista aos dois atos: o app nasce diante de você — e, trinta dias
              depois, está cuidando do dia a dia.
            </p>
          </div>
          <div style={{ maxWidth: 760, margin: '38px auto 0' }}>
            <DemoBuilder />
          </div>
        </div>
      </section>

      {/* O QUE RESOLVE */}
      <section id="usos">
        <div className="wrap">
          <div className="center">
            <div className="kick">O que resolve</div>
            <h2>Planilha, e-mail, dez ferramentas — e alguém reconciliando tudo na mão.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              É aí que a sua operação perde horas e a estratégia para. A Fluxomind tira isso das
              suas costas — você pede, <strong>ela executa</strong>, com a prova na tela e nada
              crítico saindo sem o seu OK. Comece por uma dor:
            </p>
          </div>
          <div className="uc">
            <Link className="ucc" href="/casos-de-uso/cobranca-e-contas-a-receber" data-track="home-uso-cobranca">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.6 9.2c-.6-.7-1.6-1.1-2.6-1.1-1.4 0-2.6.8-2.6 2s1.2 1.7 2.6 2 2.6.8 2.6 2-1.2 2-2.6 2c-1 0-2-.4-2.6-1.1" />
                  <path d="M12 6.4v11.2" />
                </svg>
              </div>
              <h4>Cobrança e inadimplência</h4>
              <p>“Cobra os 5 maiores em atraso, tom firme” — ela compõe as mensagens, mostra o preview e dispara só com o seu OK.</p>
            </Link>
            <Link className="ucc" href="/casos-de-uso/gestao-de-leads" data-track="home-uso-leads">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5h18l-7 8.2V20l-4 1.5v-8.3L3 5z" />
                </svg>
              </div>
              <h4>Funil de vendas</h4>
              <p>“Quais oportunidades pararam há 7 dias?” — ela cruza, te responde e agenda os follow-ups.</p>
            </Link>
            <Link className="ucc" href="/casos-de-uso" data-track="home-uso-onboarding">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3.3" />
                  <path d="M3.4 19.2c.7-3 3.1-4.7 5.6-4.7 1 0 2 .2 2.8.7" />
                  <path d="M14.6 16.4l2 2 3.6-3.9" />
                </svg>
              </div>
              <h4>Onboarding de clientes</h4>
              <p>“Monta o onboarding do cliente novo” — checklist, prazos e avisos, sem ninguém cair no esquecimento.</p>
            </Link>
            <Link className="ucc" href="/casos-de-uso" data-track="home-uso-aprovacoes">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
                  <path d="M13.5 3.5V8H18" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h4>Aprovações e contratos</h4>
              <p>“Aprovação em 2 níveis acima de um limite” — fluxo montado, histórico guardado, nada perdido no e-mail.</p>
            </Link>
            <Link className="ucc" href="/casos-de-uso/atendimento-whatsapp" data-track="home-uso-atendimento">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.4a8.4 8.4 0 0 1-12.3 7.5L4 20l1.1-4.2A8.4 8.4 0 1 1 21 11.4z" />
                </svg>
              </div>
              <h4>Atendimento no WhatsApp</h4>
              <p>Atende no WhatsApp e executa de verdade — responde, registra e age sobre os seus dados, não só conversa.</p>
            </Link>
            <Link className="ucc" href="/casos-de-uso" data-track="home-uso-paineis">
              <div className="ui" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4v16h16" />
                  <path d="M8 17v-4" />
                  <path d="M13 17V8" />
                  <path d="M18 17v-6" />
                </svg>
              </div>
              <h4>Painéis e relatórios</h4>
              <p>“Monta um painel de risco por faixa de atraso” — números ao vivo, sem ninguém montar planilha no fim do mês.</p>
            </Link>
          </div>
          <div className="fitlink" style={{ textAlign: 'center' }}>
            <Link href="/casos-de-uso" data-track="home-usos-todos">
              Todos os casos de uso, com demonstração ao vivo →
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como" className="why">
        <div className="wrap">
          <div className="center">
            <div className="kick">Como funciona</div>
            <h2>Do problema ao processo rodando, em 3 passos</h2>
          </div>
          <div className="steps3">
            <div className="s3">
              <div className="n">1</div>
              <h4>Descreva o problema</h4>
              <p>
                Em português, do seu jeito: “controlar clientes em atraso”, “organizar o
                onboarding”. Sem menus, sem código, sem projeto.
              </p>
            </div>
            <div className="s3">
              <div className="n">2</div>
              <h4>Veja o app se construir</h4>
              <p>
                Cadastros, telas, painéis e automações nascem na sua frente — com a prova na
                tela a cada passo.
              </p>
            </div>
            <div className="s3">
              <div className="n">3</div>
              <h4>Adote operado</h4>
              <p>
                O agente roda o dia a dia: detecta, prepara, executa com o seu OK — e escala
                para um humano nos casos sensíveis.
              </p>
            </div>
          </div>
          <div className="center" style={{ marginTop: 44 }}>
            <a className="btn btn-primary btn-lg" href="#comecar" data-track="como-beta-cta">
              {CTA.beta}
            </a>
          </div>
        </div>
      </section>

      {/* AS 6 PERGUNTAS + HEXÁGONO */}
      <section id="solucoes">
        <div className="wrap">
          <div className="center">
            <div className="kick">O que o seu app responde</div>
            <h2>Seis perguntas que todo negócio faz — o seu app responde às seis</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Qualquer operação cabe nelas. O seu app nasce respondendo às seis — e é isso que
              faz dele um sistema inteiro, não um protótipo.
            </p>
          </div>
          <div className="uc" style={{ marginTop: 38 }}>
            {FACES.map((f) => (
              <div className="ucc" key={f.key}>
                <div className="fmh-facelabel">{f.label}</div>
                <h4 style={{ marginTop: 6 }}>{f.q}</h4>
                <p>{f.gloss}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <HexAgono360 />
          </div>

          {/* Negação tripla */}
          <div className="fit fmh-neg" style={{ marginTop: 40 }}>
            <div className="nots">
              {NEGATION.nots.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            {/* 1ª menção do termo na página linka a definição canônica
                (/app-operante) — acoplado ao prefixo de NEGATION.is */}
            <p className="is">
              {NEGATION.is.startsWith('É um app operante') ? (
                <>
                  É um{' '}
                  <Link href="/app-operante" style={{ textDecoration: 'underline' }}>
                    app operante
                  </Link>
                  {NEGATION.is.slice('É um app operante'.length)}
                </>
              ) : (
                NEGATION.is
              )}
            </p>
          </div>
        </div>
      </section>

      {/* CONFIANÇA — as 5 regras */}
      <section className="sec" id="seguranca">
        <div className="wrap">
          <div className="center">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              As 5 regras da confiança
            </div>
            <h2 style={{ color: '#fff' }}>Confiar uma operação a um app exige regras. São cinco.</h2>
            <p className="lead" style={{ color: '#A9AEB8', marginTop: 14 }}>
              Elas vêm de fábrica, para qualquer app criado na plataforma — e são o que deixa
              você delegar sem medo.
            </p>
          </div>
          <div className="fmh-trust">
            {TRUST_RULES.map((r, i) => (
              <div className="secc" key={r.title}>
                <div className="si" aria-hidden="true">
                  {TRUST_ICONS[i]}
                </div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 30 }}>
            <Link
              className="btn btn-ghost"
              href="/seguranca"
              style={{ color: 'var(--sky)', borderColor: 'rgba(77,171,247,.4)' }}
            >
              Como cada regra é garantida, em detalhe →
            </Link>
          </div>
        </div>
      </section>

      {/* POR QUE EXISTIMOS — banda de propósito (message house §1.5) */}
      <section className="fmh-purpose">
        <div className="wrap center">
          <div className="kick">Por que existimos</div>
          <p className="fmh-purpose-line">{PURPOSE_LINE}</p>
          <Link href="/por-que" className="fmh-purpose-link">
            Leia por quê, na palavra de quem fundou →
          </Link>
        </div>
      </section>

      {/* ROTAS — banda discreta por perfil */}
      <section
        style={{
          padding: '30px 0',
          background: 'var(--panel)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="wrap fmh-routes">
          <span>
            Empresa maior? <Link href="/acelere">Adoção em escala →</Link>
          </span>
          <span>
            Time técnico? <Link href="/plataforma">A plataforma por dentro →</Link>
          </span>
        </div>
      </section>

      {/* PARA ONDE ISSO VAI — fato, lacuna e aposta */}
      <section id="para-onde">
        <div className="wrap">
          <div className="center">
            <div className="kick">Para onde isso vai</div>
            <h2>O que já existe, o que vem agora — e a visão</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Fato, lacuna e aposta — sem confundir os três. É assim que preferimos te contar.
            </p>
          </div>
          <div className="prob">
            {PHASE_CARDS.map((c) => (
              <div className="pcard" key={c.title}>
                <span className={`badge ${c.badge}`}>
                  <span className="d" /> {c.title}
                </span>
                <p style={{ color: 'var(--slate)', marginTop: 16, fontSize: 15.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p
            className="center"
            style={{ marginTop: 28, color: 'var(--mute)', fontSize: 14.5 }}
          >
            A visão — especialistas empacotando seus métodos em apps operantes — é o rumo
            declarado, não o presente. Vamos contando por aqui, capítulo a capítulo.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Dúvidas comuns</div>
            <h2>O que costumam perguntar</h2>
          </div>
          <div className="faq">
            <div className="qa">
              <h4>Preciso saber programar?</h4>
              <p>
                Não. Você descreve o problema em português; o app se constrói e, para mudar,
                você conversa. Sem dev no caminho.
              </p>
            </div>
            <div className="qa">
              <h4>Meus dados ficam seguros?</h4>
              <p>
                Cada empresa fica isolada de verdade, os dados são criptografados e toda ação
                fica numa trilha à prova de adulteração. Quem exige pode trazer a própria chave.
                Os detalhes estão em <Link href="/seguranca" style={{ color: 'var(--blue)', fontWeight: 600 }}>Segurança</Link>.
              </p>
            </div>
            <div className="qa">
              <h4>Vou ter que largar minha planilha ou meu CRM?</h4>
              <p>
                Não. O app nasce integrado ao que você já tem — WhatsApp, e-mail, API, seus
                sistemas — e você migra no seu ritmo.
              </p>
            </div>
            <div className="qa">
              <h4>Em quanto tempo estou rodando?</h4>
              <p>
                Em semanas, não num projeto de meses. No beta, o time acompanha de perto: o
                primeiro caso a gente monta com você.
              </p>
            </div>
            <div className="qa">
              <h4>Quanto custa?</h4>
              <p>
                Durante o beta, ninguém pede cartão: o acesso é acompanhado e sem custo para
                começar. Os planos estão em <Link href="/precos" style={{ color: 'var(--blue)', fontWeight: 600 }}>Preços</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL — captura primária (BetaForm; mailto vira fallback) */}
      <section className="offer" id="comecar">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            O próximo passo
          </div>
          <h2>Delegue a primeira tarefa</h2>
          <p className="lead">
            Conte qual problema você quer tirar das costas. No beta, montamos o primeiro app
            operante com você — e você recebe a conclusão com a prova.
          </p>
          <BetaForm />
          <div className="offerbtns" style={{ marginTop: 18 }}>
            <a
              className="btn btn-ghost btn-lg"
              href={PLATFORM_CONTACT}
              data-track="home-contact-cta"
            >
              Prefere conversar antes? {CTA.contact}
            </a>
          </div>
          <div className="scar">Beta acompanhado · sem cartão · em semanas, não meses</div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}

// Estilos específicos da home (não tocamos globals.css — compartilhado).
const HOME_CSS = `
.fmh-facelabel { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--blue); }
.fmh-trust { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 34px; }
@media (max-width: 1024px) { .fmh-trust { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .fmh-trust { grid-template-columns: 1fr 1fr; } }
@media (max-width: 440px) { .fmh-trust { grid-template-columns: 1fr; } }
.fmh-neg { text-align: center; }
.fmh-neg .nots { display: flex; gap: 10px 28px; justify-content: center; flex-wrap: wrap; color: #A9AEB8; font-size: 15px; }
.fmh-neg .nots span::before { content: "✕"; margin-right: 8px; color: #e58973; font-weight: 700; }
.fmh-neg .is { margin: 20px auto 0; color: #fff; font-size: clamp(17px, 2.1vw, 21px); font-weight: 700; line-height: 1.5; max-width: 58ch; }
.fmh-routes { display: flex; gap: 12px 48px; justify-content: center; flex-wrap: wrap; font-size: 15px; color: var(--slate); }
.fmh-routes a { color: var(--blue); font-weight: 600; }
.fmh-routes a:hover { text-decoration: underline; }
.fmh-purpose { padding: 64px 0; }
.fmh-purpose-line { margin: 16px auto 0; max-width: 30ch; font-size: clamp(21px, 2.8vw, 30px); font-weight: 750; line-height: 1.35; letter-spacing: -0.01em; }
.fmh-purpose-link { display: inline-block; margin-top: 18px; color: var(--blue); font-weight: 600; font-size: 15.5px; }
.fmh-purpose-link:hover { text-decoration: underline; }
`;
