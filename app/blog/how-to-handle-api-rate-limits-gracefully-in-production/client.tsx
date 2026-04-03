'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToHandleApiRateLimitsGracefullyInProductionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Handle API Rate Limits Gracefully in Production</h1>
      <p className="lead">
        API rate limits are a fact of production life. Whether you're hitting GitHub, OpenAI,
        Stripe, Twilio, or your own backend, exceeding rate limits causes 429 errors, failed
        requests, and degraded user experience. This guide covers every strategy — from reading
        rate limit headers correctly to implementing exponential backoff, client-side throttling,
        caching, and batch requests — to handle rate limits gracefully and keep your production
        system reliable.
      </p>

      <StatGrid stats={[
        { value: '429', label: 'HTTP status code for "Too Many Requests"', color: 'red' },
        { value: 'Retry-After', label: 'response header that tells you exactly when to retry', color: 'amber' },
        { value: 'Exponential', label: 'backoff — wait progressively longer with each retry', color: 'blue' },
        { value: 'Token bucket', label: 'algorithm for proactive client-side rate limiting', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Read the Rate Limit Headers First" />
      <p>
        Before implementing any workaround, understand the rate limits you're working with.
        Most APIs return rate limit information in response headers on every request, not just on 429s.
        Reading these headers tells you exactly how much capacity you have remaining and when it resets.
      </p>
      <QuickFact color="blue" label="Standard rate limit headers">
        X-RateLimit-Limit: total requests allowed per window.
        X-RateLimit-Remaining: requests left in current window.
        X-RateLimit-Reset: Unix timestamp when the window resets.
        Retry-After: seconds to wait (appears on 429 responses).
        Not all APIs use the same header names — check the specific API documentation.
      </QuickFact>
      <CodeBlock lang="javascript" title="Reading rate limit headers from every response">
{`const response = await fetch('https://api.github.com/repos/user/repo');

// Read rate limit info from every response
const rateLimit = {
  limit: parseInt(response.headers.get('X-RateLimit-Limit') || '0'),
  remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
  reset: new Date(parseInt(response.headers.get('X-RateLimit-Reset') || '0') * 1000),
  retryAfter: response.headers.get('Retry-After'),
};

console.log(\`Rate limit: \${rateLimit.remaining}/\${rateLimit.limit} remaining\`);
console.log(\`Resets at: \${rateLimit.reset.toISOString()}\`);

// Log a warning when approaching the limit
if (rateLimit.remaining < rateLimit.limit * 0.1) {
  console.warn('Approaching rate limit — slow down requests');
}

if (response.status === 429) {
  const waitSeconds = rateLimit.retryAfter
    ? parseInt(rateLimit.retryAfter)
    : Math.ceil((rateLimit.reset.getTime() - Date.now()) / 1000);

  console.log(\`Rate limited. Wait \${waitSeconds} seconds before retrying.\`);
}`}
      </CodeBlock>

      <SectionHeader number={2} title="Exponential Backoff with Jitter" />
      <p>
        When you hit a 429, the naive response is to immediately retry — but this often triggers
        another rate limit hit. Exponential backoff waits progressively longer between retries.
        Adding random jitter prevents all clients from retrying at the same moment (thundering herd problem).
      </p>
      <CodeBlock lang="javascript" title="Retry with exponential backoff and jitter">
{`async function fetchWithRetry(url, options = {}, maxRetries = 5) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        if (attempt === maxRetries) {
          throw new Error(\`Rate limited after \${maxRetries} retries\`);
        }

        // Respect Retry-After header if present
        const retryAfter = response.headers.get('Retry-After');
        const waitMs = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.min(
              1000 * Math.pow(2, attempt) + Math.random() * 1000,
              30000  // cap at 30 seconds maximum wait
            );

        console.log(\`Rate limited. Retrying in \${waitMs}ms (attempt \${attempt + 1}/\${maxRetries})\`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      // Also retry on server errors
      if (response.status >= 500 && attempt < maxRetries) {
        const waitMs = 1000 * Math.pow(2, attempt) + Math.random() * 500;
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      return response;

    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Retry on network errors
      if (error instanceof TypeError) {
        const waitMs = 1000 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, waitMs));
      } else {
        throw error;  // re-throw non-network errors immediately
      }
    }
  }
}

// Usage
const response = await fetchWithRetry('https://api.example.com/data', {
  headers: { 'Authorization': 'Bearer token' }
});`}
      </CodeBlock>

      <SectionHeader number={3} title="Client-Side Rate Limiting — Prevent Hitting the Limit" />
      <p>
        Reactive retry is the last line of defense. The better strategy is proactively limiting your
        request rate so you never hit the API limit in the first place. The token bucket algorithm
        is the standard approach for client-side rate limiting.
      </p>
      <CodeBlock lang="javascript" title="Token bucket rate limiter">
{`class RateLimiter {
  constructor(requestsPerSecond) {
    this.tokens = requestsPerSecond;
    this.maxTokens = requestsPerSecond;
    this.lastRefill = Date.now();
    this.queue = [];
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.maxTokens);
    this.lastRefill = now;
  }

  async acquire() {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return; // token available immediately
    }

    // No tokens — wait for one to become available
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        this.refill();
        if (this.tokens >= 1) {
          this.tokens -= 1;
          clearInterval(checkInterval);
          resolve();
        }
      }, 50); // check every 50ms
    });
  }
}

// Usage: max 10 requests/second
const limiter = new RateLimiter(10);

async function rateLimitedFetch(url, options) {
  await limiter.acquire(); // waits until a token is available
  return fetch(url, options);
}

// All calls go through the limiter
const [res1, res2, res3] = await Promise.all([
  rateLimitedFetch('/api/users/1'),
  rateLimitedFetch('/api/users/2'),
  rateLimitedFetch('/api/users/3'),
]); // requests are spaced automatically`}
      </CodeBlock>

      <SectionHeader number={4} title="Python Rate Limiting with Tenacity" />
      <CodeBlock lang="python" title="Python retry with tenacity library">
{`from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
    before_sleep_log,
)
import requests
import logging
import time

logger = logging.getLogger(__name__)

class RateLimitError(Exception):
    def __init__(self, retry_after=None):
        self.retry_after = retry_after

@retry(
    retry=retry_if_exception_type(RateLimitError),
    wait=wait_exponential(multiplier=1, min=1, max=60),
    stop=stop_after_attempt(6),
    before_sleep=before_sleep_log(logger, logging.WARNING),
)
def call_api(url: str, token: str) -> dict:
    response = requests.get(url, headers={'Authorization': f'Bearer {token}'})

    if response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 5))
        time.sleep(retry_after)  # wait the specified time
        raise RateLimitError(retry_after=retry_after)

    response.raise_for_status()
    return response.json()

# Usage
data = call_api('https://api.example.com/data', token='your-token')
print(data)`}
      </CodeBlock>

      <SectionHeader number={5} title="Production Architecture Strategies" />
      <KeyPointsGrid items={[
        { title: 'Request queue with controlled throughput', description: 'Queue all API requests and process them at a controlled rate rather than firing them all at once. Node.js: use the bottleneck package. Python: use asyncio.Semaphore or rq (Redis Queue). This prevents thundering herd when many events occur simultaneously (webhook bursts, scheduled batch jobs).' },
        { title: 'Response caching with TTL', description: 'Cache API responses in Redis with an appropriate TTL (time-to-live) matching the data\'s freshness requirements. A request for the same resource 50 times in 10 seconds becomes 1 API call + 49 cache hits. Use stale-while-revalidate for seamless cache refresh without blocking new requests.' },
        { title: 'Batch API requests', description: 'Many APIs offer bulk endpoints that handle multiple IDs or operations in a single request. GET /users/1, /users/2, /users/3 (3 requests) becomes GET /users?ids=1,2,3 (1 request). Check API documentation for batch endpoints — Stripe, Twilio, and most modern APIs support batching.' },
        { title: 'Webhooks instead of polling', description: 'Polling an API every 30 seconds for changes consumes rate limit budget constantly. Subscribe to webhooks instead — the API calls you when something changes. Zero polling = zero rate limit consumption for event detection. Eliminates a major category of rate limit pressure.' },
        { title: 'Multiple API keys / accounts', description: 'For very high volume use cases, some APIs support distributing load across multiple API keys or accounts. This multiplies your effective rate limit. Check API terms of service — some prohibit this. Implement a round-robin or least-recently-used key selection strategy.' },
        { title: 'Background job processing', description: 'Move non-urgent API calls to background jobs (Celery, Sidekiq, BullMQ). This lets you control concurrency, priority, and retry logic centrally. Failed jobs retry automatically. Jobs are processed at a controlled rate from a queue rather than driven by unpredictable user traffic.' },
      ]} />

      <AlertBox type="tip" title="Read the API's official rate limit documentation">
        Rate limit behavior varies significantly between APIs. GitHub gives 5,000 requests/hour authenticated
        vs 60 unauthenticated. OpenAI limits by both requests per minute AND tokens per minute.
        Stripe allows burst limits above the sustained rate. Twitter/X has extremely restrictive free limits.
        Always read the specific API's rate limit documentation — general patterns apply, but exact
        headers, reset windows, and limit structures differ.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between rate limiting and throttling?',
          answer: 'Rate limiting is a hard cap on requests per time window — exceed it and you get a 429 error immediately. Throttling is a gradual slowdown as you approach the limit — responses take longer before requests are rejected. Most public APIs use rate limiting (hard cap). Internal microservices sometimes use throttling (graceful degradation). Your client code should handle 429 for rate limiting and extended timeouts for throttling.',
        },
        {
          question: 'Should I add jitter to exponential backoff?',
          answer: 'Yes — always add random jitter (±random milliseconds) to exponential backoff. Without jitter, all clients that got rate-limited at the same time retry simultaneously at the same intervals, causing another wave of rate limit hits (thundering herd problem). Jitter spreads retries across a time window, distributing the load. Standard formula: wait = min(base_delay * 2^attempt + random(0, 1000)ms, max_wait).',
        },
        {
          question: 'How do I handle rate limits for OpenAI API?',
          answer: 'OpenAI returns specific headers: x-ratelimit-limit-requests, x-ratelimit-remaining-requests, x-ratelimit-reset-requests, and also token-based headers. OpenAI limits by both requests per minute AND tokens per minute — a single very large prompt can consume your token budget fast. Use tenacity (Python) or p-retry (Node.js) for automatic retry. Consider: caching identical requests, batching similar prompts, and using smaller models for less critical tasks to preserve quota for important operations.',
        },
        {
          question: 'How do I monitor rate limit usage in production?',
          answer: 'Track rate limit headers in your observability stack. Log remaining/limit ratios as metrics. Alert when remaining drops below 20%. Track 429 error rates in your error monitoring (Datadog, Sentry). For important APIs, build a dashboard showing rate limit consumption over time to identify patterns and plan for traffic spikes. Many APM tools (Datadog, New Relic) have built-in API monitoring that tracks these metrics automatically.',
        },
        {
          question: 'What causes rate limits to be hit unexpectedly?',
          answer: 'Common unexpected rate limit causes: (1) Multiple server instances all sending requests — no coordination means n servers × your rate = n× consumption. (2) Retry storms — failed requests retry immediately, multiplying the request volume. (3) Fan-out operations — one user action triggers requests for each of their resources. (4) Missing cache — the same resource requested repeatedly without caching. (5) Webhook processing bursts — many webhooks arrive simultaneously and trigger API calls. Centralized request queuing through a single service solves most of these.',
        },
        {
          question: 'What is the best library for handling rate limits in Node.js?',
          answer: 'For client-side rate limiting: bottleneck is the most comprehensive (concurrent requests, delay, priorities, clustering). p-limit for simple concurrency limiting. For retry logic: p-retry or axios-retry with axios. For Redis-based distributed rate limiting across multiple Node.js instances: rate-limiter-flexible is the go-to package. For OpenAI specifically, the openai npm package handles retries and rate limits automatically since version 4.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
