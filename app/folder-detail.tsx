import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WordListItem } from "@/components/vocabulary";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyWord } from "@/types/vocabulary";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FolderDetailScreen() {
  const { folderId } = useLocalSearchParams<{ folderId: string }>();
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textSecondary = useThemeColor({}, "textSecondary");

  const { folders, words: allWords, getWordsByFolder, deleteWord } = useVocabulary();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [folder, setFolder] = useState(folders.find((f) => f.id === folderId));

  useEffect(() => {
    if (folderId) {
      const folderData = folders.find((f) => f.id === folderId);
      setFolder(folderData);
      const folderWords = getWordsByFolder(folderId);
      setWords(folderWords);
    }
  }, [folderId, folders, allWords]);

  const handleDeleteWord = async (id: string) => {
    await deleteWord(id);
  };

  if (!folder) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <Stack.Screen
          options={{
            title: "Thư mục không tồn tại",
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <ThemedText>Thư mục không tồn tại</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: folder.name,
          headerShown: true,
          headerBackTitle: "Quay lại",
        }}
      />
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.colorBadge, { backgroundColor: folder.color }]} />
          <View style={styles.headerInfo}>
            <ThemedText type="title" style={styles.folderName}>
              {folder.name}
            </ThemedText>
            <View style={styles.stats}>
              <Ionicons name="book-outline" size={16} color={textSecondary} />
              <ThemedText style={[styles.statsText, { color: textSecondary }]}>{words.length} từ</ThemedText>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {words.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconContainer, { backgroundColor: tintColor + "15" }]}>
                <Ionicons name="book-outline" size={64} color={tintColor} />
              </View>
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                Chưa có từ vựng nào
              </ThemedText>
              <ThemedText style={[styles.emptyDescription, { color: textSecondary }]}>
                Lưu từ vựng từ tính năng dịch để thêm vào thư mục này
              </ThemedText>
            </View>
          ) : (
            words.map((word) => <WordListItem key={word.id} word={word} onDelete={() => handleDeleteWord(word.id)} />)
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  colorBadge: {
    width: 12,
    height: 48,
    borderRadius: 6,
  },
  headerInfo: {
    flex: 1,
  },
  folderName: {
    marginBottom: 6,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statsText: {
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
