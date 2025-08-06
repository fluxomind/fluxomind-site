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
};

module.exports = withNextIntl(nextConfig);
