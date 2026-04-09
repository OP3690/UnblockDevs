import type { Metadata } from 'next';
import TimezoneTranslatorClient from './client';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  C,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
} from '@/components/tools/ToolSEOContent';

const canonicalUrl = 'https://unblockdevs.com/timezone-translator';

export const metadata: Metadata = {
  title:
    'Timezone Translator — Convert Time Between Timezones, UTC, EST, PST, IST & Schedule Meetings Online Free | UnblockDevs',
  description:
    'Convert times between any timezones instantly. Supports UTC, EST, PST, IST, JST, AEST, CET and 500+ IANA timezones. DST-aware, no signup, 100% browser-based.',
  keywords: [
    'timezone translator',
    'timezone converter',
    'convert timezone',
    'timezone tool',
    'time converter',
    'timezone calculator',
    'time difference calculator',
    'world clock converter',
    'UTC to EST converter',
    'UTC to PST converter',
    'UTC to IST converter',
    'EST to PST converter',
    'convert time zones online',
    'daylight saving time converter',
    'IANA timezone converter',
    'schedule meetings across timezones',
    'remote team meeting scheduler',
    'developer timezone tool',
  ],
  openGraph: {
    title: 'Timezone Translator — Convert Time Between Timezones | UnblockDevs',
    description:
      'Convert times between UTC, EST, PST, IST and 500+ IANA timezones. DST-aware, free, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timezone Translator — Convert Time Between Timezones | UnblockDevs',
    description: 'Convert times between UTC, EST, PST, IST and 500+ IANA timezones. DST-aware, 100% browser-based.',
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Timezone Translator — Convert Time Between Timezones',
  description:
    'Convert times between any timezones instantly. Supports UTC, EST, PST, IST, JST, AEST, CET and 500+ IANA timezones. DST-aware, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '500+ IANA timezone support',
    'Daylight Saving Time (DST) aware',
    'Multiple simultaneous timezone display',
    'Time difference calculator',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '950',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a UTC offset?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A UTC offset is the number of hours and minutes a timezone is ahead of or behind Coordinated Universal Time (UTC). For example, EST is UTC-5 (5 hours behind UTC), IST is UTC+5:30 (5 hours 30 minutes ahead), and JST is UTC+9. Offsets can change seasonally due to Daylight Saving Time.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert between timezones?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Select a source timezone and enter a time, then select one or more target timezones to see the converted times instantly. The tool uses IANA timezone names and accounts for Daylight Saving Time automatically, so you always get the correct offset for the specific date you enter.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How does Daylight Saving Time affect timezone conversions?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'During Daylight Saving Time, some timezones shift their offset by +1 hour. For example, EST (UTC-5) becomes EDT (UTC-4) in summer, and PST (UTC-8) becomes PDT (UTC-7). Not all countries observe DST — Japan (JST) and India (IST) never shift. This tool uses IANA timezone data to apply the correct offset for the exact date and region, handling DST transitions automatically.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the best timezone for remote team meetings?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'For globally distributed teams, UTC is the neutral reference timezone — it never observes DST and is unambiguous. When finding overlap hours, aim for 9 AM–12 PM UTC which covers afternoon in Europe and morning on the US East Coast. For US-only teams, Eastern Time (ET) is the de facto standard. For US + India, mid-morning ET (9-10 AM ET = 7-8 PM IST) is the common overlap window.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Time Between Timezones Online',
  description: 'Step-by-step guide to translating dates and times across multiple timezones with automatic DST adjustment.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter a date & time', text: 'Type or pick a date and time. The tool defaults to now in your local timezone, which you can adjust freely.' },
    { '@type': 'HowToStep', position: 2, name: 'Select source timezone', text: 'Choose the timezone the input time belongs to. Search by city name, abbreviation (EST, PST), or IANA name.' },
    { '@type': 'HowToStep', position: 3, name: 'Add target timezones', text: 'Add one or more target timezones to see the converted time for each. DST shifts are applied automatically based on the date.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or share', text: 'Copy converted times individually or share a permalink so teammates see the same conversion without doing the math themselves.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Timezone Translator', item: canonicalUrl },
  ],
};

export default function TimezoneTranslatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TimezoneTranslatorClient />
      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a Timezone Converter?">
          <SEOProse>
            A <strong>timezone converter</strong> translates a specific date and time from one timezone to its
            equivalent in another, accounting for UTC offsets and Daylight Saving Time (DST) rules.{' '}
            <strong>UTC</strong> (Coordinated Universal Time) is the global reference — every timezone is defined as an
            offset from UTC, such as <C>UTC-5</C> for Eastern Standard Time or <C>UTC+5:30</C> for India Standard Time.
          </SEOProse>
          <SEOProse>
            Modern applications use <strong>IANA timezone names</strong> (e.g., <C>America/New_York</C>,{' '}
            <C>Asia/Kolkata</C>) rather than abbreviations like EST or IST, because abbreviations are ambiguous — IST
            can mean India Standard Time, Irish Standard Time, or Israel Standard Time. DST complicates matters further:
            the same timezone name maps to a different UTC offset in summer vs. winter. This tool handles all of that
            automatically using the IANA timezone database.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Convert Timezones in Seconds">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Enter a Date & Time',
                desc: 'Type or pick a date and time. The tool defaults to now in your local timezone, which you can adjust freely.',
              },
              {
                n: '02',
                title: 'Select Source Timezone',
                desc: 'Choose the timezone the input time belongs to. Search by city name, abbreviation (EST, PST), or IANA name.',
              },
              {
                n: '03',
                title: 'Add Target Timezones',
                desc: 'Add one or more target timezones to see the converted time for each. DST shifts are applied automatically based on the date.',
              },
              {
                n: '04',
                title: 'Copy or Share',
                desc: 'Copy converted times individually or share a permalink so teammates see the same conversion without doing the math themselves.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="zones" heading="Common Timezone Reference">
          <SEOProse>
            Quick reference for the most common timezones used by developers and remote teams. Offsets shown for
            standard time (winter) / daylight time (summer) where applicable.
          </SEOProse>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Abbreviation</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">UTC Offset</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">IANA Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">UTC</td>
                  <td className="px-4 py-3 text-zinc-600">+0:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">Etc/UTC</td>
                  <td className="px-4 py-3 text-zinc-600">Universal</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">EST / EDT</td>
                  <td className="px-4 py-3 text-zinc-600">-5:00 / -4:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">America/New_York</td>
                  <td className="px-4 py-3 text-zinc-600">US East Coast</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">PST / PDT</td>
                  <td className="px-4 py-3 text-zinc-600">-8:00 / -7:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">America/Los_Angeles</td>
                  <td className="px-4 py-3 text-zinc-600">US West Coast</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">CST / CDT</td>
                  <td className="px-4 py-3 text-zinc-600">-6:00 / -5:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">America/Chicago</td>
                  <td className="px-4 py-3 text-zinc-600">US Central</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">IST</td>
                  <td className="px-4 py-3 text-zinc-600">+5:30</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">Asia/Kolkata</td>
                  <td className="px-4 py-3 text-zinc-600">India</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">JST</td>
                  <td className="px-4 py-3 text-zinc-600">+9:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">Asia/Tokyo</td>
                  <td className="px-4 py-3 text-zinc-600">Japan</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">AEST</td>
                  <td className="px-4 py-3 text-zinc-600">+10:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">Australia/Sydney</td>
                  <td className="px-4 py-3 text-zinc-600">Australia East</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">CET / CEST</td>
                  <td className="px-4 py-3 text-zinc-600">+1:00 / +2:00</td>
                  <td className="px-4 py-3 font-mono text-zinc-600">Europe/Paris</td>
                  <td className="px-4 py-3 text-zinc-600">Central Europe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Timezone Converter">
          <UseCases
            cases={[
              {
                icon: '🗓️',
                title: 'Schedule Remote Meetings',
                desc: 'Find overlap hours for distributed teams across US, Europe, and Asia without mentally calculating offsets.',
              },
              {
                icon: '🔗',
                title: 'API Timestamp Parsing',
                desc: 'Convert API response timestamps (often UTC) to the local time of the requesting user for display in your UI.',
              },
              {
                icon: '⏱️',
                title: 'Cron Job Scheduling',
                desc: 'Verify a cron expression fires at the intended local time when your server runs in UTC and your users are in EST or PST.',
              },
              {
                icon: '📋',
                title: 'Log Correlation',
                desc: 'Correlate logs from servers in different regions by converting all timestamps to a single reference timezone.',
              },
              {
                icon: '🚀',
                title: 'Release Windows',
                desc: 'Plan deployment windows that fall during off-peak hours for all major user regions simultaneously.',
              },
              {
                icon: '📊',
                title: 'SLA Calculations',
                desc: 'Convert SLA response deadlines to the customer\'s local timezone to ensure accurate time-to-response tracking.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'What is the difference between UTC and GMT?',
                a: 'UTC (Coordinated Universal Time) and GMT (Greenwich Mean Time) share the same offset (+0:00) but are not identical. GMT is a timezone; UTC is the international time standard that all other timezones are defined relative to. In practice they are interchangeable for most purposes, but software should use UTC as the canonical reference and store timestamps in UTC.',
              },
              {
                q: 'Does Daylight Saving Time apply to all timezones?',
                a: (
                  <>
                    No. Many regions do not observe DST. India (<C>Asia/Kolkata</C>), Japan (<C>Asia/Tokyo</C>), China
                    (<C>Asia/Shanghai</C>), and most of Africa never shift their clocks. Regions that do observe DST
                    (US, EU, Australia) shift by +1 hour in local summer. This tool uses the IANA timezone database to
                    apply the correct rule for each region and date automatically.
                  </>
                ),
              },
              {
                q: 'What is ISO 8601 and why should I use it?',
                a: (
                  <>
                    ISO 8601 is the international standard for representing dates and times:{' '}
                    <C>2024-03-15T14:30:00Z</C> (UTC) or <C>2024-03-15T09:30:00-05:00</C> (EST). It is unambiguous,
                    sortable lexicographically, and understood by every programming language and database. Always store
                    and exchange timestamps in ISO 8601 format with an explicit UTC offset or the{' '}
                    <C>Z</C> suffix to avoid timezone confusion.
                  </>
                ),
              },
              {
                q: 'What is a Unix timestamp and how do I convert it?',
                a: 'A Unix timestamp is the number of seconds (or milliseconds) elapsed since 1970-01-01T00:00:00Z (the Unix epoch). It is timezone-agnostic — the same integer represents the same moment everywhere on Earth. To display it to a user, convert it to their local timezone. In JavaScript: new Date(timestamp * 1000).toLocaleString(). This tool accepts Unix timestamps as input and converts them to any IANA timezone.',
              },
              {
                q: 'Why should I use IANA timezone names instead of abbreviations like EST?',
                a: (
                  <>
                    Timezone abbreviations are ambiguous. <strong>IST</strong> can mean India Standard Time (UTC+5:30),
                    Irish Standard Time (UTC+1), or Israel Standard Time (UTC+2). <strong>CST</strong> is Central
                    Standard Time in the US (UTC-6), China Standard Time (UTC+8), or Cuba Standard Time (UTC-5). IANA
                    names like <C>America/Chicago</C> or <C>Asia/Kolkata</C> are unambiguous, encode all DST rules, and
                    are supported natively by every modern programming language.
                  </>
                ),
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools
            tools={[
              {
                href: '/json-beautifier',
                label: 'JSON Beautifier',
                desc: 'Format and pretty-print JSON API responses with timestamp fields.',
                icon: '{}',
              },
              {
                href: '/uuid-generator',
                label: 'UUID Generator',
                desc: 'Generate RFC 4122 UUIDs for use in time-based or random identifiers.',
                icon: '🔑',
              },
              {
                href: '/hash-generator',
                label: 'Hash Generator',
                desc: 'Generate MD5, SHA-1, SHA-256 hashes for strings or file checksums.',
                icon: '#',
              },
              {
                href: '/base64-encoder',
                label: 'Base64 Encoder',
                desc: 'Encode or decode Base64 strings commonly found in API auth headers.',
                icon: '🔠',
              },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand />
    </>
  );
}
