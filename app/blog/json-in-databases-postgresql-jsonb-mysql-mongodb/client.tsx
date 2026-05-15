'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function JsonInDatabasesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON in Databases 2026: PostgreSQL JSONB vs MySQL JSON vs MongoDB Complete Guide</h1>
      <p className="lead">
        Modern applications rarely have perfectly uniform data. Products have different attributes.
        User preferences vary. Event payloads change over time. The traditional answer was to normalize
        everything into rigid tables &mdash; adding columns for every possible attribute, leaving most of
        them null. The modern answer is JSON columns: store structured-but-flexible data inside a
        relational or document database, query it with SQL or native operators, and index the fields
        you actually filter on. This guide covers PostgreSQL JSONB (the gold standard), MySQL JSON
        columns, and MongoDB&apos;s document model &mdash; with real SQL, query patterns, indexing strategies,
        and a decision framework for when JSON storage is the right choice.
      </p>

      <StatGrid stats={[
        { value: '9.7x', label: 'PostgreSQL JSONB is 9.7x faster than the json type for reads due to binary storage', color: 'blue' },
        { value: '2015', label: 'PostgreSQL 9.4 introduced JSONB — the binary, indexable JSON column type', color: 'violet' },
        { value: 'GIN',  label: 'Generalized Inverted Index on JSONB — enables fast queries on any nested key', color: 'green' },
        { value: '40%',  label: 'of new PostgreSQL tables in 2026 include at least one JSONB column, per community surveys', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Definition: What Is JSON Storage in a Database?" />

      <QuickFact color="blue" label="JSON columns = semi-structured data inside a structured database — best of both worlds">
        JSON storage in a database means persisting a JSON document as a column value alongside regular
        typed columns. The database understands the JSON structure &mdash; it can index nested keys,
        filter on deeply-nested values, and aggregate across JSON fields &mdash; without requiring you
        to define every attribute as a separate column in advance. This bridges the gap between rigid
        relational schemas and fully schema-less document stores.
      </QuickFact>

      <p>
        There are two fundamentally different JSON types in PostgreSQL: <code>json</code> and <code>jsonb</code>.
        The <code>json</code> type stores the raw JSON text verbatim (preserving whitespace, key order,
        and duplicate keys). The <code>jsonb</code> type parses JSON on write and stores it in an
        efficient binary format. JSONB supports indexing, faster reads, key deduplication, and all
        modern operators. <strong>Always use JSONB &mdash; never use the plain json type.</strong>
      </p>

      <SectionHeader number={2} title="When to Use JSON Columns vs Normalized Tables" />

      <CompareTable
        headers={['Factor', 'JSON Column (JSONB / MongoDB)', 'Normalized Relational Tables']}
        rows={[
          ['Schema flexibility',  'Dynamic — add keys without migration',   'Rigid — each attribute is a column'],
          ['Query performance',   '✅ Fast with GIN index on queried keys', '✅ Fast with B-tree indexes on typed columns'],
          ['Type safety',         '⚠️ Runtime type — no DB-level enforcement', '✅ Column type enforced at write time'],
          ['Joins across JSON',   '❌ Complex — JSON fields are not FK-able', '✅ Native foreign keys and joins'],
          ['Aggregation',         '✅ Possible but more complex SQL',       '✅ Simple GROUP BY, SUM, COUNT'],
          ['Storage size',        'Slightly larger (binary overhead)',      'Smaller for uniform data'],
          ['Schema evolution',    '✅ Add new keys with no migration',      '❌ ALTER TABLE on large tables is painful'],
          ['Best for',            'Product attributes, user prefs, events, configs, metadata', 'Orders, users, transactions, relationships'],
        ]}
      />

      <AlertBox type="tip" title="The hybrid pattern — use both in the same table">
        The most powerful pattern is not &ldquo;JSON or SQL&rdquo; — it is both. Store the stable, queryable,
        relational fields as typed columns (<code>id, user_id, created_at, status</code>). Store the
        variable, flexible, semi-structured data in one JSONB column (<code>metadata, attributes,
        preferences</code>). Index the JSONB fields you filter on. This gives you full relational
        power where you need it and full JSON flexibility where data varies.
      </AlertBox>

      <SectionHeader number={3} title="How — PostgreSQL JSONB: The Gold Standard" />

      <p>
        PostgreSQL JSONB is the most capable JSON implementation in any relational database. It supports
        GIN indexes that make arbitrary JSON queries fast, a rich operator set, and full integration with
        SQL aggregation, transactions, and foreign keys.
      </p>

      <CodeBlock language="sql" filename="PostgreSQL JSONB — table creation, insert, and basic operators">
{`-- Create a table with typed columns + one JSONB column
CREATE TABLE products (
  id          BIGSERIAL    PRIMARY KEY,
  name        TEXT         NOT NULL,
  price_cents INTEGER      NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  metadata    JSONB        NOT NULL DEFAULT '{}'
);

-- Insert with nested JSONB document
INSERT INTO products (name, price_cents, metadata) VALUES
  ('MacBook Pro 14"', 199900, '{
    "brand": "Apple",
    "specs": { "ram_gb": 18, "storage_gb": 512, "chip": "M3 Pro" },
    "tags":  ["laptop", "pro", "m3"],
    "colors": ["silver", "space-black"]
  }'),
  ('Sony WH-1000XM5', 27999, '{
    "brand": "Sony",
    "specs": { "battery_hours": 30, "noise_cancellation": true },
    "tags":  ["headphones", "wireless"],
    "colors": ["black", "silver"]
  }');

-- ── Operators ──────────────────────────────────────────────────────────────
-- -> returns JSONB value by key (preserves type)
SELECT metadata -> 'brand'                    FROM products;  -- "Apple"

-- ->> returns text value by key
SELECT metadata ->> 'brand'                   FROM products;  -- Apple

-- -> then ->> for nested access
SELECT metadata -> 'specs' ->> 'chip'         FROM products;  -- M3 Pro

-- #>> path operator for deeply nested access
SELECT metadata #>> '{specs, ram_gb}'         FROM products;  -- 18

-- @> contains operator (uses GIN index — very fast)
SELECT * FROM products WHERE metadata @> '{"brand": "Apple"}';

-- ? key exists operator
SELECT * FROM products WHERE metadata ? 'colors';

-- Array element contains
SELECT * FROM products WHERE metadata -> 'tags' ? 'laptop';`}
      </CodeBlock>

      <CodeBlock language="sql" filename="PostgreSQL JSONB — GIN indexing and filtering">
{`-- ── GIN index — enables fast @>, ?, ?|, ?& operators ─────────────────────
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- After GIN index: @> queries run in microseconds, not full table scans
SELECT * FROM products WHERE metadata @> '{"specs": {"noise_cancellation": true}}';

-- ── Functional index — for a specific frequently-queried field ─────────────
-- More selective than full GIN — useful when you always filter on one key
CREATE INDEX idx_products_brand
  ON products ((metadata ->> 'brand'));

SELECT * FROM products WHERE metadata ->> 'brand' = 'Apple';

-- ── Update a nested JSON key with jsonb_set ────────────────────────────────
-- jsonb_set(target, path, new_value, create_missing)
UPDATE products
  SET metadata = jsonb_set(metadata, '{specs, ram_gb}', '32')
  WHERE id = 1;

-- ── Append to a JSON array ─────────────────────────────────────────────────
UPDATE products
  SET metadata = jsonb_set(
    metadata,
    '{tags}',
    (metadata -> 'tags') || '["refurbished"]'::jsonb
  )
  WHERE id = 1;

-- ── Remove a key ──────────────────────────────────────────────────────────
UPDATE products
  SET metadata = metadata - 'colors'   -- remove top-level key
  WHERE id = 1;

-- ── Aggregate and expand JSON ──────────────────────────────────────────────
-- jsonb_each_text expands JSONB object into rows
SELECT key, value FROM products, jsonb_each_text(metadata -> 'specs') WHERE id = 1;

-- jsonb_array_elements expands JSON arrays into rows
SELECT tag FROM products, jsonb_array_elements_text(metadata -> 'tags') AS tag
WHERE metadata -> 'tags' ? 'laptop';`}
      </CodeBlock>

      <SectionHeader number={4} title="How — MySQL JSON Column" />

      <p>
        MySQL added native JSON support in version 5.7.8. MySQL JSON is stored as a binary format
        similar to JSONB. It supports path expressions with the <code>-&gt;</code> and <code>-&gt;&gt;</code>
        operators and the <code>JSON_*</code> function family.
      </p>

      <CodeBlock language="sql" filename="MySQL JSON — column creation, operators, and generated columns">
{`-- MySQL JSON column
CREATE TABLE products (
  id       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(255)   NOT NULL,
  price    DECIMAL(10,2)  NOT NULL,
  metadata JSON           NOT NULL DEFAULT (JSON_OBJECT())
);

-- Insert
INSERT INTO products (name, price, metadata) VALUES
  ('MacBook Pro 14"', 1999.00, '{"brand":"Apple","specs":{"ram":18}}');

-- ── Operators ──────────────────────────────────────────────────────────────
-- -> returns JSON value (keeps type, returns JSON)
SELECT metadata -> '$.brand'                FROM products;   -- "Apple"

-- ->> returns unquoted string value
SELECT metadata ->> '$.brand'               FROM products;   -- Apple

-- Nested access with path expressions
SELECT metadata ->> '$.specs.ram'           FROM products;   -- 18

-- ── JSON functions ─────────────────────────────────────────────────────────
SELECT JSON_EXTRACT(metadata, '$.brand')    FROM products;   -- "Apple"
SELECT JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.brand')) FROM products;  -- Apple

-- JSON_CONTAINS
SELECT * FROM products WHERE JSON_CONTAINS(metadata, '"Apple"', '$.brand');

-- JSON_SET — update a field
UPDATE products SET metadata = JSON_SET(metadata, '$.specs.ram', 32) WHERE id = 1;

-- ── Generated column + index (MySQL's way to index JSON fields) ────────────
-- MySQL does not support GIN — index via a generated (virtual) column instead
ALTER TABLE products
  ADD COLUMN brand VARCHAR(100)
    GENERATED ALWAYS AS (metadata ->> '$.brand') VIRTUAL;

CREATE INDEX idx_products_brand ON products (brand);

-- Now WHERE brand = 'Apple' uses the index efficiently
SELECT * FROM products WHERE brand = 'Apple';`}
      </CodeBlock>

      <SectionHeader number={5} title="How — MongoDB: Document-Native JSON Storage" />

      <p>
        MongoDB stores documents natively as BSON (Binary JSON &mdash; a superset of JSON with additional
        types like Date, ObjectId, and Binary). Every MongoDB collection is a set of JSON documents.
        There is no fixed schema per collection &mdash; each document can have different fields.
      </p>

      <CodeBlock language="javascript" filename="MongoDB — insert, query, update, and aggregation pipeline">
{`import { MongoClient } from 'mongodb';

const client = await MongoClient.connect(process.env.MONGO_URI);
const db     = client.db('shop');
const col    = db.collection('products');

// ── Insert a document ──────────────────────────────────────────────────────
await col.insertOne({
  name:  'MacBook Pro 14"',
  price: 1999.00,
  specs: { ram: 18, storage: 512, chip: 'M3 Pro' },
  tags:  ['laptop', 'pro', 'm3'],
});

// ── Query with dot notation for nested fields ──────────────────────────────
const appleProducts = await col.find({ brand: 'Apple' }).toArray();
const highRam       = await col.find({ 'specs.ram': { $gte: 16 } }).toArray();
const hasTag        = await col.find({ tags: 'pro' }).toArray(); // array contains

// ── Projection — return only specific fields ───────────────────────────────
const names = await col
  .find({ 'specs.ram': { $gte: 16 } })
  .project({ name: 1, price: 1, _id: 0 })
  .toArray();

// ── Update — $set modifies specific fields ─────────────────────────────────
await col.updateOne(
  { name: 'MacBook Pro 14"' },
  { $set: { 'specs.ram': 32, updatedAt: new Date() } }
);

// ── Push to an array field ─────────────────────────────────────────────────
await col.updateOne(
  { name: 'MacBook Pro 14"' },
  { $push: { tags: 'refurbished' } }
);

// ── Index on nested field ──────────────────────────────────────────────────
await col.createIndex({ 'specs.ram': 1 });          // single field
await col.createIndex({ brand: 1, price: -1 });     // compound
await col.createIndex({ tags: 1 });                  // multikey (array field)

// ── Aggregation pipeline ───────────────────────────────────────────────────
const summary = await col.aggregate([
  { $match:  { 'specs.ram': { $gte: 16 } } },
  { $group:  { _id: '$brand', avgPrice: { $avg: '$price' }, count: { $sum: 1 } } },
  { $sort:   { avgPrice: -1 } },
  { $limit:  10 },
]).toArray();`}
      </CodeBlock>

      <SectionHeader number={6} title="Full Comparison — PostgreSQL JSONB vs MySQL JSON vs MongoDB" />

      <CompareTable
        headers={['Feature', 'PostgreSQL JSONB', 'MySQL JSON', 'MongoDB']}
        rows={[
          ['Storage format',     'Binary (JSONB) — efficient read',     'Binary — efficient read',           'BSON — superset of JSON'],
          ['JSON indexing',      'GIN index — any key, very powerful',  'Generated columns — one key at a time', 'Native compound & multikey indexes'],
          ['Nested queries',     '✅ #>> path, @> contains, jsonb_*',   '✅ JSON_EXTRACT, JSON_CONTAINS',     '✅ Dot notation, $match, $elemMatch'],
          ['Joins with JSON',    '✅ Full SQL joins with JSON columns',  '✅ Full SQL joins with JSON columns', '⚠️ $lookup (expensive cross-collection)'],
          ['Transactions',       '✅ ACID transactions across tables',   '✅ ACID transactions (InnoDB)',       '✅ Multi-document ACID since 4.0'],
          ['Schema validation',  '⚠️ Via CHECK constraints',            '⚠️ Via CHECK constraints',           '✅ Native $jsonSchema validation'],
          ['Aggregation',        '✅ Full SQL + window functions',       '✅ Full SQL',                        '✅ Aggregation pipeline (very powerful)'],
          ['Full-text in JSON',  '✅ via tsvector + GIN',               '⚠️ Limited',                        '✅ Built-in text search'],
          ['Best use case',      'Hybrid: relational + flexible JSON',  'Existing MySQL with JSON needs',     'Document-first: content, events, catalogs'],
          ['2026 verdict',       'Best for most teams — great balance', 'Acceptable for MySQL-only shops',   'Best when documents ARE your data model'],
        ]}
      />

      <SectionHeader number={7} title="Why — Decision Framework for JSON Database Choice" />

      <VerticalSteps steps={[
        {
          title: 'Do you already use PostgreSQL? → Add a JSONB column, do not migrate',
          desc: 'JSONB inside PostgreSQL is the highest-value choice for most teams. You get full JSON flexibility alongside ACID transactions, foreign keys, complex SQL joins, and GIN-indexed JSON queries. No separate database to operate, monitor, or synchronize.',
        },
        {
          title: 'Is your data almost entirely documents with no relational joins? → MongoDB',
          desc: 'If your primary data model is documents — blog posts, product catalogs, user activity events, IoT readings — and you rarely need to join across collections, MongoDB\'s document-native model is a natural fit. The aggregation pipeline is extremely powerful for document-centric analytics.',
        },
        {
          title: 'Are you on MySQL and need JSON? → Generated columns for indexing',
          desc: 'MySQL JSON columns work well for storing flexible metadata. Index individual JSON fields via generated virtual columns — this is MySQL\'s answer to PostgreSQL\'s GIN index. Avoid using MySQL JSON for fields you query frequently without an index; full JSON scans are expensive.',
        },
        {
          title: 'Do you need to query JSON fields heavily? → Index before querying',
          desc: 'A full table scan of a JSONB column with 10 million rows takes seconds. A GIN index on the same column makes @> queries return in milliseconds. Always add GIN (PostgreSQL) or multikey indexes (MongoDB) on JSON fields you filter on. Never leave heavily-queried JSON fields unindexed.',
        },
        {
          title: 'Is the JSON schema completely dynamic and unknown? → Reconsider JSON entirely',
          desc: 'If you cannot define even a rough shape for the JSON — if any arbitrary key/value could appear — consider whether a key-value store (Redis) or a search engine (Elasticsearch, OpenSearch) is more appropriate. JSON columns in relational databases work best when the data has a semi-consistent structure, even if not every document has every field.',
        },
      ]} />

      <ToolCTA
        href="/json-error-explainer"
        title="Getting JSON Errors From Your Database Driver?"
        description="pg.query returns malformed JSON, mongoose throws a parse error, MySQL JSON column gives unexpected output — paste any broken JSON into our AI Error Explainer for instant syntax diagnosis."
        buttonText="Debug Database JSON →"
        color="emerald"
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between PostgreSQL json and jsonb types?',
          answer: 'The json type stores the exact raw JSON text — it preserves whitespace, key ordering, and even duplicate keys (the last value wins on read). The jsonb type parses the JSON on write and stores it in a decomposed binary format. JSONB is faster to read (no re-parsing), supports GIN indexes, removes duplicate keys, and normalizes key order. The only reason to use json over jsonb is if you need to preserve the exact input text verbatim — which almost no application actually needs. Always use jsonb.',
        },
        {
          question: 'How do I query a JSONB array to find rows where an array contains a value?',
          answer: 'Use the ? operator for checking if a key exists in a JSON object, or for checking if an array contains a string: WHERE metadata -> \'tags\' ? \'laptop\'. For checking if a JSONB array contains a JSON value: WHERE metadata @> \'{"tags": ["laptop"]}\'. The @> operator uses the GIN index, so it is fast. For numeric values in arrays: WHERE metadata -> \'scores\' @> \'[95]\'. You can also use jsonb_array_elements() to expand the array into rows and filter from there.',
        },
        {
          question: 'Should I use MongoDB or PostgreSQL with JSONB?',
          answer: 'For most applications: PostgreSQL with JSONB. If your application has any relational data (users, orders, products with relationships), PostgreSQL gives you ACID transactions across both structured and JSON data, foreign key integrity, and complex SQL joins — none of which MongoDB handles as naturally. MongoDB excels when your primary data model is genuinely document-centric (think: a CMS, a product catalog, user event streams) and you rarely need to join across different entity types. The hybrid (PostgreSQL + JSONB columns) covers 80% of use cases elegantly.',
        },
        {
          question: 'How do I update a specific key deep inside a JSONB document without overwriting the whole document?',
          answer: 'Use jsonb_set(): UPDATE table SET data = jsonb_set(data, \'{level1, level2, key}\', \'new_value\') WHERE id = 1. The path is an array of text keys. To delete a key: data = data - \'key\' (top-level) or data #- \'{level1, key}\' (nested). To merge/extend at top level: data = data || \'{"newkey": "value"}\'. For array operations: use jsonb_set with (data -> \'array\') || \'["new_item"]\' to append. Never read-modify-write from application code if you can do it in SQL — you avoid race conditions.',
        },
        {
          question: 'Can I enforce a schema on a JSONB column in PostgreSQL?',
          answer: 'Yes, via CHECK constraints. You can validate that required keys exist: CHECK (metadata ? \'brand\' AND metadata ? \'price\'). You can validate types: CHECK (jsonb_typeof(metadata -> \'price\') = \'number\'). You can use pg_jsonschema (an extension) for full JSON Schema validation inside PostgreSQL. MongoDB provides native $jsonSchema validation in collection options. For most teams, validating JSON shape in the application layer (with Zod in Node.js or Pydantic in Python) before writing to the database is simpler and more flexible.',
        },
        {
          question: 'How do I index a JSONB field for range queries (greater than, less than)?',
          answer: 'GIN indexes excel at containment (@>) and existence (?) queries, but they do not help with range queries like WHERE (metadata ->> \'price\')::numeric > 100. For range queries, use a functional B-tree index: CREATE INDEX idx_price ON products ((( metadata ->> \'price\')::numeric)). The double cast extracts the text value and converts it to a numeric for the index. Now range queries, ORDER BY, and BETWEEN all use this index efficiently. Use GIN for "find documents containing this key/value" and functional indexes for "find documents where this numeric field is in a range."',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
