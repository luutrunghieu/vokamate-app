import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface WordHeaderProps {
  word: string;
  pronunciation?: string;
  onPlayPronunciation?: (accent: "us" | "uk") => void;
}

export function WordHeader({ word, pronunciation, onPlayPronunciation }: WordHeaderProps) {
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <View style={styles.wordContainer}>
        <ThemedText type="title" style={styles.word}>
          {word}
        </ThemedText>
        {pronunciation && (
          <ThemedText style={[styles.pronunciation, { color: textSecondary }]}>{pronunciation}</ThemedText>
        )}
      </View>

      <View style={styles.audioButtons}>
        <TouchableOpacity style={styles.speakerButton} onPress={() => onPlayPronunciation?.("us")}>
          <IconSymbol name="speaker.wave.2.fill" size={18} color={iconColor} />
          <ThemedText style={styles.flag}>US</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.speakerButton} onPress={() => onPlayPronunciation?.("uk")}>
          <IconSymbol name="speaker.wave.2.fill" size={18} color={iconColor} />
          <ThemedText style={styles.flag}>UK</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  wordContainer: {
    flexDirection: "column",
  },
  word: {
    fontSize: 24,
    marginBottom: 8,
  },
  pronunciation: {},
  audioButtons: {
    flexDirection: "row",
    gap: 12,
  },
  speakerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flag: {
    fontSize: 16,
  },
});
