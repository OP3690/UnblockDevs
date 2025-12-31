'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Zap, Shield, Heart, Users, Target, Rocket } from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">About UnblockDevs</h1>
          <p className="text-lg text-gray-600 mt-2">Free JSON Tools Built by Developers, for Developers</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">
          {/* Mission Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At UnblockDevs, we believe that developers should have access to powerful, free tools that make their 
              work easier and more efficient. Our mission is to provide high-quality JSON tools and developer utilities 
              that help developers work faster, debug more effectively, and build better applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand the daily challenges developers face when working with JSON data, API responses, and data 
              conversion tasks. That's why we've built a comprehensive suite of tools that address these common pain 
              points, all available for free and accessible directly in your browser.
            </p>
          </section>

          {/* What We Offer */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-lg">JSON Tools</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• JSON Viewer & Formatter</li>
                  <li>• JSON Parser & Validator</li>
                  <li>• JSON Beautifier & Minifier</li>
                  <li>• JSON Fixer & Repair Tool</li>
                  <li>• JSON Builder</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2 text-lg">Data Conversion</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• JSON to Excel Converter</li>
                  <li>• JSON to CSV Converter</li>
                  <li>• JSON to Table Converter</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 text-lg">API Tools</h3>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• API Response Comparator</li>
                  <li>• Payload Analyzer</li>
                  <li>• Curl to Code Converter</li>
                  <li>• Mock API Generator</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2 text-lg">Developer Utilities</h3>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• JSON Schema Generator</li>
                  <li>• Log Analyzer</li>
                  <li>• SQL Formatter</li>
                  <li>• Test Data Generator</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Free & Accessible</h3>
                  <p className="text-gray-700">
                    All our tools are completely free to use. No sign-ups, no subscriptions, no hidden fees. 
                    We believe essential developer tools should be accessible to everyone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Privacy First</h3>
                  <p className="text-gray-700">
                    Your data stays in your browser. We don't store, log, or transmit your JSON data to our servers. 
                    All processing happens locally in your browser for maximum privacy and security.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Quality & Standards</h3>
                  <p className="text-gray-700">
                    All our tools follow industry standards and best practices. We ensure RFC 8259 compliance, 
                    proper error handling, and reliable results you can trust in production environments.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Built by Developers</h3>
                  <p className="text-gray-700">
                    We're developers ourselves, so we understand your needs. Every tool is designed based on real-world 
                    use cases and feedback from the developer community.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Why Choose UnblockDevs?</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>No Installation Required:</strong> All tools work directly in your browser, no downloads or installations needed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Fast & Reliable:</strong> Optimized for performance with instant results and reliable processing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Comprehensive Suite:</strong> One platform for all your JSON and developer tool needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Regular Updates:</strong> We continuously improve our tools and add new features based on user feedback.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Educational Content:</strong> Our blog provides comprehensive guides, tutorials, and best practices for developers.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have feedback, suggestions, or found a bug? We'd love to hear from you! Your input helps us improve 
              our tools and create better experiences for all developers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can reach us through our website or check out our blog for the latest updates, tutorials, and 
              developer resources.
            </p>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6">
              Explore our free JSON tools and start working more efficiently today. No sign-up required!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Try Our Tools
            </Link>
          </section>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Read Our Blog
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

