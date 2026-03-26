'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeEmailAddressGoogleAccountSafelyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your Google Account Email Address Safely</h1>
      <p className="lead">
        You can change the email address (username) of your Google account — but there are
        important limitations to know first. This guide covers what can and can't be changed,
        how to do it safely, and how to handle Gmail addresses specifically.
      </p>

      <StatGrid stats={[
        { value: 'Gmail only', label: 'only @gmail.com addresses can be changed, not Google Workspace', color: 'amber' },
        { value: 'Data safe', label: 'all Google data stays intact after email change', color: 'green' },
        { value: 'Old email', label: 'remains reserved for you for 30 days', color: 'blue' },
        { value: '3 months', label: 'wait time before you can change again', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Gmail vs Google Workspace accounts">
        If your Google account uses a Gmail address (@gmail.com), you can change it.
        If you use a Google Workspace account (company email like name@company.com),
        only your administrator can change it — you cannot do it yourself.
      </AlertBox>

      <SectionHeader number={1} title="Change Google Account Email on Desktop" />
      <VerticalSteps steps={[
        { title: 'Go to myaccount.google.com', description: 'Sign in if prompted.' },
        { title: 'Click "Personal info"', description: 'In the left sidebar navigation.' },
        { title: 'Click your email address', description: 'Under the "Contact info" section.' },
        { title: 'Click "Edit" (pencil icon)', description: 'Next to your email address.' },
        { title: 'Enter new email address', description: 'Type your desired new Gmail username. Google will check availability.' },
        { title: 'Verify with password', description: 'Confirm your Google account password to authorize the change.' },
        { title: 'Confirm the change', description: 'Google will send a verification to your recovery email or phone. Confirm and the change takes effect.' },
      ]} />

      <SectionHeader number={2} title="Change on Android" />
      <VerticalSteps steps={[
        { title: 'Open Settings → Google', description: 'Tap your Google account name at the top.' },
        { title: 'Tap "Manage your Google Account"', description: 'Then go to the Personal info tab.' },
        { title: 'Tap your email address', description: 'Under Basic info → tap to edit.' },
        { title: 'Follow verification steps', description: 'Same as desktop — enter new address and verify.' },
      ]} />

      <SectionHeader number={3} title="Important Limitations" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Change frequency limit', description: 'You can only change your Gmail address once every 3 months. Plan carefully — you cannot immediately undo a change.' },
        { title: 'Old email reserved', description: 'After changing, your old Gmail address is reserved for 30 days. No one else can register it during this period. After 30 days, it may become available for others.' },
        { title: 'Third-party accounts', description: 'All services you signed up for with your old Gmail won\'t automatically update. You must manually update email in each service: banking, shopping, subscriptions, etc.' },
        { title: 'Google services update automatically', description: 'Gmail, Drive, Calendar, YouTube, Photos — all Google services instantly recognize the new address. No action needed within the Google ecosystem.' },
      ]} />

      <AlertBox type="tip" title="Alternative: Gmail alias">
        Instead of changing your email, consider adding a Gmail alias (Settings → Accounts →
        Add another email address). You can send and receive with multiple addresses without
        losing your primary account. This avoids the hassle of updating all services.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Will I lose my Gmail emails if I change my address?',
          answer: 'No — all your emails, contacts, Drive files, Photos, and everything in the Google ecosystem stays with your account. The email address is just a username. Your data is tied to your account, not your address. Everything continues to work seamlessly.',
        },
        {
          question: 'Can I change a Gmail address to a non-Gmail address?',
          answer: 'No — Google only allows changing your Gmail username within @gmail.com. You cannot change to a @yahoo.com or custom domain. For a different domain, you need Google Workspace or a completely separate account.',
        },
        {
          question: 'What happens to emails sent to my old Gmail address after I change it?',
          answer: 'For 30 days after changing, emails sent to your old address continue to arrive in your inbox. After 30 days, the old address is released and emails to it may bounce or go to whoever registers that address.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
