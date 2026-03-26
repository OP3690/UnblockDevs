'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Global top nav — clean, minimal design matching the redesign mockup.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[60px] max-w-[1100px] items-center gap-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 touch-manipulation">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 font-mono text-[13px] font-bold text-white"
            aria-hidden
          >
            U
          </span>
          <span className="text-[15px] font-semibold text-zinc-900">UnblockDevs</span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden flex-1 items-center gap-0.5 md:flex" aria-label="Main navigation">
          <Link
            href="/tools/json"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            About
          </Link>
        </nav>

        {/* Ad slot (homepage only) */}
        {isHome && (
          <div id="ezoic-pub-ad-placeholder-100" className="hidden min-h-0 min-w-0 flex-1 lg:block" />
        )}

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-800 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            All tools free
          </span>
          <Link
            href="/ai-schema-masker"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 touch-manipulation"
          >
            Try AI Masker
          </Link>
        </div>
      </div>
    </header>
  );
}
