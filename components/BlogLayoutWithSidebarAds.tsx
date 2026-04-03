'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
const SLOT_SIDEBAR =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    : '4176806584';

interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Shared article layout for every blog post.
 * Content-first: article renders before any ads.
 * Sticky sidebar ad on xl+ screens.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 xl:flex xl:gap-12">

      {/* ── Main article column ── */}
      <main className="min-w-0 flex-1">
        <AutoBlogArticleSchema />

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-500 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>
        </div>

        {/* Article body — content first, no ads blocking */}
        <div className="blog-article-body">
          {children}
        </div>

        {/* In-article ad — after content */}
        <div
          role="region"
          aria-label="Advertisement"
          className="mt-10 overflow-hidden rounded-xl"
        >
          <AdUnit slot={SLOT_INARTICLE} format="fluid" layout="in-article" className="rounded-xl overflow-hidden" />
        </div>

        {/* Related posts */}
        <div className="mt-12">
          <AutoRelatedBlogPosts />
        </div>

        {/* Footer ad */}
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
