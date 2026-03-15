import { NextResponse } from 'next/server';

/** GET: minimal response for latency measurement. No body. */
export async function GET() {
  return new NextResponse(null, { status: 204 });
}
