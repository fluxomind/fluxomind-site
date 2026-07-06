# Pendências — retomada de trabalho (atualizado 2026-07-06)

Estado ao fechar a sessão de 2026-07-06 e o que falta, com contexto
suficiente para qualquer pessoa (ou sessão) continuar de onde paramos.
O que já foi ao ar está em `docs/historico-implantacao.md`; decisões de
arquitetura nos ADRs (`docs/adr/`); contratos com a plataforma em
`docs/fontes-upstream.md`.

## Estado atual (nada quebrado, nada bloqueando)

- Site 100% bilíngue em produção: 30 rotas (15 pt ↔ 15 en), hreflang em
  todos os pares, zero PRs abertos (últimos: #51–#55).
- Catálogo de 67 UCs bilíngue em `/casos-de-uso` e `/en/use-cases`
  (página única, navegação por hash `#UC-007`; demos em destaque; lâmina
  em página cheia). Emenda registrada no ADR-0005.
- Copy com revisão CMO nas duas línguas: títulos curados
  (`src/lib/catalogo-titulos.ts` / `-en.ts`), jargão de engine e roadmap
  interno eliminados **nos geradores** (permanente a cada regeneração).
- Pipelines versionados: `scripts/gera-catalogo-ucs.py` (fonte upstream →
  índice SSR + lâminas pt) e `scripts/merge-laminas-en.py` (lotes de
  tradução → lâminas EN + hooks, com validação de paridade).
- Medição ativa: evento `catalogo_uc {uc}` na planilha "site-pageview"
  (Drive *Marketing and Customer*) a cada lâmina aberta — demanda
  observada por UC. Taxonomia em `docs/leads-analytics.md`.

## Pendências — decisões do fundador (destravam trabalho)

### 1. Calibrar a `matrix.md` (plataforma) → destrava lote 1 de páginas GEO
- **Recomendação registrada**: esperar ~1–2 semanas de dados do evento
  `catalogo_uc` e calibrar com demanda observada (quais UCs os visitantes
  mais abrem, por idioma) em vez de intuição.
- **Como retomar**: puxar a planilha "site-pageview", agrupar
  `catalogo_uc` por `uc` e por path (pt/en), cruzar com o Ranking A2 da
  matrix. Depois da calibração: publicar o lote 1 de páginas GEO
  estáticas (5–10 casos/mês, pipeline de `casos.ts`/`casos-en.ts` já
  existe — modelo = 3 casos atuais).

### 2. Campos EN nos packages da skill (plataforma) → aposenta a camada de tradução
- Hoje o EN do catálogo é **tradução do lado site**
  (`public/catalogo-laminas-en.json` + `src/lib/catalogo-hooks-en.ts`),
  não fonte. Contrato: UC alterado upstream ⇒ regenerar pt
  (`gera-catalogo-ucs.py`) e retraduzir aquele UC no EN.
- **Como retomar**: pedir ao agent da plataforma que a skill de packages
  gere campos EN (`dor_hook_en`, `problema_en`, `pedido_en`,
  `escopo_en`, `dims_en`, `kpi_en`, `objecoes_en`), no mesmo padrão de
  qualidade do `docs/message-house-en.md` (termo único "self-operating
  app"; anti-calque: nunca "accompany", "by hand", "from scratch").
  Quando existirem: estender `gera-catalogo-ucs.py` para emitir
  `catalogo-laminas-en.json` da fonte e apagar `merge-laminas-en.py`.

### 3. Reescrever `/en/why` na voz do fundador
- A carta em `/por-que` foi traduzida com fidelidade (e revisada por
  nativos), mas o fundador declarou que quer reescrevê-la no tom
  pessoal dele. Arquivo: `src/app/en/why/page.tsx`.

### 4. Ratificar "self-operating app" no BCM
- `docs/message-house-en.md` segue como PROPOSTA. O termo foi verificado
  (sem dono em busca; alternativas rejeitadas: "operating app" colide
  com OS, "operant" remete a Skinner, "autonomous" promete demais).

### 5. Log Drain (Marco Civil art. 15)
- Retenção de logs de acesso por 6 meses exige Log Drain pago na Vercel
  ou aceitação de risco documentada. Contexto no runbook e na página de
  privacidade. Decisão de custo/infra do fundador.

## Pendências — trabalho de site (gateado ou opcional)

### 6. Lote 1 de páginas GEO estáticas
- Gateado pelo item 1. Execução: escolher 5–10 UCs da matrix calibrada,
  gerar páginas no modelo dos 3 casos atuais (GEO: h1-pergunta, abertura
  definicional, pedido em português, FAQ das objeções + FAQPage JSON-LD),
  pt + en, linkar das lâminas do catálogo ("Ler a página completa").

### 7. Rótulo do nav "O que resolvo"
- Sugestão em aberto: sinalizar volume ("O que resolvo · 67") ou renomear
  para "Casos de uso". Uma linha em `src/lib/nav.ts` (+ header EN).

### 8. Espanhol (declarado para o futuro)
- ADR-0006 já prevê `/es/*` (árvore paralela). Demo = +1 dicionário
  (`demo-copy-es.ts`); catálogo = +1 camada (títulos + lâminas es);
  páginas = espelho da árvore EN. Esperar decisão de mercado do fundador.

### 9. Relatório de demanda do catálogo (oferecido, não agendado)
- Em ~2 semanas (a partir de 2026-07-06): ranking de UCs mais abertos
  por idioma a partir da planilha de eventos, para alimentar o item 1.
  Ninguém agendou rotina automática — fazer sob demanda.

## Avisos de manutenção (para quem tocar no catálogo)

- **Nunca editar** `src/lib/catalogo-ucs-index.ts`,
  `public/catalogo-laminas*.json` ou `src/lib/catalogo-hooks-en.ts` à
  mão — são gerados. Curadoria manual vive só em
  `catalogo-titulos.ts` / `catalogo-titulos-en.ts`.
- Sanitização (jargão interno, roadmap, placeholders) mora nos scripts —
  se aparecer termo novo de pipeline nos packages, adicionar às listas
  `CLIENTE_SUBS` / `CLIENT_SUBS_EN`.
- As 3 páginas GEO estáticas por caso continuam sendo a via de SEO; o
  catálogo é 1 página (hash não indexa) — não converter UCs do catálogo
  em rotas estáticas fora dos lotes da matrix (proteção
  anti-conteúdo-programático, ADR-0005).
