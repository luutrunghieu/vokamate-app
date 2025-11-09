import { useVocabulary } from "@/contexts/vocabulary-context";
import { supabase } from "@/lib/supabase";
import { HistoryItem, WordDefinition, Definition } from "@/types/translation";
import { VocabularyFolder } from "@/types/vocabulary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HISTORY_STORAGE_KEY = "translation_history";
const SOURCE_LANGUAGE = "en";
const TARGET_LANGUAGE = "vi";

// Helper function to map part of speech from English to Vietnamese
function mapPartOfSpeech(partOfSpeech: string[]): string {
  const pos = partOfSpeech[0]?.toLowerCase() || "";
  if (pos === "noun") return "danh từ";
  if (pos === "verb") return "động từ";
  if (pos === "adjective") return "tính từ";
  if (pos === "adverb") return "trạng từ";
  if (pos === "preposition") return "giới từ";
  if (pos === "determiner") return "mạo từ";
  return "danh từ"; // Default
}

// Load history from AsyncStorage
async function loadHistory(): Promise<HistoryItem[]> {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    if (historyJson) {
      return JSON.parse(historyJson);
    }
  } catch (error) {
    console.error("Failed to load history:", error);
  }
  return [];
}

// Save history to AsyncStorage
async function saveHistory(history: HistoryItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save history:", error);
  }
}

// Add word to history
async function addToHistory(word: string): Promise<void> {
  const history = await loadHistory();
  const existingIndex = history.findIndex((item) => item.word.toLowerCase() === word.toLowerCase());
  
  if (existingIndex >= 0) {
    // Remove existing entry
    history.splice(existingIndex, 1);
  }
  
  // Add to beginning
  const newItem: HistoryItem = {
    id: Date.now().toString(),
    word: word,
  };
  history.unshift(newItem);
  
  // Keep only last 50 items
  const trimmedHistory = history.slice(0, 50);
  await saveHistory(trimmedHistory);
}

export function useTranslation() {
  const { addWordToFolder } = useVocabulary();
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentDefinition, setCurrentDefinition] = useState<WordDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load history on mount
  useEffect(() => {
    loadHistory().then(setHistory);
  }, []);

  // Get word suggestions based on search text
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchText.trim()) {
        setSuggestions([]);
        return;
      }

      const lowerSearchText = searchText.toLowerCase().trim();
      try {
        const { data, error } = await supabase
          .from("words")
          .select("text")
          .eq("language_code", SOURCE_LANGUAGE)
          .ilike("text", `${lowerSearchText}%`)
          .limit(10)
          .order("text", { ascending: true });

        if (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
          return;
        }

        const words = data?.map((item) => item.text) || [];
        setSuggestions(words);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  // Custom setSearchText that clears definition if text doesn't match
  const handleSetSearchText = (text: string) => {
    setSearchText(text);
    // Clear definition if the search text doesn't match the current definition's word
    if (currentDefinition && text.toLowerCase().trim() !== currentDefinition.word.toLowerCase()) {
      setCurrentDefinition(null);
    }
  };

  // Fetch word definition from Supabase
  const translate = async (word?: string) => {
    const wordToTranslate = word || searchText.trim();
    if (!wordToTranslate) return;

    setIsLoading(true);
    try {
      const wordText = wordToTranslate.toLowerCase();

      // Fetch word
      const { data: wordData, error: wordError } = await supabase
        .from("words")
        .select("id, text")
        .eq("text", wordText)
        .eq("language_code", SOURCE_LANGUAGE)
        .single();

      if (wordError || !wordData) {
        // Word not found
        setCurrentDefinition({
          word: wordToTranslate,
          pronunciation: "",
          definitions: [],
        });
        setIsLoading(false);
        return;
      }

      // Fetch pronunciations
      const { data: pronunciationsData } = await supabase
        .from("pronunciations")
        .select("accent, phonetic")
        .eq("word_id", wordData.id);

      // Map pronunciations
      const pronunciations: { us?: string; uk?: string } = {};
      if (pronunciationsData && Array.isArray(pronunciationsData)) {
        pronunciationsData.forEach((pron) => {
          if (pron.accent === "us") {
            pronunciations.us = pron.phonetic;
          } else if (pron.accent === "uk") {
            pronunciations.uk = pron.phonetic;
          }
        });
      }

      // Fetch translations
      const { data: translationsData } = await supabase
        .from("translations")
        .select(
          "id, part_of_speech, target_words, definition_source, definition_target, example_source, example_target, sense_label, popularity"
        )
        .eq("source_word_id", wordData.id)
        .eq("target_language_code", TARGET_LANGUAGE)
        .order("popularity", { ascending: false });

      // Map translations to definitions
      const definitions: Definition[] = [];
      if (translationsData && Array.isArray(translationsData)) {
        definitions.push(
          ...translationsData.map((trans) => ({
            id: trans.id,
            word: Array.isArray(trans.target_words) ? trans.target_words.join(", ") : trans.target_words || "",
            wordType: mapPartOfSpeech(trans.part_of_speech || []),
            meaning: trans.definition_target || "",
            examples: trans.example_source ? [trans.example_source] : [],
            examplesVi: trans.example_target ? [trans.example_target] : [],
            saved: false,
            popularity: trans.popularity || undefined,
          }))
        );
      }

      const definition: WordDefinition = {
        word: wordData.text,
        pronunciation: Object.keys(pronunciations).length > 0 ? pronunciations : "",
        definitions: definitions.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)),
      };

      setCurrentDefinition(definition);

      // Add to history
      await addToHistory(wordToTranslate);
      const updatedHistory = await loadHistory();
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Error fetching translation:", error);
      setCurrentDefinition({
        word: wordToTranslate,
        pronunciation: "",
        definitions: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setCurrentDefinition(null);
    setSearchText("");
  };

  const saveDefinitionToFolder = async (definitionId: string, folder: VocabularyFolder) => {
    if (!currentDefinition) return;

    const definition = currentDefinition.definitions.find((def) => def.id === definitionId);
    if (!definition) return;

    // Save the word to the folder
    await addWordToFolder(folder.id, definition.word, definition.meaning);

    // Mark the definition as saved
    setCurrentDefinition({
      ...currentDefinition,
      definitions: currentDefinition.definitions.map((def) =>
        def.id === definitionId ? { ...def, saved: true } : def
      ),
    });
  };

  const clearHistory = async () => {
    await saveHistory([]);
    setHistory([]);
  };

  const selectHistoryItem = (item: HistoryItem) => {
    setSearchText(item.word);
    translate(item.word);
  };

  const selectSuggestion = (word: string) => {
    setSearchText(word);
    translate(word);
  };

  return {
    searchText,
    setSearchText: handleSetSearchText,
    history,
    currentDefinition,
    suggestions,
    translate,
    goBack,
    saveDefinitionToFolder,
    clearHistory,
    selectHistoryItem,
    selectSuggestion,
  };
}
