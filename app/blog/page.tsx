import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Blog | UnblockDevs',
  description: 'Read our developer blog for tutorials, guides, and tips on web development, JSON tools, API testing, and more.',
  keywords: [
    'developer blog',
    'web development blog',
    'JSON tutorials',
    'API testing guides',
    'HTML guides',
    'programming tips',
    'developer resources'
  ],
  openGraph: {
    title: 'Developer Blog | UnblockDevs',
    description: 'Read our developer blog for tutorials, guides, and tips on web development.',
    type: 'website',
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'html-tags-explained-guide',
    title: 'HTML Tags Explained: Must-Do Practices, Hidden Facts & Pro Tips',
    description: 'Master HTML tags with this comprehensive guide. Learn essential HTML tags, best practices, lesser-known facts, and pro tips to write cleaner, smarter HTML code.',
    date: '2024-01-20',
    category: 'Web Development',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Developer Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tutorials, guides, and tips on web development, JSON tools, API testing, and more.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium group">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

