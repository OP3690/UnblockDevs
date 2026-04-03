'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HarToCurlConverterCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HAR to cURL Converter — Complete Guide to Capturing and Replaying HTTP Requests</h1>
      <p className="lead">
        HAR (HTTP Archive) files record every network request your browser makes — including all headers,
        cookies, request bodies, and timing data. Converting them to cURL commands lets you replay,
        debug, and automate those exact requests from the terminal or in API testing tools. This guide
        explains the HAR format, how to export from all major browsers, how to convert to cURL with
        a Python script, how to sanitize sensitive data before sharing, and real-world use cases for
        API debugging, automation testing, and security analysis.
      </p>

      <StatGrid stats={[
        { value: 'HAR', label: 'HTTP Archive — JSON recording of all browser requests', color: 'blue' },
        { value: 'All browsers', label: 'Chrome, Firefox, Safari, Edge all export HAR', color: 'green' },
        { value: 'cURL', label: 'replays exact requests with all headers and cookies', color: 'purple' },
        { value: 'Debugging', label: 'essential for API debugging, automation, and load testing', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is a HAR File?" />
      <QuickFact color="blue" label="HAR format overview">
        HAR (HTTP Archive) is a JSON-format specification for logging all network interactions between
        a web browser and a server. It captures: request URLs, HTTP methods, request/response headers,
        cookies, request bodies, response status codes, response bodies, and detailed timing data
        (DNS lookup, TCP connection, SSL handshake, time to first byte, content download). It's the
        complete forensic record of what your browser sent and received.
      </QuickFact>

      <SectionHeader number={2} title="How to Export a HAR File from Any Browser" />
      <VerticalSteps steps={[
        { title: 'Open browser DevTools', desc: 'Chrome/Edge: F12 or Ctrl+Shift+I. Firefox: F12. Safari: Cmd+Option+I (must enable Developer menu first in Safari Preferences). Navigate to the Network tab.' },
        { title: 'Enable "Preserve log"', desc: 'Check the "Preserve log" checkbox to keep requests across page navigations. This is critical for capturing login flows or multi-page processes. Also enable "Disable cache" to ensure fresh requests.' },
        { title: 'Reproduce the action', desc: 'Refresh the page or perform the action you want to capture — login, API call, form submit, file upload. All network requests will appear in the Network tab in real time.' },
        { title: 'Export the HAR file', desc: 'Chrome/Edge: right-click any request → "Save all as HAR with content." Or click the download icon (⬇) in the toolbar. Firefox: gear icon → "Save All As HAR." Safari: Export button. Saves a .har JSON file.' },
        { title: 'Sanitize before sharing', desc: 'IMPORTANT: Before sharing the HAR file with anyone, remove or redact sensitive data: auth tokens, session cookies, passwords, API keys. Use a text editor to find and replace sensitive header values.' },
        { title: 'Convert to cURL', desc: 'Upload to unblockdevs.com/har-to-curl or use the Python script below to extract individual cURL commands from the HAR entries.' },
      ]} />

      <SectionHeader number={3} title="HAR File Format — What's Inside" />
      <CodeBlock lang="json" title="HAR file format — annotated structure">
{`{
  "log": {
    "version": "1.2",
    "creator": { "name": "Chrome DevTools", "version": "120.0.6099.71" },
    "browser": { "name": "Chrome", "version": "120.0.6099.71" },
    "pages": [
      {
        "startedDateTime": "2024-01-15T10:30:00.000Z",
        "id": "page_1",
        "title": "Dashboard — My App",
        "pageTimings": { "onLoad": 1250 }
      }
    ],
    "entries": [
      {
        "startedDateTime": "2024-01-15T10:30:00.000Z",
        "time": 49,  // total request time in ms
        "request": {
          "method": "POST",
          "url": "https://api.example.com/auth/login",
          "httpVersion": "HTTP/2.0",
          "headers": [
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Accept", "value": "application/json" },
            { "name": "Authorization", "value": "Bearer eyJhbGci..." }  // ← redact before sharing
          ],
          "cookies": [
            { "name": "session_id", "value": "abc123" }  // ← redact before sharing
          ],
          "queryString": [
            { "name": "version", "value": "v2" }
          ],
          "postData": {
            "mimeType": "application/json",
            "text": "{\"email\":\"user@example.com\",\"password\":\"REDACTED\"}"
          },
          "bodySize": 47,
          "headersSize": 350
        },
        "response": {
          "status": 200,
          "statusText": "OK",
          "headers": [
            { "name": "content-type", "value": "application/json" },
            { "name": "x-request-id", "value": "req_abc123" }
          ],
          "content": {
            "size": 156,
            "mimeType": "application/json",
            "text": "{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"}"
          },
          "redirectURL": "",
          "headersSize": 180,
          "bodySize": 156
        },
        "timings": {
          "dns": 0,         // DNS lookup time
          "connect": 0,     // TCP connection time
          "ssl": 12,        // TLS handshake time
          "send": 1,        // Time to send request
          "wait": 32,       // Time to first byte (TTFB)
          "receive": 4      // Time to download response body
        }
      }
    ]
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Converting HAR to cURL — Python Script" />
      <CodeBlock lang="python" title="har_to_curl.py — complete converter">
{`import json
import sys
import shlex
from pathlib import Path

def har_entry_to_curl(entry: dict) -> str:
    """Convert a single HAR log entry to a cURL command string."""
    req = entry['request']
    method = req['method']
    url = req['url']

    parts = ['curl']

    # Set HTTP method (GET is default, so skip for GET)
    if method != 'GET':
        parts += ['-X', method]

    # URL (quoted for safety)
    parts.append(shlex.quote(url))

    # Headers — skip HTTP/2 pseudo-headers and headers curl manages
    skip = {':method', ':path', ':scheme', ':authority', ':protocol',
            'content-length', 'connection', 'host', 'transfer-encoding'}

    for header in req.get('headers', []):
        name = header['name']
        value = header['value']
        if name.lower() not in skip and not name.startswith(':'):
            parts += ['-H', shlex.quote(f'{name}: {value}')]

    # Cookies (separate from headers for clarity)
    cookies = req.get('cookies', [])
    if cookies:
        cookie_str = '; '.join(f"{c['name']}={c['value']}" for c in cookies)
        parts += ['--cookie', shlex.quote(cookie_str)]

    # Request body
    post_data = req.get('postData', {})
    if post_data:
        text = post_data.get('text', '')
        params = post_data.get('params', [])

        if text:
            parts += ['--data-raw', shlex.quote(text)]
        elif params:
            # Form data
            for param in params:
                parts += ['-F', shlex.quote(f"{param['name']}={param['value']}")]

    # Useful flags
    parts += ['--compressed']  # Accept gzip/deflate
    parts += ['-s']            # Silent (no progress bar)

    # Join with line continuation for readability
    return ' \\\\\n  '.join(parts)


def har_to_curl(har_path: str, url_filter: str = None,
                status_filter: int = None, redact_auth: bool = True) -> list[dict]:
    """
    Convert all entries in a HAR file to cURL commands.

    Args:
        har_path: Path to .har file
        url_filter: Only include entries whose URL contains this string
        status_filter: Only include entries with this response status
        redact_auth: Replace auth header values with REDACTED (default: True)

    Returns:
        List of dicts with 'url', 'method', 'status', 'curl' keys
    """
    with open(har_path, encoding='utf-8') as f:
        har = json.load(f)

    entries = har['log']['entries']

    # Optional filtering
    if url_filter:
        entries = [e for e in entries if url_filter in e['request']['url']]
    if status_filter:
        entries = [e for e in entries if e['response']['status'] == status_filter]

    results = []
    for entry in entries:
        # Redact sensitive auth headers before converting
        if redact_auth:
            for header in entry['request'].get('headers', []):
                if header['name'].lower() in ('authorization', 'x-api-key', 'x-auth-token'):
                    header['value'] = 'REDACTED'

        curl_cmd = har_entry_to_curl(entry)
        results.append({
            'method': entry['request']['method'],
            'url': entry['request']['url'],
            'status': entry['response']['status'],
            'time_ms': entry.get('time', 0),
            'curl': curl_cmd,
        })

    return results


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python har_to_curl.py <file.har> [url_filter] [status_code]")
        sys.exit(1)

    har_file = sys.argv[1]
    filter_url = sys.argv[2] if len(sys.argv) > 2 else None
    filter_status = int(sys.argv[3]) if len(sys.argv) > 3 else None

    results = har_to_curl(har_file, filter_url, filter_status)

    for i, r in enumerate(results, 1):
        print(f"# ── Request {i}: {r['method']} {r['url'][:80]}")
        print(f"# Status: {r['status']} | Time: {r['time_ms']:.0f}ms")
        print(r['curl'])
        print()

    print(f"# Total: {len(results)} request(s) converted")`}
      </CodeBlock>

      <SectionHeader number={5} title="HAR vs Other API Capture Methods" />
      <CompareTable
        leftLabel="Method"
        rightLabel="When to Use"
        rows={[
          { label: 'HAR export (Browser DevTools)', left: 'Full browser traffic including auth cookies and exact headers', right: 'Debugging web app API calls, reproducing bugs that only occur in browser context' },
          { label: 'Copy as cURL (DevTools)', left: 'Right-click single request → "Copy as cURL" in Chrome/Firefox', right: 'Quickest for one-off request debugging — no conversion needed' },
          { label: 'Charles Proxy / mitmproxy', left: 'Intercept all HTTP/HTTPS traffic including mobile apps', right: 'Mobile app debugging, HTTPS inspection, modifying requests in-flight' },
          { label: 'Wireshark', left: 'Capture all network traffic at packet level', right: 'Deep protocol analysis, non-HTTP protocols, network-level debugging' },
          { label: 'API client recording (Postman)', left: 'Record requests directly in Postman via interceptor', right: 'When you want to build a test collection from real usage' },
        ]}
      />

      <SectionHeader number={6} title="Practical Use Cases" />
      <KeyPointsGrid columns={2} items={[
        { title: 'API debugging and reproduction', description: 'Capture the exact failing request with all original headers and cookies. Share the cURL command with the backend team for precise reproduction without setting up the same browser session or authentication state.' },
        { title: 'Automation and load testing', description: 'Capture a complete user flow in HAR, convert to cURL commands, then wrap in k6 or Locust for load testing. Ensures your load test uses realistic browser-generated requests, not simplified ones that miss important headers.' },
        { title: 'Performance analysis', description: 'HAR timing data (dns, connect, ssl, send, wait, receive) shows exactly how long each phase of each request took. Use Chrome HAR Analyzer or WebPageTest to visualize waterfall charts and identify bottlenecks.' },
        { title: 'Integration with Postman/Insomnia', description: 'Both Postman and Insomnia support direct HAR import. Postman: File → Import → select .har file → creates a full collection. Insomnia: File → Import. Converts your browser session into a persistent, shareable API collection.' },
      ]} />

      <AlertBox type="warning" title="Security: HAR files contain extremely sensitive data">
        HAR files capture authentication tokens, session cookies, API keys, passwords in request bodies,
        and all your response data including PII. Never share raw HAR files from production sessions containing
        real user data. Before sharing: replace Authorization header values with "Bearer REDACTED",
        replace Cookie header values with "session=REDACTED", remove any response bodies containing
        sensitive data. Use the redact_auth=True option in the script above.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between HAR and cURL?',
          answer: 'HAR is a file format (JSON) that records all browser network activity — it\'s a log file, not something you "run." cURL is a command-line tool to make individual HTTP requests. Converting HAR to cURL extracts individual requests from the recorded log and formats them as cURL commands you can run directly in a terminal, include in scripts, or import into testing tools like Postman or k6.',
        },
        {
          question: 'Can I import a HAR file directly into Postman without converting?',
          answer: 'Yes — Postman supports direct HAR import. File → Import → select your .har file → Postman creates a complete collection with all requests, headers, and bodies from the HAR. This is often faster than converting to cURL for interactive API testing. You can then add test assertions, environment variables, and share the collection with your team.',
        },
        {
          question: 'How do I capture HAR for mobile apps?',
          answer: 'Mobile apps don\'t have a browser DevTools, so you need a proxy. Options: (1) Charles Proxy or mitmproxy — install on your laptop, configure your phone\'s WiFi proxy settings to point to your laptop, install the proxy\'s SSL certificate on your phone. (2) For Android: Android Emulator in Android Studio supports traffic monitoring. (3) For React Native/Expo: use flipper with network inspector plugin. HAR export is usually available in the proxy tools.',
        },
        {
          question: 'Why might a cURL command from HAR fail to reproduce the request?',
          answer: 'Several common reasons: (1) Auth tokens or session cookies expired — HAR captures a point-in-time snapshot. (2) CSRF tokens — some requests include per-session CSRF tokens that are single-use. (3) Rate limiting — the server may throttle the same request repeated quickly. (4) Server-side session state — the server may require previous requests in a sequence. (5) Missing pseudo-headers — HAR may include HTTP/2 :authority headers that aren\'t valid in cURL command syntax.',
        },
        {
          question: 'How do I filter a large HAR file to just the API calls I care about?',
          answer: 'In DevTools Network tab: use the filter bar to filter by XHR/Fetch (to exclude static assets), or type a URL fragment to find specific requests. When exporting, only the filtered requests aren\'t excluded — all requests are exported. In the Python script above: use the url_filter parameter to extract only entries whose URL contains your API domain. You can also filter by status_filter=500 to find only failing requests.',
        },
        {
          question: 'Can HAR files be used for security testing?',
          answer: 'Yes — HAR files are valuable for authorized security testing. Capture authenticated user flows, then replay requests with modified parameters to test input validation, authorization checks, and business logic. Tools like OWASP ZAP can import HAR files and run automated scans against captured requests. Important: only do this with explicit authorization on systems you own or have permission to test. HAR files from production contain real user data and must be handled with care.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
