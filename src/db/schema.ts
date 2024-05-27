import {sql} from 'drizzle-orm';
import {text, sqliteTable} from 'drizzle-orm/sqlite-core';

export const visits = sqliteTable('visits', {
  domain: text('domain'),
  path: text('path'),
  timestamp: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
});

export type DrizzleVisits = typeof visits.$inferSelect;
