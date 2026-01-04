'use client';

import Link from 'next/link';
import { ArrowLeft, GitCompare, AlertTriangle, CheckCircle, ExternalLink, Zap, TrendingUp } from 'lucide-react';

export default function DebugApiChangesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <GitCompare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Debug API Changes Faster</h1>
              <p className="text-sm text-gray-500 mt-1">How to Compare Two API Responses Visually</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              API responses change frequently - new fields are added, data types change, and sometimes fields disappear entirely. 
              These changes can break your application if not detected early. Manually comparing two API responses is tedious and error-prone, 
              especially with large payloads.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this guide, we'll show you how to <strong>compare two API responses visually</strong> to debug API changes, detect breaking changes, 
              and identify response drift. We'll use real-world examples and our free <Link href="/" className="text-blue-600 hover:underline font-semibold">API Response Comparator</Link> tool.
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-purple-900 mb-2">💡 Quick Tip</p>
              <p className="text-purple-800">
                Use our free <Link href="/" className="font-semibold underline">API Response Comparator</Link> to instantly compare two API responses, 
                detect changes, and identify breaking changes. No signup required, 100% privacy-focused.
              </p>
            </div>
          </section>

          {/* Why API Response Drift Happens */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why API Response Drift Happens</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  New Fields Added
                </h3>
                <p className="text-red-800 text-sm">
                  APIs evolve over time. New fields are added to responses, which can cause issues if your code expects a specific structure.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Data Type Changes
                </h3>
                <p className="text-yellow-800 text-sm">
                  A field that was a string might become a number, or an array might become an object. These changes can break type checking.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Removed Fields
                </h3>
                <p className="text-orange-800 text-sm">
                  Fields that your application depends on might be removed in API updates, causing null reference errors.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Field Value Changes
                </h3>
                <p className="text-blue-800 text-sm">
                  Enum values or status codes might change, breaking conditional logic in your application.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Example: Stripe API */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Example: Stripe API Update</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's say Stripe updated their payment API. You want to compare the old response with the new one to see what changed.
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-gray-900 mb-2">📋 Old API Response (v1):</p>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "id": "ch_1234567890",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "customer": "cus_abc123"
}`}
              </pre>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-gray-900 mb-2">📋 New API Response (v2):</p>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "id": "ch_1234567890",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "customer": {
    "id": "cus_abc123",
    "email": "customer@example.com"
  },
  "payment_method": "pm_card_visa",
  "created": 1640995200
}`}
              </pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">✅ Changes Detected:</p>
              <ul className="list-disc list-inside space-y-2 text-green-800 text-sm">
                <li><strong>Added:</strong> <code className="bg-green-100 px-1 rounded">customer</code> is now an object instead of a string</li>
                <li><strong>Added:</strong> <code className="bg-green-100 px-1 rounded">payment_method</code> field</li>
                <li><strong>Added:</strong> <code className="bg-green-100 px-1 rounded">created</code> timestamp field</li>
                <li><strong>Breaking Change:</strong> Accessing <code className="bg-green-100 px-1 rounded">customer</code> as a string will fail</li>
              </ul>
            </div>
          </section>

          {/* How to Use API Response Comparator */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Our API Response Comparator</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Paste Your API Responses</h3>
                  <p className="text-gray-700 text-sm">
                    Copy and paste both API responses into our <Link href="/" className="text-blue-600 hover:underline">API Response Comparator</Link>. 
                    You can compare responses from different API versions, environments (staging vs production), or before/after code changes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visual Comparison</h3>
                  <p className="text-gray-700 text-sm">
                    Our tool automatically highlights differences with color coding:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm mt-2 ml-4">
                    <li><span className="text-green-600 font-semibold">Green</span> - Added fields</li>
                    <li><span className="text-red-600 font-semibold">Red</span> - Removed fields</li>
                    <li><span className="text-yellow-600 font-semibold">Yellow</span> - Modified fields</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Identify Breaking Changes</h3>
                  <p className="text-gray-700 text-sm">
                    The tool identifies potential breaking changes like:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm mt-2 ml-4">
                    <li>Removed required fields</li>
                    <li>Data type changes (string → object, number → string)</li>
                    <li>Changed enum values</li>
                    <li>Nested structure changes</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Export Results</h3>
                  <p className="text-gray-700 text-sm">
                    Copy the diff results or export them for documentation, team communication, or bug reports.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Automating in CI */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bonus: Automating API Comparison in CI/CD</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For production applications, you can automate API response comparison in your CI/CD pipeline to catch breaking changes before they reach production.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Example: GitHub Actions Workflow</h3>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`name: API Response Comparison

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:

jobs:
  compare-api:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch Production API
        run: |
          curl https://api.example.com/v1/users > prod-response.json
      
      - name: Fetch Staging API
        run: |
          curl https://staging-api.example.com/v1/users > staging-response.json
      
      - name: Compare Responses
        run: |
          # Use jq or a custom script to compare
          # Fail if breaking changes detected
          diff prod-response.json staging-response.json`}
              </pre>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> You can also use our API Response Comparator programmatically by sending API responses via our API endpoint 
                (coming soon) or by integrating it into your testing framework.
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for API Comparison</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Compare Regularly</h3>
                  <p className="text-gray-700 text-sm">Set up automated comparisons between staging and production to catch changes early.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Document Breaking Changes</h3>
                  <p className="text-gray-700 text-sm">Keep a changelog of API changes and their impact on your application.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Test Before Deploying</h3>
                  <p className="text-gray-700 text-sm">Always compare API responses in staging before deploying to production.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Versioning</h3>
                  <p className="text-gray-700 text-sm">Compare responses from different API versions to understand migration requirements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <GitCompare className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Compare API Responses Instantly</h2>
                <p className="text-purple-100">
                  Debug API changes faster with our free API Response Comparator. Visual diff, breaking change detection, and more.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">Visual Diff</h3>
                <p className="text-sm text-purple-100">Color-coded changes for easy identification</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <AlertTriangle className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">Breaking Changes</h3>
                <p className="text-sm text-purple-100">Automatically detect potential breaking changes</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Zap className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">100% Free</h3>
                <p className="text-sm text-purple-100">No signup, no limits, completely free</p>
              </div>
            </div>
            <Link
              href="/?tab=comparator"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Try API Comparator Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              API response drift is inevitable, but it doesn't have to break your application. By regularly comparing API responses using our free 
              <Link href="/" className="text-blue-600 hover:underline font-semibold"> API Response Comparator</Link>, you can catch breaking changes early and adapt your code accordingly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're debugging a production issue, testing API updates, or setting up automated comparisons in CI/CD, visual API comparison 
              saves time and prevents bugs. Bookmark our <Link href="/" className="text-blue-600 hover:underline">API Response Comparator</Link> for your next API debugging session.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}

