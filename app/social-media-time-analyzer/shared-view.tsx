'use client';

import Link from 'next/link';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie,
} from 'recharts';
import type { ShareSummary } from '../instagram-reels-analyzer/client';

function fmtNum(n: number, dec = 0) {
  return Math.round(n * 10 ** dec) / 10 ** dec;
}

function fmtTime(s: number) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

interface Props { share: ShareSummary }

export default function SharedView({ share: s }: Props) {
  const days  = s.ts / 86400;
  const hours = s.ts / 3600;
  const name  = s.u || 'Someone';
  const totalEngagement = s.nl + s.nsv + s.nc;
  const totalConsumption = s.nv + s.np + s.ns + s.na;
  const engRate = totalConsumption > 0 ? (totalEngagement / totalConsumption) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">

      {/* Sticky banner */}
      <div className="sticky top-0 z-50 bg-zinc-950 text-white text-center py-3 px-4">
        <p className="text-sm font-medium">
          Shocked by <strong>{name}&apos;s</strong> numbers?{' '}
          <Link href="/social-media-time-analyzer"
            className="underline font-bold text-pink-400 hover:text-pink-300">
            Check your own →
          </Link>
          {' '}(free, 100% private)
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-4"
            style={{ background: '#fdf4ff', color: '#c026d3', borderColor: '#f5d0fe' }}>
            <span className="text-base">📸</span> Instagram Activity Report — shared by {name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-2">
            {name}&apos;s Instagram data, exposed
          </h1>
          <p className="text-gray-500 text-sm">
            Data from {fmtDate(s.e0)} → {fmtDate(s.e1)}
          </p>
        </div>

        {/* Hero stats */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1e0533 50%, #0c1a2e 100%)' }}>
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#a855f7' }}>
              The numbers don&apos;t lie
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
              {[
                { label: 'Days wasted', value: `${fmtNum(days, 1)}`, color: '#fb923c',
                  sub: `${fmtNum(hours, 0).toLocaleString('en-IN')} hours total` },
                { label: 'Likes given', value: s.nl.toLocaleString('en-IN'), color: '#f0abfc',
                  sub: `since ${fmtDate(s.e0)}` },
                { label: 'Engagement actions', value: totalEngagement.toLocaleString('en-IN'), color: '#67e8f9',
                  sub: 'likes + saves + comments' },
                { label: 'Engagement rate', value: `${fmtNum(engRate, 1)}%`, color: '#86efac',
                  sub: 'actions per 100 views' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold mt-1.5" style={{ color: '#d8b4fe' }}>{stat.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Reels watched',  value: s.nv, icon: '🎬', color: '#c026d3' },
            { label: 'Comments',       value: s.nc, icon: '💬', color: '#2563eb' },
            { label: 'DMs sent',       value: s.nds, icon: '📩', color: '#7c3aed' },
            { label: 'Advertisers',    value: s.nag, icon: '📢', color: '#dc2626', label2: 'targeting them' },
          ].map(st => (
            <div key={st.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-center">
              <p className="text-xl mb-1">{st.icon}</p>
              <p className="text-2xl font-black tabular-nums" style={{ color: st.color }}>
                {st.value.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{st.label}</p>
            </div>
          ))}
        </div>

        {/* Monthly trend */}
        {s.byMonth.length > 1 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-1">Activity over time</h2>
            <p className="text-xs text-gray-400 mb-4">Total actions per month across all categories</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={s.byMonth} margin={{ top: 5, right: 0, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="sg-total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c026d3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c026d3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
                  interval={Math.max(0, Math.floor(s.byMonth.length / 8) - 1)}
                  tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v: number | string | undefined) => Number(v ?? 0).toLocaleString('en-IN')} />
                <Area type="monotone" dataKey="total" stroke="#c026d3" strokeWidth={2}
                  fill="url(#sg-total)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Activity pie + DM split */}
        <div className="grid sm:grid-cols-2 gap-4">

          {s.activityPie.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Activity breakdown</h2>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={s.activityPie} cx="50%" cy="50%" innerRadius={30} outerRadius={55}
                      dataKey="value" stroke="none">
                      {s.activityPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number | string | undefined) => Number(v ?? 0).toLocaleString('en-IN')} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 flex-1 text-xs">
                  {s.activityPie.map(e => (
                    <div key={e.name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                      <span className="text-gray-600 flex-1">{e.name}</span>
                      <span className="font-bold tabular-nums" style={{ color: e.color }}>
                        {e.value.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Day of week */}
          {s.byDow.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Most active day</h2>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={s.byDow} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v: number | string | undefined) => Number(v ?? 0).toLocaleString('en-IN')} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {s.byDow.map((_, i) => (
                      <Cell key={i} fill={i === s.byDow.reduce((mx, d, idx) => d.count > s.byDow[mx].count ? idx : mx, 0) ? '#c026d3' : '#e9d5ff'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* DM stats if available */}
        {s.nd > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">DM activity</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Total messages', value: s.nd, color: '#7c3aed' },
                { label: 'Sent by them',   value: s.nds, color: '#c026d3' },
                { label: 'Received',       value: s.nd - s.nds, color: '#2563eb' },
              ].map(st => (
                <div key={st.label} className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xl font-black tabular-nums" style={{ color: st.color }}>
                    {st.value.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{st.label}</p>
                </div>
              ))}
            </div>
            {s.topThreads.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Top conversations</p>
                <div className="space-y-1.5">
                  {s.topThreads.slice(0, 5).map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-purple-400 font-bold w-4 tabular-nums">{i + 1}.</span>
                      <span className="flex-1 truncate">{t.title}</span>
                      <span className="font-bold tabular-nums text-purple-600">{t.count.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Viral CTA */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e0533 0%, #0c1a2e 100%)' }}>
          <div className="px-8 py-10 text-center">
            <p className="text-2xl sm:text-3xl font-black text-white mb-2">
              Curious about your own numbers?
            </p>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Upload your Instagram data export and get a complete breakdown in seconds.
              100% private — nothing ever leaves your browser.
            </p>
            <Link
              href="/social-media-time-analyzer"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #E1306C, #a855f7, #3b82f6)' }}
            >
              Analyze my Instagram →
            </Link>
            <p className="text-xs text-gray-600 mt-4">Free · No signup · Runs in your browser</p>
          </div>
        </div>

      </div>
    </div>
  );
}
