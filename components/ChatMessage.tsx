"use client";

import { UserBubble } from "./UserBubble";
import { AssistantBubble } from "./AssistantBubble";
import type { ChatMessageType } from "@/lib/types";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  if (message.role === "user") {
    return <UserBubble content={message.content} timestamp={message.timestamp} />;
  }
  return <AssistantBubble message={message} />;
}