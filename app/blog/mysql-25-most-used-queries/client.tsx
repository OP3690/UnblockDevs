'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function Mysql25MostUsedQueriesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL 25 Most Used Queries — Practical Examples for Every Developer</h1>
      <p className="lead">
        These 25 MySQL queries cover 90% of real-world database operations. From basic SELECT
        to complex window functions, recursive CTEs, and transactions — each query includes a
        practical example with comments explaining what it does and when to use it. Whether you're
        a developer writing application queries daily or a data analyst exploring datasets, this
        reference covers the patterns you'll reach for most often.
      </p>

      <StatGrid stats={[
        { value: '25 queries', label: 'cover 90% of daily MySQL operations', color: 'blue' },
        { value: 'Window functions', label: 'ROW_NUMBER, RANK, LAG/LEAD — essential for analytics', color: 'green' },
        { value: 'CTEs', label: 'WITH clause for readable, reusable complex queries', color: 'purple' },
        { value: 'EXPLAIN', label: 'always run EXPLAIN to check query performance', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Basic SELECT and Filtering" />
      <CodeBlock lang="sql" title="1-5: Essential SELECT queries">
{`-- 1. Basic SELECT with filtering and ordering
SELECT id, name, email, created_at
FROM users
WHERE status = 'active' AND age > 18
ORDER BY created_at DESC
LIMIT 50 OFFSET 100;  -- OFFSET 100 = skip first 100 rows (page 3 of 50 per page)

-- 2. COUNT with GROUP BY and HAVING
SELECT country, COUNT(*) AS user_count, AVG(age) AS avg_age
FROM users
GROUP BY country
HAVING COUNT(*) > 100  -- HAVING filters groups (after GROUP BY); WHERE filters rows (before)
ORDER BY user_count DESC;

-- 3. INNER JOIN (only rows with matches in both tables)
SELECT u.name, o.order_id, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.created_at DESC;

-- 4. LEFT JOIN (all users, even those with zero orders)
SELECT u.name, u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email  -- group by all non-aggregated SELECT columns
ORDER BY order_count DESC;

-- 5. Subquery in WHERE with IN
SELECT * FROM products
WHERE category_id IN (
  SELECT id FROM categories WHERE name IN ('Electronics', 'Computers')
);
-- Alternative using JOIN (often faster on large tables):
SELECT p.* FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE c.name IN ('Electronics', 'Computers');`}
      </CodeBlock>

      <SectionHeader number={2} title="INSERT, UPDATE, DELETE" />
      <CodeBlock lang="sql" title="6-10: Data modification queries">
{`-- 6. INSERT single row
INSERT INTO users (name, email, status, created_at)
VALUES ('Alice Johnson', 'alice@example.com', 'active', NOW());
-- NOW() returns current datetime; CURDATE() for date only

-- 7. INSERT multiple rows (batch — much faster than individual INSERTs)
INSERT INTO products (name, price, category_id, stock) VALUES
  ('Laptop Pro', 1299.99, 1, 50),
  ('Wireless Mouse', 29.99, 1, 200),
  ('USB-C Hub', 49.99, 1, 150);
-- Single INSERT with multiple VALUES rows = one round-trip to DB

-- 8. INSERT ... ON DUPLICATE KEY UPDATE (upsert)
-- Inserts if no conflict on unique/primary key; updates if conflict
INSERT INTO user_stats (user_id, login_count, last_login)
VALUES (123, 1, NOW())
ON DUPLICATE KEY UPDATE
  login_count = login_count + 1,
  last_login = NOW();
-- Requires UNIQUE constraint on user_id

-- 9. UPDATE with JOIN (update rows based on data in another table)
UPDATE orders o
INNER JOIN users u ON o.user_id = u.id
SET o.status = 'cancelled'
WHERE u.status = 'suspended' AND o.status = 'pending';

-- 10. Safe DELETE with LIMIT (prevents locking large tables for too long)
DELETE FROM sessions
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
LIMIT 1000;  -- delete in batches of 1000 to minimize lock time
-- For large deletes, repeat in a loop until 0 rows affected`}
      </CodeBlock>

      <SectionHeader number={3} title="Date and String Functions" />
      <CodeBlock lang="sql" title="11-15: Date, string, and conditional operations">
{`-- 11. Monthly aggregation with date formatting
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS orders,
  SUM(total) AS revenue,
  ROUND(AVG(total), 2) AS avg_order_value
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month;

-- 12. String operations
SELECT
  UPPER(name) AS name_upper,
  LOWER(email) AS email_lower,
  LENGTH(name) AS name_length,          -- byte length
  CHAR_LENGTH(name) AS name_chars,      -- character length (differs for multibyte)
  SUBSTRING(email, 1, LOCATE('@', email) - 1) AS email_username,
  CONCAT(first_name, ' ', last_name) AS full_name,
  TRIM('  spaces  ') AS trimmed,        -- removes leading/trailing whitespace
  REPLACE(bio, 'http://', 'https://') AS updated_bio
FROM users;

-- 13. NULL handling functions
SELECT
  IFNULL(phone, 'No phone') AS phone,           -- replace NULL with default
  COALESCE(mobile, phone, email, 'No contact') AS primary_contact,  -- first non-NULL
  NULLIF(score, 0) AS non_zero_score,           -- returns NULL if score=0 (avoids div by zero)
  IF(is_premium, 'Premium', 'Free') AS tier     -- IF(condition, true_val, false_val)
FROM users;

-- 14. Conditional logic with CASE WHEN
SELECT
  name,
  total,
  CASE
    WHEN total > 1000 THEN 'VIP'
    WHEN total > 500  THEN 'Premium'
    WHEN total > 100  THEN 'Regular'
    ELSE 'New'
  END AS customer_tier,
  CASE status                      -- simple CASE (equality checks)
    WHEN 'active'   THEN '✅'
    WHEN 'suspended' THEN '⛔'
    ELSE '❓'
  END AS status_icon
FROM orders;

-- 15. Pattern matching
SELECT * FROM products WHERE name LIKE '%wireless%';      -- contains "wireless"
SELECT * FROM products WHERE name LIKE 'apple%';          -- starts with "apple"
SELECT * FROM products WHERE name NOT LIKE '%refurbished%'; -- excludes refurbished
-- REGEXP for complex patterns:
SELECT * FROM users WHERE email REGEXP '^[a-zA-Z0-9._%+-]+@gmail\\.com$';
SELECT * FROM users WHERE phone REGEXP '^\\+1[0-9]{10}$'; -- US phone numbers`}
      </CodeBlock>

      <SectionHeader number={4} title="CTEs and Window Functions" />
      <CodeBlock lang="sql" title="16-20: Advanced queries — CTEs, window functions, analytics">
{`-- 16. CTE (Common Table Expression) — readable named subqueries
WITH monthly_revenue AS (
  SELECT
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    SUM(total) AS revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY DATE_FORMAT(created_at, '%Y-%m')
),
ranked_months AS (
  SELECT *, RANK() OVER (ORDER BY revenue DESC) AS revenue_rank
  FROM monthly_revenue
)
SELECT * FROM ranked_months WHERE revenue_rank <= 5;
-- CTEs can be referenced multiple times; subqueries are computed each time

-- 17. ROW_NUMBER() — unique sequential rank within each group
SELECT user_id, order_id, total, created_at,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS order_num
FROM orders;
-- Get most recent order per user:
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) ranked WHERE rn = 1;

-- 18. LAG/LEAD — access previous/next row values (no self-join needed)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS month_over_month_change,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month), 2) AS pct_change
FROM monthly_revenue;

-- 19. Running totals and cumulative sums
SELECT
  created_at,
  total,
  SUM(total) OVER (ORDER BY created_at) AS running_total,
  AVG(total) OVER (ORDER BY created_at ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
    AS rolling_7day_avg
FROM orders;

-- 20. FIND_IN_SET and JSON_CONTAINS for denormalized data
-- (better to normalize, but useful for legacy schemas)
SELECT * FROM users WHERE FIND_IN_SET('admin', roles);  -- roles = 'user,admin,editor'
SELECT * FROM products WHERE JSON_CONTAINS(tags, '"sale"');  -- tags = '["sale","new"]'
SELECT id, JSON_EXTRACT(metadata, '$.shipping.city') AS city FROM orders;`}
      </CodeBlock>

      <SectionHeader number={5} title="Performance and Utility Queries" />
      <CodeBlock lang="sql" title="21-25: EXPLAIN, indexes, transactions, recursive CTEs">
{`-- 21. EXPLAIN — analyze query execution plan
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
-- Key columns to check:
-- type: system > const > eq_ref > ref > range > index > ALL (ALL = full table scan = bad)
-- key: which index is used (NULL = no index = investigate)
-- rows: estimated rows examined (smaller = better)
-- Extra: "Using filesort" or "Using temporary" are red flags for large tables

-- EXPLAIN ANALYZE (MySQL 8.0.18+) — actual execution stats
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123 AND status = 'pending';

-- 22. Create indexes for slow queries
CREATE INDEX idx_orders_user_status ON orders (user_id, status);  -- composite index
CREATE INDEX idx_orders_created ON orders (created_at);            -- for date range queries
CREATE UNIQUE INDEX idx_users_email ON users (email);              -- enforces uniqueness
-- Check existing indexes:
SHOW INDEX FROM orders;

-- 23. INSERT from SELECT (batch copy/migration)
INSERT INTO order_archive (order_id, user_id, total, status, archived_at)
SELECT id, user_id, total, status, NOW()
FROM orders
WHERE created_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
-- Efficient: one query instead of SELECT then INSERT in application code

-- 24. Recursive CTE — tree/hierarchy traversal (MySQL 8.0+)
WITH RECURSIVE category_tree AS (
  -- Base case: top-level categories (no parent)
  SELECT id, name, parent_id, 0 AS depth, CAST(name AS CHAR(500)) AS path
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  -- Recursive case: children of already-found rows
  SELECT c.id, c.name, c.parent_id, ct.depth + 1,
         CONCAT(ct.path, ' > ', c.name) AS path
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, path;
-- Use MAXRECURSION option if hierarchy is very deep

-- 25. TRANSACTION — atomic multi-step operations
START TRANSACTION;
  -- Deduct from sender
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  -- Check for negative balance (application code checks rows affected)
  -- Add to receiver
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
  -- Audit trail
  INSERT INTO transfers (from_id, to_id, amount, transferred_at)
  VALUES (1, 2, 500, NOW());
COMMIT;  -- Makes all changes permanent
-- If anything fails before COMMIT: ROLLBACK; -- undoes all changes in this transaction

-- Use ROLLBACK when any step fails:
START TRANSACTION;
  UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 99 AND quantity > 0;
  -- Check: if 0 rows affected (out of stock), ROLLBACK; SIGNAL for error
  INSERT INTO orders (product_id, user_id, quantity) VALUES (99, 123, 1);
COMMIT;`}
      </CodeBlock>

      <SectionHeader number={6} title="Query Optimization Essentials" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Index your WHERE and JOIN columns', description: 'Columns used in WHERE clauses, JOIN ON conditions, and ORDER BY should be indexed. Composite indexes should have the most selective column first. Use SHOW INDEX FROM tablename and EXPLAIN to verify indexes are being used.' },
        { title: 'Avoid SELECT * in production', description: 'Always specify column names: SELECT id, name, email. SELECT * transfers all data including large text/blob columns you may not need. It also breaks when table schema changes add columns that alter application logic.' },
        { title: 'LIMIT large deletes and updates', description: 'DELETE or UPDATE affecting millions of rows holds a table lock for the duration. Use LIMIT 1000 and repeat in a loop. This gives other queries a chance to execute between batches and prevents lock timeouts.' },
        { title: 'Use EXPLAIN before deploying new queries', description: 'Run EXPLAIN on every new query during development. Look for type=ALL (full table scan) on large tables. A query that runs in 5ms on 10,000 rows may take 30 seconds on 10,000,000 rows without an index.' },
      ]} />

      <AlertBox type="tip" title="MySQL 8.0 vs 5.7 — know your version">
        Window functions (ROW_NUMBER, LAG, LEAD, RANK), CTEs (WITH clause), and recursive CTEs
        require MySQL 8.0+. If you're on MySQL 5.7 or earlier, use subqueries and user variables
        for window-function equivalents. Check your version: SELECT VERSION();
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between HAVING and WHERE?',
          answer: 'WHERE filters individual rows before GROUP BY is applied — it cannot use aggregate functions. HAVING filters groups after GROUP BY — it can use aggregate functions like COUNT, SUM, AVG. Example: WHERE age > 18 filters rows before grouping; HAVING COUNT(*) > 10 filters groups after grouping. A query can use both: WHERE age > 18 GROUP BY country HAVING COUNT(*) > 100.',
        },
        {
          question: 'When should I use a CTE vs a subquery?',
          answer: 'CTEs are better for: reusing the same result multiple times in one query (subqueries recompute each reference), recursive queries (hierarchy/tree data — not possible with subqueries), and readability when logic is complex. Subqueries are fine for: simple one-time use in WHERE or SELECT clauses. MySQL 8.0 optimizes non-recursive CTEs similarly to derived tables. For complex reports, CTEs produce significantly more readable and maintainable SQL.',
        },
        {
          question: 'When should I use JOIN vs subquery for filtering?',
          answer: 'For EXISTS/NOT EXISTS checks, correlated subqueries often perform similarly to JOINs. For IN with a subquery that returns many rows, JOIN is usually faster because the optimizer can use indexes on the join condition more effectively. General rule: if you need columns from both tables, use JOIN. If you only need rows from one table where a condition on another table is true, EXISTS or JOIN both work — run EXPLAIN to compare.',
        },
        {
          question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?',
          answer: 'ROW_NUMBER() always assigns sequential numbers (1,2,3,4,5) — no ties. RANK() assigns the same rank to ties, then skips numbers: two rows tied for 2nd both get rank 2, next rank is 4. DENSE_RANK() assigns same rank to ties but doesn\'t skip: ties get same rank 2, next rank is 3. Use ROW_NUMBER() for pagination, RANK() for leaderboards that skip positions after ties, DENSE_RANK() for percentile calculations.',
        },
        {
          question: 'How do I efficiently paginate large result sets?',
          answer: 'OFFSET pagination (LIMIT 50 OFFSET 5000) gets slower as OFFSET increases — MySQL scans and discards all offset rows. For large tables, use keyset/cursor pagination: WHERE id > last_seen_id ORDER BY id LIMIT 50. This always uses the primary key index regardless of page number. Only use OFFSET pagination for small tables or when users need true page jumping.',
        },
        {
          question: 'When should I use a transaction?',
          answer: 'Use transactions for any multi-step operation that must succeed or fail atomically: money transfers (debit + credit must both succeed), inventory management (check stock + decrement + create order), and any operation where partial completion would leave data inconsistent. Single-statement INSERT, UPDATE, DELETE are implicitly atomic. Always include error handling that calls ROLLBACK on failure. In application code: wrap in try/catch with ROLLBACK in the catch block.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
