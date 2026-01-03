'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Wrench, ExternalLink } from 'lucide-react';

export default function FixExpectedCommaOrBraceClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Fix "Expected ',' or {'}'} after property value" Error</h1>
          <p className="text-sm text-gray-500 mt-1">Complete guide to fixing this JSON syntax error</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Expected ',' or {'}'} after property value"</strong> error occurs when JSON has a syntax issue 
              with property separators. The parser expects either a comma to continue with more properties, or a closing brace 
              to end the object.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This is usually caused by missing commas between properties or trailing commas. Learn how to fix it instantly 
              using our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Causes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Missing comma between properties</li>
              <li>Trailing comma before closing brace</li>
              <li>Extra comma in wrong place</li>
              <li>Missing closing brace</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Broken JSON Examples</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <p className="font-semibold text-red-900 mb-2">❌ Missing Comma:</p>
                <pre className="bg-white p-4 rounded border border-red-200 text-sm overflow-x-auto">
{`{
  "name": "John"
  "age": 30  ← Missing comma
}`}
                </pre>
                <p className="text-sm text-red-700 mt-2">
                  <strong>Error:</strong> Expected ',' or {'}'} after property value
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
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix This Error Instantly</h2>
                <p className="text-blue-100">
                  Our free JSON Fixer automatically detects and fixes missing commas and syntax errors.
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

