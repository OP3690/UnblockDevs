'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, CompareTable,
} from '@/components/blog/BlogVisuals';

export default function NintendoSwitchOnlineGamecubeGamesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Nintendo Switch Online GameCube Games — Complete Guide to NSO Expansion Pack</h1>
      <p className="lead">
        Nintendo Switch Online's Expansion Pack tier includes access to classic GameCube titles
        through the Nintendo 64 and GameCube catalog. This guide covers every available game,
        features, pricing, how to set it up, and whether the Expansion Pack is worth it for
        your gaming habits.
      </p>

      <StatGrid stats={[
        { value: 'NSO+', label: 'Expansion Pack required for GameCube library access', color: 'blue' },
        { value: '$49.99', label: 'annual individual price (US) for Expansion Pack', color: 'amber' },
        { value: 'Online play', label: 'multiplayer support for select GameCube titles', color: 'green' },
        { value: 'Save states', label: 'save and rewind feature included for all games', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What is Nintendo Switch Online + Expansion Pack?" />
      <QuickFact color="blue" label="What you get with Expansion Pack">
        The Expansion Pack is the premium tier of Nintendo Switch Online. At $49.99/year (individual)
        or $79.99/year (family plan covering up to 8 accounts), it adds the GameCube game library,
        N64 library, Sega Genesis library, and Animal Crossing: New Horizons Happy Home Paradise DLC.
        Standard NSO ($19.99/year) does NOT include GameCube games — you must upgrade to Expansion Pack.
      </QuickFact>

      <KeyPointsGrid items={[
        { title: 'GameCube games on Switch for the first time', description: 'Nintendo Switch Online brings classic GameCube titles to Switch for the first time officially. These games were previously only playable on GameCube hardware, the Wii (limited backward compatibility), or through unofficial emulation.' },
        { title: 'Streaming vs downloaded — it is downloaded', description: 'NSO GameCube games are not streamed — they download directly to your Switch storage. This means you get full local performance without latency, but you do need sufficient storage space. Each game is a separate download of typically 200-500 MB.' },
        { title: 'Active subscription required to play', description: 'Unlike purchased games, NSO library games require an active Expansion Pack subscription to launch. If your subscription expires, the games remain installed but show as locked until you renew. They do not need to be re-downloaded after renewing.' },
        { title: 'Compatible with all Switch models', description: 'GameCube games via NSO work on original Nintendo Switch, Nintendo Switch Lite, and Nintendo Switch OLED. The OLED model\'s improved screen makes handheld play especially enjoyable for these classic titles.' },
      ]} />

      <SectionHeader number={2} title="NSO Standard vs. Expansion Pack — Full Comparison" />
      <CompareTable
        leftLabel="NSO Standard — $19.99/yr"
        rightLabel="NSO + Expansion Pack — $49.99/yr"
        rows={[
          { label: 'NES library', left: '✓ Included', right: '✓ Included' },
          { label: 'SNES library', left: '✓ Included', right: '✓ Included' },
          { label: 'Game Boy & GBA library', left: '✓ Included', right: '✓ Included' },
          { label: 'Online multiplayer', left: '✓ Included', right: '✓ Included' },
          { label: 'Cloud saves', left: '✓ Included (most games)', right: '✓ Included (most games)' },
          { label: 'Nintendo 64 library', left: '✗ Not included', right: '✓ Included' },
          { label: 'Sega Genesis library', left: '✗ Not included', right: '✓ Included' },
          { label: 'GameCube library', left: '✗ Not included', right: '✓ Included' },
          { label: 'AC: NH DLC (Happy Home Paradise)', left: '✗ Not included', right: '✓ Included' },
          { label: 'Family plan price', left: '$34.99/year (8 accounts)', right: '$79.99/year (8 accounts)' },
        ]}
      />

      <SectionHeader number={3} title="Full List of Available GameCube Games" />
      <KeyPointsGrid items={[
        { title: 'The Legend of Zelda: The Wind Waker', description: 'Cel-shaded Zelda adventure across vast seas. Full game with online play support and save states. One of the most celebrated GameCube titles — playable in handheld and TV mode for the first time through NSO.' },
        { title: 'The Legend of Zelda: Twilight Princess', description: 'The darker, more realistic Zelda entry. Originally a GameCube launch title (later moved to Wii). Full adventure playable on Switch via NSO with save states and online features.' },
        { title: 'F-Zero GX', description: 'Iconic high-speed anti-gravity racing game developed by Sega. Supports online multiplayer on NSO. Often considered the best F-Zero entry — long-awaited by fans requesting it for years.' },
        { title: 'Super Mario Sunshine', description: 'Mario\'s tropical FLUDD-powered adventure on Isle Delfino. Also available in Super Mario 3D All-Stars, but the NSO version includes save states and online play for co-op situations.' },
        { title: 'Luigi\'s Mansion', description: 'Ghost-hunting adventure where Luigi rescues Mario from a haunted mansion. Classic GameCube launch title — now playable in handheld mode for the first time officially.' },
        { title: 'Pikmin 1 & 2', description: 'Both original Pikmin titles in which Captain Olimar commands tiny plant-creatures. Also available as standalone Switch remasters, but NSO versions are included in the subscription at no extra cost.' },
        { title: 'Kirby Air Ride', description: 'Cult classic racing and mini-game collection that fans have requested for years. Finally available with online multiplayer support — City Trial mode is particularly beloved by the community.' },
        { title: 'Donkey Kong Jungle Beat', description: 'Originally designed around bongo controllers, now playable with standard Joy-Con controls. Unique rhythm-action platformer from the GameCube era with impressive visual style.' },
        { title: 'Chibi-Robo!', description: 'Quirky life-simulation game about a tiny household robot. Gained a dedicated fanbase despite limited original distribution. Rare opportunity to play this title on modern hardware.' },
        { title: 'Custom Robo', description: 'Mech battle RPG with deep robot customization and fast arena combat. A niche favorite now accessible to a new generation of players through NSO.' },
      ]} />

      <SectionHeader number={4} title="Features of NSO GameCube Games" />
      <KeyPointsGrid items={[
        { title: 'Online multiplayer', description: 'Select games support online play for features originally limited to local multiplayer. Play F-Zero GX, Kirby Air Ride, and other titles with friends worldwide using Nintendo Switch Online infrastructure.' },
        { title: 'Save states', description: 'Save your exact game state at any moment — not just at in-game save points. Incredibly useful for difficult games or when you need to stop mid-section with no save point nearby.' },
        { title: 'Rewind feature', description: 'Made a mistake? Hold the NSO menu trigger and rewind gameplay a few seconds to retry a difficult section without losing progress or loading from a save state.' },
        { title: 'Video filters', description: 'CRT scanline filter for an authentic retro look, crisp pixel-perfect mode, or smooth modern display. Switch between filters anytime from the in-game NSO overlay menu.' },
        { title: 'Play in any Switch mode', description: 'GameCube games work in TV mode (docked), tabletop mode (kickstand), and handheld mode — something the original GameCube with its disc drive obviously couldn\'t support.' },
        { title: 'Controller support', description: 'Play with Joy-Cons (attached or detached), Switch Pro Controller, or a Nintendo GameCube Controller if you have a GameCube Controller Adapter for Switch. The adapter is sold separately.' },
      ]} />

      <AlertBox type="tip" title="Family plan is the best value for multiple Switch players">
        NSO Expansion Pack family plan ($79.99/year) covers up to 8 Nintendo Accounts in the same family.
        If 2+ people want Expansion Pack, the family plan costs the same as 1.6 individual accounts.
        Each family member gets full, independent access to all GameCube, N64, and Sega Genesis libraries.
      </AlertBox>

      <SectionHeader number={5} title="How to Access GameCube Games on Switch" />
      <VerticalSteps steps={[
        { title: 'Subscribe to NSO Expansion Pack', desc: 'Go to Nintendo eShop → scroll to Nintendo Switch Online → choose the Expansion Pack tier. Select Individual ($49.99/year) or Family plan ($79.99/year for up to 8 accounts). Payment is charged upfront for the full year.' },
        { title: 'Download the Nintendo 64 & GameCube app', desc: 'After subscribing, search the eShop for "Nintendo 64 – Nintendo Switch Online." This single app includes both the N64 and GameCube libraries. Install it from the eShop — it\'s free with your subscription.' },
        { title: 'Browse and launch games', desc: 'Open the app from your Switch home screen. GameCube games are listed in their own section. Select any title and press Download to install that specific game. Each game is a separate download.' },
        { title: 'Set display and control settings', desc: 'Within any game, press ZL+ZR simultaneously (or the NSO button combo) to open the overlay menu. From here, change video filters, create save states, rewind, or adjust other display settings.' },
        { title: 'Set up online play', desc: 'For games with online multiplayer, start a multiplayer session and choose "Online Play" to connect with friends. You\'ll need all players to have their own NSO Expansion Pack subscriptions active.' },
      ]} />

      <SectionHeader number={6} title="Is NSO Expansion Pack Worth It?" />
      <CompareTable
        leftLabel="Worth It If..."
        rightLabel="Less Worth It If..."
        rows={[
          { label: 'Game access', left: 'You want Wind Waker, F-Zero GX, Kirby Air Ride — games unavailable as cheap standalone purchases', right: 'You already own Pikmin 1+2 Remaster, Super Mario 3D All-Stars as standalone games' },
          { label: 'Household size', left: 'Multiple Switch players in household (family plan = ~$10/person/year)', right: 'Solo player who only wants 1-2 specific GameCube titles available as cheap ports' },
          { label: 'Library breadth', left: 'You also want N64 and Sega Genesis games from the Expansion Pack', right: 'You only care about GameCube and already have other platforms for N64/Genesis' },
          { label: 'Cost comparison', left: 'Buying Wind Waker + F-Zero GX + Kirby Air Ride + Luigi\'s Mansion separately = $80-160', right: 'Individual who just wants Super Mario Sunshine (already in 3D All-Stars)' },
        ]}
      />

      <SectionHeader number={7} title="GameCube Controller Setup on Switch" />
      <QuickFact color="green" label="Original GameCube controllers work on Switch">
        You can use original Nintendo GameCube controllers on Switch with the official Nintendo
        GameCube Controller Adapter ($19.99). The adapter connects via USB to the Switch dock.
        Third-party adapters are also available. This is the best way to play F-Zero GX and
        other titles that were designed for the GameCube controller's unique analog triggers.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Purchase a GameCube Controller Adapter for Switch', desc: 'The official Nintendo adapter ($19.99) or a compatible third-party adapter connects up to 4 GameCube controllers. Plug the adapter into your Switch dock\'s USB ports.' },
        { title: 'Connect your GameCube controller', desc: 'Plug any Nintendo GameCube controller (original, third-party, or the official Super Smash Bros. edition) into the adapter ports. The controllers are recognized immediately without additional pairing.' },
        { title: 'Select controller in game', desc: 'Once connected, the GameCube controller appears as a controller option in Switch system settings and in NSO games. Select it as your active controller for the game.' },
        { title: 'Understand button mapping differences', desc: 'GameCube controllers lack ZL, ZR, Home, and Capture buttons present on Switch controllers. NSO overlay menus typically require Joy-Con or Pro Controller buttons. Keep a Joy-Con nearby for accessing save states and rewind.' },
      ]} />

      <CompareTable
        leftLabel="GameCube Controller"
        rightLabel="Switch Pro Controller"
        rows={[
          { label: 'Analog triggers', left: 'Yes — pressure-sensitive L and R triggers', right: 'No — digital triggers only' },
          { label: 'ZL / ZR buttons', left: 'Not present — limits NSO menu access', right: 'Yes — full Switch button complement' },
          { label: 'Ergonomics for GCN games', left: 'Optimal — designed for these games', right: 'Good — comfortable and modern' },
          { label: 'Wireless option', left: 'Only via third-party wireless adapters', right: 'Yes — Bluetooth wireless built in' },
          { label: 'Cost', left: '$20-30 (used) + $20 adapter', right: '$69.99 new' },
          { label: 'Recommended for', left: 'F-Zero GX, Luigi\'s Mansion, Sunshine', right: 'All games — versatile choice' },
        ]}
      />

      <SectionHeader number={8} title="Games NOT Available on NSO (Most Requested)" />
      <KeyPointsGrid items={[
        { title: 'Super Smash Bros. Melee', description: 'The most-requested GameCube game by far. Not currently available on NSO. Melee is unique due to its deep competitive scene, physics engine, and frame-data that differs from any re-release. Licensing and competitive community considerations complicate availability.' },
        { title: 'Metroid Prime', description: 'The acclaimed first-person adventure is available as a standalone Switch remaster (Metroid Prime Remastered, 2023) — not as an NSO title. The remaster features upgraded visuals and controls, making it the definitive version.' },
        { title: 'Mario Kart: Double Dash', description: 'The two-driver kart racing game with unique mechanics is not on NSO. It remains popular for local multiplayer. No official reason has been given for its absence from the NSO library.' },
        { title: 'Animal Crossing (GCN)', description: 'The original Animal Crossing for GameCube is separate from New Horizons. It has not been added to NSO, though Happy Home Paradise DLC for New Horizons is included in the Expansion Pack.' },
        { title: 'Resident Evil 4', description: 'The GameCube version of Resident Evil 4 is not on NSO. The game is available in multiple modern ports and remakes, including the 2023 Remake which is sold separately on Switch.' },
        { title: 'Paper Mario: The Thousand-Year Door', description: 'The beloved RPG sequel is available as a remaster on Switch (2024) sold separately — not as an NSO title. The remaster includes quality-of-life improvements over the GameCube original.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Can I play GameCube games offline with NSO?',
          answer: 'Yes — NSO games can be played offline for up to 7 days after your last online check-in. Connect online at least once a week to maintain offline access. If your NSO subscription expires, you immediately lose access to all NSO library games including GameCube titles — the games remain installed but won\'t launch without an active subscription.',
        },
        {
          question: 'Are all GameCube games available on NSO?',
          answer: 'No — only select titles that Nintendo has licensed and prepared for NSO. Many popular GameCube games (Super Smash Bros. Melee, Metroid Prime, Resident Evil 4, Mario Kart: Double Dash, Animal Crossing) are not available as of 2026. Nintendo adds titles gradually over time. The current library is a curated selection, not the complete GameCube catalog.',
        },
        {
          question: 'Can I play GameCube games with a GameCube controller on Switch?',
          answer: 'Yes — if you have a GameCube Controller Adapter for Nintendo Switch (sold separately), you can use original GameCube controllers or third-party GCN-style controllers. However, some NSO menu functions (accessing save states, rewind, settings) require Joy-Con or Pro Controller buttons since GameCube controllers lack ZL/ZR and some other Switch-specific buttons.',
        },
        {
          question: 'Does NSO Expansion Pack include all future GameCube games added?',
          answer: 'Yes — your subscription gives you access to the entire library as Nintendo adds games over time. New titles added to the GameCube catalog are automatically available to all active Expansion Pack subscribers at no additional cost. You don\'t need to re-subscribe or pay extra when new games are added.',
        },
        {
          question: 'Is NSO Expansion Pack cheaper than buying GameCube games separately?',
          answer: 'For multiple games, usually yes. Individual GameCube games typically cost $20-40 as modern Switch ports. If you want Wind Waker, F-Zero GX, Kirby Air Ride, Luigi\'s Mansion, and Chibi-Robo separately, you\'d spend $100-200. The Expansion Pack at $49.99 covers all of them plus N64, Sega Genesis, and Animal Crossing DLC.',
        },
        {
          question: 'Can family plan members be in different locations?',
          answer: 'The family plan requires accounts to be registered within the same Nintendo Account family group, managed by one adult account. Family members don\'t need to be in the same physical location — each person plays independently on their own Switch. However, all accounts must be from the same country/region when setting up the family group.',
        },
        {
          question: 'Do NSO GameCube games support cloud saves?',
          answer: 'Most NSO GameCube titles support cloud saves, allowing your progress to sync across multiple Switch consoles. However, some titles (as with regular Switch games) may have cloud saves disabled for specific game design reasons. Check the individual game page in the eShop to confirm cloud save support for a specific title.',
        },
        {
          question: 'What video output options are available for GameCube games on NSO?',
          answer: 'NSO GameCube games output at up to 1080p when docked and 720p in handheld mode, significantly sharper than the original GameCube\'s 480p output. The NSO overlay menu offers video filter options: a CRT scanline filter for authentic retro appearance, a pixel-perfect mode that maintains original pixel art sharpness, and a smooth interpolation mode that softens edges for a modern look.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
