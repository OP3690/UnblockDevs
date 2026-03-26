'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToConvertCurlToFetchAxiosAutomaticallyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert cURL to Fetch or Axios Automatically (2026)</h1>
      <p className="lead">
        You have a cURL command from an API's documentation or Chrome DevTools, and you need it as JavaScript. This guide covers every automatic and manual conversion path — from online tools to hand-rolling your own conversions for fetch and Axios — with side-by-side examples for every pattern.
      </p>

      <StatGrid stats={[
        { value: '3 min', label: 'average time to manually convert', color: 'green' },
        { value: '< 30s', label: 'with an automatic converter', color: 'blue' },
        { value: 'fetch vs Axios', label: '2 main JS HTTP libraries', color: 'purple' },
        { value: '100%', label: 'of cURL flags have equivalents', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Convert cURL at All?" />

      <p>
        cURL is the universal language of HTTP. API vendors write their docs in cURL because it works everywhere. Chrome DevTools lets you copy any network request as cURL. When you need that request inside a JavaScript app, you must translate it — and doing that by hand for complex requests with many headers and auth tokens is error-prone.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'API documentation', description: 'Nearly every API provider (Stripe, Twilio, GitHub, AWS) shows request examples as cURL commands you need to translate.' },
        { title: 'Chrome DevTools', description: 'Right-clicking any network request gives "Copy as cURL" — an instant snapshot of the exact request including cookies and headers.' },
        { title: 'Postman / Insomnia', description: 'Both tools let you import cURL commands and export them as JavaScript. The reverse is also common.' },
        { title: 'Team communication', description: 'cURL is the easiest way to share a reproducible HTTP request with a colleague regardless of their tech stack.' },
      ]} />

      <SectionHeader number={2} title="Automatic Conversion Tools" />

      <p>
        The fastest path is to use an automatic converter. Here are the best options:
      </p>

      <VerticalSteps steps={[
        {
          title: 'curlconverter.com',
          description: 'The most popular online tool. Paste any cURL command and it outputs fetch, Axios, Python requests, and 20+ other languages. Open source.',
        },
        {
          title: 'UnblockDevs cURL Converter Tool',
          description: 'Available at /curl-converter on this site. Converts to fetch and Axios with formatted, production-ready output including async/await patterns.',
        },
        {
          title: 'Postman Import',
          description: 'In Postman, File > Import > Raw text > paste cURL. Postman parses it into a full request with headers, body, and auth. Then use "Code" panel to export as JavaScript.',
        },
        {
          title: 'VS Code Extensions',
          description: 'Extensions like "REST Client" and "Thunder Client" accept cURL syntax directly in .http files and can convert to JavaScript.',
        },
      ]} />

      <AlertBox type="tip" title="Best automatic workflow">
        Chrome DevTools (F12) → Network tab → right-click any request → "Copy as cURL (bash)" → paste into curlconverter.com → select fetch or Axios → copy to your code.
      </AlertBox>

      <SectionHeader number={3} title="Manual Conversion: cURL to Fetch" />

      <p>
        Understanding the manual mapping helps you debug issues with automatic converters and handle edge cases. Here is the complete flag-to-option mapping:
      </p>

      <CompareTable
        leftLabel="cURL"
        rightLabel="fetch()"
        rows={[
          { label: 'URL', left: 'curl https://api.example.com', right: "fetch('https://api.example.com')" },
          { label: 'POST method', left: '-X POST', right: "method: 'POST'" },
          { label: 'Header', left: "-H 'Content-Type: application/json'", right: "headers: { 'Content-Type': 'application/json' }" },
          { label: 'JSON body', left: "-d '{\"key\":\"val\"}'", right: "body: JSON.stringify({ key: 'val' })" },
          { label: 'Form body', left: "-d 'key=val'", right: "body: new URLSearchParams({ key: 'val' })" },
          { label: 'Basic auth', left: '-u user:pass', right: "headers: { Authorization: 'Basic ' + btoa('user:pass') }" },
          { label: 'Bearer token', left: "-H 'Authorization: Bearer TOKEN'", right: "headers: { Authorization: 'Bearer TOKEN' }" },
          { label: 'Cookies', left: '--cookie "sid=abc"', right: "credentials: 'include'" },
          { label: 'Follow redirects', left: '-L', right: "redirect: 'follow' (default)" },
        ]}
      />

      <CodeBlock language="js" filename="curl-to-fetch.js">
{`// Original cURL:
// curl -X POST https://api.example.com/login \\
//   -H "Content-Type: application/json" \\
//   -H "Accept: application/json" \\
//   -d '{"username":"alice","password":"secret"}'

// Converted to fetch (async/await):
async function login(username, password) {
  const response = await fetch('https://api.example.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(\`Login failed: \${response.status}\`);
  }

  return response.json();
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Manual Conversion: cURL to Axios" />

      <p>
        Axios has a slightly different API than fetch. The key differences are that Axios automatically serializes JSON bodies, automatically parses JSON responses, and throws errors for non-2xx status codes.
      </p>

      <CompareTable
        leftLabel="cURL"
        rightLabel="Axios"
        rows={[
          { label: 'URL', left: 'curl https://api.example.com', right: "axios.get('https://api.example.com')" },
          { label: 'POST method', left: '-X POST', right: "method: 'post'" },
          { label: 'Header', left: "-H 'Authorization: Bearer TOKEN'", right: "headers: { Authorization: 'Bearer TOKEN' }" },
          { label: 'JSON body', left: "-d '{\"key\":\"val\"}'", right: 'data: { key: "val" } // no stringify needed' },
          { label: 'Form body', left: "-d 'key=val'", right: "data: new URLSearchParams({ key: 'val' })" },
          { label: 'Basic auth', left: '-u user:pass', right: "auth: { username: 'user', password: 'pass' }" },
          { label: 'Timeout', left: '--max-time 10', right: 'timeout: 10000 // milliseconds' },
          { label: 'Query params', left: 'curl url?key=val', right: "params: { key: 'val' }" },
        ]}
      />

      <CodeBlock language="js" filename="curl-to-axios.js">
{`import axios from 'axios';

// Original cURL:
// curl -X POST https://api.example.com/users \\
//   -H "Authorization: Bearer TOKEN" \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Alice","role":"admin"}'

// Converted to Axios:
async function createUser(token, userData) {
  // Axios auto-serializes data to JSON and sets Content-Type
  const response = await axios.post('https://api.example.com/users', userData, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
    },
  });

  // Axios auto-parses JSON and puts it in response.data
  return response.data;
}

// Axios also throws automatically on 4xx/5xx:
try {
  const user = await createUser('mytoken', { name: 'Alice', role: 'admin' });
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message);
  }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Fetch vs Axios: Which Should You Use?" />

      <CompareTable
        leftLabel="fetch (built-in)"
        rightLabel="axios (library)"
        rows={[
          { label: 'Installation', left: 'Built-in, no install needed', right: 'npm install axios' },
          { label: 'JSON body', left: 'Must use JSON.stringify()', right: 'Automatic (just pass object)' },
          { label: 'JSON response', left: 'Must call response.json()', right: 'Automatic (in response.data)' },
          { label: 'Error on 4xx/5xx', left: 'No — must check response.ok', right: 'Yes — throws automatically' },
          { label: 'Request timeout', left: 'Requires AbortController', right: 'Built-in timeout option' },
          { label: 'Request interceptors', left: 'Not built-in', right: 'Built-in interceptors' },
          { label: 'Cancel requests', left: 'AbortController', right: 'CancelToken or AbortController' },
          { label: 'Upload progress', left: 'Not available', right: 'onUploadProgress callback' },
          { label: 'Bundle size', left: '0 KB (browser native)', right: '~13 KB minified+gzipped' },
        ]}
      />

      <QuickFact>
        For new projects targeting modern browsers or Node.js 18+, the built-in fetch API is usually sufficient. Choose Axios when you need interceptors, upload progress, automatic error throwing, or need to support older environments.
      </QuickFact>

      <SectionHeader number={6} title="Handling Complex cURL Commands" />

      <p>
        Some cURL commands have tricky patterns. Here are the most common edge cases and how to handle them:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Multi-line cURL with backslash continuation',
          description: 'cURL commands are often split across lines with trailing backslashes for readability. Join them into a single logical command before converting.',
          code: `// Multi-line cURL (backslashes are line continuations):
// curl -X POST \\
//   -H "Content-Type: application/json" \\
//   -d '{"key":"val"}' \\
//   https://api.example.com/endpoint

// All flags apply to the same request — treat as:
// curl -X POST -H "Content-Type: application/json" -d '{"key":"val"}' https://api.example.com/endpoint`,
        },
        {
          title: '--data-raw vs -d',
          description: '--data-raw is like -d but does not process @ file references. Both convert the same way to the body option.',
          code: `// cURL: curl --data-raw '{"token":"abc@example.com"}' https://api.example.com
// The @ is treated as literal text with --data-raw

const response = await fetch('https://api.example.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{"token":"abc@example.com"}', // or JSON.stringify
});`,
        },
        {
          title: 'URL-encoded vs JSON body',
          description: 'Check the Content-Type header to determine how to encode the body. application/json uses JSON.stringify, application/x-www-form-urlencoded uses URLSearchParams.',
          code: `// application/x-www-form-urlencoded (HTML forms)
const form = new URLSearchParams();
form.append('grant_type', 'client_credentials');
form.append('client_id', 'myapp');

const response = await fetch('https://auth.example.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: form.toString(),
});`,
        },
        {
          title: 'cURL with cookies (--cookie or -b)',
          description: 'Browser cookies are managed by the browser itself. Use credentials: "include" to send stored cookies, or set Cookie header explicitly if you have the value.',
          code: `// cURL: curl --cookie "session=abc123; csrf=xyz" https://api.example.com/data

// Option 1: Let browser handle cookies automatically
const response = await fetch('https://api.example.com/data', {
  credentials: 'include',
});

// Option 2: Set explicitly (server-side Node.js only, not browsers)
const response2 = await fetch('https://api.example.com/data', {
  headers: { 'Cookie': 'session=abc123; csrf=xyz' },
});`,
        },
      ]} />

      <SectionHeader number={7} title="Converting to Axios with Base Instance" />

      <p>
        If you are converting multiple cURL commands that share the same base URL and auth, use an Axios instance to avoid repetition:
      </p>

      <CodeBlock language="js" filename="axios-instance.js">
{`import axios from 'axios';

// Create a reusable instance with shared config
const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Authorization': \`Bearer \${process.env.API_TOKEN}\`,
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for dynamic tokens
api.interceptors.request.use((config) => {
  // Refresh token logic here if needed
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle auth failure
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Now all requests share base URL and headers:
// cURL: curl https://api.example.com/v1/users
const users = await api.get('/users');

// cURL: curl -X POST https://api.example.com/v1/users -d '{"name":"Alice"}'
const newUser = await api.post('/users', { name: 'Alice' });`}
      </CodeBlock>

      <SectionHeader number={8} title="Error Handling After Conversion" />

      <p>
        One of the biggest differences between cURL and JavaScript is error handling. cURL exits with a non-zero code. JavaScript requires explicit handling.
      </p>

      <ErrorFix
        bad={`// Naive conversion - no error handling
const response = await fetch('https://api.example.com/data');
const data = await response.json(); // Crashes if HTML error page returned
console.log(data);`}
        good={`// Production-ready fetch with proper error handling
async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = \`HTTP \${response.status}: \${response.statusText}\`;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorBody.error || errorMessage;
    } catch {
      // Response wasn't JSON, use status text
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text();
}`}
        badLabel="No error handling"
        goodLabel="Production-ready wrapper"
      />

      <FAQAccordion items={[
        {
          question: 'How do I convert cURL to Axios automatically?',
          answer: 'Use curlconverter.com or the UnblockDevs cURL Converter tool. Paste your cURL command, select "Axios" as the target, and copy the output. For manual conversion: -X maps to method, -H flags map to headers object, -d maps to data (no JSON.stringify needed for Axios), and -u maps to the auth: { username, password } option.',
        },
        {
          question: 'Why does my converted fetch code get a CORS error but cURL works?',
          answer: 'cURL bypasses browser CORS restrictions. When you convert to fetch and run in a browser, CORS applies. The server must send Access-Control-Allow-Origin headers. The fix is either to configure server CORS headers, or proxy the request through your own backend.',
        },
        {
          question: 'Does Axios require JSON.stringify for the request body?',
          answer: 'No. Axios automatically serializes plain objects to JSON and sets the Content-Type to application/json. With fetch, you must manually call JSON.stringify(). This is one of Axios\'s key ergonomic advantages.',
        },
        {
          question: 'How do I convert cURL basic auth (-u) to Axios?',
          answer: 'Axios has a dedicated auth option: axios.get(url, { auth: { username: "user", password: "pass" } }). This automatically encodes the credentials as Base64 and adds the Authorization: Basic header. You can also add it manually to the headers.',
        },
        {
          question: 'What is the best tool to automatically convert cURL to JavaScript?',
          answer: 'curlconverter.com supports the widest range of languages and frameworks. For fetch and Axios specifically, the UnblockDevs curl-converter tool on this site produces clean async/await code. Postman is the best choice if you need to also test the request interactively.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
