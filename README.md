# Fluxomind - Plataforma IA-First

Este repositório contém o código-fonte da homepage institucional da **Fluxomind**, uma startup brasileira em fase de incubação que está desenvolvendo uma plataforma IA-First, no-code e baseada em metadados para democratizar o uso da inteligência artificial em empresas de qualquer porte.

## 📦 Stack Tecnológica

- [Next.js 15 (App Router)](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com) (deploy automático via GitHub)
- [Cloudflare](https://cloudflare.com) (gerenciamento de domínio e DNS)
- [GitHub](https://github.com/fluxomind/fluxomind-site) (controle de versão)

## 🚀 Desenvolvimento Local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto localmente.

### Estrutura básica

- `app/page.tsx` → Página principal
- `public/` → Contém imagens SVG e PNG usadas nas seções (ex: hero, about, tech...)
- `src/components/` → Componentes visuais (opcional/futuro)
- `vercel.json` → Ignored Build Step configurado para só realizar deploy automático na branch `main`

## 🔒 Deploy controlado via branch

- `main`: Branch de produção — qualquer push gera deploy automático na Vercel
- `dev`: Branch de desenvolvimento — deploy automático **desativado** via Ignored Build Step personalizado

## 🌐 Links úteis

- [Homepage publicada](https://www.fluxomind.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Repo](https://github.com/fluxomind/fluxomind-site)
- [Cloudflare Dashboard](https://dash.cloudflare.com)

## ✨ Missão da Fluxomind

Democratizar a construção de software com IA para empresas de qualquer tamanho, utilizando tecnologia no-code, metadados e uma arquitetura escalável, segura e eficiente.

## 📄 License

Este projeto está sob domínio da Fluxomind. Todos os direitos reservados ©.
