'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ExternalLink, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function JsonValidatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">JSON Validator - Free Online Validation Tool</h1>
          <p className="text-sm text-gray-500 mt-1">Validate JSON syntax and structure instantly</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is JSON validation?',
              answer: 'JSON validation checks if a JSON string follows the correct syntax rules and structure according to the JSON specification.',
            },
            {
              question: 'Why should I validate JSON?',
              answer: 'Validating JSON before using it prevents runtime errors in your application. It\'s essential when working with APIs or user input.',
            },
            {
              question: 'Is the JSON Validator free?',
              answer: 'Yes, 100% free. No signup required, no usage limits. All processing happens in your browser for maximum privacy.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>JSON Validator</strong> is a free online tool that validates JSON syntax and structure instantly. 
              Check for errors, verify JSON format, and ensure your JSON is valid before using it in your applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              No signup required, 100% privacy-focused (all processing happens in your browser). 
              Use our <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Validator</Link> to validate JSON before parsing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Instant Validation</h3>
                <p className="text-sm text-gray-700">Validate JSON in real-time as you type</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Error Detection</h3>
                <p className="text-sm text-gray-700">Shows exact error location and message</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">100% Free</h3>
                <p className="text-sm text-gray-700">No signup, no limits, completely free</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Shield className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Privacy-Focused</h3>
                <p className="text-sm text-gray-700">All processing happens in your browser</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use JSON Validator</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Paste Your JSON</h3>
                  <p className="text-gray-700 text-sm">Copy and paste your JSON into the validator</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get Instant Results</h3>
                  <p className="text-gray-700 text-sm">See if your JSON is valid or get detailed error messages</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fix Errors (If Needed)</h3>
                  <p className="text-gray-700 text-sm">If invalid, use our <Link href="/" className="text-blue-600 hover:underline">JSON Fixer</Link> to repair it automatically</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What is JSON validation?</h3>
                <p className="text-gray-700 text-sm">
                  JSON validation checks if a JSON string follows the correct syntax rules and structure according to the JSON specification.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Why should I validate JSON?</h3>
                <p className="text-gray-700 text-sm">
                  Validating JSON before using it prevents runtime errors in your application. It's essential when working with APIs or user input.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Is the JSON Validator free?</h3>
                <p className="text-gray-700 text-sm">
                  Yes, 100% free. No signup required, no usage limits. All processing happens in your browser for maximum privacy.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate JSON Instantly</h2>
                <p className="text-green-100">
                  Use our free JSON Validator to check your JSON syntax. If invalid, use our JSON Fixer to repair it automatically.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Validate JSON Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

