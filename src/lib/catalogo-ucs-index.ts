// GERADO por scripts/gera-catalogo-ucs.py — NÃO editar à mão.
// Fonte upstream: catálogo de UCs da plataforma (docs/fontes-upstream.md).
export type UcIndex = {
  id: string; fam: 'A'|'B'|'C'|'D'|'E'|'F'|'G'; titulo: string;
  seg: string[]; caps: string[]; dorHook: string;
};

export const UC_INDEX: UcIndex[] = [
 {
  "id": "UC-001",
  "fam": "A",
  "titulo": "CRM / pipeline comercial (lead → ICP → proposta → contrato → onboarding)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "hitl",
   "comm-email"
  ],
  "dorHook": "Meu funil de vendas vive numa planilha e na minha cabeça — e proposta parada esfria sem ninguém perceber."
 },
 {
  "id": "UC-002",
  "fam": "A",
  "titulo": "Agente SDR — qualificação de leads, outreach, escalação humana",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "comm-whatsapp",
   "hitl"
  ],
  "dorHook": "Chega lead demais e eu não dou conta de responder na hora — os bons esfriam esperando."
 },
 {
  "id": "UC-003",
  "fam": "A",
  "titulo": "Gestão de contratos (CLM leve: alçadas, vencimentos, renovação)",
  "seg": [
   "pme"
  ],
  "caps": [
   "hitl",
   "workflow-duravel",
   "audit-trail"
  ],
  "dorHook": "Depois que fecho, o contrato vira uma pasta perdida no Drive — e a renovação sempre me pega de surpresa."
 },
 {
  "id": "UC-004",
  "fam": "A",
  "titulo": "Onboarding de clientes (checklist + régua de comunicação)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "comm-email"
  ],
  "dorHook": "Fechei a venda e agora um passo do onboarding sempre escapa — o cliente novo fica sem notícia e desconfia."
 },
 {
  "id": "UC-005",
  "fam": "A",
  "titulo": "Customer Success (health-score, playbook de retenção, alerta churn)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "bi-conversacional"
  ],
  "dorHook": "Só descubro que um cliente está insatisfeito quando ele já pediu pra cancelar."
 },
 {
  "id": "UC-006",
  "fam": "A",
  "titulo": "Helpdesk / atendimento com agente + escalação + SLA",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "comm-whatsapp",
   "hitl"
  ],
  "dorHook": "O atendimento no WhatsApp engole meu time, e fora do horário o cliente fica no vácuo."
 },
 {
  "id": "UC-007",
  "fam": "A",
  "titulo": "Régua de cobrança / contas a receber multicanal",
  "seg": [
   "pme",
   "agenda"
  ],
  "caps": [
   "workflow-duravel",
   "comm-whatsapp"
  ],
  "dorHook": "O vencimento passa e ninguém percebe na hora."
 },
 {
  "id": "UC-008",
  "fam": "A",
  "titulo": "Compras / procurement (requisição → alçada → pedido → recebimento)",
  "seg": [
   "pme"
  ],
  "caps": [
   "hitl",
   "workflow-duravel"
  ],
  "dorHook": "Compra aqui é telefone-sem-fio: pago a mais e não sei dizer quem aprovou o quê."
 },
 {
  "id": "UC-009",
  "fam": "A",
  "titulo": "Despesas e reembolsos (evidência + alçada + trilha)",
  "seg": [
   "pme"
  ],
  "caps": [
   "hitl",
   "audit-trail"
  ],
  "dorHook": "Reembolso aqui é foto de nota no WhatsApp e boa-fé — se cair auditoria, não provo nada."
 },
 {
  "id": "UC-010",
  "fam": "A",
  "titulo": "Gestão de projetos/entregas com visão do cliente",
  "seg": [
   "pme"
  ],
  "caps": [
   "face-web",
   "workflow-duravel"
  ],
  "dorHook": "Gasto horas por semana montando status porque o cliente não tem como ver sozinho onde o projeto dele está."
 },
 {
  "id": "UC-011",
  "fam": "A",
  "titulo": "Recrutamento (triagem por agente + pipeline de entrevistas)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "comm-email"
  ],
  "dorHook": "Abro uma vaga e me afogo em currículo — e acabo sem dar retorno pra quase ninguém."
 },
 {
  "id": "UC-012",
  "fam": "A",
  "titulo": "Onboarding/offboarding de funcionário (RH/TI/gestor)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel"
  ],
  "dorHook": "Na entrada sempre falta algo, e na saída o acesso do ex-funcionário fica semanas no ar."
 },
 {
  "id": "UC-013",
  "fam": "A",
  "titulo": "Ordens de serviço / field service (despacho → evidência → fechamento)",
  "seg": [
   "pme"
  ],
  "caps": [
   "comm-whatsapp",
   "face-web"
  ],
  "dorHook": "Meus técnicos estão na rua e a informação some — o cliente liga 'quando chega?' e ninguém sabe."
 },
 {
  "id": "UC-014",
  "fam": "A",
  "titulo": "Estoque/inventário leve (ponto de pedido, alertas)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador"
  ],
  "dorHook": "Meu estoque vive numa planilha que nunca bate — o item acaba e eu só descubro na hora de usar."
 },
 {
  "id": "UC-015",
  "fam": "A",
  "titulo": "Cadastro-mestre e qualidade de dados (dedup + enriquecimento + aprovação)",
  "seg": [
   "pme"
  ],
  "caps": [
   "hitl",
   "agente-operador"
  ],
  "dorHook": "Meu cadastro é um lixão: o mesmo cliente aparece três vezes e eu mando a mesma coisa duas vezes."
 },
 {
  "id": "UC-016",
  "fam": "A",
  "titulo": "BI conversacional (perguntas NL + relatórios/artefatos)",
  "seg": [
   "pme"
  ],
  "caps": [
   "bi-conversacional"
  ],
  "dorHook": "Para saber um número simples do meu negócio eu dependo de alguém montar planilha — e quando chega, já mudou."
 },
 {
  "id": "UC-017",
  "fam": "A",
  "titulo": "Gestão de fornecedores (homologação, docs, avaliação recorrente)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "hitl"
  ],
  "dorHook": "As certidões dos meus fornecedores vencem sem ninguém ver, e às vezes fecho com quem está com pendência."
 },
 {
  "id": "UC-018",
  "fam": "A",
  "titulo": "Compliance interno (políticas, aceites, não-conformidades)",
  "seg": [
   "pme"
  ],
  "caps": [
   "audit-trail",
   "hitl"
  ],
  "dorHook": "Minhas políticas internas viram um PDF que ninguém assina — e não tenho como provar quem aceitou o quê."
 },
 {
  "id": "UC-019",
  "fam": "B",
  "titulo": "Métrica → ação corretiva (anomalia dispara workflow, autonomia graduada)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "workflow-duravel"
  ],
  "dorHook": "Meus indicadores só recebem atenção quando o problema já cresceu — e ainda dependo de eu lembrar de agir."
 },
 {
  "id": "UC-020",
  "fam": "B",
  "titulo": "Nutrição de longo prazo (sequências de semanas/meses sem cair)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "comm-email"
  ],
  "dorHook": "Perco contatos que amadureceriam em meses porque não tenho fôlego de acompanhar cada um ao longo do tempo."
 },
 {
  "id": "UC-021",
  "fam": "B",
  "titulo": "Processamento de levas (import/higienização/classificação com retomada)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel"
  ],
  "dorHook": "Recebo bases grandes pra tratar e é tudo no braço; se trava no meio, alguém recomeça do zero."
 },
 {
  "id": "UC-022",
  "fam": "B",
  "titulo": "Follow-up incansável (propostas, orçamentos, pendências)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "comm-whatsapp",
   "hitl"
  ],
  "dorHook": "Mando proposta e ela morre no silêncio — não porque o cliente disse não, mas porque ninguém deu o segundo toque."
 },
 {
  "id": "UC-023",
  "fam": "B",
  "titulo": "Renovações proativas (régua + alçada humana no desconto)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "hitl"
  ],
  "dorHook": "A renovação me pega de surpresa e, na pressa pra não perder o cliente, acabo dando desconto demais."
 },
 {
  "id": "UC-024",
  "fam": "B",
  "titulo": "Conciliações com verificação determinística + read-back",
  "seg": [
   "pme"
  ],
  "caps": [
   "create_connector",
   "workflow-duravel"
  ],
  "dorHook": "Todo mês bato o extrato do banco com meu sistema na mão, linha por linha — leva horas e um erro é dinheiro."
 },
 {
  "id": "UC-025",
  "fam": "B",
  "titulo": "Vigilância de carteira (inatividade → playbook de reativação)",
  "seg": [
   "pme"
  ],
  "caps": [
   "agente-operador",
   "comm-whatsapp"
  ],
  "dorHook": "Cliente não avisa que vai embora — ele só some, e eu só percebo quando já foi."
 },
 {
  "id": "UC-026",
  "fam": "B",
  "titulo": "Rotinas administrativas orquestradas (fechamento mensal, obrigações)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "hitl"
  ],
  "dorHook": "Meu fechamento mensal vive numa planilha e na memória das pessoas — e um passo esquecido vira multa."
 },
 {
  "id": "UC-027",
  "fam": "C",
  "titulo": "Concierge WhatsApp (agendar/pedir/status, consumidor não loga)",
  "seg": [
   "agenda",
   "pme"
  ],
  "caps": [
   "comm-whatsapp",
   "agente-operador"
  ],
  "dorHook": "Meus clientes pedem tudo pelo WhatsApp — marcar, remarcar, confirmar — e uma pessoa responde isso o dia inteiro."
 },
 {
  "id": "UC-028",
  "fam": "C",
  "titulo": "Página pública de agendamento",
  "seg": [
   "agenda"
  ],
  "caps": [
   "face-web"
  ],
  "dorHook": "Meus clientes marcam horário por telefone e WhatsApp o dia todo, e fora do horário ninguém consegue marcar."
 },
 {
  "id": "UC-029",
  "fam": "C",
  "titulo": "Formulário / pedido / orçamento público",
  "seg": [
   "pme",
   "agenda"
  ],
  "caps": [
   "face-web"
  ],
  "dorHook": "Pedido de orçamento chega picado por WhatsApp, e-mail e Instagram, e sempre falta um dado."
 },
 {
  "id": "UC-030",
  "fam": "C",
  "titulo": "Página de status (\"onde está meu pedido/processo/exame\")",
  "seg": [
   "pme"
  ],
  "caps": [
   "face-web"
  ],
  "dorHook": "O cliente fica ligando pra perguntar onde está o pedido, e minha equipe repete a mesma resposta o dia todo."
 },
 {
  "id": "UC-031",
  "fam": "C",
  "titulo": "Portal logado do cliente final (docs, histórico, 2ª via)",
  "seg": [
   "pme",
   "agenda"
  ],
  "caps": [
   "portal-logado",
   "pii-fail-closed"
  ],
  "dorHook": "Meu cliente me pede a mesma 2ª via e o mesmo documento toda hora, e eu vivo reenviando na mão."
 },
 {
  "id": "UC-032",
  "fam": "C",
  "titulo": "NPS + fechamento de loop (detrator → workflow de recuperação)",
  "seg": [
   "pme"
  ],
  "caps": [
   "comm-email",
   "workflow-duravel"
  ],
  "dorHook": "Mando pesquisa de satisfação, vejo a nota baixa, e não faço nada a tempo — o cliente insatisfeito some."
 },
 {
  "id": "UC-033",
  "fam": "C",
  "titulo": "Notificações transacionais multicanal",
  "seg": [
   "pme"
  ],
  "caps": [
   "comm-whatsapp",
   "comm-sms"
  ],
  "dorHook": "Aviso pedido confirmado e pagamento recebido na mão, um por um, e quando esqueço o cliente liga preocupado."
 },
 {
  "id": "UC-034",
  "fam": "C",
  "titulo": "Captação pública → pipeline interno (lead da face-web cai no CRM)",
  "seg": [
   "pme"
  ],
  "caps": [
   "face-web",
   "agente-operador"
  ],
  "dorHook": "Lead que chega pelo site vira anotação solta e esfria antes de alguém falar com ele."
 },
 {
  "id": "UC-035",
  "fam": "D",
  "titulo": "Clínica OS (agenda, confirmação/remarcação, retornos, cobrança, portal)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "comm-whatsapp",
   "workflow-duravel",
   "face-web"
  ],
  "dorHook": "A recepção vive no telefone confirmando e remarcando, a agenda tem furo de falta e o retorno do paciente fica esquecido."
 },
 {
  "id": "UC-036",
  "fam": "D",
  "titulo": "Advocacia (intake, prazos duráveis, documentos, faturamento)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "workflow-duravel",
   "hitl",
   "pii-fail-closed"
  ],
  "dorHook": "Um prazo que passa batido não é atraso: é responsabilidade civil — e hoje ele mora na cabeça de alguém."
 },
 {
  "id": "UC-037",
  "fam": "D",
  "titulo": "Contabilidade (coleta mensal de docs, obrigações, onboarding fiscal)",
  "seg": [
   "bpo",
   "agenda"
  ],
  "caps": [
   "workflow-duravel",
   "comm-whatsapp"
  ],
  "dorHook": "Todo mês é a mesma caça aos documentos de dezenas de clientes, e a obrigação com prazo fica por um fio."
 },
 {
  "id": "UC-038",
  "fam": "D",
  "titulo": "Imobiliária (funil locação/venda, visitas, vistorias, contratos)",
  "seg": [
   "pme"
  ],
  "caps": [
   "comm-whatsapp",
   "face-web"
  ],
  "dorHook": "O interessado no imóvel chega pelo WhatsApp, some no meio do funil, e a visita e a vistoria viram bagunça de agenda."
 },
 {
  "id": "UC-039",
  "fam": "D",
  "titulo": "Agência (briefing → produção → aprovação do cliente → faturamento)",
  "seg": [
   "pme"
  ],
  "caps": [
   "face-web",
   "hitl"
  ],
  "dorHook": "A aprovação do cliente trava o projeto e, no fim do mês, ninguém sabe o que já dá pra faturar."
 },
 {
  "id": "UC-040",
  "fam": "D",
  "titulo": "Educação/cursos (matrícula, recorrência, secretaria, comunicação)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "comm-whatsapp",
   "face-web"
  ],
  "dorHook": "Aluno matriculado é fácil; o duro é a mensalidade que atrasa e o aluno que some no meio do curso."
 },
 {
  "id": "UC-041",
  "fam": "D",
  "titulo": "Fintech/crédito (esteira de proposta, KYC operacional, alçadas)",
  "seg": [
   "pme"
  ],
  "caps": [
   "pii-fail-closed",
   "hitl",
   "audit-trail"
  ],
  "dorHook": "Cada proposta de crédito é uma papelada de documentos, uma análise no braço e uma decisão que não pode dar errado."
 },
 {
  "id": "UC-042",
  "fam": "D",
  "titulo": "E-commerce/D2C ops (pós-venda, trocas/devoluções, SAC)",
  "seg": [
   "pme"
  ],
  "caps": [
   "comm-whatsapp",
   "agente-operador",
   "create_connector"
  ],
  "dorHook": "Depois da venda vem a enxurrada: troca, devolução e cliente cobrando status no WhatsApp o dia inteiro."
 },
 {
  "id": "UC-043",
  "fam": "D",
  "titulo": "Serviços recorrentes (manutenção/limpeza/segurança: contratos, escalas, OS)",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel"
  ],
  "dorHook": "Contrato assinado, e agora? Montar a escala, mandar a equipe e provar que o serviço foi feito, todo mês, no braço."
 },
 {
  "id": "UC-044",
  "fam": "D",
  "titulo": "Eventos (inscrição pública, credenciamento, comunicação, pós-evento)",
  "seg": [
   "pme"
  ],
  "caps": [
   "face-web",
   "comm-email"
  ],
  "dorHook": "Faltam dez dias pro evento e a inscrição, o credenciamento e os lembretes ainda estão espalhados em planilha."
 },
 {
  "id": "UC-045",
  "fam": "D",
  "titulo": "Condomínios/administradoras (chamados, inadimplência, portal do condômino)",
  "seg": [
   "pme"
  ],
  "caps": [
   "portal-logado",
   "comm-whatsapp"
  ],
  "dorHook": "Chamado do condômino no WhatsApp, boleto atrasado e ninguém com um lugar pra acompanhar o próprio prédio."
 },
 {
  "id": "UC-046",
  "fam": "D",
  "titulo": "Academias/estúdios (matrícula, renovação, frequência, retenção)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "comm-whatsapp",
   "agente-operador"
  ],
  "dorHook": "O aluno parou de vir há duas semanas e você só percebe quando ele cancela o plano."
 },
 {
  "id": "UC-047",
  "fam": "D",
  "titulo": "Oficinas/assistência técnica (orçamento aprovado por link, status do reparo)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "face-web",
   "comm-whatsapp"
  ],
  "dorHook": "O cliente liga toda hora pra saber do conserto, e o orçamento fica parado esperando um 'pode fazer'."
 },
 {
  "id": "UC-048",
  "fam": "D",
  "titulo": "Saúde ocupacional/ASO (convocação em massa, agendamento, laudos)",
  "seg": [
   "agenda",
   "bpo"
  ],
  "caps": [
   "workflow-duravel",
   "comm-whatsapp",
   "pii-fail-closed"
  ],
  "dorHook": "Convocar funcionário pra exame, controlar quem fez e quando vence o ASO — tudo na planilha, com prazo legal correndo."
 },
 {
  "id": "UC-049",
  "fam": "E",
  "titulo": "BPO financeiro multi-cliente padronizado",
  "seg": [
   "bpo"
  ],
  "caps": [
   "workflow-duravel",
   "instantiate_template"
  ],
  "dorHook": "Faço o financeiro de dezenas de empresas de um jeito diferente pra cada uma, e no fim do mês vira uma corrida contra o erro."
 },
 {
  "id": "UC-050",
  "fam": "E",
  "titulo": "Secretaria remota multi-clínica",
  "seg": [
   "bpo",
   "agenda"
  ],
  "caps": [
   "comm-whatsapp",
   "agente-operador",
   "instantiate_template"
  ],
  "dorHook": "Sou secretária de várias clínicas ao mesmo tempo e o WhatsApp de todas toca em mim o dia inteiro."
 },
 {
  "id": "UC-051",
  "fam": "E",
  "titulo": "BPO de atendimento híbrido (agente resolve volume, humano exceção)",
  "seg": [
   "bpo"
  ],
  "caps": [
   "agente-operador",
   "comm-whatsapp",
   "hitl"
  ],
  "dorHook": "Atendo o cliente de várias empresas e o volume não cabe no meu time — mas robô sozinho perde o cliente na hora difícil."
 },
 {
  "id": "UC-052",
  "fam": "E",
  "titulo": "Operação-padrão replicável de consultoria/franquia",
  "seg": [
   "bpo",
   "vsaas"
  ],
  "caps": [
   "instantiate_template"
  ],
  "dorHook": "Minha consultoria virou receita de bolo, mas cada cliente novo eu monto tudo do zero de novo."
 },
 {
  "id": "UC-053",
  "fam": "E",
  "titulo": "Consultor monitora KPIs dos clientes (push/pull consentido — DP094 W4)",
  "seg": [
   "bpo",
   "vsaas"
  ],
  "caps": [
   "canal-dados-consentido"
  ],
  "dorHook": "Só descubro que o número do meu cliente piorou quando ele me liga preocupado — sempre tarde demais."
 },
 {
  "id": "UC-054",
  "fam": "E",
  "titulo": "Gestora de carteiras com visão agregada consentida",
  "seg": [
   "bpo"
  ],
  "caps": [
   "canal-dados-consentido"
  ],
  "dorHook": "Cuido de uma carteira de empresas, mas só enxergo cada uma separada — nunca o todo na mesma tela."
 },
 {
  "id": "UC-055",
  "fam": "F",
  "titulo": "Acelerador first-party (Fluxomind como criador) — *trilho template já na Fase 1",
  "seg": [
   "todos"
  ],
  "caps": [
   "marketplace",
   "instantiate_template"
  ],
  "dorHook": "Queria começar já com uma operação pronta e só ajustar ao meu negócio, sem montar tudo do zero."
 },
 {
  "id": "UC-056",
  "fam": "F",
  "titulo": "Criador publica vertical de nicho (ex.: a Clínica OS de um dentista-cliente)",
  "seg": [
   "agenda"
  ],
  "caps": [
   "marketplace",
   "payout"
  ],
  "dorHook": "Sei tudo do meu nicho e atendo cliente a cliente na mão, mas não consigo transformar essa experiência em algo que vende sozinho."
 },
 {
  "id": "UC-057",
  "fam": "F",
  "titulo": "Consultor empacota metodologia como produto instalável",
  "seg": [
   "bpo"
  ],
  "caps": [
   "marketplace",
   "payout"
  ],
  "dorHook": "Minha metodologia funciona, mas vive presa em PDF e consultoria hora a hora — nunca virou um produto que escala."
 },
 {
  "id": "UC-058",
  "fam": "F",
  "titulo": "BPO vende operação-padrão como package (serviço → software)",
  "seg": [
   "bpo"
  ],
  "caps": [
   "marketplace",
   "payout"
  ],
  "dorHook": "Faço a mesma operação pra cada cliente vendendo minhas horas; queria vender o sistema, não o meu tempo."
 },
 {
  "id": "UC-059",
  "fam": "F",
  "titulo": "Templates de compliance por setor (LGPD ops, políticas, trilhas)",
  "seg": [
   "pme"
  ],
  "caps": [
   "marketplace"
  ],
  "dorHook": "Minhas políticas vivem num Word e os aceites, num e-mail perdido — se cair uma auditoria, não tenho como provar nada."
 },
 {
  "id": "UC-060",
  "fam": "F",
  "titulo": "Apps de integração (conector + workflows prontos p/ stacks comuns)",
  "seg": [
   "pme"
  ],
  "caps": [
   "marketplace",
   "create_connector"
  ],
  "dorHook": "Meus sistemas não conversam entre si e alguém passa o dia copiando dado de uma ferramenta pra outra na mão."
 },
 {
  "id": "UC-061",
  "fam": "F",
  "titulo": "Import-discovery — \"graduados do Lovable\" (extrai intenção, re-gera operável)",
  "seg": [
   "pme"
  ],
  "caps": [],
  "dorHook": "Montei um protótipo que funciona lindo na demo, mas não consigo colocar pra rodar de verdade no meu negócio."
 },
 {
  "id": "UC-062",
  "fam": "F",
  "titulo": "Benchmarks setoriais agregados consentidos (DP094 W5)",
  "seg": [
   "todos"
  ],
  "caps": [
   "canal-dados-consentido"
  ],
  "dorHook": "Não sei se meus números estão acima ou abaixo do meu setor — comparo no achismo, sem base nenhuma."
 },
 {
  "id": "UC-063",
  "fam": "G",
  "titulo": "Apps com PII de pessoa física (saúde/jurídico/financeiro/RH)",
  "seg": [
   "agenda",
   "pme"
  ],
  "caps": [
   "pii-fail-closed",
   "audit-trail"
  ],
  "dorHook": "Meu app lida com dado sensível de gente de verdade e eu não durmo com medo de vazar ou usar errado."
 },
 {
  "id": "UC-064",
  "fam": "G",
  "titulo": "Alçadas de aprovação como objeto canônico (prova + undo, não print)",
  "seg": [
   "pme"
  ],
  "caps": [
   "hitl",
   "audit-trail"
  ],
  "dorHook": "Aprovação aqui é print no grupo do WhatsApp — se questionarem depois, não tenho prova firme de quem liberou o quê."
 },
 {
  "id": "UC-065",
  "fam": "G",
  "titulo": "Substituição de shadow-IT departamental por apps governados",
  "seg": [
   "pme",
   "vsaas"
  ],
  "caps": [
   "audit-trail"
  ],
  "dorHook": "Cada setor toca um monte de planilha e ferramenta solta, sem controle nenhum de quem mexeu no quê."
 },
 {
  "id": "UC-066",
  "fam": "G",
  "titulo": "Trilha tamper-evident pronta para auditoria externa",
  "seg": [
   "pme"
  ],
  "caps": [
   "audit-trail"
  ],
  "dorHook": "Quando chega auditoria externa, passo dias juntando print e planilha pra provar o que aconteceu."
 },
 {
  "id": "UC-067",
  "fam": "G",
  "titulo": "Operação crítica com verificação determinística + ledger",
  "seg": [
   "pme"
  ],
  "caps": [
   "workflow-duravel",
   "audit-trail"
  ],
  "dorHook": "É uma operação que não pode dar erro, mas hoje eu confio na sorte e não tenho como provar que cada passo foi conferido."
 }
];
