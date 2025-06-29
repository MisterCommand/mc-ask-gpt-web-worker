
import { auth } from "@clerk/nextjs/server";
import {
  DashboardHeader,
  MessageUsageCard,
  SubscriptionKeyCard,
  SubscriptionPlanCard,
} from "./components";
import { getSubscription, getUser } from "@/lib/db/queries";
import { getNextPaymentDate } from "@/lib/payments/stripe";
import { UpgradeToPlusSection } from "./components/upgrade-to-plus-section";
import { PLUS_PLAN_NAME } from "@/lib/constants";


export default async function DashboardPage() {

    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();
    
    const user = await getUser();
    if (!user) return redirectToSignIn();

    const subscription = await getSubscription(user);
    const isPlus =
      subscription?.planName == PLUS_PLAN_NAME &&
      subscription.subscriptionStatus == "active";

    // Get the first key if available
    const subscriptionKey = subscription?.keys?.[0]?.key;

    // Get the subscription expiry date from Stripe if the user has a subscription
    let nextPaymentDate: Date | null = null;
    if (subscription?.stripeCustomerId && isPlus) {
      nextPaymentDate = await getNextPaymentDate(subscription.stripeCustomerId);
    }

    return (
        <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto max-w-4xl px-6 py-8 flex flex-col gap-6">
            <SubscriptionPlanCard 
              planName={subscription?.planName || null}
              subscriptionStatus={subscription?.subscriptionStatus || null}
              stripeCustomerId={subscription?.stripeCustomerId || null}
              nextPaymentDate={nextPaymentDate}
            />
            
            <MessageUsageCard
              isPlus={isPlus}
            />
            
            <SubscriptionKeyCard 
              subscriptionKey={subscriptionKey}
            />
            
            {!isPlus && (
                <UpgradeToPlusSection price={5.99} currency="$" period="month" />
            )}
        </div>
        </div>
    );
} 