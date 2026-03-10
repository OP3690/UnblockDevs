'use client';

import { useEffect } from 'react';

/** Fires after mount — calls track-visit API. Never blocks render or TTFB. */
export default function VisitTracker() {
  useEffect(() => {
    fetch('/api/track-visit', { method: 'POST' }).catch(() => {});
  }, []);
  return null;
}
