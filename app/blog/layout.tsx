'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';

/** AdSense slot IDs for blog shell (top, bottom, left sidebar, right sidebar). */
const SLOT_TOP = '1550643245'; // HOR
const SLOT_BOTTOM = '4987800735'; // autorelaxed
const SLOT_LEFT = '4176806584'; // VER
const SLOT_RIGHT = '1255275563'; // SQ

/**
 * Blog layout: wraps all /blog and /blog/[...] routes with AdSense units.
 * Keys ads by pathname so they remount and refresh on client-side navigation.
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
      <div
        key={`${key}-top`}
        role="region"
        aria-label="Advertisement"
        className="min-h-[50px] flex items-center justify-center bg-gray-50/50 border-b border-gray-100 py-2 px-2 sm:px-0"
      >
        <AdUnit slot={SLOT_TOP} format="auto" minHeight={50} className="w-full max-w-full" />
      </div>
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col xl:flex-row xl:gap-8">
          <aside
            key={`${key}-left`}
            role="region"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[160px] sticky top-24 self-start"
          >
            <AdUnit slot={SLOT_LEFT} format="auto" minHeight={600} className="rounded-lg overflow-hidden" />
          </aside>
          <main className="flex-1 min-w-0 max-w-4xl xl:mx-0 mx-auto overflow-x-hidden">
            {children}
          </main>
          <aside
            key={`${key}-right`}
            role="region"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[300px] sticky top-24 self-start"
          >
            <AdUnit slot={SLOT_RIGHT} format="auto" minHeight={250} className="rounded-lg overflow-hidden" />
          </aside>
        </div>
      </div>
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
