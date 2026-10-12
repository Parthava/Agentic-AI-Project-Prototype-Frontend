"use client";

import { useState } from "react";
import { Paperclip, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (msg: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-end gap-2 rounded-full px-3 py-2 sm:py-2.5",
          "bg-white dark:bg-[#0E1F36]",
          "border border-[#E5EAF1] dark:border-[#1B3350]",
          "shadow-soft dark:shadow-soft-dark",
          "focus-within:ring-2 focus-within:ring-[#3B9EFF]/30 dark:focus-within:ring-[#4FC3F7]/30",
          "transition-all duration-200"
        )}
      >
        <button
          type="button"
          aria-label="Attach file"
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#6B7A90] dark:text-[#8AA0BE] hover:bg-[#EAF1F8] dark:hover:bg-[#162A46] transition-colors"
        >
          <Paperclip size={18} />
        </button>

        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          disabled={disabled}
          className="chat-input-field flex-1 resize-none bg-transparent text-sm sm:text-[15px] text-[#0A1E3F] dark:text-[#EAF2FF] placeholder:text-[#8DA2BA] dark:placeholder:text-[#6B8AAA] max-h-32 py-2 outline-none border-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0"
        />

        <button
          type="button"
          aria-label="Enhance prompt"
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#3B9EFF] dark:text-[#4FC3F7] hover:bg-[#EAF1F8] dark:hover:bg-[#162A46] transition-colors"
        >
          <Sparkles size={18} />
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className={cn(
            "shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center",
            "bg-[#1B2A4E] dark:bg-[#4FC3F7] text-white dark:text-[#0F2138]",
            "hover:scale-105 active:scale-95 transition-all",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}