'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function CurlVsPythonRequestsComparisonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl vs Python requests — Full Comparison with Side-by-Side Examples</h1>
      <p className="lead">
        curl and Python requests are both HTTP clients — but built for very different contexts.
        curl is a command-line tool perfect for testing, scripting, and one-off API calls.
        Python requests is a library for production code, automation, and complex HTTP workflows.
        This guide shows every common pattern side by side.
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
          { label: 'Use case', left: 'Testing an API endpoint quickly', right: 'Making HTTP calls in production code' },
          { label: 'Use case', left: 'Sharing an API call with a teammate', right: 'Handling responses, parsing JSON, error handling' },
          { label: 'Use case', left: 'Shell scripts and CI/CD pipelines', right: 'Automating multi-step API workflows' },
          { label: 'Use case', left: 'Debugging what exactly is being sent', right: 'Retry logic, session management, connection pooling' },
          { label: 'Use case', left: 'One-liner from the command line', right: 'Any Python program that needs HTTP' },
        ]}
      />

      <SectionHeader number={2} title="Basic GET Request" />
      <CodeBlock language="bash" filename="GET Request — curl vs Python">
{`# curl:
curl https://api.example.com/users

# Python requests:
import requests
response = requests.get('https://api.example.com/users')
print(response.status_code)   # 200
print(response.json())         # parsed JSON

# curl with query params:
curl "https://api.example.com/users?page=2&limit=10"

# Python (auto-encodes):
response = requests.get(
    'https://api.example.com/users',
    params={'page': 2, 'limit': 10}
)`}
      </CodeBlock>

      <SectionHeader number={3} title="POST with JSON Body" />
      <ErrorFix
        bad={`# curl sends JSON:
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"alice@example.com"}'

# ❌ WRONG Python equivalent — sends form data, not JSON!
requests.post(url, data={"name": "Alice", "email": "alice@example.com"})`}
        good={`# ✅ CORRECT — use json= parameter
response = requests.post(
    'https://api.example.com/users',
    json={"name": "Alice", "email": "alice@example.com"}
    # json= automatically sets Content-Type: application/json
)`}
        badLabel="data= sends form encoding (wrong)"
        goodLabel="json= matches curl -d with JSON Content-Type"
      />

      <SectionHeader number={4} title="Headers and Authentication" />
      <CodeBlock language="bash" filename="Headers and Auth — curl vs Python">
{`# Custom headers:
# curl:
curl -H "Authorization: Bearer mytoken" \\
     -H "X-Custom-Header: value" \\
     https://api.example.com/protected

# Python:
response = requests.get(
    'https://api.example.com/protected',
    headers={
        'Authorization': 'Bearer mytoken',
        'X-Custom-Header': 'value',
    }
)

# Basic auth:
# curl:
curl -u username:password https://api.example.com

# Python:
response = requests.get(url, auth=('username', 'password'))

# Digest auth:
from requests.auth import HTTPDigestAuth
response = requests.get(url, auth=HTTPDigestAuth('user', 'pass'))`}
      </CodeBlock>

      <SectionHeader number={5} title="File Upload" />
      <CodeBlock language="bash" filename="File Upload — curl vs Python">
{`# curl:
curl -X POST -F "file=@photo.jpg" -F "user_id=123" \\
  https://api.example.com/upload

# Python:
with open('photo.jpg', 'rb') as f:
    response = requests.post(
        'https://api.example.com/upload',
        files={'file': f},
        data={'user_id': '123'}
    )

# With custom filename and content-type:
response = requests.post(
    url,
    files={'file': ('custom_name.jpg', open('photo.jpg','rb'), 'image/jpeg')}
)`}
      </CodeBlock>

      <SectionHeader number={6} title="Session / Cookie Handling" />
      <CodeBlock language="bash" filename="Sessions and Cookies">
{`# curl maintains cookies across redirects with -c / -b:
curl -c cookies.txt -b cookies.txt https://api.example.com/login \\
  -d "user=alice&pass=secret"
curl -b cookies.txt https://api.example.com/dashboard

# Python requests.Session() handles cookies automatically:
session = requests.Session()

# Login (sets session cookies)
session.post('https://api.example.com/login',
             data={'user': 'alice', 'pass': 'secret'})

# Cookies automatically included in subsequent requests
dashboard = session.get('https://api.example.com/dashboard')

# Set default headers for all session requests:
session.headers.update({'Authorization': 'Bearer mytoken'})`}
      </CodeBlock>

      <SectionHeader number={7} title="Full Flag Reference" />
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
          { label: '-k', left: 'Skip SSL', right: 'verify=False' },
          { label: '--max-time 30', left: 'Total timeout', right: 'timeout=30' },
          { label: '--connect-timeout 5', left: 'Connect timeout', right: 'timeout=(5, 30) (connect, read)' },
          { label: '-L', left: 'Follow redirects', right: 'allow_redirects=True (default)' },
          { label: '-o file.json', left: 'Save to file', right: "open('file.json','wb').write(resp.content)" },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Why does my Python requests call fail when curl works?',
          answer: 'Most common causes: (1) Missing Content-Type header — curl infers it, requests needs it explicit unless you use json=. (2) User-Agent difference — some APIs block non-browser agents. Add headers={"User-Agent": "curl/7.88.0"}. (3) SSL certificate issues — try verify=False temporarily. (4) Cookie/session state — add cookies from browser or use Session.',
        },
        {
          question: 'Is requests faster or slower than curl?',
          answer: 'For single requests, performance is similar. curl is a C program and slightly lower overhead. For high-throughput Python code, use httpx with async for concurrent requests. requests.Session() uses connection pooling which is much faster than creating a new connection per request.',
        },
        {
          question: 'What is the Python equivalent of curl --data-raw?',
          answer: '--data-raw sends the string literally without any special processing. In Python: requests.post(url, data="raw string here", headers={"Content-Type": "text/plain"}). If sending pre-formatted JSON string: requests.post(url, data=json_string, headers={"Content-Type": "application/json"}).',
        },
        {
          question: 'Should I use requests or httpx in 2026?',
          answer: 'requests for synchronous code — it\'s battle-tested and API is perfect. httpx for async code (FastAPI, asyncio) or if you need HTTP/2 support. httpx\'s API is nearly identical to requests, so migration is easy. requests does not support async; httpx supports both sync and async.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
