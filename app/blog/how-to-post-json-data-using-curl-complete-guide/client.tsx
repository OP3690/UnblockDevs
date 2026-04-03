'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function HowToPostJsonDataUsingCurlCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to POST JSON Data Using cURL — Complete Guide with Examples</h1>
      <p className="lead">
        cURL is the standard tool for making HTTP requests from the command line. Posting JSON
        requires the right headers and body format — two elements that trip up most beginners.
        This guide covers every cURL POST scenario: simple JSON, nested data, authentication,
        posting from a file, Windows quoting issues, debugging responses, and the most common
        mistakes that cause 400 Bad Request errors when the JSON looks correct.
      </p>

      <StatGrid stats={[
        { value: '-d', label: 'flag to send request body data', color: 'blue' },
        { value: '-H', label: 'flag to add headers (Content-Type required)', color: 'green' },
        { value: '-X POST', label: 'explicitly set HTTP method', color: 'purple' },
        { value: '--data-raw', label: 'send exact string without processing', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Basic JSON POST — The Essential Pattern" />
      <p>
        Every JSON POST with cURL requires two things: the <code>Content-Type: application/json</code> header
        to tell the server what format you're sending, and the JSON body itself passed with the <code>-d</code> flag.
        Without the Content-Type header, many APIs reject the request or fail to parse the body correctly.
      </p>
      <QuickFact color="blue" label="The two required elements">
        The two required elements for a JSON POST: (1) <code>-H "Content-Type: application/json"</code>
        to tell the server you're sending JSON, and (2) <code>-d '&#123;"key":"value"&#125;'</code>
        for the request body. Without the Content-Type header, many APIs reject or misparse the body.
        The <code>-X POST</code> flag is optional when using <code>-d</code> — cURL defaults to POST when a body is provided.
      </QuickFact>
      <CodeBlock lang="bash" title="Basic cURL POST with JSON">
{`# Simple JSON POST — minimal required flags
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","age":30}'

# With authorization header (Bearer token)
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token-here" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# POST and see response headers too (-i includes response headers)
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -i

# POST with verbose output — shows full request AND response headers
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -v

# POST and save response to file
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -o response.json

# Just print the HTTP status code
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -o /dev/null -w "%{http_code}"`}
      </CodeBlock>

      <SectionHeader number={2} title="POST JSON from a File" />
      <p>
        For complex or multiline JSON, posting from a file is cleaner and avoids shell quoting issues.
        Use the <code>@filename</code> syntax with the <code>-d</code> flag. This also makes it easy
        to version control your test payloads.
      </p>
      <CodeBlock lang="bash" title="Send JSON from file">
{`# Create a JSON file
cat > payload.json << 'EOF'
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "preferences": {
    "newsletter": true,
    "notifications": ["email", "sms"]
  }
}
EOF

# POST from file (@ prefix means "read from file")
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d @payload.json

# POST with --data-binary to preserve exact bytes (including newlines)
# Use this if your JSON contains special characters or binary data
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  --data-binary @payload.json

# POST from a generated/computed JSON file
python3 -c "import json; print(json.dumps({'name': 'Alice', 'ts': __import__('time').time()}))" | \
  curl -X POST https://api.example.com/users \
    -H "Content-Type: application/json" \
    -d @-  # @- means "read from stdin"`}
      </CodeBlock>

      <SectionHeader number={3} title="Nested JSON and Arrays" />
      <CodeBlock lang="bash" title="Complex nested JSON POST">
{`# Nested objects — use single quotes on Unix/Mac
curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 123,
    "items": [
      {"productId": "A1", "qty": 2, "price": 29.99},
      {"productId": "B3", "qty": 1, "price": 49.99}
    ],
    "shipping": {
      "method": "express",
      "address": {
        "street": "123 Main St",
        "city": "Boston"
      }
    }
  }'

# Windows cmd.exe — use double quotes and escape inner quotes with backslash
curl -X POST https://api.example.com/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alice\",\"age\":30}"

# Windows PowerShell — single quotes work, or use a file
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d '{"name":"Alice","age":30}'

# Best practice for Windows: always use a file to avoid quote escaping
echo {"name":"Alice","age":30} > payload.json
curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d @payload.json`}
      </CodeBlock>

      <SectionHeader number={4} title="Authentication Patterns" />
      <CodeBlock lang="bash" title="Common authentication methods">
{`# Bearer token (most common for REST APIs)
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"query": "example"}'

# API key in header
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"query": "example"}'

# Basic auth (username:password)
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -u "username:password" \
  -d '{"query": "example"}'

# API key as query parameter (less secure — shows in server logs)
curl -X POST "https://api.example.com/data?api_key=your-key" \
  -H "Content-Type: application/json" \
  -d '{"query": "example"}'

# Store credentials in .netrc to avoid typing them
# ~/.netrc: machine api.example.com login username password mypassword
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  --netrc \
  -d '{"query": "example"}'`}
      </CodeBlock>

      <SectionHeader number={5} title="Common Mistakes and Fixes" />
      <ErrorFix
        title="Missing Content-Type causes 400 Bad Request"
        bad={`# ❌ Missing Content-Type header — server can't parse body
curl -X POST https://api.example.com/users \
  -d '{"name":"Alice","email":"alice@example.com"}'
# Result: 400 Bad Request or body parsed incorrectly`}
        good={`# ✅ Include Content-Type: application/json always
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
# Result: 200 OK or 201 Created`}
        badLabel="Missing header — API rejects or misparses"
        goodLabel="Correct — server knows to parse body as JSON"
      />
      <KeyPointsGrid columns={2} items={[
        { title: 'Missing Content-Type header', description: 'Without -H "Content-Type: application/json", the server may not know how to parse the body. It defaults to application/x-www-form-urlencoded, which produces a completely different parse result. Always include it for JSON payloads.' },
        { title: 'Quote escaping on Windows', description: 'Windows cmd requires escaping inner quotes with backslash: {"name":"Alice"} becomes {\\"name\\":\\"Alice\\"}. Best practice: use -d @file.json with a JSON file to avoid escaping issues entirely on all platforms.' },
        { title: '-d vs --data-raw', description: '-d interprets @ as a file reference and strips newlines. --data-raw sends the string exactly as-is without processing. Use --data-raw when your JSON string contains @ characters that should not be treated as file paths.' },
        { title: 'Checking the response properly', description: 'Add -i to see response headers. Add -v for full verbose output showing both request and response headers. Add -w "%{http_code}" -o /dev/null to print only the status code. Pipe to jq for formatted JSON output.' },
      ]} />

      <SectionHeader number={6} title="Debugging Techniques" />
      <CodeBlock lang="bash" title="Debugging tools for cURL POST requests">
{`# 1. Validate your JSON before sending
echo '{"name":"Alice","age":30}' | python3 -m json.tool
# Valid: prints formatted JSON
# Invalid: json.decoder.JSONDecodeError: ...

# 2. See exactly what cURL sends (dry run)
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  --trace-ascii /dev/stdout 2>&1 | head -50

# 3. Pretty-print JSON response with jq
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' | jq .

# 4. Save response to file AND see it in terminal simultaneously
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' | tee response.json | jq .

# 5. Test against httpbin.org (returns exactly what you sent)
curl -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","age":30}' | jq .json
# Shows your JSON as the server received it — useful for debugging`}
      </CodeBlock>

      <AlertBox type="tip" title="Use httpbin.org to debug what you're actually sending">
        When unsure if cURL is sending what you think it is, use <code>https://httpbin.org/post</code>
        as the URL. httpbin returns a JSON response that shows exactly what headers and body it
        received. The <code>.json</code> field in the response shows your parsed JSON body.
        This is the fastest way to debug cURL request formatting issues.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between -d and --data-raw in cURL?',
          answer: '-d (or --data) processes the data: @ prefix reads from a file, and newlines are stripped. --data-raw sends data exactly as provided without any processing — the @ character is treated as a literal character, not a file indicator. Use --data-raw when your JSON string contains @ characters (like email addresses) that should be sent literally. For file-based JSON, use -d @filename, not --data-raw @filename.',
        },
        {
          question: 'How do I POST JSON with cURL and see both request and response?',
          answer: 'Use -v (verbose) flag. It shows request headers sent (marked with >), request body, response headers received (marked with <), and response body. For just response headers: add -i flag. For just the HTTP status code: use -w "%{http_code}" -o /dev/null. For the most readable debugging output, pipe the response through jq: curl ... | jq .',
        },
        {
          question: 'Why does my cURL POST work but the API returns 400 Bad Request?',
          answer: 'Most common causes: 1) Missing Content-Type header — add -H "Content-Type: application/json". 2) Invalid JSON syntax — validate with echo \'{"key":"value"}\' | python3 -m json.tool. 3) Missing required fields — check API docs for required fields in request body. 4) Wrong JSON structure — compare with API\'s documented example request. 5) Wrong encoding on Windows — use a JSON file with -d @file.json to avoid quote escaping issues.',
        },
        {
          question: 'How do I handle special characters in JSON with cURL?',
          answer: 'Special characters (apostrophes, quotes, backslashes) in JSON values cause shell quoting issues. The cleanest solution: put your JSON in a file and use -d @payload.json. Alternatively, use $\' \' syntax in bash for escape sequences: -d $\'{"note":"it\\\'s"}\'. For Unicode characters, ensure your terminal uses UTF-8 and the file is UTF-8 encoded — curl handles them correctly if the shell does.',
        },
        {
          question: 'How do I POST JSON with cURL and follow redirects?',
          answer: 'Add -L (follow redirects) flag. However, be aware that by default curl changes the method to GET on 301/302 redirects. To maintain POST through redirects, add --post301 --post302 flags. For 307/308 redirects, curl correctly maintains the POST method by default. APIs should use 307 or 308 if they need to redirect POST requests.',
        },
        {
          question: 'How do I set a timeout for cURL POST requests?',
          answer: 'Use --connect-timeout N for connection timeout (N seconds) and --max-time N for total request timeout. Example: curl -X POST https://api.example.com/slow-endpoint --connect-timeout 5 --max-time 30 -H "Content-Type: application/json" -d \'{"data":"..."}\'. The --connect-timeout limits how long curl waits to establish the TCP connection. --max-time limits the entire operation including upload and download.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
