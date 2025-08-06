import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from './config/i18n';

export function middleware(request: NextRequest) {
  // Verificar se a requisição já tem um locale no caminho
  const pathname = request.nextUrl.pathname;
  
  // Verificar se o caminho já começa com um locale
  const pathnameHasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirecionar para o locale padrão
  // Futuramente, poderia detectar o idioma do navegador do usuário
  const locale = defaultLocale;
  
  // Criar uma nova URL para redirecionamento
  const url = new URL(request.url);
  
  // Definir o caminho com o locale
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  // Redirecionar para a URL com o locale
  return NextResponse.redirect(url);
}

// Configuração de quais rotas o middleware deve processar
export const config = {
  matcher: [
    // Apenas interceptar caminhos que começam com /
    // e ignorar APIs, arquivos estáticos, imagens, etc.
    '/((?!api|_next|static|.*\\.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|public).*)'
  ]
};