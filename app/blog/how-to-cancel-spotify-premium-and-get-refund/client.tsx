'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelSpotifyPremiumAndGetRefundClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Spotify Premium and Get a Refund — All Platforms</h1>
      <p className="lead">
        Canceling Spotify Premium keeps your account active until the billing period ends —
        you don't lose access immediately. This guide covers all cancellation methods across
        desktop, mobile, and the app stores, explains exactly when and how to request a refund
        if you were charged unexpectedly, and clarifies what happens to your music library after cancellation.
        Whether you subscribed through Spotify directly, Apple App Store, or Google Play, this guide
        has the exact steps for your situation.
      </p>

      <StatGrid stats={[
        { value: 'Active until', label: 'end of billing period after canceling', color: 'green' },
        { value: 'Free tier', label: 'you keep your Spotify account with ads', color: 'blue' },
        { value: 'Playlists', label: 'all playlists and saved music stay on your account', color: 'purple' },
        { value: '30 days', label: 'typical refund window for unexpected charges', color: 'amber' },
      ]} />

      <AlertBox type="tip" title="Where you subscribed determines how you cancel">
        The cancellation method depends on where you originally subscribed. If you signed up at
        Spotify.com directly, cancel at spotify.com. If you subscribed through Apple App Store,
        cancel through iOS Settings. If through Google Play, cancel through Google Play Store.
        Spotify cannot cancel App Store or Play Store subscriptions — each store controls its own billing.
        If you're unsure where you subscribed, go to Spotify Account page and check "Your plan" — it will
        show the billing source.
      </AlertBox>

      <SectionHeader number={1} title="Cancel on Desktop or Web Browser" />
      <p>
        The web cancellation method works from any computer or mobile browser and is the most
        straightforward path if you subscribed directly through Spotify. This method works on
        Windows, Mac, Linux, Chromebook, and any mobile browser.
      </p>
      <VerticalSteps steps={[
        { title: 'Go to spotify.com and sign in', desc: 'Visit spotify.com in any browser. Click your profile photo or name in the top right corner and select "Account" from the dropdown menu. Make sure you are signed into the correct account — if you have multiple Spotify accounts, verify you are on the one with the Premium subscription.' },
        { title: 'Navigate to your plan', desc: 'On the Account Overview page, look for the "Your plan" section. Click "Manage your plan" or "Change plan" to access subscription management. You will see your current plan type, billing amount, and next renewal date.' },
        { title: 'Scroll to "Cancel Premium"', desc: 'Below your current plan details and any available plan options, you\'ll find the cancellation link. It may be labeled "Cancel Premium" or "Cancel subscription." Scroll past any promotional offers Spotify shows at this stage.' },
        { title: 'Work through the retention flow', desc: 'Spotify will show you retention offers — discounted months, pausing options, or downgrade alternatives. Review these offers but continue to cancel if they don\'t meet your needs. Click through each screen to decline the offers. Spotify may show 1–3 separate offer screens before reaching the final cancel button.' },
        { title: 'Confirm cancellation', desc: 'Click the final confirmation button. You\'ll see a confirmation screen showing when your Premium access ends (the last day of the current billing period). A confirmation email is sent to your registered address — save this for your records in case you need to request a refund or verify the cancellation.' },
        { title: 'Verify cancellation in account settings', desc: 'Return to Account → Your plan. The plan section should now show "Free" or indicate your Premium access end date. If it still shows Premium with no end date mentioned, the cancellation may not have completed — repeat the process.' },
      ]} />

      <SectionHeader number={2} title="Cancel on iPhone and iPad (iOS)" />
      <p>
        iOS users who subscribed through the App Store must cancel through Apple's subscription
        management system — Spotify cannot access or cancel Apple-billed subscriptions. If you
        originally subscribed at Spotify.com, cancel there even if you primarily use the iOS app.
      </p>
      <VerticalSteps steps={[
        { title: 'Identify where you subscribed', desc: 'If you signed up at spotify.com, cancel there (the iOS app cannot cancel direct Spotify subscriptions). To confirm: open Spotify app → Settings gear → Account → Subscription. If it shows "Apple" or "iTunes" as billing source, use the iOS Settings method below.' },
        { title: 'Open iOS Settings', desc: 'Tap Settings → [Your Name] at the top (your Apple ID) → Subscriptions. This shows all active App Store subscriptions, including Spotify if you subscribed through Apple.' },
        { title: 'Find Spotify in your subscriptions', desc: 'Scroll through the list to find Spotify Premium. Tap it to open the subscription details. You\'ll see your current plan, billing amount, next renewal date, and billing history.' },
        { title: 'Tap "Cancel Subscription"', desc: 'Scroll to the bottom of the Spotify subscription screen and tap "Cancel Subscription." Confirm when prompted. Your Premium access continues until the next billing date. Apple will send a confirmation email to your Apple ID email address.' },
        { title: 'Verify in App Store subscriptions', desc: 'Return to Settings → [Your Name] → Subscriptions → Spotify. The subscription should now show a renewal date in the past or be listed under "Expired Subscriptions." If still showing as active with no expiry, repeat the cancellation.' },
      ]} />

      <SectionHeader number={3} title="Cancel on Android" />
      <VerticalSteps steps={[
        { title: 'Identify where you subscribed', desc: 'Open the Spotify app → Home → Settings gear → Account → Subscription. This shows whether you\'re billed by Spotify directly or by Google Play. The billing source is clearly labeled.' },
        { title: 'Cancel through Google Play (if billed by Google)', desc: 'Open the Google Play Store → tap your profile photo in the top right → Payments & subscriptions → Subscriptions → find Spotify in the list → tap it → Cancel subscription → follow the prompts and confirm. Google sends an email confirmation.' },
        { title: 'Cancel through Spotify website (if billed by Spotify)', desc: 'Open Chrome on your Android device, visit spotify.com, log in, go to Account → Manage plan → Cancel Premium. The Android Spotify app may also show a cancellation option under Settings → Account for directly billed subscriptions.' },
        { title: 'Verify cancellation', desc: 'Check your Google Play subscriptions or Spotify account page. The subscription should show an end date. Without an end date displayed, the cancellation is not confirmed. Check both locations to be sure.' },
      ]} />

      <SectionHeader number={4} title="Cancel Spotify Family Plan" />
      <KeyPointsGrid items={[
        { title: 'If you\'re the plan owner', description: 'Only the plan owner (the person paying) can cancel the family plan. Cancel at spotify.com → Account → Manage plan → Cancel Premium. All family members lose Premium access at the end of the billing period. Family members receive no advance notification of the owner\'s cancellation.' },
        { title: 'If you\'re a family member', description: 'Family members cannot cancel the plan independently. Contact the plan owner to cancel or to remove you from the family group. The owner can remove members at Account → Family → Manage members. Removed members immediately drop to Spotify Free.' },
        { title: 'Removing yourself from a family plan', description: 'If you want to leave a family plan without canceling it, the plan owner must remove you. You can then subscribe independently at the individual rate ($10.99/month standard). There\'s no self-removal option for family members — only the owner can manage the membership list.' },
        { title: 'Switching from Family to Individual', description: 'If you\'re the plan owner and want to switch to individual rather than cancel entirely, go to Account → Change plan → Individual. This cancels the family plan and switches you to a solo subscription without losing your listening history or playlists.' },
      ]} />

      <SectionHeader number={5} title="Platform-by-Platform Cancellation Comparison" />
      <CompareTable
        leftLabel="Direct Spotify Subscription"
        rightLabel="App Store / Google Play Subscription"
        rows={[
          { label: 'Where to cancel', left: 'spotify.com → Account → Manage plan', right: 'iOS Settings → Apple ID → Subscriptions OR Google Play → Payments → Subscriptions' },
          { label: 'Can Spotify cancel for you?', left: 'Yes — Spotify controls billing directly', right: 'No — only the respective store can cancel store-billed subscriptions' },
          { label: 'Refund process', left: 'Contact Spotify Support within 30 days', right: 'Contact Apple (reportaproblem.apple.com) or Google Play support' },
          { label: 'Confirmation', left: 'Confirmation email from Spotify', right: 'Confirmation email from Apple or Google' },
          { label: 'Access after cancel', left: 'Until end of current billing period', right: 'Until end of current billing period' },
          { label: 'Reinstatement', left: 'Resubscribe at spotify.com', right: 'Resubscribe through the same store' },
        ]}
      />

      <SectionHeader number={6} title="How to Get a Refund" />
      <p>
        Spotify's refund policy is more flexible than many subscription services, particularly for
        unexpected charges or unintentional trial-to-paid conversions. Acting within the first 30 days
        of a charge significantly improves refund chances. Here is a breakdown of each refund scenario.
      </p>
      <KeyPointsGrid items={[
        { title: 'Unexpected charge refund', description: 'Contact Spotify Support at support.spotify.com within 30 days of the charge. Use the chat or support request form and explain you were charged unexpectedly. Mention if this is your first Premium subscription or your first charge after a trial. First-time refund requests are generally approved without lengthy dispute.' },
        { title: 'Trial conversion refund', description: 'If a free trial converted to a paid subscription and you didn\'t intend it or forgot to cancel, contact Spotify support immediately after the charge appears. Most regions allow a refund on the first post-trial charge if you contact support promptly and haven\'t heavily used offline downloads.' },
        { title: 'Apple App Store refunds', description: 'If Spotify charged you through Apple, request the refund from Apple directly at reportaproblem.apple.com. Find the Spotify charge and select "I didn\'t intend to buy this" or "This was charged to me without my authorization." Spotify cannot process refunds for App Store charges — Apple controls all billing.' },
        { title: 'Google Play refunds', description: 'For Google Play-billed Spotify charges, go to support.google.com/googleplay and find the refund request option. Google grants refunds for app subscriptions within 48 hours of the charge for the current billing period. After 48 hours, contact Google Play support directly through live chat or the help center.' },
        { title: 'What Spotify won\'t refund', description: 'Spotify typically declines refunds for: charges older than 30 days, second or subsequent refund requests on the same account, and situations where Premium features were clearly used (many offline downloads, high usage). The policy exists to prevent abuse while accommodating genuine mistakes.' },
        { title: 'Chargebacks and bank disputes', description: 'As a last resort for legitimate billing errors, you can dispute the charge with your bank or credit card issuer. However, initiating a chargeback will typically result in Spotify permanently disabling your account. Use this only for genuine fraud — not as a workaround to get a refund Spotify declined.' },
      ]} />

      <CodeBlock language="text" filename="Spotify Support Contact Flow">
{`Spotify Refund Request — Step by Step

1. Visit: support.spotify.com
2. Click "Contact us" or use the chat bubble
3. Select: Account > Billing and payments > Refund
4. In the chat or form, provide:
   - Your account email
   - Date of the charge
   - Amount charged
   - Reason: "Unexpected charge" / "Trial converted without notice"

For App Store charges:
   → Go to reportaproblem.apple.com instead
   → Sign in with Apple ID that was charged
   → Find the Spotify charge → Request a refund

For Google Play charges:
   → support.google.com/googleplay/answer/2479637
   → Or: Open Play Store → Profile → Payments → View all orders
   → Find the Spotify order → Report a problem`}
      </CodeBlock>

      <QuickFact color="green" label="Your music library stays intact">
        After canceling, your account becomes Spotify Free. All playlists, saved albums, liked songs,
        followed podcasts, and followed artists are preserved permanently. Offline downloads are deleted
        (offline listening is a Premium feature), but everything that was streamed online remains in
        your library. You can re-subscribe at any time and your library will be exactly as you left it.
      </QuickFact>

      <SectionHeader number={7} title="What Happens to Your Account After Canceling" />
      <CompareTable
        leftLabel="During Premium (before cancel date)"
        rightLabel="After Premium Ends (Free tier)"
        rows={[
          { label: 'Playlists & liked songs', left: 'Full access, sync across devices', right: 'Fully preserved — all playlists and liked songs remain' },
          { label: 'Offline downloads', left: 'Available — sync for offline play', right: 'Deleted — offline is Premium only' },
          { label: 'Audio quality', left: 'Up to 320kbps (Very High)', right: 'Capped at 128kbps on free' },
          { label: 'Mobile playback', left: 'Full on-demand in any order', right: 'Shuffle-only in most playlists on mobile' },
          { label: 'Desktop playback', left: 'Full on-demand', right: 'Full on-demand (desktop free is more permissive)' },
          { label: 'Ads', left: 'No ads', right: 'Audio and visual ads between songs' },
          { label: 'Skips', left: 'Unlimited skips', right: '6 skips per hour on free mobile' },
          { label: 'Podcasts', left: 'Full access, download supported', right: 'Streaming only, no download' },
        ]}
      />

      <SectionHeader number={8} title="Alternatives to Canceling" />
      <KeyPointsGrid items={[
        { title: 'Pause your subscription', description: 'Spotify allows pausing Premium for 1–3 months in some regions. This stops billing temporarily while preserving your account status. Go to Account → Pause subscription. Availability varies by country and subscription type. Pausing is ideal if you want a break but plan to return.' },
        { title: 'Downgrade to Individual from Family', description: 'If you\'re paying for a family plan you\'re not using fully, switching to an individual plan at $10.99/month vs $17.99/month saves $7/month without losing any Premium features for yourself. Other family members lose Premium if you downgrade the plan.' },
        { title: 'Switch to Student plan', description: 'If you\'re a student, Spotify Student at $5.99/month is roughly half the standard price. You can switch without canceling — go to Account → Change plan → Student. Requires verification through SheerID. Spotify periodically re-verifies student status.' },
        { title: 'Wait for promotional offers', description: 'After you cancel, Spotify typically emails 3 months of Premium at 99 cents as a win-back offer within 30–60 days. If you\'re price-sensitive, canceling and waiting for the offer can save significant money — you just have to tolerate the Free tier temporarily.' },
        { title: 'Switch to an annual plan', description: 'If you\'re canceling due to cost, switching to the annual plan (paid upfront) saves about 2 months compared to monthly billing — roughly $22/year savings. Go to Account → Change plan → Premium (Annual). This commits you for a year but reduces the effective monthly cost.' },
      ]} />

      <AlertBox type="warning" title="Don't confuse logging out with canceling">
        Logging out of the Spotify app, uninstalling the app, or deleting the app from your device
        does NOT cancel your subscription. Billing continues until you explicitly cancel through the
        correct platform (spotify.com, Apple Settings, or Google Play). Many users discover unexpected
        charges months later because they assumed deleting the app canceled the subscription.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What happens to my music after I cancel Spotify Premium?',
          answer: 'Your playlists, saved albums, podcasts, and followed artists are all retained on your free Spotify account permanently. Downloaded songs for offline listening are deleted because offline downloads are a Premium-only feature. On mobile (free tier), you\'re limited to shuffle-only playback in most of the library. Desktop remains on-demand. Audio quality drops to 128kbps on free vs. up to 320kbps on Premium.',
        },
        {
          question: 'Can I cancel Spotify mid-month and get a partial refund?',
          answer: 'Spotify does not offer pro-rated partial refunds for the unused portion of a billing period. When you cancel, your Premium access continues until the end of the paid period — you paid for the month, you get the month. The only exception is if Spotify has billing errors or you request a refund within 30 days of an unexpected charge, in which case they may refund the full month.',
        },
        {
          question: 'Can I cancel Spotify Premium and keep the family plan discount?',
          answer: 'If you\'re the family plan owner and cancel, all family members lose Premium at the end of the billing period. If you\'re a family member (not the owner), you can\'t cancel independently — the plan owner must remove you or cancel the plan entirely. There is no option to convert from a family plan to individual without canceling and resubscribing separately.',
        },
        {
          question: 'How do I cancel Spotify if I can\'t find the cancel button?',
          answer: 'If the cancel button isn\'t visible in your Account settings, it usually means either: (1) you\'re subscribed through Apple or Google Play (cancel through those stores instead), (2) you\'re on a promotional or discounted plan that has different cancellation terms, or (3) you\'re logged into a different account than the one with the subscription. Try logging out and back in, or contact Spotify support chat at support.spotify.com.',
        },
        {
          question: 'How do I cancel Spotify Student discount?',
          answer: 'Spotify Student is a type of Premium plan, not a separate product. Cancel it the same way as standard Premium: spotify.com → Account → Cancel Premium. Note that Spotify periodically re-verifies student eligibility — if you\'re no longer a student, your price will automatically increase to standard Premium rate at your next renewal even if you don\'t cancel.',
        },
        {
          question: 'What\'s the fastest way to cancel Spotify?',
          answer: 'The fastest method for direct Spotify subscriptions: visit spotify.com/account in any browser, click "Change plan," scroll to the bottom and click "Cancel Premium," and confirm. The entire process takes under 2 minutes. For App Store subscriptions: iOS Settings → Apple ID → Subscriptions → Spotify → Cancel. For Google Play: Play Store → Profile → Payments & subscriptions → Subscriptions → Spotify → Cancel.',
        },
        {
          question: 'Will Spotify send me win-back offers after I cancel?',
          answer: 'Yes — Spotify actively uses win-back campaigns. Expect promotional emails within 2–8 weeks of canceling offering discounted plans, often 3 months of Premium for $0.99–$2.99 total. These offers are sent to the email address on your account. If you\'re canceling primarily due to cost, this strategy — cancel then wait for the offer — can be highly effective for getting discounted access.',
        },
        {
          question: 'Does canceling Spotify affect my Spotify for Artists account?',
          answer: 'No — Spotify for Artists is a separate dashboard used by music creators to manage their artist profile and view streaming analytics. It is not connected to your personal Premium subscription. You can cancel your personal Premium subscription while maintaining full access to your Spotify for Artists account, as long as you have a valid Spotify account (Free is sufficient for artists).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
