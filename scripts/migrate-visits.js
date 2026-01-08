/**
 * Migration script to migrate visits collection from 'test' database to 'UnblockDevs' database
 * 
 * Usage: 
 *   MONGODB_URI="your_connection_string" node scripts/migrate-visits.js
 *   OR
 *   node scripts/migrate-visits.js (uses default connection string)
 * 
 * Note: This script connects to both databases using the same connection string
 * but accesses different databases by name.
 * 
 * Requires: mongoose (already installed as dependency)
 */

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function migrateVisits() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get source database (test) - use native driver through mongoose connection
    const sourceDb = mongoose.connection.client.db('test');
    const targetDb = mongoose.connection.client.db('UnblockDevs');

    // Check if visits collection exists in source
    const sourceCollections = await sourceDb.listCollections().toArray();
    const visitsExists = sourceCollections.some(col => col.name === 'visits');

    if (!visitsExists) {
      console.log('No visits collection found in test database. Nothing to migrate.');
      return;
    }

    console.log('Found visits collection in test database. Starting migration...');

    // Get all documents from source collection
    const sourceCollection = sourceDb.collection('visits');
    const documents = await sourceCollection.find({}).toArray();
    
    console.log(`Found ${documents.length} documents to migrate`);

    if (documents.length === 0) {
      console.log('No documents to migrate.');
      return;
    }

    // Create target collection in UnblockDevs database
    const targetCollection = targetDb.collection('visits');

    // Insert documents into target collection
    // Use insertMany with ordered: false to handle duplicates gracefully
    try {
      const result = await targetCollection.insertMany(documents, { ordered: false });
      console.log(`Successfully migrated ${result.insertedCount} documents to UnblockDevs.visits`);
    } catch (error) {
      // Handle duplicate key errors (if documents already exist)
      if (error.code === 11000 || error.writeErrors) {
        const inserted = documents.length - (error.writeErrors?.length || 0);
        console.log(`Migrated ${inserted} documents. ${error.writeErrors?.length || 0} documents already exist (skipped).`);
      } else {
        throw error;
      }
    }

    // Create indexes on target collection (same as source)
    try {
      await targetCollection.createIndex({ date: 1 }, { unique: true });
      console.log('Created indexes on target collection');
    } catch (error) {
      // Index might already exist
      if (error.code !== 85) { // 85 = IndexOptionsConflict
        console.log('Note: Index creation skipped (may already exist)');
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\nNote: The source collection in test database is still intact.');
    console.log('You can manually delete it from MongoDB Compass if needed.');

  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run migration
migrateVisits();

