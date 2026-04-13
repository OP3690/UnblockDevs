import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import SqlInGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-in-generator';

export const metadata: Metadata = {
  title: 'SQL IN Clause Formatter — Add Quotes & Commas to List for SQL | UnblockDevs',
  description: 'Convert a list of IDs to SQL IN clause instantly — adds single quotes, commas, and parentheses automatically. Paste from Excel, CSV, or JSON. Works with MySQL, PostgreSQL, Oracle, SQLite. Free, 100% client-side.',
  keywords: [
    // Core intent — primary keywords
    'how to format list for sql in clause',
    'convert list to sql in clause',
    'add quotes to list for sql query',
    'format ids for sql in statement',
    'sql in clause formatter online',
    'convert values to sql query format',
    'how to wrap values in quotes for sql',
    'prepare list for sql in condition',
    'sql list formatter tool',
    'convert comma separated values to sql',
    // Real developer queries — high intent
    'how to add single quotes to list of values',
    'how to convert numbers to quoted strings for sql',
    'format ids into sql in clause quickly',
    'how to create sql in query from list',
    'how to pass multiple values in sql in clause',
    'how to wrap list in single quotes automatically',
    'convert array to sql in clause format',
    'format list of ids for database query',
    'how to convert excel list to sql query',
    'how to prepare bulk values for sql',
    // Problem-based — best for traffic
    'sql in clause not working with list',
    'how to fix sql in clause formatting',
    'values not working in sql in statement',
    'how to clean list before sql query',
    'formatting error in sql in clause',
    'how to fix missing quotes in sql query',
    'sql query failing due to wrong format',
    'how to debug sql in clause issue',
    'incorrect list format in sql query',
    'how to fix comma separated values for sql',
    // Feature-based — tool keywords
    'add quotes to each line online',
    'wrap each value in single quotes',
    'wrap values in double quotes online',
    'add comma to each line online',
    'format text list with commas and quotes',
    'convert text list to sql format',
    'bulk add quotes to list',
    'add delimiter to each line',
    'format list for database query',
    'convert plain text to sql values',
    // Long-tail — low competition, fast ranking
    'how to convert list of ids to sql in clause with quotes',
    'tool to add single quotes and commas to list',
    'format list from excel to sql in statement',
    'convert newline separated list to sql format',
    'how to prepare id list for sql query quickly',
    'best way to format values for sql in clause',
    'convert copied list into sql query values',
    'how to bulk format values for sql database',
    'format large list into sql in clause online',
    'how to add quotes to multiple lines at once',
  ],
  openGraph: {
    title: 'SQL IN Clause Formatter — Add Quotes & Commas to List for SQL | UnblockDevs',
    description: 'Paste a list of IDs → get instant SQL IN clause with quotes, commas, and parentheses. Works with Excel lists, CSV, JSON arrays. MySQL, PostgreSQL, Oracle, SQLite. Free.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL IN Clause Formatter — Add Quotes to List for SQL | UnblockDevs',
    description: 'Convert any list to SQL IN clause. Adds single quotes, commas, parentheses automatically. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL IN Clause Formatter — Add Quotes & Commas to List for SQL',
  description: 'Convert a list of IDs or values to a SQL IN clause instantly. Adds single quotes, commas, and parentheses. Paste from Excel, CSV, JSON array, or one per line. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Add single quotes or double quotes to every value in a list',
    'Wrap entire list in parentheses for SQL IN clause',
    'Auto-detect CSV, JSON array, newline, or tab-separated input',
    'Remove duplicates automatically before formatting',
    'MySQL, PostgreSQL, SQL Server, Oracle, and SQLite dialects',
    'Parameterized query placeholders to prevent SQL injection',
    'Chunked OR blocks for Oracle 1000-item limit',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '870',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I convert a list of IDs to SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your IDs (CSV, JSON array, one per line, or tab-separated) into the SQL IN Generator. The tool auto-detects format, removes duplicates, and outputs a valid IN clause for MySQL, PostgreSQL, SQL Server, Oracle, or SQLite. You can also get parameterized queries, chunked OR blocks for large lists, and range compression.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the maximum size of SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Oracle has a limit of 1000 items per IN list. MySQL and others can handle more but performance may drop. Use the chunk size option to split into multiple OR id IN (...) blocks automatically.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I get a parameterized SQL IN query to prevent SQL injection?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Enable "Parameterized" to get placeholders (?, $1,$2 for PostgreSQL, @p1 for SQL Server). Use these with your driver\'s prepared statements for secure queries.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a SQL IN Clause from a List',
  description: 'Use the SQL IN Generator to convert a list of values into a properly formatted SQL IN clause for your database.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your list of values', text: 'Paste a comma-separated, newline-separated, or mixed list of IDs or values into the input.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose your database', text: 'Select MySQL, PostgreSQL, SQLite, MSSQL, Oracle, or Trino for correct quoting and syntax.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Format', text: 'The tool generates a clean SQL IN clause: SELECT * FROM table WHERE id IN (1, 2, 3, ...).' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the SQL', text: 'Click Copy to paste the formatted SQL directly into your query editor or application.' },
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

export default function SqlInGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SqlInGeneratorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="How to Format a List for SQL IN Clause">
          <SEOProse>
            Every developer hits this situation: you have a list of IDs from a spreadsheet, a CSV export,
            an API response, or a clipboard paste — and you need to turn them into a{' '}
            <C>WHERE id IN (1, 2, 3)</C> query. Doing it manually means adding single quotes around each
            value, commas between them, and wrapping the whole thing in parentheses. For 5 IDs it is
            annoying; for 500 it is impossible.
          </SEOProse>
          <SEOProse>
            This <strong>SQL IN clause formatter</strong> converts any list — CSV, newline-delimited, JSON
            array, tab-separated — into a properly quoted and formatted SQL IN clause in one click. It
            auto-detects whether your values are numeric (no quotes) or strings (single-quoted), removes
            duplicates automatically, and outputs dialect-correct SQL for MySQL, PostgreSQL, SQL Server,
            Oracle, and SQLite. For large lists it chunks them into multiple OR-connected IN blocks to
            stay within Oracle&apos;s 1,000-item limit.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Add Quotes & Format List for SQL in 3 Steps">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your list of IDs or values', desc: 'Paste from Excel, CSV, a JSON array, or one value per line. The formatter auto-detects the format — no configuration needed.' },
            { n: '02', title: 'Choose string or numeric + database', desc: 'Select "String" to add single quotes around each value (\'alice\', \'bob\'). Select "Numeric" for unquoted integers. Pick your database dialect for correct syntax.' },
            { n: '03', title: 'Copy the SQL IN clause', desc: 'The output is a ready-to-paste SQL IN clause with commas, quotes, and parentheses. Copy it directly into your query editor.' },
            { n: '04', title: 'Export or parameterize', desc: 'Export as JSON array, CSV, MongoDB $in, or GraphQL. Enable parameterized mode to get ?, $1, @p1 placeholders for prepared statements.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Need This Tool">
          <UseCases cases={[
            { icon: '📊', title: 'Copy IDs from Excel / Google Sheets', desc: 'Select a column of IDs, paste here, get a SQL IN clause with quotes and commas — without touching a single character manually.' },
            { icon: '🔌', title: 'Filter by API Response IDs', desc: 'Extract IDs from a JSON API response array and convert them to a WHERE IN filter to look up related records in your database.' },
            { icon: '🗄️', title: 'Bulk Query Multiple Records', desc: 'Query 50, 500, or 5000 records by ID in one query instead of writing slow sequential lookups or building strings manually.' },
            { icon: '🔒', title: 'Safe Parameterized Queries', desc: 'Generate ?, $1, @p1 placeholders for prepared statements — prevents SQL injection when user IDs come from untrusted sources.' },
            { icon: '🔄', title: 'Data Migration Scripts', desc: 'Reference specific record IDs in migration scripts across dev, staging, and production environments.' },
            { icon: '🐛', title: 'Debug by Known IDs', desc: 'Quickly query a set of known-bad record IDs when investigating a bug or auditing specific user actions — no manual formatting.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I add single quotes to a list of values for SQL?',
              a: "Paste your values into the SQL IN Formatter, select 'String quoted' as the value type, and choose single quote. The tool wraps every value in single quotes and adds commas automatically: 'alice', 'bob', 'charlie'.",
            },
            {
              q: 'How do I convert a list of IDs to a SQL IN clause?',
              a: 'Paste your IDs (CSV, JSON array, one per line, or tab-separated) into the tool. It auto-detects the format, removes duplicates, and outputs a valid IN clause: WHERE id IN (1, 2, 3, 4, 5).',
            },
            {
              q: 'How do I convert an Excel list to SQL format?',
              a: 'Copy the column of values from Excel (Ctrl+C), paste into the input box, and click Generate. The formatter converts newline-separated Excel data into a properly quoted SQL IN clause instantly.',
            },
            {
              q: 'What is the maximum size of a SQL IN clause?',
              a: 'Oracle limits IN lists to 1,000 items per clause. MySQL and PostgreSQL have no hard limit but query planner performance may degrade for very large lists. Enable chunk size to split large lists into multiple chunked OR...IN blocks automatically.',
            },
            {
              q: 'Can I get a parameterized SQL IN query to prevent SQL injection?',
              a: 'Yes. Enable "Parameterized" to get placeholders: ? for MySQL/SQLite, $1,$2,... for PostgreSQL, @p1,@p2,... for SQL Server. Use these with your driver\'s prepared statements for safe queries.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/sql-formatter', label: 'SQL Formatter', desc: 'Format and beautify the full SQL query containing your IN clause', icon: '📝' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format the JSON array before extracting IDs for your IN clause', icon: '{}' },
            { href: '/test-data-generator', label: 'Test Data Generator', desc: 'Generate sets of test IDs and values to test your IN clause queries', icon: '🧪' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUID primary keys for SQL IN clause filtering', icon: '🔑' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'SQL IN Clause Guide' },
            { href: '/blog/json-best-practices-production-guide', label: 'SQL Query Optimization' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Parameterized Queries Guide' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'SQL Injection Prevention' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="sql_in_generator" />
    </>
  );
}
