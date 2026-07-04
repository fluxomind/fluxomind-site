# Histórico de implantação — www.fluxomind.com (julho/2026)

Registro do que foi construído, decidido e publicado na virada do site para a
apresentação ao cliente final. O histórico fino de código está no git; este doc
registra **decisões e infraestrutura externa** que o git não mostra.

## Decisões de posicionamento

| Decisão | Data | Onde está |
|---|---|---|
| Site = melhor apresentação para o **cliente final** ("plataforma hoje + visão de especialistas") | 2026-07-02 | Lei de copy em `docs/message-house-cliente-final.md` |
| Domínio canônico **www.fluxomind.com** (nunca .com.br) | 2026-07-02 | `metadataBase`, sitemap, JSON-LD |
| "Entrar"/signup **fora do site** até o lançamento da plataforma | 2026-07-02 | CTAs → demo + form do beta |
| **Ally é a persona pública** da jornada de criação. O agente dentro do app do cliente final segue "assistente" genérico | 2026-07-03 | PR #27; §persona do message house |
| Cada cenário da demo gera uma **superfície de app diferente** (kanban / financeiro / chats) — nunca a mesma cara | 2026-07-03 | PR #24; feedback direto do fundador |
| Léxico vetado na copy pública: nomes de concorrentes, "chatbot" afirmativo, "waitlist", "código morto", "substrato vivo"; "6 dimensões" só em /plataforma | 2026-07-02 | §7 do message house |
| Copy da /plataforma nunca pode dizer "a cada PR / a cada mudança / continuamente" sobre CI: os workflows automáticos da plataforma estão **pausados desde 2026-04-25** (custo, até o release). O honesto é "sob demanda e no pipeline de deploy" | 2026-07-03 | PR #26 |

## O que foi ao ar (PRs na main)

- **#21–#23** — Site reescrito sob o message house; captura de leads + analytics
  first-party; `/demo` publicada como edição pública da jornada de criação
  (protótipo DP087 v2), tela cheia, autopilot ◀ ▶, chat de texto livre, mobile
  com toggle Conversa ⇄ Seu app; menu hambúrguer; nav em ordem de jornada.
- **#24** — 3 cenários na demo (leads, fluxo de caixa, atendimento WhatsApp),
  cada um com superfície própria; botão ↺ Recomeçar; digitação humana emulada
  (autopilot digita no input; placeholder máquina-de-escrever na entrada).
- **#25** — SEO técnico: `sitemap.ts` (9 rotas públicas), `robots.ts`
  (disallow /admin e /api), JSON-LD Organization + WebSite (layout) e FAQPage
  (home, espelha o FAQ real).
- **#26** — Fact-check da /plataforma e /seguranca contra o repo real
  `fluxomind-platform`: ~26 claims confirmados (39 engines, hash-chain, BYOK,
  pgTAP…), 6 correções de exagero/erro (mapa de camadas, compliance e CI).
- **#27** — Ally como persona pública da jornada; botões passo a passo com
  destaque (◀ vermelho, ▶ azul).
- **#28** — Este histórico e os runbooks de operação (`docs/runbooks.md`).
- **#29** — Página `/privacidade` (LGPD) linkada no footer, form do beta,
  Termos §8 e sitemap; documentação essencial do repo (ADRs em `docs/adr/`,
  `docs/arquitetura.md`, `CONTRIBUTING.md`, `SECURITY.md`); ajustes da revisão
  jurídica: canal privacidade@fluxomind.com (sem título "encarregado" —
  dispensa p/ pequeno porte, Res. CD/ANPD 2/2022), cláusulas-padrão da ANPD na
  transferência internacional, sede São Paulo/SP, runbook de incidente de
  dados pessoais (prazos da Res. 15/2024).
- **#30** — Registro dos PRs #28-#29 no histórico; pendência do Log Drain
  (Marco Civil art. 15) documentada; leads-analytics alinhado à página de
  privacidade.
- **#31** — Deep-link da demo: `/demo?cenario=leads|caixa|atendimento` inicia
  a jornada naquele cenário (`jornada_start` com `entry: link`).
- **#32** — Casos de uso (estratégia SEO/GEO): hub `/casos-de-uso` + 3 páginas
  por processo (cobrança-hero, leads, atendimento) em formato GEO
  (h1-pergunta, abertura definicional, FAQ + FAQPage JSON-LD); nav
  "O que resolvo" reapontado ao hub; cards da home §usos viram links;
  vínculos cruzados site↔plataforma (`docs/fontes-upstream.md`, `ucIds` no
  `casos.ts`, ADR-0005) — catálogo de UCs da plataforma é a fonte; hero
  comercial = Recuperar Receita (matrix, anexo).
- **#34** — Página da categoria `/app-operante` ("O que é um app operante?"):
  definição canônica do termo, negação tripla, 6 perguntas, 5 regras, FAQ +
  FAQPage e DefinedTerm JSON-LD; copy 100% derivada de `messages.ts`;
  linkada no footer e no hub de casos; 15ª rota do sitemap. Ativo GEO
  central: a fonte a ser citada quando IAs definirem o termo.
- **#37** — Casos enriquecidos com o material dos packages dos UCs (28
  pacotes gerados pela skill da plataforma): bloco "O pedido, em português"
  (§2 do package como citação → demo do cenário), FAQ regenerado das
  objeções reais (§9) com correção de honestidade no claim de ERP/API da
  cobrança (escopo v1: baixa manual), cards do hub com o dor_hook.
  Contrato fontes-upstream registra o mapeamento package→página.
- **#39** — Site multi-idioma, fase 1 (ADR-0006): árvores paralelas por
  locale (pt na raiz intocada; /en com slugs localizados; /es futuro).
  Lei de copy EN em docs/message-house-en.md (PROPOSTA ratificada) com o
  termo da categoria em inglês: **self-operating app** (sem dono em busca,
  verificado). Páginas EN: /en (landing, hero espelho da home),
  /en/self-operating-app (categoria, FAQPage + DefinedTerm) e /en/pricing;
  chrome EN (SiteHeaderEn/SiteFooterEn), hreflang em todos os pares,
  sitemap 18 rotas. Demo segue pt com moldura "in Portuguese".
- **#41-#43** — Multi-idioma completo (ADR-0006): árvore EN espelhando todas
  as páginas pt — institucionais (#41: security, what-it-does, accelerate;
  #42: platform + hambúrguer EN + mailto EN), e a onda final (#43: why
  [carta traduzida, aguarda reescrita do fundador], use-cases com slugs
  localizados via casos-en.ts, terms e privacy com nota de precedência pt).
  Sitemap: 29 rotas públicas (15 pt + 14 en), hreflang em todos os pares.
  Única superfície só-pt restante: a demo interativa (decisão de escopo
  pendente — 1 cenário EN vs. todos).
- **#46-#49** — Inglês nativo e demo bilíngue: revisão de copy EN por 2
  revisores independentes (~60 correções de calque; 1 crítica de significado
  na carta do fundador — "calls you on"); demo interativa em inglês
  (/en/demo, #48) e unificação i18n (#49): JourneyDemo único + dicionários
  demo-copy-pt/en (exceção registrada no ADR-0006 — componente interativo
  usa dicionário por locale; ES na demo = +1 dicionário). Site 100%%
  bilíngue: 30 rotas públicas, zero superfície só-pt.

## Infraestrutura externa (não versionada)

- **Hosting**: Vercel, projeto `fluxomind-site2`, team `fluxominds-projects`.
  Deploy automático a cada push na `main`. Domínio `www.fluxomind.com`.
- **Envs de Production** (Vercel → Settings → Environment Variables):
  `LEAD_WEBHOOK_URL`, `EVENTS_WEBHOOK_URL`, `ADMIN_TOKEN`. Os valores dos
  webhooks ficam SÓ lá e no Apps Script — não commitá-los nem colá-los em docs.
- **Planilha de leads**: "Leads-site" (Drive compartilhado
  *Marketing and Customer/Leads-Site*, conta fluxomind.com). Recebe cada lead
  do form via Apps Script Web App (acesso "Qualquer pessoa"). Validada e2e
  em 2026-07-03.
- **Planilha de eventos**: "site-pageview" (mesmo Drive). Recebe cada evento de
  analytics (`pageview`, `demo_*`, `jornada_*`, cliques) via Apps Script
  próprio. Colunas: data/hora · evento · props · path · sessão · navegador.
  Configurada e validada e2e em 2026-07-04. **Não** configurar
  `EVENTS_WEBHOOK_URL` no `.env.local` — testes locais sujariam a planilha.
- **Google Search Console** (2026-07-03/04): domínio `fluxomind.com`
  verificado; sitemap `https://www.fluxomind.com/sitemap.xml` submetido —
  status **Processado**, 9 páginas encontradas.
- **Bing Webmaster Tools** (2026-07-04): `fluxomind.com` verificado via
  importação do Search Console (conta Google fluxomind.com); sitemap
  submetido e URLs de /casos-de-uso enviadas para indexação. Motivo: o
  índice do Bing alimenta o ChatGPT Search (estratégia GEO). Painel
  **AI Performance** (beta) mostra impressões em respostas de IA —
  acompanhar mensalmente.
- **Vercel CLI** logado na máquina do fundador (conta ralfonunes-5159); a
  worktree do site está linkada ao projeto (`.vercel/`, git-ignorado), então
  `vercel env ls/add` e `vercel redeploy` funcionam direto do terminal.

## Pendências conhecidas (com gate)

| Item | Gate / condição |
|---|---|
| Prova social (depoimentos, casos) | Dogfood gerar números (BCM-07, ~mês 6) |
| Signup / "Entrar" no site | Lançamento da plataforma |
| `/admin/leads` vazio em produção | Limitação serverless documentada; a planilha é a fonte oficial |
| Rate-limit em memória por instância | Migrar p/ KV/Redis se o tráfego crescer |
| Fecho da demo no "home do workspace" com os 3 apps lado a lado | Ideia de backlog, sem urgência |
| Guarda de logs de acesso por 6 meses (Marco Civil, art. 15) — logs Vercel expiram em ~1h–1d | Decisão de custo/risco (Log Drain). Se ativar: IP retido vira PII → atualizar `/privacidade` e registrar ADR |
