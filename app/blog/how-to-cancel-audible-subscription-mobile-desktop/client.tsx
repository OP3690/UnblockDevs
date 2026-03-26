'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelAudibleSubscriptionMobileDesktopClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Audible Subscription — Desktop and Mobile (Step-by-Step)</h1>
      <p className="lead">
        Canceling Audible takes just a few minutes. Your purchased audiobooks stay in your library
        forever — canceling only stops future charges and monthly credit accrual. This guide covers
        all methods: desktop, iOS, and Android.
      </p>

      <StatGrid stats={[
        { value: 'Books stay', label: 'purchased audiobooks remain in your library forever', color: 'green' },
        { value: 'Credits', label: 'unused credits are lost on cancellation — use them first!', color: 'amber' },
        { value: '3 methods', label: 'website, iOS, Android', color: 'blue' },
        { value: 'Pause option', label: '1-3 month pause available instead of full cancel', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Use your credits before canceling">
        Any unused Audible credits will be lost when you cancel. Go to audible.com, browse the
        store, and redeem all credits before proceeding with cancellation.
      </AlertBox>

      <SectionHeader number={1} title="Cancel on Desktop (audible.com)" />
      <VerticalSteps steps={[
        { title: 'Go to audible.com and sign in', description: 'Use the same Amazon account linked to your Audible subscription.' },
        { title: 'Click your name (top right)', description: 'Select "Account Details" from the dropdown menu.' },
        { title: 'Click "Cancel Membership"', description: 'Under the Membership Details section. This is a small link, not a big button.' },
        { title: 'Follow the cancellation flow', description: 'Audible will show retention offers (pause, cheaper plan). Continue clicking through to reach the final cancellation.' },
        { title: 'Confirm cancellation', description: 'Click "Cancel Membership" on the final confirmation page. You\'ll receive a confirmation email.' },
      ]} />

      <SectionHeader number={2} title="Cancel on iPhone / iPad" />
      <VerticalSteps steps={[
        { title: 'Note: Cancel via website, not app', description: 'Audible iOS app does not have a cancellation option — you must use the website. Open Safari or Chrome on your phone.' },
        { title: 'Go to audible.com on mobile browser', description: 'Sign in and navigate to Account Details → Cancel Membership.' },
        { title: 'If subscribed via Apple', description: 'If you signed up through the App Store: Settings → Your Name → Subscriptions → Audible → Cancel Subscription.' },
      ]} />

      <SectionHeader number={3} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'Open Audible app', description: 'Tap the profile icon (bottom right) → My Account.' },
        { title: 'Tap "Cancel Membership"', description: 'Scroll down in Account settings to find the cancel option.' },
        { title: 'Or use the website', description: 'Open Chrome → audible.com → Account Details → Cancel Membership.' },
        { title: 'If subscribed via Google Play', description: 'Play Store → Subscriptions → Audible → Cancel subscription.' },
      ]} />

      <SectionHeader number={4} title="What Happens After Cancellation" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Audiobooks stay', description: 'All books you purchased with credits or bought outright remain in your Audible library and can be downloaded and listened to forever — even without a subscription.' },
        { title: 'Unused credits lost', description: 'Any remaining monthly credits are forfeited immediately upon cancellation. This is why you should redeem all credits before canceling.' },
        { title: 'Access until end of period', description: 'You retain premium member pricing and benefits until the end of your current billing period if you chose not to cancel immediately.' },
        { title: 'Pause alternative', description: 'Instead of canceling, you can pause for 1, 2, or 3 months — your credits accumulate during the pause. Resume anytime. Great for temporary breaks.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Will I lose my audiobooks if I cancel Audible?',
          answer: 'No. All audiobooks you purchased with credits or bought directly are permanently yours. They stay in your library and you can download them anytime, even without an active subscription. The Audible app still works for listening to your owned books after cancellation.',
        },
        {
          question: 'Can I get a refund from Audible?',
          answer: 'Audible offers a 30-day refund policy for the subscription fee if you cancel within 30 days of renewal and haven\'t used your credit. Contact Audible Customer Service directly — they are generally helpful with refund requests. For audiobook purchases, Audible has a "Great Listen Guarantee" allowing returns within 365 days.',
        },
        {
          question: 'How do I cancel Audible if I can\'t find the cancel button?',
          answer: 'Contact Audible Customer Service at audible.com/ep/cs. Chat or call (1-888-283-5051 in the US). They can cancel immediately over chat. Audible\'s cancellation flow deliberately makes it hard to find — Customer Service is often the fastest path.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
