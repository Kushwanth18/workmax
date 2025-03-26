import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const workout = sqliteTable('workout', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  wname: text('wname').notNull(),
  nsets: text('nsets').notNull(), // Corrected line
  nreps: text('nreps').notNull(),
  date: text('date').notNull(), // Corrected line
  weight:text('weight').notNull(),
});