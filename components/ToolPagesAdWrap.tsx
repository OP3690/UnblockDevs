'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';

/** AdSense slot IDs — same as blog sidebars (VER left, SQ right). */
const SLOT_LEFT = '4176806584';  // VER (Display)
const SLOT_RIGHT = '1255275563'; // SQ (Display)

/** First path segment that should NOT get left/right sidebar ads. */
const NO_SIDEBAR_SEGMENTS = new Set([
  '', 'blog', 'about', 'contact', 'terms', 'privacy-policy', 'disclaimer', 'badges', 'tools', 'api',
]);

function useIsToolPage(): boolean {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return false;
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return !NO_SIDEBAR_SEGMENTS.has(segment);
}

/**
 * Wraps children with left and right sidebar ad slots on tool pages only.
 * Blog has its own layout with sidebars; home, about, etc. stay full-width.
 */
export default function ToolPagesAdWrap({ children }: { children: React.ReactNode }) {
  const isToolPage = useIsToolPage();

  if (!isToolPage) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-0 flex flex-col lg:flex-row lg:gap-6 xl:gap-8">
      {/* Left sidebar ad — visible from lg (1024px) */}
      <aside
        role="region"
        aria-label="Advertisement"
        className="hidden lg:block flex-shrink-0 w-[160px] sticky top-24 self-start min-h-[250px] order-first"
      >
        <AdUnit slot={SLOT_LEFT} format="auto" minHeight={250} className="rounded-lg overflow-hidden w-full" />
      </aside>
      <main className="flex-1 min-w-0 overflow-x-hidden order-2">
        {children}
      </main>
      {/* Right sidebar ad — visible from lg (1024px) */}
      <aside
        role="region"
        aria-label="Advertisement"
        className="hidden lg:block flex-shrink-0 w-[300px] sticky top-24 self-start min-h-[250px] order-3"
      >
        <AdUnit slot={SLOT_RIGHT} format="auto" minHeight={250} className="rounded-lg overflow-hidden w-full" />
      </aside>
    </div>
  );
}
