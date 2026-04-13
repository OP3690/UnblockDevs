'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function MaskDatabaseSchemaBeforeAiClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Mask Database Schema Before Using AI — Complete Guide to SQL Schema Obfuscation</h1>
      <p className="lead">
        SQL schema masking (also called schema obfuscation or identifier anonymization) is the
        practice of replacing real table names, column names, schema prefixes, and sensitive string
        values with meaningless placeholders before sending SQL to any AI tool — then restoring
        original names from the AI response. This guide covers everything: what gets masked, how
        the DITE algorithm works, the full mask-and-restore workflow, and why browser-based
        processing is the only architecture that is genuinely safe.
      </p>

      <StatGrid stats={[
        { value: 'T_000001', label: 'Every table name replaced — T_000001, T_000002, ... in order of first appearance', color: 'blue' },
        { value: 'C_000001', label: 'Every column name replaced — shared columns get the same placeholder everywhere', color: 'violet' },
        { value: 'V_000001', label: "IN clause string values replaced — 'EXEC', 'PREMIUM' → 'V_000001', 'V_000002'", color: 'green' },
      ]} />

      <SectionHeader number={1} title="What Schema Masking Is — and What It Is Not" />
      <p>
        Schema masking is not encryption. It is not hashing. It is not tokenization in the
        cryptographic sense. It is a deterministic, reversible substitution of SQL identifiers — a
        structural-preserving transformation that makes a SQL query look completely different while
        remaining semantically and syntactically identical.
      </p>

      <p>
        The goal is narrow and specific: allow an AI to analyze, optimize, or generate SQL based
        entirely on query structure, without ever seeing the real names that describe your business
        domain. An AI does not need to know that a table is called <code>employee_records</code> to
        tell you it is missing an index. It only needs to see the shape of the query.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'What masking preserves',
          description:
            'JOIN relationships, WHERE conditions, GROUP BY/ORDER BY structure, subquery nesting, CTE definitions, window function partitioning, aggregate function usage, HAVING clauses, UNION/INTERSECT/EXCEPT structure. Everything the AI needs to give useful SQL advice.',
        },
        {
          title: 'What masking removes',
          description:
            'Real table names, real column names, schema prefixes, table aliases (replaced with A_000001), string literals in IN/WHERE clauses, numeric literals. Everything that reveals your business domain, data model, or internal taxonomy.',
        },
        {
          title: 'What masking is not',
          description:
            "Schema masking does not protect data values in query results. It is a pre-transmission transform applied to SQL text before you copy it to an AI. It operates on the query itself — not on query output. It's a workflow step, not a database security layer.",
        },
        {
          title: 'When masking is sufficient',
          description:
            'If you are using AI to write, optimize, refactor, or debug SQL — and you mask before sending — the AI gets everything it needs. When AI needs actual data samples to help (e.g., explaining unusual query results), masking alone is not enough: use synthetic data instead.',
        },
      ]} />

      <SectionHeader number={2} title="The DITE Algorithm — Deterministic Identifier Transformation Engine" />
      <p>
        DITE is the masking algorithm used in the AI Schema Masker. It processes SQL in five
        stages, each building on the previous.
      </p>

      <CodeBlock lang="text" title="DITE — five-stage pipeline">
{`Stage 1: LEXER
  Input:  Raw SQL string
  Output: Token stream
  Tokens: KEYWORD, IDENTIFIER, QUOTED_IDENTIFIER, STRING_LITERAL,
          NUMERIC_LITERAL, OPERATOR, SYMBOL, COMMENT, WHITESPACE

  The lexer distinguishes SQL keywords (SELECT, FROM, WHERE, JOIN, ON,
  GROUP BY, HAVING, WITH, AS, IN, IS, NULL, CASE, WHEN, THEN, END, ...)
  from user-defined identifiers (table/column/alias names) and from
  string literals ('value') and numeric literals (42, 3.14).

Stage 2: CONTEXT EXTRACTION
  Input:  Token stream
  Output: Classified identifiers

  Context rules:
    After FROM / JOIN                  → next identifier is a TABLE
    After schema.                      → identifier is a TABLE (schema.table)
    Before schema.                     → identifier is a SCHEMA
    After table_or_alias.              → identifier is a COLUMN
    After AS (or implicit alias pos)   → identifier is an ALIAS
    After SELECT, WHERE, ON, HAVING    → unqualified identifier is a COLUMN
    After GROUP BY / ORDER BY          → identifier is a COLUMN

Stage 3: DETERMINISTIC MAPPING
  Input:  Classified identifiers
  Output: placeholder → original mapping

  Counters: schemas, tables, columns, aliases, values, numerics
  Assignment: first occurrence of each unique identifier claims next counter
  Consistency: same identifier → same placeholder everywhere in the SQL

  S_000001 = first schema name seen
  T_000001 = first table name seen
  C_000001 = first column name seen
  A_000001 = first alias seen
  V_000001 = first string literal seen (when value masking enabled)
  N_000001 = first numeric literal seen (when numeric masking enabled)

Stage 4: IDENTIFIER TRANSFORMATION
  Input:  Token stream + mapping
  Output: Transformed SQL (identifiers replaced, structure preserved)

Stage 5: VALUE MASKING (optional)
  Input:  Transformed SQL + string/numeric tokens
  Output: Final masked SQL with 'V_000001' and N_000001 substituted`}
      </CodeBlock>

      <QuickFact color="blue" label="Deterministic means consistent — and that is what makes restore lossless">
        The same identifier always gets the same placeholder. If <code>employee_id</code> appears
        in a SELECT, a JOIN ON, and a WHERE clause, it becomes <code>C_000003</code> in all three
        places. This is what allows perfect restoration — every occurrence of{' '}
        <code>C_000003</code> maps back to <code>employee_id</code>, regardless of how many times
        it appears or which clause it is in.
      </QuickFact>

      <SectionHeader number={3} title="Complete Masking Example — Before and After" />

      <CodeBlock lang="sql" title="Original SQL — real schema names">
{`WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', o.order_placed_at) AS order_month,
    c.customer_segment,
    SUM(o.gross_revenue_usd) AS total_revenue,
    COUNT(DISTINCT o.order_id) AS order_count,
    AVG(o.gross_revenue_usd) AS avg_order_value
  FROM orders.order_facts o
  JOIN crm.customers c ON c.customer_uuid = o.customer_uuid
  WHERE o.order_status NOT IN ('CANCELLED', 'FRAUD_REVIEW')
    AND o.channel IN ('ORGANIC', 'PAID_SEARCH', 'REFERRAL')
  GROUP BY 1, 2
)
SELECT
  order_month,
  customer_segment,
  total_revenue,
  order_count,
  avg_order_value,
  SUM(total_revenue) OVER (
    PARTITION BY customer_segment
    ORDER BY order_month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_revenue
FROM monthly_revenue
ORDER BY customer_segment, order_month;`}
      </CodeBlock>

      <CodeBlock lang="sql" title="Masked SQL — sent to AI">
{`WITH A_000001 AS (
  SELECT
    DATE_TRUNC('month', A_000002.C_000001) AS C_000002,
    A_000003.C_000003,
    SUM(A_000002.C_000004) AS C_000005,
    COUNT(DISTINCT A_000002.C_000006) AS C_000007,
    AVG(A_000002.C_000004) AS C_000008
  FROM S_000001.T_000001 A_000002
  JOIN S_000002.T_000002 A_000003 ON A_000003.C_000009 = A_000002.C_000009
  WHERE A_000002.C_000010 NOT IN ('V_000001', 'V_000002')
    AND A_000002.C_000011 IN ('V_000003', 'V_000004', 'V_000005')
  GROUP BY 1, 2
)
SELECT
  C_000002,
  C_000003,
  C_000005,
  C_000007,
  C_000008,
  SUM(C_000005) OVER (
    PARTITION BY C_000003
    ORDER BY C_000002
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS C_000012
FROM A_000001
ORDER BY C_000003, C_000002;`}
      </CodeBlock>

      <CodeBlock lang="text" title="Mapping file — stored only in your browser">
{`{
  "schemaMap":  { "orders": "S_000001", "crm": "S_000002" },
  "tableMap":   { "order_facts": "T_000001", "customers": "T_000002" },
  "columnMap":  {
    "order_placed_at": "C_000001", "order_month": "C_000002",
    "customer_segment": "C_000003", "gross_revenue_usd": "C_000004",
    "total_revenue": "C_000005", "order_id": "C_000006",
    "order_count": "C_000007", "avg_order_value": "C_000008",
    "customer_uuid": "C_000009", "order_status": "C_000010",
    "channel": "C_000011", "cumulative_revenue": "C_000012"
  },
  "aliasMap":   {
    "monthly_revenue": "A_000001", "o": "A_000002", "c": "A_000003"
  },
  "valueMap":   {
    "CANCELLED": "V_000001", "FRAUD_REVIEW": "V_000002",
    "ORGANIC": "V_000003", "PAID_SEARCH": "V_000004", "REFERRAL": "V_000005"
  }
}`}
      </CodeBlock>

      <AlertBox type="info" title="The mapping file never leaves your browser">
        The mapping JSON shown above is generated and stored entirely in browser memory (and
        optionally in sessionStorage if you enable "Keep mapping in tab"). It is never transmitted
        to unblockdevs.com or any server. The AI only ever sees the masked SQL — never the mapping.
      </AlertBox>

      <SectionHeader number={4} title="The Restore Pipeline — How AI Responses Are Unmasked" />
      <p>
        After the AI returns SQL using placeholder names, paste the response into the Restore panel.
        The reverse pipeline runs:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Re-tokenize the AI response',
          desc: 'The restore engine runs the same lexer on the AI-generated SQL. This produces a fresh token stream from the AI output.',
        },
        {
          title: 'Build the reverse mapping',
          desc: 'The original mapping (placeholder → real name) is inverted: T_000001 → order_facts, C_000001 → order_placed_at, V_000001 → CANCELLED, etc.',
        },
        {
          title: 'Apply longest-match reverse lookup',
          desc: 'Each IDENTIFIER token in the AI response is checked against the reverse map. Schema-qualified names (S_000001.T_000001) are matched as compound units before individual tokens. This prevents partial replacements.',
        },
        {
          title: 'Restore STRING_LITERAL tokens',
          desc: "For value masking: STRING_LITERAL tokens with inner content V_000001 are matched against the valueMap. 'V_000001' → 'CANCELLED' with quotes preserved for SQL validity.",
        },
        {
          title: 'Output restored SQL',
          desc: "Every placeholder becomes the original real name. The restored SQL is structurally identical to what the AI returned — but with your real identifiers back in place. Production-ready.",
        },
      ]} />

      <ErrorFix
        title="Restore handles AI reformatting gracefully"
        bad={`-- AI sometimes reformats or adds comments — restore handles it
-- Optimized query: using index on A_000002.C_000009
SELECT A_000003.C_000003,
       SUM(A_000002.C_000004) AS C_000005
FROM S_000001.T_000001 A_000002
  INNER JOIN S_000002.T_000002 A_000003
    ON A_000003.C_000009 = A_000002.C_000009
WHERE A_000002.C_000010 NOT IN ('V_000001', 'V_000002')
GROUP BY A_000003.C_000003;`}
        good={`-- After restore: real names back, AI's structural improvements kept
-- Optimized query: using index on c.customer_uuid
SELECT c.customer_segment,
       SUM(o.gross_revenue_usd) AS total_revenue
FROM orders.order_facts o
  INNER JOIN crm.customers c
    ON c.customer_uuid = o.customer_uuid
WHERE o.order_status NOT IN ('CANCELLED', 'FRAUD_REVIEW')
GROUP BY c.customer_segment;`}
        badLabel="AI response with placeholders — paste into Restore panel"
        goodLabel="Restored SQL — real names back, AI's INNER JOIN rewrite preserved"
      />

      <SectionHeader number={5} title="What Types of SQL Are Supported" />
      <p>
        The DITE engine handles the full range of SQL complexity used in production environments:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'CTEs (Common Table Expressions)',
          description:
            'WITH clauses and their aliased result sets. CTE names are treated as aliases (A_000001) and restored consistently. Recursive CTEs (WITH RECURSIVE) are also supported — the recursive reference uses the same alias placeholder.',
        },
        {
          title: 'Window functions',
          description:
            'PARTITION BY, ORDER BY, ROWS BETWEEN, RANGE BETWEEN, GROUPS BETWEEN inside OVER() clauses. Column references in window specifications are mapped and restored correctly.',
        },
        {
          title: 'Subqueries',
          description:
            'Correlated and uncorrelated subqueries in SELECT, FROM, WHERE, and HAVING. Nested subquery aliases are classified as aliases. Column references inside subqueries use the same column counter as the outer query (consistent mapping).',
        },
        {
          title: 'JSON operators and dialect-specific syntax',
          description:
            "PostgreSQL ->, ->>, #>, #>>, @>, <@ operators; MySQL JSON_EXTRACT, JSON_UNQUOTE; SQL Server's FOR JSON PATH. Operator tokens are passed through untouched — only identifiers and literals are transformed.",
        },
        {
          title: 'INSERT, UPDATE, DELETE',
          description:
            'DML statements: INSERT INTO table (col1, col2) VALUES (...), UPDATE table SET col1 = val WHERE col2 = val, DELETE FROM table WHERE condition. All table and column references are masked and restored.',
        },
        {
          title: 'Schema DDL',
          description:
            'CREATE TABLE, ALTER TABLE, CREATE INDEX statements. Column names in DDL are masked for use with AI schema design help — useful when asking AI to review or improve a table structure without exposing real naming.',
        },
      ]} />

      <SectionHeader number={6} title="Browser-Only Architecture — Why It Matters" />
      <p>
        Many SQL tools process queries server-side. For masking to be meaningful, the entire
        transform pipeline must run in the browser — before any network request. Here is why the
        architecture matters:
      </p>

      <CodeBlock lang="text" title="Architecture comparison">
{`Server-side masking tool:
  Your SQL (real names) → HTTPS → Tool server → Masked SQL → AI API
                                   ↑
                           Real names visible to tool server logs,
                           subject to tool's data retention policy,
                           creates a new vendor relationship

Browser-based DITE (unblockdevs.com/ai-schema-masker):
  Your SQL (real names) → Web Worker (in your browser) → Masked SQL
                          ↑                               ↓
                  Runs on your machine              Copy to AI tool
                  Mapping stays in RAM              AI never sees real names
                  Nothing sent to server            No vendor relationship`}
      </CodeBlock>

      <QuickFact color="green" label="Web Worker isolation provides an additional security boundary">
        The DITE engine runs inside a browser Web Worker — a sandboxed thread with no access to
        the DOM, no access to browser storage, and no network access. The mapping data lives in the
        Worker's memory space. When you close the tab, the Worker is terminated and the mapping is
        gone.
      </QuickFact>

      <SectionHeader number={7} title="Masking Options — When to Enable Each" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Identifiers — always on',
          description:
            'Table names, column names, schema prefixes, and aliases are always masked. This is non-optional and provides the core protection against database architecture exposure.',
        },
        {
          title: 'String values (IN clause) — on by default',
          description:
            "Enabled by default. Masks string literals in IN clauses, WHERE conditions, and CASE WHEN expressions. 'ENTERPRISE', 'EXEC', 'FRAUD_REVIEW' → 'V_000001', 'V_000002'. Recommended whenever IN clause values represent internal business taxonomies.",
        },
        {
          title: 'Numeric values — opt-in',
          description:
            'Disabled by default. When enabled, numeric literals (90, 1000000, 3.14) → N_000001, N_000002. Use when specific numbers in WHERE conditions could reveal business thresholds (e.g., WHERE salary > 250000 or WHERE mrr_cents > 100000).',
        },
        {
          title: 'Multi-session mapping file',
          description:
            'Download the JSON mapping file after masking (via the Mapping panel). Store it securely. When resuming work in a new session, load the mapping file to ensure new queries use the same placeholder assignments — enabling consistent masking across multiple AI sessions.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does schema masking work with JSON Schema (not SQL)?',
          answer: 'Yes. The AI Schema Masker accepts JSON Schema documents in addition to SQL. Property names in JSON Schema are treated as column equivalents and masked with C_000001 placeholders. This is useful when using AI to review or extend a JSON Schema without exposing your data model.',
        },
        {
          question: 'What if two different tables have a column with the same name?',
          answer: "DITE uses a single shared column counter across the entire SQL. If both order_facts and customers have a column called created_at, both map to the same placeholder (e.g., C_000015). This is correct behavior: when restored, both occurrences of C_000015 become created_at again. The AI sees consistent placeholder usage — just as it would see a consistently named column in real SQL.",
        },
        {
          question: 'Can I mask DDL (CREATE TABLE, ALTER TABLE) as well as SELECT queries?',
          answer: 'Yes. Paste DDL into the masker. Table names and column names in CREATE TABLE, CREATE INDEX, and ALTER TABLE statements are masked with T_ and C_ prefixes. This is useful for asking AI to review a table design, suggest normalization, or recommend index strategy — without exposing your real schema naming.',
        },
        {
          question: 'How do I handle queries that span multiple files or migration scripts?',
          answer: 'Download the mapping file after masking your first query. When you mask additional queries in the same session, the cumulative mapping is maintained — identifiers from the first query get the same placeholders if they appear in later queries. For cross-session consistency, load the saved mapping file at the start of each session.',
        },
        {
          question: 'What if the AI invents new column names in its response?',
          answer: "If the AI adds a new placeholder (e.g., C_000099 that was not in your original mapping), the restore engine will leave that placeholder unchanged in the output and highlight it. You can then manually replace it with the appropriate real name. This is rare — the AI typically uses only the placeholders it was given.",
        },
        {
          question: 'Is schema masking the same as SQL obfuscation?',
          answer: 'The terms overlap but have different emphases. SQL obfuscation usually refers to making SQL intentionally difficult to read (for intellectual property protection or anti-reverse-engineering). Schema masking is specifically about replacing identifiers with structured placeholders for safe AI transmission. The key difference: schema masking is reversible and designed for round-trip fidelity. Obfuscation is typically not.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
