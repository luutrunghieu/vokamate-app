import { VocabularyFolder, VocabularyWord } from "@/types/vocabulary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface VocabularyContextType {
  folders: VocabularyFolder[];
  words: VocabularyWord[];
  addFolder: (name: string, color: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  updateFolder: (id: string, updates: Partial<VocabularyFolder>) => Promise<void>;
  addWordToFolder: (folderId: string, word: string, translation: string) => Promise<void>;
  getWordsByFolder: (folderId: string) => VocabularyWord[];
  deleteWord: (id: string) => Promise<void>;
  updateWord: (id: string, updates: Partial<VocabularyWord>) => Promise<void>;
  isLoading: boolean;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

const STORAGE_KEY = "@vokamate_folders";
const WORDS_STORAGE_KEY = "@vokamate_words";

const DEFAULT_FOLDER: VocabularyFolder = {
  id: "default",
  name: "Từ vựng của tôi",
  color: "#3b82f6",
  wordCount: 0,
  isDefault: true,
  createdAt: new Date(),
};

export function VocabularyProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<VocabularyFolder[]>([DEFAULT_FOLDER]);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFolders();
    loadWords();
  }, []);

  const loadFolders = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const foldersWithDates = parsed.map((folder: any) => ({
          ...folder,
          createdAt: new Date(folder.createdAt),
        }));

        // Ensure default folder exists
        const hasDefault = foldersWithDates.some((f: VocabularyFolder) => f.isDefault);
        if (!hasDefault) {
          setFolders([DEFAULT_FOLDER, ...foldersWithDates]);
        } else {
          setFolders(foldersWithDates);
        }
      } else {
        setFolders([DEFAULT_FOLDER]);
      }
    } catch (error) {
      console.error("Error loading folders:", error);
      setFolders([DEFAULT_FOLDER]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadWords = async () => {
    try {
      const storedData = await AsyncStorage.getItem(WORDS_STORAGE_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const wordsWithDates = parsed.map((word: any) => ({
          ...word,
          createdAt: new Date(word.createdAt),
        }));
        setWords(wordsWithDates);
      }
    } catch (error) {
      console.error("Error loading words:", error);
    }
  };

  const saveFolders = async (newFolders: VocabularyFolder[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFolders));
    } catch (error) {
      console.error("Error saving folders:", error);
    }
  };

  const saveWords = async (newWords: VocabularyWord[]) => {
    try {
      await AsyncStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(newWords));
    } catch (error) {
      console.error("Error saving words:", error);
    }
  };

  const addFolder = async (name: string, color: string) => {
    const newFolder: VocabularyFolder = {
      id: Date.now().toString(),
      name,
      color,
      wordCount: 0,
      isDefault: false,
      createdAt: new Date(),
    };
    const newFolders = [...folders, newFolder];
    setFolders(newFolders);
    await saveFolders(newFolders);
  };

  const deleteFolder = async (id: string) => {
    // Cannot delete default folder
    if (folders.find((f) => f.id === id)?.isDefault) {
      return;
    }
    const newFolders = folders.filter((f) => f.id !== id);
    setFolders(newFolders);
    await saveFolders(newFolders);
  };

  const updateFolder = async (id: string, updates: Partial<VocabularyFolder>) => {
    const newFolders = folders.map((f) => (f.id === id ? { ...f, ...updates } : f));
    setFolders(newFolders);
    await saveFolders(newFolders);
  };

  const addWordToFolder = async (folderId: string, word: string, translation: string) => {
    const newWord: VocabularyWord = {
      id: Date.now().toString(),
      word,
      translation,
      folderId,
      createdAt: new Date(),
    };

    const newWords = [...words, newWord];
    setWords(newWords);
    await saveWords(newWords);

    // Update folder word count
    const folderWordsCount = newWords.filter((w) => w.folderId === folderId).length;
    await updateFolder(folderId, { wordCount: folderWordsCount });
  };

  const getWordsByFolder = (folderId: string) => {
    return words.filter((w) => w.folderId === folderId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const deleteWord = async (id: string) => {
    const word = words.find((w) => w.id === id);
    if (!word) return;

    const newWords = words.filter((w) => w.id !== id);
    setWords(newWords);
    await saveWords(newWords);

    // Update folder word count
    const folderWordsCount = newWords.filter((w) => w.folderId === word.folderId).length;
    await updateFolder(word.folderId, { wordCount: folderWordsCount });
  };

  const updateWord = async (id: string, updates: Partial<VocabularyWord>) => {
    const newWords = words.map((w) => (w.id === id ? { ...w, ...updates } : w));
    setWords(newWords);
    await saveWords(newWords);
  };

  return (
    <VocabularyContext.Provider
      value={{
        folders,
        words,
        addFolder,
        deleteFolder,
        updateFolder,
        addWordToFolder,
        getWordsByFolder,
        deleteWord,
        updateWord,
        isLoading,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabulary() {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error("useVocabulary must be used within VocabularyProvider");
  }
  return context;
}
