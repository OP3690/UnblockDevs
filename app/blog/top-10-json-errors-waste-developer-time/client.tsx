'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Wrench, ExternalLink } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
export default function Top10JsonErrorsClient() {
  const errors = [
    {
      rank: 1,
      error: 'Unexpected token <',
      cause: 'HTML error page returned instead of JSON',
      fix: 'Check API endpoint, verify Content-Type header',
      timeWasted: '5-15 minutes'
    },
    {
      rank: 2,
      error: 'Unexpected end of JSON input',
      cause: 'Missing closing braces or truncated response',
      fix: 'Add missing closing braces, check network request completion',
      timeWasted: '10-20 minutes'
    },
    {
      rank: 3,
      error: "Expected ',' or {'}'} after property value",
      cause: 'Missing comma between properties or trailing comma',
      fix: 'Add missing commas or remove trailing commas',
      timeWasted: '5-10 minutes'
    },
    {
      rank: 4,
      error: 'Invalid control character',
      cause: 'Unescaped newlines, tabs, or control characters',
      fix: 'Escape special characters or use JSON.stringify()',
      timeWasted: '10-15 minutes'
    },
    {
      rank: 5,
      error: "Unexpected token {'}'} in JSON",
      cause: 'Trailing comma before closing brace',
      fix: 'Remove trailing comma',
      timeWasted: '3-5 minutes'
    },
    {
      rank: 6,
      error: "Unexpected token ' in JSON",
      cause: 'Single quotes instead of double quotes',
      fix: 'Replace single quotes with double quotes',
      timeWasted: '5-10 minutes'
    },
    {
      rank: 7,
      error: 'Unexpected token / in JSON',
      cause: 'Comments in JSON (not allowed)',
      fix: 'Remove all // and /* */ comments',
      timeWasted: '5-8 minutes'
    },
    {
      rank: 8,
      error: 'Unexpected token u in JSON',
      cause: 'undefined value (not valid in JSON)',
      fix: 'Replace undefined with null or omit property',
      timeWasted: '5-10 minutes'
    },
    {
      rank: 9,
      error: 'Unexpected number in JSON',
      cause: 'NaN or Infinity values',
      fix: 'Replace with null or valid number',
      timeWasted: '8-12 minutes'
    },
    {
      rank: 10,
      error: 'Unexpected non-whitespace character',
      cause: 'Invalid characters or encoding issues',
      fix: 'Check encoding, remove invalid characters',
      timeWasted: '10-20 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Top 10 JSON Errors That Waste Developer Time</h1>
              <p className="text-sm text-gray-500 mt-1">And How to Avoid Them</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Top 10 JSON Errors That Waste Developer Time"
        description="And How to Avoid Them"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <CommissionDisclosure />
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              JSON errors can waste hours of developer time. You're debugging, searching Stack Overflow, trying different fixes - 
              all while your application is broken.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We've analyzed thousands of JSON errors and identified the <strong>top 10 JSON errors that waste the most developer time</strong>. 
              Learn why each error happens, how to fix it quickly, and how to prevent it. Use our free 
              <Link href="/" className="text-blue-600 hover:underline font-semibold"> JSON Fixer</Link> to fix these errors in seconds.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Top 10 Time-Wasting JSON Errors</h2>
            <div className="space-y-6">
              {errors.map((error) => (
                <div key={error.rank} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      {error.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{error.error}</h3>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Wastes: {error.timeWasted}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-red-900 mb-2 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Why It Happens:
                      </p>
                      <p className="text-red-800 text-sm">{error.cause}</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Quick Fix:
                      </p>
                      <p className="text-green-800 text-sm">{error.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prevention Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Always Validate JSON</h3>
                <p className="text-sm text-gray-700">Use our <Link href="/" className="text-blue-600 hover:underline">JSON Validator</Link> before using JSON in production.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Use JSON.stringify()</h3>
                <p className="text-sm text-gray-700">Never build JSON manually - use proper serialization.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Handle Errors Gracefully</h3>
                <p className="text-sm text-gray-700">Wrap JSON.parse() in try-catch blocks.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Use JSON Fixer as Backup</h3>
                <p className="text-sm text-gray-700">Keep our <Link href="/" className="text-blue-600 hover:underline">JSON Fixer</Link> bookmarked for quick fixes.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix JSON Errors in Seconds</h2>
                <p className="text-orange-100">
                  Don't waste time manually fixing JSON errors. Our free JSON Fixer automatically detects and repairs all 10 errors instantly.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=fixer"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Fix JSON Errors in Seconds with UnblockDevs
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

