'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MysqlCommaSeparatedIdListGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL Comma-Separated ID List — FIND_IN_SET, JSON, and Better Alternatives</h1>
      <p className="lead">
        Storing comma-separated IDs in a MySQL column is a common anti-pattern that causes
        query nightmares. This guide shows how to query them when you're stuck with the old
        design, and how to properly redesign using junction tables or JSON.
      </p>

      <StatGrid stats={[
        { value: 'FIND_IN_SET', label: 'MySQL function to search comma-separated values', color: 'blue' },
        { value: 'Anti-pattern', label: 'storing CSVs in a column breaks first normal form', color: 'red' },
        { value: 'Junction table', label: 'the correct relational solution', color: 'green' },
        { value: 'JSON_CONTAINS', label: 'MySQL 5.7+ for JSON array columns', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Problem — Why CSV IDs Are Bad" />
      <QuickFact>
        Storing "1,2,3,4,5" in a column violates database normalization (1NF). You can't use
        indexes, can't do foreign key constraints, can't easily count elements, and queries
        become regex nightmares. But legacy systems often have this pattern — here's how to
        deal with it.
      </QuickFact>

      <SectionHeader number={2} title="Querying Existing Comma-Separated Data" />
      <CodeBlock language="sql" filename="FIND_IN_SET for CSV column queries">
{`-- Table with comma-separated tags (legacy design)
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids VARCHAR(500)  -- stores "1,3,7,12"
);

-- 1. Find articles with tag_id 3
SELECT * FROM articles WHERE FIND_IN_SET('3', tag_ids);

-- 2. Find articles with ANY of these tags
SELECT * FROM articles
WHERE FIND_IN_SET('3', tag_ids)
   OR FIND_IN_SET('7', tag_ids)
   OR FIND_IN_SET('12', tag_ids);

-- 3. Count tags per article
SELECT id, title, LENGTH(tag_ids) - LENGTH(REPLACE(tag_ids, ',', '')) + 1 AS tag_count
FROM articles
WHERE tag_ids IS NOT NULL AND tag_ids != '';

-- 4. Split CSV and join to tags table
-- MySQL 8.0+ with recursive CTE
WITH RECURSIVE split AS (
  SELECT
    id,
    TRIM(SUBSTRING_INDEX(tag_ids, ',', 1)) AS tag_id,
    IF(LOCATE(',', tag_ids) > 0, SUBSTRING(tag_ids, LOCATE(',', tag_ids) + 1), NULL) AS remaining
  FROM articles WHERE tag_ids IS NOT NULL
  UNION ALL
  SELECT
    id,
    TRIM(SUBSTRING_INDEX(remaining, ',', 1)),
    IF(LOCATE(',', remaining) > 0, SUBSTRING(remaining, LOCATE(',', remaining) + 1), NULL)
  FROM split WHERE remaining IS NOT NULL
)
SELECT a.title, t.name AS tag_name
FROM split s
JOIN articles a ON s.id = a.id
JOIN tags t ON t.id = s.tag_id;`}
      </CodeBlock>

      <SectionHeader number={3} title="The Right Solution — Junction Table" />
      <ErrorFix
        bad={`-- ❌ Anti-pattern: CSV IDs in a column
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids VARCHAR(500)  -- "1,3,7,12"
);

-- Querying is painful, no indexes, no FK constraints`}
        good={`-- ✅ Correct: Junction/bridge table (many-to-many)
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE article_tags (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Query: articles with tag "programming"
SELECT a.* FROM articles a
JOIN article_tags at ON a.id = at.article_id
JOIN tags t ON at.tag_id = t.id
WHERE t.name = 'programming';  -- uses indexes!`}
        badLabel="CSV IDs — slow, no indexes"
        goodLabel="Junction table — fast, normalized"
      />

      <SectionHeader number={4} title="MySQL JSON Arrays as Alternative" />
      <CodeBlock language="sql" filename="JSON array column in MySQL 5.7+">
{`-- JSON column for flexible arrays (good when order matters or schema is dynamic)
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  tag_ids JSON  -- stores [1, 3, 7, 12]
);

-- Insert
INSERT INTO articles VALUES (1, 'MySQL Guide', JSON_ARRAY(1, 3, 7));

-- Find articles containing tag_id 3
SELECT * FROM articles WHERE JSON_CONTAINS(tag_ids, '3');

-- Find articles containing any of [3, 7]
SELECT * FROM articles WHERE JSON_OVERLAPS(tag_ids, '[3, 7]');

-- Count tags
SELECT id, title, JSON_LENGTH(tag_ids) AS tag_count FROM articles;

-- Add a tag
UPDATE articles SET tag_ids = JSON_ARRAY_APPEND(tag_ids, '$', 12) WHERE id = 1;

-- Index for JSON searches (MySQL 8.0+ multi-valued index)
ALTER TABLE articles ADD INDEX idx_tag_ids ((CAST(tag_ids AS UNSIGNED ARRAY)));
-- Now JSON_CONTAINS uses the index!`}
      </CodeBlock>

      <AlertBox type="warning" title="Migrating from CSV to junction table">
        Migration script outline: 1) Create new junction table, 2) Use a split-and-insert
        procedure to populate it from CSV column, 3) Update application code to use new table,
        4) Drop CSV column. Test thoroughly — FIND_IN_SET queries with edge cases
        (empty strings, trailing commas) can be tricky.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'When is it OK to use comma-separated values in MySQL?',
          answer: 'Almost never for relational data that needs querying. Acceptable exceptions: display-only data that\'s never filtered or joined (e.g., a "notes" field where you store tags just for human reading), configuration values that are always read as a complete string, or audit/log fields storing historical snapshots. If you ever need to query by any individual element, use a proper junction table.',
        },
        {
          question: 'What is the performance difference between FIND_IN_SET and a junction table?',
          answer: 'FIND_IN_SET performs a full table scan — O(n). A junction table with proper indexes performs O(log n) or better. For a table with 1 million rows, the difference is thousands of milliseconds vs milliseconds. FIND_IN_SET is only acceptable for small tables (under 10,000 rows) with infrequent queries.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
