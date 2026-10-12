"use client";

import { formatTime } from "@/lib/utils";

export function UserBubble({
  content,
  timestamp,
}: {
  content: string;
  timestamp: Date;
}) {
  return (
    <div className="flex justify-end animate-fade-up">
      <div className="max-w-[85%] sm:max-w-[70%] rounded-2xl rounded-tr-sm px-4 py-3 bg-[#1B2A4E] dark:bg-gradient-to-br dark:from-[#2E7DD6] dark:to-[#3B9EFF] text-white shadow-soft">
        <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
        <p className="mt-1 text-[10px] text-white/70 text-right">
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
}