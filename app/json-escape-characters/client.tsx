'use client';

import Link from 'next/link';
import { ArrowLeft, Code2, ExternalLink } from 'lucide-react';

export default function JsonEscapeCharactersClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-100 rounded-lg">
              <Code2 className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON Escape Characters — Complete Reference Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Every JSON escape sequence with examples and common mistake fixes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              JSON strings have strict rules about which characters must be escaped. A single unescaped backslash or literal
              newline inside a string will cause a parse error in every JSON parser. This guide covers every required escape
              sequence, common mistakes, and how to fix them.
            </p>
          </section>

          {/* Reference Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON Escape Character Reference Table</h2>
            <p className="text-gray-700 mb-4">
              The JSON specification (RFC 8259) requires these characters to be escaped inside string values:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Character</th>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Escaped Form</th>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Example JSON String</th>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Result Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Double quote "', '\\"', '"say \\"hello\\""', 'say "hello"'],
                    ['Backslash \\', '\\\\', '"C:\\\\Users\\\\name"', 'C:\\Users\\name'],
                    ['Forward slash /', '\\/', '"http:\\/\\/example.com"', 'http://example.com'],
                    ['Newline', '\\n', '"line1\\nline2"', 'line1↵line2'],
                    ['Carriage return', '\\r', '"line1\\r\\nline2"', 'line1⏎line2'],
                    ['Tab', '\\t', '"col1\\tcol2"', 'col1→col2'],
                    ['Form feed', '\\f', '"page1\\fpage2"', 'page1[FF]page2'],
                    ['Backspace', '\\b', '"abc\\bx"', 'abx (erases c)'],
                    ['Unicode', '\\uXXXX', '"\\u20AC100"', '€100'],
                  ].map(([char, escaped, example, result], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="p-3 border-t border-gray-200 font-medium text-gray-800">{char}</td>
                      <td className="p-3 border-t border-gray-200 font-mono text-sky-700 font-semibold">{escaped}</td>
                      <td className="p-3 border-t border-gray-200 font-mono text-gray-600 text-xs">{example}</td>
                      <td className="p-3 border-t border-gray-200 text-gray-600 text-xs">{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Note: Forward slash escaping (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\/</code>) is
              optional in JSON but useful when embedding JSON in HTML to avoid
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">&lt;/script&gt;</code> injection.
            </p>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes</h2>

            {/* Mistake 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Using Single Quotes Instead of Double Quotes</h3>
              <p className="text-gray-700 mb-3">
                JSON only recognizes double quotes for strings. Single quotes cause an immediate parse error.
                There is no need to escape single quotes inside JSON strings — they are valid as-is.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{'name': 'Alice', 'city': "New York"}
// SyntaxError: Unexpected token '`}</pre>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-green-800 mb-1">Fixed — all strings in double quotes:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{"name": "Alice", "city": "New York"}`}</pre>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Windows File Paths (Unescaped Backslashes)</h3>
              <p className="text-gray-700 mb-3">
                Windows paths use backslashes. In JSON, every backslash must be doubled. This is the most common
                source of &quot;Invalid escape sequence&quot; errors in config files.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "logPath": "C:\\Users\\alice\\logs"
}
// SyntaxError: Invalid escape sequence '\\U'`}</pre>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-green-800 mb-1">Fixed — double every backslash:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "logPath": "C:\\\\Users\\\\alice\\\\logs"
}
// Parsed value: C:\Users\alice\logs`}</pre>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Multi-line Strings (Literal Newlines)</h3>
              <p className="text-gray-700 mb-3">
                JSON strings cannot contain literal newlines (pressing Enter inside the string). Use
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">\n</code> instead.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                <p className="text-sm font-semibold text-red-800 mb-1">Broken — literal newline in string:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "message": "Hello,
World"
}
// SyntaxError: Unterminated string`}</pre>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-green-800 mb-1">Fixed — use \\n escape:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "message": "Hello,\\nWorld"
}
// Parsed value:
// Hello,
// World`}</pre>
              </div>
            </div>

            {/* Mistake 4 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4. HTML in JSON (Safety Escaping)</h3>
              <p className="text-gray-700 mb-3">
                When embedding JSON in an HTML page, characters like
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">&amp;</code>,
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">&lt;</code>, and
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">&gt;</code> can
                cause XSS issues or HTML parsing problems. Escape them as Unicode sequences.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Character</th>
                      <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Safe Unicode Escape</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-t border-gray-200 font-mono">&amp;</td>
                      <td className="p-3 border-t border-gray-200 font-mono text-sky-700">\u0026</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border-t border-gray-200 font-mono">&lt;</td>
                      <td className="p-3 border-t border-gray-200 font-mono text-sky-700">\u003C</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-t border-gray-200 font-mono">&gt;</td>
                      <td className="p-3 border-t border-gray-200 font-mono text-sky-700">\u003E</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Fix: Windows paths */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix: Windows File Paths in JSON</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken config.json:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "outputDir": "C:\\Users\\alice\\Documents\\output",
  "tempDir": "C:\\Temp\\myapp"
}`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed — each backslash doubled:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "outputDir": "C:\\\\Users\\\\alice\\\\Documents\\\\output",
  "tempDir": "C:\\\\Temp\\\\myapp"
}
// Or use forward slashes — they work on Windows too:
{
  "outputDir": "C:/Users/alice/Documents/output",
  "tempDir": "C:/Temp/myapp"
}`}</pre>
            </div>
          </section>

          {/* Fix: Newlines */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix: Newlines in JSON</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken — literal newline breaks the string:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "body": "Dear Alice,

Thank you for your order.

Best regards"
}
// SyntaxError: Unterminated string in JSON at line 2`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed — use \\n for newlines:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "body": "Dear Alice,\\n\\nThank you for your order.\\n\\nBest regards"
}`}</pre>
            </div>
          </section>

          {/* JavaScript */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JavaScript: JSON.stringify() Handles It For You</h2>
            <p className="text-gray-700 mb-3">
              Never build JSON strings manually with string concatenation.
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">JSON.stringify()</code>
              escapes all required characters automatically.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// All escaping handled automatically
const obj = {
  path: "C:\\Users\\alice",          // backslash
  message: "She said \\"hello\\"",   // double quote
  text: "line1\\nline2",             // newline
  note: "tab\\there",                // tab
};

const json = JSON.stringify(obj, null, 2);
console.log(json);
// {
//   "path": "C:\\\\Users\\\\alice",
//   "message": "She said \\"hello\\"",
//   "text": "line1\\nline2",
//   "note": "tab\\there"
// }

// Safely embed in HTML script tag
const escaped = JSON.stringify(obj)
  .replace(/</g, '\\u003C')
  .replace(/>/g, '\\u003E')
  .replace(/&/g, '\\u0026');`}</pre>
          </section>

          {/* Python */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Python: json.dumps() Handles It For You</h2>
            <p className="text-gray-700 mb-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.dumps()</code> in Python
              correctly escapes all required characters. Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">ensure_ascii=False</code> to
              keep Unicode characters as-is rather than escaping them as <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">\uXXXX</code>.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import json

data = {
    "path": "C:\\\\Users\\\\alice",   # Python raw string or doubled backslash
    "message": 'She said "hello"',    # double quotes inside Python string
    "text": "line1\\nline2",          # newline escape
    "price": "€100",                  # Unicode
}

# json.dumps handles all escaping
output = json.dumps(data, indent=2)
print(output)
# {
#   "path": "C:\\\\Users\\\\alice",
#   "message": "She said \\"hello\\"",
#   "text": "line1\\nline2",
#   "price": "\\u20ac100"         ← default: ASCII-safe
# }

# Keep Unicode characters readable
output_unicode = json.dumps(data, indent=2, ensure_ascii=False)
# "price": "€100"  ← Unicode kept as-is`}</pre>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <ExternalLink className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Auto-fix JSON escape errors online</p>
                <p className="text-blue-100 text-sm mb-3">Paste your JSON and our formatter will highlight and fix escape errors instantly.</p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/json-formatter"
                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                  >
                    Auto-fix JSON escape errors online →
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/json-validator"
                    className="inline-flex items-center gap-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-400 transition-colors border border-blue-400"
                  >
                    Validate JSON →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What characters must be escaped in JSON?</h3>
                <p className="text-gray-700">
                  The required escapes are: double quote
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\&quot;</code>), backslash
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\\</code>), and control characters
                  including newline (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\n</code>), carriage
                  return (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\r</code>), tab
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\t</code>), form feed
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\f</code>), and backspace
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\b</code>).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I escape a backslash in JSON?</h3>
                <p className="text-gray-700">
                  Double it: use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\\</code> in
                  the JSON text to represent one backslash. Windows paths like
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">C:\Users\name</code> must
                  be written as <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">&quot;C:\\\\Users\\\\name&quot;</code> in JSON.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use single quotes in JSON?</h3>
                <p className="text-gray-700">
                  No. JSON strings must use double quotes. Single quotes cause a parse error. There is no need to escape single
                  quotes — they can appear as literal characters inside a double-quoted JSON string.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I include a newline in a JSON string?</h3>
                <p className="text-gray-700">
                  Use the escape sequence <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\n</code>.
                  A literal newline character inside a JSON string is invalid and will cause a parse error. For multi-line text,
                  join all lines with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\n</code> within
                  a single string value.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I escape Unicode characters in JSON?</h3>
                <p className="text-gray-700">
                  Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\uXXXX</code> with the
                  4-digit hex code point (e.g., <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\u20AC</code> for €).
                  In practice, <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">JSON.stringify()</code> and
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">json.dumps()</code> handle
                  this automatically.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format, fix, and beautify JSON online' },
                { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON and find escape errors instantly' },
                { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Beautify minified JSON for readability' },
                { href: '/string-utilities', label: 'String Utilities', desc: 'Encode, decode, and transform strings online' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-sky-500 mt-1 shrink-0 group-hover:text-sky-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-sky-700">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
