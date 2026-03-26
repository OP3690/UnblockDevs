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
        Xbox Game Pass (now branded as Xbox Game Pass Core, Game Pass Standard, and Game Pass
        Ultimate) is Microsoft's subscription gaming service giving access to hundreds of games
        for a monthly fee. This guide covers every tier, what's included, how to maximize value,
        and whether it's worth it compared to buying games outright.
      </p>

      <StatGrid stats={[
        { value: '500+', label: 'games available in the Game Pass library', color: 'green' },
        { value: 'Day 1', label: 'all first-party Xbox titles launch on Game Pass', color: 'blue' },
        { value: '$19.99/mo', label: 'Game Pass Ultimate — all benefits included', color: 'amber' },
        { value: 'PC + Console', label: 'Ultimate covers Xbox, PC, and cloud gaming', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Game Pass Tiers Explained" />
      <QuickFact>
        Microsoft restructured Game Pass in 2024. There are now three tiers: Game Pass Core
        (formerly Xbox Live Gold), Game Pass Standard (console, no day-one releases), and
        Game Pass Ultimate (everything — console, PC, cloud, EA Play, day-one releases).
      </QuickFact>

      <CompareTable
        headers={['Feature', 'Game Pass Core', 'Game Pass Standard', 'Game Pass Ultimate']}
        rows={[
          ['Price (monthly)', '$9.99', '$14.99', '$19.99'],
          ['Console gaming', '✅ Limited library', '✅ Full library', '✅ Full library'],
          ['PC gaming', '❌', '❌', '✅'],
          ['Cloud gaming', '❌', '❌', '✅'],
          ['Day-one releases', '❌', '❌', '✅'],
          ['EA Play included', '❌', '❌', '✅'],
          ['Online multiplayer', '✅', '✅', '✅'],
          ['Member discounts', '✅ 10%', '✅ 10%', '✅ 20%'],
        ]}
      />

      <SectionHeader number={2} title="What Games Are on Game Pass?" />
      <KeyPointsGrid columns={2} items={[
        { title: 'First-party Xbox titles', description: 'Every game from Xbox Game Studios (Halo, Forza, Fable, Starfield, Indiana Jones, Avowed) launches on Game Pass Ultimate day one. This alone provides enormous value — these games retail at $69.99+.' },
        { title: 'Third-party partnerships', description: 'Publishers including Ubisoft, EA, Bethesda, 2K, and Activision add titles to Game Pass. Games rotate in and out monthly — you get notified before removals.' },
        { title: 'EA Play library', description: 'Game Pass Ultimate includes EA Play: FIFA/FC, Madden, Mass Effect Legendary Edition, Dragon Age, Battlefield, The Sims 4, Need for Speed, and more — 80+ EA titles.' },
        { title: 'Indie and AA games', description: 'Hundreds of indie games, many launching day one on Game Pass. Xbox has committed to supporting independent developers with Game Pass as a discovery platform.' },
      ]} />

      <SectionHeader number={3} title="Notable Games Available on Game Pass (2026)" />
      <KeyPointsGrid columns={3} items={[
        { title: 'Halo Infinite', description: 'Flagship Xbox FPS — multiplayer free, campaign on Game Pass.' },
        { title: 'Forza Horizon 5', description: 'Best-rated open-world racing game, Mexico setting.' },
        { title: 'Starfield', description: 'Bethesda\'s space RPG, 1000+ planets to explore.' },
        { title: 'Indiana Jones', description: 'MachineGames\' first-person adventure, critically acclaimed.' },
        { title: 'Avowed', description: 'Obsidian\'s first-person RPG in the Pillars world.' },
        { title: 'Microsoft Flight Simulator', description: 'The most realistic flight sim ever made.' },
        { title: 'Sea of Thieves', description: 'Co-op pirate adventure with continuous free updates.' },
        { title: 'Minecraft', description: 'The best-selling game of all time, on Game Pass.' },
        { title: 'Age of Empires IV', description: 'Microsoft\'s flagship RTS, day-one on Game Pass.' },
      ]} />

      <SectionHeader number={4} title="Is Game Pass Worth It?" />
      <AlertBox type="tip" title="The math strongly favors Game Pass for Xbox players">
        If you play even one first-party title per year (e.g., Starfield at $69.99), Game Pass
        Ultimate pays for itself in under 4 months. Two big titles? It pays for the entire year.
        The calculus flips if you only play live-service games (Warzone, Apex) that are free anyway.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Count how many $60+ games you buy per year', description: 'If you buy 3+ new first-party games annually, Game Pass Ultimate saves money. At $239.88/year vs $209.97+ in game purchases, the math is clear.' },
        { title: 'Consider your platform', description: 'PC players get Game Pass for PC at lower cost. Console-only players can use Standard tier and skip PC features. Cloud gaming is valuable for travel or low-spec devices.' },
        { title: 'Watch for deals', description: 'Microsoft regularly offers 3 months for $1 for new subscribers. Xbox Gift Cards go on sale at Costco, Amazon, and GameStop. Stack deals to reduce effective cost significantly.' },
        { title: 'Check for game removals', description: 'Games rotate out monthly. If a game you want is leaving soon, you can buy it at a member discount (20% off for Ultimate). You keep games you purchase even after cancellation.' },
      ]} />

      <SectionHeader number={5} title="Game Pass vs Buying Games" />
      <CompareTable
        headers={['Factor', 'Game Pass Ultimate', 'Buy Games Outright']}
        rows={[
          ['Upfront cost', 'Low ($20/mo)', 'High ($70 per game)'],
          ['Library access', '500+ games immediately', 'Only games you buy'],
          ['Ownership', 'Access while subscribed', 'Permanent ownership'],
          ['New releases', 'Day one included (1st-party)', 'Must purchase separately'],
          ['Game removals', 'Risk of losing access', 'Never removed'],
          ['Value for heavy players', '✅ Excellent', '❌ Expensive'],
          ['Value for casual players', '❌ May not justify cost', '✅ Better value'],
          ['Cloud gaming', '✅ Included', '❌ Not available'],
        ]}
      />

      <SectionHeader number={6} title="How to Get the Best Deal on Game Pass" />
      <AlertBox type="info" title="Conversion trick — stack Gold then upgrade">
        Xbox Live Gold converts to Game Pass Ultimate at 1:1 ratio up to 36 months. Buy discounted
        Xbox Live Gold codes (often 30-50% off at Costco or during sales), then upgrade to Ultimate
        for $1. This can effectively give you Game Pass Ultimate at $4-6/month.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Do I keep games I download from Game Pass if I cancel?',
          answer: 'No — you lose access to all Game Pass games when your subscription ends. However, any games you purchased at a member discount are yours permanently. Saved game data is retained in cloud saves, so if you resubscribe, you can pick up where you left off.',
        },
        {
          question: 'Can I share Game Pass with family?',
          answer: 'Yes — Xbox Home console sharing allows you to share Game Pass with one other person. Set your Xbox as your "Home Xbox" and any account on that console gets access to your Game Pass games. For PC sharing, Microsoft 365 Family-style sharing is not available for Game Pass, but one home console can be shared.',
        },
        {
          question: 'What is cloud gaming in Game Pass Ultimate?',
          answer: 'Cloud gaming (formerly xCloud) lets you stream Xbox games to any device — Android phone, iPhone (via browser), tablet, PC, or Samsung Smart TV — without downloading. You can play Halo Infinite or Forza Horizon 5 on your phone with a controller. Requires a stable internet connection (15+ Mbps recommended). Great for travel or devices without the hardware to run games.',
        },
        {
          question: 'How often do new games come to Game Pass?',
          answer: 'Microsoft adds games every 2-3 weeks, typically announced via "Xbox Game Pass additions" blog posts. First-party games launch day one. Third-party additions are negotiated deals. Removals also happen monthly — usually 5-10 games leave per month. The library stays relatively stable in size as additions roughly balance removals.',
        },
        {
          question: 'Is Game Pass available outside the US?',
          answer: 'Game Pass is available in 40+ countries. The library varies slightly by region due to licensing agreements. Pricing is localized. Some countries have access to fewer cloud gaming servers, affecting stream quality. Check xbox.com/game-pass for your country\'s availability and pricing.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
