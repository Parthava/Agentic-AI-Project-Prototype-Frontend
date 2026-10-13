"use client";

import type { MCQResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D"];

/**
 * Frontend parser for Match-the-following questions.
 * Returns { isMatch, questionText, leftItems, rightItems, options } or { isMatch: false }.
 */
function detectMatchQuestion(mcq: MCQResult) {
  // Backend already parsed? Use that
  if (mcq.is_match && mcq.left_items && mcq.right_items) {
    return {
      isMatch: true,
      questionText: cleanQuestionText(mcq.question_text),
      leftItems: mcq.left_items,
      rightItems: mcq.right_items,
      options: mcq.options,
    };
  }

  const text = mcq.question_text || "";
  const isMatch = /match\s+the\s+(following|monuments|statements|list|books|pairs)/i.test(
    text
  );

  if (!isMatch) {
    return { isMatch: false };
  }

  // ── Extract LEFT items (a., b., c., d.) ──
  // Stop at ; OR at (Places|List-II|Column|Authors|:) OR end of text
  const leftPattern =
    /([a-d])\.\s*([^;]+?)(?=;\s*[a-d]\.|\s*(?:Places|List-II|Column|Authors|List II)\s*[:.]|Select\s+the\s+correct|$)/gi;
  const leftMatches = [...text.matchAll(leftPattern)];

  // ── Extract RIGHT items (1., 2., 3., 4.) ──
  // Stop at ; OR at "Select the correct answer" OR end of text
  // Pehle "Places:" / "List-II:" / "Authors:" ke baad ka text isolate karo
  const rightSectionMatch = text.match(
    /(?:Places|List-II|Column|Authors|List II)\s*[:.]\s*(.+?)(?=Select\s+the\s+correct|$)/i
  );
  const rightSection = rightSectionMatch ? rightSectionMatch[1] : text;

  const rightPattern = /(\d)\.\s*([^;]+?)(?=;\s*\d\.|Select\s+the\s+correct|$)/gi;
  const rightMatches = [...rightSection.matchAll(rightPattern)];

  if (leftMatches.length === 0 || rightMatches.length === 0) {
    return { isMatch: false };
  }

  const leftItems = leftMatches.map((m) => ({
    key: m[1].toLowerCase(),
    value: cleanValue(m[2]),
  }));

  const rightItems = rightMatches.map((m) => ({
    key: m[1],
    value: cleanValue(m[2]),
  }));

  // ── Question text ──
  // Everything before "Monuments:" / "List-I" / "Column-I" / "Books:"
  const qTextMatch = text.match(
    /^(.*?)(?=(?:Monuments|List-I|Column-I|Books|List I)\s*[:.]|$)/i
  );
  const questionText = cleanQuestionText(
    qTextMatch ? qTextMatch[1] : text
  );

  return {
    isMatch: true,
    questionText,
    leftItems,
    rightItems,
    options: mcq.options,
  };
}

/** Value se trailing punctuation + "Select the correct..." hata do */
function cleanValue(v: string): string {
  return v
    .replace(/select\s+the\s+correct.*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[;,.\s]+$/, "");
}

/** Question text ko saaf karo — unbalanced brackets remove karo */
function cleanQuestionText(t: string): string {
  let cleaned = t.trim();
  // Agar open bracket hai without closing — hata do
  const openCount = (cleaned.match(/\(/g) || []).length;
  const closeCount = (cleaned.match(/\)/g) || []).length;
  if (openCount > closeCount) {
    // Extra open brackets hata do (rightmost ones)
    let diff = openCount - closeCount;
    cleaned = cleaned.replace(/\([^()]*$/, (m) => m.replace(/\(/g, ""));
  }
  // Trailing colon/dash/paren hata do
  cleaned = cleaned.replace(/[:\-–\s]+$/, "").trim();
  return cleaned;
}

export function MCQCard({ mcq }: { mcq: MCQResult }) {
  const yearFromId = mcq.q_id?.split("_")[0];
  const displayYear = mcq.year || yearFromId || "—";

  const detected = detectMatchQuestion(mcq);
  const isMatch = detected.isMatch;

  const cleanOptions = mcq.options?.map((o) => o.trim()) || [];
  const cleanStatements = mcq.statements?.map((s) => s.trim()) || [];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350] shadow-soft dark:shadow-soft-dark p-4 sm:p-5 w-full">
      {/* Year chip */}
      <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase bg-[#EAF1F8] dark:bg-[#162A46] text-[#3B6AA0] dark:text-[#4FC3F7] mb-4">
        APSC CCE PRELIMS GS — {displayYear}
      </div>

      {/* Question text */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-[#0A1E3F] dark:text-[#EAF2FF] whitespace-pre-line">
        <span className="font-semibold">Q.{mcq.q_number}.</span>{" "}
        {isMatch ? detected.questionText : mcq.question_text}
      </p>

      {/* === MATCH TYPE: Two-column layout === */}
      {isMatch && detected.leftItems && detected.rightItems && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          {/* Left side */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] mb-2">
              List-I
            </p>
            <div className="space-y-1.5">
              {detected.leftItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-2 text-sm text-[#0A1E3F] dark:text-[#EAF2FF] px-2 py-1.5 rounded-lg bg-[#F9FBFD] dark:bg-[#0B1A30] border border-[#E5EAF1] dark:border-[#1B3350]"
                >
                  <span className="font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] shrink-0">
                    {item.key}.
                  </span>
                  <span className="leading-snug">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] mb-2">
              List-II
            </p>
            <div className="space-y-1.5">
              {detected.rightItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-2 text-sm text-[#0A1E3F] dark:text-[#EAF2FF] px-2 py-1.5 rounded-lg bg-[#F9FBFD] dark:bg-[#0B1A30] border border-[#E5EAF1] dark:border-[#1B3350]"
                >
                  <span className="font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] shrink-0">
                    {item.key}.
                  </span>
                  <span className="leading-snug">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === NORMAL TYPE: Statements list === */}
      {!isMatch && cleanStatements.length > 0 && (
        <ol className="mt-3 space-y-1.5 list-none">
          {cleanStatements.map((s, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed text-[#0A1E3F] dark:text-[#EAF2FF] pl-5 relative"
            >
              <span className="absolute left-0 text-[#6B7A90] dark:text-[#8AA0BE]">
                {i + 1}.
              </span>
              {s.replace(/^\(\w+\)\s*/, "").replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ol>
      )}

      {/* Instruction line — only if there are options */}
      {cleanOptions.length > 0 && (
        <p className="mt-4 text-sm text-[#0A1E3F] dark:text-[#EAF2FF]">
          Select the correct answer using the codes given below.
        </p>
      )}

      {/* Options grid */}
      {cleanOptions.length > 0 && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {cleanOptions.map((opt, i) => (
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
      )}
    </div>
  );
}