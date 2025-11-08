import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const bgPrimary = useThemeColor({}, "bgPrimary");
  const outlineSecondary = useThemeColor({}, "outlineSecondary");
  const fgTertiary = useThemeColor({}, "fgTertiary");
  const textPrimary = useThemeColor({}, "textPrimary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const tintColor = useThemeColor({}, "tint");
  const cardColor = useThemeColor({}, "card");
  const { isLoggedIn, profile, session } = useAuthContext();

  // Secret gesture: tap 5 times on title to open Testing page
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTitlePress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If reached 5 taps, navigate to testing page
    if (newCount >= 5) {
      setTapCount(0);
      router.push("/(_testing)/testing");
      return;
    }

    // Reset counter after 2 seconds of no taps
    timeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get user display name and email
  const userName = profile?.full_name || session?.user?.user_metadata?.full_name || "User";
  const userEmail = session?.user?.email || "";
  const userAvatar = profile?.avatar_url || session?.user?.user_metadata?.avatar_url;

  const handleLoginPress = () => {
    router.push("/login");
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    // Stay on current page, UI will automatically update to logged out state
  };

  const settingItems = [
    { icon: "star", text: "Đánh giá ứng dụng" },
    { icon: "mail", text: "Liên hệ hỗ trợ" },
    { icon: "document-text", text: "Điều khoản & Chính sách" },
    { icon: "information-circle", text: "Phiên bản 1.0.0", isLast: true },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgPrimary }]}>
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity onPress={handleTitlePress} activeOpacity={1} style={styles.header}>
          <PageHeader title="Tài khoản" />
        </TouchableOpacity>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Profile Card (Logged In) or Login Button (Logged Out) */}
          <View style={styles.section}>
            {isLoggedIn ? (
              // ============================================
              // WRAPPER: Avatar + Name + Email Card
              // ============================================
              <View
                style={[styles.card, { backgroundColor: cardColor, borderColor: outlineSecondary }]}
              >
                <View style={styles.cardContent}>
                  <View style={styles.profileContent}>
                    <View style={styles.avatarContainer}>
                      {userAvatar ? (
                        <Image source={{ uri: userAvatar }} style={styles.avatar} />
                      ) : (
                        <View style={[styles.avatarPlaceholder, { backgroundColor: tintColor }]}>
                          <ThemedText style={styles.avatarText}>
                            {userName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </ThemedText>
                        </View>
                      )}
                    </View>
                    <View style={styles.profileInfo}>
                      <ThemedText style={[styles.profileName, { color: textPrimary }]}>
                        {userName}
                      </ThemedText>
                      <ThemedText style={[styles.profileEmail, { color: textSecondary }]}>
                        {userEmail}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              // ============================================
              <View
                style={[styles.card, { backgroundColor: cardColor, borderColor: outlineSecondary }]}
              >
                <View style={styles.cardContent}>
                  <Button
                    variant="highlight"
                    width="fill"
                    leadingIcon={<Ionicons name="log-in-outline" size={20} color="#FFFFFF" />}
                    onPress={handleLoginPress}
                  >
                    Đăng nhập
                  </Button>
                </View>
              </View>
            )}
          </View>

          {/* App Info Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={[styles.sectionTitle, { color: textPrimary }]}>
                Về ứng dụng
              </ThemedText>
            </View>

            <View
              style={[styles.card, { backgroundColor: cardColor, borderColor: outlineSecondary }]}
            >
              <View style={styles.aboutCardContent}>
                {settingItems.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.settingItem} activeOpacity={0.7}>
                    <View style={styles.settingItemLeft}>
                      <Ionicons name={item.icon as any} size={24} color={fgTertiary} />
                      <View
                        style={[
                          styles.settingItemContent,
                          !item.isLast
                            ? {
                                borderBottomColor: outlineSecondary,
                                borderBottomWidth: 1,
                              }
                            : {
                                borderBottomWidth: 0,
                              },
                        ]}
                      >
                        <ThemedText style={[styles.settingItemText, { color: textPrimary }]}>
                          {item.text}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Sign Out Button (Logged In Only) */}
          {isLoggedIn && (
            <View style={[styles.section, styles.signOutSection]}>
              <Button
                variant="tertiary"
                width="hug"
                leadingIcon={<Ionicons name="log-out-outline" size={20} color={textPrimary} />}
                onPress={handleSignOut}
              >
                Đăng xuất
              </Button>
            </View>
          )}

          {/* Footer padding */}
          <View style={styles.footer} />
        </ScrollView>
      </View>
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
    paddingTop: 6,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  signOutSection: {
    alignItems: "center",
  },
  sectionHeader: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  aboutCardContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 999,
    overflow: "hidden",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 0,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
    gap: 0,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  loginButtonContainer: {
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingItemContent: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingItemText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  footer: {
    height: 40,
  },
});
