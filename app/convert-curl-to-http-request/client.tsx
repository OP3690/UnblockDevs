'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Globe } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function ConvertCurlToHttpRequestClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Convert cURL to HTTP Request</h1>
          <p className="text-sm text-gray-500 mt-1">Free online converter - Transform cURL commands to HTTP request format</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I convert a cURL command to an HTTP request?',
              answer: 'Use our free cURL to HTTP Request converter. Simply paste your cURL command, and it will automatically convert it to a standard HTTP request format with method, URL, headers, and body.',
            },
            {
              question: 'What HTTP request formats are supported?',
              answer: 'Our converter supports all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.), headers, authentication (Basic Auth, Bearer tokens), and request bodies (JSON, form data, multipart).',
            },
            {
              question: 'Can I convert cURL to code instead of HTTP request format?',
              answer: 'Yes! Our cURL to Code Converter can convert cURL commands to Python Requests, JavaScript Fetch, PHP, Ruby, Java, Go, and C# code.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>cURL to HTTP Request Converter</strong> transforms cURL commands into standard HTTP request format. 
              Perfect for understanding the underlying HTTP request structure, debugging, or converting between formats.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Use our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to convert cURL commands 
              to code in 7+ programming languages, or use this tool to see the HTTP request format.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an HTTP Request?</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="text-gray-700 mb-3">
                An <strong>HTTP request</strong> consists of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Method:</strong> GET, POST, PUT, DELETE, PATCH, etc.</li>
                <li><strong>URL:</strong> The endpoint you're requesting</li>
                <li><strong>Headers:</strong> Metadata like Content-Type, Authorization, etc.</li>
                <li><strong>Body:</strong> Data sent with the request (for POST, PUT, etc.)</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: cURL to HTTP Request</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">cURL Command:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name":"John","email":"john@example.com"}'`}
                </pre>
              </div>
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <p className="font-semibold text-green-900 mb-2">HTTP Request Format:</p>
                <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token123

{"name":"John","email":"john@example.com"}`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to HTTP Request Instantly</h2>
                <p className="text-blue-100">
                  Use our free cURL to Code Converter to transform cURL commands into HTTP requests or code in multiple languages.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=curl"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try cURL Converter Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

