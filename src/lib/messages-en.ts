// English canonical copy — mirror of messages.ts under docs/message-house-en.md
// (PROPOSTA — aguardando martelo). One term only for the category:
// "self-operating app". Do not invent copy outside the EN message house.

export const SIGNATURE_EN = 'Delegate the task. Get the conclusion — with the proof.';

export const PROMISE_EN =
  'An app that solves your problem and runs itself — integrated with what you already use, governed, live in weeks (not a months-long project).';

export const PURPOSE_LINE_EN =
  'For 30 years, companies adapted to their software. We exist to invert that: software that molds itself to your business — and works for it.';

export const NEGATION_EN = {
  nots: [
    'Not a chatbot that just replies.',
    'Not a builder that hands you code to maintain.',
    'Not a months-long IT project.',
  ],
  is: "It's a self-operating app: it builds itself from your problem, runs the day-to-day — and hands the sensitive calls to a human.",
} as const;

export const DEFINITION_EN =
  "A self-operating app is an app that builds itself from your business problem, runs the day-to-day of the process — and escalates to a human when the case demands it. It's the third category of software, between rigid systems that force the company to adapt and human consulting that doesn't scale: software that molds itself to the business and works for it.";

export const FACES_EN = [
  { label: 'Domain', q: 'What does the business keep?', gloss: 'your data and concepts' },
  { label: 'Experience', q: 'What do people see and do?', gloss: 'screens and interaction' },
  { label: 'Intelligence', q: 'What thinks and helps decide?', gloss: 'decisions and next steps' },
  { label: 'Process', q: 'What happens on its own?', gloss: 'the day-to-day that runs without you' },
  { label: 'Connections', q: 'What does it talk to?', gloss: 'WhatsApp, e-mail, API, your systems' },
  { label: 'Trust', q: 'Who can access what?', gloss: 'permissions, isolation and proof' },
] as const;

export const TRUST_RULES_EN = [
  { title: 'Framing', desc: 'solves the right problem' },
  { title: 'Coherence', desc: 'makes sense, end to end' },
  { title: 'Fix + undo', desc: "mistakes don't hurt" },
  { title: 'Human takes over', desc: 'a person decides the sensitive cases' },
  { title: 'Your data, yours only', desc: 'truly isolated' },
] as const;

export const PHASE_EN = {
  exists: 'Already real: the platform — 39 engines that materialize and operate real apps, multi-tenant, governed.',
  next: 'Next chapter: dogfooding — Fluxomind running its own sales operation inside the product, the living proof that the agent operates and evolves.',
  vision: 'The vision: a catalog of self-operating apps created by experts — someone who masters a problem packages the method; your company installs it and adopts it operated.',
} as const;

export const CTA_EN = {
  demo: 'Create an app by talking',
  demoNote: 'Live interactive demo (in Portuguese)',
  contact: 'Talk to the team',
} as const;
