import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Blog | UnblockDevs',
  description: 'Read our developer blog for tutorials, guides, and tips on web development, JSON tools, API testing, HTML, CSS, and more.',
  keywords: [
    'developer blog',
    'web development blog',
    'JSON tutorials',
    'API testing guides',
    'HTML guides',
    'CSS guides',
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
  {
    slug: 'advanced-html5-apis-guide',
    title: 'Advanced HTML5 APIs Guide',
    description: 'Explore advanced HTML5 APIs including Geolocation, Web Storage, Web Workers, and more.',
    date: '2024-01-15',
    category: 'Web Development',
  },
  {
    slug: 'css-explained-guide',
    title: 'CSS Explained Guide',
    description: 'Comprehensive guide to CSS including selectors, layouts, animations, and modern CSS features.',
    date: '2024-01-10',
    category: 'Web Development',
  },
  {
    slug: 'html-interview-questions',
    title: 'HTML Interview Questions',
    description: 'Common HTML interview questions and answers to help you prepare for your next web development interview.',
    date: '2024-01-05',
    category: 'Interview Prep',
  },
  {
    slug: 'json-api-design-patterns',
    title: 'JSON API Design Patterns',
    description: 'Best practices and design patterns for building robust JSON APIs.',
    date: '2023-12-20',
    category: 'API Development',
  },
  {
    slug: 'json-best-practices-production-guide',
    title: 'JSON Best Practices Production Guide',
    description: 'Learn JSON best practices for production environments including validation, error handling, and performance optimization.',
    date: '2023-12-15',
    category: 'JSON',
  },
  {
    slug: 'json-format-standards-complete-guide',
    title: 'JSON Format Standards Complete Guide',
    description: 'Complete guide to JSON format standards, syntax, and validation rules.',
    date: '2023-12-10',
    category: 'JSON',
  },
  {
    slug: 'api-payload-size-optimization',
    title: 'API Payload Size Optimization',
    description: 'Techniques and strategies for optimizing API payload sizes to improve performance.',
    date: '2023-12-05',
    category: 'API Development',
  },
  {
    slug: 'api-response-comparator-testing-guide',
    title: 'API Response Comparator Testing Guide',
    description: 'How to use API response comparators for testing and detecting breaking changes.',
    date: '2023-11-30',
    category: 'API Testing',
  },
  {
    slug: 'complete-guide-json-viewer-parser-beautifier',
    title: 'Complete Guide: JSON Viewer, Parser & Beautifier',
    description: 'Complete guide to JSON viewing, parsing, and beautification tools and techniques.',
    date: '2023-11-25',
    category: 'JSON',
  },
  {
    slug: 'curl-to-code-converter-guide',
    title: 'Curl to Code Converter Guide',
    description: 'Learn how to convert curl commands to code in various programming languages.',
    date: '2023-11-20',
    category: 'API Development',
  },
  {
    slug: 'json-schema-generator-validation-guide',
    title: 'JSON Schema Generator & Validation Guide',
    description: 'Guide to generating and validating JSON schemas for API documentation and data validation.',
    date: '2023-11-15',
    category: 'JSON',
  },
  {
    slug: 'json-to-excel-converter-best-practices',
    title: 'JSON to Excel Converter Best Practices',
    description: 'Best practices for converting JSON data to Excel format efficiently.',
    date: '2023-11-10',
    category: 'JSON',
  },
  {
    slug: 'mysql-comma-separated-id-list-guide',
    title: 'MySQL Comma Separated ID List Guide',
    description: 'Guide to working with comma-separated ID lists in MySQL queries.',
    date: '2023-11-05',
    category: 'Database',
  },
  {
    slug: 'seo-optimized-html-markup',
    title: 'SEO Optimized HTML Markup',
    description: 'Learn how to write SEO-optimized HTML markup for better search engine visibility.',
    date: '2023-10-30',
    category: 'SEO',
  },
  {
    slug: 'structured-log-analysis-tools',
    title: 'Structured Log Analysis Tools',
    description: 'Tools and techniques for analyzing structured logs in JSON format.',
    date: '2023-10-25',
    category: 'DevOps',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Developer Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tutorials, guides, and tips on web development, JSON tools, API testing, HTML, CSS, and more.
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

