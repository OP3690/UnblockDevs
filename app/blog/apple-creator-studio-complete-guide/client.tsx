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
        Apple Creator Studio is Apple's official tool for managing, editing, and publishing content
        across Apple Podcasts, Apple Music, and other Apple platforms. This guide covers everything
        content creators need to know — from setup to advanced publishing workflows.
      </p>

      <StatGrid stats={[
        { value: '100M+', label: 'Apple Podcasts listeners worldwide', color: 'blue' },
        { value: 'Free', label: 'Apple Creator Studio access for creators', color: 'green' },
        { value: 'RSS', label: 'podcast hosting via any RSS feed', color: 'purple' },
        { value: '175+', label: 'countries where Apple Podcasts is available', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Apple Creator Studio?" />
      <QuickFact>
        Apple Creator Studio (formerly Apple Podcasts Connect + Apple Music for Artists combined)
        is the web-based platform where creators submit podcasts, manage show metadata, view analytics,
        and interact with Apple's content distribution networks. Think of it as Apple's version of
        YouTube Studio or Spotify for Podcasters.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Podcast Management', description: 'Submit your RSS feed to Apple Podcasts, update show artwork, manage episode listings, and respond to listener reviews.' },
        { title: 'Analytics Dashboard', description: 'Detailed listening analytics — where listeners drop off, device types, country breakdown, follows vs plays, and episode performance over time.' },
        { title: 'Content Submission', description: 'Submit podcasts, music content, and other audio/video for distribution across Apple platforms directly through the dashboard.' },
        { title: 'Audience Insights', description: 'Understand your audience demographics, listening habits, and which episodes drive new subscribers vs retain existing ones.' },
      ]} />

      <SectionHeader number={2} title="Getting Started — Step by Step" />
      <VerticalSteps steps={[
        { title: 'Create an Apple ID', description: 'You need an Apple ID to access Creator Studio. Use a dedicated business email, not a personal Apple ID.' },
        { title: 'Go to podcasters.apple.com', description: 'Sign in with your Apple ID at podcasters.apple.com. This is the main Creator Studio portal for podcast management.' },
        { title: 'Submit Your RSS Feed', description: 'Paste your podcast RSS feed URL. Apple validates the feed format — ensure it includes title, description, artwork (1400×1400 minimum, 3000×3000 recommended), and at least one episode.' },
        { title: 'Wait for Approval', description: 'Apple review typically takes 24-48 hours. You\'ll receive an email when approved and your show appears in Apple Podcasts search.' },
        { title: 'Access Analytics', description: 'Once live with at least 30 days of data, the Analytics tab unlocks showing detailed listener behavior and episode performance.' },
      ]} />

      <SectionHeader number={3} title="Understanding Apple Podcasts Analytics" />
      <CompareTable
        leftLabel="Metric"
        rightLabel="What It Means"
        rows={[
          { label: 'Listeners', left: 'Unique devices that played your episode', right: 'More accurate than downloads — de-duped per device' },
          { label: 'Plays', left: 'Total play events', right: 'One listener can have multiple plays' },
          { label: 'Average Consumption', left: '% of episode actually listened to', right: '80%+ is excellent; below 50% = engagement problem' },
          { label: 'Followers', left: 'Users who subscribed to the show', right: 'High-quality metric — followers get auto-downloads' },
          { label: 'Time Followed', left: 'When in the episode users follow', right: 'Shows which content converts listeners to subscribers' },
        ]}
      />

      <SectionHeader number={4} title="Optimizing Your Apple Podcasts Presence" />
      <AlertBox type="tip" title="Artwork and metadata are critical for discovery">
        Apple Podcasts uses your show title, description, and category as the primary search ranking factors.
        Use keywords naturally in your title and description. Your artwork must be 3000×3000px minimum,
        square format, with no external URLs or contact information.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Show Title', description: 'Include your main keyword naturally. "The JavaScript Podcast" ranks for "JavaScript podcast". Avoid keyword stuffing — Apple penalizes it.' },
        { title: 'Show Description', description: 'First 3 lines appear in search results. Lead with the most important information. Include episode topics and target audience.' },
        { title: 'Episode Titles', description: 'Specific titles outperform generic ones. "How to Fix CORS Errors in Node.js" > "Episode 47". Include keywords listeners would search for.' },
        { title: 'Categories', description: 'Choose the primary and secondary categories carefully. Wrong category = wrong audience discovery. You can change them without re-submitting.' },
      ]} />

      <SectionHeader number={5} title="Common Issues and Fixes" />
      <CompareTable
        leftLabel="Problem"
        rightLabel="Solution"
        rows={[
          { label: 'Feed not updating', left: 'New episodes not appearing', right: 'Force refresh: submit feed URL again in Creator Studio' },
          { label: 'Artwork rejected', left: 'Image not meeting specs', right: 'Must be 3000×3000px, RGB JPEG/PNG, no promotional text' },
          { label: 'Show not discoverable', left: 'Doesn\'t appear in search', right: 'Allow 24-72 hours after approval; check title for keywords' },
          { label: 'Analytics missing', left: 'No data in dashboard', right: 'Need 30+ days of publishing history for analytics to unlock' },
          { label: 'RSS validation errors', left: 'Feed rejected on submission', right: 'Validate with castfeedvalidator.com before submitting' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Is Apple Creator Studio free?',
          answer: 'Yes — Apple Creator Studio access is completely free. You need an Apple ID and a valid RSS feed from any podcast hosting provider. Apple does not host your audio files — you need a podcast host (Buzzsprout, Podbean, Anchor/Spotify, etc.) that provides an RSS feed.',
        },
        {
          question: 'How long does Apple Podcasts review take?',
          answer: 'New show submissions typically take 24-48 hours for standard review. During high-volume periods (September launches, major events), it can take up to 5 business days. Episode updates via RSS are typically reflected within 1-4 hours automatically.',
        },
        {
          question: 'Can I see who my listeners are on Apple Podcasts?',
          answer: 'No individual listener data — Apple protects privacy. You see aggregate metrics: country, device type, play counts, listening duration, and follow rate. No email addresses or personal identifying information is shared with creators.',
        },
        {
          question: 'What is the difference between Apple Podcasts Connect and Creator Studio?',
          answer: 'Apple is consolidating its creator tools. Apple Podcasts Connect is the original podcast submission portal (podcasters.apple.com). Creator Studio is Apple\'s broader creator platform vision. Currently they refer to the same web portal — this may expand as Apple integrates more creator tools.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
