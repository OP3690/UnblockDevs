'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts-data';

export default function AutoBlogArticleSchema() {
  const pathname = usePathname();

  const schemas = useMemo(() => {
    if (!pathname || !pathname.startsWith('/blog/')) return null;

    const slug = pathname.replace('/blog/', '').split('/')[0];
    if (!slug || slug.includes('?')) return null;

    const post = blogPosts.find((item) => item.slug === slug);
    const canonicalUrl = `https://unblockdevs.com/blog/${slug}`;

    // Fallbacks ensure schema still exists even when a post is not in blogPosts data.
    const title = post?.title ?? (typeof document !== 'undefined' ? document.title.replace(/\s*\|\s*UnblockDevs\s*$/i, '') : 'Developer Guide');
    const description =
      post?.excerpt ??
      (typeof document !== 'undefined'
        ? document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Developer troubleshooting and implementation guide.'
        : 'Developer troubleshooting and implementation guide.');
    const datePublished = post?.date ?? '2026-01-01';
    const keywords = post?.keywords ?? [];
    const category = post?.category ?? 'Developer Guides';
    const readTime = post?.readTime ?? '8 min read';

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      headline: title,
      description,
      datePublished,
      dateModified: datePublished,
      timeRequired: readTime.replace(' read', '').replace(' min', 'M').replace(/^(\d+)M$/, 'PT$1M'),
      inLanguage: 'en-US',
      articleSection: category,
      author: {
        '@type': 'Organization',
        '@id': 'https://unblockdevs.com/#organization',
        name: 'UnblockDevs',
        url: 'https://unblockdevs.com',
        description: 'Free developer tools and practical debugging guides for JSON, APIs, curl, and AI-safe workflows.',
        sameAs: [
          'https://unblockdevs.com/about',
          'https://unblockdevs.com/blog',
        ],
      },
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
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://unblockdevs.com/blog',
        name: 'UnblockDevs Blog',
        description: 'Practical developer guides covering JSON, APIs, Node.js, Python, AI tools, and debugging.',
        publisher: { '@id': 'https://unblockdevs.com/#organization' },
      },
      about: {
        '@type': 'Thing',
        name: category,
      },
    };

    // BreadcrumbList — enables breadcrumb display in Google search results
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://unblockdevs.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://unblockdevs.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: canonicalUrl,
        },
      ],
    };

    return [articleSchema, breadcrumbSchema];
  }, [pathname]);

  if (!schemas) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
