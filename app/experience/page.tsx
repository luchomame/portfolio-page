// app/experience/page.tsx
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const metadata = { title: "Experience — Luis Tupac" };

export default function ExperiencePage() {
  return (
    <section className="section space-y-6">
      <h1 className="h2">Experience</h1>

      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/gm-logo.png"
              alt="GM logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle>General Motors (GM) — Roswell, GA</CardTitle>
            <CardDescription>
              Software Engineer - Platform Engineering | Jan 2025 - Present
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5 space-y-2 text-sm text-foreground">
            <li>
              Led GM's first Internal Developer Platform; accelerated onboarding
              & time-to-prod by abstracting infra.
            </li>
            <li>
              Built cloud-agnostic FinOps platform for cost visibility &
              optimization.
            </li>
            <li>
              Streamlined Azure provisioning: multi-approval to single platform
              approval.
            </li>
            <li>
              Operations Owner/Tech Lead: infra ownership, Next.js monorepo
              strategy, language & framework guardrails.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/gm-logo.png"
              alt="GM logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle>General Motors (GM) — Roswell, GA</CardTitle>
            <CardDescription>
              Software Developer - Backend, Cloud Data Services | Jul 2022 - Dec
              2024
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5 space-y-2 text-sm text-foreground">
            <li>
              Maintained & scaled enterprise data lake; ingestion via
              GoldenGate, Fivetran, and custom services.
            </li>
            <li>
              Designed Databricks Loader (Java + Spring Boot) to migrate on-prem
              to cloud; automated workflows.
            </li>
            <li>
              Spark-native deterministic encryption: 90% latency reduction;
              saved $3M annually.
            </li>
            <li>
              PII detection & encryption pipelines using regex + ML; YARN →
              Kubernetes job migration.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/gm-logo.png"
              alt="GM logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle>General Motors (GM) — Roswell, GA</CardTitle>
            <CardDescription>
              Data Engineer | Mar 2021 - Jul 2022
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5 space-y-2 text-sm text-foreground">
            <li>
              Built SQL/PySpark pipelines on Azure Databricks across
              bronze/silver/gold layers.
            </li>
            <li>
              Consulted for business teams: 3rd-party APIs, Sterling mailboxes,
              lineage, Power BI reporting.
            </li>
            <li>
              Partnered cross-functionally to deliver insights for Customer
              Experience initiatives.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
