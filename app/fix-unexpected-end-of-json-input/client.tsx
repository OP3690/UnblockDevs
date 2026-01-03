'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, Wrench, ExternalLink } from 'lucide-react';

export default function FixUnexpectedEndOfJsonInputClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix "Unexpected end of JSON input" Error</h1>
              <p className="text-sm text-gray-500 mt-1">Complete guide to fixing this common JSON error</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Unexpected end of JSON input"</strong> error is one of the most common JSON parsing errors. 
              It occurs when JavaScript's <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> function receives incomplete or truncated JSON data.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This error typically means your JSON is missing closing braces, brackets, or is incomplete. In this guide, 
              we'll show you exactly what causes this error and how to fix it instantly using our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does "Unexpected end of JSON input" Mean?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error occurs when the JSON parser reaches the end of the input string before finding all required closing characters. 
              The parser expects more data but finds nothing, causing the error.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="font-semibold text-blue-900 mb-2">💡 Common Causes:</p>
              <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm">
                <li>Missing closing brace <code className="bg-blue-100 px-1 rounded">{'}'}</code> or bracket <code className="bg-blue-100 px-1 rounded">]</code></li>
                <li>Incomplete JSON string (truncated data)</li>
                <li>Empty string passed to <code className="bg-blue-100 px-1 rounded">JSON.parse()</code></li>
                <li>Network request that didn't complete</li>
                <li>File read that was cut off</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Broken JSON Example</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here's a typical example of JSON that causes the "Unexpected end of JSON input" error:
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">❌ Broken JSON (Missing Closing Brace):</p>
              <pre className="bg-white p-4 rounded border border-red-200 text-sm overflow-x-auto">
{`{
  "users": [
    {
      "name": "John",
      "age": 30
    }
  ]
  ← Missing closing brace here`}
              </pre>
              <p className="text-sm text-red-700 mt-2">
                <strong>Error:</strong> <code className="bg-red-100 px-1 rounded">Unexpected end of JSON input</code>
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">✅ Fixed JSON:</p>
              <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "users": [
    {
      "name": "John",
      "age": 30
    }
  ]
}`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Fix "Unexpected end of JSON input" Error</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check for Missing Closing Braces/Brackets</h3>
                  <p className="text-gray-700 text-sm">
                    Count all opening braces <code className="bg-gray-100 px-1 rounded">{`{`}</code> and brackets <code className="bg-gray-100 px-1 rounded">[</code> and ensure 
                    they have matching closing braces <code className="bg-gray-100 px-1 rounded">{'}'}</code> and brackets <code className="bg-gray-100 px-1 rounded">]</code>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verify JSON Completeness</h3>
                  <p className="text-gray-700 text-sm">
                    Ensure your JSON string is complete and not truncated. Check if network requests completed successfully or if file reads finished.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Use Our Free JSON Fixer</h3>
                  <p className="text-gray-700 text-sm">
                    Paste your broken JSON into our <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link>. 
                    It automatically detects missing braces and fixes the error instantly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JavaScript Code Example</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here's how to handle this error in your JavaScript code:
            </p>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`try {
  const jsonString = '{"name": "John", "age": 30'; // Missing closing brace
  const data = JSON.parse(jsonString);
} catch (error) {
  if (error.message === 'Unexpected end of JSON input') {
    console.error('JSON is incomplete or missing closing braces');
    // Use our JSON Fixer to fix it automatically
  }
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
                  Don't waste time manually fixing JSON errors. Our free JSON Fixer automatically detects and repairs 
                  "Unexpected end of JSON input" errors in seconds.
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

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Why do I get "Unexpected end of JSON input"?</h3>
                <p className="text-gray-700 text-sm">
                  This error occurs when your JSON is incomplete - usually missing closing braces, brackets, or the JSON string is truncated.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">How can I prevent this error?</h3>
                <p className="text-gray-700 text-sm">
                  Always validate JSON before parsing, ensure network requests complete, and use our JSON Fixer to check for errors.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Can I fix this error automatically?</h3>
                <p className="text-gray-700 text-sm">
                  Yes! Our free <Link href="/" className="text-blue-600 hover:underline">JSON Fixer tool</Link> automatically detects 
                  and fixes missing closing braces and other JSON errors.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Fixer</h3>
                <p className="text-sm text-gray-600">Fix all JSON errors automatically</p>
              </Link>
              <Link href="/" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Validator</h3>
                <p className="text-sm text-gray-600">Validate JSON syntax and structure</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

