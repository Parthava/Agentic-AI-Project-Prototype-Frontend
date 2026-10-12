import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(): "morning" | "afternoon" | "evening" | "night owl" {
  const h = new Date().getHours();

  // 5 AM – 11:59 AM  → morning
  if (h >= 5 && h < 12) return "morning";

  // 12 PM – 4:59 PM  → afternoon
  if (h >= 12 && h < 17) return "afternoon";

  // 5 PM – 9:59 PM   → evening
  if (h >= 17 && h < 22) return "evening";

  // 10 PM – 4:59 AM  → night owl
  return "night owl";
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}