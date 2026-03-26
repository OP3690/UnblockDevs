'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function ConsumingWebApiJsonDataUsingCurlAndJqCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="Consuming Web API JSON Data Using curl and jq: Complete Guide 2026"
      description="Master fetching, parsing, and transforming JSON from web APIs using curl and jq on the command line."
    >
      <h1>Consuming Web API JSON Data Using curl and jq: Complete Guide 2026</h1>
      <p className="lead">
        Whether you are testing endpoints, building shell scripts, or debugging production APIs, the combination of <strong>curl</strong> and <strong>jq</strong> is the most powerful two-tool stack in a developer's terminal. This guide takes you from zero to confidently querying real APIs, parsing nested JSON, transforming data pipelines, and automating workflows — entirely from the command line.
      </p>

      <StatGrid stats={[
        { value: '1B+', label: 'curl downloads per year', color: 'blue' },
        { value: '~50ms', label: 'typical jq parse time on 1MB JSON', color: 'green' },
        { value: '200+', label: 'built-in jq filter functions', color: 'purple' },
        { value: '0', label: 'runtime dependencies for jq', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Are curl and jq?" />

      <p>
        <strong>curl</strong> (Client URL) is a command-line tool and library for transferring data with URLs. It supports HTTP, HTTPS, FTP, and dozens of other protocols. Developers use it daily to send GET, POST, PUT, and DELETE requests to REST APIs.
      </p>
      <p>
        <strong>jq</strong> is a lightweight, portable command-line JSON processor written in C. It reads JSON from stdin or a file, applies a filter expression, and outputs transformed JSON or plain text. Think of it as <code>sed</code> and <code>awk</code> but designed specifically for JSON.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'curl strengths', description: 'HTTP requests, custom headers, authentication, file uploads, cookie handling, redirect following, TLS certificates.' },
        { title: 'jq strengths', description: 'Pretty-printing, field extraction, array iteration, conditional logic, grouping, sorting, math, and string interpolation.' },
        { title: 'Why pipe them together', description: 'curl delivers raw JSON; jq shapes it. The Unix pipe model means zero temporary files and instant feedback.' },
        { title: 'Where they run', description: 'macOS, Linux, Windows (WSL / Git Bash), CI/CD pipelines, Docker containers — anywhere bash runs.' },
      ]} />

      <SectionHeader number={2} title="Installation" />

      <VerticalSteps steps={[
        {
          title: 'Install curl',
          description: 'curl ships with macOS and most Linux distros. On Ubuntu/Debian run: sudo apt install curl. On macOS with Homebrew: brew install curl. On Windows install WSL2 or Git for Windows.',
          code: `# Ubuntu / Debian
sudo apt update && sudo apt install -y curl

# macOS
brew install curl

# Verify
curl --version`,
        },
        {
          title: 'Install jq',
          description: 'jq is a single static binary — no dependencies. Download from jqlang.github.io/jq or use a package manager.',
          code: `# Ubuntu / Debian
sudo apt install -y jq

# macOS
brew install jq

# Alpine (Docker)
apk add jq

# Verify
jq --version`,
        },
        {
          title: 'Test the pipeline',
          description: 'Run a quick sanity check against a public API.',
          code: `curl -s "https://jsonplaceholder.typicode.com/todos/1" | jq
# Expected pretty-printed output:
# {
#   "userId": 1,
#   "id": 1,
#   "title": "delectus aut autem",
#   "completed": false
# }`,
        },
      ]} />

      <SectionHeader number={3} title="Essential curl Flags for API Work" />

      <p>
        Raw <code>curl https://api.example.com</code> works, but the following flags turn it into a proper API client.
      </p>

      <CompareTable
        leftLabel="Flag"
        rightLabel="What it does"
        rows={[
          { label: '-s', left: '-s', right: 'Silent mode — suppresses progress bar. Essential when piping to jq.' },
          { label: '-S', left: '-sS', right: 'Show errors even in silent mode. Combine with -s as -sS.' },
          { label: '-X', left: '-X POST', right: 'Set HTTP method. Default is GET.' },
          { label: '-H', left: '-H "Accept: application/json"', right: 'Add a request header. Repeat for multiple headers.' },
          { label: '-d', left: "-d '{\"key\":\"val\"}'", right: 'Send request body (implies POST).' },
          { label: '-o', left: '-o response.json', right: 'Save output to file instead of stdout.' },
          { label: '-w', left: '-w "%{http_code}"', right: 'Print extra info like HTTP status code after transfer.' },
          { label: '-L', left: '-L', right: 'Follow redirects (3xx responses).' },
          { label: '-u', left: '-u user:pass', right: 'Basic authentication.' },
          { label: '--fail', left: '--fail', right: 'Exit with non-zero code on HTTP errors (4xx, 5xx). Great for scripts.' },
        ]}
      />

      <CodeBlock language="bash" filename="api-request.sh">{`# Full production-grade GET request
curl -sS \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Accept: application/json" \\
  -L --fail \\
  "https://api.example.com/v2/users" \\
  | jq

# POST with JSON body
curl -sS \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"name":"Alice","role":"admin"}' \\
  "https://api.example.com/v2/users" \\
  | jq`}</CodeBlock>

      <SectionHeader number={4} title="jq Basics: Filters, Fields, and Arrays" />

      <QuickFact>The identity filter <code>.</code> in jq means "pass input through unchanged" — it is how you pretty-print any JSON.</QuickFact>

      <p>Every jq expression is a <em>filter</em>. Filters read input, transform it, and produce output. You chain filters with <code>|</code> (the pipe operator inside jq).</p>

      <CodeBlock language="bash" filename="jq-basics.sh">{`# Pretty-print (identity filter)
curl -s "https://jsonplaceholder.typicode.com/users/1" | jq '.'

# Extract a single field
curl -s "https://jsonplaceholder.typicode.com/users/1" | jq '.name'
# "Leanne Graham"

# Nested field
curl -s "https://jsonplaceholder.typicode.com/users/1" | jq '.address.city'
# "Gwenborough"

# Array element by index
curl -s "https://jsonplaceholder.typicode.com/users" | jq '.[0].name'
# "Leanne Graham"

# All elements of an array (iterator)
curl -s "https://jsonplaceholder.typicode.com/users" | jq '.[].name'
# Prints each name on a separate line

# Array length
curl -s "https://jsonplaceholder.typicode.com/users" | jq '. | length'
# 10`}</CodeBlock>

      <AlertBox type="tip" title="Remove string quotes with -r">
        By default jq wraps string values in double quotes. Add the <code>-r</code> flag (<em>raw output</em>) to strip them: <code>jq -r '.name'</code>. This is essential when piping jq output into other shell commands.
      </AlertBox>

      <SectionHeader number={5} title="Filtering and Selecting Data" />

      <p>The <code>select()</code> function filters array elements based on a condition. Combined with the iterator <code>.[]</code> it is the jq equivalent of <code>WHERE</code> in SQL.</p>

      <CodeBlock language="bash" filename="jq-select.sh">{`# Filter todos that are completed
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq '[.[] | select(.completed == true)]'

# Filter users by userId
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq '[.[] | select(.userId == 1)]'

# Filter posts where title contains "qui"
curl -s "https://jsonplaceholder.typicode.com/posts" \\
  | jq '[.[] | select(.title | contains("qui"))]'

# Count matching items
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq '[.[] | select(.completed == true)] | length'`}</CodeBlock>

      <SectionHeader number={6} title="Transforming and Reshaping JSON" />

      <p>jq can reconstruct JSON into any shape using object construction <code>{'{}'}</code> and array construction <code>[]</code>.</p>

      <CodeBlock language="bash" filename="jq-transform.sh">{`# Pick specific fields (projection)
curl -s "https://jsonplaceholder.typicode.com/users" \\
  | jq '[.[] | {id, name, email}]'

# Rename fields
curl -s "https://jsonplaceholder.typicode.com/users" \\
  | jq '[.[] | {userId: .id, fullName: .name, contactEmail: .email}]'

# Add computed fields
curl -s "https://jsonplaceholder.typicode.com/posts" \\
  | jq '[.[] | . + {titleLength: (.title | length)}]'

# Flatten nested structure
curl -s "https://jsonplaceholder.typicode.com/users" \\
  | jq '[.[] | {id, name, city: .address.city, lat: .address.geo.lat}]'`}</CodeBlock>

      <SectionHeader number={7} title="Aggregation: group_by, sort_by, unique_by" />

      <CodeBlock language="bash" filename="jq-aggregate.sh">{`# Group todos by userId
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq 'group_by(.userId)'

# Count todos per user
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq 'group_by(.userId) | map({userId: .[0].userId, count: length})'

# Sort posts by title length
curl -s "https://jsonplaceholder.typicode.com/posts" \\
  | jq 'sort_by(.title | length)'

# Get unique userIds
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq '[.[].userId] | unique | sort'

# Min and max
curl -s "https://jsonplaceholder.typicode.com/todos" \\
  | jq 'group_by(.userId) | map({userId: .[0].userId, count: length}) | (max_by(.count), min_by(.count))'`}</CodeBlock>

      <SectionHeader number={8} title="Working with Headers and HTTP Status Codes" />

      <QuickFact>Always check HTTP status codes in scripts. A 200 OK with an error body is the most common API gotcha.</QuickFact>

      <CodeBlock language="bash" filename="jq-headers.sh">{`# Print HTTP status code alongside response
curl -sS -w "\\nHTTP_STATUS: %{http_code}\\n" \\
  "https://jsonplaceholder.typicode.com/posts/1" | jq '.'

# Store status code and body separately
HTTP_BODY=$(curl -sS -w "%{http_code}" -o /tmp/api_response.json \\
  "https://api.example.com/data")
HTTP_CODE=$?
cat /tmp/api_response.json | jq '.'
echo "Status: $HTTP_BODY"

# Exit script on non-2xx (using --fail)
curl -sS --fail \\
  "https://api.example.com/endpoint" \\
  | jq '.' || { echo "API request failed"; exit 1; }

# Capture response headers with -D
curl -sS -D /tmp/headers.txt "https://api.example.com/data" | jq '.'
cat /tmp/headers.txt`}</CodeBlock>

      <SectionHeader number={9} title="Authentication Patterns" />

      <VerticalSteps steps={[
        {
          title: 'Bearer Token (OAuth 2.0 / JWT)',
          description: 'Most modern REST APIs use Bearer tokens in the Authorization header.',
          code: `export TOKEN="eyJhbGciOiJSUzI1NiJ9..."
curl -sS \\
  -H "Authorization: Bearer $TOKEN" \\
  "https://api.example.com/me" | jq`,
        },
        {
          title: 'API Key in Header',
          description: 'Some APIs use a custom header like X-API-Key.',
          code: `export API_KEY="sk-live-abc123"
curl -sS \\
  -H "X-API-Key: $API_KEY" \\
  "https://api.example.com/data" | jq`,
        },
        {
          title: 'Basic Authentication',
          description: 'Legacy APIs or internal tools sometimes use HTTP Basic auth.',
          code: `curl -sS -u "$USERNAME:$PASSWORD" \\
  "https://api.internal.com/v1/status" | jq`,
        },
        {
          title: 'API Key in Query String',
          description: 'Some public APIs embed the key in the URL. Less secure — avoid for production.',
          code: `curl -sS "https://api.example.com/data?api_key=$API_KEY" | jq`,
        },
      ]} />

      <SectionHeader number={10} title="Real-World Examples" />

      <p>Let us walk through five common real-world scenarios.</p>

      <CodeBlock language="bash" filename="example-github.sh">{`# 1. List your GitHub repos and show name + star count
curl -sS \\
  -H "Authorization: Bearer $GITHUB_TOKEN" \\
  -H "Accept: application/vnd.github+json" \\
  "https://api.github.com/user/repos?per_page=100" \\
  | jq '[.[] | {name, stars: .stargazers_count}] | sort_by(-.stars)'`}</CodeBlock>

      <CodeBlock language="bash" filename="example-weather.sh">{`# 2. Get current temperature from OpenWeatherMap
curl -sS "https://api.openweathermap.org/data/2.5/weather?q=London&appid=$OWM_KEY&units=metric" \\
  | jq '{city: .name, temp: .main.temp, feels_like: .main.feels_like, description: .weather[0].description}'`}</CodeBlock>

      <CodeBlock language="bash" filename="example-pagination.sh">{`# 3. Handle paginated APIs (fetch all pages)
PAGE=1
ALL_DATA="[]"
while true; do
  RESPONSE=$(curl -sS "https://api.example.com/items?page=$PAGE&limit=100")
  ITEMS=$(echo "$RESPONSE" | jq '.items')
  COUNT=$(echo "$ITEMS" | jq 'length')

  if [ "$COUNT" -eq 0 ]; then break; fi

  ALL_DATA=$(echo "$ALL_DATA $ITEMS" | jq -s '.[0] + .[1]')
  PAGE=$((PAGE + 1))
done

echo "$ALL_DATA" | jq 'length'`}</CodeBlock>

      <CodeBlock language="bash" filename="example-post.sh">{`# 4. Create a resource and capture the new ID
NEW_ID=$(curl -sS -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"title":"New Post","body":"Content here","userId":1}' \\
  "https://jsonplaceholder.typicode.com/posts" \\
  | jq -r '.id')
echo "Created post with ID: $NEW_ID"`}</CodeBlock>

      <CodeBlock language="bash" filename="example-jq-env.sh">{`# 5. Use shell variables inside jq with --arg
USER_ID=3
curl -s "https://jsonplaceholder.typicode.com/posts" \\
  | jq --argjson uid "$USER_ID" '[.[] | select(.userId == $uid)]'`}</CodeBlock>

      <SectionHeader number={11} title="Error Handling in Scripts" />

      <AlertBox type="warning" title="Silent failures are dangerous">
        Without <code>--fail</code> or explicit status checking, curl returns exit code 0 even on 404 or 500 responses. Your script will happily process an error body as if it were valid data.
      </AlertBox>

      <ErrorFix
        bad={`# BAD: no error handling
curl -s "https://api.example.com/data" | jq '.users[]'
# If API returns {"error":"unauthorized"}, jq silently outputs nothing`}
        good={`# GOOD: check exit codes and validate response
RESPONSE=$(curl -sS --fail "https://api.example.com/data" 2>&1)
if [ $? -ne 0 ]; then
  echo "curl failed: $RESPONSE" >&2
  exit 1
fi

ERROR=$(echo "$RESPONSE" | jq -r '.error // empty')
if [ -n "$ERROR" ]; then
  echo "API error: $ERROR" >&2
  exit 1
fi

echo "$RESPONSE" | jq '.users[]'`}
        badLabel="Unsafe (no error handling)"
        goodLabel="Safe (proper error handling)"
      />

      <SectionHeader number={12} title="Performance Tips" />

      <KeyPointsGrid columns={3} items={[
        { title: 'Use -s flag always', description: 'Suppress progress output when piping to jq to avoid corrupting the JSON stream.' },
        { title: 'Stream large responses', description: 'For very large JSON arrays use jq --stream to process elements one at a time without loading the whole file into memory.' },
        { title: 'Save to file first', description: 'When applying multiple jq filters to the same API response, save to a temp file and run jq multiple times rather than making repeated API calls.' },
        { title: 'Use -c for compact output', description: 'jq -c outputs compact (minified) JSON, useful when passing output to another tool or saving space in logs.' },
        { title: 'Parallel requests with xargs', description: 'Combine curl with xargs -P to make multiple API requests in parallel: cat ids.txt | xargs -P 10 -I{} curl -s "https://api.example.com/item/{}"' },
        { title: 'Cache responses during dev', description: 'Save API responses to files during development and jq against the file: jq \'.users\' response.json. Saves rate limit quota.' },
      ]} />

      <SectionHeader number={13} title="Debugging Tips" />

      <VerticalSteps steps={[
        {
          title: 'Verbose mode for request inspection',
          description: 'Use -v to see request headers, TLS handshake, and response headers.',
          code: `curl -v "https://api.example.com/data" 2>&1 | head -50`,
        },
        {
          title: 'Check what jq receives',
          description: 'If jq gives unexpected output, first inspect the raw curl response.',
          code: `# Step 1: see raw response
curl -sS "https://api.example.com/data"

# Step 2: validate it is JSON
curl -sS "https://api.example.com/data" | jq 'type'

# Step 3: apply your filter
curl -sS "https://api.example.com/data" | jq '.data.items'`,
        },
        {
          title: 'Test jq expressions interactively',
          description: 'Use jqplay.org or echo a sample payload to test filters before scripting.',
          code: `echo '{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]}' \\
  | jq '.users[] | select(.id == 2) | .name'
# "Bob"`,
        },
      ]} />

      <SectionHeader number={14} title="curl + jq vs Alternatives" />

      <CompareTable
        leftLabel="curl + jq"
        rightLabel="Python requests + json"
        rows={[
          { label: 'Setup', left: 'Zero deps, works in any shell', right: 'Needs Python + requests installed' },
          { label: 'Speed', left: 'Fastest for one-liners', right: 'Faster for complex logic' },
          { label: 'Readability', left: 'Terse, powerful', right: 'More readable for complex transformations' },
          { label: 'Error handling', left: 'Manual with exit codes', right: 'Structured exceptions' },
          { label: 'CI/CD suitability', left: 'Excellent — minimal footprint', right: 'Good — more setup required' },
          { label: 'Learning curve', left: 'jq syntax takes time', right: 'Familiar Python syntax' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between curl and wget?',
          answer: 'Both download files and make HTTP requests, but curl is designed for API work: it supports more protocols, custom headers, authentication methods, and piping. wget is simpler and better for recursive website downloads. For API consumption, curl is the standard choice.',
        },
        {
          question: 'How do I pretty-print JSON with curl alone?',
          answer: 'curl itself does not format JSON. You need jq (or python -m json.tool as an alternative): curl -s "https://api.example.com" | python3 -m json.tool. But jq is faster and more powerful.',
        },
        {
          question: 'How do I handle API rate limits in scripts?',
          answer: 'Add sleep between requests: sleep 0.2 between curl calls. Check response headers like X-RateLimit-Remaining using curl -I or -D. Use --retry and --retry-delay flags for transient failures.',
        },
        {
          question: 'Can jq handle very large JSON files?',
          answer: 'Yes, but with limits. For files under 100MB jq works fine. For larger files use jq --stream which processes tokens incrementally without loading the entire document into memory. For truly massive data (GB+) consider tools like fx, gron, or Apache Arrow.',
        },
        {
          question: 'How do I send multipart form data with curl?',
          answer: 'Use -F flag: curl -sS -F "file=@/path/to/file.png" -F "name=upload" https://api.example.com/upload | jq. This sets the Content-Type to multipart/form-data automatically.',
        },
        {
          question: 'How do I follow redirects with curl?',
          answer: 'Add the -L flag: curl -sL "https://api.example.com/data" | jq. By default curl does not follow redirects (3xx responses). -L makes it follow up to 30 redirects by default.',
        },
      ]} />

      <AlertBox type="success" title="You are now ready to consume any REST API from the terminal">
        With curl and jq mastered, you can script API workflows, build lightweight data pipelines, write CI/CD health checks, and debug production issues — all without leaving your terminal. The next step is combining these into reusable shell functions and adding them to your dotfiles.
      </AlertBox>
    </BlogLayoutWithSidebarAds>
  );
}
