'use server';

import { createCheckoutSession, getManageSubscriptionUrl } from './stripe';

export const checkoutAction = async (formData: FormData) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ priceId });
};

export const checkoutPlusAction = async () => {
  await createCheckoutSession({
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1RextvK1bzGUzLCRcRFA4iKr" // Test mode
        : "price_1Rjg9XK1bzGUzLCRJC7RvtQQ", // Production mode
  }); // Plus price id
};

export async function getManageSubscriptionUrlAction() {
  const manageUrl = await getManageSubscriptionUrl();
  return manageUrl;
} 