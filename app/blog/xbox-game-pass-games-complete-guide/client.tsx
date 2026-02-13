'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Info, Zap, DollarSign, Gamepad2, Users, Star, TrendingUp } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function XboxGamePassGuideClient() {
  const faqData = [
    {
      question: 'What is Xbox Game Pass?',
      answer: 'Xbox Game Pass is a subscription service from Microsoft that gives you access to a library of over 400+ games for a monthly fee. It includes Xbox exclusives, indie games, AAA titles, and new releases available on day one. Available on Xbox consoles, PC, and cloud gaming.'
    },
    {
      question: 'How much does Xbox Game Pass cost?',
      answer: 'Xbox Game Pass Core: $9.99/month (online multiplayer + select games). Game Pass Console: $10.99/month (Xbox games library). Game Pass PC: $9.99/month (PC games library). Game Pass Ultimate: $16.99/month (includes everything: console, PC, cloud gaming, Xbox Live Gold, EA Play, and perks).'
    },
    {
      question: 'What games are included in Xbox Game Pass?',
      answer: 'Xbox Game Pass includes 400+ games including first-party Xbox exclusives (Halo, Forza, Gears of War), popular AAA titles, indie games, and new releases available on day one. Games rotate monthly, with new additions and some removals. Microsoft first-party games stay permanently.'
    },
    {
      question: 'Is Xbox Game Pass worth it?',
      answer: 'Yes, Xbox Game Pass is worth it if you play 2-3 games per month. At $16.99/month for Ultimate, you get access to hundreds of games worth thousands of dollars. If you buy even 2-3 games per year, Game Pass pays for itself. Plus you get day-one access to new Xbox exclusives.'
    },
    {
      question: 'Can I keep games after Game Pass expires?',
      answer: 'No, you cannot keep games after your Game Pass subscription expires. Games are only playable while your subscription is active. However, you can purchase games at a discount (up to 20% off) while they\'re on Game Pass, and those purchases are permanent.'
    },
    {
      question: 'What is the difference between Game Pass and Game Pass Ultimate?',
      answer: 'Game Pass (Console or PC) gives access to the game library on one platform. Game Pass Ultimate includes both console and PC libraries, plus cloud gaming, Xbox Live Gold for online multiplayer, EA Play subscription, and exclusive member perks and discounts.'
    },
    {
      question: 'Do games leave Xbox Game Pass?',
      answer: 'Yes, some games leave Game Pass monthly, usually with 2 weeks notice. Microsoft first-party games (Halo, Forza, Gears) stay permanently. Third-party games typically stay 12-18 months. You can purchase games at a discount before they leave to keep them permanently.'
    },
    {
      question: 'Can I share Xbox Game Pass with family?',
      answer: 'Yes, with Game Pass Ultimate, you can share with family using Xbox Game Sharing. Set your Xbox as your "Home Xbox" and family members can access your Game Pass library. You can also use the same account on multiple devices (Xbox, PC, mobile).'
    }
  ];

  const bestGames = [
    { name: 'Halo Infinite', category: 'First-Person Shooter', rating: '9/10', why: 'Xbox exclusive, multiplayer, campaign' },
    { name: 'Forza Horizon 5', category: 'Racing', rating: '9.5/10', why: 'Stunning graphics, open world, car collection' },
    { name: 'Starfield', category: 'RPG', rating: '9/10', why: 'Day-one release, massive space exploration' },
    { name: 'Gears 5', category: 'Third-Person Shooter', rating: '8.5/10', why: 'Xbox exclusive, co-op, story' },
    { name: 'Sea of Thieves', category: 'Adventure', rating: '8/10', why: 'Online multiplayer, pirate adventure' },
    { name: 'Microsoft Flight Simulator', category: 'Simulation', rating: '9/10', why: 'Realistic flight, global map' },
    { name: 'Persona 5 Royal', category: 'JRPG', rating: '10/10', why: 'Critically acclaimed, deep story' },
    { name: 'Yakuza: Like a Dragon', category: 'Action RPG', rating: '9/10', why: 'Unique combat, engaging story' },
    { name: 'Dead Space Remake', category: 'Horror', rating: '9/10', why: 'Atmospheric horror, remastered' },
    { name: 'Hi-Fi Rush', category: 'Action', rating: '9/10', why: 'Rhythm-based combat, stylish' },
  ];

  const membershipTiers = [
    {
      name: 'Game Pass Core',
      price: '$9.99/month',
      features: [
        'Online multiplayer',
        '25+ select games',
        'Member discounts',
        'Free games monthly'
      ],
      bestFor: 'Casual gamers who want online multiplayer'
    },
    {
      name: 'Game Pass Console',
      price: '$10.99/month',
      features: [
        '400+ Xbox games',
        'Day-one Xbox exclusives',
        'Member discounts',
        'Xbox Cloud Gaming (mobile)'
      ],
      bestFor: 'Xbox console owners'
    },
    {
      name: 'Game Pass PC',
      price: '$9.99/month',
      features: [
        '400+ PC games',
        'Day-one Xbox exclusives',
        'EA Play included',
        'Member discounts'
      ],
      bestFor: 'PC gamers'
    },
    {
      name: 'Game Pass Ultimate',
      price: '$16.99/month',
      features: [
        'Everything in Console + PC',
        'Xbox Live Gold included',
        'EA Play included',
        'Cloud gaming (Xbox, PC, mobile)',
        'Exclusive perks and rewards',
        'Best value option'
      ],
      bestFor: 'Gamers who want everything'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Developer Study Materials</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              February 2, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              22 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Xbox Game Pass Games: Complete Guide to Best Games, Value & Membership
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover everything about Xbox Game Pass: what games are included, why it's the best gaming subscription, 
            how to maximize value, membership tiers, best games to play, and expert tips. Your complete guide to Game Pass.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#what-is-game-pass" className="text-blue-600 hover:underline">What is Xbox Game Pass?</a></li>
            <li><a href="#why-game-pass" className="text-blue-600 hover:underline">Why Choose Game Pass?</a></li>
            <li><a href="#how-it-works" className="text-blue-600 hover:underline">How Game Pass Works</a></li>
            <li><a href="#membership-tiers" className="text-blue-600 hover:underline">Membership Tiers Explained</a></li>
            <li><a href="#best-games" className="text-blue-600 hover:underline">Best Games on Game Pass</a></li>
            <li><a href="#dos-donts" className="text-blue-600 hover:underline">Dos and Don'ts</a></li>
            <li><a href="#value-analysis" className="text-blue-600 hover:underline">Value Analysis</a></li>
            <li><a href="#tips" className="text-blue-600 hover:underline">Expert Tips</a></li>
          </ul>
        </div>

        {/* What is Game Pass */}
        <section id="what-is-game-pass" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-green-600" />
            What is Xbox Game Pass?
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            <strong>Xbox Game Pass</strong> is Microsoft's subscription-based gaming service that provides unlimited access 
            to a curated library of over 400+ games for a monthly fee. Think of it as "Netflix for games" - you pay a 
            subscription and get access to a rotating library of games instead of buying them individually.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features of Xbox Game Pass</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>400+ Games:</strong> Access to a massive library of games across multiple genres</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Day-One Releases:</strong> New Xbox first-party games available immediately on release day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Multi-Platform:</strong> Play on Xbox consoles, PC, and mobile devices via cloud gaming</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Member Discounts:</strong> Up to 20% off game purchases and 10% off DLC</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>EA Play Included:</strong> Access to EA's game library (Ultimate tier)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Cloud Gaming:</strong> Stream games to mobile devices, tablets, and browsers</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Game Pass Mission & Vision</h3>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Mission:</strong> Xbox Game Pass aims to make gaming more accessible and affordable by removing 
              barriers to entry. Instead of spending $60-70 per game, gamers can access hundreds of games for a low 
              monthly fee, democratizing access to premium gaming experiences.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Vision:</strong> Microsoft envisions Game Pass as the future of gaming consumption, where players 
              discover new games, try before they buy, and enjoy a constantly refreshed library. The service encourages 
              exploration and reduces the financial risk of trying new games.
            </p>
          </div>
        </section>

        {/* Why Game Pass */}
        <section id="why-game-pass" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-600" />
            Why Choose Xbox Game Pass?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Xbox Game Pass offers exceptional value for gamers. Here's why millions of subscribers choose Game Pass 
            over buying games individually:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Incredible Value
              </h3>
              <p className="text-gray-700 mb-3">
                At $16.99/month for Ultimate, you get access to games worth thousands of dollars. If you play just 
                2-3 games per year, Game Pass pays for itself.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Save $500+ per year vs buying games</li>
                <li>• Try games risk-free</li>
                <li>• No commitment - cancel anytime</li>
                <li>• Member discounts on purchases</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-600" />
                Day-One Exclusives
              </h3>
              <p className="text-gray-700 mb-3">
                All new Xbox first-party games launch on Game Pass on release day. Play Starfield, Halo Infinite, 
                Forza Horizon 5, and more without buying them.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• No waiting for sales</li>
                <li>• Play immediately on launch</li>
                <li>• Access to all Xbox exclusives</li>
                <li>• Future Bethesda games included</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Discover New Games
              </h3>
              <p className="text-gray-700 mb-3">
                Game Pass encourages experimentation. Try games you'd never buy, discover hidden gems, and explore 
                new genres without financial risk.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Try before you buy</li>
                <li>• Discover indie gems</li>
                <li>• Explore new genres</li>
                <li>• No buyer's remorse</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                Constantly Updated
              </h3>
              <p className="text-gray-700 mb-3">
                New games are added monthly, keeping the library fresh. Microsoft adds 10-20 new games per month, 
                including day-one releases and popular titles.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 10-20 new games monthly</li>
                <li>• Regular library updates</li>
                <li>• Seasonal additions</li>
                <li>• Community requests considered</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-8 h-8 text-blue-600" />
            How Xbox Game Pass Works
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Process</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Subscribe</h4>
                  <p className="text-gray-700 text-sm">Choose your tier (Core, Console, PC, or Ultimate) and subscribe via Xbox website, console, or Microsoft Store.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Browse Library</h4>
                  <p className="text-gray-700 text-sm">Access the Game Pass library on your Xbox, PC, or mobile app. Browse by genre, popularity, or new additions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Install & Play</h4>
                  <p className="text-gray-700 text-sm">Click "Install" to download games to your device. Games install like regular purchases and can be played offline (after initial download).</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Enjoy & Discover</h4>
                  <p className="text-gray-700 text-sm">Play as much as you want. Try new games, complete achievements, and discover your next favorite game. Cancel anytime.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How Games Are Added & Removed</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Games Added Monthly
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 10-20 new games added each month</li>
                <li>• Day-one releases of Xbox exclusives</li>
                <li>• Popular third-party titles</li>
                <li>• Indie game highlights</li>
                <li>• Games typically added on 1st and 15th of month</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Games Removed Monthly
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Some games leave after 12-18 months</li>
                <li>• 2 weeks notice before removal</li>
                <li>• Microsoft first-party games stay permanently</li>
                <li>• Purchase discount offered before removal</li>
                <li>• Your saves and progress are preserved</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section id="membership-tiers" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Tiers Explained</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-lg border-2 border-gray-200 shadow-lg overflow-hidden">
                <div className={`p-4 ${index === 3 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-800 text-white'}`}>
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className="text-lg mt-1">{tier.price}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-4">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>Best for:</strong> {tier.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Games */}
        <section id="best-games" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Games on Xbox Game Pass</h2>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Game</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Why Play</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bestGames.map((game, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{game.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{game.category}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                          {game.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{game.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Dos and Don'ts */}
        <section id="dos-donts" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dos and Don'ts</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Dos
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do take advantage of day-one releases</strong> - Play new Xbox exclusives immediately without buying</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do try games you wouldn't normally buy</strong> - Discover new genres and indie gems risk-free</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do use member discounts</strong> - Save 20% on games and 10% on DLC when purchasing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do check the "Leaving Soon" section</strong> - Play games before they're removed or buy at discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do download games you're interested in</strong> - Install multiple games to try later</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do use cloud gaming for mobile</strong> - Play on your phone or tablet when away from console</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do share with family</strong> - Use Xbox Game Sharing to share your subscription</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                Don'ts
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't assume games stay forever</strong> - Third-party games can leave, so play them while available</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't forget to cancel if not using</strong> - If you're not playing regularly, pause your subscription</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't ignore the "Leaving Soon" notice</strong> - You get 2 weeks to finish games before they leave</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't buy games you can play on Game Pass</strong> - Check the library before purchasing</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't subscribe to multiple tiers</strong> - Ultimate includes everything, don't pay twice</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't expect to keep games after cancellation</strong> - Games are only playable while subscribed</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't ignore internet requirements</strong> - Cloud gaming needs stable internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Value Analysis */}
        <section id="value-analysis" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Value Analysis: Is Game Pass Worth It?</h2>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">The Math</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold mb-2">$16.99</p>
                <p className="text-blue-100">Per Month (Ultimate)</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">$203.88</p>
                <p className="text-blue-100">Per Year</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">400+</p>
                <p className="text-blue-100">Games Available</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Comparison</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <span className="text-gray-700"><strong>Buying 3 AAA games per year:</strong></span>
                <span className="text-xl font-bold text-gray-900">$180-210</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded">
                <span className="text-gray-700"><strong>Game Pass Ultimate (1 year):</strong></span>
                <span className="text-xl font-bold text-green-600">$203.88</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded">
                <span className="text-gray-700"><strong>Value of Game Pass library:</strong></span>
                <span className="text-xl font-bold text-blue-600">$10,000+</span>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              <strong>Conclusion:</strong> If you play 2-3 games per year, Game Pass pays for itself. The library value 
              is worth thousands, making it one of the best deals in gaming.
            </p>
          </div>
        </section>

        {/* Expert Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Tips for Maximum Value</h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Look for Promotional Deals</h3>
              <p className="text-gray-700 text-sm">
                Microsoft often offers promotional pricing, especially for new subscribers. Look for "$1 for first month" 
                deals or discounted annual subscriptions. You can also convert Xbox Live Gold to Game Pass Ultimate at a 
                discount (1:1 conversion ratio).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Prioritize Day-One Releases</h3>
              <p className="text-gray-700 text-sm">
                Focus on playing Xbox first-party games that launch on Game Pass day-one. These are typically $60-70 
                games you get "free" with your subscription. Starfield, Halo Infinite, and Forza Horizon 5 are perfect examples.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Use the Mobile App</h3>
              <p className="text-gray-700 text-sm">
                Download the Xbox app to browse and install games remotely. You can queue downloads to your console from 
                your phone, so games are ready when you get home. Also use it for cloud gaming on mobile devices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Check "Leaving Soon" Regularly</h3>
              <p className="text-gray-700 text-sm">
                Microsoft gives 2 weeks notice before games leave. Check this section regularly and either finish games 
                you're playing or purchase them at the member discount (up to 20% off) to keep them permanently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Try Before You Buy</h3>
              <p className="text-gray-700 text-sm">
                Use Game Pass as a "try before you buy" service. Play games on Game Pass, and if you love them and want 
                to own them permanently, purchase at the member discount. This way you never waste money on games you don't enjoy.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Schema */}
        <FAQSchema faqs={faqData} />
      </article>
    </div>
  );
}

