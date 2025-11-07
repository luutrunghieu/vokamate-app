import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import GoogleSignInButton from "@/components/social-auth-buttons/google-sign-in-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} contentFit="contain" />

        <ThemedText type="title" style={styles.title}>
          VokaMate
        </ThemedText>

        <GoogleSignInButton />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 32,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    marginTop: -8,
  },
});
