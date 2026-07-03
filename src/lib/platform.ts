// Destinos de conversão do site.
//
// MOTION (BCM-07 + decisão do fundador 2026-07-02): o site converte pelo
// ENCANTAMENTO — a demonstração é o funil. CTA primário leva à demo (/#demo);
// a decisão vira "Quero isso no meu negócio" (PLATFORM_BETA, lista do beta) ou
// "Falar com o time" (PLATFORM_CONTACT). Free self-serve aberto NÃO é CTA
// primário (BCM-07: free aberto queima inferência; o cliente chega high-intent).
//
// PLATFORM_SIGNUP permanece exportado para reversão fácil (decisão anterior de
// 2026-06-16), mas nenhuma página deve usá-lo como CTA primário.

export const PLATFORM_BASE = 'https://platform.fluxomind.com';
export const PLATFORM_SIGNUP = `${PLATFORM_BASE}/auth/signup`;
export const PLATFORM_LOGIN = `${PLATFORM_BASE}/auth/login`;

const CONTACT_EMAIL = 'contato@fluxomind.com';

// Pedido de acesso ao beta por e-mail. Desde 2026-07-03 a captura primária é
// o form (BetaForm → /api/beta em /#comecar); este mailto é só o fallback
// exibido quando a entrega do form falha.
export const PLATFORM_BETA =
  `mailto:${CONTACT_EMAIL}` +
  '?subject=' +
  encodeURIComponent('Quero a Fluxomind no meu negócio') +
  '&body=' +
  encodeURIComponent(
    'Olá! Vi a demonstração e quero a Fluxomind operando no meu negócio.\n\n' +
      'Empresa:\nO processo que eu quero delegar:\n',
  );

// Contato do time (adoção em escala / avaliação técnica / segurança).
export const PLATFORM_CONTACT =
  `mailto:${CONTACT_EMAIL}` +
  '?subject=' +
  encodeURIComponent('Falar com o time da Fluxomind');
