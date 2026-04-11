import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import TimestampConverterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/timestamp-converter';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Epoch to Date, World Clock | UnblockDevs',
  description:
    'Convert Unix timestamps to human-readable dates in any timezone, or convert dates back to Unix epoch. Live current time, world clock, relative time, and 9 output formats. 100% browser-based.',
  keywords: [
    'unix timestamp converter',
    'epoch converter',
    'unix time converter',
    'timestamp to date',
    'epoch to date',
    'unix epoch converter',
    'convert timestamp online',
    'epoch timestamp',
    'unix time to human readable',
    'unix to datetime',
    'timestamp converter online',
  ],
  openGraph: {
    title: 'Unix Timestamp Converter — Epoch to Date | UnblockDevs',
    description: 'Convert Unix timestamps to readable dates in any timezone. Live clock, world clock, relative time, 9 formats. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Unix Timestamp Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter | UnblockDevs',
    description: 'Convert Unix epoch timestamps to human-readable dates and times in any timezone.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Unix Timestamp Converter',
  url: canonicalUrl,
  description: 'Convert Unix timestamps to human-readable dates in any timezone, or convert dates back to Unix epoch. Live clock, world clock, and relative time.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Unix timestamp to date conversion',
    'Date to Unix timestamp conversion',
    'World clock across 14 timezones',
    'Relative time (3 hours ago)',
    'ISO 8601, UTC, and RFC formats',
    'Live current timestamp display',
    '100% client-side',
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '2340', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Unix timestamp?', acceptedAnswer: { '@type': 'Answer', text: 'A Unix timestamp (also called Unix time, epoch time, or POSIX time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. It is a simple integer widely used in programming to represent a specific point in time without timezone ambiguity.' } },
    { '@type': 'Question', name: 'How do I convert a Unix timestamp to a human-readable date?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the Unix timestamp (in seconds or milliseconds) into the input field and select "Unix → Date" mode. The tool immediately shows the date and time in your selected timezone, along with ISO 8601, UTC, and other formats.' } },
    { '@type': 'Question', name: 'What is the difference between Unix seconds and milliseconds?', acceptedAnswer: { '@type': 'Answer', text: 'Unix timestamps in seconds are 10 digits (e.g. 1704067200). In milliseconds they are 13 digits (e.g. 1704067200000). JavaScript\'s Date.now() returns milliseconds, while most UNIX APIs use seconds. This tool auto-detects which you have entered.' } },
    { '@type': 'Question', name: 'What is epoch time?', acceptedAnswer: { '@type': 'Answer', text: 'Epoch time is another name for Unix time. The "epoch" is the starting reference point: January 1, 1970 at 00:00:00 UTC. All Unix timestamps measure elapsed seconds from this fixed point.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a Unix Timestamp to a Date Online',
  totalTime: 'PT30S',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the timestamp', text: 'Paste your Unix timestamp (seconds or milliseconds) into the input field, or click "Use now" to convert the current time.' },
    { '@type': 'HowToStep', position: 2, name: 'Select a timezone', text: 'Choose the timezone you want to display the date in from the dropdown.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy any format', text: 'Click the copy button next to any output format — ISO 8601, UTC, relative time, or local date — to copy it to your clipboard.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Unix Timestamp Converter', item: canonicalUrl },
  ],
};

export default function TimestampConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TimestampConverterClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="The Unix Timestamp Tool Every Developer Bookmarks">
          <SEOProse>
            You are debugging a log file and see <C>1704067200</C>. You are reading an API response with
            a <C>created_at</C> field in epoch milliseconds. You are setting an expiry on a JWT token and need
            the timestamp for exactly 24 hours from now. In every case, you reach for the same tool:
            a Unix timestamp converter.
          </SEOProse>
          <SEOProse>
            This one shows the current Unix time as a live clock, converts in both directions (Unix → date and
            date → Unix), auto-detects seconds vs milliseconds, outputs 9 formats at once — ISO 8601, UTC string,
            relative time, local date, day of year — and displays the same moment across 14 world timezones.
            No page reload. No server round-trips. Just fast answers.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Instant Conversion in Both Directions">
          <HowItWorks steps={[
            { n: '01', title: 'View the live clock', desc: 'The current Unix timestamp updates every second at the top. Click "Copy" to grab it anytime.' },
            { n: '02', title: 'Pick conversion direction', desc: 'Choose "Unix → Date" to decode a timestamp, or "Date → Unix" to convert a human-readable date to epoch time.' },
            { n: '03', title: 'Enter your value', desc: 'Paste a Unix timestamp (seconds or ms auto-detected) or pick a date with the date picker. Hit "Use now" to use the current time.' },
            { n: '04', title: 'Copy any output format', desc: 'Every output row has its own copy button — ISO 8601, UTC string, relative time, local date, and 14 world timezone clocks.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Need a Timestamp Converter">
          <UseCases cases={[
            { icon: '🪵', title: 'Log File Debugging', desc: 'Decode epoch timestamps in server logs, Kubernetes events, and database query logs to understand exactly when something happened.' },
            { icon: '🔑', title: 'JWT Expiry Debugging', desc: 'Decode the exp and iat claims from JWT tokens (Unix seconds) to check if a token is expired or when it was issued.' },
            { icon: '📡', title: 'API Response Parsing', desc: 'Decode created_at, updated_at, and expires_at fields from REST and GraphQL API responses during integration.' },
            { icon: '⏰', title: 'Scheduled Jobs', desc: 'Calculate the exact Unix timestamp for a future cron job, scheduled task, or cache TTL expiry.' },
            { icon: '🌍', title: 'Cross-timezone Coordination', desc: 'Convert a deployment or incident time to every team member\'s local timezone for post-mortems or scheduling.' },
            { icon: '🗄️', title: 'Database Timestamps', desc: 'Decode Unix timestamps stored in MySQL, PostgreSQL, MongoDB, or Redis to understand when records were created or modified.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What is a Unix timestamp?', a: 'A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC — the "Unix epoch". It is used universally in programming because it is timezone-independent and easy to compare, sort, and calculate with.' },
            { q: 'What is the difference between Unix seconds and milliseconds?', a: 'Seconds timestamps are 10 digits (e.g. 1704067200). Millisecond timestamps are 13 digits (e.g. 1704067200000). JavaScript\'s Date.now() uses milliseconds. Most UNIX system APIs and databases use seconds. This tool auto-detects which you have entered.' },
            { q: 'What is ISO 8601 format?', a: 'ISO 8601 is the international standard for date/time representation: YYYY-MM-DDTHH:MM:SS.mmmZ. The "Z" suffix means UTC. It is used by JSON APIs, HTML date inputs, and most modern programming languages.' },
            { q: 'How do I get the current Unix timestamp in JavaScript?', a: 'Use Math.floor(Date.now() / 1000) for seconds, or Date.now() for milliseconds. In Python, use int(time.time()). In Go, use time.Now().Unix().' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/timezone-translator', label: 'Timezone Translator', desc: 'Convert times across timezones for debugging and deployments', icon: '🌍' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode JWT tokens — the exp and iat claims are Unix timestamps', icon: '🔑' },
            { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format API responses that contain Unix timestamp fields', icon: '{}' },
            { href: '/cron-expression', label: 'Cron Builder', desc: 'Build cron expressions for scheduled jobs with timestamps', icon: '⏰' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Working with Timestamps in APIs' },
            { href: '/blog/json-best-practices-production-guide', label: 'JWT Claims Deep Dive' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Timezone Best Practices for Backends' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Date Serialization in JSON' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="timestamp_converter" />
    </>
  );
}
