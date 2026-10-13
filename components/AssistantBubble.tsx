"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Logo } from "./Logo";
import { TypingIndicator } from "./TypingIndicator";
import { MCQCard } from "./MCQCard";
import { NewsList } from "./NewsList";
import type { ChatMessageType } from "@/lib/types";
import { formatTime } from "@/lib/utils";

export function AssistantBubble({ message }: { message: ChatMessageType }) {
  const { response, loading, error, timestamp, content } = message;

  return (
    <div className="flex items-start gap-2 sm:gap-3 animate-fade-up">
      <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350] text-[#1B2A4E] dark:text-[#4FC3F7]">
        <Logo size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl rounded-tl-sm bg-white dark:bg-[#0E1F36] border border-[#E5EAF1] dark:border-[#1B3350] shadow-soft dark:shadow-soft-dark px-4 py-3">
          {loading && <TypingIndicator />}

          {!loading && error && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          {!loading && !error && response && (
            <>
              {/* RAG_SEARCH → multiple MCQ cards */}
              {response.intent === "RAG_SEARCH" &&
                response.data.intent === "RAG_SEARCH" && (
                  <div className="space-y-4">
                    {response.data.results.length === 0 ? (
                      <p className="text-sm text-[#6B7A90] dark:text-[#8AA0BE]">
                        No matching questions found.
                      </p>
                    ) : (
                      response.data.results.map((mcq) => (
                        <MCQCard key={mcq.q_id} mcq={mcq} />
                      ))
                    )}
                  </div>
                )}

              {/* SPECIFIC_QA → one MCQ card + explanation */}
              {response.intent === "SPECIFIC_QA" &&
                response.data.intent === "SPECIFIC_QA" && (
                  <div className="space-y-4">
                    {response.data.error ? (
                      <p className="text-sm text-[#6B7A90] dark:text-[#8AA0BE]">
                        {response.data.error}
                      </p>
                    ) : (
                      response.data.result && (
                        <>
                          <MCQCard mcq={response.data.result} />
                          {response.data.result.explanation && (
                            <div className="rounded-2xl bg-[#F4F7FB] dark:bg-[#0B1A30] border border-[#E5EAF1] dark:border-[#1B3350] p-4 overflow-x-auto">
                              <p className="text-xs uppercase tracking-wide font-semibold text-[#3B9EFF] dark:text-[#4FC3F7] mb-3">
                                Explanation
                              </p>
                              <div className="prose prose-sm dark:prose-invert max-w-none text-[#0A1E3F] dark:text-[#EAF2FF] prose-headings:text-[#0A1E3F] dark:prose-headings:text-[#EAF2FF] prose-strong:text-[#0A1E3F] dark:prose-strong:text-[#EAF2FF] prose-table:text-sm prose-th:border prose-th:border-[#E5EAF1] dark:prose-th:border-[#1B3350] prose-th:p-2 prose-td:border prose-td:border-[#E5EAF1] dark:prose-td:border-[#1B3350] prose-td:p-2">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {response.data.result.explanation}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    )}
                  </div>
                )}

              {/* LATEST_NEWS */}
              {response.intent === "LATEST_NEWS" &&
                response.data.intent === "LATEST_NEWS" && (
                  <NewsList data={response.data} />
                )}

              {/* GENERAL_CHAT */}
              {response.intent === "GENERAL_CHAT" &&
                response.data.intent === "GENERAL_CHAT" && (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-[#0A1E3F] dark:text-[#EAF2FF]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {response.data.answer}
                    </ReactMarkdown>
                  </div>
                )}
            </>
          )}

          {/* Plain content fallback */}
          {!loading && !error && !response && content && (
            <p className="text-sm whitespace-pre-wrap text-[#0A1E3F] dark:text-[#EAF2FF]">
              {content}
            </p>
          )}
        </div>

        {!loading && (
          <p className="mt-1 text-[10px] text-right text-[#6B7A90] dark:text-[#8AA0BE] pr-1">
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}