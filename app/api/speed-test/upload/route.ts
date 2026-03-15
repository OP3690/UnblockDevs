import { NextResponse } from 'next/server';

/** POST: accept body (for upload speed test), return 200. */
export async function POST(request: Request) {
  await request.arrayBuffer();
  return new NextResponse(null, { status: 200 });
}
