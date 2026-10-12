"use client";

import { Logo } from "./Logo";
import { getGreeting } from "@/lib/utils";

const SUGGESTIONS = [
  "Give me all polity questions",
  "Explain Q7 of 2023 paper",
  "Latest news of today",
  "Give me all current affairs questions",
];

export function WelcomeState({
  onSuggestionClick,
}: {
  onSuggestionClick: (q: string) => void;
}) {
  const greeting = getGreeting();
  const isNightOwl = greeting === "night owl";

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-8 sm:py-16 min-h-[60vh]">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 bg-white shadow-soft dark:bg-[#0E1F36] dark:shadow-soft-dark dark:ring-1 dark:ring-[#4FC3F7]/20 text-[#1B2A4E] dark:text-[#4FC3F7]">
        <Logo size={60} />
      </div>

      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#0A1E3F] dark:text-[#EAF2FF]">
        {isNightOwl ? (
          <>
            Hello{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#3B9EFF] to-[#4FB8E8] bg-clip-text text-transparent dark:from-[#4FC3F7] dark:to-[#3B9EFF]">
              night owl
            </span>
          </>
        ) : (
          <>
            Good{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#3B9EFF] to-[#4FB8E8] bg-clip-text text-transparent dark:from-[#4FC3F7] dark:to-[#3B9EFF]">
              {greeting}
            </span>
          </>
        )}
      </h1>

      <p className="mt-4 text-sm sm:text-base text-[#6B7A90] dark:text-[#8AA0BE] max-w-md leading-relaxed">
        Your AI assistant for ideas, writing, learning, coding and more.
        <br />
        Turn your thoughts into something amazing.
      </p>

      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestionClick(s)}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-[#E5EAF1] dark:border-[#1B3350] bg-white/70 dark:bg-[#0E1F36]/70 text-[#0A1E3F] dark:text-[#EAF2FF] hover:border-[#3B9EFF] dark:hover:border-[#4FC3F7] hover:bg-white dark:hover:bg-[#0E1F36] transition-all duration-200"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}