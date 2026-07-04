'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { TRUST_RULES, CTA } from '@/lib/messages';
import { track } from '@/lib/analytics';

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

type LogE = { who: 'user' | 'agent' | 'system'; text: string; time: string };

type NBA = { text: string; kind?: 'advance' | 'handoff' | 'note'; log?: string };

type Registro = {
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

type Seed = { id: string; name: string; meta: Record<string, string>; stage: string; nba?: NBA; thread?: LogE[] };

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

// --------- máscaras: e-mail/CPF/CNPJ protegidos por padrão (como no produto) ---------
const maskEmail = (email: string) => email.replace(/(.{2}).+(@.+)/, '$1●●●$2');
const maskCPF = (cpf: string) => cpf.replace(/^(\d{3})\.(\d{3})/, '●●●.●●●');
const maskCNPJ = (cnpj: string) => cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})/, '●●.●●●.●●●');

// --------- **negrito** dentro de strings de conteúdo (premissas, HITL) ---------
function boldify(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : p));
}

// cor por status — pill colorida nas superfícies financeiro e chats
const STATUS_COLOR: Record<string, string> = {
  Novo: 'blue',
  'Em atendimento': 'amber',
  'Aguardando paciente': 'violet',
  Resolvido: 'green',
  'A vencer': 'blue',
  Vencida: 'red',
  'Em negociação': 'amber',
  Acordo: 'violet',
  Paga: 'green',
};

const brl = (n: number) => 'R$ ' + n.toLocaleString('pt-BR');
const valOf = (r: Registro) => Number((r.meta.valor ?? '0').replace(/[^\d]/g, ''));

const INITIAL_ITEMS: Item[] = [
  {
    kind: 'msg',
    who: 'ally',
    text: 'Oi! Eu sou a Ally 👋 Escolha um exemplo aqui embaixo — ou me conta um problema do seu negócio com as suas palavras, que eu leio como você trabalha hoje. Os dois caminhos valem.',
  },
];

// Exemplos que ciclam no placeholder da entrada (máquina-de-escrever). Cada um
// casa com o roteamento por regex (lead→leads · cobran/caixa→caixa · whatsapp→
// atendimento), então copiar a sugestão e enviar leva ao cenário certo.
const ENTRY_EXAMPLES = [
  'meus leads e contratos vivem numa planilha…',
  'cobrança de clientes em atraso, tudo no caixa…',
  'minha clínica se afoga em mensagens no WhatsApp…',
];

// ======================= CENÁRIOS =======================

type CenarioId = 'leads' | 'caixa' | 'atendimento';
type Surface = 'kanban' | 'financeiro' | 'chats';

type Premissa =
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

const isEdit = (p: Premissa): p is Extract<Premissa, { kind: 'edit' }> =>
  'kind' in p && p.kind === 'edit';

type DesenhoRow = { icon: string; label: string; text: string };
type Field = { label: string; value: string; lock?: boolean };
type TableCol = {
  header: string;
  get?: (r: Registro) => string;
  lock?: boolean;
  stage?: boolean;
  primary?: boolean;
};

type Cenario = {
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

const CENARIOS: Record<CenarioId, Cenario> = {
  // ---------------------------------------------------------------- LEADS (kanban)
  leads: {
    id: 'leads',
    surface: 'kanban',
    pill: '📊 Leads e contratos — hoje é planilha',
    tema: 'leads e contratos',
    xlsx: 'leads-criadores.xlsx (3 abas · 25 linhas)',
    planilhaRead:
      'Li sua planilha. A aba "Leads" tem 12 leads (colunas viram campos) · "Criadores" tem 8 — detectei CPF e já vou proteger · "Contratos" tem 5, ligados aos criadores. Seus dados entram de verdade, sem redigitar nada.',
    espelhoChips: ['Leads', 'Criadores', 'Contratos'],
    premissas: [
      { icon: '👥', text: 'Quem usa: **Recrutador · Gestor · Jurídico**' },
      {
        icon: '🔁',
        kind: 'edit',
        before: 'Funil: **Novo → Qualificado → Proposta → Contrato (4 etapas)**',
        after: 'Funil: **Novo → Qualificado → Proposta → Contrato → Onboarding**',
        userMsg: 'Falta a etapa de Onboarding no fim do funil.',
        ally: 'Funil com 5 etapas ✓ — eu proponho, você corrige. É assim que funciona.',
        addColuna: 'Onboarding',
      },
      { icon: '🔒', text: 'E-mail e CPF **protegidos por padrão**' },
      { icon: '🛡️', text: 'Jurídico vê **só contratos**' },
      { icon: '⚡', text: 'Contrato só sai **com o seu OK**' },
    ],
    ajusteLabel: 'Aceito, com seu ajuste no funil',
    desenho: [
      { icon: '🗃️', label: 'Seus dados', text: 'Leads, criadores e contratos — ligados entre si, com os 25 registros da sua planilha' },
      { icon: '🖥️', label: 'Sua tela', text: 'Um pipeline visual por etapa — cada papel da equipe vê a sua versão' },
      { icon: '🤖', label: 'Seu assistente', text: 'Sugere e executa o próximo passo em cada lead — e pergunta antes do que importa' },
      { icon: '🔁', label: 'Automação', text: 'Contrato assinado → onboarding dispara sozinho' },
      { icon: '🔌', label: 'Conexão', text: 'Gmail para enviar propostas e contratos' },
      { icon: '🛡️', label: 'Quem vê o quê', text: 'Jurídico só vê contratos · CPF e e-mail protegidos' },
    ],
    buildSteps: [
      'Guardando seus dados — 12 leads, 8 criadores, 5 contratos',
      'Protegendo quem-vê-o-quê no mesmo ato — nada nasce desprotegido',
      'Montando sua tela de pipeline',
      'Ligando o assistente e a automação',
      'Conferindo tudo por dentro — cada peça bate com o desenho',
    ],
    columns: ['Novo', 'Qualificado', 'Proposta', 'Contrato'],
    extraN: 7,
    seed: [
      { id: 'ana', name: 'Ana Souza', stage: 'Novo', meta: { empresa: 'TechFin', email: 'ana@techfin.com' } },
      { id: 'bruno', name: 'Bruno Lima', stage: 'Novo', meta: { empresa: 'AgroData', email: 'bruno@agrodata.io' } },
      { id: 'carla', name: 'Carla Mendes', stage: 'Novo', meta: { empresa: 'FinOps Lab', email: 'carla@finopslab.com' } },
      { id: 'diego', name: 'Diego Rocha', stage: 'Novo', meta: { empresa: 'EduPlay', email: 'diego@eduplay.com' } },
      { id: 'elisa', name: 'Elisa Prado', stage: 'Novo', meta: { empresa: 'HealthHub', email: 'elisa@healthhub.co' } },
    ],
    autoMove: { id: 'bruno', toStage: 'Qualificado', log: 'Assistente qualificou — próximo passo sugerido' },
    nbaDefault: (r) => ({
      text:
        r.stage === 'Novo'
          ? 'Qualificar este lead — os dados vieram completos.'
          : r.stage === 'Contrato'
            ? 'Acompanhar a assinatura — contrato enviado.'
            : 'Avançar para a próxima etapa do funil.',
    }),
    appTitle: 'Pipeline de Leads',
    boardLabel: 'Pipeline',
    ctaObj: 'um app',
    subtitle: (r) => `${r.meta.empresa} · ${maskEmail(r.meta.email)}`,
    recordFields: (r) => [
      { label: 'Nome', value: r.name },
      { label: 'Empresa', value: r.meta.empresa },
      { label: 'E-mail', value: maskEmail(r.meta.email), lock: true },
      { label: 'Etapa', value: r.stage },
      { label: 'Dono', value: 'Recrutador (você)' },
    ],
    tableCols: [
      { header: 'Nome', get: (r) => r.name, primary: true },
      { header: 'Empresa', get: (r) => r.meta.empresa },
      { header: 'E-mail', get: (r) => maskEmail(r.meta.email), lock: true },
      { header: 'Etapa', stage: true },
    ],
    newForm: {
      title: 'Novo lead',
      add: '+ Novo lead',
      fields: [
        { label: 'Nome', def: 'Gustavo Reis' },
        { label: 'Empresa', def: 'RetailPro' },
        { label: 'E-mail', def: 'gustavo@retailpro.com' },
      ],
      build: (v) => ({
        name: v[0] || 'Gustavo Reis',
        meta: { empresa: v[1] || 'RetailPro', email: v[2] || 'gustavo@retailpro.com' },
      }),
    },
    magic:
      'Os leads da planilha já estão na tela. Mexe à vontade: clique num nome, crie um lead, mova um card.',
    touchHint: 'cria ou move um lead, abre uma ficha',
    hitl: {
      text: 'O contrato da **Ana Souza (TechFin)** está pronto. Envio por Gmail?',
      button: 'Aprovar envio',
      note: 'Você aprovou: contrato para Ana Souza',
      lead: 'Contrato foi.',
      resolveLabel: 'Você aprovou o envio',
      apply: { id: 'ana', toStage: 'Contrato', log: 'Contrato enviado por Gmail — aprovado por você' },
    },
    evolve: {
      userMsg: 'Adiciona a etapa Negociação antes de Contrato.',
      col: 'Negociação',
      before: 'Contrato',
      allyViaChat:
        'É assim que se evolui — pedindo. Nesta demonstração eu aplico um exemplo pronto: a etapa Negociação antes de Contrato. Olha o pipeline:',
      doneLabel: 'etapa Negociação no pipeline',
    },
  },

  // ---------------------------------------------------------------- CAIXA (financeiro)
  caixa: {
    id: 'caixa',
    surface: 'financeiro',
    pill: '💰 Contas a receber e cobrança — hoje é planilha',
    tema: 'contas a receber e cobrança',
    xlsx: 'contas-a-receber.xlsx (2 abas · 22 linhas)',
    planilhaRead:
      'Li sua planilha. A aba "Faturas" tem 14 faturas (colunas viram campos: cliente, valor, vencimento) · "Clientes" tem 8 — detectei CNPJ e já vou proteger. Entendi: acompanhar faturas a receber, vencimentos e a régua de cobrança — hoje numa planilha. Seus dados entram de verdade, sem redigitar nada.',
    espelhoChips: ['Faturas', 'Clientes', 'Cobranças'],
    premissas: [
      {
        icon: '🔔',
        kind: 'edit',
        before: 'Régua de cobrança em **3 toques** (lembrete → cobrança → proposta de acordo)',
        after: 'Régua de cobrança em **4 toques** (aviso amigável → lembrete → cobrança → proposta de acordo)',
        userMsg: 'Antes da cobrança tem um aviso amigável — minha régua tem 4 toques.',
        ally: 'Régua com 4 toques ✓ — eu proponho, você corrige.',
      },
      { icon: '✋', text: 'Desconto acima de **5% só com sua aprovação** (decisão humana)' },
      { icon: '👁️', text: 'Valores visíveis **só para o papel Financeiro**' },
      { icon: '🔒', text: 'CNPJ e e-mail **protegidos por padrão**' },
    ],
    ajusteLabel: 'Aceito, com seu ajuste na régua',
    desenho: [
      { icon: '🗃️', label: 'Seus dados', text: 'Faturas, clientes e cobranças ligados, com os 22 registros da planilha' },
      { icon: '🖥️', label: 'Sua tela', text: 'Painel de recebíveis por status, com o total em risco no topo' },
      { icon: '🤖', label: 'Seu assistente', text: 'Prioriza quem cobrar, redige a mensagem — e pergunta antes de enviar' },
      { icon: '🔁', label: 'Automação', text: 'Vencimento chegou → a régua dispara sozinha' },
      { icon: '🔌', label: 'Conexão', text: 'Gmail e WhatsApp para lembretes e cobranças' },
      { icon: '🛡️', label: 'Quem vê o quê', text: 'Valores só para o Financeiro · CNPJ protegido' },
    ],
    buildSteps: [
      'Guardando seus dados — 14 faturas, 8 clientes, cobranças',
      'Protegendo CNPJ e valores no mesmo ato — nada nasce desprotegido',
      'Montando sua tela de recebíveis',
      'Ligando o assistente e a régua de cobrança',
      'Conferindo tudo por dentro — cada peça bate com o desenho',
    ],
    columns: ['A vencer', 'Vencida', 'Em negociação', 'Paga'],
    extraN: 9,
    seed: [
      {
        id: 'techfin',
        name: 'TechFin',
        stage: 'A vencer',
        meta: { valor: 'R$ 12.400', venc: 'vence amanhã', email: 'financeiro@techfin.com', cnpj: '11.222.333/0001-81' },
        nba: { text: 'Lembrete amigável — a fatura vence amanhã.', kind: 'note', log: 'Lembrete enviado ✓ — a fatura vence amanhã.' },
      },
      { id: 'agro', name: 'AgroData', stage: 'Vencida', meta: { valor: 'R$ 8.900', venc: 'vencida há 12 dias', email: 'financeiro@agrodata.io', cnpj: '44.555.666/0001-72' } },
      { id: 'finops', name: 'FinOps Lab', stage: 'Em negociação', meta: { valor: 'R$ 21.000', venc: 'em negociação', email: 'contas@finopslab.com', cnpj: '77.888.999/0001-63' } },
      { id: 'eduplay', name: 'EduPlay', stage: 'A vencer', meta: { valor: 'R$ 5.600', venc: 'vence em 6 dias', email: 'financeiro@eduplay.com', cnpj: '22.333.444/0001-54' } },
      { id: 'healthhub', name: 'HealthHub', stage: 'Vencida', meta: { valor: 'R$ 3.100', venc: 'vencida há 3 dias', email: 'financeiro@healthhub.co', cnpj: '55.666.777/0001-45' } },
    ],
    touchId: 'techfin',
    autoMove: { id: 'healthhub', toStage: 'Em negociação', log: 'Assistente priorizou a cobrança — próximo passo sugerido' },
    nbaDefault: () => ({ text: 'Enviar o próximo toque da régua — acompanhar o vencimento.', kind: 'note', log: 'Lembrete enviado ✓ — acompanhando o vencimento.' }),
    appTitle: 'Contas a Receber',
    boardLabel: 'Faturas',
    ctaObj: 'uma cobrança',
    subtitle: (r) => `${r.meta.valor} · ${r.meta.venc}`,
    recordFields: (r) => [
      { label: 'Cliente', value: r.name },
      { label: 'Valor', value: r.meta.valor },
      { label: 'Vencimento', value: r.meta.venc },
      { label: 'CNPJ', value: maskCNPJ(r.meta.cnpj), lock: true },
      { label: 'E-mail', value: maskEmail(r.meta.email), lock: true },
      { label: 'Status', value: r.stage },
      { label: 'Dono', value: 'Financeiro (você)' },
    ],
    tableCols: [
      { header: 'Cliente', get: (r) => r.name, primary: true },
      { header: 'Valor', get: (r) => r.meta.valor },
      { header: 'Vencimento', get: (r) => r.meta.venc },
      { header: 'Status', stage: true },
    ],
    newForm: {
      title: 'Nova fatura',
      add: '+ Nova fatura',
      fields: [
        { label: 'Cliente', def: 'Contoso' },
        { label: 'Valor', def: 'R$ 4.200' },
        { label: 'Vencimento', def: 'vence em 15 dias' },
      ],
      build: (v) => ({
        name: v[0] || 'Contoso',
        meta: {
          valor: v[1] || 'R$ 4.200',
          venc: v[2] || 'vence em 15 dias',
          email: 'financeiro@contoso.com',
          cnpj: '99.888.777/0001-66',
        },
      }),
    },
    magic:
      'As faturas da planilha já estão na tela, com o total em risco no topo. Mexe à vontade: clique num stat pra filtrar, abra uma fatura.',
    touchHint: 'abre uma fatura ou clica num indicador pra filtrar',
    hitl: {
      text: 'A fatura da **AgroData (R$ 8.900)** está 12 dias vencida. Preparei a cobrança com proposta de parcelamento em 2x — envio?',
      button: 'Aprovar envio',
      note: 'Você aprovou: cobrança para AgroData',
      lead: 'Cobrança enviada.',
      resolveLabel: 'Você aprovou o envio',
      apply: { id: 'agro', toStage: 'Em negociação', log: 'Cobrança enviada com proposta de parcelamento — aprovada por você' },
    },
    evolve: {
      userMsg: 'Adiciona a etapa Acordo antes de Paga.',
      col: 'Acordo',
      before: 'Paga',
      move: { id: 'finops', from: 'Em negociação', to: 'Acordo', log: 'Movida para Acordo — parcelamento combinado com o cliente' },
      allyViaChat:
        'É assim que se evolui — pedindo. Nesta demonstração eu aplico um exemplo pronto: o status Acordo antes de Paga. Olha o painel:',
      doneLabel: 'status Acordo na régua',
    },
  },

  // ---------------------------------------------------------------- ATENDIMENTO (chats)
  atendimento: {
    id: 'atendimento',
    surface: 'chats',
    pill: '📅 Atendimento no WhatsApp que resolve — agenda lotada de mensagens',
    tema: 'atendimento no WhatsApp',
    xlsx: 'pacientes.xlsx (2 abas · 20 linhas)',
    planilhaRead:
      'Li sua planilha. A aba "Pacientes" tem 15 pacientes (colunas viram campos) · "Convênios" tem 5 — detectei CPF e já vou proteger. Entendi: atender no WhatsApp, agendar e remarcar consultas e confirmar presença — hoje uma pessoa responde tudo, o dia inteiro. Seus dados entram de verdade, sem redigitar nada.',
    espelhoChips: ['Pacientes', 'Agenda', 'Conversas'],
    premissas: [
      {
        icon: '🕒',
        kind: 'edit',
        before: 'Atendimento **seg–sex, 8h–18h**',
        after: 'Atendimento **seg–sex 8h–18h + sábado até 12h**',
        userMsg: 'Sábado de manhã também temos agenda.',
        ally: 'Sábado até 12h ✓ — anotado.',
      },
      { icon: '🤖', text: 'O assistente **agenda, remarca e confirma sozinho**' },
      { icon: '🚨', text: 'Assunto clínico ou urgência → **uma pessoa assume na hora**' },
      { icon: '🔒', text: 'Dado de saúde **nunca circula no chat**' },
    ],
    ajusteLabel: 'Aceito, com seu ajuste no horário',
    desenho: [
      { icon: '🗃️', label: 'Seus dados', text: 'Pacientes, agenda e conversas ligados, com os 20 registros da planilha' },
      { icon: '🖥️', label: 'Sua tela', text: 'Fila de conversas por status, com a agenda do dia ao lado' },
      { icon: '🤖', label: 'Seu assistente', text: 'Atende e executa: agenda, remarca, confirma — não é um chat que só responde' },
      { icon: '🔁', label: 'Automação', text: 'Consulta marcada → confirmação automática na véspera' },
      { icon: '🔌', label: 'Conexão', text: 'WhatsApp e agenda (Google Calendar)' },
      { icon: '🛡️', label: 'Quem vê o quê', text: 'Assunto clínico só para a equipe · CPF protegido' },
    ],
    buildSteps: [
      'Guardando seus dados — 15 pacientes, agenda, conversas',
      'Protegendo CPF e dados de saúde no mesmo ato — nada nasce desprotegido',
      'Montando sua fila de conversas',
      'Ligando o assistente e as confirmações automáticas',
      'Conferindo tudo por dentro — cada peça bate com o desenho',
    ],
    columns: ['Novo', 'Em atendimento', 'Aguardando paciente', 'Resolvido'],
    extraN: 8,
    seed: [
      {
        id: 'marina',
        name: 'Marina Lopes',
        stage: 'Novo',
        meta: { pedido: 'quer remarcar para quinta', cpf: '123.456.789-01' },
        thread: [
          { who: 'user', text: 'Oi, preciso remarcar minha consulta 🙏', time: '09:12' },
          { who: 'user', text: 'Consigo passar para quinta?', time: '09:12' },
        ],
        nba: { text: 'Remarcar para quinta às 14h e confirmar no calendário.', kind: 'advance', log: 'Pronto! Remarquei para quinta, 14h ✓ Já atualizei sua agenda.' },
      },
      {
        id: 'jose',
        name: 'José Neto',
        stage: 'Novo',
        meta: { pedido: 'primeira consulta, pediu horário', cpf: '234.567.890-12' },
        thread: [
          { who: 'user', text: 'Oi, queria marcar primeira consulta', time: '10:03' },
          { who: 'agent', text: 'Claro! Tenho amanhã às 10h ou quinta às 14h. Qual fica melhor?', time: '10:03' },
          { who: 'user', text: 'Amanhã 10h', time: '10:05' },
        ],
      },
      {
        id: 'paula',
        name: 'Paula Reis',
        stage: 'Em atendimento',
        meta: { pedido: 'perguntou sobre resultado de exame', cpf: '345.678.901-23' },
        thread: [{ who: 'user', text: 'Oi, saiu o resultado do meu exame de sangue?', time: '11:20' }],
        nba: {
          text: 'Assunto clínico — o assistente não responde: encaminhar para a equipe agora.',
          kind: 'handoff',
          log: '🙋 Assunto clínico — o assistente não responde: encaminhado para a equipe.',
        },
      },
      {
        id: 'carlos',
        name: 'Carlos Dias',
        stage: 'Aguardando paciente',
        meta: { pedido: 'confirmar presença amanhã', cpf: '456.789.012-34' },
        thread: [
          { who: 'agent', text: 'Olá, Carlos! Passando para lembrar da sua consulta amanhã às 15h. Confirma presença?', time: '08:30' },
          { who: 'user', text: 'Confirmo, estarei lá 👍', time: '08:41' },
          { who: 'agent', text: 'Perfeito, presença confirmada ✓ Até amanhã!', time: '08:41' },
        ],
      },
      {
        id: 'rita',
        name: 'Rita Souza',
        stage: 'Novo',
        meta: { pedido: 'dúvida de convênio', cpf: '567.890.123-45' },
        thread: [{ who: 'user', text: 'Vocês atendem pelo convênio Unimed?', time: '14:02' }],
      },
    ],
    touchId: 'jose',
    autoMove: { id: 'rita', toStage: 'Em atendimento', log: 'Sim, atendemos Unimed! Quer que eu já agende? ✓' },
    nbaDefault: () => ({ text: 'Responder e agendar — o assistente resolve e confirma.', kind: 'advance', log: 'Respondido e encaminhado ✓' }),
    appTitle: 'Atendimento — WhatsApp',
    boardLabel: 'Fila',
    ctaObj: 'um atendimento',
    subtitle: (r) => r.meta.pedido,
    recordFields: (r) => [
      { label: 'Paciente', value: r.name },
      { label: 'Pedido', value: r.meta.pedido },
      { label: 'CPF', value: maskCPF(r.meta.cpf), lock: true },
      { label: 'Status', value: r.stage },
      { label: 'Dono', value: 'Atendente (você)' },
    ],
    tableCols: [
      { header: 'Paciente', get: (r) => r.name, primary: true },
      { header: 'Pedido', get: (r) => r.meta.pedido },
      { header: 'Status', stage: true },
    ],
    newForm: {
      title: 'Nova conversa',
      add: '+ Nova conversa',
      fields: [
        { label: 'Paciente', def: 'Lucas Alves' },
        { label: 'Pedido', def: 'quer marcar avaliação' },
        { label: 'CPF', def: '678.901.234-56' },
      ],
      build: (v) => ({
        name: v[0] || 'Lucas Alves',
        meta: { pedido: v[1] || 'quer marcar avaliação', cpf: v[2] || '678.901.234-56' },
      }),
    },
    magic:
      'As conversas da planilha já estão na fila. Mexe à vontade: abra uma conversa e veja o assistente atendendo — ele agenda, confirma e passa o clínico pra equipe.',
    touchHint: 'abre uma conversa da fila',
    hitl: {
      text: 'O **José pediu primeira consulta amanhã às 10h** — a agenda está livre. Confirmo o agendamento?',
      button: 'Confirmar agendamento',
      note: 'Você aprovou: consulta do José confirmada',
      lead: 'Consulta confirmada.',
      resolveLabel: 'Você confirmou o agendamento',
      apply: { id: 'jose', toStage: 'Aguardando paciente', log: 'Agendado! Amanhã às 10h ✓ Confirmação enviada.' },
    },
    evolve: {
      userMsg: 'Liga a confirmação automática na véspera.',
      regra: '🔔 confirma véspera ✓',
      allyViaChat:
        'É assim que se evolui — pedindo. Nesta demonstração eu ligo um exemplo pronto: confirmação automática na véspera. Olha as regras do atendimento:',
      doneLabel: 'confirmação automática na véspera',
    },
  },
};

const CENARIO_IDS = Object.keys(CENARIOS) as CenarioId[];

function routeCenario(text: string): CenarioId {
  const t = text.toLowerCase();
  if (/fatur|cobran|caixa|receb|boleto|inadimpl/.test(t)) return 'caixa';
  if (/atend|agend|consult|whatsapp|paciente|marcar/.test(t)) return 'atendimento';
  return 'leads';
}

export default function JourneyDemo() {
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

  useEffect(() => {
    const n = scrollRef.current;
    if (n) n.scrollTop = n.scrollHeight;
  }, [items, typing]);

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
  }, [started, chatText]);

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

  async function startPlanilha(id?: CenarioId) {
    if (!beginOnce()) return;
    const gen = genRef.current;
    const cid = id ?? cenarioRef.current; // replay usa o cenário preservado
    if (id) aplicarCenario(id);
    const c = CENARIOS[cid];
    track('jornada_start', { entry: 'planilha', cenario: cid });
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
    await ally(
      `Boa! É exatamente assim que funciona: você escreve, eu entendo e monto. Nesta demonstração eu sigo um exemplo pronto — ${c.tema} — mas o caminho é o mesmo com o SEU problema. Olha:`,
      800,
    );
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'espelho' });
  }

  async function confirmaEspelho() {
    if (!lock('espelho')) return;
    const gen = genRef.current;
    resolveCard('espelho', 'Confirmado por você');
    earn(0); // Enquadramento
    goStage(1);
    await ally('Então deixa eu confirmar como seu negócio funciona — corrija só o que estiver errado:', 600);
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
    resolveCard('enquadrar', premEditada ? c.ajusteLabel : 'Aceito como proposto');
    goStage(2);
    await ally('Desenhei seu app inteiro. Em português, não em jargão:', 650);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'desenho' });
    earn(1); // Coerência
  }

  // ---------------- E3: rascunho vivo ----------------
  async function montaRascunho() {
    if (!lock('monta')) return;
    const c = CENARIOS[cenarioRef.current];
    resolveCard('desenho', 'Você mandou montar');
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
      origem: 'da sua planilha',
      agent: false,
      log: s.thread
        ? s.thread.map((e) => ({ ...e }))
        : [{ who: 'user', text: `Importado da planilha ${arquivo}`, time: '14:31' }],
    }));
    setRecords(seeded);
    setDraft('draft');
    earn(4); // Seus dados, só seus
    goStage(4);
    // no mobile, mostra o app nascendo — o momento-mágico é visual
    if (isMobile()) setPane('app');
    await ally(`🎉 Seu app está de pé — em rascunho, só seu. ${c.magic} Depois me diz se é isso.`, 700);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'gate' });
  }

  // ---------------- E4: aprova o que vê ----------------
  async function ficarComEle() {
    if (!lock('ficar')) return;
    const c = CENARIOS[cenarioRef.current];
    const gen = genRef.current;
    if (!touchedRef.current) {
      await ally(`Experimenta mexer no app primeiro — ${c.touchHint}. Decidir vendo é o combinado. 😉`, 400);
      unlock('ficar');
      return;
    }
    resolveCard('gate', 'Você ficou com ele — decidiu vendo');
    push({ kind: 'note', text: `App aprovado por você, vendo-o funcionar · ${now()}` });
    setDraft('kept');
    track('jornada_keep');
    goStage(5);
    await ally('Agora a Ally assume o dia a dia — e te pergunta antes do que importa. Olha ela trabalhando:', 700);
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
    await typeThenPush(`Queria ${alvo} logo depois de ${c.columns[0]}.`);
    await ally('Troquei — olha a tela. Ajustar rascunho é conversa, não retrabalho. É isso?', 500);
    setStagesK((p) => {
      const rest = p.filter((s) => s !== alvo);
      return [rest[0], alvo, ...rest.slice(1)];
    });
    markTouched();
  }

  async function descartar() {
    await ally('Se descartar, eu removo TUDO do rascunho — não sobra nada no seu espaço. (Nesta demonstração, sigo aqui se mudar de ideia.)', 450);
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
    await ally(`${c.hitl.lead} A automação segue até o fim e fica registrada. Antes de abrir pro seu time, eu provo por dentro que cada papel vê só o combinado — aí você publica:`, 800);
    if (genRef.current !== gen) return;
    push({ kind: 'card', card: 'publicar' });
  }

  async function publicar() {
    if (!lock('pub')) return;
    const gen = genRef.current;
    resolveCard('publicar', 'Publicado para o time');
    setDraft('published');
    track('jornada_publish');
    goStage(7);
    await ally('🏁 App vivo, governado e trabalhando. Daqui pra frente, evoluir é só conversar — experimenta:', 600);
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
    await ally('Aplicado ✓ — mudança simples não pede cerimônia. E tem Desfazer, porque errar não pode machucar.', 500);
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
    await ally(
      'Anotei! No produto é assim mesmo: você escreve, eu faço. Nesta demonstração eu sigo um roteiro — a próxima decisão está no card aqui em cima (ou use as setas ▶ lá no topo).',
      600,
    );
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
        return { ...r, stage: next, agent: false, log: [...r.log, { who: 'user', text: `Você moveu para ${next}`, time: now() }] };
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
        : [{ who: 'user', text: 'Criado por você, direto na tela do rascunho', time: now() }];
    setRecords((p) => [
      ...p,
      { id, name: base.name, meta: base.meta, stage: stagesK[0], origem: 'criado por você', agent: false, log },
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
          return { ...r, nbaDone: true, log: [...r.log, { who: 'system', text: nba.log ?? 'Encaminhado para um humano', time: now() }] };
        }
        if (nba.kind === 'note') {
          return { ...r, nbaDone: true, agent: true, log: [...r.log, { who: 'agent', text: nba.log ?? 'Feito ✓', time: now() }] };
        }
        const i = stagesK.indexOf(r.stage);
        const next = i >= 0 && i < stagesK.length - 1 ? stagesK[i + 1] : r.stage;
        return {
          ...r, stage: next, agent: true, nbaDone: true,
          log: [...r.log, { who: 'agent', text: nba.log ?? 'Próximo passo executado pelo assistente — com o seu OK', time: now() }],
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
            <div className="jd-kick">Espelho — é isso?</div>
            <div className="jd-chips">
              {cen.espelhoChips.map((ch) => (
                <span key={ch} className="jd-chip on">{ch}</span>
              ))}
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
              {cen.premissas.map((p, i) => (
                <li key={i}>
                  {isEdit(p) ? (
                    premEditada ? (
                      <>{p.icon} {boldify(p.after)} <span className="jd-mini">(ajustado por você)</span></>
                    ) : (
                      <>
                        {p.icon} {boldify(p.before)}{' '}
                        {!done && (
                          <button className="jd-link" onClick={corrigirPremissa}>corrigir</button>
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
              {cen.desenho.map((r) => (
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
            <div className="jd-kick jd-kick-amber">Decisão sua — a Ally espera</div>
            <p className="jd-p">{boldify(cen.hitl.text)}</p>
            {foot ?? (
              <div className="jd-btns">
                <button className="jd-btn jd-ok" onClick={aprovaEnvio}>{cen.hitl.button}</button>
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
              Provado por dentro antes de expor: cada papel vê exatamente o combinado, dados
              sensíveis protegidos, automação conferida — <b>no banco, não no papel</b>.
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
                    <b>Aplicado ✓</b> — {cen.evolve.doneLabel}.{' '}
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
              Você acabou de criar, aprovar vendo e operar {cen.ctaObj} — com dados de exemplo.
              Com a sua planilha de verdade, é o mesmo caminho.
            </p>
            <div className="jd-btns">
              <button className="jd-btn jd-pri jd-lg" onClick={ctaClick}>{CTA.beta}</button>
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
                    <span className={'jd-ktag' + (l.agent ? ' ag' : '')}>{l.agent ? 'assistente moveu' : l.origem}</span>
                    <button className="jd-kmove" onClick={() => moveRecord(l.id)} aria-label={`Mover ${l.name}`}>mover →</button>
                  </div>
                </div>
              ))}
              {s === entryCol && (
                <>
                  {extra > 0 && <div className="jd-kmore">+{extra} da planilha</div>}
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
    const emAberto = records.filter((r) => r.stage !== 'Paga').reduce((s, r) => s + valOf(r), 0);
    const vencido = records.filter((r) => r.stage === 'Vencida').reduce((s, r) => s + valOf(r), 0);
    const emNeg = records.filter((r) => r.stage === 'Em negociação').reduce((s, r) => s + valOf(r), 0);
    const rows = records.filter((r) =>
      statFilter === 'aberto' ? r.stage !== 'Paga'
      : statFilter === 'vencido' ? r.stage === 'Vencida'
      : statFilter === 'neg' ? r.stage === 'Em negociação'
      : true,
    );
    return (
      <div className="jd-fin">
        <div className="jd-stats">
          <MoneyStat label="Em aberto" value={emAberto} accent="blue" active={statFilter === 'aberto'} reduced={reducedRef.current} onClick={() => statClick('aberto')} />
          <MoneyStat label="Vencido" value={vencido} accent="red" active={statFilter === 'vencido'} reduced={reducedRef.current} onClick={() => statClick('vencido')} />
          <MoneyStat label="Em negociação" value={emNeg} accent="amber" active={statFilter === 'neg'} reduced={reducedRef.current} onClick={() => statClick('neg')} />
        </div>
        <div className="jd-fin-tools">
          {statFilter ? (
            <button className="jd-link" onClick={() => setStatFilter(null)}>limpar filtro</button>
          ) : (
            <span className="jd-mini">{records.length + cen.extraN} faturas · toque num indicador para filtrar</span>
          )}
          <button className="jd-finadd" onClick={() => setNewOpen(true)}>{cen.newForm.add}</button>
        </div>
        <div className="jd-table-wrap">
          <table className="jd-table">
            <thead>
              <tr><th>Cliente</th><th>Valor</th><th>Vencimento</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} onClick={() => openRecord(r.id)} tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openRecord(r.id)}>
                  <td className="jd-tname">{r.name}</td>
                  <td>{r.meta.valor}</td>
                  <td>{r.meta.venc}</td>
                  <td>{statusPill(r.stage)}</td>
                  <td className="jd-tright"><span className="jd-openx">abrir →</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {statFilter && rows.length === 0 && <div className="jd-tcount">Nenhuma fatura neste filtro.</div>}
        </div>
      </div>
    );
  }

  // ---- superfície: CHATS (atendimento) ----
  function renderFila() {
    return (
      <div className="jd-fila-wrap">
        <div className="jd-rules" aria-label="Regras do atendimento">
          <span className="jd-rule">🤖 agenda sozinho ✓</span>
          <span className="jd-rule">🙋 clínico → humano ✓</span>
          {evolveState === 'applied' && (
            <span className="jd-rule jd-rule-new">{cen.evolve.regra} <b>NOVO</b></span>
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
                  {unread && <span className="jd-unread" aria-label="não lida" />}
                </span>
              </button>
            );
          })}
          <div className="jd-kmore">+{cen.extraN} conversas da planilha</div>
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
              <span className="jd-nba-k">{handoff ? '🙋 Humano assume' : '🤖 Sugestão do assistente'}</span>
              <span>{rec.nba!.text}</span>
              <button className="jd-btn jd-pri" onClick={() => nbaAction(rec.id)}>Fazer isso</button>
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
                    <span className="jd-lock" title="Protegido: seu papel vê mascarado — decidido no desenho"> 🔒</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {nbaVisible && (
            <div className={'jd-nba' + (nba.kind === 'handoff' ? ' jd-nba-hand' : '')}>
              <span className="jd-nba-k">{nba.kind === 'handoff' ? '🙋 Humano assume' : '🤖 Próximo passo sugerido'}</span>
              <span>{nba.text}</span>
              <button className="jd-btn jd-pri" onClick={() => nbaAction(rec.id)}>Fazer isso</button>
            </div>
          )}
        </div>
        <div className="jd-tl">
          <span className="jd-tl-t">Histórico — tudo fica registrado</span>
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
    draft === 'draft' ? { cls: 'jd-b-draft', t: 'rascunho — só você vê' }
    : draft === 'kept' ? { cls: 'jd-b-kept', t: 'aprovado por você' }
    : draft === 'published' ? { cls: 'jd-b-pub', t: 'publicado para o time' }
    : null;

  const cardPendente = items.some(
    (i) => i.kind === 'card' && !i.resolved && i.card !== 'cta',
  );

  const listIcon = cen.surface === 'financeiro' ? '📄' : cen.surface === 'chats' ? '📥' : '▦';
  const recIcon = cen.surface === 'chats' ? '💬' : '👤';

  return (
    <div className={`jd jd-pane-${pane}`} data-demo-jornada>
      <style>{JD_CSS}</style>

      {/* topbar de sistema — a sensação de estar dentro do produto */}
      <header className="jd-top">
        <Link href="/" className="jd-top-brand" aria-label="Voltar ao site Fluxomind">
          <span className="jd-top-dot" />
          fluxomind
        </Link>
        <span className="jd-top-crumb">
          sua-empresa <i>/</i> Ally — <b>Jornada de criação</b>
        </span>
        <div className="jd-top-nav" role="group" aria-label="Navegar pela jornada passo a passo">
          <button
            className="jd-nav-back"
            onClick={voltarPasso}
            aria-label="Voltar um passo"
            title="Voltar um passo"
            disabled={!started}
          >
            ◀
          </button>
          <span className="jd-top-nav-lbl">passo a passo</span>
          <button
            className="jd-nav-fwd"
            onClick={avancarPasso}
            aria-label="Avançar um passo"
            title="Avançar um passo"
          >
            ▶
          </button>
        </div>
        {started && (
          <button
            className="jd-top-restart"
            onClick={recomecar}
            aria-label="Reiniciar a demonstração e escolher outro exemplo"
            title="Reiniciar a demonstração e escolher outro exemplo"
          >
            ↺<span className="jd-restart-lbl"> Recomeçar</span>
          </button>
        )}
        <span className="jd-top-phase">demonstração · produto em construção</span>
        <span className="jd-top-phase jd-top-phase-s">em construção</span>
        <a className="jd-top-cta" href="#beta" data-track="demo-top-beta">
          <span className="jd-cta-full">{CTA.beta}</span>
          <span className="jd-cta-s">Quero isso</span>
        </a>
      </header>

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
                    <span className="jd-who">{it.who === 'ally' ? 'Ally' : 'VC'}</span>
                    <span className="jd-bubble">{it.text}</span>
                  </div>
                );
              if (it.kind === 'note') return <div key={i} className="jd-note">✓ {it.text}</div>;
              if (it.kind === 'build')
                return (
                  <div key={i} className="jd-card">
                    <div className="jd-kick">Montando seu rascunho — zero perguntas</div>
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
                    ? 'Escreva aqui — ex.: adiciona uma etapa no funil…'
                    : phText || 'Ou escreva com as suas palavras o problema do seu negócio…'
                }
                aria-label="Mensagem para a Ally"
              />
              {emulating && (
                <div className="jd-ghost" aria-hidden="true">
                  <span className="jd-ghost-t">{chatText}</span>
                  <span className="jd-caret" />
                </div>
              )}
            </div>
            <button className="jd-send" onClick={enviarChat} aria-label="Enviar mensagem">
              ➤
            </button>
          </div>
        </section>

        {/* ---- app vivo (superfície por cenário) ---- */}
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
                <b>{cen.appTitle}</b>
                {badge && <span className={'jd-badge ' + badge.cls}>{badge.t}</span>}
                <div className="jd-views" role="group" aria-label="Modo de visualização">
                  {cen.surface === 'kanban' ? (
                    <>
                      <button className={view === 'kanban' ? 'on' : ''} onClick={() => setView('kanban')}>▦ {cen.boardLabel}</button>
                      <button className={view === 'table' ? 'on' : ''} onClick={() => { setView('table'); markTouched(); }}>☰ Tabela</button>
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
                      placeholder="Buscar…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Buscar registro"
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
                    <div className="jd-tcount">{filtered.length} exibidos · {records.length + cen.extraN} no total</div>
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
                />
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

      {/* mobile: alterna entre conversa e app — um painel por vez, tela cheia */}
      <div className="jd-panebar" role="tablist" aria-label="Alternar entre conversa e app">
        <button
          role="tab"
          aria-selected={pane === 'chat'}
          className={pane === 'chat' ? 'on' : ''}
          onClick={() => {
            setPane('chat');
            track('jornada_pane', { pane: 'chat' });
          }}
        >
          💬 Conversa
          {pane === 'app' && cardPendente && <i className="jd-dot" aria-label="decisão pendente" />}
        </button>
        <button
          role="tab"
          aria-selected={pane === 'app'}
          className={pane === 'app' ? 'on' : ''}
          onClick={() => {
            setPane('app');
            track('jornada_pane', { pane: 'app' });
          }}
        >
          ▦ Seu app
          {pane === 'chat' && draft === 'draft' && !touched && (
            <i className="jd-dot" aria-label="novidade no app" />
          )}
        </button>
      </div>

      <p className="jd-honest">
        Demonstração interativa com dados de exemplo — ilustra a jornada de criação; o app real
        nasce dentro da plataforma, com os seus dados.
      </p>
    </div>
  );
}

function MoneyStat({
  label,
  value,
  accent,
  active,
  reduced,
  onClick,
}: {
  label: string;
  value: number;
  accent: 'blue' | 'red' | 'amber';
  active: boolean;
  reduced: boolean;
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
      <span className="jd-stat-v">{brl(disp)}</span>
      <span className="jd-stat-k">{label}</span>
    </button>
  );
}

function NewRecordForm({
  title,
  fields,
  onCreate,
  onCancel,
}: {
  title: string;
  fields: { label: string; def: string }[];
  onCreate: (vals: string[]) => void;
  onCancel: () => void;
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
        <span className="jd-mini">🛡️ Vira registro real no seu espaço — protegido e só seu.</span>
        <div className="jd-btns">
          <button className="jd-btn jd-pri" onClick={() => onCreate(vals)}>Criar</button>
          <button className="jd-btn" onClick={onCancel}>Cancelar</button>
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
.jd-grid { display:grid; grid-template-columns: minmax(320px,42%) 1fr; flex:1; min-height:0; }
.jd-panebar { display:none; }
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
