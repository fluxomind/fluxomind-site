import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Definir os locales suportados
export const locales = ['en', 'pt'];
export const defaultLocale = 'pt';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}) {
  // Validar o locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Carregar mensagens
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    // Sem variável de erro, já que não a utilizamos
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
