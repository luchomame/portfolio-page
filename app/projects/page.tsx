import ProjectsTabs from "./ProjectsTabs";
import { projects } from "@/lib/projects";

export const metadata = { title: "Projects — Luis Tupac" };

export default function ProjectsPage() {
  const grad = projects.filter((p) => p.level === "grad");
  const undergrad = projects.filter((p) => p.level === "undergrad");

  return (
    <section className="section">
      <h1 className="h2 mb-2">Projects</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        A selection of engineering and ML work. Click into code or reports for
        details.
      </p>

      <ProjectsTabs grad={grad} undergrad={undergrad} />
    </section>
  );
}
