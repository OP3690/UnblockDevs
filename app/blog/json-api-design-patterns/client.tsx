'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, Code, Database, Zap, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export default function JsonApiDesignPatternsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileCode className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON API Design Patterns</h1>
              <p className="text-sm text-gray-500 mt-1">RESTful Best Practices & Industry Standards</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Designing JSON APIs that are intuitive, maintainable, and scalable requires following established patterns 
              and best practices. This guide covers the most important JSON API design patterns used by successful APIs 
              from companies like GitHub, Stripe, and Twitter.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're building a public API, internal microservices, or a mobile backend, these patterns will help 
              you create APIs that are easy to understand, use, and maintain.
            </p>
          </section>

          {/* Section 1: Response Structure Patterns */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              1. Response Structure Patterns
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Envelope Pattern</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Wrap all responses in a consistent envelope structure. This provides metadata and makes error handling easier:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe"
  },
  "meta": {
    "timestamp": "2025-01-31T10:00:00Z",
    "version": "v1"
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Data-Only Pattern</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some APIs return data directly without an envelope. This is simpler but less flexible:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Error Handling Patterns */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-blue-600" />
              2. Error Handling Patterns
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Standardized Error Format</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use a consistent error structure across all endpoints. This makes error handling predictable:
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-red-200 text-sm overflow-x-auto">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "field": "email",
    "details": {
      "expected": "email format",
      "received": "invalid-email"
    },
    "timestamp": "2025-01-31T10:00:00Z"
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">HTTP Status Codes</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use appropriate HTTP status codes with your JSON error responses:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status Code</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">400</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Bad Request - Invalid input</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">401</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Unauthorized - Missing/invalid auth</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">404</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Not Found - Resource doesn't exist</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">500</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Internal Server Error</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Pagination Patterns */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              3. Pagination Patterns
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Offset-Based Pagination</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Simple pagination using offset and limit. Good for small to medium datasets:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`{
  "data": [...],
  "pagination": {
    "offset": 0,
    "limit": 20,
    "total": 100,
    "hasMore": true
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cursor-Based Pagination</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  More efficient for large datasets. Uses cursors instead of offsets:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "data": [...],
  "pagination": {
    "cursor": "eyJpZCI6MTIzfQ",
    "hasNext": true,
    "nextCursor": "eyJpZCI6MTQzfQ"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Filtering and Sorting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              4. Filtering and Sorting Patterns
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Query Parameters</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use query parameters for filtering and sorting. Keep it simple and consistent:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Example Request:</p>
                  <code className="text-sm text-gray-700">GET /api/users?status=active&sort=name&order=asc&limit=10</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">JSON Query Language</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For complex queries, accept JSON in the request body:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`POST /api/users/search
{
  "filters": {
    "status": "active",
    "age": { "$gte": 18, "$lte": 65 }
  },
  "sort": { "name": "asc" },
  "limit": 20
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Versioning Patterns */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              5. API Versioning Patterns
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">URL Versioning</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Include version in the URL path. Most common and explicit:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <code className="text-sm text-green-800">/api/v1/users</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Header Versioning</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use custom headers to specify version:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <code className="text-sm text-blue-800">X-API-Version: v2</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Version in Response</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Always include version information in JSON responses:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "apiVersion": "v2",
  "data": { ... }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Nested Resources */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              6. Nested Resources Pattern
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Embedded Resources</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Include related resources directly in the response when appropriate:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "id": 123,
  "name": "John Doe",
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Linked Resources</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For large or optional resources, provide links instead:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`{
  "id": 123,
  "name": "John Doe",
  "addressUrl": "/api/users/123/address"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Bulk Operations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              7. Bulk Operations Pattern
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Batch Requests</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Support batch operations for efficiency. Accept arrays of operations:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`POST /api/users/batch
{
  "operations": [
    { "action": "create", "data": { "name": "John" } },
    { "action": "update", "id": 123, "data": { "name": "Jane" } }
  ]
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Batch Response</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Return results for each operation, including any errors:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`{
  "results": [
    { "success": true, "id": 124 },
    { "success": false, "error": "Validation failed" }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              8. Real-World API Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">GitHub API Pattern</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  GitHub uses a clean, consistent structure with links for related resources:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "id": 123,
  "name": "repository",
  "full_name": "owner/repository",
  "html_url": "https://github.com/owner/repository",
  "owner": {
    "login": "owner",
    "id": 456
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stripe API Pattern</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Stripe uses nested objects and consistent error handling:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "id": "cus_123",
  "object": "customer",
  "email": "customer@example.com",
  "created": 1640995200
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Test Your JSON APIs</h2>
            <p className="text-blue-100 mb-6">
              Use our free online JSON tools to validate, format, and test your API responses. 
              Compare API responses and ensure they follow best practices.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Try API Tools
            </Link>
          </section>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try JSON Tools
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

