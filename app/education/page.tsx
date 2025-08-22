// app/education/page.tsx
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const metadata = { title: "Education — Luis Tupac" };

export default function EducationPage() {
  return (
    <section className="section space-y-8">
      <h1 className="h2">Education</h1>

      {/* Georgia Tech */}
      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
        <div className="flex items-start gap-4 p-4">
          <Image
            src="/gt.png"
            alt="Georgia Tech Logo"
            width={48}
            height={48}
            className="rounded-md object-contain"
          />
          <div className="flex-1">
            <CardHeader className="p-0">
              <CardTitle>
                Georgia Institute of Technology — Atlanta, GA
              </CardTitle>
              <CardDescription>
                Master of Science in Analytics | 2023 - 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-3">
              <ul className="ml-5 list-disc space-y-2 text-sm text-foreground">
                <li>
                  Specialized in Deep Learning &amp; Time Series Analysis.
                </li>
                <li>
                  Projects: fastMRI (ROI-weighted U-Nets), Behavioral Finance
                  (NDR Risk Score), Enron Fraud Detection, Applied NLP.
                </li>
              </ul>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Georgia Southern */}
      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
        <div className="flex items-start gap-4 p-4">
          <Image
            src="/gsu.png"
            alt="Georgia Southern University Logo"
            width={48}
            height={48}
            className="rounded-md object-contain"
          />
          <div className="flex-1">
            <CardHeader className="p-0">
              <CardTitle>
                Georgia Southern University — Statesboro, GA
              </CardTitle>
              <CardDescription>
                Bachelor of Science in Computer Science | 2016 - 2020
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-3">
              <ul className="ml-5 list-disc space-y-2 text-sm text-foreground">
                <li>Minor in Mathematical Sciences.</li>
                <li>Hackathon Winner.</li>
                <li>Upper-level Math Tutor for 2 years.</li>
              </ul>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}
