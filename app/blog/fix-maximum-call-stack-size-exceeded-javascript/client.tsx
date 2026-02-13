'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, RefreshCw, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Bug } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function FixMaximumCallStackSizeExceededJavaScriptClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-red-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Maximum Call Stack Size Exceeded" in JavaScript</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing Stack Overflow Errors (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Maximum Call Stack Size Exceeded&quot; in JavaScript"
        description="Complete Guide to Fixing Stack Overflow Errors (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Maximum call stack size exceeded" error?',
              answer: 'This error occurs when JavaScript functions call themselves infinitely (infinite recursion), when recursion goes too deep (deep recursion), or when circular references cause infinite loops. Common causes include missing base cases in recursive functions, circular object references, and infinite event loops.',
            },
            {
              question: 'How do I fix infinite recursion in JavaScript?',
              answer: 'Add a base case to stop recursion, use iteration instead of recursion for deep operations, implement tail call optimization, or use memoization to cache results. Check recursive functions for missing termination conditions and ensure recursive calls progress toward the base case.',
            },
            {
              question: 'How do I fix circular reference errors?',
              answer: 'Use WeakMap or Set to track visited objects, implement circular reference detection before processing, use JSON.stringify with replacer function to handle circular references, or restructure code to avoid circular dependencies. For object cloning, use libraries that handle circular references.',
            },
            {
              question: 'What is the maximum call stack size in JavaScript?',
              answer: 'The maximum call stack size varies by browser and environment. Chrome and Firefox typically allow 10,000-16,000 function calls. Node.js allows around 10,000 calls. The exact limit depends on available memory and function complexity. Deep recursion or infinite loops quickly exceed this limit.',
            },
            {
              question: 'How do I debug stack overflow errors?',
              answer: 'Use browser DevTools call stack to see recursion depth, add console.log statements to track function calls, use breakpoints to inspect recursion, check for missing base cases, and look for circular references. Use stack trace to identify the function causing infinite recursion.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is "Maximum Call Stack Size Exceeded" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Maximum call stack size exceeded"</strong> is a JavaScript error that occurs when the call stack (the data structure that tracks function calls) exceeds its maximum size limit. This happens when functions call themselves infinitely (infinite recursion), when recursion goes too deep, or when circular references cause infinite loops.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The call stack is a LIFO (Last In, First Out) data structure that tracks active function calls. Each time a function is called, it's added to the stack. When a function returns, it's removed from the stack. If functions keep calling themselves without returning, the stack grows until it exceeds the maximum size (typically 10,000-16,000 calls in browsers).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error is common in recursive functions without proper base cases, deep recursion scenarios, circular object references, and infinite event loops. Understanding and fixing this error is essential for writing robust JavaScript code and preventing application crashes.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Maximum call stack size exceeded" occurs when the call stack grows too large, typically from infinite recursion, deep recursion, or circular references. The solution is to add base cases, use iteration, or break circular dependencies.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding the Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Maximum call stack size exceeded" error involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  Infinite Recursion
                </h3>
                <p className="text-gray-700 text-sm mb-2">Infinite recursion occurs when a function calls itself without a base case (termination condition) or with a base case that's never reached. Each recursive call adds to the call stack, causing it to grow indefinitely until the maximum size is exceeded.</p>
                <p className="text-gray-600 text-xs">Example: function recurse() {'{'} recurse(); {'}'} - calls itself forever without stopping</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-green-600" />
                  Deep Recursion
                </h3>
                <p className="text-gray-700 text-sm mb-2">Deep recursion occurs when a recursive function calls itself many times (thousands of times) before reaching the base case. Even with a proper base case, very deep recursion can exceed the call stack limit, especially with complex recursive algorithms.</p>
                <p className="text-gray-600 text-xs">Example: Recursively processing a very large tree or list with thousands of nodes</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Circular References
                </h3>
                <p className="text-gray-700 text-sm mb-2">Circular references occur when objects reference each other in a cycle (A references B, B references A). When processing circular references (like JSON.stringify or deep cloning), the code can enter infinite loops, causing stack overflow.</p>
                <p className="text-gray-600 text-xs">Example: objA.ref = objB; objB.ref = objA; - circular reference causes infinite processing</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Call Stack Limit
                </h3>
                <p className="text-gray-700 text-sm mb-2">The call stack has a maximum size limit (typically 10,000-16,000 function calls in browsers, ~10,000 in Node.js). When this limit is exceeded, JavaScript throws "Maximum call stack size exceeded" error. The exact limit varies by browser, environment, and available memory.</p>
                <p className="text-gray-600 text-xs">Example: Chrome allows ~16,000 calls, Firefox allows ~10,000 calls, Node.js allows ~10,000 calls</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding infinite recursion, deep recursion, circular references, and call stack limits is key to fixing stack overflow errors. The main causes are missing base cases, excessive recursion depth, and circular dependencies.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When This Error Occurs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Recursive Functions Without Base Cases</h3>
                  <p className="text-gray-700 text-sm">When writing recursive functions (factorial, Fibonacci, tree traversal) without proper base cases or with base cases that are never reached, functions call themselves infinitely, causing stack overflow. Missing termination conditions are the most common cause.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Deep Recursion on Large Data</h3>
                  <p className="text-gray-700 text-sm">When processing very large data structures (trees, lists, graphs) recursively, even with proper base cases, recursion can go thousands of levels deep, exceeding the call stack limit. Deep recursion is common in tree algorithms and recursive data processing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Circular Object References</h3>
                  <p className="text-gray-700 text-sm">When processing objects with circular references (JSON.stringify, deep cloning, object traversal), code can enter infinite loops trying to process the circular structure. Circular references cause stack overflow in serialization and cloning operations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Event Handler Loops</h3>
                  <p className="text-gray-700 text-sm">When event handlers trigger events that trigger the same handlers (infinite event loops), functions keep calling each other, causing stack overflow. This is common in DOM event handling and reactive programming patterns.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> This error is most common in recursive functions without base cases, deep recursion on large data structures, circular object references, and infinite event loops. Missing termination conditions are the primary cause in most cases.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix Stack Overflow Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Maximum call stack size exceeded" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Add Base Cases to Recursive Functions</h3>
              <p className="text-gray-700 mb-4">Ensure recursive functions have proper base cases:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Incorrect: Missing Base Case</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Missing base case - causes infinite recursion
function factorial(n) {
  return n * factorial(n - 1); // Never stops!
}

factorial(5); // Maximum call stack size exceeded`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Correct: With Base Case</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ✅ Proper base case stops recursion
function factorial(n) {
  if (n <= 1) { // Base case
    return 1;
  }
  return n * factorial(n - 1);
}

factorial(5); // Returns 120`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use Iteration Instead of Recursion</h3>
              <p className="text-gray-700 mb-4">Convert deep recursion to iteration:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Recursive (Can Cause Stack Overflow)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Deep recursion can exceed stack limit
function sumArray(arr, index = 0) {
  if (index >= arr.length) return 0;
  return arr[index] + sumArray(arr, index + 1);
}

sumArray(new Array(10000).fill(1)); // May exceed stack`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Iterative (No Stack Overflow)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ✅ Iteration avoids stack overflow
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

sumArray(new Array(1000000).fill(1)); // Works fine`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Fix Circular References</h3>
              <p className="text-gray-700 mb-4">Handle circular references properly:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Detect and Handle Circular References</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Fix JSON.stringify with circular references
function safeStringify(obj) {
  const seen = new WeakSet();
  
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]'; // Handle circular reference
      }
      seen.add(value);
    }
    return value;
  });
}

const objA = { name: 'A' };
const objB = { name: 'B' };
objA.ref = objB;
objB.ref = objA; // Circular reference

safeStringify(objA); // Works without stack overflow`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Use Tail Call Optimization</h3>
              <p className="text-gray-700 mb-4">Optimize recursive functions with tail calls:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Tail Recursive Function</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Tail recursive - optimized by JavaScript engines
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // Tail call
}

factorial(10000); // Works with tail call optimization`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 5: Use Memoization for Recursive Functions</h3>
              <p className="text-gray-700 mb-4">Cache results to reduce recursion depth:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Memoized Recursive Function</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Memoization reduces recursive calls
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n]; // Return cached result
  if (n <= 2) return 1; // Base case
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

fibonacci(100); // Works efficiently with memoization`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always add base cases to recursive functions, use iteration for deep operations, handle circular references, and use memoization for expensive recursive calculations. Test recursive functions with edge cases and large inputs to catch stack overflow issues early.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why This Error Happens</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Maximum call stack size exceeded" happens for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  Infinite Recursion
                </h3>
                <p className="text-gray-700 text-sm">Functions call themselves without termination conditions, causing the call stack to grow indefinitely. Each recursive call adds a new frame to the stack. Without base cases, recursion never stops, quickly exceeding the stack limit.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-green-600" />
                  Call Stack Limit
                </h3>
                <p className="text-gray-700 text-sm">JavaScript engines limit call stack size to prevent memory exhaustion and crashes. Browsers typically allow 10,000-16,000 function calls. When this limit is exceeded, JavaScript throws the error to prevent system instability.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Circular Dependencies
                </h3>
                <p className="text-gray-700 text-sm">Circular references create infinite loops when processing objects. Functions keep calling each other or processing the same circular structure repeatedly, causing stack overflow. Circular dependencies are common in object graphs and data structures.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Deep Recursion
                </h3>
                <p className="text-gray-700 text-sm">Even with proper base cases, very deep recursion (thousands of levels) can exceed stack limits. Complex recursive algorithms processing large data structures require many recursive calls, pushing the stack to its limit.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> "Maximum call stack size exceeded" happens due to infinite recursion, call stack limits, circular dependencies, and deep recursion. The solution is to add base cases, use iteration, handle circular references, and optimize recursive functions.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What causes "Maximum call stack size exceeded" error?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when JavaScript functions call themselves infinitely (infinite recursion), when recursion goes too deep (deep recursion), or when circular references cause infinite loops. Common causes include missing base cases in recursive functions, circular object references, and infinite event loops.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix infinite recursion in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">Add a base case to stop recursion, use iteration instead of recursion for deep operations, implement tail call optimization, or use memoization to cache results. Check recursive functions for missing termination conditions and ensure recursive calls progress toward the base case.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix circular reference errors?</h3>
                <p className="text-gray-700 leading-relaxed">Use WeakMap or Set to track visited objects, implement circular reference detection before processing, use JSON.stringify with replacer function to handle circular references, or restructure code to avoid circular dependencies. For object cloning, use libraries that handle circular references.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the maximum call stack size in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">The maximum call stack size varies by browser and environment. Chrome and Firefox typically allow 10,000-16,000 function calls. Node.js allows around 10,000 calls. The exact limit depends on available memory and function complexity. Deep recursion or infinite loops quickly exceed this limit.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I debug stack overflow errors?</h3>
                <p className="text-gray-700 leading-relaxed">Use browser DevTools call stack to see recursion depth, add console.log statements to track function calls, use breakpoints to inspect recursion, check for missing base cases, and look for circular references. Use stack trace to identify the function causing infinite recursion.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Maximum Call Stack Size Exceeded&quot; in JavaScript"
            description="Complete Guide to Fixing Stack Overflow Errors (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Maximum Call Stack Size Exceeded Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
