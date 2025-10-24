import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { VocabularyProvider } from "@/contexts/vocabulary-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutContent() {
  const { colorScheme } = useTheme();

  return (
    <NavigationThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen name="folder-detail" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <VocabularyProvider>
          <RootLayoutContent />
        </VocabularyProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
