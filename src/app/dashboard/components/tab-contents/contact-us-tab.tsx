import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Phone, Clock, Send } from "lucide-react";

export function ContactUsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Get in touch with our support team for help, feedback, or questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <div className="font-medium">Live Chat</div>
                  <div className="text-sm text-muted-foreground">Available 24/7</div>
                </div>
                <Badge variant="default">Online</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-muted-foreground">support@example.com</div>
                </div>
                <Badge variant="secondary">24-48h</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-orange-500" />
                <div className="flex-1">
                  <div className="font-medium">Phone Support</div>
                  <div className="text-sm text-muted-foreground">Pro users only</div>
                </div>
                <Badge variant="outline">Pro</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Monday - Friday</span>
                <span className="text-sm font-medium">9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Saturday</span>
                <span className="text-sm font-medium">10:00 AM - 4:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sunday</span>
                <span className="text-sm text-muted-foreground">Closed</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Emergency support available 24/7 for Pro users
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 