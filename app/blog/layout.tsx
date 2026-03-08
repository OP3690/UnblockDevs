/**
 * Blog layout: wraps all /blog and /blog/[...] routes with an ad-friendly structure
 * so Google AdSense/Ezoic can show ads. Includes:
 * - Top banner (200), bottom banner (201)
 * - Left sidebar (203) and right sidebar (204) on xl screens for skyscraper/rectangle ads
 * - Main content in center for clear content vs ad separation (AdSense policy).
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
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col xl:flex-row xl:gap-8">
          {/* Left sidebar ad - xl and up. Map ezoic-pub-ad-placeholder-203 in your ad dashboard (e.g. 160x600). */}
          <aside
            id="ezoic-pub-ad-placeholder-203"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[160px] sticky top-24 self-start min-h-[600px] bg-gray-50/60 rounded-lg border border-gray-100"
          />
          {/* Main content - center column; clear separation from ads for AdSense policy */}
          <main className="flex-1 min-w-0 max-w-4xl xl:mx-0 mx-auto">
            {children}
          </main>
          {/* Right sidebar ad - xl and up. Map ezoic-pub-ad-placeholder-204 in your ad dashboard (e.g. 300x250). */}
          <aside
            id="ezoic-pub-ad-placeholder-204"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[300px] sticky top-24 self-start min-h-[250px] bg-gray-50/60 rounded-lg border border-gray-100"
          />
        </div>
      </div>
      {/* Bottom ad strip - below all blog content */}
      <div
        id="ezoic-pub-ad-placeholder-201"
        className="min-h-[90px] flex items-center justify-center bg-gray-50/50 border-t border-gray-100 py-6"
        aria-label="Advertisement"
      />
    </>
  );
}
