import { MetadataRoute } from 'next'
import { NOINDEX_BLOG_SLUGS } from '@/lib/blog-posts-data'

export default function robots(): MetadataRoute.Robots {
  const noindexPaths = Array.from(NOINDEX_BLOG_SLUGS).map((slug) => `/blog/${slug}`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/favicon.ico', ...noindexPaths],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/favicon.ico', ...noindexPaths],
      },
    ],
    sitemap: 'https://unblockdevs.com/sitemap.xml',
  }
}
