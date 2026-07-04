# Contribuindo com o fluxomind-site

Guia do fluxo de trabalho deste repositório. A `main` publica em produção
automaticamente — o fluxo existe para nenhuma mudança chegar lá sem revisão
(ver [ADR-0004](docs/adr/0004-fluxo-branch-pr-deploy-main.md)).

## Fluxo

1. **Crie uma branch** a partir da `main` atualizada:
   `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>` ou `hotfix/<slug>`.
   Nunca commite direto na `main`, nem para correção de uma linha.
2. **Desenvolva e valide localmente**:

   ```bash
   npm install
   npm run dev     # http://localhost:3000
   npm run lint
   npm run build   # o build precisa passar antes do PR
   ```

3. **Abra um PR para a `main`** com descrição do que muda e por quê. Branches
   ganham preview deploy na Vercel — use o link do preview na revisão.
4. **Merge = deploy em produção.** Confira o site publicado após o merge
   (checklist em [docs/runbooks.md](docs/runbooks.md)).

## Regras de conteúdo (copy)

- O [message house](docs/message-house-cliente-final.md) é lei para copy
  pública: respeite o léxico vetado e as claims verificadas (fact-check no
  PR #26). Na dúvida sobre uma claim técnica da plataforma, não afirme.
- Todo link público usa o domínio canônico `www.fluxomind.com`
  ([ADR-0003](docs/adr/0003-dominio-canonico-www-fluxomind-com.md)).

## Documentação: o que atualizar junto com o código

| Se a mudança… | Atualize |
|---|---|
| Cria/remove evento de analytics ou muda o form de leads | [docs/leads-analytics.md](docs/leads-analytics.md) e, se coletar dado novo, a página `/privacidade` |
| Toma uma decisão de arquitetura/engenharia | Novo ADR em [docs/adr/](docs/adr/README.md) |
| Mexe em infraestrutura externa (Vercel, DNS, planilhas, envs) | [docs/historico-implantacao.md](docs/historico-implantacao.md) |
| Muda procedimento de operação/incidente | [docs/runbooks.md](docs/runbooks.md) |
| Adiciona rota pública | `src/app/sitemap.ts` |

## Segredos

Valores de env (`LEAD_WEBHOOK_URL`, `EVENTS_WEBHOOK_URL`, `ADMIN_TOKEN`) vivem
**apenas** na Vercel e no Apps Script. Nunca em commit, doc ou exemplo. Para
reportar vulnerabilidade, veja [SECURITY.md](SECURITY.md).
