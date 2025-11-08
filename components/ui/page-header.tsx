import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PageHeaderProps {
  title: string;
  rightButtons?: React.ReactNode;
}

/**
 * Reusable page header component
 * - Height: 56
 * - Title on the left with textPrimary color, fontSize 24, lineHeight 32
 * - Optional buttons on the right (icon only style)
 */
export function PageHeader({ title, rightButtons }: PageHeaderProps) {
  const textPrimary = useThemeColor({}, "textPrimary");

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { color: textPrimary }]}>{title}</ThemedText>
      {rightButtons && <View style={styles.rightButtons}>{rightButtons}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

