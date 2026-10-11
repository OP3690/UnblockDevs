'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ComposedChart, Line,
} from 'recharts';
import Link from 'next/link';
import { ArrowLeft, Upload, Shield, Clock, TrendingUp, Calendar, Flame, Eye, Heart, Bookmark, MessageSquare, Search, Link2, LogIn, Users } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimedEntry { timestamp: number; }

export interface DmThread {
  title: string;
  count: number;
  sent: number;
  isRequest: boolean;
}

export interface FullData {
  videos:     TimedEntry[];
  posts:      TimedEntry[];
  stories:    TimedEntry[];
  ads:        TimedEntry[];
  likes:      TimedEntry[];
  saves:      TimedEntry[];
  comments:   TimedEntry[];
  searches:   TimedEntry[];
  links:      TimedEntry[];
  logins:     TimedEntry[];
  dms:              TimedEntry[];
  dmSent:           number;
  dmSharedReelTs:   TimedEntry[];
  dmSharedStoryTs:  TimedEntry[];
  dmSharedPostTs:   TimedEntry[];
  dmThreads:        DmThread[];
  userName:        string;
  advertiserCount: number;
  followingCount:  number;
  followersCount:  number;
  foundFiles: string[];
  likedAuthors: string[];
}

// ─── Share types & helpers ────────────────────────────────────────────────────

export interface ShareSummary {
  v: 1;
  u: string;
  ts: number; vd: number; sd: number; e0: number; e1: number; vl: boolean;
  nv: number; np: number; ns: number; na: number;
  nl: number; nsv: number; nc: number;
  nsr: number; nln: number; nlo: number;
  nd: number; nds: number; ndr: number; ndst: number; ndp: number;
  nag: number; nfw: number; nfr: number;
  byMonth: Analysis['byMonth'];
  byYear:  Analysis['byYear'];
  byDow:   Analysis['byDow'];
  byHour:  Analysis['byHour'];
  engagement: Analysis['engagement'];
  activityPie: Analysis['activityPie'];
  topThreads: DmThread[];
  bySharedMonth: Analysis['bySharedMonth'];
  dmBreakdown:   Analysis['dmBreakdown'];
}

export function encodeShare(a: Analysis): string {
  const { compressToEncodedURIComponent } = require('lz-string') as typeof import('lz-string');
  const { data: d } = a;
  const s: ShareSummary = {
    v: 1, u: d.userName,
    ts: a.totalSeconds, vd: a.viewingDays, sd: a.spanDays,
    e0: a.earliest, e1: a.latest, vl: a.viewingLimited,
    nv: d.videos.length, np: d.posts.length, ns: d.stories.length, na: d.ads.length,
    nl: d.likes.length, nsv: d.saves.length, nc: d.comments.length,
    nsr: d.searches.length, nln: d.links.length, nlo: d.logins.length,
    nd: d.dms.length, nds: d.dmSent,
    ndr: d.dmSharedReelTs.length, ndst: d.dmSharedStoryTs.length, ndp: d.dmSharedPostTs.length,
    nag: d.advertiserCount, nfw: d.followingCount, nfr: d.followersCount,
    byMonth: a.byMonth.filter(m => m.total > 0),
    byYear: a.byYear, byDow: a.byDow, byHour: a.byHour,
    engagement: a.engagement, activityPie: a.activityPie,
    topThreads: a.topThreads, bySharedMonth: a.bySharedMonth, dmBreakdown: a.dmBreakdown,
  };
  return compressToEncodedURIComponent(JSON.stringify(s));
}

export function decodeShare(encoded: string): ShareSummary | null {
  try {
    const { decompressFromEncodedURIComponent } = require('lz-string') as typeof import('lz-string');
    const decompressed = decompressFromEncodedURIComponent(encoded);
    if (decompressed) return JSON.parse(decompressed);
    // Fallback: old base64 format
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch { return null; }
}

export function analysisFromShare(s: ShareSummary): Analysis {
  const empty = (n: number): TimedEntry[] => Array(n).fill({ timestamp: 0 });
  const data: FullData = {
    videos: empty(s.nv), posts: empty(s.np), stories: empty(s.ns), ads: empty(s.na),
    likes: empty(s.nl), saves: empty(s.nsv), comments: empty(s.nc),
    searches: empty(s.nsr), links: empty(s.nln), logins: empty(s.nlo),
    dms: empty(s.nd), dmSent: s.nds,
    dmSharedReelTs: empty(s.ndr), dmSharedStoryTs: empty(s.ndst), dmSharedPostTs: empty(s.ndp),
    dmThreads: s.topThreads,
    userName: s.u, advertiserCount: s.nag, followingCount: s.nfw, followersCount: s.nfr,
    foundFiles: [], likedAuthors: [],
  };
  return {
    data, totalSeconds: s.ts, viewingDays: s.vd, spanDays: s.sd,
    earliest: s.e0, latest: s.e1, viewingLimited: s.vl,
    byMonth: s.byMonth, byYear: s.byYear, byDow: s.byDow, byHour: s.byHour,
    engagement: s.engagement, activityPie: s.activityPie,
    topThreads: s.topThreads, bySharedMonth: s.bySharedMonth, dmBreakdown: s.dmBreakdown,
    topCreators: [], trendProjection: [], peakDow: '', peakHourLabel: '',
  };
}

// ─── Time constants (seconds avg per interaction) ─────────────────────────────

const AVG = { videos: 22, posts: 4, stories: 5, ads: 2 };
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOW    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtNum(n: number, decimals = 0) {
  if (decimals > 0) return n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return Math.round(n).toLocaleString('en-IN');
}

function fmtTime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function spanLabel(arr: TimedEntry[]): string {
  if (arr.length === 0) return '';
  const ts = arr.map(e => e.timestamp).sort((a, b) => a - b);
  const days = Math.round((ts[ts.length - 1] - ts[0]) / 86400);
  if (days < 2)   return 'today';
  if (days <= 60) return `last ${days}d`;
  if (days < 365) return `last ${Math.round(days / 30)}mo`;
  const y0 = new Date(ts[0] * 1000).getFullYear();
  const y1 = new Date(ts[ts.length - 1] * 1000).getFullYear();
  return y0 === y1 ? `${y0}` : `${y0}–${y1}`;
}

// ─── Extract timestamps from any Instagram JSON pattern ──────────────────────

function extractTs(obj: unknown): TimedEntry[] {
  const out: TimedEntry[] = [];
  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    const o = node as Record<string, unknown>;

    // Pattern A: string_list_data array (most common)
    if (Array.isArray(o.string_list_data)) {
      for (const item of o.string_list_data as Record<string, unknown>[]) {
        const ts = Number(item.timestamp);
        if (ts > 1_000_000_000 && ts < 9_999_999_999) out.push({ timestamp: ts });
      }
      return;
    }
    // Pattern B: string_map_data (login activity)
    if (o.string_map_data && typeof o.string_map_data === 'object') {
      const map = o.string_map_data as Record<string, Record<string, unknown>>;
      for (const v of Object.values(map)) {
        const ts = Number(v.timestamp);
        if (ts > 1_000_000_000 && ts < 9_999_999_999) { out.push({ timestamp: ts }); break; }
      }
      return;
    }
    // Pattern C: direct timestamp
    if ('timestamp' in o) {
      const ts = Number(o.timestamp);
      if (ts > 1_000_000_000 && ts < 9_999_999_999) out.push({ timestamp: ts });
    }
    for (const v of Object.values(o)) walk(v);
  }
  walk(obj);
  return out;
}

// ─── ZIP parser ───────────────────────────────────────────────────────────────

const FILE_MAP: Record<string, keyof Omit<FullData, 'advertiserCount' | 'followingCount' | 'followersCount' | 'foundFiles'>> = {
  'videos_watched.json':         'videos',
  'posts_viewed.json':           'posts',
  'stories_viewed.json':         'stories',
  'ads_viewed.json':             'ads',
  'liked_posts.json':            'likes',
  'liked_comments.json':         'likes',
  'saved_posts.json':            'saves',
  'post_comments_1.json':        'comments',
  'post_comments_2.json':        'comments',
  'word_or_phrase_searches.json':'searches',
  'recent_searches.json':        'searches',
  'link_history.json':           'links',
  'login_activity.json':         'logins',
};

async function parseZip(file: File): Promise<FullData> {
  const JSZip = (await import('jszip')).default;
  const zip   = await JSZip.loadAsync(file);

  const result: FullData = {
    videos: [], posts: [], stories: [], ads: [],
    likes: [], saves: [], comments: [], searches: [],
    links: [], logins: [],
    dms: [], dmSent: 0,
    dmSharedReelTs: [], dmSharedStoryTs: [], dmSharedPostTs: [],
    dmThreads: [], userName: '',
    advertiserCount: 0, followingCount: 0, followersCount: 0,
    foundFiles: [], likedAuthors: [],
  };

  // First pass: get user's own name from personal_information
  for (const [name, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    if (name.endsWith('personal_information/personal_information.json')) {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown>;
        const users = (json['profile_user'] as Record<string, unknown>[]) ?? [];
        const smd = (users[0]?.string_map_data ?? {}) as Record<string, { value?: string }>;
        result.userName = smd['Name']?.value ?? '';
      } catch { /* skip */ }
      break;
    }
  }

  // Accumulate DM threads (keyed by path segment to merge message_1 + message_2)
  const dmThreadMap = new Map<string, DmThread & { tsList: number[] }>();

  for (const [name, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const base = name.split('/').pop()?.toLowerCase() ?? '';

    if (FILE_MAP[base]) {
      try {
        const json = JSON.parse(await entry.async('text'));
        const entries = extractTs(json);
        if (entries.length > 0) {
          (result[FILE_MAP[base]] as TimedEntry[]).push(...entries);
          if (!result.foundFiles.includes(base)) result.foundFiles.push(base);
        }
        // Extract author names from liked_posts.json
        if (base === 'liked_posts.json') {
          try {
            const obj = json as Record<string, unknown>;
            const key = Object.keys(obj).find(k => k.includes('like') || k.includes('media'));
            const list = (key ? obj[key] : json) as { title?: string }[];
            if (Array.isArray(list)) {
              for (const item of list) { if (item.title) result.likedAuthors.push(item.title); }
            }
          } catch { /* skip */ }
        }
      } catch { /* skip */ }
      continue;
    }

    // DM messages — inbox and message_requests
    const isInbox   = name.includes('/messages/inbox/');
    const isRequest = name.includes('/messages/message_requests/');
    if ((isInbox || isRequest) && /message_\d+\.json$/.test(base)) {
      try {
        const json = JSON.parse(await entry.async('text')) as {
          title?: string;
          participants?: { name: string }[];
          messages?: { sender_name: string; timestamp_ms: number; share?: { link?: string } }[];
        };
        const threadKey = name.split('/').slice(0, -1).join('/');
        const title = json.title ?? threadKey.split('/').pop() ?? 'Unknown';
        const messages = json.messages ?? [];

        if (!dmThreadMap.has(threadKey)) {
          dmThreadMap.set(threadKey, { title, count: 0, sent: 0, isRequest, tsList: [] });
        }
        const t = dmThreadMap.get(threadKey)!;
        for (const msg of messages) {
          if (!msg.timestamp_ms) continue;
          const ts = Math.floor(msg.timestamp_ms / 1000);
          result.dms.push({ timestamp: ts });
          t.tsList.push(ts);
          t.count++;
          if (result.userName && msg.sender_name === result.userName) {
            t.sent++;
            result.dmSent++;
          }
          // Track shared content with timestamps
          const link = msg.share?.link ?? '';
          if (link.includes('/reel/'))                            result.dmSharedReelTs.push({ timestamp: ts });
          else if (link.includes('/stories/'))                    result.dmSharedStoryTs.push({ timestamp: ts });
          else if (link.includes('/p/') || link.includes('/tv/')) result.dmSharedPostTs.push({ timestamp: ts });
        }
      } catch { /* skip */ }
      continue;
    }

    // Advertiser count
    if (base === 'advertisers_using_your_activity_or_information.json') {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown[]>;
        const k = Object.keys(json)[0];
        result.advertiserCount = json[k]?.length ?? 0;
      } catch { /* skip */ }
      continue;
    }

    // Following
    if (base === 'following.json') {
      try {
        const json = JSON.parse(await entry.async('text'));
        const items = Array.isArray(json) ? json : Object.values(json)[0] as unknown[];
        result.followingCount = items?.length ?? 0;
      } catch { /* skip */ }
      continue;
    }

    // Followers
    if (base.startsWith('followers_')) {
      try {
        const json = JSON.parse(await entry.async('text'));
        const items = Array.isArray(json) ? json : Object.values(json)[0] as unknown[];
        result.followersCount += items?.length ?? 0;
      } catch { /* skip */ }
    }
  }

  // Build sorted thread list (top by message count, non-requests first)
  result.dmThreads = [...dmThreadMap.values()]
    .map(({ tsList: _, ...t }) => t)
    .sort((a, b) => b.count - a.count);

  if (result.dms.length > 0) result.foundFiles.push('messages');

  const totalActivity = result.videos.length + result.posts.length + result.stories.length +
    result.likes.length + result.saves.length + result.comments.length + result.dms.length;

  if (totalActivity === 0) {
    throw new Error('No activity data found. Try uploading a more complete export with "All available information" selected.');
  }

  return result;
}

async function parseJsonFile(file: File): Promise<FullData> {
  const json = JSON.parse(await file.text());
  const base = file.name.toLowerCase();
  const result: FullData = {
    videos: [], posts: [], stories: [], ads: [],
    likes: [], saves: [], comments: [], searches: [],
    links: [], logins: [],
    dms: [], dmSent: 0,
    dmSharedReelTs: [], dmSharedStoryTs: [], dmSharedPostTs: [],
    dmThreads: [], userName: '',
    advertiserCount: 0, followingCount: 0, followersCount: 0,
    foundFiles: [file.name], likedAuthors: [],
  };
  const field = FILE_MAP[base] ?? 'videos';
  (result[field] as TimedEntry[]).push(...extractTs(json));
  if (result.videos.length + result.posts.length === 0) {
    throw new Error('No timestamped entries found in this file.');
  }
  return result;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

function buildSampleIG(): Analysis {
  const empty = (n: number): TimedEntry[] => Array<TimedEntry>(n).fill({ timestamp: 0 });
  const data: FullData = {
    videos: empty(42847), posts: empty(18204), stories: empty(24931), ads: empty(8103),
    likes: empty(14294), saves: empty(3841), comments: empty(892),
    searches: empty(4203), links: empty(1847), logins: empty(312),
    dms: empty(28491), dmSent: 18203,
    dmSharedReelTs: empty(4291), dmSharedStoryTs: empty(2847), dmSharedPostTs: empty(1203),
    dmThreads: [],
    userName: '', advertiserCount: 847, followingCount: 841, followersCount: 1024,
    foundFiles: ['videos_watched.json', 'posts_viewed.json', 'stories_viewed.json', 'ads_viewed.json', 'liked_posts.json'],
    likedAuthors: [],
  };
  const t0 = 1420070400; // 2015-01-01
  const t1 = 1728432000; // 2024-10-09
  const totalSeconds = 42847 * 22 + 18204 * 4 + 24931 * 5 + 8103 * 2;
  const byHourCounts = [234,156,89,45,23,34,123,456,789,1023,1456,1234,1678,1456,1234,1123,1389,1567,1823,2345,2789,3241,2876,1456];
  const byHour: Analysis['byHour'] = Array.from({ length: 24 }, (_, h) => ({
    label: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
    count: byHourCounts[h],
  }));
  const byDow: Analysis['byDow'] = [
    { day: 'Sun', count: 8934 }, { day: 'Mon', count: 6234 }, { day: 'Tue', count: 5823 },
    { day: 'Wed', count: 6123 }, { day: 'Thu', count: 6456 }, { day: 'Fri', count: 7234 }, { day: 'Sat', count: 9456 },
  ];
  const byYear: Analysis['byYear'] = [
    { year: '2015', likes: 234, views: 456, dms: 89, total: 779 },
    { year: '2016', likes: 1234, views: 2456, dms: 312, total: 4002 },
    { year: '2017', likes: 3456, views: 7823, dms: 934, total: 12213 },
    { year: '2018', likes: 5234, views: 12345, dms: 1456, total: 19035 },
    { year: '2019', likes: 7823, views: 18934, dms: 2234, total: 28991 },
    { year: '2020', likes: 9234, views: 23456, dms: 2845, total: 35535 },
    { year: '2021', likes: 8934, views: 21234, dms: 2634, total: 32802 },
    { year: '2022', likes: 7456, views: 17823, dms: 2145, total: 27424 },
    { year: '2023', likes: 6234, views: 14534, dms: 1823, total: 22591 },
    { year: '2024', likes: 3890, views: 8923, dms: 1134, total: 13947 },
  ];
  const mRaw = [
    ['Jan 2022',1234,456,678,312,134],['Feb 2022',1456,523,712,289,156],['Mar 2022',1678,589,834,334,178],
    ['Apr 2022',1512,512,756,298,145],['May 2022',1823,634,912,378,198],['Jun 2022',2134,712,1023,423,212],
    ['Jul 2022',2456,823,1156,489,234],['Aug 2022',2312,789,1089,456,223],['Sep 2022',2089,712,978,412,201],
    ['Oct 2022',1956,678,912,387,187],['Nov 2022',1834,634,856,356,178],['Dec 2022',2345,823,1089,467,234],
    ['Jan 2023',2567,912,1234,512,256],['Feb 2023',2234,789,1067,445,223],['Mar 2023',2123,756,1012,423,212],
    ['Apr 2023',2456,856,1178,489,245],['May 2023',2789,978,1334,556,278],['Jun 2023',3012,1056,1456,601,301],
    ['Jul 2023',2845,1001,1367,567,284],['Aug 2023',2678,934,1289,534,267],['Sep 2023',2489,867,1189,498,248],
    ['Oct 2023',2312,801,1101,462,231],['Nov 2023',2145,745,1023,428,214],['Dec 2023',2678,934,1289,534,267],
    ['Jan 2024',2456,856,1178,489,245],['Feb 2024',2189,756,1034,436,218],['Mar 2024',2034,701,956,405,203],
    ['Apr 2024',1856,634,867,369,185],['May 2024',1723,589,801,342,172],['Jun 2024',1567,534,723,312,156],
    ['Jul 2024',1412,478,645,280,141],['Aug 2024',1234,423,567,245,123],['Sep 2024',1089,378,512,218,108],
    ['Oct 2024',923,312,423,184,92],
  ] as const;
  const byMonth: Analysis['byMonth'] = mRaw.map(([label, videos, posts, stories, likes, dms]) => ({
    label: label as string, videos: videos as number, posts: posts as number,
    stories: stories as number, likes: likes as number, dms: dms as number,
    total: (videos as number) + (posts as number) + (stories as number) + (likes as number) + (dms as number),
  }));
  const engagement: Analysis['engagement'] = [
    { label: 'Videos Watched',  value: 42847, icon: '▶️', color: '#a855f7', span: '2015–2024' },
    { label: 'Posts Viewed',    value: 18204, icon: '🖼️', color: '#3b82f6', span: '2015–2024' },
    { label: 'Stories Watched', value: 24931, icon: '⭕', color: '#f59e0b', span: '2015–2024' },
    { label: 'Ads Seen',        value: 8103,  icon: '📢', color: '#ef4444', span: '(last 30d)' },
    { label: 'Posts Liked',     value: 14294, icon: '❤️', color: '#f43f5e', span: '2015–2024' },
    { label: 'Posts Saved',     value: 3841,  icon: '🔖', color: '#10b981', span: '2015–2024' },
    { label: 'Comments Made',   value: 892,   icon: '💬', color: '#6366f1', span: '(last 30d)' },
    { label: 'DMs Sent',        value: 18203, icon: '📩', color: '#0ea5e9', span: '2015–2024' },
  ];
  const activityPie: Analysis['activityPie'] = [
    { name: 'Videos',  value: 42847, color: '#a855f7' },
    { name: 'Stories', value: 24931, color: '#f59e0b' },
    { name: 'Posts',   value: 18204, color: '#3b82f6' },
    { name: 'Ads',     value: 8103,  color: '#ef4444' },
  ];
  const bySharedMonth: Analysis['bySharedMonth'] = byMonth.map(m => ({
    label: m.label, reels: Math.round(m.videos * 0.3), posts: Math.round(m.posts * 0.2), stories: Math.round(m.stories * 0.1),
  }));
  const dmBreakdown: Analysis['dmBreakdown'] = [
    { name: 'DMs Received', value: 10288, color: '#3b82f6' }, { name: 'DMs Sent', value: 18203, color: '#a855f7' },
    { name: 'Reels Shared', value: 4291, color: '#f43f5e' }, { name: 'Stories Shared', value: 2847, color: '#f59e0b' },
    { name: 'Posts Shared', value: 1203, color: '#10b981' },
  ];
  return {
    data, totalSeconds, viewingDays: 30, viewingLimited: true,
    earliest: t0, latest: t1, spanDays: Math.round((t1 - t0) / 86400),
    byMonth, byYear, byDow, byHour, engagement, activityPie,
    topThreads: [], bySharedMonth, dmBreakdown,
    topCreators: [
      { name: 'design_inspo', count: 234 }, { name: 'tech_daily', count: 189 },
      { name: 'mindful_moments', count: 156 }, { name: 'frontend_tips', count: 134 },
      { name: 'startup_life', count: 112 },
    ],
    trendProjection: [
      { label: 'Jul 2024', total: 2956, projected: false }, { label: 'Aug 2024', total: 2592, projected: false },
      { label: 'Sep 2024', total: 2305, projected: false }, { label: 'Oct 2024', total: 2100, projected: false },
      { label: 'Nov 2024', total: 1980, projected: true }, { label: 'Dec 2024', total: 1850, projected: true },
      { label: 'Jan 2025', total: 1720, projected: true },
    ],
    peakDow: 'Saturday', peakHourLabel: '9 PM',
  };
}

const SAMPLE_IG = buildSampleIG();

// ─── Analyser ─────────────────────────────────────────────────────────────────

export interface Analysis {
  data: FullData;
  totalSeconds: number;
  viewingDays: number;
  earliest: number;
  latest: number;
  spanDays: number;
  byMonth: { label: string; videos: number; posts: number; stories: number; likes: number; dms: number; total: number }[];
  byYear:  { year: string; likes: number; views: number; dms: number; total: number }[];
  byDow: { day: string; count: number }[];
  byHour: { label: string; count: number }[];
  engagement: { label: string; value: number; icon: string; color: string; span: string }[];
  activityPie: { name: string; value: number; color: string }[];
  viewingLimited: boolean;
  topThreads: DmThread[];
  bySharedMonth: { label: string; reels: number; posts: number; stories: number }[];
  dmBreakdown: { name: string; value: number; color: string }[];
  topCreators: { name: string; count: number }[];
  trendProjection: { label: string; total: number; projected: boolean }[];
  peakDow: string;
  peakHourLabel: string;
}

function analyse(data: FullData): Analysis {
  const totalSeconds =
    data.videos.length  * AVG.videos +
    data.posts.length   * AVG.posts  +
    data.stories.length * AVG.stories +
    data.ads.length     * AVG.ads;

  // Viewing-only span (videos + posts + stories — these are typically limited by Instagram)
  const viewingAll = [...data.videos, ...data.posts, ...data.stories].sort((a, b) => a.timestamp - b.timestamp);
  const viewEarliest = viewingAll.length > 0 ? viewingAll[0].timestamp : Date.now() / 1000 - 86400;
  const viewLatest   = viewingAll.length > 0 ? viewingAll[viewingAll.length - 1].timestamp : Date.now() / 1000;
  const viewingDays  = Math.max(1, (viewLatest - viewEarliest) / 86400);

  // ALL activity (includes likes which may span years, and DMs)
  const allActivity = [...data.videos, ...data.posts, ...data.stories, ...data.likes, ...data.saves, ...data.comments, ...data.dms]
    .sort((a, b) => a.timestamp - b.timestamp);
  const earliest = allActivity.length > 0 ? allActivity[0].timestamp : viewEarliest;
  const latest   = allActivity.length > 0 ? allActivity[allActivity.length - 1].timestamp : viewLatest;
  const spanDays = Math.max(1, (latest - earliest) / 86400);

  // likes span in days
  const likesSorted = [...data.likes].sort((a, b) => a.timestamp - b.timestamp);
  const likeSpanDays = likesSorted.length > 1
    ? (likesSorted[likesSorted.length - 1].timestamp - likesSorted[0].timestamp) / 86400
    : 0;
  const viewingLimited = viewingDays < 60 && likeSpanDays > 90;

  // By month — aggregate ALL activity types including DMs
  type MonthEntry = { label: string; videos: number; posts: number; stories: number; likes: number; dms: number };
  const mMap = new Map<string, MonthEntry>();
  const aggMonth = (arr: TimedEntry[], field: keyof Omit<MonthEntry, 'label'>) => {
    for (const e of arr) {
      const d = new Date(e.timestamp * 1000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!mMap.has(key)) mMap.set(key, { label: `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`, videos: 0, posts: 0, stories: 0, likes: 0, dms: 0 });
      mMap.get(key)![field]++;
    }
  };
  aggMonth(data.videos,  'videos');
  aggMonth(data.posts,   'posts');
  aggMonth(data.stories, 'stories');
  aggMonth(data.likes,   'likes');
  aggMonth(data.dms,     'dms');

  const byMonth = [...mMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, total: v.videos + v.posts + v.stories + v.likes + v.dms }));

  // By year — all activity including DMs
  const yMap = new Map<string, { likes: number; views: number; dms: number }>();
  const aggYear = (arr: TimedEntry[], field: 'likes' | 'views' | 'dms') => {
    for (const e of arr) {
      const year = String(new Date(e.timestamp * 1000).getFullYear());
      if (!yMap.has(year)) yMap.set(year, { likes: 0, views: 0, dms: 0 });
      yMap.get(year)![field]++;
    }
  };
  aggYear(data.likes,   'likes');
  aggYear(data.saves,   'likes');
  aggYear(data.comments,'likes');
  aggYear(data.videos,  'views');
  aggYear(data.posts,   'views');
  aggYear(data.stories, 'views');
  aggYear(data.dms,     'dms');

  const byYear = [...yMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, v]) => ({ year, ...v, total: v.likes + v.views + v.dms }));

  // By day of week — use ALL activity for richer patterns
  const dowMap: Record<number, number> = {};
  for (const e of allActivity) { const d = new Date(e.timestamp * 1000).getDay(); dowMap[d] = (dowMap[d] ?? 0) + 1; }
  const byDow = DOW.map((day, i) => ({ day, count: dowMap[i] ?? 0 }));

  // By hour — use ALL activity
  const hMap: Record<number, number> = {};
  for (const e of allActivity) { const h = new Date(e.timestamp * 1000).getHours(); hMap[h] = (hMap[h] ?? 0) + 1; }
  const byHour = Array.from({ length: 24 }, (_, h) => ({
    label: h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`,
    count: hMap[h] ?? 0,
  }));

  const dmSpan = spanLabel(data.dms);
  const engagement = [
    { label: 'Videos',        value: data.videos.length,            icon: '🎬', color: '#c026d3', span: spanLabel(data.videos) },
    { label: 'Posts',         value: data.posts.length,             icon: '🖼️', color: '#7c3aed', span: spanLabel(data.posts) },
    { label: 'Stories',       value: data.stories.length,           icon: '⭕', color: '#2563eb', span: spanLabel(data.stories) },
    { label: 'Ads seen',      value: data.ads.length,               icon: '📢', color: '#64748b', span: spanLabel(data.ads) },
    { label: 'Likes',         value: data.likes.length,             icon: '❤️', color: '#e11d48', span: spanLabel(data.likes) },
    { label: 'Saves',         value: data.saves.length,             icon: '🔖', color: '#d97706', span: spanLabel(data.saves) },
    { label: 'Comments',      value: data.comments.length,          icon: '💬', color: '#0891b2', span: spanLabel(data.comments) },
    { label: 'DMs sent',      value: data.dmSent,                   icon: '✉️', color: '#7c3aed', span: dmSpan },
    { label: 'DMs received',  value: data.dms.length - data.dmSent, icon: '📩', color: '#6366f1', span: dmSpan },
    { label: 'Searches',      value: data.searches.length,          icon: '🔍', color: '#4f46e5', span: spanLabel(data.searches) },
    { label: 'Links clicked', value: data.links.length,             icon: '🔗', color: '#059669', span: spanLabel(data.links) },
    { label: 'Logins',        value: data.logins.length,            icon: '🔐', color: '#0891b2', span: spanLabel(data.logins) },
  ].filter(e => e.value > 0);

  // Activity pie
  const activityPie = [
    { name: 'Videos',  value: data.videos.length,  color: '#c026d3' },
    { name: 'Posts',   value: data.posts.length,   color: '#7c3aed' },
    { name: 'Stories', value: data.stories.length, color: '#2563eb' },
    { name: 'Ads',     value: data.ads.length,     color: '#94a3b8' },
  ].filter(e => e.value > 0);

  const topThreads = data.dmThreads.filter(t => !t.isRequest).slice(0, 8);

  // Monthly shared-content breakdown
  const shMap = new Map<string, { label: string; reels: number; posts: number; stories: number }>();
  const aggShared = (arr: TimedEntry[], field: 'reels' | 'posts' | 'stories') => {
    for (const e of arr) {
      const d = new Date(e.timestamp * 1000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!shMap.has(key)) shMap.set(key, { label: `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`, reels: 0, posts: 0, stories: 0 });
      shMap.get(key)![field]++;
    }
  };
  aggShared(data.dmSharedReelTs,  'reels');
  aggShared(data.dmSharedPostTs,  'posts');
  aggShared(data.dmSharedStoryTs, 'stories');
  const bySharedMonth = [...shMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, v]) => v);

  const dmBreakdown = [
    { name: 'Reels',   value: data.dmSharedReelTs.length,  color: '#c026d3' },
    { name: 'Posts',   value: data.dmSharedPostTs.length,  color: '#7c3aed' },
    { name: 'Stories', value: data.dmSharedStoryTs.length, color: '#2563eb' },
  ].filter(d => d.value > 0);

  // Top creators from liked posts authors
  const authorMap: Record<string, number> = {};
  for (const a of data.likedAuthors) authorMap[a] = (authorMap[a] ?? 0) + 1;
  const topCreators = Object.entries(authorMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // Linear regression trend projection (last 6 months → next 3 months)
  function linearRegression(pts: {x: number; y: number}[]): {slope: number; intercept: number} {
    const n = pts.length;
    if (n < 2) return { slope: 0, intercept: pts[0]?.y ?? 0 };
    const sumX  = pts.reduce((s, p) => s + p.x, 0);
    const sumY  = pts.reduce((s, p) => s + p.y, 0);
    const sumXY = pts.reduce((s, p) => s + p.x * p.y, 0);
    const sumX2 = pts.reduce((s, p) => s + p.x * p.x, 0);
    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) return { slope: 0, intercept: sumY / n };
    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  }

  const last6 = byMonth.filter(m => m.total > 0).slice(-6);
  const trendProjection: { label: string; total: number; projected: boolean }[] = [
    ...last6.map(m => ({ label: m.label, total: m.total, projected: false })),
  ];
  if (last6.length >= 3) {
    const pts = last6.map((m, i) => ({ x: i, y: m.total }));
    const { slope, intercept } = linearRegression(pts);
    // project 3 months
    const lastDate = new Date();
    for (let i = 1; i <= 3; i++) {
      const projY = Math.max(0, Math.round(intercept + slope * (last6.length - 1 + i)));
      const projDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + i, 1);
      const label = projDate.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      trendProjection.push({ label: `${label}*`, total: projY, projected: true });
    }
  }

  // Peak day and hour labels
  const maxDowEntry = byDow.reduce((best, d) => d.count > best.count ? d : best, byDow[0]);
  const peakDow = maxDowEntry?.day ?? '';
  const peakHourIdx = byHour.reduce((best, h, i) => h.count > byHour[best].count ? i : best, 0);
  const peakHourLabel = byHour[peakHourIdx]?.label ?? '';

  return { data, totalSeconds, viewingDays, earliest, latest, spanDays, byMonth, byYear, byDow, byHour, engagement, activityPie, viewingLimited, topThreads, bySharedMonth, dmBreakdown, topCreators, trendProjection, peakDow, peakHourLabel };
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl space-y-0.5">
      {label && <p className="font-semibold mb-1 text-gray-300">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? '#f0abfc' }}>
          {p.name ? `${p.name}: ` : ''}<span className="font-bold">{fmtNum(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Upload zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const ref  = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const handle = useCallback((f: File) => { if (f) onFile(f); }, [onFile]);

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
      className="relative flex flex-col items-center justify-center gap-5 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all"
      style={{ borderColor: drag ? '#c026d3' : '#d1d5db', background: drag ? '#fdf4ff' : '#fafafa' }}
    >
      <input ref={ref} type="file" accept=".zip,.json" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #c026d3, #7c3aed)' }}>
        <Upload className="w-7 h-7 text-white" />
      </div>
      <div className="text-center">
        <p className="text-base font-bold text-gray-900">Drop your Instagram data export here</p>
        <p className="text-sm text-gray-500 mt-1">Accepts <strong>.zip</strong> (full export) or individual <strong>.json</strong> files</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-500" /> 100% private — stays in your browser</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" /> Never uploaded to any server</span>
      </div>
    </div>
  );
}

// ─── How-to ───────────────────────────────────────────────────────────────────

const DOWNLOAD_STEPS = [
  {
    num: 1,
    title: 'Open Meta Accounts Center',
    body: 'Visit <a href="https://accountscenter.facebook.com/info_and_permissions/dyi" target="_blank" rel="noopener" class="font-semibold text-purple-700 underline underline-offset-2">accountscenter.facebook.com</a> or go to <strong>Instagram → Settings → Accounts Center → Your information and permissions → Download your information</strong>.',
    tip: null,
  },
  {
    num: 2,
    title: 'Choose "Export to device"',
    body: 'Select your Instagram account, then tap <strong>Export to device</strong>. Do not choose "Export to external service" — that sends your data to a third party.',
    tip: null,
  },
  {
    num: 3,
    title: 'Set Customize information → All available information',
    body: 'Under <strong>Customize information</strong>, leave it at <strong>All available information</strong> so the export includes reels, stories, DMs, likes, searches, and ad data.',
    tip: null,
  },
  {
    num: 4,
    title: 'Pick a Date range',
    body: '<strong>All time</strong> gives the most complete picture. <strong>Last year</strong> is faster to download and still shows your recent habits. Choose based on what you want to see.',
    tip: null,
  },
  {
    num: 5,
    title: 'Set Format to JSON — this is critical',
    body: 'The default is <strong>HTML</strong>, which this tool cannot read. Tap <strong>Format → JSON</strong>. This analyzer only works with the JSON export.',
    tip: '⚠️ HTML exports will not work here. You must change this to JSON.',
    tipColor: 'bg-red-50 border-red-200 text-red-700',
  },
  {
    num: 6,
    title: 'Tap "Start export" and wait',
    body: 'Instagram will send an email to your account email when the file is ready. <strong>This can take anywhere from a few hours to several days</strong> depending on your account size and Instagram\'s queue.',
    tip: '⏳ Large accounts or "All time" exports may take 1–3 days. Check your spam folder if you don\'t see the email.',
    tipColor: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    num: 7,
    title: 'Download the ZIP and drop it here',
    body: 'Click the link in the email → Download the <strong>.zip</strong> file → Drop it directly into this page. No unzipping needed.',
    tip: null,
  },
];

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = '#c026d3', icon }: {
  label: string; value: string | number; sub?: string; color?: string; icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1.5">
      {icon && <div className="mb-1">{icon}</div>}
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-3xl font-black leading-none tabular-nums" style={{ color }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>}
    </div>
  );
}

// ─── Results ─────────────────────────────────────────────────────────────────

const WHAT_ELSE = [
  { icon: '📚', label: 'Books you could have read',    perHour: 1/5    },
  { icon: '🏃', label: 'km you could have run',         perHour: 8      },
  { icon: '🎸', label: 'Guitar songs learned',          perHour: 0.5    },
  { icon: '💪', label: 'Full gym sessions',             perHour: 1/1.2  },
  { icon: '🍳', label: 'New recipes mastered',          perHour: 1      },
  { icon: '🧘', label: 'Yoga/meditation sessions',      perHour: 1      },
];

function ShareButton({ a }: { a: Analysis }) {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');

  function copy() {
    const encoded = encodeShare(a);
    // Use ?share= (query param, not #hash) so social bots can crawl OG tags.
    // Also pass mini stats as separate tiny params for the server OG image route.
    const name = encodeURIComponent(a.data.userName || '');
    const params = new URLSearchParams({
      share: encoded,
      n: a.data.userName || '',
      d: String(Math.round(a.viewingDays)),
      r: String(a.data.videos.length),
      ag: String(a.data.advertiserCount),
    });
    const url = `https://unblockdevs.com/social-media-time-analyzer?${params}`;
    navigator.clipboard.writeText(url).catch(() => {
      // fallback: select a temp input
    }).then(() => {
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2500);
    });
  }

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all
        ${status === 'copied'
          ? 'bg-green-500 text-white scale-105'
          : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-200'
        }`}
    >
      {status === 'copied' ? (
        <><span>✓</span> Link copied!</>
      ) : (
        <><span>🔗</span> Share my results</>
      )}
    </button>
  );
}

export function Results({ a, ownerName }: { a: Analysis; ownerName?: string }) {
  const [insightCopied, setInsightCopied] = useState(false);
  const { data } = a;
  const hours   = a.totalSeconds / 3600;
  const days    = a.totalSeconds / 86400;
  const totalConsumption = data.videos.length + data.posts.length + data.stories.length + data.ads.length;
  const totalEngagement  = data.likes.length + data.saves.length + data.comments.length;
  const engRate = totalConsumption > 0 ? (totalEngagement / totalConsumption) * 100 : 0;

  const peakBar = Math.max(...a.byMonth.map(m => m.total), 1);
  // Show all months (full history) in the main chart
  const allMonths    = a.byMonth;
  const recentMonths = a.byMonth.slice(-18); // last 18 for focused view

  // Radar data for activity pattern
  const maxDow = Math.max(...a.byDow.map(d => d.count), 1);
  const radarData = a.byDow.map(d => ({ subject: d.day, value: Math.round((d.count / maxDow) * 100) }));

  return (
    <div className="space-y-8">

      {/* ── DATA SOURCES FOUND ── */}
      {data.foundFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.foundFiles.map(f => (
            <span key={f} className="text-xs font-mono px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              ✓ {f}
            </span>
          ))}
          {data.advertiserCount > 0 && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              ✓ advertisers list
            </span>
          )}
        </div>
      )}

      {/* ── VIEWING LIMIT DISCLAIMER ── */}
      {a.viewingLimited && (
        <div className="rounded-2xl border p-4 flex gap-3 items-start"
          style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-sm font-bold text-amber-800">Instagram only exports ~30 days of viewing history</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              "All time" in the download settings means <em>account data</em>, not viewing history.
              Videos, posts, and story views are limited to the last ~30 days by Instagram.
              Your like history (going back to {fmtDate(a.earliest)}) gives us the full picture of your engagement over time.
            </p>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1e0533 50%, #0c1a2e 100%)' }}>
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: '#a855f7' }}>
            {ownerName ? `${ownerName}'s` : 'Your'} Instagram Activity Report · {fmtDate(a.earliest)} → {fmtDate(a.latest)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
            {[
              { label: 'Days wasted', value: fmtNum(days, 1), color: '#fb923c',
                sub: a.viewingLimited ? `${fmtNum(hours, 0)}h · last ${Math.round(a.viewingDays)} days only` : `${fmtNum(hours, 0)} hours total` },
              { label: 'Total likes given', value: fmtNum(data.likes.length), color: '#f0abfc',
                sub: `since ${fmtDate(a.earliest)}` },
              { label: 'Actions taken',   value: fmtNum(totalEngagement),    color: '#67e8f9', sub: 'likes + saves + comments (all time)' },
              { label: 'Engagement rate', value: `${fmtNum(engRate, 1)}%`,   color: '#86efac', sub: 'actions per 100 views (last 30d)' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-sm font-semibold mt-1.5" style={{ color: '#d8b4fe' }}>{s.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVITY BREAKDOWN ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {a.engagement.map(e => (
          <div key={e.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-xl mb-1.5">{e.icon}</p>
            <p className="text-2xl font-black tabular-nums" style={{ color: e.color }}>{fmtNum(e.value)}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{e.label}</p>
            {e.span && (
              <p className="text-[10px] text-gray-400 mt-0.5 leading-none">{e.span}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── PIE + PRIVACY ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Pie */}
        {a.activityPie.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500" /> What you consumed
            </h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={a.activityPie} cx="50%" cy="50%" innerRadius={38} outerRadius={64}
                    dataKey="value" stroke="none">
                    {a.activityPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number | string | undefined) => fmtNum(Number(v ?? 0))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {a.activityPie.map(p => (
                  <div key={p.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-gray-600">{p.name}</span>
                    <span className="font-bold text-gray-900 tabular-nums ml-auto pl-3">{fmtNum(p.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Privacy + profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-500" /> Instagram knows you well
          </h2>
          {[
            { label: 'Advertisers targeting you', value: data.advertiserCount, color: '#ef4444', icon: <Eye className="w-4 h-4" /> },
            { label: 'Accounts you follow',        value: data.followingCount,  color: '#7c3aed', icon: <Users className="w-4 h-4" /> },
            { label: 'Your followers',             value: data.followersCount,  color: '#2563eb', icon: <Users className="w-4 h-4" /> },
            { label: 'Times you logged in',        value: data.logins.length,   color: '#0891b2', icon: <LogIn className="w-4 h-4" /> },
            { label: 'Searches made',              value: data.searches.length, color: '#4f46e5', icon: <Search className="w-4 h-4" /> },
            { label: 'External links clicked',     value: data.links.length,    color: '#059669', icon: <Link2 className="w-4 h-4" /> },
          ].filter(r => r.value > 0).map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${row.color}18`, color: row.color }}>
                {row.icon}
              </div>
              <span className="text-sm text-gray-600 flex-1">{row.label}</span>
              <span className="text-base font-black tabular-nums" style={{ color: row.color }}>{fmtNum(row.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT ELSE ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" /> In {fmtNum(hours, 0)} hours you could have…
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WHAT_ELSE.map(c => (
            <div key={c.label} className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 p-4">
              <p className="text-2xl mb-2">{c.icon}</p>
              <p className="text-2xl font-black text-gray-900 tabular-nums">{fmtNum(hours * c.perHour)}</p>
              <p className="text-xs text-gray-500 leading-snug mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ALL-TIME TREND (uses likes for historical depth) ── */}
      {allMonths.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-500" /> All-Time Activity Trend
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {allMonths[0]?.label} → {allMonths[allMonths.length - 1]?.label} · {allMonths.length} months
            {a.viewingLimited && <span className="text-amber-600"> · likes drive the long-term history; views only in last ~30 days</span>}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={allMonths} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                {[
                  { id: 'gLike',  color: '#e11d48' },
                  { id: 'gVideo', color: '#c026d3' },
                  { id: 'gPost',  color: '#7c3aed' },
                  { id: 'gStory', color: '#2563eb' },
                ].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={g.color} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={g.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
                interval={Math.max(0, Math.floor(allMonths.length / 10) - 1)}
                tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              {data.likes.length   > 0 && <Area type="monotone" dataKey="likes"   name="Likes"   stackId="1" stroke="#e11d48" strokeWidth={2} fill="url(#gLike)"  dot={false} />}
              {data.videos.length  > 0 && <Area type="monotone" dataKey="videos"  name="Videos"  stackId="1" stroke="#c026d3" strokeWidth={1} fill="url(#gVideo)" dot={false} />}
              {data.posts.length   > 0 && <Area type="monotone" dataKey="posts"   name="Posts"   stackId="1" stroke="#7c3aed" strokeWidth={1} fill="url(#gPost)"  dot={false} />}
              {data.stories.length > 0 && <Area type="monotone" dataKey="stories" name="Stories" stackId="1" stroke="#2563eb" strokeWidth={1} fill="url(#gStory)" dot={false} />}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            {data.likes.length   > 0 && <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1 align-middle bg-rose-600" />Likes (all time)</span>}
            {data.videos.length  > 0 && <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1 align-middle bg-fuchsia-600" />Videos</span>}
            {data.posts.length   > 0 && <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1 align-middle bg-violet-600" />Posts</span>}
            {data.stories.length > 0 && <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1 align-middle bg-blue-600" />Stories</span>}
          </div>
        </div>
      )}

      {/* ── YEARLY SUMMARY ── */}
      {a.byYear.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" /> Year-by-Year Activity
          </h2>
          <p className="text-xs text-gray-400 mb-4">All-time engagement history</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={a.byYear} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="likes" name="Likes/Saves/Comments" stackId="a" fill="#e11d48" radius={[0,0,0,0]} />
              <Bar dataKey="views" name="Views" stackId="a" fill="#c026d3" radius={[0,0,0,0]} />
              <Bar dataKey="dms"   name="DMs"   stackId="a" fill="#7c3aed" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
            <span><span className="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-rose-600" />Likes/Comments</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-fuchsia-600" />Views</span>
            {data.dms.length > 0 && <span><span className="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-violet-600" />DMs</span>}
          </div>
        </div>
      )}

      {/* ── DOW + RADAR + HOUR ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Radar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Weekly scroll pattern</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
              <Radar name="Activity" dataKey="value" stroke="#c026d3" fill="#c026d3" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Day of week bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-violet-500" /> By day of week
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={a.byDow} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {a.byDow.map((_, i) => (
                  <Cell key={i} fill={i === 0 || i === 6 ? '#c026d3' : '#d8b4fe'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Weekends in darker pink</p>
        </div>
      </div>

      {/* ── HOUR OF DAY ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">When do you scroll most?</h2>
        <p className="text-xs text-gray-400 mb-4">Activity by hour of day (your local time)</p>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={a.byHour} margin={{ top: 0, right: 4, left: -24, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
              interval={2} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="count" radius={[3, 3, 0, 0]}>
              {a.byHour.map((d, i) => {
                const h = i;
                const col = h < 6 ? '#ef4444' : h < 12 ? '#3b82f6' : h < 18 ? '#8b5cf6' : '#ec4899';
                return <Cell key={i} fill={col} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          {[['#ef4444','Night (0–5am)'],['#3b82f6','Morning (6–11am)'],['#8b5cf6','Afternoon (12–5pm)'],['#ec4899','Evening (6–11pm)']].map(([c,l]) => (
            <span key={l}><span className="inline-block w-2 h-2 rounded-full mr-1 align-middle" style={{background:c}} />{l}</span>
          ))}
        </div>
      </div>

      {/* ── ENGAGEMENT FUNNEL ── */}
      {totalConsumption > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-rose-500" /> Your engagement funnel
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Content seen',    value: totalConsumption,       pct: 100,                                                        color: '#c026d3', icon: <Eye className="w-4 h-4" /> },
              { label: 'Posts liked',     value: data.likes.length,      pct: (data.likes.length    / totalConsumption) * 100, color: '#e11d48', icon: <Heart className="w-4 h-4" /> },
              { label: 'Posts saved',     value: data.saves.length,      pct: (data.saves.length    / totalConsumption) * 100, color: '#d97706', icon: <Bookmark className="w-4 h-4" /> },
              { label: 'Comments left',   value: data.comments.length,   pct: (data.comments.length / totalConsumption) * 100, color: '#0891b2', icon: <MessageSquare className="w-4 h-4" /> },
            ].filter(r => r.value > 0).map(row => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="flex items-center gap-2" style={{ color: row.color }}>
                    {row.icon} {row.label}
                  </span>
                  <span className="tabular-nums font-bold text-gray-800">
                    {fmtNum(row.value)} <span className="text-gray-400 font-normal text-xs">({fmtNum(row.pct, 1)}%)</span>
                  </span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, row.pct)}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            You engage with <strong style={{ color: '#c026d3' }}>{fmtNum(engRate, 1)}%</strong> of content you consume.
            {engRate < 2 ? ' Most scrolling is passive.' : engRate < 10 ? ' A moderate engager.' : ' Highly engaged user!'}
          </p>
        </div>
      )}

      {/* ── DM SECTION ── */}
      {data.dms.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-violet-500" /> Direct Messages
          </h2>

          {/* DM stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total messages',    value: fmtNum(data.dms.length),              color: '#7c3aed' },
              { label: 'Messages sent',     value: fmtNum(data.dmSent),                  color: '#c026d3' },
              { label: 'Messages received', value: fmtNum(data.dms.length - data.dmSent),color: '#2563eb' },
              { label: 'Conversations',     value: fmtNum(data.dmThreads.length),        color: '#0891b2' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-2xl font-black tabular-nums" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Shared content in DMs — donut + trend */}
          {a.dmBreakdown.length > 0 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content shared in DMs</p>

              {/* Stat strip */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Reels shared',   value: data.dmSharedReelTs.length,  icon: '🎬', color: '#c026d3', span: spanLabel(data.dmSharedReelTs) },
                  { label: 'Stories shared', value: data.dmSharedStoryTs.length, icon: '⭕', color: '#2563eb', span: spanLabel(data.dmSharedStoryTs) },
                  { label: 'Posts shared',   value: data.dmSharedPostTs.length,  icon: '🖼️', color: '#7c3aed', span: spanLabel(data.dmSharedPostTs) },
                ].filter(s => s.value > 0).map(s => (
                  <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                    <p className="text-lg mb-1">{s.icon}</p>
                    <p className="text-xl font-black tabular-nums" style={{ color: s.color }}>{fmtNum(s.value)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    {s.span && <p className="text-[10px] text-gray-400 mt-0.5">{s.span}</p>}
                  </div>
                ))}
              </div>

              {/* Donut + legend */}
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={a.dmBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={58}
                      dataKey="value" stroke="none">
                      {a.dmBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number | string | undefined) => fmtNum(Number(v ?? 0))} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 flex-1">
                  {a.dmBreakdown.map(d => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-gray-600 flex-1">{d.name}</span>
                      <span className="font-bold tabular-nums" style={{ color: d.color }}>{fmtNum(d.value)}</span>
                      <span className="text-xs text-gray-400">
                        {Math.round((d.value / a.dmBreakdown.reduce((s, x) => s + x.value, 0)) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shared content per month */}
              {a.bySharedMonth.length > 1 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Shared per month</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={a.bySharedMonth} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
                        interval={Math.max(0, Math.floor(a.bySharedMonth.length / 8) - 1)}
                        tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                      <Tooltip content={<ChartTip />} />
                      <Bar dataKey="reels"   name="Reels"   stackId="s" fill="#c026d3" radius={[0,0,0,0]} />
                      <Bar dataKey="posts"   name="Posts"   stackId="s" fill="#7c3aed" radius={[0,0,0,0]} />
                      <Bar dataKey="stories" name="Stories" stackId="s" fill="#2563eb" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-1 text-xs text-gray-400">
                    {data.dmSharedReelTs.length  > 0 && <span><span className="inline-block w-2 h-2 rounded-sm mr-1 align-middle bg-fuchsia-600" />Reels</span>}
                    {data.dmSharedPostTs.length  > 0 && <span><span className="inline-block w-2 h-2 rounded-sm mr-1 align-middle bg-violet-600" />Posts</span>}
                    {data.dmSharedStoryTs.length > 0 && <span><span className="inline-block w-2 h-2 rounded-sm mr-1 align-middle bg-blue-600" />Stories</span>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Top conversations */}
          {a.topThreads.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Most active conversations</p>
              <div className="space-y-2">
                {(() => {
                  const maxCount = a.topThreads[0]?.count ?? 1;
                  return a.topThreads.map((t, i) => (
                    <div key={t.title} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4 text-right flex-shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800 truncate pr-2">{t.title}</span>
                          <span className="text-xs tabular-nums text-gray-500 flex-shrink-0">{fmtNum(t.count)} msgs</span>
                        </div>
                        <div className="h-2 rounded-full bg-violet-50 overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${(t.count / maxCount) * 100}%`, background: i === 0 ? '#7c3aed' : '#c4b5fd' }} />
                        </div>
                      </div>
                      {data.dmSent > 0 && (
                        <span className="text-xs text-gray-400 flex-shrink-0 w-14 text-right">
                          {Math.round((t.sent / t.count) * 100)}% you
                        </span>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* DM monthly bars (last 24 months that have data) */}
          {(() => {
            const dmMonths = a.byMonth.filter(m => m.dms > 0).slice(-24);
            if (dmMonths.length < 2) return null;
            return (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Messages per month</p>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={dmMonths} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                    <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
                      interval={Math.max(0, Math.floor(dmMonths.length / 8) - 1)}
                      tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="dms" name="Messages" fill="#7c3aed" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── TOP CREATORS ── */}
      {a.topCreators.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" /> You interact most with
          </h2>
          <p className="text-xs text-gray-400 mb-4">Accounts you liked most (from liked posts data)</p>
          <div className="space-y-2.5">
            {a.topCreators.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 w-5 text-right flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800 truncate pr-2">@{c.name}</span>
                    <span className="text-xs tabular-nums text-gray-500 flex-shrink-0">{c.count} likes</span>
                  </div>
                  <div className="h-2 rounded-full bg-pink-50 overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${(c.count / a.topCreators[0].count) * 100}%`, background: i === 0 ? '#e11d48' : '#fca5a5' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Your #1 most-liked creator gets <strong style={{ color: '#e11d48' }}>{((a.topCreators[0].count / Math.max(a.data.likes.length, 1)) * 100).toFixed(1)}%</strong> of your likes.
          </p>
        </div>
      )}

      {/* ── TREND PROJECTION ── */}
      {a.trendProjection.length > 3 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-500" /> Activity Trend Projection
          </h2>
          <p className="text-xs text-gray-400 mb-4">Last 6 months + 3-month linear projection (dashed)</p>
          <ResponsiveContainer width="100%" height={180}>
            <ComposedChart data={a.trendProjection} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="total" name="Activity"
                fill="#c026d3"
                radius={[4, 4, 0, 0]}
              >
                {a.trendProjection.map((d, i) => (
                  <Cell key={i} fill={d.projected ? '#f5d0fe' : '#c026d3'} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="total" name="Trend"
                stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 4" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2">* Projected months shown in lighter color. Based on least-squares linear regression.</p>
        </div>
      )}

      {/* ── EXPORT SUMMARY CARD ── */}
      {(() => {
        const peakHour = a.peakHourLabel;
        const peakDay  = a.peakDow;
        const dateStr  = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        const text = [
          `📊 My Instagram Stats (analyzed ${dateStr})`,
          `• Total posts liked: ${fmtNum(a.data.likes.length)}`,
          `• Reels watched: ${fmtNum(a.data.videos.length)}`,
          `• Most active day: ${peakDay}`,
          `• Peak hour: ${peakHour}`,
          `• Analyzed with: unblockdevs.com/instagram-reels-analyzer`,
        ].join('\n');
        return (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900">Copy insight card</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text).catch(() => {}).then(() => {
                    setInsightCopied(true); setTimeout(() => setInsightCopied(false), 2000);
                  });
                }}
                className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${insightCopied ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {insightCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans bg-white rounded-xl p-4 border border-gray-200 select-all">
              {text}
            </pre>
          </div>
        );
      })()}

      {/* ── MONTHLY TABLE ── */}
      <div className="rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)', border: '1px solid #f5d0fe' }}>
        <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-500" />
          {a.viewingLimited ? 'All months with activity' : 'Last 12 months breakdown'}
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          {a.viewingLimited
            ? `Showing all ${a.byMonth.length} months · likes drive historical data`
            : 'Showing recent months'}
        </p>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0" style={{ background: '#fdf4ff' }}>
              <tr className="border-b border-pink-100">
                {['Month', ...(data.likes.length > 0 ? ['Likes'] : []),
                  ...(data.videos.length > 0 ? ['Videos'] : []),
                  ...(data.posts.length > 0 ? ['Posts'] : []),
                  ...(data.stories.length > 0 ? ['Stories'] : []),
                  ...(data.dms.length > 0 ? ['DMs'] : []),
                  'Total','Bar'].map(h => (
                  <th key={h} className="text-right first:text-left py-2 pr-3 text-xs font-semibold text-gray-500 uppercase tracking-wide last:text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(a.viewingLimited ? [...a.byMonth].reverse() : a.byMonth.slice(-12).reverse()).map(m => (
                <tr key={m.label} className="border-b border-pink-50">
                  <td className="py-2 pr-3 font-medium text-gray-800 whitespace-nowrap">{m.label}</td>
                  {data.likes.length   > 0 ? <td className="py-2 pr-3 text-right tabular-nums text-rose-700">{fmtNum(m.likes)}</td>    : null}
                  {data.videos.length  > 0 ? <td className="py-2 pr-3 text-right tabular-nums text-fuchsia-700">{fmtNum(m.videos)}</td> : null}
                  {data.posts.length   > 0 ? <td className="py-2 pr-3 text-right tabular-nums text-violet-700">{fmtNum(m.posts)}</td>   : null}
                  {data.stories.length > 0 ? <td className="py-2 pr-3 text-right tabular-nums text-blue-700">{fmtNum(m.stories)}</td>   : null}
                  {data.dms.length     > 0 ? <td className="py-2 pr-3 text-right tabular-nums text-violet-600">{fmtNum(m.dms)}</td>     : null}
                  <td className="py-2 pr-3 text-right tabular-nums font-bold text-gray-700">{fmtNum(m.total)}</td>
                  <td className="py-2">
                    <div className="h-2 rounded-full bg-pink-100 w-24 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(m.total / peakBar) * 100}%`, background: '#c026d3' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Time estimates: videos={AVG.videos}s · posts={AVG.posts}s · stories={AVG.stories}s · ads={AVG.ads}s avg.
        All data processed in-browser · nothing uploaded.
      </p>
    </div>
  );
}

// ─── Root component ────────────────────────────────────────────────────────────

type State = 'idle' | 'loading' | 'done' | 'error';

export default function InstagramAnalyzerClient({ hideNav = false }: { hideNav?: boolean }) {
  const [state,    setState]    = useState<State>('idle');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error,    setError]    = useState('');
  const [isSample, setIsSample] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setState('loading');
    setError('');
    setIsSample(false);
    try {
      const data = file.name.endsWith('.zip') ? await parseZip(file) : await parseJsonFile(file);
      setAnalysis(analyse(data));
      setState('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse file.');
      setState('error');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">

      {!hideNav && (
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4" /> UnblockDevs Tools
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Instagram Reels Analyzer</span>
        </div>
      </header>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-4"
            style={{ background: '#fdf4ff', color: '#c026d3', borderColor: '#f5d0fe' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c026d3' }} />
            100% Private — Runs in Your Browser
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
            How Many Days Did Instagram Steal?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Upload your Instagram data export for a complete breakdown — videos, posts, stories, ads,
            likes, searches, logins, and how many advertisers are targeting you.
          </p>
        </div>

        {state === 'idle' || state === 'error' ? (
          <div className="space-y-6">
            <UploadZone onFile={handleFile} />
            <button
              type="button"
              onClick={() => { setAnalysis(SAMPLE_IG); setState('done'); setIsSample(true); }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-purple-200 py-3 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50 hover:border-purple-300"
            >
              <span>👀</span> See a sample result first
            </button>
            {state === 'error' && (
              <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">How to download your Instagram data</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Follow these steps exactly — export may take hours to days</p>
                </div>
                <span className="text-2xl">📥</span>
              </div>
              <div className="px-6 py-5">
                <ol className="space-y-5">
                  {DOWNLOAD_STEPS.map((step) => (
                    <li key={step.num} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #c026d3, #9333ea)' }}>{step.num}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-0.5">{step.title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: step.body }} />
                        {step.tip && (
                          <div className={`mt-2 rounded-lg border px-3 py-2 text-xs leading-relaxed ${step.tipColor}`}>
                            {step.tip}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-xs text-purple-800 leading-relaxed">
                  <strong>After the export arrives:</strong> Download the <strong>.zip</strong> file from the email link and drop it directly onto this page — no unzipping needed. The analysis runs entirely in your browser and nothing is uploaded.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '📦', title: 'Full ZIP or individual files', body: 'Drop the full export ZIP or just specific JSON files from inside it.' },
                { icon: '🔒', title: 'Zero data leaves your device', body: 'All parsing happens in your browser — nothing reaches any server.' },
                { icon: '📊', title: '10 activity dimensions', body: 'Videos, posts, stories, ads, likes, saves, searches, logins, links, advertisers.' },
              ].map(c => (
                <div key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-2xl mb-2">{c.icon}</p>
                  <p className="text-sm font-bold text-gray-900 mb-1">{c.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

        ) : state === 'loading' ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
            <p className="text-gray-500 text-sm">Analysing your Instagram data across all activity types…</p>
          </div>

        ) : analysis ? (
          <div className="space-y-6">
            {isSample && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
                <span className="text-sm text-amber-800 font-medium">📊 Sample data — not your real account</span>
                <button onClick={() => { setAnalysis(null); setState('idle'); setIsSample(false); }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 whitespace-nowrap">
                  Analyze yours →
                </button>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => { setAnalysis(null); setState('idle'); setIsSample(false); }}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Analyse another file
              </button>
              {!isSample && <ShareButton a={analysis} />}
            </div>
            <Results a={analysis} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
