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
   — e recebe um RASCUNHO VIVO que ele opera (kanban, tabela, ficha) ANTES
   de decidir "ficar com ele". Aprova o que vê, não uma lista técnica.

   São 3 cenários (leads · fluxo de caixa · atendimento). Todo o conteúdo
   variável vive no registro CENARIOS; a mecânica é a mesma para os três.
   O cenário ativo fica em cenarioRef (síncrona) para o replay determinístico
   — voltar re-executa O MESMO cenário.

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

type NBA = { text: string; kind?: 'advance' | 'handoff'; log?: string };

type Registro = {
  id: string;
  name: string;
  meta: Record<string, string>;
  stage: string;
  origem: string;
  agent?: boolean;
  log: LogE[];
  nba?: NBA;
};

type Seed = { id: string; name: string; meta: Record<string, string>; stage: string; nba?: NBA };

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

const INITIAL_ITEMS: Item[] = [
  {
    kind: 'msg',
    who: 'ally',
    text: 'Oi! 👋 Escolha um exemplo aqui embaixo — ou me conta um problema do seu negócio com as suas palavras, que eu leio como você trabalha hoje. Os dois caminhos valem.',
  },
];

// ======================= CENÁRIOS =======================

type CenarioId = 'leads' | 'caixa' | 'atendimento';

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
  pill: string;
  tema: string; // roteiro do texto livre
  // entrada
  xlsx: string; // "contas-a-receber.xlsx (2 abas · 22 linhas)"
  planilhaRead: string; // fala do assistente ao ler a planilha
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
  autoMove: { id: string; toStage: string; log: string };
  nbaDefault: (r: Registro) => NBA;
  // app
  appTitle: string;
  boardLabel: string;
  ctaObj: string;
  // render dos registros
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
  magic: string; // fala depois de montar
  touchHint: string; // pedido para mexer antes de decidir
  // HITL
  hitl: {
    text: string;
    button: string;
    note: string;
    lead: string; // primeira frase do assistente depois de aprovar
    resolveLabel: string;
    apply: { id: string; toStage: string; log: string };
  };
  // evoluir
  evolve: {
    userMsg: string;
    col: string;
    before: string;
    allyViaChat: string;
    doneLabel: string;
  };
};

const CENARIOS: Record<CenarioId, Cenario> = {
  // ---------------------------------------------------------------- LEADS
  leads: {
    id: 'leads',
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

  // ---------------------------------------------------------------- CAIXA
  caixa: {
    id: 'caixa',
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
        nba: { text: 'Lembrete amigável — a fatura vence amanhã.' },
      },
      { id: 'agro', name: 'AgroData', stage: 'Vencida', meta: { valor: 'R$ 8.900', venc: 'vencida há 12 dias', email: 'financeiro@agrodata.io', cnpj: '44.555.666/0001-72' } },
      { id: 'finops', name: 'FinOps Lab', stage: 'Em negociação', meta: { valor: 'R$ 21.000', venc: 'em negociação', email: 'contas@finopslab.com', cnpj: '77.888.999/0001-63' } },
      { id: 'eduplay', name: 'EduPlay', stage: 'A vencer', meta: { valor: 'R$ 5.600', venc: 'vence em 6 dias', email: 'financeiro@eduplay.com', cnpj: '22.333.444/0001-54' } },
      { id: 'healthhub', name: 'HealthHub', stage: 'Vencida', meta: { valor: 'R$ 3.100', venc: 'vencida há 3 dias', email: 'financeiro@healthhub.co', cnpj: '55.666.777/0001-45' } },
    ],
    autoMove: { id: 'healthhub', toStage: 'Em negociação', log: 'Assistente priorizou a cobrança — próximo passo sugerido' },
    nbaDefault: () => ({ text: 'Enviar o próximo toque da régua — acompanhar o vencimento.' }),
    appTitle: 'Contas a Receber',
    boardLabel: 'Recebíveis',
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
      { header: 'CNPJ', get: (r) => maskCNPJ(r.meta.cnpj), lock: true },
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
      'As faturas da planilha já estão na tela. Mexe à vontade: clique num cliente, crie uma fatura, mova um card.',
    touchHint: 'move uma fatura, abre uma ficha',
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
      allyViaChat:
        'É assim que se evolui — pedindo. Nesta demonstração eu aplico um exemplo pronto: a etapa Acordo antes de Paga. Olha o quadro:',
      doneLabel: 'etapa Acordo no quadro',
    },
  },

  // ---------------------------------------------------------------- ATENDIMENTO
  atendimento: {
    id: 'atendimento',
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
      'Montando sua tela de atendimento',
      'Ligando o assistente e as confirmações automáticas',
      'Conferindo tudo por dentro — cada peça bate com o desenho',
    ],
    columns: ['Novo', 'Em atendimento', 'Aguardando paciente', 'Resolvido'],
    extraN: 8,
    seed: [
      { id: 'marina', name: 'Marina Lopes', stage: 'Novo', meta: { pedido: 'quer remarcar para quinta', cpf: '123.456.789-01' } },
      { id: 'jose', name: 'José Neto', stage: 'Novo', meta: { pedido: 'primeira consulta, pediu horário', cpf: '234.567.890-12' } },
      {
        id: 'paula',
        name: 'Paula Reis',
        stage: 'Em atendimento',
        meta: { pedido: 'perguntou sobre resultado de exame', cpf: '345.678.901-23' },
        nba: {
          text: 'Assunto clínico detectado — não respondo isso: passo para a equipe agora.',
          kind: 'handoff',
          log: 'Encaminhado para humano — assunto clínico nunca fica com o assistente',
        },
      },
      { id: 'carlos', name: 'Carlos Dias', stage: 'Aguardando paciente', meta: { pedido: 'confirmar presença amanhã', cpf: '456.789.012-34' } },
      { id: 'rita', name: 'Rita Souza', stage: 'Novo', meta: { pedido: 'dúvida de convênio', cpf: '567.890.123-45' } },
    ],
    autoMove: { id: 'rita', toStage: 'Em atendimento', log: 'Assistente respondeu a dúvida de convênio — próximo passo sugerido' },
    nbaDefault: () => ({ text: 'Responder e agendar — o assistente resolve e confirma.' }),
    appTitle: 'Atendimento — WhatsApp',
    boardLabel: 'Conversas',
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
      { header: 'CPF', get: (r) => maskCPF(r.meta.cpf), lock: true },
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
      'As conversas da planilha já estão na tela. Mexe à vontade: clique num nome, abra uma conversa, mova um card.',
    touchHint: 'move uma conversa, abre uma ficha',
    hitl: {
      text: 'O **José pediu primeira consulta amanhã às 10h** — a agenda está livre. Confirmo o agendamento?',
      button: 'Confirmar agendamento',
      note: 'Você aprovou: consulta do José confirmada',
      lead: 'Consulta confirmada.',
      resolveLabel: 'Você confirmou o agendamento',
      apply: { id: 'jose', toStage: 'Aguardando paciente', log: 'Consulta confirmada e agendada — aprovada por você' },
    },
    evolve: {
      userMsg: 'Adiciona a coluna Confirmação antes de Resolvido.',
      col: 'Confirmação',
      before: 'Resolvido',
      allyViaChat:
        'É assim que se evolui — pedindo. Nesta demonstração eu aplico um exemplo pronto: a coluna Confirmação antes de Resolvido. Olha o quadro:',
      doneLabel: 'coluna Confirmação no quadro',
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
  const [draft, setDraft] = useState<'none' | 'building' | 'draft' | 'kept' | 'published'>('none');
  const [trust, setTrust] = useState<boolean[]>([false, false, false, false, false]);
  const [evolveState, setEvolveState] = useState<'none' | 'applied' | 'undone'>('none');
  const [newOpen, setNewOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  // mobile: um painel por vez (chat ⇄ app), padrão do protótipo DP087
  const [pane, setPane] = useState<'chat' | 'app'>('chat');
  const [touched, setTouched] = useState(false);

  const clockRef = useRef(31);
  const genRef = useRef(0);
  const reducedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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
  // Aplica o cenário escolhido (pill ou roteamento) — antes de começar.
  const aplicarCenario = (id: CenarioId) => {
    cenarioRef.current = id;
    setCenarioId(id);
    setStagesK(CENARIOS[id].columns);
  };

  async function startPlanilha(id?: CenarioId) {
    if (!beginOnce()) return;
    const cid = id ?? cenarioRef.current; // replay usa o cenário preservado
    if (id) aplicarCenario(id);
    const c = CENARIOS[cid];
    track('jornada_start', { entry: 'planilha', cenario: cid });
    push({ kind: 'msg', who: 'user', text: `📎 ${c.xlsx}` });
    await ally(c.planilhaRead, 900);
    push({ kind: 'card', card: 'espelho' });
  }

  async function startProsa(texto: string) {
    if (!beginOnce()) return;
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
    push({ kind: 'msg', who: 'user', text: ep.userMsg });
    await ally(ep.ally, 450);
  }

  async function confirmaEnquadrar() {
    if (!lock('enquadrar')) return;
    const c = CENARIOS[cenarioRef.current];
    resolveCard('enquadrar', premEditada ? c.ajusteLabel : 'Aceito como proposto');
    goStage(2);
    await ally('Desenhei seu app inteiro. Em português, não em jargão:', 650);
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
      ...s,
      origem: 'da sua planilha',
      agent: false,
      log: [{ who: 'user', text: `Importado da planilha ${arquivo}`, time: '14:31' }],
    }));
    setRecords(seeded);
    setDraft('draft');
    earn(4); // Seus dados, só seus
    goStage(4);
    // no mobile, mostra o app nascendo — o momento-mágico é visual
    if (isMobile()) setPane('app');
    await ally(`🎉 Seu app está de pé — em rascunho, só seu. ${c.magic} Depois me diz se é isso.`, 700);
    push({ kind: 'card', card: 'gate' });
  }

  // ---------------- E4: aprova o que vê ----------------
  async function ficarComEle() {
    if (!lock('ficar')) return;
    const c = CENARIOS[cenarioRef.current];
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
    await ally('Agora o assistente assume o dia a dia — e te pergunta antes do que importa. Olha ele trabalhando:', 700);
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
    push({ kind: 'card', card: 'hitl' });
  }

  async function ajustar() {
    if (!lock('ajustar')) return;
    const c = CENARIOS[cenarioRef.current];
    const alvo = c.columns[2]; // 3ª coluna do funil — reordenada para logo depois da 1ª
    push({ kind: 'msg', who: 'user', text: `Queria a coluna de ${alvo} logo depois de ${c.columns[0]}.` });
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
  async function aplicarEvolucao(viaChat?: string) {
    if (!lock('evo')) return;
    const c = CENARIOS[cenarioRef.current];
    push({ kind: 'msg', who: 'user', text: viaChat ?? c.evolve.userMsg });
    if (viaChat) await ally(c.evolve.allyViaChat, 550);
    await delay(450);
    setStagesK((p) => {
      if (p.includes(c.evolve.col)) return p;
      const i = p.indexOf(c.evolve.before);
      const cp = [...p];
      cp.splice(i, 0, c.evolve.col);
      return cp;
    });
    setEvolveState('applied');
    await ally('Aplicado ✓ — mudança simples não pede cerimônia. E tem Desfazer, porque errar não pode machucar.', 500);
    track('jornada_done');
    push({ kind: 'card', card: 'cta' });
  }

  function desfazer() {
    const c = CENARIOS[cenarioRef.current];
    setStagesK((p) => p.filter((s) => s !== c.evolve.col));
    setEvolveState('undone');
    earn(2); // Correção + desfazer
  }

  function ctaClick() {
    track('jornada_beta_click');
    document.getElementById('beta')?.scrollIntoView({ behavior: reducedRef.current ? 'auto' : 'smooth' });
  }

  // ---------------- chat livre: você escreve, a demo responde ----------------
  async function enviarChat() {
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
        moveRecord(CENARIOS[cenarioRef.current].seed[0].id);
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
    genRef.current += 1; // cancela loops de build em andamento
    lockRef.current.clear();
    startedRef.current = false;
    touchedRef.current = false;
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
    setDraft('none');
    setTrust([false, false, false, false, false]);
    setEvolveState('none');
    setNewOpen(false);
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
    setRecords((p) => [
      ...p,
      {
        id,
        name: base.name,
        meta: base.meta,
        stage: stagesK[0],
        origem: 'criado por você',
        agent: false,
        log: [{ who: 'user', text: 'Criado por você, direto na tela do rascunho', time: now() }],
      },
    ]);
    setNewOpen(false);
    markTouched();
  }
  function nbaAction(id: string) {
    const c = CENARIOS[cenarioRef.current];
    setRecords((p) =>
      p.map((r) => {
        if (r.id !== id) return r;
        const nba = r.nba ?? c.nbaDefault(r);
        if (nba.kind === 'handoff') {
          return { ...r, log: [...r.log, { who: 'agent', text: nba.log ?? 'Encaminhado para um humano', time: now() }] };
        }
        const i = stagesK.indexOf(r.stage);
        const next = i >= 0 && i < stagesK.length - 1 ? stagesK[i + 1] : r.stage;
        return {
          ...r, stage: next, agent: true,
          log: [...r.log, { who: 'agent', text: 'Próximo passo executado pelo assistente — com o seu OK', time: now() }],
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
            <div className="jd-kick jd-kick-amber">Decisão sua — o assistente espera</div>
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

  const badge =
    draft === 'draft' ? { cls: 'jd-b-draft', t: 'rascunho — só você vê' }
    : draft === 'kept' ? { cls: 'jd-b-kept', t: 'aprovado por você' }
    : draft === 'published' ? { cls: 'jd-b-pub', t: 'publicado para o time' }
    : null;

  const cardPendente = items.some(
    (i) => i.kind === 'card' && !i.resolved && i.card !== 'cta',
  );

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
          sua-empresa <i>/</i> Assistente — <b>Jornada de criação</b>
        </span>
        <div className="jd-top-nav" role="group" aria-label="Navegar pela jornada passo a passo">
          <button
            onClick={voltarPasso}
            aria-label="Voltar um passo"
            title="Voltar um passo"
            disabled={!started}
          >
            ◀
          </button>
          <span className="jd-top-nav-lbl">passo a passo</span>
          <button onClick={avancarPasso} aria-label="Avançar um passo" title="Avançar um passo">
            ▶
          </button>
        </div>
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
                <span className="jd-who">AI</span>
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
          <div className="jd-input">
            <input
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') enviarChat();
              }}
              placeholder={
                started
                  ? 'Escreva aqui — ex.: adiciona uma etapa no funil…'
                  : 'Ou escreva com as suas palavras o problema do seu negócio…'
              }
              aria-label="Mensagem para o assistente"
            />
            <button className="jd-send" onClick={enviarChat} aria-label="Enviar mensagem">
              ➤
            </button>
          </div>
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
                <b>{cen.appTitle}</b>
                {badge && <span className={'jd-badge ' + badge.cls}>{badge.t}</span>}
                <div className="jd-views" role="group" aria-label="Modo de visualização">
                  <button className={view === 'kanban' ? 'on' : ''} onClick={() => setView('kanban')}>▦ {cen.boardLabel}</button>
                  <button className={view === 'table' ? 'on' : ''} onClick={() => { setView('table'); markTouched(); }}>☰ Tabela</button>
                  {record && (
                    <button className={view === 'record' ? 'on' : ''} onClick={() => setView('record')}>👤 {record.name.split(' ')[0]}</button>
                  )}
                </div>
              </header>

              {view === 'kanban' && (
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
              )}

              {view === 'table' && (
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
                              {c.stage ? (
                                <span className="jd-stagepill">{l.stage}</span>
                              ) : (
                                <>{c.get?.(l)}{c.lock && ' 🔒'}</>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="jd-tcount">{filtered.length} exibidos · {records.length + cen.extraN} no total</div>
                </div>
              )}

              {view === 'record' && record && (() => {
                const nba = record.nba ?? cen.nbaDefault(record);
                const handoff = nba.kind === 'handoff';
                return (
                  <div className="jd-record">
                    <div className="jd-rec-head">
                      <b>{record.name}</b>
                      <span className="jd-stagepill">{record.stage}</span>
                    </div>
                    <div className="jd-rec-grid">
                      <dl className="jd-fields">
                        {cen.recordFields(record).map((f) => (
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
                      <div className={'jd-nba' + (handoff ? ' jd-nba-hand' : '')}>
                        <span className="jd-nba-k">{handoff ? '🙋 Humano assume' : '🤖 Próximo passo sugerido'}</span>
                        <span>{nba.text}</span>
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
                );
              })()}

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
  --jd-blue:#4DABF7; --jd-green:#34D399; --jd-amber:#FBBF24; --jd-red:#F87171;
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
.jd-top-nav button { border:none; background:none; color:var(--jd-tx); font-size:12px; width:26px; height:24px; border-radius:99px; cursor:pointer; }
.jd-top-nav button:hover:not(:disabled) { background:rgba(255,255,255,.08); }
.jd-top-nav button:disabled { color:var(--jd-mut); opacity:.4; cursor:default; }
.jd-top-nav-lbl { font-size:10.5px; color:var(--jd-mut); letter-spacing:.04em; padding:0 2px; }
@media (max-width:560px){ .jd-top-nav-lbl{ display:none; } }
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
.jd-nba-hand { border-color:rgba(251,191,36,.45); background:rgba(251,191,36,.07); }
.jd-nba-hand .jd-nba-k { color:var(--jd-amber); }
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
.jd-input { display:flex; gap:8px; padding:10px 14px; border-top:1px solid var(--jd-line); }
.jd-input input { flex:1; min-width:0; background:rgba(255,255,255,.05); border:1px solid var(--jd-line); border-radius:10px; padding:9px 13px; color:var(--jd-tx); font:inherit; font-size:13.5px; }
.jd-input input::placeholder { color:var(--jd-mut); }
.jd-input input:focus { outline:none; border-color:var(--jd-blue); box-shadow:0 0 0 3px rgba(77,171,247,.18); }
.jd-send { border:none; background:var(--jd-blue); color:#fff; width:38px; border-radius:10px; cursor:pointer; font-size:13px; }
.jd-send:hover { filter:brightness(1.1); }
.jd :focus-visible { outline:2px solid var(--jd-blue); outline-offset:2px; border-radius:6px; }
@media (prefers-reduced-motion: reduce){ .jd *{animation:none!important;transition:none!important} }
`;
