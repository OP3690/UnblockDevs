'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HarToCurlConverterCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HAR to cURL Converter — Complete Guide to Capturing and Replaying HTTP Requests</h1>
      <p className="lead">
        HAR (HTTP Archive) files record every network request your browser makes. Converting them
        to cURL commands lets you replay, debug, and automate those exact requests from the terminal.
        This guide explains HAR format, how to export it, and how to convert it to usable cURL commands.
      </p>

      <StatGrid stats={[
        { value: 'HAR', label: 'HTTP Archive — JSON recording of all browser requests', color: 'blue' },
        { value: 'All browsers', label: 'Chrome, Firefox, Safari all export HAR files', color: 'green' },
        { value: 'cURL', label: 'replays exact requests with headers + cookies', color: 'purple' },
        { value: 'Debugging', label: 'essential for API debugging and automation', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is a HAR File?" />
      <QuickFact>
        HAR (HTTP Archive) is a JSON-format log of all network interactions between a web browser
        and a server. It captures request URLs, methods, headers, cookies, request bodies, response
        status codes, response headers, and timing data. It's the complete forensic record of what
        your browser sent and received.
      </QuickFact>

      <SectionHeader number={2} title="How to Export a HAR File" />
      <VerticalSteps steps={[
        { title: 'Open DevTools', description: 'Press F12 (Chrome/Firefox/Edge) or Cmd+Option+I (Mac). Go to the Network tab.' },
        { title: 'Preserve log', description: 'Check "Preserve log" to keep requests across page navigations.' },
        { title: 'Reproduce the action', description: 'Refresh the page or perform the action you want to capture (login, API call, form submit).' },
        { title: 'Export HAR', description: 'Right-click any request → "Save all as HAR with content" (Chrome) or click the download icon. Saves a .har JSON file.' },
        { title: 'Convert to cURL', description: 'Upload to unblockdevs.com/har-to-curl or use the converter tool to extract individual cURL commands.' },
      ]} />

      <SectionHeader number={3} title="HAR File Structure" />
      <CodeBlock language="json" filename="HAR file format (simplified)">
{`{
  "log": {
    "version": "1.2",
    "creator": { "name": "Chrome DevTools", "version": "120" },
    "entries": [
      {
        "startedDateTime": "2024-01-15T10:30:00.000Z",
        "request": {
          "method": "POST",
          "url": "https://api.example.com/auth/login",
          "headers": [
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Accept", "value": "application/json" }
          ],
          "cookies": [],
          "postData": {
            "mimeType": "application/json",
            "text": "{\"email\":\"user@example.com\",\"password\":\"secret\"}"
          }
        },
        "response": {
          "status": 200,
          "statusText": "OK",
          "headers": [
            { "name": "content-type", "value": "application/json" }
          ],
          "content": {
            "mimeType": "application/json",
            "text": "{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"}"
          }
        },
        "timings": { "send": 1, "wait": 45, "receive": 3 }
      }
    ]
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Converting HAR to cURL — Python Script" />
      <CodeBlock language="python" filename="har_to_curl.py">
{`import json
import sys
import shlex

def har_entry_to_curl(entry):
    """Convert a single HAR entry to a cURL command"""
    req = entry['request']
    method = req['method']
    url = req['url']

    parts = ['curl']

    # Method
    if method != 'GET':
        parts += ['-X', method]

    # URL
    parts.append(shlex.quote(url))

    # Headers (skip pseudo-headers and common ones curl handles)
    skip_headers = {':method', ':path', ':scheme', ':authority',
                    'content-length', 'connection'}

    for header in req.get('headers', []):
        name = header['name'].lower()
        if name not in skip_headers and not name.startswith(':'):
            parts += ['-H', shlex.quote(f"{header['name']}: {header['value']}")]

    # Cookies
    cookies = req.get('cookies', [])
    if cookies:
        cookie_str = '; '.join(f"{c['name']}={c['value']}" for c in cookies)
        parts += ['--cookie', shlex.quote(cookie_str)]

    # Request body
    post_data = req.get('postData', {})
    if post_data.get('text'):
        parts += ['--data-raw', shlex.quote(post_data['text'])]

    # Common flags
    parts += ['--compressed', '-s']

    return ' \\\n  '.join(parts)

def har_to_curl(har_file_path, filter_url=None):
    with open(har_file_path) as f:
        har = json.load(f)

    entries = har['log']['entries']

    if filter_url:
        entries = [e for e in entries if filter_url in e['request']['url']]

    for i, entry in enumerate(entries):
        url = entry['request']['url']
        method = entry['request']['method']
        print(f"# Request {i+1}: {method} {url[:80]}")
        print(har_entry_to_curl(entry))
        print()

if __name__ == '__main__':
    har_file = sys.argv[1]
    filter_url = sys.argv[2] if len(sys.argv) > 2 else None
    har_to_curl(har_file, filter_url)

# Usage:
# python har_to_curl.py recording.har
# python har_to_curl.py recording.har "api.example.com"`}
      </CodeBlock>

      <SectionHeader number={5} title="Practical Use Cases" />
      <KeyPointsGrid columns={2} items={[
        { title: 'API debugging', description: 'Reproduce exact failing requests with all original headers and cookies. Share the cURL with backend team for precise reproduction without browser setup.' },
        { title: 'Automation testing', description: 'Capture a user flow in HAR, convert to cURL commands, then wrap in a test script. Perfect for load testing with k6 or API testing with pytest.' },
        { title: 'Performance analysis', description: 'HAR timing data shows exactly how long each request took. Use tools like har-validator and Chrome HAR Analyzer to identify slow requests.' },
        { title: 'Security testing', description: 'Capture authenticated requests for penetration testing (with authorization). Replaying HAR entries helps test rate limiting, input validation, and auth flows.' },
      ]} />

      <AlertBox type="warning" title="Security: HAR files contain sensitive data">
        HAR files capture authentication tokens, session cookies, API keys, and request bodies.
        Never share HAR files from production sessions containing real user data.
        Sanitize tokens before sharing: replace Authorization header values with "Bearer REDACTED"
        before sending to support or posting publicly.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between HAR and cURL?',
          answer: 'HAR is a file format (JSON) that records all browser network activity. cURL is a command-line tool to make HTTP requests. Converting HAR to cURL extracts individual requests from the recording and formats them as cURL commands you can run in a terminal, script, or API testing tool.',
        },
        {
          question: 'Can I import a HAR file directly into Postman?',
          answer: 'Yes — Postman supports HAR import directly. File → Import → select your .har file. Postman creates a collection with all requests from the HAR. This is often faster than converting to cURL for interactive API testing.',
        },
        {
          question: 'How do I capture HAR for mobile apps?',
          answer: 'Use a proxy like Charles Proxy or mitmproxy between your phone and the internet. Configure your phone\'s WiFi proxy to point to your desktop. The proxy captures all HTTP/HTTPS traffic and can export to HAR format.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
