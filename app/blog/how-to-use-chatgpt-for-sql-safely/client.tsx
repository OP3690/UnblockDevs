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

export default function HowToUseChatGptForSqlSafelyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Use ChatGPT for SQL Without Exposing Your Database Schema</h1>
      <p className="lead">
        ChatGPT, Claude, and GitHub Copilot are genuinely useful for writing SQL — they suggest
        joins you might have missed, catch performance anti-patterns, and translate complex
        business logic into correct query structure. But every time a developer pastes a real query
        with production table and column names, they hand the AI a map of their database
        architecture. This guide shows you how to get all the SQL help you need from AI while
        keeping your real schema completely private — using schema masking.
      </p>

      <StatGrid stats={[
        { value: '100%', label: 'Of your real table and column names stay hidden — AI never sees them', color: 'green' },
        { value: '4 steps', label: 'Mask → send to AI → paste AI reply → restore. Total time: under 60 seconds', color: 'blue' },
        { value: '0 bytes', label: 'Data sent to any server — schema masking runs entirely in your browser', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Why Sharing Raw Schema with AI Is a Real Risk" />
      <p>
        When you paste a query like this into ChatGPT:
      </p>

      <CodeBlock lang="sql" title="A real query you might paste into ChatGPT">
{`SELECT u.email, u.annual_salary, u.ssn_last4,
       p.plan_type, p.premium_amount
FROM hr.employee_records u
JOIN benefits.insurance_plans p ON p.employee_id = u.employee_id
WHERE u.department_code = 'EXEC'
  AND u.termination_date IS NULL
ORDER BY u.annual_salary DESC;`}
      </CodeBlock>

      <p>
        You have just told an AI system — and potentially its training pipeline — that your company
        has an <code>hr</code> schema, an <code>employee_records</code> table, columns named
        <code>annual_salary</code>, <code>ssn_last4</code>, and <code>termination_date</code>, a
        <code>benefits.insurance_plans</code> table, and that executives are in department
        <code>EXEC</code>. That is an architectural blueprint of your HR system, extracted in
        seconds, from a single prompt.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Training data exposure',
          description:
            'AI models are periodically retrained on interaction data. Depending on the provider and your subscription tier, prompts you submit may feed into future training runs. Table names, column names, and schema patterns submitted today could surface in AI outputs months later.',
        },
        {
          title: 'Competitive intelligence risk',
          description:
            "Your database schema reveals your data model — which implies your product architecture, business logic, and competitive differentiators. Competitor developers using the same AI tool won't see your specific query, but schema patterns can appear in model completions trained on similar inputs.",
        },
        {
          title: 'Compliance violations',
          description:
            "GDPR, HIPAA, SOC 2, and PCI-DSS all require controlling where sensitive data — including metadata describing sensitive data — is processed and stored. Sending column names like ssn_last4 or patient_diagnosis to a third-party AI API may breach your data processing agreements.",
        },
        {
          title: 'Insider threat amplification',
          description:
            'A developer who pastes schema into a personal AI account creates an audit trail gap. If that developer leaves the company, the schema they submitted to AI systems is no longer under your control — it exists in AI provider logs indefinitely.',
        },
      ]} />

      <SectionHeader number={2} title="The Solution: Schema Masking Before AI" />
      <p>
        Schema masking replaces every real identifier in your SQL with a meaningless placeholder
        before you send anything to AI. Tables become <code>T_000001</code>, columns become{' '}
        <code>C_000001</code>, aliases become <code>A_000001</code>, and string values in{' '}
        <code>IN</code> clauses become <code>V_000001</code>. The SQL structure — joins, aggregations,
        window functions, subqueries — is preserved perfectly. The AI sees a structurally identical
        query and can help with all the SQL logic. You restore original names from the AI response
        in one click when done.
      </p>

      <ErrorFix
        title="Before and after schema masking"
        bad={`-- BEFORE: real schema pasted into ChatGPT
SELECT u.email, u.annual_salary
FROM hr.employee_records u
JOIN benefits.insurance_plans p ON p.employee_id = u.employee_id
WHERE u.department_code IN ('EXEC', 'FINANCE')
  AND u.termination_date IS NULL;`}
        good={`-- AFTER: masked query sent to ChatGPT — schema fully hidden
SELECT A_000001.C_000001, A_000001.C_000002
FROM S_000001.T_000001 A_000001
JOIN T_000002 A_000002 ON A_000002.C_000003 = A_000001.C_000003
WHERE A_000001.C_000004 IN ('V_000001', 'V_000002')
  AND A_000001.C_000005 IS NULL;`}
        badLabel="Real table names, column names, and IN values visible to AI"
        goodLabel="Structure preserved — identifiers and values fully hidden"
      />

      <SectionHeader number={3} title="Step-by-Step: Secure SQL + AI Workflow" />

      <VerticalSteps steps={[
        {
          title: 'Paste your SQL into the AI Schema Masker',
          desc: 'Go to unblockdevs.com/ai-schema-masker. Paste your SQL query — SELECT, INSERT, UPDATE, CTE, or JSON schema. The tool accepts any SQL dialect and any complexity level. Enable "String values" to also mask IN clause values like status codes and category names.',
        },
        {
          title: 'Click "Mask identifiers"',
          desc: 'The DITE engine (Deterministic Identifier Transformation Engine) replaces every table name, column name, schema name, and alias with a numbered placeholder. String values become V_000001. The transformation runs entirely in your browser — nothing is sent anywhere.',
        },
        {
          title: 'Copy the masked output and paste into ChatGPT (or any AI)',
          desc: 'The masked query is structurally identical to your original — same joins, same WHERE conditions, same aggregations. Ask the AI anything: optimize this query, add a missing index hint, rewrite the subquery as a CTE, add window functions, explain the execution plan.',
        },
        {
          title: 'Copy the AI response',
          desc: "The AI responds with the same placeholder names it received. It can't invent your real names because it never saw them. Copy the AI's SQL response.",
        },
        {
          title: 'Paste AI response into the Restore section and click Restore',
          desc: 'Back in the AI Schema Masker, paste the AI response into the Restore panel. Click Restore. Every placeholder is swapped back to your original real identifier — exactly as it was. The restored SQL is production-ready.',
        },
      ]} />

      <AlertBox type="info" title="Download the mapping file for long sessions">
        The schema masker generates a JSON mapping file (download via the mapping panel) that contains
        every placeholder-to-real-name pair. If you are working across multiple AI sessions or sharing
        masked queries with colleagues, download and store the mapping file. Anyone with the mapping
        file can restore any AI response back to real names — even days later.
      </AlertBox>

      <SectionHeader number={4} title="What the AI Can Still Help You With" />
      <p>
        Masking identifiers does not reduce the quality of AI SQL help at all. The AI operates on
        query structure, not naming. Everything it does with real names works equally well with
        placeholders:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Query optimization',
          description:
            'The AI can spot missing index hints, suggest query rewrites, identify Cartesian products, recommend covering indexes, and explain why a query is slow — all from structure alone. T_000001 and users are identical to the optimizer.',
        },
        {
          title: 'SQL generation from instructions',
          description:
            'Use the AI Schema Masker\'s "Generate prompt" feature to describe what you want in business terms — "count active users by month" — using placeholder names. The AI writes the SQL structure. You restore names when done.',
        },
        {
          title: 'CTE and subquery refactoring',
          description:
            'Ask the AI to rewrite nested subqueries as CTEs, break apart complex CASE expressions, or convert a correlated subquery to a window function. All structural improvements work with masked identifiers.',
        },
        {
          title: 'Dialect migration',
          description:
            'Convert a MySQL query to PostgreSQL syntax, or migrate MSSQL TOP to ANSI LIMIT/OFFSET — the AI handles all dialect differences from masked SQL just as accurately as from real SQL.',
        },
      ]} />

      <SectionHeader number={5} title="The Masking Algorithm — How Identifiers Are Replaced" />

      <CodeBlock lang="text" title="How the DITE engine transforms identifiers">
{`Input SQL:
  SELECT u.email, u.annual_salary
  FROM hr.employee_records u
  JOIN benefits.insurance_plans p ON p.employee_id = u.employee_id
  WHERE u.department_code IN ('EXEC', 'FINANCE')

DITE pipeline:
  Stage 1 — Lexer: tokenize SQL into keywords, identifiers, strings, operators
  Stage 2 — Context extraction: classify each identifier as table/column/alias/schema
  Stage 3 — Deterministic mapping: assign numbered placeholders in order of appearance
  Stage 4 — Transformation: replace every identifier token with its placeholder
  Stage 5 — Value masking: replace string literals with V_000001, V_000002...

Mapping generated:
  hr          → S_000001  (schema)
  employee_records → T_000001  (table)
  benefits    → S_000002  (schema)
  insurance_plans  → T_000002  (table)
  u           → A_000001  (alias)
  p           → A_000002  (alias)
  email       → C_000001  (column)
  annual_salary → C_000002  (column)
  employee_id → C_000003  (column — shared across tables)
  department_code → C_000004  (column)
  'EXEC'      → 'V_000001' (string value)
  'FINANCE'   → 'V_000002' (string value)

Masked output:
  SELECT A_000001.C_000001, A_000001.C_000002
  FROM S_000001.T_000001 A_000001
  JOIN S_000002.T_000002 A_000002
    ON A_000002.C_000003 = A_000001.C_000003
  WHERE A_000001.C_000004 IN ('V_000001', 'V_000002')`}
      </CodeBlock>

      <QuickFact color="green" label="Deterministic mapping means consistent placeholders">
        The same identifier always gets the same placeholder within a session.{' '}
        <code>employee_id</code> maps to <code>C_000003</code> in every place it appears —
        in the SELECT, the JOIN ON condition, and the WHERE clause. This is what makes the
        masked SQL structurally valid and the restore lossless: every occurrence of the same
        real name becomes the same placeholder, so replacing placeholders back restores every
        occurrence correctly.
      </QuickFact>

      <SectionHeader number={6} title="Team Policy: When to Always Mask" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Any query referencing PII tables',
          description:
            'Tables with user data, customer records, employee information, payment data, or health records. Column names like email, ssn, patient_id, credit_card_last4 are themselves sensitive metadata under most privacy regulations.',
        },
        {
          title: 'Production database schemas',
          description:
            'Any schema from a production environment. Development and test schemas with synthetic data are lower risk, but production schema names and structure should never leave your controlled environment unmasked.',
        },
        {
          title: 'Queries containing business logic values',
          description:
            "Status codes like 'EXEC', 'SUSPENDED', 'HIGH_VALUE' in IN clauses reveal your business categorization logic. With string value masking enabled, these become V_000001 — the AI helps with the SQL structure without seeing your internal taxonomy.",
        },
        {
          title: 'Any AI tool not under your enterprise agreement',
          description:
            "If you're using personal ChatGPT, a public AI API, or any tool where you haven't reviewed the data retention policy, mask everything. Enterprise agreements with opt-out of training data inclusion are the only exceptions.",
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does masking reduce the quality of AI SQL suggestions?',
          answer: 'No. AI SQL generation works entirely on query structure — joins, aggregations, window functions, subqueries, CTEs. It does not need to understand what "employee_records" means to optimize a query or suggest a missing index. T_000001 and employee_records are structurally identical to any AI model. The quality of suggestions is unchanged.',
        },
        {
          question: 'Does the mapping ever get sent to a server?',
          answer: 'Never. The entire masking and restore pipeline runs in your browser using a Web Worker. The mapping JSON — which contains your real table and column names — is stored only in browser memory (and optionally browser sessionStorage if you enable "Keep mapping in tab"). It is never transmitted to unblockdevs.com or any other server.',
        },
        {
          question: 'What if the AI changes the placeholder names in its response?',
          answer: "The restore engine re-tokenizes the AI response and does a longest-match reverse lookup. As long as the AI preserves the placeholder format (T_000001, C_000001), restoration is 100% accurate. If the AI reformats or changes placeholder names — which is rare — the restore shows the unchanged placeholder so you can see which names were affected.",
        },
        {
          question: 'Can I use this with GitHub Copilot or Claude?',
          answer: 'Yes. The masking is tool-agnostic — it runs in your browser before you copy any SQL. Paste the masked output into ChatGPT, Claude, Copilot Chat, Gemini, or any AI tool. Paste the AI response into the Restore section to get the SQL back with real names.',
        },
        {
          question: 'What happens to IN clause values like status codes?',
          answer: "Enable the 'String values' checkbox (on by default) before masking. The tool masks every string literal — IN ('COMPLETED', 'PENDING') becomes IN ('V_000001', 'V_000002'). The values are added to the mapping and fully restored when you paste the AI response back.",
        },
        {
          question: 'Can I mask multiple queries in one session?',
          answer: 'Yes. The mapping is cumulative within a session — paste and mask a second query and identifiers from the first query get the same placeholders if they appear again. This ensures consistency across multiple related queries sent to AI in the same session.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
