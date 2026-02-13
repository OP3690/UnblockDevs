'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Bug, Search, Play, Pause, AlertCircle, CheckCircle, BookOpen, Zap, Eye, Filter } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">How to Debug JavaScript Errors Using Browser DevTools</h1>
          <p className="text-sm text-gray-500 mt-1">Master JavaScript debugging with Chrome DevTools, Firefox DevTools, and Edge DevTools</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="How to Debug JavaScript Errors Using Browser DevTools"
        description="Master JavaScript debugging with browser DevTools. Learn to fix errors, use breakpoints, and debug production issues."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              JavaScript errors can be frustrating, but with the right debugging tools, you can quickly identify and fix issues in your code. 
              Browser DevTools are powerful debugging utilities built into every modern browser, and mastering them is essential for every developer.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn how to use Chrome DevTools, Firefox DevTools, and Edge DevTools to debug JavaScript errors, 
              set breakpoints, inspect variables, and troubleshoot production issues. We'll cover everything from basic console debugging to advanced 
              techniques like source maps and performance profiling.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to check API responses 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to debug JSON data structures.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Are Browser DevTools?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Browser DevTools</strong> (Developer Tools) are integrated debugging and development utilities built into modern web browsers. 
              They provide developers with powerful features to inspect, debug, and optimize web applications directly in the browser.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              DevTools typically include:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Code className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Console</h3>
                <p className="text-sm text-gray-700">View errors, logs, and execute JavaScript commands</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Bug className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Debugger</h3>
                <p className="text-sm text-gray-700">Set breakpoints and step through code execution</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Eye className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Inspector</h3>
                <p className="text-sm text-gray-700">Inspect DOM elements and CSS styles</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Zap className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Network</h3>
                <p className="text-sm text-gray-700">Monitor HTTP requests and responses</p>
              </div>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Can You Debug with DevTools?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DevTools can help you debug a wide range of JavaScript issues:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Runtime Errors</h3>
                  <p className="text-gray-700 text-sm">TypeError, ReferenceError, SyntaxError, and other JavaScript exceptions</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <Search className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Logic Errors</h3>
                  <p className="text-gray-700 text-sm">Incorrect variable values, wrong function outputs, and unexpected behavior</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <Filter className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Performance Issues</h3>
                  <p className="text-gray-700 text-sm">Slow code execution, memory leaks, and inefficient algorithms</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Issues</h3>
                  <p className="text-gray-700 text-sm">Failed requests, incorrect responses, and network errors</p>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Should You Use DevTools?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use browser DevTools in these scenarios:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Code isn't working as expected</strong> - When your JavaScript produces incorrect results or doesn't execute</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Console shows errors</strong> - When you see red error messages in the browser console</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Debugging production issues</strong> - When users report bugs that you can't reproduce locally</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Understanding third-party code</strong> - When you need to inspect libraries or frameworks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Performance optimization</strong> - When your app is slow or consuming too much memory</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Debug JavaScript Errors: Step-by-Step Guide</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Open DevTools</h3>
              <div className="space-y-3 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Chrome/Edge:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">F12</kbd> or <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">Ctrl+Shift+I</kbd> (Windows/Linux)</li>
                    <li>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">Cmd+Option+I</kbd> (Mac)</li>
                    <li>Right-click → "Inspect" or "Inspect Element"</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Firefox:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">F12</kbd> or <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">Ctrl+Shift+I</kbd></li>
                    <li>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm">Cmd+Option+I</kbd> (Mac)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Check the Console Tab</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Console tab shows all JavaScript errors, warnings, and log messages. Here's what to look for:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
                <div className="text-red-400">❌ TypeError: Cannot read property 'map' of undefined</div>
                <div className="text-yellow-400">⚠️ Warning: Unused variable 'x'</div>
                <div className="text-blue-400">ℹ️ Info: API request completed</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> Click on any error to jump to the source code location. The error message shows the file name, line number, and column.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Use Breakpoints</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Breakpoints pause code execution at specific lines, allowing you to inspect variables and step through code:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Open Sources Tab</h4>
                    <p className="text-gray-700 text-sm">Navigate to Sources (Chrome) or Debugger (Firefox) tab</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Find Your File</h4>
                    <p className="text-gray-700 text-sm">Use the file tree to locate your JavaScript file</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Set Breakpoint</h4>
                    <p className="text-gray-700 text-sm">Click on the line number where you want to pause execution</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Trigger the Code</h4>
                    <p className="text-gray-700 text-sm">Perform the action that executes your code (click button, load page, etc.)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Breakpoint Controls:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700"><strong>Resume:</strong> Continue execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pause className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700"><strong>Step Over:</strong> Execute current line</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700"><strong>Step Into:</strong> Enter function calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4 text-orange-600 rotate-180" />
                    <span className="text-gray-700"><strong>Step Out:</strong> Exit current function</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Inspect Variables</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When paused at a breakpoint, you can inspect variable values in the Scope panel:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-blue-400">Scope</div>
                <div className="ml-4">
                  <div>Local</div>
                  <div className="ml-4">
                    <div>user: {'{'} name: "John", age: 30 {'}'}</div>
                    <div>count: 5</div>
                    <div>isActive: true</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can also hover over variables in the code editor or type variable names in the Console to see their values.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 5: Use Console Commands</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Console allows you to execute JavaScript commands and inspect values:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">// Check variable value</div>
                  <div className="text-blue-400">&gt; console.log(user)</div>
                  <div className="text-white">{'{'} name: "John", age: 30 {'}'}</div>
                  <div className="text-gray-400 mt-2">// Call functions</div>
                  <div className="text-blue-400">&gt; calculateTotal(10, 20)</div>
                  <div className="text-white">30</div>
                  <div className="text-gray-400 mt-2">// Inspect DOM elements</div>
                  <div className="text-blue-400">&gt; document.querySelector('.button')</div>
                  <div className="text-white">&lt;button class="button"&gt;Click me&lt;/button&gt;</div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Flow Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Debugging Workflow Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Open DevTools</h4>
                    <p className="text-sm text-gray-600">Press F12 or right-click → Inspect</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Check Console for Errors</h4>
                    <p className="text-sm text-gray-600">Look for red error messages</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Set Breakpoints</h4>
                    <p className="text-sm text-gray-600">Click line numbers in Sources tab</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Inspect Variables</h4>
                    <p className="text-sm text-gray-600">Check Scope panel or hover over variables</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Fix and Test</h4>
                    <p className="text-sm text-gray-600">Make changes and verify the fix</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use DevTools for Debugging?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Faster Debugging</h3>
                <p className="text-gray-700 text-sm">Identify errors in seconds instead of hours of guesswork</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Eye className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Inspection</h3>
                <p className="text-gray-700 text-sm">See variable values and code execution as it happens</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Code className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">No Code Changes Needed</h3>
                <p className="text-gray-700 text-sm">Debug without modifying your source code</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Search className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Production Debugging</h3>
                <p className="text-gray-700 text-sm">Debug issues that only occur in production environments</p>
              </div>
            </div>
          </section>

          {/* Advanced Techniques */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Debugging Techniques</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Conditional Breakpoints</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Set breakpoints that only trigger when specific conditions are met:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
                <div className="text-gray-400">// Right-click breakpoint → Edit breakpoint</div>
                <div className="text-blue-400">// Condition: user.age {'>'} 18</div>
                <div className="text-white">// Only pauses when user is over 18</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Watch Expressions</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Monitor specific expressions or variables throughout execution:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
                <div className="text-gray-400">// In Watch panel, add:</div>
                <div className="text-blue-400">user.name + " " + user.age</div>
                <div className="text-white">// Updates automatically as code runs</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Source Maps</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Debug minified code by mapping it back to original source files. Enable in Settings → Sources → Enable JavaScript source maps.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Network Tab for API Debugging</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Debug API calls by inspecting requests and responses:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> Use our <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate API responses 
                  and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to format response data for easier debugging.
                </p>
              </div>
            </div>
          </section>

          {/* Common Errors Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common JavaScript Errors and Solutions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Error Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Common Cause</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">How to Debug</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">TypeError</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Accessing property of undefined/null</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Check variable value in Scope panel, add null checks</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">ReferenceError</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Using undefined variable</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Check variable declaration, verify scope</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">SyntaxError</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Invalid JavaScript syntax</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Console shows exact line and character</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">RangeError</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Invalid array length or number</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Inspect array/number values at breakpoint</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Debugging</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use console.log() Strategically</h3>
                  <p className="text-gray-700 text-sm">Add temporary logs to track execution flow, but remove them before committing code</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Enable Source Maps</h3>
                  <p className="text-gray-700 text-sm">Always enable source maps in development to debug original source code</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Descriptive Variable Names</h3>
                  <p className="text-gray-700 text-sm">Clear variable names make debugging easier when inspecting values</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Test in Multiple Browsers</h3>
                  <p className="text-gray-700 text-sm">Different browsers may show different error messages or behaviors</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'How do I open DevTools in Chrome?',
                answer: 'Press F12, Ctrl+Shift+I (Windows/Linux), or Cmd+Option+I (Mac). You can also right-click on any element and select "Inspect".',
              },
              {
                question: 'What is the difference between console.log() and breakpoints?',
                answer: 'console.log() outputs values to the console, while breakpoints pause code execution so you can inspect variables and step through code line by line. Breakpoints are more powerful for complex debugging.',
              },
              {
                question: 'Can I debug minified JavaScript code?',
                answer: 'Yes, using source maps. Source maps map minified code back to your original source files, allowing you to debug the readable version. Enable them in DevTools Settings → Sources → Enable JavaScript source maps.',
              },
              {
                question: 'How do I debug errors that only happen in production?',
                answer: 'Use source maps with your production build, enable remote debugging, or use error tracking services. You can also add console.error() statements that log to external services for production debugging.',
              },
              {
                question: 'What should I do if DevTools shows no errors but code still doesn\'t work?',
                answer: 'Check for logic errors by setting breakpoints and stepping through code. Inspect variable values, check network requests in the Network tab, and verify that event handlers are properly attached.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="How to Debug JavaScript Errors Using Browser DevTools"
            description="Master JavaScript debugging with browser DevTools. Learn to fix errors, use breakpoints, and debug production issues."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
