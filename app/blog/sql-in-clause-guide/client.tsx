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

export default function SqlInClauseGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>SQL IN Clause — Complete Guide with Examples for MySQL, PostgreSQL &amp; More</h1>
      <p className="lead">
        The SQL <code>IN</code> clause filters rows where a column value matches any value in a list
        or subquery. It is one of the most common SQL constructs — used for batch lookups, multi-value
        filters, and replacing long chains of <code>OR</code> conditions. This guide covers everything:
        syntax, subqueries, <code>NOT IN</code>, <code>NULL</code> pitfalls, performance, the Oracle
        1000-item limit, and parameterized queries across MySQL, PostgreSQL, SQL Server, Oracle, and SQLite.
      </p>

      <StatGrid stats={[
        { value: 'WHERE', label: 'IN clause always appears in a WHERE (or HAVING) clause to filter rows', color: 'blue' },
        { value: 'OR', label: 'IN replaces long OR chains — WHERE id IN (1,2,3) equals id=1 OR id=2 OR id=3', color: 'green' },
        { value: '1000', label: "Oracle hard limit — IN clause cannot exceed 1000 items without workarounds", color: 'orange' },
      ]} />

      <SectionHeader number={1} title="SQL IN Clause — Basic Syntax" />
      <p>
        The <code>IN</code> clause matches a column against a list of values. Any row where the column
        equals one of the listed values is included in the result set.
      </p>

      <CodeBlock lang="sql" title="SQL IN clause — basic syntax and examples">
{`-- Basic IN clause with a literal list
SELECT * FROM users
WHERE id IN (1, 2, 3, 4, 5);

-- String values — must use quotes
SELECT * FROM products
WHERE category IN ('Electronics', 'Clothing', 'Books');

-- Multiple columns with IN (use tuples — MySQL and PostgreSQL)
SELECT * FROM orders
WHERE (status, region) IN (('shipped', 'US'), ('pending', 'EU'));

-- IN with NULL — NULL never matches, use IS NULL separately
SELECT * FROM users
WHERE role IN ('admin', 'editor') OR role IS NULL;`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'IN replaces OR chains',
          description:
            'WHERE id IN (1,2,3) is exactly equivalent to WHERE id = 1 OR id = 2 OR id = 3. IN is shorter, more readable, and easier to maintain when the list grows.',
        },
        {
          title: 'Case sensitivity depends on collation',
          description:
            "String matching in IN is case-sensitive or case-insensitive depending on the database collation. MySQL with utf8mb4_general_ci is case-insensitive; PostgreSQL is case-sensitive by default. 'Admin' and 'admin' may or may not match.",
        },
        {
          title: 'Duplicates in the list are ignored',
          description:
            'WHERE id IN (1, 1, 2, 2, 3) works fine — the database treats it as WHERE id IN (1, 2, 3). No need to deduplicate the list in the query itself, though it is good practice.',
        },
        {
          title: 'Works with any data type',
          description:
            'IN works with integers, strings, dates, UUIDs, and any comparable type. The values in the list must match (or be implicitly convertible to) the column data type.',
        },
      ]} />

      <SectionHeader number={2} title="NOT IN — Exclude a List of Values" />

      <CodeBlock lang="sql" title="NOT IN clause — exclude matching rows">
{`-- Exclude specific statuses
SELECT * FROM orders
WHERE status NOT IN ('cancelled', 'refunded', 'draft');

-- NOT IN with a subquery — users NOT in the premium tier
SELECT * FROM users
WHERE id NOT IN (
  SELECT user_id FROM subscriptions WHERE tier = 'premium'
);`}
      </CodeBlock>

      <AlertBox type="warning" title="NOT IN with NULL — always returns no rows">
        If the list contains a <code>NULL</code> value — even one — <code>NOT IN</code> returns
        no rows at all. This is because <code>x NOT IN (1, NULL)</code> evaluates as{' '}
        <code>x != 1 AND x != NULL</code>, and comparing anything to <code>NULL</code> is always
        unknown (never true). Use <code>NOT EXISTS</code> or filter out <code>NULL</code> from
        the subquery when <code>NOT IN</code> involves nullable columns.
      </AlertBox>

      <ErrorFix
        title="NOT IN with nullable subquery — the NULL trap"
        bad={`-- Returns NO rows if subscriptions.user_id contains any NULL
SELECT * FROM users
WHERE id NOT IN (
  SELECT user_id FROM subscriptions   -- user_id might be NULL!
);`}
        good={`-- Safe: filter out NULLs from the subquery
SELECT * FROM users
WHERE id NOT IN (
  SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL
);

-- Or use NOT EXISTS — handles NULLs correctly
SELECT u.* FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM subscriptions s WHERE s.user_id = u.id
);`}
        badLabel="NOT IN with nullable column — silently returns 0 rows"
        goodLabel="Filter NULLs from subquery OR use NOT EXISTS"
      />

      <SectionHeader number={3} title="IN with Subqueries" />

      <CodeBlock lang="sql" title="IN clause with correlated and non-correlated subqueries">
{`-- Non-correlated subquery — runs once, result cached
SELECT * FROM orders
WHERE customer_id IN (
  SELECT id FROM customers WHERE country = 'US' AND verified = 1
);

-- Correlated subquery — runs for every row (use carefully on large tables)
SELECT * FROM products p
WHERE id IN (
  SELECT product_id FROM order_items oi
  WHERE oi.quantity > 100 AND oi.order_id = p.latest_order_id
);

-- IN vs EXISTS — prefer EXISTS for large subquery results
-- EXISTS stops scanning after the first match; IN loads the full list
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.total > 500
);

-- IN with CTE (Common Table Expression) — PostgreSQL, MySQL 8+, SQL Server
WITH high_value_customers AS (
  SELECT customer_id FROM orders
  WHERE total > 1000
  GROUP BY customer_id
  HAVING COUNT(*) >= 3
)
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM high_value_customers);`}
      </CodeBlock>

      <SectionHeader number={4} title="Performance — IN vs JOIN vs EXISTS" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'IN with a short literal list — fastest',
          description:
            'For a short list of literal values (< 100 items), IN is the fastest and clearest approach. Modern query optimizers convert IN to a hash lookup or range scan depending on the values.',
        },
        {
          title: 'IN vs EXISTS for subqueries',
          description:
            'For large subquery results, EXISTS is often faster because it stops after the first match. IN loads the full subquery result into memory. On small subquery results, the difference is negligible.',
        },
        {
          title: 'IN vs JOIN',
          description:
            'JOIN is better when you need columns from the joined table. IN/EXISTS is better for pure filtering. For very large lists (10,000+ items), a temporary table + JOIN often outperforms a literal IN list.',
        },
        {
          title: 'Index use with IN',
          description:
            'A B-tree index on the filtered column is used for IN clause lookups. MySQL and PostgreSQL both use index range scans for IN lists. Add an index on the filtered column for large table performance.',
        },
      ]} />

      <CodeBlock lang="sql" title="Large list performance — temp table + JOIN pattern">
{`-- Instead of IN (id1, id2, ..., id10000) which may be slow:

-- Create a temp table and JOIN — much faster for very large lists
CREATE TEMPORARY TABLE temp_ids (id INT PRIMARY KEY);

INSERT INTO temp_ids VALUES (1),(2),(3); -- or bulk insert

SELECT u.* FROM users u
INNER JOIN temp_ids t ON u.id = t.id;

-- Clean up
DROP TEMPORARY TABLE temp_ids;

-- PostgreSQL equivalent using VALUES
SELECT u.* FROM users u
WHERE u.id IN (VALUES (1),(2),(3),(4),(5));  -- PostgreSQL supports this`}
      </CodeBlock>

      <SectionHeader number={5} title="Oracle 1000-Item IN Clause Limit" />

      <AlertBox type="warning" title="Oracle raises ORA-01795 when IN clause exceeds 1000 items">
        Oracle Database hard-limits <code>IN</code> clause literal lists to 1000 items. Exceeding this
        limit raises <code>ORA-01795: maximum number of expressions in a list is 1000</code>. Use one of
        the workarounds below for large lists.
      </AlertBox>

      <CodeBlock lang="sql" title="Oracle 1000-item limit workarounds">
{`-- Workaround 1: Split into multiple IN clauses connected with OR
SELECT * FROM users
WHERE id IN (1,2,3, ... ,1000)  -- first 1000
   OR id IN (1001,1002, ... ,2000)  -- next 1000
   OR id IN (2001,2002, ... ,3000); -- next 1000

-- Workaround 2: Use a temporary table and JOIN
INSERT INTO temp_ids (id) VALUES (1),(2),(3),...;
SELECT u.* FROM users u JOIN temp_ids t ON u.id = t.id;

-- Workaround 3: Use BETWEEN for consecutive ranges (range compression)
-- Instead of IN (1,2,3,...,1000) use:
SELECT * FROM users
WHERE id BETWEEN 1 AND 1000
   OR id BETWEEN 2001 AND 3000;

-- Workaround 4: Use an inline view (works in Oracle for expression lists)
SELECT * FROM users
WHERE id IN (
  SELECT column_value FROM TABLE(SYS.ODCINUMBERLIST(1,2,3,...))
);`}
      </CodeBlock>

      <SectionHeader number={6} title="Parameterized IN Clause for Prepared Statements" />

      <CodeBlock lang="javascript" title="Parameterized IN clause by database — Node.js examples">
{`// ---- MySQL (mysql2) — uses ? placeholders ----
const ids = [1, 2, 3, 4, 5];
const placeholders = ids.map(() => '?').join(', ');
const [rows] = await connection.query(
  \`SELECT * FROM users WHERE id IN (\${placeholders})\`,
  ids
);

// ---- PostgreSQL (pg) — uses $1, $2, $3 placeholders ----
const ids = [1, 2, 3, 4, 5];
const placeholders = ids.map((_, i) => \`$\${i + 1}\`).join(', ');
const { rows } = await pool.query(
  \`SELECT * FROM users WHERE id IN (\${placeholders})\`,
  ids
);

// ---- SQL Server (mssql) — use TVP or IN with parameters ----
const request = new sql.Request();
ids.forEach((id, i) => request.input(\`id\${i}\`, sql.Int, id));
const placeholders = ids.map((_, i) => \`@id\${i}\`).join(', ');
const result = await request.query(
  \`SELECT * FROM users WHERE id IN (\${placeholders})\`
);

// ---- Python (psycopg2 for PostgreSQL) ----
# psycopg2 supports passing a list directly with %s
cursor.execute(
  "SELECT * FROM users WHERE id IN %s",
  (tuple(ids),)  # note: must be a tuple, not a list
)`}
      </CodeBlock>

      <QuickFact color="blue" label="Use ANY($1) in PostgreSQL instead of dynamic IN placeholders">
        PostgreSQL supports <code>WHERE id = ANY($1)</code> with a single array parameter instead of
        building a dynamic placeholder string. Pass <code>ids</code> as an array directly:{' '}
        <code>{'pool.query("SELECT * FROM users WHERE id = ANY($1)", [ids])'}</code> — cleaner code,
        same performance, works with arrays of any size without string concatenation.
      </QuickFact>

      <SectionHeader number={7} title="Database-Specific IN Clause Syntax" />

      <CodeBlock lang="sql" title="IN clause syntax differences by database">
{`-- MySQL — backtick identifiers, LIMIT/OFFSET pagination
SELECT * FROM \`users\`
WHERE \`role\` IN ('admin', 'editor')
LIMIT 100 OFFSET 0;

-- PostgreSQL — double-quote identifiers, ANY() alternative
SELECT * FROM "users"
WHERE "role" IN ('admin', 'editor');
-- PostgreSQL ANY() alternative (accepts array parameter):
WHERE "role" = ANY(ARRAY['admin', 'editor'])

-- SQL Server — bracket identifiers, TOP instead of LIMIT
SELECT TOP 100 * FROM [users]
WHERE [role] IN ('admin', 'editor');

-- Oracle — double-quote identifiers, ROWNUM for pagination
SELECT * FROM "users"
WHERE "role" IN ('admin', 'editor')
  AND ROWNUM <= 100;

-- SQLite — no identifier quoting required for most names
SELECT * FROM users
WHERE role IN ('admin', 'editor')
LIMIT 100;`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is the SQL IN clause and how does it work?',
          answer: 'The SQL IN clause filters rows by checking if a column value matches any value in a list. WHERE id IN (1,2,3) returns rows where id equals 1, 2, or 3. It is equivalent to WHERE id = 1 OR id = 2 OR id = 3 but shorter and more readable. IN works with literal value lists or subquery results.',
        },
        {
          question: 'What happens when NULL is in an IN clause list?',
          answer: 'NULL in an IN list does not match anything — not even other NULLs. WHERE role IN (\'admin\', NULL) only matches rows where role = \'admin\'. NULL never matches because NULL = NULL is UNKNOWN, not TRUE. For NOT IN, if the list contains any NULL, the entire NOT IN returns no rows. Filter NULLs from subqueries before using NOT IN, or use NOT EXISTS instead.',
        },
        {
          question: 'How many values can a SQL IN clause contain?',
          answer: "Most databases have no documented hard limit except Oracle (1000 items). MySQL and PostgreSQL accept IN lists with thousands of values, though performance degrades above a few hundred items — use a temp table + JOIN instead. SQL Server accepts up to approximately 2100 parameters in a parameterized query. Oracle raises ORA-01795 above 1000 literal items.",
        },
        {
          question: 'Is IN or EXISTS faster in SQL?',
          answer: 'For small subquery results, performance is nearly identical — modern optimizers handle both well. For large subquery results, EXISTS is often faster because it short-circuits after the first match, while IN loads the entire subquery result. For literal value lists (not subqueries), IN is always appropriate. Always check the query execution plan for your specific database and data distribution.',
        },
        {
          question: 'How do I use a parameterized IN clause to prevent SQL injection?',
          answer: 'Build a placeholder string dynamically based on the number of values and pass the values as parameters. MySQL: ids.map(() => "?").join(",") and pass ids as parameters. PostgreSQL: ids.map((_,i) => `$${i+1}`).join(",") or use WHERE id = ANY($1) with an array. Never concatenate raw user input into SQL strings — use prepared statements with parameterized IN clauses.',
        },
        {
          question: 'How do I convert a large list of IDs to a SQL IN clause online?',
          answer: 'Use the SQL IN Clause Generator at unblockdevs.com/sql-formatter. Paste any format of IDs (CSV, newline, JSON array, Excel paste), select your database, and get a ready-to-use IN clause instantly. The tool handles deduplication, quoting, parameterization, Oracle chunk splitting, and range compression automatically.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
