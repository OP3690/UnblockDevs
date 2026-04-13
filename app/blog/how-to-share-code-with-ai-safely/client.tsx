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

export default function HowToShareCodeWithAiSafelyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Share Code with AI Safely — Complete Secure AI Coding Workflow</h1>
      <p className="lead">
        AI coding assistants — ChatGPT, Claude, GitHub Copilot, Gemini, Cursor — are now core
        developer tools. They write boilerplate, find bugs, optimize queries, and generate tests.
        But every paste of real code exposes secrets, proprietary logic, and personal data to
        third-party AI infrastructure. This guide gives you a complete, repeatable workflow for
        getting full AI help without exposing a single credential or proprietary identifier.
      </p>

      <StatGrid stats={[
        { value: '3 steps', label: 'Scan → Mask → Send to AI → Restore. Under 60 seconds for any code snippet', color: 'blue' },
        { value: '18', label: 'Languages supported: JS, TS, Python, Go, Java, SQL, Ruby, Swift, Kotlin, Bash, YAML, and more', color: 'violet' },
        { value: '9', label: 'AI prompt templates: code review, bug report, security audit, performance, docs, refactor, tests, explain', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Core Problem: AI Tools Receive Everything You Send" />
      <p>
        When you paste code into ChatGPT or Claude, the entire text of that prompt — including any
        API keys, database URLs, emails, IP addresses, and function names — is transmitted to the
        AI provider&apos;s servers. The AI does not need your real credentials to help you. It only
        needs the structure and logic of your code. The fix is to replace real values with safe
        placeholders before sending, then restore them after.
      </p>

      <p>
        This is code masking, and it works with any AI tool — ChatGPT, Claude, Copilot Chat,
        Gemini, Codeium, Tabnine, or any future assistant. The masking happens in your browser.
        The AI never sees your real identifiers.
      </p>

      <SectionHeader number={2} title="The Complete Secure Workflow" />

      <VerticalSteps steps={[
        {
          title: 'Step 1 — Open Code Prompt Shield',
          desc: 'Go to unblockdevs.com/code-prompt-shield. The tool runs entirely in your browser — nothing is sent to any server, including this one. All masking and restore logic executes in your local browser tab.',
        },
        {
          title: 'Step 2 — Select language and masking options',
          desc: 'Select your programming language from 18 options (JavaScript, TypeScript, Python, Go, Java, SQL, JSON, C#, PHP, Rust, Ruby, Swift, Kotlin, Bash, YAML, TOML, C/C++, XML). Enable "Identifiers" to mask variable/function names, "Secrets" to mask API keys and credentials, and "PII" to mask emails, phone numbers, and IP addresses.',
        },
        {
          title: 'Step 3 — Click "Scan first" (optional but recommended)',
          desc: 'Before masking, click "Scan first" to see exactly what sensitive content is in your code. The scanner lists every detected secret, PII item, and schema reference with severity level (critical/high/medium/low) and occurrence count. No masking happens yet — this is purely an audit step.',
        },
        {
          title: 'Step 4 — Add custom patterns if needed',
          desc: 'Open Advanced Options to add custom regex patterns. If your company uses internal token formats (e.g., CORP-[A-Z]{4}-[0-9]{8}) or proprietary ID schemes, add the pattern here. It will be detected and masked as SECRET_XXXX along with the built-in patterns.',
        },
        {
          title: 'Step 5 — Click "Mask code"',
          desc: 'Click Mask code (or press Cmd/Ctrl+Enter). Every identifier, secret, and PII item is replaced with a deterministic placeholder — VAR_XXXX for variables/functions, SECRET_XXXX for credentials, PII_XXXX for personal data, TABLE_XXXX for SQL tables, KEY_XXXX for JSON/YAML keys. The stat badges show exactly how many of each type were masked.',
        },
        {
          title: 'Step 6 — Choose an AI prompt template',
          desc: 'Select a template from the dropdown: Code review, Bug report, Security audit, Performance, Documentation, Refactor, Write tests, or Explain code. The template prepends a context-setting instruction that tells the AI to use the same placeholder names in its response — which is essential for clean restoration.',
        },
        {
          title: 'Step 7 — Copy and paste into your AI tool',
          desc: 'Click ChatGPT, Claude, Copilot, or Gemini to copy the masked code (with template). Paste into your AI tool. Ask your question. The AI responds with full logic help using the masked placeholder names — it never sees your real identifiers.',
        },
        {
          title: 'Step 8 — Restore original identifiers',
          desc: 'Copy the AI\'s response. Paste it into the Restore panel in Code Prompt Shield. Click Restore. Every VAR_XXXX, SECRET_XXXX, and PII_XXXX placeholder is replaced back with the original real name. The restored code is production-ready.',
        },
      ]} />

      <SectionHeader number={3} title="What Gets Masked — By Category" />

      <CodeBlock lang="text" title="Masking categories and placeholder formats">
{`Category         Placeholder format   Examples detected
────────────────────────────────────────────────────────
Identifiers      VAR_XXXX            getUserOrders, fetchPaymentData, calculateChurn
                 FN_XXXX             (Bash function names)
Secrets          SECRET_XXXX         sk-proj-abc123, AKIA..., eyJh..., postgres://...
                                     ghp_tokens, xox-Slack-tokens, AIza-Google-keys
PII              PII_XXXX            user@example.com, +1-555-123-4567, 192.168.1.100
SQL tables       TABLE_XXXX          production.users, analytics.events
SQL columns      COL_XXXX            customer_email, lifetime_value, churn_risk_score
JSON/YAML keys   KEY_XXXX            "apiKey": ..., database_url: ...
XML tags         TAG_XXXX            <UserProfile>, <ApiConfig>
TOML sections    SEC_XXXX            [database], [production]`}
      </CodeBlock>

      <QuickFact color="violet" label="Same identifier → same placeholder everywhere">
        The masking is deterministic: <code>getUserOrders</code> always becomes the same{' '}
        <code>VAR_XXXX</code> in every occurrence — in function definitions, calls, imports, and
        JSDoc comments. This is what makes restoration lossless: every occurrence of the placeholder
        in the AI response maps back to the same original name.
      </QuickFact>

      <SectionHeader number={4} title="Choosing the Right AI Prompt Template" />
      <p>
        The prompt template matters. Telling the AI upfront that it is working with masked code and
        should preserve placeholder names in its response prevents the AI from renaming variables or
        using generic names that break restoration. Here are when to use each:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: '🔍 Code review',
          description:
            "Best for: general quality feedback, catching bugs, suggesting better patterns. The AI reviews the masked code and gives feedback referencing VAR_XXXX names. After restoration, the feedback references your real function names.",
        },
        {
          title: '🐛 Bug report',
          description:
            "Best for: a specific bug or unexpected behavior. Describe the bug after the masked code. The AI diagnoses the issue using placeholder names. Restore to get a diagnosis that references your real code.",
        },
        {
          title: '🛡️ Security audit',
          description:
            "Best for: checking for injection vulnerabilities, insecure patterns, missing input validation, or authentication flaws. The AI audits structure and logic — real credentials don't need to be present for a meaningful security review.",
        },
        {
          title: '⚡ Performance',
          description:
            "Best for: database query optimization, algorithm complexity analysis, identifying N+1 problems, suggesting caching strategies. Structural analysis works identically with masked names.",
        },
        {
          title: '📝 Documentation',
          description:
            "Best for: generating docstrings, JSDoc comments, README sections, or API documentation. The AI writes docs using placeholder names; restore to get docs with your real function and parameter names.",
        },
        {
          title: '🧪 Write tests',
          description:
            "Best for: generating unit tests, integration test stubs, or mock data. The AI writes test cases using masked names. After restoration, the tests reference your real functions and classes — ready to run.",
        },
      ]} />

      <SectionHeader number={5} title="Advanced: Custom Patterns for Company-Specific Secrets" />
      <p>
        The built-in detection covers all major public API key formats. But your company may use
        internal token formats, proprietary ID schemes, or custom authentication headers that the
        general patterns do not match. The Advanced Options panel lets you add custom regex
        patterns:
      </p>

      <CodeBlock lang="text" title="Custom pattern examples (one per line in the Advanced Options)">
{`# Internal session token format
SESS-[A-Za-z0-9]{32}

# Company service account credential
svc-[a-z]+-[0-9]{8}-[a-zA-Z0-9]{16}

# Internal API endpoint with sensitive subdomain
https://[a-z]+-internal\.company\.com/[a-zA-Z0-9/]+

# Legacy auth token format
AUTH:[A-Z]{2}[0-9]{6}:[a-zA-Z0-9+/]{44}==

# Custom payment reference
PAY-[A-Z]{3}-[0-9]{4}-[A-Z0-9]{8}`}
      </CodeBlock>

      <p>
        Any string matching a custom pattern is masked as <code>SECRET_XXXX</code> and fully
        restored after AI processing.
      </p>

      <SectionHeader number={6} title="Team Workflow: Sharing Mapping Files" />
      <p>
        For team-based AI workflows — where one developer masks code, another asks the AI, and a
        third restores — the mapping file enables collaboration without breaking the security model:
      </p>

      <AlertBox type="info" title="Download the mapping file for team workflows">
        After masking, click <strong>.maskmap</strong> or <strong>Mapping</strong> to download the
        mapping as a JSON file. Share this file (via secure internal channels — not email or Slack)
        with anyone who needs to restore AI responses. The mapping file contains the full
        placeholder-to-original-name table. Anyone with the file can restore any AI response back
        to real names.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Cross-session consistency',
          description:
            'Load a saved mapping file at the start of a new session to continue where you left off. Subsequent masks of related code will use the same placeholder assignments for identifiers that appeared in previous sessions — ensuring consistency across multi-session AI workflows.',
        },
        {
          title: 'Mapping file security',
          description:
            'The mapping file contains your real function names, variable names, and secret values. Treat it with the same access controls as the secrets themselves. Store it in a secrets manager or encrypted file store — not in a shared Google Drive or Slack channel.',
        },
        {
          title: 'CI/CD integration',
          description:
            'For automated code review workflows, the masking logic can be incorporated into pre-commit hooks or CI pipelines. Strip secrets before code reaches any AI-powered analysis tool — treat it as a pre-processing step in your pipeline.',
        },
        {
          title: 'Onboarding developers to the workflow',
          description:
            'Add Code Prompt Shield to your developer onboarding documentation alongside your secrets management guidelines. The four-step workflow (paste → scan → mask → send) takes under 60 seconds once learned.',
        },
      ]} />

      <SectionHeader number={7} title="What the AI Can Still Do With Masked Code" />
      <p>
        The most common concern is that masking reduces AI help quality. It does not. Here is a
        complete list of what AI tools do equally well with masked code:
      </p>

      <ErrorFix
        title="AI quality: masked vs. unmasked"
        bad={`// Concern: AI won't help without real names
// WRONG — AI sees this as equivalent structure:
function getUserOrders(userId: string): Promise<Order[]> {
  return db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
}`}
        good={`// What AI actually receives — structurally identical:
function VAR_ABCD(VAR_EFGH: string): Promise<VAR_IJKL[]> {
  return VAR_MNOP.VAR_QRST('SELECT * FROM VAR_UVWX WHERE VAR_YZAB = $1', [VAR_EFGH]);
}
// AI can: type this correctly, optimize the query,
// add error handling, suggest indexes, write tests
// — all without seeing getUserOrders or the real table name.`}
        badLabel="What you think AI needs — your real names"
        goodLabel="What AI actually needs — just the structure and pattern"
      />

      <p>AI tools work equally well with masked code for all of the following:</p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Logic and algorithm improvements',
          description: 'AI identifies inefficient loops, suggests better data structures, spots unnecessary complexity — all from code structure alone.',
        },
        {
          title: 'Security vulnerability detection',
          description: 'SQL injection patterns, missing input validation, insecure random number usage, hardcoded values — structural issues detectable without real names.',
        },
        {
          title: 'Test generation',
          description: 'AI writes unit tests, edge case tests, and mock data for masked functions. After restoration, tests reference real function names and are immediately runnable.',
        },
        {
          title: 'Documentation generation',
          description: 'Docstrings, JSDoc, type annotations, README sections — all generated from masked code and restored to use real names.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does the AI ever change placeholder names in its response?',
          answer: 'Rarely. With the prompt template instruction telling the AI to preserve placeholder names, it almost always returns code using the same VAR_XXXX names it was given. If the AI does rename a placeholder — which happens occasionally with very generic instructions — the restore engine leaves the unchanged placeholder visible so you can spot it and manually correct it.',
        },
        {
          question: 'Can I use this with Claude Projects or ChatGPT memory?',
          answer: 'Yes. Mask code before adding it to Claude Projects, ChatGPT custom instructions, or any persistent AI context. The AI retains the masked versions — not your real names. If the AI later references masked code from its memory, restore as normal.',
        },
        {
          question: 'What if my code spans multiple files?',
          answer: "Mask each file separately and download the mapping file after the first mask. When masking subsequent files, load the saved mapping to ensure shared identifiers (function names, types, constants) get the same placeholders across files. This ensures consistent masking across a multi-file codebase.",
        },
        {
          question: 'Does strip comments help?',
          answer: "Stripping comments before masking serves two purposes: it reduces the token count you send to AI (saving costs with paid AI APIs) and it removes code comments that may contain sensitive information — commented-out credentials, internal ticket numbers, or architectural notes you don't want to share. Enable it in Advanced Options when working with comment-heavy code.",
        },
        {
          question: 'Is this workflow HIPAA/SOC 2/GDPR compliant?',
          answer: 'Code masking before AI transmission significantly reduces your compliance surface area. When masked code reaches the AI, PHI column names, PII values, and internal system names are replaced with generic placeholders — the AI processes no protected information. You still need to assess your AI provider relationship under your applicable frameworks, but masking eliminates the core risk of PHI/PII transmission.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
