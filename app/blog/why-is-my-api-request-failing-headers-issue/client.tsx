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

export default function WhyIsMyApiRequestFailingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why Is My API Request Failing? Fix HTTP Header Issues (Auth, CORS, Content-Type)</h1>
      <p className="lead">
        API calls are failing with no useful error message — just a 401, a 403, or a vague CORS
        block. In 90% of cases, the root cause is a missing or wrong HTTP header. Here are the 5
        most common header-related API failures and exactly how to fix each one, with real code
        examples for JavaScript fetch, Axios, and cURL.
      </p>

      <AlertBox type="error" title="The most common API errors caused by wrong headers">
        401 Unauthorized — Missing or invalid Authorization header
        <br />
        403 Forbidden — Correct token but wrong scope or format
        <br />
        415 Unsupported Media Type — Missing Content-Type header
        <br />
        CORS blocked — Server missing Access-Control-Allow-Origin
        <br />
        400 Bad Request — Body sent without Content-Type declaration
      </AlertBox>

      <SectionHeader number={1} title="Fix: Missing Authorization Header" />
      <p>
        A 401 Unauthorized response almost always means the server did not receive a valid
        Authorization header. The header must be spelled exactly right and the value format must
        match what the API expects — most modern APIs use <code>Bearer token</code> format.
      </p>

      <ErrorFix
        title="Authorization header — wrong vs correct"
        bad={`// Missing Authorization header entirely
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // No Authorization header — will get 401
  }
})`}
        good={`// Correct: Bearer token in Authorization header
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9...',
  }
})`}
        badLabel="Missing auth"
        goodLabel="Correct auth"
      />

      <CodeBlock lang="javascript" title="Authorization header — fetch, Axios, and cURL">
{`// JavaScript fetch
const response = await fetch('https://api.example.com/users', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
  },
});

// Axios — set globally for all requests
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

// Axios — per-request
const response = await axios.get('https://api.example.com/users', {
  headers: { 'Authorization': 'Bearer ' + token },
});

// cURL
curl -H "Authorization: Bearer eyJhbGc..." \
     https://api.example.com/users

// Basic Auth (username:password base64 encoded)
curl -H "Authorization: Basic dXNlcjpwYXNz" \
     https://api.example.com/users
# Or shorthand: curl -u "username:password" https://api.example.com/users`}
      </CodeBlock>

      <QuickFact color="orange" label="Important">
        The header name is case-insensitive (<code>authorization</code> = <code>Authorization</code>),
        but the value format is case-sensitive. Use <code>Bearer token</code> not{' '}
        <code>bearer token</code> — some APIs will reject lowercase. Always check the API docs for
        the exact expected format.
      </QuickFact>

      <SectionHeader number={2} title="Fix: Wrong Content-Type Header" />
      <p>
        When you send a POST or PUT request with a JSON body, the server needs to know what format
        the body is in. Without <code>Content-Type: application/json</code>, the server may reject
        the body entirely, return a 400 or 415 error, or silently misparse the data.
      </p>

      <ErrorFix
        title="Missing Content-Type on POST request"
        bad={`// No Content-Type — server receives body as raw text
fetch('https://api.example.com/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
  // Missing: 'Content-Type': 'application/json'
})`}
        good={`// Correct: Content-Type tells server to parse body as JSON
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
})`}
        badLabel="Missing Content-Type"
        goodLabel="Correct Content-Type"
      />

      <p>
        Note that <code>Content-Type</code> must match the actual body format. Common values:
      </p>
      <CodeBlock lang="http" title="Common Content-Type values">
{`# JSON body (most REST APIs)
Content-Type: application/json

# URL-encoded form data (HTML form default)
Content-Type: application/x-www-form-urlencoded

# Multipart form data (file uploads)
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...

# Plain text
Content-Type: text/plain; charset=utf-8

# XML
Content-Type: application/xml`}
      </CodeBlock>

      <AlertBox type="warning" title="Axios auto-sets Content-Type for JSON">
        If you use <code>axios.post(url, {'{'} name: &apos;Alice&apos; {'}'})</code>, Axios
        automatically sets <code>Content-Type: application/json</code>. But if you pass a{' '}
        <code>FormData</code> object, it sets <code>multipart/form-data</code>. If you manually
        stringify the body with <code>JSON.stringify()</code> inside Axios, you must also set
        Content-Type manually.
      </AlertBox>

      <SectionHeader number={3} title="Fix: CORS Header Issues" />
      <p>
        CORS (Cross-Origin Resource Sharing) errors are some of the most frustrating API failures
        because they are enforced by the browser — the server may have responded successfully but
        the browser blocks your JavaScript from reading the response. CORS is a server-side
        configuration issue. You cannot fix it from the client side.
      </p>

      <AlertBox type="error" title="The exact CORS error message">
        Access to fetch at &apos;https://api.example.com/users&apos; from origin
        &apos;https://yoursite.com&apos; has been blocked by CORS policy: No
        &apos;Access-Control-Allow-Origin&apos; header is present on the requested resource.
      </AlertBox>

      <ErrorFix
        title="CORS — server response missing CORS headers vs correct configuration"
        bad={`# Server response missing CORS headers — browser blocks the response
HTTP/2 200
content-type: application/json
# No Access-Control-Allow-Origin — browser refuses to give JS the response`}
        good={`# Server response with correct CORS headers
HTTP/2 200
content-type: application/json
access-control-allow-origin: https://yoursite.com
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: Authorization, Content-Type
access-control-allow-credentials: true`}
        badLabel="Missing CORS headers"
        goodLabel="Correct CORS headers"
      />

      <CodeBlock lang="javascript" title="Add CORS headers in Express (Node.js)">
{`const cors = require('cors');

// Allow all origins (development only — not for production)
app.use(cors());

// Allow specific origin with credentials
app.use(cors({
  origin: 'https://yoursite.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Required if sending cookies or Authorization header
}));

// Handle preflight for all routes
app.options('*', cors());`}
      </CodeBlock>

      <AlertBox type="tip" title="Test CORS issues with the UnblockDevs CORS Tester">
        Use the <a href="https://unblockdevs.com/cors-tester" target="_blank" rel="noopener noreferrer">UnblockDevs CORS Tester</a> to
        check which CORS headers your API is returning and whether they are configured correctly for
        your origin. It shows exactly which headers are missing or misconfigured.
      </AlertBox>

      <SectionHeader number={4} title="How to Verify Headers Are Being Sent" />
      <p>
        Before debugging why a header is not working, confirm it is actually being sent. Headers can
        be silently dropped by middleware, proxies, CORS preflight handling, or framework-level
        configuration.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Open Chrome DevTools Network tab',
            desc: 'Press F12 → Network tab. Make sure it is open before you make the request, or reload the page.',
          },
          {
            title: 'Find the failing request',
            desc: 'Filter by "Fetch/XHR" for API calls. Click the request name to open its detail panel.',
          },
          {
            title: 'Click the Headers tab',
            desc: 'Check the "Request Headers" section — this is what was actually sent to the server, not what you wrote in code. Middleware or the browser may have modified headers.',
          },
          {
            title: 'Verify the exact header name and value',
            desc: 'Check for typos, wrong capitalization in the value, missing "Bearer " prefix, or the token being undefined (showing "Bearer undefined").',
          },
          {
            title: 'Check response headers for the CORS preflight',
            desc: 'For custom headers (like Authorization), the browser sends an OPTIONS preflight request first. Find that OPTIONS request in DevTools and verify the server\'s Access-Control-Allow-Headers includes your custom header.',
          },
        ]}
      />

      <AlertBox type="tip" title="Analyze response headers in one click">
        Use the <a href="https://unblockdevs.com/http-headers-analyzer" target="_blank" rel="noopener noreferrer">HTTP Headers Analyzer</a> — paste the
        response headers from DevTools to get a full security and correctness audit. It flags
        missing CORS headers, insecure cache policies, missing Content-Type, and more.
      </AlertBox>

      <SectionHeader number={5} title="Why Your Header Is Not Being Sent" />
      <p>
        You added the header in code but it is not appearing in DevTools. Here are the 6 most
        common reasons a header disappears before reaching the server:
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'CORS preflight blocking the header',
            description:
              'Custom headers trigger a CORS preflight (OPTIONS) request. If the server does not return Access-Control-Allow-Headers including your header, the browser drops it from the actual request.',
          },
          {
            title: 'Middleware stripping the header',
            description:
              'Server-side middleware (auth layers, API gateways, reverse proxies like Nginx) may remove headers before they reach your handler. Log headers at the first middleware to check.',
          },
          {
            title: 'Token is undefined at runtime',
            description:
              'Your code sets "Bearer " + token but token is undefined — resulting in "Bearer undefined". Add a null check and log the token value before the request fires.',
          },
          {
            title: 'Framework-level override',
            description:
              'Some frameworks (Next.js API routes, Express middlewares) automatically set or override certain headers. Check your middleware stack for header manipulation.',
          },
          {
            title: 'Missing Vary: Origin on cached response',
            description:
              'If a CDN caches a response without Vary: Origin, it may serve a cached CORS-less response to a different origin. The server must include Vary: Origin for CORS headers to work through CDNs.',
          },
          {
            title: 'Header added to wrong request object',
            description:
              'In Axios, if you set headers on the instance config but then make a request with a different instance, the headers are not inherited. Verify you are using the correct Axios instance.',
          },
        ]}
      />

      <ErrorFix
        title="Header being stripped by proxy vs correct CORS + Vary configuration"
        bad={`# Nginx proxy stripping the custom header and no Vary header
location /api/ {
  proxy_pass http://backend;
  # Missing: proxy_pass_header Authorization;
  # Missing: add_header Vary Origin;
}`}
        good={`# Correct Nginx config — passes headers through + correct Vary
location /api/ {
  proxy_pass http://backend;
  proxy_pass_header Authorization;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  add_header Vary Origin always;
  add_header Access-Control-Allow-Origin $http_origin always;
  add_header Access-Control-Allow-Credentials true always;
}`}
        badLabel="Proxy stripping headers"
        goodLabel="Correct proxy config"
      />

      <FAQAccordion
        items={[
          {
            question: 'Why is my API request failing with a 401 error even though I added the Authorization header?',
            answer:
              'Check three things: (1) The token value is not undefined — log it before the request. (2) The format is exactly "Bearer " + token (capital B, one space) — not "bearer", not "Token". (3) The token has not expired — JWT tokens have an exp claim you can check at jwt.io. Also verify the header is actually being sent by checking DevTools → Network → Request Headers.',
          },
          {
            question: 'How do I fix a missing Authorization header error?',
            answer:
              'Add the Authorization header explicitly: fetch(url, { headers: { "Authorization": "Bearer " + yourToken } }). For Axios, set axios.defaults.headers.common["Authorization"] = "Bearer " + token for all requests, or pass it per-request in the headers config object. For cURL: curl -H "Authorization: Bearer yourtoken" url.',
          },
          {
            question: 'How do I debug CORS headers issues?',
            answer:
              'Open DevTools → Network tab → find the failing request. Check if there is an OPTIONS preflight request before the actual request — if it fails, that is the root cause. Look at the response headers of the OPTIONS request for Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers. These must be set on the server. CORS cannot be fixed from the browser side.',
          },
          {
            question: 'How do I check the Content-Type header of an API request?',
            answer:
              'In Chrome DevTools: Network tab → click the request → Headers tab → scroll to Request Headers → find Content-Type. With cURL: use -v flag — the > lines show request headers including Content-Type. If you see the request is being sent without Content-Type: application/json on a POST with a JSON body, that is why the server is returning 400 or 415.',
          },
          {
            question: 'How do I inspect API headers without Postman?',
            answer:
              'Use Chrome DevTools (F12 → Network tab) to see all headers for any request the browser makes. For server-to-server requests, use cURL with the -v flag. For a security and correctness audit of response headers, use the UnblockDevs HTTP Headers Analyzer — paste in the response headers and get a full report without installing anything.',
          },
          {
            question: 'Why is my header not being sent even though I set it in my code?',
            answer:
              'Most likely causes: (1) The CORS preflight (OPTIONS request) failed — the server did not allow your custom header, so the browser dropped it. Check the OPTIONS response for Access-Control-Allow-Headers. (2) A middleware or proxy is stripping it — log headers at the server entry point. (3) The value is undefined at runtime — "Bearer undefined" instead of a real token. (4) You set it on the wrong Axios instance. Use DevTools Request Headers to confirm what was actually sent.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
