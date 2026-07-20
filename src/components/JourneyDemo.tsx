'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import { isEdit, type CenarioId, type DemoCopy, type LogE, type Registro } from '@/lib/demo-copy';

/* ------------------------------------------------------------------
   A jornada interativa — o visitante CRIA um app conversando.

   Diferente da demo narrada da home (DemoBuilder, dois atos), aqui o
   visitante dirige: escolhe um cenário (ou descreve em prosa), entrega
   uma planilha de exemplo, vê o espelho, corrige premissas, manda montar
   — e recebe um RASCUNHO VIVO que ele opera ANTES de decidir "ficar com
   ele". Aprova o que vê, não uma lista técnica.

   São 3 cenários, e CADA UM materializa uma SUPERFÍCIE diferente — a tese
   "o software se molda ao seu negócio" tem que ser vista, não afirmada:
     · leads       → kanban (pipeline é a forma natural)
     · caixa       → financeiro (faixa de indicadores + tabela de faturas)
     · atendimento → chats (fila + conversa estilo WhatsApp; o assistente
                     EXECUTA — agenda, confirma, encaminha o clínico)
   Todo o conteúdo variável vive no registro CENARIOS; a mecânica (locks,
   autopilot, replay) é a mesma. O cenário ativo fica em cenarioRef
   (síncrona) para o replay determinístico — voltar re-executa O MESMO.

   As 5 regras da confiança (messages.ts) acendem nos momentos em que
   acontecem — a message house demonstrada, não afirmada.

   Eventos de funil: jornada_* (docs/leads-analytics.md).
   Demonstração ilustrativa com dados de exemplo — rótulo honesto.
   Respeita prefers-reduced-motion (passos imediatos).
   ------------------------------------------------------------------ */

type CardId =
  | 'espelho'
  | 'enquadrar'
  | 'desenho'
  | 'gate'
  | 'hitl'
  | 'publicar'
  | 'evoluir'
  | 'cta';

type Item =
  | { kind: 'msg'; who: 'ally' | 'user'; text: string }
  | { kind: 'note'; text: string }
  | { kind: 'build' }
  | { kind: 'card'; card: CardId; resolved?: string };

// --------- **negrito** dentro de strings de conteúdo (premissas, HITL) ---------
function boldify(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : p));
}

const valOf = (r: Registro) => Number((r.meta.valor ?? '0').replace(/[^\d]/g, ''));

export default function JourneyDemo({ copy }: { copy: DemoCopy }) {
  // Todo o conteúdo variável (pt/en) vem do dicionário. Aliases locais mantêm
  // a lógica do componente idêntica: CENARIOS/STAGES/STATUS_COLOR/ENTRY_EXAMPLES
  // referenciam o copy, sem espalhar copy.* pela mecânica.
  const CENARIOS = copy.cenarios;
  const CENARIO_IDS = Object.keys(CENARIOS) as CenarioId[];
  const STAGES = copy.stages;
  const STATUS_COLOR = copy.statusColor;
  const ENTRY_EXAMPLES = copy.entry.examples;
  const INITIAL_ITEMS: Item[] = [{ kind: 'msg', who: 'ally', text: copy.entry.greeting }];
  const routeCenario = (text: string): CenarioId => {
    const t = text.toLowerCase();
    if (copy.route.caixa.test(t)) return 'caixa';
    if (copy.route.atendimento.test(t)) return 'atendimento';
    return 'leads';
  };

  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [stage, setStage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [cenarioId, setCenarioId] = useState<CenarioId>('leads');
  const [premEditada, setPremEditada] = useState(false);
  const [buildDone, setBuildDone] = useState(0);
  const [stagesK, setStagesK] = useState<string[]>(CENARIOS.leads.columns);
  const [records, setRecords] = useState<Registro[]>([]);
  const [view, setView] = useState<'kanban' | 'table' | 'record'>('kanban');
  const [recordId, setRecordId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statFilter, setStatFilter] = useState<'aberto' | 'vencido' | 'neg' | null>(null);
  const [draft, setDraft] = useState<'none' | 'building' | 'draft' | 'kept' | 'published'>('none');
  const [trust, setTrust] = useState<boolean[]>([false, false, false, false, false]);
  const [evolveState, setEvolveState] = useState<'none' | 'applied' | 'undone'>('none');
  const [newOpen, setNewOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  // digitação emulada (autopilot): mostra a mensagem do VC sendo digitada no
  // input real antes de virar bolha — dá a sensação de "alguém usando de verdade".
  const [emulating, setEmulating] = useState(false);
  // placeholder máquina-de-escrever na tela de entrada (antes de started)
  const [phText, setPhText] = useState('');
  // mobile: um painel por vez (chat ⇄ app), padrão do protótipo DP087
  const [pane, setPane] = useState<'chat' | 'app'>('chat');
  const [touched, setTouched] = useState(false);
  // v5: reveal transiente quando o app "entra em cena" (draft nasce)
  const [justRevealed, setJustRevealed] = useState(false);

  const clockRef = useRef(31);
  const genRef = useRef(0);
  const reducedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emulatingRef = useRef(false); // trava síncrona da emulação de digitação
  const skipRef = useRef(false); // clique no input → conclui a emulação na hora
  const touchedRef = useRef(false);
  // cenário ativo, síncrono — sobrevive ao resetAll do replay (voltar re-executa
  // O MESMO cenário). Só muda antes de started (pill) ou via roteamento do texto livre.
  const cenarioRef = useRef<CenarioId>('leads');
  // trava síncrona de início: 2 cliques no mesmo tick (ou 1 em cada pill de
  // entrada) não podem disparar jornadas paralelas — estado React é assíncrono
  const startedRef = useRef(false);
  const beginOnce = () => {
    if (startedRef.current) return false;
    startedRef.current = true;
    setStarted(true);
    return true;
  };
  // trava síncrona anti double-click: um card interativo só age uma vez
  // (clique duplo dispara 2 handlers antes do re-render remover o botão)
  const lockRef = useRef<Set<string>>(new Set());
  const lock = (k: string) => {
    if (lockRef.current.has(k)) return false;
    lockRef.current.add(k);
    return true;
  };
  const unlock = (k: string) => lockRef.current.delete(k);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Deep-link: /demo?cenario=leads|caixa|atendimento inicia a jornada direto
  // naquele cenário (entrada das páginas de caso de uso). Lido do window no
  // cliente — useSearchParams exigiria Suspense sem ganho aqui, pois o valor
  // só importa uma vez, no mount. Parâmetro inválido/ausente = entrada normal
  // (pills). beginOnce torna o re-run do StrictMode inócuo.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('cenario');
    if (q === 'leads' || q === 'caixa' || q === 'atendimento') startPlanilha(q, 'link');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const n = scrollRef.current;
    if (n) n.scrollTop = n.scrollHeight;
  }, [items, typing]);

  // v5: quando o rascunho nasce (draft) o app assume o palco — dispara o reveal
  useEffect(() => {
    if (draft !== 'draft') {
      // se o draft avançar antes do timeout, desarma a classe — senão o próximo reveal não anima
      setJustRevealed(false);
      return;
    }
    setJustRevealed(true);
    const t = window.setTimeout(() => setJustRevealed(false), 900);
    return () => window.clearTimeout(t);
  }, [draft]);

  // placeholder máquina-de-escrever na entrada: cicla os exemplos dos 3 cenários.
  // Roda no idle da tela de entrada; para quando o usuário digita (chatText != '')
  // e retoma se limpar. Respeita prefers-reduced-motion (fica estático).
  useEffect(() => {
    if (started || reducedRef.current || chatText !== '') {
      setPhText('');
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let ti = 0; // exemplo
    let ci = 0; // caractere
    let mode: 'typing' | 'pause' | 'deleting' = 'typing';
    const tick = () => {
      if (cancelled) return;
      const ex = ENTRY_EXAMPLES[ti];
      if (mode === 'typing') {
        ci += 1;
        setPhText(ex.slice(0, ci));
        if (ci >= ex.length) {
          mode = 'pause';
          timer = setTimeout(tick, 1800);
        } else {
          timer = setTimeout(tick, 45 + Math.random() * 30);
        }
      } else if (mode === 'pause') {
        mode = 'deleting';
        timer = setTimeout(tick, 30);
      } else {
        ci -= 2;
        if (ci <= 1) {
          // pula pro próximo exemplo já com 1 char — nunca fica vazio (sem flash)
          ti = (ti + 1) % ENTRY_EXAMPLES.length;
          ci = 1;
          mode = 'typing';
          setPhText(ENTRY_EXAMPLES[ti].slice(0, 1));
          timer = setTimeout(tick, 220);
        } else {
          setPhText(ex.slice(0, ci));
          timer = setTimeout(tick, 25);
        }
      }
    };
    timer = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [started, chatText, ENTRY_EXAMPLES]);

  const now = () => {
    clockRef.current += 1;
    return `14:${String(clockRef.current).padStart(2, '0')}`;
  };
  const delay = (ms: number) =>
    new Promise<void>((r) => setTimeout(r, reducedRef.current ? 0 : ms));

  const push = useCallback((...add: Item[]) => setItems((p) => [...p, ...add]), []);
  const resolveCard = useCallback((card: CardId, label: string) => {
    setItems((p) => p.map((i) => (i.kind === 'card' && i.card === card ? { ...i, resolved: label } : i)));
  }, []);

  async function ally(text: string, ms = 700) {
    const gen = genRef.current;
    setTyping(true);
    await delay(ms);
    if (genRef.current !== gen) return; // recomeçar/rebuild cancelou esta fala
    setTyping(false);
    push({ kind: 'msg', who: 'ally', text });
  }

  // Emula digitação humana da mensagem do VC no input real e então a envia como
  // bolha. Caret fake via CSS (sem foco programático — evita abrir o teclado no
  // mobile). No replay/reduced-motion, ou se o usuário estiver escrevendo de
  // verdade, cai direto na bolha. Cancelável pela guarda de época (genRef).
  async function typeThenPush(text: string) {
    const gen = genRef.current;
    const el = inputRef.current;
    const userBusy = !!(el && (el.value.trim() !== '' || document.activeElement === el));
    if (reducedRef.current || userBusy) {
      push({ kind: 'msg', who: 'user', text });
      return;
    }
    const finish = (send: boolean) => {
      emulatingRef.current = false;
      setEmulating(false);
      setChatText('');
      if (send) push({ kind: 'msg', who: 'user', text });
    };
    skipRef.current = false;
    emulatingRef.current = true;
    setEmulating(true);
    const chars = Array.from(text);
    // ~35ms/char, mas acelera frases longas para caber em ~2,5s
    const per = chars.length * 35 > 2500 ? Math.max(8, Math.floor(2500 / chars.length)) : 35;
    let acc = '';
    for (const ch of chars) {
      if (genRef.current !== gen) return finish(false); // recomeçar cancelou
      if (skipRef.current) break; // clique no input → conclui na hora
      acc += ch;
      setChatText(acc);
      let d = per + (Math.random() * 40 - 20); // jitter ±20ms = irregular, humano
      if (/[.,!?;:—…]/.test(ch)) d += 90; // pausa um pouco maior na pontuação
      await delay(Math.max(8, d));
    }
    if (skipRef.current) setChatText(text);
    if (genRef.current !== gen) return finish(false);
    await delay(skipRef.current ? 80 : 250);
    if (genRef.current !== gen) return finish(false);
    finish(true);
  }

  const earn = (i: number) =>
    setTrust((p) => (p[i] ? p : p.map((v, k) => (k === i ? true : v))));

  const goStage = (n: number) => {
    setStage(n);
    track('jornada_stage', { stage: n, label: STAGES[n], cenario: cenarioRef.current });
  };

  const isMobile = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches;

  const markTouched = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      setTouched(true);
      track('jornada_touch');
      // no mobile, a decisão ("é isso?") espera no chat — volta para lá
      if (isMobile()) window.setTimeout(() => setPane('chat'), 1100);
    }
  };

  // ---------------- E0: entrada ----------------
  const aplicarCenario = (id: CenarioId) => {
    cenarioRef.current = id;
    setCenarioId(id);
    setStagesK(CENARIOS[id].columns);
  };

  async function startPlanilha(id?: CenarioId, entry: 'planilha' | 'link' = 'planilha') {
    if (!beginOnce()) return;
    const gen = genRef.current;
    const cid = id ?? cenarioRef.current; // replay usa o cenário preservado
    if (id) aplicarCenario(id);
    const c = CENARIOS[cid];
    track('jornada_start', { entry, cenario: cid });
    await typeThenPush(`📎 ${c.xlsx}`);
    if (genRef.current !== gen) return;
    await ally(c.planilhaRead, 900);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'espelho' });
  }

  async function startProsa(texto: string) {
    if (!beginOnce()) return;
    const gen = genRef.current;
    const text = texto.trim();
    const id = routeCenario(text);
    aplicarCenario(id);
    const c = CENARIOS[id];
    track('jornada_start', { entry: 'prosa-livre', cenario: id });
    push({ kind: 'msg', who: 'user', text });
    await ally(copy.flow.prosaAlly(c.tema), 800);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'espelho' });
  }

  async function confirmaEspelho() {
    if (!lock('espelho')) return;
    const gen = genRef.current;
    resolveCard('espelho', copy.flow.resolvedEspelho);
    earn(0); // Enquadramento
    goStage(1);
    await ally(copy.flow.allyConfirmaFunciona, 600);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'enquadrar' });
  }

  async function corrigirPremissa() {
    if (!lock('prem')) return;
    const c = CENARIOS[cenarioRef.current];
    const ep = c.premissas.find(isEdit);
    if (!ep) return;
    setPremEditada(true);
    if (ep.addColuna) {
      const col = ep.addColuna;
      setStagesK((p) => (p.includes(col) ? p : [...p, col]));
    }
    await typeThenPush(ep.userMsg);
    await ally(ep.ally, 450);
  }

  async function confirmaEnquadrar() {
    if (!lock('enquadrar')) return;
    const c = CENARIOS[cenarioRef.current];
    const gen = genRef.current;
    resolveCard('enquadrar', premEditada ? c.ajusteLabel : copy.flow.enquadrarAceito);
    goStage(2);
    await ally(copy.flow.allyDesenhei, 650);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'desenho' });
    earn(1); // Coerência
  }

  // ---------------- E3: rascunho vivo ----------------
  async function montaRascunho() {
    if (!lock('monta')) return;
    const c = CENARIOS[cenarioRef.current];
    resolveCard('desenho', copy.flow.resolvedDesenho);
    goStage(3);
    setDraft('building');
    push({ kind: 'build' });
    const gen = ++genRef.current;
    for (let i = 1; i <= c.buildSteps.length; i++) {
      await delay(520);
      if (genRef.current !== gen) return;
      setBuildDone(i);
    }
    const arquivo = c.xlsx.split(' ')[0];
    const seeded: Registro[] = c.seed.map((s) => ({
      id: s.id,
      name: s.name,
      meta: s.meta,
      stage: s.stage,
      nba: s.nba,
      origem: copy.flow.origemPlanilha,
      agent: false,
      log: s.thread
        ? s.thread.map((e) => ({ ...e }))
        : [{ who: 'user', text: copy.flow.importadoPlanilha(arquivo), time: '14:31' }],
    }));
    setRecords(seeded);
    setDraft('draft');
    earn(4); // Seus dados, só seus
    goStage(4);
    // no mobile, mostra o app nascendo — o momento-mágico é visual
    if (isMobile()) setPane('app');
    await ally(copy.flow.allyAppDePe(c.magic), 700);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'gate' });
  }

  // ---------------- E4: aprova o que vê ----------------
  async function ficarComEle() {
    if (!lock('ficar')) return;
    const c = CENARIOS[cenarioRef.current];
    const gen = genRef.current;
    if (!touchedRef.current) {
      await ally(copy.flow.allyExperimenta(c.touchHint), 400);
      unlock('ficar');
      return;
    }
    resolveCard('gate', copy.flow.resolvedGate);
    push({ kind: 'note', text: copy.flow.noteAppAprovado(now()) });
    setDraft('kept');
    track('jornada_keep');
    goStage(5);
    await ally(copy.flow.allyAssumeDia, 700);
    if (genRef.current !== gen) return;
    const am = c.autoMove;
    setRecords((p) =>
      p.map((r) =>
        r.id === am.id
          ? {
              ...r,
              stage: am.toStage,
              agent: true,
              log: [...r.log, { who: 'agent', text: am.log, time: now() }],
            }
          : r,
      ),
    );
    await delay(900);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'hitl' });
  }

  async function ajustar() {
    if (!lock('ajustar')) return;
    const c = CENARIOS[cenarioRef.current];
    const alvo = c.columns[2];
    await typeThenPush(copy.flow.ajustarUserMsg(alvo, c.columns[0]));
    await ally(copy.flow.allyTroquei, 500);
    setStagesK((p) => {
      const rest = p.filter((s) => s !== alvo);
      return [rest[0], alvo, ...rest.slice(1)];
    });
    markTouched();
  }

  async function descartar() {
    await ally(copy.flow.allyDescartar, 450);
  }

  // ---------------- E5: operar sob aprovação ----------------
  async function aprovaEnvio() {
    if (!lock('hitl')) return;
    const c = CENARIOS[cenarioRef.current];
    const gen = genRef.current;
    // deixa o momento visível: financeiro volta pra tabela (o stat cai);
    // chats abre a conversa (a bolha de confirmação aparece na thread)
    if (c.surface === 'financeiro') {
      setView('kanban');
    } else if (c.surface === 'chats') {
      setRecordId(c.hitl.apply.id);
      setView('record');
    }
    resolveCard('hitl', c.hitl.resolveLabel);
    earn(3); // Humano assume
    track('jornada_hitl_ok');
    push({ kind: 'note', text: `${c.hitl.note} · ${now()}` });
    const ap = c.hitl.apply;
    setRecords((p) =>
      p.map((r) =>
        r.id === ap.id
          ? {
              ...r,
              stage: ap.toStage,
              agent: true,
              log: [...r.log, { who: 'agent', text: ap.log, time: now() }],
            }
          : r,
      ),
    );
    goStage(6);
    await ally(copy.flow.allyAutomacaoSegue(c.hitl.lead), 800);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'publicar' });
  }

  async function publicar() {
    if (!lock('pub')) return;
    const gen = genRef.current;
    resolveCard('publicar', copy.flow.resolvedPublicar);
    setDraft('published');
    track('jornada_publish');
    goStage(7);
    await ally(copy.flow.allyAppVivo, 600);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'evoluir' });
  }

  // ---------------- E7: evoluir ----------------
  async function aplicarEvolucao(viaChat?: string) {
    if (!lock('evo')) return;
    const c = CENARIOS[cenarioRef.current];
    const gen = genRef.current;
    const ev = c.evolve;
    // texto livre (viaChat) já foi digitado pelo usuário → bolha direta;
    // no autopilot, emula a digitação do pedido do roteiro.
    if (viaChat) {
      push({ kind: 'msg', who: 'user', text: viaChat });
      await ally(ev.allyViaChat, 550);
    } else {
      await typeThenPush(ev.userMsg);
    }
    if (genRef.current !== gen) return;
    await delay(450);
    if (genRef.current !== gen) return;
    if (ev.col && ev.before) {
      const col = ev.col;
      const before = ev.before;
      setStagesK((p) => {
        if (p.includes(col)) return p;
        const i = p.indexOf(before);
        const cp = [...p];
        cp.splice(i < 0 ? cp.length : i, 0, col);
        return cp;
      });
    }
    if (ev.move) {
      const mv = ev.move;
      setRecords((p) =>
        p.map((r) =>
          r.id === mv.id
            ? { ...r, stage: mv.to, agent: true, log: [...r.log, { who: 'agent', text: mv.log, time: now() }] }
            : r,
        ),
      );
    }
    setEvolveState('applied');
    await ally(copy.flow.allyAplicado, 500);
    if (genRef.current !== gen) return;
    track('jornada_done');
    push({ kind: 'card', card: 'cta' });
  }

  function desfazer() {
    const c = CENARIOS[cenarioRef.current];
    const ev = c.evolve;
    if (ev.col) setStagesK((p) => p.filter((s) => s !== ev.col));
    if (ev.move) {
      const mv = ev.move;
      setRecords((p) => p.map((r) => (r.id === mv.id ? { ...r, stage: mv.from } : r)));
    }
    setEvolveState('undone');
    earn(2); // Correção + desfazer
  }

  function ctaClick() {
    track('jornada_beta_click');
    document.getElementById('beta')?.scrollIntoView({ behavior: reducedRef.current ? 'auto' : 'smooth' });
  }

  // ---------------- chat livre: você escreve, a demo responde ----------------
  async function enviarChat() {
    if (emulatingRef.current) return; // digitação emulada em curso — ignora envio real
    const text = chatText.trim();
    if (!text || busyRef.current) return;
    setChatText('');
    if (!startedRef.current) {
      await startProsa(text);
      return;
    }
    if (stage >= 7 && evolveState === 'none') {
      await aplicarEvolucao(text);
      return;
    }
    push({ kind: 'msg', who: 'user', text });
    track('jornada_chat', { stage });
    await ally(copy.flow.allyAnotei, 600);
  }

  // ---------------- navegação passo a passo (◀ ▶ na topbar) ----------------
  // Avançar executa a próxima decisão do caminho feliz; Voltar re-executa a
  // jornada do zero, instantânea (reducedRef), até o passo anterior — replay
  // determinístico do MESMO cenário, mesmo padrão do protótipo DP087.
  const busyRef = useRef(false);

  const CHECKPOINTS: Array<() => Promise<void> | void> = [
    () => startPlanilha(),
    () => confirmaEspelho(),
    () => confirmaEnquadrar(),
    () => montaRascunho(),
    async () => {
      if (!touchedRef.current) {
        const c = CENARIOS[cenarioRef.current];
        if (c.surface === 'kanban') moveRecord(c.seed[0].id);
        else openRecord(c.touchId ?? c.seed[0].id);
        await delay(650);
      }
      await ficarComEle();
    },
    () => aprovaEnvio(),
    () => publicar(),
    () => aplicarEvolucao(),
  ];

  function proximoPasso(): number | null {
    if (!startedRef.current) return 0;
    if (stage === 0) return 1;
    if (stage === 1) return 2;
    if (stage === 2) return 3;
    if (stage === 3) return null; // montando — aguarde a animação
    if (stage === 4) return 4;
    if (stage === 5) return 5;
    if (stage === 6) return 6;
    if (stage === 7 && evolveState === 'none') return 7;
    return null; // jornada completa
  }

  async function avancarPasso() {
    if (busyRef.current) return;
    const i = proximoPasso();
    if (i === null) {
      if (stage >= 7) ctaClick();
      return;
    }
    busyRef.current = true;
    track('jornada_nav', { dir: 'avancar', passo: i });
    try {
      await CHECKPOINTS[i]();
    } finally {
      busyRef.current = false;
    }
  }

  function resetAll() {
    genRef.current += 1; // cancela loops de build e digitação emulada em andamento
    lockRef.current.clear();
    startedRef.current = false;
    touchedRef.current = false;
    emulatingRef.current = false;
    skipRef.current = false;
    setEmulating(false);
    setChatText('');
    setTouched(false);
    setPane('chat');
    clockRef.current = 31;
    setItems(INITIAL_ITEMS);
    setStage(0);
    setTyping(false);
    setStarted(false);
    setPremEditada(false);
    setBuildDone(0);
    // preserva o cenário ativo — o replay re-executa O MESMO cenário
    setStagesK(CENARIOS[cenarioRef.current].columns);
    setRecords([]);
    setView('kanban');
    setRecordId(null);
    setQuery('');
    setStatFilter(null);
    setDraft('none');
    setTrust([false, false, false, false, false]);
    setEvolveState('none');
    setNewOpen(false);
  }

  // Recomeçar: volta ao estado de entrada COMPLETO e libera a escolha de outro
  // exemplo — sem recarregar a página. resetAll() zera stage/chat/app e destrava
  // startedRef/beginOnce; aqui também soltamos o cenário (volta ao neutro 'leads',
  // como no load inicial) — diferente do replay, que preserva cenarioRef. A guarda
  // de época (genRef) já cancela qualquer fala/card em voo do cenário anterior.
  function recomecar() {
    if (busyRef.current) return; // não reinicia no meio de um passo do autopilot
    track('jornada_recomecar', { cenario: cenarioRef.current });
    cenarioRef.current = 'leads';
    setCenarioId('leads');
    resetAll();
  }

  async function voltarPasso() {
    if (busyRef.current || !startedRef.current) return;
    const cur = proximoPasso();
    const fim = stage === 3 ? 4 : cur === null ? CHECKPOINTS.length : cur;
    const alvo = fim - 1;
    if (alvo < 0) return;
    busyRef.current = true;
    track('jornada_nav', { dir: 'voltar', passo: alvo });
    const prevReduced = reducedRef.current;
    reducedRef.current = true;
    resetAll();
    try {
      for (let i = 0; i < alvo; i++) await CHECKPOINTS[i]();
    } finally {
      reducedRef.current = prevReduced;
      busyRef.current = false;
    }
  }

  // ---------------- interações do app vivo ----------------
  function openRecord(id: string) {
    setRecordId(id);
    setView('record');
    markTouched();
  }
  function moveRecord(id: string) {
    setRecords((p) =>
      p.map((r) => {
        if (r.id !== id) return r;
        const i = stagesK.indexOf(r.stage);
        if (i < 0 || i >= stagesK.length - 1) return r;
        const next = stagesK[i + 1];
        return { ...r, stage: next, agent: false, log: [...r.log, { who: 'user', text: copy.flow.logVoceMoveu(next), time: now() }] };
      }),
    );
    markTouched();
  }
  function createRecord(vals: string[]) {
    const c = CENARIOS[cenarioRef.current];
    const base = c.newForm.build(vals);
    const id = 'novo-' + Date.now().toString(36);
    const log: LogE[] =
      c.surface === 'chats'
        ? [{ who: 'user', text: base.meta.pedido, time: now() }]
        : [{ who: 'user', text: copy.flow.logCriadoDireto, time: now() }];
    setRecords((p) => [
      ...p,
      { id, name: base.name, meta: base.meta, stage: stagesK[0], origem: copy.flow.origemCriado, agent: false, log },
    ]);
    setNewOpen(false);
    markTouched();
  }
  function statClick(kind: 'aberto' | 'vencido' | 'neg') {
    setStatFilter((p) => (p === kind ? null : kind));
    markTouched();
  }
  function nbaAction(id: string) {
    const c = CENARIOS[cenarioRef.current];
    setRecords((p) =>
      p.map((r) => {
        if (r.id !== id) return r;
        const nba = r.nba ?? c.nbaDefault(r);
        if (nba.kind === 'handoff') {
          return { ...r, nbaDone: true, log: [...r.log, { who: 'system', text: nba.log ?? copy.flow.logEncaminhado, time: now() }] };
        }
        if (nba.kind === 'note') {
          return { ...r, nbaDone: true, agent: true, log: [...r.log, { who: 'agent', text: nba.log ?? copy.flow.logFeito, time: now() }] };
        }
        const i = stagesK.indexOf(r.stage);
        const next = i >= 0 && i < stagesK.length - 1 ? stagesK[i + 1] : r.stage;
        return {
          ...r, stage: next, agent: true, nbaDone: true,
          log: [...r.log, { who: 'agent', text: nba.log ?? copy.flow.logProximoPasso, time: now() }],
        };
      }),
    );
    markTouched();
  }

  // ---------------- render helpers ----------------
  const cen = CENARIOS[cenarioId];
  const entryCol = stagesK[0];
  const record = records.find((l) => l.id === recordId) ?? null;
  const filtered = records.filter((r) =>
    (r.name + ' ' + cen.subtitle(r)).toLowerCase().includes(query.toLowerCase()),
  );
  const statusPill = (s: string) =>
    cen.surface === 'kanban' ? (
      <span className="jd-stagepill">{s}</span>
    ) : (
      <span className={'jd-spill jd-spill-' + (STATUS_COLOR[s] ?? 'blue')}>{s}</span>
    );
  const lastMsg = (r: Registro) => r.log[r.log.length - 1];

  function renderCard(item: Extract<Item, { kind: 'card' }>) {
    const done = item.resolved;
    const foot = done ? <div className="jd-resolved">✓ {done}</div> : null;
    switch (item.card) {
      case 'espelho':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">{copy.cards.espelhoKick}</div>
            <div className="jd-chips">
              {cen.espelhoChips.map((ch) => (
                <span key={ch} className="jd-chip on">{ch}</span>
              ))}
              <span className="jd-chip">{copy.cards.espelhoChipNew}</span>
            </div>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={confirmaEspelho}>{copy.cards.espelhoBtn}</button>
              </div>
            )}
          </div>
        );
      case 'enquadrar':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">{copy.cards.enquadrarKick}</div>
            <ul className="jd-prem">
              {cen.premissas.map((p, i) => (
                <li key={i}>
                  {isEdit(p) ? (
                    premEditada ? (
                      <>{p.icon} {boldify(p.after)} <span className="jd-mini">{copy.cards.ajustadoPorVoce}</span></>
                    ) : (
                      <>
                        {p.icon} {boldify(p.before)}{' '}
                        {!done && (
                          <button className="jd-link" onClick={corrigirPremissa}>{copy.cards.corrigir}</button>
                        )}
                      </>
                    )
                  ) : (
                    <>{p.icon} {boldify(p.text)}</>
                  )}
                </li>
              ))}
            </ul>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={confirmaEnquadrar}>{copy.cards.enquadrarBtn}</button>
              </div>
            )}
          </div>
        );
      case 'desenho':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">{copy.cards.desenhoKick}</div>
            <div className="jd-des">
              {cen.desenho.map((r) => (
                <div key={r.label} className="jd-des-row">
                  <span className="jd-des-ic">{r.icon}</span>
                  <b>{r.label}</b>
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
            <div className="jd-verified">{copy.cards.desenhoVerified}</div>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={montaRascunho}>{copy.cards.desenhoBtn}</button>
              </div>
            )}
          </div>
        );
      case 'gate':
        return (
          <div className={'jd-card jd-gate' + (done ? ' jd-off' : '')}>
            <div className="jd-kick jd-kick-amber">{copy.cards.gateKick}</div>
            <p className="jd-p">{boldify(copy.cards.gateP)}</p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-ok" onClick={ficarComEle}>{copy.cards.gateKeep}</button>
                <button className="jd-btn" onClick={ajustar}>{copy.cards.gateAdjust}</button>
                <button className="jd-btn jd-danger" onClick={descartar}>{copy.cards.gateDiscard}</button>
              </div>
            )}
          </div>
        );
      case 'hitl':
        return (
          <div className={'jd-card jd-gate' + (done ? ' jd-off' : '')}>
            <div className="jd-kick jd-kick-amber">{copy.cards.hitlKick}</div>
            <p className="jd-p">{boldify(cen.hitl.text)}</p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-ok" onClick={aprovaEnvio}>{cen.hitl.button}</button>
                <button className="jd-btn" onClick={() => resolveCard('hitl', copy.flow.resolvedHitlLater)}>{copy.cards.hitlLater}</button>
              </div>
            )}
          </div>
        );
      case 'publicar':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">{copy.cards.publicarKick}</div>
            <p className="jd-p">{boldify(copy.cards.publicarP)}</p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={publicar}>{copy.cards.publicarBtn}</button>
              </div>
            )}
          </div>
        );
      case 'evoluir':
        return (
          <div className="jd-card">
            <div className="jd-kick">{copy.cards.evoluirKick}</div>
            {evolveState === 'none' ? (
              <div className="jd-btns">
                <button className="jd-btn" onClick={() => aplicarEvolucao()}>
                  “{cen.evolve.userMsg.charAt(0).toLowerCase() + cen.evolve.userMsg.slice(1)}”
                </button>
              </div>
            ) : (
              <p className="jd-p">
                {evolveState === 'applied' ? (
                  <>
                    <b>{copy.cards.evoluirApplied}</b> — {cen.evolve.doneLabel}.{' '}
                    <button className="jd-link" onClick={desfazer}>{copy.cards.desfazer}</button>
                  </>
                ) : (
                  <>{boldify(copy.cards.evoluirReverted)}</>
                )}
              </p>
            )}
          </div>
        );
      case 'cta':
        return (
          <div className="jd-card jd-cta">
            <div className="jd-kick">{copy.cards.ctaKick}</div>
            <p className="jd-p">{copy.cards.ctaP(cen.ctaObj)}</p>
            <div className="jd-btns">
              <button className="jd-btn jd-pri jd-lg" onClick={ctaClick}>{copy.ctaBeta}</button>
            </div>
          </div>
        );
    }
  }

  // ---- superfície: KANBAN (leads) ----
  function renderKanban() {
    return (
      <div className="jd-kanban">
        {stagesK.map((s) => {
          const col = records.filter((l) => l.stage === s);
          const extra = s === entryCol ? cen.extraN : 0;
          return (
            <div key={s} className="jd-kcol">
              <div className="jd-khead">{s}<span>{col.length + extra}</span></div>
              {col.map((l) => (
                <div key={l.id} className="jd-kcard">
                  <button className="jd-kname" onClick={() => openRecord(l.id)}>{l.name}</button>
                  <div className="jd-ksub">{cen.subtitle(l)}</div>
                  <div className="jd-kfoot">
                    <span className={'jd-ktag' + (l.agent ? ' ag' : '')}>{l.agent ? copy.app.assistenteMoveu : l.origem}</span>
                    <button className="jd-kmove" onClick={() => moveRecord(l.id)} aria-label={copy.app.moverAria(l.name)}>{copy.app.mover}</button>
                  </div>
                </div>
              ))}
              {s === entryCol && (
                <>
                  {extra > 0 && <div className="jd-kmore">{copy.app.maisDaPlanilha(extra)}</div>}
                  <button className="jd-kadd" onClick={() => setNewOpen(true)}>{cen.newForm.add}</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ---- superfície: FINANCEIRO (caixa) ----
  function renderFinanceiro() {
    // superfície financeiro só roda no cenário caixa → cen.columns são as etapas
    // dele: [0] a vencer · [1] vencida · [2] em negociação · [3] paga
    const emAberto = records.filter((r) => r.stage !== cen.columns[3]).reduce((s, r) => s + valOf(r), 0);
    const vencido = records.filter((r) => r.stage === cen.columns[1]).reduce((s, r) => s + valOf(r), 0);
    const emNeg = records.filter((r) => r.stage === cen.columns[2]).reduce((s, r) => s + valOf(r), 0);
    const rows = records.filter((r) =>
      statFilter === 'aberto' ? r.stage !== cen.columns[3]
      : statFilter === 'vencido' ? r.stage === cen.columns[1]
      : statFilter === 'neg' ? r.stage === cen.columns[2]
      : true,
    );
    return (
      <div className="jd-fin">
        <div className="jd-stats">
          <MoneyStat label={copy.app.finEmAberto} value={emAberto} accent="blue" active={statFilter === 'aberto'} reduced={reducedRef.current} fmt={copy.currency} onClick={() => statClick('aberto')} />
          <MoneyStat label={copy.app.finVencido} value={vencido} accent="red" active={statFilter === 'vencido'} reduced={reducedRef.current} fmt={copy.currency} onClick={() => statClick('vencido')} />
          <MoneyStat label={copy.app.finEmNegociacao} value={emNeg} accent="amber" active={statFilter === 'neg'} reduced={reducedRef.current} fmt={copy.currency} onClick={() => statClick('neg')} />
        </div>
        <div className="jd-fin-tools">
          {statFilter ? (
            <button className="jd-link" onClick={() => setStatFilter(null)}>{copy.app.limparFiltro}</button>
          ) : (
            <span className="jd-mini">{copy.app.finContador(records.length + cen.extraN)}</span>
          )}
          <button className="jd-finadd" onClick={() => setNewOpen(true)}>{cen.newForm.add}</button>
        </div>
        <div className="jd-table-wrap">
          <table className="jd-table">
            <thead>
              <tr>{copy.app.finTableHead.map((h) => <th key={h}>{h}</th>)}<th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} onClick={() => openRecord(r.id)} tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openRecord(r.id)}>
                  <td className="jd-tname">{r.name}</td>
                  <td>{r.meta.valor}</td>
                  <td>{r.meta.venc}</td>
                  <td>{statusPill(r.stage)}</td>
                  <td className="jd-tright"><span className="jd-openx">{copy.app.abrir}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {statFilter && rows.length === 0 && <div className="jd-tcount">{copy.app.nenhumaFatura}</div>}
        </div>
      </div>
    );
  }

  // ---- superfície: CHATS (atendimento) ----
  function renderFila() {
    return (
      <div className="jd-fila-wrap">
        <div className="jd-rules" aria-label={copy.app.regrasAtendimentoAria}>
          <span className="jd-rule">{copy.app.regraAgenda}</span>
          <span className="jd-rule">{copy.app.regraClinico}</span>
          {evolveState === 'applied' && (
            <span className="jd-rule jd-rule-new">{cen.evolve.regra} <b>{copy.app.novo}</b></span>
          )}
        </div>
        <div className="jd-fila">
          {records.map((r) => {
            const m = lastMsg(r);
            const unread = m?.who === 'user';
            return (
              <button key={r.id} className="jd-fila-item" onClick={() => openRecord(r.id)}>
                <span className="jd-avatar">{r.name.charAt(0)}</span>
                <span className="jd-fila-main">
                  <span className="jd-fila-top">
                    <span className="jd-fila-name">{r.name}</span>
                    {statusPill(r.stage)}
                  </span>
                  <span className="jd-fila-prev">{m?.who === 'agent' ? '✓ ' : ''}{m?.text}</span>
                </span>
                <span className="jd-fila-meta">
                  <span className="jd-fila-time">{m?.time}</span>
                  {unread && <span className="jd-unread" aria-label={copy.app.naoLidaAria} />}
                </span>
              </button>
            );
          })}
          <div className="jd-kmore">{copy.app.maisConversas(cen.extraN)}</div>
          <button className="jd-finadd jd-fila-add" onClick={() => setNewOpen(true)}>{cen.newForm.add}</button>
        </div>
      </div>
    );
  }

  function renderThread(rec: Registro) {
    const nbaVisible = rec.nba && !rec.nbaDone;
    const handoff = rec.nba?.kind === 'handoff';
    return (
      <div className="jd-conv">
        <div className="jd-chat-head">
          <span className="jd-avatar sm">{rec.name.charAt(0)}</span>
          <b>{rec.name}</b>
          {statusPill(rec.stage)}
        </div>
        <div className="jd-thread">
          {rec.log.map((e, i) =>
            e.who === 'system' ? (
              <div key={i} className="jd-cb-sys">{e.text}</div>
            ) : (
              <div key={i} className={'jd-cb ' + e.who}>
                <span className="jd-cb-b">{e.text}</span>
                <time>{e.time}</time>
              </div>
            ),
          )}
          {nbaVisible && (
            <div className={'jd-nba jd-nba-inline' + (handoff ? ' jd-nba-hand' : '')}>
              <span className="jd-nba-k">{handoff ? copy.app.humanoAssume : copy.app.sugestaoAssistente}</span>
              <span>{rec.nba!.text}</span>
              <button className="jd-btn jd-pri" onClick={() => nbaAction(rec.id)}>{copy.app.fazerIsso}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- ficha (kanban/financeiro): campos + NBA + histórico ----
  function renderFicha(rec: Registro) {
    const nba = rec.nba ?? cen.nbaDefault(rec);
    const nbaVisible = !rec.nbaDone;
    return (
      <div className="jd-record">
        <div className="jd-rec-head">
          <b>{rec.name}</b>
          {statusPill(rec.stage)}
        </div>
        <div className="jd-rec-grid">
          <dl className="jd-fields">
            {cen.recordFields(rec).map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.value}
                  {f.lock && (
                    <span className="jd-lock" title={copy.app.protegidoTitle}> 🔒</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {nbaVisible && (
            <div className={'jd-nba' + (nba.kind === 'handoff' ? ' jd-nba-hand' : '')}>
              <span className="jd-nba-k">{nba.kind === 'handoff' ? copy.app.humanoAssume : copy.app.proximoPassoSugerido}</span>
              <span>{nba.text}</span>
              <button className="jd-btn jd-pri" onClick={() => nbaAction(rec.id)}>{copy.app.fazerIsso}</button>
            </div>
          )}
        </div>
        <div className="jd-tl">
          <span className="jd-tl-t">{copy.app.historico}</span>
          {rec.log.map((e, i) => (
            <div key={i} className={'jd-tl-i ' + e.who}>
              <span>{e.text}</span><time>{e.time}</time>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const badge =
    draft === 'draft' ? { cls: 'jd-b-draft', t: copy.app.badgeDraft }
    : draft === 'kept' ? { cls: 'jd-b-kept', t: copy.app.badgeKept }
    : draft === 'published' ? { cls: 'jd-b-pub', t: copy.app.badgePub }
    : null;

  const cardPendente = items.some(
    (i) => i.kind === 'card' && !i.resolved && i.card !== 'cta',
  );

  const listIcon = cen.surface === 'financeiro' ? '📄' : cen.surface === 'chats' ? '📥' : '▦';
  const recIcon = cen.surface === 'chats' ? '💬' : '👤';

  // v5: a fase da jornada rege o palco — converse (sem app) · app (rascunho/ratificado) · operate (publicado)
  const phase =
    draft === 'none' || draft === 'building' ? 'converse' : draft === 'published' ? 'operate' : 'app';

  return (
    <div
      className={`jd jd-pane-${pane} jd-phase-${phase}${justRevealed ? ' jd-reveal' : ''}`}
      data-demo-jornada
    >
      <style>{JD_CSS}</style>

      {/* topbar de sistema — a sensação de estar dentro do produto */}
      <header className="jd-top">
        <Link href={copy.brandHref} className="jd-top-brand" aria-label={copy.shell.brandAria}>
          <span className="jd-top-dot" />
          fluxomind
        </Link>
        <span className="jd-top-crumb">
          {copy.shell.crumbCompany} <i>/</i> Ally — <b>{copy.shell.crumbTitle}</b>
        </span>
        <div className="jd-top-nav" role="group" aria-label={copy.shell.navAria}>
          <button
            className="jd-nav-back"
            onClick={voltarPasso}
            aria-label={copy.shell.voltarPasso}
            title={copy.shell.voltarPasso}
            disabled={!started}
          >
            ◀
          </button>
          <span className="jd-top-nav-lbl">{copy.shell.passoAPasso}</span>
          <button
            className="jd-nav-fwd"
            onClick={avancarPasso}
            aria-label={copy.shell.avancarPasso}
            title={copy.shell.avancarPasso}
          >
            ▶
          </button>
        </div>
        {started && (
          <button
            className="jd-top-restart"
            onClick={recomecar}
            aria-label={copy.shell.recomecarTitle}
            title={copy.shell.recomecarTitle}
          >
            ↺<span className="jd-restart-lbl">{copy.shell.recomecar}</span>
          </button>
        )}
        <span className="jd-top-phase">{copy.shell.phaseFull}</span>
        <span className="jd-top-phase jd-top-phase-s">{copy.shell.phaseShort}</span>
        <a className="jd-top-cta" href="#beta" data-track="demo-top-beta">
          <span className="jd-cta-full">{copy.ctaBeta}</span>
          <span className="jd-cta-s">{copy.shell.ctaShort}</span>
        </a>
      </header>

      {/* progresso */}
      <div className="jd-rail" aria-label={copy.shell.railAria}>
        {STAGES.map((s, i) => (
          <span key={s} className={'jd-step' + (i < stage ? ' done' : i === stage ? ' cur' : '')}>
            {s}
          </span>
        ))}
      </div>

      <div className="jd-grid">
        {/* ---- chat ---- */}
        <section className="jd-chat" aria-label={copy.shell.conversaAria}>
          <div className="jd-scroll" ref={scrollRef}>
            {items.map((it, i) => {
              if (it.kind === 'msg')
                return (
                  <div key={i} className={'jd-msg ' + it.who}>
                    <span className="jd-who">{it.who === 'ally' ? 'Ally' : copy.shell.you}</span>
                    <span className="jd-bubble">{it.text}</span>
                  </div>
                );
              if (it.kind === 'note') return <div key={i} className="jd-note">✓ {it.text}</div>;
              if (it.kind === 'build')
                return (
                  <div key={i} className="jd-card">
                    <div className="jd-kick">{copy.cards.buildKick}</div>
                    <ul className="jd-build">
                      {cen.buildSteps.map((s, k) => (
                        <li key={s} className={k < buildDone ? 'done' : k === buildDone ? 'run' : ''}>
                          <span className="jd-tick">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              return <div key={i}>{renderCard(it)}</div>;
            })}
            {typing && (
              <div className="jd-msg ally">
                <span className="jd-who">Ally</span>
                <span className="jd-bubble jd-typing"><i /><i /><i /></span>
              </div>
            )}
          </div>

          {!started && (
            <div className="jd-entries">
              {CENARIO_IDS.map((id) => (
                <button key={id} className="jd-pill jd-pill-imp" onClick={() => startPlanilha(id)}>
                  {CENARIOS[id].pill}
                </button>
              ))}
            </div>
          )}

          {/* input de chat — a conversa é o modelo de interação, sempre visível */}
          <div className={'jd-input' + (emulating ? ' jd-input-emul' : '')}>
            <div className="jd-input-field">
              <input
                ref={inputRef}
                value={chatText}
                readOnly={emulating}
                onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') enviarChat();
                }}
                onMouseDown={() => {
                  if (emulatingRef.current) skipRef.current = true; // clique conclui na hora
                }}
                placeholder={
                  started
                    ? copy.shell.inputStarted
                    : phText || copy.shell.inputIdle
                }
                aria-label={copy.shell.inputAria}
              />
              {emulating && (
                <div className="jd-ghost" aria-hidden="true">
                  <span className="jd-ghost-t">{chatText}</span>
                  <span className="jd-caret" />
                </div>
              )}
            </div>
            <button className="jd-send" onClick={enviarChat} aria-label={copy.shell.enviarAria}>
              ➤
            </button>
          </div>
        </section>

        {/* ---- app vivo (superfície por cenário) ---- */}
        <section className="jd-app" aria-label={copy.app.appAria}>
          {draft === 'none' || draft === 'building' ? (
            <div className="jd-empty">
              <span className="jd-empty-ic">◇</span>
              <b>{copy.app.emptyTitle}</b>
              <span>{copy.app.emptySub}</span>
            </div>
          ) : (
            <>
              <header className="jd-app-head">
                <b>{cen.appTitle}</b>
                {badge && <span className={'jd-badge ' + badge.cls}>{badge.t}</span>}
                <div className="jd-views" role="group" aria-label={copy.app.viewModeAria}>
                  {cen.surface === 'kanban' ? (
                    <>
                      <button className={view === 'kanban' ? 'on' : ''} onClick={() => setView('kanban')}>▦ {cen.boardLabel}</button>
                      <button className={view === 'table' ? 'on' : ''} onClick={() => { setView('table'); markTouched(); }}>☰ {copy.app.tabela}</button>
                    </>
                  ) : (
                    <button className={view !== 'record' ? 'on' : ''} onClick={() => setView('kanban')}>{listIcon} {cen.boardLabel}</button>
                  )}
                  {record && (
                    <button className={view === 'record' ? 'on' : ''} onClick={() => setView('record')}>{recIcon} {record.name.split(' ')[0]}</button>
                  )}
                </div>
              </header>

              {view === 'record' && record ? (
                cen.surface === 'chats' ? renderThread(record) : renderFicha(record)
              ) : cen.surface === 'kanban' ? (
                view === 'table' ? (
                  <div className="jd-table-wrap">
                    <input
                      className="jd-search"
                      placeholder={copy.app.buscarPlaceholder}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label={copy.app.buscarAria}
                    />
                    <table className="jd-table">
                      <thead>
                        <tr>{cen.tableCols.map((c) => <th key={c.header}>{c.header}</th>)}</tr>
                      </thead>
                      <tbody>
                        {filtered.map((l) => (
                          <tr key={l.id} onClick={() => openRecord(l.id)} tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && openRecord(l.id)}>
                            {cen.tableCols.map((c) => (
                              <td key={c.header} className={c.primary ? 'jd-tname' : undefined}>
                                {c.stage ? statusPill(l.stage) : <>{c.get?.(l)}{c.lock && ' 🔒'}</>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="jd-tcount">{copy.app.tabelaContador(filtered.length, records.length + cen.extraN)}</div>
                  </div>
                ) : (
                  renderKanban()
                )
              ) : cen.surface === 'financeiro' ? (
                renderFinanceiro()
              ) : (
                renderFila()
              )}

              {newOpen && (
                <NewRecordForm
                  title={cen.newForm.title}
                  fields={cen.newForm.fields}
                  onCreate={createRecord}
                  onCancel={() => setNewOpen(false)}
                  protectedNote={copy.shell.modalProtegido}
                  createLabel={copy.shell.criar}
                  cancelLabel={copy.shell.cancelar}
                />
              )}
            </>
          )}

          {/* as 5 regras acendendo */}
          <footer className="jd-trust" aria-label={copy.app.trustAria}>
            {copy.trustRules.map((r, i) => (
              <span key={r.title} className={'jd-trust-chip' + (trust[i] ? ' on' : '')} title={r.desc}>
                {trust[i] ? '✓ ' : ''}{r.title}
              </span>
            ))}
          </footer>
        </section>
      </div>

      {/* mobile: alterna entre conversa e app — um painel por vez, tela cheia */}
      <div className="jd-panebar" role="tablist" aria-label={copy.shell.panebarAria}>
        <button
          role="tab"
          aria-selected={pane === 'chat'}
          className={pane === 'chat' ? 'on' : ''}
          onClick={() => {
            setPane('chat');
            track('jornada_pane', { pane: 'chat' });
          }}
        >
          {copy.shell.paneChat}
          {pane === 'app' && cardPendente && <i className="jd-dot" aria-label={copy.shell.decisaoPendenteAria} />}
        </button>
        <button
          role="tab"
          aria-selected={pane === 'app'}
          className={pane === 'app' ? 'on' : ''}
          disabled={phase === 'converse'}
          onClick={() => {
            if (phase === 'converse') return;
            setPane('app');
            track('jornada_pane', { pane: 'app' });
          }}
        >
          {copy.shell.paneApp}
          {pane === 'chat' && draft === 'draft' && !touched && (
            <i className="jd-dot" aria-label={copy.shell.novidadeAria} />
          )}
        </button>
      </div>

      <p className="jd-honest">{copy.shell.honest}</p>
    </div>
  );
}

function MoneyStat({
  label,
  value,
  accent,
  active,
  reduced,
  fmt,
  onClick,
}: {
  label: string;
  value: number;
  accent: 'blue' | 'red' | 'amber';
  active: boolean;
  reduced: boolean;
  fmt: (n: number) => string;
  onClick: () => void;
}) {
  const [disp, setDisp] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef(0);
  useEffect(() => {
    if (reduced) {
      setDisp(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const dur = 700;
    const tick = (n: number) => {
      const p = Math.min((n - start) / dur, 1);
      setDisp(Math.round(from + (to - from) * p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, reduced]);
  return (
    <button
      className={'jd-stat jd-stat-' + accent + (active ? ' on' : '')}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="jd-stat-v">{fmt(disp)}</span>
      <span className="jd-stat-k">{label}</span>
    </button>
  );
}

function NewRecordForm({
  title,
  fields,
  onCreate,
  onCancel,
  protectedNote,
  createLabel,
  cancelLabel,
}: {
  title: string;
  fields: { label: string; def: string }[];
  onCreate: (vals: string[]) => void;
  onCancel: () => void;
  protectedNote: string;
  createLabel: string;
  cancelLabel: string;
}) {
  const [vals, setVals] = useState<string[]>(fields.map((f) => f.def));
  const setAt = (i: number, v: string) => setVals((p) => p.map((x, k) => (k === i ? v : x)));
  return (
    <div className="jd-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="jd-modal-card">
        <b>{title}</b>
        {fields.map((f, i) => (
          <label key={f.label}>
            {f.label}
            <input value={vals[i]} onChange={(ev) => setAt(i, ev.target.value)} />
          </label>
        ))}
        <span className="jd-mini">{protectedNote}</span>
        <div className="jd-btns">
          <button className="jd-btn jd-pri" onClick={() => onCreate(vals)}>{createLabel}</button>
          <button className="jd-btn" onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}

const JD_CSS = `
.jd { --jd-bg:#1A1B1E; --jd-panel:#25262B; --jd-line:#33353B; --jd-tx:#E5E7EB; --jd-mut:#9CA3AF;
  --jd-blue:#4DABF7; --jd-green:#34D399; --jd-amber:#FBBF24; --jd-red:#F87171; --jd-violet:#A78BFA;
  background: var(--jd-bg); border: 1px solid var(--jd-line); border-radius: 16px;
  color: var(--jd-tx); overflow: hidden; font-size: 14.5px; }
.jd * { box-sizing: border-box; }
.jd-rail { display:flex; gap:6px; padding:12px 16px; border-bottom:1px solid var(--jd-line); overflow-x:auto; scrollbar-width:none; }
.jd-rail::-webkit-scrollbar{display:none}
.jd-step { font-size:11.5px; color:var(--jd-mut); border:1px solid var(--jd-line); border-radius:999px; padding:3px 10px; white-space:nowrap; }
.jd-step.done { color:var(--jd-green); border-color:rgba(52,211,153,.35); background:rgba(52,211,153,.08); }
.jd-step.cur { color:var(--jd-blue); border-color:var(--jd-blue); background:rgba(77,171,247,.1); font-weight:600; }
.jd { display:flex; flex-direction:column; height:100dvh; border-radius:0 !important; }
.jd-top { display:flex; align-items:center; gap:14px; padding:0 16px; height:52px; min-height:52px; border-bottom:1px solid var(--jd-line); background:rgba(255,255,255,.02); }
.jd-top-brand { display:flex; align-items:center; gap:7px; font-weight:800; font-size:15px; letter-spacing:-.02em; color:var(--jd-tx); }
.jd-top-brand:hover { color:#fff; }
.jd-top-dot { width:9px; height:9px; border-radius:99px; background:var(--jd-blue); box-shadow:0 0 10px 1px rgba(77,171,247,.7); }
.jd-top-crumb { color:var(--jd-mut); font-size:12.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.jd-top-crumb i { font-style:normal; opacity:.5; margin:0 2px; }
.jd-top-crumb b { color:var(--jd-tx); font-weight:600; }
.jd-top-nav { margin-left:auto; display:flex; align-items:center; gap:2px; border:1px solid var(--jd-line); border-radius:999px; padding:2px 4px; }
.jd-top-nav button { border:none; font-size:12px; width:26px; height:24px; border-radius:99px; cursor:pointer; color:#fff; }
.jd-top-nav button.jd-nav-fwd { background:#2B66DD; }
.jd-top-nav button.jd-nav-fwd:hover:not(:disabled) { background:#3d76ec; }
.jd-top-nav button.jd-nav-back { background:#b83a3a; }
.jd-top-nav button.jd-nav-back:hover:not(:disabled) { background:#cc4a4a; }
.jd-top-nav button:disabled { background:rgba(255,255,255,.06); color:var(--jd-mut); opacity:.4; cursor:default; }
.jd-top-nav-lbl { font-size:10.5px; color:var(--jd-mut); letter-spacing:.04em; padding:0 2px; }
@media (max-width:560px){ .jd-top-nav-lbl{ display:none; } }
.jd-top-restart { display:flex; align-items:center; gap:4px; border:1px solid var(--jd-line); background:none; color:var(--jd-tx); font:inherit; font-size:12px; font-weight:600; border-radius:999px; padding:5px 11px; cursor:pointer; white-space:nowrap; }
.jd-top-restart:hover { background:rgba(255,255,255,.08); border-color:var(--jd-blue); color:#fff; }
.jd-top-phase { font-size:11px; font-weight:600; letter-spacing:.05em; color:var(--jd-amber); border:1px solid rgba(251,191,36,.35); background:rgba(251,191,36,.08); border-radius:999px; padding:3px 10px; white-space:nowrap; }
.jd-top-phase-s { display:none; }
.jd-top-cta { font-size:12.5px; font-weight:700; color:#fff; background:var(--jd-blue); border-radius:8px; padding:7px 12px; white-space:nowrap; }
.jd-top-cta:hover { filter:brightness(1.1); }
/* topbar responsiva: itens cedem por prioridade — nunca alargar o shell
   (nowrap + overflow:hidden do root cortaria o conteúdo inteiro) */
.jd-top { min-width:0; }
@media (max-width:960px){ .jd-top-crumb{ display:none; } }
@media (max-width:700px){
  .jd-top{ gap:8px; padding:0 10px; }
  .jd-top-phase{ display:none; }
  .jd-top-phase-s{ display:inline-block; }
  .jd-top-cta{ font-size:11.5px; padding:6px 9px; }
  .jd-top-brand{ font-size:14px; }
  .jd-restart-lbl{ display:none; } /* vira só "↺" nos tiers apertados */
  .jd-top-restart{ padding:5px 9px; }
}
.jd-cta-s { display:none; }
@media (max-width:430px){
  .jd-top{ gap:6px; }
  .jd-top-nav{ padding:2px; }
  .jd-top-nav button{ width:22px; }
  .jd-top-cta{ font-size:11px; padding:6px 8px; }
  .jd-cta-full{ display:none; }
  .jd-cta-s{ display:inline; }
  .jd-top-brand{ font-size:13px; }
}
.jd-grid { display:grid; grid-template-columns: 42% 58%; flex:1; min-height:0; transition: grid-template-columns .55s cubic-bezier(.4,0,.2,1); }
/* v5 — a fase da jornada rege o palco (o app não ocupa coluna vazia antes de existir) */
.jd-phase-converse .jd-grid { grid-template-columns: 100% 0%; }
.jd-phase-app .jd-grid { grid-template-columns: 42% 58%; }
.jd-phase-operate .jd-grid { grid-template-columns: 38% 62%; }
.jd-phase-converse .jd-app { min-width:0; overflow:hidden; border-left:none; }
.jd-phase-converse .jd-empty { display:none; }
/* converse: coluna de leitura confortável quando a conversa ocupa a tela */
.jd-phase-converse .jd-scroll,
.jd-phase-converse .jd-entries,
.jd-phase-converse .jd-input { padding-left: max(16px, calc((100% - 900px) / 2)); padding-right: max(16px, calc((100% - 900px) / 2)); }
/* app entra em cena quando o rascunho nasce */
.jd-reveal .jd-app { animation: jdAppReveal .6s cubic-bezier(.4,0,.2,1); }
@keyframes jdAppReveal { from { opacity:0; transform: translateY(10px) scale(.985); } to { opacity:1; transform:none; } }
.jd-panebar { display:none; }
.jd-panebar button:disabled { opacity:.4; cursor:default; }
@media (max-width:860px){
  .jd-grid{ display:flex; flex-direction:column; }
  .jd-chat, .jd-app { flex:1; min-height:0; border-right:none; border-top:none; }
  .jd-pane-chat .jd-app { display:none; }
  .jd-pane-app .jd-chat { display:none; }
  .jd-panebar {
    display:flex; border-top:1px solid var(--jd-line); background:rgba(255,255,255,.02);
  }
  .jd-panebar button {
    position:relative; flex:1; border:none; background:none; color:var(--jd-mut);
    font:inherit; font-size:13px; font-weight:600; padding:11px 8px; cursor:pointer;
  }
  .jd-panebar button.on { color:#fff; box-shadow: inset 0 2px 0 var(--jd-blue); }
  .jd-dot {
    position:absolute; top:8px; margin-left:6px; width:8px; height:8px; border-radius:99px;
    background:var(--jd-amber); box-shadow:0 0 8px 1px rgba(251,191,36,.6);
    animation: jd-dotpulse 1.6s ease-in-out infinite;
  }
  @keyframes jd-dotpulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  .jd-trust { display:none; } /* statusbar cede espaço; confiança segue nos cards */
}

.jd-chat { display:flex; flex-direction:column; border-right:1px solid var(--jd-line); min-height:0; overflow:hidden; }
@media (max-width:860px){ .jd-chat{border-right:none} }
.jd-scroll { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; min-height:0; }
.jd-msg { display:flex; gap:8px; max-width:94%; }
.jd-msg.user { align-self:flex-end; flex-direction:row-reverse; }
.jd-who { width:26px;height:26px;min-width:26px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;background:rgba(77,171,247,.15);color:var(--jd-blue); }
.jd-msg.ally .jd-who { font-size:8.5px; letter-spacing:-.02em; } /* "Ally" (4 letras) cabe no círculo */
.jd-msg.user .jd-who { background:rgba(167,139,250,.15); color:#A78BFA; }
.jd-bubble { background:var(--jd-panel); border:1px solid var(--jd-line); border-radius:12px; padding:9px 13px; line-height:1.5; }
.jd-msg.user .jd-bubble { background:rgba(77,171,247,.1); border-color:rgba(77,171,247,.25); }
.jd-typing{display:inline-flex;gap:4px;padding:6px 4px}
.jd-typing i{width:6px;height:6px;border-radius:99px;background:var(--jd-mut);animation:jdb 1.2s infinite}
.jd-typing i:nth-child(2){animation-delay:.2s}.jd-typing i:nth-child(3){animation-delay:.4s}
@keyframes jdb{0%,100%{opacity:.25}50%{opacity:1}}
.jd-note { align-self:center; font-size:11.5px; color:var(--jd-mut); border:1px dashed var(--jd-line); border-radius:999px; padding:3px 12px; text-align:center; }

.jd-card { border:1px solid var(--jd-line); border-radius:14px; background:var(--jd-panel); padding:14px; display:flex; flex-direction:column; gap:10px; }
.jd-card.jd-gate { border-color:rgba(251,191,36,.5); box-shadow:0 0 0 3px rgba(251,191,36,.08); }
.jd-card.jd-off { opacity:.75 }
.jd-card.jd-cta { border-color:rgba(77,171,247,.5); }
.jd-kick { font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--jd-blue); font-weight:700; }
.jd-kick-amber { color:var(--jd-amber); }
.jd-p { margin:0; line-height:1.55; }
.jd-chips { display:flex; flex-wrap:wrap; gap:6px; }
.jd-chip { font-size:12px; border:1px solid var(--jd-line); border-radius:999px; padding:3px 10px; color:var(--jd-mut); }
.jd-chip.on { color:var(--jd-blue); border-color:rgba(77,171,247,.35); background:rgba(77,171,247,.08); }
.jd-prem { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:7px; }
.jd-prem li { background:rgba(255,255,255,.03); border-radius:8px; padding:7px 10px; line-height:1.45; }
.jd-link { border:none; background:none; color:var(--jd-blue); text-decoration:underline; cursor:pointer; font:inherit; font-size:12.5px; padding:0; }
.jd-mini { font-size:11.5px; color:var(--jd-mut); }
.jd-des { display:flex; flex-direction:column; gap:6px; }
.jd-des-row { display:flex; gap:8px; align-items:baseline; background:rgba(255,255,255,.03); border-radius:8px; padding:7px 10px; line-height:1.4; }
.jd-des-row b { min-width:110px; }
.jd-des-row span:last-child { color:var(--jd-mut); flex:1; }
.jd-verified { font-size:12px; color:var(--jd-green); }
.jd-btns { display:flex; gap:8px; flex-wrap:wrap; }
.jd-btn { border:1px solid var(--jd-line); background:var(--jd-panel); color:var(--jd-tx); border-radius:9px; padding:8px 14px; font-size:13.5px; font-weight:500; cursor:pointer; }
.jd-btn:hover { background:#2C2E33; }
.jd-btn.jd-pri { background:#2B66DD; border-color:#2B66DD; color:#fff; }
.jd-btn.jd-pri:hover { background:#1E4FB0; }
.jd-btn.jd-ok { background:var(--jd-green); border-color:var(--jd-green); color:#08281c; }
.jd-btn.jd-danger { color:var(--jd-red); }
.jd-btn.jd-lg { padding:11px 22px; font-size:15px; }
.jd-resolved { font-size:12.5px; color:var(--jd-green); }
.jd-build { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:6px; }
.jd-build li { display:flex; gap:8px; align-items:center; color:var(--jd-mut); }
.jd-build li .jd-tick { width:17px;height:17px;min-width:17px;border-radius:99px;border:1.5px solid var(--jd-line);font-size:10px;display:flex;align-items:center;justify-content:center;color:transparent; }
.jd-build li.done { color:var(--jd-tx); }
.jd-build li.done .jd-tick { background:var(--jd-green); border-color:var(--jd-green); color:#08281c; }
.jd-build li.run .jd-tick { border-color:var(--jd-amber); animation:jdb 1s infinite; }
.jd-entries { display:flex; flex-direction:column; gap:8px; padding:0 16px 16px; }
.jd-pill { border:1px dashed var(--jd-line); background:none; color:var(--jd-mut); border-radius:999px; padding:9px 14px; font-size:13px; cursor:pointer; text-align:left; }
.jd-pill:hover { border-color:var(--jd-blue); color:var(--jd-blue); }
.jd-pill-imp { border-style:solid; border-color:rgba(77,171,247,.4); background:rgba(77,171,247,.08); color:var(--jd-blue); }

.jd-app { display:flex; flex-direction:column; min-height:0; background:#1F2024; overflow-y:auto; position:relative; }
.jd-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; color:var(--jd-mut); padding:40px 20px; text-align:center; min-height:320px; }
.jd-empty-ic { font-size:34px; opacity:.5; }
.jd-app-head { display:flex; align-items:center; gap:10px; padding:12px 16px; border-bottom:1px solid var(--jd-line); flex-wrap:wrap; position:sticky; top:0; background:#1F2024; z-index:2; }
.jd-badge { font-size:11px; border-radius:999px; padding:3px 10px; }
.jd-b-draft { background:rgba(251,191,36,.12); color:var(--jd-amber); }
.jd-b-kept { background:rgba(77,171,247,.12); color:var(--jd-blue); }
.jd-b-pub { background:rgba(52,211,153,.12); color:var(--jd-green); }
.jd-views { margin-left:auto; display:flex; gap:2px; background:#2A2B30; border-radius:8px; padding:2px; }
.jd-views button { border:none; background:none; color:var(--jd-mut); font-size:12px; padding:5px 11px; border-radius:6px; cursor:pointer; white-space:nowrap; }
.jd-views button.on { background:var(--jd-panel); color:var(--jd-tx); }

/* status pill colorida (financeiro/chats) */
.jd-spill { font-size:11px; border-radius:999px; padding:2px 9px; white-space:nowrap; }
.jd-spill-blue { background:rgba(77,171,247,.15); color:var(--jd-blue); }
.jd-spill-red { background:rgba(248,113,113,.15); color:var(--jd-red); }
.jd-spill-amber { background:rgba(251,191,36,.15); color:var(--jd-amber); }
.jd-spill-violet { background:rgba(167,139,250,.18); color:var(--jd-violet); }
.jd-spill-green { background:rgba(52,211,153,.15); color:var(--jd-green); }

/* kanban (leads) */
.jd-kanban { display:flex; gap:10px; padding:14px 16px; overflow-x:auto; flex:1; align-items:flex-start; }
.jd-kcol { min-width:168px; flex:1; background:#26272C; border-radius:10px; padding:8px; }
.jd-khead { display:flex; justify-content:space-between; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--jd-mut); padding:2px 4px 8px; }
.jd-khead span { background:#333540; border-radius:999px; padding:0 7px; font-weight:400; }
.jd-kcard { background:var(--jd-panel); border:1px solid var(--jd-line); border-radius:8px; padding:8px 9px; margin-bottom:8px; }
.jd-kname { border:none; background:none; padding:0; color:var(--jd-blue); font-weight:600; cursor:pointer; font:inherit; font-size:13.5px; }
.jd-kname:hover { text-decoration:underline; }
.jd-ksub { font-size:11.5px; color:var(--jd-mut); margin-top:2px; }
.jd-kfoot { display:flex; align-items:center; margin-top:7px; gap:6px; }
.jd-ktag { font-size:10px; border-radius:999px; padding:1px 7px; background:rgba(77,171,247,.12); color:var(--jd-blue); }
.jd-ktag.ag { background:rgba(167,139,250,.15); color:#A78BFA; }
.jd-kmove { margin-left:auto; border:none; background:none; color:var(--jd-mut); font-size:11px; cursor:pointer; }
.jd-kmove:hover { color:var(--jd-blue); }
.jd-kadd { width:100%; border:1px dashed var(--jd-line); background:none; color:var(--jd-mut); border-radius:8px; padding:8px; font-size:12px; cursor:pointer; }
.jd-kadd:hover { color:var(--jd-blue); border-color:var(--jd-blue); }
.jd-kmore { font-size:11px; color:var(--jd-mut); text-align:center; padding:6px 0; }

/* financeiro (caixa) */
.jd-fin { display:flex; flex-direction:column; min-height:0; }
.jd-stats { display:flex; gap:10px; padding:14px 16px 6px; flex-wrap:wrap; }
.jd-stat { flex:1; min-width:104px; text-align:left; background:var(--jd-panel); border:1px solid var(--jd-line); border-left:3px solid var(--jd-line); border-radius:10px; padding:10px 12px; cursor:pointer; display:flex; flex-direction:column; gap:3px; }
.jd-stat:hover { background:#2C2E33; }
.jd-stat.on { box-shadow:0 0 0 2px rgba(77,171,247,.3); }
.jd-stat-v { font-size:17px; font-weight:700; letter-spacing:-.01em; }
.jd-stat-k { font-size:10px; text-transform:uppercase; letter-spacing:.05em; color:var(--jd-mut); }
.jd-stat-blue { border-left-color:var(--jd-blue); }
.jd-stat-red { border-left-color:var(--jd-red); }
.jd-stat-amber { border-left-color:var(--jd-amber); }
.jd-fin-tools { display:flex; align-items:center; gap:10px; padding:4px 16px 6px; }
.jd-finadd { margin-left:auto; border:1px dashed var(--jd-line); background:none; color:var(--jd-mut); border-radius:8px; padding:6px 11px; font-size:12px; cursor:pointer; white-space:nowrap; }
.jd-finadd:hover { color:var(--jd-blue); border-color:var(--jd-blue); }
.jd-tright { text-align:right; }
.jd-openx { color:var(--jd-mut); font-size:11.5px; }
.jd-table tbody tr:hover .jd-openx { color:var(--jd-blue); }

/* tabela (leads/financeiro) */
.jd-table-wrap { padding:14px 16px; overflow-x:auto; }
.jd-search { width:100%; max-width:280px; margin-bottom:10px; padding:8px 12px; border-radius:8px; border:1px solid var(--jd-line); background:var(--jd-panel); color:var(--jd-tx); font:inherit; font-size:13px; }
.jd-table { width:100%; border-collapse:collapse; font-size:13px; }
.jd-table th { text-align:left; font-size:10.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--jd-mut); padding:8px 12px; border-bottom:1px solid var(--jd-line); }
.jd-table td { padding:9px 12px; border-bottom:1px solid var(--jd-line); }
.jd-table tbody tr { cursor:pointer; }
.jd-table tbody tr:hover { background:rgba(255,255,255,.03); }
.jd-tname { color:var(--jd-blue); font-weight:600; }
.jd-stagepill { font-size:11px; border-radius:999px; padding:2px 9px; background:rgba(77,171,247,.12); color:var(--jd-blue); white-space:nowrap; }
.jd-tcount { font-size:11.5px; color:var(--jd-mut); margin-top:8px; }

/* chats (atendimento) */
.jd-fila-wrap { display:flex; flex-direction:column; min-height:0; }
.jd-rules { display:flex; gap:6px; flex-wrap:wrap; padding:10px 16px; border-bottom:1px solid var(--jd-line); background:rgba(255,255,255,.02); }
.jd-rule { font-size:11px; border:1px solid var(--jd-line); border-radius:999px; padding:3px 9px; color:var(--jd-mut); }
.jd-rule-new { color:var(--jd-green); border-color:rgba(52,211,153,.4); background:rgba(52,211,153,.08); }
.jd-rule-new b { font-size:9px; letter-spacing:.06em; margin-left:2px; }
.jd-fila { display:flex; flex-direction:column; }
.jd-fila-item { display:flex; gap:11px; align-items:center; padding:11px 16px; border:none; border-bottom:1px solid var(--jd-line); background:none; color:inherit; font:inherit; width:100%; text-align:left; cursor:pointer; }
.jd-fila-item:hover { background:rgba(255,255,255,.03); }
.jd-avatar { width:38px; height:38px; min-width:38px; border-radius:99px; background:rgba(77,171,247,.15); color:var(--jd-blue); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px; }
.jd-avatar.sm { width:30px; height:30px; min-width:30px; font-size:13px; }
.jd-fila-main { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
.jd-fila-top { display:flex; align-items:center; gap:8px; }
.jd-fila-name { font-weight:600; font-size:13.5px; }
.jd-fila-prev { font-size:12px; color:var(--jd-mut); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%; }
.jd-fila-meta { display:flex; flex-direction:column; align-items:flex-end; gap:5px; min-width:44px; }
.jd-fila-time { font-size:10.5px; color:var(--jd-mut); }
.jd-unread { width:9px; height:9px; border-radius:99px; background:var(--jd-blue); box-shadow:0 0 8px 1px rgba(77,171,247,.5); }
.jd-fila-add { margin:10px 16px; }
.jd-conv { display:flex; flex-direction:column; min-height:0; }
.jd-chat-head { display:flex; align-items:center; gap:10px; padding:11px 16px; border-bottom:1px solid var(--jd-line); position:sticky; top:0; background:#1F2024; }
.jd-thread { padding:16px; display:flex; flex-direction:column; gap:9px; }
.jd-cb { display:flex; flex-direction:column; max-width:80%; gap:2px; }
.jd-cb.user { align-self:flex-start; align-items:flex-start; }
.jd-cb.agent { align-self:flex-end; align-items:flex-end; }
.jd-cb-b { padding:8px 12px; border-radius:13px; line-height:1.45; font-size:13.5px; }
.jd-cb.user .jd-cb-b { background:#2A2B30; border:1px solid var(--jd-line); border-bottom-left-radius:4px; }
.jd-cb.agent .jd-cb-b { background:rgba(52,211,153,.13); border:1px solid rgba(52,211,153,.3); color:#D1FAE5; border-bottom-right-radius:4px; }
.jd-cb time { font-size:10px; color:var(--jd-mut); padding:0 4px; }
.jd-cb-sys { align-self:center; text-align:center; max-width:90%; font-size:12px; color:var(--jd-amber); background:rgba(251,191,36,.1); border:1px solid rgba(251,191,36,.3); border-radius:10px; padding:8px 12px; line-height:1.4; }
.jd-nba-inline { margin:6px 0 2px; }

.jd-record { padding:14px 16px; overflow-y:auto; }
.jd-rec-head { display:flex; align-items:center; gap:10px; margin-bottom:12px; font-size:16px; }
.jd-rec-grid { display:grid; grid-template-columns:1fr 240px; gap:14px; align-items:start; }
@media (max-width:700px){ .jd-rec-grid{grid-template-columns:1fr} }
.jd-fields { margin:0; border:1px solid var(--jd-line); border-radius:10px; background:var(--jd-panel); overflow:hidden; }
.jd-fields > div { display:flex; gap:12px; padding:9px 13px; border-bottom:1px solid var(--jd-line); }
.jd-fields > div:last-child { border-bottom:none; }
.jd-fields dt { width:80px; min-width:80px; font-size:10.5px; text-transform:uppercase; letter-spacing:.04em; color:var(--jd-mut); margin:0; padding-top:2px; }
.jd-fields dd { margin:0; font-size:13.5px; }
.jd-lock { cursor:help; font-size:12px; }
.jd-nba { border:1px solid rgba(77,171,247,.35); background:rgba(77,171,247,.07); border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:8px; font-size:13px; }
.jd-nba-k { font-size:10.5px; text-transform:uppercase; letter-spacing:.07em; color:var(--jd-blue); font-weight:700; }
.jd-nba-hand { border-color:rgba(251,191,36,.45); background:rgba(251,191,36,.07); }
.jd-nba-hand .jd-nba-k { color:var(--jd-amber); }
.jd-tl { margin-top:16px; }
.jd-tl-t { display:block; font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--jd-mut); font-weight:700; margin-bottom:8px; }
.jd-tl-i { display:flex; gap:10px; border-left:2px solid var(--jd-line); padding:6px 0 6px 12px; position:relative; font-size:13px; color:var(--jd-mut); }
.jd-tl-i::before { content:''; position:absolute; left:-5px; top:12px; width:8px; height:8px; border-radius:99px; background:var(--jd-line); }
.jd-tl-i.agent::before { background:#A78BFA; }
.jd-tl-i.user::before { background:var(--jd-blue); }
.jd-tl-i.system::before { background:var(--jd-amber); }
.jd-tl-i time { margin-left:auto; font-size:11px; white-space:nowrap; }
.jd-modal { position:absolute; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; z-index:5; border-radius:0 0 16px 0; }
.jd-modal-card { width:min(360px, calc(100% - 32px)); background:var(--jd-panel); border:1px solid var(--jd-line); border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:10px; }
.jd-modal-card label { font-size:11px; color:var(--jd-mut); display:flex; flex-direction:column; gap:4px; }
.jd-modal-card input { padding:8px 11px; border-radius:8px; border:1px solid var(--jd-line); background:#1F2024; color:var(--jd-tx); font:inherit; font-size:13.5px; }
.jd-trust { display:flex; gap:6px; flex-wrap:wrap; padding:10px 16px; border-top:1px solid var(--jd-line); margin-top:auto; }
.jd-trust-chip { font-size:11px; border:1px solid var(--jd-line); border-radius:999px; padding:3px 10px; color:var(--jd-mut); opacity:.6; transition:all .25s; }
.jd-trust-chip.on { color:var(--jd-green); border-color:rgba(52,211,153,.4); background:rgba(52,211,153,.08); opacity:1; }
.jd-honest { font-size:12px; color:var(--jd-mut); text-align:center; padding:10px 16px 14px; margin:0; }
.jd-input { display:flex; gap:8px; padding:10px 14px; border-top:1px solid var(--jd-line); }
.jd-input-field { position:relative; flex:1; min-width:0; display:flex; }
.jd-input-field input { flex:1; min-width:0; background:rgba(255,255,255,.05); border:1px solid var(--jd-line); border-radius:10px; padding:9px 13px; color:var(--jd-tx); font:inherit; font-size:13.5px; }
.jd-input-field input::placeholder { color:var(--jd-mut); }
.jd-input-field input:focus { outline:none; border-color:var(--jd-blue); box-shadow:0 0 0 3px rgba(77,171,247,.18); }
/* digitação emulada: esconde o texto real do input; o ghost mostra com caret fake */
.jd-input-emul .jd-input-field input { color:transparent; }
.jd-ghost { position:absolute; inset:0; padding:0 13px; border:1px solid transparent; display:flex; align-items:center; overflow:hidden; pointer-events:none; }
.jd-ghost-t { font:inherit; font-size:13.5px; color:var(--jd-tx); white-space:pre; }
.jd-caret { display:inline-block; width:2px; height:1.05em; margin-left:1px; background:var(--jd-blue); animation:jd-caretblink 1.05s step-end infinite; }
@keyframes jd-caretblink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }
.jd-send { border:none; background:var(--jd-blue); color:#fff; width:38px; border-radius:10px; cursor:pointer; font-size:13px; }
.jd-send:hover { filter:brightness(1.1); }
.jd :focus-visible { outline:2px solid var(--jd-blue); outline-offset:2px; border-radius:6px; }
@media (prefers-reduced-motion: reduce){ .jd *{animation:none!important;transition:none!important} }
`;
