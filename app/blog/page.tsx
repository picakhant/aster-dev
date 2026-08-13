import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { blog, site } from "@/site.config";

export const metadata: Metadata = {
  title: `Blog | ${site.siteName}`,
  description:
    "Tech articles and notes written by Aster Julian Ray — web development, CS learnings, and community experiences.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
      <FadeIn>
        <header className="mb-12">
          <p className="font-mono text-sm text-primary mb-3">~/blog</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="mt-4 text-base-content/70 max-w-xl">
            Notes and articles on web development and things I&apos;m learning.
            Written in markdown and pulled live from my GitHub.
          </p>
        </header>
      </FadeIn>

      {posts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-mono text-base-content/60">
            No posts yet.
          </p>
          <p className="mt-2 text-sm text-base-content/40">
            Markdown files in the{" "}
            <code className="font-mono text-primary">
              {blog.repoName}
            </code>{" "}
            repo appear here.
          </p>
        </div>
      ) : (
        <FadeIn delay={0.1}>
          <BlogGrid posts={posts} />
        </FadeIn>
      )}
    </main>
  );
}