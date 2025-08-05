import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales } from '../../config/i18n';

// Importar mensagens estaticamente
import ptMessages from '../../../messages/pt.json';
import enMessages from '../../../messages/en.json';

// Mapeamento de mensagens por locale
const messages: Record<string, any> = {
  'pt': ptMessages,
  'en': enMessages
};

// Para gerar rotas estáticas para cada locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Interface não usa desestruturação de params
interface LocaleLayoutProps {
  children: ReactNode;
  params: any;
}

// Função síncrona para verificar locale
function getLocale(segment: any): string {
  // Obter valor do segmento de URL
  const localeFromSegment = segment && typeof segment === 'string' ? segment : 'pt';
  return localeFromSegment;
}

// Layout sem acessar params.locale diretamente
export default async function LocaleLayout(props: LocaleLayoutProps) {
  // Aguardar params antes de usar
  const awaitedParams = await props.params;

  // Extrair o segmento da URL de forma segura
  const urlSegments = awaitedParams ? Object.values(awaitedParams) : [];
  const localeSegment = urlSegments.length > 0 ? urlSegments[0] : 'pt';

  // Obter locale de forma segura
  const locale = getLocale(localeSegment);

  // Validar o locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Obter mensagens para o locale
  const localeMessages = messages[locale] || messages['pt'];

  // Ajustar o combo existente para exibir apenas PT e EN sem a palavra Idioma
  const localeOptions = ['PT', 'EN'];

  // Renderizar o combo ajustado
  return (
    <NextIntlClientProvider locale={locale} messages={localeMessages}>
      {props.children}
      <select>
        {localeOptions.map((option) => (
          <option key={option} value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
    </NextIntlClientProvider>
  );
}
