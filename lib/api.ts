import { getMockResponse } from "./mockData";
import type { QueryResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const USE_MOCK = process.env.USE_MOCK === "true";

export async function sendQuery(
  query: string,
  topK: number = 100
): Promise<QueryResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 900));
    return getMockResponse(query);
  }

  try {
    const res = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: topK }),
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    const json = await res.json();

    // Backend returns { intent, query, data }
    return json as QueryResponse;
  } catch (err) {
    console.warn("API failed, using mock:", err);
    return getMockResponse(query);
  }
}