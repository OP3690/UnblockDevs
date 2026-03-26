import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import UuidGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/uuid-generator';

export const metadata: Metadata = {
  title: 'UUID / GUID Generator — v1, v4, v7, Validate, Bulk Export Online Free | UnblockDevs',
  description:
    'Generate UUID and GUID for all versions v1–v8. Bulk generate up to 1,000, validate, analyze, compare, export to JSON, CSV, or SQL. Free, 100% browser-based, cryptographically secure.',
  keywords: [
    'uuid generator online', 'guid generator online', 'uuid v4 generator',
    'uuid v7 generator', 'bulk uuid generator', 'uuid validator online',
    'uuid analyzer', 'uuid primary key database', 'uuid vs auto increment',
    'what is the difference between uuid v4 and v7',
  ],
  openGraph: {
    title: 'UUID / GUID Generator — v1–v8, Validate, Bulk Export | UnblockDevs',
    description: 'Generate UUIDs v1–v8, validate, analyze, bulk export to JSON/CSV/SQL. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs UUID Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID / GUID Generator — v1–v8, Validate, Bulk | UnblockDevs',
    description: 'Generate UUIDs v1–v8. Bulk, validate, analyze, export. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UUID / GUID Generator',
  url: canonicalUrl,
  description: 'Generate UUIDs v1–v8. Validate, analyze, compare, bulk export to JSON/CSV/SQL. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Generate UUID v1, v3, v4, v5, v6, v7, v8',
    'Bulk generate up to 1,000 UUIDs',
    'UUID validator and analyzer',
    'Collision probability calculator',
    'Export to JSON, CSV, SQL INSERT',
    '100% client-side',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between UUID and GUID?', acceptedAnswer: { '@type': 'Answer', text: 'They are the same thing. GUID is Microsoft\'s term for UUID. Both follow RFC 4122 and are completely interchangeable.' } },
    { '@type': 'Question', name: 'What is the difference between UUID v4 and v7?', acceptedAnswer: { '@type': 'Answer', text: 'UUID v4 is purely random. UUID v7 encodes a Unix millisecond timestamp making it time-sortable and index-friendly for databases.' } },
    { '@type': 'Question', name: 'Should I use UUID v4 or v7 for database primary keys?', acceptedAnswer: { '@type': 'Answer', text: 'UUID v7 for new applications. Its time-sortable design means records insert in chronological order, dramatically improving index performance vs random v4.' } },
    { '@type': 'Question', name: 'Can two UUIDs ever be the same?', acceptedAnswer: { '@type': 'Answer', text: 'Practically impossible. A v4 UUID has 2^122 possible values. A 50% collision chance requires generating ~2.7 quintillion UUIDs.' } },
  ],
};

export default function UuidGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UuidGeneratorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a UUID?">
          <SEOProse>
            A <strong>UUID</strong> (Universally Unique Identifier) is a 128-bit label used to identify
            information in computer systems. Standardised in RFC 4122, a UUID looks like:
          </SEOProse>
          <div className="my-4 rounded-lg bg-zinc-100 px-4 py-3 font-mono text-[13px] text-zinc-700">
            xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
          </div>
          <SEOProse>
            <strong>M</strong> indicates the version; <strong>N</strong> indicates the variant. UUIDs are used
            as database primary keys, session IDs, transaction IDs, and anywhere a globally unique identifier
            is needed without coordination between systems.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate and Export UUIDs in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Choose a version', desc: 'Pick v4 (random), v7 (time-sorted), v5 (namespace), or any other version.' },
            { n: '02', title: 'Set quantity', desc: 'Generate 1 or bulk-generate up to 1,000 UUIDs at once.' },
            { n: '03', title: 'Copy or export', desc: 'Copy individual UUIDs or export all to JSON, CSV, or SQL INSERT statements.' },
            { n: '04', title: 'Validate or analyze', desc: 'Paste any UUID to validate, inspect the version/variant, and check collision probability.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use UUIDs">
          <UseCases cases={[
            { icon: '🗄️', title: 'Database Primary Keys', desc: 'Use v7 for time-sortable, index-friendly primary keys in Postgres, MySQL, or DynamoDB.' },
            { icon: '🔗', title: 'Distributed Systems', desc: 'Generate IDs across services without a central coordinator — no collision coordination needed.' },
            { icon: '🔀', title: 'Idempotency Keys', desc: 'Attach a v4 UUID to API requests to make retries safe without duplicate processing.' },
            { icon: '📂', title: 'File & Upload IDs', desc: 'Name uploaded files with UUIDs to avoid collisions and prevent enumeration attacks.' },
            { icon: '🧪', title: 'Test Fixtures', desc: 'Generate bulk UUIDs for seeding test databases or mock API responses.' },
            { icon: '🔁', title: 'Deterministic IDs', desc: 'Use v5 (SHA-1 namespace) for stable, repeatable IDs from a URL or email.' },
          ]} />
        </SEOSection>

        {/* Version guide */}
        <SEOSection id="versions" heading="UUID Versions Explained — v1 through v8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Version</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Source</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Sortable</th>
                  <th className="pb-3 font-semibold text-zinc-700">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['v1', 'Timestamp + node', '✅ Time', 'Legacy time-ordered systems'],
                  ['v3', 'MD5 namespace', '—', 'Deterministic IDs (legacy)'],
                  ['v4', 'Random', '—', 'Most general use cases'],
                  ['v5', 'SHA-1 namespace', '—', 'Deterministic IDs (preferred over v3)'],
                  ['v6', 'Reordered v1', '✅ Time', 'DB-friendly v1 replacement'],
                  ['v7', 'Unix ms + random', '✅ Time', '⭐ New apps, database primary keys'],
                  ['v8', 'Custom', 'App-defined', 'Application-specific layouts'],
                ].map(([v, src, sort, use]) => (
                  <tr key={v}>
                    <td className="py-3 pr-4 font-mono font-semibold text-zinc-900">{v}</td>
                    <td className="py-3 pr-4 text-zinc-600">{src}</td>
                    <td className="py-3 pr-4 text-zinc-600">{sort}</td>
                    <td className="py-3 text-zinc-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* v4 vs v7 */}
        <SEOSection id="v4-vs-v7" heading="UUID v4 vs v7 — Which to Use for Database Keys?">
          <SEOProse>
            <strong>v7 for all new applications.</strong> UUID v7 encodes a Unix millisecond timestamp in the
            first 48 bits, making it time-sortable. Records with v7 primary keys insert in chronological order,
            which dramatically improves B-tree index performance compared to random v4 UUIDs (which scatter
            inserts across the index, causing page splits). Use v4 for non-database IDs where sort order does
            not matter.
          </SEOProse>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between UUID and GUID?',
              a: 'They are the same thing. GUID is Microsoft\'s term for UUID. Both follow RFC 4122 and are completely interchangeable. GUID is common in Windows/.NET; UUID is used everywhere else.',
            },
            {
              q: 'What is the difference between UUID v4 and v7?',
              a: 'v4 is purely random — 122 bits of randomness. v7 encodes a Unix millisecond timestamp in the first 48 bits making it time-sortable, which significantly improves database index performance.',
            },
            {
              q: 'Can two UUIDs ever be the same?',
              a: 'Practically impossible. A v4 UUID has 2^122 possible values. To have a 50% collision chance you would need to generate approximately 2.7 quintillion UUIDs. Use the collision probability calculator in the tool to see exact probabilities for your scale.',
            },
            {
              q: 'Should I use UUID or auto-increment for database IDs?',
              a: 'Auto-increment is simpler for single-database setups. UUIDs are better for distributed systems, offline ID creation, merging databases, and public APIs where you don\'t want to expose sequential IDs. UUID v7 minimises index fragmentation vs random v4.',
            },
            {
              q: 'What is a namespace UUID (v3 and v5)?',
              a: 'Namespace UUIDs are deterministic — the same namespace and name always produce the same UUID. v3 uses MD5, v5 uses SHA-1. Use them when you want stable IDs from the same input (e.g. a URL or email address).',
            },
            {
              q: 'Are the UUIDs generated here cryptographically secure?',
              a: 'Yes. v4 and v7 UUIDs use the Web Crypto API\'s getRandomValues(), which is a cryptographically secure random number generator. Nothing is sent to any server.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/hash-generator', label: 'Hash Generator', desc: 'UUID v3/v5 use MD5/SHA-1 namespace hashing', icon: '#️⃣' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare two UUIDs or tokens with visual diff', icon: '🔍' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff that normalises UUID noise', icon: '🔀' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode UUIDs as Base64 or decode values', icon: '🔤' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="uuid_generator" />
    </>
  );
}
