'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhyAiJsonBrokenClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why AI-Generated JSON Is Always Broken — and How to Fix Every Error</h1>
      <p className="lead">
        You asked ChatGPT, Claude, or Gemini to generate some JSON. It looks perfect. You copy it
        into your code, call <code>JSON.parse()</code>, and — crash. <em>SyntaxError: Unexpected token.</em>{' '}
        This is not a coincidence. AI language models have systematic, predictable blind spots with JSON
        that stem from how they were trained. This guide explains exactly why it happens and gives you
        every tool you need to detect and fix it automatically.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'Trailing commas — the most common AI JSON error by far', color: 'red' },
        { value: '8', label: 'distinct error patterns AI models consistently get wrong', color: 'amber' },
        { value: '100%', label: 'of AI JSON errors can be auto-detected and fixed', color: 'green' },
        { value: '< 1s', label: 'to fix all errors with an AI JSON Error Explainer tool', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Why AI Models Generate Broken JSON — The Root Cause" />
      <p>
        The answer is surprisingly simple: AI language models were trained on the entire public internet,
        which contains vastly more JavaScript code than it does JSON data files. JavaScript object literals
        look almost identical to JSON but follow different rules — they allow trailing commas, single quotes,
        unquoted keys, comments, <code>undefined</code>, <code>NaN</code>, and <code>Infinity</code>.
        When a model generates &ldquo;JSON&rdquo;, it is actually blending JavaScript object syntax with
        JSON syntax, because its training data did not cleanly separate the two.
      </p>
      <p>
        Additionally, AI models generate text token-by-token, predicting what comes next based on
        probability. The last comma in a list followed by a closing brace is a common JavaScript pattern,
        so the model generates it — even though it is illegal in JSON. The model has no JSON validator
        running internally. It cannot check its own output against the RFC 8259 specification.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Trained on JavaScript, not JSON',
          description: 'The internet has billions of lines of JavaScript code with trailing commas, single quotes, and unquoted keys. AI models learn that {name: "Alice",} is a normal pattern — because in JS it is. JSON rejects it entirely.',
        },
        {
          title: 'Token-by-token generation with no validator',
          description: 'LLMs generate one token at a time. There is no internal JSON validator checking the output. A model cannot "go back" to remove a trailing comma it just predicted as the next natural token.',
        },
        {
          title: 'Python dict confusion',
          description: 'Models trained on Python code learn True, False, None as boolean/null literals. When generating JSON for a Python context, they revert to Python capitalization — which is invalid in JSON.',
        },
        {
          title: 'Prompt length pressure',
          description: 'When generating long JSON, models sometimes cut corners on well-formed structure to fit within context windows, producing unclosed brackets, extra commas, or truncated values near the end.',
        },
      ]} />

      <SectionHeader number={2} title="The 8 AI JSON Error Patterns — With Examples and Fixes" />

      <QuickFact color="red" label="Pattern #1 — Trailing Commas (Most Common)">
        Every AI model produces trailing commas in JSON. It is the single most frequent error across
        ChatGPT, Claude, Gemini, and every other LLM. A trailing comma appears after the last element
        in an array or object, before the closing bracket. Standard JSON parsers reject it immediately.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Classic AI output — trailing commas everywhere
{
  "name": "Alice Chen",
  "age": 30,
  "roles": [
    "admin",
    "editor",
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
  },
}`}
        good={`// ✅ Valid JSON — no trailing commas
{
  "name": "Alice Chen",
  "age": 30,
  "roles": [
    "admin",
    "editor"
  ],
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}`}
        badLabel="AI output — trailing commas (invalid)"
        goodLabel="Valid JSON — commas removed before ] and }"
      />

      <QuickFact color="amber" label="Pattern #2 — JavaScript-Only Values (undefined, NaN, Infinity)">
        JavaScript has three special values that have no equivalent in JSON: <code>undefined</code>,
        <code>NaN</code>, and <code>Infinity</code>. AI models trained on JavaScript code learn
        these as valid values. JSON only allows: string, number, boolean (<code>true</code>/
        <code>false</code>), <code>null</code>, array, and object. Any other value is illegal.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ AI output with JS-only values
{
  "user": "Bob",
  "score": NaN,
  "bonus": Infinity,
  "pendingAction": undefined,
  "ratio": -Infinity
}`}
        good={`// ✅ Fixed — all replaced with null
{
  "user": "Bob",
  "score": null,
  "bonus": null,
  "pendingAction": null,
  "ratio": null
}

// Or replace with meaningful fallbacks:
{
  "user": "Bob",
  "score": 0,
  "bonus": 999999,
  "pendingAction": null,
  "ratio": -1
}`}
        badLabel="JS-only values — not valid JSON"
        goodLabel="Replace with null or meaningful defaults"
      />

      <QuickFact color="red" label="Pattern #3 — Python Capitalised Booleans (True, False, None)">
        This happens almost exclusively when the prompt asks for JSON in a Python context, or when the
        model was heavily fine-tuned on Python code. Python uses <code>True</code>, <code>False</code>,
        and <code>None</code> — JSON uses <code>true</code>, <code>false</code>, and <code>null</code>.
        One capital letter breaks the entire parse.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Python-style literals — will fail JSON.parse() and json.loads()
{
  "active": True,
  "verified": False,
  "metadata": None,
  "count": 5
}`}
        good={`// ✅ Correct JSON literals — always lowercase
{
  "active": true,
  "verified": false,
  "metadata": null,
  "count": 5
}

// If using Python to generate JSON:
import json
data = {"active": True, "verified": False, "metadata": None}
json_string = json.dumps(data)  # ✅ Produces lowercase true/false/null
# ❌ Never: str(data)  → produces Python repr with True/False/None`}
        badLabel="Python-style literals — invalid in JSON"
        goodLabel="JSON literals are always lowercase"
      />

      <QuickFact color="amber" label="Pattern #4 — Single-Quoted Strings">
        AI models frequently output single-quoted strings, especially when the prompt uses examples
        with single quotes, or when generating JSON that resembles a Python or JavaScript context.
        JSON requires all strings — both keys and values — to be enclosed in double quotes.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Single quotes — invalid in JSON
{
  'name': 'Charlie',
  'tags': ['developer', 'python'],
  'city': 'New York'
}`}
        good={`// ✅ Double quotes — required by JSON spec (RFC 8259 §7)
{
  "name": "Charlie",
  "tags": ["developer", "python"],
  "city": "New York"
}

// Auto-fix: replace single-quoted strings carefully:
const fixed = text.replace(/'([^'\\\\]|\\\\.)*'/g, m =>
  '"' + m.slice(1, -1).replace(/\\\\'/g, "'").replace(/"/g, '\\\\"') + '"'
);`}
        badLabel="Single quotes — invalid JSON"
        goodLabel="Double quotes — the only valid option"
      />

      <QuickFact color="red" label="Pattern #5 — Unquoted Object Keys">
        In JavaScript, object keys do not need quotes: <code>{`{name: "Alice"}`}</code> is valid
        JavaScript. In JSON, every key must be a quoted string: <code>{`{"name": "Alice"}`}</code>.
        AI models confuse the two, particularly when generating JSON that represents a JavaScript object.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Unquoted keys — JS object literal syntax, not JSON
{
  id: 1,
  name: "Diana",
  active: true,
  createdAt: "2026-01-15"
}`}
        good={`// ✅ All keys double-quoted — valid JSON
{
  "id": 1,
  "name": "Diana",
  "active": true,
  "createdAt": "2026-01-15"
}

// Auto-fix regex (handles simple cases):
const fixed = text.replace(
  /([{,]\\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\\s*:)/g,
  (_, before, key, after) => before + '"' + key + '"' + after
);`}
        badLabel="Unquoted keys — invalid JSON"
        goodLabel="Quoted keys — JSON requires strings for all keys"
      />

      <QuickFact color="blue" label="Pattern #6 — JavaScript Comments">
        When generating configuration files or annotated JSON, AI models frequently include JavaScript
        comments (<code>// line comment</code> or <code>/* block comment */</code>). Comments are
        explicitly forbidden by the JSON specification. The model knows what JSONC is but generates
        standard JSON mixed with comments because its training data blended both formats.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Comments in JSON — will fail every standard parser
{
  // Database connection settings
  "host": "localhost",
  "port": 5432, /* default PostgreSQL port */
  "database": "production",
  "ssl": true // require SSL in production
}`}
        good={`// ✅ No comments — pure JSON
{
  "host": "localhost",
  "port": 5432,
  "database": "production",
  "ssl": true
}

// To strip comments before parsing:
const stripped = jsonText
  .replace(/\\/\\/[^\\n]*/g, '')        // strip line comments
  .replace(/\\/\\*[\\s\\S]*?\\*\\//g, ''); // strip block comments
const parsed = JSON.parse(stripped);`}
        badLabel="Comments are not valid JSON"
        goodLabel="Remove all comments for valid JSON"
      />

      <QuickFact color="amber" label="Pattern #7 — Unclosed or Mismatched Brackets">
        For large JSON structures, AI models sometimes fail to close all brackets — particularly when
        the generated output is near the context limit. The model predicts the next token but loses
        track of nesting depth over long sequences. Mismatched brackets (using <code>{'}'}</code> where
        <code>{']'}</code> is expected) also occur when the model confuses array vs. object context.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Unclosed bracket — missing ] at the end
{
  "users": [
    {"id": 1, "name": "Eve"},
    {"id": 2, "name": "Frank"}
  ,
  "total": 2
}
// ← The [ for "users" is never closed with ]

// ❌ Mismatched bracket — ] used where } expected
{
  "items": [1, 2, 3},
  "count": 3
]`}
        good={`// ✅ Properly closed and matched brackets
{
  "users": [
    {"id": 1, "name": "Eve"},
    {"id": 2, "name": "Frank"}
  ],
  "total": 2
}

// ✅ Matching bracket types
{
  "items": [1, 2, 3],
  "count": 3
}`}
        badLabel="Unclosed / mismatched brackets"
        goodLabel="Every opener has a matching closer of the correct type"
      />

      <QuickFact color="red" label="Pattern #8 — Invalid Number Formats (Leading Zeros, Plus Signs)">
        JSON has strict number formatting rules. Leading zeros are forbidden (except 0 itself):
        <code>007</code> must be <code>7</code>. A leading plus sign is also illegal: <code>+42</code>
        must be <code>42</code>. AI models sometimes generate these forms when copying number patterns
        from code or configuration contexts where they are valid (C, Python, YAML).
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Invalid number formats in JSON
{
  "timeout": 030,
  "port": 08080,
  "priority": +5,
  "temperature": +0.7
}`}
        good={`// ✅ Valid JSON number formats
{
  "timeout": 30,
  "port": 8080,
  "priority": 5,
  "temperature": 0.7
}

// JSON number rules (RFC 8259 §6):
// ✅ 0, -0, 1, -1, 3.14, 1e10, 1.5e-3
// ❌ 007 (leading zero), +5 (plus sign), 1. (trailing dot), .5 (no leading digit)`}
        badLabel="Invalid: leading zeros and plus signs"
        goodLabel="Valid JSON numbers"
      />

      <SectionHeader number={3} title="How to Prompt AI Models for Valid JSON" />
      <p>
        You can dramatically reduce AI JSON errors by crafting better prompts. The model responds to
        explicit constraints — telling it <em>exactly</em> what rules to follow pushes it to comply
        more consistently.
      </p>

      <CodeBlock language="text" filename="Effective prompts for valid JSON output">
{`# Prompt template that minimizes AI JSON errors:

"Generate a JSON object representing a user profile.
IMPORTANT JSON RULES — follow these exactly:
- All keys must be double-quoted strings
- All string values must use double quotes (not single quotes)
- No trailing commas after the last element in arrays or objects
- Use lowercase true, false, null (NOT True/False/None/undefined/NaN)
- No // comments or /* */ comments
- No leading zeros in numbers, no + prefix on positive numbers

Return ONLY the raw JSON object with no explanation, no markdown
code fences, and no surrounding text."

# Even better — provide an example of the shape:
"Follow this exact structure:
{
  "id": 1,
  "name": "example",
  "active": true,
  "tags": ["a", "b"]
}
Your JSON must be parseable by JSON.parse() without any modification."`}
      </CodeBlock>

      <AlertBox type="tip" title="Ask the model to self-validate">
        Add this to your prompt: <em>&ldquo;After generating the JSON, verify it is RFC 8259 compliant by
        mentally checking: (1) no trailing commas, (2) all strings double-quoted, (3) only true/false/null
        as special literals, (4) all brackets matched.&rdquo;</em> This self-correction step catches many
        common errors before you receive the output.
      </AlertBox>

      <SectionHeader number={4} title="Programmatic Validation — Catch AI JSON Errors in Your Pipeline" />
      <p>
        If you are building a system that regularly consumes AI-generated JSON (an API wrapper, an
        LLM orchestration pipeline, a data extraction tool), you should validate and repair JSON
        automatically rather than relying on prompts alone.
      </p>

      <CodeBlock language="javascript" filename="Production-grade AI JSON repair pipeline">
{`// Step 1: Strip markdown code fences (AI often wraps JSON in \`\`\`json...\`\`\`)
function stripMarkdownFences(text) {
  return text
    .replace(/^\`\`\`(?:json)?\s*/i, '')  // remove opening fence
    .replace(/\s*\`\`\`\s*$/i, '')          // remove closing fence
    .trim();
}

// Step 2: Strip JavaScript comments
function stripComments(text) {
  return text
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}

// Step 3: Fix Python-style literals
function fixPythonLiterals(text) {
  return text
    .replace(/(?<!["\w])(True)(?!["\w])/g, 'true')
    .replace(/(?<!["\w])(False)(?!["\w])/g, 'false')
    .replace(/(?<!["\w])(None)(?!["\w])/g, 'null');
}

// Step 4: Fix JS-only values
function fixJsValues(text) {
  return text
    .replace(/:\s*undefined\b/g, ': null')
    .replace(/:\s*NaN\b/g, ': null')
    .replace(/:\s*-?Infinity\b/g, ': null');
}

// Step 5: Remove trailing commas
function fixTrailingCommas(text) {
  let prev;
  do { prev = text; text = text.replace(/,(\s*[}\]])/g, '$1'); }
  while (prev !== text);
  return text;
}

// Combined repair function
function repairAiJson(raw) {
  let text = stripMarkdownFences(raw);
  text = stripComments(text);
  text = fixPythonLiterals(text);
  text = fixJsValues(text);
  text = fixTrailingCommas(text);
  try {
    return { data: JSON.parse(text), error: null, fixed: text };
  } catch (e) {
    return { data: null, error: e.message, fixed: text };
  }
}

// Usage:
const { data, error, fixed } = repairAiJson(llmOutput);
if (error) {
  console.error('Could not repair JSON:', error);
  console.log('Repaired text was:', fixed);
} else {
  console.log('Parsed successfully:', data);
}`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python — repair AI JSON output">
{`import re
import json

def strip_markdown_fences(text: str) -> str:
    """Remove \`\`\`json...\`\`\` wrappers that AI models add."""
    text = re.sub(r'^\`\`\`(?:json)?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\s*\`\`\`\s*$', '', text)
    return text.strip()

def strip_comments(text: str) -> str:
    text = re.sub(r'//[^\n]*', '', text)
    text = re.sub(r'/\*[\s\S]*?\*/', '', text)
    return text

def fix_python_literals(text: str) -> str:
    """Replace Python True/False/None with JSON true/false/null."""
    text = re.sub(r'(?<!["\w])(True)(?!["\w])', 'true', text)
    text = re.sub(r'(?<!["\w])(False)(?!["\w])', 'false', text)
    text = re.sub(r'(?<!["\w])(None)(?!["\w])', 'null', text)
    return text

def fix_trailing_commas(text: str) -> str:
    prev = None
    while prev != text:
        prev = text
        text = re.sub(r',(\s*[}\]])', r'\\1', text)
    return text

def repair_ai_json(raw: str) -> dict | list | None:
    text = strip_markdown_fences(raw)
    text = strip_comments(text)
    text = fix_python_literals(text)
    text = fix_trailing_commas(text)
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Could not repair JSON: {e}") from e

# Usage:
data = repair_ai_json(llm_output)  # handles most AI JSON errors`}
      </CodeBlock>

      <SectionHeader number={5} title="Structured Output Mode — Force Valid JSON at the API Level" />
      <p>
        All major AI APIs now offer a &ldquo;structured output&rdquo; or &ldquo;JSON mode&rdquo; that
        constrains the model to produce syntactically valid JSON. This is the most reliable solution
        for production pipelines and should be your first choice.
      </p>

      <CodeBlock language="javascript" filename="OpenAI JSON mode and structured outputs">
{`import OpenAI from 'openai';
const openai = new OpenAI();

// Method 1: JSON mode (guarantees valid JSON, any shape)
const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  response_format: { type: 'json_object' },  // ✅ Forces valid JSON
  messages: [
    { role: 'system', content: 'You always respond with valid JSON.' },
    { role: 'user', content: 'Generate a user profile for Alice Chen, age 30, roles: admin, editor.' },
  ],
});
const data = JSON.parse(completion.choices[0].message.content);

// Method 2: Structured outputs with JSON Schema (guarantees exact shape)
const completion2 = await openai.chat.completions.create({
  model: 'gpt-4o-2024-08-06',
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'user_profile',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          name:   { type: 'string' },
          age:    { type: 'integer' },
          roles:  { type: 'array', items: { type: 'string' } },
          active: { type: 'boolean' },
        },
        required: ['name', 'age', 'roles', 'active'],
        additionalProperties: false,
      },
    },
  },
  messages: [{ role: 'user', content: 'Generate a user profile for Alice Chen.' }],
});
// Guaranteed to parse without errors AND match the schema exactly
const user = JSON.parse(completion2.choices[0].message.content);`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'OpenAI — JSON mode',
          description: 'Set response_format: { type: "json_object" }. Guarantees syntactically valid JSON but does not enforce shape. Works with gpt-4o, gpt-4-turbo, gpt-3.5-turbo-1106+.',
        },
        {
          title: 'OpenAI — Structured Outputs',
          description: 'Set response_format: { type: "json_schema", json_schema: {...} } with strict: true. Guarantees both valid JSON and matching schema. Available on gpt-4o-2024-08-06+.',
        },
        {
          title: 'Anthropic Claude — tool_use',
          description: 'Define a tool with an input_schema. Ask Claude to "call the tool" with the data. Claude\'s tool_use output is always valid JSON matching the schema you provided.',
        },
        {
          title: 'Google Gemini — responseMimeType',
          description: 'Set generationConfig.responseMimeType to "application/json" and provide responseSchema. Gemini will constrain its output to match the schema using constrained decoding.',
        },
      ]} />

      <SectionHeader number={6} title="Validating AI JSON Against a Schema" />
      <p>
        Even with JSON mode enabled, you should validate the structure of the parsed JSON. An AI model
        can produce <code>{"{"}"age": "thirty"{"}"}</code> — syntactically valid JSON but semantically
        wrong. JSON Schema validation catches type mismatches and missing fields.
      </p>

      <CodeBlock language="javascript" filename="Runtime JSON Schema validation with Zod">
{`import { z } from 'zod';

// Define your expected shape with Zod
const UserSchema = z.object({
  id:        z.number().int().positive(),
  name:      z.string().min(1),
  email:     z.string().email(),
  roles:     z.array(z.enum(['admin', 'editor', 'viewer'])),
  active:    z.boolean(),
  createdAt: z.string().datetime().optional(),
});

type User = z.infer<typeof UserSchema>;

async function getAiGeneratedUser(prompt: string): Promise<User> {
  const rawJson = await callAiApi(prompt);

  // Step 1: repair common AI JSON errors
  const repairedText = repairAiJson(rawJson);

  // Step 2: parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(repairedText);
  } catch (e) {
    throw new Error(\`AI returned unparseable JSON: \${e.message}\`);
  }

  // Step 3: validate shape and types
  const result = UserSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map(i => \`\${i.path.join('.')}: \${i.message}\`);
    throw new Error(\`AI JSON failed schema validation: \${issues.join(', ')}\`);
  }

  return result.data; // ✅ Fully typed, validated data
}`}
      </CodeBlock>

      <AlertBox type="warning" title="Never trust AI JSON blindly">
        Even with JSON mode enabled and a repair function applied, always validate structure and types
        before using AI-generated data. A model can generate <code>{"{"}"user_id": "abc123"{"}"}</code> when
        you need an integer, pass the JSON parse step, but break your database insert silently.
        Type validation with Zod, Joi, or JSON Schema is a non-negotiable safety layer.
      </AlertBox>

      <SectionHeader number={7} title="Quick Cheat Sheet — Every AI JSON Error and Its Fix" />

      <CodeBlock language="json" filename="Before and after — all 8 AI JSON error patterns">
{`// ❌ TYPICAL AI OUTPUT (invalid)
{
  // User profile object
  name: 'Alice',                        // unquoted key + single quote
  "age": 30,
  "active": True,                       // Python literal
  "score": NaN,                         // JS-only value
  "balance": undefined,                 // JS-only value
  "tags": ["admin", "editor",],         // trailing comma
  "timeout": 030,                       // leading zero
  "priority": +1,                       /* block comment */
}

// ✅ VALID JSON (all errors fixed)
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "score": null,
  "balance": null,
  "tags": ["admin", "editor"],
  "timeout": 30,
  "priority": 1
}`}
      </CodeBlock>

      <VerticalSteps steps={[
        {
          title: 'Use our AI JSON Error Explainer',
          desc: 'Paste your broken AI-generated JSON into unblockdevs.com/json-error-explainer. It detects all 8 error patterns simultaneously, explains each one in plain English with RFC spec references, and fixes all auto-fixable errors in one click.',
        },
        {
          title: 'Use JSON mode in your AI API calls',
          desc: 'Enable response_format: { type: "json_object" } (OpenAI), tool_use with a schema (Anthropic), or responseMimeType: "application/json" (Gemini). Structured outputs eliminate trailing commas, single quotes, and most syntax errors at the model level.',
        },
        {
          title: 'Add a repair function to your pipeline',
          desc: 'Use the repairAiJson() function from this guide as a preprocessing step before JSON.parse(). This handles the cases where JSON mode is unavailable or where older models are used.',
        },
        {
          title: 'Validate schema after parsing',
          desc: 'Use Zod (TypeScript), Joi (JavaScript), Pydantic (Python), or jsonschema (Python) to validate the parsed object\'s shape and types. Syntactically valid JSON can still have the wrong data types or missing required fields.',
        },
        {
          title: 'Improve your prompt',
          desc: 'Explicitly list the JSON rules in your system prompt. Provide a concrete example of the exact output shape. Ask the model to self-verify before responding. These prompt engineering steps reduce errors by 60–80% without requiring API features.',
        },
      ]} />

      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer</p>
        <p className="text-sm text-zinc-600 mb-4">
          Paste broken AI-generated JSON and get instant plain-English explanations for every error —
          trailing commas, Python True/False/None, JS undefined/NaN, unquoted keys — with one-click
          auto-fix and RFC spec references. 100% browser-based, nothing uploaded.
        </p>
        <a href="/json-error-explainer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Fix My AI JSON Now →
        </a>
      </div>

      <FAQAccordion items={[
        {
          question: 'Why does ChatGPT always add trailing commas to JSON?',
          answer: 'ChatGPT was trained on enormous amounts of JavaScript code, which allows trailing commas in object and array literals since ES2017. When generating JSON, the model predicts token-by-token and treats the comma-before-closing-bracket pattern as normal — because it appears millions of times in its training data. The model has no internal JSON validator to catch this. Use JSON mode (response_format: { type: "json_object" }) in the OpenAI API to force valid JSON output, or run the output through a repair function that strips trailing commas.',
        },
        {
          question: 'Does using "JSON mode" in the AI API completely fix this?',
          answer: 'JSON mode guarantees syntactically valid JSON — no trailing commas, no comments, no Python literals. It does NOT guarantee the output matches your expected shape. The model might use the wrong key names, wrong types (string instead of number), or omit required fields. Always combine JSON mode with schema validation (Zod, Pydantic, JSON Schema) for production reliability.',
        },
        {
          question: 'Why does Claude produce True/False/None in JSON?',
          answer: 'Claude and other models are trained on mixed Python/JavaScript/JSON datasets. When generating JSON that represents Python data structures, the model sometimes reverts to Python literal syntax (True/False/None) instead of JSON syntax (true/false/null). This is especially common when the user prompt mentions Python or when the JSON represents data that commonly comes from Python APIs. Explicit instructions in the prompt — "use lowercase true, false, null, not Python-style True/False/None" — reduce this significantly.',
        },
        {
          question: 'How do I reliably extract JSON from a mixed AI response?',
          answer: 'AI models often wrap JSON in markdown code fences (```json...```) and add surrounding text. To extract: (1) look for ```json...``` and extract the content, (2) if not found, look for the first { or [ and match to its closing } or ], (3) try to parse the extracted content. In code: const match = text.match(/```(?:json)?\\s*([\\s\\S]*?)\\s*```/) and use match[1], or use text.slice(text.indexOf("{")) if the JSON starts at the first brace.',
        },
        {
          question: 'Is there a library that automatically repairs AI-generated JSON?',
          answer: 'Yes. Several libraries specialize in repairing broken JSON: json-repair (Python, pip install json-repair), dirty-json (Node.js, npm install dirty-json), JSON5 (handles most AI JSON errors but is a different spec). For production use, our free AI JSON Error Explainer at unblockdevs.com/json-error-explainer handles all 8 AI-specific error patterns in the browser with no server upload required.',
        },
        {
          question: 'Why does AI-generated JSON sometimes have both valid and invalid sections?',
          answer: 'AI models generate text sequentially. The first half of a large JSON response can be perfectly valid while the second half deteriorates — the model loses track of nesting depth, forgets quote style consistency, or hits context length limits. This is why you should always validate the entire response, not just check the beginning. Tools that detect all errors simultaneously (rather than stopping at the first) are essential for AI JSON debugging.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
