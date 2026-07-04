# ADR-0005: Catálogo de casos de uso — fonte upstream e regras de publicação

- **Status**: Aceito
- **Data**: 2026-07-04

## Contexto

O site publica páginas de casos de uso (`/casos-de-uso`, PR #32) e a plataforma
mantém um catálogo estratégico de 67 UCs com priorização
(`fluxomind-platform` → `fmd-docs/8-journeys/use-cases/`: `catalog.md` L0,
`matrix.md` L1). Sem vínculo formal, os dois evoluem separados e a copy
pública descola da tese (BCM-07).

## Decisão

**O catálogo da plataforma é a fonte; o site é superfície de renderização.**
O contrato operacional de sincronização (mapa artefato→fonte, crosswalk
cenário↔UC, regras de sync) vive em
[`docs/fontes-upstream.md`](../fontes-upstream.md) — mudou upstream, atualiza
cá; nasceu cá, propõe-se upstream antes de publicar. Este ADR registra as
regras de publicação que decorrem dele:

1. **Rastreabilidade bidirecional**: todo caso em `src/lib/casos.ts` carrega
   `ucIds` conforme o crosswalk; UC publicado ganha `site_ref` no lado da
   plataforma.
2. **Gate de publicação (vigente)**: caso no site exige (a) UC no catálogo,
   (b) shortlist B da matrix e (c) cenário na demo. Catálogo público amplo
   (casos sem demo, CTA direto ao beta) é evolução **proposta, não decidida**
   — depende da calibração da matrix pelo founder.
3. **Vetos de escopo**: família F criador-marketplace é a visão (Fase 4) —
   nunca vira página de caso; família G regulado-governanca são garantias →
   alimentam `/seguranca`. **Verticais (D) só via criadores** (decisão
   travada BCM-07: first-party sem branding de indústria).
4. **Hero comercial = Recuperar Receita** (matrix, anexo): cobrança é o
   primeiro card do hub; o Commercial OS nunca se comunica como "CRM".
5. **Claims gateados por fase**: página de caso só afirma capacidade com
   `fase_minima` compatível com a fase atual (product-plan); ao escalar o
   catálogo, isso vira validação de build.

## Consequências

- Mudança no catálogo/matrix → revisar casos publicados (tabela do
  `CONTRIBUTING.md`); mudanças relevantes geram entrada datada nos changelogs
  dos dois lados.
- Leads por caso (`caso-<slug>` → `beta_form_submitted`) viram input de
  demanda do Ranking A2 (qual expertise de criador recrutar) — o site devolve
  dado ao catálogo.
- Tensão registrada: o cenário `atendimento` usa dados com sabor de clínica
  (`pacientes.xlsx`); a copy do site é horizontal (UC-006/027), mas vale
  generalizar os dados do cenário numa iteração futura.

## Alternativas consideradas

- **Duplicar a taxonomia no site**: descartado — duas fontes divergem em
  semanas.
- **Publicar os 67 de uma vez**: descartado — risco de classificação como
  conteúdo programático e violação do protocolo do próprio catálogo ("nunca
  criar os ~70 arquivos de uma vez").
