'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
  CompareTable, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelNetflixSubscriptionWithoutLosingWatchHistoryClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Netflix Without Losing Watch History — Complete Guide</h1>
      <p className="lead">
        Canceling Netflix is simple, and your watch history, ratings, profiles, and My List are all saved
        for 10 months after cancellation. You can reactivate at any time and pick up exactly where you left off.
        This guide walks through cancellation on every platform — desktop, iPhone, Android, and smart TVs —
        and covers what happens to your data, downloads, and whether you can get a refund.
      </p>

      <StatGrid stats={[
        { value: '10 months', label: 'Netflix saves all your data after cancellation', color: 'green' },
        { value: 'All profiles', label: 'saved and fully restored when you resubscribe', color: 'blue' },
        { value: 'End of period', label: 'access continues until your paid billing period ends', color: 'purple' },
        { value: 'No penalty', label: 'cancel and resubscribe freely at any time', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Happens to Your Data When You Cancel" />
      <p>
        The most common concern about canceling Netflix is losing watch history and profile preferences.
        Netflix handles this thoughtfully — everything is preserved for an extended window after cancellation.
      </p>
      <KeyPointsGrid items={[
        { title: 'Watch history preserved for 10 months', description: 'Netflix retains your complete viewing history — every title you\'ve watched — for 10 months after cancellation. Your "Continue Watching" progress on partially watched titles is also saved. Resubscribe within 10 months and you can resume exactly where you stopped.' },
        { title: 'All profiles saved', description: 'Every Netflix profile on your account — including names, avatars, language preferences, maturity ratings, and viewing history — is preserved for the 10-month window. Children\'s profiles with their settings are kept intact.' },
        { title: 'My List retained', description: 'Everything you added to My List across all profiles is saved. When you return, your curated list is waiting exactly as you left it.' },
        { title: 'Ratings and preferences', description: 'Thumbs up/down ratings and hidden content preferences are preserved. Netflix uses these to personalize recommendations when you return, so your personalization improves from where it was.' },
        { title: 'Downloads are deleted', description: 'The only data lost is downloaded content for offline viewing — these are deleted when your membership ends because downloading is a paid feature tied to an active subscription.' },
        { title: 'After 10 months', description: 'If you don\'t resubscribe within 10 months, Netflix permanently deletes all your account data. There is no way to recover it after this window closes.' },
      ]} />

      <SectionHeader number={2} title="Cancel on Desktop (netflix.com)" />
      <p>
        The desktop web method is the most reliable way to cancel for most users, regardless of how you subscribed.
      </p>
      <VerticalSteps steps={[
        { title: 'Go to netflix.com and sign in', desc: 'Open any web browser and navigate to netflix.com. If you\'re on a shared account, switch to the profile that has account management access (the main profile).' },
        { title: 'Click your profile icon (top right)', desc: 'Click your profile photo in the top right corner of the Netflix homepage. A dropdown menu appears with your profile options.' },
        { title: 'Select "Account"', desc: 'Click "Account" from the dropdown to open the Account management page. This is where all billing and subscription settings are controlled.' },
        { title: 'Click "Cancel Membership"', desc: 'In the "Membership & Billing" section at the top of the Account page, click "Cancel Membership." It may also appear as "Cancel Streaming Plan" depending on your region and plan type.' },
        { title: 'Click "Finish Cancellation"', desc: 'Netflix shows a confirmation screen listing what you\'ll lose access to. Click "Finish Cancellation" or "Complete Cancellation" to confirm. Your membership remains active until the end of the current billing period.' },
        { title: 'Check your email', desc: 'You\'ll receive a cancellation confirmation email showing your last day of access. Save this for reference.' },
      ]} />

      <SectionHeader number={3} title="Cancel on iPhone and iPad (iOS)" />
      <VerticalSteps steps={[
        { title: 'The Netflix app cannot cancel subscriptions on iOS', desc: 'Apple\'s guidelines prevent third-party apps from processing subscription cancellations for non-App Store purchases. If you didn\'t subscribe through the App Store, use netflix.com in Safari instead.' },
        { title: 'For direct Netflix subscriptions', desc: 'Open Safari on your iPhone → go to netflix.com → sign in → tap your profile icon → Account → Cancel Membership. This works on mobile browsers.' },
        { title: 'For Apple App Store subscriptions', desc: 'If you subscribed through Apple: open Settings → tap your name at the top → Subscriptions → Netflix → Cancel Subscription → confirm. This is required for App Store-billed Netflix.' },
        { title: 'How to tell which type you have', desc: 'Check your credit card statements. Charges from "Netflix" or "NETFLIX.COM" indicate a direct subscription. Charges from "Apple" indicate an App Store subscription.' },
      ]} />

      <SectionHeader number={4} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'Open the Netflix app', desc: 'Launch the Netflix app on your Android device and make sure you\'re on the main profile with account management access.' },
        { title: 'Tap your profile icon', desc: 'Tap the profile icon in the top right corner of the app.' },
        { title: 'Go to Account', desc: 'Tap "Account" to open account management settings.' },
        { title: 'Tap "Cancel Membership"', desc: 'Under the Membership & Billing section, tap Cancel Membership and follow the confirmation prompts.' },
        { title: 'For Google Play subscriptions', desc: 'If billed by Google: open Play Store → tap your profile icon → Payments & subscriptions → Subscriptions → Netflix → Cancel subscription → confirm.' },
      ]} />

      <SectionHeader number={5} title="Cancel on Smart TV or Streaming Device" />
      <KeyPointsGrid items={[
        { title: 'Netflix app on Smart TV', description: 'Navigate to Settings within the Netflix app on your TV → Account. This redirects to the Account management page where you can cancel. Alternatively, cancel from a web browser on your phone or computer — it cancels the account, not just the device.' },
        { title: 'Amazon Fire TV / Roku / Apple TV', description: 'Cancellation works the same way — open Netflix → Settings → Account. For Apple TV App Store subscriptions: go to Settings → [Apple ID] → Subscriptions → Netflix on any Apple device.' },
        { title: 'Gaming consoles (PS5, Xbox)', description: 'Open the Netflix app → Settings → Help → go to Account. Or cancel directly at netflix.com from another device. If you subscribed through PlayStation Store or Microsoft Store, cancel through those respective stores.' },
      ]} />

      <QuickFact color="green" label="Reactivation is instant">
        When you resubscribe to Netflix within the 10-month data retention window, all your profiles,
        watch history, My List, and ratings are restored automatically within seconds of reactivating.
        You don't need to do anything to recover your data — it just appears when you log back in.
      </QuickFact>

      <AlertBox type="tip" title="Access continues until your billing date">
        When you cancel, your Netflix membership remains fully active until the end of your current
        paid billing period. If you pay on the 15th and cancel on the 20th, you have access until the
        14th of the following month. Use this remaining time to finish shows before your access ends.
      </AlertBox>

      <SectionHeader number={6} title="Netflix Plans Compared — Before You Cancel" />
      <p>
        Before canceling entirely, consider whether downgrading to a cheaper plan makes more sense.
        Netflix offers multiple tiers at different price points.
      </p>
      <CompareTable
        leftLabel="Standard with Ads"
        rightLabel="Standard (No Ads)"
        rows={[
          { label: 'Monthly price', left: 'Lowest tier (~$7)', right: 'Mid tier (~$15)' },
          { label: 'Video quality', left: 'Full HD (1080p)', right: 'Full HD (1080p)' },
          { label: 'Simultaneous streams', left: '2 screens', right: '2 screens' },
          { label: 'Downloads', left: 'Not available', right: 'Available (up to 15)' },
          { label: 'Ads', left: 'Yes — 4-5 min per hour', right: 'No ads' },
          { label: 'Content availability', left: 'Some titles excluded', right: 'Full library' },
        ]}
      />

      <CompareTable
        leftLabel="Standard Plan"
        rightLabel="Premium Plan"
        rows={[
          { label: 'Monthly price', left: 'Mid tier (~$15)', right: 'Highest tier (~$23)' },
          { label: 'Video quality', left: '1080p Full HD', right: '4K Ultra HD + HDR' },
          { label: 'Audio', left: 'Stereo', right: 'Dolby Atmos' },
          { label: 'Simultaneous streams', left: '2 screens', right: '4 screens' },
          { label: 'Downloads', left: '15 devices', right: '6 devices' },
          { label: 'Extra member slots', left: '1 extra member add-on', right: '2 extra member add-ons' },
        ]}
      />

      <SectionHeader number={7} title="How to Export Your Watch History Before Canceling" />
      <p>
        Netflix lets you download a full CSV of your viewing activity as a personal record. This is optional
        since Netflix saves your data for 10 months, but useful if you want a permanent backup.
      </p>
      <CodeBlock language="text" filename="Steps to Download Netflix Viewing History">
{`1. Go to netflix.com and sign in
2. Click your profile icon → Account
3. Scroll down to the profile you want to export
4. Click "Viewing Activity"
5. On the Viewing Activity page, scroll to the bottom
6. Click "Download all" — saves as a .csv file
7. The file includes: Title, Date watched
   — for every episode and film you've streamed

Note: Do this for each profile separately if you
have multiple profiles on the account.`}
      </CodeBlock>

      <QuickFact color="blue" label="What the CSV contains">
        The Netflix viewing history export includes the title name, episode name (for series), and the date
        you watched it. It does not include watch time, progress, or ratings — those are only visible within
        your active Netflix account. Export before your 10-month retention window closes if you want a permanent record.
      </QuickFact>

      <SectionHeader number={8} title="Alternatives to Canceling Outright" />
      <KeyPointsGrid items={[
        { title: 'Pause membership (not available everywhere)', description: 'Netflix previously offered a membership pause in some regions. Check your Account page under "Membership & Billing" — if the option is available, you can pause for 1-3 months and your account is frozen with full data preservation.' },
        { title: 'Downgrade to the ad-supported plan', description: 'If cost is the reason you\'re canceling, the Standard with Ads plan is significantly cheaper. You keep all your profiles and watch history while cutting your monthly bill substantially.' },
        { title: 'Share the cost with household members', description: 'Netflix allows you to add extra members to a Standard or Premium plan at a reduced rate. Splitting costs with someone in the same household can halve your effective monthly spend.' },
        { title: 'Cancel and resubscribe seasonally', description: 'Many people cancel when nothing new interests them and resubscribe for a specific show or movie. Since your data is saved for 10 months and you can cancel any time, this is a completely valid cost-saving strategy.' },
      ]} />

      <AlertBox type="warning" title="Refund policy varies by region">
        Netflix generally does not offer prorated refunds in the US. However, EU and UK subscribers
        may have consumer rights to a refund within 14 days of renewal under the right of withdrawal.
        Subscribers in some other countries may also have local consumer protections. Contact Netflix
        support directly if you believe you qualify — the policy differs significantly by country.
      </AlertBox>

      <SectionHeader number={9} title="What Billing Looks Like After Cancellation" />
      <CompareTable
        leftLabel="Direct Netflix Billing"
        rightLabel="Third-Party Billing (Apple/Google/ISP)"
        rows={[
          { label: 'Where to cancel', left: 'netflix.com Account page', right: 'App Store / Play Store / ISP account' },
          { label: 'Refund requests', left: 'Contact Netflix support', right: 'Contact Apple/Google/ISP support' },
          { label: 'Cancellation confirmation', left: 'Email from Netflix', right: 'Email from billing platform' },
          { label: 'Billing date visibility', left: 'Account → Billing details', right: 'Check App Store/Play Store receipts' },
          { label: 'Payment method change', left: 'Account → Manage payment info', right: 'Update in Apple/Google/ISP settings' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Can I still watch Netflix after canceling?',
          answer: 'Yes — your membership remains active until the last day of your paid billing period. If you pay monthly on the 5th and cancel on the 10th, you can watch until the 4th of the following month. You are not cut off immediately after canceling. Netflix shows your cancellation date on your Account page so you know exactly when access ends.',
        },
        {
          question: 'How do I cancel Netflix and keep my watch history?',
          answer: 'Simply cancel normally — Netflix automatically retains all your data for 10 months from the cancellation date. There\'s nothing special you need to do to preserve your watch history. Your profiles, viewing history, ratings, and My List are all preserved automatically. Just resubscribe within 10 months and everything is restored instantly.',
        },
        {
          question: 'Why can\'t I cancel Netflix on my iPhone?',
          answer: 'If you subscribed through the Netflix website or Android, you cannot cancel through the iPhone app — use netflix.com in Safari instead. If you subscribed through the Apple App Store (you\'d see Apple charges on your card), you must cancel through Apple: iOS Settings → [Your Name] → Subscriptions → Netflix → Cancel Subscription.',
        },
        {
          question: 'Can I get a refund when I cancel Netflix?',
          answer: 'Netflix does not offer prorated refunds for unused portions of a billing period. You keep access until the end of the period you paid for. In some regions (particularly EU/UK due to consumer protection law), you may be eligible for a refund if you cancel shortly after renewal. Contact Netflix support if you believe you qualify — policies vary by country.',
        },
        {
          question: 'What happens to my Netflix profile if someone else is paying?',
          answer: 'If you\'re a member of a Netflix household managed by someone else, you don\'t control the subscription — the account owner does. If the account owner cancels, everyone loses access at the end of the billing period. Netflix no longer allows password sharing between separate households, so you\'d need to start your own subscription.',
        },
        {
          question: 'How do I export or download my Netflix watch history before canceling?',
          answer: 'Netflix allows you to download your viewing activity data. Go to Account → Profile → Viewing Activity → Download All on netflix.com. This gives you a CSV file of everything you\'ve watched with dates. You can do this before canceling as a personal record, but Netflix also retains the data for 10 months if you want to check it after resubscribing.',
        },
        {
          question: 'Can I cancel Netflix if I subscribed through my cable or internet provider?',
          answer: 'If Netflix was bundled with your cable/internet bill, you cannot cancel through Netflix directly — you need to contact your ISP or cable provider. Look for Netflix in your provider\'s add-on services and remove it there. Your Netflix account data is still preserved for 10 months even in this case.',
        },
        {
          question: 'Does canceling Netflix delete my account?',
          answer: 'No. Canceling your membership stops future billing and removes access to streaming content, but your Netflix account remains intact. Your email address, profiles, and all preferences are preserved for 10 months. You can log in at any time during that window to reactivate. Only after 10 months of inactivity does Netflix permanently delete account data.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
