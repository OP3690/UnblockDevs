import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import DataInsightsClient from './client';

const canonicalUrl = 'https://unblockdevs.com/data-insights';

export const metadata: Metadata = {
  title: 'Data Insights – JSON & CSV Data Analyzer, Statistics Online | UnblockDevs',
  description: 'Explore datasets instantly. Compute statistics, detect patterns, and profile JSON or CSV data online. Free data insights tool — no signup required.',
  keywords: [
    'data insights tool',
    'json data analyzer',
    'csv analyzer',
    'data statistics online',
    'explore dataset online',
    'data insights',
    'json statistics',
    'analyze json data',
    'data profiling tool',
    'dataset explorer',
    'data visualization online',
    'json analytics',
  ],
  openGraph: {
    title: 'Data Insights | UnblockDevs',
    description: 'Compute statistics and explore patterns in JSON or CSV data instantly. Free, client-side data profiling tool.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Insights | UnblockDevs',
    description: 'Explore JSON and CSV datasets instantly. Statistics, pattern detection, and type inference — 100% client-side.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Data Insights',
  url: canonicalUrl,
  description: 'Analyze JSON and CSV datasets online. Computes count, null rate, unique values, min/max, mean, median, distribution, type inference, and pattern detection. All processing is 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Analyze JSON and CSV datasets',
    'Field-level statistics: count, null count, unique count, min/max, mean, median',
    'Automatic type inference per field',
    'Value distribution histograms',
    'Pattern detection (emails, URLs, dates, etc.)',
    'Privacy-first — data never leaves your browser',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '510',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What formats does Data Insights support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Data Insights supports JSON (arrays of objects) and CSV files. Paste data directly into the editor or upload a file. The tool auto-detects the format and parses it into a tabular structure for analysis.',
      },
    },
    {
      '@type': 'Question',
      name: 'What statistics does the tool compute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For each field the tool computes: total record count, null and missing value count, unique value count, minimum and maximum values, mean, median, value distribution, inferred data type, and detected patterns such as emails, URLs, UUIDs, and dates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens entirely in your browser using JavaScript. Your dataset never leaves your device, making it safe to use with production data, PII, or confidential records.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Data Insights different from a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter only pretty-prints JSON. Data Insights treats the JSON as a dataset and computes statistical summaries per field — counts, distributions, type inference, and pattern detection — giving you actionable insights rather than just indented text.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Analyze Data and Get Statistical Insights Online',
  description: 'Step-by-step guide to analyzing JSON or CSV datasets and extracting statistics in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste or upload your data', text: 'Paste a JSON array of objects or a CSV string directly into the editor, or upload a .json or .csv file from your machine.' },
    { '@type': 'HowToStep', position: 2, name: 'Auto-detect schema', text: 'The tool parses the dataset and infers a schema — column names, inferred data types, and structural shape — without any configuration.' },
    { '@type': 'HowToStep', position: 3, name: 'View statistics and distributions', text: 'See per-field summaries: count, null count, unique values, min, max, mean, median, and a frequency distribution for categorical fields.' },
    { '@type': 'HowToStep', position: 4, name: 'Export insights', text: 'Copy the statistical summary or export it as JSON to use in reports, documentation, or further processing pipelines.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Data Insights', item: canonicalUrl },
  ],
};

export default function DataInsightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DataInsightsClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is Data Insights?">
          <SEOProse>
            <strong>Data Insights</strong> is a browser-based data exploration tool that takes a
            JSON array or CSV file and instantly computes statistics and profiles for every field.
            Instead of writing one-off scripts or loading data into a full analytics platform, you
            paste your dataset and immediately see field types, value ranges, null rates,
            distributions, and detected patterns — all without leaving your browser.
          </SEOProse>
          <SEOProse>
            The tool is designed for the moments between receiving data and knowing what to do with
            it. Whether you are debugging an API response, validating test fixtures, checking data
            quality before a migration, or just trying to understand a dataset a colleague sent
            you, Data Insights surfaces the key facts about your data in seconds. All processing is
            entirely client-side, so sensitive records never leave your device.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Explore Data in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or upload your data', desc: 'Paste a JSON array of objects or a CSV string directly into the editor, or upload a .json or .csv file from your machine.' },
            { n: '02', title: 'Auto-detect schema', desc: 'The tool parses the dataset and infers a schema — column names, inferred data types, and structural shape — without any configuration.' },
            { n: '03', title: 'View statistics and distributions', desc: 'See per-field summaries: count, null count, unique values, min, max, mean, median, and a frequency distribution for categorical fields.' },
            { n: '04', title: 'Export insights', desc: 'Copy the statistical summary or export it as JSON to use in reports, documentation, or further processing pipelines.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Data Insights">
          <UseCases cases={[
            { icon: '🔍', title: 'API Response Analysis', desc: 'Profile an API response to understand which fields are consistently populated, which are nullable, and what value ranges to expect.' },
            { icon: '🗂️', title: 'Dataset Exploration', desc: 'Get an instant overview of an unfamiliar dataset — field names, types, and value distributions — before writing any processing code.' },
            { icon: '✅', title: 'QA Data Validation', desc: 'Verify that test fixtures or generated data match the expected schema, type constraints, and value ranges before running a test suite.' },
            { icon: '🧹', title: 'Data Quality Checks', desc: 'Identify columns with high null rates, unexpected data types, or anomalous values that indicate data quality issues in a pipeline.' },
            { icon: '📊', title: 'Quick Statistics', desc: 'Compute mean, median, min, and max for numeric fields without writing a script or opening a spreadsheet application.' },
            { icon: '📝', title: 'Data Documentation', desc: 'Generate field-level summaries to document a dataset — type, cardinality, example values — for internal wikis or API specs.' },
          ]} />
        </SEOSection>

        {/* Statistics table */}
        <SEOSection id="stats" heading="Computed Statistics & Metrics">
          <SEOProse>
            For every field in the dataset, Data Insights computes the following metrics:
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Count</td>
                  <td className="px-4 py-3 text-zinc-600">Total number of records in the dataset</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Null count</td>
                  <td className="px-4 py-3 text-zinc-600">Number (and percentage) of records where the field is null, undefined, or missing</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Unique count</td>
                  <td className="px-4 py-3 text-zinc-600">Number of distinct values — useful for assessing cardinality</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Min / Max</td>
                  <td className="px-4 py-3 text-zinc-600">Smallest and largest values for numeric and date fields</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Mean / Median</td>
                  <td className="px-4 py-3 text-zinc-600">Average and middle values for numeric fields</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Distribution</td>
                  <td className="px-4 py-3 text-zinc-600">Frequency breakdown of the most common values for categorical and low-cardinality fields</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Type inference</td>
                  <td className="px-4 py-3 text-zinc-600">Inferred data type per field: string, number, boolean, date, null, or mixed</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-800">Pattern detection</td>
                  <td className="px-4 py-3 text-zinc-600">Identifies common value patterns: email addresses, URLs, UUIDs, ISO dates, phone numbers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What formats does Data Insights support?',
              a: 'Data Insights supports JSON arrays of objects and CSV files. Paste data directly or upload a .json or .csv file. The tool auto-detects the format and parses it into a tabular view for analysis.',
            },
            {
              q: 'What statistics does the tool compute?',
              a: 'For each field: count, null count, unique count, min/max, mean, median, value distribution, type inference, and pattern detection (emails, URLs, UUIDs, dates, and more).',
            },
            {
              q: 'Is my data sent to a server?',
              a: 'No. All processing happens entirely in your browser. Your dataset — including any PII or sensitive records — never leaves your device.',
            },
            {
              q: 'How is Data Insights different from a JSON formatter?',
              a: 'A JSON formatter only pretty-prints JSON. Data Insights treats JSON as a dataset and computes statistical summaries per field, giving you actionable insights rather than just indented text.',
            },
            {
              q: 'Can I analyze CSV files, not just JSON?',
              a: 'Yes. Upload a CSV file or paste CSV text and the tool will parse it, infer column types, and compute the same statistics as it does for JSON datasets.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and syntax-highlight raw JSON before pasting it into Data Insights', icon: '✨' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON datasets to spot structural changes between versions', icon: '🔀' },
            { href: '/test-data-generator', label: 'Test Data Generator', desc: 'Generate realistic JSON or CSV test datasets to explore and validate', icon: '🏭' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Derive a JSON Schema from a sample dataset for validation and documentation', icon: '📐' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="data_insights" />
    </>
  );
}
