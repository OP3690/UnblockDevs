'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FixFailedToFetchErrorJavaScriptCorsHttpsNetworkClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Failed to Fetch" Error in JavaScript — CORS, HTTPS, and Network Issues</h1>
      <p className="lead">
        <code>TypeError: Failed to fetch</code> is a generic browser error that masks the real problem.
        It can mean CORS block, network offline, HTTPS mixed content, DNS failure, SSL certificate error,
        or server down. This guide covers every cause with a diagnostic checklist and specific fixes
        for each scenario.
      </p>

      <StatGrid stats={[
        { value: '6+', label: 'possible root causes covered', color: 'red' },
        { value: 'CORS', label: 'most common cause in development', color: 'amber' },
        { value: 'Network tab', label: 'diagnose in 30 seconds', color: 'blue' },
        { value: '100%', label: 'fixable once the cause is identified', color: 'green' },
      ]} />

      <AlertBox type="error" title="The error message">
        TypeError: Failed to fetch
        — or in Firefox —
        TypeError: NetworkError when attempting to fetch resource.
        — or in Safari —
        TypeError: Load failed
      </AlertBox>

      <SectionHeader number={1} title="Diagnose in 30 Seconds" />
      <VerticalSteps steps={[
        { title: 'Open DevTools → Network tab', desc: 'Reproduce the error with DevTools open. Find the failed request. It will show in red or as "(failed)" in the Status column.' },
        { title: 'Read the Status column', desc: 'Red "(failed)" with no status code = browser blocked it before the server. 4xx/5xx status code = server received it and returned an error. No entry at all = request was never sent (code error or extension blocking).' },
        { title: 'Read the Console message', desc: 'The console message immediately after "Failed to fetch" usually specifies the cause: "blocked by CORS policy", "Mixed Content", "ERR_NAME_NOT_RESOLVED", "ERR_CONNECTION_REFUSED", or "SSL_ERROR".' },
        { title: 'Check the request URL', desc: 'Is it http:// on an https:// page? Is the hostname correct? Is it localhost when you\'re on a deployed domain? URL misconfiguration causes 40%+ of these errors.' },
        { title: 'Try the same URL in curl', desc: 'Run: curl -v https://your-api/endpoint. If curl succeeds but browser fails, it\'s a browser security restriction (CORS, mixed content, or extension) rather than a server issue.' },
        { title: 'Test in incognito mode', desc: 'Open an incognito/private window which disables browser extensions. If the request succeeds in incognito, an extension (ad blocker, VPN, privacy tool) is the cause.' },
      ]} />

      <QuickFact color="blue" label="The key insight">
        "Failed to fetch" is a browser-level error thrown when the fetch() call itself cannot complete.
        The browser logs the real cause in the console — always read the full console error, not just
        the first line. The Network tab shows you what actually happened to the request.
      </QuickFact>

      <SectionHeader number={2} title="Cause 1 — CORS Policy Block" />
      <p>The most common cause in development. The browser blocks the response because the server did not include the required CORS headers. Note: the request often does reach the server — the browser blocks the response.</p>

      <ErrorFix
        bad={`// Console shows: "blocked by CORS policy: No 'Access-Control-Allow-Origin' header"
fetch('https://api.example.com/data')
  .then(r => r.json())
  .catch(e => console.error(e)); // "Failed to fetch"

// IMPORTANT: The request DID reach the server.
// The browser blocked reading the response.`}
        good={`// Fix 1: Add CORS headers on the server (Express):
const cors = require('cors');
app.use(cors({
  origin: 'https://yourapp.com',  // specific origin (not *)
  credentials: true,               // if using cookies
}));

// Fix 2: Dev proxy — route through same origin (no CORS needed):
// next.config.js:
rewrites: () => [{ source: '/api/:p*', destination: 'http://localhost:8000/api/:p*' }]

// Fix 3: Add OPTIONS handler for preflight:
app.options('*', cors()); // handle preflight for all routes`}
        badLabel="No CORS headers → browser blocks response"
        goodLabel="Add CORS headers on server or use a proxy"
      />

      <SectionHeader number={3} title="Cause 2 — Mixed Content (HTTP on HTTPS Page)" />
      <AlertBox type="error" title="Mixed content error in console">
        Mixed Content: The page at 'https://yourapp.com' was loaded over HTTPS, but requested an insecure resource 'http://api.example.com/data'. This request has been blocked; the content must be served over HTTPS.
      </AlertBox>

      <ErrorFix
        bad={`// Your page is HTTPS but API is HTTP → blocked by browser
fetch('http://api.example.com/data')  // ❌ http on https page
  .then(r => r.json())
  // TypeError: Failed to fetch`}
        good={`// Fix 1: Use HTTPS for your API
fetch('https://api.example.com/data')  // ✅

// Fix 2: Use environment variable (set to https:// in production)
const API = process.env.NEXT_PUBLIC_API_URL; // "https://api.example.com"
fetch(\`\${API}/data\`)

// Fix 3: If you can't upgrade the API to HTTPS, use a reverse proxy
// Put Nginx/Cloudflare in front to terminate SSL`}
        badLabel="http:// API URL on https:// page"
        goodLabel="Upgrade API to HTTPS"
      />

      <SectionHeader number={4} title="Cause 3 — Network / DNS Failure" />
      <p>The server is unreachable — wrong URL, server down, DNS not resolving, or user is offline. The request never makes it to the server.</p>

      <CodeBlock language="javascript" filename="Handle network failures and offline state gracefully">
{`// Detect which type of network error occurred
async function fetchWithDiagnosis(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return res;
  } catch (err) {
    if (!navigator.onLine) {
      throw new Error('You are offline. Please check your internet connection.');
    }

    // Check if it's a DNS failure vs. server down
    if (err.message.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error(\`Cannot resolve hostname: \${new URL(url).hostname}\`);
    }
    if (err.message.includes('ERR_CONNECTION_REFUSED')) {
      throw new Error(\`Server is not running at: \${url}\`);
    }

    throw err; // Re-throw unknown errors
  }
}

// Retry with exponential backoff:
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i))); // 1s, 2s, 4s
      console.log(\`Retry \${i + 1}/\${retries} after network error...\`);
    }
  }
}

// Listen for online/offline events:
window.addEventListener('offline', () => showToast('You are offline.'));
window.addEventListener('online', () => showToast('Back online — retrying...'));`}
      </CodeBlock>

      <SectionHeader number={5} title="Cause 4 — Request Cancelled by AbortController" />
      <ErrorFix
        bad={`// Timeout set too short — request aborted before completing
const controller = new AbortController();
setTimeout(() => controller.abort(), 100); // 100ms is too short!

fetch('/api/slow-endpoint', { signal: controller.signal })
  .catch(e => console.error(e)); // AbortError treated same as "Failed to fetch"`}
        good={`// Handle AbortError separately from network errors
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10_000); // 10 seconds

fetch('/api/endpoint', { signal: controller.signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      showError('Request timed out after 10 seconds. Please try again.');
      return null;  // handle gracefully
    }
    throw err;  // re-throw non-abort errors
  })
  .finally(() => clearTimeout(timeoutId));`}
        badLabel="AbortError indistinguishable from network errors"
        goodLabel="Check err.name === 'AbortError' separately"
      />

      <SectionHeader number={6} title="Cause 5 — SSL Certificate Error" />
      <p>
        Self-signed or expired SSL certificates cause browsers to block fetch requests.
        This is common in local development and staging environments with self-signed certificates.
      </p>

      <CodeBlock language="bash" filename="Fix SSL certificate for local development">
{`# Option 1: mkcert — create trusted local certificates (recommended)
# macOS:
brew install mkcert
mkcert -install          # install local CA into system trust store
mkcert localhost 127.0.0.1  # generate cert trusted by your browser

# Use the cert in your dev server (e.g., Next.js):
# NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" next dev

# Option 2: Use HTTP in local dev only (add HTTPS in production)
# .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# .env.production:
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Option 3: In Node.js server-side fetch only (NEVER in browser/production):
# process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  # ⚠️ insecure!`}
      </CodeBlock>

      <SectionHeader number={7} title="Cause 6 — Browser Extension or Firewall Blocking" />
      <AlertBox type="tip" title="Quick test: incognito mode">
        Open an incognito/private window (disables all extensions) and retry the request. If it works
        in incognito but fails in your normal window — a browser extension is the cause. Common culprits:
        uBlock Origin, Privacy Badger, CORS Unblock, VPN extensions, and corporate security proxies.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Ad blocker blocking API domain', description: 'Tracking protection lists sometimes block analytics APIs, A/B testing endpoints, or any URL containing "track", "analytics", or "pixel". Whitelist your domain in the extension settings.' },
        { title: 'VPN extension', description: 'VPN extensions can block or reroute requests to certain IPs. Some corporate VPNs block outbound requests to non-approved domains.' },
        { title: 'CORS Unblock / Allow CORS extension', description: 'Ironically, "CORS Unblock" extensions sometimes cause "Failed to fetch" by modifying request headers in a way that confuses the server. Disable it and fix CORS properly on the server.' },
        { title: 'Browser security policies', description: 'Chrome\'s COEP/COOP headers or Firefox security settings can block certain cross-origin requests. Check for "ERR_BLOCKED_BY_RESPONSE" in the Network tab.' },
      ]} />

      <SectionHeader number={8} title="Quick Diagnostic Reference" />
      <CompareTable
        leftLabel="Symptom in Network Tab"
        rightLabel="Likely Cause and Fix"
        rows={[
          { label: 'No entry at all', left: 'Request was never sent', right: 'Code error (conditional guard), or extension blocking before network' },
          { label: 'Status: (failed), no CORS msg', left: 'Network/SSL/DNS error', right: 'Server down, wrong URL, cert error — try curl to confirm' },
          { label: 'Status: (failed) + CORS in console', left: 'CORS policy block', right: 'Add Access-Control-Allow-Origin header on server' },
          { label: 'Mixed content error in console', left: 'HTTP API on HTTPS page', right: 'Change API URL to https://' },
          { label: 'Works in curl, fails in browser', left: 'Browser security policy', right: 'CORS, mixed content, or extension — check each in order' },
          { label: 'Works in incognito, fails normally', left: 'Browser extension blocking', right: 'Identify and disable extensions one by one' },
          { label: 'AbortError in catch block', left: 'Request cancelled by timeout', right: 'Increase timeout or check if component unmounted' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'How do I tell the difference between "Failed to fetch" causes?',
          answer: 'Read the full console error after "TypeError: Failed to fetch": "blocked by CORS policy" = CORS, add server headers. "Mixed Content" = http/https mismatch, upgrade to https. "ERR_NAME_NOT_RESOLVED" = DNS failure, check the hostname. "ERR_CONNECTION_REFUSED" = server not running on that port. "AbortError" = you called controller.abort() or request timed out. "SSL_ERROR_UNKNOWN_CA" = untrusted SSL certificate. Each message maps to a specific fix.',
        },
        {
          question: 'My fetch works in Postman but fails in the browser. Why?',
          answer: 'Almost certainly CORS. Postman is not a browser and does not enforce CORS — it\'s a browser-only security feature. The request reaches the server successfully in both cases; the browser just blocks reading the response if the CORS headers are missing. Fix: add Access-Control-Allow-Origin header on your server. See cause 1 above for Express, Next.js, and nginx examples.',
        },
        {
          question: 'Can an ad blocker cause "Failed to fetch"?',
          answer: 'Yes — ad blockers and privacy extensions (uBlock Origin, Privacy Badger, Ghostery) can block fetch requests to certain domains or URL patterns. They intercept at the browser level before the network request is made, which produces a "Failed to fetch" error with no Network tab entry. Test in incognito to rule this out. If confirmed, either whitelist your domain in the extension or configure the extension to allow your API domain.',
        },
        {
          question: 'How do I make fetch work offline / handle offline gracefully?',
          answer: 'Three layers: (1) Detect offline before fetching: if (!navigator.onLine) { showError("Offline"); return; }. (2) Listen for online/offline events: window.addEventListener("offline", handler). (3) Use a Service Worker with the Workbox library to cache API responses and serve them when offline. For React apps: libraries like React Query and SWR have built-in online/offline handling and will retry failed requests automatically when connection is restored.',
        },
        {
          question: 'What is the difference between CORS and CSRF?',
          answer: 'CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts which origins can read API responses — it\'s a defense against malicious sites reading your API data. CSRF (Cross-Site Request Forgery) is an attack where a malicious site tricks an authenticated user\'s browser into making unwanted requests. They\'re different problems: CORS prevents reading unauthorized responses; CSRF tokens prevent unauthorized state-changing requests. Both can cause fetch errors if not configured correctly.',
        },
        {
          question: 'How do I fix CORS for a Next.js API route?',
          answer: 'For Next.js App Router API routes, add CORS headers in the response: return new Response(JSON.stringify(data), { headers: { "Access-Control-Allow-Origin": "https://yourapp.com", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" } }); Also add an OPTIONS handler for preflight: export async function OPTIONS() { return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", ... } }); } Or use a middleware.ts that adds CORS headers to all API routes globally.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
