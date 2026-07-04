# ADR-0002: Leads e analytics first-party, sem vendor e sem cookies

- **Status**: Aceito
- **Data**: 2026-07-02

## Contexto

O site precisa captar leads do programa beta e medir o funil da demo. Vendors de
analytics (GA4 etc.) trazem cookies → banner de consentimento (LGPD), custo e
dependência externa — desproporcional para um site em fase de incubação.

## Decisão

Captura própria com dois endpoints (`/api/beta` para leads, `/api/event` para
eventos), que logam no host e repassam a webhooks configuráveis por env
(`LEAD_WEBHOOK_URL`, `EVENTS_WEBHOOK_URL` → planilhas via Apps Script).
**Sem cookies**: identificador de sessão anônimo em `sessionStorage`, eventos sem
PII. Detalhe operacional completo em `docs/leads-analytics.md`.

## Consequências

- Sem cookies e sem PII nos eventos → **sem banner de consentimento**; a base
  legal do lead é o consentimento declarado no form (links para `/terms` e
  `/privacidade`).
- O site deixa de ser 100% estático (ver ADR-0001); `output: 'export'` deixa de
  funcionar.
- `LEAD_WEBHOOK_URL` é **obrigatória de fato** em produção: sem ela, leads só
  existem nos logs efêmeros do host.
- Rate-limit em memória, por instância serverless (melhor esforço). Gatilho de
  revisão: migrar para KV/Redis se o tráfego crescer.
- Trocar o destino dos dados (Sheets → CRM → PostHog) é trocar uma env, zero
  código.

## Alternativas consideradas

- **GA4 / vendor de analytics**: descartado — cookies + banner + dependência.
- **Banco de dados próprio**: descartado nesta fase — planilha via webhook cobre
  o volume atual sem infraestrutura nova.
