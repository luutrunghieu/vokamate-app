export interface VocabularyFolder {
  id: string;
  name: string;
  color: string;
  wordCount: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  folderId: string;
  createdAt: Date;
}
