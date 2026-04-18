'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Settings, CheckCircle, HelpCircle, Clock, Globe, Zap, Key, FileText, Server, Shield, ChevronRight, Layers } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ManageMultipleEnvFilesClient() {
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
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Manage Multiple .env Files for Development, Staging, and Production in Node.js</h1>
              <p className="text-sm text-gray-500 mt-1">Master environment-specific configuration across your entire pipeline (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="How to Manage Multiple .env Files for Development, Staging, and Production in Node.js"
        description="Master .env.development, .env.staging, .env.production, and .env.local — how to switch environments and keep secrets safe."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is the difference between .env.local and .env in Next.js?',
              answer: '.env is the base file containing default values checked into git. .env.local is a machine-specific override file that is never committed to git — it is listed in .gitignore by default in Next.js. .env.local overrides all other env files and should be used for secrets and personal dev credentials. Next.js loads .env first, then .env.local on top, then .env.development or .env.production based on NODE_ENV.',
            },
            {
              question: 'How do I use different .env files for development and production?',
              answer: 'With plain dotenv: require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }). With dotenv-flow: just require("dotenv-flow").config() and it cascades automatically based on NODE_ENV. In Next.js, .env.development loads automatically when running next dev and .env.production loads when running next build / next start. Set NODE_ENV=staging before your command to use .env.staging.',
            },
            {
              question: 'What is dotenv-flow?',
              answer: 'dotenv-flow is an npm package that extends the standard dotenv package with cascading environment file support. It automatically loads .env, .env.local, .env.{NODE_ENV}, and .env.{NODE_ENV}.local files in order, with later files overriding earlier ones. This mirrors the Next.js loading behaviour for plain Node.js projects. Install with: npm install dotenv-flow.',
            },
            {
              question: 'Should I commit .env files to git?',
              answer: 'Never commit .env.local or any .env.*.local files — these contain secrets. The base .env file can be committed if it only contains safe defaults or example values (consider renaming it .env.example and adding real values to .env.local). .env.development and .env.staging are safe to commit if they contain only non-sensitive config. Always add .env.local and .env.*.local to .gitignore.',
            },
            {
              question: 'How do I set environment variables in GitHub Actions?',
              answer: 'Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret. Add each secret (e.g. DATABASE_URL, API_KEY). In your workflow YAML, reference them with ${{ secrets.DATABASE_URL }}. Pass them to your job steps using the env: block. Secrets are masked in logs and never exposed in pull request workflows from forks.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: Why One .env File Is Not Enough</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              An <strong>.env file</strong> is a plain-text file that stores configuration values and secrets as <code className="bg-gray-100 px-1 rounded">KEY=VALUE</code> pairs, keeping them out of source code. But real projects have three or more environments — local development, staging, and production — each needing a completely different set of values.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your local database runs on <code className="bg-gray-100 px-1 rounded">localhost:5432</code> while production uses a managed RDS instance. Your staging API endpoint is <code className="bg-gray-100 px-1 rounded">https://staging-api.example.com</code> while production uses <code className="bg-gray-100 px-1 rounded">https://api.example.com</code>. Cramming all of these into one file — or worse, hardcoding them — leads to accidents: pointing your test suite at the production database, leaking credentials into version control, or shipping debug flags to live users.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The solution is a <strong>layered env file hierarchy</strong> where a base file provides safe defaults, environment-specific files override them, and local-only files hold secrets that are never committed to git. Node.js, Next.js, and the <code className="bg-gray-100 px-1 rounded">dotenv-flow</code> package all support this pattern with slightly different conventions.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Environment-specific .env files let each stage of your pipeline (dev, staging, prod) use its own config — automatically — without manual changes to your code before each deploy.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: The Standard .env File Hierarchy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The ecosystem has converged on the following file names, each with a specific role:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  .env — Base defaults (safe to commit)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Contains fallback values used across all environments. Should never contain real secrets — only safe defaults like <code className="bg-gray-100 px-1 rounded">PORT=3000</code> or placeholder values that remind developers what values are needed. Think of it as a <code className="bg-gray-100 px-1 rounded">.env.example</code> that actually gets loaded.</p>
                <p className="text-gray-600 text-xs">Example: PORT=3000, LOG_LEVEL=info, NODE_ENV=development</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  .env.local — Local overrides (never commit — git-ignored)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Your personal machine&apos;s secrets: real API keys, real database passwords, local service URLs. This file is always git-ignored. It overrides .env and the environment-specific file. Each developer maintains their own .env.local without polluting the repo.</p>
                <p className="text-gray-600 text-xs">Example: DATABASE_URL=postgresql://localhost/mydb, STRIPE_SECRET_KEY=sk-test-YOUR_KEY</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-600" />
                  .env.development — Dev environment config (can commit if no secrets)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Loaded automatically when <code className="bg-gray-100 px-1 rounded">NODE_ENV=development</code>. Contains development-specific values shared across all developer machines: debug flags, local service names in Docker Compose, development feature flags. Safe to commit as long as real credentials stay in .env.local.</p>
                <p className="text-gray-600 text-xs">Example: API_BASE_URL=http://localhost:8080, DEBUG=true, REDIS_URL=redis://localhost:6379</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-yellow-600" />
                  .env.staging — Staging environment config
                </h3>
                <p className="text-gray-700 text-sm mb-2">Loaded when <code className="bg-gray-100 px-1 rounded">NODE_ENV=staging</code>. Points to staging infrastructure — staging DB, staging API endpoints, staging payment sandbox. Can be committed if staging URLs are not secret. Actual staging credentials should come from your platform&apos;s secret manager, not this file.</p>
                <p className="text-gray-600 text-xs">Example: API_BASE_URL=https://staging-api.example.com, SENTRY_ENVIRONMENT=staging</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  .env.production — Production config (commit only non-secret values)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Loaded when <code className="bg-gray-100 px-1 rounded">NODE_ENV=production</code>. Contains production-specific flags: <code className="bg-gray-100 px-1 rounded">LOG_LEVEL=error</code>, <code className="bg-gray-100 px-1 rounded">CACHE_TTL=3600</code>. Never put production secrets here. All sensitive production values should be injected by your hosting platform (Vercel, Railway, Render) as environment variables.</p>
                <p className="text-gray-600 text-xs">Example: LOG_LEVEL=error, CACHE_TTL=3600, ENABLE_ANALYTICS=true</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-600" />
                  .env.test — Test environment config
                </h3>
                <p className="text-gray-700 text-sm mb-2">Loaded when <code className="bg-gray-100 px-1 rounded">NODE_ENV=test</code>. Points to test databases, disables external API calls, sets deterministic values for reproducible tests. Safe to commit since test fixtures are not secret.</p>
                <p className="text-gray-600 text-xs">Example: DATABASE_URL=postgresql://localhost/mydb_test, DISABLE_EXTERNAL_APIS=true</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Loading Order and Precedence</h3>
            <p className="text-gray-700 mb-4">Files loaded <strong>later</strong> override files loaded <strong>earlier</strong>. The standard cascade (highest priority last):</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`# Loading order (each overrides the previous)
1. .env                        ← base defaults
2. .env.local                  ← local overrides (git-ignored)
3. .env.{NODE_ENV}             ← e.g. .env.development
4. .env.{NODE_ENV}.local       ← e.g. .env.development.local (git-ignored)

# Result: .env.development.local wins over everything`}</code></pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Rule of thumb:</strong> Files with <code>.local</code> suffix are always git-ignored and personal. Files without <code>.local</code> can be committed if they contain no secrets. Environment-specific files override the base file automatically.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Which File Loads at Which Stage</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Here is a clear breakdown of which env files are active at each stage of your pipeline:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Stage</th>
                    <th className="text-left p-3">NODE_ENV</th>
                    <th className="text-left p-3">Files loaded (in order)</th>
                    <th className="text-left p-3 rounded-tr-lg">Secret source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Local dev</td>
                    <td className="p-3"><code className="bg-gray-100 px-1 rounded">development</code></td>
                    <td className="p-3">.env → .env.local → .env.development → .env.development.local</td>
                    <td className="p-3">.env.local</td>
                  </tr>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Test / CI</td>
                    <td className="p-3"><code className="bg-gray-100 px-1 rounded">test</code></td>
                    <td className="p-3">.env → .env.test → .env.test.local</td>
                    <td className="p-3">GitHub Secrets</td>
                  </tr>
                  <tr className="bg-yellow-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Staging deploy</td>
                    <td className="p-3"><code className="bg-gray-100 px-1 rounded">staging</code></td>
                    <td className="p-3">.env → .env.staging</td>
                    <td className="p-3">Platform env vars</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-3 font-medium">Production deploy</td>
                    <td className="p-3"><code className="bg-gray-100 px-1 rounded">production</code></td>
                    <td className="p-3">.env → .env.production</td>
                    <td className="p-3">Platform env vars</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Local development — .env.local wins</h3>
                  <p className="text-gray-700 text-sm">When you run <code className="bg-gray-100 px-1 rounded">npm run dev</code>, NODE_ENV is set to <code className="bg-gray-100 px-1 rounded">development</code>. Your .env.local file has the highest priority, so your real local DB credentials safely override any defaults without touching committed files.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">CI/CD pipelines — GitHub Actions secrets inject at runtime</h3>
                  <p className="text-gray-700 text-sm">In GitHub Actions, NODE_ENV is typically set to <code className="bg-gray-100 px-1 rounded">test</code> or <code className="bg-gray-100 px-1 rounded">production</code>. Secrets are injected via the <code className="bg-gray-100 px-1 rounded">env:</code> block in your workflow YAML. The .env.test file loaded from the repo provides non-secret test config.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Staging — platform env vars override everything</h3>
                  <p className="text-gray-700 text-sm">On your staging server (Vercel preview, Railway staging environment), NODE_ENV=staging loads .env.staging from the repo for non-sensitive config. Actual credentials are set directly in the platform&apos;s environment variable dashboard, which takes final precedence.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Production — never read .env files; use platform secrets only</h3>
                  <p className="text-gray-700 text-sm">Production should not rely on .env files at all for secrets. All sensitive values (DB passwords, API keys, JWT secrets) come exclusively from the platform&apos;s secret management. .env.production in the repo may only contain safe flags like log levels.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Implement Multi-Env File Loading</h2>
            </div>

            {/* Method 1: plain dotenv */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                Method 1: Plain dotenv with NODE_ENV
              </h3>
              <p className="text-gray-700 mb-4">
                With the standard <code className="bg-gray-100 px-1 rounded">dotenv</code> package, manually specify the file path based on the current environment. Call this at the very top of your entry point before any other imports.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// server.js or app.js — call this FIRST before any other code
const dotenv = require('dotenv');
const path = require('path');

// Load base defaults
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Load environment-specific file — values here override .env
dotenv.config({
  path: path.resolve(process.cwd(), \`.env.\${process.env.NODE_ENV}\`),
  override: true  // dotenv v16+: allows overriding already-set values
});

// Load local overrides — highest priority, never committed
dotenv.config({
  path: path.resolve(process.cwd(), \`.env.\${process.env.NODE_ENV}.local\`),
  override: true
});

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
  override: true
});

// Now process.env has the full merged config
console.log('Environment:', process.env.NODE_ENV);
console.log('DB URL:', process.env.DATABASE_URL);`}</code></pre>
              </div>
              <p className="text-gray-700 mb-4">Run with the correct NODE_ENV:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Development (loads .env + .env.development + .env.development.local + .env.local)
NODE_ENV=development node server.js

# Staging
NODE_ENV=staging node server.js

# Production
NODE_ENV=production node server.js

# Or in package.json scripts:
{
  "scripts": {
    "dev":     "NODE_ENV=development node server.js",
    "staging": "NODE_ENV=staging node server.js",
    "start":   "NODE_ENV=production node server.js"
  }
}`}</code></pre>
              </div>
            </div>

            {/* Method 2: dotenv-flow */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                Method 2: dotenv-flow (Automatic Cascading)
              </h3>
              <p className="text-gray-700 mb-4">
                <code className="bg-gray-100 px-1 rounded">dotenv-flow</code> automates all of the above into a single call. It loads files in the correct order and handles overrides automatically — identical to Next.js behaviour.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Install
npm install dotenv-flow`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// server.js — single line replaces all the manual dotenv.config() calls
require('dotenv-flow').config();

// dotenv-flow automatically loads in this order for NODE_ENV=development:
//   1. .env
//   2. .env.local          (git-ignored)
//   3. .env.development
//   4. .env.development.local  (git-ignored)

const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({
    env: process.env.NODE_ENV,
    apiUrl: process.env.API_BASE_URL,
    // Never expose secrets in health endpoints!
  });
});

app.listen(process.env.PORT || 3000);`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Advanced dotenv-flow options
require('dotenv-flow').config({
  node_env: process.env.NODE_ENV || 'development',  // explicit env
  default_node_env: 'development',                   // fallback if NODE_ENV not set
  path: '/custom/path',                             // custom directory
  encoding: 'utf8',
  silent: true,                                      // suppress warnings for missing files
});`}</code></pre>
              </div>
            </div>

            {/* Method 3: Next.js */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                Method 3: Next.js Built-in Loading Order
              </h3>
              <p className="text-gray-700 mb-4">
                Next.js handles env file loading automatically — no dotenv package needed. The exact precedence for <code className="bg-gray-100 px-1 rounded">next dev</code> (NODE_ENV=development) is:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Next.js loading order for NODE_ENV=development
# (each file overrides the previous one)

1.  process.env          ← already-set system env vars (ALWAYS win)
2.  .env.development.local   ← git-ignored, highest file priority in dev
3.  .env.local               ← git-ignored, overrides everything below
4.  .env.development         ← dev-specific committed config
5.  .env                     ← base defaults

# For next build / next start (NODE_ENV=production):
1.  process.env
2.  .env.production.local   ← git-ignored
3.  .env.local               ← git-ignored
4.  .env.production
5.  .env

# Important Next.js rules:
# - Variables prefixed with NEXT_PUBLIC_ are exposed to the browser bundle
# - Variables WITHOUT the prefix are server-only (safe for secrets)
# - .env.local is NEVER used in test environments (NODE_ENV=test)`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env (base defaults — commit this)
NEXT_PUBLIC_APP_NAME=MyApp
NEXT_PUBLIC_API_BASE=http://localhost:3000/api
LOG_LEVEL=debug

# .env.development (dev config — safe to commit)
NEXT_PUBLIC_API_BASE=http://localhost:8080/api
DATABASE_URL=postgresql://localhost/myapp_dev

# .env.production (prod non-secret flags — safe to commit)
LOG_LEVEL=error
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# .env.local (YOUR secrets — NEVER commit)
DATABASE_URL=postgresql://localhost/myapp_local
STRIPE_SECRET_KEY=sk-test-YOUR_KEY_HERE
NEXTAUTH_SECRET=your-super-secret-jwt-secret`}</code></pre>
              </div>
            </div>

            {/* .gitignore */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                .gitignore Best Practices
              </h3>
              <p className="text-gray-700 mb-4">
                Add these patterns to your <code className="bg-gray-100 px-1 rounded">.gitignore</code>. Never commit local or secret env files:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .gitignore

# Local env files — contain real secrets, never commit
.env.local
.env.*.local

# If your base .env contains real secrets (not recommended),
# also ignore it:
# .env

# Commit these (they contain only safe defaults or non-secret config):
# .env
# .env.development
# .env.staging
# .env.production
# .env.test
# .env.example   ← add this as a template for onboarding`}</code></pre>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-amber-800 text-sm">
                  <strong>Best practice:</strong> Create a <code>.env.example</code> file with all required variable names but empty or placeholder values. New developers copy it to <code>.env.local</code> and fill in their own credentials. Document this in your README.
                </p>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env.example — commit this file to document required variables
DATABASE_URL=postgresql://user:password@localhost/dbname
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk-test-YOUR_KEY
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
API_BASE_URL=http://localhost:8080

# Developers run: cp .env.example .env.local
# Then fill in their real values`}</code></pre>
              </div>
            </div>

            {/* Storing secrets: platform env vars */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                Storing Secrets: Platform Environment Variables
              </h3>
              <p className="text-gray-700 mb-4">
                For staging and production, set secrets directly in your hosting platform — not in files on disk. Platform env vars always override any .env files loaded at runtime.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    Vercel
                  </h4>
                  <p className="text-gray-700 text-sm">Dashboard → Project → Settings → Environment Variables. Scope each var to Preview, Production, or Development. Values injected at build time and runtime. No .env files needed in production.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-600" />
                    Railway / Render
                  </h4>
                  <p className="text-gray-700 text-sm">Each service has an Environment Variables section. Set per-environment (staging service vs production service). Values are available in process.env at runtime exactly as if you had set them in a .env file.</p>
                </div>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Vercel CLI — push env vars to your project
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development

# Pull env vars from Vercel to your local .env.local
vercel env pull .env.local

# Railway CLI
railway variables set DATABASE_URL="postgresql://..."

# Check what's actually loaded in your app at runtime
console.log('All env keys:', Object.keys(process.env).filter(k => !k.startsWith('npm_')));`}</code></pre>
              </div>
            </div>

            {/* CI/CD GitHub Actions */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-600" />
                CI/CD: Injecting Env Vars in GitHub Actions
              </h3>
              <p className="text-gray-700 mb-4">
                GitHub Actions uses repository secrets for sensitive values. Go to <strong>Settings → Secrets and variables → Actions → New repository secret</strong>.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    env:
      # Non-secret config — safe to set directly
      NODE_ENV: test
      LOG_LEVEL: error

      # Secret values — injected from GitHub Secrets
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      REDIS_URL: ${{ secrets.REDIS_URL }}
      API_KEY: ${{ secrets.API_KEY }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
        # process.env.DATABASE_URL is available here via the env: block above

  deploy-staging:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/staging'

    env:
      NODE_ENV: staging
      DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npm run deploy:staging`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Using a .env file in GitHub Actions (alternative approach)
# Create the .env.test file on-the-fly from secrets:

    steps:
      - name: Create .env.test from secrets
        run: |
          cat > .env.test << EOF
          DATABASE_URL=${{ secrets.TEST_DATABASE_URL }}
          REDIS_URL=${{ secrets.TEST_REDIS_URL }}
          EOF

      - name: Run tests
        run: NODE_ENV=test npm test`}</code></pre>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Summary of approaches:</strong> Use plain dotenv with explicit path for fine-grained control, use dotenv-flow for automatic cascading (mirrors Next.js behaviour), rely on Next.js built-in loading if you&apos;re already on Next.js. In all cases: secrets in .env.local locally, secrets in platform env vars for staging/production, secrets in GitHub repository secrets for CI.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: The Real Risks of Getting This Wrong</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Getting environment configuration wrong is not just inconvenient — it can be catastrophic:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Prod DB in test suite
                </h3>
                <p className="text-gray-700 text-sm">If your test environment accidentally points to the production database, running tests will write garbage data, truncate tables, or delete records in production. This has caused real production outages at real companies. Environment-specific files prevent this.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-orange-600" />
                  Secrets leaked to git history
                </h3>
                <p className="text-gray-700 text-sm">Even if you delete a secret from a file and commit again, it remains in git history forever. Anyone who clones the repo can run <code className="bg-gray-100 px-1 rounded">git log -p</code> and find it. The only fix is rotating the key and rewriting git history — neither is fun. Use .env.local and .gitignore religiously.</p>
              </div>
              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-600" />
                  Staging hitting production APIs
                </h3>
                <p className="text-gray-700 text-sm">Without a staging-specific .env file, your staging environment may call production third-party APIs, sending real emails, charging real cards, or creating real records in external systems. A .env.staging file pointing to sandbox APIs prevents this class of accident entirely.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Debug flags in production
                </h3>
                <p className="text-gray-700 text-sm">If NODE_ENV defaults to development in production, many frameworks enable verbose error messages, disable caching, and expose stack traces to end users. Proper environment separation ensures production always runs with hardened, performance-optimised settings.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>The golden rule:</strong> Each environment must be completely isolated from the others at the configuration level. Never share credentials between environments. Never rely on manual copy-paste to switch configs. Use the file hierarchy and let the tools do the work automatically.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between .env.local and .env in Next.js?</h3>
                <p className="text-gray-700 leading-relaxed">.env is the base file containing default values and is checked into git. .env.local is a machine-specific override file that is never committed to git — Next.js lists it in .gitignore by default. .env.local has higher priority than .env and should hold your real secrets (database passwords, API keys). Next.js loads .env first, then .env.local on top, then .env.development or .env.production based on NODE_ENV, with .env.local always winning except over already-set system environment variables.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I use different .env files for development and production?</h3>
                <p className="text-gray-700 leading-relaxed">With plain dotenv: <code className="bg-gray-100 px-1 rounded">require(&apos;dotenv&apos;).config({'{'} path: `.env.{'{'}process.env.NODE_ENV{'}'}` {'}'})</code> — set NODE_ENV before running your app. With dotenv-flow: just call <code className="bg-gray-100 px-1 rounded">require(&apos;dotenv-flow&apos;).config()</code> and it cascades automatically. In Next.js, .env.development loads automatically during <code className="bg-gray-100 px-1 rounded">next dev</code> and .env.production loads during <code className="bg-gray-100 px-1 rounded">next build</code>. No code changes needed — just set NODE_ENV in your npm scripts.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is dotenv-flow?</h3>
                <p className="text-gray-700 leading-relaxed">dotenv-flow is an npm package that extends dotenv with automatic cascading env file support. It loads .env, .env.local, .env.{'{NODE_ENV}'}, and .env.{'{NODE_ENV}'}.local in order, with later files overriding earlier ones — identical to Next.js behaviour. This makes it the easiest way to get proper multi-environment support in plain Node.js projects. Install it with <code className="bg-gray-100 px-1 rounded">npm install dotenv-flow</code> and replace your dotenv.config() calls with a single <code className="bg-gray-100 px-1 rounded">require(&apos;dotenv-flow&apos;).config()</code>.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I commit .env files to git?</h3>
                <p className="text-gray-700 leading-relaxed">Never commit .env.local or any .env.*.local files — these are personal and may contain real secrets. The base .env file can be committed if it contains only safe defaults or placeholder values. .env.development, .env.staging, .env.test, and .env.production are safe to commit if they contain only non-sensitive configuration (URLs pointing to shared infra, flag values, log levels). Always create a .env.example with all variable names documented but no real values, and commit that as a template for new developers.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I set environment variables in GitHub Actions?</h3>
                <p className="text-gray-700 leading-relaxed">Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret. Add each secret with a name (e.g. DATABASE_URL) and its value. In your workflow YAML, reference them with <code className="bg-gray-100 px-1 rounded">${'{'}{'{'} secrets.DATABASE_URL {'}'}{'}'}</code> inside an <code className="bg-gray-100 px-1 rounded">env:</code> block on the job or individual step. GitHub automatically masks secret values in log output. Secrets are not available in pull requests from forked repositories for security reasons.</p>
              </div>
            </div>
          </section>

          {/* Related links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides &amp; tools</h2>
            <p className="text-gray-700 mb-4">More developer guides and free tools:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/process-env-undefined-docker-nodejs-fix" className="text-primary-600 hover:underline">process.env undefined in Docker</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">process.env undefined in Node.js</Link>
              <Link href="/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use" className="text-primary-600 hover:underline">Fix EADDRINUSE port error</Link>
              <Link href="/blog/how-to-fix-module-not-found-error-nodejs" className="text-primary-600 hover:underline">Fix Module Not Found in Node.js</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
              <Link href="/config-comparator" className="text-primary-600 hover:underline">Config Comparator</Link>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="How to Manage Multiple .env Files for Development, Staging, and Production in Node.js"
            description="Master .env.development, .env.staging, .env.production, and .env.local — how to switch environments and keep secrets safe."
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Manage Multiple .env Files Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
