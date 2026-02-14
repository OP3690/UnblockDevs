'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Chrome, Copy } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function HowToGetCurlFromChromeClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Chrome className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Get cURL from Chrome</h1>
              <p className="text-sm text-gray-500 mt-1">Copy Request as cURL - Step-by-Step Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Get cURL from Chrome"
        description="Copy Request as cURL - Step-by-Step Guide"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I copy a request as cURL from Chrome?',
              answer: 'Open Chrome DevTools (F12), go to the Network tab, find the request you want, right-click on it, and select "Copy" > "Copy as cURL". The cURL command will be copied to your clipboard.',
            },
            {
              question: 'Can I copy cURL from Chrome DevTools?',
              answer: 'Yes! Chrome DevTools Network tab allows you to copy any HTTP request as a cURL command. This is perfect for debugging and testing APIs.',
            },
            {
              question: 'What can I do with a cURL command from Chrome?',
              answer: 'You can test the request in terminal, convert it to code (Python, JavaScript, etc.) using our cURL to Code Converter, or share it with team members for debugging.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Chrome DevTools makes it easy to copy HTTP requests as cURL commands. This is incredibly useful for 
              debugging, testing APIs, and converting requests to code in different programming languages.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this guide, we'll show you step-by-step how to get cURL commands from Chrome, and then use our free 
              <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold"> cURL to Code Converter</Link> to transform them into Python, JavaScript, and more.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: Copy Request as cURL</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Open Chrome DevTools</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Press <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd> or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+I</kbd> (Windows/Linux) 
                    or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Cmd+Option+I</kbd> (Mac) to open DevTools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Go to Network Tab</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Click on the <strong>"Network"</strong> tab in DevTools. Make sure it's recording (red circle should be visible).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trigger the Request</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Perform the action that triggers the HTTP request you want to capture (e.g., submit a form, click a button, load a page).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Find and Right-Click the Request</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    In the Network tab, find the request you want. Right-click on it to open the context menu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Copy as cURL</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Select <strong>"Copy"</strong> {'>'} <strong>"Copy as cURL"</strong> from the context menu. The cURL command is now in your clipboard!
                  </p>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Tip:</strong> You can also use <kbd className="bg-white px-2 py-1 rounded text-xs">Ctrl+C</kbd> after right-clicking to quickly copy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visual Guide</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Open Chrome DevTools (F12)</li>
                <li>Navigate to <strong>Network</strong> tab</li>
                <li>Perform the action that triggers the request</li>
                <li>Right-click on the request in the Network tab</li>
                <li>Select <strong>"Copy"</strong> → <strong>"Copy as cURL"</strong></li>
                <li>Paste the cURL command into our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">converter</Link> to transform it to code!</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h2>
            <p className="text-gray-700 mb-4">
              When you copy a request as cURL from Chrome, you get a complete cURL command including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">HTTP Method</h3>
                <p className="text-sm text-gray-700">GET, POST, PUT, DELETE, etc.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Headers</h3>
                <p className="text-sm text-gray-700">All request headers including cookies, auth tokens</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Request Body</h3>
                <p className="text-sm text-gray-700">JSON, form data, or other payloads</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">URL</h3>
                <p className="text-sm text-gray-700">Complete endpoint URL with query parameters</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: cURL from Chrome</h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">cURL Command Copied from Chrome:</p>
              <pre className="bg-white p-4 rounded border border-gray-200 text-xs overflow-x-auto">
{`curl 'https://api.example.com/users' \\
  -H 'authority: api.example.com' \\
  -H 'accept: application/json' \\
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'user-agent: Mozilla/5.0...' \\
  --compressed`}
              </pre>
              <p className="text-sm text-gray-600 mt-3">
                <strong>💡 Next Step:</strong> Paste this into our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to transform it into Python, JavaScript, or other languages!
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-1">API Testing</h3>
                <p className="text-sm text-gray-700">Copy API requests from your frontend and test them directly in terminal</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-1">Debugging</h3>
                <p className="text-sm text-gray-700">Share exact requests with team members for debugging API issues</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-1">Code Conversion</h3>
                <p className="text-sm text-gray-700">Convert browser requests to code for backend integration</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Chrome className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert Chrome cURL to Code</h2>
                <p className="text-blue-100">
                  Got a cURL command from Chrome? Use our free converter to transform it into Python Requests, JavaScript Fetch, 
                  or any other programming language instantly.
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

