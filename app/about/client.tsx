'use client';

import Link from 'next/link';
import { Shield, Zap, CheckCircle, Code, Heart, Mail } from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">About UnblockDevs</h1>
          <p className="text-sm text-gray-500 mt-1">Free Developer Tools - Privacy-Focused & No Signup Required</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>UnblockDevs</strong> is a collection of free, privacy-focused developer tools designed to help developers 
              work more efficiently without compromising their privacy or requiring signups.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide high-quality developer tools that process all data in your browser, ensuring your code, 
              JSON, and API responses never leave your device.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Principles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-700 text-sm">
                  All processing happens in your browser. Your data never leaves your device, ensuring maximum privacy and security.
                </p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Zap className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">No Signup Required</h3>
                <p className="text-gray-700 text-sm">
                  Start using tools immediately without creating accounts, providing emails, or dealing with password management.
                </p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">100% Free Forever</h3>
                <p className="text-gray-700 text-sm">
                  No freemium models, no usage limits, no credit card required. These tools are free to use without restrictions.
                </p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <Code className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Open & Transparent</h3>
                <p className="text-gray-700 text-sm">
                  We believe in transparency. All our tools are open about how they work and process your data.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              UnblockDevs provides a comprehensive suite of free developer tools:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><Link href="/" className="text-blue-600 hover:underline">JSON Fixer</Link> - Fix broken JSON automatically</li>
              <li><Link href="/" className="text-blue-600 hover:underline">JSON Validator</Link> - Validate JSON syntax</li>
              <li><Link href="/" className="text-blue-600 hover:underline">JSON Formatter</Link> - Beautify and format JSON</li>
              <li><Link href="/" className="text-blue-600 hover:underline">JSON to Excel Converter</Link> - Convert JSON to spreadsheets</li>
              <li><Link href="/" className="text-blue-600 hover:underline">API Response Comparator</Link> - Compare API responses</li>
              <li><Link href="/" className="text-blue-600 hover:underline">cURL to Code Converter</Link> - Convert curl to code</li>
              <li><Link href="/" className="text-blue-600 hover:underline">Mock API Generator</Link> - Generate fake endpoints</li>
              <li>And many more...</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Tools Work</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All UnblockDevs tools process data entirely in your browser using JavaScript. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>No data is sent to our servers</li>
              <li>No tracking or analytics on your data</li>
              <li>Works offline (after initial page load)</li>
              <li>Fast processing (no network latency)</li>
              <li>Complete privacy and security</li>
            </ul>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Built for Developers, by Developers</h2>
                <p className="text-blue-100">
                  UnblockDevs is built with the developer community in mind. We understand the need for fast, 
                  reliable, and privacy-focused tools that just work.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore All Tools
            </Link>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-10 h-10 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Write us for any additional feature request, issues, query or appreciation.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200 inline-block">
                  <p className="text-gray-700">
                    <strong>Email:</strong>{' '}
                    <a 
                      href="mailto:support@unblockdevs.com" 
                      className="text-green-600 hover:text-green-700 hover:underline font-semibold"
                    >
                      support@unblockdevs.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
