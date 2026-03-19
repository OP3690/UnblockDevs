'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts-data';

export default function AutoRelatedBlogPosts() {
  const pathname = usePathname();

  const related = useMemo(() => {
    if (!pathname || !pathname.startsWith('/blog/')) return null;
    const slug = pathname.replace('/blog/', '').split('/')[0];
    if (!slug || slug.includes('?')) return null;

    const current = blogPosts.find((post) => post.slug === slug);
    if (!current) return null;

    const sameCategory = blogPosts
      .filter((post) => post.slug !== slug && post.category === current.category)
      .slice(0, 4);

    return {
      category: current.category,
      posts: sameCategory,
    };
  }, [pathname]);

  if (!related || related.posts.length === 0) return null;

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold text-gray-900">Related {related.category} Guides</h2>
      <p className="mt-2 text-sm text-gray-600">
        Continue with closely related troubleshooting guides and developer workflows.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:border-blue-400 hover:text-gray-900"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
