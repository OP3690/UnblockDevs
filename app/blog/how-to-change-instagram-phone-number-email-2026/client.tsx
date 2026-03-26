'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeInstagramPhoneNumberEmail2026Client() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your Instagram Phone Number or Email in 2026</h1>
      <p className="lead">
        Updating your Instagram contact info takes less than 2 minutes in the app. Whether you
        need to swap to a new phone number, update your email, or both — this guide has the
        exact steps for iOS and Android.
      </p>

      <StatGrid stats={[
        { value: '2 minutes', label: 'to update phone or email', color: 'green' },
        { value: 'Verification', label: 'code sent to confirm new contact info', color: 'blue' },
        { value: 'Both', label: 'phone AND email can be changed anytime', color: 'purple' },
        { value: 'Security', label: 'keep contact info current to protect your account', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Change Phone Number on Instagram (iOS & Android)" />
      <VerticalSteps steps={[
        { title: 'Open the Instagram app', description: 'Tap your profile icon (bottom right).' },
        { title: 'Tap the hamburger menu (☰)', description: 'Top right corner → Settings and privacy.' },
        { title: 'Tap "Accounts Center"', description: 'Then "Personal details".' },
        { title: 'Tap "Contact info"', description: 'You\'ll see your current email and phone number.' },
        { title: 'Tap "Phone number"', description: 'Tap the existing number or "Add phone number" to add/change.' },
        { title: 'Enter new number and verify', description: 'Instagram sends a 6-digit code to the new number via SMS. Enter the code to confirm.' },
      ]} />

      <SectionHeader number={2} title="Change Email Address on Instagram" />
      <VerticalSteps steps={[
        { title: 'Go to Profile → Settings and privacy → Accounts Center', description: 'Tap "Personal details" → "Contact info".' },
        { title: 'Tap "Email address"', description: 'Tap your current email or "Add email address".' },
        { title: 'Enter new email and verify', description: 'Instagram sends a verification link to the new email address. Click the link in the email to confirm.' },
        { title: 'Old email removed', description: 'Once you verify the new email, the old one can be removed from your account.' },
      ]} />

      <SectionHeader number={3} title="Change via Instagram Website" />
      <VerticalSteps steps={[
        { title: 'Go to instagram.com', description: 'Sign in → click your profile icon (top right).' },
        { title: 'Click "Edit profile"', description: 'Or go to Settings → Accounts Center → Personal details.' },
        { title: 'Update contact info', description: 'Same steps as mobile — verify with code or email link.' },
      ]} />

      <AlertBox type="tip" title="Keep both email and phone number updated">
        Instagram uses your email and phone number for account recovery. If you lose access to
        both, recovering a hacked or locked account becomes extremely difficult. Always keep at
        least one active, accessible contact method linked to your account.
      </AlertBox>

      <AlertBox type="warning" title="Instagram Accounts Center">
        Since Meta unified accounts (Instagram + Facebook), contact info is managed in
        "Accounts Center" — not the old Instagram Settings. If you see an old layout,
        update the app to the latest version.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Can I use the same phone number on multiple Instagram accounts?',
          answer: 'No — each Instagram account requires a unique phone number. You cannot link the same phone number to two different Instagram accounts. If you want multiple accounts, each needs its own phone number or email address.',
        },
        {
          question: 'What if I don\'t receive the verification SMS?',
          answer: 'Check that you entered the number with the correct country code. Wait 2-3 minutes and request the code again. If still not received: try "Call me instead" option for a voice call with the code, check if your carrier blocks short-code SMS, or use email verification instead.',
        },
        {
          question: 'Will changing my phone number affect my Instagram login?',
          answer: 'You can log in with email, username, or phone number. Changing your phone number updates one of those login options. Your username and password remain the same. Existing sessions (on other devices) are not affected.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
