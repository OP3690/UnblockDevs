import type { Metadata } from 'next';
import SqlSyntaxErrorFixClient from './client';

export const metadata: Metadata = {
  title: 'Fix SQL Syntax Error — Common Mistakes & Solutions | UnblockDevs',
  description:
    'Fix SQL syntax errors: missing quotes, reserved word conflicts, comma errors, and JOIN mistakes. Includes examples for MySQL, PostgreSQL, and SQLite.',
  keywords: [
    'sql syntax error fix',
    'sql error near fix',
    'sql unexpected token',
    'mysql syntax error',
    'postgresql syntax error',
    'sql missing comma',
    'sql reserved word error',
    'sql string not quoted',
    'sql join error',
    'sql where clause error',
    'sql group by error',
    'sql subquery error',
    'sql syntax error line 1',
    'fix sql query',
    'sql error debugging',
    'sql invalid column name',
    'sql having clause',
    'sql order by error',
    'sql null comparison error',
    'sql escape single quote',
    'sql trailing comma error',
    'sql subquery alias missing',
  ],
  openGraph: {
    title: 'Fix SQL Syntax Error — Common Mistakes & Solutions | UnblockDevs',
    description:
      'Fix SQL syntax errors: missing quotes, reserved word conflicts, comma errors, and JOIN mistakes. Includes examples for MySQL, PostgreSQL, and SQLite.',
    type: 'website',
    url: 'https://unblockdevs.com/sql-syntax-error-fix',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix SQL Syntax Errors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix SQL Syntax Error — Common Mistakes | UnblockDevs',
    description: 'Fix SQL syntax errors: missing quotes, reserved words, comma errors, JOIN issues, WHERE vs HAVING, and more.',
  },
  alternates: { canonical: 'https://unblockdevs.com/sql-syntax-error-fix' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL Syntax Error Fix Guide',
  url: 'https://unblockdevs.com/sql-syntax-error-fix',
  description:
    'Complete guide to fixing SQL syntax errors — reserved words, missing quotes, comma mistakes, JOIN errors, WHERE vs HAVING, NULL comparisons, and more.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1120',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What does 'syntax error near' mean in SQL?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The 'syntax error near' message tells you the token or word immediately after the point where the parser lost track of valid SQL. Read the token shown in the error and look at what precedes it — a missing comma, unclosed quote, or reserved word used as an identifier is usually the cause.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix a reserved word conflict in SQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wrap the reserved word in backticks for MySQL (e.g., `order`, `group`) or in double quotes for PostgreSQL and SQLite (e.g., "order", "group"). Better practice is to rename the column or table to avoid the conflict entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my SQL string comparison fail?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "String literals in SQL must be wrapped in single quotes: WHERE name = 'Alice'. Without quotes, the parser treats Alice as a column name and may raise a syntax error or return wrong results. Double quotes are for identifiers (column/table names), not values.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I debug a SQL syntax error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Start by reading the error message — it usually names the unexpected token. Then: (1) format the query to make structure visible, (2) check for missing commas between SELECT columns, (3) verify all strings use single quotes, (4) check reserved words are escaped, (5) confirm GROUP BY columns match SELECT, and (6) verify JOIN ON clauses reference correct table aliases.",
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between WHERE and HAVING?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WHERE filters individual rows before grouping and cannot use aggregate functions (SUM, COUNT, AVG, etc.). HAVING filters groups after GROUP BY and can use aggregate functions. Using an aggregate function in WHERE is a syntax error — move it to HAVING.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Debug a SQL Syntax Error in 4 Steps',
  description: 'Step-by-step guide to finding and fixing SQL syntax errors in MySQL, PostgreSQL, and SQLite.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Read the error message — note the token shown',
      text: 'SQL engines say "syntax error near X" or "unexpected token X". The token shown is the first character the parser could not understand. Look at what comes immediately before it.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Format your query to reveal structure',
      text: 'Run your query through a SQL formatter so each clause is on its own line. Structural problems like missing commas, wrong GROUP BY columns, and orphaned clauses become immediately visible.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Check common culprits: commas, quotes, and reserved words',
      text: 'Verify: (1) every column in SELECT is separated by a comma, (2) string values use single quotes, (3) column/table names that are reserved words are escaped with backticks or double quotes.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Run a minimal version of the query first',
      text: 'Reduce the query to its simplest form — SELECT * FROM table — and add clauses back one at a time until the error reappears. This isolates the exact clause causing the problem.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Fix SQL Syntax Error', item: 'https://unblockdevs.com/sql-syntax-error-fix' },
  ],
};

export default function SqlSyntaxErrorFixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SqlSyntaxErrorFixClient />
    </>
  );
}
