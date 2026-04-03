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
        your browser makes, complete with all headers, cookies, authentication tokens, and request body.
        Once you have the cURL, you can replay it in your terminal, convert it to Python or JavaScript,
        or use it to debug API issues without reverse-engineering anything.
      </p>

      <StatGrid stats={[
        { value: '3 clicks', label: 'to copy any request as cURL from Chrome DevTools', color: 'green' },
        { value: 'All headers', label: 'cookies, auth tokens, content-type all included', color: 'blue' },
        { value: 'Any browser', label: 'works in Chrome, Firefox, Edge, and Safari', color: 'purple' },
        { value: 'Replay', label: 'paste in terminal to reproduce the exact request', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Copy as cURL in Chrome — Step by Step" />
      <VerticalSteps steps={[
        { title: 'Open Chrome DevTools', desc: 'Press F12 (Windows/Linux) or Cmd+Option+I (Mac) to open DevTools. Alternatively, right-click anywhere on the page and select "Inspect." Navigate to the "Network" tab in DevTools.' },
        { title: 'Trigger the request you want to capture', desc: 'With the Network tab open, perform the action on the page that triggers the request: click a button, submit a form, load new content, or navigate to a page. The request will appear in the Network panel as it happens.' },
        { title: 'Find the request in the Network list', desc: 'Look for the request in the list. Use the filter bar to narrow results: click "XHR" or "Fetch" to show only API calls, or type part of the URL in the filter input to find it quickly. Click the request to see its details.' },
        { title: 'Right-click the request', desc: 'Right-click the request row in the Network list (not in the detail panel). A context menu appears with Copy options.' },
        { title: 'Select Copy → Copy as cURL (bash)', desc: 'Hover over "Copy" in the context menu, then select "Copy as cURL (bash)" from the submenu. On Windows, you may also see "Copy as cURL (cmd)" which uses Windows-compatible syntax.' },
        { title: 'Paste in your terminal', desc: 'Open your terminal application and paste with Cmd+V (Mac) or Ctrl+Shift+V (Linux). Press Enter to execute the request. The API call is replayed with all the original headers and body.' },
      ]} />

      <SectionHeader number={2} title="What Gets Copied — Understanding the Output" />
      <CodeBlock lang="bash" title="Example cURL copied from Chrome DevTools">
{`# A simple GET request Chrome copies:
curl 'https://api.example.com/users/123' \\
  -H 'accept: application/json, text/plain, */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'content-type: application/json' \\
  -H 'cookie: session=abc123; _csrf=xyz789' \\
  -H 'sec-ch-ua: "Chromium";v="130"' \\
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...' \\
  --compressed

# A POST request with JSON body:
curl 'https://api.example.com/users' \\
  -X POST \\
  -H 'authorization: Bearer eyJ...' \\
  -H 'content-type: application/json' \\
  -H 'cookie: session=abc123' \\
  --data-raw '{"name":"Alice","email":"alice@example.com"}' \\
  --compressed`}
      </CodeBlock>
      <KeyPointsGrid items={[
        { title: 'Authorization headers', description: 'Chrome includes your live Bearer token or API key in the copied cURL. This is what makes the request work — it carries your authenticated session. This is also why you must never share this cURL publicly.' },
        { title: 'Cookies', description: 'Session cookies that authenticate your browser session are included. The server uses these to identify who is making the request. Copying the cURL effectively clones your browser session.' },
        { title: 'Browser-specific headers', description: 'Headers like sec-ch-ua, sec-fetch-*, and accept-encoding are browser-specific and usually not needed when replaying from terminal. You can safely remove these without affecting the API call.' },
        { title: '--compressed flag', description: 'The --compressed flag tells curl to accept and decompress gzip/brotli responses, matching what Chrome does automatically. Keep this flag — without it, you may receive binary-encoded response data.' },
      ]} />

      <SectionHeader number={3} title="Copy as cURL in Firefox, Edge, and Safari" />
      <KeyPointsGrid items={[
        { title: 'Firefox', description: 'Open DevTools with F12 → Network tab → trigger the request → right-click the request in the list → Copy Value → "Copy as cURL". Firefox also offers "Copy as cURL (POSIX)" which uses single quotes compatible with Linux and Mac terminals.' },
        { title: 'Microsoft Edge', description: 'Edge uses the same Chromium DevTools as Chrome. F12 → Network tab → right-click request → Copy → "Copy as cURL (bash)". The output format is identical to Chrome.' },
        { title: 'Safari', description: 'First enable Developer Tools: Safari menu → Settings → Advanced → check "Show features for web developers." Then: Develop menu → Show Web Inspector → Network tab → right-click request → Copy as cURL.' },
        { title: 'Postman Interceptor', description: 'Postman offers a Chrome extension called Interceptor that captures browser requests directly into Postman collections as you browse. This is an alternative to copying cURL manually — useful if you regularly work with browser API traffic.' },
      ]} />

      <AlertBox type="warning" title="Copied cURL contains your authentication tokens">
        The copied cURL includes your real session cookies and Bearer tokens. These grant full access
        to your account and any API endpoints your account can reach. Never share the raw cURL publicly
        on GitHub, StackOverflow, Slack, or in bug reports. Before sharing, replace sensitive values:
        Authorization: Bearer [REDACTED], Cookie: [REDACTED].
      </AlertBox>

      <SectionHeader number={4} title="Cleaning Up and Converting the cURL" />
      <p>
        The raw cURL from Chrome often has many browser-specific headers that aren't needed for API testing.
        Here's how to clean it up for practical use and how to convert it to other languages.
      </p>
      <CodeBlock lang="bash" title="Minimal cURL — removing browser-specific headers">
{`# Remove these browser-only headers (safe to delete):
# sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform
# sec-fetch-dest, sec-fetch-mode, sec-fetch-site
# accept-language (usually)
# user-agent (unless the API checks it)

# Minimal API request — keep only what matters:
curl 'https://api.example.com/users/123' \\
  -H 'authorization: Bearer eyJhbGciOi...' \\
  -H 'content-type: application/json' \\
  -H 'cookie: session=abc123'

# POST with minimal headers:
curl 'https://api.example.com/users' \\
  -X POST \\
  -H 'authorization: Bearer eyJhbGciOi...' \\
  -H 'content-type: application/json' \\
  -d '{"name":"Alice","email":"alice@example.com"}'`}
      </CodeBlock>
      <CodeBlock lang="bash" title="Converting cURL to Python requests">
{`# Using curlconverter (npm package):
npx curlconverter --language python 'curl https://api.example.com/users \\
  -H "Authorization: Bearer token" \\
  -H "Content-Type: application/json" \\
  -d "{\"name\": \"Alice\"}"'

# Output:
import requests

headers = {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
}

json_data = {
    'name': 'Alice',
}

response = requests.post('https://api.example.com/users',
                         headers=headers, json=json_data)

# Also available at curlconverter.com for browser-based conversion`}
      </CodeBlock>

      <SectionHeader number={5} title="Practical Use Cases for Copy as cURL" />
      <KeyPointsGrid items={[
        { title: 'Debug API responses', description: 'If a web app shows an error, capture the failing API request as cURL and run it in your terminal. Add -v for verbose output to see all request/response headers, or pipe to jq for formatted JSON output.' },
        { title: 'Automate web workflows', description: 'If a website doesn\'t have an official API but you need to automate an action, capturing the request as cURL gives you the exact parameters to replicate programmatically. Works for form submissions, data downloads, and more.' },
        { title: 'Test without re-logging in', description: 'When a request requires complex authentication that\'s hard to reproduce in code, copying the cURL from your logged-in browser session lets you test with real credentials immediately.' },
        { title: 'Share reproducible bug reports', description: 'When filing API bug reports, a cURL command (with sensitive data redacted) is far more useful than a screenshot. It gives developers an exact reproduction step.' },
      ]} />

      <QuickFact color="blue" label="Capture requests that happen on page load">
        Some API requests happen immediately when a page loads, before you can interact with DevTools.
        To capture them: open DevTools first (F12), navigate to the Network tab, then navigate to the URL.
        Or refresh the page while DevTools is open — click the reload button while on the Network tab
        to capture all initial page load requests including ones that fire before DOMContentLoaded.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'Why is the copied cURL so long with so many headers?',
          answer: 'Chrome copies all headers the browser sent, including many browser-specific ones (user-agent, accept-encoding, sec-fetch-*, sec-ch-ua) that are browser identity signals and not needed for API requests. You can safely remove all sec-* headers, accept-language, and user-agent in most cases. The minimum needed is usually: Authorization (or Cookie for session auth), Content-Type, and any custom API-specific headers.',
        },
        {
          question: 'The cURL works in terminal but not in my code — why?',
          answer: 'The most common cause is a missing header in your code that the browser sends automatically. Compare the cURL headers with what your code sends. Common missing headers: Authorization (Bearer token), Content-Type: application/json (required for POST requests with JSON body), and Cookie (session token). Some APIs also check Origin or Referer headers for security, which your server-side code won\'t send by default.',
        },
        {
          question: 'Can I copy WebSocket connections as cURL?',
          answer: 'No — cURL doesn\'t support WebSockets. Chrome\'s Copy as cURL only works for HTTP and HTTPS requests. For WebSocket connections, you can see the initial HTTP Upgrade handshake request in the Network tab and copy that, but the ongoing bidirectional WebSocket messages cannot be replayed as cURL. Use wscat (npm install -g wscat) for WebSocket testing from the terminal.',
        },
        {
          question: 'How do I capture a request that requires clicking a button quickly?',
          answer: 'Open DevTools and click the Network tab before clicking the button. When you click the button, the request appears immediately in the Network list. If the page navigates away after the click and clears the list, enable "Preserve log" by clicking the checkbox in the Network tab before triggering the request — this keeps all requests even through page navigation.',
        },
        {
          question: 'Can I copy the cURL for a request that already happened?',
          answer: 'Only if DevTools was open when the request occurred. The Network tab only shows requests that happened while DevTools was open — it doesn\'t have access to historical requests made before you opened it. To capture a specific request: open DevTools first, then reload the page or trigger the action again.',
        },
        {
          question: 'What\'s the difference between Copy as cURL (bash) and Copy as cURL (cmd)?',
          answer: 'The difference is quote style. Bash/Mac/Linux cURL uses single quotes around the URL and header values. Windows cmd.exe uses double quotes. If you\'re on Windows and running cURL in Command Prompt, use the cmd version. If you\'re on Mac, Linux, or using Git Bash/WSL on Windows, use the bash version. PowerShell users typically need the bash format with minor adjustments.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
