import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Acelere — do piloto à produção',
  description:
    'Para a empresa que já tentou IA e viu pilotos morrerem: 62% já experimentam agentes, só 23% conseguem operá-los de verdade (McKinsey, 2025). A Fluxomind entrega o processo operado — o agente roda o dia a dia, um humano decide nos casos sensíveis, integrado ao que você já tem.',
  alternates: {
    canonical: '/acelere',
    languages: { 'pt-BR': '/acelere', en: '/en/accelerate' },
  },
};

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Ícone de check para as feature rows (fx-feat).
const CHECK = (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Capacidade de gente grande — governança já em produção (badge b-impl).
const GOVERNANCE = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
    title: 'Isolamento por empresa',
    desc: 'Cada empresa fica isolada de verdade e os dados são criptografados. O que é de uma nunca encosta na outra.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9.5 14l1.8 1.8L15 12" />
      </svg>
    ),
    title: 'Trilha à prova de adulteração',
    desc: 'Cada ação — o que propôs, o que você decidiu e o que aconteceu no mundo — fica registrada e verificável. Auditoria de verdade, não log solto.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="15" r="4" />
        <path d="M10.8 12.2L20 3M17 6l2 2M14 9l2 2" />
      </svg>
    ),
    title: 'LGPD, papéis e permissões',
    desc: 'Controle de acesso por papel, mascaramento do que é sensível e tratamento de dados conforme a LGPD — de fábrica, em todo app.',
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 18a8 8 0 1 1 16 0" />
        <path d="M12 18l4.5-4.5" />
        <circle cx="12" cy="18" r="1.2" />
      </svg>
    ),
    title: 'Controle de custo',
    desc: 'Limites de uso por processo e visibilidade do gasto de IA — sem surpresa na fatura, sem inferência queimada à toa.',
  },
];

// Entregue operado — o que “rodando” significa na prática.
const OPERATED = [
  {
    title: 'O agente roda o dia a dia',
    desc: 'Cobrança que acompanha o atraso, follow-up que não esquece, aprovação que anda. O processo acontece sem depender de alguém lembrar dele.',
  },
  {
    title: 'Um humano decide nos casos sensíveis',
    desc: 'Desconto fora da alçada, valor alto, cliente delicado: o app escala para uma pessoa do seu time. A IA propõe; quem manda decide.',
  },
  {
    title: 'Senta ao redor do que você já tem',
    desc: 'O ERP, o CRM e o WhatsApp que a sua empresa já usa ficam onde estão. O app integra por API, e-mail e WhatsApp — sem projeto de substituição.',
  },
];

export default function Acelere() {
  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/accelerate" />

      {/* HERO — a capacidade de gente grande, entregue simples */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap">
          <span className="fx-pill">
            <span className="fx-lz" /> Beta privado · empresa maior, atendida por procura
          </span>
          <p className="fx-eyebrow">Adoção em escala</p>
          <h1 className="fx-serif fx-h1" style={{ maxWidth: '20ch' }}>
            Capacidade de gente grande. Simplicidade de <span className="fx-em">WhatsApp</span>.
          </h1>
          <p className="fx-lead">
            <em>Enterprise-grade by design, SMB-first by choice.</em> A governança de uma
            corporação — isolamento por empresa, auditoria à prova de adulteração, LGPD — já em
            produção, entregue a quem delega no WhatsApp. Empresa maior que chega por conta própria
            é atendida com o mesmo produto: <strong>sem RFP, sem projeto de meses</strong>.
          </p>
          <div className="fx-cta-row">
            <a className="fx-btn fx-btn-primary" href={PLATFORM_CONTACT} data-track="acelere-contact-cta">
              {CTA.contact}
            </a>
            <Link className="fx-btn fx-btn-ghost" href="/#comecar" data-track="acelere-beta">
              Entrar no beta
            </Link>
          </div>
          <div className="fx-reassure">
            <span>Mesmo produto para todo porte</span>
            <span>Governança já em produção</span>
            <span>Sem projeto de meses</span>
          </div>
        </div>
      </header>

      {/* 01 — A TENSÃO: o caminho caro da empresa maior */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">A tensão</p>
          <h2 className="fx-serif fx-h2">
            Empresa maior costuma pagar caro pra chegar até aqui.
          </h2>
          <div className="fx-gap">
            <div className="fx-gapn">
              <b className="fx-serif">62%</b>
              <span>já experimentam agentes de IA (McKinsey, 2025)</span>
            </div>
            <div className="fx-gaparrow">→</div>
            <div className="fx-gapn">
              <b className="fx-serif">23%</b>
              <span>conseguem colocá-los para operar de verdade (McKinsey, 2025)</span>
            </div>
          </div>
          <p className="fx-body">
            O caminho de sempre é longo: RFP, comitê, um projeto de meses e uma integração que
            substitui na marra o que já funciona — tudo antes do primeiro resultado. E, no fim,
            muita vez um piloto que impressionou na demo e nunca virou produção. O gargalo nunca
            foi construir. É <strong>operar, governar e integrar</strong> todo dia — e é
            exatamente essa parte que a Fluxomind entrega pronta.
          </p>
        </div>
      </section>

      {/* 02 — A CAPACIDADE: governança de corporação, já em produção */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">A capacidade</p>
            <h2 className="fx-serif fx-h2">
              A governança de uma corporação — <span className="fx-em">já em produção</span>.
            </h2>
            <p className="fx-body">
              Não é promessa de roadmap enterprise. Isolamento por empresa, trilha à prova de
              adulteração e controle de custo já rodam hoje — a mesma exigência de uma corporação,
              entregue a quem opera pelo WhatsApp.
            </p>
          </div>
          <div className="fx-grid2 fx-mt">
            {GOVERNANCE.map((g) => (
              <div className="fx-card" key={g.title}>
                <span className="fx-ico">{g.icon}</span>
                <div style={{ marginBottom: 10 }}>
                  <span className="fx-badge b-impl">
                    <span className="fx-d" /> Em produção
                  </span>
                </div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="fx-note fx-mt-s">
            <strong>Honestidade de fase.</strong> Isso está em produção, hoje, no beta privado —
            acompanhado de perto pelo nosso time. SLA formal e certificações estão no roadmap: a
            gente não promete o que ainda não entrega.
          </div>
        </div>
      </section>

      {/* 03 — ENTREGUE OPERADO: trabalho feito, não software */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Entregue operado</p>
          <h2 className="fx-serif fx-h2">
            Você não recebe uma ferramenta. Recebe o <span className="fx-em">trabalho feito</span>.
          </h2>
          <p className="fx-body">
            Trabalho feito — não mais um software para o time aprender a dirigir. O que chega na sua
            empresa já chega rodando:
          </p>
          <div className="fx-mt">
            {OPERATED.map((o) => (
              <div className="fx-feat" key={o.title}>
                <span className="fx-ck" aria-hidden="true">
                  {CHECK}
                </span>
                <div>
                  <h4>{o.title}</h4>
                  <p>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fx-mt-s">
            <Link href="/seguranca">Como a governança e a segurança funcionam, em detalhe →</Link>
          </p>
        </div>
      </section>

      {/* 04 — ADOÇÃO POR PROCURA: mesmo contrato, sem o ritual enterprise */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Como você adota</p>
            <h2 className="fx-serif fx-h2">Atendida por procura. Não por proposta.</h2>
            <p className="fx-body">
              Empresa maior que chega por conta própria é atendida seletivamente — o mesmo produto,
              sem o ritual de venda enterprise. Começa por um processo que dói e cresce a partir da
              prova, área a área.
            </p>
          </div>
          <div className="fx-fromto fx-mt">
            <div className="fx-ft from">
              <h4>O caminho de sempre</h4>
              <ul>
                <li>RFP e comitê antes de ver qualquer valor</li>
                <li>Projeto de meses, com implementação longa</li>
                <li>Substituição na marra dos sistemas que funcionam</li>
                <li>Um piloto que impressiona na demo e morre antes da produção</li>
              </ul>
            </div>
            <div className="fx-ftarrow">→</div>
            <div className="fx-ft to">
              <h4>Com a Fluxomind</h4>
              <ul>
                <li>Você procura; a gente atende seletivamente</li>
                <li>Um processo primeiro — em semanas, não meses</li>
                <li>Senta ao redor do que você já tem</li>
                <li>Opera de verdade, com a prova de cada ação</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CTA FINAL */}
      <section className="fx-sec fx-cta-band" id="contato">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            O próximo passo
          </p>
          <h2 className="fx-serif fx-h2">
            Traga a operação que hoje exige um projeto. Saia com um processo rodando.
          </h2>
          <p className="fx-body" style={{ margin: '0 auto', maxWidth: '58ch' }}>
            Conte qual processo você quer delegar. A gente atende quem chega por conta própria —
            mesmo produto, sem RFP — e desenha com o seu time o primeiro app operante da empresa.
          </p>
          <div className="fx-cta-row fx-mt-s">
            <a className="fx-btn fx-btn-primary" href={PLATFORM_CONTACT} data-track="acelere-contact-cta">
              {CTA.contact}
            </a>
            <Link className="fx-btn fx-btn-ghost" href="/#comecar" data-track="acelere-beta">
              Entrar no beta
            </Link>
          </div>
          <p className="fx-mt-s">
            <Link href="/plataforma">Prefere ir a fundo antes? Veja a avaliação técnica →</Link>
          </p>
          <div className="fx-scar">Beta acompanhado · governança em produção · em semanas, não meses</div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
