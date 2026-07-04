# Leads & Analytics do site

O site captura leads e eventos de funil **first-party** — sem vendor, sem cookies, sem
banner de consentimento. Dois endpoints (`/api/beta`, `/api/event`) logam sempre no host
e repassam a webhooks quando configurados.

## Configuração (env)

| Variável | O que recebe | Obrigatória? |
|---|---|---|
| `LEAD_WEBHOOK_URL` | POST JSON de cada lead do form do beta | **Obrigatória de fato antes de publicar** — sem ela, leads existem só nos logs do host, que na Vercel são apagados em ~1h (Hobby) a 1 dia (Pro) |
| `EVENTS_WEBHOOK_URL` | POST JSON de cada evento de analytics | Opcional (perder eventos dói menos que perder lead) |

Qualquer receptor de JSON serve: Google Apps Script → Sheets, Slack incoming webhook,
CRM, PostHog capture endpoint. Trocar de destino = trocar a env, zero código.

### Receptor mínimo — Google Sheets (Apps Script)

1. Numa planilha, Extensões → Apps Script, cole:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  // sanitiza contra injeção de fórmula: célula começando com = + - @
  // seria executada pelo Sheets ao abrir a planilha
  const s = (v) =>
    typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    s(d.ts), s(d.nome || ''), s(d.email || d.event || ''), s(d.empresa || ''),
    s(d.processo || JSON.stringify(d.props || {})), s(d.source || d.path || ''),
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> Os campos vêm de um form público — a sanitização acima não é opcional.

2. Implantar → App da Web → executar como você, acesso "Qualquer pessoa".
3. A URL gerada é o valor de `LEAD_WEBHOOK_URL`.

## Formato do lead (`/api/beta`)

```json
{ "nome": "…", "email": "…", "empresa": "…", "processo": "…",
  "ts": "2026-07-03T12:00:00.000Z", "source": "site-beta-form" }
```

Proteções: honeypot (campo `site`), validação de e-mail, rate-limit 5/h por IP.
Se o webhook falhar, a API devolve 502 e o form oferece o fallback por e-mail
(`PLATFORM_BETA`); o lead já ficou registrado no log (`[fm-lead]`).

## Taxonomia de eventos (`/api/event`)

| Evento | Quando | Props |
|---|---|---|
| `pageview` | Toda troca de rota | — |
| `click` | Clique em elemento com `data-track` | `id` |
| `demo_run` | Visitante rodou o Ato 1 | `scenario`, `matched` |
| `demo_built` | Ato 1 concluído (app "pronto") | `scenario` |
| `demo_ops_run` | Visitante iniciou o Ato 2 (operar) | `scenario` |
| `demo_ops_done` | Ato 2 concluído — o momento de convicção | `scenario` |
| `demo_beta_click` / `demo_contact_click` | CTA ao fim da demo | — |
| `jornada_start` | Iniciou a jornada interativa (/demo) | `entry` (planilha \| prosa-livre), `cenario` (leads \| caixa \| atendimento) |
| `jornada_stage` | Avançou de etapa na jornada | `stage` (0-7), `label`, `cenario` (leads \| caixa \| atendimento) |
| `jornada_touch` | Operou o rascunho vivo (1ª interação no app) | — |
| `jornada_keep` | "Ficar com ele" — aprovou vendo (convicção) | — |
| `jornada_hitl_ok` | Aprovou a 1ª ação do assistente | — |
| `jornada_publish` | Publicou o app para o time | — |
| `jornada_done` | Jornada completa (evoluiu por conversa) | — |
| `jornada_recomecar` | Reiniciou a demo pela topbar (escolher outro exemplo) | `cenario` (o que estava ativo) |
| `jornada_beta_click` | CTA ao fim da jornada | — |
| `beta_form_submitted` / `beta_form_error` | Form do beta | — |

`data-track` em uso: `como-beta-cta`, `home-contact-cta`, `precos-beta-cta`,
`oquetem-beta-cta`, `porque-beta-cta`, `beta-mailto-fallback`,
`acelere-contact-cta`, `plataforma-contact-cta`, `seguranca-contact-cta`.

**O funil que importa** (BCM: instrumentar tudo):
`pageview(/)` → `demo_run` → `demo_built` → `demo_ops_run` → `demo_ops_done` →
`demo_beta_click` → `beta_form_submitted`.

**O funil da jornada interativa** (/demo):
`pageview(/demo)` → `jornada_start` → `jornada_touch` → `jornada_keep` →
`jornada_hitl_ok` → `jornada_publish` → `jornada_done` → `jornada_beta_click` →
`beta_form_submitted`.

## Ver os leads

Três formas, da mais direta à mais durável:

1. **`/admin/leads`** — tabela interna (não linkada, noindex). Lê o arquivo local
   `data/leads.ndjson`, onde `/api/beta` grava todo lead (inclusive honeypot, marcado).
   Em dev: acesso direto. Em produção: exige `?token=<ADMIN_TOKEN>` (env) — sem
   `ADMIN_TOKEN` configurado, a página retorna 404. **Requer filesystem persistente**
   (VM, Cloud Run com volume); na Vercel o arquivo não persiste entre execuções.
2. **Logs do host** — tag `[fm-lead]` (`[fm-lead-hp]` para honeypot). Efêmeros.
3. **Planilha/CRM via `LEAD_WEBHOOK_URL`** — o destino durável recomendado (abaixo).

Env extra: `ADMIN_TOKEN` (token da página interna) e `LEADS_FILE` (caminho do NDJSON;
padrão `<projeto>/data/leads.ndjson`).

## Deploy

- As rotas `/api/*` convertem o site de 100% estático para **serverful**: as páginas
  seguem estáticas, mas o host precisa executar funções (Vercel serverless, Cloud Run
  etc.). Export estático puro (`output: 'export'`) deixa de funcionar.
- **Logs não são armazenamento.** Na Vercel, runtime logs sem Log Drain são retidos por
  ~1h (Hobby) a 1 dia (Pro). O `[fm-lead]` no log é um amortecedor de falha do webhook,
  não um banco — por isso `LEAD_WEBHOOK_URL` é obrigatória de fato. Se configurar um
  Log Drain como backup, lembre: ele passa a reter PII → definir retenção (LGPD).
- O rate-limit é **em memória, por instância** serverless (melhor esforço): instâncias
  frias/paralelas têm contadores próprios. Suficiente contra flood barato no beta;
  para garantia real, mover para um store compartilhado (KV/Redis) quando houver deploy
  definitivo.

## Privacidade

Sem cookies. Identificador de sessão anônimo em `sessionStorage` (morre com a aba).
Eventos não carregam PII; o lead carrega os dados que a pessoa digitou, com
consentimento declarado no form (links para /terms e /privacidade). As práticas
descritas aqui estão espelhadas na política de privacidade pública
(`/privacidade`) — **mudou a coleta? Atualize a política junto.** Se um dia
entrar vendor com cookies, aí sim revisar consentimento.
