'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ExternalLink, Upload, FileText, Download, Copy, Network, Chrome, Globe } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function HarToCurlConverterGuideClient() {
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
              <Network className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HAR to cURL Converter: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Convert Browser Network Requests to cURL Commands</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="HAR to cURL Converter: Complete Guide"
        description="Convert Browser Network Requests to cURL Commands"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is HAR to cURL conversion?',
              answer: 'HAR to cURL conversion is the process of transforming HTTP Archive (HAR) files, which contain recorded browser network requests, into cURL commands that can be executed in the terminal or converted to code in various programming languages.',
            },
            {
              question: 'How do I convert HAR file to cURL?',
              answer: 'Use our free HAR to cURL converter tool. Simply upload your HAR file or paste the HAR JSON content, and the tool will automatically generate cURL commands for all requests in the file. You can then copy or download the cURL commands.',
            },
            {
              question: 'Can I convert browser network requests to cURL?',
              answer: 'Yes! Export your browser network requests as a HAR file from Chrome DevTools or Firefox Developer Tools, then use our HAR to cURL converter to transform them into executable cURL commands.',
            },
            {
              question: 'What is the difference between HAR and cURL?',
              answer: 'HAR (HTTP Archive) is a JSON format that records all network requests made by a browser. cURL is a command-line tool for making HTTP requests. Converting HAR to cURL allows you to replay browser requests from the terminal.',
            },
            {
              question: 'Is HAR to cURL conversion free?',
              answer: 'Yes! Our HAR to cURL converter is completely free to use. No signup required, and all processing happens in your browser for maximum privacy and security.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Converting <strong>HAR files to cURL commands</strong> is an essential skill for developers working with APIs, debugging network issues, and testing web applications. Whether you're trying to <strong>convert har to curl</strong>, <strong>export curl from browser</strong>, or <strong>copy as curl online</strong>, understanding this process can significantly streamline your development workflow.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, we'll explore everything you need to know about <strong>HAR to cURL conversion</strong>, from understanding what HAR files are to using our free <strong>HAR to cURL converter</strong> tool. You'll learn how to <strong>convert browser network requests to cURL</strong>, handle multiple requests, and use the generated commands effectively.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="text-blue-800 font-semibold mb-2">🚀 Try Our Free Tool</p>
              <p className="text-blue-700 text-sm mb-3">
                Ready to convert HAR files to cURL? Use our free <Link href="/har-to-curl" className="font-semibold underline hover:text-blue-900">HAR to cURL Converter</Link> tool. Upload your HAR file or paste HAR JSON, and get instant cURL commands. No signup required!
              </p>
              <Link 
                href="/har-to-curl" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try HAR to cURL Converter Now
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* What is HAR */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a HAR File?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              HAR (HTTP Archive) is a JSON-based format that records all network requests made by a web browser. When you use browser DevTools to record network activity, you can export this data as a HAR file. This file contains:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>All HTTP requests and responses</li>
              <li>Request headers, methods, and URLs</li>
              <li>Response headers and status codes</li>
              <li>Request and response bodies</li>
              <li>Timing information</li>
              <li>Cookies and authentication data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              HAR files are incredibly useful for <strong>network request analysis</strong>, debugging API calls, and understanding how web applications communicate with servers. Converting these files to cURL commands allows you to replay requests, test APIs, and integrate them into your development workflow.
            </p>
          </section>

          {/* Why Convert HAR to cURL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Convert HAR to cURL?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔧 API Testing</h3>
                <p className="text-sm text-gray-700">
                  Convert browser requests to cURL for easy API testing and debugging in the terminal or scripts.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Code Generation</h3>
                <p className="text-sm text-gray-700">
                  Use cURL commands to generate code in Python, JavaScript, PHP, and other languages using our cURL converter.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔄 Request Replay</h3>
                <p className="text-sm text-gray-700">
                  Replay browser requests exactly as they occurred, useful for reproducing bugs and testing edge cases.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📤 Sharing & Documentation</h3>
                <p className="text-sm text-gray-700">
                  Share API requests with team members or document API usage with executable cURL commands.
                </p>
              </div>
            </div>
          </section>

          {/* How to Export HAR from Browser */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Export HAR Files from Browser</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Chrome className="w-5 h-5 text-blue-600" />
                Chrome DevTools
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                  <div>
                    <p className="text-gray-700">
                      Open Chrome DevTools by pressing <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd> or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+I</kbd>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                  <div>
                    <p className="text-gray-700">
                      Navigate to the <strong>Network</strong> tab and ensure recording is active (red circle visible).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                  <div>
                    <p className="text-gray-700">
                      Perform the actions that trigger the network requests you want to capture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                  <div>
                    <p className="text-gray-700">
                      Right-click anywhere in the Network tab and select <strong>"Save all as HAR with content"</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" />
                Firefox Developer Tools
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                  <div>
                    <p className="text-gray-700">
                      Open Firefox Developer Tools by pressing <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F12</kbd> or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+I</kbd>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                  <div>
                    <p className="text-gray-700">
                      Go to the <strong>Network</strong> tab and start recording network activity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                  <div>
                    <p className="text-gray-700">
                      Trigger the network requests you want to capture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                  <div>
                    <p className="text-gray-700">
                      Right-click in the Network tab and select <strong>"Save All As HAR"</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use HAR to cURL Converter */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Our HAR to cURL Converter</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our free <strong>HAR to cURL converter</strong> makes it easy to <strong>convert har files to curl commands</strong>. Here's how to use it:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Upload or Paste HAR Content</h3>
                  <p className="text-gray-700 text-sm">
                    Visit our <Link href="/har-to-curl" className="text-blue-600 hover:underline font-semibold">HAR to cURL converter</Link> page. You can either upload a .har file or paste the HAR JSON content directly into the text area.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Select Request (if multiple)</h3>
                  <p className="text-gray-700 text-sm">
                    If your HAR file contains multiple requests, use the dropdown to select which request you want to convert. The tool automatically detects all requests in the file.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Copy or Download cURL Command</h3>
                  <p className="text-gray-700 text-sm">
                    The tool generates a complete cURL command with all headers, method, URL, and data. Click the copy button to copy to clipboard or download as a .sh file.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Pro Tip:</strong> The generated cURL commands include all headers, authentication, and request data from the original browser request. You can use these commands directly in your terminal or convert them to code using our <Link href="/?tab=curl" className="font-semibold underline">cURL to Code Converter</Link>.
              </p>
            </div>
          </section>

          {/* Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: Converting a HAR File to cURL</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's walk through a real example of <strong>converting har to curl</strong>:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Original HAR Request:</h3>
              <pre className="text-xs overflow-x-auto">
{`{
  "request": {
    "method": "POST",
    "url": "https://api.example.com/users",
    "headers": [
      {"name": "Content-Type", "value": "application/json"},
      {"name": "Authorization", "value": "Bearer token123"}
    ],
    "postData": {
      "mimeType": "application/json",
      "text": "{\\"name\\": \\"John\\", \\"email\\": \\"john@example.com\\"}"
    }
  }
}`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Generated cURL Command:</h3>
              <pre className="text-xs overflow-x-auto">
{`curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name": "John", "email": "john@example.com"}' \\
  "https://api.example.com/users"`}
              </pre>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This cURL command can now be executed in your terminal or converted to Python, JavaScript, or other programming languages using our <Link href="/?tab=curl" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link>.
            </p>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases for HAR to cURL Conversion</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">API Testing & Debugging</h3>
                <p className="text-gray-700 text-sm">
                  Convert browser API requests to cURL for testing in different environments, debugging authentication issues, or testing API endpoints without using a browser.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Code Generation</h3>
                <p className="text-gray-700 text-sm">
                  Use <strong>har to curl conversion</strong> as the first step in generating code. Convert HAR → cURL → Python/JavaScript/PHP using our toolchain.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Request Documentation</h3>
                <p className="text-gray-700 text-sm">
                  Document API requests by converting browser interactions to cURL commands that can be shared with team members or included in API documentation.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Automation & Scripting</h3>
                <p className="text-gray-700 text-sm">
                  Convert browser workflows to cURL commands that can be automated in shell scripts, CI/CD pipelines, or testing frameworks.
                </p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for HAR to cURL Conversion</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Clean Your HAR Files:</strong> Remove unnecessary requests before conversion to focus on the specific API calls you need.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Review Headers:</strong> Check that all required headers are included in the generated cURL command, especially authentication headers.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Test the cURL Command:</strong> Always test the generated cURL command in your terminal before using it in production or sharing it.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Handle Sensitive Data:</strong> Be careful when sharing cURL commands that contain API keys, tokens, or passwords. Consider using environment variables.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Use Our Converter:</strong> Our <strong>HAR to cURL converter</strong> handles edge cases, properly escapes special characters, and formats commands for readability.
                </div>
              </li>
            </ul>
          </section>

          {/* CTA Section */}
          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Convert HAR to cURL?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Use our free <strong>HAR to cURL converter</strong> to transform browser network requests into executable cURL commands. 
              Perfect for <strong>har to curl conversion</strong>, <strong>network request to curl</strong>, and <strong>copy as curl online</strong> workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/har-to-curl" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                <Code className="w-5 h-5" />
                Try HAR to cURL Converter
              </Link>
              <Link 
                href="/?tab=curl" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                Convert cURL to Code
              </Link>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Converting <strong>HAR files to cURL commands</strong> is an essential skill for modern developers. Whether you're debugging API issues, testing endpoints, or generating code from browser requests, our <strong>HAR to cURL converter</strong> makes the process simple and efficient.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Remember: <strong>har to curl conversion</strong> is just the first step. Once you have your cURL commands, you can execute them directly, convert them to code in various languages, or use them for API documentation. Our free tools at <strong>UnblockDevs.com</strong> support your entire development workflow.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
