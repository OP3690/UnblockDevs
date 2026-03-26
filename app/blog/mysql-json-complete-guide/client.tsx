'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MysqlJsonCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL JSON Complete Guide — Storing, Querying, and Indexing JSON Data</h1>
      <p className="lead">
        MySQL 5.7+ has native JSON support with dedicated storage, validation, and functions.
        MySQL 8.0 added multi-valued indexes for JSON arrays. This guide covers everything:
        creating JSON columns, CRUD operations, path expressions, and performance optimization.
      </p>

      <StatGrid stats={[
        { value: 'MySQL 5.7+', label: 'native JSON column type with validation', color: 'blue' },
        { value: 'JSON_EXTRACT', label: 'or -> operator to access nested values', color: 'green' },
        { value: 'MySQL 8.0', label: 'multi-valued indexes for JSON arrays', color: 'purple' },
        { value: 'JSON_CONTAINS', label: 'search within JSON arrays efficiently', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="JSON Column Basics" />
      <QuickFact>
        MySQL's JSON column type stores JSON in an optimized binary format, not plain text.
        This allows faster access to individual values without parsing the full JSON string.
        MySQL validates JSON on insert and rejects invalid JSON with an error.
      </QuickFact>

      <CodeBlock language="sql" filename="Creating and inserting JSON data">
{`-- Create table with JSON column
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  metadata JSON,        -- flexible attributes
  tags JSON,           -- array of tags
  pricing JSON         -- nested pricing object
);

-- Insert JSON data
INSERT INTO products (name, metadata, tags, pricing) VALUES
('Laptop Pro',
 '{"brand": "Dell", "ram": 16, "storage": 512, "color": "black"}',
 '["electronics", "computers", "sale"]',
 '{"USD": 1299.99, "EUR": 1199.99, "tiers": {"wholesale": 999, "retail": 1299.99}}'
);

-- MySQL validates JSON — this would fail:
-- INSERT INTO products (metadata) VALUES ('invalid json');
-- Error: Invalid JSON text`}
      </CodeBlock>

      <SectionHeader number={2} title="Reading JSON Values" />
      <CodeBlock language="sql" filename="Extracting values from JSON columns">
{`-- Extract a value with JSON_EXTRACT (or -> shorthand)
SELECT
  name,
  JSON_EXTRACT(metadata, '$.brand') AS brand,
  metadata->>'$.brand' AS brand_unquoted,  -- ->> removes quotes
  metadata->'$.ram' AS ram_gb,
  pricing->>'$.USD' AS price_usd,
  pricing->>'$.tiers.wholesale' AS wholesale_price
FROM products;

-- Access array elements (0-indexed)
SELECT
  name,
  tags->'$[0]' AS first_tag,
  tags->'$[last]' AS last_tag,        -- MySQL 8.0+
  JSON_LENGTH(tags) AS tag_count
FROM products;

-- Filter by JSON value
SELECT * FROM products WHERE metadata->>'$.brand' = 'Dell';
SELECT * FROM products WHERE CAST(metadata->>'$.ram' AS UNSIGNED) >= 16;
SELECT * FROM products WHERE JSON_EXTRACT(pricing, '$.USD') > 1000;`}
      </CodeBlock>

      <SectionHeader number={3} title="Modifying JSON Data" />
      <CodeBlock language="sql" filename="Update and modify JSON values">
{`-- Update a specific JSON field
UPDATE products
SET metadata = JSON_SET(metadata, '$.color', 'silver')
WHERE id = 1;

-- JSON_SET (insert or update), JSON_INSERT (only insert if not exists), JSON_REPLACE (only update if exists)
UPDATE products
SET metadata = JSON_SET(
  metadata,
  '$.color', 'silver',     -- update existing
  '$.weight_kg', 1.8       -- add new field
)
WHERE id = 1;

-- Remove a JSON field
UPDATE products
SET metadata = JSON_REMOVE(metadata, '$.color')
WHERE id = 1;

-- Append to JSON array
UPDATE products
SET tags = JSON_ARRAY_APPEND(tags, '$', 'featured')
WHERE id = 1;

-- Increment a JSON number
UPDATE products
SET metadata = JSON_SET(metadata, '$.views', IFNULL(metadata->>'$.views', 0) + 1)
WHERE id = 1;`}
      </CodeBlock>

      <SectionHeader number={4} title="Searching JSON Arrays" />
      <CodeBlock language="sql" filename="JSON_CONTAINS and JSON_OVERLAPS">
{`-- Find products with a specific tag
SELECT * FROM products WHERE JSON_CONTAINS(tags, '"electronics"');

-- Find products with ANY of these tags (MySQL 8.0+)
SELECT * FROM products WHERE JSON_OVERLAPS(tags, '["sale", "clearance"]');

-- Find products where tag array contains at least 2 items
SELECT * FROM products WHERE JSON_LENGTH(tags) >= 2;

-- Search within nested object
SELECT * FROM products
WHERE JSON_CONTAINS(metadata, '{"brand": "Dell"}');

-- JSON_SEARCH — find path of a value
SELECT
  name,
  JSON_SEARCH(tags, 'one', 'electronics') AS path_found
FROM products;
-- Returns: "$[0]" if 'electronics' is first element, NULL if not found

-- Multi-valued index for JSON arrays (MySQL 8.0+)
ALTER TABLE products ADD INDEX idx_tags ((CAST(tags AS CHAR(100) ARRAY)));
-- Now JSON_CONTAINS queries on tags use this index!`}
      </CodeBlock>

      <AlertBox type="tip" title="Use generated columns for frequently queried JSON fields">
        {`If you always query by a specific JSON field (like metadata.brand), create a generated column: ALTER TABLE products ADD COLUMN brand VARCHAR(100) GENERATED ALWAYS AS (metadata->>'$.brand') STORED; CREATE INDEX idx_brand ON products(brand); This gives you full index performance on that field without changing your JSON storage.`}
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Should I use JSON columns or a normalized table structure?',
          answer: 'Use JSON for: truly flexible/variable attributes, configuration objects, API response caching, schema-less data that varies by record. Use normalized tables for: data you regularly filter/sort/join on, data with known fixed structure, data with foreign key relationships, high-performance OLTP. JSON columns are NOT a replacement for proper relational design.',
        },
        {
          question: 'What is the difference between JSON_EXTRACT and -> in MySQL?',
          answer: 'They\'re equivalent: JSON_EXTRACT(col, \'$.key\') = col->\'$.key\'. The -> operator is shorthand for JSON_EXTRACT. The ->> operator extracts and unquotes (removes surrounding double quotes from string values). Use ->> when you want plain string output for comparisons: metadata->>\'$.brand\' = \'Dell\'.',
        },
        {
          question: 'Can I use JSON columns with MySQL replication?',
          answer: 'Yes — JSON columns replicate correctly in MySQL replication (row-based or statement-based). However, JSON modification functions (JSON_SET, JSON_REMOVE) work differently in statement replication. Use row-based replication (binlog_format=ROW) for safest JSON replication behavior.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
