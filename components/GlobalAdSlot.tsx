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
    // minHeight matches typical autorelaxed ad height — prevents CLS when ad expands.
    // contain:layout isolates reflow to this box so ad expansion can't shift content above.
    <div className="w-full py-4" style={{ minWidth: 320, minHeight: 280, width: '100%', contain: 'layout' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ width: '100%', minWidth: 0 }}>
        <AdUnit slot={SLOT_SITEWIDE} format="autorelaxed" minHeight={280} />
      </div>
    </div>
  );
}
