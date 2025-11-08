import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { tailwindColors } from "@/constants/tailwind-colors";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ButtonTestScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textSecondary = useThemeColor({}, "textSecondary");
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  // Helper function to get icon color based on variant
  // Icons should match the button text color for proper contrast
  const getIconColor = (
    variant: "primary" | "secondary" | "tertiary" | "highlight" | "positive" | "negative"
  ) => {
    switch (variant) {
      case "primary":
      case "highlight":
      case "positive":
      case "negative":
        return tailwindColors.white;
      case "secondary":
      case "tertiary":
        return colors.fgPrimary;
      default:
        return tailwindColors.white;
    }
  };

  const variants: Array<{
    variant: "primary" | "secondary" | "tertiary" | "highlight" | "positive" | "negative";
    label: string;
  }> = [
    { variant: "primary", label: "Primary" },
    { variant: "secondary", label: "Secondary" },
    { variant: "tertiary", label: "Tertiary" },
    { variant: "highlight", label: "Highlight" },
    { variant: "positive", label: "Positive" },
    { variant: "negative", label: "Negative" },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }]}
      edges={["left", "right", "bottom"]}
    >
      <ThemedView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Button Variants Section */}
          {variants.map(({ variant, label }) => (
            <ThemedView key={variant} style={styles.section}>
              <ThemedText style={styles.sectionTitle}>{label} Buttons</ThemedText>

              <View style={styles.buttonGroup}>
                {/* Default Button */}
                <Button
                  variant={variant}
                  width="hug"
                  onPress={() => console.log(`${label} button pressed`)}
                >
                  {label} Button
                </Button>

                {/* Button with Leading Icon */}
                <Button
                  variant={variant}
                  width="hug"
                  leadingIcon={
                    <IconSymbol name="chevron.right" size={20} color={getIconColor(variant)} />
                  }
                  onPress={() => console.log(`${label} with leading icon pressed`)}
                >
                  {label} Button
                </Button>

                {/* Button with Trailing Icon */}
                <Button
                  variant={variant}
                  width="hug"
                  trailingIcon={
                    <IconSymbol name="chevron.right" size={20} color={getIconColor(variant)} />
                  }
                  onPress={() => console.log(`${label} with trailing icon pressed`)}
                >
                  {label} Button
                </Button>

                {/* Icon Only Button */}
                <Button
                  variant={variant}
                  width="hug"
                  iconOnly
                  leadingIcon={<IconSymbol name="gear" size={20} color={getIconColor(variant)} />}
                  onPress={() => console.log(`${label} icon-only pressed`)}
                />

                {/* Disabled Button */}
                <Button variant={variant} width="hug" disabled onPress={() => {}}>
                  {label} Button
                </Button>

                {/* Loading Button */}
                <Button variant={variant} width="hug" loading onPress={() => {}}>
                  {label} Button
                </Button>

                {/* Fill Width */}
                <Button
                  variant={variant}
                  width="fill"
                  onPress={() => console.log(`${label} fill width pressed`)}
                >
                  {label} Button
                </Button>

                {/* Fill Width with Icon */}
                <Button
                  variant={variant}
                  width="fill"
                  leadingIcon={
                    <IconSymbol name="chevron.right" size={20} color={getIconColor(variant)} />
                  }
                  onPress={() => console.log(`${label} fill width with icon pressed`)}
                >
                  {label} Button
                </Button>
              </View>
            </ThemedView>
          ))}

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
    paddingVertical: 32,

    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  buttonGroup: {
    gap: 16,
  },
  footer: {
    height: 40,
  },
});
