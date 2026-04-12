'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HarToCurlConverterGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HAR to cURL Converter: Complete Guide (2026)</h1>
      <p className="lead">
        HAR files capture every network request your browser makes — headers, cookies, request bodies,
        timings, and all. Converting them to cURL commands lets you replay, debug, automate, and share
        those requests from any terminal or CI pipeline. This complete guide covers everything from
        exporting HAR files in Chrome and Firefox to converting them and using the resulting cURL commands
        in real debugging workflows.
      </p>

      <StatGrid stats={[
        { value: 'JSON', label: 'HAR file format', color: 'blue' },
        { value: '100%', label: 'Free — no signup needed', color: 'green' },
        { value: '3 browsers', label: 'Chrome, Firefox, Safari covered', color: 'purple' },
        { value: '1-click', label: 'Export HAR from DevTools', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a HAR File?" />

      <p>
        <strong>HAR</strong> stands for <strong>HTTP Archive</strong>. A HAR file is a JSON document that
        records all HTTP transactions made by a web browser during a session — every request and response,
        including headers, cookies, request bodies, response bodies, and precise timing data.
      </p>

      <QuickFact>HAR is defined by the W3C Web Performance Working Group. The file extension is .har and the MIME type is application/json.</QuickFact>

      <CodeBlock language="json" filename="example.har (simplified)">
{`{
  "log": {
    "version": "1.2",
    "creator": { "name": "Chrome DevTools", "version": "120" },
    "entries": [
      {
        "request": {
          "method": "POST",
          "url": "https://api.example.com/users",
          "headers": [
            { "name": "Content-Type",  "value": "application/json" },
            { "name": "Authorization", "value": "Bearer eyJhbGci..." }
          ],
          "postData": {
            "mimeType": "application/json",
            "text": "{\"name\":\"Alice\",\"email\":\"alice@example.com\"}"
          }
        },
        "response": {
          "status": 201,
          "headers": [{ "name": "Content-Type", "value": "application/json" }],
          "content": { "text": "{\"id\":42,\"name\":\"Alice\"}" }
        }
      }
    ]
  }
}`}
      </CodeBlock>

      <SectionHeader number={2} title="What Is cURL?" />

      <p>
        <strong>cURL</strong> (Client URL) is a command-line tool for transferring data with URLs.
        It supports HTTP, HTTPS, FTP, and dozens of other protocols. A cURL command is a self-contained,
        copy-paste-ready HTTP request — the universal language of API testing and debugging.
      </p>

      <CodeBlock language="bash" filename="example-curl.sh">
{`# A typical cURL command (equivalent to the HAR entry above)
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGci..." \
  -d '{"name":"Alice","email":"alice@example.com"}' \
  --compressed`}
      </CodeBlock>

      <SectionHeader number={3} title="Why Convert HAR to cURL?" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Replay browser requests in terminal',
          description: 'Reproduce exactly what the browser sent — same headers, cookies, body — without opening a browser.',
        },
        {
          title: 'Debug API issues precisely',
          description: 'Isolate a single failing request and replay it, tweak headers or body, and compare responses.',
        },
        {
          title: 'Share reproducible test cases',
          description: 'A cURL command is the universally understood way to share an HTTP request with a teammate or post in a bug report.',
        },
        {
          title: 'Convert to code in any language',
          description: 'From cURL you can generate Python requests, JavaScript fetch, Go net/http, and more using further converters.',
        },
        {
          title: 'Add to CI/CD pipelines',
          description: 'Replay recorded production API calls in automated tests to catch regressions.',
        },
        {
          title: 'Load testing',
          description: 'Convert captured real traffic to cURL scripts for k6, wrk, or Locust load tests.',
        },
      ]} />

      <SectionHeader number={4} title="How to Export a HAR File — Step by Step" />

      <VerticalSteps steps={[
        {
          title: 'Open Chrome DevTools',
          description: 'Press F12 (or Cmd+Option+I on Mac). Click the Network tab. Make sure the red record button is active.',
        },
        {
          title: 'Reproduce the request',
          description: 'Navigate to the page or trigger the API call you want to capture. You will see requests appearing in the Network panel.',
        },
        {
          title: 'Export the HAR file',
          description: 'Click the download icon (↓) in the Network toolbar → "Export HAR". The file saves as archive.har.',
        },
        {
          title: 'Optional: filter before export',
          description: 'Use the filter box (XHR, Fetch, Doc) to capture only the requests you need before exporting.',
        },
      ]} />

      <AlertBox type="info" title="Firefox and Safari">
        In Firefox: Network tab → cog icon → Save All As HAR. In Safari: Develop menu → Show Web Inspector
        → Network tab → Export (bottom right). All three produce the same HAR 1.2 format.
      </AlertBox>

      <SectionHeader number={5} title="How to Convert HAR to cURL" />

      <VerticalSteps steps={[
        {
          title: 'Go to the HAR to cURL converter',
          description: 'Visit unblockdevs.com/har-to-curl. No signup, no installation, 100% free.',
        },
        {
          title: 'Upload or paste your HAR file',
          description: 'Drag and drop the .har file, or paste the raw HAR JSON into the text area.',
        },
        {
          title: 'Review the extracted requests',
          description: 'The tool lists every request in the HAR. Select the ones you want to convert.',
        },
        {
          title: 'Copy or download the cURL commands',
          description: 'Click "Copy" for a single request or "Download All" to get a shell script with all commands.',
        },
        {
          title: 'Run in your terminal',
          description: 'Paste the cURL command into any terminal and press Enter.',
        },
      ]} />

      <SectionHeader number={6} title="Understanding the Generated cURL Flags" />

      <CompareTable
        leftLabel="cURL flag"
        rightLabel="What it does"
        rows={[
          { label: 'Method', left: '-X POST / -X GET', right: 'Sets the HTTP method (GET is default)' },
          { label: 'Headers', left: "-H 'Name: Value'", right: 'Adds a request header (one -H per header)' },
          { label: 'Body (JSON)', left: "-d '{...}'", right: 'Sets the request body (use --data-binary for binary)' },
          { label: 'Body (form)', left: '-F field=value', right: 'Sends multipart/form-data' },
          { label: 'Cookies', left: "-b 'name=value'", right: 'Sends cookies in the Cookie header' },
          { label: 'Follow redirects', left: '-L', right: 'Follows 3xx redirects automatically' },
          { label: 'Compressed', left: '--compressed', right: 'Requests gzip encoding and decompresses response' },
          { label: 'Verbose', left: '-v', right: 'Shows full request and response headers (great for debugging)' },
          { label: 'Output to file', left: '-o output.json', right: 'Writes response body to a file' },
          { label: 'Silent', left: '-s', right: 'Suppresses progress meter (good for scripts)' },
        ]}
      />

      <SectionHeader number={7} title="Practical cURL Debugging Recipes" />

      <CodeBlock language="bash" filename="debug-with-curl.sh">
{`# 1. Test with verbose output (see full request + response headers)
curl -v -X POST https://api.example.com/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret"}'

# 2. Check just the response headers (fast health check)
curl -I https://api.example.com/health

# 3. Measure response time (performance debugging)
curl -o /dev/null -s -w "DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTotal: %{time_total}s\n" \
  https://api.example.com/users

# 4. Save response to file
curl -s https://api.example.com/data -o response.json

# 5. Send custom User-Agent (bypass bot detection in testing)
curl -H "User-Agent: Mozilla/5.0" https://example.com/api

# 6. Retry on failure (CI-friendly)
curl --retry 3 --retry-delay 2 https://api.example.com/data

# 7. Follow redirects and show final URL
curl -L -w "\nFinal URL: %{url_effective}\n" https://bit.ly/example`}
      </CodeBlock>

      <SectionHeader number={8} title="Common Issues When Converting HAR to cURL" />

      <AlertBox type="warning" title="Sensitive data in HAR files">
        HAR files contain authentication tokens, session cookies, and potentially personal data.
        Never share a raw HAR file publicly. Always redact tokens and cookies before sharing.
        Use the converter's built-in redaction option to strip auth headers.
      </AlertBox>

      <ErrorFix
        badLabel="Sharing raw HAR with auth tokens (security risk)"
        bad={`# HAR entry with live token
{
  "headers": [{ "name": "Authorization", "value": "Bearer REAL_TOKEN_HERE" }]
}
# → cURL with real token → security breach if shared`}
        goodLabel="Redact tokens before sharing cURL"
        good={`# Safe cURL for sharing with teammates or in bug reports
curl -X GET https://api.example.com/users/42 \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json"

# Or use env variable so the token never appears in shell history
curl -X GET https://api.example.com/users/42 \
  -H "Authorization: Bearer $API_TOKEN"`}
      />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'CORS errors in browser ≠ cURL error',
          description: 'CORS is enforced only by browsers. cURL ignores CORS headers — a request that fails with CORS in the browser may succeed in cURL. This means the issue is a missing Access-Control-Allow-Origin header, not a broken endpoint.',
        },
        {
          title: 'Cookies may have expired',
          description: 'HAR files capture session cookies at a point in time. If the session has expired, the replayed cURL request will get a 401 or redirect to login.',
        },
        {
          title: 'CSRF tokens are one-time use',
          description: 'Many POST endpoints require a CSRF token that expires after one use. You may need to fetch a new token first.',
        },
        {
          title: 'Binary/multipart bodies need special handling',
          description: 'For file uploads, use --data-binary @file.bin or -F in cURL. The HAR converter handles this automatically.',
        },
      ]} />

      <SectionHeader number={9} title="Architecture: HAR to cURL Conversion Flow" />

      <ArchDiagram
        boxes={[
          { label: 'Browser DevTools', color: 'blue' },
          { label: '.har file (JSON)', color: 'amber' },
          { label: 'HAR to cURL Converter', color: 'blue' },
          { label: 'cURL commands', color: 'green' },
          { label: 'Terminal / CI / Tests', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→']}
      />

      <FlowDiagram steps={[
        { label: 'Capture traffic', color: 'blue' },
        { label: 'Export .har', color: 'blue' },
        { label: 'Upload to converter', color: 'amber' },
        { label: 'Select requests', color: 'amber' },
        { label: 'Copy cURL commands', color: 'green' },
        { label: 'Debug / automate', color: 'green' },
      ]} />

      <SectionHeader number={10} title="Convert cURL Further to Python, JavaScript, Go" />

      <p>
        Once you have a cURL command, you can convert it to production-ready code in any language using
        the UnblockDevs cURL Converter tool.
      </p>

      <CodeBlock language="python" filename="converted-to-python.py">
{`# Original cURL:
# curl -X POST https://api.example.com/users \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer TOKEN" \
#   -d '{"name":"Alice"}'

# Converted to Python requests:
import requests

response = requests.post(
    "https://api.example.com/users",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer TOKEN",
    },
    json={"name": "Alice"},
)
print(response.status_code, response.json())`}
      </CodeBlock>

      <CodeBlock language="js" filename="converted-to-js.js">
{`// Converted to JavaScript fetch:
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer TOKEN",
  },
  body: JSON.stringify({ name: "Alice" }),
});
const data = await response.json();
console.log(response.status, data);`}
      </CodeBlock>

      <SectionHeader number={11} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What is a HAR file and what is it used for?',
          answer: 'A HAR (HTTP Archive) file is a JSON document that records all HTTP network requests made by a browser during a session. It captures request/response headers, bodies, cookies, timing, and redirect chains. HAR files are used for debugging network issues, sharing reproducible bug reports, performance analysis, and converting browser traffic into automation scripts.',
        },
        {
          question: 'How do I export a HAR file from Chrome?',
          answer: 'Open Chrome DevTools (F12), go to the Network tab, reproduce the requests you want to capture, then click the export/download icon in the Network toolbar and select "Export HAR". The file saves as archive.har. On Firefox, use Network tab → cog icon → Save All As HAR. Safari: Develop → Web Inspector → Network → Export.',
        },
        {
          question: 'How do I convert a HAR file to cURL?',
          answer: 'Use the UnblockDevs HAR to cURL converter at unblockdevs.com/har-to-curl. Upload or paste your HAR file. The tool parses every entry and generates a cURL command for each request, with all headers, cookies, and body included. You can copy individual commands or download all as a shell script.',
        },
        {
          question: 'Is it safe to share HAR files?',
          answer: 'No — not without redaction. HAR files contain full HTTP request headers, which typically include session cookies, auth tokens, and API keys. Anyone with your HAR file can impersonate you for the duration of the session. Before sharing, strip all Authorization headers, Cookie values, and any fields containing personal data. Use the converter\'s redaction feature or manually edit the JSON.',
        },
        {
          question: 'Why does the cURL command work but the browser request fails?',
          answer: 'CORS (Cross-Origin Resource Sharing) is enforced exclusively by browsers to protect users from malicious websites making requests on their behalf. cURL makes requests directly from your machine without any browser CORS enforcement. So a request that fails in the browser with a CORS error may succeed in cURL — meaning the server endpoint works, but it is missing the correct Access-Control-Allow-Origin response header needed for browser clients.',
        },
        {
          question: 'Can I use HAR files for load testing?',
          answer: 'Yes. Convert HAR entries to cURL, then convert those to language-specific HTTP clients, and feed them into load testing tools like k6, Locust, or Apache JMeter. Some load testing tools (k6, Gatling) have built-in HAR importers that convert directly to test scripts without the intermediate cURL step.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
