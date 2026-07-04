# ADR-0006: Arquitetura multi-idioma — árvores paralelas por locale

- **Status**: Aceito
- **Data**: 2026-07-04

## Contexto

Decisão do fundador (2026-07-04): o site inteiro será multi-idioma — EN e PT
primeiro, ES no futuro. O site é 100% estático, as URLs pt acabaram de ser
indexadas (Google + Bing), a copy é "lei" governada por message house
(um por idioma: `message-house-cliente-final.md` pt, `message-house-en.md`),
e o conteúdo diverge por idioma de propósito (slugs GEO localizados, termo
da categoria por idioma, dores/buscas por mercado).

## Decisão

**Árvores de rotas paralelas por locale, sem biblioteca de i18n:**

- **pt-BR permanece na raiz** (`/`, `/precos`, …) — URLs intocadas, zero
  risco ao SEO recém-construído. É o locale canônico do GTM (BCM-07).
- **EN vive em `/en/*`** com **slugs localizados** (`/en/pricing`,
  `/en/self-operating-app`) — cada idioma compete pela sua própria busca.
- **ES futuro = `/es/*`**, mesmo padrão.
- Copy EN em módulos dedicados (`src/lib/messages-en.ts`, futuros
  `*-es.ts`), sob a lei do message house daquele idioma. Componentes de
  chrome por locale (`SiteHeaderEn`, `SiteFooterEn`).
- **`hreflang` liga os pares** (`alternates.languages` no metadata das duas
  pontas); sitemap único lista todos os locales.
- Sem middleware/detecção automática de idioma: a troca é explícita
  (link "English"/"Português"). Detecção pode entrar depois sem mudar rotas.

### Ordem de tradução (roadmap)

1. ✅ `/en` (landing) + `/en/self-operating-app` (categoria)
2. `/en/pricing` → `/en/security` → `/en/platform` → `/en/what-it-does`
   → `/en/accelerate`
3. `/en/why` (carta do fundador — exige martelo especial: voz pessoal)
4. `/en/use-cases` + casos (exige `dor_hook`/`buscas` EN nos packages)
5. Legais EN (tradução mantendo base LGPD — controladora brasileira)
6. **Demo EN por último** — maior volume (~2.300 linhas de diálogo) e maior
   risco de quebra de encantamento; projeto próprio, gateado por decisão.

### Exceção deliberada: a demo interativa (2026-07-04)

A demo (`JourneyDemo`) NÃO segue árvores paralelas: é um componente onde a
lógica domina (autopilot, travas, timing) e é idêntica entre idiomas — só
strings/dados divergem. Duplicar duplicaria a lógica mais iterada do site.
Padrão adotado (decisão do fundador): **componente único + dicionários de
copy por locale** (`src/lib/demo-copy.ts` tipo; `demo-copy-pt.ts` /
`demo-copy-en.ts`; wrappers client `DemoPt`/`DemoEn` por causa da fronteira
RSC — o dicionário contém funções). Idioma novo na demo = +1 dicionário.
Regra prática: página nova → árvore paralela; componente interativo
compartilhado → dicionário por locale.

## Consequências

- Duplicação estrutural entre árvores (aceita conscientemente): mudança de
  layout numa página pt pede espelho na EN — o custo é visível e local, em
  vez de escondido em catálogos de strings.
- Adaptações de mercado são legítimas e registradas no message house do
  idioma (ex.: "fatura em reais, não em dólar" é dor brasileira; em EN vira
  o mecanismo "one invoice, models included").
- Cada PR de copy declara quais locales toca; página EN sem par pt não
  existe (a lei pt é a fonte).

## Alternativas consideradas

- **next-intl com `[locale]` + `localePrefix: 'as-needed'`**: faz o mesmo
  roteamento, mas exige mover todas as rotas para `[locale]/`, middleware, e
  extrair ~2.600 linhas de copy pt para catálogos JSON — reescrita do site
  para ganhar sincronização de strings que **não queremos** (copy diverge
  por idioma por decisão). **Gatilho para migrar**: se os idiomas passarem a
  compartilhar copy 1:1, ou se o número de locales passar de 3, ou se
  entrar detecção automática de idioma.
- **Domínio por idioma** (.com/.com.br): viola o ADR-0003 (domínio canônico
  único).
