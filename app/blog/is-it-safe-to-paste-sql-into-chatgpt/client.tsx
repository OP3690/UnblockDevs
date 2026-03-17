'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Database, ExternalLink } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function IsItSafeToPasteSqlIntoChatgptClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Is It Safe to Paste SQL Into ChatGPT?</h1>
              <p className="text-sm text-gray-500 mt-1">Risks, what gets exposed, and how to mask schema and data before sending to AI</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="Is It Safe to Paste SQL Into ChatGPT?"
        description="Risks and how to mask schema and data before sending to AI"
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'Is it safe to paste SQL into ChatGPT?',
              answer: 'Pasting raw SQL into ChatGPT sends your table names, column names, and sometimes data to OpenAI. That can expose your database schema and business logic. If the SQL contains real data or PII, you risk privacy and compliance issues. To stay safe, mask table and column names (and sensitive values) before pasting, then restore them after you get the AI response. Use a tool like AI Schema Masker to do this automatically.',
            },
            {
              question: 'What does ChatGPT do with pasted SQL?',
              answer: 'ChatGPT uses your input to train or improve models unless you opt out, and it is processed on their servers. So table names, column names, and any data in the SQL are sent to OpenAI. Even if you trust the provider, masking schema and PII is best practice for compliance (e.g. HIPAA, SOC2) and to avoid leaking internal structure.',
            },
            {
              question: 'How do I mask database tables before sending to ChatGPT?',
              answer: 'Replace real table and column names with generic placeholders (e.g. Table_A, Col_1) before pasting into ChatGPT. Keep a mapping so you can restore the original names after. You can do this manually or use a tool like AI Schema Masker at unblockdevs.com/ai-schema-masker: paste your SQL or schema, get a masked version, send that to ChatGPT, then unmask the response.',
            },
            {
              question: 'Can I paste SQL with real data into ChatGPT?',
              answer: 'You should not paste SQL that contains real customer data, PII, or secrets. Even for “structure only” questions, table and column names often reveal business logic. Mask schema (and any sensitive literals) first, then paste the masked version. For code that contains API keys or credentials, use Code Prompt Shield instead.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Short answer: <strong>pasting raw SQL into ChatGPT is not safe</strong> if that SQL contains real table names, column names, or data. You expose your database structure and possibly sensitive information to a third party. The good news: you can get the same help from AI by <strong>masking your schema and data first</strong>, then restoring it after. Here’s what’s at risk and how to do it safely.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              What You Expose When You Paste SQL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you paste SQL into ChatGPT, you’re sending:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Table and view names</strong> — e.g. <code className="bg-gray-100 px-1 rounded">users</code>, <code className="bg-gray-100 px-1 rounded">payments</code>, <code className="bg-gray-100 px-1 rounded">internal_audit_log</code></li>
              <li><strong>Column names</strong> — e.g. <code className="bg-gray-100 px-1 rounded">email</code>, <code className="bg-gray-100 px-1 rounded">ssn</code>, <code className="bg-gray-100 px-1 rounded">credit_card_last4</code></li>
              <li><strong>Literal values in the SQL</strong> — IDs, names, or other data you typed into the query</li>
              <li><strong>Business logic</strong> — how your schema is structured and what it’s used for</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              That’s enough to leak internal design and, if real data is present, to create privacy and compliance risk (HIPAA, GDPR, etc.). So the safe approach is: <strong>don’t send real schema or real data</strong>. Send a masked version instead.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-teal-600" />
              How to Safely Use ChatGPT With SQL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>1. Mask table and column names.</strong> Replace real identifiers with placeholders (e.g. <code className="bg-gray-100 px-1 rounded">users</code> → <code className="bg-gray-100 px-1 rounded">T1</code>, <code className="bg-gray-100 px-1 rounded">email</code> → <code className="bg-gray-100 px-1 rounded">C1</code>). Keep a mapping file so you can convert the AI’s response back to your real names.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>2. Remove or mask literal data.</strong> Don’t paste SQL that contains real IDs, names, or PII. Use placeholders or generic examples.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>3. Paste the masked SQL into ChatGPT</strong>, get the explanation or rewritten query, then <strong>4. Unmask</strong> using your mapping so you can run the final SQL against your real schema.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Doing this by hand is error-prone. A dedicated tool can mask and unmask consistently and give you a reversible mapping — so you never send real schema or data to the AI.
            </p>
          </section>

          <section className="mb-10">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-emerald-900 text-sm">
                <strong>Summary:</strong> Pasting raw SQL into ChatGPT is not safe if it contains real schema or data. Mask table and column names (and sensitive values) before sending, use the AI output with the masked version, then unmask the result. That way you get AI help without exposing your database.
              </p>
            </div>
          </section>

          <section className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Mask SQL and schema before sending to AI
            </h2>
            <p className="text-emerald-100 text-sm mb-4">
              Our free <strong>AI Schema Masker</strong> replaces table and column names with placeholders and gives you a mapping file. Paste your SQL or schema → get a safe, masked version → send that to ChatGPT → unmask the response. All in the browser; nothing is sent to our servers.
            </p>
            <Link
              href="/ai-schema-masker"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Open AI Schema Masker
              <ExternalLink className="w-4 h-4" />
            </Link>
            <p className="text-emerald-200 text-xs mt-3">
              For JSON payloads use <Link href="/json-prompt-shield" className="underline">JSON Prompt Shield</Link>; for code with secrets use <Link href="/code-prompt-shield" className="underline">Code Prompt Shield</Link>. In healthcare or regulated contexts, see <Link href="/blog/hipaa-compliant-ai-development" className="underline">HIPAA-Compliant AI Development</Link>.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
