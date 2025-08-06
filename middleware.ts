import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignora rotas públicas
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Se está em "/", redirecionar para /pt
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/pt';
    return NextResponse.redirect(url);
  }

  // Rodar o middleware do next-intl normalmente
  return createMiddleware({
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    localePrefix: 'always'
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
