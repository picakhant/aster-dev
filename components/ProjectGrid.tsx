// app/projects/ProjectGrid.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectGrid() {
  // Custom Hook ကနေ လိုအပ်တာတွေ အကုန်လုံး လှမ်းယူလိုက်ပြီ
  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjects(6); // တစ်ခါဆွဲ ၆ ခု

  // 1. Initial Loading State (Skeleton ပြမယ့်နေရာ)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-100 bg-base-100 rounded-2xl border border-base-content/5 flex flex-col overflow-hidden"
            >
              <div className="aspect-video w-full bg-base-content/10 skeleton rounded-none"></div>
              <div className="p-6 grow flex flex-col">
                <div className="h-6 w-3/4 bg-base-content/10 skeleton mb-4"></div>
                <div className="h-4 w-full bg-base-content/5 skeleton mb-2"></div>
                <div className="h-4 w-5/6 bg-base-content/5 skeleton"></div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <div className="h-10 w-full bg-base-content/10 skeleton rounded-lg"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  // 2. Error State (API ဒါမှမဟုတ် Network ကျသွားရင် ပြမယ့်နေရာ)
  if (isError) {
    return (
      <div className="text-center mt-20 p-8 bg-error/10 rounded-2xl border border-error/20">
        <h3 className="text-xl font-bold text-error mb-2">
          Oops! Something went wrong.
        </h3>
        <p className="text-base-content/70">
          {error instanceof Error ? error.message : "Failed to load projects."}
        </p>
      </div>
    );
  }

  // 3. Main Data Visualization
  return (
    <div className="mt-12">
      {/* Projects Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* React Query ရဲ့ Infinite Query က Data ကို 'pages' အနေနဲ့ Array အထပ်ထပ် ပေးလို့ map (၂) ထပ် ခံရပါတယ် */}
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.projects.map((project) => {
              const isCompleted = project.status
                ?.toLowerCase()
                .includes("complete");

              return (
                <div
                  key={project.$id}
                  className="group flex flex-col bg-base-100 rounded-2xl overflow-hidden border border-base-content/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.3)] hover:-translate-y-1"
                >
                  {/* Image & Status Badge */}
                  <figure className="relative aspect-video w-full overflow-hidden bg-base-300">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-base-100/90 via-transparent to-transparent"></div>

                    <div className="absolute top-4 right-4 z-10">
                      {isCompleted ? (
                        <span className="badge border-none bg-success/20 text-success backdrop-blur-md font-mono text-xs px-3 py-3 shadow-lg">
                          ● Completed
                        </span>
                      ) : (
                        <span className="badge border-none bg-warning/20 text-warning backdrop-blur-md font-mono text-xs px-3 py-3 shadow-lg">
                          ○ {project.status}
                        </span>
                      )}
                    </div>
                  </figure>

                  {/* Content Section */}
                  <div className="flex flex-col grow p-6 pb-2">
                    <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-base-content/60 text-sm leading-relaxed line-clamp-2 mb-4 grow">
                      {project.description}
                    </p>

                    {/* Minimalist Tech Pills (Safely handling Nullable array) */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.techStack && project.techStack.length > 0 ? (
                        project.techStack.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-base-200/50 text-base-content/70 font-mono text-xs border border-base-content/5"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-base-200/30 text-base-content/40 font-mono text-xs border border-base-content/5 italic">
                          TBD
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Section (Footer) */}
                  <div className="flex items-center justify-between p-6 pt-4 mt-auto border-t border-base-content/5">
                    {/* GitHub Link (Safely handling Nullable string) */}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base-content/40 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        Source
                      </a>
                    ) : (
                      <span className="w-4.5" /> // Spacer
                    )}

                    {/* Case Study Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className={`btn btn-primary btn-sm rounded-lg border-none ${
                        !isCompleted
                          ? "opacity-50 cursor-not-allowed bg-base-300 text-base-content/50 pointer-events-none"
                          : "group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.4)] transition-all"
                      }`}
                    >
                      Case Study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* 4. Load More Button */}
      {hasNextPage && (
        <div className="text-center mt-16">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn btn-outline btn-primary font-mono rounded-full px-8 transition-all hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
          >
            {isFetchingNextPage ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Fetching Data...
              </>
            ) : (
              "Load More Projects"
            )}
          </button>
        </div>
      )}

      {/* Data အကုန်ကုန်သွားရင် ပြမယ့် စာသား (Optional) */}
      {!hasNextPage && data?.pages[0]?.projects?.length !== 0 && (
        <div className="text-center mt-16 text-base-content/40 font-mono text-sm">
          ~/ End of projects list.
        </div>
      )}

      {/* Database ထဲမှာ ဘာ Data မှ မရှိသေးရင် ပြမယ့် UI */}
      {data?.pages[0]?.projects?.length === 0 && (
        <div className="text-center mt-20 text-base-content/50 font-mono">
          <p>{`> No projects found in the database yet.`}</p>
        </div>
      )}
    </div>
  );
}
