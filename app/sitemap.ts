import { MetadataRoute } from 'next'
import path from 'path'
import fs from 'fs'
import { blogPosts } from '@/lib/blog-posts-data'

const BLOG_PER_PAGE = 6

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unblockdevs.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Blog slugs from filesystem: every app/blog/<slug>/ with page.tsx is in sitemap
  // Exclude slugs that redirect (canonical or off-topic 301 to homepage)
  const redirectOnlyBlogSlugs = [
    'how-ai-creates-art-music-videos-seconds',
    'will-ai-take-over-world-movies-vs-reality',
    'fix-json-parse-error-unexpected-token',
    'fix-unexpected-token-less-than-in-json-api-returns-html',
    'why-json-stringify-returns-undefined-fix',
    'json-stringify-complete-guide',
    'json-format-standards-complete-guide',
    'json-schema-generator-validation-guide',
    'how-to-validate-json-schema-javascript',
  ]
  const offTopicBlogSlugs = [
    'how-to-cancel-audible-subscription-mobile-desktop',
    'how-to-see-deleted-instagram-messages-without-third-party-apps',
    'instagram-password-reset-email-guide',
    'how-to-invest-consistently-usa-tech-stocks',
    'apple-creator-studio-complete-guide',
    'how-to-cancel-amazon-prime-membership-instantly',
    'how-to-cancel-netflix-subscription-without-losing-watch-history',
    'how-to-cancel-spotify-premium-and-get-refund',
    'xbox-game-pass-games-complete-guide',
    'ces-2026-fire-tv-stick-4k-max-project-ava',
  ]
  // Noindex + exclude from sitemap: off-topic (saves crawl budget, keeps topical authority)
  const noindexBlogSlugs = [
    'can-ai-fall-in-love-understanding-ai-emotions',
    'will-ai-take-over-the-world-movies-vs-reality',
    'what-if-ai-disappeared-tomorrow-how-much-life-would-stop',
    'how-ai-creates-art-music-videos-in-seconds',
    'how-ai-makes-money-who-getting-rich',
    '10-real-ways-make-money-with-ai-2026',
    'how-to-make-1000-month-using-ai-if-started-today',
    'passive-income-with-ai-is-it-really-possible',
    'how-students-can-make-money-using-ai-2026',
    // Off-topic (audible, instagram, whatsapp, finance, CES, tech skills, physical AI, etc.)
    'how-to-cancel-audible-subscription-mobile-desktop',
    'how-to-see-deleted-instagram-messages-without-third-party-apps',
    'how-to-change-whatsapp-privacy-settings-maximum-security',
    'instagram-password-reset-email-guide',
    'high-impact-tech-stocks-investment-guide',
    'how-to-invest-consistently-usa-tech-stocks',
    'apple-creator-studio-complete-guide',
    'ces-2026-fire-tv-stick-4k-max-project-ava',
    'most-useful-tech-skills-2026',
    'must-learn-tech-skills-2030',
    'physical-ai-complete-guide',
    'physical-ai-edge-computing-complete-guide',
    'physical-ai-systems-complete-guide',
    'ai-security-platforms-complete-guide',
    'domain-specific-language-models-complete-guide',
    'multiagent-systems-complete-guide',
  ]
  // Old duplicate JSON article slugs (301 to consolidated guides; exclude from sitemap)
  const duplicateJsonRedirectSlugs = [
    'fix-json-parse-error-unexpected-token',
    'fix-unexpected-token-less-than-in-json-api-returns-html',
    'why-json-stringify-returns-undefined-fix',
    'json-stringify-complete-guide',
    'json-format-standards-complete-guide',
    'json-schema-generator-validation-guide',
    'how-to-validate-json-schema-javascript',
  ]
  const blogDir = path.join(process.cwd(), 'app/blog')
  const blogSlugs = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, 'page.tsx')))
    .map((d) => d.name)
    .filter((slug) => !redirectOnlyBlogSlugs.includes(slug) && !offTopicBlogSlugs.includes(slug) && !noindexBlogSlugs.includes(slug) && !duplicateJsonRedirectSlugs.includes(slug))

  // Discover all non-blog app routes from filesystem so no page is ever missing
  function discoverAppRoutes(dir: string, prefix: string): string[] {
    const routes: string[] = []
    const fullPath = path.join(process.cwd(), 'app', dir)
    if (!fs.existsSync(fullPath)) return routes
    const entries = fs.readdirSync(fullPath, { withFileTypes: true })
    for (const e of entries) {
      const rel = prefix ? `${prefix}/${e.name}` : e.name
      if (e.isDirectory()) {
        if (fs.existsSync(path.join(fullPath, e.name, 'page.tsx'))) routes.push(rel)
        routes.push(...discoverAppRoutes(path.join(dir, e.name), rel))
      }
    }
    return routes
  }
  const discoveredRoutes = new Set(discoverAppRoutes('', '').filter((r) => !r.startsWith('blog')))

  // Main pages (explicit list with priorities; discovered routes not in this list get defaults below)
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
      url: 'badges',
      priority: 0.6,
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
      url: 'curl-to-python',
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
      url: 'jwt-decoder',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'base64-encoder',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'password-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'password-audit',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'cors-tester',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'truth-table-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'hash-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'url-encoder',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'uuid-generator',
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
      url: 'json-to-excel',
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
      url: 'data-insights',
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
      url: 'sql-in-generator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'log-unpacker',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'timezone-translator',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'ai-schema-masker',
      priority: 0.85,
      changefreq: 'weekly' as const,
    },
    {
      url: 'json-prompt-shield',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'code-prompt-shield',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'regex-tester',
      priority: 0.85,
      changefreq: 'weekly' as const,
    },
    {
      url: 'speed-test',
      priority: 0.9,
      changefreq: 'monthly' as const,
    },
    {
      url: 'pdf-to-excel-word',
      priority: 0.85,
      changefreq: 'weekly' as const,
    },
    {
      url: 'svg-to-image',
      priority: 0.85,
      changefreq: 'weekly' as const,
    },
    {
      url: 'cron-expression',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: 'markdown-preview',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
  ]

  const mainUrls = new Set(mainPages.map((p) => p.url))

  // Generate sitemap entries: explicit main pages + any discovered route not in mainPages + blog
  // Exclude non-pages (e.g. favicon.ico) so they never appear in sitemap
  const isPageUrl = (url: string) => !url.endsWith('.ico') && !url.endsWith('/favicon.ico')
  const entries: MetadataRoute.Sitemap = [
    // Main pages (explicit list)
    ...mainPages.map((page) => ({
      url: `${baseUrl}/${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    // Any app route discovered from filesystem but not in mainPages (catch-all so no page is missed)
    ...[...discoveredRoutes]
      .filter((url) => !mainUrls.has(url))
      .map((url) => ({
        url: `${baseUrl}/${url}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    // Blog posts (all posts from blog listing)
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: getBlogPriority(slug),
    })),
    // Omit blog?page=2+ from sitemap (those URLs are noindex); keep crawl budget for /blog and post URLs
  ].filter((e) => isPageUrl(e.url))

  return entries
}

function getBlogPriority(slug: string): number {
  const highIntentPrefixes = [
    'fix-',
    'why-my-api-works-in-postman-but-not-in-browser',
    'how-to-validate-json-schema',
    'json-schema',
    'post-json-data-with-curl',
    'decode-jwt',
    'jwt-',
    'unexpected-token',
  ]
  const highIntentContains = [
    'json',
    'api',
    'curl',
    'jwt',
    'schema',
    'error',
    'debug',
    'mask',
    'pii',
    'security',
  ]

  if (highIntentPrefixes.some((prefix) => slug.startsWith(prefix))) return 0.85
  if (highIntentContains.some((token) => slug.includes(token))) return 0.8
  if (slug.includes('guide') || slug.includes('explained')) return 0.7
  return 0.65
}

