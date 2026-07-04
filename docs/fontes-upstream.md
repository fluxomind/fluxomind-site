# Fontes upstream — vínculos site ↔ plataforma (contrato de sincronização)

> **Princípio:** o site é a **renderização** de decisões que vivem fora dele. A direção da
> verdade é sempre: **BCM-07 (negócio) → fmd-docs (produto/priorização) → site (copy/demo)**.
> O site nunca inventa caso, preço ou promessa — quando algo nasce aqui primeiro, propõe-se
> upstream antes de publicar. Criado 2026-07-04 (decisão do fundador: docs cruzadas para as
> coisas andarem juntas).

## Onde vivem as fontes

| Fonte | Localização |
|---|---|
| **BCM-07** (tese, pricing, GTM, message house de origem) | Drive `Management and Planning/BCM-07-plataforma-knowledge-mkt-place/bcm07-estrategia/` — começar por `_fonte-da-verdade/strategy-synthesis.md` e `final/` |
| **Catálogo de use cases + matriz de priorização** | Drive `fm-development/fluxomind-platform/8-journeys/use-cases/` (`catalog.md` · `matrix.md` · `README.md`) — no repo da plataforma: `fmd-docs/8-journeys/use-cases/` |
| **Product-plan (fases 0-4, capacidades)** | repo da plataforma: `fmd-docs/3-dev-plans/product-plan.md` |
| **Showcase / narrativa** | repo da plataforma: `fmd-docs/_product2/_showcase/` |

## Mapa de sincronização (mudou lá → atualiza cá)

| Artefato no site | Fonte upstream (SoT) | Regra de sync |
|---|---|---|
| `src/lib/messages.ts` (PROMISE · negação tripla · 6 faces · 5 regras · PHASE · CTAs) | `docs/message-house-cliente-final.md` ← **BCM-07** | Tese/números mudaram no BCM-07 → atualizar o message-house → propagar ao `messages.ts`. Nunca editar `messages.ts` direto sem passar pelo message-house. |
| `src/lib/casos.ts` (casos de uso) + cenários do `JourneyDemo` | **`8-journeys/use-cases/`** (`catalog.md` + shortlist B da `matrix.md` + `_backlog/UC-*/package.md`) | Caso/cenário novo só entra se: (1) o UC existe no catálogo e (2) entrou na shortlist B da matriz. Inverso também: shortlist B nova → cenário aqui. A regra local "caso só entra com cenário de demo" continua valendo por cima. **Conteúdo do caso vem do package do UC**: `dor_hook` → card/teaser, §2 prompt → bloco "O pedido, em português", §9 objeções → FAQ, §3 escopo v1 → limite dos claims. |
| `PHASE` em `messages.ts` (Já existe / Próximo capítulo / Visão) | `product-plan.md` (gates das fases) | Gate de fase fechou (ex.: Fase 0 / dogfood ao vivo) → "próximo capítulo" vira "já existe"; nunca o contrário sem gate. |
| `/precos` | BCM-07 `final/product-packaging.md` §0 (price list App-Store) + `pricing-launch-strategy.md` | Preço/âncora só muda upstream primeiro. |
| Demos (JourneyDemo/DemoBuilder) — o quê demonstrar | `matrix.md` Ranking B + Anexo (auditoria do lighthouse) | O roteiro canônico das demos do site É o cenário no código + o caso em `casos.ts` — **não** duplicar demo-spec na plataforma; a matrix referencia os cenários daqui. |

## Crosswalk cenário ↔ use case (estado 2026-07-04)

| Cenário (site) | UCs (catálogo) | App correspondente | Papel |
|---|---|---|---|
| `leads` | UC-001 + UC-002 + UC-003 | **Fluxomind Commercial OS** (lighthouse pinado, dogfood) | first-party #1 |
| `caixa` | UC-007 + UC-022 + UC-023 | **Recuperar Receita** (hero de venda) | first-party #2 |
| `atendimento` | UC-006 + UC-027 | — (alvo de **criador**, ranking A2 da matriz) | amplitude da plataforma; **nunca promover a produto first-party** (decisão travada BCM-07: first-party sem branding de indústria) |

## Pendências de coerência conhecidas

- [ ] `DemoBuilder` (home) usa cenários cobrança/vendas/**onboarding**; `JourneyDemo` (/demo) usa leads/caixa/**atendimento** — unificar no próximo retoque da home.

## Vínculo recíproco

O lado plataforma registra este contrato em
`fmd-docs/8-journeys/use-cases/README.md` (§Downstream) e o crosswalk em `matrix.md`
(§Vínculo com o site). Mudanças relevantes de qualquer lado → entrada datada nos changelogs
dos dois lados.
