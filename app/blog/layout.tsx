/**
 * Blog layout: wraps all /blog and /blog/[...] routes with ad-friendly structure.
 * Ezoic/AdSense can target these placeholders (ezoic-pub-ad-placeholder-200, 201).
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Top ad strip - above all blog content (list or post) */}
      <div
        id="ezoic-pub-ad-placeholder-200"
        className="min-h-[50px] flex items-center justify-center bg-gray-50/50 border-b border-gray-100 py-2"
        aria-label="Advertisement"
      />
      {children}
      {/* Bottom ad strip - below all blog content */}
      <div
        id="ezoic-pub-ad-placeholder-201"
        className="min-h-[90px] flex items-center justify-center bg-gray-50/50 border-t border-gray-100 py-6"
        aria-label="Advertisement"
      />
    </>
  );
}
