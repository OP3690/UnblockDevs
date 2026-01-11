'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, XCircle, ExternalLink, Code2, Terminal } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function CurlVsPythonRequestsComparisonClient() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">cURL vs Python Requests</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Comparison Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="cURL vs Python Requests"
        description="Complete Comparison Guide"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is the difference between cURL and Python Requests?',
              answer: 'cURL is a command-line tool for making HTTP requests, while Python Requests is a library for making HTTP requests in Python code. Both can make the same API calls, but Requests is better for programmatic use in Python applications.',
            },
            {
              question: 'When should I use cURL vs Python Requests?',
              answer: 'Use cURL for quick API testing, debugging, and one-off requests. Use Python Requests for production applications, automation, and when you need to integrate API calls into Python code.',
            },
            {
              question: 'Can I convert cURL commands to Python Requests?',
              answer: 'Yes! Use our free cURL to Python Requests converter to automatically transform any cURL command into Python Requests code. It handles authentication, headers, and all HTTP methods.',
            },
            {
              question: 'Is Python Requests better than cURL?',
              answer: 'Neither is better - they serve different purposes. cURL is great for command-line testing, while Python Requests is better for production Python applications. Choose based on your use case.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Choosing between <strong>cURL</strong> and <strong>Python Requests</strong> depends on your use case. 
              Both tools can make HTTP requests, but they're designed for different scenarios.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this comprehensive comparison, we'll explore when to use each tool, their pros and cons, 
              and how to convert between them. Use our free <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Python Requests converter</Link> to transform commands instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">cURL</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Python Requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Type</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Command-line tool</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Python library</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Quick testing, debugging</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Production applications</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Error Handling</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Basic (exit codes)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Advanced (exceptions)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Session Management</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Manual (cookies file)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Built-in (Session object)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Code Integration</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Requires subprocess</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Native Python</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Learning Curve</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Low (simple commands)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Low (simple API)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use cURL</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Quick API Testing</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Perfect for testing APIs quickly from the command line without writing code.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200 mt-2">
                  <div className="flex items-center justify-between">
                    <code className="text-xs">curl https://api.example.com/users</code>
                    <button
                      onClick={() => copyToClipboard('curl https://api.example.com/users', 'curl-example')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copiedExample === 'curl-example' ? <CheckCircle className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Debugging</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Great for debugging API issues, checking responses, and testing endpoints.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">One-Off Requests</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Ideal for single requests that don't need to be part of a larger application.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Python Requests</h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Production Applications</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Best for building production Python applications that need to make HTTP requests.
                </p>
                <div className="bg-white p-3 rounded border border-yellow-200 mt-2">
                  <div className="flex items-center justify-between">
                    <code className="text-xs">import requests<br />response = requests.get('https://api.example.com/users')</code>
                    <button
                      onClick={() => copyToClipboard("import requests\nresponse = requests.get('https://api.example.com/users')", 'python-example')}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      {copiedExample === 'python-example' ? <CheckCircle className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Automation</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Perfect for automated scripts, web scraping, and batch processing.
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Error Handling</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Better error handling with try-except blocks and response status checking.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-blue-600" />
                  cURL
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Pros
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Fast and lightweight</li>
                      <li>No installation needed (usually pre-installed)</li>
                      <li>Great for quick testing</li>
                      <li>Works in any terminal</li>
                      <li>Supports many protocols</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Cons
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Not suitable for production code</li>
                      <li>Limited error handling</li>
                      <li>Requires subprocess in Python</li>
                      <li>No session management</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-yellow-600" />
                  Python Requests
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Pros
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Production-ready</li>
                      <li>Better error handling</li>
                      <li>Session management</li>
                      <li>Easy to integrate in code</li>
                      <li>Great documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Cons
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Requires Python installation</li>
                      <li>Need to install requests library</li>
                      <li>More verbose than cURL</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to Python Requests Instantly</h2>
                <p className="text-blue-100">
                  Don't choose - use both! Convert your cURL commands to Python Requests code with our free converter.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=curl"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try Free Converter Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

