'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixUnexpectedEndOfJsonInputErrorExplainedClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected End of JSON Input" Error — Every Cause Explained</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected end of JSON input</code> means <code>JSON.parse()</code> received
        an incomplete or empty string. The JSON was cut off before it finished — a missing closing
        bracket, empty response body, or truncated network response. This guide covers every cause
        with working fixes: empty strings, API empty responses, truncated JSON, localStorage edge cases,
        Node.js stream issues, and how to diagnose any occurrence in under 2 minutes.
      </p>

      <StatGrid stats={[
        { value: 'Empty string', label: 'most common cause — JSON.parse("") always throws', color: 'red' },
        { value: 'API 204/empty', label: 'server returns empty body — check Network tab first', color: 'amber' },
        { value: '2 minutes', label: 'to diagnose with browser DevTools Network tab', color: 'green' },
        { value: '6 causes', label: 'root causes covered with specific fixes', color: 'blue' },
      ]} />

      <AlertBox type="warning" title="The exact error message">
        SyntaxError: Unexpected end of JSON input — JavaScript (Chrome/Node.js/Safari)
        SyntaxError: JSON.parse: unexpected end of data at line 1 column 1 — Firefox
        The error fires inside JSON.parse() when the input string ends before the JSON structure is complete.
      </AlertBox>

      <SectionHeader number={1} title="Cause 1 — Parsing an Empty or Null String" />
      <p>
        The most common cause. <code>JSON.parse("")</code> and <code>JSON.parse(null)</code>
        throw immediately. This happens when an API returns an empty body, a localStorage key doesn't
        exist, or a variable hasn't been assigned yet.
      </p>
      <QuickFact color="red" label="The empty string rule">
        JSON.parse("") throws immediately. An empty string is not valid JSON.
        The most common cause: your API returned an empty body (HTTP 204, network error, or empty response).
        Always validate the string before parsing: check it exists, is a string type, and is not empty.
      </QuickFact>
      <ErrorFix
        title="Always validate before parsing"
        bad={`// Empty string or undefined fed to JSON.parse
const data = JSON.parse("");        // ❌ SyntaxError: Unexpected end of JSON input
const data = JSON.parse(undefined); // ❌ SyntaxError
const data = JSON.parse(null);      // Returns null — special case, doesn't throw!
const data = JSON.parse("  ");      // ❌ SyntaxError — whitespace-only string`}
        good={`// Safe JSON parse with validation and fallback
function safeJsonParse(str, fallback = null) {
  if (!str || typeof str !== 'string') return fallback;
  const trimmed = str.trim();
  if (!trimmed) return fallback;  // empty or whitespace-only
  try {
    return JSON.parse(trimmed);
  } catch (err) {
    console.error('[safeJsonParse] Failed:', err.message, 'Input:', str.slice(0, 100));
    return fallback;
  }
}

// Usage:
const data = safeJsonParse(rawResponse, []);     // default to empty array
const config = safeJsonParse(configStr, {});     // default to empty object
const value = safeJsonParse(localStorage.getItem('key'), null);`}
        badLabel="Parse without checking — throws on empty"
        goodLabel="Validate and try/catch — returns fallback gracefully"
      />

      <SectionHeader number={2} title="Cause 2 — API Returned an Empty Response Body" />
      <p>
        When a fetch/axios request returns a 204 No Content, an error response with no body,
        or a network failure, the response body is empty. Calling <code>.json()</code> on an
        empty body triggers this error.
      </p>
      <ErrorFix
        title="Check the body before parsing"
        bad={`// response.json() on an empty body → SyntaxError
const response = await fetch('/api/users/123');
const user = await response.json(); // throws if body is empty (204, network error, etc.)`}
        good={`// Read as text first, check content, then parse
const response = await fetch('/api/users/123');

// Check HTTP status first
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}

// Check if there's actually a body
const text = await response.text();
if (!text.trim()) {
  console.warn('API returned empty body for', response.url);
  return null;  // or handle empty as appropriate
}

// Now safe to parse
let data;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error('API response was not valid JSON:', text.slice(0, 200));
  throw err;
}
return data;`}
        badLabel="response.json() throws on empty body"
        goodLabel="Read as text first, validate, then parse"
      />

      <SectionHeader number={3} title="Cause 3 — Truncated or Malformed JSON" />
      <AlertBox type="warning" title="Examples of truncated JSON that trigger this error">
        {`{"name": "Alice", "age":  ← cut off mid-value`}
        {`[1, 2, 3,  ← missing closing bracket`}
        {`{"items": [{"id": 1}, {"id": 2  ← never closed`}
        {`{"status": "ok", "data":  ← value never provided`}
      </AlertBox>
      <p>
        Check the raw response in DevTools → Network tab → click the request → Response tab.
        If the JSON is visibly cut off, the issue is server-side: a buffer overflow, timeout
        mid-response, or server crash while streaming the response body.
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Server crash mid-response', description: 'The server starts sending JSON but crashes or times out before completing. Check your server logs for the time of the request. Look for unhandled exceptions or OOM errors on the server. The Network tab shows truncated content.' },
        { title: 'Response size limit hit', description: 'Some proxies, load balancers, or CDNs have response body size limits. If your response exceeds the limit, it gets cut off. Check the Content-Length header vs the actual bytes received.' },
        { title: 'Network interruption', description: 'Mobile connections or flaky networks can drop mid-response. The client receives partial data. Implement retry logic for network errors. Check the Network tab for failed or cancelled requests.' },
        { title: 'Streaming response not fully consumed', description: 'If using Node.js streams or Response.body streams, partially reading the stream gives truncated data. Always read the full stream before parsing.' },
      ]} />

      <SectionHeader number={4} title="Cause 4 — Reading a File That Doesn't Exist or Is Empty" />
      <ErrorFix
        title="Read and validate file content before parsing"
        bad={`const fs = require('fs');
// If file doesn't exist → readFileSync throws ENOENT
// If file exists but is empty → JSON.parse("") throws
const data = JSON.parse(fs.readFileSync('config.json', 'utf8'));`}
        good={`const fs = require('fs');
const path = require('path');

function readJsonFile(filePath, fallback = null) {
  const absolutePath = path.resolve(filePath);

  // Check existence first
  if (!fs.existsSync(absolutePath)) {
    console.error('File not found:', absolutePath);
    return fallback;
  }

  const content = fs.readFileSync(absolutePath, 'utf8');

  if (!content.trim()) {
    console.error('File is empty:', absolutePath);
    return fallback;
  }

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error('Invalid JSON in file:', absolutePath, err.message);
    return fallback;
  }
}

const config = readJsonFile('./config.json', {});  // safe`}
        badLabel="No validation — crashes on missing or empty file"
        goodLabel="Check existence, check emptiness, wrap in try/catch"
      />

      <SectionHeader number={5} title="Cause 5 — localStorage Returns null" />
      <ErrorFix
        title="Check localStorage value before parsing"
        bad={`// localStorage.getItem() returns null if the key doesn't exist
const prefs = JSON.parse(localStorage.getItem('userPrefs')); // null → SyntaxError`}
        good={`// Pattern 1: null check before parsing
const raw = localStorage.getItem('userPrefs');
const prefs = raw ? JSON.parse(raw) : {};  // default to empty object

// Pattern 2: use safeJsonParse for full protection
const prefs = safeJsonParse(localStorage.getItem('userPrefs'), {});

// Pattern 3: utility function that wraps the whole get+parse flow
function getFromStorage(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch {
    localStorage.removeItem(key);  // clear corrupted data
    return fallback;
  }
}

const prefs = getFromStorage('userPrefs', { theme: 'dark', fontSize: 14 });`}
        badLabel="Parse null directly — throws immediately"
        goodLabel="Check for null before parsing — use fallback"
      />

      <SectionHeader number={6} title="Cause 6 — Parsing Chunks of a Node.js Stream" />
      <ErrorFix
        title="Buffer the full request body before parsing"
        bad={`// ❌ Each data chunk may be only part of the full JSON body
req.on('data', (chunk) => {
  const data = JSON.parse(chunk);  // chunk = partial JSON → throws
  // ...
});`}
        good={`// ✅ Buffer all chunks, then parse complete body at end
let body = '';
req.on('data', (chunk) => {
  body += chunk.toString();  // accumulate chunks
});
req.on('end', () => {
  if (!body.trim()) {
    return res.status(400).json({ error: 'Empty request body' });
  }
  try {
    const data = JSON.parse(body);  // parse complete JSON
    // process data...
  } catch (err) {
    res.status(400).json({ error: 'Invalid JSON in request body' });
  }
});
req.on('error', (err) => {
  console.error('Request error:', err);
  res.status(500).end();
});

// Better: use express.json() middleware (handles all of the above automatically)
app.use(express.json());  // no manual buffering needed`}
        badLabel="Parse each chunk — partial JSON throws"
        goodLabel="Buffer all chunks, parse once at end"
      />

      <SectionHeader number={7} title="Diagnostic Steps — Find the Root Cause in 2 Minutes" />
      <VerticalSteps steps={[
        { title: 'Log the raw value before parsing', desc: 'Add: console.log("About to parse:", JSON.stringify(rawValue).slice(0, 500)) immediately before the JSON.parse() call. This shows exactly what string you\'re parsing.' },
        { title: 'Check Network tab response body', desc: 'Open DevTools → Network → find the API request → Response tab. Is the body empty? Is it HTML (an error page) instead of JSON? Is the JSON visibly cut off? This identifies server-side issues immediately.' },
        { title: 'Check response Content-Length', desc: 'Network → Headers tab. Compare the Content-Length header value to the actual response body size shown. If they don\'t match, the response was truncated by a proxy or network issue.' },
        { title: 'Look at the HTTP status code', desc: 'A 204 No Content or 0 (network failure) legitimately has an empty body. A 200 with an empty body is a server bug. A 500 may return an HTML error page instead of JSON.' },
        { title: 'Wrap in try/catch with full error logging', desc: 'Add: try { JSON.parse(str) } catch(e) { console.error("Parse failed. Input was:", typeof str, str?.slice(0, 500)) } to capture the exact failing input in your logs.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between "Unexpected end of JSON input" and "Unexpected token"?',
          answer: '"Unexpected end of JSON input" means the string ran out before the JSON structure was complete — the input is too short (empty, cut off, or null). "Unexpected token" means there was a character that doesn\'t belong at that position — often an HTML character like < from <!DOCTYPE, a single quote instead of double quote, or a trailing comma. The first error means the JSON is incomplete; the second means it has invalid syntax.',
        },
        {
          question: 'My server returns 200 OK but the body is empty — why?',
          answer: 'Some APIs return 200 with an empty body to indicate "no results" or "operation succeeded without a response". This is a poor API design — the correct REST behavior is to return 200 with an empty array [] for empty collections, or 204 No Content for operations that don\'t return data. Handle both cases: if (text && text.trim()) { return JSON.parse(text); } else { return []; }.',
        },
        {
          question: 'How do I handle this in TypeScript?',
          answer: 'TypeScript doesn\'t add runtime protection — the same error occurs at runtime regardless of type annotations. Use the same try/catch + null check pattern. Consider using zod for runtime validation: z.parse(JSON.parse(text)) validates both the JSON parsing and the schema structure, giving you type-safe results with clear error messages for both malformed JSON and schema violations.',
        },
        {
          question: 'Can JSON.parse throw anything other than SyntaxError?',
          answer: 'In practice, JSON.parse either succeeds or throws a SyntaxError. A plain catch(e) block safely handles all cases. Note: JSON.parse(null) returns null without throwing (null is coerced to the string "null" which is valid JSON). JSON.parse(undefined) throws "Unexpected token u". JSON.parse("") throws "Unexpected end of JSON input".',
        },
        {
          question: 'How do I prevent this error from a third-party API I don\'t control?',
          answer: 'Defensive coding: always use the text() → parse() pattern instead of .json(), always wrap JSON.parse in try/catch, log the raw response when parsing fails so you can see what the API actually returned. Implement retry logic for transient failures (network errors, 503s). Consider an exponential backoff for retries. If the API is unreliable, add circuit breaker logic to fail fast when the error rate is high.',
        },
        {
          question: 'What is the safest way to use JSON.parse in production code?',
          answer: 'Use a wrapper function: function safeJsonParse(str, fallback = null) { if (!str || typeof str !== "string" || !str.trim()) return fallback; try { return JSON.parse(str); } catch (e) { logger.error("JSON parse failed", { input: str.slice(0, 200), error: e.message }); return fallback; } }. This handles all edge cases (null, undefined, empty string, invalid JSON), logs failures with context for debugging, and returns a sensible default instead of crashing the application.',
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
