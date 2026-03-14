'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, FileCode, FileJson, Database, Lock, Stethoscope } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function HipaaCompliantAiClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">HIPAA-Compliant AI Development — How to Use ChatGPT Without Exposing Patient Data</h1>
          <p className="text-sm text-gray-500 mt-1">Mask PHI, SQL schema, JSON, and code in your browser before sending to AI. No data leaves your device.</p>
        </div>
      </header>

      <BlogSocialShare title="HIPAA-Compliant AI Development — Use ChatGPT Without Exposing Patient Data" description="Mask before AI. Client-side only. HIPAA-safe workflow." variant="floating" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'Can I use ChatGPT with patient data and stay HIPAA compliant?',
              answer: 'Not by pasting raw patient data, SQL with real table/column names, or JSON with PHI into ChatGPT. HIPAA generally prohibits disclosing PHI to third parties without a BAA. When you paste into an AI, that data is processed (and often stored) by the provider. To use AI safely: mask identifiers and PHI in your browser with client-side tools so only placeholders are sent, then restore the AI response locally. No PHI ever leaves your device.',
            },
            {
              question: 'What counts as PHI when using AI coding assistants?',
              answer: 'PHI includes any identifier that can link to a patient: names, dates (birth, admission), IDs, SSN, MRN, email, phone, and often table/column names that reveal clinical concepts (e.g. diagnosis_codes, patient_ssn). SQL schema, API responses with patient fields, and code containing such identifiers all need to be masked before sending to ChatGPT or any AI if you want to stay within HIPAA-safe practices.',
            },
            {
              question: 'Does masking SQL schema help with HIPAA?',
              answer: 'Yes. Table and column names often reveal what data you hold (e.g. patient_demographics, lab_results). Sending raw SQL or schema to an AI sends those identifiers to a third party. Masking replaces them with placeholders (e.g. T_001, C_001) in your browser; you send only the masked version to the AI and restore the response locally. Your real schema and any PHI in identifiers never leave your control.',
            },
            {
              question: 'Do I need a BAA with OpenAI to use ChatGPT for healthcare code?',
              answer: 'Using ChatGPT for code while avoiding PHI disclosure is a policy decision. Many healthcare organizations require a BAA before any PHI is processed by a vendor. Even with a BAA, sending raw schema or payloads can create audit and compliance overhead. Masking PHI and identifiers before sending reduces risk and keeps the AI interaction out of scope of PHI processing.',
            },
            {
              question: 'Where does masking run — my machine or a server?',
              answer: 'Use client-side-only tools. Masking runs entirely in your browser: your SQL, JSON, or code never leaves your device. Only you then paste the already-masked text into the AI. No server sees your schema, keys, or PHI. That keeps the workflow suitable for HIPAA-conscious development.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Healthcare developers need AI to move fast — but pasting patient data, database schema, or API payloads into ChatGPT can violate HIPAA and put PHI at risk.</strong> The fix is simple: mask identifiers and sensitive data in your browser before anything is sent to an AI. Use the masked version with ChatGPT, get help, then restore the AI&apos;s output locally. This guide explains why HIPAA and AI don&apos;t mix when PHI is in the prompt, and how to use client-side masking so you never expose patient data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
              Why HIPAA and Raw AI Prompts Don&apos;t Mix
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              HIPAA restricts how covered entities and their business associates handle <strong>protected health information (PHI)</strong>. When you paste SQL with real table names, JSON with patient fields, or code with identifiers into ChatGPT or any AI, that data is processed — and often retained — by a third party. Unless you have a Business Associate Agreement (BAA) and explicit policies, you are disclosing PHI outside your controlled environment. Even with a BAA, reducing PHI in AI prompts lowers risk and simplifies audits.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What to mask:</strong> Table and column names that reveal clinical or demographic data, JSON keys and string values that contain or label PHI, and code that includes API keys, connection strings, or variable names tied to patient data. Mask them to neutral placeholders (e.g. <code className="bg-gray-100 px-1 rounded">T_001</code>, <code className="bg-gray-100 px-1 rounded">K_00001</code>, <code className="bg-gray-100 px-1 rounded">S_00001</code>) in your browser; send only those placeholders to the AI.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              Risks of Pasting Unmasked Data Into AI
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>PHI disclosure:</strong> Patient names, MRNs, dates, and other identifiers sent to an AI provider may be stored or used in ways that violate HIPAA if not covered by a BAA and strict policies.</li>
              <li><strong>Schema exposure:</strong> SQL table and column names (e.g. <code className="bg-gray-100 px-1 rounded">lab_results</code>, <code className="bg-gray-100 px-1 rounded">patient_ssn</code>) reveal what data you hold and can be considered part of your data environment.</li>
              <li><strong>Audit and compliance:</strong> Once data is sent, proving you did not disclose PHI becomes harder. Client-side masking keeps PHI on your side and creates a clear boundary.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              HIPAA-Safe Workflow: Mask → AI → Restore
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>client-side masking workflow</strong> keeps PHI and identifiers on your device. (1) Paste your SQL, JSON, or code into a tool that runs entirely in your browser. (2) The tool replaces table/column names, keys, string values, or identifiers with deterministic placeholders. (3) Copy the masked output and paste it into ChatGPT or any AI. (4) When the AI responds, paste the response back into the tool and restore using the mapping. You get valid SQL, JSON, or code with your real names — and the AI never saw PHI or real schema.
            </p>
            <div className="my-6 p-6 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
              <h3 className="font-semibold text-gray-900 mb-3">HIPAA-safe AI flow</h3>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm font-medium">
                <span className="px-3 py-2 bg-white rounded-lg border border-emerald-200">SQL / JSON / Code</span>
                <span className="text-gray-400">→</span>
                <span className="px-3 py-2 bg-white rounded-lg border border-emerald-200">Mask (browser only)</span>
                <span className="text-gray-400">→</span>
                <span className="px-3 py-2 bg-white rounded-lg border border-emerald-200">Send to AI</span>
                <span className="text-gray-400">→</span>
                <span className="px-3 py-2 bg-emerald-100 rounded-lg border border-emerald-300">Restore locally</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-emerald-600" />
              Client-Side Only — No Server, No PHI in the Cloud
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For this to be HIPAA-safe, masking must run <strong>only in your browser</strong>. No SQL, JSON, or code is uploaded to any server. No mapping or identifiers are stored remotely. You build the mapping locally and optionally download it to restore later. The only data that ever leaves your device is the masked text you choose to paste into the AI. That keeps your workflow within control and avoids third-party processing of PHI.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools for SQL, JSON, and Code</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-teal-600" />
                  SQL / schema: AI Schema Masker
                </h3>
                <p className="text-gray-700 text-sm mb-3">Mask table and column names in SQL or schema before sending to AI. Tables → T_001, columns → C_001. Restore AI output to real names with one click.</p>
                <Link href="/ai-schema-masker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors">
                  Try AI Schema Masker
                </Link>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-violet-600" />
                  JSON / API: JSON Prompt Shield
                </h3>
                <p className="text-gray-700 text-sm mb-3">Mask JSON keys and string values (e.g. K_00001, S_00001) before pasting API responses or payloads into ChatGPT. Preserve structure; restore exactly.</p>
                <Link href="/json-prompt-shield" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors">
                  Try JSON Prompt Shield
                </Link>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-amber-600" />
                  Code / secrets: Code Prompt Shield
                </h3>
                <p className="text-gray-700 text-sm mb-3">Mask API keys, variables, and PII in source code before sending to ChatGPT or Copilot. Fully reversible in the browser.</p>
                <Link href="/code-prompt-shield" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors">
                  Try Code Prompt Shield
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>HIPAA-compliant AI development</strong> means not sending PHI or identifying schema to third-party AI. Use client-side tools to mask SQL identifiers, JSON keys/values, and code secrets in your browser. Send only masked text to ChatGPT or any AI; restore the response locally with your mapping. No PHI leaves your device, and you stay within a HIPAA-safe workflow. Used by healthcare and enterprise developers building HIPAA-compliant applications.
            </p>
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
              <p className="text-gray-800 font-medium mb-3">Try the full suite — all run 100% in your browser:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai-schema-masker" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors">
                  <Database className="w-5 h-5" />
                  AI Schema Masker
                </Link>
                <Link href="/json-prompt-shield" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors">
                  <FileJson className="w-5 h-5" />
                  JSON Prompt Shield
                </Link>
                <Link href="/code-prompt-shield" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors">
                  <FileCode className="w-5 h-5" />
                  Code Prompt Shield
                </Link>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              For masking SQL schema concepts, see <Link href="/blog/how-to-use-ai-for-mysql-without-exposing-database-schema" className="text-primary-600 hover:underline font-medium">How to Use AI for MySQL Without Exposing Your Database Schema</Link>. For JSON, see <Link href="/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure" className="text-primary-600 hover:underline font-medium">How to Mask JSON Payloads Before Sending to AI</Link>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
