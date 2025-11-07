import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

function BackButton() {
  const router = useRouter();
  const tintColor = useThemeColor({}, "tint");

  if (!router.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingRight: 12,
        paddingVertical: 4,
      }}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={28} color={tintColor} />
      <Text style={{ color: tintColor, fontSize: 17, fontWeight: "500", marginLeft: 4 }}>Back</Text>
    </TouchableOpacity>
  );
}

export default function TestingLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back", // Remove text from back button (only show icon)
      }}
    >
      <Stack.Screen
        name="testing"
        options={{
          title: "",
          headerBackTitle: "Back", // Remove text from back button (only show icon)
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="button-test"
        options={{
          title: "",
          headerBackTitle: "Back", // Remove text from back button (only show icon)
        }}
      />
    </Stack>
  );
}
