/**
 * Blog layout: wraps all /blog and /blog/[...] routes with an ad-friendly structure
 * for Google AdSense. Includes top banner (200), bottom banner (201), left/right sidebars (203, 204) on xl.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Top ad strip - mobile 320x50 / desktop leaderboard; above-the-fold for viewability */}
      <div
        id="ezoic-pub-ad-placeholder-200"
        className="min-h-[50px] flex items-center justify-center bg-gray-50/50 border-b border-gray-100 py-2 px-2 sm:px-0"
        aria-label="Advertisement"
      />
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col xl:flex-row xl:gap-8">
          {/* Left sidebar ad - xl and up (160x600). */}
          <aside
            id="ezoic-pub-ad-placeholder-203"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[160px] sticky top-24 self-start min-h-[600px] bg-gray-50/60 rounded-lg border border-gray-100"
          />
          {/* Main content - center column; clear separation from ads for AdSense policy */}
          <main className="flex-1 min-w-0 max-w-4xl xl:mx-0 mx-auto overflow-x-hidden">
            {children}
          </main>
          {/* Right sidebar ad - xl and up (300x250). */}
          <aside
            id="ezoic-pub-ad-placeholder-204"
            aria-label="Advertisement"
            className="hidden xl:block flex-shrink-0 w-[300px] sticky top-24 self-start min-h-[250px] bg-gray-50/60 rounded-lg border border-gray-100"
          />
        </div>
      </div>
      {/* Bottom ad strip - mobile 300x250 / desktop medium rectangle; reserved height for CLS */}
      <div
        id="ezoic-pub-ad-placeholder-201"
        className="min-h-[250px] sm:min-h-[90px] flex items-center justify-center bg-gray-50/50 border-t border-gray-100 py-4 sm:py-6 px-2 sm:px-0"
        aria-label="Advertisement"
      />
    </>
  );
}
