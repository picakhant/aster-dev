import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

type ContactCardProps = {
  title: string;
  handle: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

export function ContactCard({
  title,
  handle,
  href,
  icon,
  external = true,
}: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external ? externalProps : {})}
      className="card bg-base-200/80 border border-base-content/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:-translate-y-1 rounded-2xl p-6 flex items-center gap-3"
    >
      <span className="text-primary shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="font-mono font-bold text-primary">{title}</p>
        <p className="text-sm text-base-content/60 font-mono truncate">
          {handle}
        </p>
      </div>
      <ArrowUpRight className="ml-auto h-4 w-4 text-base-content/40 shrink-0" />
    </a>
  );
}