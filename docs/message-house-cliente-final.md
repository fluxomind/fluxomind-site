# Message House v2 — Site para o Cliente Final

**Fonte da verdade:** BCM-07 (jun/2026, "tese convergida") — decks 01/02/04/05, Plano de Negócio, Guia de Execução, Jornadas.
**Decisões do fundador (2026-07-02):** o site é a melhor apresentação da Fluxomind para o **cliente final** (a empresa que adota); o trabalho do site é **encantar e demonstrar de forma espetacular** o que a Fluxomind faz pelo negócio; enquadramento = **plataforma hoje + visão de especialistas** (o catálogo de criadores é visão declarada, nunca apresentado como existente).

Este documento governa toda a copy do site. Strings compartilhadas entre páginas vivem em `src/lib/messages.ts` — importe de lá, não duplique.

**Vínculos upstream/downstream:** o contrato de sincronização com as fontes (BCM-07, catálogo de use cases `8-journeys/use-cases/`, product-plan) vive em [`docs/fontes-upstream.md`](./fontes-upstream.md) — mudou upstream, atualiza cá; nasceu cá, propõe upstream primeiro.

---

## 1. Hierarquia de mensagem

1. **Assinatura (h1 canônico, todo lugar):** *Delegue a tarefa. Receba a conclusão com a prova.*
2. **Promessa ao cliente final (BCM slide 8):** *Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas (não num projeto de meses).*
3. **Categoria:** **app operante** / negócio de software vivo. A 3ª categoria, entre o software rígido e a consultoria humana. Por 30 anos a empresa se adaptou ao software; a Fluxomind inverte: **o software se molda à empresa — e opera o processo.**
4. **Eixo de diferenciação (anti-Lovable, linguagem de cliente):** *Construir ficou fácil — qualquer IA te entrega um protótipo. Operar é o que falta.* A Fluxomind entrega o processo **rodando**: o app se constrói a partir do seu problema, opera o dia a dia e chama um humano nos casos sensíveis.
5. **Flywheel:** fica mais inteligente quanto mais você usa.

## 1.5 Propósito (por quê existimos)

**Linha canônica** (`PURPOSE_LINE` em messages.ts): *Por 30 anos, as empresas se adaptaram ao software. Existimos para inverter isso: o software se molda ao seu negócio — e trabalha por ele.*

Fundamento (pesquisa 2026-07): propósito funciona quando é "change my world" (utilidade concreta para o cliente), específico da categoria e ownable; propósito genérico/performático derruba credibilidade abaixo do neutro (JBR 2024, Kantar). Formato vencedor: **home continua outcome-first; propósito = banda curta na home + página narrativa dedicada, assinada pelo fundador com data** (padrão Linear/Notion/Nubank).

Regras:
- A página é `/por-que` — **nunca rotular "Manifesto"**.
- Assinada "Ralfo Nunes, fundador" + mês/ano.
- 3 atos: o jeito antigo (empresa se adapta ao software) → a inversão (IA entende contexto + executa; o privilégio do sob-medida-operado vira acessível) → a aposta (conhecimento vira negócio de software vivo — declarada como visão, honestidade de fase).
- O corpo carrega a democratização ("o que era privilégio de quem podia pagar projeto e integrador"); a visão de especialistas fecha como aposta, nunca como fato.

## 2. Negação tripla (atualizada)

> Não é um chatbot que responde. Não é um builder que te entrega código para manter. Não é um projeto de TI de meses.
> É um **app operante**: se constrói a partir do seu problema, opera o dia a dia — e escala para um humano quando o caso exige.

## 3. As 6 perguntas do seu app (canônicas — única redação permitida)

Sujeito = **o seu app** (evitar pronome; se inevitável, "ele"). Para a plataforma/Fluxomind, o pronome é "ela". NUNCA usar "6 dimensões" em copy comercial (permitido apenas na página técnica /plataforma).

| Face | Pergunta | Glosa |
|---|---|---|
| Domínio | O que o negócio guarda? | os dados e conceitos do seu negócio |
| Experiência | O que as pessoas veem e fazem? | as telas e a interação |
| Inteligência | O que pensa e ajuda a decidir? | decisões e próximos passos |
| Processo | O que acontece sozinho? | o dia a dia que roda sem você |
| Conexões | Com o que conversa? | WhatsApp, e-mail, API, seus sistemas |
| Confiança | Quem acessa e o que pode? | permissões, isolamento e prova |

## 4. As 5 regras da confiança (deck de vendas, slide 10)

O que torna a operação confiável para um leigo — reposicionar como recurso, não compliance:

1. **Enquadramento** — resolve o problema certo.
2. **Coerência** — a solução faz sentido, ponta a ponta.
3. **Correção + desfazer** — errar não machuca.
4. **Humano assume** — nos casos sensíveis, uma pessoa decide.
5. **Seus dados, só seus** — isolados de verdade.

## 5. Honestidade de fase (regra: fato + lacuna nomeada + aposta declarada)

Três capítulos — nunca apresentar visão como fato:

- **Já existe:** a plataforma — 39 engines que materializam e operam apps de verdade, multi-tenant, governada.
- **Próximo capítulo:** o dogfood — a Fluxomind rodando o próprio comercial dentro do produto, a prova viva de que o agente opera e evolui.
- **A visão:** um catálogo de apps operantes criados por especialistas — quem domina um problema empacota o método; sua empresa instala e adota operado.

A visão de especialistas aparece como **para onde isso vai**, uma banda por página no máximo, sempre em linguagem de visão ("estamos construindo", "o próximo capítulo").

## 6. CTAs (arquitetura de conversão)

A conversão principal do site é **viver a demonstração** — o encantamento vem antes do formulário.

| Papel | Rótulo canônico | Destino |
|---|---|---|
| Primário (nav + hero) | **Crie um app conversando** (= h1 da /demo; verbo de fazer, não de assistir) | `/demo` (a jornada interativa) — exceção: em `/demo` o nav CTA é `CTA.beta → #beta`. A demo curta da home segue em `/#demo`, acessada por rótulo próprio ("Prévia em 1 minuto ↓"). Sem link "Experimente" no nav — o CTA é a entrada única |
| Pós-demonstração / decisão | **Quero isso no meu negócio** | Form da lista do beta (`BetaForm` em `/#comecar`); todo CTA de beta ancora lá. `PLATFORM_BETA` (mailto) é só fallback de erro do form |
| Humano / escala | **Falar com o time** | `PLATFORM_CONTACT` |
| Quem já é beta | **Entrar** | `PLATFORM_LOGIN` — **omitido do site enquanto a plataforma não lança** (decisão 2026-07-02); betas recebem a URL do time |

`PLATFORM_SIGNUP` **não é mais CTA primário** (BCM-07: free aberto sangra a margem; cliente chega high-intent). A constante permanece exportada para reversão fácil.

## 7. Léxico

**Usar:** app operante · negócio de software vivo · opera o dia a dia · conclusão com a prova · governado · se molda à empresa · escala para um humano (handoff) · em semanas, não meses · fica mais inteligente quanto mais você usa · uma fatura em reais (managed LLM).

**Vetado:** "código morto" (vetado pelo fundador) · "6 dimensões" fora de /plataforma · "substrato vivo" · "waitlist" (dizer "lista do beta") · "data room" em botão · superlativo sem fonte · qualquer claim de catálogo/marketplace/avatar como existente · promessa de resultado financeiro específico · **nomear concorrente na copy do site** (Lovable/v0/Bolt/Palantir etc. — "anti-Lovable" é linguagem interna; no site, comparar com a categoria: "builder de código", "no-code genérico"). SoRs a que a plataforma se integra (SAP/Salesforce/TOTVS) podem ser nomeados — são integração, não comparação.

**Números com fonte (usáveis):** 39 engines em 10 camadas (fato — plataforma) · 79% das empresas adotaram agentes, só 11% em produção (o gap que a categoria "operar" fecha) · 45% do código gerado por IA falha em segurança (Veracode) — usar no máximo 1× no site, em /acelere ou home.

## 8. Tom por página

| Página | Papel | Tom |
|---|---|---|
| `/` | O espetáculo: demonstrar o app operante diante do visitante | Cinematográfico, concreto, primeira pessoa do cliente |
| `/o-que-tem` | O que o app responde (6 perguntas + hexágono) | Vitrine, linguagem de cliente |
| `/acelere` | Adoção em escala (empresa maior / patrocinador) | Dor → prova → conversa |
| `/plataforma` | Due-diligence técnica (aqui pode "dimensões", engines, RLS) | Engenheiro para engenheiro, honesto |
| `/seguranca` | As 5 regras da confiança + governança | Sóbrio, verificável |
| `/precos` | Beta honesto: acompanhado, sem cartão; sem números inventados | Direto, sem fricção |
| `/por-que` | O propósito, na palavra do fundador (3 atos, assinada e datada) | Pessoal, primeira pessoa, sem hipérbole |
| `/demo` | Jornada interativa dirigida pelo visitante (espelho → aprova-o-que-vê → operar → evoluir) | Encantamento com moldura de fase ("o produto que estamos construindo"); **persona pública = Ally** (voz da criação/operação com o criador — decisão do fundador, 2026-07-03; antes era interna). O agente **dentro do app do cliente** (thread do WhatsApp, execução de cobrança, etc.) permanece **"o assistente" genérico** — o cliente final não conhece a Ally. Gênero: "a Ally". |
| `/casos-de-uso` (+ `/casos-de-uso/<slug>`) | Menu de processos que o app operante resolve; entrada de busca (SEO/GEO) que alimenta a demo | Dor → o que roda sozinho → onde o humano decide; formato GEO (h1-pergunta, abertura definicional, FAQ). **Nunca "casos de clientes"** — prova social tem gate (BCM-07); um caso novo só entra quando a demo ganhar o cenário correspondente. Copy em `src/lib/casos.ts` |
| `/terms` | Legal | Inalterado em conteúdo; marca "Fluxomind" |
