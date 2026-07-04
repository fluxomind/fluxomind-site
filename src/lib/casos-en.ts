// English use cases — mirror of casos.ts under docs/message-house-en.md
// (ADR-0006: árvores paralelas). Slugs localizados para a busca EN.
// ucIds/cenario idênticos ao pt (mesma fonte upstream: catálogo de UCs).

export type CasoDeUsoEn = {
  slug: string;
  ptSlug: string; // par pt para hreflang e retorno de idioma
  ucIds: string[];
  cenario: 'leads' | 'caixa' | 'atendimento';
  area: string;
  dorHook: string;
  pedido: string;
  emoji: string;
  titleSeO: string;
  descriptionSeO: string;
  h1: string;
  definicao: string;
  hoje: { titulo: string; itens: string[] };
  comApp: { titulo: string; itens: { face: string; texto: string }[] };
  humano: string;
  faq: { q: string; a: string }[];
  atualizado: string;
};

export const CASOS_EN: CasoDeUsoEn[] = [
  {
    slug: 'collections-and-accounts-receivable',
    ptSlug: 'cobranca-e-contas-a-receber',
    ucIds: ['UC-007', 'UC-022', 'UC-023'],
    cenario: 'caixa',
    area: 'Finance · collections',
    dorHook: 'The due date passes and nobody notices in time.',
    pedido: `I run a B2B services company with about 60 active customers. Invoices live in a spreadsheet (columns: customer, tax ID, amount, due date, status) and collection is by hand: when I remember, I send WhatsApp messages one by one. A customer falls behind and nobody notices in time; renegotiations have no history.

I want to stop losing money to forgetfulness. I need my invoice and customer spreadsheet to come in as-is (no retyping) and the system to track due dates on its own. When a due date approaches or passes, I want it to compose the right message in the right tone for the stage (friendly reminder before → collection when late → renegotiation proposal if it drags) and show me the preview before sending — nothing goes out without my OK.

Delicate cases — high amounts, strategic customers, discount or renegotiation requests — I don't want the system to resolve: I want it to prepare the case with the history ready and hand it to me to decide. And since it's money and my customer's tax ID, I want sensitive data protected and every action recorded, in a way I can undo if I make a mistake.`,
    emoji: '💰',
    titleSeO: 'Automate collections and accounts receivable — a self-operating finance app',
    descriptionSeO:
      'How to automate your collections cadence without an IT project: a self-operating app tracks due dates, composes the message in the right tone, shows the preview and sends only with your OK — with proof of every action.',
    h1: 'How do you automate collections without losing control of what is sent?',
    definicao:
      'A self-operating collections app is an app that builds itself from your invoices and customers — the spreadsheet imports as-is, with tax IDs protected — and starts running the collections cadence: it tracks due dates, composes the message in the right tone, shows the preview and sends only with your OK.',
    hoje: {
      titulo: 'Today: collecting depends on remembering — and on courage',
      itens: [
        'Invoices live in a spreadsheet; the due date passes and nobody notices in time.',
        'Collecting means composing the right message, in the right tone, customer by customer.',
        'The cadence (reminder, collection, renegotiation) exists — in theory. In practice, it is manual.',
        'Without an organized history, every collection starts from scratch.',
      ],
    },
    comApp: {
      titulo: 'With a self-operating app: the cadence runs — and nothing goes out without you',
      itens: [
        { face: 'Domain', texto: 'Invoices and customers come in from your spreadsheet; sensitive data like tax IDs is detected and protected from day one.' },
        { face: 'Process', texto: 'Due dates are tracked on their own: a delay generates the collection proposal at the right stage of the cadence.' },
        { face: 'Experience', texto: 'You see the preview of every message first — firm or cordial tone, you choose — and approve on screen.' },
        { face: 'Trust', texto: 'Sending only with your OK, and every action is recorded with the proof. Mistakes don’t hurt: you can fix and undo.' },
      ],
    },
    humano:
      'Delicate customer, discount, renegotiation, high amount: the app doesn’t decide — it prepares the case with the full history and hands it to a person on your team.',
    faq: [
      {
        q: 'Does the app collect from my customers on its own?',
        a: 'Not without you. The day-to-day — tracking due dates, composing the message at the right stage — runs on its own; sending happens with your OK, with a preview on screen. Sensitive cases escalate to a person.',
      },
      {
        q: 'Will it embarrass my customer or collect from the wrong person?',
        a: 'No. You approve every message before it goes out and choose the tone; delicate cases — high amounts, strategic customers — come to you to decide, with the history ready.',
      },
      {
        q: 'Does it reconcile payments? Does it work with my ERP?',
        a: 'The app is born from your invoice spreadsheet and collects via WhatsApp and e-mail, coexisting with what you already use. In this version, payment reconciliation is yours; automatic reconciliation with your bank or ERP is on the roadmap.',
      },
      {
        q: 'What about my customers’ data?',
        a: 'Your data, yours only: each company is truly isolated, sensitive data is protected and every action sits in a tamper-evident trail.',
      },
      {
        q: 'How long until the cadence really runs?',
        a: 'Weeks, not a months-long project. In the beta, the team works with you from design to the first collection you approve.',
      },
    ],
    atualizado: 'July 2026',
  },
  {
    slug: 'lead-management',
    ptSlug: 'gestao-de-leads',
    ucIds: ['UC-001', 'UC-002', 'UC-003'],
    cenario: 'leads',
    area: 'Sales · leads and contracts',
    dorHook: 'My sales funnel lives in a spreadsheet and in my head — and stalled deals go cold with nobody noticing.',
    pedido: `I run sales and need to organize how I win new customers. Today it is all manual: prospects arrive by referral, e-mail and social, I jot them in a spreadsheet (name, company, source, status, last conversation, next step) with about 50 rows, and I lose track.

I want a system that manages my funnel end to end: every prospect becomes a living record, the funnel has clear stages (new → qualified → in conversation → proposal → closed) and I see on a board where each one is, with the history of every conversation kept.

What kills me is the follow-through: I want the system to chase follow-ups on its own for whoever went quiet, warn me when a proposal has been stalled too long, and when I ask "which deals have stalled?" answer with the list and the suggested next step for each. Every message that goes out in my name I want to see and approve first — nothing fires on its own. Decision cases (out-of-policy discounts, strategic customers) should come to me with the history ready.`,
    emoji: '📊',
    titleSeO: 'Lead management without spreadsheets — a self-operating sales funnel app',
    descriptionSeO:
      'How to get leads and contracts out of the spreadsheet: a self-operating app records every lead, moves the funnel, chases follow-ups and warns when a proposal stalls — and hands you the cases that require a decision.',
    h1: 'How do you stop managing leads and contracts in a spreadsheet?',
    definicao:
      'A self-operating lead management app is an app that builds itself from your sales funnel — your spreadsheet imports as-is, no retyping — and starts running the day-to-day: it records the lead that arrives, moves the stages, chases the follow-up and warns when a proposal stalls.',
    hoje: {
      titulo: 'Today: the funnel lives in a spreadsheet — and in your head',
      itens: [
        'Leads arrive via WhatsApp, e-mail and referrals — and not all get recorded.',
        'The spreadsheet is stale by the next day; nobody fully trusts it.',
        'Follow-up depends on someone remembering. Stalled proposals go unnoticed.',
        'At month’s end, putting together the funnel snapshot is hours of manual work.',
      ],
    },
    comApp: {
      titulo: 'With a self-operating app: the funnel runs — and you decide',
      itens: [
        { face: 'Domain', texto: 'Your lead and contract spreadsheet really comes in: columns become fields, every row becomes a living record.' },
        { face: 'Process', texto: 'Follow-ups are scheduled and chased on their own; a stalled proposal raises a warning before it goes cold.' },
        { face: 'Intelligence', texto: 'Ask "which deals have stalled?" and get the answer with proposed next steps.' },
        { face: 'Trust', texto: 'Every conclusion arrives with proof of what was done — nothing critical goes out without your OK.' },
      ],
    },
    humano:
      'Out-of-policy discount, sensitive negotiation, strategic customer: the app prepares the context and hands it to a person on your team — the AI proposes, whoever is in charge decides.',
    faq: [
      {
        q: 'Do I need to replace my CRM or my spreadsheet?',
        a: 'No. The app is born from your spreadsheet (it really comes in, no retyping) and coexists with what you already use — the operation integrates via e-mail, WhatsApp and API.',
      },
      {
        q: 'Do I need to know how to code?',
        a: 'No. You describe the problem in plain language; the app builds itself and, to change it, you just talk.',
      },
      {
        q: 'Does the app touch the funnel on its own?',
        a: 'The day-to-day — recording, moving stages, chasing follow-ups — runs on its own. Sensitive actions go through you: the app proposes, shows the preview and executes only with your OK.',
      },
      {
        q: 'What if I want to change my funnel stages later?',
        a: 'You adjust by talking to the app — stages, alerts and fields change without depending on IT and without losing what is already recorded.',
      },
      {
        q: 'How long until this runs in my company?',
        a: 'Weeks, not a months-long project. In the beta, the Fluxomind team works with you from design to the first real conclusion.',
      },
    ],
    atualizado: 'July 2026',
  },
  {
    slug: 'whatsapp-support',
    ptSlug: 'atendimento-whatsapp',
    ucIds: ['UC-006', 'UC-027'],
    cenario: 'atendimento',
    area: 'Support · WhatsApp',
    dorHook: 'My customers ask for everything on WhatsApp — booking, rescheduling, confirming — and one person answers it all day long.',
    pedido: `My customers reach me on WhatsApp all the time for day-to-day things: booking a slot, rescheduling, confirming they will show up, or asking about the status of their order. Today a person on my team answers all of it by hand, which eats up the day and still leaves people without a reply outside business hours.

I want WhatsApp support to resolve these requests on its own, in the conversation, without the customer installing an app or creating a login. When someone writes "I'd like to book for Thursday", it should understand, check availability, offer slots and confirm — and the same for rescheduling and cancelling. Before appointments, I want it to send the appointment confirmation on its own and update the calendar according to the reply.

On my side (internal), I want the calendar and records organized — each customer with their history, personal data protected, and a record of what was done in each conversation. When a customer complains, has an urgent issue or asks for something out of the ordinary, support doesn't improvise: it hands the conversation to a person on my team with the full history, so the customer never has to repeat themselves.`,
    emoji: '📅',
    titleSeO: 'WhatsApp support that resolves — books, reschedules and confirms',
    descriptionSeO:
      'How to handle WhatsApp support without a person answering all day: a self-operating app understands the request and resolves it — books, reschedules, confirms attendance — and hands the conversation to your team in sensitive cases.',
    h1: 'How do you handle WhatsApp without someone answering messages all day?',
    definicao:
      'A self-operating support app is an app that answers on your WhatsApp and resolves the request — books, reschedules, confirms attendance, updates the record — instead of just replying. Not a chatbot that just replies: it is the support process running, with a person taking over when a case calls for it.',
    hoje: {
      titulo: 'Today: the calendar lives buried in messages',
      itens: [
        'One person answers everything — booking, rescheduling, confirmation — all day long.',
        'Outside business hours, customers get no reply; by morning, the queue has piled up.',
        'Reschedules get lost between conversations; nothing prevents no-shows.',
        'The customer’s history is scattered across WhatsApp threads.',
      ],
    },
    comApp: {
      titulo: 'With a self-operating app: the conversation becomes a resolved calendar',
      itens: [
        { face: 'Connections', texto: 'The app answers on the WhatsApp you already use — the customer changes nothing on their side.' },
        { face: 'Process', texto: 'Booking, rescheduling and confirming attendance happen on their own, in the conversation, with the calendar always up to date.' },
        { face: 'Domain', texto: 'Records and calendar come in from your spreadsheet; personal data is detected and protected.' },
        { face: 'Trust', texto: 'Every interaction is recorded — who asked, what was done, when. Every conclusion comes with proof.' },
      ],
    },
    humano:
      'Complaint, urgent issue, delicate case: the app notices and hands the conversation to a person on your team — with the full context on screen, without the customer repeating the story.',
    faq: [
      {
        q: 'Is this a chatbot?',
        a: 'Not a chatbot that just replies. It is a self-operating app: it understands the request and resolves it — books, reschedules, confirms — and hands off to a person when the case demands. The conversation is the means; the resolved process is the end.',
      },
      {
        q: 'Does my customer need to install an app or create a login?',
        a: 'No. They resolve everything in the same WhatsApp conversation as always — booking, rescheduling, confirming — without installing anything.',
      },
      {
        q: 'Does it work with the WhatsApp Business I already use?',
        a: 'Yes — the app connects to your channel and the customer keeps talking to the number they already know.',
      },
      {
        q: 'What if the customer asks for something out of the ordinary?',
        a: 'The app doesn’t improvise: cases outside the process escalate to your team, with the full conversation history. In sensitive cases, a person decides.',
      },
      {
        q: 'Is my customers’ data safe?',
        a: 'Your data, yours only: real isolation per company, sensitive data protected and an audit trail of every action.',
      },
    ],
    atualizado: 'July 2026',
  },
];

export function getCasoEn(slug: string): CasoDeUsoEn | undefined {
  return CASOS_EN.find((c) => c.slug === slug);
}

// Mapa pt→en para o hreflang das páginas pt de caso.
export const CASO_EN_SLUG_BY_PT: Record<string, string> = Object.fromEntries(
  CASOS_EN.map((c) => [c.ptSlug, c.slug]),
);
