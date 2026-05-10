'use client';

import Link from 'next/link';
import { FileJson, AlertTriangle, CheckCircle, Code, Wrench, Bug, BookOpen, Layers } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  FlowDiagram,
  VerticalSteps,
  CompareTable,
  StatGrid,
  KeyPointsGrid,
  CodeBlock,
  ErrorFix,
  SectionHeader,
  ToolCTA,
  FAQAccordion,
} from '@/components/blog/BlogVisuals';

const faqs = [
  {
    question: 'What causes a JSON parse error "Unexpected token"?',
    answer:
      'An "Unexpected token" error means JSON.parse() encountered a character that is not allowed in valid JSON. The most common culprits are: trailing commas after the last element in an array or object, single-quoted strings instead of double-quoted strings, JavaScript-style comments (// or /* */), unescaped special characters in strings, and undefined values. JSON is a strict subset of JavaScript object notation — it does not allow any of these constructs.',
  },
  {
    question: 'How do I fix "Unexpected token < in JSON at position 0"?',
    answer:
      'This error almost always means your server returned an HTML page (starting with "<html>" or "<!DOCTYPE") instead of JSON. Common causes include: wrong API URL (e.g., hitting a 404 page), missing authentication (server returns a login page), server error (500 error page), or an incorrect Content-Type header. Fix it by checking the response content-type header before parsing, logging the raw response text to see what was actually returned, and ensuring the API endpoint exists and is accessible.',
  },
  {
    question: 'Why does JSON.stringify drop undefined values?',
    answer:
      'JSON has no concept of "undefined" — it only supports null, booleans, numbers, strings, arrays, and objects. When JSON.stringify encounters an undefined value in an object property, it omits the key entirely. When undefined appears in an array, it is converted to null. To preserve keys with undefined values, use a replacer function: JSON.stringify(obj, (key, val) => val === undefined ? null : val). Alternatively, set the value to null explicitly before stringifying.',
  },
  {
    question: 'Can I use comments in JSON?',
    answer:
      'No. JSON does not support comments of any kind — not JavaScript-style // comments, not /* */ block comments, and not # hash comments. This is by design: JSON is a data interchange format, not a configuration language. If you need comments in JSON-like config files, consider using JSON5 (a superset), HJSON, or YAML. When parsing, always strip comments before calling JSON.parse(), or use a library that supports JSON5.',
  },
  {
    question: 'How should I handle JSON parse errors in JavaScript?',
    answer:
      'Always wrap JSON.parse() in a try-catch block. JSON.parse() throws a SyntaxError when the input is invalid — if you do not catch it, your application will crash. A robust pattern is: function safeParseJSON(str, fallback = null) { try { return JSON.parse(str); } catch { return fallback; } }. In production, also log the error and the raw string (truncated) for debugging. For API responses, additionally check the Content-Type header before attempting to parse.',
  },
  {
    question: 'What is the difference between JSON and a JavaScript object?',
    answer:
      'JSON (JavaScript Object Notation) is a text format with strict syntax rules: all keys must be double-quoted strings, string values must use double quotes, trailing commas are not allowed, undefined/NaN/Infinity are not valid values, and functions are not allowed. A JavaScript object is an in-memory data structure with loose syntax: keys can be unquoted identifiers, strings can use single or backtick quotes, trailing commas are allowed in modern JS, and values can be any JavaScript type including functions and undefined.',
  },
  {
    question: 'How do I fix "Unexpected end of JSON input"?',
    answer:
      'This error means the JSON string was cut off before it was complete — the parser reached the end of the string before all braces/brackets were closed. Common causes: network request was interrupted or timed out, response was truncated by a size limit, the string was accidentally sliced, or the server-side code generated incomplete JSON. Fix it by checking for network errors, ensuring the full response was received (check Content-Length), and validating the JSON before parsing with a try-catch.',
  },
  {
    question: 'Are single quotes valid in JSON?',
    answer:
      'No. JSON requires double quotes for all strings and all keys. Single quotes are invalid JSON. This is one of the most common mistakes developers make when handwriting JSON. If you have a string with single quotes, you must replace them with double quotes. Note: within a double-quoted JSON string, a literal single quote character is perfectly fine and does not need escaping.',
  },
];

export default function FixJsonErrorsGuideClient() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link
            href="/blog"
            className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-900"
          >
            ← Blog
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
              <FileJson className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
                Fix JSON Errors: The Complete Developer Guide
              </h1>
              <p className="mt-1.5 text-[14px] text-zinc-500">
                Parse errors, unexpected token &lt;, stringify issues, trailing commas, single quotes — every JSON error explained and fixed · 18 min read
              </p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="Fix JSON Errors: The Complete Developer Guide"
        description="Every JSON error explained and fixed — parse errors, unexpected token <, stringify undefined, trailing commas."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema faqs={faqs} />

        <article>
          {/* ── Intro ── */}
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-700">
            JSON errors are among the most common bugs in web development. Whether you are fetching data from an API,
            reading from <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">localStorage</code>, or
            building a configuration system, a single malformed character will throw a{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">SyntaxError</code> and break your
            application. This guide covers every JSON error you will realistically encounter — what causes it, how to
            diagnose it, and the exact code to fix it.
          </p>

          <StatGrid
            stats={[
              { value: '70%', label: 'JSON errors are syntax issues', sub: 'trailing commas, bad quotes' },
              { value: '#1', label: 'cause: missing double quotes', sub: 'keys or string values' },
              { value: 'token <', label: 'usually means HTML response', sub: 'wrong URL or 404 page' },
              { value: '100%', label: 'preventable with try-catch', sub: 'and content-type check' },
            ]}
          />

          {/* ── Section 1: What is JSON ── */}
          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="What is JSON and Why Is It So Strict?"
            color="amber"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            JSON (JavaScript Object Notation) was designed by Douglas Crockford in the early 2000s as a lightweight
            data interchange format. Its simplicity is its strength — and also the reason it is so unforgiving. JSON
            has exactly six value types: <strong>string</strong>, <strong>number</strong>, <strong>boolean</strong>,{' '}
            <strong>null</strong>, <strong>array</strong>, and <strong>object</strong>. Everything else is invalid.
          </p>

          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Unlike JavaScript objects, JSON has no notion of{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">undefined</code>,{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">NaN</code>,{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">Infinity</code>, functions, symbols, or
            comments. This strictness is intentional — JSON must be parseable by any language, not just JavaScript.
          </p>

          <CompareTable
            title="JSON vs JavaScript Object: Key Syntax Differences"
            headers={['Feature', 'JSON', 'JavaScript Object']}
            rows={[
              ['Key quotes', 'Required (double quotes only)', 'Optional for identifiers'],
              ['String quotes', 'Double quotes only', 'Single, double, or backtick'],
              ['Trailing commas', 'NOT allowed', 'Allowed in modern JS'],
              ['Comments', 'NOT allowed', '// and /* */ allowed'],
              ['undefined values', 'NOT valid', 'Valid property value'],
              ['NaN / Infinity', 'NOT valid', 'Valid number values'],
              ['Functions', 'NOT allowed', 'Allowed as values'],
              ['Date objects', 'Serialized as string', 'Native Date object'],
            ]}
          />

          <AlertBox type="tip" title="Mental model: JSON is a subset of YAML and a strict subset of JavaScript">
            When you write JSON by hand, imagine you are writing for a parser that has zero tolerance for deviation.
            Every key must be quoted. No trailing commas. No comments. If in doubt, run it through a validator before
            shipping.
          </AlertBox>

          {/* ── Section 2: Overview of all errors ── */}
          <SectionHeader
            icon={<Layers className="h-5 w-5" />}
            title="Overview: The 6 Most Common JSON Errors"
            color="zinc"
          />

          <KeyPointsGrid
            title="Common JSON Error Types"
            points={[
              {
                title: 'SyntaxError: Unexpected token',
                desc: 'Invalid character in JSON — trailing comma, single quote, unescaped character, or comment.',
              },
              {
                title: 'Unexpected token < at position 0',
                desc: 'Server returned HTML (error page, login redirect) instead of JSON.',
              },
              {
                title: 'Unexpected end of JSON input',
                desc: 'JSON string was truncated — network timeout, size limit, or incomplete generation.',
              },
              {
                title: 'JSON.stringify drops keys',
                desc: 'Properties with undefined values are silently omitted by JSON.stringify.',
              },
              {
                title: 'Circular reference error',
                desc: 'Object contains a reference to itself — JSON.stringify cannot serialize circular structures.',
              },
              {
                title: 'Deeply nested parse failure',
                desc: 'JSON string exceeds parser depth limit, or has non-UTF-8 encoding issues.',
              },
            ]}
          />

          <FlowDiagram
            title="How JSON.parse() processes your data"
            steps={[
              { label: 'Your Code', desc: 'Calls JSON.parse(str)', color: 'blue' },
              { label: 'Tokenizer', desc: 'Reads characters one by one', color: 'sky' },
              { label: 'Parser', desc: 'Builds object tree', color: 'violet' },
              { label: 'SyntaxError?', desc: 'Invalid token found', color: 'rose' },
              { label: 'Debug', desc: 'Read error + position', color: 'amber' },
              { label: 'Fix & Retry', desc: 'Correct the JSON', color: 'emerald' },
            ]}
          />

          {/* ── Error 1: Unexpected token / syntax ── */}
          <SectionHeader
            icon={<Bug className="h-5 w-5" />}
            title="Error 1: SyntaxError — Unexpected Token (Bad Syntax)"
            color="rose"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            The most frequent JSON error. The parser hit a character it did not expect. The error message usually
            includes the position in the string where parsing failed, which is your primary debugging clue.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-zinc-900">1a. Trailing Commas</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            JSON does not allow a comma after the last element in an array or the last property in an object. This is
            the single most common mistake because JavaScript and most modern languages do allow trailing commas.
          </p>

          <ErrorFix
            title="Trailing comma in object"
            bad={`// ❌ SyntaxError: Unexpected token }
JSON.parse('{"name": "Alice", "age": 30,}');

// ❌ Also invalid in arrays
JSON.parse('[1, 2, 3,]');`}
            good={`// ✅ Remove the trailing comma
JSON.parse('{"name": "Alice", "age": 30}');

// ✅ Arrays too
JSON.parse('[1, 2, 3]');`}
          />

          <h3 className="mt-6 text-lg font-semibold text-zinc-900">1b. Single Quotes Instead of Double Quotes</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            JSON requires double quotes for both keys and string values. Single quotes are a syntax error. This often
            happens when developers copy JavaScript object literal syntax into a JSON context.
          </p>

          <ErrorFix
            title="Single quotes are not valid JSON"
            bad={`// ❌ Single quotes on keys — SyntaxError
JSON.parse("{'name': 'Alice'}");

// ❌ Mixed quotes
JSON.parse('{"name": \'Alice\'}');`}
            good={`// ✅ Always use double quotes
JSON.parse('{"name": "Alice"}');

// ✅ In a JS string, escape the inner double quotes
const raw = '{"name": "Alice", "city": "New York"}';
const parsed = JSON.parse(raw);`}
          />

          <h3 className="mt-6 text-lg font-semibold text-zinc-900">1c. Comments in JSON</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            JSON has no comment syntax. Any{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">//</code> or{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">/* */</code> will cause a SyntaxError.
            If you need comments in config files, use JSON5, HJSON, or YAML instead.
          </p>

          <ErrorFix
            title="Comments cause SyntaxError"
            bad={`// ❌ Comments are NOT allowed in JSON
{
  // User configuration
  "theme": "dark",
  /* Set to true to enable notifications */
  "notifications": true
}`}
            good={`// ✅ Remove all comments from JSON
{
  "theme": "dark",
  "notifications": true
}

// ✅ If you need comments, use JSON5 format
// and the json5 npm package to parse it`}
          />

          <h3 className="mt-6 text-lg font-semibold text-zinc-900">1d. Unescaped Special Characters</h3>

          <CodeBlock language="json" title="Characters that must be escaped inside JSON strings">
{`// Inside a JSON string, these characters must be escaped:
{
  "path": "C:\\\\Users\\\\Alice\\\\Documents",   // \\ → \\\\
  "quote": "She said \\"hello\\"",               // " → \\"
  "newline": "line1\\nline2",                    // newline → \\n
  "tab": "col1\\tcol2",                          // tab → \\t
  "emoji": "Works fine: \\u2764",                // Unicode OK
  "null_byte": "NOT OK in plain strings"         // \\u0000 needs escape
}

// ✅ Use JSON.stringify to generate valid JSON from JS values:
const obj = { message: 'She said "hello"', path: 'C:\\Users\\Alice' };
const safe = JSON.stringify(obj);
// '{"message":"She said \\"hello\\"","path":"C:\\\\Users\\\\Alice"}'`}
          </CodeBlock>

          <AlertBox type="warning" title="NaN and Infinity are not valid JSON">
            <code>JSON.stringify(NaN)</code> returns <code>"null"</code>, and{' '}
            <code>JSON.stringify(Infinity)</code> also returns <code>"null"</code>. This is silent data loss. Always
            validate numeric values before serializing them if you rely on their exact value.
          </AlertBox>

          {/* ── Error 2: Unexpected token < ── */}
          <SectionHeader
            icon={<AlertTriangle className="h-5 w-5" />}
            title='Error 2: "Unexpected token &lt;" — API Returns HTML'
            color="orange"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            This is arguably the most confusing JSON error because it is not really a JSON problem at all — it is a
            network/server problem. The <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">&lt;</code>{' '}
            character is the first character of an HTML document (
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">&lt;!DOCTYPE</code> or{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">&lt;html</code>). When you see this
            error, your server returned an HTML page instead of JSON.
          </p>

          <KeyPointsGrid
            title="Why does the server return HTML instead of JSON?"
            points={[
              { title: '404 Not Found', desc: 'Wrong URL — the server returns its 404 HTML error page.' },
              { title: '401/403 Unauthorized', desc: 'Missing or expired auth token — server redirects to login page.' },
              { title: '500 Server Error', desc: 'Backend crash — server returns its default HTML error page.' },
              { title: 'Wrong endpoint', desc: 'Hitting the web app URL instead of the API endpoint.' },
              { title: 'Redirect to login', desc: 'Session expired, server issues 302 redirect to login HTML.' },
              { title: 'CDN/WAF block', desc: 'Cloudflare or WAF returns an HTML block page.' },
            ]}
          />

          <ErrorFix
            title='Fix: Check Content-Type before calling .json()'
            bad={`// ❌ Blindly calling .json() — will throw if HTML is returned
const res = await fetch('/api/users');
const data = await res.json(); // 💥 SyntaxError if server returned HTML

// ❌ Also bad: not checking response.ok
const res = await fetch('/api/users');
if (res.ok) {
  const data = await res.json(); // Still might return HTML on 4xx
}`}
            good={`// ✅ Always check Content-Type and response.ok
async function fetchJSON(url, options) {
  const res = await fetch(url, options);

  // Check content type FIRST
  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    const text = await res.text();
    throw new Error(
      \`Expected JSON but got \${ct}. Status: \${res.status}. Body: \${text.slice(0, 200)}\`
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(\`HTTP \${res.status}: \${err.message ?? JSON.stringify(err)}\`);
  }

  return res.json();
}

// Usage
const users = await fetchJSON('/api/users');`}
          />

          <AlertBox type="info" title="How to debug this error in DevTools">
            Open DevTools → Network tab → find the failing request → click it → look at the Response tab. You will see
            the actual HTML that the server returned. The Status code (404, 401, 500) tells you exactly what went
            wrong. Fix the underlying server issue, not the JavaScript.
          </AlertBox>

          {/* ── Error 3: Unexpected end of JSON input ── */}
          <SectionHeader
            icon={<AlertTriangle className="h-5 w-5" />}
            title='Error 3: "Unexpected End of JSON Input"'
            color="violet"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            This error means the JSON string ended before the parser finished building the object tree. Imagine
            receiving <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">{'{"name": "Alice'}</code> — the
            parser opened an object, found the key "name", started reading the string value "Alice", but then hit the
            end of the string before finding the closing quote, brace, or bracket.
          </p>

          <VerticalSteps
            title="Common causes of truncated JSON"
            steps={[
              {
                title: 'Network timeout or interruption',
                desc: 'The HTTP connection dropped mid-response. The browser received only part of the response body. Check for network errors in DevTools.',
                badge: 'Most common',
              },
              {
                title: 'Response size limit hit',
                desc: 'A proxy, CDN, or serverless function truncated the response at a size limit (e.g., Lambda 6MB limit). Switch to streaming or pagination.',
              },
              {
                title: 'String was accidentally sliced',
                desc: 'Code somewhere called str.slice() or str.substring() on the raw JSON string, cutting it short. Search your codebase for any string manipulation on API responses.',
              },
              {
                title: 'Server-side generation bug',
                desc: 'The backend code generating JSON crashed mid-write and sent a partial response without proper error handling. Check server logs.',
              },
              {
                title: 'Empty response body',
                desc: 'The server returned HTTP 204 No Content or an empty body, and the code called .json() expecting a payload. Check for empty string before parsing.',
              },
            ]}
          />

          <CodeBlock language="typescript" title="Robust fetch wrapper handling all these cases">
{`async function fetchJSONSafe<T>(url: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (networkError) {
    // DNS failure, timeout, connection refused
    throw new Error(\`Network error: \${(networkError as Error).message}\`);
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T;

  const text = await res.text();

  // Guard against empty body
  if (!text || text.trim() === '') {
    if (!res.ok) throw new Error(\`HTTP \${res.status} with empty body\`);
    return undefined as T;
  }

  // Check Content-Type
  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('application/json') && !ct.includes('text/json')) {
    throw new Error(
      \`Expected JSON, got "\${ct}". First 200 chars: \${text.slice(0, 200)}\`
    );
  }

  let data: T;
  try {
    data = JSON.parse(text);
  } catch (parseError) {
    throw new Error(
      \`JSON parse failed: \${(parseError as Error).message}. \` +
      \`Raw (first 500 chars): \${text.slice(0, 500)}\`
    );
  }

  if (!res.ok) {
    const errMsg = (data as any)?.message ?? (data as any)?.error ?? JSON.stringify(data);
    throw new Error(\`HTTP \${res.status}: \${errMsg}\`);
  }

  return data;
}`}
          </CodeBlock>

          {/* ── Error 4: JSON.stringify drops undefined ── */}
          <SectionHeader
            icon={<Code className="h-5 w-5" />}
            title="Error 4: JSON.stringify Silently Drops undefined"
            color="sky"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            This is a subtle bug that does not throw an error — it causes silent data loss. When{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">JSON.stringify</code> encounters an object
            property whose value is <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">undefined</code>,
            it simply skips the key. The resulting JSON string will not contain that key at all. If you later parse it,
            the key will be missing.
          </p>

          <ErrorFix
            title="JSON.stringify behavior with undefined, NaN, Infinity"
            bad={`// ❌ These values are silently dropped or converted
const user = {
  id: 1,
  name: 'Alice',
  avatar: undefined,     // ← dropped entirely
  score: NaN,            // ← becomes null
  ratio: Infinity,       // ← becomes null
};

const json = JSON.stringify(user);
// '{"id":1,"name":"Alice","score":null,"ratio":null}'
// Note: "avatar" key is completely missing!

const parsed = JSON.parse(json);
console.log('avatar' in parsed); // false — data lost!`}
            good={`// ✅ Option 1: Use null explicitly for "no value"
const user = {
  id: 1,
  name: 'Alice',
  avatar: null,          // ← null IS valid JSON
};
JSON.stringify(user);
// '{"id":1,"name":"Alice","avatar":null}'

// ✅ Option 2: Use a replacer to convert undefined → null
function undefinedToNull(_key: string, value: unknown) {
  return value === undefined ? null : value;
}
JSON.stringify(user, undefinedToNull);

// ✅ Option 3: Use a custom serializer for NaN/Infinity
function numberReplacer(_key: string, value: unknown) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return 'NaN';
    if (!Number.isFinite(value)) return value > 0 ? 'Infinity' : '-Infinity';
  }
  return value;
}
JSON.stringify({ score: NaN, ratio: Infinity }, numberReplacer);
// '{"score":"NaN","ratio":"Infinity"}' — strings, but at least not lost`}
          />

          <AlertBox type="warning" title="JSON.stringify array behavior with undefined">
            In arrays, <code>undefined</code> is not dropped — it is converted to <code>null</code>:
            <br />
            <code>JSON.stringify([1, undefined, 3])</code> produces <code>[1,null,3]</code>. This is different from
            object behavior where the key is omitted entirely. Both cases are silent and can cause confusing bugs.
          </AlertBox>

          {/* ── Error 5: Circular references ── */}
          <SectionHeader
            icon={<Bug className="h-5 w-5" />}
            title="Error 5: Circular Reference — JSON.stringify Fails"
            color="rose"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            If an object contains a reference back to itself (directly or through a chain),{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">JSON.stringify</code> will throw a{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">TypeError: Converting circular structure to JSON</code>.
            This often happens with DOM nodes, Express{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">req/res</code> objects, or complex
            graph-like data structures.
          </p>

          <CodeBlock language="typescript" title="Detecting and handling circular references">
{`// ❌ This throws TypeError
const obj: any = { name: 'Alice' };
obj.self = obj;  // circular reference!
JSON.stringify(obj); // TypeError: Converting circular structure to JSON

// ✅ Option 1: Use a WeakSet to detect cycles
function safeStringify(obj: unknown, indent?: number): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  }, indent);
}

// ✅ Option 2: Use the 'flatted' or 'json-stringify-safe' npm package
import stringify from 'json-stringify-safe';
const safe = stringify(circularObj, null, 2);

// ✅ Option 3: For logging, use util.inspect (Node.js)
import util from 'util';
console.log(util.inspect(circularObj, { depth: 4, circular: true }));`}
          </CodeBlock>

          {/* ── Section: Try-catch patterns ── */}
          <SectionHeader
            icon={<Wrench className="h-5 w-5" />}
            title="Try-Catch Patterns: Never Let JSON.parse Crash Your App"
            color="emerald"
          />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">JSON.parse()</code> throws a synchronous{' '}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">SyntaxError</code> on invalid input. If
            you do not catch it, the error will propagate up and potentially crash your application or render a broken
            UI. Wrapping JSON.parse in try-catch is not optional in production code — it is mandatory.
          </p>

          <VerticalSteps
            title="The JSON debugging workflow"
            steps={[
              {
                title: 'Read the exact error message',
                desc: 'The error message includes the position: "at position 42". That position points to the character that broke the parser. Count from the start of the string.',
                badge: 'Step 1',
              },
              {
                title: 'Log the raw string',
                desc: 'Before parsing, log the raw string (or the first 500 characters). This reveals whether the server sent HTML, an empty string, or malformed JSON.',
                badge: 'Step 2',
              },
              {
                title: 'Check Content-Type header',
                desc: 'If the Content-Type is text/html instead of application/json, the server returned an error page. Fix the server issue, not the JavaScript.',
                badge: 'Step 3',
              },
              {
                title: 'Use a JSON validator',
                desc: 'Paste the raw string into a JSON validator. It will highlight exactly which character is invalid and why. Our JSON Fixer can often auto-correct common errors.',
                badge: 'Step 4',
              },
              {
                title: 'Fix the source, not the symptom',
                desc: 'If the server is sending bad JSON, fix the server. If you are hardcoding JSON strings, use JSON.stringify() to generate them instead of writing them by hand.',
                badge: 'Step 5',
              },
            ]}
          />

          <CodeBlock language="typescript" title="Production-ready JSON utility functions">
{`// ── 1. Safe parse with fallback ──────────────────────────────
export function parseJSON<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ── 2. Safe parse that returns Result type ────────────────────
type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; raw: string };

export function parseJSONResult<T>(raw: string): ParseResult<T> {
  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch (e) {
    return {
      ok: false,
      error: (e as SyntaxError).message,
      raw: raw.slice(0, 200),
    };
  }
}

// Usage:
const result = parseJSONResult<User>(apiResponse);
if (!result.ok) {
  console.error('Parse failed:', result.error, 'Raw:', result.raw);
  showErrorToUser('Failed to load data. Please refresh.');
} else {
  setUser(result.data);
}

// ── 3. localStorage safe helpers ─────────────────────────────
export function getLocalStorageJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // localStorage had corrupted data — clear and return fallback
    localStorage.removeItem(key);
    return fallback;
  }
}

export function setLocalStorageJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Quota exceeded or value is not serializable
    return false;
  }
}`}
          </CodeBlock>

          {/* ── Real-world examples ── */}
          <SectionHeader
            icon={<Layers className="h-5 w-5" />}
            title="Real-World Examples: JSON Errors in Common Scenarios"
            color="blue"
          />

          <h3 className="mt-4 text-lg font-semibold text-zinc-900">React: Fetch and Parse API Response</h3>

          <CodeBlock language="tsx" title="React hook with proper JSON error handling">
{`import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAPI<T>(url: string): ApiResponse<T> {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const res = await fetch(url);

        // Check content type before parsing
        const ct = res.headers.get('content-type') ?? '';
        if (!ct.includes('application/json')) {
          const text = await res.text();
          throw new Error(
            \`Server returned non-JSON (\${ct}). \` +
            \`Status: \${res.status}. Body: \${text.slice(0, 100)}\`
          );
        }

        const data: T = await res.json();

        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (e) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: (e as Error).message });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [url]);

  return state;
}

// Component usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useAPI<User>(\`/api/users/\${userId}\`);

  if (loading) return <Spinner />;
  if (error) return <ErrorBanner message={error} />;
  return <div>{user?.name}</div>;
}`}
          </CodeBlock>

          <h3 className="mt-6 text-lg font-semibold text-zinc-900">Node.js: Parse Request Body</h3>

          <CodeBlock language="typescript" title="Express.js endpoint with JSON validation">
{`import express from 'express';
import { z } from 'zod'; // zod for schema validation

const app = express();
app.use(express.json({
  // Handle JSON parse errors at the middleware level
  strict: true,
  limit: '1mb',
}));

// Handle JSON parse errors from express.json() middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON in request body',
      detail: err.message,
    });
  }
  next(err);
});

// Define schema with zod
const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
});

app.post('/api/users', (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: 'Validation failed',
      details: result.error.format(),
    });
  }
  const { name, email, age } = result.data;
  // ... create user
  res.status(201).json({ id: 'new-id', name, email, age });
});`}
          </CodeBlock>

          {/* ── Prevention ── */}
          <SectionHeader
            icon={<CheckCircle className="h-5 w-5" />}
            title="Prevention: How to Write JSON That Never Breaks"
            color="emerald"
          />

          <AlertBox type="success" title="Golden rule: never handwrite JSON strings in production code">
            Use <code>JSON.stringify()</code> to generate JSON from JavaScript objects. It handles all escaping,
            quoting, and serialization correctly. Only handwrite JSON in configuration files, and always validate them
            with a JSON validator.
          </AlertBox>

          <KeyPointsGrid
            title="JSON error prevention checklist"
            points={[
              {
                title: 'Never handwrite JSON strings',
                desc: 'Use JSON.stringify() to generate JSON. Manual JSON is error-prone.',
              },
              {
                title: 'Always wrap JSON.parse in try-catch',
                desc: 'Treat all external JSON as untrusted. Never assume it is valid.',
              },
              {
                title: 'Check Content-Type before parsing',
                desc: "Verify the server returned application/json before calling .json().",
              },
              {
                title: 'Validate schemas with Zod or Yup',
                desc: 'Even valid JSON may have wrong types. Use runtime schema validation.',
              },
              {
                title: 'Use TypeScript for JSON types',
                desc: 'Define interfaces for your API responses to catch type mismatches.',
              },
              {
                title: 'Lint JSON files in CI',
                desc: 'Use jq or a JSON lint step to catch config file errors before deployment.',
              },
            ]}
          />

          <CodeBlock language="bash" title="Useful command-line tools for JSON debugging">
{`# Validate a JSON file with jq
jq . config.json

# Pretty-print a JSON file
jq . raw.json | less

# Query nested data
curl -s https://api.example.com/users | jq '.data[0].name'

# Check if an API returns JSON (curl)
curl -I https://api.example.com/users
# Look for: Content-Type: application/json

# Validate JSON string in Node.js
node -e "JSON.parse(require('fs').readFileSync('data.json', 'utf8')); console.log('Valid!')"

# Fix common JSON issues with python
python3 -c "import json,sys; json.dump(json.load(sys.stdin), sys.stdout, indent=2)"

# Install jsonlint globally for nicer errors
npm i -g jsonlint
jsonlint config.json`}
          </CodeBlock>

          {/* ── Tool CTA ── */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ToolCTA
              title="JSON Validator"
              description="Paste any JSON and instantly see which line has the error, with a clear explanation of what is wrong."
              href="/json-validator"
              buttonText="Validate JSON →"
              color="amber"
            />
            <ToolCTA
              title="JSON Fixer Online"
              description="Auto-fix trailing commas, single quotes, comments, and other common JSON errors in one click."
              href="/json-fixer-online"
              buttonText="Fix My JSON →"
              color="blue"
            />
          </div>

          {/* ── FAQ Accordion ── */}
          <FAQAccordion
            title="Frequently Asked Questions"
            faqs={[
              {
                question: 'What does "Unexpected token u in JSON at position 0" mean?',
                answer:
                  'This means JSON.parse() received the string "undefined" (the literal word) or an actual undefined value coerced to string. This happens when you pass an uninitialized variable directly to JSON.parse(), or when localStorage.getItem() returns null and you call JSON.parse(null) — null becomes the string "null" which is actually valid JSON (returns null), but if a variable is genuinely undefined and toString() is called, you get the string "undefined". Always check that your input is a valid string before parsing.',
              },
              {
                question: 'How do I convert a JavaScript Date to JSON and back?',
                answer:
                  'JSON.stringify() automatically converts Date objects to ISO 8601 strings: new Date() → "2026-03-24T10:00:00.000Z". However, JSON.parse() does NOT automatically convert these strings back to Date objects — you get a plain string. To revive dates, use the reviver argument: JSON.parse(str, (key, val) => typeof val === "string" && /^\\d{4}-\\d{2}-\\d{2}T/.test(val) ? new Date(val) : val).',
              },
              {
                question: 'Is JSON.parse synchronous or asynchronous?',
                answer:
                  'JSON.parse() is fully synchronous. It runs on the main thread and blocks until it finishes. For very large JSON payloads (megabytes), this can cause noticeable UI jank. For large files, consider using a Web Worker to parse JSON off the main thread, or streaming parsers like oboe.js or clarinet that process JSON as a stream rather than all at once.',
              },
              {
                question: 'Can JSON handle BigInt values?',
                answer:
                  'No. JSON.stringify(BigInt(123)) throws a TypeError: "Do not know how to serialize a BigInt". JavaScript BigInt values exceed JSON\'s numeric range. Solutions: serialize as a string (using a replacer), use a library like json-bigint that handles BigInt serialization, or agree on string encoding for large integers in your API contract.',
              },
              {
                question: 'What is the maximum size of a JSON string that can be parsed?',
                answer:
                  'There is no hard limit in the JSON specification, but practical limits come from JavaScript engine string size limits (typically ~1-2GB in V8) and available memory. For large JSON files (>10MB), parsing can be slow and memory-intensive. Consider paginating your API responses, using streaming JSON parsers (clarinet, oboe), or switching to a binary format like Protocol Buffers or MessagePack for large datasets.',
              },
              {
                question: 'How do I pretty-print JSON in JavaScript?',
                answer:
                  'Use the third argument of JSON.stringify() for indentation: JSON.stringify(data, null, 2) for 2-space indent, or JSON.stringify(data, null, "\\t") for tabs. The second argument (null) is the replacer. For production, omit indentation to save bytes. For logging/debugging, 2-space indent is the conventional choice.',
              },
            ]}
          />
        </article>

        <section className="mt-10">
          <BlogSocialShare
            title="Fix JSON Errors: The Complete Developer Guide"
            description="Every JSON error explained and fixed — parse errors, unexpected token <, stringify undefined, trailing commas."
            variant="full"
          />
        </section>
        <section className="mt-8">
          <NewsletterSignup />
        </section>
        <section className="mt-8">
          <FeedbackForm toolName="Fix JSON Errors Guide" />
        </section>
      
      {/* ── AI JSON Error Explainer CTA ── */}
      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer — New Tool</p>
        <p className="text-sm text-zinc-600 mb-4">Paste broken JSON and instantly get clear explanations of every error — trailing commas, Python True/False/None, invalid escapes, duplicate keys — with one-click auto-fix and RFC spec references.</p>
        <a href="/json-error-explainer" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Explain My JSON Errors →
        </a>
      </div>
    </BlogLayoutWithSidebarAds>
    </div>
  );
}
