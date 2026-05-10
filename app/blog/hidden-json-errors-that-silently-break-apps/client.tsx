'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HiddenJsonErrorsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Hidden JSON Errors That Silently Break Your App — Duplicate Keys, BOM, Precision Loss, and More</h1>
      <p className="lead">
        Most JSON bugs announce themselves: a red <code>SyntaxError</code>, a failed parse, a
        crash you cannot miss. But some JSON errors are far more dangerous — they succeed silently,
        corrupt your data without a single exception, and manifest as mysterious production bugs
        weeks later. This guide covers the six hidden JSON error categories that slip past your
        parser, your tests, and your code review, and gives you the patterns to detect and prevent them.
      </p>

      <StatGrid stats={[
        { value: 'Silent', label: 'duplicate key loss — later value wins, no error thrown', color: 'red' },
        { value: '3 bytes', label: 'UTF-8 BOM — invisible characters that break every parser', color: 'amber' },
        { value: '2^53-1', label: 'max safe integer — beyond this, JSON numbers silently round', color: 'red' },
        { value: '0 errors', label: 'thrown for any of these bugs — they all pass JSON.parse()', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Duplicate Keys — Silent Data Loss" />
      <p>
        The JSON specification says keys in an object <em>should</em> be unique (RFC 8259 §4 uses
        SHOULD, not MUST). This means duplicate keys are technically allowed at the format level but
        semantically forbidden. Different parsers handle duplicates differently — and almost none of
        them warn you.
      </p>

      <QuickFact color="red" label="Every parser behaves differently — and none of them warn you">
        JavaScript&apos;s <code>JSON.parse()</code> silently keeps the <em>last</em> value for a
        duplicate key. Python&apos;s <code>json.loads()</code> also keeps the last value. Some Go
        and Java parsers keep the first. The RFC says the behaviour is undefined. This means a
        duplicate key is a silent data loss bug across all standard parsers.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Duplicate keys — silent data loss in every standard parser
{
  "status": "active",
  "role": "admin",
  "status": "inactive",
  "email": "user@example.com",
  "role": "user"
}

// After JSON.parse() in JavaScript:
// { status: "inactive", role: "user", email: "user@example.com" }
// The first "status": "active" and first "role": "admin" are gone — silently`}
        good={`// ✅ Unique keys — no ambiguity
{
  "status": "inactive",
  "role": "user",
  "email": "user@example.com"
}

// To detect duplicate keys before parsing:
function findDuplicateKeys(json) {
  const keyCount = {};
  const keyRe = /"((?:[^"\\\\]|\\\\.)*)"\s*:/g;
  let match;
  while ((match = keyRe.exec(json)) !== null) {
    const key = match[1];
    keyCount[key] = (keyCount[key] || 0) + 1;
  }
  return Object.entries(keyCount)
    .filter(([, count]) => count > 1)
    .map(([key]) => key);
}

findDuplicateKeys(brokenJson);
// → ["status", "role"]  — caught before any silent loss`}
        badLabel="Duplicate keys — last value wins, first value lost silently"
        goodLabel="Unique keys + pre-parse duplicate detection"
      />

      <CodeBlock language="javascript" filename="Production duplicate key detection">
{`// Full duplicate key validator — works before parsing
function validateNoDuplicateKeys(jsonText) {
  const errors = [];
  const keyRe = /"((?:[^"\\\\]|\\\\.)*)"\s*:/g;
  const occurrences = new Map();
  let match;

  while ((match = keyRe.exec(jsonText)) !== null) {
    const key = match[1];
    const line = (jsonText.slice(0, match.index).match(/\\n/g) || []).length + 1;
    if (!occurrences.has(key)) {
      occurrences.set(key, []);
    }
    occurrences.get(key).push(line);
  }

  for (const [key, lines] of occurrences) {
    if (lines.length > 1) {
      errors.push({
        key,
        lines,
        message: \`Key "\${key}" appears \${lines.length}× on lines: \${lines.join(', ')}. All values except the last will be silently discarded.\`,
      });
    }
  }

  return errors;
}

// Usage:
const dupes = validateNoDuplicateKeys(jsonString);
if (dupes.length > 0) {
  console.warn('Duplicate keys detected:', dupes);
  // Handle: throw, warn, or show to the user
}

// Python alternative — detect with a custom object_pairs_hook:
import json

def detect_duplicates(pairs):
    keys = [k for k, _ in pairs]
    dupes = {k for k in keys if keys.count(k) > 1}
    if dupes:
        raise ValueError(f"Duplicate JSON keys found: {dupes}")
    return dict(pairs)

json.loads(json_string, object_pairs_hook=detect_duplicates)
# → raises ValueError if any key appears more than once`}
      </CodeBlock>

      <AlertBox type="warning" title="When duplicate keys appear in AI-generated JSON">
        AI language models frequently generate duplicate keys in JSON when a long object has many
        properties. This is especially common when the model is asked to merge or update a JSON
        object — it sometimes re-includes existing keys with new values without removing the originals.
        Always check AI-generated JSON for duplicates before using the data.
      </AlertBox>

      <SectionHeader number={2} title="UTF-8 BOM — Three Invisible Bytes That Break Everything" />
      <p>
        The UTF-8 Byte Order Mark (BOM) is an invisible character (<code>﻿</code>) placed at
        the very start of some text files to indicate they are UTF-8 encoded. It was inherited from
        UTF-16 where byte order genuinely matters. In UTF-8 it is meaningless — but it is still
        written by some editors, particularly on Windows.
      </p>

      <QuickFact color="amber" label="The BOM is invisible in most editors and terminals">
        You cannot see the BOM by looking at the file content. It renders as nothing in most text
        editors and terminals. But JSON parsers see it as the first character before the opening
        <code>{'{'}</code>, which immediately causes a <code>SyntaxError: Unexpected token ﻿</code>.
        RFC 8259 §8.1 explicitly forbids a BOM at the beginning of a JSON document.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ File starts with BOM (invisible as ﻿ — 3 bytes: EF BB BF)
﻿{"name": "Alice", "age": 30}

// JSON.parse() throws:
// SyntaxError: Unexpected token ﻿ in JSON at position 0

// How to detect a BOM:
const hasBom = text.charCodeAt(0) === 0xFEFF;
console.log(hasBom); // → true`}
        good={`// ✅ Strip BOM before parsing
function parseJsonSafe(text) {
  // Remove BOM if present
  const clean = text.startsWith('\\uFEFF') ? text.slice(1) : text;
  return JSON.parse(clean);
}

// Or using charCodeAt:
function stripBom(text) {
  return text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
}

// Node.js — reading files
const fs = require('fs');
const raw = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(stripBom(raw));

// Python — strip BOM from file
with open('data.json', encoding='utf-8-sig') as f:  # utf-8-sig strips BOM automatically
    data = json.load(f)

// Editor fix: In VS Code, bottom-right click "UTF-8 with BOM" →
// "Save with Encoding" → "UTF-8" to save without BOM`}
        badLabel="JSON with invisible BOM — crashes every parser"
        goodLabel="Strip BOM before parsing"
      />

      <CodeBlock language="javascript" filename="Detecting and reporting BOM in production">
{`// Robust JSON file loader — handles BOM, encoding, empty files
async function loadJsonFile(filePath) {
  const { readFile } = await import('fs/promises');

  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (e) {
    throw new Error(\`Cannot read file \${filePath}: \${e.message}\`);
  }

  if (!raw.trim()) {
    throw new Error(\`File \${filePath} is empty\`);
  }

  // Detect and strip BOM
  const hasBom = raw.charCodeAt(0) === 0xFEFF;
  if (hasBom) {
    console.warn(\`Warning: \${filePath} has a UTF-8 BOM — stripping before parse\`);
    raw = raw.slice(1);
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(\`JSON parse error in \${filePath}: \${e.message}\`);
  }
}

// Detecting BOM in HTTP response:
async function fetchJsonRobust(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  const text = await response.text();
  const clean = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
  return JSON.parse(clean);
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Number Precision Loss — When Large IDs Silently Change" />
      <p>
        JSON numbers have no size limit in the specification — a JSON number can be arbitrarily large.
        But the <em>parsers</em> do have limits. JavaScript uses IEEE 754 double-precision floating
        point for all numbers, which can only represent integers exactly up to
        <code>Number.MAX_SAFE_INTEGER = 9007199254740991</code> (2&#x2075;&#x00B3; - 1).
        Numbers beyond this silently round to the nearest representable value.
      </p>

      <QuickFact color="red" label="This is the #1 cause of mysterious ID mismatches in production">
        Database systems like PostgreSQL, MySQL, and MongoDB routinely use 64-bit integers for primary
        keys. Twitter (now X), for example, uses Snowflake IDs that exceed
        <code>Number.MAX_SAFE_INTEGER</code>. When these IDs are serialized as JSON numbers and
        parsed by JavaScript, they silently round to a different value. The parsed ID no longer
        matches the database record. No error is thrown.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Large integer ID loses precision in JSON parsing
// Server returns:
{ "id": 9007199254740993, "name": "Tweet" }

// After JSON.parse() in JavaScript:
const tweet = JSON.parse('{"id": 9007199254740993, "name": "Tweet"}');
console.log(tweet.id); // → 9007199254740992  ← WRONG! Lost precision silently
console.log(tweet.id === 9007199254740993); // → false!

// This causes:
// - API calls to the wrong resource
// - Database lookups that fail silently
// - Incorrect equality checks
// - Log entries with wrong IDs`}
        good={`// ✅ Store large integers as strings in JSON
// Server returns:
{ "id": "9007199254740993", "name": "Tweet" }

// Now precision is preserved:
const tweet = JSON.parse('{"id": "9007199254740993", "name": "Tweet"}');
console.log(tweet.id); // → "9007199254740993" ✅ exact

// When you need to do math:
const id = BigInt(tweet.id); // → 9007199254740993n (exact)

// Or use a JSON reviver to auto-convert:
function parseWithBigIntIds(json) {
  return JSON.parse(json, (key, value) => {
    // Convert any string that looks like a large integer to BigInt
    if (typeof value === 'string' && /^\\d{16,}$/.test(value)) {
      return BigInt(value);
    }
    return value;
  });
}

// Backend: always return large IDs as strings
// Express/Node.js:
res.json({ id: String(user.id), name: user.name });`}
        badLabel="Large integer as JSON number — silently rounds"
        goodLabel="Large integer as JSON string — exact precision"
      />

      <CodeBlock language="javascript" filename="Detecting precision loss in JSON responses">
{`// Detect if a JSON number string will lose precision after parsing
function detectPrecisionLoss(jsonText) {
  const numberRe = /:\s*(-?\d{16,}(?:\.\d+)?)/g;
  const warnings = [];
  let match;

  while ((match = numberRe.exec(jsonText)) !== null) {
    const numStr = match[1];
    const parsed = parseFloat(numStr);
    const reparsed = String(parsed);

    if (reparsed !== numStr && !numStr.includes('.')) {
      const line = (jsonText.slice(0, match.index).match(/\\n/g) || []).length + 1;
      warnings.push({
        original: numStr,
        parsed: reparsed,
        line,
        message: \`Number \${numStr} will parse as \${reparsed} — precision loss!\`,
      });
    }
  }

  return warnings;
}

// Check API responses before using them:
const json = await response.text();
const precisionWarnings = detectPrecisionLoss(json);
if (precisionWarnings.length > 0) {
  console.warn('Precision loss detected in JSON:', precisionWarnings);
}

// Node.js: use a streaming parser that supports BigInt
// npm install json-bigint
import JSONBig from 'json-bigint';
const parsed = JSONBig.parse(json);  // large integers become BigInt automatically`}
      </CodeBlock>

      <SectionHeader number={4} title="Control Characters — Invisible Corruption in Strings" />
      <p>
        JSON strings cannot contain unescaped control characters — characters with Unicode code points
        U+0000 through U+001F. These include ASCII control codes: null byte (<code>\\u0000</code>),
        bell (<code>\\u0007</code>), backspace (<code>\\u0008</code>), and others. Most parsers
        accept them silently and include them in the parsed string — leading to corrupted data
        that looks normal when printed but contains invisible characters.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Where they come from',
          description: 'User input pasted from rich-text editors, clipboard data from productivity apps, form fields in mobile browsers, copy-pasted content from PDFs or Office documents. The characters are invisible in UIs but present in the underlying string.',
        },
        {
          title: 'Why they cause problems',
          description: 'Databases may reject strings with null bytes (PostgreSQL throws "invalid byte sequence for encoding UTF8: 0x00"). ElasticSearch indexing fails. CSV exports include them. String comparisons fail. The text looks identical when displayed but is not equal.',
        },
        {
          title: 'RFC 8259 §7 says',
          description: 'All characters from U+0000 to U+001F MUST be escaped. So a well-formed JSON string cannot contain raw control characters — they must be written as \\u0000 through \\u001F. Most parsers accept raw control characters anyway, violating the spec.',
        },
        {
          title: 'The null byte is the worst',
          description: 'The null byte (\\u0000) is treated as a string terminator in C, C++, and many C-based libraries. A JSON string containing a null byte will be silently truncated when passed to native code, security systems, or databases written in C.',
        },
      ]} />

      <CodeBlock language="javascript" filename="Sanitizing control characters from JSON strings">
{`// Detect control characters in JSON string values
function findControlChars(jsonText) {
  const controlRe = /[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/g;
  const issues = [];
  let match;

  while ((match = controlRe.exec(jsonText)) !== null) {
    const charCode = match[0].charCodeAt(0);
    const line = (jsonText.slice(0, match.index).match(/\\n/g) || []).length + 1;
    issues.push({
      char: \`\\\\u\${charCode.toString(16).padStart(4, '0')}\`,
      code: charCode,
      line,
      context: jsonText.slice(Math.max(0, match.index - 20), match.index + 20),
    });
  }

  return issues;
}

// Sanitize string values after parsing
function sanitizeControlChars(value) {
  if (typeof value === 'string') {
    // Remove null bytes (most dangerous), escape other control chars
    return value
      .replace(/\\x00/g, '')              // strip null bytes
      .replace(/[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/g, ''); // strip other controls
  }
  if (Array.isArray(value)) return value.map(sanitizeControlChars);
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitizeControlChars(v)])
    );
  }
  return value;
}

// Full safe parse with control character sanitization:
function safeParseJson(jsonText) {
  const controls = findControlChars(jsonText);
  if (controls.length > 0) {
    console.warn('Control characters in JSON:', controls);
  }
  const parsed = JSON.parse(jsonText); // parse even with control chars
  return sanitizeControlChars(parsed); // then sanitize
}

// For user input — sanitize BEFORE stringifying:
function sanitizeForJson(userInput) {
  if (typeof userInput !== 'string') return userInput;
  return userInput
    .replace(/\\x00/g, '')
    .replace(/[\\x01-\\x1F\\x7F]/g, ' '); // replace with space instead of removing
}

const safePayload = JSON.stringify({
  name: sanitizeForJson(req.body.name),
  bio: sanitizeForJson(req.body.bio),
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Deep Nesting — Stack Overflows That Look Like JSON Errors" />
      <p>
        The JSON specification places no limit on nesting depth. But every parser implementation
        has a practical recursion limit. JavaScript engines typically allow several hundred to a few
        thousand levels of nesting before triggering a stack overflow — which manifests as a
        <code>RangeError: Maximum call stack size exceeded</code>, not a <code>SyntaxError</code>.
        Deeply nested JSON from third-party APIs can trigger this unexpectedly.
      </p>

      <QuickFact color="amber" label="Used as a Denial-of-Service vector — billion laughs for JSON">
        Maliciously crafted deeply nested JSON — sometimes called a &ldquo;JSON bomb&rdquo; — can
        consume exponential memory during parsing. A 10-level deep array where each level has 10
        elements creates 10 billion leaf nodes. Always limit nesting depth for user-submitted JSON.
      </QuickFact>

      <CodeBlock language="javascript" filename="Nesting depth detection and limits">
{`// Measure maximum nesting depth before parsing
function measureNestingDepth(jsonText) {
  let depth = 0, maxDepth = 0;
  let inString = false;

  for (let i = 0; i < jsonText.length; i++) {
    const char = jsonText[i];
    if (char === '\\\\' && inString) { i++; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;

    if (char === '{' || char === '[') { depth++; maxDepth = Math.max(maxDepth, depth); }
    else if (char === '}' || char === ']') depth--;
  }

  return maxDepth;
}

// Safe parse with depth limit
const MAX_NESTING_DEPTH = 50; // reasonable limit for API data

function safeParseWithDepthLimit(jsonText, maxDepth = MAX_NESTING_DEPTH) {
  const depth = measureNestingDepth(jsonText);
  if (depth > maxDepth) {
    throw new Error(\`JSON nesting depth \${depth} exceeds limit of \${maxDepth}. Possible JSON bomb.\`);
  }
  return JSON.parse(jsonText);
}

// In an Express API — validate user-submitted JSON:
app.use(express.json({
  limit: '10mb',          // size limit
  // Add depth checking in a middleware:
}));

app.use((req, res, next) => {
  if (req.headers['content-type']?.includes('application/json')) {
    try {
      const depth = measureNestingDepth(req.body_raw || '');
      if (depth > MAX_NESTING_DEPTH) {
        return res.status(400).json({ error: 'JSON nesting too deep' });
      }
    } catch {}
  }
  next();
});`}
      </CodeBlock>

      <SectionHeader number={6} title="Floating Point Representation — When 0.1 + 0.2 Is Stored in JSON" />
      <p>
        JSON numbers are stored as IEEE 754 double-precision floats by all standard parsers. This
        means the classic JavaScript puzzle — <code>0.1 + 0.2 === 0.30000000000000004</code> — is
        not just a JavaScript problem. If you generate JSON from floating-point arithmetic and then
        parse it, you may get slightly different values than expected. Monetary amounts, scientific
        measurements, and geographic coordinates are all at risk.
      </p>

      <ErrorFix
        bad={`// ❌ Storing floating point arithmetic results directly in JSON
const tax = 0.1;
const price = 2.2;
const total = price + tax; // → 2.3000000000000003

const json = JSON.stringify({ price, tax, total });
// → '{"price":2.2,"tax":0.1,"total":2.3000000000000003}'
// The total stored in JSON is NOT 2.3 — it will always be slightly off`}
        good={`// ✅ Option 1: Round to meaningful precision before stringify
const total = parseFloat((price + tax).toFixed(2)); // → 2.3
JSON.stringify({ price: 2.2, tax: 0.1, total }); // → '{"price":2.2,"tax":0.1,"total":2.3}'

// ✅ Option 2: Store monetary values as integers (cents)
// Never use floats for money — store as integer cents
const priceCents = 220;   // $2.20
const taxCents = 10;      // $0.10
const totalCents = 230;   // $2.30
JSON.stringify({ priceCents, taxCents, totalCents });
// All integers — no precision loss possible

// ✅ Option 3: Use Decimal.js for financial calculations
import Decimal from 'decimal.js';
const total = new Decimal('2.2').plus('0.1'); // exact: 2.3
JSON.stringify({ total: total.toString() });   // store as string: "2.3"

// ✅ Option 4: Round coordinates to meaningful precision
const lat = 37.7749295; // 7 decimal places = ~1cm precision (more than enough)
JSON.stringify({ lat: parseFloat(lat.toFixed(7)) });`}
        badLabel="Raw floating point arithmetic stored in JSON"
        goodLabel="Round, use integer cents, or store as strings"
      />

      <SectionHeader number={7} title="Character Encoding — Beyond ASCII" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'JSON must be Unicode',
          description: 'RFC 8259 §8 requires JSON text to be encoded in UTF-8. UTF-16 and UTF-32 are technically allowed but rarely used. If a JSON file is saved in Latin-1, Windows-1252, or another non-UTF-8 encoding, the result is a corrupted string when parsed as UTF-8 — not an error, just wrong characters.',
        },
        {
          title: 'The replacement character U+FFFD',
          description: 'When a parser encounters invalid UTF-8 byte sequences, it often substitutes the Unicode replacement character (U+FFFD, which displays as "?"). Your parse succeeds but the data contains garbage characters. Always validate encoding before parsing.',
        },
        {
          title: 'HTML entities in JSON strings',
          description: '"name": "Alice &amp; Bob" — HTML entities like &amp;, &lt;, &gt; are not JSON escapes. They should be decoded before storing in JSON, or stored raw (&) and encoded when rendering to HTML. Storing HTML entities in JSON creates double-encoding bugs.',
        },
        {
          title: 'Emoji and supplementary characters',
          description: 'Emoji above U+FFFF (🎉 U+1F389) are stored as UTF-16 surrogate pairs in JavaScript strings. JSON.stringify() handles them correctly. But older or non-standard parsers may mishandle surrogate pairs. Always test with emoji if your API accepts user-generated content.',
        },
      ]} />

      <CodeBlock language="javascript" filename="Encoding validation for JSON">
{`// Detect encoding issues after parse — look for replacement characters
function validateEncoding(parsedObject) {
  const issues = [];

  function scan(value, path) {
    if (typeof value === 'string') {
      if (value.includes('\\uFFFD')) {
        issues.push({ path, value: value.slice(0, 100), issue: 'Contains replacement character (encoding error)' });
      }
      // Check for HTML entities that should have been decoded
      if (/&(?:amp|lt|gt|quot|apos);/.test(value)) {
        issues.push({ path, issue: 'Contains HTML entities — may be double-encoded' });
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => scan(item, \`\${path}[\${i}]\`));
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([k, v]) => scan(v, path ? \`\${path}.\${k}\` : k));
    }
  }

  scan(parsedObject, '');
  return issues;
}

// Node.js — force UTF-8 when reading files
import { readFileSync } from 'fs';
const content = readFileSync('data.json', { encoding: 'utf8' });

// If the file might be in a different encoding, use iconv-lite:
import iconv from 'iconv-lite';
const raw = readFileSync('legacy-data.json'); // Buffer
const utf8 = iconv.decode(raw, 'win1252');    // convert from Windows-1252 to UTF-8
const data = JSON.parse(utf8);`}
      </CodeBlock>

      <SectionHeader number={8} title="The Complete Hidden Error Checklist" />

      <VerticalSteps steps={[
        {
          title: 'Scan for duplicate keys before parsing',
          desc: 'Run a duplicate key scan on any JSON from external sources, AI models, or merged configurations. Use the findDuplicateKeys() function from this guide, or our AI JSON Error Explainer at unblockdevs.com/json-error-explainer which detects duplicates automatically.',
        },
        {
          title: 'Strip BOM from file reads and HTTP responses',
          desc: 'Wrap all JSON reads with a stripBom() function. In Python, use encoding="utf-8-sig" when opening files. In Node.js, check text.charCodeAt(0) === 0xFEFF before parsing. This eliminates a common Windows file editing issue.',
        },
        {
          title: 'Store large integers as strings',
          desc: 'Any integer ID or value that could exceed 2^53-1 (9007199254740991) must be stored as a JSON string, not a JSON number. Coordinate this between your backend and frontend. Use json-bigint on the Node.js side for automatic handling.',
        },
        {
          title: 'Sanitize control characters in user input',
          desc: 'Before storing user-submitted strings in JSON, strip null bytes (\\u0000) and other control characters (\\u0001-\\u001F). These pass the JSON parser but corrupt databases, break CSV exports, and cause security issues in downstream consumers.',
        },
        {
          title: 'Round floating point values to meaningful precision',
          desc: 'Never store raw floating point arithmetic results in JSON for monetary or precision-sensitive data. Use integer cents for money, round coordinates to 7 decimal places, and use Decimal.js for financial calculations.',
        },
        {
          title: 'Validate encoding when reading external JSON files',
          desc: 'Files from external sources may use Windows-1252, Latin-1, or other encodings. Use iconv-lite (Node.js) or chardet (Python) to detect and convert encoding before parsing. Check for \\uFFFD replacement characters in parsed strings.',
        },
      ]} />

      <AlertBox type="tip" title="Use our AI JSON Error Explainer for comprehensive analysis">
        Our free tool at unblockdevs.com/json-error-explainer detects all of these hidden issues
        simultaneously — duplicate keys, BOM characters, control characters, and more — plus the
        standard errors (trailing commas, Python True/False/None, single quotes). Every error is
        explained in plain English with the exact RFC spec reference. 100% browser-based, nothing
        is uploaded.
      </AlertBox>

      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer — Free Tool</p>
        <p className="text-sm text-zinc-600 mb-4">
          Paste any JSON and instantly detect duplicate keys, BOM characters, control characters,
          trailing commas, Python literals, and 10 more error types — with plain-English explanations,
          RFC spec references, and one-click auto-fix. No upload, no account, 100% browser-based.
        </p>
        <a href="/json-error-explainer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Check My JSON Now →
        </a>
      </div>

      <FAQAccordion items={[
        {
          question: 'How do I prevent duplicate keys from appearing in JSON I generate?',
          answer: 'If you build JSON with JSON.stringify() from a JavaScript object, duplicate keys are impossible — JavaScript objects cannot have duplicate keys (the later value always overwrites the earlier one at the object level). Duplicate keys appear in hand-crafted JSON strings, AI-generated JSON, merged or concatenated JSON fragments, and JSON from systems that build JSON text by string concatenation instead of using a proper serializer. The fix: always use JSON.stringify() to generate JSON, never build JSON strings manually.',
        },
        {
          question: 'Does the JSON spec require numbers to fit in a double-precision float?',
          answer: 'No. RFC 8259 §6 defines JSON numbers with no range or precision limit — they can be arbitrarily large or precise. However, the spec also notes that parsers may lose precision for very large numbers. In practice, every mainstream JavaScript, Python, and Go JSON parser uses double-precision floating point, so the practical limit is Number.MAX_SAFE_INTEGER (9007199254740991). For database IDs, monetary amounts, or any integer over 15 digits, always store as a string in JSON.',
        },
        {
          question: 'Why does my JSON look correct but the database rejects it?',
          answer: 'Common causes: (1) Null byte (\\u0000) in a string value — PostgreSQL rejects this with "invalid byte sequence for encoding UTF8: 0x00". (2) String exceeds column length limit. (3) Number precision loss — a large ID was silently rounded to a different value and no record with that ID exists. (4) Wrong encoding — the JSON was decoded as UTF-8 but was actually Windows-1252, creating invalid multibyte sequences. Use the sanitizeControlChars() function from this guide and validate encoding before database writes.',
        },
        {
          question: 'Can a JSON bomb (deeply nested JSON) crash my Node.js server?',
          answer: 'Yes. Deeply nested JSON causes stack overflows in recursive parsers. A 10,000-level deep nested array causes "RangeError: Maximum call stack size exceeded" in Node.js\'s JSON.parse(). More insidiously, an exponentially branching structure like { "a": { "a": { "a": ... } } } with each level having many keys can consume gigabytes of memory before the parse completes. For user-submitted JSON: limit input size (express.json({ limit: \'1mb\' })), validate nesting depth before parse, and consider running JSON.parse() in a Worker Thread with a memory limit.',
        },
        {
          question: 'How do I find hidden control characters in a JSON file?',
          answer: 'In VS Code: open the file, press Ctrl+H (Find and Replace), click the regex (.*) button, and search for [\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F] — matches will highlight. In terminal: cat -A filename.json — control characters show as ^@ (null), ^G (bell), etc. In JavaScript: run the findControlChars() function from this guide against the raw text before parsing. Our AI JSON Error Explainer at unblockdevs.com/json-error-explainer also highlights control characters and their positions.',
        },
        {
          question: 'If these errors are silent, how do I know if my current production JSON has them?',
          answer: 'For duplicate keys: add duplicate key detection to your JSON ingestion pipeline for a week and log occurrences without blocking. For number precision loss: compare JSON number strings against parsed values for any number with 16+ digits. For BOM: check if any JSON files in your system start with charCode 0xFEFF. For control characters: scan string fields for characters in the range \\u0000-\\u001F. Our AI JSON Error Explainer at unblockdevs.com/json-error-explainer performs all these checks instantly for any JSON you paste.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
