import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VocabularyScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Kho từ</ThemedText>
        </ThemedView>

        <ScrollView style={styles.content}>
          <ThemedText style={styles.emptyText}>Chưa có từ vựng nào được lưu</ThemedText>
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
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    opacity: 0.6,
  },
});
