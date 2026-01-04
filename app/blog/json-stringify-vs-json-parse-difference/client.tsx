'use client';

import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';

export default function JsonStringifyVsJsonParseDifferenceClient() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedExample(null), 2000);
  };

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
              <h1 className="text-3xl font-bold text-gray-900">JSON.stringify() vs JSON.parse()</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Difference Guide</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is the difference between JSON.stringify() and JSON.parse()?',
              answer: 'JSON.stringify() converts JavaScript objects to JSON strings, while JSON.parse() converts JSON strings back to JavaScript objects. They are inverse operations - stringify creates strings, parse creates objects.',
            },
            {
              question: 'When should I use JSON.stringify()?',
              answer: 'Use JSON.stringify() when you need to convert JavaScript objects to strings for sending to APIs, storing in localStorage, or creating JSON files. It\'s essential for data transmission.',
            },
            {
              question: 'When should I use JSON.parse()?',
              answer: 'Use JSON.parse() when you receive JSON strings from APIs, read from localStorage, or load JSON files. It converts the string back into a usable JavaScript object.',
            },
            {
              question: 'Can I use JSON.parse() online?',
              answer: 'Yes! Use our free JSON Parser online tool to parse JSON strings instantly. It validates and converts JSON strings to JavaScript objects with error handling.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <code className="bg-gray-100 px-1 rounded">JSON.stringify()</code> and <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> are 
              two fundamental JavaScript methods for working with JSON data. Understanding their differences is crucial for effective data handling.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this guide, we'll explain when to use each method, how they work together, and provide practical examples. 
              Use our free <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-semibold">JSON.stringify() online tool</Link> and 
              <Link href="/?tab=beautifier" className="text-blue-600 hover:underline font-semibold"> JSON Parser online</Link> to test examples instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">JSON.stringify()</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">JSON.parse()</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Input</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JavaScript Object/Array</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JSON String</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Output</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JSON String</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JavaScript Object/Array</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Use Case</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Sending data, storing data</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Receiving data, reading data</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Direction</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 inline text-blue-600" /> Object → String
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <ArrowLeft className="w-4 h-4 inline text-green-600" /> String → Object
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON.stringify() - Object to String</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>JSON.stringify()</strong> converts JavaScript objects, arrays, or values into JSON strings. 
                This is also known as <strong>JSON serialization</strong>.
              </p>
              <p className="text-sm text-gray-600">
                Use <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-semibold">JSON.stringify() online</Link> to test this instantly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Example: JSON.stringify()</h3>
                <button
                  onClick={() => copyToClipboard(`const obj = { name: "John", age: 30 };\nconst jsonString = JSON.stringify(obj);\nconsole.log(jsonString);\n// Output: '{"name":"John","age":30}'`, 'stringify-example')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copiedExample === 'stringify-example' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
                <code>{`const obj = { name: "John", age: 30 };
const jsonString = JSON.stringify(obj);
console.log(jsonString);
// Output: '{"name":"John","age":30}'`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON.parse() - String to Object</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>JSON.parse()</strong> converts JSON strings back into JavaScript objects or arrays. 
                This is also known as <strong>JSON deserialization</strong> or <strong>unstringify JSON</strong>.
              </p>
              <p className="text-sm text-gray-600">
                Use our <Link href="/?tab=beautifier" className="text-green-600 hover:underline font-semibold">JSON Parser online</Link> to parse JSON strings instantly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Example: JSON.parse()</h3>
                <button
                  onClick={() => copyToClipboard(`const jsonString = '{"name":"John","age":30}';\nconst obj = JSON.parse(jsonString);\nconsole.log(obj);\n// Output: { name: "John", age: 30 }`, 'parse-example')}
                  className="text-green-600 hover:text-green-700"
                >
                  {copiedExample === 'parse-example' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
                <code>{`const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj);
// Output: { name: "John", age: 30 }`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Working Together</h2>
            <p className="text-gray-700 mb-4">
              These methods work together in a complete data flow cycle:
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Create object:</strong> <code className="bg-white px-1 rounded">const obj = {'{'} name: "John" {'}'}</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ArrowRight className="w-6 h-6 text-blue-600 ml-4" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Stringify:</strong> <code className="bg-white px-1 rounded">JSON.stringify(obj)</code> → <code className="bg-white px-1 rounded">{'\''}{'{'}"name":"John"{'}'}{'\''}</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ArrowRight className="w-6 h-6 text-gray-400 ml-4" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Send/Store:</strong> API request, localStorage, file, etc.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ArrowRight className="w-6 h-6 text-green-600 ml-4" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Parse:</strong> <code className="bg-white px-1 rounded">JSON.parse(jsonString)</code> → <code className="bg-white px-1 rounded">{'{'} name: "John" {'}'}</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">JSON.stringify() Use Cases</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Sending data to API (fetch, axios)</li>
                  <li>Storing in localStorage</li>
                  <li>Creating JSON files</li>
                  <li>Logging objects as strings</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">JSON.parse() Use Cases</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Receiving data from API</li>
                  <li>Reading from localStorage</li>
                  <li>Loading JSON files</li>
                  <li>Parsing JSON strings</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON Serialize Online vs JSON Parse Online</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <p className="text-gray-700 mb-3">
                <strong>JSON Serialize Online</strong> = JSON.stringify() online tools
              </p>
              <p className="text-gray-700 mb-3">
                <strong>JSON Parse Online</strong> = JSON.parse() online tools (also called JSON Parser online)
              </p>
              <p className="text-sm text-gray-600">
                Both are essential for working with JSON data. Use <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-semibold">JSON.stringify() online</Link> to convert objects to strings, 
                and <Link href="/?tab=beautifier" className="text-green-600 hover:underline font-semibold">JSON Parser online</Link> to convert strings back to objects.
              </p>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Try Both Tools Online</h2>
                <p className="text-blue-100">
                  Use our free online tools to test JSON.stringify() and JSON.parse() with any data.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/json-stringify-online"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                JSON.stringify() Tool
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=beautifier"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                JSON Parser Tool
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

