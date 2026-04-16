import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import SqlInClauseGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-in-clause-generator';

export const metadata: Metadata = {
  title: 'SQL IN Clause Generator — Convert Any List to SQL IN, JSON, CSV & More | UnblockDevs',
  description:
    'Convert any list of IDs, emails, or UUIDs into a SQL IN clause instantly. Auto-detect format (CSV, JSON, Excel, newline). MySQL, PostgreSQL, SQL Server, Oracle, SQLite. Parameterized queries, range compression, SQL INSERT, chunking. 100% browser-based.',
  keywords: [
    'sql in clause generator',
    'sql in clause generator online',
    'convert list to sql in clause',
    'list to sql in clause online',
    'csv to sql in clause',
    'excel to sql in clause',
    'json to sql in clause',
    'sql where in clause generator',
    'mysql in clause generator',
    'postgresql in clause generator',
    'sql in list generator',
    'ids to sql in clause',
    'generate sql in clause from list',
    'bulk ids sql query generator',
    'sql in clause formatter',
    'sql parameterized query generator',
    'sql insert generator from list',
    'sql in clause online tool',
    'add quotes commas to list sql',
    'format list for sql query',
    'generate sql in clause',
    'paste list to sql',
    'sql where in generator',
    'sql in clause online free',
    'sql in values',
    'build sql in clause',
    'sql in clause from text',
    'sql quote list',
    'sql in clause numbers',
    'sql in clause strings',
    'sql in clause limit',
    'sql in clause performance',
    'sql in vs join',
    'sql in vs exists',
    'sql not in clause',
    'sql in clause null',
    'sql in clause postgresql',
    'sql in clause mysql',
    'sql in clause mssql',
    'sql in clause bigquery',
    'sql in clause snowflake',
    'batch sql query',
    'sql in parameterized query',
    'parameterized sql in',
    'sql in clause python',
    'sql in clause java',
    'sql in clause node js',
    'generate sql from list',
    'list to where clause',
    'excel column to sql in',
    'batch select sql',
    'sql in clause generator free',
    'generate sql in list online',
    'convert list to sql in',
    'sql in clause from csv',
    'sql in clause from excel',
    'sql in clause from newline',
    'sql in clause formatter',
    'sql in clause builder',
    'sql in clause tool online',
    'sql where in list generator',
    'sql ids to in clause',
    'sql comma separated list',
    'values to sql in clause',
    'copy paste list to sql',
    'sql in clause no signup',
    'sql in list generator browser',
    'sql in clause free tool',
  ],
  openGraph: {
    title: 'SQL IN Clause Generator — Convert Any List to SQL IN Online | UnblockDevs',
    description: 'Paste any list (CSV, Excel, JSON, newline) → get a SQL IN clause, parameterized query, JSON array, CSV, GraphQL, or MongoDB filter. MySQL, PostgreSQL, Oracle, SQLite. Free.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs SQL IN Clause Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL IN Clause Generator — Any List to SQL IN Online | UnblockDevs',
    description: 'Auto-detect CSV, JSON, Excel, newline → SQL IN clause. Parameterized, chunked, range compression. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL IN Clause Generator',
  url: canonicalUrl,
  description: 'Convert any list of IDs, emails, or UUIDs into a SQL IN clause. Auto-detect CSV, JSON array, Excel paste, newline. MySQL, PostgreSQL, SQL Server, Oracle, SQLite. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Auto-detect CSV, JSON array, Excel paste, newline, tab-separated input',
    'Auto-detect numeric vs string value type',
    'SQL IN clause for MySQL, PostgreSQL, SQL Server, Oracle, SQLite',
    'Parameterized query generation (?, $1, @p1, :1)',
    'Range compression with BETWEEN for consecutive IDs',
    'Chunk splitting for Oracle 1000-item limit',
    'JSON array, CSV, GraphQL, MongoDB output formats',
    'SQL INSERT statement generation',
    'Drag & drop file import (.txt, .csv, .json)',
    'Sort values ascending or descending',
    'Quick presets for common workflows',
    'Real-time stats: unique count, duplicates, min/max/avg',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2400',
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
        text: 'Paste your IDs (comma-separated, newline, JSON array, or Excel paste) into the input. The tool auto-detects the format and value type, removes duplicates, and generates a ready-to-use SQL IN clause. Select your database (MySQL, PostgreSQL, SQL Server, Oracle, SQLite) for correct quoting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate parameterized SQL IN queries to prevent SQL injection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enable Parameterized in the options. The tool generates ? for MySQL, $1/$2/$3 for PostgreSQL, @p1/@p2 for SQL Server, :1/:2 for Oracle — ready to use with prepared statements and ORM parameter binding.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle Oracle\'s 1000-item IN clause limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set Chunk Size to 1000. The tool splits the list into multiple IN clauses connected with OR automatically. Alternatively, enable Range Compression to use BETWEEN clauses for consecutive integer IDs, which compresses thousands of IDs into just a few conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What input formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any format: comma-separated (1,2,3), newline-separated (one per line), JSON arrays ([1,2,3]), tab-separated, Excel copy-paste, or mixed. The tool auto-detects and normalizes all formats. You can also drag and drop .txt, .csv, or .json files directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing runs entirely in your browser. Your IDs, emails, and data never leave your machine. Safe for production IDs, internal data, and sensitive values.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The SQL IN clause is used in a WHERE condition to filter rows by matching a column against a list of values. For example: SELECT * FROM users WHERE id IN (1, 2, 3) returns only rows whose id is 1, 2, or 3. It is equivalent to multiple OR conditions but more concise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit to how many values SQL IN can take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Limits vary by database. Oracle has a hard limit of 1000 items per IN list. SQL Server is limited by the maximum 2100 query parameters. MySQL and PostgreSQL have no hard limits but performance degrades with very large lists. Use the Chunk Size option to split large lists and stay within safe bounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between IN and EXISTS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IN is used with a static list of values or a subquery returning a single column. EXISTS uses a correlated subquery and short-circuits as soon as one match is found. EXISTS generally performs better when the subquery returns many rows, while IN is simpler and faster for short static lists.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between IN and JOIN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IN filters rows based on a list of values and returns each matching row once. JOIN combines rows from two tables and can return duplicates if multiple rows match. Use IN for simple existence checks; use JOIN when you need columns from the related table or need to handle duplicates explicitly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use SQL NOT IN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NOT IN excludes rows whose column value appears in the specified list: SELECT * FROM users WHERE id NOT IN (1, 2, 3). Be careful with NULL values — if the IN list contains NULL, NOT IN returns no rows because NULL comparisons are unknown in SQL. Use NOT EXISTS as a safer alternative.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle NULL in SQL IN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NULL values in a SQL IN list can cause unexpected results. IN (1, NULL, 3) will match 1 and 3 but not rows with a NULL column. NOT IN with NULL in the list returns zero rows. Always filter NULLs from your list before generating an IN clause, or use IS NULL checks separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a CSV list to a SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your CSV values (e.g. 1,2,3,4,5) into the generator. The tool auto-detects comma-separated format, removes duplicates, adds appropriate quoting for string values, and outputs a complete WHERE id IN (1,2,3,4,5) clause ready to paste into your database client.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I avoid SQL injection with IN clauses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use parameterized queries. Enable the Parameterized option to generate ? for MySQL, $1/$2/$3 for PostgreSQL, or @p1/@p2 for SQL Server. Pass the values as a parameter array to your prepared statement or ORM query. Never interpolate raw user input directly into a SQL IN clause string.',
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
    { '@type': 'HowToStep', position: 1, name: 'Paste or drop your list', text: 'Paste IDs in any format — or drag and drop a .txt, .csv, or .json file. Auto-detect handles CSV, newline, JSON array, and Excel paste.' },
    { '@type': 'HowToStep', position: 2, name: 'Review auto-detected settings', text: 'The tool auto-detects numeric vs string value type. Adjust the database dialect and output format as needed.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Generate', text: 'Click Generate or press ⌘+Enter. Duplicates are removed, values are sorted if requested, and the SQL IN clause appears instantly with real-time stats.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or download', text: 'Copy to clipboard, download as .sql/.csv/.json, or share via URL. When chunked output is generated, each chunk has its own copy button.' },
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

export default function SqlInClauseGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SqlInClauseGeneratorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a SQL IN Clause Generator?">
          <SEOProse>
            A <strong>SQL IN clause generator</strong> converts any list of values — IDs, emails, UUIDs,
            alphanumeric codes — into a correctly formatted <C>WHERE id IN (...)</C> clause ready to paste
            directly into your database client, ORM query, or migration script. It handles format detection,
            deduplication, quoting, and dialect-specific syntax automatically.
          </SEOProse>
          <SEOProse>
            Manually formatting large lists of IDs is error-prone. A single misplaced quote or comma breaks
            your entire query. Paste any format — CSV, Excel, JSON array, newline — and get production-ready
            SQL in under a second, with options for parameterized queries, range compression, SQL INSERT mode,
            JSON arrays, CSV, GraphQL, and MongoDB filters.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Generate SQL IN Clause in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or drop any list', desc: 'Paste IDs in any format or drag & drop a .txt, .csv, or .json file. Auto-detect handles CSV, JSON array, Excel paste, newline, and tab-separated.' },
            { n: '02', title: 'Auto-detect & configure', desc: 'Value type (numeric/string) is auto-detected. Adjust database dialect, output format, and advanced options as needed.' },
            { n: '03', title: 'Generate & copy', desc: 'Click Generate (⌘+Enter). Duplicates removed. Stats shown. Copy the IN clause, parameterized query, or alternative format.' },
          ]} />
        </SEOSection>

        <SEOSection id="formats" heading="Output Formats — One List, Five Outputs">
          <SEOProse>Switch output format without re-pasting your data:</SEOProse>
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
                  ['SQL IN', 'WHERE id IN (1, 2, 3)', 'Direct use in SQL WHERE clauses'],
                  ['JSON', '{"ids": [1, 2, 3]}', 'API payloads, JSON config, request bodies'],
                  ['CSV', '1,2,3', 'Spreadsheet import, reports, data pipelines'],
                  ['GraphQL', 'query { users(ids: [1,2,3]) { ... } }', 'GraphQL filter variables'],
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

        <SEOSection id="advanced" heading="Advanced Features">
          <UseCases cases={[
            { icon: '🤖', title: 'Auto-detect value type', desc: 'Automatically switches between Numeric and String modes based on your input content — no manual selection needed for most lists.' },
            { icon: '📂', title: 'Drag & drop file import', desc: 'Drop a .txt, .csv, or .json file directly onto the input area. The tool reads the file and parses it without any manual copying.' },
            { icon: '📊', title: 'Real-time input stats', desc: 'See raw count, unique count, duplicates removed, and for numeric IDs: min, max, average, and range — updated instantly as you type.' },
            { icon: '🔢', title: 'Range compression (BETWEEN)', desc: 'Consecutive numeric IDs compressed into BETWEEN clauses: id BETWEEN 1 AND 1000. Shorter queries, better index use, solves Oracle 1000 limit.' },
            { icon: '🔒', title: 'Parameterized queries', desc: 'Generate ?, $1/$2/$3, @p1, or :1 placeholders. Prevents SQL injection — safe for production with prepared statements.' },
            { icon: '📦', title: 'Chunk splitting', desc: 'Split huge lists into OR-connected batches of N values. Avoids Oracle 1000-item limit and MySQL performance degradation.' },
            { icon: '📋', title: 'SQL INSERT generation', desc: 'Output INSERT ... VALUES (...) to bulk-load values into a temp table for JOIN operations on large datasets.' },
            { icon: '⚡', title: 'Quick presets', desc: 'One-click presets for MySQL safe, PostgreSQL ANY(), Oracle chunked, and parameterized queries — configure all options instantly.' },
          ]} />
        </SEOSection>

        <SEOSection id="dialects" heading="Database Dialects — Correct Syntax for Every DB">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Database</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Parameterized</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">IN limit</th>
                  <th className="pb-3 font-semibold text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['MySQL', '?', '~1000 recommended', 'Use ANY() alternative in newer versions'],
                  ['PostgreSQL', '$1, $2, $3', 'No hard limit', 'Use ANY($1) for unlimited array param'],
                  ['SQL Server', '@p1, @p2', '~2100 parameters', 'Use TVP for very large lists'],
                  ['Oracle', ':1, :2', '1000 hard limit', 'Use chunk=1000 or BETWEEN ranges'],
                  ['SQLite', '?', 'No hard limit', 'No parameterized IN — use separate binds'],
                ].map(([db, param, limit, notes]) => (
                  <tr key={db}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{db}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{param}</td>
                    <td className="py-3 pr-4 text-zinc-600">{limit}</td>
                    <td className="py-3 text-zinc-500">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use This">
          <UseCases cases={[
            { icon: '🛠️', title: 'Hotfix queries', desc: 'Convert affected user IDs from a bug report into a WHERE IN clause — no manual formatting.' },
            { icon: '📊', title: 'Analytics & reporting', desc: 'Turn product IDs from a spreadsheet into a SQL filter for your dashboard query in seconds.' },
            { icon: '🗃️', title: 'Data migration', desc: 'Generate SQL INSERT to load staging IDs into a temp table, then JOIN to migrate related records.' },
            { icon: '🔧', title: 'ORM debugging', desc: 'Convert raw IDs from an ORM log into a parameterized IN clause to reproduce slow queries in your DB client.' },
            { icon: '🔌', title: 'API batch requests', desc: 'Convert ID lists to JSON or GraphQL format to call batch endpoints without writing formatting code.' },
            { icon: '🧪', title: 'Test data setup', desc: 'Load test IDs into a temp table or IN clause for integration tests against a populated database.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert a list of IDs to a SQL IN clause?',
              a: 'Paste your IDs in any format (comma-separated, newline, JSON array, Excel paste). The tool auto-detects format and value type, removes duplicates, and outputs a ready-to-use SQL IN clause. Select your database for correct quoting.',
            },
            {
              q: 'What input formats are supported?',
              a: 'Any format: 1,2,3 (comma-separated), one per line (newline), [1,2,3] (JSON array), tab-separated, Excel copy-paste, or mixed. You can also drag and drop .txt, .csv, or .json files.',
            },
            {
              q: 'Can I generate parameterized queries to prevent SQL injection?',
              a: 'Yes. Enable Parameterized. Outputs ? for MySQL, $1/$2/$3 for PostgreSQL, @p1/@p2 for SQL Server, :1/:2 for Oracle — ready to bind with prepared statements.',
            },
            {
              q: 'How do I handle Oracle\'s 1000-item IN clause limit?',
              a: 'Set Chunk Size to 1000. The tool splits the list into OR-connected IN clauses automatically. Or enable Range Compression to convert consecutive IDs into BETWEEN clauses.',
            },
            {
              q: 'Is my data sent to a server?',
              a: 'No. All processing runs in your browser. Your IDs never leave your machine.',
            },
            {
              q: 'What is the SQL IN clause?',
              a: 'The SQL IN clause filters rows by matching a column against a list of values. SELECT * FROM users WHERE id IN (1,2,3) returns only rows whose id matches 1, 2, or 3.',
            },
            {
              q: 'Is there a limit to how many values SQL IN can take?',
              a: 'Oracle has a hard limit of 1000 items. SQL Server is limited by 2100 parameters. MySQL and PostgreSQL have no hard limits but performance degrades with very large lists. Use Chunk Size to split large lists.',
            },
            {
              q: 'What is the difference between IN and EXISTS?',
              a: 'IN is used with a static list or subquery. EXISTS uses a correlated subquery and short-circuits on first match. EXISTS generally performs better when the subquery returns many rows.',
            },
            {
              q: 'What is the difference between IN and JOIN?',
              a: 'IN filters rows based on a list and returns each row once. JOIN combines rows from two tables and can return duplicates. Use IN for existence checks; use JOIN when you need columns from the related table.',
            },
            {
              q: 'How do I use SQL NOT IN?',
              a: 'NOT IN excludes rows whose column appears in the specified list. Be careful with NULL — if the IN list contains NULL, NOT IN returns no rows. Use NOT EXISTS as a safer alternative.',
            },
            {
              q: 'How do I handle NULL in SQL IN?',
              a: 'NULL values in the IN list can cause unexpected results. NOT IN with NULL in the list returns zero rows. Always filter NULLs from your list before generating an IN clause.',
            },
            {
              q: 'How do I convert a CSV list to a SQL IN clause?',
              a: 'Paste your CSV values (e.g. 1,2,3,4,5) into the generator. The tool auto-detects comma-separated format, removes duplicates, and outputs a complete WHERE id IN (...) clause.',
            },
            {
              q: 'How do I avoid SQL injection with IN clauses?',
              a: 'Enable the Parameterized option to generate ? for MySQL, $1/$2/$3 for PostgreSQL, or @p1/@p2 for SQL Server. Never interpolate raw user input directly into a SQL IN clause string.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format JSON results returned from your API', icon: '{}' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff for two JSON payloads side by side', icon: '🔀' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for INSERT statements and test fixtures', icon: '🔑' },
            { href: '/sql-in-generator', label: 'SQL IN Formatter (Simple)', desc: 'Simpler version for quick list-to-IN conversions', icon: '📝' },
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

      <ToolPageFooterBand toolName="sql_in_clause_generator" />
    </>
  );
}
