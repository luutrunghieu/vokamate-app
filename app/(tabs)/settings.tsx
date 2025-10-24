import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Cài đặt</ThemedText>
        </ThemedView>

        <ScrollView style={styles.content}>
          <TouchableOpacity style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Ngôn ngữ</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Thông báo</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Giới thiệu</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <ThemedText style={styles.settingText}>Liên hệ</ThemedText>
          </TouchableOpacity>
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
  settingItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 16,
  },
});
