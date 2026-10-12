import type { QueryResponse } from "./types";

export const MOCK_RAG_SEARCH: QueryResponse = {
  intent: "RAG_SEARCH",
  query: "Give me all current affairs questions",
  data: {
    intent: "RAG_SEARCH",
    search_query: "recently launched summit budget g20 brics",
    total: 2,
    results: [
      {
        q_id: "2025_Q15",
        year: 2025,
        q_number: 15,
        source_file: "APSC_2025.pdf",
        question_text:
          "During the 17th BRICS Summit held in Rio de Janeiro, Brazil in 2025, Prime Minister of India, Narendra Modi, made certain suggestions as listed below:",
        statements: [
          "Making the supply chain of critical minerals secure and resilient",
          "Promoting responsible use of AI",
          "Establishing a unified BRICS military force for regional security",
          "Setting up a science and research repository",
        ],
        options: [
          "1, 2 and 3",
          "1, 3 and 4",
          "1, 2 and 4",
          "2, 3 and 4",
        ],
        similarity_score: 0.82,
        distance: 0.18,
      },
      {
        q_id: "2024_Q22",
        year: 2024,
        q_number: 22,
        source_file: "APSC_2024.pdf",
        question_text:
          "Which of the following statements about the G20 Summit 2024 are correct?",
        statements: [
          "India hosted the G20 Summit in 2023",
          "Brazil hosted it in 2024",
          "The theme focused on sustainable development",
        ],
        options: ["1 and 2", "2 and 3", "1 and 3", "All of the above"],
        similarity_score: 0.71,
        distance: 0.29,
      },
    ],
  },
};

export const MOCK_SPECIFIC_QA: QueryResponse = {
  intent: "SPECIFIC_QA",
  query: "Explain Q7 of 2023 paper",
  data: {
    intent: "SPECIFIC_QA",
    query: "Explain Q7 of 2023 paper",
    result: {
      q_id: "2023_Q7",
      year: 2023,
      q_number: 7,
      source_file: "APSC_2023.pdf",
      question_text:
        "Consider the following statements regarding the Indian Constitution:",
      statements: [
        "The Preamble is part of the Constitution",
        "Article 21 includes the right to privacy",
        "Directive Principles are justiciable",
      ],
      options: ["1 and 2", "2 and 3", "1 and 3", "All of the above"],
      explanation:
        "**Correct Answer: (A) 1 and 2**\n\n1. ✅ **Statement 1 is correct** — The Preamble is part of the Constitution (Kesavananda Bharati case, 1973).\n\n2. ✅ **Statement 2 is correct** — The right to privacy is a fundamental right under Article 21 (K.S. Puttaswamy case, 2017).\n\n3. ❌ **Statement 3 is incorrect** — Directive Principles of State Policy (Part IV) are NOT justiciable. They are non-enforceable in courts.",
    },
  },
};

export const MOCK_LATEST_NEWS: QueryResponse = {
  intent: "LATEST_NEWS",
  query: "latest news of today",
  data: {
    intent: "LATEST_NEWS",
    query: "latest news of today",
    summary:
      "Today's key developments include the RBI's decision to hold the repo rate steady, India's record wheat export figures, and a new climate agreement signed at the UNFCCC summit.",
    news: [
      {
        title: "RBI keeps repo rate unchanged at 6.5%",
        url: "https://www.thehindu.com/business/rbi-repo-rate",
        category: "National",
        why_it_matters:
          "Affects loan EMIs, inflation trajectory, and economic growth outlook.",
        published_date: "2025-10-12",
        source: "thehindu.com",
      },
      {
        title: "India signs climate finance pact at UNFCCC",
        url: "https://www.indianexpress.com/climate-pact",
        category: "Environment",
        why_it_matters:
          "Boosts India's green transition funding and COP commitments.",
        published_date: "2025-10-12",
        source: "indianexpress.com",
      },
    ],
  },
};

export const MOCK_GENERAL_CHAT: QueryResponse = {
  intent: "GENERAL_CHAT",
  query: "hi",
  data: {
    intent: "GENERAL_CHAT",
    query: "hi",
    answer:
      "Hello! 👋 I'm Chronicle, your AI assistant for APSC exam prep. You can ask me for previous year questions like *'Give me all polity questions'*, or ask me to explain any question like *'Explain Q7 of 2023 paper'*. You can also ask for latest news or just chat with me!",
  },
};

export function getMockResponse(query: string): QueryResponse {
  const q = query.toLowerCase();
  if (q.includes("explain") || q.includes("q7") || q.includes("solve")) {
    return MOCK_SPECIFIC_QA;
  }
  if (q.includes("news") || q.includes("current affairs")) {
    return MOCK_LATEST_NEWS;
  }
  if (q.includes("question") || q.includes("polity") || q.includes("history")) {
    return MOCK_RAG_SEARCH;
  }
  return MOCK_GENERAL_CHAT;
}