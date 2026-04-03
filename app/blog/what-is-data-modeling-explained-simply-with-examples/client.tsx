'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
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
        { value: 'ER', label: 'entity-relationship diagrams — standard design tool', color: 'purple' },
        { value: '3NF', label: 'third normal form — standard normalization target', color: 'green' },
        { value: 'NoSQL', label: 'document vs relational — different trade-offs', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Data Model?" />
      <QuickFact color="amber" label="Most expensive technical debt">
        Bad data models are one of the most expensive forms of technical debt in software. Changing a
        table structure in a production database with millions of rows is painful — requiring migrations,
        downtime risk, and code changes across the entire application. Getting it right upfront costs
        hours; fixing it later costs weeks.
      </QuickFact>

      <p>
        A data model defines <strong>what data exists</strong>, <strong>how it's organized</strong>,
        and <strong>how pieces relate to each other</strong>. Think of it as the blueprint for your database —
        designed before you write a single SQL CREATE TABLE or Mongoose schema.
      </p>

      <SectionHeader number={2} title="The Three Levels of Data Models" />
      <KeyPointsGrid columns={3} items={[
        { title: 'Conceptual Model', description: 'High-level: what entities exist and how they relate. Audience: business stakeholders. No technical details — just boxes and relationship arrows. Example: "Customers place Orders; Orders contain Products."' },
        { title: 'Logical Model', description: 'More detail: attributes, data types, relationships (1:1, 1:N, N:M). Audience: architects and developers. Still database-agnostic — works for SQL or NoSQL. Example: User has email (string), created_at (datetime), orders (1:N).' },
        { title: 'Physical Model', description: 'Implementation-specific: actual table names, column types, indexes, constraints, partitioning. Audience: database engineers. Ready to generate DDL (CREATE TABLE statements). Example: users table with BIGINT PK, VARCHAR(255) UNIQUE for email, BTREE index on created_at.' },
      ]} />

      <SectionHeader number={3} title="Entity-Relationship (ER) Modeling" />
      <p>
        ER modeling is the standard way to design relational databases. You identify entities (things),
        attributes (properties), and relationships (how things connect). Every ER model maps directly
        to SQL tables.
      </p>

      <CodeBlock language="sql" filename="ER Model → SQL Schema — E-commerce Example">
{`-- Entity: User
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

-- Entity: Order (bridges users and products — 1:N from users, M:N with products)
CREATE TABLE orders (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id    BIGINT NOT NULL REFERENCES users(id),
  status     ENUM('pending','paid','shipped','delivered') DEFAULT 'pending',
  total      DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Junction table: Many-to-many (orders ↔ products)
-- One order has many products; one product appears in many orders
CREATE TABLE order_items (
  order_id   BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  quantity   INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,  -- snapshot price at time of purchase
  PRIMARY KEY (order_id, product_id)
);`}
      </CodeBlock>

      <SectionHeader number={4} title="Relationships: 1:1, 1:N, M:N" />
      <CompareTable
        leftLabel="Relationship Type"
        rightLabel="Example + Implementation"
        rows={[
          { label: 'One-to-One (1:1)', left: 'User has one Profile', right: 'Foreign key in profile table: profile.user_id UNIQUE (unique FK enforces 1:1)' },
          { label: 'One-to-Many (1:N)', left: 'User has many Orders', right: 'Foreign key in child: orders.user_id references users.id (most common relationship)' },
          { label: 'Many-to-Many (M:N)', left: 'Orders contain many Products; Products appear in many Orders', right: 'Junction/bridge table: order_items(order_id, product_id) with composite PK' },
          { label: 'Self-referential', left: 'Category has sub-categories', right: 'categories.parent_id REFERENCES categories.id (nullable for root categories)' },
        ]}
      />

      <SectionHeader number={5} title="Normalization — Eliminating Redundancy" />
      <p>
        Normalization is the process of structuring a relational database to reduce data redundancy
        and improve integrity. The three normal forms every developer needs to know:
      </p>

      <VerticalSteps steps={[
        { title: 'First Normal Form (1NF) — atomic values, unique rows', desc: 'Each column contains atomic (indivisible) values — no arrays or comma-separated lists stored in a single field. Each row must be unique. Bad: tags = "javascript,react,node" in one column. Good: separate tags table with a junction table linking posts to tags.' },
        { title: 'Second Normal Form (2NF) — full functional dependency', desc: '1NF + every non-key column depends on the ENTIRE primary key (eliminates partial dependencies in composite-key tables). Bad: order_items table with product_name column — product_name depends only on product_id, not the full (order_id, product_id) composite key. Good: join the products table to get the name.' },
        { title: 'Third Normal Form (3NF) — no transitive dependencies', desc: '2NF + no non-key column depends on another non-key column (eliminates transitive dependencies). Bad: users table with city, state, zip — zip determines city and state, so city/state transitively depend on zip through zip, not directly on user_id. Good: separate zip_codes table with (zip, city, state). Join when needed.' },
      ]} />

      <AlertBox type="tip" title="Don't over-normalize for read-heavy workloads">
        3NF is the standard target for OLTP systems. Over-normalizing (4NF, 5NF) creates too many
        JOINs and slows down read queries significantly. Sometimes deliberate denormalization —
        storing redundant data for faster reads — is the right trade-off. Analytics (OLAP) systems
        actively denormalize into star schemas to avoid JOINs during aggregation queries.
      </AlertBox>

      <SectionHeader number={6} title="Relational vs Document Data Models" />
      <CompareTable
        leftLabel="Relational (SQL)"
        rightLabel="Document (MongoDB, DynamoDB)"
        rows={[
          { label: 'Data structure', left: 'Tables with fixed schemas — every row has same columns', right: 'Flexible JSON documents — each document can have different fields' },
          { label: 'Relationships', left: 'JOINs between normalized tables', right: 'Embedded sub-documents or referenced IDs' },
          { label: 'Schema changes', left: 'ALTER TABLE — migrations needed, risky at scale', right: 'No schema enforcement — add/remove fields freely (flexible but risky without validation)' },
          { label: 'Query power', left: 'Complex JOINs, aggregations, window functions, analytics', right: 'Simple lookups very fast; multi-collection JOINs much harder' },
          { label: 'Transactions', left: 'ACID transactions across tables — strong consistency', right: 'Single-document atomic; multi-document transactions are slower and limited' },
          { label: 'Best for', left: 'Relational data, financial systems, reporting, analytics', right: 'Hierarchical/nested data, flexible schemas, high write throughput, event logs' },
        ]}
      />

      <SectionHeader number={7} title="Practical: Designing a Blog Data Model" />
      <CodeBlock language="sql" filename="Blog Database Schema — Complete Example">
{`-- Users
CREATE TABLE users (
  id       BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email    VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts
CREATE TABLE posts (
  id           BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id    BIGINT NOT NULL REFERENCES users(id),
  title        VARCHAR(500) NOT NULL,
  slug         VARCHAR(500) UNIQUE NOT NULL,  -- URL-friendly identifier
  body         TEXT,
  status       TEXT CHECK(status IN ('draft','published','archived')) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Tags (many-to-many with posts)
CREATE TABLE tags (
  id   BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  BIGINT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Comments (self-referential for threaded replies)
CREATE TABLE comments (
  id         BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  post_id    BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id  BIGINT REFERENCES users(id),
  parent_id  BIGINT REFERENCES comments(id),  -- NULL = top-level comment
  body       TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Performance indexes for common access patterns
CREATE INDEX idx_posts_author    ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published_at) WHERE status = 'published';
CREATE INDEX idx_posts_slug      ON posts(slug);
CREATE INDEX idx_comments_post   ON comments(post_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);`}
      </CodeBlock>

      <SectionHeader number={8} title="Common Data Modeling Mistakes" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Storing arrays in a single column', description: 'Putting comma-separated values (tags="react,node,sql") in one column violates 1NF and makes querying, filtering, and indexing impossible. Always use a junction table for multi-value attributes.' },
        { title: 'Using strings for foreign keys', description: 'Storing username or email as foreign keys instead of numeric IDs causes bloat (VARCHAR vs BIGINT in every child row), makes renaming impossible, and is significantly slower to JOIN. Always use surrogate numeric IDs as PKs.' },
        { title: 'One giant table for everything', description: 'Combining unrelated concepts into one mega-table with nullable columns for different entity types (type="user"|"admin"|"bot") is the EAV anti-pattern. Each distinct entity should be its own table.' },
        { title: 'Missing indexes on foreign keys', description: 'PostgreSQL and MySQL do not automatically index foreign key columns. Every FK that you JOIN or filter on needs an explicit index. Forgetting indexes on high-traffic FK columns causes full table scans that kill performance at scale.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Should I model data for reads or writes?',
          answer: 'It depends on your access patterns. Normalized models (3NF) are optimized for writes — minimal redundancy means updates touch fewer rows. Denormalized models are optimized for reads — fewer JOINs mean faster queries. For OLTP (transactional apps with frequent reads and writes), normalize to 3NF. For OLAP (analytics with read-heavy workloads), denormalize into star schemas with fact and dimension tables.',
        },
        {
          question: 'What is a star schema?',
          answer: 'A denormalized pattern for data warehouses: one central fact table (e.g., sales_facts with order_id, amount, quantity) surrounded by dimension tables (date_dim, product_dim, customer_dim, region_dim). Optimized for analytical queries — fast GROUP BY aggregations without complex multi-table JOINs. Used in tools like BigQuery, Redshift, and Snowflake.',
        },
        {
          question: 'How do I model hierarchical/tree data in SQL?',
          answer: 'Common patterns: (1) Adjacency list — each row has parent_id. Simple to understand but recursive queries require recursive CTEs (WITH RECURSIVE in PostgreSQL). (2) Nested sets — store left/right boundary numbers. Fast subtree reads, complex writes. (3) Closure table — store all ancestor/descendant pairs in a separate table. Best read performance for frequent hierarchy queries. PostgreSQL also has the ltree extension for path-based hierarchies.',
        },
        {
          question: 'When should I use a NoSQL database instead of SQL?',
          answer: 'Use NoSQL when: your data is naturally document-shaped with highly variable fields per record, you need extreme horizontal write scalability across distributed nodes, or your schema changes very frequently. Use SQL when: data is inherently relational, you need ACID transactions across multiple entities, you need complex aggregation or reporting queries, or you have audit/compliance requirements that need strong consistency.',
        },
        {
          question: 'What is an entity-relationship diagram and do I need one?',
          answer: 'An ER diagram visually shows entities (rectangles), their attributes (ovals), and relationships (lines with cardinality notation like "1", "N", "M"). Tools like dbdiagram.io, Lucidchart, and DataGrip generate them automatically from your schema. For complex systems with 10+ tables, an ER diagram is invaluable for onboarding new developers and catching relationship mistakes before they reach production.',
        },
        {
          question: 'How do I handle soft deletes in a data model?',
          answer: 'Add a deleted_at TIMESTAMP column (NULL = active, non-NULL = deleted). This preserves data for audit trails and allows recovery. Trade-off: every query must add WHERE deleted_at IS NULL — easy to forget. Solutions: (1) use database views that filter soft-deleted rows, (2) use a tool like Prisma\'s soft delete middleware, (3) use row-level security in PostgreSQL to automatically filter. Hard deletes are simpler but irreversible — choose based on your audit and recovery requirements.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
