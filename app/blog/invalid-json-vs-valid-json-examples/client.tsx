'use client';

import Link from 'next/link';
import { ArrowLeft, X, CheckCircle, ExternalLink } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
export default function InvalidJsonVsValidJsonClient() {
  const examples = [
    {
      title: 'Single Quotes',
      invalid: `{'name': 'John'}`,
      valid: `{"name": "John"}`,
      reason: 'JSON only accepts double quotes for strings'
    },
    {
      title: 'Trailing Comma',
      invalid: `{"name": "John", "age": 30,}`,
      valid: `{"name": "John", "age": 30}`,
      reason: 'No trailing commas allowed before closing braces'
    },
    {
      title: 'Comments',
      invalid: `{// comment\n"name": "John"}`,
      valid: `{"name": "John"}`,
      reason: 'JSON does not support comments'
    },
    {
      title: 'NaN Value',
      invalid: `{"price": NaN}`,
      valid: `{"price": null}`,
      reason: 'NaN is not valid in JSON, use null instead'
    },
    {
      title: 'Infinity Value',
      invalid: `{"count": Infinity}`,
      valid: `{"count": null}`,
      reason: 'Infinity is not valid in JSON'
    },
    {
      title: 'Unquoted Keys',
      invalid: `{name: "John"}`,
      valid: `{"name": "John"}`,
      reason: 'All keys must be wrapped in double quotes'
    },
    {
      title: 'Undefined Value',
      invalid: `{"middleName": undefined}`,
      valid: `{"middleName": null}`,
      reason: 'undefined is not valid in JSON, use null or omit'
    },
    {
      title: 'Missing Closing Brace',
      invalid: `{"users": [{"name": "John"}]`,
      valid: `{"users": [{"name": "John"}]}`,
      reason: 'Every opening brace needs a closing brace'
    },
    {
      title: 'Unescaped Quotes',
      invalid: `{"message": "He said "Hello""}`,
      valid: `{"message": "He said \\"Hello\\""}`,
      reason: 'Quotes inside strings must be escaped'
    },
    {
      title: 'Trailing Comma in Array',
      invalid: `[1, 2, 3,]`,
      valid: `[1, 2, 3]`,
      reason: 'No trailing commas in arrays'
    },
    {
      title: 'Function Value',
      invalid: `{"handler": function() {}}`,
      valid: `{"handler": null}`,
      reason: 'Functions are not valid JSON values'
    },
    {
      title: 'Date Object',
      invalid: `{"date": new Date()}`,
      valid: `{"date": "2025-01-15T00:00:00.000Z"}`,
      reason: 'Date objects must be converted to strings'
    },
    {
      title: 'Multiple Root Objects',
      invalid: `{"a": 1}{"b": 2}`,
      valid: `[{"a": 1}, {"b": 2}]`,
      reason: 'JSON must have a single root object or array'
    },
    {
      title: 'Missing Comma',
      invalid: `{"name": "John" "age": 30}`,
      valid: `{"name": "John", "age": 30}`,
      reason: 'Properties must be separated by commas'
    },
    {
      title: 'Octal Numbers',
      invalid: `{"code": 0123}`,
      valid: `{"code": 123}`,
      reason: 'Octal notation is not valid in JSON'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Invalid JSON vs Valid JSON</h1>
          <p className="text-sm text-gray-500 mt-1">15 Real Examples Developers Get Wrong</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Invalid JSON vs Valid JSON"
        description="15 Real Examples Developers Get Wrong"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Understanding the difference between <strong>invalid JSON</strong> and <strong>valid JSON</strong> is crucial for every developer. 
              Many developers make the same mistakes repeatedly, causing errors in their applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this guide, we'll show you 15 real examples of invalid JSON vs valid JSON, explaining why each is wrong and how to fix it. 
              Use our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Validator</Link> to check your JSON instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparison Table: Invalid ❌ vs Valid ✅</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mistake</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Invalid JSON ❌</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Valid JSON ✅</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Why It's Wrong</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {examples.map((example, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{example.title}</td>
                      <td className="px-4 py-3 text-sm">
                        <code className="bg-red-50 text-red-800 px-2 py-1 rounded text-xs">{example.invalid}</code>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <code className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs">{example.valid}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{example.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Examples</h2>
            <div className="space-y-6">
              {examples.slice(0, 5).map((example, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">{example.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-red-900 mb-2 text-sm">❌ Invalid:</p>
                      <pre className="bg-white p-3 rounded border border-red-200 text-xs overflow-x-auto">{example.invalid}</pre>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-green-900 mb-2 text-sm">✅ Valid:</p>
                      <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto">{example.valid}</pre>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3"><strong>Why:</strong> {example.reason}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Validate JSON Instantly</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Validation:</p>
              <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                <li>Copy your JSON</li>
                <li>Paste it into our <Link href="/" className="font-semibold underline">JSON Validator</Link></li>
                <li>Get instant feedback on validity</li>
                <li>If invalid, use our <Link href="/" className="font-semibold underline">JSON Fixer</Link> to repair it</li>
              </ol>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate and Fix JSON Instantly</h2>
                <p className="text-blue-100">
                  Use our free JSON Validator to check your JSON, and JSON Fixer to repair any errors automatically.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=fixer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Validate JSON Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}

