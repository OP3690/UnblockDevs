'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CurlToPythonRequestsGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl to Python requests — Complete Conversion Guide</h1>
      <p className="lead">
        curl commands are the universal language of API testing. This guide shows you how to convert any
        curl command to Python requests — GET, POST, headers, auth, cookies, files, and more — with
        side-by-side comparisons for every pattern. We also cover Sessions, retry logic, async with
        httpx, and real-world error handling so your converted code is production-ready.
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
          { label: 'Follow redirects', left: 'curl -L https://...', right: 'requests.get(url, allow_redirects=True)  # default' },
          { label: 'HEAD request', left: 'curl -I https://...', right: 'requests.head(url)' },
          { label: 'Silent output', left: 'curl -s https://...', right: '# requests is silent by default' },
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
data = resp.json()       # parse JSON response

# Always check status before using data
resp.raise_for_status()  # raises HTTPError for 4xx/5xx

# Access specific response parts
print(resp.headers["Content-Type"])
print(resp.elapsed.total_seconds())  # request timing`}
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
# requests automatically sets: Content-Type: application/json
print(resp.status_code)   # 201
print(resp.json())         # {"id": 42, "name": "Alice", ...}`}
        badLabel="data= sends form encoding"
        goodLabel="json= sends JSON with correct Content-Type"
      />

      <CodeBlock language="python" filename="POST, PUT, PATCH, DELETE">
{`import requests

BASE = "https://api.example.com"

# POST — create resource
resp = requests.post(f"{BASE}/users", json={"name": "Alice"})

# PUT — replace resource
resp = requests.put(f"{BASE}/users/42", json={"name": "Alice Updated"})

# PATCH — partial update
resp = requests.patch(f"{BASE}/users/42", json={"email": "new@example.com"})

# DELETE — remove resource
resp = requests.delete(f"{BASE}/users/42")
print(resp.status_code)  # 204 No Content

# All methods support the same parameters: headers, json, data, params, timeout`}
      </CodeBlock>

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
resp = requests.get(url, auth=HTTPBasicAuth("user", "pass"))

# Digest Auth:
from requests.auth import HTTPDigestAuth
resp = requests.get(url, auth=HTTPDigestAuth("user", "pass"))

# API Key in header:
resp = requests.get(url, headers={"X-API-Key": "your_api_key_here"})`}
      </CodeBlock>

      <SectionHeader number={4} title="POST Form Data and File Upload" />
      <CodeBlock language="python" filename="Form Data and File Upload">
{`# Form data (URL-encoded):
# curl -X POST -d "username=alice&password=secret" https://...
resp = requests.post(url, data={"username": "alice", "password": "secret"})
# Content-Type: application/x-www-form-urlencoded

# Multipart form data:
# curl -X POST -F "username=alice" -F "password=secret" https://...
resp = requests.post(url, data={"username": "alice", "password": "secret"})

# File upload:
# curl -X POST -F "file=@photo.jpg" https://api.example.com/upload
with open("photo.jpg", "rb") as f:
    resp = requests.post(
        "https://api.example.com/upload",
        files={"file": f}
    )

# File upload with custom filename and content type:
resp = requests.post(
    "https://api.example.com/upload",
    files={"file": ("custom_name.jpg", open("photo.jpg", "rb"), "image/jpeg")},
    data={"user_id": "123", "description": "Profile photo"}
)

# Multiple files:
resp = requests.post(url, files=[
    ("images", ("photo1.jpg", open("photo1.jpg", "rb"), "image/jpeg")),
    ("images", ("photo2.jpg", open("photo2.jpg", "rb"), "image/jpeg")),
])`}
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
    "Accept": "application/json",
})

# Login (sets cookies automatically via Set-Cookie headers)
login_resp = session.post(
    "https://api.example.com/login",
    json={"user": "alice", "pass": "secret"}
)
login_resp.raise_for_status()

# Subsequent requests reuse cookies and headers automatically
profile = session.get("https://api.example.com/me")
orders  = session.get("https://api.example.com/orders")

# Override headers for a single request
admin_resp = session.get(
    "https://api.example.com/admin",
    headers={"X-Admin-Token": "special-token"}  # merged with session headers
)

# Always close session when done (or use as context manager)
with requests.Session() as s:
    s.headers.update({"Authorization": "Bearer token"})
    data = s.get("https://api.example.com/data").json()`}
      </CodeBlock>

      <SectionHeader number={6} title="Timeout, Retry, SSL" />
      <CodeBlock language="python" filename="Timeouts, Retries, SSL">
{`from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Timeout (connect timeout, read timeout):
# curl --connect-timeout 5 --max-time 30 https://...
resp = requests.get(url, timeout=(5, 30))  # (connect, read) in seconds
resp = requests.get(url, timeout=10)       # single value applies to both

# Retry with exponential backoff:
session = requests.Session()
retry = Retry(
    total=3,
    backoff_factor=1,          # sleep 1s, 2s, 4s between retries
    status_forcelist=[500, 502, 503, 504],
    allowed_methods=["GET", "POST"],
)
adapter = HTTPAdapter(max_retries=retry)
session.mount("https://", adapter)
session.mount("http://", adapter)

# Skip SSL verification (dev only! Never in production):
# curl -k https://...
resp = requests.get(url, verify=False)
import urllib3
urllib3.disable_warnings()  # suppress SSL warning

# Use a custom CA bundle:
resp = requests.get(url, verify="/path/to/ca-bundle.crt")

# Client certificate authentication:
# curl --cert client.crt --key client.key https://...
resp = requests.get(url, cert=("client.crt", "client.key"))`}
      </CodeBlock>

      <SectionHeader number={7} title="Async with httpx — Drop-in Replacement" />
      <QuickFact color="purple" label="When to use httpx">
        httpx is a near-identical API to requests but with full async/await support and HTTP/2.
        Use it in FastAPI, async Django, or any asyncio-based application. Install with: pip install httpx
      </QuickFact>

      <CodeBlock language="python" filename="httpx async — equivalent to curl in parallel">
{`import asyncio
import httpx

# Sync httpx (drop-in requests replacement):
with httpx.Client() as client:
    resp = client.get("https://api.example.com/users")
    print(resp.json())

# Async httpx (concurrent requests — much faster than sequential):
async def fetch_all():
    async with httpx.AsyncClient() as client:
        # Fire all requests concurrently
        tasks = [
            client.get("https://api.example.com/users/1"),
            client.get("https://api.example.com/users/2"),
            client.get("https://api.example.com/users/3"),
        ]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]

# Run:
results = asyncio.run(fetch_all())

# Streaming large responses (equivalent to curl piped to file):
async def stream_download():
    async with httpx.AsyncClient() as client:
        async with client.stream("GET", "https://example.com/large-file") as r:
            async for chunk in r.aiter_bytes(chunk_size=8192):
                process_chunk(chunk)`}
      </CodeBlock>

      <SectionHeader number={8} title="Quick curl Flag Reference" />
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
          { label: 'Proxy', left: '--proxy http://proxy:8080', right: 'proxies={"http": "http://proxy:8080"}' },
        ]}
      />

      <SectionHeader number={9} title="Complete Error Handling Pattern" />
      <CodeBlock language="python" filename="Production-ready request with full error handling">
{`import requests
from requests.exceptions import (
    ConnectionError, Timeout, HTTPError, RequestException
)

def safe_api_call(url: str, **kwargs) -> dict | None:
    """
    Production-ready GET request with full error handling.
    Equivalent to: curl -s --max-time 10 --retry 3 <url>
    """
    try:
        resp = requests.get(url, timeout=(5, 10), **kwargs)
        resp.raise_for_status()  # raise on 4xx/5xx
        return resp.json()

    except Timeout:
        print(f"Request timed out: {url}")
    except ConnectionError:
        print(f"Cannot connect to: {url}")
    except HTTPError as e:
        status = e.response.status_code
        if status == 401:
            print("Authentication failed — check your token")
        elif status == 403:
            print("Permission denied")
        elif status == 404:
            print(f"Not found: {url}")
        elif status == 429:
            retry_after = e.response.headers.get("Retry-After", "unknown")
            print(f"Rate limited. Retry after: {retry_after}s")
        elif status >= 500:
            print(f"Server error {status} — try again later")
        else:
            print(f"HTTP error {status}: {e}")
    except RequestException as e:
        print(f"Unexpected request error: {e}")
    except ValueError:
        print("Response is not valid JSON")

    return None`}
      </CodeBlock>

      <VerticalSteps steps={[
        { title: 'Install requests', desc: 'pip install requests — it\'s not in the standard library. For async, also pip install httpx. Pin versions in requirements.txt: requests==2.32.3' },
        { title: 'Identify the curl flags', desc: 'Parse your curl command for: method (-X), headers (-H), body (-d or --data-raw), auth (-u), files (-F), and SSL flags (-k, --cacert).' },
        { title: 'Map to requests parameters', desc: 'Use the reference table above. Key rules: -H → headers={}, -d with JSON → json={}, -d with form → data={}, -F → files={}, -u → auth=().' },
        { title: 'Add timeout and raise_for_status', desc: 'All production code should have timeout=(connect, read) and call resp.raise_for_status() before accessing resp.json() to surface 4xx/5xx errors.' },
        { title: 'Use Session for multiple requests', desc: 'If making multiple calls to the same API, use requests.Session() to share headers, cookies, and connection pooling. 30-50% faster for repeated calls.' },
        { title: 'Test with the same endpoint', desc: 'Run both the original curl and your Python code against the same endpoint and compare responses. Use httpbin.org for testing — it echoes back your request details.' },
      ]} />

      <AlertBox type="tip" title="Test your conversion with httpbin.org">
        httpbin.org is a free HTTP testing service that echoes back exactly what it received — headers,
        body, method, query params. Use it to verify your Python code sends the same request as your
        curl command: requests.post("https://httpbin.org/post", json={"{...}"}) will show you exactly
        what the server received.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between data= and json= in requests.post()?',
          answer: 'data= sends the body as URL-encoded form data (Content-Type: application/x-www-form-urlencoded) when passed a dict, or as a raw string when passed a string. json= serializes the dict to JSON and automatically sets Content-Type: application/json. For REST APIs that expect JSON bodies, always use json=. Using data= with a dict and manually setting Content-Type: application/json is a common mistake — the body will still be form-encoded, not JSON.',
        },
        {
          question: 'How do I handle the response correctly?',
          answer: 'The key response properties: resp.json() parses JSON body (raises ValueError if not JSON). resp.text is the raw text body. resp.content is raw bytes. resp.status_code is the HTTP status (200, 404, etc.). resp.headers is the response headers dict. resp.raise_for_status() raises an HTTPError for any 4xx/5xx status — call this before accessing the body to surface errors immediately rather than silently getting error HTML instead of JSON.',
        },
        {
          question: 'What is httpx and when should I use it instead of requests?',
          answer: 'httpx is a modern HTTP client with async/await support and HTTP/2. The API is nearly identical to requests. Use httpx when: writing async code with asyncio/FastAPI/async Django, making many requests concurrently (gather + async), needing HTTP/2 support, or wanting a faster drop-in replacement. Install with pip install httpx. Replace requests.get() with httpx.get() and requests.Session() with httpx.Client() for sync use.',
        },
        {
          question: 'How do I convert a curl command automatically?',
          answer: 'Use the curl-to-Python converter tool at unblockdevs.com, or try curlconverter.com — both parse your curl command and generate equivalent Python requests code. For quick one-offs, paste your curl into ChatGPT with "Convert this curl command to Python requests" and it will produce working code. Always review the generated code before using it in production, especially for auth headers.',
        },
        {
          question: 'How do I send raw binary data or a custom content type?',
          answer: 'Use data= with bytes and set headers manually: resp = requests.post(url, data=binary_bytes, headers={"Content-Type": "application/octet-stream"}). For XML: data=xml_string, headers={"Content-Type": "application/xml"}. For custom types: data=payload, headers={"Content-Type": "application/vnd.custom+json"}. The json= parameter should only be used for actual Python dicts that need JSON serialization.',
        },
        {
          question: 'How do I debug what my Python code is actually sending?',
          answer: 'Use a PreparedRequest to inspect the outgoing request before sending: req = requests.Request("POST", url, json=body, headers=headers).prepare(); print(req.body, req.headers). Or send to httpbin.org/anything which echoes everything back. You can also enable HTTP logging: import logging; logging.basicConfig(level=logging.DEBUG) — this shows the raw HTTP headers and body being sent. For SSL issues, add verify=False and check if that resolves it.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
