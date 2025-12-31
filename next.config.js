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
}

module.exports = nextConfig

