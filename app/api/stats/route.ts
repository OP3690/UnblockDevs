import { NextRequest, NextResponse } from 'next/server';

// In-memory store (in production, use a database like Redis or PostgreSQL)
interface Visit {
  ip: string;
  timestamp: number;
  userAgent: string;
}

interface ActiveSession {
  sessionId: string;
  timestamp: number;
  ip: string;
}

// Store visits and sessions in memory
// In production, use Redis or a database
let visits: Visit[] = [];
let activeSessions: Map<string, ActiveSession> = new Map();

// Clean up old data every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

setInterval(() => {
  const now = Date.now();
  
  // Clean old visits (keep last 24 hours)
  visits = visits.filter(v => now - v.timestamp < 24 * 60 * 60 * 1000);
  
  // Clean old sessions
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now - session.timestamp > SESSION_TIMEOUT) {
      activeSessions.delete(sessionId);
    }
  }
}, CLEANUP_INTERVAL);

export async function GET(request: NextRequest) {
  const now = Date.now();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Track visit
  visits.push({
    ip,
    timestamp: now,
    userAgent,
  });
  
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
  
  // Get unique visits (by IP) in last 24 hours
  const last24Hours = now - 24 * 60 * 60 * 1000;
  const recentVisits = visits.filter(v => v.timestamp > last24Hours);
  const uniqueIPs = new Set(recentVisits.map(v => v.ip));
  
  // Count active users (sessions active in last 5 minutes)
  const activeUsers = activeSessions.size;
  
  // Total unique visits (all time unique IPs)
  const totalUniqueVisits = new Set(visits.map(v => v.ip)).size;
  
  const response = NextResponse.json({
    activeUsers,
    totalVisits: totalUniqueVisits,
    visitsLast24h: uniqueIPs.size,
  });
  
  // Set session cookie
  response.cookies.set('unblockdevs_session', sessionId, {
    maxAge: SESSION_TIMEOUT / 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  
  return response;
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


