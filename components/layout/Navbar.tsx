"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/site.config";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-base-100/60 border-b border-base-200 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="navbar max-w-7xl mx-auto px-4">
          <div className="navbar-start">
            <Link
              href="/"
              className="font-mono text-xl text-primary hover:opacity-80 transition-opacity"
            >
              {site.brand}
            </Link>
          </div>

          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "text-primary font-semibold"
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            <ThemeToggle />
            <a
              href={site.github}
              {...externalProps}
              className="btn btn-ghost btn-sm btn-circle"
              title="GitHub"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>

            <Link
              href="/contact"
              className="btn btn-primary btn-sm rounded-lg hidden sm:inline-flex"
            >
              Contact
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="btn btn-ghost btn-sm btn-circle md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer (slide in from left) */}
      <aside
        aria-hidden={!open}
        className={`fixed inset-0 z-60 md:hidden bg-base-100/80 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          open
            ? "translate-x-0"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="navbar max-w-7xl w-full mx-auto px-4">
            <div className="navbar-start">
              <span className="font-mono font-bold text-xl text-primary">
                {site.brand}
              </span>
            </div>
            <div className="navbar-end gap-2">
              <ThemeToggle />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6 pb-10">
            <ul className="menu w-full gap-2 text-3xl font-bold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`py-3 px-4 rounded-lg hover:bg-base-200/70 transition-colors ${
                      isActive(link.href) ? "text-primary" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8 flex flex-col gap-3 border-t border-base-200">
            <a
              href={site.github}
              {...externalProps}
              onClick={() => setOpen(false)}
              className="btn btn-outline btn-lg justify-start font-semibold"
            >
              <GitHubIcon />
              GitHub
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary btn-lg"
            >
              Contact
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}