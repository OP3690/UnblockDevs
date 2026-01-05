/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable CSS optimization in development to prevent caching issues
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config) => {
      // Force CSS to reload properly
      config.cache = false;
      return config;
    },
  }),
  // Redirects configuration
  async redirects() {
    return [
      // No redirects configured - all redirects should be managed in Vercel Dashboard
      // If you see redirects to /lander, remove them from Vercel Dashboard
    ]
  },
}

module.exports = nextConfig

