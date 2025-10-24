import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface WordHeaderProps {
  word: string;
  pronunciation?: string;
  onPlayPronunciation?: (accent: "us" | "uk") => void;
}

export function WordHeader({ word, pronunciation, onPlayPronunciation }: WordHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <ThemedText type="title" style={styles.word}>
          {word}
        </ThemedText>
        {pronunciation && <ThemedText style={styles.pronunciation}>{pronunciation}</ThemedText>}
      </View>

      <View style={styles.audioButtons}>
        <TouchableOpacity style={styles.speakerButton} onPress={() => onPlayPronunciation?.("us")}>
          <IconSymbol name="speaker.wave.2.fill" size={18} color="#888" />
          <ThemedText style={styles.flag}>US</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.speakerButton} onPress={() => onPlayPronunciation?.("uk")}>
          <IconSymbol name="speaker.wave.2.fill" size={18} color="#888" />
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
    borderBottomColor: "#2A2A2A",
  },
  wordContainer: {
    flexDirection: "column",
  },
  word: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  pronunciation: {
    color: "#888",
  },
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
