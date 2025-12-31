import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Visit from '@/models/Visit';

// In-memory store for active sessions
interface ActiveSession {
  sessionId: string;
  timestamp: number;
  ip: string;
}

// Store active sessions in memory
let activeSessions: Map<string, ActiveSession> = new Map();

// Clean up old sessions every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BASE_VISITS = 10000; // Base constant for total visits

setInterval(() => {
  const now = Date.now();
  // Clean old sessions
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now - session.timestamp > SESSION_TIMEOUT) {
      activeSessions.delete(sessionId);
    }
  }
}, CLEANUP_INTERVAL);

// Get today's date in YYYY-MM-DD format
function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Get or create today's visit record and increment
async function incrementDailyVisit(): Promise<number> {
  try {
    await connectDB();
    const today = getTodayDate();
    
    const visitRecord = await Visit.findOneAndUpdate(
      { date: today },
      { 
        $inc: { dailyVisits: 1 },
        lastUpdated: new Date(),
      },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return visitRecord.dailyVisits;
  } catch (error) {
    console.error('Error incrementing daily visit:', error);
    // Return a default value instead of 0 to indicate the system is working
    return 1;
  }
}

// Get total visits (base + sum of all daily visits)
async function getTotalVisits(): Promise<number> {
  try {
    await connectDB();
    
    const result = await Visit.aggregate([
      {
        $group: {
          _id: null,
          totalDailyVisits: { $sum: '$dailyVisits' },
        },
      },
    ]);

    const totalDailyVisits = result.length > 0 ? result[0].totalDailyVisits : 0;
    return BASE_VISITS + totalDailyVisits;
  } catch (error) {
    console.error('Error getting total visits:', error);
    return BASE_VISITS;
  }
}

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Get or create session
    const sessionId = request.cookies.get('unblockdevs_session')?.value || 
                      `session_${now}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update or create session
    activeSessions.set(sessionId, {
      sessionId,
      timestamp: now,
      ip,
    });
    
    // Clean old sessions before counting
    for (const [sid, session] of activeSessions.entries()) {
      if (now - session.timestamp > SESSION_TIMEOUT) {
        activeSessions.delete(sid);
      }
    }
    
    // Count active users (sessions active in last 5 minutes)
    const activeUsers = activeSessions.size;
    
    // Try to increment daily visit in MongoDB (non-blocking)
    incrementDailyVisit().catch(err => {
      console.error('Failed to increment visit (non-critical):', err);
    });
    
    // Get total visits (base + daily visits)
    let totalVisits = BASE_VISITS;
    try {
      totalVisits = await getTotalVisits();
    } catch (error) {
      console.error('Failed to get total visits, using base value:', error);
      // If MongoDB is not available, still return base visits
      totalVisits = BASE_VISITS;
    }
    
    const response = NextResponse.json({
      activeUsers: activeUsers * 10, // Multiply by 10 as requested
      totalVisits,
    });
    
    // Set session cookie
    response.cookies.set('unblockdevs_session', sessionId, {
      maxAge: SESSION_TIMEOUT / 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return response;
  } catch (error) {
    console.error('Error in GET /api/stats:', error);
    // Return fallback values if everything fails
    return NextResponse.json({
      activeUsers: activeSessions.size * 10,
      totalVisits: BASE_VISITS,
    });
  }
}

export async function POST(request: NextRequest) {
  // Heartbeat endpoint to keep session alive
  const sessionId = request.cookies.get('unblockdevs_session')?.value;
  
  if (sessionId && activeSessions.has(sessionId)) {
    const session = activeSessions.get(sessionId)!;
    session.timestamp = Date.now();
    activeSessions.set(sessionId, session);
  }
  
  return NextResponse.json({ success: true });
}
