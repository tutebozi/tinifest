/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.mercadopago.com'],
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'tinifest.com',
          },
        ],
        permanent: true,
        destination: 'https://www.tinifest.com/',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.tinifest.com',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'tinifest.com'
  }
}

module.exports = nextConfig 