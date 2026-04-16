'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function CurlPostJsonClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Terminal className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">cURL POST JSON — Copy-Ready Examples for Any API</h1>
              <p className="text-sm text-gray-500 mt-1">
                Every cURL pattern you need: auth, headers, form data, files, PUT, DELETE, and verbose debugging
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              cURL is the universal tool for testing REST APIs, debugging HTTP requests, and automating API calls from
              the command line. This guide provides copy-ready cURL commands for every common scenario — JSON bodies,
              authentication, file uploads, and more.
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
              <p className="text-gray-700 text-sm font-medium">
                Tip: cURL is pre-installed on macOS, Linux, and Windows 10+. Open Terminal (macOS/Linux) or Command
                Prompt/PowerShell (Windows) and paste any command below.
              </p>
            </div>
          </section>

          {/* Example 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Basic cURL POST with JSON Body</h2>
            <p className="text-gray-700 mb-3">
              The simplest POST request with a JSON body. The{' '}
              <code className="bg-gray-100 px-1 rounded">-X POST</code> flag sets the method and{' '}
              <code className="bg-gray-100 px-1 rounded">-d</code> sends the body.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`curl -X POST https://api.example.com/users \\
  -d '{"name":"Alice","email":"alice@example.com"}'`}</pre>
          </section>

          {/* Example 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Add Content-Type: application/json Header</h2>
            <p className="text-gray-700 mb-3">
              Always include the <code className="bg-gray-100 px-1 rounded">Content-Type</code> header so the server
              knows to parse the body as JSON. Without it, many APIs reject or misparse the request body.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`curl -X POST https://api.example.com/users \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Alice","email":"alice@example.com","role":"admin"}'`}</pre>
          </section>

          {/* Example 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Add Authorization Bearer Token</h2>
            <p className="text-gray-700 mb-3">
              Most modern APIs require a Bearer token in the{' '}
              <code className="bg-gray-100 px-1 rounded">Authorization</code> header. Replace{' '}
              <code className="bg-gray-100 px-1 rounded">YOUR_TOKEN</code> with your actual JWT or OAuth token.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`curl -X POST https://api.example.com/protected/resource \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...' \\
  -d '{"action":"create","data":{"title":"New Item"}}'`}</pre>
          </section>

          {/* Example 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Add Multiple Custom Headers</h2>
            <p className="text-gray-700 mb-3">
              Add as many headers as you need using multiple{' '}
              <code className="bg-gray-100 px-1 rounded">-H</code> flags. Common headers include{' '}
              <code className="bg-gray-100 px-1 rounded">Accept</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">X-Request-Id</code>, and custom app headers.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`curl -X POST https://api.example.com/orders \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Accept: application/json' \\
  -H 'X-Request-Id: req-12345' \\
  -H 'X-App-Version: 2.1.0' \\
  -d '{"product_id":"abc-123","quantity":2}'`}</pre>
          </section>

          {/* Example 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. POST with API Key Header</h2>
            <p className="text-gray-700 mb-3">
              APIs that use API keys (OpenAI, Stripe, etc.) typically accept them in a custom header like{' '}
              <code className="bg-gray-100 px-1 rounded">X-API-Key</code> or sometimes in the Authorization header.
              Check your API docs for the exact header name.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Generic X-API-Key header
curl -X POST https://api.example.com/data \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-Key: sk_live_abc123def456' \\
  -d '{"query":"hello world"}'

# OpenAI-style API key
curl -X POST https://api.openai.com/v1/chat/completions \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer sk-proj-...' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`}</pre>
          </section>

          {/* Example 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">6. POST Form Data (URL-encoded)</h2>
            <p className="text-gray-700 mb-3">
              Some APIs (especially OAuth endpoints) accept{' '}
              <code className="bg-gray-100 px-1 rounded">application/x-www-form-urlencoded</code> bodies instead of
              JSON. Use <code className="bg-gray-100 px-1 rounded">--data-urlencode</code> for proper encoding of
              special characters.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Standard URL-encoded form data
curl -X POST https://api.example.com/token \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  -d 'grant_type=client_credentials&client_id=abc&client_secret=xyz'

# --data-urlencode encodes special characters safely
curl -X POST https://api.example.com/search \\
  --data-urlencode 'query=hello world & more' \\
  --data-urlencode 'category=news'`}</pre>
          </section>

          {/* Example 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">7. POST Multipart/form-data (File Upload)</h2>
            <p className="text-gray-700 mb-3">
              Use <code className="bg-gray-100 px-1 rounded">-F</code> for multipart form data, which is required for
              file uploads. cURL automatically sets the{' '}
              <code className="bg-gray-100 px-1 rounded">Content-Type: multipart/form-data</code> header.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Upload a single file
curl -X POST https://api.example.com/upload \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -F 'file=@/path/to/document.pdf' \\
  -F 'folder=reports'

# Upload with custom content type for the file
curl -X POST https://api.example.com/images \\
  -F 'image=@/path/to/photo.jpg;type=image/jpeg' \\
  -F 'title=Profile Photo' \\
  -F 'public=true'

# Upload multiple files
curl -X POST https://api.example.com/batch \\
  -F 'files[]=@file1.txt' \\
  -F 'files[]=@file2.txt'`}</pre>
          </section>

          {/* Example 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">8. PUT Request Example</h2>
            <p className="text-gray-700 mb-3">
              Use <code className="bg-gray-100 px-1 rounded">-X PUT</code> to update an existing resource. PUT
              replaces the entire resource; PATCH updates only specified fields.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# PUT — replace the full resource
curl -X PUT https://api.example.com/users/123 \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -d '{"name":"Alice Updated","email":"alice@example.com","role":"admin"}'

# PATCH — update only specific fields
curl -X PATCH https://api.example.com/users/123 \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -d '{"name":"Alice Updated"}'`}</pre>
          </section>

          {/* Example 9 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">9. DELETE Request with Auth</h2>
            <p className="text-gray-700 mb-3">
              DELETE requests typically send no body. Include authentication headers and, if the API requires it, the
              resource identifier in the URL path.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# DELETE a resource by ID
curl -X DELETE https://api.example.com/users/123 \\
  -H 'Authorization: Bearer YOUR_TOKEN'

# DELETE with a body (uncommon but supported by some APIs)
curl -X DELETE https://api.example.com/bulk \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -d '{"ids":["123","456","789"]}'`}</pre>
          </section>

          {/* Example 10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">10. Verbose Mode for Debugging</h2>
            <p className="text-gray-700 mb-3">
              Add <code className="bg-gray-100 px-1 rounded">-v</code> to see the full request and response headers,
              including TLS handshake details. Use{' '}
              <code className="bg-gray-100 px-1 rounded">-i</code> for just the response headers inline with the body.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Full verbose — shows request headers, TLS, and response headers
curl -v -X POST https://api.example.com/data \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -d '{"key":"value"}'

# Include response headers in output (-i)
curl -i -X GET https://api.example.com/users/123 \\
  -H 'Authorization: Bearer YOUR_TOKEN'

# Silent mode — suppress progress (useful in scripts)
curl -s -X POST https://api.example.com/data \\
  -H 'Content-Type: application/json' \\
  -d '{"key":"value"}' | jq .

# Save response body to file
curl -X GET https://api.example.com/export \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -o response.json`}</pre>
          </section>

          {/* Flag reference table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">cURL Flags Quick Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">Flag</th>
                    <th className="px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { flag: '-X', purpose: 'Set HTTP method', example: '-X POST' },
                    { flag: '-H', purpose: 'Add request header', example: "-H 'Content-Type: application/json'" },
                    { flag: '-d', purpose: 'Send request body (reads @ as file path)', example: "-d '{\"key\":\"val\"}'" },
                    { flag: '--data-raw', purpose: 'Send body literally (@ not treated as file)', example: "--data-raw '{\"key\":\"@value\"}'" },
                    { flag: '-F', purpose: 'Multipart form data / file upload', example: '-F file=@photo.jpg' },
                    { flag: '--data-urlencode', purpose: 'URL-encode form field values', example: "--data-urlencode 'q=hello world'" },
                    { flag: '-v', purpose: 'Verbose — full request/response headers', example: '-v' },
                    { flag: '-i', purpose: 'Include response headers in output', example: '-i' },
                    { flag: '-s', purpose: 'Silent — suppress progress meter', example: '-s' },
                    { flag: '-o', purpose: 'Write response body to file', example: '-o output.json' },
                    { flag: '--compressed', purpose: 'Request compressed response (gzip)', example: '--compressed' },
                  ].map(({ flag, purpose, example }) => (
                    <tr key={flag} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-blue-700 font-semibold">{flag}</td>
                      <td className="px-4 py-3 text-gray-700">{purpose}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA 1 */}
          <section className="mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Convert any cURL to Python requests instantly</h2>
              <p className="text-blue-100 mb-4">
                Paste any cURL command and get an equivalent Python requests snippet with all headers, auth, and body
                preserved. No signup required.
              </p>
              <Link
                href="/curl-to-python"
                className="inline-block bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Open cURL to Python →
              </Link>
            </div>
          </section>

          {/* CTA 2 */}
          <section className="mb-12">
            <div className="bg-gray-800 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Convert browser requests to cURL</h2>
              <p className="text-gray-300 mb-4">
                Capture any browser network request from the DevTools HAR export and convert it to a ready-to-run
                cURL command.
              </p>
              <Link
                href="/har-to-curl"
                className="inline-block bg-green-400 text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-green-300 transition-colors"
              >
                Open HAR to cURL →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How do I send JSON data with cURL?',
                  a: "Use -d with the JSON string and set the Content-Type header: curl -X POST URL -H 'Content-Type: application/json' -d '{\"key\":\"value\"}'",
                },
                {
                  q: 'How do I add an Authorization header in cURL?',
                  a: "Add -H 'Authorization: Bearer YOUR_TOKEN' to the command. For API keys, use -H 'X-API-Key: YOUR_KEY' or whatever header name the API expects.",
                },
                {
                  q: 'What is the difference between -d and --data-raw?',
                  a: "-d treats values starting with @ as file paths and reads the file content. --data-raw sends the value exactly as provided, treating @ as a literal character. For JSON payloads without @ symbols, they behave identically.",
                },
                {
                  q: 'How do I send a file with cURL?',
                  a: "Use -F 'file=@/path/to/file' for multipart/form-data uploads. cURL automatically sets the Content-Type multipart header. For raw binary upload, use --data-binary @/path/to/file with an explicit Content-Type header.",
                },
                {
                  q: 'How do I convert a cURL command to Python?',
                  a: 'Use the free cURL to Python tool at unblockdevs.com/curl-to-python. Paste your cURL command and get an equivalent Python requests snippet instantly.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-700 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'cURL to Python', href: '/curl-to-python' },
                { label: 'HAR to cURL', href: '/har-to-curl' },
                { label: 'JSON Formatter', href: '/json-formatter' },
                { label: 'CORS Tester', href: '/cors-tester' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
