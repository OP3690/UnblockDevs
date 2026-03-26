'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangePhoneNumberTelegramWithoutNotifyingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your Telegram Phone Number Without Notifying Contacts</h1>
      <p className="lead">
        Telegram lets you change your account's phone number while keeping all your chats, groups,
        contacts, and media. The change is not announced to your contacts — they won't get a
        notification. This guide explains the exact steps and what does and doesn't notify people.
      </p>

      <StatGrid stats={[
        { value: 'Chats kept', label: 'all messages and media preserved', color: 'green' },
        { value: 'No notification', label: 'contacts are NOT automatically notified', color: 'blue' },
        { value: 'Username stays', label: 'your @username is unchanged', color: 'purple' },
        { value: '2 steps', label: 'verify old number + verify new number', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Change Phone Number on Telegram" />
      <VerticalSteps steps={[
        { title: 'Open Telegram app', description: 'Tap the hamburger menu (☰) on iOS or tap the three lines on Android.' },
        { title: 'Go to Settings', description: 'Tap "Settings" from the menu.' },
        { title: 'Tap your phone number', description: 'Under the Edit Profile section, tap the phone number shown.' },
        { title: 'Tap "Change Number"', description: 'A prompt appears explaining what will be migrated.' },
        { title: 'Enter your new phone number', description: 'Include country code (e.g., +1 for US). Tap "Next".' },
        { title: 'Verify new number', description: 'Telegram sends a code to the new number via SMS. Enter the code.' },
        { title: 'Verify old number (if required)', description: 'Telegram may ask you to confirm by sending a code to your old number as a security step.' },
        { title: 'Done', description: 'Your account is now linked to the new number. All chats, groups, and channels are preserved.' },
      ]} />

      <SectionHeader number={2} title="What Stays the Same vs What Changes" />
      <KeyPointsGrid columns={2} items={[
        { title: 'What stays the same', description: 'All chats (private, group, channels), message history, media files, your @username, profile name and photo, group admin status, bot subscriptions.' },
        { title: 'What changes', description: 'The phone number linked to your account. Contacts who saved your old number won\'t find you by number search anymore — only by @username.' },
        { title: 'Contacts with old number', description: 'People who have your old number saved will see your name in chats but won\'t know your new number unless you tell them. No automatic notification is sent.' },
        { title: 'Contacts with new number', description: 'People who already have your new number saved will see your Telegram account linked to their contact. Telegram syncs contacts automatically.' },
      ]} />

      <AlertBox type="tip" title="Do you need your old number?">
        You need access to your old number only if Telegram asks you to verify it as a security
        step (not always required). If you no longer have the old number, you can still proceed —
        Telegram will send the verification only to the new number.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Will my contacts see that I changed my Telegram number?',
          answer: 'Contacts do NOT receive a notification that your number changed. However, contacts who sync Telegram with their phonebook may see your account linked to the new number if they already saved it. Your existing chat history with contacts is unaffected — they can still message you.',
        },
        {
          question: 'What if I can\'t receive SMS on the new number?',
          answer: 'Telegram offers a "Flash call" option — a phone call where the code is embedded in the incoming number. You can also try "Request another code" to switch between SMS and call delivery. If neither works, the number may need to be active and able to receive international SMS.',
        },
        {
          question: 'Can I use a VoIP number for Telegram?',
          answer: 'Telegram often rejects VoIP numbers (Google Voice, Skype numbers, etc.) for account verification. Physical SIM numbers from real carriers work reliably. Some countries\' virtual numbers work — try it and see, but don\'t rely on VoIP numbers for your primary Telegram account.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
