'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Globe, Zap, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

const CurlConverter = dynamic(() => import('@/components/tools/CurlConverter'), { ssr: false });

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
          <p className="text-sm text-gray-500 mt-1">Free online converter — paste cURL, get HTTP request format or code in 10+ languages</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Embedded tool */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5" />
              cURL to HTTP Request &amp; Code Converter
            </h2>
            <p className="text-sm text-blue-100 mt-1">Paste your cURL command below — convert to HTTP request view or to Python, JavaScript, Go, and more.</p>
          </div>
          <div className="p-4">
            <CurlConverter />
          </div>
        </div>

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Tool Does</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>cURL to HTTP Request Converter</strong> above turns cURL commands into a clear view of the underlying HTTP request (method, URL, headers, body) and into runnable code in Python, JavaScript, Go, Java, PHP, C#, Rust, and more. Paste a command from your browser, Postman, or docs and get the equivalent HTTP request format or code in one click.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All conversion runs in your browser; nothing is sent to our servers. Use it to debug APIs, document requests, or move from cURL to your preferred language without retyping.
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
                <li><strong>URL:</strong> The endpoint you&apos;re requesting</li>
                <li><strong>Headers:</strong> Metadata like Content-Type, Authorization, etc.</li>
                <li><strong>Body:</strong> Data sent with the request (for POST, PUT, etc.)</li>
              </ul>
            </div>
            <p className="text-gray-700 mt-4 leading-relaxed">
              cURL is a command-line way to send HTTP requests. Converting cURL to &quot;HTTP request format&quot; means expressing the same method, URL, headers, and body in a human-readable form (e.g. for docs or debugging) or as code in another language.
            </p>
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

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              When to Use This Converter
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Use this converter when you have a cURL command and need to: understand the exact HTTP request (method, URL, headers, body), document an API call, debug why a request fails, or reuse the request in another language. It supports GET, POST, PUT, PATCH, DELETE, custom headers, Basic and Bearer auth, and JSON or form bodies. Paste from Chrome DevTools &quot;Copy as cURL&quot;, Postman, or any tool that exports cURL.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Get a cURL Command from Your Browser</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In <strong>Chrome, Edge, or DevTools</strong>: open DevTools (F12), go to the <strong>Network</strong> tab, trigger the request you want (e.g. submit a form or reload), right-click the request in the list, and choose <strong>&quot;Copy&quot; → &quot;Copy as cURL&quot;</strong>. Paste that into the converter above to see the HTTP request or get code in another language. In <strong>Firefox</strong>, the same flow is available: Network tab → right-click request → Copy as cURL. This is the fastest way to turn a live browser request into an HTTP breakdown or into Python, JavaScript, or other code.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More cURL and API Tools</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We also offer a <Link href="/curl-converter" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> (dedicated page), <Link href="/har-to-curl" className="text-blue-600 hover:underline font-semibold">HAR to cURL</Link>, and <Link href="/cors-tester" className="text-blue-600 hover:underline font-semibold">CORS Tester</Link>. Combine them to go from browser request → cURL → HTTP request view or code in one workflow.
            </p>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to HTTP Request Instantly</h2>
                <p className="text-blue-100">
                  The converter is embedded above. Paste your cURL, choose your target (e.g. Python or JavaScript), and copy the HTTP breakdown or generated code.
                </p>
              </div>
            </div>
            <Link
              href="/curl-converter"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Open Full cURL Converter
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

