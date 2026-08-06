'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import StickyMobileAd from '@/components/StickyMobileAd';

/** AdSense slot IDs */
const SLOT_LEFT        = '4176806584';  // VER  — desktop left sidebar / StickyMobileAd (mobile, safe)
const SLOT_RIGHT       = '1255275563';  // SQ   — desktop right sidebar (300px, medium rectangle)
const SLOT_ABOVE       = '4987800735';  // MPX  — horizontal banner above tool content (all screens)
const SLOT_MOBILE      = '1550643245';  // HOR  — in-content below tool on mobile (<xl)
const SLOT_BELOW_DESK  = '1130443324';  // HOR2 — below-tool banner desktop only (xl+)

/** First path segment that should NOT get sidebar ads. */
const NO_SIDEBAR_SEGMENTS = new Set([
  '',
  'blog',
  'about',
  'contact',
  'terms',
  'privacy-policy',
  'disclaimer',
  'badges',
  'tools',
  'api',
]);

function useIsToolPage(): boolean {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return false;
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return !NO_SIDEBAR_SEGMENTS.has(segment);
}

/**
 * Wraps children with sidebar ads on desktop (xl+) and a horizontal in-content
 * ad below the tool output on mobile/tablet (< xl, where sidebars are hidden).
 * Right sidebar is 300px to serve the medium rectangle (300×250) — the highest-CTR
 * display format. Left is 200px for standard vertical units.
 */
export default function ToolPagesAdWrap({ children }: { children: React.ReactNode }) {
  const isToolPage = useIsToolPage();

  if (!isToolPage) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col px-3 py-2 sm:py-4 sm:px-5 lg:px-6 xl:flex-row xl:items-start xl:gap-6 xl:px-8">
        {/* Left sidebar — 200px at xl+ */}
        <aside
          role="region"
          aria-label="Advertisement"
          className="sticky top-[4.75rem] order-first hidden min-h-[250px] w-[200px] min-w-0 max-w-[200px] flex-shrink-0 overflow-hidden self-start xl:block"
        >
          <AdUnit
            slot={SLOT_LEFT}
            format="auto"
            minHeight={250}
            minWidth={0}
            className="w-full max-w-full overflow-hidden rounded-lg"
          />
        </aside>

        {/* Main content */}
        <div className="relative z-[1] order-2 min-w-0 flex-1 overflow-x-hidden">
          {/* Above-tool horizontal banner — shows on all screen sizes */}
          <div role="region" aria-label="Advertisement" className="mb-4">
            <AdUnit
              slot={SLOT_ABOVE}
              format="auto"
              minHeight={60}
              minWidth={0}
              className="w-full rounded-lg overflow-hidden"
            />
          </div>

          <main>{children}</main>

          {/* HOR2 — below-tool banner, desktop only (xl+), complements mobile in-content below */}
          <div role="region" aria-label="Advertisement" className="mt-6 hidden xl:block">
            <AdUnit
              slot={SLOT_BELOW_DESK}
              format="auto"
              minHeight={90}
              minWidth={0}
              className="w-full rounded-lg overflow-hidden"
            />
          </div>

          {/* Mobile/tablet in-content ad — below tool output, hidden on xl+ where sidebars appear */}
          <div role="region" aria-label="Advertisement" className="mt-6 xl:hidden">
            <AdUnit
              slot={SLOT_MOBILE}
              format="auto"
              minHeight={90}
              minWidth={0}
              className="w-full rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* Right sidebar — 300px at xl+ (serves medium rectangle 300×250) */}
        <aside
          role="region"
          aria-label="Advertisement"
          className="sticky top-[4.75rem] order-3 hidden min-h-[250px] w-[300px] min-w-0 max-w-[300px] flex-shrink-0 overflow-hidden self-start xl:block"
        >
          <AdUnit
            slot={SLOT_RIGHT}
            format="auto"
            minHeight={250}
            minWidth={0}
            className="w-full max-w-full overflow-hidden rounded-lg"
          />
        </aside>
      </div>

      {/* Sticky bottom banner on mobile/tablet */}
      <StickyMobileAd />
    </>
  );
}
