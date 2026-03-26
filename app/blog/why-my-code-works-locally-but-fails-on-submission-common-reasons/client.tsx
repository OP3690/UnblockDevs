'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhyMyCodeWorksLocallyButFailsOnSubmissionCommonReasonsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why My Code Works Locally But Fails on Submission — Common Reasons</h1>
      <p className="lead">
        "Works on my machine" is one of the most frustrating programming situations.
        Your code passes local tests but fails on the judge, server, or CI. The root cause is
        almost always an environment difference: input format, file paths, time limits, or
        assumptions that only hold locally.
      </p>

      <StatGrid stats={[
        { value: 'Input format', label: 'judge input is different from your local test', color: 'red' },
        { value: 'Time limit', label: 'O(n²) works for small input, TLE on large judge input', color: 'amber' },
        { value: 'Edge cases', label: 'empty input, single element, max values', color: 'blue' },
        { value: 'Platform diff', label: 'OS, language version, integer size differences', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Competitive Programming Submission Failures" />
      <QuickFact>
        Most "works locally, fails on judge" errors fall into 5 categories: (1) Wrong input reading
        method, (2) Time Limit Exceeded with large inputs, (3) Edge cases not tested locally,
        (4) Integer overflow, (5) Uninitialized variables that happen to be zero locally.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'TLE — Time Limit Exceeded', description: 'Your O(n²) solution works for your 100-element test but TLEs on the judge\'s 100,000-element input. Fix: analyze time complexity, switch to O(n log n) or O(n) algorithm.' },
        { title: 'Wrong input format', description: 'You\'re reading a single line but judge sends multiple test cases. Or reading with cin but judge uses whitespace differently. Always read exactly what the problem states.' },
        { title: 'Integer overflow', description: 'int maxes at ~2.1 billion. If n = 10^5 and you compute n*n = 10^10, that overflows int. Use long long in C++, long in Java, BigInteger if needed.' },
        { title: 'Uninitialized variables', description: 'int count; // undefined value (might be 0 locally by luck). Always initialize: int count = 0;. Many local environments zero-initialize; judges don\'t.' },
      ]} />

      <SectionHeader number={2} title="Production Deployment Failures" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Environment variables missing', description: 'process.env.API_KEY works locally (.env file). Fails in production because .env isn\'t deployed. Fix: add to deployment env vars / secrets manager.' },
        { title: 'File path differences', description: 'Local: __dirname + "/data.json" works. Server: different directory structure. Fix: use path.join(__dirname, "data.json") for relative paths, or move to config-driven paths.' },
        { title: 'Node/Python version mismatch', description: 'Local: Node 20. Server: Node 16. Optional chaining (?.) doesn\'t exist in old Node. Fix: specify engine version in package.json, use .nvmrc, Docker for exact env match.' },
        { title: 'Case-sensitive file system', description: 'Mac/Windows: import "./Component" works even if file is "component.tsx". Linux server: case-sensitive — import must exactly match. Fix: always match case exactly in imports.' },
      ]} />

      <SectionHeader number={3} title="Debug Checklist" />
      <CodeBlock language="python" filename="Competitive programming debug template">
{`# Always test edge cases before submitting
def solve(n, arr):
    # Your solution here
    pass

# Test with judge-like input
import sys

def main():
    # Read exactly as judge sends
    input_data = sys.stdin.read().split()
    idx = 0

    t = int(input_data[idx]); idx += 1  # number of test cases
    for _ in range(t):
        n = int(input_data[idx]); idx += 1
        arr = [int(input_data[idx+i]) for i in range(n)]
        idx += n
        print(solve(n, arr))

# Edge case tests
print("=== Edge cases ===")
print(solve(1, [0]))           # single element
print(solve(1, [10**9]))       # max value
print(solve(0, []))            # empty
print(solve(5, [1,1,1,1,1]))   # all same
print(solve(5, [-1,-2,-3,-4,-5]))  # all negative

main()  # comment out for submission`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Production: check for environment differences">
{`// Check required env vars on startup
const required = ['DATABASE_URL', 'API_KEY', 'SECRET'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
  throw new Error('Missing required env vars: ' + missing.join(', '));
}

// Use path.join for cross-platform file paths
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'config.json');
// Not: '../data/config.json' (works on Mac, may fail on Windows CI)

// Log Node version to catch mismatch
console.log('Node version:', process.version);

// Always use exact case in imports (for Linux servers)
// ✅ import Button from './Button'    (file is Button.tsx)
// ❌ import Button from './button'    (file is Button.tsx — fails on Linux)`}
      </CodeBlock>

      <AlertBox type="tip" title="Docker eliminates environment differences">
        Use Docker for production deployments to ensure dev and prod use identical environments.
        A Dockerfile pins: OS, runtime version, system libraries. What runs in your Docker
        container locally runs identically in production. eliminates 90% of "works locally"
        issues for production deployments.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'My competitive programming code gives correct output but still WA. Why?',
          answer: 'Common causes: trailing space or newline in output (print extra space after last element), using wrong output format (printing 1/0 instead of "Yes"/"No"), floating point precision (use long long math or round carefully), or off-by-one error that only appears in certain cases. Compare your exact output character-by-character against expected.',
        },
        {
          question: 'How do I test my code with large inputs locally?',
          answer: 'Generate stress test cases: write a script that creates random inputs of maximum size (n=10^5, values up to 10^9), run your solution with time measurement (time python solution.py < large_input.txt), compare against a known-correct brute force on small inputs. This catches TLE and wrong answers before submission.',
        },
        {
          question: 'My API works in Postman but not when deployed. What should I check?',
          answer: 'Check: (1) CORS headers — localhost is different from production domain, (2) HTTPS vs HTTP — production must use HTTPS, (3) Environment variables — API keys/DB URLs may differ, (4) Port — production may use 443/80 not 3000, (5) Proxy settings — production may have a reverse proxy affecting paths, (6) Database connectivity — production DB may not be accessible from new server.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
