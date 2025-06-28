import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface UserProfileCardProps {
  name: string;
  email: string;
  plan: string;
  avatarFallback: string;
}

export function UserProfileCard({ name, email, plan, avatarFallback }: UserProfileCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 bg-green-600">
            <AvatarFallback className="text-white text-2xl font-semibold bg-green-600">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
            <Badge variant="secondary" className="mt-2">{plan}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 