import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './src/config/i18n';

// Configuração para Next-Intl - simplificada e com tratamento de erros
export default getRequestConfig(async ({ locale }) => {
  // Fallback para o locale padrão se não for válido
  const localeToUse = locale && locales.includes(locale as string) ? locale : defaultLocale;
  
  // Carregamento dinâmico das mensagens para o locale com tratamento de erros
  let messages;
  try {
    messages = (await import(`./messages/${localeToUse}.json`)).default;
  } catch (error) {
    // Fallback para mensagens padrão em caso de erro
    messages = (await import(`./messages/${defaultLocale}.json`)).default;
  }
  
  return {
    locale: localeToUse,
    messages
  };
});
