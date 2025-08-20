// app/contact/page.tsx
import { Mail, Github, Linkedin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuickMessageForm from "@/app/contact/QuickMessageForm";

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
            <QuickMessageForm /> {/* swaps just this square */}
          </CardContent>
        </Card>{" "}
      </div>
    </section>
  );
}
