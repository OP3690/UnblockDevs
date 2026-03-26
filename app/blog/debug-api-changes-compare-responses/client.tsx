'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function DebugApiChangesCompareResponsesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Debug API Changes — How to Compare API Responses to Find Breaking Changes</h1>
      <p className="lead">
        APIs change, and those changes break clients in subtle ways. A field gets renamed, a number
        becomes a string, a nullable field goes required. This guide covers tools and techniques to
        compare API responses, detect breaking changes, and debug unexpected behavior when an API
        behaves differently than expected.
      </p>

      <StatGrid stats={[
        { value: 'diff', label: 'the fundamental tool for comparing responses', color: 'blue' },
        { value: 'JSON Schema', label: 'validate structure has not changed', color: 'green' },
        { value: 'HAR files', label: 'capture full request/response pairs for comparison', color: 'purple' },
        { value: 'Semantic diff', label: 'detect type changes, not just text changes', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why API Responses Change (and How to Catch It)" />
      <QuickFact>
        APIs change for many reasons: backend refactors, bug fixes, new features, and infrastructure
        migrations. Even "non-breaking" changes break clients: a field changing from int to float,
        a null becoming an empty string, or a date format changing from ISO to epoch milliseconds.
      </QuickFact>

      <SectionHeader number={2} title="Method 1 — curl + diff" />
      <CodeBlock language="bash" filename="Capture and Compare API Responses">
{`# Step 1: Capture baseline response
curl -s https://api.example.com/users/123 \\
  -H "Authorization: Bearer TOKEN" \\
  | python3 -m json.tool > baseline.json

# Step 2: After the API change, capture new response
curl -s https://api.example.com/users/123 \\
  -H "Authorization: Bearer TOKEN" \\
  | python3 -m json.tool > current.json

# Step 3: Compare with diff
diff baseline.json current.json

# Better: use jq for normalized comparison (ignores whitespace)
diff <(jq -S . baseline.json) <(jq -S . current.json)

# Even better: colored diff
diff --color=always <(jq -S . baseline.json) <(jq -S . current.json)

# Find added/removed keys only:
diff <(jq -r 'keys[]' baseline.json) <(jq -r 'keys[]' current.json)`}
      </CodeBlock>

      <SectionHeader number={3} title="Method 2 — JSON Schema Validation" />
      <CodeBlock language="python" filename="Detect Structural API Changes with JSON Schema">
{`import jsonschema
import requests
import json

# Define expected schema
expected_schema = {
    "type": "object",
    "required": ["id", "name", "email", "created_at"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "created_at": {"type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}"},
        "role": {"type": "string", "enum": ["admin", "user", "viewer"]}
    }
}

def check_api_contract(url, token):
    response = requests.get(url, headers={"Authorization": f"Bearer {token}"})
    data = response.json()

    try:
        jsonschema.validate(data, expected_schema)
        print("✅ API response matches expected schema")
    except jsonschema.ValidationError as e:
        print(f"❌ Schema violation: {e.message}")
        print(f"   Path: {' → '.join(str(p) for p in e.path)}")
        print(f"   Got: {e.instance}")
        return False
    return True

check_api_contract("https://api.example.com/users/1", "mytoken")`}
      </CodeBlock>

      <SectionHeader number={4} title="Method 3 — Semantic Response Diffing" />
      <CodeBlock language="python" filename="Deep JSON Comparison">
{`def semantic_diff(old_data, new_data, path=""):
    """Recursively compare JSON objects and report meaningful differences"""
    issues = []

    if type(old_data) != type(new_data):
        issues.append(f"TYPE CHANGE at '{path}': {type(old_data).__name__} → {type(new_data).__name__}")
        return issues

    if isinstance(old_data, dict):
        # Check for removed keys
        for key in old_data:
            if key not in new_data:
                issues.append(f"REMOVED: '{path}.{key}'")

        # Check for added keys
        for key in new_data:
            if key not in old_data:
                issues.append(f"ADDED: '{path}.{key}' = {new_data[key]}")

        # Recursively check common keys
        for key in set(old_data) & set(new_data):
            issues.extend(semantic_diff(old_data[key], new_data[key], f"{path}.{key}"))

    elif isinstance(old_data, list):
        if len(old_data) > 0 and len(new_data) > 0:
            issues.extend(semantic_diff(old_data[0], new_data[0], f"{path}[0]"))
    else:
        if old_data != new_data:
            issues.append(f"VALUE CHANGE at '{path}': {old_data!r} → {new_data!r}")

    return issues

issues = semantic_diff(baseline_response, current_response)
for issue in issues:
    print(issue)`}
      </CodeBlock>

      <SectionHeader number={5} title="Method 4 — HAR File Comparison" />
      <AlertBox type="tip" title="HAR files capture the full context — not just the response">
        HAR (HTTP Archive) files include: request headers, response headers, timing, redirects, and
        the response body. Tools like Chrome DevTools, Insomnia, and Burp Suite can export HARs.
        Compare two HAR files to find exactly what changed in the full HTTP exchange.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Export HAR from Chrome', description: 'DevTools → Network → right-click request → "Save all as HAR with content". Captures timing, headers, request/response bodies.' },
        { title: 'HARdiff (CLI tool)', description: 'npm install -g hardiff. Compare two HAR files: hardiff before.har after.har. Shows diffs in request/response pairs.' },
        { title: 'Insomnia Request History', description: 'Insomnia stores history of all responses. Select two responses → Compare — built-in diff view for request/response.' },
        { title: 'Postman Collections + Newman', description: 'Run a Postman collection against two environments (staging/production). Newman outputs pass/fail per test and response diffs.' },
      ]} />

      <SectionHeader number={6} title="Automated API Change Detection in CI" />
      <CodeBlock language="yaml" filename="GitHub Actions — API Contract Tests">
{`name: API Contract Tests
on: [push, pull_request]

jobs:
  api-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run API contract tests
        run: |
          # Install dredd for API blueprint testing
          npm install -g dredd

          # Run contract tests against staging
          dredd api-spec.yaml https://staging.api.example.com \\
            --header "Authorization:Bearer \${{ secrets.TEST_TOKEN }}"

      - name: Schema validation
        run: python tests/validate_api_schema.py
        env:
          API_URL: https://staging.api.example.com
          API_TOKEN: \${{ secrets.TEST_TOKEN }}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is a breaking vs non-breaking API change?',
          answer: 'Breaking: removing a field, changing a field type (string→int), making an optional field required, changing endpoint URL, changing auth mechanism. Non-breaking: adding a new optional field, adding a new endpoint, relaxing validation. Additive changes are generally safe; removals and type changes always break clients.',
        },
        {
          question: 'How do I detect API changes automatically in production?',
          answer: 'Use API monitoring tools: Checkly runs API tests on a schedule and alerts on schema changes. Postman Monitors run collections on a schedule. A custom solution: save a canonical response to S3/Git, run a nightly job that fetches the live response and runs semantic_diff() against the saved baseline. Alert when changes are detected.',
        },
        {
          question: 'What is semantic versioning for APIs?',
          answer: 'Major version (v1 → v2): breaking changes. Minor version: new non-breaking features. Patch: bug fixes. RESTful APIs often version via URL (/api/v1/, /api/v2/) or Accept header (Accept: application/vnd.api+json; version=2). Clients pin to v1 until they explicitly migrate.',
        },
        {
          question: 'How do I compare GraphQL API changes?',
          answer: 'GraphQL has introspection — you can query the schema itself. Tools: graphql-inspector (CLI and CI integration) compares two GraphQL schemas and classifies breaking vs dangerous vs non-breaking changes. Run it as a pre-deployment gate to prevent breaking changes from reaching production.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
