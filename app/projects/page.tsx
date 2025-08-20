import ProjectsTabs from "./ProjectsTabs";
import { projects } from "@/lib/projects";
import { Suspense } from "react";

export const metadata = { title: "Projects — Luis Tupac" };

export default function ProjectsPage() {
  const grad = projects.filter((p) => p.level === "grad");
  const undergrad = projects.filter((p) => p.level === "undergrad");

  return (
    <section className="section">
      <h1 className="h2 mb-2">Projects</h1>
      <p className="mb-8 text-sm text-foreground">
        A selection of engineering and ML work. Click into code or reports for
        details.
      </p>
      <Suspense
        fallback={<p className="text-sm text-foreground">Loading projects…</p>}
      >
        <ProjectsTabs grad={grad} undergrad={undergrad} />
      </Suspense>{" "}
    </section>
  );
}
