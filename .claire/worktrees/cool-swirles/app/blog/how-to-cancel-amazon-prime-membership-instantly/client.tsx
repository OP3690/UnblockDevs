'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelAmazonPrimeMembershipClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Amazon Prime Membership Instantly (2026 Guide)</h1>
      <p className="lead">
        Cancelling Amazon Prime takes less than 2 minutes when you know exactly where to click.
        This complete guide covers every method — browser, mobile app, and phone — explains refund
        eligibility, and answers every question about what happens after you cancel.
      </p>

      <StatGrid stats={[
        { value: '< 2 min', label: 'Time to cancel online', color: 'green' },
        { value: 'Full/partial', label: 'Refund may be available', color: 'blue' },
        { value: '3 methods', label: 'Ways to cancel covered', color: 'purple' },
        { value: 'Instant', label: 'When cancellation takes effect', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Method 1 — Cancel on Desktop Browser (Fastest)" />

      <VerticalSteps steps={[
        {
          title: 'Sign in to amazon.com',
          description: 'Go to amazon.com and sign in to the account that has the Prime membership you want to cancel.',
        },
        {
          title: 'Open Account & Lists',
          description: 'Hover over "Account & Lists" in the top-right corner of the page.',
        },
        {
          title: 'Click "Prime Membership"',
          description: 'In the dropdown, click "Prime Membership" or go directly to amazon.com/gp/primecentral.',
        },
        {
          title: 'Click "Update, cancel and more"',
          description: 'On the Prime central page, look for the yellow "Manage Membership" section. Click "Update, cancel and more".',
        },
        {
          title: 'Click "End Membership"',
          description: 'Select "End Membership and Benefits".',
        },
        {
          title: 'Confirm cancellation',
          description: 'Amazon will show your refund eligibility and ask you to confirm. Click "End My Benefits" or "Continue to Cancel". Done — you will receive a confirmation email.',
        },
      ]} />

      <AlertBox type="info" title="Direct link">
        You can go directly to the cancellation page at: amazon.com/gp/primecentral (sign-in required).
        Click "Manage Membership" → "Update, cancel and more" → "End membership".
      </AlertBox>

      <SectionHeader number={2} title="Method 2 — Cancel on the Amazon Mobile App" />

      <VerticalSteps steps={[
        {
          title: 'Open the Amazon Shopping app',
          description: 'Open the Amazon app on your iPhone or Android device.',
        },
        {
          title: 'Tap the menu (three lines)',
          description: 'Tap the three-line menu icon in the bottom-right corner of the app.',
        },
        {
          title: 'Scroll down to "Account"',
          description: 'Scroll down and tap "Your Account".',
        },
        {
          title: 'Tap "Prime Membership"',
          description: 'Scroll to find "Prime Membership" under the account settings.',
        },
        {
          title: 'Tap "Manage Membership" → "End Membership"',
          description: 'Follow the same flow as desktop to confirm cancellation.',
        },
      ]} />

      <AlertBox type="warning" title="Cannot cancel via the iOS Amazon app">
        Due to Apple App Store rules, Amazon does not allow you to cancel a Prime subscription
        within the iOS app. Use the mobile browser (safari/chrome on iPhone) to go to amazon.com
        and cancel there, or use a desktop computer.
      </AlertBox>

      <SectionHeader number={3} title="Method 3 — Cancel by Phone" />

      <p>
        If you prefer to cancel by phone, call Amazon Customer Service at <strong>1-888-280-4331</strong>
        (US). Have your account email ready. Tell the representative you want to cancel your Prime
        membership. This method also works if you're having trouble cancelling online.
      </p>

      <SectionHeader number={4} title="Refund Eligibility — Will You Get Money Back?" />

      <CompareTable
        leftLabel="Scenario"
        rightLabel="Refund eligibility"
        rows={[
          { label: 'Cancelled within 3 days and used no benefits', left: 'Full refund', right: 'Full refund' },
          { label: 'Cancelled after 3 days, used no benefits', left: 'Partial prorated refund', right: 'Prorated for unused period' },
          { label: 'Used Prime benefits (shipping, Video, etc.)', left: 'No refund, access continues until billing period ends', right: 'No refund' },
          { label: 'Free trial cancellation', left: 'Free — no charge', right: 'Access ends immediately' },
          { label: 'Annual plan, never used benefits', left: 'Full refund likely', right: 'Contact customer service to confirm' },
        ]}
      />

      <QuickFact>If you used Prime benefits (free shipping, Prime Video, etc.) since your last billing date, Amazon considers the membership "used" and will not issue a refund for that period.</QuickFact>

      <SectionHeader number={5} title="What Happens After You Cancel?" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Prime Video access',
          description: 'Access ends immediately upon cancellation. Download any saved content before cancelling.',
        },
        {
          title: 'Free shipping',
          description: 'You lose Prime free 1-2 day shipping. Standard shipping rates apply to future orders.',
        },
        {
          title: 'Prime Reading / Music',
          description: 'Access to Prime Reading and Prime Music ends immediately.',
        },
        {
          title: 'Orders placed before cancellation',
          description: 'Existing orders with Prime shipping are not affected — they will still ship as promised.',
        },
        {
          title: 'Amazon Fresh / Whole Foods discounts',
          description: 'Amazon Fresh delivery and Whole Foods Prime discounts end immediately.',
        },
        {
          title: 'Re-joining',
          description: 'You can rejoin Prime at any time. Your account history and lists are preserved.',
        },
      ]} />

      <SectionHeader number={6} title="Alternatives to Cancelling" />

      <AlertBox type="tip" title="Consider pausing instead of cancelling">
        Amazon offers a "Pause membership" option. For $0/month you can pause Prime for up to
        3 months. Benefits pause; you can resume anytime. This is better than cancelling if you
        might rejoin.
      </AlertBox>

      <VerticalSteps steps={[
        {
          title: 'Pause your membership',
          description: 'On the Prime membership page, look for "Pause your membership". Available for monthly Prime members.',
        },
        {
          title: 'Switch to annual plan',
          description: 'Annual Prime ($139/year vs $14.99/month = $179.88/year) saves 22%. If cost is the concern, switch rather than cancel.',
        },
        {
          title: 'Share via Amazon Household',
          description: 'If someone else in your household has Prime, join their household and cancel yours. Amazon Household allows sharing benefits.',
        },
      ]} />

      <SectionHeader number={7} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'How do I cancel Amazon Prime if I signed up through Apple or Google?',
          answer: 'If you subscribed to Prime through Apple (iOS) or Google Play, you must cancel through that platform — not through Amazon. For Apple: Settings → [Your Name] → Subscriptions → Amazon Prime → Cancel. For Google: Google Play Store → Subscriptions → Amazon Prime → Cancel.',
        },
        {
          question: 'Will I get a refund when I cancel Amazon Prime?',
          answer: 'Refund eligibility depends on whether you used Prime benefits since your last billing date. If you cancelled within the first 3 days without using any benefits, you may get a full refund. After 3 days without using benefits, you may get a prorated refund. If you used any Prime benefit (Prime Video, free shipping, etc.) since your last charge, Amazon typically does not offer a refund.',
        },
        {
          question: 'Can I cancel my Amazon Prime free trial early?',
          answer: 'Yes. You can cancel a free trial at any time with no charge. If you cancel before the trial ends, you keep Prime access until the trial period is over. After that, you will not be charged.',
        },
        {
          question: 'Does cancelling Amazon Prime cancel any other subscriptions?',
          answer: 'Cancelling Prime membership does not cancel other Amazon subscriptions like Audible, Kindle Unlimited, Prime Video Channels (HBO, Paramount+, etc.), or Amazon Music Unlimited. These are separate subscriptions that must be cancelled independently.',
        },
        {
          question: 'Can I cancel Prime for someone else if I manage their account?',
          answer: 'You can cancel Prime if you have full access to the Amazon account (you know the password and can receive verification codes). Amazon Household members cannot cancel each other\'s Prime — only the account owner can cancel.',
        },
        {
          question: 'What if the "End Membership" button is missing?',
          answer: 'If you do not see the cancellation option, you may have subscribed through a third party (Apple, Google, or a TV provider like Roku or Fire TV). Check your subscriptions in those platforms. Alternatively, contact Amazon customer service at 1-888-280-4331 — they can cancel it for you regardless of how it was subscribed.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
