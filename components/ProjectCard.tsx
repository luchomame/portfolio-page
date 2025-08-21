import Image from "next/image";
import Link from "next/link";
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
  imageFit?: "cover" | "contain"; // default: "cover"
  imageAspect?: "video" | "square" | "golden"; // default: "video"
};

export default function ProjectCard({
  title,
  blurb,
  image = "/og-placeholder.png",
  tags,
  codeUrl,
  reportUrl,
  imageFit = "contain",
  imageAspect = "square",
}: Props) {
  const href = reportUrl || codeUrl;
  const clickable = Boolean(href);

  const aspectClass =
    imageAspect === "square"
      ? "aspect-square"
      : imageAspect === "golden"
      ? "aspect-[1.618/1]"
      : "aspect-video"; // default

  const imgClass =
    imageFit === "contain"
      ? "object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
      : "object-cover transition-transform duration-300 group-hover:scale-[1.03]";

  return (
    <Card className="group relative flex h-full flex-col transition-transform hover:shadow-md hover:scale-[1.01]">
      {/* IMAGE */}
      <div
        className={`relative w-full overflow-hidden rounded-t-xl bg-muted ${aspectClass}`}
      >
        {clickable && (
          <Link
            href={href!}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${title}`}
            className="absolute inset-0 z-10"
          />
        )}

        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={`${imgClass} ${clickable ? "cursor-pointer" : ""}`}
        />

        {/* Only add the top gradient when using cover (helps text contrast on photos) */}
        {imageFit === "cover" && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-foreground">{blurb}</p>
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
