import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmailAuthForm from "@/components/auth/email-auth-form";
// import GoogleSignInButton from "@/components/social-auth-buttons/google-sign-in-button";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ChevronLeftOutline } from "@/src/components/Icons";

export default function LoginScreen() {
  const router = useRouter();
  const tintColor = useThemeColor({}, "tint");
  const bgPrimary = useThemeColor({}, "bgPrimary");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: bgPrimary }]}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          {router.canGoBack() && (
            <View style={styles.backButton}>
              <Button
                variant="tertiary"
                iconOnly
                iconPadding={false}
                leadingIcon={<ChevronLeftOutline width={28} height={28} color={tintColor} />}
                onPress={() => router.back()}
              />
            </View>
          )}
        </SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              contentFit="contain"
            />

            <ThemedText type="title" style={styles.title}>
              VokaMate
            </ThemedText>

            <EmailAuthForm />

            {/* Temporarily disabled Google Auth */}
            {/* <GoogleSignInButton /> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 100,
    gap: 32,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    marginTop: -16,
  },
});
