'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToGetCurlFromChromeClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Get cURL from Chrome — Copy Any Request as cURL Command</h1>
      <p className="lead">
        Chrome's DevTools lets you copy any network request as a cURL command in seconds.
        This is one of the most useful developer tricks — instantly get the exact API call
        your browser makes, complete with all headers, cookies, and request body.
      </p>

      <StatGrid stats={[
        { value: '3 clicks', label: 'to copy any request as cURL from Chrome', color: 'green' },
        { value: 'All headers', label: 'cookies, auth tokens, content-type all included', color: 'blue' },
        { value: 'Any browser', label: 'works in Chrome, Firefox, Edge, Safari', color: 'purple' },
        { value: 'Replay', label: 'paste in terminal to reproduce exact request', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Copy as cURL in Chrome" />
      <VerticalSteps steps={[
        { title: 'Open Chrome DevTools', description: 'Press F12 or right-click anywhere → Inspect. Go to the Network tab.' },
        { title: 'Trigger the request', description: 'Perform the action on the page (click a button, load a page, submit a form). The request appears in the Network panel.' },
        { title: 'Find the request', description: 'In the Network list, click on the request you want to copy. Filter by XHR/Fetch to find API calls specifically.' },
        { title: 'Right-click the request', description: 'Right-click the request in the list → Copy → "Copy as cURL (bash)".' },
        { title: 'Paste in terminal', description: 'Open your terminal and paste. The exact request will be replayed with all original headers, cookies, and body.' },
      ]} />

      <SectionHeader number={2} title="What Gets Copied" />
      <CodeBlock language="bash" filename="Example copied cURL from Chrome">
{`# Chrome copies something like this:
curl 'https://api.example.com/users/123' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'content-type: application/json' \
  -H 'cookie: session=abc123; _csrf=xyz789' \
  -H 'user-agent: Mozilla/5.0...' \
  --compressed

# For a POST request with body:
curl 'https://api.example.com/users' \
  -H 'authorization: Bearer eyJ...' \
  -H 'content-type: application/json' \
  --data-raw '{"name":"Alice","email":"alice@example.com"}' \
  --compressed`}
      </CodeBlock>

      <SectionHeader number={3} title="Copy as cURL in Other Browsers" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Firefox', description: 'F12 → Network tab → right-click request → "Copy Value" → "Copy as cURL". Firefox also offers "Copy as cURL (POSIX)" for Linux/Mac compatibility.' },
        { title: 'Edge', description: 'Same as Chrome — F12 → Network → right-click → Copy → "Copy as cURL (bash)". Edge uses the same Chromium DevTools.' },
        { title: 'Safari', description: 'Enable Developer menu: Safari Preferences → Advanced → Show Develop menu. Develop → Show Web Inspector → Network → right-click request → Copy as cURL.' },
        { title: 'Postman', description: 'Import from Network: use Postman Interceptor extension to capture Chrome requests directly into Postman collections. Or paste the cURL in File → Import → Raw text.' },
      ]} />

      <AlertBox type="warning" title="Copied cURL contains your auth tokens">
        The copied cURL includes your real session cookies and Bearer tokens. Never share these
        publicly (GitHub, Slack, StackOverflow). They grant full access to your account.
        Redact sensitive headers before sharing: replace the Authorization value with "Bearer REDACTED".
      </AlertBox>

      <SectionHeader number={4} title="Convert the cURL to Code" />
      <CodeBlock language="bash" filename="Converting cURL to Python/JavaScript">
{`# Use unblockdevs.com/curl-converter to convert to:
# Python requests, JavaScript fetch, JavaScript axios, PHP, Go, etc.

# Or use curl-to-python npm package:
npx curl-to-python 'curl https://api.example.com/users -H "Authorization: Bearer token"'

# Output:
import requests
headers = {'Authorization': 'Bearer token'}
response = requests.get('https://api.example.com/users', headers=headers)`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Why is the copied cURL so long with so many headers?',
          answer: 'Chrome copies all headers the browser sent, including many browser-specific ones (user-agent, accept-encoding, sec-fetch-*, etc.) that are irrelevant for your use case. You can strip most headers except Authorization, Content-Type, Cookie, and any custom API headers. The minimal set still reproduces the API call.',
        },
        {
          question: 'The cURL works in terminal but not in my code — why?',
          answer: 'Missing a header your code doesn\'t include. Compare the cURL headers with what your code sends. The most common missing headers: Authorization (auth token), Content-Type: application/json (for POST), and Cookie (session). Also check if the API has CORS restrictions that block non-browser requests.',
        },
        {
          question: 'Can I copy WebSocket connections as cURL?',
          answer: 'No — cURL doesn\'t support WebSockets. Chrome\'s "Copy as cURL" only works for HTTP/HTTPS requests. For WebSocket connections, you can see the initial HTTP Upgrade request and copy that, but the ongoing WebSocket messages cannot be replayed as cURL.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
