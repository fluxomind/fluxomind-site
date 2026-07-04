# Runbooks — operação do site fluxomind.com

Procedimentos de rotina e de incidente. Contexto de decisões:
`docs/historico-implantacao.md`. Copy: `docs/message-house-cliente-final.md`.
Analytics/leads em detalhe: `docs/leads-analytics.md`.

## 1. Rodar o site localmente

```bash
npm run dev            # porta 3000
npm run dev -- -p 3010 # porta alternativa
```

- Acesso de outra máquina na mesma rede: `http://<ip-da-máquina>:<porta>`
  (`ipconfig getifaddr en0` dá o IP; o Next escuta em todas as interfaces).
- **Nunca** rode `npm run build` com o dev server de pé na mesma pasta — o
  build corrompe o `.next` em uso. Pare o dev antes, ou builde em outra
  worktree.

## 2. Publicar uma mudança

1. `git fetch origin && git switch -c <tipo>/<slug> origin/main` — **nunca**
   commit direto na `main`.
2. Edite; valide com `npx tsc --noEmit`.
3. Copy nova? Confira o léxico vetado e o tom no
   `docs/message-house-cliente-final.md` (§6 CTAs, §7 léxico).
4. Pare o dev server e rode `npm run build` completo (gate antes do PR).
5. Push + `gh pr create --base main`. Merge só após aprovação.
6. O merge na `main` dispara o deploy automático na Vercel (~1–2 min).
7. Verifique em produção: a página mudada responde e contém a mudança
   (`curl -s https://www.fluxomind.com/<rota> | grep "<marcador>"`).

## 3. Ver os leads

- **Fonte oficial**: planilha "Leads-site" (Drive *Marketing and
  Customer/Leads-Site*). Cada linha = um lead do form.
- Tela interna: `/admin/leads` — em dev, direto; em produção exige
  `?token=<ADMIN_TOKEN>` e **só mostra a instância atual** (serverless não
  persiste arquivo). Use a planilha como verdade.
- Diagnóstico: logs da Vercel com tag `[fm-lead]` (`[fm-lead-hp]` = honeypot).

## 4. Ver o funil (eventos)

- Planilha "site-pageview": cada linha = um evento (`pageview`, `demo_*`,
  `jornada_*` com prop `cenario`, cliques `data-track`). Taxonomia completa em
  `docs/leads-analytics.md`.
- Funil da demo: `pageview(/demo)` → `jornada_start` → `jornada_keep` →
  `jornada_publish` → `jornada_done` → `jornada_beta_click` →
  `beta_form_submitted` (este último cai na planilha de leads).
- Busca orgânica: Google Search Console (propriedade `fluxomind.com`).

## 5. Gerenciar variáveis de ambiente (Vercel)

```bash
vercel env ls production                       # listar
printf '<valor>' | vercel env add NOME production
vercel env rm NOME production
```

- Env nova/alterada **só vale após redeploy**: runbook 6.
- Envs atuais de Production: `LEAD_WEBHOOK_URL`, `EVENTS_WEBHOOK_URL`,
  `ADMIN_TOKEN`. Local (`.env.local`, nunca commitado): `LEAD_WEBHOOK_URL`,
  `ADMIN_TOKEN` — **sem** `EVENTS_WEBHOOK_URL` (não sujar a planilha em teste).

## 6. Redeploy / rollback

```bash
vercel ls --prod                 # lista deployments de produção
vercel redeploy <url-do-deploy>  # rebuilda e realia www.fluxomind.com
```

- **Rollback** = `vercel redeploy` de um deployment anterior saudável (ou
  Vercel Dashboard → Deployments → ⋯ → *Promote to Production*).
- Verificação pós-deploy: `curl -s -o /dev/null -w "%{http_code}"
  https://www.fluxomind.com/` deve dar 200; teste também a rota alterada.

## 7. Incidente: leads não chegam na planilha

Sintoma típico: form mostra o fallback de e-mail (a API devolve 502 quando o
webhook falha). O lead **não se perde na hora**: fica no log `[fm-lead]`
(retenção ~1h–1d — aja rápido).

1. Logs da Vercel → busque `[fm-lead]` → copie os leads do período.
2. Teste o webhook: POST manual na URL do Apps Script (o `LEAD_WEBHOOK_URL`) —
   resposta sã é **302 → echo `{"ok":true}`** (siga o `Location`).
3. Se o Apps Script quebrou: abra a planilha → Extensões → Apps Script →
   Implantar → **Gerenciar implantações**. Confira "Quem pode acessar" =
   **"Qualquer pessoa"** (não "…com Conta do Google" — erro clássico:
   página "Não é possível abrir o arquivo"). Reimplante ("Nova versão"; a URL
   se mantém).
4. Se a URL mudou (nova implantação): atualize `LEAD_WEBHOOK_URL` (runbook 5)
   + redeploy (runbook 6).
5. Reinsira na planilha os leads capturados no passo 1.

O mesmo procedimento vale para eventos (`EVENTS_WEBHOOK_URL`, tag
`[fm-event]`), com menos urgência — evento perdido não é lead perdido.

## 8. Incidente: site fora do ar

1. `curl -sI https://www.fluxomind.com/` — 200? 500? timeout?
2. Vercel Dashboard → Deployments: o último deploy falhou? Veja os build logs.
3. Deploy quebrado → rollback (runbook 6) e corrija na branch com calma.
4. Vercel fora do ar (raro): status.vercel.com; só aguardar.

## 9. Incidente: dados pessoais expostos (LGPD)

Vale para qualquer exposição de dados de leads (planilha compartilhada errado,
webhook vazado, `ADMIN_TOKEN` comprometido, acesso indevido ao Drive).

1. **Contenha**: revogue o acesso (permissão da planilha / rotacione
   `LEAD_WEBHOOK_URL` no Apps Script / troque `ADMIN_TOKEN` — runbooks 5 e 6).
2. **Avalie o risco**: quais titulares, quais dados (nome, e-mail, empresa,
   processo), houve acesso real ou só exposição potencial?
3. **Prazos** (Res. CD/ANPD nº 15/2024; dobrados para agente de pequeno porte,
   Res. CD/ANPD nº 2/2022): incidente com **risco ou dano relevante** aos
   titulares → comunicar **ANPD e titulares em até 6 dias úteis** do
   conhecimento. Comunicação à ANPD pelo formulário no site da ANPD
   (Comunicado de Incidente de Segurança — CIS); aos titulares, pelo e-mail do
   lead.
4. **Registre sempre**: todo incidente — comunicado ou não — fica registrado
   por **no mínimo 5 anos** (data, o que aconteceu, dados afetados, avaliação
   de risco, decisão de comunicar ou não e por quê). Registro no Drive
   (*Marketing and Customer*), fora do repo.
5. Dúvidas de titulares chegam por **privacidade@fluxomind.com** — responder
   acesso/confirmação em até 15 dias (art. 19, LGPD).

## 10. Editar a demo (/demo)

Tudo vive em `src/components/JourneyDemo.tsx` (arquivo grande — leia por
seções). Anatomia:

- **Cenários**: objeto `CENARIOS` (leads / caixa / atendimento), cada um com
  `surface` (`kanban` | `financeiro` | `chats`) e roteamento por regex do texto
  livre. Novo cenário = nova entrada + nova superfície + pill de entrada.
- **Autopilot**: array `CHECKPOINTS` (8 passos); ◀ replay determinístico
  (`resetAll` + `reducedRef`), ▶ avança. Travas: `beginOnce`, `busyRef`,
  `lockRef`; cancelamento por época via `genRef` (Recomeçar incrementa).
- **Persona**: Ally fala com o criador; o agente DENTRO do app do cliente é
  "assistente" genérico. Não misturar (decisão registrada no histórico).
- Teste manual mínimo após mexer: os 3 cenários ponta a ponta via ▶, um ◀,
  um ↺ Recomeçar, e mobile 390 px sem overflow horizontal.

## 11. SEO

- Rota nova no site → adicionar em `src/app/sitemap.ts` (e conferir se não é
  privada; privadas ficam fora e bloqueadas no `robots.ts`).
- FAQ da home alterado → atualizar o `FAQ_JSONLD` em `src/app/page.tsx`
  (duplicação consciente; há comentário no código).
- Indexação: Search Console → Sitemaps (deve constar "Processado") e
  Indexação → Páginas.
