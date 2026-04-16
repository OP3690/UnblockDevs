import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
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
    'json to excel converter',
    'convert json to excel free',
    'json to xlsx online',
    'json to csv converter',
    'json data to excel table',
    'json to excel no signup',
    'json to xls converter',
    'json excel download',
    'json to google sheets',
    'import json excel',
    'flatten json to excel',
    'json to excel python',
    'pandas json to excel',
    'json to excel javascript',
    'xlsx json converter',
    'json to excel nodejs',
    'json export excel',
    'json flat table',
    'json to tabular data',
    'convert api response to excel',
    'json report to excel',
    'json logs to excel',
    'json analytics excel',
    'json pivot table',
    'json to excel vba',
    'power query json excel',
    'excel import json',
    'excel get json data',
    'excel power automate json',
    'json to excel formula',
    'json array flatten excel',
    'json nested flatten',
    'json to row column excel',
    'json multi level excel',
    'json excel template',
    'export data excel browser',
    'client side excel generation',
    'sheetjs json',
    'excel js json',
    'json to excel bulk',
    'large json to excel',
    'json to excel free tool',
    'json to excel online tool',
    'json to word converter',
    'convert json table excel',
    'json to spreadsheet online',
    'json table export',
    'json to xlsx download',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1900',
    bestRating: '5',
  },
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
    {
      '@type': 'Question' as const,
      name: 'How do I convert nested JSON to Excel?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'This tool automatically flattens nested JSON objects into column headers using dot or underscore notation. For example, {"address": {"city": "Paris"}} becomes the column address_city. Select your preferred separator before exporting to XLSX or CSV.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the maximum file size I can convert?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Since all processing happens in your browser, the practical limit depends on your device memory. Most modern devices handle JSON files up to several megabytes without issue. For very large files (hundreds of MB) consider splitting them or using a server-side tool like pandas in Python.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert JSON to CSV instead of Excel?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Select CSV as the export format before downloading. CSV is plain text with values separated by commas, compatible with Google Sheets, LibreOffice Calc, and any spreadsheet application. TSV (tab-separated) is also available if your data contains commas.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I import JSON into Excel using Power Query?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'In Excel, go to Data > Get Data > From File > From JSON. Select your .json file and use the Power Query editor to expand nested records and lists into columns. Alternatively, use this tool to pre-flatten the JSON and download a ready-to-open XLSX file in seconds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert JSON to Excel in Python?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use pandas: import pandas as pd; df = pd.read_json("data.json"); df.to_excel("output.xlsx", index=False). For nested JSON, use pd.json_normalize(data) to flatten nested objects into columns before calling to_excel().',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use SheetJS to export JSON to Excel?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Install SheetJS (xlsx): npm install xlsx. Then: const ws = XLSX.utils.json_to_sheet(data); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); XLSX.writeFile(wb, "output.xlsx");. SheetJS supports multiple sheets, cell formatting, and both Node.js and browser environments.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I export multiple JSON arrays to separate Excel sheets?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use multi-sheet mode in this tool — when your JSON root object contains multiple arrays (e.g. {"users": [...], "orders": [...]}), each array is placed on its own worksheet tab. In SheetJS you can do this by appending multiple sheets: XLSX.utils.book_append_sheet(wb, ws1, "Users"); XLSX.utils.book_append_sheet(wb, ws2, "Orders");',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert JSON to Google Sheets?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Convert your JSON to CSV using this tool, then import the CSV into Google Sheets via File > Import. Alternatively, use the Google Sheets IMPORTDATA() or IMPORTJSON() functions for live API data. For complex JSON, download the XLSX from this tool and open it in Google Drive.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert JSON to Excel Online',
  description: 'Step-by-step guide to converting a JSON array to an Excel spreadsheet or CSV file.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON array', text: 'Paste a JSON array of objects into the input. Each object becomes a row in the spreadsheet; keys become column headers.' },
    { '@type': 'HowToStep', position: 2, name: 'Preview the table', text: 'The tool instantly renders a table preview so you can verify the structure before downloading.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose Excel or CSV format', text: 'Select .xlsx for Excel or .csv for use in Google Sheets, LibreOffice, or any spreadsheet application.' },
    { '@type': 'HowToStep', position: 4, name: 'Download the file', text: 'Click Download. Your spreadsheet is generated entirely in the browser — nothing is uploaded to any server.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON to Excel Converter', item: canonicalUrl },
  ],
};

export default function JsonToExcelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            {
              q: 'How do I convert nested JSON to Excel?',
              a: <>This tool automatically flattens nested JSON objects into column headers using dot or underscore notation. For example, <C>{`{"address": {"city": "Paris"}}`}</C> becomes the column <C>address_city</C>. Select your preferred separator before exporting.</>,
            },
            {
              q: 'What is the maximum file size I can convert?',
              a: 'Since all processing happens in your browser, the practical limit depends on your device memory. Most devices handle JSON files up to several megabytes without issue. For very large files consider splitting them or using pandas in Python.',
            },
            {
              q: 'How do I convert JSON to CSV instead of Excel?',
              a: 'Select CSV as the export format before downloading. CSV is plain text compatible with Google Sheets, LibreOffice Calc, and any spreadsheet application. TSV is also available if your data contains commas.',
            },
            {
              q: 'How do I import JSON into Excel using Power Query?',
              a: 'In Excel, go to Data > Get Data > From File > From JSON. Select your .json file and use the Power Query editor to expand nested records into columns. Or use this tool to pre-flatten the JSON and download a ready-to-open XLSX in seconds.',
            },
            {
              q: 'How do I convert JSON to Excel in Python?',
              a: <>Use pandas: <C>df = pd.read_json("data.json"); df.to_excel("output.xlsx", index=False)</C>. For nested JSON, use <C>pd.json_normalize(data)</C> to flatten nested objects into columns before calling <C>to_excel()</C>.</>,
            },
            {
              q: 'How do I use SheetJS to export JSON to Excel?',
              a: <>Install SheetJS (xlsx) with npm. Then: <C>const ws = XLSX.utils.json_to_sheet(data); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); XLSX.writeFile(wb, "output.xlsx");</C> — works in both Node.js and browser environments.</>,
            },
            {
              q: 'How do I convert JSON to Google Sheets?',
              a: 'Convert your JSON to CSV using this tool, then import the CSV into Google Sheets via File > Import. Alternatively, use IMPORTDATA() or IMPORTJSON() functions for live API data. For complex JSON, download the XLSX and open it in Google Drive.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/json-to-excel-converter-best-practices', label: 'JSON to Excel Best Practices' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/api-payload-size-optimization', label: 'API Payload Optimization' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_to_excel" />
    </>
  );
}
