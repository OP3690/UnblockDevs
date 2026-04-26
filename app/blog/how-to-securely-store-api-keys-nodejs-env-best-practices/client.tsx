'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Settings, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap, FileText, Key, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function HowToSecurelyStoreApiKeysNodejsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Securely Store API Keys in Node.js (The Right Way with process.env)</h1>
              <p className="text-sm text-gray-500 mt-1">Stop hardcoding secrets — the complete guide to API key security in Node.js and Next.js (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="How to Securely Store API Keys in Node.js (The Right Way with process.env)"
        description="Stop hardcoding API keys. Learn the secure way to store secrets in Node.js using .env files, environment variables, secret managers, and what never to do."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'How do I store API keys securely in Node.js?',
              answer: 'Store API keys in environment variables using a .env file with the dotenv package. Never hardcode keys in source code. Add .env to your .gitignore file. Validate that required secrets exist at startup. In production, use platform environment variable settings (Vercel dashboard, Railway variables, AWS Secrets Manager) rather than .env files.',
            },
            {
              question: 'Is it safe to put API keys in .env files?',
              answer: 'Yes, .env files are safe for local development IF you add .env to .gitignore immediately. The .env file is never committed to source control. However, .env files are plain text — they are not encrypted. Anyone with filesystem access to your machine can read them. For production, prefer platform-level environment variables or a secrets manager like AWS Secrets Manager or HashiCorp Vault.',
            },
            {
              question: 'What happens if I commit my API keys to GitHub?',
              answer: 'Committing API keys to GitHub is a serious security incident. Bots scan GitHub for leaked secrets within seconds of a commit. Your key can be used to rack up large charges (OpenAI, AWS), exfiltrate data, or send spam. Removing the key from code does NOT help — it remains in git history. You must immediately revoke the key, generate a new one, and optionally rewrite git history using git filter-repo.',
            },
            {
              question: 'How do I store API keys in production (Vercel, AWS)?',
              answer: 'In Vercel, go to Project Settings > Environment Variables and add your secrets there. They are injected as environment variables at build/runtime. On AWS, use AWS Secrets Manager or Parameter Store and fetch secrets in your application code using the AWS SDK. On Railway or Render, use the Variables tab in your project dashboard. Never ship a .env file to production.',
            },
            {
              question: 'What is the NEXT_PUBLIC_ security risk for API keys?',
              answer: 'Any Next.js environment variable prefixed with NEXT_PUBLIC_ is embedded into the client-side JavaScript bundle at build time. This means it is visible to every user who opens your site in DevTools. Never prefix secret API keys (Stripe secret key, OpenAI key, database passwords) with NEXT_PUBLIC_. Only use NEXT_PUBLIC_ for genuinely public values like your analytics site ID or public Stripe publishable key.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What API Key Security Means</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              An <strong>API key</strong> is a secret credential that authenticates your application to a third-party service — Stripe, OpenAI, Twilio, Google Maps, AWS, and thousands of others. API key security means ensuring that these credentials are <strong>never hardcoded</strong> in source files, <strong>never committed</strong> to version control, and <strong>never logged</strong> to standard output where they can be scraped.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The three cardinal rules of API key security:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <EyeOff className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 mb-1">Never hardcode</h3>
                <p className="text-sm text-gray-600">No keys in .js, .ts, .py, or any source file</p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                <Lock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 mb-1">Never commit</h3>
                <p className="text-sm text-gray-600">No keys in git history — ever</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <Eye className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 mb-1">Never log</h3>
                <p className="text-sm text-gray-600">No keys in console.log or error messages</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Secrets belong in environment variables — not in code. The application reads secrets from the environment at runtime, keeping them completely out of your repository.
              </p>
            </div>
          </section>

          {/* What: The Attack Surface */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: The Attack Surface — Where Keys Leak</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              API keys do not only leak through obvious mistakes. Understand every surface where secrets can escape your control:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Git History (most common)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Even if you delete a secret from a file and commit again, the original value remains in git history permanently. <code className="bg-gray-200 px-1 rounded">git log -p</code> will reveal it. GitHub, GitLab, and Bitbucket store the full history, including secrets from commits that happened years ago. Bots run by threat actors scan every public repo continuously.
                </p>
                <div className="bg-gray-900 text-red-300 p-3 rounded-lg overflow-x-auto text-xs">
                  <pre><code>{`# A bot runs this on your repo within 60 seconds of your push:
git log --all -p | grep -E "(sk-|AIza|AKIA|stripe_secret|_KEY=)"
# Your key is now in their database.`}</code></pre>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Application Logs
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Logging frameworks, request loggers, and error trackers (Sentry, Datadog) can capture environment variables or request headers that include Bearer tokens. Even <code className="bg-gray-200 px-1 rounded">console.log(process.env)</code> will dump ALL environment variables including secrets to stdout.
                </p>
                <div className="bg-gray-900 text-orange-300 p-3 rounded-lg overflow-x-auto text-xs">
                  <pre><code>{`// DANGEROUS — logs entire environment including secrets
console.log('Config:', process.env);

// ALSO DANGEROUS — request headers may include Authorization: Bearer sk-...
app.use(morgan('combined')); // logs all headers`}</code></pre>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Client-Side JavaScript Bundles (Next.js NEXT_PUBLIC_)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  In Next.js, any variable prefixed <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_</code> is statically inlined into the JavaScript bundle served to browsers. Anyone can open DevTools and find it. This is the most underestimated leak vector for Next.js developers.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Docker Image Layers
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  If you copy a .env file into a Docker image layer, the secrets persist even if you delete the file in a later layer. Docker images pushed to public registries (Docker Hub) expose every layer — including deleted files — to anyone who pulls the image.
                </p>
                <div className="bg-gray-900 text-purple-300 p-3 rounded-lg overflow-x-auto text-xs">
                  <pre><code>{`# DANGEROUS Dockerfile — secrets baked into layer 2
COPY .env .
RUN npm run build
RUN rm .env  # Too late! .env is still in layer 2`}</code></pre>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Warning:</strong> The attack surface is larger than most developers assume. Git history, logs, client bundles, and Docker layers are all places where secrets have been found in the wild. Treat all of them as potential leak points.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Every Time You Use These Secret Types</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The secure storage rules apply to every credential that grants access to a paid service, a database, or private data:
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Payment API keys', example: 'Stripe secret key (sk_live_...)', color: 'blue' },
                { label: 'AI model API keys', example: 'OpenAI (sk-proj-...), Anthropic (sk-ant-...)', color: 'green' },
                { label: 'Database connection strings', example: 'postgresql://user:pass@host/db', color: 'purple' },
                { label: 'OAuth client secrets', example: 'Google, GitHub, Discord client secrets', color: 'orange' },
                { label: 'JWT signing secrets', example: 'JWT_SECRET used to sign tokens', color: 'red' },
                { label: 'Cloud credentials', example: 'AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY', color: 'yellow' },
                { label: 'SMS / Email API keys', example: 'Twilio auth token, SendGrid API key', color: 'pink' },
                { label: 'Webhook secrets', example: 'Stripe webhook signing secret', color: 'indigo' },
              ].map((item) => (
                <div key={item.label} className={`flex items-start gap-3 p-3 bg-${item.color}-50 rounded-lg border border-${item.color}-200`}>
                  <Key className={`w-4 h-4 text-${item.color}-600 mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs font-mono">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Rule of thumb:</strong> If rotating the value would break your application, it is a secret that must be stored in an environment variable — not in code.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: 6 Methods to Secure API Keys in Node.js</h2>
            </div>

            {/* Method 1 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Local Development: .env File + dotenv + .gitignore
              </h3>
              <p className="text-gray-700 mb-4">
                Three files work together to load secrets locally without committing them. This is the foundation of all Node.js secret management.
              </p>

              <p className="font-semibold text-gray-900 mb-2">Step 1 — Install dotenv:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`npm install dotenv`}</code></pre>
              </div>

              <p className="font-semibold text-gray-900 mb-2">Step 2 — Create <code className="bg-gray-200 px-1 rounded text-sm">.env</code> (never commit this file):</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env — local secrets only, never commit
STRIPE_SECRET_KEY=sk-test-YOUR_KEY
OPENAI_API_KEY=sk-proj-abc123...
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/myapp
JWT_SECRET=super-secret-jwt-signing-key-at-least-32-chars
WEBHOOK_SECRET=whsec_abc123...`}</code></pre>
              </div>

              <p className="font-semibold text-gray-900 mb-2">Step 3 — Add .env to <code className="bg-gray-200 px-1 rounded text-sm">.gitignore</code>:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .gitignore
.env
.env.local
.env.*.local
.env.production

# DO commit this — it documents required variables without values
# .env.example is safe to commit
`}</code></pre>
              </div>

              <p className="font-semibold text-gray-900 mb-2">Step 4 — Create <code className="bg-gray-200 px-1 rounded text-sm">.env.example</code> (commit this — no real values):</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env.example — safe to commit, documents required variables
STRIPE_SECRET_KEY=sk-test-YOUR_KEY_HERE
OPENAI_API_KEY=sk-proj-your_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=at-least-32-characters-random-string
WEBHOOK_SECRET=whsec_your_webhook_secret`}</code></pre>
              </div>

              <p className="font-semibold text-gray-900 mb-2">Step 5 — Load dotenv at the very start of your application:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// server.js or app.js — first line in the file
require('dotenv').config(); // Must be before any other imports that use process.env

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // reads from process.env
});

const app = express();
// ...`}</code></pre>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-2">
                <p className="text-green-800 text-sm">
                  <strong>For Next.js:</strong> Next.js auto-loads <code>.env.local</code> without needing dotenv. Create <code>.env.local</code> and add it to <code>.gitignore</code>. Variables without <code>NEXT_PUBLIC_</code> prefix are server-only.
                </p>
              </div>
            </div>

            {/* Method 2 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Validate Required Secrets at Startup
              </h3>
              <p className="text-gray-700 mb-4">
                Fail fast at startup if a required secret is missing. This prevents cryptic runtime errors hours later when a feature tries to use the missing key.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// config/secrets.js — validate and export secrets
require('dotenv').config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      \`Missing required environment variable: \${name}\\n\` +
      \`Copy .env.example to .env and fill in the values.\`
    );
  }
  return value;
}

module.exports = {
  stripeSecretKey: requireEnv('STRIPE_SECRET_KEY'),
  openaiApiKey: requireEnv('OPENAI_API_KEY'),
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  // Optional with default
  port: process.env.PORT || '3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};`}</code></pre>
              </div>

              <p className="text-gray-700 mb-4">Then import from this module instead of accessing <code className="bg-gray-200 px-1 rounded">process.env</code> directly throughout your codebase:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// routes/payments.js
const { stripeSecretKey } = require('../config/secrets');
const stripe = require('stripe')(stripeSecretKey);

// If STRIPE_SECRET_KEY is missing, the app crashes at startup
// with a clear error message — not when the first payment is attempted`}</code></pre>
              </div>

              <p className="text-gray-700 mb-4">For TypeScript and Next.js, use Zod for type-safe validation:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

// This throws at build time / server start if validation fails
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables — see above for details');
}

export const env = parsed.data;

// Usage:
// import { env } from '@/lib/env';
// const stripe = new Stripe(env.STRIPE_SECRET_KEY);`}</code></pre>
              </div>
            </div>

            {/* Method 3 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                The NEXT_PUBLIC_ Trap — Bad vs Good Pattern
              </h3>
              <p className="text-gray-700 mb-4">
                This is the most common mistake Next.js developers make. The <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_</code> prefix instructs Next.js to embed the variable value into the client-side JavaScript bundle at build time. It becomes visible in DevTools to every visitor.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-700">WRONG — Key exposed to browser</span>
                  </div>
                  <div className="bg-gray-900 text-red-300 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm"><code>{`# .env.local — DANGEROUS
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_abc123
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-abc123
NEXT_PUBLIC_DATABASE_URL=postgresql://...

// pages/index.tsx — DANGEROUS
// This key ships in the JavaScript bundle!
const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!
);`}</code></pre>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700">CORRECT — Key stays server-side</span>
                  </div>
                  <div className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm"><code>{`# .env.local — SAFE
STRIPE_SECRET_KEY=sk_live_abc123
OPENAI_API_KEY=sk-proj-abc123
DATABASE_URL=postgresql://...

# Only publishable/public keys use NEXT_PUBLIC_
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_abc123

// app/api/charge/route.ts — server-side only
export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // Key never reaches the browser
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                <p className="text-red-800 text-sm">
                  <strong>Easy check:</strong> Open your production site, open DevTools, go to Sources, and search for your API key prefix (<code>sk_live</code>, <code>sk-proj</code>). If you find it in a .js bundle, your NEXT_PUBLIC_ prefix is leaking a secret. Revoke the key immediately.
                </p>
              </div>

              <p className="text-gray-700 mb-2">The table below clarifies what belongs where:</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200">Variable</th>
                      <th className="text-left p-3 border border-gray-200">Prefix needed?</th>
                      <th className="text-left p-3 border border-gray-200">Visible in browser?</th>
                      <th className="text-left p-3 border border-gray-200">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-red-50">
                      <td className="p-3 border border-gray-200 font-medium">Secret API key</td>
                      <td className="p-3 border border-gray-200 text-red-700 font-bold">No prefix</td>
                      <td className="p-3 border border-gray-200 text-red-700">No (server only)</td>
                      <td className="p-3 border border-gray-200 font-mono text-xs">STRIPE_SECRET_KEY</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-3 border border-gray-200 font-medium">Publishable / public key</td>
                      <td className="p-3 border border-gray-200 text-green-700 font-bold">NEXT_PUBLIC_</td>
                      <td className="p-3 border border-gray-200 text-green-700">Yes (intentional)</td>
                      <td className="p-3 border border-gray-200 font-mono text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-3 border border-gray-200 font-medium">Analytics site ID</td>
                      <td className="p-3 border border-gray-200 text-green-700 font-bold">NEXT_PUBLIC_</td>
                      <td className="p-3 border border-gray-200 text-green-700">Yes (intentional)</td>
                      <td className="p-3 border border-gray-200 font-mono text-xs">NEXT_PUBLIC_GA_MEASUREMENT_ID</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="p-3 border border-gray-200 font-medium">Database URL</td>
                      <td className="p-3 border border-gray-200 text-red-700 font-bold">No prefix</td>
                      <td className="p-3 border border-gray-200 text-red-700">No (server only)</td>
                      <td className="p-3 border border-gray-200 font-mono text-xs">DATABASE_URL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Method 4 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Production: Platform Env Vars and Secrets Managers
              </h3>
              <p className="text-gray-700 mb-4">
                In production, never deploy a <code className="bg-gray-200 px-1 rounded">.env</code> file. Instead, use platform-level environment variable management:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Vercel</h4>
                  <p className="text-gray-700 text-sm mb-2">Project Settings &gt; Environment Variables. Supports per-environment values (Production / Preview / Development). Variables are encrypted at rest and injected at build time and runtime.</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs"><code>{`# Via Vercel CLI
vercel env add STRIPE_SECRET_KEY production
vercel env add OPENAI_API_KEY production

# Or pull all remote env vars to local .env.local (for debugging):
vercel env pull .env.local`}</code></pre>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Railway / Render / Fly.io</h4>
                  <p className="text-gray-700 text-sm mb-2">Each platform has a Variables / Environment tab in the project dashboard. Set variables there — they are injected as environment variables into your running container.</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs"><code>{`# Railway CLI
railway variables set STRIPE_SECRET_KEY=sk_live_abc123
railway variables set DATABASE_URL=postgresql://...

# Render — set via dashboard or render.yaml
envVarGroups:
  - name: production-secrets
    envVars:
      - key: STRIPE_SECRET_KEY
        sync: false  # marks it as a secret in the UI`}</code></pre>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">AWS Secrets Manager (enterprise-grade)</h4>
                  <p className="text-gray-700 text-sm mb-2">For production applications that need audit logging, automatic rotation, and fine-grained IAM access control. Fetch secrets at runtime using the AWS SDK.</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs"><code>{`import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecret(secretName: string): Promise<string> {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return response.SecretString!;
}

// At startup — fetch secrets once, cache them
const stripeKey = await getSecret('prod/myapp/stripe-secret-key');
const stripe = new Stripe(stripeKey);`}</code></pre>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">HashiCorp Vault (self-hosted / enterprise)</h4>
                  <p className="text-gray-700 text-sm mb-2">For teams that need on-premise secret management with dynamic secrets, lease-based access, and full audit trails.</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs"><code>{`import vault from 'node-vault';

const client = vault({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

const { data } = await client.read('secret/data/myapp/production');
const stripeKey = data.data.STRIPE_SECRET_KEY;`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 5 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Rotating Keys Without Downtime (Dual-Key Approach)
              </h3>
              <p className="text-gray-700 mb-4">
                Key rotation is the process of replacing an old API key with a new one. The naive approach causes downtime — you deploy the new key, the old one stops working instantly. The dual-key approach eliminates downtime:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Phase 1: Add the NEW key alongside the OLD key in environment variables
// .env / platform env vars:
// STRIPE_SECRET_KEY=sk_live_OLD_KEY
// STRIPE_SECRET_KEY_NEW=sk_live_NEW_KEY

// In your code, support both during transition:
function getStripeClient() {
  // Try new key first, fall back to old key
  const key = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY;
  return new Stripe(key!);
}

// Phase 2: Deploy. Both keys are valid. Verify new key works in production.

// Phase 3: Remove STRIPE_SECRET_KEY_OLD from env vars.
// Set STRIPE_SECRET_KEY=sk_live_NEW_KEY
// Remove STRIPE_SECRET_KEY_NEW

// Phase 4: Deploy again. Rotation complete, zero downtime.`}</code></pre>
              </div>

              <p className="text-gray-700 mb-4">For webhook secrets, Stripe supports multiple endpoints simultaneously. During rotation:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Support multiple webhook secrets during rotation
const webhookSecrets = [
  process.env.STRIPE_WEBHOOK_SECRET_NEW,
  process.env.STRIPE_WEBHOOK_SECRET_OLD,
].filter(Boolean) as string[];

function verifyWebhook(payload: Buffer, signature: string) {
  for (const secret of webhookSecrets) {
    try {
      return stripe.webhooks.constructEvent(payload, signature, secret);
    } catch {
      // Try next secret
    }
  }
  throw new Error('Webhook signature verification failed');
}`}</code></pre>
              </div>
            </div>

            {/* Method 6 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                Scanning for Leaked Keys: git-secrets, TruffleHog, GitHub Secret Scanning
              </h3>
              <p className="text-gray-700 mb-4">
                Add automated scanning to catch leaked secrets before they reach remote repositories:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Install git-secrets (prevents committing secrets)
brew install git-secrets  # macOS
git secrets --install     # installs pre-commit hook
git secrets --register-aws  # adds AWS key patterns

# Add custom patterns for your keys:
git secrets --add 'sk_live_[a-zA-Z0-9]+'        # Stripe live keys
git secrets --add 'sk-proj-[a-zA-Z0-9]+'        # OpenAI keys
git secrets --add 'sk-ant-[a-zA-Z0-9-]+'        # Anthropic keys

# Now any commit containing these patterns will be blocked`}</code></pre>
              </div>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# TruffleHog — scan git history for secrets that already leaked
pip install trufflehog
trufflehog git file://. --only-verified

# Or scan a remote repo:
trufflehog github --repo=https://github.com/yourorg/yourrepo

# GitHub Secret Scanning
# Enabled automatically for public repos
# Enable for private repos: Settings > Code security > Secret scanning
# GitHub will alert you when a known secret pattern is detected in pushes`}</code></pre>
              </div>

              <p className="text-gray-700 mb-4">Add a pre-commit hook using Husky to run secret scanning on every commit:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Install Husky
npm install --save-dev husky
npx husky init

# .husky/pre-commit
#!/bin/sh
# Run git-secrets check before every commit
git secrets --scan || exit 1

# Also useful: detect-secrets (Python)
pip install detect-secrets
detect-secrets scan > .secrets.baseline
# Add to pre-commit: detect-secrets-hook --baseline .secrets.baseline`}</code></pre>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Complete Checklist:</strong> (1) Install dotenv and create .env, (2) Add .env to .gitignore immediately, (3) Create .env.example with no real values, (4) Validate required secrets at startup, (5) Never use NEXT_PUBLIC_ for secret keys, (6) Use platform env vars in production, (7) Install git-secrets as a pre-commit hook.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Real API Key Leak Consequences</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              API key leaks are not theoretical. Here are documented patterns of what happens after a key is exposed:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  OpenAI Key Leak
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  A leaked OpenAI API key is immediately scraped by bots that continuously monitor GitHub. The key is then used to submit thousands of API requests (GPT-4 completions, DALL-E image generation) at your expense. Developers have reported waking up to $1,000–$10,000 in unexpected OpenAI charges after a single leaked key. OpenAI offers limited refunds for provable leaks.
                </p>
                <div className="bg-red-100 p-2 rounded text-xs text-red-800 font-mono">
                  Time from leak to first abuse: typically under 60 seconds on public GitHub
                </div>
              </div>

              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Stripe Secret Key Leak
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  A leaked Stripe secret key (<code>sk_live_</code>) allows an attacker to create PaymentIntents, issue refunds to their own bank account, view all customer data (names, emails, last 4 digits), and create new products. This is both a financial loss and a GDPR/PCI-DSS breach that must be reported to regulators.
                </p>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  AWS Access Key Leak
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Leaked AWS credentials can spin up hundreds of GPU instances for cryptocurrency mining within minutes. AWS bills can reach $50,000–$100,000 before detection. AWS will often work with affected customers but does not guarantee a refund. The attacker may also exfiltrate data from S3 buckets, RDS databases, or other services.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Emergency response if you leak a key:</strong> (1) Immediately revoke the exposed key in the provider's dashboard, (2) Generate a new key and deploy it, (3) Check your provider's usage dashboard for unauthorized charges, (4) Review access logs for what was accessed, (5) File a support ticket with the provider explaining the leak, (6) If it was in git history, use <code>git filter-repo --invert-paths --path-glob='*.env'</code> and force-push (coordinate with your team).
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I store API keys securely in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">Use a .env file with the dotenv package for local development. Create a .env file with your secrets, add .env to .gitignore, and load it with <code className="bg-gray-100 px-1 rounded">require('dotenv').config()</code> at the very start of your application. Access secrets via <code className="bg-gray-100 px-1 rounded">process.env.YOUR_KEY_NAME</code>. In production, set environment variables through your hosting platform's dashboard — never deploy a .env file.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it safe to put API keys in .env files?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, for local development, IF you add .env to .gitignore immediately. The .env file must never be committed to version control. Note that .env files are plain text — anyone with access to your filesystem can read them. For production environments, use your hosting platform's encrypted environment variable storage (Vercel dashboard, Railway variables, AWS Secrets Manager) instead of .env files.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I commit my API keys to GitHub?</h3>
                <p className="text-gray-700 leading-relaxed">Automated bots scan GitHub for leaked secrets within seconds of a push. Your key will likely be abused within minutes. Deleting the key from your code and committing again does NOT help — it remains in git history. You must: (1) Immediately revoke the key in the provider dashboard, (2) Generate a new key and redeploy, (3) Check for unauthorized usage, (4) Optionally use git filter-repo to purge history, (5) Force push. Assume the key is compromised the moment it appears in any commit.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I store API keys in production (Vercel, AWS)?</h3>
                <p className="text-gray-700 leading-relaxed">On Vercel: Project Settings &gt; Environment Variables. Add keys per-environment (Production/Preview/Development). On AWS: use AWS Secrets Manager for sensitive secrets, or Parameter Store for less sensitive configuration. Fetch secrets at runtime with the AWS SDK. On Railway or Render: use the Variables tab in your project dashboard. On any platform: never ship a .env file — always use the platform's native secret management.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the NEXT_PUBLIC_ security risk for API keys?</h3>
                <p className="text-gray-700 leading-relaxed">Variables prefixed with <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_</code> are statically embedded into the browser JavaScript bundle at build time. Every visitor to your site can see them by opening DevTools &gt; Sources. Only use <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_</code> for genuinely public values (Stripe publishable key, Google Analytics measurement ID). All secret keys (Stripe secret key, OpenAI key, database passwords, JWT secrets) must have NO prefix and must only be accessed in server-side code (API routes, Server Components, getServerSideProps).</p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides &amp; Tools</h2>
            <p className="text-gray-700 mb-4">Continue learning about Node.js security and configuration:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/process-env-vs-dotenv-vs-config-files-nodejs-which-to-use" className="text-primary-600 hover:underline">process.env vs dotenv vs config files</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">Fix process.env undefined in Node.js</Link>
              <Link href="/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use" className="text-primary-600 hover:underline">Fix EADDRINUSE port error in Node.js</Link>
              <Link href="/blog/process-env-undefined-docker-nodejs-fix" className="text-primary-600 hover:underline">Fix process.env Undefined in Docker</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
            </div>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare
            title="How to Securely Store API Keys in Node.js (The Right Way with process.env)"
            description="Stop hardcoding API keys. Learn the secure way to store secrets in Node.js using .env files, environment variables, secret managers, and what never to do."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>

        <section className="mt-12">
          <FeedbackForm toolName="How to Securely Store API Keys in Node.js Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
