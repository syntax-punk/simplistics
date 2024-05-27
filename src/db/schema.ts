import {sql} from 'drizzle-orm';
import {text, integer, sqliteTable} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id'),
  name: text('name'),
  age: integer('age'),
  email: text('email'),
});
