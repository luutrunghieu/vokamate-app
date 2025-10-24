import { ThemedText } from "@/components/themed-text";
import { WordDefinition } from "@/types/translation";
import { ScrollView, StyleSheet, View } from "react-native";
import { DefinitionItem } from "./definition-item";
import { WordHeader } from "./word-header";

interface DefinitionViewProps {
  definition: WordDefinition;
  onToggleSave: (definitionId: string) => void;
  onPlayPronunciation?: (accent: "us" | "uk") => void;
}

export function DefinitionView({ definition, onToggleSave, onPlayPronunciation }: DefinitionViewProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <WordHeader
          word={definition.word}
          pronunciation={definition.pronunciation}
          onPlayPronunciation={onPlayPronunciation}
        />

        {definition.definitions.length > 0 ? (
          definition.definitions.map((def, idx) => (
            <DefinitionItem key={def.id} definition={def} index={idx} onToggleSave={onToggleSave} />
          ))
        ) : (
          <ThemedText style={styles.emptyText}>Không tìm thấy định nghĩa</ThemedText>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#666",
  },
});
