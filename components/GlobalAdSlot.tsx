'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';

/** Slot for site-wide ad (shows on every page; remounts on navigation so ad refreshes). */
const SLOT_SITEWIDE = '5569779301'; // VER_MULTI (Multiplex)

/**
 * One ad unit that appears on every page (home, tools, blog). Uses pathname as key
 * so on client-side navigation the component remounts and AdSense push() runs again for the new page.
 */
export default function GlobalAdSlot() {
  const pathname = usePathname();
  const key = pathname ?? '/';

  return (
    <div key={key} className="w-full flex justify-center py-4">
      <AdUnit slot={SLOT_SITEWIDE} format="autorelaxed" className="max-w-full" minHeight={90} />
    </div>
  );
}
