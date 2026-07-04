// Casos de uso — fonte única das páginas /casos-de-uso e /casos-de-uso/[slug].
// Copy sob a lei do docs/message-house-cliente-final.md (léxico §7; honestidade
// de fase §5). Formato GEO: h1 como pergunta na dor, primeira frase
// definicional, FAQ real por caso (vira FAQPage JSON-LD na página).
// Regra de crescimento: um caso novo só entra aqui quando a demo ganhar o
// cenário correspondente (cada caso linka /demo?cenario=<cenario>).
// Ordem do array = ordem de exibição no hub. Cobrança primeiro: o hero
// comercial é Recuperar Receita (matrix.md do catálogo de UCs, anexo —
// decisão do founder, 2026-07-04).

export type CasoDeUso = {
  slug: string;
  cenario: 'leads' | 'caixa' | 'atendimento';
  area: string; // rótulo curto (cards e pill do hero)
  emoji: string;
  titleSeO: string;
  descriptionSeO: string;
  h1: string; // pergunta na dor (GEO: heading como pergunta)
  definicao: string; // primeira frase da página — definicional (GEO)
  hoje: { titulo: string; itens: string[] };
  comApp: { titulo: string; itens: { face: string; texto: string }[] };
  humano: string; // onde uma pessoa decide (regra da confiança nº 4)
  faq: { q: string; a: string }[];
  atualizado: string; // rótulo visível de frescor, ex.: "julho de 2026"
};

export const CASOS: CasoDeUso[] = [
  {
    slug: 'cobranca-e-contas-a-receber',
    cenario: 'caixa',
    area: 'Financeiro · cobrança',
    emoji: '💰',
    titleSeO: 'Automatizar cobrança e contas a receber — app operante financeiro',
    descriptionSeO:
      'Como automatizar a régua de cobrança sem projeto de TI: um app operante acompanha vencimentos, compõe a cobrança no tom certo, mostra o preview e dispara só com o seu OK — com a prova de cada ação.',
    h1: 'Como automatizar a cobrança sem perder o controle do que é enviado?',
    definicao:
      'Um app operante de cobrança é um app que se constrói a partir das suas faturas e clientes — a planilha entra de verdade, com CNPJ protegido — e passa a operar a régua de cobrança: acompanha vencimentos, compõe a mensagem no tom certo, mostra o preview e dispara só com o seu OK.',
    hoje: {
      titulo: 'Hoje: cobrar depende de lembrar — e de coragem',
      itens: [
        'As faturas vivem numa planilha; o vencimento passa e ninguém percebe na hora.',
        'Cobrar exige compor a mensagem certa, no tom certo, cliente a cliente.',
        'A régua (lembrete, cobrança, renegociação) existe — na teoria. Na prática, é manual.',
        'Sem histórico organizado, cada cobrança recomeça do zero.',
      ],
    },
    comApp: {
      titulo: 'Com um app operante: a régua roda — e nada dispara sem você',
      itens: [
        { face: 'Domínio', texto: 'Faturas e clientes entram da sua planilha; dados sensíveis como CNPJ são detectados e protegidos desde o primeiro dia.' },
        { face: 'Processo', texto: 'Vencimentos são acompanhados sozinhos: o atraso gera a proposta de cobrança no estágio certo da régua.' },
        { face: 'Experiência', texto: 'Você vê o preview de cada mensagem antes — tom firme ou cordial, você escolhe — e aprova na tela.' },
        { face: 'Confiança', texto: 'Disparo só com o seu OK, e cada ação fica registrada com a prova. Errar não machuca: dá para corrigir e desfazer.' },
      ],
    },
    humano:
      'Cliente delicado, desconto, renegociação, valor alto: o app não decide — prepara o caso com o histórico completo e escala para uma pessoa do seu time.',
    faq: [
      {
        q: 'O app cobra meus clientes sozinho?',
        a: 'Não sem você. O dia a dia — acompanhar vencimentos, montar a mensagem no estágio certo — roda sozinho; o disparo acontece com o seu OK, com preview na tela. Casos sensíveis escalam para uma pessoa.',
      },
      {
        q: 'Funciona com o meu ERP ou sistema financeiro?',
        a: 'O app opera ao redor do que você já tem, integrando por API, e-mail e WhatsApp — seu ERP fica exatamente onde está.',
      },
      {
        q: 'E os dados dos meus clientes?',
        a: 'Seus dados, só seus: cada empresa fica isolada de verdade, dados sensíveis são protegidos e toda ação fica numa trilha à prova de adulteração.',
      },
      {
        q: 'Quanto tempo até a régua rodar de verdade?',
        a: 'Em semanas, não num projeto de meses. No beta, o time acompanha do desenho à primeira cobrança aprovada por você.',
      },
    ],
    atualizado: 'julho de 2026',
  },
  {
    slug: 'gestao-de-leads',
    cenario: 'leads',
    area: 'Vendas · leads e contratos',
    emoji: '📊',
    titleSeO: 'Gestão de leads sem planilha — app operante de funil de vendas',
    descriptionSeO:
      'Como tirar leads e contratos da planilha: um app operante registra cada lead, move o funil, cobra follow-up e avisa quando a proposta para — e escala para você nos casos que exigem decisão.',
    h1: 'Como parar de gerenciar leads e contratos na planilha?',
    definicao:
      'Um app operante de gestão de leads é um app que se constrói a partir do seu funil de vendas — a sua planilha entra de verdade, sem redigitar — e passa a operar o dia a dia: registra o lead que chega, move as etapas, cobra o follow-up e avisa quando uma proposta para.',
    hoje: {
      titulo: 'Hoje: o funil vive na planilha — e na sua cabeça',
      itens: [
        'Leads chegam por WhatsApp, e-mail e indicação — e nem todos são registrados.',
        'A planilha desatualiza no dia seguinte; ninguém confia 100% nela.',
        'Follow-up depende de alguém lembrar. Proposta parada ninguém percebe.',
        'No fim do mês, montar o retrato do funil é trabalho manual de horas.',
      ],
    },
    comApp: {
      titulo: 'Com um app operante: o funil roda — e você decide',
      itens: [
        { face: 'Domínio', texto: 'Sua planilha de leads e contratos entra de verdade: colunas viram campos, cada linha vira um registro vivo.' },
        { face: 'Processo', texto: 'O follow-up é agendado e cobrado sozinho; proposta parada gera aviso antes de esfriar.' },
        { face: 'Inteligência', texto: 'Pergunte "quais oportunidades pararam?" e receba a resposta com os próximos passos propostos.' },
        { face: 'Confiança', texto: 'Cada conclusão chega com a prova do que foi feito — nada crítico sai sem o seu OK.' },
      ],
    },
    humano:
      'Desconto fora da alçada, negociação sensível, cliente estratégico: o app prepara o contexto e escala para uma pessoa do seu time — a IA propõe, quem manda decide.',
    faq: [
      {
        q: 'Preciso trocar meu CRM ou minha planilha?',
        a: 'Não. O app nasce da sua planilha (ela entra de verdade, sem redigitar) e convive com o que você já usa — a operação integra por e-mail, WhatsApp e API.',
      },
      {
        q: 'Preciso saber programar?',
        a: 'Não. Você descreve o problema em português; o app se constrói e, para mudar, você conversa.',
      },
      {
        q: 'O app mexe no funil sozinho?',
        a: 'O dia a dia — registrar, mover etapa, cobrar follow-up — roda sozinho. Ações sensíveis passam por você: o app propõe, mostra o preview e executa só com o seu OK.',
      },
      {
        q: 'Em quanto tempo isso roda na minha empresa?',
        a: 'Em semanas, não num projeto de meses. No beta, o time da Fluxomind acompanha do desenho à primeira conclusão real.',
      },
    ],
    atualizado: 'julho de 2026',
  },
  {
    slug: 'atendimento-whatsapp',
    cenario: 'atendimento',
    area: 'Atendimento · WhatsApp',
    emoji: '📅',
    titleSeO: 'Atendimento no WhatsApp que resolve — agenda, remarca e confirma',
    descriptionSeO:
      'Como atender no WhatsApp sem uma pessoa respondendo o dia inteiro: um app operante entende o pedido e resolve — agenda, remarca, confirma presença — e escala a conversa para o seu time nos casos sensíveis.',
    h1: 'Como atender no WhatsApp sem alguém respondendo mensagens o dia inteiro?',
    definicao:
      'Um app operante de atendimento é um app que atende no seu WhatsApp e resolve o pedido — agenda, remarca, confirma presença, atualiza o cadastro — em vez de só responder. Não é um chatbot que responde: é o processo de atendimento rodando, com uma pessoa assumindo quando o caso exige.',
    hoje: {
      titulo: 'Hoje: a agenda vive lotada de mensagens',
      itens: [
        'Uma pessoa responde tudo — agendamento, remarcação, confirmação — o dia inteiro.',
        'Fora do horário, o cliente fica sem resposta; de manhã, a fila acumulou.',
        'Remarcações se perdem entre conversas; o não-comparecimento ninguém previne.',
        'O histórico do cliente está espalhado em threads de WhatsApp.',
      ],
    },
    comApp: {
      titulo: 'Com um app operante: a conversa vira agenda resolvida',
      itens: [
        { face: 'Conexões', texto: 'O app atende no WhatsApp que você já usa — o cliente não muda nada do lado dele.' },
        { face: 'Processo', texto: 'Agendar, remarcar e confirmar presença acontecem sozinhos, na conversa, com a agenda sempre atualizada.' },
        { face: 'Domínio', texto: 'Cadastros e agenda entram da sua planilha; dados pessoais como CPF são detectados e protegidos.' },
        { face: 'Confiança', texto: 'Cada atendimento fica registrado — quem pediu, o que foi feito, quando. Conclusão com a prova.' },
      ],
    },
    humano:
      'Reclamação, urgência, caso delicado: o app percebe e passa a conversa para uma pessoa do seu time — com todo o contexto na tela, sem o cliente repetir a história.',
    faq: [
      {
        q: 'Isso é um chatbot?',
        a: 'Não é um chatbot que responde. É um app operante: entende o pedido e resolve — agenda, remarca, confirma — e escala para uma pessoa quando o caso exige. A conversa é o meio; o processo resolvido é o fim.',
      },
      {
        q: 'Funciona com o WhatsApp Business que já uso?',
        a: 'Sim — o app se conecta ao seu canal e o cliente continua conversando no número que já conhece.',
      },
      {
        q: 'E se o cliente pedir algo fora do comum?',
        a: 'O app não inventa: casos fora do processo escalam para o seu time, com o histórico completo da conversa. Nos casos sensíveis, uma pessoa decide.',
      },
      {
        q: 'Os dados dos meus clientes ficam seguros?',
        a: 'Seus dados, só seus: isolamento real por empresa, dados sensíveis protegidos e trilha de auditoria de cada ação.',
      },
    ],
    atualizado: 'julho de 2026',
  },
];

export function getCaso(slug: string): CasoDeUso | undefined {
  return CASOS.find((c) => c.slug === slug);
}
