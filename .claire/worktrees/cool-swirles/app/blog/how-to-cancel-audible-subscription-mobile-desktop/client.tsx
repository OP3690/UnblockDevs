'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelAudibleSubscriptionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Audible Subscription on Mobile &amp; Desktop (2026)</h1>
      <p className="lead">
        Audible makes cancellation deliberately non-obvious, but once you know where to look it
        takes under 2 minutes. This guide covers every method — website, Android app, iPhone/iOS,
        and Amazon account — and explains what happens to your credits and purchased audiobooks.
      </p>

      <StatGrid stats={[
        { value: '< 2 min', label: 'Time to cancel on desktop', color: 'green' },
        { value: 'Keep', label: 'Purchased audiobooks stay forever', color: 'blue' },
        { value: 'Credits', label: 'Unused credits lost on cancellation', color: 'red' },
        { value: '3 methods', label: 'Ways to cancel covered', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Use credits before cancelling">
        Any unused Audible credits are forfeited when you cancel. Use them before you start
        the cancellation process.
      </AlertBox>

      <SectionHeader number={1} title="Method 1 — Cancel on the Audible Website (Recommended)" />

      <VerticalSteps steps={[
        {
          title: 'Go to audible.com and sign in',
          description: 'Visit audible.com in a browser (desktop or mobile browser). Sign in with your Amazon account.',
        },
        {
          title: 'Click your name in the top right',
          description: 'Click the profile/account icon or your name in the top right corner.',
        },
        {
          title: 'Click "Account Details"',
          description: 'Select "Account Details" from the dropdown menu.',
        },
        {
          title: 'Click "Cancel Membership"',
          description: 'On the Account Details page, scroll down to find "Cancel Membership" under the membership section.',
        },
        {
          title: 'Choose a cancellation reason and confirm',
          description: 'Select a reason from the dropdown. Click "Cancel Membership" to confirm. You will receive a confirmation email.',
        },
      ]} />

      <SectionHeader number={2} title="Method 2 — Cancel via Amazon Account" />

      <VerticalSteps steps={[
        {
          title: 'Sign in to amazon.com',
          description: 'Go to amazon.com and sign in with the same Amazon account linked to your Audible subscription.',
        },
        {
          title: 'Go to Account & Lists → Memberships & Subscriptions',
          description: 'Hover over "Account & Lists" → click "Memberships & Subscriptions".',
        },
        {
          title: 'Find Audible and click "Manage"',
          description: 'Find your Audible membership in the list and click "Manage".',
        },
        {
          title: 'Click "Cancel Membership" and confirm',
          description: 'Follow the prompts to complete cancellation.',
        },
      ]} />

      <SectionHeader number={3} title="Method 3 — Cancel via Android App" />

      <VerticalSteps steps={[
        {
          title: 'Open the Audible app',
          description: 'Open the Audible app on your Android device.',
        },
        {
          title: 'Tap your profile icon (top left)',
          description: 'Tap the profile/person icon in the top left corner.',
        },
        {
          title: 'Tap "Membership" or "Account Details"',
          description: 'Look for membership options in the profile menu.',
        },
        {
          title: 'Tap "Cancel Membership"',
          description: 'Follow the cancellation prompts on screen.',
        },
      ]} />

      <AlertBox type="info" title="Cannot cancel in iOS app">
        Due to Apple's App Store policies, Audible does not allow cancellation through the iOS
        app. iPhone/iPad users must cancel via the Audible website or Amazon account in a browser.
      </AlertBox>

      <SectionHeader number={4} title="What Happens After You Cancel?" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Purchased audiobooks',
          description: 'Books you bought with credits or purchased outright remain in your library forever — even after cancellation.',
        },
        {
          title: 'Unused credits',
          description: 'Unused credits are forfeited immediately upon cancellation. Use them before you cancel.',
        },
        {
          title: 'Whispersync / progress',
          description: 'Your listening position and notes are saved in your library even after cancellation.',
        },
        {
          title: 'Member discounts',
          description: 'The 30% member discount on additional audiobook purchases ends immediately.',
        },
        {
          title: 'Audible Plus content',
          description: 'Access to Audible Plus (unlimited listening catalogue) ends at the end of your billing period.',
        },
        {
          title: 'Rejoin',
          description: 'You can rejoin Audible at any time. New members may be eligible for a free trial.',
        },
      ]} />

      <SectionHeader number={5} title="Alternatives to Cancelling" />

      <AlertBox type="tip" title="Consider pausing your membership">
        Audible offers a pause option: 1, 2, or 3 months with no charges. You keep your credits
        and library access. In the Account Details page, look for "Pause Your Membership" before
        choosing to cancel.
      </AlertBox>

      <SectionHeader number={6} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What happens to my Audible credits when I cancel?',
          answer: 'Unused Audible credits are forfeited immediately when you cancel your membership. There is no refund for unused credits. Always use your credits before cancelling — each credit is worth $14.95-$22.95 (the price of one audiobook).',
        },
        {
          question: 'Do I keep my audiobooks after cancelling Audible?',
          answer: 'Yes. Any audiobook you purchased with a credit or bought outright is permanently yours and stays in your library after cancellation. You can still access and listen to these books through the Audible app (downloaded or streaming) even without an active membership.',
        },
        {
          question: 'Can I get a refund when I cancel Audible?',
          answer: 'Audible\'s refund policy for membership fees is limited. If you cancel very shortly after being charged (within a day), you may be able to get a refund by contacting Audible customer service. Otherwise, monthly membership fees are generally non-refundable. Contact Audible chat support to inquire about your specific situation.',
        },
        {
          question: 'How do I cancel Audible on iPhone?',
          answer: 'You cannot cancel Audible from the iOS app. Open Safari or Chrome on your iPhone, go to audible.com, sign in, click your name → Account Details → Cancel Membership. Alternatively, cancel through your Amazon account at amazon.com → Account & Lists → Memberships & Subscriptions.',
        },
        {
          question: 'What is the difference between Audible and Audible Plus?',
          answer: 'Audible Premium Plus ($14.95/month) includes one credit per month for any audiobook plus unlimited listening to the Audible Plus catalog. Audible Plus ($7.95/month) is unlimited listening only — no credits for premium audiobooks. Both memberships can be cancelled the same way.',
        },
        {
          question: 'Can I pause Audible instead of cancelling?',
          answer: 'Yes. In your Audible Account Details, look for a "Pause Membership" option. You can pause for 1, 2, or 3 months. During the pause, you are not charged, your credits are preserved, and your purchased library remains accessible. After the pause period, your membership resumes automatically.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
