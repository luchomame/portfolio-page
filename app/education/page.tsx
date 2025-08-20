// app/education/page.tsx
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

      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md">
        <CardHeader>
          <CardTitle>Georgia Institute of Technology — Atlanta, GA</CardTitle>
          <CardDescription>
            Master of Science in Analytics | 2023 – 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="ml-5 list-disc space-y-2 text-sm text-muted-foreground">
            <li>Specialized in Deep Learning &amp; Time Series Analysis.</li>
            <li>
              Projects: fastMRI (ROI-weighted U-Nets), Behavioral Finance (NDR
              Risk Score), Enron Fraud Detection, Applied NLP.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md">
        <CardHeader>
          <CardTitle>Georgia Southern University — Statesboro, GA</CardTitle>
          <CardDescription>
            Bachelor of Science in Computer Science | 2016 – 2020
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="ml-5 list-disc space-y-2 text-sm text-muted-foreground">
            <li>Minor in Mathematical Sciences.</li>
            <li>Hackathon Winner.</li>
            <li>Upper-level Math Tutor for 2 years.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
