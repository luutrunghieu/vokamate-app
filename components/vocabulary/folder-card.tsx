import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyFolder } from "@/types/vocabulary";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, View } from "react-native";

interface FolderCardProps {
  folder: VocabularyFolder;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FolderCard({ folder, onPress, onEdit, onDelete }: FolderCardProps) {
  const borderColor = useThemeColor({}, "cardBorder");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "card");

  const handleOptions = () => {
    if (folder.isDefault) return;

    Alert.alert("Tùy chọn thư mục", `Chọn hành động cho "${folder.name}"`, [
      {
        text: "Chỉnh sửa",
        onPress: onEdit,
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: handleDelete,
      },
      {
        text: "Hủy",
        style: "cancel",
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("Xác nhận xóa", `Bạn có chắc muốn xóa thư mục "${folder.name}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}>
      <View style={[styles.colorIndicator, { backgroundColor: folder.color }]} />

      <View style={styles.cardBody}>
        <Pressable
          onPress={onPress}
          onLongPress={handleOptions}
          style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressed]}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <ThemedText type="defaultSemiBold" style={styles.title}>
                {folder.name}
              </ThemedText>
              {folder.isDefault && (
                <View style={[styles.badge, { backgroundColor: folder.color + "20" }]}>
                  <ThemedText style={[styles.badgeText, { color: folder.color }]}>Mặc định</ThemedText>
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Ionicons name="book-outline" size={16} color={textSecondary} />
              <ThemedText style={[styles.wordCount, { color: textSecondary }]}>{folder.wordCount} từ</ThemedText>
            </View>
          </View>
        </Pressable>

        {!folder.isDefault && (
          <View style={styles.actions}>
            <Pressable
              onPress={onEdit}
              style={({ pressed }) => [styles.actionButton, styles.editButton, pressed && styles.editButtonPressed]}
              hitSlop={4}
            >
              <Ionicons name="pencil" size={16} color="#3b82f6" />
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [styles.actionButton, styles.deleteButton, pressed && styles.deleteButtonPressed]}
              hitSlop={4}
            >
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  colorIndicator: {
    height: 5,
    width: "100%",
  },
  cardBody: {
    flexDirection: "row",
  },
  cardPressable: {
    flex: 1,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    padding: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  title: {
    fontSize: 17,
    flex: 1,
    lineHeight: 24,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wordCount: {
    fontSize: 15,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    gap: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  editButton: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  editButtonPressed: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
    transform: [{ scale: 0.92 }],
  },
  deleteButton: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  deleteButtonPressed: {
    backgroundColor: "#fee2e2",
    borderColor: "#fca5a5",
    transform: [{ scale: 0.92 }],
  },
});
