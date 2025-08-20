// app/projects/page.tsx
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata = { title: "Projects — Luis Tupac" };

export default function ProjectsPage() {
  return (
    <section className="section">
      <h1 className="h2 mb-2">Projects</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        A selection of engineering and ML projects. Click into the code or
        report for details.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
