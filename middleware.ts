import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PERMANENT = 301

// ── ?tab= → canonical tool page map ─────────────────────────────────────────
// Keep in sync with page-client.tsx toolPageUrls
const TAB_REDIRECTS: Record<string, string> = {
  beautifier: '/json-beautifier',
  fixer: '/json-fixer-online',
  comparator: '/api-comparator',
  jsoncompare: '/json-comparator',
  schema: '/json-schema-generation',
  logs: '/log-explorer',
  payload: '/payload-analyzer',
  curl: '/curl-converter',
  mock: '/mock-api-generator',
  testdata: '/test-data-generator',
  config: '/config-comparator',
  sql: '/sql-formatter',
  builder: '/log-unpacker',
  promptchunk: '/prompt-chunker',
  schemamasker: '/ai-schema-masker',
  jsonpromptshield: '/json-prompt-shield',
  codemasker: '/code-prompt-shield',
  regextester: '/regex-tester',
  tokencompare: '/token-comparator',
  timezone: '/timezone-translator',
  hartocurl: '/har-to-curl',
  curlfailure: '/curl-failure-root-cause-engine',
}

// ── Tracking / campaign params to strip ─────────────────────────────────────
// These are appended by Google Ads, Meta Ads, UTM campaigns, etc.
// Keeping them causes Googlebot to index URL variants as "alternate pages".
const TRACKING_PARAMS = new Set([
  // Google Ads / Analytics
  'gclid', 'gad_source', 'gad_campaignid', 'gad_adgroupid', 'gad_creative',
  'gad_keyword', 'gad_matchtype', 'gad_network', 'gad_placement',
  // UTM campaign parameters (all sources)
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
  // Meta / Facebook Ads
  'fbclid', 'fb_action_ids', 'fb_action_types', 'fb_ref', 'fb_source',
  // Microsoft Ads
  'msclkid',
  // Twitter / X Ads
  'twclid',
  // LinkedIn Ads
  'li_fat_id',
  // TikTok Ads
  'ttclid',
  // Pinterest
  'epik',
  // Generic tracking
  'ref', 'referrer', 'source', 'mc_cid', 'mc_eid',
])

export function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const isLocalhost = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')

  // ── 1. Canonical host redirect: http → https, www → non-www (single-hop) ──
  const isWww = hostname.startsWith('www.')
  const isHttp = request.url.startsWith('http://')
  if (!isLocalhost && (isWww || isHttp)) {
    const canonicalHost = hostname.replace(/^www\./, '')
    const canonicalUrl = new URL(pathname + request.nextUrl.search, `https://${canonicalHost}`)
    return NextResponse.redirect(canonicalUrl, PERMANENT)
  }

  // ── 2. ?tab= → dedicated tool page (server-side, prevents "alternate page") ─
  const tab = searchParams.get('tab')
  if (tab && TAB_REDIRECTS[tab]) {
    return NextResponse.redirect(new URL(TAB_REDIRECTS[tab], origin), PERMANENT)
  }

  // ── 3. Strip tracking/campaign params → clean canonical URL ──────────────
  // Prevents Google from treating ad-tagged URLs as "alternate pages"
  const hasTracking = [...searchParams.keys()].some(k => TRACKING_PARAMS.has(k))
  if (hasTracking) {
    const cleanParams = new URLSearchParams()
    for (const [key, value] of searchParams.entries()) {
      if (!TRACKING_PARAMS.has(key)) {
        cleanParams.set(key, value)
      }
    }
    const cleanSearch = cleanParams.toString()
    const cleanUrl = new URL(pathname + (cleanSearch ? '?' + cleanSearch : ''), origin)
    return NextResponse.redirect(cleanUrl, PERMANENT)
  }

  // ── 4. Blog pagination noindex ────────────────────────────────────────────
  const page = searchParams.get('page')
  if (pathname === '/blog' && page && parseInt(page, 10) > 1) {
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, follow')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api, _next/static, _next/image (Next.js internals)
     * - favicon.ico, icon.png, apple-icon.png (icons / PWA)
     * - manifest.json, robots.txt, ads.txt, sitemap.xml (static metadata)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|manifest\\.json|robots\\.txt|ads\\.txt|sitemap\\.xml).*)',
  ],
}
