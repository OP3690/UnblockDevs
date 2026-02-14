'use client';

import Link from 'next/link';
import { ArrowLeft, Copy, CheckCircle, ExternalLink, Chrome, Globe, Monitor, Code, Download } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function CopyAsCurlFromBrowserGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Copy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Copy as cURL from Browser: Complete Tutorial</h1>
              <p className="text-sm text-gray-500 mt-1">Network Request to cURL Converter Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Copy as cURL from Browser: Complete Tutorial"
        description="Network Request to cURL Converter Guide"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I copy a request as cURL from Chrome?',
              answer: 'Open Chrome DevTools (F12), go to Network tab, find your request, right-click it, and select "Copy" &gt; "Copy as cURL". The cURL command will be copied to your clipboard instantly.',
            },
            {
              question: 'Can I copy as cURL from Firefox?',
              answer: 'Yes! Firefox Developer Tools also supports copying requests as cURL. Right-click on any network request and select "Copy" &gt; "Copy as cURL" from the context menu.',
            },
            {
              question: 'What is copy as cURL online?',
              answer: 'Copy as cURL online refers to tools that allow you to convert browser network requests to cURL commands through a web interface, without needing to use browser DevTools directly.',
            },
            {
              question: 'How do I convert network request to cURL?',
              answer: 'You can either use browser DevTools to copy as cURL directly, or export your network requests as a HAR file and use our HAR to cURL converter tool to generate cURL commands.',
            },
            {
              question: 'Is there a free copy as cURL tool?',
              answer: 'Yes! Our free HAR to cURL converter allows you to upload HAR files or paste network request data to generate cURL commands. No signup required.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Learning how to <strong>copy as cURL from browser</strong> is one of the most valuable skills for API developers and testers. Whether you need to <strong>copy as curl online</strong>, <strong>convert network request to curl</strong>, or <strong>export curl from browser</strong>, this technique allows you to capture and replay browser requests exactly as they occurred.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive tutorial, we'll show you how to <strong>copy browser requests as cURL</strong> in Chrome, Firefox, and Edge. We'll also introduce you to our free <strong>network request to curl converter</strong> tool that makes this process even easier, especially when working with multiple requests or HAR files.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <p className="text-green-800 font-semibold mb-2">🚀 Try Our Free Tool</p>
              <p className="text-green-700 text-sm mb-3">
                Need to <strong>copy as curl online</strong> or <strong>convert network request to curl</strong>? Use our free <Link href="/har-to-curl" className="font-semibold underline hover:text-green-900">Network Request to cURL Converter</Link>. Upload HAR files or paste network request data to get instant cURL commands!
              </p>
              <Link 
                href="/har-to-curl" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Try Network Request to cURL Converter
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* What is Copy as cURL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is "Copy as cURL"?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Copy as cURL</strong> is a feature in modern browser DevTools that allows you to copy any HTTP request as a ready-to-use cURL command. This command includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>The HTTP method (GET, POST, PUT, DELETE, etc.)</li>
              <li>The complete URL with query parameters</li>
              <li>All request headers including authentication</li>
              <li>Request body data (for POST/PUT requests)</li>
              <li>Cookies and session information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This feature is perfect for <strong>copying curl from browser request</strong>, testing APIs, debugging network issues, and converting browser interactions into executable commands that can be run in terminals or converted to code.
            </p>
          </section>

          {/* Chrome Method */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Chrome className="w-6 h-6 text-blue-600" />
              How to Copy as cURL in Chrome
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chrome DevTools makes it incredibly easy to <strong>copy as curl from browser</strong>. Here's the step-by-step process:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Open Chrome DevTools</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Press <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd>, <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+I</kbd> (Windows/Linux), or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Cmd+Option+I</kbd> (Mac) to open DevTools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Navigate to Network Tab</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Click on the <strong>"Network"</strong> tab. Ensure the recording button (red circle) is active to capture requests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trigger the Request</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Perform the action that triggers the HTTP request you want to capture (submit a form, click a button, navigate to a page, etc.).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Right-Click and Copy as cURL</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Find the request in the Network tab, right-click on it, hover over <strong>"Copy"</strong>, and select <strong>"Copy as cURL"</strong> or <strong>"Copy as cURL (bash)"</strong>.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
                    <p className="text-blue-800 text-xs">
                      <strong>Tip:</strong> Chrome offers two options: "Copy as cURL" (Windows format) and "Copy as cURL (bash)" (Unix/Mac format). Choose based on your operating system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Paste and Use</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    The cURL command is now in your clipboard. Paste it into your terminal to execute, or use our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to transform it into Python, JavaScript, or other languages.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Firefox Method */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-orange-600" />
              How to Copy as cURL in Firefox
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Firefox Developer Tools also supports <strong>copying curl from browser request</strong>. The process is similar to Chrome:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <p className="text-gray-700">
                    Open Firefox Developer Tools with <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd> or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+I</kbd>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <p className="text-gray-700">
                    Go to the <strong>Network</strong> tab and ensure it's recording requests.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <p className="text-gray-700">
                    Trigger the network request you want to capture.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                <div>
                  <p className="text-gray-700">
                    Right-click on the request and select <strong>"Copy"</strong> &gt; <strong>"Copy as cURL"</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Edge Method */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Monitor className="w-6 h-6 text-blue-500" />
              How to Copy as cURL in Microsoft Edge
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Microsoft Edge (Chromium-based) uses the same DevTools as Chrome, so the process for <strong>copying curl from browser request</strong> is identical:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Open Edge DevTools with <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd></li>
              <li>Navigate to the Network tab</li>
              <li>Capture the request you want</li>
              <li>Right-click and select "Copy" &gt; "Copy as cURL"</li>
            </ul>
          </section>

          {/* Alternative: HAR to cURL Converter */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative: Use HAR to cURL Converter</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While <strong>copy as curl from browser</strong> works great for single requests, sometimes you need to work with multiple requests or want a more flexible approach. That's where our <strong>HAR to cURL converter</strong> comes in:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Benefits of Using HAR to cURL Converter:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div><strong>Multiple Requests:</strong> Convert all requests from a HAR file at once, not just one at a time.</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div><strong>Batch Processing:</strong> Select which requests to convert from a dropdown menu.</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div><strong>Online Access:</strong> Use our <strong>copy as curl online</strong> tool from any device, no browser DevTools needed.</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div><strong>Share & Collaborate:</strong> Share HAR files with team members who can convert them to cURL independently.</div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm mb-3">
                <strong>💡 Pro Tip:</strong> Export your entire network session as a HAR file, then use our converter to generate cURL commands for all requests. This is perfect for documenting API workflows or testing complete user journeys.
              </p>
              <Link 
                href="/har-to-curl" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Try HAR to cURL Converter
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Copy as cURL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 API Debugging</h3>
                <p className="text-sm text-gray-700">
                  <strong>Copy curl from browser request</strong> to debug API issues, test authentication, or verify request/response behavior outside the browser.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🧪 API Testing</h3>
                <p className="text-sm text-gray-700">
                  Use <strong>network request to curl</strong> conversion to test APIs in different environments, with different parameters, or in automated testing scripts.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Code Generation</h3>
                <p className="text-sm text-gray-700">
                  Convert <strong>browser request to curl</strong>, then use our cURL to Code Converter to generate Python, JavaScript, or other language code.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📚 Documentation</h3>
                <p className="text-sm text-gray-700">
                  Document API usage by <strong>copying curl from browser request</strong> and including the commands in API documentation or README files.
                </p>
              </div>
            </div>
          </section>

          {/* Example Workflow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Workflow Example</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here's a complete workflow for <strong>copying curl from browser request</strong> and using it:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <p className="text-gray-700">
                    <strong>Capture Request:</strong> Use browser DevTools to <strong>copy as curl from browser</strong> for an API call you want to test.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <p className="text-gray-700">
                    <strong>Test in Terminal:</strong> Paste the cURL command in your terminal to verify it works correctly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <p className="text-gray-700">
                    <strong>Convert to Code:</strong> Use our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> to transform the command into Python Requests, JavaScript Fetch, or other languages.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                <div>
                  <p className="text-gray-700">
                    <strong>Integrate:</strong> Use the generated code in your application, test scripts, or API client libraries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting Common Issues</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">cURL Command Doesn't Work</h3>
                <p className="text-gray-700 text-sm">
                  If the copied cURL command fails, check that all required headers are included. Some browsers may not copy all headers. Use our <Link href="/har-to-curl" className="text-blue-600 hover:underline">HAR to cURL converter</Link> for more complete conversion.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Authentication Issues</h3>
                <p className="text-gray-700 text-sm">
                  If authentication fails, ensure cookies and authorization headers are included. The "Copy as cURL" feature should include these, but verify in the generated command.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Requests Needed</h3>
                <p className="text-gray-700 text-sm">
                  For multiple requests, export as HAR file and use our <strong>network request to curl converter</strong> to process all requests at once.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Copy as cURL from Browser?</h2>
            <p className="text-green-100 mb-6 text-lg">
              Master <strong>copy as curl from browser</strong> techniques and use our free <strong>network request to curl converter</strong> for advanced workflows. 
              Perfect for <strong>copying curl from browser request</strong>, <strong>converting network request to curl</strong>, and <strong>exporting curl from browser</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/har-to-curl" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                <Copy className="w-5 h-5" />
                Try Network Request to cURL Converter
              </Link>
              <Link 
                href="/?tab=curl" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold"
              >
                <Code className="w-5 h-5" />
                Convert cURL to Code
              </Link>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Learning to <strong>copy as curl from browser</strong> is an essential skill that saves time and improves your API development workflow. Whether you use browser DevTools directly or our <strong>network request to curl converter</strong>, you now have the tools to transform browser requests into executable commands.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Remember: <strong>Copy as curl online</strong> tools like ours are perfect for batch processing, sharing requests with team members, and working with HAR files. Combine this with our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link> for a complete development toolchain.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
