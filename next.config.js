/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize production builds
  ...(process.env.NODE_ENV === 'production' && {
    swcMinify: true,
    compress: true,
  }),
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Redirects configuration (keyword URLs → tool pages for SEO)
  async redirects() {
    return [
      {
        source: '/lander',
        destination: '/',
        permanent: true,
      },
      { source: '/json-masking', destination: '/json-prompt-shield', permanent: true },
      { source: '/sql-schema-masking', destination: '/ai-schema-masker', permanent: true },
      { source: '/jwt-decoder', destination: '/token-comparator', permanent: true },
      { source: '/convert-list-to-sql-in', destination: '/sql-in-generator', permanent: true },
      { source: '/comma-separated-list-to-sql', destination: '/sql-in-generator', permanent: true },
    ]
  },
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/apple-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

