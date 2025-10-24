import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface SuggestionsListProps {
  suggestions: string[];
  onSelectSuggestion: (word: string) => void;
}

export function SuggestionsList({ suggestions, onSelectSuggestion }: SuggestionsListProps) {
  const textSecondary = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "border");

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
            <ThemedText style={[styles.suggestionText, { color: textSecondary }]}>{item}</ThemedText>
            <ThemedText style={[styles.arrow, { color: borderColor }]}>→</ThemedText>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <ThemedView style={[styles.separator, { backgroundColor: borderColor }]} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  arrow: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    marginLeft: 20,
  },
});
