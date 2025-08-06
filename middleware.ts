import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Se acessa a raiz /, redireciona para /pt
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pt', request.url));
  }

  // Para outras rotas, deixa passar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)']
};
