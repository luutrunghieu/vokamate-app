import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import AuthProvider from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { VocabularyProvider } from "@/contexts/vocabulary-context";
import { useAuthContext } from "@/hooks/use-auth-context";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function RootLayoutContent() {
  const { isLoggedIn } = useAuthContext();

  return (
    <NavigationThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(_testing)"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen name="folder-detail" options={{ headerShown: false }} />
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <VocabularyProvider>
            <RootLayoutContent />
          </VocabularyProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
