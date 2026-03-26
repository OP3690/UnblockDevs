'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BenfordsLawExplainedCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Benford's Law Explained — Complete Guide: The Surprising Mathematical Pattern in Real Data</h1>
      <p className="lead">
        Benford's Law states that in many real-world datasets, the leading digit is far more likely to
        be 1 than 9. About 30% of numbers start with 1, while only 4.6% start with 9. This seemingly
        bizarre pattern appears in financial data, population statistics, and even scientific constants —
        and is used to detect fraud.
      </p>

      <StatGrid stats={[
        { value: '30.1%', label: 'of numbers start with digit 1 (Benford)', color: 'blue' },
        { value: '4.6%', label: 'of numbers start with digit 9 (Benford)', color: 'red' },
        { value: 'Fraud Detection', label: 'primary real-world application', color: 'purple' },
        { value: '1938', label: 'year Frank Benford formally described the law', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Benford's Law?" />
      <QuickFact>
        Benford's Law (also called the first-digit law) predicts that in many naturally occurring
        datasets, the probability that a number starts with digit d is log₁₀(1 + 1/d).
        For digit 1: log₁₀(2) ≈ 30.1%. For digit 9: log₁₀(10/9) ≈ 4.6%.
        Real data follows this; fabricated data usually doesn't.
      </QuickFact>

      <CompareTable
        leftLabel="Leading Digit"
        rightLabel="Benford's Predicted Frequency"
        rows={[
          { label: '1', left: '30.1%', right: '████████████████████████████████ Most common' },
          { label: '2', left: '17.6%', right: '██████████████████' },
          { label: '3', left: '12.5%', right: '█████████████' },
          { label: '4', left: '9.7%', right: '██████████' },
          { label: '5', left: '7.9%', right: '████████' },
          { label: '6', left: '6.7%', right: '███████' },
          { label: '7', left: '5.8%', right: '██████' },
          { label: '8', left: '5.1%', right: '█████' },
          { label: '9', left: '4.6%', right: '█████ Least common' },
        ]}
      />

      <SectionHeader number={2} title="Why Does Benford's Law Exist?" />
      <AlertBox type="tip" title="Scale invariance is the key intuition">
        If a dataset spans many orders of magnitude (1 to 1,000,000), numbers must spend proportionally
        more time in ranges starting with 1 (1–2, 10–20, 100–200…) than in ranges starting with 9
        (9–10, 90–100, 900–1000…). Lower leading digits have larger relative ranges on a logarithmic scale.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Logarithmic Scale', description: 'The space between 1 and 2 on a log scale is the same as between 2 and 4, or 4 and 8. Numbers naturally distribute log-uniformly, making "1" the most common first digit.' },
        { title: 'Scale Invariance', description: 'If you convert dollars to euros (multiply by a constant), Benford\'s Law still holds. The law is independent of the units of measurement.' },
        { title: 'Dataset Requirements', description: 'Works best for data spanning multiple orders of magnitude with no artificial cutoffs. Stock prices, population sizes, and financial transactions work well.' },
        { title: 'When It Fails', description: 'Doesn\'t apply to: lottery numbers (uniform random), phone numbers (fixed range), heights (narrow range), or any dataset with built-in constraints on leading digits.' },
      ]} />

      <SectionHeader number={3} title="Fraud Detection with Benford's Law" />
      <CodeBlock language="python" filename="Benford's Law Fraud Detector in Python">
{`import math
from collections import Counter

def benfords_expected(digit):
    """Expected frequency of leading digit d per Benford's Law"""
    return math.log10(1 + 1/digit)

def get_leading_digit(n):
    """Extract the first significant digit"""
    s = str(abs(float(n))).lstrip('0')
    for c in s:
        if c.isdigit() and c != '0':
            return int(c)
    return None

def analyze_benford(numbers):
    digits = [get_leading_digit(n) for n in numbers if get_leading_digit(n)]
    total = len(digits)
    counts = Counter(digits)

    print(f"{'Digit':>5} {'Observed':>10} {'Expected':>10} {'Deviation':>12}")
    print("-" * 45)

    suspicious = []
    for d in range(1, 10):
        observed = counts.get(d, 0) / total
        expected = benfords_expected(d)
        deviation = abs(observed - expected) / expected * 100

        flag = " ⚠️ SUSPICIOUS" if deviation > 25 else ""
        if deviation > 25:
            suspicious.append(d)

        print(f"{d:>5} {observed:>10.1%} {expected:>10.1%} {deviation:>10.1f}%{flag}")

    return suspicious

# Example with fabricated financial data
amounts = [3200, 3150, 3310, 3490, 3220, 3180, 3400, 3250, 3190, 3310]
suspicious = analyze_benford(amounts)
# Output: Digit 3 is suspiciously over-represented (>25% deviation)
# Real finding: humans fabricating numbers tend to start with 3-7`}
      </CodeBlock>

      <SectionHeader number={4} title="Real-World Applications" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Accounting Fraud Detection', description: 'Tax authorities (IRS, HMRC) analyze expense reports and financial statements. Fabricated numbers deviate from Benford\'s distribution. Famous cases: Enron, Bernie Madoff investments showed anomalies.' },
        { title: 'Election Fraud Analysis', description: 'Analyzed in contested elections worldwide. Vote tallies from legitimate elections typically follow Benford\'s Law. Disputed elections (Venezuela 2004, Iran 2009) showed significant deviations.' },
        { title: 'Scientific Data Integrity', description: 'Used to detect fabricated research data. Published studies with anomalous digit distributions have been flagged for data manipulation investigations.' },
        { title: 'Macroeconomic Data', description: 'Economic data reported by governments analyzed for Benford compliance. Deviations in GDP, inflation, or trade figures can indicate manipulated statistics.' },
      ]} />

      <SectionHeader number={5} title="Limitations and Caveats" />
      <AlertBox type="warning" title="Benford deviation ≠ proof of fraud">
        Benford's Law is a screening tool, not evidence. Many legitimate reasons cause deviations:
        the dataset may be too small, have natural constraints, or simply not span multiple orders
        of magnitude. Always investigate before concluding fraud.
      </AlertBox>

      <CompareTable
        leftLabel="Good Benford Candidates"
        rightLabel="Poor Benford Candidates"
        rows={[
          { label: 'Works well', left: 'Financial transactions over wide range', right: 'Phone numbers (fixed 10-digit structure)' },
          { label: 'Works well', left: 'Street addresses across a city', right: 'Heights of humans (narrow range, 1.5-2.0m)' },
          { label: 'Works well', left: 'Stock prices over years', right: 'Lottery numbers (uniform random)' },
          { label: 'Works well', left: 'Population of cities', right: 'Items priced at $X.99 (ends at 9 by design)' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Is Benford\'s Law admissible in court?',
          answer: 'Yes — Benford\'s Law analysis has been admitted as evidence in multiple legal cases in the US and internationally. However, courts treat it as circumstantial evidence requiring corroboration. It\'s used to direct auditors\' attention, not as standalone proof of fraud.',
        },
        {
          question: 'How many data points do I need for Benford analysis?',
          answer: 'Generally 1,000+ data points for reliable analysis. With fewer than 300-500 data points, random variation can cause apparent deviations. Statistical tests (chi-squared test, Kolmogorov-Smirnov) quantify whether deviations are significant beyond random chance.',
        },
        {
          question: 'Can sophisticated fraudsters fool Benford\'s Law?',
          answer: 'Yes — if they know about it. By deliberately generating numbers with a Benford-conforming first digit distribution, fraudsters can avoid detection. However, second-digit analysis (Benford also predicts second digit frequencies) and other digit-pattern tests are harder to game simultaneously.',
        },
        {
          question: 'Does Benford\'s Law work for COVID or pandemic data?',
          answer: 'Researchers analyzed COVID-19 case counts from various countries against Benford\'s Law. Countries with transparent reporting showed good Benford compliance. Several countries with suspected under-reporting showed anomalies. This became a significant area of epidemiological research in 2020-2021.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
