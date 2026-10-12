"use client";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur-md bg-white/40 dark:bg-[#0F2138]/40 border-b border-[#E5EAF1]/60 dark:border-[#1B3350]/60">
      <div className="max-w-[880px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 text-[#0A1E3F] dark:text-[#4FC3F7]">
          <Logo size={50} />
          <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#0A1E3F] dark:text-[#EAF2FF]">
            Chronicle
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}