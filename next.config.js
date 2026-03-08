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
  // Redirects configuration (keyword URLs → tool pages for SEO; fix 404 blog URLs)
  async redirects() {
    return [
      {
        source: '/lander',
        destination: '/',
        permanent: true,
      },
      { source: '/json-masking', destination: '/json-prompt-shield', permanent: true },
      { source: '/sql-schema-masking', destination: '/ai-schema-masker', permanent: true },
      { source: '/convert-list-to-sql-in', destination: '/sql-in-generator', permanent: true },
      { source: '/comma-separated-list-to-sql', destination: '/sql-in-generator', permanent: true },
      // Blog 404 fixes: old/mismatched slugs → correct blog or tool
      { source: '/blog/json-comparator', destination: '/json-comparator', permanent: true },
      { source: '/blog/json-schema-generation-complete-guide', destination: '/blog/json-schema-generator-tutorial', permanent: true },
      { source: '/blog/fix-json-parse-error-javascript', destination: '/blog/fix-json-parse-error-unexpected-token', permanent: true },
      { source: '/blog/how-to-fix-broken-json-online', destination: '/blog/how-to-fix-broken-json-without-understanding', permanent: true },
      // Orphan blog slugs → canonical (so blog index can link to one URL)
      { source: '/blog/how-ai-creates-art-music-videos-seconds', destination: '/blog/how-ai-creates-art-music-videos-in-seconds', permanent: true },
      { source: '/blog/will-ai-take-over-world-movies-vs-reality', destination: '/blog/will-ai-take-over-the-world-movies-vs-reality', permanent: true },
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

