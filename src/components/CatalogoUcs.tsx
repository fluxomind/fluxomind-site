'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { UC_INDEX as UC_INDEX_RAW, type UcIndex } from '@/lib/catalogo-ucs-index';
import { TITULOS_CMO } from '@/lib/catalogo-titulos';
import { track } from '@/lib/analytics';

// Camada de copy curada: título de marketing na tela; o título técnico
// upstream permanece pesquisável (a busca casa com os dois).
const UC_INDEX: (UcIndex & { tituloTec: string })[] = UC_INDEX_RAW.map((u) => ({
  ...u,
  tituloTec: u.titulo,
  titulo: TITULOS_CMO[u.id] ?? u.titulo,
}));

// Catálogo inspiracional dos 67 UCs (decisão do fundador 2026-07-06 —
// emenda ao ADR-0005): página ÚNICA com navegação por hash (#UC-007), sem
// rotas estáticas novas (anti conteúdo-programático). As lâminas completas
// vivem em /catalogo-laminas.json (288 KB) e carregam sob demanda; o grid é
// server-renderizado a partir do índice leve. Fonte e regeneração:
// scripts/gera-catalogo-ucs.py (contrato em docs/fontes-upstream.md).

type Lamina = {
  dor_hook: string;
  problema: string;
  pedido: string;
  escopo: { dentro: string[]; fora: string[]; evol: string[] };
  dims: { d: string; t: string }[];
  kpi: string;
  objecoes: { q: string; a: string }[];
};

const FAM: Record<string, { nome: string; desc: string }> = {
  A: { nome: 'Operações do dia a dia', desc: 'O back-office que consome as suas horas — CRM, cobrança, compras, RH — rodando sozinho.' },
  B: { nome: 'Agentes 24/7', desc: 'Operações que não podem cair: monitorar, agir e escalar — por semanas, sem ninguém lembrar.' },
  C: { nome: 'Seus clientes, atendidos', desc: 'O seu cliente final resolvendo tudo sozinho — WhatsApp, páginas públicas e portais.' },
  D: { nome: 'Por setor', desc: 'O dia a dia de clínicas, escritórios, agências, imobiliárias e mais — coberto de ponta a ponta.' },
  E: { nome: 'Multi-cliente (BPO)', desc: 'Para quem opera N clientes com o mesmo processo: padronize uma vez, replique para todos.' },
  F: { nome: 'Para onde isso vai — a visão', desc: 'Declarado como visão, não como fato: o catálogo de apps criados por especialistas.' },
  G: { nome: 'Garantias de fábrica', desc: 'Não são casos — são o que todo app herda: aprovações, trilha auditável, dados protegidos.' },
};
const SEG: Record<string, string> = { pme: 'PME', bpo: 'BPO / Operadores', agenda: 'Serviços com agenda', vsaas: 'vSaaS', todos: 'Todos' };
const CAP: Record<string, string> = {
  hitl: 'aprovação humana', 'workflow-duravel': 'rotinas duráveis', 'agente-operador': 'agente operador',
  'comm-whatsapp': 'WhatsApp', 'comm-email': 'E-mail', 'comm-sms': 'SMS', 'comm-voz': 'Voz',
  'bi-conversacional': 'BI conversacional', 'audit-trail': 'trilha de auditoria', 'pii-fail-closed': 'PII protegida',
  'face-web': 'página pública', 'portal-logado': 'portal do cliente', create_connector: 'conector a sistemas',
  instantiate_template: 'template instalável', marketplace: 'loja', payout: 'repasse ao criador',
  'canal-dados-consentido': 'dados consentidos', 'billing-creditos': 'créditos', 'evolucao-producao': 'evolui rodando',
};
const DEMOS = [
  { cen: 'caixa', slug: 'cobranca-e-contas-a-receber', titulo: 'Cobrança e contas a receber', ucs: ['UC-007', 'UC-022', 'UC-023'],
    hook: 'O vencimento passa e ninguém percebe na hora.',
    desc: 'A régua de cobrança rodando sozinha — lembrete, cobrança e renegociação no tom certo, e nada dispara sem o seu OK.' },
  { cen: 'leads', slug: 'gestao-de-leads', titulo: 'Leads e contratos', ucs: ['UC-001', 'UC-002', 'UC-003'],
    hook: 'Meu funil vive numa planilha e na minha cabeça — e proposta parada esfria sem ninguém perceber.',
    desc: 'O funil de ponta a ponta: cada lead vira registro vivo, o follow-up é cobrado sozinho e os contratos não se perdem.' },
  { cen: 'atendimento', slug: 'atendimento-whatsapp', titulo: 'Atendimento no WhatsApp', ucs: ['UC-006', 'UC-027'],
    hook: 'Meus clientes pedem tudo pelo WhatsApp — e uma pessoa responde isso o dia inteiro.',
    desc: 'O atendimento que resolve: agenda, remarca, confirma presença — e passa para o seu time quando o caso é sensível.' },
];
const DEMO_BY_UC: Record<string, (typeof DEMOS)[number]> = {};
DEMOS.forEach((d) => d.ucs.forEach((u) => (DEMO_BY_UC[u] = d)));

const BY_ID: Record<string, UcIndex> = Object.fromEntries(UC_INDEX.map((u) => [u.id, u]));
// ordem de "folhear": demos primeiro, depois A→G por id
const ORDER = UC_INDEX.slice()
  .sort((a, b) => (DEMO_BY_UC[b.id] ? 1 : 0) - (DEMO_BY_UC[a.id] ? 1 : 0) || a.fam.localeCompare(b.fam) || a.id.localeCompare(b.id))
  .map((u) => u.id);

const capName = (c: string) => CAP[c] || c;
const segName = (s: string) => SEG[s] || s;
const strip = (s: string) => (s || '').replace(/\*\*|\*|`/g, '').replace(/\[(.+?)\]\(.*?\)/g, '$1');

let laminasCache: Record<string, Lamina> | null = null;

export default function CatalogoUcs() {
  const [fam, setFam] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [ucAberto, setUcAberto] = useState<string | null>(null);
  const [laminas, setLaminas] = useState<Record<string, Lamina> | null>(laminasCache);

  // roteamento por hash — voltar do navegador funciona
  useEffect(() => {
    const route = () => {
      const id = window.location.hash.replace('#', '');
      setUcAberto(id && BY_ID[id] ? id : null);
      if (id && BY_ID[id]) {
        window.scrollTo(0, 0);
        track('catalogo_uc', { uc: id });
      }
    };
    route();
    window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, []);

  // com UC aberto, o hero do catálogo sai de cena (tela inteira p/ o conteúdo)
  useEffect(() => {
    document.body.classList.toggle('cuc-uc-open', Boolean(ucAberto));
    return () => document.body.classList.remove('cuc-uc-open');
  }, [ucAberto]);

  // lâminas sob demanda (uma vez)
  useEffect(() => {
    if (!ucAberto || laminasCache) return;
    fetch('/catalogo-laminas.json')
      .then((r) => r.json())
      .then((j) => {
        laminasCache = j;
        setLaminas(j);
      })
      .catch(() => {});
  }, [ucAberto]);

  // setas ← → folheiam quando um UC está aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!ucAberto) return;
      const i = ORDER.indexOf(ucAberto);
      if (e.key === 'Escape') fechaUc();
      if (e.key === 'ArrowLeft' && ORDER[i - 1]) window.location.hash = ORDER[i - 1];
      if (e.key === 'ArrowRight' && ORDER[i + 1]) window.location.hash = ORDER[i + 1];
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [ucAberto]);

  const fechaUc = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setUcAberto(null);
  }, []);

  const filtrado = useMemo(() => {
    const ql = q.toLowerCase();
    return UC_INDEX.filter((u) => {
      if (fam && u.fam !== fam) return false;
      if (!ql) return true;
      return (u.id + ' ' + u.titulo + ' ' + u.tituloTec + ' ' + u.dorHook).toLowerCase().includes(ql);
    });
  }, [fam, q]);

  const filtrando = Boolean(fam || q);

  if (ucAberto) {
    return (
      <div className="cuc">
        <style>{CSS}</style>
        <UcView id={ucAberto} lamina={laminas?.[ucAberto]} onVoltar={fechaUc} />
      </div>
    );
  }

  return (
    <div className="cuc">
      <style>{CSS}</style>

      <div className="cuc-tools">
        <label className="cuc-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Busque uma dor — ex.: cobrança, estoque, agenda…"
            aria-label="Buscar casos de uso"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <span className="cuc-count">{filtrando ? `${filtrado.length} de ${UC_INDEX.length} casos` : `${UC_INDEX.length} casos`}</span>
      </div>

      <div className="cuc-filters" role="group" aria-label="Filtrar por área">
        <button className={`cuc-fchip${fam === null ? ' on' : ''}`} onClick={() => setFam(null)}>
          Todas as áreas
        </button>
        {(['A', 'B', 'C', 'D', 'E'] as const).map((f) => (
          <button key={f} className={`cuc-fchip${fam === f ? ' on' : ''}`} onClick={() => setFam(f)}>
            {FAM[f].nome}
          </button>
        ))}
      </div>

      {!filtrando && (
        <section className="cuc-live">
          <div className="cuc-kick">
            <span className="dot" /> Veja ao vivo agora
          </div>
          <h2>Três casos com demonstração interativa</h2>
          <p className="note">O app se constrói na sua frente e você opera o processo — direto no navegador, sem cadastro.</p>
          <div className="cuc-lgrid">
            {DEMOS.map((d) => (
              <div className="cuc-lcard" key={d.cen}>
                <span className="lbadge">▶ demo ao vivo</span>
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
                <Link className="go" href={`/demo?cenario=${d.cen}`} data-track={`catalogo-demo-${d.cen}`}>
                  Viver este caso na demo →
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
        if (!list.length) return null;
        return (
          <section className="cuc-fam" key={f}>
            <div className="fh">
              <h2>{FAM[f].nome}</h2>
              <span className="n">{list.length} casos</span>
            </div>
            <p className="fd">{FAM[f].desc}</p>
            <div className="cuc-grid">
              {list.map((u) => (
                <a className="cuc-card" key={u.id} href={`#${u.id}`}>
                  <span className="cid">
                    <span className="mono">{u.id}</span>
                    {DEMO_BY_UC[u.id] && <span className="demo">▶ demo</span>}
                  </span>
                  <h4>{u.titulo}</h4>
                  {u.dorHook && <p className="hook">“{u.dorHook}”</p>}
                  <span className="meta">
                    {u.seg.map((s) => (
                      <span className="tag" key={s}>
                        {segName(s)}
                      </span>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      {filtrando && filtrado.length === 0 && (
        <p className="cuc-empty">Nenhum caso bate com essa busca — tente outra palavra (ex.: “cobrança”, “agenda”, “estoque”).</p>
      )}

      {!filtrando && (
        <>
          <section className="cuc-fam">
            <div className="fh">
              <h2>{FAM.G.nome}</h2>
            </div>
            <p className="fd">{FAM.G.desc}</p>
            <div className="cuc-gstrip">
              {UC_INDEX.filter((u) => u.fam === 'G').map((u) => (
                <a className="cuc-gchip" key={u.id} href={`#${u.id}`}>
                  <b>✓</b>
                  {u.titulo.split('(')[0].trim()}
                </a>
              ))}
            </div>
          </section>
          <section className="cuc-fam vis">
            <div className="fh">
              <h2>{FAM.F.nome}</h2>
              <span className="n">{UC_INDEX.filter((u) => u.fam === 'F').length} apostas</span>
            </div>
            <p className="fd">{FAM.F.desc}</p>
            <div className="cuc-grid">
              {UC_INDEX.filter((u) => u.fam === 'F').map((u) => (
                <a className="cuc-card" key={u.id} href={`#${u.id}`}>
                  <span className="cid">
                    <span className="mono">{u.id}</span>
                  </span>
                  <h4>{u.titulo}</h4>
                  {u.dorHook && <p className="hook">“{u.dorHook}”</p>}
                </a>
              ))}
            </div>
            <p className="vis-note">⚠ Honestidade de fase: esta seção é aposta declarada — ainda não existe no produto.</p>
          </section>
        </>
      )}
    </div>
  );
}

function UcView({ id, lamina, onVoltar }: { id: string; lamina?: Lamina; onVoltar: () => void }) {
  const u = BY_ID[id];
  const demo = DEMO_BY_UC[id];
  const i = ORDER.indexOf(id);
  const prev = ORDER[i - 1];
  const next = ORDER[i + 1];
  const p = lamina;
  const rel = demo ? demo.ucs.filter((x) => x !== id) : [];

  return (
    <div className="cuc-uc">
      <div className="crumbs">
        <button className="back" onClick={onVoltar}>
          ← Todos os casos
        </button>
        <span className="sep">/</span>
        <span className="here">{FAM[u.fam].nome}</span>
        <div className="pnav">
          <button disabled={!prev} onClick={() => prev && (window.location.hash = prev)}>
            ← anterior
          </button>
          <button disabled={!next} onClick={() => next && (window.location.hash = next)}>
            próximo →
          </button>
        </div>
      </div>

      <header className="uhead">
        <div className="row">
          <span className="uid mono">{id}</span>
          <span className="fpill">{FAM[u.fam].nome}</span>
          {u.fam === 'F' && <span className="fpill warn">visão · não existe ainda</span>}
          {demo && <span className="fpill live">▶ com demo ao vivo</span>}
        </div>
        <h2>{u.titulo}</h2>
        {p?.dor_hook && <p className="hook">“{p.dor_hook}”</p>}
      </header>

      {!p ? (
        <p className="cuc-loading">Carregando a lâmina…</p>
      ) : (
        <div className="ubody">
          <div className="umain">
            {p.problema && (
              <div className="blk">
                <h5>O problema — na voz de quem vive</h5>
                <p>{strip(p.problema)}</p>
              </div>
            )}
            {p.pedido && (
              <div className="blk">
                <h5>O pedido, em português — é assim que o app nasce</h5>
                <div className="pedido">{p.pedido}</div>
              </div>
            )}
            {p.escopo?.dentro.length > 0 && (
              <div className="blk">
                <h5>Escopo da primeira versão</h5>
                <div className="esc">
                  <div className="in">
                    <h6>Roda na v1</h6>
                    <ul>{p.escopo.dentro.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                  <div className="out">
                    <h6>Fora da v1</h6>
                    <ul>{p.escopo.fora.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                  <div className="ev">
                    <h6>Evolução</h6>
                    <ul>{p.escopo.evol.map((x) => <li key={x}>{strip(x)}</li>)}</ul>
                  </div>
                </div>
              </div>
            )}
            {p.dims.length > 0 && (
              <div className="blk">
                <h5>As seis perguntas que o app responde</h5>
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
                <h5>O que costumam perguntar</h5>
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
                <span className="lb">▶ demo ao vivo</span>
                <p>
                  Este caso faz parte da demonstração <b>{demo.titulo}</b> — o app se constrói na sua frente e você opera o processo.
                </p>
                <Link className="go" href={`/demo?cenario=${demo.cen}`} data-track={`catalogo-uc-demo-${demo.cen}`}>
                  Abrir a demo →
                </Link>
                <Link className="mais" href={`/casos-de-uso/${demo.slug}`}>
                  Ler a página completa deste caso →
                </Link>
              </div>
            )}
            {p?.kpi && (
              <div className="acard">
                <h5>A prova de valor</h5>
                <p>{strip(p.kpi)}</p>
              </div>
            )}
            <div className="acard">
              <h5>Para quem</h5>
              <div className="chips">
                {u.seg.map((s) => (
                  <span className="tag" key={s}>
                    {segName(s)}
                  </span>
                ))}
              </div>
            </div>
            <div className="acard">
              <h5>Capacidades da plataforma</h5>
              <div className="chips">
                {u.caps.map((c) => (
                  <span className="tag" key={c}>
                    {capName(c)}
                  </span>
                ))}
              </div>
            </div>
            {rel.length > 0 && (
              <div className="acard rel">
                <h5>Na mesma demo</h5>
                {rel.map((r) => (
                  <a key={r} href={`#${r}`}>
                    <span className="mono">{r}</span> {BY_ID[r].titulo.split('(')[0].trim()}
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
/* página do UC */
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
