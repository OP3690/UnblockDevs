'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts-data';

type BlogListClientProps = {
  initialPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
};

export function BlogListClient({ initialPosts, totalPages, currentPage }: BlogListClientProps) {
  return (
    <>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {initialPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-primary-200/60 transition-all duration-300 overflow-hidden"
          >
            <div className="p-5 sm:p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-lg">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2.5 line-clamp-2 group-hover:text-primary-600 transition-colors">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mt-auto">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
              >
                Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          aria-label="Blog pagination"
        >
          <span className="text-sm text-gray-500 self-center">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage <= 1 ? (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
              aria-disabled
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </span>
          ) : (
            <Link
              href={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
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
                  <span key={`ellip-${idx}`} className="px-2 text-gray-400">
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={p === 1 ? '/blog' : `/blog?page=${p}`}
                    className={
                      p === currentPage
                        ? 'min-w-[2.25rem] inline-flex items-center justify-center py-2 rounded-lg text-sm font-medium bg-primary-600 text-white'
                        : 'min-w-[2.25rem] inline-flex items-center justify-center py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                    }
                  >
                    {p}
                  </Link>
                )
              )}
          </div>
          {currentPage >= totalPages ? (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
              aria-disabled
            >
              Next <ChevronRight className="w-4 h-4" />
            </span>
          ) : (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Next page"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
