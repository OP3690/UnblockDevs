'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts-data';

const PER_PAGE = 9;

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string; filter: string }> = {
  'JSON & Logs':                    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500', filter: 'bg-emerald-500' },
  'JSON & APIs':                    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500', filter: 'bg-emerald-500' },
  'JSON Tools':                     { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500', filter: 'bg-emerald-500' },
  'AI & Security':                  { bg: 'bg-violet-50',   text: 'text-violet-700',   dot: 'bg-violet-500',  filter: 'bg-violet-500' },
  'AI & Machine Learning':          { bg: 'bg-violet-50',   text: 'text-violet-700',   dot: 'bg-violet-500',  filter: 'bg-violet-500' },
  'AI & Development':               { bg: 'bg-violet-50',   text: 'text-violet-700',   dot: 'bg-violet-500',  filter: 'bg-violet-500' },
  'AI & Systems':                   { bg: 'bg-violet-50',   text: 'text-violet-700',   dot: 'bg-violet-500',  filter: 'bg-violet-500' },
  'APIs':                           { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500',     filter: 'bg-sky-500' },
  'API Development':                { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500',     filter: 'bg-sky-500' },
  'API Development & Testing':      { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500',     filter: 'bg-sky-500' },
  'API Tools':                      { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500',     filter: 'bg-sky-500' },
  'API & Web Development':          { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500',     filter: 'bg-sky-500' },
  'Algorithms':                     { bg: 'bg-amber-50',    text: 'text-amber-700',    dot: 'bg-amber-500',   filter: 'bg-amber-500' },
  'Algorithms & Data Structures':   { bg: 'bg-amber-50',    text: 'text-amber-700',    dot: 'bg-amber-500',   filter: 'bg-amber-500' },
  'ML & AI':                        { bg: 'bg-fuchsia-50',  text: 'text-fuchsia-700',  dot: 'bg-fuchsia-500', filter: 'bg-fuchsia-500' },
  'Data Engineering & Analytics':   { bg: 'bg-orange-50',   text: 'text-orange-700',   dot: 'bg-orange-500',  filter: 'bg-orange-500' },
  'Data Engineering':               { bg: 'bg-orange-50',   text: 'text-orange-700',   dot: 'bg-orange-500',  filter: 'bg-orange-500' },
  'Web Development':                { bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-500',    filter: 'bg-blue-500' },
  'DevTools':                       { bg: 'bg-zinc-100',    text: 'text-zinc-700',     dot: 'bg-zinc-400',    filter: 'bg-zinc-600' },
  'Developer Tools':                { bg: 'bg-zinc-100',    text: 'text-zinc-700',     dot: 'bg-zinc-400',    filter: 'bg-zinc-600' },
  'Developer Tools & Git':          { bg: 'bg-zinc-100',    text: 'text-zinc-700',     dot: 'bg-zinc-400',    filter: 'bg-zinc-600' },
  'JavaScript & Development':       { bg: 'bg-yellow-50',   text: 'text-yellow-800',   dot: 'bg-yellow-500',  filter: 'bg-yellow-500' },
  'Node.js & Backend':              { bg: 'bg-green-50',    text: 'text-green-700',    dot: 'bg-green-500',   filter: 'bg-green-500' },
  'Node.js & Development':          { bg: 'bg-green-50',    text: 'text-green-700',    dot: 'bg-green-500',   filter: 'bg-green-500' },
  'Python & Development':           { bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-500',    filter: 'bg-blue-500' },
  'Java & Development':             { bg: 'bg-red-50',      text: 'text-red-700',      dot: 'bg-red-500',     filter: 'bg-red-500' },
  'MySQL & Database':               { bg: 'bg-cyan-50',     text: 'text-cyan-700',     dot: 'bg-cyan-500',    filter: 'bg-cyan-500' },
  'Programming & Development':      { bg: 'bg-indigo-50',   text: 'text-indigo-700',   dot: 'bg-indigo-500',  filter: 'bg-indigo-500' },
  'Security & Privacy':             { bg: 'bg-rose-50',     text: 'text-rose-700',     dot: 'bg-rose-500',    filter: 'bg-rose-500' },
  'Security & AI':                  { bg: 'bg-rose-50',     text: 'text-rose-700',     dot: 'bg-rose-500',    filter: 'bg-rose-500' },
  'Messaging & Communication':      { bg: 'bg-teal-50',     text: 'text-teal-700',     dot: 'bg-teal-500',    filter: 'bg-teal-500' },
  'Social Media Privacy':           { bg: 'bg-pink-50',     text: 'text-pink-700',     dot: 'bg-pink-500',    filter: 'bg-pink-500' },
  'Account Management':             { bg: 'bg-zinc-50',     text: 'text-zinc-600',     dot: 'bg-zinc-400',    filter: 'bg-zinc-500' },
  'Career & Skills':                { bg: 'bg-lime-50',     text: 'text-lime-700',     dot: 'bg-lime-500',    filter: 'bg-lime-600' },
};
const DEFAULT_CAT = { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400', filter: 'bg-zinc-500' };

function catColor(cat: string) {
  return CAT_COLORS[cat] ?? DEFAULT_CAT;
}

function CategoryBadge({ category }: { category: string }) {
  const c = catColor(category);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
}

function PostCard({ post, latest = false }: { post: BlogPost; latest?: boolean }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const c = catColor(post.category);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:border-zinc-300">
      {/* Category-colored accent bar */}
      <div className={`h-[3px] w-full ${c.dot}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <CategoryBadge category={post.category} />
          {latest && (
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
              Latest
            </span>
          )}
        </div>
        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <h2 className="text-[15px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700 line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-3">
          {post.excerpt}
        </p>
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

type BlogListClientProps = {
  allPosts: BlogPost[];
  initialPage?: number;
};

export function BlogListClient({ allPosts, initialPage = 1 }: BlogListClientProps) {
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(initialPage);

  /* Top 8 categories by post count */
  const topCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allPosts) counts[p.category] = (counts[p.category] || 0) + 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([cat, count]) => ({ cat, count }));
  }, [allPosts]);

  /* Filtered post list */
  const filtered = useMemo(() => {
    let posts = allPosts;
    if (selectedCat) posts = posts.filter((p) => p.category === selectedCat);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [allPosts, selectedCat, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const isFirstPage = safePage === 1 && !selectedCat && !search.trim();

  function selectCat(cat: string) { setSelectedCat(cat); setPage(1); }
  function updateSearch(q: string) { setSearch(q); setPage(1); }

  return (
    <>
      {/* ── Filter bar ────────────────────────────────────────────── */}
      <div className="mb-6 space-y-3">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-8 pr-8 text-[13px] text-zinc-800 placeholder:text-zinc-400 shadow-[0_1px_3px_rgba(0,0,0,0.04)] outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-colors"
          />
          {search && (
            <button
              onClick={() => updateSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded text-zinc-400 hover:text-zinc-700"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          <button
            onClick={() => selectCat('')}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all ${
              selectedCat === ''
                ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
          >
            All
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${selectedCat === '' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
              {allPosts.length}
            </span>
          </button>
          {topCategories.map(({ cat, count }) => {
            const c = catColor(cat);
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => selectCat(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all ${
                  active
                    ? `${c.filter} border-transparent text-white shadow-sm`
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white/70' : c.dot}`} />
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results meta */}
      <div className="mb-5 flex items-center justify-between gap-2">
        <p className="text-[12px] text-zinc-400 font-medium">
          {filtered.length === 0
            ? 'No articles found — try a different filter or search term.'
            : search || selectedCat
            ? `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found${selectedCat ? ` in "${selectedCat}"` : ''}`
            : `Showing ${pagePosts.length} of ${filtered.length} articles${totalPages > 1 ? ` · Page ${safePage} of ${totalPages}` : ''}`}
        </p>
        {(search || selectedCat) && (
          <button
            onClick={() => { selectCat(''); updateSearch(''); }}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-500 hover:text-zinc-900"
          >
            <X className="h-3 w-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Empty state */}
      {pagePosts.length === 0 ? (
        <div className="py-16 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-zinc-100 p-4">
            <svg className="h-7 w-7 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <h3 className="text-[15px] font-bold text-zinc-900">No articles found</h3>
          <p className="mt-2 text-[13px] text-zinc-500 max-w-sm">
            Try a different search term or browse all categories.
          </p>
          <button
            onClick={() => { selectCat(''); updateSearch(''); }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-[13px] font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="feed"
          aria-label="Blog posts"
        >
          {pagePosts.map((post, i) => (
            <PostCard key={post.slug} post={post} latest={isFirstPage && i === 0} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          {safePage <= 1 ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-[13px] font-medium text-zinc-400 cursor-not-allowed" aria-disabled>
              <ChevronLeft className="h-4 w-4" /> Prev
            </span>
          ) : (
            <button
              onClick={() => setPage(safePage - 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                if (totalPages <= 7) return true;
                if (p === 1 || p === totalPages) return true;
                if (Math.abs(p - safePage) <= 1) return true;
                return false;
              })
              .reduce<number[]>((acc, p, i, arr) => {
                if (i > 0 && arr[i - 1] !== p - 1) acc.push(-1);
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === -1 ? (
                  <span key={`ellip-${idx}`} className="px-1.5 text-[13px] text-zinc-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-current={p === safePage ? 'page' : undefined}
                    className={
                      p === safePage
                        ? 'min-w-[2.25rem] inline-flex items-center justify-center rounded-lg py-2 text-[13px] font-semibold bg-zinc-900 text-white'
                        : 'min-w-[2.25rem] inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors'
                    }
                  >
                    {p}
                  </button>
                )
              )}
          </div>

          {safePage >= totalPages ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-[13px] font-medium text-zinc-400 cursor-not-allowed" aria-disabled>
              Next <ChevronRight className="h-4 w-4" />
            </span>
          ) : (
            <button
              onClick={() => setPage(safePage + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Next page"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </nav>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-[12px] text-zinc-400">
          Page {safePage} of {totalPages}
        </p>
      )}
    </>
  );
}
