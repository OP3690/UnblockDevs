'use client';

import { useState, useEffect } from 'react';
import AdUnit from '@/components/AdUnit';

/**
 * Sticky bottom banner for mobile/tablet (hidden on xl+).
 * Uses the VER sidebar slot which never pushes on mobile because the
 * sidebar container has display:none → offsetWidth=0 → AdUnit skips it.
 * So this slot is safe to use exclusively here for mobile.
 */
const SLOT_MOBILE_STICKY = '4176806584';

export default function StickyMobileAd() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Delay appearance so it doesn't cover content on load
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] xl:hidden"
      style={{ boxShadow: '0 -2px 12px rgba(0,0,0,0.12)' }}
    >
      <div className="relative bg-white border-t border-zinc-200">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close advertisement"
          className="absolute -top-7 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700/80 text-white text-[10px] font-bold hover:bg-zinc-900 z-10"
        >
          ✕
        </button>
        <AdUnit
          slot={SLOT_MOBILE_STICKY}
          format="auto"
          minHeight={50}
          minWidth={0}
          className="w-full"
        />
      </div>
    </div>
  );
}
