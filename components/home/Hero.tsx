"use client";

import Link from "next/link";
import { hero, heroTerminal, heroTitle, site } from "@/site.config";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function Hero() {
  return (
    <section id="home" className="max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (span 7) */}
        <div className="lg:col-span-7">
          <Stagger className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src={site.avatar}
                alt={site.avatarAlt}
                className="h-30 rounded-full border-double p-1 border-primary border-2"
              />
              <div>
                <StaggerItem>
                  <span className="badge badge-outline badge-primary gap-2 py-3 px-4">
                    {site.badge}
                  </span>
                </StaggerItem>

                <StaggerItem>
                  <p className="font-mono text-sm text-base-content/60 mt-2">
                    {site.tagline}
                  </p>
                </StaggerItem>
              </div>
            </div>

            <StaggerItem>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mt-4">
                {heroTitle.map((block) => (
                  <span
                    key={block.text}
                    className={block.highlight ? "text-primary" : undefined}
                  >
                    {block.text}{" "}
                  </span>
                ))}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-xl text-base-content/80 mt-4 max-w-xl">
                {hero.description}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                {hero.ctas.map((cta) => {
                  const className =
                    cta.variant === "primary"
                      ? "btn btn-primary gap-2"
                      : "btn btn-outline gap-2";
                  return cta.href.startsWith("http") ? (
                    <a
                      key={cta.label}
                      href={cta.href}
                      {...externalProps}
                      className={className}
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <Link key={cta.label} href={cta.href} className={className}>
                      {cta.label}
                    </Link>
                  );
                })}
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Right column: Terminal mockup */}
        <Stagger className="lg:col-span-5">
          <StaggerItem>
            <div className="w-full max-w-lg mx-auto lg:max-w-none">
              <div className="mockup-code w-full overflow-x-auto">
                {heroTerminal.map((line) => (
                  <pre key={line.id} data-prefix={line.prefix}>
                    <code>
                      {line.segments.map((segment, i) => (
                        <span key={i} className={segment.className ?? undefined}>
                          {segment.text}
                        </span>
                      ))}
                    </code>
                  </pre>
                ))}
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
