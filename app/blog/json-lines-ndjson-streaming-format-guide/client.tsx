'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function JsonLinesNdjsonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Lines &amp; NDJSON: The Streaming Format Powering Every AI API in 2026</h1>
      <p className="lead">
        Every time ChatGPT types out its response word-by-word, every time Claude streams a reply
        in real-time, every time Gemini renders text as it generates — that is NDJSON at work.
        Newline-Delimited JSON (NDJSON), also called JSON Lines, is the format that makes streaming
        AI responses, processing billion-record datasets, and building real-time pipelines possible.
        Yet most developers who use it every day have never heard its name or read its spec.
        This guide covers everything: format rules, parsing patterns, AI streaming APIs, big data
        use cases, and production-ready code for JavaScript and Python.
      </p>

      <StatGrid stats={[
        { value: 'NDJSON', label: 'powers the streaming API for OpenAI, Anthropic, and Gemini', color: 'blue' },
        { value: '1 rule', label: 'each line is a complete, valid JSON document — nothing more', color: 'green' },
        { value: '10x', label: 'more memory-efficient than loading a full JSON array into RAM', color: 'amber' },
        { value: 'O(1)', label: 'memory per record — process billion-record files with constant RAM', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What Is NDJSON / JSON Lines? The 30-Second Explanation" />

      <QuickFact color="blue" label="One JSON document per line — that is the entire spec">
        NDJSON (Newline-Delimited JSON) is a format where each line of a file or stream is a complete,
        self-contained JSON document. Lines are separated by newline characters (<code>{`\n`}</code>).
        Blank lines are allowed and ignored. The file extension is <code>.ndjson</code> or
        <code>.jsonl</code>. The MIME type is <code>application/x-ndjson</code>. That is it — the
        entire specification in one paragraph. What makes it powerful is the operational implications.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ Regular JSON array — must load the entire file to parse anything
[
  {"id": 1, "name": "Alice", "score": 95},
  {"id": 2, "name": "Bob", "score": 87},
  {"id": 3, "name": "Charlie", "score": 92}
]
// Problem: a 10GB file with 100M records requires 10GB+ of RAM
// You cannot start processing until the entire file is downloaded and parsed
// You cannot append a new record without rewriting the entire file
// A corruption at byte 5GB means the entire array is unparseable`}
        good={`// ✅ NDJSON — each line is independent, process one at a time
{"id": 1, "name": "Alice", "score": 95}
{"id": 2, "name": "Bob", "score": 87}
{"id": 3, "name": "Charlie", "score": 92}

// Benefits:
// ✅ Process record 1 before downloading record 2 — true streaming
// ✅ Append a new record by appending a new line — O(1) write
// ✅ A corrupt line only breaks that record, not the entire file
// ✅ 10GB file with 100M records needs only ~1KB of RAM per record
// ✅ Trivially parallelise with grep, awk, jq, split, xargs`}
        badLabel="JSON array — load entire file to parse anything"
        goodLabel="NDJSON — process one record at a time, constant memory"
      />

      <SectionHeader number={2} title="Why Every AI Streaming API Uses NDJSON" />
      <p>
        When you call an AI API in streaming mode, the server cannot send a single JSON response
        because it does not know the full response yet — the model is generating it token by token.
        Instead, the server sends a stream of small JSON documents, one per chunk, as they are
        generated. NDJSON is the perfect format for this: each chunk is a valid JSON document,
        and the client can parse and display each chunk as it arrives without waiting for the stream
        to finish.
      </p>

      <CodeBlock language="javascript" filename="OpenAI streaming — raw NDJSON wire format">
{`// When you call OpenAI with stream: true, the raw response looks like this:
// (Each line is sent as a Server-Sent Event, but the data field is NDJSON)

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"role":"assistant"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":", world"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"!"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{},"finish_reason":"stop"},"index":0}]}

data: [DONE]

// Each "data: " line contains one complete JSON document (NDJSON)
// The client parses each line independently as it arrives
// This is why ChatGPT, Claude, and Gemini can "type" responses in real-time`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Reading OpenAI streaming response — production-grade">
{`import OpenAI from 'openai';

const openai = new OpenAI();

// ── Method 1: Using the SDK's built-in stream helper ─────────────────────
async function streamWithSdk() {
  const stream = openai.beta.chat.completions.stream({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Write a short poem about JSON.' }],
  });

  // Stream events are automatically parsed from NDJSON for you
  stream.on('text', (text) => {
    process.stdout.write(text); // prints each word as it arrives
  });

  const final = await stream.finalChatCompletion();
  console.log('\n\nFinal:', final.choices[0].message.content);
}

// ── Method 2: Manual streaming — parse raw NDJSON yourself ────────────────
async function streamManually() {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      stream: true,
      messages: [{ role: 'user', content: 'Write a short poem about JSON.' }],
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? ''; // keep incomplete last line in buffer

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;

      // Each line is: "data: {json object}"
      const jsonStr = trimmed.replace(/^data:\s*/, '');

      try {
        const chunk = JSON.parse(jsonStr);
        const text = chunk.choices?.[0]?.delta?.content ?? '';
        fullText += text;
        process.stdout.write(text); // render in real-time
      } catch {
        // Ignore non-JSON lines (comments, empty lines)
      }
    }
  }

  return fullText;
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Streaming Claude (Anthropic) Responses" />

      <CodeBlock language="javascript" filename="Anthropic Claude streaming — full implementation">
{`import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

// ── Method 1: SDK stream helper ───────────────────────────────────────────
async function streamClaude(prompt) {
  let fullText = '';

  const stream = anthropic.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  // Each text_delta event is parsed from NDJSON automatically
  stream.on('text', (text) => {
    fullText += text;
    process.stdout.write(text);
  });

  await stream.finalMessage();
  return fullText;
}

// ── Method 2: Manual stream for Next.js App Router ───────────────────────
// app/api/chat/route.ts
export async function POST(request) {
  const { prompt } = await request.json();

  const anthropicStream = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  });

  // Transform Anthropic's event stream into a text stream for the browser
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of anthropicStream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          // Each event.delta is parsed from NDJSON by the SDK
          controller.enqueue(encoder.encode(event.delta.text));
        }
        if (event.type === 'message_stop') {
          controller.close();
        }
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="React hook — stream AI text into UI in real-time">
{`'use client';
import { useState, useCallback } from 'react';

export function useAiStream() {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const stream = useCallback(async (prompt) => {
    setIsStreaming(true);
    setText('');
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read stream chunks — each chunk may contain partial or multiple NDJSON lines
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setText(prev => prev + chunk); // append each chunk as it arrives
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Stream failed');
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { text, isStreaming, error, stream };
}

// Usage in a component:
function ChatComponent() {
  const { text, isStreaming, stream } = useAiStream();

  return (
    <div>
      <button onClick={() => stream('Explain JSON in one paragraph')} disabled={isStreaming}>
        {isStreaming ? 'Streaming...' : 'Ask AI'}
      </button>
      <div className="response">
        {text}
        {isStreaming && <span className="cursor-blink">|</span>}
      </div>
    </div>
  );
}`}
      </CodeBlock>

      <SectionHeader number={4} title="NDJSON for Big Data — Processing Billion-Record Datasets" />
      <p>
        NDJSON is the dominant format for machine learning datasets, log files, event streams, and
        data lake exports. The reason is always the same: you cannot load a 100GB JSON array into
        RAM, but you can process a 100GB NDJSON file with a few kilobytes of memory by reading it
        one line at a time.
      </p>

      <CodeBlock language="javascript" filename="Node.js — streaming NDJSON file processing">
{`import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

// Process a 10GB NDJSON file with constant memory (~1KB)
async function processNdjsonFile(filePath, onRecord) {
  const fileStream = createReadStream(filePath, { encoding: 'utf8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

  let lineNumber = 0;
  let errorCount = 0;

  for await (const line of rl) {
    lineNumber++;
    const trimmed = line.trim();
    if (!trimmed) continue; // skip blank lines

    try {
      const record = JSON.parse(trimmed);
      await onRecord(record, lineNumber);
    } catch (e) {
      errorCount++;
      console.warn(\`Line \${lineNumber}: JSON parse error — \${e.message}\`);
      // Continue processing — one bad line doesn't stop the whole file
    }
  }

  console.log(\`Processed \${lineNumber} lines, \${errorCount} errors\`);
}

// Usage: process 100M user records, output aggregate stats
const stats = { total: 0, avgAge: 0 };
await processNdjsonFile('users.ndjson', (record) => {
  stats.total++;
  stats.avgAge += record.age ?? 0;
});
stats.avgAge /= stats.total;
console.log(stats);

// ── Writing NDJSON ────────────────────────────────────────────────────────
import { createWriteStream } from 'fs';

function createNdjsonWriter(filePath) {
  const stream = createWriteStream(filePath, { encoding: 'utf8' });
  return {
    write: (record) => {
      // Each record: compact JSON + newline character — that is NDJSON
      stream.write(JSON.stringify(record) + '\n');
    },
    close: () => new Promise((resolve, reject) => {
      stream.end(err => err ? reject(err) : resolve(undefined));
    }),
  };
}

// Usage:
const writer = createNdjsonWriter('output.ndjson');
for (const user of users) writer.write(user);
await writer.close();`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python — NDJSON streaming with generator pattern">
{`import json
from typing import Generator, Any

# ── Reading NDJSON — memory-efficient generator ───────────────────────────
def read_ndjson(filepath: str) -> Generator[dict, None, None]:
    """Read NDJSON file one record at a time — O(1) memory."""
    with open(filepath, 'r', encoding='utf-8') as f:
        for line_number, line in enumerate(f, start=1):
            line = line.strip()
            if not line:
                continue  # skip blank lines
            try:
                yield json.loads(line)
            except json.JSONDecodeError as e:
                print(f"Warning: Line {line_number} is invalid JSON: {e}")
                # Continue — one bad line doesn't stop the file

# Usage: process 100M records with constant memory
total = 0
error_count = 0
for record in read_ndjson('events.ndjson'):
    total += record.get('value', 0)
    error_count += 1 if record.get('is_error') else 0

print(f"Total: {total}, Errors: {error_count}")

# ── Writing NDJSON ────────────────────────────────────────────────────────
def write_ndjson(filepath: str, records: list[dict]) -> None:
    with open(filepath, 'w', encoding='utf-8') as f:
        for record in records:
            # compact JSON + newline = NDJSON
            f.write(json.dumps(record, separators=(',', ':')) + '\n')

# ── Streaming from an AI API ──────────────────────────────────────────────
import anthropic

def stream_claude(prompt: str) -> str:
    client = anthropic.Anthropic()
    full_text = ""

    with client.messages.stream(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_text += text

    return full_text`}
      </CodeBlock>

      <SectionHeader number={5} title="Command-Line NDJSON Power Tools" />
      <p>
        Because each line of NDJSON is independent, you can use standard Unix command-line tools
        to process NDJSON files without writing any code. Combined with <code>jq</code> (a
        command-line JSON processor), NDJSON becomes incredibly powerful.
      </p>

      <CodeBlock language="bash" filename="jq + Unix tools — process NDJSON without writing code">
{`# Extract a single field from every record
cat users.ndjson | jq '.name'

# Filter records by condition
cat events.ndjson | jq 'select(.type == "error")'

# Transform records — pick only specific fields
cat users.ndjson | jq '{id: .id, email: .email}'

# Count records matching a condition
cat events.ndjson | jq 'select(.severity == "critical")' | wc -l

# Aggregate — sum a numeric field
cat orders.ndjson | jq '.amount' | paste -sd+ | bc

# Convert NDJSON to a JSON array (for tools that need regular JSON)
cat users.ndjson | jq -s '.'  # the -s flag "slurp" collects all into array

# Convert a JSON array to NDJSON
cat users-array.json | jq '.[]'  # outputs each element on its own line

# Sort NDJSON by a field (requires loading into memory)
cat events.ndjson | jq -s 'sort_by(.timestamp)[]'

# Parallel processing with GNU parallel
cat huge.ndjson | parallel --pipe -N1000 'jq ".score" | awk "{sum+=\$1} END {print sum}"'
# ^ Processes 1000 records per CPU core simultaneously

# Split a huge NDJSON into 1M-record chunks
split -l 1000000 huge.ndjson chunk_
# Each chunk_aa, chunk_ab etc. is itself valid NDJSON

# Sample 1% of records randomly (for testing on large files)
cat huge.ndjson | awk 'BEGIN{srand()} !/^$/{if(rand()<0.01) print}' > sample.ndjson`}
      </CodeBlock>

      <SectionHeader number={6} title="NDJSON vs JSON Array — When to Use Which" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Use NDJSON when…',
          description: 'Streaming (AI responses, log ingestion, event feeds), large datasets (over 10MB), append-only writes, parallel processing, line-by-line human readability, log files, ML training datasets. Any time you cannot load the entire dataset into memory at once.',
        },
        {
          title: 'Use JSON Array when…',
          description: 'Small config files, API responses that are fully formed before sending, data that must be valid JSON for tooling compatibility, when order and context of the whole array matters, when the consumer is a browser that uses fetch().json().',
        },
        {
          title: 'NDJSON for AI fine-tuning',
          description: 'OpenAI, Anthropic, and most other AI providers accept training data in NDJSON format. Each line is one training example: {"messages": [{"role":"user","content":"..."},{"role":"assistant","content":"..."}]}. Fine-tuning datasets with millions of examples are always NDJSON — never a JSON array.',
        },
        {
          title: 'NDJSON for observability',
          description: 'Structured logging in NDJSON format is the industry standard. Each log line is a JSON document with timestamp, level, message, and context fields. Tools like Datadog, Splunk, and the ELK Stack all ingest NDJSON log streams. Winston, Bunyan, and Pino all output NDJSON by default.',
        },
      ]} />

      <CodeBlock language="javascript" filename="NDJSON for AI fine-tuning datasets">
{`// OpenAI fine-tuning dataset format — each line is one training example
// File: training-data.ndjson

{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "What is JSON?"}, {"role": "assistant", "content": "JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."}]}
{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "How do I fix a trailing comma in JSON?"}, {"role": "assistant", "content": "Remove the comma before the closing bracket or brace. For example, change [1, 2, 3,] to [1, 2, 3] and {\"a\": 1,} to {\"a\": 1}."}]}

// Generating a fine-tuning dataset programmatically:
const writer = createNdjsonWriter('training-data.ndjson');

for (const example of trainingExamples) {
  writer.write({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: example.question },
      { role: 'assistant', content: example.answer },
    ],
  });
}

await writer.close();

// Upload to OpenAI for fine-tuning:
const uploadedFile = await openai.files.create({
  file: fs.createReadStream('training-data.ndjson'),
  purpose: 'fine-tune',
});

const fineTune = await openai.fineTuning.jobs.create({
  training_file: uploadedFile.id,
  model: 'gpt-4o-mini',
});`}
      </CodeBlock>

      <SectionHeader number={7} title="NDJSON Streaming in Next.js — Real-Time AI UI" />

      <CodeBlock language="javascript" filename="Next.js App Router — streaming NDJSON AI endpoint">
{`// app/api/ai-stream/route.ts — production streaming endpoint

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  // Validate input
  if (!prompt || typeof prompt !== 'string' || prompt.length > 2000) {
    return new Response(JSON.stringify({ error: 'Invalid prompt' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();

  // Create a ReadableStream that sends NDJSON events
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const aiStream = anthropic.messages.stream({
          model: 'claude-opus-4-5',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        });

        for await (const event of aiStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            // Each line we send is one NDJSON event
            const ndjsonLine = JSON.stringify({
              type: 'text',
              content: event.delta.text,
              timestamp: Date.now(),
            }) + '\n';

            controller.enqueue(encoder.encode(ndjsonLine));
          }
        }

        // Send a final event to signal stream completion
        controller.enqueue(encoder.encode(
          JSON.stringify({ type: 'done', timestamp: Date.now() }) + '\n'
        ));

      } catch (error) {
        controller.enqueue(encoder.encode(
          JSON.stringify({ type: 'error', message: 'Stream failed' }) + '\n'
        ));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no', // disable Nginx buffering for true streaming
    },
  });
}

// Client-side NDJSON parser for the above endpoint:
async function streamAi(prompt: string, onText: (t: string) => void) {
  const response = await fetch('/api/ai-stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const event = JSON.parse(line);          // parse each NDJSON line
        if (event.type === 'text') onText(event.content);
        if (event.type === 'done') return;
      } catch { /* ignore parse errors on incomplete lines */ }
    }
  }
}`}
      </CodeBlock>

      <AlertBox type="tip" title="Always buffer partial NDJSON lines">
        Network chunks do not align with NDJSON lines. A single network chunk may contain half
        a JSON document, or three full documents plus the start of a fourth. Always maintain a
        buffer string and only parse lines that end with a newline character. The pattern:
        add the new chunk to the buffer, split on <code>{`\n`}</code>, keep the last element
        (the potentially incomplete line) as the new buffer, and parse all other elements.
      </AlertBox>

      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer</p>
        <p className="text-sm text-zinc-600 mb-4">
          Working with NDJSON and getting parse errors on individual lines? Paste any broken JSON
          line into our free AI JSON Error Explainer for instant diagnosis — trailing commas,
          Python values, unquoted keys, and 11 more error types detected simultaneously.
        </p>
        <a href="/json-error-explainer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Debug My NDJSON Line →
        </a>
      </div>

      <FAQAccordion items={[
        {
          question: 'What is the difference between NDJSON, JSON Lines, and JSONL?',
          answer: 'They are the same format with three different names. NDJSON (Newline-Delimited JSON) is the term used in the IETF draft specification. JSON Lines (jsonlines.org) is an earlier brand name for the same format. JSONL is the extension commonly used by OpenAI and the ML community (.jsonl files). All three: one JSON document per line, lines separated by \\n, blank lines ignored, no surrounding array. The MIME type is application/x-ndjson.',
        },
        {
          question: 'How do I parse NDJSON in the browser without a library?',
          answer: 'Split on newlines and parse each non-empty line: const records = ndjsonText.split("\\n").filter(line => line.trim()).map(line => JSON.parse(line)). For streaming (from a fetch ReadableStream), maintain a buffer: accumulate decoded chunks in a string, split on \\n, keep the last element as the incomplete-line buffer, and parse all earlier elements. Never call JSON.parse() on the entire NDJSON string — that will fail because NDJSON is not valid JSON.',
        },
        {
          question: 'Can I use jq with NDJSON files?',
          answer: 'Yes — jq works natively with NDJSON. By default, jq reads one JSON document at a time from stdin (which is exactly NDJSON format). So cat file.ndjson | jq \'.name\' prints the name field from every record. To collect all records into a JSON array, use the --slurp (-s) flag: cat file.ndjson | jq -s \'.\'. To convert a JSON array to NDJSON: cat array.json | jq \'.[]\'. jq is the most powerful tool for NDJSON manipulation on the command line.',
        },
        {
          question: 'How do the major AI APIs use NDJSON for streaming?',
          answer: 'OpenAI uses Server-Sent Events (SSE) where each event\'s "data:" field contains a JSON object (NDJSON-style). The stream ends with "data: [DONE]". Anthropic uses a similar SSE format with typed events (message_start, content_block_start, content_block_delta, message_stop). Gemini uses a JSON stream where each chunk is a GenerateContentResponse object. All three SDKs handle the raw NDJSON parsing for you — the stream() method abstracts away the line-by-line parsing.',
        },
        {
          question: 'What happens if one line in an NDJSON file is corrupted?',
          answer: 'Only that one record is lost — unlike a JSON array where a corrupt comma or brace corrupts everything after it. This is one of NDJSON\'s key advantages for reliability. A robust parser catches the error on that line (JSON.parse throws), logs a warning, and continues processing the remaining lines. For production data pipelines, track parse error rates per file — a spike indicates upstream data quality issues.',
        },
        {
          question: 'Is NDJSON a good format for API responses?',
          answer: 'For streaming responses (AI, real-time updates, long-running operations), yes — NDJSON is the standard. For regular request-response APIs (REST endpoints), no — use a regular JSON object or array that the browser can consume with response.json(). The decision point: does the consumer need data before the response is complete? If yes, stream with NDJSON. If no, send a single JSON response. Mixing both in one API is common: POST /api/chat with stream: true returns NDJSON; POST /api/chat without it returns a complete JSON object.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
