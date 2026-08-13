import type { Metadata } from "next";
import { getPortfolioRepos } from "@/lib/github";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `Projects | ${site.siteName}`,
  description:
    "A collection of projects built by Aster Julian Ray — web apps, experiments, and campus projects.",
};

export default async function ProjectsPage() {
  const projects = await getPortfolioRepos();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
      <FadeIn>
        <header className="mb-12">
          <p className="font-mono text-sm text-primary mb-3">~/projects</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Projects
          </h1>
          <p className="mt-4 text-base-content/70 max-w-xl">
            Things I&apos;ve built while learning — web apps, experiments, and
            campus projects. Pulled live from my GitHub.
          </p>
        </header>
      </FadeIn>

      {projects.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-mono text-base-content/60">
            No projects yet.
          </p>
          <p className="mt-2 text-sm text-base-content/40">
            Repos tagged with the{" "}
            <code className="font-mono text-primary">portfolio</code> topic on
            GitHub appear here.
          </p>
        </div>
      ) : (
        <FadeIn delay={0.1}>
          <ProjectGrid projects={projects} />
        </FadeIn>
      )}
    </main>
  );
}
