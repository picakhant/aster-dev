import Link from "next/link";
import { BookOpen, ExternalLink, GitFork, Star } from "lucide-react";
import type { Project } from "@/lib/github";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };
const btnClass =
  "btn btn-xs rounded-lg flex-1 font-mono";

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ProjectCard({ project }: { project: Project }) {
  const tags = project.topics.filter((topic) => topic !== "featured").slice(0, 4);
  const primaryAction = project.hasReadme
    ? "overview"
    : project.homepage
      ? "demo"
      : "source";
  const variant = (action: "overview" | "demo" | "source") =>
    `${btnClass} ${primaryAction === action ? "btn-primary" : "btn-outline"}`;

  return (
    <div className="card bg-base-200/80 border border-base-content/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono font-bold text-lg text-primary break-all">
            {project.name}
          </h3>
          {project.featured && (
            <span className="badge badge-primary badge-sm font-mono shrink-0">
              ★ Featured
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-base-content/60 font-mono">
          {project.language ?? "Web"}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-base-content/80 line-clamp-2">
          {project.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-outline badge-sm gap-1 opacity-80 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-base-content/10 flex items-center justify-between gap-2">
        <span className="text-xs text-base-content/50 font-mono">
          {formatDate(project.updatedAt)}
        </span>
        <div className="flex items-center gap-2">
          <span className="badge badge-ghost badge-sm font-mono gap-1" title="Stars">
            <Star className="h-3 w-3" />
            {project.stars}
          </span>
          <span className="badge badge-ghost badge-sm font-mono gap-1" title="Forks">
            <GitFork className="h-3 w-3" />
            {project.forks}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {project.hasReadme && (
          <Link
            href={`/projects/${project.name}`}
            className={variant("overview")}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Overview
          </Link>
        )}
        {project.homepage && (
          <a
            href={project.homepage}
            {...externalProps}
            className={variant("demo")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        )}
        <a
          href={project.htmlUrl}
          {...externalProps}
          className={variant("source")}
        >
          <GitHubIcon className="h-4 w-4" />
          Source
        </a>
      </div>
    </div>
  );
}
