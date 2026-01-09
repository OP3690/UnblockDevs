'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Network, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import HarToCurl from '@/components/tools/HarToCurl';
import FAQSchema from '@/components/FAQSchema';

export default function HarToCurlClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Network className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HAR to cURL Converter</h1>
              <p className="text-sm text-gray-500 mt-1">Convert browser network requests to cURL commands instantly</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is HAR to cURL conversion?',
              answer: 'HAR to cURL conversion transforms HTTP Archive (HAR) files, which contain recorded browser network requests, into cURL commands that can be executed in the terminal or converted to code in various programming languages.',
            },
            {
              question: 'How do I convert HAR file to cURL?',
              answer: 'Upload your HAR file or paste the HAR JSON content into our converter. The tool automatically detects all requests and generates cURL commands with all headers, authentication, and data preserved.',
            },
            {
              question: 'Is HAR to cURL conversion free?',
              answer: 'Yes! Our HAR to cURL converter is completely free to use. No signup required, and all processing happens in your browser for maximum privacy and security.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is HAR to cURL Conversion?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Converting <strong>HAR files to cURL commands</strong> is essential for developers working with APIs, debugging network issues, and testing web applications. HAR (HTTP Archive) files record all network requests made by a browser, and converting them to cURL allows you to replay those requests exactly as they occurred.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our free <strong>HAR to cURL converter</strong> makes this process simple. Upload your HAR file or paste HAR JSON content, and instantly get executable cURL commands with all headers, authentication, and request data preserved. Perfect for <strong>copy as curl online</strong>, <strong>network request to curl</strong>, and <strong>export curl from browser</strong> workflows.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Once you have your cURL commands, you can execute them directly, test APIs in different environments, or use our <Link href="/curl-to-requests" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to transform them into Python, JavaScript, PHP, and other programming languages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Multiple Request Support</h3>
                <p className="text-sm text-gray-700">Handle HAR files with hundreds of requests. Select any request to convert individually.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Complete Header Preservation</h3>
                <p className="text-sm text-gray-700">All headers, authentication tokens, and cookies are preserved in the generated cURL command.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Request Body Handling</h3>
                <p className="text-sm text-gray-700">POST, PUT, and PATCH requests with JSON, form data, or binary content are properly converted.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">100% Private</h3>
                <p className="text-sm text-gray-700">All processing happens in your browser. Your HAR files never leave your device.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/curl-to-requests" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                <Code className="w-4 h-4" />
                cURL to Code Converter
              </Link>
              <Link href="/curl-to-python-requests" className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                <Code className="w-4 h-4" />
                cURL to Python
              </Link>
              <Link href="/json-validator" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                <FileText className="w-4 h-4" />
                JSON Validator
              </Link>
            </div>
          </section>
        </article>

        {/* Tool Component */}
        <HarToCurl />
      </main>
    </div>
  );
}
