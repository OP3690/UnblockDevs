'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

type ToolConfig = {
  name: string;
  description: string;
  applicationCategory?: string;
  featureList?: string[];
  operatingSystem?: string;
};

// Per-tool metadata for rich SoftwareApplication schema
// Google can show these in rich results and search features
const TOOL_CONFIG: Record<string, ToolConfig> = {
  'json-beautifier': {
    name: 'JSON Beautifier & Formatter',
    description: 'Format and beautify JSON online — pretty-print with custom indentation, validate syntax, and explore nested structure. 100% browser-based.',
    featureList: ['JSON formatting', 'Syntax validation', 'Tree view', 'Indentation control', 'JSON minification'],
  },
  'json-fixer-online': {
    name: 'JSON Fixer Online',
    description: 'Fix malformed JSON automatically — repair trailing commas, single quotes, unquoted keys, and common JSON errors with one click.',
    featureList: ['Auto-repair JSON', 'Trailing comma fix', 'Single quote fix', 'Unquoted key fix', 'JSON validation'],
  },
  'json-formatter': {
    name: 'JSON Formatter',
    description: 'Format and validate JSON online instantly. Supports pretty-printing, minification, and syntax error highlighting.',
    featureList: ['JSON formatting', 'Minification', 'Error highlighting', 'Copy formatted JSON'],
  },
  'json-validator': {
    name: 'JSON Validator',
    description: 'Validate JSON syntax online. Instantly detect and highlight syntax errors in JSON data with detailed error messages.',
    featureList: ['JSON syntax validation', 'Error location highlighting', 'Schema validation', 'Real-time feedback'],
  },
  'json-comparator': {
    name: 'JSON Comparator',
    description: 'Compare two JSON objects side-by-side. Highlight differences, additions, and removals between JSON structures.',
    featureList: ['JSON diff', 'Side-by-side comparison', 'Change highlighting', 'Nested diff support'],
  },
  'json-stringify-online': {
    name: 'JSON Stringify Online',
    description: 'Stringify JavaScript objects to JSON strings online. Handles special values, circular references, and nested objects.',
    featureList: ['JSON stringify', 'Special value handling', 'Pretty-print output', 'Copy result'],
  },
  'json-to-excel': {
    name: 'JSON to Excel Converter',
    description: 'Convert JSON data to Excel (.xlsx) and CSV online. Supports nested objects, arrays, and custom column mapping.',
    featureList: ['JSON to Excel conversion', 'JSON to CSV', 'Nested object flattening', 'Custom column mapping'],
  },
  'json-schema-generation': {
    name: 'JSON Schema Generator',
    description: 'Generate JSON Schema from any JSON sample. Automatically infer types, required fields, and structure.',
    featureList: ['Schema generation', 'Type inference', 'Required field detection', 'Schema validation'],
  },
  'curl-converter': {
    name: 'cURL Converter',
    description: 'Convert cURL commands to Python, JavaScript, Go, PHP, Ruby, and more. Paste any curl command and get working code instantly.',
    featureList: ['cURL to Python', 'cURL to JavaScript fetch', 'cURL to Axios', 'cURL to Go', 'cURL to PHP'],
  },
  'curl-to-python': {
    name: 'cURL to Python Requests Converter',
    description: 'Convert cURL commands to Python requests code. Handles headers, auth, body, cookies, and all curl flags.',
    featureList: ['cURL to Python requests', 'Header conversion', 'Auth conversion', 'POST body handling'],
  },
  'jwt-decoder': {
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens (JWT) online. View header, payload, signature, and expiry without a secret key.',
    featureList: ['JWT decode', 'Header inspection', 'Payload inspection', 'Expiry check', 'Signature display'],
  },
  'cors-tester': {
    name: 'CORS Tester',
    description: 'Test CORS headers and preflight requests online. Check Access-Control-Allow-Origin and debug CORS errors.',
    featureList: ['CORS header testing', 'Preflight request testing', 'Header inspection', 'CORS error diagnosis'],
  },
  'har-to-curl': {
    name: 'HAR to cURL Converter',
    description: 'Convert HAR (HTTP Archive) files to cURL commands. Extract individual requests and replay them from the command line.',
    featureList: ['HAR to cURL', 'Request extraction', 'Header preservation', 'Cookie handling'],
  },
  'sql-formatter': {
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries online. Supports MySQL, PostgreSQL, SQL Server, and standard SQL with indentation control.',
    featureList: ['SQL formatting', 'Multiple dialects', 'Keyword casing', 'Indentation control'],
  },
  'regex-tester': {
    name: 'Regex Tester',
    description: 'Test regular expressions online with real-time match highlighting. Supports flags, capture groups, and named groups.',
    featureList: ['Regex testing', 'Match highlighting', 'Group capture', 'Flag support', 'Replace preview'],
  },
  'base64-encoder': {
    name: 'Base64 Encoder & Decoder',
    description: 'Encode and decode Base64 strings online. Supports text, URLs, and file encoding with URL-safe mode.',
    featureList: ['Base64 encoding', 'Base64 decoding', 'URL-safe mode', 'File encoding'],
  },
  'url-encoder': {
    name: 'URL Encoder & Decoder',
    description: 'Encode and decode URL components and query strings online. Supports percent-encoding and full URL encoding.',
    featureList: ['URL encoding', 'URL decoding', 'Query string encoding', 'Percent-encoding'],
  },
  'hash-generator': {
    name: 'Hash Generator',
    description: 'Generate cryptographic hashes online. Supports MD5, SHA-1, SHA-256, SHA-512 and more algorithms.',
    featureList: ['MD5 hash', 'SHA-256 hash', 'SHA-512 hash', 'SHA-1 hash', 'HMAC generation'],
  },
  'password-generator': {
    name: 'Password Generator',
    description: 'Generate secure random passwords online. Custom length, character sets, and strength indicators.',
    featureList: ['Random password generation', 'Custom length', 'Character set control', 'Strength indicator'],
  },
  'cron-expression': {
    name: 'Cron Expression Builder',
    description: 'Build, parse, and explain cron expressions online. Visual cron schedule builder with next-run preview.',
    featureList: ['Cron expression builder', 'Human-readable explanation', 'Next run times', 'Cron validation'],
  },
  'markdown-preview': {
    name: 'Markdown Preview & Editor',
    description: 'Live Markdown preview and editor online. GitHub Flavored Markdown with table support, code blocks, and export.',
    featureList: ['Live Markdown preview', 'GitHub Flavored Markdown', 'Table support', 'Code block highlighting'],
  },
  'log-unpacker': {
    name: 'Log Unpacker',
    description: 'Unpack and decode stringified JSON logs. Fix escaped JSON, decode nested payloads, and format log output.',
    featureList: ['Stringified JSON unpacking', 'Log formatting', 'Nested JSON decoding', 'Escape fix'],
  },
  'http-headers-analyzer': {
    name: 'HTTP Security Headers Analyzer',
    description: 'Analyze and grade HTTP security headers for any URL. Check Content-Security-Policy, HSTS, X-Frame-Options, and more.',
    featureList: ['Security header analysis', 'Grade scoring', 'CSP analysis', 'HSTS check', 'Missing header detection'],
  },
  'image-to-text': {
    name: 'Image to Text — OCR Online',
    description: 'Extract text from images, photos, and scanned documents with advanced OCR. Supports JPEG, PNG, WebP, TIFF. 18 languages, table detection, confidence scoring. 100% browser-based.',
    featureList: ['Image OCR', 'Scanned document support', '18 languages', 'Table detection', 'Confidence scoring', 'Bounding box overlay', 'Batch processing', 'Export TXT & JSON'],
  },
};

export default function AutoToolSchema() {
  const pathname = usePathname();

  const schemas = useMemo(() => {
    if (!pathname || pathname.startsWith('/blog')) return null;

    const toolSlug = pathname.replace(/^\//, '').split('/')[0];
    if (!toolSlug || toolSlug === '') return null;

    const config = TOOL_CONFIG[toolSlug];
    if (!config) return null;

    const toolUrl = `https://unblockdevs.com/${toolSlug}`;

    const softwareSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${toolUrl}#tool`,
      name: config.name,
      description: config.description,
      applicationCategory: config.applicationCategory ?? 'DeveloperApplication',
      operatingSystem: config.operatingSystem ?? 'Any (Web Browser)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      url: toolUrl,
      featureList: config.featureList ?? [],
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      provider: {
        '@type': 'Organization',
        '@id': 'https://unblockdevs.com/#organization',
        name: 'UnblockDevs',
        url: 'https://unblockdevs.com',
      },
      publisher: {
        '@id': 'https://unblockdevs.com/#organization',
      },
    };

    // BreadcrumbList for tool pages: Home > [Tool Name]
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${toolUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://unblockdevs.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: config.name,
          item: toolUrl,
        },
      ],
    };

    return [softwareSchema, breadcrumbSchema];
  }, [pathname]);

  if (!schemas) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
