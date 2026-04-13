'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight,
  Search, X, SlidersHorizontal, Sparkles, TrendingUp,
  BookOpen, Hash, Zap, Filter,
} from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts-data';

// ─── Types ─────────────────────────────────────────────────────────────────────
type BlogListClientProps = {
  allPosts: BlogPost[];
  initialPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
};

// ─── Category styling ──────────────────────────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; text: string; dot: string; pill: string; activePill: string }> = {
  'JSON & Logs':                  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', activePill: 'bg-emerald-600 text-white border-emerald-600' },
  'AI & Security':                { bg: 'bg-violet-50',  text: 'text-violet-700',  dot: 'bg-violet-500',  pill: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100',   activePill: 'bg-violet-600 text-white border-violet-600' },
  'APIs':                         { bg: 'bg-sky-50',     text: 'text-sky-700',     dot: 'bg-sky-500',     pill: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',               activePill: 'bg-sky-600 text-white border-sky-600' },
  'Algorithms':                   { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500',   pill: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',       activePill: 'bg-amber-500 text-white border-amber-500' },
  'ML & AI':                      { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', dot: 'bg-fuchsia-500', pill: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-100', activePill: 'bg-fuchsia-600 text-white border-fuchsia-600' },
  'Data Engineering & Analytics': { bg: 'bg-orange-50',  text: 'text-orange-700',  dot: 'bg-orange-500',  pill: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',   activePill: 'bg-orange-500 text-white border-orange-500' },
  'Web Development':              { bg: 'bg-blue-50',    text: 'text-blue-700',    dot: 'bg-blue-500',    pill: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',           activePill: 'bg-blue-600 text-white border-blue-600' },
  'DevTools':                     { bg: 'bg-zinc-100',   text: 'text-zinc-700',    dot: 'bg-zinc-400',    pill: 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200',           activePill: 'bg-zinc-800 text-white border-zinc-800' },
  'SQL & Databases':              { bg: 'bg-teal-50',    text: 'text-teal-700',    dot: 'bg-teal-500',    pill: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',           activePill: 'bg-teal-600 text-white border-teal-600' },
};
const DEFAULT_CAT = { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400', pill: 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200', activePill: 'bg-zinc-700 text-white border-zinc-700' };

function catStyle(cat: string) { return CAT_COLORS[cat] ?? DEFAULT_CAT; }

// Short display names for long category names
const CAT_SHORT: Record<string, string> = {
  'Data Engineering & Analytics': 'Data & Analytics',
  'Web Development': 'Web Dev',
  'JSON & Logs': 'JSON & Logs',
  'AI & Security': 'AI & Security',
  'SQL & Databases': 'SQL',
};

// ─── Search intelligence ───────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'the','a','an','is','are','was','be','been','have','had','do','does','did',
  'will','would','could','should','may','might','shall','can','to','of','in',
  'for','on','with','at','by','from','as','into','this','that','and','but',
  'or','nor','not','how','what','when','where','why','which','who','i','my',
  'your','its','our','their','we','you','it','he','she','they',
]);

// Synonyms for intelligent matching
const SYNONYMS: Record<string, string[]> = {
  chatgpt:    ['openai', 'gpt', 'llm', 'ai'],
  ai:         ['chatgpt', 'claude', 'llm', 'gpt', 'openai', 'machine', 'learning'],
  node:       ['nodejs', 'node.js', 'npm'],
  js:         ['javascript'],
  ts:         ['typescript'],
  py:         ['python'],
  db:         ['database', 'postgres', 'mysql', 'sql'],
  api:        ['rest', 'endpoint', 'http', 'request'],
  json:       ['jsonp', 'payload', 'data'],
  jwt:        ['token', 'bearer', 'auth', 'authentication'],
  sql:        ['mysql', 'postgres', 'postgresql', 'sqlite', 'database'],
  error:      ['bug', 'issue', 'exception', 'problem', 'fix', 'debug'],
  guide:      ['tutorial', 'how', 'example', 'learn'],
  security:   ['privacy', 'protect', 'safe', 'shield', 'mask', 'secret'],
  mask:       ['obfuscate', 'anonymize', 'shield', 'hide', 'protect'],
  key:        ['secret', 'credential', 'token', 'password'],
  search:     ['find', 'query', 'lookup'],
  fast:       ['performance', 'speed', 'optimize', 'quick'],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const dp: number[][] = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) dp[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      dp[i][j] = b[i - 1] === a[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[b.length][a.length];
}

function fuzzyMatch(term: string, word: string): boolean {
  if (word === term) return true;
  if (word.startsWith(term) || word.endsWith(term)) return true;
  if (term.length <= 3) return false;
  if (word.startsWith(term.slice(0, 3)) && levenshtein(term, word) <= 2) return true;
  return false;
}

function expandTerms(terms: string[]): string[] {
  const expanded = new Set(terms);
  for (const term of terms) {
    const syns = SYNONYMS[term];
    if (syns) syns.forEach((s) => expanded.add(s));
  }
  return Array.from(expanded);
}

function scorePost(post: BlogPost, rawTerms: string[]): number {
  if (rawTerms.length === 0) return 0;
  const terms = expandTerms(rawTerms);
  const title = post.title.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();
  const cat = post.category.toLowerCase();
  const kws = post.keywords.map((k) => k.toLowerCase());
  const fullText = `${title} ${excerpt} ${kws.join(' ')} ${cat}`;
  const titleWords = title.split(/\W+/);
  const allWords = fullText.split(/\W+/);

  let score = 0;

  for (const term of rawTerms) {
    // Title — highest priority
    if (titleWords.some((w) => w === term)) { score += 100; }
    else if (title.includes(term)) { score += 70; }
    // Keyword match
    const kwMatch = kws.some((k) => k.includes(term) || term.includes(k));
    if (kwMatch) score += 50;
    // Category
    if (cat.includes(term)) score += 40;
    // Excerpt
    if (excerpt.includes(term)) score += 20;
    // Fuzzy match
    if (!title.includes(term) && !excerpt.includes(term)) {
      if (allWords.some((w) => w.length > 3 && fuzzyMatch(term, w))) score += 8;
    }
    // Frequency bonus in title
    const freq = (title.match(new RegExp(term, 'g')) ?? []).length;
    if (freq > 1) score += freq * 5;
  }

  // Synonym expansion bonus
  for (const syn of expandTerms(rawTerms).filter((s) => !rawTerms.includes(s))) {
    if (title.includes(syn)) score += 15;
    else if (kws.some((k) => k.includes(syn))) score += 10;
  }

  // Multi-term phrase bonus
  if (rawTerms.length > 1) {
    const phrase = rawTerms.join(' ');
    if (title.includes(phrase)) score += 40;
    if (excerpt.includes(phrase)) score += 20;
  }

  // Recency boost (small)
  const year = parseInt(post.date.split('-')[0], 10);
  score += (year - 2020) * 2;

  return score;
}

// ─── Text highlighter ──────────────────────────────────────────────────────────
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const escaped = terms
    .filter((t) => t.length > 1)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) return <>{text}</>;
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        escaped.some((e) => new RegExp(`^${e}$`, 'i').test(part)) ? (
          <mark key={i} className="bg-yellow-200 text-zinc-900 rounded-sm not-italic font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ─── Parse read time to minutes ────────────────────────────────────────────────
function parseMinutes(readTime: string): number {
  return parseInt(readTime.match(/\d+/)?.[0] ?? '5', 10);
}

// ─── Post card ─────────────────────────────────────────────────────────────────
function PostCard({
  post,
  latest = false,
  searchTerms = [],
}: {
  post: BlogPost;
  latest?: boolean;
  searchTerms?: string[];
}) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const c = catStyle(post.category);
  const isSearching = searchTerms.length > 0;
  const mins = parseMinutes(post.readTime);
  const readLabel = mins <= 5 ? 'Quick read' : mins <= 10 ? 'Medium' : 'Deep dive';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-zinc-300">
      {/* Category accent bar */}
      <div className={`h-[3px] w-full ${c.dot}`} />

      <div className="flex flex-1 flex-col p-5">
        {/* Badges row */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {post.category}
          </span>
          {latest && !isSearching && (
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
              Latest
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-400 border border-zinc-100">
            <Clock className="h-2.5 w-2.5" />
            {readLabel}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <h2 className="text-[15px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 line-clamp-2">
            {isSearching ? <Highlight text={post.title} terms={searchTerms} /> : post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-3">
          {isSearching ? <Highlight text={post.excerpt} terms={searchTerms} /> : post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>{dateStr}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="flex items-center gap-1 text-[12px] font-semibold text-zinc-400 transition-colors group-hover:text-zinc-900"
          >
            Read
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── No results state ──────────────────────────────────────────────────────────
function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  const suggestions = ['JSON', 'API', 'ChatGPT', 'JWT', 'Python', 'SQL', 'TypeScript', 'debugging'];
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-zinc-100 p-4">
        <Search className="h-7 w-7 text-zinc-400" />
      </div>
      <h3 className="text-[15px] font-bold text-zinc-900">No results for &ldquo;{query}&rdquo;</h3>
      <p className="mt-2 text-[13px] text-zinc-500 max-w-sm">
        Try a different search term, check your spelling, or browse by category.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            onClick={onClear}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
      >
        Clear search
      </button>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
const PER_PAGE_SEARCH = 18;
const PER_PAGE_BROWSE = 9;

export function BlogListClient({
  allPosts,
  initialPosts,
  totalPages: serverTotalPages,
  currentPage: serverCurrentPage,
}: BlogListClientProps) {

  // ── State ──────────────────────────────────────────────────────────────────
  const [rawQuery, setRawQuery]       = useState('');
  const [debouncedQuery, setDQ]       = useState('');
  const [activeCategory, setActiveCat] = useState('All');
  const [sortOrder, setSortOrder]     = useState<'latest' | 'oldest' | 'shortest' | 'longest'>('latest');
  const [readTimeFilter, setReadTime] = useState<'any' | 'quick' | 'medium' | 'deep'>('any');
  const [searchPage, setSearchPage]   = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const searchRef   = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // ── Keyboard shortcut ──────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        searchRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Debounced search ───────────────────────────────────────────────────────
  const handleInput = useCallback((value: string) => {
    setRawQuery(value);
    setSearchPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDQ(value), 220);
  }, []);

  const clearSearch = useCallback(() => {
    setRawQuery('');
    setDQ('');
    setSearchPage(1);
    searchRef.current?.focus();
  }, []);

  const clearAll = useCallback(() => {
    setRawQuery('');
    setDQ('');
    setActiveCat('All');
    setSortOrder('latest');
    setReadTime('any');
    setSearchPage(1);
  }, []);

  // ── Categories ─────────────────────────────────────────────────────────────
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allPosts) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([cat]) => cat);
  }, [allPosts]);

  // ── Filtered + sorted + scored posts ──────────────────────────────────────
  const terms      = useMemo(() => tokenize(debouncedQuery), [debouncedQuery]);
  const isSearching = debouncedQuery.trim().length > 0;
  const hasFilters  = activeCategory !== 'All' || readTimeFilter !== 'any' || sortOrder !== 'latest';

  const results = useMemo(() => {
    let pool = allPosts;

    // Category filter
    if (activeCategory !== 'All') {
      pool = pool.filter((p) => p.category === activeCategory);
    }

    // Read time filter
    if (readTimeFilter !== 'any') {
      pool = pool.filter((p) => {
        const m = parseMinutes(p.readTime);
        if (readTimeFilter === 'quick')  return m <= 5;
        if (readTimeFilter === 'medium') return m >= 6 && m <= 10;
        if (readTimeFilter === 'deep')   return m >= 11;
        return true;
      });
    }

    if (isSearching) {
      // Score and rank
      const scored = pool
        .map((p) => ({ post: p, score: scorePost(p, terms) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);
      return scored.map(({ post }) => post);
    }

    // Sort by sort order
    const copy = [...pool];
    switch (sortOrder) {
      case 'oldest':   return copy.sort((a, b) => a.date.localeCompare(b.date));
      case 'shortest': return copy.sort((a, b) => parseMinutes(a.readTime) - parseMinutes(b.readTime));
      case 'longest':  return copy.sort((a, b) => parseMinutes(b.readTime) - parseMinutes(a.readTime));
      default:         return copy; // already newest-first
    }
  }, [allPosts, activeCategory, readTimeFilter, isSearching, terms, sortOrder]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const perPage      = isSearching ? PER_PAGE_SEARCH : PER_PAGE_BROWSE;
  const totalResults = results.length;
  const totalPgs     = isSearching
    ? Math.ceil(totalResults / PER_PAGE_SEARCH)
    : (hasFilters ? Math.ceil(totalResults / PER_PAGE_BROWSE) : serverTotalPages);
  const curPage      = isSearching || hasFilters ? searchPage : serverCurrentPage;

  const pagePosts = useMemo(() => {
    if (!isSearching && !hasFilters) return initialPosts;
    const start = (searchPage - 1) * perPage;
    return results.slice(start, start + perPage);
  }, [isSearching, hasFilters, initialPosts, results, searchPage, perPage]);

  const prevPage = () => { if (searchPage > 1) setSearchPage((p) => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const nextPage = () => { if (searchPage < totalPgs) setSearchPage((p) => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // active filter count (excluding search query)
  const activeFilterCount = [
    activeCategory !== 'All',
    readTimeFilter !== 'any',
    sortOrder !== 'latest',
  ].filter(Boolean).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── STICKY SEARCH + FILTER BAR ──────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-full px-5 sm:px-6 lg:px-8">

          {/* Search input row */}
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={rawQuery}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Search 200+ articles — topics, technologies, error types…"
                aria-label="Search articles"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-10 pr-14 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-400 focus:bg-white transition-all"
              />
              {rawQuery ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 hover:bg-zinc-300 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 select-none">
                  ⌘K
                </kbd>
              )}
            </div>

            {/* Filter toggle */}
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-label="Toggle filters"
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Category pills row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 scrollbar-none -mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {/* All pill */}
            <button
              type="button"
              onClick={() => { setActiveCat('All'); setSearchPage(1); }}
              className={`shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              All · {allPosts.length}
            </button>

            {categories.map((cat) => {
              const c = catStyle(cat);
              const count = allPosts.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setActiveCat(cat); setSearchPage(1); }}
                  className={`shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all ${
                    isActive ? c.activePill : c.pill
                  }`}
                >
                  {CAT_SHORT[cat] ?? cat} · {count}
                </button>
              );
            })}
          </div>

          {/* Expandable filter panel */}
          {showFilters && (
            <div className="py-3 border-t border-zinc-100 flex flex-wrap items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide shrink-0">Sort</label>
                <div className="flex items-center gap-1">
                  {([
                    { value: 'latest',   label: 'Latest' },
                    { value: 'oldest',   label: 'Oldest' },
                    { value: 'shortest', label: 'Shortest' },
                    { value: 'longest',  label: 'Longest' },
                  ] as const).map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { setSortOrder(value); setSearchPage(1); }}
                      className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                        sortOrder === value
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-4 w-px bg-zinc-200 hidden sm:block" />

              {/* Read time */}
              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide shrink-0">Length</label>
                <div className="flex items-center gap-1">
                  {([
                    { value: 'any',    label: 'Any' },
                    { value: 'quick',  label: '≤5 min' },
                    { value: 'medium', label: '6–10 min' },
                    { value: 'deep',   label: '11+ min' },
                  ] as const).map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { setReadTime(value); setSearchPage(1); }}
                      className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                        readTimeFilter === value
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear all */}
              {(isSearching || hasFilters) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11.5px] font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT AREA ────────────────────────────────────────── */}
      <div className="mx-auto max-w-full px-5 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Results header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          {isSearching ? (
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden />
              <p className="text-[13px] font-semibold text-zinc-900">
                {totalResults === 0
                  ? 'No results'
                  : `${totalResults} result${totalResults !== 1 ? 's' : ''}`}
                {' '}for{' '}
                <span className="font-bold text-emerald-700">&ldquo;{debouncedQuery}&rdquo;</span>
              </p>
              {totalResults > 0 && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-500 hover:bg-zinc-50 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
          ) : activeCategory !== 'All' ? (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-400" aria-hidden />
              <p className="text-[13px] font-semibold text-zinc-900">
                {totalResults} article{totalResults !== 1 ? 's' : ''} in{' '}
                <span className={`font-bold ${catStyle(activeCategory).text}`}>{activeCategory}</span>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-400" aria-hidden />
              <div>
                <h2 className="text-[1.1rem] font-bold tracking-tight text-zinc-900">
                  {sortOrder === 'latest' ? 'Latest articles' :
                   sortOrder === 'oldest' ? 'Oldest articles' :
                   sortOrder === 'shortest' ? 'Shortest reads' : 'Deep dives'}
                </h2>
                {curPage === 1 && (
                  <p className="text-[12px] text-zinc-500">Most recently published guides</p>
                )}
              </div>
            </div>
          )}

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-500 shadow-sm">
            {isSearching || hasFilters
              ? `${totalResults} of ${allPosts.length} articles`
              : `${allPosts.length} total articles`}
          </span>
        </div>

        {/* Active filter chips */}
        {(activeCategory !== 'All' || readTimeFilter !== 'any' || sortOrder !== 'latest') && (
          <div className="mb-5 flex flex-wrap gap-2">
            {activeCategory !== 'All' && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${catStyle(activeCategory).bg} ${catStyle(activeCategory).text}`}>
                <Hash className="h-3 w-3" />
                {activeCategory}
                <button type="button" onClick={() => { setActiveCat('All'); setSearchPage(1); }} aria-label="Remove category filter" className="ml-0.5 hover:opacity-70">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {readTimeFilter !== 'any' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600">
                <Clock className="h-3 w-3" />
                {readTimeFilter === 'quick' ? '≤5 min' : readTimeFilter === 'medium' ? '6–10 min' : '11+ min'}
                <button type="button" onClick={() => { setReadTime('any'); setSearchPage(1); }} aria-label="Remove read time filter" className="ml-0.5 hover:opacity-70">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {sortOrder !== 'latest' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600">
                <Zap className="h-3 w-3" />
                {sortOrder === 'oldest' ? 'Oldest first' : sortOrder === 'shortest' ? 'Shortest first' : 'Longest first'}
                <button type="button" onClick={() => { setSortOrder('latest'); setSearchPage(1); }} aria-label="Remove sort filter" className="ml-0.5 hover:opacity-70">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Post grid / No results */}
        {pagePosts.length === 0 && isSearching ? (
          <NoResults query={debouncedQuery} onClear={clearSearch} />
        ) : pagePosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] text-zinc-500">No articles match the current filters.</p>
            <button type="button" onClick={clearAll} className="mt-3 text-sm font-semibold text-emerald-600 hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="feed" aria-label="Blog posts">
            {pagePosts.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                latest={!isSearching && !hasFilters && serverCurrentPage === 1 && i === 0}
                searchTerms={isSearching ? terms : []}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPgs > 1 && pagePosts.length > 0 && (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            {/* Prev */}
            {curPage <= 1 ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] font-medium text-zinc-300 cursor-not-allowed select-none">
                <ChevronLeft className="h-4 w-4" /> Prev
              </span>
            ) : isSearching || hasFilters ? (
              <button type="button" onClick={prevPage} className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
            ) : (
              <Link href={curPage === 2 ? '/blog' : `/blog?page=${curPage - 1}`} className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                <ChevronLeft className="h-4 w-4" /> Prev
              </Link>
            )}

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPgs }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPgs <= 7) return true;
                  if (p === 1 || p === totalPgs) return true;
                  return Math.abs(p - curPage) <= 1;
                })
                .reduce<number[]>((acc, p, i, arr) => {
                  if (i > 0 && arr[i - 1] !== p - 1) acc.push(-1);
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === -1 ? (
                    <span key={`e-${idx}`} className="px-1.5 text-[13px] text-zinc-400">…</span>
                  ) : isSearching || hasFilters ? (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setSearchPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      aria-current={p === curPage ? 'page' : undefined}
                      className={p === curPage
                        ? 'min-w-[2.25rem] inline-flex items-center justify-center rounded-xl py-2 text-[13px] font-semibold bg-zinc-900 text-white'
                        : 'min-w-[2.25rem] inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors'}
                    >
                      {p}
                    </button>
                  ) : (
                    <Link
                      key={p}
                      href={p === 1 ? '/blog' : `/blog?page=${p}`}
                      aria-current={p === curPage ? 'page' : undefined}
                      className={p === curPage
                        ? 'min-w-[2.25rem] inline-flex items-center justify-center rounded-xl py-2 text-[13px] font-semibold bg-zinc-900 text-white'
                        : 'min-w-[2.25rem] inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors'}
                    >
                      {p}
                    </Link>
                  )
                )}
            </div>

            {/* Next */}
            {curPage >= totalPgs ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] font-medium text-zinc-300 cursor-not-allowed select-none">
                Next <ChevronRight className="h-4 w-4" />
              </span>
            ) : isSearching || hasFilters ? (
              <button type="button" onClick={nextPage} className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <Link href={`/blog?page=${curPage + 1}`} className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                Next <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </nav>
        )}

        {totalPgs > 1 && pagePosts.length > 0 && (
          <p className="mt-3 text-center text-[12px] text-zinc-400">
            Page {curPage} of {totalPgs}
            {(isSearching || hasFilters) && ` · ${totalResults} article${totalResults !== 1 ? 's' : ''} match`}
          </p>
        )}
      </div>
    </div>
  );
}
