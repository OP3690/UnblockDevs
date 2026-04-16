import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
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
    'internet speed check',
    'check internet speed',
    'mbps speed test',
    'connection speed test',
    'latency test',
    'ping latency test',
    'ethernet speed test',
    'lan speed test',
    'wlan speed test',
    'fiber speed test',
    '5g speed test',
    '4g speed test',
    'lte speed test',
    'cable internet speed test',
    'dsl speed test',
    'isp speed test',
    'speedtest no account',
    'speedtest no app',
    'speedtest browser based',
    'speedtest privacy',
    'speedtest without login',
    'fast.com alternative',
    'speedtest.net alternative',
    'google speed test alternative',
    'ookla alternative',
    'how fast is my internet',
    'test my internet speed',
    'what is my internet speed',
    'slow internet diagnosis',
    'internet speed for streaming',
    'internet speed for gaming',
    'internet speed for video calls',
    'internet speed for remote work',
    'good internet speed',
    'internet speed requirements',
    'download vs upload speed',
    'upload speed test online',
    'download speed test online',
    'ping test online',
    'network latency check',
    'round trip time test',
    'bandwidth test',
    'throughput test',
    'speed test developer tool',
    'isp speed test',
    'wifi performance test',
    'internet connection test',
    'network speed check',
    'internet speed test no app',
    'quick internet speed test',
    'check download speed online',
    'check upload speed online',
    'measure internet speed',
    'internet speed meter',
    'network benchmark tool',
  ],
  openGraph: {
    title: 'Internet Speed Test — Check Download, Upload & Ping Free | UnblockDevs',
    description:
      'Test your internet speed instantly. Download, upload, ping, jitter. No account, no data stored. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/speed-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internet Speed Test — Check Download, Upload & Ping Free',
    description: 'Test download speed, upload, ping & jitter. No account needed. 100% browser-based.',
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
    {
      '@type': 'Question',
      name: 'What internet speed do I need for 4K streaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Netflix and YouTube recommend at least 25 Mbps download for 4K Ultra HD streaming. If multiple devices are streaming simultaneously, multiply that — four devices streaming 4K each would need approximately 100 Mbps. For consistent 4K streaming without buffering, 50+ Mbps on a dedicated connection is recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good ping for gaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under 20 ms ping is excellent for competitive gaming. Under 50 ms is good and most players will not notice lag. Between 50–100 ms is acceptable for casual play. Over 100 ms causes noticeable delay in fast-paced games. Jitter under 5 ms is also important — high jitter causes rubber-banding even with low average ping.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my speed test result differ from my ISP plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ISP plan speeds are theoretical maximums measured under ideal conditions. Real-world speeds are affected by network congestion (especially during peak hours 7–11 PM), WiFi signal quality, router hardware, the number of devices sharing the connection, and the test server location. Use ethernet and test during off-peak hours for the closest result to your plan speed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test the speed of my local network (LAN)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool tests your WAN (internet) speed — the connection between your router and the internet. To test LAN speed between devices on your local network, use tools like iperf3 or iPerf, which send data directly between two computers on the same network to measure internal throughput without involving your internet connection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What upload speed do I need for video calls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zoom recommends 3.8 Mbps upload for HD group video calls and 1.8 Mbps for HD 1-on-1 calls. Google Meet and Microsoft Teams have similar requirements. For reliable HD video calling, at least 5 Mbps upload is recommended as a comfortable buffer. Poor upload speed causes others on the call to see a pixelated, choppy image of you.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is jitter and why does it matter for gaming and calls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jitter is the variation in ping over time — for example, if ping fluctuates between 10 ms and 80 ms rather than staying at a steady 20 ms. High jitter causes voice and video to stutter and makes gaming feel inconsistent even if average latency is low. For gaming, jitter below 5 ms is ideal. For VoIP calls, below 30 ms is acceptable. Jitter is usually caused by network congestion or Wi-Fi interference.',
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
            {
              q: 'What internet speed do I need for 4K streaming?',
              a: 'Netflix and YouTube recommend at least 25 Mbps for 4K Ultra HD. For multiple devices streaming simultaneously, multiply accordingly — four 4K streams need approximately 100 Mbps. A 50+ Mbps dedicated connection is recommended for consistent 4K streaming without buffering.',
            },
            {
              q: 'What is a good ping for gaming?',
              a: 'Under 20 ms is excellent. Under 50 ms is good for most games. Between 50–100 ms is acceptable for casual play. Over 100 ms causes noticeable lag. Keep jitter under 5 ms — high jitter causes rubber-banding even with low average ping.',
            },
            {
              q: 'Why does my result differ from my ISP plan?',
              a: 'ISP plan speeds are theoretical maximums. Real speeds are affected by network congestion, WiFi signal quality, router hardware, and shared connections. Test via ethernet during off-peak hours for the most accurate comparison to your plan.',
            },
            {
              q: 'How do I test local network (LAN) speed?',
              a: <>This tool measures WAN (internet) speed. To test LAN speed between devices, use <C>iperf3</C> — it sends data directly between two computers on the same network to measure internal throughput without using the internet connection.</>,
            },
            {
              q: 'What upload speed do I need for video calls?',
              a: 'Zoom recommends 3.8 Mbps upload for HD group calls. Google Meet and Teams are similar. For reliable HD video calling, 5+ Mbps upload is a comfortable buffer. Low upload speed makes you appear pixelated and choppy to other participants.',
            },
            {
              q: 'How do I improve my internet speed?',
              a: 'Move closer to your router or switch to ethernet. Restart your router (power cycle for 30 seconds). Check for background downloads or updates consuming bandwidth. Contact your ISP if speeds consistently fall below your contracted plan after testing via ethernet.',
            },
            {
              q: 'What is jitter and why does it affect gaming and video calls?',
              a: 'Jitter is the variation in ping over time — if latency swings between 10 ms and 80 ms rather than holding steady, that variation is your jitter. High jitter causes voice to cut out, video to stutter, and gaming inputs to feel inconsistent even when average ping is acceptable. Below 5 ms is ideal for gaming; below 30 ms is acceptable for VoIP. Ethernet and a less-congested router channel both reduce jitter significantly.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Network Debugging Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Slow API Responses Fix' },
            { href: '/blog/json-best-practices-production-guide', label: 'API Performance Best Practices' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Diagnosing Latency Issues' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="speed_test" />
    </>
  );
}
