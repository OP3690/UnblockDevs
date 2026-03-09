'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA4_ID = 'G-N6DF8NPHY8';

/**
 * Sends page_path to GA4 on every client-side route change (SPA navigation).
 * Without this, GA4 sees only the first pageview and session duration stays 00:00:00.
 */
export default function GA4RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('config', GA4_ID, {
      page_path: pathname || window.location.pathname,
    });
  }, [pathname]);

  return null;
}
