'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FreeMockApiGeneratorGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Free Mock API Generator Guide — Build and Test APIs Without a Backend</h1>
      <p className="lead">
        Mock APIs let frontend developers build and test UIs without waiting for a real backend.
        They simulate API responses, handle different scenarios, and speed up development.
        This guide covers the best free mock API tools and how to use them effectively.
      </p>

      <StatGrid stats={[
        { value: 'Zero backend', label: 'required to start frontend development', color: 'green' },
        { value: 'JSON Server', label: 'most popular — full REST API from a JSON file', color: 'blue' },
        { value: 'MSW', label: 'best for React testing with service workers', color: 'purple' },
        { value: 'Faker.js', label: 'generate realistic fake data for any field', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Mock APIs?" />
      <QuickFact>
        Mock APIs eliminate the frontend/backend dependency during development. Instead of waiting
        for the backend team to build endpoints, frontend devs define the expected API shape and
        mock it immediately. This enables parallel development, faster iteration, and reliable
        testing without live API dependencies.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Parallel development', description: 'Frontend and backend teams work simultaneously. Frontend mocks the agreed API contract; backend implements it. No blocking.' },
        { title: 'Reliable testing', description: 'Tests that hit real APIs are flaky — network issues, rate limits, changing data. Mock APIs return predictable responses every time.' },
        { title: 'Edge case simulation', description: 'Easily simulate error states (500, 401, timeout), empty states, and large datasets that are hard to reproduce with real APIs.' },
        { title: 'Offline development', description: 'Work without internet or VPN. Mock APIs run locally and don\'t depend on network connectivity or API availability.' },
      ]} />

      <SectionHeader number={2} title="Tool Comparison" />
      <CompareTable
        leftLabel="Tool"
        rightLabel="Best For"
        rows={[
          { label: 'JSON Server', left: 'Zero-config REST API from db.json', right: 'Quick prototypes, CRUD APIs, no code required' },
          { label: 'MSW (Mock Service Worker)', left: 'Intercepts real fetch/axios calls', right: 'React/Vue apps, Jest testing, Storybook' },
          { label: 'Mockoon', left: 'Desktop GUI mock server', right: 'Teams that prefer GUI over code' },
          { label: 'Mirage JS', left: 'In-browser API mocking', right: 'Ember/React with full route handlers' },
          { label: 'Postman Mock Server', left: 'Cloud-hosted mock from Postman collection', right: 'Teams already using Postman' },
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
  ]
}
EOF

# Start server — full REST API available instantly!
json-server --watch db.json --port 3001

# Now you have:
# GET    /users          → list all users
# GET    /users/1        → get user by id
# POST   /users          → create user
# PUT    /users/1        → update user
# DELETE /users/1        → delete user
# GET    /posts?userId=1 → filter by field
# GET    /users?_sort=name&_order=asc  → sort
# GET    /users?_page=1&_limit=10      → pagination`}
      </CodeBlock>

      <SectionHeader number={4} title="MSW — Mock Service Worker for React" />
      <CodeBlock language="typescript" filename="MSW Setup for React + Jest">
{`// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ]);
  }),

  // Mock POST /api/users with request body access
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string; email: string };
    return HttpResponse.json(
      { id: 3, ...body },
      { status: 201 }
    );
  }),

  // Simulate error state
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '999') {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return HttpResponse.json({ id: params.id, name: 'Test User' });
  }),
];

// src/mocks/browser.ts (for development)
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
export const worker = setupWorker(...handlers);

// src/main.tsx
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

// In Jest tests (setupTests.ts)
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}
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
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    },
    createdAt: faker.date.past({ years: 2 }).toISOString(),
  };
}

// Generate 100 users
const users = Array.from({ length: 100 }, generateUser);

// Seed for reproducible data (same seed = same data)
faker.seed(12345);
const reproducibleUser = generateUser(); // Always the same

// Domain-specific data
const product = {
  name: faker.commerce.productName(),
  price: faker.commerce.price({ min: 10, max: 500 }),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
};`}
      </CodeBlock>

      <AlertBox type="tip" title="Use Unblockdevs Mock API Generator">
        Our tool at unblockdevs.com/mock-api-generator lets you define a JSON schema and instantly
        generates realistic fake API endpoints with pagination, filtering, and error simulation —
        no setup required.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between JSON Server and MSW?',
          answer: 'JSON Server runs as a separate process — a real HTTP server. Your app makes actual HTTP requests to localhost:3001. MSW intercepts requests at the service worker level — no separate process, works inside your app. MSW is better for testing (no network calls), JSON Server is better for quickly sharing a mock API with a team.',
        },
        {
          question: 'How do I mock API delays to simulate real network conditions?',
          answer: 'In MSW: use await delay(1000) inside your handler. In JSON Server: use --delay 1000 flag. This simulates network latency and helps you build proper loading states that work in production.',
        },
        {
          question: 'Can I use mock APIs in production?',
          answer: 'No — mock APIs are for development and testing only. Never ship MSW handlers or JSON Server to production. Use environment variables (process.env.NODE_ENV === "development") to ensure mock handlers are only active during development and testing.',
        },
        {
          question: 'How do I transition from mock API to real API?',
          answer: 'If you use MSW, simply remove the mock handlers — your app starts hitting the real API with no code changes. The mock API forces you to use the real endpoint paths and data shapes, so the transition is seamless. This is the main advantage of MSW over custom mock functions.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
