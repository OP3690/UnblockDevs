import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unblockdevs.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // All blog posts
  const blogPosts = [
    'common-json-mistakes-fix-guide',
    'curl-to-code-converter-2026',
    'debug-api-changes-compare-responses',
    'free-mock-api-generator-guide',
    'best-free-developer-tools-2026',
    'html-tags-explained-guide',
    'advanced-html5-apis-guide',
    'api-payload-size-optimization',
    'api-response-comparator-testing-guide',
    'complete-guide-json-viewer-parser-beautifier',
    'css-explained-guide',
    'curl-to-code-converter-guide',
    'html-interview-questions',
    'json-api-design-patterns',
    'json-best-practices-production-guide',
    'json-format-standards-complete-guide',
    'json-schema-generator-validation-guide',
    'json-to-excel-converter-best-practices',
    'mysql-comma-separated-id-list-guide',
    'seo-optimized-html-markup',
    'structured-log-analysis-tools',
  ]

  // Main pages
  const mainPages = [
    {
      url: '',
      priority: 1.0,
      changefreq: 'daily' as const,
    },
    {
      url: 'json-beautifier',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'blog',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'about',
      priority: 0.7,
      changefreq: 'monthly' as const,
    },
    {
      url: 'privacy-policy',
      priority: 0.5,
      changefreq: 'monthly' as const,
    },
  ]

  // Generate sitemap entries
  const entries: MetadataRoute.Sitemap = [
    // Main pages
    ...mainPages.map((page) => ({
      url: `${baseUrl}/${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    // Blog posts
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return entries
}

