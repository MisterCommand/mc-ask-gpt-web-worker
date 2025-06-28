"use server";

import { auth } from "@clerk/nextjs/server";
import { createDB } from "@/lib/db/drizzle";
import { keys } from "@/lib/db/schema";
import { getSubscription, getUser } from "@/lib/db/queries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Helper function to generate key (similar to queries.ts)
function generateKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function refreshSubscriptionKey() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const subscription = await getSubscription(user);
    if (!subscription) {
      throw new Error("No subscription found");
    }

    const db = createDB(getCloudflareContext().env.DB);

    // Generate a new key
    const newKey = generateKey();

    // If there's an existing key, update it. Otherwise, create a new one.
    if (subscription.keys.length > 0) {
      const existingKeyId = subscription.keys[0].id;
      
      await db
        .update(keys)
        .set({
          key: newKey,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(keys.id, existingKeyId));
    } else {
      // Create new key
      await db.insert(keys).values({
        id: crypto.randomUUID(),
        key: newKey,
        subscriptionId: subscription.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Revalidate the dashboard page to show the new key
    revalidatePath("/dashboard");
    
    return { success: true, key: newKey };
  } catch (error) {
    console.error("Error refreshing key:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to refresh key" 
    };
  }
} 