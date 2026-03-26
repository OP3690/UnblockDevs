'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToFixBrokenJsonWithoutUnderstandingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix Broken JSON Without Understanding the Error — Practical Guide</h1>
      <p className="lead">
        Sometimes you receive malformed JSON from an API, legacy system, or AI-generated output
        and need to fix it fast — even if you don't understand why it's broken. This guide gives
        you practical tools and patterns to fix common JSON errors automatically.
      </p>

      <StatGrid stats={[
        { value: 'jsonrepair', label: 'npm package that fixes most JSON automatically', color: 'green' },
        { value: 'jq', label: 'command-line tool to validate and reformat JSON', color: 'blue' },
        { value: 'Python', label: 'json module gives precise error location', color: 'purple' },
        { value: 'AI tools', label: 'unblockdevs.com/json-fixer-online repairs JSON instantly', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Quick Fix — Use jsonrepair Library" />
      <CodeBlock language="javascript" filename="jsonrepair — fixes most common issues automatically">
{`import { jsonrepair } from 'jsonrepair';

// Fixes trailing commas
jsonrepair('{"name":"Alice","age":30,}')
// → '{"name":"Alice","age":30}'

// Fixes single quotes → double quotes
jsonrepair("{'name':'Alice'}")
// → '{"name":"Alice"}'

// Fixes unquoted keys
jsonrepair('{name:"Alice",age:30}')
// → '{"name":"Alice","age":30}'

// Fixes missing quotes on string values
jsonrepair('{"status":active}')
// → '{"status":"active"}'

// Fixes concatenated JSON (multiple JSON objects)
jsonrepair('{"a":1}{"b":2}')
// → '[{"a":1},{"b":2}]'

// Fixes truncated JSON
jsonrepair('{"name":"Alice","items":["a","b"')
// → '{"name":"Alice","items":["a","b"]}'`}
      </CodeBlock>

      <SectionHeader number={2} title="Using Python to Locate the Exact Error" />
      <CodeBlock language="python" filename="Find exact JSON error location">
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
except json.JSONDecodeError as e:
    print(f"Error: {e.msg}")
    print(f"Line: {e.lineno}, Column: {e.colno}")
    print(f"At position: {e.pos}")

    # Show context around error
    lines = broken_json.split('\\n')
    if e.lineno <= len(lines):
        print(f"Problem line: {lines[e.lineno - 1]!r}")

# Output:
# Error: Expecting property name enclosed in double quotes
# Line: 5, Column: 29
# Problem line: '  "tags": ["admin", "user",],'`}
      </CodeBlock>

      <SectionHeader number={3} title="Most Common JSON Mistakes and Fixes" />
      <ErrorFix
        bad={`// Trailing commas (invalid JSON, valid JavaScript)
{
  "name": "Alice",
  "age": 30,  ← trailing comma
}

// Single quotes instead of double quotes
{'name': 'Alice'}

// Unquoted keys
{name: "Alice"}

// Python True/False/None instead of JSON true/false/null
{"active": True, "data": None}`}
        good={`// Remove trailing commas
{
  "name": "Alice",
  "age": 30
}

// Use double quotes only
{"name": "Alice"}

// Quote all keys
{"name": "Alice"}

// Use JSON true/false/null
{"active": true, "data": null}`}
        badLabel="Common JSON errors"
        goodLabel="Valid JSON"
      />

      <SectionHeader number={4} title="Command Line — Quick Validation with jq" />
      <CodeBlock language="bash" filename="jq for JSON validation and fixing">
{`# Install jq
brew install jq          # macOS
apt-get install jq       # Linux
choco install jq         # Windows

# Validate JSON
echo '{"name":"Alice","age":30}' | jq .
# → formatted output if valid, error if not

# Validate a file
cat data.json | jq .

# Find error location in large file
cat data.json | jq . 2>&1 | head -20

# Extract specific field (sanity check)
cat data.json | jq '.name'

# Fix and reformat in one command
cat broken.json | python3 -c "
import json, sys
from jsonrepair import jsonrepair
content = sys.stdin.read()
fixed = jsonrepair(content)
print(json.dumps(json.loads(fixed), indent=2))
" > fixed.json`}
      </CodeBlock>

      <AlertBox type="tip" title="Use our online JSON Fixer">
        Paste your broken JSON at unblockdevs.com/json-fixer-online for instant repair and
        explanation of every error found. Works for all common JSON issues without any setup.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does JSON not allow trailing commas?',
          answer: 'JSON (RFC 8259) was designed for strict machine parsing, not human writing. The spec explicitly forbids trailing commas. JavaScript\'s JSON.parse follows the spec. If you write config files, consider JSONC (JSON with Comments) or JSON5 which both allow trailing commas. For APIs, always output strict JSON.',
        },
        {
          question: 'How do I fix JSON that has comments in it?',
          answer: 'JSON does not support comments. If you receive JSON with // or /* */ comments, use strip-json-comments (npm) to remove them first: import stripJsonComments from "strip-json-comments"; JSON.parse(stripJsonComments(str)). Or use jsonrepair which handles comments automatically.',
        },
        {
          question: 'What is the fastest way to validate a large JSON file?',
          answer: 'Command line: cat large.json | jq . > /dev/null — jq streams the file and reports the first error with line/column. Python: json.load(open("large.json")) — reports exact error position. For very large files (GB+), use streaming validators like json-stream-validator.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
