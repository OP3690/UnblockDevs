# MongoDB Setup for Stats Tracking

## Overview
The application now uses MongoDB to store daily visit statistics. The stats system:
- **Active Users**: Multiplied by 10 (e.g., 1 active user = 10 displayed)
- **Total Visits**: Base of 10,000 + sum of all daily visits stored in MongoDB

## Environment Variable

For production (Vercel), add the following environment variable:

**Variable Name:** `MONGODB_URI`  
**Value:** `mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

### How to Add in Vercel:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - **Environment:** Production, Preview, Development (select all)
4. Save and redeploy

## Database Structure

The application creates a `visits` collection with the following schema:

```typescript
{
  date: string,        // Format: YYYY-MM-DD (e.g., "2025-01-30")
  dailyVisits: number, // Number of visits for that day
  lastUpdated: Date,   // Last update timestamp
  createdAt: Date,     // Document creation timestamp
  updatedAt: Date      // Document update timestamp
}
```

## How It Works

1. **Daily Visits**: Each time a user visits the site, the API increments the daily visit count for today's date
2. **Total Visits Calculation**: `10,000 (base) + sum of all daily visits from MongoDB`
3. **Active Users**: Count of active sessions in the last 5 minutes, multiplied by 10

## Local Development

For local development, the MongoDB URI is hardcoded as a fallback in `lib/mongodb.ts`. You can also create a `.env.local` file:

```
MONGODB_URI=mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## Notes

- The connection is cached to prevent multiple connections
- Daily visits are tracked per day (YYYY-MM-DD format)
- The base of 10,000 is constant and added to all daily visits
- Active users are tracked in-memory (sessions) and multiplied by 10 for display

