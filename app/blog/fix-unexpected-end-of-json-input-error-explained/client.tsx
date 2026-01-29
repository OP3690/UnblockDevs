'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, FileJson } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixUnexpectedEndOfJsonInputErrorExplainedClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <FileJson className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Unexpected End of JSON Input" Error Explained</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing JSON Parse Errors (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Unexpected End of JSON Input&quot; Error Explained"
        description="Complete Guide to Fixing JSON Parse Errors (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What does "Unexpected end of JSON input" error mean?',
              answer: 'This error occurs when JSON.parse() receives incomplete or empty JSON data. The parser expects valid JSON but encounters the end of the input before finding complete JSON structure. Common causes include empty responses, truncated data, incomplete API responses, or trying to parse empty strings.',
            },
            {
              question: 'How do I fix "Unexpected end of JSON input" error?',
              answer: 'Check if the response is empty before parsing: if (response.trim()) { data = JSON.parse(response) }. Handle empty responses: try { data = JSON.parse(response) } catch(e) { if (e.message.includes("end")) { data = null } }. Verify response content: console.log(response) before parsing. Ensure complete data: wait for full response before parsing. Use optional chaining: JSON.parse(response || "{}").',
            },
            {
              question: 'Why does JSON.parse() fail with empty string?',
              answer: 'JSON.parse() requires valid JSON syntax. An empty string is not valid JSON - it\'s neither an object {} nor an array []. When you try to parse an empty string, the parser reaches the end of input without finding any JSON structure, causing the "Unexpected end of JSON input" error.',
            },
            {
              question: 'How do I handle empty API responses in fetch?',
              answer: 'Check response status and content length before parsing: if (response.ok && response.headers.get("content-length") !== "0") { const data = await response.json() }. Use try-catch: try { const data = await response.json() } catch(e) { if (response.status === 204) { return null } }. Handle 204 No Content responses that have no body. Check response.text() first to see if it\'s empty.',
            },
            {
              question: 'What is the difference between JSON.parse() and response.json()?',
              answer: 'JSON.parse() parses a JSON string, while response.json() is a Fetch API method that reads and parses JSON from a Response object. Both can throw "Unexpected end of JSON input" if the data is incomplete. response.json() automatically handles the response stream, while JSON.parse() requires the full string first.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is the "Unexpected End of JSON Input" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>"Unexpected end of JSON input"</strong> error is a JavaScript error that occurs when <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> or <code className="bg-gray-100 px-1 rounded">response.json()</code> attempts to parse incomplete, empty, or malformed JSON data. The error indicates that the JSON parser reached the end of the input string before finding a complete, valid JSON structure.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error typically appears when trying to parse an empty string, a truncated JSON response, or incomplete data. Valid JSON must be a complete object (<code className="bg-gray-100 px-1 rounded">{"{"}...{"}"}</code>), array (<code className="bg-gray-100 px-1 rounded">[...]</code>), or primitive value. An empty string or incomplete JSON structure causes the parser to fail with this specific error message.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The error message "Unexpected end of JSON input" is thrown by JavaScript's built-in JSON parser when it encounters the end of the input string while still expecting more JSON content. This is different from syntax errors, which occur when JSON has invalid characters or structure. This error specifically indicates that the JSON is incomplete or empty.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> The "Unexpected end of JSON input" error occurs when JSON.parse() receives incomplete or empty data. Valid JSON must be complete - an empty string or truncated JSON will cause this error. Always check if data exists and is complete before parsing.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding the JSON Input Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Unexpected end of JSON input" error involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-blue-600" />
                  JSON Parser
                </h3>
                <p className="text-gray-700 text-sm mb-2">JavaScript's <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> expects complete, valid JSON syntax. It reads the input character by character, building a parse tree. If it reaches the end of input before completing the parse, it throws "Unexpected end of JSON input".</p>
                <p className="text-gray-600 text-xs">Parser expects complete JSON structure (object, array, or primitive)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600" />
                  Empty Input
                </h3>
                <p className="text-gray-700 text-sm mb-2">An empty string is not valid JSON. When you pass an empty string to <code className="bg-gray-100 px-1 rounded">JSON.parse("")</code>, the parser finds nothing to parse and immediately throws the error. This is the most common cause of this error.</p>
                <p className="text-gray-600 text-xs">Empty string: JSON.parse("") throws "Unexpected end of JSON input"</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Incomplete Data
                </h3>
                <p className="text-gray-700 text-sm mb-2">Truncated JSON responses from APIs, network interruptions, or incomplete file reads can cause this error. The parser starts parsing but encounters the end of input before finding closing braces, brackets, or complete values.</p>
                <p className="text-gray-600 text-xs">Example: {"{"} "name": "John" (missing closing brace) causes error</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Error Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">Proper error handling checks if data exists and is complete before parsing. Use try-catch blocks, validate response content, check for empty strings, and handle edge cases like 204 No Content responses that have no body.</p>
                <p className="text-gray-600 text-xs">Always validate data before parsing JSON</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding that JSON.parse() requires complete, valid JSON is crucial. Empty strings, incomplete data, or truncated responses will cause this error. Always validate and check data before attempting to parse JSON.
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
              The "Unexpected end of JSON input" error occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Empty API Responses</h3>
                  <p className="text-gray-700 text-sm">When an API returns an empty response body (like 204 No Content), trying to parse it with response.json() throws this error. Some APIs return empty responses for successful DELETE requests or updates that don't return data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Parsing Empty Strings</h3>
                  <p className="text-gray-700 text-sm">When you try to parse an empty string with JSON.parse(""), the parser finds nothing to parse and immediately throws this error. This happens when variables are initialized as empty strings or when data fetching returns empty content.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Truncated JSON Data</h3>
                  <p className="text-gray-700 text-sm">When JSON data is incomplete due to network issues, file read errors, or response streaming problems, the parser encounters the end of input before finding complete JSON structure. This causes the error.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Error Responses</h3>
                  <p className="text-gray-700 text-sm">When APIs return error responses without JSON body, or when error handlers try to parse non-JSON error messages, this error occurs. Always check response status and content type before parsing.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> This error most commonly occurs when trying to parse empty API responses, empty strings, or incomplete JSON data. It's especially common with fetch() when APIs return 204 No Content or when error responses don't contain JSON.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix the JSON Input Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix the "Unexpected end of JSON input" error:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Check for Empty Response Before Parsing</h3>
              <p className="text-gray-700 mb-4">Always validate that response has content before parsing:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Check Response Text First</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Check if response has content before parsing
async function fetchData() {
  const response = await fetch('/api/data');
  
  // Get response as text first
  const text = await response.text();
  
  // Check if text is empty
  if (!text || text.trim() === '') {
    console.log('Empty response');
    return null;
  }
  
  // Parse only if content exists
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Check Content-Length Header</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchData() {
  const response = await fetch('/api/data');
  
  // Check content length
  const contentLength = response.headers.get('content-length');
  
  if (contentLength === '0' || !contentLength) {
    // Handle empty response
    return null;
  }
  
  // Safe to parse
  return await response.json();
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use Try-Catch with Specific Error Handling</h3>
              <p className="text-gray-700 mb-4">Handle the error gracefully with try-catch:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Catch and Handle Empty JSON</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    // Check if it's the "end of JSON input" error
    if (error.message.includes('end of JSON input') || 
        error.message.includes('Unexpected end')) {
      console.log('Empty or incomplete JSON response');
      return null; // or return {}
    }
    // Re-throw other errors
    throw error;
  }
}`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Handle 204 No Content Responses</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function deleteItem(id) {
  const response = await fetch('/api/items/' + id, {
    method: 'DELETE'
  });
  
  // 204 No Content has no body
  if (response.status === 204) {
    return null; // Success, but no data
  }
  
  // Only parse if there's content
  if (response.headers.get('content-length') !== '0') {
    try {
      return await response.json();
    } catch (error) {
      if (error.message.includes('end of JSON input')) {
        return null;
      }
      throw error;
    }
  }
  
  return null;
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Provide Default Values</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Default Empty Object or Array</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Provide default empty object
function parseJSONSafely(jsonString) {
  try {
    return JSON.parse(jsonString || '{}');
  } catch (error) {
    if (error.message.includes('end of JSON input')) {
      return {}; // Return empty object instead of error
    }
    throw error;
  }
}

// Usage
const data = parseJSONSafely(responseText);

// Or with nullish coalescing
const data = JSON.parse(responseText || '{}');`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Validate JSON String Before Parsing</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Check if String is Valid JSON</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`function isValidJSON(str) {
  if (!str || str.trim() === '') {
    return false;
  }
  
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Use before parsing
const responseText = await response.text();

if (isValidJSON(responseText)) {
  const data = JSON.parse(responseText);
} else {
  console.log('Invalid or empty JSON');
  // Handle accordingly
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 5: Handle Different Response Types</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Check Content-Type Header</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchData() {
  const response = await fetch('/api/data');
  
  // Check content type
  const contentType = response.headers.get('content-type');
  
  // Only parse if it's JSON
  if (contentType && contentType.includes('application/json')) {
    const text = await response.text();
    
    if (text && text.trim()) {
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error('JSON parse error:', error);
        return null;
      }
    }
  }
  
  // Not JSON or empty
  return null;
}`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always check if response has content before parsing, use try-catch to handle errors gracefully, validate JSON strings before parsing, check response status and content-type headers, and provide default values for empty responses. Handle 204 No Content and other empty responses appropriately.
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
              The "Unexpected end of JSON input" error occurs for several important reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-blue-600" />
                  JSON Specification
                </h3>
                <p className="text-gray-700 text-sm">JSON requires complete, valid syntax. An empty string is not valid JSON according to the JSON specification (RFC 8259). The parser expects at least one complete JSON value (object, array, string, number, boolean, or null), not an empty input.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-600" />
                  Parser Behavior
                </h3>
                <p className="text-gray-700 text-sm">JSON.parse() reads input character by character, building a parse tree. When it reaches the end of input before completing the parse (finding closing braces, brackets, or complete values), it throws this error. This is expected parser behavior for incomplete data.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-purple-600" />
                  API Design
                </h3>
                <p className="text-gray-700 text-sm">Many APIs return empty responses for certain operations (DELETE, 204 No Content). When you try to parse these empty responses as JSON, the parser fails. This is a common scenario that requires proper error handling and response validation.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Data Completeness
                </h3>
                <p className="text-gray-700 text-sm">Network issues, streaming problems, or file read errors can result in incomplete JSON data. The parser expects complete JSON but receives truncated data, causing this error. Validating data completeness before parsing prevents this issue.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> This error is a validation error that occurs when JSON.parse() receives incomplete or empty data. It's a common error in modern web development, especially with API integration. Understanding why it happens helps you write more robust code that handles edge cases properly.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What does "Unexpected end of JSON input" error mean?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> receives incomplete or empty JSON data. The parser expects valid JSON but encounters the end of the input before finding complete JSON structure. Common causes include empty responses, truncated data, incomplete API responses, or trying to parse empty strings.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix "Unexpected end of JSON input" error?</h3>
                <p className="text-gray-700 leading-relaxed">Check if the response is empty before parsing: <code className="bg-gray-100 px-1 rounded">if (response.trim()) {"{"} data = JSON.parse(response) {"}"}</code>. Handle empty responses: <code className="bg-gray-100 px-1 rounded">try {"{"} data = JSON.parse(response) {"}"} catch(e) {"{"} if (e.message.includes("end")) {"{"} data = null {"}"} {"}"}</code>. Verify response content: <code className="bg-gray-100 px-1 rounded">console.log(response)</code> before parsing. Ensure complete data: wait for full response before parsing. Use optional chaining: <code className="bg-gray-100 px-1 rounded">JSON.parse(response || "{}")</code>.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does JSON.parse() fail with empty string?</h3>
                <p className="text-gray-700 leading-relaxed"><code className="bg-gray-100 px-1 rounded">JSON.parse()</code> requires valid JSON syntax. An empty string is not valid JSON - it's neither an object <code className="bg-gray-100 px-1 rounded">{"{"}{"}"}</code> nor an array <code className="bg-gray-100 px-1 rounded">[]</code>. When you try to parse an empty string, the parser reaches the end of input without finding any JSON structure, causing the "Unexpected end of JSON input" error.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle empty API responses in fetch?</h3>
                <p className="text-gray-700 leading-relaxed">Check response status and content length before parsing: <code className="bg-gray-100 px-1 rounded">if (response.ok && response.headers.get("content-length") !== "0") {"{"} const data = await response.json() {"}"}</code>. Use try-catch: <code className="bg-gray-100 px-1 rounded">try {"{"} const data = await response.json() {"}"} catch(e) {"{"} if (response.status === 204) {"{"} return null {"}"} {"}"}</code>. Handle 204 No Content responses that have no body. Check <code className="bg-gray-100 px-1 rounded">response.text()</code> first to see if it's empty.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between JSON.parse() and response.json()?</h3>
                <p className="text-gray-700 leading-relaxed"><code className="bg-gray-100 px-1 rounded">JSON.parse()</code> parses a JSON string, while <code className="bg-gray-100 px-1 rounded">response.json()</code> is a Fetch API method that reads and parses JSON from a Response object. Both can throw "Unexpected end of JSON input" if the data is incomplete. <code className="bg-gray-100 px-1 rounded">response.json()</code> automatically handles the response stream, while <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> requires the full string first.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Unexpected End of JSON Input&quot; Error Explained"
            description="Complete Guide to Fixing JSON Parse Errors (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Unexpected End of JSON Input Error Guide" />
        </section>
      </main>
    </div>
  );
}
