import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { tailwindColors } from "@/constants/tailwind-colors";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BookmarkSolid } from "@/src/components/Icons";
import { Definition } from "@/types/translation";
import { StyleSheet, View } from "react-native";

interface DefinitionItemProps {
  definition: Definition;
  index: number;
  onSave: (definitionId: string) => void;
  isLast?: boolean;
}

// Helper function to get part of speech color
function getPartOfSpeechColor(partOfSpeech: string): string {
  const pos = partOfSpeech.toLowerCase().trim();

  // Map Vietnamese part of speech to Tailwind colors
  if (pos === "danh từ" || pos === "noun") {
    return tailwindColors.sky[500];
  }
  if (pos === "động từ" || pos === "verb") {
    return tailwindColors.orange[500];
  }
  if (pos === "cụm động từ" || pos === "phrasal verb") {
    return tailwindColors.orange[500];
  }
  if (pos === "tính từ" || pos === "adjective") {
    return tailwindColors.indigo[500];
  }
  if (pos === "trạng từ" || pos === "adverb") {
    return tailwindColors.teal[500];
  }
  if (pos === "thành ngữ" || pos === "idiom") {
    return tailwindColors.pink[500];
  }
  if (
    pos === "đại từ" ||
    pos === "pronoun" ||
    pos === "giới từ" ||
    pos === "preposition" ||
    pos === "liên từ" ||
    pos === "conjunction" ||
    pos === "từ hạn định" ||
    pos === "determiner"
  ) {
    return tailwindColors.sky[500];
  }
  if (pos === "thán từ" || pos === "interjection" || pos === "mạo từ") {
    return tailwindColors.slate[500];
  }

  // Default gray for undefined part of speech
  return tailwindColors.gray[400];
}

export function DefinitionItem({ definition, index, onSave, isLast }: DefinitionItemProps) {
  const borderColor = useThemeColor({}, "outlineSecondary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textPrimary = useThemeColor({}, "textPrimary");
  const partOfSpeechColor = getPartOfSpeechColor(definition.wordType);

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: borderColor, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.textContent}>
          <View style={styles.titleRow}>
            <ThemedText style={[styles.vietnameseTranslations, { color: textPrimary }]}>
              {definition.word}
            </ThemedText>
            <ThemedText style={[styles.partOfSpeech, { color: partOfSpeechColor }]}>
              {definition.wordType}
            </ThemedText>
          </View>
          <ThemedText style={[styles.definition, { color: textSecondary }]}>
            {definition.meaning}
          </ThemedText>
        </View>
        <Button
          variant="tertiary"
          width="hug"
          leadingIcon={<BookmarkSolid width={20} height={20} color={textPrimary} />}
          onPress={() => onSave(definition.id)}
          disabled={definition.saved}
        >
          Lưu
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  contentRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  textContent: {
    flex: 1,
    gap: 10,
  },
  titleRow: {
    flexDirection: "column",
    gap: 2,
  },
  vietnameseTranslations: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
  partOfSpeech: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  definition: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
