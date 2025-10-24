export interface Definition {
  id: string;
  word: string;
  wordType: string;
  meaning: string;
  examples: string[];
  examplesVi: string[];
  saved: boolean;
}

export interface WordDefinition {
  word: string;
  pronunciation: string;
  definitions: Definition[];
}

export interface HistoryItem {
  id: string;
  word: string;
}
