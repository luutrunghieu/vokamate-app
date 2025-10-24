import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { VocabularyFolder } from "@/types/vocabulary";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface EditFolderModalProps {
  visible: boolean;
  folder: VocabularyFolder | null;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
}

const FOLDER_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // orange
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

export function EditFolderModal({ visible, folder, onClose, onSave }: EditFolderModalProps) {
  const [name, setName] = useState(folder?.name || "");
  const [selectedColor, setSelectedColor] = useState(folder?.color || FOLDER_COLORS[0]);

  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const tintColor = useThemeColor({}, "tint");

  // Update local state when folder prop changes
  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setSelectedColor(folder.color);
    }
  }, [folder]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), selectedColor);
      onClose();
    }
  };

  const handleClose = () => {
    if (folder) {
      setName(folder.name);
      setSelectedColor(folder.color);
    }
    onClose();
  };

  if (!folder) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <ThemedView style={[styles.modalContent, { backgroundColor: cardBackground }]}>
          <View style={styles.modalHeader}>
            <ThemedText type="subtitle">Chỉnh sửa thư mục</ThemedText>
            <Pressable onPress={handleClose} hitSlop={8}>
              <Ionicons name="close" size={24} color={textColor} />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Tên thư mục</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  color: textColor,
                  backgroundColor: backgroundColor,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên thư mục..."
              placeholderTextColor={textSecondary}
              autoFocus
            />
          </View>

          <View style={styles.colorContainer}>
            <ThemedText style={styles.label}>Chọn màu</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorScroll}>
              {FOLDER_COLORS.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorOptionSelected,
                  ]}
                >
                  {selectedColor === color && <Ionicons name="checkmark" size={20} color="#fff" />}
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={handleClose} style={[styles.button, styles.cancelButton, { borderColor }]}>
              <ThemedText style={styles.cancelButtonText}>Hủy</ThemedText>
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={!name.trim()}
              style={[
                styles.button,
                styles.saveButton,
                { backgroundColor: tintColor },
                !name.trim() && styles.buttonDisabled,
              ]}
            >
              <ThemedText style={styles.saveButtonText}>Lưu</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 420,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  colorContainer: {
    marginBottom: 28,
  },
  colorScroll: {
    marginHorizontal: -4,
  },
  colorOption: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  colorOptionSelected: {
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  saveButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
