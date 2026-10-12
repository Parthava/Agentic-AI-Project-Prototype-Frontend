export type Intent =
  | "RAG_SEARCH"
  | "SPECIFIC_QA"
  | "LATEST_NEWS"
  | "GENERAL_CHAT";

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
  explanation?: string;
}

export interface NewsItem {
  title: string;
  url: string;
  category?: string;
  why_it_matters?: string;
  published_date?: string;
  source?: string;
  content?: string;
}

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

export interface QueryResponse {
  intent: Intent;
  query: string;
  data: IntentData;
}

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