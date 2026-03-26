'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function CurlToPythonRequestsGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl to Python requests — Complete Conversion Guide</h1>
      <p className="lead">
        curl commands are the universal language of API testing. This guide shows you how to convert any
        curl command to Python requests — GET, POST, headers, auth, cookies, files, and more — with
        side-by-side comparisons for every pattern.
      </p>

      <StatGrid stats={[
        { value: '100%', label: 'curl flags covered', color: 'green' },
        { value: 'requests', label: 'the Python HTTP standard library', color: 'blue' },
        { value: 'httpx', label: 'async alternative covered too', color: 'purple' },
        { value: 'Session', label: 'for persistent connections + cookies', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Basic GET Request" />
      <CompareTable
        leftLabel="curl"
        rightLabel="Python requests"
        rows={[
          { label: 'Simple GET', left: 'curl https://api.example.com/users', right: 'requests.get("https://api.example.com/users")' },
          { label: 'Verbose', left: 'curl -v https://api.example.com', right: 'resp = requests.get(url)\nprint(resp.status_code, resp.headers)' },
          { label: 'Save to file', left: 'curl -o output.json https://...', right: 'with open("output.json","wb") as f:\n  f.write(resp.content)' },
        ]}
      />

      <CodeBlock language="python" filename="GET with query params">
{`import requests

# curl "https://api.example.com/users?page=2&limit=10"
resp = requests.get(
    "https://api.example.com/users",
    params={"page": 2, "limit": 10}  # auto-encoded into URL
)
print(resp.status_code)  # 200
data = resp.json()       # parse JSON response`}
      </CodeBlock>

      <SectionHeader number={2} title="POST with JSON Body" />
      <ErrorFix
        bad={`# curl -X POST https://api.example.com/users \\
#   -H "Content-Type: application/json" \\
#   -d '{"name":"Alice","email":"alice@example.com"}'

# Wrong — sends as form data, not JSON
requests.post(url, data={"name": "Alice"})`}
        good={`# Correct — use json= parameter (sets Content-Type automatically)
resp = requests.post(
    "https://api.example.com/users",
    json={"name": "Alice", "email": "alice@example.com"}
)
# requests automatically sets: Content-Type: application/json`}
        badLabel="data= sends form encoding"
        goodLabel="json= sends JSON with correct Content-Type"
      />

      <SectionHeader number={3} title="Headers and Auth" />
      <CodeBlock language="python" filename="Custom Headers + Bearer Token">
{`# curl -H "Authorization: Bearer mytoken123" \\
#      -H "X-Custom-Header: value" \\
#      https://api.example.com/protected

resp = requests.get(
    "https://api.example.com/protected",
    headers={
        "Authorization": "Bearer mytoken123",
        "X-Custom-Header": "value",
    }
)

# Basic Auth:
# curl -u username:password https://api.example.com
resp = requests.get(url, auth=("username", "password"))

# Or with requests.auth:
from requests.auth import HTTPBasicAuth
resp = requests.get(url, auth=HTTPBasicAuth("user", "pass"))`}
      </CodeBlock>

      <SectionHeader number={4} title="POST Form Data and File Upload" />
      <CodeBlock language="python" filename="Form Data and File Upload">
{`# Form data:
# curl -X POST -F "username=alice" -F "password=secret" https://...
resp = requests.post(url, data={"username": "alice", "password": "secret"})

# File upload:
# curl -X POST -F "file=@photo.jpg" https://api.example.com/upload
with open("photo.jpg", "rb") as f:
    resp = requests.post(
        "https://api.example.com/upload",
        files={"file": f}
    )

# File upload with additional fields:
resp = requests.post(
    "https://api.example.com/upload",
    files={"file": open("photo.jpg", "rb")},
    data={"user_id": "123"}
)`}
      </CodeBlock>

      <SectionHeader number={5} title="Session — Persistent Cookies and Headers" />
      <CodeBlock language="python" filename="Session for Multiple Requests">
{`# curl handles cookies automatically — Python needs Session
import requests

session = requests.Session()

# Set default headers for all requests in this session
session.headers.update({
    "Authorization": "Bearer mytoken",
    "User-Agent": "MyApp/1.0",
})

# Login (sets cookies)
session.post("https://api.example.com/login", json={"user": "alice", "pass": "secret"})

# Subsequent requests reuse cookies automatically
profile = session.get("https://api.example.com/me")
orders  = session.get("https://api.example.com/orders")`}
      </CodeBlock>

      <SectionHeader number={6} title="Timeout, Retry, SSL" />
      <CodeBlock language="python" filename="Timeouts, Retries, SSL">
{`from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Timeout (connect, read):
# curl --connect-timeout 5 --max-time 30 https://...
resp = requests.get(url, timeout=(5, 30))

# Retry with backoff:
session = requests.Session()
retry = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503])
adapter = HTTPAdapter(max_retries=retry)
session.mount("https://", adapter)

# Skip SSL verification (dev only! Never in production):
# curl -k https://...
resp = requests.get(url, verify=False)

# Use a custom CA bundle:
resp = requests.get(url, verify="/path/to/ca-bundle.crt")`}
      </CodeBlock>

      <SectionHeader number={7} title="Quick curl Flag Reference" />
      <CompareTable
        leftLabel="curl flag"
        rightLabel="requests equivalent"
        rows={[
          { label: 'Method', left: '-X POST / -X PUT', right: 'requests.post() / requests.put()' },
          { label: 'Header', left: '-H "Key: Value"', right: 'headers={"Key": "Value"}' },
          { label: 'JSON body', left: '-d \'{"key":"val"}\'', right: 'json={"key": "val"}' },
          { label: 'Form data', left: '-F "key=val"', right: 'data={"key": "val"}' },
          { label: 'Basic auth', left: '-u user:pass', right: 'auth=("user", "pass")' },
          { label: 'Bearer token', left: '-H "Authorization: Bearer ..."', right: 'headers={"Authorization": "Bearer ..."}' },
          { label: 'Skip SSL', left: '-k / --insecure', right: 'verify=False' },
          { label: 'Timeout', left: '--max-time 30', right: 'timeout=30' },
          { label: 'Follow redirects', left: '-L (default on)', right: 'allow_redirects=True (default)' },
          { label: 'Verbose', left: '-v', right: 'print(resp.status_code, resp.headers)' },
          { label: 'Cookies', left: '-b "key=val"', right: 'cookies={"key": "val"}' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between data= and json= in requests.post()?',
          answer: 'data= sends the body as URL-encoded form data (Content-Type: application/x-www-form-urlencoded) or as a raw string. json= serializes the dict to JSON and sets Content-Type: application/json automatically. For REST APIs, always use json=.',
        },
        {
          question: 'How do I handle the response correctly?',
          answer: 'resp.json() — parse JSON body. resp.text — raw text body. resp.content — bytes. resp.status_code — HTTP status. resp.headers — response headers. resp.raise_for_status() — raises HTTPError for 4xx/5xx.',
        },
        {
          question: 'What is httpx and when should I use it instead of requests?',
          answer: 'httpx is a modern HTTP client with async support. Use it for: async code (async/await with asyncio), HTTP/2 support, or as a drop-in replacement for requests in async frameworks (FastAPI, etc.). API is nearly identical to requests.',
        },
        {
          question: 'How do I convert a curl command automatically?',
          answer: 'Use our curl-to-Python converter tool on this site, or paste your curl command into ChatGPT with the prompt "Convert this curl to Python requests". curlconverter.com is another option.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
