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
    <Stack>
      <Stack.Screen
        name="testing"
        options={{
          headerShown: true,
          title: "Testing",
          headerLeft: () => <BackButton />,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="button-test"
        options={{
          headerShown: true,
          title: "Buttons",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="input-test"
        options={{
          headerShown: true,
          title: "Inputs",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
