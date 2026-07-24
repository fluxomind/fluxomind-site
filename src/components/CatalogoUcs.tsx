'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { UC_INDEX as UC_INDEX_RAW, type UcIndex } from '@/lib/catalogo-ucs-index';
import { TITULOS_CMO } from '@/lib/catalogo-titulos';
import { TITULOS_CMO_EN } from '@/lib/catalogo-titulos-en';
import { DOR_HOOK_EN } from '@/lib/catalogo-hooks-en';
import { track } from '@/lib/analytics';

// Catálogo inspiracional dos 67 UCs — bilíngue (prop `lang`), decisões do
// fundador 2026-07-06 (emenda ao ADR-0005): página única com navegação por
// hash, sem rotas estáticas novas. Lâminas por idioma em
// /catalogo-laminas[-en].json (sob demanda). Copy EN: títulos curados
// (catalogo-titulos-en.ts) + lâminas traduzidas (camada do site até a fonte
// upstream emitir EN). Pipelines: scripts/gera-catalogo-ucs.py e
// scripts/merge-laminas-en.py.

type Lang = 'pt' | 'en';
interface Lamina {
  dor_hook: string;
  problema: string;
  pedido: string;
  escopo: { dentro: string[]; fora: string[]; evol: string[] };
  dims: { d: string; t: string }[];
  kpi: string;
  objecoes: { q: string; a: string }[];
}

const FAM: Record<Lang, Record<string, { nome: string; desc: string }>> = {
  pt: {
    A: { nome: 'Operações do dia a dia', desc: 'O back-office que consome as suas horas — CRM, cobrança, compras, RH — rodando sozinho.' },
    B: { nome: 'Agentes 24/7', desc: 'Operações que não podem cair: monitorar, agir e escalar — por semanas, sem ninguém lembrar.' },
    C: { nome: 'Seus clientes, atendidos', desc: 'O seu cliente final resolvendo tudo sozinho — WhatsApp, páginas públicas e portais.' },
    D: { nome: 'Por setor', desc: 'O dia a dia de clínicas, escritórios, agências, imobiliárias e mais — coberto de ponta a ponta.' },
    E: { nome: 'Multi-cliente (BPO)', desc: 'Para quem opera N clientes com o mesmo processo: padronize uma vez, replique para todos.' },
    F: { nome: 'Para onde isso vai — a visão', desc: 'Declarado como visão, não como fato: o catálogo de apps criados por especialistas.' },
    G: { nome: 'Garantias de fábrica', desc: 'Não são casos — são o que todo app herda: aprovações, trilha auditável, dados protegidos.' },
  },
  en: {
    A: { nome: 'Day-to-day operations', desc: 'The back office that eats your hours — sales, collections, purchasing, HR — running on its own.' },
    B: { nome: '24/7 agents', desc: 'Operations that cannot drop: monitor, act and escalate — for weeks, with no one having to remember.' },
    C: { nome: 'Your customers, served', desc: 'Your end customer resolving everything on their own — WhatsApp, public pages and portals.' },
    D: { nome: 'By industry', desc: 'The day-to-day of clinics, law firms, agencies, real estate and more — covered end to end.' },
    E: { nome: 'Multi-client (BPO)', desc: 'For those who run N clients on the same process: standardize once, replicate for all.' },
    F: { nome: 'Where this is going — the vision', desc: 'Declared as vision, not fact: a catalog of apps created by experts.' },
    G: { nome: 'Built-in guarantees', desc: 'Not use cases — what every app inherits: approvals, an auditable trail, protected data.' },
  },
};
const SEG: Record<Lang, Partial<Record<string, string>>> = {
  pt: { pme: 'PME', bpo: 'BPO / Operadores', agenda: 'Serviços com agenda', vsaas: 'vSaaS', todos: 'Todos' },
  en: { pme: 'SMB', bpo: 'BPO / Operators', agenda: 'Appointment-based services', vsaas: 'vSaaS', todos: 'All' },
};
const CAP: Record<Lang, Partial<Record<string, string>>> = {
  pt: {
    hitl: 'aprovação humana', 'workflow-duravel': 'rotinas duráveis', 'agente-operador': 'agente operador',
    'comm-whatsapp': 'WhatsApp', 'comm-email': 'E-mail', 'comm-sms': 'SMS', 'comm-voz': 'Voz',
    'bi-conversacional': 'BI conversacional', 'audit-trail': 'trilha de auditoria', 'pii-fail-closed': 'PII protegida',
    'face-web': 'página pública', 'portal-logado': 'portal do cliente', create_connector: 'conector a sistemas',
    instantiate_template: 'template instalável', marketplace: 'loja', payout: 'repasse ao criador',
    'canal-dados-consentido': 'dados consentidos', 'billing-creditos': 'créditos', 'evolucao-producao': 'evolui rodando',
  },
  en: {
    hitl: 'human approval', 'workflow-duravel': 'durable routines', 'agente-operador': 'operating agent',
    'comm-whatsapp': 'WhatsApp', 'comm-email': 'Email', 'comm-sms': 'SMS', 'comm-voz': 'Voice',
    'bi-conversacional': 'conversational BI', 'audit-trail': 'audit trail', 'pii-fail-closed': 'PII protected',
    'face-web': 'public page', 'portal-logado': 'client portal', create_connector: 'system connectors',
    instantiate_template: 'installable template', marketplace: 'store', payout: 'creator payout',
    'canal-dados-consentido': 'consented data', 'billing-creditos': 'credits', 'evolucao-producao': 'evolves while running',
  },
};
const DEMOS: Record<Lang, { cen: string; slug: string; titulo: string; ucs: string[]; hook: string; desc: string }[]> = {
  pt: [
    { cen: 'caixa', slug: 'cobranca-e-contas-a-receber', titulo: 'Cobrança e contas a receber', ucs: ['UC-007', 'UC-022', 'UC-023'],
      hook: 'O vencimento passa e ninguém percebe na hora.',
      desc: 'A régua de cobrança rodando sozinha — lembrete, cobrança e renegociação no tom certo, e nada dispara sem o seu OK.' },
    { cen: 'leads', slug: 'gestao-de-leads', titulo: 'Leads e contratos', ucs: ['UC-001', 'UC-002', 'UC-003'],
      hook: 'Meu funil vive numa planilha e na minha cabeça — e proposta parada esfria sem ninguém perceber.',
      desc: 'O funil de ponta a ponta: cada lead vira registro vivo, o follow-up é cobrado sozinho e os contratos não se perdem.' },
    { cen: 'atendimento', slug: 'atendimento-whatsapp', titulo: 'Atendimento no WhatsApp', ucs: ['UC-006', 'UC-027'],
      hook: 'Meus clientes pedem tudo pelo WhatsApp — e uma pessoa responde isso o dia inteiro.',
      desc: 'O atendimento que resolve: agenda, remarca, confirma presença — e passa para o seu time quando o caso é sensível.' },
  ],
  en: [
    { cen: 'caixa', slug: 'collections-and-accounts-receivable', titulo: 'Collections and accounts receivable', ucs: ['UC-007', 'UC-022', 'UC-023'],
      hook: 'The due date passes and nobody notices in time.',
      desc: 'The collections cadence running on its own — reminder, collection and renegotiation in the right tone, and nothing goes out without your OK.' },
    { cen: 'leads', slug: 'lead-management', titulo: 'Leads and contracts', ucs: ['UC-001', 'UC-002', 'UC-003'],
      hook: 'My sales funnel lives in a spreadsheet and in my head — and stalled deals go cold with nobody noticing.',
      desc: 'The funnel end to end: every lead becomes a living record, follow-ups are chased on their own and contracts never get lost.' },
    { cen: 'atendimento', slug: 'whatsapp-support', titulo: 'WhatsApp support', ucs: ['UC-006', 'UC-027'],
      hook: 'My customers ask for everything on WhatsApp — and one person answers it all day long.',
      desc: 'Support that resolves: books, reschedules, confirms attendance — and hands off to your team when the case is sensitive.' },
  ],
};
const UI: Record<Lang, Record<string, string>> = {
  pt: {
    buscar: 'Busque uma dor — ex.: cobrança, estoque, agenda…', buscarAria: 'Buscar casos de uso',
    de: 'de', casos: 'casos', todasAreas: 'Todas as áreas', apostas: 'apostas',
    liveKick: 'Veja ao vivo agora', liveTitle: 'Três casos com demonstração interativa',
    liveNote: 'O app se constrói na sua frente e você opera o processo — direto no navegador, sem cadastro.',
    demoBadge: '▶ demo ao vivo', viver: 'Viver este caso na demo →',
    vazio: 'Nenhum caso bate com essa busca — tente outra palavra (ex.: “cobrança”, “agenda”, “estoque”).',
    visNote: '⚠ Honestidade de fase: esta seção é aposta declarada — ainda não existe no produto.',
    voltar: '← Todos os casos', anterior: '← anterior', proximo: 'próximo →',
    visaoPill: 'visão · não existe ainda', comDemoPill: '▶ com demo ao vivo',
    carregando: 'Carregando a lâmina…',
    hProblema: 'O problema — na voz de quem vive', hPedido: 'O pedido, em português — é assim que o app nasce',
    hEscopo: 'Escopo da primeira versão', rodaV1: 'Roda na v1', foraV1: 'Fora da v1', evolucao: 'Evolução',
    hDims: 'As seis perguntas que o app responde', hObjecoes: 'O que costumam perguntar',
    hProva: 'A prova de valor', hParaQuem: 'Para quem', hCaps: 'Capacidades da plataforma', hMesmaDemo: 'Na mesma demo',
    demoAside: 'Este caso faz parte da demonstração', demoAside2: '— o app se constrói na sua frente e você opera o processo.',
    abrirDemo: 'Abrir a demo →', lerPagina: 'Ler a página completa deste caso →',
  },
  en: {
    buscar: 'Search a pain — e.g. collections, inventory, bookings…', buscarAria: 'Search use cases',
    de: 'of', casos: 'cases', todasAreas: 'All areas', apostas: 'bets',
    liveKick: 'See it live now', liveTitle: 'Three cases with an interactive demo',
    liveNote: 'The app builds itself in front of you and you operate the process — right in the browser, no sign-up.',
    demoBadge: '▶ live demo', viver: 'Live this case in the demo →',
    vazio: 'No case matches that search — try another word (e.g. “collections”, “bookings”, “inventory”).',
    visNote: '⚠ Phase honesty: this section is a declared bet — it does not exist in the product yet.',
    voltar: '← All cases', anterior: '← previous', proximo: 'next →',
    visaoPill: 'vision · not built yet', comDemoPill: '▶ with live demo',
    carregando: 'Loading the case…',
    hProblema: 'The problem — in the owner’s words', hPedido: 'The request, in plain words — this is how the app is born',
    hEscopo: 'Scope of the first version', rodaV1: 'Runs in v1', foraV1: 'Not in v1', evolucao: 'Evolution',
    hDims: 'The six questions the app answers', hObjecoes: 'What people usually ask',
    hProva: 'The proof of value', hParaQuem: 'Who it is for', hCaps: 'Platform capabilities', hMesmaDemo: 'In the same demo',
    demoAside: 'This case is part of the', demoAside2: 'demo — the app builds itself in front of you and you operate the process.',
    abrirDemo: 'Open the demo →', lerPagina: 'Read the full page for this case →',
  },
};

const DEMO_HREF: Record<Lang, string> = { pt: '/demo', en: '/en/demo' };
const CASE_BASE: Record<Lang, string> = { pt: '/casos-de-uso', en: '/en/use-cases' };

function buildList(lang: Lang): (UcIndex & { tituloTec: string })[] {
  const tit = lang === 'en' ? TITULOS_CMO_EN : TITULOS_CMO;
  return UC_INDEX_RAW.map((u) => ({
    ...u,
    tituloTec: u.titulo,
    titulo: tit[u.id] ?? u.titulo,
    dorHook: lang === 'en' ? DOR_HOOK_EN[u.id] ?? '' : u.dorHook,
  }));
}
const LISTS: Record<Lang, (UcIndex & { tituloTec: string })[]> = { pt: buildList('pt'), en: buildList('en') };
const strip = (s: string) => s.replace(/\*\*|\*|`/g, '').replace(/\[(.+?)\]\(.*?\)/g, '$1');

const laminasCache: Partial<Record<Lang, Record<string, Lamina>>> = {};

export default function CatalogoUcs({ lang = 'pt' }: { lang?: Lang }) {
  const L = UI[lang];
  const FAM_L = FAM[lang];
  const LIST = LISTS[lang];
  const BY_ID: Partial<Record<string, (typeof LIST)[number]>> = useMemo(
    () => Object.fromEntries(LIST.map((u) => [u.id, u])),
    [LIST],
  );
  const DEMO_BY_UC: Partial<Record<string, (typeof DEMOS)[Lang][number]>> = useMemo(() => {
    const m: Partial<Record<string, (typeof DEMOS)[Lang][number]>> = {};
    DEMOS[lang].forEach((d) => { d.ucs.forEach((u) => (m[u] = d)); });
    return m;
  }, [lang]);
  const ORDER = useMemo(
    () =>
      LIST.slice()
        .sort((a, b) => (DEMO_BY_UC[b.id] ? 1 : 0) - (DEMO_BY_UC[a.id] ? 1 : 0) || a.fam.localeCompare(b.fam) || a.id.localeCompare(b.id))
        .map((u) => u.id),
    [LIST, DEMO_BY_UC],
  );

  const [fam, setFam] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [ucAberto, setUcAberto] = useState<string | null>(null);
  const [laminas, setLaminas] = useState<Record<string, Lamina> | null>(laminasCache[lang] ?? null);
  const fechaUc = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setUcAberto(null);
  }, []);

  useEffect(() => {
    const route = () => {
      const id = window.location.hash.replace('#', '');
      const match = BY_ID[id];
      setUcAberto(match ? id : null);
      if (match) {
        window.scrollTo(0, 0);
        track('catalogo_uc', { uc: id });
      }
    };
    route();
    window.addEventListener('hashchange', route);
    return () => { window.removeEventListener('hashchange', route); };
  }, [BY_ID]);

  // com UC aberto, o hero da página sai de cena (tela inteira p/ o conteúdo)
  useEffect(() => {
    document.body.classList.toggle('cuc-uc-open', Boolean(ucAberto));
    return () => { document.body.classList.remove('cuc-uc-open'); };
  }, [ucAberto]);

  useEffect(() => {
    if (!ucAberto || laminasCache[lang]) {return;}
    fetch(lang === 'en' ? '/catalogo-laminas-en.json' : '/catalogo-laminas.json')
      .then(async (r) => (await r.json()) as unknown)
      .then((raw) => {
        const j = raw as Record<string, Lamina>;
        laminasCache[lang] = j;
        setLaminas(j);
      })
      .catch(() => undefined);
  }, [ucAberto, lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!ucAberto) {return;}
      const i = ORDER.indexOf(ucAberto);
      if (e.key === 'Escape') {fechaUc();}
      if (e.key === 'ArrowLeft' && ORDER[i - 1]) {window.location.hash = ORDER[i - 1];}
      if (e.key === 'ArrowRight' && ORDER[i + 1]) {window.location.hash = ORDER[i + 1];}
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); };
  }, [ucAberto, ORDER, fechaUc]);

  const filtrado = useMemo(() => {
    const ql = q.toLowerCase();
    return LIST.filter((u) => {
      if (fam && u.fam !== fam) {return false;}
      if (!ql) {return true;}
      return (u.id + ' ' + u.titulo + ' ' + u.tituloTec + ' ' + u.dorHook).toLowerCase().includes(ql);
    });
  }, [LIST, fam, q]);

  const filtrando = Boolean(fam ?? q);

  const openedUc = ucAberto ? BY_ID[ucAberto] : undefined;
  if (ucAberto && openedUc) {
    return (
      <div className="cuc" lang={lang === 'en' ? 'en' : undefined}>
        <style>{CSS}</style>
        <UcView
          id={ucAberto}
          lang={lang}
          u={openedUc}
          demo={DEMO_BY_UC[ucAberto]}
          order={ORDER}
          lamina={laminas?.[ucAberto]}
          onVoltar={fechaUc}
        />
      </div>
    );
  }

  return (
    <div className="cuc" lang={lang === 'en' ? 'en' : undefined}>
      <style>{CSS}</style>

      <div className="cuc-tools">
        <label className="cuc-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input type="search" placeholder={L.buscar} aria-label={L.buscarAria} value={q} onChange={(e) => { setQ(e.target.value); }} />
        </label>
        <span className="cuc-count">
          {filtrando ? `${filtrado.length} ${L.de} ${LIST.length} ${L.casos}` : `${LIST.length} ${L.casos}`}
        </span>
      </div>

      <div className="cuc-filters" role="group" aria-label={L.buscarAria}>
        <button className={`cuc-fchip${fam === null ? ' on' : ''}`} onClick={() => { setFam(null); }}>
          {L.todasAreas}
        </button>
        {(['A', 'B', 'C', 'D', 'E'] as const).map((f) => (
          <button key={f} className={`cuc-fchip${fam === f ? ' on' : ''}`} onClick={() => { setFam(f); }}>
            {FAM_L[f].nome}
          </button>
        ))}
      </div>

      {!filtrando && (
        <section className="cuc-live">
          <div className="cuc-kick">
            <span className="dot" /> {L.liveKick}
          </div>
          <h2>{L.liveTitle}</h2>
          <p className="note">{L.liveNote}</p>
          <div className="cuc-lgrid">
            {DEMOS[lang].map((d) => (
              <div className="cuc-lcard" key={d.cen}>
                <span className="lbadge">{L.demoBadge}</span>
                <h3>{d.titulo}</h3>
                <p className="hook">“{d.hook}”</p>
                <p className="desc">{d.desc}</p>
                <div className="ids">
                  {d.ucs.map((u) => (
                    <a key={u} className="mono" href={`#${u}`}>
                      {u}
                    </a>
                  ))}
                </div>
                <Link className="go" href={`${DEMO_HREF[lang]}?cenario=${d.cen}`} data-track={`catalogo-demo-${d.cen}`}>
                  {L.viver}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {(['A', 'B', 'C', 'D', 'E'] as const).map((f) => {
        const list = filtrado
          .filter((u) => u.fam === f)
          .sort((a, b) => (DEMO_BY_UC[b.id] ? 1 : 0) - (DEMO_BY_UC[a.id] ? 1 : 0) || a.id.localeCompare(b.id));
        if (!list.length) {return null;}
        return (
          <section className="cuc-fam" key={f}>
            <div className="fh">
              <h2>{FAM_L[f].nome}</h2>
              <span className="n">
                {list.length} {L.casos}
              </span>
            </div>
            <p className="fd">{FAM_L[f].desc}</p>
            <div className="cuc-grid">
              {list.map((u) => (
                <a className="cuc-card" key={u.id} href={`#${u.id}`}>
                  <span className="cid">
                    <span className="mono">{u.id}</span>
                    {DEMO_BY_UC[u.id] && <span className="demo">{L.demoBadge.replace(' ao vivo', '').replace(' live', '')}</span>}
                  </span>
                  <h4>{u.titulo}</h4>
                  {u.dorHook && <p className="hook">“{u.dorHook}”</p>}
                  <span className="meta">
                    {u.seg.map((s) => (
                      <span className="tag" key={s}>
                        {SEG[lang][s] ?? s}
                      </span>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      {filtrando && filtrado.length === 0 && <p className="cuc-empty">{L.vazio}</p>}

      {!filtrando && (
        <>
          <section className="cuc-fam">
            <div className="fh">
              <h2>{FAM_L.G.nome}</h2>
            </div>
            <p className="fd">{FAM_L.G.desc}</p>
            <div className="cuc-gstrip">
              {LIST.filter((u) => u.fam === 'G').map((u) => (
                <a className="cuc-gchip" key={u.id} href={`#${u.id}`}>
                  <b>✓</b>
                  {u.titulo}
                </a>
              ))}
            </div>
          </section>
          <section className="cuc-fam vis">
            <div className="fh">
              <h2>{FAM_L.F.nome}</h2>
              <span className="n">
                {LIST.filter((u) => u.fam === 'F').length} {L.apostas}
              </span>
            </div>
            <p className="fd">{FAM_L.F.desc}</p>
            <div className="cuc-grid">
              {LIST.filter((u) => u.fam === 'F').map((u) => (
                <a className="cuc-card" key={u.id} href={`#${u.id}`}>
                  <span className="cid">
                    <span className="mono">{u.id}</span>
                  </span>
                  <h4>{u.titulo}</h4>
                  {u.dorHook && <p className="hook">“{u.dorHook}”</p>}
                </a>
              ))}
            </div>
            <p className="vis-note">{L.visNote}</p>
          </section>
        </>
      )}
    </div>
  );
}

function UcView({
  id,
  lang,
  u,
  demo,
  order,
  lamina,
  onVoltar,
}: {
  id: string;
  lang: Lang;
  u: UcIndex & { tituloTec: string };
  demo?: { cen: string; slug: string; titulo: string; ucs: string[] };
  order: string[];
  lamina?: Lamina;
  onVoltar: () => void;
}) {
  const L = UI[lang];
  const i = order.indexOf(id);
  const prev = order[i - 1];
  const next = order[i + 1];
  const p = lamina;
  const rel = demo ? demo.ucs.filter((x) => x !== id) : [];
  const LIST = LISTS[lang];
  const byId: Record<string, (typeof LIST)[number]> = Object.fromEntries(LIST.map((x) => [x.id, x]));

  return (
    <div className="cuc-uc">
      <div className="crumbs">
        <button className="back" onClick={onVoltar}>
          {L.voltar}
        </button>
        <span className="sep">/</span>
        <span className="here">{FAM[lang][u.fam].nome}</span>
        <div className="pnav">
          <button disabled={!prev} onClick={() => prev && (window.location.hash = prev)}>
            {L.anterior}
          </button>
          <button disabled={!next} onClick={() => next && (window.location.hash = next)}>
            {L.proximo}
          </button>
        </div>
      </div>

      <header className="uhead">
        <div className="row">
          <span className="uid mono">{id}</span>
          <span className="fpill">{FAM[lang][u.fam].nome}</span>
          {u.fam === 'F' && <span className="fpill warn">{L.visaoPill}</span>}
          {demo && <span className="fpill live">{L.comDemoPill}</span>}
        </div>
        <h2>{u.titulo}</h2>
        {p?.dor_hook && <p className="hook">“{p.dor_hook}”</p>}
      </header>

      {!p ? (
        <p className="cuc-loading">{L.carregando}</p>
      ) : (
        <div className="ubody">
          <div className="umain">
            {p.problema && (
              <div className="blk">
                <h5>{L.hProblema}</h5>
                <p>{strip(p.problema)}</p>
              </div>
            )}
            {p.pedido && (
              <div className="blk">
                <h5>{L.hPedido}</h5>
                <div className="pedido">{p.pedido}</div>
              </div>
            )}
            {p.escopo.dentro.length > 0 && (
              <div className="blk">
                <h5>{L.hEscopo}</h5>
                <div className="esc">
                  <div className="in">
                    <h6>{L.rodaV1}</h6>
                    <ul>{p.escopo.dentro.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                  <div className="out">
                    <h6>{L.foraV1}</h6>
                    <ul>{p.escopo.fora.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                  <div className="ev">
                    <h6>{L.evolucao}</h6>
                    <ul>{p.escopo.evol.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                </div>
              </div>
            )}
            {p.dims.length > 0 && (
              <div className="blk">
                <h5>{L.hDims}</h5>
                <div className="dims">
                  <table>
                    <tbody>
                      {p.dims.map((d) => (
                        <tr key={d.d}>
                          <td>{strip(d.d)}</td>
                          <td>{strip(d.t)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {p.objecoes.length > 0 && (
              <div className="blk">
                <h5>{L.hObjecoes}</h5>
                {p.objecoes.map((o) => (
                  <div className="qa" key={o.q}>
                    <b>{strip(o.q)}</b>
                    <p>{strip(o.a)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="uaside">
            {demo && (
              <div className="acard ademo">
                <span className="lb">{L.demoBadge}</span>
                <p>
                  {L.demoAside} <b>{demo.titulo}</b> {L.demoAside2}
                </p>
                <Link className="go" href={`${DEMO_HREF[lang]}?cenario=${demo.cen}`} data-track={`catalogo-uc-demo-${demo.cen}`}>
                  {L.abrirDemo}
                </Link>
                <Link className="mais" href={`${CASE_BASE[lang]}/${demo.slug}`}>
                  {L.lerPagina}
                </Link>
              </div>
            )}
            {p.kpi && (
              <div className="acard">
                <h5>{L.hProva}</h5>
                <p>{strip(p.kpi)}</p>
              </div>
            )}
            <div className="acard">
              <h5>{L.hParaQuem}</h5>
              <div className="chips">
                {u.seg.map((s) => (
                  <span className="tag" key={s}>
                    {SEG[lang][s] ?? s}
                  </span>
                ))}
              </div>
            </div>
            <div className="acard">
              <h5>{L.hCaps}</h5>
              <div className="chips">
                {u.caps.map((c) => (
                  <span className="tag" key={c}>
                    {CAP[lang][c] ?? c}
                  </span>
                ))}
              </div>
            </div>
            {rel.length > 0 && (
              <div className="acard rel">
                <h5>{L.hMesmaDemo}</h5>
                {rel.map((r) => (
                  <a key={r} href={`#${r}`}>
                    <span className="mono">{r}</span> {byId[r].titulo}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

const CSS = `
body.cuc-uc-open .hero{display:none}
.cuc{--amber:#f5b83d;--amber-ink:#2a2107;--ok:#3dd68c}
.cuc .mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.cuc .tag{font-size:10px;letter-spacing:.03em;background:rgba(127,140,160,.14);border-radius:5px;padding:2.5px 7px;color:var(--mute)}
.cuc-tools{display:flex;align-items:center;gap:12px;margin-top:26px;flex-wrap:wrap}
.cuc-search{flex:1;min-width:240px;max-width:460px;display:flex;align-items:center;gap:8px;background:var(--panel,rgba(127,140,160,.08));border:1px solid var(--line);border-radius:10px;padding:8px 12px}
.cuc-search svg{width:14px;height:14px;color:var(--mute);flex:none}
.cuc-search input{flex:1;background:none;border:none;outline:none;color:inherit;font:inherit;font-size:13.5px}
.cuc-count{font-size:12px;color:var(--mute);font-variant-numeric:tabular-nums}
.cuc-filters{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.cuc-fchip{border:1px solid var(--line);background:none;color:var(--slate);border-radius:999px;padding:7px 14px;font-size:13px;cursor:pointer;transition:.15s;font-family:inherit}
.cuc-fchip:hover{color:inherit;border-color:var(--sky)}
.cuc-fchip.on{background:var(--blue);border-color:var(--blue);color:#fff}
.cuc-fchip:focus-visible,.cuc-card:focus-visible{outline:2px solid var(--sky);outline-offset:2px}
.cuc-live{margin-top:34px}
.cuc-kick{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--amber)}
.cuc-kick .dot{width:8px;height:8px;border-radius:50%;background:var(--amber);animation:cucpulse 2s infinite}
@keyframes cucpulse{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion: reduce){.cuc-kick .dot{animation:none}}
.cuc-live h2{margin-top:8px;font-size:22px;font-weight:800;letter-spacing:-.02em}
.cuc-live .note{color:var(--slate);font-size:14px;margin-top:4px}
.cuc-lgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:18px}
.cuc-lcard{background:linear-gradient(160deg,rgba(245,184,61,.10),transparent 60%);border:1px solid rgba(245,184,61,.4);border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:10px;transition:.18s}
.cuc-lcard:hover{transform:translateY(-3px);border-color:var(--amber)}
.lbadge{align-self:flex-start;font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;background:var(--amber);color:var(--amber-ink);border-radius:999px;padding:4px 10px}
.cuc-lcard h3{font-size:18px;font-weight:800}
.cuc-lcard .hook{color:var(--slate);font-size:14px;font-style:italic}
.cuc-lcard .desc{color:var(--slate);font-size:13.5px}
.cuc-lcard .ids{display:flex;gap:6px;flex-wrap:wrap}
.cuc-lcard .ids a{font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid var(--line);color:var(--slate)}
.cuc-lcard .ids a:hover{color:inherit;border-color:var(--sky)}
.cuc-lcard .go{margin-top:auto;display:inline-flex;background:var(--blue);color:#fff;font-weight:700;font-size:14px;border-radius:10px;padding:10px 16px;width:fit-content}
.cuc-fam{margin-top:44px}
.cuc-fam .fh{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.cuc-fam .fh h2{font-size:19px;font-weight:800}
.cuc-fam .fh .n{font-size:12px;color:var(--mute);font-variant-numeric:tabular-nums}
.cuc-fam .fd{color:var(--slate);font-size:13.5px;margin-top:4px;max-width:70ch}
.cuc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(258px,1fr));gap:12px;margin-top:16px}
.cuc-card{border:1px solid var(--line);border-radius:14px;padding:16px 16px 14px;cursor:pointer;display:flex;flex-direction:column;gap:8px;transition:.16s;color:inherit}
.cuc-card:hover{border-color:var(--sky);transform:translateY(-2px)}
.cuc-card .cid{display:flex;gap:8px;font-size:10.5px;color:var(--mute)}
.cuc-card .cid .demo{color:var(--amber);font-weight:700}
.cuc-card h4{font-size:14.5px;font-weight:700;line-height:1.35}
.cuc-card .hook{font-size:12.5px;color:var(--slate);font-style:italic;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cuc-card .meta{margin-top:auto;display:flex;gap:5px;flex-wrap:wrap}
.vis .cuc-card{opacity:.82;border-style:dashed}
.vis-note{margin-top:12px;font-size:12.5px;color:var(--mute)}
.cuc-gstrip{margin-top:16px;display:flex;gap:8px;flex-wrap:wrap}
.cuc-gchip{display:flex;gap:8px;border:1px solid var(--line);border-radius:10px;padding:9px 13px;font-size:12.5px;color:var(--slate);transition:.15s}
.cuc-gchip:hover{color:inherit;border-color:var(--sky)}
.cuc-gchip b{color:var(--ok)}
.cuc-empty{margin:30px 0;color:var(--mute);font-size:14px}
.cuc-loading{margin:40px 0;color:var(--mute)}
.crumbs{display:flex;align-items:center;gap:10px;padding:24px 0 0;flex-wrap:wrap}
.back{display:inline-flex;gap:7px;background:none;border:1px solid var(--line);border-radius:9px;padding:8px 13px;font-size:13px;color:var(--slate);cursor:pointer;font-family:inherit;transition:.15s}
.back:hover{color:inherit;border-color:var(--sky)}
.crumbs .sep,.crumbs .here{color:var(--mute);font-size:12px}
.pnav{margin-left:auto;display:flex;gap:8px}
.pnav button{background:none;border:1px solid var(--line);border-radius:9px;padding:8px 13px;font-size:13px;color:var(--slate);cursor:pointer;font-family:inherit;transition:.15s}
.pnav button:hover:not(:disabled){color:inherit;border-color:var(--sky)}
.pnav button:disabled{opacity:.35;cursor:default}
.uhead{padding:26px 0 6px;border-bottom:1px solid var(--line);margin-bottom:26px}
.uhead .row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.uhead .uid{font-size:12px;color:var(--mute)}
.fpill{font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--sky);border:1px solid rgba(77,171,247,.4);border-radius:999px;padding:3px 9px}
.fpill.warn{color:var(--amber);border-color:rgba(245,184,61,.4)}
.fpill.live{color:var(--amber);border-color:rgba(245,184,61,.45)}
.uhead h2{margin-top:12px;font-size:clamp(24px,3.4vw,34px);font-weight:800;letter-spacing:-.025em;line-height:1.15;max-width:28ch}
.uhead .hook{margin:14px 0 22px;font-size:18px;color:var(--slate);font-style:italic;border-left:3px solid var(--blue);padding-left:16px;max-width:64ch}
.ubody{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:40px;align-items:start;padding-bottom:56px}
@media (max-width: 900px){.ubody{grid-template-columns:1fr}.uaside{order:-1;position:static}}
.umain{max-width:70ch;display:flex;flex-direction:column;gap:30px}
.cuc .blk h5{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--sky);margin-bottom:9px}
.cuc .blk>p{color:var(--slate);font-size:15.5px;line-height:1.7}
.pedido{border:1px solid var(--line);border-left:3px solid var(--blue);border-radius:12px;padding:20px 22px;font-size:14.5px;color:var(--slate);line-height:1.7;white-space:pre-line}
.esc{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}
.esc>div{border:1px solid var(--line);border-radius:10px;padding:14px}
.esc h6{font-size:10px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px}
.esc .in h6{color:var(--ok)}.esc .out h6{color:var(--mute)}.esc .ev h6{color:var(--amber)}
.esc li{font-size:12.8px;color:var(--slate);margin-left:14px;margin-top:4px;line-height:1.5}
.dims{overflow-x:auto}
.dims table{border-collapse:collapse;width:100%;font-size:13.5px}
.dims td{border-top:1px solid var(--line);padding:9px 10px 9px 0;vertical-align:top;color:var(--slate);line-height:1.55}
.dims td:first-child{font-weight:700;color:inherit;white-space:nowrap;padding-right:18px}
.qa{border-top:1px solid var(--line);padding:12px 0}
.qa b{font-size:14.5px}
.qa p{font-size:13.8px;color:var(--slate);margin-top:4px;line-height:1.6}
.uaside{position:sticky;top:84px;display:flex;flex-direction:column;gap:14px}
.acard{border:1px solid var(--line);border-radius:14px;padding:18px}
.acard h5{font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--mute);margin-bottom:10px}
.acard .chips{display:flex;gap:5px;flex-wrap:wrap}
.acard p{font-size:13px;color:var(--slate);line-height:1.6}
.acard.ademo{background:linear-gradient(160deg,rgba(245,184,61,.10),transparent 65%);border-color:rgba(245,184,61,.45)}
.acard.ademo .lb{display:inline-flex;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;background:var(--amber);color:var(--amber-ink);border-radius:999px;padding:3px 9px;margin-bottom:10px}
.acard.ademo .go{display:flex;justify-content:center;background:var(--blue);color:#fff;font-weight:700;font-size:14px;border-radius:10px;padding:11px 14px;margin-top:12px}
.acard.ademo .mais{display:block;text-align:center;font-size:12.5px;color:var(--sky);margin-top:10px;text-decoration:underline}
.rel a{display:flex;gap:8px;align-items:baseline;padding:7px 0;border-top:1px solid var(--line);font-size:12.5px;color:var(--slate)}
.rel a:hover{color:inherit}
.rel a .mono{font-size:10.5px;color:var(--mute)}
`;
