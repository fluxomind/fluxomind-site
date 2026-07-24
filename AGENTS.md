# Fluxomind Site Agent Guide

## Project overview

This repository contains the public institutional website for Fluxomind. It is
a bilingual Next.js App Router application deployed on Vercel, with Cloudflare
providing DNS. Most pages are statically generated; `/api/beta` and `/api/event`
are server-side routes for first-party lead capture and analytics.

Read `README.md` for orientation, `docs/arquitetura.md` for the component map,
`CONTRIBUTING.md` for workflow rules, and `docs/adr/` for architectural
decisions.

## Stack and runtime

- Node.js 20.9 or newer; use npm and keep `package-lock.json` authoritative.
- Next.js 16 App Router, React 19, TypeScript 5.9, and Tailwind CSS 4.
- ESLint 9 with Next.js Core Web Vitals and strict type-aware
  `typescript-eslint` rules.
- Vercel hosts the application; Cloudflare manages the canonical
  `www.fluxomind.com` domain.

## Repository map

- `src/app/`: routes, layouts, metadata, sitemap, robots, and API handlers.
- `src/components/`: shared UI and interactive product demonstrations.
- `src/lib/`: content models, analytics, rate limiting, and lead storage.
- `public/`: committed static images, logos, and catalog JSON.
- `docs/`: ADRs, architecture, operational runbooks, copy rules, and upstream
  content contracts.
- `.agents/skills/`: project-local agent skills; `.claude/skills` points here.

## Commands and verification

Install reproducibly with `npm ci`.

- `npm run dev`: start the local development server on port 3000.
- `npm run lint`: strict, type-aware lint; warnings and stale disable comments
  fail the command.
- `npm run lint:fix`: apply safe ESLint fixes, then enforce the same strict gate.
- `npm run typecheck`: run TypeScript without emitting files.
- `npm run build`: create the production build.

Before handing off a code change, run lint, typecheck, and build. There is no
automated test framework yet, so perform the route- or interaction-specific
manual checks described in `docs/runbooks.md`. Do not run `npm run build` while
the development server is using the same worktree.

## Implementation conventions

- Preserve App Router server components by default; add `'use client'` only
  where browser APIs, state, refs, or effects require it.
- Keep strict lint rules enabled. Fix unsafe values, promises, effect behavior,
  and render purity instead of adding blanket suppressions.
- Use type-only imports where required by ESLint and model potentially missing
  dictionary entries accurately rather than relying on non-null assertions.
- Keep formatting consistent with neighboring files. ESLint owns correctness;
  no standalone formatter is configured.
- Reuse existing components, design tokens in `src/app/globals.css`, and
  platform features before adding dependencies or custom infrastructure.
- Keep Portuguese and English route/content counterparts aligned.

## Product and content constraints

- Public copy must follow `docs/message-house-cliente-final.md`; do not invent
  unverified product claims.
- New public routes must be added to `src/app/sitemap.ts`. Private routes stay
  out of the sitemap and must be blocked by `src/app/robots.ts`.
- Changes to lead fields, analytics events, or privacy behavior must update
  `docs/leads-analytics.md` and, when applicable, the privacy pages.
- Changes to use cases must follow `docs/fontes-upstream.md` and ADR-0005.
- Architectural decisions belong in a new ADR; operational changes belong in
  `docs/runbooks.md`.

## Security and data handling

- Never commit `.env` files, webhook URLs, admin tokens, credentials, or local
  lead data under `data/`.
- `LEAD_WEBHOOK_URL`, `EVENTS_WEBHOOK_URL`, and `ADMIN_TOKEN` are external
  secrets managed in Vercel.
- Treat lead payloads and logs as personal data. Preserve validation,
  honeypot, rate limiting, and fail-safe behavior in the API routes.

## Git workflow

Use `feat/`, `fix/`, `docs/`, `chore/`, or `hotfix/` branches and open a pull
request into `main`. A merge to `main` deploys production automatically, so do
not push or merge without explicit user authorization and successful local
verification.
