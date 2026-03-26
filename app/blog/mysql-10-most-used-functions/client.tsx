'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function Mysql10MostUsedFunctionsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL 20 Most Used Functions — With Real Examples for Every Developer</h1>
      <p className="lead">
        MySQL has hundreds of built-in functions, but 20 of them cover 90% of real-world use cases.
        This guide covers string, numeric, date, aggregate, and conditional functions — all with working
        SQL examples you can run directly.
      </p>

      <StatGrid
        stats={[
          { value: '20', label: 'essential functions covered', color: 'blue' },
          { value: '5', label: 'categories: string, date, math, agg, conditional', color: 'green' },
          { value: '100%', label: 'runnable examples', color: 'purple' },
          { value: '8.0+', label: 'MySQL version (all examples tested)', color: 'amber' },
        ]}
      />

      <SectionHeader number={1} title="String Functions" />

      <CodeBlock language="sql" filename="CONCAT — Combine strings">
{`-- Combine first and last name
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;
-- → 'Alice Smith'

-- CONCAT_WS: with separator (skips NULLs)
SELECT CONCAT_WS(', ', city, state, country) AS address FROM locations;
-- → 'San Francisco, CA, USA'`}
      </CodeBlock>

      <CodeBlock language="sql" filename="SUBSTRING / SUBSTR — Extract part of a string">
{`-- SUBSTRING(str, start, length)
SELECT SUBSTRING('Hello World', 7, 5);  -- → 'World'
SELECT SUBSTRING(email, 1, LOCATE('@', email) - 1) AS username FROM users;
-- Extracts everything before the @ in an email`}
      </CodeBlock>

      <CodeBlock language="sql" filename="REPLACE — Find and replace text">
{`SELECT REPLACE('Hello World', 'World', 'MySQL');  -- → 'Hello MySQL'

-- Useful for cleaning data
UPDATE products SET description = REPLACE(description, 'http://', 'https://');`}
      </CodeBlock>

      <CodeBlock language="sql" filename="TRIM / LTRIM / RTRIM — Remove whitespace">
{`SELECT TRIM('  hello world  ');   -- → 'hello world'
SELECT LTRIM('  hello');           -- → 'hello'  (left only)
SELECT RTRIM('hello  ');           -- → 'hello'  (right only)

-- Remove specific characters
SELECT TRIM(LEADING '0' FROM '000123');  -- → '123'`}
      </CodeBlock>

      <CodeBlock language="sql" filename="UPPER / LOWER — Change case">
{`SELECT UPPER('hello');  -- → 'HELLO'
SELECT LOWER('HELLO');  -- → 'hello'

-- Normalize emails before storing
INSERT INTO users (email) VALUES (LOWER('Alice@Example.COM'));`}
      </CodeBlock>

      <CodeBlock language="sql" filename="LENGTH / CHAR_LENGTH — String length">
{`SELECT LENGTH('hello');       -- → 5 (bytes)
SELECT CHAR_LENGTH('hello');  -- → 5 (characters, handles multi-byte UTF-8)

-- Find users with unusually short usernames
SELECT username FROM users WHERE CHAR_LENGTH(username) < 3;`}
      </CodeBlock>

      <CodeBlock language="sql" filename="LOCATE / INSTR — Find position of substring">
{`SELECT LOCATE('World', 'Hello World');  -- → 7
SELECT INSTR('Hello World', 'World');   -- → 7  (same, different syntax)

-- Check if email is valid (has @)
SELECT email FROM users WHERE LOCATE('@', email) = 0;  -- missing @`}
      </CodeBlock>

      <SectionHeader number={2} title="Date & Time Functions" />

      <CodeBlock language="sql" filename="NOW / CURDATE / CURTIME — Current timestamps">
{`SELECT NOW();      -- → '2026-03-25 14:32:15'  (date + time)
SELECT CURDATE();  -- → '2026-03-25'            (date only)
SELECT CURTIME();  -- → '14:32:15'              (time only)

-- Record creation time
INSERT INTO orders (user_id, created_at) VALUES (123, NOW());`}
      </CodeBlock>

      <CodeBlock language="sql" filename="DATE_FORMAT — Format dates for display">
{`SELECT DATE_FORMAT(created_at, '%M %d, %Y') AS formatted FROM orders;
-- → 'March 25, 2026'

SELECT DATE_FORMAT(NOW(), '%Y-%m') AS month_key;
-- → '2026-03'  (useful for grouping by month)

-- Common format codes:
-- %Y = 4-digit year, %m = month (01-12), %d = day (01-31)
-- %H = 24h hour, %i = minutes, %s = seconds`}
      </CodeBlock>

      <CodeBlock language="sql" filename="DATEDIFF / TIMESTAMPDIFF — Date arithmetic">
{`-- Days between two dates
SELECT DATEDIFF('2026-12-31', '2026-03-25');  -- → 281

-- More granular: TIMESTAMPDIFF(unit, start, end)
SELECT TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age FROM users;
SELECT TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minutes_ago FROM orders;`}
      </CodeBlock>

      <CodeBlock language="sql" filename="DATE_ADD / DATE_SUB — Add/subtract time">
{`SELECT DATE_ADD(NOW(), INTERVAL 30 DAY);   -- 30 days from now
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);  -- 1 month ago

-- Find orders from the last 7 days
SELECT * FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);`}
      </CodeBlock>

      <SectionHeader number={3} title="Aggregate Functions" />

      <CodeBlock language="sql" filename="COUNT / SUM / AVG / MIN / MAX">
{`-- Count rows
SELECT COUNT(*) AS total_orders FROM orders;
SELECT COUNT(DISTINCT user_id) AS unique_customers FROM orders;

-- Numeric aggregates
SELECT
  SUM(total)    AS revenue,
  AVG(total)    AS avg_order,
  MIN(total)    AS smallest_order,
  MAX(total)    AS largest_order
FROM orders
WHERE created_at >= '2026-01-01';

-- Group by with aggregates
SELECT
  user_id,
  COUNT(*)      AS order_count,
  SUM(total)    AS total_spent
FROM orders
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 10;`}
      </CodeBlock>

      <CodeBlock language="sql" filename="GROUP_CONCAT — Aggregate strings">
{`-- Combine all tags for each post into one string
SELECT
  post_id,
  GROUP_CONCAT(tag_name ORDER BY tag_name SEPARATOR ', ') AS tags
FROM post_tags
JOIN tags USING (tag_id)
GROUP BY post_id;
-- → post_id: 1, tags: 'api, javascript, tutorial'`}
      </CodeBlock>

      <SectionHeader number={4} title="Conditional Functions" />

      <CodeBlock language="sql" filename="IF / IFNULL / NULLIF — Conditional values">
{`-- IF(condition, true_value, false_value)
SELECT name, IF(stock > 0, 'In Stock', 'Out of Stock') AS availability
FROM products;

-- IFNULL: return fallback if NULL
SELECT IFNULL(phone, 'N/A') AS phone FROM users;

-- NULLIF: return NULL if equal (avoid division by zero)
SELECT total / NULLIF(quantity, 0) AS unit_price FROM orders;
-- Returns NULL instead of "Division by zero" error`}
      </CodeBlock>

      <CodeBlock language="sql" filename="CASE — Complex conditional logic">
{`SELECT
  order_id,
  total,
  CASE
    WHEN total >= 500  THEN 'Gold'
    WHEN total >= 100  THEN 'Silver'
    WHEN total >= 10   THEN 'Bronze'
    ELSE 'Standard'
  END AS tier
FROM orders;

-- CASE in aggregations
SELECT
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
  COUNT(CASE WHEN status = 'pending'   THEN 1 END) AS pending,
  COUNT(CASE WHEN status = 'failed'    THEN 1 END) AS failed
FROM orders;`}
      </CodeBlock>

      <SectionHeader number={5} title="Math Functions" />

      <CodeBlock language="sql" filename="ROUND / FLOOR / CEIL — Number rounding">
{`SELECT ROUND(3.14159, 2);  -- → 3.14
SELECT FLOOR(3.9);          -- → 3  (always rounds down)
SELECT CEIL(3.1);           -- → 4  (always rounds up)

-- Currency: round to 2 decimal places
SELECT ROUND(price * 1.08, 2) AS price_with_tax FROM products;`}
      </CodeBlock>

      <CodeBlock language="sql" filename="MOD / ABS / RAND — Utility math">
{`SELECT MOD(10, 3);     -- → 1  (remainder)
SELECT ABS(-42);        -- → 42 (absolute value)
SELECT RAND();          -- → 0.6823... (random 0-1)

-- Random sample of 100 rows
SELECT * FROM users ORDER BY RAND() LIMIT 100;

-- Even/odd check
SELECT id, IF(MOD(id, 2) = 0, 'Even', 'Odd') AS parity FROM items;`}
      </CodeBlock>

      <SectionHeader number={6} title="Quick Reference Cheat Sheet" />

      <CompareTable
        leftLabel="Function"
        rightLabel="What It Does"
        rows={[
          { label: 'String', left: 'CONCAT(a, b)', right: 'Join strings together' },
          { label: 'String', left: 'SUBSTRING(s, start, len)', right: 'Extract part of string' },
          { label: 'String', left: 'REPLACE(s, old, new)', right: 'Find and replace text' },
          { label: 'String', left: 'TRIM(s)', right: 'Remove leading/trailing spaces' },
          { label: 'Date', left: 'NOW()', right: 'Current datetime' },
          { label: 'Date', left: 'DATE_FORMAT(d, fmt)', right: 'Format a date for display' },
          { label: 'Date', left: 'DATEDIFF(d1, d2)', right: 'Days between two dates' },
          { label: 'Date', left: 'DATE_ADD(d, INTERVAL n UNIT)', right: 'Add time to a date' },
          { label: 'Aggregate', left: 'COUNT(*)', right: 'Count rows' },
          { label: 'Aggregate', left: 'GROUP_CONCAT(col)', right: 'Aggregate strings into one' },
          { label: 'Conditional', left: 'IFNULL(val, fallback)', right: 'Replace NULL with default' },
          { label: 'Conditional', left: 'CASE WHEN...END', right: 'Multi-condition branching' },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between LENGTH and CHAR_LENGTH?',
            answer: 'LENGTH returns the byte count. CHAR_LENGTH returns the character count. They differ for multi-byte characters (UTF-8 emoji, Chinese, Arabic). For ASCII text they\'re identical. Always use CHAR_LENGTH for counting visible characters.',
          },
          {
            question: 'Can I use aggregate functions without GROUP BY?',
            answer: 'Yes — it aggregates the entire result set into one row. SELECT COUNT(*), AVG(price) FROM products gives totals for all rows. But you can\'t mix aggregate and non-aggregate columns without GROUP BY (unless using window functions).',
          },
          {
            question: 'How do I handle NULL in comparisons?',
            answer: 'NULL = NULL is NULL (not true). Use IS NULL or IS NOT NULL to check for nulls. IFNULL(col, default) replaces NULLs for display. COALESCE(a, b, c) returns the first non-NULL value.',
          },
          {
            question: 'Why does ORDER BY RAND() perform poorly on large tables?',
            answer: 'ORDER BY RAND() assigns a random number to every row, sorts them all, then returns the top N. On large tables, this sorts millions of rows just to return 10. For large random samples, use alternatives like: WHERE id >= FLOOR(RAND() * (SELECT MAX(id) FROM t)) LIMIT 10.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
