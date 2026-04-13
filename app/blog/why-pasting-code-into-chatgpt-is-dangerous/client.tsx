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

export default function WhyPastingCodeIntoChatGptIsDangerousClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why Pasting Code into ChatGPT Is Dangerous — API Keys, Secrets & IP Risks</h1>
      <p className="lead">
        Developers paste code into ChatGPT, Claude, Copilot, and Cursor every day — for code
        reviews, debugging, refactoring, and writing tests. It is genuinely useful. But every paste
        is also a data transfer to a third-party AI system that may log, retain, and train on what
        you send. This guide covers exactly what you expose, what the real-world consequences look
        like, and what you can do to protect yourself without giving up the AI productivity gains.
      </p>

      <StatGrid stats={[
        { value: '< 1hr', label: 'Average time for automated scanners to find and exploit a leaked API key once it hits a public system', color: 'red' },
        { value: '71%', label: 'Of developers admit to pasting code containing secrets into AI tools at least once (GitGuardian 2024 survey)', color: 'violet' },
        { value: '0 bytes', label: 'Of your real code that Code Prompt Shield sends to any server — masking runs entirely in your browser', color: 'green' },
      ]} />

      <SectionHeader number={1} title="What Happens When You Paste Code into ChatGPT" />
      <p>
        When you paste code into ChatGPT.com, Claude.ai, or any consumer-facing AI product, that
        text is sent over HTTPS to the provider's servers, processed by a large language model
        running on cloud infrastructure, logged for quality, safety, and abuse monitoring, and —
        depending on your subscription tier and settings — potentially retained for model training.
      </p>

      <p>
        None of this is secret. Every major AI provider documents it in their terms of service and
        privacy policy. The problem is that most developers do not read these policies, do not
        configure opt-out settings, and do not consider the implications of sending real source code
        with real credentials embedded in it.
      </p>

      <AlertBox type="warning" title="The training data risk is longer-term than you think">
        AI model retraining cycles run on intervals of weeks to months. A prompt you sent today
        with an API key may contribute to a model retrained three months from now. Even if you
        rotate the key tomorrow, the pattern, the variable name, and the context of how that
        credential is used in your codebase is now potentially part of a training dataset.
      </AlertBox>

      <SectionHeader number={2} title="What You Actually Expose — Category by Category" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'API keys and credentials',
          description:
            'The most obvious risk. Hardcoded Stripe keys, OpenAI keys, AWS access keys, SendGrid tokens, GitHub PATs — if they are in the code you paste, they are in the prompt. Automated secret scanners continuously crawl AI provider endpoints. A leaked key is typically tested within minutes and exploited within the hour.',
        },
        {
          title: 'Database connection strings',
          description:
            'Connection strings contain host, port, database name, username, and password. Pasting postgres://app_user:password@prod-host:5432/main_db tells an AI system your production host address, your database structure hints, your credentials, and your naming conventions — simultaneously.',
        },
        {
          title: 'Proprietary business logic',
          description:
            "Variable names and function names reveal what your code does. getUserChurnScore(), calculateLifetimeValue(), detectFraudPattern() — these function names describe your product's competitive differentiators. Even without the implementation, the architecture is exposed.",
        },
        {
          title: 'PII and personal data',
          description:
            'Test fixtures containing real emails, phone numbers, and customer IDs are common in developer workflows. A test file pasted for debugging may contain john.doe@company.com or +1-555-123-4567 — real PII, sent to a third-party AI system, potentially in violation of GDPR or HIPAA.',
        },
        {
          title: 'Internal infrastructure details',
          description:
            'Server hostnames (prod-db.internal.company.com), internal service URLs (https://auth.internal/v2/token), AWS region and account patterns, and Kubernetes namespace names all reveal your internal topology. An attacker who knows your infrastructure naming conventions has a significant advantage.',
        },
        {
          title: 'Compliance-relevant metadata',
          description:
            'Column names like patient_mrn, ssn_last4, or credit_card_token are themselves regulated metadata under HIPAA and PCI-DSS. Sending these identifiers — even without the actual data — to an uncontracted AI processor may violate your data processing agreements.',
        },
      ]} />

      <SectionHeader number={3} title="Real Attack Scenarios from AI Code Sharing" />

      <CodeBlock lang="python" title="Example: What you paste into ChatGPT">
{`# Asking ChatGPT to help optimize a database query
import psycopg2
import stripe

STRIPE_SECRET = 'sk_live_[YOUR_KEY_GOES_HERE_NEVER_SHARE]'
DB_URL = 'postgres://app_admin:Sup3rSecretDB@prod-rds.us-east-1.amazonaws.com:5432/ecommerce_prod'

def charge_customer(customer_email, amount):
    conn = psycopg2.connect(DB_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT stripe_customer_id FROM users WHERE email = %s", (customer_email,))
    stripe_id = cursor.fetchone()[0]
    stripe.api_key = STRIPE_SECRET
    return stripe.PaymentIntent.create(amount=amount, currency='usd', customer=stripe_id)`}
      </CodeBlock>

      <p>
        This prompt asks for a database optimization tip. But it exposes: a live Stripe secret key,
        a production PostgreSQL URL with admin credentials, a production AWS RDS hostname, your
        database name and schema, and a live business transaction pattern. The AI will answer your
        optimization question — and every piece of that context goes to OpenAI's servers.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Scenario 1: Automated key harvesting',
          description:
            'Threat actors run automated pipelines that look for leaked credentials in AI system outputs and logs. When a key like sk_live_51Abc... appears in a prompt, it matches known Stripe key patterns. The key is tested immediately. If valid, it is used to create charges or access customer data before you even know it leaked.',
        },
        {
          title: 'Scenario 2: Model memorization',
          description:
            'Large language models can memorize rare or unique sequences from training data. A unique internal hostname or a distinctive internal API pattern submitted in prompts could surface in completions given to other users — a form of unintentional data leakage through model behavior.',
        },
        {
          title: 'Scenario 3: Insider AI account misuse',
          description:
            "A developer uses a personal ChatGPT account (not the company's enterprise plan) to debug production code. The personal account has no zero-data-retention configuration. That session is logged and potentially retained. If the developer leaves the company, the session persists indefinitely in a personal account the company cannot control.",
        },
        {
          title: 'Scenario 4: Competitive intelligence extraction',
          description:
            'Function names and variable names describing your core algorithms — calculateChurnRisk(), optimizeAdBid(), detectFraudScore() — describe your product\'s competitive IP. These identifiers reveal what problems your engineering team has solved and how. Competitors using the same AI tools may encounter these patterns in model suggestions.',
        },
      ]} />

      <SectionHeader number={4} title="The GitHub Copilot Dimension" />
      <p>
        GitHub Copilot presents a different attack surface than chat-based AI. Rather than
        explicit pastes, Copilot continuously reads the active file and surrounding context in your
        editor to generate suggestions. This means:
      </p>

      <AlertBox type="error" title="Copilot reads your open files — including .env and config files">
        If you have a <code>.env</code> file open in another tab, or a config file with hardcoded
        credentials in the same project, Copilot&apos;s context window may include those values when
        generating suggestions. The credentials are not just in your editor — they are sent to
        GitHub&apos;s AI infrastructure as part of the context payload.
      </AlertBox>

      <p>
        GitHub enterprise Copilot plans offer controls over what context is sent. Consumer plans
        have fewer restrictions. If you use Copilot Free or Copilot for Individuals, assume
        everything in the active file and its imports is potentially included in AI context.
      </p>

      <SectionHeader number={5} title="The 'But I'm on Enterprise' Misconception" />
      <p>
        Enterprise AI plans (ChatGPT Enterprise, Copilot Business, Claude for Enterprise) offer
        better data handling guarantees — typically no use of prompts for training, contractual data
        processing agreements, and audit logs. These are genuine improvements. But they do not
        eliminate the risk:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'They only cover employees on that plan',
          description:
            'Enterprise plans cover users authenticated through the enterprise account. A developer who uses their personal ChatGPT account to paste code — even on a work computer — is outside the enterprise agreement entirely.',
        },
        {
          title: 'They do not prevent key exploitation',
          description:
            'Even if an AI provider never trains on your data, a valid API key that appears in a prompt is still processed by systems that could be breached, misconfigured, or subject to subpoenas. A leaked key needs to be rotated regardless of enterprise status.',
        },
        {
          title: 'They do not cover all tools',
          description:
            'Developers use many AI tools: Cursor, Codeium, Tabnine, Amazon CodeWhisperer, AI-powered IDE extensions. An enterprise plan with OpenAI does not cover what Cursor sends to Anthropic or what a VS Code extension sends to its own inference endpoint.',
        },
        {
          title: 'Compliance obligations remain',
          description:
            'A data processing agreement with an AI provider does not substitute for HIPAA compliance or PCI-DSS controls. If the AI provider has a breach and your PHI column names were in a retained prompt, you may still have a breach notification obligation.',
        },
      ]} />

      <SectionHeader number={6} title="The Solution: Mask Before You Paste" />
      <p>
        Code masking replaces every sensitive identifier in your source code with a generic
        placeholder before you send anything to an AI. The AI helps with logic, optimization, and
        structure — using the masked version. You restore original names after with the mapping
        file.
      </p>

      <ErrorFix
        title="The safe workflow — mask before paste"
        bad={`# What you SHOULD NOT paste into ChatGPT:
STRIPE_SECRET = 'sk_live_[YOUR_KEY_GOES_HERE_NEVER_SHARE]'
DB_URL = 'postgres://app_admin:Sup3rSecretDB@prod-rds.us-east-1.amazonaws.com:5432/ecommerce_prod'

def charge_customer(customer_email, amount):
    conn = psycopg2.connect(DB_URL)
    stripe.api_key = STRIPE_SECRET
    return stripe.PaymentIntent.create(amount=amount, currency='usd')`}
        good={`# What you safely paste into ChatGPT after masking:
VAR_ABCD = 'SECRET_EFGH'
VAR_IJKL = 'SECRET_MNOP'

def VAR_QRST(VAR_UVWX, VAR_YZAB):
    VAR_CDEF = VAR_GHIJ.VAR_KLMN(VAR_IJKL)
    VAR_OPQR.VAR_STUV = VAR_ABCD
    return VAR_OPQR.VAR_WXYZ.VAR_ABCD2(VAR_YOURCHOICE=VAR_UVWX, VAR_X='usd')`}
        badLabel="Real credentials and function names sent to AI — high risk"
        goodLabel="Masked code sent to AI — AI helps with logic, zero secrets exposed"
      />

      <p>
        The <strong>Code Prompt Shield</strong> at unblockdevs.com/code-prompt-shield runs this
        masking entirely in your browser. Nothing is sent to any server. It supports 18 programming
        languages including Python, JavaScript, TypeScript, Go, Java, Ruby, Swift, Kotlin, Bash,
        YAML, TOML, C/C++, SQL, JSON, and XML. It detects secrets automatically — API keys,
        JWTs, database URLs, OAuth tokens, private keys, GitHub tokens, Slack tokens, and more —
        plus custom patterns you define.
      </p>

      <QuickFact color="green" label="Pre-scan before you mask">
        Code Prompt Shield includes a pre-scan feature: click &quot;Scan first&quot; to see exactly what
        sensitive content is in your code — API keys, PII, database credentials — before you mask
        or send anything. Each finding shows the category, severity level, and occurrence count.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'Does ChatGPT actually store the code I paste?',
          answer: "ChatGPT.com (consumer free and Plus) stores conversation history by default and may use it for model improvement unless you opt out in settings. ChatGPT Enterprise and API with zero-data-retention (ZDR) configured do not use prompts for training and have shorter retention windows. The setting is not retroactive — prompts sent before opt-out may already be in retention.",
        },
        {
          question: 'What happens if I accidentally paste an API key into ChatGPT?',
          answer: 'Rotate the key immediately — do not wait. Go to your provider\'s dashboard (Stripe, OpenAI, AWS, etc.) and revoke the exposed key right now. Create a new key and update all deployments. Then audit your logs for the period after the exposure to check for unauthorized usage. Even a few minutes of exposure can be enough for automated scanners to find and test the key.',
        },
        {
          question: 'Is GitHub Copilot safer than ChatGPT for code with secrets?',
          answer: "Neither is safe for code containing real secrets. Copilot reads active file context continuously and sends it to GitHub/OpenAI infrastructure. Copilot Business and Enterprise plans offer better data handling policies, but secrets in active files can still be included in inference payloads. The only safe approach is to ensure secrets are never in the code that reaches any AI system.",
        },
        {
          question: 'Can I trust AI providers that say they do not train on my data?',
          answer: "Enterprise agreements with no-training provisions are contractually binding — they are a meaningful protection. But 'no training' does not mean 'no logging' and does not mean 'no breach risk'. It also only applies to accounts covered by that agreement. The safest posture is to never send real credentials to any AI system regardless of data handling promises.",
        },
        {
          question: 'Does code masking reduce the quality of AI help I get?',
          answer: "No. AI coding assistants work on code structure, syntax, and patterns — not the meaning of your variable names. A function named VAR_ABCD that takes VAR_EFGH and returns VAR_IJKL is optimized by the AI just as accurately as one named getUserOrders that takes userId and returns orders. The logic help is unchanged. Only your real names are protected.",
        },
        {
          question: 'What if my company already has an enterprise AI agreement?',
          answer: "Enterprise agreements significantly reduce training data risk and provide contractual protections. But they do not cover: developers using personal AI accounts, other AI tools not under the agreement, future policy changes, or breach scenarios. Code masking provides defense in depth — it works regardless of which AI tool is used or which provider's policies you trust.",
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
