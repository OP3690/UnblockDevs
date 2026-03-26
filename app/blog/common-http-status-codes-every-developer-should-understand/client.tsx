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

      <StatGrid
        stats={[
          { value: '5', label: 'classes: 1xx 2xx 3xx 4xx 5xx', color: 'blue' },
          { value: '63+', label: 'official status codes', color: 'purple' },
          { value: '~10', label: 'you\'ll use in 90% of cases', color: 'green' },
          { value: '418', label: "I'm a teapot (yes, it's real)", color: 'amber' },
        ]}
      />

      <QuickFact>
        The first digit tells you the class: 1xx = informational, 2xx = success, 3xx = redirect,
        4xx = client error, 5xx = server error. You can often guess the cause just from the class.
      </QuickFact>

      <SectionHeader number={1} title="2xx — Success" />
      <p>The request was received, understood, and processed successfully.</p>

      <CodeBlock language="http" filename="Common 2xx Codes">
{`200 OK
  The standard success response. GET, PUT, PATCH succeeded.
  Body: the requested resource or updated resource.

201 Created
  A new resource was created. Use for successful POST requests.
  Should include Location header with URL of new resource.
  Location: /users/456

204 No Content
  Success, but no body to return. Use for DELETE requests.
  Also used for PUT/PATCH when you don't return the updated resource.

206 Partial Content
  Used with Range requests (video streaming, large file downloads).
  Content-Range: bytes 0-1023/146515`}
      </CodeBlock>

      <AlertBox type="tip" title="201 vs 200 for POST">
        Use 201 Created when a POST creates a new resource. Use 200 OK when a POST triggers an action
        but doesn't create a resource (e.g., POST /auth/login, POST /send-email).
      </AlertBox>

      <SectionHeader number={2} title="3xx — Redirects" />
      <p>The client needs to take additional action, usually following a different URL.</p>

      <CodeBlock language="http" filename="Common 3xx Codes">
{`301 Moved Permanently
  Resource has moved to a new URL forever. Browsers cache this.
  Use when restructuring URLs (old slug → new slug).
  Location: /new-url

302 Found (Temporary Redirect)
  Resource is temporarily at a different URL. Not cached by browsers.
  Use for temporary maintenance pages or A/B tests.

304 Not Modified
  Client asked "did this change?" (via If-Modified-Since or ETag).
  Server says "no, use your cached version." Saves bandwidth.

307 Temporary Redirect
  Like 302, but method must not change (POST stays POST).
  Use 302 for GET, 307 for POST redirects.

308 Permanent Redirect
  Like 301, but method must not change. POST stays POST.`}
      </CodeBlock>

      <SectionHeader number={3} title="4xx — Client Errors" />
      <p>
        The request is wrong — the problem is with what the client sent. 4xx errors are the client's fault.
        Good APIs return descriptive 4xx with a body explaining what went wrong.
      </p>

      <CodeBlock language="http" filename="The Essential 4xx Codes">
{`400 Bad Request
  Request is malformed, missing required fields, or has invalid data.
  Body should explain WHAT is wrong: { "error": "email is required" }

401 Unauthorized
  Not authenticated. Client needs to provide credentials.
  (Misleadingly named — it actually means "unauthenticated")
  WWW-Authenticate: Bearer realm="api"

403 Forbidden
  Authenticated, but not authorized. You don't have permission.
  403 ≠ 401: with 403, re-authenticating won't help.

404 Not Found
  Resource doesn't exist. Also used to hide existence of private resources.

405 Method Not Allowed
  Wrong HTTP method. GET on a POST-only endpoint.
  Allow: GET, POST  (tells client what methods are allowed)

409 Conflict
  Request conflicts with current state. Duplicate email, version conflict.
  { "error": "email already registered" }

410 Gone
  Resource existed but has been permanently deleted. Unlike 404.
  Use when you want to inform crawlers to deindex the URL.

422 Unprocessable Entity
  Syntactically valid but semantically wrong. e.g., end_date < start_date.
  Preferred over 400 for validation errors in REST APIs.

429 Too Many Requests
  Rate limit exceeded.
  Retry-After: 60  (seconds until they can try again)
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 0`}
      </CodeBlock>

      <CompareTable
        leftLabel="401 Unauthorized"
        rightLabel="403 Forbidden"
        rows={[
          { label: 'Meaning', left: 'Not authenticated — who are you?', right: 'Authenticated but no permission' },
          { label: 'Fix', left: 'Provide/refresh credentials', right: 'Need different permissions/role' },
          { label: 'Re-auth helps?', left: 'Yes — log in again', right: 'No — same result with same account' },
          { label: 'Example', left: 'No JWT token sent', right: 'Regular user accessing admin endpoint' },
        ]}
      />

      <SectionHeader number={4} title="5xx — Server Errors" />
      <p>
        Something went wrong on the server. The request may have been valid — the server failed to fulfill it.
        5xx errors are the server's fault.
      </p>

      <CodeBlock language="http" filename="Common 5xx Codes">
{`500 Internal Server Error
  Generic server error. Something unexpectedly crashed.
  Log the full error server-side. Return a safe, non-revealing message to client.
  { "error": "Something went wrong. Request ID: req_abc123" }

501 Not Implemented
  The server doesn't support this functionality yet.
  Use for planned endpoints that aren't built yet.

502 Bad Gateway
  The server acted as a gateway and got an invalid response from upstream.
  Common when: Nginx → Node.js, and Node.js is down or crashed.

503 Service Unavailable
  Server is temporarily unable to handle requests.
  Use for: maintenance mode, overload, graceful shutdown.
  Retry-After: 30

504 Gateway Timeout
  Gateway/proxy timed out waiting for an upstream response.
  Common when: a backend service is too slow or unresponsive.`}
      </CodeBlock>

      <AlertBox type="info" title="502 vs 503 vs 504">
        502 = upstream returned garbage. 503 = upstream refused connection (down/overloaded). 504 = upstream
        took too long. From the user's perspective all look like "server broken" — but for debugging,
        the difference matters.
      </AlertBox>

      <SectionHeader number={5} title="What to Return From Your API" />

      <VerticalSteps
        steps={[
          {
            title: 'GET /resource/:id → found',
            description: 'Return 200 with the resource in the body.',
            code: 'HTTP/1.1 200 OK\n{ "id": 1, "name": "Alice" }',
          },
          {
            title: 'POST /resource → created',
            description: 'Return 201 with the created resource and Location header.',
            code: 'HTTP/1.1 201 Created\nLocation: /users/456\n{ "id": 456, "name": "Bob" }',
          },
          {
            title: 'DELETE /resource/:id → deleted',
            description: 'Return 204 with empty body.',
            code: 'HTTP/1.1 204 No Content',
          },
          {
            title: 'POST with invalid body → validation error',
            description: 'Return 422 with a body describing each validation error.',
            code: 'HTTP/1.1 422 Unprocessable Entity\n{ "errors": [{ "field": "email", "message": "Invalid format" }] }',
          },
          {
            title: 'GET /resource/:id → not found',
            description: 'Return 404 with a brief message.',
            code: 'HTTP/1.1 404 Not Found\n{ "error": "User not found" }',
          },
        ]}
      />

      <SectionHeader number={6} title="HTTP Status Code Cheat Sheet" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: '2xx Success',
            description: '200 OK · 201 Created · 204 No Content · 206 Partial Content',
          },
          {
            title: '3xx Redirect',
            description: '301 Moved Permanently · 302 Found · 304 Not Modified · 307/308 Redirect',
          },
          {
            title: '4xx Client Error',
            description: '400 Bad Request · 401 Unauth · 403 Forbidden · 404 Not Found · 409 Conflict · 422 Unprocessable · 429 Rate Limited',
          },
          {
            title: '5xx Server Error',
            description: '500 Internal Error · 502 Bad Gateway · 503 Unavailable · 504 Gateway Timeout',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Should I use 400 or 422 for validation errors?',
            answer: '422 Unprocessable Entity is technically more correct for semantic validation errors (the JSON is valid, but the data is wrong). Many APIs use 400 for everything. Either is fine if you\'re consistent and return a helpful error body. The HTTP/1.1 spec suggests 400 for malformed syntax, 422 for semantic errors.',
          },
          {
            question: 'Should 404 or 403 be returned for private resources?',
            answer: 'Security best practice: return 404 for resources a user isn\'t allowed to see. If you return 403, you\'ve confirmed the resource exists — which is information leakage. Return 404 to deny knowledge of the resource entirely.',
          },
          {
            question: 'What status code should I use for "not logged in" vs "wrong password"?',
            answer: 'Both should return 401. Never reveal which is wrong (user exists vs wrong password) — that allows username enumeration attacks. Return the same generic "Invalid credentials" message for both.',
          },
          {
            question: 'Is it OK to return 200 with an error in the body?',
            answer: 'Technically valid but an anti-pattern (known as "200 OK with error body"). It breaks HTTP semantics, confuses monitoring tools, and makes error handling harder. Use the correct 4xx/5xx status code, and put the error detail in the response body.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
