import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Definition } from "@/types/translation";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface DefinitionItemProps {
  definition: Definition;
  index: number;
  onSave: (definitionId: string) => void;
}

export function DefinitionItem({ definition, index, onSave }: DefinitionItemProps) {
  const borderColor = useThemeColor({}, "border");
  const bgSecondary = useThemeColor({}, "backgroundSecondary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const tintColor = useThemeColor({}, "tint");
  const successColor = useThemeColor({}, "success");
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <View style={styles.header}>
        <View style={[styles.numberContainer, { backgroundColor: bgSecondary }]}>
          <ThemedText style={[styles.number, { color: textSecondary }]}>{index + 1}</ThemedText>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.word, { color: tintColor }]}>{definition.word}</ThemedText>
          <ThemedText style={[styles.type, { backgroundColor: bgSecondary, color: textSecondary }]}>
            {definition.wordType}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.meaning}>{definition.meaning}</ThemedText>

      {definition.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          {definition.examples.map((example, idx) => (
            <ThemedText key={idx} style={[styles.exampleText, { color: textSecondary }]}>
              {example}
            </ThemedText>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: bgSecondary },
          definition.saved && { backgroundColor: successColor + "20" },
        ]}
        onPress={() => onSave(definition.id)}
        disabled={definition.saved}
      >
        <IconSymbol
          name={definition.saved ? "bookmark.fill" : "bookmark"}
          size={16}
          color={definition.saved ? successColor : iconColor}
        />
        <ThemedText
          style={[styles.saveButtonText, { color: textSecondary }, definition.saved && { color: successColor }]}
        >
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
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "700",
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
  },
  type: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  meaning: {
    fontSize: 16,
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
    lineHeight: 22,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    marginLeft: 40,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
