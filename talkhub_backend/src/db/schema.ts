import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role'),
});

export const categories = sqliteTable('categories', {
  id_category: integer('id_category').primaryKey(),
  name: text('name'),
  description: text('description'),
});

export const threads = sqliteTable('threads', {
  id_thread: integer('id_thread').primaryKey(),
  id_category: integer('id_category').references(() => categories.id_category),
  id_user: integer('id').references(() => users.id),
  content: text('content'),
  title: text('title'),
  publication_date: text('publication_date'),
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

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  threads: many(threads),
  comments: many(comments),
  votes: many(votes),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  threads: many(threads),
}));

export const threadsRelations = relations(threads, ({ one, many }) => ({
  user: one(users, {
    fields: [threads.id_user],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [threads.id_category],
    references: [categories.id_category],
  }),
  comments: many(comments),
  votes: many(votes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.id_user],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [comments.id_thread],
    references: [threads.id_thread],
  }),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.id_user],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [votes.id_thread],
    references: [threads.id_thread],
  }),
}));
