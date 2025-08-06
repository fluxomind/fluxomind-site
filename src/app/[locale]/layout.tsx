import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales } from '../../config/i18n';

// Importar mensagens estaticamente
import ptMessages from '../../../messages/pt.json';
import enMessages from '../../../messages/en.json';

// Define um tipo mais adequado para as mensagens
type MessageDictionary = Record<string, unknown>;

// Mapeamento de mensagens por locale
const messages: Record<string, MessageDictionary> = {
  'pt': ptMessages,
  'en': enMessages
};

// Para gerar rotas estáticas para cada locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Interface com tipos específicos para layout do Next.js 14+
interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale?: string } | Record<string, string>>;
}

// Função síncrona para verificar locale
function getLocale(segment: string | undefined): string {
  // Obter valor do segmento de URL
  const localeFromSegment = segment && typeof segment === 'string' ? segment : 'pt';
  return localeFromSegment;
}

// Layout sem acessar params.locale diretamente
export default async function LocaleLayout(props: LocaleLayoutProps) {
  // Aguardar params antes de usar
  const awaitedParams = await props.params;

  // Extrair o locale de forma segura
  let localeSegment: string | undefined;
  
  if ('locale' in awaitedParams) {
    // Se params tem propriedade 'locale' diretamente
    localeSegment = awaitedParams.locale as string;
  } else {
    // Caso contrário tente extrair de Object.values
    const urlSegments = Object.values(awaitedParams);
    localeSegment = urlSegments.length > 0 ? urlSegments[0] as string : undefined;
  }

  // Obter locale de forma segura
  const locale = getLocale(localeSegment);

  // Validar o locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Obter mensagens para o locale
  const localeMessages = messages[locale] || messages['pt'];

  return (
    <NextIntlClientProvider locale={locale} messages={localeMessages}>
      {props.children}
    </NextIntlClientProvider>
  );
}
