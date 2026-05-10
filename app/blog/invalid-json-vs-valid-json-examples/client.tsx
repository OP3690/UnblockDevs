'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function InvalidJsonVsValidJsonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Invalid JSON vs Valid JSON — 15 Real Examples Developers Get Wrong</h1>
      <p className="lead">
        JSON has a deliberately strict specification — no comments, no trailing commas, no single quotes,
        no undefined. These constraints trip up every developer at some point. This guide covers 15 real
        invalid JSON examples with explanations of why they fail and the exact fix for each one.
      </p>

      <StatGrid stats={[
        { value: '15', label: 'common JSON mistakes covered with before/after fixes', color: 'red' },
        { value: 'double quotes', label: 'only valid string delimiter — single quotes always fail', color: 'amber' },
        { value: 'null', label: 'correct replacement for undefined, NaN, Infinity', color: 'green' },
        { value: 'JSON.stringify()', label: 'generates valid JSON — prevents all manual mistakes', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="The Golden Rule: Never Build JSON Manually" />
      <QuickFact color="amber" label="Root cause of most JSON errors">
        Most invalid JSON comes from building it by hand — concatenating strings, copying JavaScript
        object literals, or manually editing JSON files. The fix: always use JSON.stringify() to
        generate JSON and JSON.parse() to consume it. The library handles quoting, escaping, and
        formatting correctly every time.
      </QuickFact>

      <SectionHeader number={2} title="Mistakes #1–5: Syntax Violations" />

      <ErrorFix
        bad={`// ❌ Single quotes — JSON requires double quotes everywhere
{'name': 'John', 'age': 30}

// The JSON spec (RFC 8259) explicitly requires double-quoted strings.
// JavaScript allows single quotes in object literals, but JSON does not.`}
        good={`// ✅ Double quotes for all strings and keys
{"name": "John", "age": 30}

// Note: numbers, booleans (true/false), and null are NOT quoted:
{"name": "Alice", "active": true, "score": 95.5, "missing": null}`}
        badLabel="Single quotes — SyntaxError"
        goodLabel="Double quotes required for all strings"
      />

      <ErrorFix
        bad={`// ❌ Trailing comma before closing brace or bracket
{
  "name": "John",
  "age": 30,
}

// Also invalid in arrays:
[1, 2, 3,]

// JSON.parse throws: "Unexpected token }" or "Unexpected token ]"`}
        good={`// ✅ No trailing comma — last item has no comma
{
  "name": "John",
  "age": 30
}

// Arrays too:
[1, 2, 3]

// Prevention: JSON.stringify() never produces trailing commas.
const json = JSON.stringify({ name: "John", items: [1, 2, 3] }); // always valid`}
        badLabel="Trailing comma — not allowed in JSON"
        goodLabel="Remove trailing comma + use JSON.stringify()"
      />

      <ErrorFix
        bad={`// ❌ Comments — JSON has no comment syntax
{
  // This is the user object
  "name": "John",  /* display name */
  "age": 30
}`}
        good={`// ✅ Remove all comments from JSON
{
  "name": "John",
  "age": 30
}

// If you need comments in config files, use JSONC (VS Code settings.json)
// or JSON5 — parsed with the json5 npm package: JSON5.parse(text)`}
        badLabel="Comments — JSON.parse throws on // or /* */"
        goodLabel="No comments in JSON — use JSONC or JSON5 if needed"
      />

      <ErrorFix
        bad={`// ❌ Unquoted keys
{
  name: "John",    // missing quotes around key
  age: 30
}

// JavaScript object literals allow unquoted keys. JSON does not.
// JSON requires ALL keys to be double-quoted strings.`}
        good={`// ✅ All keys must be double-quoted strings
{
  "name": "John",
  "age": 30
}

// Even numeric-looking keys must be quoted in JSON:
// {"42": "the answer"}  ← valid JSON
// {42: "the answer"}    ← invalid JSON`}
        badLabel="Unquoted keys — JavaScript syntax, not JSON"
        goodLabel="All JSON keys must be double-quoted strings"
      />

      <ErrorFix
        bad={`// ❌ Missing closing brace or bracket
{
  "users": [
    {"name": "John"}
  ]
// Missing } at the end

// JSON.parse throws: "Unexpected end of JSON input"`}
        good={`// ✅ Every opening delimiter needs a matching close
{
  "users": [
    {"name": "John"}
  ]
}

// Tip: Use a JSON validator to find the exact line of the missing brace.
// Most parsers tell you the position: "at position 47" — count from there.`}
        badLabel="Missing closing brace — truncated JSON"
        goodLabel="Balanced braces and brackets"
      />

      <SectionHeader number={3} title="Mistakes #6–10: Invalid Values" />
      <CompareTable
        leftLabel="Invalid JSON Value"
        rightLabel="Valid Replacement + Reason"
        rows={[
          { label: 'NaN', left: '{"price": NaN}', right: '{"price": null} — NaN is a JavaScript value, not valid JSON. Replace with null or -1 as sentinel.' },
          { label: 'Infinity', left: '{"count": Infinity}', right: '{"count": null} — JSON has no Infinity. JSON.stringify() converts Infinity to null automatically.' },
          { label: 'undefined', left: '{"middle": undefined}', right: 'Omit the key, or use null. JSON.stringify() drops undefined keys entirely from objects.' },
          { label: 'Function', left: '{"fn": function() {}}', right: 'JSON cannot store functions. JSON.stringify() drops function-valued keys. Use a string descriptor instead.' },
          { label: 'Date object', left: '{"date": new Date()}', right: '{"date": "2025-01-15T00:00:00.000Z"} — Serialize dates to ISO 8601 strings before stringifying.' },
        ]}
      />

      <CodeBlock language="javascript" filename="Handling undefined, NaN, Infinity when serializing">
{`// JSON.stringify's behavior with invalid values:
const obj = {
  name: "Alice",
  score: NaN,            // → null in JSON
  count: Infinity,       // → null in JSON
  middle: undefined,     // → key omitted entirely
  handler: function() {} // → key omitted entirely
};

JSON.stringify(obj);
// Result: {"name":"Alice","score":null,"count":null}
// undefined and function keys are silently dropped!

// ✅ Fix: use a replacer to control serialization explicitly
JSON.stringify(obj, (key, value) => {
  if (value === undefined) return null;   // convert undefined → null
  if (typeof value === 'number' && !isFinite(value)) return null;  // NaN/Infinity → null
  if (typeof value === 'function') return undefined;  // omit functions
  return value;
});

// ✅ Fix: convert Date objects before stringifying
const event = {
  name: "Launch",
  date: new Date('2025-06-01').toISOString()  // "2025-06-01T00:00:00.000Z"
};
JSON.stringify(event);  // {"name":"Launch","date":"2025-06-01T00:00:00.000Z"}`}
      </CodeBlock>

      <SectionHeader number={4} title="Mistakes #11–15: Structure Errors" />
      <CompareTable
        leftLabel="Mistake"
        rightLabel="Fix and Explanation"
        rows={[
          { label: 'Unescaped quotes', left: '{"msg": "He said "Hello""}', right: '{"msg": "He said \\"Hello\\""} — Backslash-escape quotes inside strings. JSON.stringify handles this automatically.' },
          { label: 'Missing comma', left: '{"name": "John" "age": 30}', right: '{"name": "John", "age": 30} — Properties must be comma-separated. Easy to miss when adding new fields.' },
          { label: 'Trailing comma in array', left: '[1, 2, 3,]', right: '[1, 2, 3] — Same rule as objects: no trailing comma before the closing ].' },
          { label: 'Multiple root objects', left: '{"a":1}{"b":2}', right: '[{"a":1},{"b":2}] — JSON must have exactly one root element. Wrap multiple objects in an array.' },
          { label: 'Octal notation', left: '{"code": 0123}', right: '{"code": 83} — Octal integer literals are not valid in JSON. Use decimal or hex string representation.' },
        ]}
      />

      <SectionHeader number={5} title="Complete Reference: JSON Allowed vs Disallowed" />
      <CompareTable
        leftLabel="✅ Valid in JSON"
        rightLabel="❌ NOT Valid in JSON"
        rows={[
          { label: 'Strings', left: '"double-quoted string"', right: '\'single-quoted\', `template literal`, unquoted' },
          { label: 'Numbers', left: '42, -7, 3.14, 1e5, -2.5e-3', right: 'NaN, Infinity, -Infinity, 0123 (octal), 0xFF (hex)' },
          { label: 'Booleans', left: 'true, false (lowercase)', right: 'True, False, TRUE, FALSE, 1, 0' },
          { label: 'Null', left: 'null (lowercase)', right: 'undefined, NULL, Null, nil, None' },
          { label: 'Keys', left: '"quoted-key", "123", "key with spaces"', right: 'unquoted, \'single-quoted\', 123 (number key)' },
          { label: 'Comments', left: '(none allowed)', right: '// line comment, /* block comment */, # hash' },
          { label: 'Trailing commas', left: '(none allowed)', right: '{"a": 1,}, [1, 2,]' },
          { label: 'Special values', left: 'null for missing/unknown', right: 'undefined, NaN, Infinity, functions, symbols' },
        ]}
      />

      <SectionHeader number={6} title="Fixing Invalid JSON Programmatically" />
      <CodeBlock language="javascript" filename="Auto-repair common JSON issues before parsing">
{`/**
 * Attempt to repair common JSON mistakes before parsing.
 * Handles: single quotes, trailing commas, unquoted keys,
 * undefined/NaN/Infinity values, JavaScript-style comments.
 * Note: this is a best-effort heuristic — use JSON5 library for full support.
 */
function repairJson(input) {
  let s = input.trim();

  // 1. Strip // and /* */ comments
  s = s.replace(/\/\/[^\n]*/g, '');
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');

  // 2. Replace undefined/NaN/Infinity with null
  s = s.replace(/:\s*undefined\b/g, ': null');
  s = s.replace(/:\s*NaN\b/g, ': null');
  s = s.replace(/:\s*-?Infinity\b/g, ': null');

  // 3. Remove trailing commas before } or ]
  s = s.replace(/,\s*([}\]])/g, '$1');

  // 4. Quote unquoted keys (simple heuristic — may fail on complex cases)
  s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // 5. Try to parse the repaired string
  try {
    return JSON.parse(s);
  } catch (e) {
    // If still failing, use json5 library for more robust parsing
    throw new Error(\`Could not repair JSON: \${e.message}. Try the JSON5 library.\`);
  }
}

// Example:
const broken = \`{
  // user profile
  name: 'Alice',
  score: NaN,
  active: true,
}\`;

const repaired = repairJson(broken);
// { name: "Alice", score: null, active: true }

// For production use, prefer the json5 or jsonrepair npm packages:
// import { jsonrepair } from 'jsonrepair';
// const valid = jsonrepair(broken);`}
      </CodeBlock>

      <VerticalSteps steps={[
        { title: 'Read the error message — it tells you exactly where', desc: 'JSON.parse() errors include the position: "Unexpected token \',\' at position 47". Count characters from the start of your string to find the exact problem. In browsers, the DevTools console shows the error with a preview of the surrounding content.' },
        { title: 'Print the raw string before parsing', desc: 'Add console.log(JSON.stringify(rawString)) before the JSON.parse() call. JSON.stringify wraps the string in quotes and escapes special characters, making invisible characters (BOM, zero-width spaces, non-UTF-8 bytes) visible.' },
        { title: 'Paste into a JSON validator', desc: 'Online validators (jsonlint.com, our JSON Validator) highlight the exact line and character of the first error. Much faster than counting positions manually in a large JSON blob.' },
        { title: 'Check the source — where is the JSON coming from?', desc: 'API response? Check the raw HTTP body with curl -v or Chrome DevTools Network tab → Response. File? Check encoding (must be UTF-8, no BOM). User input? Always validate before parsing and wrap in try/catch.' },
        { title: 'Use JSON.stringify() going forward', desc: 'After fixing the immediate problem, eliminate the root cause: switch from manual JSON string building to JSON.stringify(). It handles all escaping, quoting, and formatting automatically, making it impossible to produce most of these errors.' },
      ]} />

      <AlertBox type="tip" title="Use JSON.stringify() to generate, JSON.parse() to consume">
        If you build JSON by concatenating strings, you will eventually introduce an error. Let the
        language handle it: JSON.stringify(yourObject) produces perfectly valid JSON every time. The
        only exceptions are NaN, Infinity, undefined, and functions — handle these with a replacer
        function or convert them before stringifying.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does JSON require double quotes but JavaScript allows single quotes?',
          answer: 'JSON was designed as a language-agnostic data interchange format with a deliberately strict spec to ensure all parsers everywhere behave identically. JavaScript object literals are more lenient (single quotes, trailing commas, unquoted keys) because they\'re code parsed by one engine. JSON\'s strictness guarantees that json.loads() in Python produces the same result as JSON.parse() in JavaScript — interoperability that would fail with a looser format.',
        },
        {
          question: 'Why does JSON not support comments?',
          answer: 'Douglas Crockford (JSON\'s creator) intentionally excluded comments. He later explained that comments were being abused to include parsing directives that broke interoperability between different parsers. If you need comments in JSON-like config files, use JSONC (used by VS Code\'s settings.json), JSON5, or YAML. Standard JSON has no comment syntax — full stop.',
        },
        {
          question: 'What happens to undefined and NaN when you JSON.stringify()?',
          answer: 'JSON.stringify() handles them differently by type: undefined as a value in an object → key is omitted entirely. undefined in an array → converted to null. NaN → converted to null. Infinity and -Infinity → converted to null. Functions → key is omitted. This is why your object might have fewer keys after a stringify/parse round trip — undefined keys silently disappear.',
        },
        {
          question: 'How do I handle special characters and unicode in JSON strings?',
          answer: 'JSON strings must escape: double quote (\\" ), backslash (\\\\), and control characters (\\n, \\r, \\t, \\b, \\f). Unicode characters can appear directly as UTF-8, or be escaped as \\uXXXX. JSON.stringify() handles all of this automatically. Never manually escape characters — you will miss edge cases. The entire point of JSON.stringify() is to handle these details for you.',
        },
        {
          question: 'Can JSON have arrays as the root element?',
          answer: 'Yes — JSON allows any valid JSON value as the root element: object {}, array [], string, number, boolean, or null. [1, 2, 3] is valid JSON. "hello" is valid JSON (though unusual). Most APIs return objects {} at the root, but JSON arrays are completely valid and common for list endpoints.',
        },
        {
          question: 'What is the maximum size for a JSON value or string?',
          answer: 'The JSON spec (RFC 8259) has no defined limit. In practice, limits are set by the parser: Node.js can handle JSON files up to ~500MB before memory becomes an issue. V8\'s string size limit is ~1GB. Browser JSON.parse() can handle files up to several hundred MB. For very large JSON (>50MB), use streaming parsers like jsonstream or clarinet instead of parsing the entire string at once.',
        },
      ]} />
    
      {/* ── AI JSON Error Explainer CTA ── */}
      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer — New Tool</p>
        <p className="text-sm text-zinc-600 mb-4">Paste broken JSON and instantly get clear explanations of every error — trailing commas, Python True/False/None, invalid escapes, duplicate keys — with one-click auto-fix and RFC spec references.</p>
        <a href="/json-error-explainer" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Explain My JSON Errors →
        </a>
      </div>
    </BlogLayoutWithSidebarAds>
  );
}
