'use client';

import AdUnit from '@/components/AdUnit';
import AutoBlogArticleSchema from '@/components/AutoBlogArticleSchema';
import AutoRelatedBlogPosts from '@/components/AutoRelatedBlogPosts';

/** AdSense slot IDs (Ads → By ad unit). Env vars override for different environments. */
const SLOT_HEADER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER
    : '1550643245';
const SLOT_INARTICLE =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    : '6611398233';
const SLOT_FOOTER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    : '4987800735';
const SLOT_SIDEBAR =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    : '4176806584';

interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
}

/**
 * Shared article layout for every blog post.
 * Provides a clean reading container with sticky sidebar and well-placed ad units.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 xl:flex xl:gap-12">

      {/* ── Main article column ── */}
      <main className="min-w-0 flex-1">
        <AutoBlogArticleSchema />

        {/* Ad: below page title, horizontal */}
        <div
          role="region"
          aria-label="Advertisement"
          className="mb-8 overflow-hidden rounded-xl bg-zinc-50"
        >
          <AdUnit slot={SLOT_HEADER} format="auto" className="rounded-xl overflow-hidden" />
        </div>

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
      </main>

      {/* ── Sticky sidebar ad (xl only) ── */}
      <aside
        role="region"
        aria-label="Advertisement"
        className="hidden xl:block xl:w-[300px] xl:flex-shrink-0"
      >
        <div className="sticky top-24">
          <AdUnit
            slot={SLOT_SIDEBAR}
            format="auto"
            minHeight={250}
            className="rounded-xl overflow-hidden w-full"
          />
        </div>
      </aside>

    </div>
  );
}
