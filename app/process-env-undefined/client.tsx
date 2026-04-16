'use client';

import Link from 'next/link';
import { ArrowLeft, Server, ExternalLink } from 'lucide-react';

export default function ProcessEnvUndefinedClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
            <div className="p-3 bg-green-100 rounded-lg">
              <Server className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <code className="bg-gray-100 px-2 py-0.5 rounded text-2xl font-mono text-gray-800">process.env</code> is undefined — How to Fix Node.js Environment Variables
              </h1>
              <p className="text-sm text-gray-500 mt-1">6 proven fixes covering Node.js, Next.js, Vite, and deployment platforms</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.env.MY_VAR</code> returning{' '}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">undefined</code> is one of the most frustrating Node.js issues — because the fix depends entirely on <em>where</em> and <em>how</em> your code runs. This guide covers every scenario.
            </p>
          </section>

          {/* Cause */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Most Common Cause</h2>
            <p className="text-gray-700 mb-4">
              Environment variables in Node.js are not loaded automatically from a <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> file. The OS only exposes variables that are explicitly set in the shell environment. The <strong>dotenv</strong> package bridges this gap — but only if it runs <em>before</em> any of your other code.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Common mistake — dotenv called too late:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import { connectDB } from './db'; // ← runs BEFORE dotenv!
require('dotenv').config();       // too late — DB already used undefined env vars

console.log(process.env.DB_URL); // undefined`}</pre>
            </div>
          </section>

          {/* Fix 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 1: Load dotenv BEFORE Everything Else</h2>
            <p className="text-gray-700 mb-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">require('dotenv').config()</code> must be the very first line in your entry point file — before any other imports or requires.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const express = require('express');
require('dotenv').config(); // ❌ too late

const app = express();
console.log(process.env.PORT); // undefined`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`require('dotenv').config(); // ✅ line 1 — before anything else

const express = require('express');
const app = express();
console.log(process.env.PORT); // "3000"`}</pre>
            </div>
          </section>

          {/* Fix 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 2: .env File Location</h2>
            <p className="text-gray-700 mb-3">
              By default, dotenv looks for <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> relative to the directory where you run <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">node</code> — which is usually the project root. If your .env is inside <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">src/</code>, dotenv will silently fail to find it.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong structure:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`my-project/
├── src/
│   ├── .env        ❌ dotenv won't find this
│   └── index.js
└── package.json`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Correct structure:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`my-project/
├── .env            ✅ in the project root
├── src/
│   └── index.js
└── package.json`}</pre>
            </div>
          </section>

          {/* Fix 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 3: Next.js — NEXT_PUBLIC_ Prefix Required for Client-Side</h2>
            <p className="text-gray-700 mb-3">
              Next.js has two environments: the <strong>server</strong> (Node.js) and the <strong>browser</strong>. Variables without the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">NEXT_PUBLIC_</code> prefix are only available server-side. Accessing them in a client component returns <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">undefined</code>.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken — accessing server-only var in browser:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// .env
API_URL=https://api.example.com

// components/MyComponent.tsx (client component)
'use client';
console.log(process.env.API_URL); // ❌ undefined in browser`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — use NEXT_PUBLIC_ prefix:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// .env
NEXT_PUBLIC_API_URL=https://api.example.com

// components/MyComponent.tsx (client component)
'use client';
console.log(process.env.NEXT_PUBLIC_API_URL); // ✅ "https://api.example.com"`}</pre>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Server components and API routes can access any variable without the prefix.
            </p>
          </section>

          {/* Fix 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 4: Vite — Use import.meta.env and VITE_ Prefix</h2>
            <p className="text-gray-700 mb-3">
              Vite does not polyfill <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.env</code>. You must use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import.meta.env</code> and all custom variables must be prefixed with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">VITE_</code>.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken in Vite:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// .env
API_URL=https://api.example.com

// src/main.js
console.log(process.env.API_URL); // ❌ undefined — wrong API`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed in Vite:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// .env
VITE_API_URL=https://api.example.com

// src/main.js
console.log(import.meta.env.VITE_API_URL); // ✅ "https://api.example.com"
console.log(import.meta.env.MODE);          // "development" or "production"`}</pre>
            </div>
          </section>

          {/* Fix 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 5: Vercel / Deployment — Variables Set in Dashboard, Not .env</h2>
            <p className="text-gray-700 mb-3">
              Vercel, Netlify, Railway, and similar platforms do <strong>not</strong> read your <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> file. You must configure environment variables through their dashboards.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Common mistake:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# .env committed to repo or assumed to be deployed
DATABASE_URL=postgres://...  # ❌ Vercel ignores this file`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Correct approach:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# 1. Add to Vercel dashboard:
#    Project Settings → Environment Variables
#    Key: DATABASE_URL
#    Value: postgres://user:pass@host/db
#    Environment: Production, Preview, Development

# 2. Your code works identically:
const db = process.env.DATABASE_URL; // ✅ works in production`}</pre>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              The <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> file should be in your <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.gitignore</code> — never commit secrets to version control.
            </p>
          </section>

          {/* Fix 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 6: Variable Name Typo — Console.log All Env Vars to Debug</h2>
            <p className="text-gray-700 mb-3">
              A simple typo in the variable name is surprisingly common. Use this debug snippet to print all loaded environment variables and verify the exact names.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Debug snippet — print all env vars:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`require('dotenv').config();

// Print all env vars loaded from .env (safe for local debugging only)
console.log('Loaded env vars:', Object.keys(process.env).filter(k =>
  !['PATH', 'HOME', 'USER', 'SHELL'].includes(k) // filter system vars
));

// Or check a specific variable with a fallback message:
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not set. Check your .env file.');
}`}</pre>
            </div>
          </section>

          {/* Checklist */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Debug Checklist</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Is <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">require('dotenv').config()</code> the very first line?</li>
              <li>Is the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> file in the project root (same level as <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">package.json</code>)?</li>
              <li>Is dotenv installed? Run <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">npm list dotenv</code> to verify.</li>
              <li>In Next.js — does the variable need the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">NEXT_PUBLIC_</code> prefix?</li>
              <li>In Vite — are you using <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import.meta.env.VITE_*</code>?</li>
              <li>On Vercel/Netlify — are the variables set in the dashboard?</li>
              <li>Is there a typo in the variable name (check case sensitivity)?</li>
              <li>Did you restart the dev server after editing the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> file?</li>
            </ol>
          </section>

          {/* CTA */}
          <section className="mb-10">
            <Link href="/json-formatter">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                <ExternalLink className="w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">Use our free JSON Formatter to inspect your config files →</p>
                  <p className="text-blue-100 text-sm">Paste your JSON config and format it instantly — no signup required.</p>
                </div>
              </div>
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why is process.env.MY_VAR undefined in Node.js?</h3>
                <p className="text-gray-700">The variable is not set in your shell environment and dotenv has not loaded your .env file. Ensure <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">require('dotenv').config()</code> is the first line of your entry file.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why is process.env undefined in Next.js client components?</h3>
                <p className="text-gray-700">Only variables prefixed with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">NEXT_PUBLIC_</code> are bundled into client-side code. Without the prefix, the variable stays server-only and returns undefined in the browser.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why does it work locally but not on Vercel?</h3>
                <p className="text-gray-700">Vercel does not use your .env file. Go to your project's Settings &gt; Environment Variables in the Vercel dashboard and add each variable there.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I use environment variables in Vite?</h3>
                <p className="text-gray-700">Vite exposes variables via <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import.meta.env</code> instead of <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.env</code>. Your variables must start with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">VITE_</code>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Does dotenv work with ES modules?</h3>
                <p className="text-gray-700">Yes — use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import 'dotenv/config'</code> as your first import, or pass <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">--require dotenv/config</code> to the node command.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/json-formatter" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Formatter</p>
                <p className="text-sm text-gray-600 mt-1">Format and pretty-print JSON config files</p>
              </Link>
              <Link href="/json-validator" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Validator</p>
                <p className="text-sm text-gray-600 mt-1">Validate JSON against a schema</p>
              </Link>
              <Link href="/har-to-curl" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">HAR to cURL</p>
                <p className="text-sm text-gray-600 mt-1">Convert HAR files to cURL commands</p>
              </Link>
              <Link href="/dotenv-not-loading" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">dotenv Not Loading Guide</p>
                <p className="text-sm text-gray-600 mt-1">7 fixes for dotenv not loading .env files</p>
              </Link>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
