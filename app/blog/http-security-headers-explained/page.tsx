import type { Metadata } from 'next';
import Link from 'next/link';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export const metadata: Metadata = {
  title: 'HTTP Security Headers: CSP, HSTS & X-Frame-Options Explained | UnblockDevs',
  description:
    'What are HTTP security headers and why do they matter? Complete guide to Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — with examples and a free grader tool.',
  keywords: [
    'http security headers explained',
    'what is content security policy',
    'what is hsts header',
    'x-frame-options explained',
    'http security headers best practices',
    'how to get a+ security headers',
    'check http security headers online',
    'how to add security headers to website',
    'http headers analyzer tool',
    'security headers for nodejs express',
    'security headers for nginx',
    'security headers checker free',
    'how to check content-type header',
    'inspect api headers without postman',
    'http header analyzer tool free',
  ],
  openGraph: {
    title: 'HTTP Security Headers: CSP, HSTS & X-Frame-Options Explained',
    description:
      'Complete guide to HTTP security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — with examples and a free grader tool.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/http-security-headers-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HTTP%20Security%20Headers%20Explained%20%E2%80%94%20CSP%2C%20HSTS%2C%20X-Frame-Options%20%26%20How%20to%20Get%20an%20...&emoji=%F0%9F%94%92&desc=Complete%20guide%20to%20HTTP%20security%20headers%3A%20CSP%2C%20HSTS%2C%20X-Frame-Options%2C', width: 1200, height: 630, alt: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an ... — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an A+ Grade',
    description:
      'Complete guide to HTTP security headers: CSP, HSTS, X-Frame-Options and more. Get an A+ security score with examples for Express, Nginx, and Next.js.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/http-security-headers-explained' },
};

export default function HttpSecurityHeadersExplainedPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-900">
            ← Blog
          </Link>
          <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
            HTTP Security Headers: CSP, HSTS &amp; X-Frame-Options Explained
          </h1>
          <p className="mt-1.5 text-[14px] text-zinc-500">8 min read · Security &amp; Privacy</p>
        </div>
      </header>
      <BlogLayoutWithSidebarAds>
        <article>
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-700">
            HTTP security headers are directives your web server sends with every response, instructing the browser how to behave. A missing or misconfigured header can expose your app to clickjacking, cross-site scripting, MIME sniffing, and man-in-the-middle attacks — often with no user-visible sign that anything is wrong until an attack succeeds.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">Content-Security-Policy (CSP)</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            CSP is the most powerful security header. It tells the browser which origins are allowed to load scripts, styles, images, and other resources. A strict policy like <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">default-src 'self'</code> blocks all inline scripts and external resources by default, making XSS attacks significantly harder to execute even when an injection vulnerability exists.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">Strict-Transport-Security (HSTS)</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            HSTS forces browsers to use HTTPS for all future requests to your domain, even if the user types <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">http://</code>. Set it with a long <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">max-age</code>: <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</code>. The <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">preload</code> flag submits your domain to browser preload lists, protecting even first-time visitors.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">X-Frame-Options</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            This header prevents your page from being embedded in an iframe on another domain, blocking clickjacking attacks. Use <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">X-Frame-Options: DENY</code> to block all framing, or <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">SAMEORIGIN</code> to allow only same-origin frames. For modern browsers, the CSP <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">frame-ancestors</code> directive is more flexible and preferred.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">X-Content-Type-Options</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Setting <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">X-Content-Type-Options: nosniff</code> prevents browsers from guessing a resource&apos;s MIME type. Without it, a browser might execute a text file as JavaScript if it looks like script. Always pair this with correct <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">Content-Type</code> headers on your responses.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">Quick Reference</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Header</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Protects against</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Recommended value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['Content-Security-Policy', 'XSS, data injection', "default-src 'self'"],
                  ['Strict-Transport-Security', 'Protocol downgrade', 'max-age=31536000; includeSubDomains'],
                  ['X-Frame-Options', 'Clickjacking', 'DENY'],
                  ['X-Content-Type-Options', 'MIME sniffing', 'nosniff'],
                  ['Referrer-Policy', 'URL leakage', 'strict-origin-when-cross-origin'],
                  ['Permissions-Policy', 'Feature abuse', 'camera=(), microphone=(), geolocation=()'],
                ].map(([header, protects, value]) => (
                  <tr key={header} className="hover:bg-zinc-50">
                    <td className="px-4 py-2.5 font-mono text-[12px] text-zinc-800">{header}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{protects}</td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-zinc-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
