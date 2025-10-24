import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyFolder } from "@/types/vocabulary";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FolderSelectionSheetProps {
  onSelectFolder: (folder: VocabularyFolder) => void;
}

export const FolderSelectionSheet = forwardRef<BottomSheet, FolderSelectionSheetProps>(({ onSelectFolder }, ref) => {
  const { folders } = useVocabulary();
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");
  const backgroundTertiary = useThemeColor({}, "backgroundTertiary");
  const [selectedFolder, setSelectedFolder] = useState<VocabularyFolder | null>(null);
  const insets = useSafeAreaInsets();

  // Calculate height based on number of folders
  // Each folder item is ~65px + header (80px) + footer (80px) + safe area bottom
  const contentHeight = useMemo(() => {
    const itemHeight = 65;
    const headerHeight = 80;
    const footerHeight = 80;
    const maxVisibleItems = 6;
    const visibleItems = Math.min(folders.length, maxVisibleItems);
    const calculatedHeight = headerHeight + visibleItems * itemHeight + footerHeight + insets.bottom;
    return calculatedHeight;
  }, [folders.length, insets.bottom]);

  const snapPoints = useMemo(() => [contentHeight], [contentHeight]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        style={[props.style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
      />
    ),
    []
  );

  const handleFolderPress = (folder: VocabularyFolder) => {
    setSelectedFolder(folder);
  };

  const handleSave = () => {
    if (selectedFolder) {
      onSelectFolder(selectedFolder);
      setSelectedFolder(null);
    }
  };

  return (
    <BottomSheet
      ref={(r) => {
        if (r && ref) {
          if (typeof ref === "function") {
            ref(r);
          } else {
            (ref as any).current = r;
          }
        }
      }}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: borderColor }}
      style={{ backgroundColor }}
      onChange={(index) => {
        if (index === -1) {
          setSelectedFolder(null);
        }
      }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: textColor }]}>Lưu từ vựng</ThemedText>
        </View>

        <ThemedText style={[styles.subtitle, { color: textSecondary }]}>Chọn bộ từ bạn muốn lưu vào</ThemedText>

        <BottomSheetScrollView
          style={styles.folderList}
          contentContainerStyle={styles.folderListContent}
          showsVerticalScrollIndicator={false}
        >
          {folders.map((folder) => {
            const isSelected = selectedFolder?.id === folder.id;
            return (
              <TouchableOpacity
                key={folder.id}
                style={[styles.folderItem, { borderBottomColor: borderColor }]}
                onPress={() => handleFolderPress(folder)}
                activeOpacity={0.7}
              >
                <View style={styles.checkboxContainer}>
                  {isSelected ? (
                    <View style={[styles.checkbox, styles.checkboxSelected, { backgroundColor: tint }]}>
                      <IconSymbol name="checkmark" size={16} color="#fff" />
                    </View>
                  ) : (
                    <View style={[styles.checkbox, { borderColor }]} />
                  )}
                </View>

                <View style={[styles.folderIcon, { backgroundColor: folder.color }]}>
                  <IconSymbol name="book.fill" size={18} color="#fff" />
                </View>

                <View style={styles.folderInfo}>
                  <ThemedText style={[styles.folderName, { color: textColor }]}>{folder.name}</ThemedText>
                  <ThemedText style={[styles.wordCount, { color: textSecondary }]}>{folder.wordCount} từ</ThemedText>
                </View>
              </TouchableOpacity>
            );
          })}
        </BottomSheetScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: selectedFolder ? tint : backgroundTertiary,
                opacity: selectedFolder ? 1 : 0.6,
              },
            ]}
            onPress={selectedFolder ? handleSave : undefined}
            disabled={!selectedFolder}
            activeOpacity={selectedFolder ? 0.8 : 1}
          >
            <IconSymbol name="checkmark" size={20} color="#fff" />
            <ThemedText style={[styles.saveButtonText, { opacity: selectedFolder ? 1 : 0.7 }]}>Lưu từ này</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
});

FolderSelectionSheet.displayName = "FolderSelectionSheet";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  folderList: {
    maxHeight: 400,
  },
  folderListContent: {
    flexGrow: 0,
  },
  folderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  checkboxContainer: {
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderWidth: 0,
  },
  folderIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  wordCount: {
    fontSize: 13,
  },
  footer: {
    paddingTop: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
