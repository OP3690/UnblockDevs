'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeWhatsappNumberWithoutLosingChatsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your WhatsApp Number Without Losing Chats</h1>
      <p className="lead">
        WhatsApp has a built-in "Change Number" feature that migrates your account — including
        all chats, groups, and settings — to a new phone number. Your contacts can be notified
        automatically. This guide walks through every step.
      </p>

      <StatGrid stats={[
        { value: 'Chats migrate', label: 'all messages transfer to new number', color: 'green' },
        { value: 'Groups stay', label: 'you remain in all groups with new number', color: 'blue' },
        { value: 'Auto-notify', label: 'option to notify contacts automatically', color: 'purple' },
        { value: 'Both SIMs', label: 'need access to old AND new number', color: 'amber' },
      ]} />

      <AlertBox type="warning" title="You need both numbers active">
        The WhatsApp "Change Number" feature requires you to verify BOTH your old and new phone
        numbers during the process. Have both SIM cards available and able to receive SMS.
      </AlertBox>

      <SectionHeader number={1} title="Change Number via WhatsApp Built-in Feature" />
      <VerticalSteps steps={[
        { title: 'Back up your chats first', description: 'Settings → Chats → Chat Backup → Back Up Now. This creates a local + iCloud/Google Drive backup before any changes.' },
        { title: 'Open WhatsApp Settings', description: 'Tap Settings (bottom right on iOS, three dots on Android).' },
        { title: 'Go to Account → Change Number', description: 'Tap "Account" → then "Change Number".' },
        { title: 'Read and tap "Next"', description: 'WhatsApp explains the process. Tap Next to continue.' },
        { title: 'Enter old number', description: 'Enter your current (old) number with country code.' },
        { title: 'Enter new number', description: 'Enter the new phone number with country code. Tap Done.' },
        { title: 'Verify new number', description: 'WhatsApp sends a 6-digit code to the new number. Enter it.' },
        { title: 'Choose who to notify', description: 'Select: All contacts, Contacts in common, or no one. WhatsApp sends a message from your old number informing contacts of the change.' },
        { title: 'Verify old number', description: 'Confirm you want to move the account away from the old number.' },
      ]} />

      <SectionHeader number={2} title="What Transfers to New Number" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Migrated automatically', description: 'All chat history, media, voice messages, group memberships, starred messages, broadcast lists, WhatsApp Business settings (if applicable).' },
        { title: 'Not migrated', description: 'Disappearing messages (by design), status updates history, WhatsApp Pay settings (need to re-register payment).' },
        { title: 'Groups', description: 'You remain in all groups with the new number. Group admins and members see the number change but the account is the same.' },
        { title: 'Contacts\' view', description: 'Contacts who receive the notification will see "X changed their number. Tap to message them at their new number." Your name and profile photo stay the same.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What happens to my old WhatsApp number after I change it?',
          answer: 'The old WhatsApp account is deleted from the old number. Anyone messaging the old number will get a delivery failure (number no longer has WhatsApp). The new number takes over your entire account identity.',
        },
        {
          question: 'Can I change WhatsApp number without the old SIM?',
          answer: 'The built-in Change Number feature requires verification of both numbers. Without the old SIM, you can\'t use the official method. Alternative: Delete WhatsApp, install fresh on the new number, and restore from cloud backup. However, this creates a new account and doesn\'t notify contacts or migrate group memberships automatically.',
        },
        {
          question: 'Do I need WhatsApp installed on the new number\'s device first?',
          answer: 'No — the Change Number feature works on your current device. You just need to be able to receive an SMS on the new number (have the new SIM in another device or the same device with dual SIM). You don\'t need WhatsApp installed on the new number first.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
