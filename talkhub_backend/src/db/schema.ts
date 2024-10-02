import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role'),
});