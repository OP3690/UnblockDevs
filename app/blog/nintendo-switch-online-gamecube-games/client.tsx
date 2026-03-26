'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function NintendoSwitchOnlineGamecubeGamesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Nintendo Switch Online GameCube Games — Complete Guide to NSO + Expansion Pack</h1>
      <p className="lead">
        Nintendo Switch Online's Expansion Pack tier includes access to classic GameCube titles
        through the Nintendo 64 and GameCube catalog. This guide covers every available game,
        features, pricing, and how to set it up.
      </p>

      <StatGrid stats={[
        { value: 'NSO+', label: 'Expansion Pack required for GameCube library', color: 'blue' },
        { value: '$49.99', label: 'annual individual price for NSO Expansion Pack (US)', color: 'amber' },
        { value: 'Online play', label: 'multiplayer support for select GameCube titles', color: 'green' },
        { value: 'Save states', label: 'rewind and save anywhere feature included', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What is Nintendo Switch Online + Expansion Pack?" />
      <QuickFact>
        The Expansion Pack is the premium tier of Nintendo Switch Online ($49.99/year individual,
        $79.99/year family). It adds: GameCube game library, Nintendo 64 library, Sega Genesis
        library, and Animal Crossing: New Horizons DLC (Happy Home Paradise). Standard NSO
        ($19.99/year) does NOT include GameCube games.
      </QuickFact>

      <SectionHeader number={2} title="Available GameCube Games" />
      <KeyPointsGrid columns={2} items={[
        { title: 'The Legend of Zelda: The Wind Waker', description: 'The beloved cel-shaded Zelda adventure. Full game with online play support. One of the most celebrated GameCube titles, now accessible to Switch owners.' },
        { title: 'F-Zero GX', description: 'The iconic high-speed racing game. Supports online multiplayer — race against others worldwide. Often considered the best F-Zero entry.' },
        { title: 'Super Mario Sunshine', description: 'Mario\'s tropical adventure with FLUDD. Also available in Super Mario 3D All-Stars, but NSO version includes save states and online multiplayer.' },
        { title: 'Luigi\'s Mansion', description: 'The ghost-hunting adventure where Luigi must rescue Mario. Classic GameCube launch title now playable on Switch.' },
        { title: 'Pikmin 1 & 2', description: 'Both original Pikmin titles. Also available as standalone remasters, but NSO versions are included in the subscription.' },
        { title: 'Kirby Air Ride', description: 'Cult classic racing/mini-game collection. Long-requested by fans and finally available to play online with friends.' },
      ]} />

      <SectionHeader number={3} title="Features of GameCube NSO Games" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Online multiplayer', description: 'Select games support online play for features that were originally local multiplayer only. NSO subscription enables this across all supported titles.' },
        { title: 'Save states', description: 'Save your progress at any point — not just at official save points. Resume exactly where you left off without backtracking.' },
        { title: 'Rewind feature', description: 'Made a mistake? Rewind gameplay a few seconds to retry a difficult section without loading a save state.' },
        { title: 'Video filters', description: 'Apply CRT filter for authentic retro look, or play in crisp modern display mode. Pixel-perfect display option also available.' },
      ]} />

      <AlertBox type="tip" title="Family plan is the best value">
        NSO Expansion Pack family plan ($79.99/year) covers up to 8 Nintendo Accounts.
        If 2+ people in your household want NSO, the family plan costs the same as ~1.6 individual
        accounts. Each family member gets full access to all GameCube, N64, and other libraries.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Can I play GameCube games offline with NSO?',
          answer: 'Yes — NSO games can be played offline for up to 7 days after your last online check-in. Connect online at least once a week to maintain offline access. If your NSO subscription expires, you lose access to all NSO library games including GameCube titles.',
        },
        {
          question: 'Are all GameCube games available on NSO?',
          answer: 'No — only select titles Nintendo has chosen to include. Many popular GameCube games (Melee, Metroid Prime, Resident Evil 4, Mario Kart: Double Dash) are not yet available as of 2026. Nintendo adds titles gradually. The current library is smaller than the full GameCube catalog.',
        },
        {
          question: 'Is NSO Expansion Pack worth it?',
          answer: 'If you want GameCube and N64 classics plus Animal Crossing DLC: yes. If you already own most GameCube games via standalone Switch releases (Pikmin remasters, 3D All-Stars), the value is lower. The family plan makes it significantly better value. Annual subscribers get the best cost-per-month.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
