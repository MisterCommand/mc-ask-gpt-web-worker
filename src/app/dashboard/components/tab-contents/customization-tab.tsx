import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Type, Layout } from "lucide-react";

export function CustomizationTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Customization</h1>
        <p className="text-muted-foreground mb-8">
          Personalize your experience with custom themes, layouts, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred color scheme and appearance options.
            </p>
            <Button variant="outline" className="w-full">
              Configure Theme
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Adjust font sizes, styles, and reading preferences.
            </p>
            <Button variant="outline" className="w-full">
              Font Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Layout Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Customize the layout and organization of your workspace.
            </p>
            <Button variant="outline" className="w-full">
              Layout Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 