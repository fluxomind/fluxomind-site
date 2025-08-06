/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // Este é o arquivo de configuração para internacionalização
  './i18n.ts'
);

const nextConfig = {
  // Configurações para permitir o uso de imagens dos diretórios que têm espaços
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
  },
  // Ignorar avisos do ESLint durante o build
  eslint: {
    // Avisos não vão falhar o build
    ignoreDuringBuilds: true,
  },
  // Ignorar erros de tipo durante o build
  typescript: {
    // Erros de tipo não vão falhar o build
    ignoreBuildErrors: true,
  },
  // Configurar redirecionamento para a página inicial
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pt',
        permanent: true,
        // Garante que este redirecionamento tenha prioridade
        basePath: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
