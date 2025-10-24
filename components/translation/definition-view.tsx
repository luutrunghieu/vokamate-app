import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { WordDefinition } from "@/types/translation";
import { VocabularyFolder } from "@/types/vocabulary";
import BottomSheet from "@gorhom/bottom-sheet";
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

export function DefinitionView({ definition, onSaveToFolder, onPlayPronunciation }: DefinitionViewProps) {
  const cardBg = useThemeColor({}, "card");
  const textSecondary = useThemeColor({}, "textSecondary");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | null>(null);

  const handleSaveClick = (definitionId: string) => {
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

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <WordHeader
            word={definition.word}
            pronunciation={definition.pronunciation}
            onPlayPronunciation={onPlayPronunciation}
          />

          {definition.definitions.length > 0 ? (
            definition.definitions.map((def, idx) => (
              <DefinitionItem key={def.id} definition={def} index={idx} onSave={handleSaveClick} />
            ))
          ) : (
            <ThemedText style={[styles.emptyText, { color: textSecondary }]}>Không tìm thấy định nghĩa</ThemedText>
          )}
        </View>
      </ScrollView>

      <FolderSelectionSheet ref={bottomSheetRef} onSelectFolder={handleFolderSelect} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
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
  },
});
