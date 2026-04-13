'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HttpSecurityHeadersExplainedClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options &amp; How to Get an A+ Grade</h1>
      <p className="lead">
        HTTP security headers are response headers your server sends to instruct the browser to
        enforce security policies — block cross-site scripting, force HTTPS, prevent clickjacking,
        and restrict which features your page can access. They are the fastest, highest-impact
        security improvement most sites can make. Six headers, thirty minutes of configuration,
        dramatically better protection.
      </p>

      <StatGrid
        stats={[
          { value: '6 headers', label: 'Cover the most critical threats', color: 'blue' },
          { value: 'A+ grade', label: 'Achievable in under 30 minutes', color: 'green' },
          { value: '30 min', label: 'Typical implementation time', color: 'violet' },
          { value: 'Free', label: 'Security header grader tool', color: 'orange' },
        ]}
      />

      <SectionHeader number={1} title="What Are HTTP Security Headers?" />
      <p>
        When a browser receives an HTTP response, it reads certain headers as instructions for how
        to behave. Security headers are a subset of response headers that tell the browser: what
        scripts are allowed to run, whether to allow iframes, whether to force HTTPS, what
        information to share with other sites, and which hardware features the page can access.
      </p>
      <p>
        Without these headers, the browser uses permissive defaults — which means attackers can
        inject scripts, embed your page in an iframe, downgrade HTTPS to HTTP, or leak sensitive
        URLs to third-party trackers.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Content-Security-Policy (CSP)',
            description:
              'Controls which scripts, styles, images, and other resources can load. The #1 defense against XSS attacks.',
          },
          {
            title: 'Strict-Transport-Security (HSTS)',
            description:
              'Forces the browser to use HTTPS for all future requests to your domain. Prevents protocol downgrade attacks.',
          },
          {
            title: 'X-Frame-Options',
            description:
              'Prevents your page from being loaded inside an iframe on another origin. Blocks clickjacking attacks.',
          },
          {
            title: 'X-Content-Type-Options',
            description:
              'Tells the browser not to guess the MIME type — it must use the declared Content-Type. Prevents MIME confusion attacks.',
          },
          {
            title: 'Referrer-Policy',
            description:
              'Controls how much URL information is included in the Referer header when users navigate away from your site.',
          },
          {
            title: 'Permissions-Policy',
            description:
              'Restricts which browser APIs (camera, microphone, geolocation, payment) can be used by your page and embedded iframes.',
          },
        ]}
      />

      <AlertBox type="tip" title="Grade your headers instantly">
        Paste any site&apos;s response headers into the{' '}
        <a href="https://unblockdevs.com/http-headers-analyzer" target="_blank" rel="noopener noreferrer">
          UnblockDevs HTTP Headers Analyzer
        </a>{' '}
        to get an instant A+ to F security grade, a list of missing headers, and copy-paste fix
        recommendations for each issue.
      </AlertBox>

      <SectionHeader number={2} title="Content-Security-Policy (CSP) — #1 Defense Against XSS" />
      <p>
        A Content Security Policy tells the browser exactly which sources of content are trusted.
        It can prevent inline scripts from running, block scripts from unknown domains, and stop
        data from being sent to untrusted endpoints — making XSS attacks much harder to execute
        even if an attacker manages to inject markup into your page.
      </p>

      <CodeBlock lang="http" title="A strong Content-Security-Policy header">
{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-rAnd0mN0nce' https://cdn.trusted.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https://cdn.trusted.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.yoursite.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;`}
      </CodeBlock>

      <p>Key directives explained:</p>
      <ul className="space-y-1 my-4">
        <li><code>default-src &apos;self&apos;</code> — Default: only load resources from your own domain</li>
        <li><code>script-src</code> — Override for scripts: allow your domain + nonce-matched inline scripts + specific CDNs</li>
        <li><code>frame-ancestors &apos;none&apos;</code> — No iframes allowed from any origin (replaces X-Frame-Options)</li>
        <li><code>upgrade-insecure-requests</code> — Automatically upgrade HTTP sub-resources to HTTPS</li>
        <li><code>base-uri &apos;self&apos;</code> — Prevents attackers from changing the base URL via injected &lt;base&gt; tags</li>
        <li><code>form-action &apos;self&apos;</code> — Forms can only submit to your own domain</li>
      </ul>

      <ErrorFix
        title="Weak CSP vs strict CSP with nonce"
        bad={`# unsafe-inline allows any inline script — CSP basically useless against XSS
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';`}
        good={`# Strict CSP: only scripts with matching nonce attribute are allowed to run
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-rAnd0mN0nce123';
  frame-ancestors 'none';
  base-uri 'self';`}
        badLabel="unsafe-inline = no XSS protection"
        goodLabel="Nonce-based CSP = strong XSS protection"
      />

      <QuickFact color="violet" label="Score impact">
        A missing CSP is worth -20 points in the security grader — the single biggest score
        deduction of any header. Even a basic CSP with <code>default-src &apos;self&apos;</code>{' '}
        scores significantly better than no CSP at all.
      </QuickFact>

      <SectionHeader number={3} title="Strict-Transport-Security (HSTS) — Force HTTPS" />
      <p>
        HSTS tells the browser: never connect to this domain over HTTP. For the duration specified
        by <code>max-age</code>, the browser will automatically upgrade all requests to HTTPS
        without even sending the HTTP request. This prevents protocol downgrade attacks and network
        interception.
      </p>

      <CodeBlock lang="http" title="Correct HSTS header">
{`# Basic HSTS — 1 year, applies to subdomains, listed in preload list
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Explanation:
# max-age=31536000 → 1 year (in seconds) = the minimum for HSTS preload
# includeSubDomains → applies to all subdomains (api.yoursite.com, etc.)
# preload → request inclusion in browser HSTS preload lists`}
      </CodeBlock>

      <ErrorFix
        title="Too-short max-age vs production-ready HSTS"
        bad={`# 7 days is way too short — browser reverts to HTTP after 7 days
Strict-Transport-Security: max-age=604800`}
        good={`# 2 years, all subdomains, preload eligible
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`}
        badLabel="max-age too short"
        goodLabel="Production-ready HSTS"
      />

      <AlertBox type="warning" title="HSTS preload requires commitment">
        Once you set a long max-age and submit to the HSTS preload list, you cannot easily go back
        to HTTP — browsers will refuse to connect over HTTP for the entire max-age period. Only
        enable HSTS preload when you are certain HTTPS is permanently configured on all subdomains.
      </AlertBox>

      <SectionHeader number={4} title="X-Frame-Options — Stop Clickjacking" />
      <p>
        Clickjacking attacks work by embedding your site in a transparent iframe overlaid on a
        deceptive page. The user thinks they are clicking a harmless button but is actually clicking
        a button on your site — triggering actions like payments, account changes, or OAuth grants.
        <code>X-Frame-Options</code> prevents your page from being embedded in iframes.
      </p>

      <CodeBlock lang="http" title="X-Frame-Options header values">
{`# DENY — no site can embed this page in an iframe (most restrictive, recommended)
X-Frame-Options: DENY

# SAMEORIGIN — only pages from the same origin can embed this page
X-Frame-Options: SAMEORIGIN

# Modern replacement: CSP frame-ancestors directive (more flexible)
Content-Security-Policy: frame-ancestors 'none';  # equivalent to DENY
Content-Security-Policy: frame-ancestors 'self';  # equivalent to SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self' https://trusted-partner.com; # more specific`}
      </CodeBlock>

      <p>
        <code>X-Frame-Options</code> is well-supported everywhere. For modern stacks, prefer the
        CSP <code>frame-ancestors</code> directive — it is more flexible and supports multiple
        trusted origins. Set both for maximum compatibility.
      </p>

      <CodeBlock lang="http" title="X-Content-Type-Options — prevent MIME sniffing">
{`# Always use nosniff — tells browser to respect the declared Content-Type
X-Content-Type-Options: nosniff

# Without this, browsers may try to "sniff" the content type — treating
# a text file as JavaScript if it looks like script, which enables attacks`}
      </CodeBlock>

      <SectionHeader number={5} title="How to Add Security Headers in Express, Nginx, and Next.js" />
      <p>
        Each framework and server has a different way to add HTTP response headers. Here are
        copy-paste ready configurations for the three most common setups.
      </p>

      <CodeBlock lang="javascript" title="Express.js — using helmet (recommended)">
{`const express = require('express');
const helmet = require('helmet');

const app = express();

// Helmet sets secure defaults for all major security headers
app.use(helmet());

// Or configure each header explicitly:
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-rAnd0mN0nce'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);`}
      </CodeBlock>

      <CodeBlock lang="bash" title="Nginx — add security headers in server block">
{`server {
    listen 443 ssl http2;
    server_name yoursite.com;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; frame-ancestors 'none';" always;

    # ... rest of config
}`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Next.js — security headers in next.config.js">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
      </CodeBlock>

      <AlertBox type="tip" title="Generate config automatically">
        Use the Config Generator in the{' '}
        <a href="https://unblockdevs.com/http-headers-analyzer" target="_blank" rel="noopener noreferrer">
          HTTP Headers Analyzer
        </a>{' '}
        to generate ready-to-paste configuration for Express, Nginx, and Next.js based on the
        exact headers your site is currently missing.
      </AlertBox>

      <SectionHeader number={6} title="How to Check and Grade Your Security Headers" />
      <p>
        After implementing security headers, verify they are being sent correctly and get a grade
        so you know exactly what still needs improvement.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Open DevTools and reload your page',
            desc: 'Press F12 → Network tab. Reload the page to capture the initial document request.',
          },
          {
            title: 'Find the main document response',
            desc: 'Click the first request in the list (your HTML document). Open the Headers tab and scroll to Response Headers.',
          },
          {
            title: 'Copy all response headers',
            desc: 'Right-click in the Response Headers section → "Copy response headers". This copies all headers in plain text format.',
          },
          {
            title: 'Paste into the HTTP Headers Analyzer',
            desc: 'Go to unblockdevs.com/http-headers-analyzer and paste the headers into the input box. Click "Analyze Headers".',
          },
          {
            title: 'Review your security grade',
            desc: 'The analyzer grades from A+ (all security headers correctly configured) to F (critical headers missing). Each finding includes a description and copy-paste fix.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'What are HTTP security headers and why do they matter?',
            answer:
              'HTTP security headers are response headers that tell the browser how to behave securely when rendering your page. They prevent cross-site scripting (XSS) via CSP, clickjacking via X-Frame-Options, protocol downgrade via HSTS, MIME confusion via X-Content-Type-Options, and unauthorized feature access via Permissions-Policy. Without them, browsers use permissive defaults that attackers can exploit.',
          },
          {
            question: 'What is Content-Security-Policy and how does it prevent XSS?',
            answer:
              'Content-Security-Policy (CSP) is a response header that tells the browser which sources of scripts, styles, and other resources are trusted. With a strict CSP (using nonces instead of unsafe-inline), even if an attacker injects a <script> tag into your HTML, the browser will refuse to execute it because it does not have the correct nonce attribute. CSP is the most effective browser-side defense against XSS attacks.',
          },
          {
            question: 'What is the HSTS header and should I use the preload directive?',
            answer:
              'Strict-Transport-Security (HSTS) tells browsers to always use HTTPS for your domain for the duration of max-age. The preload directive signals eligibility for inclusion in browser HSTS preload lists — meaning browsers will refuse HTTP connections to your domain even on the very first visit. Use preload only if you are committed to permanent HTTPS on all subdomains, as it is very difficult to reverse.',
          },
          {
            question: 'How do I add security headers to my Node.js Express server?',
            answer:
              'Install the helmet package: npm install helmet. Then add app.use(helmet()) before your routes. Helmet sets secure defaults for all major security headers. For custom configuration, pass options to helmet() — for example, helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["\'self\'"] } } }). For HSTS, use helmet({ hsts: { maxAge: 63072000, includeSubDomains: true } }).',
          },
          {
            question: 'How do I add security headers to Nginx?',
            answer:
              'Add add_header directives inside your server {} or location {} block in the Nginx config. Use add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always; and similar lines for each header. The always keyword ensures headers are sent on all response codes including errors. After editing the config, run nginx -t to test syntax and nginx -s reload to apply.',
          },
          {
            question: 'How do I check and grade my HTTP security headers for free?',
            answer:
              'Open Chrome DevTools (F12) → Network tab → reload the page → click the document request → Headers tab → right-click → Copy response headers. Then paste the headers into the UnblockDevs HTTP Headers Analyzer at unblockdevs.com/http-headers-analyzer. You will get an A+ to F grade, a list of every missing or misconfigured security header, explanations of the risk, and copy-paste fix recommendations.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
