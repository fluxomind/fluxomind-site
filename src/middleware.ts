import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from './config/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  
  const pathnameHasLocale = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // ✅ Se já tem locale, continuar o processamento normalmente
  if (pathnameHasLocale) return NextResponse.next();

  // Se não tiver locale, redirecionar para o default
  const locale = defaultLocale;
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!_next|static|public|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
};
