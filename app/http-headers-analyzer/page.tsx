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
