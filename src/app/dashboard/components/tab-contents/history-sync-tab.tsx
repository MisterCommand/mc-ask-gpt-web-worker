import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Cloud, Download, Trash2 } from "lucide-react";

export function HistorySyncTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">History & Sync</h1>
        <p className="text-muted-foreground mb-8">
          Manage your chat history, sync settings, and data preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Chat History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total conversations</span>
              <Badge variant="secondary">47</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage used</span>
              <span className="text-sm text-muted-foreground">2.4 MB</span>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Sync Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-sync</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last sync</span>
              <span className="text-sm text-muted-foreground">2 mins ago</span>
            </div>
            <Button variant="outline" className="w-full">
              Sync Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Clear chat history and manage your data retention preferences.
            </p>
            <Button variant="outline" className="w-full">
              Clear History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 