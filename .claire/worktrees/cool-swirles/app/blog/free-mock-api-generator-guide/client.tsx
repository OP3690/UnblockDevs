'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function FreeMockApiGeneratorClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Free Mock API Generator Guide: Build Frontend Apps Without a Backend (2026)</h1>
      <p className="lead">
        Waiting for the backend team slows every frontend developer down. Mock APIs let you build, test,
        and demo your UI against realistic endpoints right now — no server, no signup, no cost.
        This complete guide covers what mock APIs are, when to use them, and exactly how to create
        production-quality fakes in seconds.
      </p>

      <StatGrid stats={[
        { value: '100%', label: 'Free — no signup required', color: 'green' },
        { value: '0ms', label: 'Setup time for a mock endpoint', color: 'blue' },
        { value: '5+', label: 'Common use cases covered', color: 'purple' },
        { value: '4', label: 'Popular tools compared', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Mock API?" />

      <p>
        A <strong>mock API</strong> is a fake HTTP endpoint that returns a pre-configured JSON response
        without executing real business logic or touching a database. When your frontend calls
        <code>GET /api/products</code>, the mock server intercepts the request and returns
        whatever JSON you define — immediately, with configurable delay, and with any HTTP status code.
      </p>

      <QuickFact>Mock APIs are also called "stub APIs", "fake endpoints", or "API mocks". They all mean the same thing: a simulated server that returns controlled responses.</QuickFact>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Frontend Development',
          description: 'Build the complete UI before the real backend is written, shipped, or even designed.',
        },
        {
          title: 'Automated Testing',
          description: 'Unit and integration tests run deterministically when responses are controlled.',
        },
        {
          title: 'Demos and Prototypes',
          description: 'Show investors or clients a working product without real infrastructure.',
        },
        {
          title: 'Edge Case Testing',
          description: 'Simulate 401, 404, 429, 500, empty arrays, and null fields on demand.',
        },
        {
          title: 'Team Parallelism',
          description: 'Frontend and backend teams work in parallel based on a shared API contract.',
        },
        {
          title: 'Learning API Integration',
          description: 'Students practice fetch(), error handling, and pagination without spinning up servers.',
        },
      ]} />

      <SectionHeader number={2} title="Use Case 1 — Authentication Flow" />

      <p>
        Authentication is usually the first feature blocked by backend readiness. With a mock API you can
        build and test the entire login/logout UI flow immediately.
      </p>

      <CodeBlock language="json" filename="mock-login-response.json">
{`// POST /api/auth/login  →  200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token",
  "user": {
    "id": 42,
    "email": "user@example.com",
    "name": "Jane Dev",
    "role": "admin"
  },
  "expiresIn": 3600
}

// POST /api/auth/login  →  401 Unauthorized (wrong credentials)
{
  "success": false,
  "error": "Invalid email or password",
  "status": 401
}`}
      </CodeBlock>

      <CodeBlock language="js" filename="use-mock-login.js">
{`// Your frontend code — works identically with mock or real API
async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error ?? 'Login failed');

  localStorage.setItem('token', data.token);
  return data.user;
}`}
      </CodeBlock>

      <AlertBox type="tip" title="Swap URLs without changing logic">
        Store the base URL in an environment variable (<code>NEXT_PUBLIC_API_URL</code>). Switch from mock
        to production by changing a single env var — zero code changes required.
      </AlertBox>

      <SectionHeader number={3} title="Use Case 2 — Paginated Product List" />

      <p>
        Pagination logic is tedious to test against a real API. A mock lets you control exactly how many
        items are on each page and what the metadata looks like.
      </p>

      <CodeBlock language="json" filename="mock-products-response.json">
{`// GET /api/products?page=1&limit=10  →  200 OK
{
  "data": [
    { "id": 1,  "name": "Wireless Mouse",  "price": 25.99,  "category": "Electronics", "inStock": true },
    { "id": 2,  "name": "Mechanical Keyboard", "price": 89.00, "category": "Electronics", "inStock": true },
    { "id": 3,  "name": "USB-C Hub",       "price": 34.50,  "category": "Electronics", "inStock": false }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Use Case 3 — Search Endpoint" />

      <CodeBlock language="json" filename="mock-search-response.json">
{`// GET /api/search?q=laptop&category=electronics  →  200 OK
{
  "query": "laptop",
  "category": "electronics",
  "results": [
    { "id": 10, "name": "Gaming Laptop Pro", "price": 1299.99, "rating": 4.7, "reviews": 348 },
    { "id": 11, "name": "Ultrabook Slim",    "price": 999.00,  "rating": 4.5, "reviews": 212 }
  ],
  "meta": {
    "total": 2,
    "took": 12,
    "page": 1
  }
}

// GET /api/search?q=xyz  →  200 OK (empty results)
{
  "query": "xyz",
  "results": [],
  "meta": { "total": 0, "took": 3, "page": 1 }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Use Case 4 — Error Scenarios" />

      <p>
        Most developers only test the happy path. Mock APIs make it trivial to test error states your
        UI must handle gracefully.
      </p>

      <ErrorFix
        badLabel="Only testing success (leaves bugs in error handling)"
        bad={`// Never tested what happens on 500 or network failure
const res = await fetch('/api/orders');
const orders = await res.json();
setOrders(orders.data); // crashes if data is undefined`}
        goodLabel="Testing all scenarios with mock responses"
        good={`// Mock 500 response: { "error": "Database unavailable", "status": 500 }
// Mock 429 response: { "error": "Rate limit exceeded", "retryAfter": 60 }
// Mock empty: { "data": [], "pagination": { "total": 0 } }

const res = await fetch('/api/orders');
if (!res.ok) {
  const err = await res.json();
  setError(err.error ?? \`Error \${res.status}\`);
  return;
}
const { data } = await res.json();
setOrders(data ?? []); // handles empty gracefully`}
      />

      <KeyPointsGrid columns={3} items={[
        { title: '401 Unauthorized', description: 'Test session expiry and redirect-to-login flow.' },
        { title: '403 Forbidden', description: 'Verify permission-based UI hiding works correctly.' },
        { title: '404 Not Found', description: 'Test "resource deleted" states and empty screens.' },
        { title: '429 Rate Limited', description: 'Test retry logic and user-facing rate-limit messages.' },
        { title: '500 Server Error', description: 'Test fallback UI and error reporting integration.' },
        { title: 'Slow response (2s)', description: 'Test loading spinners, skeleton screens, and timeouts.' },
      ]} />

      <SectionHeader number={6} title="Use Case 5 — File Upload Mock" />

      <CodeBlock language="json" filename="mock-upload-response.json">
{`// POST /api/upload  →  200 OK
{
  "success": true,
  "file": {
    "id": "f_abc123",
    "name": "profile.jpg",
    "size": 245760,
    "mimeType": "image/jpeg",
    "url": "https://cdn.example.com/uploads/profile.jpg",
    "uploadedAt": "2026-03-25T10:30:00Z"
  }
}

// POST /api/upload  →  413 Payload Too Large
{
  "error": "File exceeds maximum size of 5MB",
  "status": 413,
  "maxSize": 5242880
}`}
      </CodeBlock>

      <SectionHeader number={7} title="How to Use the Mock API Generator (Step by Step)" />

      <VerticalSteps steps={[
        {
          title: 'Open the Mock API Generator',
          description: 'Go to unblockdevs.com → Mock API Generator. No signup or installation needed.',
        },
        {
          title: 'Define the endpoint',
          description: 'Select the HTTP method (GET/POST/PUT/DELETE/PATCH), and enter the path like /api/users or /api/orders/:id.',
        },
        {
          title: 'Paste your JSON response body',
          description: 'Type or paste the JSON you want the endpoint to return. The generator validates and formats it automatically.',
        },
        {
          title: 'Set the HTTP status code',
          description: 'Choose 200, 201, 400, 401, 404, 500, or any other valid status code.',
          code: '// Common status codes\n200  OK\n201  Created\n400  Bad Request\n401  Unauthorized\n404  Not Found\n500  Internal Server Error',
        },
        {
          title: 'Configure response delay (optional)',
          description: 'Add a delay (0–5000ms) to simulate real network latency. Useful for testing loading states.',
        },
        {
          title: 'Copy and integrate',
          description: 'Copy the generated code snippet (fetch, axios, or MSW handler) and drop it into your project.',
        },
      ]} />

      <SectionHeader number={8} title="Tool Comparison" />

      <CompareTable
        leftLabel="UnblockDevs (Free)"
        rightLabel="Alternatives"
        rows={[
          { label: 'Cost', left: '100% free forever', right: 'Postman: free tier limited; Mockoon: free desktop' },
          { label: 'Signup required', left: 'No', right: 'Postman: yes; Mockoon: no' },
          { label: 'Privacy', left: 'Client-side only — data never leaves browser', right: 'Postman: cloud-based; Mockoon: local' },
          { label: 'Setup time', left: 'Seconds — paste JSON and go', right: 'Minutes to hours for full setup' },
          { label: 'Response delay', left: 'Configurable 0–5000ms', right: 'All support delay simulation' },
          { label: 'Status code control', left: 'Any valid HTTP status', right: 'All support custom status codes' },
          { label: 'Pagination support', left: 'Built-in pagination templates', right: 'Varies by tool' },
          { label: 'Export formats', left: 'fetch, axios, MSW, cURL', right: 'Varies by tool' },
        ]}
      />

      <SectionHeader number={9} title="Integrating Mocks with MSW (Mock Service Worker)" />

      <p>
        For longer-running projects, <strong>Mock Service Worker (MSW)</strong> is the gold standard.
        It intercepts fetch/XHR at the Service Worker level so your production code is completely unchanged.
      </p>

      <CodeBlock language="ts" filename="src/mocks/handlers.ts">
{`import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock GET /api/products
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);

    return HttpResponse.json({
      data: generateProducts(10),
      pagination: { page, limit: 10, total: 47, totalPages: 5 },
    });
  }),

  // Mock POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    if (body.password !== 'correct') {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: { id: 1, email: body.email, name: 'Mock User' },
    });
  }),
];`}
      </CodeBlock>

      <CodeBlock language="ts" filename="src/mocks/browser.ts">
{`import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// In your app entry point (main.tsx / index.tsx):
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('./mocks/browser');
//   await worker.start();
// }`}
      </CodeBlock>

      <SectionHeader number={10} title="Architecture: Mock API Request Flow" />

      <ArchDiagram
        boxes={[
          { label: 'Frontend (React/Vue/etc)', color: 'blue' },
          { label: 'Mock Interceptor (MSW / local handler)', color: 'amber' },
          { label: 'Mock Response JSON', color: 'green' },
          { label: 'UI renders with fake data', color: 'green' },
        ]}
        arrows={['→', '→', '→']}
      />

      <FlowDiagram steps={[
        { label: 'Define API contract', color: 'blue' },
        { label: 'Generate mock responses', color: 'amber' },
        { label: 'Build frontend UI', color: 'blue' },
        { label: 'Backend ships real API', color: 'green' },
        { label: 'Swap mock URL → done', color: 'green' },
      ]} />

      <SectionHeader number={11} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What is the difference between a mock API and a real API?',
          answer: 'A real API connects to a database, runs business logic, and returns live data. A mock API returns a pre-configured static JSON response. Mocks are identical from the HTTP client perspective — same URL structure, headers, and status codes — so you can swap them for real endpoints without changing frontend code.',
        },
        {
          question: 'Is it safe to use a free mock API generator for sensitive data?',
          answer: 'UnblockDevs processes everything client-side in your browser. No data is sent to any server. Never use real user data in mock responses — use realistic fake data (fake names, test emails, generated IDs) instead. This is best practice even on local tools.',
        },
        {
          question: 'How do I simulate a slow API response to test loading states?',
          answer: 'Use the "Response Delay" field in the Mock API Generator and set it to 1000–2000ms to mimic a real network call. This lets you verify that your loading spinners, skeleton screens, and timeout logic work correctly before connecting to the real backend.',
        },
        {
          question: 'Can I use a mock API in automated tests (Jest, Vitest, Playwright)?',
          answer: 'Yes. MSW (Mock Service Worker) is the best approach for test environments — it works in Node.js (for Jest/Vitest) and in the browser (for Playwright/Cypress). For simple unit tests, you can also use jest.fn() or vi.fn() to mock the fetch function directly.',
        },
        {
          question: 'When should I stop using mocks and switch to the real API?',
          answer: 'Switch to the real API as soon as the backend endpoint is stable and returns the same schema your mock defined. Run both in parallel during integration testing — your frontend should work identically with mock or real data if the API contract was respected.',
        },
        {
          question: 'Do mock APIs work with GraphQL?',
          answer: 'Yes. You can mock GraphQL by returning a JSON body that matches the expected query shape, or use MSW\'s graphql.query() handler to match specific operation names and variables. The UnblockDevs generator supports any JSON response body, including GraphQL data envelopes.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
