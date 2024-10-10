import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role'),
});
export const threads = sqliteTable('threads', {
  id_thread: integer('id_thread').primaryKey(),
  id_category: integer('id_category').references(() => categories.id_category),
  id_user: integer('id').references(() => users.id),
  content: text('content'),
  title: text('title'),
  publication_date: text('publication_date'),
});
export const categories = sqliteTable('categories', {
  id_category: integer('id_category').primaryKey(),
  name: text('name'),
  description: text('description'),
});
export const comments = sqliteTable('comments', {
  id_comment: integer('id_comment').primaryKey(),
  id_thread: integer('id_thread').references(() => threads.id_thread),
  id_user: integer('id').references(() => users.id),
  content: text('content'),
  publication_date: text('publication_date'),
});
export const votes = sqliteTable('votes', {
  id_vote: integer('id_vote').primaryKey(),
  id_thread: integer('id_thread').references(() => threads.id_thread),
  id_user: integer('id').references(() => users.id),
  type: integer('type'),
});
