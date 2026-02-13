'use client';

import Link from 'next/link';
import { ArrowLeft, Server, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const MockApiGenerator = dynamic(() => import('@/components/tools/MockApiGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});

export default function MockApiGeneratorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Mock API Generator - Generate Fake Endpoints Instantly</h1>
          <p className="text-sm text-gray-500 mt-1">Create mock REST APIs with custom responses, delays, and status codes</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Component */}
        <div className="mb-8">
          <MockApiGenerator />
        </div>

        {/* SEO Content Section - 1000-1200 words */}
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Problem Does Mock API Generator Solve?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Frontend development often requires backend APIs that don't exist yet, are unstable, or are expensive to call during 
              development. Building a full backend just for frontend development is time-consuming and unnecessary. Mock APIs solve 
              this problem by providing fake endpoints that simulate real API behavior.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The core problem:</strong> Without mock APIs, developers face:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Waiting for backend APIs to be ready before starting frontend work</li>
              <li>Unable to develop and test frontend features independently</li>
              <li>Dependent on backend team availability and API stability</li>
              <li>Expensive API calls during development and testing</li>
              <li>Difficulty testing error scenarios and edge cases</li>
              <li>Slower development cycles due to backend dependencies</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Mock API Generator solves all these problems by allowing you to create fake API endpoints instantly. You can 
              define custom responses, set delays, configure status codes, and simulate various API behaviors. This enables 
              parallel development, faster iteration, and independent frontend testing without waiting for backend APIs.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Real-World Example</p>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Scenario:</strong> You're building a user dashboard but the user API isn't ready yet.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Solution:</strong> Generate a mock API endpoint that returns sample user data. You can develop and test 
                your dashboard immediately, then switch to the real API when it's ready.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Is Mock API Generator For?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Mock API Generator is essential for anyone developing frontend applications or working with APIs:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Frontend Developers</h3>
                <p className="text-gray-700 mb-3">
                  Frontend developers need to develop UI components and features without waiting for backend APIs. A mock API 
                  generator helps them work independently, test different scenarios, and iterate quickly.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Frontend development, UI testing, component development, rapid prototyping
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Full-Stack Developers</h3>
                <p className="text-gray-700 mb-3">
                  Full-stack developers use mock APIs to develop frontend and backend in parallel. They can work on frontend 
                  features while backend APIs are being developed, speeding up overall development.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Parallel development, full-stack projects, API design, rapid development
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">QA Engineers</h3>
                <p className="text-gray-700 mb-3">
                  QA engineers need to test frontend applications with various API responses including success, errors, and edge 
                  cases. A mock API generator helps them test different scenarios without modifying backend code.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Frontend testing, error scenario testing, edge case testing, test automation
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Students & Learners</h3>
                <p className="text-gray-700 mb-3">
                  Students learning frontend development need APIs to practice with but don't have backend knowledge yet. A mock 
                  API generator helps them learn frontend development and API integration without building a backend.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Learning frontend development, API integration practice, portfolio projects, coding exercises
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features of Our Mock API Generator</h2>
            <div className="space-y-4">
              <div className="p-5 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Custom Response Configuration</h3>
                <p className="text-gray-700 text-sm">
                  Define custom JSON responses, status codes, headers, and response delays. Simulate any API behavior you need 
                  for development and testing.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Multiple HTTP Methods</h3>
                <p className="text-gray-700 text-sm">
                  Support for GET, POST, PUT, DELETE, PATCH, and other HTTP methods. Create complete REST API mockups with 
                  full CRUD operations.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Error Scenario Simulation</h3>
                <p className="text-gray-700 text-sm">
                  Simulate error responses, timeouts, and various HTTP status codes. Test how your application handles different 
                  error scenarios and edge cases.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Pagination & Filtering</h3>
                <p className="text-gray-700 text-sm">
                  Support for paginated responses, query parameters, and filtering. Create realistic API mockups that match 
                  production API behavior.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy-First</h3>
                <p className="text-gray-700 text-sm">
                  All mock API generation happens in your browser. No data is sent to servers. Your mock APIs stay private and 
                  secure. Perfect for sensitive development scenarios.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Guides and Resources</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn more about mock APIs, frontend development, and API testing with these comprehensive guides:
            </p>
            
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/free-mock-api-generator-guide" className="text-blue-600 hover:text-blue-700 underline">
                    Free Mock API in Seconds: Generate Fake Endpoints for Frontend Development (No Backend Needed)
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to generate free mock APIs instantly for frontend development. Create realistic endpoints with delay, 
                  status codes, pagination, and more. No backend needed.
                </p>
                <p className="text-xs text-gray-600">Covers: mock API generation, frontend development, API testing, no backend needed</p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-convert-curl-command-to-javascript-fetch" className="text-green-600 hover:text-green-700 underline">
                    How to Convert cURL Command to JavaScript Fetch
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Step-by-step guide to converting cURL commands to JavaScript Fetch API. Learn how to integrate mock APIs 
                  into your frontend applications.
                </p>
                <p className="text-xs text-gray-600">Covers: API integration, JavaScript Fetch, frontend development</p>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/why-my-api-works-in-postman-but-not-in-browser" className="text-purple-600 hover:text-purple-700 underline">
                    Why My API Works in Postman but Not in Browser
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Understand common reasons why APIs work in Postman but fail in browsers. Learn about CORS, authentication, 
                  headers, and how to debug API issues effectively.
                </p>
                <p className="text-xs text-gray-600">Covers: API debugging, CORS, browser vs Postman, frontend API issues</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enhance your API development workflow with these complementary tools:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/test-data-generator" className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Test Data Generator</h3>
                <p className="text-sm text-gray-700">Generate test data for mock APIs</p>
              </Link>
              <Link href="/api-comparator" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">API Comparator</h3>
                <p className="text-sm text-gray-700">Compare mock vs real API responses</p>
              </Link>
              <Link href="/curl-converter" className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">cURL Converter</h3>
                <p className="text-sm text-gray-700">Convert cURL to code for API testing</p>
              </Link>
              <Link href="/payload-analyzer" className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Payload Analyzer</h3>
                <p className="text-sm text-gray-700">Analyze mock API payloads</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
