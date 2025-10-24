import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { DefinitionView } from "@/components/translation/definition-view";
import { HistoryList } from "@/components/translation/history-list";
import { SearchInput } from "@/components/translation/search-input";
import { SuggestionsList } from "@/components/translation/suggestions-list";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTranslation } from "@/hooks/use-translation";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TranslateScreen() {
  const {
    searchText,
    setSearchText,
    history,
    currentDefinition,
    suggestions,
    translate,
    goBack,
    toggleSaveDefinition,
    clearHistory,
    selectHistoryItem,
    selectSuggestion,
  } = useTranslation();

  const handlePlayPronunciation = (accent: "us" | "uk") => {
    // TODO: Implement pronunciation playback
    console.log(`Playing ${accent.toUpperCase()} pronunciation`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Dịch</ThemedText>
          <TouchableOpacity style={styles.settingsButton}>
            <IconSymbol name="slider.horizontal.3" size={24} color="#E0E0E0" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.content}>
          <SearchInput value={searchText} onChangeText={setSearchText} onSubmit={() => translate()} />

          {searchText.trim() === "" ? (
            <HistoryList data={history} onClearHistory={clearHistory} onItemPress={selectHistoryItem} />
          ) : currentDefinition ? (
            <DefinitionView
              definition={currentDefinition}
              onToggleSave={toggleSaveDefinition}
              onPlayPronunciation={handlePlayPronunciation}
            />
          ) : (
            <SuggestionsList suggestions={suggestions} onSelectSuggestion={selectSuggestion} />
          )}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: "#FFFFFF",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
});
