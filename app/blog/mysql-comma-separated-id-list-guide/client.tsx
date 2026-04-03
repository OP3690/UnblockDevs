'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MysqlCommaSeparatedIdListGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL Comma-Separated ID List — FIND_IN_SET, JSON, and Better Alternatives</h1>
      <p className="lead">
        Storing comma-separated IDs in a MySQL column is a common anti-pattern that causes
        query nightmares. This guide shows how to query them when you're stuck with the old
        design, how to properly redesign using junction tables, and when MySQL's native JSON
        type offers a middle ground. Whether you're maintaining legacy code or designing a
        new schema, understanding the trade-offs of each approach is essential for building
        scalable, performant MySQL databases.
      </p>

      <StatGrid stats={[
        { value: 'FIND_IN_SET', label: 'MySQL function to search comma-separated values', color: 'blue' },
        { value: 'Anti-pattern', label: 'storing CSVs in a column breaks first normal form', color: 'red' },
        { value: 'Junction table', label: 'the correct relational solution for many-to-many', color: 'green' },
        { value: 'JSON_CONTAINS', label: 'MySQL 5.7+ for JSON array columns with index support', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Problem — Why CSV IDs Are a Bad Design" />
      <p>
        Storing "1,2,3,4,5" in a single VARCHAR column violates the First Normal Form (1NF) of
        relational database design: each column should contain atomic (indivisible) values. The
        consequences are practical, not just theoretical. CSV columns can't use indexes for
        individual value lookups, can't enforce foreign key constraints, can't be counted or
        aggregated efficiently, and require workaround regex patterns for every query.
      </p>
      <QuickFact color="amber" label="Performance reality check">
        FIND_IN_SET performs a full table scan — O(n). A junction table with proper indexes
        performs O(log n) or better with B-tree indexes. For a table with 1 million rows,
        the difference is thousands of milliseconds vs single-digit milliseconds.
        FIND_IN_SET is only acceptable for small tables (under 10,000 rows) with infrequent queries.
      </QuickFact>

      <SectionHeader number={2} title="Querying Existing Comma-Separated Data" />
      <p>
        If you're maintaining a legacy system with CSV ID columns, these queries will help
        you work with the data until you can migrate to a better design.
      </p>
      <CodeBlock lang="sql" title="FIND_IN_SET for CSV column queries">
{`-- Table with comma-separated tags (legacy design)
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids VARCHAR(500)  -- stores "1,3,7,12" — anti-pattern
);

-- 1. Find articles with a specific tag_id (FIND_IN_SET — full table scan)
SELECT * FROM articles WHERE FIND_IN_SET('3', tag_ids);

-- 2. Find articles with ANY of these tags (OR logic)
SELECT * FROM articles
WHERE FIND_IN_SET('3', tag_ids)
   OR FIND_IN_SET('7', tag_ids)
   OR FIND_IN_SET('12', tag_ids);

-- 3. Find articles containing ALL of these tags (AND logic)
SELECT * FROM articles
WHERE FIND_IN_SET('3', tag_ids)
  AND FIND_IN_SET('7', tag_ids);

-- 4. Count tags per article (count commas + 1)
SELECT id, title,
  LENGTH(tag_ids) - LENGTH(REPLACE(tag_ids, ',', '')) + 1 AS tag_count
FROM articles
WHERE tag_ids IS NOT NULL AND tag_ids != '';

-- 5. Find articles with exactly N tags
SELECT * FROM articles
WHERE LENGTH(tag_ids) - LENGTH(REPLACE(tag_ids, ',', '')) = 2; -- exactly 3 tags`}
      </CodeBlock>

      <SectionHeader number={3} title="Splitting CSV and Joining to Related Table" />
      <CodeBlock lang="sql" title="Recursive CTE to split CSV and join (MySQL 8.0+)">
{`-- Split CSV column and join to tags table using recursive CTE (MySQL 8.0+)
WITH RECURSIVE split AS (
  -- Anchor: extract first tag ID and set remaining as rest of CSV
  SELECT
    id,
    TRIM(SUBSTRING_INDEX(tag_ids, ',', 1)) AS tag_id,
    IF(LOCATE(',', tag_ids) > 0,
       SUBSTRING(tag_ids, LOCATE(',', tag_ids) + 1),
       NULL) AS remaining
  FROM articles WHERE tag_ids IS NOT NULL AND tag_ids != ''

  UNION ALL

  -- Recursive: extract next tag_id from remaining CSV
  SELECT
    id,
    TRIM(SUBSTRING_INDEX(remaining, ',', 1)),
    IF(LOCATE(',', remaining) > 0,
       SUBSTRING(remaining, LOCATE(',', remaining) + 1),
       NULL)
  FROM split WHERE remaining IS NOT NULL
)
SELECT a.title, t.name AS tag_name
FROM split s
JOIN articles a ON s.id = a.id
JOIN tags t ON t.id = CAST(s.tag_id AS UNSIGNED);

-- Simpler alternative for MySQL 5.7: use application-side splitting
-- or a stored procedure to iterate and join`}
      </CodeBlock>

      <SectionHeader number={4} title="The Correct Solution — Junction Table" />
      <p>
        A junction table (also called a bridge table or associative table) is the standard
        relational solution for many-to-many relationships. It allows full use of indexes,
        foreign key constraints, and all standard SQL operations.
      </p>
      <ErrorFix
        title="CSV column vs junction table — the right way to model many-to-many"
        bad={`-- ❌ Anti-pattern: CSV IDs in a column
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids VARCHAR(500)  -- "1,3,7,12"
);

-- Problems:
-- 1. No index on individual tag IDs — full table scan every time
-- 2. No foreign key constraint — orphaned IDs accumulate silently
-- 3. COUNT, GROUP BY, JOIN are all workarounds
-- 4. Adding or removing a single tag requires string manipulation`}
        good={`-- ✅ Correct: Junction/bridge table (many-to-many)
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Junction table: one row per article-tag relationship
CREATE TABLE article_tags (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),         -- composite PK prevents duplicates
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  INDEX idx_tag_id (tag_id)                 -- index for reverse lookups
);

-- Query: articles with tag "programming" — uses indexes!
SELECT a.* FROM articles a
JOIN article_tags at ON a.id = at.article_id
JOIN tags t ON at.tag_id = t.id
WHERE t.name = 'programming';

-- Add a tag: one INSERT, no string manipulation
INSERT INTO article_tags (article_id, tag_id) VALUES (5, 3);

-- Remove a tag: one DELETE, no string manipulation
DELETE FROM article_tags WHERE article_id = 5 AND tag_id = 3;

-- Count tags per article
SELECT a.id, a.title, COUNT(at.tag_id) AS tag_count
FROM articles a
LEFT JOIN article_tags at ON a.id = at.article_id
GROUP BY a.id, a.title;`}
        badLabel="CSV IDs — slow, no indexes, no constraints"
        goodLabel="Junction table — fast, normalized, referential integrity"
      />

      <SectionHeader number={5} title="MySQL JSON Arrays as Alternative" />
      <p>
        MySQL's native JSON type (added in 5.7) provides a middle ground: structured
        storage with better query capabilities than CSV, and multi-valued indexes
        in MySQL 8.0+ that allow efficient searches. This is a good option when
        the array has variable length and order matters, but a full junction table is overkill.
      </p>
      <CodeBlock lang="sql" title="JSON array column in MySQL 5.7+">
{`-- JSON column for flexible arrays (good when order matters or schema is dynamic)
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids JSON  -- stores [1, 3, 7, 12] — properly typed
);

-- Insert with JSON_ARRAY function
INSERT INTO articles VALUES (1, 'MySQL Guide', JSON_ARRAY(1, 3, 7));
INSERT INTO articles VALUES (2, 'Redis Guide', '[5, 8, 12]');  -- literal JSON string also works

-- Find articles containing tag_id 3 (JSON_CONTAINS)
SELECT * FROM articles WHERE JSON_CONTAINS(tag_ids, '3');

-- Find articles containing any of [3, 7] (JSON_OVERLAPS — MySQL 8.0.17+)
SELECT * FROM articles WHERE JSON_OVERLAPS(tag_ids, '[3, 7]');

-- Count tags per article
SELECT id, title, JSON_LENGTH(tag_ids) AS tag_count FROM articles;

-- Get the first tag
SELECT id, title, tag_ids->>'$[0]' AS first_tag FROM articles;

-- Add a tag to existing array
UPDATE articles SET tag_ids = JSON_ARRAY_APPEND(tag_ids, '$', 12) WHERE id = 1;

-- Remove a specific tag (MySQL 8.0+ with JSON_REMOVE using path)
-- Requires knowing the index position — awkward for value-based removal
UPDATE articles SET tag_ids = JSON_REMOVE(tag_ids, '$[1]') WHERE id = 1;

-- MySQL 8.0+: Multi-valued index for efficient JSON_CONTAINS queries
ALTER TABLE articles ADD INDEX idx_tag_ids ((CAST(tag_ids AS UNSIGNED ARRAY)));
-- Now JSON_CONTAINS(tag_ids, '3') uses the index instead of full table scan!`}
      </CodeBlock>

      <SectionHeader number={6} title="Migration: CSV Column to Junction Table" />
      <CodeBlock lang="sql" title="Migrating CSV column to junction table safely">
{`-- Step 1: Create the proper structure
CREATE TABLE article_tags_new (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Step 2: Migrate existing data using recursive CTE (MySQL 8.0+)
WITH RECURSIVE split AS (
  SELECT id,
    CAST(TRIM(SUBSTRING_INDEX(tag_ids, ',', 1)) AS UNSIGNED) AS tag_id,
    IF(LOCATE(',', tag_ids) > 0, SUBSTRING(tag_ids, LOCATE(',', tag_ids) + 1), NULL) AS remaining
  FROM articles WHERE tag_ids IS NOT NULL AND tag_ids != ''
  UNION ALL
  SELECT id,
    CAST(TRIM(SUBSTRING_INDEX(remaining, ',', 1)) AS UNSIGNED),
    IF(LOCATE(',', remaining) > 0, SUBSTRING(remaining, LOCATE(',', remaining) + 1), NULL)
  FROM split WHERE remaining IS NOT NULL
)
INSERT IGNORE INTO article_tags_new (article_id, tag_id)
SELECT id, tag_id FROM split WHERE tag_id > 0;  -- filter out empty strings

-- Step 3: Verify counts match
SELECT COUNT(*) FROM article_tags_new;
-- Compare with: SELECT SUM(LENGTH(tag_ids) - LENGTH(REPLACE(tag_ids, ',', '')) + 1) FROM articles WHERE tag_ids != '';

-- Step 4: Update application code to use new table
-- Step 5: Drop old column (after testing!)
ALTER TABLE articles DROP COLUMN tag_ids;`}
      </CodeBlock>

      <AlertBox type="warning" title="Migrating from CSV to junction table">
        Test migration thoroughly with edge cases: empty strings (''), NULL values, single IDs
        without commas, trailing commas (1,2,3,), and IDs that reference non-existent tags.
        Run the migration on a copy of production data first. Keep the old column until the
        application is fully tested and working with the junction table.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'When is it OK to use comma-separated values in MySQL?',
          answer: 'Almost never for relational data that needs querying. Acceptable exceptions: display-only fields never filtered or joined (e.g., a "related_links" column storing URLs just for human reading), configuration values always read as a complete string, or audit/log fields storing historical snapshots. If you ever need to filter, join, count, or update individual elements, use a proper junction table. The short-term convenience of CSV storage always becomes technical debt.',
        },
        {
          question: 'What is the performance difference between FIND_IN_SET and a junction table?',
          answer: 'FIND_IN_SET performs a full table scan — it must read every row and evaluate the function for each one. O(n) complexity. A junction table with proper indexes performs an index seek — O(log n). For 1 million rows: FIND_IN_SET might take 1000–5000ms; a junction table query takes 1–5ms. The difference matters even at smaller scale. FIND_IN_SET is only acceptable for tables under ~10,000 rows with infrequent queries.',
        },
        {
          question: 'Should I use JSON columns or a junction table?',
          answer: 'Junction table is almost always better for relational data. JSON columns are appropriate when: (1) the array schema is truly variable and changes frequently, (2) you need to store metadata alongside each relationship (use JSON_OBJECT), (3) you\'re storing non-relational data that happens to be an array (like a list of config options not tied to other tables). If the JSON array values are foreign keys to other tables, use a junction table — you get referential integrity, proper indexes, and simpler queries.',
        },
        {
          question: 'How do I find articles that have ALL of a specific set of tags?',
          answer: 'With a junction table: use GROUP BY and HAVING COUNT. SELECT article_id FROM article_tags WHERE tag_id IN (3, 7, 12) GROUP BY article_id HAVING COUNT(DISTINCT tag_id) = 3; — this finds articles that have all three tags. With FIND_IN_SET you need multiple AND conditions which is verbose and still does full table scans. With JSON: JSON_CONTAINS(tag_ids, JSON_ARRAY(3, 7, 12)) checks if all elements are present.',
        },
        {
          question: 'What is the REGEXP alternative to FIND_IN_SET?',
          answer: 'REGEXP (or RLIKE) can search CSV columns: WHERE tag_ids REGEXP "(^|,)3(,|$)". This avoids false matches (e.g., matching 13 when searching for 3) by requiring comma or start/end boundaries. However, REGEXP is even slower than FIND_IN_SET and requires careful pattern construction. FIND_IN_SET is cleaner for simple membership checks. Neither uses indexes — for performance, migrate to a junction table.',
        },
        {
          question: 'Can I add an index on a CSV column to speed up FIND_IN_SET?',
          answer: 'No — standard B-tree indexes cannot help FIND_IN_SET because the index stores the whole string value, not individual elements. MySQL cannot use an index to find rows where a specific substring matches. A FULLTEXT index in MySQL is designed for natural language text, not structured CSV data. The only way to get indexed lookups for individual elements is to use a junction table or JSON column with a multi-valued index (MySQL 8.0+).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
