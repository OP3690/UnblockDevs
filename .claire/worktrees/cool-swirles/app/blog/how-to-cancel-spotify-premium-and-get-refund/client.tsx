'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelSpotifyPremiumClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Spotify Premium and Get a Refund (If Eligible) — 2026 Guide</h1>
      <p className="lead">
        Cancelling Spotify Premium keeps your playlists, liked songs, and followers — you just revert
        to the free tier. This guide shows every cancellation method and explains whether you qualify
        for a refund (spoiler: Spotify rarely refunds, but there are exceptions).
      </p>

      <StatGrid stats={[
        { value: 'Free tier', label: 'What you revert to after cancelling', color: 'green' },
        { value: 'Playlists', label: 'Saved and kept after cancellation', color: 'blue' },
        { value: 'Rare', label: 'How often Spotify grants refunds', color: 'red' },
        { value: '< 2 min', label: 'Time to cancel on desktop', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Method 1 — Cancel on Spotify Website (Desktop or Mobile Browser)" />

      <VerticalSteps steps={[
        {
          title: 'Go to spotify.com and sign in',
          description: 'Visit spotify.com in any browser. Sign in to your account.',
        },
        {
          title: 'Click your profile name (top right) → "Account"',
          description: 'Click your profile picture or name and select "Account" from the menu.',
        },
        {
          title: 'Click "Manage your plan"',
          description: 'Under the "Plan" section, click "Change or cancel" or "Manage your plan".',
        },
        {
          title: 'Select "Cancel Premium"',
          description: 'Click "Cancel Premium" at the bottom of the plan options.',
        },
        {
          title: 'Confirm cancellation',
          description: 'Follow the prompts. Spotify may offer you a discount to stay. Decline and confirm "Cancel anyway" to complete cancellation.',
        },
      ]} />

      <AlertBox type="tip" title="Spotify often offers a discount to stay">
        During cancellation, Spotify frequently offers 1-3 months at 50% off to retain you.
        If cost was your reason for cancelling, consider taking the offer — it's legitimately cheaper.
      </AlertBox>

      <SectionHeader number={2} title="Method 2 — Cancel if Subscribed via Apple (iOS)" />

      <VerticalSteps steps={[
        {
          title: 'Open iPhone Settings',
          description: 'If you subscribed through the App Store, you must cancel through Apple Settings.',
        },
        {
          title: 'Tap your Apple ID → "Subscriptions"',
          description: 'Tap your name at the top of Settings, then "Subscriptions".',
        },
        {
          title: 'Tap "Spotify" → "Cancel Subscription"',
          description: 'Find Spotify in your active subscriptions and confirm cancellation.',
        },
      ]} />

      <SectionHeader number={3} title="Method 3 — Cancel if Subscribed via Google Play (Android)" />

      <VerticalSteps steps={[
        {
          title: 'Open Google Play Store',
          description: 'Open the Google Play Store app on your Android device.',
        },
        {
          title: 'Tap profile icon → "Payments & subscriptions" → "Subscriptions"',
          description: 'Navigate to your active subscriptions.',
        },
        {
          title: 'Tap "Spotify" → "Cancel Subscription"',
          description: 'Cancel and confirm.',
        },
      ]} />

      <SectionHeader number={4} title="Refund Eligibility — Can You Get Money Back?" />

      <CompareTable
        leftLabel="Scenario"
        rightLabel="Refund likelihood"
        rows={[
          { label: 'Cancelled within 14 days (EU customers)', left: 'EU consumer law may entitle you to a refund', right: 'Contact Spotify support immediately' },
          { label: 'Charged incorrectly (duplicate, wrong amount)', left: 'High — billing error', right: 'Contact Spotify support with billing evidence' },
          { label: 'Cancelled mid-month (normal cancellation)', left: 'No refund — Spotify policy', right: 'Access continues to end of billing period' },
          { label: 'Forgot to cancel before renewal', left: 'No automatic refund', right: 'Immediately cancel then contact support — sometimes refunded' },
          { label: 'Subscribed via Apple/Google', left: 'Refund from Apple/Google, not Spotify', right: 'Contact Apple Support or Google Play support' },
        ]}
      />

      <SectionHeader number={5} title="What Happens After You Cancel Spotify Premium?" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Your playlists',
          description: 'All playlists, liked songs, and followed artists are saved permanently — even on the free tier.',
        },
        {
          title: 'Downloaded music',
          description: 'Downloaded tracks become inaccessible when your Premium period ends. Songs revert to stream-only.',
        },
        {
          title: 'Audio quality',
          description: 'Reverts from 320kbps (Very High) to 160kbps (High) on the free tier — or lower on mobile.',
        },
        {
          title: 'Ads return',
          description: 'Spotify free tier includes ads between songs and between podcasts.',
        },
        {
          title: 'Shuffle restriction',
          description: 'Free mobile users can only shuffle playlists — no on-demand track selection on mobile.',
        },
        {
          title: 'Offline listening',
          description: 'No offline listening on the free tier. You need an internet connection to stream.',
        },
      ]} />

      <SectionHeader number={6} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Do I lose my playlists when I cancel Spotify Premium?',
          answer: 'No. All your playlists, liked songs, followed artists, and podcasts are saved permanently on your Spotify account, even on the free tier. You do not lose any library data when you cancel Premium.',
        },
        {
          question: 'Does Spotify offer refunds?',
          answer: 'Spotify\'s standard policy is no refunds for the current billing period. Exceptions: EU customers may have 14-day cooling-off rights under consumer law; billing errors (charged twice, wrong amount) are refunded; and if you contact support immediately after an accidental renewal, they sometimes refund as a one-time courtesy.',
        },
        {
          question: 'When does Spotify Premium end after I cancel?',
          answer: 'Your Premium access continues until the end of your current billing period. Spotify shows you the exact end date when you cancel. You are not charged again after that date.',
        },
        {
          question: 'Can I cancel Spotify Premium and keep Family/Duo members?',
          answer: 'If you are the plan owner of a Spotify Premium Duo or Family plan, cancelling will end Premium for all members on the plan — not just yourself. If other members want to keep Premium, they must start their own subscription.',
        },
        {
          question: 'How do I cancel Spotify if subscribed through my mobile carrier?',
          answer: 'If Spotify is bundled with your mobile carrier plan (AT&T, T-Mobile, etc.), you must contact your carrier to cancel — not Spotify. Your Spotify account exists separately; cancelling the carrier bundle reverts you to the free tier.',
        },
        {
          question: 'Will cancelling Spotify affect my Hulu or other bundled subscriptions?',
          answer: 'The Spotify + Hulu student bundle is separate from regular Spotify Premium. Cancelling Spotify may affect your bundled Hulu access depending on the specific plan. Check your bundle terms at spotify.com/account before cancelling.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
