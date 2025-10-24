import { SAMPLE_DEFINITIONS, SAMPLE_HISTORY, WORD_LIST } from "@/constants/sample-data";
import { HistoryItem, WordDefinition } from "@/types/translation";
import { useMemo, useState } from "react";

export function useTranslation() {
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(SAMPLE_HISTORY);
  const [currentDefinition, setCurrentDefinition] = useState<WordDefinition | null>(null);

  // Get word suggestions based on search text
  const suggestions = useMemo(() => {
    if (!searchText.trim()) return [];
    const lowerSearchText = searchText.toLowerCase().trim();
    return WORD_LIST.filter((word) => word.toLowerCase().startsWith(lowerSearchText)).slice(0, 10); // Limit to 10 suggestions
  }, [searchText]);

  // Custom setSearchText that clears definition if text doesn't match
  const handleSetSearchText = (text: string) => {
    setSearchText(text);
    // Clear definition if the search text doesn't match the current definition's word
    if (currentDefinition && text.toLowerCase().trim() !== currentDefinition.word.toLowerCase()) {
      setCurrentDefinition(null);
    }
  };

  const translate = (word?: string) => {
    const wordToTranslate = word || searchText.trim();
    if (!wordToTranslate) return;

    // Simulate API call - in real app, this would fetch from API
    const definition = SAMPLE_DEFINITIONS[wordToTranslate.toLowerCase()];
    if (definition) {
      setCurrentDefinition(definition);
    } else {
      // Handle word not found - could show error or default message
      setCurrentDefinition({
        word: wordToTranslate,
        pronunciation: "",
        definitions: [],
      });
    }
  };

  const goBack = () => {
    setCurrentDefinition(null);
    setSearchText("");
  };

  const toggleSaveDefinition = (definitionId: string) => {
    if (!currentDefinition) return;

    setCurrentDefinition({
      ...currentDefinition,
      definitions: currentDefinition.definitions.map((def) =>
        def.id === definitionId ? { ...def, saved: !def.saved } : def
      ),
    });
  };

  const clearHistory = () => {
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
    toggleSaveDefinition,
    clearHistory,
    selectHistoryItem,
    selectSuggestion,
  };
}
