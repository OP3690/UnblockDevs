'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackTabVisible } from '@/lib/analytics';

/**
 * Fires a GA4 event when the user switches back to the site tab (document becomes visible).
 * Only triggers on hidden → visible transition, not on initial page load.
 */
export default function TabVisibilityTracker() {
  const pathname = usePathname();
  const wasHiddenRef = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        wasHiddenRef.current = true;
      } else if (document.visibilityState === 'visible' && wasHiddenRef.current) {
        wasHiddenRef.current = false;
        trackTabVisible({ path: pathname ?? window.location.pathname });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pathname]);

  return null;
}
