'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, Search } from 'lucide-react';

const NAV_LINKS = [
  { href: '/tools/json', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const ALL_TOOLS: { label: string; href: string; tags?: string }[] = [
  { label: 'JSON Beautifier', href: '/json-beautifier', tags: 'format prettify' },
  { label: 'JSON Fixer', href: '/json-fixer-online', tags: 'repair fix broken' },
  { label: 'JSON Validator', href: '/json-validator', tags: 'validate check' },
  { label: 'JSON Comparator', href: '/json-comparator', tags: 'diff compare' },
  { label: 'JSON Formatter', href: '/json-formatter', tags: 'format' },
  { label: 'JSON Schema Generator', href: '/json-schema-generation', tags: 'schema generate' },
  { label: 'JSON to Excel', href: '/json-to-excel', tags: 'convert csv' },
  { label: 'JSON Stringify', href: '/json-stringify-online', tags: 'stringify encode' },
  { label: 'JWT Decoder', href: '/jwt-decoder', tags: 'decode jwt token' },
  { label: 'HAR to cURL', href: '/har-to-curl', tags: 'convert curl' },
  { label: 'cURL Converter', href: '/curl-converter', tags: 'convert code' },
  { label: 'CORS Tester', href: '/cors-tester', tags: 'cors debug' },
  { label: 'SQL Formatter', href: '/sql-formatter', tags: 'format sql' },
  { label: 'SQL IN Generator', href: '/sql-in-generator', tags: 'sql generate' },
  { label: 'Base64 Encoder', href: '/base64-encoder', tags: 'encode decode' },
  { label: 'URL Encoder', href: '/url-encoder', tags: 'encode decode percent' },
  { label: 'UUID Generator', href: '/uuid-generator', tags: 'guid generate' },
  { label: 'Hash Generator', href: '/hash-generator', tags: 'md5 sha256 hmac' },
  { label: 'Password Generator', href: '/password-generator', tags: 'secure random' },
  { label: 'Regex Tester', href: '/regex-tester', tags: 'regex pattern test' },
  { label: 'Log Explorer', href: '/log-explorer', tags: 'logs analyze parse' },
  { label: 'Log Unpacker', href: '/log-unpacker', tags: 'logs unescape' },
  { label: 'AI Schema Masker', href: '/ai-schema-masker', tags: 'mask ai privacy' },
  { label: 'JSON Prompt Shield', href: '/json-prompt-shield', tags: 'mask ai privacy' },
  { label: 'Code Prompt Shield', href: '/code-prompt-shield', tags: 'mask ai privacy code' },
  { label: 'Payload Analyzer', href: '/payload-analyzer', tags: 'api payload' },
  { label: 'API Comparator', href: '/api-comparator', tags: 'compare diff api' },
  { label: 'Config Comparator', href: '/config-comparator', tags: 'compare diff config' },
  { label: 'Mock API Generator', href: '/mock-api-generator', tags: 'mock api generate' },
  { label: 'Test Data Generator', href: '/test-data-generator', tags: 'generate fake data' },
  { label: 'Prompt Chunker', href: '/prompt-chunker', tags: 'ai chunk split' },
  { label: 'Token Comparator', href: '/token-comparator', tags: 'jwt compare diff' },
  { label: 'Speed Test', href: '/speed-test', tags: 'internet network' },
  { label: 'Timezone Translator', href: '/timezone-translator', tags: 'time zone convert' },
  { label: 'Truth Table Generator', href: '/truth-table-generator', tags: 'logic boolean' },
  { label: 'cURL Failure Analyzer', href: '/curl-failure-root-cause-engine', tags: 'debug curl error' },
  { label: 'Password Audit', href: '/password-audit', tags: 'security check strength entropy' },
  { label: 'Data Insights', href: '/data-insights', tags: 'analyze data csv statistics' },
  { label: 'SVG to Image', href: '/svg-to-image', tags: 'convert png jpg raster' },
  { label: 'PDF to Excel/Word', href: '/pdf-to-excel-word', tags: 'convert pdf excel csv word' },
  { label: 'JSON Stringify', href: '/json-stringify-online', tags: 'stringify serialize javascript' },
  { label: 'JSON Formatter', href: '/json-formatter', tags: 'format prettify json' },
  { label: 'JSON Validator', href: '/json-validator', tags: 'validate check json syntax' },
];

/**
 * Global top nav — clean, minimal with active states and mobile menu.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredTools = searchQ.trim()
    ? ALL_TOOLS.filter((t) =>
        (t.label + ' ' + (t.tags ?? '')).toLowerCase().includes(searchQ.toLowerCase())
      ).slice(0, 6)
    : [];

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setSearchQ('');
    setSelectedIdx(0);
    setTimeout(() => searchRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQ('');
  }, []);

  // Close on Escape, open on /
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { closeSearch(); return; }
      if (e.key === '/' && !searchOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        openSearch();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, openSearch, closeSearch]);

  function handleSearchKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filteredTools.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filteredTools[selectedIdx]) {
      router.push(filteredTools[selectedIdx].href);
      closeSearch();
    }
  }

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
          {/* Global tool search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" aria-hidden />
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQ}
                    onChange={(e) => { setSearchQ(e.target.value); setSelectedIdx(0); }}
                    onKeyDown={handleSearchKey}
                    onBlur={(e) => { if (!e.currentTarget.parentElement?.parentElement?.contains(e.relatedTarget)) closeSearch(); }}
                    placeholder="Search tools…"
                    aria-label="Search all tools"
                    className="h-8 w-44 sm:w-56 rounded-lg border border-zinc-300 bg-white pl-8 pr-3 text-[12.5px] text-zinc-700 placeholder:text-zinc-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={closeSearch}
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100"
                  aria-label="Close search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openSearch}
                title="Search tools (press /)"
                aria-label="Search tools"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              >
                <Search className="h-3.5 w-3.5 shrink-0" />
                <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-300 bg-zinc-100 px-1 py-0.5 font-mono text-[10px] text-zinc-400">
                  /
                </kbd>
              </button>
            )}
            {/* Search results dropdown */}
            {searchOpen && filteredTools.length > 0 && (
              <div className="absolute right-0 top-10 z-50 w-56 sm:w-64 rounded-xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
                {filteredTools.map((tool, i) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={closeSearch}
                    className={`flex items-center px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                      i === selectedIdx ? 'bg-emerald-50 text-emerald-800' : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
