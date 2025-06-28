import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MessageUsageCardProps {
  used: number;
  total: number;
  remaining: number;
  resetTime: string;
}

export function MessageUsageCard({ used, total, remaining, resetTime }: MessageUsageCardProps) {
  const percentage = (used / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Message Usage</CardTitle>
        <p className="text-sm text-muted-foreground">Resets {resetTime}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Standard</span>
            <span>{used}/{total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{remaining} messages remaining</p>
        <p className="text-xs text-muted-foreground">
          Messages which invoke tools (e.g. search grounding) may consume additional message credits.
        </p>
      </CardContent>
    </Card>
  );
} 