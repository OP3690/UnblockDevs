'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bookmark, X } from 'lucide-react';

const STORAGE_KEY = 'bookmarkPromptDismissed';
const SHOW_DELAY_MS = 10_000;

/**
 * Homepage-only bookmark CTA — rendered above SiteHeader in root layout.
 */
export default function HomeBookmarkStrip() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== '/') return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
  };

  if (!visible || pathname !== '/') return null;

  return (
    <div
      className="relative z-[45] w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white shadow-md border-b border-emerald-500/30 animate-slide-down"
      role="region"
      aria-label="Bookmark this site"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">
            <div className="flex-shrink-0 rounded-xl bg-white/20 p-2 backdrop-blur-sm sm:p-2.5">
              <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold leading-tight sm:text-base">
                📌 Bookmark for quick access to all tools
              </p>
              <p className="mt-1 hidden text-[11px] leading-relaxed text-emerald-100 sm:mt-1.5 sm:block sm:text-sm">
                <kbd className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold sm:text-xs">
                  Ctrl+D
                </kbd>{' '}
                /{' '}
                <kbd className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold sm:text-xs">
                  Cmd+D
                </kbd>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="cta-icon-close flex h-11 min-h-[44px] w-11 min-w-[44px] flex-shrink-0 touch-manipulation items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-white/20 active:scale-95"
            aria-label="Dismiss bookmark prompt"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
