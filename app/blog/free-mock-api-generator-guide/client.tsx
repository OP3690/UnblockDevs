'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FreeMockApiGeneratorGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Free Mock API Generator Guide — Build and Test APIs Without a Backend</h1>
      <p className="lead">
        Mock APIs let frontend developers build and test UIs without waiting for a real backend.
        They simulate API responses, handle different scenarios, and speed up development.
        This guide covers the best free mock API tools, how to use them effectively, and
        patterns for realistic fake data generation with Faker.js.
      </p>

      <StatGrid stats={[
        { value: 'Zero backend', label: 'required to start frontend development', color: 'green' },
        { value: 'JSON Server', label: 'most popular — full REST API from a JSON file', color: 'blue' },
        { value: 'MSW', label: 'best for React testing with service workers', color: 'purple' },
        { value: 'Faker.js', label: 'generate realistic fake data for any field', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Mock APIs?" />
      <QuickFact color="blue" label="The core benefit">
        Mock APIs eliminate the frontend/backend dependency during development. Instead of waiting
        for the backend team to build endpoints, frontend devs define the expected API shape and
        mock it immediately. This enables parallel development, faster iteration, and reliable
        testing without live API dependencies.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Parallel development', description: 'Frontend and backend teams work simultaneously. Frontend mocks the agreed API contract; backend implements it. No blocking, faster delivery.' },
        { title: 'Reliable testing', description: 'Tests that hit real APIs are flaky — network issues, rate limits, changing data. Mock APIs return predictable responses every time, making CI reliable.' },
        { title: 'Edge case simulation', description: 'Easily simulate error states (500, 401, timeout), empty states, large datasets, and pagination that are hard to reproduce with real APIs.' },
        { title: 'Offline development', description: 'Work without internet or VPN. Mock APIs run locally and don\'t depend on network connectivity, API uptime, or authentication.' },
        { title: 'Cost savings', description: 'Avoid burning API rate limits or incurring costs for paid APIs (Stripe, SendGrid, Twilio) during development and CI/CD test runs.' },
        { title: 'Contract-first development', description: 'Define the API shape first as the mock, then both teams implement against that contract. Reduces integration surprises at merge time.' },
      ]} />

      <SectionHeader number={2} title="Tool Comparison" />
      <CompareTable
        leftLabel="Tool"
        rightLabel="Best For"
        rows={[
          { label: 'JSON Server', left: 'Zero-config REST API from db.json', right: 'Quick prototypes, CRUD APIs, no code required — start in 30 seconds' },
          { label: 'MSW (Mock Service Worker)', left: 'Intercepts real fetch/axios calls in browser', right: 'React/Vue apps, Jest/Vitest testing, Storybook component isolation' },
          { label: 'Mockoon', left: 'Desktop GUI mock server application', right: 'Teams that prefer GUI over code, sharing mock configs as files' },
          { label: 'Mirage JS', left: 'In-browser API mocking with ORM', right: 'Ember/React apps with complex relational data needs' },
          { label: 'Postman Mock Server', left: 'Cloud-hosted mock from Postman collection', right: 'Teams already using Postman, sharing mocks across teams via URL' },
          { label: 'WireMock', left: 'Java-based mock server with powerful matching', right: 'Java/JVM projects, complex request matching, fault simulation' },
          { label: 'Faker.js', left: 'Fake data generation library (not a server)', right: 'Seeding JSON Server, generating test fixtures, Storybook stories' },
        ]}
      />

      <SectionHeader number={3} title="JSON Server — REST API in 30 Seconds" />
      <CodeBlock language="bash" filename="Setup JSON Server">
{`# Install
npm install -g json-server

# Create your mock database
cat > db.json << 'EOF'
{
  "users": [
    { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "role": "admin" },
    { "id": 2, "name": "Bob Smith", "email": "bob@example.com", "role": "user" }
  ],
  "posts": [
    { "id": 1, "title": "Hello World", "userId": 1, "published": true },
    { "id": 2, "title": "Mock APIs Rock", "userId": 2, "published": false }
  ],
  "comments": [
    { "id": 1, "postId": 1, "body": "Great post!", "userId": 2 }
  ]
}
EOF

# Start server — full REST API available instantly!
json-server --watch db.json --port 3001

# Now you have:
# GET    /users          → list all users
# GET    /users/1        → get user by id
# POST   /users          → create user (auto-assigns id)
# PUT    /users/1        → replace user
# PATCH  /users/1        → partial update
# DELETE /users/1        → delete user
# GET    /posts?userId=1 → filter by field
# GET    /users?_sort=name&_order=asc  → sort
# GET    /users?_page=1&_limit=10      → pagination
# GET    /posts?_expand=user           → include related user
# GET    /users/1/posts                → nested resources`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="JSON Server with custom routes and middleware">
{`// json-server-config.js — custom routes + middleware
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add custom middleware for auth simulation
server.use((req, res, next) => {
  if (req.headers.authorization !== 'Bearer mock-token') {
    // Allow GET requests without auth
    if (req.method !== 'GET') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  next();
});

// Custom route rewrites
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',           // /api/users → /users
    '/v1/users/:id': '/users/:id',
  })
);

// Simulate delay for all requests (realistic latency)
server.use((req, res, next) => {
  setTimeout(next, 300 + Math.random() * 200);  // 300-500ms delay
});

server.use(middlewares);
server.use(router);
server.listen(3001, () => console.log('Mock API running on port 3001'));

// Run with: node json-server-config.js`}
      </CodeBlock>

      <SectionHeader number={4} title="MSW — Mock Service Worker for React" />
      <CodeBlock language="typescript" filename="MSW Setup for React + Jest">
{`// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  // Mock GET /api/users
  http.get('/api/users', async () => {
    await delay(200);  // realistic latency
    return HttpResponse.json([
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
    ]);
  }),

  // Mock POST /api/users with request body access
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string; email: string };
    return HttpResponse.json(
      { id: Math.floor(Math.random() * 1000), ...body, role: 'user' },
      { status: 201 }
    );
  }),

  // Simulate 404 for specific IDs
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '999') {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return HttpResponse.json({ id: params.id, name: 'Test User', role: 'user' });
  }),

  // Simulate server error
  http.delete('/api/users/:id', ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({ error: 'Cannot delete admin' }, { status: 403 });
    }
    return new HttpResponse(null, { status: 204 });
  }),
];

// src/mocks/browser.ts (for development)
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
export const worker = setupWorker(...handlers);

// src/main.tsx — only activate in development
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'warn' });
}

// In Jest tests (setupTests.ts)
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Override handlers per test for specific scenarios:
test('handles 500 error', () => {
  server.use(
    http.get('/api/users', () =>
      HttpResponse.json({ error: 'Server Error' }, { status: 500 })
    )
  );
  // ... test error handling
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Generating Realistic Fake Data with Faker.js" />
      <CodeBlock language="javascript" filename="Faker.js for realistic mock data">
{`import { faker } from '@faker-js/faker';

// Generate realistic user data
function generateUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    username: faker.internet.username(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
    },
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    isActive: faker.datatype.boolean({ probability: 0.85 }),
  };
}

// Generate realistic product data
function generateProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    inStock: faker.datatype.boolean({ probability: 0.9 }),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),  // 3.0–5.0
    reviewCount: faker.number.int({ min: 0, max: 2000 }),
    images: Array.from({ length: 3 }, () => faker.image.url()),
  };
}

// Seed for reproducible data (same seed = same data across runs)
faker.seed(12345);
const reproducibleUser = generateUser(); // Always the same user

// Generate bulk data for db.json seeding
const dbSeed = {
  users: Array.from({ length: 50 }, generateUser),
  products: Array.from({ length: 200 }, generateProduct),
};

// Write to db.json for JSON Server
import fs from 'fs';
fs.writeFileSync('db.json', JSON.stringify(dbSeed, null, 2));
console.log('Seeded db.json with', dbSeed.users.length, 'users and', dbSeed.products.length, 'products');`}
      </CodeBlock>

      <SectionHeader number={6} title="Setting Up a Complete Mock API Workflow" />
      <VerticalSteps steps={[
        { title: 'Define your API contract', desc: 'Before writing any mock code, document the endpoint paths, request/response shapes, and error codes in a shared spec (OpenAPI/Swagger or a simple TypeScript interface file). This becomes the source of truth for both the mock and the real implementation.' },
        { title: 'Generate seed data with Faker.js', desc: 'Create a seed script that generates realistic data: 50+ users, 200+ products, with real-looking names, emails, and prices. Run it to populate db.json. Realistic data surfaces UI bugs that placeholder text hides (long names, special characters, edge cases).' },
        { title: 'Start JSON Server for rapid prototyping', desc: 'Run json-server --watch db.json --port 3001 during development. Your entire React/Vue/Angular app can immediately CRUD data. No backend required. Add a custom middleware file for auth simulation and artificial delays.' },
        { title: 'Add MSW for component and integration tests', desc: 'Set up MSW handlers that mirror your JSON Server routes. In tests, override specific handlers to simulate errors, empty states, and edge cases. This gives you test coverage of every UI state without hitting a real network.' },
        { title: 'Simulate all error states', desc: 'Explicitly test: 401 (logged out), 403 (no permission), 404 (not found), 422 (validation error), 500 (server down), network timeout. Use MSW\'s server.use() in individual tests to inject these states. Your error UI is only as good as your error testing.' },
        { title: 'Transition to real API', desc: 'When the real backend is ready, remove the MSW handlers and JSON Server. Since you used real endpoint paths throughout, your app transitions with zero code changes. Run the same test suite against the staging API to catch contract mismatches early.' },
      ]} />

      <AlertBox type="tip" title="Use Unblockdevs Mock API Generator">
        Our tool at unblockdevs.com/mock-api-generator lets you define a JSON schema and instantly
        generates realistic fake API endpoints with pagination, filtering, and error simulation —
        no setup required. Paste your TypeScript interface and get a live API URL in seconds.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between JSON Server and MSW?',
          answer: 'JSON Server runs as a separate process — a real HTTP server on localhost:3001. Your app makes actual HTTP requests across the network. MSW intercepts requests at the service worker or Node.js level, inside your app\'s process — no separate server, no network calls. MSW is better for unit/integration testing (faster, no port conflicts, works offline in CI). JSON Server is better for quickly sharing a mock API with your team or mobile apps that can\'t use service workers.',
        },
        {
          question: 'How do I mock API delays to simulate real network conditions?',
          answer: 'In MSW: import { delay } from "msw" and call await delay(1000) inside your handler before returning a response. In JSON Server: use the --delay 1000 flag when starting. For variable delays: await delay(Math.random() * 500 + 200). This simulates network latency and helps you build proper loading states, skeleton UIs, and timeout handling that actually works in production.',
        },
        {
          question: 'Can I use mock APIs in production?',
          answer: 'No — mock APIs are for development and testing only. Never ship MSW handlers or JSON Server to production. Use environment variables (process.env.NODE_ENV === "development") to ensure mock handlers are only active during development and testing. MSW handlers add to bundle size — use code splitting or dynamic imports to exclude them from production builds.',
        },
        {
          question: 'How do I transition from mock API to real API?',
          answer: 'If you use MSW correctly (with real endpoint paths like /api/users, not /mock/users), you simply stop activating the worker in production. Your fetch and axios calls already target the real paths. Remove the await worker.start() call from your production initialization and all requests go to the real API. Run your existing MSW-based tests against a staging environment to verify the real API matches the contract.',
        },
        {
          question: 'How do I handle authentication in mock APIs?',
          answer: 'For JSON Server: add custom middleware that checks a mock Authorization header (Bearer mock-token) and returns 401 for protected routes. For MSW: add a handler that checks request.headers.get("Authorization") and returns 401 responses. Hardcode accepted tokens in development (mock-token, test-admin-token). Never use real tokens in mocks — they\'d expose credentials in source code.',
        },
        {
          question: 'What is Mockoon and when should I use it instead of JSON Server?',
          answer: 'Mockoon is a desktop GUI application for creating and managing mock servers without writing code. It\'s better than JSON Server when: your team includes non-developers who need to define mocks, you need to share mock configurations as files between team members, you want complex request matching (regex URL patterns, specific headers), or you need response templating. Mockoon\'s exported configs can be version-controlled alongside code.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
