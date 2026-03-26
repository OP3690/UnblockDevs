import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import JsonToExcelClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-to-excel';

export const metadata: Metadata = {
  title:
    'JSON to Excel Converter — Convert JSON to XLSX, CSV, Multi-Sheet Export, Flatten Nested JSON Online Free | UnblockDevs',
  description:
    'Convert JSON to Excel or CSV online. Paste, upload, or fetch from API URL. Flatten nested JSON, export to multiple sheets, apply filters. Free, 100% browser-based, no data sent to servers.',
  keywords: [
    'json to excel',
    'json to excel converter online',
    'convert json to excel online',
    'json to csv online',
    'json to xlsx',
    'json to spreadsheet',
    'convert json to csv',
    'flatten nested json to csv',
    'json to excel multiple sheets',
    'fetch api response to excel',
    'export json to excel',
    'how to open json in excel',
    'nested json to excel',
    'json to excel free',
    'json array to excel',
    'api data to excel',
    'convert json to xlsx free',
    'json to csv converter free',
  ],
  openGraph: {
    title:
      'JSON to Excel Converter — Convert JSON to XLSX, CSV, Multi-Sheet, Flatten Nested JSON Online Free | UnblockDevs',
    description:
      'Convert JSON to Excel or CSV. Paste, upload, or fetch from API. Flatten nested JSON, multi-sheet export, filters. Free, 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON to Excel Converter — XLSX, CSV, Multi-Sheet, Flatten Nested JSON Free | UnblockDevs',
    description:
      'Paste, upload, or fetch from API. Flatten nested JSON, export to multiple sheets. Free, browser-based, no data sent to servers.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON to Excel Converter — Convert JSON to XLSX, CSV, Multi-Sheet, Flatten Nested JSON',
  description:
    'Convert JSON to Excel or CSV online. Paste, upload, or fetch from API URL. Flatten nested JSON, export to multiple sheets, apply filters. Schema detection. Free, 100% browser-based, no data sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Paste, upload, or fetch JSON from API URL',
    'Flatten nested JSON with dot or underscore separator',
    'Multi-sheet export — multiple arrays to separate worksheet tabs',
    'Schema detection and column filters',
    'XLSX, CSV, and TSV export',
    '100% client-side — no data sent to servers',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I convert JSON to Excel online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JSON, upload a file, or enter an API URL at unblockdevs.com/json-to-excel. The tool detects the schema, flattens nested objects, and exports a downloadable XLSX or CSV file entirely in your browser with nothing sent to servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I open a JSON file in Excel?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "Excel doesn't natively handle JSON cleanly. The easiest method is to paste your JSON into JSON to Excel at unblockdevs.com/json-to-excel, click Parse, then download the XLSX file and open it directly in Excel or Google Sheets.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How does nested JSON flattening work?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Nested JSON keys are combined into column headers using a separator character. For example {"user":{"name":"Alice"}} becomes a column called user_name with underscore separator or user.name with dot separator. You choose the separator before exporting.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is multi-sheet JSON to Excel export?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'When your JSON contains multiple arrays such as users and orders, multi-sheet export places each array on a separate worksheet tab in the same XLSX file. This preserves the logical structure of your data in one organized workbook.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I fetch live API data and convert it to Excel?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Enter any public API URL in the Fetch from URL input at unblockdevs.com/json-to-excel. The tool fetches the JSON response and converts it to Excel instantly — no need to copy-paste API output manually.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my data safe when using this converter?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. All conversion runs in your browser using JavaScript — no JSON data is sent to any server, logged, or stored. Safe for sensitive API responses, financial data, and confidential business records.',
      },
    },
  ],
};

export default function JsonToExcelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonToExcelClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Convert JSON to Excel or CSV Instantly">
          <SEOProse>
            A <strong>JSON to Excel converter</strong> takes a JSON array of objects and turns it into a structured spreadsheet with column headers automatically derived from the JSON keys. This is the fastest way to share API response data with non-technical stakeholders, import data into reporting tools, or export records for analysis in Excel or Google Sheets.
          </SEOProse>
          <SEOProse>
            This converter supports three input methods: paste JSON text, upload a .json file, or fetch live data from a public API URL. Nested objects are flattened into column headers (e.g. <C>{`{"user": {"name": "Alice"}}`}</C> becomes a column called <C>user_name</C> or <C>user.name</C>), and multiple arrays in the same JSON object can be exported to separate worksheet tabs.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Export JSON to Excel in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Provide your JSON', desc: 'Paste a JSON array, upload a .json file, or enter a public API URL to fetch live data.' },
            { n: '02', title: 'Configure export', desc: 'Choose flatten separator (dot or underscore), select which keys to include, and set multi-sheet grouping for multiple arrays.' },
            { n: '03', title: 'Preview the table', desc: 'See the spreadsheet layout before downloading. Each JSON key becomes a column header, each object becomes a row.' },
            { n: '04', title: 'Download XLSX or CSV', desc: 'Export as Excel (.xlsx), CSV, or TSV. Open directly in Excel, Google Sheets, or any BI tool.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Export JSON to Excel">
          <UseCases cases={[
            { icon: '📊', title: 'Share API Data with Teams', desc: 'Convert API response JSON to a spreadsheet your PM, sales, or finance team can open without writing code.' },
            { icon: '📥', title: 'Import to Reporting Tools', desc: 'Feed JSON data into Excel pivot tables, Google Data Studio, or Tableau by exporting to CSV first.' },
            { icon: '🔍', title: 'Inspect Large Arrays', desc: 'View thousands of JSON records in a sortable, filterable spreadsheet rather than scrolling raw JSON.' },
            { icon: '🗄️', title: 'Database Export to Excel', desc: 'Convert database query results (returned as JSON) into Excel for offline analysis or reporting.' },
            { icon: '🔌', title: 'Live API Data Export', desc: 'Fetch live data from any public API URL and export it to Excel in one step — no code required.' },
            { icon: '📋', title: 'Nested Data Flattening', desc: 'Automatically flatten deeply nested JSON into a tabular format suitable for Excel or CSV imports.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert JSON to Excel online?',
              a: 'Paste your JSON array, upload a file, or enter an API URL. The tool detects the schema, flattens nested objects, and exports a downloadable XLSX or CSV file entirely in your browser.',
            },
            {
              q: 'How do I open a JSON file in Excel?',
              a: "Excel doesn't handle JSON natively. The easiest method: paste your JSON here, click Parse, then download the XLSX file and open it directly in Excel or Google Sheets.",
            },
            {
              q: 'How does nested JSON flattening work?',
              a: <>Nested keys are combined into column headers using a separator. For example, <C>{`{"user":{"name":"Alice"}}`}</C> becomes a column called <C>user_name</C> (underscore) or <C>user.name</C> (dot). Choose the separator before exporting.</>,
            },
            {
              q: 'What is multi-sheet export?',
              a: 'When your JSON contains multiple arrays (e.g. users and orders), multi-sheet export places each array on a separate worksheet tab in the same XLSX file.',
            },
            {
              q: 'Is my data safe?',
              a: 'Yes. All conversion runs in your browser — no JSON data is sent to any server. Safe for API responses, financial records, and confidential business data.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate JSON before converting to Excel', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate your JSON syntax to prevent conversion errors', icon: '✅' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Compare two JSON datasets before exporting to Excel', icon: '🔀' },
            { href: '/test-data-generator', label: 'Test Data Generator', desc: 'Generate sample JSON datasets to test your Excel export workflow', icon: '🧪' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_to_excel" />
    </>
  );
}
