import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './src/config/i18n';

// Configuração para Next-Intl
export default getRequestConfig(async ({ locale }) => {
  // Fallback para o locale padrão se não for válido
  const localeToUse = locale && locales.includes(locale as any) ? locale : defaultLocale;
  
  // Carregamento dinâmico das mensagens para o locale
  return {
    locale: localeToUse,
    messages: (await import(`./messages/${localeToUse}.json`)).default
  };
});
