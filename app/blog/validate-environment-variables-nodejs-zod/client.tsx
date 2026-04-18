'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Code, AlertTriangle, Settings, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap, Key, FileText, Server } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ValidateEnvironmentVariablesNodejsZodClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Validate Environment Variables in Node.js with Zod (Crash Early, Not Later)</h1>
              <p className="text-sm text-gray-500 mt-1">Fail at startup, not 2 hours into a production incident (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="How to Validate Environment Variables in Node.js with Zod (Crash Early, Not Later)"
        description="Use Zod to validate process.env at startup with TypeScript types, defaults, and clear error messages."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'Why should I validate environment variables?',
              answer: 'Without validation, a missing or malformed environment variable causes a silent undefined — which propagates through your app and eventually crashes deep in a database call, payment handler, or auth flow. With validation at startup, your app refuses to start if any required variable is missing or invalid, giving you an immediate, clear error that lists exactly what is wrong. This is far easier to debug than a runtime crash in production.',
            },
            {
              question: 'How do I validate process.env with Zod?',
              answer: 'Create an env.ts file and use z.object() to define a schema for your environment variables. Call schema.safeParse(process.env) and export the result. On failure, Zod returns a ZodError with a detailed message listing every invalid field. Export a validated, typed env object and use it instead of process.env directly throughout your app.',
            },
            {
              question: 'What is t3-env for Next.js?',
              answer: 't3-env (@t3-oss/env-nextjs) is a library that wraps Zod to add Next.js-specific environment variable validation. It provides a createEnv() function that separates server and client variables, automatically handles the NEXT_PUBLIC_ prefix, and integrates with Next.js build process. It gives you runtime type safety, build-time validation, and tree-shaking of server vars from the client bundle.',
            },
            {
              question: 'How do I add default values to environment variables in Node.js?',
              answer: 'With Zod, chain .default() on any schema field: z.string().default("localhost") or z.coerce.number().default(3000). The default is applied when the variable is undefined (not set). For required variables with no sensible default, omit .default() so Zod throws if they are missing. Never silently default security-sensitive values like database URLs or API keys.',
            },
            {
              question: 'What happens if a required environment variable is missing?',
              answer: 'With Zod validation at startup, your Node.js process exits immediately with a descriptive error listing every missing and invalid variable. Without validation, the variable is silently undefined and your app starts normally — until the code path that uses the variable is hit, which could be seconds or hours later in production. The startup crash-early pattern is always preferable for required configuration.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: The Silent Crash Problem</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Every Node.js app depends on environment variables. When one is missing, <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">process.env</code> returns <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">undefined</code> silently — no error, no warning, no indication of what went wrong. The undefined propagates until it hits database connection code, a payment library, or a string operation — and crashes there, hours or days later.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">Without validation</span>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre><code>{`// App starts fine ✓
// 30 minutes later...

Error: getaddrinfo ENOTFOUND undefined
  at TCPConnectWrap.afterConnect

// OR:
TypeError: Cannot read properties
of undefined (reading 'split')

// OR: Stripe charges $0.00
// because PORT became NaN

// Which env var?
// Check 10 places, waste 2 hours`}</code></pre>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700">With Zod validation</span>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre><code>{`// App startup — fails immediately:

❌ Invalid environment variables:
  DATABASE_URL: Required
  STRIPE_SECRET_KEY: Required
  PORT: Expected number,
        received string "abc"

Fix these before starting the app.

// Exact problem. Exact location.
// Fixed in 2 minutes.`}</code></pre>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Fail-fast principle:</strong> Crash-early validation is a well-established engineering principle — fail at the boundary where bad data enters, not deep inside business logic where the root cause is invisible.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Tools for Environment Variable Validation</h2>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-gray-100">
                    <th className="text-left px-4 py-3 font-semibold">Library</th>
                    <th className="text-left px-4 py-3 font-semibold">TypeScript</th>
                    <th className="text-left px-4 py-3 font-semibold">Next.js support</th>
                    <th className="text-left px-4 py-3 font-semibold">Bundle size</th>
                    <th className="text-left px-4 py-3 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono font-bold text-green-700">zod</td>
                    <td className="px-4 py-3 text-green-600">Excellent</td>
                    <td className="px-4 py-3 text-green-600">Yes (manual)</td>
                    <td className="px-4 py-3">~14 kB</td>
                    <td className="px-4 py-3">General Node.js / Next.js</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">@t3-oss/env-nextjs</td>
                    <td className="px-4 py-3 text-green-600">Excellent</td>
                    <td className="px-4 py-3 text-green-600">Built-in</td>
                    <td className="px-4 py-3">~2 kB + zod</td>
                    <td className="px-4 py-3">Next.js apps (recommended)</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono">envalid</td>
                    <td className="px-4 py-3 text-yellow-600">Good</td>
                    <td className="px-4 py-3 text-yellow-600">Manual</td>
                    <td className="px-4 py-3">~8 kB</td>
                    <td className="px-4 py-3">Plain Node.js, simple setups</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono">joi</td>
                    <td className="px-4 py-3 text-yellow-600">Partial</td>
                    <td className="px-4 py-3 text-yellow-600">Manual</td>
                    <td className="px-4 py-3">~43 kB</td>
                    <td className="px-4 py-3">Legacy projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Run Validation at Startup — Before Everything Else</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Environment validation must run <strong>before any routes, handlers, or business logic execute</strong>. In Node.js / Express, this means at the top of your entry file. In Next.js, import your env.ts in <code className="bg-gray-100 px-1 rounded text-sm font-mono">next.config.ts</code> so validation runs at build time too.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="flex items-start gap-2 text-amber-800 text-sm">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Do not lazy-load env validation inside route handlers. If deferred, a missing variable will only be caught the first time that specific route is called — which might be hours after deployment.</span>
              </p>
            </div>
          </section>

          {/* How To */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Validate Env Vars with Zod — Step by Step</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Install Zod</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`npm install zod
# or: yarn add zod  |  pnpm add zod`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Create env.ts — your single source of truth</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// src/env.ts  (or lib/env.ts)
import { z } from 'zod'

const envSchema = z.object({
  // Number: coerce converts string "3000" → 3000
  PORT: z.coerce.number().int().positive().default(3000),

  // Enum: only allows specific values
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database — required, must be a valid URL
  DATABASE_URL: z.string().url(),

  // Auth secret — required, minimum 32 chars for security
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET must be at least 32 characters'),

  // Stripe — required for payments
  STRIPE_SECRET_KEY: z.string().min(1),

  // Optional: external service
  REDIS_URL: z.string().url().optional(),

  // Log level with default
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
})

// Parse and validate — exit on failure
const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  const formatted = parsed.error.format()

  for (const [key, value] of Object.entries(formatted)) {
    if (key === '_errors') continue
    const messages = (value as { _errors: string[] })._errors
    if (messages.length > 0) {
      console.error(\`  \${key}: \${messages.join(', ')}\`)
    }
  }

  process.exit(1)
}

// Export the validated, typed env object
export const env = parsed.data`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Use env instead of process.env everywhere</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// lib/db.ts
import { env } from '@/env'
import { Pool } from 'pg'

// env.DATABASE_URL is string — guaranteed, typed, autocompleted
export const db = new Pool({ connectionString: env.DATABASE_URL })

// server.ts
import { env } from '@/env'
import express from 'express'
const app = express()

// env.PORT is number — z.coerce.number() converted it from string
app.listen(env.PORT, () => console.log(\`Server running on port \${env.PORT}\`))

// lib/stripe.ts
import { env } from '@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})`}</code></pre>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>TypeScript benefit:</strong> Zod infers the type of <code className="font-mono">env</code> from your schema — <code className="font-mono">env.PORT</code> is typed as <code className="font-mono">number</code>, not <code className="font-mono">string | undefined</code>. Full autocomplete, zero manual type assertions.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4 (Next.js): Use t3-env for server/client separation</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`npm install @t3-oss/env-nextjs zod`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  // Server-side variables — never sent to the browser
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
    STRIPE_SECRET_KEY: z.string().min(1),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  // Client-side variables — must be NEXT_PUBLIC_
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },

  // Destructure from process.env so Next.js can statically analyze them
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },

  // Treat empty strings as undefined
  emptyStringAsUndefined: true,
})`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 5: Validate at build time too</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`// next.config.ts
import type { NextConfig } from 'next'

// Import triggers validation at build time
// Missing vars cause build failure BEFORE reaching production
import './src/env'

const nextConfig: NextConfig = {
  // ... your config
}

export default nextConfig`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Useful Zod Schema Patterns for Env Vars</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                <pre className="text-sm"><code>{`import { z } from 'zod'

const envSchema = z.object({
  // Number coercion — "3000" → 3000
  PORT: z.coerce.number().int().positive().default(3000),

  // Boolean coercion — "true" → true
  ENABLE_FEATURE: z.coerce.boolean().default(false),

  // Enum validation
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // URL validation — rejects malformed connection strings
  DATABASE_URL: z.string().url(),

  // Minimum length — enforce secret entropy
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // Transform: parse JSON from env var
  ALLOWED_ORIGINS: z
    .string()
    .default('[]')
    .transform((val) => JSON.parse(val) as string[]),

  // Regex: enforce format
  AWS_REGION: z
    .string()
    .regex(/^[a-z]{2}-[a-z]+-\d$/, 'Invalid AWS region')
    .optional(),
})`}</code></pre>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Create one env.ts file, import it everywhere instead of accessing process.env directly, run validation in next.config.ts for build-time checking, and use z.coerce.number() for PORT so the string from environment is automatically converted to a number.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: The Real Cost of Not Validating</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Actual errors seen without validation</span>
                </div>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• <code className="font-mono">getaddrinfo ENOTFOUND undefined</code></li>
                  <li>• <code className="font-mono">NaN is not a valid port</code></li>
                  <li>• <code className="font-mono">Cannot read properties of undefined</code></li>
                  <li>• Stripe charging $0 (amount coerced from undefined)</li>
                  <li>• Auth always failing (secret is empty string)</li>
                  <li>• Emails going to undefined@undefined</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">With Zod validation — startup output</span>
                </div>
                <div className="bg-green-100 rounded p-3 text-xs text-green-800 font-mono">
                  {`❌ Invalid environment variables:\n  DATABASE_URL: Required\n  AUTH_SECRET: String must\n    contain at least 32 chars\n\nFix these before starting.`}
                </div>
                <p className="text-green-700 text-sm mt-2">Exact problem. Exact location. Fixed in minutes.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why should I validate environment variables?</h3>
                <p className="text-gray-700 leading-relaxed">Without validation, missing env vars cause silent undefined values that crash deep in production code. With startup validation, your app refuses to start with a clear error listing every problem — far easier to debug than a cryptic runtime error hours later.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I validate process.env with Zod?</h3>
                <p className="text-gray-700 leading-relaxed">Create env.ts with z.object() schema. Call schema.safeParse(process.env). On failure, log every invalid field and call process.exit(1). Export the validated env object and use it throughout your app instead of process.env.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is t3-env for Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">@t3-oss/env-nextjs wraps Zod to add Next.js-specific env validation. It separates server and client variables, handles NEXT_PUBLIC_ prefix automatically, and integrates with the build process for build-time validation.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I add default values to environment variables in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">Chain .default() on any Zod schema field: z.string().default(&apos;localhost&apos;) or z.coerce.number().default(3000). The default applies when the variable is undefined. Never silently default security-sensitive values like database URLs or API keys.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if a required environment variable is missing?</h3>
                <p className="text-gray-700 leading-relaxed">With Zod, your process exits immediately with a descriptive error listing every missing and invalid variable. Without validation, your app starts normally and crashes later when the missing variable is accessed in business logic.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides &amp; tools</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">Why process.env is undefined in Node.js</Link>
              <Link href="/blog/how-to-use-env-files-in-nextjs-nextpublic-explained" className="text-primary-600 hover:underline">How to use .env files in Next.js</Link>
              <Link href="/blog/how-to-securely-store-api-keys-nodejs-env-best-practices" className="text-primary-600 hover:underline">Securely store API keys in Node.js</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
            </div>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare
            title="How to Validate Environment Variables in Node.js with Zod (Crash Early, Not Later)"
            description="Use Zod to validate process.env at startup with TypeScript types, defaults, and clear error messages."
            variant="full"
          />
        </section>
        <section className="mt-12"><NewsletterSignup /></section>
        <section className="mt-12"><FeedbackForm toolName="Zod Environment Variables Validation Guide" /></section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
