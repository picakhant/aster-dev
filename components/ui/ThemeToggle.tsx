"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const DARK_KEY = "theme";
const DARK = "dracula";
const LIGHT = "winter";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(DARK_KEY) !== LIGHT;
  });

  const toggle = () => {
    const next = dark ? LIGHT : DARK;
    setDark(!dark);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(DARK_KEY, next);
  };

  return (
    <label
      className="swap swap-rotate btn btn-ghost btn-circle btn-sm"
      title="Toggle theme"
    >
      <input
        type="checkbox"
        checked={!dark}
        onChange={toggle}
        aria-label="Toggle theme"
      />
      <Sun className="swap-on h-5 w-5" />
      <Moon className="swap-off h-5 w-5" />
    </label>
  );
}