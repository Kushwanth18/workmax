import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from "@/drizzle/migrations";
import * as schema from '@/db/schema'
import { DATABASE_NAME } from './_layout';

export async function initializeDatabase() {
  try {
    console.log('Starting database migration...');
    const expoDB = await SQLite.openDatabaseSync(DATABASE_NAME);
    const db = drizzle(expoDB, { schema });
    console.log('Database instance created.');
    console.log('Migration files:', migrations);
    await migrate(db,migrations);
    console.log('Database migrated successfully.');
  } catch (error) {
    console.error('Error migrating database:', error);
    throw error;
  }
}