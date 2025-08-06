import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simples redirecionamento da raiz para /pt
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pt', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
