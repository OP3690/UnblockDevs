'use client';

import AdUnit from '@/components/AdUnit';
import AutoBlogArticleSchema from '@/components/AutoBlogArticleSchema';
import AutoRelatedBlogPosts from '@/components/AutoRelatedBlogPosts';

/** AdSense slot IDs (Ads → By ad unit). Env vars override for different environments. */
const SLOT_INARTICLE =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    : '6611398233';
const SLOT_FOOTER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    : '4987800735';

interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Shared article layout for every blog post.
 * Provides a clean reading container with sticky sidebar and well-placed ad units.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <article className="w-full">
      <AutoBlogArticleSchema />

      {/* Ad: in-article fluid */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mb-8 overflow-hidden rounded-xl"
      >
        <AdUnit slot={SLOT_INARTICLE} format="fluid" layout="in-article" className="rounded-xl overflow-hidden" />
      </div>

      {/* Article body */}
      <div className="blog-article-body">
        {children}
      </div>

      {/* Related posts */}
      <div className="mt-12">
        <AutoRelatedBlogPosts />
      </div>

      {/* Ad: after article */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mt-10 overflow-hidden rounded-xl bg-zinc-50"
      >
        <AdUnit slot={SLOT_FOOTER} format="autorelaxed" className="rounded-xl overflow-hidden" />
      </div>
    </article>
  );
}
