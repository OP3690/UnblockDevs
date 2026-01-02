import { NextRequest, NextResponse } from 'next/server'

// IndexNow API endpoint for instant indexing notifications
// This allows search engines to be notified immediately when content changes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { host, key, keyLocation, urlList } = body

    // Validate the request
    if (!host || !key || !urlList || !Array.isArray(urlList)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // IndexNow protocol: Notify search engines about URL changes
    // This is a webhook endpoint that search engines can call
    // You can also proactively notify search engines when content changes

    // For now, we'll log the notification (in production, you'd process this)
    console.log('IndexNow notification received:', {
      host,
      key,
      urlList,
    })

    return NextResponse.json({
      success: true,
      message: 'IndexNow notification received',
    })
  } catch (error) {
    console.error('IndexNow error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to verify IndexNow key
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const key = searchParams.get('key')

  // In production, verify the key matches your IndexNow key
  // For now, return a simple response
  if (key) {
    return NextResponse.json({ verified: true })
  }

  return NextResponse.json({ message: 'IndexNow endpoint active' })
}

