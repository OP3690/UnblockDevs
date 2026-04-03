'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function BenfordsLawExplainedCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Benford's Law Explained — Complete Guide: The Surprising Mathematical Pattern in Real Data</h1>
      <p className="lead">
        Benford's Law states that in many real-world datasets, the leading digit is far more likely to
        be 1 than 9. About 30% of numbers start with 1, while only 4.6% start with 9. This seemingly
        bizarre pattern appears in financial data, population statistics, and scientific constants —
        and is used by auditors, tax authorities, and fraud investigators worldwide.
      </p>

      <StatGrid stats={[
        { value: '30.1%', label: 'of numbers in natural datasets start with digit 1', color: 'blue' },
        { value: '4.6%', label: 'of numbers start with digit 9 — least common', color: 'red' },
        { value: 'Fraud Detection', label: 'primary real-world application in forensic accounting', color: 'purple' },
        { value: '1938', label: 'year Frank Benford formally described the law (Simon Newcomb in 1881)', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Benford's Law?" />
      <QuickFact color="blue" label="The formula">
        Benford's Law (also called the first-digit law) predicts that in many naturally occurring
        datasets, the probability that a number starts with digit d is log₁₀(1 + 1/d).
        For digit 1: log₁₀(2) ≈ 30.1%. For digit 9: log₁₀(10/9) ≈ 4.6%.
        Real data follows this distribution; fabricated data usually doesn't — people tend to
        pick numbers with "even" leading digits.
      </QuickFact>

      <CompareTable
        leftLabel="Leading Digit"
        rightLabel="Benford's Predicted Frequency"
        rows={[
          { label: '1', left: '30.1%', right: '██████████████████████████████ Most common' },
          { label: '2', left: '17.6%', right: '█████████████████' },
          { label: '3', left: '12.5%', right: '████████████' },
          { label: '4', left: '9.7%', right: '█████████' },
          { label: '5', left: '7.9%', right: '███████' },
          { label: '6', left: '6.7%', right: '██████' },
          { label: '7', left: '5.8%', right: '█████' },
          { label: '8', left: '5.1%', right: '████' },
          { label: '9', left: '4.6%', right: '████ Least common' },
        ]}
      />

      <SectionHeader number={2} title="Why Does Benford's Law Exist?" />
      <AlertBox type="tip" title="Scale invariance is the key intuition">
        If a dataset spans many orders of magnitude (1 to 1,000,000), numbers must spend proportionally
        more "time" in ranges starting with 1 (1–2, 10–20, 100–200, 1000–2000…) than in ranges starting
        with 9 (9–10, 90–100, 900–1000…). On a logarithmic scale, lower leading digits have larger
        relative ranges — that's why they appear more frequently.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Logarithmic Scale Explanation', description: 'On a log scale, the space between 1 and 2 equals the space between 2 and 4, or 4 and 8. Numbers distributed uniformly on a log scale naturally produce Benford\'s distribution. Digit 1 covers the largest log-scale range (log 2 − log 1 ≈ 0.301 = 30.1%).' },
        { title: 'Scale Invariance', description: 'If you convert dollars to euros (multiply by a constant), Benford\'s Law still holds. Multiply all numbers by any constant — the first-digit distribution is unchanged. This is unique to Benford\'s distribution and is why it applies across currencies, units, and scales.' },
        { title: 'Dataset Requirements', description: 'Works best when data spans multiple orders of magnitude (at least 2-3), has no artificial constraints on leading digits, and represents naturally growing quantities. Financial transactions, population sizes, and stock prices over years all qualify.' },
        { title: 'When Benford\'s Law Fails', description: 'Does not apply to: lottery numbers (uniform random by design), phone numbers (fixed digit count), heights of people (narrow range, 1.5–2.1m), items priced at $X.99 (designed to end in 9), or any dataset with built-in constraints on the range or distribution.' },
      ]} />

      <SectionHeader number={3} title="Fraud Detection with Benford's Law" />
      <CodeBlock language="python" filename="Benford's Law Fraud Detector in Python">
{`import math
from collections import Counter
from scipy import stats
import pandas as pd

def benfords_expected(digit: int) -> float:
    """Expected frequency of leading digit per Benford's Law"""
    return math.log10(1 + 1/digit)

def get_leading_digit(n) -> int | None:
    """Extract the first significant (non-zero) digit"""
    s = str(abs(float(n))).lstrip('0').replace('.', '')
    for c in s:
        if c.isdigit() and c != '0':
            return int(c)
    return None

def analyze_benford(numbers: list, name: str = "Dataset") -> dict:
    """
    Analyze a numeric dataset against Benford's Law.
    Returns: dict with digit frequencies, deviations, and chi-squared test result.
    """
    digits = [get_leading_digit(n) for n in numbers]
    digits = [d for d in digits if d is not None]
    total = len(digits)

    if total < 300:
        print(f"⚠️  Warning: only {total} values — need 1000+ for reliable Benford analysis")

    counts = Counter(digits)
    results = []

    print(f"\\nBenford's Law Analysis: {name}")
    print(f"Sample size: {total:,} numbers")
    print(f"{'Digit':>5} {'Observed':>10} {'Expected':>10} {'Deviation':>12} {'Flag':>15}")
    print("-" * 60)

    observed_freqs = []
    expected_freqs = []

    for d in range(1, 10):
        observed = counts.get(d, 0) / total
        expected = benfords_expected(d)
        deviation = (observed - expected) / expected * 100

        observed_freqs.append(counts.get(d, 0))
        expected_freqs.append(expected * total)

        flag = ""
        if abs(deviation) > 25:
            flag = "⚠️ SUSPICIOUS"
        elif abs(deviation) > 15:
            flag = "⚡ ELEVATED"

        print(f"{d:>5} {observed:>10.1%} {expected:>10.1%} {deviation:>+10.1f}%  {flag}")
        results.append({'digit': d, 'observed': observed, 'expected': expected, 'deviation': deviation})

    # Chi-squared test for overall conformance
    chi2, p_value = stats.chisquare(observed_freqs, expected_freqs)
    conforming = p_value > 0.05

    print(f"\\nChi-squared: {chi2:.2f}, p-value: {p_value:.4f}")
    print(f"Benford conformance: {'✅ PASS' if conforming else '❌ FAIL (p < 0.05)'}")

    return {'results': results, 'chi2': chi2, 'p_value': p_value, 'conforming': conforming}

# Example 1: Natural data — company revenues (should conform)
import random
revenues = [random.lognormal(8, 2) for _ in range(5000)]  # log-normal = Benford-conforming
analyze_benford(revenues, "Company Revenues (Natural)")

# Example 2: Fabricated expense data (humans avoid digit 1 when making up numbers)
fabricated = [random.choice([3000, 3200, 3500, 4100, 5200, 6300, 7100, 8200]) +
              random.randint(-100, 100) for _ in range(500)]
analyze_benford(fabricated, "Expense Claims (Suspicious — too many 3-8 starts)")`}
      </CodeBlock>

      <SectionHeader number={4} title="Real-World Applications" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Forensic Accounting and Tax Fraud', description: 'Tax authorities (IRS, HMRC, German Finanzbehörden) analyze expense reports and financial statements for Benford conformance. Humans fabricating numbers gravitate toward 3, 4, 5 — avoiding the "too obvious" 1 and the "random-looking" 9. Famous cases: Enron\'s reported financials and Bernie Madoff\'s client statements showed significant deviations.' },
        { title: 'Election Integrity Analysis', description: 'Vote tallies from legitimate elections typically follow Benford\'s Law. Disputed elections have been analyzed: researchers found anomalies in reported results from Venezuela (2004), Iran (2009), and several other elections. The analysis is controversial and not definitive on its own.' },
        { title: 'Scientific Data Integrity', description: 'Used to detect fabricated research data in academic papers. Published studies with anomalous digit distributions have been flagged for data manipulation investigations by journals. Diederik Stapel\'s fraudulent psychology research was partly identified via statistical analysis.' },
        { title: 'Macroeconomic Data Verification', description: 'Economic statistics reported by governments analyzed for Benford compliance. Deviations in GDP figures, inflation statistics, or trade balance numbers can indicate manipulated reporting. Used by IMF and World Bank as one indicator when reviewing member country statistics.' },
      ]} />

      <SectionHeader number={5} title="Applying Benford's Law Step by Step" />
      <VerticalSteps steps={[
        { title: 'Collect your numeric dataset', desc: 'Gather the numbers you want to analyze. Need at least 300+ values for any statistical meaning, 1,000+ for reliable results. Better to have 5,000-10,000 data points. Good sources: all expense reports from a period, all transaction amounts, all invoice totals, all payment amounts by an employee or vendor.' },
        { title: 'Verify your data is Benford-eligible', desc: 'Check that your data spans multiple orders of magnitude (does it range from, say, $10 to $100,000?), has no artificial constraints on leading digits, and represents naturally occurring quantities rather than assigned numbers (don\'t use account numbers, ID numbers, or lottery results).' },
        { title: 'Extract leading digits and compute frequencies', desc: 'For each number, extract the first significant non-zero digit. Count how many numbers start with each digit 1-9. Divide each count by total count to get observed frequencies. Compare to Benford\'s expected frequencies using the formula P(d) = log₁₀(1 + 1/d).' },
        { title: 'Calculate deviations and run statistical tests', desc: 'For each digit, calculate the percentage deviation: (observed - expected) / expected × 100%. Deviations above 25% for any digit are flagged as suspicious. Run a chi-squared goodness-of-fit test: p-value > 0.05 means the data conforms to Benford\'s Law. p-value < 0.05 means statistically significant deviation.' },
        { title: 'Investigate flagged deviations — don\'t jump to conclusions', desc: 'Significant deviations are the beginning of an investigation, not the conclusion. Identify which specific digit is anomalous and look for natural explanations: transactions clustered at round numbers ($3,000 reimbursement limit), industry-specific pricing patterns, data truncation. If no natural explanation exists, escalate to a deeper audit.' },
      ]} />

      <SectionHeader number={6} title="Limitations and Caveats" />
      <AlertBox type="warning" title="Benford deviation ≠ proof of fraud">
        Benford's Law is a screening tool, not evidence. Many legitimate reasons cause deviations:
        the dataset may be too small for reliable statistics, have natural constraints, industry-specific
        pricing clusters, or simply not span multiple orders of magnitude. Always investigate further
        before concluding fraud. Courts treat it as supporting circumstantial evidence only.
      </AlertBox>

      <CompareTable
        leftLabel="Good Benford Candidates"
        rightLabel="Poor Benford Candidates — Expect False Positives"
        rows={[
          { label: 'Financial data', left: 'Transaction amounts, invoice totals (wide range)', right: 'Fixed-fee transactions (all $29.99 → all start with 2)' },
          { label: 'Geographic data', left: 'Street addresses, population of cities', right: 'Heights of humans (range 1.5–2.1m — narrow range)' },
          { label: 'Market data', left: 'Stock prices over multi-year periods', right: 'Penny stocks (clustered near $0.01-$0.09)' },
          { label: 'Scientific data', left: 'Physical constants, astronomical measurements', right: 'Lottery numbers (uniform random by design)' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Is Benford\'s Law admissible in court?',
          answer: 'Yes — Benford\'s Law analysis has been admitted as evidence in multiple legal cases in the US (including State v. Pomeroy and several IRS tax fraud cases) and internationally. However, courts consistently treat it as circumstantial evidence requiring corroboration from traditional forensic accounting methods. It\'s used to direct auditors\' attention and support a case, not as standalone proof of fraud.',
        },
        {
          question: 'How many data points do I need for Benford analysis?',
          answer: 'Generally 1,000+ data points for statistically reliable analysis. With fewer than 300-500 data points, random variation can produce apparent deviations that are just noise. Run a chi-squared goodness-of-fit test — it accounts for sample size. With 100 data points, a significant chi-squared result requires very large deviations. With 10,000 points, even small deviations become statistically significant.',
        },
        {
          question: 'Can sophisticated fraudsters fool Benford\'s Law?',
          answer: 'Yes — a fraudster who knows about Benford\'s Law can generate first digits that conform to the expected distribution. However, Benford\'s Law is generalized to second digits and digit-pair combinations (second-digit Benford follows a similar but different distribution). Simultaneously conforming to first-digit, second-digit, and two-digit Benford distributions is very difficult and requires sophisticated tools. Most fraudsters don\'t know about Benford\'s Law, making it highly effective.',
        },
        {
          question: 'Does Benford\'s Law work for COVID or pandemic data?',
          answer: 'Researchers extensively analyzed COVID-19 case counts and death reports against Benford\'s Law in 2020-2021. Countries with transparent public health reporting (Germany, South Korea) showed strong Benford compliance. Several countries with suspected under-reporting showed anomalies in their digit distributions. This became a significant area of research, though interpretation is complicated by the rapidly changing scale of the pandemic affecting which orders of magnitude the numbers span.',
        },
        {
          question: 'What is second-digit Benford\'s Law?',
          answer: 'Benford\'s Law extends to second digits: P(second digit = d) = Σ log₁₀(1 + 1/(10k + d)) for k=1 to 9. The second digit distribution is more uniform than the first (digit 0 appears ~12% vs digit 9 at ~8.5%). Second-digit analysis is used alongside first-digit analysis for stronger fraud screening. Someone who fakes Benford-conforming first digits rarely also fakes conforming second digits.',
        },
        {
          question: 'Can Benford\'s Law detect financial fraud in small businesses?',
          answer: 'Yes — Benford\'s Law is particularly useful for small business expense fraud because the transaction volumes are manageable and the data often spans the required orders of magnitude ($10 coffee to $10,000 equipment). Focus on: vendor payment amounts (watch for specific amounts just below approval thresholds), expense report submissions by individual employees (compare each person\'s digit distribution against company baseline), and purchase card transactions.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
