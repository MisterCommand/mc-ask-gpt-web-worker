"use client"

import { Button } from "@/components/ui/button";
import { Zap, Box, MessagesSquare } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { checkoutPlusAction } from "@/lib/payments/actions";

interface UpgradeToPlusSectionProps {
  price: number;
  currency: string;
  period: string;
}

export function UpgradeToPlusSection({ price, currency = "$", period = "month" }: UpgradeToPlusSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Upgrade to Plus</h1>
        <div className="text-right">
          <span className="text-3xl font-bold">
            {currency}
            {price}
          </span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FeatureCard
          icon={Zap}
          iconColor="text-pink-600"
          iconBgColor="bg-pink-100 dark:bg-pink-900/20"
          title="Premium Models"
          description="Get access to smarter models and faster responses."
        />

        <FeatureCard
          icon={Box}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100 dark:bg-purple-900/20"
          title="Minecraft Knowledge"
          description="Power chat with Minecraft domain knowledge."
        />

        <FeatureCard
          icon={MessagesSquare}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100 dark:bg-orange-900/20"
          title="Generous Limits"
          description="500 messages per month included in the plan."
        />
      </div>

      <Button
        className="w-full mb-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
        onClick={() => checkoutPlusAction()}
      >
        Upgrade Now
      </Button>
    </div>
  );
} 