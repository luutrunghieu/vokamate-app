import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function SignOutButton() {
  const textSecondary = useThemeColor({}, "textSecondary");

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={handleSignOut}>
      <View style={styles.menuItemLeft}>
        <Ionicons name="log-out" size={22} color="#EF4444" />
        <ThemedText style={[styles.menuItemText, { color: "#EF4444" }]}>Đăng xuất</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
