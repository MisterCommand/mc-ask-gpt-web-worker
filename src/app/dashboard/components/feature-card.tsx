import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: ReactNode;
}

export function FeatureCard({ icon: Icon, iconColor, iconBgColor, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="text-sm text-muted-foreground">
              {description}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 