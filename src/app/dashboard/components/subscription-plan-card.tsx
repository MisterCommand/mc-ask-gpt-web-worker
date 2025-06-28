import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, ExternalLink, X, Check } from "lucide-react";
import Link from "next/link";
import { getManageSubscriptionUrlAction } from "@/lib/payments/actions";

interface SubscriptionPlanCardProps {
  planName: string | null;
  subscriptionStatus: string | null;
  stripeCustomerId: string | null;
  nextPaymentDate?: Date | null;
}

export async function SubscriptionPlanCard({ 
  planName, 
  subscriptionStatus, 
  stripeCustomerId,
  nextPaymentDate
}: SubscriptionPlanCardProps) {
  const isActive = subscriptionStatus === "active";
  const isPlus = planName === "Plus" && isActive;
  const isFree = !planName || !isActive;

  const formattedExpiry = nextPaymentDate?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || 'No renewal date';

  const manageSubscriptionUrl = stripeCustomerId ? await getManageSubscriptionUrlAction() : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Current Plan
          {isPlus && (
            <Badge
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              <Crown className="h-3 w-3 mr-1" />
              Plus
            </Badge>
          )}
          {isFree && <Badge variant="secondary">Free</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {isFree ? "Free Plan" : planName + " Plan"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isFree
                ? "Basic hosted chat API"
                : "Hosted chat API with Minecraft knowledge"}
            </p>
          </div>
        </div>

        {isPlus && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Renews on:</span>
            <span className="font-medium">{formattedExpiry}</span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p>Features</p>
          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm">Basic models</p>
            {isFree ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Check className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm">Premium models</p>
            {isFree ? (
              <X className="h-4 w-4 text-red-500" />
            ) : (
              <Check className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm">Minecraft knowledge</p>
            {isFree ? (
              <X className="h-4 w-4 text-red-500" />
            ) : (
              <Check className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          {!isFree && (
            <div className="space-y-2">
              {manageSubscriptionUrl && (
                <Link href={manageSubscriptionUrl}>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 