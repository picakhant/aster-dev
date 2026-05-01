// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll ဆွဲတဲ့အခါ Navbar Background ပြောင်းဖို့နဲ့ Mobile Menu အလိုအလျောက် ပိတ်ဖို့
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 50) {
        setIsMobileMenuOpen(false); // အောက်ရောက်သွားရင် Menu ပြန်ရုပ်မယ်
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- Main Navbar --- */}
      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-base-100/90 backdrop-blur-md border-b border-base-content/10 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
          {/* Logo Section */}
          <Link
            href="/"
            className="text-xl font-bold font-mono tracking-tighter hover:text-primary transition-colors flex items-center gap-1 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-primary">{`~/`}</span>
            aster.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            <NavLink href="/" label="Home" currentPath={pathname} />
            <NavLink href="/projects" label="Projects" currentPath={pathname} />
            {/* <NavLink href="/about" label="About" currentPath={pathname} /> */}

            <Link
              href="mailto:your@email.com"
              className="btn btn-outline btn-primary btn-sm rounded-md ml-4 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.4)]"
            >
              Say Hello
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden btn btn-square btn-ghost text-base-content z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Menu ဖွင့်/ပိတ် အခြေအနေပေါ်မူတည်ပြီး Icon ပြောင်းမယ် */}
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Dropdown (Animated) --- */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-base-100/95 backdrop-blur-lg z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 font-mono text-xl">
          <MobileNavLink
            href="/"
            label="Home"
            currentPath={pathname}
            setOpen={setIsMobileMenuOpen}
          />
          <MobileNavLink
            href="/projects"
            label="Projects"
            currentPath={pathname}
            setOpen={setIsMobileMenuOpen}
          />
          {/* <MobileNavLink href="/about" label="About" currentPath={pathname} setOpen={setIsMobileMenuOpen} /> */}

          <Link
            href="mailto:your@email.com"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-primary btn-wide mt-4"
          >
            Say Hello
          </Link>
        </div>
      </div>
    </>
  );
}

// --- Helper Components ---

function NavLink({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const isActive =
    currentPath === href || (href !== "/" && currentPath.startsWith(href));

  return (
    <Link
      href={href}
      className={`relative py-1 transition-colors hover:text-primary ${
        isActive ? "text-primary" : "text-base-content/70"
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(var(--color-primary),0.6)]"></span>
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  currentPath,
  setOpen,
}: {
  href: string;
  label: string;
  currentPath: string;
  setOpen: (open: boolean) => void;
}) {
  const isActive =
    currentPath === href || (href !== "/" && currentPath.startsWith(href));

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)} // နှိပ်လိုက်ရင် Menu အလိုအလျောက် ပိတ်သွားမယ်
      className={`transition-all ${
        isActive
          ? "text-primary text-2xl font-bold"
          : "text-base-content/70 hover:text-primary"
      }`}
    >
      {isActive ? `> ${label} <` : label}{" "}
      {/* Active ဖြစ်နေရင် အရှေ့အနောက် မြှားလေးတွေနဲ့ ပြမယ် */}
    </Link>
  );
}
