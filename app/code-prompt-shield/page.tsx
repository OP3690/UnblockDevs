import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import CodePromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/code-prompt-shield';

export const metadata: Metadata = {
  title: 'Code Prompt Shield — Mask API Keys, Variables & Secrets Before Sending Code to ChatGPT | UnblockDevs',
  description:
    'Mask API keys, secrets, variables, and PII in your code before sending to ChatGPT, Claude, Copilot, or Gemini. Pre-scan detects risks before you share. 18 languages supported. Fully reversible. 100% browser-based.',
  keywords: [
    'mask code before chatgpt',
    'hide api keys from chatgpt',
    'mask variables before ai',
    'code privacy chatgpt',
    'hide secrets from ai coding assistant',
    'mask function names before ai',
    'code masking tool for ai',
    'sanitize code before chatgpt',
    'mask identifiers before sending to ai',
    'is it safe to paste api keys into chatgpt',
    'remove api keys before sending to ai',
    'accidentally pasted api key into chatgpt',
    'how to safely share code with chatgpt',
    'strip secrets from code before ai',
    'github copilot code privacy',
    'hide secrets from github copilot',
    'mask code before copilot',
    'claude code privacy secrets',
    'cursor ai code privacy',
    'mask pii in code before ai',
    'gdpr compliant ai coding',
    'hipaa safe ai code assistant',
    'is it safe to paste code into chatgpt',
    'can chatgpt see my api keys',
    'does chatgpt store the code i paste',
    'how do i hide secrets when using chatgpt for coding',
    'how to use ai for coding without exposing secrets',
    'Code Prompt Shield',
    'mask code for AI',
    'hipaa compliant developer tools',
    'hipaa safe coding assistant',
    'soc 2 compliant developer tools',
    'pci compliant developer tools',
    'mask credit card data before ai',
    'ccpa compliance developer',
  ],
  openGraph: {
    title: 'Code Prompt Shield — Mask API Keys & Secrets Before ChatGPT | UnblockDevs',
    description:
      'Mask API keys, variables, and PII in your code before sending to ChatGPT or Copilot. Fully reversible. Free, 100% browser-based. Nothing leaves your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Prompt Shield — Mask API Keys & Secrets Before ChatGPT | UnblockDevs',
    description: 'Mask code before sending to AI. Fully reversible. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Code Prompt Shield — Mask API Keys, Variables & Secrets Before ChatGPT',
  description:
    'Mask API keys, function names, variables, and PII in your code before sending to ChatGPT or GitHub Copilot. Fully reversible. Free, 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Mask variables, function names, class names before sending to AI',
    'Detect and mask API keys, JWT tokens, DB connection strings, OAuth tokens, PII',
    'Pre-scan: analyze risks before masking — see what will be protected',
    'Custom secret patterns: add your own regex patterns for extra protection',
    'Strip comments before masking — send cleaner, leaner code to AI',
    '9 AI prompt templates: code review, bug report, security audit, performance, docs, refactor, tests, explain',
    '100% client-side — no code or mapping sent to any server',
    'Fully reversible — restore AI response with original identifiers',
    '18 languages: JavaScript, TypeScript, Python, Java, Go, SQL, JSON, C#, PHP, Rust, Ruby, Swift, Kotlin, Bash, YAML, TOML, C/C++, XML',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '850',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste code with API keys into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Pasting code with real API keys or secrets into ChatGPT sends them to OpenAI servers. Use Code Prompt Shield at unblockdevs.com/code-prompt-shield to mask all secrets before sending — fully reversible after AI responds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my function and variable names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. All identifiers in code you paste into ChatGPT are visible to OpenAI and may be retained. Code Prompt Shield masks variable names, function names, and class names before you send.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I hide API keys from ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your code into Code Prompt Shield. API keys and secrets are detected and masked automatically. Send the masked version to ChatGPT, then restore your real values after with one click.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use ChatGPT for coding without leaking secrets?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your code into Code Prompt Shield. API keys, variables, and function names are masked with generic tokens. Send the masked version to ChatGPT, get help with the logic, then restore your real identifiers after.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does GitHub Copilot see my API keys?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'GitHub Copilot processes code in your editor, including any hardcoded secrets or API keys present in the file. Masking code before sending to ChatGPT or other AI tools adds a security layer; use Code Prompt Shield to strip secrets before pasting elsewhere.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What languages does Code Prompt Shield support?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '18 languages: JavaScript, TypeScript, Python, Java, Go, SQL, JSON, C#, PHP, Rust, Ruby, Swift, Kotlin, Bash/Shell, YAML, TOML, C/C++, and XML/HTML.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Mask Code Secrets Before Sending to AI',
  description: 'Step-by-step guide to shielding sensitive identifiers and secrets in code before pasting into AI assistants.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your code', text: 'Paste any source code — JavaScript, Python, SQL, TypeScript, Go, or other supported languages. Select the language for accurate identifier detection.' },
    { '@type': 'HowToStep', position: 2, name: 'Auto-detect secrets', text: 'The tool scans for API keys, JWT tokens, database URLs, OAuth tokens, private keys, IP addresses, emails, and phone numbers — no configuration needed.' },
    { '@type': 'HowToStep', position: 3, name: 'Mask with placeholders', text: 'Click Mask. Secrets become SECRET_XXXX, variables become VAR_XXXX. The mapping is deterministic and stored locally in your browser.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy safe version & restore', text: 'Copy the masked code and send it to AI. Paste the AI response into the Restore section and apply the mapping to get your real identifiers back.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Code Prompt Shield', item: canonicalUrl },
  ],
};

export default function CodePromptShieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div id="tool">
        <CodePromptShieldClient />
      </div>

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is Code Prompt Shield?">
          <SEOProse>
            <strong>Code Prompt Shield</strong> masks sensitive values in your source code before you
            paste it into an AI tool. Every time a developer shares code with ChatGPT, Claude, or
            GitHub Copilot, secrets leak: API keys hardcoded in environment setup, JWT tokens in test
            fixtures, database URLs in config files, OAuth credentials left in commented code. Even
            if you think you removed them, pattern matching can pick up values you missed.
          </SEOProse>
          <SEOProse>
            Code Prompt Shield automatically detects and replaces secrets, variable names, function
            names, and PII with generic placeholders — <C>SECRET_ABCD</C>, <C>VAR_EFGH</C> — before
            anything leaves your browser. You get useful AI help with logic and structure; the AI
            never sees your real credentials or proprietary identifiers. After the AI responds, paste
            the output back and restore everything in one click.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Shield Code in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your code', desc: 'Paste any source code — JavaScript, Python, SQL, TypeScript, Go, or other supported languages. Select the language for accurate identifier detection.' },
            { n: '02', title: 'Auto-detect secrets', desc: 'The tool scans for API keys, JWT tokens, database URLs, OAuth tokens, private keys, IP addresses, emails, and phone numbers — no configuration needed.' },
            { n: '03', title: 'Mask with placeholders', desc: 'Click Mask. Secrets become SECRET_XXXX, variables become VAR_XXXX, functions become VAR_XXXX. The mapping is deterministic and stored locally.' },
            { n: '04', title: 'Copy safe version & restore', desc: 'Copy the masked code and send it to AI. Paste the AI response into the Restore section and apply the mapping to get your real identifiers back.' },
          ]} />
        </SEOSection>

        {/* What it detects */}
        <SEOSection id="detects" heading="What Code Prompt Shield Detects">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-6 font-semibold text-zinc-700">Secret type</th>
                  <th className="pb-3 font-semibold text-zinc-700">Examples detected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['API keys', 'STRIPE_SECRET, OPENAI_API_KEY, AWS access keys'],
                  ['JWT tokens', 'eyJhbGciOi… bearer tokens in headers'],
                  ['Passwords', 'password=, passwd=, pwd= assignments'],
                  ['Database URLs', 'postgres://, mysql://, mongodb+srv:// connection strings'],
                  ['Private keys', '-----BEGIN RSA PRIVATE KEY-----'],
                  ['OAuth tokens', 'client_secret=, access_token=, refresh_token='],
                  ['Webhook secrets', 'webhook_secret, HMAC signing keys'],
                  ['IP addresses', 'IPv4 literals in string values'],
                ].map(([type, example]) => (
                  <tr key={type}>
                    <td className="py-3 pr-6 font-semibold text-zinc-900">{type}</td>
                    <td className="py-3 text-zinc-500">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Code Shield">
          <UseCases cases={[
            { icon: '🔍', title: 'AI Code Review', desc: 'Share code with AI for review without leaking secrets, proprietary function names, or internal variable conventions.' },
            { icon: '🐛', title: 'Bug Reports', desc: 'Paste failing code into AI for debugging. Secrets and identifiers are masked so you can share context safely.' },
            { icon: '💬', title: 'Stack Overflow Posts', desc: 'Prepare code to post publicly. Mask credentials and PII before copying so no sensitive values appear in public forums.' },
            { icon: '📄', title: 'Documentation', desc: 'Generate code docs with AI help. Mask real identifiers in examples before sending so documentation examples use safe placeholders.' },
            { icon: '👥', title: 'Pair Programming', desc: 'Use AI as a pair programmer on proprietary code. Mask variables and function names to protect your architecture while getting logic help.' },
            { icon: '🌐', title: 'Open Source Contributions', desc: 'Extract logic from private codebases for open source. Mask private identifiers before sharing snippets externally.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="FAQ">
          <FAQ items={[
            {
              q: 'Is the masking reversible?',
              a: 'Yes. Masking is deterministic — the same original token always produces the same placeholder. The mapping is shown in-page and can be downloaded as a JSON or .maskmap file. Paste the AI\'s response and click Restore to get your real identifiers back.',
            },
            {
              q: 'What patterns are detected for secrets?',
              a: 'The tool detects API key assignments (api_key=, secret=, token=, password=), JWT token format (eyJ…), AWS access key prefixes (AKIA…), database connection strings (postgres://, mysql://, mongodb://), RSA/EC private key headers, and common OAuth patterns. Emails, phone numbers, and IP addresses are flagged as PII.',
            },
            {
              q: 'What about false positives — will it mask code I need visible?',
              a: 'Secret detection targets known patterns, so most code logic is unaffected when only "Secrets" is enabled. Enable "Identifiers" to also mask variable and function names — that is a broader mask, useful when you want to hide your entire naming convention from AI. You can toggle each category independently.',
            },
            {
              q: 'Can my team share mappings?',
              a: 'Yes. Download the mapping as a .json or .maskmap file and share it with teammates. Anyone with the mapping file can restore AI-generated code to your real identifier names — enabling workflows where one person masks, AI assists, and another restores.',
            },
            {
              q: 'How do I compare original and masked code?',
              a: 'After masking, use the Original / Masked tab in the output panel to toggle between the two views. This lets you confirm which identifiers were replaced before you send the masked version to AI.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-prompt-shield', label: 'JSON Prompt Shield', desc: 'Mask JSON keys and string values before pasting into ChatGPT', icon: '🔒' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask SQL table and column names before sending to AI', icon: '🗄️' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate SHA-256, MD5, and other hashes for data integrity', icon: '#️⃣' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode and decode Base64 strings in your browser', icon: '🔤' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/why-pasting-code-into-chatgpt-is-dangerous', label: 'Why Pasting Code into ChatGPT Is Dangerous' },
            { href: '/blog/how-to-share-code-with-ai-safely', label: 'How to Share Code with AI Safely' },
            { href: '/blog/api-key-leak-prevention-ai-tools', label: 'API Key Leak Prevention When Using AI Tools' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="code_prompt_shield" />
    </>
  );
}
