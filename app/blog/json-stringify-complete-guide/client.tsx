'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function JsonStringifyCompleteGuideClient() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const examples = [
    {
      id: 'basic',
      title: 'Basic Object Stringify',
      code: `const obj = { name: "John", age: 30, city: "New York" };
const jsonString = JSON.stringify(obj);
console.log(jsonString);
// Output: '{"name":"John","age":30,"city":"New York"}'`,
    },
    {
      id: 'pretty',
      title: 'Pretty Print with Spaces',
      code: `const obj = { name: "John", age: 30 };
const jsonString = JSON.stringify(obj, null, 2);
console.log(jsonString);
// Output:
// {
//   "name": "John",
//   "age": 30
// }`,
    },
    {
      id: 'array',
      title: 'Stringify Array',
      code: `const arr = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const jsonString = JSON.stringify(arr);
console.log(jsonString);
// Output: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'`,
    },
    {
      id: 'replacer',
      title: 'Using Replacer Function',
      code: `const obj = { name: "John", age: 30, password: "secret123" };
const jsonString = JSON.stringify(obj, (key, value) => {
  if (key === 'password') return undefined; // Exclude password
  return value;
});
console.log(jsonString);
// Output: '{"name":"John","age":30}'`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON.stringify() Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Examples, Syntax & Best Practices</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="JSON.stringify() Complete Guide"
        description="Examples, Syntax & Best Practices"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is JSON.stringify() in JavaScript?',
              answer: 'JSON.stringify() is a built-in JavaScript method that converts JavaScript objects, arrays, or values into JSON strings. It\'s essential for sending data to servers, storing data, and converting objects to strings.',
            },
            {
              question: 'How do I pretty print JSON with stringify?',
              answer: 'Use the third parameter (space) in JSON.stringify(). For example: JSON.stringify(obj, null, 2) will add 2 spaces for indentation, making the JSON string more readable.',
            },
            {
              question: 'What values cannot be stringified?',
              answer: 'Functions, undefined, symbols, and circular references cannot be stringified. Functions and undefined are omitted, symbols are converted to null, and circular references throw an error.',
            },
            {
              question: 'What\'s the difference between JSON.stringify() and JSON.parse()?',
              answer: 'JSON.stringify() converts JavaScript objects to JSON strings, while JSON.parse() converts JSON strings back to JavaScript objects. They are inverse operations of each other.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <code className="bg-gray-100 px-1 rounded">JSON.stringify()</code> is one of the most important methods 
              in JavaScript for working with JSON data. It converts JavaScript objects, arrays, and values into JSON strings, 
              making them ready for transmission, storage, or file output.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this comprehensive guide, we'll cover everything you need to know about <code className="bg-gray-100 px-1 rounded">JSON.stringify()</code>, 
              from basic usage to advanced techniques. Use our free <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-semibold">JSON.stringify() Online tool</Link> to test examples instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-4">
              <code className="text-sm">
                JSON.stringify(value, replacer, space)
              </code>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-1">value (required)</h3>
                <p className="text-sm text-gray-700">The JavaScript object, array, or value to convert to a JSON string</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-1">replacer (optional)</h3>
                <p className="text-sm text-gray-700">A function or array to transform or filter values before stringifying</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-1">space (optional)</h3>
                <p className="text-sm text-gray-700">Number of spaces (0-10) for indentation, or a string for custom indentation</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Examples</h2>
            <div className="space-y-6">
              {examples.map((example) => (
                <div key={example.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{example.title}</h3>
                    <button
                      onClick={() => copyToClipboard(example.code, example.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copiedExample === example.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Sending Data to API</h3>
                <pre className="bg-white p-3 rounded border border-blue-200 text-xs overflow-x-auto mt-2">
{`fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', age: 30 })
});`}
                </pre>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Storing in localStorage</h3>
                <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto mt-2">
{`const user = { name: 'John', preferences: { theme: 'dark' } };
localStorage.setItem('user', JSON.stringify(user));`}
                </pre>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Creating JSON Files</h3>
                <pre className="bg-white p-3 rounded border border-purple-200 text-xs overflow-x-auto mt-2">
{`const data = { users: [{ id: 1, name: 'Alice' }] };
const jsonContent = JSON.stringify(data, null, 2);
// Save to file or download`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Cannot Be Stringified?</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <p className="text-gray-700 mb-3">Some values are automatically handled or excluded:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Functions:</strong> Omitted from output</li>
                <li><strong>undefined:</strong> Omitted from objects, converted to null in arrays</li>
                <li><strong>Symbols:</strong> Omitted from objects, converted to null in arrays</li>
                <li><strong>Circular references:</strong> Throws TypeError</li>
                <li><strong>Date objects:</strong> Converted to ISO string</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON.stringify() Without Newlines</h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
              <p className="text-gray-700 mb-3">
                By default, <code className="bg-white px-1 rounded">JSON.stringify()</code> creates compact JSON without newlines. 
                To remove newlines from pretty-printed JSON, set the space parameter to 0 or omit it:
              </p>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Compact Output (No Newlines)</h3>
                <button
                  onClick={() => copyToClipboard(`const obj = { name: "John", age: 30 };\nconst compact = JSON.stringify(obj);\n// Output: '{"name":"John","age":30}'\n\n// Or explicitly:\nconst noNewlines = JSON.stringify(obj, null, 0);`, 'no-newlines')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copiedExample === 'no-newlines' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
                <code>{`const obj = { name: "John", age: 30 };
const compact = JSON.stringify(obj);
// Output: '{"name":"John","age":30}'

// Or explicitly:
const noNewlines = JSON.stringify(obj, null, 0);`}</code>
              </pre>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Use our <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-semibold">JSON.stringify() online tool</Link> to test 
              with different spacing values (0 for no newlines, 2+ for pretty print).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Pretty Print for Debugging</h3>
                  <p className="text-sm text-gray-700">Use <code className="bg-white px-1 rounded">JSON.stringify(obj, null, 2)</code> to make JSON readable during development</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Filter Sensitive Data</h3>
                  <p className="text-sm text-gray-700">Use replacer function to exclude passwords, tokens, or sensitive information</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Handle Errors</h3>
                  <p className="text-sm text-gray-700">Wrap in try-catch for circular references or large objects that might fail</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Try JSON.stringify() Online</h2>
                <p className="text-blue-100">
                  Use our free online tool to test JSON.stringify() with any JavaScript object. 
                  Supports pretty printing, replacer functions, and instant conversion.
                </p>
              </div>
            </div>
            <Link
              href="/json-stringify-online"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try JSON.stringify() Tool
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}

