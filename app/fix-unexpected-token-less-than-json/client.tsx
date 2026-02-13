'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, Wrench, ExternalLink } from 'lucide-react';

export default function FixUnexpectedTokenLessThanClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Fix "Unexpected token &lt; in JSON" Error</h1>
          <p className="text-sm text-gray-500 mt-1">Complete guide to fixing this common JSON error</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Unexpected token &lt; in JSON"</strong> error is one of the most frustrating JSON errors. 
              It occurs when you're expecting JSON data, but instead receive HTML (usually an error page).
            </p>
            <p className="text-gray-700 leading-relaxed">
              The <code className="bg-gray-100 px-1 rounded">&lt;</code> character is the start of HTML tags, which means 
              your API or server returned an HTML error page instead of JSON. Learn how to fix this instantly using our 
              free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does "Unexpected token &lt; in JSON" Mean?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error means JavaScript's <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> encountered an HTML tag 
              (starting with <code className="bg-gray-100 px-1 rounded">&lt;</code>) when it expected JSON. This typically happens when:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>API endpoint returns an HTML error page (404, 500, etc.)</li>
              <li>Server redirects to a login page</li>
              <li>API endpoint doesn't exist</li>
              <li>Content-Type header is wrong (text/html instead of application/json)</li>
              <li>Network error returns HTML error page</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Causes</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-red-900 mb-2">1. API Endpoint Doesn't Exist (404 Error)</h3>
                <p className="text-red-800 text-sm mb-2">
                  The server returns an HTML 404 page instead of JSON when the endpoint is wrong.
                </p>
                <pre className="bg-white p-3 rounded border border-red-200 text-xs overflow-x-auto mt-2">
{`<html>
  <head><title>404 Not Found</title></head>
  <body>Page not found</body>
</html>`}
                </pre>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-2">2. Server Error (500 Error)</h3>
                <p className="text-orange-800 text-sm">
                  Server crashes return HTML error pages instead of JSON responses.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-900 mb-2">3. Authentication Required</h3>
                <p className="text-yellow-800 text-sm">
                  API requires authentication and redirects to a login HTML page.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Fix "Unexpected token &lt; in JSON"</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check the API Response</h3>
                  <p className="text-gray-700 text-sm">
                    Before parsing, check what you actually received. Log the response to see if it's HTML or JSON.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-3">
                    <pre className="text-xs overflow-x-auto">
{`fetch('/api/users')
  .then(response => {
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    return response.json();
  });`}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verify API Endpoint</h3>
                  <p className="text-gray-700 text-sm">
                    Ensure the API endpoint URL is correct. Test it in a browser or use curl to see what it returns.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check Response Status</h3>
                  <p className="text-gray-700 text-sm">
                    Always check HTTP status codes. Only parse JSON if status is 200-299.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-3">
                    <pre className="text-xs overflow-x-auto">
{`fetch('/api/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }
    return response.json();
  });`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix JSON Errors Instantly</h2>
                <p className="text-blue-100">
                  If you have valid JSON that needs fixing, use our free JSON Fixer to repair syntax errors automatically.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try JSON Fixer Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Why am I getting HTML instead of JSON?</h3>
                <p className="text-gray-700 text-sm">
                  Usually because the API endpoint is wrong, the server returned an error page, or authentication is required. 
                  Check the API URL and response status code.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">How do I prevent this error?</h3>
                <p className="text-gray-700 text-sm">
                  Always check the Content-Type header and HTTP status code before parsing JSON. Only parse if status is 200-299 
                  and Content-Type is application/json.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

