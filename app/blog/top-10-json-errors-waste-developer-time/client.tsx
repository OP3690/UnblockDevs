'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function Top10JsonErrorsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Top 10 JSON Errors That Waste Developer Time — and How to Fix Them Fast</h1>
      <p className="lead">
        JSON errors can bring development to a halt for minutes or hours. You're debugging, searching Stack
        Overflow, and trying random fixes while your application is broken. This guide covers the 10 most
        common JSON parse errors — what causes each one, how to fix it in under a minute, and how to
        prevent it entirely with proper patterns.
      </p>

      <StatGrid stats={[
        { value: '#1', label: '"Unexpected token <" — HTML error returned instead of JSON', color: 'red' },
        { value: '5-20 min', label: 'average time wasted per JSON error', color: 'amber' },
        { value: 'JSON.stringify', label: 'the prevention for most manual JSON errors', color: 'green' },
        { value: 'try-catch', label: 'required pattern for all JSON.parse() calls', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Error #1 — Unexpected token <" />
      <QuickFact color="red" label="Most common, most confusing">
        This error means JSON.parse() received HTML, not JSON. Your API returned an HTML error page
        (404, 500, or authentication redirect) instead of the expected JSON response. The {"<"} is
        the start of {"<html>"} or {"<!DOCTYPE html>"}.
      </QuickFact>

      <ErrorFix
        bad={`// This silently receives an HTML error page and then crashes on parse
const response = await fetch('/api/users');
const data = await response.json();  // ❌ SyntaxError: Unexpected token '<'
// The API returned a 404 HTML page, not JSON`}
        good={`// Always check response.ok before parsing
const response = await fetch('/api/users');

// Check HTTP status BEFORE calling .json()
if (!response.ok) {
  const text = await response.text();  // Read as text to see the actual error
  throw new Error(\`API error \${response.status}: \${text.slice(0, 200)}\`);
}

const data = await response.json();  // ✅ Safe — response is 2xx`}
        badLabel="No status check — crashes on HTML"
        goodLabel="Check response.ok first"
      />

      <SectionHeader number={2} title="Error #2 — Unexpected end of JSON input" />
      <CodeBlock language="javascript" filename="Missing closing braces or truncated response">
{`// ❌ Causes this error:
JSON.parse('{"name": "Alice", "age": 30')   // Missing }
JSON.parse('{"items": [1, 2, 3')            // Missing ]}
JSON.parse('')                               // Empty string

// Also happens with truncated API responses — network timeout cuts off the body
// Symptom: error at the very end of the string (the parser ran out of input)

// ✅ Fix: always use try-catch and validate non-empty response
function safeJsonParse(text) {
  if (!text || text.trim() === '') {
    throw new Error('Cannot parse empty response as JSON');
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('JSON parse failed. Input was:', text.slice(0, 500));
    throw new Error(\`Invalid JSON: \${e.message}\`);
  }
}

// Use JSON validators to find the exact position of the missing brace:
// unblockdevs.com/json-validator highlights the exact problem location`}
      </CodeBlock>

      <SectionHeader number={3} title="Error #3 — Trailing Comma (Expected ',' or '}' after property value)" />
      <ErrorFix
        bad={`// ❌ JSON does NOT allow trailing commas (unlike JavaScript)
{
  "name": "Alice",
  "age": 30,        ← trailing comma before }
}

// Also invalid in arrays:
["apple", "banana", "cherry",]  ← trailing comma before ]

// JSON.parse will throw: "Unexpected token }" or "Unexpected token ]"`}
        good={`// ✅ No trailing commas in JSON
{
  "name": "Alice",
  "age": 30
}

// ✅ Arrays without trailing comma
["apple", "banana", "cherry"]

// Prevention: use JSON.stringify() — it never generates trailing commas
const json = JSON.stringify({ name: "Alice", age: 30 });  // always valid

// If receiving JSON with trailing commas (JSONC format), parse with:
// JSON5 library: JSON5.parse(jsonWithTrailingCommas)
// Or strip them: text.replace(/,\\s*([}\\]])/g, '$1')`}
        badLabel="Trailing comma — invalid JSON"
        goodLabel="No trailing comma + use JSON.stringify()"
      />

      <SectionHeader number={4} title="Errors #4-10 — Quick Reference" />
      <CompareTable
        leftLabel="Error Message"
        rightLabel="Cause and Fix"
        rows={[
          { label: '#4 Invalid control character', left: 'Unescaped newlines, tabs in string values', right: 'Use JSON.stringify() — it escapes automatically. Manual: \\n \\t \\r' },
          { label: '#5 Single quotes used', left: '\'value\' instead of "value"', right: 'JSON requires double quotes. Replace all single quotes with double quotes.' },
          { label: '#6 Comments in JSON', left: '// or /* */ comments included', right: 'JSON has no comments. Remove all comments. Use JSONC/JSON5 if you need comments.' },
          { label: '#7 Undefined value', left: 'undefined property value (not valid)', right: 'Replace with null. JSON.stringify() omits undefined keys automatically.' },
          { label: '#8 NaN or Infinity', left: 'NaN, Infinity, -Infinity values', right: 'JSON has no NaN/Infinity. Replace with null or a sentinel number (-1).' },
          { label: '#9 Non-string keys', left: '{42: "value"} — numeric key', right: 'All JSON keys must be strings: {"42": "value"}' },
          { label: '#10 Encoding issues', left: 'Non-UTF8 chars or BOM at start', right: 'Ensure UTF-8 encoding. Strip BOM: text.replace(/^\\uFEFF/, "")' },
        ]}
      />

      <SectionHeader number={5} title="The Root Causes — Why These Errors Happen" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Building JSON manually', description: 'Manually concatenating strings to build JSON is the root cause of most JSON syntax errors (trailing commas, missing quotes, invalid characters). Always use JSON.stringify() — it handles escaping and formatting correctly every time.' },
        { title: 'Not checking API response status', description: 'Calling response.json() without first checking response.ok causes the "Unexpected token <" error when the server returns an HTML error page. Always check status codes before parsing.' },
        { title: 'Copying JSON from code with comments', description: 'JavaScript objects (with // comments, trailing commas, unquoted keys) look like JSON but aren\'t. If you copy a JS object literal to use as JSON, it will fail — JSON is a strict subset of JavaScript.' },
        { title: 'Truncated network responses', description: 'Large responses that time out mid-transfer produce truncated JSON causing "Unexpected end of input." Set appropriate timeouts and check Content-Length vs actual received bytes for large payloads.' },
      ]} />

      <SectionHeader number={6} title="Prevention Patterns That Eliminate JSON Errors" />
      <CodeBlock language="javascript" filename="Safe JSON patterns — eliminate 90% of JSON errors">
{`// Pattern 1: ALWAYS use JSON.stringify() — never build JSON manually
// ❌ Never do this:
const json = '{"name":"' + user.name + '","age":' + user.age + '}';
// ✅ Always do this:
const json = JSON.stringify({ name: user.name, age: user.age });

// Pattern 2: ALWAYS wrap JSON.parse() in try-catch
function safeParse(jsonString) {
  try {
    return { data: JSON.parse(jsonString), error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
const { data, error } = safeParse(apiResponse);
if (error) console.error('JSON parse failed:', error);

// Pattern 3: ALWAYS check response.ok before .json()
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`HTTP \${response.status}: \${errorText.slice(0, 200)}\`);
  }
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(\`Expected JSON but got \${contentType}\`);
  }
  return response.json();
}

// Pattern 4: Validate JSON structure after parsing
function parseUser(jsonString) {
  const data = JSON.parse(jsonString);
  if (!data || typeof data !== 'object') throw new Error('Expected object');
  if (!data.id || !data.email) throw new Error('Missing required fields');
  return data;
}

// Pattern 5: For Python — use json module, not eval()
import json
# ❌ Never: eval(json_string)
# ✅ Always: json.loads(json_string) with try/except json.JSONDecodeError`}
      </CodeBlock>

      <SectionHeader number={7} title="Debugging JSON Errors Step by Step" />
      <VerticalSteps steps={[
        { title: 'Read the error message carefully', desc: 'The error message tells you exactly what went wrong: "Unexpected token <" means HTML received. "Unexpected token }" means trailing comma or extra brace. "Unexpected end of JSON input" means truncated. The token mentioned is usually the first character that confused the parser.' },
        { title: 'Print the raw string before parsing', desc: 'Before JSON.parse(), log the exact string: console.log("Raw:", JSON.stringify(rawString)) or in Python print(repr(raw_string)). This reveals invisible characters, encoding issues, HTML contamination, or unexpected content that looks fine in normal logging.' },
        { title: 'Use a JSON validator to find the exact location', desc: 'Paste your JSON into a validator (unblockdevs.com/json-validator, jsonlint.com) — it pinpoints the exact line and character position of the error. Much faster than reading long JSON manually to find a missing comma or brace.' },
        { title: 'Check the source — where is the JSON coming from?', desc: 'Is it from an API response? Check the raw HTTP response (curl -v or Chrome DevTools Network tab → Response tab). Is it from a file? Check file encoding. Is it from user input? Validate and sanitize before parsing.' },
        { title: 'Check the Content-Type header', desc: 'A server returning the wrong Content-Type header (text/html instead of application/json) usually means the endpoint returned an error page. Check the full response headers and status code. A 401 Unauthorized often returns an HTML login page, causing "Unexpected token <".' },
      ]} />

      <AlertBox type="tip" title="Use our JSON Fixer tool for instant repair">
        Our JSON Fixer at unblockdevs.com automatically detects and repairs trailing commas, single quotes,
        comments, undefined values, and most other common JSON errors. Paste broken JSON, get valid JSON
        back in one click — no manual hunting for the error location.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does JSON.parse() throw "Unexpected token <"?',
          answer: 'The {"<"} character is the beginning of an HTML tag ({"<html>"} or {"<!DOCTYPE html>"}). This error means your code received an HTML page instead of a JSON response. Common causes: 404 Not Found page, 500 Internal Server Error page, authentication redirect to a login page, or calling the wrong URL entirely. Fix: check response.ok and response.status before calling .json(). Log response.text() to see the actual HTML content.',
        },
        {
          question: 'Does JSON support comments?',
          answer: 'No — JSON explicitly does not support comments. Douglas Crockford (JSON\'s creator) intentionally excluded comments because they were being used to include parsing directives that would break interoperability. If you need comments in JSON-like config files, use JSONC (JSON with Comments, used by VS Code\'s settings.json), JSON5 (JSON5.parse()), or YAML. Never include // or /* */ in standard JSON.',
        },
        {
          question: 'Why does JSON require double quotes but JavaScript allows single quotes?',
          answer: 'JSON was designed as a data interchange format with a deliberately strict spec to ensure all parsers everywhere behave identically. JavaScript object literals are more lenient (single quotes, trailing commas, unquoted keys) because they\'re code parsed by one engine. JSON\'s strictness is intentional — it guarantees that json.parse() in Python produces the same result as JSON.parse() in JavaScript, which wouldn\'t be true with a looser format.',
        },
        {
          question: 'How do I handle undefined and NaN values in JSON?',
          answer: 'JSON has no undefined, NaN, or Infinity. When you JSON.stringify() an object: undefined values are omitted from objects (the key disappears entirely), undefined in arrays becomes null, NaN becomes null, Infinity becomes null. If you need to preserve these values, use a replacer function: JSON.stringify(obj, (key, val) => val === undefined ? null : val) to convert undefined to null explicitly.',
        },
        {
          question: 'What is the difference between JSON and JavaScript object literals?',
          answer: 'JavaScript object literals allow: single quotes, unquoted keys (no quotes at all), trailing commas, // comments, undefined values, NaN, Infinity, function values, and Symbol keys. JSON allows none of these — all keys must be double-quoted strings, all values must be strings/numbers/booleans/null/arrays/objects, no trailing commas, no comments. JSON is a strict data format; JavaScript object literals are code syntax. They look similar but have different rules.',
        },
        {
          question: 'How do I format JSON nicely for debugging?',
          answer: 'JSON.stringify(data, null, 2) adds 2-space indentation and line breaks. JSON.stringify(data, null, "\\t") uses tabs. The second argument (null here) is a replacer for filtering/transforming values. In Python: json.dumps(data, indent=2). In terminal: echo "$JSON" | python3 -m json.tool. For large JSON in browser: copy the variable in DevTools console and use JSON.stringify(data, null, 2) — then paste into a text editor or JSONLint.',
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
