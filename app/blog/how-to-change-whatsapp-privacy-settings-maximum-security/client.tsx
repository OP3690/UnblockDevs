'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeWhatsappPrivacySettingsMaximumSecurityClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>WhatsApp Privacy Settings for Maximum Security — Complete 2026 Guide</h1>
      <p className="lead">
        WhatsApp has extensive privacy controls that most users never configure. From hiding your
        last seen to blocking screenshot sharing in chats, these settings dramatically reduce your
        digital footprint. This guide covers every setting for maximum privacy.
      </p>

      <StatGrid stats={[
        { value: '15+', label: 'privacy settings available in WhatsApp', color: 'blue' },
        { value: 'End-to-end', label: 'encryption on all messages by default', color: 'green' },
        { value: 'Chat Lock', label: 'extra lock layer for sensitive conversations', color: 'purple' },
        { value: 'Advanced', label: 'privacy mode hides IP in calls', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Access Privacy Settings" />
      <VerticalSteps steps={[
        { title: 'Open WhatsApp', description: 'Tap Settings (bottom right iOS / three dots Android).' },
        { title: 'Tap "Privacy"', description: 'Under the Account section.' },
        { title: 'Review all settings', description: 'Configure each section as described below for maximum privacy.' },
      ]} />

      <SectionHeader number={2} title="Who Can See Your Information" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Last Seen & Online', description: 'Set to "Nobody" to hide when you were last active and when you\'re currently online. Note: if you hide Last Seen, you also can\'t see others\' Last Seen.' },
        { title: 'Profile Photo', description: 'Set to "My Contacts" or "Nobody" to prevent strangers from seeing your photo. "My Contacts Except" lets you exclude specific people.' },
        { title: 'About', description: 'Set to "Nobody" to hide your bio. Few people need to see this.' },
        { title: 'Status', description: 'Set to "My Contacts" to prevent strangers from seeing your status updates. Or "My Contacts Except" for fine control.' },
      ]} />

      <SectionHeader number={3} title="Groups and Calls Privacy" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Groups — Who can add me', description: 'Set to "My Contacts" or "My Contacts Except" to prevent random groups from adding you. This stops spam groups and scam group invitations.' },
        { title: 'Default message timer', description: 'Enable disappearing messages by default for all new chats. Go to Privacy → Default Message Timer → 24h/7d/90 days.' },
        { title: 'Silence Unknown Callers', description: 'Enable in Privacy → Calls → Silence Unknown Callers. Unknown numbers go to voicemail. Prevents spam and scam calls via WhatsApp.' },
        { title: 'Protect IP Address in Calls', description: 'Privacy → Advanced → Protect IP Address in Calls. Routes calls through WhatsApp servers so your IP isn\'t revealed to the other party.' },
      ]} />

      <SectionHeader number={4} title="Chat Lock and Screen Security" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Chat Lock', description: 'Long-press any chat → Lock. Locked chats require Face ID/fingerprint/PIN to open and don\'t show message previews in notifications. Ideal for sensitive conversations.' },
        { title: 'Screen Lock', description: 'Privacy → Screen Lock → enable. Requires biometric unlock when opening WhatsApp. Prevents others from reading messages on your phone.' },
        { title: 'Disable Read Receipts', description: 'Privacy → uncheck "Read Receipts". Blue ticks won\'t show when you\'ve read messages. Note: this also disables seeing others\' read receipts.' },
        { title: 'Two-Step Verification', description: 'Settings → Account → Two-step verification → Enable. Adds a PIN required when registering your number on a new device. Critical for preventing SIM swap attacks.' },
      ]} />

      <AlertBox type="tip" title="Enable two-step verification now">
        Two-step verification is the single most important security setting. It prevents someone
        who steals your SIM card from accessing your WhatsApp account on a new device.
        Set a 6-digit PIN and a recovery email.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does WhatsApp share my data with Facebook/Meta?',
          answer: 'WhatsApp shares some account information with Meta (your phone number, device info, usage patterns) for safety, spam prevention, and ad targeting on Facebook/Instagram. Message content is end-to-end encrypted and not readable by WhatsApp/Meta. If you don\'t want any data sharing, consider Signal as an alternative — it shares no data with any parent company.',
        },
        {
          question: 'Can someone track my location through WhatsApp?',
          answer: 'Your real-time location is only shared if you explicitly use the "Share Live Location" feature. With "Protect IP Address in Calls" enabled, your IP (which could reveal approximate location) is hidden during calls. Photos you send may contain GPS metadata — disable location in your camera settings to avoid this.',
        },
        {
          question: 'Is WhatsApp end-to-end encrypted?',
          answer: 'Yes — all messages, calls, photos, and videos are end-to-end encrypted by default using the Signal Protocol. WhatsApp cannot read your messages. However, backups to Google Drive or iCloud are NOT end-to-end encrypted by default. Enable encrypted backup: Settings → Chats → Chat Backup → End-to-End Encrypted Backup.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
