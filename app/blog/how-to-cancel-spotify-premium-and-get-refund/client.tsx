'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelSpotifyPremiumAndGetRefundClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Spotify Premium and Get a Refund — All Platforms</h1>
      <p className="lead">
        Canceling Spotify Premium keeps your account active until the billing period ends —
        you don't lose access immediately. This guide covers all cancellation methods and
        exactly how to request a refund if you were charged unexpectedly.
      </p>

      <StatGrid stats={[
        { value: 'Active until', label: 'end of billing period after canceling', color: 'green' },
        { value: 'Free tier', label: 'you keep your Spotify account with ads', color: 'blue' },
        { value: 'Playlists', label: 'saved forever on free account', color: 'purple' },
        { value: '30 days', label: 'refund window for unexpected charges', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Cancel on Desktop / Web" />
      <VerticalSteps steps={[
        { title: 'Go to spotify.com and sign in', description: 'Click your profile name (top right) → "Account".' },
        { title: 'Click "Manage your plan"', description: 'Under the Your plan section on the Account Overview page.' },
        { title: 'Scroll down to "Cancel Premium"', description: 'Under your current plan details.' },
        { title: 'Click "Cancel Premium"', description: 'Follow the confirmation prompts. Spotify may show retention offers.' },
        { title: 'Confirm cancellation', description: 'Your Premium access continues until the end of the current billing period. You\'ll receive a confirmation email.' },
      ]} />

      <SectionHeader number={2} title="Cancel on iPhone / iOS" />
      <VerticalSteps steps={[
        { title: 'If you signed up via Spotify.com', description: 'Go to spotify.com in Safari (mobile browser) → Account → Cancel Premium. The app doesn\'t support cancellation.' },
        { title: 'If you signed up via Apple', description: 'Settings → Your Name → Subscriptions → Spotify → Cancel Subscription. Required for App Store subscriptions.' },
      ]} />

      <SectionHeader number={3} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'If you signed up via Spotify.com', description: 'Open Chrome → spotify.com → Account → Cancel Premium. Or use the Spotify app: Home → Settings (gear icon) → Account → Cancel Premium.' },
        { title: 'If you signed up via Google Play', description: 'Play Store → Profile → Payments & subscriptions → Subscriptions → Spotify → Cancel.' },
      ]} />

      <SectionHeader number={4} title="How to Get a Refund" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Unexpected charge refund', description: 'Contact Spotify Support at support.spotify.com within 30 days of the charge. Explain you were charged unexpectedly (e.g., forgot to cancel after trial). First-time requests are usually approved.' },
        { title: 'Trial conversion refund', description: 'If your free trial converted to paid and you didn\'t realize, contact support immediately. Most regions allow a refund on the first post-trial charge if you haven\'t used Premium features.' },
        { title: 'Apple/Google refunds', description: 'If charged by Apple or Google: request refund through their respective stores (reportaproblem.apple.com for Apple; support.google.com for Google Play). Spotify cannot process refunds for App Store charges.' },
        { title: 'What Spotify won\'t refund', description: 'Spotify generally won\'t refund charges older than 30 days or repeat requests. If you\'ve been using Premium features (offline downloads, no ads) they\'re less likely to refund.' },
      ]} />

      <AlertBox type="tip" title="Keep playlists on free plan">
        After canceling, your account reverts to Spotify Free. You keep all your playlists and
        saved music. The only differences: ads between songs, no offline downloads,
        shuffle-only on mobile, and lower audio quality. Your music library is safe.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What happens to my music after I cancel Spotify Premium?',
          answer: 'Your playlists, saved albums, podcasts, and followed artists are all retained on your free Spotify account. Downloaded songs for offline listening are deleted (offline is a Premium feature). You can still access all your music online with ads on the free tier.',
        },
        {
          question: 'Can I cancel Spotify Premium and keep the family plan discount?',
          answer: 'No — if you\'re the Premium Family plan owner and cancel, all family members lose Premium. If you\'re a family member (not the plan owner), you can\'t cancel independently — the plan owner must remove you from the family plan or cancel entirely.',
        },
        {
          question: 'How do I cancel Spotify Student discount?',
          answer: 'Spotify Student discount is a type of Premium plan. Cancel it the same way: spotify.com → Account → Cancel Premium. The discount doesn\'t auto-renew at student pricing once you lose student status — Spotify periodically verifies student eligibility.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
