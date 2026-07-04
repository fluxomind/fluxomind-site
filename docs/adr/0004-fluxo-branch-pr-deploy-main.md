# ADR-0004: Fluxo de mudança: branch + PR; deploy automático só na main

- **Status**: Aceito
- **Data**: 2026-07-02

## Contexto

Todo push na `main` publica em produção na Vercel imediatamente. Sem um fluxo
disciplinado, um commit direto equivale a um deploy sem revisão.

## Decisão

- Nenhum commit direto na `main` — **toda mudança entra por feature branch + PR**,
  inclusive hotfix e correção de uma linha.
- Nomenclatura: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`,
  `hotfix/<slug>`.
- A `main` é a branch de produção: merge do PR = deploy.

## Consequências

- PR é a unidade de revisão e de registro — o histórico da `main` vira um log de
  releases legível (ver "O que foi ao ar" em `docs/historico-implantacao.md`).
- Branches abertas ganham preview deploy na Vercel de graça, útil para validar
  antes do merge.
- Fluxo operacional detalhado em `CONTRIBUTING.md`.
