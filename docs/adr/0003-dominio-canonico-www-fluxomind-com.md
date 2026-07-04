# ADR-0003: Domínio canônico único: www.fluxomind.com

- **Status**: Aceito
- **Data**: 2026-07-02

## Contexto

A marca possui mais de uma variante de domínio (`.com`, `.com.br`, apex vs
`www`). Variantes indexadas em paralelo dividem autoridade de SEO e criam links
inconsistentes em materiais públicos.

## Decisão

**`https://www.fluxomind.com`** é o único domínio canônico. Ele é a base de
`metadataBase`, do `sitemap.ts`, do JSON-LD (Organization/WebSite) e de todo
link público. Nunca divulgar `.com.br`.

## Consequências

- Google Search Console verificado no domínio `fluxomind.com`; sitemap submetido
  em `https://www.fluxomind.com/sitemap.xml` (status registrado em
  `docs/historico-implantacao.md`).
- Qualquer variante nova de domínio deve redirecionar 301 para o canônico
  (configuração na Cloudflare/Vercel, fora do repo).
- Materiais de marketing e copy usam sempre `www.fluxomind.com`.
