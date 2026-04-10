import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts, ProTip,
} from '@/components/tools/ToolSEOContent';
import CronExpressionClient from './client';

export const metadata: Metadata = {
  title: 'Cron Expression Builder & Explainer — Cron Job Generator | UnblockDevs',
  description: 'Build and explain cron expressions instantly. See next run times, get human-readable descriptions, and generate crontab syntax for any schedule. Free, browser-based.',
  keywords: [
    'cron expression',
    'cron job generator',
    'cron expression builder',
    'cron syntax',
    'crontab generator',
    'cron expression explainer',
    'cron scheduler',
    'cron expression checker',
  ],
  openGraph: {
    title: 'Cron Expression Builder & Explainer | UnblockDevs',
    description: 'Build and explain cron expressions instantly. See next run times, get human-readable descriptions, and generate crontab syntax for any schedule.',
    type: 'website',
    url: 'https://unblockdevs.com/cron-expression',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cron Expression Builder & Explainer | UnblockDevs',
    description: 'Build and explain cron expressions instantly. See next run times, get human-readable descriptions, and generate crontab syntax for any schedule.',
  },
  alternates: { canonical: 'https://unblockdevs.com/cron-expression' },
};

const canonicalUrl = 'https://unblockdevs.com/cron-expression';

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cron Expression Builder & Explainer',
  url: canonicalUrl,
  description: 'Build and explain cron expressions instantly. See next run times, get human-readable descriptions, and generate crontab syntax for any schedule.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Human-readable explanation of any cron expression',
    'Next 10 scheduled run times in local time',
    'Interactive visual cron builder with dropdowns',
    'Common presets: @hourly, @daily, @weekly, @monthly, @yearly',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1120',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a cron expression?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A cron expression is a string of five fields (minute, hour, day-of-month, month, day-of-week) that defines a schedule for recurring tasks. For example, "0 9 * * 1-5" means "at 9:00 AM every weekday". Cron expressions are used in Unix-like systems, cloud schedulers, CI/CD pipelines, and many server-side frameworks.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What does the asterisk (*) mean in a cron expression?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'An asterisk (*) in a cron field means "every possible value". For example, * in the minute field means every minute, and * in the month field means every month. You can combine it with a step using */N to mean "every N units" — for example, */5 in the minute field means every 5 minutes.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I run a cron job every 5 minutes?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use the expression "*/5 * * * *". The */5 in the minute field means "every 5 minutes". The remaining asterisks mean every hour, every day, every month, and every day of the week. This results in the job running at :00, :05, :10, :15, etc. of every hour.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between @daily and "0 0 * * *"?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '@daily is a shorthand alias equivalent to "0 0 * * *", which runs once per day at midnight (00:00). Many cron implementations support these named shortcuts: @hourly (0 * * * *), @daily (0 0 * * *), @weekly (0 0 * * 0), @monthly (0 0 1 * *), and @yearly (0 0 1 1 *).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build and Explain a Cron Expression',
  description: 'Step-by-step guide to creating and understanding cron expressions using the visual builder.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter or pick a cron expression', text: 'Type any 5-part cron expression in the input field, or select a preset like @daily or @weekly to start.' },
    { '@type': 'HowToStep', position: 2, name: 'Read the human-readable explanation', text: 'The tool instantly converts your cron expression into plain English, such as "Every weekday at 9:00 AM".' },
    { '@type': 'HowToStep', position: 3, name: 'Check the next 10 run times', text: 'See the next 10 scheduled occurrences in your local timezone to verify the schedule is correct.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy to clipboard', text: 'Click Copy to copy the cron expression to your clipboard and paste it into your crontab, CI config, or scheduler.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Cron Expression Builder & Explainer', item: canonicalUrl },
  ],
};

export default function CronExpressionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CronExpressionClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Cron Expression Builder — Build & Explain Cron Schedules Instantly">
          <SEOProse>
            A <strong>cron expression</strong> is a compact string of five fields — minute, hour, day-of-month, month, and day-of-week — that defines exactly when a recurring task should run. This tool converts any cron expression into plain English (e.g., <C>0 9 * * 1-5</C> becomes "At 9:00 AM, Monday through Friday"), shows the next 10 scheduled run times in your local timezone, and provides an interactive visual builder so you can construct schedules without memorizing syntax.
          </SEOProse>
          <ProTip>Press <strong>⌘+Enter</strong> (Mac) or <strong>Ctrl+Enter</strong> (Windows) to parse your cron expression instantly without clicking the button.</ProTip>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Build Cron Expressions in Four Steps">
          <HowItWorks steps={[
            { n: '01', title: 'Enter an expression', desc: 'Type any 5-field cron expression or pick a preset like @daily, @weekly, or a weekday-morning example.' },
            { n: '02', title: 'Read the explanation', desc: 'Get an instant human-readable description: "Every 5 minutes", "At midnight on the 1st of every month", etc.' },
            { n: '03', title: 'Verify next run times', desc: 'Check the next 10 scheduled occurrences in local time to confirm the schedule is exactly what you expect.' },
            { n: '04', title: 'Copy and deploy', desc: 'Click Copy to grab the cron expression and paste it into your crontab file, CI/CD config, or cloud scheduler.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Cron Expressions">
          <UseCases cases={[
            { icon: '🔁', title: 'Automated Backups', desc: 'Schedule database or file backups nightly, weekly, or on a custom cadence using a cron job.' },
            { icon: '📊', title: 'Batch Report Generation', desc: 'Generate and email reports every morning at 8 AM on weekdays using expressions like 0 8 * * 1-5.' },
            { icon: '🧹', title: 'Data Cleanup Jobs', desc: 'Run cleanup scripts every Sunday at midnight to purge old logs, temp files, or expired sessions.' },
            { icon: '🔔', title: 'Notification Triggers', desc: 'Send scheduled push notifications, digest emails, or Slack summaries at precise times.' },
            { icon: '⚙️', title: 'CI/CD Pipelines', desc: 'Trigger nightly builds, integration test runs, or dependency audits using cron schedules in GitHub Actions.' },
            { icon: '📈', title: 'Monitoring & Health Checks', desc: 'Ping external services every minute or every 5 minutes to verify uptime and catch outages early.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a cron expression?',
              a: 'A cron expression is a 5-field schedule string (minute, hour, day-of-month, month, day-of-week) used to trigger recurring tasks. For example, "0 9 * * 1-5" runs a job at 9 AM every weekday.',
            },
            {
              q: 'What does */5 mean in cron?',
              a: '*/5 means "every 5 units". In the minute field, */5 runs at :00, :05, :10, :15, and so on. You can use the step syntax in any field — for example, */2 in the hour field means every 2 hours.',
            },
            {
              q: 'How do I run a job on the last day of the month?',
              a: 'Standard cron does not support "last day of month" directly. A common workaround is to use a script that checks whether tomorrow is the 1st of the next month, or to use an extended cron implementation that supports the L modifier.',
            },
            {
              q: 'Are @daily and 0 0 * * * the same?',
              a: 'Yes. @daily is a shorthand alias for "0 0 * * *", which runs once at midnight every day. Other aliases include @hourly (0 * * * *), @weekly (0 0 * * 0), @monthly (0 0 1 * *), and @yearly (0 0 1 1 *).',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/timezone-translator', label: 'Timezone Translator', desc: 'Convert times between UTC, EST, PST, IST and 500+ IANA timezones', icon: '🕐' },
            { href: '/truth-table-generator', label: 'Truth Table Generator', desc: 'Build boolean logic truth tables with natural-language expressions', icon: '⊕' },
            { href: '/speed-test', label: 'Speed Test', desc: 'Test your internet download and upload speed instantly', icon: '⚡' },
            { href: '/test-data-generator', label: 'Test Data Generator', desc: 'Generate realistic fake data for testing and prototyping', icon: '🎲' },
            { href: '/mock-api-generator', label: 'Mock API Generator', desc: 'Create instant mock REST APIs with custom JSON responses', icon: '🔌' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/cron-expression-cheat-sheet', label: 'Cron Expression Cheat Sheet' },
            { href: '/blog/cron-job-best-practices', label: 'Cron Job Best Practices' },
            { href: '/blog/scheduling-tasks-in-nodejs', label: 'Scheduling Tasks in Node.js' },
            { href: '/blog/github-actions-cron-schedule', label: 'GitHub Actions Cron Schedules' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="cron_expression" />
    </>
  );
}
