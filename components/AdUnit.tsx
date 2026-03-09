'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-6349841658473646';

export type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical' | 'autorelaxed';

interface AdUnitProps {
  /** AdSense slot ID (10-digit). Set in AdSense → Ads → By ad unit. */
  slot: string;
  format?: AdFormat;
  /** For in-article: data-ad-layout="in-article" (use with format="fluid"). */
  layout?: 'in-article' | 'in-feed' | '';
  className?: string;
  /** Minimum height in px so layout doesn't jump; default 90 */
  minHeight?: number;
}

/**
 * Manual AdSense display unit. Renders <ins class="adsbygoogle"> and pushes once when mounted.
 * Requires adsbygoogle.js to be loaded (root layout loads it after window load).
 * Create ad units in AdSense → Ads → By ad unit → Display ads, then pass slot IDs here or via env.
 */
export default function AdUnit({
  slot,
  format = 'auto',
  layout = '',
  className = '',
  minHeight = 90,
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // ignore
    }
  }, [slot]);

  if (!slot) return null;

  const isInArticle = layout === 'in-article';
  const useFullWidthResponsive = format === 'auto' || format === 'rectangle' || format === 'horizontal' || format === 'vertical';
  const style: React.CSSProperties = {
    display: 'block',
    ...(isInArticle ? { textAlign: 'center' as const } : {}),
  };

  return (
    <div
      className={`ad-unit flex items-center justify-center text-center ${className}`}
      style={{ minHeight: `${minHeight}px` }}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(useFullWidthResponsive ? { 'data-full-width-responsive': 'true' } : {})}
        {...(layout ? { 'data-ad-layout': layout } : {})}
      />
    </div>
  );
}
