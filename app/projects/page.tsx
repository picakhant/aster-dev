// app/projects/page.tsx
import ProjectGrid from "@/components/ProjectGrid";
import { Metadata } from "next";

// 1. SEO Power: Server-side ကနေ Metadata တွေကို သတ်မှတ်ပေးမယ်
export const metadata: Metadata = {
  title: "Projects | Aster.dev",
  description:
    "Explore my portfolio of web development projects, side hustles, and open-source contributions built with React, Next.js, and modern tech.",
  openGraph: {
    title: "Aster's Projects",
    description: "A showcase of full-stack development works.",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-base-300 py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* 2. Server-Rendered Static Content (SEO အတွက် Search Engine တွေ ဖတ်လို့ရတယ်) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="text-base-content/70 text-lg">
            Here's a complete list of my works, side projects, and open-source
            contributions.
          </p>
        </div>

        {/* 3. Client Component Injection: Card တွေနဲ့ Interactivity အပိုင်းကို ခွဲထုတ်ထားတယ် */}
        <ProjectGrid />
      </div>
    </main>
  );
}
