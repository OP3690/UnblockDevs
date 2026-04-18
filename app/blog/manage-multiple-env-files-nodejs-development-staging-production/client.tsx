'use client';

import Link from 'next/link';
import { ArrowLeft, Layers, Code, AlertTriangle, Settings, CheckCircle, HelpCircle, Clock, Globe, Zap, Key, FileText, Server, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ManageMultipleEnvFilesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Manage Multiple .env Files for Development, Staging, and Production in Node.js</h1>
              <p className="text-sm text-gray-500 mt-1">Stop using one .env for everything — here&apos;s the right way (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="How to Manage Multiple .env Files for Development, Staging, and Production in Node.js"
        description="Master .env.development, .env.staging, .env.production, and .env.local — switch environments and keep secrets safe."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is the difference between .env.local and .env in Next.js?',
              answer: '.env is committed to version control and contains non-secret defaults shared across all team members. .env.local is gitignored by default and holds machine-specific overrides and secrets. .env.local always takes the highest priority — its values override everything else. Never put secrets in .env since it is committed to git.',
            },
            {
              question: 'How do I use different .env files for development and production?',
              answer: 'In Node.js with dotenv, use: dotenv.config({ path: `.env.${process.env.NODE_ENV}` }). Set NODE_ENV=development locally and NODE_ENV=production on your server. In Next.js, the framework handles this automatically — .env.development loads in dev, .env.production loads in production. For cascading fallbacks, use the dotenv-flow package.',
            },
            {
              question: 'What is dotenv-flow?',
              answer: 'dotenv-flow is a dotenv extension that supports multiple environment-specific .env files with automatic cascading. It loads files in order: .env, then .env.local, then .env.{NODE_ENV}, then .env.{NODE_ENV}.local — each file overriding the previous. This mimics Next.js built-in behavior and is useful for plain Node.js apps.',
            },
            {
              question: 'Should I commit .env files to git?',
              answer: 'Only commit .env files that contain NO secrets — typically .env (with safe defaults), .env.development (with non-sensitive dev defaults), .env.example (documenting required variables). Never commit .env.local, .env.*.local, or any file containing real API keys, database passwords, or auth secrets. Add these patterns to .gitignore.',
            },
            {
              question: 'How do I set environment variables in GitHub Actions?',
              answer: 'Add secrets in GitHub repository Settings → Secrets and variables → Actions. Reference them in your workflow with ${{ secrets.MY_SECRET }}. For non-secret env vars, use the env key in workflow steps. For environment-specific values, use GitHub Environments with separate secrets per environment (dev, staging, production).',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: Why One .env Is Not Enough</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Real applications run in at least three environments: local development, staging (pre-production testing), and production. Each environment needs different configuration — different database URLs, different API keys, different log levels, different feature flags.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Using a single <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.env</code> file for everything means either hardcoding environment-specific values (breaking other environments) or manually swapping files before each deployment (error-prone and slow).
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="text-purple-800 text-sm">
                <strong>The goal:</strong> Each environment automatically loads the right configuration without manual intervention. Developers pull the repo and start working. CI/CD deploys without touching .env files. Production secrets never touch developer machines.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: The Standard .env File Hierarchy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Node.js ecosystem (and Next.js in particular) has converged on a standard set of .env file names that serve distinct purposes:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <code className="text-blue-700 font-mono">.env</code>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Commit to git</span>
                </h3>
                <p className="text-gray-700 text-sm">Base defaults for all environments. Contains non-sensitive, non-secret values that work as sensible defaults everywhere. Every developer gets these values automatically when they clone the repo. Example: <code className="bg-gray-100 px-1 rounded font-mono text-xs">LOG_LEVEL=info</code>, <code className="bg-gray-100 px-1 rounded font-mono text-xs">PORT=3000</code></p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <code className="text-blue-700 font-mono">.env.local</code>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">NEVER commit</span>
                </h3>
                <p className="text-gray-700 text-sm">Machine-specific overrides and secrets. Highest priority — overrides everything. Contains real API keys, local database credentials, personal config. Each developer has their own. Gitignored by default in Next.js projects. Example: <code className="bg-gray-100 px-1 rounded font-mono text-xs">DATABASE_URL=postgresql://localhost/mydb_dev</code></p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <code className="text-blue-700 font-mono">.env.development</code>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Can commit (no secrets)</span>
                </h3>
                <p className="text-gray-700 text-sm">Development-specific defaults. Only loaded when <code className="bg-gray-100 px-1 rounded font-mono text-xs">NODE_ENV=development</code>. Contains non-secret dev-mode config. Example: <code className="bg-gray-100 px-1 rounded font-mono text-xs">NEXT_PUBLIC_API_URL=http://localhost:4000</code>, <code className="bg-gray-100 px-1 rounded font-mono text-xs">DEBUG=true</code></p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <code className="text-blue-700 font-mono">.env.production</code>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Can commit (no secrets)</span>
                </h3>
                <p className="text-gray-700 text-sm">Production-specific non-secret defaults. Only loaded when <code className="bg-gray-100 px-1 rounded font-mono text-xs">NODE_ENV=production</code>. Real production secrets go in the hosting platform dashboard, NOT here. Example: <code className="bg-gray-100 px-1 rounded font-mono text-xs">NEXT_PUBLIC_API_URL=https://api.myapp.com</code></p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <code className="text-blue-700 font-mono">.env.example</code>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">Commit — document required vars</span>
                </h3>
                <p className="text-gray-700 text-sm">Documents all required environment variables with placeholder values and comments. Developers copy this to .env.local and fill in real values. This is the onboarding guide for your environment configuration. Always keep it up to date.</p>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Which File Loads in Which Environment</h2>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-gray-100">
                    <th className="text-left px-4 py-3 font-semibold">File</th>
                    <th className="text-left px-4 py-3 font-semibold">Local dev</th>
                    <th className="text-left px-4 py-3 font-semibold">CI/CD test</th>
                    <th className="text-left px-4 py-3 font-semibold">Staging</th>
                    <th className="text-left px-4 py-3 font-semibold">Production</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.local</td>
                    <td className="px-4 py-3 text-green-600">✓ (highest priority)</td>
                    <td className="px-4 py-3 text-red-600">✗ (test)</td>
                    <td className="px-4 py-3 text-red-600">Not present</td>
                    <td className="px-4 py-3 text-red-600">Not present</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.development</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.test</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-white">
                    <td className="px-4 py-3 font-mono text-blue-700">.env.production</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-yellow-600">✓ (if NODE_ENV=production)</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How To */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Set Up Multiple .env Files</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Method 1: Plain dotenv with NODE_ENV</h3>
              <p className="text-gray-700 mb-3">In a plain Node.js app, load the environment-specific file based on NODE_ENV:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// src/env.ts or server.ts — top of your entry file
import dotenv from 'dotenv'
import path from 'path'

// Load base defaults
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Load environment-specific overrides
// Values here override the base .env
dotenv.config({
  path: path.resolve(process.cwd(), \`.env.\${process.env.NODE_ENV}\`),
  override: true,
})

// Load local overrides (gitignored, highest priority)
dotenv.config({
  path: path.resolve(process.cwd(), \`.env.\${process.env.NODE_ENV}.local\`),
  override: true,
})
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
  override: true,
})`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Method 2: dotenv-flow (Automatic Cascading)</h3>
              <p className="text-gray-700 mb-3">Install dotenv-flow for automatic multi-file cascading:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`npm install dotenv-flow`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// server.ts
import 'dotenv-flow/config'
// That's it! Automatically loads in order:
// .env → .env.local → .env.{NODE_ENV} → .env.{NODE_ENV}.local
// Each file overrides the previous

// Start with NODE_ENV:
// NODE_ENV=development node server.ts
// NODE_ENV=production node server.ts
// NODE_ENV=test node server.ts`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Method 3: Next.js (Built-In — No Package Needed)</h3>
              <p className="text-gray-700 mb-3">Next.js handles multi-env loading automatically. Just create the files:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Project structure
myapp/
├── .env                    # Base defaults (commit)
├── .env.local              # Local secrets (gitignore)
├── .env.development        # Dev non-secrets (commit)
├── .env.production         # Prod non-secrets (commit)
├── .env.example            # Template (commit)
└── package.json

# .env (base — committed)
NEXT_PUBLIC_APP_NAME=MyApp
LOG_LEVEL=info
PORT=3000

# .env.development (committed — no secrets)
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENVIRONMENT=development
DEBUG=true

# .env.production (committed — no secrets)
NEXT_PUBLIC_API_URL=https://api.myapp.com
NEXT_PUBLIC_ENVIRONMENT=production
DEBUG=false

# .env.local (gitignored — real secrets)
DATABASE_URL=postgresql://localhost:5432/myapp_dev
STRIPE_SECRET_KEY=sk_test_xxxxx
AUTH_SECRET=my-dev-secret-at-least-32-chars-long`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Method 4: .env.example — Onboarding Template</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env.example — commit this, never .env.local!
# Copy this file to .env.local and fill in real values

# ── Required ──────────────────────────────────────────
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Auth secret (minimum 32 characters, generate with: openssl rand -base64 32)
AUTH_SECRET=

# Stripe
STRIPE_SECRET_KEY=sk_test_...

# ── Optional ──────────────────────────────────────────
# Redis (leave empty to disable caching)
REDIS_URL=

# Email provider
SMTP_HOST=localhost
SMTP_PORT=1025`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Method 5: GitHub Actions CI/CD</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # Uses production secrets

    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          # Secrets from GitHub repository Settings → Secrets
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          STRIPE_SECRET_KEY: \${{ secrets.STRIPE_SECRET_KEY }}
          AUTH_SECRET: \${{ secrets.AUTH_SECRET }}
          # Non-secret env vars inline
          NODE_ENV: production
          NEXT_PUBLIC_API_URL: https://api.myapp.com
        run: npm run build

      - name: Deploy
        run: npm run deploy`}</code></pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">.gitignore — What to Always Exclude</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .gitignore
# Environment variables — NEVER commit these
.env.local
.env.*.local

# These are safe to commit (no secrets):
# .env
# .env.development
# .env.production
# .env.test
# .env.example`}</code></pre>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Store real production secrets in your hosting platform dashboard (Vercel, Railway, Render) — not in any committed file. Use .env.local for local dev secrets. Commit .env, .env.development, .env.production only with non-sensitive defaults. Always maintain an up-to-date .env.example.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Real Risks of One .env for Everything</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Production DB in local .env
                </h3>
                <p className="text-gray-700 text-sm">Developer accidentally runs a migration script against the production database URL that was copied into their .env. Data loss. No rollback.</p>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Secrets committed to git
                </h3>
                <p className="text-gray-700 text-sm">A single .env with real secrets gets committed when a developer forgets it&apos;s not gitignored. Even a quick delete and push leaves the secret in git history.</p>
              </div>
              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  &quot;Works on my machine&quot;
                </h3>
                <p className="text-gray-700 text-sm">Each developer has different local values. Without a consistent structure, onboarding requires manual instructions and debugging instead of a documented .env.example.</p>
              </div>
              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Staging pointing at prod DB
                </h3>
                <p className="text-gray-700 text-sm">Manual .env swapping before deploy is forgotten. Staging tests run against the production database. Real user data mutated by test scripts.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between .env.local and .env in Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">.env is committed to git with non-secret defaults. .env.local is gitignored and holds machine-specific secrets with highest priority. Never put real secrets in .env.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I use different .env files for development and production?</h3>
                <p className="text-gray-700 leading-relaxed">In Node.js: use dotenv with <code className="font-mono">path: `.env.${'{NODE_ENV}'}`</code>. In Next.js: create .env.development and .env.production — the framework loads them automatically based on NODE_ENV.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is dotenv-flow?</h3>
                <p className="text-gray-700 leading-relaxed">dotenv-flow automatically loads cascading .env files in order: .env → .env.local → .env.{'{NODE_ENV}'} → .env.{'{NODE_ENV}'}.local. Mimics Next.js built-in behavior for plain Node.js apps.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I commit .env files to git?</h3>
                <p className="text-gray-700 leading-relaxed">Only commit .env files with NO secrets: .env, .env.development, .env.production, .env.example. Never commit: .env.local, .env.*.local, or any file with real credentials.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I set environment variables in GitHub Actions?</h3>
                <p className="text-gray-700 leading-relaxed">Add secrets in repo Settings → Secrets and variables → Actions. Reference as <code className="font-mono">${'${{ secrets.MY_SECRET }}'}</code> in workflow env blocks. Use GitHub Environments for separate secrets per environment (staging vs production).</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides &amp; tools</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">Why process.env is undefined in Node.js</Link>
              <Link href="/blog/how-to-use-env-files-in-nextjs-nextpublic-explained" className="text-primary-600 hover:underline">How to use .env files in Next.js</Link>
              <Link href="/blog/validate-environment-variables-nodejs-zod" className="text-primary-600 hover:underline">Validate env vars with Zod</Link>
              <Link href="/blog/how-to-securely-store-api-keys-nodejs-env-best-practices" className="text-primary-600 hover:underline">Securely store API keys</Link>
            </div>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare
            title="How to Manage Multiple .env Files for Development, Staging, and Production in Node.js"
            description="Master .env.development, .env.staging, .env.production, and .env.local — switch environments and keep secrets safe."
            variant="full"
          />
        </section>
        <section className="mt-12"><NewsletterSignup /></section>
        <section className="mt-12"><FeedbackForm toolName="Multiple .env Files Guide" /></section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
