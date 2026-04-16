'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, ExternalLink, AlertTriangle, Wrench, Globe } from 'lucide-react';

export default function CorsErrorFixClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
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
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix &quot;Blocked by CORS Policy&quot; Error</h1>
              <p className="text-sm text-gray-500 mt-1">Complete guide to fixing CORS errors in fetch, axios, React, and Node.js</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              The <strong>&quot;blocked by CORS policy&quot;</strong> error is one of the most frustrating errors in web
              development. It happens when your browser blocks a request to a different domain because the server
              doesn&apos;t permit it. This guide covers every fix — from Express middleware to Nginx headers to
              development proxies.
            </p>
          </section>

          {/* What is CORS */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a CORS Error?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              CORS stands for <strong>Cross-Origin Resource Sharing</strong>. Browsers enforce a security rule called
              the <em>Same-Origin Policy</em> — a page on <code className="bg-gray-100 px-1 rounded">https://app.com</code>{' '}
              cannot make requests to <code className="bg-gray-100 px-1 rounded">https://api.otherdomain.com</code> unless
              the server explicitly allows it via HTTP response headers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When those headers are missing or incorrect, the browser blocks the response and you see the error in your
              console. The server <em>did</em> receive and process your request — the browser just refuses to hand the
              response to your JavaScript code.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mt-4">
              <p className="font-semibold text-red-900 mb-1">Typical CORS error messages:</p>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>Access to fetch at &apos;...&apos; has been blocked by CORS policy</li>
                <li>No &apos;Access-Control-Allow-Origin&apos; header is present on the requested resource</li>
                <li>Response to preflight request doesn&apos;t pass access control check</li>
              </ul>
            </div>
          </section>

          {/* Common Causes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Causes</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span><strong>Missing CORS headers:</strong> The server does not send <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Origin</code> in its response.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span><strong>Wrong origin value:</strong> The server allows <code className="bg-gray-100 px-1 rounded">https://app.com</code> but your request comes from <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span><strong>Preflight request fails:</strong> The server doesn&apos;t handle the <code className="bg-gray-100 px-1 rounded">OPTIONS</code> method or doesn&apos;t return <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Methods</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span><strong>Credentials issue:</strong> You&apos;re sending cookies but the server doesn&apos;t set <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Credentials: true</code> (and you can&apos;t use <code className="bg-gray-100 px-1 rounded">*</code> for the origin).</span>
              </li>
            </ul>
          </section>

          {/* How to Fix */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Fix CORS Error</h2>

            {/* Express */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Fix in Express / Node.js</h3>
              <p className="text-gray-700 mb-3">
                Install the <code className="bg-gray-100 px-1 rounded">cors</code> npm package and add it as middleware before your routes.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mb-3">
{`npm install cors

// Allow all origins (development only)
const cors = require('cors');
app.use(cors());

// Allow a specific origin (production)
app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,          // only if you need cookies/auth
}));

// Handle preflight for all routes
app.options('*', cors());`}
              </pre>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-green-800 text-sm"><strong>Tip:</strong> Always call <code className="bg-green-100 px-1 rounded">app.options(&apos;*&apos;, cors())</code> to handle preflight OPTIONS requests for all routes.</p>
              </div>
            </div>

            {/* FastAPI */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Fix in Python FastAPI</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`}
              </pre>
            </div>

            {/* Nginx */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Fix in Nginx</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`location /api/ {
    add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;

    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        add_header 'Content-Length' 0;
        return 204;
    }
}`}
              </pre>
            </div>

            {/* Dev proxy */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Fix CORS in Development (Use a Proxy)</h3>
              <p className="text-gray-700 mb-3">
                Instead of changing the server, configure your dev server to proxy API requests — so the browser thinks it&apos;s talking to the same origin.
              </p>
              <p className="text-gray-600 font-medium mb-2">Vite (<code className="bg-gray-100 px-1 rounded">vite.config.ts</code>):</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mb-4">
{`export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}`}
              </pre>
              <p className="text-gray-600 font-medium mb-2">Create React App (<code className="bg-gray-100 px-1 rounded">package.json</code>):</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`{
  "proxy": "http://localhost:8000"
}`}
              </pre>
            </div>
          </section>

          {/* Fix without backend */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix CORS Without Backend Access</h2>
            <p className="text-gray-700 mb-4">
              If you can&apos;t modify the server (e.g., a third-party API), your options are limited but not zero:
            </p>
            <ul className="space-y-3 text-gray-700 mb-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                <span><strong>Use a CORS proxy for testing only</strong> — services like <code className="bg-gray-100 px-1 rounded">https://corsproxy.io</code> forward your request and add CORS headers. Never use these in production with sensitive data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                <span><strong>Create a backend proxy route</strong> — have your own server forward the request to the third-party API. Your frontend calls your server (same origin), your server calls the API.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                <span><strong>Use Next.js API routes or Edge Functions</strong> — create <code className="bg-gray-100 px-1 rounded">pages/api/proxy.ts</code> to forward requests server-side.</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <Globe className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Test your CORS headers live</p>
                <p className="text-blue-100 text-sm mb-3">Enter your API URL and origin to instantly check what CORS headers are returned.</p>
                <Link
                  href="/cors-tester"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Test your CORS headers live with our free CORS Tester
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Error messages table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5 CORS Error Messages Explained</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Error Message</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Cause &amp; Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-red-700 text-xs">blocked by CORS policy</td>
                    <td className="p-3 border border-gray-200 text-gray-700">Server missing <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Origin</code>. Add CORS middleware on the server.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200 font-mono text-red-700 text-xs">No &apos;Access-Control-Allow-Origin&apos; header</td>
                    <td className="p-3 border border-gray-200 text-gray-700">Same as above — the response header is absent entirely. Check server configuration.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-red-700 text-xs">has been blocked by CORS policy: No &apos;Access-Control-Allow-Origin&apos;</td>
                    <td className="p-3 border border-gray-200 text-gray-700">Chrome&apos;s full error message. The server returned a response but without the required header.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200 font-mono text-red-700 text-xs">preflight response is invalid</td>
                    <td className="p-3 border border-gray-200 text-gray-700">Server doesn&apos;t handle OPTIONS requests. Add <code className="bg-gray-100 px-1 rounded">app.options(&apos;*&apos;, cors())</code> in Express.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-red-700 text-xs">Credentials flag is true but Access-Control-Allow-Credentials is not true</td>
                    <td className="p-3 border border-gray-200 text-gray-700">Add <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Credentials: true</code> header and use a specific origin, not <code className="bg-gray-100 px-1 rounded">*</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What causes the blocked by CORS policy error?</h3>
                <p className="text-gray-700">
                  The error occurs when a browser makes a cross-origin HTTP request and the server doesn&apos;t include the
                  <code className="bg-gray-100 px-1 mx-1 rounded">Access-Control-Allow-Origin</code> response header matching your
                  frontend&apos;s origin. Browsers block the response as a security measure called the Same-Origin Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix CORS in Express/Node.js?</h3>
                <p className="text-gray-700">
                  Run <code className="bg-gray-100 px-1 rounded">npm install cors</code>, then add{' '}
                  <code className="bg-gray-100 px-1 rounded">app.use(cors({'{ origin: \'https://yourdomain.com\' }'}))</code> before
                  your routes. Also call <code className="bg-gray-100 px-1 rounded">app.options(&apos;*&apos;, cors())</code> to handle preflight requests.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I fix CORS without touching the backend?</h3>
                <p className="text-gray-700">
                  During development, use your build tool&apos;s proxy (Vite or CRA). For production, you need to control the server or add a backend proxy layer. CORS proxy services work for quick testing but should never handle sensitive data.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why does localhost get CORS errors?</h3>
                <p className="text-gray-700">
                  Each port on localhost is a different origin — <code className="bg-gray-100 px-1 rounded">localhost:3000</code> and{' '}
                  <code className="bg-gray-100 px-1 rounded">localhost:8000</code> are separate. Your API server must explicitly allow your
                  dev origin, or use a dev proxy to forward requests through the same port.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What is a preflight request?</h3>
                <p className="text-gray-700">
                  A preflight is an automatic HTTP OPTIONS request sent by the browser before certain cross-origin requests (e.g., POST
                  with JSON, or requests with custom headers like Authorization). The server must respond with status 200 and the correct
                  <code className="bg-gray-100 px-1 mx-1 rounded">Access-Control-Allow-*</code> headers.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: '/cors-tester', label: 'CORS Tester', desc: 'Test CORS headers from any URL instantly' },
                { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser HAR files to cURL commands' },
                { href: '/http-headers-analyzer', label: 'HTTP Headers Analyzer', desc: 'Inspect and analyze HTTP response headers' },
                { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format, validate, and fix JSON online' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-orange-500 mt-1 shrink-0 group-hover:text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-orange-700">{label}</p>
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
