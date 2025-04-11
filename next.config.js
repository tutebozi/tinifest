/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.vogue.mx',
      },
      {
        protocol: 'https',
        hostname: 'media.glamour.mx',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rollingstone.com',
      },
      {
        protocol: 'https',
        hostname: 'www.billboard.com',
      },
      {
        protocol: 'https',
        hostname: 'cirquemessi.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.goal.com',
      },
      {
        protocol: 'https',
        hostname: 'www.clarin.com',
      },
      {
        protocol: 'https',
        hostname: 'www.infobae.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudfront-us-east-1.images.arcpublishing.com',
      }
    ],
    domains: ['media.vogue.mx', 'media.glamour.mx', 'yt3.googleusercontent.com', 'www.rollingstone.com', 'www.billboard.com', 'cirquemessi.com', 'assets.goal.com', 'www.clarin.com', 'www.infobae.com', 'cloudfront-us-east-1.images.arcpublishing.com'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 