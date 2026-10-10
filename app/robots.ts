import { MetadataRoute } from 'next'
import { NOINDEX_BLOG_SLUGS } from '@/lib/blog-posts-data'

export default function robots(): MetadataRoute.Robots {
  const noindexPaths = Array.from(NOINDEX_BLOG_SLUGS).map((slug) => `/blog/${slug}`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do NOT disallow /_next/ — Google needs /_next/static/ to load CSS, JS, and fonts
        // for proper page rendering. Blocking it causes indexing failures.
        disallow: ['/api/', '/favicon.ico', ...noindexPaths],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/favicon.ico', ...noindexPaths],
      },
    ],
    sitemap: 'https://unblockdevs.com/sitemap.xml',
  }
}
