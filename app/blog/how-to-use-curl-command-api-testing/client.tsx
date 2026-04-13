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

export default function HowToUseCurlCommandApiTestingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Use cURL to Test APIs — Commands, Examples & Convert to Code</h1>
      <p className="lead">
        cURL is the fastest way to test an API without writing any code. One command in your
        terminal — you see the raw HTTP response, status code, headers, and body instantly.
        This guide covers every cURL pattern developers use daily: GET, POST with JSON, auth
        headers, PUT/PATCH/DELETE, debugging flags, and how to convert any cURL command into
        Python or JavaScript code for your application.
      </p>

      <StatGrid stats={[
        { value: '30+ years', label: 'cURL has been the standard for HTTP testing since 1997', color: 'blue' },
        { value: 'zero setup', label: 'Pre-installed on macOS, Linux — available on Windows via WSL or Git Bash', color: 'green' },
        { value: '1 command', label: 'Test any REST API endpoint — no Postman, no browser, no code', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="What Is cURL and Why Do Developers Use It?" />
      <p>
        cURL (Client URL) is a command-line tool for making HTTP requests. It is pre-installed
        on macOS and every major Linux distribution. On Windows, it is included in Git Bash,
        WSL, and Windows 10+ natively. Developers use it to:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Test API endpoints instantly',
          description:
            'Check if an endpoint returns the right data, status code, and headers without writing any code or opening a browser.',
        },
        {
          title: 'Debug authentication issues',
          description:
            'Test whether a Bearer token, API key, or session cookie is valid by making a raw authenticated request and seeing exactly what comes back.',
        },
        {
          title: 'Reproduce production requests',
          description:
            'Chrome DevTools lets you copy any browser network request as cURL. Paste it into your terminal to reproduce the exact request the browser made.',
        },
        {
          title: 'Test edge cases quickly',
          description:
            'Try different request bodies, headers, and query parameters without modifying code. Faster than writing a test for every variation.',
        },
        {
          title: 'Share reproducible examples',
          description:
            'cURL commands are the universal format for API issue reports, Stack Overflow questions, and documentation. Everyone can run them.',
        },
        {
          title: 'Script API calls in CI/CD',
          description:
            'cURL in shell scripts calls webhooks, checks health endpoints, deploys artifacts, and tests APIs as part of automated pipelines.',
        },
      ]} />

      <AlertBox type="tip" title="Already have a cURL command? Convert it to code instantly">
        If you already have a cURL command and need Python or JavaScript code, skip straight to
        the converters:{' '}
        <a href="https://unblockdevs.com/curl-to-python" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          curl → Python
        </a>{' '}
        or{' '}
        <a href="https://unblockdevs.com/curl-converter" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          curl → JavaScript, Go, PHP & more
        </a>.
      </AlertBox>

      <SectionHeader number={2} title="Basic cURL GET Request" />
      <p>
        The simplest cURL command — just the URL. cURL defaults to GET when no method is
        specified.
      </p>

      <CodeBlock lang="bash" title="cURL GET — basic patterns">
{`# Basic GET — returns the response body
curl https://api.example.com/users

# GET with pretty-printed JSON output (pipe through python -m json.tool)
curl https://api.example.com/users | python3 -m json.tool

# GET and see response headers too (-i = include headers)
curl -i https://api.example.com/users

# GET and see ONLY the response headers (-I = HEAD request)
curl -I https://api.example.com/users

# GET and save the output to a file (-o = output file)
curl https://api.example.com/users -o users.json

# GET with verbose output — see the full request and response (-v)
curl -v https://api.example.com/users`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: '-i (include response headers)',
          description:
            'Shows both the response headers AND the body. Use this to inspect status codes, Content-Type, Cache-Control, and any custom headers the server returns.',
        },
        {
          title: '-v (verbose)',
          description:
            'Shows the full request (headers cURL sends) AND the full response (headers the server returns) plus TLS handshake details. Essential for debugging connection issues.',
        },
        {
          title: '-o filename (save output)',
          description:
            'Saves the response body to a file instead of printing to stdout. Use -O (capital O) to save with the filename from the URL path.',
        },
        {
          title: '-s (silent)',
          description:
            'Suppresses the progress meter and error messages. Use in scripts so the output is only the response body — no noise.',
        },
      ]} />

      <SectionHeader number={3} title="cURL POST with JSON Body" />
      <p>
        Posting JSON to an API requires two things: the <code>-d</code> flag with the JSON
        string, and the <code>Content-Type: application/json</code> header. Missing the
        Content-Type is one of the most common bugs when using cURL with REST APIs.
      </p>

      <ErrorFix
        title="cURL POST with JSON — missing Content-Type vs. correct"
        bad={`# Wrong: API receives the body but treats it as text, not JSON
curl -X POST 'https://api.example.com/users' \
  -d '{"name": "Alice", "email": "alice@example.com"}'
# → 400 Bad Request or 415 Unsupported Media Type`}
        good={`# Correct: always include Content-Type: application/json with JSON bodies
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -d '{"name": "Alice", "email": "alice@example.com"}'
# → 201 Created`}
        badLabel="Missing Content-Type — API rejects the request"
        goodLabel="Correct — API receives and parses JSON"
      />

      <CodeBlock lang="bash" title="cURL POST patterns">
{`# POST with inline JSON body
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"name": "Alice", "email": "alice@example.com", "role": "admin"}'

# POST with JSON from a file (@ prefix reads from file)
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d @user-payload.json

# POST with URL-encoded form data (like an HTML form submission)
curl -X POST 'https://api.example.com/login' \
  -d 'username=alice&password=s3cr3t'

# POST with multipart form data (file upload)
curl -X POST 'https://api.example.com/upload' \
  -H 'Authorization: Bearer TOKEN' \
  -F 'file=@/path/to/document.pdf' \
  -F 'title=Q4 Report'`}
      </CodeBlock>

      <QuickFact color="blue" label="--data vs --data-raw vs --data-binary">
        <code>-d</code> (or <code>--data</code>) URL-encodes the data and strips newlines.
        Use <code>--data-raw</code> when the data contains <code>@</code> characters you do
        not want interpreted as filenames. Use <code>--data-binary</code> to send binary data
        or preserve newlines — critical when sending JSON read from a file that contains
        newlines.
      </QuickFact>

      <SectionHeader number={4} title="cURL with Authentication — Bearer Token, Basic Auth, API Key" />
      <p>
        Most APIs require authentication. cURL supports all common auth patterns with{' '}
        the <code>-H</code> flag for header-based auth or <code>-u</code> for HTTP Basic auth.
      </p>

      <CodeBlock lang="bash" title="All authentication patterns in cURL">
{`# Bearer token (most common — OAuth 2.0, JWT)
curl 'https://api.example.com/me' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...'

# HTTP Basic auth — username:password
curl 'https://api.example.com/data' -u 'myuser:mypassword'
# cURL auto-encodes as Base64 and sets Authorization: Basic header

# API key in a header (varies by API — check the docs)
curl 'https://api.example.com/data' -H 'X-API-Key: sk-live-abc123'

# API key in a query string
curl 'https://api.example.com/data?api_key=sk-live-abc123'

# GitHub API example (token in header)
curl 'https://api.github.com/user/repos' \
  -H 'Authorization: token ghp_yourtoken' \
  -H 'Accept: application/vnd.github.v3+json'

# OpenAI API example
curl 'https://api.openai.com/v1/models' \
  -H 'Authorization: Bearer sk-proj-...'`}
      </CodeBlock>

      <AlertBox type="warning" title="Never put tokens in URLs in production">
        API keys in query strings (<code>?api_key=TOKEN</code>) appear in server logs, browser
        history, referrer headers, and intermediary proxies. Always use the{' '}
        <code>Authorization</code> header for auth tokens in production. Query string auth is
        only acceptable for short-lived, low-privilege tokens in specific contexts.
      </AlertBox>

      <SectionHeader number={5} title="cURL PUT, PATCH, DELETE — Full CRUD" />

      <CodeBlock lang="bash" title="Full CRUD with cURL">
{`BASE='https://api.example.com'
TOKEN='Bearer TOKEN'

# READ — GET a single resource
curl "$BASE/users/42" -H "Authorization: $TOKEN"

# CREATE — POST a new resource
curl -X POST "$BASE/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{"name": "Bob", "email": "bob@example.com"}'

# FULL UPDATE — PUT replaces the entire resource
curl -X PUT "$BASE/users/42" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{"name": "Bob Smith", "email": "bob@example.com", "role": "viewer"}'

# PARTIAL UPDATE — PATCH updates only specified fields
curl -X PATCH "$BASE/users/42" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{"role": "admin"}'

# DELETE
curl -X DELETE "$BASE/users/42" -H "Authorization: $TOKEN"
# Returns 204 No Content on success`}
      </CodeBlock>

      <SectionHeader number={6} title="Useful cURL Debugging Flags" />
      <p>
        These flags help diagnose connection issues, TLS problems, redirects, and slow
        requests. Invaluable when an API call works in the browser but fails from your script.
      </p>

      <CodeBlock lang="bash" title="Essential cURL debugging flags">
{`# -v (verbose) — see the full request, response headers, TLS handshake
curl -v 'https://api.example.com/data'

# -w (write-out) — time the request breakdown
curl -w "\n\nDNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTotal: %{time_total}s\n" \
  -o /dev/null -s 'https://api.example.com/data'

# -L (follow redirects) — follow 301/302 automatically
curl -L 'https://api.example.com/old-path'

# -k (insecure) — skip SSL cert validation (dev/testing only, never production)
curl -k 'https://localhost:8443/api'

# --retry 3 — retry on connection failure
curl --retry 3 --retry-delay 2 'https://api.example.com/data'

# --limit-rate 100k — throttle download speed (useful for testing)
curl --limit-rate 100k 'https://api.example.com/large-file.json'

# -x (proxy) — route through a proxy server
curl -x 'http://proxy.internal:8080' 'https://api.example.com/data'

# --resolve — test with a specific IP (bypass DNS for one request)
curl --resolve 'api.example.com:443:192.168.1.100' 'https://api.example.com/data'`}
      </CodeBlock>

      <SectionHeader number={7} title="From cURL to Production Code — Convert in One Paste" />
      <p>
        Once you have validated an API call with cURL, the next step is getting it into your
        application. Rather than translating the command by hand, paste it into the online
        converter for clean, working code in seconds.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Validate the request with cURL first',
          desc: 'Run the cURL command in your terminal and confirm you get the expected response. Fix auth, headers, and payload issues at the cURL level — it is much faster than debugging application code.',
        },
        {
          title: 'Pick your target language',
          desc: 'For Python scripts, data pipelines, and automation: use the cURL → Python converter. For React, Vue, Node.js backend, or serverless functions: use the cURL → JavaScript converter (fetch or Axios).',
        },
        {
          title: 'Paste the cURL and copy the code',
          desc: 'Go to unblockdevs.com/curl-to-python or unblockdevs.com/curl-converter. Paste the cURL command. The tool parses all flags — URL, headers, body, auth, method — and generates idiomatic code for your chosen language.',
        },
        {
          title: 'Add error handling and use in production',
          desc: 'The generated code includes the request structure. Add try/except (Python) or try/catch (JavaScript), handle specific status codes, and wrap it in your service layer. The hard part — getting the request right — is already done.',
        },
      ]} />

      <AlertBox type="tip" title="Pro workflow: Chrome DevTools → cURL → Python or JavaScript">
        In Chrome: press F12 → Network tab → find the API request you want to replicate →
        right-click → Copy → Copy as cURL. Paste at{' '}
        <a href="https://unblockdevs.com/curl-to-python" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          curl-to-python
        </a>{' '}
        or{' '}
        <a href="https://unblockdevs.com/curl-converter" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          curl-converter
        </a>
        . Working application code in under 60 seconds.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I use cURL to make a GET request to an API?',
          answer: 'Run: curl "https://api.example.com/endpoint". For JSON APIs, add Accept: application/json: curl -H "Accept: application/json" "https://api.example.com/users". To see response headers too, add -i. To see the full request/response, add -v. Pipe through python3 -m json.tool to pretty-print JSON output.',
        },
        {
          question: 'How do I send JSON data with cURL?',
          answer: 'Use -X POST -H "Content-Type: application/json" -d \'{"key": "value"}\'. The -d flag sends the data as the request body. Always include Content-Type: application/json or the API may reject the request with 400 or 415. For complex payloads, save the JSON to a file and use -d @payload.json.',
        },
        {
          question: 'How do I add a Bearer token to a cURL request?',
          answer: 'Use the -H flag: curl "https://api.example.com/data" -H "Authorization: Bearer YOUR_TOKEN". Replace YOUR_TOKEN with your actual token. For Basic auth (username:password), use the -u flag: curl -u "username:password" "https://api.example.com/data".',
        },
        {
          question: 'Why does my cURL request return a 401 Unauthorized error?',
          answer: 'The token is missing, wrong, or expired. Check: (1) The Authorization header is spelled correctly and has "Bearer " with a space before the token. (2) The token is current — tokens expire; get a fresh one. (3) You are using the right endpoint — some APIs have separate auth domains. Add -v to see exactly what headers cURL is sending.',
        },
        {
          question: 'How do I convert a cURL command to Python or JavaScript?',
          answer: 'Paste the cURL command into unblockdevs.com/curl-to-python for Python requests code, or unblockdevs.com/curl-converter for JavaScript fetch, Axios, Go, PHP, and other languages. The tools handle all flags — headers, auth, method, body, cookies — automatically.',
        },
        {
          question: 'How do I use cURL to test a POST request?',
          answer: 'For JSON: curl -X POST "https://api.example.com/endpoint" -H "Content-Type: application/json" -d \'{"key": "value"}\'. For form data: curl -X POST "https://api.example.com/login" -d "username=user&password=pass". For multipart/file upload: curl -X POST "https://api.example.com/upload" -F "file=@/path/to/file.pdf" -F "name=myfile".',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
