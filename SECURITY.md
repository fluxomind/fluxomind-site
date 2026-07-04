# Política de Segurança

## Reportando uma vulnerabilidade

Se você encontrou uma vulnerabilidade no site www.fluxomind.com ou neste
repositório, reporte de forma privada:

- **E-mail**: contato@fluxomind.com (assunto: `[SECURITY]`)
- **Não** abra issue ou PR público com detalhes da vulnerabilidade antes da
  correção.

Inclua, se possível: passos para reproduzir, impacto estimado e URL/rota
afetada. Respondemos em até 5 dias úteis e mantemos você informado até a
resolução.

## Escopo

- Site em produção (`www.fluxomind.com`), incluindo as rotas `/api/*`.
- Especial interesse: qualquer forma de acessar dados de leads sem autorização,
  bypass do rate-limit/honeypot do form, e exposição de variáveis de ambiente.

## Fora de escopo

- Ataques de negação de serviço (DoS/DDoS) e spam volumétrico.
- Relatórios de scanners automáticos sem prova de exploração.
- Engenharia social contra o time.
