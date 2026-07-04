# ADR-0001: Stack do site: Next.js (App Router) + Vercel + Cloudflare

- **Status**: Aceito
- **Data**: 2026-01 (registrado retroativamente em 2026-07-04)

## Contexto

O site institucional precisa de iteração rápida por um time mínimo, bom SEO
(páginas estáticas, metadata, sitemap) e custo próximo de zero até o lançamento
da plataforma. Não há backend próprio dedicado ao site.

## Decisão

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS** como framework único
  para páginas e rotas de API.
- **Vercel** como hosting, com deploy automático a partir do GitHub.
- **Cloudflare** para gerenciamento de domínio e DNS.

## Consequências

- Deploy contínuo sem pipeline própria; preview deploys por branch de graça.
- Páginas seguem estáticas, mas as rotas `/api/*` tornam o projeto **serverful**
  (funções serverless) — ver ADR-0002.
- Logs de runtime na Vercel são efêmeros (~1h no Hobby, ~1 dia no Pro): log não
  é armazenamento. Consequência prática documentada em `docs/leads-analytics.md`.
- Lock-in leve na Vercel: aceitável nesta fase; migrar para Cloud Run/VM é
  possível se um dia for preciso filesystem persistente (ex.: `/admin/leads`).

## Alternativas consideradas

- **Export estático puro (S3/Pages)**: descartado ao adotar captura de leads
  first-party (precisa executar funções).
- **WordPress/site builder**: descartado — o site inclui demo interativa da
  plataforma, que exige código próprio.
