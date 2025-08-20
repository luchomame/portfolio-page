import { ArrowRight, FileDown, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="section">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          {/* use token-based color */}
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Hello, I'm
          </p>

          {/* keep your display style but rely on global tokens for color */}
          <h1 className="h1">Luis Tupac</h1>

          {/* token for body text */}
          <p className="mt-4 text-lg text-muted-foreground">
            Software & Data Engineer — Platform Engineering, FinOps, and ML/NLP.
            I build internal developer platforms, optimize cloud cost, and turn
            data into products.
          </p>

          {/* shadcn Buttons (asChild to render <a> / <Link>) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <a href="/Luis_Tupac_Resume.pdf" target="_blank" rel="noreferrer">
                <FileDown className="h-4 w-4" /> Download Resume
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://github.com/luchomame"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/luis-tupac1"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>

            <Button asChild>
              <Link href="/projects">
                <ArrowRight className="h-4 w-4" /> See Projects
              </Link>
            </Button>
          </div>
        </div>

        {/* shadcn Card uses tokens for bg/border/fg automatically */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Current:</span>{" "}
                Software Engineer, Platform Engineering @ GM
              </li>
              <li>
                <span className="font-medium text-foreground">Highlights:</span>{" "}
                Built GM’s first IDP; cloud-agnostic FinOps platform; saved
                $3M/yr via Spark-native encryption; 90%+ latency reduction
              </li>
              <li>
                <span className="font-medium text-foreground">Stack:</span>{" "}
                Azure • Databricks • Spark • Kubernetes • Next.js • Golang •
                Python
              </li>
              <li>
                <span className="font-medium text-foreground">
                  MS Analytics, Georgia Tech:
                </span>{" "}
                fastMRI ROI U-Net • NDR Risk Scoring • SEIR Modeling
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
