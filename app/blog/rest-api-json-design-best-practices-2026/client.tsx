'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, ErrorFix, VerticalSteps, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function RestApiJsonBestPracticesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>REST API JSON Design Best Practices 2026: 8 Rules Every Developer Must Follow</h1>
      <p className="lead">
        A well-designed API is a product. A poorly-designed one is a support ticket. The difference
        between an API that developers love integrating and one that generates Slack threads full of
        &ldquo;what does this field mean?&rdquo; comes down to eight consistent design decisions.
        This guide covers every one: response envelopes, HTTP status codes, error formats, pagination,
        API versioning, date formatting, naming conventions, and the null-vs-omit question &mdash;
        each with real JSON examples, before-and-after comparisons, and the reasoning behind the rule.
      </p>

      <StatGrid stats={[
        { value: '82%',   label: 'of new APIs in 2026 use JSON as their primary data format', color: 'blue' },
        { value: '4.2x',  label: 'faster developer onboarding for APIs with consistent error formats', color: 'green' },
        { value: '68%',   label: 'of API bugs are caused by inconsistent response shapes, not logic errors', color: 'amber' },
        { value: '1 day', label: 'typical time to regret not versioning an API from the start', color: 'red' },
      ]} />

      <SectionHeader number={1} title="Definition: What Is a REST API and Why Does JSON Format Matter?" />

      <QuickFact color="blue" label="REST = architectural style for stateless, resource-based HTTP APIs returning JSON">
        REST (Representational State Transfer) is not a protocol or standard &mdash; it is an architectural
        style defined by six constraints: statelessness, a uniform interface, client-server separation,
        cacheability, a layered system, and optional code on demand. In 2026, REST over HTTP with JSON
        responses is the dominant API pattern. The JSON format you choose is what every consumer
        of your API has to live with indefinitely.
      </QuickFact>

      <p>
        JSON format decisions compound over time. A bare array response on day one becomes a
        versioning nightmare the moment you need to add pagination. An inconsistent error format
        forces every client to handle errors differently. A mix of camelCase and snake_case requires
        consumers to guess which convention applies. Each rule below eliminates one category of
        ongoing friction.
      </p>

      <SectionHeader number={2} title="When to Use REST+JSON vs GraphQL vs gRPC" />

      <CompareTable
        headers={['Factor', 'REST + JSON', 'GraphQL', 'gRPC']}
        rows={[
          ['Data format',       'JSON — human-readable',           'JSON — human-readable',             'Protocol Buffers — binary'],
          ['Query flexibility', 'Fixed endpoints, fixed shape',    'Client specifies exact fields',      'Fixed methods, strong types'],
          ['Browser support',   '✅ Native fetch/XMLHttpRequest',   '✅ Via HTTP POST',                   '⚠️ Requires grpc-web proxy'],
          ['Learning curve',    'Low — standard HTTP',             'Medium — schema + query language',   'High — proto files, codegen'],
          ['Caching',           '✅ HTTP cache headers work natively', '❌ POST requests are not cached', '❌ Custom caching needed'],
          ['Best for',          'Public APIs, most web/mobile apps', 'Complex data graphs, frontend-driven', 'Internal microservices, high-perf'],
          ['2026 verdict',      'Default choice for most teams',   'Strong for BFF and data-heavy SPAs', 'Internal service mesh'],
        ]}
      />

      <AlertBox type="tip" title="When in doubt, start with REST+JSON">
        GraphQL shines when you have many consumer types that each need different data shapes.
        gRPC shines for internal high-throughput service-to-service communication.
        For everything else &mdash; public APIs, mobile backends, third-party integrations &mdash;
        REST with consistent JSON design is the lowest-friction, highest-compatibility choice.
      </AlertBox>

      <SectionHeader number={3} title="How: The 8 REST API JSON Best Practices" />

      <p>
        These are not opinions &mdash; they are the decisions that every team eventually converges on
        after shipping a production API and dealing with the consequences of getting them wrong.
      </p>

      {/* Rule 1 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 1: Pick One Naming Convention and Never Deviate</h3>
      <p className="text-zinc-700 mb-4">
        Use <strong>camelCase</strong> for JSON properties in JavaScript/TypeScript APIs.
        Use <strong>snake_case</strong> for Python APIs where it matches the language convention.
        The critical rule: pick one and apply it to <em>every single field</em> in <em>every single response</em>.
        Mixed naming forces consumers to guess which convention applies per field.
      </p>

      <ErrorFix
        bad={`// ❌ Mixed naming — forces consumers to check every field
{
  "user_id": "usr_123",
  "firstName": "Alice",
  "last_name": "Chen",
  "emailAddress": "alice@example.com",
  "created_at": "2026-05-15",
  "isActive": true,
  "phone_number": null
}`}
        good={`// ✅ Consistent camelCase throughout — zero guessing
{
  "userId": "usr_123",
  "firstName": "Alice",
  "lastName": "Chen",
  "emailAddress": "alice@example.com",
  "createdAt": "2026-05-15T10:00:00Z",
  "isActive": true,
  "phoneNumber": null
}`}
        badLabel="Mixed camelCase + snake_case — forces consumers to check docs per field"
        goodLabel="Consistent camelCase — predictable, zero ambiguity"
      />

      {/* Rule 2 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 2: Always Use a Response Envelope</h3>
      <p className="text-zinc-700 mb-4">
        A bare JSON object or array at the root is impossible to extend without a breaking change.
        Always wrap responses in an envelope with <code>data</code>, <code>meta</code>, and <code>error</code> keys.
        This gives you a stable root structure that you can add metadata to without changing the data contract.
      </p>

      <ErrorFix
        bad={`// ❌ Bare object — can never add pagination, errors, or metadata
[
  { "id": "usr_1", "name": "Alice" },
  { "id": "usr_2", "name": "Bob" }
]
// How do you add totalCount? nextCursor? requestId? You can't without a breaking change.`}
        good={`// ✅ Envelope — stable root, infinitely extensible
{
  "data": [
    { "id": "usr_1", "name": "Alice" },
    { "id": "usr_2", "name": "Bob" }
  ],
  "meta": {
    "total": 1284,
    "page": 1,
    "perPage": 20,
    "nextCursor": "cursor_abc123"
  },
  "requestId": "req_xyz789"   // tracing — added later without breaking clients
}`}
        badLabel="Bare array — locked into this shape forever"
        goodLabel="Envelope — add metadata anytime without breaking existing consumers"
      />

      {/* Rule 3 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 3: Use HTTP Status Codes Correctly — Every Time</h3>
      <p className="text-zinc-700 mb-4">
        Returning 200 OK with an error in the body is the most common REST anti-pattern.
        HTTP status codes are the first signal clients use to decide how to handle a response.
        Using them correctly means clients can implement generic error handling without parsing every body.
      </p>

      <CodeBlock language="text" filename="HTTP status codes — the only ones you actually need">
{`// ── Success ───────────────────────────────────────────────────────────────
200 OK           — GET, PUT, PATCH succeeded with a response body
201 Created      — POST created a new resource (include Location header)
204 No Content   — DELETE succeeded, or PUT/PATCH with no response body needed

// ── Client errors (the client did something wrong) ─────────────────────────
400 Bad Request  — invalid JSON body, missing required field, malformed input
401 Unauthorized — no auth token, or token is invalid / expired
403 Forbidden    — token is valid but user lacks permission for this resource
404 Not Found    — resource does not exist (or you are hiding it from unauthorized users)
409 Conflict     — duplicate resource (email already exists, version conflict)
422 Unprocessable — valid JSON, but business logic validation failed (age must be > 0)
429 Too Many Requests — rate limit exceeded (include Retry-After header)

// ── Server errors (your code failed) ──────────────────────────────────────
500 Internal Server Error — unexpected server-side failure
503 Service Unavailable   — downstream dependency is down, try again later`}
      </CodeBlock>

      {/* Rule 4 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 4: Standardize Your Error Response Format</h3>
      <p className="text-zinc-700 mb-4">
        Every error response must have the same shape so clients can write one error handler.
        Include a machine-readable <code>code</code> for programmatic handling, a human-readable
        <code>message</code> for debugging, and an optional <code>details</code> array for
        field-level validation errors.
      </p>

      <CodeBlock language="json" filename="Standardized error response format — same shape for every error">
{`// ── Validation error (422) ────────────────────────────────────────────────
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body contains invalid values.",
    "details": [
      { "field": "email",    "code": "INVALID_FORMAT",  "message": "Must be a valid email address" },
      { "field": "age",      "code": "OUT_OF_RANGE",    "message": "Must be between 0 and 150" },
      { "field": "username", "code": "ALREADY_EXISTS",  "message": "This username is already taken" }
    ]
  },
  "requestId": "req_xyz789"
}

// ── Auth error (401) ──────────────────────────────────────────────────────
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Your access token has expired. Use the refresh token to obtain a new one."
  },
  "requestId": "req_abc456"
}

// ── Rate limit error (429) ────────────────────────────────────────────────
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait 60 seconds before retrying."
  },
  "requestId": "req_def123"
}
// Also set: Retry-After: 60  (header)`}
      </CodeBlock>

      {/* Rule 5 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 5: Paginate Every List Endpoint from Day One</h3>
      <p className="text-zinc-700 mb-4">
        Every list endpoint will eventually have more records than fit in a single response.
        Returning all records by default works in development and causes production outages.
        Use cursor-based pagination for datasets that grow continuously; use offset pagination
        only for datasets where users need random-access page navigation.
      </p>

      <CodeBlock language="json" filename="Cursor-based pagination — the production-safe pattern">
{`// Request: GET /api/v1/users?limit=20&cursor=cursor_abc123
// Response:
{
  "data": [
    { "id": "usr_101", "name": "Alice Chen" },
    { "id": "usr_102", "name": "Bob Kim" }
  ],
  "meta": {
    "total":       1284,         // total matching records
    "count":       20,           // records in this page
    "limit":       20,           // requested page size
    "nextCursor":  "cursor_xyz456",  // null when this is the last page
    "prevCursor":  "cursor_abc123",  // null on first page
    "hasNextPage": true
  }
}

// Why cursor over offset?
// Offset: SELECT * FROM users LIMIT 20 OFFSET 10000  — full table scan, slow
// Cursor: SELECT * FROM users WHERE id > last_id LIMIT 20  — index seek, instant
// Offset also has the "shifting window" bug: new inserts while paginating cause skips`}
      </CodeBlock>

      {/* Rule 6 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 6: Use ISO 8601 for Every Date and Timestamp</h3>
      <p className="text-zinc-700 mb-4">
        Never return Unix timestamps as integers &mdash; they are not human-readable in logs.
        Never return locale-specific strings like &ldquo;May 15, 2026&rdquo; &mdash; they are ambiguous across
        regions. Always use ISO 8601 format with UTC timezone: <code>&quot;2026-05-15T10:00:00Z&quot;</code>.
      </p>

      <ErrorFix
        bad={`// ❌ Three different date formats in one response — chaos
{
  "createdAt":   1716000000,         // Unix timestamp — not human-readable
  "updatedAt":   "May 15, 2026",     // Locale-specific — ambiguous internationally
  "deletedAt":   "15/05/2026 10:00", // DD/MM vs MM/DD — which one?
  "expiresAt":   "2026-05-15"        // Date only — what timezone? Midnight where?
}`}
        good={`// ✅ ISO 8601 UTC everywhere — unambiguous, parseable in every language
{
  "createdAt":   "2026-05-15T10:00:00Z",         // full precision, UTC
  "updatedAt":   "2026-05-15T14:32:01.456Z",     // millisecond precision when needed
  "deletedAt":   null,                            // null = not deleted, always present
  "expiresAt":   "2026-06-15T00:00:00Z"          // midnight UTC — unambiguous
}
// new Date("2026-05-15T10:00:00Z") works in every JavaScript environment
// datetime.fromisoformat("2026-05-15T10:00:00Z") works in Python 3.11+`}
        badLabel="Mixed date formats — every consumer writes different parsing code"
        goodLabel="ISO 8601 UTC — one parser handles every field in every language"
      />

      {/* Rule 7 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 7: Version Your API from Day One</h3>

      <AlertBox type="warning" title="The most expensive API mistake: not versioning until you need to break the contract">
        Once an API is consumed by real clients, every breaking change requires coordinating migration
        across every consumer simultaneously. API versioning in the URL (<code>/api/v1/</code>) costs
        nothing to add at the start and saves months of migration work later.
        The question is never &ldquo;should we version?&rdquo; — it is &ldquo;when did we wish we had?&rdquo;
      </AlertBox>

      <CodeBlock language="text" filename="API versioning — URL path is the most explicit and cache-friendly approach">
{`// ✅ Version in URL path — recommended
GET /api/v1/users
GET /api/v2/users       // v2 with breaking changes — v1 still works
GET /api/v1/users/123   // consistent structure

// ⚠️ Version in header — valid but less visible, harder to test in browser
GET /api/users
Accept: application/vnd.myapp.v1+json

// ⚠️ Version in query param — works but pollutes query string
GET /api/users?version=1

// Breaking vs non-breaking changes:
// NON-BREAKING (safe to add without bumping version):
//   + Adding new optional fields to responses
//   + Adding new optional query parameters
//   + Adding new endpoints
//   + Relaxing validation rules

// BREAKING (always bump the version):
//   - Removing or renaming fields
//   - Changing field types (string → number)
//   - Changing error codes
//   - Making optional fields required
//   - Changing pagination format`}
      </CodeBlock>

      {/* Rule 8 */}
      <h3 className="mt-8 mb-3 text-lg font-bold text-zinc-900">Rule 8: Use null Explicitly — Never Omit Optional Fields</h3>
      <p className="text-zinc-700 mb-4">
        When an optional field has no value, include it in the response with a value of <code>null</code>.
        Never omit it entirely. Omitting fields means clients must use both
        <code>if (field in response)</code> and <code>if (response.field !== null)</code> checks.
        With explicit nulls, clients check one thing: <code>if (response.field !== null)</code>.
      </p>

      <ErrorFix
        bad={`// ❌ Omitting optional fields — clients can't distinguish "null" from "not returned"
// User with nickname:
{ "id": "usr_1", "name": "Alice", "nickname": "ace", "phone": "+1555000001" }

// User without nickname — field is completely missing:
{ "id": "usr_2", "name": "Bob", "phone": null }

// User without phone — field is also completely missing:
{ "id": "usr_3", "name": "Carol", "nickname": "czar" }

// Client code: if (user.nickname) — works only half the time`}
        good={`// ✅ Always include all fields, use null for absent values
// User with nickname:
{ "id": "usr_1", "name": "Alice", "nickname": "ace",  "phone": "+1555000001" }

// User without nickname:
{ "id": "usr_2", "name": "Bob",   "nickname": null,   "phone": null }

// User without phone:
{ "id": "usr_3", "name": "Carol", "nickname": "czar", "phone": null }

// Client code: if (user.nickname !== null) — works every time, predictable type`}
        badLabel="Omitting fields — clients can't distinguish absence from null"
        goodLabel="Explicit null — predictable shape, one check per field"
      />

      <SectionHeader number={4} title="Why These Practices Matter — Developer Experience Is a Product Decision" />

      <VerticalSteps steps={[
        {
          title: 'Consistent APIs reduce integration time by 4x',
          desc: 'When every endpoint uses the same envelope, error format, and naming convention, developers build their API client once and reuse it everywhere. When every endpoint is different, every integration is a fresh investigation.',
        },
        {
          title: 'Standard error formats enable generic error handling',
          desc: 'A shared error format means your frontend can have one toast notification component, one error boundary, and one retry logic handler. Without it, each endpoint requires bespoke error handling — multiply that by 50 endpoints and you have a maintenance crisis.',
        },
        {
          title: 'Cursor pagination prevents production outages',
          desc: 'A list endpoint that returns all records will work fine in development with 100 records. It will cause a timeout at 100,000. Cursor pagination is not a premature optimization — it is protection against the most predictable failure mode of any growing API.',
        },
        {
          title: 'ISO 8601 dates eliminate an entire class of timezone bugs',
          desc: 'Date bugs are notoriously hard to reproduce — they often only appear in certain locales at certain times. ISO 8601 UTC eliminates the entire class. Every language can parse it natively, and every developer knows what the Z means.',
        },
        {
          title: 'API versioning is the cheapest insurance you will ever buy',
          desc: 'Adding /v1/ to your URL structure on day one costs one hour. Not adding it and needing to break an API contract costs weeks of coordinated migration, consumer communication, deprecation notices, and running two implementations in parallel.',
        },
      ]} />

      <ToolCTA
        href="/json-error-explainer"
        title="Is Your API Returning Invalid JSON?"
        description="Paste any malformed JSON API response — our AI Error Explainer detects every syntax issue: trailing commas, unquoted keys, Python True/False/None, undefined/NaN, and more. Plain-English explanations + one-click fix."
        buttonText="Debug My API JSON →"
        color="emerald"
      />

      <FAQAccordion items={[
        {
          question: 'Should I use camelCase or snake_case in my JSON API?',
          answer: 'Use camelCase if your primary consumers are JavaScript/TypeScript clients — it matches the language native convention and requires no transformation. Use snake_case if your server and primary consumers are Python (matches Python\'s convention). The only wrong answer is mixing both. Once you ship, your consumers will depend on the exact property names — change them and you have a breaking change. Pick at the start and enforce it with a linter or serializer-level configuration.',
        },
        {
          question: 'What is the difference between 401 and 403?',
          answer: '401 Unauthorized means authentication failed — the request either has no token, or the token is invalid, expired, or malformed. The client should re-authenticate. 403 Forbidden means authentication succeeded — the server knows who you are — but you do not have permission to access this specific resource. The client should not re-authenticate; instead, the user needs different permissions. Using 401 when you mean 403 (or vice versa) confuses clients that implement automatic retry logic on 401.',
        },
        {
          question: 'Should I use cursor or offset pagination?',
          answer: 'Cursor pagination for almost everything in production. Offset pagination (LIMIT 20 OFFSET 1000) requires the database to scan and discard 1000 rows even if it returns only 20 — this gets catastrophically slow with large datasets. It also has the "shifting window" problem: if a new record is inserted while a client is paginating, records shift and the client either sees duplicates or skips records. Cursor pagination is index-efficient (WHERE id > last_seen_id) and immune to the shifting window bug. Use offset only when users need random-access page navigation (like Google search results).',
        },
        {
          question: 'What should my successful POST response look like?',
          answer: 'Return 201 Created with the complete created resource in the body — same shape as the GET response for that resource. Also set the Location header to the URL of the newly created resource: Location: /api/v1/users/usr_123. Some teams return 200 with the created object or 204 with no body — both work, but 201 with the full object is the most client-friendly because the client immediately has the canonical representation without a second GET request.',
        },
        {
          question: 'How do I handle boolean fields that do not exist yet in the database?',
          answer: 'Return null rather than omitting the field or defaulting to false. If a user record predates the isEmailVerified field, returning false is a lie — you have no information. Returning null is honest: "we have no value for this field." This is especially important for boolean fields used for access control — defaulting a missing permission field to false might accidentally lock out users, while defaulting to true might accidentally grant access.',
        },
        {
          question: 'What Content-Type header should my API always set?',
          answer: 'Always set Content-Type: application/json; charset=utf-8 on every response that contains a JSON body. This tells clients not to guess the format. For error responses, many APIs mistakenly return text/html (especially with Express default error handlers) — this breaks JSON clients catastrophically. Configure your error handler to always set application/json even for 500 responses. For responses with no body (204 No Content), omit the Content-Type header entirely.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
