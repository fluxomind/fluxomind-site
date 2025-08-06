import { getRequestConfig } from 'next-intl/server';

// Definições de idiomas suportados
const locales = ['en', 'pt'];
const defaultLocale = 'pt';

export default getRequestConfig(async ({ locale }) => {
  // Fallback para o locale padrão se não for válido
  const localeToUse = locale && locales.includes(locale) ? locale : defaultLocale;
  
  return {
    locale: localeToUse,
    messages: (await import(`./messages/${localeToUse}.json`)).default
  };
});
