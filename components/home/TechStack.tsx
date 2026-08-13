import { techStack, site } from "@/site.config";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Left: Tech Stack */}
        <div className="lg:col-span-8">
          <h2 className="font-mono text-primary text-lg mb-4">
            {"// Technologies I use and Still Learning"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-4 cursor-pointer py-3 rounded-xl bg-base-200/60 border border-base-content/10 font-mono flex items-center gap-2 transition-all duration-300 hover:scale-105 ${tech.glow}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Mentorship / Community Card */}
        <div className="lg:col-span-4">
          <a
            href={site.telegramCommunity}
            {...externalProps}
            className="bg-base-200/80 border border-primary/20 rounded-2xl p-5 hover:border-primary-500/50 transition-all shadow-lg block"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-info" />
              </span>
              <span className="font-mono text-xs text-base-content/60">
                Community Name
              </span>
            </div>

            <h3 className="text-primary font-bold text-lg">
              404: Sleep Not Found
            </h3>
            <p className="text-sm text-base-content/70 mt-1">
              Student Community in Myanmar
            </p>

            <div className="mt-4">
              <span className="inline-block px-3 py-1 rounded-full text-primary text-sm font-medium">
                Mentor
              </span>
              <p className="text-xs opacity-60 font-mono mt-2">
                Helping juniors to code
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
