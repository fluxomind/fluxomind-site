import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

// Locales suportados
const locales = ['en', 'pt'];

// Para gerar rotas estáticas para cada locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validar o locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Carregar mensagens de forma síncrona
  let messages;
  try {
    messages = require(`../../../messages/${locale}.json`);
  } catch (error) {
    console.error('Erro ao carregar mensagens para locale:', locale, error);
    messages = require(`../../../messages/pt.json`);
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}