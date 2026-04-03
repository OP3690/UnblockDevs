'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function PostJsonDataWithCurlExamplesCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>POST JSON Data with cURL — Complete Examples Guide</h1>
      <p className="lead">
        Everything you need to POST JSON data with cURL — from simple single-field objects to
        nested arrays with authentication headers. Each example is tested and ready to use.
        Includes debugging tips, common errors, and Windows-specific syntax.
      </p>

      <StatGrid stats={[
        { value: '-X POST', label: 'flag to set HTTP method to POST', color: 'blue' },
        { value: '-H', label: '"Content-Type: application/json" required', color: 'green' },
        { value: '-d', label: 'or --data-raw for the request body', color: 'purple' },
        { value: '@file.json', label: 'read body from a file with -d @filename', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Simple POST Examples" />
      <QuickFact color="blue" label="The three required pieces">
        Every JSON POST needs three things: (1) -X POST to set the method, (2) -H "Content-Type: application/json"
        to tell the server what format you're sending, and (3) -d with the JSON body. Miss any one and
        the API will likely return 400 or 415.
      </QuickFact>

      <CodeBlock language="bash" filename="Basic POST requests">
{`# Minimal JSON POST
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"alice@example.com"}'

# With API key authentication
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key-here" \\
  -d '{"name":"Alice"}'

# With Bearer token (JWT) authentication
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \\
  -d '{"name":"Alice"}'

# Show HTTP status code at the end of the response
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}' \\
  -w "\\nHTTP Status: %{http_code}\\n"

# Pretty-print the JSON response
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}' | python3 -m json.tool

# Or with jq (more powerful)
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}' | jq '.'`}
      </CodeBlock>

      <SectionHeader number={2} title="Nested and Complex JSON" />
      <CodeBlock language="bash" filename="Complex nested JSON POST">
{`# Nested object with array
curl -X POST https://api.example.com/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer": {
      "name": "Alice",
      "email": "alice@example.com"
    },
    "items": [
      {"productId": "P001", "qty": 2, "price": 29.99},
      {"productId": "P002", "qty": 1, "price": 79.99}
    ],
    "total": 139.97,
    "paid": true,
    "metadata": null
  }'

# From a JSON file — cleanest approach for complex payloads
cat > order.json << '\''EOF'\''
{
  "customer": {"name": "Alice"},
  "items": [
    {"productId": "P001", "qty": 2},
    {"productId": "P002", "qty": 1}
  ]
}
EOF

curl -X POST https://api.example.com/orders \\
  -H "Content-Type: application/json" \\
  -d @order.json`}
      </CodeBlock>

      <AlertBox type="tip" title="Use -d @file.json for complex payloads">
        For complex JSON payloads, always write to a file first and use <code>-d @file.json</code>.
        It eliminates shell quoting issues entirely and is much easier to read, version-control, and modify.
        The @ prefix tells cURL to read the content from the named file.
      </AlertBox>

      <SectionHeader number={3} title="PUT and PATCH Examples" />
      <CodeBlock language="bash" filename="PUT (replace) and PATCH (partial update)">
{`# PUT — replace entire resource (all fields required)
curl -X PUT https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token" \\
  -d '{"name":"Alice Updated","email":"alice@example.com","status":"active"}'

# PATCH — partial update (only include fields you want to change)
curl -X PATCH https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token" \\
  -d '{"status":"inactive"}'

# DELETE with JSON body (some APIs require this)
curl -X DELETE https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token" \\
  -d '{"reason":"user_request"}'`}
      </CodeBlock>

      <SectionHeader number={4} title="Real API Examples" />
      <CodeBlock language="bash" filename="Real-world API POST calls">
{`# OpenAI Chat Completion API
curl -X POST https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 100,
    "temperature": 0.7
  }'

# Anthropic Claude API
curl -X POST https://api.anthropic.com/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello, Claude"}]
  }'

# GitHub — create an issue
curl -X POST https://api.github.com/repos/owner/repo/issues \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $GITHUB_TOKEN" \\
  -H "Accept: application/vnd.github.v3+json" \\
  -d '{"title":"Bug: login fails","body":"Steps to reproduce...","labels":["bug"]}'

# Slack — send message via incoming webhook
curl -X POST https://hooks.slack.com/services/T.../B.../xxx \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Deploy complete! 🚀","username":"DeployBot"}'

# Note: Stripe uses form encoding, NOT JSON
curl -X POST https://api.stripe.com/v1/payment_intents \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "amount=2000&currency=usd&automatic_payment_methods[enabled]=true"`}
      </CodeBlock>

      <SectionHeader number={5} title="Windows-Specific Syntax" />
      <CodeBlock language="bash" filename="cURL on Windows CMD and PowerShell">
{`# Windows CMD — use ^ for line continuation, escape inner double quotes with backslash
curl -X POST https://api.example.com/users ^
  -H "Content-Type: application/json" ^
  -d "{\\"name\\":\\"Alice\\",\\"age\\":30}"

# PowerShell — backtick for line continuation, single quotes work here
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d '{"name":"Alice","age":30}'

# Best approach for Windows: write JSON to a file first, avoid quoting issues
'{"name":"Alice","age":30}' | Out-File -Encoding utf8 body.json
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d "@body.json"

# PowerShell with Invoke-RestMethod (alternative to curl)
$body = @{ name = "Alice"; age = 30 } | ConvertTo-Json
Invoke-RestMethod -Uri https://api.example.com/users \`
  -Method POST \`
  -ContentType "application/json" \`
  -Body $body`}
      </CodeBlock>

      <SectionHeader number={6} title="Debugging cURL Requests" />
      <CodeBlock language="bash" filename="Debug flags for troubleshooting">
{`# -v (verbose): shows request headers, response headers, and SSL handshake
curl -v -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}'
# Output: > REQUEST HEADERS  < RESPONSE HEADERS  BODY

# -i: include response headers in output (less verbose than -v)
curl -i -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}'

# -w: custom output format — show only status code and timing
curl -s -o /dev/null \\
  -w "Status: %{http_code}\\nTime: %{time_total}s\\nSize: %{size_download} bytes\\n" \\
  -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}'

# -s -S: silent (no progress bar) but still show errors
curl -s -S -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}' | jq .

# Validate JSON before sending (save a broken request trip)
echo '{"name":"Alice","age":30}' | python3 -m json.tool
# If invalid, python prints the error. If valid, it pretty-prints the JSON.`}
      </CodeBlock>

      <SectionHeader number={7} title="Common cURL POST Errors and Fixes" />
      <CompareTable
        leftLabel="Error"
        rightLabel="Cause + Fix"
        rows={[
          { label: '415 Unsupported Media Type', left: 'Missing Content-Type header', right: 'Add -H "Content-Type: application/json" to every JSON POST' },
          { label: '400 Bad Request', left: 'Malformed JSON in the request body', right: 'Validate JSON first: echo \'...\' | python3 -m json.tool' },
          { label: '401 Unauthorized', left: 'Missing or expired auth token', right: 'Check Authorization header value, refresh token if expired' },
          { label: 'curl: (6) Could not resolve host', left: 'DNS failure or wrong hostname', right: 'Check hostname, test with curl -v to see DNS resolution attempt' },
          { label: 'curl: (35) SSL connect error', left: 'TLS/certificate issue', right: 'Add -k to skip verification (test only) or specify --cacert' },
          { label: 'Empty response body (204)', left: 'API returns 204 No Content', right: 'Expected behavior — check status code with -w "%{http_code}"' },
        ]}
      />

      <KeyPointsGrid columns={2} items={[
        { title: '-d vs --data-raw', description: '-d treats @ as a filename prefix: -d @file.json reads the file. --data-raw sends the exact string as-is, treating @ as a literal character. Use --data-raw when your JSON contains @ symbols in string values (like email addresses in the literal body string, not via file).' },
        { title: 'Silent mode for scripts', description: 'In scripts and CI pipelines, use -s (silence progress bar) with -S (still show errors) and -f (fail on HTTP errors): curl -sSf -X POST url -d @body.json. The -f flag makes curl exit with code 22 on 4xx/5xx responses.' },
        { title: 'Timing breakdown', description: 'Use -w with timing variables: %{time_namelookup} %{time_connect} %{time_starttransfer} %{time_total} to see where time is spent — DNS, TCP connect, TTFB, and total. Useful for diagnosing slow API calls.' },
        { title: 'Retries with --retry', description: 'For transient failures: curl --retry 3 --retry-delay 2 --retry-all-errors -X POST url -d @body.json. Retries on network errors and 5xx responses up to 3 times with 2 second delays between attempts.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between -d and --data-raw?',
          answer: '-d (--data): processes @ as a filename reference (-d @file.json reads the file contents and sends them as the body). It also strips newlines from inline data. --data-raw: sends the exact string provided, treating @ as a literal character — so -d @email is treated as "read file named email" while --data-raw @email is literally the string "@email". Use --data-raw when your inline JSON contains @ symbols.',
        },
        {
          question: 'Why does my API return 415 Unsupported Media Type?',
          answer: 'Missing or incorrect Content-Type header. Add -H "Content-Type: application/json" to every POST request. Some APIs also require an Accept header: -H "Accept: application/json". 415 means "I received your request but don\'t know what format the body is in."',
        },
        {
          question: 'How do I POST JSON that contains double quotes?',
          answer: 'On Linux/Mac: wrap the entire JSON in single quotes and use double quotes normally inside: -d \'{"key":"value"}\'. On Windows CMD: use escaped double quotes: -d "{\\"key\\":\\"value\\"}". Best solution on all platforms: write the JSON to a file and use -d @file.json — eliminates all quoting issues entirely.',
        },
        {
          question: 'Can I use cURL to post multipart form data alongside JSON?',
          answer: 'Yes, using -F instead of -d: curl -X POST url -F "json=@data.json;type=application/json" -F "file=@upload.txt". This sends a multipart/form-data request, which differs from a pure JSON body. Some APIs require this format when uploading files alongside JSON metadata (e.g., image upload with title and description).',
        },
        {
          question: 'How do I save the cURL response to a file?',
          answer: 'Use -o filename: curl -X POST url -H "Content-Type: application/json" -d \'{"name":"Alice"}\' -o response.json. Or shell redirection: curl ... > response.json. Use -o /dev/null to discard the body entirely (useful when you only care about the status code with -w "%{http_code}").',
        },
        {
          question: 'How do I handle cookies in cURL POST requests?',
          answer: 'Send cookies with -b: curl -b "session=abc123" -X POST url -d @body.json. Save cookies from response with -c cookie_jar.txt. Send and save in one command: curl -b cookie_jar.txt -c cookie_jar.txt -X POST url. This is essential for APIs that use cookie-based sessions instead of header-based tokens.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
