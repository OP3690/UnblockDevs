import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Visit from '@/models/Visit';

/** Fire-and-forget visit increment. Called from client after page load — never blocks TTFB or render. */
export async function POST() {
  try {
    await connectDB();
    const today = new Date().toISOString().split('T')[0];
    await Visit.findOneAndUpdate(
      { date: today },
      { $inc: { dailyVisits: 1 }, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
