import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import HarToCurlClient from './client';

const canonicalUrl = 'https://unblockdevs.com/har-to-curl';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter — Free Online Tool, All Requests at Once | UnblockDevs',
  description:
    'Convert HAR files to cURL commands free & instantly. Upload a .har file from Chrome, Firefox, or Edge DevTools and get clean cURL, Python, Go, Java commands for every request. Mask secrets, export batch scripts. 100% client-side — your HAR never leaves your browser.',
  keywords: [
    // ── Primary cluster ───────────────────────────────────────────────────────
    'har to curl',
    'har to curl converter',
    'har to curl online',
    'har to curl free',
    'har to curl converter free',
    'har to curl converter online',
    'har file to curl command',
    'convert har file to curl',
    'extract curl commands from har',
    'har file converter',
    'har file parser',
    'har parser online',
    'http archive to curl',
    'convert .har to curl',
    'har to curl script',
    // ── "Copy as cURL" DevTools cluster (highest-intent) ─────────────────────
    'copy as curl chrome devtools',
    'chrome devtools copy as curl',
    'copy network request as curl',
    'copy request as curl chrome',
    'how to copy as curl chrome',
    'chrome devtools network copy as curl',
    'firefox devtools copy as curl',
    'firefox network monitor copy as curl',
    'devtools copy as curl',
    'copy as curl from browser',
    'copy as curl all requests',
    'copy as curl alternative',
    'copy all requests as curl chrome',
    'bulk copy as curl devtools',
    'export curl from devtools',
    'chrome copy all requests as curl',
    'bulk export curl from har',
    // ── Multi-language conversion cluster ─────────────────────────────────────
    'har to python',
    'har to python requests',
    'har to javascript',
    'har to nodejs',
    'har to go',
    'har to java',
    'har to php',
    'har to ruby',
    'har to code',
    'convert har to code',
    'curl command generator from har',
    // ── Replay / debug cluster ────────────────────────────────────────────────
    'replay har requests',
    'replay network requests curl',
    'replay browser request terminal',
    'network request to curl',
    'browser request to curl',
    'api request from har',
    'devtools export to curl',
    'reproduce network request curl',
    // ── Browser-specific ─────────────────────────────────────────────────────
    'chrome har to curl',
    'firefox har to curl',
    'safari har to curl',
    'edge har to curl',
    'devtools har export',
    'chrome devtools har file',
    // ── Feature / intent specific ─────────────────────────────────────────────
    'har batch convert',
    'har to curl with headers',
    'har to curl with cookies',
    'har timeline',
    'har to curl secret masking',
    'generate curl from network request',
    'api request replay',
    'network request replay tool',
    'har file curl converter online',
  ],
  openGraph: {
    title: 'HAR to cURL Converter — All Browser Requests, Free & Private | UnblockDevs',
    description:
      'The modern alternative to "Copy as cURL" in DevTools — converts an entire .har file to cURL, Python, Go, Java & more. Mask secrets. 100% client-side, nothing ever uploaded to a server.',
    type: 'website',
    url: canonicalUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HAR to cURL Converter — UnblockDevs Free Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAR to cURL Converter — Free, Multi-language, Private | UnblockDevs',
    description:
      'Convert any .har file to cURL, Python, Go, Java in seconds. No uploads, no tracking — everything runs in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

// ── JSON-LD: WebApplication ────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HAR to cURL Converter',
  url: canonicalUrl,
  description:
    'Free online HAR to cURL converter. Upload or paste a .har file from Chrome, Firefox, Safari, or Edge DevTools and instantly get clean, terminal-ready cURL commands for every request. Also converts to Python requests, Go, Java, PHP, and Ruby. All processing is 100% client-side — your HAR file never leaves your device.',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'API Tooling',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert HAR files to cURL commands — all requests at once',
    'Chrome, Firefox, Safari, and Edge HAR export support',
    'Multi-language output: Python requests, Go, Java, PHP, Ruby',
    'Secret masking for Authorization headers, cookies, and API keys',
    'Request timeline visualisation',
    'Batch cURL shell script export',
    'Filter requests by URL, method, or status code',
    'AI-ready debug prompt generation',
    '100% client-side — HAR files never leave your device',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2100',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'UnblockDevs',
    url: 'https://unblockdevs.com',
  },
  dateModified: '2026-04-15',
};

// ── JSON-LD: SoftwareApplication (second schema type for broader coverage) ─────
const softwareAppLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HAR to cURL Converter by UnblockDevs',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2100',
    bestRating: '5',
  },
  description:
    'Convert HAR (HTTP Archive) files to cURL commands and multiple programming languages. Free, private, and 100% client-side — the best "Copy as cURL" alternative for batch request export.',
};

// ── JSON-LD: FAQPage ───────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a HAR file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A HAR (HTTP Archive) file is a JSON-formatted log of all network requests and responses captured by a browser. It includes URLs, HTTP methods, request and response headers, cookies, request bodies, response status codes, and timing data. HAR files are exported from the Network tab in Chrome DevTools, Firefox DevTools, Safari Web Inspector, or Edge DevTools and are the standard way to share recorded browser network activity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a HAR file to cURL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Export a HAR file from your browser\'s DevTools (Network tab → right-click → "Save all as HAR with content" in Chrome/Edge, or "Save All As HAR" in Firefox), then paste or upload it into this HAR to cURL converter. The tool instantly extracts every request and generates a ready-to-run cURL command for each one, preserving all headers, cookies, and request bodies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export a HAR file from Chrome?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Chrome DevTools with F12 or Ctrl+Shift+I (Cmd+Option+I on Mac). Click the Network tab. Reload the page or trigger the requests you want to capture. Once the requests appear, right-click anywhere in the request list and choose "Save all as HAR with content". Upload the downloaded .har file here or paste its JSON directly into the input box.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export a HAR file from Firefox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Firefox DevTools with F12. Go to the Network tab. Reload the page or perform the actions that generate the requests you want. Right-click anywhere in the request list and select "Save All As HAR". You can then upload the .har file or paste its JSON here.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between "Copy as cURL" in DevTools and this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chrome and Firefox\'s built-in "Copy as cURL" only works for one request at a time. This tool converts an entire HAR file — which may contain hundreds of requests — to cURL commands all at once. It also adds features like secret masking, multi-language output (Python, Go, Java, PHP, Ruby), timeline visualisation, and batch shell script export. And everything runs locally — no request data is sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can you do with cURL commands extracted from a HAR file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'cURL commands extracted from a HAR file let you replay exact browser requests from the terminal. You can reproduce bugs without a browser, share reproducible API calls with teammates, run requests in CI pipelines, debug authentication flows, use them as inputs for Postman or k6, or convert them to Python, Go, or other languages for scripting and automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my HAR file sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens entirely in your browser using JavaScript. Your HAR file — which may contain auth tokens, session cookies, API keys, and other sensitive data — never leaves your device. There is no backend, no upload, and no analytics on your data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this tool convert HAR to Python, Go, or Java?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In addition to cURL, this tool converts HAR requests to Python (requests library), Go (net/http), Java (OkHttp), PHP (cURL), and Ruby (Net::HTTP). Select the target language from the output options for each request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I mask secrets and API keys in HAR to cURL output?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enable the "Mask Secrets" option before converting. The tool automatically replaces values in Authorization headers, Cookie headers, and common API key header names (X-Api-Key, X-Auth-Token, etc.) with placeholder text like [MASKED]. This lets you safely share cURL commands without exposing live credentials.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export a HAR file from Safari?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Safari, first enable the Develop menu (Safari → Settings → Advanced → "Show features for web developers"). Open the Web Inspector with Cmd+Option+I. Go to the Network tab and record your requests. Click the Export button (down arrow icon) in the toolbar to save the .har file, then upload it to this converter.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate a bulk cURL shell script from a HAR file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After converting your HAR file, click the "Export Shell Script" or "Download All as Script" button. This generates a .sh file containing all cURL commands in sequence — one per line — with proper escaping. You can run the script directly in your terminal or use it as a starting point for automated API testing in CI pipelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I filter HAR requests by URL or HTTP method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the filter bar to narrow the converted requests by URL pattern, HTTP method (GET, POST, PUT, DELETE), or HTTP status code. This is useful when a HAR file contains hundreds of requests but you only need the API calls (filter by /api/) or only the failed requests (filter by 4xx or 5xx status codes).',
      },
    },
  ],
};

// ── JSON-LD: HowTo ─────────────────────────────────────────────────────────────
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a HAR File to cURL Commands Online',
  description:
    'Step-by-step guide to converting browser HAR network recordings to cURL commands using the free UnblockDevs HAR to cURL converter.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  tool: [
    { '@type': 'HowToTool', name: 'Chrome, Firefox, Safari, or Edge browser' },
    { '@type': 'HowToTool', name: 'UnblockDevs HAR to cURL Converter (free, no account)' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open DevTools and go to the Network tab',
      text: 'Press F12 (or Cmd+Option+I on Mac) to open DevTools in Chrome, Firefox, Safari, or Edge. Click the Network tab. Make sure recording is active (the red circle should be on).',
      image: 'https://unblockdevs.com/og-image.png',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Record the requests you want to convert',
      text: 'Reload the page or trigger the specific interactions — button clicks, form submissions, API calls — that generate the network requests you want to export as cURL.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Export the HAR file',
      text: 'In Chrome/Edge: right-click in the request list → "Save all as HAR with content". In Firefox: right-click → "Save All As HAR". In Safari: click the export icon in the Network tab toolbar.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Upload or paste the HAR file into the converter',
      text: 'Drag and drop the .har file onto the UnblockDevs HAR to cURL converter, or paste the raw HAR JSON directly. The tool parses all requests instantly without uploading anything to a server.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Select requests and configure output options',
      text: 'Browse the list of extracted requests. Filter by URL, method, or status code. Enable "Mask Secrets" to redact auth headers and cookies. Select your output language: cURL, Python, Go, Java, PHP, or Ruby.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Copy or export the cURL commands',
      text: 'Click Copy next to any request to copy its cURL command. Use "Export all as shell script" for a batch file containing all selected requests, ready to run in your terminal.',
    },
  ],
};

// ── JSON-LD: BreadcrumbList ────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'HAR to cURL Converter', item: canonicalUrl },
  ],
};

export default function HarToCurl() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HarToCurlClient />

      <ToolSEOContent>

        {/* ── What is a HAR file ─────────────────────────────────────────────── */}
        <SEOSection id="what" heading="What Is a HAR File?">
          <SEOProse>
            A <strong>HAR (HTTP Archive)</strong> file is a JSON-formatted log of every network request
            and response a browser makes during a session. When you open DevTools and record network
            activity, all of that data — URLs, methods, request headers, cookies, request bodies,
            response status codes, and precise timing — can be saved as a single <code>.har</code> file.
          </SEOProse>
          <SEOProse>
            HAR is a universal standard supported by Chrome, Firefox, Safari, and Edge. It is the most
            complete snapshot of browser-to-server communication available, making it ideal for sharing
            reproducible bug reports, debugging authentication flows, auditing what a page actually
            transmits, and converting browser sessions into terminal commands or automation scripts.
          </SEOProse>
        </SEOSection>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <SEOSection id="how" eyebrow="How it works" heading="Convert HAR to cURL in Under 60 Seconds">
          <HowItWorks steps={[
            {
              n: '01',
              title: 'Open DevTools → Network tab',
              desc: 'Press F12 in Chrome, Firefox, Safari, or Edge. Enable recording and trigger the page actions that produce the requests you want to capture.',
            },
            {
              n: '02',
              title: 'Export your HAR file',
              desc: 'Chrome/Edge: right-click the request list → "Save all as HAR with content". Firefox: right-click → "Save All As HAR". Safari: click the export icon in the Network toolbar.',
            },
            {
              n: '03',
              title: 'Upload or paste the HAR',
              desc: 'Drag and drop the .har file or paste the raw JSON into the converter. All parsing happens locally — nothing is uploaded to a server.',
            },
            {
              n: '04',
              title: 'Filter, mask, and copy',
              desc: 'Browse all extracted requests. Enable secret masking to redact auth tokens. Choose cURL, Python, Go, Java, PHP, or Ruby. Copy individual commands or export a batch shell script.',
            },
          ]} />
        </SEOSection>

        {/* ── Comparison: This tool vs DevTools "Copy as cURL" ─────────────── */}
        <SEOSection id="vs-devtools" eyebrow="Comparison" heading="HAR to cURL Converter vs Chrome's &ldquo;Copy as cURL&rdquo;">
          <SEOProse>
            Chrome, Firefox, and Edge all have a built-in <strong>&ldquo;Copy as cURL&rdquo;</strong>{' '}
            option — right-click any request in the Network tab and it copies a single cURL command to
            your clipboard. It works well for one request. But it falls short the moment you need more:
          </SEOProse>
          <SEOProse>
            <strong>One request at a time</strong> — DevTools &ldquo;Copy as cURL&rdquo; is a
            single-request operation. If you need to reproduce a flow involving 20 API calls, you have
            to right-click each one individually. This tool converts an entire HAR file — every request
            — in a single step.
          </SEOProse>
          <SEOProse>
            <strong>No secret masking</strong> — DevTools copies your live Authorization header,
            session cookies, and API keys verbatim. This tool optionally replaces those values with{' '}
            <code>[MASKED]</code> placeholders so you can safely share the output in a bug report,
            Slack message, or AI prompt without leaking credentials.
          </SEOProse>
          <SEOProse>
            <strong>cURL only</strong> — DevTools only outputs cURL. This tool also generates{' '}
            <strong>Python requests</strong>, <strong>Go net/http</strong>,{' '}
            <strong>Java OkHttp</strong>, <strong>PHP cURL</strong>, and{' '}
            <strong>Ruby Net::HTTP</strong> — useful when you want to turn a recorded browser
            interaction into production code.
          </SEOProse>
          <SEOProse>
            <strong>No batch export</strong> — DevTools has no way to produce a shell script from
            multiple requests. This tool lets you select any subset of requests and export them as a
            single runnable <code>.sh</code> script for terminal replay or CI integration.
          </SEOProse>
        </SEOSection>

        {/* ── Use cases ─────────────────────────────────────────────────────── */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use HAR to cURL">
          <UseCases cases={[
            {
              icon: '🐛',
              title: 'Reproduce Bugs Without a Browser',
              desc: 'Capture the exact failing request in a DevTools session and replay it from the terminal — no browser, UI, or login required. Attach the cURL to your bug report for instant reproducibility.',
            },
            {
              icon: '🤝',
              title: 'Share Reproducible API Calls',
              desc: 'Send teammates a self-contained cURL command that exactly reproduces an issue. No environment setup, no credentials to share — just a command that works.',
            },
            {
              icon: '⚙️',
              title: 'Automate Requests in CI',
              desc: 'Export a batch shell script from a HAR recording and run it in your CI pipeline to drive integration tests, smoke tests, or synthetic monitoring.',
            },
            {
              icon: '🔐',
              title: 'Debug Auth & OAuth Flows',
              desc: 'Inspect the exact Authorization headers, PKCE codes, tokens, and cookies sent during a login or OAuth flow. Replay individual steps to pinpoint exactly where auth breaks.',
            },
            {
              icon: '🧪',
              title: 'Seed API Testing Tools',
              desc: 'Generate cURL commands and import them into Postman, Insomnia, Bruno, or k6 as a starting point for test suites. Skip the manual "create request" step.',
            },
            {
              icon: '🔍',
              title: 'Reverse Engineer Third-Party APIs',
              desc: 'Understand what requests a web app or SaaS tool makes so you can replicate the same calls in your own code — useful when an official API is missing or underdocumented.',
            },
          ]} />
        </SEOSection>

        {/* ── How to export HAR per browser ────────────────────────────────── */}
        <SEOSection id="export" heading="How to Export a HAR File from Chrome, Firefox, Safari & Edge">
          <SEOProse>
            All major browsers support HAR export from the Network panel in DevTools. Here is the
            exact sequence for each:
          </SEOProse>
          <SEOProse>
            <strong>Chrome and Edge:</strong> Open DevTools with <code>F12</code> (Windows/Linux) or{' '}
            <code>Cmd+Option+I</code> (Mac). Go to the <strong>Network</strong> tab. Make sure the
            recording button (red circle, top-left) is active. Reload the page or trigger the
            interactions you want to capture. Once requests appear, right-click anywhere in the
            request list and choose <strong>&ldquo;Save all as HAR with content&rdquo;</strong>.
            Upload the <code>.har</code> file here or paste its raw JSON.
          </SEOProse>
          <SEOProse>
            <strong>Firefox:</strong> Open DevTools with <code>F12</code>. Click the{' '}
            <strong>Network</strong> tab. Trigger the requests, then right-click anywhere in the
            request list and select <strong>&ldquo;Save All As HAR&rdquo;</strong>. Use the
            downloaded file with this converter.
          </SEOProse>
          <SEOProse>
            <strong>Safari:</strong> Enable the Develop menu under{' '}
            <em>Settings → Advanced → Show Develop menu in menu bar</em>. Open{' '}
            <strong>Develop → Show Web Inspector</strong> and click the{' '}
            <strong>Network</strong> tab. After recording, click the export button (down arrow icon)
            to save as HAR. You can also paste HAR JSON exported from Safari directly into this tool.
          </SEOProse>
          <SEOProse>
            <strong>Note on sensitive data:</strong> HAR files typically contain live session cookies,
            Authorization tokens, and API keys in request headers. Before sharing a HAR file or the
            cURL commands it produces, use the <strong>Mask Secrets</strong> toggle to automatically
            redact those values. Your HAR never leaves your browser — all processing is client-side.
          </SEOProse>
        </SEOSection>

        {/* ── Privacy section ───────────────────────────────────────────────── */}
        <SEOSection id="privacy" eyebrow="Privacy" heading="Your HAR File Never Leaves Your Browser">
          <SEOProse>
            HAR files are sensitive. They contain every header your browser sent, including{' '}
            <code>Authorization: Bearer …</code> tokens, <code>Cookie</code> headers with live
            session IDs, and potentially API keys passed as query parameters or custom headers. A
            leaked HAR file is effectively a credential dump.
          </SEOProse>
          <SEOProse>
            This converter processes everything <strong>100% client-side using JavaScript</strong>.
            There is no server, no upload endpoint, no analytics on the content of your HAR. The
            file you drag in stays in your browser tab. This makes it safe for enterprise,
            fintech, and healthcare environments where sending production request data to third-party
            services would violate data policies or compliance requirements.
          </SEOProse>
          <SEOProse>
            For extra protection, enable <strong>secret masking</strong> before copying any output.
            This replaces the values of <code>Authorization</code>, <code>Cookie</code>,{' '}
            <code>X-Api-Key</code>, <code>X-Auth-Token</code>, and similar headers with{' '}
            <code>[MASKED]</code> — so the cURL command is safe to paste into a bug report, AI chat,
            or shared Slack channel without exposing live credentials.
          </SEOProse>
        </SEOSection>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a HAR file?',
              a: 'A HAR (HTTP Archive) file is a JSON log of all network requests and responses recorded by a browser. It contains URLs, HTTP methods, headers, cookies, request bodies, response codes, and timing data — everything shown in the browser DevTools Network tab, saved to a portable file.',
            },
            {
              q: 'How do I convert a HAR file to cURL?',
              a: 'Export a HAR file from your browser DevTools (Network tab → right-click → Save as HAR), then paste or upload it into this tool. The converter extracts every request and generates a ready-to-run cURL command for each one, preserving all headers, cookies, and request bodies.',
            },
            {
              q: 'How do I export a HAR file from Chrome?',
              a: 'Open Chrome DevTools (F12 or Cmd+Option+I), go to the Network tab, record your requests, then right-click in the request list and choose "Save all as HAR with content". Upload the .har file or paste its JSON content here.',
            },
            {
              q: 'What is the difference between this tool and Chrome\'s built-in "Copy as cURL"?',
              a: 'Chrome\'s "Copy as cURL" only works on one request at a time and always includes live credentials. This tool converts an entire HAR file (all requests) at once, supports secret masking, and also outputs Python, Go, Java, PHP, and Ruby — not just cURL.',
            },
            {
              q: 'Can this tool convert HAR to Python, Go, or Java?',
              a: 'Yes. In addition to cURL, it converts HAR requests to Python (requests library), Go (net/http), Java (OkHttp), PHP (cURL), and Ruby (Net::HTTP). Select the target language from the output options for each request.',
            },
            {
              q: 'Is my HAR file sent to a server when I use this tool?',
              a: 'No. All processing happens entirely in your browser using JavaScript. Your HAR file — which may contain auth tokens, session cookies, and API keys — never leaves your device. There is no backend receiving your data.',
            },
            {
              q: 'How do I mask secrets and tokens in the output?',
              a: 'Enable the "Mask Secrets" toggle before converting. The tool automatically replaces Authorization header values, Cookie headers, and common API key header values with [MASKED] placeholders — making the output safe to share without exposing live credentials.',
            },
            {
              q: 'What can I do with cURL commands extracted from a HAR?',
              a: 'You can replay requests in the terminal, share reproducible bug reports, run them in CI/CD pipelines, use them in Postman or k6, reverse engineer APIs, or convert them to Python or Go scripts for automation.',
            },
            {
              q: 'How do I export a HAR file from Safari?',
              a: 'Enable the Develop menu (Safari → Settings → Advanced → "Show features for web developers"). Open Web Inspector (Cmd+Option+I), go to the Network tab, record requests, then click the Export button (down arrow icon) to save the .har file.',
            },
            {
              q: 'How do I generate a bulk cURL shell script from a HAR file?',
              a: 'After converting your HAR, click "Export Shell Script" or "Download All as Script". This generates a .sh file with all cURL commands in sequence, properly escaped — ready to run in your terminal or use in a CI pipeline.',
            },
            {
              q: 'Can I filter HAR requests by URL or HTTP method?',
              a: 'Yes. Use the filter bar to narrow results by URL pattern, HTTP method (GET, POST, etc.), or status code. Useful for a HAR with hundreds of requests when you only need the API calls (filter by /api/) or failed requests (filter by 4xx/5xx).',
            },
          ]} />
        </SEOSection>

        {/* ── Related tools ─────────────────────────────────────────────────── */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            {
              href: '/jwt-decoder',
              label: 'JWT Decoder',
              desc: 'Decode and inspect JWT tokens found in HAR Authorization headers — see claims, expiry, and algorithm before sharing',
              icon: '🪙',
            },
            {
              href: '/ai-schema-masker',
              label: 'AI Schema Masker',
              desc: 'Mask sensitive JSON fields and SQL values before pasting data into ChatGPT or Claude',
              icon: '🛡️',
            },
            {
              href: '/base64-encoder',
              label: 'Base64 Encoder / Decoder',
              desc: 'Decode Base64-encoded values found in HAR headers, Basic Auth credentials, or request bodies',
              icon: '🔤',
            },
            {
              href: '/hash-generator',
              label: 'Hash Generator',
              desc: 'Hash request payloads for integrity checks or signature verification',
              icon: '🔑',
            },
            {
              href: '/token-comparator',
              label: 'Token Comparator',
              desc: 'Compare two auth tokens side-by-side to spot claim differences across environments',
              icon: '🔀',
            },
            {
              href: '/json-formatter',
              label: 'JSON Formatter',
              desc: 'Prettify and validate the HAR JSON itself or any response body extracted from a request',
              icon: '{ }',
            },
          ]} />
        </SEOSection>

        {/* ── Developer guides ──────────────────────────────────────────────── */}
        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/har-to-curl-converter-complete-guide', label: 'HAR to cURL: Complete Guide for 2026' },
            { href: '/blog/copy-as-curl-from-browser-guide', label: 'How to Copy Any Browser Request as cURL' },
            { href: '/blog/post-json-data-with-curl-examples-complete-guide', label: 'POST JSON Data with cURL — Examples & Guide' },
          ]} />
        </SEOSection>

      </ToolSEOContent>

      <ToolPageFooterBand toolName="har_to_curl" />
    </>
  );
}
