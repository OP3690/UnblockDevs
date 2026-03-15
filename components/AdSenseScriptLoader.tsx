'use client';

import { useEffect } from 'react';

const AD_CLIENT = 'ca-pub-6349841658473646';
const SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

/**
 * Loads AdSense script via a plain script tag so the tag does not get
 * data-nscript (which AdSense does not support). Next.js Script component
 * adds data-nscript and triggers "AdSense head tag doesn't support data-nscript attribute".
 */
export default function AdSenseScriptLoader() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) return;
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.head.appendChild(script);
  }, []);
  return null;
}
