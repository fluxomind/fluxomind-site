# Proposta — Site self-selling da Fluxomind

> Data: 2026-06-16 · Acompanha o protótipo `home-v2.html` (abra no navegador).
> Princípio-mãe (do canon `_product2`): vender é provar, não prometer. A produção é uma plataforma nova, sem escala medida — a honestidade de maturidade é o que dá credibilidade.

---

## 1. A grande ideia: o site que se constrói sozinho

O site atual **descreve** a Fluxomind (Hero institucional + Sobre + Missão/Visão/Valores + Tecnologia). É uma brochura. Um site self-selling não descreve o produto — **ele é o produto**.

A tese do produto (`00-the-thesis`) é o *aha* da Marina: você fala uma intenção em português e a plataforma **se constrói sozinha**, devolvendo prova na tela a cada passo. A proposta é tornar **isso** a primeira coisa que o visitante faz na home — antes de qualquer texto de marketing.

Três movimentos que tornam o site self-selling:

1. **Demonstração como herói.** A home abre com um campo de intenção. O visitante digita (ou escolhe um exemplo) e vê a plataforma construir um workspace ao vivo — objeto, telas, dados, painel e automação — em segundos. É a cena da Marina, jogável, anônima, sem cadastro.
2. **Self-serve embutido.** O workspace de demonstração construído ali vira o workspace real do cliente com um clique ("Reivindicar este workspace"): cadastro → provisionamento de tenant isolado → onboarding. O funil de vendas e o produto são a mesma coisa.
3. **Dogfooding visível.** O próprio site é um app Fluxomind (renderizado pelo appEngine, dados via apiEngine). "Este site foi construído na própria plataforma" deixa de ser claim e vira prova ao vivo — o maior argumento de self-building que existe.

> Resumo: **a home não fala sobre self-building — ela faz self-building na frente do visitante, e converte o resultado em conta.**

---

## 2. Princípios da nova home

- **Linguagem de cliente, zero jargão.** O herói vende o **resultado** ("monte o sistema da sua operação só conversando"), não o mecanismo. Nada de "Atlas", "flywheel", "3 superfícies", "metadata-driven", "PC1–PC6" na home — isso afasta o comprador. Termos técnicos só nas páginas de devs/diligence.
- **Fluxo de venda linear (AIDA + StoryBrand).** A página leva o visitante por um arco único de cima a baixo: dor → virada → como funciona (3 passos) → o que dá pra fazer → por que é diferente → segurança → objeções → oferta. **Um CTA primário** ("Criar meu sistema grátis"), repetido 3–4 vezes.
- **Mostrar a jornada, não a máquina.** O que prende é o resultado do usuário (a cena da cobrança da Marina), com **prova na tela a cada passo** — em linguagem simples ("Criando o cadastro de clientes", não "Atlas classifica entidades").
- **Vender, não só provocar (tease).** Diga claramente o que a pessoa ganha, em quanto tempo, com que risco. Trate objeções ("preciso programar?", "meus dados ficam seguros?", "quanto custa?"). Reduza o risco (sem cartão, dados isolados, comece grátis).
- **Honestidade de maturidade vira escassez.** Beta privado, "poucas vagas por mês" — usa a verdade (pré-lançamento) como gatilho de exclusividade, sem números de escala inventados nem "SOC2 certificado".
- **Vibrante e de marca.** Herói escuro charcoal com glow azul `#2B66DD`, movimento, tipografia forte — padronizar o site de `#0066CC` para `#2B66DD` (alinhado ao `design-tokens.css`).

---

## 3. Estrutura (sitemap)

| Página / seção | Papel | Conteúdo-chave |
|---|---|---|
| **Home** | Converter pela demonstração | Herói com live-build → 3 superfícies → flywheel → enterprise trust → self-serve em 3 passos → CTA |
| **Produto / Como funciona** | Aprofundar o aha | A máquina (3 superfícies, 1 cérebro Atlas, EVO), a cena da Marina detalhada, o flywheel |
| **Soluções / por área** | Aderência a casos | As 6 áreas de capacidade como "perguntas de cliente"; verticais-alvo (fintech, SaaS B2B, BPO, mid-market) — como hipóteses |
| **Enterprise** | Destravar compliance | BYOK, multi-tenant+masking, audit hash-chain, PC1–PC6, scanners SOC2/GDPR contínuos + transparência (cert é roadmap) |
| **Preços** | Ancorar o wedge | Ally Workspace como oferta de entrada; faixas a validar com pilotos (sem cravar números) |
| **Construir (self-serve)** | Onboarding | A jornada de criação de workspace (ver §5) |
| **Devs / Builders** | Extensão | EVO, Code Dev Studio, API, MCP server — para o público técnico |
| **Confiança / Trust center** | Diligence | Página viva de segurança/compliance (espelha o ledger), status por pilar |
| **Blog / Recursos** | SEO + topo de funil | Conteúdo sobre operação assistida por IA, lazy-user, etc. |

A **Home** carrega 80% do peso de conversão; o resto sustenta a decisão.

### 3.1 O arco da home (jornada de conversão, de cima a baixo)

Estrutura linear do protótipo `home-v2.html` — cada bloco move o visitante um passo em direção ao CTA:

1. **Herói** — promessa clara ("monte o sistema da sua operação só conversando") + demo interativa ao lado + CTA primário + reasseguração (sem cartão, minutos, dados seguros).
2. **Dor** — "sua operação roda no improviso e isso custa caro": tudo espalhado, sempre esperando a TI, trabalho repetitivo.
3. **A virada** — tabela *de → para* (hoje vs. com a Fluxomind).
4. **Como funciona** — 3 passos em linguagem simples (você descreve → ela monta → você opera) + CTA.
5. **O que dá pra fazer** — 6 casos concretos (cobrança, vendas, onboarding, aprovações, WhatsApp, relatórios).
6. **Por que é diferente** — 4 benefícios (entende seu negócio, pronto hoje, funciona no WhatsApp, cresce com você).
7. **Segurança** — em linguagem de gente (dados isolados, você controla a chave, privacidade por padrão, histórico à prova).
8. **Dúvidas (FAQ)** — derruba as 5 objeções de compra.
9. **Oferta** — CTA final + escassez honesta ("poucas vagas por mês").

> Regra: o mesmo CTA primário aparece no herói, depois do "como funciona" e na oferta. Uma única ação desejada.

---

## 4. O herói interativo (live-build)

Fluxo no protótipo `home-v2.html`:

1. Campo de intenção + chips de exemplo ("Acompanhar clientes em atraso", "Gerir contratos com aprovação em 2 níveis", "Pipeline de vendas + follow-up").
2. "Construir meu workspace →" dispara uma sequência animada que reproduz a cena da Marina:
   - Entendendo a intenção (Atlas classifica entidades) → cria objeto → gera telas (lista/form/detalhe) → popula registros de exemplo → calcula risco → monta painel ao vivo → compõe e-mails *aguardando OK*.
   - Cada passo: spinner → check, com a "prova na tela".
3. Resultado: mini-painel ao vivo (métricas + barras + rascunhos de e-mail) + "Workspace pronto em 11s — nada disparado sem o seu OK".
4. CTA: **"Reivindicar este workspace →"** (entra no funil self-serve).

Na **v1 real**, esse build é alimentado de verdade pela plataforma (não animação mockada): a intenção vai ao `agentStudioEngine`/Ally, que compõe um workspace de demonstração em um tenant sandbox efêmero. O visitante vê o produto real trabalhando.

---

## 5. O funil self-serve (anônimo → conta → operação)

```
[1] Build anônimo            [2] Reivindicar             [3] Provisionar             [4] Operar
intenção → workspace      → cadastro (e-mail/SSO)    → tenant isolado criado     → conecta dados,
de demo em tenant            o demo "promove" para       (schema + RLS),            convida time,
sandbox efêmero              a conta do usuário          dados de exemplo migrados   Ally aprende
```

- **Passo 1 — Build anônimo:** roda em um **tenant sandbox** efêmero e descartável (rate-limited, dados sintéticos, sem PII). Zero atrito: sem cartão, sem instalar.
- **Passo 2 — Reivindicar:** cadastro leve (e-mail mágico ou Google/Microsoft SSO). O workspace de demo é "promovido" — o cliente não recomeça do zero.
- **Passo 3 — Provisionar:** cria-se o tenant real isolado (schema `tenant_<id>` + RLS), migra-se a composição do demo, aplica-se o plano. Onboarding guiado pelo próprio Ally ("conecte sua fonte de dados", "convide seu time").
- **Passo 4 — Operar:** o flywheel começa — a operação gera dados, o Atlas enriquece, o Ally devolve o próximo passo.

### Estados honestos para o pré-lançamento (beta privado)
Como ainda é beta privado, a v1 do site pode entregar o funil em **modo progressivo**, sem fingir GA:
- **Hoje:** build anônimo (demo real ou guiada) + **"Reivindicar"** vira **entrar na fila de pilotos** (captura de e-mail/empresa) e/ou **agendar conversa**. Provisionamento self-serve completo fica atrás de convite.
- **Próximo:** provisionamento self-serve para clientes aprovados (convite).
- **Depois:** self-serve aberto, billing automático.

Assim o site é self-selling desde já, sem prometer escala que não existe.

---

## 6. Arquitetura de integração com a plataforma

O site deixa de ser estático e passa a conversar com a plataforma por uma fronteira fina e segura:

| Função do site | Engine/serviço da plataforma | Observações |
|---|---|---|
| Build anônimo da demo | `agentStudioEngine` (Ally) + `appEngine` (auto-page-gen) | Em tenant **sandbox** efêmero; `metadataEngine` cria objeto, Auto-Page Generation gera lista/form/detalhe |
| Classificação semântica | `atlasEngine` | Dá o "entendendo a intenção" — entidade → Schema.org |
| Dados de exemplo | `dataEngine` (DAL multi-tenant) | Dados sintéticos no sandbox; zero PII |
| Provisionar tenant real | `operationsEngine` (tenant lifecycle) + `securityEngine` | Schema isolado + RLS; opção BYOK no enterprise |
| Auth / conta | `securityEngine` (dual token, SSO) | E-mail mágico ou SSO Google/Microsoft |
| Cotas / anti-abuso | `quotaEngine` + `apiEngine` (rate limit, middleware) | Protege o sandbox de abuso; fila quando saturado |
| API pública | `apiEngine` (REST v1) | Fronteira única site ↔ plataforma; envelope padronizado |
| Comunicação (waitlist, magic link) | `communicationEngine` (Email/WhatsApp) | Dogfooding: o site usa a própria comunicação |

**Isolamento e segurança do sandbox** são o ponto crítico: o build anônimo nunca toca dados reais de clientes; roda em tenant descartável, com quotas agressivas e masking ligado. Isso transforma um risco ("deixar qualquer um rodar a plataforma") em prova de multi-tenancy.

---

## 7. Dogfooding — o site é um app Fluxomind

Sempre que viável, renderizar seções dinâmicas do site (a demo, a página de status/trust, o blog) **pela própria plataforma** (appEngine + apiEngine). Benefícios:
- Prova viva de self-building ("você está navegando num app construído na Fluxomind").
- Cada melhoria de produto melhora o site sem retrabalho.
- A equipe vira usuária #1 — o que o canon chama de Self-Building.

A casca de marketing (Next.js, SEO, performance) continua; o **núcleo demonstrável** vem da plataforma.

---

## 8. Plano técnico

- **Manter Next.js 15 + Tailwind** (já é o stack). Adicionar:
  - Tokens de marca alinhados ao `design-tokens.css`: `--blue:#2B66DD`, charcoal `#1A1B1E`, sky `#4DABF7`, slate, verde `#10B981`. Atualizar `tailwind.config.js` (hoje `primary:#0066CC` → `#2B66DD`).
  - Componentização: `Nav`, `HeroBuilder` (client component com a animação/estado), `SurfaceCards`, `Flywheel`, `TrustStrip`, `SelfServeSteps`, `CTA`, `Footer`.
  - Motion: Framer Motion (ou CSS) para a sequência de build e reveals.
  - Acessibilidade (foco, prefers-reduced-motion para a animação).
- **HeroBuilder**: na v1, chama `POST /api/v1/demo/build` (proxy para o `apiEngine`) que orquestra o build no sandbox e faz stream (SSE) dos passos — o mesmo padrão de streaming do Ally. Fallback gracioso para a animação mockada se o backend não responder.
- **SEO/performance**: SSR/ISR para páginas de conteúdo; a demo é client-side.
- **Analytics**: instrumentar a **north-star** (tarefas concluídas com sucesso por evidência) já no funil: demo iniciada → build concluído → "reivindicar" → conta → primeira operação.

---

## 9. Faseamento

| Fase | Entrega | Self-serve |
|---|---|---|
| **F0 (rápida)** | Reskin da home com o herói interativo (animação mockada do protótipo) + 3 superfícies + flywheel + enterprise + 3 passos. Marca `#2B66DD`. | "Reivindicar" = waitlist/agendar piloto |
| **F1** | `HeroBuilder` plugado no `apiEngine` (build real em sandbox, streaming). Páginas Produto/Enterprise/Preços. | Provisionamento por convite |
| **F2** | Trust center vivo, blog/SEO, página de devs (EVO/API/MCP). Site dogfooded pelo appEngine onde fizer sentido. | Self-serve aberto + billing |

---

## 10. Métricas de sucesso

- **TTF-workspace (demo):** tempo do primeiro prompt ao painel pronto (alvo: < 15s).
- **Taxa build→reivindicar:** % de quem constrói a demo e clica em reivindicar.
- **Reivindicar→conta** e **conta→primeira operação** (ativação).
- **North-star:** tarefas de negócio concluídas com sucesso por evidência (puxa retenção e o flywheel).

---

## 11. Por que isto vende (e não se copia)

Um site de concorrente pode copiar o visual. Não pode copiar **a demo que realmente constrói** — porque isso exige a plataforma metadata-driven + Atlas + Ally por trás. A home vira a prova mais curta possível da tese inteira: *descreva, e ela constrói*. O visitante não lê que a Fluxomind é self-building; ele vê, em 11 segundos, e já sai com o workspace na mão.

---

## 12. Arquitetura de público — 3 trilhas, 3 linguagens

Um site não tem um público; tem três, e cada um compra com uma linguagem diferente. A home **bifurca logo no topo** ("Por onde você quer começar?") e cada perfil entra numa trilha com tom, prova e CTA próprios. O esqueleto de marca é o mesmo; a **linguagem muda**.

| Trilha | Quem | O que ele teme / quer | Linguagem & tom | Prova que convence | CTA | Arquivo |
|---|---|---|---|---|---|---|
| **Early adopter** | Dono / gestor de operação (PME, mid-market) | Quer resolver **agora**, sem TI; teme complexidade | Emocional, rápida, "você", verbos de ação, zero jargão | A demo que constrói ao vivo; "pronto em minutos" | Criar meu sistema grátis | `home-v2.html` |
| **Técnico conservador** | CTO, arquiteto, segurança (avaliação cuidadosa) | Teme risco, hype e lock-in; quer **evidência** | Rigorosa, específica, sem hype; nomes de engine OK | Arquitetura, PC1–PC6, BYOK, status honesto, data room | Avaliar a fundo / data room | `plataforma.html` |
| **Empresa gigante** | Patrocinador enterprise (adota como **acelerador**) | Quer escala, controle e que passe no **procurement** | Estratégica, de parceria, ROI/escala, governança | Modelos de adoção, governança, programa, suporte | Falar com o time enterprise | `enterprise.html` |

**Diferença de linguagem na prática** (mesma capacidade, três falas):
- *Segurança* → early adopter: "seus dados são seus, isolados e seguros" · técnico: "schema isolado + RLS, BYOK, masking de PII pré-LLM, audit hash-chain" · enterprise: "passa pelo seu time de segurança; BYOK e residência de dados por região".
- *Velocidade* → early adopter: "pronto em minutos, conversando" · técnico: "composição declarativa, sem geração de código solto" · enterprise: "dias, não trimestres — sem fila de dev".

### Princípios da segmentação
- **Um único seletor de entrada** na home + links contextuais ("É técnico e quer avaliar a fundo? →" no fim da seção de segurança) — sem forçar; o early adopter ignora e segue o fluxo de venda.
- **Trilhas se cruzam, não se isolam:** a `enterprise.html` linka para a `plataforma.html` (o patrocinador leva o time técnico junto); a `plataforma.html` volta para a visão geral.
- **CTAs distintos por intenção:** self-serve (early), data room/sessão de arquitetura (técnico), falar com enterprise (empresa). Nunca empurrar "fale com vendas" para quem quer só testar, nem "comece grátis" para quem precisa de procurement.
- **Honestidade em todas:** pré-lançamento vira escassez no early ("poucas vagas"), transparência no técnico ("design capability, não escala medida") e programa de design partners no enterprise ("entre cedo, com influência no produto").
