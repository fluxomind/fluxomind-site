import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware é o mais simples possível
// Redireciona somente a raiz para /pt
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redireciona apenas a raiz `/`
  if (pathname === '/') {
    console.log('Middleware redirecionando / para /pt');
    return NextResponse.redirect(new URL('/pt', request.url));
  }

  return NextResponse.next();
}

// Captura apenas a raiz
export const config = {
  matcher: ['/'],
};
