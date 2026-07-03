'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TRUST_RULES, CTA } from '@/lib/messages';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------
   A jornada interativa — o visitante CRIA um app conversando.

   Diferente da demo narrada da home (DemoBuilder, dois atos), aqui o
   visitante dirige: entrega uma planilha (ou descreve em prosa), vê o
   espelho, corrige premissas, manda montar — e recebe um RASCUNHO VIVO
   que ele opera (kanban, tabela, ficha do lead) ANTES de decidir
   "ficar com ele". Aprova o que vê, não uma lista técnica.

   As 5 regras da confiança (messages.ts) acendem nos momentos em que
   acontecem — a message house demonstrada, não afirmada.

   Eventos de funil: jornada_* (docs/leads-analytics.md).
   Demonstração ilustrativa com dados de exemplo — rótulo honesto.
   Respeita prefers-reduced-motion (passos imediatos).
   ------------------------------------------------------------------ */

const STAGES = [
  'Espelho',
  'Enquadrar',
  'Desenho',
  'Rascunho vivo',
  'É isso?',
  'Operar',
  'Publicar',
  'Evoluir',
] as const;

type LogE = { who: 'user' | 'agent'; text: string; time: string };
type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  stage: string;
  origem: string;
  agent?: boolean;
  log: LogE[];
};

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

const SEED: Omit<Lead, 'stage' | 'log' | 'origem'>[] = [
  { id: 'ana', name: 'Ana Souza', company: 'TechFin', email: 'ana@techfin.com' },
  { id: 'bruno', name: 'Bruno Lima', company: 'AgroData', email: 'bruno@agrodata.io' },
  { id: 'carla', name: 'Carla Mendes', company: 'FinOps Lab', email: 'carla@finopslab.com' },
  { id: 'diego', name: 'Diego Rocha', company: 'EduPlay', email: 'diego@eduplay.com' },
  { id: 'elisa', name: 'Elisa Prado', company: 'HealthHub', email: 'elisa@healthhub.co' },
];

const BUILD_STEPS = [
  'Guardando seus dados — 12 leads, 8 criadores, 5 contratos',
  'Protegendo quem-vê-o-quê no mesmo ato — nada nasce desprotegido',
  'Montando sua tela de pipeline',
  'Ligando o assistente e a automação',
  'Conferindo tudo por dentro — cada peça bate com o desenho',
];

const DESENHO_ROWS = [
  { icon: '🗃️', label: 'Seus dados', text: 'Leads, criadores e contratos — ligados entre si, com os 25 registros da sua planilha' },
  { icon: '🖥️', label: 'Sua tela', text: 'Um pipeline visual por etapa — cada papel da equipe vê a sua versão' },
  { icon: '🤖', label: 'Seu assistente', text: 'Sugere e executa o próximo passo em cada lead — e pergunta antes do que importa' },
  { icon: '🔁', label: 'Automação', text: 'Contrato assinado → onboarding dispara sozinho' },
  { icon: '🔌', label: 'Conexão', text: 'Gmail para enviar propostas e contratos' },
  { icon: '🛡️', label: 'Quem vê o quê', text: 'Jurídico só vê contratos · CPF e e-mail protegidos' },
];

const mask = (email: string) => email.replace(/(.{2}).+(@.+)/, '$1●●●$2');

export default function JourneyDemo() {
  const [items, setItems] = useState<Item[]>([
    {
      kind: 'msg',
      who: 'ally',
      text: 'Oi! 👋 Me conta um problema do seu negócio — ou me dá uma planilha, que eu leio como você trabalha hoje. Os dois caminhos valem.',
    },
  ]);
  const [stage, setStage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [funilEditado, setFunilEditado] = useState(false);
  const [buildDone, setBuildDone] = useState(0);
  const [stagesK, setStagesK] = useState<string[]>([
    'Novo', 'Qualificado', 'Proposta', 'Contrato',
  ]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [view, setView] = useState<'kanban' | 'table' | 'record'>('kanban');
  const [recordId, setRecordId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<'none' | 'building' | 'draft' | 'kept' | 'published'>('none');
  const [trust, setTrust] = useState<boolean[]>([false, false, false, false, false]);
  const [negociacao, setNegociacao] = useState<'none' | 'applied' | 'undone'>('none');
  const [newLeadOpen, setNewLeadOpen] = useState(false);

  const clockRef = useRef(31);
  const genRef = useRef(0);
  const reducedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);
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

  useEffect(() => {
    const n = scrollRef.current;
    if (n) n.scrollTop = n.scrollHeight;
  }, [items, typing]);

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
    setTyping(true);
    await delay(ms);
    setTyping(false);
    push({ kind: 'msg', who: 'ally', text });
  }

  const earn = (i: number) =>
    setTrust((p) => (p[i] ? p : p.map((v, k) => (k === i ? true : v))));

  const goStage = (n: number) => {
    setStage(n);
    track('jornada_stage', { stage: n, label: STAGES[n] });
  };

  const markTouched = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      track('jornada_touch');
    }
  };

  // ---------------- E0: entrada ----------------
  async function startPlanilha() {
    if (!beginOnce()) return;
    track('jornada_start', { entry: 'planilha' });
    push({ kind: 'msg', who: 'user', text: '📎 leads-criadores.xlsx (3 abas · 25 linhas)' });
    await ally(
      'Li sua planilha. A aba "Leads" tem 12 leads (colunas viram campos) · "Criadores" tem 8 — detectei CPF e já vou proteger · "Contratos" tem 5, ligados aos criadores. Seus dados entram de verdade, sem redigitar nada.',
      900,
    );
    push({ kind: 'card', card: 'espelho' });
  }

  async function startProsa() {
    if (!beginOnce()) return;
    track('jornada_start', { entry: 'prosa' });
    push({
      kind: 'msg',
      who: 'user',
      text: 'Preciso gerir leads de criadores e contratos — hoje é tudo numa planilha.',
    });
    await ally(
      'Entendi: captar leads de criadores, movê-los num pipeline até o contrato e acompanhar o onboarding. (Se tiver uma planilha disso, eu importo seus dados — mas não precisa.)',
      800,
    );
    push({ kind: 'card', card: 'espelho' });
  }

  async function confirmaEspelho() {
    if (!lock('espelho')) return;
    resolveCard('espelho', 'Confirmado por você');
    earn(0); // Enquadramento
    goStage(1);
    await ally('Então deixa eu confirmar como seu negócio funciona — corrija só o que estiver errado:', 600);
    push({ kind: 'card', card: 'enquadrar' });
  }

  async function editaFunil() {
    if (!lock('funil')) return;
    setFunilEditado(true);
    setStagesK((p) => (p.includes('Onboarding') ? p : [...p, 'Onboarding']));
    push({ kind: 'msg', who: 'user', text: 'Falta a etapa de Onboarding no fim do funil.' });
    await ally('Funil com 5 etapas ✓ — eu proponho, você corrige. É assim que funciona.', 450);
  }

  async function confirmaEnquadrar() {
    if (!lock('enquadrar')) return;
    resolveCard('enquadrar', funilEditado ? 'Aceito, com seu ajuste no funil' : 'Aceito como proposto');
    goStage(2);
    await ally('Desenhei seu app inteiro. Em português, não em jargão:', 650);
    push({ kind: 'card', card: 'desenho' });
    earn(1); // Coerência
  }

  // ---------------- E3: rascunho vivo ----------------
  async function montaRascunho() {
    if (!lock('monta')) return;
    resolveCard('desenho', 'Você mandou montar');
    goStage(3);
    setDraft('building');
    push({ kind: 'build' });
    const gen = ++genRef.current;
    for (let i = 1; i <= BUILD_STEPS.length; i++) {
      await delay(520);
      if (genRef.current !== gen) return;
      setBuildDone(i);
    }
    const seeded: Lead[] = SEED.map((l) => ({
      ...l,
      stage: 'Novo',
      origem: 'da sua planilha',
      log: [{ who: 'user', text: 'Importado da planilha leads-criadores.xlsx', time: '14:31' }],
    }));
    setLeads(seeded);
    setDraft('draft');
    earn(4); // Seus dados, só seus
    goStage(4);
    await ally(
      '🎉 Seu app está de pé — em rascunho, só seu. Os leads da planilha já estão na tela. Mexe à vontade: clique num nome, crie um lead, mova um card. Depois me diz se é isso.',
      700,
    );
    push({ kind: 'card', card: 'gate' });
  }

  // ---------------- E4: aprova o que vê ----------------
  async function ficarComEle() {
    if (!lock('ficar')) return;
    if (!touchedRef.current) {
      await ally('Experimenta mexer no app primeiro — cria ou move um lead, abre uma ficha. Decidir vendo é o combinado. 😉', 400);
      unlock('ficar');
      return;
    }
    resolveCard('gate', 'Você ficou com ele — decidiu vendo');
    push({ kind: 'note', text: `App aprovado por você, vendo-o funcionar · ${now()}` });
    setDraft('kept');
    track('jornada_keep');
    goStage(5);
    await ally('Agora o assistente assume o dia a dia — e te pergunta antes do que importa. Olha ele trabalhando:', 700);
    setLeads((p) =>
      p.map((l) =>
        l.id === 'bruno'
          ? {
              ...l,
              stage: 'Qualificado',
              agent: true,
              log: [...l.log, { who: 'agent', text: 'Assistente qualificou — próximo passo sugerido', time: now() }],
            }
          : l,
      ),
    );
    await delay(900);
    push({ kind: 'card', card: 'hitl' });
  }

  async function ajustar() {
    if (!lock('ajustar')) return;
    push({ kind: 'msg', who: 'user', text: 'Queria a coluna de Proposta logo depois de Novo.' });
    await ally('Troquei — olha a tela. Ajustar rascunho é conversa, não retrabalho. É isso?', 500);
    setStagesK((p) => {
      const rest = p.filter((s) => s !== 'Proposta');
      return [rest[0], 'Proposta', ...rest.slice(1)];
    });
    markTouched();
  }

  async function descartar() {
    await ally('Se descartar, eu removo TUDO do rascunho — não sobra nada no seu espaço. (Nesta demonstração, sigo aqui se mudar de ideia.)', 450);
  }

  // ---------------- E5: operar sob aprovação ----------------
  async function aprovaEnvio() {
    if (!lock('hitl')) return;
    resolveCard('hitl', 'Você aprovou o envio');
    earn(3); // Humano assume
    track('jornada_hitl_ok');
    push({ kind: 'note', text: `Você aprovou: contrato para Ana Souza · ${now()}` });
    setLeads((p) =>
      p.map((l) =>
        l.id === 'ana'
          ? {
              ...l,
              stage: 'Contrato',
              agent: true,
              log: [...l.log, { who: 'agent', text: 'Contrato enviado por Gmail — aprovado por você', time: now() }],
            }
          : l,
      ),
    );
    goStage(6);
    await ally('Contrato foi. A automação segue até o fim e fica registrada. Antes de abrir pro seu time, eu provo por dentro que cada papel vê só o combinado — aí você publica:', 800);
    push({ kind: 'card', card: 'publicar' });
  }

  async function publicar() {
    if (!lock('pub')) return;
    resolveCard('publicar', 'Publicado para o time');
    setDraft('published');
    track('jornada_publish');
    goStage(7);
    await ally('🏁 App vivo, governado e trabalhando. Daqui pra frente, evoluir é só conversar — experimenta:', 600);
    push({ kind: 'card', card: 'evoluir' });
  }

  // ---------------- E7: evoluir ----------------
  async function addNegociacao() {
    if (!lock('neg')) return;
    push({ kind: 'msg', who: 'user', text: 'Adiciona a etapa Negociação antes de Contrato.' });
    await delay(450);
    setStagesK((p) => {
      if (p.includes('Negociação')) return p;
      const i = p.indexOf('Contrato');
      const cp = [...p];
      cp.splice(i, 0, 'Negociação');
      return cp;
    });
    setNegociacao('applied');
    await ally('Aplicado ✓ — mudança simples não pede cerimônia. E tem Desfazer, porque errar não pode machucar.', 500);
    track('jornada_done');
    push({ kind: 'card', card: 'cta' });
  }

  function desfazer() {
    setStagesK((p) => p.filter((s) => s !== 'Negociação'));
    setNegociacao('undone');
    earn(2); // Correção + desfazer
  }

  function ctaClick() {
    track('jornada_beta_click');
    document.getElementById('beta')?.scrollIntoView({ behavior: reducedRef.current ? 'auto' : 'smooth' });
  }

  // ---------------- interações do app vivo ----------------
  function openRecord(id: string) {
    setRecordId(id);
    setView('record');
    markTouched();
  }
  function moveLead(id: string) {
    setLeads((p) =>
      p.map((l) => {
        if (l.id !== id) return l;
        const i = stagesK.indexOf(l.stage);
        if (i < 0 || i >= stagesK.length - 1) return l;
        const next = stagesK[i + 1];
        return { ...l, stage: next, agent: false, log: [...l.log, { who: 'user', text: `Você moveu para ${next}`, time: now() }] };
      }),
    );
    markTouched();
  }
  function createLead(name: string, company: string, email: string) {
    const id = 'novo-' + Date.now().toString(36);
    setLeads((p) => [
      ...p,
      {
        id, name: name || 'Gustavo Reis', company: company || 'RetailPro',
        email: email || 'gustavo@retailpro.com', stage: 'Novo', origem: 'criado por você',
        log: [{ who: 'user', text: 'Criado por você, direto na tela do rascunho', time: now() }],
      },
    ]);
    setNewLeadOpen(false);
    markTouched();
  }
  function nbaAction(id: string) {
    setLeads((p) =>
      p.map((l) => {
        if (l.id !== id) return l;
        const i = stagesK.indexOf(l.stage);
        const next = i >= 0 && i < stagesK.length - 1 ? stagesK[i + 1] : l.stage;
        return {
          ...l, stage: next, agent: true,
          log: [...l.log, { who: 'agent', text: 'Próximo passo executado pelo assistente — com o seu OK', time: now() }],
        };
      }),
    );
    markTouched();
  }

  // ---------------- render helpers ----------------
  const record = leads.find((l) => l.id === recordId) ?? null;
  const filtered = leads.filter((l) =>
    (l.name + ' ' + l.company).toLowerCase().includes(query.toLowerCase()),
  );

  function renderCard(item: Extract<Item, { kind: 'card' }>) {
    const done = item.resolved;
    const foot = done ? <div className="jd-resolved">✓ {done}</div> : null;
    switch (item.card) {
      case 'espelho':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">Espelho — é isso?</div>
            <div className="jd-chips">
              <span className="jd-chip on">Leads</span>
              <span className="jd-chip on">Criadores</span>
              <span className="jd-chip on">Contratos</span>
              <span className="jd-chip">app novo — nada do que você já tem cobre isso</span>
            </div>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={confirmaEspelho}>É isso ✓</button>
              </div>
            )}
          </div>
        );
      case 'enquadrar':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">Confirme como funciona — corrija por exceção</div>
            <ul className="jd-prem">
              <li>👥 Quem usa: <b>Recrutador · Gestor · Jurídico</b></li>
              <li>
                🔁 Funil:{' '}
                {funilEditado ? (
                  <b>Novo → Qualificado → Proposta → Contrato → Onboarding <span className="jd-mini">(ajustado por você)</span></b>
                ) : (
                  <>
                    <b>Novo → Qualificado → Proposta → Contrato (4 etapas)</b>{' '}
                    {!done && (
                      <button className="jd-link" onClick={editaFunil}>corrigir</button>
                    )}
                  </>
                )}
              </li>
              <li>🔒 E-mail e CPF <b>protegidos por padrão</b></li>
              <li>🛡️ Jurídico vê <b>só contratos</b></li>
              <li>⚡ Contrato só sai <b>com o seu OK</b></li>
            </ul>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={confirmaEnquadrar}>Está certo →</button>
              </div>
            )}
          </div>
        );
      case 'desenho':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">O desenho do seu app</div>
            <div className="jd-des">
              {DESENHO_ROWS.map((r) => (
                <div key={r.label} className="jd-des-row">
                  <span className="jd-des-ic">{r.icon}</span>
                  <b>{r.label}</b>
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
            <div className="jd-verified">✓ verificação interna: desenho completo e coerente, ponta a ponta</div>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={montaRascunho}>Monta o rascunho pra eu ver →</button>
              </div>
            )}
          </div>
        );
      case 'gate':
        return (
          <div className={'jd-card jd-gate' + (done ? ' jd-off' : '')}>
            <div className="jd-kick jd-kick-amber">Sua decisão — olhando pra coisa</div>
            <p className="jd-p">
              Você decide <b>vendo e usando</b>, não aprovando uma lista técnica. Ajustar é
              barato; descartar remove tudo, sem sobras.
            </p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-ok" onClick={ficarComEle}>Ficar com ele ✓</button>
                <button className="jd-btn" onClick={ajustar}>Ajustar</button>
                <button className="jd-btn jd-danger" onClick={descartar}>Descartar</button>
              </div>
            )}
          </div>
        );
      case 'hitl':
        return (
          <div className={'jd-card jd-gate' + (done ? ' jd-off' : '')}>
            <div className="jd-kick jd-kick-amber">Decisão sua — o assistente espera</div>
            <p className="jd-p">
              O contrato da <b>Ana Souza (TechFin)</b> está pronto. Envio por Gmail?
            </p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-ok" onClick={aprovaEnvio}>Aprovar envio</button>
                <button className="jd-btn" onClick={() => resolveCard('hitl', 'Deixado para depois — fica na sua fila')}>Agora não</button>
              </div>
            )}
          </div>
        );
      case 'publicar':
        return (
          <div className={'jd-card' + (done ? ' jd-off' : '')}>
            <div className="jd-kick">Abrir pro time?</div>
            <p className="jd-p">
              Provado por dentro antes de expor: cada papel vê exatamente o combinado, CPF
              protegido, automação conferida — <b>no banco, não no papel</b>.
            </p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-pri" onClick={publicar}>Publicar para o time</button>
              </div>
            )}
          </div>
        );
      case 'evoluir':
        return (
          <div className="jd-card">
            <div className="jd-kick">Evoluir é conversar</div>
            {negociacao === 'none' ? (
              <div className="jd-btns">
                <button className="jd-btn" onClick={addNegociacao}>
                  “adiciona a etapa Negociação antes de Contrato”
                </button>
              </div>
            ) : (
              <p className="jd-p">
                {negociacao === 'applied' ? (
                  <>
                    <b>Aplicado ✓</b> — etapa Negociação no pipeline.{' '}
                    <button className="jd-link" onClick={desfazer}>Desfazer</button>
                  </>
                ) : (
                  <>↩︎ Revertido por você — sem perder nenhum dado. <b>Errar não machuca.</b></>
                )}
              </p>
            )}
          </div>
        );
      case 'cta':
        return (
          <div className="jd-card jd-cta">
            <div className="jd-kick">Isso, com os SEUS dados</div>
            <p className="jd-p">
              Você acabou de criar, aprovar vendo e operar um app — com dados de exemplo.
              Com a sua planilha de verdade, é o mesmo caminho.
            </p>
            <div className="jd-btns">
              <button className="jd-btn jd-pri jd-lg" onClick={ctaClick}>{CTA.beta}</button>
            </div>
          </div>
        );
    }
  }

  const badge =
    draft === 'draft' ? { cls: 'jd-b-draft', t: 'rascunho — só você vê' }
    : draft === 'kept' ? { cls: 'jd-b-kept', t: 'aprovado por você' }
    : draft === 'published' ? { cls: 'jd-b-pub', t: 'publicado para o time' }
    : null;

  return (
    <div className="jd" data-demo-jornada>
      <style>{JD_CSS}</style>

      {/* progresso */}
      <div className="jd-rail" aria-label="Etapas da jornada">
        {STAGES.map((s, i) => (
          <span key={s} className={'jd-step' + (i < stage ? ' done' : i === stage ? ' cur' : '')}>
            {s}
          </span>
        ))}
      </div>

      <div className="jd-grid">
        {/* ---- chat ---- */}
        <section className="jd-chat" aria-label="Conversa">
          <div className="jd-scroll" ref={scrollRef}>
            {items.map((it, i) => {
              if (it.kind === 'msg')
                return (
                  <div key={i} className={'jd-msg ' + it.who}>
                    <span className="jd-who">{it.who === 'ally' ? 'AI' : 'VC'}</span>
                    <span className="jd-bubble">{it.text}</span>
                  </div>
                );
              if (it.kind === 'note') return <div key={i} className="jd-note">✓ {it.text}</div>;
              if (it.kind === 'build')
                return (
                  <div key={i} className="jd-card">
                    <div className="jd-kick">Montando seu rascunho — zero perguntas</div>
                    <ul className="jd-build">
                      {BUILD_STEPS.map((s, k) => (
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
                <span className="jd-who">AI</span>
                <span className="jd-bubble jd-typing"><i /><i /><i /></span>
              </div>
            )}
          </div>

          {!started && (
            <div className="jd-entries">
              <button className="jd-pill jd-pill-imp" onClick={startPlanilha}>
                📊 Importar planilha <code>leads-criadores.xlsx</code> <em>— opcional</em>
              </button>
              <button className="jd-pill" onClick={startProsa}>
                💬 “Preciso gerir leads de criadores e contratos”
              </button>
            </div>
          )}
        </section>

        {/* ---- app vivo ---- */}
        <section className="jd-app" aria-label="Seu app">
          {draft === 'none' || draft === 'building' ? (
            <div className="jd-empty">
              <span className="jd-empty-ic">◇</span>
              <b>Seu app vai aparecer aqui</b>
              <span>primeiro em rascunho — você aprova o que vê.</span>
            </div>
          ) : (
            <>
              <header className="jd-app-head">
                <b>Pipeline de Leads</b>
                {badge && <span className={'jd-badge ' + badge.cls}>{badge.t}</span>}
                <div className="jd-views" role="group" aria-label="Modo de visualização">
                  <button className={view === 'kanban' ? 'on' : ''} onClick={() => setView('kanban')}>▦ Pipeline</button>
                  <button className={view === 'table' ? 'on' : ''} onClick={() => { setView('table'); markTouched(); }}>☰ Tabela</button>
                  {record && (
                    <button className={view === 'record' ? 'on' : ''} onClick={() => setView('record')}>👤 {record.name.split(' ')[0]}</button>
                  )}
                </div>
              </header>

              {view === 'kanban' && (
                <div className="jd-kanban">
                  {stagesK.map((s) => {
                    const col = leads.filter((l) => l.stage === s);
                    const extra = s === 'Novo' ? 7 : 0;
                    return (
                      <div key={s} className="jd-kcol">
                        <div className="jd-khead">{s}<span>{col.length + extra}</span></div>
                        {col.map((l) => (
                          <div key={l.id} className="jd-kcard">
                            <button className="jd-kname" onClick={() => openRecord(l.id)}>{l.name}</button>
                            <div className="jd-ksub">{l.company} · {mask(l.email)}</div>
                            <div className="jd-kfoot">
                              <span className={'jd-ktag' + (l.agent ? ' ag' : '')}>{l.agent ? 'assistente moveu' : l.origem}</span>
                              <button className="jd-kmove" onClick={() => moveLead(l.id)} aria-label={`Mover ${l.name}`}>mover →</button>
                            </div>
                          </div>
                        ))}
                        {s === 'Novo' && (
                          <>
                            {extra > 0 && <div className="jd-kmore">+{extra} da planilha</div>}
                            <button className="jd-kadd" onClick={() => setNewLeadOpen(true)}>+ Novo lead</button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {view === 'table' && (
                <div className="jd-table-wrap">
                  <input
                    className="jd-search"
                    placeholder="Buscar lead…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Buscar lead"
                  />
                  <table className="jd-table">
                    <thead>
                      <tr><th>Nome</th><th>Empresa</th><th>E-mail</th><th>Etapa</th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((l) => (
                        <tr key={l.id} onClick={() => openRecord(l.id)} tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && openRecord(l.id)}>
                          <td className="jd-tname">{l.name}</td>
                          <td>{l.company}</td>
                          <td>{mask(l.email)} 🔒</td>
                          <td><span className="jd-stagepill">{l.stage}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="jd-tcount">{filtered.length} exibidos · {leads.length + 7} no total</div>
                </div>
              )}

              {view === 'record' && record && (
                <div className="jd-record">
                  <div className="jd-rec-head">
                    <b>{record.name}</b>
                    <span className="jd-stagepill">{record.stage}</span>
                  </div>
                  <div className="jd-rec-grid">
                    <dl className="jd-fields">
                      <div><dt>Nome</dt><dd>{record.name}</dd></div>
                      <div><dt>Empresa</dt><dd>{record.company}</dd></div>
                      <div>
                        <dt>E-mail</dt>
                        <dd>{mask(record.email)} <span className="jd-lock" title="Protegido: seu papel vê mascarado — decidido no desenho">🔒</span></dd>
                      </div>
                      <div><dt>Etapa</dt><dd>{record.stage}</dd></div>
                      <div><dt>Dono</dt><dd>Recrutador (você)</dd></div>
                    </dl>
                    <div className="jd-nba">
                      <span className="jd-nba-k">🤖 Próximo passo sugerido</span>
                      <span>
                        {record.stage === 'Novo'
                          ? 'Qualificar este lead — os dados vieram completos.'
                          : record.stage === 'Contrato'
                            ? 'Acompanhar a assinatura — contrato enviado.'
                            : 'Avançar para a próxima etapa do funil.'}
                      </span>
                      <button className="jd-btn jd-pri" onClick={() => nbaAction(record.id)}>Fazer isso</button>
                    </div>
                  </div>
                  <div className="jd-tl">
                    <span className="jd-tl-t">Histórico — tudo fica registrado</span>
                    {record.log.map((e, i) => (
                      <div key={i} className={'jd-tl-i ' + e.who}>
                        <span>{e.text}</span><time>{e.time}</time>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {newLeadOpen && (
                <NewLeadForm onCreate={createLead} onCancel={() => setNewLeadOpen(false)} />
              )}
            </>
          )}

          {/* as 5 regras acendendo */}
          <footer className="jd-trust" aria-label="Regras da confiança demonstradas">
            {TRUST_RULES.map((r, i) => (
              <span key={r.title} className={'jd-trust-chip' + (trust[i] ? ' on' : '')} title={r.desc}>
                {trust[i] ? '✓ ' : ''}{r.title}
              </span>
            ))}
          </footer>
        </section>
      </div>

      <p className="jd-honest">
        Demonstração interativa com dados de exemplo — ilustra a jornada de criação; o app real
        nasce dentro da plataforma, com os seus dados.
      </p>
    </div>
  );
}

function NewLeadForm({
  onCreate,
  onCancel,
}: {
  onCreate: (n: string, c: string, e: string) => void;
  onCancel: () => void;
}) {
  const [n, setN] = useState('Gustavo Reis');
  const [c, setC] = useState('RetailPro');
  const [e, setE] = useState('gustavo@retailpro.com');
  return (
    <div className="jd-modal" role="dialog" aria-modal="true" aria-label="Criar novo lead">
      <div className="jd-modal-card">
        <b>Novo lead</b>
        <label>Nome<input value={n} onChange={(ev) => setN(ev.target.value)} /></label>
        <label>Empresa<input value={c} onChange={(ev) => setC(ev.target.value)} /></label>
        <label>E-mail<input value={e} onChange={(ev) => setE(ev.target.value)} /></label>
        <span className="jd-mini">🛡️ Vira registro real no seu espaço — protegido e só seu.</span>
        <div className="jd-btns">
          <button className="jd-btn jd-pri" onClick={() => onCreate(n, c, e)}>Criar</button>
          <button className="jd-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

const JD_CSS = `
.jd { --jd-bg:#1A1B1E; --jd-panel:#25262B; --jd-line:#33353B; --jd-tx:#E5E7EB; --jd-mut:#9CA3AF;
  --jd-blue:#4DABF7; --jd-green:#34D399; --jd-amber:#FBBF24; --jd-red:#F87171;
  background: var(--jd-bg); border: 1px solid var(--jd-line); border-radius: 16px;
  color: var(--jd-tx); overflow: hidden; font-size: 14.5px; }
.jd * { box-sizing: border-box; }
.jd-rail { display:flex; gap:6px; padding:12px 16px; border-bottom:1px solid var(--jd-line); overflow-x:auto; scrollbar-width:none; }
.jd-rail::-webkit-scrollbar{display:none}
.jd-step { font-size:11.5px; color:var(--jd-mut); border:1px solid var(--jd-line); border-radius:999px; padding:3px 10px; white-space:nowrap; }
.jd-step.done { color:var(--jd-green); border-color:rgba(52,211,153,.35); background:rgba(52,211,153,.08); }
.jd-step.cur { color:var(--jd-blue); border-color:var(--jd-blue); background:rgba(77,171,247,.1); font-weight:600; }
.jd-grid { display:grid; grid-template-columns: minmax(320px,42%) 1fr; height: clamp(520px, calc(100vh - 250px), 700px); }
@media (max-width:860px){
  .jd-grid{ grid-template-columns:1fr; height:auto; }
  .jd-chat{ height:min(54vh,480px); border-right:none; }
  .jd-app{ height:min(58vh,520px); border-top:1px solid var(--jd-line); }
}

.jd-chat { display:flex; flex-direction:column; border-right:1px solid var(--jd-line); min-height:0; overflow:hidden; }
@media (max-width:860px){ .jd-chat{border-right:none} }
.jd-scroll { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; min-height:0; }
.jd-msg { display:flex; gap:8px; max-width:94%; }
.jd-msg.user { align-self:flex-end; flex-direction:row-reverse; }
.jd-who { width:26px;height:26px;min-width:26px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;background:rgba(77,171,247,.15);color:var(--jd-blue); }
.jd-msg.user .jd-who { background:rgba(167,139,250,.15); color:#A78BFA; }
.jd-bubble { background:var(--jd-panel); border:1px solid var(--jd-line); border-radius:12px; padding:9px 13px; line-height:1.5; }
.jd-msg.user .jd-bubble { background:rgba(77,171,247,.1); border-color:rgba(77,171,247,.25); }
.jd-typing{display:inline-flex;gap:4px;padding:6px 4px}
.jd-typing i{width:6px;height:6px;border-radius:99px;background:var(--jd-mut);animation:jdb 1.2s infinite}
.jd-typing i:nth-child(2){animation-delay:.2s}.jd-typing i:nth-child(3){animation-delay:.4s}
@keyframes jdb{0%,100%{opacity:.25}50%{opacity:1}}
.jd-note { align-self:center; font-size:11.5px; color:var(--jd-mut); border:1px dashed var(--jd-line); border-radius:999px; padding:3px 12px; }

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
.jd-pill code { font-size:11px; background:rgba(255,255,255,.08); border-radius:4px; padding:1px 5px; }
.jd-pill em { font-style:italic; opacity:.8; font-size:11.5px; }

.jd-app { display:flex; flex-direction:column; min-height:0; background:#1F2024; overflow-y:auto; }
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
.jd-tl { margin-top:16px; }
.jd-tl-t { display:block; font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--jd-mut); font-weight:700; margin-bottom:8px; }
.jd-tl-i { display:flex; gap:10px; border-left:2px solid var(--jd-line); padding:6px 0 6px 12px; position:relative; font-size:13px; color:var(--jd-mut); }
.jd-tl-i::before { content:''; position:absolute; left:-5px; top:12px; width:8px; height:8px; border-radius:99px; background:var(--jd-line); }
.jd-tl-i.agent::before { background:#A78BFA; }
.jd-tl-i.user::before { background:var(--jd-blue); }
.jd-tl-i time { margin-left:auto; font-size:11px; white-space:nowrap; }
.jd-modal { position:absolute; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; z-index:5; border-radius:0 0 16px 0; }
.jd-modal-card { width:min(360px, calc(100% - 32px)); background:var(--jd-panel); border:1px solid var(--jd-line); border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:10px; }
.jd-modal-card label { font-size:11px; color:var(--jd-mut); display:flex; flex-direction:column; gap:4px; }
.jd-modal-card input { padding:8px 11px; border-radius:8px; border:1px solid var(--jd-line); background:#1F2024; color:var(--jd-tx); font:inherit; font-size:13.5px; }
.jd-app { position:relative; }
.jd-trust { display:flex; gap:6px; flex-wrap:wrap; padding:10px 16px; border-top:1px solid var(--jd-line); margin-top:auto; }
.jd-trust-chip { font-size:11px; border:1px solid var(--jd-line); border-radius:999px; padding:3px 10px; color:var(--jd-mut); opacity:.6; transition:all .25s; }
.jd-trust-chip.on { color:var(--jd-green); border-color:rgba(52,211,153,.4); background:rgba(52,211,153,.08); opacity:1; }
.jd-honest { font-size:12px; color:var(--jd-mut); text-align:center; padding:10px 16px 14px; margin:0; }
.jd :focus-visible { outline:2px solid var(--jd-blue); outline-offset:2px; border-radius:6px; }
@media (prefers-reduced-motion: reduce){ .jd *{animation:none!important;transition:none!important} }
`;
