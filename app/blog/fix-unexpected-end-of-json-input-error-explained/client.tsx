'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixUnexpectedEndOfJsonInputErrorExplainedClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected End of JSON Input" Error — Every Cause Explained</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected end of JSON input</code> means JSON.parse() received an incomplete
        or empty string. The JSON was cut off before it finished — a missing closing bracket, empty response,
        or truncated data. This guide covers every cause with working fixes.
      </p>

      <StatGrid stats={[
        { value: 'Empty', label: 'most common: empty response body', color: 'red' },
        { value: 'Truncated', label: 'network cut off the response', color: 'amber' },
        { value: '2 min', label: 'to diagnose with Network tab', color: 'green' },
        { value: '5+', label: 'root causes covered', color: 'blue' },
      ]} />

      <AlertBox type="error" title="The exact error">
        SyntaxError: Unexpected end of JSON input
        — or in Node.js —
        SyntaxError: Unexpected end of JSON input at JSON.parse (&lt;anonymous&gt;)
      </AlertBox>

      <SectionHeader number={1} title="Cause 1 — Parsing an Empty String" />
      <QuickFact>
        JSON.parse("") throws immediately. An empty string is not valid JSON.
        The most common cause: your API returned an empty body (HTTP 204, network error, or empty response).
      </QuickFact>

      <ErrorFix
        bad={`// Empty string or undefined fed to JSON.parse
const data = JSON.parse("");      // ❌ SyntaxError
const data = JSON.parse(undefined); // ❌ SyntaxError
const data = JSON.parse(null);    // ❌ SyntaxError`}
        good={`// Always check before parsing
function safeJsonParse(str, fallback = null) {
  if (!str || typeof str !== 'string') return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}`}
        badLabel="Parse without checking"
        goodLabel="Safe parse with validation"
      />

      <SectionHeader number={2} title="Cause 2 — API Returned Empty Body" />
      <ErrorFix
        bad={`// response.json() on empty body → SyntaxError
fetch('/api/endpoint')
  .then(res => res.json()) // if body is empty → error`}
        good={`fetch('/api/endpoint')
  .then(async res => {
    // Check Content-Length or read as text first
    const text = await res.text();
    if (!text) return null; // handle empty response

    return JSON.parse(text);
  })`}
        badLabel="res.json() on empty response"
        goodLabel="Read as text first, check before parsing"
      />

      <SectionHeader number={3} title="Cause 3 — Malformed / Truncated JSON" />
      <AlertBox type="error" title="Examples of truncated JSON">
        {`{"name": "Alice", "age":  ← cut off here`}
        {`[1, 2, 3,  ← missing closing bracket`}
        {`{"items": [  ← never closed`}
      </AlertBox>

      <p>Check the raw response in DevTools → Network → Response tab. If it's cut off, the issue is server-side (buffer overflow, timeout, crash mid-response).</p>

      <SectionHeader number={4} title="Cause 4 — Reading a File That Doesn't Exist" />
      <ErrorFix
        bad={`const fs = require('fs');
// File doesn't exist → fs.readFileSync throws, or returns empty
const data = JSON.parse(fs.readFileSync('config.json', 'utf8')); // may error`}
        good={`const fs = require('fs');

function readJsonFile(path) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    if (!content.trim()) {
      console.error('File is empty:', path);
      return null;
    }
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to read/parse JSON:', path, err.message);
    return null;
  }
}`}
        badLabel="No error handling"
        goodLabel="Check file exists and content not empty"
      />

      <SectionHeader number={5} title="Cause 5 — localStorage Returns null" />
      <ErrorFix
        bad={`// localStorage.getItem returns null if key doesn't exist
const prefs = JSON.parse(localStorage.getItem('prefs')); // null → error`}
        good={`const raw = localStorage.getItem('prefs');
const prefs = raw ? JSON.parse(raw) : {}; // safe fallback`}
        badLabel="Parse null directly"
        goodLabel="Check for null before parsing"
      />

      <SectionHeader number={6} title="Cause 6 — Incomplete JSON in Node.js Streams" />
      <ErrorFix
        bad={`// Parsing chunks of a stream as they arrive → JSON may be split
req.on('data', chunk => {
  const data = JSON.parse(chunk); // ❌ chunk may be half of JSON
});`}
        good={`// Collect all chunks, parse at end
let body = '';
req.on('data', chunk => { body += chunk; });
req.on('end', () => {
  try {
    const data = JSON.parse(body); // ✅ complete JSON
  } catch (err) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
});`}
        badLabel="Parse each chunk individually"
        goodLabel="Buffer all chunks, parse complete body"
      />

      <SectionHeader number={7} title="Diagnostic Steps" />
      <VerticalSteps steps={[
        { title: 'Log the raw value before parsing', description: 'console.log(typeof data, JSON.stringify(data)) — see exactly what you\'re trying to parse.', code: 'console.log("About to parse:", JSON.stringify(rawData).slice(0, 200));' },
        { title: 'Check Network tab response body', description: 'DevTools → Network → Response. Is it empty? Is it HTML instead of JSON? Is it truncated?' },
        { title: 'Check Content-Length header', description: 'If Content-Length doesn\'t match actual body size, data was truncated.' },
        { title: 'Wrap in try/catch', description: 'Always wrap JSON.parse in try/catch in production code.', code: 'try { JSON.parse(str) } catch(e) { console.error(str) }' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between "Unexpected end of JSON input" and "Unexpected token"?',
          answer: '"Unexpected end" means the string ran out before JSON was complete. "Unexpected token" means there was a character that doesn\'t belong (often HTML like <!DOCTYPE> when the server returned an error page instead of JSON).',
        },
        {
          question: 'My server returns 200 OK but body is empty. Why?',
          answer: 'Some APIs return 200 with an empty body for "no results" instead of 200 with an empty array []. Check your API docs. The correct REST behavior is to return [] for empty collections, not an empty body. Handle both: if (text) { JSON.parse(text) } else { return []; }',
        },
        {
          question: 'How do I handle this in TypeScript?',
          answer: 'TypeScript doesn\'t add runtime protection — the same error occurs. Use the same try/catch + null check pattern. Consider a library like zod for runtime validation: z.parse(JSON.parse(text)) gives you both parsing and schema validation.',
        },
        {
          question: 'Can JSON.parse throw anything other than SyntaxError?',
          answer: 'In practice, JSON.parse either succeeds or throws a SyntaxError. A catch(e) block with no type check is safe. Note: JSON.parse(null) → null (doesn\'t throw), JSON.parse(undefined) → throws, JSON.parse("") → throws.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
