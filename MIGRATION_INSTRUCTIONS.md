# MongoDB Migration Instructions

## Overview
This guide explains how to migrate the `visits` collection from the `test` database to the new `UnblockDevs` database, and set up the new collections for newsletter and feedback.

## Prerequisites
- MongoDB connection string with access to both databases
- Node.js installed
- MongoDB native driver (will be installed if needed)

## Step 1: Install MongoDB Native Driver (if needed)

The migration script uses the native MongoDB driver. Install it if not already installed:

```bash
npm install mongodb
```

## Step 2: Run the Migration Script

You can run the migration script in two ways:

### Option 1: Using environment variable
```bash
MONGODB_URI="mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" node scripts/migrate-visits.js
```

### Option 2: Using default connection string
The script has a default connection string, so you can simply run:
```bash
node scripts/migrate-visits.js
```

## Step 3: Verify Migration

After running the script, verify the migration in MongoDB Compass:

1. Connect to your cluster: `cluster0.wigbba7.mongodb.net`
2. Check the `UnblockDevs` database
3. Verify the `visits` collection exists with all documents
4. Check that indexes are created (especially the unique index on `date`)

## Step 4: Verify New Collections

The application will automatically create the following collections when first used:

- **newsletters** - Stores newsletter email subscriptions
- **feedbacks** - Stores user feedback, bug reports, and feature requests

These collections will be created automatically when users subscribe to the newsletter or submit feedback.

## Database Structure

### UnblockDevs Database Collections:

1. **visits** (migrated from test.visits)
   - `date` (String, unique, indexed) - Date in YYYY-MM-DD format
   - `dailyVisits` (Number) - Number of visits for that day
   - `lastUpdated` (Date) - Last update timestamp
   - `createdAt` (Date) - Creation timestamp
   - `updatedAt` (Date) - Update timestamp

2. **newsletters** (new)
   - `email` (String, unique, indexed, lowercase) - Subscriber email
   - `subscribedAt` (Date) - Subscription timestamp
   - `unsubscribedAt` (Date, optional) - Unsubscription timestamp
   - `isActive` (Boolean) - Active subscription status
   - `createdAt` (Date) - Creation timestamp
   - `updatedAt` (Date) - Update timestamp

3. **feedbacks** (new)
   - `type` (String, enum: 'feedback', 'bug', 'feature', indexed) - Feedback type
   - `name` (String, optional) - User's name
   - `email` (String, optional, lowercase) - User's email
   - `message` (String, required) - Feedback message
   - `toolName` (String, optional) - Associated tool name
   - `status` (String, enum: 'new', 'reviewed', 'resolved', 'archived', indexed) - Feedback status
   - `createdAt` (Date) - Creation timestamp
   - `updatedAt` (Date) - Update timestamp

## Troubleshooting

### Error: Cannot find module 'mongodb'
Install the MongoDB native driver:
```bash
npm install mongodb
```

### Error: Duplicate key error
This is normal if you run the migration multiple times. The script handles duplicates gracefully and will skip existing documents.

### Error: Connection timeout
- Check your internet connection
- Verify the MongoDB connection string is correct
- Ensure your IP is whitelisted in MongoDB Atlas (if using Atlas)

## Next Steps

After migration:
1. Test newsletter subscription on the website
2. Test feedback submission
3. Verify data is being stored in MongoDB Compass
4. Optionally delete the old `visits` collection from the `test` database (after verifying migration)

## Notes

- The migration script does NOT delete the source collection. The `test.visits` collection remains intact.
- You can manually delete it from MongoDB Compass after verifying the migration.
- All new subscriptions and feedback will automatically be stored in the `UnblockDevs` database.

