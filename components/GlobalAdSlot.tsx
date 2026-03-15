'use client';

import AdUnit from '@/components/AdUnit';

/** Slot for site-wide ad (Matched Content / Multiplex). */
const SLOT_SITEWIDE = '5569779301';

/**
 * One ad unit that appears on every page. Wrapper has explicit width so Matched Content never gets 0 width.
 * No pathname key to avoid remounts and double push() that trigger "already have ads".
 */
export default function GlobalAdSlot() {
  return (
    <div className="w-full py-4" style={{ minWidth: 320, minHeight: 90 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ width: '100%' }}>
        <AdUnit slot={SLOT_SITEWIDE} format="autorelaxed" minHeight={90} />
      </div>
    </div>
  );
}
