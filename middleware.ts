import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PERMANENT = 301

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const isWww = hostname.startsWith('www.')
  const isHttp = request.url.startsWith('http://')

  // Single-hop redirect to canonical https + non-www (avoids chains like http→https→www→non-www)
  if (isWww || isHttp) {
    const canonicalHost = hostname.replace(/^www\./, '')
    const path = request.nextUrl.pathname + request.nextUrl.search
    const canonicalUrl = new URL(path, `https://${canonicalHost}`)
    return NextResponse.redirect(canonicalUrl, PERMANENT)
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

