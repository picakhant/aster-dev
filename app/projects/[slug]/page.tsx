// app/projects/[slug]/page.tsx
import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyViewer from "@/components/CaseStudyViewer";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// 💡 1. Dynamic Metadata Generator (ဒီအပိုင်း အသစ်ထည့်ရမှာပါ)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { database } = createAdminClient();

  try {
    // Appwrite ကနေ Slug နဲ့ တိုက်ပြီး Project Data လှမ်းဆွဲမယ်
    const response = await database.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_COLLECTION_ID!,
      queries: [Query.equal("slug", slug)],
    });

    if (!response.rows || response.rows.length === 0) {
      return { title: "Project Not Found" };
    }

    const project = response.rows[0];

    return {
      // ဥပမာ: "Movie Database Web App | Aster" လို့ ပေါ်လာပါမယ်
      title: `${project.title} | Aster`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: [project.thumbnail], // Link ချရင် ပရောဂျက်ပုံလေးပါ တန်းပေါ်လာမယ်! 🌟
      },
    };
  } catch (error) {
    return { title: "Project Detail" };
  }
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { database, storage } = createAdminClient();

  try {
    // 1. Fetch Project DB Data
    const response = await database.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_COLLECTION_ID!,
      queries: [Query.equal("slug", slug)],
    });

    if (!response.rows || response.rows.length === 0) return notFound();
    const project = response.rows[0];

    // 2. Fetch Both Markdown Files in Parallel
    let contentEn = "";
    let contentMm = "";

    const fetchMarkdown = async (fileId: string) => {
      if (!fileId) return "";
      try {
        const fileBuffer = await storage.getFileView({
          bucketId: process.env.APPWRITE_BUCKET_ID!,
          fileId,
        });
        return new TextDecoder().decode(fileBuffer);
      } catch (err) {
        console.error(`Error loading markdown ${fileId}:`, err);
        return "";
      }
    };

    [contentEn, contentMm] = await Promise.all([
      fetchMarkdown(project.md_file_en),
      fetchMarkdown(project.md_file_mm),
    ]);

    return (
      <main className="min-h-screen bg-base-300 pb-24">
        <div className="h-24 md:h-28"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Top Navigation */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="text-base-content/50 hover:text-primary transition-colors text-sm font-mono flex items-center gap-2 group w-max"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Projects
            </Link>
          </div>

          {/* === Material Hero Card (No Full-Screen Stretching) === */}
          <header className="bg-base-100 rounded-4xl p-6 md:p-10 shadow-sm border border-base-content/5 mb-12">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              {/* Left: Text Content */}
              <div className="lg:w-1/2 w-full space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight tracking-tight">
                  {project.title}
                </h1>
                <p className="text-base-content/60 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-base-200/50 text-base-content/70 text-xs font-mono font-medium border border-base-content/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Contained Image (Material Elevation) */}
              <div className="lg:w-1/2 w-full">
                <figure className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-base-content/10 bg-base-200">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </div>
            </div>
          </header>

          {/* === Main Content & Sidebar Grid === */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Main Case Study Viewer (Client Component) */}
            <section className="lg:w-2/3 order-2 lg:order-1">
              {/* The Client Component handles the tabs and Markdown rendering */}
              <CaseStudyViewer contentEn={contentEn} contentMm={contentMm} />
            </section>

            {/* Right: Material Sticky Sidebar */}
            <aside className="lg:w-1/3 order-1 lg:order-2">
              <div className="sticky top-28 bg-base-100 rounded-3xl p-8 border border-base-content/5 shadow-sm space-y-8">
                {/* Status & Rating */}
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-2">
                      Project Status
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${project.status.toLowerCase().includes("complete") ? "bg-success" : "bg-warning"}`}
                      ></div>
                      <p className="font-semibold text-base-content">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-3">
                      Build Rating
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="grow h-2 bg-base-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${project.rate * 10}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {project.rate}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divider my-0 opacity-50"></div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      className="btn btn-primary w-full rounded-xl shadow-md"
                    >
                      Live Preview
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="btn btn-outline w-full rounded-xl border-base-content/20 hover:bg-base-content/5"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
