import { eq } from 'drizzle-orm';
import { createDB } from './drizzle';
import { keys, subscriptions, userSubscriptions } from './schema';
import { currentUser } from "@clerk/nextjs/server";
import { User as ClerkUser } from '@clerk/nextjs/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { setPlanDefaultQuota, setPlanName, updateKVKeySubscription } from '../kv';

export async function getUser() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return user;
}

export async function getSubscription(user: ClerkUser) {
  const db = createDB(getCloudflareContext().env.DB);

  const subscriptionOfUser = await db.query.userSubscriptions.findFirst({
    with: {
      subscription: {
        with: {
          keys: true,
        },
      },
    },
    where: eq(userSubscriptions.userId, user.id),
  });

  if (!subscriptionOfUser) {
    // Create a new subscription + key
    const newSubscription = await createSubscription({
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: null,
    });

    // Link subscription to user
    await db.insert(userSubscriptions).values({
      id: crypto.randomUUID(),
      userId: user.id,
      subscriptionId: newSubscription[0].id,
    });

    // Create a new key
    const key = generateKey();
    const newKey = await db
      .insert(keys)
      .values({
        id: crypto.randomUUID(),
        key: key,
        subscriptionId: newSubscription[0].id,
      })
      .returning();

    const subscriptionWithKey = {
      ...newSubscription[0],
      keys: newKey,
    };

    // Insert key to KV
    await updateKVKeySubscription(key, newSubscription[0].id);

    // Set the plan name
    await setPlanName(newSubscription[0].id, newSubscription[0].planName || "Free");

    // Set the default quota
    await setPlanDefaultQuota(newSubscription[0].id, newSubscription[0].planName || "Free");

    return subscriptionWithKey;
  }

  if (subscriptionOfUser.subscription.keys.length === 0) {
    // Create a new key for the subscription
    const key = generateKey();
    await db.insert(keys).values({
      id: crypto.randomUUID(),
      key: key,
      subscriptionId: subscriptionOfUser.subscription.id,
    });
    // Insert key to KV
    await updateKVKeySubscription(key, subscriptionOfUser.subscription.id);
  }

  return {
    ...subscriptionOfUser.subscription,
    keys: subscriptionOfUser.subscription.keys,
  };
}

export async function setSubscription(user: ClerkUser, subscriptionId: string) {
  const db = createDB(getCloudflareContext().env.DB);
  await db.update(userSubscriptions).set({
    subscriptionId: subscriptionId,
    updatedAt: new Date().toISOString(),
  }).where(eq(userSubscriptions.userId, user.id));
}

export async function getStripeCustomerId(user: ClerkUser) {
  const subscription = await getSubscription(user);
  if (!subscription) {
    return null;
  }

  return subscription.stripeCustomerId;
}

export async function getSubscriptionByStripeCustomerId(customerId: string) {
  const db = createDB(getCloudflareContext().env.DB);
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createSubscription(
  subscriptionData: {
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string | null;
  }
) {
  const db = createDB(getCloudflareContext().env.DB);
  const id = crypto.randomUUID(); // New UUID
  return await db.insert(subscriptions).values({
    id,
    ...subscriptionData
  }).returning();
}

export async function updateSubscription(
  subscriptionId: string,
  subscriptionData: {
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  const db = createDB(getCloudflareContext().env.DB);
  await db
    .update(subscriptions)
    .set({
      ...subscriptionData,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(subscriptions.id, subscriptionId));
}

// Helper function to generate 16 character string with capital letters and numbers
function generateKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
