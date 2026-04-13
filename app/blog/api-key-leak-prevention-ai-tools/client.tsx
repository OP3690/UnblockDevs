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

export default function ApiKeyLeakPreventionAiToolsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>API Key Leak Prevention When Using AI Tools — Complete Developer Security Guide</h1>
      <p className="lead">
        API keys leaked to AI coding assistants are among the fastest-growing vectors for credential
        compromise. Automated scanners monitor AI system outputs and logs continuously — a valid
        Stripe key, GitHub PAT, or AWS access key appearing in a ChatGPT prompt can be tested and
        exploited before the developer finishes their conversation. This guide covers detection,
        prevention, immediate response, and the engineering workflow that eliminates the risk.
      </p>

      <StatGrid stats={[
        { value: '&lt; 30min', label: 'Median time to first unauthorized use of a leaked API key found by automated scanners', color: 'red' },
        { value: '79%', label: 'Of organizations have experienced at least one credential leak incident related to developer AI tool usage (2024)', color: 'violet' },
        { value: '100%', label: 'Of credential leak risk from AI tools eliminated when code is masked before sending — zero credentials transmitted', color: 'green' },
      ]} />

      <SectionHeader number={1} title="How API Keys Leak Through AI Tools" />
      <p>
        The mechanics are straightforward and happen in three distinct ways:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Direct paste with secrets in code',
          description:
            'The most common vector. A developer copies a function from their codebase to ask AI for help. The function contains a hardcoded API key, database URL, or authentication token. The entire string — key and all — is sent to the AI provider as part of the prompt payload.',
        },
        {
          title: 'Environment file paste',
          description:
            'Developers paste .env files into AI to ask "what is wrong with my environment config" or "how do I structure this properly." A .env file is essentially a list of credentials. Pasting it is pasting every secret your application uses.',
        },
        {
          title: 'Copilot context window inclusion',
          description:
            "GitHub Copilot and similar in-editor tools continuously read the file being edited and adjacent files. If a config file, secret manager stub, or test fixture containing credentials is open in another editor tab, it may appear in the context window sent to AI infrastructure.",
        },
        {
          title: 'Clipboard history and browser extensions',
          description:
            "AI browser extensions that read clipboard content, or clipboard managers that auto-paste recent content, can include credential strings in AI prompts without the developer's explicit intent.",
        },
      ]} />

      <SectionHeader number={2} title="What Gets Exploited — and How Fast" />

      <CodeBlock lang="text" title="API key exploit timeline after AI prompt exposure">
{`T+0:00   Developer pastes code with API key into ChatGPT prompt
T+0:01   Prompt transmitted to OpenAI servers over HTTPS
T+0:02   Response generated — developer reads AI's suggestion

T+0:03 — T+0:30 (concurrent, automated):
   [Scanner] Credential pattern detected in prompt/log
   [Scanner] Key format identified: sk-proj-... (OpenAI key)
   [Scanner] Key tested against OpenAI API: VALID
   [Scanner] Key added to exploit queue

T+0:31   Developer rotates key (if they noticed — most don't for days)

T+1:00   First unauthorized API calls using stolen key
T+2:00   Charges accumulate on compromised account
T+24:00  Developer notices unusual billing or rate limit errors
T+48:00  Incident response begins — key rotated, damage assessed`}
      </CodeBlock>

      <AlertBox type="error" title="The scanner ecosystem is sophisticated and automated">
        Credential scanners are not manually operated by individuals. They are automated pipelines
        running continuously against public and semi-public data sources. They know every major
        API key format by regex pattern — Stripe <code>sk_live_51</code>, OpenAI{' '}
        <code>sk-proj-</code>, AWS <code>AKIA</code>, GitHub <code>ghp_</code>, Slack{' '}
        <code>xox</code>, Google <code>AIza</code>. A key that appears in an AI system log for
        even seconds is at risk if that log is accessible.
      </AlertBox>

      <SectionHeader number={3} title="Key Types at Highest Risk in AI Prompts" />

      <CodeBlock lang="text" title="High-risk credential patterns commonly pasted into AI tools">
{`Stripe secret keys:      sk_live_51Abc123... or sk_test_...
                         → Full account access, charge customers, access payouts

OpenAI API keys:         sk-proj-abc123xyz...
                         → Access to your quota, generate on your bill, access fine-tunes

AWS access keys:         AKIAIOSFODNN7EXAMPLE / wJalrXUtnFEMI...
                         → Full AWS account access depending on permissions
                         → Can access S3, launch EC2, read databases, create IAM users

GitHub PATs:             ghp_abc123xyz456...
                         → Read/write repos, packages, secrets, workflows
                         → Can exfiltrate your entire codebase

SendGrid API keys:       SG.abc123.xyz456...
                         → Send email as your domain, access contact lists

Slack tokens:            xoxb-... xoxs-... xoxp-...
                         → Read messages, post to channels, access workspace data

Database URLs:           postgres://user:password@host:5432/db
                         → Direct database access — full read/write if user has broad permissions

JWT signing secrets:     Any value used as HMAC secret
                         → Forge tokens for any user in your system`}
      </CodeBlock>

      <SectionHeader number={4} title="Immediate Response If You Leaked a Key" />
      <p>
        If you have already pasted a live API key into an AI tool, follow this response sequence
        immediately. Speed matters — the window between exposure and exploitation may be under 30
        minutes.
      </p>

      <VerticalSteps steps={[
        {
          title: '1. Revoke the exposed key immediately',
          desc: 'Go directly to the credential provider\'s dashboard. Do not check logs first, do not investigate first — revoke now. Stripe dashboard → API keys → revoke. AWS IAM → access keys → deactivate. GitHub → Settings → Developer settings → Personal access tokens → delete. Do this for every key that was in the pasted code.',
        },
        {
          title: '2. Generate replacement keys',
          desc: 'Create new credentials immediately. Do not reactivate the old key under any circumstances — once exposed, a key should never be reactivated. Create fresh credentials, store them in a secrets manager (AWS Secrets Manager, HashiCorp Vault, 1Password for developers), and update all deployments.',
        },
        {
          title: '3. Audit for unauthorized usage',
          desc: 'Check the usage logs for the exposed key before revocation. Stripe: Dashboard → Events → filter by the key. AWS: CloudTrail → filter by access key. GitHub: Settings → Security log. Look for API calls from unfamiliar IP addresses, unusual geographic locations, or unexpected operation types.',
        },
        {
          title: '4. Assess what the key could access',
          desc: 'Review the permissions of the exposed key. A read-only key for a specific service is lower risk than a full-access admin key. For AWS keys, check the attached IAM policy. For GitHub PATs, check the scopes. The blast radius depends entirely on what the key was authorized to do.',
        },
        {
          title: '5. Check for secondary credential exposure',
          desc: 'In the same code snippet that contained the exposed key, look for other credentials: database URLs, other API keys, JWT secrets, internal service tokens. If multiple credentials were in the pasted code, rotate all of them — not just the obvious one.',
        },
        {
          title: '6. Document and remediate the source',
          desc: 'How did the credential end up hardcoded in the code? Fix the root cause: remove hardcoded credentials from the codebase (use environment variables or secrets managers), add git-secrets or similar pre-commit hooks to prevent future commits of credentials, and update developer security training.',
        },
      ]} />

      <SectionHeader number={5} title="Prevention: The Engineering Controls" />
      <p>
        A layered approach to prevention eliminates the risk at multiple points:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Never hardcode credentials in source files',
          description:
            'Credentials in source files are the root cause. Use environment variables (os.environ, process.env), secrets managers (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, Infisical), or configuration services. The code that reaches AI tools should contain references to where secrets are stored — not the secrets themselves.',
        },
        {
          title: 'Pre-commit hooks for secret scanning',
          description:
            'Install git-secrets (AWS), gitleaks, detect-secrets (Yelp), or truffleHog in your pre-commit hooks. These tools scan every commit for credential patterns before code is committed — preventing secrets from entering the repository at all. If they never reach version control, they are less likely to reach AI tools.',
        },
        {
          title: 'Code masking before any AI paste',
          description:
            'Even with the above controls, code in local development often has credentials — in .env files, in test fixtures, in debug sessions. Code Prompt Shield at unblockdevs.com/code-prompt-shield masks all credentials before you paste. Run it as a habit before every AI paste, regardless of whether you think the code contains secrets.',
        },
        {
          title: 'GitHub Advanced Security / secret scanning',
          description:
            'GitHub secret scanning (available on public repos free, private repos with Advanced Security) detects known credential patterns in commits and notifies the developer and the credential provider simultaneously. Many providers (Stripe, AWS, etc.) are partners and auto-revoke detected keys.',
        },
        {
          title: 'Least-privilege API key scoping',
          description:
            'Create purpose-specific API keys with minimum required permissions. A key used only to send email should have send-only scope — not account management scope. A leaked minimal-scope key has limited blast radius compared to a full-admin key.',
        },
        {
          title: 'Key rotation schedules',
          description:
            'Even without a known leak, rotate API keys on a schedule (quarterly for lower-risk services, more frequently for high-privilege keys). Regular rotation limits the useful lifetime of any credential that leaked through an undetected vector.',
        },
      ]} />

      <SectionHeader number={6} title="How Code Masking Eliminates the AI Leak Vector" />
      <p>
        Code masking removes the credential from the AI transmission entirely. The AI receives a
        structurally identical version of your code with all secret values replaced by safe
        placeholders. Here is a concrete example:
      </p>

      <ErrorFix
        title="Credential exposure: before and after masking"
        bad={`# What gets sent to AI without masking:
import boto3
import stripe

AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE'
AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
STRIPE_KEY     = 'sk_live_[YOUR_KEY_GOES_HERE_NEVER_SHARE]'

def process_payment(customer_id: str, amount: int):
    stripe.api_key = STRIPE_KEY
    charge = stripe.PaymentIntent.create(amount=amount, currency='usd', customer=customer_id)
    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)
    s3.put_object(Bucket='receipts-prod', Key=f'receipt-{charge.id}.json', Body=str(charge))`}
        good={`# What gets sent to AI after masking — zero credentials exposed:
import VAR_ABCD
import VAR_EFGH

VAR_IJKL = 'SECRET_MNOP'
VAR_QRST = 'SECRET_UVWX'
VAR_YZAB = 'SECRET_CDEF'

def VAR_GHIJ(VAR_KLMN: str, VAR_OPQR: int):
    VAR_EFGH.VAR_STUV = VAR_YZAB
    VAR_WXYZ = VAR_EFGH.VAR_ABCD2.VAR_EFGH2(VAR_OPQR=VAR_OPQR, VAR_IJKL2='usd', VAR_KLMN2=VAR_KLMN)
    VAR_MNOP2 = VAR_ABCD.VAR_QRST2('s3', VAR_STUV2=VAR_IJKL, VAR_UVWX2=VAR_QRST)
    VAR_MNOP2.VAR_WXYZ2(VAR_YZAB2='SECRET_ABCD3', VAR_CDEF2=f'SECRET_EFGH3-{VAR_WXYZ.VAR_GHIJ2}.json', VAR_IJKL3=str(VAR_WXYZ))`}
        badLabel="Real AWS + Stripe credentials sent to AI — critical risk"
        goodLabel="All credentials replaced — AI helps optimize logic, zero keys transmitted"
      />

      <p>
        The AI can still tell you: how to handle the PaymentIntent error response, how to add retry
        logic, how to improve the S3 key naming, how to add proper exception handling, and how to
        refactor the function for testability. It needs structure — not your real credentials.
      </p>

      <QuickFact color="blue" label="The masking is deterministic and fully reversible">
        Code Prompt Shield uses a hash-based deterministic algorithm: the same original string always
        produces the same placeholder within a session. When you paste the AI response back and
        click Restore, every <code>SECRET_MNOP</code> becomes <code>AKIAIOSFODNN7EXAMPLE</code>{' '}
        again — exactly. The mapping is stored only in your browser memory and never transmitted
        anywhere.
      </QuickFact>

      <SectionHeader number={7} title="Specific Playbooks by AI Tool" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'ChatGPT (consumer)',
          description:
            'Always mask before paste. Go to Settings → Data Controls → disable "Improve the model for everyone" if you want to opt out of training data use (note: this only applies to future conversations). For sensitive work, use the API with ZDR configuration or ChatGPT Enterprise. Mask code regardless of setting.',
        },
        {
          title: 'Claude (Anthropic)',
          description:
            'Claude.ai consumer has similar data handling to ChatGPT consumer. Claude for Work (Teams/Enterprise) offers data handling protections. The same rule applies: mask all code before paste regardless of tier. The masking eliminates risk independent of provider policy.',
        },
        {
          title: 'GitHub Copilot',
          description:
            'Copilot reads active editor context continuously. Keep .env files, secrets config files, and credential-containing fixtures in separate editor windows/workspaces from files you are actively working on with Copilot. Use Copilot Chat for explicit questions — and paste masked snippets rather than using Copilot\'s automatic context for sensitive files.',
        },
        {
          title: 'Cursor / AI-powered IDEs',
          description:
            'Cursor, Codeium, and similar tools send editor context to their AI backends. Check each tool\'s data handling policy. For sensitive files, use the "mask first, paste into chat" workflow rather than relying on inline suggestions that may include credential context.',
        },
      ]} />

      <SectionHeader number={8} title="Making Masking a Team Habit" />

      <AlertBox type="info" title="Encode it in your developer security checklist">
        Add &quot;mask code before AI paste&quot; to your team&apos;s security checklist alongside &quot;never commit
        .env files&quot; and &quot;use secrets manager for production credentials.&quot; The workflow takes
        under 60 seconds per snippet once developers are familiar with it. Link to{' '}
        <strong>unblockdevs.com/code-prompt-shield</strong> in your internal docs.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What if I use environment variables — am I safe?',
          answer: "If your code only references environment variables by name (process.env.STRIPE_SECRET, os.environ['DB_URL']) without embedding the actual values, the code itself is safe to paste. But test files, debug sessions, and config printouts often include the resolved values — always scan before pasting to confirm.",
        },
        {
          question: 'Does GitHub secret scanning protect against AI tool leaks?',
          answer: "GitHub secret scanning protects the repository — it alerts you if credentials are committed to git. It does not protect against credentials being pasted into AI chat interfaces directly from local development. These are separate vectors. Secret scanning + code masking covers both.",
        },
        {
          question: 'My company uses an enterprise ChatGPT plan. Do I still need to mask?',
          answer: "Enterprise plans reduce training data risk and provide contractual protections. But a valid API key in a prompt is still a security risk: provider systems can be breached, policies can change, and enterprise coverage does not protect against developers who use personal AI accounts for convenience. Code masking is defense in depth that works regardless of which AI tool is used.",
        },
        {
          question: 'How do I know if a credential I pasted has already been exploited?',
          answer: 'Check the credential provider\'s usage logs immediately: Stripe Dashboard → Events, AWS CloudTrail, GitHub Security log, OpenAI API usage. Look for calls from unexpected IPs, regions, or at unexpected times. If you see unauthorized usage, revoke the key, preserve the logs for incident documentation, and contact the provider\'s security team if significant.',
        },
        {
          question: 'Can I run Code Prompt Shield offline?',
          answer: 'The masking logic in Code Prompt Shield runs entirely in your browser using JavaScript. Once the page is loaded, you can disconnect from the internet and the masking will continue to work — no network requests are made during masking or restoration. The mapping and your code never leave the browser.',
        },
        {
          question: 'Should I also use this for internal AI tools (self-hosted LLMs)?',
          answer: "Self-hosted models reduce the external data transmission risk significantly. But code masking still provides value for self-hosted setups: it protects against insider threats with access to the self-hosted model's logs, ensures credentials don't appear in model memory if the model supports conversation history, and establishes a consistent security habit regardless of the AI backend.",
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
