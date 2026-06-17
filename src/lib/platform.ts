// Destinos de conversão do site.
//
// MOTION: beta por convite (pré-lançamento privado). O CTA primário de
// conversão é "pedir acesso / entrar na lista" — NUNCA "criar conta grátis".
// Self-serve aberto (PLG) exige billing/SSO/MFA, que são gaps declarados:
// é roadmap, não fato. Ver _product2/_showcase/message-house.md §4.
//
// PLATFORM_WAITLIST  → CTA primário (pedir acesso ao beta).
// PLATFORM_SIGNUP/LOGIN → uso só de quem JÁ é beta (entrar na plataforma).

export const PLATFORM_BASE = 'https://platform.fluxomind.com';
export const PLATFORM_SIGNUP = `${PLATFORM_BASE}/auth/signup`;
export const PLATFORM_LOGIN = `${PLATFORM_BASE}/auth/login`;

// Captura de acesso ao beta. Sem backend de waitlist no site ainda, o destino
// é um mailto para o contato oficial (mesmo endereço dos Termos). Quando houver
// rota/form de captura, troca-se só aqui — as páginas consomem esta constante.
const WAITLIST_EMAIL = 'contato@fluxomind.com.br';
export const PLATFORM_WAITLIST =
  `mailto:${WAITLIST_EMAIL}` +
  '?subject=' +
  encodeURIComponent('Quero acesso ao beta da Fluxomind') +
  '&body=' +
  encodeURIComponent(
    'Olá! Quero entrar na lista do beta por convite da Fluxomind.\n\n' +
      'Empresa:\nO que eu quero organizar/automatizar:\n',
  );

// Contato do time (enterprise / data room / agendar sessão de arquitetura).
export const PLATFORM_CONTACT =
  `mailto:${WAITLIST_EMAIL}` +
  '?subject=' +
  encodeURIComponent('Falar com o time da Fluxomind');
