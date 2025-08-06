import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from './config/i18n';

// Função middleware que o Next.js espera
export function middleware(request: NextRequest) {
  // Verificar se a requisição já tem um locale no caminho
  const pathname = request.nextUrl.pathname;
  
  // Verificar se o caminho já começa com um locale
  const pathnameHasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Se já tem locale, não fazer nada
  if (pathnameHasLocale) return;

  // Caso contrário, redirecionar para o locale padrão
  const locale = defaultLocale;
  
  // Criar URL para redirecionamento
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(url);
}

// Configuração para o middleware
export const config = {
  // Matcher mais simples - ignorar apenas arquivos estáticos
  matcher: ['/((?!_next|static|public|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)']
};