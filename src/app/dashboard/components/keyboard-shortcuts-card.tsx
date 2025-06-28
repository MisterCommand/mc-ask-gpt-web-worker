import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyboardShortcut {
  label: string;
  keys: string[];
}

const shortcuts: KeyboardShortcut[] = [
  { label: "Search", keys: ["Ctrl", "K"] },
  { label: "New Chat", keys: ["Ctrl", "Shift", "O"] },
  { label: "Toggle Sidebar", keys: ["Ctrl", "B"] },
];

export function KeyboardShortcutsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.label} className="flex justify-between items-center">
            <span className="text-sm">{shortcut.label}</span>
            <div className="flex space-x-1">
              {shortcut.keys.map((key) => (
                <kbd key={key} className="px-2 py-1 text-xs bg-muted rounded">
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 