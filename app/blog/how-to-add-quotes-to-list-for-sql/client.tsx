'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToAddQuotesToListForSqlClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Add Quotes to a List for SQL IN Clause (Instantly)</h1>
      <p className="lead">
        You have a list of IDs from Excel, a CSV export, or an API response. You need them in a SQL
        IN clause — single-quoted, comma-separated, wrapped in parentheses. Here is exactly how to do
        it in seconds without touching every value by hand.
      </p>

      <StatGrid
        stats={[
          { value: '1 click', label: 'Format any list to SQL IN', color: 'blue' },
          { value: 'Auto', label: 'Detect CSV, JSON, newline', color: 'green' },
          { value: '0 errors', label: 'No manual quoting mistakes', color: 'violet' },
        ]}
      />

      <SectionHeader number={1} title="The Problem: Manual Quoting Is Slow and Error-Prone" />
      <p>
        Imagine you have 50 user IDs from a spreadsheet. Your query needs them in this format:
      </p>
      <CodeBlock lang="sql" title="What you need">
{`SELECT * FROM users
WHERE id IN ('U001', 'U002', 'U003', 'U004', 'U005', ...)`}
      </CodeBlock>
      <p>
        Doing this manually means adding a single quote before and after each value, a comma between
        every pair, and parentheses around the whole thing. For 5 values it takes a minute. For 50 it
        takes ten. For 500 it is practically impossible without mistakes — a missing quote or trailing
        comma breaks the entire query.
      </p>
      <ErrorFix
        title="Adding quotes manually — what goes wrong"
        bad={`-- Common mistakes when adding quotes by hand
SELECT * FROM orders WHERE id IN (
  1001, 1002 1003,   -- Missing comma
  '1004", 1005,       -- Mixed quote types
  1006,,              -- Double comma
  1007                -- Missing closing paren
`}
        good={`-- What the formatter produces automatically
SELECT * FROM orders WHERE id IN (
  1001, 1002, 1003,
  1004, 1005, 1006,
  1007
);`}
        badLabel="Error-prone manual"
        goodLabel="Auto-formatted"
      />

      <SectionHeader number={2} title="How to Add Single Quotes to a List for SQL (Step by Step)" />
      <VerticalSteps
        steps={[
          {
            title: 'Copy your list of values',
            desc: 'Select the column from Excel or Google Sheets, copy from a CSV file, or grab the array from your JSON response. Any format works.',
          },
          {
            title: 'Open the SQL IN Clause Formatter',
            desc: 'Go to unblockdevs.com/sql-in-generator — it handles CSV, newline-separated, tab-separated, and JSON arrays automatically.',
            code: 'https://unblockdevs.com/sql-in-generator',
          },
          {
            title: 'Select "String quoted" and choose single quotes',
            desc: "In the Options panel, set Value type to 'String quoted' and make sure Single ' is selected. For numeric IDs that don't need quotes, choose Numeric.",
          },
          {
            title: 'Click Generate',
            desc: 'The tool adds single quotes around every value, joins them with commas, wraps in parentheses, and removes any duplicates.',
          },
          {
            title: 'Copy and paste into your query',
            desc: 'Click Copy and paste directly into your SQL editor. The IN clause is ready to run.',
            code: "WHERE user_id IN ('alice', 'bob', 'charlie', 'dave')",
          },
        ]}
      />
      <AlertBox type="tip" title="Try it now">
        Open the{' '}
        <a href="/sql-in-generator" className="underline font-medium">
          SQL IN Clause Formatter
        </a>{' '}
        — paste any list and get a properly quoted SQL IN clause in one click.
      </AlertBox>

      <SectionHeader number={3} title="How to Convert an Excel List to SQL IN Clause" />
      <p>
        The most common use case: you have a column of IDs in Excel or Google Sheets and need them in
        a SQL query. Here is the exact flow:
      </p>
      <VerticalSteps
        steps={[
          {
            title: 'Select the column in Excel',
            desc: 'Click on the first cell in your ID column, then Shift+Click the last cell to select all values.',
          },
          {
            title: 'Copy (Ctrl+C / Cmd+C)',
            desc: 'Excel copies values as newline-separated text — exactly the format the formatter expects.',
          },
          {
            title: 'Paste into the SQL IN Formatter',
            desc: 'The tool reads newline-separated values automatically. No manual cleanup needed.',
          },
          {
            title: 'Set value type and click Generate',
            desc: "Choose Numeric for integers or 'String quoted' for text IDs. The formatter outputs the complete IN clause.",
          },
        ]}
      />
      <QuickFact color="blue" label="Excel tip">
        Excel copies a column as values separated by newlines. The formatter treats each line as one
        value — so a 200-row Excel column becomes a 200-item SQL IN clause in one paste.
      </QuickFact>

      <SectionHeader number={4} title="Why Your SQL IN Clause Is Not Working (Common Formatting Errors)" />
      <p>
        If your SQL query is failing with a list of values, the problem is almost always one of these
        formatting mistakes:
      </p>
      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: "Missing quotes around strings",
            description: "String values like user names or codes must be wrapped in single quotes: 'alice'. Without quotes, SQL treats them as column names and throws an error.",
          },
          {
            title: 'Trailing comma at the end',
            description: "IN (1, 2, 3,) — that final comma before the closing parenthesis breaks every database. Easy to miss when building the list manually.",
          },
          {
            title: 'Mixed quote types',
            description: "Using double quotes \" where single quotes ' are required (or vice versa). MySQL tolerates both; PostgreSQL and Oracle do not.",
          },
          {
            title: 'Newlines inside the IN clause',
            description: 'Some editors insert newlines when you paste. SQL handles this, but some ORMs or query builders do not. Use the formatter to get a clean single-line or consistently formatted output.',
          },
          {
            title: 'Missing parentheses',
            description: 'WHERE id IN 1, 2, 3 fails. The parentheses are required: WHERE id IN (1, 2, 3). The formatter always wraps the list correctly.',
          },
          {
            title: 'Duplicates causing unexpected results',
            description: 'Duplicate IDs in an IN clause do not cause errors but waste query resources. The formatter removes duplicates automatically before generating the output.',
          },
        ]}
      />
      <ErrorFix
        title="String vs numeric quoting"
        bad={`-- Wrong: string values without quotes
SELECT * FROM products
WHERE sku IN (ABC123, DEF456, GHI789);
-- Error: column "ABC123" does not exist`}
        good={`-- Correct: string values with single quotes
SELECT * FROM products
WHERE sku IN ('ABC123', 'DEF456', 'GHI789');`}
        badLabel="Missing quotes (error)"
        goodLabel="Properly quoted"
      />

      <SectionHeader number={5} title="How to Format a Large List for SQL IN Clause (Oracle 1,000-Item Limit)" />
      <p>
        Oracle enforces a hard limit of 1,000 items per IN clause. If you try to run{' '}
        <code>WHERE id IN (1, 2, ..., 1500)</code> in Oracle, you get:{' '}
        <strong>ORA-01795: maximum number of expressions in a list is 1000</strong>.
      </p>
      <p>
        The formatter handles this automatically with the <strong>Chunk size</strong> option. Set chunk
        size to 1000 and it splits the list into multiple OR-connected IN blocks:
      </p>
      <CodeBlock lang="sql" title="Auto-chunked for Oracle (1000-item limit)">
{`SELECT * FROM orders
WHERE id IN (1, 2, 3, ..., 1000)
   OR id IN (1001, 1002, 1003, ..., 1500);`}
      </CodeBlock>
      <AlertBox type="info" title="MySQL and PostgreSQL">
        MySQL and PostgreSQL have no hard limit on IN clause size, but very large lists (10,000+ items)
        can hurt query planner performance. Consider using a temporary table or subquery for lists over
        a few thousand items.
      </AlertBox>

      <SectionHeader number={6} title="Parameterized SQL IN Clause (Prevent SQL Injection)" />
      <p>
        If user input ever determines the values in your IN clause, you must use parameterized queries.
        Never build a SQL IN clause by string-concatenating user data.
      </p>
      <ErrorFix
        title="Building SQL IN clause from user input"
        bad={`// NEVER do this — SQL injection risk
const ids = userInput.split(',');
const sql = \`SELECT * FROM users WHERE id IN (\${ids.join(',')})\`;
// Attacker input: "1) OR 1=1--" dumps entire table`}
        good={`// Safe: parameterized placeholders
const ids = [1, 2, 3, 4, 5];
const placeholders = ids.map((_, i) => \`$\${i + 1}\`).join(', ');
const sql = \`SELECT * FROM users WHERE id IN (\${placeholders})\`;
// Execute: db.query(sql, ids)`}
        badLabel="SQL injection risk"
        goodLabel="Parameterized (safe)"
      />
      <p>
        Enable the <strong>Parameterized</strong> toggle in the formatter to generate placeholders for
        your database:
      </p>
      <CodeBlock lang="sql" title="Parameterized output examples">
{`-- MySQL / SQLite
WHERE id IN (?, ?, ?, ?)

-- PostgreSQL
WHERE id IN ($1, $2, $3, $4)

-- SQL Server
WHERE id IN (@p1, @p2, @p3, @p4)`}
      </CodeBlock>

      <FAQAccordion
        items={[
          {
            question: 'How do I add single quotes to a list of values in SQL?',
            answer:
              "Paste your values into the SQL IN Clause Formatter at unblockdevs.com/sql-in-generator, set Value type to 'String quoted', select Single quote, and click Generate. The tool wraps every value in single quotes and joins them with commas automatically: 'value1', 'value2', 'value3'.",
          },
          {
            question: 'How do I convert a comma-separated list to a SQL IN clause?',
            answer:
              "Paste your comma-separated list (e.g. 1, 2, 3, 4) into the formatter. It auto-detects the CSV format, removes duplicates, and outputs a complete SQL IN clause: WHERE id IN (1, 2, 3, 4). No manual editing needed.",
          },
          {
            question: 'How do I convert an Excel column to SQL IN clause?',
            answer:
              'Select the cells in Excel, copy with Ctrl+C, and paste into the SQL IN Formatter. Excel copies values as newline-separated text, which the formatter reads directly. Set your value type and click Generate.',
          },
          {
            question: 'Why is my SQL IN clause not working?',
            answer:
              'The most common causes are: missing single quotes around string values, a trailing comma before the closing parenthesis, mixed quote types (double vs single), or missing parentheses. Use the formatter to generate a correctly structured IN clause that avoids all of these.',
          },
          {
            question: 'How do I format a large list for SQL IN clause in Oracle?',
            answer:
              "Oracle has a hard limit of 1,000 items per IN clause. Set the Chunk size option in the formatter to 1000 and it automatically splits your list into multiple OR-connected IN blocks: WHERE id IN (...1000 items...) OR id IN (...remaining items...).",
          },
          {
            question: 'Can I add double quotes instead of single quotes for SQL?',
            answer:
              "Yes. In the formatter, select Value type 'String quoted' then click Double \" to switch to double quotes. Note: most SQL databases use single quotes for string literals. Double quotes are typically reserved for column and table identifiers in standard SQL.",
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
