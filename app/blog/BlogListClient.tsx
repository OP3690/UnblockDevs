'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, X, ChevronDown } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts-data';
import AdUnit from '@/components/AdUnit';

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

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

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const c = catColor(post.category);

  if (featured) {
    return (
      <article className="group col-span-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:border-zinc-300">
        <div className={`h-[3px] w-full ${c.dot}`} />
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
          <div className="flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <CategoryBadge category={post.category} />
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
                Latest
              </span>
            </div>
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              <h2 className="text-[18px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700 sm:text-[20px]">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-500 line-clamp-2 sm:line-clamp-3">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.date}>{dateStr}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </div>
          <div className="flex sm:shrink-0 sm:items-center">
            <Link
              href={`/blog/${post.slug}`}
              aria-label={`Read ${post.title}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors group-hover:bg-zinc-700"
            >
              Read guide
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:border-zinc-300">
      <div className={`h-[3px] w-full ${c.dot}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <CategoryBadge category={post.category} />
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

export function BlogListClient({ allPosts }: BlogListClientProps) {
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const topCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allPosts) counts[p.category] = (counts[p.category] || 0) + 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([cat, count]) => ({ cat, count }));
  }, [allPosts]);

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

  const isFiltered = !!(selectedCat || search.trim());
  const visiblePosts = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const remaining = filtered.length - visible;

  function selectCat(cat: string) { setSelectedCat(cat); setVisible(INITIAL_COUNT); }
  function updateSearch(q: string) { setSearch(q); setVisible(INITIAL_COUNT); }
  function loadMore() { setVisible((v) => v + LOAD_MORE_COUNT); }

  return (
    <>
      {/* ART2 banner — above filter bar, high viewability */}
      <div role="region" aria-label="Advertisement" className="mb-6 overflow-hidden rounded-xl">
        <AdUnit slot="6289722500" format="fluid" layout="in-article" minHeight={90} className="w-full rounded-xl overflow-hidden" />
      </div>

      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div className="mb-6 space-y-3">
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
            ? 'No articles found — try a different search.'
            : isFiltered
            ? `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found${selectedCat ? ` in "${selectedCat}"` : ''}`
            : `${filtered.length} articles · showing ${Math.min(visible, filtered.length)}`}
        </p>
        {isFiltered && (
          <button
            onClick={() => { selectCat(''); updateSearch(''); }}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-500 hover:text-zinc-900"
          >
            <X className="h-3 w-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Empty state */}
      {visiblePosts.length === 0 ? (
        <div className="py-16 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-zinc-100 p-4">
            <svg className="h-7 w-7 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <h3 className="text-[15px] font-bold text-zinc-900">No articles found</h3>
          <p className="mt-2 text-[13px] text-zinc-500 max-w-sm">Try a different search term or browse all categories.</p>
          <button
            onClick={() => { selectCat(''); updateSearch(''); }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-[13px] font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="feed" aria-label="Blog posts">
            {visiblePosts.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={i === 0 && !isFiltered}
              />
            ))}
          </div>

          {/* In-feed ad — shown after first 6+ posts are visible */}
          {visiblePosts.length >= 6 && (
            <div role="region" aria-label="Advertisement" className="mt-6 overflow-hidden rounded-xl">
              <AdUnit slot="6611398233" format="fluid" layout="in-article" minHeight={90} className="w-full rounded-xl overflow-hidden" />
            </div>
          )}

          {/* Second in-feed ad — shown after 18+ posts (load-more users) */}
          {visiblePosts.length >= 18 && (
            <div role="region" aria-label="Advertisement" className="mt-6 overflow-hidden rounded-xl">
              <AdUnit slot="1130443324" format="auto" minHeight={90} className="w-full rounded-xl overflow-hidden" />
            </div>
          )}
        </>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-2.5 text-[13px] font-semibold text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md active:translate-y-0"
          >
            <ChevronDown className="h-4 w-4 text-zinc-400" />
            Load {Math.min(LOAD_MORE_COUNT, remaining)} more article{remaining !== 1 ? 's' : ''}
          </button>
          <p className="text-[12px] text-zinc-400">
            Showing {Math.min(visible, filtered.length)} of {filtered.length} articles
          </p>
        </div>
      )}

      {!hasMore && filtered.length > INITIAL_COUNT && (
        <p className="mt-10 text-center text-[12px] text-zinc-400">
          All {filtered.length} articles loaded
        </p>
      )}
    </>
  );
}
