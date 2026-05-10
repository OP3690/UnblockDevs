'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion, CompareTable,
  StatGrid, SectionHeader, QuickFact, KeyPointsGrid, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToFixBrokenJsonWithoutUnderstandingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix Broken JSON Without Understanding the Error — Practical Guide</h1>
      <p className="lead">
        Sometimes you receive malformed JSON from an API, legacy system, or AI-generated output
        and need to fix it fast — even if you do not understand why it is broken. This guide gives
        you practical tools and patterns to fix common JSON errors automatically, from quick
        one-liners to fully automated repair pipelines, with exact error messages mapped to exact fixes.
      </p>

      <StatGrid stats={[
        { value: 'jsonrepair', label: 'npm package that fixes most JSON automatically', color: 'green' },
        { value: 'jq', label: 'command-line tool to validate and reformat JSON', color: 'blue' },
        { value: 'Python', label: 'json module gives precise error location', color: 'purple' },
        { value: '95%+', label: 'of common JSON errors fixed automatically by jsonrepair', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Quick Fix — Use jsonrepair Library (Node.js)" />
      <p>The <code>jsonrepair</code> npm package fixes over 95% of common JSON issues automatically without any configuration. Install it once and call it on any broken JSON string:</p>
      <CodeBlock language="bash" filename="install.sh">
{`# Install once
npm install jsonrepair

# Or use globally from CLI
npm install -g jsonrepair`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="jsonrepair-examples.js">
{`import { jsonrepair } from 'jsonrepair';

// Fix trailing commas (most common issue)
jsonrepair('{"name":"Alice","age":30,}')
// → '{"name":"Alice","age":30}'

// Fix single quotes → double quotes
jsonrepair("{'name':'Alice'}")
// → '{"name":"Alice"}'

// Fix unquoted keys
jsonrepair('{name:"Alice",age:30}')
// → '{"name":"Alice","age":30}'

// Fix missing quotes on string values
jsonrepair('{"status":active}')
// → '{"status":"active"}'

// Fix concatenated JSON objects (wraps in array)
jsonrepair('{"a":1}{"b":2}')
// → '[{"a":1},{"b":2}]'

// Fix truncated/incomplete JSON (adds missing brackets)
jsonrepair('{"name":"Alice","items":["a","b"')
// → '{"name":"Alice","items":["a","b"]}'

// Fix Python-style literals
jsonrepair('{"active": True, "data": None, "missing": NaN}')
// → '{"active": true, "data": null, "missing": null}'

// Fix comments (strips them)
jsonrepair('{"name": "Alice" /* primary user */}')
// → '{"name": "Alice"}'`}
      </CodeBlock>

      <CodeBlock language="bash" filename="repair-file.sh">
{`# Repair a JSON file and save the output
npx jsonrepair broken.json > fixed.json

# Pipe from stdin
cat broken.json | npx jsonrepair > fixed.json

# Use in a Node.js script
node -e "
const {jsonrepair} = require('jsonrepair');
const fs = require('fs');
const broken = fs.readFileSync('broken.json', 'utf8');
fs.writeFileSync('fixed.json', jsonrepair(broken));
console.log('Repaired successfully');
"`}
      </CodeBlock>

      <SectionHeader number={2} title="Using Python to Find the Exact Error Location" />
      <p>Python's built-in JSON module gives you the exact line and column of the error, which is invaluable for debugging large JSON files where you cannot eyeball the problem:</p>
      <CodeBlock language="python" filename="find_json_error.py">
{`import json

broken_json = '''
{
  "name": "Alice",
  "age": 30,
  "tags": ["admin", "user",],
  "active": True
}
'''

try:
    data = json.loads(broken_json)
    print("Valid JSON:", data)
except json.JSONDecodeError as e:
    print(f"Error: {e.msg}")
    print(f"Line: {e.lineno}, Column: {e.colno}")
    print(f"At character position: {e.pos}")

    # Show the problematic line with a visual pointer
    lines = broken_json.split('\\n')
    if e.lineno <= len(lines):
        line = lines[e.lineno - 1]
        print(f"Problem line: {line!r}")
        print(" " * (e.colno - 1) + "^--- error here")

# Output:
# Error: Expecting property name enclosed in double quotes
# Line: 5, Column: 29
# Problem line: '  "tags": ["admin", "user",],'
#                                             ^--- error here`}
      </CodeBlock>

      <QuickFact color="blue" label="Python Error Messages Decoded">
        "Expecting property name enclosed in double quotes" means trailing comma before closing brace or bracket.
        "Unexpected end of JSON input" means the JSON is truncated.
        "Expecting value" means a key exists but the value is missing or invalid.
        "Extra data" means multiple JSON objects were concatenated without an array wrapper.
      </QuickFact>

      <SectionHeader number={3} title="The 5 Most Common JSON Mistakes and Their Fixes" />

      <ErrorFix
        bad={`// 1. Trailing commas (most common — not allowed in JSON spec)
{"name": "Alice", "age": 30,}
["a", "b", "c",]

// 2. Single quotes instead of double quotes
{'name': 'Alice', 'active': 'true'}

// 3. Unquoted property keys (valid JavaScript, not valid JSON)
{name: "Alice", age: 30}

// 4. Python/JavaScript runtime literals instead of JSON values
{"active": True, "data": None, "count": NaN, "big": Infinity}

// 5. Comments (JSON spec explicitly forbids them)
{
  // This is the user object
  "name": "Alice" /* primary user */
}`}
        good={`// 1. Remove trailing commas
{"name": "Alice", "age": 30}
["a", "b", "c"]

// 2. Use double quotes everywhere
{"name": "Alice", "active": "true"}

// 3. Quote all property keys
{"name": "Alice", "age": 30}

// 4. Use JSON-compliant values only
{"active": true, "data": null, "count": 0, "big": 1e308}

// 5. No comments allowed — use a _comment field if needed
{
  "_comment": "This is the user object",
  "name": "Alice"
}`}
        badLabel="Invalid JSON (5 common issues)"
        goodLabel="Valid JSON (corrected)"
      />

      <SectionHeader number={4} title="Error Message to Fix Cheat Sheet" />

      <CompareTable
        leftLabel="Error Message You See"
        rightLabel="What It Means and How to Fix"
        rows={[
          { label: 'Unexpected token , in JSON', left: 'Trailing comma before ] or }', right: 'Search for ,] or ,} and remove the comma' },
          { label: "Unexpected token ' in JSON", left: 'Single quotes used instead of double', right: 'Replace all single quotes with double quotes' },
          { label: 'Unexpected token T in JSON', left: 'Python True used instead of JSON true', right: 'Replace True→true, False→false, None→null' },
          { label: 'Unexpected end of JSON input', left: 'JSON is truncated — missing closing brackets', right: 'Count opening vs closing braces and brackets — add missing ones' },
          { label: 'Unexpected token at position 0', left: 'BOM character or whitespace before opening {', right: 'Strip BOM: text.replace(/^\\uFEFF/, "")' },
          { label: 'Extra data after JSON value', left: 'Multiple JSON objects concatenated', right: 'Wrap in [ ] to make a JSON array, or split and parse separately' },
          { label: 'Property name must be a string', left: 'Unquoted key — JavaScript object syntax', right: 'Add double quotes around every property name' },
        ]}
      />

      <SectionHeader number={5} title="Command Line Validation with jq" />
      <CodeBlock language="bash" filename="jq-validation.sh">
{`# Install jq
brew install jq          # macOS
apt-get install jq       # Ubuntu/Debian
choco install jq         # Windows (Chocolatey)

# Validate and pretty-print (shows error with line number if invalid)
echo '{"name":"Alice","age":30}' | jq .

# Validate a file
cat data.json | jq .

# Validate without output (exit code 0=valid, 1=invalid)
cat data.json | jq . > /dev/null && echo "Valid" || echo "Invalid"

# Find error in large file
cat data.json | jq . 2>&1 | grep "parse error"

# Extract specific field to verify parsing
cat data.json | jq '.users[0].name'

# Compact output (minify valid JSON)
cat data.json | jq -c .

# Sort keys alphabetically (useful for diffing JSON files)
cat data.json | jq -S .`}
      </CodeBlock>

      <SectionHeader number={6} title="Automated Repair Pipeline for Batch Processing" />
      <p>For processing batches of potentially-broken JSON from external sources (APIs, scrapers, user uploads), use this complete repair pipeline with progressive fallback:</p>
      <CodeBlock language="python" filename="json_repair_pipeline.py">
{`import json
import re
import subprocess
from typing import Optional

def try_parse(text: str) -> Optional[dict]:
    """Try to parse JSON. Returns None if it fails."""
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None

def fix_python_literals(text: str) -> str:
    """Replace Python-style literals with JSON equivalents."""
    text = text.replace('True', 'true')
    text = text.replace('False', 'false')
    text = text.replace('None', 'null')
    text = re.sub(r'\\bNaN\\b', 'null', text)
    text = re.sub(r'\\bInfinity\\b', '1e308', text)
    return text

def strip_comments(text: str) -> str:
    """Remove JavaScript-style comments from JSON."""
    text = re.sub(r'//.*?$', '', text, flags=re.MULTILINE)
    text = re.sub(r'/\\*.*?\\*/', '', text, flags=re.DOTALL)
    return text

def fix_trailing_commas(text: str) -> str:
    """Remove trailing commas before } and ]."""
    return re.sub(r',\\s*([}\\]])', r'\\1', text)

def repair_with_jsonrepair(text: str) -> str:
    """Use jsonrepair npm package as final fallback."""
    try:
        result = subprocess.run(
            ['npx', 'jsonrepair'],
            input=text, capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            return result.stdout
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return text

def process_json(raw: str) -> dict:
    """Parse JSON with progressive repair strategy."""
    # Step 1: Parse as-is (fastest path)
    if result := try_parse(raw):
        return result

    # Step 2: Strip BOM
    cleaned = raw.lstrip('\\ufeff')
    if result := try_parse(cleaned):
        return result

    # Step 3: Fix Python literals
    cleaned = fix_python_literals(cleaned)
    if result := try_parse(cleaned):
        return result

    # Step 4: Strip comments
    cleaned = strip_comments(cleaned)
    if result := try_parse(cleaned):
        return result

    # Step 5: Fix trailing commas
    cleaned = fix_trailing_commas(cleaned)
    if result := try_parse(cleaned):
        return result

    # Step 6: Nuclear option — use jsonrepair
    repaired = repair_with_jsonrepair(raw)
    if result := try_parse(repaired):
        return result

    # Nothing worked — raise with diagnostics
    try:
        json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Could not repair JSON. Error at line {e.lineno}, col {e.colno}: {e.msg}"
        ) from e

# Usage:
broken = '{"name": "Alice", active: True, tags: ["admin",],}'
data = process_json(broken)
print(data)  # {'name': 'Alice', 'active': True, 'tags': ['admin']}`}
      </CodeBlock>

      <SectionHeader number={7} title="TypeScript Repair Utility" />
      <CodeBlock language="typescript" filename="parseJsonSafely.ts">
{`/**
 * Try to parse JSON, repairing common issues automatically.
 * Falls back through repair steps before throwing.
 */
export async function parseJsonSafely<T = unknown>(input: string): Promise<T> {
  // Step 1: Try as-is
  try { return JSON.parse(input) as T; } catch {}

  // Step 2: Strip BOM and leading whitespace
  let cleaned = input.replace(/^\uFEFF/, '').trim();

  // Step 3: Fix Python literals
  cleaned = cleaned
    .replace(/\\bTrue\\b/g, 'true')
    .replace(/\\bFalse\\b/g, 'false')
    .replace(/\\bNone\\b/g, 'null')
    .replace(/\\bNaN\\b/g, 'null');

  // Step 4: Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,\\s*([}\\]])/g, '$1');

  // Step 5: Try repaired version
  try { return JSON.parse(cleaned) as T; } catch {}

  // Step 6: Use jsonrepair
  const { jsonrepair } = await import('jsonrepair');
  try {
    return JSON.parse(jsonrepair(input)) as T;
  } catch (e) {
    throw new Error(\`Failed to parse JSON after all repair attempts: \${String(e)}\`);
  }
}

// Usage:
const data = await parseJsonSafely<{ name: string }>('{"name": "Alice",}');
console.log(data.name); // Alice`}
      </CodeBlock>

      <SectionHeader number={8} title="Identifying Specific Error Types at a Glance" />
      <KeyPointsGrid items={[
        { title: '"Unexpected token" errors', description: 'Usually means: wrong quote type (single vs double), unquoted key, or illegal character. Look at the character at the reported position — it will be the culprit. The error message often includes the unexpected character in quotes.' },
        { title: '"Unexpected end of JSON input"', description: 'The JSON is cut off or incomplete. Common when API responses are streamed or truncated by a length limit. Count the opening and closing brace and bracket pairs — one set is missing its closing half.' },
        { title: '"Expected , or }" errors', description: 'A comma is missing between properties, or the previous value did not close properly. Walk backwards from the error position to find where the structure broke.' },
        { title: '"Circular structure to JSON"', description: 'This happens at JSON.stringify time. Your JavaScript object has circular references (object A references B which references A). Use a replacer function or the flatted package to handle circular structures.' },
        { title: 'Encoding issues (BOM, null bytes)', description: 'UTF-8 BOM character at the start of a file, null bytes, or non-UTF8 sequences can break parsing. Strip with: text.replace(/^\\uFEFF/, "").replace(/\\u0000/g, "").' },
        { title: 'JSON.stringify returns undefined', description: 'This happens when you pass undefined itself, a function, or a Symbol to JSON.stringify. These types are not serializable. Use JSON.stringify(value) ?? "null" as a safe fallback.' },
      ]} />

      <SectionHeader number={9} title="Preventing Broken JSON in Your Own Code" />

      <VerticalSteps steps={[
        { title: 'Never build JSON by hand with string concatenation', desc: 'Use JSON.stringify() in JavaScript, json.dumps() in Python, or your language equivalent. String concatenation is the top source of malformed JSON in homegrown code — one unescaped quote breaks everything.' },
        { title: 'Validate at API boundaries', desc: 'When receiving JSON from external APIs, wrap the parse in try/catch and log the raw response on failure. This makes debugging 10x easier than a cryptic downstream error with no context.' },
        { title: 'Use Zod or similar for structure validation', desc: 'JSON.parse only validates syntax, not structure. Libraries like Zod let you define a schema and validate the parsed object — catching wrong types and missing required fields that JSON.parse misses.' },
        { title: 'Handle partial responses from streaming APIs', desc: 'When consuming streaming JSON (SSE, chunked HTTP), buffer the incoming data and only parse when you have a complete object. Streaming APIs frequently send partial JSON that is invalid until the full chunk arrives.' },
        { title: 'Test with edge case inputs', desc: 'Include empty object {}, empty array [], null values, nested structures, and unicode strings in your test suite for any JSON parsing code. These are where most JSON handling bugs hide.' },
      ]} />

      <AlertBox type="tip" title="Use an online JSON tool for quick fixes">
        Paste your broken JSON at unblockdevs.com/tools/json for instant repair and explanation
        of every error found. Highlights the exact problematic character, shows the fix, and lets
        you copy the corrected JSON immediately — no installation required.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does JSON not allow trailing commas?',
          answer: 'JSON (RFC 8259) was designed for strict machine parsing, not human writing. The spec explicitly forbids trailing commas to require minimal parser complexity for embedding in any language. If you write config files for humans, consider JSONC (JSON with Comments) or JSON5, both of which allow trailing commas and comments. For API data, always use strict JSON.',
        },
        {
          question: 'How do I fix JSON that has JavaScript comments in it?',
          answer: 'JSON does not support comments (// or /* */). To strip them before parsing in Node.js, use the strip-json-comments package: import stripJsonComments from "strip-json-comments"; JSON.parse(stripJsonComments(str)). Or use jsonrepair which handles comments automatically. For human-written config files, switch to JSONC (natively supported in VS Code) or TOML.',
        },
        {
          question: 'What is the fastest way to validate a large JSON file over 1GB?',
          answer: 'Command line with jq: cat large.json | jq . > /dev/null — it streams the file and reports the first error with line and column number. For files over 1GB, use streaming JSON parsers like Python ijson or Node.js stream-json which process the file chunk by chunk without loading it all into memory at once.',
        },
        {
          question: 'How do I handle NaN, Infinity, and undefined in JSON?',
          answer: 'JSON does not support NaN, Infinity, -Infinity, or undefined. Replace them before serializing: use 0 or null instead of NaN, use a sentinel value like 1e308 or null instead of Infinity, and omit undefined fields. In JavaScript: JSON.stringify(obj, (key, val) => (Number.isNaN(val) || !Number.isFinite(val)) ? null : val).',
        },
        {
          question: 'Why does JSON.stringify return undefined sometimes?',
          answer: 'JSON.stringify returns undefined (not the string "undefined") when you pass: the value undefined itself, a function, or a Symbol. It also silently omits object properties with these values. Always check that you are passing a JSON-serializable value. Use JSON.stringify(value) ?? "null" as a safe fallback.',
        },
        {
          question: 'Can I use jsonrepair in the browser client-side?',
          answer: 'Yes — jsonrepair works in both Node.js and modern browsers. Import it as an ES module: import { jsonrepair } from "jsonrepair". It has no Node.js-specific dependencies and runs entirely client-side, making it safe to use in browser extensions, frontend apps, and web tools without a server.',
        },
        {
          question: 'What is JSONL and how do I parse it correctly?',
          answer: 'JSONL (JSON Lines) is a format where each line is a separate, complete JSON object. Common for log files and streaming data exports. Parse it with: const objects = text.split("\\n").filter(Boolean).map(line => JSON.parse(line.trim())). Each line must be valid JSON on its own — there is no outer array wrapper.',
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
