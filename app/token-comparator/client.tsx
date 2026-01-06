'use client';

import Link from 'next/link';
import { ArrowLeft, Key, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function TokenComparatorLandingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Key className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Token Comparator</h1>
              <p className="text-sm text-gray-500 mt-1">Compare Tokens Character by Character - 100% Client-Side</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is a token comparator?',
              answer: 'A token comparator is a tool that compares two tokens (like JWT tokens, API keys, or authentication tokens) character by character to identify differences. It highlights mismatches visually, making it easy to spot where tokens differ.',
            },
            {
              question: 'Is my token data stored or logged?',
              answer: 'No. The Token Comparator is 100% client-side. All comparison happens entirely in your browser. Your tokens never leave your device, are never stored, logged, or transmitted to any server. Your sensitive data remains completely private.',
            },
            {
              question: 'What types of tokens can I compare?',
              answer: 'You can compare any type of token: JWT tokens, API keys, OAuth tokens, session tokens, authentication tokens, hashes, checksums, or any string-based tokens. The tool works with any text-based token format.',
            },
            {
              question: 'How does the token comparison work?',
              answer: 'The tool compares tokens character by character, highlighting matching characters in green and mismatches in red. It provides statistics including total characters, matches, mismatches, and match percentage. All processing happens instantly in your browser.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">🔒 Privacy First - No Data Storage</h3>
                  <p className="text-sm text-green-800">
                    <strong>We do not store, log, or transmit your tokens.</strong> All comparison happens entirely in your browser. 
                    Your sensitive data never leaves your device. This tool is 100% client-side for maximum security.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>Token Comparator</strong> is a free online tool that allows you to compare two tokens 
              character by character with beautiful visual highlighting. Perfect for verifying JWT tokens, API keys, 
              authentication tokens, and more.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're debugging authentication issues, verifying token integrity, or comparing API keys between 
              environments, this tool provides instant, secure comparison with detailed statistics.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Character-by-Character Comparison</h3>
                <p className="text-sm text-gray-700">
                  Compare tokens at the character level with visual highlighting. Matching characters are shown in green, 
                  mismatches in red with clear borders.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Statistics</h3>
                <p className="text-sm text-gray-700">
                  Get comprehensive statistics including total characters, number of matches, mismatches, and match percentage 
                  for quick analysis.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">100% Client-Side</h3>
                <p className="text-sm text-gray-700">
                  All processing happens in your browser. Your tokens never leave your device, ensuring maximum security 
                  and privacy.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Show/Hide Tokens</h3>
                <p className="text-sm text-gray-700">
                  Toggle token visibility for added security when working in shared environments. Copy tokens with one click.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">JWT Token Verification</h3>
                <p className="text-sm text-gray-700">
                  Compare JWT tokens to verify they match or identify differences in claims, signatures, or headers. 
                  Perfect for debugging authentication issues.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">API Key Validation</h3>
                <p className="text-sm text-gray-700">
                  Verify API keys match between environments or check if keys were copied correctly. Ensure consistency 
                  across development, staging, and production.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Authentication Token Debugging</h3>
                <p className="text-sm text-gray-700">
                  Compare session tokens, OAuth tokens, or other authentication credentials to identify why authentication 
                  might be failing.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">Hash & Checksum Verification</h3>
                <p className="text-sm text-gray-700">
                  Compare hashes, checksums, or other cryptographic strings to verify data integrity and ensure files 
                  or data haven't been tampered with.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Key className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Try Token Comparator Now</h2>
                <p className="text-purple-100">
                  Compare your tokens instantly with our free, secure, client-side token comparator. 
                  No registration required, no data stored.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=tokencompare"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Open Token Comparator
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

