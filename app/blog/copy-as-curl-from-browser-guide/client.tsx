'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function CopyAsCurlFromBrowserGuideClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="Copy as cURL from Browser: Complete Guide 2026"
      description="Learn how to use Copy as cURL in Chrome, Firefox, Edge, and Safari DevTools to reproduce any HTTP request from the terminal."
    >
      <h1>Copy as cURL from Browser: Complete Guide 2026</h1>
      <p className="lead">
        Every modern browser's DevTools Network panel has a hidden superpower: <strong>Copy as cURL</strong>. In one right-click you get a perfectly reproduced command that replays any HTTP request — complete with headers, cookies, and request body — directly from your terminal. This guide covers every browser, every use case, and every way to turn that copied curl command into production-ready code.
      </p>

      <StatGrid stats={[
        { value: '1-click', label: 'to copy any browser request', color: 'blue' },
        { value: '100%', label: 'headers and cookies preserved', color: 'green' },
        { value: '5', label: 'major browsers supported', color: 'purple' },
        { value: '10x', label: 'faster than manual API recreation', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is 'Copy as cURL'?" />

      <p>
        When your browser makes an HTTP request, it includes dozens of headers: authentication cookies, CSRF tokens, Accept-Encoding preferences, session identifiers, and more. Recreating all of these manually is tedious and error-prone.
      </p>
      <p>
        <strong>Copy as cURL</strong> is a DevTools feature that serializes the complete HTTP request (method, URL, all headers, cookies, and body) into a single curl command that you can paste into your terminal and get identical results to what the browser received.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'API debugging', description: 'Reproduce an authenticated API call outside the browser to inspect responses with jq or save them to a file.' },
        { title: 'Bug reporting', description: 'Share an exact reproduction of a failing network request with a backend engineer or support team.' },
        { title: 'Automation scripting', description: 'Use the copied curl as a starting point for shell scripts, CI health checks, or load tests.' },
        { title: 'Code generation', description: 'Paste into a curl-to-code converter to generate Python, JavaScript, Go, or any language SDK call.' },
      ]} />

      <SectionHeader number={2} title="How to Copy as cURL in Chrome" />

      <VerticalSteps steps={[
        {
          title: 'Open DevTools',
          description: 'Press F12 (Windows/Linux) or Cmd+Option+I (macOS). Alternatively right-click on the page and select "Inspect".',
        },
        {
          title: 'Go to the Network tab',
          description: 'Click the "Network" tab in the DevTools panel. If no requests are showing, reload the page with DevTools open.',
        },
        {
          title: 'Find the request',
          description: 'Click on the API request you want to reproduce. Use the filter bar to search by URL or filter by "Fetch/XHR" to show only API calls.',
        },
        {
          title: 'Right-click and copy',
          description: 'Right-click on the request row. Hover over "Copy". You will see several options.',
        },
        {
          title: 'Choose your format',
          description: 'Select "Copy as cURL (bash)" for Unix/macOS/Linux or "Copy as cURL (cmd)" for Windows Command Prompt.',
        },
      ]} />

      <AlertBox type="info" title="Chrome Copy options explained">
        Chrome offers multiple copy formats: <strong>Copy as cURL (bash)</strong> uses single-quoted strings and backslash line continuations (Unix-compatible). <strong>Copy as cURL (cmd)</strong> uses Windows CMD syntax with double quotes and carets. Always use bash format for scripts, CI/CD, and piping to jq.
      </AlertBox>

      <SectionHeader number={3} title="How to Copy as cURL in Firefox, Edge, and Safari" />

      <CompareTable
        leftLabel="Browser"
        rightLabel="Steps"
        rows={[
          { label: 'Firefox', left: 'Firefox', right: 'F12 → Network tab → right-click request → "Copy Value" → "Copy as cURL"' },
          { label: 'Edge', left: 'Edge (Chromium)', right: 'F12 → Network tab → right-click → Copy → "Copy as cURL (bash)"' },
          { label: 'Safari', left: 'Safari', right: 'Develop → Show Web Inspector → Network → right-click → "Copy as cURL"' },
          { label: 'Brave', left: 'Brave', right: 'Same as Chrome (Chromium-based)' },
          { label: 'Arc', left: 'Arc', right: 'Same as Chrome (Chromium-based)' },
        ]}
      />

      <AlertBox type="tip" title="Enable Safari Developer menu">
        Safari hides Developer Tools by default. Enable them at Safari → Preferences → Advanced → check "Show Develop menu in menu bar". Then Develop → Show Web Inspector.
      </AlertBox>

      <SectionHeader number={4} title="Anatomy of a Copied cURL Command" />

      <p>Understanding what each part does helps you modify the command for your specific needs.</p>

      <CodeBlock language="bash" filename="copied-curl-example.sh">{`curl 'https://api.example.com/v2/users/me' \\
  -H 'authority: api.example.com' \\
  -H 'accept: application/json, text/plain, */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiJ9...' \\
  -H 'content-type: application/json' \\
  -H 'cookie: session_id=abc123; csrf_token=xyz789' \\
  -H 'origin: https://app.example.com' \\
  -H 'referer: https://app.example.com/dashboard' \\
  -H 'sec-ch-ua: "Chromium";v="122"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-fetch-dest: empty' \\
  -H 'sec-fetch-mode: cors' \\
  -H 'sec-fetch-site: same-site' \\
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' \\
  --compressed`}</CodeBlock>

      <KeyPointsGrid columns={2} items={[
        { title: 'authority header', description: 'HTTP/2 pseudo-header indicating the host. Safe to remove if the server does not require it.' },
        { title: 'authorization header', description: 'Your Bearer token or session credential. This is what lets the request succeed — keep it secret.' },
        { title: 'cookie header', description: 'Session cookies from the browser. These often expire — the curl will stop working when cookies expire.' },
        { title: 'sec-fetch-* headers', description: 'Browser security metadata. Most APIs ignore these. Safe to remove when cleaning up scripts.' },
        { title: '--compressed flag', description: 'Tells curl to accept gzip/deflate-encoded responses and decompress them. Usually safe to keep.' },
        { title: 'referer / origin', description: 'Some APIs validate these for CSRF protection. If removing them breaks the request, put them back.' },
      ]} />

      <SectionHeader number={5} title="Cleaning Up the Copied Command" />

      <p>
        Copied curl commands are verbose. For production scripts, strip browser-specific headers that the API does not need.
      </p>

      <ErrorFix
        bad={`# Raw copied curl — overly verbose, fragile, leaks browser fingerprint
curl 'https://api.example.com/users' \\
  -H 'authority: api.example.com' \\
  -H 'accept: */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'authorization: Bearer $TOKEN' \\
  -H 'sec-ch-ua: "Chromium";v="122"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-ch-ua-platform: "macOS"' \\
  -H 'sec-fetch-dest: empty' \\
  -H 'sec-fetch-mode: cors' \\
  -H 'sec-fetch-site: same-site' \\
  -H 'user-agent: Mozilla/5.0 ...' \\
  --compressed`}
        good={`# Cleaned curl — minimal, portable, uses environment variable for token
curl -sS \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Accept: application/json" \\
  "https://api.example.com/users" \\
  | jq`}
        badLabel="Raw copied (fragile)"
        goodLabel="Cleaned up (portable)"
      />

      <SectionHeader number={6} title="Handling Cookies and Sessions" />

      <QuickFact>Cookies in copied curl commands expire when the browser session ends. For long-running scripts, use API tokens instead of cookie-based auth.</QuickFact>

      <VerticalSteps steps={[
        {
          title: 'Short-lived testing (OK to use cookies)',
          description: 'If you just need to test a request right now, the copied command with cookies will work for minutes to hours.',
          code: `# Paste and run immediately — cookies are still valid
curl 'https://app.example.com/api/data' \\
  -H 'cookie: session=abc123' \\
  | jq '.data'`,
        },
        {
          title: 'Save cookies to file for reuse',
          description: 'Use curl -c to write cookies and -b to read them back on subsequent requests.',
          code: `# Save cookies during login
curl -sS -c /tmp/cookies.txt -X POST \\
  -d '{"email":"user@example.com","password":"secret"}' \\
  "https://app.example.com/api/auth/login" | jq

# Reuse cookies in subsequent requests
curl -sS -b /tmp/cookies.txt "https://app.example.com/api/me" | jq`,
        },
        {
          title: 'Prefer API tokens for scripts',
          description: 'Most APIs offer API keys or OAuth tokens that do not expire hourly. Use these for any automation.',
          code: `export API_TOKEN=$(curl -sS -X POST \\
  -d '{"email":"user@example.com","password":"secret"}' \\
  "https://app.example.com/api/auth/token" | jq -r '.token')

curl -sS -H "Authorization: Bearer $API_TOKEN" \\
  "https://app.example.com/api/data" | jq`,
        },
      ]} />

      <SectionHeader number={7} title="Converting Copied cURL to Other Languages" />

      <p>Once you have a working curl command, you often want to convert it to Python, JavaScript, or another language for use in a codebase.</p>

      <CodeBlock language="bash" filename="original-curl.sh">{`# Original copied curl
curl 'https://api.github.com/repos/octocat/hello-world' \\
  -H 'Authorization: Bearer ghp_abc123' \\
  -H 'Accept: application/vnd.github+json'`}</CodeBlock>

      <CodeBlock language="python" filename="converted-python.py">{`# Converted to Python requests
import requests

headers = {
    'Authorization': 'Bearer ghp_abc123',
    'Accept': 'application/vnd.github+json',
}

response = requests.get(
    'https://api.github.com/repos/octocat/hello-world',
    headers=headers
)
data = response.json()
print(data['stargazers_count'])`}</CodeBlock>

      <CodeBlock language="javascript" filename="converted-fetch.js">{`// Converted to JavaScript fetch
const response = await fetch('https://api.github.com/repos/octocat/hello-world', {
  headers: {
    'Authorization': 'Bearer ghp_abc123',
    'Accept': 'application/vnd.github+json',
  },
});
const data = await response.json();
console.log(data.stargazers_count);`}</CodeBlock>

      <SectionHeader number={8} title="Common Issues and Fixes" />

      <AlertBox type="warning" title="CSRF tokens expire">
        Many web apps embed CSRF tokens in request headers or bodies. The token captured in a copied curl will be single-use or time-limited. If your reproduced request returns 403 Forbidden, the CSRF token has expired.
      </AlertBox>

      <CompareTable
        leftLabel="Problem"
        rightLabel="Solution"
        rows={[
          { label: '401 Unauthorized', left: '401 Unauthorized', right: 'Session token or cookie has expired. Redo the login flow and copy again.' },
          { label: '403 Forbidden', left: '403 Forbidden', right: 'CSRF token expired or IP restriction active. Try refreshing and copying again.' },
          { label: '404 Not Found', left: '404 Not Found', right: 'Check the URL — query parameters may be URL-encoded differently in the shell.' },
          { label: 'Empty response', left: 'Empty response', right: 'Missing Accept header. Add -H "Accept: application/json".' },
          { label: 'Works in browser, fails in curl', left: 'Works in browser', right: 'A required cookie or header is missing. Compare using -v flag and browser Network headers.' },
          { label: 'Garbled output', left: 'Garbled output', right: 'Response is gzip-encoded. Add --compressed to the curl command.' },
        ]}
      />

      <SectionHeader number={9} title="Copy as Fetch: The JavaScript Alternative" />

      <p>
        Chrome and Firefox also offer <strong>Copy as Fetch</strong>, which generates a <code>fetch()</code> call instead of curl. This is useful when you want to reproduce the request in a Node.js script or browser console.
      </p>

      <CodeBlock language="javascript" filename="copy-as-fetch.js">{`// Generated by "Copy as Fetch" in Chrome DevTools
fetch("https://api.example.com/users/me", {
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiJ9...",
    "content-type": "application/json"
  },
  "method": "GET"
});`}</CodeBlock>

      <SectionHeader number={10} title="Advanced Use Cases" />

      <KeyPointsGrid columns={2} items={[
        { title: 'Load testing baseline', description: 'Copy a complex authenticated request and use it as the baseline for load tests with tools like k6 or Apache Bench.' },
        { title: 'Webhook debugging', description: 'Capture an incoming webhook payload in browser, copy as curl, then replay it against localhost during development.' },
        { title: 'Mobile API reverse engineering', description: 'Use Charles Proxy or mitmproxy to capture mobile app requests, export as curl, and analyze the API.' },
        { title: 'GraphQL queries', description: 'Copy as cURL works perfectly for GraphQL — the query is in the JSON body. Paste into a curl command and add | jq to explore the response.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does Copy as cURL capture POST body data?',
          answer: 'Yes. For POST/PUT/PATCH requests, Chrome includes the request body as a --data-raw flag. For multipart forms it uses --form. The entire request is reproduced faithfully.',
        },
        {
          question: 'Is it safe to share copied curl commands?',
          answer: 'No — not without sanitizing them first. Copied curl commands contain your session cookies, authorization tokens, and CSRF tokens. Anyone with this command can impersonate your session. Always redact sensitive headers before sharing.',
        },
        {
          question: 'Why does my copied curl fail when the browser request worked?',
          answer: 'The most common reason is expired cookies or tokens. These are valid at the moment you copy but can expire within minutes or hours. Other causes: IP allowlists, TLS client certificates, or browser-specific security headers the API validates.',
        },
        {
          question: 'Can I copy as cURL for requests that use HTTP/2?',
          answer: 'Yes. Chrome DevTools automatically converts HTTP/2 requests to HTTP/1.1 curl syntax (removing :authority, :method etc pseudo-headers and mapping them to equivalent curl flags). curl itself supports HTTP/2 with --http2 flag.',
        },
        {
          question: 'How do I copy as cURL for a request that only happens on page load?',
          answer: 'Open DevTools first (F12), then check "Preserve log" in the Network panel settings. Reload the page. Now all requests including the initial page load are captured and you can copy any of them.',
        },
      ]} />

      <AlertBox type="success" title="Copy as cURL is your fastest debugging shortcut">
        The next time a colleague reports a weird API response or you need to test an authenticated endpoint from CI, open DevTools, find the request, right-click, and Copy as cURL. You will have a working reproduction in seconds rather than minutes.
      </AlertBox>
    </BlogLayoutWithSidebarAds>
  );
}
