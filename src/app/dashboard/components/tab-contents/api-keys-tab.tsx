import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Eye, EyeOff } from "lucide-react";

export function ApiKeysTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">API Keys</h1>
        <p className="text-muted-foreground mb-8">
          Manage your API keys and external integrations securely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New API Key
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-name">API Key Name</Label>
              <Input id="api-name" placeholder="Enter a descriptive name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-permissions">Permissions</Label>
              <div className="flex gap-2">
                <Badge variant="outline">Read</Badge>
                <Badge variant="outline">Write</Badge>
              </div>
            </div>
            <Button className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Production Key</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">sk-...****</code>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Created: Dec 15, 2023 • Last used: 2 hours ago
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Development Key</span>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">sk-...****</code>
                <Button variant="ghost" size="icon">
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Created: Nov 28, 2023 • Last used: Never
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 