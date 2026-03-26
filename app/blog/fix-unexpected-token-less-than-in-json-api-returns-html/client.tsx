'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected Token &lt;" in JSON — Why Your API Is Returning HTML</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected token '&lt;', "&lt;!DOCTYPE "... is not valid JSON</code> — this error
        means your API returned an HTML page instead of JSON. The angle bracket is the start of an HTML tag.
        This guide explains every reason why this happens and how to fix each one.
      </p>

      <StatGrid stats={[
        { value: '&lt;', label: 'start of HTML — not JSON', color: 'red' },
        { value: '5+', label: 'root causes covered', color: 'blue' },
        { value: '404/500', label: 'most common: error page returned', color: 'amber' },
        { value: '2 min', label: 'to diagnose with DevTools', color: 'green' },
      ]} />

      <AlertBox type="error" title="The exact error">
        SyntaxError: Unexpected token '&lt;', "&lt;!DOCTYPE html&gt;..." is not valid JSON
        — or —
        SyntaxError: Unexpected token '&lt;' in JSON at position 0
      </AlertBox>

      <SectionHeader number={1} title="Why This Happens" />
      <p>
        You called <code>response.json()</code> but the server returned an HTML page — not JSON.
        The HTML starts with <code>&lt;!DOCTYPE html&gt;</code> or <code>&lt;html&gt;</code> or
        an error template. JSON parsing immediately fails on the first <code>&lt;</code> character.
      </p>

      <QuickFact>
        The server's response is the source of truth. The error is <strong>never in your JSON parsing code</strong> —
        it's in what the server sent back. Always inspect the raw response in the Network tab first.
      </QuickFact>

      <FlowDiagram steps={[
        { label: 'fetch("/api/data")', color: 'blue' },
        { label: 'Server returns HTML (error page)', color: 'red' },
        { label: 'You call response.json()', color: 'amber' },
        { label: 'JSON.parse("<!DOCTYPE...") → SyntaxError', color: 'red' },
      ]} />

      <SectionHeader number={2} title="Step 1 — Inspect the Raw Response" />
      <p>Open DevTools → Network tab → click the failing request → Response tab. You'll see the actual HTML.</p>

      <VerticalSteps steps={[
        { title: 'Open Chrome DevTools (F12)', description: 'Go to the Network tab before triggering the request.' },
        { title: 'Find your API request', description: 'Look for the XHR/Fetch request. It will likely show a red status.' },
        { title: 'Click Response tab', description: 'Read the raw response body. You\'ll see exactly what HTML was returned.' },
        { title: 'Note the status code', description: '404 = route not found. 500 = server error. 302 = redirect to login. 503 = server down.' },
      ]} />

      <SectionHeader number={3} title="Cause 1 — Wrong URL / 404 Error Page" />
      <ErrorFix
        bad={`// Typo in URL → server returns 404 HTML page
fetch('/api/usres')          // ❌ typo: 'usres'
  .then(res => res.json())   // parses the 404 HTML → error`}
        good={`// Correct URL
fetch('/api/users')
  .then(async res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  })`}
        badLabel="Wrong URL returns 404 HTML"
        goodLabel="Check res.ok before parsing"
      />

      <SectionHeader number={4} title="Cause 2 — Auth Redirect (302 to Login Page)" />
      <p>
        If your API requires authentication and the session expired, the server may redirect to
        <code>/login</code>. The browser follows the redirect and returns the login page HTML.
      </p>

      <ErrorFix
        bad={`// Session expired → redirected to /login → HTML returned
fetch('/api/dashboard/data', {
  credentials: 'include', // sends expired cookie
})
  .then(res => res.json()) // parses login page HTML → error`}
        good={`fetch('/api/dashboard/data', { credentials: 'include' })
  .then(async res => {
    if (res.redirected || res.url.includes('/login')) {
      window.location.href = '/login'; // handle expired session
      return;
    }
    if (!res.ok) throw new Error(\`\${res.status} \${res.statusText}\`);
    return res.json();
  })`}
        badLabel="Silently follows auth redirect"
        goodLabel="Detect and handle redirect"
      />

      <SectionHeader number={5} title="Cause 3 — Server Error Page (500)" />
      <p>
        If the server crashes while handling the request, it returns a 500 error page in HTML.
        This is common in Next.js API routes when there's an unhandled exception.
      </p>

      <CodeBlock language="javascript" filename="Next.js API Route — Always return JSON errors">
{`// app/api/users/route.ts
export async function GET() {
  try {
    const users = await db.users.findMany();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    // Return JSON error — not an HTML 500 page
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Cause 4 — Development Proxy Misconfiguration" />
      <p>
        In dev, if your API proxy isn't configured correctly, requests to <code>/api/*</code> return
        the frontend's HTML (the React app's 404 page) instead of being forwarded to the backend.
      </p>

      <CodeBlock language="javascript" filename="Next.js next.config.js — fix API proxy">
{`// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // your backend
      },
    ];
  },
};`}
      </CodeBlock>

      <SectionHeader number={7} title="Cause 5 — CORS Preflight Returns HTML" />
      <p>
        If your server returns an HTML error for OPTIONS preflight requests, the JSON request will also fail.
        Check the Network tab for a red OPTIONS request before your actual request.
      </p>

      <SectionHeader number={8} title="Safe fetch Wrapper — Always Use This" />
      <CodeBlock language="javascript" filename="Robust fetch helper">
{`async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);

  // Check content-type before parsing
  const contentType = res.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    const body = await res.text();
    throw new Error(
      \`Expected JSON but got \${contentType}. Status: \${res.status}. Body: \${body.slice(0, 200)}\`
    );
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || \`HTTP \${res.status}\`);
  }

  return res.json();
}

// Usage:
const data = await fetchJSON('/api/users');`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'The error only happens in production, not locally. Why?',
          answer: 'Your production server might have a different routing config, a missing route, or a different auth setup. Check the production API URL in the network tab — it might be hitting a CDN or load balancer that returns HTML for unknown routes.',
        },
        {
          question: 'How do I check what the server actually returned?',
          answer: 'DevTools → Network tab → click the request → Response tab. Or add this before .json(): const text = await res.text(); console.log(text.slice(0, 500)); — this lets you see the raw body before JSON parsing fails.',
        },
        {
          question: 'My API returns JSON sometimes and HTML other times. How do I handle that?',
          answer: 'Check the Content-Type header: if (res.headers.get("content-type")?.includes("application/json")) { return res.json(); } else { const html = await res.text(); throw new Error("Got HTML: " + html.slice(0, 200)); }',
        },
        {
          question: 'Can HTTPS/HTTP mismatch cause this?',
          answer: 'Yes — if your page is HTTPS and your API is HTTP, the browser blocks it as mixed content and your catch block may receive a failed fetch that falls through to an HTML error page. Upgrade both to HTTPS.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
