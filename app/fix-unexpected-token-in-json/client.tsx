'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Wrench, ExternalLink } from 'lucide-react';

export default function FixUnexpectedTokenClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix "Unexpected token {'}'} in JSON" Error</h1>
              <p className="text-sm text-gray-500 mt-1">Complete guide to fixing this common JSON error</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Unexpected token {'}'} in JSON"</strong> error typically occurs when there's a trailing comma before a closing brace, 
              or when JSON structure is malformed. This is one of the most common JSON syntax errors.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Causes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Trailing comma before closing brace <code className="bg-gray-100 px-1 rounded">{'}'}</code></li>
              <li>Trailing comma before closing bracket <code className="bg-gray-100 px-1 rounded">]</code></li>
              <li>Extra commas in JSON structure</li>
              <li>Missing quotes around keys or values</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Broken JSON Example</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">❌ Broken JSON (Trailing Comma):</p>
              <pre className="bg-white p-4 rounded border border-red-200 text-sm overflow-x-auto">
{`{
  "name": "John",
  "age": 30,  ← Trailing comma error
}`}
              </pre>
              <p className="text-sm text-red-700 mt-2">
                <strong>Error:</strong> <code className="bg-red-100 px-1 rounded">Unexpected token {'}'} in JSON at position 45</code>
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">✅ Fixed JSON:</p>
              <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "name": "John",
  "age": 30
}`}
              </pre>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix This Error Instantly</h2>
                <p className="text-blue-100">
                  Our free JSON Fixer automatically removes trailing commas and fixes this error in seconds.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try JSON Fixer Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

