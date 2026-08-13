import { site } from "@/site.config";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-base-content/10 font-mono text-sm opacity-80">
        <span>
          {site.siteName} | © {new Date().getFullYear()} - Building with ❤️ and AI
        </span>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <a
            href={site.github}
            {...externalProps}
            className="hover:text-pink-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.telegram}
            {...externalProps}
            className="hover:text-pink-400 transition-colors"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}