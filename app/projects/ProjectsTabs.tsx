"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

type Props = {
  grad: Project[];
  undergrad: Project[];
};

const TAB_KEYS = ["all", "grad", "undergrad"] as const;
type TabKey = (typeof TAB_KEYS)[number];

export default function ProjectsTabs({ grad, undergrad }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = (searchParams.get("tab") as TabKey) || "all";
  const [tab, setTab] = React.useState<TabKey>(
    TAB_KEYS.includes(initial) ? initial : "all"
  );

  // keep URL in sync (shareable links)
  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set("tab", tab);
    router.replace(`/projects?${sp.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const all = React.useMemo(() => [...grad, ...undergrad], [grad, undergrad]);

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as TabKey)}
      className="mt-6"
    >
      <TabsList className="grid w-full grid-cols-3 sm:w-auto">
        <TabsTrigger value="all" className="gap-2">
          All <Badge variant="secondary">{all.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="grad" className="gap-2">
          Grad <Badge variant="secondary">{grad.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="undergrad" className="gap-2">
          Undergrad <Badge variant="secondary">{undergrad.length}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <Section
          heading="All Projects"
          sub="A selection of engineering and ML work across graduate and undergraduate projects."
        />
        <Grid projects={all} />
      </TabsContent>

      <TabsContent value="grad" className="mt-6">
        <Section
          heading="Graduate Projects"
          sub="Selected coursework and applied research from my M.S. in Analytics."
        />
        <Grid projects={grad} />
      </TabsContent>

      <TabsContent value="undergrad" className="mt-6">
        <Section
          heading="Undergraduate Projects"
          sub="Coursework, independent projects, and hackathons from my B.S. in CS."
        />
        <Grid projects={undergrad} />
      </TabsContent>
    </Tabs>
  );
}

function Section({ heading, sub }: { heading: string; sub: string }) {
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold">{heading}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{sub}</p>
    </>
  );
}

function Grid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing here yet — check back soon.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={`${p.level}-${p.title}`} {...p} />
      ))}
    </div>
  );
}
