import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TestItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  available: boolean;
};

const testItems: TestItem[] = [
  {
    id: "buttons",
    title: "Buttons",
    icon: "square-outline",
    route: "/(testing)/button-test",
    available: true,
  },
  {
    id: "inputs",
    title: "Inputs",
    icon: "text-outline",
    route: "/(testing)/input-test",
    available: false,
  },
  {
    id: "cards",
    title: "Cards",
    icon: "card-outline",
    route: "/(testing)/card-test",
    available: false,
  },
  {
    id: "modals",
    title: "Modals",
    icon: "albums-outline",
    route: "/(testing)/modal-test",
    available: false,
  },
];

export default function TestingScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");
  const tintColor = useThemeColor({}, "tint");

  const handleTestItemPress = (item: TestItem) => {
    if (item.available) {
      router.push(item.route as any);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }]}
      edges={["left", "right", "bottom"]}
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Testing
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: textSecondary }]}>
            Component testing pages
          </ThemedText>
        </ThemedView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            {testItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={[styles.menuItem, !item.available && styles.menuItemDisabled]}
                  onPress={() => handleTestItemPress(item)}
                  disabled={!item.available}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={item.available ? tintColor : textSecondary}
                    />
                    <ThemedText
                      style={[
                        styles.menuItemText,
                        !item.available && { color: textSecondary, opacity: 0.5 },
                      ]}
                    >
                      {item.title}
                    </ThemedText>
                  </View>
                  {item.available ? (
                    <Ionicons name="chevron-forward" size={20} color={textSecondary} />
                  ) : (
                    <ThemedText style={[styles.comingSoon, { color: textSecondary }]}>
                      Soon
                    </ThemedText>
                  )}
                </TouchableOpacity>
                {index < testItems.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: borderColor }]} />
                )}
              </View>
            ))}
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
    paddingTop: 32,
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuItemDisabled: {
    opacity: 0.5,
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
  comingSoon: {
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "italic",
  },
  divider: {
    height: 1,
  },
  footer: {
    height: 40,
  },
});
