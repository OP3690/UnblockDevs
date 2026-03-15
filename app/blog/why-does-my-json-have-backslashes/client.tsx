'use client';

import Link from 'next/link';
import { ArrowLeft, FileJson, HelpCircle, Code, CheckCircle } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function WhyDoesMyJsonHaveBackslashesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <FileJson className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Why Does My JSON Have Backslashes?</h1>
              <p className="text-sm text-gray-500 mt-1">Escaped quotes and backslashes in JSON — explained and fixed</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="Why Does My JSON Have Backslashes?"
        description="Escaped quotes and backslashes in JSON — explained and fixed"
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'Why does my JSON have backslashes?',
              answer: 'JSON uses backslashes to escape special characters inside strings. A backslash before a double quote (\\") means "this quote is part of the string, not the end of it." When you see \\" in JSON, it\'s one escaped quote. When you parse the JSON in code, you get a normal quote — the backslash is not in the final value.',
            },
            {
              question: 'How do I remove backslashes from JSON?',
              answer: 'You usually don’t remove them from the JSON text itself — they are required for valid JSON. If you mean "I have a string that looks like JSON but has extra backslashes," parse it once with JSON.parse() to get the real value; the backslashes are only in the serialized form. If you have double-escaped JSON (e.g. from a log or API), parse twice: JSON.parse(JSON.parse(yourString)).',
            },
            {
              question: 'Why does JSON.stringify add backslashes?',
              answer: 'JSON.stringify() adds backslashes to escape characters that have special meaning in JSON: double quotes, backslashes, and control characters (newline, tab). So a string containing a quote becomes \\" in the output. This keeps the JSON valid and unambiguous.',
            },
            {
              question: 'Is it valid JSON if it has backslashes?',
              answer: 'Yes. Backslashes are valid and required in JSON when you need to represent a quote or backslash inside a string. For example, {"message": "He said \\"Hi\\""} is valid; the backslashes escape the inner quotes so the parser knows where the string ends.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you’ve ever opened a JSON file or API response and seen lots of <strong>backslashes</strong> (<code className="bg-gray-100 px-1 rounded">\</code>) and <strong>escaped quotes</strong> (<code className="bg-gray-100 px-1 rounded">\"</code>), you’re not alone. This is normal — and it’s how JSON stays valid and parseable. Here’s why it happens and how to work with it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-600" />
              Why JSON Uses Backslashes
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In JSON, <strong>strings are wrapped in double quotes</strong>. So what if the string itself contains a double quote? The parser would get confused. JSON solves this with <strong>escaping</strong>: a backslash before a character means “treat this as part of the string, not as syntax.”
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><code className="bg-gray-100 px-1 rounded">\"</code> — escaped quote: the quote is inside the string.</li>
              <li><code className="bg-gray-100 px-1 rounded">\\</code> — escaped backslash: a literal backslash in the string.</li>
              <li><code className="bg-gray-100 px-1 rounded">\n</code> <code className="bg-gray-100 px-1 rounded">\t</code> — newline and tab.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              So when you see <code className="bg-gray-100 px-1 rounded">"He said \"Hello\""</code> in raw JSON, the backslashes are there so the parser knows the inner quotes don’t end the string. When you <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> it in JavaScript (or any language), you get the actual string: <code className="bg-gray-100 px-1 rounded">He said "Hello"</code> — no backslashes in the value.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-600" />
              Examples: What You See vs What You Get
            </h2>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 font-mono text-sm overflow-x-auto mb-4">
              <p className="text-gray-600 mb-2">// Raw JSON (what’s in the file or response):</p>
              <pre className="text-gray-800">{'{"quote": "He said \\"Hi\\""}'}</pre>
              <p className="text-gray-600 mt-4 mb-2">// After JSON.parse() in JavaScript:</p>
              <pre className="text-gray-800">{'quote: \'He said "Hi"\''}</pre>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The backslashes in the <em>serialized</em> JSON are there so the format is valid. The <em>parsed</em> value is a normal string; you don’t “remove” backslashes by hand — the parser does it for you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Backslashes Cause Confusion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Double-escaped JSON</strong>: Sometimes you get JSON that was stringified twice (e.g. stored in a database or log as a string). You might see <code className="bg-gray-100 px-1 rounded">\"{\\\"key\\\": \\\"value\\\"}\"</code>. In that case, parse once to get the inner JSON string, then parse again to get the object.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Copy-paste from logs or UIs</strong>: If you copy “JSON” from a log or a UI that already escaped it for display, you might get extra backslashes. Paste it into a <strong>JSON validator or beautifier</strong> to see the real structure and fix any double-escaping.
            </p>
          </section>

          <section className="mb-10">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-900 text-sm">
                <strong>Summary:</strong> Backslashes in JSON are there to escape quotes and other special characters inside strings. They are part of the format, not a bug. Use <code className="bg-amber-100 px-1 rounded">JSON.parse()</code> to get the real values; use a JSON formatter to inspect and validate raw JSON.
              </p>
            </div>
          </section>

          <section className="rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Validate and format your JSON
            </h2>
            <p className="text-amber-100 text-sm mb-4">
              Use our free JSON Beautifier to see your JSON with correct escaping and pretty-printing. Paste in JSON with backslashes and get a clear, readable view.
            </p>
            <Link
              href="/?tab=beautifier"
              className="inline-flex items-center gap-2 bg-white text-amber-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Open JSON Beautifier
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}
