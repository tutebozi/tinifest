/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.mercadopago.com'],
    unoptimized: true
  },
  trailingSlash: false,
  reactStrictMode: true
}

module.exports = nextConfig 