'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Code2 } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function CurlToPythonRequestsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Code2 className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">cURL to Python Requests Converter</h1>
              <p className="text-sm text-gray-500 mt-1">Convert cURL commands to Python Requests code instantly</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I convert cURL to Python Requests?',
              answer: 'Paste your cURL command into our converter, select Python (Requests) as the target language, and click Convert. The tool automatically generates Python code using the requests library.',
            },
            {
              question: 'Does the converter support authentication?',
              answer: 'Yes! Our converter automatically handles Basic Auth (-u flag), Bearer tokens (Authorization header), and custom authentication methods. All authentication is properly converted to Python Requests format.',
            },
            {
              question: 'Can I convert cURL with file uploads to Python?',
              answer: 'Yes! Python Requests supports file uploads using the files parameter. Our converter automatically handles multipart/form-data uploads from cURL -F flags.',
            },
            {
              question: 'Is the generated Python code production-ready?',
              answer: 'Yes! The generated code uses the standard requests library and follows Python best practices. It includes proper error handling and is ready to use in your applications.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>cURL to Python Requests Converter</strong> is a free online tool that transforms cURL commands 
              into production-ready Python code using the popular <code className="bg-gray-100 px-1 rounded">requests</code> library.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Perfect for developers who need to integrate API calls tested with cURL into Python applications. 
              Use our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Python Requests converter</Link> to get started instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Convert cURL to Python Requests?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">cURL (Command Line)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Great for quick API testing</li>
                  <li>Useful for debugging</li>
                  <li>Not suitable for production code</li>
                  <li>Limited error handling</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Python Requests (Library)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Perfect for production applications</li>
                  <li>Better error handling</li>
                  <li>Session management</li>
                  <li>Easy to integrate in code</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: cURL to Python Requests</h2>
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
                <p className="font-semibold text-green-900 mb-2">Python Requests Code:</p>
                <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
}

data = {
    'name': 'John',
    'email': 'john@example.com'
}

response = requests.post(
    'https://api.example.com/users',
    headers=headers,
    json=data
)
print(response.json())`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-6 h-6 text-yellow-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">All HTTP Methods</h3>
                <p className="text-sm text-gray-700">Supports GET, POST, PUT, DELETE, PATCH, and more</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Authentication</h3>
                <p className="text-sm text-gray-700">Basic Auth, Bearer tokens, custom headers</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">File Uploads</h3>
                <p className="text-sm text-gray-700">Multipart form data and file uploads</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Production Ready</h3>
                <p className="text-sm text-gray-700">Clean, readable Python code ready to use</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code2 className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to Python Requests Instantly</h2>
                <p className="text-yellow-100">
                  Use our free converter to transform any cURL command into production-ready Python Requests code in seconds.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=curl"
              className="inline-flex items-center gap-2 bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
            >
              Try Python Requests Converter Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/curl-to-python-requests-complete-guide" className="p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">How to Convert cURL to Python Requests: Complete Guide</h3>
                <p className="text-sm text-gray-600">Step-by-step tutorial with real examples and best practices</p>
              </Link>
              <Link href="/curl-to-requests" className="p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">cURL to Requests Converter Tool</h3>
                <p className="text-sm text-gray-600">Free online converter for 7+ programming languages</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

