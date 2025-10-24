import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyWord } from "@/types/vocabulary";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, View } from "react-native";

interface WordListItemProps {
  word: VocabularyWord;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function WordListItem({ word, onEdit, onDelete }: WordListItemProps) {
  const borderColor = useThemeColor({}, "cardBorder");
  const textSecondary = useThemeColor({}, "textSecondary");
  const backgroundColor = useThemeColor({}, "card");

  const handleOptions = () => {
    const options: any[] = [];

    if (onEdit) {
      options.push({
        text: "Chỉnh sửa",
        onPress: onEdit,
      });
    }

    options.push(
      {
        text: "Xóa",
        style: "destructive",
        onPress: handleDelete,
      },
      {
        text: "Hủy",
        style: "cancel",
      }
    );

    Alert.alert("Tùy chọn từ vựng", `Chọn hành động cho "${word.word}"`, options);
  };

  const handleDelete = () => {
    Alert.alert("Xác nhận xóa", `Bạn có chắc muốn xóa từ "${word.word}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <Pressable
      onLongPress={handleOptions}
      style={({ pressed }) => [styles.card, { backgroundColor, borderColor }, pressed && styles.cardPressed]}
    >
      <View style={styles.content}>
        <View style={styles.wordSection}>
          <ThemedText type="defaultSemiBold" style={styles.word}>
            {word.word}
          </ThemedText>
          <ThemedText style={[styles.translation, { color: textSecondary }]}>{word.translation}</ThemedText>
        </View>

        <View style={styles.actions}>
          {onEdit && (
            <Pressable
              onPress={onEdit}
              style={({ pressed }) => [styles.actionButton, styles.editButton, pressed && styles.editButtonPressed]}
              hitSlop={4}
            >
              <Ionicons name="pencil" size={16} color="#3b82f6" />
            </Pressable>
          )}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [styles.actionButton, styles.deleteButton, pressed && styles.deleteButtonPressed]}
            hitSlop={4}
          >
            <Ionicons name="trash-outline" size={16} color="#ef4444" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wordSection: {
    flex: 1,
    marginRight: 12,
  },
  word: {
    fontSize: 17,
    marginBottom: 4,
  },
  translation: {
    fontSize: 15,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
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
