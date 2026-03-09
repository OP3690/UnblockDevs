'use client';

import AdUnit from '@/components/AdUnit';

/** AdSense slot IDs (from AdSense → Ads → By ad unit). Env vars override for different environments. */
const SLOT_HEADER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HEADER
    : '1550643245'; // HOR
const SLOT_INARTICLE =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    : '6611398233'; // fluid in-article
const SLOT_FOOTER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    : '4987800735'; // autorelaxed
const SLOT_SIDEBAR =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR
    : '4176806584'; // VER

interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
}

/**
 * Blog layout with manual AdSense units: header (HOR), in-article (fluid), footer (autorelaxed), sidebar (VER).
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 pt-12 sm:pt-16 flex flex-col xl:flex-row gap-6 xl:gap-8">
      <main className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0 w-full overflow-x-hidden">
        {/* Ad 1 — below title (horizontal) */}
        <div className="my-6">
          <AdUnit slot={SLOT_HEADER} format="auto" className="rounded-lg overflow-hidden" />
        </div>
        {/* Ad 2 — in-article (fluid) */}
        <div className="my-6">
          <AdUnit slot={SLOT_INARTICLE} format="fluid" layout="in-article" className="rounded-lg overflow-hidden" />
        </div>
        {children}
        {/* Ad 3 — below article (autorelaxed) */}
        <div className="my-8">
          <AdUnit slot={SLOT_FOOTER} format="autorelaxed" className="rounded-lg overflow-hidden" />
        </div>
      </main>
      {/* Ad 4 — sidebar (vertical) */}
      <div role="region" aria-label="Advertisement" className="hidden xl:block flex-shrink-0 sticky top-24 self-start w-[300px]">
        <AdUnit slot={SLOT_SIDEBAR} format="auto" minHeight={250} className="rounded-lg overflow-hidden" />
      </div>
    </div>
  );
}
