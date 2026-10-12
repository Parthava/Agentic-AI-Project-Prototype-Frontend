"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { WelcomeState } from "@/components/WelcomeState";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { sendQuery } from "@/lib/api";
import type { ChatMessageType } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(query: string) {
    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    const loadingMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      loading: true,
    };

    setMessages((m) => [...m, userMsg, loadingMsg]);
    setLoading(true);

    try {
      const response = await sendQuery(query);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === loadingMsg.id
            ? { ...msg, loading: false, response }
            : msg
        )
      );
    } catch (e) {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === loadingMsg.id
            ? { ...msg, loading: false, error: true }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        ref={scrollRef}
        className="flex-1 w-full overflow-y-auto"
      >
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 py-6 pb-32 w-full">
          {messages.length === 0 ? (
            <WelcomeState onSuggestionClick={handleSend} />
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sticky input */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 pb-4 pt-2 bg-gradient-to-t from-[#F4F7FB] via-[#F4F7FB]/95 to-transparent dark:from-[#071427] dark:via-[#071427]/95">
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
}