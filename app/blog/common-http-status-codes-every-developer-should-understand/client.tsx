'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HTTP Status Codes Every Developer Should Know — Complete Reference</h1>
      <p className="lead">
        HTTP status codes are the language servers use to tell clients what happened to their request.
        Knowing them — not just "200 = good, 404 = not found" — makes you dramatically faster at debugging
        APIs. This guide covers every class with real-world scenarios and when to use each.
      </p>

      <StatGrid stats={[
        { value: '5', label: 'classes: 1xx 2xx 3xx 4xx 5xx', color: 'blue' },
        { value: '63+', label: 'official HTTP status codes defined', color: 'purple' },
        { value: '~10', label: 'codes you\'ll use in 90% of cases', color: 'green' },
        { value: '418', label: "I'm a teapot — yes, it's a real code", color: 'amber' },
      ]} />

      <QuickFact color="blue" label="The one rule to memorize">
        The first digit tells you the class: 1xx = informational, 2xx = success, 3xx = redirect,
        4xx = client error, 5xx = server error. You can often diagnose the problem category just
        from the first digit — before you even look at the body.
      </QuickFact>

      <SectionHeader number={1} title="2xx — Success Codes" />
      <p>The request was received, understood, and processed successfully.</p>

      <CodeBlock language="http" filename="Common 2xx Success Codes">
{`200 OK
  The standard success response. GET, PUT, PATCH succeeded.
  Body: the requested resource or updated resource.

201 Created
  A new resource was created. Use for successful POST requests.
  Should include Location header with URL of new resource.
  Location: /users/456
  Body: the newly created resource { "id": 456, "name": "Alice" }

204 No Content
  Success, but no body to return. Use for DELETE requests.
  Also used for PUT/PATCH when you don't return the updated resource.
  Never include a Content-Length or body with 204.

206 Partial Content
  Used with Range requests (video streaming, large file downloads).
  Content-Range: bytes 0-1023/146515
  The client asked for a specific byte range of the resource.`}
      </CodeBlock>

      <AlertBox type="tip" title="201 vs 200 for POST">
        Use 201 Created when a POST creates a new resource (include a Location header with the new URL).
        Use 200 OK when a POST triggers an action but doesn't create a new resource
        (e.g., POST /auth/login, POST /send-email, POST /search).
      </AlertBox>

      <SectionHeader number={2} title="3xx — Redirect Codes" />
      <p>The client needs to take additional action — usually following a different URL to get the resource.</p>

      <CodeBlock language="http" filename="Common 3xx Redirect Codes">
{`301 Moved Permanently
  Resource has moved to a new URL forever. Browsers cache this — future requests
  skip the original URL entirely. Use when restructuring URLs permanently.
  Location: /new-url
  SEO impact: passes link equity to the new URL.

302 Found (Temporary Redirect)
  Resource is temporarily at a different URL. Not cached by browsers.
  Use for temporary maintenance pages, login redirects, A/B tests.
  Method may change: POST → GET is common behavior (use 307 to prevent).

304 Not Modified
  Client asked "did this change since I last fetched it?"
  (via If-Modified-Since or If-None-Match/ETag headers)
  Server says "no, your cached version is still current." No body.
  Saves bandwidth and server CPU — client uses its local cache.

307 Temporary Redirect
  Like 302, but the HTTP method MUST NOT change (POST stays POST).
  Use 302 for redirecting GET requests, 307 for POST redirects.

308 Permanent Redirect
  Like 301 (permanent, browser-cached), but method must not change.
  POST stays POST across the redirect. Newer and less widely supported.`}
      </CodeBlock>

      <SectionHeader number={3} title="4xx — Client Error Codes" />
      <p>
        The request is wrong — the problem is with what the client sent. 4xx errors are the client's fault.
        Good APIs return descriptive 4xx responses with a body explaining exactly what went wrong.
      </p>

      <CodeBlock language="http" filename="The Essential 4xx Client Error Codes">
{`400 Bad Request
  Request is malformed, missing required fields, or has invalid data.
  Body should explain WHAT is wrong:
  { "error": "email is required", "field": "email" }

401 Unauthorized
  Not authenticated. Client needs to provide or refresh credentials.
  (Confusingly named — it actually means "unauthenticated", not "unauthorized")
  WWW-Authenticate: Bearer realm="api"
  Fix: provide a valid JWT, API key, or re-authenticate.

403 Forbidden
  Authenticated, but not authorized. You don't have permission for this resource.
  403 ≠ 401: with 403, re-authenticating with the SAME credentials won't help.
  Fix: need different permissions, a different role, or contact an admin.

404 Not Found
  Resource doesn't exist at this URL. Also used to hide existence of private
  resources (return 404 instead of 403 to avoid revealing the resource exists).

405 Method Not Allowed
  Wrong HTTP method for this endpoint. GET on a POST-only endpoint.
  Must include Allow header: Allow: GET, POST

409 Conflict
  Request conflicts with current state of the resource.
  Examples: duplicate email on signup, version conflict in optimistic locking.
  { "error": "email already registered" }

410 Gone
  Resource existed but has been permanently deleted. Unlike 404 (never existed).
  Use when you want crawlers to deindex the URL — 410 tells them to stop crawling.

422 Unprocessable Entity
  Syntactically valid JSON, but semantically wrong data.
  Example: end_date before start_date, invalid enum value.
  Preferred over 400 for validation errors in REST APIs.

429 Too Many Requests
  Rate limit exceeded. Include headers showing the limit and when to retry.
  Retry-After: 60
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 0
  X-RateLimit-Reset: 1699900800`}
      </CodeBlock>

      <CompareTable
        leftLabel="401 Unauthorized"
        rightLabel="403 Forbidden"
        rows={[
          { label: 'Actual meaning', left: 'Not authenticated — who are you?', right: 'Authenticated but no permission — we know who you are' },
          { label: 'Fix', left: 'Provide or refresh credentials (log in)', right: 'Need a different role/permission — re-auth won\'t help' },
          { label: 'Re-authenticating helps?', left: 'Yes — log in again to get fresh credentials', right: 'No — same result with the same account' },
          { label: 'Real-world example', left: 'No JWT token in request, or token expired', right: 'Regular user trying to access /admin endpoint' },
          { label: 'Security note', left: 'Return 401 when credentials are missing', right: 'Return 404 (not 403) for private resources to avoid revealing they exist' },
        ]}
      />

      <SectionHeader number={4} title="5xx — Server Error Codes" />
      <p>
        Something went wrong on the server. The request may have been perfectly valid — the server failed
        to fulfill it. 5xx errors are the server's fault, not the client's.
      </p>

      <CodeBlock language="http" filename="Common 5xx Server Error Codes">
{`500 Internal Server Error
  Generic server error. Something unexpectedly crashed or threw an exception.
  Log the full error server-side with stack trace.
  Return a safe, non-revealing message to clients:
  { "error": "Something went wrong.", "requestId": "req_abc123" }

501 Not Implemented
  The server doesn't support this functionality.
  Use for planned endpoints that aren't built yet, or unsupported HTTP methods.

502 Bad Gateway
  The server acted as a proxy/gateway and received an invalid response from upstream.
  Common: Nginx → Node.js crashed or returned garbage. CloudFlare → your origin.

503 Service Unavailable
  Server is temporarily unable to handle requests.
  Use for: maintenance mode, overload protection, graceful shutdown.
  Retry-After: 30  (seconds)

504 Gateway Timeout
  The gateway/proxy timed out waiting for a response from an upstream service.
  Common: Nginx → slow backend, or microservice A → slow microservice B.`}
      </CodeBlock>

      <AlertBox type="info" title="502 vs 503 vs 504 — the gateway trilogy">
        502 = upstream returned garbage (crashed mid-response). 503 = upstream refused connection
        (down or overloaded — connection refused). 504 = upstream accepted connection but responded too slowly.
        From the user's perspective all look like "server is broken" — but for debugging, the distinction
        points you to the right layer of infrastructure.
      </AlertBox>

      <SectionHeader number={5} title="What to Return from Your API — Decision Guide" />
      <VerticalSteps steps={[
        { title: 'GET /users/:id → user found', desc: 'Return 200 OK with the user object in the body. Include Content-Type: application/json header.' },
        { title: 'POST /users → user created', desc: 'Return 201 Created with the created user in the body AND a Location header: Location: /users/456. Never return 200 for resource creation.' },
        { title: 'DELETE /users/:id → deleted', desc: 'Return 204 No Content with an empty body. Some APIs return 200 with a confirmation message — either is acceptable but 204 is more semantically correct.' },
        { title: 'POST /users with invalid data → validation error', desc: 'Return 422 Unprocessable Entity (or 400) with a body describing each validation error by field: { "errors": [{ "field": "email", "message": "Invalid format" }] }.' },
        { title: 'GET /users/:id → not found', desc: 'Return 404 Not Found with a brief message: { "error": "User not found" }. Never return 200 with null — that breaks client error handling.' },
        { title: 'GET /admin/users → regular user', desc: 'Return 404 (not 403) if the resource is private — returning 403 confirms the resource exists. Return 403 only when the resource is publicly known to exist.' },
      ]} />

      <SectionHeader number={6} title="HTTP Status Code Quick Reference" />
      <KeyPointsGrid columns={2} items={[
        { title: '2xx Success', description: '200 OK · 201 Created · 204 No Content · 206 Partial Content (range requests, video streaming)' },
        { title: '3xx Redirect', description: '301 Permanent · 302 Temporary · 304 Not Modified (cached) · 307/308 Method-preserving redirects' },
        { title: '4xx Client Error', description: '400 Bad Request · 401 Unauthenticated · 403 Forbidden · 404 Not Found · 409 Conflict · 422 Validation · 429 Rate Limited' },
        { title: '5xx Server Error', description: '500 Internal Error · 502 Bad Gateway · 503 Unavailable · 504 Gateway Timeout' },
      ]} />

      <SectionHeader number={7} title="Designing Your Error Response Body" />
      <CodeBlock language="json" filename="Well-structured API error response format">
{`// ✅ Good error response — tells the client exactly what went wrong
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "received": "not-an-email"
      },
      {
        "field": "age",
        "message": "Must be a positive integer",
        "received": -5
      }
    ],
    "requestId": "req_01JK4X9MABCDEF123456",
    "documentation": "https://docs.api.com/errors/validation"
  }
}

// ❌ Bad error response — client has no idea what to fix
{
  "error": "Bad request"
}

// ❌ Never return 200 with an error body (anti-pattern)
// HTTP 200 OK ← client thinks it succeeded!
{
  "success": false,
  "error": "Something went wrong"
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Should I use 400 or 422 for validation errors?',
          answer: '422 Unprocessable Entity is technically more correct for semantic validation errors — the JSON syntax is valid, but the data content is invalid (wrong format, missing required field, constraint violation). Many APIs use 400 for everything. Either is fine if you\'re consistent and return a helpful error body describing exactly what failed. The HTTP/1.1 spec suggests 400 for malformed syntax, 422 for semantic errors.',
        },
        {
          question: 'Should I return 404 or 403 for resources a user can\'t access?',
          answer: 'Security best practice: return 404 for resources a user isn\'t allowed to see. If you return 403, you\'ve confirmed the resource exists at that URL — which is information leakage. An attacker can enumerate IDs by checking for 403 vs 404. Return 404 to deny all knowledge of the resource. Only return 403 when the resource\'s existence is already publicly known (e.g., admin endpoints that are documented).',
        },
        {
          question: 'What status code for "not logged in" vs "wrong password"?',
          answer: 'Both should return 401 with the same generic error message: "Invalid credentials." Never reveal which is wrong (user doesn\'t exist vs wrong password) — that allows username enumeration attacks where an attacker discovers which email addresses have accounts by comparing error messages.',
        },
        {
          question: 'Is it OK to return 200 with an error in the body?',
          answer: 'Technically valid JSON but an anti-pattern known as "200 OK with error body." It breaks HTTP semantics, confuses monitoring tools and alerting systems, makes error handling harder for clients, and prevents automatic retry logic from working. Always use the correct 4xx or 5xx status code and put the error detail in the response body.',
        },
        {
          question: 'What HTTP status code should a login endpoint return?',
          answer: 'On success: 200 OK (not 201 — no new resource created, login is an action). Return the session token or JWT in the body or a Set-Cookie header. On failure: 401 with a generic "Invalid credentials" message. On account locked after too many attempts: 403 (authenticated but not permitted to proceed). On rate limiting: 429 with a Retry-After header.',
        },
        {
          question: 'When should I use 503 vs 429?',
          answer: '429 Too Many Requests is for client-specific rate limiting — this specific client has exceeded their quota. 503 Service Unavailable is for server-wide capacity issues — ALL clients are experiencing degraded service because the server is overloaded or in maintenance. Both should include Retry-After headers to tell clients when to retry.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
