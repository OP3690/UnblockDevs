'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts-data';

export default function AutoBlogArticleSchema() {
  const pathname = usePathname();

  const schema = useMemo(() => {
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

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      headline: title,
      description,
      datePublished,
      dateModified: datePublished,
      inLanguage: 'en-US',
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
      },
      keywords: keywords.join(', '),
      url: canonicalUrl,
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://unblockdevs.com/blog',
        name: 'UnblockDevs Blog',
        publisher: { '@id': 'https://unblockdevs.com/#organization' },
      },
    };
  }, [pathname]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
