'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
} from '@/components/blog/BlogVisuals';

export default function FixFailedToFetchErrorJavaScriptCorsHttpsNetworkClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Failed to Fetch" Error in JavaScript — CORS, HTTPS, and Network Issues</h1>
      <p className="lead">
        <code>TypeError: Failed to fetch</code> is a generic browser error that masks the real problem.
        It can mean CORS block, network offline, HTTPS mixed content, DNS failure, or server down.
        This guide covers every cause with a diagnostic checklist and specific fixes.
      </p>

      <StatGrid stats={[
        { value: '6+', label: 'possible root causes', color: 'red' },
        { value: 'CORS', label: 'most common in dev', color: 'amber' },
        { value: 'Network tab', label: 'diagnose in 30 seconds', color: 'blue' },
        { value: '100%', label: 'fixable once identified', color: 'green' },
      ]} />

      <AlertBox type="error" title="The error">
        TypeError: Failed to fetch
        — or in Firefox —
        TypeError: NetworkError when attempting to fetch resource.
      </AlertBox>

      <SectionHeader number={1} title="Diagnose in 30 Seconds" />
      <VerticalSteps steps={[
        { title: 'Open DevTools → Network tab', description: 'Reproduce the error. Find the failed request.' },
        { title: 'Check the Status column', description: 'Red with "(failed)" = browser blocked it. 4xx/5xx = server error. No entry = request never sent.' },
        { title: 'Check the Console', description: 'The console message after "Failed to fetch" often specifies CORS, mixed content, or SSL.' },
        { title: 'Check the request URL', description: 'Is it http:// on an https:// page? Is the URL correct? Is it localhost or a real domain?' },
        { title: 'Try curl from terminal', description: 'curl -v https://your-api/endpoint — if curl works but browser fails, it\'s CORS or browser security.', code: 'curl -v https://api.example.com/data' },
      ]} />

      <SectionHeader number={2} title="Cause 1 — CORS Policy" />
      <p>The most common cause in development. The browser blocks the response due to missing CORS headers.</p>

      <ErrorFix
        bad={`// Console: "blocked by CORS policy"
fetch('https://api.example.com/data')
  .then(r => r.json())
  .catch(e => console.error(e)); // "Failed to fetch"`}
        good={`// Server must add CORS headers (Express example):
app.use(cors({ origin: 'https://yourapp.com' }));

// Dev proxy workaround — route through same origin:
// next.config.js rewrites or vite.config.js proxy`}
        badLabel="CORS blocks response"
        goodLabel="Add CORS headers on server"
      />

      <SectionHeader number={3} title="Cause 2 — Mixed Content (HTTP on HTTPS)" />
      <AlertBox type="error" title="Mixed content error in console">
        Mixed Content: The page at 'https://yourapp.com' was loaded over HTTPS, but requested an insecure resource 'http://api.example.com'. This request has been blocked.
      </AlertBox>

      <ErrorFix
        bad={`// Page is HTTPS, API is HTTP → blocked
fetch('http://api.example.com/data') // ❌ http on https page`}
        good={`// Use HTTPS for your API
fetch('https://api.example.com/data') // ✅

// Or use an environment variable:
const API = process.env.NEXT_PUBLIC_API_URL; // set to https://...
fetch(\`\${API}/data\`)`}
        badLabel="HTTP API on HTTPS page"
        goodLabel="Upgrade to HTTPS"
      />

      <SectionHeader number={4} title="Cause 3 — Network / DNS Failure" />
      <p>The server is unreachable — wrong URL, server down, DNS not resolving, or user is offline.</p>

      <CodeBlock language="javascript" filename="Handle network failures gracefully">
{`async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err; // last attempt
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // backoff
    }
  }
}

// Detect offline:
window.addEventListener('offline', () => {
  showToast('You are offline. Please check your connection.');
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Cause 4 — AbortController / Request Cancelled" />
      <ErrorFix
        bad={`// Abort signal triggers "Failed to fetch"
const controller = new AbortController();
setTimeout(() => controller.abort(), 100); // too short

fetch('/api/slow-endpoint', { signal: controller.signal })
  .catch(e => console.error(e)); // AbortError: The operation was aborted`}
        good={`const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

fetch('/api/endpoint', { signal: controller.signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request timed out'); // handle separately
    } else {
      throw err;
    }
  })
  .finally(() => clearTimeout(timeout));`}
        badLabel="Too-short timeout causes abort"
        goodLabel="Handle AbortError separately"
      />

      <SectionHeader number={6} title="Cause 5 — SSL Certificate Error" />
      <p>
        Self-signed or expired SSL certificates cause browsers to block fetch requests with
        "Failed to fetch". This is common in local development with self-signed certs.
      </p>

      <CodeBlock language="bash" filename="Fix self-signed cert for local dev">
{`# Option 1: Use mkcert to create trusted local certificates
brew install mkcert
mkcert -install
mkcert localhost

# Option 2: Use http in local dev (never in production)
# Set NEXT_PUBLIC_API_URL=http://localhost:8000 for dev only

# Option 3: In Node.js fetch (not browser) — only for testing!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // ⚠️ never in production`}
      </CodeBlock>

      <SectionHeader number={7} title="Cause 6 — Request Blocked by Browser Extension or Firewall" />
      <AlertBox type="tip" title="Test in incognito mode">
        Open an incognito window (disables extensions) and retry. If the request works — an extension (ad blocker, VPN, privacy extension) is blocking it.
      </AlertBox>

      <CompareTable
        leftLabel="Symptom"
        rightLabel="Likely Cause"
        rows={[
          { label: 'No entry in Network tab', left: 'Request never sent', right: 'Code error, early return, extension blocking' },
          { label: 'Status: (failed), no CORS msg', left: 'Network/SSL/DNS error', right: 'Server down, wrong URL, cert error' },
          { label: 'Status: (failed) + CORS in console', left: 'CORS block', right: 'Add CORS headers on server' },
          { label: 'Mixed content in console', left: 'HTTP on HTTPS page', right: 'Upgrade API to HTTPS' },
          { label: 'Works in curl, fails in browser', left: 'Browser security policy', right: 'CORS, mixed content, or extension' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'How do I tell the difference between "Failed to fetch" causes?',
          answer: 'The console message after "Failed to fetch" usually tells you: "blocked by CORS policy" = CORS, "Mixed Content" = http/https mismatch, "ERR_NAME_NOT_RESOLVED" = DNS failure, "ERR_CONNECTION_REFUSED" = server not running, "AbortError" = you aborted the request.',
        },
        {
          question: 'My fetch works in Postman but fails in the browser. Why?',
          answer: 'Almost certainly CORS. Postman doesn\'t enforce CORS — it\'s a browser security feature. The fix is on the server: add Access-Control-Allow-Origin header. See our full CORS guide for backend-specific instructions.',
        },
        {
          question: 'Can an ad blocker cause "Failed to fetch"?',
          answer: 'Yes — ad blockers and privacy extensions (uBlock Origin, Privacy Badger) can block requests to certain domains or URL patterns. Test in incognito mode to rule this out.',
        },
        {
          question: 'How do I make fetch work offline / handle offline gracefully?',
          answer: 'Listen to the window "offline" event to detect connectivity loss. Use a service worker for offline caching. Show a user-friendly message instead of letting the fetch error propagate.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
