'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Wrench, ExternalLink } from 'lucide-react';

export default function HowToFixBrokenJsonClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">How to Fix Broken JSON Online</h1>
          <p className="text-sm text-gray-500 mt-1">Step by step guide for beginners</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Broken JSON is one of the most frustrating issues developers face. Whether you're working with APIs, configuration files, 
              or data storage, malformed JSON can bring your application to a halt.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this beginner-friendly guide, we'll show you <strong>how to fix broken JSON online</strong> step by step, 
              using our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Identify the Error</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The first step is to understand what error you're seeing. Common JSON errors include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Unexpected end of JSON input</li>
              <li>Unexpected token {'}'} in JSON</li>
              <li>Expected ',' or {'}'} after property value</li>
              <li>Invalid character at position 0</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Use Our Free JSON Fixer</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Fix:</p>
              <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                <li>Open our <Link href="/" className="font-semibold underline">JSON Fixer tool</Link></li>
                <li>Paste your broken JSON</li>
                <li>Click "Fix JSON" - it automatically detects and repairs errors</li>
                <li>Copy the fixed JSON</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Common Fixes</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Remove Trailing Commas</h3>
                <p className="text-sm text-gray-700">JSON doesn't allow commas after the last item in objects or arrays.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Add Missing Quotes</h3>
                <p className="text-sm text-gray-700">All keys and string values must be wrapped in double quotes.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Close All Braces and Brackets</h3>
                <p className="text-sm text-gray-700">Every opening brace or bracket needs a matching closing one.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix Broken JSON Instantly</h2>
                <p className="text-blue-100">
                  Our free JSON Fixer automatically detects and fixes all common JSON errors. No signup required.
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

