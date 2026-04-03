'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeEmailAddressGoogleAccountSafelyClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="How to Change Your Google Account Email Address Safely"
      description="You can change the email address of your Google account — but there are important limitations. This guide covers what can and cannot be changed, how to do it safely, what happens to your data, and the best alternatives."
    >
      <h1>How to Change Your Google Account Email Address Safely</h1>
      <p className="lead">
        You can change the email address (username) of your Google account — but there are
        important limitations to know first. This guide covers what can and cannot be changed,
        how to do it safely, what happens to your data and third-party accounts, and the
        best alternative strategies if you cannot change your email directly.
        Understanding the rules before you start will save significant frustration.
      </p>

      <StatGrid stats={[
        { value: 'Gmail only', label: 'only @gmail.com addresses can be changed by users', color: 'amber' },
        { value: 'Data safe', label: 'all Google data stays intact after email change', color: 'green' },
        { value: '30 days', label: 'old email stays reserved for forwarding', color: 'blue' },
        { value: '3 months', label: 'wait time before you can change again', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Gmail vs Google Workspace accounts">
        If your Google account uses a Gmail address (@gmail.com), you CAN change the username.
        If you use a Google Workspace account (company or school email like name@company.com),
        only your domain administrator can change it — you cannot do it yourself as a regular user.
        Check which type you have before following these steps.
      </AlertBox>

      <SectionHeader number={1} title="Check If You Can Change Your Email" />
      <p>Before following the steps, confirm your account type and eligibility:</p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Personal Gmail (@gmail.com)', description: 'You CAN change the username/email through your Google Account settings. Limited to once every 3 months (90-day cooldown). The option appears in Personal Info → Contact info → Email.' },
        { title: 'Google Workspace (business/school)', description: 'You CANNOT change this yourself as a regular user. Contact your IT administrator or Google Workspace admin. They control email address changes for all organizational accounts.' },
        { title: 'Recently created account', description: 'Very new Gmail accounts (created in the last few days or weeks) may not show the email change option yet. This is a fraud-prevention measure. Wait a few weeks before trying if your account is brand new.' },
        { title: 'Previously changed in last 90 days', description: 'Google enforces a strict 90-day cooldown between email changes. If you changed your Gmail address recently, you must wait before changing again. The option will not appear if you are within the cooldown window.' },
      ]} />

      <SectionHeader number={2} title="Change Google Account Email on Desktop" />
      <VerticalSteps steps={[
        { title: 'Go to myaccount.google.com', desc: 'Open any browser and navigate to myaccount.google.com. Sign in with your current Google credentials if prompted. This is the central dashboard for all Google Account settings.' },
        { title: 'Click "Personal info" in the left sidebar', desc: 'This is where all your basic account information is managed — name, birthday, profile photo, and contact information including your email address.' },
        { title: 'Click your email address under "Contact info"', desc: 'You will see your current Gmail address displayed here. Click on it to open the email settings panel.' },
        { title: 'Click "Edit" (pencil icon)', desc: 'Next to your email address. If this option is not visible, your account type does not support self-service email changes (Workspace account) or you are within the 90-day cooldown.' },
        { title: 'Enter your desired new Gmail username', desc: 'Google immediately checks availability as you type. The new address must end in @gmail.com. Try variations with numbers, underscores, or periods if your first choice is taken.' },
        { title: 'Verify with your account password', desc: 'Confirm your current Google account password to authorize the change. This security step prevents unauthorized email changes.' },
        { title: 'Complete the verification', desc: 'Google may send a verification code to your recovery phone or email. Enter it to confirm the change takes effect immediately. Check your inbox or messages for the code.' },
      ]} />

      <SectionHeader number={3} title="Change on Android Phone" />
      <VerticalSteps steps={[
        { title: 'Open Settings → Google', desc: 'Tap your Google account name at the very top of the Settings app, or go to Settings → Google → Manage your Google Account.' },
        { title: 'Tap "Manage your Google Account"', desc: 'This opens the same account management interface as the web version at myaccount.google.com — you are accessing the same backend.' },
        { title: 'Go to the "Personal info" tab', desc: 'Swipe left or right to navigate to Personal info. This tab shows your basic account information.' },
        { title: 'Tap your email address under "Basic info"', desc: 'Tap the email field and then tap the edit option to change your Gmail username.' },
        { title: 'Follow the same verification steps', desc: 'Enter your desired username, verify availability, confirm with your password, and enter any verification code sent to your recovery contact.' },
      ]} />

      <SectionHeader number={4} title="Change on iPhone or iPad" />
      <VerticalSteps steps={[
        { title: 'Open the Gmail app', desc: 'Tap your profile photo in the top right corner of the Gmail app. Then tap "Manage your Google Account."' },
        { title: 'Navigate to Personal info', desc: 'Tap the "Personal info" tab at the top of the Account screen.' },
        { title: 'Tap your email address', desc: 'Under Contact info, tap your Gmail address to open editing options.' },
        { title: 'Follow the web-based flow', desc: 'The email change on iOS opens a web browser interface — follow the same steps as the desktop method. Enter the new username and complete verification.' },
      ]} />

      <SectionHeader number={5} title="Important Limitations and Rules" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Change frequency: once per 3 months', description: 'Google enforces a 90-day cooldown between email address changes. Plan carefully — if you change to a name you do not like, you are stuck with it for at least 3 months before changing again.' },
        { title: 'Old email reserved for 30 days', description: 'After changing, your old Gmail address is reserved exclusively for you for 30 days. During this period, no one else can register it. After 30 days, it becomes available for anyone to claim.' },
        { title: 'Old email forwards for 30 days', description: 'Emails sent to your old address continue arriving in your inbox throughout the 30-day reservation period. After 30 days, they will bounce or go to whoever claims the old address.' },
        { title: 'Username availability', description: 'Common first names and dictionary words are almost certainly taken. Google also rejects usernames too similar to existing accounts for impersonation prevention. Try adding numbers, periods, or year of birth.' },
        { title: 'Minimum 6 characters', description: 'Gmail usernames must be between 6 and 30 characters. Allowed: letters, numbers, and periods. Note: periods are ignored in Gmail — alice@gmail.com and a.l.i.c.e@gmail.com are identical and deliver to the same inbox.' },
        { title: 'Cannot change to non-Gmail', description: 'Google only allows changing the @gmail.com username part. You cannot change your Google account to use @yahoo.com, @outlook.com, or a custom domain through this method.' },
      ]} />

      <CompareTable
        leftLabel="What Works"
        rightLabel="What Does Not Work"
        rows={[
          { label: 'Account type', left: 'Personal @gmail.com accounts', right: 'Google Workspace / company / school accounts' },
          { label: 'Domain', left: 'Change within @gmail.com only', right: 'Cannot change to non-Gmail domain' },
          { label: 'Frequency', left: 'Once every 90 days', right: 'Cannot change if within 90-day cooldown' },
          { label: 'Availability', left: 'Any available, non-similar username', right: 'Taken names or names too similar to other accounts' },
          { label: 'New account age', left: 'Accounts older than a few weeks', right: 'Brand new accounts (fraud prevention hold)' },
        ]}
      />

      <SectionHeader number={6} title="What Happens to Your Data and Services" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Google services: automatic', description: 'Gmail, Drive, Photos, Calendar, YouTube, Google Maps, Play Store — all Google services instantly recognize the new address. You do not need to do anything within the Google ecosystem. All your data, history, and settings carry over automatically.' },
        { title: 'Third-party accounts: manual update needed', description: 'Every service you signed up for with your old Gmail address will not know about the change. You must manually update your email in each: bank accounts, Amazon, Netflix, Spotify, social media, airline accounts, and so on.' },
        { title: 'Newsletters and subscriptions', description: 'Email newsletters will not redirect automatically. Use the 30-day forwarding window to identify important senders, then go to each service and update your email address. Prioritize financial and banking contacts first.' },
        { title: '"Sign in with Google" on third-party sites', description: 'If you used "Sign in with Google" on any third-party site, your login there is tied to your Google Account identity — not the specific email address. These logins continue working without any action required after the email change.' },
        { title: 'Google Ads and AdSense', description: 'If you have Google Ads or AdSense accounts, they are linked to your Google Account ID, not your email address. They remain active. However, payment contacts and notification emails may need updating in those accounts specifically.' },
        { title: 'Contacts who emailed you before', description: 'Anyone who has previously emailed you at your old address will need to update their address book manually. They will not be notified of your address change by Google — you need to inform important contacts yourself.' },
      ]} />

      <AlertBox type="tip" title="Alternative: Gmail alias (add another email address)">
        Instead of changing your primary email, consider adding a Gmail alias. In Gmail Settings
        → Accounts → "Add another email address," you can send and receive mail as multiple addresses
        without changing your primary one. This keeps your existing account untouched while giving
        you a "new" address to share going forward. Incoming mail to the alias arrives in the same
        inbox. Perfect if your concern is sharing a professional-looking address.
      </AlertBox>

      <SectionHeader number={7} title="When You Cannot Change Your Email — Workarounds" />
      <p>
        If you are blocked from changing (Workspace account, within the 90-day cooldown,
        or the username you want is taken), here are practical alternatives:
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Create a new Gmail account', description: 'Start fresh with the username you want. Set up forwarding from the old account to the new one (Gmail Settings → Forwarding), and gradually update services to use the new address. Full migration takes time but gives you exactly the email you want.' },
        { title: 'Use Gmail plus addressing', description: 'Gmail ignores everything after + in an address: yourname+alias@gmail.com delivers to yourname@gmail.com. Use plus addresses for different services (yourname+amazon@gmail.com) and filter by them — useful for organization without changing your real address.' },
        { title: 'Custom domain with Google Workspace', description: 'For a truly professional email like you@yourdomain.com, Google Workspace lets you use any domain you own. The starter plan costs around $6/month per user. You keep Gmail as the interface while having your own domain as the address.' },
        { title: 'Email forwarding service', description: 'Services like ImprovMX or Cloudflare Email Routing let you create a custom domain email that forwards to your Gmail. The free tier supports basic forwarding. Use your branded email (you@yourdomain.com) publicly while keeping Gmail as the actual backend.' },
      ]} />

      <QuickFact color="amber" label="Pre-change checklist">
        Before changing your email: search your current Gmail inbox for "welcome" and "account" emails
        going back years to build a list of every service registered to your address. Prioritize updating:
        banking and financial accounts, government and healthcare records, work tools, then social media and
        shopping accounts. Use the 30-day forwarding window to catch anything you missed.
      </QuickFact>

      <SectionHeader number={8} title="After Changing Your Email — Checklist" />
      <VerticalSteps steps={[
        { title: 'Inform important contacts', desc: 'Send a brief email from your new address to key contacts — colleagues, family, friends — letting them know your email has changed. Include your new address clearly so they can update their address books.' },
        { title: 'Update financial and banking accounts', desc: 'Log in to every bank, brokerage, credit card, and payment service (PayPal, Venmo, etc.) and update the email address. These are the most important because financial alerts must reach you.' },
        { title: 'Update government and healthcare records', desc: 'Tax preparation software, healthcare portals, government benefits accounts, DMV, voter registration — any government service that contacts you via email.' },
        { title: 'Update subscription services', desc: 'Netflix, Spotify, Amazon, streaming services, news subscriptions. These are usually easy to update in account settings and are important for billing and account recovery.' },
        { title: 'Monitor the forwarding inbox', desc: 'During the 30-day forwarding window, watch for emails arriving from services you missed. When a forwarded email arrives, click through to that service and update your email address immediately.' },
        { title: 'Set up a "forwarding ended" auto-reply (optional)', desc: 'After 30 days when forwarding ends, consider creating an account at your old address (if it is still available) with an auto-reply directing senders to your new address. This is only possible if no one else has claimed it.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Will I lose my Gmail emails if I change my address?',
          answer: 'No — all your emails, contacts, Drive files, Photos, and everything in the Google ecosystem stays with your account. The email address is just a username identifier. Your data is tied to your Google Account identity, not the address string. Everything continues to work seamlessly with zero data loss.',
        },
        {
          question: 'Can I change a Gmail address to a non-Gmail address?',
          answer: 'No — Google only allows changing your Gmail username within the @gmail.com domain. You cannot change to @yahoo.com, @outlook.com, or a custom domain through account settings. For a custom domain email, you need Google Workspace ($6+/month) or a forwarding service like ImprovMX that routes a custom address to your existing Gmail.',
        },
        {
          question: 'What happens to emails sent to my old Gmail address after I change it?',
          answer: 'For 30 days after changing, emails sent to your old address continue arriving in your inbox — the old address is reserved exclusively for you during this period. After 30 days, the address is released. Emails sent to it will then either bounce (if unclaimed) or go to whoever registers the address. Inform your important contacts within this 30-day window.',
        },
        {
          question: 'Can I reclaim my old Gmail address if I change my mind?',
          answer: 'Within 30 days of changing, you can change back to your old address since it is reserved for you. After 30 days, the address may become available for public registration and you could permanently lose it to someone else. This is one reason to plan your new address carefully before committing — the 3-month cooldown and 30-day reservation exist to prevent impulsive changes.',
        },
        {
          question: 'Does changing my Gmail affect my YouTube channel?',
          answer: 'Your YouTube channel is linked to your Google Account identity, not the specific email address. After changing your Gmail, your YouTube channel remains completely intact with all subscribers, videos, playlists, and watch history. The channel may display your new email in some admin areas, but your public channel identity and URL are unaffected.',
        },
        {
          question: 'Will my Google Authenticator codes still work after changing my email?',
          answer: 'Yes — Google Authenticator TOTP codes are tied to the secret key (the QR code you scanned when setting up 2FA), not your email address. Changing your Gmail has no effect on any Google Authenticator codes for any service. However, if you use your Gmail address as the login for other sites, update those sites account settings to reflect your new email address.',
        },
        {
          question: 'How do I update Google Ads or AdSense after changing my Gmail?',
          answer: 'Google Ads and AdSense accounts are tied to your Google Account, so they remain linked automatically after the email change. However, billing contact information, invoice recipients, and notification email preferences within those products may still show your old address in their specific settings — log into each product separately and update any standalone email fields you find.',
        },
        {
          question: 'What if I cannot find the option to change my email in account settings?',
          answer: 'The most common reasons the option is missing: you have a Google Workspace account (admin must change it), you changed your email within the past 90 days (cooldown applies), your account is very new (fraud prevention hold), or you are in a region where the feature has not been enabled. Try accessing myaccount.google.com on a desktop browser for the most complete interface.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
