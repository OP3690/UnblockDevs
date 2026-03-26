import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import CurlConverterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-converter';

export const metadata: Metadata = {
  title: 'cURL Converter — Convert cURL to Python, JavaScript, PHP, Go, Java & More Online Free | UnblockDevs',
  description: 'Convert cURL to JavaScript, Python, Go, Java, PHP, C#, Rust. Export Postman & OpenAPI. Headers, auth, JSON. 100% local.',
  keywords: [
    'curl to python',
    'curl to javascript',
    'curl to axios',
    'curl to fetch',
    'curl to requests python',
    'curl to postman',
    'curl to openapi',
    'convert curl command',
    'curl to api client',
    'curl to nodejs',
  ],
  openGraph: {
    title: 'cURL Converter – Convert cURL to Python, JavaScript, PHP, Go, Java & More',
    description: 'Convert cURL to JavaScript, Python, Go, Java, PHP, C#, Rust. Export Postman & OpenAPI. Local only.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Converter | UnblockDevs',
    description: 'Convert cURL to JavaScript, Python, Go, Java, PHP and more. 100% client-side.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL Converter',
  url: canonicalUrl,
  description: 'Convert cURL commands to Python, JavaScript, Go, Java, PHP, C#, Rust and more. All processing is 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python requests',
    'Convert cURL to JavaScript Fetch and Axios',
    'Convert cURL to Go net/http',
    'Convert cURL to Java HttpClient',
    'Convert cURL to PHP cURL',
    'Export to Postman collection',
    '100% client-side — cURL commands never leave your device',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cURL command?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'cURL (Client URL) is a command-line tool for transferring data with URLs. Developers use cURL commands to send HTTP requests directly from the terminal — testing APIs, downloading files, and debugging network calls. A typical cURL command includes flags like -X (method), -H (header), -d (request body), and -u (authentication).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert cURL to Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your cURL command into this converter and select Python (requests) as the target language. The tool parses all flags — including headers, body, authentication, and query parameters — and generates the equivalent Python code using the requests library. You can then copy the snippet directly into your project.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between cURL and Fetch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'cURL is a command-line tool that runs in the terminal and supports dozens of protocols. Fetch is a browser-native JavaScript API (also available in Node.js 18+) for making HTTP requests in code. cURL is great for quick manual API tests; Fetch is what you use when integrating those same requests into a JavaScript application. This converter translates cURL commands into Fetch (or Axios) code automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I import a cURL command into Postman?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Postman, open a new request and click the "Import" button (or use File → Import). Choose "Raw text", paste your cURL command, and Postman will parse it into a full request with method, URL, headers, and body. Alternatively, use the cURL Converter on this page to export a Postman collection JSON you can import directly.',
      },
    },
  ],
};

export default function CurlConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CurlConverterClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a cURL Command?">
          <SEOProse>
            <strong>cURL</strong> (Client URL) is a command-line tool for sending HTTP requests and
            transferring data over the internet. It is pre-installed on macOS and Linux and is the
            go-to tool for developers testing APIs, debugging network calls, and scripting HTTP
            interactions from the terminal.
          </SEOProse>
          <SEOProse>
            A cURL command is built from a URL plus a set of flags that describe the request. The most
            common flags are: <C>-X</C> to set the HTTP method (GET, POST, PUT, DELETE, PATCH),{' '}
            <C>-H</C> to add a request header, <C>-d</C> to attach a request body or JSON payload,
            and <C>-u</C> for basic authentication credentials. Together these flags fully describe any
            HTTP request — which is why converting cURL to code is so useful for integrating an API
            call you tested in the terminal into your application.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Convert cURL to Code in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your cURL command', desc: 'Copy the cURL command from your terminal, browser DevTools, API docs, or Postman and paste it into the input field.' },
            { n: '02', title: 'Pick your target language', desc: 'Select from Python, JavaScript Fetch, JavaScript Axios, PHP, Go, Java, Ruby, Rust, and more.' },
            { n: '03', title: 'Copy the generated code', desc: 'The converter instantly produces clean, idiomatic code with all headers, auth, and body correctly translated.' },
            { n: '04', title: 'Run it in your project', desc: 'Paste the snippet into your codebase. No manual translation, no missed flags, no syntax errors.' },
          ]} />
        </SEOSection>

        {/* Supported Languages */}
        <SEOSection id="languages" heading="Supported Languages & Frameworks">
          <SEOProse>
            The converter handles all major HTTP client libraries across the most popular programming
            languages:
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">Language</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Library / Framework</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Python</td><td className="px-4 py-3 text-zinc-600"><C>requests</C></td><td className="px-4 py-3 text-zinc-500">Most popular Python HTTP library</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">JavaScript</td><td className="px-4 py-3 text-zinc-600"><C>fetch</C> / <C>axios</C></td><td className="px-4 py-3 text-zinc-500">Works in browser and Node.js</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">PHP</td><td className="px-4 py-3 text-zinc-600"><C>curl</C></td><td className="px-4 py-3 text-zinc-500">Native PHP cURL extension</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Go</td><td className="px-4 py-3 text-zinc-600"><C>net/http</C></td><td className="px-4 py-3 text-zinc-500">Standard library HTTP client</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Java</td><td className="px-4 py-3 text-zinc-600"><C>HttpClient</C></td><td className="px-4 py-3 text-zinc-500">Built-in since Java 11</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Ruby</td><td className="px-4 py-3 text-zinc-600"><C>Net::HTTP</C></td><td className="px-4 py-3 text-zinc-500">Standard library HTTP module</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Rust</td><td className="px-4 py-3 text-zinc-600"><C>reqwest</C></td><td className="px-4 py-3 text-zinc-500">Ergonomic async HTTP client</td></tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Convert cURL">
          <UseCases cases={[
            { icon: '📖', title: 'API Documentation Examples', desc: 'API docs often show cURL samples. Convert them to your language to integrate faster without manual translation.' },
            { icon: '📬', title: 'Postman to Code', desc: 'Export a request from Postman as cURL, paste it here, and get clean code for any language in seconds.' },
            { icon: '🌐', title: 'HAR Export to Code', desc: 'Convert HAR files to cURL with the HAR tool, then feed those cURL commands here to generate application code.' },
            { icon: '👥', title: 'Onboarding Teammates', desc: 'Share a cURL command with a new team member and let them convert it to the language they are most comfortable with.' },
            { icon: '⚙️', title: 'CI/CD Scripts', desc: 'Turn one-off cURL test commands into repeatable Python or Go scripts that run in automated pipelines.' },
            { icon: '📱', title: 'Mobile App Prototyping', desc: 'Validate an API endpoint with cURL, then convert it to the correct HTTP call for your iOS or Android code.' },
          ]} />
        </SEOSection>

        {/* Flags reference */}
        <SEOSection id="flags" heading="Common cURL Flags Explained">
          <SEOProse>
            Understanding the flags in a cURL command makes it easier to read and convert them correctly:
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">Flag</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-X</td><td className="px-4 py-3 text-zinc-600">HTTP method</td><td className="px-4 py-3 text-zinc-500"><C>-X POST</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-H</td><td className="px-4 py-3 text-zinc-600">Request header</td><td className="px-4 py-3 text-zinc-500"><C>-H "Content-Type: application/json"</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-d</td><td className="px-4 py-3 text-zinc-600">Request body / data</td><td className="px-4 py-3 text-zinc-500"><C>{`-d '{"key":"value"}'`}</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-u</td><td className="px-4 py-3 text-zinc-600">Basic auth credentials</td><td className="px-4 py-3 text-zinc-500"><C>-u user:password</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">--data-urlencode</td><td className="px-4 py-3 text-zinc-600">URL-encode a form field</td><td className="px-4 py-3 text-zinc-500"><C>--data-urlencode "q=hello world"</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-b</td><td className="px-4 py-3 text-zinc-600">Send cookies</td><td className="px-4 py-3 text-zinc-500"><C>-b "session=abc123"</C></td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-k</td><td className="px-4 py-3 text-zinc-600">Skip TLS certificate check</td><td className="px-4 py-3 text-zinc-500"><C>-k</C> (insecure, use only in dev)</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-mono text-emerald-700">-v</td><td className="px-4 py-3 text-zinc-600">Verbose output</td><td className="px-4 py-3 text-zinc-500">Shows request/response headers in terminal</td></tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a cURL command?',
              a: 'cURL (Client URL) is a command-line tool for sending HTTP requests. It is used to test API endpoints, download files, and debug network calls from the terminal. A cURL command specifies a URL plus flags for the method, headers, body, and authentication.',
            },
            {
              q: 'How do I convert cURL to Python?',
              a: 'Paste your cURL command into the converter above and select Python (requests) as the target language. The tool will generate the equivalent Python code with all headers, body, and auth correctly translated.',
            },
            {
              q: 'Does the converter support authentication?',
              a: 'Yes. Basic auth (-u flag), Bearer tokens in Authorization headers, and API key headers are all correctly parsed and translated into the appropriate pattern for the target language.',
            },
            {
              q: 'Is my cURL command sent to a server?',
              a: 'No. All conversion happens entirely in your browser. Your cURL commands — which may contain auth tokens or API keys — never leave your device.',
            },
            {
              q: 'Can I convert cURL to Postman?',
              a: 'Yes. You can import a cURL command directly into Postman by clicking Import and pasting the raw cURL text. Postman will parse the method, URL, headers, and body automatically. You can also use the export feature in this converter to generate a Postman-compatible collection.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser HAR files into cURL commands to feed back into this converter', icon: '🌐' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode JWT tokens found in cURL Authorization headers', icon: '🪙' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Hash API keys or payloads for integrity verification', icon: '🔑' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode or decode Base64 values used in Basic Auth headers', icon: '🔤' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="curl_converter" />
    </>
  );
}
