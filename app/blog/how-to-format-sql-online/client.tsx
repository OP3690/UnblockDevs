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

export default function HowToFormatSqlOnlineClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Format SQL Online — Beautify, Indent &amp; Clean SQL Queries Instantly</h1>
      <p className="lead">
        Unformatted SQL is hard to read, harder to debug, and nearly impossible to review in a pull
        request. A SQL formatter instantly restructures messy queries with consistent indentation,
        keyword casing, and clause separation — without changing any logic. This guide covers how
        SQL formatting works, what good SQL style looks like, how to format SQL IN clause lists and
        subqueries, and the best online tools for doing it in one click.
      </p>

      <StatGrid stats={[
        { value: '1 click', label: 'Paste messy SQL → click Format → get clean, readable SQL instantly', color: 'blue' },
        { value: 'UPPERCASE', label: 'SQL keywords in uppercase is the most widely adopted convention', color: 'green' },
        { value: '100%', label: 'Formatting never changes query logic — only whitespace and casing', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Why Format SQL? The Real Reasons Developers Do It" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Readable queries debug faster',
          description:
            'When every clause starts on its own line with consistent indentation, you can scan a 50-line query in seconds. A wall of unseparated SQL hides bugs — a missing JOIN condition, an accidental cross join, or a WHERE clause that applies to the wrong subquery.',
        },
        {
          title: 'Cleaner pull request diffs',
          description:
            'Formatting SQL before committing means git diff shows logic changes, not whitespace noise. Reviewers can focus on whether the JOIN is correct, not whether a keyword is on the right line.',
        },
        {
          title: 'ORM output is unreadable',
          description:
            'Django ORM, Hibernate, SQLAlchemy, and Prisma all emit SQL as a single line with minimal whitespace. Paste that into a formatter to understand what query your ORM is actually running — essential for N+1 debugging and performance optimization.',
        },
        {
          title: 'Consistent team style',
          description:
            'Formatter enforces a single style across the team without discussion. Uppercase keywords, 2-space or 4-space indentation, one clause per line — these are configured once in the formatter and applied consistently to every query.',
        },
      ]} />

      <SectionHeader number={2} title="SQL Formatting Rules — What Good SQL Style Looks Like" />

      <ErrorFix
        title="Unformatted SQL vs properly formatted SQL"
        bad={`-- Hard to read — everything on one line or inconsistently spaced
select u.id,u.name,u.email,o.total from users u inner join orders o on u.id=o.user_id where o.status in ('shipped','delivered') and o.total>100 order by o.total desc limit 50`}
        good={`-- Formatted — clear clause structure, readable at a glance
SELECT
  u.id,
  u.name,
  u.email,
  o.total
FROM users u
INNER JOIN orders o
  ON u.id = o.user_id
WHERE
  o.status IN ('shipped', 'delivered')
  AND o.total > 100
ORDER BY o.total DESC
LIMIT 50;`}
        badLabel="Unformatted — single line, lowercase, no indentation"
        goodLabel="Formatted — one clause per line, indented columns, UPPERCASE keywords"
      />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Keywords in UPPERCASE',
          description:
            'SQL keywords (SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT) in UPPERCASE is the most common convention. It visually separates SQL structure from table and column names.',
        },
        {
          title: 'One clause per line',
          description:
            'Each major clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, LIMIT) starts on its own line. This makes it easy to comment out a clause, add a clause, or scan the query structure at a glance.',
        },
        {
          title: 'Indented column lists',
          description:
            'Columns in SELECT are indented and one per line for long SELECT lists. This makes it easy to add or remove a column, and shows the exact shape of the result set.',
        },
        {
          title: 'JOIN conditions indented under JOIN',
          description:
            'ON conditions are indented under the JOIN clause that introduces them. This makes it clear which ON belongs to which JOIN in multi-join queries.',
        },
      ]} />

      <SectionHeader number={3} title="Formatting SQL IN Clause Lists" />
      <p>
        Long IN clause lists are one of the most common formatting challenges. A list of 100 IDs on a
        single line is unreadable. The two accepted conventions:
      </p>

      <CodeBlock lang="sql" title="SQL IN clause formatting — horizontal vs vertical">
{`-- ---- Horizontal (short lists — 5 items or fewer) ----
SELECT * FROM users
WHERE id IN (1, 2, 3, 4, 5);

-- ---- Vertical (long lists — easier to diff and modify) ----
SELECT * FROM orders
WHERE status IN (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'return_requested',
  'refunded'
);

-- ---- Very long ID lists — use a comment to describe the source ----
SELECT * FROM users
WHERE id IN (
  -- User IDs from bug report JIRA-4521 (affected batch, 2026-04-10)
  1001, 1002, 1003, 1007, 1012,
  1015, 1018, 1022, 1031, 1044
);`}
      </CodeBlock>

      <SectionHeader number={4} title="Formatting Subqueries and CTEs" />

      <CodeBlock lang="sql" title="Subquery and CTE formatting conventions">
{`-- ---- Correlated subquery — indent the subquery body ----
SELECT *
FROM orders o
WHERE o.customer_id IN (
  SELECT id
  FROM customers
  WHERE country = 'US'
    AND created_at > '2026-01-01'
);

-- ---- CTE (Common Table Expression) — align WITH and SELECT ----
WITH monthly_revenue AS (
  SELECT
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    SUM(total) AS revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY DATE_FORMAT(created_at, '%Y-%m')
),
top_months AS (
  SELECT month
  FROM monthly_revenue
  WHERE revenue > 100000
)
SELECT *
FROM monthly_revenue
WHERE month IN (SELECT month FROM top_months)
ORDER BY month DESC;`}
      </CodeBlock>

      <SectionHeader number={5} title="How to Format SQL Online — Step by Step" />

      <VerticalSteps steps={[
        {
          title: 'Go to unblockdevs.com/sql-formatter',
          desc: 'The SQL IN Clause Generator and formatter is at unblockdevs.com/sql-formatter. No account, no install, runs entirely in your browser.',
        },
        {
          title: 'Paste your raw SQL or ID list',
          desc: 'Paste a messy SQL query, a list of IDs, a JSON array, or anything copied from a log file. The tool auto-detects the input format.',
        },
        {
          title: 'Select your database dialect',
          desc: 'Choose MySQL, PostgreSQL, SQL Server, Oracle, or SQLite. The formatter applies the correct quoting conventions and syntax for your database.',
        },
        {
          title: 'Choose output format',
          desc: 'For SQL IN clause: choose SQL IN (with or without the full SELECT). For ID lists: choose JSON array, CSV, GraphQL filter, or MongoDB query format.',
        },
        {
          title: 'Click Format (or press ⌘+Enter)',
          desc: 'The formatted output appears instantly. Copy to clipboard or download as .sql, .csv, or .json.',
        },
      ]} />

      <SectionHeader number={6} title="SQL Formatting in Your Code Editor (VS Code, JetBrains)" />

      <CodeBlock lang="bash" title="Format SQL in VS Code and JetBrains IDEs">
{`# ---- VS Code ----
# Install the "SQLTools" extension or "SQL Formatter" extension
# Open a .sql file, then:
# Format Document: Shift+Alt+F (Windows/Linux) or Shift+Option+F (Mac)

# ---- JetBrains (DataGrip, IntelliJ with DB plugin) ----
# Format SQL: Ctrl+Alt+L (Windows/Linux) or Cmd+Option+L (Mac)
# Configure style: Settings → Editor → Code Style → SQL
# Options: indent size, keyword case, alignment

# ---- pgFormatter (command-line, PostgreSQL) ----
npm install -g pgformatter   # or brew install pgformatter
pg_format messy_query.sql -o formatted_query.sql

# ---- sqlformat (Python, any dialect) ----
pip install sqlparse
python -m sqlparse --reindent --keywords upper messy_query.sql

# ---- prettier-plugin-sql (Node.js project integration) ----
npm install --save-dev prettier prettier-plugin-sql
# .prettierrc:
# { "plugins": ["prettier-plugin-sql"], "language": "mysql" }`}
      </CodeBlock>

      <QuickFact color="violet" label="Format SQL on save — automate style enforcement in your project">
        Configure your editor to auto-format SQL files on save, the same way you format JavaScript or
        Python. In VS Code with a SQL formatter extension, add <code>{"[sql]"}: {"{"}editor.formatOnSave: true{"}"}</code>{' '}
        to your workspace settings. This ensures every committed SQL file is already formatted
        consistently without a manual step.
      </QuickFact>

      <SectionHeader number={7} title="Common SQL Formatting Mistakes to Avoid" />

      <KeyPointsGrid columns={2} items={[
        {
          title: "Don't mix casing inconsistently",
          description:
            "Pick one convention and stick to it. Mixing SELECT with from and Where in the same query is harder to read than a consistently lowercase or consistently uppercase query.",
        },
        {
          title: 'Align ON with JOIN, not with WHERE',
          description:
            'The ON condition belongs to its JOIN, not the WHERE clause. Indenting ON two spaces under the JOIN keyword makes multi-join queries much easier to parse.',
        },
        {
          title: "Don't omit semicolons in scripts",
          description:
            'In multi-statement SQL scripts and stored procedures, semicolons separate statements. Some databases require them; all benefit from them. Add a semicolon at the end of each statement.',
        },
        {
          title: 'Qualify all column names in joins',
          description:
            "In any query with more than one table, prefix every column with the table alias: u.id, o.total, p.name. This prevents ambiguous column errors and makes the query self-documenting.",
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is a SQL formatter and what does it do?',
          answer: "A SQL formatter (also called SQL beautifier or SQL pretty printer) restructures SQL queries with consistent indentation, keyword casing, and clause separation. It transforms a minified one-liner or inconsistently formatted query into readable SQL — without changing the logic. Think of it as Prettier or Black but for SQL.",
        },
        {
          question: 'Should SQL keywords be uppercase or lowercase?',
          answer: "SQL is case-insensitive for keywords — SELECT and select are identical to the database engine. The convention is UPPERCASE for keywords because it visually separates SQL structure (SELECT, FROM, WHERE) from user-defined names (table names, column names, aliases). Most SQL style guides, including the PostgreSQL documentation and Google SQL style guide, recommend uppercase keywords.",
        },
        {
          question: 'How do I format SQL output from an ORM?',
          answer: "Enable SQL logging in your ORM to see the raw SQL. In Django, set LOGGING with django.db.backends to DEBUG. In SQLAlchemy, pass echo=True to create_engine(). In Prisma, set DATABASE_URL with ?log=query. Then paste the logged SQL into a formatter like the one at unblockdevs.com/sql-formatter. For parameterized ORM output with ? placeholders, replace them with sample values before formatting.",
        },
        {
          question: 'How do I format a SQL IN clause with 1000 IDs?',
          answer: "For large IN clause lists, use the vertical formatting style: WHERE id IN ( on one line, then each value on its own line indented, then the closing ). For generating the formatted IN clause from a raw list of IDs, use unblockdevs.com/sql-formatter — paste the IDs, click Format, and get a properly formatted IN clause instantly. The tool also supports range compression (BETWEEN), parameterized queries, and Oracle 1000-item chunking.",
        },
        {
          question: 'Does formatting SQL change the query logic?',
          answer: "No. SQL formatting only adds or removes whitespace (spaces, newlines, indentation) and changes keyword casing. It never modifies column names, table names, values, operators, or the query structure. The formatted query produces identical results to the original. Formatters parse the SQL and re-emit it with a different layout — they never alter semantics.",
        },
        {
          question: 'What is the best online SQL formatter?',
          answer: "unblockdevs.com/sql-formatter supports MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. It formats SQL IN clause lists with proper indentation, handles parameterized queries, range compression, and multiple output formats (SQL, JSON, CSV, GraphQL, MongoDB). All processing runs in the browser — no data is sent to any server. It is free and requires no account.",
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
