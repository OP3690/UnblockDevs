import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Redirect www to non-www while preserving all query parameters (including UTM)
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.hostname = hostname.replace('www.', '')
    // Preserve all query parameters (UTM parameters, etc.)
    // Next.js automatically preserves query params when cloning, but we ensure it explicitly
    url.search = request.nextUrl.search
    return NextResponse.redirect(url, 301)
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

