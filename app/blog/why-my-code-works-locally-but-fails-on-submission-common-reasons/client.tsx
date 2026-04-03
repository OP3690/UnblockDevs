'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhyMyCodeWorksLocallyButFailsOnSubmissionCommonReasonsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why My Code Works Locally But Fails on Submission — Common Reasons</h1>
      <p className="lead">
        "Works on my machine" is one of the most frustrating programming situations.
        Your code passes local tests but fails on the judge, server, or CI. The root cause is
        almost always an environment difference: input format, file paths, time limits, or
        assumptions that only hold locally. This guide covers every category with working fixes.
      </p>

      <StatGrid stats={[
        { value: 'Input format', label: 'judge input is different from your local test', color: 'red' },
        { value: 'Time limit', label: 'O(n²) works for small input, TLE on large judge input', color: 'amber' },
        { value: 'Edge cases', label: 'empty input, single element, max values not tested', color: 'blue' },
        { value: 'Platform diff', label: 'OS, language version, integer size differences', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Competitive Programming Submission Failures" />
      <QuickFact>
        Most "works locally, fails on judge" errors fall into 5 categories: (1) Wrong input reading
        method, (2) Time Limit Exceeded with large inputs, (3) Edge cases not tested locally,
        (4) Integer overflow, (5) Uninitialized variables that happen to be zero locally.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'TLE — Time Limit Exceeded', description: 'Your O(n²) solution works for your 100-element test but TLEs on the judge\'s 100,000-element input. Fix: analyze time complexity, switch to O(n log n) or O(n) algorithm. A 10^8 operation limit per second is the standard estimate.' },
        { title: 'Wrong input format', description: 'You\'re reading a single line but judge sends multiple test cases. Or reading with cin but judge uses whitespace differently. Always read exactly what the problem statement describes — no assumptions.' },
        { title: 'Integer overflow', description: 'int maxes at ~2.1 billion. If n = 10^5 and you compute n*n = 10^10, that overflows int silently. Use long long in C++, long in Java, BigInteger if needed. Overflow produces wrong answers, not runtime errors — making it hard to detect.' },
        { title: 'Uninitialized variables', description: 'int count; // undefined value (might be 0 locally by luck). Always initialize: int count = 0;. Many local environments zero-initialize; judges and online platforms do not. This is one of the most common subtle bugs.' },
      ]} />

      <SectionHeader number={2} title="Reading Input Correctly for Competitive Programming" />
      <p>
        One of the most common causes of local pass / judge fail is reading input incorrectly.
        The judge sends exactly what the problem specifies — your local test might not.
        Use bulk input reading for speed and correctness on large inputs.
      </p>

      <CodeBlock lang="python" title="Competitive programming — correct input reading template">{`# Always test edge cases before submitting
def solve(n, arr):
    # Your solution here
    pass

# Read exactly as judge sends — bulk read is fastest
import sys

def main():
    input_data = sys.stdin.read().split()
    idx = 0

    t = int(input_data[idx]); idx += 1  # number of test cases
    for _ in range(t):
        n = int(input_data[idx]); idx += 1
        arr = [int(input_data[idx+i]) for i in range(n)]
        idx += n
        print(solve(n, arr))

# Edge case tests — always run these before submitting
print("=== Edge cases ===")
print(solve(1, [0]))           # single element zero
print(solve(1, [10**9]))       # max value
print(solve(0, []))            # empty input
print(solve(5, [1,1,1,1,1]))   # all same
print(solve(5, [-1,-2,-3,-4,-5]))  # all negative

main()  # comment out for submission`}</CodeBlock>

      <CodeBlock lang="cpp" title="C++ — fast I/O and integer overflow prevention">{`#include <bits/stdc++.h>
using namespace std;

// Fast I/O — required for large inputs
ios_base::sync_with_stdio(false);
cin.tie(NULL);

// Use long long to prevent overflow
long long n, m;
cin >> n >> m;

// Dangerous: n*n might overflow if n is large
// long long result = n * n;  // ❌ if n is int

// Safe: explicitly cast to long long before multiply
long long result = (long long)n * n;  // ✅

// Or declare n as long long from the start
long long a, b;
cin >> a >> b;
long long product = a * b;  // safe — both long long`}</CodeBlock>

      <SectionHeader number={3} title="Production Deployment Failures" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Environment variables missing', description: 'process.env.API_KEY works locally (.env file). Fails in production because .env isn\'t deployed. Fix: add to deployment env vars / secrets manager. Never commit .env files to git.' },
        { title: 'File path differences', description: 'Local: __dirname + "/data.json" works. Server: different directory structure. Fix: use path.join(__dirname, "data.json") for relative paths, or move to config-driven paths.' },
        { title: 'Node/Python version mismatch', description: 'Local: Node 20. Server: Node 16. Optional chaining (?.) doesn\'t exist in old Node. Fix: specify engine version in package.json, use .nvmrc, Docker for exact env match.' },
        { title: 'Case-sensitive file system', description: 'Mac/Windows: import "./Component" works even if file is "component.tsx". Linux server: case-sensitive — import must exactly match. Fix: always match case exactly in imports.' },
      ]} />

      <SectionHeader number={4} title="CI/CD Pipeline Failures" />
      <AlertBox type="warning" title="CI failures that don't reproduce locally">
        The most common CI-only failures: missing environment variables in CI config, different
        Node.js version in CI runner, test isolation issues (tests pass in random order locally,
        fail in fixed order on CI), and missing native dependencies for npm packages with
        native bindings.
      </AlertBox>

      <CodeBlock lang="yaml" title="GitHub Actions — match local environment precisely">{`name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Pin exact Node version — match your local version
      - uses: actions/setup-node@v4
        with:
          node-version: '20.11.0'  # exact version, not just '20'
          cache: 'npm'

      # Verify env vars are present
      - name: Check required env vars
        run: |
          test -n "$DATABASE_URL" || (echo "Missing DATABASE_URL" && exit 1)
          test -n "$API_KEY" || (echo "Missing API_KEY" && exit 1)
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          API_KEY: \${{ secrets.API_KEY }}

      - run: npm ci
      - run: npm test`}</CodeBlock>

      <SectionHeader number={5} title="Debug Checklist — Production Deployments" />
      <CodeBlock lang="javascript" title="Startup checks — catch environment issues immediately">{`// Run these checks at app startup — fail fast with clear errors
const required = ['DATABASE_URL', 'API_KEY', 'SECRET_KEY'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
  throw new Error('Missing required env vars: ' + missing.join(', '));
}

// Use path.join for cross-platform file paths
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'config.json');
// Not: '../data/config.json' (works on Mac, may fail on Windows CI)

// Log runtime environment to catch version mismatches
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Environment:', process.env.NODE_ENV);

// Always use exact case in imports (for Linux servers)
// ✅ import Button from './Button'    (file is Button.tsx)
// ❌ import Button from './button'    (file is Button.tsx — fails on Linux)`}</CodeBlock>

      <SectionHeader number={6} title="Docker — The Nuclear Option for Environment Differences" />
      <AlertBox type="tip" title="Docker eliminates environment differences completely">
        Use Docker for production deployments to ensure dev and prod use identical environments.
        A Dockerfile pins OS, runtime version, and system libraries. What runs in your Docker
        container locally runs identically in production — eliminating 90% of "works locally"
        issues for deployment scenarios.
      </AlertBox>

      <CodeBlock lang="dockerfile" title="Dockerfile — pin exact versions for reproducibility">{`# Use exact version tag, never :latest
FROM node:20.11.0-alpine3.19

WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Build step
RUN npm run build

# Run as non-root user for security
USER node

EXPOSE 3000
CMD ["node", "server.js"]`}</CodeBlock>

      <SectionHeader number={7} title="Stress Testing Before Submission" />
      <VerticalSteps steps={[
        { title: 'Identify time complexity', desc: 'Count nested loops. O(n²) with n=10^5 = 10^10 operations = TLE. O(n log n) = safe.' },
        { title: 'Generate max-size input', desc: 'n = problem maximum (e.g., 10^5). Use random values including edge cases (0, negatives, max values).' },
        { title: 'Run with timing', desc: 'time python solution.py < large_input.txt. If >1-2 seconds, you will TLE.' },
        { title: 'Stress test against brute force', desc: 'Run optimized + brute force on small random inputs. Compare output. Finds WA bugs before submission.' },
        { title: 'Test boundary conditions', desc: 'n=1, n=max, all same values, sorted ascending/descending, empty arrays if applicable.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'My competitive programming code gives correct output but still WA. Why?',
          answer: 'Common causes: trailing space or newline in output (print extra space after last element), using wrong output format (printing 1/0 instead of "Yes"/"No"), floating point precision (use long long math or round carefully), or off-by-one error that only appears on certain cases. Compare your exact output character-by-character against expected output. Use repr() in Python to see invisible whitespace.',
        },
        {
          question: 'How do I test my code with large inputs locally?',
          answer: 'Generate stress test cases: write a script that creates random inputs of maximum size (n=10^5, values up to 10^9), run your solution with time measurement (time python solution.py < large_input.txt), compare against a known-correct brute force on small inputs. This catches TLE and wrong answers before submission.',
        },
        {
          question: 'My API works in Postman but not when deployed. What should I check?',
          answer: 'Check: (1) CORS headers — localhost is different from production domain, (2) HTTPS vs HTTP — production must use HTTPS, (3) Environment variables — API keys/DB URLs may differ, (4) Port — production may use 443/80 not 3000, (5) Proxy settings — production may have a reverse proxy affecting paths, (6) Database connectivity — production DB may not be accessible from new server.',
        },
        {
          question: 'Why does my code fail only on the judge\'s first test case?',
          answer: 'If it fails on test case 1, the likely causes are: wrong input reading format (you\'re reading single test case when there are multiple), off-by-one in array indexing, or an uninitialized variable that happens to work correctly on your local input but not the judge\'s. Add debug output to print what you read from input first.',
        },
        {
          question: 'How do I debug a deployment that works in staging but fails in production?',
          answer: 'Compare environment variables between staging and production. Check database connection strings, feature flags, and third-party API keys. Enable verbose logging in production temporarily. Compare Node/Python versions between environments. Often the culprit is a missing secret, a different database schema, or a third-party API key that works in staging but has different permissions in production.',
        },
        {
          question: 'Can running tests in parallel cause "works locally, fails on CI" issues?',
          answer: 'Yes — shared state between tests is the classic cause. Tests that modify global variables, shared databases, or shared files will fail non-deterministically when run in parallel. Fix: each test should set up and tear down its own state, use test-specific database records or namespaces, and avoid global singleton patterns in test setup.',
        },
        {
          question: 'What is the most reliable way to ensure local and production parity?',
          answer: 'Docker Compose for local development. Run the same Docker images locally that you deploy in production. Include all services (database, cache, message queue) in your docker-compose.yml. This eliminates OS differences, version differences, and dependency differences. Combined with pinned versions in package.json and lockfiles committed to git, you get near-perfect parity.',
        },
        {
          question: 'My code has integer overflow. How do I detect it before the judge does?',
          answer: 'In Python, integers are arbitrary precision — no overflow possible. In C++/Java, use long long for anything that could exceed 2 billion. A rule of thumb: if n is up to 10^5 and you multiply two n-sized values, use long long. Enable compiler sanitizers: -fsanitize=undefined,address in C++ catches overflow in debug builds.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
