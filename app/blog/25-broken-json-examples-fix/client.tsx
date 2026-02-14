'use client';

import Link from 'next/link';
import { ArrowLeft, X, CheckCircle, Wrench, ExternalLink } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
export default function BrokenJsonExamplesClient() {
  const examples = [
    { broken: `{'name': 'John'}`, fixed: `{"name": "John"}`, issue: 'Single quotes instead of double quotes' },
    { broken: `{"name": "John", "age": 30,}`, fixed: `{"name": "John", "age": 30}`, issue: 'Trailing comma' },
    { broken: `{name: "John"}`, fixed: `{"name": "John"}`, issue: 'Unquoted key' },
    { broken: `{"name": "John" "age": 30}`, fixed: `{"name": "John", "age": 30}`, issue: 'Missing comma' },
    { broken: `{"users": [{"name": "John"}]`, fixed: `{"users": [{"name": "John"}]}`, issue: 'Missing closing brace' },
    { broken: `{"message": "He said "Hello""}`, fixed: `{"message": "He said \\"Hello\\""}`, issue: 'Unescaped quotes' },
    { broken: `{// comment\n"name": "John"}`, fixed: `{"name": "John"}`, issue: 'Comments in JSON' },
    { broken: `{"price": NaN}`, fixed: `{"price": null}`, issue: 'NaN value' },
    { broken: `{"count": Infinity}`, fixed: `{"count": null}`, issue: 'Infinity value' },
    { broken: `{"middleName": undefined}`, fixed: `{"middleName": null}`, issue: 'undefined value' },
    { broken: `[1, 2, 3,]`, fixed: `[1, 2, 3]`, issue: 'Trailing comma in array' },
    { broken: `{"date": new Date()}`, fixed: `{"date": "2025-01-15T00:00:00.000Z"}`, issue: 'Date object' },
    { broken: `{"a": 1}{"b": 2}`, fixed: `[{"a": 1}, {"b": 2}]`, issue: 'Multiple root objects' },
    { broken: `{"code": 0123}`, fixed: `{"code": 123}`, issue: 'Octal number' },
    { broken: `{"message": "Line 1\nLine 2"}`, fixed: `{"message": "Line 1\\nLine 2"}`, issue: 'Unescaped newline' },
    { broken: `{"name": "John",, "age": 30}`, fixed: `{"name": "John", "age": 30}`, issue: 'Double comma' },
    { broken: `{"items": [1, 2, 3}`, fixed: `{"items": [1, 2, 3]}`, issue: 'Missing closing bracket' },
    { broken: `{"nested": {"key": "value"}`, fixed: `{"nested": {"key": "value"}}`, issue: 'Missing closing brace in nested object' },
    { broken: `{"tags": ["red", "blue",]`, fixed: `{"tags": ["red", "blue"]}`, issue: 'Trailing comma in array' },
    { broken: `{"value": true false}`, fixed: `{"value": true, "other": false}`, issue: 'Missing comma between values' },
    { broken: `{"name": "John" age: 30}`, fixed: `{"name": "John", "age": 30}`, issue: 'Missing comma and quotes' },
    { broken: `{"text": "Hello\nWorld"}`, fixed: `{"text": "Hello\\nWorld"}`, issue: 'Unescaped newline in string' },
    { broken: `{"data": {}}`, fixed: `{"data": {}}`, issue: 'Actually valid - empty object' },
    { broken: `{"list": [1, 2, 3, 4, 5}`, fixed: `{"list": [1, 2, 3, 4, 5]}`, issue: 'Missing closing bracket' },
    { broken: `{"key": value}`, fixed: `{"key": "value"}`, issue: 'Unquoted string value' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">25 Broken JSON Examples and How to Fix Them</h1>
          <p className="text-sm text-gray-500 mt-1">Learn from real mistakes developers make</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="25 Broken JSON Examples and How to Fix Them"
        description="Learn from real mistakes developers make"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Learning from broken JSON examples is one of the fastest ways to understand JSON syntax. 
              In this guide, we'll show you <strong>25 real broken JSON examples</strong> and how to fix each one.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each example includes the broken JSON, the fixed version, and an explanation. Use our free 
              <Link href="/" className="text-blue-600 hover:underline font-semibold"> JSON Fixer</Link> to fix these errors automatically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">25 Broken JSON Examples</h2>
            <div className="space-y-6">
              {examples.map((example, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900">{example.issue}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-red-900 mb-2 text-sm flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Broken JSON:
                      </p>
                      <pre className="bg-white p-3 rounded border border-red-200 text-xs overflow-x-auto">{example.broken}</pre>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Fixed JSON:
                      </p>
                      <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto">{example.fixed}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix All These Errors Instantly</h2>
                <p className="text-blue-100">
                  Don't manually fix broken JSON. Our free JSON Fixer automatically detects and repairs all 25 error types shown above.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=fixer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Fix Broken JSON Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}

