'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function CurlToRequestsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Convert cURL to Requests - Free Online Tool</h1>
          <p className="text-sm text-gray-500 mt-1">Convert cURL commands to Python Requests, JavaScript Fetch, PHP, Ruby, Java, Go, and C#</p>
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
              question: 'Can I convert cURL to JavaScript Fetch?',
              answer: 'Yes! Our converter supports JavaScript Fetch API. Just select JavaScript (Fetch API) as the target language and convert your cURL command instantly.',
            },
            {
              question: 'Does the converter support authentication?',
              answer: 'Yes, our converter supports Basic Auth (-u flag), Bearer tokens (Authorization header), and custom authentication headers. All authentication methods are automatically converted.',
            },
            {
              question: 'What HTTP methods are supported?',
              answer: 'Our converter supports all HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS. The method is automatically detected from the -X flag in your cURL command.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>cURL to Requests Converter</strong> is a free online tool that converts cURL commands to code in multiple programming languages. 
              Perfect for developers who need to integrate API calls tested with cURL into their applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Use our <Link href="/" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to instantly convert cURL commands to Python Requests, 
              JavaScript Fetch, PHP, Ruby, Java, Go, C#, and more. No signup required, 100% free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Supported Languages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Python (Requests)</h3>
                <p className="text-sm text-gray-700">Convert to Python using the popular requests library</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-6 h-6 text-yellow-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">JavaScript (Fetch)</h3>
                <p className="text-sm text-gray-700">Convert to JavaScript using the native Fetch API</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">PHP (cURL)</h3>
                <p className="text-sm text-gray-700">Convert to PHP using cURL functions</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <CheckCircle className="w-6 h-6 text-red-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Ruby (Net::HTTP)</h3>
                <p className="text-sm text-gray-700">Convert to Ruby using Net::HTTP</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Java (HttpClient)</h3>
                <p className="text-sm text-gray-700">Convert to Java using HttpClient</p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <CheckCircle className="w-6 h-6 text-cyan-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Go (net/http)</h3>
                <p className="text-sm text-gray-700">Convert to Go using net/http package</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <CheckCircle className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">C# (HttpClient)</h3>
                <p className="text-sm text-gray-700">Convert to C# using HttpClient</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>✅ Supports all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)</li>
              <li>✅ Automatic authentication conversion (Basic Auth, Bearer tokens)</li>
              <li>✅ Header preservation and conversion</li>
              <li>✅ JSON body handling</li>
              <li>✅ Multipart form data support</li>
              <li>✅ 7+ programming languages</li>
              <li>✅ Production-ready code output</li>
              <li>✅ Download converted code as files</li>
            </ul>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to Requests Instantly</h2>
                <p className="text-blue-100">
                  Use our free cURL to Code Converter to transform your cURL commands into production-ready code in seconds.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try cURL Converter Now
              <ExternalLink className="w-5 h-5" />
            </Link>
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
                <p className="font-semibold text-green-900 mb-2">Converted Python Code:</p>
                <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`import requests

response = requests.post(
    'https://api.example.com/users',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    json={"name": "John", "email": "john@example.com"}
)
print(response.json())`}
                </pre>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

