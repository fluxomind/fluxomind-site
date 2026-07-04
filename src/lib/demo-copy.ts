/* ------------------------------------------------------------------
   Dicionário de copy da jornada interativa (JourneyDemo).

   O componente src/components/JourneyDemo.tsx é único e recebe um
   objeto `copy: DemoCopy`. TODA diferença entre a versão pt e a en vive
   aqui — strings de UI, os cenários inteiros (CENARIOS), os diálogos da
   Ally, regex de roteamento, formatação de moeda e os hrefs divergentes.
   A lógica (hooks, travas, autopilot, timing, analytics) fica no
   componente e é a mesma para os dois idiomas.

   Implementações concretas: demo-copy-pt.ts · demo-copy-en.ts
   ------------------------------------------------------------------ */

export type LogE = { who: 'user' | 'agent' | 'system'; text: string; time: string };

export type NBA = { text: string; kind?: 'advance' | 'handoff' | 'note'; log?: string };

export type Registro = {
  id: string;
  name: string;
  meta: Record<string, string>;
  stage: string;
  origem: string;
  agent?: boolean;
  log: LogE[];
  nba?: NBA;
  nbaDone?: boolean;
};

export type Seed = {
  id: string;
  name: string;
  meta: Record<string, string>;
  stage: string;
  nba?: NBA;
  thread?: LogE[];
};

export type CenarioId = 'leads' | 'caixa' | 'atendimento';
export type Surface = 'kanban' | 'financeiro' | 'chats';

export type Premissa =
  | { icon: string; text: string }
  | {
      icon: string;
      kind: 'edit';
      before: string;
      after: string;
      userMsg: string;
      ally: string;
      addColuna?: string; // leads: acrescenta a coluna ao funil; demais: só texto
    };

export const isEdit = (p: Premissa): p is Extract<Premissa, { kind: 'edit' }> =>
  'kind' in p && p.kind === 'edit';

export type DesenhoRow = { icon: string; label: string; text: string };
export type Field = { label: string; value: string; lock?: boolean };
export type TableCol = {
  header: string;
  get?: (r: Registro) => string;
  lock?: boolean;
  stage?: boolean;
  primary?: boolean;
};

export type Cenario = {
  id: CenarioId;
  surface: Surface;
  pill: string;
  tema: string; // roteiro do texto livre
  // entrada
  xlsx: string; // "contas-a-receber.xlsx (2 abas · 22 linhas)"
  planilhaRead: string; // fala da Ally ao ler a planilha
  espelhoChips: string[];
  // enquadrar
  premissas: Premissa[];
  ajusteLabel: string;
  // desenho
  desenho: DesenhoRow[];
  // build
  buildSteps: string[];
  // registros
  columns: string[];
  extraN: number;
  seed: Seed[];
  touchId?: string; // superfícies financeiro/chats: id aberto no autopilot (checkpoint 4)
  autoMove: { id: string; toStage: string; log: string };
  nbaDefault: (r: Registro) => NBA;
  // app
  appTitle: string;
  boardLabel: string;
  ctaObj: string;
  // render dos registros (kanban/financeiro)
  subtitle: (r: Registro) => string;
  recordFields: (r: Registro) => Field[];
  tableCols: TableCol[];
  newForm: {
    title: string;
    add: string;
    fields: { label: string; def: string }[];
    build: (v: string[]) => { name: string; meta: Record<string, string> };
  };
  // magia / operar
  magic: string;
  touchHint: string;
  // HITL
  hitl: {
    text: string;
    button: string;
    note: string;
    lead: string;
    resolveLabel: string;
    apply: { id: string; toStage: string; log: string };
  };
  // evoluir — por superfície: coluna (kanban) · status+move (financeiro) · regra (chats)
  evolve: {
    userMsg: string;
    allyViaChat: string;
    doneLabel: string;
    col?: string;
    before?: string;
    move?: { id: string; from: string; to: string; log: string };
    regra?: string;
  };
};

// --------- máscaras: e-mail/CPF/CNPJ protegidos por padrão (como no produto) ---------
export const maskEmail = (email: string) => email.replace(/(.{2}).+(@.+)/, '$1●●●$2');
export const maskCPF = (cpf: string) => cpf.replace(/^(\d{3})\.(\d{3})/, '●●●.●●●');
export const maskCNPJ = (cnpj: string) => cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})/, '●●.●●●.●●●');

export type TrustRule = { title: string; desc: string };

export type DemoCopy = {
  // href da marca na topbar: '/' (pt) · '/en' (en)
  brandHref: string;
  // rail de progresso (8 etapas)
  stages: readonly string[];
  // cor por status — chaveado pelo rótulo da etapa (varia por idioma)
  statusColor: Record<string, string>;
  // formatação de moeda (R$ pt-BR · $ en-US)
  currency: (n: number) => string;
  // roteamento do texto livre por regex (retorna caixa/atendimento; senão leads)
  route: { caixa: RegExp; atendimento: RegExp };
  // entrada
  entry: { greeting: string; examples: string[] };
  // cenários completos (dado, não lógica)
  cenarios: Record<CenarioId, Cenario>;
  // as 5 regras da confiança (message house) e o rótulo do CTA beta
  trustRules: readonly TrustRule[];
  ctaBeta: string;

  // diálogos da Ally + rótulos de resolução/log no fluxo do autopilot
  flow: {
    prosaAlly: (tema: string) => string;
    resolvedEspelho: string;
    allyConfirmaFunciona: string;
    enquadrarAceito: string; // resolveCard quando NÃO houve ajuste de premissa
    allyDesenhei: string;
    resolvedDesenho: string;
    origemPlanilha: string;
    importadoPlanilha: (arquivo: string) => string;
    allyAppDePe: (magic: string) => string;
    allyExperimenta: (touchHint: string) => string;
    resolvedGate: string;
    noteAppAprovado: (time: string) => string;
    allyAssumeDia: string;
    ajustarUserMsg: (alvo: string, entryCol: string) => string;
    allyTroquei: string;
    allyDescartar: string;
    allyAutomacaoSegue: (lead: string) => string;
    resolvedPublicar: string;
    allyAppVivo: string;
    allyAplicado: string;
    allyAnotei: string;
    resolvedHitlLater: string;
    logVoceMoveu: (next: string) => string;
    logCriadoDireto: string;
    origemCriado: string;
    logEncaminhado: string; // fallback nbaAction handoff
    logFeito: string; // fallback nbaAction note
    logProximoPasso: string; // fallback nbaAction advance
  };

  // textos dos cards do chat (renderCard) + card "build"
  cards: {
    espelhoKick: string;
    espelhoChipNew: string;
    espelhoBtn: string;
    enquadrarKick: string;
    ajustadoPorVoce: string;
    corrigir: string;
    enquadrarBtn: string;
    desenhoKick: string;
    desenhoVerified: string;
    desenhoBtn: string;
    gateKick: string;
    gateP: string; // markdown (**negrito** via boldify)
    gateKeep: string;
    gateAdjust: string;
    gateDiscard: string;
    hitlKick: string;
    hitlLater: string; // botão "Agora não"
    publicarKick: string;
    publicarP: string; // markdown (**negrito** via boldify)
    publicarBtn: string;
    evoluirKick: string;
    evoluirApplied: string; // "Aplicado ✓"
    desfazer: string;
    evoluirReverted: string; // markdown (**negrito** via boldify)
    ctaKick: string;
    ctaP: (ctaObj: string) => string;
    buildKick: string;
  };

  // superfícies do app (kanban/financeiro/chats) + ficha/thread/badges/tabela
  app: {
    // kanban
    assistenteMoveu: string;
    mover: string;
    moverAria: (name: string) => string;
    maisDaPlanilha: (n: number) => string;
    // financeiro
    finEmAberto: string;
    finVencido: string;
    finEmNegociacao: string;
    limparFiltro: string;
    finContador: (n: number) => string;
    finTableHead: readonly string[]; // Cliente · Valor · Vencimento · Status (+ th vazio)
    abrir: string;
    nenhumaFatura: string;
    // chats
    regrasAtendimentoAria: string;
    regraAgenda: string;
    regraClinico: string;
    novo: string; // "NOVO" na pill da regra nova
    naoLidaAria: string;
    maisConversas: (n: number) => string;
    // thread / ficha
    humanoAssume: string;
    sugestaoAssistente: string;
    proximoPassoSugerido: string;
    fazerIsso: string;
    protegidoTitle: string;
    historico: string;
    // badges do app
    badgeDraft: string;
    badgeKept: string;
    badgePub: string;
    // vazio / views / tabela
    appAria: string;
    emptyTitle: string;
    emptySub: string;
    viewModeAria: string;
    tabela: string;
    buscarPlaceholder: string;
    buscarAria: string;
    tabelaContador: (shown: number, total: number) => string;
    trustAria: string;
  };

  // shell: topbar, rail, input, panebar, honest, modal de novo registro
  shell: {
    brandAria: string;
    crumbCompany: string;
    crumbTitle: string;
    navAria: string;
    voltarPasso: string;
    passoAPasso: string;
    avancarPasso: string;
    recomecarTitle: string;
    recomecar: string; // " Recomeçar" (com espaço à esquerda)
    phaseFull: string;
    phaseShort: string;
    ctaShort: string;
    railAria: string;
    conversaAria: string;
    you: string; // rótulo do avatar do usuário ("VC" · "You")
    inputStarted: string;
    inputIdle: string;
    inputAria: string;
    enviarAria: string;
    panebarAria: string;
    paneChat: string;
    paneApp: string;
    decisaoPendenteAria: string;
    novidadeAria: string;
    honest: string;
    modalProtegido: string;
    criar: string;
    cancelar: string;
  };
};
