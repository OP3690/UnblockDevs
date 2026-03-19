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
      mainEntityOfPage: canonicalUrl,
      headline: title,
      description,
      datePublished,
      dateModified: datePublished,
      inLanguage: 'en-US',
      author: {
        '@type': 'Organization',
        name: 'UnblockDevs',
      },
      publisher: {
        '@type': 'Organization',
        name: 'UnblockDevs',
        logo: {
          '@type': 'ImageObject',
          url: 'https://unblockdevs.com/icon.png',
        },
      },
      image: 'https://unblockdevs.com/og-image.png',
      keywords,
      url: canonicalUrl,
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
