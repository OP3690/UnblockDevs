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

export default function HowToDebugApiRequestErrorsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Debug API Request Errors — Common Dev Errors Explained</h1>
      <p className="lead">
        Every developer hits the same handful of errors over and over again: CORS blocks the browser, <code>process.env</code> is undefined despite being set, a recursive function suddenly crashes the tab, and Python dicts throw <code>KeyError</code> on keys that seem to be right there. This guide covers how to debug API request errors and the most common dev mistakes — with exact fixes for each one.
      </p>

      <StatGrid stats={[
        { value: 'CORS', label: '#1 beginner API error in browsers', color: 'red' },
        { value: 'process.env', label: 'Top Node.js gotcha for new projects', color: 'orange' },
        { value: '5 min', label: 'Average fix time with the right approach', color: 'green' },
      ]} />

      <SectionHeader number={1} title="How to Fix CORS Error: No Access-Control-Allow-Origin" />
      <p>
        CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks JavaScript from reading responses from a different origin than the current page. When you call an API from your frontend and see this error:
      </p>

      <AlertBox type="error" title="Access to fetch blocked by CORS policy">
        {`Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`}
      </AlertBox>

      <p>
        The fix is always server-side — you cannot fix CORS in your frontend JavaScript. The server needs to send the right response headers. Here is the most common case and how to fix it:
      </p>

      <ErrorFix
        title="Missing CORS headers on the server"
        bad={`// Express.js — no CORS headers (requests from browser will be blocked)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello' });
});`}
        good={`// Express.js — correct CORS setup with cors middleware
const cors = require('cors');

app.use(cors({
  origin: 'https://yourfrontend.com', // or '*' for public APIs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello' });
});`}
        badLabel="No CORS headers — browser blocks the response"
        goodLabel="Proper CORS middleware — browser can read the response"
      />

      <p>
        Key things to know about CORS errors:
      </p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>CORS errors only happen in browsers. The same request from cURL, Postman, or your backend code will succeed — it is purely a browser enforcement mechanism.</li>
        <li>The preflight request (OPTIONS) must also return the correct headers, not just the actual GET/POST.</li>
        <li>Credentials (cookies, Authorization header) require <code>Access-Control-Allow-Credentials: true</code> and the <code>origin</code> cannot be <code>*</code>.</li>
        <li>If you do not control the server, use a backend proxy to forward the request from your own origin.</li>
      </ul>

      <AlertBox type="tip" title="Test CORS headers without guessing">
        Use the CORS Tester at <a href="https://unblockdevs.com/cors-tester" className="text-blue-600 underline font-medium">unblockdevs.com/cors-tester</a> to simulate the exact browser preflight and see which CORS headers are present, missing, or incorrectly configured — before you dig into server code.
      </AlertBox>

      <SectionHeader number={2} title="Why Is process.env Undefined in Node.js?" />
      <p>
        <code>process.env.MY_VARIABLE</code> returning <code>undefined</code> in Node.js is one of the most common gotchas for developers new to environment variables. There are four distinct causes, each with a different fix:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Forgot to call dotenv',
          description: 'The dotenv package reads your .env file into process.env, but only after you call require("dotenv").config() or import "dotenv/config". If you never call it, the file is never read.',
        },
        {
          title: 'Wrong .env file name or location',
          description: 'dotenv looks for .env in the current working directory by default — which is the directory you run node from, not the file location. Common mistake: running node from a parent directory.',
        },
        {
          title: 'Variable not exported in shell',
          description: 'If you set a variable in your shell with VAR=value (no export), child processes like Node.js will not inherit it. Use export VAR=value or add it to your shell profile.',
        },
        {
          title: 'Next.js server/client mismatch',
          description: 'In Next.js, environment variables are only available in server-side code unless they are prefixed with NEXT_PUBLIC_. Accessing a non-prefixed variable in a Client Component always returns undefined.',
        },
      ]} />

      <CodeBlock lang="javascript" title="Correct dotenv setup in Node.js">
{`// At the very top of your entry file (index.js or server.js)
// Option 1: require style
require('dotenv').config();

// Option 2: ESM import style (Node 16+)
// import 'dotenv/config';

// Now process.env is populated from your .env file
console.log(process.env.DATABASE_URL); // works

// Common mistake: calling config() too late
// All imports run before your code — so if another module reads
// process.env at import time, dotenv must be configured first.`}
      </CodeBlock>

      <ErrorFix
        title="Next.js: missing NEXT_PUBLIC_ prefix for client-side env vars"
        bad={`// .env.local
API_URL=https://api.example.com

// components/MyComponent.tsx (Client Component)
const url = process.env.API_URL; // undefined in browser`}
        good={`// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

// components/MyComponent.tsx (Client Component)
const url = process.env.NEXT_PUBLIC_API_URL; // works in browser

// Note: non-prefixed vars like DB_URL are still available
// in server components, API routes, and getServerSideProps`}
        badLabel="Missing NEXT_PUBLIC_ prefix — undefined in Client Components"
        goodLabel="NEXT_PUBLIC_ prefix — available in both server and client"
      />

      <SectionHeader number={3} title="How to Fix 'Maximum Call Stack Size Exceeded'" />
      <p>
        A <code>RangeError: Maximum call stack size exceeded</code> (or stack overflow) means a function is calling itself recursively without ever reaching a base case that stops the recursion. Each function call adds a frame to the call stack; when the stack fills up, JavaScript throws this error.
      </p>

      <QuickFact color="orange" label="Root cause">
        This error is almost always caused by a function calling itself — either directly or indirectly through a chain of calls — without a proper base case that terminates the recursion.
      </QuickFact>

      <CodeBlock lang="javascript" title="Recursive function: broken vs. fixed">
{`// BROKEN: no base case — infinite recursion
function factorial(n) {
  return n * factorial(n - 1); // never stops!
}
factorial(5); // RangeError: Maximum call stack size exceeded

// FIXED: base case stops the recursion
function factorial(n) {
  if (n <= 1) return 1;       // base case
  return n * factorial(n - 1); // recursive case
}
factorial(5); // 120

// ALSO BROKEN: accidentally calling the function with wrong args
function processItems(items) {
  if (items.length === 0) return;
  processItems(items); // bug: should be items.slice(1), not items
}

// FIXED:
function processItems(items) {
  if (items.length === 0) return;
  processItems(items.slice(1)); // pass a smaller array each time
}`}
      </CodeBlock>

      <p>
        For very deep recursion (e.g. traversing a large tree), even a correct recursive implementation may hit the stack limit. In those cases, convert the recursion to an iterative approach using an explicit stack (an array) instead of the call stack:
      </p>

      <CodeBlock lang="javascript" title="Converting deep recursion to iteration">
{`// Recursive tree traversal (may stack overflow on deep trees)
function sumTree(node) {
  if (!node) return 0;
  return node.value + sumTree(node.left) + sumTree(node.right);
}

// Iterative version using an explicit stack array
function sumTreeIterative(root) {
  if (!root) return 0;
  const stack = [root];
  let total = 0;
  while (stack.length > 0) {
    const node = stack.pop();
    total += node.value;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return total;
}`}
      </CodeBlock>

      <SectionHeader number={4} title="How to Test API Requests Without Postman" />
      <p>
        Postman is a great tool but it requires an install, an account, and it can be overkill for quick one-off API tests. Here are the best alternatives for testing API requests without Postman:
      </p>

      <AlertBox type="tip" title="Test API requests directly in the browser">
        Use the CORS Tester at <a href="https://unblockdevs.com/cors-tester" className="text-blue-600 underline font-medium">unblockdevs.com/cors-tester</a> to make real HTTP requests from your browser and inspect the full response including headers. Perfect for debugging API endpoints without any install.
      </AlertBox>

      <VerticalSteps steps={[
        {
          title: 'Copy or write your API call',
          desc: 'Start with the API endpoint URL, method (GET/POST/etc.), any required headers like Authorization or Content-Type, and the request body if needed.',
          code: `curl 'https://api.example.com/users' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json'`,
        },
        {
          title: 'Test with CORS Tester',
          desc: 'Go to unblockdevs.com/cors-tester, enter the URL and headers, and fire the request. See the full response body, status code, and all response headers — including any missing CORS headers.',
        },
        {
          title: 'Check response headers',
          desc: 'Look at the response headers in the output. Missing Content-Type, wrong status codes, or absent CORS headers become immediately obvious. This tells you whether the problem is in your request or the server response.',
        },
        {
          title: 'Convert to code',
          desc: 'Once you have a working cURL command, paste it into unblockdevs.com/curl-converter to get the equivalent Python requests, JavaScript fetch, or Axios code for your project.',
        },
      ]} />

      <SectionHeader number={5} title="How to Handle KeyError in Python Dictionary" />
      <p>
        A <code>KeyError</code> in Python means you tried to access a dictionary key that does not exist. This is one of the most common Python errors when working with API responses — the JSON structure you expected is slightly different from what the API actually returned.
      </p>

      <ErrorFix
        title="Direct dictionary access vs. safe access"
        bad={`# API response
data = {"user": {"name": "Alice", "email": "alice@example.com"}}

# Unsafe access — KeyError if 'phone' does not exist
phone = data["user"]["phone"]  # KeyError: 'phone'

# Also unsafe — if the API skips 'user' entirely
name = data["user"]["name"]  # KeyError: 'user'`}
        good={`# Safe access with .get() — returns None if key missing
phone = data.get("user", {}).get("phone")  # None, not KeyError

# With a default value
phone = data.get("user", {}).get("phone", "N/A")  # "N/A"

# Explicit check before access
if "user" in data and "phone" in data["user"]:
    phone = data["user"]["phone"]`}
        badLabel="Direct dict access — crashes if key is missing"
        goodLabel="Safe .get() access — returns None or default value"
      />

      <CodeBlock lang="python" title="Three safe patterns for dict access in Python">
{`import json
from collections import defaultdict

raw = '{"status": "ok", "data": {"id": 42}}'
response = json.loads(raw)

# Pattern 1: .get() with optional default
user_id = response.get("data", {}).get("id", 0)
print(user_id)  # 42

username = response.get("data", {}).get("username", "anonymous")
print(username)  # "anonymous" — key missing, no crash

# Pattern 2: try/except for complex access patterns
try:
    nested_value = response["data"]["profile"]["avatar"]["url"]
except KeyError as e:
    print(f"Missing key: {e}")
    nested_value = None

# Pattern 3: defaultdict for building up results
from collections import defaultdict
counts = defaultdict(int)
for item in ["a", "b", "a", "c", "a"]:
    counts[item] += 1  # no KeyError even on first access
print(dict(counts))  # {'a': 3, 'b': 1, 'c': 1}`}
      </CodeBlock>

      <AlertBox type="info" title="Debugging API response structure">
        When an API returns unexpected keys or structure, print the raw response first: <code>print(json.dumps(response, indent=2))</code>. This shows you exactly what the API returned — which is often subtly different from the documentation.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why is my API request failing only in the browser but not in Postman or cURL?',
          answer: 'This is almost always a CORS error. Postman and cURL do not enforce CORS — they send requests directly without the browser origin check. The browser blocks the response if the server does not include the correct Access-Control-Allow-Origin header. Use the CORS Tester at unblockdevs.com/cors-tester to confirm which headers are missing.',
        },
        {
          question: 'How do I fix process.env being undefined even after setting the variable?',
          answer: 'Check four things: (1) Did you call require("dotenv").config() or import "dotenv/config" before accessing process.env? (2) Is your .env file in the same directory you run node from? (3) In Next.js, does your variable have the NEXT_PUBLIC_ prefix if you need it in a Client Component? (4) Did you restart the dev server after changing .env? Environment variables are read at startup, not on hot reload.',
        },
        {
          question: 'How do I test API requests without installing Postman?',
          answer: 'Use curl from your terminal — it is installed by default on Mac and Linux and available on Windows via WSL or Git Bash. For a browser-based option, the CORS Tester at unblockdevs.com/cors-tester lets you make real HTTP requests and inspect response headers without any install. For converting existing browser requests, copy as cURL from Chrome DevTools and convert at unblockdevs.com/curl-converter.',
        },
        {
          question: 'What causes the Maximum Call Stack Size Exceeded error in JavaScript?',
          answer: 'It is caused by infinite or unbounded recursion — a function calling itself without reaching a stopping condition. Check your recursive functions for a missing or incorrect base case. Common hidden causes: event handlers that trigger their own events, React state updates inside useEffect without a dependency array (which causes infinite re-renders), and mutually recursive functions where A calls B and B calls A.',
        },
        {
          question: 'How do I debug a Python KeyError from a JSON API response?',
          answer: 'Print the raw parsed response first: print(json.dumps(response, indent=2)). API responses often have a different structure than the docs show — extra nesting, missing fields on errors, or camelCase vs. snake_case keys. Once you see the actual structure, switch to .get() with defaults for safe access, or use try/except for deep nested access.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
