# ADRs — Architecture Decision Records

Registro das decisões de arquitetura e engenharia do site. O git mostra *o que*
mudou; um ADR registra *por que* — contexto, decisão e consequências — para que a
decisão não viva só na cabeça de quem decidiu.

## Regras

- **Um arquivo por decisão**, numerado: `NNNN-titulo-curto.md` (use [template.md](template.md)).
- **Append-only**: ADR aceito não se edita. Se a decisão mudar, escreva um novo
  ADR que **substitui** o antigo e atualize o status do antigo para
  `Substituído por ADR-NNNN`.
- Registre decisões que custam caro reverter ou que geram "por que isso é assim?"
  seis meses depois. Ajuste fino de copy e refactor local não precisam de ADR —
  decisões de posicionamento/copy vivem no `docs/message-house-cliente-final.md`.
- Decisões de infraestrutura externa (Vercel, DNS, planilhas) continuam no
  `docs/historico-implantacao.md`; o ADR referencia, não duplica.

## Índice

| ADR | Título | Status |
|---|---|---|
| [0001](0001-stack-nextjs-vercel-cloudflare.md) | Stack do site: Next.js (App Router) + Vercel + Cloudflare | Aceito |
| [0002](0002-leads-analytics-first-party.md) | Leads e analytics first-party, sem vendor e sem cookies | Aceito |
| [0003](0003-dominio-canonico-www-fluxomind-com.md) | Domínio canônico único: www.fluxomind.com | Aceito |
| [0004](0004-fluxo-branch-pr-deploy-main.md) | Fluxo de mudança: branch + PR; deploy automático só na main | Aceito |
| [0005](0005-catalogo-casos-de-uso-fonte-e-regras.md) | Catálogo de casos de uso: fonte upstream (plataforma), escopo e regras | Aceito |
| [0006](0006-arquitetura-i18n.md) | Multi-idioma: árvores paralelas por locale (pt raiz, /en, /es futuro) | Aceito |

Referência sobre o formato: [adr.github.io](https://adr.github.io/).
