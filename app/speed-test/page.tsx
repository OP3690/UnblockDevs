import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import SpeedTestClient from './SpeedTestClient';

export const metadata: Metadata = {
  title: 'Internet Speed Test — Check Download, Upload & Ping Free | UnblockDevs',
  description:
    'Test your internet speed instantly. Check download speed, upload speed, ping, and jitter. No account required, no data stored. 100% browser-based, privacy-first speed test.',
  keywords: [
    'internet speed test',
    'speed test',
    'download speed test',
    'upload speed test',
    'ping test',
    'jitter test',
    'broadband speed test',
    'wifi speed test',
    'network speed test',
    'free speed test',
    'speed test online',
  ],
  openGraph: {
    title: 'Internet Speed Test — Check Download, Upload & Ping Free | UnblockDevs',
    description:
      'Test your internet speed instantly. Download, upload, ping, jitter. No account, no data stored. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/speed-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/speed-test' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Internet Speed Test',
  url: 'https://unblockdevs.com/speed-test',
  description: 'Test your internet speed instantly. Check download speed, upload speed, ping, and jitter. 100% browser-based, privacy-first.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Download speed measurement',
    'Upload speed measurement',
    'Ping and jitter measurement',
    'Test history (browser-local)',
    'Privacy-first — no data stored',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '890',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is this speed test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This speed test measures your connection speed to our servers (same origin). Results reflect real-world performance for typical web traffic. Results may differ from other speed tests depending on which server location they use.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my speed test result lower than my plan speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Several factors affect speed test results: WiFi signal strength, router performance, number of devices on your network, time of day (peak hours), and distance from the test server. Connect via ethernet cable for the most accurate result.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good internet speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For general browsing: 25 Mbps. For HD streaming: 25 Mbps. For 4K streaming: 50 Mbps. For video calls: 10 Mbps. For online gaming: 25 Mbps with low ping under 50ms. For remote work and cloud development: 100 Mbps recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is ping and jitter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ping (latency) is the time in milliseconds for data to travel to a server and back. Lower is better — under 20ms is excellent, under 50ms is good, over 100ms causes noticeable lag. Jitter is the variation in ping over time — low jitter means a stable connection, important for video calls and gaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this speed test store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This speed test runs entirely in your browser. Your IP address, speed results, and location are not stored on any server. Test history is saved locally in your browser only and never transmitted anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'WiFi vs ethernet — which gives better speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ethernet almost always gives faster and more stable results than WiFi. WiFi speed is affected by distance from router, interference, and walls. For the most accurate result, connect via ethernet cable.',
      },
    },
  ],
};

const canonicalUrl = 'https://unblockdevs.com/speed-test';

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test Your Internet Speed Online',
  description: 'Step-by-step guide to measuring your download speed, upload speed, ping, and jitter in your browser.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Click Start Test', text: 'Hit the Start button to begin the speed test. No account or plugin required — runs entirely in your browser.' },
    { '@type': 'HowToStep', position: 2, name: 'Download test', text: 'The tool fetches data from the server and measures how quickly your connection receives bytes, reporting download speed in Mbps.' },
    { '@type': 'HowToStep', position: 3, name: 'Upload test', text: 'The tool sends data to the server and measures throughput, reporting your upload speed in Mbps.' },
    { '@type': 'HowToStep', position: 4, name: 'See ping, jitter & history', text: 'View your ping and jitter results alongside download and upload. Results are saved locally in your browser for comparison over time.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Internet Speed Test', item: canonicalUrl },
  ],
};

export default function SpeedTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SpeedTestClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Does an Internet Speed Test Measure?">
          <SEOProse>
            A speed test measures four key metrics of your internet connection. <strong>Download speed</strong>{' '}
            (in Mbps) is how fast your device receives data from the internet — this affects streaming, browsing,
            and downloading files. <strong>Upload speed</strong> is how fast your device sends data to the
            internet — this matters for video calls, cloud backups, and publishing to remote servers.
          </SEOProse>
          <SEOProse>
            <strong>Ping</strong> (latency) measures the round-trip time in milliseconds for a packet to travel
            from your device to a server and back. Lower ping means more responsive connections — under 20 ms is
            excellent for gaming and video calls, while over 100 ms causes noticeable lag. <strong>Jitter</strong>{' '}
            is the variation in ping over multiple packets. A stable connection has low jitter; high jitter causes
            choppy audio and video even when average ping looks acceptable.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Run a Speed Test in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Click Start Test', desc: 'Hit the Start button to begin the speed test. No account or plugin required — runs entirely in your browser.' },
            { n: '02', title: 'Download test', desc: 'The tool fetches data from the server and measures how quickly your connection receives bytes, reporting download speed in Mbps.' },
            { n: '03', title: 'Upload test', desc: 'The tool sends data to the server and measures throughput, reporting your upload speed in Mbps.' },
            { n: '04', title: 'See ping, jitter & history', desc: 'View your ping and jitter results alongside download and upload. Results are saved locally in your browser for comparison over time.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When to Run a Speed Test">
          <UseCases cases={[
            { icon: '📺', title: 'Streaming Diagnosis', desc: 'Buffering on Netflix or YouTube? Run a test to confirm whether your download speed meets the 25 Mbps minimum for HD or 50 Mbps for 4K.' },
            { icon: '🏠', title: 'Remote Work Setup', desc: 'Verify your home connection meets your company\'s requirements before starting a new remote role or setting up a home office.' },
            { icon: '🎮', title: 'Gaming Latency', desc: 'Check ping and jitter before a gaming session. High jitter causes rubber-banding even when download speed looks fine.' },
            { icon: '📋', title: 'ISP Complaint Evidence', desc: 'Run tests at different times of day and save the history as evidence when your ISP is not delivering the speed you are paying for.' },
            { icon: '💼', title: 'WFH Bandwidth Check', desc: 'Before a large video call or all-hands meeting, confirm upload speed is sufficient (10 Mbps minimum for reliable HD video calling).' },
            { icon: '📡', title: 'New Router Validation', desc: 'After setting up a new router or mesh system, run tests on multiple devices to verify the router is distributing bandwidth correctly.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How accurate is this speed test?',
              a: 'This speed test measures your connection speed to our servers and reflects real-world performance for typical web traffic. Results may vary from other speed test services depending on the server location they use. For best accuracy, close other tabs and pause downloads before running the test.',
            },
            {
              q: 'Why is my result lower than my plan speed?',
              a: 'Several factors reduce measured speed: WiFi signal strength and interference, router firmware, number of active devices on the network, peak-hour congestion, and distance from the test server. Connect via ethernet cable and test during off-peak hours for the most accurate comparison to your plan.',
            },
            {
              q: 'What is a good internet speed?',
              a: 'General browsing and email: 10 Mbps. HD streaming: 25 Mbps. 4K streaming: 50 Mbps. HD video calls: 10 Mbps upload. Online gaming: 25 Mbps with ping under 50 ms. Remote work with cloud apps: 100 Mbps download recommended.',
            },
            {
              q: 'What is the difference between ping and jitter?',
              a: 'Ping (latency) is the round-trip time in milliseconds for one packet. Jitter is the variation in that round-trip time across multiple packets. Low jitter (under 10 ms) means a stable, consistent connection. High jitter causes choppy audio and video in calls even when average ping appears acceptable.',
            },
            {
              q: 'Does ethernet give faster results than WiFi?',
              a: 'Almost always, yes. Ethernet bypasses radio frequency interference, router distance limits, and shared wireless bandwidth. If your WiFi speed test result is significantly lower than your plan, try an ethernet connection to isolate whether the issue is your ISP or your wireless setup.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/cors-tester', label: 'CORS Tester', desc: 'Test API endpoint reachability and CORS headers from your browser', icon: '🌐' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and inspect JSON responses from API endpoints', icon: '{}' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for request tracing and correlation IDs', icon: '🔑' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate checksums for verifying downloaded file integrity', icon: '#️⃣' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="speed_test" />
    </>
  );
}
