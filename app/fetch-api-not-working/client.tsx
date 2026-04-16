'use client';

import Link from 'next/link';
import { ArrowLeft, Globe, ExternalLink, AlertTriangle, Wrench } from 'lucide-react';

export default function FetchApiNotWorkingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
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
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fetch API Not Working? Here&apos;s How to Fix It</h1>
              <p className="text-sm text-gray-500 mt-1">8 common causes and their fixes, with code examples</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Fetch API is powerful but has subtle gotchas that trip up even experienced developers. Whether
              you&apos;re getting a silent undefined, a CORS block, a JSON parse error, or simply no data back at all —
              this guide covers every common failure mode with working code examples.
            </p>
          </section>

          {/* 8 Causes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8 Common Reasons Fetch Isn&apos;t Working</h2>
            <div className="space-y-10">

              {/* 1. CORS */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">1.</span>CORS Error
                </h3>
                <p className="text-gray-700 mb-3">
                  If your console shows <em>&quot;blocked by CORS policy&quot;</em>, the server isn&apos;t allowing requests from your
                  origin. This is a server-side fix.{' '}
                  <Link href="/cors-error-fix" className="text-blue-600 underline hover:text-blue-800">
                    See the full CORS error fix guide →
                  </Link>
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-1">Console error:</p>
                  <code className="text-red-700 text-xs">Access to fetch at &apos;https://api.example.com&apos; from origin &apos;http://localhost:3000&apos; has been blocked by CORS policy</code>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fix (Express server):</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));`}
                  </pre>
                </div>
              </div>

              {/* 2. fetch is not defined */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">2.</span><code className="bg-gray-100 px-1 rounded">fetch is not defined</code> in Node.js
                </h3>
                <p className="text-gray-700 mb-3">
                  Fetch is only built-in to Node.js 18+. If you&apos;re on an older version or running server-side code, you&apos;ll hit this.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <pre className="text-red-700 text-xs font-mono">ReferenceError: fetch is not defined</pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fix — option A: upgrade Node.js</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono mb-3">
{`# Check your version
node --version   # needs to be v18+
nvm install 20 && nvm use 20`}
                  </pre>
                  <p className="text-green-800 text-sm font-semibold mb-2">Fix — option B: install node-fetch</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`npm install node-fetch
import fetch from 'node-fetch';  // ESM
// or
const fetch = require('node-fetch'); // CJS (v2)`}
                  </pre>
                </div>
              </div>

              {/* 3. Missing await */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">3.</span>Not Awaiting the Response
                </h3>
                <p className="text-gray-700 mb-3">
                  <code className="bg-gray-100 px-1 rounded">fetch()</code> returns a Promise. Without <code className="bg-gray-100 px-1 rounded">await</code>, you&apos;re working with a Promise object, not the actual response.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken:</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`// Missing await — res is a Promise, not a Response
const res = fetch('https://api.example.com/data');
console.log(res); // Promise { <pending> }`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`async function getData() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  console.log(data); // actual response data
}`}
                  </pre>
                </div>
              </div>

              {/* 4. Not calling .json() */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">4.</span>Not Calling <code className="bg-gray-100 px-1 rounded">.json()</code> on the Response
                </h3>
                <p className="text-gray-700 mb-3">
                  <code className="bg-gray-100 px-1 rounded">fetch()</code> resolves to a <code className="bg-gray-100 px-1 rounded">Response</code> object, not the data itself. You must call <code className="bg-gray-100 px-1 rounded">.json()</code> — which is also async — to extract the body.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken:</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const res = await fetch('https://api.example.com/data');
console.log(res); // Response object, not the data!`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const res = await fetch('https://api.example.com/data');
const data = await res.json(); // parse the body
console.log(data); // { id: 1, name: "..." }`}
                  </pre>
                </div>
              </div>

              {/* 5. Missing Content-Type */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">5.</span>Sending Body Without <code className="bg-gray-100 px-1 rounded">Content-Type: application/json</code>
                </h3>
                <p className="text-gray-700 mb-3">
                  Without the correct <code className="bg-gray-100 px-1 rounded">Content-Type</code> header, the server won&apos;t know to parse your body as JSON and will likely return a 400 or silently ignore the body.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken — missing header:</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice' }),
  // no Content-Type header!
});`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),
});`}
                  </pre>
                </div>
              </div>

              {/* 6. Wrong URL */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">6.</span>Wrong URL — Relative vs Absolute
                </h3>
                <p className="text-gray-700 mb-3">
                  Relative URLs work in browsers but not in Node.js. In Node.js, always use absolute URLs. In browsers, ensure your relative path is correct based on the current route.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken (in Node.js):</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`// In Node.js — relative URLs cause TypeError
const res = await fetch('/api/data');`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const res = await fetch(\`\${BASE_URL}/api/data\`);`}
                  </pre>
                </div>
              </div>

              {/* 7. 401/403 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">7.</span>401 / 403 — Missing or Invalid Auth Token
                </h3>
                <p className="text-gray-700 mb-3">
                  <code className="bg-gray-100 px-1 rounded">fetch()</code> doesn&apos;t throw on 4xx status codes. Always check <code className="bg-gray-100 px-1 rounded">res.ok</code> or <code className="bg-gray-100 px-1 rounded">res.status</code>.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken — not checking status:</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const res = await fetch('/api/protected');
const data = await res.json(); // silently fails with 401 body`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed — with auth header and status check:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const res = await fetch('/api/protected', {
  headers: { Authorization: \`Bearer \${token}\` },
});
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}
const data = await res.json();`}
                  </pre>
                </div>
              </div>

              {/* 8. Mixed content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-blue-600 font-bold mr-2">8.</span>Mixed Content — HTTP Request from HTTPS Page
                </h3>
                <p className="text-gray-700 mb-3">
                  If your site is served over HTTPS but you&apos;re fetching an HTTP endpoint, browsers block it as &quot;mixed content&quot;. The fix is to ensure your API is also served over HTTPS.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-1">Console error:</p>
                  <code className="text-red-700 text-xs">Mixed Content: The page at &apos;https://app.com&apos; was loaded over HTTPS, but requested an insecure resource &apos;http://api.com&apos;</code>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fix:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`// Change your API URL from http:// to https://
const res = await fetch('https://api.example.com/data');
//                        ^^^^^ use HTTPS`}
                  </pre>
                </div>
              </div>

            </div>
          </section>

          {/* Proper JSON POST example */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Properly Send JSON with Fetch</h2>
            <p className="text-gray-700 mb-4">
              Here is the complete, correct pattern for a JSON POST request with error handling:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`async function postData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(\`HTTP \${res.status}: \${errorBody}\`);
  }

  return res.json();
}

// Usage
try {
  const result = await postData('https://api.example.com/users', {
    name: 'Alice',
    email: 'alice@example.com',
  });
  console.log('Created:', result);
} catch (err) {
  console.error('Request failed:', err.message);
}`}
            </pre>
          </section>

          {/* Auth header */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Add an Authorization Header in Fetch</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`// Bearer token (JWT / OAuth)
const res = await fetch('https://api.example.com/profile', {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json',
  },
});

// API Key header
const res = await fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': apiKey,
  },
});

// Basic auth
const credentials = btoa(\`\${username}:\${password}\`);
const res = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
  },
});`}
            </pre>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <Wrench className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Debug your actual API requests</p>
                <p className="text-blue-100 text-sm mb-3">Use our CORS Tester to check what headers your server is actually returning for your origin.</p>
                <Link
                  href="/cors-tester"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Debug your actual API requests with our CORS Tester
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is fetch returning undefined?</h3>
                <p className="text-gray-700">
                  Fetch returns undefined when you don&apos;t <code className="bg-gray-100 px-1 rounded">await</code> the call, or when your async function doesn&apos;t return the result. Always use{' '}
                  <code className="bg-gray-100 px-1 rounded">const res = await fetch(url)</code> followed by{' '}
                  <code className="bg-gray-100 px-1 rounded">const data = await res.json()</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix &apos;fetch is not defined&apos; in Node.js?</h3>
                <p className="text-gray-700">
                  Upgrade to Node.js 18+ (which ships with native fetch) or install <code className="bg-gray-100 px-1 rounded">node-fetch</code> via npm and import it at the top of your file.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is my fetch not sending the body?</h3>
                <p className="text-gray-700">
                  GET requests cannot have a body — use POST. For POST, make sure you set{' '}
                  <code className="bg-gray-100 px-1 rounded">method: &apos;POST&apos;</code>,{' '}
                  <code className="bg-gray-100 px-1 rounded">headers: {'{ "Content-Type": "application/json" }'}</code>, and{' '}
                  <code className="bg-gray-100 px-1 rounded">body: JSON.stringify(data)</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I send JSON with fetch?</h3>
                <p className="text-gray-700">
                  Use <code className="bg-gray-100 px-1 rounded">{'body: JSON.stringify(data)'}</code> and add the{' '}
                  <code className="bg-gray-100 px-1 rounded">Content-Type: application/json</code> header. Without stringifying, you&apos;ll send <code className="bg-gray-100 px-1 rounded">[object Object]</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is fetch returning a CORS error?</h3>
                <p className="text-gray-700">
                  CORS errors must be fixed on the server side by adding the correct{' '}
                  <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Origin</code> header.{' '}
                  <Link href="/cors-error-fix" className="text-blue-600 underline hover:text-blue-800">See the full CORS fix guide.</Link>
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: '/cors-tester', label: 'CORS Tester', desc: 'Test CORS headers from any URL in real time' },
                { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Replay browser requests as cURL commands' },
                { href: '/http-headers-analyzer', label: 'HTTP Headers Analyzer', desc: 'Inspect request and response headers' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500 mt-1 shrink-0 group-hover:text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-blue-700">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
