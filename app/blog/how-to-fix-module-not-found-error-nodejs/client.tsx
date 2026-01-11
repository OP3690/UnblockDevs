'use client';

import Link from 'next/link';
import { ArrowLeft, Package, AlertTriangle, Code, CheckCircle, AlertCircle, HelpCircle, Clock, Folder, Wrench } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToFixModuleNotFoundErrorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Fix "Module Not Found" Error in Node.js</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Troubleshooting Module Resolution (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Fix &quot;Module Not Found&quot; Error in Node.js"
        description="Complete Guide to Troubleshooting Module Resolution (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Module not found" error in Node.js?',
              answer: '"Module not found" errors occur when Node.js cannot locate a required module. Common causes include: missing package installation (package not in node_modules), incorrect module path (typos or wrong relative paths), missing package.json dependencies, incorrect module name (case sensitivity), or module not installed in the correct location. The error typically shows "Cannot find module \'module-name\'".',
            },
            {
              question: 'How do I fix "Module not found" error?',
              answer: 'To fix module not found errors: 1) Install missing packages using npm install or yarn add, 2) Check for typos in require/import statements, 3) Verify package.json includes the dependency, 4) Delete node_modules and package-lock.json, then reinstall, 5) Check file paths for relative imports, 6) Ensure correct case sensitivity in module names, 7) Clear npm/yarn cache if needed.',
            },
            {
              question: 'Why do I get "Module not found" after npm install?',
              answer: 'If you still get "Module not found" after npm install, possible causes include: package not listed in package.json dependencies, installation failed silently, node_modules corrupted, incorrect Node.js version, or the module path is wrong. Try deleting node_modules and package-lock.json, then run npm install again. Check that the package is actually in package.json.',
            },
            {
              question: 'How do I fix "Cannot find module" for local files?',
              answer: 'For local file imports, check: 1) File path is correct (use ./ for same directory, ../ for parent), 2) File extension is included (.js, .json) or matches your module resolution settings, 3) File actually exists at that path, 4) Case sensitivity matches exactly, 5) No typos in the filename. Use absolute paths or check your working directory.',
            },
            {
              question: 'What is the difference between require and import module resolution?',
              answer: 'require() uses CommonJS module resolution, while import uses ES modules. They have different resolution algorithms. require() looks in node_modules automatically, while import may need explicit file extensions. Use require() for CommonJS or import for ES modules, but don\'t mix them in the same file. Configure package.json with "type": "module" for ES modules.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is a "Module Not Found" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Module not found" error</strong> in Node.js occurs when the module resolution system cannot locate a required module. This error typically appears as <code className="bg-gray-100 px-1 rounded">Error: Cannot find module 'module-name'</code> and indicates that Node.js searched for the module but couldn't find it in the expected locations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Node.js uses a specific algorithm to resolve modules: it first checks if it's a core module, then looks in <code className="bg-gray-100 px-1 rounded">node_modules</code> directories (starting from the current directory and moving up), and finally checks for local file paths. When none of these locations contain the requested module, Node.js throws a "Module not found" error.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common causes include missing package installations, incorrect file paths, typos in module names, case sensitivity issues, missing dependencies in <code className="bg-gray-100 px-1 rounded">package.json</code>, or corrupted <code className="bg-gray-100 px-1 rounded">node_modules</code> directories. Understanding Node.js module resolution is key to fixing these errors.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Module not found" errors indicate that Node.js cannot locate a required module. The solution usually involves installing missing packages, fixing file paths, or correcting module names. Understanding Node.js module resolution helps diagnose the issue.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Module Resolution in Node.js</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Node.js module resolution works as follows:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-600" />
                  Module Resolution Algorithm
                </h3>
                <p className="text-gray-700 text-sm mb-2">Node.js resolves modules in this order: 1) Core modules (built-in), 2) node_modules (local, then parent directories up to root), 3) Local file paths (./ or ../). It searches each location until the module is found or all locations are exhausted.</p>
                <p className="text-gray-600 text-xs">Understanding this order helps diagnose resolution issues.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Common Error Scenarios
                </h3>
                <p className="text-gray-700 text-sm mb-2">Errors occur when: package not installed (missing from node_modules), incorrect path (typos or wrong relative paths), missing from package.json, case sensitivity mismatch, or module in wrong location. Each scenario requires different fixes.</p>
                <p className="text-gray-600 text-xs">Different causes require different solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  require() vs import
                </h3>
                <p className="text-gray-700 text-sm mb-2"><code className="bg-gray-100 px-1 rounded">require()</code> uses CommonJS resolution, while <code className="bg-gray-100 px-1 rounded">import</code> uses ES module resolution. They have different behaviors: require() automatically looks in node_modules, while import may need explicit extensions. Don't mix them in the same file.</p>
                <p className="text-gray-600 text-xs">Use the appropriate syntax for your module system.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-red-600" />
                  package.json Dependencies
                </h3>
                <p className="text-gray-700 text-sm mb-2">Packages must be listed in <code className="bg-gray-100 px-1 rounded">package.json</code> under <code className="bg-gray-100 px-1 rounded">dependencies</code> or <code className="bg-gray-100 px-1 rounded">devDependencies</code>. Running <code className="bg-gray-100 px-1 rounded">npm install</code> installs packages listed in package.json into node_modules. Missing entries cause "module not found" errors.</p>
                <p className="text-gray-600 text-xs">Always check package.json for missing dependencies.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Node.js module resolution follows a specific algorithm. Understanding how it works helps diagnose "module not found" errors. Most errors are caused by missing installations, incorrect paths, or typos in module names.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When "Module Not Found" Errors Occur</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Module not found" errors occur in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing Package Installation</h3>
                  <p className="text-gray-700 text-sm">When you use a package that hasn't been installed via npm or yarn, Node.js cannot find it in node_modules. This is the most common cause - simply install the missing package.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Incorrect File Paths</h3>
                  <p className="text-gray-700 text-sm">When requiring local files, incorrect relative paths (./, ../) or absolute paths cause errors. Typos in file names, missing file extensions, or wrong directory structure all lead to "module not found" errors.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">After Cloning Repositories</h3>
                  <p className="text-gray-700 text-sm">When cloning a repository, node_modules is typically not included (in .gitignore). You must run npm install to install all dependencies listed in package.json. Missing this step causes "module not found" errors.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Case Sensitivity Issues</h3>
                  <p className="text-gray-700 text-sm">On case-sensitive file systems (Linux, macOS), module names must match exactly. Requiring "Express" when the package is "express" causes errors. Always use the exact case as the package name.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> "Module not found" errors are most common when starting a new project, cloning repositories, or adding new dependencies without installing them. Always run npm install after adding dependencies to package.json.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Solutions</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Module not found" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Install Missing Packages</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check package.json</h4>
                    <p className="text-gray-700 text-sm mb-2">Verify that the package is listed in package.json under dependencies or devDependencies. If missing, add it manually or install it.</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`// Check package.json
{
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  }
}`}</code></pre>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Install the Package</h4>
                    <p className="text-gray-700 text-sm mb-2">Install missing packages using npm or yarn:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`# Using npm
npm install express
npm install --save-dev nodemon

# Using yarn
yarn add express
yarn add -D nodemon

# Install all dependencies from package.json
npm install
# or
yarn install`}</code></pre>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Verify Installation</h4>
                    <p className="text-gray-700 text-sm mb-2">Check that the package exists in node_modules directory:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`# Check if package exists
ls node_modules/express

# Or verify in code
const express = require('express');
console.log(express); // Should not throw error`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Fix File Path Issues</h3>
              <div className="space-y-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Check Relative Paths</h4>
                  <p className="text-gray-700 text-sm mb-2">Ensure file paths are correct for local imports:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                    <pre className="text-sm"><code>{`// ❌ Incorrect - missing ./
const utils = require('utils'); // Looks in node_modules

// ✅ Correct - relative path
const utils = require('./utils');
const config = require('../config');

// ✅ Correct - with file extension (for ES modules)
import utils from './utils.js';
import config from '../config.js';

// File structure:
// project/
//   ├── index.js
//   ├── utils.js        (require('./utils'))
//   └── config/
//       └── config.js   (require('../config/config'))`}</code></pre>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Verify File Exists</h4>
                  <p className="text-gray-700 text-sm mb-2">Check that the file actually exists at the specified path:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                    <pre className="text-sm"><code>{`// Check if file exists before requiring
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'utils.js');
if (fs.existsSync(filePath)) {
  const utils = require('./utils');
} else {
  console.error('File not found:', filePath);
}

// Or use try-catch
try {
  const utils = require('./utils');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('Module not found. Check file path.');
  }
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Clean Install (Nuclear Option)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Delete node_modules and Lock Files</h4>
                    <p className="text-gray-700 text-sm mb-2">Remove corrupted node_modules and lock files:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`# Delete node_modules and lock files
rm -rf node_modules
rm package-lock.json  # or yarn.lock

# On Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json`}</code></pre>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Clear npm/yarn Cache</h4>
                    <p className="text-gray-700 text-sm mb-2">Clear package manager cache to ensure fresh installs:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`# Clear npm cache
npm cache clean --force

# Clear yarn cache
yarn cache clean`}</code></pre>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Reinstall Dependencies</h4>
                    <p className="text-gray-700 text-sm mb-2">Reinstall all dependencies from package.json:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2">
                      <pre className="text-sm"><code>{`# Fresh install
npm install

# Or with yarn
yarn install`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Fix Case Sensitivity Issues</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Use Correct Case</h4>
                <p className="text-gray-700 text-sm mb-2">Ensure module names match exactly (case-sensitive on Linux/macOS):</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Incorrect - wrong case
const express = require('Express'); // Error on case-sensitive systems

// ✅ Correct - exact case
const express = require('express');

// For local files, case also matters
// ❌ Incorrect
const utils = require('./Utils');

// ✅ Correct
const utils = require('./utils');`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 5: Check Module System (CommonJS vs ES Modules)</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Configure package.json</h4>
                <p className="text-gray-700 text-sm mb-2">Ensure correct module system configuration:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// package.json for ES modules
{
  "type": "module",
  "main": "index.js"
}

// Then use import
import express from 'express';
import { readFile } from 'fs/promises';

// package.json for CommonJS (default)
{
  "main": "index.js"
}

// Then use require
const express = require('express');
const fs = require('fs');`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-emerald-800 text-sm">
                <strong>Best Practice:</strong> Always install packages after adding them to package.json, use correct file paths for local imports, and ensure case sensitivity matches. When in doubt, delete node_modules and reinstall for a clean start.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Fix "Module Not Found" Errors Properly</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fixing "Module not found" errors properly is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Application Functionality
                </h3>
                <p className="text-gray-700 text-sm">Unresolved module errors prevent your application from running. Fixing these errors ensures all dependencies are properly loaded and your application functions correctly.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  Dependency Management
                </h3>
                <p className="text-gray-700 text-sm">Proper dependency management ensures all required packages are installed and versioned correctly. This prevents runtime errors and makes your project reproducible across different environments.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-purple-600" />
                  Project Structure
                </h3>
                <p className="text-gray-700 text-sm">Fixing module errors helps maintain proper project structure. Correct file paths and module organization make your codebase more maintainable and easier to navigate.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-orange-600" />
                  Development Efficiency
                </h3>
                <p className="text-gray-700 text-sm">Understanding and fixing module errors quickly improves development efficiency. You spend less time troubleshooting and more time building features.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> "Module not found" errors are common but easily fixable. Most errors are caused by missing installations or incorrect paths. Following proper troubleshooting steps resolves most issues quickly.
              </p>
            </div>
          </section>

          {/* Troubleshooting Checklist Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting Checklist</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Check package.json</h3>
                <p className="text-gray-700 text-sm mb-2">Verify the package is listed in dependencies or devDependencies. If missing, add it and run npm install.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Verify Installation</h3>
                <p className="text-gray-700 text-sm mb-2">Check that node_modules contains the package. If missing, run npm install or yarn install.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Check File Paths</h3>
                <p className="text-gray-700 text-sm mb-2">For local files, verify paths are correct. Use ./ for same directory, ../ for parent. Check for typos.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Case Sensitivity</h3>
                <p className="text-gray-700 text-sm mb-2">Ensure module names match exactly (case-sensitive on Linux/macOS). "Express" ≠ "express".</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Module System</h3>
                <p className="text-gray-700 text-sm mb-2">Use require() for CommonJS or import for ES modules. Don't mix them. Configure package.json with "type": "module" for ES modules.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">✓ Clean Install</h3>
                <p className="text-gray-700 text-sm mb-2">If all else fails, delete node_modules and package-lock.json, then run npm install for a fresh start.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why do I get "Module not found" after npm install?</h3>
                <p className="text-gray-700 leading-relaxed">If you still get "Module not found" after npm install, possible causes include: package not listed in package.json dependencies, installation failed silently, node_modules corrupted, incorrect Node.js version, or the module path is wrong. Try deleting node_modules and package-lock.json, then run npm install again. Check that the package is actually in package.json.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix "Cannot find module" for local files?</h3>
                <p className="text-gray-700 leading-relaxed">For local file imports, check: 1) File path is correct (use ./ for same directory, ../ for parent), 2) File extension is included (.js, .json) or matches your module resolution settings, 3) File actually exists at that path, 4) Case sensitivity matches exactly, 5) No typos in the filename. Use absolute paths or check your working directory.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between require and import module resolution?</h3>
                <p className="text-gray-700 leading-relaxed"><code className="bg-gray-100 px-1 rounded">require()</code> uses CommonJS module resolution, while <code className="bg-gray-100 px-1 rounded">import</code> uses ES modules. They have different resolution algorithms. <code className="bg-gray-100 px-1 rounded">require()</code> looks in node_modules automatically, while <code className="bg-gray-100 px-1 rounded">import</code> may need explicit file extensions. Use <code className="bg-gray-100 px-1 rounded">require()</code> for CommonJS or <code className="bg-gray-100 px-1 rounded">import</code> for ES modules, but don't mix them in the same file. Configure package.json with <code className="bg-gray-100 px-1 rounded">"type": "module"</code> for ES modules.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I check if a module is installed?</h3>
                <p className="text-gray-700 leading-relaxed">Check if a module is installed by: 1) Looking in node_modules directory: <code className="bg-gray-100 px-1 rounded">ls node_modules/package-name</code>, 2) Checking package.json for the dependency, 3) Trying to require it in code: <code className="bg-gray-100 px-1 rounded">require('package-name')</code>, or 4) Running <code className="bg-gray-100 px-1 rounded">npm list package-name</code> to see if it's installed and its version.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does module resolution work differently on different systems?</h3>
                <p className="text-gray-700 leading-relaxed">Module resolution can differ due to: 1) Case sensitivity (Linux/macOS are case-sensitive, Windows is not), 2) Path separators (Windows uses backslashes, Unix uses forward slashes), 3) File system differences, 4) Node.js version differences. Always test on the target platform and use consistent naming conventions (lowercase, no spaces) to avoid issues.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="How to Fix &quot;Module Not Found&quot; Error in Node.js"
            description="Complete Guide to Troubleshooting Module Resolution (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Fix Module Not Found Error Guide" />
        </section>
      </main>
    </div>
  );
}
