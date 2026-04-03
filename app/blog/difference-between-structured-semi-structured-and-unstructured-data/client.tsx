'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function DifferenceBetweenStructuredSemiStructuredUnstructuredDataClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Structured vs Semi-Structured vs Unstructured Data — Differences Explained Simply</h1>
      <p className="lead">
        Data comes in three fundamental forms — structured tables, semi-structured formats like JSON,
        and unstructured content like text and images. Understanding these differences determines how
        you store, process, and query your data. This guide explains all three with clear examples,
        the right database for each type, and how to choose between them for your use case.
      </p>

      <StatGrid stats={[
        { value: '20%', label: 'of enterprise data is structured (rows and columns)', color: 'blue' },
        { value: '80%', label: 'of enterprise data is unstructured or semi-structured', color: 'amber' },
        { value: 'SQL', label: 'for structured; NoSQL for semi-structured', color: 'green' },
        { value: 'AI/ML', label: 'required to extract insights from unstructured data', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Three Types Compared" />
      <CompareTable
        leftLabel="Type"
        rightLabel="Examples + Storage"
        rows={[
          { label: 'Structured', left: 'Rigid schema — rows and columns, enforced types', right: 'SQL databases: PostgreSQL, MySQL, SQLite, SQL Server' },
          { label: 'Semi-Structured', left: 'Self-describing, flexible schema — nested data', right: 'JSON, XML, YAML, Parquet — MongoDB, DynamoDB, Elasticsearch' },
          { label: 'Unstructured', left: 'No predefined schema — human-generated content', right: 'Text, images, video, audio — S3, GCS, vector databases' },
        ]}
      />

      <SectionHeader number={2} title="Structured Data" />
      <QuickFact color="blue" label="The spreadsheet model">
        Structured data fits neatly into tables with defined columns, types, and relationships.
        Every row has the same fields. SQL is perfect for querying it. Think: bank transactions,
        user accounts, inventory records — any data with a known, consistent shape.
      </QuickFact>

      <CodeBlock language="sql" filename="Structured Data — SQL Table">
{`-- Structured: every row has exactly these columns, these types
CREATE TABLE orders (
    order_id    INT            NOT NULL PRIMARY KEY,
    customer_id INT            NOT NULL REFERENCES customers(id),
    amount      DECIMAL(10,2)  NOT NULL CHECK (amount > 0),
    status      VARCHAR(20)    NOT NULL CHECK (status IN ('pending','shipped','delivered','cancelled')),
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW(),
    shipped_at  TIMESTAMP      NULL  -- nullable: only set when shipped
);

-- Rigid schema enables fast, indexed queries:
SELECT
    c.name,
    COUNT(o.order_id) AS order_count,
    SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.created_at >= '2026-01-01'
  AND o.status = 'delivered'
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 10;

-- Adding a field requires a migration:
ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(20);
-- Every row now has this column (NULL for old rows)`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        { title: 'Advantages of Structured Data', description: 'Fast SQL queries with indexing, complex joins across tables, ACID transactions (guarantees consistency), mature tooling with decades of optimization, easy aggregation (SUM, COUNT, AVG, GROUP BY).' },
        { title: 'Disadvantages of Structured Data', description: 'Schema changes require migrations (ALTER TABLE on 100M rows can lock for hours). Can\'t accommodate fields that vary per row without NULL-heavy or EAV anti-patterns. Schema must be designed upfront.' },
        { title: 'Best for Structured Data', description: 'Financial records, user accounts, order management, inventory, payroll, CRM data — anything with consistent, predictable structure and strong consistency requirements.' },
        { title: 'Structured Data Tools', description: 'PostgreSQL (most advanced open-source), MySQL/MariaDB (web apps), SQLite (embedded, local), SQL Server (enterprise Windows), Oracle (large enterprise), BigQuery (analytical warehouse).' },
      ]} />

      <SectionHeader number={3} title="Semi-Structured Data" />
      <CodeBlock language="json" filename="Semi-Structured Data — JSON with varying shapes">
{`// Semi-structured: self-describing, but flexible
// Different products can have completely different field sets:
{
  "product_id": "prod-001",
  "type": "laptop",
  "name": "MacBook Pro 16",
  "specs": {
    "cpu": "Apple M3 Pro",
    "ram_gb": 18,
    "storage_tb": 0.5,
    "display": "16.2-inch Liquid Retina XDR"
  },
  "tags": ["electronics", "apple", "portable"],
  "variants": null
}

// vs a different product type with completely different fields:
{
  "product_id": "prod-002",
  "type": "clothing",
  "name": "Running Shoes",
  "specs": {
    "size_us": "10",
    "color": "Black/White",
    "material": "Mesh upper, rubber sole",
    "weight_oz": 9.1
  },
  "variants": [
    {"size_us": "9", "in_stock": true},
    {"size_us": "10", "in_stock": false},
    {"size_us": "11", "in_stock": true}
  ]
}

// MongoDB stores both in the same "products" collection —
// no schema migration needed when product types change`}
      </CodeBlock>

      <AlertBox type="tip" title="When to use NoSQL vs SQL for semi-structured data">
        Use MongoDB/DynamoDB when: documents vary significantly in structure, you need to store nested
        arrays/objects naturally, or you're building for rapid schema evolution. Use PostgreSQL with
        JSONB columns when: you need SQL joins alongside flexible data — best of both worlds.
        PostgreSQL JSONB with GIN indexes supports fast JSON field queries with full SQL power.
      </AlertBox>

      <CodeBlock language="sql" filename="PostgreSQL JSONB — Best of Both Worlds">
{`-- PostgreSQL JSONB: structured table columns + flexible JSON column
CREATE TABLE events (
    id         BIGSERIAL    PRIMARY KEY,
    event_type VARCHAR(50)  NOT NULL,
    user_id    INT          NOT NULL REFERENCES users(id),
    created_at TIMESTAMP    DEFAULT NOW(),
    metadata   JSONB        -- flexible semi-structured data, indexed
);

-- GIN index for fast JSON field queries:
CREATE INDEX idx_events_metadata ON events USING GIN (metadata);

-- Insert structured + semi-structured data
INSERT INTO events (event_type, user_id, metadata) VALUES
('purchase', 1, '{"product_id": "prod-001", "amount": 999, "coupon": "SAVE10", "currency": "USD"}'),
('login',    1, '{"ip": "192.168.1.1", "device": "iPhone 15", "country": "US", "2fa": true}'),
('search',   2, '{"query": "laptop", "results_count": 42, "filters": {"price_max": 2000}}');

-- Query JSON fields with full SQL power:
SELECT user_id,
       metadata->>'product_id'       AS product,
       (metadata->>'amount')::numeric AS amount
FROM events
WHERE event_type = 'purchase'
  AND (metadata->>'amount')::numeric > 500
  AND metadata->>'currency' = 'USD'
ORDER BY amount DESC;

-- Query nested JSON (->  returns JSON, ->> returns text):
SELECT * FROM events
WHERE metadata->'filters'->>'price_max' IS NOT NULL;  -- has a price filter

-- Aggregate on JSON field:
SELECT metadata->>'country' AS country, COUNT(*) AS logins
FROM events
WHERE event_type = 'login'
GROUP BY metadata->>'country'
ORDER BY logins DESC;`}
      </CodeBlock>

      <SectionHeader number={4} title="Unstructured Data" />
      <KeyPointsGrid columns={2} items={[
        { title: 'What Unstructured Data Is', description: 'Text documents, emails, PDFs, images, videos, audio files, social media posts, customer reviews, contracts, medical records, surveillance footage. No predefined schema — can\'t store in rows and columns.' },
        { title: 'How Much Exists', description: '80-90% of enterprise data is unstructured. Every customer email, support ticket, product review, contract, medical image, and Slack message is unstructured. It\'s the fastest-growing data type.' },
        { title: 'How to Process It', description: 'NLP for text (sentiment analysis, classification, named entity recognition). Computer vision for images/video (object detection, classification). Speech-to-text for audio. Embeddings convert content to vectors for semantic search.' },
        { title: 'Storage and Retrieval', description: 'Object stores (S3, GCS, Azure Blob) for raw files. Vector databases (Pinecone, Weaviate, pgvector) for embedding-based semantic search. Elasticsearch for full-text keyword search with ranking.' },
      ]} />

      <CodeBlock language="python" filename="Extracting Value from Unstructured Text with NLP">
{`# Customer review — pure unstructured text
review = """
The laptop is incredibly fast and the battery life is amazing.
However, the keyboard feels a bit mushy and the price is too high for what you get.
Would still recommend it for developers who need the performance.
"""

# 1. Sentiment analysis — extract structured signal from unstructured text
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis",
                               model="distilbert-base-uncased-finetuned-sst-2-english")
result = sentiment_analyzer(review)
# → [{'label': 'POSITIVE', 'score': 0.76}]  (mixed review, but leans positive)

# 2. Named entity recognition — extract product names, features, etc.
ner = pipeline("ner", grouped_entities=True)
entities = ner(review)
# → [{'entity_group': 'PRODUCT', 'word': 'laptop', ...},
#    {'entity_group': 'FEATURE', 'word': 'keyboard', ...}]

# 3. Embeddings — convert text to vector for semantic search
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
embedding = model.encode(review)
# → numpy array of 384 floats — the semantic "fingerprint"

# Store in vector database for semantic search:
# "find reviews mentioning keyboard issues" → similarity search
# Returns this review even if query words don't exactly match

# 4. LLM extraction — structured data from unstructured text
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=500,
    messages=[{
        "role": "user",
        "content": f"""Extract from this review as JSON:
- overall_sentiment: positive/negative/mixed
- pros: list of mentioned positives
- cons: list of mentioned negatives
- would_recommend: true/false
- product_category: laptop/phone/etc

Review: {review}"""
    }]
)
# Returns structured JSON extracted from unstructured text`}
      </CodeBlock>

      <SectionHeader number={5} title="Choosing the Right Storage for Each Type" />
      <VerticalSteps steps={[
        { title: 'Identify your data shape', desc: 'Ask: does every record have the same fields? If yes → structured (SQL). Does it have nested objects or vary by record type? → semi-structured (NoSQL/JSONB). Is it free-form text, files, or binary content? → unstructured (object store + vector DB).' },
        { title: 'Consider query patterns', desc: 'Need SQL JOINs, GROUP BY, complex aggregations? → Relational database. Need document retrieval by ID or simple field filters? → MongoDB or DynamoDB. Need full-text search or "find similar content"? → Elasticsearch or vector database (pgvector, Pinecone).' },
        { title: 'Plan for schema evolution', desc: 'Will the schema change frequently? Semi-structured (MongoDB, JSONB) handles evolution without migrations. Structured SQL requires ALTER TABLE for every field addition — plan carefully upfront or use JSONB columns for flexible attributes alongside fixed core columns.' },
        { title: 'Choose your consistency model', desc: 'Financial data: ACID transactions → SQL. User events, analytics: eventual consistency acceptable → NoSQL. Media files: no consistency model needed → object store. Mixed: PostgreSQL with JSONB gives you ACID + flexibility in one system.' },
        { title: 'Consider the data lake pattern', desc: 'Modern architectures store all types together: raw files in S3/GCS (data lake), structured summaries in a data warehouse (BigQuery, Snowflake), with query engines (Athena, Databricks) bridging all three. Process unstructured data with ML pipelines to extract structured features for the warehouse.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Which type of data should I use a NoSQL database for?',
          answer: 'Use NoSQL for semi-structured data that varies per document (product catalogs with different attributes per category, user profiles with flexible fields, event logs with varying metadata) or when you need horizontal sharding for massive scale. Use SQL for relational structured data with complex JOIN requirements. MongoDB is the leading choice for document-style semi-structured data; Elasticsearch for full-text unstructured text search.',
        },
        {
          question: 'What is the difference between semi-structured and schemaless?',
          answer: 'Semi-structured data has implicit structure (JSON has keys and values, XML has tags and attributes) even without a rigid schema enforced by the database. "Schemaless" describes databases like MongoDB that don\'t enforce a schema on ingestion — you can insert any document shape. In practice, semi-structured data usually has a de facto application-level schema: you still expect certain fields to exist. "Schemaless" means the database won\'t reject documents missing those fields.',
        },
        {
          question: 'How do data lakes handle all three data types?',
          answer: 'Data lakes (S3, ADLS, GCS) store all three types: structured tables as Parquet files (columnar, compressed), semi-structured as JSON/Avro/ORC, and unstructured as raw files (images, PDFs, audio). A query engine layer (Athena, BigQuery, Databricks, Spark) provides SQL access to the structured/semi-structured formats. Unstructured data requires ML preprocessing pipelines that extract structured features (embeddings, classifications, entities) before the extracted data can be analyzed.',
        },
        {
          question: 'When does JSON become too complex for a relational database?',
          answer: 'PostgreSQL JSONB handles semi-structured data well up to 3-4 levels of nesting and documents up to a few MB. Beyond that, querying becomes complex (deeply chained -> operators), GIN indexes become large, and performance can degrade. When your JSON documents are deeply nested, exceed 1MB regularly, vary radically in structure, or you need document-level atomic updates on nested arrays (the $push/$pull operations in MongoDB), a dedicated document database becomes a better fit.',
        },
        {
          question: 'What is a vector database and when do I need one?',
          answer: 'A vector database stores high-dimensional float vectors (embeddings) and enables similarity search: "find the 10 most semantically similar documents to this query." You need one when working with unstructured data and AI: semantic search ("find emails about billing issues" even if words don\'t match), RAG (retrieval-augmented generation for LLMs), image similarity, recommendation systems. Options: Pinecone (managed SaaS), Weaviate (open-source), pgvector (PostgreSQL extension — no separate service needed).',
        },
        {
          question: 'Can I store all three data types in one database?',
          answer: 'PostgreSQL can handle all three: structured data in typed columns, semi-structured data in JSONB columns (with GIN indexes), and unstructured data via pgvector for embeddings (semantic search) combined with S3/GCS for the actual files (store URLs in PostgreSQL). This "single database" approach works well for small-to-medium scale, simplifies operations, and avoids managing multiple systems. At larger scale, specialized systems (Elasticsearch, dedicated vector databases, columnar warehouses) outperform PostgreSQL for specific workloads.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
