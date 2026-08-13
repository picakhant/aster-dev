"use client";

import { toast, Toaster } from "react-hot-toast";
import { site } from "@/site.config";

export function ContactCTA() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-base-200)",
            color: "var(--color-base-content)",
            border: "1px solid var(--color-base-content)",
          },
        }}
      />
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="py-20 text-center relative overflow-hidden my-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-base-content/70 max-w-md mx-auto text-sm md:text-base mb-8">
            Got a project in mind or just want to discuss coding? My inbox is
            always open.
          </p>
          <a
            href={`mailto:${site.email}`}
            onClick={() => toast("Email copied to clipboard!")}
            className="btn btn-primary btn-wide shadow-primary shadow transition-all"
          >
            Say Hello
          </a>
        </div>
      </section>
    </>
  );
}