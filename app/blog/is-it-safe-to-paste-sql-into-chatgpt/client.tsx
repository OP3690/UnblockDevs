'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function IsItSafeToPasteSqlIntoChatgptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Is It Safe to Paste SQL Queries Into ChatGPT? What You Need to Know</h1>
      <p className="lead">
        Pasting SQL into ChatGPT for help is extremely common — developers do it for debugging queries,
        learning SQL patterns, and getting help with complex JOINs. Whether it's safe depends entirely
        on what your SQL contains and which ChatGPT plan you're using. Schema with table names? Usually fine.
        Queries with real customer data? Potentially risky and possibly a compliance violation.
        This guide explains the exact risks and the right ways to use AI for SQL work without
        exposing sensitive business data.
      </p>

      <StatGrid stats={[
        { value: 'Schema OK', label: 'pasting CREATE TABLE statements is generally safe', color: 'green' },
        { value: 'Data risky', label: 'queries with real customer data should always be masked', color: 'red' },
        { value: 'OpenAI API', label: 'does not use prompts for model training by default', color: 'amber' },
        { value: 'Enterprise', label: 'ChatGPT Enterprise disables training data use entirely', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Understanding the Real Risks" />
      <p>
        There are three distinct risk categories when pasting SQL into ChatGPT. Understanding which
        category your query falls into determines what precautions you need to take. These categories
        apply whether you're using ChatGPT, Claude, Gemini, or any other AI assistant.
      </p>
      <QuickFact color="blue" label="Three risk tiers for SQL content">
        (1) Schema structure alone: low risk — table names and column types don't usually expose sensitive data.
        (2) Schema with business-sensitive names: medium risk — column names like churn_risk_score or revenue_target
        reveal competitive intelligence.
        (3) Queries with real data values: high risk — customer emails, financial figures, and health data
        trigger GDPR and HIPAA concerns and represent a compliance violation in most enterprise environments.
      </QuickFact>
      <KeyPointsGrid items={[
        { title: 'What\'s generally safe to share', description: 'Generic or anonymized schema (tables named users, products, orders with standard column names), structural query patterns (JOINs, GROUP BY, window functions, aggregates), syntax debugging with no real data values, questions about SQL best practices and performance optimization, and queries using clearly fake sample data.' },
        { title: 'What carries medium risk', description: 'Business-specific table and column names that reveal your data model architecture, proprietary scoring columns (churn_risk_score, lifetime_value, fraud_probability), and table structures that reflect competitive business logic. This information, while not PII, could be valuable to a competitor.' },
        { title: 'What carries high risk', description: 'Queries containing actual customer data (WHERE email = \'real@customer.com\'), financial figures in WHERE or HAVING clauses, health information (HIPAA-regulated PHI), HR data like salary or performance records, authentication data, and any personally identifiable information (PII) as defined under GDPR.' },
        { title: 'Regulatory exposure by industry', description: 'Healthcare organizations: HIPAA applies to any PHI in queries. Financial services: GLBA, PCI-DSS. EU-based companies or those serving EU citizens: GDPR Article 28 requires DPAs with data processors. Most casual ChatGPT use doesn\'t have these agreements in place, making sharing regulated data a potential violation.' },
      ]} />

      <SectionHeader number={2} title="OpenAI's Data Policy — What Actually Happens to Your Query" />
      <p>
        Understanding exactly what OpenAI does with your ChatGPT conversations is essential for making
        informed decisions about what to share. The policy differs significantly across plans.
      </p>
      <CompareTable
        leftLabel="ChatGPT Free / Plus"
        rightLabel="ChatGPT Team / Enterprise"
        rows={[
          { label: 'Training use', left: 'May be used for training by default — opt out in Settings → Data Controls', right: 'Team: off by default. Enterprise: off, contractually committed' },
          { label: 'Human review', left: 'Conversations may be reviewed by OpenAI staff for safety', right: 'Enterprise: contractually limited review for safety only' },
          { label: 'Data storage', left: 'Stored on OpenAI servers, accessible to OpenAI', right: 'Stored with enterprise-grade security, SSO support' },
          { label: 'DPA available', left: 'No formal Data Processing Agreement for free/Plus', right: 'Enterprise: DPA provided — required for GDPR compliance' },
          { label: 'BAA available', left: 'No BAA — cannot be used with HIPAA-regulated PHI', right: 'No BAA on any ChatGPT plan — avoid PHI on all tiers' },
          { label: 'Suitable for sensitive SQL', left: 'Only with full anonymization of schema and data', right: 'Enterprise: suitable for business schemas with DPA' },
        ]}
      />
      <KeyPointsGrid items={[
        { title: 'ChatGPT Free and Plus plans', description: 'By default, conversations are sent to OpenAI\'s servers, stored, and may be reviewed by human trainers and used to train future models. You can opt out: Settings → Data Controls → turn off "Improve the model for everyone." This stops training use but data still goes to OpenAI\'s servers and may be reviewed for safety policy compliance.' },
        { title: 'ChatGPT Team plan', description: 'Training is disabled by default for all workspaces on the Team plan. Conversations are not used for model training. Data still goes to OpenAI\'s servers, and OpenAI may review conversations for safety purposes. No formal DPA is provided for the Team plan — verify with your legal team before sharing EU citizen data.' },
        { title: 'ChatGPT Enterprise plan', description: 'Training is disabled. OpenAI provides a contractual commitment not to use conversations for training and offers a Data Processing Agreement (DPA) for GDPR compliance. Enterprise-grade security, SSO, and advanced admin controls. This is the appropriate tier for enterprise SQL work with sensitive business schemas.' },
        { title: 'OpenAI API (direct)', description: 'API queries are not used for training by default. If you\'re using the API through your own application rather than chatgpt.com, training use is off by default. This is an important distinction if your company accesses ChatGPT through a company portal built on the API — check with your infrastructure team which endpoint it uses.' },
      ]} />

      <SectionHeader number={3} title="How to Safely Use AI for SQL Help" />
      <p>
        Even with sensitive schemas, you can get effective SQL assistance from AI by anonymizing
        the parts that matter while preserving the structure that the AI needs to help you.
        Anonymization preserves 100% of the query's logical structure while removing the sensitive
        identifiers that create regulatory and competitive risk.
      </p>
      <CodeBlock language="sql" filename="sql_anonymization_example.sql">
{`-- BEFORE (risky — reveals business logic and real customer values):
SELECT
    u.customer_id,
    u.churn_risk_score,
    u.annual_recurring_revenue,
    COUNT(o.order_id) AS order_count,
    MAX(o.created_at) AS last_order_date
FROM customers u
LEFT JOIN subscription_orders o
    ON u.customer_id = o.customer_id
    AND o.status = 'completed'
WHERE u.churn_risk_score > 0.7
    AND u.email = 'alice@realcompany.com'
    AND u.contract_end_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY u.customer_id, u.churn_risk_score, u.annual_recurring_revenue
HAVING COUNT(o.order_id) < 3
ORDER BY u.churn_risk_score DESC;

-- AFTER (safe — anonymized but structurally identical):
SELECT
    u.user_id,
    u.score_a,
    u.metric_b,
    COUNT(o.item_id) AS count_c,
    MAX(o.created_at) AS latest_date
FROM table_a u
LEFT JOIN table_b o
    ON u.user_id = o.user_id
    AND o.status = 'completed'
WHERE u.score_a > 0.7
    AND u.identifier = 'example@example.com'
    AND u.date_field BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY u.user_id, u.score_a, u.metric_b
HAVING COUNT(o.item_id) < 3
ORDER BY u.score_a DESC;

-- The AI helps with the query logic, JOINs, and optimization.
-- You substitute your real names back afterward.`}
      </CodeBlock>

      <KeyPointsGrid items={[
        { title: 'Anonymize column and table names', description: 'Replace sensitive names with generic placeholders. churn_risk_score → score_a, customers → table_a, annual_recurring_revenue → metric_b. The AI helps with query logic; you substitute real names back afterward. This preserves the full query structure that the AI needs without revealing your data architecture.' },
        { title: 'Ask about patterns, not data', description: '"How do I write a window function to calculate running totals?" is completely safe and gets you the same help. "Given these 1,000 customer rows from our production database..." is risky and unnecessary. Ask about SQL patterns using made-up or simplified examples — the structural answer applies to your real schema.' },
        { title: 'Disable model training opt-in', description: 'ChatGPT Free/Plus: Settings → Data Controls → turn off "Improve the model for everyone." This prevents training use of your conversations but does not prevent data transmission to OpenAI\'s servers. It\'s an important step but not a substitute for anonymization when handling regulated data.' },
        { title: 'Use local AI models for sensitive work', description: 'Ollama + SQLCoder or Code Llama runs entirely on your local machine. Your queries never leave your network. This is the right solution for enterprise environments where data cannot leave the company network. SQLCoder is specifically trained for text-to-SQL and produces highly accurate queries for complex schemas.' },
      ]} />

      <CodeBlock language="bash" filename="local_sqlcoder_setup.sh">
{`# Run SQLCoder locally with Ollama — zero data leaves your machine
# All inference happens on your local GPU or CPU

# Step 1: Install Ollama (Mac/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Step 2: Pull the SQLCoder model (fine-tuned for SQL generation)
ollama pull sqlcoder:7b
# Or the larger, more capable version:
ollama pull sqlcoder:15b

# Step 3: Use SQLCoder for schema-aware SQL generation
ollama run sqlcoder:7b

# Example prompt to SQLCoder:
# "Given this schema:
# CREATE TABLE orders (id INT, customer_id INT, amount DECIMAL, status VARCHAR);
# CREATE TABLE customers (id INT, email VARCHAR, tier VARCHAR);
# Write a query to find customers with more than 5 orders in the last 30 days."

# SQLCoder generates accurate SQL with no data leaving your network
# Ideal for: enterprise environments, healthcare data, financial data`}
      </CodeBlock>

      <SectionHeader number={4} title="Company Policy and Compliance Considerations" />
      <VerticalSteps steps={[
        { title: 'Check your company\'s AI usage policy first', desc: 'Most enterprise security policies prohibit pasting proprietary database schemas or queries containing PII into external AI services. Violations can result in disciplinary action or regulatory penalties. Review your acceptable use policy before using any AI assistant for work SQL. When in doubt, ask your security or legal team.' },
        { title: 'Check for existing enterprise agreements', desc: 'Your company may already have a ChatGPT Enterprise license with appropriate data processing agreements in place. Check with your IT or security team before assuming you must use the public plan. Many large organizations have negotiated enterprise AI access — use the compliant channel rather than your personal account.' },
        { title: 'Understand GDPR Article 28 requirements', desc: 'EU GDPR Article 28 requires a Data Processing Agreement (DPA) when transferring personal data to a third-party processor. OpenAI provides DPAs for Enterprise customers. Without one, sharing EU citizen personal data (names, emails, IP addresses, user IDs) with OpenAI through free or Plus plans may violate GDPR and expose your organization to fines of up to 4% of global annual revenue.' },
        { title: 'Understand HIPAA Business Associate Agreement requirements', desc: 'PHI (Protected Health Information) cannot be shared with vendors without a Business Associate Agreement (BAA). OpenAI does not currently offer BAAs for any ChatGPT tier, including Enterprise. This makes ChatGPT unsuitable for SQL work involving patient records, medical history, or any HIPAA-regulated data. Use air-gapped local models or HIPAA-compliant healthcare AI platforms instead.' },
        { title: 'Document your AI usage for audit trails', desc: 'Some compliance frameworks (SOC 2, ISO 27001) require organizations to document what AI tools are used, for what purposes, and what data is shared. Maintain records of which AI tools your team uses for code and query assistance, particularly if you handle regulated data. This documentation protects the organization in case of audit.' },
      ]} />

      <AlertBox type="warning" title="GDPR and HIPAA compliance is non-negotiable">
        Under GDPR, sending EU citizens' personal data to OpenAI requires a signed Data Processing Agreement —
        which free and Plus plans don't provide. Under HIPAA, sending any PHI to AI services without a
        Business Associate Agreement is a violation that can result in significant fines. When in doubt:
        anonymize before sending, use the enterprise tier with a DPA, or use a local model that never
        transmits data externally. The convenience of AI SQL assistance is not worth a regulatory fine.
      </AlertBox>

      <SectionHeader number={5} title="AI Tools Comparison for SQL Work" />
      <CompareTable
        leftLabel="ChatGPT Free / Plus"
        rightLabel="Local SQLCoder (Ollama)"
        rows={[
          { label: 'Data leaves your network', left: 'Yes — all queries sent to OpenAI servers', right: 'No — 100% local inference' },
          { label: 'Training use', left: 'Possible on free/Plus unless opted out', right: 'None — no external service involved' },
          { label: 'SQL accuracy', left: 'Very high — GPT-4 excellent at complex SQL', right: 'Very high — SQLCoder fine-tuned specifically for SQL' },
          { label: 'Schema context', left: 'Excellent — handles large schema definitions', right: 'Good — context window varies by model size' },
          { label: 'Setup required', left: 'None — browser or API access', right: 'Moderate — Ollama installation, model download' },
          { label: 'Cost', left: 'Free tier or $20/mo Plus; Enterprise: contact sales', right: 'Free — open source, runs on your hardware' },
          { label: 'GDPR / HIPAA suitable', left: 'Only Enterprise tier with DPA; never for PHI', right: 'Yes — no data leaves your environment' },
          { label: 'Best for', left: 'Anonymized schema work, SQL learning, pattern questions', right: 'Sensitive production schemas, regulated data environments' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Does ChatGPT see my database contents when I paste queries?',
          answer: 'ChatGPT only sees what you explicitly paste into the conversation. It has no connection to your database and cannot query it directly. If you paste a SELECT query with no result data, ChatGPT only sees the query structure and schema information in the query. If you paste query results (you copied output from your database client), that actual data is sent to OpenAI\'s servers. Never paste actual query output if it contains customer or sensitive data.',
        },
        {
          question: 'Is GitHub Copilot safer than ChatGPT for SQL?',
          answer: 'GitHub Copilot Enterprise has stronger privacy guarantees than ChatGPT Free/Plus — prompts and suggestions are not used for training for Enterprise customers. Copilot also operates within your IDE context which gives it more relevant suggestions for your specific codebase. However, your schema and code context is still sent to GitHub\'s (Microsoft\'s) servers for inference. Local models like SQLCoder running through Ollama are the only option where no data leaves your machine.',
        },
        {
          question: 'What is SQLCoder and how does it compare to ChatGPT for SQL?',
          answer: 'SQLCoder is an open-source LLM specifically fine-tuned for SQL generation, created by Defog.ai. It runs locally through Ollama. For SQL generation tasks (given a schema, write a query), SQLCoder rivals GPT-4\'s accuracy while keeping all data on your machine. It\'s less conversational than ChatGPT — optimized for "given this schema, write this query" tasks rather than open-ended SQL learning discussions. This makes it ideal for enterprise environments where sensitive schemas cannot leave the corporate network.',
        },
        {
          question: 'What SQL-related information is actually dangerous to share?',
          answer: 'Highest risk: actual data values (real email addresses, names, financial numbers, health data in query results). High risk: business-specific column names that reveal competitive strategy (pricing models, churn prediction scores, fraud models). Medium risk: table names and relationships that reveal your data architecture to a competitor. Low risk: generic structural SQL (JOIN types, GROUP BY patterns, window functions). Safest rule: paste SQL patterns with made-up placeholder data, not queries from your actual production systems.',
        },
        {
          question: 'Can I use ChatGPT to help with SQL if I anonymize the data?',
          answer: 'Yes — anonymization is the recommended approach for free and Plus plans. Replace actual column names with generic labels (churn_risk_score → col_a), use placeholder data values (real customer ID → 12345), and use generic table names (customers → table_a). The AI still helps with query logic, joins, window functions, and optimization. After getting the help you need, substitute your real column and table names back into the query.',
        },
        {
          question: 'Are there AI tools specifically designed for safe enterprise SQL work?',
          answer: 'Yes. Defog.ai (SQLCoder\'s creator) offers an enterprise version with on-premises deployment and enterprise data privacy controls. DataRobot and various enterprise BI platforms offer AI SQL assistance with built-in data privacy controls. Many companies run local models (Ollama + SQLCoder or Code Llama) on their own infrastructure behind the corporate firewall. For general coding assistance in a compliant way, GitHub Copilot Enterprise is a common choice with appropriate data handling agreements.',
        },
        {
          question: 'What should I do if I accidentally pasted sensitive customer data into ChatGPT?',
          answer: 'Act immediately: (1) Delete the conversation in ChatGPT — this removes the chat from your history and signals to OpenAI not to use it for training, though it may not remove data from server-side logs. (2) Turn off model training in Settings → Data Controls if you haven\'t already. (3) Contact OpenAI Support and request data deletion for the specific conversation. (4) Notify your security team — a privacy incident report may be required under GDPR (72-hour notification to supervisory authority if EU citizen data is involved) or your internal compliance policy. (5) Review what was in the query and assess regulatory notification requirements.',
        },
        {
          question: 'Does the opt-out setting in ChatGPT fully protect my SQL data?',
          answer: 'No — the "Improve the model for everyone" opt-out in Settings → Data Controls stops your conversations from being used for model training, but your data still goes to OpenAI\'s servers for inference and may be stored and reviewed for safety policy compliance. The opt-out is useful and worth enabling, but it is not a substitute for anonymizing sensitive data before sharing. For true data isolation, use the OpenAI API with ZDR (Zero Data Retention) agreements or run a local model entirely on your infrastructure.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
