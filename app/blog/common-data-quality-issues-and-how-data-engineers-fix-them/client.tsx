'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function CommonDataQualityIssuesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Common Data Quality Issues — and How Data Engineers Fix Them</h1>
      <p className="lead">
        Bad data breaks pipelines, corrupts analytics, and causes wrong business decisions.
        Data engineers spend 60-80% of their time cleaning and validating data. This guide covers
        the most common data quality problems, how to detect them, and proven fixes with code examples.
      </p>

      <StatGrid stats={[
        { value: '80%', label: 'of data work is cleaning and preparation', color: 'amber' },
        { value: '$12.9M', label: 'average annual cost of bad data per organization (Gartner)', color: 'red' },
        { value: '6 types', label: 'of data quality dimensions to track', color: 'blue' },
        { value: 'Great Expectations', label: 'top open-source data quality framework', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The 6 Dimensions of Data Quality" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Completeness', description: 'Are all required fields present? Is the dataset missing rows? NULL values in critical columns indicate completeness failures.' },
        { title: 'Accuracy', description: 'Does the data reflect reality? Wrong values, typos, unit errors, and stale data all reduce accuracy.' },
        { title: 'Consistency', description: 'Is the same entity represented the same way everywhere? Customer "John Smith" vs "J. Smith" vs "john smith" in different tables.' },
        { title: 'Timeliness', description: 'Is the data current enough for its intended use? Yesterday\'s inventory data is useless for real-time pricing.' },
        { title: 'Validity', description: 'Does the data conform to expected formats and ranges? Birthdate of "1800-01-01" or zip code "99999" signal validity issues.' },
        { title: 'Uniqueness', description: 'Are records duplicated? Duplicate customers or orders inflate metrics and distort analytics.' },
      ]} />

      <SectionHeader number={2} title="Issue 1 — NULL and Missing Values" />
      <ErrorFix
        bad={`-- Hidden NULLs cause silent calculation errors
SELECT
    user_id,
    AVG(purchase_amount) as avg_spend  -- NULL rows are excluded silently
FROM purchases
GROUP BY user_id`}
        good={`-- Detect missing values first
SELECT
    COUNT(*) as total_rows,
    COUNT(purchase_amount) as non_null_count,
    COUNT(*) - COUNT(purchase_amount) as null_count,
    ROUND(100.0 * (COUNT(*) - COUNT(purchase_amount)) / COUNT(*), 2) as null_pct
FROM purchases;

-- Handle nulls explicitly
SELECT
    user_id,
    AVG(COALESCE(purchase_amount, 0)) as avg_spend,
    COUNT(*) as total_rows,
    COUNT(purchase_amount) as valid_rows
FROM purchases
GROUP BY user_id`}
        badLabel="Implicit NULL handling"
        goodLabel="Explicit NULL detection and handling"
      />

      <SectionHeader number={3} title="Issue 2 — Duplicate Records" />
      <CodeBlock language="python" filename="Duplicate Detection with Pandas">
{`import pandas as pd

df = pd.read_csv('customers.csv')

# Detect duplicates
print(f"Total rows: {len(df)}")
print(f"Duplicate rows: {df.duplicated().sum()}")

# Find which columns define uniqueness
exact_dupes = df.duplicated()
key_dupes = df.duplicated(subset=['email'])  # Email should be unique

print(f"Exact duplicates: {exact_dupes.sum()}")
print(f"Email duplicates: {key_dupes.sum()}")

# Show duplicate examples
print(df[df.duplicated(subset=['email'], keep=False)].sort_values('email').head(10))

# Fix: keep most recent record per email
df_clean = (df.sort_values('created_at', ascending=False)
              .drop_duplicates(subset=['email'], keep='first')
              .reset_index(drop=True))

print(f"After dedup: {len(df_clean)} rows")`}
      </CodeBlock>

      <SectionHeader number={4} title="Issue 3 — Inconsistent Formats" />
      <ErrorFix
        bad={`# Same data, multiple formats — analytics nightmare
dates = ['2024-01-15', '01/15/2024', '15-Jan-2024', 'January 15, 2024']
phones = ['+1-555-123-4567', '5551234567', '(555) 123-4567', '555.123.4567']
states = ['CA', 'California', 'ca', 'CALIFORNIA']`}
        good={`import re
from datetime import datetime

def normalize_date(date_str: str) -> str:
    """Normalize various date formats to ISO 8601"""
    formats = ['%Y-%m-%d', '%m/%d/%Y', '%d-%b-%Y', '%B %d, %Y']
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime('%Y-%m-%d')
        except ValueError:
            continue
    raise ValueError(f"Cannot parse date: {date_str}")

def normalize_phone(phone: str) -> str:
    """Normalize to +1XXXXXXXXXX format"""
    digits = re.sub(r'\\D', '', phone)
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits[0] == '1':
        return f"+{digits}"
    raise ValueError(f"Invalid phone: {phone}")

def normalize_state(state: str) -> str:
    STATE_MAP = {'california': 'CA', 'new york': 'NY', ...}
    s = state.strip().lower()
    if len(s) == 2:
        return s.upper()
    return STATE_MAP.get(s, state)`}
        badLabel="Multiple inconsistent formats"
        goodLabel="Normalization functions"
      />

      <SectionHeader number={5} title="Issue 4 — Schema Drift" />
      <AlertBox type="error" title="Schema drift silently breaks pipelines">
        When upstream teams add, rename, or remove columns, your pipeline silently fails or produces wrong
        results. A column named "revenue" becomes "total_revenue" and suddenly all your dashboards
        show zero without any error.
      </AlertBox>

      <CodeBlock language="python" filename="Schema Validation with Great Expectations">
{`import great_expectations as gx

context = gx.get_context()
datasource = context.sources.add_pandas("my_datasource")

# Define expectations for your dataset
suite = context.add_expectation_suite("orders_suite")

validator = context.get_validator(
    batch_request=batch_request,
    expectation_suite_name="orders_suite"
)

# Column existence
validator.expect_column_to_exist("order_id")
validator.expect_column_to_exist("customer_id")
validator.expect_column_to_exist("amount")

# Value constraints
validator.expect_column_values_to_not_be_null("order_id")
validator.expect_column_values_to_be_between("amount", min_value=0)
validator.expect_column_values_to_match_regex("order_id", r"^ORD-\\d{8}$")

# Uniqueness
validator.expect_column_values_to_be_unique("order_id")

# Run validation — fails pipeline if expectations not met
results = validator.validate()
if not results["success"]:
    raise ValueError(f"Data quality check failed: {results}")`}
      </CodeBlock>

      <SectionHeader number={6} title="Issue 5 — Referential Integrity Violations" />
      <CompareTable
        leftLabel="Detection Query"
        rightLabel="What It Catches"
        rows={[
          { label: 'Orphaned FK rows', left: 'LEFT JOIN + WHERE IS NULL', right: 'Orders without valid customer_id in customers table' },
          { label: 'Stale lookups', left: 'JOIN on code tables + date range', right: 'Transactions using deleted product codes' },
          { label: 'Cross-table inconsistency', left: 'SUM comparison across tables', right: 'Order total ≠ sum of line items' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'When should data quality checks run in a pipeline?',
          answer: 'Source validation (check raw data on ingestion), transformation validation (check after major transforms), and pre-load validation (check before writing to production tables). Running checks at all three stages catches issues early and makes root cause analysis easier.',
        },
        {
          question: 'What is the difference between data quality and data governance?',
          answer: 'Data quality = the technical state of your data (completeness, accuracy, validity). Data governance = the organizational processes, policies, and ownership that ensure data quality is maintained over time. You need both — great tooling without governance ownership leads to quality decay.',
        },
        {
          question: 'How do I prioritize which data quality issues to fix first?',
          answer: 'Prioritize by business impact × frequency. Issues that affect revenue-critical reports (wrong totals, missing transactions) come first. Issues in rarely-used reports can wait. Build a data quality scorecard and share it with data consumers to align priorities.',
        },
        {
          question: 'What tools should data engineers use for data quality?',
          answer: 'Great Expectations (open source, Python, rule-based expectations), dbt tests (if already using dbt for transformations), Soda Core (YAML-based, cloud-friendly), and Monte Carlo / Bigeye (commercial, automated anomaly detection). For most teams, dbt tests + Great Expectations covers 90% of needs.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
