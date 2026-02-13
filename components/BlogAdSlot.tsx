'use client';

/**
 * In-content ad slot for blog posts. Use between sections for ad-friendly placement.
 * Ezoic/AdSense can target the placeholder by id (e.g. ezoic-pub-ad-placeholder-202).
 */
export default function BlogAdSlot({
  id = 'ezoic-pub-ad-placeholder-202',
  className = '',
}: {
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`min-h-[90px] flex items-center justify-center bg-gray-50/60 rounded-lg border border-gray-100 py-6 my-8 ${className}`}
      aria-label="Advertisement"
    />
  );
}
