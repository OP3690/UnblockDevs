'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix: "Unexpected token &lt; in JSON at position 0" — API Returns HTML Instead of JSON</h1>
      <p className="lead">
        The "Unexpected token &lt; in JSON at position 0" error is one of the most confusing JavaScript errors
        developers encounter. It means your code tried to parse an HTML page as JSON. This complete guide
        explains every root cause and gives you battle-tested fixes for fetch, axios, Express, Flask, and Next.js.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'Most Googled JSON error', color: 'red' },
        { value: '404/500', label: 'Most common HTTP causes', color: 'amber' },
        { value: '< char', label: 'First char that triggers the error', color: 'blue' },
        { value: '4 fixes', label: 'Proven solutions in this guide', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What Does This Error Actually Mean?" />

      <p>
        When JavaScript&apos;s <code>JSON.parse()</code> or <code>response.json()</code> encounters a string
        beginning with <code>&lt;</code>, it throws <strong>SyntaxError: Unexpected token &lt; in JSON at position 0</strong>.
        That leading <code>&lt;</code> is the start of an HTML tag — most often <code>&lt;!DOCTYPE html&gt;</code>
        or <code>&lt;html&gt;</code> — coming from an error page your server sent instead of the JSON payload your
        code expected.
      </p>

      <QuickFact>JSON is strict: it accepts only objects, arrays, strings, numbers, booleans, and null. An HTML angle-bracket immediately causes a parse failure.</QuickFact>

      <AlertBox type="error" title="Error in browser console">
        {`SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
  at JSON.parse (<anonymous>)
  at Response.json (fetch.js:42)`}
      </AlertBox>

      <ArchDiagram
        boxes={[
          { label: 'Your fetch() call', color: 'blue' },
          { label: 'Server returns HTML', color: 'red' },
          { label: 'response.json() called', color: 'amber' },
          { label: 'SyntaxError thrown', color: 'red' },
        ]}
        arrows={['→', '→', '→']}
      />

      <SectionHeader number={2} title="Root Causes — Why the API Returns HTML" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Wrong endpoint URL (404)',
          description: 'A typo in the path or a missing route means the server returns its default 404 HTML page.',
        },
        {
          title: 'Server crash (500)',
          description: 'An unhandled exception causes the framework to render its HTML error page.',
        },
        {
          title: 'Authentication redirect (401/403)',
          description: 'Many servers redirect unauthenticated requests to a /login HTML page.',
        },
        {
          title: 'CORS preflight blocked',
          description: 'A blocked CORS preflight can yield an opaque HTML response that looks like content.',
        },
        {
          title: 'Wrong Content-Type header',
          description: 'Server sets Content-Type: text/html even though the body is — or should be — JSON.',
        },
        {
          title: 'API gateway / CDN error page',
          description: 'A CloudFront, Nginx, or Cloudflare 502/503 page is intercepted before your API responds.',
        },
      ]} />

      <SectionHeader number={3} title="Diagnose the Problem in 30 Seconds" />

      <VerticalSteps steps={[
        {
          title: 'Open browser DevTools → Network tab',
          description: 'Find the failing request and click it.',
        },
        {
          title: 'Check Status Code',
          description: 'Anything other than 2xx means the server signalled an error before your code ran.',
        },
        {
          title: 'Check Response Headers',
          description: 'Content-Type: text/html confirms the server returned HTML.',
        },
        {
          title: 'Preview the Response Body',
          description: 'You should see the HTML error page — a 404, login redirect, or stack trace.',
        },
        {
          title: 'Fix the underlying error first',
          description: 'The JSON parse error is a symptom. The real bug is whichever step above failed.',
        },
      ]} />

      <CodeBlock language="js" filename="debug-snippet.js">
{`// Quick diagnostic: log the raw text before parsing
async function diagnose(url) {
  const res = await fetch(url);
  const text = await res.text();

  console.log('Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  console.log('Body preview:', text.slice(0, 300));

  if (text.trim().startsWith('<')) {
    console.error('⚠️  Server returned HTML, not JSON');
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Fix 1 — Check Content-Type Before Calling .json()" />

      <p>
        The safest universal fix is to inspect the <code>Content-Type</code> response header before you try to
        parse the body. If the type is not <code>application/json</code>, handle the error gracefully instead
        of letting <code>.json()</code> throw.
      </p>

      <ErrorFix
        badLabel="Naive fetch — crashes on HTML response"
        bad={`const res = await fetch('/api/users');
const data = await res.json(); // 💥 throws if server returned HTML`}
        goodLabel="Safe fetch — checks Content-Type first"
        good={`async function safeFetch(url) {
  const res = await fetch(url);

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const body = await res.text();
    throw new Error(
      \`Expected JSON but got \${contentType}. Body: \${body.slice(0, 120)}\`
    );
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? \`HTTP \${res.status}\`);
  }

  return res.json();
}`}
      />

      <SectionHeader number={5} title="Fix 2 — Read response.text() Then Parse Conditionally" />

      <p>
        Reading the body as text first gives you full control. You can log the HTML, detect the error type,
        and provide actionable messages to users.
      </p>

      <CodeBlock language="js" filename="safe-json-parse.js">
{`async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const raw = await res.text();

  // Detect HTML responses
  if (raw.trimStart().startsWith('<')) {
    console.error('HTML response received:', raw.slice(0, 400));
    throw new Error(
      \`API endpoint \${url} returned HTML (status \${res.status}). \` +
      'Check the endpoint URL and server configuration.'
    );
  }

  try {
    const data = JSON.parse(raw);
    if (!res.ok) throw new Error(data.message ?? \`HTTP \${res.status}\`);
    return data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error(\`Invalid JSON from \${url}: \${raw.slice(0, 120)}\`);
    }
    throw err;
  }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Fix 3 — Axios Interceptor (Handle All Requests Globally)" />

      <p>
        If you use Axios, add a response interceptor to detect HTML globally rather than repeating the check
        in every call.
      </p>

      <CodeBlock language="js" filename="axios-interceptor.js">
{`import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
  (response) => {
    const ct = response.headers['content-type'] ?? '';
    if (!ct.includes('application/json')) {
      return Promise.reject(
        new Error(
          \`Expected JSON but got \${ct}. ` +
          \`Status \${response.status}. Check the API endpoint.\`
        )
      );
    }
    return response;
  },
  (error) => {
    // Axios throws for non-2xx automatically
    const ct = error.response?.headers?.['content-type'] ?? '';
    if (!ct.includes('application/json')) {
      error.message =
        \`Server returned HTML error page (status \${error.response?.status}).\`;
    }
    return Promise.reject(error);
  }
);

export default api;`}
      </CodeBlock>

      <SectionHeader number={7} title="Fix 4 — Configure Your Server to Return JSON Errors" />

      <p>
        The cleanest long-term fix is on the server: make every error response a JSON object so the client
        never sees HTML. Here are implementations for the three most common backends.
      </p>

      <CodeBlock language="js" filename="express-json-errors.js">
{`const express = require('express');
const app = express();

app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.get('/api/users/:id', (req, res) => {
  const user = db.find(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found', status: 404 });
  }
  res.json(user);
});

// ── 404 catch-all ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path, status: 404 });
});

// ── Global error handler ────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status ?? 500).json({
    error: err.message ?? 'Internal Server Error',
    status: err.status ?? 500,
  });
});`}
      </CodeBlock>

      <CodeBlock language="python" filename="flask-json-errors.py">
{`from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

@app.errorhandler(HTTPException)
def handle_http(e):
    return jsonify(error=e.description, status=e.code), e.code

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify(error=str(e), status=500), 500`}
      </CodeBlock>

      <CodeBlock language="ts" filename="next-api-error.ts">
{`// app/api/users/[id]/route.ts  (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.getUser(params.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}`}
      </CodeBlock>

      <SectionHeader number={8} title="Comparison: Common Error Scenarios" />

      <CompareTable
        leftLabel="What server returns"
        rightLabel="What your code should do"
        rows={[
          {
            label: 'Status 404, Content-Type: text/html',
            left: 'HTML 404 page',
            right: 'Throw "endpoint not found" — never call .json()',
          },
          {
            label: 'Status 401, redirect to /login',
            left: 'HTML login page',
            right: 'Detect redirect, clear session, show login UI',
          },
          {
            label: 'Status 500, Content-Type: text/html',
            left: 'HTML stack trace',
            right: 'Throw "server error", log raw body for debugging',
          },
          {
            label: 'Status 200, Content-Type: text/html',
            left: 'HTML (misconfigured API)',
            right: 'Check Content-Type before calling .json()',
          },
          {
            label: 'Status 200, Content-Type: application/json',
            left: 'Valid JSON',
            right: 'Safe to call .json() — happy path',
          },
        ]}
      />

      <SectionHeader number={9} title="Complete Safe-Fetch Utility (Production-Ready)" />

      <CodeBlock language="ts" filename="safe-fetch.ts">
{`/**
 * Production-safe fetch wrapper.
 * - Checks Content-Type before parsing JSON
 * - Handles non-2xx status codes
 * - Returns typed data or throws with a clear message
 */
export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (networkErr) {
    throw new Error(\`Network error fetching \${url}: \${(networkErr as Error).message}\`);
  }

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    if (isJson) {
      const err = await res.json() as { message?: string; error?: string };
      throw new Error(err.message ?? err.error ?? \`HTTP \${res.status}\`);
    }
    const html = await res.text();
    throw new Error(
      \`Server returned HTTP \${res.status} with HTML body. \` +
      \`Endpoint: \${url}. Preview: \${html.slice(0, 120)}\`
    );
  }

  if (!isJson) {
    const body = await res.text();
    throw new Error(
      \`Expected application/json but got "\${contentType}" from \${url}. \` +
      \`Body preview: \${body.slice(0, 120)}\`
    );
  }

  try {
    return await res.json() as T;
  } catch {
    throw new Error(\`Failed to parse JSON response from \${url}\`);
  }
}

// Usage
const user = await safeFetch<User>('/api/users/42');`}
      </CodeBlock>

      <SectionHeader number={10} title="CORS-Specific Fixes" />

      <AlertBox type="warning" title="CORS errors can also cause HTML responses">
        When a CORS preflight fails, some browsers return an opaque empty response that your code treats as
        HTML. The fix is on the server — you must send the correct <code>Access-Control-Allow-Origin</code> header.
      </AlertBox>

      <CodeBlock language="js" filename="cors-fix.js">
{`// Express — allow your frontend origin
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));`}
      </CodeBlock>

      <FlowDiagram steps={[
        { label: 'Browser sends OPTIONS preflight', color: 'blue' },
        { label: 'Server returns CORS headers', color: 'green' },
        { label: 'Browser sends actual request', color: 'blue' },
        { label: 'Server returns JSON', color: 'green' },
        { label: 'response.json() succeeds', color: 'green' },
      ]} />

      <SectionHeader number={11} title="Error Flow Diagram" />

      <ArchDiagram
        boxes={[
          { label: 'Wrong URL / Server Error / CORS', color: 'red' },
          { label: 'Server sends HTML error page', color: 'amber' },
          { label: 'Content-Type: text/html', color: 'amber' },
          { label: 'response.json() → SyntaxError', color: 'red' },
          { label: 'Fix: check Content-Type + status', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→']}
      />

      <SectionHeader number={12} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What exactly causes "Unexpected token < in JSON at position 0"?',
          answer: 'JSON.parse() or response.json() received a string that starts with "<" — the opening character of an HTML tag. JSON syntax does not allow "<", so the parser fails immediately at position 0. The underlying cause is always that your server sent an HTML page (error page, login redirect, CDN error) instead of a JSON payload.',
        },
        {
          question: 'How do I quickly tell whether my API is returning HTML or JSON?',
          answer: 'Open the browser DevTools Network tab, click the failing request, and check two things: (1) the Status code — anything other than 2xx means an error, and (2) the Response Headers → Content-Type. If it says text/html, the server returned HTML. You can also look at the Response body preview to see the raw HTML.',
        },
        {
          question: 'Can this error happen even when the status code is 200?',
          answer: 'Yes. A server can return HTTP 200 with a text/html body — for example, an SPA that serves index.html for every route, or a misconfigured API that always returns 200 but with HTML on errors. Always check Content-Type in addition to status code.',
        },
        {
          question: 'How do I handle this error in production without crashing the app?',
          answer: 'Wrap every fetch call in a try-catch. Inside the catch, distinguish between a SyntaxError (HTML/invalid JSON received) and a network error. Show the user a friendly message and log the raw response text for debugging. Never let a JSON parse error bubble up unhandled to the UI.',
        },
        {
          question: 'Does axios handle this automatically?',
          answer: 'No. Axios parses the response body based on the Content-Type, but if you call axios.get() on an endpoint that returns HTML with status 200, Axios will return the HTML string and not throw. You still need to check the response content-type or add an interceptor as shown in Fix 3 above.',
        },
        {
          question: 'What is the fix if I cannot change the server?',
          answer: 'Use the "Fix 2" pattern: call response.text() first, check if the result starts with "<", and throw a descriptive error. This way your client code handles the mismatch gracefully without needing any server changes.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
