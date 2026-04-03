'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function HowToSafelyMaskTableColumnNamesBeforeSendingQueriesToAiClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Safely Mask Table and Column Names Before Sending SQL Queries to AI</h1>
      <p className="lead">
        Sending your database schema to ChatGPT or Claude can expose sensitive business information:
        customer table names, revenue column names, internal system identifiers, and PII field names.
        Masking schema before AI processing protects your data while still getting accurate query help.
        This guide covers what to mask and why, a working Python implementation, how to reverse the
        masking after the AI generates SQL, and compliance considerations for regulated industries.
      </p>

      <StatGrid stats={[
        { value: 'Schema', label: 'reveals business structure, strategy, and sensitive field names', color: 'red' },
        { value: 'Masking', label: 'replaces real names with neutral TABLE_01 / col_01 placeholders', color: 'green' },
        { value: 'Reversible', label: 'keep a mapping to restore original names after AI generates SQL', color: 'blue' },
        { value: 'GDPR/SOC2', label: 'schema masking supports data governance and compliance goals', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Mask SQL Schema Before Sending to AI?" />
      <p>
        Your database schema is more revealing than most teams realize. Table names and column names
        encode your entire business model, operational strategy, and the categories of sensitive data
        you hold. Sending this to an external AI service creates risks that extend beyond data privacy
        into competitive intelligence and regulatory compliance.
      </p>
      <QuickFact color="red" label="What your schema reveals">
        Table names like "churn_risk_score", "revenue_by_account", "competitor_tracking",
        "acquisition_pipeline" reveal your business strategy and competitive intelligence.
        Column names like "ssn", "salary", "health_condition", "credit_score" signal regulated
        data categories. Even aggregate table names like "ml_training_features" reveal
        your internal AI/ML capabilities. All of this gets sent to external AI providers when
        you paste schema for query help — and may be used in training future models.
      </QuickFact>

      <SectionHeader number={2} title="Before and After Masking" />
      <ErrorFix
        title="Masking schema before sending to AI"
        bad={`-- ❌ What you send WITHOUT masking:
CREATE TABLE customer_churn_risk (
  customer_id BIGINT PRIMARY KEY,
  email VARCHAR(255),
  churn_score DECIMAL(5,2),    -- reveals you track churn risk
  revenue_ltv DECIMAL(10,2),   -- reveals lifetime value data
  health_score INT,            -- may signal regulated health data
  competitor_used VARCHAR(100), -- reveals competitive intelligence tracking
  is_at_risk BOOLEAN,
  last_login_date DATE
);
-- External AI now knows: your churn model, revenue tracking, health data, competitor analysis`}
        good={`-- ✅ What you send WITH masking:
CREATE TABLE TABLE_01 (
  col_01 BIGINT PRIMARY KEY,
  col_02 VARCHAR(255),
  col_03 DECIMAL(5,2),
  col_04 DECIMAL(10,2),
  col_05 INT,
  col_06 VARCHAR(100),
  col_07 BOOLEAN,
  col_08 DATE
);
-- AI sees: a table with 8 columns of various types — gives accurate SQL help
-- Your business logic stays private`}
        badLabel="Exposes business strategy, PII categories, competitive intel"
        goodLabel="AI gets structure and types — sufficient for accurate SQL generation"
      />

      <SectionHeader number={3} title="Python Schema Masker Implementation" />
      <CodeBlock language="python" filename="sql_schema_masker.py — complete implementation">
{`import re
import json
from typing import Dict, Tuple

class SqlSchemaMasker:
    """
    Mask table and column names in SQL schemas before AI processing.
    Maintains a reversible mapping to restore original names in AI-generated SQL.
    """

    def __init__(self):
        self.table_map: Dict[str, str] = {}    # real_name → TABLE_XX
        self.column_map: Dict[str, str] = {}   # real_name → col_XX
        self.reverse_map: Dict[str, str] = {}  # masked → real
        self._table_counter = 1
        self._col_counter = 1

    def _mask_table(self, name: str) -> str:
        if name not in self.table_map:
            masked = f"TABLE_{self._table_counter:02d}"
            self.table_map[name] = masked
            self.reverse_map[masked.lower()] = name
            self.reverse_map[masked] = name
            self._table_counter += 1
        return self.table_map[name]

    def _mask_column(self, name: str) -> str:
        if name not in self.column_map:
            masked = f"col_{self._col_counter:02d}"
            self.column_map[name] = masked
            self.reverse_map[masked.lower()] = name
            self.reverse_map[masked] = name
            self._col_counter += 1
        return self.column_map[name]

    def mask_schema(self, sql: str) -> str:
        """Mask a full schema (one or more CREATE TABLE statements)."""
        # Mask CREATE TABLE statements
        sql = re.sub(
            r'CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[\`"]?(\w+)[\`"]?',
            lambda m: f"CREATE TABLE {self._mask_table(m.group(1))}",
            sql, flags=re.IGNORECASE
        )
        # Mask column names in column definitions
        # Pattern: leading whitespace + column_name + data_type
        sql = re.sub(
            r'^(\s+)[\`"]?(\w+)[\`"]?\s+(BIGINT|INT|INTEGER|SMALLINT|TINYINT'
            r'|VARCHAR|CHAR|TEXT|LONGTEXT|MEDIUMTEXT'
            r'|DECIMAL|NUMERIC|FLOAT|DOUBLE|REAL'
            r'|BOOLEAN|BOOL|DATE|DATETIME|TIMESTAMP|TIME'
            r'|JSON|BLOB|BINARY)',
            lambda m: f"{m.group(1)}{self._mask_column(m.group(2))} {m.group(3)}",
            sql, flags=re.IGNORECASE | re.MULTILINE
        )
        # Mask FOREIGN KEY references
        sql = re.sub(
            r'FOREIGN\s+KEY\s*\([\`"]?(\w+)[\`"]?\)',
            lambda m: f"FOREIGN KEY ({self.column_map.get(m.group(1), m.group(1))})",
            sql, flags=re.IGNORECASE
        )
        # Mask REFERENCES table(column)
        sql = re.sub(
            r'REFERENCES\s+[\`"]?(\w+)[\`"]?\s*\([\`"]?(\w+)[\`"]?\)',
            lambda m: (
                f"REFERENCES {self.table_map.get(m.group(1), m.group(1))}"
                f"({self.column_map.get(m.group(2), m.group(2))})"
            ),
            sql, flags=re.IGNORECASE
        )
        return sql

    def unmask_sql(self, sql: str) -> str:
        """Replace masked names back to originals in AI-generated SQL."""
        result = sql
        # Sort by length descending to avoid partial replacements (col_10 before col_1)
        for masked, original in sorted(
            self.reverse_map.items(), key=lambda x: -len(x[0])
        ):
            result = re.sub(
                r'\b' + re.escape(masked) + r'\b',
                original,
                result,
                flags=re.IGNORECASE
            )
        return result

    def export_mapping(self) -> str:
        """Export the masking map as JSON for reference or storage."""
        return json.dumps({
            "tables": self.table_map,
            "columns": self.column_map
        }, indent=2)

    @classmethod
    def from_mapping(cls, mapping_json: str) -> 'SqlSchemaMasker':
        """Restore a masker from a previously exported mapping."""
        masker = cls()
        mapping = json.loads(mapping_json)
        masker.table_map = mapping["tables"]
        masker.column_map = mapping["columns"]
        # Build reverse map
        for real, masked in mapping["tables"].items():
            masker.reverse_map[masked.lower()] = real
            masker.reverse_map[masked] = real
        for real, masked in mapping["columns"].items():
            masker.reverse_map[masked.lower()] = real
            masker.reverse_map[masked] = real
        return masker


# ─── Example Usage ───────────────────────────────────────────────────────────
masker = SqlSchemaMasker()

original_schema = """
CREATE TABLE customer_churn_risk (
  customer_id BIGINT PRIMARY KEY,
  email VARCHAR(255),
  churn_score DECIMAL(5,2),
  revenue_ltv DECIMAL(10,2),
  health_score INT,
  is_at_risk BOOLEAN,
  last_login_date DATE
);

CREATE TABLE competitor_tracking (
  entry_id BIGINT PRIMARY KEY,
  customer_id BIGINT,
  competitor_name VARCHAR(100),
  switch_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customer_churn_risk(customer_id)
);
"""

masked = masker.mask_schema(original_schema)
print("=== SEND TO AI ===")
print(masked)

# Save mapping for later use
mapping = masker.export_mapping()
print("\n=== SAVE THIS MAPPING ===")
print(mapping)

# After AI generates a query, restore original names:
ai_query = """
SELECT col_01, col_03, col_07
FROM TABLE_01
WHERE col_07 = true
  AND col_04 > 1000
ORDER BY col_03 DESC;
"""

restored = masker.unmask_sql(ai_query)
print("\n=== RESTORED QUERY ===")
print(restored)
# SELECT customer_id, churn_score, is_at_risk
# FROM customer_churn_risk
# WHERE is_at_risk = true
#   AND revenue_ltv > 1000
# ORDER BY churn_score DESC;`}
      </CodeBlock>

      <SectionHeader number={4} title="What to Mask vs What to Preserve" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Always mask — business intelligence', description: 'Table names containing business logic (churn_risk, revenue_forecast, competitor_tracking), column names revealing metrics (ltv, arr, mrr), names indicating ML/AI features (churn_probability, propensity_score), and any name that reveals internal product or strategic information.' },
        { title: 'Always mask — PII indicators', description: 'Column names indicating regulated or sensitive data: ssn, social_security, salary, health_condition, medical_record, credit_score, ethnicity, date_of_birth. Even the existence of these column names signals regulated data categories to an external service.' },
        { title: 'Preserve — structure metadata', description: 'Data types (INT, VARCHAR, BOOLEAN), constraints (PRIMARY KEY, NOT NULL, UNIQUE), relationship structure (FOREIGN KEY), cardinality hints. The AI needs this structural information to generate syntactically correct SQL. Types and constraints are not sensitive.' },
        { title: 'Keep your mapping safe', description: 'The masking map is as sensitive as the schema itself — it\'s a direct lookup between real and masked names. Store it in your secrets manager or an encrypted file alongside the query. Never send the mapping to the AI service.' },
      ]} />

      <SectionHeader number={5} title="Compliance and Governance Considerations" />
      <KeyPointsGrid columns={2} items={[
        { title: 'GDPR and data minimization', description: 'GDPR requires data minimization — processing only the data strictly necessary for the purpose. Sending schema to an AI service for query generation is a processing activity. Masking ensures you\'re not exposing PII category information unnecessarily to third parties.' },
        { title: 'SOC 2 and vendor risk', description: 'SOC 2 compliance requires assessing data shared with third-party vendors (including AI providers). Masking schema reduces the scope of sensitive data shared with AI vendors. Document the masking process as a control in your vendor risk management program.' },
        { title: 'HIPAA considerations', description: 'For healthcare organizations: HIPAA Protected Health Information (PHI) column names (patient_id, diagnosis_code, medication, health_record) must not be sent to uncovered AI services. Masking is a technical safeguard. Consider using on-premise or HIPAA BAA-covered AI services for healthcare schema.' },
        { title: 'Internal policy and training', description: 'Establish a policy that all schema sent to external AI services must be masked first. Document the process. Train developers on what constitutes sensitive schema information. Consider building masking into your SQL IDE or AI assistant integration as an automatic step.' },
      ]} />

      <AlertBox type="tip" title="Our AI SQL Masker tool handles this automatically">
        The unblockdevs.com AI Schema Masker lets you paste CREATE TABLE statements and
        instantly generates masked versions with the complete mapping. Copy the masked schema,
        send to any AI service, paste the AI-generated SQL back, and restore original names
        automatically. No Python setup required.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does AI still give useful SQL help with a masked schema?',
          answer: 'Yes — the AI needs data types, constraints, and table relationships to write correct SQL, not business names. "SELECT col_03 FROM TABLE_01 JOIN TABLE_02 ON TABLE_01.col_01 = TABLE_02.col_04 WHERE col_07 = true" is structurally identical to using real names. The AI understands column types and joins from the schema structure alone. After the AI generates the query, restore real names using your mapping before running it.',
        },
        {
          question: 'What if the AI-generated SQL references column names I didn\'t mask?',
          answer: 'The AI may infer or make up plausible column names if it doesn\'t have all columns in its context (e.g., if you only showed part of the schema). Always validate AI-generated SQL against your actual schema before running it. Use your reverse mapping to check: any column name that\'s not in your reverse map was invented by the AI and needs to be corrected.',
        },
        {
          question: 'Do I need to mask sample data too?',
          answer: 'Absolutely — never send real data values to an external AI service, even for debugging. Mask or substitute WHERE clause example values, remove ORDER BY examples with specific values, and anonymize any EXPLAIN output. The schema structure (column names and types) is usually sufficient for AI to generate correct query patterns — sample data is rarely needed and significantly increases privacy risk.',
        },
        {
          question: 'Can I use this approach with multi-table queries and JOINs?',
          answer: 'Yes — the masker handles multiple CREATE TABLE statements and FOREIGN KEY relationships. When you send the masked multi-table schema, the AI can still construct JOIN queries using the masked names (JOIN TABLE_01 ON TABLE_01.col_01 = TABLE_02.col_04). After unmasking, the JOIN query uses your real table and column names. Keep all related tables in the same masker instance so the mapping is consistent across the entire schema.',
        },
        {
          question: 'What about sending SQL queries (not schema) to AI for optimization?',
          answer: 'Queries can be even more sensitive than schema because they reveal business logic — "WHERE churn_score > 0.7 AND revenue_ltv < 500" reveals your churn intervention threshold and LTV cutoffs. Apply the same masking approach to queries: replace table and column names with masked versions, send for optimization help, then restore real names. The table map from your schema masker can be reused directly for query masking.',
        },
        {
          question: 'Is there a risk that the AI learns from my masked schema?',
          answer: 'Major AI providers (OpenAI, Anthropic) have API terms that state API inputs are not used to train their models by default (though check current terms, as policies evolve). Even with this assurance, masking is still best practice: it protects against unexpected policy changes, data breaches at the provider, and reduces the surface area of sensitive business information stored in provider logs and caches.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
