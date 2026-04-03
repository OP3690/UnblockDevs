'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CommonDataQualityIssuesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Common Data Quality Issues — and How Data Engineers Fix Them</h1>
      <p className="lead">
        Bad data breaks pipelines, corrupts analytics, and causes wrong business decisions.
        Data engineers spend 60-80% of their time cleaning and validating data. This guide covers
        the most common data quality problems, how to detect them, and proven fixes with code examples —
        from NULL handling to schema drift and automated quality monitoring in CI/CD.
      </p>

      <StatGrid stats={[
        { value: '80%', label: 'of data work is cleaning and preparation, not analysis', color: 'amber' },
        { value: '$12.9M', label: 'average annual cost of bad data per organization (Gartner)', color: 'red' },
        { value: '6 types', label: 'of data quality dimensions to measure and track', color: 'blue' },
        { value: 'Great Expectations', label: 'top open-source data quality validation framework', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The 6 Dimensions of Data Quality" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Completeness', description: 'Are all required fields present and populated? NULL values in critical columns, missing rows, or truncated datasets all indicate completeness failures. Track: NULL rate per column, row count vs expected.' },
        { title: 'Accuracy', description: 'Does the data reflect reality? Wrong values, typos, unit errors (miles vs kilometers), outdated records, and transcription mistakes all reduce accuracy. Hard to detect without a ground truth source.' },
        { title: 'Consistency', description: 'Is the same entity represented the same way across systems? Customer "John Smith" vs "J. Smith" vs "john smith" in different tables causes JOIN failures and inflated user counts.' },
        { title: 'Timeliness', description: 'Is the data current enough for its intended use? Yesterday\'s inventory levels are useless for real-time pricing. Track: data freshness (max timestamp), pipeline lag, and SLA adherence.' },
        { title: 'Validity', description: 'Does data conform to expected formats and business rules? Birthdate "1800-01-01" or email "user@" or negative order amounts signal validity failures. Define and enforce constraints explicitly.' },
        { title: 'Uniqueness', description: 'Are records duplicated? Duplicate customer records inflate user counts. Duplicate transactions overstate revenue. Track: duplicate rate by primary key and business key combinations.' },
      ]} />

      <SectionHeader number={2} title="Issue 1 — NULL and Missing Values" />
      <ErrorFix
        bad={`-- Hidden NULLs cause silent calculation errors
SELECT
    user_id,
    AVG(purchase_amount) as avg_spend  -- NULL rows are excluded silently
FROM purchases
GROUP BY user_id
-- If 30% of amounts are NULL, avg is computed on 70% of rows
-- You don't know — no error is raised`}
        good={`-- Step 1: Detect missing values before using the data
SELECT
    COUNT(*) as total_rows,
    COUNT(purchase_amount) as non_null_count,
    COUNT(*) - COUNT(purchase_amount) as null_count,
    ROUND(100.0 * (COUNT(*) - COUNT(purchase_amount)) / COUNT(*), 2) as null_pct
FROM purchases;

-- Step 2: Handle NULLs explicitly with documented decision
SELECT
    user_id,
    AVG(COALESCE(purchase_amount, 0)) as avg_spend_with_zeros,
    AVG(purchase_amount) as avg_spend_valid_only,  -- explicit exclusion
    COUNT(*) as total_rows,
    COUNT(purchase_amount) as valid_rows,
    COUNT(*) - COUNT(purchase_amount) as null_rows
FROM purchases
GROUP BY user_id`}
        badLabel="Implicit NULL handling — silent errors"
        goodLabel="Explicit NULL detection and documented handling"
      />

      <CodeBlock language="python" filename="NULL analysis across an entire DataFrame">
{`import pandas as pd

df = pd.read_csv('customers.csv')

# Full NULL analysis across all columns
null_report = pd.DataFrame({
    'total_rows': len(df),
    'null_count': df.isnull().sum(),
    'null_pct': (df.isnull().sum() / len(df) * 100).round(2),
    'dtype': df.dtypes,
}).sort_values('null_pct', ascending=False)

print(null_report)
# Shows which columns have most NULLs — prioritize fixing those

# Raise an alert if critical columns exceed threshold
CRITICAL_COLUMNS = ['user_id', 'email', 'created_at']
NULL_THRESHOLD_PCT = 1.0  # >1% NULLs in critical columns is a pipeline failure

for col in CRITICAL_COLUMNS:
    null_pct = df[col].isnull().mean() * 100
    if null_pct > NULL_THRESHOLD_PCT:
        raise ValueError(
            f"Data quality failure: {col} has {null_pct:.1f}% NULLs "
            f"(threshold: {NULL_THRESHOLD_PCT}%)"
        )`}
      </CodeBlock>

      <SectionHeader number={3} title="Issue 2 — Duplicate Records" />
      <CodeBlock language="python" filename="Duplicate Detection and Deduplication with Pandas">
{`import pandas as pd

df = pd.read_csv('customers.csv')

# Detect duplicates by different keys
print(f"Total rows: {len(df)}")
print(f"Exact duplicate rows: {df.duplicated().sum()}")
print(f"Email duplicates (business key): {df.duplicated(subset=['email']).sum()}")
print(f"Phone duplicates: {df.duplicated(subset=['phone']).sum()}")

# Examine duplicate examples
email_dupes = df[df.duplicated(subset=['email'], keep=False)]
print("\\nSample email duplicates:")
print(email_dupes.sort_values('email').head(10))

# Strategy 1: Keep most recent record per email
df_deduped = (
    df.sort_values('updated_at', ascending=False)
    .drop_duplicates(subset=['email'], keep='first')
    .reset_index(drop=True)
)
print(f"\\nAfter dedup: {len(df_deduped)} rows ({len(df) - len(df_deduped)} removed)")

# Strategy 2: Merge duplicate records (consolidate data from all copies)
def merge_duplicates(group):
    """Combine duplicate records: take most recent non-null value per field"""
    result = {}
    for col in group.columns:
        # Take first non-null value from the group (sorted by recency)
        non_null = group[col].dropna()
        result[col] = non_null.iloc[0] if len(non_null) > 0 else None
    return pd.Series(result)

df_merged = (
    df.sort_values('updated_at', ascending=False)
    .groupby('email', as_index=False)
    .apply(merge_duplicates)
)

# Strategy 3: Flag for manual review (don't auto-delete)
df['is_duplicate'] = df.duplicated(subset=['email'], keep='first')
duplicates_for_review = df[df['is_duplicate']].to_csv('duplicates_review.csv')`}
      </CodeBlock>

      <SectionHeader number={4} title="Issue 3 — Inconsistent Formats" />
      <ErrorFix
        bad={`# Same data, multiple formats — analytics nightmare
# All of these represent the same date:
dates = ['2024-01-15', '01/15/2024', '15-Jan-2024', 'January 15, 2024', '1/15/24']

# Same phone, different formats:
phones = ['+1-555-123-4567', '5551234567', '(555) 123-4567', '555.123.4567']

# Same state, different representations:
states = ['CA', 'California', 'ca', 'CALIFORNIA', 'Calif.']

# Result: GROUP BY state gives 5 rows instead of 1`}
        good={`import re
from datetime import datetime

def normalize_date(date_str: str) -> str:
    """Normalize various date formats to ISO 8601 YYYY-MM-DD"""
    formats = ['%Y-%m-%d', '%m/%d/%Y', '%d-%b-%Y', '%B %d, %Y', '%m/%d/%y']
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt).strftime('%Y-%m-%d')
        except ValueError:
            continue
    raise ValueError(f"Cannot parse date: {date_str!r}")

def normalize_phone(phone: str) -> str:
    """Normalize to E.164 format: +1XXXXXXXXXX"""
    digits = re.sub(r'\\D', '', phone)  # strip non-digits
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits[0] == '1':
        return f"+{digits}"
    raise ValueError(f"Cannot normalize phone: {phone!r} (got {len(digits)} digits)")

STATE_ABBREVS = {'california': 'CA', 'new york': 'NY', 'texas': 'TX', ...}

def normalize_state(state: str) -> str:
    s = state.strip().lower().rstrip('.')
    if len(s) == 2:
        return s.upper()  # already abbreviated
    return STATE_ABBREVS.get(s, state.upper())`}
        badLabel="Multiple inconsistent formats — broken analytics"
        goodLabel="Normalization functions — consistent output"
      />

      <SectionHeader number={5} title="Issue 4 — Schema Drift" />
      <AlertBox type="error" title="Schema drift silently breaks pipelines">
        When upstream teams add, rename, or remove columns, your pipeline silently fails or produces wrong
        results. A column named "revenue" becomes "total_revenue" and suddenly all your dashboards
        show zero without any error. A new required column appears as NULL across all rows.
        Detect schema changes automatically before they reach production.
      </AlertBox>

      <CodeBlock language="python" filename="Schema Validation with Great Expectations">
{`import great_expectations as gx

context = gx.get_context()

# Define comprehensive expectations for your dataset
suite = context.add_expectation_suite("orders_suite")

validator = context.get_validator(
    batch_request=batch_request,
    expectation_suite_name="orders_suite"
)

# 1. Column existence (schema drift detection)
for col in ["order_id", "customer_id", "amount", "status", "created_at"]:
    validator.expect_column_to_exist(col)

# 2. Not-null constraints on critical fields
validator.expect_column_values_to_not_be_null("order_id")
validator.expect_column_values_to_not_be_null("amount")

# 3. Value range and type constraints
validator.expect_column_values_to_be_between("amount", min_value=0, max_value=1_000_000)
validator.expect_column_values_to_be_in_set(
    "status", {"pending", "processing", "shipped", "delivered", "cancelled"}
)
validator.expect_column_values_to_match_regex("order_id", r"^ORD-\\d{8}$")

# 4. Uniqueness
validator.expect_column_values_to_be_unique("order_id")

# 5. Row count sanity check (catches truncated loads)
validator.expect_table_row_count_to_be_between(min_value=1000, max_value=10_000_000)

# 6. Freshness check (data must be recent)
validator.expect_column_max_to_be_between(
    "created_at",
    min_value="2026-01-01",  # must have recent data
)

# Run validation — pipeline fails if expectations not met
results = validator.validate()
if not results["success"]:
    failed = [r for r in results.results if not r.success]
    raise ValueError(f"Data quality failures:\\n" +
                     "\\n".join(f"  - {r.expectation_config.expectation_type}: {r.result}"
                               for r in failed))`}
      </CodeBlock>

      <SectionHeader number={6} title="Issue 5 — Referential Integrity Violations" />
      <CompareTable
        leftLabel="Detection Query"
        rightLabel="What It Catches"
        rows={[
          { label: 'Orphaned FK rows', left: 'LEFT JOIN + WHERE parent.id IS NULL', right: 'Orders with customer_id that has no matching record in customers table' },
          { label: 'Stale lookup codes', left: 'JOIN on lookup table + date range filter', right: 'Transactions using product codes that were deleted or expired' },
          { label: 'Cross-table total mismatch', left: 'SUM comparison: orders vs order_items', right: 'Order total != sum of its line items (rounding error or missing items)' },
          { label: 'Cascade delete gaps', left: 'Count child records for deleted parents', right: 'Invoice line items remaining after invoice was deleted' },
        ]}
      />

      <SectionHeader number={7} title="Data Quality Monitoring in Production" />
      <VerticalSteps steps={[
        { title: 'Instrument your pipelines with quality checks at every stage', desc: 'Add validation at 3 points: (1) source validation — check raw ingested data immediately on arrival, (2) transformation validation — check after major dbt models or Spark transforms, (3) pre-load validation — check before writing to production tables. Catching issues early makes root cause analysis 10x easier.' },
        { title: 'Build a data quality scorecard with SLAs', desc: 'Define acceptable thresholds per column and table: NULL rate < 1% for critical fields, freshness within 2 hours, duplicate rate < 0.01%. Track these over time as a dashboard visible to data consumers. Share the scorecard — it aligns stakeholders on what "good" means.' },
        { title: 'Alert on anomalies, not just failures', desc: 'Statistical anomaly detection (Z-score, IQR) catches gradual drift that rule-based checks miss: slowly increasing NULL rates, gradual record count decrease, or subtle distribution shifts in numeric columns. Tools: Monte Carlo, Bigeye, Metaplane, or custom Great Expectations expectations.' },
        { title: 'Make data quality a CI/CD gate', desc: 'Add quality checks to your dbt CI pipeline: dbt test runs on every PR. Great Expectations checkpoint runs in the nightly Airflow DAG. If checks fail, the pipeline stops and alerts fire before bad data reaches production tables or dashboards.' },
        { title: 'Establish data ownership and a remediation process', desc: 'Every table needs a documented owner. When quality checks fail, the alert goes to the owner with context: which check failed, which rows are affected, and a link to the Great Expectations failure report. Define SLAs for remediation (critical: 4 hours, non-critical: 24 hours).' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'When should data quality checks run in a pipeline?',
          answer: 'Source validation (check raw data on ingestion — before any transforms), transformation validation (check after major dbt models or Spark transformations), and pre-load validation (check immediately before writing to production tables). Running checks at all three stages catches issues early and makes root cause analysis significantly easier — you know exactly which stage introduced the problem.',
        },
        {
          question: 'What is the difference between data quality and data governance?',
          answer: 'Data quality = the technical state of your data (completeness, accuracy, validity, freshness). Data governance = the organizational processes, policies, ownership, and accountability that ensure data quality is maintained over time. You need both — great tooling without governance leads to quality decay because no one owns fixing issues. Great governance without tooling means you\'re doing quality checks manually in spreadsheets.',
        },
        {
          question: 'How do I prioritize which data quality issues to fix first?',
          answer: 'Prioritize by business impact × frequency × detectability. Issues that affect revenue-critical reports (wrong order totals, missing transactions) come first regardless of frequency. Issues in rarely-used reports with no business decisions attached can wait. Build a data quality scorecard shared with data consumers and let business stakeholders help prioritize — they know which metrics drive decisions.',
        },
        {
          question: 'What tools should data engineers use for data quality?',
          answer: 'Great Expectations (open source, Python, rule-based): best for comprehensive column-level validation. dbt tests (if already using dbt): native, easy to add alongside transformations. Soda Core (YAML-based, cloud-friendly): good for teams that prefer configuration over code. Monte Carlo / Bigeye (commercial): automated anomaly detection without writing rules. For most teams, dbt tests + Great Expectations covers 90% of needs at zero licensing cost.',
        },
        {
          question: 'How do I handle schema drift in streaming pipelines?',
          answer: 'For Kafka-based pipelines: use Schema Registry (Confluent or AWS Glue) to enforce schema compatibility rules — BACKWARD (new schema can read old data), FORWARD (old schema can read new data), or FULL. Breaking schema changes require a new topic version. For batch pipelines: compare incoming schema against a stored reference schema before processing. Tools like Apache Avro and Protobuf with schema evolution rules handle this automatically.',
        },
        {
          question: 'What is dbt testing and how does it help data quality?',
          answer: 'dbt (data build tool) has built-in test types that run after each model is built: not_null (no NULLs in a column), unique (no duplicate values), accepted_values (values are in a specified list), relationships (referential integrity between models). You define tests in YAML alongside your SQL models. dbt test runs all tests and reports failures, making data quality a first-class concern in your transformation layer rather than an afterthought.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
