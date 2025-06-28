import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, File, Image, FileText, Trash2 } from "lucide-react";

export function AttachmentsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Attachments</h1>
        <p className="text-muted-foreground mb-8">
          Manage your uploaded files, images, and documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: Images, PDFs, Documents (Max 10MB)
              </p>
            </div>
            <Button className="w-full">Choose Files</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span>124 MB / 1 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "12.4%" }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <File className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                <div className="text-sm font-medium">23</div>
                <div className="text-xs text-muted-foreground">Documents</div>
              </div>
              <div>
                <Image className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                <div className="text-sm font-medium">47</div>
                <div className="text-xs text-muted-foreground">Images</div>
              </div>
              <div>
                <FileText className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                <div className="text-sm font-medium">12</div>
                <div className="text-xs text-muted-foreground">Other</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "project-proposal.pdf", size: "2.4 MB", type: "PDF", date: "2 hours ago" },
                { name: "screenshot.png", size: "856 KB", type: "Image", date: "1 day ago" },
                { name: "data-analysis.xlsx", size: "1.2 MB", type: "Spreadsheet", date: "3 days ago" },
              ].map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{file.size} • {file.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{file.type}</Badge>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 