import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unblockdevs.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // All blog posts
  const blogPosts = [
    'curl-to-python-requests-complete-guide',
    'json-schema-generator-tutorial',
    '25-broken-json-examples-fix',
    'why-json-breaks-in-real-world-apis',
    'invalid-json-vs-valid-json-examples',
    'how-to-fix-broken-json-without-understanding',
    'top-10-json-errors-waste-developer-time',
    'how-json-fixers-work-internally',
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
    // SEO landing pages - Error fix pages
    {
      url: 'fix-unexpected-end-of-json-input',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'fix-unexpected-token-in-json',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'fix-unexpected-token-less-than-json',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'fix-expected-comma-or-brace-json',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'fix-invalid-control-character-json',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'fix-json-parse-error-javascript',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    // Tool landing pages
    {
      url: 'how-to-fix-broken-json-online',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-fixer-online',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-validator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-formatter',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'curl-to-requests',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-schema-generation',
      priority: 0.9,
      changefreq: 'weekly' as const,
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

