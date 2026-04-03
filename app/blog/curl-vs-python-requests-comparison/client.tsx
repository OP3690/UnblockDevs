'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CurlVsPythonRequestsComparisonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl vs Python requests — Full Comparison with Side-by-Side Examples</h1>
      <p className="lead">
        curl and Python requests are both HTTP clients — but built for very different contexts.
        curl is a command-line tool perfect for testing, scripting, and one-off API calls.
        Python requests is a library for production code, automation, and complex HTTP workflows.
        This guide shows every common pattern side by side with complete working examples.
      </p>

      <StatGrid stats={[
        { value: 'curl', label: 'perfect for testing and one-off API calls', color: 'blue' },
        { value: 'requests', label: 'perfect for production Python code', color: 'green' },
        { value: '1:1', label: 'mapping exists for almost every curl flag', color: 'purple' },
        { value: 'Session', label: 'requests.Session() handles cookies like curl -c', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="When to Use Each" />
      <CompareTable
        leftLabel="Use curl When..."
        rightLabel="Use Python requests When..."
        rows={[
          { label: 'Primary use', left: 'Testing an API endpoint quickly from terminal', right: 'Making HTTP calls in production Python code' },
          { label: 'Sharing', left: 'Sharing a reproducible API call with a teammate', right: 'Handling responses, parsing JSON, proper error handling' },
          { label: 'Automation', left: 'Shell scripts and CI/CD pipelines (bash)', right: 'Complex multi-step API workflows with Python logic' },
          { label: 'Debugging', left: 'Seeing exactly what is being sent with -v', right: 'Retry logic, session management, connection pooling' },
          { label: 'Quick use', left: 'One-liner from the command line', right: 'Any Python program that needs HTTP calls' },
          { label: 'Performance', left: 'High-throughput download/upload scripts', right: 'Async HTTP with httpx for concurrent requests' },
        ]}
      />

      <SectionHeader number={2} title="Basic GET Request" />
      <CodeBlock language="bash" filename="GET Request — curl vs Python">
{`# curl — simplest form:
curl https://api.example.com/users

# curl with verbose output (shows headers):
curl -v https://api.example.com/users

# Python requests — simple GET:
import requests
response = requests.get('https://api.example.com/users')
print(response.status_code)    # 200
print(response.json())          # parsed JSON dict/list
print(response.headers)         # response headers
print(response.elapsed)         # request timing

# curl with query params:
curl "https://api.example.com/users?page=2&limit=10"

# Python (auto-encodes to URL):
response = requests.get(
    'https://api.example.com/users',
    params={'page': 2, 'limit': 10}
    # → GET /users?page=2&limit=10
)

# Always check for errors:
response.raise_for_status()  # raises HTTPError for 4xx/5xx
data = response.json()`}
      </CodeBlock>

      <SectionHeader number={3} title="POST with JSON Body" />
      <ErrorFix
        bad={`# curl sends JSON correctly:
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"alice@example.com"}'

# ❌ WRONG Python equivalent — sends form data, not JSON!
requests.post(url, data={"name": "Alice", "email": "alice@example.com"})
# Content-Type: application/x-www-form-urlencoded  ← wrong!`}
        good={`# ✅ CORRECT — use json= parameter (matches curl -d with JSON)
response = requests.post(
    'https://api.example.com/users',
    json={"name": "Alice", "email": "alice@example.com"}
)
# requests automatically sets: Content-Type: application/json
# requests automatically serializes the dict to JSON string
print(response.status_code)  # 201
print(response.json())        # {"id": 42, "name": "Alice", ...}`}
        badLabel="data= sends form encoding (wrong for JSON APIs)"
        goodLabel="json= matches curl -d with JSON Content-Type"
      />

      <SectionHeader number={4} title="Headers and Authentication" />
      <CodeBlock language="bash" filename="Headers and Auth — curl vs Python">
{`# Custom headers:
# curl:
curl -H "Authorization: Bearer mytoken" \\
     -H "X-Custom-Header: value" \\
     -H "Accept: application/json" \\
     https://api.example.com/protected

# Python requests:
response = requests.get(
    'https://api.example.com/protected',
    headers={
        'Authorization': 'Bearer mytoken',
        'X-Custom-Header': 'value',
        'Accept': 'application/json',
    }
)

# Basic auth:
# curl:
curl -u username:password https://api.example.com

# Python:
response = requests.get(url, auth=('username', 'password'))

# Digest auth:
from requests.auth import HTTPDigestAuth
response = requests.get(url, auth=HTTPDigestAuth('user', 'pass'))

# API key in header:
# curl -H "X-API-Key: your_key" https://api.example.com
response = requests.get(url, headers={'X-API-Key': 'your_key'})`}
      </CodeBlock>

      <SectionHeader number={5} title="File Upload" />
      <CodeBlock language="bash" filename="File Upload — curl vs Python">
{`# curl single file upload:
curl -X POST -F "file=@photo.jpg" -F "user_id=123" \\
  https://api.example.com/upload

# Python equivalent:
with open('photo.jpg', 'rb') as f:
    response = requests.post(
        'https://api.example.com/upload',
        files={'file': f},
        data={'user_id': '123'}
    )

# With custom filename and content type:
response = requests.post(
    url,
    files={'file': ('custom_name.jpg', open('photo.jpg','rb'), 'image/jpeg')}
)

# Multiple files:
response = requests.post(url, files=[
    ('images', ('photo1.jpg', open('photo1.jpg', 'rb'), 'image/jpeg')),
    ('images', ('photo2.jpg', open('photo2.jpg', 'rb'), 'image/jpeg')),
])`}
      </CodeBlock>

      <SectionHeader number={6} title="Session / Cookie Handling" />
      <CodeBlock language="bash" filename="Sessions and Cookies — curl vs Python">
{`# curl maintains cookies with -c (write) and -b (read):
curl -c cookies.txt https://api.example.com/login \\
  -X POST -d "user=alice&pass=secret"

# Use saved cookies in subsequent requests:
curl -b cookies.txt https://api.example.com/dashboard

# Python requests.Session() handles cookies automatically:
import requests
session = requests.Session()

# Set default headers for ALL session requests:
session.headers.update({
    'Authorization': 'Bearer mytoken',
    'User-Agent': 'MyApp/1.0',
})

# Login (Set-Cookie headers stored automatically):
session.post('https://api.example.com/login',
             json={'user': 'alice', 'pass': 'secret'})

# Cookies and headers automatically included in subsequent requests:
dashboard = session.get('https://api.example.com/dashboard')
profile = session.get('https://api.example.com/me')

# Session also reuses TCP connections (connection pooling) → 30-50% faster`}
      </CodeBlock>

      <SectionHeader number={7} title="Timeout and SSL" />
      <CodeBlock language="bash" filename="Timeout and SSL — curl vs Python">
{`# curl timeouts and SSL:
curl --connect-timeout 5 --max-time 30 https://api.example.com
curl -k https://api.example.com  # skip SSL verification
curl --cacert /path/to/ca.pem https://api.example.com

# Python requests equivalents:
# Separate connect timeout and read timeout:
response = requests.get(url, timeout=(5, 30))  # (connect_sec, read_sec)
response = requests.get(url, timeout=30)        # applies to both

# Skip SSL (dev only — never in production):
import urllib3
urllib3.disable_warnings()
response = requests.get(url, verify=False)

# Custom CA bundle:
response = requests.get(url, verify='/path/to/ca.pem')

# Client certificate:
# curl --cert client.crt --key client.key https://api.example.com
response = requests.get(url, cert=('client.crt', 'client.key'))`}
      </CodeBlock>

      <SectionHeader number={8} title="Full Flag Reference" />
      <CompareTable
        leftLabel="curl flag"
        rightLabel="Python requests equivalent"
        rows={[
          { label: '-X POST', left: 'HTTP method', right: 'requests.post() / requests.request("POST", url)' },
          { label: '-H "K: V"', left: 'Header', right: 'headers={"K": "V"}' },
          { label: '-d "json"', left: 'JSON body', right: 'json={...} (use json=, not data=!)' },
          { label: '-F "key=val"', left: 'Form data', right: 'data={"key": "val"}' },
          { label: '-F "f=@file"', left: 'File upload', right: 'files={"f": open("file","rb")}' },
          { label: '-u user:pass', left: 'Basic auth', right: 'auth=("user", "pass")' },
          { label: '-b "k=v"', left: 'Cookie', right: 'cookies={"k": "v"}' },
          { label: '-k', left: 'Skip SSL verification', right: 'verify=False' },
          { label: '--max-time 30', left: 'Total timeout (seconds)', right: 'timeout=30' },
          { label: '--connect-timeout 5', left: 'Connect timeout only', right: 'timeout=(5, 30) — (connect, read)' },
          { label: '-L', left: 'Follow redirects', right: 'allow_redirects=True (True by default)' },
          { label: '-o file.json', left: 'Save to file', right: "with open('f.json','wb') as f: f.write(resp.content)" },
          { label: '--proxy http://p:8080', left: 'HTTP proxy', right: 'proxies={"http": "http://p:8080"}' },
          { label: '-I', left: 'HEAD request', right: 'requests.head(url)' },
        ]}
      />

      <AlertBox type="tip" title="Debug with httpbin.org">
        Use httpbin.org to test your requests — it echoes back exactly what it received including
        all headers, cookies, and body: requests.post("https://httpbin.org/post", json=your_data).
        Compare curl and Python responses against the same endpoint to verify they match.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Start with curl for discovery', desc: 'Use curl -v to explore an API endpoint. It shows exactly what headers and body the server expects and returns. Much faster to iterate than Python code.' },
        { title: 'Copy curl to Python', desc: 'Once you have a working curl command, use our curl-to-Python converter (or curlconverter.com) to get the Python requests equivalent automatically.' },
        { title: 'Add error handling', desc: 'Call response.raise_for_status() before response.json(). Wrap in try/except for requests.exceptions.RequestException to handle network errors.' },
        { title: 'Use Session for multiple calls', desc: 'If making 2+ calls to the same API, use requests.Session() for connection pooling, shared headers, and automatic cookie management. 30-50% faster.' },
        { title: 'Add timeout to all calls', desc: 'Always set timeout=(5, 30) or similar. Never make a production API call without a timeout — a slow server will hang your program indefinitely.' },
        { title: 'Consider httpx for async', desc: 'If you\'re using FastAPI, asyncio, or making many concurrent requests, switch to httpx. The API is nearly identical to requests but supports async/await.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does my Python requests call fail when curl works?',
          answer: 'Most common causes: (1) Missing Content-Type header — curl infers it from -d; requests needs json= or explicit header. (2) User-Agent mismatch — some APIs block Python\'s default User-Agent. Add headers={"User-Agent": "Mozilla/5.0"}. (3) SSL certificate issues — try verify=False temporarily to confirm. (4) Cookie/session state — the server requires a previous request to set up session state. (5) Redirect handling — curl follows redirects by default; requests also does, but the method might change on redirect.',
        },
        {
          question: 'Is requests faster or slower than curl?',
          answer: 'For single requests, performance is similar. curl is a C program with slightly lower per-call overhead. For high-throughput Python code, use httpx with asyncio for concurrent requests — this can be 10-50x faster than sequential requests calls. requests.Session() uses connection pooling which is much faster (3-5x) than creating a new TCP connection per request. For bulk data download, curl\'s --parallel flag can be faster than Python for simple use cases.',
        },
        {
          question: 'What is the Python equivalent of curl --data-raw?',
          answer: '--data-raw sends the string literally without processing (no @ file reading, no & encoding). Python equivalent: requests.post(url, data="raw_string_here", headers={"Content-Type": "text/plain"}). For sending a pre-formatted JSON string (not a dict): requests.post(url, data=json_string, headers={"Content-Type": "application/json"}). Key difference from json=: data= takes a raw string, json= takes a Python dict that requests serializes.',
        },
        {
          question: 'Should I use requests or httpx in 2026?',
          answer: 'requests for synchronous code — it\'s battle-tested, has a perfect API, and has 50M+ weekly downloads. httpx for: async code (FastAPI, asyncio, any async framework), HTTP/2 support, or if you need type hints (httpx has full type annotations). httpx\'s API is nearly identical to requests, so migration is easy. requests does not support async at all; httpx supports both sync and async with the same interface.',
        },
        {
          question: 'How do I debug what Python requests is actually sending?',
          answer: 'Three methods: (1) Send to httpbin.org/anything which echoes everything back. (2) Use a PreparedRequest to inspect before sending: req = requests.Request("POST", url, json=data).prepare(); print(req.url, req.headers, req.body). (3) Enable HTTP debug logging: import logging; logging.basicConfig(level=logging.DEBUG) — shows full HTTP headers and body. For SSL issues, run with PYTHONHTTPSVERIFY=0 or verify=False temporarily to isolate.',
        },
        {
          question: 'What is the requests equivalent of curl -L (follow redirects)?',
          answer: 'requests follows redirects by default (allow_redirects=True). To disable: requests.get(url, allow_redirects=False). To see the redirect chain: response.history — a list of Response objects for each redirect. Note: requests changes POST to GET on 301/302 redirects (matching browser behavior). To preserve the method on redirect, use 307/308 status codes on the server side.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
