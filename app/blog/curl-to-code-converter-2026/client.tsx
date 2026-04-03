'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CurlToCodeConverter2026Client() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>curl to Code Converter — Convert Any curl Command to JavaScript, Python, Go, and More</h1>
      <p className="lead">
        curl is the universal language of HTTP requests. But running curl in production code requires
        translation to your programming language. This guide shows how to convert any curl command to
        JavaScript fetch, axios, Python requests, Go net/http, PHP cURL, and more — with examples,
        a reference for every common curl flag, and tools that do it automatically.
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
          { label: 'Form data', left: 'curl -F "key=val" URL', right: 'fetch(url, { method:"POST", body: new FormData() })' },
          { label: 'Cookie', left: 'curl -b "session=abc123" URL', right: "fetch(url, { headers: {'Cookie': 'session=abc123'}, credentials: 'include' })" },
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

if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
const data = await response.json();

// → axios (cleaner, auto-serializes JSON):
import axios from 'axios';

const { data } = await axios.post('https://api.example.com/users',
  { name: 'Alice', email: 'alice@example.com' },    // body (auto JSON.stringify)
  { headers: { 'Authorization': 'Bearer mytoken' } } // config
);

// → Node.js with node-fetch or built-in fetch (Node 18+):
// Same as browser fetch — no import needed in Node 18+`}
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
    json={'name': 'Alice', 'email': 'alice@example.com'},  # json= auto-sets Content-Type
    headers={'Authorization': 'Bearer mytoken'}
)
response.raise_for_status()  # raises for 4xx/5xx
data = response.json()

# curl -u user:pass URL  →  Basic auth:
response = requests.get(url, auth=('user', 'pass'))

# curl -k URL  →  Skip SSL:
response = requests.get(url, verify=False)

# curl -F "file=@photo.jpg" URL  →  File upload:
with open('photo.jpg', 'rb') as f:
    response = requests.post(url, files={'file': f})

# curl -b "session=abc" URL  →  Cookies:
response = requests.get(url, cookies={'session': 'abc'})

# curl --max-time 30 URL  →  Timeout:
response = requests.get(url, timeout=30)  # total timeout
response = requests.get(url, timeout=(5, 30))  # (connect, read)`}
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
    "time"
)

func main() {
    // Build request body
    body, _ := json.Marshal(map[string]string{"name": "Alice"})

    // Create request
    req, _ := http.NewRequest("POST", "https://api.example.com/users", bytes.NewReader(body))
    req.Header.Set("Authorization", "Bearer mytoken")
    req.Header.Set("Content-Type", "application/json")

    // Client with timeout (curl --max-time 30)
    client := &http.Client{Timeout: 30 * time.Second}

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 400 {
        panic(fmt.Sprintf("HTTP error: %d", resp.StatusCode))
    }

    respBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(respBody))
}`}
      </CodeBlock>

      <SectionHeader number={4} title="curl to PHP and Ruby" />
      <CodeBlock language="php" filename="curl → PHP (Guzzle and native cURL)">
{`<?php
// Using Guzzle (recommended):
// composer require guzzlehttp/guzzle

use GuzzleHttp\Client;

$client = new Client();
$response = $client->post('https://api.example.com/users', [
    'headers' => ['Authorization' => 'Bearer mytoken'],
    'json'    => ['name' => 'Alice', 'email' => 'alice@example.com'],
]);
$data = json_decode($response->getBody(), true);

// Using native PHP cURL:
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL           => 'https://api.example.com/users',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST          => true,
    CURLOPT_POSTFIELDS    => json_encode(['name' => 'Alice']),
    CURLOPT_HTTPHEADER    => [
        'Authorization: Bearer mytoken',
        'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT       => 30,
    // curl -k: CURLOPT_SSL_VERIFYPEER => false,
]);
$result = curl_exec($ch);
curl_close($ch);`}
      </CodeBlock>

      <SectionHeader number={5} title="curl Flag Reference" />
      <CompareTable
        leftLabel="curl Flag"
        rightLabel="What It Does"
        rows={[
          { label: '-X POST / -X PUT', left: 'HTTP method', right: 'Specify method (default is GET for no body, POST with -d)' },
          { label: '-H "Key: Val"', left: 'Add request header', right: 'Authorization, Content-Type, X-API-Key, any custom header' },
          { label: '-d "data"', left: 'Request body', right: 'Sends data as POST body. Implies -X POST if -X not set.' },
          { label: '--data-raw', left: 'Raw body string', right: 'Like -d but no @ file reading or special character processing' },
          { label: '--data-urlencode', left: 'URL-encoded body', right: 'URL-encodes the value before sending as form data' },
          { label: '-u user:pass', left: 'Basic auth', right: 'Base64-encodes to Authorization: Basic header' },
          { label: '-b "key=val"', left: 'Cookie', right: 'Sends Cookie header with specified values' },
          { label: '-c file', left: 'Cookie jar write', right: 'Saves received cookies to file for reuse' },
          { label: '-F "key=val"', left: 'Multipart form', right: 'Sends multipart/form-data. Use -F "file=@path" for file upload.' },
          { label: '-k / --insecure', left: 'Skip SSL verify', right: 'Accepts any certificate (dev only — never in production)' },
          { label: '--connect-timeout N', left: 'Connection timeout', right: 'Seconds before TCP connection attempt fails' },
          { label: '--max-time N', left: 'Total timeout', right: 'Max seconds for the entire request including transfer' },
          { label: '-L', left: 'Follow redirects', right: 'Follows 301/302 redirects automatically' },
          { label: '-o file', left: 'Save to file', right: 'Write response body to specified file' },
          { label: '-v', left: 'Verbose', right: 'Print request/response headers, timing, and connection info' },
          { label: '--proxy http://p:8080', left: 'HTTP proxy', right: 'Route request through specified proxy' },
        ]}
      />

      <SectionHeader number={6} title="Auto-Conversion Tools" />
      <KeyPointsGrid columns={2} items={[
        { title: 'curlconverter.com', description: 'Paste any curl command, get instant code in 20+ languages including Python, JavaScript, Go, PHP, Java, Ruby, Rust, Swift, Kotlin, and more. Open source. Handles most edge cases automatically.' },
        { title: 'Bruno / Insomnia Import', description: 'Both API clients let you paste a curl command to create a saved request collection. Right-click in Insomnia → Paste Curl. In Bruno: drag and drop or paste. Great for turning one-off curl commands into saved API tests.' },
        { title: 'Chrome DevTools → Copy as fetch', description: 'Right-click any request in Network tab → Copy → "Copy as fetch" or "Copy as Node.js fetch". Generates browser-accurate code with all actual headers and cookies sent. The most reliable method.' },
        { title: 'Claude / ChatGPT', description: 'Paste your curl command with "Convert this to Python requests" (or any language). AI handles unusual flags, edge cases, and file uploads that automated converters sometimes miss. Also explains what each flag does.' },
      ]} />

      <AlertBox type="tip" title="Get curl from Chrome — then convert">
        The fastest workflow: Open Chrome DevTools → Network tab → find the request you want to
        replicate → right-click → Copy → Copy as cURL (bash). This gives you the exact curl command
        with all real headers and cookies. Then paste into curlconverter.com or your AI of choice
        for instant production-ready code.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Start with curl for discovery', desc: 'Use curl -v to explore an API endpoint. It shows exactly what headers the server expects and returns, what auth method is needed, and the response format. Much faster to iterate than writing code.' },
        { title: 'Capture from browser if available', desc: 'If the API works in a browser, right-click the request in DevTools → Copy as cURL. You get the exact working request including all headers and cookies that make it work.' },
        { title: 'Convert automatically', desc: 'Paste into curlconverter.com or your AI tool of choice. Review the generated code — especially auth headers, body encoding (json vs form data), and timeout settings.' },
        { title: 'Add error handling', desc: 'The converter gives you happy-path code. Add: response.raise_for_status() in Python, if (!response.ok) throw in JS. Wrap in try/catch for network errors. Set timeout on all calls.' },
        { title: 'Test against same endpoint', desc: 'Run the original curl and your converted code against the same endpoint and compare responses. If they differ, the difference is in a header, body encoding, or redirect handling.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does my converted code work differently than curl?',
          answer: 'Common causes: (1) curl follows redirects by default (-L on), fetch/requests may not in all cases. (2) curl sends its own User-Agent (curl/7.x.x) — some APIs reject non-curl agents. Add headers={"User-Agent": "curl/7.88.0"} to match. (3) curl handles cookies via -c/-b flags; your code may not persist cookies between calls without Session. (4) SSL certificate validation: curl may accept certs your code rejects. (5) Encoding difference: curl -d sends URL-encoded form data; most code targets JSON by default.',
        },
        {
          question: 'How do I convert a multipart form curl to code?',
          answer: 'curl -F "file=@photo.jpg" -F "name=Alice" URL is multipart/form-data (not JSON). Python: requests.post(url, files={"file": open("photo.jpg","rb")}, data={"name":"Alice"}). JavaScript: use FormData object — const form = new FormData(); form.append("file", fileBlob, "photo.jpg"); form.append("name", "Alice"); fetch(url, {method:"POST", body: form}). Go: use multipart.Writer from mime/multipart. Never set Content-Type manually for multipart — let the library set it with the boundary.',
        },
        {
          question: 'How do I handle curl --data-urlencode in code?',
          answer: '--data-urlencode sends URL-encoded form data (Content-Type: application/x-www-form-urlencoded), with special characters properly percent-encoded. Python: requests.post(url, data={"key":"value with spaces"}) — requests handles encoding automatically. JavaScript: new URLSearchParams({key: "value with spaces"}).toString() as body with Content-Type: application/x-www-form-urlencoded header. This is different from JSON (use json= in Python or JSON.stringify in JS for that).',
        },
        {
          question: 'How do I get curl commands from Chrome for testing?',
          answer: 'Open Chrome DevTools (F12) → Network tab → reproduce the request → find it in the list → right-click → Copy → Copy as cURL (bash). This exports the exact request the browser sent including all headers, cookies, and the request body. The Firefox equivalent is: right-click → Copy → Copy as cURL. This is the most reliable way to get a working curl command for an existing API interaction — it captures everything including session tokens.',
        },
        {
          question: 'What is the difference between -d and --data-raw in curl?',
          answer: '-d (or --data) processes the string: a leading @ means "read from file" (@file.json reads the file), and & and = have special meaning for form encoding. --data-raw sends the string exactly as-is — @ is treated as a literal character, no file reading, no special character processing. For JSON bodies that contain @ or & characters, use --data-raw to prevent curl from misinterpreting them. In code: both map to the same thing — just passing the string as the request body.',
        },
        {
          question: 'How do I convert curl with client certificates to code?',
          answer: 'curl --cert client.crt --key client.key URL sends a client certificate for mutual TLS (mTLS) authentication. Python: requests.get(url, cert=("client.crt", "client.key")). Go: load the cert with tls.LoadX509KeyPair and configure the http.Client\'s TLSClientConfig. JavaScript (Node.js): pass the cert and key to https.request options. Browser JavaScript cannot use file-system certs — client certs must be in the browser\'s certificate store and are selected automatically.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
