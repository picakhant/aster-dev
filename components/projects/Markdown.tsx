import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-4 text-3xl font-extrabold tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-2xl font-bold tracking-tight text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-xl font-bold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed text-base-content/85">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc pl-6 space-y-1.5 text-base-content/85">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal pl-6 space-y-1.5 text-base-content/85">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold text-base-content">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-8 border-base-content/15" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-primary/50 pl-4 italic text-base-content/70">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (!isBlock) {
      return (
        <code className="rounded bg-base-200 px-1.5 py-0.5 font-mono text-sm text-primary">
          {children}
        </code>
      );
    }
    return (
      <code
        className={`${className ?? ""} block overflow-x-auto rounded-xl bg-base-200 p-4 font-mono text-sm`}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="my-4 overflow-hidden">{children}</pre>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-base-content/10">
      <table className="table table-sm w-full">{children}</table>
    </div>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="my-4 rounded-xl border border-base-content/10"
    />
  ),
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
