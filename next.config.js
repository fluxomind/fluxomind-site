/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // Este é o arquivo de configuração para internacionalização
  './i18n.ts'
);

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Redirecionamento simples da raiz para /pt
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pt',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
