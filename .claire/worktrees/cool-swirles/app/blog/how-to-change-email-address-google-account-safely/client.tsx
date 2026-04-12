'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeGoogleEmailClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Email Address in Google Account Safely (2026)</h1>
      <p className="lead">
        Google does not allow you to change the @gmail.com email address of an existing account,
        but you can change your Google Account's primary "name" email, add alternate emails,
        or migrate to a new account safely. This guide explains every option and what you can
        and cannot change.
      </p>

      <StatGrid stats={[
        { value: 'Cannot', label: 'Change a @gmail.com address on existing account', color: 'red' },
        { value: 'Can', label: 'Add alternate emails as recovery addresses', color: 'green' },
        { value: 'Workspace', label: 'Only account type where email can be changed', color: 'blue' },
        { value: 'Safe', label: 'Migration process preserves all data', color: 'amber' },
      ]} />

      <AlertBox type="error" title="You cannot change a @gmail.com address">
        If your Google Account email ends in @gmail.com, Google does not allow you to change it.
        This is a Google policy and there is no workaround within an existing account.
        Your options are: (1) keep the old address, (2) create a new Gmail account, (3) use
        a non-Gmail address as your Google Account email (Google Workspace or custom email).
      </AlertBox>

      <SectionHeader number={1} title="What You CAN and CANNOT Change" />

      <CompareTable
        leftLabel="What you CAN change"
        rightLabel="What you CANNOT change"
        rows={[
          { label: 'Display name', left: 'Your public name on Google products — changeable anytime', right: 'Not applicable' },
          { label: 'Recovery email', left: 'Add or change the recovery email address', right: 'Not applicable' },
          { label: 'Recovery phone', left: 'Add or change recovery phone number', right: 'Not applicable' },
          { label: 'Gmail address (@gmail.com)', left: 'Not applicable', right: 'CANNOT be changed — Gmail address is permanent' },
          { label: 'Workspace email (@yourdomain.com)', left: 'Admins can change in Google Admin console', right: 'Not applicable' },
          { label: 'Account username', left: 'Changeable once every 3 months (recently)', right: 'Not applicable' },
        ]}
      />

      <SectionHeader number={2} title="Option 1 — Change Your Google Display Name" />

      <p>
        If you just want to change how your name appears (in Gmail, Google Meet, etc.) without
        changing the email address itself:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Go to myaccount.google.com',
          description: 'Open myaccount.google.com in a browser and sign in.',
        },
        {
          title: 'Click "Personal info"',
          description: 'Click "Personal info" in the left sidebar.',
        },
        {
          title: 'Click on your name',
          description: 'Under "Basic info", click on your current name.',
        },
        {
          title: 'Edit first and last name, click Save',
          description: 'Update your name and save. This changes how you appear to others across Google products.',
        },
      ]} />

      <SectionHeader number={3} title="Option 2 — Add a Recovery/Alternate Email" />

      <VerticalSteps steps={[
        {
          title: 'Go to myaccount.google.com → Personal info',
          description: 'Navigate to myaccount.google.com and click "Personal info".',
        },
        {
          title: 'Click "Email" under Contact info',
          description: 'Click on the email section to expand it.',
        },
        {
          title: 'Add an alternate email',
          description: 'Click "Add alternate email" or "Add recovery email". Enter the new email address.',
        },
        {
          title: 'Verify the alternate email',
          description: 'Google sends a verification link to the alternate email. Click the link to verify it.',
        },
      ]} />

      <SectionHeader number={4} title="Option 3 — Migrate to a New Gmail Account (Data Transfer)" />

      <p>
        If you want to fully use a new email address, the cleanest approach is to create a new
        Gmail account and migrate your important data from the old one.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Create a new Gmail account',
          description: 'Go to accounts.google.com/signup and create your new Gmail account with the desired username.',
        },
        {
          title: 'Export data from old account (Google Takeout)',
          description: 'Go to takeout.google.com on your old account. Select the services you want to export (Gmail, Drive, Contacts, Calendar). Download the archive.',
        },
        {
          title: 'Import contacts to new account',
          description: 'Go to contacts.google.com on your new account → Import → upload the contacts file from your Takeout archive.',
        },
        {
          title: 'Forward Gmail from old to new',
          description: 'In old Gmail: Settings → See all settings → Forwarding and POP/IMAP → Add a forwarding address (your new Gmail). Enable forwarding.',
        },
        {
          title: 'Set up "Send as" on new account',
          description: 'In new Gmail: Settings → Accounts → Send mail as → Add another email address. Add your old address so you can reply from the new account as the old one during transition.',
        },
        {
          title: 'Notify your contacts',
          description: 'Send an email to important contacts informing them of your new address.',
        },
      ]} />

      <SectionHeader number={5} title="Option 4 — Change Email for Google Workspace Account" />

      <AlertBox type="info" title="Google Workspace only">
        If your email is @yourcompany.com or any custom domain (not @gmail.com), you have a
        Google Workspace account. Workspace admins can change primary email addresses in the
        Google Admin console.
      </AlertBox>

      <VerticalSteps steps={[
        {
          title: 'Sign in to admin.google.com',
          description: 'Only Google Workspace admin accounts can make this change.',
        },
        {
          title: 'Go to Directory → Users',
          description: 'Find the user whose email you want to change.',
        },
        {
          title: 'Click the user → Edit user info → Primary email',
          description: 'Change the primary email address (username part of the domain).',
        },
        {
          title: 'Old address becomes an alias',
          description: 'The old email address automatically becomes an alias — the user still receives mail at both addresses.',
        },
      ]} />

      <SectionHeader number={6} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Can I change my Gmail address?',
          answer: 'No. Once you create a Gmail account with a specific @gmail.com address, that address is permanent and cannot be changed. Google does not provide a way to rename an existing Gmail account\'s email address. Your options are: keep the address, create a new Gmail account, or set up a custom domain email through Google Workspace.',
        },
        {
          question: 'What happens to my emails if I create a new Gmail account?',
          answer: 'Your existing emails stay in the old account. To access them in a new account, you can: (1) export them using Google Takeout and import into the new account; (2) set up email forwarding from old to new; (3) add both accounts to a Gmail app and switch between them. Google does not provide a direct import from one Gmail to another for regular (non-Workspace) accounts.',
        },
        {
          question: 'How do I change the recovery email on my Google Account?',
          answer: 'Go to myaccount.google.com → Security → Recovery email. Click the pencil/edit icon, enter your new recovery email, and verify it by clicking the link Google sends. The recovery email is used when you are locked out of your account — keep it up to date.',
        },
        {
          question: 'Can I use a non-Gmail email address as my Google Account email?',
          answer: 'Yes. When creating a new Google Account, you can click "Use my current email address instead" and enter any existing email address (Outlook, Yahoo, your own domain, etc.). This creates a Google Account that uses a non-Gmail email. However, this option is not available for changing an existing Gmail account.',
        },
        {
          question: 'What is Google Takeout and how do I use it?',
          answer: 'Google Takeout (takeout.google.com) is Google\'s data export tool. You select which services to export (Gmail, Drive, Photos, Contacts, Calendar, etc.) and Google prepares a downloadable archive of all your data. This is the official way to get a copy of your Google data for migration to a new account or as a backup.',
        },
        {
          question: 'If I change my Google username, does my email address change?',
          answer: 'Google allows very limited username changes (in some regions, once every 3 months for personal accounts). If the option is available on your account, go to myaccount.google.com → Personal info → Email → Edit. However, this changes your @gmail.com username and the old address may be released (becoming available to others), which can break existing email links. This feature is not available to all accounts.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
