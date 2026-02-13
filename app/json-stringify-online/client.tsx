'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, Copy, Download, ExternalLink, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';

export default function JsonStringifyOnlineClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [spaces, setSpaces] = useState(2);
  const [error, setError] = useState('');

  const handleStringify = () => {
    setError('');
    try {
      // Try to parse as JavaScript object/array
      let parsed;
      try {
        parsed = eval(`(${input})`);
      } catch {
        // If eval fails, try JSON.parse
        parsed = JSON.parse(input);
      }

      // Stringify with spaces
      const stringified = JSON.stringify(parsed, null, spaces);
      setOutput(stringified);
      toast.success('Stringified successfully!');
    } catch (err: any) {
      setError(err.message || 'Invalid input');
      toast.error('Failed to stringify: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stringified.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  const examples = [
    {
      name: 'Simple Object',
      input: `{ name: "John", age: 30, city: "New York" }`,
    },
    {
      name: 'Array of Objects',
      input: `[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]`,
    },
    {
      name: 'Nested Object',
      input: `{ user: { name: "John", address: { city: "NYC" } } }`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON.stringify() Online</h1>
              <p className="text-sm text-gray-500 mt-1">Convert JavaScript objects to JSON strings instantly</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is JSON.stringify()?',
              answer: 'JSON.stringify() is a JavaScript method that converts JavaScript objects or values into JSON strings. It\'s useful for sending data to servers, storing data, or converting objects to strings.',
            },
            {
              question: 'How do I use JSON.stringify() online?',
              answer: 'Paste your JavaScript object or array into the input box, set the spacing (for pretty printing), and click "Stringify". The tool will convert it to a JSON string instantly.',
            },
            {
              question: 'Can I pretty print JSON with stringify?',
              answer: 'Yes! Use the spacing parameter (default is 2) to add indentation to the JSON string. Higher values add more spaces for better readability.',
            },
            {
              question: 'What\'s the difference between JSON.stringify() and JSON.parse()?',
              answer: 'JSON.stringify() converts JavaScript objects to JSON strings, while JSON.parse() converts JSON strings back to JavaScript objects. They are inverse operations.',
            },
          ]}
        />

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">JavaScript Object/Array</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSpaces(Math.max(0, spaces - 1))}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded min-w-[3rem] text-center">
                    Spaces: {spaces}
                  </span>
                  <button
                    onClick={() => setSpaces(spaces + 1)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{ name: "John", age: 30 }'
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">JSON String Output</label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1 text-xs bg-green-600 text-white hover:bg-green-700 rounded flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder='{"name":"John","age":30}'
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
              />
            </div>
          </div>
          <button
            onClick={handleStringify}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5" />
            Stringify JSON
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Examples</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(example.input);
                  setError('');
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{example.name}</h3>
                <code className="text-xs text-gray-600 block whitespace-pre-wrap">{example.input}</code>
              </button>
            ))}
          </div>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is JSON.stringify()?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <code className="bg-gray-100 px-1 rounded">JSON.stringify()</code> is a built-in JavaScript method that converts 
              JavaScript objects, arrays, or values into JSON (JavaScript Object Notation) strings. This is essential for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Sending data to web servers via HTTP requests</li>
              <li>Storing data in localStorage or sessionStorage</li>
              <li>Converting objects to strings for transmission</li>
              <li>Creating JSON files from JavaScript data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Use our free <Link href="/?tab=beautifier" className="text-blue-600 hover:underline font-semibold">JSON Beautifier</Link> to format 
              the stringified output, or our <Link href="/?tab=fixer" className="text-blue-600 hover:underline font-semibold">JSON Fixer</Link> to repair any issues.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <code className="text-sm">
                JSON.stringify(value, replacer, space)
              </code>
            </div>
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-1">value</h3>
                <p className="text-sm text-gray-700">The JavaScript object, array, or value to convert to JSON string</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-1">replacer (optional)</h3>
                <p className="text-sm text-gray-700">A function or array to transform values before stringifying</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-1">space (optional)</h3>
                <p className="text-sm text-gray-700">Number of spaces for indentation (0-10) for pretty printing</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Simple Object:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`const obj = { name: "John", age: 30 };
JSON.stringify(obj);
// Output: '{"name":"John","age":30}'`}
                </pre>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">With Pretty Print (spaces = 2):</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`JSON.stringify(obj, null, 2);
// Output:
// {
//   "name": "John",
//   "age": 30
// }`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">More JSON Tools</h2>
                <p className="text-blue-100">
                  Need to parse JSON strings? Use our <Link href="/?tab=beautifier" className="underline font-semibold">JSON Beautifier</Link> or 
                  <Link href="/?tab=fixer" className="underline font-semibold"> JSON Fixer</Link> for validation and repair.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=beautifier"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                JSON Beautifier
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                JSON Fixer
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

