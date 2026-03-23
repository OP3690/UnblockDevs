'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDevMode } from '@/components/DevModeWrapper';

/**
 * Global top nav — privacy-first redesign (max-width 1100px, sticky).
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const { devMode, setDevMode } = useDevMode();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[58px] max-w-[1100px] flex-wrap items-center gap-3 px-6 py-3 sm:flex-nowrap sm:py-0">
        <Link href="/" className="group flex shrink-0 items-center gap-2 touch-manipulation">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 font-mono text-[13px] font-bold text-white"
            aria-hidden
          >
            U
          </span>
          <span className="text-[15px] font-semibold text-zinc-900">UnblockDevs</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-0.5 md:flex" aria-label="Main navigation">
          <Link
            href="/tools/json"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            About
          </Link>
        </nav>

        {isHome && (
          <div id="ezoic-pub-ad-placeholder-100" className="hidden min-h-0 min-w-0 flex-1 lg:block" />
        )}

        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-800 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
            All tools free
          </span>
          <Link
            href="/ai-schema-masker"
            className="min-h-[44px] rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 touch-manipulation sm:min-h-0 sm:py-2"
          >
            Try AI Masker
          </Link>
          <div className="dev-mode-toggle-container flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1">
            <span className="hidden text-[10px] font-medium text-zinc-500 sm:inline">Mode</span>
            <button
              type="button"
              onClick={() => setDevMode(!devMode)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 touch-manipulation ${devMode ? 'dark-mode-on' : ''} ${
                devMode ? 'bg-zinc-600 hover:bg-zinc-700' : 'bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={devMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-pressed={devMode}
            >
              <span
                className={`absolute top-0.5 left-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  devMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span
              className={`hidden w-8 text-[10px] font-semibold tabular-nums sm:inline ${devMode ? 'text-zinc-600' : 'text-zinc-800'}`}
            >
              {devMode ? 'Dark' : 'Light'}
            </span>
          </div>
          <Link
            href="/speed-test"
            title="Speed Test"
            className="hidden items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 xl:inline-flex"
          >
            Speed
          </Link>
        </div>
      </div>
    </header>
  );
}
