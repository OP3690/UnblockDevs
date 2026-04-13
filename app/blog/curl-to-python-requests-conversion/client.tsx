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

export default function CurlToPythonRequestsConversionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert cURL to Python requests — Complete Step-by-Step Guide</h1>
      <p className="lead">
        You copied a cURL command from Chrome DevTools, Postman, or API documentation — and now
        you need it as Python code. This guide shows you exactly how to convert every cURL
        pattern to Python <code>requests</code>: GET, POST with JSON, form data, auth headers,
        cookies, sessions, and file uploads. Plus the free online converter that does it in
        one paste.
      </p>

      <StatGrid stats={[
        { value: 'requests', label: 'Most popular Python HTTP library — 50M+ downloads/week', color: 'blue' },
        { value: '< 1 min', label: 'Convert any cURL to working Python with the online tool', color: 'green' },
        { value: '15+', label: 'cURL flags that have a direct Python requests equivalent', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Why Convert cURL to Python?" />
      <p>
        cURL is the universal language for HTTP requests — API documentation, browser DevTools,
        Postman, and backend logs all produce cURL commands. But if you are building a Python
        script, a data pipeline, a test suite, or a web scraper, you need the request in Python.
        Translating cURL to Python by hand takes time and is easy to get wrong, especially when
        dealing with multi-line headers, JSON bodies, and auth tokens.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'API docs give you cURL examples',
          description:
            'Nearly every API — Stripe, OpenAI, Twilio, GitHub — shows curl examples first. To use them in Python, you need to convert them.',
        },
        {
          title: 'Chrome DevTools exports cURL',
          description:
            'Right-click any browser network request → Copy → Copy as cURL. Perfect for reproducing requests in automation scripts.',
        },
        {
          title: 'Postman can copy as cURL',
          description:
            'Code → cURL gives you the exact request. From there, converting to Python lets you use it in scripts without Postman installed.',
        },
        {
          title: 'Bash scripts use cURL',
          description:
            'Legacy shell scripts often use cURL for API calls. Migrating them to Python requires converting each cURL command.',
        },
      ]} />

      <AlertBox type="tip" title="Convert instantly without reading the whole guide">
        Paste any cURL command into the{' '}
        <a href="https://unblockdevs.com/curl-to-python" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          UnblockDevs cURL → Python converter
        </a>{' '}
        and get working Python requests code in one click. The tool handles GET, POST, headers,
        auth, cookies, and file uploads automatically.
      </AlertBox>

      <SectionHeader number={2} title="Convert cURL GET to Python requests.get()" />
      <p>
        The simplest case — a basic GET request. The URL goes in the first argument. Headers
        become a dictionary passed to the <code>headers</code> parameter.
      </p>

      <CodeBlock lang="bash" title="cURL GET request">
{`curl 'https://api.example.com/users' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python requests equivalent">
{`import requests

url = 'https://api.example.com/users'
headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9...',
}

response = requests.get(url, headers=headers)
print(response.status_code)   # 200
print(response.json())        # parsed response body`}
      </CodeBlock>

      <QuickFact color="blue" label="Query parameters">
        If the cURL URL has query parameters like{' '}
        <code>?page=2&limit=50</code>, you can either leave them in the URL string or pass
        them as a <code>params</code> dict:{' '}
        <code>requests.get(url, params={'{'}'page': 2, 'limit': 50{'}'})</code>. The dict
        form is cleaner and handles URL encoding automatically.
      </QuickFact>

      <SectionHeader number={3} title="Convert cURL POST with JSON Body to Python" />
      <p>
        POST requests with JSON bodies are the most common API call pattern. The{' '}
        <code>-d</code> or <code>--data</code> cURL flag maps to the <code>json</code>{' '}
        parameter in Python requests — which automatically sets the{' '}
        <code>Content-Type: application/json</code> header.
      </p>

      <CodeBlock lang="bash" title="cURL POST with JSON body">
{`curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"name": "Alice", "email": "alice@example.com", "role": "admin"}'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python requests.post() with JSON">
{`import requests

url = 'https://api.example.com/users'
headers = {
    'Authorization': 'Bearer TOKEN',
}
payload = {
    'name': 'Alice',
    'email': 'alice@example.com',
    'role': 'admin',
}

response = requests.post(url, json=payload, headers=headers)
print(response.status_code)  # 201
print(response.json())       # {'id': 42, 'name': 'Alice', ...}`}
      </CodeBlock>

      <AlertBox type="info" title="json= vs data= in Python requests">
        Use <code>json=payload</code> when sending JSON (it auto-sets Content-Type and
        serializes the dict). Use <code>data=payload</code> when sending form data
        (application/x-www-form-urlencoded). Use <code>data=string</code> when you need to
        send a raw string body exactly as-is.
      </AlertBox>

      <SectionHeader number={4} title="Convert cURL with Bearer Token Auth to Python" />
      <p>
        Authorization headers from cURL translate directly to the <code>headers</code> dict.
        For Bearer tokens specifically, Python requests also has an{' '}
        <code>auth</code> parameter for Basic auth — but for Bearer tokens, you always use the
        header dict approach.
      </p>

      <ErrorFix
        title="Bearer token auth — wrong vs. correct Python translation"
        bad={`# Wrong: auth= is for Basic auth only (username/password)
response = requests.get(url, auth='Bearer TOKEN')`}
        good={`# Correct: Bearer token goes in the Authorization header
headers = {'Authorization': 'Bearer TOKEN'}
response = requests.get(url, headers=headers)

# For Basic auth (curl -u user:pass), use HTTPBasicAuth:
from requests.auth import HTTPBasicAuth
response = requests.get(url, auth=HTTPBasicAuth('user', 'pass'))`}
        badLabel="Common mistake"
        goodLabel="Correct approach"
      />

      <CodeBlock lang="bash" title="cURL with multiple auth patterns">
{`# Bearer token
curl 'https://api.example.com/data' -H 'Authorization: Bearer TOKEN'

# Basic auth
curl 'https://api.example.com/data' -u 'username:password'

# API key in header
curl 'https://api.example.com/data' -H 'X-API-Key: my-secret-key'

# API key in query string
curl 'https://api.example.com/data?api_key=my-secret-key'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python equivalents for all auth patterns">
{`import requests
from requests.auth import HTTPBasicAuth

# Bearer token
response = requests.get(url, headers={'Authorization': 'Bearer TOKEN'})

# Basic auth (curl -u username:password)
response = requests.get(url, auth=HTTPBasicAuth('username', 'password'))
# or shorthand:
response = requests.get(url, auth=('username', 'password'))

# API key in header
response = requests.get(url, headers={'X-API-Key': 'my-secret-key'})

# API key in query string
response = requests.get(url, params={'api_key': 'my-secret-key'})`}
      </CodeBlock>

      <SectionHeader number={5} title="Convert cURL Form Data (--data-urlencode) to Python" />
      <p>
        When cURL sends form data with <code>--data-urlencode</code> or{' '}
        <code>-F</code> (multipart), the Python equivalent uses the <code>data</code> or{' '}
        <code>files</code> parameter respectively.
      </p>

      <CodeBlock lang="bash" title="cURL form data patterns">
{`# URL-encoded form data (application/x-www-form-urlencoded)
curl -X POST 'https://api.example.com/login' \
  --data-urlencode 'username=alice' \
  --data-urlencode 'password=s3cr3t'

# Multipart form data (file + field together)
curl -X POST 'https://api.example.com/upload' \
  -F 'file=@/path/to/document.pdf' \
  -F 'title=My Document'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python requests equivalents">
{`import requests

# URL-encoded form data
response = requests.post(
    'https://api.example.com/login',
    data={'username': 'alice', 'password': 's3cr3t'}
)

# Multipart form data with file upload
with open('/path/to/document.pdf', 'rb') as f:
    response = requests.post(
        'https://api.example.com/upload',
        files={'file': ('document.pdf', f, 'application/pdf')},
        data={'title': 'My Document'},
    )

print(response.status_code)`}
      </CodeBlock>

      <SectionHeader number={6} title="Convert cURL with Cookies to Python" />
      <p>
        The <code>--cookie</code> or <code>-b</code> cURL flag passes cookies. In Python
        requests, cookies can go in the <code>cookies</code> parameter as a dict or as a{' '}
        <code>RequestsCookieJar</code>. For multi-request sessions that preserve cookies
        automatically (like browser sessions), use <code>requests.Session()</code>.
      </p>

      <CodeBlock lang="bash" title="cURL with cookies">
{`curl 'https://app.example.com/dashboard' \
  -H 'Accept: application/json' \
  --cookie 'session_id=abc123xyz; csrf_token=tok789'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python requests with cookies — single request vs session">
{`import requests

# Single request — pass cookies as dict
response = requests.get(
    'https://app.example.com/dashboard',
    headers={'Accept': 'application/json'},
    cookies={'session_id': 'abc123xyz', 'csrf_token': 'tok789'},
)

# Session — cookies persist across requests automatically
session = requests.Session()
session.cookies.update({'session_id': 'abc123xyz', 'csrf_token': 'tok789'})

# All subsequent requests reuse the session cookies
r1 = session.get('https://app.example.com/dashboard')
r2 = session.get('https://app.example.com/profile')
r3 = session.post('https://app.example.com/settings', json={'theme': 'dark'})`}
      </CodeBlock>

      <SectionHeader number={7} title="Convert cURL PUT, PATCH, DELETE to Python" />
      <p>
        The <code>-X</code> flag in cURL specifies the HTTP method. Python requests has a
        method for each: <code>requests.put()</code>, <code>requests.patch()</code>,{' '}
        <code>requests.delete()</code>.
      </p>

      <CodeBlock lang="bash" title="cURL PUT, PATCH, DELETE">
{`# PUT — full update
curl -X PUT 'https://api.example.com/users/42' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"name": "Alice Smith", "email": "alice@new.com"}'

# PATCH — partial update
curl -X PATCH 'https://api.example.com/users/42' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"email": "alice@new.com"}'

# DELETE
curl -X DELETE 'https://api.example.com/users/42' \
  -H 'Authorization: Bearer TOKEN'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Python requests PUT, PATCH, DELETE">
{`import requests

headers = {'Authorization': 'Bearer TOKEN'}
base_url = 'https://api.example.com/users/42'

# PUT — full update
response = requests.put(
    base_url,
    json={'name': 'Alice Smith', 'email': 'alice@new.com'},
    headers=headers,
)

# PATCH — partial update
response = requests.patch(
    base_url,
    json={'email': 'alice@new.com'},
    headers=headers,
)

# DELETE
response = requests.delete(base_url, headers=headers)
print(response.status_code)  # 204 No Content`}
      </CodeBlock>

      <SectionHeader number={8} title="Handle cURL --compressed, --insecure, and Timeouts" />
      <p>
        Some cURL flags have important Python equivalents that are easy to forget.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: '--compressed → automatic in Python',
          description:
            'Python requests automatically decompresses gzip and deflate responses. You do not need to add anything — the Accept-Encoding header is sent and decompression happens transparently.',
        },
        {
          title: '-k / --insecure → verify=False',
          description:
            'If cURL uses -k to skip SSL verification: requests.get(url, verify=False). Add warnings.filterwarnings("ignore") to suppress the InsecureRequestWarning in production. Never use this in production.',
        },
        {
          title: '--connect-timeout → timeout parameter',
          description:
            'requests.get(url, timeout=10) sets a 10-second connect+read timeout. Use a tuple for separate connect/read timeouts: timeout=(3.05, 27). Always set a timeout — the default is no timeout (hangs forever).',
        },
        {
          title: '-x / --proxy → proxies parameter',
          description:
            'proxies={"http": "http://proxy:8080", "https": "http://proxy:8080"}. For SOCKS5 proxies (curl --socks5): proxies={"https": "socks5://proxy:1080"} with the requests[socks] extra.',
        },
      ]} />

      <CodeBlock lang="python" title="cURL flags and their Python requests equivalents">
{`import requests
import warnings

# --compressed → automatic, no action needed
response = requests.get('https://api.example.com/data')

# -k / --insecure → verify=False (dev/testing only)
with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    response = requests.get('https://internal.corp.dev/api', verify=False)

# --connect-timeout 5 → timeout=5
response = requests.get(url, timeout=5)

# Separate connect (3s) and read (30s) timeout
response = requests.get(url, timeout=(3, 30))

# -x http://proxy:8080 → proxies
proxies = {'http': 'http://proxy:8080', 'https': 'http://proxy:8080'}
response = requests.get(url, proxies=proxies)

# --max-redirs 0 / --location-trusted → allow_redirects
response = requests.get(url, allow_redirects=False)  # follow=False`}
      </CodeBlock>

      <SectionHeader number={9} title="Use the Online cURL to Python Converter" />
      <p>
        For any cURL command — especially long ones from Chrome DevTools with 20+ headers — the
        fastest approach is to use the free online converter. Paste the cURL, get working Python
        instantly, no setup required.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Copy the cURL command',
          desc: 'From Chrome DevTools (right-click request → Copy as cURL), from API docs, from Postman (Code → cURL), or from any other source.',
        },
        {
          title: 'Paste into the converter',
          desc: 'Go to unblockdevs.com/curl-to-python and paste the cURL command into the input panel. The tool parses the command immediately.',
        },
        {
          title: 'Review the Python code',
          desc: 'The converter generates clean Python requests code with a headers dict, a JSON or form data payload, the correct method (GET/POST/PUT/PATCH/DELETE), and proper auth.',
        },
        {
          title: 'Copy and use in your project',
          desc: 'Click the copy button and paste into your Python script, Jupyter notebook, or test file. The code runs immediately — no modifications needed for most requests.',
        },
      ]} />

      <AlertBox type="tip" title="Chrome DevTools cURL → Python in 30 seconds">
        Open Chrome DevTools (F12) → Network tab → right-click any API request → Copy → Copy
        as cURL. Paste at{' '}
        <a href="https://unblockdevs.com/curl-to-python" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          unblockdevs.com/curl-to-python
        </a>
        . Copy the Python code. Done.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I convert a cURL command to Python requests?',
          answer: 'Map each cURL flag to a Python requests parameter: the URL stays as-is, -H headers become a headers dict, -d JSON body becomes json=payload, --data form data becomes data=payload, -u user:pass becomes auth=(\'user\', \'pass\'), -b cookies becomes cookies=dict, and -X sets the method (requests.post, requests.put, etc.). Or paste the cURL into unblockdevs.com/curl-to-python and get the Python code instantly.',
        },
        {
          question: 'What does "curl -X POST" become in Python requests?',
          answer: 'curl -X POST maps to requests.post(). Similarly, -X PUT → requests.put(), -X PATCH → requests.patch(), -X DELETE → requests.delete(). For POST with JSON body (-d \'{"key": "val"}\' -H \'Content-Type: application/json\'), use requests.post(url, json={"key": "val"}).',
        },
        {
          question: 'How do I convert curl headers (-H) to Python?',
          answer: 'Create a headers dictionary: headers = {"Header-Name": "value", "Another-Header": "value2"}. Pass it to any requests method: requests.get(url, headers=headers). Headers are case-insensitive in HTTP, so you can use any capitalization in the dict.',
        },
        {
          question: 'How do I handle curl --cookie in Python requests?',
          answer: 'Pass cookies as a dict: requests.get(url, cookies={"session_id": "abc123"}). For multiple requests that share cookies (like a logged-in session), use requests.Session() — it persists cookies across all requests automatically, just like a browser does.',
        },
        {
          question: 'What is the Python requests equivalent of curl -k (insecure)?',
          answer: 'Use verify=False: requests.get(url, verify=False). This skips SSL certificate verification, equivalent to curl -k or curl --insecure. Python will show an InsecureRequestWarning — suppress it with warnings.filterwarnings("ignore", category=requests.packages.urllib3.exceptions.InsecureRequestWarning). Never use verify=False in production.',
        },
        {
          question: 'How do I convert curl --data-urlencode to Python?',
          answer: 'Use the data parameter with a dict: requests.post(url, data={"field": "value"}). Python requests automatically URL-encodes the dict and sets Content-Type: application/x-www-form-urlencoded. For multipart form data (curl -F), use the files parameter with a tuple: files={"file": ("filename.pdf", open("file.pdf", "rb"), "application/pdf")}.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
