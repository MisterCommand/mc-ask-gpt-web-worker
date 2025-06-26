import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const userSubscriptions = sqliteTable("user_subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(), // From Clerk
  subscriptionId: text("subscription_id").notNull().references(() => subscriptions.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userSubscriptionsRelations = relations(userSubscriptions, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [userSubscriptions.subscriptionId],
    references: [subscriptions.id],
  }),
}));

export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeProductId: text("stripe_product_id"),
  planName: text("plan_name", { length: 50 }),
  subscriptionStatus: text("subscription_status", { length: 20 }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const subscriptionsRelations = relations(subscriptions, ({ many }) => ({
  keys: many(keys),
}));

export const keys = sqliteTable("keys", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  subscriptionId: text("subscription_id").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const keysRelations = relations(keys, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [keys.subscriptionId],
    references: [subscriptions.id],
  }),
}));
