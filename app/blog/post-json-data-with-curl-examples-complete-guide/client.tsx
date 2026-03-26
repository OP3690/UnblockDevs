'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader,
} from '@/components/blog/BlogVisuals';

export default function PostJsonDataWithCurlExamplesCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>POST JSON Data with cURL — All Examples Complete Guide</h1>
      <p className="lead">
        Everything you need to POST JSON data with cURL — from simple single-field objects to
        nested arrays with authentication. Each example is tested and ready to use.
      </p>

      <StatGrid stats={[
        { value: '-X POST', label: 'set HTTP method', color: 'blue' },
        { value: '-H', label: '"Content-Type: application/json" required', color: 'green' },
        { value: '-d', label: 'or --data-raw for request body', color: 'purple' },
        { value: '@file.json', label: 'read body from file with -d @filename', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Simple POST Examples" />
      <CodeBlock language="bash" filename="Basic POST requests">
{`# Simple object
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# With API key auth
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"name":"Alice"}'

# With Bearer token
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -d '{"name":"Alice"}'

# Show response code + body
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  -w "\nHTTP Status: %{http_code}\n"

# Pretty-print JSON response
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' | python3 -m json.tool`}
      </CodeBlock>

      <SectionHeader number={2} title="Nested and Complex JSON" />
      <CodeBlock language="bash" filename="Complex nested JSON POST">
{`# Nested object
curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
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
    "paid": true
  }'

# From JSON file (cleanest for complex payloads)
cat > order.json << 'EOF'
{
  "customer": {"name": "Alice"},
  "items": [{"productId": "P001", "qty": 2}]
}
EOF

curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
  -d @order.json`}
      </CodeBlock>

      <SectionHeader number={3} title="PUT and PATCH Examples" />
      <CodeBlock language="bash" filename="PUT (replace) and PATCH (partial update)">
{`# PUT — replace entire resource
curl -X PUT https://api.example.com/users/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"name":"Alice Updated","email":"alice@example.com","status":"active"}'

# PATCH — partial update (only fields provided)
curl -X PATCH https://api.example.com/users/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"status":"inactive"}'  # only update status field`}
      </CodeBlock>

      <SectionHeader number={4} title="Real API Examples" />
      <CodeBlock language="bash" filename="Real-world API calls">
{`# OpenAI Chat Completion
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 100
  }'

# GitHub — create an issue
curl -X POST https://api.github.com/repos/owner/repo/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"title":"Bug: login fails","body":"Steps to reproduce...","labels":["bug"]}'

# Slack — send message to webhook
curl -X POST https://hooks.slack.com/services/T.../B.../xxx \
  -H "Content-Type: application/json" \
  -d '{"text":"Deploy complete!","username":"DeployBot"}'

# Stripe — create a payment intent
curl -X POST https://api.stripe.com/v1/payment_intents \
  -H "Authorization: Bearer sk_test_xxx" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "amount=2000&currency=usd"  # Stripe uses form encoding, not JSON!`}
      </CodeBlock>

      <SectionHeader number={5} title="Windows-Specific Commands" />
      <CodeBlock language="bash" filename="cURL on Windows CMD and PowerShell">
{`# Windows CMD — escape inner quotes with backslash
curl -X POST https://api.example.com/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alice\",\"age\":30}"

# Windows PowerShell — use single quotes outer, double inside
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d '{"name":"Alice","age":30}'

# Best approach for Windows — use file
'{"name":"Alice","age":30}' | Out-File -Encoding utf8 body.json
curl -X POST https://api.example.com/users \`
  -H "Content-Type: application/json" \`
  -d "@body.json"`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is the difference between -d and --data-raw?',
          answer: '-d (--data): processes @ as a filename reference (-d @file.json reads the file). Strips newlines. --data-raw: sends exact string, @ is treated literally. Use --data-raw when your JSON contains @ symbols (e.g., email addresses in a literal string).',
        },
        {
          question: 'Why does my API return 415 Unsupported Media Type?',
          answer: 'Missing Content-Type header. Add -H "Content-Type: application/json" to every POST request. Some APIs also require Accept: application/json — add that too. 415 means "I don\'t know what format you sent."',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
