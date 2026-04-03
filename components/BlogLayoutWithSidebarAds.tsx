'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
 * Content-first: article renders before any ads.
 * Sticky sidebar ad on xl+ screens.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="w-full py-6 sm:py-10">
      <AutoBlogArticleSchema />

      {/* Nav buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
        <Link
          href="/tools/json"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
        >
          All Tools
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Article body — content first, no ads blocking */}
      <div className="blog-article-body px-4 sm:px-6 lg:px-8">
        {children}
      </div>

      {/* In-article ad — after content */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mt-10 overflow-hidden rounded-xl px-4 sm:px-6 lg:px-8"
      >
        <AdUnit slot={SLOT_INARTICLE} format="fluid" layout="in-article" className="rounded-xl overflow-hidden" />
      </div>

      {/* Related posts */}
      <div className="mt-12 px-4 sm:px-6 lg:px-8">
        <AutoRelatedBlogPosts />
      </div>

      {/* Footer ad */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mt-10 overflow-hidden rounded-xl bg-zinc-50 px-4 sm:px-6 lg:px-8"
      >
        <AdUnit slot={SLOT_FOOTER} format="autorelaxed" className="rounded-xl overflow-hidden" />
      </div>
    </div>
  );
}
