import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, CheckCircle, Info, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Upper Back, Trapezius & Cervicogenic Dizziness Exercises | Video Guide',
  description:
    'Curated video guide for relieving upper back stiffness, tight trapezius muscles, thoracic spine tightness, and cervicogenic dizziness — with an educational animation showing how neck tilt increases spinal load.',
  alternates: { canonical: 'https://unblockdevs.com/upper-back-exercises' },
  openGraph: {
    title: 'Upper Back & Cervicogenic Dizziness Exercises — Video Guide',
    description:
      'Relief exercises for upper back stiffness, trapezius tightness, thoracic mobility, and cervicogenic dizziness — categorized and curated for home use.',
    url: 'https://unblockdevs.com/upper-back-exercises',
    siteName: 'UnblockDevs',
    type: 'article',
  },
};

interface VideoCard {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

const sections: {
  id: string;
  emoji: string;
  heading: string;
  subheading: string;
  color: string;
  videos: VideoCard[];
}[] = [
  {
    id: 'quick-relief',
    emoji: '⚡',
    heading: 'Quick Relief',
    subheading: 'Do these right now — under 2 minutes each',
    color: 'blue',
    videos: [
      {
        id: '8DoHhAaRxy8',
        title: 'Relieve a Tight Upper Back in 30 Seconds',
        description: 'Dr. Rowe demonstrates easy exercises for instant upper back tightness relief.',
        tag: '30 sec',
      },
      {
        id: 'RTzXF8Zd5aI',
        title: '4 Exercises to Relieve Upper Back Pain in 60 Seconds',
        description: 'Simple stretches demonstrated by a physical therapist — no equipment needed.',
        tag: '60 sec',
      },
    ],
  },
  {
    id: 'follow-along',
    emoji: '🎯',
    heading: 'Follow-Along Routines',
    subheading: 'Full routines for daily practice',
    color: 'indigo',
    videos: [
      {
        id: 'IOukY_GzDFc',
        title: 'Upper Back Pain Relief Exercises (10 Min)',
        description: 'A 10-minute routine to stretch stiff neck and upper back muscles.',
        tag: '10 min',
      },
      {
        id: 'vuGnzLxRvZM',
        title: '7 Upper Back Stretches for Pain Relief',
        description: 'Seven stretches to release tightness in upper back, shoulders and neck.',
        tag: '7 stretches',
      },
    ],
  },
  {
    id: 'thoracic',
    emoji: '🦴',
    heading: 'Thoracic Spine Mobility',
    subheading: 'Address the root cause of the cracking and stiffness',
    color: 'violet',
    videos: [
      {
        id: '5wv670fHuG4',
        title: 'The Ultimate Thoracic Mobility Routine',
        description:
          'Dr. Aaron Horschig covers how to screen your thoracic spine mobility and fix restrictions.',
        tag: 'Corrective',
      },
      {
        id: 'h54us18qc20',
        title: '11 Thoracic Spine Rotation Exercises',
        description: '11 thoracic spine rotation exercises to loosen up stiff mid-back joints.',
        tag: '11 drills',
      },
      {
        id: 's-7lyvblFNI',
        title: 'Neck, Shoulder & Upper Back — Yoga Flow',
        description: 'A 10-minute yoga-inspired routine to reduce tension across neck, shoulders, and upper back.',
        tag: '10 min yoga',
      },
    ],
  },
  {
    id: 'trapezius',
    emoji: '💪',
    heading: 'Upper Trapezius Stiffness',
    subheading: 'Stretches and exercises for tight trap muscles — the muscle that hunches your shoulders',
    color: 'rose',
    videos: [
      {
        id: '7hKHOJbJ8_k',
        title: 'How to Relieve Upper Trapezius Pain FAST',
        description:
          'Quick techniques to relieve the tight band of muscle running from neck to shoulder — try this first.',
        tag: 'Start here',
      },
      {
        id: 'BfeRGHsmwf4',
        title: 'STOP Upper Trap Pain — Instant Relief & Long-Term Fix',
        description:
          'Covers both immediate relief strategies and the strengthening exercises needed for a lasting fix.',
        tag: 'Instant + fix',
      },
      {
        id: '4D6_sK6hxLQ',
        title: 'Tight Upper Traps? Try These Exercises',
        description:
          'Targeted exercises for upper trapezius tightness — identifies why the trap overworks and how to correct it.',
        tag: 'Exercises',
      },
      {
        id: 'iwIiqaTXAq4',
        title: 'RELEASE Upper Trap & Levator Scapulae FOR GOOD',
        description:
          'Precision Movement covers the upper trap and levator scapulae together — two muscles that always tighten as a pair.',
        tag: 'Deep release',
      },
      {
        id: 'nljhvqIq0Tk',
        title: 'Tight Upper Trap Muscles — Stretches & Exercises',
        description:
          'Full stretch and strengthening sequence for shoulder and neck pain driven by tight upper traps.',
        tag: 'Full routine',
      },
    ],
  },
  {
    id: 'dizziness',
    emoji: '🌀',
    heading: 'Cervicogenic Dizziness',
    subheading: 'Dizziness and balance issues caused by neck / upper back tightness',
    color: 'teal',
    videos: [
      {
        id: 'TZMKwMJfSKQ',
        title: 'Stop Cervicogenic Dizziness in 2 Minutes',
        description:
          'Explains cervicogenic dizziness, how to identify it, and 3 easy relief exercises.',
        tag: 'Start here',
      },
      {
        id: 'RCOVz5kD3hs',
        title: 'BEST Exercise to STOP Cervicogenic Dizziness',
        description:
          'The single most effective exercise for neck-related dizziness, clearly demonstrated.',
        tag: 'High impact',
      },
      {
        id: 'oXpeXX5uYs0',
        title: 'Cervicogenic Dizziness Relief Exercises',
        description:
          'Cervical spine flexor/extensor strengthening plus a balance improvement exercise.',
        tag: 'Strength',
      },
      {
        id: '29rXWlO-evM',
        title: '10 Easy Home Exercises for Cervicogenic Vertigo',
        description: 'Comprehensive 10-exercise home routine targeting cervical musculoskeletal issues.',
        tag: '10 exercises',
      },
      {
        id: '5UqckZnYXes',
        title: 'Cervical Vertigo Relief Stretches & Exercises',
        description: 'Covers disorientation and unsteadiness caused by cervical spine conditions.',
        tag: 'Stretches',
      },
      {
        id: '1GgQBi7_HZk',
        title: 'Hidden Shoulder Muscles Causing Dizziness (4 Exercises)',
        description:
          "If neck exercises only help temporarily, the problem may be your shoulder blade muscles — often missed.",
        tag: 'Often missed',
      },
      {
        id: 'wuux0DFEyAc',
        title: 'Stop Cervicogenic Dizziness — 3 Relief Exercises',
        description: '3 exercises for cervicogenic dizziness, occipital neuralgia, and cervicogenic headaches.',
        tag: '3 exercises',
      },
    ],
  },
];

const colorMap: Record<string, { border: string; badge: string; heading: string }> = {
  blue:   { border: 'border-blue-200',   badge: 'bg-blue-50 text-blue-700 border border-blue-200',     heading: 'text-blue-700' },
  indigo: { border: 'border-indigo-200', badge: 'bg-indigo-50 text-indigo-700 border border-indigo-200', heading: 'text-indigo-700' },
  violet: { border: 'border-violet-200', badge: 'bg-violet-50 text-violet-700 border border-violet-200', heading: 'text-violet-700' },
  rose:   { border: 'border-rose-200',   badge: 'bg-rose-50 text-rose-700 border border-rose-200',       heading: 'text-rose-600' },
  teal:   { border: 'border-teal-200',   badge: 'bg-teal-50 text-teal-700 border border-teal-200',       heading: 'text-teal-700' },
};

const trapTips = [
  'Do the levator scapulae stretch daily: tilt your head toward one shoulder, turn the chin 45° toward your armpit, hold 30 sec each side.',
  'Shrug your shoulders UP toward your ears, hold 2 sec, then let them DROP fully — this resets the trap out of its chronic contraction.',
  'Avoid "phone shoulder" — holding your phone between ear and shoulder for calls is one of the fastest ways to inflame the upper trap.',
  'Face pulls (cable or resistance band) directly counteract upper trap tightness by strengthening the opposing rear-delt muscles.',
  'If you sit at a desk: raise your monitor to eye level and use an external keyboard so your arms stay low — most upper trap tension comes from high keyboard positions.',
  'When stressed, consciously drop your shoulders away from your ears throughout the day — the trap is one of the first muscles to brace during psychological stress.',
];

export default function UpperBackExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            UnblockDevs Tools
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Health Guide</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Curated Video Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Upper Back, Trapezius &amp;<br className="hidden sm:block" /> Cervicogenic Dizziness
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            If your upper back constantly feels tight, you feel the urge to crack it, and you experience
            dizziness or balance issues — this guide covers the exercises most likely to help.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-10">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-0.5">See a doctor first if you have dizziness</p>
            <p className="text-sm text-amber-700">
              Dizziness + balance issues combined with neck or upper back stiffness warrants a professional
              assessment to rule out other causes. These exercises are educational — not a substitute for
              medical advice.
            </p>
          </div>
        </div>

        {/* Explainer */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            What&apos;s likely happening
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Prolonged sitting, screens, and forward head posture shorten the chest muscles, overstretch the
            upper back muscles, and lock up the thoracic spine joints. The <strong>upper trapezius</strong> muscle
            (which runs from the base of your skull down to your shoulder blade) chronically overworks and
            shortens — causing that constant ache across your neck and shoulders. When the thoracic spine stiffens,
            the neck overcompensates — compressing nerves and blood vessels that can trigger{' '}
            <strong>cervicogenic dizziness</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Stiffness & cracking', detail: '2–4 weeks to first notice improvement' },
              { label: 'Significant relief', detail: '6–12 weeks of consistent practice' },
              { label: 'Full resolution', detail: '3–6 months depending on severity' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </div>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Head-tilt load table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-10">
          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl mt-0.5">📱</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">The Hidden Cost of Looking Down</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Every degree you tilt your head forward multiplies the effective weight your cervical spine must support.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2.5 pr-4 font-semibold text-gray-700 w-24">Head angle</th>
                  <th className="text-right py-2.5 pr-4 font-semibold text-gray-700">Load (lbs)</th>
                  <th className="text-right py-2.5 pr-4 font-semibold text-gray-700">Load (kg)</th>
                  <th className="text-left py-2.5 pr-4 font-semibold text-gray-700">Typical activity</th>
                  <th className="text-left py-2.5 font-semibold text-gray-700">Equivalent to…</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { deg: 0,  lbs: 12,  kg: 5.4,  bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', activity: 'Looking straight ahead',    equiv: 'A large laptop' },
                  { deg: 15, lbs: 27,  kg: 12.2, bar: 'bg-yellow-400',  badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',   activity: 'Reading at a desk',         equiv: 'A small dog' },
                  { deg: 30, lbs: 40,  kg: 18.1, bar: 'bg-orange-500',  badge: 'bg-orange-50 text-orange-700 border-orange-200',   activity: 'Phone held on your lap',    equiv: 'A full hiking backpack' },
                  { deg: 45, lbs: 49,  kg: 22.2, bar: 'bg-red-500',     badge: 'bg-red-50 text-red-700 border-red-200',            activity: 'Scrolling on the sofa',     equiv: 'A 3-year-old child' },
                  { deg: 60, lbs: 60,  kg: 27.2, bar: 'bg-red-700',     badge: 'bg-red-100 text-red-800 border-red-300',           activity: 'Head fully dropped',        equiv: 'A large cabin suitcase' },
                ].map((row) => (
                  <tr key={row.deg} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-4">
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${row.badge}`}>
                        {row.deg}°
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 bg-gray-100 rounded-full h-2 hidden sm:block">
                          <div
                            className={`h-2 rounded-full ${row.bar}`}
                            style={{ width: `${(row.lbs / 60) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-900 tabular-nums">{row.lbs}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right text-gray-500 tabular-nums">{row.kg}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.activity}</td>
                    <td className="py-3 text-gray-500">{row.equiv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Source: Hansraj KK (2014). &ldquo;Assessment of stresses in the cervical spine caused by posture and position of the head.&rdquo;{' '}
            <em>Surgical Technology International</em>, 25, 277–279.
          </p>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors rounded-full px-3 py-1.5 shadow-sm"
            >
              <span>{s.emoji}</span>
              {s.heading}
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </a>
          ))}
        </div>

        {/* Video sections */}
        <div className="space-y-14">
          {sections.map((section) => {
            const c = colorMap[section.color];
            return (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img" aria-label={section.heading}>
                    {section.emoji}
                  </span>
                  <div>
                    <h2 className={`text-xl font-bold ${c.heading}`}>{section.heading}</h2>
                    <p className="text-sm text-gray-500">{section.subheading}</p>
                  </div>
                </div>

                <div className={`border-l-2 ${c.border} mb-6`} style={{ height: 2 }} />

                {/* Trapezius tips inline */}
                {section.id === 'trapezius' && (
                  <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4">
                    <p className="text-sm font-bold text-rose-800 mb-3">Tips to reduce upper trapezius tightness</p>
                    <ul className="space-y-2">
                      {trapTips.map((tip, i) => (
                        <li key={i} className="flex gap-2 text-sm text-rose-700">
                          <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  className={`grid gap-6 ${
                    section.videos.length === 1
                      ? 'grid-cols-1'
                      : section.videos.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {section.videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-full aspect-video bg-gray-100">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        {video.tag && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge} mb-2 inline-block`}>
                            {video.tag}
                          </span>
                        )}
                        <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{video.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Tips footer */}
        <div className="mt-14 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">General tips before you start</h2>
          <ul className="space-y-2.5">
            {[
              'Start with the ⚡ Quick Relief videos — they are safe to do right now with no warm-up.',
              'Go very slowly with cervicogenic dizziness exercises — fast neck movements can trigger more dizziness.',
              'Stop immediately if any exercise makes your dizziness significantly worse.',
              'The "Hidden Shoulder Muscles" video in the Dizziness section is particularly useful if neck exercises only help temporarily.',
              'Consistent daily practice matters more than intensity — 10 minutes every day beats 60 minutes once a week.',
              'If you experience numbness, tingling in your arms, or severe dizziness, see a physiotherapist or doctor.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          All videos belong to their respective creators on YouTube. This page curates publicly available content for educational purposes.
        </p>
      </main>
    </div>
  );
}
