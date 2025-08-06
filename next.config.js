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
  // Opções de exportação
  output: 'standalone',
  // Tratar erros durante compilação como warnings
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

module.exports = withNextIntl(nextConfig);
