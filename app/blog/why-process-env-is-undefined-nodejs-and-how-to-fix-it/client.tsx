'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Settings, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap, FileText, Key } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function WhyProcessEnvIsUndefinedNodejsAndHowToFixItClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Why process.env Is Undefined in Node.js (And How to Fix It)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Environment Variables in Node.js (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Why process.env Is Undefined in Node.js (And How to Fix It)"
        description="Complete Guide to Environment Variables in Node.js (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'Why is process.env undefined in Node.js?',
              answer: 'process.env is undefined when environment variables are not loaded, dotenv is not configured, .env file is missing or not loaded, environment variables are not set in the system, or dotenv.config() is called after accessing process.env. process.env exists by default but may be empty if no environment variables are set. Use require("dotenv").config() at the top of your file to load .env files.',
            },
            {
              question: 'How do I fix process.env undefined?',
              answer: 'Install dotenv: npm install dotenv, create .env file with your variables (PORT=3000), require dotenv at the top: require("dotenv").config(), access variables: process.env.PORT, ensure .env is in project root, and call dotenv.config() before accessing process.env. For production, set environment variables in your hosting platform (Heroku, Vercel, AWS).',
            },
            {
              question: 'How do I use environment variables in Node.js?',
              answer: 'Install dotenv: npm install dotenv, create .env file: PORT=3000, DB_URL=mongodb://localhost, load at top: require("dotenv").config(), access: const port = process.env.PORT, use defaults: process.env.PORT || 3000, and never commit .env to git (add to .gitignore). For production, set variables in hosting platform settings.',
            },
            {
              question: 'Why is dotenv not working?',
              answer: 'dotenv may not work if .env file is missing, dotenv.config() is called after accessing process.env, .env file is in wrong location (should be in project root), .env file has syntax errors, or dotenv is not installed. Ensure require("dotenv").config() is at the very top of your entry file, before any other imports or code.',
            },
            {
              question: 'How do I set environment variables in production?',
              answer: 'Set environment variables in your hosting platform: Heroku (heroku config:set KEY=value), Vercel (vercel env add KEY), AWS (AWS Systems Manager Parameter Store), or Docker (docker run -e KEY=value). Never hardcode secrets in code. Use platform-specific environment variable settings for production deployments.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is process.env?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>process.env</strong> is a global object in Node.js that provides access to environment variables. Environment variables are key-value pairs that configure applications without hardcoding values in source code. process.env allows applications to access system environment variables and custom variables set during runtime.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              process.env is part of Node.js's global process object and contains all environment variables available to the Node.js process. Environment variables are commonly used for configuration like API keys, database URLs, port numbers, and feature flags. They allow applications to work in different environments (development, staging, production) without code changes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When process.env appears undefined or variables are missing, it usually means environment variables aren't loaded, dotenv isn't configured, or variables aren't set. Understanding process.env and how to properly configure it is essential for Node.js development.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> process.env is a global object in Node.js for accessing environment variables. When it appears undefined, it usually means environment variables aren't loaded or dotenv isn't configured. Use require("dotenv").config() to load .env files.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Environment Variables</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Environment variables involve several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  Environment Variables
                </h3>
                <p className="text-gray-700 text-sm mb-2">Environment variables are key-value pairs stored in the operating system or application environment. They configure applications without hardcoding values. Common uses include API keys, database URLs, port numbers, and feature flags. Environment variables are accessed via process.env in Node.js.</p>
                <p className="text-gray-600 text-xs">Example: PORT=3000, DATABASE_URL=mongodb://localhost:27017</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  .env Files
                </h3>
                <p className="text-gray-700 text-sm mb-2">.env files store environment variables in a file format (KEY=VALUE). They're loaded by dotenv package to populate process.env. .env files should be in the project root, never committed to git, and loaded before accessing process.env. They allow local development without setting system environment variables.</p>
                <p className="text-gray-600 text-xs">Example: .env file contains PORT=3000, DB_URL=mongodb://localhost</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  dotenv Package
                </h3>
                <p className="text-gray-700 text-sm mb-2">dotenv is a Node.js package that loads environment variables from .env files into process.env. It reads .env files, parses KEY=VALUE pairs, and adds them to process.env. dotenv.config() must be called at the top of the entry file before accessing process.env. It's essential for loading .env files in development.</p>
                <p className="text-gray-600 text-xs">Example: require("dotenv").config() loads .env file into process.env</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-600" />
                  process.env Access
                </h3>
                <p className="text-gray-700 text-sm mb-2">process.env is accessed like any JavaScript object: process.env.KEY or process.env["KEY"]. Variables are strings by default, so convert numbers if needed: parseInt(process.env.PORT). Use defaults: process.env.PORT || 3000. Access happens after dotenv.config() loads variables. Undefined values mean variables aren't set or loaded.</p>
                <p className="text-gray-600 text-xs">Example: const port = process.env.PORT || 3000</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding environment variables, .env files, dotenv package, and process.env access is key to fixing undefined issues. The main issue is environment variables not being loaded or accessed before dotenv.config() is called.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When process.env Is Undefined</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              process.env appears undefined in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">dotenv Not Configured</h3>
                  <p className="text-gray-700 text-sm">When dotenv package isn't installed or require("dotenv").config() isn't called, .env files aren't loaded, so process.env variables are undefined. dotenv must be configured at the top of the entry file before accessing process.env. Without dotenv, only system environment variables are available.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">.env File Missing or Wrong Location</h3>
                  <p className="text-gray-700 text-sm">When .env file doesn't exist, is in the wrong location (not in project root), or has incorrect syntax, process.env variables are undefined. .env files must be in the project root directory where dotenv.config() is called. Missing or misplaced .env files prevent variables from loading.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Accessing Before Loading</h3>
                  <p className="text-gray-700 text-sm">When process.env is accessed before dotenv.config() is called, variables are undefined because .env file hasn't been loaded yet. dotenv.config() must be called at the very top of the entry file, before any other imports or code that accesses process.env. Order matters for environment variable loading.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Variables Not Set</h3>
                  <p className="text-gray-700 text-sm">When environment variables aren't set in .env file, system environment, or hosting platform, process.env variables are undefined. Variables must be explicitly set in .env files (development) or platform settings (production). Missing variables result in undefined values when accessed.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> process.env is undefined when dotenv isn't configured, .env file is missing or in wrong location, variables are accessed before loading, or variables aren't set. The main issue is environment variables not being loaded or configured properly.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix process.env Undefined</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix process.env undefined issues:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Install and Configure dotenv</h3>
              <p className="text-gray-700 mb-4">Install dotenv and load .env file:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Install dotenv</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Install dotenv package
npm install dotenv

# Or with yarn
yarn add dotenv`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Load dotenv at Top of Entry File</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// server.js - MUST be at the very top
require('dotenv').config();

const express = require('express');
const app = express();

// Now process.env is available
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Create .env File</h3>
              <p className="text-gray-700 mb-4">Create .env file in project root:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">.env File Format</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# .env file (in project root)
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
API_KEY=your-api-key-here
NODE_ENV=development

# No quotes needed for values
# No spaces around = sign
# Comments start with #`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Add .env to .gitignore</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# .gitignore
node_modules/
.env
.env.local
.env.*.local
dist/
build/`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Access Environment Variables</h3>
              <p className="text-gray-700 mb-4">Access process.env with proper defaults:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Access with Defaults</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`require('dotenv').config();

// Access with defaults
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Convert to number if needed
const PORT_NUM = parseInt(process.env.PORT) || 3000;

// Access nested or complex values
const DB_CONFIG = {
  url: process.env.DATABASE_URL,
  name: process.env.DB_NAME || 'mydb'
};

// Check if variable exists
if (!process.env.API_KEY) {
  throw new Error('API_KEY is required');
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Set Environment Variables in Production</h3>
              <p className="text-gray-700 mb-4">Set variables in hosting platforms:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Heroku</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Set environment variables
heroku config:set PORT=3000
heroku config:set DATABASE_URL=mongodb://...

# View all variables
heroku config

# Remove variable
heroku config:unset PORT`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Vercel</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Via CLI
vercel env add PORT

# Or via Vercel Dashboard
# Settings > Environment Variables
# Add: PORT = 3000`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Docker</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# docker-compose.yml
services:
  app:
    environment:
      - PORT=3000
      - DATABASE_URL=mongodb://...

# Or via command line
docker run -e PORT=3000 -e DATABASE_URL=... myapp`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always call require("dotenv").config() at the very top of your entry file, create .env file in project root, add .env to .gitignore, use defaults (process.env.PORT || 3000), convert types when needed (parseInt), and set variables in hosting platforms for production. Never commit .env files to git.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why process.env Is Undefined</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              process.env appears undefined for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  dotenv Not Loaded
                </h3>
                <p className="text-gray-700 text-sm">When dotenv isn't installed or dotenv.config() isn't called, .env files aren't loaded into process.env. Without dotenv, only system environment variables are available, and .env file variables are undefined. dotenv is required to load .env files in Node.js applications.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  .env File Issues
                </h3>
                <p className="text-gray-700 text-sm">When .env file is missing, in wrong location, or has syntax errors, variables can't be loaded. .env files must be in project root where dotenv.config() is called. Missing or misplaced .env files prevent variables from being loaded into process.env, causing undefined values.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Loading Order
                </h3>
                <p className="text-gray-700 text-sm">When process.env is accessed before dotenv.config() is called, variables are undefined because .env file hasn't been loaded yet. dotenv.config() must be called at the very top of the entry file, before any other code. Loading order matters for environment variable access.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-orange-600" />
                  Variables Not Set
                </h3>
                <p className="text-gray-700 text-sm">When environment variables aren't set in .env files, system environment, or hosting platforms, process.env variables are undefined. Variables must be explicitly set in .env files (development) or platform settings (production). Missing variables result in undefined values when accessed.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> process.env is undefined due to dotenv not being loaded, .env file issues, loading order problems, and variables not being set. The solution is to install dotenv, call dotenv.config() at the top, create .env file in project root, and set variables properly.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is process.env undefined in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">process.env is undefined when environment variables are not loaded, dotenv is not configured, .env file is missing or not loaded, environment variables are not set in the system, or dotenv.config() is called after accessing process.env. process.env exists by default but may be empty if no environment variables are set. Use require("dotenv").config() at the top of your file to load .env files.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix process.env undefined?</h3>
                <p className="text-gray-700 leading-relaxed">Install dotenv: npm install dotenv, create .env file with your variables (PORT=3000), require dotenv at the top: require("dotenv").config(), access variables: process.env.PORT, ensure .env is in project root, and call dotenv.config() before accessing process.env. For production, set environment variables in your hosting platform (Heroku, Vercel, AWS).</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I use environment variables in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">Install dotenv: npm install dotenv, create .env file: PORT=3000, DB_URL=mongodb://localhost, load at top: require("dotenv").config(), access: const port = process.env.PORT, use defaults: process.env.PORT || 3000, and never commit .env to git (add to .gitignore). For production, set variables in hosting platform settings.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is dotenv not working?</h3>
                <p className="text-gray-700 leading-relaxed">dotenv may not work if .env file is missing, dotenv.config() is called after accessing process.env, .env file is in wrong location (should be in project root), .env file has syntax errors, or dotenv is not installed. Ensure require("dotenv").config() is at the very top of your entry file, before any other imports or code.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I set environment variables in production?</h3>
                <p className="text-gray-700 leading-relaxed">Set environment variables in your hosting platform: Heroku (heroku config:set KEY=value), Vercel (vercel env add KEY), AWS (AWS Systems Manager Parameter Store), or Docker (docker run -e KEY=value). Never hardcode secrets in code. Use platform-specific environment variable settings for production deployments.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Why process.env Is Undefined in Node.js (And How to Fix It)"
            description="Complete Guide to Environment Variables in Node.js (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Why process.env Is Undefined Guide" />
        </section>
      </main>
    </div>
  );
}
