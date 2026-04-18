'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Code, AlertTriangle, Settings, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap, Key, Shield, Server, Eye, EyeOff } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function HowToUseEnvFilesInNextjsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Use .env Files in Next.js (NEXT_PUBLIC_ and Server Variables Explained)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Environment Variables in Next.js (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="How to Use .env Files in Next.js (NEXT_PUBLIC_ and Server Variables Explained)"
        description="Complete guide to .env files in Next.js — NEXT_PUBLIC_ prefix, .env.local, .env.production, server vs client env vars."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is NEXT_PUBLIC_ prefix in Next.js?',
              answer: 'NEXT_PUBLIC_ is a naming convention in Next.js that marks an environment variable as safe to expose to the browser. During the build step, Next.js inlines the value of any variable prefixed with NEXT_PUBLIC_ directly into the JavaScript bundle. Variables without this prefix are only available on the server and are never included in client-side code.',
            },
            {
              question: 'Why is my NEXT_PUBLIC_ variable undefined?',
              answer: 'The most common causes are: (1) you added or changed the variable after starting the dev server — restart it. (2) The variable is not prefixed with NEXT_PUBLIC_ but you are trying to read it in a client component. (3) The .env file is in the wrong directory — it must be in the project root alongside package.json. (4) You forgot to redeploy after adding the variable to your hosting provider environment settings.',
            },
            {
              question: 'What is the difference between .env and .env.local?',
              answer: '.env is committed to version control and holds non-secret defaults shared across all environments. .env.local is gitignored by default and is meant for secrets and machine-specific overrides. .env.local always takes priority over .env. Never commit .env.local to your repository.',
            },
            {
              question: 'Can I use process.env in client components Next.js?',
              answer: 'Yes, but only for variables prefixed with NEXT_PUBLIC_. Next.js replaces NEXT_PUBLIC_* references with their literal string values at build time. Server-only variables (no prefix) are stripped out and will be undefined in client components. Accessing them client-side will not throw — it silently returns undefined, which can cause hard-to-debug runtime errors.',
            },
            {
              question: 'How do I add TypeScript types to process.env in Next.js?',
              answer: 'Create a file such as types/env.d.ts and declare a global namespace: declare global { namespace NodeJS { interface ProcessEnv { NEXT_PUBLIC_SITE_URL: string; DATABASE_URL: string; } } }. This gives you full autocomplete and type safety without any runtime overhead. Make sure the file is included in your tsconfig.json include array.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Are .env Files in Next.js?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>.env files</strong> are plain-text configuration files that store key-value pairs for your application&apos;s runtime settings — API keys, database URLs, feature flags, and service endpoints. Next.js has built-in support for loading these files automatically, with no third-party package required.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Next.js reads .env files at <strong>build time</strong> and makes the values available via <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">process.env</code>. However, not all variables reach the browser — only those explicitly marked with the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">NEXT_PUBLIC_</code> prefix are bundled into client-side JavaScript. This is a deliberate security boundary.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key insight:</strong> Next.js statically inlines NEXT_PUBLIC_ values at build time, which means you must rebuild your app whenever these values change. Server-only variables (no prefix) are read at runtime and can be updated without a rebuild.
              </p>
            </div>
          </section>

          {/* What: File hierarchy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: The .env File Hierarchy — All Variants</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Next.js loads multiple .env files and merges them with a defined priority order. Understanding this hierarchy prevents unexpected overrides and missing variables.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-gray-100">
                    <th className="text-left px-4 py-3 font-semibold">File</th>
                    <th className="text-left px-4 py-3 font-semibold">Committed?</th>
                    <th className="text-left px-4 py-3 font-semibold">Loaded in Dev?</th>
                    <th className="text-left px-4 py-3 font-semibold">Loaded in Prod?</th>
                    <th className="text-left px-4 py-3 font-semibold">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.local</td>
                    <td className="px-4 py-3 text-red-600">No (gitignored)</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 font-bold">Highest</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.development.local</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3">High</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.production.local</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3">High</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.development</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3">Medium</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.production</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3">Medium</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.test</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                    <td className="px-4 py-3">Medium (test only)</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3 text-green-600">Yes</td>
                    <td className="px-4 py-3">Lowest (base defaults)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="flex items-start gap-2 text-amber-800 text-sm">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>.env.local is not loaded during tests.</strong> Jest and other test runners use <code className="font-mono">NODE_ENV=test</code>, which intentionally skips .env.local to ensure reproducible test environments. Use .env.test for test-specific variables.</span>
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">NEXT_PUBLIC_ vs Server-Only Variables</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">NEXT_PUBLIC_ (Client + Server)</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Inlined into browser bundle at build time</li>
                  <li>• Accessible in Client Components</li>
                  <li>• Visible in browser DevTools / source maps</li>
                  <li>• Use for: site URL, analytics IDs, public API endpoints</li>
                </ul>
              </div>
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <EyeOff className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">No prefix (Server Only)</span>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Never included in browser bundle</li>
                  <li>• Only in Server Components, API routes, middleware</li>
                  <li>• Returns undefined in Client Components — silently</li>
                  <li>• Use for: DB URLs, secret API keys, auth secrets</li>
                </ul>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When Are .env Files Loaded?</h2>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Development (<code className="font-mono text-sm">next dev</code>)</h3>
                  <p className="text-gray-700 text-sm">.env files are loaded at server startup. Changes to .env files require a server restart — hot reload does NOT pick up new variables. If NEXT_PUBLIC_ vars change, restart the dev server.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Build (<code className="font-mono text-sm">next build</code>)</h3>
                  <p className="text-gray-700 text-sm">NEXT_PUBLIC_ variables are read and statically replaced at build time. The built output contains literal string values — changing a NEXT_PUBLIC_ variable on Vercel requires a full redeploy.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Production runtime (<code className="font-mono text-sm">next start</code>)</h3>
                  <p className="text-gray-700 text-sm">Server-side variables (no prefix) are read at runtime from the hosting environment. These can be updated without rebuilding — just restart the server process.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Hosting platforms (Vercel, Railway, Render):</strong> Always set environment variables in the hosting dashboard — not in committed .env files. Dashboard vars override all .env files and are injected securely into build and runtime environments.
              </p>
            </div>
          </section>

          {/* How To */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Use .env Files in Next.js — Step by Step</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Create .env.local</h3>
              <p className="text-gray-700 mb-3">Create <code className="bg-gray-100 px-1 rounded text-sm font-mono">.env.local</code> in your project root (same level as <code className="bg-gray-100 px-1 rounded text-sm font-mono">package.json</code>):</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`# .env.local — NEVER commit this file to git

# Client-side variable (safe to expose — inlined at build time)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX

# Server-only variables (never exposed to browser)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
STRIPE_SECRET_KEY=sk-test-YOUR_KEY_HERE
AUTH_SECRET=your-super-secret-jwt-signing-key-at-least-32-chars`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Use NEXT_PUBLIC_ in a Client Component</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// app/components/Footer.tsx
'use client'

export function Footer() {
  // Works — NEXT_PUBLIC_ is inlined at build time
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <footer>
      <a href={siteUrl}>Home</a>
      <p>Analytics ID: {process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
    </footer>
  )
}`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Use server-only variables in Server Components and API routes</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// app/dashboard/page.tsx — Server Component (no 'use client')
import { db } from '@/lib/db'

export default async function DashboardPage() {
  // DATABASE_URL is only available server-side — never reaches browser
  const users = await db.query('SELECT * FROM users LIMIT 10')
  return <main><h1>Dashboard</h1><p>{users.length} users</p></main>
}

// app/api/charge/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  const { amount } = await req.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  })
  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4: Add TypeScript types for process.env</h3>
              <p className="text-gray-700 mb-3">Create <code className="bg-gray-100 px-1 rounded text-sm font-mono">types/env.d.ts</code> for full autocomplete and typo detection:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Public (client + server)
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_ANALYTICS_ID: string

      // Server only
      DATABASE_URL: string
      STRIPE_SECRET_KEY: string
      AUTH_SECRET: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

// Required to make this a module
export {}`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// tsconfig.json — ensure env.d.ts is included
{
  "include": ["next-env.d.ts", "types/**/*.d.ts", "**/*.ts", "**/*.tsx"]
}`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Common Mistake: Accessing Server Vars in Client Components</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-800 mb-2">This silently breaks — no error is thrown:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      <pre><code>{`'use client'

export function DatabaseStatus() {
  // BUG: DATABASE_URL has no NEXT_PUBLIC_ prefix
  // This will be undefined in the browser — silently!
  const dbUrl = process.env.DATABASE_URL

  return <p>DB: {dbUrl}</p>  // Renders: "DB: "
}`}</code></pre>
                    </div>
                    <p className="text-red-700 text-sm mt-2">
                      Fix: if you need a value from the server in a client component, pass it as a prop from a Server Component, or use a server action / API route.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Use .env.local for all local secrets (never commit it), .env for non-secret defaults (commit it), NEXT_PUBLIC_ only for values you intentionally expose to the browser, and your hosting dashboard for all production secrets.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why NEXT_PUBLIC_ Exists (Security Design)</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The NEXT_PUBLIC_ convention enforces a <strong>security boundary</strong> between your server secrets and the browser. Without this separation, a developer could accidentally expose a database password or secret API key to every visitor — something that has caused real-world data breaches.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By requiring an explicit opt-in prefix, Next.js makes the secure path the default. You cannot accidentally expose a secret — you have to deliberately add the <code className="bg-gray-100 px-1 rounded text-sm font-mono">NEXT_PUBLIC_</code> prefix.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <Key className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-800 text-sm">Never expose</p>
                <p className="text-gray-600 text-xs mt-1">DATABASE_URL, STRIPE_SECRET_KEY, AUTH_SECRET, private API keys, JWT signing secrets</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-800 text-sm">Safe to expose (NEXT_PUBLIC_)</p>
                <p className="text-gray-600 text-xs mt-1">Site URL, analytics IDs, Stripe publishable key, public feature flags</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <Server className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-800 text-sm">Server-side only</p>
                <p className="text-gray-600 text-xs mt-1">Anything talking to a database, payment processor, auth provider, or internal service</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is NEXT_PUBLIC_ prefix in Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">NEXT_PUBLIC_ marks an environment variable as safe to expose to the browser. During the build, Next.js inlines the value directly into the JavaScript bundle. Variables without this prefix are only available on the server and are never included in client-side code.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is my NEXT_PUBLIC_ variable undefined?</h3>
                <p className="text-gray-700 leading-relaxed">Most common causes: (1) you added the variable after starting the dev server — restart it. (2) The .env file is not in the project root. (3) You forgot to redeploy after adding the variable to Vercel/Railway. (4) The variable name has a typo.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between .env and .env.local?</h3>
                <p className="text-gray-700 leading-relaxed">.env is committed to git and holds non-secret defaults. .env.local is gitignored and meant for machine-specific secrets. .env.local always takes priority over .env. Never commit .env.local.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use process.env in client components Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, but only for NEXT_PUBLIC_ variables. Server-only variables return undefined in client components silently. Always use NEXT_PUBLIC_ for anything a Client Component needs.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I add TypeScript types to process.env in Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">Create types/env.d.ts with a NodeJS.ProcessEnv interface declaration. Include the file in your tsconfig.json. This gives full autocomplete and type safety for all env vars without runtime overhead.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides &amp; tools</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">Why process.env is undefined in Node.js</Link>
              <Link href="/blog/validate-environment-variables-nodejs-zod" className="text-primary-600 hover:underline">Validate env vars with Zod</Link>
              <Link href="/blog/manage-multiple-env-files-nodejs-development-staging-production" className="text-primary-600 hover:underline">Manage multiple .env files</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
            </div>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare
            title="How to Use .env Files in Next.js (NEXT_PUBLIC_ and Server Variables Explained)"
            description="Complete guide to .env files in Next.js — NEXT_PUBLIC_ prefix, .env.local, server vs client env vars."
            variant="full"
          />
        </section>
        <section className="mt-12"><NewsletterSignup /></section>
        <section className="mt-12"><FeedbackForm toolName="Next.js .env Files Guide" /></section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
