import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import {
  getUser,
  getSubscriptionByStripeCustomerId,
  updateSubscription,
  getSubscription,
} from '@/lib/db/queries';
import { DEFAULT_QUOTA, PLUS_QUOTA } from '../constants';
import { setPlanDefaultQuota, setPlanName, updateQuota } from '../kv';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
  httpClient: Stripe.createFetchHttpClient(), // Cloudflare Workers use the Fetch API for their API requests.
});

export async function createCheckoutSession({
  priceId
}: {
  priceId: string;
}) {
  const user = await getUser();
  if (!user) {
    redirect('/pricing');
  }

  const subscription = await getSubscription(user);
    
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    customer: subscription?.stripeCustomerId || undefined,
    client_reference_id: user.id.toString(),
    allow_promotion_codes: true,
    payment_method_collection: "if_required",
  });

  redirect(session.url!);
  
}

export async function createCustomerPortalSession() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const subscription = await getSubscription(user);

  if (
    !subscription?.stripeCustomerId || !subscription?.stripeProductId
  ) {
    return null;
  }

  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(subscription.stripeProductId);
    if (!product.active) {
      throw new Error("Product is not active in Stripe");
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true
    });
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the product");
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Manage your subscription'
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'quantity', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: [
            {
              product: product.id,
              prices: prices.data.map((price) => price.id)
            }
          ]
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other'
            ]
          }
        },
        payment_method_update: {
          enabled: true
        }
      }
    });
  }

  return stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${process.env.BASE_URL}/dashboard`,
    configuration: configuration.id
  });
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const subscriptionInDatabase = await getSubscriptionByStripeCustomerId(customerId);

  if (!subscriptionInDatabase) {
    console.error("Subscription not found for Stripe customer:", customerId);
    return;
  }

  // Check plan change
  const originalPlan = subscriptionInDatabase.planName;
  const newPlan = (subscription.items.data[0]?.plan?.product as Stripe.Product).name;

  if (originalPlan !== newPlan) {
    // Update the quota
    await setPlanDefaultQuota(subscriptionInDatabase.id, newPlan);
  }

  if (status === 'active' || status === 'trialing') {
    const plan = subscription.items.data[0]?.plan;
    await updateSubscription(subscriptionInDatabase.id, {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status
    });

    // Handle quota and plan update
    await updateQuota(subscriptionInDatabase.id, PLUS_QUOTA);
    await setPlanName(subscriptionInDatabase.id, (plan?.product as Stripe.Product).name);
  } else if (status === 'canceled' || status === 'unpaid') {
    await updateSubscription(subscriptionInDatabase.id, {
      stripeCustomerId: customerId,
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status
    });

    // Handle quota and plan update
    await updateQuota(subscriptionInDatabase.id, DEFAULT_QUOTA);
    await setPlanName(
      subscriptionInDatabase.id,
      "Free"
    );
  }
}

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring'
  });

  return prices.data.map((price) => ({
    id: price.id,
    productId:
      typeof price.product === 'string' ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days
  }));
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id
  }));
}

export async function getNextPaymentDate(
  customerId: string
): Promise<Date | null> {
  try {
    // Get all subscriptions for the customer from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return null;
    }

    const subscription = subscriptions.data[0];

    // If subscription is set to cancel at period end, there's no next payment
    if (subscription.cancel_at_period_end) {
      return null;
    }

    // Return the current period end as the next payment date
    const currentPeriodEnd = (
      subscription as unknown as { items: { data: { current_period_end: number }[] } }
    ).items.data[0].current_period_end;
    return new Date(currentPeriodEnd * 1000);
  } catch (error) {
    console.error("Error fetching next payment date:", error);
    return null;
  }
}

export async function getManageSubscriptionUrl(): Promise<string | null> {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }

    const subscription = await getSubscription(user);
    if (!subscription?.stripeCustomerId) {
      return null;
    }

    const session = await createCustomerPortalSession();
    return session?.url || null;
  } catch (error) {
    console.error('Error creating manage subscription URL:', error);
    return null;
  }
}

export async function getSubscriptionDetails(customerId: string) {
  try {
    // Get the subscription from our database first
    const dbSubscription = await getSubscriptionByStripeCustomerId(customerId);
    if (!dbSubscription?.stripeSubscriptionId) {
      return null;
    }

    // Get the detailed subscription info from Stripe
    const response = await stripe.subscriptions.retrieve(
      dbSubscription.stripeSubscriptionId,
      {
        expand: ['items.data.price.product']
      }
    );

    // Type assertion to access the properties
    const stripeSubscription = response as unknown as {
      id: string;
      status: string;
      current_period_start: number;
      current_period_end: number;
      cancel_at_period_end: boolean;
      canceled_at: number | null;
      trial_end: number | null;
      items: {
        data: Array<{
          price: {
            unit_amount: number | null;
            currency: string;
            recurring: {
              interval: string;
            } | null;
          };
        }>;
      };
    };

    return {
      id: stripeSubscription.id,
      status: stripeSubscription.status,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      canceledAt: stripeSubscription.canceled_at ? new Date(stripeSubscription.canceled_at * 1000) : null,
      trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end * 1000) : null,
      planName: dbSubscription.planName,
      // Get the price amount and currency from the subscription item
      amount: stripeSubscription.items.data[0]?.price.unit_amount || 0,
      currency: stripeSubscription.items.data[0]?.price.currency || 'usd',
      interval: stripeSubscription.items.data[0]?.price.recurring?.interval || 'month'
    };
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    return null;
  }
}