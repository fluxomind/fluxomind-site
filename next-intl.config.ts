import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './src/middleware';

export default getRequestConfig(async ({ locale }) => {
  const localeToUse = locale && locales.includes(locale as any) ? locale : defaultLocale;
  
  return {
    locale: localeToUse,
    messages: (await import(`./messages/${localeToUse}.json`)).default
  };
});
