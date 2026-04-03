'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeWhatsappPrivacySettingsMaximumSecurityClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>WhatsApp Privacy Settings for Maximum Security — Complete 2026 Guide</h1>
      <p className="lead">
        WhatsApp has over 15 privacy and security settings that most users never configure.
        From hiding your last seen status to blocking screenshot sharing in chats, locking
        individual conversations, and encrypting your cloud backups — these settings dramatically
        reduce your digital footprint and protect your account from unauthorized access.
        This guide covers every setting for maximum privacy in 2026.
      </p>

      <StatGrid stats={[
        { value: '15+', label: 'privacy and security settings available in WhatsApp', color: 'blue' },
        { value: 'End-to-end', label: 'encryption on all messages and calls by default', color: 'green' },
        { value: 'Chat Lock', label: 'extra biometric lock layer for sensitive conversations', color: 'purple' },
        { value: 'Advanced mode', label: 'hides your IP address in calls from other parties', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="How to Access WhatsApp Privacy Settings" />
      <VerticalSteps steps={[
        { title: 'Open WhatsApp', desc: 'Launch the WhatsApp app on your phone.' },
        { title: 'Open Settings', desc: 'On iPhone: tap the Settings icon (gear) at the bottom right. On Android: tap the three-dot menu (⋮) at the top right of the main chat screen, then tap Settings.' },
        { title: 'Tap Account → Privacy', desc: 'Navigate to Settings → Account → Privacy to reach the main privacy settings panel. Some settings (like two-step verification) are at Settings → Account level.' },
        { title: 'Review each section', desc: 'Work through each privacy section as described below. Changes take effect immediately — no save button required.' },
      ]} />

      <SectionHeader number={2} title="Visibility Settings — Who Can See Your Information" />
      <p>
        These settings control what information is visible to other WhatsApp users, including people
        who have your phone number in their contacts but who you've never messaged.
      </p>
      <KeyPointsGrid items={[
        { title: 'Last Seen & Online status', description: 'Set Last Seen to "Nobody" to hide when you were last active. Set Online to "Same as Last Seen" (or "Nobody") to prevent others from seeing when you\'re currently in the app. Trade-off: hiding your Last Seen means you also can\'t see others\' Last Seen timestamps.' },
        { title: 'Profile Photo', description: 'Set to "My Contacts" to show your photo only to saved contacts, or "Nobody" for complete privacy from unknown numbers. Use "My Contacts Except" to exclude specific contacts (useful for professional contacts who shouldn\'t see personal photos).' },
        { title: 'About (Bio)', description: 'Set to "Nobody" to hide your bio/status text. Few situations require strangers to see your bio, and it can reveal personal information to unknown numbers that message you.' },
        { title: 'Status Updates', description: 'Status updates (WhatsApp Stories equivalent) are visible to all contacts by default. Set to "My Contacts" to limit visibility, or use "My Contacts Except" for fine-grained control. You can also enable status updates for specific contacts only.' },
      ]} />

      <SectionHeader number={3} title="Groups and Call Privacy Settings" />
      <KeyPointsGrid items={[
        { title: 'Who can add me to groups', description: 'Change from "Everyone" to "My Contacts" or "My Contacts Except" to prevent being added to spam groups, scam investment groups, and other unwanted group chats. When someone not in your contacts tries to add you, they can only send an invitation link instead of adding you directly.' },
        { title: 'Default Message Timer', description: 'Set disappearing messages as the default for all new chats. Go to Privacy → Default Message Timer and choose 24 hours, 7 days, or 90 days. Messages in new conversations will automatically disappear after the set time. Existing chats are not affected.' },
        { title: 'Silence Unknown Callers', description: 'Enable in Privacy → Calls → Silence Unknown Callers. Calls from numbers not in your contacts are silently routed — they can leave a voicemail but your phone won\'t ring. Eliminates WhatsApp spam and scam calls effectively.' },
        { title: 'Protect IP Address in Calls', description: 'Enable in Privacy → Advanced → Protect IP Address in Calls. Routes calls through WhatsApp\'s relay servers instead of peer-to-peer, hiding your real IP address from the other party. Useful for preventing IP-based location tracking during calls.' },
      ]} />

      <AlertBox type="tip" title="Enable Two-Step Verification now — it's critical">
        Two-step verification is the single most important WhatsApp security setting.
        Go to Settings → Account → Two-step verification → Enable.
        Set a 6-digit PIN and add a recovery email. This PIN is required when you register
        your WhatsApp number on any new device, preventing SIM swap attacks from giving
        attackers access to your account.
      </AlertBox>

      <SectionHeader number={4} title="Chat Lock and Screen Security" />
      <KeyPointsGrid items={[
        { title: 'Screen Lock (App Lock)', description: 'Settings → Privacy → Screen Lock → Enable. Requires Face ID, fingerprint, or PIN every time you open WhatsApp. Prevents someone who picks up your unlocked phone from reading your messages.' },
        { title: 'Chat Lock for individual conversations', description: 'Long-press any chat in the chat list → Lock. Locked chats are moved to a separate "Locked Chats" folder, don\'t show message previews in notifications, and require biometric authentication to open. Ideal for sensitive conversations with lawyers, doctors, or personal contacts.' },
        { title: 'Screen Security (screenshot prevention)', description: 'Settings → Privacy → Advanced → Screen Security. When enabled, the WhatsApp screen shows as black when captured in screenshots or screen recordings, and doesn\'t show previews in the app switcher. Note: the recipient can still take screenshots — this only prevents screenshots on your device.' },
        { title: 'Read Receipts', description: 'Privacy → disable "Read Receipts." Blue ticks won\'t appear when you read messages in one-on-one chats. Disabling this is reciprocal — you also won\'t see blue ticks for messages others have read. Group chat read receipts cannot be disabled.' },
      ]} />

      <SectionHeader number={5} title="Backup Encryption — The Setting Most People Miss" />
      <p>
        WhatsApp messages are end-to-end encrypted in transit, but the default WhatsApp backup
        to Google Drive or iCloud is NOT encrypted. This is one of the most significant privacy gaps
        — your messages may be accessible to Google or Apple through the backup even though WhatsApp
        itself can't read them.
      </p>
      <VerticalSteps steps={[
        { title: 'Open Chat Backup settings', desc: 'Settings → Chats → Chat Backup.' },
        { title: 'Enable End-to-End Encrypted Backup', desc: 'Tap "End-to-End Encrypted Backup" → Turn On.' },
        { title: 'Set an encryption password', desc: 'Choose either a 64-digit encryption key (store it safely — WhatsApp cannot recover it) or a password of your choice. The password approach is more practical for most users.' },
        { title: 'Store the key/password securely', desc: 'Save the encryption key or password in a password manager. If you lose it, you permanently lose access to your encrypted backup — WhatsApp cannot recover it for you.' },
      ]} />

      <QuickFact color="green" label="What end-to-end encryption actually protects">
        WhatsApp's end-to-end encryption protects messages in transit — WhatsApp and Meta cannot
        read your messages as they travel between devices. However, E2E encryption does NOT protect:
        messages on your device (accessible if phone is unlocked), unencrypted cloud backups,
        or messages on the recipient's device. Enable encrypted backups and Screen Lock for
        comprehensive protection.
      </QuickFact>

      <SectionHeader number={6} title="Linked Devices and Account Security" />
      <KeyPointsGrid items={[
        { title: 'Review Linked Devices', description: 'Settings → Linked Devices → review all active sessions. Remove any devices you don\'t recognize or no longer use. Linked device sessions persist even if the device is lost or stolen unless you manually remove them.' },
        { title: 'Two-Step Verification PIN', description: 'Settings → Account → Two-step verification → Change PIN. Use a PIN that isn\'t your phone unlock code. Enable a recovery email so you can reset it if forgotten. Without the PIN, no one can activate your WhatsApp number on a new phone — even with your SIM card.' },
        { title: 'Request account info', description: 'Settings → Account → Request Account Info. Download a report of all your WhatsApp data — messages metadata, settings, group memberships — for your own records or to identify data WhatsApp has about you.' },
        { title: 'Delete account', description: 'Settings → Account → Delete Account. Permanently deletes your account, message history on WhatsApp\'s servers, and removes you from all groups. Your number can be re-registered but all history is gone. This is irreversible.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does WhatsApp share my data with Facebook/Meta?',
          answer: 'WhatsApp shares certain account information with Meta — your phone number, device information, and usage patterns — for safety features, spam prevention, and Meta advertising targeting on Facebook and Instagram. Message content is end-to-end encrypted and not readable by WhatsApp or Meta. If you prefer zero data sharing with any parent company, Signal is the alternative — it is also E2E encrypted and shares no data with any external company.',
        },
        {
          question: 'Can someone track my location through WhatsApp?',
          answer: 'Real-time location is only shared if you explicitly use the "Share Live Location" feature from within a chat. With "Protect IP Address in Calls" enabled, your IP address (which can reveal approximate location) is hidden from the other caller. Photos you send may contain embedded GPS metadata if your camera\'s location tagging is enabled — disable location access for your camera app to prevent this.',
        },
        {
          question: 'Is WhatsApp end-to-end encrypted?',
          answer: 'Yes — all messages, voice calls, video calls, photos, videos, and documents are end-to-end encrypted by default using the Signal Protocol. WhatsApp cannot read your messages even if served a legal order (they can only provide metadata like who messaged whom and when). The important exception: WhatsApp backups to Google Drive and iCloud are NOT E2E encrypted by default. Enable encrypted backup in Settings → Chats → Chat Backup → End-to-End Encrypted Backup.',
        },
        {
          question: 'What is a WhatsApp SIM swap attack and how does two-step verification prevent it?',
          answer: 'A SIM swap attack is when someone convinces your mobile carrier to transfer your phone number to a SIM card they control. Once they have your number, they can receive WhatsApp verification codes and take over your account. Two-step verification adds a second layer — even with your phone number, they also need your 6-digit PIN to activate WhatsApp. Without the PIN, they cannot complete the account takeover.',
        },
        {
          question: 'Can I use WhatsApp on multiple devices?',
          answer: 'Yes — WhatsApp supports up to 4 linked devices (phones, tablets, desktops) through the Linked Devices feature. Each linked device maintains an independent encrypted connection to WhatsApp servers. Messages sync across all devices. You can manage and remove linked devices at any time in Settings → Linked Devices. The main phone doesn\'t need to be online for linked devices to work.',
        },
        {
          question: 'How do I know if my WhatsApp account has been compromised?',
          answer: 'Signs of compromise: (1) You receive unexpected verification codes via SMS — someone is trying to register your number. (2) Contacts receive messages you didn\'t send. (3) Unknown linked devices appear in Settings → Linked Devices. (4) WhatsApp shows a notification that your account is active on another device. If compromised: change your password/PIN immediately, remove all linked devices, enable two-step verification if not already enabled, and notify contacts that your account was compromised.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
