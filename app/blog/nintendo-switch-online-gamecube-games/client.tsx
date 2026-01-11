'use client';

import Link from 'next/link';
import { ArrowLeft, Gamepad2, Calendar, Play, Star, HelpCircle, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function NintendoSwitchGamecubeGamesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nintendo Switch Online GameCube Games: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">What, When, How & Why - Everything About GameCube on Switch</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Nintendo Switch Online GameCube Games: Complete Guide"
        description="What, When, How & Why - Everything About GameCube on Switch"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are Nintendo Switch Online GameCube games?',
              answer: 'Nintendo Switch Online GameCube games are classic GameCube titles available through the Nintendo Switch Online + Expansion Pack subscription service. These games are emulated versions of original GameCube games that can be played on the Nintendo Switch console.',
            },
            {
              question: 'When were GameCube games added to Nintendo Switch Online?',
              answer: 'Nintendo began adding GameCube games to the Switch Online + Expansion Pack service in October 2021. Games are added periodically through updates, with new titles being released regularly to expand the library.',
            },
            {
              question: 'How do I access GameCube games on Nintendo Switch?',
              answer: 'To access GameCube games, you need a Nintendo Switch Online + Expansion Pack membership. Then, open the Nintendo Switch Online app on your Switch, navigate to the GameCube section, and download the games you want to play. Each game is downloaded as a separate app.',
            },
            {
              question: 'Why are GameCube games important for Nintendo Switch Online?',
              answer: 'GameCube games represent a significant era in Nintendo\'s history, featuring beloved classics and innovative gameplay. Adding them to Switch Online preserves gaming history, provides value to subscribers, and allows new generations to experience these iconic titles.',
            },
            {
              question: 'What GameCube games are available on Nintendo Switch Online?',
              answer: 'The library includes classics like Super Mario Sunshine, The Legend of Zelda: The Wind Waker, Luigi\'s Mansion, Metroid Prime, Paper Mario: The Thousand-Year Door, and more. The library continues to expand with new additions regularly.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What are Nintendo Switch Online GameCube Games?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Nintendo Switch Online GameCube games</strong> are classic titles from the Nintendo GameCube console (2001-2007) that have been made available through Nintendo's subscription service, Nintendo Switch Online + Expansion Pack. These games are digitally emulated versions of the original GameCube titles, allowing players to experience these retro classics on modern Nintendo Switch hardware.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The GameCube was Nintendo's sixth-generation home console, known for its innovative controller design, compact disc-based games, and library of critically acclaimed titles. Through the Switch Online service, Nintendo has made these games accessible to a new generation of players while preserving gaming history.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each GameCube game on Switch Online is downloaded as a separate application, similar to how NES and SNES games work on the service. The games run through emulation software that recreates the GameCube hardware environment, allowing for features like save states, rewind functionality, and online multiplayer in some cases.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> GameCube games on Switch Online are part of the Expansion Pack tier, which requires a higher subscription fee than the base Nintendo Switch Online membership.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding the GameCube Library on Switch</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Nintendo Switch Online GameCube library includes a curated selection of classic titles, each offering unique features and gameplay experiences:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Classic First-Party Titles
                </h3>
                <p className="text-gray-700 text-sm mb-2">Iconic Nintendo franchises including Super Mario Sunshine, The Legend of Zelda: The Wind Waker, Luigi's Mansion, Metroid Prime, and Paper Mario: The Thousand-Year Door.</p>
                <p className="text-gray-600 text-xs">These are some of the most beloved games in Nintendo's history, remastered for modern hardware.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Enhanced Features
                </h3>
                <p className="text-gray-700 text-sm mb-2">Games include modern enhancements like save states, rewind functionality, improved resolution, and in some cases, online multiplayer support.</p>
                <p className="text-gray-600 text-xs">These features weren't available in the original GameCube versions, making the Switch versions more accessible.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-600" />
                  Individual App Downloads
                </h3>
                <p className="text-gray-700 text-sm mb-2">Unlike NES/SNES games which are bundled in collections, each GameCube game is a separate downloadable app with its own icon and menu.</p>
                <p className="text-gray-600 text-xs">This allows for larger file sizes and more sophisticated emulation for each title.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  Growing Library
                </h3>
                <p className="text-gray-700 text-sm mb-2">Nintendo regularly adds new GameCube titles to the service, expanding the library over time with fan favorites and hidden gems.</p>
                <p className="text-gray-600 text-xs">The library started with a few titles and continues to grow based on community feedback and licensing agreements.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Notable Games Available:</strong> Super Mario Sunshine, The Legend of Zelda: The Wind Waker, Luigi's Mansion, Metroid Prime, Paper Mario: The Thousand-Year Door, Pikmin, Pikmin 2, and more titles are added regularly.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Timeline of GameCube Games on Switch</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding when GameCube games were added and when to expect new releases:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">October 2021 - Initial Launch</h3>
                  <p className="text-gray-700 text-sm">Nintendo Switch Online + Expansion Pack launched with the first GameCube titles, including Super Mario Sunshine and The Legend of Zelda: The Wind Waker.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">2022 - Library Expansion</h3>
                  <p className="text-gray-700 text-sm">Throughout 2022, Nintendo added more titles including Luigi's Mansion, Metroid Prime, and Paper Mario: The Thousand-Year Door, expanding the library significantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">2023 - Continued Growth</h3>
                  <p className="text-gray-700 text-sm">The library continued to grow with additions like Pikmin, Pikmin 2, and other fan-requested titles, showing Nintendo's commitment to expanding the service.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Ongoing - Regular Updates</h3>
                  <p className="text-gray-700 text-sm">Nintendo continues to add new GameCube games periodically, typically announced through Nintendo Direct presentations or social media updates.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Tip:</strong> Follow Nintendo's official channels and Nintendo Direct presentations to stay updated on new GameCube game additions to the service.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Accessing GameCube Games on Switch</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these steps to access and play GameCube games on your Nintendo Switch:
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Subscribe to Nintendo Switch Online + Expansion Pack</h3>
                  <p className="text-gray-700 text-sm mb-2">GameCube games require the Expansion Pack tier, not the base Nintendo Switch Online membership. Subscribe through the Nintendo eShop or Nintendo's website.</p>
                  <p className="text-gray-600 text-xs">The Expansion Pack includes GameCube games, N64 games, Sega Genesis games, and DLC for select titles like Animal Crossing and Mario Kart 8.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Open Nintendo Switch Online App</h3>
                  <p className="text-gray-700 text-sm mb-2">From your Switch home screen, open the Nintendo Switch Online application (the icon with the NSO logo).</p>
                  <p className="text-gray-600 text-xs">This app is pre-installed on all Switch consoles and serves as the hub for all classic games.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Navigate to GameCube Section</h3>
                  <p className="text-gray-700 text-sm mb-2">Within the Nintendo Switch Online app, scroll to find the GameCube section or use the menu to filter by console.</p>
                  <p className="text-gray-600 text-xs">The app organizes games by console: NES, SNES, N64, GameCube, and Sega Genesis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Select and Download Games</h3>
                  <p className="text-gray-700 text-sm mb-2">Browse available GameCube games and select the one you want to play. Click "Download" to install it to your Switch.</p>
                  <p className="text-gray-600 text-xs">Each game downloads as a separate app, so make sure you have enough storage space on your Switch or microSD card.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Launch and Play</h3>
                  <p className="text-gray-700 text-sm mb-2">Once downloaded, the game appears on your home screen like any other Switch game. Launch it and start playing!</p>
                  <p className="text-gray-600 text-xs">Games support standard Switch controls, with button mapping optimized for the Switch controller layout.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Use Enhanced Features</h3>
                  <p className="text-gray-700 text-sm mb-2">Take advantage of modern features like save states, rewind functionality, and online multiplayer (where available) by pressing the ZL and ZR buttons.</p>
                  <p className="text-gray-600 text-xs">These features make classic games more accessible and enjoyable for modern players.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Pro Tip:</strong> You can create multiple save states for each game, allowing you to experiment with different choices or replay favorite sections without losing progress.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why GameCube Games Matter on Switch</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              GameCube games on Nintendo Switch Online serve several important purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Preserving Gaming History
                </h3>
                <p className="text-gray-700 text-sm">GameCube games represent an important era in gaming history. Making them accessible on modern hardware ensures these classics aren't lost to time and can be enjoyed by future generations.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-green-600" />
                  Value for Subscribers
                </h3>
                <p className="text-gray-700 text-sm">Adding GameCube games increases the value proposition of the Expansion Pack subscription, giving players access to a library of premium retro games for a monthly fee.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Introducing Classics to New Players
                </h3>
                <p className="text-gray-700 text-sm">Many younger players never experienced GameCube games. The Switch Online service introduces these beloved titles to a new generation, expanding their appreciation for gaming history.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Enhanced Accessibility
                </h3>
                <p className="text-gray-700 text-sm">Modern features like save states and rewind make these classic games more accessible to players who might find the original difficulty or lack of modern conveniences challenging.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Cultural Impact:</strong> GameCube games like The Wind Waker and Super Mario Sunshine have influenced game design for decades. Making them accessible ensures their legacy continues to inspire future game developers.
              </p>
            </div>
          </section>

          {/* Popular Games Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular GameCube Games Available</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Super Mario Sunshine</h3>
                <p className="text-gray-700 text-sm">Mario's tropical adventure with the FLUDD water pack, featuring vibrant graphics and innovative gameplay mechanics.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">The Legend of Zelda: The Wind Waker</h3>
                <p className="text-gray-700 text-sm">Link's cel-shaded adventure across the Great Sea, known for its unique art style and expansive world.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Luigi's Mansion</h3>
                <p className="text-gray-700 text-sm">Luigi's ghost-hunting adventure, featuring atmospheric gameplay and charming character design.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Metroid Prime</h3>
                <p className="text-gray-700 text-sm">Samus Aran's first-person adventure, revolutionizing the Metroid series with 3D exploration and combat.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                <h3 className="font-semibold text-gray-900 mb-2">Paper Mario: The Thousand-Year Door</h3>
                <p className="text-gray-700 text-sm">Mario's RPG adventure with unique paper-based mechanics and engaging storytelling.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Pikmin & Pikmin 2</h3>
                <p className="text-gray-700 text-sm">Captain Olimar's real-time strategy adventures, featuring charming Pikmin creatures and puzzle-solving gameplay.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need the Expansion Pack to play GameCube games?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, GameCube games are exclusive to the Nintendo Switch Online + Expansion Pack tier. The base Nintendo Switch Online membership only includes NES and SNES games.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I play GameCube games offline?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, once downloaded, GameCube games can be played offline. However, you need an active Expansion Pack subscription to download and initially launch the games.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Are all GameCube games available on Switch?</h3>
                <p className="text-gray-700 leading-relaxed">No, only a curated selection of GameCube games are available. Nintendo adds titles gradually based on licensing agreements, technical feasibility, and community demand.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do GameCube games support online multiplayer?</h3>
                <p className="text-gray-700 leading-relaxed">Some GameCube games on Switch Online support online multiplayer, but not all. Nintendo has added online functionality to select titles like Mario Kart 64 and others.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How much storage do GameCube games take?</h3>
                <p className="text-gray-700 leading-relaxed">GameCube games typically range from 500MB to 2GB per title, depending on the game. Make sure you have sufficient storage space on your Switch or microSD card.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Nintendo Switch Online GameCube Games: Complete Guide"
            description="What, When, How & Why - Everything About GameCube on Switch"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Nintendo Switch Online GameCube Games Guide" />
        </section>
      </main>
    </div>
  );
}
