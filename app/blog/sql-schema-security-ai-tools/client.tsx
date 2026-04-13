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
} from '@/components/blog/BlogVisuals';

export default function SqlSchemaSecurityAiToolsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>SQL Schema Security — Why You Should Never Paste Production Database Names into AI Tools</h1>
      <p className="lead">
        Every time a developer pastes a real SQL query into ChatGPT, GitHub Copilot, or Claude,
        they hand a third-party AI system a detailed blueprint of their database architecture. Table
        names, column names, schema prefixes, and the values in <code>IN</code> clauses all reveal
        sensitive business logic, compliance-relevant data structures, and competitive intelligence.
        This post breaks down exactly what the risks are — and why schema masking is the only
        engineering-grade solution.
      </p>

      <StatGrid stats={[
        { value: 'GDPR', label: 'Art. 4(1): column names describing personal data are themselves personal data metadata', color: 'violet' },
        { value: 'HIPAA', label: '§164.514(b): database field names describing PHI may qualify as protected information', color: 'blue' },
        { value: 'SOC 2', label: 'CC6.1: all external data processors must be inventoried and controlled — AI tools included', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What You Actually Expose When You Paste SQL into an AI" />
      <p>
        Developers typically think of SQL security in terms of data — you wouldn't paste a CSV of
        customer records into ChatGPT. But schema names are different. They feel abstract. They are
        not data, they are metadata. This distinction is exactly why schema exposure is so
        consistently overlooked, and why it is so valuable to an attacker.
      </p>

      <CodeBlock lang="sql" title="An ordinary-looking query — loaded with intelligence">
{`SELECT
  c.customer_uuid,
  c.email,
  c.lifetime_value_usd,
  c.churn_risk_score,
  c.acquisition_channel,
  s.subscription_tier,
  s.mrr_cents,
  s.trial_converted_at,
  s.cancellation_reason
FROM crm.high_value_customers c
JOIN billing.subscriptions s ON s.customer_id = c.customer_uuid
WHERE c.churn_risk_score > 0.75
  AND s.subscription_tier IN ('ENTERPRISE', 'PRO_PLUS')
  AND s.mrr_cents > 100000
ORDER BY c.lifetime_value_usd DESC
LIMIT 50;`}
      </CodeBlock>

      <p>
        This single query tells an external system: your CRM schema has a{' '}
        <code>high_value_customers</code> table; you track <code>churn_risk_score</code> (meaning
        you have a churn prediction model); your subscription tiers are <code>ENTERPRISE</code> and{' '}
        <code>PRO_PLUS</code>; you store MRR in cents; you track <code>trial_converted_at</code>{' '}
        (free trials exist); and <code>cancellation_reason</code> is recorded. That is product
        architecture, pricing intelligence, and customer data model — extracted from one query.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Schema names reveal product architecture',
          description:
            'Table names like high_value_customers, churn_risk_score, trial_converted_at, and acquisition_channel are architectural decisions that reflect your product strategy. A competitor who sees these names understands how you model your business.',
        },
        {
          title: 'Column names reveal data collection practices',
          description:
            "Columns like ssn_last4, patient_diagnosis_code, credit_card_bin, or annual_salary_usd tell regulators and adversaries exactly what personal data your system collects — even if no actual data values are shared.",
        },
        {
          title: 'IN clause values reveal internal taxonomies',
          description:
            "Values like 'ENTERPRISE', 'HIGH_RISK', 'EXEC', 'SUSPENDED', 'FRAUD_REVIEW' inside IN clauses expose your internal classification systems. These business rules are often more sensitive than the schema itself.",
        },
        {
          title: 'Schema prefixes reveal system boundaries',
          description:
            'Schema prefixes like crm., billing., hr., analytics., compliance. map your system architecture. An attacker learns which business domains exist, how they are separated, and potentially which systems talk to each other.',
        },
      ]} />

      <SectionHeader number={2} title="The AI Training Data Problem" />
      <p>
        AI providers handle prompt data differently depending on subscription tier, API vs. consumer
        product, and their current data retention policies. The risk is not that ChatGPT will
        directly output your table names to a competitor. The risk is more subtle — and more
        durable.
      </p>

      <AlertBox type="warning" title="What AI providers say about training data">
        Most consumer-tier AI products (ChatGPT free, ChatGPT Plus without opt-out, some Copilot
        configurations) reserve the right to use conversation data for model improvement. Enterprise
        tiers typically offer opt-out. But "opt-out" means your prompts before opt-out may already
        be in training pipelines. Model retraining happens on a cycle — today's prompt may appear
        in next quarter's model weights.
      </AlertBox>

      <p>
        The specific risk from schema exposure via training data is not that the AI will verbatim
        reproduce your table names. It is that your schema vocabulary subtly shifts the model's
        probability distributions for code completion in relevant domains. If enough developers in
        your industry paste similar schema patterns, those patterns become statistically
        over-represented in completions — making your specific naming conventions inferrable from AI
        suggestions.
      </p>

      <QuickFact color="violet" label="API access does not automatically mean no training">
        Many developers assume that using the OpenAI API (vs. ChatGPT.com) means prompts are never
        used for training. This was true under older policies but has changed. Always check the
        current data usage policy for your specific subscription tier and enable zero-data-retention
        if available. When in doubt, mask your schema before sending anything.
      </QuickFact>

      <SectionHeader number={3} title="Compliance Exposure: GDPR, HIPAA, SOC 2, PCI-DSS" />
      <p>
        Schema names describing personal data are not legally neutral. Multiple major compliance
        frameworks treat metadata about personal data as itself requiring protection.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'GDPR — Article 4(1) and Article 25',
          description:
            "GDPR defines personal data as 'any information relating to an identified or identifiable natural person.' Column names like email, date_of_birth, home_address, national_id, and health_condition describe personal data fields. Under data protection by design (Art. 25), the architecture that processes personal data must itself be protected. Sending schema names to an uncontracted AI processor without a Data Processing Agreement may violate GDPR.",
        },
        {
          title: 'HIPAA — §164.514(b) Safe Harbor',
          description:
            "HIPAA's Safe Harbor de-identification standard lists 18 specific identifiers that must be removed. But column names like patient_mrn, diagnosis_icd10, treatment_facility_id, or prescribing_physician_npi describe those identifiers — and are used in queries that access PHI. Sending these column names to a third-party AI system without a BAA (Business Associate Agreement) may create a reportable breach.",
        },
        {
          title: 'SOC 2 — CC6.1 Logical Access',
          description:
            'SOC 2 Type II requires that all external systems processing your data (or metadata about your data) are identified, inventoried, and subject to vendor risk assessment. AI tools used for SQL generation must appear in your vendor inventory. If developers are using personal AI accounts to generate SQL against production schemas, this creates an uncontrolled data processor — a direct SOC 2 finding.',
        },
        {
          title: 'PCI-DSS — Requirement 3 and 12.8',
          description:
            'PCI-DSS Requirement 3 protects stored cardholder data. Column names like card_number_last4, card_bin, expiry_month, cvv_provided, or payment_token describe cardholder data fields. Requirement 12.8 requires managing third-party service provider relationships. AI tools that receive column names from payment tables must be managed as service providers or avoided entirely.',
        },
      ]} />

      <ErrorFix
        title="Compliance-safe vs. compliance-risky SQL workflow"
        bad={`-- RISKY: Real column names sent to AI (GDPR/HIPAA concern)
SELECT p.patient_mrn, p.date_of_birth, p.diagnosis_icd10,
       p.prescribing_physician_npi, p.treatment_facility_id
FROM ehr.patient_records p
WHERE p.insurance_type IN ('MEDICAID', 'MEDICARE')
  AND p.treatment_date >= '2024-01-01';`}
        good={`-- SAFE: Masked SQL sent to AI — no PHI metadata exposed
SELECT A_000001.C_000001, A_000001.C_000002, A_000001.C_000003,
       A_000001.C_000004, A_000001.C_000005
FROM S_000001.T_000001 A_000001
WHERE A_000001.C_000006 IN ('V_000001', 'V_000002')
  AND A_000001.C_000007 >= '2024-01-01';`}
        badLabel="PHI column names (patient_mrn, diagnosis_icd10) sent to AI — potential HIPAA exposure"
        goodLabel="Structurally identical — AI helps optimize query — zero PHI metadata transmitted"
      />

      <SectionHeader number={4} title="Competitive Intelligence Risk" />
      <p>
        Your database schema is a direct reflection of your competitive differentiation. Naming
        conventions, table relationships, and column granularity reveal how deeply you have thought
        about your domain — and what data you have that competitors may not.
      </p>

      <p>
        Consider what a competitor could infer from schema names alone:
      </p>

      <CodeBlock lang="text" title="Schema intelligence extraction — no data required">
{`Table: ml_features.churn_prediction_v3
  → You have at least 3 versions of a churn model
  → You invest heavily in churn prediction
  → Feature engineering is mature (dedicated schema)

Table: growth.experiment_assignments
  → You run A/B tests at scale
  → You have a growth team with experimentation infrastructure

Columns: acquisition_channel, referral_partner_id, ltv_segment
  → You track acquisition sources and partner attribution
  → You segment customers by lifetime value

IN values: 'AMBASSADOR', 'RESELLER', 'WHITE_LABEL'
  → You have a partner program with at least 3 tiers
  → White-label offering exists

This is competitive intelligence extracted from column names alone.
No data. No rows. Just schema.`}
      </CodeBlock>

      <QuickFact color="blue" label="Schema naming is intentional design — and therefore revealing">
        Senior engineers name tables and columns to reflect domain understanding. A{' '}
        <code>churn_risk_score</code> column implies a prediction pipeline. A{' '}
        <code>cohort_assignment</code> column implies experimentation infrastructure. A{' '}
        <code>fraud_review_queue</code> table implies fraud detection. Schema names are compressed
        representations of engineering investment — and they belong inside your network perimeter.
      </QuickFact>

      <SectionHeader number={5} title="Insider Threat and Audit Trail Gaps" />
      <p>
        When a developer pastes production schema into their personal AI account, several security
        controls simultaneously fail:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'DLP (Data Loss Prevention) bypass',
          description:
            'Most DLP systems monitor file transfers, email attachments, and clipboard events on managed endpoints. Typing or pasting schema names into a web browser AI interface typically bypasses DLP scanning entirely — especially on personal devices or via mobile.',
        },
        {
          title: 'Audit trail termination',
          description:
            'Your SIEM logs database queries. Your access control logs table-level permissions. But the moment schema information leaves via a personal AI account, it exits your audit trail. You have no record of what was shared, when, or with which AI system.',
        },
        {
          title: 'Offboarding risk',
          description:
            "When a developer leaves your company, you revoke their database credentials. You cannot revoke the schema information they submitted to an AI system using their personal account. That information exists in AI provider logs indefinitely — outside your control.",
        },
        {
          title: 'Shadow AI proliferation',
          description:
            "Without a schema masking policy, developers will use whatever AI tool is most convenient — personal accounts, browser extensions, VS Code plugins. Each creates an uncontrolled channel for schema exfiltration. Policy without tooling doesn't work.",
        },
      ]} />

      <AlertBox type="error" title="The 'it's just metadata' fallacy">
        Schema names are often dismissed as low-risk because they are not data values. This is
        incorrect. Under GDPR Article 4(1), metadata that identifies the structure of personal data
        processing is regulated. Under HIPAA, column names that describe PHI fields may require the
        same protections as the data itself. Under SOC 2, architectural information about data
        systems must be controlled. "It's just the table name" is not a defensible security
        position.
      </AlertBox>

      <SectionHeader number={6} title="The Schema Masking Solution" />
      <p>
        Schema masking solves the entire class of problems above without reducing the quality of AI
        SQL assistance. The approach: replace every real identifier with a numbered placeholder
        before sending anything to AI. The AI operates on query structure — not naming. It can
        optimize, refactor, migrate dialects, add CTEs, and suggest indexes just as accurately with{' '}
        <code>T_000001</code> as with <code>employee_records</code>.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Browser-only processing',
          description:
            'The AI Schema Masker at unblockdevs.com runs the entire masking and restore pipeline in a browser Web Worker. The mapping between real names and placeholders never leaves your device — it is never transmitted to any server, including unblockdevs.com.',
        },
        {
          title: 'Deterministic and reversible',
          description:
            'The DITE (Deterministic Identifier Transformation Engine) assigns consistent placeholders — the same real name always gets the same placeholder. Paste the AI response back to restore original names perfectly, including across CTEs, subqueries, and multi-table joins.',
        },
        {
          title: 'IN clause value masking',
          description:
            "Enable 'String values' masking to also replace IN clause values like 'ENTERPRISE', 'EXEC', 'FRAUD_REVIEW' with V_000001, V_000002. These internal taxonomies are fully restored after AI processing.",
        },
        {
          title: 'No compliance footprint',
          description:
            'Because masking runs entirely in your browser before any AI call, there is no data processing agreement needed with unblockdevs.com. The AI never sees your real schema. The tool creates zero compliance surface area.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Is schema exposure actually a compliance violation or just a risk?',
          answer: "It depends on your jurisdiction, the column names involved, and your existing data processing agreements. Column names describing personal data (email, patient_id, ssn_last4) may qualify as personal data metadata under GDPR. Sending PHI-related column names to an AI without a BAA may constitute a HIPAA breach. SOC 2 auditors will flag uncontrolled AI tool usage as a finding. The safest position is to treat schema names as requiring the same controls as the data they describe.",
        },
        {
          question: 'Does OpenAI / Anthropic use my prompts for training?',
          answer: "Consumer-tier ChatGPT (free and Plus without opt-out) can use conversations for training by default. Anthropic's consumer products have similar policies. Enterprise tiers and API access with zero-data-retention configured are the exceptions. Policies change — always verify your current subscription's data usage terms. Schema masking means you don't have to trust any provider's data handling for your most sensitive identifiers.",
        },
        {
          question: 'What about GitHub Copilot — it sees my whole codebase?',
          answer: 'GitHub Copilot context is handled differently from ChatGPT prompts — it is sent to GitHub/OpenAI infrastructure and subject to Copilot-specific data handling policies (which vary by tier). Migration SQL files, ORM model definitions, and schema migration files in your repo that Copilot context includes may all contain production table and column names. The same masking approach applies when using Copilot Chat for SQL work.',
        },
        {
          question: 'Can I use personal AI accounts for work SQL if I mask first?',
          answer: 'Schema masking significantly reduces the risk of using personal AI accounts for SQL work — the AI never sees real identifiers. However, your organization may still have policies requiring approved tools only. Check your employer\'s AI usage policy. Masking is a technical control; policy compliance is a separate requirement.',
        },
        {
          question: 'How do I implement schema masking as a team policy?',
          answer: "Define a policy: all SQL sent to any AI tool must be masked via a browser-based schema masker before transmission. Provide the tool link (unblockdevs.com/ai-schema-masker). Add it to your developer onboarding documentation. Include it in your SOC 2 vendor controls documentation as an approved workflow. Log it in your AI tool usage policy. The masker's browser-only architecture means no new vendor relationship is created.",
        },
        {
          question: 'What if we have an enterprise ChatGPT agreement with no training?',
          answer: "Enterprise agreements with zero-data-retention and no-training provisions reduce but don't eliminate risk. They don't cover: developers using personal accounts, other AI tools without enterprise agreements, or future policy changes. Schema masking provides defense in depth — it protects you regardless of which AI tool is used, which account type, or which provider's policies change.",
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
