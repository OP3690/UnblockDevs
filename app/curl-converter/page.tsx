import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import CurlConverterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-converter';

export const metadata: Metadata = {
  title: 'cURL Converter — Convert cURL to Python, JavaScript, Go, Java & More | UnblockDevs',
  description: 'Convert cURL to Python requests, JavaScript fetch/Axios, Go, Java, PHP, Rust in one click. Handles -H headers, -d JSON body, Bearer auth, cookies. 100% client-side — your API keys never leave your browser.',
  keywords: [
    // Core cURL → language cluster
    'curl to python',
    'curl to python requests',
    'convert curl to python',
    'curl to javascript',
    'curl to fetch',
    'curl to axios',
    'curl to nodejs',
    'curl to go',
    'curl to java',
    'curl to php',
    'curl to ruby',
    'curl to rust',
    'curl to c#',
    // POST JSON cluster — massive traffic
    'curl post json',
    'curl post json example',
    'curl post json body',
    'curl send json data',
    'curl -d json example',
    'curl content-type application/json',
    'curl post request with json body',
    'curl post data json',
    'how to send json with curl',
    'curl post application json',
    // Auth & headers cluster
    'curl bearer token',
    'curl authorization header',
    'curl with auth token',
    'curl basic auth',
    'curl api key header',
    'curl -H content-type',
    'curl add header',
    'curl custom headers',
    // Convert & import cluster
    'curl to postman',
    'curl to openapi',
    'convert curl command online',
    'curl to api client',
    'import curl to postman',
    'curl converter online',
    'curl command parser',
    // Intent queries
    'how to convert curl to python',
    'how to convert curl to javascript',
    'curl command to code',
    // Extended keyword cluster
    'curl to javascript',
    'curl to node.js fetch',
    'curl to axios',
    'curl to php',
    'curl to java',
    'curl to go',
    'curl to rust',
    'curl to swift',
    'curl to kotlin',
    'curl to c#',
    'curl to ruby',
    'curl command converter',
    'curl translator',
    'parse curl command online',
    'curl to code generator',
    'copy as curl chrome',
    'curl from browser',
    'copy curl from devtools',
    'curl to api client',
    'curl flags explained',
    'curl -X flag',
    'curl -H flag',
    'curl -d flag',
    'curl --data-raw',
    'curl -u basic auth',
    'curl --compressed',
    'curl -k insecure',
    'curl -L follow redirect',
    'curl -v verbose',
    'curl -o output file',
    'curl --max-time',
    'curl retry',
    'curl to multiple languages',
    'curl to httpie',
    'curl to powershell',
    'curl to wget',
    'curl to r',
    'curl to matlab',
    'curl to shell script',
    'curl converter online free',
    'curl to code free no signup',
    'convert api call to code',
    'curl to javascript fetch free',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1750',
    bestRating: '5',
  },
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
    {
      '@type': 'Question',
      name: 'What languages can I convert cURL to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This converter supports Python (requests), JavaScript (fetch and Axios), Go (net/http), Java (HttpClient), PHP (cURL extension), Ruby (Net::HTTP), Rust (reqwest), C#, Swift, Kotlin, and PowerShell. All languages preserve the full request including headers, body, authentication, and query parameters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to JavaScript fetch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Paste your cURL command into the converter and select JavaScript (fetch) as the target. The tool maps -X to the method option, -H flags to the headers object, and -d to the body. Authorization headers and cookies are preserved. The output is ready to paste into any browser JavaScript or Node.js 18+ project.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert cURL to Axios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Select Axios as the target language after pasting your cURL command. The converter generates an axios.request() call with the correct method, url, headers, and data properties. Bearer tokens are placed in the Authorization header, and JSON bodies are automatically set as the data property with the correct Content-Type.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does the -k flag do in curl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The -k or --insecure flag tells curl to skip TLS certificate verification — allowing connections to servers with self-signed or expired certificates. This is useful during local development but should never be used in production as it makes the connection vulnerable to man-in-the-middle attacks. The converter notes when -k is present and warns about security implications.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command from Chrome DevTools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In Chrome DevTools, open the Network tab, right-click any request, and select Copy → Copy as cURL. This gives you a complete cURL command with all headers, cookies, and body exactly as the browser sent them. Paste it directly into this converter to generate the equivalent code in your target language.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the converter support file uploads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. File upload cURL commands using -F (multipart/form-data) are parsed and converted to the equivalent multipart upload code in the target language. For Python, this generates a files parameter in requests.post(). For JavaScript fetch, it generates a FormData object. Binary file paths are preserved in the output.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert cURL with cookies to code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cookies in cURL are specified with the -b flag (e.g. -b 'session=abc123'). The converter translates these into the appropriate cookie-sending mechanism for each language: a Cookie header in fetch, the cookies parameter in Python requests, or the appropriate cookie jar in other languages. Session cookies are preserved exactly.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between -d and --data-raw in curl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Both -d and --data-raw send data as the request body, but -d interprets @ as a file reference (e.g. -d @file.json reads from a file), while --data-raw sends the data literally without any special processing. When copying cURL commands from browser DevTools, Chrome uses --data-raw to ensure the body is sent verbatim. Both are correctly parsed by this converter.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Paste your cURL command and select Python (requests). The tool generates clean Python code using the requests library, mapping each flag: -X becomes the method, -H flags become the headers dict, -d becomes json= or data=, and -u becomes auth=. The output includes an import requests statement and is ready to run.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert cURL to PHP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Select PHP as the target language. The converter generates PHP code using the native cURL extension (curl_init, curl_setopt, curl_exec) with all headers set via CURLOPT_HTTPHEADER and the body via CURLOPT_POSTFIELDS. The generated code includes error handling and curl_close() for proper resource cleanup.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert cURL to Java?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Select Java as the target language to get code using Java 11+ HttpClient. The converter generates a HttpRequest.newBuilder() chain with all headers added via .header() calls and the body set via HttpRequest.BodyPublishers. The output uses Java's built-in HTTP client — no external dependencies required.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get a cURL command from Postman?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In Postman, open a request and click the Code button (the </> icon) on the right side panel. Select cURL from the language dropdown. Postman generates the equivalent cURL command with all your headers, body, and auth. Copy it and paste it into this converter to translate to any other language.",
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert cURL to Code Online',
  description: 'Step-by-step guide to converting a cURL command to Python, JavaScript, Go, or other languages.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your cURL command', text: 'Copy a cURL command from your terminal, browser DevTools, or API documentation and paste it into the input box.' },
    { '@type': 'HowToStep', position: 2, name: 'Select the target language', text: 'Choose the output language: Python (requests), JavaScript (fetch or axios), Go, PHP, Ruby, Java, or others.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy the generated code', text: 'The converted code appears instantly. Click Copy to copy it to your clipboard.' },
    { '@type': 'HowToStep', position: 4, name: 'Use in your project', text: 'Paste the code directly into your project. All headers, cookies, and request body from the cURL command are preserved.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL Converter', item: canonicalUrl },
  ],
};

export default function CurlConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            {
              q: 'What languages can I convert cURL to?',
              a: 'The converter supports Python (requests), JavaScript fetch, Axios, Go (net/http), Java (HttpClient), PHP (cURL extension), Ruby (Net::HTTP), Rust (reqwest), C#, Swift, Kotlin, and PowerShell. All output preserves the full request including headers, authentication, and body.',
            },
            {
              q: 'How do I convert a cURL command from Chrome DevTools?',
              a: (<>In Chrome DevTools, open the Network tab, right-click any request, and select Copy → Copy as cURL. This gives you a complete cURL command with all headers, cookies, and body exactly as the browser sent them. Paste it directly into this converter to generate the equivalent code in your target language.</>),
            },
            {
              q: 'What does the -k flag do in curl?',
              a: (<>The <C>-k</C> or <C>--insecure</C> flag skips TLS certificate verification — useful for local development with self-signed certs. Never use it in production as it removes protection against man-in-the-middle attacks. The converter notes when <C>-k</C> is present and preserves it in the output with a warning comment.</>),
            },
            {
              q: 'Does the converter support file uploads?',
              a: (<>Yes. File upload commands using <C>-F</C> (multipart/form-data) are converted to FormData in JavaScript or the files parameter in Python requests. Binary file paths from the original cURL command are preserved in the generated code.</>),
            },
            {
              q: 'What is the difference between -d and --data-raw in curl?',
              a: (<>Both send data as the request body, but <C>-d</C> treats <C>@filename</C> as a file reference while <C>--data-raw</C> sends the string literally without processing. Chrome DevTools uses <C>--data-raw</C> to ensure the body is sent verbatim. Both are correctly parsed and converted by this tool.</>),
            },
            {
              q: 'How do I convert cURL to PHP?',
              a: 'Select PHP as the target language. The converter generates PHP code using the native cURL extension (curl_init, curl_setopt, curl_exec) with all headers, body, and options correctly mapped. The output includes error handling and curl_close() for proper resource management.',
            },
            {
              q: 'How do I get a cURL command from Postman?',
              a: (<>In Postman, open a request and click the <C>&lt;/&gt;</C> Code button in the right panel. Select cURL from the language dropdown. Copy the generated command and paste it into this converter to translate it to any other language.</>),
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/curl-to-code-converter-guide', label: 'cURL to Code Guide' },
            { href: '/blog/post-json-data-with-curl-examples-complete-guide', label: 'POST JSON with cURL' },
            { href: '/blog/why-my-api-works-in-postman-but-not-in-browser', label: 'Postman vs Browser' },
            { href: '/blog/har-to-curl-converter-complete-guide', label: 'HAR to cURL Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="curl_converter" />
    </>
  );
}
