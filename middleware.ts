import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PERMANENT = 301

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const isWww = hostname.startsWith('www.')
  const isHttp = request.url.startsWith('http://')
  const isLocalhost = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')

  // Single-hop redirect to canonical https + non-www (avoids chains like http→https→www→non-www)
  // Skip for localhost dev server
  if (!isLocalhost && (isWww || isHttp)) {
    const canonicalHost = hostname.replace(/^www\./, '')
    const path = request.nextUrl.pathname + request.nextUrl.search
    const canonicalUrl = new URL(path, `https://${canonicalHost}`)
    return NextResponse.redirect(canonicalUrl, PERMANENT)
  }

  // Blog pagination: noindex via header so crawl budget goes to /blog and post URLs (belt-and-suspenders with metadata)
  const pathname = request.nextUrl.pathname
  const page = request.nextUrl.searchParams.get('page')
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
     * - manifest.json, robots.txt, ads.txt (static metadata)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|manifest\\.json|robots\\.txt|ads\\.txt).*)',
  ],
}

