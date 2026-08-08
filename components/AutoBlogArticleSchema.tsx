'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts-data';

export default function AutoBlogArticleSchema() {
  const pathname = usePathname();

  const schemas = useMemo(() => {
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
    const ogImageUrl = `https://unblockdevs.com/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 80))}`;

    const timeRequired = readTime
      .replace(' read', '')
      .replace(' min', 'M')
      .replace(/^(\d+)M$/, 'PT$1M');

    const readMinutes = parseInt(readTime) || 8;
    const estimatedWordCount = readMinutes * 200;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': ['BlogPosting', 'TechArticle'],
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
        logo: { '@type': 'ImageObject', url: 'https://unblockdevs.com/icon.png', width: 512, height: 512 },
      },
      image: { '@type': 'ImageObject', url: ogImageUrl, width: 1200, height: 630, caption: title },
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
        description: 'Practical developer guides covering JSON, APIs, Node.js, Python, AI tools, and debugging.',
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

    return { articleSchema, breadcrumbSchema };
  }, [pathname]);

  if (!schemas) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbSchema) }}
      />
    </>
  );
}
