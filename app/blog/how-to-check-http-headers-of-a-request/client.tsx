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

export default function HowToCheckHttpHeadersClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Check HTTP Headers of Any Request (Browser, cURL &amp; Online Tool)</h1>
      <p className="lead">
        HTTP headers carry critical information that controls authentication, content negotiation,
        caching, CORS permissions, and security policies. When something breaks — a 401 error, a
        CORS block, a caching problem — the answer is almost always hiding in the headers. Here are
        4 concrete ways to check them, from beginner-friendly to power-user.
      </p>

      <StatGrid
        stats={[
          { value: '4 ways', label: 'To inspect HTTP headers', color: 'blue' },
          { value: '0 install', label: 'Required for browser method', color: 'green' },
          { value: 'Free', label: 'Online HTTP header analyzer', color: 'violet' },
        ]}
      />

      <SectionHeader number={1} title="How to Check HTTP Headers in Chrome DevTools" />
      <p>
        Chrome DevTools is the fastest way to inspect HTTP headers for any request your browser
        makes. It requires no installation and works on any website or API call. Every request and
        response header is captured automatically from the moment DevTools is open.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Open Chrome DevTools',
            desc: 'Press F12 (Windows/Linux) or Cmd+Option+I (Mac) on any page. You can also right-click anywhere and select "Inspect".',
          },
          {
            title: 'Go to the Network tab',
            desc: 'Click the "Network" tab at the top of the DevTools panel. If it is empty, reload the page — DevTools must be open before the request fires to capture it.',
          },
          {
            title: 'Click on any request',
            desc: 'Find the request you want to inspect in the list on the left. Click its name to open the detail panel. For API calls, filter by "Fetch/XHR" using the filter buttons.',
          },
          {
            title: 'Open the Headers panel',
            desc: 'Click the "Headers" sub-tab in the request detail panel. You will see two sections: Response Headers (what the server sent back) and Request Headers (what your browser sent).',
          },
        ]}
      />

      <CodeBlock lang="http" title="Example: Response Headers in Chrome DevTools">
{`HTTP/2 200 OK
content-type: application/json; charset=utf-8
cache-control: public, max-age=3600, s-maxage=86400
content-encoding: gzip
access-control-allow-origin: https://yourdomain.com
strict-transport-security: max-age=31536000; includeSubDomains
x-content-type-options: nosniff
x-frame-options: DENY
vary: Accept-Encoding, Origin
etag: "33a64df551425fcc55e4d42a148795d9f25f89d"`}
      </CodeBlock>

      <QuickFact color="blue" label="Pro tip">
        Use the filter bar at the top of the Headers panel to search for a specific header name.
        Type &quot;cache&quot; to find Cache-Control, or &quot;access&quot; to jump to CORS headers
        immediately without scrolling through dozens of entries.
      </QuickFact>

      <p>
        The &quot;View source&quot; toggle at the top of the Headers section shows the raw
        HTTP/1.1 or HTTP/2 format instead of the parsed key-value view — useful when you need to
        copy exact header values including capitalization.
      </p>

      <SectionHeader number={2} title="How to Check HTTP Headers with cURL" />
      <p>
        cURL is the standard command-line tool for making HTTP requests and inspecting headers
        without a browser. It works in any terminal and is pre-installed on macOS and most Linux
        distributions. Windows users can get it via WSL or the standalone binary.
      </p>

      <CodeBlock lang="bash" title="Check response headers only (HEAD request)">
{`# -I sends a HEAD request — fetches headers without downloading the body
curl -I https://example.com

# Output:
# HTTP/2 200
# content-encoding: gzip
# accept-ranges: bytes
# age: 408765
# cache-control: max-age=604800
# content-type: text/html; charset=UTF-8
# date: Mon, 13 Apr 2026 08:00:00 GMT
# etag: "3147526947"`}
      </CodeBlock>

      <CodeBlock lang="bash" title="Check full request AND response headers (verbose mode)">
{`# -v shows the full conversation: request headers sent + response headers received
curl -v https://example.com

# Lines starting with > are request headers you sent
# Lines starting with < are response headers you received
# Lines starting with * are cURL metadata (TLS, connection info)

# To suppress the body and only see headers:
curl -v -o /dev/null https://example.com 2>&1 | grep -E "^[<>*]"`}
      </CodeBlock>

      <CodeBlock lang="bash" title="Send custom request headers with cURL">
{`# Use -H to add request headers
curl -H "Authorization: Bearer eyJhbGc..." \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -v https://api.example.com/users

# Send POST with body and custom headers
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_token" \
     -d '{"name":"Alice"}' \
     -v https://api.example.com/users`}
      </CodeBlock>

      <ErrorFix
        title="Wrong vs correct cURL for header inspection"
        bad={`# This only shows the body — you see no headers
curl https://example.com`}
        good={`# -I for HEAD request (headers only, no body)
curl -I https://example.com

# -v for full verbose output (request + response headers)
curl -v https://example.com

# -D - to dump response headers to stdout (and still get body)
curl -D - https://example.com`}
        badLabel="Missing flags"
        goodLabel="Correct flags"
      />

      <SectionHeader number={3} title="How to Check HTTP Headers in Firefox" />
      <p>
        Firefox has a built-in Network Monitor that shows headers in a clean, structured format.
        The interface is slightly different from Chrome but equally powerful — and Firefox sometimes
        shows header information that Chrome&apos;s DevTools hides.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Open Firefox DevTools',
            desc: 'Press F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac). The DevTools panel opens at the bottom or side of the browser.',
          },
          {
            title: 'Go to the Network tab',
            desc: 'Click the "Network" tab. Firefox calls this the "Network Monitor". Reload the page to start capturing requests.',
          },
          {
            title: 'Find and click your request',
            desc: 'Click any request in the list. For API calls, use the "XHR" filter to narrow down fetch and XMLHttpRequest calls only.',
          },
          {
            title: 'View headers in the right panel',
            desc: 'The right panel shows "Headers", "Cookies", "Request", "Response", and "Timings" tabs. Click "Headers" to see the full request and response header breakdown.',
          },
          {
            title: 'Use the Raw Headers toggle',
            desc: 'Firefox has a "Raw" toggle that shows the exact HTTP wire format — useful for debugging HTTP/1.1 vs HTTP/2 differences.',
          },
        ]}
      />

      <AlertBox type="tip" title="Firefox advantage">
        Firefox&apos;s Network Monitor shows the <strong>security info panel</strong> which tells
        you the TLS version, cipher suite, and certificate details for each request — information
        not easily visible in Chrome DevTools.
      </AlertBox>

      <SectionHeader number={4} title="How to Analyze HTTP Headers Online (Without a Browser)" />
      <p>
        Sometimes you need to inspect headers from a server you can&apos;t open in your browser
        directly — a third-party API, a server behind a firewall, or a production endpoint you want
        to audit without triggering authentication flows. An online HTTP header analyzer solves this
        instantly.
      </p>

      <AlertBox type="tip" title="Free HTTP Headers Analyzer">
        Use the <a href="https://unblockdevs.com/http-headers-analyzer" target="_blank" rel="noopener noreferrer">UnblockDevs HTTP Headers Analyzer</a> to
        paste any response headers and instantly get a security grade (A+ to F), a list of missing
        headers, and a fix recommendation for each issue — no login required.
      </AlertBox>

      <VerticalSteps
        steps={[
          {
            title: 'Copy headers from DevTools or cURL',
            desc: 'In Chrome DevTools: right-click any response header → "Copy response headers". With cURL: run curl -I https://yoursite.com and copy the output.',
          },
          {
            title: 'Paste into the analyzer',
            desc: 'Go to unblockdevs.com/http-headers-analyzer and paste the raw headers into the input box. The analyzer accepts both HTTP/1.1 and HTTP/2 formats.',
          },
          {
            title: 'Get your security grade',
            desc: 'The analyzer grades headers from A+ (excellent) to F (critical issues). Each missing or misconfigured header is flagged with a clear explanation.',
          },
          {
            title: 'See exactly what is missing',
            desc: 'The analyzer checks for CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — and shows copy-paste fixes for each.',
          },
        ]}
      />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Content-Security-Policy',
            description: 'Prevents XSS attacks by controlling which scripts, styles, and resources can load.',
          },
          {
            title: 'Strict-Transport-Security',
            description: 'Forces HTTPS connections and prevents protocol downgrade attacks.',
          },
          {
            title: 'X-Frame-Options',
            description: 'Prevents your site from being embedded in iframes — stops clickjacking attacks.',
          },
          {
            title: 'X-Content-Type-Options',
            description: 'Prevents MIME-type sniffing — browsers must respect the declared Content-Type.',
          },
          {
            title: 'Referrer-Policy',
            description: 'Controls how much referrer information is sent to other sites when users navigate away.',
          },
          {
            title: 'Permissions-Policy',
            description: 'Controls which browser features (camera, mic, geolocation) the page can access.',
          },
        ]}
      />

      <SectionHeader number={5} title="How to Read HTTP Response Headers Correctly" />
      <p>
        Understanding what each header means is the key to debugging effectively. Here is a full
        annotated example of a real-world HTTP/2 response with all key headers explained.
      </p>

      <CodeBlock lang="http" title="Full annotated HTTP/2 200 response">
{`HTTP/2 200
# ↑ Protocol version + status code

content-type: application/json; charset=utf-8
# ↑ What format the body is in. charset=utf-8 prevents encoding bugs.
# Missing this → browser or client may misparse the body.

cache-control: public, max-age=3600, s-maxage=86400
# ↑ How long to cache: 1 hour in browser, 24 hours in CDN.
# "no-store" = never cache. "no-cache" = revalidate every time.

authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
# ↑ NOT in response headers — this goes in REQUEST headers.
# Response may include WWW-Authenticate if auth is required.

access-control-allow-origin: https://yourdomain.com
# ↑ CORS: only this origin can read the response.
# "*" = any origin (but blocks credentials).

access-control-allow-credentials: true
# ↑ Required if sending cookies or Authorization headers cross-origin.

strict-transport-security: max-age=31536000; includeSubDomains; preload
# ↑ HSTS: force HTTPS for 1 year across all subdomains.

x-content-type-options: nosniff
# ↑ Tells browser not to sniff the MIME type — prevents type confusion attacks.

x-frame-options: DENY
# ↑ Blocks this page from loading in any iframe.

content-encoding: gzip
# ↑ Body is compressed. Browser decompresses automatically.

vary: Accept-Encoding, Origin
# ↑ Cache must store separate versions per encoding and origin.

etag: "33a64df551425fcc55e4d42a148795d9f25f89d"
# ↑ Content fingerprint for conditional requests (304 Not Modified).`}
      </CodeBlock>

      <p>
        The table below summarizes the most important headers for day-to-day debugging:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Header</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Direction</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">What it controls</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Missing = problem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Content-Type</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Both</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Body format (JSON, HTML, etc.)</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Body misparse, 415 error</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Cache-Control</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Response</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Caching rules for browser/CDN</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Stale data served</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Authorization</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Request</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Auth credentials (Bearer token)</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">401 Unauthorized</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Access-Control-Allow-Origin</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Response</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">CORS permission for browser reads</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">CORS block in browser</td>
            </tr>
          </tbody>
        </table>
      </div>

      <FAQAccordion
        items={[
          {
            question: 'How do I check HTTP headers of a request in Chrome without DevTools?',
            answer:
              'You can use a browser extension like "ModHeader" or "HTTP Header Live" to see request and response headers in a popup without opening DevTools. Alternatively, copy the request as cURL from DevTools and paste it into an online HTTP header analyzer to see the response headers without a local tool.',
          },
          {
            question: 'How do I analyze HTTP headers online for free?',
            answer:
              'Use the UnblockDevs HTTP Headers Analyzer at unblockdevs.com/http-headers-analyzer. Paste any set of HTTP response headers and get an instant security grade (A+ to F), a list of missing or misconfigured security headers, and copy-paste fixes. No login or installation required.',
          },
          {
            question: 'How do I view response headers from an API request?',
            answer:
              'Three methods: (1) Chrome/Firefox DevTools → Network tab → click the API call → Headers tab → Response Headers section. (2) cURL with -v flag: curl -v https://api.example.com — response headers appear on lines starting with "<". (3) Paste the raw headers into an online analyzer for a structured view.',
          },
          {
            question: 'How do I see headers in the browser for a cross-origin request?',
            answer:
              'CORS restricts which response headers JavaScript can read. By default, only "simple" headers are exposed to JS code. To expose custom headers (like X-Request-Id), the server must include them in the Access-Control-Expose-Headers response header. In DevTools, you can always see all headers regardless of CORS restrictions — CORS only affects what your JavaScript code can read.',
          },
          {
            question: 'What is the difference between request headers and response headers?',
            answer:
              'Request headers are sent by the client (browser, cURL, app) to the server with each HTTP request. They carry auth credentials, content negotiation preferences, and client metadata (Authorization, Content-Type, Accept, User-Agent). Response headers are sent by the server back to the client. They carry content info, caching rules, CORS permissions, and security policies (Content-Type, Cache-Control, Access-Control-Allow-Origin, Strict-Transport-Security).',
          },
          {
            question: 'How do I use an HTTP header viewer tool to debug CORS issues?',
            answer:
              'Check the response headers for the failing request. CORS issues are caused by missing or incorrect response headers on the server side. Look for Access-Control-Allow-Origin (must match your page origin), Access-Control-Allow-Methods (must include the HTTP method you are using), and Access-Control-Allow-Headers (must include any custom headers you send). If these are missing, add them to your server configuration. Use the HTTP Headers Analyzer to paste the response headers and get a clear CORS report.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
