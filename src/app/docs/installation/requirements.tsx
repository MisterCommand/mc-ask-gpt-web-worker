import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Server, Terminal } from "lucide-react";

export default function Requirements() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Server className="text-primary size-6" />
          <CardTitle>Spigot or Paper Server</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Version <span className="font-semibold">1.20</span> or newer
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Terminal className="text-primary size-6" />
          <CardTitle>Java</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Java 17</span> or newer
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
