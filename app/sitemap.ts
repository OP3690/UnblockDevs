import { MetadataRoute } from 'next'
import path from 'path'
import fs from 'fs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unblockdevs.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Blog slugs from filesystem: every app/blog/<slug>/ with page.tsx is in sitemap (includes all 18+ new AI blogs)
  const blogDir = path.join(process.cwd(), 'app/blog')
  const blogSlugs = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, 'page.tsx')))
    .map((d) => d.name)

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
      url: 'tools/json',
      priority: 0.85,
      changefreq: 'weekly' as const,
    },
    {
      url: 'about',
      priority: 0.7,
      changefreq: 'monthly' as const,
    },
    {
      url: 'contact',
      priority: 0.6,
      changefreq: 'monthly' as const,
    },
    {
      url: 'privacy-policy',
      priority: 0.5,
      changefreq: 'monthly' as const,
    },
    {
      url: 'terms',
      priority: 0.5,
      changefreq: 'monthly' as const,
    },
    {
      url: 'disclaimer',
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
    {
      url: 'convert-curl-to-http-request',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'curl-to-python-requests',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-stringify-online',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'prompt-chunker',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'token-comparator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'har-to-curl',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'curl-failure-root-cause-engine',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'api-comparator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-comparator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'log-explorer',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'payload-analyzer',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'curl-converter',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'mock-api-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'test-data-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'config-comparator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'sql-formatter',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-builder',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'data-insights',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'timezone-translator',
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
    // Blog posts (all posts from blog listing, including 18+ new AI blogs)
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return entries
}

