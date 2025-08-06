import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Lista de todos os locales suportados
  locales: ['pt', 'en'],
  
  // Locale padrão usado quando nenhum locale é detectado
  defaultLocale: 'pt',
  
  // Sempre usar o prefixo do locale na URL (mesmo para o padrão)
  localePrefix: 'always'
});

export const config = {
  // Aplicar o middleware a todas as rotas exceto:
  // - API routes
  // - Arquivos estáticos (_next/static)
  // - Arquivos na pasta public
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
