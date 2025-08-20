import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Props = {
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  codeUrl?: string;
  reportUrl?: string;
};

export default function ProjectCard({
  title,
  blurb,
  image = "/og-placeholder.png",
  tags,
  codeUrl,
  reportUrl,
}: Props) {
  return (
    <Card className="flex h-full flex-col transition-colors hover:bg-muted/50 hover:shadow-md hover:scale-[1.01]">
      {" "}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{blurb}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </CardContent>
      {(codeUrl || reportUrl) && (
        <CardFooter className="mt-auto flex justify-end gap-2">
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ExternalLink className="h-4 w-4" />
              Code
            </a>
          )}
          {reportUrl && (
            <a
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ExternalLink className="h-4 w-4" />
              Report
            </a>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
