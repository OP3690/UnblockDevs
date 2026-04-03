'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToFixCorsPolicyErrorClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix CORS Policy Error in JavaScript — Every Scenario Covered</h1>
      <p className="lead">
        "Access to fetch at '…' has been blocked by CORS policy" — this error stops more developers cold than
        almost any other. This guide covers every CORS scenario: browser fetch, Axios, local dev, production,
        proxies, and specific backend fixes for Node, Python, PHP, and more.
      </p>

      <StatGrid
        stats={[
          { value: '#1', label: 'most Googled JS network error', color: 'red' },
          { value: '3', label: 'lines to fix on most backends', color: 'green' },
          { value: '100%', label: 'server-side fix required', color: 'blue' },
          { value: '5 min', label: 'to understand CORS fully', color: 'purple' },
        ]}
      />

      <AlertBox type="error" title="The classic CORS error">
        Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000' has been
        blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      </AlertBox>

      <SectionHeader number={1} title="Why CORS Exists" />
      <p>
        Browsers enforce the <strong>Same-Origin Policy</strong>: JavaScript can only make requests to the
        same origin (scheme + host + port) as the page it's running on. CORS (Cross-Origin Resource Sharing)
        is the mechanism that lets servers <em>opt in</em> to allow cross-origin requests.
      </p>

      <QuickFact color="blue" label="Key insight">
        CORS is enforced by the <strong>browser</strong>, not the server. The server receives the request just fine.
        The browser blocks the JavaScript from accessing the response if the server doesn't send the right headers.
      </QuickFact>

      <KeyPointsGrid items={[
        { title: 'Same-origin means identical scheme + host + port', description: 'http://localhost:3000 and http://localhost:4000 are different origins. https://example.com and http://example.com are different. Subdomains count: api.example.com vs example.com is cross-origin.' },
        { title: 'The request still reaches the server', description: 'CORS does NOT prevent the request from being sent. The server processes it and responds. The browser then checks the response headers and decides whether to expose the data to JavaScript.' },
        { title: 'CORS is browser-only', description: 'curl, Postman, and server-to-server requests are not subject to CORS. Only browser-based JavaScript is restricted. This is why Postman works but your frontend gets blocked.' },
        { title: 'It is always a server-side fix', description: 'You cannot fully fix CORS from the frontend. The server must add the appropriate headers. The only frontend workaround is proxying requests through the same origin.' },
      ]} />

      <SectionHeader number={2} title="The Fix: Add Headers on Your Server" />
      <p>The server must include <code>Access-Control-Allow-Origin</code> in its response:</p>

      <CodeBlock language="http" filename="required-cors-headers.http">
{`# Minimum (allows specific origin):
Access-Control-Allow-Origin: http://localhost:3000

# Or allow all origins (public APIs only):
Access-Control-Allow-Origin: *

# For requests with cookies/auth:
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
# Note: cannot use * with credentials!`}
      </CodeBlock>

      <SectionHeader number={3} title="Fix by Backend Framework" />

      <CodeBlock language="javascript" filename="express-cors.js">
{`const cors = require('cors');

// Quick fix: allow all origins (dev only)
app.use(cors());

// Production fix: specific origins
app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // remove if not using cookies
}));

// Handle preflight for all routes
app.options('*', cors());`}
      </CodeBlock>

      <CodeBlock language="python" filename="fastapi-cors.py">
{`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`}
      </CodeBlock>

      <CodeBlock language="python" filename="django-cors.py">
{`# 1. Install: pip install django-cors-headers
# 2. settings.py:

INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must be first!
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "https://myapp.com",
    "http://localhost:3000",
]

# Or allow all (dev only):
CORS_ALLOW_ALL_ORIGINS = True`}
      </CodeBlock>

      <CodeBlock language="go" filename="go-cors.go">
{`func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "https://myapp.com")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        next.ServeHTTP(w, r)
    })
}`}
      </CodeBlock>

      <CodeBlock language="php" filename="cors.php">
{`<?php
header("Access-Control-Allow-Origin: https://myapp.com");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}`}
      </CodeBlock>

      <CodeBlock language="nginx" filename="nginx-cors.conf">
{`server {
    location /api/ {
        add_header 'Access-Control-Allow-Origin' 'https://myapp.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Length' 0;
            return 204;
        }

        proxy_pass http://localhost:8000;
    }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Fix for Local Development (Proxy)" />
      <p>
        During development, the easiest fix is to proxy requests through your frontend dev server —
        this makes the browser think everything is on the same origin.
      </p>

      <CodeBlock language="javascript" filename="next.config.js">
{`/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },
};

// Now call /api/users instead of http://localhost:8000/users`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="vite.config.js">
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

      <CodeBlock language="json" filename="package.json">
{`{
  "proxy": "http://localhost:8000"
}
// All unrecognized requests now proxy to your backend`}
      </CodeBlock>

      <SectionHeader number={5} title="Fix for Axios" />
      <p>
        Axios sends requests the same way as fetch, so the CORS headers still need to be set on the server.
        But there are Axios-specific settings for credentials:
      </p>

      <ErrorFix
        bad={`// Cookies not sent with Axios by default
axios.get('https://api.example.com/profile')`}
        good={`// Include credentials (for session cookies)
axios.get('https://api.example.com/profile', {
  withCredentials: true,
})

// Or globally for all requests:
axios.defaults.withCredentials = true;`}
        badLabel="No credentials"
        goodLabel="Credentials enabled"
      />

      <SectionHeader number={6} title="Preflight Requests — The Hidden CORS Issue" />
      <p>
        "Non-simple" requests trigger an automatic OPTIONS preflight. If your server doesn't handle OPTIONS,
        the real request never fires.
      </p>

      <AlertBox type="info" title="What triggers a preflight?">
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Custom headers like <code>Authorization</code></li>
          <li>• Methods other than GET, HEAD, POST</li>
          <li>• Content-Type other than text/plain, multipart/form-data, application/x-www-form-urlencoded</li>
          <li>• <code>Content-Type: application/json</code> also triggers preflight</li>
        </ul>
      </AlertBox>

      <ErrorFix
        bad={`// Server returns 405 for OPTIONS — preflight fails
app.post('/api/data', handler);
// No OPTIONS handler → frontend fetch never completes`}
        good={`// Handle preflight explicitly
app.options('/api/data', cors()); // or:
app.options('*', cors());  // all routes

// Or use the cors() middleware globally before all routes
app.use(cors(corsOptions));
app.post('/api/data', handler);`}
        badLabel="No OPTIONS handler"
        goodLabel="OPTIONS handled"
      />

      <SectionHeader number={7} title="CORS with Cookies Checklist" />

      <VerticalSteps
        steps={[
          {
            title: 'Set credentials: "include" in fetch (or withCredentials: true in Axios)',
            desc: 'Without this setting, cookies are never sent cross-origin. The browser strips them silently. Always set explicitly when your API depends on session cookies.',
          },
          {
            title: 'Set Access-Control-Allow-Credentials: true on server',
            desc: 'The server must explicitly opt in to credentials. If this header is missing, the browser rejects the response even if the data is present.',
          },
          {
            title: 'Use explicit origin (NOT wildcard *)',
            desc: 'The CORS spec forbids using * when credentials are enabled. The server must respond with the exact requesting origin (e.g., https://myapp.com), not a wildcard.',
          },
          {
            title: 'Set SameSite=None; Secure on the cookie',
            desc: 'Modern browsers require SameSite=None; Secure for cookies sent cross-origin. Without this, cookies are silently dropped. Requires HTTPS — won\'t work on HTTP.',
          },
          {
            title: 'Verify your backend echoes the Origin header dynamically',
            desc: 'For multi-origin setups, check the incoming Origin header on the server and echo back that specific origin in Access-Control-Allow-Origin. Hardcoding one origin breaks other legitimate clients.',
          },
        ]}
      />

      <SectionHeader number={8} title="CORS Headers Comparison" />
      <CompareTable
        leftLabel="Simple Requests (no preflight)"
        rightLabel="Preflighted Requests"
        rows={[
          { label: 'Methods allowed', left: 'GET, HEAD, POST only', right: 'Any method (PUT, DELETE, PATCH, etc.)' },
          { label: 'Headers allowed', left: 'Only standard headers', right: 'Any custom header (Authorization, X-Custom, etc.)' },
          { label: 'Content-Type', left: 'text/plain, form-encoded, multipart', right: 'application/json and anything else' },
          { label: 'Preflight sent', left: 'No — request goes directly', right: 'Yes — OPTIONS request sent first' },
          { label: 'Server must handle', left: 'Just the actual request', right: 'OPTIONS + the actual request' },
          { label: 'Example', left: 'fetch(\'/api\', { method: \'GET\' })', right: 'fetch(\'/api\', { method: \'POST\', headers: { \'Authorization\': \'Bearer ...\' } })' },
        ]}
      />

      <CompareTable
        leftLabel="Access-Control-Allow-Origin: *"
        rightLabel="Access-Control-Allow-Origin: specific"
        rows={[
          { label: 'Use case', left: 'Public APIs, CDN assets, open data', right: 'Authenticated APIs, private data' },
          { label: 'Works with credentials', left: '❌ No — spec forbids it', right: '✅ Yes — required for cookie auth' },
          { label: 'Security level', left: 'Low — any site can read the response', right: 'High — only listed origins allowed' },
          { label: 'Browser support', left: '✅ All browsers', right: '✅ All browsers' },
          { label: 'Multiple origins', left: 'N/A — already allows all', right: 'Must check + echo Origin dynamically' },
        ]}
      />

      <SectionHeader number={9} title="Debugging CORS Step by Step" />
      <VerticalSteps
        steps={[
          {
            title: 'Open DevTools Network tab and reproduce the error',
            desc: 'Find the failing request. Check if the response has the Access-Control-Allow-Origin header. If the header is absent, the fix is entirely on the server. If it\'s present but wrong, check the value.',
          },
          {
            title: 'Check if there is a preflight OPTIONS request',
            desc: 'In the Network tab, filter for "OPTIONS" requests. If the preflight returned a non-200 response or is missing headers, fix the OPTIONS handler on your server first.',
          },
          {
            title: 'Test the API directly with curl',
            desc: 'Run: curl -H "Origin: http://localhost:3000" -I https://api.example.com/data. If Access-Control-Allow-Origin is in the curl response, the server is configured. If not, the server needs fixing.',
          },
          {
            title: 'Check for proxy/load balancer stripping headers',
            desc: 'Sometimes CORS headers are added by the application but stripped by a reverse proxy (Nginx, CloudFront, etc.). Verify headers at each layer with curl --verbose.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Can I fix CORS from the frontend without changing the server?',
            answer: 'Not directly. The browser enforces CORS based on server response headers. The only frontend workaround is routing requests through a same-origin proxy (like Next.js rewrites or Vite proxy) so the browser never makes a cross-origin request in the first place.',
          },
          {
            question: 'Is it safe to use Access-Control-Allow-Origin: *?',
            answer: 'For fully public APIs (no auth, no sensitive data) — yes. For any authenticated API or API returning private data — no. Use specific allowed origins instead, because * with credentials is also forbidden by the spec.',
          },
          {
            question: 'Why does my API return 200 but I still get a CORS error?',
            answer: 'The server handled the request successfully, but the CORS headers are missing from the response. The browser receives the response but blocks JavaScript from accessing it. The fix: add the CORS headers to your server response.',
          },
          {
            question: 'My CORS works in development but not production. Why?',
            answer: 'Your allowed origins list probably includes localhost but not your production domain. Update your server\'s CORS config to include your production frontend URL.',
          },
          {
            question: 'What is the difference between simple and preflighted requests?',
            answer: 'Simple requests (GET/HEAD/POST with no custom headers, standard Content-Type) go directly. Any other request triggers a preflight OPTIONS request first. If the server doesn\'t respond correctly to OPTIONS, the actual request is blocked.',
          },
          {
            question: 'Why does CORS work in Postman but not in the browser?',
            answer: 'Postman is not a browser and doesn\'t enforce the Same-Origin Policy. It sends requests directly without CORS checks. This is intentional — it\'s a developer tool. Only browser-based JavaScript is subject to CORS restrictions.',
          },
          {
            question: 'How do I allow multiple specific origins for CORS?',
            answer: 'The Access-Control-Allow-Origin header can only contain one value — you cannot list multiple. The standard pattern is to check the incoming Origin header against a whitelist and echo it back: const allowed = ["https://app.com", "https://staging.app.com"]; if (allowed.includes(req.headers.origin)) { res.header("Access-Control-Allow-Origin", req.headers.origin); }',
          },
          {
            question: 'Can CORS errors cause security vulnerabilities?',
            answer: 'Misconfigured CORS can create serious vulnerabilities. Using wildcard (*) with sensitive data allows any website to read your API responses. Dynamically setting Access-Control-Allow-Origin to whatever origin the request claims (without validation) is dangerous — always validate against a whitelist. Never allow null as an origin — it can be spoofed.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
