import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Crown } from "lucide-react";

export function ModelsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Models</h1>
        <p className="text-muted-foreground mb-8">
          Manage and configure the AI models available to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Claude Sonnet
              <Badge variant="secondary">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced reasoning and analysis capabilities for complex tasks.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Status</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <Button variant="outline" className="w-full" disabled>
              <Crown className="h-4 w-4 mr-2" />
              Requires Pro
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              GPT-4
              <Badge variant="secondary">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Powerful language model for creative and analytical tasks.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Status</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <Button variant="outline" className="w-full" disabled>
              <Crown className="h-4 w-4 mr-2" />
              Requires Pro
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Standard Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Reliable model for everyday conversations and basic tasks.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Status</span>
              <Badge variant="default">Active</Badge>
            </div>
            <Button className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Currently Using
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 