import { getMockResponse } from "./mockData";
import type { QueryResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const USE_MOCK = process.env.USE_MOCK === "true";

export async function sendQuery(
  query: string,
  topK: number = 100
): Promise<QueryResponse> {
  // Mock mode — backend ke bina test karne ke liye
  if (USE_MOCK) {
    console.log("🎭 MOCK MODE:", query);
    await new Promise((r) => setTimeout(r, 900));
    return getMockResponse(query);
  }

  // Real backend call
  try {
    console.log("🔌 Calling backend:", `${API_URL}/query`);
    const res = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: topK }),
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    const json = await res.json();
    console.log("✅ Backend response:", json);
    return json as QueryResponse;
  } catch (err) {
    console.warn("❌ Backend failed, using mock:", err);
    return getMockResponse(query);
  }
}