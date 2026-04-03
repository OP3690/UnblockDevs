'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function XboxGamePassGamesCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Xbox Game Pass — Complete Guide to Games, Tiers, and Value in 2026</h1>
      <p className="lead">
        Xbox Game Pass (now with three distinct tiers: Core, Standard, and Ultimate) is Microsoft's
        subscription gaming service giving access to hundreds of games for a monthly fee. This guide
        covers every tier, what's included, how to maximize value, the best games currently in the
        library, and whether it's worth it compared to buying games outright. We also cover cloud
        gaming, family sharing, and how to get Game Pass at a discount.
      </p>

      <StatGrid stats={[
        { value: '500+', label: 'games available across the Game Pass library', color: 'green' },
        { value: 'Day 1', label: 'all first-party Xbox titles launch on Game Pass Ultimate', color: 'blue' },
        { value: '$19.99/mo', label: 'Game Pass Ultimate — all platforms and benefits', color: 'amber' },
        { value: 'PC + Console', label: 'Ultimate covers Xbox consoles, PC, and cloud gaming', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Game Pass Tiers Explained" />
      <QuickFact color="blue" label="The 2024 restructure">
        Microsoft restructured Game Pass in 2024. There are now three tiers: Game Pass Core
        (formerly Xbox Live Gold with a limited game library), Game Pass Standard (full console
        library, no day-one first-party releases), and Game Pass Ultimate (everything — console,
        PC, cloud, EA Play, and all day-one releases from Xbox Game Studios).
      </QuickFact>

      <p>
        Understanding which tier fits your gaming habits is the most important decision. Pay for Ultimate
        when you actively use PC and cloud gaming or need every first-party title on day one. Standard
        is the sweet spot for console-only players who can wait a few months after a game's launch.
        Core is really for people who primarily want online multiplayer and don't need a large game library.
      </p>

      <CompareTable
        leftLabel="Game Pass Core ($9.99/mo)"
        rightLabel="Game Pass Ultimate ($19.99/mo)"
        rows={[
          { label: 'Console gaming', left: 'Limited curated library (~25 games)', right: 'Full library (500+ games)' },
          { label: 'PC gaming', left: 'Not included', right: 'Full PC Game Pass included' },
          { label: 'Cloud gaming (xCloud)', left: 'Not included', right: 'Stream to phone, tablet, browser, TV' },
          { label: 'Day-one first-party titles', left: 'Not included', right: 'All Xbox Game Studios titles day one' },
          { label: 'EA Play', left: 'Not included', right: '80+ EA titles included' },
          { label: 'Online multiplayer', left: 'Included', right: 'Included' },
          { label: 'Member discounts', left: '10% off purchases', right: '20% off game purchases' },
          { label: 'Game Pass Standard ($14.99/mo)', left: 'N/A', right: 'Full console library, no day-one first-party, no cloud' },
        ]}
      />

      <SectionHeader number={2} title="What Games Are on Game Pass?" />
      <KeyPointsGrid columns={2} items={[
        { title: 'First-party Xbox Game Studios titles', description: 'Every game from Xbox Game Studios (Halo, Forza, Fable, Starfield, Indiana Jones, Avowed, Microsoft Flight Simulator) launches on Game Pass Ultimate day one at no additional cost. These games retail at $69.99+.' },
        { title: 'Third-party partnerships', description: 'Publishers including Ubisoft, EA, Bethesda, 2K, Activision, and Sega add titles to Game Pass via negotiated deals. Games rotate in and out monthly — Microsoft notifies you 2 weeks before removals.' },
        { title: 'EA Play library included', description: 'Game Pass Ultimate includes EA Play: FC 25, Madden, Mass Effect Legendary Edition, Dragon Age, Battlefield series, The Sims 4, Need for Speed, Jedi: Survivor, and more — 80+ EA titles.' },
        { title: 'Indie and AA games', description: 'Hundreds of indie games, many launching day one via the Xbox ID@Xbox program. Xbox has invested heavily in indie support — Game Pass is a major discovery platform for smaller studios.' },
        { title: 'Activision Blizzard titles', description: 'Following the Microsoft acquisition of Activision Blizzard, Call of Duty, Overwatch 2, Diablo, Starcraft, and World of Warcraft are part of the Game Pass ecosystem and continuing to be added.' },
        { title: 'Bethesda back catalog', description: 'The full Bethesda library — The Elder Scrolls series, Fallout, Doom, Wolfenstein, Dishonored, Prey, Deathloop — is available on Game Pass following Microsoft\'s acquisition of ZeniMax Media.' },
      ]} />

      <SectionHeader number={3} title="Notable Games on Game Pass (2026)" />
      <KeyPointsGrid columns={3} items={[
        { title: 'Halo Infinite', description: 'Flagship Xbox FPS — multiplayer is free-to-play, campaign is on Game Pass.' },
        { title: 'Forza Horizon 5', description: 'Best-rated open-world racing game, set in Mexico with 500+ cars.' },
        { title: 'Starfield', description: 'Bethesda\'s space exploration RPG with 1,000+ explorable planets.' },
        { title: 'Indiana Jones', description: 'MachineGames\' first-person adventure — critically acclaimed.' },
        { title: 'Avowed', description: 'Obsidian\'s first-person RPG set in the Pillars of Eternity world.' },
        { title: 'Microsoft Flight Simulator 2024', description: 'The most realistic flight simulation ever made.' },
        { title: 'Sea of Thieves', description: 'Co-op pirate adventure with years of continuous free content updates.' },
        { title: 'Minecraft', description: 'The best-selling game of all time — Java and Bedrock editions.' },
        { title: 'Age of Empires IV', description: 'Microsoft\'s flagship RTS, launched day one on Game Pass.' },
        { title: 'Doom: The Dark Ages', description: 'The latest id Software Doom entry — day one on Game Pass.' },
        { title: 'Diablo IV', description: 'Blizzard\'s action RPG — base game included on Game Pass.' },
        { title: 'Persona 3/4/5', description: 'Atlus\'s acclaimed JRPG series — all major titles on Game Pass.' },
        { title: 'Elden Ring', description: 'FromSoftware\'s open-world action RPG — added after initial launch.' },
        { title: 'Lies of P', description: 'Critically acclaimed Soulslike — launched day one on Game Pass.' },
        { title: 'Wo Long: Fallen Dynasty', description: 'Team Ninja\'s action RPG set in Three Kingdoms China.' },
      ]} />

      <SectionHeader number={4} title="Is Game Pass Worth It?" />
      <AlertBox type="tip" title="The math strongly favors Game Pass for active Xbox players">
        If you play even one first-party title per year (e.g., Starfield at $69.99), Game Pass
        Ultimate pays for itself in under 4 months. Two major titles? It covers the entire year.
        The value proposition flips for casual gamers who only play free-to-play games (Warzone,
        Apex, Fortnite) that don't require a Game Pass subscription.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Count how many $70 games you buy per year', desc: 'If you buy 3+ new first-party games annually, Game Pass Ultimate saves significant money. At $239.88/year (Ultimate) vs. $209.97 for just 3 games at $69.99 each, you\'re breaking even on just 3 games while also getting access to 500+ others.' },
        { title: 'Consider which platforms you use', desc: 'PC-only gamers can use PC Game Pass at $9.99/mo — no need for the full Ultimate tier. Console-only players can use Game Pass Standard at $14.99/mo and skip cloud and PC features. Only get Ultimate if you actively use multiple platforms or travel and want cloud gaming.' },
        { title: 'Watch for new subscriber deals', desc: 'Microsoft regularly offers 3 months for $1–3 for new or lapsed subscribers. Xbox Gift Cards go on sale at Costco, Amazon, and GameStop regularly at 10–25% off. Stack these deals at subscription renewal to reduce the effective monthly cost significantly.' },
        { title: 'Monitor game rotation', desc: 'Games rotate out monthly. If a game you want is leaving soon, you can buy it at the member discount (20% off for Ultimate subscribers). You keep purchased games permanently even if you cancel Game Pass later.' },
        { title: 'Use cloud gaming strategically', desc: 'Cloud gaming (xCloud) lets you play Game Pass titles on any device without a console — Android, iPhone, tablet, PC, Samsung Smart TV. This is the hidden value for households with multiple people who want to play simultaneously or for travel use on a laptop without a gaming GPU.' },
        { title: 'Check the "Leaving soon" section regularly', desc: 'The Xbox app and Xbox.com both show a "Leaving soon" section updated every month. Any game leaving in the next two weeks can be purchased at the member discount before it leaves. This is especially valuable for popular third-party titles.' },
      ]} />

      <SectionHeader number={5} title="Game Pass vs Buying Games" />
      <CompareTable
        leftLabel="Game Pass Ultimate"
        rightLabel="Buy Games Outright"
        rows={[
          { label: 'Upfront cost', left: '$20/month ongoing subscription', right: '$70 per game, one-time' },
          { label: 'Library access', left: '500+ games immediately on day one', right: 'Only the games you individually purchase' },
          { label: 'Ownership', left: 'Access while subscribed — stops at cancellation', right: 'Permanent ownership regardless of subscription' },
          { label: 'New first-party releases', left: 'Included at no extra cost day one', right: 'Must purchase each title separately at $70' },
          { label: 'Game removals', left: 'Risk of losing access to rented games', right: 'Never removed — you own it permanently' },
          { label: 'Heavy players (5+ games/year)', left: 'Excellent value — enormous savings', right: 'Very expensive ($350+ per year)' },
          { label: 'Casual players (1–2 games/year)', left: 'May not justify $240/year cost', right: 'Better value — pay only for what you play' },
          { label: 'Discovery', left: 'Encourages trying games you wouldn\'t have bought', right: 'Risk of paying $70 for a game you don\'t enjoy' },
        ]}
      />

      <SectionHeader number={6} title="How to Get the Best Deal on Game Pass" />
      <AlertBox type="info" title="Gold-to-Ultimate conversion trick">
        Xbox Live Gold converts to Game Pass Ultimate at a 1:1 ratio up to 36 months. Buy discounted
        Xbox Live Gold codes (often 30-50% off at Costco, CDKeys, or during sales), then upgrade to
        Ultimate for $1. This can give you Game Pass Ultimate at an effective cost of $4-7/month —
        less than half the standard price. Note: Microsoft has periodically restricted this, so check
        current availability before purchasing Gold codes.
      </AlertBox>

      <KeyPointsGrid items={[
        { title: 'Microsoft Rewards program', description: 'Microsoft Rewards lets you earn points by searching with Bing, completing daily quizzes, and purchasing on Xbox. Points can be redeemed for Xbox Gift Cards — effectively giving you partial credit toward Game Pass subscriptions for completing daily tasks that take under 5 minutes.' },
        { title: 'Student discounts', description: 'Students with an eligible .edu email address can access PC Game Pass through Microsoft 365 Education bundles at significantly reduced rates. Check your school\'s Microsoft licensing agreement before paying full retail price.' },
        { title: 'Family plan consideration', description: 'Game Pass does not yet have an official family plan for multiple accounts. However, Xbox Home console sharing allows one Game Pass account to share benefits with anyone on the designated "Home" console. This effectively provides Game Pass value to household members.' },
        { title: 'Gift cards on sale', description: 'Xbox Gift Cards (redeemable for Game Pass) go on sale multiple times per year — particularly during Black Friday, holiday sales, Prime Day, and back-to-school periods. Purchasing gift cards during sales and using them to pre-pay subscription renewals reduces effective monthly cost.' },
      ]} />

      <SectionHeader number={7} title="Cloud Gaming (xCloud) — Everything You Need to Know" />
      <p>
        Cloud gaming is often the least understood feature of Game Pass Ultimate but can be its
        most valuable benefit depending on your setup. It removes the hardware requirement for gaming
        entirely — you can play console-quality games on any device with a decent internet connection.
      </p>
      <VerticalSteps steps={[
        { title: 'What devices support cloud gaming', desc: 'Android phones and tablets (native app), iPhone and iPad (via browser at xbox.com/play), Windows PC (via the Xbox app or browser), Samsung Smart TVs (native app with Xbox controller), Amazon Fire TV (native app), and Logitech G Cloud handheld.' },
        { title: 'Internet requirements', desc: 'Microsoft recommends 20 Mbps for 1080p streaming and 40 Mbps for 1080p/60fps. A 5 GHz Wi-Fi connection or Ethernet gives the lowest latency. Mobile data (4G LTE or 5G) works for streaming but expect some additional latency compared to Wi-Fi.' },
        { title: 'Controller compatibility', desc: 'Any Bluetooth controller works with cloud gaming: Xbox wireless controllers, PlayStation DualShock/DualSense, Nintendo Pro Controller, and many third-party options. Touch controls are available for some games on mobile devices without a controller.' },
        { title: 'Performance and latency expectations', desc: 'Cloud gaming latency is typically 40–100ms depending on your distance from Microsoft\'s Azure servers. This is excellent for RPGs, strategy games, and story games. For fast-paced competitive shooters (Halo multiplayer, fighting games), local hardware will always feel better.' },
        { title: 'Save synchronization', desc: 'Cloud saves sync automatically between cloud gaming sessions and local console/PC play. Start a game in cloud gaming on your phone, continue on your Xbox or PC — your progress follows you seamlessly.' },
      ]} />

      <QuickFact color="purple" label="Best use case for cloud gaming">
        Cloud gaming shines for households with one Xbox where multiple people want to play at the same
        time. One person plays on the physical console; everyone else streams via cloud on other devices.
        It also eliminates game download wait times — start playing immediately while the game "downloads."
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'Do I keep games I download from Game Pass if I cancel?',
          answer: 'No — you lose access to all Game Pass games when your subscription ends. Any game progress saved in cloud saves is retained, so if you resubscribe, you pick up where you left off. However, any games you purchased outright at a member discount during your subscription are yours permanently, even after cancellation.',
        },
        {
          question: 'Can I share Game Pass with family?',
          answer: 'Yes — Xbox Home console sharing allows you to share Game Pass with one other person. Set your Xbox as your "Home Xbox" and any account on that console gets access to your Game Pass games and benefits. For PC sharing, this isn\'t directly supported, but a workaround exists: the account with Game Pass plays on PC while another account plays on the Home Xbox simultaneously.',
        },
        {
          question: 'What is cloud gaming in Game Pass Ultimate?',
          answer: 'Cloud gaming (formerly xCloud) lets you stream Xbox games to any device — Android phone, iPhone (via browser), tablet, PC, or Samsung Smart TV — without downloading the game locally. You can play Halo Infinite or Forza Horizon 5 on your phone with a controller. Requires a stable internet connection (15+ Mbps recommended for good quality, 20+ Mbps for 1080p). Input lag is noticeable for fast-paced competitive games but excellent for RPGs and story games.',
        },
        {
          question: 'How often do new games come to Game Pass?',
          answer: 'Microsoft adds games every 2–3 weeks, announced via "Xbox Game Pass additions" blog posts and the Xbox app. First-party games always launch day one. Third-party additions vary — some launch day one (negotiated deals), others are added months after release. Removals also happen monthly — typically 5–10 games leave per month. Microsoft gives 2 weeks advance notice before removals.',
        },
        {
          question: 'Is Game Pass available outside the US?',
          answer: 'Game Pass is available in 40+ countries. The library varies slightly by region due to licensing agreements — a game available in the US may not be available in your country. Pricing is localized and generally lower in countries with lower average incomes (e.g., India, Brazil). Cloud gaming server availability also varies by region, affecting stream quality and latency. Check xbox.com/game-pass for your country\'s availability, library, and pricing.',
        },
        {
          question: 'What happens to my save data if a game leaves Game Pass?',
          answer: 'Save data is stored in Xbox Cloud Saves and is not affected by games leaving Game Pass. If a game leaves Game Pass and you want to continue playing it, you can purchase it (at the 20% member discount while you\'re still subscribed) and all your save progress carries over. Your saves are tied to your Xbox account, not your subscription status.',
        },
        {
          question: 'Is there a difference between PC Game Pass and Xbox Game Pass?',
          answer: 'PC Game Pass ($9.99/mo) gives access to the PC version of Game Pass games on Windows computers only — no console access, no cloud gaming, no EA Play. Game Pass Ultimate ($19.99/mo) includes PC Game Pass, console library, cloud gaming, EA Play, and Xbox Live Gold benefits. If you only game on PC, PC Game Pass is excellent value. If you use both platforms, Ultimate is the better choice.',
        },
        {
          question: 'Can I play Game Pass games offline?',
          answer: 'Yes — downloaded Game Pass games can be played offline with some requirements. Your console must be set as your "Home Xbox," or your profile must be signed in. The game will check license status when you reconnect to the internet. PC Game Pass games require an internet connection check every 30 days to verify your subscription is still active. Cloud gaming requires internet at all times.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
