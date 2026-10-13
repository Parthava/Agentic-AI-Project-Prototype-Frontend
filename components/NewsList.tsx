"use client";

import type { LatestNewsData, NewsItem } from "@/lib/types";

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function NewsList({ data }: { data: LatestNewsData }) {
  return (
    <div className="w-full space-y-3">
      {/* Summary card */}
      {data.summary && (
        <div className="rounded-2xl bg-[#EAF1F8] dark:bg-[#162A46] border border-[#DCE7F2] dark:border-[#1B3350] p-4">
          <p className="text-sm text-[#0A1E3F] dark:text-[#EAF2FF] leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* News items */}
      <div className="space-y-2">
        {data.news?.map((n: NewsItem, i: number) => {
          const source = n.source || extractDomain(n.url);
          const date = formatDate(n.published_date);

          return (
            <a
              key={i}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-white dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350] p-4 hover:border-[#3B9EFF] dark:hover:border-[#4FC3F7] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm sm:text-[15px] font-semibold text-[#0A1E3F] dark:text-[#EAF2FF] leading-snug">
                  {n.title}
                </h3>
                {n.category && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide font-semibold bg-[#EAF1F8] dark:bg-[#162A46] text-[#3B6AA0] dark:text-[#4FC3F7]">
                    {n.category}
                  </span>
                )}
              </div>

              {n.why_it_matters && (
                <p className="mt-2 text-xs sm:text-sm italic text-[#6B7A90] dark:text-[#8AA0BE]">
                  {n.why_it_matters}
                </p>
              )}

              <div className="mt-2 flex items-center gap-2 text-[11px] text-[#6B7A90] dark:text-[#8AA0BE]">
                {source && <span>{source}</span>}
                {date && (
                  <>
                    <span>•</span>
                    <span>{date}</span>
                  </>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}