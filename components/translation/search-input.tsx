import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, onSubmit, placeholder = "Nhập từ vựng..." }: SearchInputProps) {
  const bgSecondary = useThemeColor({}, "backgroundSecondary");
  const bgTertiary = useThemeColor({}, "backgroundTertiary");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={[styles.container, { backgroundColor: bgSecondary }]}>
      <ThemedText style={styles.flagEmoji}>🇺🇸</ThemedText>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity style={[styles.submitButton, { backgroundColor: bgTertiary }]} onPress={onSubmit}>
        <IconSymbol name="arrow.right" size={22} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
  },
  flagEmoji: {
    marginRight: 8,
    fontSize: 28,
    lineHeight: 28,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  submitButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
