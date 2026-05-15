'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function LlmStructuredJsonOutputsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>LLM Structured JSON Outputs in 2026: OpenAI, Anthropic &amp; Gemini Complete Guide</h1>
      <p className="lead">
        Getting reliable, parseable JSON from a language model used to mean prayer and regex.
        In 2026 it means choosing the right structured output method and writing 10 lines of code.
        OpenAI&apos;s Structured Outputs, Anthropic&apos;s Tool Use, and Gemini&apos;s Response Schema
        have fundamentally changed AI development — but each works differently, each has hidden
        limitations, and picking the wrong method costs you reliability, latency, and money.
        This guide covers every method for every major provider with production-ready code,
        real tradeoffs, and a clear decision framework.
      </p>

      <StatGrid stats={[
        { value: '99.9%', label: 'parse reliability with strict structured outputs vs ~70% with prompt-only', color: 'green' },
        { value: '3', label: 'fundamentally different methods: JSON mode, function calling, strict schema', color: 'blue' },
        { value: '2x', label: 'typical latency overhead for constrained decoding vs free-form generation', color: 'amber' },
        { value: '2026', label: 'all major providers now support schema-constrained JSON — no excuses', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Why Prompt-Based JSON Is Not Enough" />
      <QuickFact color="red" label="Prompting for JSON gives you ~70% reliability — production needs 99.9%">
        The naive approach — &ldquo;Respond only in valid JSON format&rdquo; — works in demos and
        fails in production. LLMs trained on internet text have learned to follow instructions, but
        they also learned to add explanatory text, use code fences, insert comments, add trailing
        commas, and deviate from schemas when they &ldquo;think&rdquo; a different format is more
        helpful. Structured output modes use constrained decoding — the model is mathematically
        prevented from generating tokens that would violate the schema. That is the difference
        between ~70% and ~99.9% reliability.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Prompt-only approach — 70% reliability in production
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'system',
      content: 'You must respond ONLY with valid JSON. No explanation, no code fences.',
    },
    { role: 'user', content: 'Extract the name and age from: "Alice is 30 years old"' },
  ],
});

// What you hope to get: {"name":"Alice","age":30}
// What you sometimes get:
// '{"name": "Alice", "age": 30}' — fine
// '\`\`\`json\n{"name":"Alice","age":30}\n\`\`\`' — extra fences
// 'Here is the JSON: {"name":"Alice","age":30}' — extra text
// '{"name": "Alice", "age": "30"}' — age is a string
// '{"name":"Alice","age":30,"note":"extracted from the sentence"}' — extra key`}
        good={`// ✅ Structured Outputs — 99.9% reliability, guaranteed schema match
const response = await openai.chat.completions.create({
  model: 'gpt-4o-2024-08-06',
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'person_extraction',
      strict: true,   // ← constrained decoding — cannot deviate
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age:  { type: 'integer' },
        },
        required: ['name', 'age'],
        additionalProperties: false,  // ← no extra keys allowed
      },
    },
  },
  messages: [{ role: 'user', content: 'Extract: "Alice is 30 years old"' }],
});

// What you ALWAYS get: {"name":"Alice","age":30}
// No fences, no extra text, no wrong types, no extra keys — guaranteed`}
        badLabel="Prompt-only — unpredictable, ~70% reliable"
        goodLabel="Strict structured output — mathematically guaranteed"
      />

      <SectionHeader number={2} title="OpenAI — Three Methods Compared" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Method 1: JSON Mode',
          description: 'response_format: { type: "json_object" }. Guarantees syntactically valid JSON — no trailing commas, no code fences. Does NOT enforce a specific schema. Available on gpt-4o, gpt-4-turbo, gpt-3.5-turbo-1106+. Best for: when you need valid JSON but the exact shape is flexible.',
        },
        {
          title: 'Method 2: Function Calling',
          description: 'Define a tool with parameters schema. Ask the model to "call the tool". The tool call arguments are always valid JSON matching your schema. Available on all GPT-4 and GPT-3.5 models. Best for: agents that trigger actions, when you want the model to decide whether to call a function.',
        },
        {
          title: 'Method 3: Structured Outputs (strict)',
          description: 'response_format: { type: "json_schema", json_schema: { strict: true, schema: {...} } }. Uses constrained decoding — mathematically cannot produce output that violates the schema. Available on gpt-4o-2024-08-06 and later. Best for: data extraction, classification, any case where the schema must be exactly followed.',
        },
        {
          title: 'Which to choose?',
          description: 'For new projects: always start with Structured Outputs (strict: true) if available on your model. For agents: use function calling. For simple JSON without a strict schema: use JSON mode. Never use prompt-only for production code — it is unreliable at scale.',
        },
      ]} />

      <CodeBlock language="javascript" filename="OpenAI — all three methods side by side">
{`import OpenAI from 'openai';
const openai = new OpenAI();

const PROMPT = 'Extract the person\'s name and age from: "Alice Chen, 30 years old, software engineer"';

// ── Method 1: JSON Mode ───────────────────────────────────────────────────
const jsonModeResponse = await openai.chat.completions.create({
  model: 'gpt-4o',
  response_format: { type: 'json_object' },  // valid JSON, any shape
  messages: [
    { role: 'system', content: 'Extract person info as JSON.' },
    { role: 'user', content: PROMPT },
  ],
});
const jsonModeResult = JSON.parse(jsonModeResponse.choices[0].message.content);
// Result: { "name": "Alice Chen", "age": 30, "occupation": "software engineer" }
// Note: model may add extra fields — no schema enforcement

// ── Method 2: Function Calling ────────────────────────────────────────────
const functionCallResponse = await openai.chat.completions.create({
  model: 'gpt-4o',
  tools: [{
    type: 'function',
    function: {
      name: 'extract_person',
      description: 'Extract person information from text',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Full name' },
          age:  { type: 'integer', description: 'Age in years' },
        },
        required: ['name', 'age'],
      },
    },
  }],
  tool_choice: { type: 'function', function: { name: 'extract_person' } },
  messages: [{ role: 'user', content: PROMPT }],
});
const toolCall = functionCallResponse.choices[0].message.tool_calls?.[0];
const functionResult = JSON.parse(toolCall?.function.arguments ?? '{}');
// Result: { "name": "Alice Chen", "age": 30 }
// Schema-enforced — no extra fields from the schema

// ── Method 3: Structured Outputs (strict) — recommended ──────────────────
const structuredResponse = await openai.chat.completions.create({
  model: 'gpt-4o-2024-08-06',
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'person_extraction',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age:  { type: 'integer' },
        },
        required: ['name', 'age'],
        additionalProperties: false,
      },
    },
  },
  messages: [{ role: 'user', content: PROMPT }],
});
const structuredResult = JSON.parse(structuredResponse.choices[0].message.content);
// Result: { "name": "Alice Chen", "age": 30 }
// Mathematically guaranteed to match the schema — cannot deviate`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="OpenAI — TypeScript integration with Zod schema">
{`import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI();

// Define once — TypeScript type AND JSON Schema in one place
const PersonSchema = z.object({
  name:       z.string(),
  age:        z.number().int().min(0).max(150),
  occupation: z.string().optional(),
  skills:     z.array(z.string()).optional(),
});

type Person = z.infer<typeof PersonSchema>;

async function extractPerson(text: string): Promise<Person> {
  const response = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [{ role: 'user', content: \`Extract person info from: "\${text}"\` }],
    response_format: zodResponseFormat(PersonSchema, 'person'),
    //                               ↑ converts Zod schema to JSON Schema automatically
  });

  // response.choices[0].message.parsed is already typed as Person
  const parsed = response.choices[0].message.parsed;
  if (!parsed) throw new Error('Structured output parsing failed');

  return parsed; // TypeScript knows this is Person — fully typed
}

// Usage:
const person = await extractPerson('Alice Chen, 30, software engineer at Google');
console.log(person.name);       // TypeScript: string ✅
console.log(person.age);        // TypeScript: number ✅
console.log(person.occupation); // TypeScript: string | undefined ✅`}
      </CodeBlock>

      <SectionHeader number={3} title="Anthropic Claude — Tool Use for Structured Output" />
      <p>
        Claude does not have a dedicated &ldquo;JSON mode&rdquo; button. Instead, the recommended
        pattern is <em>tool use</em>: define a tool with an input schema, and ask Claude to
        &ldquo;call&rdquo; it with the extracted data. Claude&apos;s tool use output is always
        valid JSON matching the schema you provided. This is semantically equivalent to OpenAI&apos;s
        function calling.
      </p>

      <CodeBlock language="javascript" filename="Anthropic Claude — structured output via tool use">
{`import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

// ── Method: Tool use with forced tool_choice ──────────────────────────────
async function extractWithClaude(text) {
  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    tools: [{
      name: 'extract_product',
      description: 'Extract structured product information from unstructured text',
      input_schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Product name',
          },
          price: {
            type: 'number',
            description: 'Price in USD, positive number',
          },
          category: {
            type: 'string',
            enum: ['electronics', 'clothing', 'books', 'food', 'other'],
            description: 'Product category',
          },
          inStock: {
            type: 'boolean',
            description: 'Whether the product is currently in stock',
          },
          features: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of key product features',
          },
        },
        required: ['name', 'price', 'category', 'inStock'],
      },
    }],
    // Force Claude to use the tool — it MUST respond with structured JSON
    tool_choice: { type: 'tool', name: 'extract_product' },
    messages: [{
      role: 'user',
      content: \`Extract product information from this text: "\${text}"\`,
    }],
  });

  // Find the tool use block in the response
  const toolUse = response.content.find(block => block.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Claude did not return a tool use block');
  }

  // toolUse.input is already a parsed JavaScript object — not a string!
  // Claude's API returns tool inputs as parsed objects, not JSON strings
  return toolUse.input;
}

// Usage:
const product = await extractWithClaude(
  'The Sony WH-1000XM5 wireless headphones are on sale for $279.99, normally $399. In stock. ' +
  'Features include 30-hour battery, noise cancellation, and multipoint connection.'
);

console.log(product);
// {
//   name: "Sony WH-1000XM5",
//   price: 279.99,
//   category: "electronics",
//   inStock: true,
//   features: ["30-hour battery", "noise cancellation", "multipoint connection"]
// }`}
      </CodeBlock>

      <CodeBlock language="python" filename="Anthropic Claude — Python with Pydantic validation">
{`import anthropic
from pydantic import BaseModel, Field
from typing import Optional
import json

client = anthropic.Anthropic()

# Define output schema with Pydantic — Python-native validation
class Product(BaseModel):
    name: str = Field(description="Product name")
    price: float = Field(gt=0, description="Price in USD")
    category: str = Field(description="Product category")
    in_stock: bool = Field(description="Availability status")
    features: list[str] = Field(default=[], description="Key features")
    discount_percent: Optional[float] = Field(None, ge=0, le=100)

def extract_product(text: str) -> Product:
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        tools=[{
            "name": "extract_product",
            "description": "Extract structured product data from text",
            "input_schema": Product.model_json_schema(),  # Pydantic → JSON Schema
        }],
        tool_choice={"type": "tool", "name": "extract_product"},
        messages=[{"role": "user", "content": f'Extract product info: "{text}"'}],
    )

    tool_use = next(
        (block for block in response.content if block.type == "tool_use"),
        None
    )
    if not tool_use:
        raise ValueError("Claude did not return a tool use block")

    # Validate with Pydantic — catches type errors from Claude
    return Product.model_validate(tool_use.input)

product = extract_product("MacBook Pro 14-inch, $1,999, in stock. M3 Pro chip, 18GB RAM.")
print(f"{product.name}: \${product.price:.2f}")`}
      </CodeBlock>

      <SectionHeader number={4} title="Google Gemini — Response Schema" />

      <CodeBlock language="javascript" filename="Gemini — structured output with responseMimeType and responseSchema">
{`import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ── Method: responseMimeType + responseSchema ─────────────────────────────
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  generationConfig: {
    responseMimeType: 'application/json',   // force JSON output
    responseSchema: {                        // constrain to this schema
      type: SchemaType.OBJECT,
      properties: {
        name:     { type: SchemaType.STRING },
        age:      { type: SchemaType.INTEGER },
        email:    { type: SchemaType.STRING },
        skills:   { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        isActive: { type: SchemaType.BOOLEAN },
      },
      required: ['name', 'age', 'email', 'isActive'],
    },
  },
});

const result = await model.generateContent(
  'Extract info from: "Alice Chen, 30, alice@example.com, active. Skills: Python, JavaScript, SQL"'
);

const jsonText = result.response.text();
const data = JSON.parse(jsonText);

// Result:
// {
//   "name": "Alice Chen",
//   "age": 30,
//   "email": "alice@example.com",
//   "isActive": true,
//   "skills": ["Python", "JavaScript", "SQL"]
// }

// ── Gemini function calling (alternative approach) ─────────────────────────
const modelWithTools = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  tools: [{
    functionDeclarations: [{
      name: 'save_person',
      description: 'Save extracted person information to the database',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          name:  { type: SchemaType.STRING, description: 'Full name' },
          age:   { type: SchemaType.INTEGER, description: 'Age' },
          email: { type: SchemaType.STRING, description: 'Email address' },
        },
        required: ['name', 'age', 'email'],
      },
    }],
  }],
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Open Source LLMs — Structured Output Without an API" />

      <CodeBlock language="javascript" filename="Ollama — structured output with local LLMs">
{`// Ollama supports structured output via format parameter
// Run: ollama serve && ollama pull llama3.1

const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.1',
    prompt: 'Extract the name and age from: "Bob is 25 years old". Return JSON only.',
    format: {                    // ← JSON Schema constraint
      type: 'object',
      properties: {
        name: { type: 'string' },
        age:  { type: 'integer' },
      },
      required: ['name', 'age'],
    },
    stream: false,
  }),
});

const result = await response.json();
const data = JSON.parse(result.response);
// { name: "Bob", age: 25 }

// ── Outlines library (Python) — constrained decoding for any local model ──
// pip install outlines
import outlines
from pydantic import BaseModel

class Person(BaseModel):
    name: str
    age: int

model = outlines.models.transformers("mistralai/Mistral-7B-Instruct-v0.1")
generator = outlines.generate.json(model, Person)

person = generator("Extract: 'Charlie is 28 years old'")
# Returns: Person(name='Charlie', age=28)
# Guaranteed to match the Pydantic schema — uses constrained token sampling`}
      </CodeBlock>

      <SectionHeader number={6} title="The Structured Output Decision Framework" />

      <VerticalSteps steps={[
        {
          title: 'Is your output schema fixed and strict? → OpenAI Structured Outputs',
          desc: 'If you know exactly what fields and types you need, use OpenAI Structured Outputs with strict: true on gpt-4o-2024-08-06+. Combine with zodResponseFormat for TypeScript type safety. This is the most reliable method available — mathematically constrained output that cannot deviate from your schema.',
        },
        {
          title: 'Are you building an AI agent that takes actions? → Function Calling',
          desc: 'Use function calling (OpenAI tools, Anthropic tool_use, Gemini functionDeclarations) when you want the model to decide which action to take. Function calling lets the model choose between multiple tools, call none, or call several. This is the right pattern for agents — the model has agency. For pure data extraction, strict structured outputs are more appropriate.',
        },
        {
          title: 'Are you using Claude and need schema enforcement? → Tool Use with tool_choice forced',
          desc: 'Set tool_choice: { type: "tool", name: "your_tool_name" } to force Claude to always use your tool. Without this, Claude may respond with text instead of using the tool. The forced tool choice pattern gives you schema-enforced JSON output from Claude every time.',
        },
        {
          title: 'Are you using a local or open-source model? → Outlines or Ollama format parameter',
          desc: 'For local models via Ollama, use the format parameter with a JSON Schema. For Python-based inference, use the Outlines library which implements constrained decoding for any HuggingFace model. Both give you the same mathematical guarantee as commercial API structured outputs.',
        },
        {
          title: 'Do you need to validate the output beyond JSON syntax? → Always add schema validation',
          desc: 'Structured outputs guarantee the JSON shape but not semantic correctness. The model might put "thirty" for an age field typed as integer — wait, it cannot with strict mode, because integer type is enforced. But it might put 999 for age. Add business logic validation after parsing: Zod refinements, Pydantic validators, or custom checks for values that must be in specific ranges.',
        },
      ]} />

      <SectionHeader number={7} title="Complex Schema Patterns — Nested Objects, Unions, and Recursion" />

      <CodeBlock language="javascript" filename="Advanced JSON Schema patterns for LLM output">
{`// ── Nested objects ────────────────────────────────────────────────────────
const addressSchema = {
  type: 'object',
  properties: {
    street: { type: 'string' },
    city:   { type: 'string' },
    country: { type: 'string' },
    postalCode: { type: 'string' },
  },
  required: ['street', 'city', 'country'],
  additionalProperties: false,
};

const personWithAddressSchema = {
  type: 'object',
  properties: {
    name:    { type: 'string' },
    address: addressSchema,   // ← nested object — works in structured outputs
  },
  required: ['name', 'address'],
  additionalProperties: false,
};

// ── Enum (classification) ─────────────────────────────────────────────────
const classificationSchema = {
  type: 'object',
  properties: {
    sentiment: {
      type: 'string',
      enum: ['positive', 'neutral', 'negative'],
      // Model MUST output one of these three values — no hallucinated options
    },
    confidence: {
      type: 'number',
      // Note: minimum/maximum are NOT supported in strict mode (OpenAI)
      // Use them with Zod validation after parsing instead
    },
  },
  required: ['sentiment', 'confidence'],
  additionalProperties: false,
};

// ── Arrays of objects ─────────────────────────────────────────────────────
const extractedEntitiesSchema = {
  type: 'object',
  properties: {
    entities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text:  { type: 'string' },
          label: { type: 'string', enum: ['PERSON', 'ORG', 'LOCATION', 'DATE'] },
          score: { type: 'number' },
        },
        required: ['text', 'label', 'score'],
        additionalProperties: false,
      },
    },
    totalCount: { type: 'integer' },
  },
  required: ['entities', 'totalCount'],
  additionalProperties: false,
};

// ── OpenAI strict mode limitations (as of 2026) ──────────────────────────
// ✅ Supported: object, string, number, integer, boolean, array, null, enum
// ✅ Supported: required, additionalProperties: false (required when using strict)
// ✅ Supported: nested objects and arrays
// ❌ NOT supported in strict mode: anyOf/oneOf/allOf, minimum, maximum, pattern
// ❌ NOT supported: $ref recursive schemas (use $defs instead with --strict)
// ❌ NOT supported: optional properties (must be either required OR use anyOf with null)`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Optional properties — the correct pattern in strict mode">
{`// ❌ Wrong: optional properties via not-in-required array break strict mode
const badSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    nickname: { type: 'string' }, // ← not in required — BREAKS strict mode
  },
  required: ['name'],
  additionalProperties: false,
};

// ✅ Correct: optional fields via anyOf with null
const correctSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    nickname: {
      anyOf: [
        { type: 'string' },
        { type: 'null' },           // ← null represents "not present"
      ],
    },
  },
  required: ['name', 'nickname'],  // ← MUST be in required, even if nullable
  additionalProperties: false,
};
// Now the model will output null when nickname is unknown:
// { "name": "Alice", "nickname": null }

// ── With Zod (handles this automatically) ────────────────────────────────
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const PersonSchema = z.object({
  name:     z.string(),
  nickname: z.string().nullable(),  // ← Zod handles optional fields correctly
  age:      z.number().int(),
});

// zodResponseFormat(PersonSchema, 'person') generates the correct anyOf schema
// automatically — you don't have to think about strict mode limitations`}
      </CodeBlock>

      <SectionHeader number={8} title="Latency and Cost Tradeoffs" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Structured outputs add latency',
          description: 'Constrained decoding (strict structured outputs) adds 10–50ms of latency per request because the model must check schema validity at each token. For high-throughput pipelines with strict latency SLAs, measure this overhead. JSON mode (without strict schema) has negligible overhead.',
        },
        {
          title: 'Output tokens cost the same',
          description: 'Structured outputs do not reduce token usage — the model still generates the same JSON text as tokens. If your schema produces {"name":"Alice","age":30}, that is the same token cost as prompt-only JSON output. The benefit is reliability, not cost savings.',
        },
        {
          title: 'Caching the schema definition',
          description: 'OpenAI caches the JSON schema definition across requests. If you use the same schema repeatedly (which you should), the schema itself is not re-evaluated each time — only the prompt and output change. This reduces the latency overhead to negligible for steady-state production use.',
        },
        {
          title: 'Batch processing for high volume',
          description: 'For offline batch extraction (thousands of documents), use the Batch API (OpenAI, Anthropic). Batch requests are 50% cheaper and processed within 24 hours. Structured outputs work with batch APIs — same schemas, lower cost.',
        },
      ]} />

      <AlertBox type="tip" title="Always validate output even with structured outputs">
        Structured outputs guarantee JSON syntax and schema shape. They do not guarantee correct
        values — the model might hallucinate plausible-sounding data. Always validate semantic
        correctness with business logic: ages must be 0-150, prices must be positive, emails must
        match a regex, dates must be in the past, etc. Use Zod refinements or Pydantic validators
        for this layer after the schema constraint does its job.
      </AlertBox>

      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer</p>
        <p className="text-sm text-zinc-600 mb-4">
          When your LLM output still has JSON errors despite your best efforts — trailing commas,
          Python True/False/None, undefined/NaN — paste it into our free AI JSON Error Explainer.
          Detects all errors simultaneously with plain-English explanations and one-click auto-fix.
        </p>
        <a href="/json-error-explainer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Fix My LLM JSON →
        </a>
      </div>

      <FAQAccordion items={[
        {
          question: 'What is the difference between OpenAI JSON mode and Structured Outputs?',
          answer: 'JSON mode (response_format: { type: "json_object" }) guarantees syntactically valid JSON — no trailing commas, no markdown fences, no explanatory text. It does NOT enforce any schema. The model chooses its own structure. Structured Outputs (response_format: { type: "json_schema", json_schema: { strict: true, ... } }) additionally guarantees that the output matches your exact schema — specific fields, specific types, no extra keys. For production data extraction, always use Structured Outputs. Use JSON mode only when you genuinely do not care about the output shape.',
        },
        {
          question: 'Does Anthropic Claude have a "JSON mode" equivalent?',
          answer: 'Claude does not have a dedicated JSON mode separate from tool use. The recommended pattern is tool use with forced tool_choice (type: "tool", name: "your_tool"). This gives schema-enforced JSON output. Claude also responds well to explicit prompt instructions like "respond only with a JSON object matching this schema" — but this is prompt-based and less reliable than forced tool use. For production, always use forced tool use with an input_schema.',
        },
        {
          question: 'Can I use structured outputs with streaming?',
          answer: 'Yes, but you cannot parse individual stream chunks as complete JSON — you must buffer the entire streamed response before parsing. Stream the output for real-time UX, accumulate all chunks in a string, and parse the final accumulated string as JSON. OpenAI\'s SDK provides stream.finalChatCompletion() and stream.finalMessage() helpers that handle this accumulation for you.',
        },
        {
          question: 'What happens when the AI cannot fill a required field?',
          answer: 'With strict structured outputs, the model must produce a value for every required field — it is mathematically constrained to do so. If the information is genuinely not present in the input, the model will hallucinate a plausible value rather than omitting the field. This is why optional fields should use anyOf: [string, null] with null representing "not found". Then the model can honestly output null for missing information instead of inventing one.',
        },
        {
          question: 'Is structured output supported for fine-tuned models?',
          answer: 'OpenAI supports Structured Outputs for fine-tuned versions of gpt-4o and gpt-4o-mini (both based on the 2024-08-06 architecture or later). Anthropic tool use works with all Claude models including fine-tuned variants. For open-source fine-tuned models, use Outlines (which implements constrained decoding at the inference level, independent of model fine-tuning). Always test structured output reliability after fine-tuning — the fine-tuning process can affect how well the model respects schema constraints.',
        },
        {
          question: 'How do I handle very large or complex schemas with structured outputs?',
          answer: 'OpenAI\'s structured outputs with strict: true support schemas up to 5MB in the json_schema field (as of 2026). Very complex schemas with deeply nested $defs are supported. Performance-wise, large schemas add minimal latency because the schema is compiled into a constraint automaton once and cached. For Anthropic, tool input schemas have similar limits. Practical tip: keep schemas focused on what you actually need — a schema with 50 fields will produce lower-quality extractions than one with 10 precise fields because the model has to fill all required fields and may hallucinate values for fields it has no information about.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
