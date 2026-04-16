import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import TruthTableGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/truth-table-generator';

export const metadata: Metadata = {
  title:
    'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export Online Free | UnblockDevs',
  description:
    'Generate truth tables from any boolean expression. Includes Karnaugh map, minterms, maxterms, SOP/POS canonical forms, and code export in JavaScript, Python, Java, and Go. Up to 8 variables. Free, 100% browser-based.',
  keywords: [
    'truth table generator',
    'truth table generator online',
    'truth table generator free',
    'boolean truth table generator',
    'karnaugh map generator',
    'k-map generator online',
    'boolean expression simplifier',
    'boolean expression solver online',
    'sop pos boolean',
    'minterm maxterm calculator',
    'logic gate truth table',
    'digital logic truth table generator',
    'de morgan truth table',
    'truth table to code generator',
    'boolean expression to javascript',
    'how to generate a truth table',
    'how to simplify boolean expressions',
    'what is a karnaugh map',
    'what is the difference between SOP and POS',
    'boolean algebra calculator',
    'logic calculator online',
    'propositional logic calculator',
    'logical equivalence checker',
    'tautology checker',
    'boolean expression evaluator',
    'boolean function truth table',
    'and or not truth table',
    'xor truth table generator',
    'nand nor truth table',
    'implication truth table',
    'biconditional truth table',
    'de morgan law calculator',
    'boolean simplification online',
    'logic expression solver',
    'truth table calculator 3 variables',
    'truth table calculator 4 variables',
    'truth table 8 variables',
    'digital electronics truth table',
    'computer science boolean logic',
    'discrete math truth table',
    'propositional calculus solver',
    'satisfiability checker',
    'logic gate simulator',
    'combinational logic truth table',
    'sum of products calculator',
    'product of sums calculator',
    'canonical form boolean',
    'boolean expression to python',
    'boolean expression to java',
    'logic truth table solver',
    'boolean truth table calculator',
    'boolean logic calculator online',
    'truth table 2 variables',
    'truth table 3 variables',
    'logic gate truth table generator online',
    'xnor truth table',
    'nand gate truth table',
    'nor gate truth table',
    'and gate truth table',
    'or gate truth table',
    'not gate truth table',
    'digital logic gate simulator',
    'sop canonical form calculator',
    'pos canonical form calculator',
    'boolean simplifier online',
    'boolean function simplifier',
  ],
  openGraph: {
    title:
      'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export Online Free | UnblockDevs',
    description:
      'Generate truth tables from any boolean expression. Karnaugh map, minterms, maxterms, SOP/POS, code export in JS, Python, Java, Go. Up to 8 variables. Free, browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truth Table Generator — Boolean Solver, K-Map, SOP/POS, Code Export Free | UnblockDevs',
    description:
      'Truth tables from any boolean expression. Karnaugh map, minterms, maxterms, SOP/POS. Export code in JavaScript, Python, Java, Go. Up to 8 variables. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export',
  description:
    'Parse any boolean expression and generate the full truth table, Karnaugh map, minterms, maxterms, and SOP/POS canonical forms. Export working code in JavaScript, Python, Java, and Go. Up to 8 variables. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Parse any boolean expression — AND, OR, NOT, XOR, NAND, NOR, implication, biconditional',
    'Full truth table for up to 8 variables (256 rows)',
    'Karnaugh map (K-Map) generation for simplification',
    'Minterms, maxterms, SOP and POS canonical forms',
    'Code export in JavaScript, Python, Java, and Go',
    '100% browser-based — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '580',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I generate a truth table online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Type your boolean expression using the operator buttons at unblockdevs.com/truth-table-generator — AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR — then click Generate. The tool produces the complete truth table plus Karnaugh map, minterms, maxterms, and SOP/POS canonical forms.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between SOP and POS boolean forms?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SOP (Sum of Products) expresses a boolean function as an OR of AND terms — one term for each row where the output is 1 (minterms). POS (Product of Sums) expresses it as an AND of OR terms — one term for each row where output is 0 (maxterms). Both are complete canonical representations of the same function.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a Karnaugh map?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A Karnaugh map (K-Map) is a visual method for simplifying boolean expressions. It arranges truth table rows in a grid where adjacent cells differ by one variable, allowing redundant terms to be identified and eliminated visually. This tool generates K-Maps automatically for up to 8 variables.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What are minterms and maxterms?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A minterm is a product (AND) term for each row where the output equals 1. A maxterm is a sum (OR) term for each row where the output equals 0. Together they form the SOP and POS canonical forms that completely describe any boolean function.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How many variables can this truth table generator handle?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Up to 8 variables, producing truth tables with up to 256 rows. Most classroom problems use 2–4 variables (4–16 rows). The tool handles everything from simple 2-variable expressions to complex 8-variable digital logic circuits.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a truth table in digital logic?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A truth table is a mathematical table that lists all possible input combinations for a boolean expression and their corresponding output values. For n variables, there are 2^n rows. Truth tables are fundamental in digital electronics, computer architecture, and discrete mathematics for describing and verifying the behavior of logic gates and circuits.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I check if two boolean expressions are logically equivalent?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Generate truth tables for both expressions and compare their output columns row by row. If the output values are identical for every input combination, the expressions are logically equivalent. You can also check if their XOR (A ⊕ B) produces a constant 0 — a tautology checker approach used in formal verification.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use a truth table to simplify a boolean expression?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Generate the truth table to identify all minterms (rows where output is 1). Use the Karnaugh map view to visually group adjacent minterms into rectangles of size 1, 2, 4, or 8. Each rectangle eliminates one or more variables, producing a simplified Sum of Products (SOP) expression with fewer terms.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a tautology in propositional logic?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A tautology is a boolean expression that is always true regardless of the input values — its truth table output column contains only 1s. A contradiction (or unsatisfiable formula) is always false — its output column contains only 0s. An expression that is neither is called a contingency. Generate the truth table and examine the output column to classify your expression.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is De Morgan\'s law?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'De Morgan\'s laws state that NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). They are used to push negations inward through AND and OR gates, transform between SOP and POS forms, and simplify NAND/NOR circuit implementations. You can verify De Morgan\'s laws by generating truth tables for both sides and confirming they are identical.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I export the truth table as code?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. After generating the truth table, click the Code Export button and choose your target language — JavaScript, Python, Java, or Go. The tool outputs a working boolean function or if-statement that implements the exact logic of your expression, ready to paste directly into your project.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I enter a boolean expression with AND, OR, and NOT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use the operator buttons provided: ∧ for AND, ∨ for OR, ¬ for NOT, ⊕ for XOR, ↑ for NAND, and ↓ for NOR. Variable names are single letters (A, B, C, etc.). You can also type & for AND, | for OR, and ! for NOT. Parentheses are supported for grouping: (A ∨ B) ∧ ¬C.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Truth Table Online',
  description: 'Step-by-step guide to generating a truth table from a boolean expression in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your expression', text: 'Type a boolean expression using AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR, implication (→), and biconditional (↔) operators with single-letter variable names.' },
    { '@type': 'HowToStep', position: 2, name: 'Click Generate', text: 'The tool parses your expression, identifies variables, and generates all 2^n input combinations and their output values.' },
    { '@type': 'HowToStep', position: 3, name: 'Explore the output', text: 'View the truth table, Karnaugh map, minterms (rows where output is 1), maxterms (rows where output is 0), and SOP/POS canonical forms.' },
    { '@type': 'HowToStep', position: 4, name: 'Export code', text: 'Copy the boolean function as a working if-statement in JavaScript, Python, Java, or Go — ready to paste into your project.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Truth Table Generator', item: canonicalUrl },
  ],
};

export default function TruthTableGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TruthTableGeneratorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a Truth Table Generator?">
          <SEOProse>
            A <strong>truth table generator</strong> takes a boolean expression with named variables and produces a table showing the output value for every possible combination of inputs. For <C>n</C> variables there are <C>2^n</C> rows — 2 rows for 1 variable, 4 for 2, 8 for 3, up to 256 rows for 8. Truth tables are the foundation of digital logic design, computer architecture, and formal logic analysis.
          </SEOProse>
          <SEOProse>
            This tool goes beyond a basic table: it also produces a Karnaugh map for visual simplification, extracts minterms and maxterms, outputs Sum of Products (SOP) and Product of Sums (POS) canonical forms, and exports working boolean functions in JavaScript, Python, Java, and Go.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Generate a Truth Table in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Enter your expression', desc: 'Type a boolean expression using the operator buttons: AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR, implication (→), biconditional (↔). Use any single-letter variable names.' },
            { n: '02', title: 'Click Generate', desc: 'The tool parses your expression, identifies variables, and generates all 2^n input combinations and their output values.' },
            { n: '03', title: 'Explore the output', desc: 'View the truth table, Karnaugh map, minterms (rows where output is 1), maxterms (rows where output is 0), and SOP/POS canonical forms.' },
            { n: '04', title: 'Export code', desc: 'Copy the boolean function as a working if-statement in JavaScript, Python, Java, or Go — ready to paste into your project.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="Who Uses a Truth Table Generator?">
          <UseCases cases={[
            { icon: '🎓', title: 'Computer Science Students', desc: 'Verify homework answers for digital logic, discrete math, and boolean algebra assignments.' },
            { icon: '💡', title: 'Digital Logic Design', desc: 'Design and verify combinational circuits before implementing in hardware or HDL.' },
            { icon: '🔍', title: 'Expression Simplification', desc: 'Use the Karnaugh map output to find the minimal SOP form for a complex boolean function.' },
            { icon: '🐛', title: 'Debug Conditional Logic', desc: 'Test all branches of a complex boolean condition to ensure your if-else chain handles every case.' },
            { icon: '📝', title: 'Formal Logic Analysis', desc: 'Evaluate propositional logic tautologies, contradictions, and logical equivalences.' },
            { icon: '⚡', title: 'Code Generation', desc: 'Get working boolean functions in your target language rather than manually translating SOP expressions.' },
          ]} />
        </SEOSection>

        <SEOSection id="operators" heading="Supported Operators & Syntax">
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Operator</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Symbol</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {[
                  ['AND', '∧ or &', 'True when both operands are true'],
                  ['OR', '∨ or |', 'True when at least one operand is true'],
                  ['NOT', '¬ or !', 'Negation — true when operand is false'],
                  ['XOR', '⊕ or ^', 'Exclusive OR — true when exactly one is true'],
                  ['NAND', '↑', 'NOT AND — false only when both are true'],
                  ['NOR', '↓', 'NOT OR — true only when both are false'],
                  ['Implication', '→', 'A → B: false only when A is true and B is false'],
                  ['Biconditional', '↔', 'True when both have the same value (XNOR)'],
                ].map(([op, sym, meaning]) => (
                  <tr key={String(op)}>
                    <td className="px-4 py-3 font-semibold text-zinc-900">{op}</td>
                    <td className="px-4 py-3 font-mono text-zinc-700">{sym}</td>
                    <td className="px-4 py-3 text-zinc-600">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I generate a truth table online?',
              a: 'Type your boolean expression using the operator buttons — AND (∧), OR (∨), NOT (¬), XOR (⊕) — then click Generate. The tool produces the complete truth table plus Karnaugh map, minterms, maxterms, and SOP/POS canonical forms.',
            },
            {
              q: 'What is the difference between SOP and POS boolean forms?',
              a: 'SOP (Sum of Products) is an OR of AND terms — one term per row where output is 1 (minterms). POS (Product of Sums) is an AND of OR terms — one term per row where output is 0 (maxterms). Both are complete canonical forms of the same function.',
            },
            {
              q: 'What is a Karnaugh map?',
              a: 'A K-Map is a visual method for simplifying boolean expressions. It arranges truth table rows in a grid where adjacent cells differ by one variable — allowing you to visually identify redundant terms that can be eliminated.',
            },
            {
              q: 'What are minterms and maxterms?',
              a: 'A minterm is an AND term for each row where output equals 1. A maxterm is an OR term for each row where output equals 0. Together they form the SOP and POS canonical forms.',
            },
            {
              q: 'How many variables can this tool handle?',
              a: 'Up to 8 variables, producing tables with up to 256 rows. Most classroom problems use 2–4 variables (4–16 rows).',
            },
            {
              q: 'What is a truth table in digital logic?',
              a: 'A truth table lists all possible input combinations for a boolean expression and their output values. For n variables there are 2^n rows. Truth tables describe logic gate and circuit behavior in digital electronics and discrete mathematics.',
            },
            {
              q: 'How do I check if two boolean expressions are equivalent?',
              a: 'Generate truth tables for both expressions and compare their output columns. If outputs match for every input row, the expressions are logically equivalent. The XOR of two equivalent expressions produces constant 0.',
            },
            {
              q: 'How do I simplify a boolean expression using a truth table?',
              a: 'Generate the truth table to find all minterms (output = 1 rows). Use the Karnaugh map to group adjacent minterms into rectangles of 1, 2, 4, or 8. Each rectangle eliminates variables, producing a minimal SOP expression.',
            },
            {
              q: 'What is a tautology in propositional logic?',
              a: 'A tautology is a boolean expression always true regardless of inputs — its truth table output column contains only 1s. A contradiction is always false (all 0s). A contingency is sometimes true, sometimes false.',
            },
            {
              q: "What is De Morgan's law?",
              a: "De Morgan's laws: NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). They transform between SOP and POS forms and simplify NAND/NOR circuits. Verify by generating truth tables for both sides.",
            },
            {
              q: 'Can I export the truth table as code?',
              a: 'Yes. Click Code Export and choose JavaScript, Python, Java, or Go. The tool outputs a working boolean function implementing your exact expression — ready to paste into your project.',
            },
            {
              q: 'How do I enter a boolean expression with AND, OR, and NOT?',
              a: <>Use the operator buttons: ∧ for AND, ∨ for OR, ¬ for NOT, ⊕ for XOR, ↑ for NAND, ↓ for NOR. Or type <C>&</C>, <C>|</C>, and <C>!</C>. Parentheses are supported: <C>(A ∨ B) ∧ ¬C</C>.</>,
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/regex-tester', label: 'Regex Tester', desc: 'Test boolean-like pattern matching conditions in real time', icon: '🔍' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON schemas that encode conditional logic', icon: '✅' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate checksums for comparing boolean expression outputs', icon: '#️⃣' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for test case identifiers in logic test suites', icon: '🔑' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Logic in JSON Validation' },
            { href: '/blog/json-best-practices-production-guide', label: 'Boolean Logic Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Conditional API Logic Guide' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging Complex Conditions' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="truth_table_generator" />
    </>
  );
}
