import type { Metadata } from 'next';
import ToolSEOContent, {
  SEOSection, FAQ,
} from '@/components/tools/ToolSEOContent';
import CurlToPythonClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-to-python';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL to Python Converter',
  url: canonicalUrl,
  description: 'Convert cURL commands to Python Requests code instantly. GET, POST, headers, auth, JSON. Free, no signup.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python requests code',
    'Supports GET, POST, PUT, PATCH, DELETE',
    'Handles headers, authentication, and JSON payloads',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '780',
    bestRating: '5',
  },
};

export const metadata: Metadata = {
  title: 'Convert cURL to Python Requests — Free Online Converter | UnblockDevs',
  description: 'Convert cURL commands to Python Requests code instantly. GET, POST, headers, auth, JSON. Free, no signup. Paste curl, get Python.',
  keywords: [
    'convert curl to python',
    'curl to python',
    'curl to python requests',
    'convert curl to python requests',
    'curl to requests python',
    'curl python converter',
    'convert curl command to python',
    'curl to python code',
    'python requests from curl',
    // Extended keyword cluster
    'curl to python converter',
    'curl command to python code',
    'convert curl post to python',
    'curl to requests library',
    'curl to python online free',
    'curl get to python',
    'curl with headers to python',
    'curl authorization to python',
    'curl bearer token python',
    'curl json body python',
    'curl form data python',
    'curl multipart python',
    'curl cookies python',
    'curl follow redirect python',
    'curl ssl verify python',
    'curl timeout python',
    'curl to python3',
    'curl to python2',
    'curl to aiohttp',
    'curl to httpx python',
    'curl to urllib python',
    'python requests equivalent',
    'python requests post json',
    'python requests headers',
    'python requests auth',
    'python requests session',
    'python requests timeout',
    'python requests ssl',
    'python requests file upload',
    'python http client',
    'requests library python',
    'pip install requests',
    'python api call',
    'python rest api',
    'python requests response',
    'python json response',
    'python requests error handling',
    'python requests retry',
    'python requests proxy',
    'curl command explained',
    'parse curl command',
    'curl flags python',
    'convert api call python',
    'postman to python',
    'insomnia to python',
    'api testing python',
    'convert curl mac',
    'convert curl linux',
    'convert curl windows',
    'curl bash to python',
    'curl to code generator',
    'python requests free tool',
    'curl python converter online',
    'curl to requests library', 'convert curl command python free', 'curl http get python',
    'curl http post python', 'curl bearer token python requests', 'curl headers to python dict',
    'python requests session', 'requests.get requests.post example', 'httpx python convert curl',
    'curl multipart python', 'curl timeout python requests',
  ],
  openGraph: {
    title: 'Convert cURL to Python Requests — Free Online Converter',
    description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - cURL to Python Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL to Python Converter | UnblockDevs',
    description: 'Convert cURL commands to Python requests code instantly. Supports headers, auth, POST body, and cookies.',
  },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python' },
};


const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL to Python', item: canonicalUrl },
  ],
};

export default function CurlToPythonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlToPythonClient />
      <ToolSEOContent>
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert a curl command to Python?',
              a: 'Paste your curl command into the input box above and the tool instantly generates the equivalent Python requests code. All flags are parsed automatically: -H headers become a headers dict, -d becomes json= or data=, -u becomes auth=, and -X sets the HTTP method.',
            },
            {
              q: 'Does the converter support all curl flags?',
              a: 'The converter handles the most common flags used in API calls: -X (method), -H (headers), -d and --data-raw (body), -u (basic auth), -b (cookies), -k (SSL skip), -L (follow redirects), --compressed, and --max-time (timeout). Complex flags like --cert for client certificates may require manual adjustment.',
            },
            {
              q: 'How do I send JSON in Python requests?',
              a: "Use the json= parameter: requests.post(url, json={'key': 'value'}, headers=headers). Python requests automatically sets Content-Type: application/json and serializes the dict. Alternatively use data=json.dumps({...}) with a manual Content-Type header for more control.",
            },
            {
              q: 'How do I add Authorization headers in Python requests?',
              a: "Pass a headers dict: requests.get(url, headers={'Authorization': 'Bearer YOUR_TOKEN'}). For Basic auth, use the auth parameter: requests.get(url, auth=('username', 'password')). The converter translates both -H Authorization and -u flags into the correct Python pattern.",
            },
            {
              q: 'How do I handle SSL verification in Python requests?',
              a: 'By default Python requests verifies SSL certificates. To disable (equivalent to curl -k), pass verify=False. For production, never disable SSL — instead point to a custom CA bundle: verify=\'/path/to/ca-bundle.crt\'.',
            },
            {
              q: 'How do I set a timeout in Python requests?',
              a: 'Pass a timeout parameter in seconds: requests.get(url, timeout=30). Set separate connect and read timeouts as a tuple: requests.get(url, timeout=(5, 30)). Without a timeout, requests will hang indefinitely if the server does not respond.',
            },
            {
              q: 'How do I send form data in Python requests?',
              a: "Use data= with a dict for application/x-www-form-urlencoded: requests.post(url, data={'field': 'value'}). For multipart/form-data file uploads, use files= instead. Python requests sets the correct Content-Type automatically for both.",
            },
            {
              q: 'How do I upload a file with Python requests?',
              a: "Open the file in binary mode and pass it via files=: with open('file.pdf', 'rb') as f: requests.post(url, files={'file': f}). Combine files= and data= parameters to include additional form fields alongside the file.",
            },
            {
              q: 'How do I follow redirects in Python requests?',
              a: 'Python requests follows redirects automatically by default (equivalent to curl -L). To disable this, pass allow_redirects=False. Check response.history to see the list of intermediate responses in the redirect chain.',
            },
            {
              q: 'How do I handle cookies in Python requests?',
              a: "Pass cookies as a dict: requests.get(url, cookies={'session': 'abc123'}). To persist cookies across requests like a logged-in session, use a Session object: s = requests.Session(). The session automatically stores and sends cookies between requests.",
            },
            {
              q: 'What is the difference between requests.get() and requests.post()?',
              a: 'requests.get() retrieves data and accepts query parameters via params=. requests.post() sends data to create or update a resource and accepts a request body via json=, data=, or files=. Use whichever HTTP method the API endpoint requires.',
            },
            {
              q: 'How do I debug a Python requests error?',
              a: 'Check response.status_code and response.text to see what the server returned. Enable verbose logging with logging.basicConfig(level=logging.DEBUG). Inspect response.request.headers and response.request.body to verify exactly what was sent.',
            },
          ]} />
        </SEOSection>
      </ToolSEOContent>
    </>
  );
}
