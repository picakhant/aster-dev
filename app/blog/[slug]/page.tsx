import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";
import { getBlogPosts, getPostContent } from "@/lib/blog";
import { Markdown } from "@/components/projects/Markdown";
import { formatPostDate } from "@/components/blog/BlogCard";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { FadeIn } from "@/components/ui/FadeIn";


const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = (await getPostContent(slug))?.post;
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostContent(slug);

  if (!post) notFound();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
      <FadeIn>
        <Link
          href="/blog"
          className="btn btn-ghost btn-sm rounded-lg font-mono text-base-content/70 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-ghost badge-sm font-mono gap-1">
              <CalendarDays className="h-3 w-3" />
              {formatPostDate(post.post.date)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-words">
            {post.post.title}
          </h1>

          {post.post.description && (
            <p className="mt-4 text-lg text-base-content/70">
              {post.post.description}
            </p>
          )}

          {post.post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-outline badge-sm font-mono opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <a
            href={post.post.url}
            {...externalProps}
            className="btn btn-outline btn-sm rounded-lg mt-6"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </header>

        <div className="border-t border-base-content/10 pt-8">
          <Markdown content={post.content} />
        </div>
      </FadeIn>
    </main>
  );
}