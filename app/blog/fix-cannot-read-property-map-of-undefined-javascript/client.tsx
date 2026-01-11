'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Bug } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixCannotReadPropertyMapOfUndefinedJavaScriptClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-rose-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Cannot Read Property 'map' of Undefined" in JavaScript</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing Map Undefined Error (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What does "Cannot read property \'map\' of undefined" mean?',
              answer: 'This error occurs when you try to call the map() method on a variable that is undefined. The map() method only works on arrays, so if the variable is undefined, null, or not an array, calling map() will throw this error. This commonly happens with API responses, state variables, or data that hasn\'t loaded yet.',
            },
            {
              question: 'How do I fix "Cannot read property \'map\' of undefined" error?',
              answer: 'Use optional chaining (?.) or provide a default empty array: array?.map() or (array || []).map(). Always check if the variable exists and is an array before calling map(). Use Array.isArray() to verify, or provide a fallback empty array to prevent the error.',
            },
            {
              question: 'Why does map() fail on undefined in JavaScript?',
              answer: 'The map() method is only available on arrays. When you call map() on undefined, JavaScript cannot find the map property because undefined doesn\'t have any properties. This is a type error that occurs when the expected array doesn\'t exist or hasn\'t been initialized.',
            },
            {
              question: 'How do I prevent this error in React?',
              answer: 'Initialize state with an empty array: const [items, setItems] = useState([]). Use optional chaining: items?.map(). Provide default values: (items || []).map(). Check data before rendering: {items && items.map()}. Always handle loading states and undefined data.',
            },
            {
              question: 'What is the difference between map() and forEach() for undefined?',
              answer: 'Both map() and forEach() will throw the same error if called on undefined. The difference is that map() returns a new array, while forEach() returns undefined. Use the same defensive techniques (optional chaining, default values) for both methods.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is the "Cannot Read Property 'map' of Undefined" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Cannot read property 'map' of undefined"</strong> error is a JavaScript runtime error that occurs when you attempt to call the <code className="bg-gray-100 px-1 rounded">map()</code> method on a variable that is <code className="bg-gray-100 px-1 rounded">undefined</code>. The <code className="bg-gray-100 px-1 rounded">map()</code> method is an array method that creates a new array by calling a function on every element of the original array.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error happens because <code className="bg-gray-100 px-1 rounded">map()</code> only exists on arrays. When you try to access <code className="bg-gray-100 px-1 rounded">undefined.map()</code>, JavaScript cannot find the <code className="bg-gray-100 px-1 rounded">map</code> property because <code className="bg-gray-100 px-1 rounded">undefined</code> doesn't have any properties or methods. This is a common error in React applications when rendering lists from API data that hasn't loaded yet.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The error message typically appears as: "TypeError: Cannot read property 'map' of undefined" or "TypeError: Cannot read properties of undefined (reading 'map')". This indicates that the variable you're trying to call <code className="bg-gray-100 px-1 rounded">map()</code> on is <code className="bg-gray-100 px-1 rounded">undefined</code>, not an array.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> The map() method only works on arrays. If you call map() on undefined, null, or any non-array value, JavaScript will throw this error. Always ensure the variable is an array before calling map(), or use defensive programming techniques to handle undefined values.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding the Map Undefined Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Cannot read property 'map' of undefined" error involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Array Methods
                </h3>
                <p className="text-gray-700 text-sm mb-2">The <code className="bg-gray-100 px-1 rounded">map()</code> method is an array method that creates a new array by applying a function to each element. It only exists on arrays, not on other data types like objects, strings, or undefined values.</p>
                <p className="text-gray-600 text-xs">Example: [1, 2, 3].map(x =&gt; x * 2) returns [2, 4, 6]</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600" />
                  Undefined Values
                </h3>
                <p className="text-gray-700 text-sm mb-2">When a variable is undefined, it has no properties or methods. Trying to access <code className="bg-gray-100 px-1 rounded">undefined.map</code> fails because undefined doesn't have a map property. This commonly happens with uninitialized variables or failed API calls.</p>
                <p className="text-gray-600 text-xs">Undefined means the variable has been declared but not assigned a value</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-600" />
                  Common Causes
                </h3>
                <p className="text-gray-700 text-sm mb-2">This error occurs when: API data hasn't loaded yet, state is not initialized, the variable is conditionally undefined, or the data structure doesn't match expectations. It's most common in React when rendering lists before data is fetched.</p>
                <p className="text-gray-600 text-xs">Most common: Trying to map over API response before it loads</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Error Prevention
                </h3>
                <p className="text-gray-700 text-sm mb-2">Prevent this error by: Initializing variables with empty arrays, using optional chaining (?.), providing default values, checking if data exists before mapping, and handling loading states properly. Always validate data before calling array methods.</p>
                <p className="text-gray-600 text-xs">Best practice: Always provide fallback empty arrays</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding that map() only works on arrays is crucial. Always ensure your variable is an array before calling map(), or use defensive programming to handle undefined, null, or non-array values gracefully.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When Does This Error Occur?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Cannot read property 'map' of undefined" error occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Data Not Loaded</h3>
                  <p className="text-gray-700 text-sm">When you try to map over API response data before the request completes, the variable is undefined. This is the most common scenario in React applications where components render before async data fetching completes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Uninitialized State</h3>
                  <p className="text-gray-700 text-sm">When React state is not initialized with a default value, it starts as undefined. If you try to map over this state before it's set, you'll get this error. Always initialize state with an empty array.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Conditional Undefined</h3>
                  <p className="text-gray-700 text-sm">When a variable is conditionally set to undefined based on some condition, and you try to map over it without checking. This happens with ternary operators or conditional assignments that don't always return arrays.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Wrong Data Structure</h3>
                  <p className="text-gray-700 text-sm">When the API response or data structure doesn't match expectations. For example, expecting an array but receiving an object, or the array is nested deeper than expected. Always validate the data structure before mapping.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> This error most commonly occurs in React applications when trying to render a list from API data that hasn't loaded yet, or when state is not properly initialized with a default empty array.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix the Map Undefined Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix the "Cannot read property 'map' of undefined" error:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Use Optional Chaining (?.)</h3>
              <p className="text-gray-700 mb-4">Optional chaining safely accesses properties that might be undefined:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Optional Chaining</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Instead of this (will error if items is undefined):
items.map(item => <div key={item.id}>{item.name}</div>)

// Use optional chaining:
items?.map(item => <div key={item.id}>{item.name}</div>)

// This safely handles undefined - returns undefined if items is undefined
// No error is thrown`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">With Default Value</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Combine optional chaining with nullish coalescing:
const result = items?.map(item => item.name) ?? [];

// Or provide default in the map call:
(items || []).map(item => <div key={item.id}>{item.name}</div>)

// Both ensure you always have an array to map over`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Initialize State with Empty Array</h3>
              <p className="text-gray-700 mb-4">Always initialize React state with a default empty array:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">React useState with Default</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import { useState, useEffect } from 'react';

function MyComponent() {
  // Initialize with empty array - prevents undefined
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);
  
  // Safe to map - items is always an array
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Conditional Rendering</h3>
              <p className="text-gray-700 mb-4">Check if data exists before mapping:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Check Before Mapping</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Check if array exists and has length
{items && items.length > 0 && items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// Or use Array.isArray() for type safety
{Array.isArray(items) && items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// Show loading state while data is undefined
{items ? (
  items.map(item => <div key={item.id}>{item.name}</div>)
) : (
  <div>Loading...</div>
)}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Provide Default Empty Array</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Default Parameter or Fallback</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Function with default parameter
function renderItems(items = []) {
  return items.map(item => <div key={item.id}>{item.name}</div>);
}

// Using logical OR operator
const safeItems = items || [];
safeItems.map(item => <div key={item.id}>{item.name}</div>);

// Using nullish coalescing
const safeItems = items ?? [];
safeItems.map(item => <div key={item.id}>{item.name}</div>);

// Destructuring with default
const { items = [] } = data;
items.map(item => <div key={item.id}>{item.name}</div>);`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 5: Handle API Responses Safely</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Safe API Data Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Always validate API response
async function fetchItems() {
  try {
    const response = await fetch('/api/items');
    const data = await response.json();
    
    // Ensure data is an array
    const items = Array.isArray(data) ? data : [];
    setItems(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    setItems([]); // Set empty array on error
  }
}

// Or handle nested data
const items = data?.items || [];
items.map(item => <div key={item.id}>{item.name}</div>);`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always initialize state with empty arrays, use optional chaining for safe property access, provide default values, and validate data before calling array methods. Handle loading states and errors gracefully to prevent undefined values.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why This Error Occurs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Cannot read property 'map' of undefined" error occurs for several important reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Method Availability
                </h3>
                <p className="text-gray-700 text-sm">The map() method only exists on arrays. When you call map() on undefined, JavaScript cannot find the method because undefined has no properties. This is a fundamental JavaScript behavior - methods are properties of objects, and undefined has no properties.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Asynchronous Operations
                </h3>
                <p className="text-gray-700 text-sm">JavaScript is asynchronous, meaning code can execute before data is available. When you try to map over API data before it loads, the variable is still undefined. This is especially common in React where components render before async operations complete.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-purple-600" />
                  Type Safety
                </h3>
                <p className="text-gray-700 text-sm">JavaScript is dynamically typed, so variables can be any type. Without type checking, you might assume a variable is an array when it's actually undefined. This error helps catch type mismatches, but defensive programming prevents it.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-orange-600" />
                  Common Pattern
                </h3>
                <p className="text-gray-700 text-sm">Mapping over arrays is a very common pattern in JavaScript and React. When combined with async data fetching, this error becomes frequent. Understanding why it happens helps you write more robust code that handles edge cases properly.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> This error is a type error that occurs when JavaScript cannot find the map property on undefined. It's a common error in modern JavaScript applications, especially with async operations and React. Understanding why it happens helps you prevent it with defensive programming.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What does "Cannot read property 'map' of undefined" mean?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when you try to call the <code className="bg-gray-100 px-1 rounded">map()</code> method on a variable that is undefined. The <code className="bg-gray-100 px-1 rounded">map()</code> method only works on arrays, so if the variable is undefined, null, or not an array, calling <code className="bg-gray-100 px-1 rounded">map()</code> will throw this error. This commonly happens with API responses, state variables, or data that hasn't loaded yet.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix "Cannot read property 'map' of undefined" error?</h3>
                <p className="text-gray-700 leading-relaxed">Use optional chaining (<code className="bg-gray-100 px-1 rounded">?.</code>) or provide a default empty array: <code className="bg-gray-100 px-1 rounded">array?.map()</code> or <code className="bg-gray-100 px-1 rounded">(array || []).map()</code>. Always check if the variable exists and is an array before calling <code className="bg-gray-100 px-1 rounded">map()</code>. Use <code className="bg-gray-100 px-1 rounded">Array.isArray()</code> to verify, or provide a fallback empty array to prevent the error.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does map() fail on undefined in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">The <code className="bg-gray-100 px-1 rounded">map()</code> method is only available on arrays. When you call <code className="bg-gray-100 px-1 rounded">map()</code> on undefined, JavaScript cannot find the <code className="bg-gray-100 px-1 rounded">map</code> property because undefined doesn't have any properties. This is a type error that occurs when the expected array doesn't exist or hasn't been initialized.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I prevent this error in React?</h3>
                <p className="text-gray-700 leading-relaxed">Initialize state with an empty array: <code className="bg-gray-100 px-1 rounded">const [items, setItems] = useState([])</code>. Use optional chaining: <code className="bg-gray-100 px-1 rounded">items?.map()</code>. Provide default values: <code className="bg-gray-100 px-1 rounded">(items || []).map()</code>. Check data before rendering: <code className="bg-gray-100 px-1 rounded">{'{items && items.map()}'}</code>. Always handle loading states and undefined data.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between map() and forEach() for undefined?</h3>
                <p className="text-gray-700 leading-relaxed">Both <code className="bg-gray-100 px-1 rounded">map()</code> and <code className="bg-gray-100 px-1 rounded">forEach()</code> will throw the same error if called on undefined. The difference is that <code className="bg-gray-100 px-1 rounded">map()</code> returns a new array, while <code className="bg-gray-100 px-1 rounded">forEach()</code> returns undefined. Use the same defensive techniques (optional chaining, default values) for both methods.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Cannot Read Property Map of Undefined Guide" />
        </section>
      </main>
    </div>
  );
}
