import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Definition } from "@/types/translation";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface DefinitionItemProps {
  definition: Definition;
  index: number;
  onToggleSave: (definitionId: string) => void;
}

export function DefinitionItem({ definition, index, onToggleSave }: DefinitionItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.numberContainer}>
          <ThemedText style={styles.number}>{index + 1}</ThemedText>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.word}>{definition.word}</ThemedText>
          <ThemedText style={styles.type}>{definition.wordType}</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.meaning}>{definition.meaning}</ThemedText>

      {definition.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          {definition.examples.map((example, idx) => (
            <ThemedText key={idx} style={styles.exampleText}>
              {example}
            </ThemedText>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.saveButton, definition.saved && styles.saveButtonActive]}
        onPress={() => onToggleSave(definition.id)}
      >
        <IconSymbol
          name={definition.saved ? "bookmark.fill" : "bookmark"}
          size={16}
          color={definition.saved ? "#4CAF50" : "#666"}
        />
        <ThemedText style={[styles.saveButtonText, definition.saved && styles.saveButtonTextActive]}>
          {definition.saved ? "Đã lưu" : "Lưu từ này"}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  numberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "700",
    color: "#888",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  word: {
    fontSize: 19,
    fontWeight: "600",
    color: "#4A9EFF",
  },
  type: {
    fontSize: 12,
    color: "#A0A0A0",
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    overflow: "hidden",
  },
  meaning: {
    fontSize: 16,
    color: "#C0C0C0",
    lineHeight: 24,
    marginBottom: 14,
    paddingLeft: 40,
  },
  examplesContainer: {
    paddingLeft: 40,
    marginBottom: 16,
    gap: 10,
  },
  exampleText: {
    fontSize: 15,
    color: "#888",
    lineHeight: 22,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
    gap: 8,
    marginLeft: 40,
  },
  saveButtonActive: {
    backgroundColor: "#1A3A2A",
  },
  saveButtonText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  saveButtonTextActive: {
    color: "#4CAF50",
  },
});
