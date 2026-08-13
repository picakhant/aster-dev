import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitFork, Star } from "lucide-react";
import {
  getPortfolioRepos,
  getProjectBySlug,
  getProjectReadme,
} from "@/lib/github";
import { Markdown } from "@/components/projects/Markdown";
import { formatDate } from "@/components/projects/ProjectCard";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { FadeIn } from "@/components/ui/FadeIn";


const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export async function generateStaticParams() {
  const projects = await getPortfolioRepos();
  return projects.map((project) => ({ slug: project.name }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const readme = await getProjectReadme(project.fullName);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
      <FadeIn>
        <Link
          href="/projects"
          className="btn btn-ghost btn-sm rounded-lg font-mono text-base-content/70 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-primary badge-sm font-mono">
              {project.language ?? "Web"}
            </span>
            {project.featured && (
              <span className="badge badge-outline badge-sm font-mono">
                ★ Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-all">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-base-content/70">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="badge badge-ghost badge-sm font-mono gap-1" title="Stars">
              <Star className="h-3 w-3" />
              {project.stars}
            </span>
            <span className="badge badge-ghost badge-sm font-mono gap-1" title="Forks">
              <GitFork className="h-3 w-3" />
              {project.forks}
            </span>
            <span className="text-xs text-base-content/50 font-mono">
              Updated {formatDate(project.updatedAt)}
            </span>
          </div>

          {project.topics.filter((topic) => topic !== "featured").length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.topics
                .filter((topic) => topic !== "featured")
                .map((topic) => (
                  <span
                    key={topic}
                    className="badge badge-outline badge-sm font-mono opacity-80"
                  >
                    {topic}
                  </span>
                ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {project.homepage && (
              <a
                href={project.homepage}
                {...externalProps}
                className="btn btn-primary btn-sm rounded-lg"
              >
                Live Demo
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <a
              href={project.htmlUrl}
              {...externalProps}
              className="btn btn-outline btn-sm rounded-lg"
            >
              <GitHubIcon className="h-4 w-4" />
              Source Code
            </a>
          </div>
        </header>

        <div className="border-t border-base-content/10 pt-8">
          {readme ? (
            <Markdown content={readme} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-mono text-base-content/60">
                No README yet.
              </p>
              <p className="mt-2 text-sm text-base-content/40 max-w-md mx-auto">
                This project doesn&apos;t have a README file, so there&apos;s
                nothing to show here. Check the source on GitHub instead.
              </p>
              <a
                href={project.htmlUrl}
                {...externalProps}
                className="btn btn-outline btn-sm rounded-lg mt-6"
              >
                <GitHubIcon className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </FadeIn>
    </main>
  );
}
