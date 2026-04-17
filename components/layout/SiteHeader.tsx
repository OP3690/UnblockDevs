'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, Search, ArrowRight, Clock } from 'lucide-react';
import {
  trackSearchOpened, trackSearchQuery, trackSearchResultClick, trackSearchClosed,
} from '@/lib/analytics';

const NAV_LINKS = [
  { href: '/tools/json', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

interface Tool {
  label: string;
  href: string;
  desc: string;
  tags: string;
  cat: string;
  icon?: string;
}

const ALL_TOOLS: Tool[] = [
  // JSON
  { label: 'JSON Beautifier', href: '/json-beautifier', desc: 'Pretty-print and format JSON', tags: 'format prettify indent json', cat: 'JSON', icon: '{}' },
  { label: 'JSON Formatter', href: '/json-formatter', desc: 'Format JSON with syntax highlighting', tags: 'format json highlight', cat: 'JSON', icon: '{}' },
  { label: 'JSON Validator', href: '/json-validator', desc: 'Validate and check JSON syntax', tags: 'validate check syntax json', cat: 'JSON', icon: '✓' },
  { label: 'JSON Fixer', href: '/json-fixer-online', desc: 'Repair broken or invalid JSON', tags: 'fix repair broken invalid json', cat: 'JSON', icon: '🔧' },
  { label: 'JSON Comparator', href: '/json-comparator', desc: 'Diff and compare two JSON objects', tags: 'diff compare compare json', cat: 'JSON', icon: '⟺' },
  { label: 'JSON Schema Generator', href: '/json-schema-generation', desc: 'Generate JSON Schema from JSON', tags: 'schema generate openapi', cat: 'JSON', icon: '📋' },
  { label: 'JSON to Excel', href: '/json-to-excel', desc: 'Convert JSON to Excel or CSV', tags: 'convert csv excel export', cat: 'JSON', icon: '📊' },
  { label: 'JSON Stringify', href: '/json-stringify-online', desc: 'Stringify or parse JSON safely', tags: 'stringify serialize parse escape', cat: 'JSON', icon: '🔤' },
  { label: 'JSON → TypeScript', href: '/json-to-typescript', desc: 'Generate TypeScript types from JSON', tags: 'typescript types interface convert', cat: 'JSON', icon: 'TS' },
  // Dev tools
  { label: 'JWT Decoder', href: '/jwt-decoder', desc: 'Decode and inspect JWT tokens', tags: 'decode jwt token bearer auth', cat: 'Dev', icon: '🔑' },
  { label: 'Base64 Encoder', href: '/base64-encoder', desc: 'Encode and decode Base64 text', tags: 'encode decode base64 text', cat: 'Encode', icon: '🔡' },
  { label: 'URL Encoder', href: '/url-encoder', desc: 'Encode and decode URL components', tags: 'encode decode url percent uri', cat: 'Encode', icon: '🔗' },
  { label: 'UUID Generator', href: '/uuid-generator', desc: 'Generate random UUIDs / GUIDs', tags: 'uuid guid generate random v4', cat: 'Dev', icon: '🆔' },
  { label: 'Hash Generator', href: '/hash-generator', desc: 'MD5, SHA-1, SHA-256, HMAC hashes', tags: 'md5 sha sha256 hmac hash checksum', cat: 'Dev', icon: '#' },
  { label: 'Password Generator', href: '/password-generator', desc: 'Generate secure random passwords', tags: 'password secure random strong generate', cat: 'Dev', icon: '🔐' },
  { label: 'Password Audit', href: '/password-audit', desc: 'Check password strength and entropy', tags: 'password strength entropy security audit', cat: 'Dev', icon: '🛡️' },
  { label: 'Regex Tester', href: '/regex-tester', desc: 'Test and debug regex patterns', tags: 'regex pattern test match debug', cat: 'Dev', icon: 'Rx' },
  { label: 'CORS Tester', href: '/cors-tester', desc: 'Test CORS headers and policies', tags: 'cors debug cross origin headers', cat: 'API', icon: '🌐' },
  { label: 'SQL Formatter', href: '/sql-formatter', desc: 'Format and beautify SQL queries', tags: 'format sql query prettify', cat: 'Dev', icon: '🗃️' },
  { label: 'SQL IN Generator', href: '/sql-in-generator', desc: 'Generate SQL IN clause from list', tags: 'sql in clause generate list', cat: 'Dev', icon: '🗃️' },
  // cURL / API
  { label: 'HAR to cURL', href: '/har-to-curl', desc: 'Convert HAR file to cURL commands', tags: 'har curl convert command http', cat: 'API', icon: '📡' },
  { label: 'cURL Converter', href: '/curl-converter', desc: 'Convert cURL to code in any language', tags: 'curl convert code python js fetch', cat: 'API', icon: '⚡' },
  { label: 'cURL Analyzer', href: '/curl-failure-root-cause-engine', desc: 'Debug cURL errors and failures', tags: 'curl debug error failure analyze', cat: 'API', icon: '🔍' },
  { label: 'Payload Analyzer', href: '/payload-analyzer', desc: 'Analyze HTTP API payloads', tags: 'api payload analyze http request', cat: 'API', icon: '📦' },
  { label: 'API Comparator', href: '/api-comparator', desc: 'Compare two API responses', tags: 'compare diff api response', cat: 'API', icon: '⟺' },
  { label: 'Config Comparator', href: '/config-comparator', desc: 'Diff configuration files', tags: 'compare diff config yaml env', cat: 'API', icon: '⚙️' },
  { label: 'Mock API Generator', href: '/mock-api-generator', desc: 'Generate mock API endpoints', tags: 'mock api fake generate endpoint', cat: 'API', icon: '🎭' },
  { label: 'Test Data Generator', href: '/test-data-generator', desc: 'Generate realistic test data', tags: 'generate fake test data fixture', cat: 'Dev', icon: '🧪' },
  // Logs
  { label: 'Log Explorer', href: '/log-explorer', desc: 'Analyze and filter log files', tags: 'logs analyze filter parse search', cat: 'Dev', icon: '📋' },
  { label: 'Log Unpacker', href: '/log-unpacker', desc: 'Unescape and expand log entries', tags: 'logs unescape expand parse', cat: 'Dev', icon: '📂' },
  // AI tools
  { label: 'AI Schema Masker', href: '/ai-schema-masker', desc: 'Mask sensitive data before sending to AI', tags: 'ai mask privacy pii sensitive', cat: 'AI', icon: '🤖' },
  { label: 'JSON Prompt Shield', href: '/json-prompt-shield', desc: 'Sanitize JSON prompts for LLMs', tags: 'ai mask privacy json prompt llm', cat: 'AI', icon: '🛡️' },
  { label: 'Code Prompt Shield', href: '/code-prompt-shield', desc: 'Sanitize code before AI submission', tags: 'ai mask privacy code prompt llm', cat: 'AI', icon: '🛡️' },
  { label: 'Prompt Chunker', href: '/prompt-chunker', desc: 'Split large text for AI context limits', tags: 'ai chunk split context limit llm', cat: 'AI', icon: '✂️' },
  { label: 'Token Comparator', href: '/token-comparator', desc: 'Compare JWT and API tokens', tags: 'jwt token compare diff decode', cat: 'AI', icon: '🔑' },
  // Utilities
  { label: 'Timezone Translator', href: '/timezone-translator', desc: 'Convert times across time zones', tags: 'timezone time convert zone utc gmt', cat: 'Dev', icon: '🕐' },
  { label: 'Timestamp Converter', href: '/timestamp-converter', desc: 'Convert Unix timestamps to dates', tags: 'timestamp unix epoch date convert', cat: 'Dev', icon: '⏱️' },
  { label: 'Truth Table Generator', href: '/truth-table-generator', desc: 'Generate logic truth tables', tags: 'logic boolean truth table gate', cat: 'Dev', icon: '⊻' },
  { label: 'Speed Test', href: '/speed-test', tags: 'internet network speed bandwidth test', desc: 'Test your internet connection speed', cat: 'Dev', icon: '⚡' },
  { label: 'Data Insights', href: '/data-insights', desc: 'Analyze CSV and data files', tags: 'csv data analyze statistics chart', cat: 'Dev', icon: '📊' },
  { label: 'SVG to Image', href: '/svg-to-image', desc: 'Export SVG as PNG or JPEG', tags: 'svg image png jpg export convert raster', cat: 'Dev', icon: '🖼️' },
  { label: 'PDF to Excel/Word', href: '/pdf-to-excel-word', desc: 'Convert PDF to Excel or Word', tags: 'pdf excel csv word convert', cat: 'Dev', icon: '📄' },
  { label: 'Cron Builder', href: '/cron-expression', desc: 'Build and validate cron expressions', tags: 'cron job schedule expression syntax', cat: 'Dev', icon: '⏰' },
  { label: 'Markdown Preview', href: '/markdown-preview', desc: 'Write and preview Markdown', tags: 'markdown md preview github gfm', cat: 'Dev', icon: '📝' },
  { label: 'Color Picker', href: '/color-picker', desc: 'Pick colors and convert formats', tags: 'color picker hex rgb hsl convert', cat: 'CSS', icon: '🎨' },
  { label: 'Text Diff', href: '/text-diff', desc: 'Compare two text files side by side', tags: 'diff compare text code changes', cat: 'Dev', icon: '⟺' },
  { label: 'CSS Box Shadow', href: '/css-box-shadow', desc: 'Build CSS box-shadow visually', tags: 'css box shadow generator builder', cat: 'CSS', icon: '🟦' },
  { label: 'CSS Gradient Generator', href: '/css-gradient-generator', desc: 'Build linear, radial and conic CSS gradients', tags: 'css gradient linear radial conic background', cat: 'CSS', icon: '🎨' },
  { label: 'HTML Formatter', href: '/html-formatter', desc: 'Beautify or minify HTML code', tags: 'html format beautify minify indent', cat: 'Dev', icon: '🗂️' },
  { label: 'Image to Base64', href: '/image-to-base64', desc: 'Convert images to Base64 data URIs', tags: 'image base64 encode data uri png jpg svg', cat: 'Encode', icon: '🖼️' },
  { label: 'CSS UI Components', href: '/css-ui-components', desc: 'Browse and copy CSS UI components', tags: 'css ui components copy paste button card nav', cat: 'CSS', icon: '🧩' },
];

const POPULAR: string[] = [
  '/json-beautifier', '/jwt-decoder', '/base64-encoder', '/hash-generator',
  '/css-gradient-generator', '/html-formatter', '/image-to-base64', '/css-box-shadow',
];

// ── Smart search scoring ──────────────────────────────────────────────────────

function scoreMatch(tool: Tool, q: string): number {
  if (!q.trim()) return 0;
  const query = q.toLowerCase().trim();
  const label = tool.label.toLowerCase();
  const tags = (tool.tags ?? '').toLowerCase();
  const desc = tool.desc.toLowerCase();
  const all = label + ' ' + tags + ' ' + desc;

  // Exact label match
  if (label === query) return 100;
  // Label starts with query
  if (label.startsWith(query)) return 80;
  // Label contains query
  if (label.includes(query)) return 60;
  // Tags exact word match
  if (tags.split(' ').includes(query)) return 50;
  // All fields contain query
  if (all.includes(query)) return 40;

  // Fuzzy: all query tokens present somewhere
  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const allMatch = tokens.every((t) => all.includes(t));
    if (allMatch) return 30;
    const someMatch = tokens.filter((t) => all.includes(t)).length;
    if (someMatch >= tokens.length * 0.6) return 10 + someMatch;
  }

  return 0;
}

function smartSearch(q: string): Tool[] {
  if (!q.trim()) return [];
  const scored = ALL_TOOLS.map((t) => ({ tool: t, score: scoreMatch(t, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map((x) => x.tool);
}

const CAT_COLORS: Record<string, string> = {
  JSON: 'bg-blue-50 text-blue-700 border-blue-200',
  Dev: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  API: 'bg-violet-50 text-violet-700 border-violet-200',
  AI: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Encode: 'bg-amber-50 text-amber-700 border-amber-200',
  CSS: 'bg-pink-50 text-pink-700 border-pink-200',
};

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const results = searchQ.trim() ? smartSearch(searchQ) : ALL_TOOLS.filter((t) => POPULAR.includes(t.href));
  const showResults = searchOpen;
  const queryDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSearch = useCallback((source: Parameters<typeof trackSearchOpened>[0] = 'header_button') => {
    setSearchOpen(true);
    setSearchQ('');
    setSelectedIdx(0);
    trackSearchOpened(source);
    setTimeout(() => searchRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback((query = '', resultCount = 0) => {
    trackSearchClosed(query, resultCount);
    setSearchOpen(false);
    setSearchQ('');
    setSelectedIdx(0);
  }, []);

  const navigate = useCallback((href: string, toolName: string, position: number, query: string) => {
    trackSearchResultClick(toolName, position, query);
    router.push(href);
    setSearchOpen(false);
    setSearchQ('');
    setSelectedIdx(0);
  }, [router]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { closeSearch(searchQ, results.length); return; }
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key === 'k') {
        e.preventDefault();
        searchOpen ? closeSearch(searchQ, results.length) : openSearch('keyboard_shortcut');
        return;
      }
      if (e.key === '/' && !searchOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault(); openSearch('slash_key');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, searchQ, results.length, openSearch, closeSearch]);

  // Debounced query tracking — fires 600ms after user stops typing
  useEffect(() => {
    if (!searchQ.trim()) return;
    if (queryDebounceRef.current) clearTimeout(queryDebounceRef.current);
    queryDebounceRef.current = setTimeout(() => {
      trackSearchQuery(searchQ, results.length);
    }, 600);
    return () => { if (queryDebounceRef.current) clearTimeout(queryDebounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQ]);

  function handleSearchKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[selectedIdx]) {
      navigate(results[selectedIdx].href, results[selectedIdx].label, selectedIdx, searchQ);
    }
  }

  function isActive(href: string) {
    if (href === '/tools/json') return pathname?.startsWith('/tools') || (!pathname?.startsWith('/blog') && !pathname?.startsWith('/about') && pathname !== '/');
    return pathname?.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[60px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 touch-manipulation">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 font-mono text-[13px] font-bold text-white" aria-hidden>U</span>
            <span className="text-[15px] font-semibold text-zinc-900">UnblockDevs</span>
          </Link>

          {/* Primary nav */}
          <nav className="hidden flex-1 items-center gap-0.5 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${isActive(href) ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`}>
                {label}
              </Link>
            ))}
          </nav>

          {isHome && <div id="ezoic-pub-ad-placeholder-100" className="hidden min-h-0 min-w-0 flex-1 lg:block" />}

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => openSearch('header_button')}
              title="Search tools (⌘K or /)"
              aria-label="Search tools"
              className="flex h-8 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 hover:border-zinc-300"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline text-[12px]">Search tools…</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-300 bg-white px-1 py-0.5 font-mono text-[10px] text-zinc-400 shadow-sm">
                ⌘K
              </kbd>
            </button>

            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-800 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              All tools free
            </span>
            <Link href="/ai-schema-masker"
              className="hidden rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 touch-manipulation sm:inline-flex">
              Try AI Masker
            </Link>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${isActive(href) ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`}>
                  {label}
                </Link>
              ))}
              <div className="mt-2 border-t border-zinc-100 pt-2">
                <Link href="/ai-schema-masker" onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-[14px] font-medium text-white">
                  Try AI Masker
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Search Modal ─────────────────────────────────────────────────────── */}
      {showResults && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={(e) => { if (e.target === overlayRef.current) closeSearch(searchQ, results.length); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => closeSearch(searchQ, results.length)} />

          {/* Modal */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-zinc-400" />
              <input
                ref={searchRef}
                type="search"
                value={searchQ}
                onChange={(e) => { setSearchQ(e.target.value); setSelectedIdx(0); }}
                onKeyDown={handleSearchKey}
                placeholder="Search 50+ tools — try 'gradient', 'jwt', 'css'…"
                aria-label="Search all tools"
                className="flex-1 bg-transparent text-[14px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
              {searchQ && (
                <button onClick={() => { setSearchQ(''); setSelectedIdx(0); searchRef.current?.focus(); }}
                  className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <kbd className="shrink-0 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-medium text-zinc-500">No tools found for <span className="font-semibold text-zinc-800">"{searchQ}"</span></p>
                  <p className="mt-1 text-xs text-zinc-400">Try 'json', 'base64', 'css', 'curl', 'hash'…</p>
                </div>
              ) : (
                <>
                  {!searchQ.trim() && (
                    <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                      <Clock className="h-3 w-3 text-zinc-300" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Popular tools</span>
                    </div>
                  )}
                  <ul className="py-1.5">
                    {results.map((tool, i) => {
                      const catColor = CAT_COLORS[tool.cat] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200';
                      return (
                        <li key={tool.href}>
                          <button
                            type="button"
                            onClick={() => navigate(tool.href, tool.label, i, searchQ)}
                            onMouseEnter={() => setSelectedIdx(i)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === selectedIdx ? 'bg-zinc-50' : 'hover:bg-zinc-50'}`}
                          >
                            {tool.icon && (
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-[13px] font-bold text-zinc-600">
                                {tool.icon}
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-semibold text-zinc-800 truncate">{tool.label}</p>
                              <p className="text-[11px] text-zinc-400 truncate">{tool.desc}</p>
                            </div>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${catColor}`}>
                              {tool.cat}
                            </span>
                            <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-opacity ${i === selectedIdx ? 'text-zinc-400 opacity-100' : 'opacity-0'}`} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 border-t border-zinc-100 px-4 py-2.5 bg-zinc-50">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[9px]">↑↓</kbd> navigate
              </span>
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[9px]">↵</kbd> open
              </span>
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[9px]">ESC</kbd> close
              </span>
              <span className="ml-auto text-[10px] text-zinc-400">{ALL_TOOLS.length} tools</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
