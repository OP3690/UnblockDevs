/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
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
      // Off-topic posts (topical dilution): 301 to homepage so Google drops them and domain focus improves
      { source: '/blog/how-to-cancel-audible-subscription-mobile-desktop', destination: '/', permanent: true },
      { source: '/blog/how-to-see-deleted-instagram-messages-without-third-party-apps', destination: '/', permanent: true },
      { source: '/blog/instagram-password-reset-email-guide', destination: '/', permanent: true },
      { source: '/blog/how-to-invest-consistently-usa-tech-stocks', destination: '/', permanent: true },
      { source: '/blog/apple-creator-studio-complete-guide', destination: '/', permanent: true },
      { source: '/blog/how-to-cancel-amazon-prime-membership-instantly', destination: '/', permanent: true },
      { source: '/blog/how-to-cancel-netflix-subscription-without-losing-watch-history', destination: '/', permanent: true },
      { source: '/blog/how-to-cancel-spotify-premium-and-get-refund', destination: '/', permanent: true },
      { source: '/blog/xbox-game-pass-games-complete-guide', destination: '/', permanent: true },
      { source: '/blog/ces-2026-fire-tv-stick-4k-max-project-ava', destination: '/', permanent: true },
      // Duplicate JSON articles → consolidated guides (fix keyword cannibalization)
      { source: '/blog/fix-json-parse-error-unexpected-token', destination: '/blog/fix-json-errors-complete-guide', permanent: true },
      { source: '/blog/fix-unexpected-token-less-than-in-json-api-returns-html', destination: '/blog/fix-json-errors-complete-guide', permanent: true },
      { source: '/blog/why-json-stringify-returns-undefined-fix', destination: '/blog/fix-json-errors-complete-guide', permanent: true },
      { source: '/blog/json-stringify-complete-guide', destination: '/blog/json-schema-complete-guide', permanent: true },
      { source: '/blog/json-format-standards-complete-guide', destination: '/blog/json-schema-complete-guide', permanent: true },
      { source: '/blog/json-schema-generator-validation-guide', destination: '/blog/json-schema-complete-guide', permanent: true },
      { source: '/blog/how-to-validate-json-schema-javascript', destination: '/blog/json-schema-complete-guide', permanent: true },
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
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig

