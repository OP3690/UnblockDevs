'use client';

import SidebarAds from '@/components/SidebarAds';

interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
}

/**
 * Wraps blog article content with a main column + right sidebar showing all 3 ads.
 * Sidebar is hidden on smaller screens; on xl and up, ads appear in the side white space.
 * Mobile: single column, no horizontal scroll; padding for safe-area and touch.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 pt-12 sm:pt-16 flex flex-col xl:flex-row gap-6 xl:gap-8">
      <main className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0 w-full overflow-x-hidden">
        {children}
      </main>
      <div className="hidden xl:block flex-shrink-0 sticky top-24 self-start">
        <SidebarAds />
      </div>
    </div>
  );
}
