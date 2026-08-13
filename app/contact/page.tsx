import type { Metadata } from "next";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { site } from "@/site.config";
import { ContactCard } from "@/components/contact/ContactCard";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aster Julian Ray — email, Telegram, and GitHub.",
};

export default function ContactPage() {
  const emailHandle = site.email;
  const telegramHandle = `@${site.telegram.split("/").pop()}`;
  const githubHandle = `@${site.github.split("/").pop()}`;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
      <FadeIn>
        <header className="mb-12">
          <p className="font-mono text-sm text-primary mb-3">~/contact</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-base-content/70 max-w-xl">
            Got a project in mind or just want to discuss coding? Reach me on
            any of the channels below.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="card bg-base-200/80 border border-base-content/10 rounded-2xl p-8 md:p-12 text-center shadow-lg">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
            Let&apos;s work together
          </h2>
          <p className="text-base-content/70 max-w-md mx-auto text-sm md:text-base mb-8">
            My inbox is always open.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="btn btn-primary btn-wide rounded-lg"
            >
              <Mail className="h-4 w-4" />
              Say Hello
            </a>
            <CopyEmailButton />
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <ContactCard
          title="Email"
          handle={emailHandle}
          href={`mailto:${site.email}`}
          icon={<Mail className="h-5 w-5" />}
          external={false}
        />
        <ContactCard
          title="Telegram"
          handle={telegramHandle}
          href={site.telegram}
          icon={<Send className="h-5 w-5" />}
        />
        <ContactCard
          title="GitHub"
          handle={githubHandle}
          href={site.github}
          icon={<GitHubIcon className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="badge badge-outline badge-lg font-mono gap-1.5 opacity-80">
          <MapPin className="h-3.5 w-3.5" />
          {site.location}
        </span>
        <span className="badge badge-outline badge-lg font-mono gap-1.5 opacity-80">
          <Clock className="h-3.5 w-3.5" />
          {site.timezone}
        </span>
      </div>
    </main>
  );
}