import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CreateFolderModal, EditFolderModal, FolderCard } from "@/components/vocabulary";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyFolder } from "@/types/vocabulary";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VocabularyScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const { folders, addFolder, updateFolder, deleteFolder, isLoading } = useVocabulary();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<VocabularyFolder | null>(null);

  const handleCreateFolder = async (name: string, color: string) => {
    await addFolder(name, color);
  };

  const handleEditFolder = (folder: VocabularyFolder) => {
    setSelectedFolder(folder);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async (name: string, color: string) => {
    if (selectedFolder) {
      await updateFolder(selectedFolder.id, { name, color });
      setSelectedFolder(null);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    await deleteFolder(id);
  };

  const handleFolderPress = (folderId: string) => {
    router.push({
      pathname: "/folder-detail",
      params: { folderId },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
        </ThemedView>
      </SafeAreaView>
    );
  }

  const textSecondary = useThemeColor({}, "textSecondary");
  const totalWords = folders.reduce((sum, folder) => sum + folder.wordCount, 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={styles.headerTitle}>
              Kho từ vựng
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: textSecondary }]}>
              {folders.length} thư mục • {totalWords} từ
            </ThemedText>
          </View>
          <Pressable
            onPress={() => setCreateModalVisible(true)}
            style={({ pressed }) => [
              styles.addButton,
              { backgroundColor: tintColor },
              pressed && styles.addButtonPressed,
            ]}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {folders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconContainer, { backgroundColor: tintColor + "15" }]}>
                <Ionicons name="folder-open-outline" size={64} color={tintColor} />
              </View>
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                Chưa có thư mục nào
              </ThemedText>
              <ThemedText style={[styles.emptyDescription, { color: textSecondary }]}>
                Tạo thư mục đầu tiên để bắt đầu{"\n"}lưu trữ từ vựng của bạn
              </ThemedText>
              <Pressable
                onPress={() => setCreateModalVisible(true)}
                style={({ pressed }) => [
                  styles.emptyButton,
                  { backgroundColor: tintColor },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Ionicons name="add" size={20} color="#fff" />
                <ThemedText style={styles.emptyButtonText}>Tạo thư mục đầu tiên</ThemedText>
              </Pressable>
            </View>
          ) : (
            folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onPress={() => handleFolderPress(folder.id)}
                onEdit={() => handleEditFolder(folder)}
                onDelete={() => handleDeleteFolder(folder.id)}
              />
            ))
          )}
        </ScrollView>

        <CreateFolderModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreate={handleCreateFolder}
        />

        <EditFolderModal
          visible={editModalVisible}
          folder={selectedFolder}
          onClose={() => {
            setEditModalVisible(false);
            setSelectedFolder(null);
          }}
          onSave={handleSaveEdit}
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
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
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
