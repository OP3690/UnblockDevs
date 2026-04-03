'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function AppleCreatorStudioCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Apple Creator Studio — Complete Guide: Features, Tips, and How to Use It</h1>
      <p className="lead">
        Apple Creator Studio is Apple's official platform for managing, optimizing, and publishing content
        across Apple Podcasts and other Apple media platforms. With over 100 million Apple Podcasts listeners
        worldwide, getting your podcast properly set up, discoverable, and analytics-driven is essential for
        growth. This guide covers everything content creators need — from initial RSS submission and approval
        to understanding analytics, optimizing discoverability, troubleshooting common issues, and making
        the most of Apple's creator tools compared to competing platforms.
      </p>

      <StatGrid stats={[
        { value: '100M+', label: 'Apple Podcasts listeners worldwide', color: 'blue' },
        { value: 'Free', label: 'Apple Creator Studio access for all creators', color: 'green' },
        { value: '175+', label: 'countries where Apple Podcasts is available', color: 'purple' },
        { value: '24–48h', label: 'typical new show approval time', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Apple Creator Studio?" />
      <QuickFact color="blue" label="Apple's creator management platform">
        Apple Creator Studio (available at podcasters.apple.com) is the web-based dashboard where
        creators submit podcasts, manage show metadata, view detailed listener analytics, respond to
        reviews, and interact with Apple's content distribution network. Think of it as Apple's version
        of YouTube Studio or Spotify for Podcasters — your central control panel for Apple Podcasts presence.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Podcast Management', description: 'Submit your RSS feed to Apple Podcasts, update show artwork, manage episode listings, edit show descriptions, update categories, and control show visibility. All metadata changes flow through this dashboard.' },
        { title: 'Analytics Dashboard', description: 'Detailed listening analytics including: listener counts, plays, average consumption percentage per episode, follower counts over time, country and device breakdown, and episode-level performance comparison.' },
        { title: 'Content Submission and Review', description: 'Submit new shows for Apple review, resubmit after making changes, and track approval status. Apple reviews all new podcast submissions for quality and compliance with content guidelines before they appear in search.' },
        { title: 'Audience Insights', description: 'Understand your audience demographics (where they are, what devices they use), which episodes drive new followers vs retain existing ones, and listening behavior patterns like time of day and completion rates.' },
      ]} />

      <SectionHeader number={2} title="Getting Started — Step by Step" />
      <VerticalSteps steps={[
        { title: 'Create a dedicated Apple ID', desc: 'Go to podcasters.apple.com and sign in with an Apple ID. Use a dedicated business or show email rather than a personal Apple ID — you may want to share access with team members later.' },
        { title: 'Prepare your RSS feed', desc: 'Your podcast host (Buzzsprout, Podbean, Anchor, Transistor, etc.) generates an RSS feed URL. Validate it first at castfeedvalidator.com to catch errors before submission. Required feed elements: show title, description, artwork URL (3000×3000px minimum), language, and at least one episode.' },
        { title: 'Submit your RSS feed', desc: 'In Creator Studio, click "Add a Show" and paste your RSS feed URL. Apple validates the feed format immediately — any errors are shown with specific fields to fix. Common issues: missing artwork, episode files with wrong format, or incomplete show metadata.' },
        { title: 'Wait for Apple review', desc: 'New show submissions typically take 24–48 hours for standard review. During high-volume periods (September is podcast season), it can take up to 5 business days. You\'ll receive an email when approved and your show appears in Apple Podcasts search within 1–4 hours of approval.' },
        { title: 'Set up ongoing RSS sync', desc: 'Apple Podcasts automatically checks your RSS feed every 1–4 hours for new episodes. When you publish a new episode to your podcast host, it appears on Apple Podcasts without any manual action from Creator Studio.' },
        { title: 'Access analytics after 30 days', desc: 'The Analytics tab unlocks once your show has at least 30 days of publishing history. Analytics data is available for the previous 24 hours, 7 days, 30 days, and 60 days, with episode-level drill-down.' },
      ]} />

      <SectionHeader number={3} title="Understanding Apple Podcasts Analytics" />
      <CompareTable
        leftLabel="Metric"
        rightLabel="What It Means and Why It Matters"
        rows={[
          { label: 'Listeners', left: 'Unique devices that played your episode', right: 'More accurate than downloads — de-duplicated per device per day. Apple\'s privacy-first metric.' },
          { label: 'Plays', left: 'Total play events for an episode', right: 'One listener can generate multiple plays. Useful for measuring re-listens.' },
          { label: 'Average Consumption', left: '% of episode actually listened to (not just downloaded)', right: '80%+ is excellent. Below 50% signals a content engagement problem — intro too long, wrong topic match, or audio quality issues.' },
          { label: 'Followers', left: 'Users who subscribed to auto-download your show', right: 'Highest-quality metric. Followers get automatic downloads — they\'re your most loyal audience segment.' },
          { label: 'Time Followed', left: 'At what point in an episode users follow your show', right: 'Reveals which content types or segments convert casual listeners into subscribers.' },
          { label: 'Unique Devices', left: 'Count of individual Apple devices that played your episode', right: 'Lower than raw plays, more accurate than downloads for audience size estimation.' },
        ]}
      />

      <SectionHeader number={4} title="Optimizing Your Apple Podcasts Presence" />
      <AlertBox type="tip" title="Artwork and metadata are the primary discoverability levers">
        Apple Podcasts search and browse algorithms use your show title, description, and category as
        primary ranking signals. Episode titles are indexed and searchable individually. Your artwork
        appears in search results at very small sizes — it must be legible at 50×50px thumbnail size,
        not just beautiful at full resolution. These are the levers that directly control whether
        new listeners find your show.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Show Title Optimization', description: 'Include your main keyword naturally in the title. "The JavaScript Podcast" ranks well for "JavaScript podcast." Avoid keyword stuffing in parentheses — Apple penalizes manipulation. Don\'t change your title frequently — it resets authority signals.' },
        { title: 'Show Description', description: 'First 3 lines appear in search results before truncation. Lead with who the show is for and what they\'ll get. Include episode topic keywords and target audience. Update quarterly to reflect current focus.' },
        { title: 'Episode Titles', description: 'Specific, searchable titles dramatically outperform generic ones. "How to Fix CORS Errors in Node.js" ranks for that query. "Episode 47: Interview with Dave" does not. Every episode title is indexed individually by Apple search.' },
        { title: 'Categories', description: 'Choose the single most relevant primary category — wrong category placement means Apple recommends you to the wrong audience. You can add one subcategory. Categories can be changed without re-submitting the show.' },
        { title: 'Artwork Requirements', description: 'Minimum: 1400×1400px. Recommended: 3000×3000px JPEG or PNG. RGB color mode (not CMYK). No external URLs, contact information, or pricing. Must be visually distinct and readable at thumbnail size (50×50px in search results).' },
        { title: 'Release Consistency', description: 'Apple Podcasts gives algorithmic preference to shows with consistent publishing schedules. Same day and time each week builds listener habits and signals reliability to Apple\'s recommendation engine.' },
      ]} />

      <SectionHeader number={5} title="Apple Podcasts vs Spotify for Podcasters — Creator Tools Comparison" />
      <CompareTable
        leftLabel="Apple Podcasts (Creator Studio)"
        rightLabel="Spotify for Podcasters"
        rows={[
          { label: 'Audience size', left: '100M+ listeners, historically dominant', right: 'Growing fast — Spotify overtook Apple in some markets by 2023' },
          { label: 'Analytics depth', left: 'Consumption rate, listener count, follower tracking, device breakdown', right: 'Streams, listeners, followers, age/gender demographics, geographic detail' },
          { label: 'Monetization', left: 'Apple Podcasts Subscriptions (paid tiers), tip jar', right: 'Spotify Audience Network ads, fan support, subscription tiers' },
          { label: 'RSS hosting', left: 'Uses your existing podcast host RSS feed', right: 'Can host directly on Spotify OR use RSS feed from any host' },
          { label: 'Exclusivity option', left: 'No exclusivity requirement', right: 'Can create Spotify-exclusive content for extra visibility' },
          { label: 'Review response', left: '✅ Can respond to listener reviews publicly', right: '❌ No public review response feature' },
        ]}
      />

      <SectionHeader number={6} title="Common Issues and Fixes" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Feed not updating / New episodes not appearing', description: 'Apple polls your RSS feed every 1–4 hours. For immediate refresh: go to Creator Studio → your show → "Feed URL" tab → click "Refresh Feed." If episodes still don\'t appear after 24 hours, check your podcast host\'s RSS feed URL hasn\'t changed.' },
        { title: 'Artwork rejected', description: 'Common reasons: below 1400×1400px minimum, CMYK color mode (must be RGB), contains external URLs or pricing information, or the image has white space at edges creating a non-square effective image. Re-export from design tool as RGB PNG at 3000×3000.' },
        { title: 'Show not appearing in search', description: 'Allow 24–72 hours post-approval for search indexing. Check: is your show title containing the keywords people search for? Are you in the correct primary category? Is your show set to "Publicly Available" (not unlisted)?' },
        { title: 'Analytics not available', description: 'Analytics unlock after 30 days of publishing history with meaningful listener activity. Small shows may see limited data initially. Apple\'s minimum threshold protects listener privacy by not revealing exact counts for very small audiences.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Is Apple Creator Studio free?',
          answer: 'Yes — Apple Creator Studio (podcasters.apple.com) is completely free. You need an Apple ID and a valid RSS feed from any podcast hosting provider. Apple does not host your audio files — you need a podcast host (Buzzsprout, Podbean, Transistor, Anchor/Spotify, Libsyn, etc.) that generates an RSS feed. Podcast hosting typically costs $5–20/month. Apple takes no revenue share unless you use Apple Podcasts Subscriptions for paid content.',
        },
        {
          question: 'How long does Apple Podcasts review take for new shows?',
          answer: 'New show submissions typically take 24–48 hours. During high-volume periods (September/October when many shows launch, or around Apple announcements), it can take up to 5 business days. Episode updates via RSS appear automatically within 1–4 hours without any manual review — Apple only reviews the show itself initially, not each new episode.',
        },
        {
          question: 'Can I see who my listeners are on Apple Podcasts?',
          answer: 'No individual listener data — Apple protects listener privacy by design. You see only aggregate metrics: country (broad regional breakdown), device type (iPhone, iPad, Mac, etc.), play counts, average listening duration, and follow rate. No email addresses, names, or personal identifying information is ever shared with creators. This is a deliberate privacy choice that differentiates Apple from platforms that sell demographic data.',
        },
        {
          question: 'What is the difference between Apple Podcasts Connect and Creator Studio?',
          answer: 'These refer to the same portal at podcasters.apple.com. "Apple Podcasts Connect" was the original name; "Creator Studio" is Apple\'s broader creator platform branding. Currently they refer to the same web dashboard. The portal may expand as Apple integrates more creator tools (Apple Music for Artists is a separate but related portal for music artists).',
        },
        {
          question: 'How do Apple Podcasts Subscriptions work for paid content?',
          answer: 'Apple Podcasts Subscriptions lets you charge listeners for premium content. You create a subscription tier with a monthly or annual price (minimum $0.49/month). Apple takes 30% in year 1, 15% from year 2 onward. Subscribers get an ad-free experience, early access, or bonus episodes — whatever you configure. Payment processing is handled entirely by Apple through existing Apple ID payment methods. Setup requires an Apple Developer account ($99/year).',
        },
        {
          question: 'What episode average consumption rate should I aim for?',
          answer: '80%+ average consumption is excellent — it means listeners are engaged through almost the entire episode. 60–80% is good for most shows. Below 50% signals a problem worth investigating: intro too long before the topic begins, audio quality issues (background noise, inconsistent levels), topic mismatch between title and content, or episode length doesn\'t match audience expectations. Use the episode-level breakdown to find where listeners drop off — if there\'s a sudden drop at the same timestamp, that specific segment is the problem.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
