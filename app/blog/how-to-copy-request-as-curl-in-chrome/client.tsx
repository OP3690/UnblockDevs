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

export default function HowToCopyRequestAsCurlInChromeClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Copy a Request as cURL in Chrome — DevTools Guide</h1>
      <p className="lead">
        Chrome DevTools has a built-in feature most developers discover by accident: right-clicking any network request and copying it as a cURL command. This converts a full browser request — headers, cookies, body, auth tokens and all — into a single terminal command you can replay, share, or pipe into scripts. Here is exactly where to find it and how to use it.
      </p>

      <StatGrid stats={[
        { value: 'F12', label: 'Open DevTools in any browser', color: 'blue' },
        { value: '1 right-click', label: 'Copy any request as cURL', color: 'green' },
        { value: 'HAR export', label: 'Get cURL for ALL requests at once', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Where Is 'Copy as cURL' in Chrome DevTools?" />
      <p>
        The option is buried one level deep in the Network tab context menu — easy to miss the first time. Here is exactly where to find it:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Open Chrome DevTools',
          desc: 'Press F12 (Windows/Linux) or Cmd+Option+I (Mac). You can also right-click anywhere on the page and select Inspect.',
        },
        {
          title: 'Go to the Network tab',
          desc: 'Click the Network tab at the top of the DevTools panel. If no requests are listed, refresh the page while DevTools is open to capture them.',
        },
        {
          title: 'Find the request you want',
          desc: 'Click on any request in the list. You can filter by type (XHR/Fetch for API calls, Doc for page loads) or use the search bar to find a specific URL.',
        },
        {
          title: 'Right-click the request',
          desc: 'Right-click on the request row in the left panel. A context menu appears with several options.',
        },
        {
          title: 'Click Copy → Copy as cURL',
          desc: 'Hover over "Copy" in the context menu to expand the submenu. Select "Copy as cURL (bash)" for Linux/Mac or "Copy as cURL (cmd)" for Windows Command Prompt.',
        },
      ]} />

      <QuickFact color="blue" label="Cross-browser support">
        Copy as cURL also works in Firefox (right-click → Copy Value → Copy as cURL), Edge (identical to Chrome), and Safari (right-click → Copy as cURL). The menu label and submenu structure differ slightly but the feature is present in all major browsers.
      </QuickFact>

      <SectionHeader number={2} title="Step-by-Step: Understanding the Copied cURL Command" />
      <p>
        When you copy a request as cURL, Chrome generates a complete command that replicates the exact request your browser sent — including all authentication headers, cookies, and request body. Here is an example of what a copied API request looks like:
      </p>

      <CodeBlock lang="bash" title="Example: cURL copied from Chrome DevTools">
{`curl 'https://api.example.com/v2/users/me' \
  -H 'authority: api.example.com' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'content-type: application/json' \
  -H 'origin: https://app.example.com' \
  -H 'referer: https://app.example.com/dashboard' \
  -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...' \
  --cookie 'session_id=abc123; csrf_token=xyz789' \
  --compressed`}
      </CodeBlock>

      <p>Here is what each flag means:</p>

      <KeyPointsGrid columns={2} items={[
        {
          title: '-H flag',
          description: 'Sets a request header. Every browser header is included — Accept, Authorization, Content-Type, User-Agent, and all the Sec-* security headers Chrome sends automatically.',
        },
        {
          title: '--cookie flag',
          description: 'Sends the session cookies your browser had at the time of the request. This is what makes the copied cURL authenticated — the same session token is included.',
        },
        {
          title: '-d or --data flag',
          description: 'Included for POST/PUT/PATCH requests. Contains the exact request body — JSON payload, form data, or whatever was sent.',
        },
        {
          title: '--compressed flag',
          description: 'Tells cURL to accept and decompress gzip/deflate responses, matching what the browser does. Without it, you might get garbled binary output.',
        },
      ]} />

      <AlertBox type="info" title="Your session tokens are included">
        The copied cURL command contains your live authentication tokens and session cookies. This is what makes it so powerful — but also means you should never share copied cURL commands publicly or commit them to version control. Treat them like passwords.
      </AlertBox>

      <SectionHeader number={3} title="'Copy as cURL' Not Working — Common Fixes" />
      <p>
        Sometimes the Copy as cURL option is missing, greyed out, or produces a command that fails when you run it. Here are the most common reasons and how to fix them:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Request was not captured',
          description: 'If you opened DevTools after the request already happened, it will not appear in the Network tab. Open DevTools before navigating or performing the action, then repeat it.',
        },
        {
          title: 'Wrong Network tab filter',
          description: 'The Network tab may be filtered to show only certain request types (e.g. XHR). Make sure the filter is set to "All" so all request types are visible.',
        },
        {
          title: 'Preflight CORS request selected',
          description: 'When CORS is involved, the browser sends a preflight OPTIONS request before the actual request. Make sure you are right-clicking the actual request (GET/POST/etc.), not the OPTIONS preflight.',
        },
        {
          title: 'Streaming or WebSocket request',
          description: 'Server-Sent Events and WebSocket connections cannot be exported as cURL because they are persistent connections, not discrete HTTP requests. For those, you need to capture and replay individual messages.',
        },
      ]} />

      <AlertBox type="tip" title="Capturing all requests at once">
        If you need cURL commands for many requests — not just one — the faster approach is to export the entire session as a HAR file and convert it. See Section 4 below.
      </AlertBox>

      <SectionHeader number={4} title="How to Export ALL Requests as cURL (HAR File Method)" />
      <p>
        The Copy as cURL feature works great for a single request. But if you need cURL commands for every request in a session — for debugging, API documentation, or test automation — copying them one by one is tedious. The HAR file method gives you cURL for every single request at once.
      </p>
      <p>
        A HAR (HTTP Archive) file is a JSON export of all network requests Chrome captured during a session — including URLs, headers, cookies, request bodies, and response data. The HAR to cURL converter at UnblockDevs reads the HAR and outputs a cURL command for each request.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Open DevTools and go to the Network tab',
          desc: 'Press F12 and click the Network tab. Refresh the page or perform the actions you want to capture. Make sure recording is active (the red circle should be solid, not hollow).',
        },
        {
          title: 'Save all as HAR',
          desc: 'Right-click anywhere in the Network request list and choose "Save all as HAR with content". This downloads a .har file containing every captured request.',
        },
        {
          title: 'Open the HAR to cURL converter',
          desc: 'Go to unblockdevs.com/har-to-curl and upload your .har file. The tool parses the file client-side — your network data stays in your browser.',
        },
        {
          title: 'Browse and copy cURL commands',
          desc: 'Every request from your session appears as a separate cURL command. Filter by URL, method, or status code to find the ones you need. Copy individual commands or export all at once.',
        },
      ]} />

      <AlertBox type="tip" title="Convert a full HAR file to cURL commands">
        Upload any HAR file at <a href="https://unblockdevs.com/har-to-curl" className="text-blue-600 underline font-medium">unblockdevs.com/har-to-curl</a> to get cURL commands for every request in your session — useful for debugging, API documentation, and building test suites.
      </AlertBox>

      <SectionHeader number={5} title="How to Simplify or Convert cURL Commands" />
      <p>
        The cURL command copied from Chrome DevTools is exhaustive — it includes every browser header Chrome sent, including many you do not need when making the same API call from code. The command often has 15–20 <code>-H</code> flags for headers like <code>sec-ch-ua</code> and <code>sec-fetch-dest</code> that the API server ignores entirely.
      </p>
      <p>
        The cURL Converter at UnblockDevs simplifies this in two ways: it strips unnecessary browser-specific headers and converts the cURL command to your language of choice — Python requests, JavaScript fetch, Node.js axios, and more.
      </p>

      <CodeBlock lang="bash" title="Simplified cURL — only the headers that actually matter">
{`# Chrome DevTools output (verbose, 18 headers)
curl 'https://api.example.com/orders' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  -H 'accept: application/json' \
  -H 'sec-ch-ua: "Chromium";v="124"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-fetch-dest: empty' \
  # ... 12 more browser headers

# Simplified cURL (only what the API needs)
curl 'https://api.example.com/orders' \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'`}
      </CodeBlock>

      <ErrorFix
        title="Verbose cURL vs. clean API call"
        bad={`curl 'https://api.example.com/data' -H 'authority: api.example.com' -H 'accept: */*' -H 'accept-language: en-US,en;q=0.9' -H 'authorization: Bearer TOKEN' -H 'sec-ch-ua: "Chromium"' -H 'sec-ch-ua-mobile: ?0' -H 'sec-fetch-dest: empty' -H 'sec-fetch-mode: cors' --compressed`}
        good={`curl 'https://api.example.com/data' \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Accept: application/json'`}
        badLabel="Raw DevTools output — bloated with browser headers"
        goodLabel="Cleaned up — only the headers the API actually needs"
      />

      <QuickFact color="violet" label="Converter tool">
        Convert cURL commands to Python, JavaScript, Go, PHP, and more at <a href="https://unblockdevs.com/curl-converter" className="text-blue-600 underline">unblockdevs.com/curl-converter</a>. Paste the cURL, pick a language, get working code instantly.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'Where exactly is the "Copy as cURL" option in Chrome DevTools?',
          answer: 'Open DevTools with F12, go to the Network tab, right-click any request in the list, hover over "Copy" in the context menu, then select "Copy as cURL (bash)" from the submenu. If you do not see any requests, refresh the page while DevTools is open.',
        },
        {
          question: 'Does "Copy as cURL" work in Firefox and Edge too?',
          answer: 'Yes. Firefox: right-click a request → Copy Value → Copy as cURL. Edge: identical to Chrome (same DevTools engine). Safari: right-click a request → Copy as cURL. The output format is slightly different across browsers but all produce a working cURL command.',
        },
        {
          question: 'How do I export all browser requests as cURL, not just one?',
          answer: 'In the Network tab, right-click anywhere in the request list and choose "Save all as HAR with content". Then upload the .har file to unblockdevs.com/har-to-curl to get a cURL command for every single request in the session.',
        },
        {
          question: 'Why does my copied cURL command fail with a 401 or 403 error?',
          answer: 'The session token or cookie included in the copied cURL has likely expired. Tokens and session cookies have short lifetimes. To get a fresh one, log back into the app in Chrome, perform the request again, and copy the new cURL immediately before the session expires.',
        },
        {
          question: 'How do I convert a cURL command to Python or JavaScript?',
          answer: 'Paste your cURL command into unblockdevs.com/curl-converter and select your target language. The converter produces working Python requests, JavaScript fetch, Axios, Go http, and PHP curl code from any cURL command — including those copied from Chrome DevTools.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
