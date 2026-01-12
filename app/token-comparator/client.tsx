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

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Problem Does the Token Comparator Solve?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Working with tokens—whether they're <strong>JWT tokens</strong>, <strong>API keys</strong>, <strong>OAuth tokens</strong>, or <strong>authentication credentials</strong>—often requires comparing them to verify they match, identify differences, or debug authentication issues. Manually comparing long, complex tokens is nearly impossible and error-prone.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Token Comparator</strong> solves this critical problem by providing a secure, visual, character-by-character comparison that instantly highlights differences. But it does more than just compare—it provides detailed statistics, preserves your privacy with 100% client-side processing, and makes token debugging effortless.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Without a token comparator, developers and security professionals face several challenges:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li><strong>Manual comparison errors:</strong> Comparing long tokens manually is time-consuming and prone to mistakes</li>
              <li><strong>Security risks:</strong> Sending tokens to external services for comparison exposes sensitive credentials</li>
              <li><strong>No visual feedback:</strong> Identifying where tokens differ is difficult without visual highlighting</li>
              <li><strong>Missing statistics:</strong> Understanding the extent of differences requires manual counting</li>
              <li><strong>Environment mismatches:</strong> Verifying tokens match across development, staging, and production is tedious</li>
              <li><strong>Debugging difficulties:</strong> When authentication fails, identifying token differences is challenging</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our tool eliminates all these problems by providing instant, secure, visual token comparison with comprehensive statistics—all processed entirely in your browser, ensuring your sensitive tokens never leave your device.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is the Token Comparator For?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Token Comparator</strong> is essential for anyone who works with tokens, authentication, or API security. Here's who benefits most:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Backend Developers</h3>
                <p className="text-sm text-gray-700">
                  Backend developers working with JWT authentication, OAuth flows, or API key management need to verify tokens match between environments, debug authentication issues, and ensure token integrity. The comparator makes these tasks instant and secure.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Security Engineers</h3>
                <p className="text-sm text-gray-700">
                  Security engineers auditing authentication systems, verifying token implementations, or investigating security incidents need to compare tokens securely without exposing sensitive credentials. The 100% client-side processing ensures maximum security.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">DevOps Engineers</h3>
                <p className="text-sm text-gray-700">
                  DevOps engineers managing multiple environments need to verify API keys, authentication tokens, and credentials match across development, staging, and production. The comparator provides instant verification with detailed statistics.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">QA Engineers & Testers</h3>
                <p className="text-sm text-gray-700">
                  QA engineers testing authentication flows, API integrations, or token-based features need to verify tokens are generated correctly and match expected values. The visual comparison makes testing faster and more accurate.
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-semibold text-gray-900 mb-2">API Developers</h3>
                <p className="text-sm text-gray-700">
                  API developers working with API keys, OAuth tokens, or custom authentication schemes need to compare tokens to debug integration issues, verify key rotation, or ensure consistency across API versions.
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-gray-900 mb-2">System Administrators</h3>
                <p className="text-sm text-gray-700">
                  System administrators managing authentication systems, verifying token configurations, or troubleshooting access issues need a secure way to compare tokens without exposing sensitive credentials to external services.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Whether you're debugging a production authentication issue, verifying tokens across environments, or auditing security implementations, the <strong>Token Comparator</strong> provides the secure, instant comparison you need without compromising your sensitive data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Token Comparison Results</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Token Comparator provides comprehensive statistics to help you understand token differences:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Match Percentage</h3>
                <p className="text-sm text-gray-700">
                  The match percentage shows how similar the tokens are. A 100% match means the tokens are identical. Lower percentages indicate more differences. This metric helps you quickly assess whether tokens are similar enough to be related or completely different.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Character-by-Character Highlighting</h3>
                <p className="text-sm text-gray-700">
                  Green highlighting indicates matching characters, while red highlighting with borders shows mismatches. This visual feedback makes it easy to identify exactly where tokens differ, which is crucial for debugging authentication issues or verifying token integrity.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Total Characters & Differences</h3>
                <p className="text-sm text-gray-700">
                  The tool shows total characters in each token and the number of matches and mismatches. This helps you understand the scale of differences—whether tokens are mostly similar with minor differences or completely different.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Privacy Considerations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When working with sensitive tokens, security and privacy are paramount. The Token Comparator is designed with these principles in mind:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">100% Client-Side Processing</h3>
                <p className="text-sm text-gray-700">
                  All token comparison happens entirely in your browser using JavaScript. Your tokens never leave your device, are never sent to any server, and are never stored or logged. This ensures maximum security and privacy.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">No Data Transmission</h3>
                <p className="text-sm text-gray-700">
                  Unlike online token comparison services that send your tokens to external servers, our tool processes everything locally. There's no network request, no data transmission, and no risk of interception or exposure.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Show/Hide Functionality</h3>
                <p className="text-sm text-gray-700">
                  The tool includes show/hide toggles for both tokens, allowing you to work securely in shared environments or when screen sharing. You can compare tokens without exposing them visually.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">No Registration Required</h3>
                <p className="text-sm text-gray-700">
                  The tool is completely free and requires no registration, login, or account creation. This eliminates any risk of token data being associated with user accounts or stored in databases.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              These security features make the Token Comparator safe for use with production tokens, sensitive API keys, and critical authentication credentials. You can use it with confidence, knowing your data remains completely private.
            </p>
          </section>

          {/* Related Blog Posts Section - Internal Links for SEO */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Tokens</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/how-to-validate-api-response-using-json-schema"
                className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">How to Validate API Response Using JSON Schema</h3>
                <p className="text-sm text-gray-600 mb-2">Learn how to validate API responses using JSON Schema, ensuring data integrity and proper structure for API integrations and token-based authentication.</p>
                <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
              <Link
                href="/blog/why-my-api-works-in-postman-but-not-in-browser"
                className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Why My API Works in Postman but Not in Browser</h3>
                <p className="text-sm text-gray-600 mb-2">Understand why APIs work in Postman but fail in browsers, including CORS issues, authentication token handling, and request differences.</p>
                <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
              <Link
                href="/blog/fix-failed-to-fetch-error-javascript-cors-https-network"
                className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Fix: "Failed to Fetch" Error in JavaScript (CORS, HTTPS, Network)</h3>
                <p className="text-sm text-gray-600 mb-2">Comprehensive guide to fixing "Failed to Fetch" errors, including CORS issues, HTTPS problems, network errors, and authentication token handling.</p>
                <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

