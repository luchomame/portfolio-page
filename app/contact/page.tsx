// app/contact/page.tsx
import { Mail, Github, Linkedin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Contact — Luis Tupac" };

export default function ContactPage() {
  return (
    <section className="section">
      <h1 className="h2 mb-6">Contact</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: direct links */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Connect</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {/* Email */}
            <a
              href="mailto:luis@example.com"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 hover:shadow-sm"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  luis@example.com
                </p>
              </div>
              <Button size="sm" variant="default" type="button">
                <Mail className="h-4 w-4" />
                <span className="ml-2">Send</span>
              </Button>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/luis-tupac1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 hover:shadow-sm"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">LinkedIn</p>
                <p className="text-sm text-muted-foreground">
                  linkedin.com/in/luis-tupac1
                </p>
              </div>
              <Button size="sm" variant="outline" type="button">
                <Linkedin className="h-4 w-4" />
                <span className="ml-2">Open</span>
              </Button>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/luchomame"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 hover:shadow-sm"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">GitHub</p>
                <p className="text-sm text-muted-foreground">
                  github.com/luchomame
                </p>
              </div>
              <Button size="sm" variant="outline" type="button">
                <Github className="h-4 w-4" />
                <span className="ml-2">Open</span>
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Right: quick message form */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick message</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace the action URL with your own Formspree endpoint or handler */}
            <form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="space-y-4"
            >
              {/* Optional subject to help you filter */}
              <input type="hidden" name="_subject" value="Portfolio contact" />

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hi Luis — loved your IDP/FinOps work. Let's chat about…"
                  required
                  rows={5}
                />
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
