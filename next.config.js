/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/enterprise',
        destination: '/acelere',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
