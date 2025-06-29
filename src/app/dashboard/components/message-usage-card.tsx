"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_QUOTA, PLUS_QUOTA } from "@/lib/constants";
import { useQuota } from "@/lib/hooks/useQuota";

type MessageUsageCardProps = {
  isPlus: boolean;
}

export function MessageUsageCard({ isPlus }: MessageUsageCardProps) {
  // Use the custom useQuota hook
  const { quota: remaining, isLoading, error } = useQuota();
  
  const total = isPlus ? PLUS_QUOTA : DEFAULT_QUOTA;
  const percentage = remaining > 0 ? (remaining / total) * 100 : 0;

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Message Usage</CardTitle>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Standard</span>
              <span>Loading...</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-muted h-2 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading quota...</p>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Message Usage</CardTitle>
          <p className="text-sm text-muted-foreground">Error loading quota</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-destructive">Failed to load quota information</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Message Usage</CardTitle>
        <p className="text-sm text-muted-foreground">Resets at the start of the next billing cycle</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Remaining quota</span>
            <span>{remaining}/{total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{remaining} messages remaining</p>
      </CardContent>
    </Card>
  );
} 