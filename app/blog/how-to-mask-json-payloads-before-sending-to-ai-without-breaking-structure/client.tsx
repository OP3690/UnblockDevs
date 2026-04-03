'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToMaskJsonPayloadsBeforeSendingToAiWithoutBreakingStructureClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Mask JSON Payloads Before Sending to AI Without Breaking Structure</h1>
      <p className="lead">
        When using AI to analyze JSON data, you often need to mask sensitive fields — PII,
        API keys, payment details — before the payload reaches the LLM. The challenge is
        masking values while preserving the JSON structure so the AI can still analyze
        field names, types, and relationships. This guide shows how to do it in Python and JavaScript.
      </p>

      <StatGrid stats={[
        { value: 'PII', label: 'personally identifiable info must be masked before AI processing', color: 'red' },
        { value: 'Structure', label: 'preserved — AI still understands schema and field names', color: 'green' },
        { value: 'Reversible', label: 'token mapping lets you restore values after AI analysis', color: 'blue' },
        { value: 'GDPR/HIPAA', label: 'masking enables regulatory compliance with AI tools', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Mask JSON Before Sending to AI?" />
      <QuickFact color="red" label="The compliance risk">
        LLMs (GPT-4, Claude, Gemini) process your data on external servers. Sending real user data
        (emails, phone numbers, SSNs, credit cards) may violate GDPR, HIPAA, and enterprise
        data policies. Masking replaces sensitive values with realistic placeholders that preserve
        the structure the AI needs to analyze without exposing actual PII.
      </QuickFact>

      <CompareTable
        leftLabel="Approach"
        rightLabel="Trade-offs"
        rows={[
          { label: 'No masking', left: 'Send real data directly to AI', right: 'Easiest but violates GDPR/HIPAA — real PII leaves your system' },
          { label: 'Full redaction', left: 'Replace all values with [REDACTED]', right: 'Safe but AI loses context — can\'t analyze data patterns or types' },
          { label: 'Pattern masking', left: 'Mask values, preserve format hints (****@domain.com)', right: 'Balanced — AI understands field type, value is hidden' },
          { label: 'Token mapping (reversible)', left: 'Replace with TOKEN_A1B2 — track original in memory', right: 'Best for round-trips — AI response tokens can be restored' },
          { label: 'Type-only schema', left: 'Send only field names and types, no values', right: 'Maximum privacy — AI can only analyze structure, not values' },
        ]}
      />

      <SectionHeader number={2} title="Simple JSON Masker — Python" />
      <CodeBlock language="python" filename="json_masker.py — Preserve structure, mask values">
{`import json
import re
from typing import Any

class JsonMasker:
    """Mask sensitive JSON fields while preserving structure for AI analysis"""

    # Fields to mask (by name pattern)
    SENSITIVE_PATTERNS = [
        r'(email|mail)',
        r'(phone|mobile|tel)',
        r'(ssn|social_security)',
        r'(password|passwd|pwd|secret)',
        r'(credit_card|card_number|cvv)',
        r'(api_key|access_token|bearer|private_key)',
        r'(address|street|zip|postal)',
        r'(date_of_birth|dob|birth)',
        r'(ip_address|ip_addr)',
    ]

    def __init__(self, mask_char='*', preserve_length=True):
        self.mask_char = mask_char
        self.preserve_length = preserve_length

    def _is_sensitive(self, key: str) -> bool:
        key_lower = key.lower()
        return any(re.search(p, key_lower) for p in self.SENSITIVE_PATTERNS)

    def _mask_value(self, value: Any, key: str) -> Any:
        if not isinstance(value, str):
            return value  # keep non-strings (numbers, booleans) as-is

        if self.preserve_length:
            if '@' in value:  # email: preserve domain for context
                local, domain = value.split('@', 1)
                return f"{'*' * len(local)}@{domain}"
            return self.mask_char * len(value)
        return f"[MASKED_{key.upper()}]"

    def mask(self, obj: Any) -> Any:
        if isinstance(obj, dict):
            return {
                k: self._mask_value(v, k) if self._is_sensitive(k) else self.mask(v)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [self.mask(item) for item in obj]
        return obj

masker = JsonMasker()

sensitive_data = {
    "user": {
        "name": "Alice Johnson",        # not masked — 'name' not in patterns
        "email": "alice@company.com",   # → ****@company.com
        "phone": "+1-555-123-4567",     # → **************
        "age": 30,                       # not masked — number preserved
        "address": "123 Main Street",   # → ****************
    },
    "api_key": "sk-abc123xyz",          # → **********
    "order_id": "ORD-2024-001",         # not masked
    "total": 149.99,                     # not masked — float
}

masked = masker.mask(sensitive_data)
print(json.dumps(masked, indent=2))
# {
#   "user": {
#     "name": "Alice Johnson",
#     "email": "****@company.com",
#     "phone": "**************",
#     "age": 30,
#     "address": "***************"
#   },
#   "api_key": "**********",
#   "order_id": "ORD-2024-001",
#   "total": 149.99
# }`}
      </CodeBlock>

      <SectionHeader number={3} title="Reversible Masking with Token Mapping" />
      <CodeBlock language="python" filename="Reversible masking for AI round-trips">
{`import uuid
import json

class ReversibleJsonMasker:
    """Replace sensitive values with tokens, restore after AI processing"""

    SENSITIVE_KEYS = {'email', 'phone', 'ssn', 'name', 'address',
                      'ip_address', 'date_of_birth', 'credit_card'}

    def __init__(self):
        self.token_map = {}   # token → original value
        self.reverse_map = {} # original value → token (deduplication)

    def _tokenize(self, value: str) -> str:
        """Same value always gets same token (consistent across payload)"""
        if value in self.reverse_map:
            return self.reverse_map[value]
        token = f"TOKEN_{uuid.uuid4().hex[:8].upper()}"
        self.token_map[token] = value
        self.reverse_map[value] = token
        return token

    def mask(self, obj, sensitive_keys=None):
        keys = sensitive_keys or self.SENSITIVE_KEYS
        if isinstance(obj, dict):
            return {
                k: self._tokenize(str(v)) if k.lower() in keys and isinstance(v, (str, int, float))
                else self.mask(v, keys)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [self.mask(item, keys) for item in obj]
        return obj

    def unmask(self, text: str) -> str:
        """Replace tokens back with original values in AI response text"""
        for token, original in self.token_map.items():
            text = text.replace(token, original)
        return text

    def unmask_json(self, obj) -> Any:
        """Recursively restore tokens in a JSON object"""
        if isinstance(obj, str):
            return self.token_map.get(obj, obj)
        if isinstance(obj, dict):
            return {k: self.unmask_json(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [self.unmask_json(item) for item in obj]
        return obj

# Usage with Claude/OpenAI API
masker = ReversibleJsonMasker()

original_payload = {
    "user": {"name": "Alice Johnson", "email": "alice@example.com"},
    "order": {"id": "ORD-001", "total": 149.99}
}

masked_payload = masker.mask(original_payload)
# → {"user": {"name": "TOKEN_A1B2C3D4", "email": "TOKEN_E5F6G7H8"}, "order": {...}}

# Send masked_payload to AI
ai_response = "The customer TOKEN_A1B2C3D4 (TOKEN_E5F6G7H8) placed order ORD-001"

# Restore original values in the AI's response
restored = masker.unmask(ai_response)
# → "The customer Alice Johnson (alice@example.com) placed order ORD-001"`}
      </CodeBlock>

      <SectionHeader number={4} title="JavaScript / TypeScript Implementation" />
      <CodeBlock language="typescript" filename="json-masker.ts — TypeScript version">
{`type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const SENSITIVE_PATTERNS = [
  /email|mail/i,
  /phone|mobile|tel/i,
  /password|passwd|pwd|secret/i,
  /credit_card|card_number|cvv/i,
  /api_key|access_token|bearer|private_key/i,
  /address|street|zip|postal/i,
  /ssn|social_security/i,
  /ip_address|ip_addr/i,
];

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_PATTERNS.some(p => p.test(key));
}

function maskValue(value: JsonValue, key: string): JsonValue {
  if (typeof value !== 'string') return value; // preserve numbers, booleans

  // Email: preserve domain for context
  if (value.includes('@')) {
    const [local, domain] = value.split('@');
    return `${'*'.repeat(local.length)}@${domain}`;
  }

  return '*'.repeat(value.length);
}

export function maskJson(obj: JsonValue): JsonValue {
  if (Array.isArray(obj)) return obj.map(item => maskJson(item));
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as JsonObject).map(([k, v]) => [
        k,
        isSensitiveKey(k) ? maskValue(v, k) : maskJson(v),
      ])
    );
  }
  return obj;
}

// Reversible token masker
export class TokenMasker {
  private tokenMap = new Map<string, string>(); // token → original
  private reverseMap = new Map<string, string>(); // original → token

  private tokenize(value: string): string {
    if (this.reverseMap.has(value)) return this.reverseMap.get(value)!;
    const token = `TOKEN_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    this.tokenMap.set(token, value);
    this.reverseMap.set(value, token);
    return token;
  }

  mask(obj: JsonValue, sensitiveKeys = new Set(['email', 'phone', 'name', 'address'])): JsonValue {
    if (typeof obj === 'string') return obj;
    if (Array.isArray(obj)) return obj.map(item => this.mask(item, sensitiveKeys));
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj as JsonObject).map(([k, v]) => [
          k,
          sensitiveKeys.has(k.toLowerCase()) && typeof v === 'string'
            ? this.tokenize(v)
            : this.mask(v, sensitiveKeys),
        ])
      );
    }
    return obj;
  }

  unmask(text: string): string {
    let result = text;
    this.tokenMap.forEach((original, token) => {
      result = result.replaceAll(token, original);
    });
    return result;
  }
}

// Usage:
const masker = new TokenMasker();
const masked = masker.mask({ name: 'Alice', email: 'alice@example.com', orderId: 'ORD-001' });
// → { name: 'TOKEN_ABC123', email: 'TOKEN_DEF456', orderId: 'ORD-001' }

const aiResponse = 'Customer TOKEN_ABC123 placed order ORD-001';
console.log(masker.unmask(aiResponse));
// → 'Customer Alice placed order ORD-001'`}
      </CodeBlock>

      <SectionHeader number={5} title="What to Mask vs What to Preserve" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Always mask', description: 'Email addresses, phone numbers, SSN/national IDs, credit card numbers, CVV, passwords, API keys, access tokens, home addresses, dates of birth, IP addresses, biometric data.' },
        { title: 'Usually preserve', description: 'Field names (keys), data types, boolean values, numeric values (age: 30), non-PII identifiers (order_id, product_id), timestamps (format only), enum values (status: "active").' },
        { title: 'Context-dependent', description: 'Full names (mask if customer PII, keep if public figure references), company names (depends on sensitivity), location (city-level usually OK, street address always mask).' },
        { title: 'Preserve for AI analysis', description: 'JSON structure and nesting, field names and relationships, data types (string vs number vs boolean), approximate numeric ranges, array lengths and structure.' },
      ]} />

      <SectionHeader number={6} title="Masking Workflow for AI Analysis" />
      <VerticalSteps steps={[
        { title: 'Audit your JSON payload', desc: 'Before sending anything to AI, map every field in your JSON and classify each as: PII (must mask), business-sensitive (consider masking), or safe (can send as-is). Document this classification in your codebase as a reference.' },
        { title: 'Choose masking strategy', desc: 'For one-way analysis (AI explains the schema): use simple pattern masking (*** replacement). For round-trip analysis (AI rewrites data, you need original back): use reversible token mapping. Never use full redaction ([REDACTED]) — it destroys context the AI needs.' },
        { title: 'Apply masking before serialization', desc: 'Mask the in-memory object before JSON.stringify or json.dumps. Never log, cache, or transmit the unmasked version outside your system boundary. The masked copy is what gets sent to the AI API.' },
        { title: 'Send to AI with context', desc: 'Tell the AI what you\'ve done: "Field values for PII fields have been masked with ***. Analyze the schema structure and field relationships." This helps the AI give better structural analysis without being confused by the masked values.' },
        { title: 'Restore tokens in AI response', desc: 'If using token mapping and the AI returns tokens in its response (e.g., "TOKEN_A1B2 has an invalid email format"), run the unmask() function on the AI\'s response text to restore original values before displaying to users.' },
        { title: 'Audit and log the masking', desc: 'Log which fields were masked and which were sent as-is, including the masking strategy used and timestamp. This audit trail is essential for GDPR compliance (demonstrating appropriate technical measures) and HIPAA breach assessment.' },
      ]} />

      <AlertBox type="tip" title="Use our AI Schema Masker tool">
        unblockdevs.com/ai-schema-masker automatically detects and masks PII fields in your
        JSON before you send it to any AI. Preview the masked output and configure which
        field patterns to mask. Supports both simple masking and reversible token mapping.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does masking JSON prevent AI from giving useful analysis?',
          answer: 'Not significantly. AI analyzes JSON structure, field names, relationships, and data types — not individual values. A masked email (****@company.com) still tells the AI this is an email field. A masked name still shows it\'s a string field. A masked age (still 30) tells the AI the numeric range. You lose specific value analysis but keep structural and type analysis, which is usually what matters for schema debugging and API design questions.',
        },
        {
          question: 'What regulations require masking before AI processing?',
          answer: 'GDPR (EU): requires lawful basis to process personal data — sending PII to external AI providers may require Data Processing Agreements (DPAs). Check if your AI provider (OpenAI, Anthropic) has signed a DPA. HIPAA (US healthcare): patient data (PHI) cannot be sent to unauthorized Business Associates — most AI providers are not HIPAA BAAs unless explicitly contracted. PCI-DSS: payment card data (PANs, CVVs) must never leave your PCI-compliant environment. When in doubt, mask first.',
        },
        {
          question: 'Can I use this for database schema masking before sending to ChatGPT?',
          answer: 'Yes — the same principle applies to SQL schemas and query data. Mask table names (customers → TABLE_A), column names with PII (email → col_xyz), and any sample data rows. Preserve data types, foreign key relationships, and column cardinality hints. We have a dedicated guide at unblockdevs.com for SQL schema masking with complete examples for PostgreSQL, MySQL, and BigQuery.',
        },
        {
          question: 'What is the difference between masking and anonymization?',
          answer: 'Masking is reversible — the original values are preserved somewhere (in a token map, in the original database). Anonymization is irreversible — original values are permanently destroyed and cannot be recovered. For AI analysis workflows, masking is appropriate (you need your data back). For publishing public datasets, anonymization is required. GDPR treats anonymized data as outside its scope, but masked data (where original can be reconstructed) is still personal data under GDPR.',
        },
        {
          question: 'How do I handle nested arrays and deeply nested JSON?',
          answer: 'The recursive mask() functions shown handle arbitrarily nested JSON automatically. They traverse dicts, lists, and primitives recursively. The key sensitivity check is applied at every level by field name — so a "phone" field nested 5 levels deep is still masked. For very large JSON (10MB+), consider streaming approaches or chunking the payload before masking to avoid memory issues.',
        },
        {
          question: 'Should I mask the JSON before or after schema validation?',
          answer: 'Validate first, then mask. Schema validation (with Pydantic, Zod, or JSON Schema) verifies the data is well-formed using real values. Once validated, apply masking before any external transmission. This order ensures: (1) you catch malformed data before it reaches your masker, (2) the masker receives clean, typed data it can process correctly, (3) masked data is never stored in your validated-data models where it might corrupt downstream processing.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
