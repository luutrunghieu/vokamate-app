import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, onSubmit, placeholder = "Nhập từ vựng..." }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.flagEmoji}>🇺🇸</ThemedText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <IconSymbol name="arrow.right" size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
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
    color: "#FFFFFF",
    paddingVertical: 12,
  },
  submitButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
  },
});
