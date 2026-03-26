'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function CurlToCodeConverter2026Client() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl to Code Converter — Convert Any curl Command to JavaScript, Python, Go, and More</h1>
      <p className="lead">
        curl is the universal language of HTTP requests. But running curl in production code requires
        translation to your programming language. This guide shows how to convert any curl command to
        JavaScript fetch, axios, Python requests, Go net/http, PHP cURL, and more — with examples
        and a reference for every common curl flag.
      </p>

      <StatGrid stats={[
        { value: '7+', label: 'languages covered in this guide', color: 'blue' },
        { value: 'Every flag', label: 'curl -H, -d, -X, -u, -k, -b all covered', color: 'green' },
        { value: 'Auto-convert', label: 'tools to automate the conversion', color: 'purple' },
        { value: 'Copy-paste', label: 'ready code examples for every pattern', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="curl to JavaScript — fetch() and axios" />
      <CompareTable
        leftLabel="curl Command"
        rightLabel="JavaScript fetch()"
        rows={[
          { label: 'GET', left: 'curl https://api.example.com/users', right: "fetch('https://api.example.com/users')" },
          { label: 'POST JSON', left: "curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"Alice\"}' URL", right: "fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name:'Alice'}) })" },
          { label: 'Auth header', left: "curl -H 'Authorization: Bearer TOKEN' URL", right: "fetch(url, { headers: {'Authorization': 'Bearer TOKEN'} })" },
          { label: 'Basic auth', left: 'curl -u user:pass URL', right: "fetch(url, { headers: {'Authorization': 'Basic ' + btoa('user:pass')} })" },
        ]}
      />

      <CodeBlock language="javascript" filename="Complete curl → fetch Conversion">
{`// curl -X POST https://api.example.com/users \\
//   -H "Authorization: Bearer mytoken" \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

// → JavaScript fetch():
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer mytoken',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

const data = await response.json();
console.log(data);

// → axios (cleaner syntax):
import axios from 'axios';

const { data } = await axios.post('https://api.example.com/users',
  { name: 'Alice', email: 'alice@example.com' },
  { headers: { 'Authorization': 'Bearer mytoken' } }
);`}
      </CodeBlock>

      <SectionHeader number={2} title="curl to Python requests" />
      <CodeBlock language="python" filename="curl → Python requests">
{`# curl -X POST https://api.example.com/users \\
#   -H "Authorization: Bearer mytoken" \\
#   -H "Content-Type: application/json" \\
#   -d '{"name":"Alice","email":"alice@example.com"}'

import requests

response = requests.post(
    'https://api.example.com/users',
    json={'name': 'Alice', 'email': 'alice@example.com'},  # auto-sets Content-Type
    headers={'Authorization': 'Bearer mytoken'}
)

data = response.json()
print(data)

# curl -u user:pass URL  →  Python basic auth:
response = requests.get(url, auth=('user', 'pass'))

# curl -k URL  →  Skip SSL verification:
response = requests.get(url, verify=False)

# curl -F "file=@photo.jpg" URL  →  File upload:
with open('photo.jpg', 'rb') as f:
    response = requests.post(url, files={'file': f})`}
      </CodeBlock>

      <SectionHeader number={3} title="curl to Go (net/http)" />
      <CodeBlock language="go" filename="curl → Go net/http">
{`// curl -X POST https://api.example.com/users \\
//   -H "Authorization: Bearer mytoken" \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Alice"}'

package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    body, _ := json.Marshal(map[string]string{
        "name": "Alice",
    })

    req, _ := http.NewRequest("POST", "https://api.example.com/users", bytes.NewReader(body))
    req.Header.Set("Authorization", "Bearer mytoken")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    respBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(respBody))
}`}
      </CodeBlock>

      <SectionHeader number={4} title="curl Flag Reference" />
      <CompareTable
        leftLabel="curl Flag"
        rightLabel="What It Does"
        rows={[
          { label: '-X POST / -X PUT', left: 'HTTP method', right: 'Specify request method (default is GET)' },
          { label: '-H "Key: Val"', left: 'Add header', right: 'Authorization, Content-Type, custom headers' },
          { label: '-d "data"', left: 'Request body', right: 'Send data in body (string or JSON)' },
          { label: '--data-raw', left: 'Raw body', right: 'Same as -d but no special chars processing' },
          { label: '-u user:pass', left: 'Basic auth', right: 'Base64-encodes to Authorization header' },
          { label: '-b "key=val"', left: 'Cookie', right: 'Send cookie header' },
          { label: '-k / --insecure', left: 'Skip SSL', right: 'Ignore certificate errors' },
          { label: '--connect-timeout N', left: 'Connection timeout', right: 'Seconds before connection attempt fails' },
          { label: '--max-time N', left: 'Total timeout', right: 'Max seconds for entire request' },
          { label: '-L', left: 'Follow redirects', right: 'Follow 301/302 redirects' },
          { label: '-o file.json', left: 'Save to file', right: 'Write response body to file' },
          { label: '-v', left: 'Verbose', right: 'Print headers, timing, full request/response' },
        ]}
      />

      <SectionHeader number={5} title="Auto-Conversion Tools" />
      <KeyPointsGrid columns={2} items={[
        { title: 'curlconverter.com', description: 'Paste any curl command, get instant code in 20+ languages. Open source. Supports Python, JavaScript, Go, PHP, Java, Ruby, Rust, and more.' },
        { title: 'insomnia / Bruno Import', description: 'Both Insomnia and Bruno let you paste a curl command to create a request collection. Great for turning one-off curl commands into saved API tests.' },
        { title: 'Chrome DevTools → Copy as fetch', description: 'Right-click any request in Network tab → Copy → Copy as fetch (or copy as Node.js fetch). Instant browser-accurate code.' },
        { title: 'Claude / ChatGPT', description: 'Paste your curl command and say "Convert to Python requests". AI handles unusual flags and edge cases that automated converters miss.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does my converted code work differently than curl?',
          answer: 'Common causes: (1) curl follows redirects by default (-L), fetch/requests may not, (2) curl sends different default User-Agent, some APIs reject non-curl agents, (3) curl handles cookies differently, (4) SSL certificate handling differs. Check headers sent by both and compare — use -v in curl and print response headers in your code.',
        },
        {
          question: 'How do I convert a multipart form curl to code?',
          answer: 'curl -F "file=@photo.jpg" -F "name=Alice" URL is multipart/form-data. In Python: requests.post(url, files={"file": open("photo.jpg","rb")}, data={"name":"Alice"}). In JavaScript: use FormData object. In Go: use multipart.Writer. Most converters handle this correctly.',
        },
        {
          question: 'How do I handle curl --data-urlencode in code?',
          answer: '--data-urlencode sends URL-encoded form data. In Python: requests.post(url, data={"key":"value"}) (requests URL-encodes automatically). In JS: new URLSearchParams({key: "value"}).toString() as body with Content-Type: application/x-www-form-urlencoded.',
        },
        {
          question: 'How do I get curl commands from Chrome for testing?',
          answer: 'Open Chrome DevTools → Network tab → find the request → right-click → Copy → Copy as cURL (bash). This exports the exact headers, cookies, and body the browser sent — extremely useful for reproducing API calls that work in browser but not in code.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
