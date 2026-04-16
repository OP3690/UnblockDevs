import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import HttpHeadersAnalyzerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/http-headers-analyzer';

export const metadata: Metadata = {
  title: 'HTTP Security Headers Analyzer — Check & Grade Your Headers | UnblockDevs',
  description:
    'Free HTTP security headers analyzer. Paste response headers to get an instant security grade (A+ to F), identify missing headers like CSP, HSTS, X-Frame-Options, and generate server config for Express, Nginx, and Apache.',
  keywords: [
    'HTTP security headers analyzer',
    'security headers checker',
    'CSP checker',
    'HSTS validator',
    'Content-Security-Policy analyzer',
    'X-Frame-Options',
    'HTTP headers grade',
    'response headers analyzer',
    'security score',
    'Referrer-Policy checker',
    'Permissions-Policy',
    'HTTP headers tool',
    'web security headers',
    'CORS headers analyzer',
    'server security headers',
    // Extended keyword cluster
    'http headers analyzer online',
    'inspect http headers',
    'response headers checker',
    'request headers viewer',
    'http header tester',
    'check server headers',
    'security headers checker',
    'x-frame-options',
    'x-content-type-options',
    'content-security-policy checker',
    'strict-transport-security',
    'hsts checker',
    'cors headers inspector',
    'cache-control headers',
    'etag header',
    'last-modified header',
    'content-type header',
    'accept header',
    'authorization header',
    'bearer token header',
    'api key header',
    'http header debugger',
    'curl headers',
    'postman headers',
    'http headers explained',
    'request vs response headers',
    'custom headers api',
    'header injection',
    'http header security',
    'missing security headers',
    'referrer-policy',
    'permissions-policy',
    'x-xss-protection',
    'cookie header secure',
    'set-cookie httponly',
    'header response time',
    'http keep-alive',
    'content-encoding gzip',
    'server header fingerprinting',
    'x-powered-by header',
    'vary header',
    'access-control headers',
    'x-forwarded-for',
    'forwarded header',
    'http method override',
    'http2 headers',
    'http headers no signup',
    'check response headers online',
    'http headers tool free',
    'http header security audit', 'analyze http response headers', 'security headers report',
    'http headers scanner free', 'website security headers grade', 'cors preflight headers',
    'feature-policy header', 'cross-origin-opener-policy', 'cross-origin-resource-policy',
  ],
  openGraph: {
    title: 'HTTP Security Headers Analyzer — Free Security Grade Tool',
    description: 'Paste HTTP response headers and get an instant A+ to F security grade. Identifies missing headers and generates server config for Express, Nginx, Apache.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HTTP Headers Analyzer — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Security Headers Analyzer — Free Online Tool',
    description: 'Instant A+ to F security grade for HTTP headers. Checks CSP, HSTS, X-Frame-Options and more. Free forever.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HTTP Security Headers Analyzer',
  url: canonicalUrl,
  description: 'Free online HTTP security headers analyzer that grades your headers from A+ to F, identifies missing security headers, and generates server config for Express.js, Nginx, and Apache.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'A+ to F security grade',
    'CSP, HSTS, X-Frame-Options analysis',
    'CORS header analysis',
    'Server config generator (Express, Nginx, Apache)',
    'Per-header security assessment',
    '40+ header definitions',
    'No signup required',
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1820', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are HTTP security headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HTTP security headers are response headers sent by a web server that instruct browsers on how to behave when handling content. Headers like Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, and X-Content-Type-Options protect against XSS, clickjacking, MIME sniffing, and other attacks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check my website\'s security headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can check your security headers by: (1) Using this analyzer — paste raw headers from browser DevTools (Network tab → click a request → copy Response Headers), (2) Using curl: curl -I https://yoursite.com and pasting the output. The analyzer will give you an A+ to F grade and explain each header.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Content-Security-Policy and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Content-Security-Policy (CSP) is the most powerful security header. It tells browsers which sources of scripts, styles, images, and other resources are allowed to load. A properly configured CSP prevents Cross-Site Scripting (XSS) attacks by blocking unauthorized script execution. Avoid using \'unsafe-inline\' and \'unsafe-eval\' in your CSP.',
      },
    },
    {
      '@type': 'Question',
      name: 'What security score should my site aim for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aim for at least a B grade (70+ points), with A (85+) being ideal for production sites. An A+ (95+) requires all major security headers including CSP, HSTS with preload, Referrer-Policy, Permissions-Policy, and the three Cross-Origin headers. Most production websites should target A or better.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check HTTP response headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Open Chrome or Firefox DevTools (F12), go to the Network tab, click any request, and scroll to the Response Headers section. Alternatively, run curl -I https://yoursite.com in the terminal to get just the headers without the body. Paste the output directly into this analyzer for an instant security grade.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is HSTS (HTTP Strict Transport Security)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "HSTS tells browsers to always use HTTPS for your domain, even if the user types http://. This prevents SSL stripping attacks and protects against mixed content warnings. Set Strict-Transport-Security: max-age=31536000; includeSubDomains; preload for maximum protection. Once sent, browsers enforce HTTPS for the duration of max-age.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does X-Frame-Options do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "X-Frame-Options prevents your page from being embedded in an iframe on another domain, protecting against clickjacking attacks. Use X-Frame-Options: DENY to block all framing, or SAMEORIGIN to allow framing only from the same domain. Modern browsers also support the frame-ancestors directive in Content-Security-Policy as a more flexible alternative.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix missing security headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use the Config Generator tab in this analyzer to get ready-to-paste code for Express.js, Nginx, or Apache. For Express.js, install the helmet package (npm install helmet) and add app.use(helmet()) — it sets most security headers automatically. For Nginx, add the header directives to your server block. Always redeploy and re-test after changes.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between request and response headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Request headers are sent by the client to the server with each HTTP request — they include Authorization, Content-Type, Accept, and User-Agent. Response headers are sent by the server back to the client — they include security headers like Content-Security-Policy and Strict-Transport-Security, as well as caching headers like Cache-Control and ETag. Security headers belong in responses.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add custom headers in fetch/axios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In fetch, pass headers in the options object: fetch(url, { headers: { 'Authorization': 'Bearer token', 'X-Custom-Header': 'value' } }). In Axios, use axios.get(url, { headers: { 'Authorization': 'Bearer token' } }). For all requests in Axios, set defaults: axios.defaults.headers.common['Authorization'] = 'Bearer token'.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I inspect HTTP headers in Chrome DevTools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Open DevTools with F12 or Cmd+Option+I, then click the Network tab. Reload the page or make a request. Click any request in the list, then click the Headers tab in the right panel. You will see Request Headers and Response Headers sections. You can right-click and copy individual header values, or copy the entire response header block to paste into this analyzer.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the X-Content-Type-Options header?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "X-Content-Type-Options: nosniff prevents browsers from MIME-sniffing a response away from the declared Content-Type. Without it, a browser might interpret a text file as executable JavaScript if it contains script-like content. This header is simple, has no performance cost, and should be set on every web server. It is one of the most basic security headers.",
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Analyze HTTP Security Headers',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Get your headers', text: 'Open browser DevTools (F12), go to the Network tab, click any request, and copy the Response Headers section. Or run: curl -I https://yoursite.com' },
    { '@type': 'HowToStep', position: 2, name: 'Paste and analyze', text: 'Paste the raw headers into the text area and click "Analyze Headers". The tool parses and grades all headers instantly.' },
    { '@type': 'HowToStep', position: 3, name: 'Review your grade', text: 'See your A+ to F security grade and per-header assessment. Missing headers are highlighted in red.' },
    { '@type': 'HowToStep', position: 4, name: 'Generate server config', text: 'Switch to the Config Generator tab and copy ready-to-paste code for Express.js, Nginx, or Apache.' },
  ],
};

export default function HttpHeadersAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <HttpHeadersAnalyzerClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="HTTP Security Headers Analyzer — Grade Your Server's Security">
          <SEOProse>
            HTTP response headers are the first line of defense for any web application. Security headers like
            <C>Content-Security-Policy</C>, <C>Strict-Transport-Security</C>, <C>X-Frame-Options</C>, and
            <C>X-Content-Type-Options</C> tell browsers how to safely handle your content — blocking XSS attacks,
            preventing clickjacking, enforcing HTTPS, and stopping MIME type sniffing.
          </SEOProse>
          <SEOProse>
            This analyzer parses raw HTTP response headers and gives you an instant security grade from A+ to F.
            Each header gets an individual assessment: ✅ secure, ⚠️ needs improvement, or ❌ missing. The Config
            Generator tab produces ready-to-paste server configurations for Express.js, Nginx, and Apache.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Analyze Your Headers in 30 Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Grab your headers', desc: 'Open DevTools → Network → any request → Response Headers. Or run curl -I https://yoursite.com in your terminal.' },
            { n: '02', title: 'Paste & analyze', desc: 'Paste the raw header block and click Analyze. The tool parses every header and runs security checks instantly.' },
            { n: '03', title: 'Read your grade', desc: 'Get an A+ to F letter grade with per-header details: what it does, current value assessment, and recommended value.' },
            { n: '04', title: 'Fix with config', desc: 'Switch to Config Generator and copy production-ready Express.js, Nginx, or Apache config to fix all missing headers.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="Who Uses HTTP Headers Analysis">
          <UseCases cases={[
            { icon: '🔒', title: 'Security audits', desc: 'Quickly audit your app before launch or as part of regular security reviews.' },
            { icon: '⚡', title: 'Penetration testing', desc: 'Identify missing security headers as part of a pentest or vulnerability assessment.' },
            { icon: '🚀', title: 'DevOps hardening', desc: 'Generate Nginx/Apache config blocks to add missing headers to your server setup.' },
            { icon: '📋', title: 'Compliance checks', desc: 'Verify headers required for OWASP Top 10 compliance and security benchmarks.' },
            { icon: '🧑‍💻', title: 'Backend development', desc: 'Confirm your Express.js/Next.js app is serving all required security headers.' },
            { icon: '🎓', title: 'Learning web security', desc: 'Understand what each header does and how it protects users from specific attack vectors.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What are HTTP security headers?', a: 'HTTP security headers are response headers that instruct browsers how to handle your content. They protect against XSS, clickjacking, MIME sniffing, and more. The most important are: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.' },
            { q: 'How do I get my site\'s response headers?', a: 'Open Chrome/Firefox DevTools (F12) → Network tab → click any request → scroll to "Response Headers". Or use curl: curl -I https://yoursite.com. Copy the output and paste it into this analyzer.' },
            { q: 'What is Content-Security-Policy?', a: 'CSP is the most important security header. It defines which sources can load scripts, styles, images, fonts, and other resources. A properly configured CSP prevents XSS attacks. Avoid \'unsafe-inline\' and \'unsafe-eval\' directives which weaken CSP significantly.' },
            { q: 'What does HSTS do?', a: 'Strict-Transport-Security (HSTS) forces browsers to use HTTPS for your domain, preventing SSL stripping attacks and mixed content issues. Set max-age=31536000 (1 year) minimum. Adding includeSubDomains and preload provides maximum protection.' },
            { q: 'How do I check HTTP response headers?', a: 'Open Chrome or Firefox DevTools (F12), go to the Network tab, click any request, and scroll to the Response Headers section. Alternatively, run curl -I https://yoursite.com in the terminal. Paste the output into this analyzer for an instant security grade and per-header breakdown.' },
            { q: 'What security headers should every website have?', a: 'Every production website should have at minimum: Content-Security-Policy, Strict-Transport-Security (HSTS), X-Frame-Options (or CSP frame-ancestors), X-Content-Type-Options: nosniff, and Referrer-Policy. Adding Permissions-Policy and the Cross-Origin headers (COOP, COEP, CORP) will push your score to A+.' },
            { q: 'What does X-Frame-Options do?', a: 'X-Frame-Options prevents your page from being embedded in an iframe on another domain, protecting against clickjacking attacks. Use DENY to block all framing, or SAMEORIGIN to allow framing only from your own domain. The modern equivalent is the frame-ancestors directive inside Content-Security-Policy.' },
            { q: 'How do I fix missing security headers?', a: 'Use the Config Generator tab in this analyzer to get ready-to-paste code for Express.js, Nginx, or Apache. For Node.js/Express, install the helmet package (npm install helmet) and add app.use(helmet()) — it sets most critical security headers automatically in one line.' },
            { q: 'What is the difference between request and response headers?', a: 'Request headers are sent by the client to the server with each HTTP request — they include Authorization, Content-Type, Accept, and User-Agent. Response headers are sent by the server back to the client and include security headers like Content-Security-Policy and caching headers like Cache-Control. Security headers belong in server responses.' },
            { q: 'How do I add custom headers in fetch/axios?', a: "In fetch, pass headers in the options object: fetch(url, { headers: { 'Authorization': 'Bearer token' } }). In Axios, use axios.get(url, { headers: { 'Authorization': 'Bearer token' } }). For site-wide Axios defaults, set axios.defaults.headers.common['Authorization'] = 'Bearer token'." },
            { q: 'How do I inspect HTTP headers in Chrome DevTools?', a: 'Open DevTools with F12, click the Network tab, make a request or reload the page, then click any request in the list. Click the Headers tab in the right panel to see both Request Headers and Response Headers. Right-click to copy individual values or the full header block.' },
            { q: 'What is the X-Content-Type-Options header?', a: 'X-Content-Type-Options: nosniff prevents browsers from MIME-sniffing a response away from the declared Content-Type. Without it, a browser might execute a text file as JavaScript if it appears script-like. This header is trivial to add and should be present on every web server with zero performance overhead.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="More Security & Developer Tools">
          <RelatedTools tools={[
            { href: '/cors-tester', label: 'CORS Tester', desc: 'Test cross-origin resource sharing policies', icon: '🌐' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode and inspect JWT tokens', icon: '🔑' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate MD5, SHA-256, SHA-512 hashes', icon: '#️⃣' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode and decode Base64 strings', icon: '🔤' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="http_headers_analyzer" />
    </>
  );
}
