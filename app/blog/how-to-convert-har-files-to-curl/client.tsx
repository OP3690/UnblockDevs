'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToConvertHarFilesToCurlClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert HAR Files to cURL Commands: Complete Guide (2026)</h1>
      <p className="lead">
        HAR (HTTP Archive) files capture every network request your browser makes — headers, cookies, bodies, timings. Converting them to cURL commands lets you replay, debug, share, and automate those requests. This guide covers everything: what HAR files are, how to export them, how to convert to cURL, and how to handle sensitive data.
      </p>

      <StatGrid stats={[
        { value: 'JSON', label: 'HAR file format (human-readable)', color: 'blue' },
        { value: '100%', label: 'of browser requests captured', color: 'green' },
        { value: '3 tools', label: 'for HAR to cURL conversion', color: 'purple' },
        { value: '1 click', label: 'to export from Chrome/Firefox', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is a HAR File?" />

      <p>
        A HAR (HTTP Archive) file is a JSON-formatted log of all HTTP requests and responses made by a browser session. It was standardized by the W3C Web Performance Working Group and is supported by Chrome, Firefox, Safari, and Edge.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'Complete request capture', description: 'HAR files record the full request: URL, method, headers, cookies, request body, response headers, response body, and timing data.' },
        { title: 'JSON format', description: 'HAR is plain JSON with a specific schema. You can open it in any text editor or parse it with any language.' },
        { title: 'Cross-browser standard', description: 'All major browsers export the same HAR format, making it a universal debugging artifact.' },
        { title: 'Security warning', description: 'HAR files contain all cookies and auth tokens from your session. Treat them like passwords — never share raw HAR files publicly.' },
      ]} />

      <AlertBox type="warning" title="HAR files contain sensitive data">
        HAR files capture session cookies, auth tokens, API keys, and passwords. Before sharing a HAR file with support teams or colleagues, sanitize it by removing or redacting sensitive headers and cookies.
      </AlertBox>

      <SectionHeader number={2} title="How to Export a HAR File from Chrome" />

      <VerticalSteps steps={[
        {
          title: 'Open Chrome DevTools',
          description: 'Press F12 (or Cmd+Option+I on Mac) to open DevTools. Navigate to the Network tab.',
        },
        {
          title: 'Record network traffic',
          description: 'Make sure recording is active (the red circle button). Reload the page or perform the action you want to capture. All requests appear in the list.',
        },
        {
          title: 'Export the HAR file',
          description: 'Right-click anywhere in the request list and select "Save all as HAR with content", or click the download icon in the toolbar. Save the .har file to your computer.',
        },
        {
          title: 'Verify the export',
          description: 'Open the .har file in a text editor. You should see JSON starting with {"log": {"version": "1.2", "creator": {...}, "entries": [...]}}.',
        },
      ]} />

      <SectionHeader number={3} title="How to Export HAR from Firefox and Safari" />

      <CompareTable
        leftLabel="Firefox"
        rightLabel="Safari"
        rows={[
          { label: 'Open DevTools', left: 'F12 or Ctrl+Shift+I', right: 'Cmd+Option+I (enable Dev menu first)' },
          { label: 'Tab to use', left: 'Network tab', right: 'Network tab' },
          { label: 'Export button', left: 'Gear icon → Save All as HAR', right: 'Export button (down arrow icon)' },
          { label: 'File format', left: '.har (JSON)', right: '.har (JSON)' },
          { label: 'Response bodies', left: 'Included', right: 'May require "Record Network Content" enabled' },
        ]}
      />

      <SectionHeader number={4} title="Method 1: Convert HAR to cURL Using UnblockDevs Tool" />

      <p>
        The easiest method is to use the HAR to cURL converter on this site at <code>/har-to-curl</code>. It parses the HAR file, lists all requests, and generates cURL commands for each one. No data is sent to a server — conversion happens entirely in your browser.
      </p>

      <FlowDiagram steps={[
        { label: 'Export HAR from browser', color: 'blue' },
        { label: 'Open HAR to cURL Tool', color: 'blue' },
        { label: 'Upload or paste HAR', color: 'green' },
        { label: 'Select request', color: 'green' },
        { label: 'Copy cURL command', color: 'purple' },
        { label: 'Run or integrate', color: 'purple' },
      ]} />

      <SectionHeader number={5} title="Method 2: Convert HAR to cURL Manually with JavaScript" />

      <p>
        If you need programmatic conversion — for example, in a test suite or CI pipeline — here is how to parse HAR entries and generate cURL commands:
      </p>

      <CodeBlock language="js" filename="har-to-curl.js">
{`function harEntryToCurl(entry) {
  const { request } = entry;
  const parts = ['curl'];

  // Method (skip if GET since it's the default)
  if (request.method !== 'GET') {
    parts.push(\`-X \${request.method}\`);
  }

  // Headers (skip pseudo-headers and some auto-managed ones)
  const skipHeaders = new Set([
    ':method', ':path', ':authority', ':scheme',
    'content-length', // curl calculates this
  ]);

  for (const header of request.headers) {
    if (!skipHeaders.has(header.name.toLowerCase())) {
      parts.push(\`-H \${JSON.stringify(\`\${header.name}: \${header.value}\`)}\`);
    }
  }

  // Cookies
  if (request.cookies && request.cookies.length > 0) {
    const cookieStr = request.cookies
      .map(c => \`\${c.name}=\${c.value}\`)
      .join('; ');
    parts.push(\`-b \${JSON.stringify(cookieStr)}\`);
  }

  // Request body
  if (request.postData) {
    const body = request.postData.text;
    parts.push(\`-d \${JSON.stringify(body)}\`);
  }

  // URL (must be last)
  parts.push(JSON.stringify(request.url));

  return parts.join(' \\\\\n  ');
}

// Usage with a HAR file:
const fs = require('fs');
const har = JSON.parse(fs.readFileSync('session.har', 'utf8'));

har.log.entries.forEach((entry, i) => {
  console.log(\`\\n# Request \${i + 1}: \${entry.request.method} \${entry.request.url}\`);
  console.log(harEntryToCurl(entry));
});`}
      </CodeBlock>

      <SectionHeader number={6} title="Method 3: Filter and Convert with Python" />

      <CodeBlock language="python" filename="har_to_curl.py">
{`import json
import sys

def har_to_curl(entry):
    req = entry['request']
    parts = ['curl']

    if req['method'] != 'GET':
        parts.append(f'-X {req["method"]}')

    skip = {'content-length', ':method', ':path', ':authority', ':scheme'}
    for h in req.get('headers', []):
        if h['name'].lower() not in skip:
            parts.append(f'-H {json.dumps(h["name"] + ": " + h["value"])}')

    if req.get('cookies'):
        cookie_str = '; '.join(f'{c["name"]}={c["value"]}' for c in req['cookies'])
        parts.append(f'-b {json.dumps(cookie_str)}')

    if req.get('postData', {}).get('text'):
        parts.append(f'-d {json.dumps(req["postData"]["text"])}')

    parts.append(json.dumps(req['url']))
    return ' \\\\\n  '.join(parts)

def main(har_path, url_filter=None):
    with open(har_path) as f:
        har = json.load(f)

    entries = har['log']['entries']
    if url_filter:
        entries = [e for e in entries if url_filter in e['request']['url']]

    for i, entry in enumerate(entries):
        print(f"\\n# Request {i+1}: {entry['request']['method']} {entry['request']['url']}")
        print(har_to_curl(entry))

if __name__ == '__main__':
    har_file = sys.argv[1]
    filter_url = sys.argv[2] if len(sys.argv) > 2 else None
    main(har_file, filter_url)

# Usage:
# python har_to_curl.py session.har
# python har_to_curl.py session.har api.example.com  # filter by URL`}
      </CodeBlock>

      <SectionHeader number={7} title="Sanitizing HAR Files Before Sharing" />

      <p>
        When sharing HAR files with support teams, always redact sensitive information first. Here is a script to remove auth tokens and session cookies:
      </p>

      <CodeBlock language="js" filename="sanitize-har.js">
{`const fs = require('fs');

function sanitizeHar(har) {
  const sensitiveHeaders = new Set([
    'authorization', 'cookie', 'set-cookie',
    'x-api-key', 'x-auth-token', 'x-session-id',
  ]);

  function redactHeaders(headers) {
    return headers.map(h => ({
      ...h,
      value: sensitiveHeaders.has(h.name.toLowerCase()) ? '[REDACTED]' : h.value,
    }));
  }

  return {
    ...har,
    log: {
      ...har.log,
      entries: har.log.entries.map(entry => ({
        ...entry,
        request: {
          ...entry.request,
          headers: redactHeaders(entry.request.headers || []),
          cookies: [], // Remove all cookies
        },
        response: {
          ...entry.response,
          headers: redactHeaders(entry.response.headers || []),
          cookies: [],
        },
      })),
    },
  };
}

const input = JSON.parse(fs.readFileSync('raw-session.har', 'utf8'));
const sanitized = sanitizeHar(input);
fs.writeFileSync('sanitized-session.har', JSON.stringify(sanitized, null, 2));
console.log('Sanitized HAR written to sanitized-session.har');`}
      </CodeBlock>

      <AlertBox type="tip" title="Use the HAR sanitizer before any support ticket">
        Tools like Google's HAR Sanitizer (available online) can automatically detect and redact common sensitive patterns. Always run your HAR through a sanitizer before attaching it to a support ticket or sharing in a public forum.
      </AlertBox>

      <SectionHeader number={8} title="HAR File Structure Reference" />

      <CodeBlock language="json" filename="har-structure.json">
{`{
  "log": {
    "version": "1.2",
    "creator": { "name": "Chrome", "version": "120" },
    "entries": [
      {
        "startedDateTime": "2026-03-01T10:00:00.000Z",
        "time": 245.3,
        "request": {
          "method": "POST",
          "url": "https://api.example.com/login",
          "headers": [
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Authorization", "value": "Bearer eyJhbGci..." }
          ],
          "cookies": [
            { "name": "session", "value": "abc123" }
          ],
          "postData": {
            "mimeType": "application/json",
            "text": "{\"username\":\"alice\"}"
          }
        },
        "response": {
          "status": 200,
          "statusText": "OK",
          "headers": [...],
          "content": {
            "mimeType": "application/json",
            "text": "{\"token\":\"xyz\"}"
          }
        },
        "timings": {
          "send": 0.5,
          "wait": 220.1,
          "receive": 24.7
        }
      }
    ]
  }
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'How do I convert a HAR file to a cURL command?',
          answer: 'Use the UnblockDevs HAR to cURL tool at /har-to-curl, upload your .har file, select the request you want, and copy the generated cURL command. For programmatic conversion, parse the HAR JSON and build the cURL command from the request.method, request.headers, request.cookies, and request.postData fields.',
        },
        {
          question: 'What is a HAR file and why would I need one?',
          answer: 'A HAR (HTTP Archive) file is a JSON log of all HTTP requests made during a browser session. You need one when debugging network issues, reproducing API calls, sharing a complete request sequence with support teams, or converting browser interactions to automated scripts.',
        },
        {
          question: 'Is it safe to share a HAR file?',
          answer: 'No — not without sanitizing it first. HAR files contain all session cookies, auth tokens, and request bodies from your browser session. Always redact Authorization headers, Cookie headers, and any other sensitive values before sharing. Use a HAR sanitizer tool.',
        },
        {
          question: 'How do I export a HAR file from Chrome?',
          answer: 'Open Chrome DevTools (F12), go to the Network tab, record the traffic you want to capture, then right-click anywhere in the request list and select "Save all as HAR with content". Alternatively, click the download icon in the Network toolbar.',
        },
        {
          question: 'Can I convert a HAR file to Python requests or other languages?',
          answer: 'Yes. HAR is just JSON, so you can parse it and generate any HTTP client code. The UnblockDevs HAR tool supports cURL output, which you can then run through curlconverter.com to get Python requests, Node.js, Ruby, Go, and 20+ other languages.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
