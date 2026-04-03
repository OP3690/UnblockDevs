'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, StatGrid, SectionHeader, QuickFact, KeyPointsGrid,
} from '@/components/blog/BlogVisuals';

export default function FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected Token &lt;" in JSON — Why Your API Is Returning HTML</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected token '&lt;', "&lt;!DOCTYPE "... is not valid JSON</code> — this error
        means your API returned an HTML page instead of JSON. The angle bracket is the start of an HTML tag.
        This guide explains every reason why this happens, how to diagnose the root cause in 2 minutes using
        DevTools, and how to fix each case permanently.
      </p>

      <StatGrid stats={[
        { value: '&lt;', label: 'start of HTML — not JSON', color: 'red' },
        { value: '6+', label: 'root causes covered', color: 'blue' },
        { value: '404/500', label: 'most common: error page returned as HTML', color: 'amber' },
        { value: '2 min', label: 'to diagnose with DevTools Network tab', color: 'green' },
      ]} />

      <AlertBox type="error" title="The exact error">
        SyntaxError: Unexpected token '&lt;', "&lt;!DOCTYPE html&gt;..." is not valid JSON
        — or —
        SyntaxError: Unexpected token '&lt;' in JSON at position 0
        — or —
        SyntaxError: JSON Parse error: Unrecognized token '&lt;'
      </AlertBox>

      <SectionHeader number={1} title="Why This Happens" />
      <p>
        You called <code>response.json()</code> but the server returned an HTML page — not JSON.
        The HTML starts with <code>&lt;!DOCTYPE html&gt;</code> or <code>&lt;html&gt;</code> or
        an error template. JSON parsing immediately fails on the first <code>&lt;</code> character.
      </p>

      <QuickFact color="red" label="The server is the source of truth">
        The error is never in your JSON parsing code. It is always in what the server sent back.
        Always inspect the raw response in the Network tab before changing any JavaScript code.
        The fix is almost always on the server side or in the request configuration.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'What the flow looks like', description: 'Your code calls fetch("/api/data") → Server returns HTML (an error page, login redirect, or 404) → You call response.json() → JSON.parse("<!DOCTYPE...") throws SyntaxError because HTML is not valid JSON.' },
        { title: 'Common HTML responses', description: 'A 404 "Page Not Found" HTML page, a 500 "Internal Server Error" page, a /login redirect page from an auth guard, or the React app\'s own HTML (index.html) for unmatched routes.' },
        { title: 'The diagnostic rule', description: 'Open DevTools → Network → click the failing request → Response tab. Read the actual response body. The content tells you exactly which cause you\'re dealing with.' },
        { title: 'Always check Content-Type', description: 'A correct API response has Content-Type: application/json. If the response shows text/html, the server sent HTML. This is the fastest way to confirm the diagnosis.' },
      ]} />

      <SectionHeader number={2} title="Step 1 — Diagnose in 2 Minutes" />
      <VerticalSteps steps={[
        { title: 'Open Chrome DevTools (F12)', desc: 'Go to the Network tab before triggering the request. If the request already fired, refresh the page with DevTools open.' },
        { title: 'Find your API request', desc: 'Filter by XHR or Fetch in the Network tab toolbar. Look for the failing request — it will likely show a red status code or the wrong response size.' },
        { title: 'Click the Response tab', desc: 'Read the raw response body. You will see exactly what HTML was returned. Look for: <!DOCTYPE, <html, error page templates, or the main React app HTML.' },
        { title: 'Note the status code', desc: '404 = route not found on server. 500 = server error. 302/301 = redirect (often to /login). 503 = server down. 200 with HTML = proxy returning frontend app. Each status maps to a specific fix.' },
        { title: 'Check the request URL', desc: 'Verify the URL your code sent matches the expected API endpoint. A single typo sends the request to the frontend router which returns the HTML app shell.' },
        { title: 'Check Content-Type header', desc: 'In the Response Headers section, confirm Content-Type. If it says text/html instead of application/json, that\'s your confirmation.' },
      ]} />

      <SectionHeader number={3} title="Cause 1 — Wrong URL / 404 Error Page" />
      <ErrorFix
        bad={`// Typo in URL → server returns 404 HTML page
fetch('/api/usres')          // ❌ typo: 'usres' not 'users'
  .then(res => res.json())   // parses the 404 HTML → SyntaxError`}
        good={`// Correct URL + check res.ok before parsing
fetch('/api/users')
  .then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(\`HTTP \${res.status}: \${text.slice(0, 200)}\`);
    }
    return res.json();
  })`}
        badLabel="Wrong URL returns 404 HTML"
        goodLabel="Check res.ok before calling .json()"
      />

      <SectionHeader number={4} title="Cause 2 — Auth Redirect (302 to Login Page)" />
      <p>
        If your API requires authentication and the session expired, the server redirects to
        <code>/login</code>. The browser follows the redirect and returns the login page HTML.
        fetch() follows redirects silently by default.
      </p>

      <ErrorFix
        bad={`// Session expired → redirected to /login → HTML returned
fetch('/api/dashboard/data', {
  credentials: 'include', // sends expired cookie
})
  .then(res => res.json()) // parses /login HTML → SyntaxError`}
        good={`fetch('/api/dashboard/data', { credentials: 'include' })
  .then(async res => {
    // Detect auth redirect
    if (res.redirected && res.url.includes('/login')) {
      window.location.href = '/login';
      return null;
    }
    if (res.status === 401 || res.status === 403) {
      window.location.href = '/login';
      return null;
    }
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  })`}
        badLabel="Silently follows auth redirect to login page"
        goodLabel="Detect redirect and handle expired session"
      />

      <SectionHeader number={5} title="Cause 3 — Server Error Page (500)" />
      <p>
        If the server crashes while handling the request, it returns a 500 error page in HTML.
        This is common in Next.js API routes when there is an unhandled exception — Next.js catches
        it and renders an HTML error page.
      </p>

      <CodeBlock language="typescript" filename="Next.js API Route — Always return JSON errors">
{`// app/api/users/route.ts
// ❌ Without try/catch — unhandled error → Next.js HTML error page
export async function GET() {
  const users = await db.users.findMany(); // throws if DB is down
  return Response.json(users);
}

// ✅ With proper error handling — always returns JSON
export async function GET() {
  try {
    const users = await db.users.findMany();
    return Response.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    // Return a JSON error response — never let it fall through to HTML
    return Response.json(
      { error: 'Failed to fetch users', code: 'DB_ERROR' },
      { status: 500 }
    );
  }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Cause 4 — Development Proxy Misconfiguration" />
      <p>
        In development, if your API proxy is not configured, requests to <code>/api/*</code> return
        the frontend's HTML (the React app shell) instead of being forwarded to the backend server.
        This is the most confusing case because it works in production but fails locally.
      </p>

      <CodeBlock language="javascript" filename="next.config.js — fix proxy configuration">
{`// next.config.js — proxy /api/* to your backend
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // your backend
      },
    ];
  },
};

// For Vite (vite.config.ts):
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
};

// For Create React App (package.json):
{
  "proxy": "http://localhost:8000"
}`}
      </CodeBlock>

      <SectionHeader number={7} title="Cause 5 — CORS Preflight Returns HTML" />
      <p>
        If your server returns an HTML error for OPTIONS preflight requests, the browser blocks the
        actual JSON request. Check the Network tab for a red OPTIONS request immediately before your
        failing request. The fix is in the CORS configuration on the server.
      </p>

      <CodeBlock language="javascript" filename="Express.js — fix CORS to return JSON, not HTML">
{`const cors = require('cors');

// ✅ Configure CORS to allow your frontend origin
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle OPTIONS preflight explicitly
app.options('*', cors());

// ✅ Error handler always returns JSON (not Express default HTML)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});`}
      </CodeBlock>

      <SectionHeader number={8} title="Cause 6 — CDN or Load Balancer Error Page" />
      <p>
        In production, a CDN (Cloudflare, AWS CloudFront) or load balancer may return its own HTML
        error page when the origin server is unreachable or returns a 5xx. The error happens before
        your API code even runs. Check if the response includes server headers from the CDN.
      </p>

      <AlertBox type="tip" title="Look at response headers to identify the source">
        If the HTML contains "Cloudflare" or "Error 522" or AWS error pages, the CDN is returning the
        error, not your server. Check: Server: cloudflare or x-amz-cf-id in the response headers.
        Fix: ensure your origin server is healthy and the CDN health checks are configured correctly.
      </AlertBox>

      <SectionHeader number={9} title="Safe fetch Wrapper — Use This Pattern in Production" />
      <CodeBlock language="javascript" filename="fetchJSON utility — handles all error cases">
{`/**
 * Robust JSON fetch — inspects Content-Type before parsing,
 * surfaces helpful errors instead of cryptic JSON syntax errors.
 */
async function fetchJSON(url, options = {}) {
  let res;
  try {
    res = await fetch(url, {
      headers: { 'Accept': 'application/json', ...options.headers },
      ...options,
    });
  } catch (networkError) {
    throw new Error(\`Network error: \${networkError.message}. Check if the server is running.\`);
  }

  // Check Content-Type before attempting to parse
  const contentType = res.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    const body = await res.text();
    throw new Error(
      \`Expected JSON but got \${contentType || 'unknown content type'}. \` +
      \`Status: \${res.status}. \` +
      \`URL: \${res.url}. \` +
      \`Body preview: \${body.slice(0, 300)}\`
    );
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || \`HTTP \${res.status}\`);
  }

  return data;
}

// Usage:
try {
  const users = await fetchJSON('/api/users');
} catch (err) {
  // Error message includes the HTML body preview — instant diagnosis
  console.error(err.message);
}`}
      </CodeBlock>

      <CompareTable
        leftLabel="Cause"
        rightLabel="How to Fix"
        rows={[
          { label: 'Wrong URL (404)', left: 'API URL has typo — server returns 404 HTML', right: 'Check URL in Network tab. Add res.ok check before .json()' },
          { label: 'Auth redirect (302)', left: 'Session expired, redirected to /login', right: 'Check res.redirected and res.status === 401. Redirect to login explicitly.' },
          { label: 'Server crash (500)', left: 'API handler throws — Next.js returns HTML 500', right: 'Wrap handler in try/catch, always return Response.json() for errors' },
          { label: 'Proxy not configured', left: '/api/* hits frontend router, returns app HTML', right: 'Add rewrites to next.config.js or proxy in vite.config.ts' },
          { label: 'CORS preflight (OPTIONS)', left: 'Server returns HTML for OPTIONS requests', right: 'Add cors() middleware, handle OPTIONS, JSON error handler' },
          { label: 'CDN error page', left: 'Cloudflare/CloudFront returns its own HTML error', right: 'Check origin server health. Look for CDN server headers.' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'The error only happens in production, not locally. Why?',
          answer: 'Several common causes: (1) Different API URL — production uses a different base URL and the proxy configuration doesn\'t apply in prod. (2) CDN caching — Cloudflare or CloudFront may be caching an old error response. (3) Missing environment variable — the API URL env var is not set in production, defaulting to a wrong path. (4) Auth configuration differences — production session cookies may have stricter settings causing auth redirects. Check the production Network tab directly.',
        },
        {
          question: 'How do I check what the server actually returned?',
          answer: 'Two methods: (1) DevTools → Network tab → click the request → Response tab — see the raw body immediately. (2) Add this before .json(): const text = await res.text(); console.log(res.status, res.headers.get("content-type"), text.slice(0, 500)); — this lets you see the raw body before JSON parsing fails, and gives you status code and content type in the same call.',
        },
        {
          question: 'My API returns JSON sometimes and HTML other times. How do I handle that?',
          answer: 'Check Content-Type header before parsing: const ct = res.headers.get("content-type"); if (ct?.includes("application/json")) { return res.json(); } else { const html = await res.text(); throw new Error("Got HTML: " + html.slice(0, 200)); }. The root cause is usually a conditional redirect or error page — fix the server to always return JSON, or use the fetchJSON utility above which handles this automatically.',
        },
        {
          question: 'Can HTTPS/HTTP mismatch cause this?',
          answer: 'Yes — if your page is HTTPS and your API is HTTP, the browser blocks the request as "mixed content" and the fetch() call fails. The error may then trigger a catch block that tries to display an HTML error page. Upgrade your API server to HTTPS. In development, you can configure a localhost HTTPS certificate using mkcert to test HTTPS locally.',
        },
        {
          question: 'What does "Unexpected token u in JSON at position 0" mean?',
          answer: 'This means the response body was undefined or empty. The "u" is the start of "undefined". Common causes: (1) The response had no body (204 No Content) but you called .json(). (2) A network error occurred and the response object has no body. Fix: check res.status !== 204 before calling .json(), and handle network errors separately from HTTP errors.',
        },
        {
          question: 'How do I debug this in a React/Next.js app where I can\'t see the raw fetch?',
          answer: 'Use React Query or SWR\'s error logging: they surface the raw error message in the error object. Or add a global fetch interceptor: const originalFetch = window.fetch; window.fetch = async (...args) => { const res = await originalFetch(...args); if (!res.ok) { const clone = res.clone(); const body = await clone.text(); console.error("Fetch error:", res.status, res.url, body.slice(0, 500)); } return res; }; Add this in your app root during debugging.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
