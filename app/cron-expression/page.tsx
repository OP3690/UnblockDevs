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
    'cron expression generator',
    'cron schedule generator',
    'cron parser online',
    'cron job builder free',
    'cron syntax generator',
    'crontab editor online',
    'cron expression tester',
    'cron expression validator',
    'understand cron expression',
    'cron every minute',
    'cron every hour',
    'cron every day',
    'cron every week',
    'cron every month',
    'cron at midnight',
    'cron at noon',
    'cron expression examples',
    'cron 5 fields',
    'cron 6 fields',
    'cron 7 fields',
    'cron second field',
    'cron special strings',
    '@daily cron',
    '@weekly cron',
    '@monthly cron',
    '@reboot cron',
    'cron asterisk meaning',
    'cron slash meaning',
    'cron comma meaning',
    'cron hyphen meaning',
    'cron question mark meaning',
    'cron L flag',
    'cron W flag',
    'linux crontab',
    'unix cron',
    'aws eventbridge cron',
    'aws lambda cron',
    'github actions cron',
    'kubernetes cronjob',
    'docker cron',
    'heroku scheduler cron',
    'vercel cron',
    'netlify cron',
    'node-cron',
    'node-schedule',
    'cron python',
    'APScheduler python',
    'celery beat cron',
    'spring scheduler cron',
    'quartz cron java',
    'cron timezone',
    'cron utc',
    'cron dst',
    'cron debug',
    'cron next run time',
    'cron job help',
    'cron expression free tool',
    'schedule task cron',
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
    {
      '@type': 'Question' as const,
      name: 'How do I read a cron expression?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A standard cron expression has five space-separated fields: minute (0-59), hour (0-23), day-of-month (1-31), month (1-12), and day-of-week (0-7, where both 0 and 7 represent Sunday). Read them left to right: "0 8 * * 1" means minute 0, hour 8, any day-of-month, any month, on Monday — i.e., "every Monday at 8:00 AM".',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What do the 5 fields in a cron expression mean?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The five fields are: (1) Minute: 0–59, when in the hour the job runs. (2) Hour: 0–23, the hour of the day. (3) Day-of-month: 1–31, which day of the month. (4) Month: 1–12 (or JAN–DEC), which months. (5) Day-of-week: 0–7 (0 and 7 both = Sunday, or SUN–SAT). Each field can use *, ranges (1-5), lists (1,3,5), or steps (*/5).',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I run a cron job at midnight?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use the expression "0 0 * * *". This sets the minute to 0 and the hour to 0 (midnight), with wildcards for all other fields so it runs every day. You can also use the shorthand @daily or @midnight, which are aliases for the same expression in most cron implementations.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I run a cron job on weekdays only?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use 1-5 in the day-of-week field to specify Monday through Friday. For example, "0 9 * * 1-5" runs at 9:00 AM every weekday. The day-of-week field uses 0 or 7 for Sunday, 1 for Monday, and 6 for Saturday. You can also use three-letter names: MON-FRI.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between cron on Linux and AWS EventBridge?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Standard Linux cron has 5 fields (minute, hour, day-of-month, month, day-of-week). AWS EventBridge cron expressions have 6 fields, adding a Seconds field at the start and supporting a Year field at the end. EventBridge also requires that either day-of-month or day-of-week must be a question mark (?) and does not support both being wildcards simultaneously.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I debug a cron job that is not running?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Start by verifying the expression is correct using this tool — check the next run times to confirm the schedule. Then check that the cron daemon is running (systemctl status cron), review the system cron log (/var/log/syslog or /var/log/cron), ensure the script is executable (chmod +x), and verify it uses absolute paths because cron runs with a minimal PATH environment.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I set the timezone for a cron job?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'By default, cron uses the system timezone (usually UTC on servers). To use a specific timezone in a Linux crontab, add CRON_TZ=America/New_York at the top of the crontab file. In GitHub Actions, use the schedule trigger with the cron field — GitHub Actions cron runs in UTC. In Kubernetes CronJobs, set spec.timeZone to an IANA timezone name.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is @daily, @weekly, @monthly in cron?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'These are named schedule shortcuts supported by most cron implementations: @hourly runs at the start of every hour (0 * * * *), @daily runs at midnight every day (0 0 * * *), @weekly runs at midnight on Sunday (0 0 * * 0), @monthly runs at midnight on the 1st of each month (0 0 1 * *), and @yearly runs at midnight on January 1st (0 0 1 1 *). @reboot runs once at system startup.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I run a cron job in Kubernetes?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use a Kubernetes CronJob resource. In the YAML spec, set spec.schedule to a standard 5-field cron expression (e.g., "0 2 * * *" for 2 AM daily). Kubernetes CronJobs create Job resources on schedule, which in turn create Pods. Set spec.timeZone to an IANA timezone name (supported since Kubernetes 1.25) to control which timezone the schedule is evaluated in.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I add cron jobs in GitHub Actions?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'In your GitHub Actions workflow YAML, use the schedule event trigger with a cron field: on: { schedule: [{ cron: "0 2 * * *" }] }. GitHub Actions cron schedules always run in UTC. Note that GitHub may delay scheduled workflows by up to a few minutes during periods of high load. The minimum interval is every 5 minutes (*/5 * * * *).',
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
              a: 'A cron expression is a 5-field schedule string (minute, hour, day-of-month, month, day-of-week) used to trigger recurring tasks. For example, "0 9 * * 1-5" runs a job at 9 AM every weekday. Cron is used in Linux/Unix crontab, Kubernetes CronJobs, GitHub Actions, and many cloud schedulers.',
            },
            {
              q: 'What does */5 mean in cron?',
              a: '*/5 means "every 5 units". In the minute field, */5 runs at :00, :05, :10, :15, and so on. You can use the step syntax in any field — for example, */2 in the hour field means every 2 hours.',
            },
            {
              q: 'How do I run a job on the last day of the month?',
              a: 'Standard cron does not support "last day of month" directly. A common workaround is to use a script that checks whether tomorrow is the 1st of the next month, or to use an extended cron implementation (like Quartz or AWS EventBridge) that supports the L modifier.',
            },
            {
              q: 'Are @daily and 0 0 * * * the same?',
              a: 'Yes. @daily is a shorthand alias for "0 0 * * *", which runs once at midnight every day. Other aliases include @hourly (0 * * * *), @weekly (0 0 * * 0), @monthly (0 0 1 * *), and @yearly (0 0 1 1 *).',
            },
            {
              q: 'How do I read a cron expression?',
              a: 'Read the five fields left to right: minute (0-59), hour (0-23), day-of-month (1-31), month (1-12), day-of-week (0-7, where 0 and 7 are Sunday). For example, "0 8 * * 1" means minute 0, hour 8, any day, any month, Monday — i.e., "every Monday at 8:00 AM".',
            },
            {
              q: 'What do the 5 fields in a cron expression mean?',
              a: 'The five fields are: (1) Minute: 0–59. (2) Hour: 0–23. (3) Day-of-month: 1–31. (4) Month: 1–12. (5) Day-of-week: 0–7 (0 and 7 both equal Sunday). Each field accepts *, ranges (1-5), lists (1,3,5), or steps (*/5).',
            },
            {
              q: 'How do I run a cron job every 5 minutes?',
              a: 'Use "*/5 * * * *". The */5 in the minute field means "every 5 minutes". The asterisks in the remaining fields mean every hour, every day, every month, and every day of the week — resulting in runs at :00, :05, :10, :15, etc.',
            },
            {
              q: 'How do I run a cron job at midnight?',
              a: 'Use "0 0 * * *" — minute 0, hour 0, every day. You can also use the shorthand @daily or @midnight. To run at noon instead, use "0 12 * * *".',
            },
            {
              q: 'How do I run a cron job on weekdays only?',
              a: 'Put 1-5 in the day-of-week field. For example, "0 9 * * 1-5" runs at 9:00 AM Monday through Friday. Day-of-week uses 1=Monday through 6=Saturday. You can also use three-letter names: MON-FRI.',
            },
            {
              q: 'What is the difference between cron on Linux and AWS EventBridge?',
              a: 'Linux cron uses 5 fields. AWS EventBridge cron uses 6 fields (with an added Year field at the end) and requires that either day-of-month or day-of-week is set to ? (not both can be *). EventBridge also supports the L (last) and W (nearest weekday) modifiers.',
            },
            {
              q: 'How do I debug a cron job that is not running?',
              a: 'Verify the expression with this tool by checking the next run times. Then confirm the cron daemon is running (systemctl status cron), check logs in /var/log/syslog or /var/log/cron, ensure the script is executable, and use absolute paths in commands because cron runs with a minimal PATH.',
            },
            {
              q: 'How do I set the timezone for a cron job?',
              a: 'On Linux, add CRON_TZ=America/New_York at the top of the crontab file. GitHub Actions cron always runs in UTC. In Kubernetes CronJobs, set spec.timeZone to an IANA timezone name (supported since Kubernetes 1.25).',
            },
            {
              q: 'What is @daily, @weekly, @monthly in cron?',
              a: '@hourly = (0 * * * *), @daily = (0 0 * * *), @weekly = (0 0 * * 0), @monthly = (0 0 1 * *), @yearly = (0 0 1 1 *). @reboot runs once at system startup. These shortcuts are supported by most cron implementations but not all cloud schedulers.',
            },
            {
              q: 'How do I run a cron job in Kubernetes?',
              a: 'Use a Kubernetes CronJob resource with spec.schedule set to a 5-field cron expression. Set spec.timeZone to an IANA timezone name (supported since Kubernetes 1.25) to control the schedule timezone. Kubernetes CronJobs create Job resources on schedule, which create Pods to run your task.',
            },
            {
              q: 'How do I add cron jobs in GitHub Actions?',
              a: 'Use the schedule event trigger: on: { schedule: [{ cron: "0 2 * * *" }] }. GitHub Actions cron always runs in UTC. The minimum interval supported is every 5 minutes (*/5 * * * *). During periods of high load, GitHub may delay scheduled runs by a few minutes.',
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
            { href: '/blog/batch-processing-vs-stream-processing-key-differences-explained', label: 'Batch vs Stream Processing: Key Differences' },
            { href: '/blog/what-is-a-data-pipeline-explained-for-beginners', label: 'What Is a Data Pipeline? Explained for Beginners' },
            { href: '/blog/how-to-use-curl-command-api-testing', label: 'How to Use cURL for API Testing' },
            { href: '/blog/how-to-post-json-data-using-curl-complete-guide', label: 'How to POST JSON Data Using cURL' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="cron_expression" />
    </>
  );
}
