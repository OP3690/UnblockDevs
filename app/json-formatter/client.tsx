'use client';

import Link from 'next/link';
import { ArrowLeft, Code2, ExternalLink, CheckCircle } from 'lucide-react';

export default function JsonFormatterClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">JSON Formatter - Free Online Formatting Tool</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>JSON Formatter</strong> is a free online tool that formats, beautifies, and prettifies JSON with 
              customizable indentation. Make your JSON readable and properly formatted instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Customizable Indentation</h3>
                <p className="text-sm text-gray-700">Choose 2, 4, or custom spaces for indentation</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Syntax Highlighting</h3>
                <p className="text-sm text-gray-700">Color-coded JSON for better readability</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/json-validator" className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                JSON Validator
              </Link>
              <Link href="/json-beautifier" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                <Code2 className="w-4 h-4" />
                JSON Beautifier
              </Link>
              <Link href="/json-fixer-online" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                <Code2 className="w-4 h-4" />
                JSON Fixer
              </Link>
              <Link href="/json-schema-generation" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                <Code2 className="w-4 h-4" />
                Schema Generator
              </Link>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code2 className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Format JSON Instantly</h2>
                <p className="text-blue-100">
                  Use our free JSON Formatter to beautify and format your JSON with proper indentation.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=beautifier"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Format JSON Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

