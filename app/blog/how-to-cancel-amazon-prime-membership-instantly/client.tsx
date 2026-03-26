'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelAmazonPrimeMembershipInstantlyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Amazon Prime Membership Instantly — Desktop and Mobile</h1>
      <p className="lead">
        Canceling Amazon Prime takes less than 2 minutes if you know where to go. This guide walks
        through the exact steps on desktop, iPhone, and Android — plus how to get a refund, what
        happens to your benefits, and common cancellation traps to avoid.
      </p>

      <StatGrid stats={[
        { value: '2 min', label: 'time to cancel if you follow these steps', color: 'green' },
        { value: 'Refund', label: 'available if you haven\'t used benefits this cycle', color: 'blue' },
        { value: '3 methods', label: 'desktop, iPhone app, Android app', color: 'purple' },
        { value: 'Same day', label: 'cancellation takes effect immediately', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Cancel on Desktop (amazon.com)" />
      <VerticalSteps steps={[
        { title: 'Go to amazon.com and sign in', description: 'Make sure you\'re signed into the correct Amazon account with the Prime membership.' },
        { title: 'Hover over "Account & Lists"', description: 'Top right corner → click "Account".' },
        { title: 'Click "Prime" or "Manage Prime Membership"', description: 'Under the Memberships & Subscriptions section.' },
        { title: 'Click "Manage Membership"', description: 'On the Prime membership page, click the "Manage Membership" button.' },
        { title: 'Click "End Membership"', description: 'Select "End Membership and Benefits" to proceed to the confirmation page.' },
        { title: 'Choose cancellation type', description: '"End Now" cancels immediately. "Don\'t Renew" keeps Prime until the current billing period ends. Confirm your choice.' },
      ]} />

      <SectionHeader number={2} title="Cancel on iPhone / iPad" />
      <VerticalSteps steps={[
        { title: 'Open the Amazon Shopping app', description: 'Tap the hamburger menu (☰) in the bottom right.' },
        { title: 'Scroll down to "Account"', description: 'Tap "Account" in the menu.' },
        { title: 'Tap "Manage Prime Membership"', description: 'Under the Prime section.' },
        { title: 'Tap "Manage Membership"', description: 'Then "End Membership and Benefits".' },
        { title: 'Confirm cancellation', description: 'Amazon will ask you to confirm — tap "End Now" or "Don\'t Renew" as preferred.' },
      ]} />

      <SectionHeader number={3} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'Open the Amazon Shopping app', description: 'Tap the three-line menu icon (☰) at the bottom.' },
        { title: 'Go to Settings → Account', description: 'Scroll to find Account settings.' },
        { title: 'Tap "Prime"', description: 'Under the Memberships section.' },
        { title: 'Tap "Manage Prime Membership"', description: 'Then follow same steps as desktop.' },
      ]} />

      <SectionHeader number={4} title="Refund Policy" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Full refund eligible', description: 'If you haven\'t used any Prime benefits (free shipping, Prime Video, etc.) since your last billing date, you can get a full refund when canceling.' },
        { title: 'Partial refund', description: 'If you used some benefits, Amazon offers a prorated refund for the unused portion of your membership period.' },
        { title: 'No refund', description: 'If you extensively used Prime benefits — especially video streaming — you won\'t receive a refund. Benefits used = no refund.' },
        { title: 'How to claim', description: 'During cancellation, if eligible, Amazon shows refund options. Alternatively, contact Amazon Customer Service via chat within 3 days of renewal.' },
      ]} />

      <AlertBox type="tip" title="Try Pause instead of Cancel">
        Amazon lets you pause Prime for 1 or 3 months instead of canceling. Go to Manage
        Membership → Pause Membership. You keep your account history and can resume anytime.
        Good option if you only need Prime during holiday shopping seasons.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Will I lose my Prime Video watchlist if I cancel?',
          answer: 'Your watch history and watchlist are saved to your Amazon account. If you re-subscribe to Prime later, everything is still there. However, you lose access to Prime Video content immediately upon cancellation (or at end of billing period if you chose "Don\'t Renew").',
        },
        {
          question: 'What happens to Subscribe & Save orders after cancellation?',
          answer: 'Subscribe & Save orders continue — they are separate from Prime. You just lose the Prime discount on those orders. Your subscriptions won\'t be canceled; you\'ll simply pay standard shipping rates.',
        },
        {
          question: 'Can I cancel Prime if it was purchased through Apple?',
          answer: 'If you subscribed through the Apple App Store (iOS), you must cancel through Apple: Settings → Your Name → Subscriptions → Amazon Prime → Cancel. Amazon cannot cancel App Store subscriptions.',
        },
        {
          question: 'How do I cancel Prime that was gifted to me?',
          answer: 'Gifted Prime memberships must be canceled the same way — go to Manage Membership in your Amazon account. You cannot transfer or get a refund on a gifted membership, but you can cancel renewal so it doesn\'t continue after the gift period.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
