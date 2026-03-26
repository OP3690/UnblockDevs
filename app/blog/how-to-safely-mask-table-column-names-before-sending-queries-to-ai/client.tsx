'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToSafelyMaskTableColumnNamesBeforeSendingQueriesToAiClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Safely Mask Table and Column Names Before Sending SQL Queries to AI</h1>
      <p className="lead">
        Sending your database schema to ChatGPT or Claude can expose sensitive business information:
        customer table names, revenue column names, internal system identifiers. Masking schema
        before AI processing protects your data while still getting useful query help.
      </p>

      <StatGrid stats={[
        { value: 'Schema', label: 'reveals business structure and sensitive field names', color: 'red' },
        { value: 'Masking', label: 'replaces real names with neutral placeholders', color: 'green' },
        { value: 'Reversible', label: 'map tokens back after AI generates query', color: 'blue' },
        { value: 'GDPR', label: 'schema masking helps with data governance compliance', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Mask SQL Schema?" />
      <QuickFact>
        Your database schema is a competitive asset. Table names like "churn_risk_score",
        "revenue_by_account", "competitor_tracking" reveal business intelligence strategy.
        Column names like "ssn", "salary", "health_condition" indicate the presence of
        regulated data. Mask before sending to any external AI service.
      </QuickFact>

      <SectionHeader number={2} title="Python Schema Masker" />
      <CodeBlock language="python" filename="sql_schema_masker.py">
{`import re
import json
from typing import Dict

class SqlSchemaMasker:
    """Mask table and column names in SQL schemas before AI processing"""

    def __init__(self):
        self.table_map = {}   # real_name → TABLE_XX
        self.column_map = {}  # real_name → col_xx
        self.reverse_map = {} # masked → real
        self._table_counter = 1
        self._col_counter = 1

    def _mask_table(self, name: str) -> str:
        if name not in self.table_map:
            masked = f"TABLE_{self._table_counter:02d}"
            self.table_map[name] = masked
            self.reverse_map[masked] = name
            self._table_counter += 1
        return self.table_map[name]

    def _mask_column(self, name: str) -> str:
        if name not in self.column_map:
            masked = f"col_{self._col_counter:02d}"
            self.column_map[name] = masked
            self.reverse_map[masked] = name
            self._col_counter += 1
        return self.column_map[name]

    def mask_create_statement(self, sql: str) -> str:
        """Mask a CREATE TABLE statement"""
        # Mask table name
        sql = re.sub(
            r'CREATE TABLE\s+(\w+)',
            lambda m: f"CREATE TABLE {self._mask_table(m.group(1))}",
            sql, flags=re.IGNORECASE
        )
        # Mask column names (word at start of each column definition line)
        sql = re.sub(
            r'^\s{2,}(\w+)\s+(INT|VARCHAR|TEXT|DECIMAL|BOOLEAN|DATE|TIMESTAMP|BIGINT|FLOAT)',
            lambda m: f"  {self._mask_column(m.group(1))} {m.group(2)}",
            sql, flags=re.IGNORECASE | re.MULTILINE
        )
        return sql

    def unmask_sql(self, sql: str) -> str:
        """Replace masked names back to original in AI-generated SQL"""
        result = sql
        # Sort by length (longest first) to avoid partial replacements
        for masked, original in sorted(self.reverse_map.items(), key=lambda x: -len(x[0])):
            result = re.sub(r'\\b' + re.escape(masked) + r'\\b', original, result, flags=re.IGNORECASE)
        return result

    def export_mapping(self) -> str:
        """Export mapping for reference"""
        return json.dumps({
            "tables": self.table_map,
            "columns": self.column_map
        }, indent=2)

# Example usage
masker = SqlSchemaMasker()

original_schema = """
CREATE TABLE customer_churn_risk (
  customer_id BIGINT PRIMARY KEY,
  email VARCHAR(255),
  churn_score DECIMAL(5,2),
  revenue_ltv DECIMAL(10,2),
  last_login_date DATE,
  is_at_risk BOOLEAN
);
"""

masked = masker.mask_create_statement(original_schema)
print("=== SEND THIS TO AI ===")
print(masked)
# CREATE TABLE TABLE_01 (
#   col_01 BIGINT PRIMARY KEY,
#   col_02 VARCHAR(255),
#   ...

print("\\n=== MAPPING ===")
print(masker.export_mapping())

# After AI generates query:
ai_query = "SELECT col_01, col_03 FROM TABLE_01 WHERE col_06 = true"
original_query = masker.unmask_sql(ai_query)
print("\\n=== RESTORED QUERY ===")
print(original_query)
# SELECT customer_id, churn_score FROM customer_churn_risk WHERE is_at_risk = true`}
      </CodeBlock>

      <SectionHeader number={3} title="What to Mask vs What to Preserve" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Always mask', description: 'Table names containing business logic (churn_risk, revenue_forecast), column names with PII indicators (ssn, salary, health), names revealing strategy or competitive info.' },
        { title: 'Usually preserve', description: 'Data types (INT, VARCHAR, BOOLEAN), constraints (PRIMARY KEY, NOT NULL, FOREIGN KEY), relationships/join conditions structure, column cardinality hints (UNIQUE).' },
        { title: 'Preserve for AI quality', description: 'Keeping data types and constraints helps the AI understand your schema structure and generate syntactically correct queries. The AI needs type info, not the business names.' },
        { title: 'Mapping reference', description: 'Always keep your masking map. When AI generates "SELECT col_03 FROM TABLE_01 WHERE col_06 = true", you need the map to convert back to real names.' },
      ]} />

      <AlertBox type="tip" title="Use our AI SQL Masker tool">
        unblockdevs.com/ai-schema-masker lets you paste your CREATE TABLE statements and
        instantly generates masked versions with the mapping. Copy masked schema → send to AI →
        paste AI response → restore original names automatically.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does AI still give useful SQL help with masked schema?',
          answer: 'Yes — AI needs data types and relationships, not business names, to write correct SQL. "SELECT col_03 FROM TABLE_01 JOIN TABLE_02 ON TABLE_01.col_01 = TABLE_02.col_04" is structurally identical to using real names. After the AI generates the query, restore real names using your mapping.',
        },
        {
          question: 'What if the AI-generated query references column names differently?',
          answer: 'Use whole-word replacement when unmasking (not simple string replace). Regex with word boundaries (\\bcol_01\\b) prevents accidental replacements inside other identifiers. Validate the unmasked SQL before running it in production.',
        },
        {
          question: 'Do I need to mask sample data too?',
          answer: 'Absolutely — never send real data values to AI. Mask or remove the WHERE clause sample values, ORDER BY examples, and any EXPLAIN output that contains actual data. The schema alone (structure + types) is usually sufficient for AI query generation.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
