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

export default function CurlToJavascriptFetchAxiosClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert cURL to JavaScript fetch, Axios & Node.js — Complete Guide</h1>
      <p className="lead">
        API docs, Chrome DevTools, and Postman all export requests as cURL — but your frontend
        or Node.js backend needs JavaScript. This guide covers how to convert every cURL pattern
        to <code>fetch()</code>, Axios, and Node.js <code>https</code> module: GET, POST with
        JSON, auth headers, form data, file uploads, and error handling. Plus the free online
        converter that does it instantly.
      </p>

      <StatGrid stats={[
        { value: 'fetch()', label: 'Built into every modern browser and Node.js 18+', color: 'blue' },
        { value: 'axios', label: 'Most popular JS HTTP library — 50M+ npm downloads/week', color: 'green' },
        { value: '1 paste', label: 'Convert any cURL to JS with the online converter', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="fetch() vs Axios — Which to Use When?" />
      <p>
        Before converting cURL to JavaScript, choose which library fits your context. Both can
        do everything cURL does — the differences are mostly ergonomic.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Use fetch() when…',
          description:
            'You are in a browser or Node.js 18+ without adding dependencies. fetch() is built-in, needs no install, and works for basic GET/POST with JSON. The API is slightly verbose for error handling but fine for simple cases.',
        },
        {
          title: 'Use Axios when…',
          description:
            'You want automatic JSON parsing, request/response interceptors, cleaner error handling, timeout support, upload progress, or need to support older Node.js versions. npm install axios once, then use everywhere.',
        },
        {
          title: 'Use node-fetch when…',
          description:
            'You need fetch-like API on Node.js 14/16 without the full Axios feature set. npm install node-fetch provides a spec-compliant fetch for older Node versions.',
        },
        {
          title: 'Use the https module when…',
          description:
            'You need zero dependencies in a Node.js service and can handle the more verbose stream-based API. Good for serverless functions where bundle size matters.',
        },
      ]} />

      <SectionHeader number={2} title="Convert cURL GET to JavaScript fetch()" />
      <p>
        The simplest case — a GET request with headers. The URL is the first argument to{' '}
        <code>fetch()</code>, and headers go in the options object.
      </p>

      <CodeBlock lang="bash" title="cURL GET with headers">
{`curl 'https://api.example.com/users' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="JavaScript fetch() equivalent">
{`const response = await fetch('https://api.example.com/users', {
  method: 'GET',    // optional for GET — it's the default
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9...',
  },
});

if (!response.ok) {
  throw new Error(\`HTTP error: \${response.status}\`);
}

const data = await response.json();
console.log(data);`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Axios GET equivalent">
{`import axios from 'axios';   // or: const axios = require('axios');

const { data } = await axios.get('https://api.example.com/users', {
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9...',
  },
});

console.log(data);  // already parsed JSON — no .json() call needed`}
      </CodeBlock>

      <AlertBox type="info" title="Axios auto-parses JSON; fetch() does not">
        With <code>fetch()</code>, you must call <code>await response.json()</code> to parse
        the body. Axios parses JSON automatically — the response body is in{' '}
        <code>response.data</code> without any extra step. Axios also throws an error for
        non-2xx status codes; <code>fetch()</code> only rejects on network errors.
      </AlertBox>

      <SectionHeader number={3} title="Convert cURL POST with JSON to JavaScript" />
      <p>
        POST requests with JSON bodies are the most common API call. The cURL{' '}
        <code>-d</code> flag becomes the <code>body</code> in fetch() or the second argument
        in Axios.
      </p>

      <CodeBlock lang="bash" title="cURL POST with JSON body">
{`curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"name": "Alice", "email": "alice@example.com", "role": "admin"}'`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="fetch() POST with JSON">
{`const payload = {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
};

const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN',
  },
  body: JSON.stringify(payload),   // fetch needs manual JSON.stringify
});

if (!response.ok) {
  const error = await response.text();
  throw new Error(\`POST failed: \${response.status} — \${error}\`);
}

const newUser = await response.json();
console.log('Created:', newUser.id);`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Axios POST with JSON">
{`const { data: newUser } = await axios.post(
  'https://api.example.com/users',
  {                            // Axios auto-serializes the object to JSON
    name: 'Alice',
    email: 'alice@example.com',
    role: 'admin',
  },
  {
    headers: { 'Authorization': 'Bearer TOKEN' },
    // Content-Type: application/json is set automatically
  }
);

console.log('Created:', newUser.id);`}
      </CodeBlock>

      <ErrorFix
        title="Common mistake: forgetting JSON.stringify with fetch()"
        bad={`// Wrong: fetch does NOT auto-serialize objects
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { name: 'Alice' },  // ← sends "[object Object]" as the body!
});`}
        good={`// Correct: always JSON.stringify the body for fetch()
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),  // ← correct JSON string
});`}
        badLabel="Silent bug — sends [object Object]"
        goodLabel="Correct — serializes to valid JSON"
      />

      <SectionHeader number={4} title="Convert cURL Authorization Headers to JavaScript" />
      <p>
        The <code>-H 'Authorization: Bearer TOKEN'</code> flag maps directly to the headers
        object. For Basic auth (<code>-u user:pass</code>), you need to base64-encode the
        credentials.
      </p>

      <CodeBlock lang="bash" title="cURL auth patterns">
{`# Bearer token
curl 'https://api.example.com/data' -H 'Authorization: Bearer TOKEN'

# Basic auth shorthand
curl 'https://api.example.com/data' -u 'username:password'

# API key in header
curl 'https://api.example.com/data' -H 'X-API-Key: my-secret-key'`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="JavaScript fetch() auth equivalents">
{`// Bearer token
const response = await fetch(url, {
  headers: { 'Authorization': 'Bearer TOKEN' },
});

// Basic auth (curl -u username:password)
const credentials = btoa('username:password');  // base64 encode
const response = await fetch(url, {
  headers: { 'Authorization': \`Basic \${credentials}\` },
});

// API key in header
const response = await fetch(url, {
  headers: { 'X-API-Key': 'my-secret-key' },
});`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Axios auth patterns">
{`// Bearer token
const { data } = await axios.get(url, {
  headers: { 'Authorization': 'Bearer TOKEN' },
});

// Basic auth — Axios has a built-in auth option
const { data } = await axios.get(url, {
  auth: { username: 'username', password: 'password' },
  // Axios auto-generates the Authorization: Basic header
});

// API key in header
const { data } = await axios.get(url, {
  headers: { 'X-API-Key': 'my-secret-key' },
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Convert cURL Form Data and File Uploads to JavaScript" />
      <p>
        When cURL uses <code>-F</code> (multipart form data) or{' '}
        <code>--data-urlencode</code>, the JavaScript equivalent uses the{' '}
        <code>FormData</code> API in browsers or the <code>form-data</code> package in Node.js.
      </p>

      <CodeBlock lang="bash" title="cURL form data and file upload">
{`# URL-encoded form data
curl -X POST 'https://api.example.com/login' \
  --data-urlencode 'username=alice' \
  --data-urlencode 'password=s3cr3t'

# Multipart file upload
curl -X POST 'https://api.example.com/upload' \
  -H 'Authorization: Bearer TOKEN' \
  -F 'file=@/path/to/report.pdf' \
  -F 'description=Q4 Report'`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="fetch() — form data in browser">
{`// URL-encoded form data (browser)
const formData = new URLSearchParams();
formData.append('username', 'alice');
formData.append('password', 's3cr3t');

const response = await fetch('https://api.example.com/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formData.toString(),
});

// Multipart file upload (browser — uses a file input)
const fileInput = document.querySelector('#file-input');
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('description', 'Q4 Report');

// Do NOT set Content-Type — browser sets it with the correct boundary
const response = await fetch('https://api.example.com/upload', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer TOKEN' },
  body: formData,
});`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Axios — file upload in Node.js">
{`import axios from 'axios';
import FormData from 'form-data';  // npm install form-data
import fs from 'fs';

const form = new FormData();
form.append('file', fs.createReadStream('/path/to/report.pdf'));
form.append('description', 'Q4 Report');

const { data } = await axios.post('https://api.example.com/upload', form, {
  headers: {
    ...form.getHeaders(),           // includes Content-Type with boundary
    'Authorization': 'Bearer TOKEN',
  },
  onUploadProgress: (event) => {
    console.log(\`Upload: \${Math.round(event.loaded / event.total * 100)}%\`);
  },
});`}
      </CodeBlock>

      <SectionHeader number={6} title="Convert cURL PUT, PATCH, DELETE to JavaScript" />

      <CodeBlock lang="bash" title="cURL PUT, PATCH, DELETE">
{`# PUT — full update
curl -X PUT 'https://api.example.com/users/42' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"name": "Alice Smith", "email": "alice@new.com"}'

# PATCH — partial update
curl -X PATCH 'https://api.example.com/users/42' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"email": "alice@new.com"}'

# DELETE
curl -X DELETE 'https://api.example.com/users/42' \
  -H 'Authorization: Bearer TOKEN'`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="fetch() PUT, PATCH, DELETE">
{`const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer TOKEN',
};
const url = 'https://api.example.com/users/42';

// PUT
const put = await fetch(url, {
  method: 'PUT',
  headers,
  body: JSON.stringify({ name: 'Alice Smith', email: 'alice@new.com' }),
});

// PATCH
const patch = await fetch(url, {
  method: 'PATCH',
  headers,
  body: JSON.stringify({ email: 'alice@new.com' }),
});

// DELETE
const del = await fetch(url, { method: 'DELETE', headers });
console.log(del.status);  // 204`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Axios PUT, PATCH, DELETE">
{`const config = { headers: { 'Authorization': 'Bearer TOKEN' } };
const url = 'https://api.example.com/users/42';

// PUT
await axios.put(url, { name: 'Alice Smith', email: 'alice@new.com' }, config);

// PATCH
await axios.patch(url, { email: 'alice@new.com' }, config);

// DELETE
await axios.delete(url, config);`}
      </CodeBlock>

      <SectionHeader number={7} title="Use the Online cURL to JavaScript Converter" />
      <p>
        For cURL commands from Chrome DevTools that have 15–20 browser-specific headers, the
        manual conversion is tedious. The online converter strips unnecessary browser headers
        and produces clean, working JavaScript code instantly.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Get the cURL command',
          desc: 'From Chrome DevTools (F12 → Network → right-click request → Copy → Copy as cURL), from API docs, from Postman (Code → cURL), or write it manually.',
        },
        {
          title: 'Open the cURL converter',
          desc: 'Go to unblockdevs.com/curl-converter. No login required, no data sent to any server — all conversion happens in your browser.',
        },
        {
          title: 'Select JavaScript / fetch or Axios',
          desc: 'Choose your target: JavaScript fetch, Axios, Node.js https, or other supported languages. The converter generates clean code for the selected target.',
        },
        {
          title: 'Copy the code and use it',
          desc: 'Click copy and paste into your project. The output handles headers, method, body, and auth — ready to run.',
        },
      ]} />

      <QuickFact color="green" label="Supported output formats">
        The UnblockDevs cURL converter supports JavaScript (fetch), JavaScript (Axios), Python
        (requests), Python (httpx), Go, PHP, Ruby, Java, Swift, and more — all from a single
        paste of the original cURL command.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'How do I convert cURL to JavaScript fetch?',
          answer: 'Map curl flags to fetch options: -X sets method, -H headers go in the headers object, -d body becomes JSON.stringify(payload) in the body field. Always add if (!response.ok) throw new Error() since fetch does not throw on HTTP errors. Or paste the cURL at unblockdevs.com/curl-converter and select JavaScript fetch as the output format.',
        },
        {
          question: 'How do I convert cURL to Axios?',
          answer: 'With Axios: the URL is the first argument, the data/body is the second argument for POST/PUT/PATCH (Axios auto-serializes objects to JSON), and options (headers, auth, timeout) are in the third argument. GET and DELETE only take URL and config (no body). Paste the cURL at unblockdevs.com/curl-converter and select Axios for working code instantly.',
        },
        {
          question: 'What is the fetch() equivalent of curl -u (Basic auth)?',
          answer: 'Encode the credentials in base64: const credentials = btoa("username:password"), then add an Authorization header: headers: { "Authorization": `Basic ${credentials}` }. With Axios, use the auth option: axios.get(url, { auth: { username: "user", password: "pass" } }) — Axios generates the Basic header automatically.',
        },
        {
          question: 'How do I handle curl --compressed in JavaScript?',
          answer: 'You do not need to handle it. Both fetch() and Axios automatically send Accept-Encoding: gzip, deflate, br and decompress responses transparently — equivalent to curl --compressed. No extra code needed.',
        },
        {
          question: 'How do I convert curl -F (file upload) to JavaScript?',
          answer: 'In the browser, use the FormData API: const form = new FormData(); form.append("file", fileInput.files[0]). Pass form as the fetch body or Axios data — do not set Content-Type manually (the browser sets it with the correct multipart boundary). In Node.js, use the form-data npm package with Axios.',
        },
        {
          question: 'Does fetch() automatically parse JSON like curl?',
          answer: 'No. fetch() gives you a Response object. You must call await response.json() to parse JSON, await response.text() for plain text, or await response.blob() for binary data. Axios does parse JSON automatically — the response body is in response.data without any extra call.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
