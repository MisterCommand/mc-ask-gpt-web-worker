import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DEFAULT_QUOTA, PLUS_PLAN_NAME, PLUS_QUOTA } from "../constants";

/**
 * Create a new key - subscription pair, optionally delete the old key - subscription pair
 * @param oldKey - The old key
 * @param newKey - The new key
 */
export const updateKVKeySubscription = async (
  newKey: string,
  subscription: string,
  oldKey?: string | null
) => {
    try {
        if (oldKey) {
            await getCloudflareContext().env.MC_ASK_GPT_KEY_SUBSCRIPTION.delete(oldKey);
        }
        await getCloudflareContext().env.MC_ASK_GPT_KEY_SUBSCRIPTION.put(
            newKey,
            subscription
        );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update KV key subscription");
  }
};

/**
 * Get the quota of a subscription
 * @param subscription - The subscription
 * @returns The quota
 */
export const getQuota = async (subscription: string) => {
    try {
        const quota = await getCloudflareContext().env.MC_ASK_GPT_SUBSCRIPTION_QUOTA.get(subscription);
        if (!quota) {
            throw new Error("Quota not found");
        }
        return quota;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get quota");
    }
};

/**
 * Update the quota of a subscription
 * @param subscription - The subscription
 * @param quota - The quota
 */
export const updateQuota = async (subscription: string, quota: number) => {
    try {
        await getCloudflareContext().env.MC_ASK_GPT_SUBSCRIPTION_QUOTA.put(subscription, quota.toString());
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update quota");
    }
};

/**
 * Set the default quota of a subscription based on the plan name
 * @param subscription - The subscription
 * @param planName - The plan name
 */
export const setPlanDefaultQuota = async (subscription: string, planName: string) => {
    try {
        await getCloudflareContext().env.MC_ASK_GPT_SUBSCRIPTION_QUOTA.put(
          subscription,
          planName === PLUS_PLAN_NAME
            ? PLUS_QUOTA.toString()
            : DEFAULT_QUOTA.toString()
        );
    } catch (error) {
        console.error(error);
        throw new Error("Failed to set default quota");
    }
};

/**
 * Set the plan name of a subscription
 * @param subscription - The subscription
 * @param planName - The plan name
 */
export const setPlanName = async (subscription: string, planName: string) => {
    try {
        await getCloudflareContext().env.MC_ASK_GPT_SUBSCRIPTION_PLAN.put(subscription, planName);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to set plan name");
    }
};