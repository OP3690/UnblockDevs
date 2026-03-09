'use client';

import Link from 'next/link';
import { ArrowLeft, FileJson, AlertTriangle, Code, CheckCircle, HelpCircle, Clock, Bug, Wrench } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixJsonErrorsGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
              <FileJson className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix JSON Errors: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Parse errors, unexpected token &lt;, API returns HTML, JSON.stringify undefined (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare title="Fix JSON Errors Complete Guide" description="Parse, unexpected token <, stringify undefined. One guide." variant="floating" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            { question: 'What causes JSON parse error unexpected token?', answer: 'Invalid JSON syntax: trailing commas, single quotes, unescaped characters, comments, or missing quotes. JSON.parse() expects strict JSON. Validate before parsing and use try-catch.' },
            { question: 'How do I fix "unexpected token <" in JSON?', answer: '"Unexpected token <" usually means the API returned HTML (e.g. an error page) instead of JSON. Check response Content-Type, ensure the URL is correct, and verify the API returns application/json. Parse only after confirming the response is JSON.' },
            { question: 'Why does JSON.stringify return undefined?', answer: 'JSON.stringify omits properties whose values are undefined. So { a: 1, b: undefined } becomes \'{"a":1}\'. Use a replacer function to serialize undefined as null, or avoid storing undefined in objects you need to stringify.' },
            { question: 'Can I use single quotes in JSON?', answer: 'No. JSON requires double quotes for strings and keys. Single quotes are invalid. Replace them with double quotes or use JSON.stringify to produce valid JSON.' },
            { question: 'How do I handle JSON parse errors in JavaScript?', answer: 'Wrap JSON.parse() in try-catch. Catch SyntaxError, log the message (it often includes the position), and return a fallback or show a user-friendly error.' },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg"><HelpCircle className="w-6 h-6 text-blue-600" /></div>
              <h2 className="text-2xl font-bold text-gray-900">What is a JSON Parse Error?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>JSON parse error</strong> happens when <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> gets a string that isn’t valid JSON. &quot;Unexpected token&quot; means the parser hit a character it didn’t expect (e.g. single quote, comma, or <code>&lt;</code> from HTML). JSON allows only double-quoted strings, no trailing commas, and no comments.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm"><strong>Key point:</strong> Validate JSON before parsing and use try-catch so your app doesn’t crash.</p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg"><Clock className="w-6 h-6 text-orange-600" /></div>
              <h2 className="text-2xl font-bold text-gray-900">When Do JSON Errors Happen?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">Common cases: parsing API responses (malformed or HTML), user input, localStorage, or files. Also when <code className="bg-gray-100 px-1 rounded">JSON.stringify</code> drops <code className="bg-gray-100 px-1 rounded">undefined</code> and you expect the key to be present.</p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg"><Code className="w-6 h-6 text-purple-600" /></div>
              <h2 className="text-2xl font-bold text-gray-900">How to Fix: Step-by-Step</h2>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Fix syntax: trailing commas, quotes, comments</h3>
            <p className="text-gray-700 mb-2">Remove trailing commas, use double quotes for all strings and keys, and remove comments. Example:</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`// ❌ Invalid
JSON.parse('{"name": "John",}');
// ✅ Valid
JSON.parse('{"name": "John"}');`}</code></pre>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Unexpected token &lt; (API returns HTML)</h3>
            <p className="text-gray-700 mb-2">The error &quot;Unexpected token &lt;&quot; usually means the server returned HTML (e.g. 404 or login page) instead of JSON. Fix: check <code className="bg-gray-100 px-1 rounded">Content-Type</code> and only parse when it’s JSON:</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`const res = await fetch(url);
const ct = res.headers.get('content-type');
if (!ct?.includes('application/json')) {
  const text = await res.text();
  throw new Error('Not JSON: ' + text.slice(0, 100));
}
const data = await res.json();`}</code></pre>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">3. JSON.stringify returns undefined / missing keys</h3>
            <p className="text-gray-700 mb-2"><code className="bg-gray-100 px-1 rounded">JSON.stringify</code> skips properties with value <code className="bg-gray-100 px-1 rounded">undefined</code>. To keep keys, use a replacer:</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`const obj = { a: 1, b: undefined };
JSON.stringify(obj); // '{"a":1}' — b is missing

// To output undefined as null:
JSON.stringify(obj, (k, v) => v === undefined ? null : v);
// '{"a":1,"b":null}'`}</code></pre>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Use try-catch and validate</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`function parseJSONSafe(str) {
  try {
    return { ok: true, data: JSON.parse(str) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}`}</code></pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Error Examples</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Trailing comma / single quotes</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>{`JSON.parse('{"x": 1,}');  // ❌
JSON.parse('{"x": 1}');   // ✅`}</code></pre>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">API returns HTML</h3>
                <p className="text-gray-700 text-sm mb-2">Check Content-Type before parsing. If you get HTML, fix the URL, auth, or server so it returns JSON.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">stringify drops undefined</h3>
                <p className="text-gray-700 text-sm">Use a replacer to convert undefined to null if you need the key in the output.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free tools</h2>
            <p className="text-gray-700 mb-4">Use our <Link href="/json-beautifier" className="text-primary-600 hover:underline font-medium">JSON Beautifier</Link> and <Link href="/" className="text-primary-600 hover:underline font-medium">JSON Fixer</Link> to validate and fix JSON in the browser.</p>
          </section>
        </article>

        <section className="mt-12">
          <BlogSocialShare title="Fix JSON Errors Complete Guide" description="Parse, unexpected <, stringify undefined." variant="full" />
        </section>
        <section className="mt-12"><NewsletterSignup /></section>
        <section className="mt-12"><FeedbackForm toolName="Fix JSON Errors Guide" /></section>
      </main>
    </div>
  );
}
