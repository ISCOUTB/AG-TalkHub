import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  bio: text('bio'),
  creation_date: text('creation_date'),
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
  id_comment: integer('id_comment').references(() => comments.id_comment),
  id_thread: integer('id_thread').references(() => threads.id_thread),
  id_user: integer('id').references(() => users.id),
  type: integer('type'),
});

export const reports = sqliteTable('reports', {
  id_report: integer('id_report').primaryKey(),
  id_comment: integer('id_comment').references(() => comments.id_comment),
  id_user: integer('id').references(() => users.id),
  id_reporting_user: integer('id_reporting_user').references(() => users.id),
  reason: text('reason'),
  date: text('date'),
});

export const bans = sqliteTable('bans', {
  id_ban: integer('id_ban').primaryKey(),
  id_user: integer('id').references(() => users.id),
  date: text('date'),
  reason: text('reason'),
});

export const notifications = sqliteTable('notifications', {
  id_notification: integer('id_notification').primaryKey(),
  id_thread: integer('id_thread').references(() => threads.id_thread),
  id_user: integer('id').references(() => users.id),
  message: text('message'),
  date: text('date'),
});

export const modaplications = sqliteTable('modaplications', {
  id_modaplication: integer('id_modaplication').primaryKey(),
  id_user: integer('id').references(() => users.id),
  date: text('date'),
  reason: text('reason'),
});

// Define relationships
export const reportsRelations = relations(reports, ({ one }) => ({
  user: one(users, {
    fields: [reports.id_user],
    references: [users.id],
  }),
  reporting_user: one(users, {
    fields: [reports.id_reporting_user],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [reports.id_comment],
    references: [comments.id_comment],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.id_user],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [notifications.id_thread],
    references: [threads.id_thread],
  }),
}));

export const modaplicationsRelations = relations(modaplications, ({ one }) => ({
  user: one(users, {
    fields: [modaplications.id_user],
    references: [users.id],
  }),
}));

export const bansRelations = relations(bans, ({ one }) => ({
  user: one(users, {
    fields: [bans.id_user],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  threads: many(threads),
  comments: many(comments),
  votes: many(votes),
  reports: many(reports),
  bans: one(bans),
  modaplications: one(modaplications),
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

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.id_user],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [comments.id_thread],
    references: [threads.id_thread],
  }),
  votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.id_user],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [votes.id_comment],
    references: [threads.id_thread],
  }),
  comments: one(comments, {
    fields: [votes.id_comment],
    references: [comments.id_comment],
  }),
}));
