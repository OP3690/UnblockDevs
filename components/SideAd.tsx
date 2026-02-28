'use client';

/**
 * Sticky side ad shown on every page (Ezoic/AdSense target by id).
 * Hidden on small screens; right sidebar on lg+.
 */
export default function SideAd() {
  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 w-[160px] xl:w-[200px] sticky top-4 self-start"
      aria-label="Advertisement"
    >
      <div
        id="ezoic-pub-ad-placeholder-110"
        className="min-h-[250px] w-full flex items-center justify-center bg-gray-50/60 rounded-lg border border-gray-100"
      />
      {/* AdSense side unit - create "Side" display unit in AdSense and set data-ad-slot to your slot ID */}
      <div className="mt-4 min-h-[600px] w-full" style={{ minHeight: '600px' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '600px' }}
          data-ad-client="ca-pub-6349841658473646"
          data-ad-slot="SIDE_AD_SLOT"
          data-ad-format="vertical"
          data-full-width-responsive="false"
        />
      </div>
    </aside>
  );
}
