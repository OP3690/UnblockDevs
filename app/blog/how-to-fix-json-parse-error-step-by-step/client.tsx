'use client';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToFixJsonParseErrorClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix JSON Parse Error — Step by Step (With Examples)</h1>
      <p className="lead">
        A JSON parse error stops your app cold. Whether you are seeing <code>SyntaxError: Unexpected token</code> in the browser console, a failed API response parse in Node.js, or a broken config file, the root cause is almost always one of a small set of syntax mistakes. This guide shows you exactly how to fix a JSON parse error step by step — with real examples of every common case.
      </p>

      <AlertBox type="error" title="SyntaxError: Unexpected token">
        {`SyntaxError: Unexpected token } in JSON at position 142\n\nOr:\nSyntaxError: JSON.parse: expected property name or '}' at line 8 column 3\n\nOr:\nJSON parse error - Unexpected token ',' at position 97`}
      </AlertBox>

      <p>
        These messages all mean the same thing: the JSON parser hit a character it did not expect according to the JSON specification. The position number tells you roughly where the error is, but finding the <em>cause</em> requires knowing what to look for.
      </p>

      <SectionHeader number={1} title="What Causes 'Unexpected Token' in JSON?" />
      <p>
        The JSON specification is intentionally strict. Unlike JavaScript, it does not tolerate comments, trailing commas, single quotes, or any shorthand. Here are the six most common reasons why JSON is invalid:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Trailing comma',
          description: 'A comma after the last element in an array or the last property in an object. Valid in JS5/JSON5, illegal in standard JSON.',
        },
        {
          title: "Single quotes",
          description: "Using single quotes ('value') instead of double quotes (\"value\") for strings or keys. The most common mistake from JavaScript developers.",
        },
        {
          title: 'Unquoted keys',
          description: 'Writing {key: "value"} instead of {"key": "value"}. Shorthand property names are valid JavaScript but not JSON.',
        },
        {
          title: 'Missing comma',
          description: 'Forgetting the comma between two object properties or two array elements. The parser reads the next value as unexpected.',
        },
        {
          title: 'Extra or mismatched bracket',
          description: 'An extra } at the end or a missing ] causes the parser to run off the expected structure.',
        },
        {
          title: 'Control characters in strings',
          description: 'Tab characters, raw newlines, or non-printable characters inside a string value that have not been escaped with \\t or \\n.',
        },
      ]} />

      <ErrorFix
        title="Trailing comma — the most common JSON error"
        bad={`{
  "name": "Alice",
  "age": 30,
  "role": "admin",
}`}
        good={`{
  "name": "Alice",
  "age": 30,
  "role": "admin"
}`}
        badLabel="Trailing comma after last property — invalid JSON"
        goodLabel="No trailing comma — valid JSON"
      />

      <ErrorFix
        title="Single quotes instead of double quotes"
        bad={`{'user': 'Bob', 'active': true}`}
        good={`{"user": "Bob", "active": true}`}
        badLabel="Single quotes — causes SyntaxError: Unexpected token"
        goodLabel="Double quotes — correct JSON format"
      />

      <SectionHeader number={2} title="How to Find a Missing Comma in JSON" />
      <p>
        A missing comma is one of the trickiest errors to spot by eye — especially in large JSON files. The parser error often points to the <em>line after</em> the missing comma, not the line where it belongs. Here is what it looks like:
      </p>

      <ErrorFix
        title="Missing comma between object properties"
        bad={`{
  "firstName": "Jane"
  "lastName": "Smith",
  "email": "jane@example.com"
}`}
        good={`{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}`}
        badLabel="Missing comma after 'Jane' — parser fails on 'lastName'"
        goodLabel="Comma after each property except the last"
      />

      <QuickFact color="blue" label="Pro tip">
        Online JSON error checkers highlight the exact line where the parser fails. This is much faster than reading error messages that say &quot;position 142&quot; — which requires counting characters manually.
      </QuickFact>

      <ErrorFix
        title="Missing comma in an array"
        bad={`{
  "tags": ["javascript" "typescript", "nodejs"]
}`}
        good={`{
  "tags": ["javascript", "typescript", "nodejs"]
}`}
        badLabel="Missing comma between array elements"
        goodLabel="Comma between every array element"
      />

      <SectionHeader number={3} title="How to Fix a JSON Parse Error Step by Step" />
      <p>
        The fastest way to debug a broken JSON file is to paste it into an online JSON error checker that highlights exactly where the problem is. Here is the exact process:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Copy the broken JSON',
          desc: 'Copy the entire JSON string — from the API response body, the config file, the log output, or wherever it came from. Select all and copy.',
        },
        {
          title: 'Paste into the JSON Fixer',
          desc: 'Go to unblockdevs.com/json-fixer-online and paste your JSON into the input field. The tool immediately validates the JSON as you type.',
        },
        {
          title: 'Read the error highlighting',
          desc: 'If the JSON is invalid, the fixer highlights the problematic line and shows a human-readable error message — not just a character position.',
        },
        {
          title: 'Apply the suggested fix',
          desc: 'The JSON Fixer can auto-repair many common errors: it removes trailing commas, converts single quotes to double quotes, and quotes unquoted keys. Click Fix to apply.',
        },
        {
          title: 'Copy the fixed JSON',
          desc: 'Once the JSON is valid, the right panel shows the corrected version. Copy it back to your project, API client, or wherever it needs to go.',
        },
      ]} />

      <AlertBox type="tip" title="Fix JSON parse errors instantly">
        Paste any broken JSON at <a href="https://unblockdevs.com/json-fixer-online" className="text-blue-600 underline font-medium">unblockdevs.com/json-fixer-online</a> to see exactly which line is invalid and auto-repair the most common errors with one click.
      </AlertBox>

      <SectionHeader number={4} title="Common JSON Syntax Errors and Fixes" />
      <p>
        Here are five of the most frequently encountered JSON syntax errors with before-and-after examples for each:
      </p>

      <ErrorFix
        title="Unquoted object keys"
        bad={`{
  id: 1,
  name: "Product A",
  price: 19.99
}`}
        good={`{
  "id": 1,
  "name": "Product A",
  "price": 19.99
}`}
        badLabel="Unquoted keys — valid JavaScript but invalid JSON"
        goodLabel="All keys must be double-quoted strings"
      />

      <ErrorFix
        title="Comments in JSON"
        bad={`{
  // API version
  "version": "2.1",
  /* base URL */
  "endpoint": "https://api.example.com"
}`}
        good={`{
  "version": "2.1",
  "endpoint": "https://api.example.com"
}`}
        badLabel="Comments are not valid JSON — strip them first"
        goodLabel="Pure data only — no comments allowed"
      />

      <ErrorFix
        title="undefined and NaN values"
        bad={`{
  "count": NaN,
  "result": undefined,
  "ratio": Infinity
}`}
        good={`{
  "count": null,
  "result": null,
  "ratio": null
}`}
        badLabel="NaN, undefined, Infinity — not valid JSON values"
        goodLabel="Use null for missing/invalid numeric values"
      />

      <ErrorFix
        title="Unescaped double quotes inside strings"
        bad={`{"message": "He said "hello" to her"}`}
        good={`{"message": "He said \\"hello\\" to her"}`}
        badLabel="Inner double quotes break the string boundary"
        goodLabel="Escape inner double quotes with backslash"
      />

      <ErrorFix
        title="Extra closing brace"
        bad={`{
  "status": "ok",
  "data": {
    "id": 5
  }
}}`}
        good={`{
  "status": "ok",
  "data": {
    "id": 5
  }
}`}
        badLabel="Extra closing brace causes SyntaxError at end of file"
        goodLabel="Braces must be perfectly balanced"
      />

      <SectionHeader number={5} title="How to Repair Corrupted JSON (AI-Generated or Log Output)" />
      <p>
        AI tools like ChatGPT and Claude sometimes produce JSON with subtle errors — especially when asked to generate large JSON structures or when the output is truncated. Common AI-generated JSON problems include:
      </p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Trailing commas on the last element (because models learn from JavaScript code more than strict JSON)</li>
        <li>Truncated output that ends mid-string or mid-array when the response hits a token limit</li>
        <li>Mixed quoting styles when the prompt included examples in different styles</li>
        <li>Missing closing brackets when nested structures are deep</li>
      </ul>
      <p>
        Log aggregation tools like Splunk, Datadog, and CloudWatch also produce stringified JSON — where a JSON object is encoded as a string inside another JSON object. This creates double-escaped strings that need to be unescaped before they can be parsed.
      </p>

      <CodeBlock lang="javascript" title="Parsing double-stringified JSON from logs">
{`// What you see in the log:
const raw = '{"level":"info","message":"{\\"user\\":\\"alice\\",\\"action\\":\\"login\\"}"}';

// Step 1: parse outer JSON
const outer = JSON.parse(raw);
// { level: 'info', message: '{"user":"alice","action":"login"}' }

// Step 2: parse the inner stringified JSON
const inner = JSON.parse(outer.message);
// { user: 'alice', action: 'login' }
console.log(inner.user); // 'alice'`}
      </CodeBlock>

      <AlertBox type="info" title="Auto-repair with the JSON Fixer">
        The JSON Fixer at <a href="https://unblockdevs.com/json-fixer-online" className="text-blue-600 underline">unblockdevs.com/json-fixer-online</a> handles AI-generated JSON errors, stringified payloads, and log output with a single paste. It flags what is wrong and offers a one-click repair for everything it can fix automatically.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What does "Unexpected token" mean in a JSON parse error?',
          answer: 'It means the JSON parser hit a character it did not expect based on the JSON grammar rules. Common culprits are trailing commas, single quotes, unquoted keys, and comments. The character position in the error message tells you roughly where to look, but an online error checker is much faster at pinpointing the exact issue.',
        },
        {
          question: 'How do I validate JSON data quickly without installing software?',
          answer: 'Paste your JSON into unblockdevs.com/json-fixer-online. It validates instantly as you type and highlights the exact line that is invalid. No install, no signup, and your data stays in your browser.',
        },
        {
          question: 'Why is my JSON invalid even though it looks correct?',
          answer: 'The most likely culprits are invisible characters: a non-breaking space, a byte-order mark (BOM) at the start of the file, or a control character inside a string value. An online JSON error checker will flag these even if they are not visible in a text editor.',
        },
        {
          question: 'How do I fix a JSON parse error in JavaScript?',
          answer: 'Wrap JSON.parse() in a try-catch block to handle the error gracefully. Then log the raw string you are trying to parse — not a variable that might already be an object. Once you see the raw string, paste it into an online JSON checker to find the syntax error.',
        },
        {
          question: 'Can a JSON formatter fix invalid JSON automatically?',
          answer: 'A plain formatter will reject invalid JSON entirely. You need a JSON fixer or repairer, which understands common error patterns and can auto-correct trailing commas, single quotes, and unquoted keys. The JSON Fixer at unblockdevs.com/json-fixer-online handles all of these automatically.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
