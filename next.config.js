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
  }
};

module.exports = withNextIntl(nextConfig);
