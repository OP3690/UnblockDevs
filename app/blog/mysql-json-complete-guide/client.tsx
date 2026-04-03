'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MysqlJsonCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>MySQL JSON Complete Guide — Storing, Querying, and Indexing JSON Data</h1>
      <p className="lead">
        MySQL 5.7+ has native JSON support with dedicated storage, validation, and a rich set of
        functions for accessing and modifying JSON data. MySQL 8.0 added multi-valued indexes for
        JSON arrays, making searches performant. This complete guide covers creating JSON columns,
        CRUD operations, path expressions, searching arrays, using generated columns for indexing,
        and when to use JSON versus normalized tables.
      </p>

      <StatGrid stats={[
        { value: 'MySQL 5.7+', label: 'native JSON column type with automatic validation', color: 'blue' },
        { value: 'JSON_EXTRACT', label: '(or -> operator) to access deeply nested values', color: 'green' },
        { value: 'MySQL 8.0', label: 'multi-valued indexes for JSON arrays — enables indexed searches', color: 'purple' },
        { value: 'Generated columns', label: 'index specific JSON fields for maximum query performance', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="JSON Column Basics — Creating and Inserting" />
      <p>
        MySQL's JSON column type stores JSON in an optimized binary format rather than plain text.
        This allows faster access to individual values without parsing the full string on every query.
        MySQL validates JSON on insert and rejects malformed JSON with an error — preventing data corruption.
      </p>
      <QuickFact color="blue" label="Binary JSON storage">
        MySQL's JSON column type stores JSON in an optimized binary format, not plain text.
        This allows faster access to individual values without parsing the full JSON on every read.
        MySQL validates JSON on insert and rejects invalid JSON with an error — you cannot store
        malformed JSON accidentally. JSON columns also auto-normalize whitespace (pretty-printing is stripped on storage).
      </QuickFact>
      <CodeBlock lang="sql" title="Creating and inserting JSON data">
{`-- Create table with JSON column
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  metadata JSON,        -- flexible product attributes
  tags JSON,            -- array of tag strings
  pricing JSON          -- nested pricing object with currency keys
);

-- Insert JSON data — both string literals and JSON_OBJECT/JSON_ARRAY functions work
INSERT INTO products (name, metadata, tags, pricing) VALUES
('Laptop Pro',
 '{"brand": "Dell", "ram": 16, "storage": 512, "color": "black"}',
 '["electronics", "computers", "sale"]',
 '{"USD": 1299.99, "EUR": 1199.99, "tiers": {"wholesale": 999, "retail": 1299.99}}'
);

-- Using JSON_OBJECT and JSON_ARRAY functions for type safety
INSERT INTO products (name, metadata, tags) VALUES (
  'Wireless Mouse',
  JSON_OBJECT('brand', 'Logitech', 'wireless', true, 'battery_life_days', 90),
  JSON_ARRAY('electronics', 'accessories', 'peripherals')
);

-- MySQL validates JSON on insert — this raises an error:
-- INSERT INTO products (metadata) VALUES ('invalid json {]');
-- ERROR 3140: Invalid JSON text: "Invalid value." at position 14 in value for 'metadata'`}
      </CodeBlock>

      <SectionHeader number={2} title="Reading JSON Values — Extraction Operators" />
      <CodeBlock lang="sql" title="Extracting values from JSON columns">
{`-- JSON_EXTRACT: access nested values using path expressions
SELECT
  name,
  JSON_EXTRACT(metadata, '$.brand') AS brand,      -- returns: "Dell" (with quotes)
  metadata->>'$.brand' AS brand_clean,              -- ->> removes quotes: Dell
  metadata->'$.ram' AS ram_gb,                      -- returns: 16 (number)
  pricing->>'$.USD' AS price_usd,                   -- returns: 1299.99
  pricing->>'$.tiers.wholesale' AS wholesale_price  -- nested object access
FROM products;

-- Access array elements by index (0-based)
SELECT
  name,
  tags->'$[0]' AS first_tag,       -- first element
  tags->'$[last]' AS last_tag,     -- last element (MySQL 8.0+)
  tags->'$[1 to 2]' AS middle_tags, -- range (MySQL 8.0+)
  JSON_LENGTH(tags) AS tag_count    -- number of elements
FROM products;

-- Filter rows by JSON field values
SELECT * FROM products WHERE metadata->>'$.brand' = 'Dell';

-- Compare numeric JSON values (cast required for comparisons)
SELECT * FROM products WHERE CAST(metadata->>'$.ram' AS UNSIGNED) >= 16;
SELECT * FROM products WHERE JSON_EXTRACT(pricing, '$.USD') > 1000;

-- Extract multiple values at once with JSON_EXTRACT and comma-separated paths
SELECT name, JSON_EXTRACT(metadata, '$.brand', '$.ram') AS brand_and_ram
FROM products;
-- Returns: ["Dell", 16]`}
      </CodeBlock>

      <SectionHeader number={3} title="Modifying JSON Data" />
      <CodeBlock lang="sql" title="Update and modify JSON values in place">
{`-- JSON_SET: insert OR update a field (most commonly used)
UPDATE products
SET metadata = JSON_SET(metadata, '$.color', 'silver')
WHERE id = 1;

-- Set multiple fields at once
UPDATE products
SET metadata = JSON_SET(
  metadata,
  '$.color', 'silver',     -- update existing field
  '$.weight_kg', 1.8,      -- add new field
  '$.updated_at', NOW()    -- add timestamp
)
WHERE id = 1;

-- JSON_INSERT: only adds if the key doesn't exist (won't overwrite)
UPDATE products
SET metadata = JSON_INSERT(metadata, '$.discount_pct', 10)
WHERE id = 1;

-- JSON_REPLACE: only updates existing keys (won't add new ones)
UPDATE products
SET metadata = JSON_REPLACE(metadata, '$.color', 'blue')
WHERE id = 1;

-- Remove a JSON field
UPDATE products
SET metadata = JSON_REMOVE(metadata, '$.color')
WHERE id = 1;

-- Append to JSON array
UPDATE products
SET tags = JSON_ARRAY_APPEND(tags, '$', 'featured')
WHERE id = 1;
-- Prepend: JSON_ARRAY_INSERT(tags, '$[0]', 'new-tag')

-- Increment a numeric JSON field safely
UPDATE products
SET metadata = JSON_SET(
  metadata,
  '$.views',
  COALESCE(CAST(metadata->>'$.views' AS UNSIGNED), 0) + 1
)
WHERE id = 1;`}
      </CodeBlock>

      <SectionHeader number={4} title="Searching JSON Arrays" />
      <CodeBlock lang="sql" title="JSON_CONTAINS, JSON_OVERLAPS, and JSON_SEARCH">
{`-- Find products with a specific tag (string must be quoted in JSON)
SELECT * FROM products WHERE JSON_CONTAINS(tags, '"electronics"');

-- Find products with ANY of these tags (MySQL 8.0.17+)
SELECT * FROM products WHERE JSON_OVERLAPS(tags, '["sale", "clearance", "featured"]');

-- Find products that contain ALL specified tags
SELECT * FROM products
WHERE JSON_CONTAINS(tags, '"electronics"')
  AND JSON_CONTAINS(tags, '"sale"');

-- Count elements
SELECT * FROM products WHERE JSON_LENGTH(tags) >= 3;

-- Search within nested object — match partial object
SELECT * FROM products
WHERE JSON_CONTAINS(metadata, '{"brand": "Dell"}');

-- JSON_SEARCH: find the path to a value within JSON
SELECT
  name,
  JSON_SEARCH(tags, 'one', 'electronics') AS path_of_tag
FROM products;
-- Returns: "$[0]" if 'electronics' is first, NULL if not found
-- 'one' = return first match; 'all' = return all matches as array

-- Multi-valued index for JSON array searches (MySQL 8.0+)
-- Allows JSON_CONTAINS to use an index instead of full table scan
ALTER TABLE products
ADD INDEX idx_tags ((CAST(tags AS CHAR(100) ARRAY)));

-- Verify the index is being used
EXPLAIN SELECT * FROM products WHERE JSON_CONTAINS(tags, '"electronics"');
-- Should show: key: idx_tags`}
      </CodeBlock>

      <SectionHeader number={5} title="Generated Columns — Index Specific JSON Fields" />
      <p>
        Generated columns extract specific JSON values into regular columns, enabling standard
        B-tree indexes on those values. This is the best pattern for JSON fields you query frequently.
      </p>
      <CodeBlock lang="sql" title="Generated columns for indexed JSON access">
{`-- Add generated column for a JSON field you frequently filter/sort by
ALTER TABLE products
ADD COLUMN brand VARCHAR(100)
  GENERATED ALWAYS AS (metadata->>'$.brand') STORED;

-- Now create a regular index on the generated column
CREATE INDEX idx_brand ON products(brand);

-- Queries using brand now use the index (not a full table scan)
EXPLAIN SELECT * FROM products WHERE brand = 'Dell';
-- type: ref, key: idx_brand — O(log n) lookup

-- Generated column for numeric JSON field with type casting
ALTER TABLE products
ADD COLUMN ram_gb INT UNSIGNED
  GENERATED ALWAYS AS (CAST(metadata->>'$.ram' AS UNSIGNED)) STORED;

CREATE INDEX idx_ram ON products(ram_gb);

SELECT * FROM products WHERE ram_gb >= 16 ORDER BY ram_gb;
-- Uses idx_ram — fast sorted access

-- Composite index for multiple JSON-derived fields
ALTER TABLE products
ADD COLUMN price_usd DECIMAL(10,2)
  GENERATED ALWAYS AS (CAST(pricing->>'$.USD' AS DECIMAL(10,2))) STORED;

CREATE INDEX idx_brand_price ON products(brand, price_usd);
-- Supports: WHERE brand = 'Dell' AND price_usd < 1500`}
      </CodeBlock>

      <AlertBox type="tip" title="Use generated columns for frequently queried JSON fields">
        If you always filter or sort by a specific JSON field (like metadata brand, pricing USD,
        or status), create a stored generated column and index it. This gives you full B-tree
        index performance on that JSON field while keeping the flexible JSON storage for
        all other attributes. The generated column is automatically kept in sync by MySQL
        whenever the JSON column is updated — no manual maintenance needed.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'VIRTUAL vs STORED generated columns', description: 'VIRTUAL columns are computed on read — no storage overhead but cannot be indexed directly. STORED columns are computed on write and physically stored — use more disk space but can be indexed with standard B-tree indexes. Use STORED for any generated column you want to index.' },
        { title: 'JSON column performance tips', description: 'Avoid SELECT * with large JSON columns — transfer cost is high. Select only the JSON fields you need: SELECT name, metadata->>\'$.brand\' AS brand. For writes, update specific JSON paths with JSON_SET rather than replacing the entire JSON object to avoid invalidating caches.' },
        { title: 'JSON vs TEXT/VARCHAR for JSON storage', description: 'Always use the JSON type, not TEXT or VARCHAR for JSON. The JSON type: validates syntax on insert, stores in optimized binary format, supports path operators (->, ->>), enables multi-valued indexes. TEXT/VARCHAR stores raw string, requires parsing on every access, and provides no query functions.' },
        { title: 'NULL vs JSON null', description: 'SQL NULL (column has no value) is different from JSON null (the literal null value in JSON). metadata IS NULL checks SQL null. JSON_EXTRACT(metadata, \'$.status\') = CAST(\'null\' AS JSON) checks JSON null. Be explicit about which you mean in queries and application code.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Should I use JSON columns or a normalized table structure?',
          answer: 'Use JSON for: truly flexible attributes that vary by product/record (e-commerce product attributes where laptops have RAM specs but t-shirts have colors and sizes), configuration objects, API response caching, schema-less data where structure changes frequently. Use normalized relational tables for: data you regularly filter, sort, or join on, data with foreign key relationships, data with fixed known structure, high-frequency OLTP operations. JSON columns are NOT a replacement for proper relational design — they are a complement for the flexible parts.',
        },
        {
          question: 'What is the difference between -> and ->> in MySQL?',
          answer: 'Both are shorthand for JSON_EXTRACT. The -> operator extracts and returns the JSON representation — string values include surrounding double quotes: metadata->\'$.brand\' returns "Dell". The ->> operator extracts and unquotes — string values have quotes removed: metadata->>\'$.brand\' returns Dell. Use ->> for string comparisons (metadata->>\'$.brand\' = \'Dell\' works; metadata->\'$.brand\' = \'Dell\' fails because it\'s comparing to "Dell" with quotes).',
        },
        {
          question: 'Can I use JSON columns with MySQL replication?',
          answer: 'Yes — JSON columns replicate correctly in MySQL standard replication. However, JSON modification functions (JSON_SET, JSON_REMOVE) generate different SQL statements depending on binlog_format. With statement-based replication (binlog_format=STATEMENT), the function calls are replicated. With row-based replication (binlog_format=ROW), the full updated row is replicated. For safest JSON replication behavior, use row-based replication, which replicates the actual data changes rather than the SQL statements.',
        },
        {
          question: 'How do I query all products that have a specific JSON key?',
          answer: 'Use JSON_CONTAINS_PATH to check for key existence. Example: SELECT * FROM products WHERE JSON_CONTAINS_PATH(metadata, \'one\', \'$.color\'); — returns rows where metadata has a "color" key (regardless of its value). The \'one\' means "at least one of the specified paths exists". Use \'all\' to require all specified paths to exist.',
        },
        {
          question: 'What is the maximum size of a JSON column in MySQL?',
          answer: 'The maximum size of a JSON document in MySQL is limited by the max_allowed_packet variable, which defaults to 64MB and can be set up to 1GB. In practice, storing very large JSON documents (>1MB) in a MySQL JSON column is generally a design smell — it suggests you should either normalize the data into proper tables or use a document database (MongoDB, PostgreSQL with JSONB). For typical use cases (product attributes, config objects, API responses), JSON documents are well under 100KB.',
        },
        {
          question: 'How do I aggregate JSON values across rows?',
          answer: 'Use JSON_ARRAYAGG to collect values into a JSON array, or JSON_OBJECTAGG to build a JSON object. Examples: SELECT JSON_ARRAYAGG(name) FROM products WHERE brand = \'Dell\'; (returns array of names). SELECT JSON_OBJECTAGG(id, name) FROM products LIMIT 10; (returns {id: name, ...} object). These aggregate functions work with GROUP BY for building summary JSON objects per group.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
