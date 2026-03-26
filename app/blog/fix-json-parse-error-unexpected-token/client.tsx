'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixJsonParseErrorUnexpectedTokenClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected token" JSON.parse Error — All Causes Explained</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected token &lt; in JSON at position 0</code> is one of the most
        common API errors in JavaScript. It almost always means you received HTML instead of JSON —
        usually an error page or redirect. This guide explains every cause and how to diagnose them.
      </p>

      <StatGrid stats={[
        { value: 'HTML', label: 'what you actually received instead of JSON', color: 'red' },
        { value: 'Position 0', label: 'first character is wrong — often &lt; from HTML', color: 'amber' },
        { value: '5 causes', label: 'wrong URL, auth error, server crash, redirect, CORS', color: 'blue' },
        { value: 'Network tab', label: 'always check raw response in DevTools first', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What the Error Actually Means" />
      <QuickFact>
        JSON cannot start with <code>&lt;</code>. When you see "Unexpected token &lt;", the response
        body starts with <code>&lt;!DOCTYPE html&gt;</code> or <code>&lt;html&gt;</code> — it's an
        HTML page, not JSON. This happens when the server returns an error page, login page, or
        redirect instead of your API data.
      </QuickFact>

      <AlertBox type="error" title="Common error variants">
        {`SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON\n`}
        {`SyntaxError: Unexpected token < in JSON at position 0\n`}
        {`SyntaxError: JSON Parse error: Unrecognized token '<'`}
      </AlertBox>

      <SectionHeader number={2} title="Diagnose First — Check the Raw Response" />
      <VerticalSteps steps={[
        { title: 'Open DevTools Network tab', description: 'Press F12 → Network tab. Find your API request.' },
        { title: 'Click the request', description: 'Click on the failing API call in the list.' },
        { title: 'Check Response tab', description: 'Switch to "Response" tab. You\'ll see the raw body — likely HTML.' },
        { title: 'Check Status code', description: 'If status is 301/302 (redirect), 401/403 (auth), 404, or 500 — that\'s your root cause.' },
        { title: 'Read the HTML response', description: 'The HTML page content tells you exactly what happened: login required, not found, server error, etc.' },
      ]} />

      <SectionHeader number={3} title="Cause 1 — Wrong URL (404 Page)" />
      <ErrorFix
        bad={`// Typo in API URL → 404 HTML page returned
const res = await fetch('/api/usres'); // typo: "usres" not "users"
const data = await res.json(); // ❌ parses 404 HTML as JSON → Unexpected token <`}
        good={`// Always check response.ok before parsing JSON
const res = await fetch('/api/users');

if (!res.ok) {
  const text = await res.text(); // read as text to see error
  console.error('API error:', res.status, text);
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}

const data = await res.json(); // ✅ only parse if response is OK`}
        badLabel="No status check → parse crash"
        goodLabel="Check res.ok first"
      />

      <SectionHeader number={4} title="Cause 2 — Auth Required (401 Login Page)" />
      <ErrorFix
        bad={`// Missing auth token → server returns login redirect HTML
const res = await fetch('/api/dashboard/stats');
const data = await res.json(); // ❌ got login page HTML`}
        good={`// Include auth token in request headers
const token = localStorage.getItem('authToken');

const res = await fetch('/api/dashboard/stats', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  }
});

if (res.status === 401) {
  // Redirect to login instead of crashing
  window.location.href = '/login';
  return;
}

const data = await res.json(); // ✅`}
        badLabel="No auth header"
        goodLabel="Include auth + handle 401"
      />

      <SectionHeader number={5} title="Cause 3 — Server Error (500 Error Page)" />
      <ErrorFix
        bad={`// Server crashes → returns HTML error page
const res = await fetch('/api/process-payment', {
  method: 'POST',
  body: JSON.stringify(paymentData)
});
const data = await res.json(); // ❌ server threw exception, returned 500 HTML`}
        good={`const res = await fetch('/api/process-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(paymentData)
});

// Check content-type before parsing
const contentType = res.headers.get('content-type');
if (!contentType?.includes('application/json')) {
  const text = await res.text();
  throw new Error(\`Expected JSON, got: \${text.substring(0, 200)}\`);
}

const data = await res.json(); // ✅`}
        badLabel="No content-type check"
        goodLabel="Verify content-type header first"
      />

      <SectionHeader number={6} title="Cause 4 — Redirect (301/302)" />
      <ErrorFix
        bad={`// HTTP → HTTPS redirect returns HTML
const res = await fetch('http://api.example.com/data'); // should be https://
const data = await res.json(); // ❌ got redirect HTML`}
        good={`// Always use HTTPS for API calls
const res = await fetch('https://api.example.com/data');

// Or configure fetch to follow redirects (default is 'follow')
const res2 = await fetch('https://api.example.com/data', {
  redirect: 'follow' // follows redirects automatically (default)
  // redirect: 'error' — throws if redirect occurs (useful for debugging)
});

const data = await res2.json(); // ✅`}
        badLabel="HTTP instead of HTTPS"
        goodLabel="Use HTTPS, configure redirect handling"
      />

      <SectionHeader number={7} title="Universal Safe JSON Parse Wrapper" />
      <CodeBlock language="javascript" filename="safeFetch utility">
{`async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    let errorDetail = '';
    if (contentType.includes('application/json')) {
      const errData = await res.json();
      errorDetail = JSON.stringify(errData);
    } else {
      errorDetail = await res.text();
    }
    throw new Error(\`HTTP \${res.status} \${res.statusText}: \${errorDetail.substring(0, 200)}\`);
  }

  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(\`Expected JSON response, got \${contentType}: \${text.substring(0, 100)}\`);
  }

  return res.json();
}

// Usage — clear error messages instead of cryptic "Unexpected token <"
const data = await safeFetch('/api/users');`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Why does the error say "position 0"?',
          answer: 'Position 0 means the very first character of the response is invalid JSON. HTML pages start with < (from <!DOCTYPE html>), which is not valid JSON syntax. If the position is something else (like position 100), the first part was valid JSON but then something went wrong — often a truncated response or server sending extra HTML after the JSON.',
        },
        {
          question: 'How do I fix this in a Next.js API route?',
          answer: 'Ensure your API route always returns JSON, even for errors: return Response.json({ error: "message" }, { status: 500 }). Never let unhandled exceptions propagate — wrap your handler in try/catch and return JSON error responses. Never use res.send("<html>") in an API route.',
        },
        {
          question: 'What if the API is third-party and I can\'t fix it?',
          answer: 'Use a try/catch around the JSON parse, and fall back to reading the response as text for debugging. Add content-type checking as shown above. If the third-party API intermittently returns HTML, implement retry logic for 5xx errors.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
