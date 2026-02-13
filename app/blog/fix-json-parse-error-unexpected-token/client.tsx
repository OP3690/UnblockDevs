'use client';

import Link from 'next/link';
import { ArrowLeft, FileJson, AlertTriangle, Code, CheckCircle, AlertCircle, HelpCircle, Clock, Bug, Wrench } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixJsonParseErrorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
              <FileJson className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: JSON Parse Error – Unexpected Token (With Examples)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Troubleshooting JSON Parse Errors (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: JSON Parse Error – Unexpected Token (With Examples)"
        description="Complete Guide to Troubleshooting JSON Parse Errors (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What causes JSON parse error unexpected token?',
              answer: 'JSON parse errors with "unexpected token" occur when the JSON string contains invalid syntax, such as: trailing commas, single quotes instead of double quotes, unescaped special characters, comments in JSON, missing quotes around keys, or invalid characters. The JSON.parse() function expects valid JSON syntax according to the JSON specification.',
            },
            {
              question: 'How do I fix JSON parse error unexpected token?',
              answer: 'To fix JSON parse errors: 1) Validate your JSON using a JSON validator, 2) Remove trailing commas, 3) Ensure all strings use double quotes (not single quotes), 4) Escape special characters properly, 5) Remove comments (JSON doesn\'t support comments), 6) Check for hidden characters or encoding issues, 7) Use try-catch blocks to handle errors gracefully.',
            },
            {
              question: 'Can I use single quotes in JSON?',
              answer: 'No, JSON requires double quotes for strings and keys. Single quotes are not valid JSON syntax. If you have single quotes, replace them with double quotes. Example: single-quoted objects are invalid, use double quotes for all strings and keys instead.',
            },
            {
              question: 'How do I handle JSON parse errors in JavaScript?',
              answer: 'Use try-catch blocks to handle JSON parse errors gracefully. Wrap JSON.parse() in a try block and catch any SyntaxError. In the catch block, log the error message and handle it appropriately. This prevents your application from crashing and allows you to provide user-friendly error messages.',
            },
            {
              question: 'What is a trailing comma in JSON?',
              answer: 'A trailing comma is a comma after the last item in an array or object. JSON doesn\'t allow trailing commas. Example: objects with trailing commas are invalid. Remove the comma. Modern JavaScript allows trailing commas, but JSON.parse() does not.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is a JSON Parse Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>JSON parse error</strong> occurs when JavaScript's <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> function attempts to parse a string that is not valid JSON. The error message "Unexpected token" indicates that the parser encountered a character or sequence of characters that doesn't conform to the JSON specification at a position where it wasn't expected.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON (JavaScript Object Notation) has strict syntax rules: strings must use double quotes, no trailing commas, no comments, and proper escaping of special characters. When these rules are violated, <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> throws a <code className="bg-gray-100 px-1 rounded">SyntaxError</code> with details about what went wrong and where.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common causes include trailing commas, single quotes instead of double quotes, unescaped special characters, comments in JSON, missing quotes around keys, or invalid characters. Understanding JSON syntax rules is essential for fixing these errors.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> JSON has strict syntax rules. The "unexpected token" error indicates the parser found something that doesn't match valid JSON syntax. Always validate JSON before parsing and use try-catch blocks to handle errors gracefully.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileJson className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding JSON Parse Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON parse errors can manifest in different ways:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Unexpected Token Errors
                </h3>
                <p className="text-gray-700 text-sm mb-2">"Unexpected token" errors occur when the parser encounters invalid characters like single quotes, trailing commas, or unescaped special characters. The error message usually indicates the position where the unexpected token was found.</p>
                <p className="text-gray-600 text-xs">Example: Unexpected token ' in JSON at position 5</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-orange-600" />
                  Common Syntax Violations
                </h3>
                <p className="text-gray-700 text-sm mb-2">Common violations include: trailing commas after the last item, single quotes instead of double quotes, comments (// or /* */), unescaped characters, missing quotes around keys, or invalid characters like control characters.</p>
                <p className="text-gray-600 text-xs">JSON is stricter than JavaScript object literals.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Error Object Properties
                </h3>
                <p className="text-gray-700 text-sm mb-2">JSON parse errors are <code className="bg-gray-100 px-1 rounded">SyntaxError</code> objects with properties like <code className="bg-gray-100 px-1 rounded">message</code> (error description) and <code className="bg-gray-100 px-1 rounded">stack</code> (call stack). The message often indicates the position of the error.</p>
                <p className="text-gray-600 text-xs">Error messages help identify the problem location.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  Validation Tools
                </h3>
                <p className="text-gray-700 text-sm mb-2">JSON validators can help identify syntax errors before parsing. Online validators, IDE extensions, or built-in validation can catch errors early. Always validate JSON from external sources before parsing.</p>
                <p className="text-gray-600 text-xs">Validation prevents runtime errors.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> JSON parse errors are syntax errors, not runtime logic errors. They occur when the JSON string doesn't conform to the JSON specification. Always validate JSON before parsing and handle errors gracefully.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When JSON Parse Errors Occur</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON parse errors occur in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Parsing API Responses</h3>
                  <p className="text-gray-700 text-sm">When parsing JSON responses from APIs, errors occur if the response is malformed, contains invalid characters, or isn't actually JSON (e.g., HTML error pages returned as JSON).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Parsing User Input</h3>
                  <p className="text-gray-700 text-sm">When parsing JSON from user input (forms, text areas), errors occur if users enter invalid JSON syntax, use single quotes, add trailing commas, or include comments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Parsing LocalStorage/File Data</h3>
                  <p className="text-gray-700 text-sm">When parsing JSON stored in localStorage, sessionStorage, or files, errors occur if the data was corrupted, manually edited incorrectly, or contains invalid syntax.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Stringifying and Parsing</h3>
                  <p className="text-gray-700 text-sm">When converting objects to JSON strings and back, errors can occur if the string was modified incorrectly, contains circular references (which JSON.stringify can't handle), or includes invalid values.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> JSON parse errors are most common when parsing data from external sources (APIs, user input, files) that may contain invalid JSON syntax or unexpected data formats.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Solutions with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix JSON parse errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Fix Common Syntax Errors</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Remove Trailing Commas</h4>
                <p className="text-gray-700 text-sm mb-2">JSON doesn't allow trailing commas. Remove commas after the last item:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Invalid - trailing comma
const invalid = '{"name": "John", "age": 30,}';
JSON.parse(invalid); // Error: Unexpected token }

// ✅ Valid - no trailing comma
const valid = '{"name": "John", "age": 30}';
JSON.parse(valid); // Works!`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Use Double Quotes (Not Single Quotes)</h4>
                <p className="text-gray-700 text-sm mb-2">JSON requires double quotes for strings and keys:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Invalid - single quotes
const invalid = "{'name': 'John', 'age': 30}";
JSON.parse(invalid); // Error: Unexpected token '

// ✅ Valid - double quotes
const valid = '{"name": "John", "age": 30}';
JSON.parse(valid); // Works!`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Remove Comments</h4>
                <p className="text-gray-700 text-sm mb-2">JSON doesn't support comments. Remove all comments:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Invalid - contains comment
const invalid = '{"name": "John", // user name\\n  "age": 30}';
JSON.parse(invalid); // Error: Unexpected token /

// ✅ Valid - no comments
const valid = '{"name": "John", "age": 30}';
JSON.parse(valid); // Works!`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Escape Special Characters</h4>
                <p className="text-gray-700 text-sm mb-2">Escape special characters in strings properly:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Invalid - unescaped quotes
const invalid = '{"message": "He said "Hello""}';
JSON.parse(invalid); // Error: Unexpected token

// ✅ Valid - escaped quotes
const valid = '{"message": "He said \\"Hello\\""}';
JSON.parse(valid); // Works!

// Or use JSON.stringify for automatic escaping
const obj = {message: 'He said "Hello"'};
const valid2 = JSON.stringify(obj); // Automatically escaped`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use Try-Catch for Error Handling</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Graceful Error Handling</h4>
                <p className="text-gray-700 text-sm mb-2">Always use try-catch blocks when parsing JSON:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`function parseJSONSafely(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data };
  } catch (error) {
    console.error('JSON parse error:', error.message);
    return { 
      success: false, 
      error: error.message,
      position: error.message.match(/position (\\d+)/)?.[1]
    };
  }
}

// Usage
const result = parseJSONSafely('{"invalid": json}');
if (!result.success) {
  console.log('Error at position:', result.position);
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Validate JSON Before Parsing</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Validation Function</h4>
                <p className="text-gray-700 text-sm mb-2">Create a validation function to check JSON before parsing:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Usage
const jsonString = '{"name": "John"}';
if (isValidJSON(jsonString)) {
  const data = JSON.parse(jsonString);
  // Process data
} else {
  console.error('Invalid JSON string');
}

// Or use a more detailed validator
function validateJSON(str) {
  try {
    JSON.parse(str);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      position: error.message.match(/position (\\d+)/)?.[1] || 'unknown'
    };
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Fix Common Issues in API Responses</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Handle Non-JSON Responses</h4>
                <p className="text-gray-700 text-sm mb-2">Check response content type before parsing:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    
    const text = await response.text();
    
    // Validate before parsing
    if (!text.trim()) {
      throw new Error('Empty response');
    }
    
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('JSON parse error:', error.message);
    } else {
      console.error('Fetch error:', error.message);
    }
    throw error;
  }
}`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800 text-sm">
                <strong>Best Practice:</strong> Always validate JSON before parsing, use try-catch blocks for error handling, and check response content types when fetching from APIs. This prevents runtime errors and provides better user experience.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Fix JSON Parse Errors Properly</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fixing JSON parse errors properly is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Prevent Application Crashes
                </h3>
                <p className="text-gray-700 text-sm">Unhandled JSON parse errors can crash your application. Using try-catch blocks and proper error handling ensures your application continues running even when JSON parsing fails, providing better user experience.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-green-600" />
                  Better Error Messages
                </h3>
                <p className="text-gray-700 text-sm">Proper error handling allows you to provide user-friendly error messages instead of cryptic syntax errors. You can guide users to fix their input or explain what went wrong.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Data Integrity
                </h3>
                <p className="text-gray-700 text-sm">Validating JSON before parsing ensures data integrity. You can catch errors early, prevent invalid data from entering your system, and maintain data quality throughout your application.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-orange-600" />
                  Easier Debugging
                </h3>
                <p className="text-gray-700 text-sm">Proper error handling with detailed error messages makes debugging easier. You can identify the exact position of errors, understand what went wrong, and fix issues more quickly.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> JSON parse errors are common but easily preventable. Always validate JSON before parsing, use try-catch blocks, and provide meaningful error messages to users. This improves application reliability and user experience.
              </p>
            </div>
          </section>

          {/* Common Error Examples Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common JSON Parse Error Examples</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 1: Trailing Comma</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Error: Unexpected token } in JSON at position 20
JSON.parse('{"name": "John", "age": 30,}');

// Fix: Remove trailing comma
JSON.parse('{"name": "John", "age": 30}');`}</code></pre>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 2: Single Quotes</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Error: Unexpected token ' in JSON at position 1
JSON.parse("{'name': 'John'}");

// Fix: Use double quotes
JSON.parse('{"name": "John"}');`}</code></pre>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 3: Unescaped Quotes</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Error: Unexpected token in JSON at position 15
JSON.parse('{"message": "He said "Hello""}');

// Fix: Escape quotes
JSON.parse('{"message": "He said \\"Hello\\""}');`}</code></pre>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 4: Comments</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Error: Unexpected token / in JSON at position 15
JSON.parse('{"name": "John" // comment\n}');

// Fix: Remove comments
JSON.parse('{"name": "John"}');`}</code></pre>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use single quotes in JSON?</h3>
                <p className="text-gray-700 leading-relaxed">No, JSON requires double quotes for strings and keys. Single quotes are not valid JSON syntax. If you have single quotes, replace them with double quotes. Example: single-quoted objects are invalid, use double quotes for all strings and keys instead.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a trailing comma in JSON?</h3>
                <p className="text-gray-700 leading-relaxed">A trailing comma is a comma after the last item in an array or object. JSON doesn't allow trailing commas. Example: objects with trailing commas are invalid. Remove the comma. Modern JavaScript allows trailing commas, but <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> does not.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle JSON parse errors in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">Use try-catch blocks to handle JSON parse errors gracefully. Wrap JSON.parse() in a try block and catch any SyntaxError. In the catch block, log the error message and handle it appropriately. This prevents your application from crashing and allows you to provide user-friendly error messages.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can JSON contain comments?</h3>
                <p className="text-gray-700 leading-relaxed">No, JSON does not support comments. Comments (// or /* */) are not valid JSON syntax and will cause parse errors. If you need comments, remove them before parsing, or use a JSON5 parser (which supports comments) if appropriate for your use case.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find the position of a JSON parse error?</h3>
                <p className="text-gray-700 leading-relaxed">The error message from <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> usually includes the position. You can extract it using: <code className="bg-gray-100 px-1 rounded">error.message.match(/position (\\d+)/)?.[1]</code>. This helps identify exactly where the invalid syntax is located in your JSON string.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: JSON Parse Error – Unexpected Token (With Examples)"
            description="Complete Guide to Troubleshooting JSON Parse Errors (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix JSON Parse Error Guide" />
        </section>
      </main>
    </div>
  );
}
