/**
 * AutoBlogArticleSchema — Server Component
 *
 * Injects BlogPosting + BreadcrumbList JSON-LD for blog post pages.
 * Reads the current pathname from the x-pathname request header set by
 * middleware.ts — no 'use client' or usePathname() required, so Googlebot
 * sees the schema in the initial HTML rather than only after JS hydration.
 */
import { headers } from 'next/headers';
import { blogPosts } from '@/lib/blog-posts-data';

export default async function AutoBlogArticleSchema() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/';

  if (!pathname?.startsWith('/blog/')) return null;

  const slug = pathname.replace('/blog/', '').split('/')[0];
  if (!slug || slug.includes('?')) return null;

  const post = blogPosts.find((item) => item.slug === slug);
  const canonicalUrl = `https://unblockdevs.com/blog/${slug}`;

  const title = post?.title ?? 'Developer Guide';
  const description = post?.excerpt ?? 'Developer troubleshooting and implementation guide.';
  const datePublished = post?.date ?? '2026-01-01';
  const keywords = post?.keywords ?? [];
  const category = post?.category ?? 'Developer Guides';
  const readTime = post?.readTime ?? '8 min read';

  const timeRequired = readTime
    .replace(' read', '')
    .replace(' min', 'M')
    .replace(/^(\d+)M$/, 'PT$1M');

  // Estimate word count from read time (avg 200 wpm reading speed)
  const readMinutes = parseInt(readTime) || 8;
  const estimatedWordCount = readMinutes * 200;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    timeRequired,
    inLanguage: 'en-US',
    wordCount: estimatedWordCount,
    articleSection: category,
    // Person entity: required for E-E-A-T. Google weighs named human authors
    // more heavily than Organization for expertise signals on technical content.
    author: [
      {
        '@type': 'Person',
        '@id': 'https://unblockdevs.com/about#author',
        name: 'UnblockDevs Editorial Team',
        url: 'https://unblockdevs.com/about',
        email: 'support@unblockdevs.com',
        worksFor: { '@id': 'https://unblockdevs.com/#organization' },
        knowsAbout: [
          'JSON formatting and validation',
          'API debugging and testing',
          'curl command conversion',
          'JWT tokens and authentication',
          'JavaScript and Node.js development',
          'Python development',
          'SQL databases',
          'AI-safe developer workflows',
          'CORS and HTTP headers',
        ],
      },
      {
        '@type': 'Organization',
        '@id': 'https://unblockdevs.com/#organization',
        name: 'UnblockDevs',
        url: 'https://unblockdevs.com',
      },
    ],
    publisher: {
      '@type': 'Organization',
      '@id': 'https://unblockdevs.com/#organization',
      name: 'UnblockDevs',
      url: 'https://unblockdevs.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://unblockdevs.com/icon.png',
        width: 512,
        height: 512,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://unblockdevs.com/og-image.png',
      width: 1200,
      height: 630,
      caption: title,
    },
    keywords: keywords.join(', '),
    url: canonicalUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.prose p:first-of-type'],
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://unblockdevs.com/blog',
      name: 'UnblockDevs Blog',
      description:
        'Practical developer guides covering JSON, APIs, Node.js, Python, AI tools, and debugging.',
      publisher: { '@id': 'https://unblockdevs.com/#organization' },
    },
    about: { '@type': 'Thing', name: category },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://unblockdevs.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
