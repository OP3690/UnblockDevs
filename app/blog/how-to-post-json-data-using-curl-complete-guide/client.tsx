'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToPostJsonDataUsingCurlCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to POST JSON Data Using cURL — Complete Guide with Examples</h1>
      <p className="lead">
        cURL is the standard tool for making HTTP requests from the command line. Posting JSON
        requires the right headers and body format. This guide covers every cURL POST scenario —
        simple JSON, nested data, auth, file upload, and common mistakes.
      </p>

      <StatGrid stats={[
        { value: '-d', label: 'flag to send request body data', color: 'blue' },
        { value: '-H', label: 'flag to add headers (Content-Type required)', color: 'green' },
        { value: '-X POST', label: 'explicitly set HTTP method', color: 'purple' },
        { value: '--data-raw', label: 'send exact string without processing', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Basic JSON POST" />
      <QuickFact>
        The two required elements for a JSON POST: (1) <code>-H "Content-Type: application/json"</code>
        to tell the server you're sending JSON, and (2) <code>-d '&#123;"key":"value"&#125;'</code>
        for the request body. Without the Content-Type header, many APIs reject or misparse the body.
      </QuickFact>

      <CodeBlock language="bash" filename="Basic cURL POST with JSON">
{`# Simple JSON POST
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","age":30}'

# With authorization header
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token-here" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# POST and see response headers too
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -v  # verbose — shows request/response headers

# POST and save response to file
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -o response.json`}
      </CodeBlock>

      <SectionHeader number={2} title="POST JSON from a File" />
      <CodeBlock language="bash" filename="Send JSON from file">
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

# POST from file (@ prefix means "from file")
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d @payload.json

# POST with --data-binary to preserve exact bytes (incl. newlines)
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  --data-binary @payload.json`}
      </CodeBlock>

      <SectionHeader number={3} title="Nested JSON and Arrays" />
      <CodeBlock language="bash" filename="Complex nested JSON POST">
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

# Windows cmd — use double quotes and escape inner quotes
curl -X POST https://api.example.com/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alice\",\"age\":30}"

# PowerShell — use single quotes or here-string
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d '{"name":"Alice","age":30}'`}
      </CodeBlock>

      <SectionHeader number={4} title="Common Mistakes and Fixes" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Missing Content-Type header', description: 'Without -H "Content-Type: application/json", the server may not know how to parse the body. Always include it for JSON payloads.' },
        { title: 'Quote escaping on Windows', description: 'Windows cmd requires escaping inner quotes with backslash: {"name":"Alice"} → {\"name\":\"Alice\"}. Best practice: use -d @file.json with a JSON file to avoid escaping issues.' },
        { title: '-d vs --data-raw', description: '-d interprets @ as a file reference and removes newlines. --data-raw sends the string exactly as-is. Use --data-raw when your JSON contains @ characters.' },
        { title: 'Checking the response', description: 'Add -i flag to see response headers in output. Add -v for full verbose output including request headers sent. Add -w "%{http_code}" to print status code at the end.' },
      ]} />

      <AlertBox type="tip" title="Pipe jq for formatted JSON response">
        {`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}' | jq .`}
        {`\njq formats and colorizes the JSON response for easy reading.`}
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between -d and --data-raw in cURL?',
          answer: '-d (or --data) processes the data: @ prefix reads from a file, and newlines are stripped. --data-raw sends data exactly as provided without processing @ as a file path. Use --data-raw when your JSON string contains @ characters or when you need exact byte control.',
        },
        {
          question: 'How do I POST JSON with cURL and see both request and response?',
          answer: 'Use -v (verbose) flag. It shows: → request headers sent, → request body, ← response headers received, ← response body. For just the response headers: add -i flag. For just the status code: -w "%{http_code}" -o /dev/null.',
        },
        {
          question: 'Why does my cURL POST work but the API returns 400 Bad Request?',
          answer: 'Most common causes: 1) Missing Content-Type header — add -H "Content-Type: application/json", 2) Invalid JSON syntax — validate with echo \'{"key":"value"}\' | python3 -m json.tool, 3) Missing required fields — check API docs for required body fields, 4) Wrong JSON structure — compare with the API\'s example request.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
