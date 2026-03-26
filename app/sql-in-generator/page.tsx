import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import SqlInGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-in-generator';

export const metadata: Metadata = {
  title: 'SQL IN Clause Generator | UnblockDevs',
  description: 'Convert CSV, JSON, or IDs to SQL IN. Chunking, parameterized, range compression, INSERT. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  keywords: [
    'SQL IN clause generator',
    'convert list to SQL IN',
    'comma separated list to SQL',
    'SQL IN clause builder',
    'convert IDs to SQL IN',
    'SQL IN clause formatter',
    'list to SQL IN online',
    'MySQL IN clause generator',
    'PostgreSQL IN clause',
    'parameterized SQL IN',
  ],
  openGraph: {
    title: 'SQL IN Clause Generator | UnblockDevs',
    description: 'Convert any list to SQL IN clause. Auto-detect format, chunking, multi-database, parameterized, range compression. Free and client-side.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL IN Clause Generator',
  description: 'Convert CSV, JSON, or IDs to SQL IN. Chunking, parameterized, range compression, INSERT. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Auto-detect CSV, JSON array, newline, or tab-separated input',
    'MySQL, PostgreSQL, SQL Server, Oracle, and SQLite dialects',
    'Parameterized query placeholders to prevent SQL injection',
    'Chunked OR blocks for Oracle 1000-item limit',
    '100% client-side — no data sent to any server',
  ],
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

export default function SqlInGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SqlInGeneratorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a SQL IN Clause Generator?">
          <SEOProse>
            A <strong>SQL IN clause generator</strong> converts a list of values — IDs, names, codes — into a valid <C>WHERE id IN (1, 2, 3)</C> expression. Developers constantly need this when filtering by a set from a spreadsheet, a CSV export, a JSON array from an API, or a clipboard paste. Manually formatting lists wastes time and introduces errors like trailing commas or incorrect quoting.
          </SEOProse>
          <SEOProse>
            This tool auto-detects your input format (CSV, newline-delimited, JSON array, tab-separated), removes duplicates, handles quoting for string vs numeric types, and outputs dialect-specific SQL for MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. For large lists, it chunks them into multiple OR-connected IN clauses to stay within Oracle&apos;s 1000-item limit and other query planner constraints.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Generate SQL IN Clause in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your list', desc: 'Paste IDs, codes, or names in any format — CSV, JSON array, one per line, or tab-separated. The tool auto-detects the format.' },
            { n: '02', title: 'Configure options', desc: 'Choose your database dialect, value type (number/string/auto), chunk size for large lists, and whether to use parameterized placeholders.' },
            { n: '03', title: 'Get SQL output', desc: 'Copy the generated IN clause and paste into your query. Large lists are automatically split into chunked OR blocks to avoid database limits.' },
            { n: '04', title: 'Export other formats', desc: 'Also export as JSON array, CSV, MongoDB $in, or GraphQL list format for use in other contexts.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a SQL IN Generator">
          <UseCases cases={[
            { icon: '📋', title: 'Filter by Spreadsheet IDs', desc: 'Convert a column of IDs copied from Excel or Google Sheets into a SQL IN clause for a WHERE filter.' },
            { icon: '🔌', title: 'API Response Filtering', desc: 'Extract IDs from a JSON API response array and generate an IN clause to look up related records.' },
            { icon: '🗄️', title: 'Bulk Database Queries', desc: 'Query multiple records by ID without writing slow sequential queries or building strings manually.' },
            { icon: '🔒', title: 'Parameterized Queries', desc: 'Generate safe parameterized placeholders (?, $1, @p1) for prepared statements to prevent SQL injection.' },
            { icon: '🔄', title: 'Data Migration', desc: 'Generate IN clauses from migration scripts that reference specific record IDs across environments.' },
            { icon: '🐛', title: 'Debugging & Auditing', desc: 'Quickly query a set of known record IDs when investigating a bug or auditing specific user actions.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert a list of IDs to a SQL IN clause?',
              a: 'Paste your IDs (CSV, JSON array, one per line, or tab-separated) into the tool. It auto-detects the format, removes duplicates, and outputs a valid IN clause for your selected database dialect.',
            },
            {
              q: 'What is the maximum size of a SQL IN clause?',
              a: 'Oracle limits IN lists to 1000 items. MySQL and PostgreSQL have no hard limit but performance may degrade for very large lists. Use the chunk size option to split into multiple chunked OR blocks automatically.',
            },
            {
              q: 'Can I get a parameterized SQL IN query?',
              a: 'Yes. Enable "Parameterized" to get placeholders: ? for MySQL/SQLite, $1,$2 for PostgreSQL, @p1 for SQL Server. Use these with prepared statements to prevent SQL injection.',
            },
            {
              q: 'Does this handle string values?',
              a: "Yes. Select 'String' type and values are automatically single-quoted and escaped. Select 'Auto-detect' and the tool infers whether values are numeric or string based on the input.",
            },
            {
              q: 'Is my data sent to any server?',
              a: 'No. All processing runs in your browser. Your IDs and values never leave your device.',
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
      </ToolSEOContent>
      <ToolPageFooterBand toolName="sql_in_generator" />
    </>
  );
}
