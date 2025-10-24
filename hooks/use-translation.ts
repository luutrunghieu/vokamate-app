import { SAMPLE_DEFINITIONS, SAMPLE_HISTORY, WORD_LIST } from "@/constants/sample-data";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { HistoryItem, WordDefinition } from "@/types/translation";
import { VocabularyFolder } from "@/types/vocabulary";
import { useMemo, useState } from "react";

export function useTranslation() {
  const { addWordToFolder } = useVocabulary();
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
    saveDefinitionToFolder,
    clearHistory,
    selectHistoryItem,
    selectSuggestion,
  };
}
