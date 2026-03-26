'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz,
} from '@/components/blog/BlogVisuals';

export default function WhyMyApiWorksInPostmanButNotInBrowserClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why My API Works in Postman but Not in Browser — Complete Debugging Guide</h1>
      <p className="lead">
        You test your API in Postman — works perfectly. You paste the same URL into JavaScript — and it crashes.
        This is one of the most common frustrations in web development, and it has a handful of well-known root causes.
        This guide covers every one of them with working fixes.
      </p>

      <StatGrid
        stats={[
          { value: '#1', label: 'cause: missing CORS headers', color: 'red' },
          { value: '95%', label: 'of cases solved by 3 fixes', color: 'green' },
          { value: '5+', label: 'root causes covered here', color: 'blue' },
          { value: '2 min', label: 'to diagnose with this guide', color: 'purple' },
        ]}
      />

      <SectionHeader number={1} title="Why Postman Succeeds Where the Browser Fails" />
      <p>
        Postman is a native application or browser extension that sends requests <strong>directly</strong>, without
        any browser security model applied. Your browser, on the other hand, enforces several security
        policies that Postman blissfully ignores.
      </p>

      <CompareTable
        leftLabel="Postman / curl"
        rightLabel="Browser Fetch / XHR"
        rows={[
          { label: 'CORS enforced?', left: '❌ Never', right: '✅ Always' },
          { label: 'Preflight OPTIONS?', left: '❌ Never', right: '✅ For non-simple requests' },
          { label: 'Cookie scope', left: 'Sends any cookie you add', right: 'SameSite / Domain rules apply' },
          { label: 'Auth headers', left: 'Always sent', right: 'Blocked if CORS not set up' },
          { label: 'Mixed content', left: 'Not applicable', right: 'HTTP blocked on HTTPS pages' },
          { label: 'Origin header', left: 'None (or manual)', right: 'Auto-set by browser' },
        ]}
      />

      <QuickFact>
        The browser is <strong>not broken</strong> — it is enforcing security policies that protect your users.
        The fix almost always lives on the <em>server</em>, not in your frontend code.
      </QuickFact>

      <SectionHeader number={2} title="Root Cause 1 — CORS (Cross-Origin Resource Sharing)" />
      <p>
        CORS is by far the most common culprit. The browser checks whether the server explicitly permits
        requests from your frontend's origin (scheme + host + port). If the server doesn't include the right
        response headers, the browser blocks the response — even if the server returned 200 OK.
      </p>

      <FlowDiagram
        steps={[
          { label: 'Browser sends request', color: 'blue' },
          { label: 'Server responds (any status)', color: 'zinc' },
          { label: 'Browser checks Access-Control-Allow-Origin', color: 'amber' },
          { label: 'Header matches origin?', color: 'orange' },
          { label: 'Allow — JS receives response', color: 'green' },
        ]}
      />

      <AlertBox type="error" title="Classic CORS error in console">
        Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by
        CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      </AlertBox>

      <p><strong>The fix is always server-side.</strong> Add the correct response headers:</p>

      <CodeBlock language="http" filename="Server Response Headers">
{`Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true   # only if you send cookies`}
      </CodeBlock>

      <p>
        Here's how to set this in common backend frameworks:
      </p>

      <CodeBlock language="javascript" filename="Express.js (Node)">
{`const cors = require('cors');

app.use(cors({
  origin: 'https://myapp.com',      // your frontend origin
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,                 // only if using cookies
}));`}
      </CodeBlock>

      <CodeBlock language="python" filename="FastAPI (Python)">
{`from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
  CORSMiddleware,
  allow_origins=["https://myapp.com"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)`}
      </CodeBlock>

      <AlertBox type="warning" title="Do NOT use wildcard (*) with credentials">
        <code>Access-Control-Allow-Origin: *</code> and <code>Access-Control-Allow-Credentials: true</code>{' '}
        cannot be combined. Use an explicit origin instead.
      </AlertBox>

      <SectionHeader number={3} title="Root Cause 2 — Preflight OPTIONS Request" />
      <p>
        For any request with a custom header (like <code>Authorization</code>) or a non-GET/POST method,
        the browser first sends a silent <strong>OPTIONS preflight</strong> to ask the server for permission.
        If the server doesn't handle OPTIONS, it returns 405 Method Not Allowed, and the real request never fires.
      </p>

      <ErrorFix
        bad={`# Server ignores OPTIONS — preflight fails
app.post('/api/data', handler)
# No OPTIONS route defined`}
        good={`# Express: cors() handles OPTIONS automatically
app.use(cors(corsOptions));

# Or manually:
app.options('*', cors(corsOptions));  // enable preflight for all routes
app.post('/api/data', cors(corsOptions), handler);`}
        badLabel="Missing OPTIONS handler"
        goodLabel="OPTIONS handled"
      />

      <AlertBox type="info" title="How to spot a preflight issue">
        Open DevTools → Network tab → look for an <strong>OPTIONS</strong> request to your endpoint.
        If it returns 4xx or has no CORS headers — that's your problem.
      </AlertBox>

      <SectionHeader number={4} title="Root Cause 3 — Auth Headers Not Sent" />
      <p>
        Postman lets you manually attach any header. The browser's <code>fetch()</code> API requires you to
        explicitly include credentials in your code. A missing <code>Authorization</code> header is the second
        most common issue after CORS.
      </p>

      <ErrorFix
        bad={`// Auth header forgotten — server returns 401
fetch('https://api.example.com/data')
  .then(res => res.json())`}
        good={`// Include Authorization header explicitly
const token = localStorage.getItem('token');

fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())`}
        badLabel="No auth header"
        goodLabel="Auth header included"
      />

      <SectionHeader number={5} title="Root Cause 4 — Cookies & Credentials" />
      <p>
        By default, <code>fetch()</code> does <strong>not</strong> send cookies. You must opt in with
        <code>credentials: 'include'</code>. The server must also explicitly allow credentials in its CORS headers,
        and the cookie must meet <code>SameSite</code> requirements.
      </p>

      <ErrorFix
        bad={`// Cookies not sent — session breaks
fetch('/api/user/profile')
  .then(res => res.json())`}
        good={`// Send cookies with every request
fetch('/api/user/profile', {
  credentials: 'include',   // sends cookies
})
  .then(res => res.json())

// Server must respond with:
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Origin: https://myapp.com (exact, no wildcard)`}
        badLabel="Cookies not sent"
        goodLabel="Cookies included"
      />

      <KeyPointsGrid
        columns={2}
        items={[
          { title: 'credentials: "omit"', description: 'Default — no cookies, no TLS certs sent.' },
          { title: 'credentials: "same-origin"', description: 'Cookies only to same domain. Good default for most apps.' },
          { title: 'credentials: "include"', description: 'Always send cookies. Required for cross-origin sessions.' },
          { title: 'SameSite=None; Secure', description: 'Cookie attribute required for cross-site cookies in modern browsers.' },
        ]}
      />

      <SectionHeader number={6} title="Root Cause 5 — Mixed Content (HTTP vs HTTPS)" />
      <p>
        If your frontend is served over HTTPS but your API is HTTP, the browser blocks the request entirely.
        This is called <strong>mixed content</strong> and is a security protection — not a bug.
      </p>

      <AlertBox type="error" title="Mixed content error">
        Mixed Content: The page at 'https://myapp.com' was loaded over HTTPS, but requested an insecure resource
        'http://api.example.com/data'. This request has been blocked; the content must be served over HTTPS.
      </AlertBox>

      <VerticalSteps
        steps={[
          {
            title: 'Upgrade your API to HTTPS',
            description: 'Use a free Let\'s Encrypt certificate. This is the correct long-term fix.',
          },
          {
            title: 'Use a reverse proxy',
            description: 'Serve your HTTP API behind an Nginx/Cloudflare HTTPS proxy.',
          },
          {
            title: 'Use environment variables for API base URL',
            description: 'Set API_URL=https://... in production so the URL is always HTTPS in prod.',
            code: 'const API = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";',
          },
          {
            title: 'Temporary: serve frontend over HTTP too',
            description: 'Not recommended for production — only for local development.',
          },
        ]}
      />

      <SectionHeader number={7} title="Root Cause 6 — Content-Type Header" />
      <p>
        Sending a JSON body without <code>Content-Type: application/json</code> causes the server to misread the body.
        This makes the request fail on the server side, while it worked in Postman because Postman auto-sets it.
      </p>

      <ErrorFix
        bad={`// Body is sent as plain text — server can't parse it
fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice', age: 30 }),
})`}
        good={`// Correct: tell the server you're sending JSON
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
  },
  body: JSON.stringify({ name: 'Alice', age: 30 }),
})`}
        badLabel="Missing Content-Type"
        goodLabel="Content-Type set"
      />

      <SectionHeader number={8} title="Diagnostic Checklist" />

      <VerticalSteps
        steps={[
          {
            title: 'Open DevTools → Network tab',
            description: 'Find your request. Look at the Response Headers for Access-Control-Allow-Origin.',
          },
          {
            title: 'Check the Console tab',
            description: 'CORS errors, mixed-content warnings, and auth failures all appear here with exact details.',
          },
          {
            title: 'Look for the OPTIONS preflight',
            description: 'If you see a red OPTIONS request before your main request — preflight is failing.',
          },
          {
            title: 'Check the request headers',
            description: 'Click your request → Headers tab → verify Authorization and Content-Type are present.',
          },
          {
            title: 'Check the response status',
            description: '401 = auth missing/wrong. 403 = forbidden. 0 = CORS blocked (browser won\'t show response).',
          },
          {
            title: 'Confirm API URL uses HTTPS if frontend does',
            description: 'Check the request URL in the network tab — http:// on an https:// page is instant block.',
          },
        ]}
      />

      <SectionHeader number={9} title="Quick Reference: Error Messages Decoded" />

      <CompareTable
        leftLabel="Error Message"
        rightLabel="Root Cause & Fix"
        rows={[
          {
            label: 'No Access-Control-Allow-Origin header',
            left: 'CORS error',
            right: 'Add CORS headers on server',
          },
          {
            label: 'Response to preflight has invalid HTTP status',
            left: 'Preflight (OPTIONS) fail',
            right: 'Handle OPTIONS on server',
          },
          {
            label: '401 Unauthorized',
            left: 'Auth header missing',
            right: 'Add Authorization header in fetch()',
          },
          {
            label: 'Mixed Content blocked',
            left: 'HTTP API from HTTPS page',
            right: 'Use HTTPS for API',
          },
          {
            label: 'Failed to parse JSON body',
            left: 'Content-Type missing',
            right: 'Add Content-Type: application/json',
          },
          {
            label: 'Request blocked by cookie policy',
            left: 'SameSite/credentials mismatch',
            right: 'Use credentials: include + SameSite=None',
          },
        ]}
      />

      <SectionHeader number={10} title="Development Proxy: The Full Workaround" />
      <p>
        During local development, you can use a proxy to avoid CORS entirely by making the browser think
        the API is on the same origin:
      </p>

      <CodeBlock language="json" filename="next.config.js (Next.js)">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*', // your backend
      },
    ];
  },
};`}
      </CodeBlock>

      <CodeBlock language="json" filename="vite.config.js (Vite)">
{`export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};`}
      </CodeBlock>

      <AlertBox type="tip" title="Best practice for production">
        In production, use a proper CORS configuration on your backend instead of a proxy.
        The proxy approach is ideal for local dev to avoid touching server config.
      </AlertBox>

      <FAQAccordion
        items={[
          {
            question: 'Why does my API return 200 but the browser still shows CORS error?',
            answer: 'The server returned 200, but the CORS headers are missing or wrong. The browser blocks the response regardless of status. Add Access-Control-Allow-Origin to your server response headers.',
          },
          {
            question: 'Can I fix CORS from the frontend?',
            answer: 'No. CORS is enforced by the browser and can only be resolved server-side. Any "frontend fix" (like using a proxy or same-origin URL) just routes around the problem — the fix belongs on the server.',
          },
          {
            question: 'Should I use Access-Control-Allow-Origin: * in production?',
            answer: 'Only for fully public APIs that don\'t need credentials. For any API that handles authentication or sensitive data, specify the exact allowed origins instead of *.',
          },
          {
            question: 'What is a "simple" vs "preflighted" CORS request?',
            answer: 'Simple requests (GET/POST with basic headers) go directly. Preflighted requests (custom headers, PUT/DELETE, JSON body) trigger an OPTIONS preflight first. If your server doesn\'t handle OPTIONS, preflighted requests fail.',
          },
          {
            question: 'I\'m seeing status 0 in the network tab — what does that mean?',
            answer: 'Status 0 means the browser blocked the request before it could complete — usually CORS. The actual response from the server is hidden by the browser\'s security model.',
          },
          {
            question: 'My API works on localhost but not in production. Why?',
            answer: 'Your server\'s CORS config likely allows localhost explicitly but not your production domain. Update the allowed origins list on your server to include your production frontend URL.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
