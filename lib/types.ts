// ============================================================
// Intent types
// ============================================================
export type Intent =
  | "RAG_SEARCH"
  | "SPECIFIC_QA"
  | "LATEST_NEWS"
  | "GENERAL_CHAT";

// ============================================================
// Match-the-following support
// ============================================================
export interface MatchItem {
  key: string;    // "a", "b", "c", "d" ya "1", "2", "3", "4"
  value: string;  // "Rock-cut temple", "Joysagar", etc.
}

// ============================================================
// MCQ Result — RAG_SEARCH aur SPECIFIC_QA for both
// ============================================================
export interface MCQResult {
  q_id: string;
  year: number;
  q_number: number;
  source_file: string;
  question_text: string;
  statements: string[];
  options: string[];
  similarity_score?: number;
  distance?: number;

  // SPECIFIC_QA ke liye extra field
  explanation?: string;

  // 🆕 Match-the-following support (comes from backend or frontend)
  is_match?: boolean;
  left_items?: MatchItem[];
  right_items?: MatchItem[];
}

// ============================================================
// News item — LATEST_NEWS
// ============================================================
export interface NewsItem {
  title: string;
  url: string;
  category?: string;
  why_it_matters?: string;
  published_date?: string;
  source?: string;
  content?: string;
}

// ============================================================
// Intent-specific data payloads
// ============================================================
export interface RagSearchData {
  intent: "RAG_SEARCH";
  search_query: string;
  total: number;
  results: MCQResult[];
}

export interface SpecificQaData {
  intent: "SPECIFIC_QA";
  query: string;
  result?: MCQResult;
  error?: string;
}

export interface LatestNewsData {
  intent: "LATEST_NEWS";
  query: string;
  summary: string;
  news: NewsItem[];
}

export interface GeneralChatData {
  intent: "GENERAL_CHAT";
  query: string;
  answer: string;
}

export type IntentData =
  | RagSearchData
  | SpecificQaData
  | LatestNewsData
  | GeneralChatData;

// ============================================================
// API Response shape — /query endpoint ka response
// ============================================================
export interface QueryResponse {
  intent: Intent;
  query: string;
  data: IntentData;
}

// ============================================================
// Chat UI types
// ============================================================
export type ChatRole = "user" | "assistant";

export interface ChatMessageType {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  response?: QueryResponse;
  loading?: boolean;
  error?: boolean;
}