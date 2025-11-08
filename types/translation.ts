export interface Definition {
  id: string;
  word: string; // Vietnamese translations (comma-separated)
  wordType: string; // Part of speech in Vietnamese (e.g., "danh từ", "động từ")
  meaning: string; // Definition in Vietnamese
  examples: string[];
  examplesVi: string[];
  saved: boolean;
  popularity?: number; // Popularity score (1-5)
}

export interface WordDefinition {
  word: string;
  pronunciation: {
    us?: string;
    uk?: string;
  } | string; // Support both old string format and new object format
  definitions: Definition[];
}

export interface HistoryItem {
  id: string;
  word: string;
}
