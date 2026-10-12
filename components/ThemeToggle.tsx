"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350]"
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
        "bg-white/70 dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350]",
        "hover:scale-105 active:scale-95 transition-all duration-200",
        "shadow-sm"
      )}
    >
      {isDark ? (
        <Sun size={18} className="text-[#4FC3F7]" />
      ) : (
        <Moon size={18} className="text-[#0A1E3F]" />
      )}
    </button>
  );
}