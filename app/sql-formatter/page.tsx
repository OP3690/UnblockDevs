import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import SqlFormatterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-formatter';

export const metadata: Metadata = {
  title: 'SQL Formatter — Format SQL Online, SQL Beautifier & Pretty Printer | UnblockDevs',
  description:
    'Format messy SQL instantly. SQL beautifier and pretty printer for MySQL, PostgreSQL, SQLite, MSSQL, Oracle, Trino and more. Syntax highlighting, keyword casing, indentation — 100% in your browser.',
  keywords: [
    'sql formatter',
    'format sql online',
    'sql beautifier',
    'sql pretty printer',
    'format messy sql query',
    'clean sql queries instantly',
    'sql formatter online',
    'format sql query',
    'sql code formatter',
    'mysql formatter',
    'mysql query formatter',
    'postgresql formatter',
    'sql indentation tool',
  ],
  openGraph: {
    title: 'SQL Formatter — Format SQL Online, SQL Beautifier | UnblockDevs',
    description: 'Format messy SQL queries instantly. MySQL, PostgreSQL, SQLite, MSSQL, Oracle. Free online SQL beautifier.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs SQL Formatter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Formatter — Format SQL Online | UnblockDevs',
    description: 'Format messy SQL queries instantly. MySQL, PostgreSQL, SQLite, MSSQL support. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL Formatter',
  url: canonicalUrl,
  description: 'Format messy SQL queries instantly. MySQL, PostgreSQL, SQLite, MSSQL, Oracle, Trino support. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Format SQL with proper indentation',
    'Syntax highlighting',
    'Keyword capitalization control',
    'MySQL, PostgreSQL, SQLite, MSSQL, Oracle, Trino dialects',
    'Customizable tab/space indentation',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1650',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a SQL formatter and what does it do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A SQL formatter (also called SQL beautifier or pretty printer) automatically restructures SQL queries with proper indentation, keyword casing, and line breaks. It transforms a single-line or poorly spaced query into readable, consistently formatted SQL without changing the logic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which SQL dialects are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The formatter supports MySQL, PostgreSQL, SQLite, Microsoft SQL Server (MSSQL), Oracle, and Trino/Presto. Select your dialect before formatting to apply dialect-specific keyword and syntax rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my SQL data safe? Does it get sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely safe. All formatting runs in your browser using JavaScript. Your SQL queries are never sent to any server, making it safe to paste production queries, internal schemas, or sensitive business logic.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format SQL for a code review or pull request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your SQL into the formatter, choose your team\'s preferred dialect and indent size, then copy the formatted output. Consistently formatted SQL makes PR diffs cleaner because reviewers can focus on logic changes rather than whitespace differences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I format minified or one-liner SQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The formatter handles everything from completely minified one-liners to partially formatted queries. It will expand keywords, add newlines after clauses, and indent nested subqueries correctly regardless of the input formatting.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Format SQL Online',
  description: 'Step-by-step guide to formatting and beautifying SQL queries using the SQL Formatter.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your SQL or IDs', text: 'Paste a raw SQL query or a list of IDs (comma-separated, one per line, or mixed) into the input box.' },
    { '@type': 'HowToStep', position: 2, name: 'Select your database flavor', text: 'Choose MySQL, PostgreSQL, SQLite, MSSQL, Oracle, or Trino to match your target database.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Format or press ⌘+Enter', text: 'The formatter instantly produces a clean, indented SQL query or IN clause with proper syntax highlighting.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or download', text: 'Copy the formatted SQL to your clipboard or download it as a .sql file for use in your IDE or database client.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'SQL IN Generator', item: canonicalUrl },
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
        <SEOSection id="what" heading="What Is a SQL Formatter?">
          <SEOProse>
            A <strong>SQL formatter</strong> (also called a SQL beautifier or SQL pretty printer) automatically
            restructures SQL queries with consistent indentation, keyword casing, and line breaks. Paste a
            minified one-liner or a tangled query copied from a log file and get back clean, readable SQL in
            one click — without touching the logic.
          </SEOProse>
          <SEOProse>
            Unformatted SQL makes debugging harder, slows down code reviews, and increases the chance of missing
            a bug buried in a wall of unseparated clauses. A formatter enforces consistent style so your team
            can read, review, and maintain queries with confidence.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Format SQL in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your SQL', desc: 'Drop in any SQL — minified, partially formatted, or copied from a slow-query log.' },
            { n: '02', title: 'Choose dialect & style', desc: 'Pick MySQL, PostgreSQL, SQLite, MSSQL, or another dialect and set indent size and keyword case.' },
            { n: '03', title: 'Click Format', desc: 'The formatter restructures your query instantly in the browser — no server round-trip.' },
            { n: '04', title: 'Copy formatted SQL', desc: 'Copy the clean output for your PR, docs, ORM migration, or debugging session.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Format SQL">
          <UseCases cases={[
            { icon: '🔍', title: 'PR Reviews', desc: 'Format queries before committing so reviewers see logic changes, not whitespace noise.' },
            { icon: '🐛', title: 'Debugging Slow Queries', desc: 'Expand a minified query from a slow-query log to spot missing indexes or accidental cross joins.' },
            { icon: '📖', title: 'Learning SQL', desc: 'Prettify complex examples from Stack Overflow or docs to understand clause structure at a glance.' },
            { icon: '🔌', title: 'API & ORM Testing', desc: 'Inspect raw SQL emitted by ORMs like Hibernate, SQLAlchemy, or Prisma in a readable form.' },
            { icon: '📝', title: 'Documentation', desc: 'Include well-formatted SQL in runbooks, wikis, and README files for clarity.' },
            { icon: '🚀', title: 'Migration Scripts', desc: 'Clean up auto-generated migration SQL before committing to version control.' },
          ]} />
        </SEOSection>

        {/* Dialects */}
        <SEOSection id="dialects" heading="SQL Dialects Supported">
          <SEOProse>
            Different databases have different reserved words, quoting conventions, and function names. Select
            the correct dialect so the formatter applies the right rules:
          </SEOProse>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Dialect</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Identifier quoting</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">String literal</th>
                  <th className="pb-3 font-semibold text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['MySQL', '`backticks`', "'single quotes'", 'Case-insensitive keywords; supports LIMIT … OFFSET'],
                  ['PostgreSQL', '"double quotes"', "'single quotes'", 'Strict quoting; supports CTEs and window functions'],
                  ['SQLite', '"double quotes"', "'single quotes'", 'Lightweight; limited ALTER TABLE support'],
                  ['MSSQL', '[brackets]', "'single quotes'", 'T-SQL dialect; uses TOP instead of LIMIT'],
                  ['Oracle', '"double quotes"', "'single quotes'", 'PL/SQL; uses ROWNUM for pagination'],
                  ['Trino / Presto', '"double quotes"', "'single quotes'", 'Distributed SQL; ANSI-compliant with extensions'],
                ].map(([dialect, quoting, strings, notes]) => (
                  <tr key={dialect}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{dialect}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{quoting}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600">{strings}</td>
                    <td className="py-3 text-zinc-500">{notes}</td>
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
              q: 'What is a SQL formatter and what does it do?',
              a: 'A SQL formatter automatically restructures SQL queries with proper indentation, keyword casing, and line breaks. It transforms a minified or poorly spaced query into readable, consistently formatted SQL without changing the logic.',
            },
            {
              q: 'Which SQL dialects are supported?',
              a: 'MySQL, PostgreSQL, SQLite, Microsoft SQL Server (MSSQL), Oracle, and Trino/Presto. Select your dialect before formatting to apply dialect-specific keyword and syntax rules.',
            },
            {
              q: 'Is my SQL safe? Does it get sent to a server?',
              a: 'Completely safe. All formatting runs in your browser. Your SQL queries are never sent to any server, making it safe to paste production queries, internal schemas, or sensitive business logic.',
            },
            {
              q: 'How do I format SQL for a code review or pull request?',
              a: "Paste your SQL, choose your dialect and indent size, then copy the output. Consistently formatted SQL makes PR diffs cleaner because reviewers focus on logic changes rather than whitespace differences.",
            },
            {
              q: 'Can I format minified or one-liner SQL?',
              a: 'Yes. The formatter handles everything from fully minified one-liners to partially formatted queries. It expands keywords, adds newlines after clauses, and indents nested subqueries correctly regardless of input formatting.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format JSON query results returned from your API', icon: '{}' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff for two JSON payloads side by side', icon: '🔀' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate MD5, SHA-256 checksums for query auditing', icon: '#️⃣' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for INSERT statements and test data', icon: '🔑' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="sql_formatter" />
    </>
  );
}
