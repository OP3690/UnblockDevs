'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelNetflixSubscriptionWithoutLosingWatchHistoryClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Netflix Without Losing Watch History — Complete Guide</h1>
      <p className="lead">
        Canceling Netflix is simple, and your watch history, ratings, and profiles are all saved
        for 10 months after cancellation. You can reactivate and pick up exactly where you left off.
        This guide walks through cancellation on every platform.
      </p>

      <StatGrid stats={[
        { value: '10 months', label: 'Netflix saves your data after cancellation', color: 'green' },
        { value: 'All profiles', label: 'saved and restored when you resubscribe', color: 'blue' },
        { value: 'Immediate', label: 'cancellation takes effect end of billing period', color: 'purple' },
        { value: 'No penalty', label: 'cancel and resubscribe freely anytime', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Cancel on Desktop (netflix.com)" />
      <VerticalSteps steps={[
        { title: 'Go to netflix.com and sign in', description: 'Make sure you\'re in the profile that has account management access (typically the main profile).' },
        { title: 'Click your profile icon (top right)', description: 'Select "Account" from the dropdown menu.' },
        { title: 'Click "Cancel Membership"', description: 'Under the Membership & Billing section. It may be called "Cancel Streaming Plan".' },
        { title: 'Click "Finish Cancellation"', description: 'Netflix will show you what you\'ll lose — continue to confirm. Your membership remains active until the end of the current billing period.' },
        { title: 'Check your email', description: 'You\'ll receive a cancellation confirmation email with the last active date.' },
      ]} />

      <SectionHeader number={2} title="Cancel on iPhone / iPad" />
      <VerticalSteps steps={[
        { title: 'Netflix doesn\'t support in-app cancellation on iOS', description: 'Apple prevents third-party apps from processing cancellations. Use netflix.com in a browser instead.' },
        { title: 'If subscribed via Apple', description: 'Settings → Your Name → Subscriptions → Netflix → Cancel Subscription. This is required if you signed up through the App Store.' },
        { title: 'Alternative: netflix.com in Safari', description: 'Open Safari → netflix.com → Account → Cancel Membership.' },
      ]} />

      <SectionHeader number={3} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'Open Netflix app', description: 'Tap your profile icon → Account.' },
        { title: 'Tap "Cancel Membership"', description: 'Under the Membership section.' },
        { title: 'If subscribed via Google Play', description: 'Play Store → Profile icon → Payments & subscriptions → Subscriptions → Netflix → Cancel.' },
      ]} />

      <SectionHeader number={4} title="What Happens to Your Data" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Watch history preserved', description: 'Netflix saves your complete viewing history for 10 months after cancellation. All "Continue Watching" progress is preserved.' },
        { title: 'My List saved', description: 'All titles you added to My List across all profiles are retained for the 10-month window.' },
        { title: 'Ratings & reviews', description: 'Your thumbs up/down ratings are saved and used to personalize recommendations when you return.' },
        { title: 'Downloads deleted', description: 'Downloaded content for offline viewing is deleted once your membership ends. Re-download after resubscribing.' },
      ]} />

      <AlertBox type="tip" title="Reactivating restores everything">
        When you resubscribe within 10 months, all your profiles, history, lists, and ratings are
        automatically restored. You can literally pick up mid-episode where you left off.
        After 10 months, account data is permanently deleted.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Can I still watch Netflix after canceling?',
          answer: 'Yes — your membership remains active until the last day of your paid billing period. If you paid for the month on the 5th and cancel on the 10th, you can still watch until the 4th of next month. You are not cut off immediately.',
        },
        {
          question: 'How do I cancel Netflix and keep my watch history?',
          answer: 'Simply cancel normally — Netflix automatically retains all your data for 10 months. There\'s nothing special you need to do. Your profiles, watch history, ratings, and My List are all preserved. Just resubscribe within 10 months to restore everything.',
        },
        {
          question: 'Why can\'t I cancel Netflix on my iPhone?',
          answer: 'If you subscribed via the Netflix website or Android, you cannot cancel through the iPhone app — use netflix.com in Safari instead. If you subscribed through the Apple App Store (you\'d have been charged by Apple), you must cancel through Apple: Settings → Subscriptions → Netflix.',
        },
        {
          question: 'Can I get a refund when I cancel Netflix?',
          answer: 'Netflix does not offer prorated refunds. You\'ll have access until the end of your current billing period regardless of when you cancel. In some regions, you may be eligible for a refund on the most recent charge if you contact support within 7 days of renewal and haven\'t watched anything.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
