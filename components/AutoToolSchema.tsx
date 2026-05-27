/**
 * AutoToolSchema — Server Component
 *
 * Injects SoftwareApplication + BreadcrumbList JSON-LD for tool pages.
 * Reads the current pathname from the x-pathname request header set by
 * middleware.ts — no 'use client' or usePathname() required, so Googlebot
 * sees the schema in the initial HTML rather than only after JS hydration.
 */
import { headers } from 'next/headers';

type ToolConfig = {
  name: string;
  description: string;
  applicationCategory?: string;
  featureList?: string[];
  operatingSystem?: string;
};

// ── Note on TOOL_CONFIG scope ──────────────────────────────────────────────────
// Only list pages here that do NOT have their own inline JSON-LD schema in
// page.tsx.  Pages with inline WebApplication/SoftwareApplication/BreadcrumbList
// schemas handle their own structured data and must NOT appear here — duplicate
// schemas on the same URL confuse Google's parser and waste crawl budget.
// ──────────────────────────────────────────────────────────────────────────────
const TOOL_CONFIG: Record<string, ToolConfig> = {
  // image-to-text has no inline schema in its page.tsx — AutoToolSchema covers it.
  'image-to-text': {
    name: 'Image to Text — OCR Online',
    description: 'Extract text from images, photos, and scanned documents with advanced OCR. Supports JPEG, PNG, WebP, TIFF. 18 languages, table detection, confidence scoring. 100% browser-based.',
    featureList: ['Image OCR', 'Scanned document support', '18 languages', 'Table detection', 'Confidence scoring', 'Bounding box overlay', 'Batch processing', 'Export TXT & JSON'],
  },
};

export default async function AutoToolSchema() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/';

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${toolUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
      { '@type': 'ListItem', position: 2, name: config.name, item: toolUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
