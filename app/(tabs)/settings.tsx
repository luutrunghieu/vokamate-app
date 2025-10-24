import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme, type ThemeMode } from "@/contexts/theme-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { themeMode, setThemeMode } = useTheme();
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");

  const themeModes: { value: ThemeMode; label: string }[] = [
    { value: "light", label: "Sáng" },
    { value: "dark", label: "Tối" },
    { value: "system", label: "Hệ thống" },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Cài đặt</ThemedText>
        </ThemedView>

        <ScrollView style={styles.content}>
          {/* Theme Setting */}
          <ThemedView style={styles.settingSection}>
            <ThemedText style={styles.settingLabel}>Giao diện</ThemedText>
            <View style={styles.themeOptions}>
              {themeModes.map((mode) => (
                <TouchableOpacity
                  key={mode.value}
                  style={[
                    styles.themeOption,
                    { borderColor: borderColor },
                    themeMode === mode.value && { borderColor: tintColor },
                  ]}
                  onPress={() => setThemeMode(mode.value)}
                >
                  <ThemedText
                    style={[
                      styles.themeOptionText,
                      themeMode === mode.value && { fontWeight: "700", color: tintColor },
                    ]}
                  >
                    {mode.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>
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
  settingSection: {
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    opacity: 0.7,
  },
  themeOptions: {
    flexDirection: "row",
    gap: 12,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  settingItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
  },
});
