import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CTA, FACES, NEGATION, SIGNATURE } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'O que faz',
  description:
    'Todo app da Fluxomind responde seis perguntas do seu negócio — dados, telas, decisões, o dia a dia, integrações e permissões — e passa a operar assim que existe. Em semanas, não meses.',
  alternates: {
    canonical: '/o-que-tem',
    languages: { 'pt-BR': '/o-que-tem', en: '/en/what-it-does' },
  },
};

// As 6 perguntas do seu app: redação canônica em src/lib/messages.ts (FACES).
// Aqui vive só o que é desta página: a glosa em voz de capacidade (o que a
// face FAZ, não o botão que você aperta) — ancorada na glosa canônica.
const FACE_DOES: Record<string, string> = {
  dominio:
    'Os dados e conceitos do seu negócio — clientes, pedidos, contratos — modelados a partir do que você descreve, sem desenhar uma tabela.',
  experiencia:
    'As telas e a interação: a mesma operação vira ficha no computador, conversa no WhatsApp e voz — e se ajusta conversando.',
  inteligencia:
    'Decisões e próximos passos: agentes que executam de verdade — cobram, respondem, organizam — apoiados por um cérebro que entende o seu negócio.',
  processo:
    'O dia a dia que roda sem você: automações e regras que disparam por evento — com aprovação nos pontos que importam.',
  conexoes:
    'WhatsApp, e-mail, API, seus sistemas: puxa o que você já usa e ainda vira ferramenta dentro de outros. Integra — não substitui na marra.',
  confianca:
    'Permissões, isolamento e prova: papéis, dados isolados de verdade e trilha de auditoria — e, no caso sensível, uma pessoa decide.',
};

const CARDS = FACES.map((f) => ({ ...f, does: FACE_DOES[f.key] }));

export default function OQueTem() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/what-it-does" />

      {/* 01 — HERO: o que ele FAZ, não os botões que você aperta */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">O que faz</p>
            <h1 className="fx-serif fx-h1">
              O que o seu app <span className="fx-em">faz</span> — não os botões que você aperta.
            </h1>
            <p className="fx-lead">
              Produto de verdade com IA não se vende pela lista de botões — se vende pelo trabalho
              que faz sozinho. Você delega a tarefa; o app <strong>atende, cobra e organiza</strong>{' '}
              no seu WhatsApp, 24/7, e age dentro da alçada que você definir.
            </p>
            <div className="fx-cta-row">
              <Link className="fx-btn fx-btn-primary" href="/demo" data-track="oquetem-hero-demo">
                {CTA.demo}
              </Link>
              <a className="fx-btn fx-btn-ghost" href="#perguntas">
                Ver a anatomia →
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 02 — AUTONOMIA, NÃO FEATURES: a negação tripla */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Autonomia, não features</p>
          <h2 className="fx-serif fx-h2">
            Não é mais uma ferramenta para você operar. É o <span className="fx-em">trabalho, feito</span>.
          </h2>
          <p className="fx-body">
            Software antigo te dá um painel e um cargo novo: operador. O seu app faz o contrário —
            assume a tarefa e presta contas. Por isso a pergunta certa nunca é o que ele tem, e sim o
            que ele faz sem você.
          </p>
          <ul className="fx-list fx-mt-s">
            {NEGATION.nots.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="fx-quote fx-mt">{NEGATION.is}</p>
        </div>
      </section>

      {/* 03 — A ANATOMIA: as seis perguntas que fazem dele um sistema inteiro */}
      <section className="fx-sec fx-sec-alt" id="perguntas">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">A anatomia</p>
            <h2 className="fx-serif fx-h2">
              Seis perguntas do seu negócio — respondidas <span className="fx-em">de uma vez</span>.
            </h2>
            <p className="fx-body">
              Você não monta módulo a módulo. Descreve o problema, e a Fluxomind esculpe as seis
              respostas juntas, da mesma conversa. É isso que faz dele um sistema inteiro — não um
              protótipo que você ainda precisa terminar.
            </p>
          </div>

          <div className="fx-grid3 fx-mt">
            {CARDS.map((f) => (
              <div className="fx-card" key={f.key}>
                <span className="fx-label">{f.label}</span>
                <h3>{f.q}</h3>
                <p>{f.does}</p>
              </div>
            ))}
          </div>

          <div className="fx-narrow fx-mt">
            <p className="fx-body">
              Duas dessas perguntas guardam o segredo: <strong>Processo</strong> faz o dia a dia
              rodar sem você, e <strong>Confiança</strong> garante que, no caso sensível, quem decide
              é uma pessoa. O seu app não só existe — <strong>ele opera</strong>.
            </p>
            <p>
              <Link href="/seguranca" data-track="oquetem-seguranca">
                Como a confiança é garantida →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 04 — APP OPERANTE VS PROJETO DE CÓDIGO */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">App vs projeto de código</p>
            <h2 className="fx-serif fx-h2">
              Construir ficou fácil. O que falta é <span className="fx-em">operar</span>.
            </h2>
            <p className="fx-body">
              Qualquer IA hoje te entrega um protótipo — e, a partir daí, o código é seu para manter.
              A Fluxomind monta as seis respostas sobre uma plataforma que já está de pé, com dados,
              telas, governança e conexões prontos. O resultado é um app operante — em{' '}
              <span className="fx-em">semanas, não meses</span>.
            </p>
          </div>

          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>projeto de código que você mantém</h4>
              <ul>
                <li>Nasce do zero — o código vira sua responsabilidade para sempre.</li>
                <li>Multi-tenant, papéis, permissões? Você implementa, ou fica sem.</li>
                <li>Cada pedido novo é mais código colado; o drift é questão de tempo.</li>
                <li>Uma superfície só — web não vira WhatsApp nem voz sozinho.</li>
                <li>Construído, não operante: rodar o dia a dia continua com você.</li>
              </ul>
            </div>
            <div className="fx-ftarrow">→</div>
            <div className="fx-ft to">
              <h4>app operante que trabalha</h4>
              <ul>
                <li>Montado sobre uma plataforma de pé — zero código para você manter.</li>
                <li>Multi-tenancy, papéis e permissões herdados de fábrica.</li>
                <li>Muda conversando, sobre a mesma fonte da verdade — sem drift.</li>
                <li>A mesma operação vira tela, WhatsApp, voz e ferramenta via MCP.</li>
                <li>Opera o dia a dia e escala para um humano no caso sensível.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CTA: entrar no beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-center fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            O próximo passo
          </p>
          <h2 className="fx-serif fx-h2">Quer isso respondendo pelo seu negócio?</h2>
          <p className="fx-body" style={{ margin: '0 auto' }}>
            Entre no beta privado e conte o processo que você quer delegar — o time monta o primeiro
            app com você. Ou fale direto com a gente.
          </p>
          <div className="fx-cta-row fx-mt-s">
            <Link className="fx-btn fx-btn-primary" href="/#comecar" data-track="oquetem-beta-cta">
              {CTA.beta}
            </Link>
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT} data-track="oquetem-contact">
              {CTA.contact}
            </a>
          </div>
          <div className="fx-mt-s">
            <Link href="/plataforma" data-track="oquetem-plataforma">
              Quer ver como tudo isso é construído e provado? Veja a plataforma por dentro →
            </Link>
          </div>
          <div className="fx-scar">Beta acompanhado · sem cartão · em semanas, não meses</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
