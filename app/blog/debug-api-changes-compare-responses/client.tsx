'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function DebugApiChangesCompareResponsesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Debug API Changes — How to Compare API Responses to Find Breaking Changes</h1>
      <p className="lead">
        APIs change, and those changes break clients in subtle ways. A field gets renamed, a number
        becomes a string, a nullable field goes required. This guide covers tools and techniques to
        compare API responses, detect breaking changes, and debug unexpected behavior when an API
        behaves differently than expected — from quick curl diffs to automated CI/CD contract testing.
      </p>

      <StatGrid stats={[
        { value: 'diff', label: 'the fundamental tool for comparing responses', color: 'blue' },
        { value: 'JSON Schema', label: 'validate structure has not changed', color: 'green' },
        { value: 'HAR files', label: 'capture full request/response pairs for comparison', color: 'purple' },
        { value: 'Semantic diff', label: 'detect type changes, not just text changes', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why API Responses Change (and How to Catch It)" />
      <QuickFact color="amber" label="The invisible breaking change">
        APIs change for many reasons: backend refactors, bug fixes, new features, and infrastructure
        migrations. Even "non-breaking" changes break clients: a field changing from int to float,
        a null becoming an empty string, or a date format changing from ISO 8601 to epoch milliseconds.
        The earlier you detect these, the cheaper they are to fix.
      </QuickFact>

      <CompareTable
        leftLabel="Change Type"
        rightLabel="Breaking? Why?"
        rows={[
          { label: 'Remove a field', left: 'Always breaking', right: 'Any client reading that field crashes or gets undefined' },
          { label: 'Rename a field (user_id → userId)', left: 'Always breaking', right: 'Old field name returns undefined — same as removal' },
          { label: 'Change type (int → string)', left: 'Usually breaking', right: 'parseInt("123") works, but logic comparing === 123 breaks' },
          { label: 'Null → empty string', left: 'Often breaking', right: 'if (field === null) checks miss empty string; if (!field) may work' },
          { label: 'Add required field', left: 'Breaking for POST/PUT', right: 'Clients not sending new required field get 422/400' },
          { label: 'Add optional field', left: 'Non-breaking', right: 'Clients ignore unknown fields — safe addition' },
          { label: 'Change date format', left: 'Breaking for parsers', right: 'new Date("2024-01-15T10:00:00Z") vs new Date(1705312800000)' },
          { label: 'Change status codes', left: 'Breaking for status checks', right: '200 → 201 on create breaks if (!response.ok) still passes but if (status === 200) fails' },
        ]}
      />

      <SectionHeader number={2} title="Method 1 — curl + diff" />
      <CodeBlock language="bash" filename="Capture and Compare API Responses">
{`# Step 1: Capture baseline response (before the change)
curl -s https://api.example.com/users/123 \\
  -H "Authorization: Bearer TOKEN" \\
  | python3 -m json.tool > baseline.json

# Step 2: After the API change, capture new response
curl -s https://api.example.com/users/123 \\
  -H "Authorization: Bearer TOKEN" \\
  | python3 -m json.tool > current.json

# Step 3: Compare with diff (shows line-level changes)
diff baseline.json current.json

# Better: use jq for normalized comparison (sorts keys, ignores formatting)
diff <(jq -S . baseline.json) <(jq -S . current.json)

# Colored diff output (easier to read)
diff --color=always <(jq -S . baseline.json) <(jq -S . current.json)

# Find only key changes (added/removed fields, not value changes):
diff <(jq -r '[paths | join(".")]' baseline.json | sort) \\
     <(jq -r '[paths | join(".")]' current.json | sort)

# Compare specific nested field:
jq '.user.address' baseline.json > /tmp/old_addr.json
jq '.user.address' current.json > /tmp/new_addr.json
diff /tmp/old_addr.json /tmp/new_addr.json

# Batch compare all endpoints in a list:
for endpoint in /users /products /orders; do
  curl -s "https://api.example.com$endpoint" | jq -S . > "current_$(echo $endpoint | tr / _).json"
  diff "baseline_$(echo $endpoint | tr / _).json" "current_$(echo $endpoint | tr / _).json" \\
    && echo "$endpoint: no changes" \\
    || echo "$endpoint: CHANGED ⚠️"
done`}
      </CodeBlock>

      <SectionHeader number={3} title="Method 2 — JSON Schema Validation" />
      <CodeBlock language="python" filename="Detect Structural API Changes with JSON Schema">
{`import jsonschema
import requests
import json
from typing import Any

# Define expected schema (generate from a known-good response with genson:
# pip install genson; python -c "from genson import SchemaBuilder; ...")
expected_schema = {
    "type": "object",
    "required": ["id", "name", "email", "created_at"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string", "minLength": 1},
        "email": {"type": "string", "format": "email"},
        "created_at": {"type": "string", "pattern": r"^\d{4}-\d{2}-\d{2}"},
        "role": {"type": "string", "enum": ["admin", "user", "viewer"]},
        "tags": {"type": "array", "items": {"type": "string"}},
        "metadata": {"type": ["object", "null"]},
    },
    "additionalProperties": False,  # Alert on new unknown fields
}

def check_api_contract(url: str, token: str) -> bool:
    response = requests.get(url, headers={"Authorization": f"Bearer {token}"})
    response.raise_for_status()
    data = response.json()

    try:
        jsonschema.validate(data, expected_schema)
        print(f"✅ {url} — matches expected schema")
        return True
    except jsonschema.ValidationError as e:
        print(f"❌ {url} — Schema violation:")
        print(f"   Error: {e.message}")
        print(f"   Path: {' → '.join(str(p) for p in e.path)}")
        print(f"   Got value: {e.instance!r}")
        return False
    except jsonschema.SchemaError as e:
        print(f"⚠️  Schema definition error: {e.message}")
        return False

# Run against multiple endpoints
endpoints = [
    "https://api.example.com/users/1",
    "https://api.example.com/users/2",
    "https://api.example.com/users/100",  # edge: near boundary
]

all_pass = all(check_api_contract(url, "mytoken") for url in endpoints)
print("\\nAll checks passed!" if all_pass else "\\n⚠️  Contract violations detected!")`}
      </CodeBlock>

      <SectionHeader number={4} title="Method 3 — Semantic Response Diffing" />
      <CodeBlock language="python" filename="Deep JSON Comparison — Type-aware">
{`from typing import Any

def semantic_diff(old_data: Any, new_data: Any, path: str = "") -> list[str]:
    """Recursively compare JSON objects and report meaningful differences.
    Detects: type changes, added/removed fields, value changes."""
    issues = []

    # Type change is most critical — catches int→string, null→string, etc.
    if type(old_data) != type(new_data):
        issues.append(
            f"TYPE CHANGE at '{path}': "
            f"{type(old_data).__name__} → {type(new_data).__name__} "
            f"(was: {old_data!r}, now: {new_data!r})"
        )
        return issues  # Don't recurse — types differ fundamentally

    if isinstance(old_data, dict):
        old_keys, new_keys = set(old_data), set(new_data)

        # Removed keys (breaking!)
        for key in old_keys - new_keys:
            issues.append(f"REMOVED FIELD: '{path}.{key}' (was: {old_data[key]!r})")

        # Added keys (usually non-breaking, but track them)
        for key in new_keys - old_keys:
            issues.append(f"ADDED FIELD: '{path}.{key}' = {new_data[key]!r}")

        # Check common keys recursively
        for key in old_keys & new_keys:
            child_path = f"{path}.{key}" if path else key
            issues.extend(semantic_diff(old_data[key], new_data[key], child_path))

    elif isinstance(old_data, list):
        # Compare first elements as schema examples
        if old_data and new_data:
            issues.extend(semantic_diff(old_data[0], new_data[0], f"{path}[0]"))
        if bool(old_data) != bool(new_data):
            issues.append(f"EMPTINESS CHANGE at '{path}': was {'empty' if not old_data else 'non-empty'}")
    else:
        # Scalar value change — note but may be expected
        if old_data != new_data:
            issues.append(f"VALUE CHANGE at '{path}': {old_data!r} → {new_data!r}")

    return issues

# Usage: compare baseline with current
import requests, json

baseline = json.loads(open("baseline.json").read())
current = requests.get("https://api.example.com/users/1",
                       headers={"Authorization": "Bearer TOKEN"}).json()

issues = semantic_diff(baseline, current)
breaking = [i for i in issues if any(w in i for w in ["REMOVED", "TYPE CHANGE"])]
non_breaking = [i for i in issues if i not in breaking]

print(f"🔴 Breaking changes ({len(breaking)}):")
for issue in breaking: print(f"  {issue}")

print(f"\\n🟡 Non-breaking changes ({len(non_breaking)}):")
for issue in non_breaking: print(f"  {issue}")`}
      </CodeBlock>

      <SectionHeader number={5} title="Method 4 — HAR File Comparison" />
      <AlertBox type="tip" title="HAR files capture the full context — not just the response">
        HAR (HTTP Archive) files include: request headers, response headers, timing, redirects, and
        the response body. Tools like Chrome DevTools, Insomnia, and Burp Suite can export HARs.
        Compare two HAR files to find exactly what changed in the full HTTP exchange — including
        headers like Content-Type, Cache-Control, and rate limit headers.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Export HAR from Chrome', description: 'DevTools → Network → right-click request → "Save all as HAR with content". Captures timing, all request/response headers, and full response bodies. Use for complex multi-request flows.' },
        { title: 'HARdiff (CLI tool)', description: 'npm install -g hardiff. Compare two HAR files: hardiff before.har after.har. Shows diffs in request/response pairs. Great for comparing browser-captured API calls.' },
        { title: 'Insomnia Request History', description: 'Insomnia stores history of all responses. Select two responses in the history panel → Compare — built-in diff view shows side-by-side request/response changes.' },
        { title: 'Postman Collections + Newman', description: 'Run a Postman collection against two environments (staging/production). Newman outputs pass/fail per test and captures response bodies for diff. Add pm.test() assertions for schema checks.' },
      ]} />

      <SectionHeader number={6} title="Automated API Change Detection in CI" />
      <CodeBlock language="yaml" filename="GitHub Actions — API Contract Tests">
{`name: API Contract Tests
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  api-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install requests jsonschema

      - name: Run API schema validation
        run: python tests/validate_api_schema.py
        env:
          API_URL: https://staging.api.example.com
          API_TOKEN: \${{ secrets.TEST_TOKEN }}

      - name: Compare against baseline
        run: |
          # Fetch current response
          curl -s https://staging.api.example.com/users/1 \\
            -H "Authorization: Bearer \${{ secrets.TEST_TOKEN }}" \\
            | jq -S . > current.json

          # Diff against committed baseline
          diff tests/baselines/users_1.json current.json
          if [ $? -ne 0 ]; then
            echo "::error::API response changed — update baseline or fix regression"
            exit 1
          fi

      - name: OpenAPI contract test (dredd)
        run: |
          npm install -g dredd
          dredd openapi.yaml https://staging.api.example.com \\
            --header "Authorization:Bearer \${{ secrets.TEST_TOKEN }}" \\
            --reporter junit --output dredd-results.xml

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: api-test-results
          path: dredd-results.xml`}
      </CodeBlock>

      <SectionHeader number={7} title="Debugging Workflow Step by Step" />
      <VerticalSteps steps={[
        { title: 'Reproduce the issue with a minimal curl command', desc: 'Isolate the breaking endpoint to a single curl -v command. Copy it from Chrome DevTools Network tab (right-click → Copy as cURL) to get exact headers and body. This eliminates client-side code as the source of the issue.' },
        { title: 'Capture baseline and current responses', desc: 'Fetch from both the old (working) environment and the new (broken) environment. Save both with jq -S . for normalized formatting. If you don\'t have access to the old API, check your test fixtures, recorded VCR cassettes, or git history for saved responses.' },
        { title: 'Run semantic diff to classify changes', desc: 'Use the semantic_diff() function or jq to compare key-by-key. Classify each change as breaking (removed/type-changed) or non-breaking (added). Focus on breaking changes first — they\'re the ones causing errors.' },
        { title: 'Validate against your schema', desc: 'Run JSON Schema validation against the new response. This catches type changes (int→string) and missing required fields that raw diff might miss if the value happens to look similar.' },
        { title: 'Check HTTP headers and status codes', desc: 'Status code changes (200→201, 200→204) break status-specific client code. Content-Type changes break parsers. Cache-Control changes can cause stale data issues. Use diff on the full curl -i output to catch these.' },
        { title: 'Update client code or request a revert', desc: 'For breaking changes without deprecation notice: file a bug with the API team and request a revert or versioned endpoint. For intentional changes: update your client code, add migration tests, and update your baseline snapshots in CI.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is a breaking vs non-breaking API change?',
          answer: 'Breaking: removing a field, changing a field type (string→int), making an optional field required, changing endpoint URL, changing auth mechanism, changing error response format. Non-breaking: adding a new optional field, adding a new endpoint, adding new valid enum values, relaxing validation. The key test: will existing clients that don\'t know about this change still work correctly? If no, it\'s breaking.',
        },
        {
          question: 'How do I detect API changes automatically in production?',
          answer: 'Use API monitoring tools: Checkly runs API tests on a schedule and alerts on schema changes. Postman Monitors run collections on a schedule. A custom solution: save a canonical response to S3 or your Git repo as a baseline fixture. Run a nightly GitHub Actions job that fetches the live response, runs semantic_diff() against the baseline, and creates a GitHub issue if breaking changes are detected.',
        },
        {
          question: 'What is semantic versioning for APIs?',
          answer: 'Major version (v1 → v2): breaking changes that clients must opt into. Minor version: new non-breaking features (new endpoints, new optional fields). Patch: bug fixes that don\'t change the contract. RESTful APIs typically version via URL (/api/v1/, /api/v2/) or the Accept header (Accept: application/vnd.api+json; version=2). Clients pin to v1 and migrate to v2 explicitly, preventing surprise breakage.',
        },
        {
          question: 'How do I compare GraphQL API changes?',
          answer: 'GraphQL has schema introspection — you can query the schema itself with __schema. Use graphql-inspector (CLI and GitHub Action) to compare two GraphQL schemas and classify changes as breaking (removed types/fields, changed argument types), dangerous (changed default values), or non-breaking (added types/fields). Run it as a PR check to prevent breaking schema changes from reaching production.',
        },
        {
          question: 'What tools can automatically generate JSON Schema from a response?',
          answer: 'genson (Python): SchemaBuilder().add_object(response_json).to_schema() generates a draft schema from example data. quicktype.io generates TypeScript types and JSON Schema from sample JSON. Postman can infer schemas from response examples. Generate schemas from known-good responses, then commit them to your repo and validate new responses against them in CI.',
        },
        {
          question: 'How do I handle API pagination when comparing responses?',
          answer: 'Paginated responses change with data — comparing raw paginated responses is noisy. Instead: (1) compare a single item endpoint (/users/1) rather than a list. (2) Compare the response schema structure, not values. (3) Store a canonical first-page response with fixed test data (use a dedicated test user/product). (4) Use JSON Schema validation which checks structure regardless of specific values.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
