'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelNetflixSubscriptionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Netflix Subscription Without Losing Watch History (2026)</h1>
      <p className="lead">
        Cancelling Netflix is straightforward once you know where the button is — and your watch
        history, My List, and profiles are preserved for 10 months after cancellation in case you
        come back. This guide covers every cancellation method and answers every common question.
      </p>

      <StatGrid stats={[
        { value: '10 months', label: 'Watch history preserved after cancellation', color: 'blue' },
        { value: '< 2 min', label: 'Time to cancel', color: 'green' },
        { value: '3 methods', label: 'Cancellation paths covered', color: 'purple' },
        { value: 'End of period', label: 'When access ends after cancelling', color: 'amber' },
      ]} />

      <QuickFact>Your Netflix watch history, My List, and profile preferences are saved for 10 months after you cancel. If you rejoin within that time, everything is restored automatically.</QuickFact>

      <SectionHeader number={1} title="Method 1 — Cancel on the Netflix Website" />

      <VerticalSteps steps={[
        {
          title: 'Go to netflix.com and sign in',
          description: 'Visit netflix.com in any browser. Sign in to the account you want to cancel.',
        },
        {
          title: 'Click your profile icon (top right)',
          description: 'Click on the profile avatar in the top-right corner of the page.',
        },
        {
          title: 'Click "Account"',
          description: 'Select "Account" from the dropdown menu.',
        },
        {
          title: 'Click "Cancel Membership"',
          description: 'On the Account page, scroll down to "Membership & Billing" and click "Cancel Membership".',
        },
        {
          title: 'Click "Finish Cancellation"',
          description: 'Confirm by clicking "Finish Cancellation". Netflix shows you when your access ends (end of current billing period). You receive a confirmation email.',
        },
      ]} />

      <SectionHeader number={2} title="Method 2 — Cancel on iOS (iPhone / iPad)" />

      <AlertBox type="warning" title="Cancel through Apple, not Netflix">
        If you subscribed to Netflix through the App Store, you must cancel through Apple's
        subscription settings — not through Netflix directly.
      </AlertBox>

      <VerticalSteps steps={[
        {
          title: 'Open iPhone Settings',
          description: 'Go to Settings on your iPhone or iPad.',
        },
        {
          title: 'Tap your Apple ID name at the top',
          description: 'Tap your name/Apple ID at the very top of Settings.',
        },
        {
          title: 'Tap "Subscriptions"',
          description: 'Scroll down and tap "Subscriptions".',
        },
        {
          title: 'Tap "Netflix" → "Cancel Subscription"',
          description: 'Find Netflix in your active subscriptions and tap "Cancel Subscription". Confirm.',
        },
      ]} />

      <SectionHeader number={3} title="Method 3 — Cancel on Android" />

      <VerticalSteps steps={[
        {
          title: 'Open Google Play Store',
          description: 'If you subscribed through Google Play, open the Google Play Store app.',
        },
        {
          title: 'Tap your profile icon → "Payments & subscriptions" → "Subscriptions"',
          description: 'Navigate to your subscriptions list.',
        },
        {
          title: 'Tap "Netflix" → "Cancel Subscription"',
          description: 'Select Netflix and cancel.',
        },
      ]} />

      <SectionHeader number={4} title="What Is Preserved After Cancellation?" />

      <CompareTable
        leftLabel="What is saved (10 months)"
        rightLabel="What is lost immediately"
        rows={[
          { label: 'Watch history', left: 'Saved for 10 months', right: 'Not applicable' },
          { label: 'My List / favourites', left: 'Saved for 10 months', right: 'Not applicable' },
          { label: 'Profiles', left: 'Saved for 10 months', right: 'Not applicable' },
          { label: 'Ratings and preferences', left: 'Saved for 10 months', right: 'Not applicable' },
          { label: 'Downloads on device', left: 'Not applicable', right: 'Deleted when access ends' },
          { label: 'Streaming access', left: 'Not applicable', right: 'Ends at billing period end' },
        ]}
      />

      <SectionHeader number={5} title="Alternatives to Cancelling" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Downgrade your plan',
          description: 'Switch to the ad-supported Standard plan (~$7/month) instead of cancelling completely. Same content, lower cost.',
        },
        {
          title: 'Share a household',
          description: 'Netflix\'s paid sharing allows adding members outside your household for an extra $8/month. Split the cost with family.',
        },
        {
          title: 'Use the cancel and rejoin cycle',
          description: 'Many users cancel when they finish a show, rejoin when the next season drops. History is preserved during the 10-month window.',
        },
        {
          title: 'Pause (not available in US)',
          description: 'Netflix\'s pause feature is available in some countries. Check if it is available in your Account settings.',
        },
      ]} />

      <SectionHeader number={6} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Will I lose my Netflix watch history when I cancel?',
          answer: 'No. Netflix saves your watch history, My List, profiles, and preferences for 10 months after you cancel. If you rejoin within 10 months, all of this is automatically restored. After 10 months without rejoining, the data is deleted.',
        },
        {
          question: 'When does Netflix access end after I cancel?',
          answer: 'Your access continues until the end of your current billing period. For example, if you cancel on the 5th and your billing date is the 20th, you have access until the 20th. Netflix shows you the exact end date during the cancellation flow.',
        },
        {
          question: 'Can I get a refund when I cancel Netflix?',
          answer: 'Netflix does not offer refunds for the current billing period. If you cancel mid-cycle, you keep access until the end of the period but do not receive a partial refund for unused days. The exception is if you were charged incorrectly — contact Netflix support for billing errors.',
        },
        {
          question: 'How do I cancel Netflix if I subscribed through my TV provider?',
          answer: 'If Netflix is bundled with your cable/satellite/internet provider, you must contact that provider to cancel — not Netflix directly. Check your provider\'s account portal or call their customer service. Examples: AT&T, Comcast, T-Mobile.',
        },
        {
          question: 'Can I cancel Netflix immediately and get refunded for unused days?',
          answer: 'Netflix does not offer prorated refunds for unused days. If you cancel, you keep access until the billing period ends but receive no refund. To minimise waste, cancel on or very close to your billing renewal date.',
        },
        {
          question: 'What happens to downloads when I cancel Netflix?',
          answer: 'Downloaded content on your devices becomes inaccessible once your subscription ends (at the end of the billing period). Downloads are licensed, not owned — they require an active subscription. Complete watching downloaded content before your access ends.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
