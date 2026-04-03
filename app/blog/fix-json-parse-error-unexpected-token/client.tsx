'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixJsonParseErrorUnexpectedTokenClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Unexpected token" JSON.parse Error — All Causes Explained</h1>
      <p className="lead">
        <code>SyntaxError: Unexpected token &lt; in JSON at position 0</code> is one of the most
        common API errors in JavaScript. It almost always means you received HTML instead of JSON —
        usually an error page, redirect, or maintenance page. This guide explains every cause and how
        to diagnose them fast using DevTools, covers fixes for wrong URLs, auth errors, server crashes,
        CORS responses, and misconfigured server responses, plus a universal safe fetch utility that
        gives you clear error messages instead of the cryptic "Unexpected token" crash.
      </p>

      <StatGrid stats={[
        { value: 'HTML', label: 'what you actually received instead of JSON', color: 'red' },
        { value: 'Position 0', label: 'first character is wrong — usually < from DOCTYPE', color: 'amber' },
        { value: '6 causes', label: 'wrong URL, auth error, server crash, redirect, CORS, proxy', color: 'blue' },
        { value: 'Network tab', label: 'always check raw response in DevTools first', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What the Error Actually Means" />
      <QuickFact color="red" label="The core issue">
        JSON cannot start with <code>&lt;</code>. When you see "Unexpected token &lt;", the response
        body starts with <code>&lt;!DOCTYPE html&gt;</code> or <code>&lt;html&gt;</code> — it's an
        HTML page, not JSON. This happens when the server returns an error page, login page, redirect,
        or proxy response instead of your API data. The fix is never in how you parse — it's in why
        the wrong content was returned.
      </QuickFact>

      <AlertBox type="error" title="Common error message variants across browsers">
        {`SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON  — Chrome 87+\n`}
        {`SyntaxError: Unexpected token < in JSON at position 0  — Chrome <87, Node.js\n`}
        {`SyntaxError: JSON Parse error: Unrecognized token '<'  — Safari\n`}
        {`SyntaxError: JSON.parse: unexpected character at line 1 column 1  — Firefox\n`}
        {`SyntaxError: Unexpected token 'u' in JSON at position 0  — likely "undefined" being parsed`}
      </AlertBox>

      <SectionHeader number={2} title="Diagnose First — Check the Raw Response in 60 Seconds" />
      <VerticalSteps steps={[
        { title: 'Open DevTools Network tab', desc: 'Press F12 (Windows/Linux) or Cmd+Option+I (Mac). Click the "Network" tab. Check "Preserve log" to keep requests across page navigations.' },
        { title: 'Reproduce the error', desc: 'Refresh the page or perform the action that triggers the error. Find the failing API request in the list (filter by "XHR/Fetch" to reduce noise).' },
        { title: 'Check the Status Code', desc: '301/302 = redirect (wrong URL or HTTP→HTTPS). 401/403 = auth required. 404 = wrong URL. 500/502/503 = server error. 200 with HTML = misconfigured server.' },
        { title: 'View raw response', desc: 'Click the request → "Response" tab. You\'ll see the raw body — likely HTML. Read the HTML content: it tells you exactly what happened (login page, error page, maintenance page).' },
        { title: 'Check Content-Type header', desc: 'Click the request → "Headers" tab. Look at the Response Headers. A properly configured JSON API returns: Content-Type: application/json. Getting text/html confirms you received HTML.' },
      ]} />

      <SectionHeader number={3} title="Cause 1 — Wrong URL (404 HTML Page)" />
      <ErrorFix
        title="Always check response.ok before parsing JSON"
        bad={`// ❌ Typo in URL → 404 HTML page returned, parsed as JSON
const res = await fetch('/api/usres'); // typo: "usres" instead of "users"
const data = await res.json();
// ❌ res.json() tries to parse "<!DOCTYPE html><html>..." as JSON
// → SyntaxError: Unexpected token < in JSON at position 0`}
        good={`// ✅ Always check response.ok (status 200-299) before parsing
const res = await fetch('/api/users');

if (!res.ok) {
  // Read as text first to see what the server actually returned
  const errorText = await res.text();
  console.error(\`API Error \${res.status} \${res.statusText}:\`, errorText.slice(0, 300));
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}

const data = await res.json(); // ✅ only parse if status is 2xx

// Even better — check Content-Type too:
const contentType = res.headers.get('content-type') ?? '';
if (!contentType.includes('application/json')) {
  const text = await res.text();
  throw new Error(\`Expected JSON but got \${contentType}: \${text.slice(0, 200)}\`);
}`}
        badLabel="No status check → cryptic parse crash"
        goodLabel="Check res.ok before parsing — log actual error"
      />

      <SectionHeader number={4} title="Cause 2 — Auth Required (401/403 Returns Login Page)" />
      <ErrorFix
        title="Include auth headers and handle 401 explicitly"
        bad={`// ❌ Missing auth token → server redirects to login page (HTML)
const res = await fetch('/api/dashboard/stats');
const data = await res.json(); // ❌ got "<html>Login Required</html>"`}
        good={`// ✅ Include Authorization header and handle 401 specifically
const token = localStorage.getItem('authToken');

if (!token) {
  // Don't even make the request if we know we're not authenticated
  window.location.href = '/login';
  return;
}

const res = await fetch('/api/dashboard/stats', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',  // Tell server you want JSON
  }
});

if (res.status === 401) {
  // Token expired or invalid — redirect to login
  localStorage.removeItem('authToken');
  window.location.href = '/login';
  return;
}

if (res.status === 403) {
  throw new Error('Access denied — insufficient permissions');
}

if (!res.ok) throw new Error(\`API error: \${res.status}\`);

const data = await res.json(); // ✅`}
        badLabel="No auth header → HTML login page returned"
        goodLabel="Include Authorization header + handle 401/403 explicitly"
      />

      <SectionHeader number={5} title="Cause 3 — Server Error (500 Returns HTML Error Page)" />
      <ErrorFix
        title="Check Content-Type before parsing"
        bad={`// ❌ Server throws exception → returns HTML 500 error page
const res = await fetch('/api/process-payment', {
  method: 'POST',
  body: JSON.stringify(paymentData)
  // ❌ Missing Content-Type header — server may return HTML error
});
const data = await res.json(); // ❌ got Apache/nginx HTML error page`}
        good={`// ✅ Include Content-Type + Accept + check response before parsing
const res = await fetch('/api/process-payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // Tell server we're sending JSON
    'Accept': 'application/json',        // Tell server we want JSON back
  },
  body: JSON.stringify(paymentData)
});

// Read as text first — works for any content type
const text = await res.text();

if (!res.ok) {
  // Try to parse as JSON error, fall back to text
  try {
    const errorData = JSON.parse(text);
    throw new Error(errorData.message ?? \`HTTP \${res.status}\`);
  } catch {
    throw new Error(\`HTTP \${res.status}: \${text.slice(0, 200)}\`);
  }
}

// Verify it's actually JSON before parsing
let data;
try {
  data = JSON.parse(text);
} catch {
  throw new Error(\`Response is not valid JSON: \${text.slice(0, 200)}\`);
}

return data; // ✅`}
        badLabel="Missing Content-Type + no content-type check"
        goodLabel="Include headers + read as text first + parse safely"
      />

      <SectionHeader number={6} title="Cause 4 — HTTP to HTTPS Redirect" />
      <ErrorFix
        title="Always use HTTPS for API calls"
        bad={`// ❌ HTTP URL → server redirects to HTTPS (returns 301 HTML redirect page)
// fetch follows the redirect but may lose POST body
const res = await fetch('http://api.example.com/data'); // should be https://
const data = await res.json(); // ❌ redirect response is HTML`}
        good={`// ✅ Always use HTTPS
const res = await fetch('https://api.example.com/data');

// Debug redirect behavior with:
const res2 = await fetch('https://api.example.com/data', {
  redirect: 'follow',  // default: follow redirects automatically
  // redirect: 'error'    — throws on any redirect (useful for debugging)
  // redirect: 'manual'   — don't follow, get 301/302 response
});

// To detect if you were redirected:
if (res.redirected) {
  console.warn('Request was redirected to:', res.url);
}`}
        badLabel="HTTP causes redirect to HTTPS — parse error"
        goodLabel="Use HTTPS + configure redirect handling"
      />

      <SectionHeader number={7} title="Cause 5 — CORS Preflight Failure Returns Non-JSON" />
      <ErrorFix
        title="CORS errors return opaque responses that aren't JSON"
        bad={`// ❌ Cross-origin request without proper CORS headers
// Server returns CORS error response (sometimes HTML, sometimes empty)
const res = await fetch('https://api.other-domain.com/data', {
  method: 'POST',
  body: JSON.stringify(data)
  // ❌ No credentials config, server may return CORS error page
});
const result = await res.json(); // ❌ CORS error is not JSON`}
        good={`// ✅ Configure CORS properly
const res = await fetch('https://api.other-domain.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(data),
  // Only add credentials: 'include' if API actually requires cookies:
  // credentials: 'include',
  // mode: 'cors', // default for cross-origin
});

// CORS errors appear in browser console (not res.status):
// "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
// Fix these on the SERVER by adding:
// Access-Control-Allow-Origin: https://your-frontend.com
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type, Authorization`}
        badLabel="CORS error returns non-JSON response"
        goodLabel="Fix CORS on server + configure fetch correctly"
      />

      <SectionHeader number={8} title="Universal Safe Fetch Utility" />
      <CodeBlock lang="javascript" title="safeFetch — clear errors instead of cryptic Unexpected token">
{`// ─── safeFetch — handles all causes of "Unexpected token" ────────────────────
async function safeFetch(url, options = {}) {
  let res;

  try {
    res = await fetch(url, {
      headers: {
        'Accept': 'application/json',  // Always request JSON
        ...options.headers,
      },
      ...options,
    });
  } catch (networkError) {
    // Network failure (DNS, connection refused, timeout)
    throw new Error(\`Network error fetching \${url}: \${networkError.message}\`);
  }

  // Read body as text — works regardless of content type
  const text = await res.text();
  const contentType = res.headers.get('content-type') ?? '';

  if (!res.ok) {
    // Try to extract a meaningful error from JSON error response
    if (contentType.includes('application/json')) {
      try {
        const errorData = JSON.parse(text);
        const message = errorData.message ?? errorData.error ?? errorData.detail;
        throw new Error(message ?? \`HTTP \${res.status}: \${res.statusText}\`);
      } catch (parseErr) {
        if (parseErr.message !== text) throw parseErr; // re-throw meaningful errors
      }
    }
    // Non-JSON error body — include snippet for debugging
    throw new Error(
      \`HTTP \${res.status} \${res.statusText} from \${url}.\\n\` +
      \`Response body: \${text.slice(0, 300)}\`
    );
  }

  // Success but not JSON — configuration problem
  if (!contentType.includes('application/json')) {
    throw new Error(
      \`Expected JSON from \${url} but got Content-Type: \${contentType}.\\n\` +
      \`Body preview: \${text.slice(0, 200)}\`
    );
  }

  // Safe to parse — we know it's JSON and status is OK
  try {
    return JSON.parse(text);
  } catch (parseErr) {
    throw new Error(
      \`Invalid JSON from \${url}: \${parseErr.message}.\\n\` +
      \`Body preview: \${text.slice(0, 200)}\`
    );
  }
}

// ─── Usage ────────────────────────────────────────────────────────────────────
const users = await safeFetch('/api/users');
const product = await safeFetch('/api/products/123');
const created = await safeFetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData),
});`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        { title: 'Check Network tab first', description: 'Before debugging code, check DevTools Network tab → click the failing request → Response tab. The raw body tells you everything: is it HTML? What kind of error page? This takes 10 seconds and identifies 90% of causes.' },
        { title: 'Add Accept: application/json header', description: 'Some servers return HTML by default and JSON only when requested. Adding Accept: application/json to all fetch calls signals your intent and may change the server\'s response format for error cases.' },
        { title: 'Check if URL is correct', description: 'Console.log the full URL you\'re fetching before the request. Check for double slashes (/api//users), missing segments, wrong environment variables (dev API URL in production), or HTTP instead of HTTPS.' },
        { title: 'Verify server-side error handling', description: 'API routes should always return JSON, even for errors. In Express.js: app.use((err, req, res, next) => res.status(500).json({ error: err.message })). In Next.js: return Response.json({ error }, { status: 500 }) in API routes.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does the error say "position 0"?',
          answer: 'Position 0 means the very first character of the response is invalid for JSON. HTML pages start with < (from <!DOCTYPE html>), which is not valid JSON syntax — JSON must start with {, [, ", a number, or the literals true/false/null. If the position is something other than 0 (e.g., position 100), the beginning was valid JSON but then something went wrong — often a server that started sending JSON then crashed mid-response and appended an error page.',
        },
        {
          question: 'How do I fix this in a Next.js API route?',
          answer: 'Ensure your API route always returns JSON, even for errors: return Response.json({ error: "message" }, { status: 500 }). Never let unhandled exceptions propagate to the default Next.js HTML error handler. Wrap your handler body in try/catch and return JSON error responses from the catch block. Never use res.send("<html>...") in an API route — always use res.json() or Response.json().',
        },
        {
          question: 'What if the API is third-party and I can\'t fix the server?',
          answer: 'Use the safeFetch wrapper above which reads as text first and provides clear error messages. Add content-type checking: if (!contentType.includes(\'application/json\')) { handle gracefully }. Implement retry logic for 5xx errors (exponential backoff with 2-3 retries). If the third-party API intermittently returns HTML maintenance pages, cache the last successful response and serve it as a fallback during outages.',
        },
        {
          question: 'Can this error come from a proxy or CDN?',
          answer: 'Yes — a common cause. If your CDN (CloudFront, Cloudflare) or reverse proxy (nginx, Apache) encounters an error serving your API, it may return its own HTML error page before your API server even sees the request. Signs: the error occurs on production but not in local development. Fix: check CDN/proxy logs, ensure your CDN correctly passes application/json content-type, and configure your CDN to forward JSON error responses from the origin rather than generating its own HTML errors.',
        },
        {
          question: 'Why does adding Accept: application/json header sometimes fix the error?',
          answer: 'Some servers use content negotiation — they return different formats based on the Accept header. Without Accept: application/json, a server configured for content negotiation may return HTML (its default "human-readable" error format). With the header, the same server returns JSON error objects. This is common with web frameworks like Rails, Django REST Framework, and Laravel which serve HTML error pages to browsers and JSON errors to API clients based on the Accept header.',
        },
        {
          question: 'What does "Unexpected token u in JSON at position 0" mean?',
          answer: '"u" at position 0 means you\'re passing the string "undefined" to JSON.parse() — which happens when you call JSON.parse(undefined) (note: not the string "undefined", the actual undefined value). JavaScript coerces undefined to the string "undefined" before passing it to JSON.parse. Common cause: const data = JSON.parse(someVar) where someVar was never assigned. Fix: check the value before parsing — if (!someVar) return fallback; JSON.parse(someVar).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
