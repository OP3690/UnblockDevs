'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps, FlowDiagram, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function ApiRateLimitingGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>API Rate Limiting Complete Guide 2026: Algorithms, Implementation &amp; 429 Handling</h1>
      <p className="lead">
        Every production API needs rate limiting. Without it, a single misbehaving client &mdash; a
        polling loop gone wrong, a DDoS attack, or a well-intentioned but aggressive integration &mdash;
        can take down your service for every other user. Rate limiting is both a safety mechanism and
        a fairness policy. This guide covers all four rate limiting algorithms (token bucket, leaky
        bucket, fixed window, sliding window), a production-ready Redis implementation in Node.js,
        the standard rate limit response headers every API should send, how to correctly handle 429
        errors as an API consumer with exponential backoff, and the design decisions that separate
        good rate limiting from frustrating rate limiting.
      </p>

      <StatGrid stats={[
        { value: '4',    label: 'rate limiting algorithms — each with different burst behavior and accuracy trade-offs', color: 'blue' },
        { value: '429',  label: 'HTTP status code for rate limit exceeded — always return JSON with Retry-After', color: 'amber' },
        { value: '<1ms', label: 'Redis sliding window check latency — rate limiting should never add perceptible overhead', color: 'green' },
        { value: '3x',   label: 'typical cost reduction when rate limiting prevents runaway client polling loops', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Definition: What Is API Rate Limiting?" />

      <QuickFact color="blue" label="Rate limiting = controlling how many requests a client can make in a time window">
        API rate limiting is the practice of restricting how many requests a client (identified by
        IP address, API key, user ID, or tenant) can make within a defined time window. When a client
        exceeds the limit, the server returns HTTP 429 Too Many Requests instead of processing the
        request. Rate limiting protects your infrastructure from overload, enforces fair usage across
        clients, enables usage-based billing tiers, and provides a first line of defense against
        DDoS attacks and abusive bots.
      </QuickFact>

      <SectionHeader number={2} title="When You Need Rate Limiting — and What to Limit" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'DDoS and abuse protection',
          description: 'A single malicious or malfunctioning client can send thousands of requests per second. Without rate limiting, this exhausts your connection pool, database connections, and CPU — causing a full service outage for all clients. Rate limiting at the IP level caps damage from any single source.',
        },
        {
          title: 'Fair usage across tenants',
          description: 'In a multi-tenant API, one high-traffic tenant can consume 95% of capacity and starve all other tenants. Per-tenant rate limits ensure every customer gets a predictable, fair share of capacity regardless of what others are doing.',
        },
        {
          title: 'Usage-based billing enforcement',
          description: 'Pricing tiers (Free: 1,000 req/day, Pro: 100,000 req/day, Enterprise: unlimited) are enforced by rate limiting. The rate limiter checks the client\'s plan and applies the corresponding limit, returning 429 with an upgrade prompt when exceeded.',
        },
        {
          title: 'Downstream API cost control',
          description: 'If your API proxies a paid upstream service (OpenAI, Stripe, SendGrid), each request costs you money. Rate limiting your clients prevents unexpected cost spikes from a single integration bug that sends 10,000 requests in a minute.',
        },
        {
          title: 'Bot and scraper mitigation',
          description: 'Aggressive scrapers can exhaust your API capacity and increase infrastructure costs significantly. Combined with bot detection, rate limiting slows scrapers enough to make them economically unviable while barely affecting legitimate users.',
        },
        {
          title: 'Protecting expensive endpoints specifically',
          description: 'Not all endpoints cost the same. A /search endpoint that runs a full-text query is 100x more expensive than /ping. Apply tighter limits to expensive endpoints independently — 10 search requests per second, 1000 health checks per second — rather than one global limit for everything.',
        },
      ]} />

      <SectionHeader number={3} title="How — The 4 Rate Limiting Algorithms Explained" />

      <CompareTable
        headers={['Algorithm', 'How It Works', 'Burst Handling', 'Accuracy', 'Best For']}
        rows={[
          ['Fixed Window',   'Count requests in fixed calendar windows (e.g., 0:00–0:59, 1:00–1:59). Reset counter at window boundary.',   '❌ "Window boundary burst" — 2x limit possible across boundary', '⚠️ Low — boundary artifacts', 'Simple quotas, daily limits, billing'],
          ['Sliding Window', 'Count requests in a rolling window relative to now (last 60 seconds, not this clock minute). No boundary.',    '✅ Smooth — no boundary burst',  '✅ High — accurate at all times', 'API rate limits, most production use cases'],
          ['Token Bucket',   'Bucket holds N tokens. Each request consumes 1. Tokens refill at a fixed rate. Burst up to bucket capacity.',  '✅ Allows controlled burst up to capacity', '✅ High — smooth refill', 'APIs with legitimate burst traffic (uploads, batch)'],
          ['Leaky Bucket',   'Requests enter a queue (the bucket). Queue drains at a fixed rate. Requests that overflow the queue are dropped.', '❌ No burst — strictly constant rate', '✅ Perfectly smooth output', 'Upstream systems that cannot handle bursts'],
        ]}
      />

      <FlowDiagram title="Sliding Window Rate Limit — Request Flow" steps={[
        { label: 'Request arrives',          desc: 'Client sends request. Identify by: API key, user_id, IP, or tenant_id. Build Redis key.', color: 'blue' },
        { label: 'Redis pipeline executes',  desc: 'Atomic: ZREMRANGEBYSCORE (remove old entries) → ZADD (record this request) → ZCARD (count in window) → EXPIRE (set TTL)', color: 'violet' },
        { label: 'Count check',              desc: 'If count <= limit: allow request, set X-RateLimit-Remaining header. If count > limit: return 429 immediately.', color: 'green' },
        { label: '200 or 429 response',      desc: '200: process normally with rate limit headers. 429: JSON error body + Retry-After header + X-RateLimit-Reset.', color: 'amber' },
        { label: 'Client handles response',  desc: 'Success: continue. 429: read Retry-After, wait the specified seconds, retry. Never retry immediately on 429.', color: 'blue' },
      ]} />

      <SectionHeader number={4} title="How — Node.js + Redis Production Implementation" />

      <CodeBlock language="javascript" filename="rate-limiter.js — sliding window with Redis (production-ready)">
{`import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// ── Sliding window rate limiter ────────────────────────────────────────────
async function slidingWindowLimit({ key, limit, windowSeconds }) {
  const now          = Date.now();
  const windowStart  = now - windowSeconds * 1000;
  const requestId    = now + '-' + Math.random().toString(36).slice(2);

  // Atomic pipeline — all operations execute together, no race conditions
  const [,, count] = await redis
    .multi()
    .zRemRangeByScore(key, 0, windowStart)          // remove requests older than window
    .zAdd(key, { score: now, value: requestId })    // record this request
    .zCard(key)                                      // count requests in window
    .expire(key, windowSeconds)                      // auto-expire the key
    .exec();

  const remaining = Math.max(0, limit - count);
  const resetAt   = new Date(now + windowSeconds * 1000).toISOString();

  return { allowed: count <= limit, count, remaining, limit, resetAt };
}

// ── Express middleware ─────────────────────────────────────────────────────
function createRateLimiter({ limit = 100, windowSeconds = 60, keyFn } = {}) {
  return async (req, res, next) => {
    // Default: rate limit by API key, fall back to IP
    const identifier = keyFn
      ? keyFn(req)
      : req.headers['x-api-key'] || req.ip;

    const key    = 'rl:' + identifier + ':' + Math.floor(Date.now() / (windowSeconds * 1000));
    const result = await slidingWindowLimit({ key, limit, windowSeconds });

    // Always set rate limit headers — even on success
    res.set({
      'X-RateLimit-Limit':     limit,
      'X-RateLimit-Remaining': result.remaining,
      'X-RateLimit-Reset':     result.resetAt,
      'X-RateLimit-Policy':    limit + ';w=' + windowSeconds,
    });

    if (!result.allowed) {
      const retryAfter = Math.ceil(windowSeconds - (Date.now() % (windowSeconds * 1000)) / 1000);
      res.set('Retry-After', retryAfter);

      return res.status(429).json({
        error: {
          code:    'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please slow down and retry after ' + retryAfter + ' seconds.',
          retryAfter,
          limit,
          resetAt: result.resetAt,
        },
      });
    }

    next();
  };
}

// ── Usage — apply globally and per-endpoint ────────────────────────────────
const globalLimit  = createRateLimiter({ limit: 1000, windowSeconds: 60 });
const searchLimit  = createRateLimiter({ limit: 10,   windowSeconds: 60 });   // expensive endpoint
const uploadLimit  = createRateLimiter({ limit: 5,    windowSeconds: 3600 }); // per hour

app.use(globalLimit);                         // 1000 req/min for all endpoints
app.get('/api/search', searchLimit, handler); // tighter: 10 searches/min
app.post('/api/upload', uploadLimit, handler);// very tight: 5 uploads/hour`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="token-bucket.js — in-memory token bucket for single-server use">
{`// Token bucket — best for allowing controlled bursts
class TokenBucket {
  constructor({ capacity, refillRate }) {
    this.capacity   = capacity;   // max tokens (burst size)
    this.refillRate = refillRate; // tokens added per second
    this.tokens     = capacity;   // start full
    this.lastRefill = Date.now();
  }

  consume(count = 1) {
    this.#refill();

    if (this.tokens >= count) {
      this.tokens -= count;
      return { allowed: true, remaining: Math.floor(this.tokens) };
    }

    return {
      allowed:   false,
      remaining: 0,
      waitMs:    Math.ceil(((count - this.tokens) / this.refillRate) * 1000),
    };
  }

  #refill() {
    const now     = Date.now();
    const elapsed = (now - this.lastRefill) / 1000; // seconds
    this.tokens   = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

// Example: 20 req burst allowed, refills at 5 req/sec (300 req/min steady state)
const bucket = new TokenBucket({ capacity: 20, refillRate: 5 });

// Middleware usage
function tokenBucketMiddleware(req, res, next) {
  const result = bucket.consume(1);
  if (!result.allowed) {
    res.set('Retry-After', Math.ceil(result.waitMs / 1000));
    return res.status(429).json({ error: { code: 'RATE_LIMIT_EXCEEDED', waitMs: result.waitMs } });
  }
  res.set('X-RateLimit-Remaining', result.remaining);
  next();
}`}
      </CodeBlock>

      <SectionHeader number={5} title="How — Standard Rate Limit Response Headers" />

      <CodeBlock language="text" filename="Rate limit headers — what every API should return on every response">
{`// ── On every successful response (not just 429) ───────────────────────────
HTTP/1.1 200 OK
X-RateLimit-Limit:     100          // max requests allowed in the window
X-RateLimit-Remaining: 73           // requests remaining before limit is hit
X-RateLimit-Reset:     2026-05-15T10:01:00Z  // ISO timestamp when window resets
X-RateLimit-Policy:    100;w=60     // IETF draft: 100 requests per 60 seconds

// ── On 429 Too Many Requests ───────────────────────────────────────────────
HTTP/1.1 429 Too Many Requests
Retry-After:           12           // seconds until client can retry (REQUIRED on 429)
X-RateLimit-Limit:     100
X-RateLimit-Remaining: 0
X-RateLimit-Reset:     2026-05-15T10:01:00Z

Content-Type: application/json

{
  "error": {
    "code":        "RATE_LIMIT_EXCEEDED",
    "message":     "Rate limit of 100 requests per 60 seconds exceeded. Retry after 12 seconds.",
    "retryAfter":  12,
    "limit":       100,
    "resetAt":     "2026-05-15T10:01:00Z",
    "docsUrl":     "https://docs.myapi.com/rate-limits"
  }
}

// ── Retry-After formats (HTTP spec accepts both) ────────────────────────────
Retry-After: 60                          // integer seconds (simpler, recommended)
Retry-After: Wed, 15 May 2026 10:01:00 GMT  // HTTP date format`}
      </CodeBlock>

      <SectionHeader number={6} title="How — Handle 429 Correctly as an API Consumer" />

      <CodeBlock language="javascript" filename="retry-with-backoff.js — exponential backoff with jitter for 429">
{`// ── Exponential backoff with jitter — the correct 429 handler ─────────────
async function fetchWithRetry(url, options = {}, maxRetries = 4) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, options);

    // Success — return immediately
    if (res.status !== 429) return res;

    // Final attempt — throw instead of waiting pointlessly
    if (attempt === maxRetries) {
      throw new Error('Rate limit exceeded after ' + maxRetries + ' retries');
    }

    // Read Retry-After header (always prefer server-specified wait time)
    const retryAfterHeader = res.headers.get('Retry-After');
    let delayMs;

    if (retryAfterHeader) {
      delayMs = parseInt(retryAfterHeader, 10) * 1000;
    } else {
      // Exponential backoff: 1s, 2s, 4s, 8s ... capped at 60s
      // Jitter: ±30% randomness prevents "thundering herd" — all clients retrying in sync
      const base  = Math.min(1000 * Math.pow(2, attempt), 60_000);
      const jitter = base * 0.3 * (Math.random() * 2 - 1);
      delayMs = Math.round(base + jitter);
    }

    console.warn('Rate limited. Waiting ' + delayMs + 'ms before retry ' + (attempt + 1) + ' of ' + maxRetries);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

// ── Queue-based rate limit aware client ────────────────────────────────────
class RateLimitedClient {
  constructor({ requestsPerSecond = 10 }) {
    this.minInterval   = 1000 / requestsPerSecond;
    this.lastRequestAt = 0;
    this.queue         = [];
    this.processing    = false;
  }

  async fetch(url, options) {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, options, resolve, reject });
      if (!this.processing) this.#processQueue();
    });
  }

  async #processQueue() {
    this.processing = true;
    while (this.queue.length > 0) {
      const wait = Math.max(0, this.minInterval - (Date.now() - this.lastRequestAt));
      if (wait > 0) await new Promise(r => setTimeout(r, wait));

      const { url, options, resolve, reject } = this.queue.shift();
      this.lastRequestAt = Date.now();
      fetchWithRetry(url, options).then(resolve).catch(reject);
    }
    this.processing = false;
  }
}

// Usage:
const client = new RateLimitedClient({ requestsPerSecond: 5 }); // 5 req/s max
const res    = await client.fetch('https://api.example.com/data');`}
      </CodeBlock>

      <SectionHeader number={7} title="Why Rate Limiting Design Matters — Fairness and UX" />

      <VerticalSteps steps={[
        {
          title: 'Always send Retry-After — it is required, not optional',
          desc: 'RFC 6585 requires Retry-After on 429 responses. Without it, well-behaved clients cannot know when to retry and will either give up or implement their own backoff — often incorrectly. A missing Retry-After header is an API bug, not a client problem.',
        },
        {
          title: 'Always send rate limit headers on success — not just on 429',
          desc: 'Clients should be able to see "I have 23 requests remaining" before hitting the limit. Headers on successful responses let clients implement proactive throttling — slowing down when remaining approaches zero rather than hitting 429 and disrupting the user experience.',
        },
        {
          title: 'Rate limit by the right identifier for the context',
          desc: 'IP-based limits protect against unauthenticated abuse. User-ID limits enforce per-user fairness. API key limits map to billing tiers. Tenant limits protect multi-tenant capacity. In practice, most APIs layer all three: IP limits before auth, then user/key limits after auth.',
        },
        {
          title: 'Make your rate limit headers part of your API documentation',
          desc: 'Clearly document: what the limits are, what headers you return, what the 429 response looks like, and how to implement backoff. Undocumented rate limits surprise and frustrate integrators. Documented limits with sensible values and clear 429 responses are just good API design.',
        },
        {
          title: 'Use Redis — do not implement rate limiting in process memory for multi-instance deployments',
          desc: 'In-memory rate limiters only work for single-server deployments. With three instances behind a load balancer, each instance tracks its own count — effective limit becomes 3x the intended limit. Redis provides a shared, atomic counter accessible from all instances simultaneously.',
        },
      ]} />

      <AlertBox type="warning" title="4 rate limiting mistakes that hurt legitimate users">
        1. <strong>Too-tight limits on free tier</strong> — if free users hit limits doing normal tasks, they churn before seeing the value. Start generous and tighten with data.{' '}
        2. <strong>No 429 documentation</strong> — integrators get mysterious failures with no guidance on how to fix them.{' '}
        3. <strong>Rate limiting health check endpoints</strong> — monitoring tools ping /health every 10 seconds; rate limiting these defeats the purpose.{' '}
        4. <strong>Resetting limits on the wrong boundary</strong> — if your limit is &ldquo;100 requests per hour&rdquo; and it resets at midnight UTC, US East Coast users get much less time on their business day than European users. Use rolling windows instead.
      </AlertBox>

      <ToolCTA
        href="/json-error-explainer"
        title="Getting Malformed JSON in Your 429 Error Response?"
        description="Some rate limiters return plain text or malformed JSON on 429 — paste any broken error response into our AI Error Explainer to diagnose the syntax issue instantly."
        buttonText="Debug 429 JSON Response →"
        color="amber"
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between rate limiting and throttling?',
          answer: 'Rate limiting rejects requests above a threshold — the client gets a 429 and must wait. Throttling slows requests down — the server processes them at a reduced rate, adding delay rather than rejecting. In API design, "rate limiting" typically means the 429-rejection model. Throttling is more common in internal systems where you want to reduce throughput without outright rejecting work. Most public APIs use rate limiting (rejection) because it gives clients a clear, predictable signal with Retry-After.',
        },
        {
          question: 'Which rate limiting algorithm should I use in production?',
          answer: 'The sliding window algorithm with Redis is the best default for most production APIs. It has no boundary burst artifacts (unlike fixed window), is accurate at all times, and the Redis sorted set implementation handles concurrent requests correctly without race conditions. Token bucket is excellent when your clients legitimately need burst capacity — for example, an API that processes uploads might allow 5 simultaneous uploads even though the steady-state rate is 1/minute. Leaky bucket is rarely used in APIs — it is more common at the infrastructure (load balancer) level.',
        },
        {
          question: 'How do I implement rate limiting in Next.js API routes?',
          answer: 'Use the Upstash Redis HTTP client (works in Edge runtime and serverless) with their @upstash/ratelimit library. It implements sliding window and token bucket with Upstash Redis using atomic Lua scripts. For traditional Node.js Next.js API routes, use ioredis with the sliding window implementation from this guide. For App Router route handlers: create a rateLimit() helper that runs before your handler logic — await rateLimit(req) at the start, throw if limited, proceed if allowed. The key is using a shared Redis instance, not process memory.',
        },
        {
          question: 'How should I handle rate limits when calling a third-party API?',
          answer: 'Three layers of defense: (1) Proactive: read X-RateLimit-Remaining on every response. When it drops below 10, slow your request rate automatically. (2) Reactive: always handle 429 with exponential backoff using the Retry-After header value. Never retry immediately on 429 — you will just get another 429. (3) Queue: for batch operations, use a rate-limited queue client (like the RateLimitedClient above) that paces requests to stay under the limit rather than hitting it and backing off.',
        },
        {
          question: 'Should I rate limit by IP address or API key?',
          answer: 'Both, at different stages. IP-based rate limiting runs before authentication — it protects your auth endpoints themselves from brute force and your infrastructure from unauthenticated floods. API key or user ID rate limiting runs after authentication — it enforces per-client fairness and billing tier limits. IP-only rate limiting has the NAT problem: a corporate office with 500 employees behind one NAT IP looks like one very aggressive client. API key limits are more accurate for authenticated clients. Use IP limits as a rough safety net and key/user limits as your primary fairness mechanism.',
        },
        {
          question: 'What is jitter and why is it critical for retry backoff?',
          answer: 'Jitter is randomness added to retry delays. Without jitter, if 500 clients all hit a rate limit at the same moment, they all wait exactly the same duration and then all retry simultaneously — causing another spike, another round of 429s, and a thundering herd loop. Jitter spreads the retries across a time window: instead of 500 clients all retrying at t+60s, they retry evenly distributed between t+42s and t+78s. This breaks the synchronized spike pattern and allows the server to gradually process the backlog. Always add ±30% random jitter to exponential backoff delays.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
