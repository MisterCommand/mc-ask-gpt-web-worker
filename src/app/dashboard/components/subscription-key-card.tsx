"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Key, RefreshCw, Eye, EyeOff } from "lucide-react";
import { refreshSubscriptionKey } from "@/lib/db/actions";
import { toast } from "sonner";

interface SubscriptionKeyCardProps {
  subscriptionKey?: string;
}

export function SubscriptionKeyCard({ subscriptionKey }: SubscriptionKeyCardProps) {
  const [showKey, setShowKey] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleRefreshKey = () => {
    startTransition(async () => {
      const result = await refreshSubscriptionKey();
      if (result.success) {
        toast.success("Key refreshed successfully!");
      } else {
        toast.error(result.error || "Failed to refresh key");
      }
    });
  };

  const displayKey = subscriptionKey || "No key available";
  const maskedKey = showKey ? displayKey : `${displayKey.slice(0, 8)}${"•".repeat(8)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscriptionKey ? (
          <>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your API Key</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                    {maskedKey}
                  </code>
                  <CopyButton text={displayKey} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm ">
                  <span>Usage Command</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm">
                    /ask connect {maskedKey}
                  </code>
                  <CopyButton text={`/ask connect ${displayKey}`} />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefreshKey}
                disabled={isPending}
                className="flex-1"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`}
                />
                {isPending ? "Refreshing..." : "Refresh Key"}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>• Keep your API key secure and don&apos;t share it publicly</p>
              <p>• Refreshing will invalidate the old key immediately</p>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Key className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No API key available</p>
            <Button onClick={handleRefreshKey} disabled={isPending}>
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`}
              />
              {isPending ? "Generating..." : "Generate Key"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 