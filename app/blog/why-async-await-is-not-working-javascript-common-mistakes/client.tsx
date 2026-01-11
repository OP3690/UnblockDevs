'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, RefreshCw, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Why async/await Is Not Working in JavaScript (Common Mistakes)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Troubleshooting Guide for async/await Issues (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Why async/await Is Not Working in JavaScript (Common Mistakes)"
        description="Complete Troubleshooting Guide for async/await Issues (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'Why is async/await not working in JavaScript?',
              answer: 'Common causes include: missing await keyword before async calls, calling async functions without await, forgetting async keyword on function, not handling promise rejections, using await outside async functions, and not waiting for promises to resolve. async/await requires proper syntax and error handling to work correctly.',
            },
            {
              question: 'Why does async function return a promise instead of value?',
              answer: 'Async functions always return promises. If you don\'t use await when calling an async function, you get the promise object, not the resolved value. Use await to get the actual value: const result = await asyncFunction(). Without await, result is a Promise object, not the data.',
            },
            {
              question: 'How do I fix "await is only valid in async functions" error?',
              answer: 'Add async keyword to the function containing await: async function myFunction() { await ... }. You can\'t use await in regular functions. Convert the function to async, or use .then() instead of await. Top-level await is only available in ES modules or async contexts.',
            },
            {
              question: 'Why is my async function not waiting?',
              answer: 'Missing await keyword causes async functions to not wait. If you call asyncFunction() without await, execution continues immediately without waiting. Add await: await asyncFunction() to wait for completion. Also check if the function is actually async and returns a promise.',
            },
            {
              question: 'How do I handle errors in async/await?',
              answer: 'Use try-catch blocks: try { const result = await asyncFunction(); } catch (error) { handle error }. Async functions throw errors that need to be caught. Without try-catch, unhandled promise rejections occur. Always wrap await calls in try-catch for proper error handling.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is async/await Not Working Issue?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>async/await Not Working</strong> is a situation where JavaScript's <code className="bg-gray-100 px-1 rounded">async/await</code> syntax doesn't behave as expected, causing code to execute incorrectly, return promises instead of values, or throw errors. This happens when <code className="bg-gray-100 px-1 rounded">async/await</code> is used incorrectly, missing keywords, or not properly handling promises.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <code className="bg-gray-100 px-1 rounded">async</code> keyword makes a function return a promise, and <code className="bg-gray-100 px-1 rounded">await</code> pauses execution until a promise resolves. When <code className="bg-gray-100 px-1 rounded">async/await</code> doesn't work, it's usually because the <code className="bg-gray-100 px-1 rounded">await</code> keyword is missing, functions aren't marked as <code className="bg-gray-100 px-1 rounded">async</code>, or promises aren't being handled correctly.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This issue is common in JavaScript development when working with asynchronous operations like API calls, database queries, or file operations. Understanding why <code className="bg-gray-100 px-1 rounded">async/await</code> doesn't work and how to fix it is essential for writing correct asynchronous JavaScript code.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> async/await not working usually means missing await keywords, functions not marked as async, or improper promise handling. The solution is to add async/await keywords correctly, handle errors with try-catch, and ensure functions return promises.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding async/await</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              async/await involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  async Keyword
                </h3>
                <p className="text-gray-700 text-sm mb-2">The <code className="bg-gray-100 px-1 rounded">async</code> keyword makes a function return a promise. Functions marked with <code className="bg-gray-100 px-1 rounded">async</code> automatically wrap return values in promises. Without <code className="bg-gray-100 px-1 rounded">async</code>, you can't use <code className="bg-gray-100 px-1 rounded">await</code> inside the function.</p>
                <p className="text-gray-600 text-xs">Example: async function getData() returns a promise, even if you return a regular value</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                  await Keyword
                </h3>
                <p className="text-gray-700 text-sm mb-2">The <code className="bg-gray-100 px-1 rounded">await</code> keyword pauses function execution until a promise resolves, then returns the resolved value. Without <code className="bg-gray-100 px-1 rounded">await</code>, you get the promise object instead of the value. <code className="bg-gray-100 px-1 rounded">await</code> can only be used inside <code className="bg-gray-100 px-1 rounded">async</code> functions.</p>
                <p className="text-gray-600 text-xs">Example: const data = await fetchData() waits for promise, without await you get Promise object</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Promise Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">async/await works with promises. Functions must return promises, and await waits for promises to resolve. If functions don't return promises, or promises aren't handled correctly, async/await doesn't work as expected. Proper promise handling is essential.</p>
                <p className="text-gray-600 text-xs">Example: fetch() returns a promise, await fetch() waits for response</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Error Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">async functions throw errors when promises reject. These errors must be caught with try-catch blocks. Without error handling, unhandled promise rejections occur. Proper error handling with try-catch is required for async/await to work correctly.</p>
                <p className="text-gray-600 text-xs">Example: try {'{'} await asyncFunction(); {'}'} catch (error) {'{'} handle error {'}'}</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding async keyword, await keyword, promise handling, and error handling is key to fixing async/await issues. The main problems are missing keywords, improper promise handling, and missing error handling.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When async/await Doesn't Work</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              async/await doesn't work in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing await Keyword</h3>
                  <p className="text-gray-700 text-sm">When calling async functions without <code className="bg-gray-100 px-1 rounded">await</code>, you get the promise object instead of the resolved value. Code continues executing without waiting for the promise to resolve, causing incorrect behavior.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing async Keyword</h3>
                  <p className="text-gray-700 text-sm">When using <code className="bg-gray-100 px-1 rounded">await</code> in functions not marked as <code className="bg-gray-100 px-1 rounded">async</code>, JavaScript throws "await is only valid in async functions" error. Functions must be marked <code className="bg-gray-100 px-1 rounded">async</code> to use <code className="bg-gray-100 px-1 rounded">await</code>.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Unhandled Promise Rejections</h3>
                  <p className="text-gray-700 text-sm">When async functions throw errors without try-catch blocks, unhandled promise rejections occur. Errors in async functions need to be caught, otherwise they cause "Uncaught (in promise)" errors and break execution.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Functions Not Returning Promises</h3>
                  <p className="text-gray-700 text-sm">When functions don't return promises, <code className="bg-gray-100 px-1 rounded">await</code> doesn't wait for anything. Functions must return promises (or be async) for <code className="bg-gray-100 px-1 rounded">await</code> to work. Non-promise functions don't work with await.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> async/await doesn't work when await is missing, async keyword is missing, errors aren't handled, or functions don't return promises. The most common mistake is forgetting to use await when calling async functions.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix async/await Issues</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix async/await issues:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Always Use await</h3>
              <p className="text-gray-700 mb-4">Use await when calling async functions:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Missing await - Wrong</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: Missing await
async function fetchData() {
  const response = fetch('/api/data'); // Returns Promise, not data
  console.log(response); // Logs Promise object, not response
  return response.json(); // Error: response is Promise, not Response
}

// ✅ Correct: Use await
async function fetchData() {
  const response = await fetch('/api/data'); // Waits for Promise
  const data = await response.json(); // Waits for JSON parsing
  return data; // Returns actual data
}

// Usage
async function main() {
  const data = await fetchData(); // Must use await here too
  console.log(data); // Logs actual data
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Mark Functions as async</h3>
              <p className="text-gray-700 mb-4">Add async keyword to functions using await:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Missing async - Wrong</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: Missing async keyword
function fetchData() {
  const response = await fetch('/api/data'); // Error: await is only valid in async functions
  return response.json();
}

// ✅ Correct: Add async keyword
async function fetchData() {
  const response = await fetch('/api/data'); // Works: function is async
  return await response.json();
}

// ✅ Also correct: Arrow function
const fetchData = async () => {
  const response = await fetch('/api/data');
  return await response.json();
};`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Handle Errors with try-catch</h3>
              <p className="text-gray-700 mb-4">Always wrap await calls in try-catch:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Proper Error Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: No error handling
async function fetchData() {
  const response = await fetch('/api/data'); // Throws error if fails
  return await response.json(); // Unhandled promise rejection
}

// ✅ Correct: Use try-catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw or return default value
  }
}

// ✅ Better: Return default on error
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return []; // Return default value instead of throwing
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Handle Multiple async Calls</h3>
              <p className="text-gray-700 mb-4">Properly handle multiple async operations:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Sequential vs Parallel Execution</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Sequential: One after another (slower)
async function fetchSequential() {
  const user = await fetch('/api/user/1'); // Wait for this
  const posts = await fetch('/api/posts/1'); // Then wait for this
  return { user, posts };
}

// Parallel: All at once (faster)
async function fetchParallel() {
  const [user, posts] = await Promise.all([
    fetch('/api/user/1'),
    fetch('/api/posts/1')
  ]);
  return { user, posts };
}

// ✅ Best: Parallel with error handling
async function fetchData() {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch('/api/user/1'),
      fetch('/api/posts/1')
    ]);
    
    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const [user, posts] = await Promise.all([
      userResponse.json(),
      postsResponse.json()
    ]);
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    return { user: null, posts: [] };
  }
}`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always use await when calling async functions, mark functions as async when using await, handle errors with try-catch, use Promise.all() for parallel operations, and verify functions return promises. Test async code with different scenarios to catch issues early.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why async/await Doesn't Work</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              async/await doesn't work for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Syntax Requirements
                </h3>
                <p className="text-gray-700 text-sm">async/await has strict syntax requirements: await can only be used inside async functions, and async functions must return promises. Missing keywords or incorrect syntax causes errors. JavaScript enforces these rules at runtime, causing failures when syntax is incorrect.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                  Promise Behavior
                </h3>
                <p className="text-gray-700 text-sm">async functions always return promises, and await waits for promises to resolve. Without await, you get promise objects instead of values. If functions don't return promises, await doesn't wait for anything. Understanding promise behavior is essential for async/await to work.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Error Propagation
                </h3>
                <p className="text-gray-700 text-sm">Async functions throw errors when promises reject, and these errors must be caught. Without try-catch, unhandled promise rejections occur, breaking execution. Error handling is required for async/await to work correctly, as errors don't propagate automatically.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Common Mistakes
                </h3>
                <p className="text-gray-700 text-sm">Common mistakes include forgetting await, missing async keyword, not handling errors, and expecting synchronous behavior from async code. These mistakes cause async/await to not work as expected, requiring proper understanding and careful implementation.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> async/await doesn't work due to syntax requirements, promise behavior, error propagation, and common mistakes. The solution is to use await correctly, mark functions as async, handle errors with try-catch, and understand how promises work.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is async/await not working in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">Common causes include: missing await keyword before async calls, calling async functions without await, forgetting async keyword on function, not handling promise rejections, using await outside async functions, and not waiting for promises to resolve. async/await requires proper syntax and error handling to work correctly.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does async function return a promise instead of value?</h3>
                <p className="text-gray-700 leading-relaxed">Async functions always return promises. If you don't use await when calling an async function, you get the promise object, not the resolved value. Use await to get the actual value: const result = await asyncFunction(). Without await, result is a Promise object, not the data.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix "await is only valid in async functions" error?</h3>
                <p className="text-gray-700 leading-relaxed">Add async keyword to the function containing await: async function myFunction() {'{'} await ... {'}'}. You can't use await in regular functions. Convert the function to async, or use .then() instead of await. Top-level await is only available in ES modules or async contexts.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is my async function not waiting?</h3>
                <p className="text-gray-700 leading-relaxed">Missing await keyword causes async functions to not wait. If you call asyncFunction() without await, execution continues immediately without waiting. Add await: await asyncFunction() to wait for completion. Also check if the function is actually async and returns a promise.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle errors in async/await?</h3>
                <p className="text-gray-700 leading-relaxed">Use try-catch blocks: try {'{'} const result = await asyncFunction(); {'}'} catch (error) {'{'} handle error {'}'}. Async functions throw errors when promises reject. These errors must be caught with try-catch blocks. Without try-catch, unhandled promise rejections occur. Always wrap await calls in try-catch for proper error handling.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Why async/await Is Not Working in JavaScript (Common Mistakes)"
            description="Complete Troubleshooting Guide for async/await Issues (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Why async/await Is Not Working Guide" />
        </section>
      </main>
    </div>
  );
}
