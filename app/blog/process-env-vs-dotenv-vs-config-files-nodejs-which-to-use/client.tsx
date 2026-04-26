'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Settings, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap, FileText, Key, Shield, Layers } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ProcessEnvVsDotenvVsConfigFilesNodejsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">process.env vs dotenv vs config files — Which Should You Use in Node.js?</h1>
              <p className="text-sm text-gray-500 mt-1">A complete comparison of Node.js configuration management approaches with real code examples (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="process.env vs dotenv vs config files — Which Should You Use in Node.js?"
        description="Compare process.env, dotenv, dotenv-flow, node-config, and convict for managing configuration. Understand tradeoffs and pick the right tool."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is the difference between process.env and dotenv?',
              answer: 'process.env is a built-in Node.js object that holds environment variables set by the operating system or shell before the process started. dotenv is an npm package that reads a .env file on disk and loads its key-value pairs into process.env. After calling require("dotenv").config(), both sources are merged into process.env. Raw process.env needs no package — dotenv is the tool you use to populate it from a .env file during local development.',
            },
            {
              question: 'When should I use node-config instead of dotenv?',
              answer: 'Use node-config (the config npm package) when your application has many configuration values that vary by environment (development, staging, production) AND those values are not secrets. node-config works well for feature flags, timeout values, API base URLs, and pagination limits. For secrets (API keys, database passwords), still use environment variables — never put secrets in config files committed to git. Most projects under 50 config values are better served by dotenv.',
            },
            {
              question: 'What is convict npm package?',
              answer: 'convict is a configuration management library by Mozilla that adds schema validation, type coercion, and default values on top of environment variables and config files. You define a schema describing every configuration key — its type, default value, documentation, and env variable name. convict validates the configuration at startup and throws helpful errors for missing or wrong-typed values. It is most useful for large Node.js applications with complex configuration requirements.',
            },
            {
              question: 'How do I validate process.env in Node.js?',
              answer: 'Three popular approaches: (1) Manual validation — write a function that checks each required variable and throws if missing. (2) Zod — define a schema with z.object() and call .parse(process.env). This gives you TypeScript types and runtime validation in one step. (3) convict — define a full config schema with types, defaults, and allowed values. Zod is the most popular choice in 2026 for TypeScript projects because it handles both validation and type inference.',
            },
            {
              question: 'Should I use dotenv in production?',
              answer: 'No. In production, do not use .env files. Set environment variables through your hosting platform — Vercel Environment Variables, Railway Variables, Heroku Config Vars, AWS Systems Manager Parameter Store, or AWS Secrets Manager. Platform-managed env vars are encrypted, access-controlled, and never stored on disk in plaintext. dotenv is designed for local development only. However, leaving require("dotenv").config() in your production code is harmless — it just silently does nothing when no .env file is found.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: Configuration Management in Node.js</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Configuration management</strong> in Node.js is the practice of separating environment-specific values (ports, API URLs, feature flags, credentials) from your application code so they can change across environments without code changes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The spectrum ranges from zero-dependency raw <code className="bg-gray-100 px-1 rounded">process.env</code> access to full configuration frameworks with schema validation, type coercion, and cascading overrides:
            </p>
            <div className="overflow-x-auto mb-6">
              <div className="flex items-center gap-2 text-sm mb-2 text-gray-500">
                <span>Simpler</span>
                <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-red-400"></div>
                <span>More complex</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: 'raw process.env', color: 'green', desc: 'Zero deps' },
                  { name: 'dotenv', color: 'blue', desc: 'Load .env files' },
                  { name: 'dotenv-flow', color: 'indigo', desc: 'Cascading envs' },
                  { name: 'node-config', color: 'orange', desc: 'JSON/YAML files' },
                  { name: 'convict', color: 'red', desc: 'Schema + validation' },
                ].map((item) => (
                  <div key={item.name} className={`px-3 py-2 bg-${item.color}-100 border border-${item.color}-300 rounded-lg text-center min-w-[120px]`}>
                    <p className="font-mono text-xs font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>The Pareto rule:</strong> dotenv covers 80–90% of Node.js project configuration needs. The other tools solve specific problems — understand when you actually need them before adding complexity.
              </p>
            </div>
          </section>

          {/* What: 5 Approaches */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: 5 Configuration Approaches Explained</h2>
            </div>

            {/* Approach 1: Raw process.env */}
            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <h3 className="text-lg font-bold">Raw <code>process.env</code></h3>
                    <p className="text-gray-400 text-xs">No packages, just system environment variables</p>
                  </div>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Zero dependencies</span>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  <code className="bg-gray-100 px-1 rounded">process.env</code> is a built-in Node.js object (available without any npm install) that holds all environment variables set by the operating system or shell. Variables set before running node are accessible immediately.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// No imports needed — process.env is always available

const port = process.env.PORT || '3000';
const databaseUrl = process.env.DATABASE_URL;
const nodeEnv = process.env.NODE_ENV || 'development';

// Set before running node:
// PORT=8080 DATABASE_URL=postgresql://... node server.js

// Or export in shell:
// export PORT=8080
// node server.js

console.log('Listening on port', port);
console.log('Environment:', nodeEnv);

// All values from process.env are STRINGS — no type coercion
const maxConnections = parseInt(process.env.MAX_CONNECTIONS || '10', 10);
const debugMode = process.env.DEBUG === 'true'; // compare as string`}</code></pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>No npm dependencies</li>
                      <li>Works identically in all environments</li>
                      <li>Platform env vars just work (no config needed)</li>
                      <li>Simple to understand and debug</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Must set env vars in shell manually (no .env file)</li>
                      <li>No validation — missing vars fail silently</li>
                      <li>All values are strings — manual type casting needed</li>
                      <li>Tedious to manage many variables across team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach 2: dotenv */}
            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <h3 className="text-lg font-bold"><code>dotenv</code></h3>
                    <p className="text-gray-400 text-xs">Load .env files into process.env — the industry standard</p>
                  </div>
                </div>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Most popular</span>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  dotenv reads a <code className="bg-gray-100 px-1 rounded">.env</code> file and merges its values into <code className="bg-gray-100 px-1 rounded">process.env</code>. It is the default choice for local development in virtually every Node.js and Next.js project.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Install
npm install dotenv

# .env file (never commit this)
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp
STRIPE_SECRET_KEY=sk-test-YOUR_KEY
JWT_SECRET=my-super-secret-jwt-signing-key-32-chars`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// server.js — load dotenv FIRST, before any other imports
require('dotenv').config();
// Or in ES Modules:
// import 'dotenv/config';

const express = require('express');
const app = express();

// Now process.env has all values from .env merged in
const PORT = process.env.PORT || '3000';
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(parseInt(PORT), () => {
  console.log(\`Server running on port \${PORT}\`);
});

// dotenv.config() options:
require('dotenv').config({
  path: '.env.local',   // custom file path
  override: true,       // override existing env vars
  debug: true,          // log what dotenv loads
});`}</code></pre>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg mb-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> dotenv does NOT override existing environment variables by default. If <code>PORT</code> is already set in the shell, the <code>.env</code> file value is ignored. This is intentional — platform env vars take precedence over .env files.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Industry standard — every developer knows it</li>
                      <li>Tiny package — no sub-dependencies</li>
                      <li>Works with all Node.js frameworks</li>
                      <li>Next.js has built-in dotenv support (no install needed)</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>No built-in schema validation</li>
                      <li>One .env file — no cascading per environment</li>
                      <li>All values are strings — manual casting required</li>
                      <li>No IDE autocomplete for env var names</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach 3: dotenv-flow */}
            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <h3 className="text-lg font-bold"><code>dotenv-flow</code></h3>
                    <p className="text-gray-400 text-xs">Cascading .env files for multiple environments</p>
                  </div>
                </div>
                <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Multi-env</span>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  dotenv-flow extends dotenv by loading multiple .env files in a defined priority order, merging them. Higher-priority files override lower-priority ones. This enables a base configuration with per-environment overrides.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`npm install dotenv-flow

# File loading order (later files override earlier ones):
# .env           — base, committed to git (non-secret defaults)
# .env.local     — local overrides, NOT committed
# .env.development     — dev-specific, can be committed
# .env.development.local — local dev overrides, NOT committed
# .env.test, .env.production (and their .local variants)`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# .env (committed — base defaults, no secrets)
PORT=3000
LOG_LEVEL=info
API_BASE_URL=https://api.myapp.com
FEATURE_NEW_DASHBOARD=false

# .env.development (committed — dev-safe overrides)
LOG_LEVEL=debug
API_BASE_URL=http://localhost:4000
FEATURE_NEW_DASHBOARD=true

# .env.development.local (NOT committed — local secrets)
DATABASE_URL=postgresql://postgres:localpassword@localhost:5432/myapp_dev
STRIPE_SECRET_KEY=sk-test-YOUR_KEY

# .env.production (committed — production non-secret config)
LOG_LEVEL=warn
API_BASE_URL=https://api.myapp.com`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// server.js
require('dotenv-flow').config();
// Automatically loads files based on NODE_ENV

// NODE_ENV=development loads:
// .env → .env.local → .env.development → .env.development.local

// NODE_ENV=production loads:
// .env → .env.local → .env.production → .env.production.local

const port = process.env.PORT;
const logLevel = process.env.LOG_LEVEL;
const featureFlag = process.env.FEATURE_NEW_DASHBOARD === 'true';

console.log(\`Loaded config for NODE_ENV=\${process.env.NODE_ENV}\`);`}</code></pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Cascading files — clean separation per environment</li>
                      <li>Can commit non-secret defaults (.env, .env.development)</li>
                      <li>Drop-in replacement for dotenv</li>
                      <li>Good for teams with multiple environments</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>More files to manage — can get confusing</li>
                      <li>Still no schema validation or type coercion</li>
                      <li>Less popular than plain dotenv — onboarding friction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach 4: node-config */}
            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <h3 className="text-lg font-bold"><code>config</code> npm package (node-config)</h3>
                    <p className="text-gray-400 text-xs">JSON/YAML config files with environment overrides</p>
                  </div>
                </div>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">File-based</span>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  The <code className="bg-gray-100 px-1 rounded">config</code> package (node-config) uses a <code className="bg-gray-100 px-1 rounded">config/</code> directory with JSON, YAML, or JS files. A <code className="bg-gray-100 px-1 rounded">default.json</code> provides base values; environment-specific files override them. Values can also reference environment variables for secrets.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`npm install config

# Directory structure:
# config/
#   default.json        — base config (committed)
#   development.json    — dev overrides (committed)
#   production.json     — prod overrides (committed)
#   custom-environment-variables.json  — maps env vars to config keys`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// config/default.json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "pool": {
      "min": 2,
      "max": 10
    },
    "ssl": false
  },
  "features": {
    "newDashboard": false,
    "betaSignup": false
  },
  "logging": {
    "level": "info",
    "format": "json"
  }
}`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// config/development.json — overrides default.json in development
{
  "server": {
    "port": 3001
  },
  "database": {
    "pool": {
      "min": 1,
      "max": 3
    }
  },
  "features": {
    "newDashboard": true
  },
  "logging": {
    "level": "debug"
  }
}`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre><code className="text-sm">{`// config/custom-environment-variables.json
// Maps environment variables to config keys (for secrets)
{
  "database": {
    "url": "DATABASE_URL"
  },
  "stripe": {
    "secretKey": "STRIPE_SECRET_KEY"
  },
  "jwt": {
    "secret": "JWT_SECRET"
  }
}`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// server.js — using node-config
const config = require('config');

const port = config.get('server.port');         // number, not string!
const dbUrl = config.get('database.url');       // from DATABASE_URL env var
const poolMax = config.get('database.pool.max');
const featureFlag = config.get('features.newDashboard'); // boolean

// config.get() throws if the key doesn't exist
// config.has() returns false instead of throwing

const stripeKey = config.has('stripe.secretKey')
  ? config.get('stripe.secretKey')
  : null;

// NODE_ENV selects the override file:
// NODE_ENV=development → loads default.json + development.json
// NODE_ENV=production  → loads default.json + production.json`}</code></pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Rich config files — JSON, YAML, JS, TOML</li>
                      <li>Nested config structure (server.port, db.pool.max)</li>
                      <li>Non-secret config is committed — team always in sync</li>
                      <li>config.get() throws for missing keys</li>
                      <li>Mature — been around since 2011</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Heavier setup — multiple files to create</li>
                      <li>No TypeScript types by default</li>
                      <li>Unusual mental model compared to dotenv</li>
                      <li>Risk of committing secrets in config files by mistake</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach 5: convict */}
            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <h3 className="text-lg font-bold"><code>convict</code></h3>
                    <p className="text-gray-400 text-xs">Schema-validated config with types, defaults, and documentation</p>
                  </div>
                </div>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Enterprise</span>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  convict (by Mozilla) wraps configuration in a strongly-typed schema. You define each key with its type, default value, environment variable name, documentation string, and allowed values. convict validates the entire configuration at startup and provides helpful error messages for misconfiguration.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`npm install convict
npm install @types/convict  # TypeScript support`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// config/index.ts
import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      doc: 'The port to bind the server to',
      format: 'port',        // validates it's a valid port number
      default: 3000,
      env: 'PORT',
      arg: 'port',          // can also be set via --port CLI argument
    },
    host: {
      doc: 'Server hostname',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
  },
  database: {
    url: {
      doc: 'PostgreSQL connection string',
      format: String,
      default: null,           // null means required — will throw if not set
      env: 'DATABASE_URL',
      sensitive: true,         // redacted in logs
    },
    pool: {
      min: {
        doc: 'Minimum database connections in pool',
        format: 'int',
        default: 2,
        env: 'DB_POOL_MIN',
      },
      max: {
        doc: 'Maximum database connections in pool',
        format: 'int',
        default: 10,
        env: 'DB_POOL_MAX',
      },
    },
  },
  stripe: {
    secretKey: {
      doc: 'Stripe secret API key',
      format: String,
      default: null,
      env: 'STRIPE_SECRET_KEY',
      sensitive: true,
    },
    webhookSecret: {
      doc: 'Stripe webhook signing secret',
      format: String,
      default: null,
      env: 'STRIPE_WEBHOOK_SECRET',
      sensitive: true,
    },
  },
  features: {
    newDashboard: {
      doc: 'Enable the new dashboard UI',
      format: Boolean,
      default: false,
      env: 'FEATURE_NEW_DASHBOARD',
    },
  },
});

// Load environment-specific config file if it exists
const env = config.get('env');
try {
  config.loadFile(\`./config/\${env}.json\`);
} catch {
  // No env-specific file — that's fine
}

// Validate — throws with detailed error message if invalid
config.validate({ allowed: 'strict' });

export default config;`}</code></pre>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// Usage in your application:
import config from './config';

const port = config.get('server.port');           // type: number (not string!)
const dbUrl = config.get('database.url');         // type: string
const poolMax = config.get('database.pool.max'); // type: number
const featureFlag = config.get('features.newDashboard'); // type: boolean

// config.toString() → prints all config values, REDACTING sensitive ones
console.log(config.toString());
// { server: { port: 3000, host: 'localhost' },
//   database: { url: '[Sensitive]', pool: { min: 2, max: 10 } },
//   stripe: { secretKey: '[Sensitive]', ... } }`}</code></pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Full type coercion — numbers stay numbers</li>
                      <li>Schema validation at startup</li>
                      <li>Built-in docs for every config key</li>
                      <li>Sensitive values auto-redacted in logs</li>
                      <li>Supports env vars, config files, and CLI args</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>Most verbose — heavy schema setup</li>
                      <li>TypeScript types are not fully inferred</li>
                      <li>Overkill for small/medium projects</li>
                      <li>Zod has largely replaced convict in TypeScript projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When to use each */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Which Tool for Which Scenario</h2>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Simple scripts, cron jobs, CLI tools</h3>
                  <p className="text-gray-700 text-sm">Use <strong>raw process.env</strong>. Set vars in your shell or CI. No .env file needed. Zero dependencies, no setup. If the script needs 1–3 config values, this is the right choice.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Most Node.js and Next.js applications</h3>
                  <p className="text-gray-700 text-sm">Use <strong>dotenv</strong> (or dotenv is already built into Next.js). Add .env.local to .gitignore. Add Zod validation for type safety. This covers 90% of real-world projects. No need to reach for something heavier.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <CheckCircle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Teams managing multiple environments (dev/staging/prod)</h3>
                  <p className="text-gray-700 text-sm">Use <strong>dotenv-flow</strong>. Enables committing non-secret base config while keeping secrets local. The cascading file pattern is clean for teams where environment-specific non-secret values differ (API URLs, feature flags, log levels).</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Large apps with many non-secret config values</h3>
                  <p className="text-gray-700 text-sm">Use <strong>node-config</strong> for structured config with many knobs (database pool sizes, timeouts, feature flags, pagination limits, retry counts). The nested JSON structure is easier to navigate than a flat list of env vars. Still use env vars for secrets via custom-environment-variables.json.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Enterprise apps requiring documented, validated config</h3>
                  <p className="text-gray-700 text-sm">Use <strong>convict</strong> when you need full documentation per config key, strict type validation at startup, automatic log redaction for sensitive values, and support for CLI arguments alongside env vars. Also consider <strong>Zod + dotenv</strong> as a more TypeScript-native alternative.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How To: Same config, 5 approaches */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: The Same Config in All 5 Approaches</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Compare how each approach handles the same config: a <code className="bg-gray-100 px-1 rounded">PORT</code>, <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code>, and a <code className="bg-gray-100 px-1 rounded">DEBUG</code> boolean.
            </p>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">1. Raw process.env</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// No setup. Set in shell: PORT=3000 DATABASE_URL=... DEBUG=true node app.js

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATABASE_URL = process.env.DATABASE_URL;
const DEBUG = process.env.DEBUG === 'true';

if (!DATABASE_URL) throw new Error('DATABASE_URL is required');`}</code></pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">2. dotenv</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// .env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp
DEBUG=true

// app.js
require('dotenv').config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATABASE_URL = process.env.DATABASE_URL;
const DEBUG = process.env.DEBUG === 'true';

if (!DATABASE_URL) throw new Error('DATABASE_URL is required');`}</code></pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">3. dotenv-flow</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env (committed)
PORT=3000
DEBUG=false

# .env.development (committed)
DEBUG=true

# .env.development.local (not committed)
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_dev

// app.js
require('dotenv-flow').config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATABASE_URL = process.env.DATABASE_URL;
const DEBUG = process.env.DEBUG === 'true';`}</code></pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">4. node-config</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// config/default.json
{ "server": { "port": 3000 }, "debug": false }

// config/development.json
{ "debug": true }

// config/custom-environment-variables.json
{ "database": { "url": "DATABASE_URL" } }

// app.js
const config = require('config');

const PORT = config.get('server.port');   // Already a number!
const DATABASE_URL = config.get('database.url');
const DEBUG = config.get('debug');        // Already a boolean!`}</code></pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">5. convict</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// config.js
const convict = require('convict');

const config = convict({
  port: { format: 'port', default: 3000, env: 'PORT' },
  databaseUrl: { format: String, default: null, env: 'DATABASE_URL', sensitive: true },
  debug: { format: Boolean, default: false, env: 'DEBUG' },
});

config.validate({ allowed: 'strict' });
module.exports = config;

// app.js
const config = require('./config');

const PORT = config.get('port');         // number
const DATABASE_URL = config.get('databaseUrl'); // string
const DEBUG = config.get('debug');       // boolean`}</code></pre>
              </div>
            </div>

            {/* Bonus: Zod */}
            <div className="mb-6 p-5 bg-indigo-50 rounded-xl border border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Bonus: Zod + dotenv (Best for TypeScript in 2026)
              </h3>
              <p className="text-gray-700 text-sm mb-3">Combining dotenv with Zod validation gives you the simplicity of dotenv with full type safety, runtime validation, and TypeScript inference — no separate config schema library needed.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`// npm install dotenv zod

// lib/env.ts
import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url(),
  DEBUG: z.coerce.boolean().default(false),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.flatten().fieldErrors;
  console.error('Invalid environment variables:', JSON.stringify(issues, null, 2));
  process.exit(1);
}

export const env = result.data;
// env.PORT is typed as number
// env.DATABASE_URL is typed as string
// env.DEBUG is typed as boolean

// Usage anywhere in your app:
// import { env } from '@/lib/env';
// app.listen(env.PORT);`}</code></pre>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Comparison Table</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="text-left p-3 border border-gray-600">Approach</th>
                    <th className="text-left p-3 border border-gray-600">Env support</th>
                    <th className="text-left p-3 border border-gray-600">Validation</th>
                    <th className="text-left p-3 border border-gray-600">Type coercion</th>
                    <th className="text-left p-3 border border-gray-600">File format</th>
                    <th className="text-left p-3 border border-gray-600">Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">raw process.env</td>
                    <td className="p-3 border border-gray-200">Shell / CI only</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200 text-gray-500">None</td>
                    <td className="p-3 border border-gray-200"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Minimal</span></td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">dotenv</td>
                    <td className="p-3 border border-gray-200">.env file + shell</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200">.env</td>
                    <td className="p-3 border border-gray-200"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Low</span></td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">dotenv + Zod</td>
                    <td className="p-3 border border-gray-200">.env file + shell</td>
                    <td className="p-3 border border-gray-200 text-green-600">Schema</td>
                    <td className="p-3 border border-gray-200 text-green-600">z.coerce.*</td>
                    <td className="p-3 border border-gray-200">.env</td>
                    <td className="p-3 border border-gray-200"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Low</span></td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">dotenv-flow</td>
                    <td className="p-3 border border-gray-200">Cascading .env files</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200 text-red-600">Manual</td>
                    <td className="p-3 border border-gray-200">.env.*</td>
                    <td className="p-3 border border-gray-200"><span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs">Medium</span></td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">node-config</td>
                    <td className="p-3 border border-gray-200">Files + env vars</td>
                    <td className="p-3 border border-gray-200 text-yellow-600">Partial</td>
                    <td className="p-3 border border-gray-200 text-green-600">From JSON</td>
                    <td className="p-3 border border-gray-200">JSON/YAML/JS</td>
                    <td className="p-3 border border-gray-200"><span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">Medium</span></td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-3 border border-gray-200 font-mono font-bold">convict</td>
                    <td className="p-3 border border-gray-200">Env vars + files + CLI</td>
                    <td className="p-3 border border-gray-200 text-green-600">Full schema</td>
                    <td className="p-3 border border-gray-200 text-green-600">Full</td>
                    <td className="p-3 border border-gray-200">JSON + schema</td>
                    <td className="p-3 border border-gray-200"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">High</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why "Just Use dotenv" Works for 90% of Projects</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Node.js ecosystem has dozens of configuration libraries, but the vast majority of production applications use dotenv (or dotenv built into their framework) for a simple reason: <strong>it solves the actual problem</strong> — getting local secrets out of source code — with zero cognitive overhead.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  When dotenv is enough
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Your app has under 20 config values</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />You deploy to Vercel, Railway, or Heroku (platform manages env vars)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />You add Zod validation for type safety</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />You are building a Next.js or Express app</li>
                </ul>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  When to reach for more
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />50+ config values that differ by environment</li>
                  <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />You need non-secret config values committed to git and synced across team</li>
                  <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />You need audit logs for every config access</li>
                  <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />You need CLI argument overrides for config values</li>
                </ul>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Recommendation for 2026:</strong> Start with dotenv + Zod validation. It gives you type safety, runtime validation, and full TypeScript inference — covering everything most projects need. Only migrate to node-config or convict when you hit a real limitation with this approach.
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between process.env and dotenv?</h3>
                <p className="text-gray-700 leading-relaxed"><code className="bg-gray-100 px-1 rounded">process.env</code> is a built-in Node.js object holding all environment variables set by the shell or operating system before the process started. <code className="bg-gray-100 px-1 rounded">dotenv</code> is an npm package that reads a <code className="bg-gray-100 px-1 rounded">.env</code> file and merges its values into <code className="bg-gray-100 px-1 rounded">process.env</code>. After calling <code className="bg-gray-100 px-1 rounded">require('dotenv').config()</code>, both sources are merged. dotenv is the loader — process.env is where everything ends up.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I use node-config instead of dotenv?</h3>
                <p className="text-gray-700 leading-relaxed">Use node-config when you have many configuration values that differ by environment AND those values are not secrets. node-config is excellent for feature flags, timeouts, pagination limits, API base URLs, and connection pool sizes — values you want to commit to git and keep in sync across your team. For secrets (API keys, database passwords), always use environment variables regardless of which config library you use.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is convict npm package?</h3>
                <p className="text-gray-700 leading-relaxed">convict is a configuration management library by Mozilla that wraps your configuration in a schema. You define each config key with its type, default value, environment variable name, documentation string, and allowed values. convict validates the entire config at startup and provides descriptive error messages. It also auto-redacts sensitive values in log output. In 2026, many TypeScript projects use Zod + dotenv instead of convict for a more type-native experience.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I validate process.env in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">Three approaches: (1) Manual — write a function that checks each key and throws if missing. (2) Zod — use <code className="bg-gray-100 px-1 rounded">z.object(&#123;&#125;).parse(process.env)</code> with <code className="bg-gray-100 px-1 rounded">z.coerce.number()</code> and <code className="bg-gray-100 px-1 rounded">z.coerce.boolean()</code> for type coercion. This is the recommended approach for TypeScript projects in 2026. (3) convict — define a full schema with types and defaults. Zod is the most popular choice because it handles both validation and TypeScript type inference in one step.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I use dotenv in production?</h3>
                <p className="text-gray-700 leading-relaxed">No — do not deploy .env files to production. Set environment variables through your hosting platform: Vercel Environment Variables, Railway Variables, Heroku Config Vars, or AWS Secrets Manager. However, leaving <code className="bg-gray-100 px-1 rounded">require('dotenv').config()</code> in your production code is harmless — it silently does nothing when no .env file exists. Never use dotenv as a substitute for proper production secret management.</p>
              </div>
            </div>
          </section>

          {/* Related links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides &amp; Tools</h2>
            <p className="text-gray-700 mb-4">Continue learning about Node.js configuration and secrets:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/how-to-securely-store-api-keys-nodejs-env-best-practices" className="text-primary-600 hover:underline">How to Securely Store API Keys in Node.js</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">Fix process.env undefined in Node.js</Link>
              <Link href="/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use" className="text-primary-600 hover:underline">Fix EADDRINUSE port error</Link>
              <Link href="/blog/process-env-undefined-docker-nodejs-fix" className="text-primary-600 hover:underline">Fix process.env Undefined in Docker</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
            </div>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare
            title="process.env vs dotenv vs config files — Which Should You Use in Node.js?"
            description="Compare process.env, dotenv, dotenv-flow, node-config, and convict for managing configuration. Understand tradeoffs and pick the right tool."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>

        <section className="mt-12">
          <FeedbackForm toolName="process.env vs dotenv vs config files Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
