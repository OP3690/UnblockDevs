'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, CodeBlock, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function ApiPayloadSizeOptimizationClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>API Payload Size Optimization: Performance Best Practices</h1>
      <p className="lead">
        Large API payloads are one of the most common and preventable causes of slow web applications.
        Whether you are building a mobile app, a data-heavy dashboard, or a public REST API, reducing
        payload size directly translates to faster load times, lower server costs, and a better user
        experience. This guide covers every technique — from compression to field filtering to
        data format changes — with concrete code examples you can apply immediately.
      </p>

      <StatGrid stats={[
        { value: '70-90%', label: 'typical size reduction with gzip/brotli compression', color: 'green' },
        { value: 'Field filtering', label: 'return only what the client actually needs', color: 'blue' },
        { value: 'Pagination', label: 'never return unbounded arrays in a single response', color: 'purple' },
        { value: 'GraphQL', label: 'lets clients request exactly the fields they need', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Payload Size Matters" />
      <p>
        API payload size directly impacts every layer of your application stack. Large payloads
        increase network transfer time — especially on mobile networks where bandwidth is limited.
        They increase memory usage on client devices as the JSON is parsed and held in memory.
        They increase battery consumption on mobile devices. They slow down server processing
        for serialization and deserialization. They increase your bandwidth costs at scale.
      </p>
      <p>
        A 500KB API response on a 3G connection (typical 1 Mbps effective throughput) takes
        about 4 seconds to transfer before any rendering. The same response compressed with
        brotli drops to around 50KB and transfers in 0.4 seconds. Beyond transfer time,
        JSON parsing is CPU-intensive on mobile devices with slower processors, so cutting
        payload size reduces both battery consumption and time-to-interactive.
      </p>

      <QuickFact color="blue" label="The real cost of large payloads">
        At 1 million API calls per day with an average response size of 500KB vs 50KB (after compression),
        the bandwidth difference is 450GB per day. At typical cloud bandwidth pricing of $0.08/GB,
        that is $36/day or over $13,000/year in unnecessary bandwidth costs — on top of performance impact.
      </QuickFact>

      <SectionHeader number={2} title="Enable HTTP Compression" />
      <p>
        Compression is the single highest-ROI optimization. Enable gzip or brotli compression on
        your API server. Modern clients send an Accept-Encoding header indicating support, and
        your server responds with compressed content. The client decompresses automatically.
        This requires zero changes to your API logic — just server configuration.
      </p>
      <CodeBlock language="nginx" filename="nginx.conf">{`# nginx — enable brotli (preferred) and gzip fallback
brotli on;
brotli_comp_level 6;
brotli_types text/plain application/json application/javascript text/css;

gzip on;
gzip_comp_level 6;
gzip_min_length 1000;
gzip_types text/plain application/json application/javascript text/css;

# Verify compression is working:
# curl -H "Accept-Encoding: br" -I https://yourapi.com/endpoint
# Response should include: Content-Encoding: br`}</CodeBlock>

      <CodeBlock language="javascript" filename="server.js">{`const express = require('express');
const compression = require('compression');

const app = express();

// compression() automatically uses brotli if client supports it,
// falls back to gzip, then deflate
app.use(compression({
  level: 6,           // balance between speed and compression ratio
  threshold: 1024,    // only compress responses > 1KB
  filter: (req, res) => {
    // skip compression for Server-Sent Events
    if (req.headers['accept'] === 'text/event-stream') return false;
    return compression.filter(req, res);
  }
}));`}</CodeBlock>

      <CodeBlock language="python" filename="fastapi_app.py">{`# FastAPI with GZip middleware
from fastapi import FastAPI
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Django — enable GZip middleware in settings.py
MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]`}</CodeBlock>

      <CompareTable
        leftLabel="Before Compression"
        rightLabel="After Brotli Compression"
        rows={[
          { label: 'Typical JSON (100 users)', left: '~45 KB', right: '~6 KB (87% reduction)' },
          { label: 'Blog post list (50 posts)', left: '~120 KB', right: '~18 KB (85% reduction)' },
          { label: 'E-commerce product catalog', left: '~800 KB', right: '~95 KB (88% reduction)' },
          { label: 'Binary image data', left: 'No benefit', right: 'No benefit — already compressed' },
          { label: 'Server CPU overhead', left: 'N/A', right: 'Under 1ms per response (negligible)' },
          { label: 'Implementation effort', left: 'N/A', right: 'One-line config change' },
        ]}
      />

      <SectionHeader number={3} title="Implement Field Filtering (Sparse Fieldsets)" />
      <p>
        Most API endpoints return more fields than any single client needs. A mobile app may need
        only 3 of 20 user fields. A dashboard widget may need only totals, not individual records.
        Field filtering (also called sparse fieldsets) lets clients specify which fields to return.
        This pattern follows the JSON:API spec and is used by major APIs including Stripe and GitHub.
      </p>
      <CodeBlock language="javascript" filename="users-endpoint.js">{`// API endpoint: GET /users?fields=id,name,email
app.get('/users', async (req, res) => {
  const users = await db.users.findAll();

  if (req.query.fields) {
    const requestedFields = req.query.fields.split(',');
    const filtered = users.map(user => {
      const obj = {};
      requestedFields.forEach(field => {
        if (user[field] !== undefined) obj[field] = user[field];
      });
      return obj;
    });
    return res.json(filtered);
  }

  res.json(users);
});

// Before filtering:
// {"id":1,"name":"Alice","email":"alice@example.com","created_at":"...","updated_at":"...","role":"admin"}
// After ?fields=id,name,email:
// {"id":1,"name":"Alice","email":"alice@example.com"}
// Reduction: ~300 bytes to ~60 bytes per user record`}</CodeBlock>

      <CodeBlock language="typescript" filename="prisma-field-select.ts">{`// Push field selection to the database query — avoids over-fetching from DB
async function getUsers(requestedFields: string[]) {
  const allowedFields = ['id', 'name', 'email', 'createdAt', 'role'];

  const select = allowedFields.reduce((acc, field) => {
    acc[field] = requestedFields.includes(field) || requestedFields.length === 0;
    return acc;
  }, {} as Record<string, boolean>);

  select.id = true; // always include id

  return await prisma.user.findMany({ select });
}

// GET /users?fields=name,email
// SQL: SELECT id, name, email FROM users
// vs default: SELECT * FROM users (fetches 15 unnecessary columns)`}</CodeBlock>

      <SectionHeader number={4} title="Implement Pagination" />
      <p>
        Never return unbounded arrays. An endpoint that returns all users, all products, or all
        orders will fail catastrophically at scale — both in terms of payload size and database
        performance. Always paginate list endpoints. Cursor-based pagination is generally
        superior to offset pagination for large datasets because it maintains consistent
        performance as the dataset grows.
      </p>
      <CodeBlock language="javascript" filename="cursor-pagination.js">{`// Cursor-based pagination — better than offset pagination for large datasets
app.get('/posts', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100); // max 100
  const cursor = req.query.cursor; // base64-encoded last item id

  const where = cursor ? { id: { gt: decodeCursor(cursor) } } : {};

  const posts = await db.posts.findMany({
    where,
    take: limit + 1, // fetch one extra to check for next page
    orderBy: { id: 'asc' },
    select: { id: true, title: true, excerpt: true, createdAt: true },
  });

  const hasNextPage = posts.length > limit;
  const items = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor = hasNextPage
    ? encodeCursor(items[items.length - 1].id)
    : null;

  res.json({ items, pagination: { limit, nextCursor, hasNextPage } });
});`}</CodeBlock>

      <SectionHeader number={5} title="Remove Unnecessary Fields" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Audit your responses', description: 'Capture real API responses and analyze which fields are actually used by clients. Fields used nowhere can be removed entirely. Chrome DevTools Network tab and tools like Postman help inspect real response payloads.' },
        { title: 'Strip debug fields in production', description: 'Fields like debug_info, query_time, internal_id, and verbose_status should only appear in development. Remove them from production responses using environment-aware serialization.' },
        { title: 'Flatten nested objects when practical', description: 'Deeply nested JSON is verbose. { user: { address: { city: "NYC" } } } can become { user_city: "NYC" } if only one field is needed. Less nesting means less punctuation overhead in the JSON encoding.' },
        { title: 'Use IDs instead of embedded objects', description: 'Instead of embedding the full author object in every post, return author_id and let the client fetch author details separately or use a reference cache. This avoids repeating the same author data across 100 posts.' },
        { title: 'Remove null fields from responses', description: 'By default many serializers include null fields: { "phone": null, "avatar": null }. Omitting null fields can reduce response size by 15-30% for objects with many optional fields.' },
        { title: 'Shorten key names for high-volume internal APIs', description: 'JSON keys are repeated for every object in an array. In a list of 1,000 items, "created_at" vs "ca" saves 8 bytes per record — 8KB total. Worth considering for high-throughput internal APIs.' },
      ]} />

      <SectionHeader number={6} title="Consider Protocol Buffers or MessagePack" />
      <p>
        For high-performance APIs, binary serialization formats like Protocol Buffers (protobuf)
        or MessagePack can significantly reduce payload size compared to JSON — even before compression.
        JSON is text-based and includes field names in every record. Binary formats encode the schema
        separately and transmit only values.
      </p>
      <CodeBlock language="javascript" filename="msgpack-comparison.js">{`const msgpack = require('@msgpack/msgpack');

const data = {
  users: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: 'Alice',
    email: 'alice@example.com',
    active: true,
    score: 98.5,
  }))
};

const jsonBytes = Buffer.byteLength(JSON.stringify(data));
const msgpackBytes = msgpack.encode(data).length;

console.log('JSON size:', jsonBytes, 'bytes');          // ~6,800 bytes
console.log('MessagePack size:', msgpackBytes, 'bytes'); // ~3,400 bytes (50% smaller)

// After compression both formats converge (JSON compresses better from text)
// Use MessagePack when: high-frequency real-time APIs, binary data, mobile APIs`}</CodeBlock>

      <CodeBlock language="protobuf" filename="user.proto">{`// Protocol Buffers schema definition
syntax = "proto3";

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  bool active = 4;
  float score = 5;
}

message UserList {
  repeated User users = 1;
}

// Protobuf encoding of 100 users: ~2,100 bytes
// vs JSON: ~6,800 bytes (69% reduction before compression)
// Ideal for internal microservice communication`}</CodeBlock>

      <SectionHeader number={7} title="HTTP Caching to Eliminate Redundant Payloads" />
      <p>
        The most efficient payload is one that is never sent at all. HTTP caching allows clients to
        reuse previously fetched responses when data has not changed. For slow-moving data such as
        user profiles, configuration, and reference tables, caching can eliminate 80-95% of repeat
        API calls entirely by returning 304 Not Modified with no body.
      </p>
      <CodeBlock language="javascript" filename="etag-caching.js">{`// ETag-based caching — returns 304 Not Modified when data hasn't changed
app.get('/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);

  // Generate an ETag based on the data's last modified timestamp
  const etag = \`"\${user.updatedAt.getTime()}"\`;

  // Check if client already has this version
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // No body — zero payload bytes transferred
  }

  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'private, max-age=60');
  res.json(user);
});

// For public API responses that can be CDN-cached:
res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');

// For sensitive or frequently-changing data — no caching:
res.setHeader('Cache-Control', 'no-store');`}</CodeBlock>

      <SectionHeader number={8} title="Optimization Priority Order" />
      <VerticalSteps steps={[
        { title: 'Enable compression first (highest ROI)', desc: 'Gzip or brotli compression is a one-line config change that immediately reduces all JSON responses by 70-90%. This should be the first thing you do if not already enabled. Check with: curl -H "Accept-Encoding: gzip" -I https://yourapi.com/endpoint and look for Content-Encoding: gzip in the response headers.' },
        { title: 'Add pagination to list endpoints', desc: 'Any endpoint returning an array without a limit is a time bomb. Even 1,000 records in a response can be 500KB+. Add cursor or offset pagination with a maximum page size of 50-100 items. This also protects your database from expensive unbounded queries.' },
        { title: 'Remove null and empty fields', desc: 'Configure your JSON serializer to omit null values and empty arrays/objects. In Express, use a replacer function. In Django REST Framework, use a custom serializer mixin. This 15-30% reduction requires zero API contract changes.' },
        { title: 'Add field filtering for multi-client APIs', desc: 'If you have multiple clients (mobile app, web dashboard, partner integrations) all consuming the same endpoint, add ?fields= query parameter support. This is especially impactful for mobile where the app may need only 3 of 25 available fields.' },
        { title: 'Implement HTTP caching for stable data', desc: 'Add ETag or Last-Modified headers to responses. For data that changes rarely (user profiles, configuration, product details), returning 304 Not Modified eliminates the payload entirely. Even a 5-minute cache (max-age=300) dramatically reduces load for popular endpoints.' },
        { title: 'Consider GraphQL or protobuf for advanced cases', desc: 'If you have many different clients with wildly different data needs, GraphQL eliminates over-fetching by design. For internal microservice communication with high throughput, Protocol Buffers or MessagePack can further reduce payload sizes beyond what compression achieves.' },
      ]} />

      <AlertBox type="tip" title="Quick wins to tackle first">
        Start with these high-impact, low-effort optimizations: (1) Enable gzip/brotli compression
        if not already on — often a one-line config change. (2) Remove null fields from JSON responses.
        (3) Truncate long string fields with a max length option. (4) Add pagination to any endpoint
        returning more than 50 items. These four changes alone can reduce payload sizes by 60-80%
        in most applications.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the recommended maximum API response size?',
          answer: 'For REST APIs, aim for under 50KB uncompressed for single-resource endpoints and under 200KB for list endpoints. After compression these become roughly 5-20KB and 20-60KB respectively. If your response routinely exceeds 500KB uncompressed, pagination or field filtering is a priority. For real-time APIs (WebSocket, SSE), keep individual messages under 10KB.',
        },
        {
          question: 'Should I use gzip or brotli?',
          answer: 'Use brotli when your clients support it (all modern browsers do), with gzip as a fallback. Brotli achieves 15-25% better compression than gzip at the same quality level, especially for JSON and text. Most compression middleware (Express compression, nginx brotli module) handles the Accept-Encoding negotiation automatically.',
        },
        {
          question: 'What is the performance cost of server-side compression?',
          answer: 'Modern CPUs compress JSON very quickly. A 100KB JSON response takes under 1ms to compress at gzip level 6 on a modern server. The CPU cost of compression is almost always worth the bandwidth savings, especially when serving many clients over slower networks. Use streaming compression for very large responses to avoid buffering.',
        },
        {
          question: 'When should I use GraphQL instead of REST for payload optimization?',
          answer: 'Consider GraphQL when: you have many different clients needing different subsets of data, your REST endpoints are consistently returning large objects where clients use 20% of fields, or you have deeply nested data relationships. GraphQL\'s main payload benefit is that clients request exactly the fields they need — no over-fetching by design. The trade-off is added complexity on the server side.',
        },
        {
          question: 'How do I measure the actual payload size my API sends?',
          answer: 'In Chrome DevTools → Network tab, click any API request → Headers to see Content-Length (actual size) and Content-Encoding (compression). The "Size" column shows compressed size, "Content" column shows decompressed size. For backend measurement, log response.getHeader("content-length") after compression in your middleware.',
        },
        {
          question: 'How do I handle caching to further reduce payload overhead?',
          answer: 'Add ETag or Last-Modified headers to your responses. Clients can then send If-None-Match or If-Modified-Since on subsequent requests. If the data hasn\'t changed, return HTTP 304 Not Modified with no body — zero payload size. This is especially effective for slow-changing reference data (config, user profile, lookup tables).',
        },
        {
          question: 'What is cursor-based pagination and why is it better than offset?',
          answer: 'Offset pagination (page=2&limit=20) uses OFFSET in SQL which gets slower as offset increases — fetching page 500 requires the database to scan through 10,000 rows. Cursor-based pagination uses WHERE id > last_id which uses the index directly and is O(log n) regardless of depth. For datasets over 10,000 rows, cursor pagination is significantly faster and more consistent.',
        },
        {
          question: 'Should I use MessagePack or Protocol Buffers over JSON?',
          answer: 'Only in specific cases: (1) Internal microservice communication where both sides control the schema. (2) High-frequency real-time data (10,000+ messages per second). (3) When binary data is part of the payload. For public APIs, JSON with compression is almost always preferable because of tooling, debugging ease, and client compatibility. The marginal size benefit of binary formats mostly disappears after brotli compression.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
