# Fluxomind — site institucional

Código-fonte do site **www.fluxomind.com** — a apresentação pública da
Fluxomind, startup brasileira que está desenvolvendo uma plataforma IA-First,
no-code e baseada em metadados para democratizar o uso da inteligência
artificial em empresas de qualquer porte.

## 📦 Stack

- [Next.js 15 (App Router)](https://nextjs.org) + TypeScript + [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com) — hosting e deploy automático via GitHub
- [Cloudflare](https://cloudflare.com) — domínio e DNS

O porquê das escolhas está nos [ADRs](docs/adr/README.md); a visão de
componentes em [docs/arquitetura.md](docs/arquitetura.md).

## 🚀 Desenvolvimento local

```bash
npm install
npm run dev    # http://localhost:3000
npm run lint
npm run build
```

### Estrutura

- `src/app/` → páginas (App Router): home, `/demo`, `/plataforma`, `/precos`, `/terms`, `/privacidade`…
- `src/app/api/` → captura de leads (`/api/beta`) e analytics first-party (`/api/event`)
- `src/components/` → componentes (demo interativa, form do beta, header/footer…)
- `public/` → imagens e logos

## 🔒 Fluxo de mudança e deploy

Toda mudança entra por **feature branch + PR** — nunca commit direto na `main`.
Merge na `main` = deploy automático em produção na Vercel. Fluxo completo em
[CONTRIBUTING.md](CONTRIBUTING.md).

## 📚 Documentação

| Doc | O que cobre |
|---|---|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Fluxo de branch/PR, checks e o que atualizar junto com o código |
| [SECURITY.md](SECURITY.md) | Como reportar vulnerabilidades |
| [docs/arquitetura.md](docs/arquitetura.md) | Diagrama e componentes do site |
| [docs/adr/](docs/adr/README.md) | Decisões de arquitetura (por quê) |
| [docs/runbooks.md](docs/runbooks.md) | Operação: deploy, incidentes, procedimentos |
| [docs/historico-implantacao.md](docs/historico-implantacao.md) | Infra externa e histórico de decisões de implantação |
| [docs/leads-analytics.md](docs/leads-analytics.md) | Captura de leads, taxonomia de eventos, envs |
| [docs/message-house-cliente-final.md](docs/message-house-cliente-final.md) | Lei de copy do site |

## 🌐 Links úteis

- [Site publicado](https://www.fluxomind.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Repo](https://github.com/fluxomind/fluxomind-site)
- [Cloudflare Dashboard](https://dash.cloudflare.com)

## ✨ Missão da Fluxomind

Democratizar a construção de software com IA para empresas de qualquer tamanho,
utilizando tecnologia no-code, metadados e uma arquitetura escalável, segura e
eficiente.

## 📄 Licença

Este projeto está sob domínio da Fluxomind. Todos os direitos reservados ©.
