'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';

/** AdSense slot IDs — must match Ads → By ad unit in AdSense dashboard. */
const SLOT_TOP = '1550643245'; // HOR (Display)
const SLOT_BOTTOM = '4987800735'; // HOR_MULTI (Multiplex)
const SLOT_LEFT = '4176806584'; // VER (Display)
const SLOT_RIGHT = '1255275563'; // SQ (Display)
const SLOT_INCONTENT_TOP = '6611398233'; // ART (In-article)
const SLOT_INCONTENT_MID = '4987800735'; // HOR_MULTI (Multiplex)
const SLOT_INCONTENT_BOTTOM = '4987800735'; // HOR_MULTI (Multiplex)

/**
 * Blog layout: wraps all /blog and /blog/[...] routes with AdSense units.
 * Multiple sections so ads appear across top, above article, mid, after article, sidebars, and footer.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const key = pathname ?? 'blog';

  return (
    <>
      {/* Section 1: Top banner */}
      <div
        key={`${key}-top`}
        role="region"
        aria-label="Advertisement"
        className="min-h-[50px] flex items-center justify-center bg-gray-50/50 border-b border-gray-100 py-2 px-2 sm:px-0"
      >
        <AdUnit slot={SLOT_TOP} format="auto" minHeight={50} className="w-full max-w-full" />
      </div>
      {/* Ezoic: top of content (assign in Ezoic dashboard to this ID) */}
      <div
        id="ezoic-pub-ad-placeholder-104"
        role="region"
        aria-label="Advertisement"
        className="w-full empty:hidden"
      />
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:gap-6 xl:gap-8">
          {/* Left sidebar ad — visible from lg (1024px) */}
          <aside
            key={`${key}-left`}
            role="region"
            aria-label="Advertisement"
            className="sticky top-[4.75rem] hidden w-[160px] flex-shrink-0 self-start min-h-[250px] lg:block xl:w-[160px]"
          >
            <AdUnit slot={SLOT_LEFT} format="auto" minHeight={250} className="rounded-lg overflow-hidden w-full" />
          </aside>
          <main className="flex-1 min-w-0 overflow-x-hidden">
            {children}
            {/* Section 3: Mid / after article */}
            <div
              key={`${key}-in-mid`}
              role="region"
              aria-label="Advertisement"
              className="min-h-[90px] sm:min-h-[90px] flex items-center justify-center bg-gray-50/40 rounded-lg my-6"
            >
              <AdUnit slot={SLOT_INCONTENT_MID} format="autorelaxed" minHeight={90} className="w-full rounded-lg overflow-hidden" />
            </div>
          </main>
          {/* Right sidebar ad — visible from lg (1024px) */}
          <aside
            key={`${key}-right`}
            role="region"
            aria-label="Advertisement"
            className="sticky top-[4.75rem] hidden w-[200px] flex-shrink-0 self-start min-h-[250px] lg:block"
          >
            <AdUnit slot={SLOT_RIGHT} format="auto" minHeight={250} className="rounded-lg overflow-hidden w-full" />
          </aside>
        </div>
      </div>
      {/* AdSense: above footer banner */}
      <div
        key={`${key}-above-bottom`}
        role="region"
        aria-label="Advertisement"
        className="min-h-[90px] sm:min-h-[90px] flex items-center justify-center bg-gray-50/40 py-4 px-2"
      >
        <AdUnit slot={SLOT_INCONTENT_BOTTOM} format="autorelaxed" minHeight={90} className="w-full max-w-full" />
      </div>
      {/* Section 4: Bottom banner */}
      <div
        key={`${key}-bottom`}
        role="region"
        aria-label="Advertisement"
        className="min-h-[250px] sm:min-h-[90px] flex items-center justify-center bg-gray-50/50 border-t border-gray-100 py-4 sm:py-6 px-2 sm:px-0"
      >
        <AdUnit slot={SLOT_BOTTOM} format="autorelaxed" minHeight={90} className="w-full max-w-full" />
      </div>
    </>
  );
}
