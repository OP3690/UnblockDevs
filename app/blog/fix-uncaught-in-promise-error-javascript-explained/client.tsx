'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Bug } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixUncaughtInPromiseErrorJavaScriptExplainedClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Uncaught (in promise)" Error in JavaScript Explained</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing Unhandled Promise Rejections (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Uncaught (in promise)&quot; Error in JavaScript Explained"
        description="Complete Guide to Fixing Unhandled Promise Rejections (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Uncaught (in promise)" error?',
              answer: 'This error occurs when a promise is rejected but the rejection is not caught with .catch() or try-catch. Common causes include: missing .catch() on promise chains, unhandled async/await errors, promises that reject without error handling, and errors in promise callbacks that aren\'t caught. Unhandled promise rejections cause this error.',
            },
            {
              question: 'How do I fix uncaught promise rejection?',
              answer: 'Add .catch() to promise chains: promise.then(...).catch(error => handle error), use try-catch with async/await: try { await promise; } catch (error) { handle error }, handle errors in promise callbacks, and use Promise.all() with error handling. Always catch promise rejections to prevent uncaught errors.',
            },
            {
              question: 'Why does async/await cause uncaught promise errors?',
              answer: 'Async functions throw errors when promises reject, and these errors must be caught with try-catch. Without try-catch, errors become unhandled promise rejections, causing "Uncaught (in promise)" errors. Always wrap await calls in try-catch blocks to handle errors properly.',
            },
            {
              question: 'How do I handle errors in promise chains?',
              answer: 'Add .catch() at the end of promise chains: promise.then(...).catch(error => console.error(error)), use .catch() for each promise in Promise.all(), handle errors in .then() callbacks, and return rejected promises to propagate errors. Always have error handling in promise chains.',
            },
            {
              question: 'What is the difference between caught and uncaught promise rejections?',
              answer: 'Caught rejections are handled with .catch() or try-catch, preventing errors from breaking execution. Uncaught rejections are not handled, causing "Uncaught (in promise)" errors and potentially breaking application flow. Always catch promise rejections to prevent uncaught errors.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            We earn commissions when you shop through the links below.
          </p>
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is "Uncaught (in promise)" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Uncaught (in promise)"</strong> is a JavaScript error that occurs when a promise is rejected but the rejection is not caught or handled. This error indicates that a promise failed (rejected) but no error handler (<code className="bg-gray-100 px-1 rounded">.catch()</code> or <code className="bg-gray-100 px-1 rounded">try-catch</code>) was present to handle the rejection.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When promises reject without error handling, JavaScript throws "Uncaught (in promise)" errors to indicate unhandled promise rejections. This is different from regular errors because promise rejections can occur asynchronously, and if not caught, they become unhandled rejections that can break application flow.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error is common in JavaScript development when working with promises, async/await, API calls, or any asynchronous operations. Understanding and fixing "Uncaught (in promise)" errors is essential for writing robust JavaScript code that properly handles asynchronous errors.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Uncaught (in promise)" occurs when promises reject without error handling. The solution is to add .catch() to promise chains, use try-catch with async/await, and always handle promise rejections to prevent uncaught errors.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Promise Rejections</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Uncaught (in promise)" involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Promise Rejection
                </h3>
                <p className="text-gray-700 text-sm mb-2">Promises can reject (fail) when errors occur, operations fail, or reject() is called. Rejected promises need to be handled with .catch() or try-catch. Unhandled rejections become "Uncaught (in promise)" errors. Promise rejections are asynchronous errors that must be caught.</p>
                <p className="text-gray-600 text-xs">Example: fetch() rejects when network fails, causing uncaught error if not handled</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  Error Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">Promise rejections must be caught with .catch() in promise chains or try-catch in async/await. Missing error handling causes uncaught rejections. Error handling prevents "Uncaught (in promise)" errors by catching and processing rejections properly.</p>
                <p className="text-gray-600 text-xs">Example: promise.then(...).catch(error =&gt; handle error) prevents uncaught rejection</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-600" />
                  Async/Await Errors
                </h3>
                <p className="text-gray-700 text-sm mb-2">Async functions throw errors when promises reject, and these errors must be caught with try-catch. Without try-catch, errors become unhandled promise rejections, causing "Uncaught (in promise)" errors. Async/await requires explicit error handling.</p>
                <p className="text-gray-600 text-xs">Example: await fetch() throws error that must be caught with try-catch</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Promise Chains
                </h3>
                <p className="text-gray-700 text-sm mb-2">Promise chains (.then().then()) need .catch() at the end to handle rejections. Missing .catch() in promise chains causes uncaught rejections. All promise chains should end with .catch() to handle any errors that occur in the chain.</p>
                <p className="text-gray-600 text-xs">Example: promise.then(...).then(...).catch(error =&gt; handle) catches all errors</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding promise rejections, error handling, async/await errors, and promise chains is key to fixing "Uncaught (in promise)" errors. The main issue is missing error handling for promise rejections.
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
              "Uncaught (in promise)" occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing .catch() in Promise Chains</h3>
                  <p className="text-gray-700 text-sm">When promise chains don't have .catch() at the end, rejections become uncaught. Promise chains like promise.then(...).then(...) need .catch() to handle errors. Missing .catch() causes "Uncaught (in promise)" errors when promises reject.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Unhandled async/await Errors</h3>
                  <p className="text-gray-700 text-sm">When async functions throw errors without try-catch blocks, errors become unhandled promise rejections. await calls that fail need try-catch to handle errors. Missing try-catch in async/await causes "Uncaught (in promise)" errors.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Call Failures</h3>
                  <p className="text-gray-700 text-sm">When API calls (fetch, axios) fail and errors aren't caught, promises reject without handling. Network errors, 404s, 500s cause promise rejections that need error handling. Missing error handling in API calls causes uncaught rejections.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Promise.all() Without Error Handling</h3>
                  <p className="text-gray-700 text-sm">When Promise.all() contains promises that reject and errors aren't caught, rejections become uncaught. Promise.all() rejects if any promise rejects, requiring error handling. Missing .catch() on Promise.all() causes uncaught rejections.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> "Uncaught (in promise)" is most common with missing .catch() in promise chains, unhandled async/await errors, API call failures, and Promise.all() without error handling. The main issue is missing error handling for promise rejections.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix "Uncaught (in promise)" Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Uncaught (in promise)" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Add .catch() to Promise Chains</h3>
              <p className="text-gray-700 mb-4">Always add .catch() at the end of promise chains:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Missing .catch() - Wrong</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: No error handling
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
// Uncaught (in promise) if fetch fails

// ✅ Correct: Add .catch()
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error('Error:', error);
    // Handle error properly
  });

// ✅ Better: Handle specific errors
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    console.error('Fetch error:', error);
    // Show user-friendly error message
  });`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use try-catch with async/await</h3>
              <p className="text-gray-700 mb-4">Always wrap await calls in try-catch:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Missing try-catch - Wrong</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: No error handling
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
  // Uncaught (in promise) if fetch fails
}

// ✅ Correct: Use try-catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw or return default
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
    return []; // Return default instead of throwing
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Handle Promise.all() Errors</h3>
              <p className="text-gray-700 mb-4">Always add error handling to Promise.all():</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Promise.all() Error Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Wrong: No error handling
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
]).then(responses => {
  // Uncaught (in promise) if any fetch fails
});

// ✅ Correct: Add .catch()
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => console.log(data))
  .catch(error => {
    console.error('Error:', error);
    // Handle error
  });

// ✅ Better: Handle individual errors
async function fetchMultiple() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/posts')
    ]);
    
    if (!usersResponse.ok || !postsResponse.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const [users, posts] = await Promise.all([
      usersResponse.json(),
      postsResponse.json()
    ]);
    
    return { users, posts };
  } catch (error) {
    console.error('Error:', error);
    return { users: [], posts: [] }; // Return defaults
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Global Promise Rejection Handler</h3>
              <p className="text-gray-700 mb-4">Add global handler for unhandled rejections (development only):</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Global Error Handler</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Development: Catch all unhandled rejections
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default error logging
  // Log to error tracking service
});

// Node.js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log to error tracking service
});

// Note: This is for debugging, not a replacement for proper error handling
// Always add .catch() or try-catch to promises`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always add .catch() to promise chains, use try-catch with async/await, handle Promise.all() errors, and provide user-friendly error messages. Never leave promises without error handling. Test error scenarios to ensure errors are caught properly.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why "Uncaught (in promise)" Happens</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Uncaught (in promise)" happens for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Asynchronous Error Handling
                </h3>
                <p className="text-gray-700 text-sm">Promise rejections are asynchronous and don't follow normal error propagation. Rejections must be explicitly caught with .catch() or try-catch. Without explicit handling, rejections become uncaught, causing "Uncaught (in promise)" errors. Asynchronous errors require explicit handling.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  Missing Error Handlers
                </h3>
                <p className="text-gray-700 text-sm">Code often assumes promises won't fail or forgets to add error handling. Missing .catch() in promise chains or try-catch in async/await causes uncaught rejections. Error handlers are required for promises, unlike synchronous code where errors propagate automatically.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-600" />
                  Promise Behavior
                </h3>
                <p className="text-gray-700 text-sm">Promises can reject for various reasons (network errors, API failures, validation errors), and these rejections must be handled. Unhandled rejections don't break execution immediately but cause "Uncaught (in promise)" errors. Promise behavior requires explicit error handling.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Error Propagation
                </h3>
                <p className="text-gray-700 text-sm">Promise rejections don't propagate like synchronous errors. They must be caught explicitly, otherwise they become uncaught. Error propagation in promises is different from synchronous code, requiring developers to explicitly handle rejections to prevent uncaught errors.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> "Uncaught (in promise)" happens due to asynchronous error handling, missing error handlers, promise behavior, and error propagation differences. The solution is to always add .catch() to promises, use try-catch with async/await, and handle all promise rejections explicitly.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What causes "Uncaught (in promise)" error?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when a promise is rejected but the rejection is not caught with .catch() or try-catch. Common causes include: missing .catch() on promise chains, unhandled async/await errors, promises that reject without error handling, and errors in promise callbacks that aren't caught. Unhandled promise rejections cause this error.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix uncaught promise rejection?</h3>
                <p className="text-gray-700 leading-relaxed">Add .catch() to promise chains: promise.then(...).catch(error =&gt; handle error), use try-catch with async/await: try {'{'} await promise; {'}'} catch (error) {'{'} handle error {'}'}, handle errors in promise callbacks, and use Promise.all() with error handling. Always catch promise rejections to prevent uncaught errors.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does async/await cause uncaught promise errors?</h3>
                <p className="text-gray-700 leading-relaxed">Async functions throw errors when promises reject, and these errors must be caught with try-catch. Without try-catch, errors become unhandled promise rejections, causing "Uncaught (in promise)" errors. Always wrap await calls in try-catch blocks to handle errors properly.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle errors in promise chains?</h3>
                <p className="text-gray-700 leading-relaxed">Add .catch() at the end of promise chains: promise.then(...).catch(error =&gt; console.error(error)), use .catch() for each promise in Promise.all(), handle errors in .then() callbacks, and return rejected promises to propagate errors. Always have error handling in promise chains.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between caught and uncaught promise rejections?</h3>
                <p className="text-gray-700 leading-relaxed">Caught rejections are handled with .catch() or try-catch, preventing errors from breaking execution. Uncaught rejections are not handled, causing "Uncaught (in promise)" errors and potentially breaking application flow. Always catch promise rejections to prevent uncaught errors.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Uncaught (in promise)&quot; Error in JavaScript Explained"
            description="Complete Guide to Fixing Unhandled Promise Rejections (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Uncaught in promise Error Guide" />
        </section>
      </main>
    </div>
  );
}
