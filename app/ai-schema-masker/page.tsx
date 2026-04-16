import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import AiSchemaMaskerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/ai-schema-masker';

export const metadata: Metadata = {
  title: "AI SQL Schema Masker — Hide Table & Column Names Before Sending to ChatGPT | UnblockDevs",
  description:
    "Mask SQL identifiers before sending to AI. Tables become T_001, columns C_001 — fully reversible. Free, 100% browser-based, nothing sent to servers.",
  keywords: [
    'mask sql before chatgpt',
    'hide table names from chatgpt',
    'sql schema privacy chatgpt',
    'safe way to use chatgpt with database',
    'chatgpt sql without exposing schema',
    'mask database schema ai',
    'anonymize sql for ai',
    'sql identifier masking tool',
    'hide column names from ai',
    'chatgpt database security',
    'is it safe to paste sql into chatgpt',
    'chatgpt data privacy sql',
    'sql chatgpt privacy risk',
    'gdpr compliant ai sql tool',
    'hipaa safe ai coding assistant',
    'sql masking compliance ai',
    'anonymize database schema before ai',
    'data masking tool for ai prompts',
    'mask pii before sending to llm',
    'how to use chatgpt for sql without leaking schema',
    'mask table names before sending to chatgpt',
    'sql column name masking for ai prompts',
    'sql schema anonymizer for chatgpt',
    'AI schema masker',
    'client-side SQL masking',
    'DITE deterministic masking',
    'hipaa compliant developer tools',
    'hipaa safe api testing',
    'hipaa compliant json masking',
    'mask phi before chatgpt',
    'phi masking tool developer',
    'soc 2 compliant developer tools',
    'soc 2 data masking',
    'pci dss compliant api testing',
    'ccpa compliant tools',
    'hide schema from ai',
    'mask table names ai',
    'anonymize database schema',
    'schema privacy chatgpt',
    'schema masker tool',
    'sql schema anonymizer',
    'database schema obfuscator',
    'hide column names chatgpt',
    'mask schema gpt4',
    'database privacy ai',
    'schema before chatgpt',
    'safe chatgpt sql',
    'mask database schema online',
    'anonymize sql schema free',
    'schema alias generator',
    'hide sensitive schema',
    'protect ip database',
    'schema nda compliance',
    'database schema security',
    'mask foreign keys',
    'table name anonymizer',
    'column alias generator',
    'schema mapping file',
    'schema restore original',
    'schema round trip',
    'mask schema openai',
    'mask schema claude',
    'mask schema gemini',
    'ai coding assistant privacy',
    'cursor ai privacy',
    'github copilot privacy',
    'schema masker free',
    'schema masker browser',
    'schema privacy tool developer',
  ],
  openGraph: {
    title: "AI SQL Schema Masker — Hide Table & Column Names Before ChatGPT | UnblockDevs",
    description:
      "Mask SQL identifiers before sending to AI. Tables → T_001, columns → C_001. Fully reversible, 100% in your browser. No server, no signup.",
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI SQL Schema Masker — Hide Schema Before ChatGPT | UnblockDevs",
    description: "Mask SQL before sending to AI. Fully reversible. 100% browser-based, nothing sent to servers.",
  },
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0d9488',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: "AI SQL Schema Masker — Hide Table & Column Names Before ChatGPT",
  description:
    "Mask SQL identifiers before sending to AI. Tables become T_001, columns C_001 — fully reversible. Free, 100% browser-based. Nothing sent to servers. Safe for GDPR, HIPAA, and PCI-DSS workflows.",
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2500',
    bestRating: '5',
  },
  featureList: [
    '100% data security – all processing in your browser',
    'Client-side only – no data sent to any server',
    'World\'s first client-side DITE-based SQL identifier masking',
    'Mask raw SQL or build prompts from schema with JOIN support',
    'Deterministic mapping – restore AI output to original identifiers',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I mask SQL schema before sending to AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your SQL or schema into the AI Schema Masker. The tool replaces table and column names with deterministic placeholders (e.g. T_001, C_001). Send the masked version to ChatGPT or any AI. Use the mapping to convert AI-generated SQL back to your real identifiers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does the AI Schema Masker send my database structure to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All processing is client-side. Your SQL and schemas never leave your browser. No account or upload is required.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is SQL schema masking for AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SQL schema masking replaces real table and column names with anonymous placeholders before you paste code or schema into an AI. This lets you get help without exposing your real database structure. You can restore AI output to your names using a mapping.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my real table names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. When you paste SQL into ChatGPT, the model and OpenAI see every identifier—table names, column names, and aliases. To hide them, mask your SQL first with a client-side tool so only placeholders (e.g. T_001, C_001) are sent. Then restore AI output using the mapping.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does OpenAI store the SQL I paste?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'OpenAI may retain inputs for abuse detection and product improvement. Their policy states that API data is not used to train models by default, but pasting raw SQL still exposes your schema. Mask identifiers before sending so no real table or column names leave your control.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I mask SQL before sending to AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use a client-side SQL schema masker: paste your SQL, run the masker to replace table and column names with placeholders (e.g. T_001, C_001), then paste the masked version into ChatGPT or any AI. Keep the mapping to restore AI-generated SQL to your real identifiers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is SQL identifier masking?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SQL identifier masking replaces real table names, column names, and aliases with anonymous placeholders (e.g. T_001, C_001) so you can share SQL with AI or others without exposing your database structure. A mapping lets you reverse the process and restore original names.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is this tool safe for enterprise use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The AI Schema Masker runs entirely in your browser—no SQL or schema is sent to any server. That makes it suitable for teams under GDPR, HIPAA, or PCI-DSS who need to use AI for SQL without exposing real identifiers or PII.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Why mask my schema before using AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'When you paste raw SQL into ChatGPT, the AI provider sees your real table and column names which can reveal your data model, business domain, and naming conventions. Masking replaces identifiers with anonymous tokens so the AI can still help with query logic without seeing your real schema.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How does the schema masker work?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The masker parses your SQL or schema definition and replaces table names with T_001, T_002 etc. and column names with C_001, C_002 etc. using deterministic mapping — the same name always gets the same token. You send the masked SQL to AI, then use the mapping to restore original names in the AI response.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I use masked schemas with GitHub Copilot?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Copy the masked SQL and paste it into your Copilot chat or inline prompt. Copilot will work with the placeholder names and generate SQL using T_001, C_001 etc. Paste the generated SQL back into the Restore section to swap all placeholders back to your real identifiers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I restore original names after AI generates SQL?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste the AI-generated SQL (which uses placeholder names like T_001, C_001) into the Restore section. The tool applies the saved mapping and replaces every placeholder with its original table or column name. Download the mapping file first if working across sessions.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does it support stored procedures?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The masker works on the SQL text level, so it can mask table and column references inside stored procedure bodies. However, procedure names and parameter names are also treated as identifiers and can be masked. Test on a small procedure first to verify the output before masking production code.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my schema data sent to any server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All processing happens in your browser using JavaScript. Your SQL, schema, and mapping data never leave your device. You can verify this by opening browser DevTools and checking network requests — no outbound requests are made when you click Mask.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is schema IP?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Schema IP (Intellectual Property) refers to the proprietary database design that reflects your business logic, naming conventions, and data relationships. Exposing your schema to AI providers reveals your architecture to a third party. Masking protects this IP while still allowing AI assistance with SQL logic.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I mask multiple schemas at once?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Paste SQL that references tables from multiple schemas in a single session. The masker maintains a single consistent mapping across all tables in the input, so cross-schema JOINs and references are masked consistently and can be restored from the same mapping file.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Mask Database Schema for AI Prompts',
  description: 'Step-by-step guide to masking SQL schema identifiers before sending to AI tools like ChatGPT or Claude.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your SQL or schema', text: 'Paste raw SQL, a CREATE TABLE statement, or build a schema from tables and columns using the schema builder.' },
    { '@type': 'HowToStep', position: 2, name: 'Mask identifiers', text: 'Click Mask. Every table name becomes T_001, every column name becomes C_001 — deterministically, so the same name always maps to the same token.' },
    { '@type': 'HowToStep', position: 3, name: 'Send masked version to AI', text: 'Copy the masked SQL and paste it into ChatGPT, Claude, or any AI. Only placeholders are sent — your real schema stays in your browser.' },
    { '@type': 'HowToStep', position: 4, name: 'Restore AI output', text: 'Paste the AI response into the Restore section. The mapping replaces every placeholder back to your real table and column names.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'AI SQL Schema Masker', item: canonicalUrl },
  ],
};

export default function AiSchemaMaskerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div id="tool">
        <AiSchemaMaskerClient />
      </div>

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is an AI Schema Masker?">
          <SEOProse>
            An <strong>AI Schema Masker</strong> replaces real table names, column names, and SQL
            identifiers with anonymous placeholders before you paste a schema or query into an AI
            tool. When you paste raw SQL into ChatGPT, OpenAI servers see your actual database
            structure — including table names that can reveal your product domain, naming conventions,
            and data relationships. Masking first means only placeholders like <C>T_001</C> and{' '}
            <C>C_001</C> are ever sent; your real identifiers stay in your browser.
          </SEOProse>
          <SEOProse>
            The masking is <strong>deterministic and reversible</strong>: the same identifier always
            maps to the same placeholder, so you can paste the AI&apos;s response back and restore
            your real names in one click. This makes it practical for GDPR, HIPAA, and PCI-DSS teams
            who need AI assistance for SQL work without violating data handling policies.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Mask Schemas in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your SQL or schema', desc: 'Paste raw SQL, a CREATE TABLE statement, or build a schema from tables and columns using the schema builder.' },
            { n: '02', title: 'Mask identifiers', desc: 'Click Mask. Every table name becomes T_001, every column name becomes C_001 — deterministically, so the same name always maps to the same token.' },
            { n: '03', title: 'Send masked version to AI', desc: 'Copy the masked SQL and paste it into ChatGPT, Claude, or any AI. Only placeholders are sent — your real schema stays in your browser.' },
            { n: '04', title: 'Restore AI output', desc: 'Paste the AI\'s response into the Restore section. The mapping replaces every placeholder back to your real table and column names.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Mask Schemas">
          <UseCases cases={[
            { icon: '🤖', title: 'AI Pair Programming', desc: 'Get SQL help from AI without exposing your production schema. Mask identifiers, get the query, restore real names.' },
            { icon: '💬', title: 'ChatGPT & Claude Queries', desc: 'Ask AI to write or optimize SQL. Send the masked schema so the model has context without seeing your real table names.' },
            { icon: '🔍', title: 'Code Review With AI', desc: 'Share SQL for review without leaking your database naming conventions or proprietary schema structure.' },
            { icon: '🗄️', title: 'SQL Generation', desc: 'Describe your schema to AI using masked identifiers. AI generates correct SQL; you restore real names from the mapping.' },
            { icon: '🔗', title: 'API Design', desc: 'Discuss API data models and database backing with AI safely — mask the schema before describing your architecture.' },
            { icon: '📄', title: 'Documentation', desc: 'Generate schema documentation with AI assistance. Mask identifiers in examples so you can share docs publicly without exposing real names.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="FAQ">
          <FAQ items={[
            {
              q: 'What gets masked — and what stays visible?',
              a: 'Table names and column names are replaced with T_001, C_001 style placeholders. SQL keywords (SELECT, FROM, WHERE, JOIN, etc.), operators, and numeric literals are left unchanged so the AI can still understand the query structure.',
            },
            {
              q: 'Is the masking reversible?',
              a: 'Yes. The tool uses deterministic masking: the same identifier always produces the same placeholder. The mapping is available in-page and can be downloaded as a JSON file. Paste the AI\'s SQL response into the Restore section and apply the mapping to get your real identifiers back.',
            },
            {
              q: 'Does it work for both SQL and JSON schemas?',
              a: 'Yes. You can paste raw SQL statements or use the schema builder to describe tables and columns in JSON-like form. Both modes mask identifiers before generating the prompt you send to AI.',
            },
            {
              q: 'Is this tool compliant with GDPR, HIPAA, and PCI-DSS?',
              a: 'The tool runs 100% in your browser — no SQL, schema, or mapping is ever uploaded to any server. That means no third-party data exposure from the masking step itself, which helps teams meet compliance requirements when using AI for database work.',
            },
            {
              q: 'Can teams share masking mappings?',
              a: 'Yes. Download the mapping as a JSON file and share it with teammates. Anyone with the file can restore AI-generated SQL to the real identifier names, enabling team workflows where one person masks, one uses AI, and another restores.',
            },
            {
              q: 'Why mask my schema before using AI?',
              a: 'Pasting raw SQL into ChatGPT exposes your real table and column names to the AI provider. Masking replaces identifiers with anonymous tokens so the AI helps with query logic without seeing your real schema or business domain.',
            },
            {
              q: 'How does the schema masker work?',
              a: 'The masker replaces table names with T_001, T_002 and column names with C_001, C_002 using deterministic mapping. Send the masked SQL to AI, then use the mapping to restore original names in the AI response.',
            },
            {
              q: 'Can I use masked schemas with GitHub Copilot?',
              a: 'Yes. Paste masked SQL into your Copilot prompt. Copilot generates SQL using placeholder names. Paste the result into the Restore section to swap all placeholders back to your real identifiers.',
            },
            {
              q: 'How do I restore original names after AI generates SQL?',
              a: 'Paste the AI-generated SQL into the Restore section. The tool applies the saved mapping and replaces every T_001, C_001 placeholder with the original table or column name.',
            },
            {
              q: 'Does it support stored procedures?',
              a: 'The masker works at the SQL text level and can mask table and column references inside stored procedure bodies. Test on a small procedure first to verify output before masking production code.',
            },
            {
              q: 'Is my schema data sent to any server?',
              a: 'No. All processing happens in your browser. Your SQL, schema, and mapping never leave your device. You can verify by checking network requests in browser DevTools — no outbound requests are made.',
            },
            {
              q: 'What is schema IP?',
              a: 'Schema IP (Intellectual Property) is your proprietary database design that reveals your business logic and naming conventions. Masking protects this IP while still allowing AI assistance with SQL query logic.',
            },
            {
              q: 'Can I mask multiple schemas at once?',
              a: 'Yes. Paste SQL referencing tables from multiple schemas. The masker maintains a consistent mapping across all tables, so cross-schema JOINs are masked consistently and can be restored from the same mapping file.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Mask API keys, secrets, and variables in code before sending to AI', icon: '🛡️' },
            { href: '/json-prompt-shield', label: 'JSON Prompt Shield', desc: 'Mask JSON keys and string values before pasting into ChatGPT', icon: '🔒' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate SHA-256, MD5, and other hashes for data integrity', icon: '#️⃣' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode and decode Base64 strings in your browser', icon: '🔤' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'AI Privacy in JSON APIs' },
            { href: '/blog/json-best-practices-production-guide', label: 'Masking PII in Production' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Safe AI Prompt Engineering' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'JSON Schema for AI Tools' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="ai_schema_masker" />
    </>
  );
}
