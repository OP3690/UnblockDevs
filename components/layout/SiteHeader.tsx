'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/tools/json', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

/**
 * Global top nav — clean, minimal with active states and mobile menu.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/tools/json') return pathname?.startsWith('/tools') || (!pathname?.startsWith('/blog') && !pathname?.startsWith('/about') && pathname !== '/');
    return pathname?.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[60px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
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

        {/* Primary nav — desktop */}
        <nav className="hidden flex-1 items-center gap-0.5 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                isActive(href)
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {label}
            </Link>
          ))}
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
            className="hidden rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 touch-manipulation sm:inline-flex"
          >
            Try AI Masker
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 border-t border-zinc-100 pt-2">
              <Link
                href="/ai-schema-masker"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-[14px] font-medium text-white"
              >
                Try AI Masker
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
