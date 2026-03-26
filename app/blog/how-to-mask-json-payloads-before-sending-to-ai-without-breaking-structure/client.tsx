'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToMaskJsonPayloadsBeforeSendingToAiWithoutBreakingStructureClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Mask JSON Payloads Before Sending to AI Without Breaking Structure</h1>
      <p className="lead">
        When using AI to analyze JSON data, you often need to mask sensitive fields — PII,
        API keys, payment details — before the payload reaches the LLM. The challenge is
        masking values while preserving the JSON structure so the AI can still analyze
        field names, types, and relationships. This guide shows how.
      </p>

      <StatGrid stats={[
        { value: 'PII', label: 'personally identifiable info must be masked before AI processing', color: 'red' },
        { value: 'Structure', label: 'preserved — AI still understands schema and field names', color: 'green' },
        { value: 'Reversible', label: 'can be unmasked after AI returns analysis', color: 'blue' },
        { value: 'GDPR/HIPAA', label: 'masking helps with regulatory compliance', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Mask JSON Before Sending to AI?" />
      <QuickFact>
        LLMs (GPT-4, Claude, Gemini) process your data on external servers. Sending real user data
        (emails, phone numbers, SSNs, credit cards) violates GDPR, HIPAA, and most enterprise
        data policies. Masking replaces sensitive values with realistic placeholders that preserve
        the structure the AI needs to analyze.
      </QuickFact>

      <SectionHeader number={2} title="Simple JSON Masker — Python" />
      <CodeBlock language="python" filename="json_masker.py — Preserve structure, mask values">
{`import json
import re
import hashlib
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
        r'(api_key|access_token|bearer)',
        r'(address|street|zip)',
    ]

    def __init__(self, mask_char='*', preserve_length=True):
        self.mask_char = mask_char
        self.preserve_length = preserve_length
        self._mapping = {}  # for reversible masking

    def _is_sensitive(self, key: str) -> bool:
        key_lower = key.lower()
        for pattern in self.SENSITIVE_PATTERNS:
            if re.search(pattern, key_lower):
                return True
        return False

    def _mask_value(self, value: Any, key: str) -> Any:
        if not isinstance(value, str):
            return value  # keep non-strings (numbers, booleans) as-is

        if self.preserve_length:
            # Preserve length and format hints
            if '@' in value:  # email
                local, domain = value.split('@', 1)
                return f"{'*' * len(local)}@{domain}"
            return self.mask_char * len(value)
        return f"[MASKED_{key.upper()}]"

    def mask(self, obj: Any, parent_key: str = '') -> Any:
        if isinstance(obj, dict):
            return {
                k: self._mask_value(v, k) if self._is_sensitive(k) else self.mask(v, k)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [self.mask(item, parent_key) for item in obj]
        return obj

masker = JsonMasker()

sensitive_data = {
    "user": {
        "name": "Alice Johnson",  # not masked — 'name' not in patterns
        "email": "alice@company.com",  # masked
        "phone": "+1-555-123-4567",  # masked
        "age": 30,  # not masked — number
        "address": "123 Main Street",  # masked
    },
    "api_key": "sk-abc123xyz",  # masked
    "order_id": "ORD-2024-001",  # not masked
}

masked = masker.mask(sensitive_data)
print(json.dumps(masked, indent=2))
# {
#   "user": {
#     "name": "Alice Johnson",
#     "email": "****@company.com",
#     "phone": "**************",
#     "age": 30,
#     "address": "**************",
#   },
#   "api_key": "**********",
#   "order_id": "ORD-2024-001"
# }`}
      </CodeBlock>

      <SectionHeader number={3} title="Reversible Masking with Token Mapping" />
      <CodeBlock language="python" filename="Reversible masking for AI round-trips">
{`import uuid
import json

class ReversibleJsonMasker:
    """Replace sensitive values with tokens, restore after AI processing"""

    def __init__(self):
        self.token_map = {}   # token → original value
        self.reverse_map = {} # original value → token

    def _tokenize(self, value: str) -> str:
        if value in self.reverse_map:
            return self.reverse_map[value]  # reuse same token for same value
        token = f"TOKEN_{uuid.uuid4().hex[:8].upper()}"
        self.token_map[token] = value
        self.reverse_map[value] = token
        return token

    def mask(self, obj, sensitive_keys=None):
        sensitive_keys = sensitive_keys or {'email', 'phone', 'ssn', 'name', 'address'}
        if isinstance(obj, dict):
            return {
                k: self._tokenize(str(v)) if k.lower() in sensitive_keys else self.mask(v, sensitive_keys)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [self.mask(item, sensitive_keys) for item in obj]
        return obj

    def unmask(self, text: str) -> str:
        """Replace tokens back with original values in AI response text"""
        result = text
        for token, original in self.token_map.items():
            result = result.replace(token, original)
        return result

# Usage
masker = ReversibleJsonMasker()
masked = masker.mask({"email": "alice@example.com", "order": "ORD-001"})
# → {"email": "TOKEN_A1B2C3D4", "order": "ORD-001"}

# Send masked payload to AI...
ai_response = "The user TOKEN_A1B2C3D4 placed order ORD-001"

# Restore original values
restored = masker.unmask(ai_response)
# → "The user alice@example.com placed order ORD-001"`}
      </CodeBlock>

      <SectionHeader number={4} title="What to Mask vs What to Preserve" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Always mask', description: 'Email addresses, phone numbers, SSN/national IDs, credit card numbers, passwords, API keys, access tokens, home addresses, dates of birth, IP addresses.' },
        { title: 'Usually preserve', description: 'Field names (keys), data types, boolean values, numeric ranges (age: 30), non-PII identifiers (order_id), timestamps (format only, not exact value), enum values.' },
        { title: 'Context-dependent', description: 'Full names (mask if user data, keep if public figure), company names (depends on sensitivity), location (city-level usually OK, street address mask).' },
        { title: 'Preserve for AI analysis', description: 'JSON structure, field names, data types, approximate values. The AI needs these to give useful analysis about your schema and data patterns.' },
      ]} />

      <AlertBox type="tip" title="Use our AI Schema Masker tool">
        unblockdevs.com/ai-schema-masker automatically detects and masks PII fields in your
        JSON before you send it to any AI. Preview the masked output and configure which
        field patterns to mask.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does masking JSON prevent AI from giving useful analysis?',
          answer: 'Not significantly. AI analyzes JSON structure, field names, relationships, and data types — not individual values. A masked email (****@company.com) still tells the AI this is an email field. A masked name still shows it\'s a string field. You lose specific value analysis but keep structural analysis, which is usually what matters.',
        },
        {
          question: 'What regulations require masking before AI processing?',
          answer: 'GDPR (EU): requires lawful basis to process personal data — sending PII to external AI processors may require DPA agreements. HIPAA (US healthcare): patient data (PHI) cannot be sent to unauthorized processors. PCI-DSS: payment card data must never be sent to third parties without PCI compliance. When in doubt, mask first.',
        },
        {
          question: 'Can I use this for database schema masking before sending to ChatGPT?',
          answer: 'Yes — the same principle applies to SQL schemas. Mask table names (customers → TABLE_A), column names with PII (email → col_xyz), and any sample data. Preserve data types and relationships. We have a dedicated tool at unblockdevs.com/how-to-safely-mask-table-column-names-before-sending-queries-to-ai for SQL schema masking.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
