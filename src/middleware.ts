import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from './config/i18n';

export function middleware(request: NextRequest) {
  // Adicionando logs para depurar em produção
  console.log('Middleware executado para:', request.nextUrl.pathname);
  
  const pathname = request.nextUrl.pathname;
  
  // Se for a rota raiz, deixe o page.tsx lidar com o redirecionamento
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  const pathnameHasLocale = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // ✅ Se já tem locale, continuar o processamento normalmente
  if (pathnameHasLocale) return NextResponse.next();

  // Se não tiver locale, redirecionar para o default
  const locale = defaultLocale;
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(url);
}

export const config = {
  // Matcher mais abrangente para capturar todas as rotas necessárias
  matcher: [
    // Capture todas as rotas, exceto as que devem ser ignoradas
    '/((?!api|_next|_vercel|static|public|favicon.ico|.*\\..*|.*\\.json).*)',
    // Captura explicitamente a rota raiz
    '/'
  ],
};
