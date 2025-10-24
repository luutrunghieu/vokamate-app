import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface SuggestionsListProps {
  suggestions: string[];
  onSelectSuggestion: (word: string) => void;
}

export function SuggestionsList({ suggestions, onSelectSuggestion }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.suggestionItem} onPress={() => onSelectSuggestion(item)}>
            <ThemedText style={styles.suggestionText}>{item}</ThemedText>
            <ThemedText style={styles.arrow}>→</ThemedText>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  suggestionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  suggestionText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  arrow: {
    fontSize: 16,
    color: "#3A3A3C",
  },
  separator: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginLeft: 20,
  },
});
