'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function HowToChangePhoneNumberTelegramWithoutNotifyingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your Telegram Phone Number Without Notifying Contacts</h1>
      <p className="lead">
        Telegram lets you change your account's phone number while keeping all your chats, groups,
        contacts, and media intact. The change is not announced to your contacts — they won't
        receive any notification. This guide explains the exact steps on iOS, Android, and desktop,
        what changes and what stays the same, how to handle edge cases like VoIP numbers or
        unavailable old numbers, and security best practices to run after a number change.
      </p>

      <StatGrid stats={[
        { value: 'Chats kept', label: 'all messages and media preserved automatically', color: 'green' },
        { value: 'No notification', label: 'contacts are NOT automatically notified', color: 'blue' },
        { value: 'Username stays', label: 'your @username remains completely unchanged', color: 'purple' },
        { value: 'Two-step', label: 'verify new number + optional old number verify', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="How to Change Phone Number in Telegram" />
      <QuickFact color="blue" label="Key difference from WhatsApp">
        Telegram's Change Number is simpler than WhatsApp's — you don't need to reinstall or restore
        from backup. Everything migrates seamlessly in the background during the number change process.
        Your chats, groups, channels, and media stay exactly as they were. The entire process takes
        under 3 minutes in most cases.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Open Telegram app', desc: 'Tap the hamburger menu (☰) on iOS or the three horizontal lines on Android to open the side menu. On desktop (Windows, Mac, Linux), click the three lines in the top left corner of the app.' },
        { title: 'Go to Settings', desc: 'Tap "Settings" from the side menu. On iOS, tap your name/profile at the top of the Settings panel to access the Edit Profile screen. On Android, tap your profile photo at the top of Settings.' },
        { title: 'Tap your phone number', desc: 'Under the Edit Profile section, tap the phone number shown below your name and username. This opens the account-level settings that include the Change Number option. You may need to scroll down slightly on smaller screens.' },
        { title: 'Tap "Change Number"', desc: 'A prompt appears explaining what will be migrated (chats, groups, contacts). Read through the information Telegram provides. Confirm you want to proceed by tapping "Change Number" in the confirmation dialog.' },
        { title: 'Enter your new phone number', desc: 'Include the full country code (e.g., +1 for US, +44 for UK, +91 for India, +49 for Germany). Type the number without spaces or dashes — just the country code followed by the number. Tap "Next" to proceed to verification.' },
        { title: 'Verify the new number', desc: 'Telegram sends a 5-digit verification code via SMS to the new number. Enter the code within the time limit shown on screen. If you don\'t receive the SMS within 60 seconds, tap "Resend code" or use the Flash Call option if available.' },
        { title: 'Verify old number (if prompted)', desc: 'As a security step, Telegram may also ask you to confirm via your old number. This isn\'t always required — it depends on your account security settings and how long ago you last logged in. If prompted, a code will be sent to your old number.' },
        { title: 'Confirmation', desc: 'Your account is now linked to the new number. All chats, groups, channels, saved messages, and contacts are preserved automatically. No additional steps are needed — the change takes effect immediately across all active sessions.' },
      ]} />

      <SectionHeader number={2} title="Step-by-Step on Each Platform" />
      <CodeBlock language="text" filename="Platform-Specific Navigation Paths">
{`iOS (iPhone / iPad)
─────────────────────────────
Settings → [Your Name at top] → Edit profile
→ Tap phone number field → Change Number
→ Enter new number with country code
→ Enter SMS verification code

Android
─────────────────────────────
Settings (hamburger menu) → tap your profile photo
→ tap phone number → Change Number
→ Enter new number with country code
→ Enter SMS verification code

Desktop (Windows / Mac)
─────────────────────────────
☰ Menu → Settings → Edit Profile icon (pencil)
→ Click phone number → Change Number
→ Enter new number with country code
→ Enter SMS code received on new number

Web (web.telegram.org)
─────────────────────────────
☰ Menu → Settings → Edit
→ Click on your phone number
→ Change Number option appears in dropdown`}
      </CodeBlock>

      <SectionHeader number={3} title="What Stays the Same vs. What Changes" />
      <CompareTable
        leftLabel="Stays the Same"
        rightLabel="What Changes"
        rows={[
          { label: 'Chat history', left: 'Every private chat, group, channel, and secret chat — full history preserved', right: 'Phone number associated with your Telegram login credential' },
          { label: '@username', left: 'Completely unchanged — contacts via @username can still reach you', right: 'Contact discovery by phone number — old number no longer links to your account' },
          { label: 'Groups and channels', left: 'Remain in all groups, retain admin/creator roles unchanged', right: 'Contact sync — contacts who saved old number won\'t find you by that number' },
          { label: 'Media and files', left: 'All photos, videos, documents, voice messages preserved', right: 'Login sessions that use old number as identifier (you use new number going forward)' },
          { label: 'Two-Step Verification', left: 'Password remains active and completely unchanged', right: 'Nothing — 2SV is tied to the account, not the phone number' },
          { label: 'Bots and user ID', left: 'Your Telegram user ID is unchanged — all bots still work', right: 'Nothing for bots — they use user ID, not phone number' },
          { label: 'Saved Messages', left: 'All saved messages, bookmarks, and forwards preserved', right: 'Nothing — Saved Messages is account-level storage' },
          { label: 'Sticker packs', left: 'All installed sticker packs remain installed', right: 'Nothing — sticker packs are tied to account, not number' },
        ]}
      />

      <SectionHeader number={4} title="Do Contacts Get Notified?" />
      <AlertBox type="info" title="Telegram does NOT send number-change notifications">
        Unlike WhatsApp (which offers an optional notification to contacts), Telegram does not send any
        notification when you change your phone number. Your contacts will not see an in-app alert.
        However, contact sync can passively reveal your new number over time — read the details below.
      </AlertBox>

      <KeyPointsGrid items={[
        { title: 'No automatic message', description: 'Telegram sends no "X changed their number" message to any of your contacts. Unlike WhatsApp, there\'s no built-in notification option at all — the change is completely silent from Telegram\'s side. No system message appears in any of your existing chats.' },
        { title: 'Contact sync (passive discovery)', description: 'If a contact already has your new number saved in their phonebook AND has Telegram contact sync enabled, Telegram\'s background sync will eventually associate their saved contact with your Telegram account. This is passive — it appears in their contact list update, not as an in-app notification or message.' },
        { title: 'Old number contacts', description: 'Contacts who only have your old number saved won\'t automatically find your new number or receive any indication of the change. They can still reach you via @username or through existing active conversations. Finding you by phone number will no longer work with the old number.' },
        { title: 'Active chats continue normally', description: 'In all existing conversations (both private and group), your account appears normally without any disruption, banner, or system message. The account identity is preserved — contacts can message you as before with no indication anything changed on their end.' },
        { title: 'When to manually notify contacts', description: 'Consider directly messaging key contacts who you want to have your new number: people who contact you exclusively by phone (not through existing Telegram chats), and contacts who need your number for other reasons (WhatsApp, phone calls, SMS). Most Telegram-only contacts will never notice the change.' },
      ]} />

      <SectionHeader number={5} title="Troubleshooting: Verification Code Issues" />
      <KeyPointsGrid items={[
        { title: 'SMS not received on new number', description: 'Wait 60 seconds before requesting another code — there\'s a rate limit. Check that you entered the correct full number including country code. Some carriers block international short-code SMS. Try the Flash Call alternative if available. Check whether your carrier\'s spam filter blocked the message.' },
        { title: 'Try Flash Call method', description: 'Telegram offers a "Flash call" alternative — you receive a brief phone call from a number whose last 5 digits are the verification code. Just check the caller ID and enter those digits. Useful if SMS is unreliable or blocked by your carrier. Flash Call availability depends on your country and carrier.' },
        { title: 'VoIP numbers often rejected', description: 'Telegram blocks many VoIP/virtual numbers (Google Voice, Skype numbers, TextNow) for account-level verification. Use a physical SIM from a real carrier. Some regional virtual number services work — it varies by provider. Google Voice numbers in the US are generally blocked; physical SIM numbers work reliably.' },
        { title: 'Old number unavailable', description: 'If Telegram asks for old number verification but you can\'t receive it (SIM lost, service canceled), contact Telegram support through Settings → Ask a Question. Explain you\'ve lost access to the old number. They can sometimes bypass the requirement after verifying account ownership through other means.' },
        { title: 'Number already associated with another account', description: 'If your new number is already linked to a different Telegram account (e.g., an old account you forgot about), you cannot use it for the Change Number flow without first removing it from the other account. Log into the old account and delete it, or contact Telegram support.' },
        { title: 'Rate limit hit — too many attempts', description: 'If you\'ve attempted verification too many times, Telegram imposes a temporary cooldown period (can be several hours to 24 hours for aggressive attempts). Wait out the cooldown period before trying again. Using a different device or IP address does not bypass the rate limit — it\'s applied at the phone number level.' },
      ]} />

      <SectionHeader number={6} title="Telegram vs WhatsApp — Number Change Comparison" />
      <CompareTable
        leftLabel="Telegram Number Change"
        rightLabel="WhatsApp Number Change"
        rows={[
          { label: 'Old number required', left: 'Sometimes (security step, not always)', right: 'Always required — must verify both numbers simultaneously' },
          { label: 'Contact notification', left: 'None — completely silent change', right: 'Optional — can notify All Contacts, Contacts in Common, or nobody' },
          { label: 'Group membership', left: 'Automatic — stay in all groups with same roles', right: 'Automatic with Change Number feature in settings' },
          { label: 'Chat history', left: 'Live sync — no backup needed, instant', right: 'Live sync with Change Number feature (no backup restore needed)' },
          { label: 'Reinstall required', left: 'No — changes in the app settings', right: 'No — changes in the app settings' },
          { label: 'Username preserved', left: 'Yes — @username completely unchanged', right: 'N/A — WhatsApp uses numbers as identity, no usernames' },
          { label: 'Secret chats', left: 'Preserved — all encrypted chats continue', right: 'N/A — WhatsApp doesn\'t have separate "secret chat" mode' },
          { label: 'Multiple devices', left: 'Change applies to all linked devices automatically', right: 'Must be done from primary device with active SIM' },
        ]}
      />

      <SectionHeader number={7} title="Security Best Practices After Changing Number" />
      <VerticalSteps steps={[
        { title: 'Enable Two-Step Verification (if not already active)', desc: 'Settings → Privacy and Security → Two-Step Verification. Add a strong password required in addition to the SMS code when logging in from new devices. This protects against SIM swap attacks — critical if you\'re changing numbers because your old SIM was compromised or stolen. Without 2SV, anyone who gets your new SIM can access your account.' },
        { title: 'Review and terminate suspicious active sessions', desc: 'Settings → Privacy and Security → Active Sessions. See all logged-in devices (phones, tablets, web browsers, desktop apps). Changing your phone number does NOT automatically log out existing sessions. Terminate any sessions from devices you don\'t recognize or no longer use. This is especially important if the number change was prompted by security concerns.' },
        { title: 'Update third-party services and bots', desc: 'If you\'ve linked Telegram to third-party services, business bots, or CRM integrations that display or store your phone number, update those records. Note: bots use your user ID (unchanged) for all interactions, so bot functionality is unaffected. However, some services store your phone number for human-readable display or contact purposes.' },
        { title: 'Set privacy for your new phone number', desc: 'Settings → Privacy and Security → Phone Number. Choose who can see your phone number: Everyone, My Contacts, or Nobody. After changing numbers, you may want to restrict visibility to Nobody if the new number is private. You can still be found by @username even with the number set to Nobody.' },
        { title: 'Inform important contacts manually if needed', desc: 'While no automatic notification goes out, directly message key contacts who should know your new number — especially those who contact you by phone number rather than through existing Telegram chats or your @username. A quick message in the existing chat is the simplest approach.' },
        { title: 'Verify your account recovery email', desc: 'Telegram allows setting a recovery email for Two-Step Verification password recovery. After a security-related number change, verify your recovery email is still valid and accessible (Settings → Privacy and Security → Two-Step Verification → Recovery email). If your security situation changed, update the recovery email.' },
      ]} />

      <QuickFact color="green" label="Your Telegram user ID never changes">
        Every Telegram account has a permanent numeric user ID (different from your phone number or username).
        This ID is how all bots, channels, groups, and Telegram services identify you internally. It never
        changes regardless of how many times you change your phone number. You can find your user ID
        by messaging @userinfobot in Telegram — it will reply with your permanent account ID.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'Will my contacts see that I changed my Telegram number?',
          answer: 'No automatic notification is sent. However, if a contact already has your new number saved in their phonebook, Telegram\'s background contact sync will eventually associate their saved contact with your Telegram account — appearing as a passive update in their contacts list, not as an in-app notification. Contacts who only have the old number won\'t be automatically updated, and no system message appears in any existing chat.',
        },
        {
          question: 'What if I can\'t receive SMS on the new number?',
          answer: 'Telegram offers alternative verification: Flash Call (you receive a call from a number ending in your 5-digit code — just check the caller ID), or request the code again after 60 seconds. If SMS consistently fails, the number may be blocked by your carrier for international short codes — contact your carrier to enable SMS from Telegram\'s short code senders. Persistent issues may require contacting Telegram support.',
        },
        {
          question: 'Can I use a VoIP number for Telegram?',
          answer: 'Telegram often rejects VoIP numbers for account-level actions like changing your primary number. Physical SIM numbers from real mobile carriers work reliably. Some regional virtual number services are accepted while others aren\'t — it varies by provider and is subject to change. If VoIP is rejected, use a physical SIM. Google Voice numbers in the US are almost always blocked.',
        },
        {
          question: 'What happens to Telegram bots after I change my number?',
          answer: 'Bots don\'t care about your phone number — they interact with your Telegram user ID, which remains completely constant regardless of phone number changes. All bot conversations, saved bot states, subscriptions, and configurations remain intact and functional after the number change. Bot developers and bot services never see your phone number — only your user ID.',
        },
        {
          question: 'Can I change my number to one from a different country?',
          answer: 'Yes — Telegram supports international number changes. Enter the full number with the correct international country code (e.g., +44 for UK, +91 for India, +49 for Germany). The verification SMS will be sent to that international number. Your account region settings don\'t restrict which country\'s number you can use.',
        },
        {
          question: 'Does changing my Telegram number affect Two-Step Verification?',
          answer: 'No — your Two-Step Verification password remains completely active and unchanged after a number change. The password is tied to your Telegram account (user ID), not to your phone number. You\'ll still need to enter it when logging in from new devices after the number change, in addition to the new number\'s SMS code. This is exactly how it should work — 2SV provides authentication independent of your phone number.',
        },
        {
          question: 'Is there a limit to how many times I can change my Telegram number?',
          answer: 'Telegram doesn\'t publicly state a hard limit, but frequent number changes may trigger anti-abuse restrictions on the account. If you\'re changing numbers more than a few times per year, Telegram\'s systems may introduce delays or temporary restrictions. The process is designed for normal use cases like getting a new SIM, not for frequent account identity cycling. Contact Telegram support if you face unexpected restrictions.',
        },
        {
          question: 'What if I accidentally confirmed the wrong number?',
          answer: 'If you confirmed a number change to the wrong number and can access that number\'s SMS, simply go through the Change Number process again to switch to the correct number. If the wrong number belongs to someone else and you can\'t access it, contact Telegram Support immediately (Settings → Ask a Question). Act quickly — if someone else receives the verification code for that number, they could potentially access the account.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
