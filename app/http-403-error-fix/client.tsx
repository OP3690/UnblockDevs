'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ExternalLink, Wrench } from 'lucide-react';

export default function Http403ErrorFixClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HTTP 403 Forbidden Error — Causes &amp; How to Fix It</h1>
              <p className="text-sm text-gray-500 mt-1">Complete debugging guide for 403 errors in APIs, fetch, and curl</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              An <strong>HTTP 403 Forbidden</strong> response means the server understood your request but refuses to
              authorize it. Unlike a 404 (not found) or a 500 (server error), a 403 is about <em>permissions</em> — the
              resource exists, and the server knows you&apos;re asking for it, it just won&apos;t give it to you. This guide
              covers every common cause and exactly how to fix each one.
            </p>
          </section>

          {/* 401 vs 403 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">401 vs 403 — Key Difference</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <p className="font-bold text-orange-800 text-lg mb-2">401 Unauthorized</p>
                <p className="text-orange-700 text-sm">
                  <strong>Not authenticated</strong> — the server doesn&apos;t know who you are. No credentials were
                  provided, or they were invalid/expired.
                </p>
                <p className="text-orange-700 text-sm mt-2">
                  <strong>Fix:</strong> Provide valid credentials (log in again, refresh your token).
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <p className="font-bold text-red-800 text-lg mb-2">403 Forbidden</p>
                <p className="text-red-700 text-sm">
                  <strong>Not authorized</strong> — the server knows who you are but your account lacks the required
                  permission role or the resource is explicitly blocked.
                </p>
                <p className="text-red-700 text-sm mt-2">
                  <strong>Fix:</strong> Check permission roles, resource policies, IP allowlists, or API key scopes.
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Note: Some APIs return 403 for both authentication and authorization failures for security reasons (to avoid
              leaking whether a resource exists).
            </p>
          </section>

          {/* 8 Causes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8 Causes of 403 Errors (and How to Fix Each)</h2>
            <div className="space-y-10">

              {/* 1. Missing token */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">1.</span>Missing or Expired Bearer Token
                </h3>
                <p className="text-gray-700 mb-3">
                  The most common cause. Your request is missing the <code className="bg-gray-100 px-1 rounded">Authorization</code> header, or the JWT token has expired.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-2">Broken — missing header:</p>
                  <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const res = await fetch('https://api.example.com/profile');
// No Authorization header → 403 Forbidden`}
                  </pre>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixed:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`const token = localStorage.getItem('access_token');
const res = await fetch('https://api.example.com/profile', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  },
});
if (res.status === 401) {
  // Token expired — redirect to login or refresh
  await refreshToken();
}`}
                  </pre>
                </div>
              </div>

              {/* 2. Wrong API key format */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">2.</span>Wrong API Key Format
                </h3>
                <p className="text-gray-700 mb-3">
                  Different APIs expect the API key in different ways — as a header, query parameter, or with a specific prefix.
                </p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`// As X-API-Key header (most common)
fetch(url, { headers: { 'X-API-Key': 'your-key-here' } });

// As Authorization: ApiKey prefix
fetch(url, { headers: { 'Authorization': 'ApiKey your-key-here' } });

// As query parameter (less secure, avoid for sensitive APIs)
fetch(\`\${url}?api_key=your-key-here\`);

// OpenAI-style
fetch(url, { headers: { 'Authorization': 'Bearer sk-...' } });`}
                </pre>
                <p className="text-gray-600 text-sm mt-2">
                  Check the API&apos;s documentation for the exact header name and value format expected.
                </p>
              </div>

              {/* 3. CORS + 403 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">3.</span>CORS + 403 Combined (Preflight Blocked)
                </h3>
                <p className="text-gray-700 mb-3">
                  Some servers (especially with WAF or auth middleware) apply authentication to the preflight OPTIONS request too. The browser sends an unauthenticated OPTIONS preflight and gets back a 403.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 text-sm font-semibold mb-1">Symptom:</p>
                  <p className="text-red-700 text-sm">Network tab shows OPTIONS request returning 403 before the actual POST is ever sent.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fix (Express) — allow OPTIONS without auth:</p>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
{`// Respond to OPTIONS before auth middleware runs
app.options('*', cors());

// Then apply auth middleware only to other methods
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  return authMiddleware(req, res, next);
});`}
                  </pre>
                </div>
              </div>

              {/* 4. Cloudflare */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">4.</span>Cloudflare WAF Blocking Bot Traffic
                </h3>
                <p className="text-gray-700 mb-3">
                  Cloudflare&apos;s WAF or Bot Management can return 403 when it detects automated traffic patterns. The HTML response body usually mentions &quot;Cloudflare&quot; and a Ray ID.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixes:</p>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>Add a realistic <code className="bg-green-100 px-1 rounded">User-Agent</code> header to your request</li>
                    <li>Check the Cloudflare dashboard → Security → Events for the blocked rule ID</li>
                    <li>Add a WAF rule exception for your IP or User-Agent</li>
                    <li>If using Cloudflare Access, ensure your service token is included</li>
                  </ul>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-3">
{`# cURL with User-Agent (avoids some WAF blocks)
curl -H "User-Agent: Mozilla/5.0 (compatible; MyApp/1.0)" \\
     -H "Authorization: Bearer $TOKEN" \\
     https://api.example.com/data`}
                </pre>
              </div>

              {/* 5. IP allowlist */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">5.</span>IP Allowlist / Blocklist
                </h3>
                <p className="text-gray-700 mb-3">
                  Some APIs restrict access to specific IP addresses. If your server&apos;s IP is not on the allowlist — or is on a blocklist — every request returns 403 regardless of token.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Fixes:</p>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>Find your server&apos;s egress IP and add it to the API&apos;s allowlist</li>
                    <li>Use a static IP or Elastic IP (AWS) for consistent outbound traffic</li>
                    <li>Check if your IP is on a public blocklist (e.g., Spamhaus)</li>
                  </ul>
                </div>
              </div>

              {/* 6. AWS API Gateway */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">6.</span>AWS API Gateway Resource Policy
                </h3>
                <p className="text-gray-700 mb-3">
                  AWS API Gateway returns 403 for missing API keys, resource policy denials, or IAM authorization failures. The error body is usually <code className="bg-gray-100 px-1 rounded">{"{ \"message\": \"Forbidden\" }"}</code> with no further details.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800 text-sm font-semibold mb-2">Checklist:</p>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>If the stage uses API Key required, add <code className="bg-green-100 px-1 rounded">x-api-key</code> header</li>
                    <li>If using IAM auth, sign the request with AWS Signature V4 (or use an SDK)</li>
                    <li>Check the resource policy — ensure your caller&apos;s IP or VPC is allowed</li>
                    <li>Enable CloudWatch logging in API Gateway to see the exact denial reason</li>
                  </ul>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-3">
{`# Test AWS API Gateway with API key
curl -H "x-api-key: your-api-key-here" \\
     https://abc123.execute-api.us-east-1.amazonaws.com/prod/resource`}
                </pre>
              </div>

              {/* 7. Nginx auth_basic */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">7.</span>Nginx <code className="bg-gray-100 px-1 rounded">auth_basic</code> Blocking
                </h3>
                <p className="text-gray-700 mb-3">
                  Nginx with <code className="bg-gray-100 px-1 rounded">auth_basic</code> enabled returns 401 first, but if credentials are wrong it returns 403. Also, <code className="bg-gray-100 px-1 rounded">deny</code> directives in nginx.conf can block specific IPs or all traffic.
                </p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`# Send Basic Auth credentials
curl -u username:password https://api.example.com/data

# In fetch
const credentials = btoa('username:password');
fetch(url, {
  headers: { 'Authorization': \`Basic \${credentials}\` }
});`}
                </pre>
              </div>

              {/* 8. Missing required header */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-red-600 font-bold mr-2">8.</span>Missing Required Header (e.g., <code className="bg-gray-100 px-1 rounded">X-API-Key</code>)
                </h3>
                <p className="text-gray-700 mb-3">
                  Some APIs require a custom header beyond Authorization — like <code className="bg-gray-100 px-1 rounded">X-API-Key</code>, <code className="bg-gray-100 px-1 rounded">X-Client-ID</code>, or a tenant/workspace ID. Forgetting any required header returns 403.
                </p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'X-API-Key': apiKey,
    'X-Workspace-ID': workspaceId,  // tenant-specific header
    'Content-Type': 'application/json',
  },
});`}
                </pre>
              </div>
            </div>
          </section>

          {/* Debug step by step */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Debug a 403 Error — Step by Step</h2>
            <ol className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Read the response body',
                  text: 'Open DevTools → Network tab → click the request → Response tab. Well-designed APIs return JSON with an error code or message. Cloudflare returns HTML. AWS returns {"message":"Forbidden"}.',
                },
                {
                  step: '2',
                  title: 'Check your token',
                  text: 'Paste your JWT at jwt.io and check the exp field (Unix timestamp). If it\'s in the past, the token is expired. Re-authenticate and retry.',
                },
                {
                  step: '3',
                  title: 'Replay with cURL',
                  text: 'Use our HAR to cURL tool to generate an exact cURL replay of the browser request. Run it in a terminal. If cURL works but fetch doesn\'t, compare the headers closely.',
                },
                {
                  step: '4',
                  title: 'Check server logs',
                  text: 'If you control the server: check application logs and WAF logs for the exact reason. AWS CloudWatch, Cloudflare Security Events, and Nginx access.log are the places to look.',
                },
              ].map(({ step, title, text }) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-sm flex items-center justify-center">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-gray-600 text-sm mt-1">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <Wrench className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Inspect your actual request headers</p>
                <p className="text-blue-100 text-sm mb-3">Convert your browser&apos;s HAR file to a cURL command to replay and debug the exact request that&apos;s getting a 403.</p>
                <Link
                  href="/har-to-curl"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Inspect your actual request headers with HAR to cURL
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the difference between 401 and 403?</h3>
                <p className="text-gray-700">
                  <strong>401</strong> means you are not authenticated — no credentials or invalid credentials. <strong>403</strong> means you are authenticated but lack permission. Fix 401 by logging in; fix 403 by checking roles, scopes, and resource policies.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix 403 in fetch/axios?</h3>
                <p className="text-gray-700">
                  Add the correct <code className="bg-gray-100 px-1 rounded">Authorization</code> header:{' '}
                  <code className="bg-gray-100 px-1 rounded">{'headers: { "Authorization": `Bearer ${token}` }'}</code>. Also verify the token is not expired and your account has the required permissions for that specific endpoint.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why does Cloudflare return 403?</h3>
                <p className="text-gray-700">
                  Cloudflare&apos;s WAF or Bot Management blocked the request. Check the Security Events dashboard for the specific rule ID. Adding a real <code className="bg-gray-100 px-1 rounded">User-Agent</code> header often helps; longer term, create a WAF exception for your traffic.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix 403 in AWS API Gateway?</h3>
                <p className="text-gray-700">
                  Most common causes: missing <code className="bg-gray-100 px-1 rounded">x-api-key</code> header, IAM authorization failure, or a resource policy blocking your IP. Enable CloudWatch execution logging on the API Gateway stage to get the exact denial reason in the logs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Can CORS cause a 403 error?</h3>
                <p className="text-gray-700">
                  Yes. If the server (or WAF in front of it) applies authentication to preflight OPTIONS requests, the unauthenticated OPTIONS will get a 403. The fix is to bypass authentication for OPTIONS requests on the server, and ensure your WAF allows OPTIONS through.{' '}
                  <Link href="/cors-error-fix" className="text-blue-600 underline hover:text-blue-800">See CORS error fix guide.</Link>
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser requests to cURL for debugging' },
                { href: '/cors-tester', label: 'CORS Tester', desc: 'Verify CORS headers on any API endpoint' },
                { href: '/http-headers-analyzer', label: 'HTTP Headers Analyzer', desc: 'Inspect all response headers in detail' },
                { href: '/curl-converter', label: 'cURL Converter', desc: 'Convert cURL to fetch, axios, and more' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-red-500 mt-1 shrink-0 group-hover:text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-red-700">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
