'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-6349841658473646';

/** Slots we've already pushed — avoid "already have ads" from remounts or double effects. */
const pushedSlots = new Set<string>();

export type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical' | 'autorelaxed';

interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  layout?: 'in-article' | 'in-feed' | '';
  className?: string;
  minHeight?: number;
}

/**
 * Manual AdSense display unit. Pushes only when container has non-zero width (fixes Matched Content 0 width error)
 * and only once per slot globally (fixes "already have ads").
 */
export default function AdUnit({
  slot,
  format = 'auto',
  layout = '',
  className = '',
  minHeight = 90,
}: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slot || pushedSlots.has(slot)) return;
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 50; // ~2.5s max wait

    function tryPush() {
      if (cancelled) return;
      if (!el) return;
      const width = el.offsetWidth || 0;
      if (width > 0) {
        try {
          const w = window as unknown as { adsbygoogle?: unknown[] };
          if (!w.adsbygoogle) return;
          w.adsbygoogle = w.adsbygoogle || [];
          w.adsbygoogle.push({});
          pushedSlots.add(slot);
        } catch {
          // ignore
        }
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryPush);
      }
    }

    const t = setTimeout(() => requestAnimationFrame(tryPush), 100);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
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
      ref={containerRef}
      role="region"
      aria-label="Advertisement"
      className={`ad-unit flex items-center justify-center text-center ${className}`}
      style={{ minHeight: `${minHeight}px`, minWidth: 320, width: '100%' }}
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
