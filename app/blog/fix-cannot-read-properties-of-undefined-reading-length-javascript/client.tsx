'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixCannotReadPropertiesOfUndefinedReadingLengthJavaScriptClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Cannot Read Properties of Undefined (reading 'length')" in JavaScript</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing Undefined Property Errors (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Cannot Read Properties of Undefined (reading 'length')&quot; in JavaScript"
        description="Complete Guide to Fixing Undefined Property Errors (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Cannot read properties of undefined (reading \'length\')" error?',
              answer: 'This error occurs when you try to access the length property on a variable that is undefined. Common causes include: API responses returning undefined instead of arrays, variables not initialized, functions returning undefined, missing null checks, and accessing array properties before data is loaded. The error means you\'re calling .length on undefined, which doesn\'t have a length property.',
            },
            {
              question: 'How do I fix undefined length error in JavaScript?',
              answer: 'Use optional chaining: array?.length, add null/undefined checks: if (array && array.length), use default values: (array || []).length, initialize variables: let array = [], check API responses before accessing length, and use defensive programming. Always verify data exists before accessing properties.',
            },
            {
              question: 'What is optional chaining and how does it fix this error?',
              answer: 'Optional chaining (?.) safely accesses properties on potentially undefined/null objects. array?.length returns undefined if array is undefined, instead of throwing an error. Use optional chaining: array?.length ?? 0 to get 0 for undefined arrays. It prevents errors when accessing nested properties on undefined objects.',
            },
            {
              question: 'How do I check if an array exists before accessing length?',
              answer: 'Check with: if (array && Array.isArray(array) && array.length > 0), use optional chaining: array?.length, use nullish coalescing: (array ?? []).length, or check with typeof: if (typeof array !== \'undefined\' && array !== null). Always verify arrays exist and are actually arrays before accessing length.',
            },
            {
              question: 'Why does my API response cause undefined length errors?',
              answer: 'API responses may return undefined, null, or non-array values when errors occur, data doesn\'t exist, or responses are malformed. Always check API responses: if (response && Array.isArray(response.data)) before accessing response.data.length. Handle API errors and validate response structure before accessing properties.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            All products are independently selected and reviewed by CNN Underscored editors. When you buy through links on our site, we may earn a commission.
          </p>
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is "Cannot Read Properties of Undefined (reading 'length')" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Cannot read properties of undefined (reading 'length')"</strong> is a JavaScript error that occurs when you try to access the <code className="bg-gray-100 px-1 rounded">length</code> property on a variable that is <code className="bg-gray-100 px-1 rounded">undefined</code>. This error happens because <code className="bg-gray-100 px-1 rounded">undefined</code> doesn't have any properties, so attempting to read <code className="bg-gray-100 px-1 rounded">.length</code> from it throws a TypeError.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The error typically occurs when code expects an array or string but receives <code className="bg-gray-100 px-1 rounded">undefined</code> instead. This can happen when API responses return undefined, variables are not initialized, functions return undefined, or data hasn't loaded yet. The error message indicates that JavaScript tried to access the <code className="bg-gray-100 px-1 rounded">length</code> property on something that doesn't exist.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error is common in JavaScript development, especially when working with API responses, asynchronous data loading, or when variables may not be initialized. Understanding and fixing this error is essential for writing robust JavaScript code that handles undefined values properly.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Cannot read properties of undefined (reading 'length')" occurs when accessing .length on undefined. The solution is to check if the variable exists before accessing its properties, use optional chaining, or provide default values.
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
              The "Cannot read properties of undefined (reading 'length')" error involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Undefined Variables
                </h3>
                <p className="text-gray-700 text-sm mb-2">Variables that are declared but not initialized, or functions that return undefined, cause this error when you try to access their properties. Undefined means "no value assigned", so accessing properties on undefined throws errors.</p>
                <p className="text-gray-600 text-xs">Example: let arr; arr.length throws "Cannot read properties of undefined"</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  API Responses
                </h3>
                <p className="text-gray-700 text-sm mb-2">API responses may return undefined, null, or non-array values when errors occur, data doesn't exist, or responses are malformed. Accessing .length on undefined API responses causes this error. Always validate API responses before accessing properties.</p>
                <p className="text-gray-600 text-xs">Example: response.data.length fails when response.data is undefined</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Asynchronous Data Loading
                </h3>
                <p className="text-gray-700 text-sm mb-2">When data loads asynchronously (fetch, promises, async/await), variables may be undefined until data arrives. Accessing .length before data loads causes this error. Always check if data exists after async operations complete.</p>
                <p className="text-gray-600 text-xs">Example: Accessing array.length before fetch() completes returns undefined</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Property Access
                </h3>
                <p className="text-gray-700 text-sm mb-2">Accessing properties (like .length) on undefined values throws TypeError. JavaScript requires objects to exist before accessing their properties. The error occurs at the point of property access, not when the variable becomes undefined.</p>
                <p className="text-gray-600 text-xs">Example: undefined.length throws "Cannot read properties of undefined"</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding undefined variables, API responses, asynchronous data loading, and property access is key to fixing this error. The main issue is accessing properties on undefined values without checking if they exist first.
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
                  <h3 className="font-semibold text-gray-900 mb-1">Uninitialized Variables</h3>
                  <p className="text-gray-700 text-sm">When variables are declared but not initialized (let arr;), or when functions return undefined, accessing .length on these variables causes the error. Always initialize variables with default values (let arr = []) to prevent this.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Response Handling</h3>
                  <p className="text-gray-700 text-sm">When API responses return undefined, null, or non-array values, accessing .length on these responses causes the error. API errors, empty responses, or malformed data can return undefined instead of arrays.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Asynchronous Data Access</h3>
                  <p className="text-gray-700 text-sm">When accessing array properties before asynchronous operations (fetch, promises) complete, variables may be undefined, causing the error. Always wait for async operations to complete before accessing properties.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing Null Checks</h3>
                  <p className="text-gray-700 text-sm">When code doesn't check if variables exist before accessing their properties, undefined values cause errors. Missing null/undefined checks are the most common cause of this error in JavaScript applications.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> This error is most common with uninitialized variables, API response handling, asynchronous data access, and missing null checks. The main issue is accessing .length on undefined without verifying the variable exists first.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix the Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Cannot read properties of undefined (reading 'length')" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Use Optional Chaining</h3>
              <p className="text-gray-700 mb-4">Use optional chaining (?.) to safely access properties:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Optional Chaining with Nullish Coalescing</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Error: Cannot read properties of undefined
const length = array.length;

// ✅ Safe: Optional chaining returns undefined if array is undefined
const length = array?.length;

// ✅ Better: Provide default value
const length = array?.length ?? 0;

// ✅ Best: Check if array exists and is array
const length = Array.isArray(array) ? array.length : 0;

// Example usage
function processItems(items) {
  const count = items?.length ?? 0;
  console.log(\`Processing \${count} items\`);
  
  if (items && items.length > 0) {
    items.forEach(item => console.log(item));
  }
}

processItems(undefined); // Works: count is 0
processItems([]); // Works: count is 0
processItems([1, 2, 3]); // Works: count is 3`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Add Null/Undefined Checks</h3>
              <p className="text-gray-700 mb-4">Check if variables exist before accessing properties:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Defensive Programming</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Error: No check
function getArrayLength(arr) {
  return arr.length; // Fails if arr is undefined
}

// ✅ Safe: Check before access
function getArrayLength(arr) {
  if (arr && Array.isArray(arr)) {
    return arr.length;
  }
  return 0;
}

// ✅ Better: Multiple checks
function getArrayLength(arr) {
  if (arr === null || arr === undefined) {
    return 0;
  }
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.length;
}

// ✅ Best: Early return pattern
function processArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return; // Early return if invalid
  }
  
  // Safe to use arr.length here
  console.log(\`Processing \${arr.length} items\`);
  arr.forEach(item => processItem(item));
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Handle API Responses</h3>
              <p className="text-gray-700 mb-4">Validate API responses before accessing properties:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Safe API Response Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Error: No validation
async function fetchUsers() {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data.users.length; // Fails if data.users is undefined
}

// ✅ Safe: Validate response
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    
    // Check if data and data.users exist
    if (data && Array.isArray(data.users)) {
      return data.users.length;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching users:', error);
    return 0;
  }
}

// ✅ Better: Use optional chaining
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data?.users?.length ?? 0;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

// ✅ Best: Comprehensive validation
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Validate structure
    if (!data || typeof data !== 'object') {
      return [];
    }
    
    if (Array.isArray(data.users)) {
      return data.users;
    }
    
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Initialize Variables</h3>
              <p className="text-gray-700 mb-4">Always initialize variables with default values:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Variable Initialization</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Error: Uninitialized variable
let items;
console.log(items.length); // Cannot read properties of undefined

// ✅ Safe: Initialize with default
let items = [];
console.log(items.length); // Works: 0

// ✅ Better: Initialize based on condition
let items = data?.items ?? [];
console.log(items.length); // Always safe

// ✅ Best: Type-safe initialization
function processData(data) {
  // Initialize with default empty array
  const items = Array.isArray(data?.items) ? data.items : [];
  
  // Now safe to use items.length
  if (items.length > 0) {
    items.forEach(item => processItem(item));
  }
  
  return items.length;
}`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always use optional chaining (?.) for safe property access, add null/undefined checks before accessing properties, validate API responses, initialize variables with default values, and use defensive programming patterns. Test with undefined, null, and empty values to catch errors early.
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
              "Cannot read properties of undefined (reading 'length')" happens for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  JavaScript Type System
                </h3>
                <p className="text-gray-700 text-sm">JavaScript allows variables to be undefined, and accessing properties on undefined throws TypeError. Unlike strongly-typed languages, JavaScript doesn't prevent accessing properties on undefined at compile time, causing runtime errors when properties are accessed.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  Dynamic Typing
                </h3>
                <p className="text-gray-700 text-sm">JavaScript's dynamic typing means variables can change types, and values may be undefined at runtime. Code that expects arrays may receive undefined, causing errors when accessing .length. Dynamic typing requires runtime checks to prevent errors.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Asynchronous Operations
                </h3>
                <p className="text-gray-700 text-sm">Asynchronous operations (fetch, promises) may return undefined if errors occur or data doesn't exist. Accessing properties before async operations complete, or when they fail, causes undefined errors. Async code requires proper error handling and validation.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Missing Validation
                </h3>
                <p className="text-gray-700 text-sm">Code often assumes variables exist and are the expected type without validation. Missing null checks, undefined checks, and type validation cause errors when assumptions are wrong. Defensive programming prevents these errors by validating data before use.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> "Cannot read properties of undefined (reading 'length')" happens due to JavaScript's type system, dynamic typing, asynchronous operations, and missing validation. The solution is to use optional chaining, add null checks, validate data, and initialize variables with defaults.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What causes "Cannot read properties of undefined (reading 'length')" error?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when you try to access the length property on a variable that is undefined. Common causes include: API responses returning undefined instead of arrays, variables not initialized, functions returning undefined, missing null checks, and accessing array properties before data is loaded. The error means you're calling .length on undefined, which doesn't have a length property.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix undefined length error in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">Use optional chaining: array?.length, add null/undefined checks: if (array && array.length), use default values: (array || []).length, initialize variables: let array = [], check API responses before accessing length, and use defensive programming. Always verify data exists before accessing properties.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is optional chaining and how does it fix this error?</h3>
                <p className="text-gray-700 leading-relaxed">Optional chaining (?.) safely accesses properties on potentially undefined/null objects. array?.length returns undefined if array is undefined, instead of throwing an error. Use optional chaining: array?.length ?? 0 to get 0 for undefined arrays. It prevents errors when accessing nested properties on undefined objects.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I check if an array exists before accessing length?</h3>
                <p className="text-gray-700 leading-relaxed">Check with: if (array && Array.isArray(array) && array.length &gt; 0), use optional chaining: array?.length, use nullish coalescing: (array ?? []).length, or check with typeof: if (typeof array !== &apos;undefined&apos; && array !== null). Always verify arrays exist and are actually arrays before accessing length.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does my API response cause undefined length errors?</h3>
                <p className="text-gray-700 leading-relaxed">API responses may return undefined, null, or non-array values when errors occur, data doesn't exist, or responses are malformed. Always check API responses: if (response && Array.isArray(response.data)) before accessing response.data.length. Handle API errors and validate response structure before accessing properties.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Cannot Read Properties of Undefined (reading 'length')&quot; in JavaScript"
            description="Complete Guide to Fixing Undefined Property Errors (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Cannot Read Properties of Undefined reading length Guide" />
        </section>
      </main>
    </div>
  );
}
