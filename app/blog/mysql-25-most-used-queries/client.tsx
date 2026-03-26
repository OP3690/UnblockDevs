'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader,
} from '@/components/blog/BlogVisuals';

export default function Mysql25MostUsedQueriesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL 25 Most Used Queries — Practical Examples for Every Developer</h1>
      <p className="lead">
        These 25 MySQL queries cover 90% of real-world database operations. From basic SELECT
        to complex window functions, each query includes a practical example and explains
        when to use it.
      </p>

      <StatGrid stats={[
        { value: '25 queries', label: 'cover 90% of daily MySQL operations', color: 'blue' },
        { value: 'Window functions', label: 'ROW_NUMBER, RANK, LAG/LEAD — essential for analytics', color: 'green' },
        { value: 'CTEs', label: 'WITH clause for readable complex queries', color: 'purple' },
        { value: 'EXPLAIN', label: 'always run EXPLAIN to check query performance', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Basic SELECT and Filtering" />
      <CodeBlock language="sql" filename="1-5: Essential SELECT queries">
{`-- 1. Basic SELECT with filtering and ordering
SELECT id, name, email, created_at
FROM users
WHERE status = 'active' AND age > 18
ORDER BY created_at DESC
LIMIT 50 OFFSET 100;  -- pagination

-- 2. COUNT with GROUP BY
SELECT country, COUNT(*) AS user_count, AVG(age) AS avg_age
FROM users
GROUP BY country
HAVING COUNT(*) > 100  -- filter after grouping (HAVING, not WHERE)
ORDER BY user_count DESC;

-- 3. JOIN (INNER JOIN — only matching rows)
SELECT u.name, o.order_id, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.created_at DESC;

-- 4. LEFT JOIN (all users, even with no orders)
SELECT u.name, u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;

-- 5. Subquery in WHERE
SELECT * FROM products
WHERE category_id IN (
  SELECT id FROM categories WHERE name IN ('Electronics', 'Computers')
);`}
      </CodeBlock>

      <SectionHeader number={2} title="INSERT, UPDATE, DELETE" />
      <CodeBlock language="sql" filename="6-10: Data modification queries">
{`-- 6. INSERT single row
INSERT INTO users (name, email, status, created_at)
VALUES ('Alice Johnson', 'alice@example.com', 'active', NOW());

-- 7. INSERT multiple rows
INSERT INTO products (name, price, category_id, stock) VALUES
  ('Laptop Pro', 1299.99, 1, 50),
  ('Wireless Mouse', 29.99, 1, 200),
  ('USB-C Hub', 49.99, 1, 150);

-- 8. INSERT ... ON DUPLICATE KEY UPDATE (upsert)
INSERT INTO user_stats (user_id, login_count, last_login)
VALUES (123, 1, NOW())
ON DUPLICATE KEY UPDATE
  login_count = login_count + 1,
  last_login = NOW();

-- 9. UPDATE with JOIN
UPDATE orders o
INNER JOIN users u ON o.user_id = u.id
SET o.status = 'cancelled'
WHERE u.status = 'suspended' AND o.status = 'pending';

-- 10. Safe DELETE with LIMIT
DELETE FROM sessions
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
LIMIT 1000;  -- always use LIMIT for large deletes to avoid long lock`}
      </CodeBlock>

      <SectionHeader number={3} title="Date and String Functions" />
      <CodeBlock language="sql" filename="11-15: Date and string operations">
{`-- 11. Date filtering and formatting
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS orders,
  SUM(total) AS revenue
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month;

-- 12. String operations
SELECT
  UPPER(name) AS name_upper,
  LOWER(email) AS email_lower,
  LENGTH(name) AS name_length,
  SUBSTRING(email, 1, LOCATE('@', email) - 1) AS email_username,
  CONCAT(first_name, ' ', last_name) AS full_name
FROM users;

-- 13. NULL handling
SELECT
  IFNULL(phone, 'No phone') AS phone,
  COALESCE(mobile, phone, email, 'No contact') AS primary_contact,
  NULLIF(score, 0) AS non_zero_score  -- returns NULL if score=0
FROM users;

-- 14. Conditional logic with CASE
SELECT
  name,
  total,
  CASE
    WHEN total > 1000 THEN 'VIP'
    WHEN total > 500 THEN 'Premium'
    WHEN total > 100 THEN 'Regular'
    ELSE 'New'
  END AS customer_tier
FROM orders;

-- 15. Search with LIKE and REGEXP
SELECT * FROM products WHERE name LIKE '%wireless%';
SELECT * FROM users WHERE email REGEXP '^[a-zA-Z0-9._%+-]+@gmail\.com$';`}
      </CodeBlock>

      <SectionHeader number={4} title="CTEs and Window Functions" />
      <CodeBlock language="sql" filename="16-20: Advanced queries">
{`-- 16. CTE (Common Table Expression) for readable complex queries
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

-- 17. ROW_NUMBER() — unique rank per group
SELECT
  user_id,
  order_id,
  total,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS order_num
FROM orders;
-- Use: get only each user's most recent order (WHERE order_num = 1)

-- 18. LAG/LEAD — compare to previous/next row
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS month_change
FROM monthly_revenue;

-- 19. Running total
SELECT
  created_at,
  total,
  SUM(total) OVER (ORDER BY created_at) AS running_total
FROM orders;

-- 20. FIND_IN_SET and JSON_CONTAINS for arrays
SELECT * FROM users WHERE FIND_IN_SET('admin', roles);
SELECT * FROM products WHERE JSON_CONTAINS(tags, '"sale"');`}
      </CodeBlock>

      <SectionHeader number={5} title="Performance and Utility Queries" />
      <CodeBlock language="sql" filename="21-25: Performance and utilities">
{`-- 21. EXPLAIN for query analysis
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
-- Look for: type=ALL (full scan = bad), key=NULL (no index used)

-- 22. Create index for slow query
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at);
CREATE UNIQUE INDEX idx_users_email ON users (email);

-- 23. Batch insert for performance
INSERT INTO logs (user_id, action, created_at)
SELECT id, 'account_created', NOW()
FROM users WHERE created_at > '2024-01-01';  -- INSERT from SELECT

-- 24. Recursive CTE for hierarchy
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 0 AS depth
  FROM categories WHERE parent_id IS NULL  -- root
  UNION ALL
  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, name;

-- 25. TRANSACTION for multi-step operations
START TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
  INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 500);
COMMIT;  -- or ROLLBACK if any step fails`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is the difference between HAVING and WHERE?',
          answer: 'WHERE filters individual rows before GROUP BY is applied. HAVING filters groups after GROUP BY. WHERE: cannot use aggregate functions (COUNT, SUM, etc.). HAVING: used with or without GROUP BY, can use aggregate functions. Example: WHERE age > 18 (filters rows), HAVING COUNT(*) > 10 (filters groups).',
        },
        {
          question: 'When should I use a CTE vs a subquery?',
          answer: 'CTEs are better for: reusing the same subquery multiple times, recursive queries (hierarchy/tree data), readability when the query is complex. Subqueries are fine for: simple one-time use in WHERE or SELECT. MySQL 8+ optimizes CTEs well. For complex reports, CTEs consistently produce more readable and maintainable SQL.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
