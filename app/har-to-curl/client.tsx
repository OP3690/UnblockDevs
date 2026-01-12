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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Problem Does HAR to cURL Conversion Solve?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When debugging web applications, testing APIs, or analyzing network traffic, developers often need to replay browser requests in different environments or convert them to code. However, manually reconstructing HTTP requests with all headers, authentication, cookies, and request bodies is time-consuming, error-prone, and often incomplete.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>HAR to cURL converter</strong> solves this critical problem by automatically extracting all network requests from HAR files and converting them into executable cURL commands. This eliminates manual work, ensures accuracy, and preserves all request details including headers, authentication tokens, cookies, and request bodies.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Without a HAR to cURL converter, developers face several challenges:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li><strong>Manual request reconstruction:</strong> Recreating complex requests with all headers and authentication manually is tedious and error-prone</li>
              <li><strong>Missing headers:</strong> Important headers like authentication tokens, custom headers, or cookies are often forgotten during manual reconstruction</li>
              <li><strong>Request body errors:</strong> Complex JSON payloads, form data, or binary content are difficult to reconstruct accurately</li>
              <li><strong>Time consumption:</strong> Manually converting requests takes significant time, especially when working with multiple requests</li>
              <li><strong>Environment differences:</strong> Testing requests in different environments requires accurate request replication</li>
              <li><strong>Debugging difficulties:</strong> When API calls fail, reproducing the exact request for debugging is challenging</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our tool eliminates all these problems by automatically extracting requests from HAR files and generating accurate cURL commands with all details preserved. You can then execute these commands directly, test them in different environments, or convert them to code using our <Link href="/curl-converter" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is the HAR to cURL Converter For?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>HAR to cURL converter</strong> is essential for anyone who works with web APIs, network debugging, or API testing. Here's who benefits most:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend Developers</h3>
                <p className="text-sm text-gray-700">
                  Frontend developers debugging API integration issues, testing API responses, or verifying request formats need to convert browser network requests to cURL commands for testing in different environments or sharing with backend teams.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Backend Developers</h3>
                <p className="text-sm text-gray-700">
                  Backend developers testing API endpoints, debugging request handling, or verifying authentication flows need to replay browser requests accurately. The converter ensures all headers, authentication, and request bodies are preserved.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">QA Engineers & Testers</h3>
                <p className="text-sm text-gray-700">
                  QA engineers creating automated tests, reproducing bugs, or testing API integrations need to convert browser requests to executable commands. The converter makes it easy to create test cases from real browser interactions.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">DevOps Engineers</h3>
                <p className="text-sm text-gray-700">
                  DevOps engineers monitoring API performance, debugging production issues, or testing API changes need to replay requests from production traffic. HAR files captured from production can be converted to cURL for testing.
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-semibold text-gray-900 mb-2">API Developers</h3>
                <p className="text-sm text-gray-700">
                  API developers documenting endpoints, creating API examples, or testing API versions need to convert browser requests to shareable cURL commands. The converter ensures examples are accurate and complete.
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-gray-900 mb-2">Security Engineers</h3>
                <p className="text-sm text-gray-700">
                  Security engineers analyzing network traffic, testing authentication flows, or auditing API security need to replay requests for security testing. The converter preserves all authentication details for accurate security analysis.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Whether you're debugging a production API issue, creating test cases from browser interactions, or documenting API endpoints, the <strong>HAR to cURL converter</strong> provides the accurate, complete request conversion you need.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Export HAR Files from Browsers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before you can convert HAR files to cURL, you need to export them from your browser. Here's how to do it in popular browsers:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Google Chrome & Microsoft Edge</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-4">
                  <li>Open Developer Tools (F12 or Right-click → Inspect)</li>
                  <li>Go to the "Network" tab</li>
                  <li>Perform the actions that generate the network requests you want to capture</li>
                  <li>Right-click anywhere in the Network tab</li>
                  <li>Select "Save all as HAR with content"</li>
                  <li>Choose a location and save the file</li>
                </ol>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Mozilla Firefox</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-4">
                  <li>Open Developer Tools (F12 or Right-click → Inspect Element)</li>
                  <li>Go to the "Network" tab</li>
                  <li>Perform the actions that generate the network requests</li>
                  <li>Right-click on any request in the list</li>
                  <li>Select "Save All As HAR"</li>
                  <li>Choose a location and save the file</li>
                </ol>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Safari</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-4">
                  <li>Enable Developer Menu (Preferences → Advanced → Show Develop menu)</li>
                  <li>Open Developer Tools (Cmd+Option+I)</li>
                  <li>Go to the "Network" tab</li>
                  <li>Perform the actions that generate the network requests</li>
                  <li>Right-click on any request</li>
                  <li>Select "Export HAR"</li>
                  <li>Choose a location and save the file</li>
                </ol>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Once you have your HAR file, simply upload it to our converter or paste the HAR JSON content, and you'll get executable cURL commands for all requests in the file.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Use Cases</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond basic request conversion, the HAR to cURL converter supports several advanced use cases:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">API Documentation</h3>
                <p className="text-sm text-gray-700">
                  Convert browser requests to cURL commands for API documentation. This ensures documentation examples are accurate and can be executed directly by developers using your API.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Automated Testing</h3>
                <p className="text-sm text-gray-700">
                  Generate cURL commands from browser interactions to create automated test scripts. Convert these commands to code using our <Link href="/curl-converter" className="text-blue-600 hover:underline">cURL to Code Converter</Link> for integration into test suites.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Production Debugging</h3>
                <p className="text-sm text-gray-700">
                  Capture HAR files from production traffic and convert them to cURL commands for debugging in development environments. This allows you to reproduce production issues accurately.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">API Migration</h3>
                <p className="text-sm text-gray-700">
                  When migrating between API versions or services, convert existing browser requests to cURL commands to test new endpoints and verify compatibility.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/curl-converter" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                <Code className="w-4 h-4" />
                cURL Converter
              </Link>
              <Link href="/json-validator" className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                <FileText className="w-4 h-4" />
                JSON Validator
              </Link>
              <Link href="/api-comparator" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                <Network className="w-4 h-4" />
                API Comparator
              </Link>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Guides & Resources</h2>
            <div className="space-y-3">
              <Link
                href="/blog/har-to-curl-converter-complete-guide"
                className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">HAR to cURL Converter: Complete Guide</h3>
                <p className="text-sm text-gray-600 mb-2">Complete guide to converting HAR files to cURL commands, including browser export instructions, advanced use cases, and best practices.</p>
                <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
              <Link
                href="/blog/copy-as-curl-from-browser-guide"
                className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Copy as cURL from Browser: Complete Guide</h3>
                <p className="text-sm text-gray-600 mb-2">Learn how to copy network requests as cURL commands directly from browser developer tools, including Chrome, Firefox, and Safari methods.</p>
                <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
              <Link
                href="/blog/how-to-convert-har-files-to-curl"
                className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">How to Convert HAR Files to cURL: Step-by-Step</h3>
                <p className="text-sm text-gray-600 mb-2">Step-by-step guide to converting HAR files to cURL commands, including file export, conversion process, and using generated commands.</p>
                <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
              </Link>
              <Link
                href="/blog/how-to-convert-curl-to-fetch-axios-automatically"
                className="block p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">How to Convert cURL to Fetch / Axios Automatically</h3>
                <p className="text-sm text-gray-600 mb-2">Learn how to convert cURL commands to JavaScript Fetch or Axios requests automatically. Perfect for frontend developers working with APIs.</p>
                <span className="text-orange-600 text-sm font-medium hover:underline">Read Guide →</span>
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
