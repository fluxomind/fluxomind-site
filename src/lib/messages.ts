// Copy canônica compartilhada do site — fonte única (docs/message-house-cliente-final.md).
// Strings que aparecem em mais de uma página vivem aqui; não duplicar nas páginas.

export const SIGNATURE = 'Delegue a tarefa. Receba a conclusão com a prova.';

// Promessa ao cliente final (BCM-07, proposta de valor do lado empresa).
export const PROMISE =
  'Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas (não num projeto de meses).';

// Negação tripla (linguagem de cliente; sem "código morto").
export const NEGATION = {
  nots: [
    'Não é um chatbot que responde.',
    'Não é um builder que te entrega código para manter.',
    'Não é um projeto de TI de meses.',
  ],
  is: 'É um app operante: se constrói a partir do seu problema, opera o dia a dia — e escala para um humano quando o caso exige.',
} as const;

// As 6 perguntas do seu app — única redação permitida (sujeito = o seu app).
export type FaceKey =
  | 'dominio'
  | 'experiencia'
  | 'inteligencia'
  | 'processo'
  | 'conexoes'
  | 'confianca';

export const FACES: { key: FaceKey; label: string; q: string; gloss: string }[] = [
  { key: 'dominio', label: 'Domínio', q: 'O que o negócio guarda?', gloss: 'os dados e conceitos do seu negócio' },
  { key: 'experiencia', label: 'Experiência', q: 'O que as pessoas veem e fazem?', gloss: 'as telas e a interação' },
  { key: 'inteligencia', label: 'Inteligência', q: 'O que pensa e ajuda a decidir?', gloss: 'decisões e próximos passos' },
  { key: 'processo', label: 'Processo', q: 'O que acontece sozinho?', gloss: 'o dia a dia que roda sem você' },
  { key: 'conexoes', label: 'Conexões', q: 'Com o que conversa?', gloss: 'WhatsApp, e-mail, API, seus sistemas' },
  { key: 'confianca', label: 'Confiança', q: 'Quem acessa e o que pode?', gloss: 'permissões, isolamento e prova' },
];

// As 5 regras da confiança (deck de vendas BCM-07, slide 10).
export const TRUST_RULES = [
  { title: 'Enquadramento', desc: 'resolve o problema certo' },
  { title: 'Coerência', desc: 'a solução faz sentido, ponta a ponta' },
  { title: 'Correção + desfazer', desc: 'errar não machuca' },
  { title: 'Humano assume', desc: 'nos casos sensíveis, uma pessoa decide' },
  { title: 'Seus dados, só seus', desc: 'isolados de verdade' },
] as const;

// Honestidade de fase — três capítulos (fato + lacuna + aposta; nunca visão como fato).
export const PHASE = {
  exists: {
    title: 'Já existe',
    desc: 'A plataforma — 39 engines que materializam e operam apps de verdade, multi-tenant, governada.',
  },
  next: {
    title: 'Próximo capítulo',
    desc: 'O dogfood: a Fluxomind rodando o próprio comercial dentro do produto — a prova viva de que o agente opera e evolui.',
  },
  vision: {
    title: 'A visão',
    desc: 'Um catálogo de apps operantes criados por especialistas: quem domina um problema empacota o método; sua empresa instala e adota operado.',
  },
} as const;

// Rótulos canônicos de CTA (destinos em src/lib/platform.ts).
export const CTA = {
  demo: 'Veja a Fluxomind trabalhar',
  beta: 'Quero isso no meu negócio',
  contact: 'Falar com o time',
  login: 'Entrar',
} as const;
