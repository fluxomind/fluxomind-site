// Destinos de conversão do site.
//
// MOTION: self-serve. O cliente cria a conta direto (PLATFORM_SIGNUP); o acesso
// ao beta é liberado no PROCESSO INTERNO (backend) — sem waitlist por e-mail,
// que não escala e exige triagem manual. Billing/SSO/MFA entram conforme o
// produto abre. Decisão do fundador (2026-06-16): converter por signup, gatear
// o acesso depois.
//
// PLATFORM_SIGNUP → CTA primário de conversão (criar conta / criar meu sistema).
// PLATFORM_CONTACT → trilha enterprise (falar com o time / data room).
// PLATFORM_WAITLIST → NÃO usado por padrão; mantido para campanhas pontuais.

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
