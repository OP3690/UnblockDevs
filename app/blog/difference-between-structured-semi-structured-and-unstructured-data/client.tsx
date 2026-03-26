'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function DifferenceBetweenStructuredSemiStructuredUnstructuredDataClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Structured vs Semi-Structured vs Unstructured Data — Differences Explained Simply</h1>
      <p className="lead">
        Data comes in three fundamental forms — structured tables, semi-structured formats like JSON,
        and unstructured content like text and images. Understanding these differences determines how
        you store, process, and query your data. This guide explains all three with clear examples.
      </p>

      <StatGrid stats={[
        { value: '20%', label: 'of enterprise data is structured', color: 'blue' },
        { value: '80%', label: 'of enterprise data is unstructured or semi-structured', color: 'amber' },
        { value: 'SQL', label: 'for structured; NoSQL for semi-structured', color: 'green' },
        { value: 'AI/ML', label: 'required to extract value from unstructured data', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Three Types Compared" />
      <CompareTable
        leftLabel="Type"
        rightLabel="Examples + Storage"
        rows={[
          { label: 'Structured', left: 'Rigid schema, rows and columns', right: 'SQL databases (PostgreSQL, MySQL, SQLite)' },
          { label: 'Semi-Structured', left: 'Self-describing, flexible schema', right: 'JSON, XML, YAML, Parquet — NoSQL (MongoDB, DynamoDB)' },
          { label: 'Unstructured', left: 'No predefined schema', right: 'Text, images, video, audio — Object stores (S3, GCS)' },
        ]}
      />

      <SectionHeader number={2} title="Structured Data" />
      <QuickFact>
        Structured data fits neatly into tables with defined columns, types, and relationships.
        Every row has the same fields. SQL is perfect for querying it. Think: bank transactions,
        user accounts, order records.
      </QuickFact>

      <CodeBlock language="sql" filename="Structured Data — SQL Table">
{`-- Structured: every row has exactly these columns, these types
CREATE TABLE orders (
    order_id   INT          NOT NULL PRIMARY KEY,
    customer_id INT         NOT NULL,
    amount      DECIMAL(10,2) NOT NULL,
    status      VARCHAR(20)  NOT NULL CHECK (status IN ('pending','shipped','delivered')),
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Rigid schema enables fast, indexed queries:
SELECT customer_id, SUM(amount)
FROM orders
WHERE created_at >= '2026-01-01'
  AND status = 'delivered'
GROUP BY customer_id
ORDER BY SUM(amount) DESC;`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        { title: 'Advantages', description: 'Fast SQL queries, indexing, joins, ACID transactions. Well-understood tools and decades of optimization.' },
        { title: 'Disadvantages', description: 'Schema changes are expensive. Can\'t accommodate fields that vary per row without NULL-heavy tables.' },
        { title: 'Best for', description: 'Financial records, user accounts, inventory, order management — any data with consistent, known structure.' },
        { title: 'Tools', description: 'PostgreSQL, MySQL, SQLite, Oracle, SQL Server. Queried with SQL.' },
      ]} />

      <SectionHeader number={3} title="Semi-Structured Data" />
      <CodeBlock language="json" filename="Semi-Structured Data — JSON">
{`// Semi-structured: self-describing, but flexible
// Different products can have different fields:
{
  "product_id": "prod-001",
  "name": "Laptop",
  "specs": {
    "cpu": "Apple M3 Pro",
    "ram_gb": 18,
    "storage_tb": 0.5
  },
  "tags": ["electronics", "apple", "portable"]
}

// vs a different product type with different fields:
{
  "product_id": "prod-002",
  "name": "Running Shoes",
  "specs": {
    "size": "US 10",
    "color": "Black/White",
    "material": "Mesh"
  },
  "variants": [{"size": "US 9"}, {"size": "US 11"}]
}`}
      </CodeBlock>

      <AlertBox type="tip" filename="When to use NoSQL vs SQL for semi-structured data">
        Use MongoDB/DynamoDB when: documents vary significantly in structure, you need to store nested
        arrays/objects naturally, or you're building for rapid schema evolution. Use PostgreSQL with
        JSONB columns when: you need SQL joins alongside flexible data — best of both worlds.
      </AlertBox>

      <CodeBlock language="sql" filename="PostgreSQL JSONB — Best of Both Worlds">
{`-- PostgreSQL JSONB: structured table + flexible JSON column
CREATE TABLE events (
    id         BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    user_id    INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    metadata   JSONB  -- flexible semi-structured data
);

-- Insert structured + semi-structured data
INSERT INTO events (event_type, user_id, metadata) VALUES
('purchase', 1, '{"product_id": "prod-001", "amount": 999, "coupon": "SAVE10"}'),
('login', 1,    '{"ip": "192.168.1.1", "device": "iPhone 15", "country": "US"}');

-- Query JSON fields with full SQL power:
SELECT user_id, metadata->>'product_id' as product
FROM events
WHERE event_type = 'purchase'
  AND (metadata->>'amount')::int > 500;`}
      </CodeBlock>

      <SectionHeader number={4} title="Unstructured Data" />
      <KeyPointsGrid columns={2} items={[
        { title: 'What It Is', description: 'Text documents, images, videos, audio files, social media posts, PDFs, emails. No predefined schema. Cannot be stored in a row-column format.' },
        { title: 'How Much Exists', description: '80-90% of enterprise data is unstructured. Customer emails, support tickets, product reviews, contracts, medical records, surveillance video.' },
        { title: 'How to Process', description: 'NLP for text (sentiment, classification, NER). Computer vision for images/video. Speech-to-text for audio. Embeddings for semantic search.' },
        { title: 'Storage', description: 'Object stores (S3, GCS, Azure Blob). Vector databases for embeddings (Pinecone, Weaviate, pgvector). Elasticsearch for full-text search.' },
      ]} />

      <CodeBlock language="python" filename="Extracting Value from Unstructured Text">
{`from transformers import pipeline

# Customer review — unstructured text
review = """
The laptop is incredibly fast and the battery life is amazing.
However, the keyboard feels a bit mushy and the price is too high.
"""

# Extract structure with NLP:
# 1. Sentiment analysis
sentiment = pipeline("sentiment-analysis")
result = sentiment(review)
print(result)  # [{'label': 'NEGATIVE', 'score': 0.52}] (mixed)

# 2. Named entity recognition
ner = pipeline("ner")
entities = ner(review)
# Extracts: PRODUCT("laptop"), FEATURE("keyboard"), etc.

# 3. Embeddings for semantic search
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
embedding = model.encode(review)
# Now searchable: "find reviews mentioning keyboard issues"`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Which type of data should I use a NoSQL database for?',
          answer: 'Use NoSQL for semi-structured data that varies per document (product catalogs with different attributes per category, user profiles with flexible fields) or unstructured data that needs indexing (Elasticsearch for text search). Use SQL for relational structured data. MongoDB is a common choice for document-style semi-structured data; Elasticsearch for unstructured text search.',
        },
        {
          question: 'What is the difference between semi-structured and schemaless?',
          answer: 'Semi-structured data has implicit structure (JSON has keys and values, XML has tags) even without a rigid schema. "Schemaless" describes databases like MongoDB that don\'t enforce a schema on ingestion. In practice, semi-structured data usually has a de facto schema — you still expect certain fields to exist even if not enforced by the database.',
        },
        {
          question: 'How do data lakes handle all three data types?',
          answer: 'Data lakes (S3, ADLS, GCS) store all three: structured tables as Parquet files, semi-structured as JSON/Avro, and unstructured as raw files. A query layer (Athena, BigQuery, Databricks) provides SQL access to structured/semi-structured data. Unstructured data requires preprocessing (ML pipelines) to extract structured features before analysis.',
        },
        {
          question: 'When does JSON become too complex for a relational database?',
          answer: 'PostgreSQL JSONB handles semi-structured data well up to 3-4 levels of nesting. Beyond that, querying becomes complex and performance degrades. When your JSON documents are deeply nested, vary significantly in structure, or you need document-level transactions and atomic updates on nested arrays, a document database (MongoDB) becomes a better fit.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
