import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}