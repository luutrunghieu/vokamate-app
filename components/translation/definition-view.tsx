import { ThemedText } from "@/components/themed-text";
import { tailwindColors } from "@/constants/tailwind-colors";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { WordDefinition } from "@/types/translation";
import { VocabularyFolder } from "@/types/vocabulary";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DefinitionItem } from "./definition-item";
import { FolderSelectionSheet } from "./folder-selection-sheet";
import { WordHeader } from "./word-header";

interface DefinitionViewProps {
  definition: WordDefinition;
  onSaveToFolder: (definitionId: string, folder: VocabularyFolder) => void;
  onPlayPronunciation?: (accent: "us" | "uk") => void;
}

export function DefinitionView({
  definition,
  onSaveToFolder,
  onPlayPronunciation,
}: DefinitionViewProps) {
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "outlineSecondary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | null>(null);
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  const handleSaveClick = (definitionId: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setSelectedDefinitionId(definitionId);
    bottomSheetRef.current?.expand();
  };

  const handleFolderSelect = (folder: VocabularyFolder) => {
    if (selectedDefinitionId) {
      onSaveToFolder(selectedDefinitionId, folder);
    }
    bottomSheetRef.current?.close();
    setSelectedDefinitionId(null);
  };

  // Normalize pronunciation to object format
  const pronunciation =
    typeof definition.pronunciation === "string"
      ? { us: definition.pronunciation, uk: definition.pronunciation }
      : definition.pronunciation;

  // Sort definitions by popularity (higher first), then by index for those without popularity
  const sortedDefinitions = [...definition.definitions].sort((a, b) => {
    const aPopularity = a.popularity ?? 0;
    const bPopularity = b.popularity ?? 0;
    return bPopularity - aPopularity; // Descending order (higher first)
  });

  const backgroundColor = tailwindColors.slate?.[100] || "#f2f4f7";

  return (
    <>
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          bounces={true}
        >
          <View style={[styles.headerCard, { backgroundColor: cardBg, borderColor: borderColor }]}>
            <WordHeader
              word={definition.word}
              pronunciation={pronunciation}
              onPlayPronunciation={onPlayPronunciation}
            />
          </View>

          <View
            style={[
              styles.definitionsCard,
              { backgroundColor: cardBg, borderColor: borderColor, marginTop: 12 },
            ]}
          >
            {sortedDefinitions.length > 0 ? (
              sortedDefinitions.map((def, idx) => (
                <DefinitionItem
                  key={def.id}
                  definition={def}
                  index={idx}
                  onSave={handleSaveClick}
                  isLast={idx === sortedDefinitions.length - 1}
                />
              ))
            ) : (
              <ThemedText style={[styles.emptyText, { color: textSecondary }]}>
                Không tìm thấy định nghĩa
              </ThemedText>
            )}
          </View>
        </ScrollView>
        <LinearGradient
          colors={["#f2f4f7", "rgba(242, 244, 247, 0)"]}
          style={styles.topGradient}
          pointerEvents="none"
        />
      </View>

      <FolderSelectionSheet ref={bottomSheetRef} onSelectFolder={handleFolderSelect} />
    </>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 16,
    zIndex: 1,
  },
  headerCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  definitionsCard: {
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
