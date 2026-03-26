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
        Stripe, or your own backend, exceeding rate limits causes 429 errors, failed requests,
        and bad user experience. This guide covers every strategy to handle them gracefully.
      </p>

      <StatGrid stats={[
        { value: '429', label: 'HTTP status code for "Too Many Requests"', color: 'red' },
        { value: 'Retry-After', label: 'response header telling you when to retry', color: 'amber' },
        { value: 'Exponential', label: 'backoff — wait longer with each retry', color: 'blue' },
        { value: 'Token bucket', label: 'algorithm for client-side rate limiting', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Read the Rate Limit Headers First" />
      <QuickFact>
        Most APIs return rate limit information in response headers. Always read these before
        implementing any workaround. Key headers: X-RateLimit-Limit (total), X-RateLimit-Remaining
        (left), X-RateLimit-Reset (when it resets), Retry-After (seconds to wait on 429).
      </QuickFact>

      <CodeBlock language="javascript" filename="Reading rate limit headers">
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

if (response.status === 429) {
  const waitSeconds = rateLimit.retryAfter
    ? parseInt(rateLimit.retryAfter)
    : Math.ceil((rateLimit.reset - Date.now()) / 1000);

  console.log(\`Rate limited. Wait \${waitSeconds} seconds.\`);
}`}
      </CodeBlock>

      <SectionHeader number={2} title="Exponential Backoff with Jitter" />
      <CodeBlock language="javascript" filename="Retry with exponential backoff">
{`async function fetchWithRetry(url, options = {}, maxRetries = 5) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        if (attempt === maxRetries) throw new Error('Max retries exceeded');

        // Respect Retry-After header if present
        const retryAfter = response.headers.get('Retry-After');
        const waitMs = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 30000);
          // exponential backoff + jitter, max 30 seconds

        console.log(\`Rate limited. Retrying in \${waitMs}ms (attempt \${attempt + 1})\`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      return response;

    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Also retry on network errors (5xx, timeout)
      if (error.name === 'TypeError') { // network error
        const waitMs = 1000 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, waitMs));
      } else {
        throw error;
      }
    }
  }
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Client-Side Rate Limiting — Don't Hit the Limit" />
      <CodeBlock language="javascript" filename="Token bucket rate limiter">
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
      return;
    }

    // Wait for a token to become available
    return new Promise(resolve => {
      this.queue.push(resolve);
      setTimeout(() => {
        this.refill();
        if (this.queue.length > 0 && this.tokens >= 1) {
          this.tokens -= 1;
          this.queue.shift()?.();
        }
      }, 1000 / this.maxTokens);
    });
  }
}

// Usage: max 10 requests/second
const limiter = new RateLimiter(10);

async function rateLimitedFetch(url) {
  await limiter.acquire(); // waits if over limit
  return fetch(url);
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Production Strategies" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Request queuing', description: 'Queue API requests and process them at a controlled rate. Libraries: bottleneck (Node.js), asyncio.Semaphore (Python). Prevents thundering herd when many requests arrive simultaneously.' },
        { title: 'Caching responses', description: 'Cache API responses for their max-age. Redis for shared cache across instances. Reduces repeat calls dramatically. Combine with stale-while-revalidate for seamless updates.' },
        { title: 'Batch requests', description: 'Many APIs support bulk endpoints. Instead of 100 individual GET /user/:id calls, use GET /users?ids=1,2,3... Uses 1 request vs 100. Check API docs for batch endpoints.' },
        { title: 'Webhook alternatives', description: 'Instead of polling an API every minute, subscribe to webhooks. No polling = no rate limit consumption. Reduces costs and eliminates rate limit issues entirely for event-driven data.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between rate limiting and throttling?',
          answer: 'Rate limiting: hard cap on requests per time window — exceed it and get 429. Throttling: gradual slowdown as you approach limits — responses get slower before being rejected. Most APIs use rate limiting. Your code should handle 429 for rate limiting and slow response timeouts for throttling.',
        },
        {
          question: 'Should I add jitter to exponential backoff?',
          answer: 'Yes — always add random jitter (±random milliseconds). Without jitter, all clients that got rate-limited at the same time retry simultaneously, causing another rate limit hit. Jitter spreads retries across time, preventing thundering herd. Typical: wait = base_delay * 2^attempt + random(0, 1000)ms.',
        },
        {
          question: 'How do I handle rate limits for OpenAI API?',
          answer: 'OpenAI returns headers: x-ratelimit-limit-requests, x-ratelimit-remaining-requests, x-ratelimit-reset-requests. Use tenacity (Python) or p-retry (Node.js) for automatic retry with backoff. Also consider: batching prompts, caching identical requests, using GPT-3.5 for less critical tasks to preserve GPT-4 quota.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
