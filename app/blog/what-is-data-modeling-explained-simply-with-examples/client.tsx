'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>What Is Data Modeling? Explained Simply With Examples</h1>
      <p className="lead">
        Data modeling is the process of deciding how to organize and structure data before you build a system.
        A good data model makes queries fast, code simple, and your database easy to understand. A bad one
        creates problems that last years. This guide covers the core concepts with real examples.
      </p>

      <StatGrid stats={[
        { value: '3', label: 'main model types: conceptual, logical, physical', color: 'blue' },
        { value: 'ER', label: 'entity-relationship diagrams', color: 'purple' },
        { value: 'Normal', label: 'forms prevent data redundancy', color: 'green' },
        { value: 'NoSQL', label: 'document vs relational trade-offs', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Data Model?" />
      <p>
        A data model defines <strong>what data exists</strong>, <strong>how it's organized</strong>,
        and <strong>how pieces relate to each other</strong>. Think of it as the blueprint for your database —
        designed before you write a single SQL CREATE TABLE or Mongoose schema.
      </p>

      <QuickFact>
        Bad data models are one of the most expensive technical debts in software. Changing a table structure
        in a production database with millions of rows is painful. Getting it right upfront costs hours;
        fixing it later costs weeks.
      </QuickFact>

      <SectionHeader number={2} title="The Three Levels of Data Models" />
      <KeyPointsGrid columns={3} items={[
        { title: 'Conceptual Model', description: 'High-level: what entities exist and how they relate. Audience: business stakeholders. No technical details. Just boxes and arrows.' },
        { title: 'Logical Model', description: 'More detail: attributes, data types, relationships (1:1, 1:N, N:M). Audience: architects and developers. Still database-agnostic.' },
        { title: 'Physical Model', description: 'Implementation-specific: actual table names, column types, indexes, constraints. Audience: database engineers. Ready to generate DDL.' },
      ]} />

      <SectionHeader number={3} title="Entity-Relationship (ER) Modeling" />
      <p>
        ER modeling is the standard way to design relational databases. You identify entities (things),
        attributes (properties), and relationships (how things connect).
      </p>

      <CodeBlock language="sql" filename="ER Model → SQL Schema Example">
{`-- E-commerce data model

-- Entity: User
CREATE TABLE users (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  email      VARCHAR(255) UNIQUE NOT NULL,
  name       VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Entity: Product
CREATE TABLE products (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  category_id BIGINT REFERENCES categories(id),
  stock       INT NOT NULL DEFAULT 0
);

-- Entity: Order (bridges users and products)
CREATE TABLE orders (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id    BIGINT NOT NULL REFERENCES users(id),
  status     ENUM('pending','paid','shipped','delivered') DEFAULT 'pending',
  total      DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Junction table: Many-to-many (orders ↔ products)
CREATE TABLE order_items (
  order_id   BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  quantity   INT NOT NULL,
  price      DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);`}
      </CodeBlock>

      <SectionHeader number={4} title="Relationships: 1:1, 1:N, M:N" />
      <CompareTable
        leftLabel="Relationship Type"
        rightLabel="Example + Implementation"
        rows={[
          { label: 'One-to-One (1:1)', left: 'User has one Profile', right: 'Foreign key in profile table: profile.user_id UNIQUE' },
          { label: 'One-to-Many (1:N)', left: 'User has many Orders', right: 'Foreign key in child: orders.user_id references users.id' },
          { label: 'Many-to-Many (M:N)', left: 'Orders have many Products, Products in many Orders', right: 'Junction/bridge table: order_items(order_id, product_id)' },
          { label: 'Self-referential', left: 'Category has sub-categories', right: 'categories.parent_id references categories.id (nullable)' },
        ]}
      />

      <SectionHeader number={5} title="Normalization — Eliminating Redundancy" />
      <p>
        Normalization is the process of structuring a relational database to reduce data redundancy
        and improve integrity. The three normal forms you need to know:
      </p>

      <VerticalSteps steps={[
        {
          title: 'First Normal Form (1NF)',
          description: 'Each column contains atomic values (no arrays/lists). Each row is unique.',
          code: '-- Bad: tags = "javascript,react,node"\n-- Good: separate tag_id in a tags table',
        },
        {
          title: 'Second Normal Form (2NF)',
          description: '1NF + every non-key column depends on the ENTIRE primary key (eliminates partial dependencies).',
          code: '-- Bad: order_items has product_name (depends only on product_id, not the full PK)\n-- Good: join products table for name',
        },
        {
          title: 'Third Normal Form (3NF)',
          description: '2NF + no transitive dependencies (non-key columns don\'t depend on other non-key columns).',
          code: '-- Bad: users has city, state, zip (zip → city, zip → state)\n-- Good: separate zip_codes table',
        },
      ]} />

      <AlertBox type="tip" title="Don't over-normalize">
        3NF is the standard target. Over-normalizing (4NF, 5NF) can make queries complex with too many JOINs.
        Sometimes denormalization (storing redundant data) is the right trade-off for read performance.
      </AlertBox>

      <SectionHeader number={6} title="Relational vs Document Data Models" />
      <CompareTable
        leftLabel="Relational (SQL)"
        rightLabel="Document (MongoDB, DynamoDB)"
        rows={[
          { label: 'Data structure', left: 'Tables with fixed schemas', right: 'Flexible JSON documents' },
          { label: 'Relationships', left: 'JOINs between tables', right: 'Embedded or referenced documents' },
          { label: 'Schema changes', left: 'ALTER TABLE (painful at scale)', right: 'No schema enforcement (flexible but risky)' },
          { label: 'Query power', left: 'Complex JOINs, aggregations, analytics', right: 'Simple lookups fast; complex queries harder' },
          { label: 'Best for', left: 'Relational data, transactions, reporting', right: 'Hierarchical data, flexible schemas, high write throughput' },
        ]}
      />

      <SectionHeader number={7} title="Practical: Designing a Blog Data Model" />
      <CodeBlock language="sql" filename="Blog Database Schema">
{`-- Users
CREATE TABLE users (
  id       BIGINT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email    VARCHAR(255) UNIQUE NOT NULL
);

-- Posts
CREATE TABLE posts (
  id           BIGINT PRIMARY KEY,
  author_id    BIGINT REFERENCES users(id),
  title        VARCHAR(500) NOT NULL,
  slug         VARCHAR(500) UNIQUE NOT NULL,
  body         TEXT,
  status       ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Tags (many-to-many with posts)
CREATE TABLE tags (
  id   BIGINT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  BIGINT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Comments (self-referential for replies)
CREATE TABLE comments (
  id        BIGINT PRIMARY KEY,
  post_id   BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  author_id BIGINT REFERENCES users(id),
  parent_id BIGINT REFERENCES comments(id), -- NULL = top-level comment
  body      TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published_at) WHERE status = 'published';
CREATE INDEX idx_comments_post ON comments(post_id);`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Should I model data for reads or writes?',
          answer: 'It depends on your access patterns. Normalized models (3NF) are optimized for writes (minimal redundancy). Denormalized models are optimized for reads (fewer JOINs). For OLTP (transactional apps), normalize. For OLAP (analytics), denormalize into star schemas.',
        },
        {
          question: 'What is a star schema?',
          answer: 'A denormalized pattern for data warehouses: one central fact table (e.g., sales) surrounded by dimension tables (date, product, customer, region). Optimized for analytical queries — fast aggregations without many JOINs.',
        },
        {
          question: 'How do I model hierarchical/tree data in SQL?',
          answer: 'Common patterns: (1) Adjacency list — each row has parent_id. Simple but recursive queries are slow. (2) Nested sets — store left/right boundary numbers. Fast reads, complex writes. (3) Closure table — store all ancestor/descendant pairs. Best for frequent queries. PostgreSQL also has ltree extension.',
        },
        {
          question: 'When should I use a NoSQL database instead of SQL?',
          answer: 'Use NoSQL when: your data is naturally document-shaped (each "row" has very different fields), you need extreme horizontal write scalability, or your schema changes very frequently. Use SQL when: data is relational, you need transactions, you need complex aggregation, or you have reporting requirements.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
