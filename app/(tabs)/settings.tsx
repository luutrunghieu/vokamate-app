import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme, type ThemeMode } from "@/contexts/theme-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const { themeMode, setThemeMode } = useTheme();
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const textSecondary = useThemeColor({}, "textSecondary");
  const cardColor = useThemeColor({}, "card");

  const themeModes: { value: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: "light", label: "Sáng", icon: "sunny" },
    { value: "dark", label: "Tối", icon: "moon" },
    { value: "system", label: "Hệ thống", icon: "phone-portrait" },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Cài đặt
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: textSecondary }]}>
            Tùy chỉnh trải nghiệm của bạn
          </ThemedText>
        </ThemedView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Appearance Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="color-palette" size={20} color={tintColor} style={styles.sectionIcon} />
              <ThemedText style={styles.sectionTitle}>Giao diện</ThemedText>
            </View>

            <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
              <ThemedText style={[styles.cardLabel, { color: textSecondary }]}>Chế độ hiển thị</ThemedText>
              <View style={styles.themeOptions}>
                {themeModes.map((mode) => {
                  const isActive = themeMode === mode.value;
                  return (
                    <TouchableOpacity
                      key={mode.value}
                      style={[
                        styles.themeOption,
                        { borderColor: borderColor, backgroundColor: backgroundSecondary },
                        isActive && {
                          borderColor: tintColor,
                          backgroundColor: tintColor + "15",
                        },
                      ]}
                      onPress={() => setThemeMode(mode.value)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={mode.icon}
                        size={24}
                        color={isActive ? tintColor : textSecondary}
                        style={styles.themeIcon}
                      />
                      <ThemedText
                        style={[
                          styles.themeOptionText,
                          { color: textSecondary },
                          isActive && { fontWeight: "700", color: tintColor },
                        ]}
                      >
                        {mode.label}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ThemedView>
          </ThemedView>

          {/* App Info Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color={tintColor} style={styles.sectionIcon} />
              <ThemedText style={styles.sectionTitle}>Về ứng dụng</ThemedText>
            </View>

            <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
              <View style={styles.infoRow}>
                <ThemedText style={[styles.infoLabel, { color: textSecondary }]}>Phiên bản</ThemedText>
                <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
              </View>
              <View style={[styles.divider, { backgroundColor: borderColor }]} />
              <View style={styles.infoRow}>
                <ThemedText style={[styles.infoLabel, { color: textSecondary }]}>Nhà phát triển</ThemedText>
                <ThemedText style={styles.infoValue}>VokaMate Team</ThemedText>
              </View>
            </ThemedView>
          </ThemedView>

          {/* Support Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle" size={20} color={tintColor} style={styles.sectionIcon} />
              <ThemedText style={styles.sectionTitle}>Hỗ trợ</ThemedText>
            </View>

            <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="star" size={22} color={textSecondary} />
                  <ThemedText style={styles.menuItemText}>Đánh giá ứng dụng</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: borderColor }]} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="mail" size={22} color={textSecondary} />
                  <ThemedText style={styles.menuItemText}>Liên hệ hỗ trợ</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: borderColor }]} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="document-text" size={22} color={textSecondary} />
                  <ThemedText style={styles.menuItemText}>Điều khoản & Chính sách</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={textSecondary} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* Footer padding */}
          <View style={styles.footer} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: "400",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  themeOptions: {
    flexDirection: "row",
    gap: 12,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  themeIcon: {
    marginBottom: 8,
  },
  themeOptionText: {
    fontSize: 13,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "400",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    height: 40,
  },
});
