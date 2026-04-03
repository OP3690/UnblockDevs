'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts-data';

type BlogListClientProps = {
  initialPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
};

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'JSON & Logs':                    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500' },
  'AI & Security':                  { bg: 'bg-violet-50',   text: 'text-violet-700',   dot: 'bg-violet-500' },
  'APIs':                           { bg: 'bg-sky-50',      text: 'text-sky-700',      dot: 'bg-sky-500' },
  'Algorithms':                     { bg: 'bg-amber-50',    text: 'text-amber-700',    dot: 'bg-amber-500' },
  'ML & AI':                        { bg: 'bg-fuchsia-50',  text: 'text-fuchsia-700',  dot: 'bg-fuchsia-500' },
  'Data Engineering & Analytics':   { bg: 'bg-orange-50',   text: 'text-orange-700',   dot: 'bg-orange-500' },
  'Web Development':                { bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-500' },
  'DevTools':                       { bg: 'bg-zinc-100',    text: 'text-zinc-700',     dot: 'bg-zinc-400' },
};
const DEFAULT_CAT = { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400' };

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

function FeaturedCard({ post }: { post: BlogPost }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const c = catColor(post.category);

  return (
    <article className="group relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] hover:border-zinc-300">
      {/* Category-colored accent bar */}
      <div className={`h-[3px] w-full ${c.dot}`} />
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <CategoryBadge category={post.category} />
          <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
            Latest
          </span>
        </div>
        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700 sm:text-[1.75rem] line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-500 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 text-[12px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{dateStr}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const c = catColor(post.category);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:border-zinc-300">
      {/* Category-colored accent bar */}
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

export function BlogListClient({ initialPosts, totalPages, currentPage }: BlogListClientProps) {
  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage && initialPosts.length > 0 ? initialPosts[0] : null;
  const gridPosts = isFirstPage ? initialPosts.slice(1) : initialPosts;

  return (
    <>
      {/* Featured card — page 1's latest post */}
      {featuredPost && <FeaturedCard post={featuredPost} />}

      {/* Post grid */}
      {gridPosts.length > 0 && (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="feed"
          aria-label="Blog posts"
        >
          {gridPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          {currentPage <= 1 ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-[13px] font-medium text-zinc-400 cursor-not-allowed" aria-disabled>
              <ChevronLeft className="h-4 w-4" /> Prev
            </span>
          ) : (
            <Link
              href={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Link>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                if (totalPages <= 7) return true;
                if (p === 1 || p === totalPages) return true;
                if (Math.abs(p - currentPage) <= 1) return true;
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
                  <Link
                    key={p}
                    href={p === 1 ? '/blog' : `/blog?page=${p}`}
                    aria-current={p === currentPage ? 'page' : undefined}
                    className={
                      p === currentPage
                        ? 'min-w-[2.25rem] inline-flex items-center justify-center rounded-lg py-2 text-[13px] font-semibold bg-zinc-900 text-white'
                        : 'min-w-[2.25rem] inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors'
                    }
                  >
                    {p}
                  </Link>
                )
              )}
          </div>

          {currentPage >= totalPages ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-[13px] font-medium text-zinc-400 cursor-not-allowed" aria-disabled>
              Next <ChevronRight className="h-4 w-4" />
            </span>
          ) : (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Next page"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </nav>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-[12px] text-zinc-400">
          Page {currentPage} of {totalPages}
        </p>
      )}
    </>
  );
}
