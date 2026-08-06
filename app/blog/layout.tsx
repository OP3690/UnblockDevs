'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import StickyMobileAd from '@/components/StickyMobileAd';

/**
 * AdSense slot IDs — each used in exactly ONE position so pushedSlots
 * deduplication never blocks a render.
 *
 * HOR (1550643245)    → top leaderboard banner
 * VER (4176806584)    → left sidebar (desktop) / sticky mobile bottom
 * SQ  (1255275563)    → right sidebar (desktop, 300px → medium rectangle)
 * ART (6611398233)    → in-article (inside BlogLayoutWithSidebarAds, mid content)
 * MPX (4987800735)    → single footer multiplex (one usage only)
 */
const SLOT_TOP   = '1550643245';
const SLOT_LEFT  = '4176806584';
const SLOT_RIGHT = '1255275563';
const SLOT_FOOTER = '4987800735';

/**
 * Blog layout: wraps all /blog and /blog/[...] routes.
 * Each slot ID used exactly once → no silent skips from the pushedSlots guard.
 * Desktop: top banner + 200px left + 300px right sidebars (medium rectangle).
 * Mobile: top banner + sticky bottom (via StickyMobileAd).
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const key = pathname ?? 'blog';

  return (
    <>
      {/* Top leaderboard — full-width, above article */}
      <div
        key={`${key}-top`}
        role="region"
        aria-label="Advertisement"
        className="flex items-center justify-center border-b border-zinc-100 bg-zinc-50/60 py-2 px-2 sm:px-0"
        style={{ minHeight: 60 }}
      >
        <AdUnit slot={SLOT_TOP} format="auto" minHeight={50} className="w-full max-w-full" />
      </div>

      <div className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col xl:flex-row xl:gap-6 2xl:gap-8">

          {/* Left sidebar — 200px at xl+ */}
          <aside
            key={`${key}-left`}
            role="region"
            aria-label="Advertisement"
            className="sticky top-[4.75rem] hidden w-[200px] flex-shrink-0 self-start min-h-[600px] xl:block"
          >
            <AdUnit slot={SLOT_LEFT} format="auto" minHeight={250} minWidth={0} className="rounded-lg overflow-hidden w-full" />
          </aside>

          {/* Article content */}
          <main className="flex-1 min-w-0 overflow-x-hidden">
            {children}
          </main>

          {/* Right sidebar — 300px at xl+ (medium rectangle 300×250 → highest CTR display) */}
          <aside
            key={`${key}-right`}
            role="region"
            aria-label="Advertisement"
            className="sticky top-[4.75rem] hidden w-[300px] flex-shrink-0 self-start min-h-[600px] xl:block"
          >
            <AdUnit slot={SLOT_RIGHT} format="auto" minHeight={250} minWidth={0} className="rounded-lg overflow-hidden w-full" />
          </aside>

        </div>
      </div>

      {/* Footer multiplex — once, below article */}
      <div
        key={`${key}-footer`}
        role="region"
        aria-label="Advertisement"
        className="flex items-center justify-center border-t border-zinc-100 bg-zinc-50/60 py-4 px-2"
        style={{ minHeight: 90 }}
      >
        <AdUnit slot={SLOT_FOOTER} format="autorelaxed" minHeight={90} className="w-full max-w-full" />
      </div>

      {/* Sticky bottom banner on mobile/tablet (xl:hidden is inside the component) */}
      <StickyMobileAd />
    </>
  );
}
