import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import SqlFormatterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-formatter';

export const metadata: Metadata = {
  title: 'SQL IN Clause Generator — Convert Any List to SQL IN, JSON, CSV | UnblockDevs',
  description:
    'Convert any list of IDs, emails, or UUIDs into a SQL IN clause, JSON array, CSV, GraphQL, or MongoDB query instantly. MySQL, PostgreSQL, SQL Server, Oracle, SQLite. Parameterized queries, range compression, SQL INSERT — 100% browser-based.',
  keywords: [
    'sql in clause generator',
    'sql in list generator',
    'list to sql in clause',
    'convert list to sql',
    'sql in clause from excel',
    'sql in clause from csv',
    'sql formatter online',
    'format sql online',
    'sql beautifier',
    'generate sql in clause',
    'sql where in clause generator',
    'mysql in clause generator',
    'postgresql in clause',
    'sql list formatter',
    'ids to sql in clause',
    'bulk sql in clause',
    'sql parameterized query generator',
    'sql insert generator',
    'sql in clause online tool',
    'sql in clause builder',
  ],
  openGraph: {
    title: 'SQL IN Clause Generator — Convert Any List to SQL IN | UnblockDevs',
    description: 'Convert any list (CSV, JSON, Excel, newline) to a SQL IN clause, parameterized query, JSON array, or MongoDB filter. MySQL, PostgreSQL, Oracle, SQLite. Free, browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs SQL IN Clause Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL IN Clause Generator — List to SQL IN Online | UnblockDevs',
    description: 'Paste any list → get a SQL IN clause, JSON array, CSV, GraphQL, or MongoDB query. Supports MySQL, PostgreSQL, Oracle, SQL Server, SQLite.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL IN Clause Generator',
  url: canonicalUrl,
  description: 'Convert any list of IDs, emails, or UUIDs into a SQL IN clause, JSON array, CSV, GraphQL, or MongoDB query. MySQL, PostgreSQL, SQL Server, Oracle, SQLite. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Auto-detect CSV, JSON array, newline, tab, or mixed input',
    'SQL IN clause output for MySQL, PostgreSQL, SQL Server, Oracle, SQLite',
    'Parameterized query generation (?, $1, @p1)',
    'Range compression with BETWEEN for consecutive IDs',
    'JSON array, CSV, GraphQL, MongoDB output formats',
    'SQL INSERT statement generation',
    'Chunk size for splitting large IN lists',
    'Duplicate removal and value deduplication',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2100',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert a list of IDs to a SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your IDs (comma-separated, newline, JSON array, or tab-separated) into the input box. The tool auto-detects the format, deduplicates values, and outputs a correctly formatted SQL IN clause. Select your database (MySQL, PostgreSQL, SQL Server, Oracle, SQLite) to apply the right quoting conventions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What input formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool accepts any format: comma-separated (1, 2, 3), newline-separated (one per line), JSON arrays ([1,2,3]), tab-separated, Excel paste, or mixed. It auto-detects and normalizes all of these without any manual configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate parameterized queries for prepared statements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enable the Parameterized option in advanced settings. The tool generates ? placeholders for MySQL, $1/$2/$3 for PostgreSQL, and @p1/@p2 for SQL Server — ready to use with prepared statements and ORM parameter binding.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is range compression (BETWEEN)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Range compression converts consecutive numeric ID sequences into BETWEEN clauses. For example, IDs 1-10 and 20-30 become: id BETWEEN 1 AND 10 OR id BETWEEN 20 AND 30. This dramatically shortens queries with sequential IDs and can improve query plan performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe? Is it sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All processing runs entirely in your browser. Your IDs, emails, and query data are never sent to any server. You can safely paste production IDs, internal data, or sensitive values.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I split large IN lists into chunks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the Chunk Size option (e.g., 1000) to split a large list into multiple IN clauses of that size. This avoids database engine limits on IN clause size — MySQL recommends keeping IN lists under 1000 values per query.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a List to a SQL IN Clause',
  description: 'Step-by-step guide to generating a SQL IN clause from any list of IDs, emails, or UUIDs.',
  totalTime: 'PT30S',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your list', text: 'Paste IDs, emails, or UUIDs in any format — comma-separated, newline, JSON array, Excel paste, or tab-separated.' },
    { '@type': 'HowToStep', position: 2, name: 'Select value type and database', text: 'Choose Numeric or String, select your database (MySQL, PostgreSQL, SQL Server, Oracle, SQLite), and pick Single or Full IN clause output.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Format', text: 'Click Format (or press ⌘+Enter). Duplicates are removed and the SQL IN clause appears instantly.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or download', text: 'Copy the output to clipboard or download as .sql, .csv, or .json. Use in any database client or application.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'SQL IN Clause Generator', item: canonicalUrl },
  ],
};

export default function SqlFormatterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SqlFormatterClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a SQL IN Clause Generator?">
          <SEOProse>
            A <strong>SQL IN clause generator</strong> converts any list of values — IDs, emails, UUIDs,
            alphanumeric codes — into a correctly formatted <C>WHERE id IN (...)</C> clause ready to paste
            directly into your database client, ORM query, or migration script. It handles deduplication,
            quoting, and dialect-specific syntax automatically.
          </SEOProse>
          <SEOProse>
            Manually formatting large lists of IDs is tedious and error-prone. A single misplaced quote or
            comma breaks your entire query. Paste the raw list and get back production-ready SQL in under a second —
            with options for parameterized queries, range compression, SQL INSERT mode, JSON arrays, CSV, GraphQL,
            and MongoDB filters.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate SQL IN Clause in 3 Steps">
          <HowItWorks steps={[
            { n: '01', title: 'Paste any list', desc: 'Drop in IDs in any format — comma-separated, one per line, JSON array, Excel paste, or tab-delimited. The tool auto-detects and normalizes all formats.' },
            { n: '02', title: 'Pick value type & database', desc: 'Select Numeric or String quoting, choose your DB dialect (MySQL, PostgreSQL, SQL Server, Oracle, SQLite), and set output format.' },
            { n: '03', title: 'Copy the SQL', desc: 'Click Format. Duplicates are removed. Copy the IN clause, parameterized query, or alternative format to clipboard or download the file.' },
          ]} />
        </SEOSection>

        {/* Output formats */}
        <SEOSection id="formats" heading="Output Formats — More Than Just SQL IN">
          <SEOProse>
            One list, five output formats. Switch between them without re-pasting your data:
          </SEOProse>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Format</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Example output</th>
                  <th className="pb-3 font-semibold text-zinc-700">Use case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['SQL IN', "WHERE id IN (1, 2, 3)", 'Direct use in SQL WHERE clauses'],
                  ['JSON', '{"ids": [1, 2, 3]}', 'API payloads, JSON config, request bodies'],
                  ['CSV', '1,2,3', 'Spreadsheet import, report tools, data pipelines'],
                  ['GraphQL', 'query { users(ids: [1, 2, 3]) { ... } }', 'GraphQL filter variables'],
                  ['MongoDB', '{ _id: { $in: [1, 2, 3] } }', 'MongoDB find() and aggregate() filters'],
                ].map(([fmt, example, use]) => (
                  <tr key={fmt}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{fmt}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{example}</td>
                    <td className="py-3 text-zinc-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Advanced features */}
        <SEOSection id="advanced" heading="Advanced Features">
          <UseCases cases={[
            { icon: '🔢', title: 'Range Compression (BETWEEN)', desc: 'Consecutive numeric IDs are compressed into BETWEEN clauses: id BETWEEN 1 AND 1000. Shorter queries, better index use.' },
            { icon: '🔒', title: 'Parameterized Queries', desc: 'Generate ?, $1/$2/$3, or @p1 placeholders for prepared statements. Prevents SQL injection — safe for production use.' },
            { icon: '📦', title: 'Chunk Size Splitting', desc: 'Split huge IN lists into batches of N values. Avoids database IN-clause limits (MySQL recommends <1000 per query).' },
            { icon: '📋', title: 'SQL INSERT Generation', desc: 'Output a SQL INSERT ... VALUES (...) statement to bulk-load values into a temp table for JOIN operations.' },
            { icon: '🧹', title: 'Automatic Deduplication', desc: 'Duplicate values are silently removed before output. The count shows original vs cleaned total so you can spot duplicates in your source data.' },
            { icon: '🔗', title: 'Shareable Links', desc: 'Click Share URL to generate a shareable link that pre-loads your list. Send to a colleague without re-pasting.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use SQL IN Clause Generator">
          <UseCases cases={[
            { icon: '🛠️', title: 'Hotfix Queries', desc: 'Convert a list of affected user IDs from a bug report into a WHERE IN clause instantly — no manual formatting.' },
            { icon: '📊', title: 'Analytics & Reporting', desc: 'Turn a list of product IDs or order IDs from a spreadsheet into a SQL filter for your dashboard query.' },
            { icon: '🗃️', title: 'Data Migration', desc: 'Generate SQL INSERT statements to load staging IDs into a temp table, then JOIN to migrate related records.' },
            { icon: '🔧', title: 'ORM Debugging', desc: 'Convert raw IDs from an ORM log into a parameterized IN clause to reproduce and debug slow queries directly in your DB client.' },
            { icon: '🔌', title: 'API Batch Requests', desc: 'Convert an ID list to JSON or GraphQL format to call batch API endpoints without writing formatting code.' },
            { icon: '🧪', title: 'Test Data Setup', desc: 'Load a set of test IDs into a temp table or IN clause for integration tests against a populated database.' },
          ]} />
        </SEOSection>

        {/* Dialects */}
        <SEOSection id="dialects" heading="SQL Dialects — Quoting & Syntax by Database">
          <SEOProse>
            Each database has different identifier quoting and parameterized query syntax. Select the right dialect for correctly formatted output:
          </SEOProse>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Database</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">String quoting</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Parameterized</th>
                  <th className="pb-3 font-semibold text-zinc-700">IN clause limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['MySQL', "'single quotes'", '?', '~1000 recommended'],
                  ['PostgreSQL', "'single quotes'", '$1, $2, $3', 'No hard limit'],
                  ['SQL Server', "'single quotes'", '@p1, @p2', '~2100 parameters'],
                  ['Oracle', "'single quotes'", ':1, :2', '1000 hard limit'],
                  ['SQLite', "'single quotes'", '?', 'No hard limit'],
                ].map(([db, quoting, param, limit]) => (
                  <tr key={db}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{db}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{quoting}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{param}</td>
                    <td className="py-3 text-zinc-500">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert a list of IDs to a SQL IN clause?',
              a: 'Paste your IDs in any format (comma-separated, newline, JSON array, Excel paste). The tool auto-detects the format, removes duplicates, and outputs a ready-to-use SQL IN clause. Select your database dialect for correct quoting.',
            },
            {
              q: 'What input formats are supported?',
              a: 'Any format: 1,2,3 (comma-separated), one per line (newline), [1,2,3] (JSON array), tab-separated, or Excel copy-paste. Mixed formats are also handled — the tool normalizes them all.',
            },
            {
              q: 'Can I generate parameterized queries to prevent SQL injection?',
              a: 'Yes. Enable Parameterized in advanced options. Outputs ? for MySQL, $1/$2/$3 for PostgreSQL, @p1/@p2 for SQL Server — ready to bind with prepared statements or ORM parameter arrays.',
            },
            {
              q: 'What is range compression and when should I use it?',
              a: 'Range compression converts consecutive numeric ID sequences into BETWEEN clauses. id BETWEEN 1 AND 1000 is more efficient than IN (1,2,3,...,1000) for large consecutive ranges. Enable it when your IDs are mostly sequential.',
            },
            {
              q: 'How do I handle Oracle\'s 1000-item IN clause limit?',
              a: "Oracle raises ORA-01795 if an IN clause has more than 1000 items. Use the Chunk Size option (set to 1000) to split the list into multiple IN clauses connected with OR, or use range compression to compress consecutive IDs into BETWEEN clauses.",
            },
            {
              q: 'Is my data sent to a server?',
              a: 'No. All processing runs entirely in your browser. Your IDs and data never leave your machine. Safe for production IDs, internal data, and sensitive values.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate JSON query results returned from your API', icon: '{}' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff for two JSON payloads side by side', icon: '🔀' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for INSERT statements and test fixtures', icon: '🔑' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate MD5, SHA-256 checksums for query auditing', icon: '#️⃣' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/sql-in-clause-guide', label: 'SQL IN Clause — Complete Guide with Examples' },
            { href: '/blog/how-to-format-sql-online', label: 'How to Format SQL Queries Online' },
            { href: '/blog/sql-list-to-in-clause', label: 'Convert Any List (CSV, Excel, JSON) to SQL IN Clause' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="sql_formatter" />
    </>
  );
}
