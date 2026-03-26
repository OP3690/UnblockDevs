'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToConvertCurlToJavascriptFetchClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert cURL Command to JavaScript Fetch: Complete Guide (2026)</h1>
      <p className="lead">
        Converting cURL commands to JavaScript fetch is one of the most common tasks developers face when integrating APIs. Whether you copied a command from API docs or need to move CLI testing into your app, this guide covers every flag, every edge case, and every pattern you need — with real code examples throughout.
      </p>

      <StatGrid stats={[
        { value: '95%', label: 'of API docs include cURL examples', color: 'blue' },
        { value: '8', label: 'common cURL flags to know', color: 'green' },
        { value: '1:1', label: 'mapping between cURL and fetch options', color: 'purple' },
        { value: '100%', label: 'of fetch options have cURL equivalents', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Understanding cURL vs. JavaScript Fetch" />

      <p>
        cURL is a command-line tool that sends HTTP requests directly from your terminal. The Fetch API is JavaScript's built-in mechanism for making HTTP requests from the browser or Node.js. Despite looking completely different, both tools do the same thing: they send HTTP messages over a network.
      </p>

      <CompareTable
        leftLabel="cURL (Terminal)"
        rightLabel="Fetch API (JavaScript)"
        rows={[
          { label: 'HTTP Method', left: '-X POST', right: 'method: "POST"' },
          { label: 'Headers', left: '-H "Key: Value"', right: 'headers: { Key: "Value" }' },
          { label: 'Request Body', left: '-d \'{"key":"val"}\'', right: 'body: JSON.stringify(data)' },
          { label: 'Basic Auth', left: '-u user:pass', right: 'headers: { Authorization: "Basic ..." }' },
          { label: 'Bearer Token', left: '-H "Authorization: Bearer TOKEN"', right: 'headers: { Authorization: "Bearer TOKEN" }' },
          { label: 'Follow Redirects', left: '-L', right: 'redirect: "follow" (default)' },
          { label: 'Ignore SSL', left: '-k / --insecure', right: 'N/A (browser enforces SSL)' },
          { label: 'Form Data', left: '-F "file=@path"', right: 'body: new FormData()' },
        ]}
      />

      <QuickFact>
        The Fetch API was introduced in browsers around 2015. Before that, developers used XMLHttpRequest (XHR). Today, fetch is available natively in all modern browsers and Node.js 18+.
      </QuickFact>

      <SectionHeader number={2} title="The Basic GET Request Conversion" />

      <p>
        The simplest cURL command is a plain GET request. Here is how it maps to fetch:
      </p>

      <ErrorFix
        bad={`curl https://api.example.com/users`}
        good={`fetch('https://api.example.com/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
        badLabel="cURL GET"
        goodLabel="Fetch GET"
      />

      <p>
        With async/await, which is the preferred modern pattern:
      </p>

      <CodeBlock language="js" filename="get-request.js">
{`async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

getUsers();`}
      </CodeBlock>

      <AlertBox type="info" title="Why check response.ok?">
        Unlike cURL, which exits with a non-zero code on HTTP errors, the Fetch API does NOT throw for HTTP error status codes (4xx, 5xx). You must check <code>response.ok</code> or <code>response.status</code> manually.
      </AlertBox>

      <SectionHeader number={3} title="Converting POST Requests with JSON Body" />

      <p>
        POST requests with JSON bodies are the most common API pattern. The cURL flags <code>-X POST</code>, <code>-H</code>, and <code>-d</code> all have direct fetch equivalents.
      </p>

      <ErrorFix
        bad={`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'`}
        good={`const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com',
  }),
});

const data = await response.json();`}
        badLabel="cURL POST with JSON"
        goodLabel="Fetch POST with JSON"
      />

      <AlertBox type="warning" title="Always stringify the body">
        The <code>body</code> field in fetch must be a string, Blob, ArrayBuffer, FormData, or URLSearchParams — NOT a plain object. Passing a raw object silently converts to <code>[object Object]</code>. Always use <code>JSON.stringify()</code> for JSON payloads.
      </AlertBox>

      <CodeBlock language="js" filename="post-json.js">
{`async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(\`Request failed \${response.status}: \${errorBody}\`);
  }

  return response.json();
}

// Usage
createUser({ name: 'Alice', email: 'alice@example.com' })
  .then(user => console.log('Created:', user))
  .catch(err => console.error(err));`}
      </CodeBlock>

      <SectionHeader number={4} title="Converting Headers (-H flag)" />

      <p>
        Every <code>-H "Key: Value"</code> flag in cURL becomes a key-value pair in the <code>headers</code> object. Multiple <code>-H</code> flags become multiple entries in the same object.
      </p>

      <ErrorFix
        bad={`curl https://api.example.com/data \\
  -H "Authorization: Bearer eyJhbGci..." \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "X-Request-ID: abc123" \\
  -H "Cache-Control: no-cache"`}
        good={`const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer eyJhbGci...',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Request-ID': 'abc123',
    'Cache-Control': 'no-cache',
  },
});`}
        badLabel="Multiple cURL -H flags"
        goodLabel="Fetch headers object"
      />

      <KeyPointsGrid columns={2} items={[
        { title: 'Header names are case-insensitive', description: 'HTTP headers are case-insensitive. "content-type" and "Content-Type" are the same header, but conventionally use Title-Case.' },
        { title: 'Content-Type is critical', description: 'If you send a JSON body, you must include Content-Type: application/json or many APIs will reject your request.' },
        { title: 'Authorization format matters', description: 'Bearer tokens use "Bearer TOKEN", Basic auth uses "Basic base64(user:pass)". Match the API\'s expected format exactly.' },
        { title: 'Custom headers with X- prefix', description: 'Many APIs use custom X-* headers for things like API versions, request IDs, or tenant identifiers. These map directly.' },
      ]} />

      <SectionHeader number={5} title="Converting Authentication (-u and Bearer tokens)" />

      <p>
        Authentication is one of the trickier conversions because cURL has dedicated flags for some auth types. Here are the three most common patterns:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Bearer Token (OAuth / JWT)',
          description: 'The most common modern auth pattern. cURL uses -H "Authorization: Bearer TOKEN" which maps directly to the headers object.',
          code: `// cURL: curl -H "Authorization: Bearer eyJhbGci..." https://api.example.com/me

const response = await fetch('https://api.example.com/me', {
  headers: {
    'Authorization': 'Bearer eyJhbGci...',
  },
});`,
        },
        {
          title: 'Basic Auth (-u username:password)',
          description: 'cURL\'s -u flag encodes credentials as Base64. In fetch, you must perform this encoding manually using btoa().',
          code: `// cURL: curl -u alice:secret123 https://api.example.com/admin

const credentials = btoa('alice:secret123'); // Base64 encode
const response = await fetch('https://api.example.com/admin', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
  },
});`,
        },
        {
          title: 'API Key Header',
          description: 'Many APIs use a custom header for API keys. This maps directly to the headers object.',
          code: `// cURL: curl -H "X-API-Key: my-secret-key" https://api.example.com/data

const response = await fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': 'my-secret-key',
  },
});`,
        },
        {
          title: 'API Key as Query Parameter',
          description: 'Some APIs accept the key in the URL query string instead of headers.',
          code: `// cURL: curl "https://api.example.com/data?api_key=my-secret"

const response = await fetch('https://api.example.com/data?api_key=my-secret');
// Or using URL constructor for cleaner code:
const url = new URL('https://api.example.com/data');
url.searchParams.set('api_key', 'my-secret');
const response2 = await fetch(url.toString());`,
        },
      ]} />

      <SectionHeader number={6} title="Converting Form Data (-F and --data-urlencode)" />

      <p>
        Form submissions require different handling depending on whether they use URL-encoded form data or multipart form data (for file uploads).
      </p>

      <CodeBlock language="js" filename="form-data.js">
{`// URL-encoded form data
// cURL: curl -d "username=alice&password=secret" https://api.example.com/login

const params = new URLSearchParams();
params.append('username', 'alice');
params.append('password', 'secret');

const response = await fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: params.toString(),
});

// --- OR for multipart form data (file uploads) ---
// cURL: curl -F "avatar=@/path/to/photo.jpg" -F "userId=123" https://api.example.com/upload

const formData = new FormData();
formData.append('avatar', fileInput.files[0]); // File object from <input type="file">
formData.append('userId', '123');

// NOTE: Do NOT set Content-Type header when using FormData.
// The browser sets it automatically with the correct boundary.
const uploadResponse = await fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData,
});`}
      </CodeBlock>

      <AlertBox type="warning" title="Never set Content-Type manually for FormData">
        When using <code>new FormData()</code>, do NOT manually set the <code>Content-Type</code> header. The browser automatically sets it to <code>multipart/form-data</code> with the correct boundary string. Setting it manually will break the request.
      </AlertBox>

      <SectionHeader number={7} title="Complete Conversion Reference" />

      <p>
        Here is a comprehensive mapping of every common cURL flag to its fetch equivalent:
      </p>

      <CompareTable
        leftLabel="cURL Flag"
        rightLabel="Fetch Equivalent"
        rows={[
          { label: 'URL', left: 'curl [URL]', right: "fetch('[URL]')" },
          { label: 'GET method (default)', left: 'curl [URL]', right: 'fetch(url) // method defaults to GET' },
          { label: 'POST method', left: '-X POST', right: "method: 'POST'" },
          { label: 'PUT method', left: '-X PUT', right: "method: 'PUT'" },
          { label: 'PATCH method', left: '-X PATCH', right: "method: 'PATCH'" },
          { label: 'DELETE method', left: '-X DELETE', right: "method: 'DELETE'" },
          { label: 'Add header', left: '-H "Key: Value"', right: "headers: { 'Key': 'Value' }" },
          { label: 'JSON body', left: "-d '{\"key\":\"val\"}'", right: 'body: JSON.stringify(data)' },
          { label: 'Basic auth', left: '-u user:pass', right: "headers: { Authorization: 'Basic ' + btoa('user:pass') }" },
          { label: 'Follow redirects', left: '-L', right: "redirect: 'follow' (default)" },
          { label: 'No redirects', left: '--max-redirs 0', right: "redirect: 'manual'" },
          { label: 'Send cookies', left: '--cookie "name=val"', right: "credentials: 'include'" },
          { label: 'Verbose output', left: '-v', right: 'N/A (use DevTools Network tab)' },
          { label: 'Timeout', left: '--max-time 10', right: 'Use AbortController + setTimeout' },
          { label: 'Compressed', left: '--compressed', right: 'Browser handles automatically' },
        ]}
      />

      <SectionHeader number={8} title="Handling Timeouts with AbortController" />

      <p>
        cURL has a <code>--max-time</code> flag. Fetch does not have a native timeout option, but you can implement one using <code>AbortController</code>:
      </p>

      <CodeBlock language="js" filename="fetch-timeout.js">
{`// cURL: curl --max-time 10 https://api.example.com/slow-endpoint

async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(\`Request timed out after \${timeoutMs}ms\`);
    }
    throw error;
  }
}

// Usage
const response = await fetchWithTimeout(
  'https://api.example.com/slow-endpoint',
  { headers: { 'Authorization': 'Bearer TOKEN' } },
  10000 // 10 seconds
);`}
      </CodeBlock>

      <SectionHeader number={9} title="CORS Considerations (Not in cURL)" />

      <AlertBox type="info" title="cURL bypasses CORS — fetch does not">
        cURL runs in your terminal and is not subject to browser CORS policies. When you convert to fetch and run it in a browser, you may hit CORS errors that never appeared with cURL. This is expected behavior — the server must send the appropriate CORS headers for browser requests.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'cURL has no CORS', description: 'cURL makes direct TCP connections. CORS is purely a browser security mechanism. A working cURL command can still fail in the browser due to missing CORS headers.' },
        { title: 'Add credentials for cookies', description: 'If the API uses cookies for auth, add credentials: "include" to fetch. This is not needed with cURL because it handles cookies differently.' },
        { title: 'Same-origin requests', description: 'Fetch requests to the same origin (same domain, port, protocol) have no CORS restrictions. Only cross-origin requests are affected.' },
        { title: 'Preflight requests', description: 'For non-simple requests (custom headers, JSON content-type), browsers send an OPTIONS preflight. cURL never does this automatically.' },
      ]} />

      <CodeBlock language="js" filename="cors-credentials.js">
{`// Sending cookies/credentials cross-origin
// cURL: curl --cookie "session=abc" https://api.otherdomain.com/data

const response = await fetch('https://api.otherdomain.com/data', {
  credentials: 'include', // Send cookies with cross-origin requests
});

// Options for credentials:
// 'omit'    - never send cookies (default for cross-origin)
// 'same-origin' - send cookies only for same-origin requests (default)
// 'include' - always send cookies (requires server CORS: Access-Control-Allow-Credentials: true)`}
      </CodeBlock>

      <SectionHeader number={10} title="A Complete Real-World Example" />

      <p>
        Here is a complex, real-world cURL command converted to a clean, production-ready fetch function:
      </p>

      <CodeBlock language="bash" filename="complex-curl.sh">
{`curl -X POST https://api.stripe.com/v1/charges \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -H "Stripe-Version: 2023-10-16" \\
  -d "amount=2000" \\
  -d "currency=usd" \\
  -d "source=tok_visa" \\
  -d "description=Charge for alice@example.com"`}
      </CodeBlock>

      <CodeBlock language="js" filename="stripe-fetch.js">
{`async function createCharge({ amount, currency, source, description }) {
  const params = new URLSearchParams({
    amount: String(amount),
    currency,
    source,
    description,
  });

  const response = await fetch('https://api.stripe.com/v1/charges', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk_test_abc123',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': '2023-10-16',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(\`Stripe error: \${error.error?.message}\`);
  }

  return response.json();
}

// Usage
const charge = await createCharge({
  amount: 2000,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Charge for alice@example.com',
});
console.log('Charge created:', charge.id);`}
      </CodeBlock>

      <FlowDiagram steps={[
        { label: 'Parse cURL', color: 'blue' },
        { label: 'Extract URL', color: 'blue' },
        { label: 'Map Method', color: 'green' },
        { label: 'Map Headers', color: 'green' },
        { label: 'Map Body', color: 'amber' },
        { label: 'Map Auth', color: 'amber' },
        { label: 'Test Fetch', color: 'purple' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I convert a cURL command to JavaScript fetch?',
          answer: 'To convert cURL to fetch: 1) Extract the URL, 2) Map -X flag to method, 3) Map each -H flag to a key in the headers object, 4) Map -d data to body with JSON.stringify() for JSON or URLSearchParams for form data, 5) Map -u username:password to Authorization: Basic + btoa(). Always add response.ok checks since fetch does not throw on 4xx/5xx errors.',
        },
        {
          question: 'Why does my fetch request work in cURL but get a CORS error in the browser?',
          answer: 'cURL bypasses browser CORS policies because it operates at the OS network level. The browser enforces CORS — the server must respond with Access-Control-Allow-Origin headers to permit cross-origin requests. The solution is either to configure the server\'s CORS headers or to proxy the request through your own backend.',
        },
        {
          question: 'How do I handle Basic Auth in fetch?',
          answer: 'Use btoa() to Base64-encode the credentials: const auth = btoa("username:password"); then set the header "Authorization": "Basic " + auth. Note that btoa() is available in browsers and Node.js 16+. For older Node.js, use Buffer.from("user:pass").toString("base64").',
        },
        {
          question: 'Does fetch follow redirects like cURL -L?',
          answer: 'Yes. fetch follows redirects by default (redirect: "follow"), which is the same as cURL\'s -L flag. To stop following redirects, set redirect: "manual" in the fetch options. To throw an error on redirect, use redirect: "error".',
        },
        {
          question: 'How do I add a timeout to fetch like cURL --max-time?',
          answer: 'Use AbortController: create a controller, pass its signal to fetch, and call controller.abort() in a setTimeout. Wrap in try/catch and check if error.name === "AbortError" to detect timeout vs. network errors.',
        },
        {
          question: 'What is the equivalent of cURL -k (insecure/skip SSL) in fetch?',
          answer: 'There is no equivalent in browser-based fetch — browsers always enforce SSL certificate validation and this cannot be disabled. In Node.js, you can use the https module with rejectUnauthorized: false, but never do this in production. If you are hitting SSL errors, fix the certificate instead.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
