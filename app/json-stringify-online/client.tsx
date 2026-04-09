'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Code, Copy, Download, ExternalLink, AlertCircle, Minimize2, ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import FAQSchema from '@/components/FAQSchema';
import ToolPageShell from '@/components/tools/ToolPageShell';

export default function JsonStringifyOnlineClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [spaces, setSpaces] = useState(2);
  const [error, setError] = useState('');

  // Live stats
  const outputStats = useMemo(() => {
    if (!output || !input) return null;
    const minified = output.replace(/\s+/g, '').length;
    const savings = input.length > 0 ? ((1 - minified / input.length) * 100).toFixed(0) : '0';
    return { inputLen: input.length, outputLen: output.length, minifiedLen: minified, savings };
  }, [input, output]);

  const handleStringify = () => {
    trackCtaClick('json_stringify_online', 'stringify');
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
    trackCopy('json_stringify_online');
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

  const handleMinify = () => {
    setError('');
    try {
      let parsed;
      try { parsed = eval(`(${input})`); } catch { parsed = JSON.parse(input); }
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      trackCtaClick('json_stringify_online', 'minify');
      toast.success('Minified!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid input';
      setError(msg);
      toast.error('Failed: ' + msg);
    }
  };

  const handleCopyMinified = () => {
    if (!output) return;
    try {
      const parsed = JSON.parse(output);
      const minified = JSON.stringify(parsed);
      navigator.clipboard.writeText(minified);
      trackCopy('json_stringify_online');
      toast.success('Minified copy copied!');
    } catch { toast.error('Cannot minify output'); }
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
    <ToolPageShell
      showFooterBand={false}
      title="JSON.stringify() Online"
      subtitle="Convert JavaScript objects to JSON strings instantly"
      toolName="json_stringify_online"
      badges={
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          <Code className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          <span>Object → JSON string</span>
        </div>
      }
      tool={
        <>
        <div className="space-y-6">
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
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStringify}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5" />
              Stringify JSON
            </button>
            <button
              onClick={handleMinify}
              className="sm:w-36 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              title="Stringify without any whitespace (compact)"
            >
              <Minimize2 className="w-4 h-4" />
              Minify
            </button>
          </div>

          {/* Live stats */}
          {outputStats && (
            <div className="flex flex-wrap gap-4 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                Input: <strong className="text-slate-800">{outputStats.inputLen.toLocaleString()} chars</strong>
              </span>
              <span>Output: <strong className="text-slate-800">{outputStats.outputLen.toLocaleString()} chars</strong></span>
              <span>Minified: <strong className="text-slate-800">{outputStats.minifiedLen.toLocaleString()} chars</strong></span>
              <button
                onClick={handleCopyMinified}
                className="ml-auto text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Copy minified
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Examples</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  trackCtaClick('json_stringify_online', 'try_example');
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
        </>
      }
      belowCard={
        <>
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

        <article className="max-w-none">
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
        </>
      }
    />
  );
}

