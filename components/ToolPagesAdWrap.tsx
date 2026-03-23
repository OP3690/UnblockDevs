'use client';

import { usePathname } from 'next/navigation';
import AdUnit from '@/components/AdUnit';

/** AdSense slot IDs — same as blog sidebars (VER left, SQ right). */
const SLOT_LEFT = '4176806584'; // VER (Display)
const SLOT_RIGHT = '1255275563'; // SQ (Display)

/** First path segment that should NOT get left/right sidebar ads. */
const NO_SIDEBAR_SEGMENTS = new Set([
  '',
  'blog',
  'about',
  'contact',
  'terms',
  'privacy-policy',
  'disclaimer',
  'badges',
  'tools',
  'api',
]);

function useIsToolPage(): boolean {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return false;
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return !NO_SIDEBAR_SEGMENTS.has(segment);
}

/**
 * Wraps children with left and right sidebar ad slots on tool pages only (xl breakpoint).
 */
export default function ToolPagesAdWrap({ children }: { children: React.ReactNode }) {
  const isToolPage = useIsToolPage();

  if (!isToolPage) {
    return <>{children}</>;
  }

  /* Sidebars only at 2xl+ so typical laptop (xl) gets full-width tool column; outer cap raised for wide screens */
  return (
    <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col px-3 py-2 sm:py-4 sm:px-5 lg:px-6 2xl:max-w-[min(100%,100rem)] 2xl:flex-row 2xl:items-start 2xl:gap-6 2xl:px-8">
      <aside
        role="region"
        aria-label="Advertisement"
        className="sticky top-[4.75rem] order-first hidden min-h-[250px] w-[160px] min-w-0 max-w-[160px] flex-shrink-0 overflow-hidden self-start 2xl:block"
      >
        <AdUnit
          slot={SLOT_LEFT}
          format="auto"
          minHeight={250}
          minWidth={0}
          className="w-full max-w-full overflow-hidden rounded-lg"
        />
      </aside>
      <main className="relative z-[1] order-2 min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <aside
        role="region"
        aria-label="Advertisement"
        className="sticky top-[4.75rem] order-3 hidden min-h-[250px] w-[300px] min-w-0 max-w-[300px] flex-shrink-0 overflow-hidden self-start 2xl:block"
      >
        <AdUnit
          slot={SLOT_RIGHT}
          format="auto"
          minHeight={250}
          minWidth={0}
          className="w-full max-w-full overflow-hidden rounded-lg"
        />
      </aside>
    </div>
  );
}
