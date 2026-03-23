'use client';

import Link from 'next/link';
import { Code, AlertTriangle, CheckCircle, Wrench, ExternalLink } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

export default function FixJsonParseErrorJavascriptClient() {
  return (
    <ToolPageShell
      title="Fix JSON.parse() Error in JavaScript"
      subtitle="Complete guide with error handling examples"
      toolName="fix_json_parse_error_javascript"
      badges={
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          <Code className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          <span>JavaScript · JSON.parse</span>
        </div>
      }
      belowCard={
        <article className="max-w-none">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> is one of the most commonly used JavaScript functions, 
              but it throws errors when given invalid JSON. Learning how to handle these errors properly is essential for robust applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this guide, we'll show you how to fix <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> errors in JavaScript, 
              with proper error handling examples and our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Fixer tool</Link> 
              to validate JSON before parsing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common JSON.parse() Errors</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-red-900 mb-2">SyntaxError: Unexpected token {'}'} in JSON</h3>
                <p className="text-red-800 text-sm">Usually caused by trailing commas or syntax errors.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-2">
                  <Link href="/blog/fix-unexpected-end-of-json-input-error-explained" className="text-orange-900 hover:text-orange-700 hover:underline">
                    SyntaxError: Unexpected end of JSON input
                  </Link>
                </h3>
                <p className="text-orange-800 text-sm">
                  JSON is incomplete or missing closing braces. <Link href="/blog/fix-unexpected-end-of-json-input-error-explained" className="font-medium underline hover:no-underline">See the full guide</Link>.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-900 mb-2">SyntaxError: Unexpected token &lt; in JSON</h3>
                <p className="text-yellow-800 text-sm">HTML was returned instead of JSON (API error).</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proper Error Handling with Try-Catch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Always wrap <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> in a try-catch block:
            </p>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`try {
  const jsonString = '{"name": "John", "age": 30}';
  const data = JSON.parse(jsonString);
  console.log(data);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('Invalid JSON:', error.message);
    // Use JSON Fixer to fix it
  } else {
    console.error('Unexpected error:', error);
  }
}`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Validate JSON Before Parsing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Validate JSON using our free <Link href="/" className="text-blue-600 hover:underline">JSON Validator</Link> before parsing:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="font-semibold text-blue-900 mb-2">💡 Best Practice:</p>
              <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                <li>Validate JSON using our <Link href="/" className="font-semibold underline">JSON Validator</Link></li>
                <li>If invalid, use our <Link href="/" className="font-semibold underline">JSON Fixer</Link> to repair it</li>
                <li>Then parse the fixed JSON in your code</li>
              </ol>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Fix JSON.parse() Errors Instantly</h2>
                <p className="text-blue-100">
                  Use our free JSON Fixer to validate and repair JSON before using JSON.parse() in your JavaScript code.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try JSON Fixer Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      }
    />
  );
}

