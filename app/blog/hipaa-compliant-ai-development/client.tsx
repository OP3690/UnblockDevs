'use client';

import Link from 'next/link';
import { Shield, AlertTriangle, FileCode, FileJson, Database, Lock, Stethoscope, CheckCircle, User, Calendar, Hash, Phone, MapPin, Globe, CreditCard, Dna } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  FlowDiagram,
  VerticalSteps,
  CompareTable,
  StatGrid,
  KeyPointsGrid,
  CodeBlock,
  QuickFact,
  SectionHeader,
  ToolCTA,
  FAQAccordion,
} from '@/components/blog/BlogVisuals';

export default function HipaaCompliantAiClient() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-900">
            ← Blog
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
                HIPAA-Compliant AI Development: How to Use ChatGPT Without Exposing Patient Data
              </h1>
              <p className="mt-1.5 text-[14px] text-zinc-500">
                Complete guide to masking PHI before AI · Covers SQL, JSON, code secrets · 18 min read
              </p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="HIPAA-Compliant AI Development: How to Use ChatGPT Without Exposing Patient Data"
        description="Learn the client-side masking approach that lets healthcare developers use ChatGPT safely — without ever exposing PHI, SQL schema, or API secrets."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'Can I use ChatGPT with patient data and stay HIPAA compliant?',
              answer: 'Not by pasting raw patient data, SQL with real table/column names, or JSON with PHI into ChatGPT. HIPAA prohibits disclosing PHI to third parties without a BAA. The safe approach is to mask all identifiers client-side in your browser before sending anything to an AI. Only masked placeholders ever leave your device.',
            },
            {
              question: 'What counts as PHI when using AI coding assistants?',
              answer: 'PHI includes any of the 18 HIPAA identifiers that can link information to a patient: names, dates (birth, admission, discharge), geographic data, phone numbers, email, SSN, MRN, account numbers, certificate numbers, device identifiers, URLs, IP addresses, biometric identifiers, photographs, and any unique identifying numbers. SQL column names like patient_ssn or diagnosis_codes also reveal PHI context.',
            },
            {
              question: 'Does masking SQL schema help with HIPAA compliance?',
              answer: 'Yes. Table and column names often reveal what data you hold. Sending raw SQL or schema to an AI sends those identifiers to a third party. Masking replaces them with placeholders (e.g. T_001, C_001) entirely in your browser — you send only the masked version to the AI and restore the response locally. Your real schema and PHI never leave your control.',
            },
            {
              question: 'Do I need a BAA with OpenAI to use ChatGPT for healthcare development?',
              answer: 'Many healthcare organizations require a BAA before any PHI is processed by a vendor. Even with a BAA, sending raw schema or payloads creates audit overhead and risk. Masking PHI and identifiers before sending reduces risk significantly and keeps the AI interaction out of scope of PHI processing — the safest approach regardless of BAA status.',
            },
            {
              question: 'Where does PHI masking run — in my browser or on a server?',
              answer: 'For HIPAA-safe use, masking must run only in your browser (client-side). No SQL, JSON, or code is uploaded to any server. No mapping or identifiers are stored remotely. You build the mapping locally and optionally download it to restore later. Only masked text ever leaves your device when you paste it into ChatGPT.',
            },
            {
              question: 'What is the penalty for accidentally sharing PHI with an AI tool?',
              answer: 'HIPAA violations can result in fines ranging from $100 to $50,000 per violation (per record), with annual caps up to $1.9 million per violation category. The average healthcare data breach costs $10.9 million in 2023. Criminal penalties for willful neglect can reach $250,000 and include imprisonment.',
            },
            {
              question: 'Can I use GitHub Copilot for HIPAA-compliant healthcare code?',
              answer: 'GitHub Copilot processes the code you are actively writing in your IDE. If that code contains PHI, connection strings with credentials, or schema that reveals patient data structure, it may be transmitted to GitHub/Microsoft servers. Use code masking tools to replace sensitive identifiers before working with AI coding assistants on healthcare codebases.',
            },
          ]}
        />

        <article>
          {/* Intro */}
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-700">
            Healthcare developers face a hard problem: AI tools like ChatGPT, GitHub Copilot, and Claude can dramatically speed up development, but healthcare codebases contain <strong>Protected Health Information (PHI)</strong> — and sending that data to a third-party AI is a potential HIPAA violation. The solution is not to avoid AI altogether. It is to <strong>mask identifiers client-side</strong> before anything is sent to an AI, then restore the response locally. This guide explains exactly how to do that across SQL schemas, JSON payloads, and source code.
          </p>

          <StatGrid
            stats={[
              { value: '18', label: 'PHI Identifiers', desc: 'HIPAA-defined patient identifiers', color: 'rose' },
              { value: '$10.9M', label: 'Avg Breach Cost', desc: 'Healthcare breach in 2023', color: 'amber' },
              { value: '83%', label: 'Breaches Involve PHI', desc: 'Of healthcare incidents', color: 'violet' },
              { value: '100%', label: 'Browser-Side', desc: 'Masking never leaves device', color: 'emerald' },
            ]}
          />

          {/* Section 1 */}
          <SectionHeader
            n={1}
            title="What Is HIPAA and Why Every Healthcare Developer Must Care"
            icon={<Stethoscope className="h-5 w-5" />}
            color="emerald"
            subtitle="The regulatory framework that governs patient data — and why it extends to your AI prompts"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The <strong>Health Insurance Portability and Accountability Act (HIPAA)</strong> was enacted in 1996 and sets the national standard for protecting sensitive patient health information. If you work at a hospital, health system, insurance company, medical SaaS company, or any business that handles patient records, HIPAA applies to you — and increasingly, it applies to the tools you use during development.
          </p>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            HIPAA applies to two categories of organizations: <strong>Covered Entities</strong> (healthcare providers, health plans, and clearinghouses) and their <strong>Business Associates</strong> (any third party that handles PHI on their behalf). As a developer building for healthcare, you are almost certainly a business associate, which means the same rules apply to your development environment.
          </p>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The <strong>HIPAA Privacy Rule</strong> restricts how PHI can be used and disclosed. The <strong>HIPAA Security Rule</strong> governs electronic PHI (ePHI). When you paste a database schema, an API response, or source code containing patient identifiers into ChatGPT, you are potentially disclosing ePHI to a third party — OpenAI — without the required protections in place.
          </p>

          <AlertBox type="error" title="HIPAA Violation Risk — Sending PHI to AI">
            When you paste raw SQL containing patient table names, JSON with real patient fields, or code containing patient identifiers into ChatGPT or any AI tool, that data is transmitted to and processed by a third-party server. Without a valid Business Associate Agreement (BAA) with that AI provider — and even with one — this can constitute unauthorized disclosure of PHI under HIPAA, triggering potential fines, audits, and legal liability.
          </AlertBox>

          <QuickFact color="rose" label="HIPAA Penalty Scale">
            HIPAA violations range from $100 per violation (unknowing) to $50,000 per violation (willful neglect), with annual caps up to $1.9 million per violation category. The HHS Office for Civil Rights actively investigates breaches involving third-party data sharing.
          </QuickFact>

          {/* Section 2 */}
          <SectionHeader
            n={2}
            title="The Problem: What Actually Happens When You Paste PHI Into ChatGPT"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="red"
            subtitle="Understanding the data flow and why it creates compliance exposure"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The typical scenario plays out like this: a developer is working on a healthcare application, hits a complex SQL query problem, and pastes their schema into ChatGPT to get help. The schema contains table names like <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">patient_demographics</code>, <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">lab_results</code>, <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">diagnosis_codes</code>, and column names like <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">patient_ssn</code>, <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">date_of_birth</code>, <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">insurance_member_id</code>. This seems harmless because there is no actual patient data — just structure.
          </p>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            But HIPAA's definition of PHI extends to <strong>data that reveals the type of health information you collect</strong>. A schema that shows you have a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">hiv_test_results</code> table or a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">psychiatric_notes</code> column reveals sensitive facts about your system and, by inference, your patients. Many compliance officers and legal teams consider this schema exposure to be a disclosure risk.
          </p>

          <FlowDiagram
            title="What happens when you paste unmasked PHI into ChatGPT"
            steps={[
              { label: 'Your Device', desc: 'Raw PHI / schema', color: 'zinc' },
              { label: 'Internet', desc: 'Transmitted in plaintext prompt', color: 'rose' },
              { label: 'OpenAI Servers', desc: 'Stored & processed', color: 'rose' },
              { label: 'AI Model', desc: 'Trained on or cached', color: 'amber' },
              { label: 'Response', desc: 'Returned to you', color: 'zinc' },
            ]}
          />

          <AlertBox type="warning" title="Even 'Anonymized' Data Can Be PHI">
            Removing a patient name does not automatically make data non-PHI. HIPAA's Safe Harbor de-identification standard requires removing all 18 specific identifiers. A JSON payload with a date of birth, a zip code, and a diagnosis code is still PHI even without a name — because the combination can re-identify individuals.
          </AlertBox>

          <CompareTable
            title="Unsafe AI Workflow vs. HIPAA-Safe Masked Workflow"
            left={{
              title: 'Unsafe — Never Do This',
              color: 'rose',
              items: [
                'Paste raw SQL with patient table names',
                'Send JSON with real patient field names',
                'Share code with API keys and credentials',
                'Include real MRN or SSN patterns in prompts',
                'Upload CSV exports with patient rows',
                'Share connection strings with prod credentials',
                'Use real field names like patient_dob, ssn',
                'Send actual error logs with patient context',
              ],
            }}
            right={{
              title: 'Safe — Mask First, Then Send',
              color: 'emerald',
              items: [
                'Mask table names to T_001, T_002 first',
                'Replace JSON keys with K_00001 placeholders',
                'Replace secrets with REDACTED tokens',
                'Use placeholder patterns like [MRN] or X_001',
                'Strip all rows, send only structure',
                'Mask credentials before sharing any snippet',
                'Replace with generic names before prompting',
                'Mask patient context before sending logs',
              ],
            }}
          />

          {/* Section 3 */}
          <SectionHeader
            n={3}
            title="The 18 PHI Identifiers You Must Protect"
            icon={<User className="h-5 w-5" />}
            color="violet"
            subtitle="HIPAA's complete list of protected health information identifiers under the Safe Harbor standard"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            Under HIPAA's Safe Harbor de-identification standard (45 CFR §164.514(b)), 18 specific types of identifiers must be removed or masked before health information is considered de-identified. Any of these appearing in your prompts to an AI tool constitutes PHI disclosure.
          </p>

          <KeyPointsGrid
            cols={3}
            title="All 18 HIPAA PHI Identifiers"
            points={[
              { title: 'Names', desc: 'Patient, family member, or employer names in any field', icon: <User className="h-4 w-4" />, color: 'rose' },
              { title: 'Geographic Data', desc: 'All geographic subdivisions smaller than a state — zip codes, addresses, counties, cities', icon: <MapPin className="h-4 w-4" />, color: 'rose' },
              { title: 'Dates', desc: 'All dates except year: birth, admission, discharge, death, and ages over 89', icon: <Calendar className="h-4 w-4" />, color: 'rose' },
              { title: 'Phone Numbers', desc: 'All telephone and fax numbers', icon: <Phone className="h-4 w-4" />, color: 'amber' },
              { title: 'Fax Numbers', desc: 'All fax contact numbers associated with individuals', icon: <Phone className="h-4 w-4" />, color: 'amber' },
              { title: 'Email Addresses', desc: 'Any email address that could identify or contact a patient', icon: <Globe className="h-4 w-4" />, color: 'amber' },
              { title: 'SSN', desc: 'Social security numbers in full or partial form', icon: <Hash className="h-4 w-4" />, color: 'violet' },
              { title: 'Medical Record Numbers', desc: 'MRNs and any health plan beneficiary numbers', icon: <Hash className="h-4 w-4" />, color: 'violet' },
              { title: 'Account Numbers', desc: 'Financial account numbers used for healthcare billing', icon: <CreditCard className="h-4 w-4" />, color: 'violet' },
              { title: 'Certificate/License Numbers', desc: 'Certificate and license numbers associated with patients', icon: <Hash className="h-4 w-4" />, color: 'blue' },
              { title: 'Vehicle Identifiers', desc: 'Vehicle serial numbers and license plate numbers', icon: <Hash className="h-4 w-4" />, color: 'blue' },
              { title: 'Device Identifiers', desc: 'Device serial numbers and unique device identifiers (UDI)', icon: <Hash className="h-4 w-4" />, color: 'blue' },
              { title: 'Web URLs', desc: 'URLs that could identify an individual or their records', icon: <Globe className="h-4 w-4" />, color: 'sky' },
              { title: 'IP Addresses', desc: 'Internet Protocol addresses that identify a patient device', icon: <Globe className="h-4 w-4" />, color: 'sky' },
              { title: 'Biometric Identifiers', desc: 'Finger prints, voice prints, retina scans, and similar', icon: <Dna className="h-4 w-4" />, color: 'sky' },
              { title: 'Full-Face Photos', desc: 'Photographs and comparable images showing the face', icon: <User className="h-4 w-4" />, color: 'emerald' },
              { title: 'Any Unique Number', desc: 'Any other unique identifying number, characteristic, or code', icon: <Hash className="h-4 w-4" />, color: 'emerald' },
              { title: 'Health Plan Numbers', desc: 'Health plan beneficiary numbers and policy numbers', icon: <CreditCard className="h-4 w-4" />, color: 'emerald' },
            ]}
          />

          <QuickFact color="violet" label="The Combination Problem">
            Even if a single field is not PHI on its own, HIPAA's Expert Determination standard recognizes that combinations of data — like zip code + date of birth + gender — can uniquely identify patients. A 1997 study showed 87% of Americans can be uniquely identified by just these three data points.
          </QuickFact>

          {/* Section 4 */}
          <SectionHeader
            n={4}
            title="The Client-Side Masking Approach: How It Works"
            icon={<Lock className="h-5 w-5" />}
            color="emerald"
            subtitle="The architectural pattern that lets you use AI safely for healthcare development"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The client-side masking approach is elegant in its simplicity: all sensitive data is replaced with neutral placeholders <strong>inside your browser</strong> before anything is transmitted anywhere. The mapping between real names and placeholders lives only on your device. You paste the masked output into ChatGPT, get back masked responses, then restore the real names locally.
          </p>

          <FlowDiagram
            title="HIPAA-safe AI development workflow"
            steps={[
              { label: 'Raw PHI', desc: 'Your SQL / JSON / code', color: 'zinc' },
              { label: 'Browser Masker', desc: '100% client-side', color: 'emerald' },
              { label: 'Masked Data', desc: 'Placeholders only', color: 'blue' },
              { label: 'ChatGPT', desc: 'Sees no real PHI', color: 'violet' },
              { label: 'AI Response', desc: 'Masked placeholders', color: 'violet' },
              { label: 'Unmask Locally', desc: 'Restore real names', color: 'emerald' },
              { label: 'Developer', desc: 'Working output', color: 'emerald' },
            ]}
          />

          <AlertBox type="success" title="Why Client-Side Masking Works for HIPAA">
            Because masking runs entirely in your browser with no server involved, your PHI and schema identifiers never leave your device in their original form. The only data that reaches OpenAI is a set of opaque placeholders like T_001, C_002, K_00001 — which contain no patient information whatsoever. This approach is recognized by healthcare compliance teams as a practical way to use AI tools during development.
          </AlertBox>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The masking is <strong>deterministic</strong>: the same identifier always maps to the same placeholder within a session. This means AI can write queries, functions, and responses that use the placeholders consistently, and you can restore the entire output in one operation. The mapping can be exported as a JSON file and re-imported for multi-session workflows.
          </p>

          {/* Section 5 */}
          <SectionHeader
            n={5}
            title="Masking SQL Schemas Before Sending to AI"
            icon={<Database className="h-5 w-5" />}
            color="blue"
            subtitle="How to safely get AI help with database queries and schema design"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            SQL schemas are the most common source of inadvertent PHI disclosure during AI-assisted development. A typical healthcare schema includes tables and columns with names that directly describe sensitive medical data. Here is what a dangerous unmasked schema looks like versus its safely masked equivalent:
          </p>

          <CodeBlock lang="sql" title="UNSAFE — Never paste this into ChatGPT">
{`-- This schema reveals PHI context and should NEVER be sent to AI
CREATE TABLE patient_demographics (
  patient_id       INT PRIMARY KEY,
  first_name       VARCHAR(50),
  last_name        VARCHAR(50),
  date_of_birth    DATE,
  ssn              CHAR(11),
  insurance_id     VARCHAR(20),
  home_address     TEXT,
  phone_number     VARCHAR(15),
  email_address    VARCHAR(100)
);

CREATE TABLE lab_results (
  result_id        INT PRIMARY KEY,
  patient_id       INT REFERENCES patient_demographics,
  test_type        VARCHAR(100),
  result_value     DECIMAL(10,4),
  result_date      DATE,
  ordering_physician VARCHAR(100)
);

CREATE TABLE diagnosis_codes (
  diagnosis_id     INT PRIMARY KEY,
  patient_id       INT REFERENCES patient_demographics,
  icd10_code       VARCHAR(10),
  diagnosis_date   DATE,
  notes            TEXT
);`}
          </CodeBlock>

          <CodeBlock lang="sql" title="SAFE — Masked version you CAN send to ChatGPT" good>
{`-- Masked with AI Schema Masker — safe to share with any AI tool
CREATE TABLE T_001 (
  C_001  INT PRIMARY KEY,
  C_002  VARCHAR(50),
  C_003  VARCHAR(50),
  C_004  DATE,
  C_005  CHAR(11),
  C_006  VARCHAR(20),
  C_007  TEXT,
  C_008  VARCHAR(15),
  C_009  VARCHAR(100)
);

CREATE TABLE T_002 (
  C_010  INT PRIMARY KEY,
  C_001  INT REFERENCES T_001,
  C_011  VARCHAR(100),
  C_012  DECIMAL(10,4),
  C_013  DATE,
  C_014  VARCHAR(100)
);

CREATE TABLE T_003 (
  C_015  INT PRIMARY KEY,
  C_001  INT REFERENCES T_001,
  C_016  VARCHAR(10),
  C_017  DATE,
  C_018  TEXT
);`}
          </CodeBlock>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            After ChatGPT writes a query using T_001, C_001, etc., you paste the response back into the masker tool and click Restore. The tool replaces every placeholder with the original name, giving you a perfectly valid SQL query with real column and table names — never sent to any server.
          </p>

          <ToolCTA
            href="/ai-schema-masker"
            label="Try AI Schema Masker — Free, Browser-Only"
            desc="Mask SQL table and column names instantly. Restore AI responses with one click. No data ever leaves your device."
            color="emerald"
          />

          {/* Section 6 */}
          <SectionHeader
            n={6}
            title="Masking JSON Payloads Before Sending to AI"
            icon={<FileJson className="h-5 w-5" />}
            color="violet"
            subtitle="Safe AI assistance for API development, payload debugging, and data transformation"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            Healthcare APIs constantly produce JSON payloads that contain PHI — patient records, lab results, insurance information, appointment data. When you need AI help debugging a payload structure, transforming data formats, or writing parsing code, you need to mask the JSON first.
          </p>

          <CodeBlock lang="json" title="UNSAFE — Real patient JSON payload, never send to AI">
{`{
  "patient": {
    "patientId": "MRN-2847361",
    "firstName": "Jane",
    "lastName": "Smith",
    "dateOfBirth": "1985-03-12",
    "socialSecurityNumber": "456-78-9012",
    "address": {
      "street": "1234 Elm Street",
      "city": "Springfield",
      "state": "IL",
      "zipCode": "62701"
    },
    "phoneNumber": "+1-555-987-6543",
    "emailAddress": "jane.smith@email.com",
    "insuranceMemberId": "BCBS-9876543"
  },
  "labResult": {
    "testType": "HbA1c",
    "resultValue": 7.2,
    "resultDate": "2024-01-15",
    "orderingPhysician": "Dr. Robert Johnson"
  }
}`}
          </CodeBlock>

          <CodeBlock lang="json" title="SAFE — Masked JSON payload, safe to send to ChatGPT" good>
{`{
  "K_00001": {
    "K_00002": "S_00001",
    "K_00003": "S_00002",
    "K_00004": "S_00003",
    "K_00005": "S_00004",
    "K_00006": "S_00005",
    "K_00007": {
      "K_00008": "S_00006",
      "K_00009": "S_00007",
      "K_00010": "S_00008",
      "K_00011": "S_00009"
    },
    "K_00012": "S_00010",
    "K_00013": "S_00011",
    "K_00014": "S_00012"
  },
  "K_00015": {
    "K_00016": "S_00013",
    "K_00017": 7.2,
    "K_00018": "S_00014",
    "K_00019": "S_00015"
  }
}`}
          </CodeBlock>

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            The structure is preserved — nested objects, arrays, data types — while all keys and string values are replaced with opaque placeholders. ChatGPT can still help you write parsing logic, transformation code, and validation rules using the masked structure. The numeric value <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px]">7.2</code> remains (numeric values are typically safe) while all string identifiers are replaced.
          </p>

          <ToolCTA
            href="/json-prompt-shield"
            label="Try JSON Prompt Shield — Mask JSON in Your Browser"
            desc="Instantly mask all JSON keys and string values. Preserve structure and data types. Restore responses with your real field names."
            color="violet"
          />

          {/* Section 7 */}
          <SectionHeader
            n={7}
            title="Masking Source Code with API Keys and Secrets"
            icon={<FileCode className="h-5 w-5" />}
            color="amber"
            subtitle="Protecting credentials, connection strings, and sensitive variable names in code"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            Beyond SQL and JSON, source code itself can contain sensitive information: database connection strings with real credentials, API keys for health data services, environment variable names that reveal internal architecture, and variable names that contain or label PHI. All of these should be masked before sending code to any AI tool.
          </p>

          <CodeBlock lang="typescript" title="UNSAFE — Code with real secrets and PHI context">
{`// NEVER send this to ChatGPT
const EPIC_API_KEY = 'epic_prod_key_a7f2b9d1c4e6f8a0';
const FHIR_SERVER_URL = 'https://fhir.hospital-prod.com/R4';
const DB_CONNECTION_STRING = 'postgresql://hipaaadmin:Secure$Pass123@prod-db.hospital.internal:5432/patient_records';

async function getPatientRecord(patientMRN: string) {
  const response = await fetch(\`\${FHIR_SERVER_URL}/Patient?identifier=MRN|\${patientMRN}\`, {
    headers: { 'Authorization': \`Bearer \${EPIC_API_KEY}\` }
  });

  const patient = await response.json();

  // Log patient SSN for debugging (BAD PRACTICE)
  console.log(\`Processing patient SSN: \${patient.socialSecurityNumber}\`);

  return {
    name: \`\${patient.firstName} \${patient.lastName}\`,
    dob: patient.dateOfBirth,
    mrn: patientMRN,
    insuranceId: patient.insuranceMemberId
  };
}`}
          </CodeBlock>

          <CodeBlock lang="typescript" title="SAFE — Masked code you can send to ChatGPT" good>
{`// Safe to send — all secrets and PHI identifiers masked
const REDACTED_API_KEY_1 = 'REDACTED_001';
const REDACTED_URL_1 = 'REDACTED_002';
const REDACTED_CONNECTION_3 = 'REDACTED_003';

async function getV_001(v_002: string) {
  const response = await fetch(\`\${REDACTED_URL_1}/V_003?identifier=V_004|\${v_002}\`, {
    headers: { 'Authorization': \`Bearer \${REDACTED_API_KEY_1}\` }
  });

  const v_005 = await response.json();

  // Log v_006 for debugging
  console.log(\`Processing v_006: \${v_005.v_007}\`);

  return {
    v_008: \`\${v_005.v_009} \${v_005.v_010}\`,
    v_011: v_005.v_012,
    v_013: v_002,
    v_014: v_005.v_015
  };
}`}
          </CodeBlock>

          <ToolCTA
            href="/code-prompt-shield"
            label="Try Code Prompt Shield — Mask Secrets in Code"
            desc="Replace API keys, connection strings, credentials, and sensitive variable names before sending code to any AI tool."
            color="amber"
          />

          {/* Section 8 */}
          <SectionHeader
            n={8}
            title="Implementation Workflow for Dev Teams"
            icon={<CheckCircle className="h-5 w-5" />}
            color="blue"
            subtitle="How to roll out HIPAA-safe AI practices across your entire engineering team"
          />

          <p className="text-[14.5px] leading-relaxed text-zinc-700 mb-4">
            Individual developer education is not enough. HIPAA compliance requires systematic controls. Here is how to implement a team-wide HIPAA-safe AI workflow:
          </p>

          <KeyPointsGrid
            cols={2}
            title="Team Implementation Strategy"
            points={[
              {
                title: 'Create an AI Usage Policy',
                desc: 'Document which AI tools are approved, what types of data can be shared, and what must be masked before sharing. Include this in your security policy documentation.',
                color: 'blue',
              },
              {
                title: 'Add Masking to Dev Runbooks',
                desc: 'Include masking steps in your development runbooks and onboarding documentation so every new developer learns the workflow from day one.',
                color: 'emerald',
              },
              {
                title: 'Pre-commit Hooks for Secret Detection',
                desc: 'Use tools like git-secrets or truffleHog to prevent hardcoded credentials from entering your repository. Complement with masking before AI use.',
                color: 'violet',
              },
              {
                title: 'Approved Tool List',
                desc: 'Maintain a list of AI tools with their data handling practices. For each tool, document whether it has a BAA, what data retention policy applies, and what masking is required.',
                color: 'amber',
              },
              {
                title: 'Code Review Checklist',
                desc: 'Add PHI and secret exposure to your PR review checklist. Reviewers should verify that no hardcoded patient data or credentials appear in AI-generated code.',
                color: 'sky',
              },
              {
                title: 'Regular Compliance Training',
                desc: 'Conduct quarterly training on HIPAA requirements and AI tool usage. Include practical exercises using masking tools. Document training completion.',
                color: 'rose',
              },
            ]}
          />

          {/* Section 9 */}
          <SectionHeader
            n={9}
            title="The HIPAA-Safe AI Workflow — Step by Step"
            icon={<Shield className="h-5 w-5" />}
            color="emerald"
            subtitle="A repeatable 5-step process every healthcare developer should follow"
          />

          <VerticalSteps
            steps={[
              {
                title: 'Identify What You Need AI Help With',
                desc: 'Before opening any AI tool, identify the specific problem: debugging a query, understanding an API structure, writing transformation logic. Determine what data you need to share with the AI to get useful help.',
                badge: 'Step 1',
              },
              {
                title: 'Paste Your Data into the Masking Tool',
                desc: 'Open the appropriate browser-based masking tool (AI Schema Masker for SQL, JSON Prompt Shield for JSON payloads, Code Prompt Shield for source code). Paste your raw data. The masking runs instantly in your browser — nothing is sent to any server.',
                badge: 'Step 2',
              },
              {
                title: 'Copy the Masked Output and Prompt ChatGPT',
                desc: 'Copy the masked output from the tool. Paste it into ChatGPT along with your question. The AI sees only opaque placeholders (T_001, K_00001, REDACTED_001) and can still provide valid technical assistance because the structure is preserved.',
                badge: 'Step 3',
              },
              {
                title: 'Copy the AI Response Back to the Masking Tool',
                desc: 'When ChatGPT provides a response (a query, transformed JSON, refactored code), copy that response and paste it into the masking tool\'s Restore field. Click Restore to replace all placeholders with your original real names.',
                badge: 'Step 4',
              },
              {
                title: 'Review, Test, and Use the Restored Output',
                desc: 'Review the restored output to verify it is correct and functionally sound. Test it in your development environment. The output will contain your real identifiers but was generated without exposing them to any third party.',
                badge: 'Step 5',
              },
            ]}
          />

          <AlertBox type="success" title="The Result: Full AI Productivity, Zero PHI Exposure">
            Following this 5-step workflow, you get all the productivity benefits of AI-assisted development — faster debugging, smarter query generation, automated documentation — while keeping all PHI and sensitive identifiers exclusively within your controlled environment. Your AI prompt contains zero patient data.
          </AlertBox>

          {/* Section 10 */}
          <SectionHeader
            n={10}
            title="HIPAA-Safe AI Compliance Checklist"
            icon={<CheckCircle className="h-5 w-5" />}
            color="emerald"
            subtitle="Use this checklist before sending anything to an AI tool in a healthcare context"
          />

          <KeyPointsGrid
            cols={2}
            title="Pre-AI Submission Checklist"
            points={[
              {
                title: 'No Real Table or Column Names',
                desc: 'All SQL identifiers have been replaced with T_00x and C_00x placeholders using the AI Schema Masker.',
                color: 'emerald',
              },
              {
                title: 'No Real JSON Keys or Values',
                desc: 'All JSON field names and string values have been replaced with K_00001 and S_00001 placeholders.',
                color: 'emerald',
              },
              {
                title: 'No API Keys or Credentials',
                desc: 'All API keys, passwords, connection strings, and tokens have been replaced with REDACTED tokens.',
                color: 'emerald',
              },
              {
                title: 'No Patient Names or Identifiers',
                desc: 'No names, SSNs, MRNs, dates of birth, phone numbers, or addresses appear anywhere in the prompt.',
                color: 'emerald',
              },
              {
                title: 'No Real Email Addresses',
                desc: 'All email addresses (patient, provider, or internal) have been masked or replaced with examples.',
                color: 'emerald',
              },
              {
                title: 'No IP Addresses or Device IDs',
                desc: 'No real IP addresses, device identifiers, or MAC addresses appear in the data being shared.',
                color: 'emerald',
              },
              {
                title: 'No Real URLs with PHI Context',
                desc: 'URLs containing patient IDs, MRNs, or other identifiers have been masked or replaced.',
                color: 'emerald',
              },
              {
                title: 'Masking Ran Client-Side Only',
                desc: 'The masking tool used runs entirely in the browser. No data was uploaded to any intermediary server.',
                color: 'emerald',
              },
            ]}
          />

          <AlertBox type="tip" title="Pro Tip: Save Your Mapping File">
            The AI Schema Masker and JSON Prompt Shield both allow you to export the mapping between real names and placeholders as a JSON file. Save this file (securely, locally) when working on multi-session features. Re-import it next session to ensure consistent placeholders across your prompts, making AI responses easier to restore.
          </AlertBox>

          {/* Multi-tool CTA */}
          <div className="my-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-400">HIPAA-Safe AI Tool Suite</p>
            <p className="mb-5 text-center text-[14px] text-zinc-600">Three browser-only tools covering all your healthcare development masking needs</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <a href="/ai-schema-masker" className="flex flex-col items-center rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center hover:bg-emerald-100 transition-colors">
                <Database className="h-6 w-6 text-emerald-600 mb-2" />
                <span className="font-semibold text-[14px] text-emerald-900">AI Schema Masker</span>
                <span className="text-[12px] text-emerald-700 mt-1">For SQL schemas and queries</span>
              </a>
              <a href="/json-prompt-shield" className="flex flex-col items-center rounded-xl border border-violet-200 bg-violet-50 p-4 text-center hover:bg-violet-100 transition-colors">
                <FileJson className="h-6 w-6 text-violet-600 mb-2" />
                <span className="font-semibold text-[14px] text-violet-900">JSON Prompt Shield</span>
                <span className="text-[12px] text-violet-700 mt-1">For API payloads and JSON</span>
              </a>
              <a href="/code-prompt-shield" className="flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50 p-4 text-center hover:bg-amber-100 transition-colors">
                <FileCode className="h-6 w-6 text-amber-600 mb-2" />
                <span className="font-semibold text-[14px] text-amber-900">Code Prompt Shield</span>
                <span className="text-[12px] text-amber-700 mt-1">For source code and secrets</span>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <FAQAccordion
            title="HIPAA and AI Development — Frequently Asked Questions"
            items={[
              {
                q: 'Can I use ChatGPT Enterprise for HIPAA-compliant healthcare development?',
                a: 'ChatGPT Enterprise does not use your prompts or outputs to train models and offers stronger data privacy guarantees. However, it still processes data on OpenAI\'s servers. Without a signed BAA with OpenAI covering your specific use case, sending PHI remains risky. Client-side masking is recommended regardless of which ChatGPT tier you use.',
              },
              {
                q: 'Does GitHub Copilot process my healthcare code?',
                a: 'GitHub Copilot sends code context from your editor to GitHub\'s servers for completion. If your code contains PHI, connection strings with patient database credentials, or schema identifiers, this data is transmitted. Use Code Prompt Shield to mask sensitive identifiers in your development files, or configure Copilot to exclude PHI-containing files from its context.',
              },
              {
                q: 'What is a Business Associate Agreement (BAA) and do I need one?',
                a: 'A BAA is a contract between a covered entity and a business associate that specifies the permitted uses of PHI and protections the associate must implement. If you want to use an AI tool that processes actual PHI (not masked data), you need a BAA with that provider. OpenAI, Microsoft Azure OpenAI, and AWS Bedrock all offer BAAs for enterprise healthcare customers — but these come with additional cost and configuration requirements.',
              },
              {
                q: 'Is it safe to use local LLMs like Ollama for healthcare code assistance?',
                a: 'Running a local LLM (such as Ollama with Llama or Mistral models) is inherently safer from a PHI transmission standpoint because data stays on your local machine. However, you still need to consider data at rest security on your device, whether the model is being used on a shared workstation, and whether outputs are logged or stored. Local LLMs are a compelling option for healthcare development teams with high compliance requirements.',
              },
              {
                q: 'How do I handle HIPAA compliance when using AI for automated testing?',
                a: 'Test data should use synthetic patient data rather than real patient records. Tools like Synthea can generate realistic synthetic FHIR records. If you must use production-derived test data for realistic scenarios, run it through de-identification (masking all 18 identifiers) before use. Never use real patient data as test fixtures in any environment that connects to AI tools.',
              },
              {
                q: 'What about AI tools embedded in IDEs like Cursor or Copilot Chat?',
                a: 'IDE-embedded AI tools continuously observe your code context and may send it to their servers as you type. This creates a higher risk than deliberate copy-paste prompting because PHI exposure can happen accidentally. Either use these tools only in non-PHI codebases, configure them to exclude sensitive directories, or ensure your codebase is fully de-identified before working in an AI-assisted IDE.',
              },
              {
                q: 'Can masking tools guarantee HIPAA compliance?',
                a: 'No tool can guarantee compliance — HIPAA compliance is a comprehensive program of policies, training, technical controls, and risk management. Masking tools reduce the risk of PHI disclosure during AI-assisted development, but they are one control among many. Your organization\'s compliance program should also include a full risk assessment, workforce training, access controls, audit logging, and incident response planning.',
              },
            ]}
          />

          <div className="my-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-[13px] text-zinc-600">
              Related reading: <Link href="/blog/how-to-use-ai-for-mysql-without-exposing-database-schema" className="font-medium text-emerald-600 hover:underline">How to Use AI for MySQL Without Exposing Your Database Schema</Link> · <Link href="/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure" className="font-medium text-emerald-600 hover:underline">How to Mask JSON Payloads Before Sending to AI</Link>
            </p>
          </div>
        </article>

        <section className="mt-10">
          <BlogSocialShare
            title="HIPAA-Compliant AI Development: How to Use ChatGPT Without Exposing Patient Data"
            description="Learn the client-side masking approach that lets healthcare developers use ChatGPT safely — without ever exposing PHI, SQL schema, or API secrets."
            variant="full"
          />
        </section>
        <section className="mt-8"><NewsletterSignup /></section>
        <section className="mt-8"><FeedbackForm toolName="HIPAA-Compliant AI Development Guide" /></section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
