'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, ExternalLink } from 'lucide-react';

export default function DotenvNotLoadingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
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
            <div className="p-3 bg-teal-100 rounded-lg">
              <FileCode className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                dotenv Not Loading Your .env Variables — 7 Fixes
              </h1>
              <p className="text-sm text-gray-500 mt-1">Covers CommonJS, ES modules, TypeScript, Next.js, and Docker</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              dotenv silently fails more often than it throws an error. When your <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.env</code> variables are still <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">undefined</code> after calling <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dotenv.config()</code>, one of these 7 issues is almost always the cause.
            </p>
          </section>

          {/* Fix 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 1: require('dotenv').config() Must Be Line 1</h2>
            <p className="text-gray-700 mb-3">
              This is the most common cause. ES module <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import</code> statements are hoisted — meaning they execute before any code you write. If you <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import</code> other modules before dotenv loads, those modules will not see the env variables.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken — imports hoist above dotenv:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import { connectDB } from './db';   // ← runs first, before dotenv
import dotenv from 'dotenv';
dotenv.config();                     // ❌ too late — db.js already imported`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — dotenv as first import:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import 'dotenv/config';             // ✅ line 1 — executes first

import { connectDB } from './db';   // now has access to process.env`}</pre>
            </div>
          </section>

          {/* Fix 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 2: .env File Must Be in the Project Root</h2>
            <p className="text-gray-700 mb-3">
              dotenv resolves the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> path relative to <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.cwd()</code> — the directory from which you run the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">node</code> command. This is usually your project root.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — .env inside src/:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`my-project/
├── src/
│   ├── .env        ❌ dotenv will not find this
│   └── index.js
└── package.json

# Even if you run: node src/index.js
# process.cwd() is still /my-project — not /my-project/src`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Correct — .env in root:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`my-project/
├── .env            ✅ root — matches process.cwd()
├── src/
│   └── index.js
└── package.json`}</pre>
            </div>
          </section>

          {/* Fix 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 3: Use the path Option for Custom Location</h2>
            <p className="text-gray-700 mb-3">
              If you need to keep your .env file in a non-standard location, use the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">path</code> option to tell dotenv exactly where to look.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Use path option for custom .env location:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../config/.env') // ✅ absolute path
});

// Or relative to current file:
require('dotenv').config({
  path: path.join(__dirname, '.env') // always resolves from this file's dir
});

// Multiple .env files (dotenv v16+):
require('dotenv').config({ path: ['.env.local', '.env'] });`}</pre>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Always use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">path.resolve()</code> or <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">path.join()</code> — never rely on bare relative strings with dotenv.
            </p>
          </section>

          {/* Fix 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 4: ESM / TypeScript — Use import Differently</h2>
            <p className="text-gray-700 mb-3">
              CommonJS (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">require</code>) and ES modules (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import</code>) need different dotenv loading patterns.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">ES Module (type: "module" in package.json):</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// Option A: side-effect import (recommended)
import 'dotenv/config';  // ✅ first line

// Option B: explicit config call
import { config } from 'dotenv';
config();

// Option C: CLI flag (no code changes needed)
// node --require dotenv/config src/server.js`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">TypeScript with ts-node:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// src/index.ts — line 1:
import 'dotenv/config';

// Or via CLI:
// ts-node -r dotenv/config src/index.ts

// package.json script:
{
  "scripts": {
    "dev": "ts-node -r dotenv/config src/index.ts"
  }
}`}</pre>
            </div>
          </section>

          {/* Fix 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 5: Check for Typos — Use dotenv Debug Mode</h2>
            <p className="text-gray-700 mb-3">
              dotenv silently ignores missing files. Enable <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">debug: true</code> to see exactly what dotenv finds — and where it is looking.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Enable dotenv debug mode:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`require('dotenv').config({ debug: true });

// Console output will show:
// [dotenv][DEBUG] Trying to load /app/.env
// [dotenv][DEBUG] Loaded /app/.env
// [dotenv][DEBUG] "DB_HOST" is already defined in process.env and will not be overwritten

// If file is missing:
// [dotenv][DEBUG] Failed to load /app/.env: ENOENT: no such file or directory`}</pre>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              The debug output tells you the exact path dotenv resolved — use this to confirm your file is where dotenv expects it.
            </p>
          </section>

          {/* Fix 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 6: .env.local vs .env — Next.js Priority Order</h2>
            <p className="text-gray-700 mb-3">
              Next.js supports multiple .env files with a strict priority order. Understanding this prevents unexpected variable values.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Next.js .env file priority (highest to lowest):</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# 1. Process environment (system/shell vars) — always wins
# 2. .env.local          — local overrides, gitignored, highest .env priority
# 3. .env.development    — loaded when NODE_ENV=development
# 3. .env.production     — loaded when NODE_ENV=production
# 3. .env.test           — loaded when NODE_ENV=test
# 4. .env                — base defaults, committed to git

# Recommended usage:
# .env          → default values, safe to commit (no secrets)
# .env.local    → your local secrets (add to .gitignore)
# .env.production → production-specific non-secret values`}</pre>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              For plain Node.js with dotenv (not Next.js), none of this hierarchy applies — dotenv only loads the one file you specify.
            </p>
          </section>

          {/* Fix 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 7: Docker / CI — System Variables Override .env</h2>
            <p className="text-gray-700 mb-3">
              By default, dotenv will <strong>not</strong> overwrite variables already set in <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.env</code>. In Docker or CI systems, variables are often injected by the platform — making dotenv appear to do nothing.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">dotenv skips variables already in environment:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Docker run command sets DB_URL:
# docker run -e DB_URL=prod-db.example.com my-app

# .env file:
# DB_URL=localhost

require('dotenv').config();
console.log(process.env.DB_URL); // "prod-db.example.com" — .env ignored!`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Force .env values with override: true:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`require('dotenv').config({ override: true }); // ✅ .env wins over system vars

// Or conditionally — only override in development:
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ override: true });
}`}</pre>
            </div>
          </section>

          {/* Verify dotenv is working */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify dotenv is Working</h2>
            <p className="text-gray-700 mb-3">
              Use this debug script to quickly confirm dotenv is loading correctly before adding more code:
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">debug-env.js — run with: node debug-env.js</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// debug-env.js
const result = require('dotenv').config({ debug: true });

if (result.error) {
  console.error('dotenv ERROR:', result.error.message);
  process.exit(1);
}

console.log('dotenv loaded successfully.');
console.log('Parsed variables:');

for (const [key, value] of Object.entries(result.parsed || {})) {
  // Mask secrets — show only the first 4 chars
  const masked = value.length > 4 ? value.slice(0, 4) + '****' : '****';
  console.log(\`  \${key} = \${masked}\`);
}

console.log('\\nChecking specific variables:');
const required = ['DATABASE_URL', 'API_KEY', 'PORT'];
for (const key of required) {
  const status = process.env[key] ? '✅' : '❌ MISSING';
  console.log(\`  \${key}: \${status}\`);
}`}</pre>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-10">
            <Link href="/json-validator">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                <ExternalLink className="w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">Validate your JSON config files →</p>
                  <p className="text-blue-100 text-sm">Paste your JSON config and validate it against a schema — free, no signup.</p>
                </div>
              </div>
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why is dotenv not loading my .env file?</h3>
                <p className="text-gray-700">Most likely: the call is not on line 1, the .env is not in the project root, or a system variable is shadowing it. Enable <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">debug: true</code> to diagnose.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I use dotenv with ES modules?</h3>
                <p className="text-gray-700">Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import 'dotenv/config'</code> as your first import, or start node with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">--require dotenv/config</code>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I use dotenv with TypeScript?</h3>
                <p className="text-gray-700">Add <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">import 'dotenv/config'</code> as the first line in your TypeScript entry file. For ts-node, use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">ts-node -r dotenv/config src/index.ts</code>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What is the difference between .env and .env.local?</h3>
                <p className="text-gray-700">In Next.js, <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env.local</code> overrides <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.env</code> and is gitignored. For plain Node.js with dotenv, only the file you specify is loaded — the hierarchy is a Next.js feature.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why does dotenv not work in Docker or CI?</h3>
                <p className="text-gray-700">System-injected variables take precedence. Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dotenv.config({'{ override: true }'})</code> to force .env values to win over system variables.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/json-validator" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Validator</p>
                <p className="text-sm text-gray-600 mt-1">Validate JSON config files against a schema</p>
              </Link>
              <Link href="/json-formatter" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Formatter</p>
                <p className="text-sm text-gray-600 mt-1">Format and pretty-print your config files</p>
              </Link>
              <Link href="/process-env-undefined" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">Fix process.env Undefined</p>
                <p className="text-sm text-gray-600 mt-1">All fixes for env variable issues in Node.js</p>
              </Link>
              <Link href="/har-to-curl" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">HAR to cURL</p>
                <p className="text-sm text-gray-600 mt-1">Debug API requests from browser exports</p>
              </Link>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
