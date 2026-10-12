"use client";

import type { MCQResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export function MCQCard({ mcq }: { mcq: MCQResult }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350] shadow-soft dark:shadow-soft-dark p-4 sm:p-5 w-full">
      {/* Year chip */}
      <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase bg-[#EAF1F8] dark:bg-[#162A46] text-[#3B6AA0] dark:text-[#4FC3F7] mb-4">
        APSC CCE PRELIMS GS — {mcq.year}
      </div>

      {/* Question text */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-[#0A1E3F] dark:text-[#EAF2FF]">
        <span className="font-semibold">Q.{mcq.q_number}.</span>{" "}
        {mcq.question_text}
      </p>

      {/* Statements */}
      {mcq.statements.length > 0 && (
        <ol className="mt-3 space-y-1.5 list-none">
          {mcq.statements.map((s, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed text-[#0A1E3F] dark:text-[#EAF2FF] pl-5 relative"
            >
              <span className="absolute left-0 text-[#6B7A90] dark:text-[#8AA0BE]">
                {i + 1}.
              </span>
              {s.replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ol>
      )}

      {/* Instruction */}
      <p className="mt-4 text-sm text-[#0A1E3F] dark:text-[#EAF2FF]">
        Select the correct suggestions using the codes given below.
      </p>

      {/* Options grid */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {mcq.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              "text-left px-3 py-2.5 rounded-xl border transition-all duration-200",
              "border-[#E5EAF1] dark:border-[#1B3350]",
              "bg-[#F9FBFD] dark:bg-[#0B1A30]",
              "hover:border-[#3B9EFF] dark:hover:border-[#4FC3F7]",
              "text-sm text-[#0A1E3F] dark:text-[#EAF2FF]"
            )}
          >
            <span className="font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] mr-1">
              ({OPTION_LETTERS[i]})
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}