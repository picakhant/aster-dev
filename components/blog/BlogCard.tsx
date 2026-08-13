import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Post } from "@/lib/blog";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };
const btnClass = "btn btn-xs rounded-lg flex-1 font-mono";

export function formatPostDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <div className="card bg-base-200/80 border border-base-content/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-mono font-bold text-lg text-primary break-all">
            {post.title}
          </h3>
        </div>

        <p className="mt-2 text-xs text-base-content/50 font-mono">
          {formatPostDate(post.date)}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-base-content/80 line-clamp-3">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
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

      <div className="mt-6 pt-4 border-t border-base-content/10 flex items-center gap-2">
        <Link href={`/blog/${post.slug}`} className="btn btn-primary btn-xs rounded-lg flex-1 font-mono">
          <BookOpen className="h-3.5 w-3.5" />
          Read
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href={post.url}
          {...externalProps}
          className={`${btnClass} btn-outline`}
        >
          <GitHubIcon className="h-4 w-4" />
          Source
        </a>
      </div>
    </div>
  );
}