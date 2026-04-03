'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeAppleIdPhoneNumberWithoutLosingDataClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="How to Change Apple ID Phone Number Without Losing Data"
      description="Changing the phone number on your Apple ID is straightforward but requires careful steps to avoid losing iCloud data or being locked out. This guide covers iPhone, Mac, web, and recovery if you have already lost access."
    >
      <h1>How to Change Apple ID Phone Number Without Losing Data</h1>
      <p className="lead">
        Changing the phone number on your Apple ID is straightforward but requires careful steps
        to avoid losing iCloud data or being locked out. Your Apple ID email, iCloud data,
        App Store purchases, and everything else stays intact — only the verification number changes.
        This guide covers iPhone, Mac, web, and what to do if you have already lost access to your
        old number.
      </p>

      <StatGrid stats={[
        { value: 'Data safe', label: 'iCloud data stays intact throughout the change', color: 'green' },
        { value: '5 minutes', label: 'to update your phone number on iPhone or Mac', color: 'blue' },
        { value: '2FA', label: 'requires current trusted device or number', color: 'amber' },
        { value: 'All devices', label: 'update reflected across all your Apple devices', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Do this BEFORE losing access to your old number">
        Change your Apple ID phone number BEFORE your old number becomes inactive.
        If you lose access to your old number with 2FA enabled and no trusted device logged in,
        account recovery can take 24-72 hours or more — and may not succeed at all.
        Change the number while both SIMs are still active whenever possible.
      </AlertBox>

      <SectionHeader number={1} title="Change Phone Number on iPhone (Settings)" />
      <p>This is the most common and fastest method. Use this if your iPhone is still signed in to your Apple ID:</p>
      <VerticalSteps steps={[
        { title: 'Open Settings', desc: 'Tap your name at the very top of the Settings app to open your Apple ID page. This is the same page that shows your iCloud storage, subscriptions, and device list.' },
        { title: 'Tap "Sign-In & Security"', desc: 'This section controls your Apple ID password, two-factor authentication settings, and trusted phone numbers. It was previously called "Password & Security" on older iOS versions.' },
        { title: 'Tap "Two-Factor Authentication"', desc: 'You will see your trusted phone numbers listed here, along with the trusted devices section showing all devices signed in to your Apple ID.' },
        { title: 'Tap "Edit" next to Trusted Phone Numbers', desc: 'The edit mode appears with a red minus icon next to existing numbers and a green plus to add new ones.' },
        { title: 'Tap "Add a Trusted Phone Number"', desc: 'Enter your new phone number with the correct country code. Choose SMS text message or phone call for verification. SMS is usually faster.' },
        { title: 'Enter the 6-digit verification code', desc: 'Apple sends a verification code to the new number immediately. Enter it to confirm the number is working and verify it belongs to you. You have a limited time window to enter it.' },
        { title: 'Remove the old number', desc: 'After the new number is verified and added, tap the red minus (−) icon next to the old number, then tap "Remove." Confirm when prompted. You should have at least one trusted number at all times.' },
      ]} />

      <QuickFact color="blue" label="Important distinction">
        You are not changing your Apple ID — you are only changing the phone number used for
        two-factor authentication. Your Apple ID (email address) and password remain exactly
        the same. No apps need to be reinstalled and no devices need to be re-signed-in.
        The change is purely to the 2FA verification number.
      </QuickFact>

      <SectionHeader number={2} title="Change Phone Number on Mac" />
      <VerticalSteps steps={[
        { title: 'Open Apple menu → System Settings', desc: 'Click your Apple ID name and photo at the top of the Settings sidebar. On older macOS (Ventura and earlier), this was System Preferences → Apple ID.' },
        { title: 'Click "Sign-In & Security"', desc: 'Located in the left panel under your Apple ID section. Click "Edit" next to the Two-Factor Authentication or Trusted Phone Numbers section.' },
        { title: 'Add the new number', desc: 'Click "Add a Trusted Phone Number." Enter the new number with country code and select SMS or phone call for verification.' },
        { title: 'Verify with the SMS code', desc: 'Enter the 6-digit code sent to your new number. The number is added once verified.' },
        { title: 'Remove the old number', desc: 'Click the delete (−) icon or "Remove" link next to the old number. Confirm the removal when prompted.' },
      ]} />

      <SectionHeader number={3} title="Change via appleid.apple.com (Web Method)" />
      <p>
        Use this method if you do not have an Apple device handy, or if you prefer managing your
        Apple ID from a computer:
      </p>
      <VerticalSteps steps={[
        { title: 'Go to appleid.apple.com in any browser', desc: 'Works in Chrome, Firefox, Safari, or Edge on any operating system. Sign in with your Apple ID email and password.' },
        { title: 'Complete 2FA verification', desc: 'Apple will send a code to your current trusted device or trusted phone number. Enter it to prove you are the account owner.' },
        { title: 'Click "Sign-In and Security" in the left sidebar', desc: 'Find the "Two-Factor Authentication" section on the main page and click "Edit" to expand the trusted phone numbers management interface.' },
        { title: 'Add the new number', desc: 'Click "Add a Trusted Phone Number." Enter the new number and choose SMS verification. Enter the code when it arrives.' },
        { title: 'Remove the old number', desc: 'Click the "Remove" link next to the old number and confirm. The new number is now your primary trusted phone number for 2FA.' },
      ]} />

      <SectionHeader number={4} title="What Changes and What Stays the Same" />
      <CompareTable
        leftLabel="What Stays the Same"
        rightLabel="What Changes / May Need Updating"
        rows={[
          { label: 'iCloud data', left: 'All photos, documents, notes, contacts, calendars, health data — completely unaffected', right: 'Nothing to update — all data remains intact' },
          { label: 'App Store purchases', left: 'All purchased apps, in-app purchases, and subscriptions stay tied to your Apple ID', right: 'Nothing to update — purchases are account-bound, not number-bound' },
          { label: 'Apple Pay', left: 'All credit and debit cards in Apple Pay remain on your account', right: 'No re-adding payment methods needed' },
          { label: '2FA verification number', left: 'Apple ID email and password unchanged', right: 'The phone that receives 6-digit verification codes changes to the new number' },
          { label: 'iMessage', left: 'Message history remains on device', right: 'Check Settings → Messages → Send & Receive to confirm new number is registered' },
          { label: 'FaceTime', left: 'FaceTime works normally throughout change', right: 'Verify new number appears in Settings → FaceTime → You Can Be Reached At' },
          { label: 'Sign in with Apple', left: 'All third-party apps using Sign in with Apple continue working', right: 'Nothing needed — Sign in with Apple is tied to Apple ID, not phone number' },
        ]}
      />

      <KeyPointsGrid columns={2} items={[
        { title: 'iMessage update check', description: 'Go to Settings → Messages → Send & Receive after the phone number change. Your new number should appear automatically within a few minutes. If it does not appear, tap your Apple ID at the top of that screen and sign out and back in.' },
        { title: 'FaceTime update check', description: 'Open Settings → FaceTime and verify your new phone number is listed under "You Can Be Reached At FaceTime At." If it is missing, sign out of FaceTime and sign back in using your Apple ID credentials.' },
        { title: 'Find My stays active', description: 'Find My device tracking, location sharing, and AirDrop features are all tied to your Apple ID account, not your phone number. They continue working exactly as before throughout and after the number change.' },
        { title: 'Apple Watch pairing', description: 'Paired Apple Watches remain paired and functional. The phone number change does not affect the pairing status, cellular plans on the watch, or health data syncing between devices.' },
      ]} />

      <SectionHeader number={5} title="If You Have Already Lost Access to Your Old Number" />
      <p>
        This is the most difficult scenario. If your old number is already deactivated and you cannot
        receive 2FA codes from it, your options depend on whether you have other trusted devices or recovery
        methods set up. Here are your paths from most to least likely to succeed quickly:
      </p>
      <VerticalSteps steps={[
        { title: 'Use a trusted device (easiest if you have one)', desc: 'If you are already signed into iCloud on an iPhone, iPad, or Mac, you can approve 2FA sign-in from that trusted device without the phone number. Go to appleid.apple.com on a computer, start the sign-in, and when asked for the code, approve it from your trusted device\'s notification prompt.' },
        { title: 'Use an Account Recovery Contact', desc: 'If you set up an Account Recovery Contact (Settings → [Your Name] → Password & Security → Account Recovery), they can generate a recovery code for you immediately. This is the fastest path if you set one up in advance — the contact opens their iPhone, goes to your shared contact, and generates a code you enter on the recovery screen.' },
        { title: 'Start account recovery via iforgot.apple.com', desc: 'Go to iforgot.apple.com and click "Forgot Apple ID or password." Apple will guide you through identity verification using your account history, trusted devices, recovery email, and security questions. This process takes 24-72+ hours and success is not guaranteed without additional verification methods.' },
        { title: 'Contact Apple Support with ID verification', desc: 'Apple Support (support.apple.com) has identity verification processes for account recovery. Have a government-issued photo ID ready. In-person visits to an Apple Store with ID can sometimes accelerate this significantly compared to online support.' },
      ]} />

      <AlertBox type="info" title="Set up an Account Recovery Contact now — before you need it">
        Apple allows you to designate a trusted person (family member, close friend) as your Account
        Recovery Contact. Go to Settings → [Your Name] → Password & Security → Account Recovery →
        Add Recovery Contact. This person can help you regain access if you are ever locked out —
        even without your trusted phone number. Setup takes 2 minutes and could save hours of recovery
        effort in the future.
      </AlertBox>

      <SectionHeader number={6} title="Apple ID Security Best Practices After Changing Number" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Keep multiple trusted numbers', description: 'Add a secondary phone number to your trusted numbers list — a spouse\'s number, a backup SIM, or a second phone. This prevents total lockout if your primary number becomes unavailable for any reason.' },
        { title: 'Set up an Account Recovery Contact', description: 'As mentioned above, this is the single best protection against account lockout. A trusted person can generate a recovery code instantly from their iPhone when you need it.' },
        { title: 'Keep a trusted device signed in at home', description: 'An iPad at home, or any Apple device that remains signed in to your Apple ID, allows you to approve 2FA directly from the device without needing the phone number SMS at all.' },
        { title: 'Review trusted devices regularly', description: 'Go to Settings → [Your Name] → scroll down to see all devices signed in to your Apple ID. Remove any devices you no longer own, have sold, or do not recognize. Old devices that still appear represent potential security exposure.' },
        { title: 'Enable a Recovery Key', description: 'For maximum security, go to Settings → [Your Name] → Password & Security → Recovery Key and generate a 28-character key. Store it securely offline. This gives you account recovery without needing Apple Support — but if you lose both your trusted devices and the recovery key, your account is permanently inaccessible.' },
        { title: 'Update recovery email', description: 'Make sure your Apple ID recovery email (a non-Apple email) is current and accessible. This is used for account verification and is separate from your Apple ID email. Check it in Settings → [Your Name] → Sign-In & Security.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Can I change my Apple ID phone number if I no longer have access to the old number?',
          answer: 'This requires account recovery through other means. If you have a trusted device (iPhone, iPad, or Mac) still signed in to your Apple ID, you can approve the 2FA sign-in from that device without the phone number SMS. Go to appleid.apple.com on another computer, start the sign-in process, and approve from your trusted device. If you have no trusted devices, start account recovery at iforgot.apple.com — this takes 24-72 hours.',
        },
        {
          question: 'Does changing my Apple ID phone number sign me out of any apps?',
          answer: 'No — changing the trusted phone number (2FA number) does not sign you out of apps, services, or devices. Your Apple ID email and password do not change. You remain signed in on all devices and services as before. The only thing that changes is which phone receives 2FA verification codes going forward.',
        },
        {
          question: 'Will my iCloud data be deleted if I change my phone number?',
          answer: 'No — iCloud data is tied to your Apple ID email address, not your phone number. Changing the phone number has absolutely zero impact on iCloud storage, photos, documents, notes, contacts, or any other stored data. Everything remains exactly as it was before, during, and after the number change.',
        },
        {
          question: 'Can I add multiple phone numbers to my Apple ID?',
          answer: 'Yes — you can have multiple trusted phone numbers on your Apple ID. In Settings → [Your Name] → Sign-In & Security → Two-Factor Authentication, tap Edit and then Add a Trusted Phone Number. Each number can receive 2FA codes. Having at least one backup number is strongly recommended as insurance against losing access to your primary number.',
        },
        {
          question: 'What if the SMS verification code never arrives?',
          answer: 'First, verify you entered the correct international number including the right country code. Wait 2-3 minutes — SMS delivery can sometimes be slow. Tap "Resend Code" on the verification screen, or choose "Phone Call" instead of SMS for an automated voice call with the code read aloud. If codes consistently fail to arrive, the carrier may be blocking Apple\'s SMS short code — contact your carrier or try a different number to verify, then switch after.',
        },
        {
          question: 'Do I need to update my Apple ID number in third-party apps?',
          answer: 'Apps that use "Sign in with Apple" do not store your phone number — they only receive your Apple ID identifier. The phone number change has no effect on any Sign in with Apple integrations. The only apps that would need updating are those where you manually entered your phone number as a contact field or login credential — for example, banking apps or messaging apps that use your phone number as identity.',
        },
        {
          question: 'How long does the phone number update take to propagate across devices?',
          answer: 'The change takes effect immediately for your Apple ID account. Devices that are online will update within minutes as they sync with Apple\'s servers. Devices that are offline will update the next time they connect. iMessage and FaceTime may take a few extra minutes to register the new number — check Settings → Messages → Send & Receive to confirm.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
